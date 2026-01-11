import { Metadata } from 'next';
import GetStartedClient from './GetStartedClient';

export const metadata: Metadata = {
    title: "Get Started | FSI Digital - Find Business Grants",
    description: "Start your journey to secure government funding. Access our grant finder, read expert guides, and get customized funding alerts.",
    alternates: {
        canonical: 'https://www.fsidigital.ca/get-started',
    },
    openGraph: {
        title: "Get Started | FSI Digital - Find Business Grants",
        description: "Start your journey to secure government funding. Access our grant finder and expert guides.",
        url: "https://www.fsidigital.ca/get-started",
        type: "website",
    },
};

export default function GetStartedPage() {
    return <GetStartedClient />;
}
