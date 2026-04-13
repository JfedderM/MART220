// I used examples from the lessons and ChatGPT to help with debugging.

let pg; // text display

let shapes = []; // shape positions

let textures = [];

let myModel; // 3D model

function preload() { // load model
myModel = loadModel('../assets/model/figure.obj', true);

textures[0] = loadImage('../assets/texture1.jpg');
textures[1] = loadImage('../assets/texture2.jpg');
textures[2] = loadImage('../assets/texture3.jpg');
textures[3] = loadImage('../assets/texture4.jpg');
textures[4] = loadImage('../assets/texture5.jpg');
}

function setup() {
createCanvas(800, 600, WEBGL);

pg = createGraphics(800, 600); // text layer

for (let i = 0; i < 5; i++) { // random positions
shapes.push({
x: random(-200, 200),
y: random(-200, 200),
z: random(-200, 200)
});
}
}

function draw() {
background("#252222");

push(); // model
rotateY(-frameCount * 0.01);
scale(1.5);
rotateX(HALF_PI);
model(myModel);
pop();

for (let i = 0; i < 5; i++) { // shapes
let s = shapes[i];
push();
rotateY(frameCount * 0.01 * (i + 1));
translate(s.x, s.y, s.z);
texture(textures[i]);
box(50);
pop();
}

pg.clear(); // text
pg.fill(255);
pg.textAlign(CENTER, CENTER);

pg.textSize(24);
pg.text("Forces in Motion", 400, 30);

pg.textSize(20);
pg.text("Feather Magpie", 400, 70);

image(pg, -width / 2, -height / 2);
}

function mousePressed() { // clicking mouse moves shapes
for (let i = 0; i < 2; i++) {
shapes[i].x = random(- 200, 200);
shapes[i].y = random(- 200, 200);
shapes[i].z = random(- 200, 200);
}
}