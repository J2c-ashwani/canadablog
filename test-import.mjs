import { grantsDatabase } from './lib/grants-data.ts';
console.log('Grants count:', grantsDatabase?.length);
console.log('First grant:', grantsDatabase?.[0]?.name);
