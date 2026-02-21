let burgerImg; // Holds the burger picture

let baldHead = []; // stores the head pictures
let frameIndex = 0; // which animation picture currently shown
let totalFrames = 5; // total number of animation pictures

let burgerX = []; // X position of the burger
let burgerY = []; // Y position of the burger

function setup() {
createCanvas(800, 600);

for (let i = 0; i < 8; i++) { // makes 8 burgers
burgerX[i] = random(50, width - 50);
burgerY[i] = random(50, height - 50); // gives each burger a random postion
}
}

function draw() {
background(180, 255, 180);

for (let i = 0; i < 8; i++) { // draws all burgers
image(burgerImg, burgerX[i], burgerY[i], 100, 100);
}

image(baldHead[frameIndex], width/2 - 300, height - 300, 450, 450); // shows current head animation picture

if (frameCount % 8== 0) { // controls animation speed
frameIndex++;
if (frameIndex >= totalFrames) {
frameIndex = 0; // restart animation
}
}
}

function preload() { // loads pictrues before sketch starts
burgerImg = loadImage("images/burger.png"); //loads burger image

baldHead[0] = loadImage("images/head1.png");
baldHead[1] = loadImage("images/head2.png");
baldHead[2] = loadImage("images/head3.png");
baldHead[3] = loadImage("images/head4.png");
baldHead[4] = loadImage("images/head5.png"); // loads animation images into the array
}