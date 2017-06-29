export default class {
  constructor(msg = 'tooltip') {
    this.msg = msg;
    this.selfGet = 'tooltip-info';
    this.parentDom = 'tooltip-holder';
  }

  render() {
    return `
      <div class="tooltip-info" id="tooltip-info">
        <div class="margin-box">
          <div class="padding-box">
            <p class="msg">
              ${this.msg}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  show() {
    document.getElementById(this.parentDom).innerHTML = this.render();
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
