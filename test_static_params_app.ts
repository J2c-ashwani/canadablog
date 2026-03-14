import { generateStaticParams } from './app/blog/[slug]/page';

async function test() {
  try {
    const params = await generateStaticParams();
    console.log("Total params length:", params.length);
    for (let i = 0; i < params.length; i++) {
       if (!params[i]) {
          console.log("Found Falsy Param at index:", i, params[i]);
       } else if (typeof params[i].slug !== 'string') {
          console.log("Found Invalid slug at index:", i, params[i]);
       }
    }
  } catch(e) {
    console.error("Test failed:", e);
  }
}

test();
