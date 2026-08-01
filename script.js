// ==========================================
// MATH CLUB GALASTA 2026
// SCRIPT.JS
// Foto tidak gepeng + drag + zoom
// ==========================================


const canvas = document.getElementById("twibbonCanvas");
const ctx = canvas.getContext("2d");

const upload = document.getElementById("photoUpload");
const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");

const downloadBtn = document.getElementById("downloadBtn");


// =============================
// UKURAN CANVAS
// =============================

canvas.width = 1080;
canvas.height = 1080;


// =============================
// DATA FOTO
// =============================

let photo = new Image();

let photoLoaded = false;

let photoX = canvas.width / 2;
let photoY = canvas.height / 2;

let scale = 1;


// =============================
// FRAME
// =============================

let frame = new Image();

frame.src = "assets/frame.png";


// =============================
// UPLOAD FOTO
// =============================

upload.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;


    const reader = new FileReader();


    reader.onload = function(event){

        photo.onload = function(){

            photoLoaded = true;

            scale = 1;

            photoX = canvas.width/2;
            photoY = canvas.height/2;

            draw();

        }


        photo.src = event.target.result;

    }


    reader.readAsDataURL(file);

});



// =============================
// GAMBAR CANVAS
// =============================

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // FOTO

    if(photoLoaded){

        ctx.save();


        ctx.translate(
            photoX,
            photoY
        );


        ctx.scale(
            scale,
            scale
        );


        // menjaga rasio asli foto

        let ratio = Math.max(
            canvas.width / photo.width,
            canvas.height / photo.height
        );


        let w = photo.width * ratio;

        let h = photo.height * ratio;



        ctx.drawImage(
            photo,
            -w/2,
            -h/2,
            w,
            h
        );


        ctx.restore();

    }



    // FRAME DI ATAS FOTO

    if(frame.complete){

        ctx.drawImage(
            frame,
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    // TEXT

    ctx.fillStyle="white";

    ctx.textAlign="center";


    ctx.font="bold 55px Arial";

    ctx.fillText(
        nameInput.value,
        canvas.width/2,
        930
    );


    ctx.font="40px Arial";

    ctx.fillText(
        classInput.value,
        canvas.width/2,
        990
    );

}



// =============================
// INPUT TEXT
// =============================

nameInput.addEventListener(
"input",
draw
);


classInput.addEventListener(
"input",
draw
);



// =============================
// DRAG FOTO
// =============================

let dragging=false;

let startX;
let startY;


canvas.addEventListener(
"pointerdown",
function(e){

    dragging=true;

    startX=e.clientX-photoX;

    startY=e.clientY-photoY;

    canvas.setPointerCapture(
        e.pointerId
    );

});



canvas.addEventListener(
"pointermove",
function(e){

    if(!dragging)return;


    photoX=e.clientX-startX;

    photoY=e.clientY-startY;


    draw();

});



canvas.addEventListener(
"pointerup",
function(){

    dragging=false;

});



// =============================
// ZOOM DENGAN SCROLL HP/MOUSE
// =============================

canvas.addEventListener(
"wheel",
function(e){

    e.preventDefault();


    if(e.deltaY<0){

        scale +=0.05;

    }else{

        scale -=0.05;

    }


    if(scale<0.5)
        scale=0.5;


    if(scale>3)
        scale=3;


    draw();

},
{
passive:false
});



// =============================
// TOMBOL DOWNLOAD
// =============================

downloadBtn.addEventListener(
"click",
function(){


const link=document.createElement("a");


link.download=
"Twibbon-Math-Club-Galasta.png";


link.href=
canvas.toDataURL(
"image/png"
);


link.click();


});



// gambar awal

frame.onload=function(){

draw();

};
