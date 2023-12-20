var currentImg = 0;
var imgs = document.querySelectorAll('.slider img');
let dots = document.querySelectorAll('.dot');
var interval = 3000;
var isBackward = false;
var onImageClick  = false;


//var timer = setInterval(changeSlide, interval);
imgs.forEach(function(link) {
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
});

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