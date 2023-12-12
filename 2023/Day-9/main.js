const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);

function part1() {
    let sum = 0;
    lines.forEach((line) => {
        let numbers = line.split(' ').map(Number);

        while (!numbers.every(n => n === 0)) {
            let tempArray = [];

            numbers.forEach((number, index) => {
                if (numbers[index + 1] != undefined) {
                    tempArray.push(numbers[index + 1] - number);
                } else {
                    sum += number;
                }
            });
            numbers = tempArray;
        }
    });

    console.log("Résultat partie 1 : " + sum);
}

function part2() {
    let sum = 0;
    lines.forEach((line) => {
        let numbers = line.split(' ').map(Number);

        while (!numbers.every(n => n === 0)) {
            let tempArray = [];

            numbers.forEach((number, index) => {
                if (numbers[index + 1] != undefined) {
                    tempArray.push(numbers[index + 1] - number);
                } else {
                    if(index%2 == 0) {
                        sum += numbers[0];
                    } else {
                        sum -= numbers[0];
                    }
                }
            });
            numbers = tempArray;
        }
    });

    console.log("Résultat partie 2 : " + sum);

}

part1();
part2();