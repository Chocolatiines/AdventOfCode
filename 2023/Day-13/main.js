const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const blocks = input.split(/\r\r/);
let sum = 0;

blocks.forEach((block, bindex) => {
    let lines = block.split('\r');
    let row = 0, col = 0;

    // Check rows
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == lines[i + 1]) {
            let cpt = 1;
            let valid = true;
            while (lines[i - cpt] && lines[i + 1 + cpt] && valid) {
                if (lines[i - cpt] != lines[i + cpt + 1]) {
                    valid = false;
                }
                cpt++;
            }
            row = valid ? i+1 : 0;
        }
        if(row != 0) {
            break;
        }
    }

    if(row == 0) {
        // Check cols
        for(let i = 0; i < lines[0].length; i++) {
            if(lines[0][i] == lines[0][i+1]) {
                let cpt = 1;
                let valid = true;
                let tempCol = 0;

                while((i-cpt >= 0) && ((cpt+i+1) < lines[0].length) && valid) {
                    if(lines[0][i-cpt] != lines[0][i+cpt+1]) {
                        valid = false;
                    }
                    cpt++;
                }

                if(valid) {
                    tempCol = i;
                }

                if(valid) {
                    let allLines = lines.every((line) => {
                        let cptTemp = 0;
                        while ((i-cptTemp) >= 0 && (i + cptTemp + 1) < line.length && valid) {
                            if (line[i - cptTemp] != line[i + cptTemp + 1]) {
                                return false;
                            }
                            cptTemp++;
                        }
                        if(valid) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    if (allLines) {
                        col = tempCol + 1;
                    }
                }
            }
            if(col != 0) {

                break;
            }
        }
    }

    if(col != 0) {
        sum += col;
    }
    if(row != 0) {
        sum += 100*row;
    }
});

console.log("Résultat partie 1 : "+sum);


