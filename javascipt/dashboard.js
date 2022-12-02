// Aside menu
const nav = document.querySelector(".nav"),
 navList = nav.querySelectorAll("li"),
 totalNavList = navList.length,
 allSection =document.querySelectorAll(".section"),
 totalSection = allSection.length;

 for(let i=0; i<totalNavList; i++){
    const a=navList[i].querySelector("a");
    a.addEventListener("click", function(){
        for(let j=0; j<totalNavList;j++){
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        if(window.innerWidth<1200){
            asideSectionToggleBtn();
        }
    })
 }

// update active class in nav bar
function updateNav(element){
    // console.log(element.getAttribute("href").split("#")[1])
    for(let i=0; i<totalNavList; i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

//  animation of aside menu
const navToggleBtn = document.querySelector(".nav-toggle"),
aside = document.querySelector(".aside");
navToggleBtn.addEventListener("click", ()=>{
    asideSectionToggleBtn();
})
function asideSectionToggleBtn(){
    aside.classList.toggle("open");
    navToggleBtn.classList.toggle("open");
    for(let i=0;i<totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}