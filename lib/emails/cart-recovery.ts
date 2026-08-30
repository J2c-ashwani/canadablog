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
    <div style="background-color:#f8fafc;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;">
      <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="padding-bottom:18px;border-bottom:1px solid #f1f5f9;margin-bottom:24px;text-align:left;">
          <span style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">FSI <span style="color:#059669;">Digital</span></span>
          <span style="float:right;font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;padding:2px 8px;background-color:#ecfdf5;border-radius:4px;margin-top:2px;">
            Secure Checkout
          </span>
        </div>

        <!-- Body Content -->
        <div style="font-size:15px;color:#334155;line-height:1.6;text-align:left;">
          <p style="font-weight:600;margin-top:0;margin-bottom:16px;">Hi ${firstName},</p>
          
          ${contentHtml}

        </div>

        <!-- Footer -->
        <div style="padding-top:24px;border-top:1px solid #f1f5f9;margin-top:32px;font-size:13px;color:#475569;text-align:left;line-height:1.5;">
          Best regards,<br/>
          <strong>Ashwani K</strong><br/>
          <span style="color:#64748b;font-size:12px;">Founder, FSI Digital</span>
          
          <div style="margin-top:24px;padding-top:16px;border-top:1px dashed #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">
            This email was sent because you started checkout for our funding analysis products.<br>
            <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline;margin-top:8px;display:inline-block;">Unsubscribe from these emails</a>
          </div>
        </div>

      </div>
    </div>
  `;
}

type RecoveryProductId = 'funding-match-report' | 'funding-roadmap' | 'funding-bundle' | 'funding-toolkit' | 'funding-approval-library';

function recoveryProduct(productId?: string, priceShown?: string) {
  const products: Record<RecoveryProductId, { name: string; path: string; price: string }> = {
    'funding-match-report': { name: 'Funding Match Report', path: '/products/funding-match-report', price: '$19' },
    'funding-roadmap': { name: 'Funding Strategy & Action Plan', path: '/products/action-plan', price: '$49' },
    'funding-bundle': { name: 'Complete Funding Bundle', path: '/products/bundle', price: '$79' },
    'funding-toolkit': { name: 'Funding Application Toolkit', path: '/products/toolkit', price: '$29' },
    'funding-approval-library': { name: 'Funding Approval Library', path: '/products/approval-library', price: '$9' },
  };
  if (productId && productId in products) return products[productId as RecoveryProductId];
  if (priceShown === '79' || priceShown === '108') return products['funding-bundle'];
  if (priceShown === '49') return products['funding-roadmap'];
  if (priceShown === '29') return products['funding-toolkit'];
  if (priceShown === '9') return products['funding-approval-library'];
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
    <p style="margin: 0 0 16px 0;">
      I noticed you started checking out for your <strong>${product.name}</strong> ${cleanCompany ? `for <strong>${escapeHtml(cleanCompany)}</strong>` : ''} but didn't finish.
    </p>
    <p style="margin: 0 0 16px 0;">
      The product compares your saved profile with programs in the current FSI database. If you still want the report, you can resume the checkout you started.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Complete My Checkout (${product.price}) &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nYou started checkout for the ${product.name} but did not complete it. If you still want the self-serve product, resume here:\n${checkoutUrl}\n\nProgram status and full eligibility should always be confirmed with the official funding body.\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `You were one step away from unlocking your matches`, html, text, tagType: 'cart-recovery-1', companyName: cleanCompany });
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
    <p style="margin: 0 0 16px 0;">
      You started checkout for the ${product.name} ${cleanCompany ? `for <strong>${escapeHtml(cleanCompany)}</strong>` : ''}, but no provider-verified purchase is recorded.
    </p>
    <p style="margin: 0 0 20px 0;">
      If you still want the self-serve report, resume the secure checkout below. No purchase is required to continue using the free site resources.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Resume Secure Checkout (${product.price}) &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nYou started checkout for the ${product.name}, but no provider-verified purchase is recorded. If you still want the self-serve product, resume here:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Your matches are still waiting`, html, text, tagType: 'cart-recovery-2', companyName: cleanCompany });
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
    <p style="margin: 0 0 16px 0;">
      This is the final automated reminder about the ${product.name} checkout you started ${cleanCompany ? `for <strong>${escapeHtml(cleanCompany)}</strong>` : ''}.
    </p>
    <p style="margin: 0 0 20px 0;">
      If you are still actively looking for non-dilutive capital (grants, tax credits, and subsidies) to fund hiring, exporting, or product development, you can resume your checkout below:
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${checkoutUrl}" style="background-color:#059669;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block;font-size:14px;box-shadow:0 4px 6px -1px rgba(5,150,105,0.2);">
        Complete Checkout &amp; Access Dashboard &rarr;
      </a>
    </div>
  `, unsubscribeToken, firstName);

  const text = `Hi ${firstName},\n\nThis is the final automated reminder about the ${product.name} checkout you started. You can resume here if you still want it:\n${checkoutUrl}\n\nBest regards,\nAshwani K\nFounder, FSI Digital`;

  return sendEmail({ to, subject: `Still interested in funding opportunities?`, html, text, tagType: 'cart-recovery-3', companyName: cleanCompany });
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
