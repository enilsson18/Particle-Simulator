var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const fps = 60;

var particles;

setup();
var mainLoop;

function setup(){
  particles = [];

  var size = 2;
  for (var y = 0; y < size; y++){
    for (var x = 0; x < size; x++) {
      particles.push(new particle(x * (canvas.width / size) + 30, y * (canvas.height / size) + 30, 30));
    }
  }
  particles[0].addForce(new force(new vector(0.1,0), "hard"));

  //console.log(particles);

  //console.log(particles);
  mainLoop = setInterval(main, 1000/fps);
}

function main(){
  //math
  physics(particles);

  console.log(particles[0].getAngle()*(180/Math.PI));
  //drawing
  ctx.fillStyle = "#fff";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  drawParticles(particles);
}

function physics(particles){
  for (var i = 0; i < particles.length; i++){
    particles[i].update(1000/fps);
  }

  particles = collisionCheck(particles, canvas.width, canvas.height);
}

function drawParticles(particles){
  for (var i = 0; i < particles.length; i++){
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}