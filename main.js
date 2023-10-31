console.clear();

const info_button = document.querySelector(".nav-infos");
const projects_button = document.querySelector(".nav-projects");

let isTweening = false;
let currentSection = 0;
let amount = 0;
let base = 0;
const columns = gsap.utils.toArray(".column");

columns.forEach((col, i) => {
  const els = gsap.utils.toArray(".box", col);
  amount = els.length;
  base = 100 * (amount - 1);
  if (i) {
    gsap.set(col, {
      yPercent: -base
    });
  }
});

const goToSection = (e) => {
  console.log(e.deltaY, isTweening);
  if (isTweening) return;
  let value;
  if (e.deltaY > 0 && currentSection < amount - 1) {
    isTweening = true;
    currentSection++;
    value = 100 * currentSection;
    gsap.to(columns, {
      yPercent: (i) => (i < 1 ? -value : value - base),
      duration: 1,
      onComplete: () => (isTweening = false)
    });
  } else if (e.deltaY < 0 && currentSection > 0) {
    isTweening = true;
    currentSection--;
    value = 100 * currentSection;
    gsap.to(columns, {
      yPercent: (i) => (i < 1 ? -value : value - base),
      duration: 1,
      onComplete: () => (isTweening = false)
    });
  }
};

Observer.create({
  target: window,
  type: "wheel",
  onChangeY: goToSection
});


/*section interaction*/

let i_direction = true;
let p_direction = true;
const duration = 1;

projects_button.addEventListener("click", function(){
    console.log('projects clicked!');
    var panel1 = ".p-section1";
    var panel2 = ".p-section2";
   
    if(p_direction){
        if(i_direction===false){
            downPanel(".i-section1");
            upPanel(".i-section2");
            i_direction = true;
        }
        downPanel(panel1);
        upPanel(panel2);
    }else{
        upPanel(panel1);
        downPanel(panel2);
    }
    p_direction = !p_direction;
    console.log("i_direction:", i_direction);
    console.log("p_direction:", p_direction);

});

info_button.addEventListener("click", function(){
    console.log('infos clicked!');
    var panel1 = ".i-section1";
    var panel2 = ".i-section2";
 
    if(i_direction){
        if(p_direction===false){
            upPanel(".p-section1");
            downPanel(".p-section2");
            p_direction = true;
        }
        upPanel(panel1);
        downPanel(panel2);
    }else{
        downPanel(panel1);
        upPanel(panel2);
    }
    i_direction = !i_direction;
    console.log("i_direction:", i_direction);
    console.log("p_direction:", p_direction);
    
});



function upPanel(target){
    gsap.to(target, {
        duration: duration,
        y: "-100vh",
        ease: "power3.inOut",
    });
}

function downPanel(target){
    gsap.to(target, {
        duration: duration,
        y: "100vh",
        ease: "power3.inOut",
    });
}
