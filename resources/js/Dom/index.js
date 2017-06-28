import TooltipInfo from './TooltipInfo';

const wrapper = document.getElementById('wrapper');
const tooltipInfo = new TooltipInfo();


wrapper.innerHTML = `
  <canvas id="my-canvas">
  </canvas>
  <div id="my-div">
    <div id="tooltip-holder">
      ${tooltipInfo.render()}
    </div>
  </div>
`;
