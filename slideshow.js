var currentImg = 0;
var imgs = document.querySelectorAll('.slider .slide');
var buttons = document.querySelectorAll('.buttons');
let dots = document.querySelectorAll('.dot');

let slideshow = document.getElementById('slideshow');
let sliderleftButton = document.querySelector('.left-button');
let sliderrightButton = document.querySelector('.right-button');
let p_images = document.querySelectorAll('.p-image');
var interval = 3000;
var isBackward = false;
var onImageClick  = false;
console.log("slideshow");


sliderleftButton.addEventListener('click',function(event){
  console.log("click left",currentImg);

  if(currentImg>0 && currentImg <=imgs.length-1) {
    currentImg--;
  }else if(currentImg===0){
    currentImg=imgs.length-1;
  }
  changeSlide(currentImg);
});

sliderrightButton.addEventListener('click',function(event){
  console.log("click right");
  if(currentImg<imgs.length-1 && currentImg >=0) {
    currentImg++;
    console.log("next");
    isBackward = false;
   }else if(currentImg===imgs.length-1) {
    currentImg=0;
   }
   changeSlide(currentImg);
   console.log("click:",currentImg, "...",imgs.length-1 );
 
});

p_images.forEach(function(img) {
  img.addEventListener('click',function(event){
    console.log("click on img");
    slideshow.style.visibility='visible';
    slideshow.style.zIndex='10000000';

    });  
});

//var timer = setInterval(changeSlide, interval);
/*imgs.forEach(function(link) {
    link.addEventListener('click',function(event){
      console.log("click on img");

      console.log("target:",event.target);
       if(currentImg<imgs.length-1 && currentImg >=0) {
        currentImg++;
        console.log("next");
        isBackward = false;
       }else if(currentImg===imgs.length-1) {
        currentImg=0;
       }
       changeSlide(currentImg);
       console.log("click:",currentImg, "...",imgs.length-1 );
      });  
});*/

function changeSlide(n) {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].style.opacity = 0;
    dots[i].className = dots[i].className.replace(' active', '');
  }
  if (n != undefined) {
    currentImg = n;
  }

  onImageClick = false;

  imgs[currentImg].style.opacity = 1;
  dots[currentImg].className += ' active';
}

// ajouter comportement -> lorsqu'on est hover sur navigation-button -> le click sur image ne marche plus