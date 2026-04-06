
let pg;

function setup() {
createCanvas(800, 600, WEBGL);

pg = createGraphics(300, 100);

}

function draw() {
background(200);

ambientLight(150);

push(); // cube left
normalMaterial();
translate(-200, 0, 0); // move cube position left
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
box(100);
pop();

push(); // sphere middle
ambientMaterial(255, 0, 0);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
sphere(50);
pop();

push(); // cone bottom
normalMaterial();
translate(0, 150, 0);
rotateX(frameCount * 0.01);
rotateZ(frameCount * 0.01);
cone(50, 100);
pop();

push(); // cylinder top
ambientMaterial(0, 0, 255);
translate(0, -150, 0);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.01);
cylinder(40, 100);
pop();

push(); // torus top right
specularMaterial(255, 200, 0);
translate(200, -150, 0);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.02);
torus(60, 20);
pop();

pg.clear();
pg.fill(0);
pg.textAlign(CENTER, CENTER);

pg.textSize(24);
pg.text("Geometry in Space", 150, 30);

pg.textSize(20);
pg.text("Feather", 150, 70);

push();
translate(0, 250, 0);
noStroke();
texture(pg);
plane(300, 100);
pop();

}


