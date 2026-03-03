const fs = require('fs');
const path = require('path');

const newAnswers = {
    // Today's 20
    "canada-agriculture-agrifood-grants-guide": "Complete guide to Canada's $2.3B+ in agriculture grants. Programs like AgriInnovate and provincial SCAP funding offer up to 50% cost-sharing for agri-tech adoption and sustainable farming.",
    "canada-clean-technology-environment-grants-guide": "Canada offers over $1.2B in environmental and sustainability funding. The Clean Technology Investment Tax Credit (ITC) provides a 30% refundable credit, while SDTC funds major cleantech projects.",
    "canada-clean-technology-innovation-grants": "Access up to $15M for clean technology innovation through SDTC and the Net Zero Accelerator. These non-dilutive funds help scale green tech, water solutions, and emissions reduction projects.",
    "canada-digital-ai-innovation-grants": "Canada is investing $850M+ in digital and AI innovation. Scale AI supports major supply chain projects, while CDAP offers up to $15k to help traditional businesses adopt new technologies.",
    "canada-employment-workforce-training-grants-guide": "Employers can access over $1.9B in workforce funding. Programs like the Canada-Ontario Job Grant cover up to 83% of employee training costs, and SWPP offers $7,500 wage subsidies for hiring students.",
    "canada-export-development-grants-guide": "Take your business global with $680M+ in export grants. CanExport covers up to 50% of eligible costs (up to $50k) for international expansion, including trade shows and digital marketing.",
    "canada-federal-grants": "The federal government distributes over $10B annually across 4,000+ active grant and loan programs. These funds support everything from hiring and training to large-scale technological innovation.",
    "canada-growth-expansion-grants-guide": "Scale your business using Canada's $2.8B+ expansion funding. The Strategic Innovation Fund supports major capital projects over $10M, while regional agencies offer varied scale-up incentives.",
    "canada-hiring-training-grants-guide": "Offset hiring costs with $1.9B+ in workforce development funding. Access $7,500 student wage subsidies, full coverage for specialized training, and $15,000 grants for hiring recent graduates.",
    "canada-industry-specific-grants-guide": "Canada targets $1.5B+ toward specific sectors like auto, agriculture, and tourism. Leveraging industry-specific programs—like AgriScience or the EV Transition fund—often yields less competitive funding.",
    "canada-innovation-research-development-grants-guide": "Recover your R&D costs through Canada's $4.2B+ innovation funding. The SR&ED program provides predictable tax incentives, backed by direct IRAP grants for technical innovation and commercialization.",
    "canada-life-sciences-innovation-grants": "The Life Sciences sector is supported by over $2.2B in federal and provincial funding. Major programs support medical device manufacturing, biomanufacturing, and clinical trial development.",
    "canada-manufacturing-industry-grants-guide": "Manufacturers can tap into $3.1B+ for facility upgrades and Industry 4.0 adoption. NGen and regional programs offer millions in non-repayable funding for automation and advanced manufacturing tech.",
    "canada-regional-economic-development-grants-guide": "Canada's 7 Regional Development Agencies (like FedDev Ontario and PacifiCan) distribute $2B+ annually. These zero-interest, non-dilutive loans support local job creation, innovation, and community growth.",
    "canada-startup-funding-grants-guide": "Canadian startups have access to structured growth funding. From Futurpreneur's $60k launch loans to IRAP's technical grants and SR&ED, founders can scale without giving up equity.",
    "canada-technology-adoption-grants-guide": "Offset the cost of new software and hardware with technology adoption grants. Programs like CDAP provide $15k for digital planning, unlocking $100k zero-interest BDC loans for implementation.",
    "cartier-womens-initiative-canada": "The Cartier Women's Initiative offers up to $100,000 USD in equity-free grant funding. Designed for impact-driven, women-led businesses, winners also receive elite executive coaching and global networking.",
    "clean-tech-energy-grants": "Clean tech companies can access massive non-dilutive capital. Programs like the $2.3B DOE grants in the US and Canada's SDTC provide multi-million dollar support for transformational energy projects.",
    "commercialization-scale-up-funding-canada": "Transition from prototype to market with Canada's commercialization funds. IRAP and regional agencies offer substantial grants to help businesses prove their technology and secure early enterprise clients.",
    "csbfp-canada-small-business-financing-program": "The CSBFP offers government-backed loans up to $1.15 million for small businesses. These funds can be used for purchasing property, equipment, or leasehold improvements with highly competitive rates.",

    // Past 18
    "ai-machine-learning-grants": "Complete 2026-2027 guide to AI and machine learning grants. Programs like Scale AI and provincial tech funds offer millions in non-dilutive capital to de-risk commercial AI development.",
    "alberta-government-business-grants": "Alberta offers a robust ecosystem of provincial funding. Programs through Alberta Innovates and the Alberta Enterprise Corporation provide strategic capital for tech, energy, and agriculture businesses.",
    "alberta-innovation-grants": "Access Alberta's dedicated innovation funding. Alberta Innovates provides direct commercialization grants up to $500,000 to help tech startups move from prototype to global market.",
    "alberta-small-business-grants-guide": "Alberta small businesses can access targeted provincial grants. Funding is available for digital adoption, specialized training, and market expansion specifically designed for AB-based companies.",
    "amber-grant-women-canada": "The Amber Grant awards $10,000 monthly and a $25,000 year-end prize to women entrepreneurs. It's one of the most accessible grants, requiring only a simple story-based application instead of a complex pitch deck.",
    "atlantic-canada-innovation-grants": "ACOA (Atlantic Canada Opportunities Agency) drives innovation in the East. They provide interest-free, non-dilutive loans and grants up to $500,000 for technology commercialization and productivity improvements.",
    "atlantic-canada-business-grants-guide": "Atlantic Canadian businesses have access to specialized federal funding through ACOA. Programs support export expansion, hiring, and community economic development across the four eastern provinces.",
    "bc-small-business-grants-guide": "BC offers targeted small business grants for local enterprises. Programs cover e-commerce scaling, employee training, and export readiness tailored specifically for British Columbia businesses.",
    "bdc-women-entrepreneurs-financing": "BDC offers flexible loans and specialized advisory services for women-led businesses. Beyond capital, they provide dedicated coaching to help women founders scale and optimize operations.",
    "biotech-life-sciences-grants": "Biotech startups can access massive federal funding pools like the NIH SBIR program. Phases I and II offer up to $2M+ in non-dilutive capital for high-risk, high-reward medical research.",
    "bmo-celebrating-women-grant": "BMO awards $10,000 grants alongside dedicated business advisory services. This program focuses on sustainability, community impact, and accelerating the growth of women-owned businesses.",
    "british-columbia-government-business-grants": "BC businesses can leverage provincial grants via Innovate BC and CleanBC. These programs prioritize sustainable economic growth, zero-emission technologies, and regional job creation.",
    "british-columbia-innovation-grants": "BC offers robust innovation support, highlighted by the 10% BC Innovation Tax Credit (BCITC). This stacks with federal SR&ED, allowing tech companies to dramatically reduce their R&D costs.",
    "california-tech-programs": "California startups can tap into state-specific tech hubs and the $50k CalSEED program. GO-Biz also offers the California Competes Tax Credit to incentivize job creation and major capital investments.",
    "canada-advanced-manufacturing-innovation-grants": "Advanced manufacturers can access $3.1B+ in scale-up capital. NGen and the Strategic Innovation Fund provide heavy subsidies for adopting Industry 4.0, robotics, and automation technologies.",
    "canada-aerospace-defence-innovation-grants": "The aerospace and defence sectors are supported by $450M+ in funding. Programs like the IDEaS challenge and CSA grants provide capital for R&D in dual-use technologies and space innovation.",
    "canada-agri-food-technology-innovation-grants": "Agri-food tech companies can leverage $2.3B+ in federal and provincial funding. Programs prioritize precision agriculture, automation, and sustainable food processing solutions."
};

const filePath = path.join(__dirname, '..', 'lib/data/blogPosts.ts');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let updatedCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('slug:')) {
        const slugMatch = line.match(/slug:\s*["']([^"']+)["']/);
        if (slugMatch) {
            const slug = slugMatch[1];
            if (newAnswers[slug]) {
                for (let j = i; j < i + 60 && j < lines.length; j++) {
                    if (lines[j].includes('shortAnswer:')) {
                        const prefixMatch = lines[j].match(/^(\s*\},?\s*shortAnswer:\s*)/);
                        if (prefixMatch) {
                            // Ensure proper escaping of JSON/JS string formatting
                            const hasComma = lines[j].trim().endsWith(',');
                            lines[j] = `${prefixMatch[1]}"${newAnswers[slug].replace(/"/g, '\\"')}"${hasComma ? ',' : ''}`;
                        }
                        updatedCount++;
                        console.log(`✅ Safely fixed short answer for: ${slug}`);
                        break;
                    }
                }
            }
        }
    }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log(`\n🎉 Total updated safely: ${updatedCount}`);
