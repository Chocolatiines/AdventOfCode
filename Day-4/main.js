const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);

function part1() {
    let sum = 0;

    lines.forEach((line) => {

        let same = countSame(line);
        if (same != 0) {
            sum += Math.pow(2, same - 1);
        }
    });

    console.log("Résultat partie 1 : " + sum);
}

function part2() {
    let sum = 0;

    let quantity = new Array(lines.length + 1).fill(1);
    quantity[0] = 0;

    lines.forEach((line, index) => {
        index++;
        let same = countSame(line);

        for (let n = 1; n <= same; n++) {
            for (let i = 1; i <= quantity[index]; i++) {
                quantity[index + n]++;
            }
        }

    });

    for (let j = 0; j < quantity.length; j++) {
        sum += quantity[j];
    }

    console.log("Résultat partie 2 : " + sum);
}

function countSame(line) {
    let winningLine = line.split(':')[1].split('|')[0];
    let winningNumbers = winningLine.match(/\d+/g);
    winningNumbers.sort(function (a, b) {
        return a - b
    });

    let ticketLine = line.split(':')[1].split('|')[1];
    let ticketNumbers = ticketLine.match(/\d+/g);
    ticketNumbers.sort(function (a, b) {
        return a - b
    });

    return parseInt((winningNumbers.filter(number => ticketNumbers.includes(number))).length);
}

part1();
part2();