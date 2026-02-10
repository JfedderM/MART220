// This project was created by me while learning p5.js. I received guidance explaining concepts, debugging, and logic while building the program

let treatImg; // containers for images
let fairyImg;
let burgerImg;

let fairyX = 300; // position fairy
let fairyY = 200;
let fairySpeedX = 4; // movement fairy
let fairySpeedY = 2;

let burgerX = 300; // position burger
let burgerY = 200;
let burgerSpeedX = 5; // movement burger
let burgerSpeedY = 3;

let titleFont; // container for font

function preload() { // runs before sketch starts
treatImg = loadImage("images/treats.png");
fairyImg = loadImage("images/fairy.png");
burgerImg = loadImage("images/burger.png");
titleFont = loadFont("assets/ChangaOne-Italic.ttf");
}

function setup() {
createCanvas(800, 600);

setInterval(changeBurgerDirection, 6000); // every 6 seconds run the function
}

function draw() {
background(225, 105, 180);

image(treatImg, 0, 0, width, height); // draw images
image(fairyImg, fairyX, fairyY, 200, 200);
image(burgerImg, burgerX, burgerY, 150, 150);

fairyX = fairyX + fairySpeedX; //frame based motion (fairy)
fairyY = fairyY + fairySpeedY;

if (fairyX <= 0 || fairyX >= width - 200) { // bounce off walls
fairySpeedX = fairySpeedX * -1;
}
if (fairyY <= 0 || fairyY >= height - 200) {
fairySpeedY = fairySpeedY * -1;
}

burgerX = burgerX + burgerSpeedX; // burger movement
burgerY = burgerY + burgerSpeedY;

let burgerW = 150; // for edge collision
let burgerH = 150;

if (burgerX <= 0 && burgerSpeedX < 0) { //left wall collision
burgerX = 0;
burgerSpeedX = burgerSpeedX * -1;
} else if (burgerX >= width - burgerW && burgerSpeedX > 0) { // right wall collision
burgerX = width - burgerW;
burgerSpeedX = burgerSpeedX * -1;
}

if (burgerY <= 0 && burgerSpeedY < 0) { // top wall collision
burgerY = 0;
burgerSpeedY = burgerSpeedY * -1;
} else if (burgerY >= height - burgerH && burgerSpeedY > 0) { // bottom wall collision
burgerY = height - burgerH;
burgerSpeedY = burgerSpeedY * -1;
}

fill(255); // title
stroke(0);
strokeWeight(3);
textFont(titleFont);
textSize (50);
text("Fairy VS Fastfood", width-590, height-540);


fill(255); // name
stroke(0);
strokeWeight(3);
textFont(titleFont);
textSize (20);
text("Feather  Magpie", width-160, height-20);

}
function changeBurgerDirection() { // timer behavior 
burgerSpeedX = random(-5, 5);
burgerSpeedY = random(-5, 5);
}
