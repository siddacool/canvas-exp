import TooltipInfo from './TooltipInfo';
import DialogExpanded from './DialogExpanded';

const wrapper = document.getElementById('wrapper');
const tooltipInfo = new TooltipInfo();
const dialogExpanded = new DialogExpanded();


wrapper.innerHTML = `
  <canvas id="my-canvas">
  </canvas>
  <div id="my-div">
    <a id="instructions" class="instructions-btn wee-button" title="About">
     <svg role="img" class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-settings"></use></svg>
    </a>
    <div id="tooltip-holder">
      ${tooltipInfo.render()}
    </div>
    <div id="dialog-holder" class="dialog-holder">
      ${dialogExpanded.render()}
    </div>
  </div>
`;
