var fps;
var player1;
var ground = false;
var leg1Toggle;
var animTimer = 0;
var playerBullet;
var bossBullet;
var playerYVelocity;
var boss;
var playerHP = 100;
var bossHP = 500;
let trees = [];

function setup()
{
  frameRate(60);
  createCanvas(1300, 600);
  player1 = new Player();
  playerBullet = new Bullet();
  playerBullet.size = 10;
  playerBullet.speed = 15;
  bossBullet = new GarbageBullet();
  bossBullet.size = 15;
  bossBullet.speed = 15;
  boss = new Boss();
  for(var i = 0; i < 13; i++)
  {
    trees[i] = new Tree();
    trees[i].y = 500;
    trees[i].scale = 1;
  }
  trees[1].scale = 1;
  trees[1].x = 50;
  trees[0].scale = 0.7;
  trees[0].x = 65;
  trees[4].scale = 1.2;
  trees[4].x = 202;
  trees[3].scale = 0.6;
  trees[3].x = 225;
  trees[3].y = 497;
  trees[2].scale = 0.75;
  trees[2].x = 255;
  trees[2].y = 497;
  trees[5].x = 450;
  trees[5].y = 510;
  trees[6].x = 724;
  trees[7].scale = 1.2;
  trees[7].x = 1018;
  trees[8].x = 1040;
  trees[9].scale = 0.9;
  trees[9].x = 1234;
  trees[10].scale = 3;
  trees[10].x = 100;
  trees[10].y = height;
  trees[11].scale = 3.5;
  trees[11].x = 550;
  trees[11].y = height;
  trees[12].scale = 2;
  trees[12].x = width;
  trees[12].y = height;
}

function draw()
{
  //draw background
  background(102, 102, 255);

  //draw mountains + water
  fill(100, 100, 100);
  triangle(-200, height-100, 200, 50, 600, height-100);
  triangle(250, height-100, 650, 150, 1050, height-100);
  fill(0, 255, 255);
  quad(275, height-100, 393, 374, 447, 327, 350, height-100);
  quad(326, 191, 393, 374, 423, 348, 342, 209);
  fill(245, 240, 250);
  quad(650, 150, 575, 216, 666, 178, 721, 213);
  triangle(200, 50, 119, 140, 245, 101);

  //fps display
  if(frameCount % 10 == 0)
  {
    fps = frameRate();
    playerYVelocity = player1.yVelocity;
  }
  textAlign(RIGHT);
  textSize(10);
  strokeWeight(2);
  text("FPS: " + parseInt(fps), width - 25, 75);
  /*text("PlayerPos: " + player1.x + ", " + player1.y, width - 25, 50);
  text("PlayerBulletPos: " + parseInt(playerBullet.x) + ", " + parseInt(playerBullet.y), width - 25, 80);
  text("BossBulletPos: " + parseInt(bossBullet.x) + ", " + parseInt(bossBullet.y), width - 25, 110);
  text("MousePos: " + mouseX + ", " + mouseY, width - 25, 140);
  text("BossRotation: " + boss.rotation, width - 25, 170);*/

  //ground
  strokeWeight(10);
  fill(102, 51, 0);
  rect(-5, height - 100, width + 10, 100);

  //pond
  strokeWeight(2);
  fill(0, 255, 255);
  quad(366, 497, 359, 518, 263, 541, 200, 497);

  //trees
  for(var i = 0; i < 10; i++)
  {
    trees[i].draw();
  }
  stroke(0, 0, 0);

  strokeWeight(10);

  //player physics
  if(player1.y >= 480 && !ground && !keyIsDown(DOWN_ARROW))
  {
    ground = false;
    player1.yVelocity = 0;
  }
  else
  {
    if(!keyIsDown(DOWN_ARROW))
    {
      player1.yVelocity += 0.5;
    }
    else
    {
      player1.y += 1;
    }
  }

  if(player1.y > height - 50)
  {
    player1.y = height - 50;
  }

  //boss physics
  if(keyIsDown(87))
  {
    if(boss.y > 0)
    {
      boss.y -= 2;
    }
  }
  if(keyIsDown(83))
  {
    if(boss.y < height)
    {
      boss.y += 2;
    }
  }
  if(keyIsDown(65))
  {
    if(boss.rotation > PI/8 - PI/4)
    {
      boss.rotation -= PI/120;
    }
  }
  if(keyIsDown(68))
  {
    if(boss.rotation < PI/8 + PI/4)
    {
      boss.rotation += PI/120;
    }
  }

  //update player animations
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW))
  {
    animTimer++;
    if(animTimer % 30 < 15)
    {
      player1.leg1Rotation -= QUARTER_PI/10;
      player1.knee1Rotation -= QUARTER_PI/10;
      player1.leg2Rotation += QUARTER_PI/10;
      player1.knee2Rotation += QUARTER_PI/10;
    }
    else
    {
      player1.leg1Rotation += QUARTER_PI/10;
      player1.knee1Rotation += QUARTER_PI/10;
      player1.leg2Rotation -= QUARTER_PI/10;
      player1.knee2Rotation -= QUARTER_PI/10;
    }
  }

  //hit detection
  if(playerBullet.x > width - playerBullet.speed && playerBullet.x < width && playerBullet.y > boss.y - boss.radius/2 && playerBullet.y < boss.y + boss.radius/2)
  {
    bossHP -= 50;
  }

  if(bossBullet.x > player1.x - 17 && bossBullet.x < player1.x && bossBullet.y > player1.y - 100 && bossBullet.y < player1.y + 25)
  {
    playerHP -= 25;
  }

  //draw health bars
  fill(102, 102, 255);
  rect(5, 5, width/2-5, 50);
  rect(width - 5, 5,-width/2+10, 50);
  fill(255, 0, 0);
  stroke(255, 0, 0);
  rect(15, 15, (playerHP/100)*(width/2-25), 30);
  rect(width-15, 15, -(bossHP/500)*(width/2-30), 30);


  //draw player models
  fill(0, 50, 255);
  stroke(0);
  player1.draw();
  fill(0, 255, 255);
  playerBullet.draw();
  fill(128, 128, 0);
  bossBullet.draw();
  boss.draw();

  //draw foreground trees
  trees[10].draw();
  trees[11].draw();
  trees[12].draw();

  if(bossHP <= 0)
  {
    background(100, 200, 55);
    fill(200, 100, 55);
    textSize(25);
    text("yay", width/2, height/2);
    textSize(15);
    text("press r to reset", width/2, height-100);
  }
  else if(playerHP <= 0)
  {
    background(200, 100, 55);
    fill(100, 200, 55);
    textSize(25);
    text("womp womp", width/2, height/2);
    textSize(15);
    text("press r to reset", width/2, height-100);
  }
}

