const DEG = Math.PI / 180;
var myWorld = document.getElementById("world");

var lvl_one_map = [
    { name: "floor", height: 2000, width: 2000, posX: 0, posY: 200, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, color: "violet", opacity: 0.3, img: "./assets/floor.jfif", bgsize: "15%"},
    { name: "ceiling", height: 2000, width: 2000, posX: 0, posY: -200, posZ: 0, rotX: 90, rotY: 0, rotZ: 0, color: "green", opacity: 0.3, img: "./assets/sky.jpg",  bgsize: "cover"},
    { name: "right wall", height: 400, width: 2000, posX: 1000, posY: 0, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, color: "blue", opacity: 0.3, img: "./assets/wall.jpg", bgsize: "15%"},
    { name: "left wall", height: 400, width: 2000, posX: -1000, posY: 0, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, color: "orange", opacity: 0.3, img: "./assets/wall.jpg", bgsize: "15%"},
    { name: "front wall", height: 400, width: 2000, posX: 0, posY: 0, posZ: 1000, rotX: 0, rotY: 0, rotZ: 0, color: "#ecc0d1", opacity: 0.3, img: "./assets/wall.jpg", bgsize: "15%"},
    { name: "hinter wall", height: 400, width: 2000, posX: 0, posY: 0, posZ: -1000, rotX: 0, rotY: 0, rotZ: 0, color: "yellow", opacity: 0.3, img: "./assets/wall.jpg", bgsize: "15%"},
];

function createWorld(map) {
    for (let i = 0; i < map.length; i++) {
        var mySquare = document.createElement("div");
        mySquare.id = map[i].name;
        mySquare.style.position = "absolute";
        mySquare.style.height = `${map[i].height}px`;
        mySquare.style.width = `${map[i].width}px`;
        mySquare.style.backgroundColor = map[i].color;
        // mySquare.style.opacity = map[i].opacity;
        mySquare.style.backgroundImage = `url("${map[i].img}")`;
        mySquare.style.backgroundSize = map[i].bgsize;
        mySquare.style.backgroundPosition = 'center, center'; 
        mySquare.style.transform = `
            translate3d(
                ${map[i].posX + myWorld.clientWidth / 2 - map[i].width / 2}px, 
                ${map[i].posY + myWorld.clientHeight / 2 - map[i].height / 2}px, 
                ${map[i].posZ}px
            ) 
            RotateX(${map[i].rotX}deg) 
            RotateY(${map[i].rotY}deg) 
            RotateZ(${map[i].rotZ}deg)
        `;
        myWorld.appendChild(mySquare);
    }
}

createWorld(lvl_one_map);   

let dx = dz = dry = 0;
let pressUp = pressDown = pressLeft = pressRight = 0;
let mouseX = mouseY = 0;
let vel = 10;

function player(x, y, z, rx, ry, rz, vx, vy, vz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
}

let pawn = new player(0, 0, 0, 0, 0, 0, vel, vel, vel);

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyW") {
        pressUp = pawn.vz;
    }
    if (e.code == "KeyS") {
        pressDown = pawn.vz;
    }
    if (e.code == "KeyD") {
        pressLeft = pawn.vx;
    }
    if (e.code == "KeyA") {
        pressRight = pawn.vx;
    }
    if (e.code == "Space") {
        myWorld.style.transition = "all 0.3s";
        pawn.y = 150;   
         setTimeout(()=>{
             pawn.y = 0; 
        }, 300)
        setTimeout(()=>{
            myWorld.style.transition = null;
        }, 400)
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code == "KeyW") {
        pressUp = 0;
    }
    if (e.code == "KeyS") {
        pressDown = 0;
    }
        if (e.code == "KeyD") {
        pressLeft = 0;
    }
    if (e.code == "KeyA") {
        pressRight = 0;
    }
});

document.addEventListener("mousemove", (e) => {
    mouseX = e.movementX;
    mouseY = e.movementY;

});

function update() {
    // dz = pressUp - pressDown;
    // dx = pressLeft - pressRight;

    dx = (pressLeft - pressRight)*Math.cos(pawn.ry * DEG) + (pressUp - pressDown)*Math.sin(pawn.ry * DEG);
    dz = -(pressLeft - pressRight)*Math.sin(pawn.ry * DEG) + (pressUp - pressDown)*Math.cos(pawn.ry * DEG);

    dry = mouseX;
    drx = mouseY;
    mouseX = mouseY = 0;

    pawn.z += dz;
    pawn.x += dx;
    pawn.ry += dry;
    pawn.rx -= drx;

    myWorld.style.transform = `translateZ(600px) RotateX(${pawn.rx}deg) RotateY(${pawn.ry}deg) translate3d(${-pawn.x}px, ${pawn.y}px, ${pawn.z}px) `;
}

var game = setInterval(update, 10);