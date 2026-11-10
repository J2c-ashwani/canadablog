import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProgramBySlug, getAllPrograms } from '@/lib/data/programs';
import { ProgramClientWrapper } from './ProgramClientWrapper';

type ProgramPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    region?: string;
    industry?: string;
    size?: string;
    interests?: string;
    email?: string;
    token?: string;
  }>;
};

export function generateStaticParams() {
  return getAllPrograms().map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const program = getProgramBySlug(resolvedParams.slug);

  if (!program) {
    return {
      title: 'Program Funding Guide Not Found | FSI Digital',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://www.fsidigital.ca/programs/${program.slug}`;
  const displayTitle = `${program.name} | Eligibility & Application Guide (2026)`;
  const displayDesc = `Learn how to qualify for the ${program.name}. Review funding limits (${program.fundingAmount}), difficulty, deadlines, application steps, and stacking strategies.`;

  return {
    title: displayTitle,
    description: displayDesc,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title: displayTitle,
      description: displayDesc,
      url: canonical,
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${program.name} Funding Guide`,
        },
      ],
    },
  };
}

export default async function ProgramPage({ params, searchParams }: ProgramPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const program = getProgramBySlug(resolvedParams.slug);

  if (!program) {
    notFound();
  }

  return (
    <ProgramClientWrapper program={program} initialSearch={resolvedSearch} />
  );
}
