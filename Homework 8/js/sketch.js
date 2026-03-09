// for homework 8 I expanded my project by adding sound, health, and good/rotten pizzas for a clear objective.
// I used lesson examples and used chatgpt to help with debugging. All code was typed by me.

let score = 0; // score
let health = 10; // health
let timeLeft = 60; // timer
let gameOver = false; // game over flag

let foods = []; // holds all the pizzas

let walkLeft = []; // animation arrays for chef
let walkRight = []; 
let idleLeft = [];
let idleRight = [];

let frameIndex = 0; // which picture is showing

let x = 300; // left/right positions
let y = 400; // up/down positions

let facing = "right"; // direction chef is facing

let speed = 3; // movement speed
let isMoving = false; // checks if chef is moving

let music; // background music
let goodSound; // collecting good pizza
let badSound; // collecting rotten pizza

function preload() { // loads pictures and sound before the sketch starts. Chef wont show up without this section

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

music = loadSound("sounds/background.mp3");
goodSound = loadSound("sounds/positive.mp3");
badSound = loadSound("sounds/negative.mp3");
}

function setup() {
createCanvas(800, 600);

foods.push(new Food(150, 150, 80, 230, 160, 60, true)); // 7 rotten pizzas
foods.push(new Food(400, 120, 120, 230, 160, 60, true));
foods.push(new Food(650, 200, 100, 230, 160, 60, true));
foods.push(new Food(250, 400, 140, 230, 160, 60, true));
foods.push(new Food(550, 450, 90, 230, 160, 60, true));
foods.push(new Food(200, 300, 100, 230, 160, 60, true));
foods.push(new Food(600, 350, 110, 230, 160, 60, true));

foods.push(new Food(350, 250, 90, 230, 160, 60, false)); // 3 good pizzas
foods.push(new Food(700, 150, 120, 230, 160, 60, false));
foods.push(new Food(100, 450, 95, 230, 160, 60, false));
}

function draw() {
background(180, 30, 30);

if (!music.isPlaying()){ // starts background music
music.loop();
}

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
if (health <= 0) {
gameOver = true;
}

fill(255); // display score and time
textSize(24);
text("SCORE:" + score, 20, 40);
text("TIME:" + timeLeft, 20, 70);
text("HEALTH:" + health, 20, 100);

for (let i = 0; i < foods.length; i++) { // loop through all pizzas

foods[i].display(); // draw pizza

let chefCX = x + 100; // calculate center of chef for collison dection
let chefCY = y + 100;

let d = dist(chefCX, chefCY, foods[i].x, foods[i].y); // calcutlate distance betwwn chef and pizzas

if (d < 80) { //collison detection

if (foods[i].bad) { // rotten pizza decrease health
health--;
badSound.play();
}else{

score ++; // good pizza increases score
goodSound.play();
}

foods[i].x = random(80, width - 80); // move pizza to random postion
foods[i].y = random(80, height - 80);

break; // stop checking after collison
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

x = constrain(x, 0, width - 200); // keep chef inside canvas
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

