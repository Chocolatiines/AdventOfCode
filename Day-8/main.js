const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);
let steps = lines[0];
let stepsCpt = 0;

function getStep() {
    if (!steps[stepsCpt]) {
        steps += steps;
    }
    let step = steps[stepsCpt];
    stepsCpt++;

    return step;
}

function part1() {
    let final = false;
    let letters = "AAA";
    let sum = 0, current;

    while (!final) {
        // Trouver la ligne
        lines.forEach((line, index) => {
            if (line.split(" =")[0] == letters) {
                current = index;
            }
        });

        // Trouver les lettres suivantes
        if (getStep() == "R") {
            letters = lines[current].split(')')[0].split(", ")[1];
        } else {
            letters = lines[current].split('(')[1].split(",")[0];
        }
        sum++;

        if (letters == "ZZZ") {
            final = true;
        }
    }

    console.log("Résultat partie 1 : " + sum);
}

function part2() {
    let sum = 0;

    let linesToWatch = [];

    let cycles = [];

    lines.forEach((line) => {
        if (line[2] == 'A') {
            linesToWatch.push(line.split(" =")[0]);
        }
    });

    linesToWatch.forEach((lineToWatch, index) => {
        let sum = 0;
        let final = false;
        while (!final) {
            // Trouver la ligne
            lines.every((line, index) => {
                if (line.split(" =")[0] == lineToWatch) {
                    if (getStep() == "R") {
                        lineToWatch = line.split(')')[0].split(", ")[1];
                    } else {
                        lineToWatch = line.split('(')[1].split(",")[0];
                    }
                    return false;
                }
                return true;
            });
            sum++;
            if(lineToWatch[2] == 'Z') {
                final = true;
                cycles.push(sum);
                steps = lines[0];
            }
        }
    });

    function pgcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    function ppcm(a, b) {
        return (a * b) / pgcd(a, b);
    }

    function ppcmMultiple(numbers) {
        let result = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            result = ppcm(result, numbers[i]);
        }
        return result;
    }


    console.log("Résultat partie 2 : " + ppcmMultiple(cycles));
}

part1();
part2();