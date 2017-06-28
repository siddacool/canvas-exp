import * as THREE from 'three';
import TooltipInfo from '../Dom/TooltipInfo';
import Monkey from './models/Monkey';
import Trigo from './models/Trigo';

const initializeDomEvents = require('threex-domevents');

const THREEx = {};
initializeDomEvents(THREE, THREEx);

function webGLInit() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('my-canvas'),
    antialias: true,
  });

  renderer.setClearColor(0x00ff00);
  renderer.setSize(window.innerWidth, window.innerHeight);


  const cameraWindow = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(35, cameraWindow, 0.5, 3000);
  const scene = new THREE.Scene();
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  const showCoords = (event) => {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const light = new THREE.HemisphereLight(0xffffff, 0x4274f4, 1);
  scene.add(light);

  const light1 = new THREE.PointLight(0xffffff, 0.5);
  scene.add(light1);

  let mouse = {
    x: undefined,
    y: undefined,
  };
  let isDragging = false;

  const showTooltip = (object) => {
    const tooltipInfo = new TooltipInfo(object.userData.name);
    domEvents.addEventListener(object, 'mouseover', () => {
      document.getElementById('tooltip-holder').innerHTML = tooltipInfo.render();
      object.material.color.setHex(0xffffff);
    }, false);

    domEvents.addEventListener(object, 'mousemove', () => {
      const mousePos = showCoords(event);
      if (!isDragging) {
        tooltipInfo.follow(mousePos.x + 8, mousePos.y - 30);
      }
    }, false);

    domEvents.addEventListener(object, 'mouseout', () => {
      tooltipInfo.clear();
      object.material.color.setHex(object.userData.color);
    }, false);
  };

  const pivot = new THREE.Group();
  const meshReg = [];
  scene.add(pivot);
  pivot.position.z = -10;

  const zoom = (event) => {
    if (event.wheelDelta / 120 > 0) {
      camera.position.z -= 0.1;
    } else {
      camera.position.z += 0.1;
    }
  };
  const drag = (event) => {
    if (isDragging) {
      if (typeof (mouse.x) !== 'undefined') {
        const deltaX = mouse.x - event.x;
        const deltaY = mouse.y - event.y;
        pivot.rotation.y += deltaX * -0.002;
      }
    }
    mouse = {
      x: event.x,
      y: event.y,
    };
  };

  addEventListener('mousedown', () => {
    isDragging = true;
  });

  addEventListener('mousemove', drag);

  addEventListener('mouseup', () => {
    isDragging = false;
  });

  addEventListener('mousewheel', zoom);

  // Call Models
  const monkey = new Monkey(pivot, meshReg);
  const trigo = new Trigo(pivot, meshReg);

  monkey.render();
  trigo.render();


  meshReg.forEach((mesh) => {
    showTooltip(mesh);
  });

  // render all
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
};

export default webGLInit;
