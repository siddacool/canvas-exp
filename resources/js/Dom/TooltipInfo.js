export default class {
  constructor(msg = 'tooltip') {
    this.msg = msg;
    this.selfGet = 'tooltip-info';
  }

  render() {
    return `
      <div class="tooltip-info" id="tooltip-info">
        <p class="msg">
          ${this.msg}
        </p>
      </div>
    `;
  }

  follow(x, y) {
    const selfGet = document.getElementById(this.selfGet);

    selfGet.style.visibility = 'visible';
    selfGet.style.top = `${y}px`;
    selfGet.style.left = `${x}px`;
  }

  clear() {
    const selfGet = document.getElementById(this.selfGet);

    selfGet.setAttribute('style', '');
  }
}
