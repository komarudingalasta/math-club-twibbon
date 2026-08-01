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

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        photo.onload = function(){

            photoLoaded = true;

            imgX = 540;
            imgY = 420;
            imgScale = 1;

            zoomSlider.value = 1;

            renderCanvas();

        }

        photo.src = event.target.result;

    }

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
