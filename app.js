const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

let painting = false;
let filling = false;

const canvas_w = canvas.offsetWidth;
const canvas_h = canvas.offsetHeight;

canvas.width = canvas_w;
canvas.height = canvas_h;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5";

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(painting);
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMOuseDown(event) {
  painting = true;
}

function onMouseUP(event) {
  stopPainting();
}

function handleChangeColor(event) {
  const bgColor = event.target.style.backgroundColor;
  ctx.strokeStyle = bgColor;
  ctx.fillStyle = bgColor;
}

function handleRangeClick(event) {
  const lineSize = event.target.value;
  ctx.lineWidth = lineSize;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleFill() {
  //console.log(filling);
  if (filling) {
    ctx.fillRect(0, 0, canvas_w, canvas_h);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMOuseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFill);
}

if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleChangeColor)
  );
}

if (range) {
  range.addEventListener("input", handleRangeClick);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
