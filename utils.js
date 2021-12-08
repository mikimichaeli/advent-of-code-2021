const fs = require('fs');

const readLines = (filePath) => fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' }).split('\n');

module.exports = { readLines };