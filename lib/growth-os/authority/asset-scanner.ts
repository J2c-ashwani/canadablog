/**
 * Growth OS — Phase 3: Authority Engine — FSI Digital Asset Scanner
 * Scans own-site content to rank and select the best resources for outreach alignment.
 */

import { FSIAsset, FSIAssetType, AuthorityCategory } from './types';
import blogData from '../../data/blogMetadata.json';

export class AssetScanner {
  public static MONEY_PAGES: string[] = [
    '/canada/small-business-grants',
    '/canada/innovation-grants',
    '/canada/women-business-grants',
    '/blog/canada-federal-grants',
    '/blog/irap-funding-guide',
    '/blog/sred-tax-credit-guide',
    '/blog/how-to-stack-government-grants-canada',
    '/blog/irap-vs-sred-difference-canada'
  ];

  /**
   * Scans the local content registry and returns a ranked list of FSI Digital assets.
   */
  public static scanAssets(): FSIAsset[] {
    const assets: FSIAsset[] = [];
    const metadataList = blogData.metadata || [];

    for (const item of metadataList) {
      if (!item.slug || !item.title) continue;

      const url = `/blog/${item.slug}`;
      let assetScore = 50; // base score

      // Classify type based on URL patterns
      let type: FSIAssetType = 'guide';
      const urlLower = url.toLowerCase();
      
      if (urlLower.includes('calculator')) {
        type = 'calculator';
      } else if (urlLower.includes('screener') || urlLower.includes('checker') || urlLower.includes('eligibility')) {
        type = 'screener';
      } else if (urlLower.includes('vs') || urlLower.includes('comparison') || urlLower.includes('difference')) {
        type = 'comparison';
      } else if (urlLower.includes('tool')) {
        type = 'tool';
      } else if (urlLower.includes('report')) {
        type = 'report';
      }

      // Page type bonus
      if (['calculator', 'screener', 'tool'].includes(type)) {
        assetScore += 20;
      } else if (type === 'comparison') {
        assetScore += 15;
      } else { // guide or report
        assetScore += 10;
      }

      // Determine topicCluster from URL path segments
      let topicCluster = 'general';
      if (urlLower.includes('irap')) topicCluster = 'IRAP';
      else if (urlLower.includes('sred') || urlLower.includes('sr-ed')) topicCluster = 'SR&ED';
      else if (urlLower.includes('women')) topicCluster = 'women-grants';
      else if (urlLower.includes('small-business')) topicCluster = 'small-business';
      else if (urlLower.includes('innovation')) topicCluster = 'innovation';
      else if (urlLower.includes('agri') || urlLower.includes('farm')) topicCluster = 'agriculture';

      // Topic cluster bonus
      if (['IRAP', 'SR&ED', 'women-grants', 'small-business', 'innovation'].includes(topicCluster)) {
        assetScore += 15;
      }

      // URL priority
      if (item.slug.length < 50) {
        assetScore += 10;
      }

      // Commercial intent bonus
      if (this.MONEY_PAGES.includes(url)) {
        assetScore += 20;
      }

      // Cap score at 100
      assetScore = Math.min(100, assetScore);

      // Determine bestOutreachAngle based on asset type
      let bestOutreachAngle = 'content_collaboration';
      if (['calculator', 'screener', 'tool'].includes(type)) {
        bestOutreachAngle = 'resource_suggestion';
      } else if (type === 'comparison') {
        bestOutreachAngle = 'data_contribution';
      }

      assets.push({
        url,
        title: item.title,
        type,
        conversionRate: this.MONEY_PAGES.includes(url) ? 5 : 2, // Default mapping
        organicTraffic: 100, // Default mapping
        lastUpdated: item.date || new Date().toISOString(),
        topicCluster,
        assetScore,
        bestOutreachAngle
      });
    }

    // Add static money pages that might not exist in the blogMetadata.json
    for (const moneyUrl of this.MONEY_PAGES) {
      if (!assets.some(a => a.url === moneyUrl)) {
        let type: FSIAssetType = 'guide';
        const moneyUrlLower = moneyUrl.toLowerCase();
        
        if (moneyUrlLower.includes('calculator')) type = 'calculator';
        else if (moneyUrlLower.includes('screener') || moneyUrlLower.includes('checker') || moneyUrlLower.includes('eligibility')) type = 'screener';
        else if (moneyUrlLower.includes('vs') || moneyUrlLower.includes('comparison') || moneyUrlLower.includes('difference')) type = 'comparison';
        
        let topicCluster = 'general';
        if (moneyUrlLower.includes('irap')) topicCluster = 'IRAP';
        else if (moneyUrlLower.includes('sred') || moneyUrlLower.includes('sr-ed')) topicCluster = 'SR&ED';
        else if (moneyUrlLower.includes('women')) topicCluster = 'women-grants';
        else if (moneyUrlLower.includes('small-business')) topicCluster = 'small-business';
        else if (moneyUrlLower.includes('innovation')) topicCluster = 'innovation';

        let bestOutreachAngle = 'content_collaboration';
        if (['calculator', 'screener', 'tool'].includes(type)) bestOutreachAngle = 'resource_suggestion';
        else if (type === 'comparison') bestOutreachAngle = 'data_contribution';

        assets.push({
          url: moneyUrl,
          title: moneyUrl.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'FSI High Value Resource',
          type,
          conversionRate: 10,
          organicTraffic: 500,
          lastUpdated: new Date().toISOString(),
          topicCluster,
          assetScore: 100, // Explicitly maxed out since it's a known money page
          bestOutreachAngle
        });
      }
    }

    // Return the assets sorted by assetScore descending
    return assets.sort((a, b) => b.assetScore - a.assetScore);
  }

  /**
   * Returns the top N assets sorted by assetScore (default 10).
   */
  public static getTopAssets(limit: number = 10): FSIAsset[] {
    return this.scanAssets().slice(0, limit);
  }

  /**
   * Returns the best matching asset for a given outreach target category.
   */
  public static getAssetForCategory(category: AuthorityCategory): FSIAsset | null {
    const assets = this.scanAssets();
    if (assets.length === 0) return null;

    let bestMatch = assets[0]; // Fallback to the overall highest-scoring asset

    if (category === 'startup_directory') {
      const match = assets.find(a => a.topicCluster === 'small-business' || a.type === 'guide');
      if (match) bestMatch = match;
    } else if (category === 'incubator' || category === 'accelerator') {
      const match = assets.find(a => a.topicCluster === 'innovation' || a.topicCluster === 'IRAP');
      if (match) bestMatch = match;
    } else if (category === 'industry_blog') {
      // Prioritize comparison or comprehensive guide
      const match = assets.find(a => a.type === 'comparison' || a.type === 'guide');
      if (match) bestMatch = match;
    } else if (category === 'resource_page') {
      bestMatch = assets[0]; // highest-scoring asset overall
    }

    return bestMatch;
  }
}
