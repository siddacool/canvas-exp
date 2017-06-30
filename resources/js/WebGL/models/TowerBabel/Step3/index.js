import * as Model from './model.json';
import Description from './description.html';
import BaseModel from '../../base-model';

const defaultProps = {
  color: 0x42dff4,
  pos: {
    x: undefined,
    y: undefined,
    z: undefined,
  },
};

export default class extends BaseModel {
  constructor(id, pivot, meshReg, props = defaultProps) {
    super(id, 'Tower Step3', Model, pivot, meshReg);
    this.color = props.color;
    this.posx = props.pos.x;
    this.posy = props.pos.y;
    this.posz = props.pos.z;
    this.description = Description;
  }
}
