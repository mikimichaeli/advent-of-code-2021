const fs = require('fs');

const readLines = (filePath) => fs.readFileSync(filePath, { encoding: 'utf-8', flag: 'r' }).split('\n');
const strToNumber = s => Number(s.trim());
const isEmpty = (s) => s.length === 0;
const arraySum = (array) => array.reduce((a, b) => (a || 0) + (b || 0), 0);

module.exports = {
    readLines,
    strToNumber,
    isEmpty,
    arraySum
};