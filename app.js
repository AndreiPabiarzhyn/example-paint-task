const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let drawing = false;

let color = "red";
let size = 5;

let tool = "brush";

let currentStamp = null;

let rainbowHue = 0;

// =====================
// Выделение кнопки
// =====================

function selectButton(button){

    document
        .querySelectorAll(".selected")
        .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
}

// =====================
// Цвет
// =====================

function setColor(newColor, button){

    color = newColor;

    tool = "brush";
    currentStamp = null;

    selectButton(button);
}

// =====================
// Инструмент
// =====================

function setTool(newTool, button){

    tool = newTool;
    currentStamp = null;

    selectButton(button);
}

// =====================
// Размер кисти
// =====================

function setSize(newSize, button){

    size = newSize;

    selectButton(button);
}

// =====================
// Штампы
// =====================

function stamp(emoji, button){

    currentStamp = emoji;
    tool = "stamp";

    selectButton(button);
}

// =====================
// Очистка
// =====================

function clearCanvas(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// =====================
// Координаты
// =====================

function getPos(event){

    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if(event.touches){

        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;

    }else{

        clientX = event.clientX;
        clientY = event.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {

        x: (clientX - rect.left) * scaleX,

        y: (clientY - rect.top) * scaleY
    };
}

// =====================
// Начало рисования
// =====================

function start(event){

    const pos = getPos(event);

    // Штамп

    if(tool === "stamp" && currentStamp){

        ctx.font =
            `${size * 6}px Arial`;

        ctx.fillText(
            currentStamp,
            pos.x,
            pos.y
        );

        return;
    }

    drawing = true;

    ctx.beginPath();

    ctx.moveTo(
        pos.x,
        pos.y
    );
}

// =====================
// Рисование
// =====================

function draw(event){

    if(!drawing) return;

    event.preventDefault();

    const pos = getPos(event);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineWidth = size;

    // Ластик

    if(tool === "eraser"){

        ctx.strokeStyle = "white";
    }

    // Радуга

    else if(tool === "rainbow"){

        ctx.strokeStyle =
            `hsl(${rainbowHue},100%,50%)`;

        rainbowHue += 3;

        if(rainbowHue >= 360){

            rainbowHue = 0;
        }
    }

    // Кисть

    else{

        ctx.strokeStyle = color;
    }

    ctx.lineTo(
        pos.x,
        pos.y
    );

    ctx.stroke();
}

// =====================
// Конец рисования
// =====================

function stop(){

    drawing = false;
}

// =====================
// Мышь
// =====================

canvas.addEventListener(
    "mousedown",
    start
);

canvas.addEventListener(
    "mousemove",
    draw
);

canvas.addEventListener(
    "mouseup",
    stop
);

canvas.addEventListener(
    "mouseleave",
    stop
);

// =====================
// Сенсор
// =====================

canvas.addEventListener(
    "touchstart",
    start
);

canvas.addEventListener(
    "touchmove",
    draw
);

canvas.addEventListener(
    "touchend",
    stop
);

// =====================
// Раскраска Домик
// =====================

function drawHouse(){

    clearCanvas();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";

    ctx.strokeRect(
        350,
        250,
        300,
        220
    );

    ctx.beginPath();

    ctx.moveTo(320,250);
    ctx.lineTo(500,120);
    ctx.lineTo(680,250);

    ctx.stroke();

    ctx.strokeRect(
        460,
        340,
        80,
        130
    );

    ctx.strokeRect(
        380,
        300,
        50,
        50
    );

    ctx.strokeRect(
        570,
        300,
        50,
        50
    );
}

// =====================
// Раскраска Котик
// =====================

function drawCat(){

    clearCanvas();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.arc(
        500,
        300,
        120,
        0,
        Math.PI * 2
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(430,190);
    ctx.lineTo(380,110);
    ctx.lineTo(470,180);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(570,180);
    ctx.lineTo(620,110);
    ctx.lineTo(530,190);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        450,
        280,
        10,
        0,
        Math.PI * 2
    );

    ctx.arc(
        550,
        280,
        10,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        500,
        330,
        30,
        0,
        Math.PI
    );
    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(430,320);
    ctx.lineTo(350,300);

    ctx.moveTo(430,340);
    ctx.lineTo(350,340);

    ctx.moveTo(570,320);
    ctx.lineTo(650,300);

    ctx.moveTo(570,340);
    ctx.lineTo(650,340);

    ctx.stroke();
}

// =====================
// Раскраска Машинка
// =====================

function drawCar(){

    clearCanvas();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";

    ctx.strokeRect(
        300,
        250,
        400,
        120
    );

    ctx.beginPath();

    ctx.moveTo(380,250);
    ctx.lineTo(450,180);
    ctx.lineTo(580,180);
    ctx.lineTo(650,250);

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        380,
        400,
        40,
        0,
        Math.PI * 2
    );

    ctx.arc(
        620,
        400,
        40,
        0,
        Math.PI * 2
    );

    ctx.stroke();
}
