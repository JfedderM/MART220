// For this project i used examples from the lessons. I really struggled with the sequence of my walk images so i recived help with my preload section. the work is mine and all code was typed by me.
let foods = []; // holds all the pizzas

let walk = []; // walking pictures
let idle = []; // standing pictures

let frameIndex = 0; // which picture is showing

let x = 0; // left/right positions
let y = 400; // up/down potions

let isMoving = true; // tells is chef is walking or stopped

function preload() { // loads pictures before the sketch starts. Chef wont show up without this section

idle[1] = loadImage("images/chef5.png");
idle[0] = loadImage("images/chef1.png");

walk[0] = loadImage("images/chef1.png");
walk[1] = loadImage("images/chef2.png");
walk[2] = loadImage("images/chef3.png");
walk[3] = loadImage("images/chef4.png");
}

function setup() {
createCanvas(800, 600);

foods.push(new Food(150, 150, 80, random(225), random(225), random(225))); // makes 5 pizzas with different colors and sizes
foods.push(new Food(400, 120, 120, random(225), random(225), random(225)));
foods.push(new Food(650, 200, 100, random(225), random(225), random(225)));
foods.push(new Food(250, 400, 140, random(225), random(225), random(225)));
foods.push(new Food(550, 450, 90, random(225), random(225), random(225)));
}


function draw() {
background(180, 30, 30);

for(let i=0; i<foods.length; i++){ // draw all pizzas in array
foods[i].display();
}

if (isMoving) { // move chef to the right while walkng
x = x + 2;
}

if (x > width - 200) { // stop by edge of screen
isMoving = false;
frameIndex = 0;
}

if (frameCount % 10 == 0) { // slowly changes animation picture
frameIndex++;

if (isMoving && frameIndex >= walk.length) { // loop waling animation
frameIndex = 0;
}
if (!isMoving && frameIndex >= idle.length) { // loop idle animation
frameIndex = 0;
}
}

if (isMoving) { // show walking or idle animation
image(walk[frameIndex], x, y, 200, 200);
}else{
image(idle[frameIndex], x, y, 200, 200);
}
}
