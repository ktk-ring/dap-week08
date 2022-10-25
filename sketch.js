let mover;

let plateX = 400;
let plateY = 100;

function setup() {
  createCanvas(960, 540);
  fill(50);
  strokeWeight(2);
  mover = new Mover(width / 2, height / 2, 1);
}

function draw() {
  background(240, 25);
  stroke(255);

  let gravity = createVector(0, 0.098);

  let weight = p5.Vector.mult(gravity, mover.mass);

  mover.applyForce(weight);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0.1);
    mover.applyForce(wind);
  }

  mv1 = createVector(mouseX - plateX / 2, mouseY - plateY / 2);
  fill(50);
  rect(1, height - mouseY + plateY / 2, width - 1, -plateY);
  fill(200);
  rect(
    mouseX - plateX / 4,
    height - mouseY - plateY / 2,
    plateX / 2,
    -plateY * 8
  );

  mv2 = createVector(mouseX - plateX / 2, height - mouseY + plateY / 2);
  fill(50);
  rect(1, mouseY - plateY / 2, width - 1, plateY);
  fill(200);
  rect(mouseX - plateX / 4, mouseY + plateY / 2, plateX / 2, plateY * 8);

  mover.update();
  mover.plate(mv1, mv2);
  mover.edges();
  mover.display();
}

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 25;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  plate(down, top) {
    if (this.pos.y <= top.y + this.r && this.vel.y <=0) {
      this.pos.y = top.y + this.r;
      this.vel.y *= 1;
    }
    if (this.pos.y >= down.y - this.r && this.vel.y > 0) {
      this.pos.y = down.y - this.r;
      this.vel.y *= -1;
    }
  }

  edges() {
    if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }

    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -0.9;
    }
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
