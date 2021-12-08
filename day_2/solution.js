const { readLines } = require('../utils');

const MOVES_SOLUTION_1 = {
    forward: ({ horizontalPosition, depth }, amount) => ({horizontalPosition: horizontalPosition + amount, depth}),
    up: ({ horizontalPosition, depth }, amount) => ({horizontalPosition, depth: depth - amount}),
    down: ({ horizontalPosition, depth }, amount) => ({horizontalPosition, depth: depth + amount}),
}

const MOVES_SOLUTION_2 = {
    forward: ({ horizontalPosition, depth, aim }, amount) => ({horizontalPosition: horizontalPosition + amount, aim, depth: depth + (aim * amount)}),
    up: ({ horizontalPosition, depth, aim }, amount) => ({horizontalPosition, depth, aim: aim - amount}),
    down: ({ horizontalPosition, depth, aim }, amount) => ({horizontalPosition, depth, aim: aim + amount}),
}

const parseInputFile = (filePath) => {
    return readLines(filePath)
        .map(line => line.split(' '))
        .map(([direction, amount]) => [direction, Number(amount)]);
}

const calculateAxisPositions = (actionsList, solutionNumber) => {
    let position = {
        horizontalPosition: 0,
        depth: 0,
        aim: 0
    };
    const solutionsList = solutionNumber == 1 ? MOVES_SOLUTION_1 : MOVES_SOLUTION_2; 
    for (let [direction, amount] of actionsList) {
        position = solutionsList[direction](position, amount)
    }

    return position;
}

function solve(solutionNumber) {
    const inputFiles = {
        '1': 'input.txt',
        '2': 'input.txt',
        'test': 'testinput.txt'
    }
    const inputFilePath = inputFiles[solutionNumber] || inputFiles['test'];
    const actionsList = parseInputFile(inputFilePath);
    const { horizontalPosition, depth } = calculateAxisPositions(actionsList, Number(solutionNumber) || 1);
    return horizontalPosition * depth;

}

console.log("The solution is", solve(Number(process.argv[2])));