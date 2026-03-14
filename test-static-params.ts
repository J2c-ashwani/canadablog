import { generateStaticParams } from './app/blog/[slug]/page';

async function run() {
  console.log("Running generateStaticParams() from app/blog/[slug]/page.tsx...");
  try {
    const params = await generateStaticParams();
    console.log(`Returned ${params.length} params.`);
    const invalidParams = params.filter(p => p === undefined || typeof p !== 'object' || !('slug' in p) || p.slug === undefined);
    if (invalidParams.length > 0) {
      console.error("Found invalid params in generateStaticParams:", invalidParams);
    } else {
      console.log("All params are valid objects with a defined slug.");
    }
  } catch (e) {
    console.error("Error executing generateStaticParams:", e);
  }
}

run();
