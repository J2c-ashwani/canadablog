export default `
  <div id="common-questions" class="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
    <h2 class="text-2xl font-bold text-blue-900 mb-4">💡 Common Questions About SBIR/STTR</h2>
    <ul class="space-y-3">
      <li><a href="#sbir-vs-sttr" class="text-blue-700 hover:text-blue-900 underline font-medium">What is the difference between SBIR and STTR?</a></li>
      <li><a href="#agency-breakdown" class="text-blue-700 hover:text-blue-900 underline font-medium">Which 11 agencies participate in SBIR?</a></li>
      <li><a href="#equity-free" class="text-blue-700 hover:text-blue-900 underline font-medium">Does the government take equity in my company?</a></li>
      <li><a href="#taba-funds" class="text-blue-700 hover:text-blue-900 underline font-medium">What is TABA funding (and why should I ask for it)?</a></li>
      <li><a href="#phase-3" class="text-blue-700 hover:text-blue-900 underline font-medium">What happens after Phase II? (Commercialization)</a></li>
    </ul>
  </div>

  <div class="prose max-w-none text-gray-800">
    <p class="text-xl font-light leading-relaxed mb-6 text-gray-600">
      The Small Business Innovation Research (SBIR) program is often called "America's Seed Fund." It provides over <strong>$4 billion annually</strong> in non-dilutive capital to early-stage startups. Unlike VC money, you don't give up equity, you don't pay it back, and you keep your Intellectual Property (IP). For tech startups in 2026, this is the single most valuable source of early funding.
    </p>

    <h2 id="sbir-vs-sttr" class="text-3xl font-bold text-gray-900 mt-10 mb-6">SBIR vs. STTR: Which One fits You?</h2>
    <p class="text-lg mb-6">
      Both programs are similar but have one critical distinction: the requirement for non-profit research partners.
    </p>
    
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white p-6 rounded-xl border border-blue-200 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Most Popular</div>
        <h3 class="font-bold text-xl text-blue-800 mb-3">SBIR (Small Business Innovation Research)</h3>
        <p class="text-sm text-gray-600 mb-4">Focuses on the small business as the primary innovator.</p>
        <ul class="space-y-2 text-sm text-gray-700">
          <li><strong>Partner Requirement:</strong> Optional (up to 33% in Phase I).</li>
          <li><strong>PI Employment:</strong> Principal Investigator (PI) <span class="text-red-600 font-bold">MUST</span> be primarily employed (>50%) by the small business.</li>
          <li><strong>Speed:</strong> Generally faster contracting.</li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-purple-200 shadow-sm relative overflow-hidden">
         <div class="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">University Heavy</div>
        <h3 class="font-bold text-xl text-purple-800 mb-3">STTR (Small Business Technology Transfer)</h3>
        <p class="text-sm text-gray-600 mb-4">Focuses on transfer of technology from a research institution.</p>
        <ul class="space-y-2 text-sm text-gray-700">
          <li><strong>Partner Requirement:</strong> Mandatory (Research Institution must do at least 30%).</li>
          <li><strong>PI Employment:</strong> PI can be employed by the university OR the business (flexible).</li>
          <li><strong>Ideal For:</strong> Professor-led spinouts.</li>
        </ul>
      </div>
    </div>

    <h2 id="agency-breakdown" class="text-3xl font-bold text-gray-900 mt-12 mb-6">The 11 Participating Agencies</h2>
    <p class="text-lg leading-relaxed mb-6">
      "SBIR" is not a single application. It is a congressionally mandated program administered by 11 different agencies, each with different rules, topics, and deadlines.
    </p>
    
    <div class="space-y-6">
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-xl font-bold text-gray-900 mb-2">🏛️ The "Big 3" (Grant Agencies)</h3>
        <p class="text-gray-600 text-sm mb-4">These agencies provide <strong>grants</strong>. They are investigator-initiated and flexible.</p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded border border-gray-300">
            <strong class="text-blue-800 block mb-1">NSF (National Science Foundation)</strong>
            <p class="text-xs text-gray-500">Focus: High-risk, high-impact tech. Topic agnostic. "We fund the innovation, not the application."</p>
          </div>
          <div class="bg-white p-4 rounded border border-gray-300">
            <strong class="text-green-800 block mb-1">NIH (National Institutes of Health)</strong>
            <p class="text-xs text-gray-500">Focus: Health, biotech, life sciences. Massive budget ($1.2B+). Strict peer review.</p>
          </div>
          <div class="bg-white p-4 rounded border border-gray-300">
            <strong class="text-orange-800 block mb-1">DOE (Department of Energy)</strong>
            <p class="text-xs text-gray-500">Focus: Clean tech, nuclear, grid modernization. Very specific topic letters.</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-xl font-bold text-gray-900 mb-2">🛡️ The "Contracting" Agencies</h3>
        <p class="text-gray-600 text-sm mb-4">These agencies issue <strong>contracts</strong>. They are the customer. They want to buy what you build.</p>
         <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded border border-gray-300">
            <strong class="text-red-800 block mb-1">DoD (Department of Defense)</strong>
            <p class="text-xs text-gray-500">Largest budget ($1.8B). Very specific problems (e.g., "Drone battery life in arctic conditions").</p>
          </div>
          <div class="bg-white p-4 rounded border border-gray-300">
            <strong class="text-blue-800 block mb-1">NASA</strong>
            <p class="text-xs text-gray-500">Focus: Space exploration, aeronautics, distant planet survival tech.</p>
          </div>
        </div>
      </div>
    </div>

    <h2 id="taba-funds" class="text-3xl font-bold text-gray-900 mt-12 mb-6">💰 Don't Leave Money on the Table: TABA Funds</h2>
    <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
      <h3 class="font-bold text-xl text-green-900 mb-2">You can get an EXTRA $6,500 - $50,000</h3>
      <p class="text-green-800 text-lg">
        Many applicants forget to request <strong>Technical and Business Assistance (TABA)</strong> funds.
      </p>
      <ul class="list-disc pl-5 mt-4 space-y-2 text-green-700">
        <li><strong>Phase I:</strong> Up to <strong>$6,500</strong> extra.</li>
        <li><strong>Phase II:</strong> Up to <strong>$50,000</strong> extra.</li>
        <li><strong>Use it for:</strong> Market research, IP legal fees, regulatory consultants, and <a href="/blog/grant-writing-secrets-2026" class="text-green-800 underline font-bold">marketing strategy</a>.</li>
        <li><strong>How to get it:</strong> You must request it IN your proposal. You cannot add it later.</li>
      </ul>
    </div>

    <h2 id="equity-free" class="text-3xl font-bold text-gray-900 mt-12 mb-6">The "IP Rights" Superpower</h2>
    <p class="text-lg leading-relaxed mb-6">
      Investors love SBIR-funded companies because of the <strong>Data Rights</strong> clause.
    </p>
    <p class="text-lg leading-relaxed mb-6">
      Under the SBIR Policy Directive, the government gets a "royalty-free license" to use your tech, but YOU retain the title and ownership. Crucially, the government <strong>cannot disclose your data</strong> for 20 years. This protects your trade secrets from FOIA requests and competitors, giving you a massive moat while you commercialize.
    </p>

    <h2 id="phase-timeline" class="text-3xl font-bold text-gray-900 mt-12 mb-6">The 3-Phase Journey</h2>
    
    <div class="relative border-l-4 border-gray-200 ml-4 space-y-10">
      <div class="relative pl-8">
        <span class="absolute -left-3 top-0 bg-blue-500 w-6 h-6 rounded-full border-4 border-white"></span>
        <h3 class="text-xl font-bold text-gray-900">Phase I: Concept & Feasibility</h3>
        <p class="text-gray-600 mt-2"><strong>Goal:</strong> Prove the science works.</p>
        <p class="text-sm font-semibold text-blue-600">Funding: $150k - $275k | Duration: 6-12 months</p>
      </div>
      
      <div class="relative pl-8">
        <span class="absolute -left-3 top-0 bg-purple-500 w-6 h-6 rounded-full border-4 border-white"></span>
        <h3 class="text-xl font-bold text-gray-900">Phase II: Prototype & Development</h3>
        <p class="text-gray-600 mt-2"><strong>Goal:</strong> Build a working prototype.</p>
        <p class="text-sm font-semibold text-purple-600">Funding: $750k - $1.8M | Duration: 24 months</p>
      </div>

       <div class="relative pl-8">
        <span class="absolute -left-3 top-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></span>
        <h3 class="text-xl font-bold text-gray-900">Phase III: Commercialization</h3>
        <p class="text-gray-600 mt-2"><strong>Goal:</strong> Sell it to the government or private sector.</p>
        <p class="text-sm font-semibold text-green-600">Funding: NO SBIR funds. Revenue comes from sales contracts.</p>
        <p class="text-xs text-gray-500 italic mt-1 bg-gray-100 p-2 rounded">"Sole Source" Advantage: Once you have Phase I/II, federal agencies can buy from you without public bidding.</p>
      </div>
    </div>

    <hr class="my-10 border-gray-200" />

    <div class="bg-gray-50 p-8 rounded-xl border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
      <div itemscope itemtype="https://schema.org/FAQPage" class="space-y-6">
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">Can I use SBIR funds for marketing?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              Generally, no. SBIR funds are for <strong>Research & Development</strong> (labor, materials, testing). However, you can use the <strong>TABA</strong> supplement (up to $50k) for commercialization activities like market research and IP protection.
            </div>
          </div>
        </div>

        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">Is SBIR grant money taxable?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              Yes. SBIR grants are considered <strong>ordinary business income</strong> by the IRS. You must report them on your tax return. However, R&D expenses you pay with this money are often deductible, offsetting the tax liability. Always consult a CPA.
            </div>
          </div>
        </div>

        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">Do I need a PhD to get an SBIR grant?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              No, but you need a credible team. If the Principal Investigator (PI) doesn't have a PhD, they should have significant industry experience. You can also use consultants or university partners to bolster your team's credentials.
            </div>
          </div>
        </div>

        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">Does California match SBIR grants?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              Yes! Several states, including <a href="/blog/california-tech-programs" class="text-blue-600 hover:underline">California</a>, North Carolina, and Kentucky, offer "Matching Grants" to SBIR winners. This is essentially free money on top of free money.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
