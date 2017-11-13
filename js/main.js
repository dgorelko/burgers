let hamburger = document.querySelector(".nav-hamburger");
let menu = document.querySelector(".greeting__menu");

hamburger.addEventListener("click", function() {
    if(hamburger.classList.contains("nav-hamburger_active")) {
          hamburger.classList.remove("nav-hamburger_active");
          menu.classList.remove("greeting__menu_active");

    }else{
          hamburger.classList.add("nav-hamburger_active");
          menu.classList.add("greeting__menu_active");
    }
});