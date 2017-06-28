const colorArray = [
  'red',
  'blue',
  'green',
  'aqua',
  'yellow',
];

export default class {
  constructor(c,x, y, dx, dy, radius, mouse) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.mouse = mouse;
    this.minRadius = radius;
    this.maxRadius = 40;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw() {
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    this.c.fillStyle = this.color;
    this.c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (this.mouse.x - this.x < 50 && this.mouse.x - this.x > -50 && this.mouse.y - this.y < 50 && this.mouse.y - this.y > -50) {
      if(this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}
