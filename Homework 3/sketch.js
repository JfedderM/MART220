var colorState = 0; // keeps track of what color the alien is

var faceState = 0; // keeps track of what face is being used

var highlightX = 0;
var highlightY = 0;
var highlightTimer = 0; // movement timer

function setup() {
createCanvas(800,600);
}

function draw() {
background(0);

if (colorState === 0 || colorState === 2) { //wiggles highlights
highlightTimer++;
if (highlightTimer > 16) {
highlightX = random(-10, 10);
highlightY = random(-10, 10);
highlightTimer = 0;
}
} else {
highlightX = 0;
highlightY = 0;
highlightTimer = 0;
}

stroke (255);
strokeWeight (6);

if (colorState === 0) {
fill (255, 2, 255); // magenta starting color
} else if (colorState === 1) {
fill (162, 61, 250); // purple
} else if (colorState === 2) {
fill (250, 174, 234); // pink
} else if (colorState === 3) {
fill (138, 43, 226); // violet
}

rect (340, 490, 120, 120); // neck


rect (280, 60, 30 ,120);// antenna
rect (480, 60, 30, 120);
circle (295, 60, 40);
circle (495, 60, 40);

ellipse (400, 300, 400); // head

circle (400, 770, 500); // body

textSize (20);
text("CLICK HERE", width-460, height-30); // click here

fill (0);
ellipse (310, 290, 150); // left eye
fill (255);
ellipse (280 + highlightX, 250 + highlightY, 40); // left highlight

if (faceState === 2) {
arc (490, 290, 120, 50, PI, TWO_PI); // wink
line (435, 275, 420, 260); // lashes right eye wink
line (499, 270, 505, 240);
line (550, 280, 565, 260);
line (545, 305, 529, 290);
} else {
fill (0);
ellipse (490, 290, 150); // right eye normal
fill (255);
ellipse (460 + highlightX, 250 + highlightY, 40); // right highlight

line(435, 250, 413, 230); // lashes right eye normal
line(499, 215, 505, 196);
line(550, 250, 565, 230);
line(545, 370, 529, 350);
}

strokeWeight (6);
line (245, 255, 230, 240); // lashes left eye
line (295, 215, 290, 197);
line (370, 250, 385, 230);
line (255, 370, 270, 350);

fill (255, 0, 0);
circle (310, 400, 60); // cheek
fill (255, 0, 0);
circle (490, 400, 60); // cheek

if (faceState === 0) {
fill (0);
circle(400, 430, 40); // surprised
} else if (faceState === 1) {
noFill ();
stroke (255);
strokeWeight (6);
arc (400, 430, 80, 50, 0, PI); // smile
} else if (faceState === 2) {
fill ('red');
circle (400, 430, 70); // pucker
stroke (0);
line (365, 430, 435, 430);
} else if (faceState === 3) {
fill (255);
stroke (0);
ellipse (400, 430, 110, 70); // awkward smile
stroke (0); // teeth
line (345, 430, 450, 430); //horizontal
line (375, 400, 375, 460);
line (400, 395, 400, 465);
line (425, 400, 425, 460);
}

textSize (15);
text("Feather Magpie", width-140, height-20); // name

textSize (30);
text("MOOD ALIEN", width-770, height-540); // tite
}
 
function mouseClicked() { // click to change color and face
colorState++;
faceState++;
if (colorState > 3) {
colorState = 0;
}
if (faceState > 3) {
faceState = 0;
}
}