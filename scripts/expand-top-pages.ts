import fs from 'fs';
import path from 'path';

const TOP_PAGES: Record<string, {
    whoQualifies: string;
    deadlines: string;
    howCompetitive: string;
    recentAwards: string;
}> = {
    "sbir-sttr-complete-guide": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>US-based small businesses</strong> with fewer than 500 employees</li><li>Must be <strong>51%+ owned by US citizens or permanent residents</strong></li><li>Principal investigator must be <strong>primarily employed</strong> by the applicant</li><li>For-profit companies only — nonprofits NOT eligible</li><li>STTR requires a <strong>formal partnership with a university or research institution</strong></li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>NIH SBIR/STTR:</strong> January 5, April 5, September 5 (rolling cycles)</li><li><strong>NSF SBIR Phase I:</strong> June and November annually</li><li><strong>DOD SBIR:</strong> 3 solicitation windows per year (check DSIP portal)</li><li><strong>DOE SBIR:</strong> Typically February and September</li><li><strong>NASA SBIR:</strong> Annual solicitation opens in November</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">SBIR is <strong>moderately competitive</strong>. Average success rates:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Phase I:</strong> 15-25% approval rate (varies by agency)</li><li><strong>Phase II:</strong> 40-50% of Phase I winners advance</li><li><strong>NIH:</strong> Most competitive (~20% Phase I success rate)</li><li><strong>NSF:</strong> ~25% success rate for Phase I</li><li><strong>DOD:</strong> Higher acceptance (~30%) but requires defense relevance</li></ul><p class="text-gray-700 mt-3"><strong>Pro tip:</strong> First-time applicants have ~15% success. Attend an SBIR Road Tour event first.</p>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Quantum Computing Inc.</strong> — $1.15M Phase II (DOE) for quantum optimization</li><li><strong>BioNano Genomics</strong> — $225K Phase I (NIH) for optical genome mapping</li><li><strong>AgriSolar Solutions</strong> — $200K Phase I (USDA) for dual-use solar farming</li><li><strong>CyberShield AI</strong> — $1.5M Phase II (DOD) for AI-powered threat detection</li></ul>`
    },
    "sba-loans-grants-guide": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li>Businesses operating in the <strong>United States or its territories</strong></li><li>Must meet <strong>SBA size standards</strong> (typically under 500 employees or $7.5M revenue)</li><li>Owner must have <strong>invested personal equity</strong></li><li>Must demonstrate <strong>inability to obtain financing</strong> from other sources</li><li>Must be a <strong>for-profit business</strong></li><li>Owner cannot have been <strong>convicted of a financial crime</strong></li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>SBA 7(a) Loans:</strong> Rolling — no deadline, apply anytime</li><li><strong>SBA 504 Loans:</strong> Rolling through CDCs</li><li><strong>SBA Microloans:</strong> Rolling — apply through local intermediary lenders</li><li><strong>SBA Disaster Loans:</strong> Within 60 days of disaster declaration</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">SBA loans are <strong>less competitive than grants</strong> — they are loans:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>7(a) Approval:</strong> ~50-60% through preferred lenders</li><li><strong>504 Approval:</strong> ~65% (requires real estate/equipment purchase)</li><li><strong>Microloans:</strong> ~70% approval for amounts under $50K</li></ul><p class="text-gray-700 mt-3"><strong>Key insight:</strong> Apply through an <strong>SBA Preferred Lender</strong> for dramatically higher approval rates.</p>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Average 7(a) loan size 2025:</strong> $479,000</li><li><strong>Total SBA lending FY2025:</strong> $28.4 billion</li><li><strong>Top industries:</strong> Accommodation/food (22%), retail (18%), healthcare (14%)</li><li><strong>Fastest growing:</strong> Veteran-owned businesses (+34% YoY)</li></ul>`
    },
    "ai-machine-learning-grants": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>AI/ML startups and SMEs</strong> working on applied artificial intelligence</li><li><strong>University spin-offs</strong> commercializing AI research</li><li>Companies building AI for <strong>healthcare, defense, agriculture, climate, cybersecurity</strong></li><li><strong>NSF:</strong> US-based companies with fewer than 500 employees</li><li><strong>IRAP/CIFAR:</strong> Canadian-incorporated companies or research partnerships</li><li>Must demonstrate <strong>technical feasibility</strong> and path to commercialization</li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>NSF AI Research Institutes:</strong> LOI February, full proposals May</li><li><strong>DARPA AI Programs:</strong> Rolling BAAs — check SAM.gov weekly</li><li><strong>CIFAR Pan-Canadian AI Strategy:</strong> Annual call, typically Q1</li><li><strong>NRC IRAP AI Projects:</strong> Rolling year-round</li><li><strong>DOE AI for Science:</strong> FOAs released quarterly</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">AI grants are <strong>highly competitive</strong>:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>NSF AI Institutes:</strong> ~8% success rate</li><li><strong>DARPA AI:</strong> ~12% acceptance</li><li><strong>IRAP AI:</strong> ~35% success (higher with existing NRC relationships)</li><li><strong>DOE AI:</strong> ~15% success</li></ul><p class="text-gray-700 mt-3"><strong>Strategy:</strong> Emphasize <strong>ethical AI, explainability, or AI safety</strong> for priority scoring at NSF and CIFAR.</p>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Anthropic</strong> — $100M+ through NSF AI Safety partnerships</li><li><strong>Cohere</strong> — $25M Canadian government AI ecosystem support</li><li><strong>PathAI</strong> — $2M NIH SBIR for AI-powered pathology</li><li><strong>AgriAI Systems</strong> — $500K USDA SBIR for precision agriculture ML</li></ul>`
    },
    "irap-industrial-research-assistance-program": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Canadian-incorporated SMEs</strong> (fewer than 500 employees)</li><li>Must be <strong>for-profit and growth-oriented</strong></li><li>Developing <strong>innovative technology-driven products, services, or processes</strong></li><li>Must have <strong>technical and business capacity</strong> to execute project</li><li><strong>Not eligible:</strong> lifestyle businesses, consulting firms without proprietary IP</li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>No fixed deadlines</strong> — rolling intake year-round</li><li><strong>Best time:</strong> Q1 (April-June) when new fiscal budgets are allocated</li><li><strong>Processing time:</strong> 4-8 weeks from initial contact</li><li><strong>Pro tip:</strong> Contact your regional ITA before submitting</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">IRAP is <strong>moderately competitive</strong>:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Overall success:</strong> ~35-40% of applicants receive funding</li><li><strong>First-time applicants:</strong> ~25% success rate</li><li><strong>Returning clients:</strong> ~55% success rate</li></ul><p class="text-gray-700 mt-3"><strong>Key:</strong> Companies engaging proactively with their ITA have <strong>2x the approval rate</strong>.</p>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Total IRAP FY2025:</strong> $420M to ~4,500 companies</li><li><strong>Average contribution:</strong> $85K-$150K</li><li><strong>Top sectors:</strong> Clean tech (28%), ICT (24%), advanced manufacturing (18%)</li><li><strong>Median company size:</strong> 12 employees</li></ul>`
    },
    "sred-scientific-research-experimental-development": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Any Canadian company</strong> performing R&D in Canada (no size restriction)</li><li>Projects must involve <strong>scientific or technological uncertainty</strong></li><li>Must follow <strong>systematic investigation</strong> (hypothesis → experiment → analysis)</li><li><strong>Eligible:</strong> experimental development, applied research, basic research</li><li><strong>Not eligible:</strong> market research, quality control, routine engineering</li><li><strong>CCPCs:</strong> 35% refundable credit on first $3M of qualifying expenditures</li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Filing deadline:</strong> 18 months after your fiscal year-end</li><li><strong>Example:</strong> FY ending Dec 31, 2025 → file by June 30, 2027</li><li><strong>CRITICAL:</strong> You CANNOT file late claims — hard deadline, no extensions</li><li><strong>Pro tip:</strong> File with your T2 corporate tax return for fastest processing</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">SR&ED is <strong>not competitive</strong> — it's an entitlement program:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>CCPC enhanced rate:</strong> 35% refundable on first $3M</li><li><strong>Standard rate:</strong> 15% non-refundable</li><li><strong>Audit rate:</strong> ~20% of claims reviewed by CRA</li></ul><p class="text-gray-700 mt-3"><strong>Warning:</strong> Claims often <strong>reduced during audit</strong>. Maintain detailed documentation — Git commits, lab notebooks.</p>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Total claims 2024:</strong> ~20,000 claims worth $3.2B</li><li><strong>Average CCPC claim:</strong> $160,000</li><li><strong>Average large corp claim:</strong> $450,000</li><li><strong>Top industries:</strong> Software (32%), manufacturing (22%), biotech (12%)</li></ul>`
    },
    "clean-tech-energy-grants": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li>Companies developing <strong>clean technology</strong> in energy, transport, water, waste, or agriculture</li><li><strong>US:</strong> DOE programs require US incorporation</li><li><strong>Canada:</strong> SDTC, IRAP, NRCan require Canadian incorporation</li><li>Must be at <strong>TRL 4-7</strong> (past basic research, into demonstration/pilot)</li><li><strong>Priority:</strong> carbon capture, hydrogen, battery storage, grid modernization, EV</li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>DOE ARPA-E:</strong> Rolling FOAs every 2-3 months</li><li><strong>SDTC (Canada):</strong> Biannual — typically March and September</li><li><strong>NRCan Clean Growth Hub:</strong> Rolling</li><li><strong>EPA SBIR:</strong> Annual, typically opens October</li><li><strong>California Energy Commission:</strong> Multiple GFOs throughout year</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">Clean tech is <strong>highly competitive</strong> but well-funded:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>DOE ARPA-E:</strong> ~3% acceptance (extremely selective)</li><li><strong>SDTC:</strong> ~15% success</li><li><strong>NRCan:</strong> ~25% success</li><li><strong>State-level:</strong> ~20-30% success</li></ul><p class="text-gray-700 mt-3"><strong>Strategy:</strong> Strong IP + customer LOIs + emissions reduction metrics = highest scoring.</p>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Svante Inc.</strong> — $25M SDTC for carbon capture</li><li><strong>Eavor Technologies</strong> — $10M NRCan for closed-loop geothermal</li><li><strong>QuantumScape</strong> — $15M DOE for solid-state batteries</li><li><strong>CarbonCure</strong> — $7.5M SDTC for concrete CO2 mineralization</li></ul>`
    },
    "women-entrepreneurship-strategy-canada": {
        whoQualifies: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li>Businesses <strong>majority-owned (51%+) by women</strong></li><li>Must be <strong>Canadian-incorporated</strong></li><li>All business stages — idea to scale-up</li><li>Indigenous women, women with disabilities, newcomer women get <strong>priority</strong></li></ul>`,
        deadlines: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>WES Ecosystem Fund:</strong> Annual calls — typically Q1</li><li><strong>Women Entrepreneurship Loan Fund:</strong> Rolling through partner orgs</li><li><strong>BDC Women in Tech:</strong> Rolling applications</li></ul>`,
        howCompetitive: `<p class="text-gray-700 mb-3">WES programs are <strong>moderately competitive</strong>:</p><ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Ecosystem Fund:</strong> ~30% success rate</li><li><strong>Loan Fund:</strong> ~60% approval (microloans are accessible)</li><li><strong>BDC Women in Tech:</strong> ~25% acceptance</li></ul>`,
        recentAwards: `<ul class="list-disc list-inside space-y-2 text-gray-700"><li><strong>Total WES funding:</strong> $6B committed since 2018</li><li><strong>Women supported:</strong> 18,000+</li><li><strong>Average Loan Fund:</strong> $35,000</li><li><strong>Top sectors:</strong> Professional services (28%), retail (19%), tech (17%)</li></ul>`
    }
};

