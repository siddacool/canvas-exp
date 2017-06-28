import AnimateCircle from './animate-circle';

export default function () {
  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function loopAnimation() {
    for (let i = 0; i < 800; i++) {
      const radius = Math.random() * 3 + 1;
      const x = Math.random() * (innerWidth - radius * 2) + radius;
      const y = Math.random() * (innerHeight - radius * 2) + radius;
      const dx = (Math.random() - 0.5);
      const dy = (Math.random() - 0.5);

      circleArray.push(new AnimateCircle(c,x, y, dx, dy, radius, mouse));
    }
  }

  let mouse = {
    x: undefined,
    y: undefined,
  };

  addEventListener('mousemove',(event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  addEventListener('resize',() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  });

  let circleArray = [];

  function init(){
    circleArray = [];
    loopAnimation();
  }

  loopAnimation();

  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  }

  animate();
}
