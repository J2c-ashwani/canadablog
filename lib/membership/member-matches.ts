import { getAllPrograms } from '@/lib/data/programs';
import { MatchScoreEngine } from '@/lib/leads/MatchScoreEngine';
import type { SubscriberProfile } from '@/lib/leads/SubscriberRepository';

export interface MemberProgramMatch {
  name: string;
  fundingAmount: string;
  fundingType: string;
  status: string;
  deadlineType: string;
  fitBand: string;
  confidence: string;
  explanation: string;
  change: string;
  slug: string;
  officialWebsite: string;
  lastReviewed: string;
}

export function buildMemberProgramMatches(profile: Partial<SubscriberProfile>, limit = 5): MemberProgramMatch[] {
  return getAllPrograms()
    .filter((program) => program.status === 'Open' || program.status === 'Upcoming')
    .map((program) => ({ program, score: MatchScoreEngine.calculateMatch(program, profile) }))
    .filter(({ score }) => score.status === 'Eligible')
    .sort((left, right) => right.score.score - left.score.score)
    .slice(0, limit)
    .map(({ program, score }) => ({
      name: program.name,
      fundingAmount: program.fundingAmount,
      fundingType: program.fundingType,
      status: program.status,
      deadlineType: program.deadlineType,
      fitBand: score.fitBand,
      confidence: score.confidence,
      explanation: score.explanations[0] || 'Profile-level match; confirm full eligibility with the program.',
      change: program.recentChanges?.[0] || '',
      slug: program.slug,
      officialWebsite: program.officialWebsite,
      lastReviewed: program.lastReviewed || '',
    }));
}
