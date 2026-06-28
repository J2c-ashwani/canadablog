import fs from 'fs';
import path from 'path';

const METADATA_PATH = path.join(__dirname, '../lib/data/blogMetadata.json');
const CONTENT_DIR = path.join(__dirname, '../lib/data/blog-content');
const targetSlug = 'canadian-government-funding-report-2026';

async function removeBlogReport() {
  console.log('🔄 Cleaning up blog version of the report...');

  try {
    if (!fs.existsSync(METADATA_PATH)) {
      throw new Error(`Metadata file not found at: ${METADATA_PATH}`);
    }

    const fileContent = fs.readFileSync(METADATA_PATH, 'utf8');
    const data = JSON.parse(fileContent);

    // Filter out metadata
    const originalLength = data.metadata.length;
    data.metadata = data.metadata.filter((p: any) => p.slug !== targetSlug);
    
    if (data.metadata.length < originalLength) {
      console.log('✅ Removed report metadata entry from blogMetadata.json');
    }

    // Delete slugToPath mapping
    if (data.slugToPath[targetSlug]) {
      delete data.slugToPath[targetSlug];
      console.log('✅ Removed slugToPath mapping');
    }

    // Write back metadata
    fs.writeFileSync(METADATA_PATH, JSON.stringify(data, null, 2), 'utf8');

    // Delete JSON file
    const contentFilePath = path.join(CONTENT_DIR, `${targetSlug}.json`);
    if (fs.existsSync(contentFilePath)) {
      fs.unlinkSync(contentFilePath);
      console.log(`✅ Deleted file: ${contentFilePath}`);
    }

    console.log('🎉 Cleanup complete!');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Error during cleanup:', err);
    process.exit(1);
  }
}

removeBlogReport();
