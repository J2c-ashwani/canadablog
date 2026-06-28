import fs from 'fs';
import path from 'path';

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const CONTENT_DIR = path.join(__dirname, '../lib/data/blog-content');

const postsToInsert = [
  {
    metadata: {
      id: 9001,
      slug: 'irap-vs-sred-difference-canada',
      title: "IRAP vs SR&ED: The Complete Guide to Stacking Canada's Top R&D Incentives",
      excerpt: "Confused about NRC IRAP vs CRA SR&ED? Learn the differences in eligibility, funding models, claiming timelines, and how to successfully stack both programs to cover up to 75% of your costs.",
      category: "Tips & Guides",
      categoryColor: "bg-purple-100 text-purple-800",
      author: "Ashwani K.",
      date: "2026-06-27",
      readTime: "12 min read",
      image: "/images/blog/tech-innovation-theme.png",
      featured: true,
      type: "expert-insight",
      seo: {
        keywords: ["irap vs sred", "sred tax credit", "nrc irap grant", "canada rd funding", "stacking grants canada"],
        metaTitle: "IRAP vs SR&ED: How to Stack Canada's Top R&D Grants",
        metaDescription: "Read the definitive comparison of NRC IRAP and CRA SR&ED. Understand differences in eligibility, funding mechanisms, and stacking rules.",
        intent: "r_and_d"
      }
    },
    content: {
      shortAnswer: "Yes, you can stack NRC IRAP and CRA SR&ED. However, under CRA double-dipping rules, any IRAP funding received for a project reduces the pool of qualifying expenditures you can claim under SR&ED for that same project. Stacking them correctly allows you to offset up to 75-80% of your R&D development payroll.",
      shortAnswerQuestion: "Can I combine IRAP and SR&ED for the same project in Canada?",
      content: `<h2>Introduction: Canada's R&D Powerhouse Duo</h2>
<p>For Canadian technology companies, startups, and advanced manufacturers, the National Research Council's <strong>Industrial Research Assistance Program (IRAP)</strong> and the Canada Revenue Agency's <strong>Scientific Research and Experimental Development (SR&ED)</strong> tax incentive are the two most lucrative sources of non-dilutive capital.</p>
<p>However, founders and finance teams frequently confuse the two programs or fear that claiming one disqualifies them from the other. This guide breaks down the core differences between IRAP and SR&ED and outlines a step-by-step strategy to stack them legally to cover up to 75% of your engineering salaries.</p>

<div class="my-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
  <h4 class="font-bold text-slate-800 text-sm mb-2">Key Takeaway</h4>
  <p class="text-xs text-slate-600 leading-relaxed">
    <strong>IRAP</strong> is a discretionary, front-ended grant paid out during project milestones. <strong>SR&ED</strong> is an entitlement-based tax credit claimed retroactively at fiscal year-end. They are not mutually exclusive—they are complementary tools.
  </p>
</div>

<h2>Core Differences: IRAP vs. SR&ED</h2>
<table class="min-w-full border-collapse border border-slate-200 my-4 text-xs sm:text-sm">
  <thead>
    <tr class="bg-slate-100">
      <th class="border border-slate-200 p-2 text-left font-bold">Feature</th>
      <th class="border border-slate-200 p-2 text-left font-bold">NRC IRAP</th>
      <th class="border border-slate-200 p-2 text-left font-bold">CRA SR&ED</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Program Type</td>
      <td class="border border-slate-200 p-2">Discretionary Grant (Competitive)</td>
      <td class="border border-slate-200 p-2">Legislated Tax Entitlement (Guaranteed if criteria met)</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Payment Timeline</td>
      <td class="border border-slate-200 p-2">Upfront / Monthly reimbursement as work is performed</td>
      <td class="border border-slate-200 p-2">Retroactive claim filed with annual corporate tax return</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Funding Source</td>
      <td class="border border-slate-200 p-2">National Research Council (NRC)</td>
      <td class="border border-slate-200 p-2">Canada Revenue Agency (CRA)</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Maximum Subsidy</td>
      <td class="border border-slate-200 p-2">Typically 50% to 80% of internal R&D salaries</td>
      <td class="border border-slate-200 p-2">Up to 35% refundable federal credit + provincial add-ons</td>
    </tr>
    <tr>
      <td class="border border-slate-200 p-2 font-semibold">Eligible Expenses</td>
      <td class="border border-slate-200 p-2">Mainly internal technical salaries & contractors</td>
      <td class="border border-slate-200 p-2">Salaries, materials, subcontracted R&D, and overhead</td>
    </tr>
  </tbody>
</table>

<h2>How Stacking Rules Work (Anti-Double-Dipping)</h2>
<p>The Canada Revenue Agency prohibits "double-dipping." In practice, this means you cannot get reimbursed twice for the same dollar of R&D expenditure. When you receive government assistance (like an IRAP grant) for a specific R&D project, you must declare that assistance on your <strong>CRA Form T661 (SR&ED Claim)</strong>.</p>
<p>The IRAP grant amount is deducted from your total SR&ED-qualified expenditures. However, because SR&ED covers overheads and non-subsidized portions, you can still claim tax credits on the remaining portion of your payroll.</p>

<h3>Example of Stacking Math:</h3>
<ul>
  <li><strong>Total Engineer R&D Payroll:</strong> $100,000</li>
  <li><strong>IRAP Grant Received (80% of payroll):</strong> $80,000</li>
  <li><strong>Remaining Non-Subsidized Payroll:</strong> $20,000</li>
  <li><strong>SR&ED Proxy Overhead Allocation (55% proxy):</strong> $55,000</li>
  <li><strong>Adjusted SR&ED Expenditures Pool:</strong> $75,000 (Overhead proxy of $55,000 + remaining payroll of $20,000)</li>
  <li><strong>Final Refund (35% Refundable SR&ED):</strong> Approximately $26,250</li>
  <li><strong>Total Funding Combined:</strong> $106,250 ($80,000 IRAP + $26,250 SR&ED)—meaning your R&D project was co-funded by 100%+ due to the proxy overhead calculations!</li>
</ul>

<h2>Step-by-Step Blueprint to Stack Successfully</h2>
<ol>
  <li><strong>Build a Relationship with an NRC ITA:</strong> IRAP is discretionary. You must establish a rapport with a regional Industrial Technology Advisor (ITA) before applying.</li>
  <li><strong>Separate Project Scopes:</strong> Work with your accountants to track time logs by specific R&D milestones. Align IRAP tracking with project phases.</li>
  <li><strong>Document Contemporaneous Records:</strong> CRA demands technical proof of uncertainty and systematic investigation. Keep git logs, design mockups, and testing data.</li>
  <li><strong>File Retroactive SR&ED Claims:</strong> Once your fiscal year ends, file your T661. Deduct any IRAP grants received for those specific projects, and claim the remaining expenditures plus the proxy overhead.</li>
</ol>`,
      faq: [
        { question: "Does getting IRAP disqualify me from claiming SR&ED?", answer: "No. You can claim both. However, the IRAP grant is considered 'government assistance' and will reduce your eligible SR&ED expenditures for the same project. You still get to claim credits on the non-subsidized portion and the overhead proxy." },
        { question: "Which program should I apply to first?", answer: "Apply for IRAP first because it must be approved before you incur the project costs. SR&ED is retroactive, so you claim it after your fiscal year ends." }
      ]
    }
  },
  {
    metadata: {
      id: 9002,
      slug: 'how-to-stack-government-grants-canada',
      title: "How to Stack Multiple Government Grants in Canada: Rules, Limits, and Strategies",
      excerpt: "Can you combine federal and provincial funding? Discover the strict rules of government grant stacking, overlap limitations, and how to maximize your non-dilutive capital safely.",
      category: "Tips & Guides",
      categoryColor: "bg-purple-100 text-purple-800",
      author: "Ashwani K.",
      date: "2026-06-27",
      readTime: "10 min read",
      image: "/images/blog/canada-grants-theme.png",
      featured: true,
      type: "expert-insight",
      seo: {
        keywords: ["stacking government grants", "grant stacking rules canada", "canadian business grants guide", "non-dilutive capital stacking", "provincial federal grants combined"],
        metaTitle: "Government Grant Stacking Rules & Strategies | Canada 2026",
        metaDescription: "Learn how to stack federal and provincial government business grants in Canada. Master stacking limits, double-dipping exclusions, and co-funding requirements.",
        intent: "grant"
      }
    },
    content: {
      shortAnswer: "Yes, Canadian businesses can stack grants from different levels of government (e.g. municipal, provincial, federal). However, most programs enforce a 'stacking limit'—typically capping total government funding at 75% to 100% of the total eligible project cost. Additionally, you cannot claim the exact same dollar of expense from two different grant sources (no double-dipping).",
      shortAnswerQuestion: "Are you allowed to stack federal and provincial grants in Canada?",
      content: `<h2>Understanding the Grant Stacking Landscape</h2>
<p>Government grant stacking is the practice of combining multiple federal, provincial, and municipal funding programs to co-finance a single business project. Done correctly, stacking can reduce your net out-of-pocket project costs to less than 20%.</p>
<p>However, funding bodies have strict coordination mechanisms to prevent over-funding. This guide outlines the core rules of grant stacking, anti-accumulation caps, and a tactical playbook to stack programs legally without triggering audit failures.</p>

<h2>Rule #1: Stacking Limits (Maximum Assistance Level)</h2>
<p>Almost all government programs define a maximum limit on total government assistance, known as the <strong>Stacking Limit</strong>. This limit is the maximum percentage of your total project costs that can be funded by government sources (grants, loans, tax credits, and subsidies combined).</p>
<ul>
  <li><strong>Standard Commercial Projects:</strong> Typically capped at a 75% stacking limit. You must contribute at least 25% from private sources (equity, revenue, or bank loans).</li>
  <li><strong>Non-Profits or Clean-Tech Initiatives:</strong> Stacking limits can sometimes reach 100%, meaning the entire project is funded by various grants.</li>
  <li><strong>R&D and Student Hiring:</strong> Stacking limits are highly flexible but usually restrict total subsidies to 80% of salary costs.</li>
</ul>

<h2>Rule #2: The Anti-Double-Dipping Principle</h2>
<p>The most important rule in grant administration is that <strong>you cannot claim the same individual expense line twice</strong>. For instance, if you hire a student engineer and their salary is 80% co-funded by a federal wage subsidy (like Canada Summer Jobs), you cannot use a provincial grant to cover that same 80%. You can, however, use a provincial grant to fund the remaining 20% of their salary, or use the provincial grant to fund materials and equipment needed for their work.</p>

<div class="my-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
  <h4 class="font-bold text-slate-800 text-sm mb-2">Expert Pro-Tip</h4>
  <p class="text-xs text-slate-600 leading-relaxed">
    Always designate specific expense streams to specific grants. For a software project, assign developer salaries to a wage subsidy, cloud hosting to a digital transformation grant, and marketing costs to an export grant.
  </div>
</div>

<h2>High-Yield Grant Stacking Combinations</h2>
<p>Here are three verified stacking sequences commonly used by high-growth Canadian companies:</p>

<h3>1. The Digitization Stack (CDAP + BDC)</h3>
<p>Combine the <strong>Canada Digital Adoption Program (CDAP)</strong> with <strong>BDC Financing</strong>:
<ul>
  <li>Apply for CDAP Boost Your Business Technology to get a $15,000 grant (90% cost-share) to design a digital roadmap.</li>
  <li>Use that approved roadmap to unlock a 0% interest loan up to $100,000 from BDC to buy the software/hardware.</li>
  <li>Access a $7,300 wage subsidy to hire a student to implement the tools.</li>
</ul>

<h3>2. The Talent & Innovation Stack (Mitacs + SR&ED)</h3>
<p>Stack student internships with tax recovery:
<ul>
  <li>Leverage <strong>Mitacs Accelerate</strong> to co-fund 50% of a graduate intern's stipend to conduct research.</li>
  <li>At year-end, submit the remaining 50% of the researcher's salary plus the overhead proxy under <strong>SR&ED</strong> to recover up to 35% of your private spend.</li>
</ul>

<h3>3. The Global Expansion Stack (CanExport + EDC)</h3>
<p>Stack export grants with credit protection:
<ul>
  <li>Use <strong>CanExport SMEs</strong> to cover 50% of travel, trade show, and marketing costs to enter new international markets (up to $50,000).</li>
  <li>Stack it with <strong>EDC (Export Development Canada)</strong> receivables insurance to protect your foreign sales against non-payment.</li>
</ul>`,
      faq: [
        { question: "What happens if I exceed the stacking limit?", answer: "If you exceed a program's stacking limit, the program administrators will claw back the excess funds or reduce their contribution accordingly. You must disclose all other funding sources during the application stage." },
        { question: "Do government loans count toward the stacking limit?", answer: "Yes, government-backed loans (like CSBFP or BDC loans) and repayable contributions count toward the total 'government assistance' cap, though they are weighted differently than non-repayable grants." }
      ]
    }
  }
];

