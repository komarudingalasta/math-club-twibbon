const upload =
document.getElementById("uploadFoto");


upload.addEventListener(
"change",
function(){

const file=this.files[0];

if(file){

const reader=new FileReader();


reader.onload=function(e){

document.getElementById(
"fotoSiswa"
).src=e.target.result;

}


reader.readAsDataURL(file);

}

});



document
.getElementById("nama")
.addEventListener(
"input",
function(){

document
.getElementById("tampilNama")
.innerHTML=this.value;

});



document
.getElementById("kelas")
.addEventListener(
"input",
function(){

document
.getElementById("tampilKelas")
.innerHTML=this.value;

});





function downloadTwibbon(){

const area =
document.getElementById("hasil");


html2canvas(area)
.then(canvas=>{


const link =
document.createElement("a");


link.download =
"Twibbon-Math-Club.png";


link.href =
canvas.toDataURL();


link.click();


});


}
