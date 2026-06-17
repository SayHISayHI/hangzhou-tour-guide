import fs from 'fs';
import path from 'path';

// Note: data.js uses ES6 exports `export const data = ...`
// So we will parse it instead of require() to avoid module setup issues,
// or we can just import it if we are in an ES module, but let's just parse the content for robustness.
// Wait, we can dynamically import it or transpile.
// Let's just read the file and use a simple regex or Function constructor since it's a simple export const data = { ... };

const filePath = path.resolve('../src/data.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Strip the `export const data = ` part to make it parseable as JSON (almost).
// Actually, since it's a JS object, let's just evaluate it.
fileContent = fileContent.replace('export const data =', 'const data =');
fileContent += '\nreturn data;';

let data;
try {
  data = new Function(fileContent)();
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

let totalPois = 0;
let errors = [];

for (const [key, section] of Object.entries(data)) {
  if (Array.isArray(section.pois)) {
    section.pois.forEach((poi, index) => {
      totalPois++;
      const fields = ['history', 'tip', 'legend'];
      fields.forEach(field => {
        if (!poi[field] || typeof poi[field] !== 'string' || poi[field].trim() === '') {
          errors.push(`POI ${poi.id || index} in section ${key} is missing or has empty field: ${field}`);
        }
      });
    });
  }
}

console.log(`Total POIs found: ${totalPois}`);

if (totalPois < 20) {
  errors.push(`Not enough POIs. Expected at least 20, found ${totalPois}`);
}

if (errors.length > 0) {
  console.error("FAIL: Validation errors found:");
  errors.forEach(e => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("PASS: Data verification successful!");
  process.exit(0);
}
