import { sendEmail, getFirstName, cleanCompanyName } from "./mailer";
import { isUnsubscribeToken } from '@/lib/auth/subscriber-tokens';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function wrapCartRecoveryTemplate(contentHtml: string, unsubscribeToken: string, firstName: string) {
  const unsubscribeUrl = isUnsubscribeToken(unsubscribeToken, unsubscribeToken)
    ? `https://www.fsidigital.ca/subscribe/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`
    : 'https://www.fsidigital.ca/subscribe/unsubscribe';

  return `
    <div style="background-color:#0f172a;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);">
        
        <!-- Header -->
        <div style="background-color:#020617;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1e293b;">
          <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">FSI <span style="color:#10b981;">DIGITAL</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#10b981;text-transform:uppercase;letter-spacing:1px;padding:4px 10px;background-color:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:6px;margin-top:2px;">
            Secure Reservation
          </span>
        </div>

        <!-- Body Content -->
        <div style="padding:32px 32px 24px 32px;font-size:15px;color:#1e293b;line-height:1.65;text-align:left;">
          <p style="font-size:16px;font-weight:700;margin-top:0;margin-bottom:18px;color:#0f172a;">Hi ${firstName},</p>
          
          ${contentHtml}

        </div>

        <!-- Footer -->
        <div style="padding:24px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          <div style="margin-bottom:12px;">
            <strong>Ashwani K</strong><br/>
            <span style="color:#64748b;font-size:12px;">Growth &amp; Funding Intelligence · FSI Digital</span>
          </div>
          
          <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #cbd5e1;font-size:11px;color:#94a3b8;text-align:center;">
            This reservation memo was sent regarding your active checkout session.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these emails</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

type RecoveryProductId =
  | 'funding-match-report'
  | 'funding-roadmap'
  | 'funding-bundle'
  | 'funding-toolkit'
  | 'funding-approval-library'
  | 'guide-companion-kit'
  | 'strategy-audit'
  | 'strategy-vip'
  | 'portfolio-assessment'
  | 'funding-membership'
  | 'consultation'
  | 'strategy-session'
  | 'report_19'
  | 'premium_strategy_79';

function recoveryProduct(productId?: string, priceShown?: string) {
  const products: Record<string, { name: string; path: string; price: string }> = {
    'funding-match-report': { name: 'Funding Match Report', path: '/products/funding-match-report', price: '$19' },
    'report_19': { name: 'Funding Match Report', path: '/products/funding-match-report', price: '$19' },
    'funding-roadmap': { name: 'Funding Strategy & Action Plan', path: '/products/action-plan', price: '$49' },
    'funding-bundle': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'premium_strategy_79': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'funding-toolkit': { name: 'Funding Application Toolkit', path: '/products/toolkit', price: '$29' },
    'funding-approval-library': { name: 'Funding Approval Library', path: '/products/approval-library', price: '$9' },
    'guide-companion-kit': { name: 'Application Companion Kit', path: '/products/companion-kit', price: '$9' },
    'strategy-audit': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'consultation': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'strategy-session': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'portfolio-assessment': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'strategy-vip': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'funding-membership': { name: 'Funding Watch Membership', path: '/products/membership', price: '$29' },
  };

  const normalized = (productId || '').toLowerCase().trim();
  if (normalized && normalized in products) return products[normalized];

  const priceClean = String(priceShown || '').replace(/[^0-9.]/g, '');
  if (priceClean === '499' || priceClean === '199') return products['funding-bundle'];
  if (priceClean === '79' || priceClean === '108') return products['funding-bundle'];
  if (priceClean === '49') return products['funding-roadmap'];
  if (priceClean === '29') return products['funding-toolkit'];
  if (priceClean === '9') return products['funding-approval-library'];

  return products['funding-match-report'];
}

function recoveryCheckoutUrl(path: string, loginToken: string, campaign: string) {
  const params = new URLSearchParams({
    utm_source: 'cart_recovery',
    utm_medium: 'email',
    utm_campaign: campaign,
  });
  if (loginToken) params.set('token', loginToken);
  return `https://www.fsidigital.ca${path}?${params.toString()}`;
}

// ── CART RECOVERY EMAIL 1 (45 minutes) ──
export async function sendCartRecoveryEmail1({
  to,
  name,
  loginToken,
  unsubscribeToken,
  companyName,
  priceShown,
  productId,
}: {
  to: string;
  name?: string;
  loginToken: string;
  unsubscribeToken: string;
  companyName?: string;
  priceShown?: string;
  productId?: string;
}) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const product = recoveryProduct(productId, priceShown);
  const checkoutUrl = recoveryCheckoutUrl(product.path, loginToken, 'cart_day1');

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      I saw you started checkout for your <strong>${product.name}</strong> ${cleanCompany ? `for <strong>${escapeHtml(cleanCompany)}</strong>` : ''} but didn't reach the confirmation page.
    </p>
    <p style="margin: 0 0 16px 0;">
      Sometimes mobile browser popup blockers or interrupted payment gateways freeze the redirect.
    </p>
    <p style="margin: 0 0 18px 0; background-color:#ecfdf5; border-left:4px solid #10b981; padding:12px 16px; color:#065f46; border-radius:4px; font-weight:500;">
      Your matched programs, intake deadlines, and assessment data are securely held in our database for the next 12 hours.
    </p>
    <p style="margin: 0 0 20px 0;">
      You can resume and complete your order seamlessly with the direct one-click link below:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Resume Instant Access (${product.price}) &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nI saw you started checkout for the ${product.name} but didn't reach confirmation. If browser popup blockers interrupted your session, your matches are saved.\n\nResume with one click here:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject: `Did your checkout freeze? (Holding your ${product.name})`, html, text, tagType: 'cart-recovery-1', companyName: cleanCompany });
}

