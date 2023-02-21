import { footer } from "../Script/footer.js";
let Users = JSON.parse(localStorage.getItem("Users")) || [];

addEventListener("load", () => {
  document.querySelector("footer").innerHTML = footer();

  let div = document.querySelectorAll(".healthcare-div-left-menuHeadings>span");
  for (let i = 0; i < div.length; i++) {
    const element = div[i];
    element.addEventListener("click", menuSelector);
  }
  document.querySelector(".log-in-link").addEventListener("click", () => {
    document.querySelector(".bg-login-model").style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});



// LogIn Function

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".bg-login-model").style.display = "none";
  document.body.style.overflow = "auto";
});
var log = false;
document.querySelector("#loginform").addEventListener("submit", login);
function login() {
  event.preventDefault();
  let form = document.getElementById("loginform");
  let Email = form.UsearEmail.value;
  let Password = form.UserPassword.value;
  console.log(Email, Password);
  for (let i = 0; i < Users.length; i++) {
    if (Users[i].Email == Email && Users[i].Password == Password) {
      alert("login Successful!");
      localStorage.setItem("User", JSON.stringify(Users[i]));
      document.querySelector(".bg-login-model").style.display = "none";
      document.body.style.overflow = "auto";
      log = true;
      break;
    }
  }
  if (log == false) {
    alert("login failed!");
  }
}
const movetoregister = () => {
  document.querySelector(".bg-login-model").style.display = "none";
  document.querySelector(".bg-signup-modal").style.display = "flex";
};

document.querySelector(".to-Sign-up").addEventListener("click", movetoregister);

// SignUp Function

document.querySelector(".close-sign-up").addEventListener("click", function () {
  document.querySelector(".bg-signup-modal").style.display = "none";
  document.body.style.overflow = "auto";
});

document.querySelector("#Signupform").addEventListener("submit", register);
function register() {
  event.preventDefault();
  let form = document.getElementById("Signupform");
  let First = form.UserFirstName_signup.value;
  let Last = form.UserLastName_signup.value;
  let Email = form.UsearEmail_signup.value;
  let Password = form.UserPassword_signup.value;
  let user = {
    First,
    Last,
    Email,
    Password,
  };
  console.log(First, Last, Email, Password);
  if ((First !== "") & (Last !== "") & (Email !== "") & (Password !== "")) {
    let Users = JSON.parse(localStorage.getItem("Users")) || [];
    Users.push(user);
    localStorage.setItem("Users", JSON.stringify(Users));
    document.querySelector(".bg-signup-modal").style.display = "none";
    document.querySelector(".bg-login-model").style.display = "flex";
  } else {
    alert(" Please Enter All Information");
  }
}

function menuSelector() {
  let div = document.querySelectorAll(".menuItems");
  console.log(event.target.className);

  for (let i = 0; i < div.length; i++) {
    const element = div[i];

    if (event.target.className == element.classList[0]) {
      element.classList.add("configFlexDisplay");
    } else {
      element.classList.remove("configFlexDisplay");
    }
  }
}

// jquary for  card slider slider
// $(document).ready(function(){
//   $('.top-navbar-slider').slick({

//   });
// });