function keyPressed()
{
  if(keyIsDown(UP_ARROW))
  {
    if(player1.y >= 480)
    {
      player1.y = 470;
      player1.yVelocity = -10;
    }
    else if(player1.y < height - 50)
    {
      player1.y -= 5;
    }
  }
  else if(keyIsDown(LEFT_ARROW))
  {
    player1.xVelocity = -5;
    animTimer = 0;
    player1.leg1Rotation = QUARTER_PI;
    player1.leg2Rotation = -QUARTER_PI/2;
    player1.knee1Rotation = 0;
    player1.knee2Rotation = -QUARTER_PI;
  }
  else if(keyIsDown(RIGHT_ARROW))
  {
    player1.xVelocity = 5;
    animTimer = 0;
    player1.leg1Rotation = QUARTER_PI;
    player1.leg2Rotation = -QUARTER_PI/2;
    player1.knee1Rotation = 0;
    player1.knee2Rotation = -QUARTER_PI;
  }
  else if(keyIsDown(DOWN_ARROW))
  {
    player1.y -= 5;
  }
  if(keyIsDown(32))
  {
    //boss shooting
    if(bossBullet.x <= 0 || bossBullet.y <= 0 || bossBullet.y >= height)
    {
      bossBullet.x = boss.x;
      bossBullet.y = boss.y;
      bossBullet.direction = -boss.rotation - QUARTER_PI*3/2;
    }
  }
  else if(keyIsDown(82))
  {
    //reset
    playerHP = 100;
    bossHP = 500;
    player1.x = 100;
    player1.y = 250;
    boss.y = 250;
  }
}

function keyReleased()
{
  if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || keyCode == DOWN_ARROW)
  {
    player1.xVelocity = 0;
  }
}

function mousePressed()
{
  if(playerBullet.x >= width || playerBullet.y <= 0 || playerBullet.y >= height)
  {
    playerBullet.x = player1.handX;
    playerBullet.y = player1.handY;
    playerBullet.direction = -player1.armAngle + HALF_PI;
  }
}
