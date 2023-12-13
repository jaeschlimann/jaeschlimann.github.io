console.clear();

document.onreadystatechange = function(){
  if(document.readyState !== "complete"){
   console.log("loading");

   document.querySelector("body").style.visibility ="hidden";

  }else{
    console.log("complete");
    document.querySelector("body").style.visibility ="visible";
  }

}

let body = document.querySelector("body");
const info_button = document.querySelector(".nav-infos");
const projects_button = document.querySelector(".nav-projects");
const project_button = document.querySelector(".project-link");
const project_closebutton = document.querySelector(".close-btn");

let isTweening = false;
let currentSection = 0;
let amount = 0;
let base = 0;

let onHomepage = true;
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
  if(onHomepage){
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

  }

  
};

Observer.create({
  target: window,
  type: "wheel",
  onChangeY: goToSection
});


/*section interaction*/

let i_direction = true;
//let p_direction = true;
let infosIsOpen = false;
let projectsIsOpen = false;
let projectOpen = false;
const duration = 1;



projects_button.addEventListener("click", function(){
  
  var panel1 = ".p-section-texte";
  var panel2 = ".p-section-image";
  if(projectOpen){

    var p_leftPanel = ".project-text";
    var p_rightPanel = ".project-image";
    closeRightPanel(p_rightPanel);
    closeLeftPanel(p_leftPanel);
    projectOpen = false;
    openLeftPanel(panel1);
    openRightPanel(panel2);

  }else{
    
      if(!projectsIsOpen){
        if(infosIsOpen){
            let infoPanel = ".i-section";
            closeRightPanel(infoPanel);
            infosIsOpen = false;
        }
      openLeftPanel(panel1);
      openRightPanel(panel2);
      onHomepage = false;
      }else{
      closeLeftPanel(panel1);
      closeRightPanel(panel2);
      onHomepage = true;
      }
  console.log("is open:", projectsIsOpen);

  }
  projectsIsOpen = !projectsIsOpen;

});



info_button.addEventListener("click", function(){
    console.log('infos clicked!');
    var infoPanel = ".i-section";
 
    if(!infosIsOpen){
        if(projectsIsOpen){
          var projectPanel1 = ".p-section-texte";
          var projectPanel2 = ".p-section-image";
            closeLeftPanel(projectPanel1);
            closeRightPanel(projectPanel2);
            projectsIsOpen = false;
        }
        console.log("open");
        onHomepage = false;
        openRightPanel(infoPanel);
    }else{
      console.log("close");
      onHomepage = true;
        closeRightPanel(infoPanel);
    }
    infosIsOpen = !infosIsOpen;
    console.log("infosIsOpen:", infosIsOpen);
    
});


function openRightPanel(target){
  gsap.fromTo(target, { y: "-100vh" }, { y:"100vh", duration: 1, ease:"none",});
}

function closeRightPanel(target){
  gsap.fromTo(target, { y: "100vh" }, { y:"200vh", duration: 1, ease:"none",});
}


function openLeftPanel(target){
  gsap.fromTo(target, { y: "100vh" }, { y:"-100vh", duration: 1, ease:"none",});
}

function closeLeftPanel(target){
  gsap.fromTo(target, { y: "-100vh" }, { y:"-200vh", duration: 1, ease:"none",});
}


project_button.addEventListener("click", function(){
  console.log("open project");

  var leftPanel = ".project-text";
  var rightPanel = ".project-image";

  if(projectsIsOpen){
    var projectPanel1 = ".p-section-texte";
    var projectPanel2 = ".p-section-image";
      closeLeftPanel(projectPanel1);
      closeRightPanel(projectPanel2);
      projectsIsOpen = false;
  }

  openRightPanel(rightPanel);
  openLeftPanel(leftPanel);
  console.log("open");
  onHomepage = false;
  projectOpen = true;

  /*body.style.overflow = "scroll";*/
});


project_closebutton.addEventListener("click", function(){
  var leftPanel = ".project-text";
  var rightPanel = ".project-image";
  closeRightPanel(rightPanel);
  closeLeftPanel(leftPanel);
  onHomepage = true;

});
