import * as THREE from 'three';
import TooltipInfo from '../Dom/TooltipInfo';
import modelView from './model-view';
import DialogExpanded from '../Dom/DialogExpanded';
import Instructions from '../Dom/Instructions';
import EaseZ from './animate/EaseZ';

const initializeDomEvents = require('threex-domevents');

const THREEx = {};
initializeDomEvents(THREE, THREEx);

function webGLInit() {
  const tooltipInfo = new TooltipInfo();
  const dialogExpanded = new DialogExpanded();
  const isDialogVisible = () => {
    return document.getElementById('dialog-holder').classList.contains('show');
  };
  const myCanvas = document.getElementById('my-canvas');
  const cameraDistance = () => {
    let send = '';
    if (window.innerWidth < 600) {
      send = 70;
    } else {
      send = 50;
    }
    return send;
  };
  const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true,
  });
  renderer.setClearColor(0x011147);
  renderer.setSize(window.innerWidth, window.innerHeight);


  const cameraWindow = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(cameraDistance(), cameraWindow, 0.5, 3000);
  const scene = new THREE.Scene();
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  const resizeCanvas = (width, height) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
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

  const pivot = new THREE.Group();
  const meshReg = [];
  scene.add(pivot);
  pivot.position.z = -13;

  const cubeCamera = new THREE.CubeCamera(10, 1000, 1024);
  scene.add(cubeCamera);
  cubeCamera.updateCubeMap(renderer, scene);

  const spheregeometry = new THREE.SphereBufferGeometry(10, 20, 20);
  const spherematerial = new THREE.MeshPhongMaterial();
  const sphere = new THREE.Mesh(spheregeometry, spherematerial);
  spherematerial.map = THREE.ImageUtils.loadTexture('./public/dist/images/starsinthesky.jpg');
  sphere.material.side = THREE.BackSide;
  cubeCamera.updateCubeMap(renderer, scene);

  pivot.add(sphere);
  cubeCamera.updateCubeMap(renderer, scene);
  modelView(pivot, meshReg, cubeCamera);
  cubeCamera.updateCubeMap(renderer, scene);

  const giveMesh = (meshId) => {
    for (let i = 0; i < meshReg.length; i++) {
      if (meshReg[i].userData.id === meshId) {
        return meshReg[i];
      }
    }
  };

  const fliterMesh = (meshId) => {
    for (let i = 0; i < meshReg.length; i++) {
      if (meshReg[i].userData.id === meshId) {
        meshReg[i].userData.active = true;
        meshReg[i].material.color.setHex(0xff0c0c);
      } else {
        meshReg[i].userData.active = false;
        meshReg[i].material.color.setHex(meshReg[i].userData.color);
      }
    }
  };

  const showAllMesh = () => {
    for (let i = 0; i < meshReg.length; i++) {
      meshReg[i].visible = true;
      meshReg[i].userData.active = false;
      meshReg[i].material.color.setHex(meshReg[i].userData.color);
    }
  };

  const zoom = (event) => {
    cubeCamera.updateCubeMap(renderer, scene);
    if (event.wheelDelta / 120 > 0) {
      camera.position.z -= 0.3;
    } else {
      camera.position.z += 0.3;
    }
  };

  const drag = (event) => {
    cubeCamera.updateCubeMap(renderer, scene);
    if (isDragging) {
      if (typeof (mouse.x) !== 'undefined') {
        const deltaX = mouse.x - event.x;
        const deltaY = mouse.y - event.y;
        pivot.rotation.y += deltaX * -0.002;
        pivot.rotation.x += deltaY * -0.002;
      }
    }
    mouse = {
      x: event.x,
      y: event.y,
    };
  };
  const shrinkCanvas = () => {
    cubeCamera.updateCubeMap(renderer, scene);
    if (!isDialogVisible()) {
      if (window.innerWidth >= 1280) {
        resizeCanvas(window.innerWidth / 2, window.innerHeight);
      }
    }
  };
  const showTooltip = (object) => {
    domEvents.addEventListener(object, 'mousemove', () => {
      const mousePos = showCoords(event);
      if (!isDragging) {
        tooltipInfo.show(object.userData.name, mousePos.x, mousePos.y);
        if (!object.userData.active) {
          object.material.color.setHex(0xffffff);
        }
      } else if (!object.userData.active) {
        object.material.color.setHex(object.userData.color);
      }
    }, false);

    domEvents.addEventListener(object, 'mouseout', () => {
      tooltipInfo.clear();
      if (!object.userData.active) {
        object.material.color.setHex(object.userData.color);
      }
    }, false);

    domEvents.addEventListener(object, 'dblclick', () => {
      const easeZ = new EaseZ(camera, camera.position.z, 3, 6);
      if (!isDragging) {
        shrinkCanvas();
        fliterMesh(object.userData.id);
        if (!isDialogVisible()) {
          easeZ.animate();
        }
        dialogExpanded.show(object.userData.description);
      }
    }, false);
  };

  myCanvas.addEventListener('mousedown', () => {
    isDragging = true;
  });

  myCanvas.addEventListener('mousemove', drag);

  myCanvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  myCanvas.addEventListener('mousewheel', zoom);

  document.getElementById('dialog-expanded-close').addEventListener('click', () => {
    const easeZ = new EaseZ(camera, camera.position.z, 0, 4);
    dialogExpanded.close();
    resizeCanvas(window.innerWidth, window.innerHeight);
    showAllMesh();
    easeZ.animate();
  });

  addEventListener('resize', () => {
    if (isDialogVisible() && window.innerWidth >= 1280) {
      resizeCanvas(window.innerWidth / 2, window.innerHeight);
    } else {
      resizeCanvas(window.innerWidth, window.innerHeight);
    }
  });

  meshReg.forEach((mesh) => {
    showTooltip(mesh);
  });

  document.getElementById('instructions').addEventListener('click', () => {
    const instructions = new Instructions();
    const easeZ = new EaseZ(camera, camera.position.z, 10, 4);
    shrinkCanvas();
    easeZ.animate();
    dialogExpanded.show(instructions.render());
  });

  // render all
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

export default webGLInit;
