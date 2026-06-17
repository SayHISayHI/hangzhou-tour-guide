import fs from 'fs';
import path from 'path';

// read the three patches
const p1 = JSON.parse(fs.readFileSync('updates_westlake_1.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('updates_westlake_2.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('updates_lingyin.json', 'utf8'));

const allUpdates = { ...p1, ...p2, ...p3 };

// Read original data.js
const dataFilePath = path.resolve('./src/data.js');
let content = fs.readFileSync(dataFilePath, 'utf-8');

// The file has `export const data = { ... }`
const jsonStr = content.replace('export const data = ', '').replace(/;\\s*$/, '');
const data = new Function('return ' + jsonStr)();

// apply updates
for (const categoryId in data) {
  const pois = data[categoryId].pois;
  for (let i = 0; i < pois.length; i++) {
    const poi = pois[i];
    const update = allUpdates[poi.id];
    if (update) {
      poi.features = update.features;
      poi.history = update.history;
      poi.legend = update.legend;
      poi.tip = update.tip;
    }
  }
}

// write back
const newDataStr = `export const data = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataFilePath, newDataStr, 'utf8');

console.log('Update complete.');
