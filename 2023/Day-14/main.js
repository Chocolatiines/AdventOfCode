const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);

let sum = 0;

for(let x=0; x<lines[0].length; x++) {
    let limit = -1;

    for(let y=0; y<lines.length; y++) {
        if(lines[y][x] === '#') {
            limit = y;
        } else if(lines[y][x] === 'O') {
            let northY = y-1;

            while(northY > limit) {
                northY--;
            }

            limit = northY+1;
            sum += (lines.length - (northY+1));
        }
    }
}

console.log("Réponse partie 1 : "+sum);