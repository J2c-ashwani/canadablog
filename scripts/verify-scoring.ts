import { calculateLeadIntelligence, type LeadCaptureData } from "../lib/leads/scoring";

const testLeads: { name: string; data: LeadCaptureData }[] = [
  {
    name: "Perfect High-Intent Tier A Lead (NASA Space Tech R&D)",
    data: {
      source: "AI Grant Finder",
      timestamp: new Date().toISOString(),
      email: "founder@spacetechcorp.com",
      name: "Sarah Jenkins",
      companyName: "SpaceTech Corp",
      country: "United States",
      state: "California",
      industry: "Aerospace / Technology",
      businessStage: "established",
      fundingAmount: "$500,000",
      fundingPurpose: "research and development",
      businessDescription: "We are developing high-efficiency radiation shielding materials for deep space satellites.",
      phone: "+1 (555) 019-9234",
      consentToPartnerContact: true,
    }
  },
  {
    name: "Good Tier B Lead (Canada Small Business Growth Loan)",
    data: {
      source: "Grant Calculator",
      timestamp: new Date().toISOString(),
      email: "contact@ontariomfg.ca",
      name: "Robert Tremblay",
      companyName: "Ontario Manufacturing",
      country: "Canada",
      state: "Ontario",
      industry: "Manufacturing",
      businessStage: "established",
      fundingAmount: "150000",
      fundingPurpose: "equipment expansion",
      businessDescription: "Acquiring precision machinery to expand production capacity and hire 3 new technicians.",
      phone: "+1 416-555-0182",
      consentToPartnerContact: true,
    }
  },
  {
    name: "Low-Intent Tier D Lead (Newsletter sign-up)",
    data: {
      source: "newsletter-signup",
      timestamp: new Date().toISOString(),
      email: "curious_visitor@gmail.com",
      phone: "",
      consentToPartnerContact: false,
    }
  }
];

console.log("=========================================");
console.log("🔍 FSI Digital Lead Scoring Verification");
console.log("=========================================\n");

testLeads.forEach(({ name, data }) => {
  const result = calculateLeadIntelligence(data);
  console.log(`📌 Case: ${name}`);
  console.log(`   - Score: ${result.score}/100`);
  console.log(`   - Tier: ${result.tier}`);
  console.log(`   - Estimated Value: ${result.estimatedValue}`);
  console.log(`   - Buyer Segment: ${result.buyerSegment}`);
  console.log(`   - Routing: ${result.routing}`);
  console.log(`   - Consent Status: ${result.consentStatus}`);
  console.log(`   - Missing Fields: [${result.missingFields.join(", ")}]`);
  console.log(`   - Qualification Notes: "${result.qualificationNotes}"`);
  console.log("-----------------------------------------");
});
