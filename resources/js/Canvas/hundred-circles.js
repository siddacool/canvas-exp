export default function (can) {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const stroke = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;

    can.beginPath();
    can.arc(x, y, 5, Math.PI * 2, false);
    can.strokeStyle = stroke;
    can.stroke();
  }
}
