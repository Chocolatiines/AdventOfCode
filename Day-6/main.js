const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);

let races = lines[0].match(/\d+/g);


function part1() {
    const times = lines[0].match(/\d+/g).map((x) => parseInt(x, 10));
    const distances = lines[1].match(/\d+/g).map((x) => parseInt(x, 10));

    let productTotal = 1;

    races.forEach((race, index) => {
        let ways = 0;
        for(let time=0; time<times[index]; time++) {
            let distance = time*(times[index]-time);
            if(distance > distances[index]) {
                ways++;
            }
        }
        productTotal*=ways;
    });

    console.log("Résultat partie 1 : "+productTotal);
}

function part2() {
    const time = lines[0].split(':')[1].replaceAll(' ', '');
    const distance = lines[1].split(':')[1].replaceAll(' ', '');

    let ways = 0;
    for(let windingTime=0; windingTime<time; windingTime++) {
        let floatDistance = windingTime*(time-windingTime);
        if(floatDistance > distance) {
            ways++;
        }

    }

    console.log("Résultat partie 2 : "+ways);
}

part1();
part2();