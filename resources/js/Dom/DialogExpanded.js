export default class {
  constructor(msg = 'dialog') {
    this.msg = msg;
    this.selfGet = 'dialog-expanded';
    this.parentDom = 'dialog-holder';
  }

  update(updateMsg = this.msg) {
    return updateMsg;
  }

  render() {
    return `
      <div class="wee-inline-dialog dialog-expanded" id="dialog-expanded">
        <div class="padding-box">
          <div class="msg">
            ${this.update()}
          </div>
        </div>
        <div class="button-holder">
          <a id="dialog-expanded-close" class="wee-button wee-button--primary wee-button--large dialog-expanded-close">
            Close
          </a>
        </div>
      </div>
    `;
  }

  show(updateMsg) {
    const dialogHolder = document.getElementById(this.parentDom);
    const msg = document.getElementById(this.selfGet).querySelector('.msg');
    msg.innerHTML = this.update(updateMsg);
    dialogHolder.classList.add('show');
  }

  close() {
    const dialogHolder = document.getElementById(this.parentDom);
    dialogHolder.classList.remove('show');
  }
}
