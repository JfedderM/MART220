class Food {
constructor(x, y, size, r, g, b, bad) { // postion
this.x = x;
this.y = y;
this.size = size;

this.r = r; // crust and pepperoni color
this.g = g;
this.b = b;

this.bad = bad; // true = rotten pizza, false = good pizza
}

display(){

if (this.bad) {
fill(30, 90, 40); // green crust for rotten pizza
}else{
fill(230, 160, 90); // orange crust for good pizza
}

circle(this.x, this.y, this.size);

fill(200, 50, 50); //sauce
circle(this.x, this.y, this.size * 0.8);

fill(255, 200, 60); // cheese
circle(this.x, this.y, this.size * 0.65);

if (this.bad) {
fill(30, 90, 40); // green pepperoni for rotten pizza
}else{
fill(200, 50, 50); // red pepperoni for good pizza
}

circle(this.x - 15, this.y - 10, this.size * 0.15 ); // draw pepperonis
circle(this.x + 15, this.y + 5, this.size * 0.15 );
circle(this.x - 5, this.y + 18, this.size * 0.15 );

}
}