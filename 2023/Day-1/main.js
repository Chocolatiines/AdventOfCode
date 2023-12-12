const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8')
const lines = input.split(/\r?\n/)


function part1() {
    let sum = 0;
    lines.forEach((line) => {
        const numbers = line.match(/\d+/g);
        try {
            sum += (parseInt(numbers[0].toString().charAt(0) + numbers[numbers.length - 1].toString().charAt(numbers[numbers.length - 1].length-1)));
        } catch (e) {
            // Do nothing
        }
    });
    console.log("La somme finale est de la partie 1 est : " + sum);
}

function part2() {
    let sum = 0;
    const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    lines.forEach((line) => {
        let occurrences = [];
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            const regex = new RegExp(number, 'gi');
            let match;
            while ((match = regex.exec(line)) !== null) {
                occurrences.push({ number, position: match.index });
            }
        }

        occurrences.sort((a, b) => a.position - b.position);
            const firstValue = occurrences[0].number;
            const lastValue = occurrences[occurrences.length - 1].number;

            let firstNumber = isNaN(firstValue) ? stringToInt(firstValue) : firstValue;
            let lastNumber = isNaN(lastValue) ? stringToInt(lastValue) : lastValue;

            sum += parseInt(firstNumber.toString() + lastNumber.toString());

    });
    console.log("La somme finale est de la partie 2 est : " + sum);

}

function stringToInt(number) {
    switch (number) {
        case "one":
            return 1;
            break;
        case "two":
            return 2;
            break;
        case "three":
            return 3;
            break;
        case "four":
            return 4;
            break;
        case "five":
            return 5;
            break;
        case "six":
            return 6;
            break;
        case "seven":
            return 7;
            break;
        case "eight":
            return 8;
            break;
        case "nine":
            return 9;
            break;
    }
}

part1();
part2();