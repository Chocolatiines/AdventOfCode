// Done based on this video https://www.youtube.com/watch?v=g3Ms5e7Jdqo&t=370s&ab_channel=HyperNeutrino

const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);
const cache = {};

function count(cfg, nums) {

    if (cfg === "") {
        return nums.length === 0 ? 1 : 0;
    }

    if (nums.length === 0) {
        return cfg.includes("#") ? 0 : 1;
    }

    const key = JSON.stringify([cfg, nums]);

    if (key in cache) {
        return cache[key];
    }

    let result = 0;

    if (".?".includes(cfg[0])) {
        result += count(cfg.slice(1), nums);
    }

    if ("#?".includes(cfg[0])) {
        if (nums[0] <= cfg.length && !cfg.slice(0, nums[0]).includes(".") && (nums[0] === cfg.length || cfg[nums[0]] !== "#")) {
            result += count(cfg.slice(nums[0] + 1), nums.slice(1));
        }
    }

    cache[key] = result;
    return result;
}

function part1() {
    let sum = 0;

    lines.forEach((line) => {
        let [cfg, numsStr] = line.split(" ");
        let nums = numsStr.split(",").map(Number);
        sum += count(cfg, nums);
    });

    console.log("Résultat partie 1 : " + sum);
}

function part2() {
    let sum = 0;

    lines.forEach((line) => {
        let [cfg, numsStr] = line.split(" ");
        let nums = numsStr.split(",").map(Number);
        cfg = new Array(5).fill(cfg).join("?");
        nums = Array(5).fill(nums).flat();

        sum += count(cfg, nums);
    });
    console.log("Résultat partie 2 : " + sum);
}

part1();
part2();