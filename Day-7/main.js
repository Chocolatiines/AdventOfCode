const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);
const order = { A: 1, K: 2, Q: 3, J: 4, T: 5, '9': 6, '8': 7, '7': 8, '6': 9, '5': 10, '4': 11, '3': 12, '2': 13, J: 14 };

function part1() {
    let orderedTypeValue = [];
    let five = [], four = [], full = [], three = [], twoPairs = [], onePair = [], high = [];
    let sum = 0;

    lines.forEach((line) => {
        let occurrences = {};

        for (let i = 0; i < line.split(' ')[0].length; i++) {
            let character = line[i];

            if (occurrences[character]) {
                occurrences[character]++;
            } else {
                occurrences[character] = 1;
            }
        }

        switch (Object.keys(occurrences).length) {
            case 1:
                five.push(line);
                break;
            case 2:
                if (occurrences[Object.keys(occurrences)[0]] == 4 || occurrences[Object.keys(occurrences)[1]] == 4) {
                    four.push(line);
                } else if ((occurrences[Object.keys(occurrences)[0]] == 3 && occurrences[Object.keys(occurrences)[1]] == 2) ||
                    (occurrences[Object.keys(occurrences)[1]] == 3 && occurrences[Object.keys(occurrences)[0]] == 2)) {
                    full.push(line);
                }
                break;
            case 3:
                if (occurrences[Object.keys(occurrences)[0]] == 3 || occurrences[Object.keys(occurrences)[1]] == 3 || occurrences[Object.keys(occurrences)[2]] == 3) {
                    three.push(line);
                } else {
                    twoPairs.push(line);
                }
                break;
            case 4:
                onePair.push(line);
                break;
            case 5:
                high.push(line);
                break;
            default :
                break;
        }

    });

    five = five.sort((a, b) => mySort(a, b));
    four = four.sort((a, b) => mySort(a, b));
    full = full.sort((a, b) => mySort(a, b));
    three = three.sort((a, b) => mySort(a, b));
    twoPairs = twoPairs.sort((a, b) => mySort(a, b));
    onePair = onePair.sort((a, b) => mySort(a, b));
    high = high.sort((a, b) => mySort(a, b));

    orderedTypeValue = orderedTypeValue.concat(high, onePair, twoPairs, three, full, four, five);

    orderedTypeValue.forEach((line, index) => {
        let value = parseInt(line.split(' ')[1]);
        sum += value * (index + 1);
    });

    console.log("Résultat première partie : " + sum);
}

function part2() {
    let orderedTypeValue = [];
    let five = [], four = [], full = [], three = [], twoPairs = [], onePair = [], high = [];
    let sum = 0;

    lines.forEach((line) => {
        let occurrences = {};

        for (let i = 0; i < line.split(' ')[0].length; i++) {
            let character = line[i];

            if (occurrences[character]) {
                occurrences[character]++;
            } else {
                occurrences[character] = 1;
            }
        }

        switch (Object.keys(occurrences).length) {
            case 1:
                five.push(line);
                break;
            case 2:
                if (occurrences[Object.keys(occurrences)[0]] == 4 || occurrences[Object.keys(occurrences)[1]] == 4) {
                    if(occurrences['J']) {
                        five.push(line);
                    } else {
                        four.push(line);
                    }
                } else if ((occurrences[Object.keys(occurrences)[0]] == 3 && occurrences[Object.keys(occurrences)[1]] == 2) ||
                    (occurrences[Object.keys(occurrences)[1]] == 3 && occurrences[Object.keys(occurrences)[0]] == 2)) {
                    if(occurrences['J']) {
                        five.push(line);
                    } else {
                        full.push(line);
                    }
                }
                break;
            case 3:
                if (occurrences[Object.keys(occurrences)[0]] == 3 || occurrences[Object.keys(occurrences)[1]] == 3 || occurrences[Object.keys(occurrences)[2]] == 3) {
                    if(occurrences['J']) {
                        four.push(line);
                    } else {
                        three.push(line);
                    }
                } else {
                    if(occurrences['J'] == 1) {
                        full.push(line);
                    } else if(occurrences['J'] == 2) {
                        four.push(line);
                    } else {
                        twoPairs.push(line);
                    }
                }
                break;
            case 4:
                if(occurrences['J']) {
                    three.push(line);
                } else {
                    onePair.push(line);
                }
                break;
            case 5:
                if(occurrences['J']) {
                    onePair.push(line);
                } else {
                    high.push(line);
                }
                break;
            default :
                break;
        }

    });

    five = five.sort((a, b) => mySort(a, b));
    four = four.sort((a, b) => mySort(a, b));
    full = full.sort((a, b) => mySort(a, b));
    three = three.sort((a, b) => mySort(a, b));
    twoPairs = twoPairs.sort((a, b) => mySort(a, b));
    onePair = onePair.sort((a, b) => mySort(a, b));
    high = high.sort((a, b) => mySort(a, b));

    orderedTypeValue = orderedTypeValue.concat(high, onePair, twoPairs, three, full, four, five);

    orderedTypeValue.forEach((line, index) => {
        let value = parseInt(line.split(' ')[1]);
        sum += value * (index + 1);
    });

    console.log("Résultat deuxième partie : " + sum);
}

function mySort(a, b) {
    for (let i = 0; i < 5; i++) {
        const orderA = order[a[i]];
        const orderB = order[b[i]];

        if (orderA !== orderB) {
            return orderB - orderA;
        }
    }
}

part1();
part2();