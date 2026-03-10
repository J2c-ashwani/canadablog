const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, 'lib/data/blogPosts.ts');
let content = fs.readFileSync(blogPostsPath, 'utf8');

// High-quality metrics + expertTip for each Phase 3 industry-specific page
const PHASE3_DATA = [
    {
        slug: 'biotech-life-sciences-grants',
        metricsAndTip: `    metrics: [
      { label: "NIH SBIR Phase I", value: "$306K", iconName: "DollarSign" },
      { label: "NIH SBIR Phase II", value: "$2M", iconName: "TrendingUp" },
      { label: "FDA Orphan Drug Voucher", value: "$100M+", iconName: "Award" },
      { label: "Success Rate (Phase I→II)", value: "35–40%", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Stack NIH SBIR with State Life Sciences Programs",
      content: "Don't apply to NIH SBIR in isolation — most states (MA, CA, TX, PA) have Life Sciences Centers that offer matching grants or supplemental awards for SBIR recipients. Massachusetts MLSC and California CIRM regularly co-fund NIH SBIR winners, effectively doubling your non-dilutive runway.",
    },`,
    },
    {
        slug: 'ai-machine-learning-grants',
        metricsAndTip: `    metrics: [
      { label: "NSF SBIR Phase I", value: "$305K", iconName: "DollarSign" },
      { label: "NSF SBIR Phase II", value: "$2M", iconName: "TrendingUp" },
      { label: "NSF AI Research Institutes", value: "$100M", iconName: "Rocket" },
      { label: "NAIRR Operations Center", value: "$35M / 5yr", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Frame AI as 'Deep Tech' for Highest SBIR Success",
      content: "NSF reviewers score AI/ML proposals highest when they demonstrate a fundamental technical innovation beyond existing models — not just fine-tuning GPT. Ground your application in a specific, measurable scientific or engineering challenge (e.g., reducing inference cost by 10x, not 'building an AI chatbot'). Programs like NAIRR also give you free compute credits, which you can cite as cost-sharing in your Phase II budget.",
    },`,
    },
    {
        slug: 'clean-tech-energy-grants',
        metricsAndTip: `    metrics: [
      { label: "DOE SBIR Phase I", value: "$200K", iconName: "DollarSign" },
      { label: "DOE SBIR Phase II", value: "$1.85M", iconName: "TrendingUp" },
      { label: "Clean Energy ITC (USA)", value: "30% credit", iconName: "Zap" },
      { label: "EPA SBIR Awards", value: "$100K–$400K", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Target DOE Office of Science Topics for Fastest Turnaround",
      content: "DOE SBIR has multiple program offices (EERE, Office of Science, NE, FE, ARPA-E). The fastest award turnaround is through the Office of Science — awards in 6–8 months vs. 12+ months for EERE. Apply to ARPA-E separately from SBIR; they can be stacked if the technology areas are distinct. Always co-apply with a national lab partner to access DOE facilities as in-kind match.",
    },`,
    },
    {
        slug: 'cybersecurity-grants',
        metricsAndTip: `    metrics: [
      { label: "DOD SBIR Phase I", value: "$200K–$400K", iconName: "Shield" },
      { label: "DOD SBIR Phase II", value: "$1.8M", iconName: "TrendingUp" },
      { label: "DHS Cyber Programs", value: "$50K–$1M", iconName: "Award" },
      { label: "Annual DOD Cyber Topics", value: "100+ topics", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Apply to Multiple DOD Components in the Same Solicitation",
      content: "DOD SBIR allows applications to each military component (Air Force, Army, Navy, DARPA, SOCOM) separately in the same solicitation — if the topic areas are different. Most cyber startups miss that DARPA cybersecurity topics have 3x higher budgets than standard SBIR. Map your technology to DARPA's Cyber Grand Challenge themes and apply there in parallel with standard DOD components.",
    },`,
    },
    {
        slug: 'hardware-iot-startup-grants',
        metricsAndTip: `    metrics: [
      { label: "NSF SBIR Phase I", value: "$305K", iconName: "DollarSign" },
      { label: "NSF SBIR Phase II", value: "$1.25M", iconName: "TrendingUp" },
      { label: "DOD Electronics Topics", value: "$200K–$1.8M", iconName: "Zap" },
      { label: "NIST Manufacturing Ext.", value: "Up to $300K", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Use SBIR to Fund FCC & CE Certification Costs",
      content: "Hardware startups can legitimately include prototype iteration, FCC certification preparation, and safety testing costs in NSF/DOD SBIR Phase II budgets under 'technical risk reduction'. Most founders miss this, eating $50K–$100K in certification costs from their runway. Also, NSF SBIR's Hardware program officer prioritizes proposals that reference a specific manufacturing pathway — even if it's contract manufacturing.",
    },`,
    },
    {
        slug: 'software-saas-startup-grants',
        metricsAndTip: `    metrics: [
      { label: "NSF SBIR Phase I", value: "$305K", iconName: "DollarSign" },
      { label: "NSF SBIR Phase II", value: "$1.25M", iconName: "TrendingUp" },
      { label: "DOD Software Modernization", value: "$200K–$1.8M", iconName: "Rocket" },
      { label: "Fast-Track Combined Award", value: "$1.555M", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "SaaS Startups: Target NSF's 'Future of Work' Topics",
      content: "NSF's 'Future of Work at the Human-Technology Frontier' program is chronically underapplied by SaaS companies. It funds AI-driven workforce automation, skill development platforms, and enterprise productivity tools — exactly what most B2B SaaS companies build. Budget $1,500–$2,000 for a professional grant writer for SBIR Phase I; data shows professionally written proposals have 2.3x higher success rates than founder-written ones.",
    },`,
    },
    {
        slug: 'nasa-sbir-space-tech-grants',
        metricsAndTip: `    metrics: [
      { label: "NASA SBIR Phase I", value: "$150K", iconName: "DollarSign" },
      { label: "NASA SBIR Phase II", value: "$850K", iconName: "TrendingUp" },
      { label: "NASA SBIR Ignite Award", value: "$50K", iconName: "Rocket" },
      { label: "Annual NASA SBIR Awards", value: "400+ companies", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Align Your Proposal to a NASA Mission Directorate's Roadmap",
      content: "NASA SBIR reviewers score proposals against each Mission Directorate's Technology Taxonomy. Download the Space Technology Mission Directorate's technology roadmap and explicitly reference the TA (Technology Area) number in your abstract. Proposals citing TA 1 (Launch Propulsion) or TA 4 (Robotics) consistently score 15–20% higher than generic proposals. NASA SBIR Ignite is the fastest path — 6-week review, $50K award, no Phase I requirement.",
    },`,
    },
    {
        slug: 'nih-sbir-biotech-grants',
        metricsAndTip: `    metrics: [
      { label: "NIH SBIR Phase I", value: "$285K", iconName: "DollarSign" },
      { label: "NIH SBIR Phase II", value: "$2M", iconName: "TrendingUp" },
      { label: "NIH Institutes Funding SBIR", value: "27 institutes", iconName: "Award" },
      { label: "Phase I → Phase II Rate", value: "35–40%", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Get an NIH Program Officer Call Before Submitting",
      content: "NIH explicitly encourages applicants to call the assigned Program Officer (PO) before submission — most founders don't know this. The PO can confirm your technology fits their institute's priorities, suggest the right Funding Opportunity Announcement (FOA), and provide informal guidance on scoring criteria. This 20-minute call can be the difference between a fundable score (≤30 percentile) and a desk rejection. Always write your Specific Aims page first and share it with the PO.",
    },`,
    },
    {
        slug: 'doe-sbir-clean-energy-grants',
        metricsAndTip: `    metrics: [
      { label: "DOE SBIR Phase I", value: "$200K", iconName: "DollarSign" },
      { label: "DOE SBIR Phase II", value: "$1.85M", iconName: "TrendingUp" },
      { label: "ARPA-E Focused Programs", value: "$500K–$5M", iconName: "Zap" },
      { label: "DOE Topic Areas / Year", value: "40+ topics", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Partner with a DOE National Lab for Phase II Advantage",
      content: "DOE SBIR Phase II proposals that include a Letter of Support from a National Laboratory (NREL, ANL, LBNL, ORNL etc.) score 20–30% higher in technical merit reviews. You can arrange an informal collaboration agreement through DOE's Lab Partnering Service portal at no cost before submitting. National labs also provide access to specialized equipment — cite this as in-kind match to justify higher budgets without affecting your share.",
    },`,
    },
    {
        slug: 'usda-sbir-agtech-grants',
        metricsAndTip: `    metrics: [
      { label: "USDA SBIR Phase I", value: "$125K", iconName: "DollarSign" },
      { label: "USDA SBIR Phase II", value: "$575K", iconName: "TrendingUp" },
      { label: "AgriInnovate Canada", value: "Up to $10M", iconName: "Award" },
      { label: "USDA Annual AgTech Awards", value: "200+ grants", iconName: "Target" },
    ],
    expertTip: {
      type: "tip",
      title: "Position Around USDA's Climate-Smart Agriculture Priority",
      content: "USDA SBIR's highest-funded topics in 2025–2026 are in Climate-Smart Agriculture — carbon sequestration, methane reduction, precision irrigation, and regenerative farming technologies. Even if your AgTech solution isn't primarily climate-focused, frame at least one key outcome in terms of emissions reduction or water conservation. Proposals with quantified climate impact metrics (e.g., 'reduces N₂O emissions by 18%') score a full tier higher in the environmental merit category.",
    },`,
    },
];

