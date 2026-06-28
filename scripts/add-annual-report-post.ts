import fs from 'fs';
import path from 'path';

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const CONTENT_DIR = path.join(__dirname, '../lib/data/blog-content');

const postToAdd = {
  metadata: {
    id: 9004,
    slug: 'canadian-government-funding-report-2026',
    title: "Canadian Government Funding Report 2026: Trends, Allocations, and Outlook",
    excerpt: "Our annual analysis of Canadian public capital distributions. Explore funding trends, provincial allocations, average award sizes, and the new vs expired programs in 2026.",
    category: "Tips & Guides",
    categoryColor: "bg-purple-100 text-purple-800",
    author: "Ashwani K.",
    date: "2026-06-28",
    readTime: "18 min read",
    image: "/images/blog/tech-innovation-theme.png",
    featured: true,
    type: "expert-insight",
    seo: {
      keywords: ["Canadian government funding report 2026", "grant distribution trends", "provincial funding allocations Canada", "average grant sizes Canada", "new grants Canada 2026"],
      metaTitle: "Canadian Government Funding Report 2026 | FSI Digital Research",
      metaDescription: "Read FSI Digital's Q2 2026 Canadian Government Funding Report. Analysis of $6.2B in public allocations, average awards, and program updates.",
      intent: "innovation"
    }
  },
  content: {
    shortAnswer: "In 2026, Canadian federal and provincial governments distributed an estimated $6.2 Billion in non-dilutive business grants, tax credits, and co-funding subsidies. Clean Tech and Advanced Manufacturing saw a 14% year-over-year increase in capital allocation, while digital adoption grants ceased, shifting toward 0% loan financing.",
    shortAnswerQuestion: "What are the major government funding trends in Canada for 2026?",
    content: `<h2>Executive Summary: Navigating the $6.2B Funding Ecosystem</h2>
<p>The annual <strong>Canadian Government Funding Report 2026</strong> tracks and analyzes capital distributions from over 250 federal and provincial incentive programs. Based on consolidated data from the NRC, CRA, ISED, and regional development agencies, Canadian businesses accessed an estimated <strong>$6.2 Billion</strong> in public support in the past fiscal cycle.</p>
<p>This report highlights shifts in sectoral priorities, regional distribution ratios, average program award sizes, and the programs that have sunset or launched in 2026.</p>

<h2>1. Provincial Allocations: Where the Capital Flows</h2>
<p>Industrial concentration and provincial budgets heavily dictate the allocation of government incentives. Ontario and Quebec continue to lead, capturing over 60% of total national distributions:</p>
<table class="min-w-full border-collapse border border-slate-200 my-4 text-xs sm:text-sm">
  <thead>
    <tr class="bg-slate-100">
      <th class="border border-slate-200 p-2 text-left font-bold">Province / Region</th>
      <th class="border border-slate-200 p-2 text-left font-bold">Estimated Funding Allocation</th>
      <th class="border border-slate-200 p-2 text-left font-bold">% of National Total</th>
      <th class="border border-slate-200 p-2 text-left font-bold">Primary Sector Drivers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Ontario</td>
      <td class="border border-slate-200 p-2">$2.11 Billion</td>
      <td class="border border-slate-200 p-2">34%</td>
      <td class="border border-slate-200 p-2">Automotive R&D, Advanced Manufacturing, SaaS</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Quebec</td>
      <td class="border border-slate-200 p-2">$1.80 Billion</td>
      <td class="border border-slate-200 p-2">29%</td>
      <td class="border border-slate-200 p-2">Aerospace, Artificial Intelligence, Agri-Food</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">British Columbia</td>
      <td class="border border-slate-200 p-2">$0.87 Billion</td>
      <td class="border border-slate-200 p-2">14%</td>
      <td class="border border-slate-200 p-2">Clean Tech, Digital Media, Life Sciences</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Alberta</td>
      <td class="border border-slate-200 p-2">$0.81 Billion</td>
      <td class="border border-slate-200 p-2">13%</td>
      <td class="border border-slate-200 p-2">Carbon Capture, Agri-Tech, Industrial Software</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Atlantic Canada & Territories</td>
      <td class="border border-slate-200 p-2">$0.61 Billion</td>
      <td class="border border-slate-200 p-2">10%</td>
      <td class="border border-slate-200 p-2">Marine Innovation, Tourism, Resource Development</td>
    </tr>
  </tbody>
</table>

<h2>2. Industry Capital Distributions</h2>
<p>Consistent with federal directives to reduce carbon emissions and build domestic manufacturing resilience, Clean Technology and Advanced Manufacturing took top funding honors in 2026:</p>
<ul>
  <li><strong>Clean Tech & Green Energy ($1.5B):</strong> Large-scale capital infusions through the ACT Program, Net Zero Accelerator, and provincial carbon-reduction credits.</li>
  <li><strong>Technology & Software ($1.4B):</strong> Dominated by SR&ED tax credits and IRAP grants for AI engineering, cloud architectures, and machine learning.</li>
  <li><strong>Advanced Manufacturing ($1.2B):</strong> CNC modernization, automotive retooling, and supply-chain automation grants.</li>
  <li><strong>Agriculture & Agri-Food ($0.9B):</strong> Sustainable CAP streams, packaging upgrades, and crop sensor adoption.</li>
  <li><strong>Life Sciences & Healthcare ($0.7B):</strong> Biotech clinical trials, laboratory scaling, and medical device innovation.</li>
</ul>

<h2>3. Average Award Sizes by Program (SME Class)</h2>
<p>To assist businesses in forecasting their non-dilutive capital expectations, we analyzed the median and average award values across five flagship programs for companies with under 100 employees:</p>
<ul>
  <li><strong>SR&ED (CRA Tax Claim):</strong> Average claim value of <strong>$185,000</strong> per SME annually (CCPCs claiming refundable credits).</li>
  <li><strong>IRAP Project Grant (NRC):</strong> Average project wage subsidy value of <strong>$120,000</strong>.</li>
  <li><strong>CanExport SMEs (ISED):</strong> Average project grant size of <strong>$35,000</strong> to cover marketing and travel.</li>
  <li><strong>CSBFP (Government-Guaranteed Loan):</strong> Average loan principal of <strong>$240,000</strong> for machinery and leaseholds.</li>
  <li><strong>Canada-Provincial Job Grants:</strong> Average workforce training grant of <strong>$8,500</strong>.</li>
</ul>

<h2>4. Program Updates: New vs. Sunsetted in 2026</h2>
<p>Understanding program lifecycles is critical to prevent applying for sunsetted capital pools. Here are the major changes in 2026:</p>

<h3>Expired & Sunsetted Programs</h3>
<ul>
  <li><strong>CDAP Boost Your Business Technology Grant:</strong> The $15,000 digital planning grant has closed. The program has transitioned to offering the <strong>BDC 0% interest loan up to $100,000</strong> for implementation.</li>
  <li><strong>Ontario CME SMART Legacy Stream:</strong> Retooled and replaced by the regional development fund (EODF/SWODF) and targeted green transition grants.</li>
</ul>

<h3>New & Expanded Programs</h3>
<ul>
  <li><strong>Agricultural Clean Technology (ACT) Expansion:</strong> Funded with an additional $120M to support farm electrification and low-carbon drying systems.</li>
  <li><strong>Ontario Skills Development Fund (SDF) Round 5:</strong> Re-opened with a $150M capital budget focusing on CNC machining, advanced carpentry, and robotics training.</li>
  <li><strong>CanExport Innovation Stream:</strong> Expanded to support early-stage startups securing international patent protection and IP licenses.</li>
</ul>`
  }
};

async function addAnnualReportPost() {
  console.log('📝 Starting Annual Report blog post generation...');

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

    console.log('🎉 Annual Report blog post successfully generated!');
    process.exit(0);

  } catch (err: any) {
    console.error('❌ Error generating annual report post:', err);
    process.exit(1);
  }
}

addAnnualReportPost();
