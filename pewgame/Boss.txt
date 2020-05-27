function Boss()
{
  this.x = width;
  this.y = 250;
  this.yVelocity = 0;
  this.rotation = PI/8;
  this.radius = 100;
  this.length = 100;

  this.draw = function()
  {
    this.p1X = this.x - this.radius/2 * cos(this.rotation);
    this.p1Y = this.y - this.radius/2 * sin(this.rotation);
    this.p2X = this.x - this.radius/2 * cos(QUARTER_PI - this.rotation);
    this.p2Y = this.y + this.radius/2 * sin(QUARTER_PI - this.rotation);
    this.p3X = this.p2X - this.length * cos(this.rotation);
    this.p3Y = this.p2Y - this.length * sin(this.rotation);
    this.p4X = this.p3X - (this.p1X - this.p2X);
    this.p4Y = this.p3Y - (this.p1Y - this.p2Y);
    strokeWeight(3);
    stroke(0, 0, 0);

    //body
    ellipse(this.x, this.y, this.radius, this.radius);
    line(this.p1X, this.p1Y, this.p3X, this.p3Y);
    line(this.p3X, this.p3Y, this.p4X, this.p4Y);
    line(this.p4X, this.p4Y, this.p2X, this.p2Y);
  }
}
