
import { navbar, menuSelector } from "./header/header.js"

addEventListener("load", () => {
  document.querySelector("header").innerHTML = navbar();
  let div = document.querySelectorAll(".healthcare-div-left-menuHeadings>span");
  for (let i = 0; i < div.length; i++) {
    const element = div[i];
    element.addEventListener("click", menuSelector);
  }
});

// jquary for  card slider slider
// $(document).ready(function(){
//   $('.top-navbar-slider').slick({

//   });
// });