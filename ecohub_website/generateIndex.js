// generateIndex.js
const fs = require('fs');
const path = require('path');

// Path to your benchmarks folder
const benchmarksDir = path.join(__dirname, 'public', 'scripts', 'benchmarks');

// Read all JSON files except index.json itself
const jsonFiles = fs.readdirSync(benchmarksDir)
  .filter(file => file.endsWith('.json') && file !== 'index.json');

// Write the index.json file
const indexPath = path.join(benchmarksDir, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify(jsonFiles, null, 2));

console.log(`✅ Successfully generated index.json with ${jsonFiles.length} files.`);
