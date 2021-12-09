const {
    readLines,
    strToNumber,
    isEmpty,
    arraySum
} = require('../utils');

/**
 * returns an object of shape { boards, draw }
 * boards - an array of objects of shape {grid, won} where grid is a 5x5 matrix of numbers and won is boolean
 * draw - an array of numbers
 */
const readInputFile = path => {
    const lines = readLines(path);
    const draw = lines[0].split(',').map(strToNumber);
    const numberLines = lines
        .slice(2)
        .filter(s => s.length > 0)
        .map(s => s.trim()
            .split(' ')
            .filter(a => !isEmpty(a))
            .map(strToNumber));

    const boards = [];
    while (numberLines.length > 0) {
        boards.push(numberLines.splice(0, 5))
    }
    return { boards, draw };
}

const isWinningArray = (a) => isEmpty(a.filter(n => n !== null));
const hasWinningRow = (board) => board.map(isWinningArray).find(Boolean) !== undefined;
const hasWinningColumn = (board) => {
    for (let column = 0; column < board[0].length; column++) {
        const col = board.map(row => row[column]);
        if (isWinningArray(col)) {
            return true;
        }
    }
    return false;
}
const makeMove = (board, drawnNumber) => board.map(row => row.map(n => n == drawnNumber ? null : n));
const calculateBoardScore = ({board, lastNum}) =>
    arraySum(board.map(arraySum)) * lastNum;

// First puzzle of the day
const findFirstWinningBoard = ({ boards, draw }) => {
    for (let n of draw) {
        for (let i = 0; i < boards.length; i++) {
            boards[i] = makeMove(boards[i], n);
            if (hasWinningRow(boards[i]) || hasWinningColumn(boards[i])) {
                return { board: boards[i], lastNum: n };
            }
        }
    }
    return null;
}

// Second puzzle of the day
const findLastWinningBoard = ({ boards, draw }) => {
    let lastWinner = null;
    let lastWinningNumber = null;
    for (let n of draw) {
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].won) continue;
            boards[i] = makeMove(boards[i], n);
            if (hasWinningRow(boards[i]) || hasWinningColumn(boards[i])) {
                boards[i].won = true;
                lastWinner = boards[i];
                lastWinningNumber = n;
            }
        }
    }

    return { board: lastWinner, lastNum: lastWinningNumber };
}

const inputFileName = process.argv[2];
const inputFilePath = `${__dirname}/${inputFileName}`;
const input = readInputFile(inputFilePath);
const firstWinningBoard = findFirstWinningBoard(input);
const lastWinningBoard = findLastWinningBoard(input);
console.log("first winning board score is", calculateBoardScore(firstWinningBoard));
console.log("last winning board score is", calculateBoardScore(lastWinningBoard));
