import * as Model from './model.json';
import Description from './description.html';
import BaseModel from '../../base-model';

export default class extends BaseModel {
  constructor(id, pivot, meshReg, cubeCamera) {
    super(id, 'Tower Step3', Model, pivot, meshReg, cubeCamera);
    this.description = Description;
  }
}
