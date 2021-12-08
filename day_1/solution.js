const { readLines } = require('../utils');

// Solution to the first problem of the day
const countNumberOfIncreases = (arrayOfNumbers) => {
    let num = 0;
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        if (arrayOfNumbers[i] > arrayOfNumbers[i - 1])
            num++
    }
    return num;
}

// The solution to second problem of the day merely means to map the input array into sums of sliding windows
// and then use the first solution to get the number of increases on the new input array
const mapToSlidingWindowSums = (arrayOfNumbers, windowLength) => {
    return arrayOfNumbers
        .map((_, i) => arrayOfNumbers
            .slice(i, i + windowLength)
            .reduce((a, b) => a + b, 0));
}

function solve() {
    const input = readLines('2.input.txt').map(Number);
    const slidingWindowSums = mapToSlidingWindowSums(input, 3);
    return countNumberOfIncreases(slidingWindowSums);
}

console.log(solve());