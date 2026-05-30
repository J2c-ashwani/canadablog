import { getAllPseoPages } from '../lib/pseo-data';

const pages = getAllPseoPages();
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fsidigital.ca';

const published = pages
    .filter(p => p.isPublished)
    .map(p => `${baseUrl}/grants/${p.provinceSlug}/${p.citySlug}/${p.industrySlug}`);

console.log(JSON.stringify(published));
