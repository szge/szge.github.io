function GarbageBullet()
{
  this.length = 10;
  this.direction = PI;
  this.x = -5;
  this.y = 0;
  this.speed = 5;
  this.size = 5;
  this.draw = function()
  {
    strokeWeight(3);
    stroke(0, 0, 0);
    //linear bullet
    //line(this.x, this.y, this.x + this.length * sin(this.direction), this.y + this.length * cos(this.direction));
    //circular bullet
    //ellipse(this.x, this.y, this.size, this.size);
    rect(this.x-20, this.y-10, 40, 20);
    this.x += this.speed * sin(this.direction);
    this.y += this.speed * cos(this.direction);
  }
}
