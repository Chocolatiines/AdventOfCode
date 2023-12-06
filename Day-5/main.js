const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);

const maps = input.split('\n\r');

function part1() {
    const seeds = maps[0].match(/\d+/g).map((x) => parseInt(x, 10));
    console.log("Partie 1 : " + findLocation(seeds));
}

function part2() {
    let seedsOne = [];
    let seedsTwo = [];
    let finalLocations = [];
    const numbers = maps[0].match(/\d+/g).map((x) => parseInt(x, 10));
    numbers.forEach((number, index) => {
        if(index%2 == 1) {
            seedsOne.push(numbers[index-1]);
            seedsOne.push(numbers[index-1]+number)
            finalLocations.push(findLocation(seedsOne));
        }
    });

    console.log("Partie 2 : " + Math.min(...finalLocations));
}

function findLocation(seeds) {
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

    seeds.sort(function(a, b){return a - b});
    return seeds[0];
}

part1();
part2();

