/*
@title: Retro_Tatooine
@author: Mahit-Marri
@snapshot: Retro_Tatooine
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);
let startPoint = [0, 40];
let endPoint = [30, 0];

let allLines = [];

function drawLine(start, end) {
    allLines.push([start, end]);
    drawLines([[start, end]]);
}

for (let i = 0; i < 20; i++) {
    drawLine(startPoint, endPoint);
    startPoint[1] -= 2;
    endPoint[0] += 5;  
}

function drawLinesRightToLeft() {
    let startPoint = [125, 40];
    let endPoint = [95, 0];
    for (let i = 0; i < 20; i++) {
        drawLine(startPoint, endPoint);
        startPoint[1] -= 2; 
        endPoint[0] -= 5;  
    }
}
drawLinesRightToLeft();

function makeSun(x, y, radius){
    const turtle = new bt.Turtle();
    turtle.jump([x, y - radius]);
    turtle.down();
    turtle.arc(360, radius);
    drawLines(turtle.lines());
}

let sun1Size = bt.randInRange(25,10);
let sun2Size = bt.randInRange(40,10);
let sun1 = {x: 100, y: 100, radius: sun1Size};
let sun2 = {x: 50, y: 60, radius: sun2Size};
makeSun(sun1.x, sun1.y, sun1Size);
makeSun(sun2.x, sun2.y, sun2Size);

function isInsideCircle(px, py, circle) {
    const dx = px - circle.x;
    const dy = py - circle.y;
    return (dx * dx + dy * dy) <= (circle.radius * circle.radius);
}

function isNearLine(px, py, line, threshold = 8) {
    const [[x1, y1], [x2, y2]] = line;
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    
    if (len_sq !== 0) param = dot / len_sq;
    
    let xx, yy;
    
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < threshold;
}

const numStars = bt.randInRange(60, 104);
for (let i = 0; i < numStars; i++) {
    const x = bt.randInRange(5, width-5);
    const y = bt.randInRange(45, height-5); 
    
    if (!isInsideCircle(x, y, sun1) && 
        !isInsideCircle(x, y, sun2) && 
        !allLines.some(line => isNearLine(x, y, line))) {
        makeSun(x, y, 0.5); 
    }
}
