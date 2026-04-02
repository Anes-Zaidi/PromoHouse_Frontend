import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure execution relies on Node 20's strict .env file parser via package.json script execution
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("CRITICAL: Missing Supabase environment variables. Make sure this runs with --env-file=.env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


// To handle supabase pagination issue 
async function fetchAll(table, columns) {
  const PAGE_SIZE = 1000;
  let page = 0;
  let allRows = [];

  while (true) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .range(from, to);

    if (error) throw error;
    if (!data || data.length === 0) break;

    allRows = allRows.concat(data);
    if (data.length < PAGE_SIZE) break; // Last page reached
    page++;
  }

  return allRows;
}

async function main() {
  console.log("Fetching live geographic data from Supabase DB...");

  const countries = await fetchAll('countries', 'id, name');
  const wilayas = await fetchAll('wilayas', 'id, name, country_id');
  const communes = await fetchAll('communes', 'id, name, wilaya_id');

  console.log(`Success! Synchronized ${countries.length} countries, ${wilayas.length} wilayas, and ${communes.length} communes.`);

  // Transform into indexed maps
  const mapping = {
    countries: countries.map(c => ({ id: c.id, name: c.name })),
    wilayasByCountry: {},
    communesByWilaya: {}
  };

  for (const w of wilayas) {
    if (!mapping.wilayasByCountry[w.country_id]) mapping.wilayasByCountry[w.country_id] = [];
    mapping.wilayasByCountry[w.country_id].push({ id: w.id, name: w.name });
  }

  for (const c of communes) {
    if (!mapping.communesByWilaya[c.wilaya_id]) mapping.communesByWilaya[c.wilaya_id] = [];
    mapping.communesByWilaya[c.wilaya_id].push({ id: c.id, name: c.name });
  }

  //  Dump file directly into a static /data directory for bundle inclusion
  const rootDir = path.join(__dirname, '..');
  const targetDir = path.join(rootDir, 'data');
  
  // Ensure the directory exists
  try {
    await fs.access(targetDir);
  } catch (e) {
    await fs.mkdir(targetDir);
  }

  const targetPath = path.join(targetDir, 'locations.json');
  await fs.writeFile(targetPath, JSON.stringify(mapping, null, 2));

  console.log(`Successfully generated highly optimized static mapping at ${targetPath}`);
}

main().catch(e => {
  console.error("Critical Mapping Error:", e);
  process.exit(1);
});
