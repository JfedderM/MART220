function setup()
{
    createCanvas(800,600);
}

function draw()
{
    background(0);


    fill (255, 2, 255)
    rect (340, 490, 120, 120); // neck


    rect (280, 60, 30 ,120);
    rect (480, 60, 30, 120);
    circle (295, 60, 40);
    circle (495, 60, 40);


    fill (255, 2, 255);
    ellipse (400, 300, 400); // head

    fill (0);
    ellipse (310, 290, 150); // left eye
    fill (255);
    ellipse (280, 250, 40);



    fill (0);
    ellipse (490, 290, 150); // right eye
    fill (255);
    ellipse (460, 250, 40);

    strokeWeight (6);
    line (245, 255, 230, 240); // lashes left eye
    line (295, 215, 290, 197);
    line (370, 250, 385, 230);
    line (255, 370, 270, 350);

    line (435, 255, 413, 230); // lashes right eye
    line (499, 215, 505, 196);
    line (550, 250, 565, 230);
    line (545, 370, 529, 350);
    

    fill (255, 0, 0);
    circle (310, 400, 60); // cheek
    fill (255, 0, 0);
    circle (490, 400, 60); // cheek
    
    fill (0);
    circle (400, 430, 40); // mouth

    fill (255, 2, 255);
    circle (400, 770, 500); // body

}
 