import fs from 'fs';
import path from 'path';

// read the data.js file
const dataFilePath = path.resolve('./src/data.js');

try {
  const content = fs.readFileSync(dataFilePath, 'utf-8');
  // Since data.js has `export const data = ...`, we can parse it by stripping the export
  const jsonStr = content.replace('export const data = ', '').replace(/;\\s*$/, '');
  
  // It's technically JS, not JSON, so we can use eval or Function to parse it
  const data = new Function('return ' + jsonStr)();
  
  let totalPois = 0;
  let allFieldsValid = true;
  let charCountValid = true;
  let missingFields = [];
  let insufficientCharPois = [];

  for (const categoryId in data) {
    const category = data[categoryId];
    const pois = category.pois || [];
    totalPois += pois.length;

    pois.forEach((poi, index) => {
      const requiredFields = ['history', 'features', 'legend', 'tip'];
      let combinedText = '';

      requiredFields.forEach(field => {
        if (!poi[field] || typeof poi[field] !== 'string' || poi[field].trim() === '') {
          allFieldsValid = false;
          missingFields.push(`Category ${categoryId}, POI at index ${index} (${poi.id}) is missing or has empty field: ${field}`);
        } else {
          combinedText += poi[field];
        }
      });

      const chineseChars = combinedText.match(/[\u4e00-\u9fa5]/g) || [];
      if (chineseChars.length < 400) {
        charCountValid = false;
        insufficientCharPois.push(`Category ${categoryId}, POI at index ${index} (${poi.id}) has only ${chineseChars.length} Chinese characters (needs 400).`);
      }
    });
  }

  console.log(`Total POIs found: ${totalPois}`);
  if (totalPois < 30) {
    console.log("FAIL: Less than 30 POIs.");
    process.exit(1);
  }

  if (!allFieldsValid) {
    console.log("FAIL: Some POIs are missing required text fields (history, features, legend, tip).");
    console.log(missingFields.join('\n'));
    process.exit(1);
  }

  if (!charCountValid) {
    console.log("FAIL: Some POIs do not meet the 400 Chinese character requirement.");
    console.log(insufficientCharPois.join('\n'));
    process.exit(1);
  }

  console.log("PASS: 30+ POIs found and all required fields are populated with 400+ Chinese characters.");
  process.exit(0);

} catch (e) {
  console.error("FAIL: Error parsing or verifying data.js", e);
  process.exit(1);
}
