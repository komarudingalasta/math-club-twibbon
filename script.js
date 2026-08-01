/* ==========================================
   MATH CLUB GALASTA 2026
   SCRIPT.JS - BAGIAN 1
========================================== */

// =========================
// CANVAS
// =========================

const canvas = document.getElementById("twibbonCanvas");
const ctx = canvas.getContext("2d");

// =========================
// KOMPONEN
// =========================

const upload = document.getElementById("photoUpload");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");

const zoomSlider = document.getElementById("zoomSlider");

const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

// =========================
// FRAME
// =========================

const frame = new Image();
frame.src = "assets/frame.png";

// =========================
// FOTO SISWA
// =========================

const photo = new Image();

let photoLoaded = false;

// posisi awal

let imgX = 540;
let imgY = 420;

let imgScale = 1;

// ukuran dasar

let baseWidth = 700;
let baseHeight = 700;

// =========================
// UPLOAD FOTO
// =========================

upload.addEventListener("change", function(e){
upload.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        photo.src = event.target.result;
    };

    reader.readAsDataURL(file);

});
// =========================
// INPUT NAMA
// =========================

studentName.addEventListener("input",renderCanvas);

// =========================
// INPUT KELAS
// =========================

studentClass.addEventListener("input",renderCanvas);

// =========================
// SLIDER
// =========================

zoomSlider.addEventListener("input",function(){

    imgScale = Number(this.value);

    renderCanvas();

});

// =========================
// RESET
// =========================

resetBtn.addEventListener("click",function(){

    imgX = 540;
    imgY = 420;
    imgScale = 1;

    zoomSlider.value = 1;

    renderCanvas();

});

// =========================
// RENDER
// =========================

function renderCanvas(){

    ctx.clearRect(0,0,1080,1080);

    // background putih

    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,1080,1080);

    // =====================
    // FOTO
    // =====================

    if(photoLoaded){

        const w = baseWidth * imgScale;
        const h = baseHeight * imgScale;

        ctx.drawImage(

            photo,

            imgX - w/2,

            imgY - h/2,

            w,

            h

        );

    }

    // =====================
    // FRAME
    // =====================

    if(frame.complete){

        ctx.drawImage(frame,0,0,1080,1080);

    }

    // =====================
    // NAMA
    // =====================

    ctx.textAlign="center";

    ctx.fillStyle="white";

    ctx.strokeStyle="black";

    ctx.lineWidth=8;

    ctx.font="bold 48px Poppins";

    const nama = studentName.value || "";

    ctx.strokeText(

        nama,

        540,

        950

    );

    ctx.fillText(

        nama,

        540,

        950

    );

    // =====================
    // KELAS
    // =====================

    ctx.font="bold 36px Poppins";

    const kelas = studentClass.value || "";

    ctx.strokeText(

        kelas,

        540,

        1005

    );

    ctx.fillText(

        kelas,

        540,

        1005

    );

}

// =========================
// FRAME SIAP
// =========================

frame.onload = function(){

    renderCanvas();

}

/* ==========================================
   SCRIPT.JS - BAGIAN 2
   DRAG, TOUCH, WHEEL, DOWNLOAD
========================================== */

// ======================================
// DRAG MOUSE
// ======================================

let isDragging = false;
let startX = 0;
let startY = 0;

canvas.addEventListener("mousedown", (e) => {

    isDragging = true;

    startX = e.offsetX;
    startY = e.offsetY;

});

canvas.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    let dx = e.offsetX - startX;
    let dy = e.offsetY - startY;

    startX = e.offsetX;
    startY = e.offsetY;

    imgX += dx * (1080 / canvas.clientWidth);
    imgY += dy * (1080 / canvas.clientHeight);

    renderCanvas();

});

canvas.addEventListener("mouseup", () => {

    isDragging = false;

});

canvas.addEventListener("mouseleave", () => {

    isDragging = false;

});

// ======================================
// TOUCH HP
// ======================================

canvas.addEventListener("touchstart", function(e){

    if(e.touches.length !== 1) return;

    isDragging = true;

    const rect = canvas.getBoundingClientRect();

    startX = e.touches[0].clientX - rect.left;
    startY = e.touches[0].clientY - rect.top;

});

