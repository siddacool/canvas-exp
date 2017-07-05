export default class {
  constructor(camera, position, target, speed = 4) {
    this.camera = camera;
    this.position = position;
    this.target = target;
    this.speed = speed;
  }

  zoomIn() {
    let pos = this.position;
    const globalCamera = this.camera;
    const tar = this.target;
    const speedDiv = this.speed;
    function ease() {
      pos -= 1;
      globalCamera.position.z = (pos / 10) * speedDiv;
      if (globalCamera.position.z > tar) {
        requestAnimationFrame(ease);
      }
    }
    requestAnimationFrame(ease);
  }

  zoomOut() {
    let pos = this.position;
    const globalCamera = this.camera;
    const tar = this.target;
    const speedDiv = this.speed;
    function ease() {
      pos += 1;
      globalCamera.position.z = (pos / 10) * speedDiv;
      if (globalCamera.position.z <= tar) {
        requestAnimationFrame(ease);
      }
    }
    requestAnimationFrame(ease);
  }

  animate() {
    const pos = this.position;
    const tar = this.target;
    if (pos > tar) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }
}