// ── CART RECOVERY EMAIL 2 (24 hours) ──
export async function sendCartRecoveryEmail2({
  to,
  name,
  loginToken,
  unsubscribeToken,
  companyName,
  priceShown,
  productId,
}: {
  to: string;
  name?: string;
  loginToken: string;
  unsubscribeToken: string;
  companyName?: string;
  priceShown?: string;
  productId?: string;
}) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const product = recoveryProduct(productId, priceShown);
  const checkoutUrl = recoveryCheckoutUrl(product.path, loginToken, 'cart_day3');

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      Most tech founders don't have a revenue problem. They have a capital leakage problem.
    </p>
    <p style="margin: 0 0 16px 0;">
      Paying 100% full retail for software developers, research, and expansion while leaving non-dilutive government subsidies on the table is the fastest way to burn runway.
    </p>
    <p style="margin: 0 0 16px 0;">
      You reserved the <strong>${product.name}</strong> ${cleanCompany ? `for <strong>${escapeHtml(cleanCompany)}</strong>` : ''}. It provides the exact program codes, allowable expense worksheets, and intake dates to reclaim this capital.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Complete Your Order (${product.price}) &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nMost founders have a capital leakage problem—paying full retail for dev payroll while leaving subsidies on the table. Your ${product.name} gives you the exact formula to reclaim it:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject: `The $100K mistake: why 84% of founders unknowingly pay retail`, html, text, tagType: 'cart-recovery-2', companyName: cleanCompany });
}

// ── CART RECOVERY EMAIL 3 (72 hours) ──
export async function sendCartRecoveryEmail3({
  to,
  name,
  loginToken,
  unsubscribeToken,
  companyName,
  priceShown,
  productId,
}: {
  to: string;
  name?: string;
  loginToken: string;
  unsubscribeToken: string;
  companyName?: string;
  priceShown?: string;
  productId?: string;
}) {
  const firstName = getFirstName(name);
  const cleanCompany = cleanCompanyName(companyName);
  const product = recoveryProduct(productId, priceShown);
  const checkoutUrl = recoveryCheckoutUrl(product.path, loginToken, 'cart_day5');

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0; font-size:16px; color:#0f172a; font-weight:600;">
      This is my final note before our system archives your pending assessment session.
    </p>
    <p style="margin: 0 0 16px 0;">
      If you are still looking to extend runway with non-dilutive government capital (wage subsidies, R&amp;D tax credits, and market expansion grants), your reserved checkout link expires tonight:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:15px 32px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:15px;box-shadow:0 4px 10px rgba(5,150,105,0.25);">
        Complete Checkout &amp; Access Dashboard (${product.price}) &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nFinal note before your pending session is archived. Resume your ${product.name} order here before the link expires tonight:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFSI Digital`;

  return sendEmail({ to, subject: `Archiving your application data (final link for ${cleanCompany || firstName})`, html, text, tagType: 'cart-recovery-3', companyName: cleanCompany });
}

// ── REPORT NOT VIEWED RECOVERY EMAIL (24 hours after purchase) ──
export async function sendReportNotOpenedEmail({
  to,
  name,
  loginToken,
  unsubscribeToken,
  companyName
}: {
  to: string;
  name?: string;
  loginToken: string;
  unsubscribeToken: string;
  companyName?: string;
}) {
  const firstName = getFirstName(name);
  const reportUrl = `https://www.fsidigital.ca/calculator?token=${loginToken}&utm_source=alert_nurture&utm_medium=email&utm_campaign=report_not_viewed`;
  const subject = `Your Funding Opportunity Assessment is Ready`;

  const html = wrapCartRecoveryTemplate(`
    <p style="margin: 0 0 16px 0;">
      Thank you again for purchasing your assessment report.
    </p>
    <p style="margin: 0 0 20px 0;">
      We noticed you haven't opened your <strong>Executive Funding Assessment</strong> report yet. It is fully compiled and ready to view, print, or save as a PDF inside your private portal:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${reportUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        View My Assessment Report &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nThank you again for purchasing your assessment report.\n\nWe noticed you haven't opened your report yet. It is ready to view, print, or download in your portal:\n${reportUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject, html, text, tagType: 'report-not-viewed-recovery', companyName });
}
