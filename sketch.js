let ballA, ballB, ballC;

function setup() {
  createCanvas(400, 400);
  textSize(18);
  textAlign(CENTER, CENTER);
  strokeWeight(5);
  ballA = new Particle(random(width), random(height));
  ballB = new Particle(random(width), random(height));
  ballC = new Particle(random(width), random(height));
}

function draw() {
  background(225, 35);

  let wind = createVector((mouseX-width/2) / 5000, (mouseY-height/2) / 5000);
  ballA.addForce(wind);
  ballB.addForce(wind);
  ballC.addForce(wind);
  
  let center = createVector(width/2, height/2)
  let arrow = createVector(mouseX-width/2, mouseY-height/2);
  arrow.div(2);
  fill('blue');
  drawArrow(center, arrow.limit(100), 'blue');
  text("바람의 방향", width/2, height/2+18);
  
  ballA.update();
  ballA.show();
  ballB.update();
  ballB.show();
  ballC.update();
  ballC.show();
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}