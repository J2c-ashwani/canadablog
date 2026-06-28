import fs from 'fs';
import path from 'path';

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const CONTENT_DIR = path.join(__dirname, '../lib/data/blog-content');

const postToAdd = {
  metadata: {
    id: 9003,
    slug: 'canadian-government-grants-database-2026',
    title: "250+ Canadian Government Grants for Small Businesses (Updated 2026)",
    excerpt: "The most comprehensive, up-to-date directory of federal and provincial government business grants, tax credits, and loans available to Canadian SMEs in 2026.",
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
      metaTitle: "250+ Canadian Government Grants for Small Business (2026 Directory)",
      metaDescription: "Access the definitive directory of 250+ Canadian business grants, tax incentives, and low-interest government loans for startups and SMEs in 2026.",
      intent: "grant"
    }
  },
  content: {
    shortAnswer: "Yes, Canada offers over 250 active federal and provincial funding programs. These are split into non-repayable grants, refundable tax credits (like SR&ED), wage subsidies for hiring, and government-backed bank loans (like the CSBFP). Startups and SMEs can stack these programs to offset up to 75% of their R&D, hiring, and capital expenditure costs.",
    shortAnswerQuestion: "How many government grants are available for small businesses in Canada?",
    content: `<h2>The Ultimate Canadian SME Funding Directory</h2>
<p>Navigating the landscape of Canadian government funding is notoriously complex. Between federal programs, provincial initiatives, and industry-specific tax credits, there are currently over <strong>250 active funding opportunities</strong> for small-to-medium enterprises (SMEs) in Canada.</p>
<p>To help you save hundreds of hours of manual research, we have compiled the ultimate master directory of top Canadian business grants, subsidies, and loans for 2026. This database is structured by funding category and includes direct links to detailed guides and application portals.</p>

<div class="my-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
  <h4 class="font-bold text-slate-800 text-sm mb-1.5 flex items-center gap-2">
    💡 Looking for Live Filters?
  </h4>
  <p class="text-xs text-slate-650 leading-relaxed mb-2.5">
    This guide lists the highest-volume core programs. To search, filter, and match all 250+ active grants in real-time by your specific province, industry, and project type, use our live interactive database.
  </p>
  <a href="/grants" class="inline-flex items-center text-xs font-bold text-indigo-700 hover:underline">
    Browse Live Interactive Grants Database →
  </a>
</div>

<h2>1. Federal R&D & Innovation Programs (Top Tier)</h2>
<p>These programs provide the largest cash injections for technology companies, software startups, and advanced manufacturers conducting R&D:</p>
<ul>
  <li><strong>Scientific Research & Experimental Development (SR&ED):</strong> Canada's largest tax incentive. Offers up to a <strong>35% refundable tax credit</strong> on qualifying R&D salaries, materials, and subcontracted work. Over $3.5B is paid out annually to 26,000+ claimants. <a href="/topics/sred-tax-credit-eligibility" class="text-indigo-650 hover:underline">Read SR&ED Eligibility Guide</a>.</li>
  <li><strong>NRC Industrial Research Assistance Program (IRAP):</strong> Discretionary, non-repayable grants administered by the National Research Council. Typically co-funds <strong>50% to 80% of internal R&D developer salaries</strong> for projects with high commercial potential. <a href="/topics/irap-funding-eligibility" class="text-indigo-650 hover:underline">Read IRAP Eligibility Guide</a>.</li>
  <li><strong>Canada Digital Adoption Program (CDAP):</strong> Grants and financing for software and digital transformation. Offers the <em>Boost Your Business Technology</em> stream ($15,000 grant for consultant roadmaps) and the <em>Grow Your Business Online</em> stream ($2,400 e-commerce micro-grants). <a href="/topics/canada-digital-adoption-program-grant" class="text-indigo-650 hover:underline">Read CDAP Guide</a>.</li>
</ul>

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
</ul>`
  }
};

async function addGrantsDatabasePost() {
  console.log('📝 Starting Grants Database blog post generation...');

  try {
    // 1. Read metadata file
    if (!fs.existsSync(METADATA_PATH)) {
      throw new Error(`Metadata file not found at: ${METADATA_PATH}`);
    }

    const fileContent = fs.readFileSync(METADATA_PATH, 'utf8');
    const data = JSON.parse(fileContent);

    const slug = postToAdd.metadata.slug;

    // Check if already exists in metadata
    const existsMeta = data.metadata.some((p: any) => p.slug === slug);
    if (!existsMeta) {
      console.log(`➕ Inserting metadata for slug: ${slug}`);
      // Insert at the beginning of the array so it's the newest post
      data.metadata.unshift(postToAdd.metadata);
    } else {
      console.log(`ℹ️ Metadata for slug: ${slug} already exists. Skipping.`);
    }

    // Add to slugToPath
    if (!data.slugToPath[slug]) {
      console.log(`➕ Adding path mapping to slugToPath for: ${slug}`);
      data.slugToPath[slug] = `./blog-posts/tips-guides/${slug}.ts`;
    }

    // Write content JSON file
    const contentFilePath = path.join(CONTENT_DIR, `${slug}.json`);
    console.log(`💾 Writing content JSON to: ${contentFilePath}`);
    
    const fullContentObj = {
      ...postToAdd.metadata,
      ...postToAdd.content
    };

    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    fs.writeFileSync(contentFilePath, JSON.stringify(fullContentObj, null, 2), 'utf8');

    // Save metadata back
    console.log(`💾 Saving updated blogMetadata.json...`);
    fs.writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2), 'utf8');

    console.log('🎉 Grants Database blog post successfully generated!');
    process.exit(0);

  } catch (err: any) {
    console.error('❌ Error generating grants database post:', err);
    process.exit(1);
  }
}

addGrantsDatabasePost();
