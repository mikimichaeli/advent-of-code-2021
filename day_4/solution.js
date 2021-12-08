const {
    readLines,
    strToNumber,
    isEmptyString,
    arraySum
} = require('../utils');

// returns an array of boards in which each board is a 5x5 grid
const readInputFile = path => {
    const lines = readLines(path);
    const draw = lines[0].split(',').map(strToNumber);
    const numberLines = lines
        .slice(2)
        .filter(s => s.length > 0)
        .map(s => s.trim()
            .split(' ')
            .filter(isEmptyString)
            .map(strToNumber));

    const boards = [];
    while (numberLines.length > 0) {
        boards.push(numberLines.splice(0, 5))
    }
    return { boards, draw };
}

function findAndMarkReturningLocation(board, num) {
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[0].length; column++) {
            if (board[row][column] === num) {
                board[row][column] = null;
                return { row, column };
            }
        }
    }
    return null;
}

function isWinningLocation(board, { row, column }) {
    const isRowMarked = board[row].filter(Boolean).length === 0;
    if (isRowMarked) return true;
    for (let i = 0; i < board.length; i++) {
        if (board[i][column]) {
            return false;
        }
    }
    return true;
}

const calculateBoardScore = (board, lastDrawnNumber) => arraySum(board.map(arraySum)) * lastDrawnNumber;

function findFirstWinningBoard({ boards, draw }) {
    for (let n of draw) {
        for (let b of boards) {
            const location = findAndMarkReturningLocation(b, n);
            if (location && isWinningLocation(b, location)) {
                return calculateBoardScore(b, n);
            }
        }
    }
}

console.log(findFirstWinningBoard(readInputFile('input.txt')));