async function addBlogPosts() {
  console.log('📝 Starting link-magnet blog posts generation...');

  try {
    // 1. Read metadata file
    if (!fs.existsSync(METADATA_PATH)) {
      throw new Error(`Metadata file not found at: ${METADATA_PATH}`);
    }

    const fileContent = fs.readFileSync(METADATA_PATH, 'utf8');
    const data = JSON.parse(fileContent);

    // 2. Loop through and insert posts
    for (const post of postsToInsert) {
      const slug = post.metadata.slug;
      
      // Check if already exists in metadata
      const existsMeta = data.metadata.some((p: any) => p.slug === slug);
      if (!existsMeta) {
        console.log(`➕ Inserting metadata for slug: ${slug}`);
        // Insert at the beginning of the array so it's the newest post
        data.metadata.unshift(post.metadata);
      } else {
        console.log(`ℹ️ Metadata for slug: ${slug} already exists. Skipping insertion.`);
      }

      // Add to slugToPath
      if (!data.slugToPath[slug]) {
        console.log(`➕ Adding path mapping to slugToPath for: ${slug}`);
        data.slugToPath[slug] = `./blog-posts/tips-guides/${slug}.ts`;
      }

      // Write content JSON file
      const contentFilePath = path.join(CONTENT_DIR, `${slug}.json`);
      console.log(`💾 Writing content JSON to: ${contentFilePath}`);
      
      // Merge metadata fields and content fields as required by getBlogPostRichData and getBlogPostContent
      const fullContentObj = {
        ...post.metadata,
        ...post.content
      };

      fs.mkdirSync(CONTENT_DIR, { recursive: true });
      fs.writeFileSync(contentFilePath, JSON.stringify(fullContentObj, null, 2), 'utf8');
    }

    // 3. Save metadata back
    console.log(`💾 Saving updated blogMetadata.json...`);
    fs.writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2), 'utf8');

    console.log('🎉 Link-magnet blog posts successfully generated!');
    process.exit(0);

  } catch (err: any) {
    console.error('❌ Error generating link-magnet posts:', err);
    process.exit(1);
  }
}

addBlogPosts();
