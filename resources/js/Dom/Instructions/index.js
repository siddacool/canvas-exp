import Description from './description.html';

export default class {
  constructor() {
    this.description = Description;
  }

  render() {
    return `${this.description}`;
  }
}
