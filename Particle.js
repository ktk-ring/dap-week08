class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.acc = createVector(0, 0);

    this.c = color(0);
    this.w = 10;
  }

  addForce(aForce) {
    this.acc.add(aForce);
  }

  update() {
    this.checkEdge();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  checkEdge() {
    if (this.pos.x < - this.w / 2) {
      this.pos.x = width + this.w / 2;
    }
    if (this.pos.x > width + this.w / 2) {
      this.pos.x = -this.w / 2;
    }
    if (this.pos.y < - this.w / 2) {
      this.pos.y = height + this.w / 2;
    }
    if (this.pos.y > height + this.w / 2) {
      this.pos.y = -this.w / 2;
    }
  }

  show() {
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.w, this.w);
  }
}
