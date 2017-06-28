export default class {
  constructor(msg = 'dialog') {
    this.msg = msg;
  }

  render() {
    return `
      <div class="dialog-expanded" id="dialog-expanded">
        <p class="msg">
          ${this.msg}
        </p>
      </div>
    `;
  }

  show(msg) {
    const dialogExpanded = document.getElementById('dialog-expanded');
    const p = dialogExpanded.querySelector('.msg');

    dialogExpanded.style.display = 'block';
    p.textContent = msg;
  }
}
