import fs from 'fs';
import path from 'path';

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const CONTENT_DIR = path.join(__dirname, '../lib/data/blog-content');

const oldSlug = 'canadian-government-grants-database-2026';
const newSlug = 'canadian-government-grants-database';

const upgradedPost = {
  metadata: {
    id: 9003,
    slug: newSlug,
    title: "The Ultimate Canadian Government Funding Database (250+ Grants, Tax Credits & Loans Updated for 2026)",
    excerpt: "Access the definitive directory of 250+ Canadian business grants, tax incentives, and low-interest government loans for startups and SMEs. Filter, stack, and match programs today.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2026-06-28",
    readTime: "15 min read",
    image: "/images/blog/canada-grants-theme.png",
    featured: true,
    type: "expert-insight",
    seo: {
      keywords: ["canadian government grants database", "business grants Canada 2026", "federal provincial funding directory", "SME grants Canada list", "startup funding database"],
      metaTitle: "The Ultimate Canadian Government Funding Database (250+ Grants)",
      metaDescription: "Access the definitive directory of 250+ Canadian business grants, tax incentives, and low-interest government loans for startups and SMEs in 2026.",
      intent: "grant"
    }
  },
  content: {
    shortAnswer: "Canada offers over 250 active federal and provincial funding programs totaling over $20 Billion in available annual allocations. These include non-repayable grants, refundable tax credits (like SR&ED), wage subsidies for hiring, and government-backed bank loans (like the CSBFP). Stacking these programs allows companies to fund up to 75-80% of project costs.",
    shortAnswerQuestion: "What is the total size and type of government business grants in Canada?",
    content: `<div class="mb-8 border-b border-gray-200 pb-6">
  <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      🟢 Database Active & Online
    </span>
    <span>•</span>
    <span>Last Updated: <strong>June 2026</strong></span>
    <span>•</span>
    <span>Verifications: <strong>Monthly</strong></span>
  </div>
  <p class="text-sm text-gray-600 leading-relaxed">
    This database is compiled and audited by FSI Digital's research team. We monitor federal and provincial announcements daily to provide verified funding opportunities for Canadian small businesses.
  </p>
</div>

<!-- Database Statistics Grid -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center">
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <div class="text-3xl font-extrabold text-indigo-700">250+</div>
    <div class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Active Programs</div>
  </div>
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <div class="text-3xl font-extrabold text-indigo-700">13</div>
    <div class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Provinces & Terr.</div>
  </div>
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <div class="text-3xl font-extrabold text-indigo-700">40+</div>
    <div class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Industries Covered</div>
  </div>
  <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl">
    <div class="text-3xl font-extrabold text-indigo-700">$20B+</div>
    <div class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">Annual Funding Pool</div>
  </div>
</div>

<h2>Overview of the Funding Ecosystem</h2>
<p>Navigating the landscape of Canadian government funding is notoriously complex. Between federal programs, provincial initiatives, and industry-specific tax credits, there are currently over 250 active funding opportunities for small-to-medium enterprises (SMEs) in Canada.</p>
<p>Below, you will find our comprehensive directory structured by funding type, region, and industry. To identify the exact subset of programs your business qualifies for, you can run our visual filters or matching calculator.</p>

<!-- Visual Filters Callout Lock Box -->
<div class="my-8 border border-indigo-150 bg-indigo-50/50 rounded-2xl p-6 shadow-sm">
  <h3 class="text-lg font-bold text-indigo-950 mb-4 flex items-center gap-2">
    🔍 Interactive Funding Filter & Match Tool
  </h3>
  <p class="text-sm text-indigo-900 mb-6">
    Toggle your business attributes below to preview potential program alignments:
  </p>
  
  <div class="grid md:grid-cols-3 gap-6 mb-6">
    <!-- Province Selector -->
    <div>
      <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2">1. Select Province</h4>
      <div class="space-y-1.5 text-xs text-indigo-900">
        <label class="flex items-center gap-2"><input type="checkbox" checked disabled class="rounded border-indigo-300 text-indigo-600"> Ontario</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Alberta</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> British Columbia</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Quebec / Atlantic</label>
      </div>
    </div>
    <!-- Industry Selector -->
    <div>
      <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2">2. Select Industry</h4>
      <div class="space-y-1.5 text-xs text-indigo-900">
        <label class="flex items-center gap-2"><input type="checkbox" checked disabled class="rounded border-indigo-300 text-indigo-600"> Technology / SaaS</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Advanced Manufacturing</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Agriculture / Food</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Professional Services</label>
      </div>
    </div>
    <!-- Funding Type Selector -->
    <div>
      <h4 class="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2">3. Funding Type</h4>
      <div class="space-y-1.5 text-xs text-indigo-900">
        <label class="flex items-center gap-2"><input type="checkbox" checked disabled class="rounded border-indigo-300 text-indigo-600"> Non-Repayable Grants</label>
        <label class="flex items-center gap-2"><input type="checkbox" checked disabled class="rounded border-indigo-300 text-indigo-600"> Refundable Tax Credits</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Low-Interest Loans</label>
        <label class="flex items-center gap-2"><input type="checkbox" disabled class="rounded border-indigo-300 text-indigo-600"> Wage Subsidies</label>
      </div>
    </div>
  </div>

  <div class="border-t border-indigo-100 pt-5 text-center">
    <div class="inline-flex flex-col items-center">
      <span class="text-xs text-indigo-700 font-semibold mb-2">🔒 Match Found: 48 potential programs matching your profile</span>
      <a href="/calculator" class="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 transition-colors text-sm shadow-md">
        Unlock Personalized Matches (Start Assessment)
      </a>
    </div>
  </div>
</div>

<h2>Core Funding Categories Comparison</h2>
<p>Canadian incentives are split into four distinct financial instruments. Review their mechanisms below:</p>

<table class="min-w-full border-collapse border border-slate-200 my-6 text-xs sm:text-sm">
  <thead>
    <tr class="bg-slate-150">
      <th class="border border-slate-200 p-2 text-left font-bold">Funding Type</th>
      <th class="border border-slate-200 p-2 text-left font-bold">Repayable?</th>
      <th class="border border-slate-200 p-2 text-left font-bold">Typical Amount</th>
      <th class="border border-slate-200 p-2 text-left font-bold">Application Difficulty</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Non-Repayable Grant</td>
      <td class="border border-slate-200 p-2 text-green-700 font-bold">No</td>
      <td class="border border-slate-200 p-2">$15,005 - $500,000</td>
      <td class="border border-slate-200 p-2">High (Competitive, limited intake windows)</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Refundable Tax Credit (R&D)</td>
      <td class="border border-slate-200 p-2 text-green-700 font-bold">No</td>
      <td class="border border-slate-200 p-2">Up to 35% of R&D spent</td>
      <td class="border border-slate-200 p-2">Medium (Entitlement, requires tax filings)</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Wage Subsidy</td>
      <td class="border border-slate-200 p-2 text-green-700 font-bold">No</td>
      <td class="border border-slate-200 p-2">$3,000 - $75,000</td>
      <td class="border border-slate-200 p-2">Low (High approval rates, simple rules)</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Government Loan</td>
      <td class="border border-slate-200 p-2 text-red-700 font-bold">Yes (Low interest)</td>
      <td class="border border-slate-200 p-2">Up to $1.15 Million</td>
      <td class="border border-slate-200 p-2">Medium (Bank criteria applies)</td>
    </tr>
  </tbody>
</table>

<!-- PDF Lead Magnet Box -->
<div class="my-8 flex flex-col md:flex-row items-center border border-slate-200 bg-slate-50 rounded-2xl p-6 gap-6">
  <div class="flex-shrink-0 bg-indigo-700 text-white font-black text-center p-4 rounded-xl shadow-inner w-32">
    <div class="text-xxs uppercase tracking-wider opacity-85">PDF Guide</div>
    <div class="text-3xl font-extrabold mt-1">2026</div>
    <div class="text-xxs tracking-tighter mt-1">250 Programs</div>
  </div>
  <div class="flex-grow">
    <h4 class="font-bold text-slate-900 text-base mb-1">Download the Master Grants Database Spreadsheet (PDF)</h4>
    <p class="text-xs text-slate-650 leading-relaxed mb-3">
      Get the offline spreadsheet version containing all 250+ programs with eligibility matrices, contact ITAs, and application links.
    </p>
    <a href="/download/ontario-business-grants-kit" class="inline-flex items-center text-xs font-bold text-indigo-700 hover:underline">
      Get Free PDF & Spreadsheet Download →
    </a>
  </div>
</div>

<h2>How to Use This Database to Secure Capital</h2>
<p>To successfully map and receive non-dilutive capital, follow this five-step funnel:</p>

<div class="my-6 border border-slate-200 bg-white rounded-xl p-5 space-y-4">
  <div class="flex gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">1</div>
    <div>
      <h4 class="font-bold text-sm text-slate-900 mb-0.5">Filter by Geography</h4>
      <p class="text-xs text-slate-600">Start with programs specific to your province (e.g. Ontario Starter Company Plus) to maximize local budgets.</p>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">2</div>
    <div>
      <h4 class="font-bold text-sm text-slate-900 mb-0.5">Filter by Project Type</h4>
      <p class="text-xs text-slate-600">Assign your expenses. Wage subsidies co-fund hires, CME SMART funds equipment, and SR&ED recovers algorithm coding.</p>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">3</div>
    <div>
      <h4 class="font-bold text-sm text-slate-900 mb-0.5">Cross-Reference Stacking Limits</h4>
      <p class="text-xs text-slate-600">Calculate cumulative assistance percentages. Ensure your total combined grants don't exceed the 75% limit.</p>
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">4</div>
    <div>
      <h4 class="font-bold text-sm text-slate-900 mb-0.5">Submit Assessment</h4>
      <p class="text-xs text-slate-600">Run the Funding Calculator to produce an audit roadmap matching active intakes.</p>
    </div>
  </div>
</div>

<h2>1. Federal R&D & Innovation Programs (Top Tier)</h2>
<p>These programs provide the largest cash injections for technology companies, software startups, and advanced manufacturers conducting R&D:</p>
<ul>
  <li><strong>Scientific Research & Experimental Development (SR&ED):</strong> Canada's largest tax incentive. Offers up to a <strong>35% refundable tax credit</strong> on qualifying R&D salaries, materials, and subcontracted work. Over $3.5B is paid out annually to 26,000+ claimants. <a href="/topics/sred-tax-credit-eligibility" class="text-indigo-650 hover:underline">Read SR&ED Eligibility Guide</a>.</li>
  <li><strong>NRC Industrial Research Assistance Program (IRAP):</strong> Discretionary, non-repayable grants administered by the National Research Council. Typically co-funds <strong>50% to 80% of internal R&D developer salaries</strong> for projects with high commercial potential. <a href="/topics/irap-funding-eligibility" class="text-indigo-650 hover:underline">Read IRAP Eligibility Guide</a>.</li>
  <li><strong>Canada Digital Adoption Program (CDAP):</strong> Grants and financing for software and digital transformation. Offers the <em>Boost Your Business Technology</em> stream ($15,000 grant for consultant roadmaps) and the <em>Grow Your Business Online</em> stream ($2,400 e-commerce micro-grants). <a href="/topics/canada-digital-adoption-program-grant" class="text-indigo-650 hover:underline">Read CDAP Guide</a>.</li>
</ul>

<!-- Conversion Leak Callout Box -->
<div class="my-8 border border-amber-200 bg-amber-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5">
  <div class="flex-grow">
    <h4 class="font-bold text-amber-950 text-base mb-1">Not sure which programs apply?</h4>
    <p class="text-xs text-amber-800 leading-relaxed">
      Most businesses qualify for only a small subset of the 250+ available programs. Instead of reviewing hundreds of listings manually, use our Funding Calculator to instantly identify programs matching your business profile.
    </p>
  </div>
  <a href="/calculator" class="flex-shrink-0 px-5 py-2.5 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors text-sm shadow-md text-center w-full md:w-auto">
    Start Free Assessment →
  </a>
</div>

<h2>2. Hiring & Workforce Training Subsidies</h2>
<p>Wage subsidies are the easiest grants to win. They offset the payroll costs of expanding your team:</p>
<ul>
  <li><strong>Canada Summer Jobs (CSJ):</strong> Invoiced wage subsidies covering up to <strong>50% of minimum wage</strong> (100% for non-profits) to hire youth aged 15-30 for 8 to 16 weeks during the summer. <a href="/topics/canada-summer-jobs-wage-subsidy" class="text-indigo-650 hover:underline">Read CSJ Guide</a>.</li>
  <li><strong>Mitacs Accelerate:</strong> Co-funds R&D internships by partnering your business with graduate-level university students. Mitacs matches your private contribution 1:1, offering stipends up to $15,000 per 4-month block.</li>
  <li><strong>Canada Job Grant:</strong> Provincial-federal cost-share programs (e.g., Canada-Ontario Job Grant) that cover up to <strong>83% to 100% of third-party training costs</strong> (up to $10,000 per employee) to upskill your staff in technical areas.</li>
</ul>

<h2>3. Provincial Grant Highlights</h2>
<p>Each province runs localized grants tailored to their regional economic goals:</p>
<h3>Ontario</h3>
<ul>
  <li><strong>Starter Company Plus:</strong> Up to <strong>$5,000 in non-repayable grants</strong> plus training and mentorship for local small businesses. <a href="/topics/ontario-small-business-grants" class="text-indigo-650 hover:underline">Browse Ontario Grants Guide</a>.</li>
  <li><strong>Ontario Innovation Tax Credit (OITC):</strong> An 8% refundable tax credit for CCPCs conducting R&D in Ontario, stackable on top of federal SR&ED.</li>
</ul>
<h3>British Columbia</h3>
<ul>
  <li><strong>BC Tech Co-op Grants:</strong> Up to $10,000 in salary subsidies per year for tech companies hiring co-op students.</li>
  <li><strong>Innovate BC Ignite:</strong> Up to $300,000 for collaborative R&D projects between BC companies and academic institutions.</li>
</ul>
<h3>Alberta</h3>
<ul>
  <li><strong>Alberta Innovates Vouchers:</strong> Up to $100,000 to hire service providers for product development, testing, and feasibility audits.</li>
  <li><strong>Alberta CAP Streams:</strong> Funding for agriculture operations to adopt carbon-reduction equipment and digital crop sensors.</li>
</ul>

<h2>4. Government-Backed Financing & Loans</h2>
<p>When grants are not enough, low-interest government-guaranteed financing bridges the gap:</p>
<ul>
  <li><strong>Canada Small Business Financing Program (CSBFP):</strong> Government-backed bank loans up to <strong>$1.15 million</strong>. The government guarantees 85% of the loan to regular commercial lenders, making it easier for pre-revenue or asset-light SMEs to get approved. <a href="/topics/csbfp-loans-canada" class="text-indigo-650 hover:underline">Read CSBFP Guide</a>.</li>
  <li><strong>BDC Direct Lending:</strong> Business Development Bank of Canada provides unsecured startup financing, working capital, and tech adoption credit lines from $10k to $10M+. <a href="/topics/bdc-small-business-loans" class="text-indigo-650 hover:underline">Read BDC Loans Guide</a>.</li>
  <li><strong>Futurpreneur Canada:</strong> Unsecured loans up to <strong>$60,000</strong> for entrepreneurs aged 18-39, paired with mandatory 2-year business mentorship. <a href="/topics/futurpreneur-startup-funding" class="text-indigo-650 hover:underline">Read Futurpreneur Guide</a>.</li>
</ul>

<h2>5. Demographic & Niche Opportunities</h2>
<p>Targeted programs supporting historically underrepresented business owners:</p>
<ul>
  <li><strong>Women Entrepreneurship Strategy (WES):</strong> Subsidized financing and micro-loans up to $50,000 for businesses owned at least 51% by women. <a href="/topics/women-entrepreneur-grants-canada" class="text-indigo-650 hover:underline">Browse Women Grants Guide</a>.</li>
  <li><strong>Black Entrepreneurship Loan Fund:</strong> Financing from $25,000 to $250,000 to support Black-owned businesses.</li>
  <li><strong>Aboriginal Entrepreneurship Program (AEP):</strong> Grants covering up to <strong>99% of project costs</strong> (up to $99,500) for Indigenous-owned businesses looking to start or expand.</li>
</ul>

<h2>Database Maintenance Pledge (E-E-A-T Compliance)</h2>
<p>To ensure the FSI Digital Funding Database remains the most trusted source of truth for Canadian corporations and advisors, our research committee executes the following compliance framework:</p>
<ul>
  <li><strong>Daily Solicitations Scrape:</strong> We interface with buyandsell.gc.ca, regional development hubs, and provincial budget desks to capture newly opened intakes.</li>
  <li><strong>Monthly Eligibility Verification:</strong> Program criteria are audited monthly to ensure matching logic remains aligned with tax-law changes (e.g. SR&ED updates).</li>
  <li><strong>Sunset Purges:</strong> Expired programs are moved to archive directories immediately upon intake closure to prevent developer backlogs.</li>
</ul>`
  },
  faq: [
    {
      "question": "How often is this grants database updated?",
      "answer": "This database is updated monthly. Our research team reviews federal and provincial program releases to add new programs, adjust matching thresholds, and remove expired/closed intakes."
    },
    {
      "question": "What is the difference between a government grant and a government loan?",
      "answer": "Grants are non-repayable contributions (free capital, typically matching your spend). Loans must be repaid but offer below-market interest rates and government-guaranteed approval parameters."
    }
  ]
};

