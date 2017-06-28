export default function (can) {
  can.beginPath();
  can.moveTo(400, 400);
  can.lineTo(300, 100);
  can.lineTo(400, 300);
  can.strokeStyle = '#faf';
  can.stroke();

  can.beginPath();
  can.moveTo(500, 400);
  can.lineTo(200, 100);
  can.lineTo(100, 300);
  can.strokeStyle = 'blue';
  can.stroke();
}
