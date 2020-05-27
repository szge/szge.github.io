var div;
var fps = 144;
var player;
var mouseTracker;
var mousePos = {x: 0, y: 0};
var mouseDown = false;
var screenWidth = 900;
var screenHeight = 500;
var soundShot = [];
var soundReload;
var frameCounter = 0;
var health = 100;
var healthbar;
var ammo = 200;
var ammobar;
var reloadDelayFrame = 0;

function startGame(id) {
  player = new playerComponent(30, 30, "blue", 10, 120);
  mouseTracker = new mouseComponent();
  myGameArea.start(id);
  var i;
  for(i = 0; i < 18; i++) {
    soundShot[i] = new sound("shot.mp3");
  }
  soundReload = new sound("reload.mp3");
  healthbar = new healthbarComponent();
  ammobar = new ammobarComponent();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function(id) {
    this.keys = [];
    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.cursor = "none";
    div = document.getElementById(id);
    div.appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, (1000/fps));
    window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    })
    window.addEventListener('mousemove', function (e) {
      mousePos = getMousePos(this.canvas, e);
    })
    window.addEventListener('mousedown', function (e) {
      mouseDown = true;
    })
    window.addEventListener('mouseup', function (e) {
      mouseDown = false;
      if(ammo == 0 && frameCounter > reloadDelayFrame + 20) {
        reloadDelayFrame = frameCounter;
        ammo = 200;
        soundReload.play();
      }
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function playerComponent(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function(){
    context = myGameArea.context;
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

function mouseComponent() {
  this.update = function(){
    context = myGameArea.context;
    context.beginPath();
    context.lineWidth = 1;
    context.arc(mousePos.x, mousePos.y, 3, 0, 2 * Math.PI);
    context.stroke();
  }
}

function healthbarComponent() {
  this.width = player.width;
  this.height = 5;
  this.update = function(){
    this.startX = (player.x + player.width / 2) - this.width / 2;
    this.startY = (player.y) - this.height - 5;

    context = myGameArea.context;
    context.fillStyle = "white";
    context.fillRect(this.startX, this.startY, this.width, this.height);

    context.fillStyle = "red";
    if(health <= 0) {
      context.fillRect(this.startX, this.startY, 0, this.height);
    } else {
      context.fillRect(this.startX, this.startY, this.width * (health / 100), this.height);
    }
  }
}

function ammobarComponent() {
  this.width = player.width;
  this.height = 5;
  this.update = function(){
    this.startX = healthbar.startX;
    this.startY = healthbar.startY - this.height;

    context = myGameArea.context;
    context.fillStyle = "white";
    context.fillRect(this.startX, this.startY, this.width, this.height);

    context.fillStyle = "gold";
    context.fillRect(this.startX, this.startY, this.width * (ammo / 200), this.height);
  }
}

function getMousePos(canvas, evt) {
  var rect = myGameArea.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function shootBasic() {
  if(mouseDown && ammo > 0 && frameCounter > reloadDelayFrame + 144) {
    ammo--;
    this.startX = player.x + player.width / 2;
    this.startY = player.y + player.height / 2;

    // add inaccuracy
    inaccuracy = 50;
    targetX = mousePos.x + inaccuracy * (Math.random() - 0.5);
    targetY = mousePos.y + inaccuracy * (Math.random() - 0.5);

    // make sure that the line is always at least the maximum length of the screen
    maxLength = Math.hypot(screenWidth, screenHeight);

    angle = Math.atan2(targetY - this.startY, targetX - this.startX);

    finalX = this.startX + maxLength * Math.cos(angle);
    finalY = this.startY + maxLength * Math.sin(angle);

    // draw path
    context = myGameArea.context;
    context.beginPath();
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.moveTo(this.startX, this.startY);
    context.lineTo(finalX, finalY);
    context.stroke();

    // play shooting sounds
    var i;
    for(i = 0; i < soundShot.length; i++) {
      if(frameCounter % 144 == Math.floor(144 / soundShot.length * i)) {
          soundShot[i].play();
      }
    }
  }
}

function reload() {
  if (frameCounter > reloadDelayFrame + 144) {
    reloadDelayFrame = frameCounter;
    ammo = 200;
    soundReload.play();
  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  div.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function updateGameArea() {
  frameCounter += 1;
  myGameArea.clear();
  // always update mouse movement first for responsiveness
  mouseTracker.update();
  shootBasic();
  if (myGameArea.keys["W".charCodeAt(0)]) {if(player.y > 0) player.y -= 2;}
  if (myGameArea.keys["A".charCodeAt(0)]) {if(player.x > 0) player.x -= 2;}
  if (myGameArea.keys["S".charCodeAt(0)]) {if(player.y + player.height < screenHeight) player.y += 2;}
  if (myGameArea.keys["D".charCodeAt(0)]) {if(player.x + player.width < screenWidth) player.x += 2;}
  if (myGameArea.keys["R".charCodeAt(0)]) {reload()}
  player.update();
  healthbar.update();
  ammobar.update();
}
