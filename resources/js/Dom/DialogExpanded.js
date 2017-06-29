export default class {
  constructor(msg = 'dialog') {
    this.msg = msg;
    this.selfGet = 'dialog-expanded';
    this.parentDom = 'dialog-holder';
  }

  render() {
    return `
      <div class="dialog-expanded" id="dialog-expanded">
        <div class="padding-box">
          <p class="msg">
            ${this.msg}
          </p>
        </div>
      </div>
    `;
  }

  show() {
    const dialogHolder = document.getElementById(this.parentDom);
    dialogHolder.innerHTML = this.render();
    dialogHolder.style.display = 'block';
  }

  close() {
    document.getElementById(this.parentDom).style.display = '';
  }
}
