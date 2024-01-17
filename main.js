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

//let p_direction = true;
let isInformationPageOpen = false;
let isProjectsPageOpen = false;
let isProjectPageOpen = false;
const duration = 1;


const projectSelectionButton = document.querySelector(".nav-projects");

projectSelectionButton.addEventListener("click", function(){
  
  var panel1 = ".projectSectionTexte";
  var panel2 = ".projectSectionImage";
  if(isProjectPageOpen){
    if(!isProjectsPageOpen){
      openLeftPanel(panel1);
      openRightPanel(panel2);
      isProjectsPageOpen = true;
    }
    var p_leftPanel = ".project-text";
    var p_rightPanel = ".project-image";
    closeRightPanel(p_rightPanel);
    //closeLeftPanel(p_leftPanel);
    hideProjectPageLeft();
    isProjectPageOpen = false;
    

  }else{
    
      if(!isProjectsPageOpen){
        if(isInformationPageOpen){
            let infoPanel = ".i-section";
            closeRightPanel(infoPanel);
            isInformationPageOpen = false;
        }
      openLeftPanel(panel1);
      openRightPanel(panel2);
      onHomepage = false;
      }else{
      closeLeftPanel(panel1);
      closeRightPanel(panel2);
      onHomepage = true;
      }
  isProjectsPageOpen = !isProjectsPageOpen;
  }
  

});
const homeButton = document.querySelector(".nav-title");
homeButton.addEventListener("click", function(){
  if(isInformationPageOpen) {
    var infoPanel = ".i-section";
    closeRightPanel(infoPanel);
    isInformationPageOpen = false;
  }

  if(isProjectsPageOpen){
    var projectPanelLeft = ".projectSectionTexte";
    var projectPanelRight = ".projectSectionImage";
    closeLeftPanel(projectPanelLeft);
    closeRightPanel(projectPanelRight);
    isProjectsPageOpen = false;

    if(isProjectPageOpen){
      var projectPanelLeft = ".project-text";
      var projectPanelRight = ".project-image";
      closeRightPanel(projectPanelRight);
      hideProjectPageLeft();
      isProjectPageOpen = false;
      
    }
  }
  
  
  onHomepage = true;
 
});

const infoButton = document.querySelector(".nav-infos");
infoButton.addEventListener("click", function(){
    var infoPanel = ".i-section";
 
    if(!isInformationPageOpen){
        if(isProjectsPageOpen){
          var projectPanel1 = ".projectSectionTexte";
          var projectPanel2 = ".projectSectionImage";
            closeLeftPanel(projectPanel1);
            closeRightPanel(projectPanel2);
            isProjectsPageOpen = false;
        }
        onHomepage = false;
        
        openRightPanel(infoPanel);
    }else{
      onHomepage = true;
        closeRightPanel(infoPanel);
    }
    isInformationPageOpen = !isInformationPageOpen;
    
});

var projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(function(link) {

  link.addEventListener('mouseover',function(event){
    let imageProjectCover = document.querySelector(".img-project");
    imageProjectCover.style.opacity = 1;
  });

  link.addEventListener('mouseout',function(event){
    let imageProjectCover = document.querySelector(".img-project");
    imageProjectCover.style.opacity = 0;
  });

  link.addEventListener('click', function(event) {


  var leftPanel = ".project-text";
  var leftPanelObjet = document.querySelector(".project-text");
  var rightPanel = ".project-image";

  /*if(projectsIsOpen){
    var projectPanel1 = ".projectSectionTexte";
    var projectPanel2 = ".projectSectionImage";
      closeLeftPanel(projectPanel1);
      closeRightPanel(projectPanel2);
      projectsIsOpen = false;
  }*/

  openRightPanel(rightPanel);
  leftPanelObjet.style.visibility = 'visible';
  onHomepage = false;
  isProjectPageOpen = true;


  });

});
const openProjectButton = document.querySelector(".project-link");

openProjectButton.addEventListener("click", function(){

  var leftPanel = ".project-text";
  var leftPanelObjet = document.querySelector(".project-text");
  var rightPanel = ".project-image";
  
  /*if(isProjectsPageOpen){
    var projectPanel1 = ".projectSectionTexte";
    var projectPanel2 = ".projectSectionImage";
      closeLeftPanel(projectPanel1);
      closeRightPanel(projectPanel2);
      isProjectsPageOpen = false;
  }*/

  openRightPanel(rightPanel);
  leftPanelObjet.style.visibility = 'visible';
  //openLeftPanel(leftPanel);
  onHomepage = false;
  isProjectPageOpen = true;
  // infoButton.style.visibility = 'hidden';

});

const closeProjectbutton = document.querySelector(".close-btn");

closeProjectbutton.addEventListener("click", function(){
  closeProjectPage();
});

const buttontitle = document.querySelector(".project-title");

buttontitle.addEventListener("click", function(){
  closeProjectPage();
  
});

function closeProjectPage(){

  var leftPanel = ".project-text";
  var rightPanel = ".project-image";
  closeRightPanel(rightPanel);
  hideProjectPageLeft();
  //closeLeftPanel(leftPanel);
  
  onHomepage = true;

  if(!isProjectsPageOpen){
    var projectPanel1 = ".projectSectionTexte";
    var projectPanel2 = ".projectSectionImage";
    openLeftPanel(projectPanel1);
    openRightPanel(projectPanel2);
    isProjectsPageOpen = true;
  }
  // infoButton.style.visibility = 'visible';
  isProjectPageOpen = false;

}

function hideProjectPageLeft(){
  var leftPanelObjet = document.querySelector(".project-text");
  leftPanelObjet.style.visibility = 'hidden';

}


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





// vidéo player 
