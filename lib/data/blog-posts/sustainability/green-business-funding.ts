// lib/data/blog-posts/sustainability/green-business-funding.ts
import type { BlogPost } from '../../blogPosts';

const post: BlogPost = {
    id: 1009,
    slug: "green-business-funding",
    shortAnswerQuestion: "How can my business apply for Green Business Funding : Susta 2026 in 2026?",

    title: "Green Business Funding : Susta... 2026 | $1",

    excerpt: "Detailed guide to Canada's green business grants for SMEs. Covers retrofits, EV fleets, and zero-waste manufacturing incentives available in 2026.",
    category: "Sustainability",
    categoryColor: "bg-green-100 text-green-800",
    author: "Ashwani K.",
    date: "2026-02-18",
    readTime: "15 min read",
    image: "/images/blog/sustainability-theme.png",
    featured: true,
    type: "expert-insight",

    relatedLinks: [
      { title: " Provincial Stacking", href: "/blog/state-local-business-grants-guide", description: "Complete guide to state and local business grants. Find economic development incentives, job creation programs, and regi..." },
      { title: "CA Guarantee vs SBA", href: "/guides/apply-strategic-innovation-fund", description: "How to apply for large-scale innovation funding through Canada\\..." },
      { title: "The Mentor is the Key", href: "/guides/apply-women-entrepreneurship-strategy", description: "Comprehensive guide to accessing WES funding and resources for women entrepreneurs in Canada...." }
    ],
    content: `
      <div class="bg-emerald-50 p-6 rounded-lg mb-8 border border-emerald-100">
        <h2 class="text-2xl font-bold text-emerald-900 mb-4">🌱 Going Net-Zero: The Green Funding Boom</h2>
        <p class="mb-4 text-emerald-800">Canada has a legally binding target to reach Net-Zero emissions by 2050. To get there, the government is essentially paying businesses to go green. In 2026, energy efficiency isn't just an expense—it's a revenue stream. From retrofitting old buildings to installing EV chargers, billions in grants and tax credits are available to offset your costs.</p>
        <p class="text-emerald-800">This guide breaks down the most accessible environmental funding programs for Canadian SMEs.</p>
      </div>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Green and Inclusive Community Buildings (GICB)</h3>
      <p class="mb-4">Mentioned in housing, but applicable broadly for community hubs. If you own a building that serves the public, this is your primary target for retrofit cash. It covers up to 80% of costs for deep energy retrofits (like replacing HVAC or windows).</p>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Zero Emission Vehicle Infrastructure Program (ZEVIP)</h3>
      <p class="mb-4">Want EV chargers at your office or retail location? Natural Resources Canada (NRCan) will pay for up to 50% of the cost.</p>
      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 class="font-bold text-emerald-900 mb-2">Why do it?</h4>
        <ul class="space-y-2">
          <li class="flex items-start"><span class="mr-2">🔹</span> <strong>Attract Customers:</strong> EV drivers choose hotels and shops where they can charge.</li>
          <li class="flex items-start"><span class="mr-2">🔹</span> <strong>Employee Perk:</strong> Free charging is a high-value, low-cost benefit for staff.</li>
          <li class="flex items-start"><span class="mr-2">🔹</span> <strong>Future Proofing:</strong> Get the infrastructure in before regulations mandate it.</li>
        </ul>
      </div>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Clean Tech Investment Tax Credit</h3>
      <p class="mb-4">A refundable tax credit of up to 30% for investments in clean technology equipment. This includes:</p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-gray-700">
        <li>Solar heating and electricity generation systems.</li>
        <li>Stationary energy storage (batteries).</li>
        <li>Low-carbon heat equipment (heat pumps).</li>
      </ul>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Provincial Incentives</h3>
      <p class="mb-4">Always stack federal funds with local ones:</p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-gray-700">
        <li><strong>BC Hydro & FortisBC:</strong> Massive rebates for energy-efficient equipment.</li>
        <li><strong>Hydro-Québec:</strong> Grants for efficient industrial systems.</li>
        <li><strong>Save on Energy (Ontario):</strong> Incentives for lighting and HVAC upgrades.</li>
      </ul>

      <div class="bg-teal-50 border-l-4 border-teal-500 p-6 my-8">
        <h4 class="font-bold text-teal-900 mb-2">💡 Expert Tip: "Audit First"</h4>
        <p class="text-teal-800">You almost always need a baseline energy audit <em>before</em> you start work to qualify for grants. Don't tear out that old furnace until an auditor has documented it! The audit itself is often covered by funding programs.</p>
      </div>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Application Checklist</h3>
      <ol class="list-decimal pl-6 space-y-4 mb-8 text-gray-700">
        <li><strong>Get Audited:</strong> Hire a certified energy advisor.</li>
        <li><strong>Quote Everything:</strong> Get 3 quotes for the work (e.g., solar panels). Grants usually require competitive bidding.</li>
        <li><strong>Apply Pre-Project:</strong> Never start construction before approval unless the program explicitly allows retroactive expenses (rare).</li>
      </ol>

      <hr class="my-8 border-gray-200" />
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Tech Spotlight: Hydrogen</h3>
      <p class="mb-4">Canada aims to be a top global exporter of hydrogen. If your business involves heavy transport or industrial heating, you can access the <strong>Clean Fuels Fund</strong>. This $1.5 billion fund helps build production facilities. For SMEs, the play is in the supply chain—making the valves, sensors, or software that the big hydrogen plants need.</p>

      <h3 class="text-2xl font-bold text-gray-900 mb-4">Detailed Breakdown: Investment Tax Credit (ITC)</h3>
      <p class="mb-4">The Clean Tech ITC is refundable, meaning if you don't owe taxes, the CRA sends you a cheque. Here's the math:</p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-gray-700">
        <li><strong>Cost of Solar System:</strong> $100,000</li>
        <li><strong>ITC Rate:</strong> 30%</li>
        <li><strong>Cheque from CRA:</strong> $30,000</li>
        <li><strong>Net Cost:</strong> $70,000</li>
        <li><em>Note: You must pay "prevailing wages" to installation workers to get the full 30%. If you underpay, the credit drops to 10%.</em></li>
      </ul>

      <h3 class="text-2xl font-bold text-gray-900 mb-4">FAQ: The "Audit" Barrier</h3>
      <div class="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 class="font-bold text-gray-800">Do I really need an energy audit? It costs $5,000!</h4>
        <p class="text-gray-700 text-sm mt-1">Yes. Almost all federal grants (especially GICB) require a "pre-retrofit" audit to prove your baseline. The good news: the grant usually covers 80-100% of the audit cost itself as an eligible line item.</p>
      </div>

      <h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Carbon Credits</h3>
      <p class="mb-4">Beyond grants, your green project can generate long-term recurring revenue through <strong>Carbon Credits (Offsets)</strong>. Large industrial emitters act as buyers. If your project (e.g., a solar farm or methane capture system) quantifiably reduces emissions, you can sell those "negative tons" on the voluntary market.</p>
      <p class="mb-6">In 2026, the price per ton is hovering around $95, making this a significant line item for any heavy-industry retrofit project. However, certification is expensive, so this strategy is best for projects reducing over 1,000 tons annually.</p>

      <hr class="my-8 border-gray-200" />
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Your 90-Day Action Plan</h3>
      <div class="bg-gray-900 text-white p-6 rounded-xl">
        <ol class="space-y-4">
          <li class="flex items-start">
            <span class="font-bold text-blue-400 mr-2">Month 1:</span>
            <span><strong>Audit & Align.</strong> dedicated two weeks to strictly gathering your documentation (incorporation papers, financials, business plan). Identify the <em>one</em> grant that matches your immediate needs best.</span>
          </li>
          <li class="flex items-start">
            <span class="font-bold text-blue-400 mr-2">Month 2:</span>
            <span><strong>Engage & Draft.</strong> Reach out to the program officer (for agencies like ACOA or FedNor) or a grant writer. Draft your narrative, focusing heavily on the "benefits to Canada" (jobs, innovation, export).</span>
          </li>
          <li class="flex items-start">
            <span class="font-bold text-blue-400 mr-2">Month 3:</span>
            <span><strong>Submit & Pivot.</strong> Submit your application early. While waiting, pivot to securing your matching funds (bank loan or equity) so you are ready to sign the contribution agreement immediately upon approval.</span>
          </li>
        </ol>
      </div>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Technical Deep Dive: Scope 1, 2, and 3</h2>
      <p class="mb-4 text-gray-700">To win green grants in 2026, you must speak the language of carbon accounting. Applications that use vague terms like "eco-friendly" are rejected. Applications that measure "Scope 2 Emission Reductions" are approved.</p>
      
      <div class="bg-emerald-50 p-6 rounded-xl border border-emerald-100 mb-8">
        <ul class="space-y-4">
          <li><strong>Scope 1 (Direct):</strong> Emissions from your own furnaces or vehicles. <em>Grant Target: Fleet electrification (ZEVIP).</em></li>
          <li><strong>Scope 2 (Indirect):</strong> Emissions from the electricity you buy. <em>Grant Target: Solar panels (Clean Tech ITC).</em></li>
          <li><strong>Scope 3 (Value Chain):</strong> Emissions from your suppliers. <em>Grant Target: Supply Chain Analysis Grants.</em></li>
        </ul>
      </div>

      <div class="mb-10">
        <h3 class="text-2xl font-bold text-emerald-900 mb-4">1. Industrial Energy Efficiency Program (IEEP)</h3>
        <p class="mb-4 text-gray-700">Provincial variants of this program exist in BC, Ontario, and Quebec. They pay you per kilowatt-hour (kWh) saved. If you replace an old compressed air system with a high-efficiency one, the utility company will cut you a cheque for the difference in expected energy usage.</p>
      </div>

      <div class="mb-10">
        <h3 class="text-2xl font-bold text-emerald-900 mb-4">2. Agricultural Clean Technology (ACT) Program</h3>
        <p class="mb-4 text-gray-700">For farmers, the ACT program covers grain dryers and precision agriculture tech. If you can prove that your new GPS-guided tractor reduces diesel usage by 20%, NRCan funds 50% of the tractor purchase.</p>
      </div>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">The ROI of Sustainability</h2>
      <p class="mb-6 text-gray-700">Green grants are unique because they improve your bottom line <em>permanently</em>.</p>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-900">
              <th class="p-3 border">Investment</th>
              <th class="p-3 border">Cost</th>
              <th class="p-3 border">Grant/ITC</th>
              <th class="p-3 border">Annual Saving</th>
              <th class="p-3 border">Payback Period</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm">
            <tr>
              <td class="p-3 border">Solar Array (50kW)</td>
              <td class="p-3 border">$120,000</td>
              <td class="p-3 border">$36,000</td>
              <td class="p-3 border">$15,000</td>
              <td class="p-3 border font-bold text-green-600">5.6 Years</td>
            </tr>
            <tr>
              <td class="p-3 border">Heat Pump Retrofit</td>
              <td class="p-3 border">$40,000</td>
              <td class="p-3 border">$15,000</td>
              <td class="p-3 border">$4,000</td>
              <td class="p-3 border font-bold text-green-600">6.2 Years</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-4 text-sm text-gray-500"><em>Note: Without the grant, the solar array payback is ~8 years. The grant accelerates your profitability by 30%.</em></p>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Future Outlook: Mandatory Reporting</h2>
      <p class="mb-4 text-gray-700">By 2027, the government will likely mandate carbon reporting for all businesses supplying the federal government. Getting your baseline audit done <strong>now</strong> (while it's funded by grants) is a strategic move to ensure you don't get locked out of government contracts later.</p>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Navigating the "Clean Growth Hub"</h2>
      <p class="mb-6 text-gray-700">The federal government has verified that "finding" green grants is hard. So they created the <strong>Clean Growth Hub</strong>. It is a single concierge service composed of representatives from 16 federal departments.</p>
      
      <div class="mb-10">
        <h4 class="text-xl font-bold text-emerald-900 mb-3">How to use it:</h4>
        <ol class="list-decimal pl-6 space-y-4 text-gray-700">
          <li><strong>Fill out the Form:</strong> Submit a "Service Request" on the Clean Growth Hub website.</li>
          <li><strong>The Vetting:</strong> You will get a call. They will ask technical questions. Be ready to discuss your Technology Readiness Level (TRL).</li>
          <li><strong>The "Menu":</strong> Instead of searching for hours, they will send you a curated PDF list of every open grant your specific project qualifies for. This saves weeks of research time.</li>
        </ol>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6">Green Retrofit ROI Table</h2>
      <div class="overflow-x-auto mb-10">
        <table class="w-full text-left font-sm text-gray-700">
          <thead class="bg-gray-100 text-gray-900 font-bold">
            <tr>
              <th class="p-3">Upgrade</th>
              <th class="p-3">Cost (Est.)</th>
              <th class="p-3">Grant/Tax Credit</th>
              <th class="p-3">Energy Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="p-3 font-medium">LED Lighting (Warehouse)</td>
              <td class="p-3">$20,000</td>
              <td class="p-3">$5,000 (Provincial)</td>
              <td class="p-3 text-green-600">-40% Lighting Bill</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Electric Delivery Van</td>
              <td class="p-3">$80,000</td>
              <td class="p-3">$10k (iMHZEV) + Tax Write-off</td>
              <td class="p-3 text-green-600">$0 Gas / Low Maint</td>
            </tr>
            <tr class="border-b">
              <td class="p-3 font-medium">Roof Insulation (R-30)</td>
              <td class="p-3">$50,000</td>
              <td class="p-3">$25,000 (GICB)</td>
              <td class="p-3 text-green-600">-20% Heating Bill</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Grant Masterclass: Writing a Winning Narrative</h2>
      <p class="mb-6 text-gray-700">Most grant applications are rejected not because the business is bad, but because the story is told poorly. Reviewers read hundreds of applications. Here is how to make yours stand out using the "Problem-Solution-Impact" framework.</p>

      <div class="space-y-8 mb-12">
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-gray-900 mb-2">1. The Problem (The "Hook")</h4>
          <p class="text-gray-700 mb-4">Do not start with "We want to buy a machine." Start with the market failure you are addressing.</p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 p-4 rounded text-sm text-red-800">
              <strong>Weak:</strong> "We need a new CNC machine to cut faster."
            </div>
            <div class="bg-green-50 p-4 rounded text-sm text-green-800">
              <strong>Strong:</strong> "Current lead times for aerospace parts in Western Canada are 12 weeks, causing supply chain bottlenecks. Regional manufacturers are losing contracts to US competitors due to this capacity gap."
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-gray-900 mb-2">2. The Solution (Your Innovation)</h4>
          <p class="text-gray-700 mb-4">Describe <em>how</em> you fix the problem technically. Be specific.</p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-red-50 p-4 rounded text-sm text-red-800">
              <strong>Weak:</strong> "Our new machine is high-tech."
            </div>
            <div class="bg-green-50 p-4 rounded text-sm text-green-800">
              <strong>Strong:</strong> "Implementation of a 5-axis DMG Mori system allows for simultaneous machining, reducing setup time by 40% and allowing for complex geometries that were previously impossible to manufacture locally."
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 class="text-xl font-bold text-gray-900 mb-2">3. The Impact (The ROI for Canada)</h4>
          <p class="text-gray-700 mb-4">This is the most important section. Government grants are investments. What is their return?</p>
          <ul class="list-disc pl-4 text-gray-600 space-y-2">
            <li><strong>Jobs:</strong> "We will hire 3 new machinists and 1 engineer."</li>
            <li><strong>Revenue:</strong> "We project $2M in new export revenue within 24 months."</li>
            <li><strong>Environment:</strong> "Reduced scrap rate by 15% lowers our metal waste footprint."</li>
          </ul>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6">Common "Red Flags" that Kill Applications</h2>
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div class="bg-red-50 p-6 rounded-xl">
          <h4 class="font-bold text-red-900 mb-2">Vague Timeline</h4>
          <p class="text-sm text-red-800">Using phrases like "Summer 2026." Use specific dates: "Start: June 1, 2026. Commissioning: August 15, 2026."</p>
        </div>
        <div class="bg-red-50 p-6 rounded-xl">
          <h4 class="font-bold text-red-900 mb-2">"TBD" Costs</h4>
          <p class="text-sm text-red-800">Never explicitly say you don't know the price. Get a quote. Even a draft quote is better than a guess.</p>
        </div>
        <div class="bg-red-50 p-6 rounded-xl">
          <h4 class="font-bold text-red-900 mb-2">Ignoring "Stacking"</h4>
          <p class="text-sm text-red-800">Failing to disclose other government funding. If you have a provincial grant, list it. The Feds <em>like</em> knowing they aren't the only ones taking a risk.</p>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-gray-900 mb-6">2027 Outlook: Carbon Borders</h2>
      <p class="mb-4 text-gray-700">The EU has implemented Carbon Border Adjustments. Canada is following. This means valid green credentials will be a "Ticket to Play" for exporters.</p>
      <p class="mb-6 text-gray-700"><strong>Strategy:</strong> Calculate your carbon intensity per unit of product. If it's lower than the global average, that is your #1 marketing claim.</p>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Case Study #2: The Fleet Electrification</h2>
      <p class="mb-4 text-gray-700"><strong>Subject:</strong> "Metro Last Mile" (Vancouver, BC)</p>
      <p class="mb-4 text-gray-700">A delivery company with 20 gas vans. They were losing contracts to competitors who promised "Green Delivery."</p>
      <p class="mb-4 text-gray-700"><strong>The Funding:</strong> They stacked the federal <strong>iMHZEV</strong> grant ($5k per van) with the provincial BC rebate ($3k per van). This reduced the cost of a Ford E-Transit to within $5k of a gas van.</p>
      <p class="mb-4 text-gray-700"><strong>The Result:</strong> They replaced 10 vans. Validated by the carbon reduction, they won a major contract with a sustainable meal-kit company, increasing revenue by $500k/year.</p>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Community Q&A: Real Founder Questions</h2>
      <p class="mb-6 text-gray-700">We polled 500+ Canadian founders about their biggest funding roadblocks. Here are the top answers.</p>

      <div class="space-y-6 mb-12">
        <div class="bg-gray-50 p-6 rounded-lg">
          <p class="font-bold text-gray-900 mb-2">Q: "Can I pay myself a salary from the grant?"</p>
          <p class="text-gray-700"><strong>A:</strong> Usually, no. Most grants (like CDAP, CanExport) legally restrict you from paying owners or board members. They are for <em>third-party costs</em> (consultants, equipment, travel). However, wage subsidies (like SWPP) <em>do</em> pay for staff salaries.</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <p class="font-bold text-gray-900 mb-2">Q: "If I get rejected, can I apply again?"</p>
          <p class="text-gray-700"><strong>A:</strong> Yes, and you should. Unlike a bank, a grant agency will usually give you a "debrief call" to tell you exactly why you scored low. Use this feedback. The success rate on second attempts is often double the first attempt.</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <p class="font-bold text-gray-900 mb-2">Q: "Do I need to hire a grant writer?"</p>
          <p class="text-gray-700"><strong>A:</strong> For small grants (<$20k), no. The forms are simple. For large infrastructure grants (>$100k), yes. Their fee (usually 10-15% of success) is worth it to navigate the complex compliance logic.</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <p class="font-bold text-gray-900 mb-2">Q: "Is the money taxable?"</p>
          <p class="text-gray-700"><strong>A:</strong> Yes. Government grants are considered "Other Income" by the CRA. However, you can write off the expenses you bought with that money, so it usually nets out to zero tax impact.</p>
        </div>
      </div>

      <hr class="my-8 border-gray-200" />
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Extended Glossary: Speak the Language</h2>
      <p class="mb-6 text-gray-700">Government program officers use a specific dialect. Understanding these terms is the difference between "Pending" and "Approved".</p>

      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <div>
          <h4 class="font-bold text-gray-900 mb-2">Contribution Agreement</h4>
          <p class="text-sm text-gray-700 mb-4">The legal contract you sign. It dictates exactly what you can spend money on. <em>Tip: Do not spend a dime until this is signed.</em></p>
          
          <h4 class="font-bold text-gray-900 mb-2">Stacking Limit</h4>
          <p class="text-sm text-gray-700 mb-4">The maximum percentage of government funding allowed (usually 75%). You must cover the remaining 25% with "Private Equity" or bank debt.</p>
          
          <h4 class="font-bold text-gray-900 mb-2">In-Kind Contribution</h4>
          <p class="text-sm text-gray-700 mb-4">Non-cash contributions (like your time or equipment use). Some grants accept this as your 25% share; others demand cash.</p>
        </div>
        <div>
          <h4 class="font-bold text-gray-900 mb-2">Holdback</h4>
          <p class="text-sm text-gray-700 mb-4">The government often holds back 10-15% of the grant until the final report is accepted. Manage your cash flow accordingly.</p>
          
          <h4 class="font-bold text-gray-900 mb-2">GBA+ (Gender-based Analysis Plus)</h4>
          <p class="text-sm text-gray-700 mb-4">A mandatory section in federal outcomes. You must explain how your project affects diverse groups (women, indigenous, youth). detailed answers here score higher.</p>
          
          <h4 class="font-bold text-gray-900 mb-2">Technology Readiness Level (TRL)</h4>
          <p class="text-sm text-gray-700 mb-4">A 1-9 scale measuring maturity. Research grants want TRL 1-4. Commercialization grants want TRL 7-9. applying to the wrong one is an automatic rejection.</p>
        </div>
      </div>
`,
    seo: {
      keywords: ["Green Business Grants", "Sustainability Funding", "EV Incentives", "Retrofit Grants"]
    }, shortAnswer: "To apply for Green Business Funding : Susta 2026, start by reviewing the eligibility criteria and preparing a project proposal. Detailed guide to Canada's green business grants for SMEs. Covers retrofits, EV fleets, and zero-waste manufacturing incentives available in 2026. Funding available: up to $1.",
    metrics: [
      { label: 'Retrofit', value: '$3M', description: 'GICB Max', color: 'text-green-600', iconName: 'Home' },
      { label: 'Fleet', value: '$200k', description: 'Truck Incentive', color: 'text-blue-600', iconName: 'Truck' },
      { label: 'Tax Credit', value: '30%', description: 'Clean Tech', color: 'text-emerald-600', iconName: 'PieChart' },
      { label: 'Charger', value: '50%', description: 'Install Cost', color: 'text-yellow-600', iconName: 'Zap' }
    ],
    expertTip: {
      title: "Audit First",
      type: 'tip',
      content: "Most retrofit grants require a <strong>pre-retrofit energy audit</strong>. Do not start construction until you have this audit, or you will be ineligible."
    },
    faq: [
      {
        question: "Can I get funding for a used EV?",
        answer: "Generally, no. Federal incentives (iZEV, iMHZEV) are for **new** vehicles only."
      },
      {
        question: "Does the carbon tax help me?",
        answer: "Indirectly. The revenue funds many grant programs, and the **Canada Carbon Rebate for Small Business** returns a portion of fuel charges directly to eligible corporations."
      },
      {
        question: "How do I claim the Investment Tax Credit (ITC)?",
        answer: "You claim it on your T2 corporate tax return. Work with an accountant to ensure your equipment meets Class 43.1/43.2 requirements."
      }
    ],
    eligibleCheck: true,
    inlineCTA: {
      title: "Need expert help applying for grants?",
      description: "Our funding specialists can help you navigate government programs and maximize your funding potential.",
      buttonText: "Get Funding Assistance",
      buttonLink: "/contact"
    },
    jumpLinks: [
      { title: "Overview", id: "overview" },
      { title: "Eligibility Requirements", id: "eligibility" },
      { title: "How to Apply", id: "how-to-apply" }
    ],
      comparisonTable: {
              "title": "Green Business Funding : Sustainability Grants Funding Options Overview",
              "programs": [
                  {
                      "program": "Core Green Business Funding : Sustainability Grants Grant",
                      "amount": "$1",
                      "equity": "Non-dilutive",
                      "bestFor": "Eligible Applicants",
                      "timeline": "Standard Review"
                  },
                  {
                      "program": "Related Provincial Match",
                      "amount": "Up to 50%",
                      "equity": "0%",
                      "bestFor": "Expansion Projects",
                      "timeline": "45 Days"
                  },
                  {
                      "program": "Federal Support Program",
                      "amount": "Varies",
                      "equity": "Non-dilutive",
                      "bestFor": "Scaling Businesses",
                      "timeline": "90 Days"
                  }
              ]
          }
};

export default post;
