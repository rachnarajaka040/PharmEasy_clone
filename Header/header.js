function navbar() {
  return `<div class="navbar">
  <div class="upper">
    <a href="../index.html" class="logo"
      ><img src="../assets/logo_big.svg" alt="Logo"
    /></a>
    <div class="search-bar">
      <div class="search-bar-container">
        <img src="../assets/search_logo.png" alt="searchLogo" />
        <input
          type="text"
          class="search"
          placeholder="Search for Medicine and Healthcare items"
        />
        <button class="search-btn">Search</button>
      </div>
    </div>
    <div class="link-section">
      <div class="log-in-link">
        <a href="#" class="login-sidebar-link">
          <img src="../assets/login_logo.png" alt="login" />
          <span>Hello, Log in</span>
        </a>
      </div>
      <div class="offers-link">
        <a href="#">
          <img src="../assets/discount_logo.png" alt="discount" />
          <span>Offers</span>
        </a>
      </div>
      <div class="cart-link">
        <a href="./cart.html">
          <img src="../assets/cart_logo.png" alt="cart" />
          <span>Cart</span>
        </a>
      </div>
    </div>
  </div>
  <hr />
  <div class="lower">
    <a href="./searchmed.html">
      <span>Medicine</span>
    </a>
    <details>
      <summary>
        <span>Healthcare</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1px"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M16.6 8.6L12 13.2 7.4 8.6 6 10l6 6 6-6z"
          ></path>
        </svg>
      </summary>
      <div class="healthcare-div">
        <div class="healthcare-div-left">
          <div class="healthcare-div-left-menuHeadings">
            <span class="A101">Covid Essentials</span>
            <span class="A102">Mega Clearance Sale</span>
            <span class="A103">Personal Care</span>
            <span class="A104">Healthcare Devices</span>
            <span class="A105">Health Food and Drinks</span>
          </div>
        </div>
        <div class="healthcare-div-right">
          <div class="healthcare-div-right-menuLinks">
            <div class="A101 menuItems configFlexDisplay">
              <div>
                <p>Covid Test Kits</p>
                <span>All Covid Test Kits</span>
              </div>
              <div>
                <p>Disinfectants</p>
                <span>All Disinfectants</span>
              </div>
              <div>
                <p>Home Hygiene Essentials</p>
                <span>All Home Hygiene Essentials</span>
              </div>
              <div>
                <p>Masks</p>
                <span>All Masks</span>
              </div>
              <div>
                <p>Hand Sanitizers</p>
                <span>All Hand Sanitizers</span>
              </div>
              <div>
                <p>Hand Wash</p>
                <span>All Hand Wash</span>
              </div>
              <div>
                <p>Gloves</p>
                <span>All Gloves</span>
              </div>
              <div>
                <p>Immunity Boosters</p>
                <span>All Immunity Boosters</span>
              </div>
              <div>
                <p>Devices</p>
                <span>All Devices</span>
              </div>
              <div>
                <p>Toilet Essentials</p>
                <span>All Toilet Essentials</span>
              </div>
              <div>
                <p>Offers - Covid Essentials</p>
                <span>All Offers - Covid Essentials</span>
              </div>
              <div>
                <p>Cold & Cough</p>
                <span>All Cold & Cough</span>
              </div>
            </div>
            <div class="A102 menuItems">
              <div>
                <p>Mega Clearance Sale</p>
                <span>All Mega Clearance Sale</span>
              </div>
            </div>
            <div class="A103 menuItems">
              <div>
                <p>Men Care</p>
                <span>All Men Care</span>
              </div>
              <div>
                <p>Appliances</p>
                <span>All Appliances</span>
              </div>
              <div>
                <p>Women Care</p>
                <span>All Women Care</span>
              </div>
              <div>
                <p>Oral Care</p>
                <span>All Oral Care</span>
              </div>
              <div>
                <p>Male grooming</p>
                <span>All Male grooming</span>
              </div>
              <div>
                <p>Hair Care</p>
                <span>All Hair Care</span>
              </div>
              <div>
                <p>Face Care</p>
                <span>All Face Care</span>
              </div>
              <div>
                <p>Body Care</p>
                <span>All Body Care</span>
              </div>
              <div>
                <p>Hands & Feet</p>
                <span>All Hands & Feet</span>
              </div>
            </div>
            <div class="A104 menuItems">
              <div>
                <p>Glucometer</p>
                <span>All Glucometer</span>
              </div>
              <div>
                <p>BP Monitors</p>
                <span>All BP Monitors</span>
              </div>
              <div>
                <p>Oximeter</p>
                <span>All Oximeter</span>
              </div>
              <div>
                <p>Covid Kits</p>
                <span>All Covid Kits</span>
              </div>
              <div>
                <p>Air Mattress</p>
                <span>All Air Mattress</span>
              </div>
              <div>
                <p>Body Massager</p>
                <span>All Body Massager</span>
              </div>
              <div>
                <p>Nebulizer</p>
                <span>All Nebulizer</span>
              </div>
              <div>
                <p>Spirometers</p>
                <span>All Spirometers</span>
              </div>
              <div>
                <p>Trimmers</p>
                <span>All Trimmers</span>
              </div>
            </div>
            <div class="A105 menuItems">
              <div>
                <p>Nutritional Drinks</p>
                <span>All Nutritional Drinks</span>
              </div>
              <div>
                <p>Health Food</p>
                <span>All Health Food</span>
              </div>
              <div>
                <p>Diabetic Care</p>
                <span>All Diabetic Care</span>
              </div>
              <div>
                <p>Beverages</p>
                <span>All Beverages</span>
              </div>
              <div>
                <p>Weight Management</p>
                <span>All Weight Management</span>
              </div>
              <div>
                <p>Ayurvedic Foods & Juices</p>
                <span>All Ayurvedic Foods & Juices</span>
              </div>
              <div>
                <p>Baby Food</p>
                <span>All Baby Food</span>
              </div>
              <div>
                <p>Pregnancy Nutrition</p>
                <span>All Pregnancy Nutrition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>
    <a href="#">
      <span>Lab Tests</span>
    </a>
    <a href="#">
      <span>Offers</span>
    </a>
    <a href="#">
      <span>PLUS</span>
    </a>
    <a href="#">
      <span>Health Blogs</span>
    </a>
  </div>
  <hr />
</div>`;
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

export { navbar, menuSelector };

// for adding navbar in page first add header tag in html page
// import navbar and menuSelector function into script File
// add following line of code into the script file: -

// addEventListener("load", () => {
//   document.querySelector("header").innerHTML = navbar();
//   let div = document.querySelectorAll(".healthcare-div-left-menuHeadings>span");
//   for (let i = 0; i < div.length; i++) {
//     const element = div[i];
//     element.addEventListener("click", menuSelector);
//   }
// });
