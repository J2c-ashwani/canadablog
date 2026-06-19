import type { Metadata } from 'next';
import ProgramUpdatesClient from './ProgramUpdatesClient';

export const metadata: Metadata = {
  title: 'Program Updates & Database Changelog | FSI Digital',
  description:
    'Track the latest additions and updates to the FSI Digital Canadian funding database. Programs added, deadlines revised, and new incentives tracked weekly.',
  alternates: { canonical: 'https://www.fsidigital.ca/program-updates' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Program Updates & Database Changelog | FSI Digital',
    description:
      'Track the latest additions and updates to the FSI Digital Canadian funding database. Programs added, deadlines revised, and new incentives tracked weekly.',
    url: 'https://www.fsidigital.ca/program-updates',
    type: 'website',
  },
};

export default function ProgramUpdatesPage() {
  return <ProgramUpdatesClient />;
}