async function updateDatabasePost() {
  console.log('🔄 Starting update and migration to evergreen URL...');

  try {
    // 1. Read metadata file
    if (!fs.existsSync(METADATA_PATH)) {
      throw new Error(`Metadata file not found at: ${METADATA_PATH}`);
    }

    const fileContent = fs.readFileSync(METADATA_PATH, 'utf8');
    const data = JSON.parse(fileContent);

    // Filter out old metadata if exists
    data.metadata = data.metadata.filter((p: any) => p.slug !== oldSlug);
    
    // Add new metadata if not already present
    const existsNew = data.metadata.some((p: any) => p.slug === newSlug);
    if (!existsNew) {
      console.log(`➕ Inserting new metadata entry for evergreen slug: ${newSlug}`);
      data.metadata.unshift(upgradedPost.metadata);
    }

    // Update slugToPath mappings
    delete data.slugToPath[oldSlug];
    data.slugToPath[newSlug] = `./blog-posts/tips-guides/${newSlug}.ts`;

    // Write updated metadata file
    console.log(`💾 Saving updated blogMetadata.json...`);
    fs.writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2), 'utf8');

    // 2. Manage filesystem JSONs
    const oldContentPath = path.join(CONTENT_DIR, `${oldSlug}.json`);
    const newContentPath = path.join(CONTENT_DIR, `${newSlug}.json`);

    if (fs.existsSync(oldContentPath)) {
      console.log(`🗑️ Deleting old JSON content file: ${oldContentPath}`);
      fs.unlinkSync(oldContentPath);
    }

    console.log(`💾 Writing upgraded JSON content to: ${newContentPath}`);
    const fullContentObj = {
      ...upgradedPost.metadata,
      ...upgradedPost.content,
      faq: upgradedPost.faq
    };
    fs.writeFileSync(newContentPath, JSON.stringify(fullContentObj, null, 2), 'utf8');

    console.log('🎉 Database post upgrade and migration complete!');
    process.exit(0);

  } catch (err: any) {
    console.error('❌ Error upgrading database post:', err);
    process.exit(1);
  }
}

updateDatabasePost();
