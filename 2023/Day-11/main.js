const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);


let expended = "";
let cols = [], rows = [];

function findDuplicates() {

    let stars = [];

    lines.forEach((line, index) => {
        for (let char in line) {
            if (line[char] == '#' && !stars.includes(parseInt(char))) {
                stars.push(parseInt(char));
            }
        }
    });

    lines.forEach((line, index) => {
        let newLine = "";

        for (let col = 0; col < lines[0].length; col++) {
            if (stars.includes(col)) {
                newLine = newLine.concat(line[col]);
            } else {
                if (!cols.includes(col)) {
                    cols.push(col);
                }
                newLine = newLine.concat(line[col], line[col]);
            }
        }

        expended = expended.concat(newLine, "\n");


        if (!line.match(/\#/)) {
            rows.push(index);
            expended = expended.concat(newLine, "\n");
        }
    });
}

function part(part, value) {
    let starsCoord = [];
    lines.forEach((line, y) => {
        for (let x = 0; x < lines[0].length; x++) {
            if (line[x] == "#") {
                starsCoord.push([x, y]);
            }
        }
    });


    starsCoord.sort(function (a, b) {
        if (a[1] !== b[1]) {
            return a[1] - b[1];
        } else {
            return a[0] - b[0];
        }
    });


    let sum = 0;

    starsCoord.forEach((star, index) => {
        let multiplyCols = cols.reduce(function (count, element) {
            return count + (element < star[0] ? 1 : 0);
        }, 0);
        let multiplyRows = rows.reduce(function (count, element) {
            return count + (element < star[1] ? 1 : 0);
        }, 0);

        starsCoord[index] = [star[0]+(value-1)*multiplyCols, star[1]+(value-1)*multiplyRows];
    });

    starsCoord.forEach((star, index) => {
        let cpt = 1;

        while (starsCoord[index + cpt]) {
            let y = Math.abs(star[1] - starsCoord[index + cpt][1]);
            let x = Math.abs(star[0] - starsCoord[index + cpt][0]);
            sum = sum + x + y;
            cpt++;
        }
    });

    console.log("Résultat partie "+part+" : "+sum);
}

findDuplicates();
part("1", 2);
part("2", 1000000);


