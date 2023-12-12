const fs = require("fs");

const input = fs.readFileSync('input.txt', 'UTF-8');
const lines = input.split(/\r?\n/);
const size = lines.length;

let pixels = [];
let sForm = '';

function part1() {
    let x, y;
    let steps = 0;
    let finish = false;
    let origine, char;

    outerBlock: {
        for (x = 0; x < lines[0].length; x++) {
            for (y = 0; y < lines.length; y++) {
                if (lines[y][x] === 'S') {
                    break outerBlock;
                }
            }
        }
    }

    let north = (lines[y - 1] !== undefined) ? lines[y - 1][x] : '.';
    let east = (lines[y][x + 1] !== undefined) ? lines[y][x + 1] : '.';
    let south = (lines[y + 1] !== undefined) ? lines[y + 1][x] : '.';
    let west = (lines[y][x - 1] !== undefined) ? lines[y][x - 1] : '.';


    if ((south == 'L' || south == 'J' || south == '|') && (north == '7' || north == 'F' || north == '|')) {
        // If |
        y++;
        origine = 'N';
        sForm = '│';
    } else if ((west == 'L' || west == 'F' || west == '-') && (east == '7' || east == 'J' || east == '-')) {
        // If -
        x++;
        origine = 'W';
        sForm = '─';
    } else if ((north == '7' || north == 'F' || north == '|') && (east == '7' || east == 'J' || east == '-')) {
        // If L
        y--;
        origine = 'S';
        sForm = '└';
    } else if ((north == '7' || north == 'F' || north == '|') && (west == 'L' || west == 'F' || west == '-')) {
        // If J
        x--;
        origine = 'E';
        sForm = '┘';
    } else if ((south == 'L' || south == 'J' || south == '|') && (west == 'L' || west == 'F' || west == '-')) {
        // If 7
        y++;
        origine = 'N';
        sForm = '┐';
    } else if ((south == 'L' || south == 'J' || south == '|') && (east == '7' || east == 'J' || east == '-')) {
        // If F
        x++;
        origine = 'W';
        sForm = '┌';
    }

    pixels.push([x, y]);
    char = lines[y][x];

    while (!finish) {
        switch (char) {
            case '|':
                if (origine == 'N') {
                    // Go South
                    y++;
                } else if (origine == 'S') {
                    // Go North
                    y--;
                }
                break;

            case '-':
                if (origine == 'E') {
                    // Go West
                    x--;
                } else if (origine == 'W') {
                    // Go East
                    x++;
                }
                break;

            case 'L':
                if (origine == 'E') {
                    // Go North
                    y--;
                    origine = 'S';
                } else if (origine == 'N') {
                    // Go East
                    x++;
                    origine = 'W';
                }
                break;

            case 'J':
                if (origine == 'W') {
                    // Go North
                    y--;
                    origine = 'S';
                } else if (origine == 'N') {
                    // Go West
                    x--;
                    origine = 'E';
                }
                break;

            case '7':
                if (origine == 'W') {
                    // Go South
                    y++;
                    origine = 'N';
                } else if (origine == 'S') {
                    // Go West
                    x--;
                    origine = 'E';
                }
                break;

            case 'F':
                if (origine == 'E') {
                    // Go South
                    y++;
                    origine = 'N';
                } else if (origine == 'S') {
                    // Go East
                    x++;
                    origine = 'W';
                }
                break;

            case 'S':
                finish = true;
                break;

            default:
                break;
        }

        if(!finish) {
            pixels.push([x, y]);
        }
        char = lines[y][x];
        steps++;
    }

    console.log("Résultat partie 1 : " + steps / 2);
}

function writeSchema() {

    fs.writeFile("output.txt", "", (err) => {});

    let newLines = [];
    for(let y=0; y<size; y++) {
        let line = "";
        for(let x=0; x<lines[0].length; x++) {
            if(pixels.some(item => item[0] === x && item[1] === y)) {
                switch(lines[y][x]) {
                    case '-':
                        line = line.concat('─');
                        break;
                    case '|':
                        line = line.concat('│');
                        break;
                    case '7':
                        line = line.concat('┐');
                        break;
                    case 'F':
                        line = line.concat('┌');
                        break;
                    case 'J':
                        line = line.concat('┘');
                        break;
                    case 'L':
                        line = line.concat('└');
                        break;
                    case 'S':
                        line = line.concat(sForm);
                        break;
                }
            } else {
                line = line.concat('.');
            }
        }
        line = line.concat("\n");
        newLines.push(line);
    }

    newLines.forEach((line) => fs.appendFileSync('output.txt', line, (err) => {}));
}


function part2() {
    let sum = 0;

    const input = fs.readFileSync('output.txt', 'UTF-8');
    const lines = input.split(/\r?\n/);

    lines.forEach((line, index) => {
        let open = false;
        for(let i =0; i<line.length; i++) {
            if(line[i] == '│' || line[i] == '┐' || line[i] == '┌') {
                open = !open;
            } else if(line[i] == '.') {
                if(open) {
                    sum++;
                }
            }
        }
    });

    console.log("Résultat partie 2 : "+sum);
}

part1();
writeSchema();
part2();