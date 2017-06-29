import TooltipInfo from './TooltipInfo';
import DialogExpanded from './DialogExpanded';

const wrapper = document.getElementById('wrapper');
const tooltipInfo = new TooltipInfo();
const dialogExpanded = new DialogExpanded();


wrapper.innerHTML = `
  <canvas id="my-canvas">
  </canvas>
  <div id="my-div">
    <div id="tooltip-holder">
      ${tooltipInfo.render()}
    </div>
    <div id="dialog-holder" class="dialog-holder">
      ${dialogExpanded.render()}
    </div>
  </div>
`;
