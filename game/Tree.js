function Tree()
{
  this.x = 400;
  this.y = 400;
  this.scale = 1;
  this.draw = function()
  {
    strokeWeight(3 * this.scale);
    stroke(0, 0, 0);
    fill(51, 25, 0);
    rect(this.x - 5 * this.scale, this.y - 25 * this.scale, 10 * this.scale, 25 * this.scale);
    fill(0, 55, 0);
    triangle(this.x - 20 * this.scale, this.y - 20 * this.scale, this.x + 20 * this.scale, this.y - 20 * this.scale, this.x, this.y - 60 * this.scale);
    triangle(this.x - 20 * this.scale, this.y - 40 * this.scale, this.x + 20 * this.scale, this.y - 40 * this.scale, this.x, this.y - 80 * this.scale);

  }
}