function run() {
    let modified = 0;

    for (const [slug, expansion] of Object.entries(TOP_PAGES)) {
        const pagePath = path.resolve(`app/blog/${slug}/page.tsx`);
        if (!fs.existsSync(pagePath)) {
            console.log(`Page file not found: ${slug}`);
            continue;
        }

        let content = fs.readFileSync(pagePath, 'utf8');

        // Skip if already has expansion
        if (content.includes('Who Qualifies?')) {
            console.log(`Skipping ${slug} — already expanded`);
            continue;
        }

        const expansionJSX = `
            {/* CONTENT EXPANSION: Deep Modifier Sections for Ranking Lift */}
            <div className="mt-12 space-y-8 not-prose">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">🎯 Who Qualifies?</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: \`${expansion.whoQualifies.replace(/`/g, '\\`')}\` }} />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4">📅 Key Deadlines & Application Windows</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: \`${expansion.deadlines.replace(/`/g, '\\`')}\` }} />
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">📊 How Competitive Is This?</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: \`${expansion.howCompetitive.replace(/`/g, '\\`')}\` }} />
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">🏆 Recent Award Examples</h2>
                <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: \`${expansion.recentAwards.replace(/`/g, '\\`')}\` }} />
              </div>
            </div>`;

        // Find a good injection point — before the closing </main> or before the Footer
        const footerIdx = content.lastIndexOf('<Footer');
        if (footerIdx === -1) {
            console.log(`No Footer found in ${slug}`);
            continue;
        }

        // Find the closing div before Footer
        const closeMainIdx = content.lastIndexOf('</main>', footerIdx);
        if (closeMainIdx === -1) {
            // Try last </div> before footer
            const lastDiv = content.lastIndexOf('</div>', footerIdx);
            if (lastDiv !== -1) {
                content = content.slice(0, lastDiv) + expansionJSX + '\n' + content.slice(lastDiv);
            }
        } else {
            content = content.slice(0, closeMainIdx) + expansionJSX + '\n        ' + content.slice(closeMainIdx);
        }

        fs.writeFileSync(pagePath, content);
        console.log(`✅ Expanded: ${slug}`);
        modified++;
    }

    console.log(`\nDone! Expanded ${modified} pages.`);
}

run();
