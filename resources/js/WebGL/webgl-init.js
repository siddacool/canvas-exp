import * as THREE from 'three';
import TooltipInfo from '../Dom/TooltipInfo';
import modelView from './model-view';
import DialogExpanded from '../Dom/DialogExpanded';
import Instructions from '../Dom/Instructions';
import getOffset from '../custom-methods/get-offset';
import EaseZ from './animate/EaseZ';

const initializeDomEvents = require('threex-domevents');

const THREEx = {};
initializeDomEvents(THREE, THREEx);

function webGLInit() {
  const tooltipInfo = new TooltipInfo();
  const dialogExpanded = new DialogExpanded();
  const myCanvas = document.getElementById('my-canvas');
  const cameraDistance = () => {
    let send = '';
    if (window.innerWidth < 600) {
      send = 70;
    } else {
      send = 40;
    }
    return send;
  };
  const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true,
  });
  renderer.setClearColor(0x00ff00);
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

  const spheregeometry = new THREE.SphereBufferGeometry(20, 20, 20);
  const spherematerial = new THREE.MeshPhongMaterial();
  const sphere = new THREE.Mesh(spheregeometry, spherematerial);
  spherematerial.map = THREE.ImageUtils.loadTexture('./public/dist/images/pano.jpg');
  sphere.material.side = THREE.BackSide;

  pivot.add(sphere);
  modelView(pivot, meshReg);

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
        meshReg[i].visible = true;
      } else {
        meshReg[i].visible = false;
      }
    }
  };

  const showAllMesh = () => {
    for (let i = 0; i < meshReg.length; i++) {
      meshReg[i].visible = true;
    }
  };

  const zoom = (event) => {
    if (event.wheelDelta / 120 > 0) {
      camera.position.z -= 0.3;
    } else {
      camera.position.z += 0.3;
    }
  };
  const drag = (event) => {
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
    const isDialogVisible = document.getElementById('dialog-holder').classList.contains('show');
    const easeZ = new EaseZ(camera, 0, -2, 4);

    if (!isDialogVisible) {
      if (window.innerWidth >= 1280) {
        resizeCanvas(window.innerWidth / 2, window.innerHeight);
      }

      easeZ.zoomIn();
    }
  };
  const showTooltip = (object) => {
    domEvents.addEventListener(object, 'mousemove', () => {
      const mousePos = showCoords(event);
      if (!isDragging) {
        tooltipInfo.show(object.userData.name, mousePos.x, mousePos.y);
        object.material.color.setHex(0xffffff);
      } else {
        object.material.color.setHex(object.userData.color);
      }
    }, false);

    domEvents.addEventListener(object, 'mouseout', () => {
      tooltipInfo.clear();
      object.material.color.setHex(object.userData.color);
    }, false);

    domEvents.addEventListener(object, 'dblclick', () => {
      if (!isDragging) {
        shrinkCanvas();
        dialogExpanded.show(object.userData.description);
        fliterMesh(object.userData.id);
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
    //camera.position.z = 10;
    
    easeZ.zoomOut();
  });

  addEventListener('resize', () => {
    const isDialogVisible = document.getElementById('dialog-holder').classList.contains('show');
    if (isDialogVisible && window.innerWidth >= 1280) {
      resizeCanvas(window.innerWidth / 2, window.innerHeight);
    } else {
      resizeCanvas(window.innerWidth, window.innerHeight);
    }
  });

  meshReg.forEach((mesh) => {
    showTooltip(mesh);
  });

  const instructionsBtn = document.getElementById('instructions');

  instructionsBtn.addEventListener('mouseover', () => {
    const thisPos = getOffset(instructionsBtn);

    tooltipInfo.show('About', thisPos.left - 20, thisPos.top + 80);
  });

  instructionsBtn.addEventListener('mouseout', () => {
    tooltipInfo.clear();
  });

  instructionsBtn.addEventListener('click', () => {
    const instructions = new Instructions();

    shrinkCanvas();
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
