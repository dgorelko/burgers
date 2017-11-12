let hamburger = document.querySelector(".nav-hamburger");
let menu = document.querySelector(".greeting__menu");
console.log(menu);
console.log(menu.style.width)
hamburger.addEventListener("click", function() {
    if(hamburger.classList.contains("nav-hamburger_active")) {
      	hamburger.classList.remove("nav-hamburger_active");

    }else{
  	    hamburger.classList.add("nav-hamburger_active");
    }
    if (menu.style.display == '') {    
        menu.style.display = 'block';
    } else{
        menu.style.display = '';
    }
});