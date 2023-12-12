const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');

const blocks = input.split('\r\n\r\n');
let sums = [];

blocks.forEach((block) => {
    let values = block.split('\r\n');
    let sum = 0;
    for (let value of values) {
        sum += parseInt(value);
    }
    sums.push(sum);
});

sums.sort((a, b) => {
    return b - a
});

console.log("Résultat partie 1 : " + sums[0]);
console.log("Résultat partie 2 : " + parseInt(sums[0] + sums[1] + sums[2]));