// For this assignment I used examples from the lessons and ChatGPT to help debug.
// ChatGPT was used to help with errors, and help me improve game logic.
// The end result is my own work and design decisions

let particles = [];

let music; // background musci
let goodSound; // sound for fresh pizza
let badSound; // sound for rotten pizza

let borders; // canvas boundaries
let obstacles;

let gameOver = false;
let win = false;

let pizzas; // good food
let score = 0; // player svore
let rottenPizzas; // bad food
let health = 5; // player health

let walkLeft = []; // animation frames for walking left
let walkRight = []; // animation frames for walking right
let idleLeft = []; // idle animation left
let idleRight = []; // idle animation right

let player; // chef character

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

class Particle { // particle system for hit efffects
constructor(x, y) {
this.x = x;
this.y = y;
this.vx = random(-1, 1);
this.vy = random(-5, -1);
this.alpha = 255;
}
finished() {
return this.alpha < 0;
}
update() {
this.x += this.vx;
this.y += this.vy;
this.alpha -= 5;
}
show() {
noStroke();
fill(255, this.alpha);
ellipse(this.x, this.y, 10);
}
}

function setup() {
new Canvas(800, 600);

player = new Sprite(200, 200, 50, 50); // chef
player.image = "images/chef1.png";
player.scale = 0.5;
player.rotationLock = true;

player.addAni("idleLeft", idleLeft); // add chef animations
player.addAni("idleRight", idleRight);
player.addAni("walkLeft", walkLeft);
player.addAni("walkRight", walkRight);

player.changeAni("idleRight");
player.ani.frameDelay = 6;

pizzas = new Group(); // group fr fresh pizzas

for (let i = 0; i < 5; i++) {
let p = new Sprite(
random(100, 700),
random(100, 500), 40, 40);
p.image = "images/pizza.png";
p.scale = 0.8;
pizzas.add(p);
}

rottenPizzas = new Group(); // group for rotten pizzas

for (let i = 0; i < 5; i++) {
let r = new Sprite(
random(100, 700),
random(100, 500), 40, 40);
r.image = "images/pizza2.png";
r.scale = 0.8;
r.health = 3;

r.vel.x = random(-3, 3);
r.vel.y = random(-3, 3);

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

borders = new Group(); // group for canvas boundaries

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

if (!gameOver && score === 0 && health === 5) { // instructions
fill(255);
textSize(17);
textAlign(CENTER);
text("Collect the fresh pizzas, avoid the rotten ones and use x to attack!", width / 2, 50)
}

if (score >= 30) { // win condition
gameOver = true;
 win = true;
}

if (health <= 0) { // lose condition
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

if (kb.pressing("x")) { // hit rotten pizzas

for (let i = 0; i < rottenPizzas.length; i++) {
let r = rottenPizzas[i];
let d = dist(player.x, player.y, r.x, r.y);
if (d < 80) {
hitRottenPizza(player, r);
}
}
}

player.overlaps(pizzas, collectPizza); // collect fresh pizzas
player.overlaps(rottenPizzas, hurtPlayer); // rotten pizzas damage health

player.collides(obstacles);
player.collides(borders);

rottenPizzas.collides(borders);

for (let i = 0; i < rottenPizzas.length; i++) { // keeps rotten pizzas moving 
let r = rottenPizzas[i];
if (abs(r.vel.x) < 0.5) {
r.vel.x = random(-3, 3);
}
if (abs(r.vel.y) < 0.5) {
r.vel.y = random(-3, 3);
}
}

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

for (let i = particles.length -1; i >= 0; i--) { // update and remove particles
particles[i].update();
particles[i].show();
if (particles[i].finished()) {
particles.splice(i, 1);
}
}

}

function collectPizza(player, pizza) { // collect fresh pizzas
score++;
goodSound.play();

pizza.x = random(100, 700);
pizza.y = random(100, 500);
}

function hitRottenPizza(player, pizza) { // hit pizzas/pizza respawn
pizza.health--;
badSound.play();

createParticles(pizza.x, pizza.y); // particle effect
if (pizza.health <= 0) {
pizza.health = 3;

pizza.x = random(100, 700);
pizza.y = random(100, 500);
 
pizza.vel.x = random(-3, 3);
pizza.vel.y = random(-3, 3);
}
}

function createParticles(x, y) {
for (let i = 0; i < 5; i++) {
let p = new Particle(x, y);
particles.push(p);
}
}

function hurtPlayer(player, pizza) { // damage player health
health--;
badSound.play();

pizza.x = random(100, 700);
pizza.y = random(100, 500);
}