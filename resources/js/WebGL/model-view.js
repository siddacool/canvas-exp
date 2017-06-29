import { TowerStep1, TowerStep2, TowerStep3, TowerStep4, TowerStep5 } from './models/TowerBabel';

export default (pivot, meshReg) => {
  const tower = {
    step1: new TowerStep1('tower_step1', pivot, meshReg),
    step2: new TowerStep2('tower_step2', pivot, meshReg),
    step3: new TowerStep3('tower_step3', pivot, meshReg),
    step4: new TowerStep4('tower_step4', pivot, meshReg),
    step5: new TowerStep5('tower_step5', pivot, meshReg),
  };

  tower.step1.render();
  tower.step2.render();
  tower.step3.render();
  tower.step4.render();
  tower.step5.render();
};
