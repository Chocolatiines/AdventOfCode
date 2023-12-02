// Sum of IDs of games
// 12 red
// 13 green
// 14 blue
const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8')
const lines = input.split(/\r?\n/)

function part1() {
    let sum = 0;

    lines.forEach((line) => {
        let id = line.split(':')[0].split('Game ')[1];
        let gameContent = line.split(': ')[1];
        let sets = gameContent.split(';');
        let isValid = true;

        sets.forEach((set) => {
            set = set.replace(/ /g, "");

            if(set.includes('red')) {
                let red = parseInt(set.match(/[0-9]+red/)[0].split('red')[0]);
                if(red > 12) {
                    isValid = false;
                }
            }
            if(set.includes('green')) {
                let green = parseInt(set.match(/[0-9]+green/)[0].split('green')[0]);
                if(green > 13) {
                    isValid = false;
                }
            }
            if(set.includes('blue')) {
                let blue = parseInt(set.match(/[0-9]+blue/)[0].split('blue')[0]);
                if(blue > 14) {
                    isValid = false;
                }
            }
        });

        if(isValid) {
            sum += parseInt(id);
        }
    });
    console.log("Somme : "+sum);

}
function part2() {
    let sum = 0;

    lines.forEach((line) => {
        let id = line.split(':')[0].split('Game ')[1];
        let gameContent = line.split(': ')[1];
        let sets = gameContent.split(';');
        let red = 0;
        let green = 0;
        let blue = 0;
        sets.forEach((set) => {
            set = set.replace(/ /g, "");

            if(set.includes('red')) {
                let newRed = parseInt(set.match(/[0-9]+red/)[0].split('red')[0]);
                if(newRed > red) {
                    red = newRed;
                }
            }
            if(set.includes('green')) {
                let newGreen = parseInt(set.match(/[0-9]+green/)[0].split('green')[0]);
                if(newGreen > green) {
                    green = newGreen;
                }
            }
            if(set.includes('blue')) {
                let newBlue = parseInt(set.match(/[0-9]+blue/)[0].split('blue')[0]);
                if(newBlue > blue) {
                    blue = newBlue;
                }
            }
        });
        sum += (parseInt(red)*parseInt(green)*parseInt(blue));
    });
    console.log("Somme des produits : "+sum);
}

part1();
part2();