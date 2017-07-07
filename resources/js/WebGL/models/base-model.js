import * as THREE from 'three';

const initializeDomEvents = require('threex-domevents');

const THREEx = {};
initializeDomEvents(THREE, THREEx);

export default class {
  constructor(id, name, model, pivot, meshReg, cubeCamera) {
    this.id = id;
    this.name = name;
    this.model = model;
    this.color = 0x42dff4;
    this.posx = undefined;
    this.posy = undefined;
    this.posz = undefined;
    this.pivot = pivot;
    this.meshReg = meshReg;
    this.center = false;
    this.description = 'No Description';
    this.cubeCamera = cubeCamera;
  }

  render() {
    const loader = new THREE.JSONLoader();
    const model = loader.parse(this.model);
    const material = new THREE.MeshStandardMaterial({ color: this.color });
    const mesh = new THREE.Mesh(
      model.geometry,
      material,
    );
    material.envMap = this.cubeCamera.renderTarget.texture;
    if (this.center === true) {
      const box = new THREE.Box3().setFromObject(mesh);
      box.getCenter(mesh.position);
      mesh.position.multiplyScalar(-1);
    }
    if (this.posx !== undefined) {
      mesh.position.x = this.posx;
    }
    if (this.posy !== undefined) {
      mesh.position.y = this.posy;
    }
    if (this.posz !== undefined) {
      mesh.position.z = this.posz;
    }
    mesh.userData.id = this.id;
    mesh.userData.name = this.name;
    mesh.userData.description = this.description;
    mesh.userData.color = this.color;
    this.pivot.add(mesh);
    this.meshReg.push(mesh);
  }
}
