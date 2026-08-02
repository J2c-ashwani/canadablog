import { BacklinkVerification, BacklinkLinkType } from './types';
import { getOutreachProspectsFromSheet, updateOutreachProspectInSheet } from '@/lib/google-sheets';

/**
 * Module for verifying earned backlinks automatically.
 */
export class BacklinkVerifier {
  /**
   * Verifies a backlink by fetching the source URL and parsing the HTML for the target URL.
   * @param prospectId The ID of the outreach prospect.
   * @param sourceUrl The URL where the backlink is placed.
   * @param targetUrl The target URL the backlink should point to.
   * @returns A promise resolving to the backlink verification results.
   */
  static async verifyBacklink(prospectId: string, sourceUrl: string, targetUrl: string): Promise<BacklinkVerification> {
    const now = new Date().toISOString();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const fullSourceUrl = sourceUrl.startsWith('http') ? sourceUrl : `https://${sourceUrl}`;
      const response = await fetch(fullSourceUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (FSI-Digital-Backlink-Bot/1.0)' },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const isLive = response.ok;
      let linkType: BacklinkLinkType = 'unknown';
      let anchorText: string | null = null;
      let consecutiveFailures = 0;
      
      if (!isLive) {
        consecutiveFailures = 1;
      } else {
        const html = await response.text();
        
        const safeTarget = (targetUrl || 'fsidigital.ca').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`<a[^>]*href=["\\']([^"\\']*(?:fsidigital\\.ca|${safeTarget})[^"\\']*)["\\'][^>]*>(.*?)<\\/a>`, 'gi');
        
        const match = regex.exec(html);
        if (match) {
          anchorText = match[2].replace(/<[^>]+>/g, '').trim();
          
          const anchorTag = match[0].toLowerCase();
          if (anchorTag.includes('rel="nofollow"') || anchorTag.includes("rel='nofollow'") ||
              anchorTag.includes('rel="ugc"') || anchorTag.includes("rel='ugc'") ||
              anchorTag.includes('rel="sponsored"') || anchorTag.includes("rel='sponsored'")) {
            linkType = 'nofollow';
          } else {
            linkType = 'dofollow';
          }
        } else {
          consecutiveFailures = 1;
          linkType = 'unknown';
        }
      }

      return {
        prospectId,
        sourceUrl,
        targetUrl,
        anchorText,
        linkType,
        firstDetected: now,
        lastChecked: now,
        httpStatus: response.status,
        isLive: consecutiveFailures === 0,
        consecutiveFailures,
        checkHistory: [{
          date: now,
          live: isLive,
          status: response.status,
          linkType
        }]
      };
    } catch (error) {
      return {
        prospectId,
        sourceUrl,
        targetUrl,
        anchorText: null,
        linkType: 'unknown',
        firstDetected: now,
        lastChecked: now,
        httpStatus: 0,
        isLive: false,
        consecutiveFailures: 1,
        checkHistory: [{
          date: now,
          live: false,
          status: 0,
          linkType: 'unknown'
        }]
      };
    }
  }

  /**
   * Verifies all earned backlinks stored in the Google Sheets database.
   * Fetches prospects from Google Sheets where backlinkEarned === true or status is 'backlink_earned'.
   */
  static async verifyAllEarnedBacklinks(): Promise<{ verified: number; live: number; lost: number; results: BacklinkVerification[] }> {
    const prospects = await getOutreachProspectsFromSheet();
    const earnedProspects = prospects.filter(p => p.backlinkEarned === true || p.status === 'backlink_earned');
    
    let verified = 0;
    let live = 0;
    let lost = 0;
    const results: BacklinkVerification[] = [];
    
    for (const prospect of earnedProspects) {
      const sourceUrl = prospect.website;
      const targetUrl = prospect.targetPage || '/canada/small-business-grants';
      const prospectId = `row_${prospect.rowIndex}`;

      if (sourceUrl) {
        verified++;
        const result = await this.verifyBacklink(prospectId, sourceUrl, targetUrl);
        results.push(result);
        
        if (result.isLive) {
          live++;
        } else {
          lost++;
          if (result.consecutiveFailures >= 3) {
            await updateOutreachProspectInSheet(prospect.rowIndex, {
              status: 'backlink_lost',
              deliveryStatus: `Backlink unverified (HTTP ${result.httpStatus})`
            });
          }
        }
      }
    }
    
    return { verified, live, lost, results };
  }
}
