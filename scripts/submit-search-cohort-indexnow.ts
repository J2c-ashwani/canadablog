import { readFileSync } from 'node:fs';
import { SEARCH_DISTRIBUTION_COHORT_PATHS } from '../lib/seo/searchDistributionRollout';

const HOST = 'www.fsidigital.ca';
const ORIGIN = `https://${HOST}`;
const KEY = '9f2d760a190decd61c5ea57bab9f5d7b';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const localKey = readFileSync(`public/${KEY}.txt`, 'utf8').trim();
  if (localKey !== KEY) throw new Error('IndexNow ownership key file does not match the submission key.');

  const keyResponse = await fetch(KEY_LOCATION, { cache: 'no-store' });
  const deployedKey = (await keyResponse.text()).trim();
  if (!keyResponse.ok || deployedKey !== KEY) {
    throw new Error(`Deployed IndexNow ownership key is unavailable (HTTP ${keyResponse.status}).`);
  }

  const urlList = SEARCH_DISTRIBUTION_COHORT_PATHS.map((path) => `${ORIGIN}${path}`);
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  const responseText = await response.text();
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow rejected the cohort (HTTP ${response.status}): ${responseText.slice(0, 300)}`);
  }

  console.log(JSON.stringify({
    accepted: true,
    status: response.status,
    submittedUrls: urlList.length,
    rolloutScope: 'seo-cohort-v1-only',
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
