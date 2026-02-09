export default `
  <div id="common-questions" class="bg-red-50 p-6 rounded-lg mb-8 border border-red-200 shadow-sm">
    <h2 class="text-2xl font-bold text-red-900 mb-4">💡 Common Questions About SR&ED 2026</h2>
    <ul class="space-y-3">
      <li><a href="#what-is-sred" class="text-red-700 hover:text-red-900 underline font-medium">What exactly qualifies as "SR&ED" work?</a></li>
      <li><a href="#refund-calculator" class="text-red-700 hover:text-red-900 underline font-medium">How much cash can gets back (35% vs 15%)?</a></li>
      <li><a href="#provincial-topup" class="text-red-700 hover:text-red-900 underline font-medium">Do I get extra credits if I am in Ontario or BC?</a></li>
      <li><a href="#documentation" class="text-red-700 hover:text-red-900 underline font-medium">What documents do I need to keep to avoid an audit?</a></li>
      <li><a href="#salary-limits" class="text-red-700 hover:text-red-900 underline font-medium">Can I claim the founder's salary?</a></li>
    </ul>
  </div>

  <div class="prose max-w-none text-gray-800">
    <p class="text-xl font-light leading-relaxed mb-6 text-gray-600">
      The Scientific Research and Experimental Development (SR&ED) program is Canada's largest business incentive, distributing over <strong>$4 billion annually</strong> to 20,000+ claimants. It is not just for guys in lab coats. If you are writing complex code, improving manufacturing processes, or testing new materials, you are likely leaving <strong>tens of thousands of dollars</strong> on the table.
    </p>

    <h2 id="what-is-sred" class="text-3xl font-bold text-gray-900 mt-10 mb-6">The "Why" vs. "How" Test: Are You Eligible?</h2>
    <p class="text-lg leading-relaxed mb-6">
      The CRA doesn't care about your commercial success. They care about your <strong>failure</strong> and your <strong>process</strong>. To qualify, your work must meet the "three criteria":
    </p>

    <div class="space-y-8 my-8">
      <div class="flex items-start">
        <div class="bg-blue-100 p-4 rounded-full mr-6 flex-shrink-0">
          <span class="text-2xl font-bold text-blue-800">1</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Technological Uncertainty (The "Why")</h3>
          <p class="text-gray-600 mb-2">Did you encounter a problem where the solution wasn't obvious to a standard professional? If you could just Google the answer, it's not SR&ED. If you tried standard methods and they failed, you have uncertainty.</p>
          <p class="text-sm bg-blue-50 p-2 text-blue-800 rounded"><em>Example:</em> "Standard SQL queries were too slow for our dataset. We didn't know if a custom indexing algorithm would work without breaking consistency."</p>
        </div>
      </div>

      <div class="flex items-start">
        <div class="bg-purple-100 p-4 rounded-full mr-6 flex-shrink-0">
          <span class="text-2xl font-bold text-purple-800">2</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Systematic Investigation (The "How")</h3>
          <p class="text-gray-600 mb-2">Did you experiment? You must show a hypothesis, testing, results, and conclusions. Random trial-and-error doesn't count. You need a paper trail of your experiments.</p>
          <p class="text-sm bg-purple-50 p-2 text-purple-800 rounded"><em>Example:</em> "We tested 3 caching strategies (A, B, C). A reduced latency by 10% but spiked memory. B failed. C worked."</p>
        </div>
      </div>

      <div class="flex items-start">
        <div class="bg-green-100 p-4 rounded-full mr-6 flex-shrink-0">
          <span class="text-2xl font-bold text-green-800">3</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Technological Advancement (The Value)</h3>
          <p class="text-gray-600 mb-2">Did you learn something new? Even if the project failed, you gained knowledge. This "new knowledge" is the advancement.</p>
          <p class="text-sm bg-green-50 p-2 text-green-800 rounded"><em>Example:</em> "We proved that current graph database limitations prevented this specific query type. The failure advanced our understanding."</p>
        </div>
      </div>
    </div>

    <h2 id="refund-calculator" class="text-3xl font-bold text-gray-900 mt-12 mb-6">Show Me The Money: Refund Rates 2026</h2>
    <p class="text-lg leading-relaxed mb-6">
      Not all SR&ED claims are equal. The amount you get back depends on your corporate structure.
    </p>

    <div class="grid md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
        <h3 class="font-bold text-xl text-green-800 mb-3">CCPC (Canadian Controlled Private Corp)</h3>
        <p class="text-sm text-gray-500 mb-4">Small Canadian-owned companies with taxable capital <$50M.</p>
        <ul class="space-y-4">
          <li class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Federal Credit</span>
            <span class="font-bold text-green-600 text-lg">35%</span>
          </li>
          <li class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Status</span>
            <span class="font-bold text-green-600">100% Refundable Cash</span>
          </li>
          <li class="bg-green-50 p-3 rounded text-sm text-green-800">
            <strong>Benefit:</strong> You get a check from the CRA, even if you are not profitable.
          </li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 class="font-bold text-xl text-gray-800 mb-3">Other Corps (Foreign / Public / Large)</h3>
        <p class="text-sm text-gray-500 mb-4">Foreign-owned subs, public companies, or large private corps.</p>
        <ul class="space-y-4">
          <li class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Federal Credit</span>
            <span class="font-bold text-gray-600 text-lg">15%</span>
          </li>
          <li class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span>Status</span>
            <span class="font-bold text-gray-600">Non-Refundable</span>
          </li>
          <li class="bg-gray-100 p-3 rounded text-sm text-gray-700">
             <strong>Benefit:</strong> Applies against taxes owed. Can be carried back 3 years or forward 20 years.
          </li>
        </ul>
      </div>
    </div>

    <h2 id="provincial-topup" class="text-3xl font-bold text-gray-900 mt-12 mb-6">Double Dipping: Provincial Top-Ups</h2>
    <p class="text-lg leading-relaxed mb-6">
      Most provinces offer their own R&D tax credits <strong>stacked on top</strong> of the federal 35%. This can push your total refund to over 60% of eligible salaries.
    </p>

    <div class="space-y-4">
      <div class="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-blue-600">
        <h3 class="font-bold text-lg text-blue-900 mb-1">Ontario</h3>
        <p class="text-sm text-blue-800 mb-2"><strong>OITC (Ontario Innovation Tax Credit):</strong> 8% Refundable</p>
        <p class="text-sm text-gray-600">Total blended return can reach ~43% of salaries. <a href="/blog/ontario-innovation-grants" class="text-blue-600 underline">Read Ontario Guide -></a></p>
      </div>
               
      <div class="bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg border-l-4 border-purple-600">
        <h3 class="font-bold text-lg text-purple-900 mb-1">British Columbia</h3>
        <p class="text-sm text-purple-800 mb-2"><strong>BC SR&ED:</strong> 10% Refundable</p>
        <p class="text-sm text-gray-600">Known for being tech-friendly. Total return ~45%.</p>
      </div>

      <div class="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-blue-400">
        <h3 class="font-bold text-lg text-blue-900 mb-1">Quebec</h3>
        <p class="text-sm text-blue-800 mb-2"><strong>R&D Wage Tax Credit:</strong> ~14% Refundable</p>
        <p class="text-sm text-gray-600">One of the most generous R&D jurisdictions in North America. <a href="/blog/quebec-business-grants-2025" class="text-blue-600 underline">Read Quebec Guide -></a></p>
      </div>

      <div class="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border-l-4 border-red-600">
        <h3 class="font-bold text-lg text-red-900 mb-1">Alberta</h3>
        <p class="text-sm text-red-800 mb-2"><strong>Innovation Employment Grant (IEG):</strong> Up to 20%</p>
        <p class="text-sm text-gray-600">Focused on incremental R&D spend growth. <a href="/blog/alberta-business-grants-2025" class="text-red-600 underline">Read Alberta Guide -></a></p>
      </div>
    </div>

    <h2 id="documentation" class="text-3xl font-bold text-gray-900 mt-12 mb-6">Audit-Proof Your Claim: The "Evidence" Bucket</h2>
    <p class="text-lg leading-relaxed mb-6">
      The #1 reason claims are denied is <strong>lack of contemporaneous documentation</strong>. You cannot create evidence in April 2027 for work done in January 2026.
    </p>

    <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
      <h3 class="font-bold text-xl text-yellow-900 mb-4">📁 The SR&ED Survival Kit</h3>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-bold text-yellow-800 mb-2">Technical Evidence</h4>
          <ul class="list-disc pl-5 text-sm text-gray-700 space-y-2">
            <li><strong>Git Commit Logs:</strong> Highlight complex refactors (not just CRUD).</li>
            <li><strong>Test Logs/JIRA Tickets:</strong> Evidence of bugs, failures, and iterations.</li>
            <li><strong>Whiteboard Photos:</strong> Dated photos of architecture diagrams.</li>
            <li><strong>Slack Logs:</strong> Discussions about technical roadblocks.</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-yellow-800 mb-2">Financial Evidence</h4>
          <ul class="list-disc pl-5 text-sm text-gray-700 space-y-2">
            <li><strong>Timesheets:</strong> Track SR&ED hours vs. Commercial hours.</li>
            <li><strong>Contracts:</strong> Proof that contractors were Canadian residents.</li>
            <li><strong>Invoices:</strong> For materials consumed/destroyed during testing.</li>
          </ul>
        </div>
      </div>
    </div>

    <h2 id="contractor-rules" class="text-3xl font-bold text-gray-900 mt-12 mb-6">The "Contractor" Trap</h2>
    <p class="text-lg leading-relaxed mb-6">
      Be careful with contractors. You can claim <strong>80% of the cost</strong> of Canadian contractors, but there are catches:
    </p>
    <ul class="list-disc pl-6 space-y-4 mb-6 text-gray-700">
      <li><strong>Catch 1:</strong> They must be Canadian tax residents (perform the work in Canada).</li>
      <li><strong>Catch 2:</strong> You must own the IP. If they own the code, you can't claim it.</li>
      <li><strong>Catch 3:</strong> You must direct the technical work. If you just say "build me an app" and they figure it out, <em>they</em> perform the SR&ED, not you.</li>
    </ul>

    <hr class="my-10 border-gray-200" />

    <div class="bg-gray-50 p-8 rounded-xl border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
      <div itemscope itemtype="https://schema.org/FAQPage" class="space-y-6">
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">Can I claim SR&ED if my project failed?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              <strong>Yes!</strong> Failures are actually <em>better</em> for SR&ED. A failure proves technological uncertainty. If you tried to achieve something and failed because of technical limitations, that is the strongest proof that SR&ED took place.
            </div>
          </div>
        </div>

        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">How long does it take to get the SR&ED refund?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              Once filed, the CRA service standard is <strong>60 days</strong> for refundable claims (CCPCs). Complex claims or first-time claimants selected for review may take 3-6 months.
            </div>
          </div>
        </div>

        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">Can I double-dip with IRAP?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              Sort of. <a href="/blog/irap-industrial-research-assistance-program" class="text-red-700 underline">IRAP</a> is a grant (upfront money). SR&ED is a tax credit (backend money). You can receive both, but you must deduct the IRAP grant amount from your SR&ED cost base. You cannot claim the exact same dollar twice, but they work well together (called "stacking").
            </div>
          </div>
        </div>

        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name" class="font-bold text-lg text-gray-800 mb-2">What is the filing deadline for SR&ED?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" class="text-gray-600">
              The absolute deadline is <strong>18 months</strong> after your fiscal year-end. If you miss this date, you lose the claim forever. Most companies file with their T2 tax return (6 months after year-end).
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