canvas.addEventListener("touchmove", function(e){

    if(!isDragging) return;

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    let x = e.touches[0].clientX - rect.left;
    let y = e.touches[0].clientY - rect.top;

    let dx = x - startX;
    let dy = y - startY;

    startX = x;
    startY = y;

    imgX += dx * (1080 / canvas.clientWidth);
    imgY += dy * (1080 / canvas.clientHeight);

    renderCanvas();

},{passive:false});

canvas.addEventListener("touchend",function(){

    isDragging=false;

});

// ======================================
// ZOOM DENGAN SCROLL MOUSE
// ======================================

canvas.addEventListener("wheel",function(e){

    e.preventDefault();

    if(e.deltaY<0){

        imgScale +=0.05;

    }else{

        imgScale -=0.05;

    }

    imgScale=Math.max(0.5,Math.min(3,imgScale));

    zoomSlider.value=imgScale;

    renderCanvas();

});

// ======================================
// DOWNLOAD PNG HD
// ======================================

downloadBtn.addEventListener("click",function(){

    renderCanvas();

    canvas.toBlob(function(blob){

        const link=document.createElement("a");

        let nama=studentName.value.trim();

        if(nama===""){

            nama="MathClubGalasta";

        }

        nama=nama.replace(/\s+/g,"_");

        link.download=nama+".png";

        link.href=URL.createObjectURL(blob);

        link.click();

        URL.revokeObjectURL(link.href);

    },"image/png");

});

// ======================================
// CEGAH DRAG GAMBAR BROWSER
// ======================================

canvas.onselectstart=()=>false;
canvas.ondragstart=()=>false;

/* ==========================================
   SCRIPT.JS - BAGIAN 3 (FINAL)
   PENYEMPURNAAN
========================================== */

// ===============================
// FOTO PROPORSIONAL
// ===============================

photo.onload = function () {

    photoLoaded = true;

    const ratio = photo.width / photo.height;

    const maxSize = 900;

    if (ratio >= 1) {
        baseHeight = maxSize;
        baseWidth = maxSize * ratio;
    } else {
        baseWidth = maxSize;
        baseHeight = maxSize / ratio;
    }

    imgScale = 1;
    imgX = 540;
    imgY = 420;

    zoomSlider.value = 1;

    renderCanvas();

};

};

// ===============================
// BATAS GESER FOTO
// ===============================

function limitPosition(){

    const w = baseWidth * imgScale;
    const h = baseHeight * imgScale;

    const minX = 540 - w/2;
    const maxX = 540 + w/2;

    const minY = 540 - h/2;
    const maxY = 540 + h/2;

    imgX = Math.min(maxX, Math.max(minX, imgX));
    imgY = Math.min(maxY, Math.max(minY, imgY));

}

// ===============================
// PINCH ZOOM HP
// ===============================

let pinchDistance = 0;

canvas.addEventListener("touchmove",function(e){

    if(e.touches.length!=2) return;

    e.preventDefault();

    const dx =
        e.touches[0].clientX -
        e.touches[1].clientX;

    const dy =
        e.touches[0].clientY -
        e.touches[1].clientY;

    const distance =
        Math.sqrt(dx*dx+dy*dy);

    if(pinchDistance!==0){

        if(distance>pinchDistance){

            imgScale+=0.02;

        }else{

            imgScale-=0.02;

        }

        imgScale=Math.max(0.5,Math.min(3,imgScale));

        zoomSlider.value=imgScale;

        renderCanvas();

    }

    pinchDistance=distance;

},{passive:false});

canvas.addEventListener("touchend",function(){

    pinchDistance=0;

});

// ===============================
// RENDER HALUS
// ===============================

const oldRender = renderCanvas;

renderCanvas = function(){

    limitPosition();

    requestAnimationFrame(oldRender);

};

// ===============================
// DOWNLOAD KUALITAS TINGGI
// ===============================

downloadBtn.addEventListener("click",function(){

    renderCanvas();

    setTimeout(function(){

        canvas.toBlob(function(blob){

            const link=document.createElement("a");

            let nama=studentName.value.trim();

            if(nama===""){

                nama="MathClubGalasta";

            }

            nama=nama.replace(/\s+/g,"_");

            link.download=
                "MathClubGalasta_"+nama+".png";

            link.href=
                URL.createObjectURL(blob);

            link.click();

            URL.revokeObjectURL(link.href);

        },"image/png",1);

    },100);

});

// ===============================
// SELESAI
// ===============================

console.log("Math Club Galasta Ready");