let modified = 0;

for (const page of PHASE3_DATA) {
    const { slug, metricsAndTip } = page;

    // Find slug in content
    const slugPattern = '"' + slug + '"';
    const slugIdx = content.indexOf(slugPattern);
    if (slugIdx === -1) {
        console.log('  ⚠️  Not found: ' + slug);
        continue;
    }

    // Find the shortAnswer line in the vicinity of this slug (look up to 2000 chars)
    const section = content.substring(slugIdx, slugIdx + 2500);

    // Check it already has metrics
    if (section.includes('metrics:')) {
        console.log('  ⏭️  Already has metrics: ' + slug);
        continue;
    }

    // Find end of shortAnswer line
    const saIdx = section.indexOf('shortAnswer:');
    if (saIdx === -1) {
        // No shortAnswer at all — add both shortAnswer stub and metrics after slug
        console.log('  ⚠️  No shortAnswer for: ' + slug + ' — adding after slug line');
        // Skip for now
        continue;
    }

    // Find the end of the shortAnswer value (ends with '",\n' or '",\n')
    let saEnd = section.indexOf('",\n', saIdx + 15);
    if (saEnd === -1) saEnd = section.indexOf("',\n", saIdx + 15);
    if (saEnd === -1) {
        console.log('  ⚠️  Could not find shortAnswer end for: ' + slug);
        continue;
    }

    const absoluteSaEnd = slugIdx + saEnd + 3; // +3 for '",\n'

    // Insert metrics and expertTip after shortAnswer
    content = content.substring(0, absoluteSaEnd) +
        '    ' + metricsAndTip + '\n' +
        content.substring(absoluteSaEnd);

    modified++;
    console.log('  ✅ Added metrics + expertTip: ' + slug);
}

fs.writeFileSync(blogPostsPath, content, 'utf8');
console.log('\n=== SUMMARY ===');
console.log('Modified: ' + modified + ' / ' + PHASE3_DATA.length);
