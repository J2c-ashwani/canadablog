export function escapeHtml(str?: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface MembershipOnboardingData {
  email: string;
  name?: string;
  companyName?: string;
  province?: string;
  industry?: string;
  stage?: string;
  revenueBand?: string;
  employees?: string;
  preference?: string;
  growthObjective?: string;
}

export function buildMembershipBriefingHtml(data: MembershipOnboardingData) {
  const firstName = data.name ? data.name.split(' ')[0] : 'Founder';
  const province = data.province || 'Canada / USA';
  const industry = data.industry || 'Business';
  const objective = data.growthObjective || 'Growth';

  return `
    <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;">
      <div style="max-width:600px;margin:0 auto;background-color:#1e293b;border:1px solid #334155;border-radius:16px;padding:32px;box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.5);">
        <!-- Header Badge -->
        <div style="padding-bottom: 20px; border-bottom: 1px solid #334155; margin-bottom: 24px; display: table; width: 100%;">
          <span style="font-size: 18px; font-weight: 900; color: #ffffff; letter-spacing: -0.02em; display: table-cell;">FSI <span style="color: #10b981;">Digital</span></span>
          <span style="font-size: 11px; font-weight: 700; color: #10b981; background-color: #064e3b; padding: 4px 10px; border-radius: 9999px; display: table-cell; text-align: right;">Founding Member Briefing #1</span>
        </div>

        <p style="margin:0 0 16px 0;font-size:16px;color:#f1f5f9;font-weight:600;">Hi ${escapeHtml(firstName)},</p>

        <p style="margin:0 0 20px 0;font-size:14px;color:#cbd5e1;line-height:1.6;">
          Welcome to the <strong>FSI Digital Founding Member Beta</strong>. Here is your first custom Funding Radar briefing based on your profile for <strong>${escapeHtml(province)}</strong> (${escapeHtml(industry)}).
        </p>

        <!-- Executive Summary Card -->
        <div style="background-color: #0f172a; border: 1px solid #334155; border-left: 4px solid #10b981; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #10b981; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Weekly Funding Radar Focus</p>
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 800; color: #ffffff;">Primary Focus: ${escapeHtml(objective)}</h3>
          <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
            We identified active federal &amp; regional programs matching your ${escapeHtml(data.revenueBand || 'revenue')} profile with open intake windows this month.
          </p>
        </div>

        <!-- Matched Programs -->
        <h4 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 24px 0 12px 0;">Active Open Programs for Your Business</h4>
        
        <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #38bdf8; font-size: 15px;">1. Industrial Research Assistance Program (IRAP) / Regional Innovation</div>
          <div style="font-size: 12px; color: #94a3b8; margin: 4px 0 8px 0;">Status: Open · Up to 50–80% payroll subsidy for technical R&amp;D &amp; software dev</div>
          <div style="font-size: 12px; color: #cbd5e1;">Action: Prepare product roadmap and technical team specifications.</div>
        </div>

        <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
          <div style="font-weight: 700; color: #38bdf8; font-size: 15px;">2. SR&amp;ED / State Innovation Tax Credits</div>
          <div style="font-size: 12px; color: #94a3b8; margin: 4px 0 8px 0;">Status: Continuous Filing · Non-dilutive tax refund for eligible development</div>
          <div style="font-size: 12px; color: #cbd5e1;">Action: Track technical expenditure and developer hours.</div>
        </div>

        <!-- CTA Button to Member Dashboard -->
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://www.fsidigital.ca/membership/dashboard?email=${encodeURIComponent(data.email)}" style="background-color: #10b981; color: #092e20; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 800; display: inline-block; font-size: 14px;">
            Access Your Member Dashboard →
          </a>
        </div>

        <!-- Footer Signature -->
        <div style="padding-top: 20px; border-top: 1px solid #334155; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #cbd5e1;">FSI Digital Intelligence Desk</p>
          <p style="margin: 0;">Founding Member Beta · <a href="mailto:hello@fsidigital.ca" style="color: #38bdf8; text-decoration: none;">hello@fsidigital.ca</a></p>
        </div>
      </div>
    </div>
  `;
}
