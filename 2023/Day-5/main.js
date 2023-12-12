const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);
const seeds = lines[0].split(": ")[1].split(" ").map(Number);

const maps = input.split('\n\r');


function part1() {
    maps.forEach((map, index) => {
        if (index != 0) {
            map = map.split(':')[1].trim();

            let triplets = map.split('\n');
            let mapTriplets = [];

            triplets.forEach((triplet) => {
                triplet = triplet.match(/\d+/g).map((x) => parseInt(x, 10));
                let destination = triplet[0], sources = triplet[1], length = triplet[2];
                mapTriplets.push({d: destination, s: sources, l: length});
            });

            seeds.forEach((seed, index) => {
                mapTriplets.every((mapTriplet) => {
                    if ((mapTriplet.s <= seed) && (seed < mapTriplet.s + mapTriplet.l)) {
                        seed = mapTriplet.d + (seed - mapTriplet.s);
                        seeds[index] = seed;
                        return false;
                    }
                    return true;
                });
            });
        }
    });

    console.log("Résultat partie 1 : "+Math.min(...seeds));
}

part1();