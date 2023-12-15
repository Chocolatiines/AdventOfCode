const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');

const steps = input.split(',');

function part1() {
    let sum = 0;
    steps.forEach((step) => {
        let stepValue = 0;

        for (let i = 0; i < step.length; i++) {
            stepValue += step.charCodeAt(i);
            stepValue *= 17;
            stepValue = stepValue % 256;
        }

        sum += stepValue;
    });

    console.log("Résultat partie 1 : " + sum);
}

function part2() {
    let boxes = [];
    let sum = 0;

    for (let i = 0; i <= 255; i++) {
        boxes.push({
            id: i,
            lenses: []
        });
    }

    steps.forEach((step) => {
        let box = 0;
        let label = "";
        label = step.match(/[a-z]+(?=[-=])/g)[0];

        for (let i = 0; i < label.length; i++) {
            box += label.charCodeAt(i);
            box *= 17;
            box = box % 256;
        }

        box = boxes[box];

        if(step.includes('-')) {
            box.lenses = box.lenses.filter(lens => lens.replace(/[^a-zA-Z]/g, '') !== label);
        } else if(step.includes('=')) {
            let found = false;
            for(let i=0; i<box.lenses.length; i++) {
                if(box.lenses[i].replace(/\s\d/g, '') === label) {
                    box.lenses[i] = step.replace('=', ' ');
                    found = true;
                    break;
                }
            }
            if(!found) {
                box.lenses.push(step.replace('=', ' '));
            }

        }
    });

    for(let boxId = 0; boxId<boxes.length; boxId++) {
        for(let lensId = 0; lensId<boxes[boxId].lenses.length; lensId++) {
            sum += ((boxId+1)*(lensId+1)*(boxes[boxId].lenses[lensId].replace(/[a-z]+\s/, '')));
        }
    }

    console.log("Résultat partie 2 : "+sum);

}

part1();
part2();