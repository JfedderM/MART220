// for homework 7 I added movement, collison detection, scoring and a countdown timer.
// I used lesson examples and recieved help with debugging. All code was typed by me.

let score = 0; // score
let timeLeft = 60; // timer
let gameOver = false; // game over flag

let foods = []; // holds all the pizzas

let walkLeft = []; // animation arrays
let walkRight = [];
let idleLeft = [];
let idleRight = [];

let frameIndex = 0; // which picture is showing

let x = 300; // left/right positions
let y = 400; // up/down positions

let facing = "right"; // direction chef is facing

let speed = 3; // movement speed
let isMoving = false; // checks if chef is moving

function preload() { // loads pictures before the sketch starts. Chef wont show up without this section

idleLeft[0] = loadImage("images/chef6.png");

walkLeft[0] = loadImage("images/chef7.png");
walkLeft[1] = loadImage("images/chef8.png");
walkLeft[2] = loadImage("images/chef9.png");
walkLeft[3] = loadImage("images/chef10.png");

idleRight[0] = loadImage("images/chef1.png");

walkRight[0] = loadImage("images/chef2.png");
walkRight[1] = loadImage("images/chef3.png");
walkRight[2] = loadImage("images/chef4.png");
walkRight[3] = loadImage("images/chef5.png");
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

let current; //choose correct animation
if (facing == "right") {
current = isMoving ? walkRight : idleRight;
}else{
current = isMoving ? walkLeft : idleLeft;
}

if (!gameOver && frameCount % 60 == 0) { // countdown timer
timeLeft--;
}
if (timeLeft <= 0) {
gameOver = true;
}

fill(255); // display score and time
textSize(24);
text("SCORE:" + score, 20, 40);
text("TIME:" + timeLeft, 20, 70);

for (let i = 0; i < foods.length; i++) { // food display and collision detection
foods[i].display();
let chefCX = x + 100;
let chefCY = y + 100;

let d = dist(chefCX, chefCY, foods[i].x, foods[i].y);

if (d < 80) {
score ++;

foods[i].x = random(80, width - 80);
foods[i].y = random(80, height - 80);

break;
}
}

if (!gameOver) { // movement and animation

isMoving = false; // reset movement state

if (keyIsDown(LEFT_ARROW)) { // keyboard movement controls
x -= speed; // move left
isMoving = true;
facing = "left"; // face left
}
if (keyIsDown(RIGHT_ARROW)) {
x += speed; // move right
isMoving = true;
facing = "right"; // face right
}
if (keyIsDown(UP_ARROW)) {
y -= speed; // move up
isMoving = true;
}
if (keyIsDown(DOWN_ARROW)) {
y += speed; // move down
isMoving = true;
}

if(frameCount % 10 == 0) { // update animation every 10 frames
frameIndex++;
}

if (frameIndex >= current.length) { // loop animation
frameIndex = 0;
}

x = constrain(x, 0, width - 200); // keep chef on screen
y = constrain(y, 0, height -200);
}

image(current[frameIndex], x, y, 200, 200); // draw chef

if (gameOver) { // game over screen
fill(0, 0, 0);
stroke(255);
textSize(60); 
textAlign(CENTER);
text("GAME OVER!", width / 2, height / 2);
}

}

