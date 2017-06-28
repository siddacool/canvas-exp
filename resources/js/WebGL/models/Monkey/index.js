import * as Model from './model.json';
import BaseModel from '../base-model';

const defaultProps = {
  color: 0x42dff4,
  pos: {
    x: undefined,
    y: undefined,
    z: undefined,
  },
};

export default class extends BaseModel {
  constructor(pivot, meshReg, props = defaultProps) {
    super('Monkey', Model, pivot, meshReg);
    this.color = props.color;
    this.posx = props.pos.x;
    this.posy = props.pos.y;
    this.posz = props.pos.z;
    this.center = true;
  }
}
