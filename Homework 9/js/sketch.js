// for this assignment i used examples from the lessons, chatgpt to help debug and understsand p5.play better
// the final game refects my own work and design choices.

let music; // background musci
let goodSound; // sound for fresh pizza
let badSound; // sound for rotten pizza

let borders;

let gameOver = false;
let win = false;

let obstacles;

let pizzas;
let score = 0;
let rottenPizzas;
let health = 3;

let walkLeft = [];
let walkRight = [];
let idleLeft = [];
let idleRight = [];

let player;

function preload() { // load the chefs animation
idleLeft[0] = "images/chef6.png";

walkLeft[0] = "images/chef7.png";
walkLeft[1] = "images/chef8.png";
walkLeft[2] = "images/chef9.png";
walkLeft[3] = "images/chef10.png";

idleRight[0] = "images/chef1.png";

walkRight[0] = "images/chef2.png";
walkRight[1] = "images/chef3.png";
walkRight[2] = "images/chef4.png";
walkRight[3] = "images/chef5.png";

music = loadSound("sounds/background.mp3"); // load music and sound effects
goodSound = loadSound("sounds/positive.mp3");
badSound = loadSound("sounds/negative.mp3");
}


function setup() {
new Canvas(800, 600);

player = new Sprite(200, 200, 50, 50); // chef (the player)
player.image = "images/chef1.png";
player.rotationLock = true;

player.addAni("idleLeft", idleLeft); // add chef animations
player.addAni("idleRight", idleRight);
player.addAni("walkLeft", walkLeft);
player.addAni("walkRight", walkRight);

player.changeAni("idleRight");
player.ani.frameDelay = 6;

pizzas = new Group(); // make fresh pizzas

for (let i = 0; i < 4; i++) {
let p = new Sprite(
random(100, 700),
random(100, 500), 40, 40);
p.image = "images/pizza.png";
p.scale = 0.8;
pizzas.add(p);
}

rottenPizzas = new Group(); // make rotten pizzas

for (let i = 0; i < 5; i++) {
let r = new Sprite(
random(100, 700),
random(100, 500), 40, 40);
r.image = "images/pizza2.png";
r.scale = 0.8;
rottenPizzas.add(r);
}

obstacles = new Group(); // make obstacles

let o1 = new Sprite(200, 180, 180, 20);
o1.color = color(180, 30, 30);
o1.collider = "static";
obstacles.add(o1);

let o2 = new Sprite(600, 180, 180, 20);
o2.color = color(180, 30, 30);
o2.collider = "static";
obstacles.add(o2);

let o3 = new Sprite(200, 420, 180, 20);
o3.color = color(180, 30, 30);
o3.collider = "static";
obstacles.add(o3);

let o4 = new Sprite(600, 420, 180, 20);
o4.color = color(180, 30, 30);
o4.collider = "static";
obstacles.add(o4);

borders = new Group(); // make borders

let topBorder = new Sprite(400, 0, 800, 20);
topBorder.collider = "static";
topBorder.color = "white"
borders.add(topBorder);

let bottomBorder = new Sprite(400, 600, 800, 20);
bottomBorder.collider = "static";
bottomBorder.color = "white"
borders.add(bottomBorder);

let leftBorder = new Sprite(0, 300, 20, 600);
leftBorder.collider = "static";
leftBorder.color = "white"
borders.add(leftBorder);

let rightBorder = new Sprite(800, 300, 20, 600);
rightBorder.collider = "static";
rightBorder.color = "white"
borders.add(rightBorder);

}

function mousePressed() { // background music starts when clicked
if (!music.isPlaying()) {
music.loop();
}
}

function draw() {
background(180, 30, 30);

stroke(0);
strokeWeight(4);
fill(255);

if (!gameOver && score === 0 && health === 3) // instructions
fill(255);
textSize(22);
textAlign(CENTER);
text("Collect the fresh pizzas and avoid the rotten ones!", width / 2, 50)

if (score >= 10) { // win and lose conditions
gameOver = true;
 win = true;
}

if (health <= 0) {
gameOver = true;
win = false;
}

if (!gameOver) { // chef movement and collisions
player.vel.x = 0;
player.vel.y = 0;

if (kb.pressing("left")) {
player.vel.x = -3;
player.changeAni("walkLeft");
}
else if (kb.pressing("right")) { 
player.vel.x = 3;
player.changeAni("walkRight");
}
else if (kb.pressing("up")) { 
player.vel.y = -3;
player.changeAni("walkRight");
}
else if (kb.pressing("down")) {
player.vel.y = 3;
player.changeAni("walkLeft");
} else {
player.changeAni("idleRight");
}

player.overlaps(pizzas, collectPizza);
player.overlaps(rottenPizzas, hitRottenPizza);
player.collides(obstacles);
player.collides(borders);
} else {
player.vel.x = 0;
player.vel.y = 0;
player.changeAni("idleRight");
}

fill(255); // score and health display
textSize(24);
textAlign(LEFT);
text("SCORE:" + score, 20, 40);
text("HEALTH:" + health, 20, 100);

if (gameOver) { // win lose message
fill(255);
textSize(40);
textAlign(CENTER);

if (win) {
text("YOU WIN!", width / 2, height / 2);
} else {
text("GAME OVER!", width / 2, height / 2);
}
}
}

function collectPizza(player, pizza) { // collect fresh pizzas
score++;
goodSound.play();

pizza.x = random(100, 700);
pizza.y = random(100, 500);
}

function hitRottenPizza(player, pizza) { // hit rotten pizzas 
health--
badSound.play();

pizza.x = random(100, 700);
pizza.y = random(100, 500);
}