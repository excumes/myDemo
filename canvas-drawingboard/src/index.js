import "./assets/main.less"


const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let painting = false;
let lastPoint = { x: null, y: null };

// 设置画布大小
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

canvas.onmousedown = (e) => {
    painting = true;
    const x = e.clientX;
    const y = e.clientY;
    lastPoint = { x, y };
    drawCircle(x, y, 5);
}
canvas.onmousemove = (e) => {
    if(painting){
        const x = e.clientX;
        const y = e.clientY;
        let newPoint = { "x": x, "y": y};
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
    }
}
canvas.onmouseup = () => {
    painting = false;
}

//画点
function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}


// 划线函数
function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}