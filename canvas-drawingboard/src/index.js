import "./assets/main.less"

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("board");
const brush = document.getElementsByClassName("brush")[0];
const eraser = document.getElementsByClassName("eraser")[0];
const resetCanvas = document.getElementsByClassName("clear")[0];
const undo = document.getElementsByClassName("undo")[0];
const saveCanvas = document.getElementsByClassName("save")[0];
const range = document.getElementById("range");
const ctx = canvas.getContext("2d");
let lWidth = 4;
// 设置画布大小
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
canvas.width = 1000;
canvas.height = 500;
let painting = false; //绘制中
let lastPoint = { x: null, y: null };
let clear = false; //  是否橡皮檫
//画笔功能
brush.onclick = () => {
    clear = false;
    eraser.classList.remove('active');
    brush.classList.add('active');
}
canvas.onmousedown = (e) => {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//在这里储存绘图表面
    console.log(imgData);
    saveData(imgData);
    painting = true;
    const x = e.clientX;
    const y = e.clientY;
    lastPoint = { x, y };
    drawCircle(x, y, 0);
}
canvas.onmousemove = (e) => {
    if (painting) {
        const x = e.clientX;
        const y = e.clientY;
        let newPoint = { "x": x, "y": y };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
    }
}
canvas.onmouseup = () => {
    painting = false;
}

//橡皮檫功能

eraser.onclick =  () => {
    clear = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
}


//画圆
function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (clear) {
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
}


// 划线
function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = lWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (clear) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.restore();
    }else{
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
}

//清空画布
resetCanvas.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

range.onchange = () => {
    lWidth = this.value;
}
//保存
saveCanvas.onclick = () => {
    let imgUrl = canvas.toDataURL("image/png");
    let saveA = document.createElement("a");
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = Date.now();
    saveA.target = "_blank";
    saveA.click();
}

let historyDeta = [];

function saveData (data) {
    //上限10步
    if(historyDeta.length === 10) historyDeta.shift();
    historyDeta.push(data);
}

//撤销
undo.onclick = () => {
    if(historyDeta.length < 1) return false;
    ctx.putImageData(historyDeta[historyDeta.length - 1], 0, 0);
    historyDeta.pop()
};
