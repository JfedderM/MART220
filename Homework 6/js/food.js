class Food {
constructor(x, y, size, r, g, b) { // postion
this.x = x;
this.y = y;
this.size = size;

this.r = r; // crust and pepperoni color
this.g = g;
this.b = b;
}

display(){
fill(this.r, this.g, this.b); // crust
circle(this.x, this.y, this.size);

fill(200, 50, 50); //sauce
circle(this.x, this.y, this.size * 0.8);

fill(255, 230, 120); // cheese
circle(this.x, this.y, this.size * 0.65);

fill(this.r, this.g, this.b); // pepperonis
circle(this.x - 15, this.y - 10, this.size * 0.15 );
circle(this.x + 15, this.y + 5, this.size * 0.15 );
circle(this.x - 5, this.y + 18, this.size * 0.15 );
}
}