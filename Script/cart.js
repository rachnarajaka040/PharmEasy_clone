
// importing header and footer
import { navbar, menuSelector } from "../Header/header.js";
import { footer } from "../Script/footer.js";
// let Users = JSON.parse(localStorage.getItem("Users")) || [];

addEventListener("load", () => {
  document.querySelector("header").innerHTML = navbar();
  document.querySelector("footer").innerHTML = footer();

  let div = document.querySelectorAll(".healthcare-div-left-menuHeadings>span");
  for (let i = 0; i < div.length; i++) {
    const element = div[i];
    element.addEventListener("click", menuSelector);
  }
  // document.querySelector(".log-in-link").addEventListener("click", () => {
  //   document.querySelector(".bg-login-model").style.display = "flex";
  // });
});





var cartarr = JSON.parse(localStorage.getItem("cartarr")) || [];

function append(cartarr) {
  let noOfItems = document.querySelector(".cart-left-noOfItems");
  let div = document.querySelector(".cart-left-cartItems");
  div.innerHTML = null;
  if (cartarr.length == 0) {
    noOfItems.textContent = 0;
    let emptycartDiv = document.createElement("div");
    emptycartDiv.setAttribute("class", "emptyCartDiv");
    let img = document.createElement("img");
    img.src = "https://assets.pharmeasy.in/web-assets/images/emptyCart.png";
    let heading = document.createElement("p");
    heading.setAttribute("class", "emptyCartHeading");
    heading.textContent = "Your Medicine/Healthcare cart is empty!";
    emptycartDiv.append(img, heading);
    div.append(emptycartDiv);
    billing(cartarr);
  } else {
    let totalItems = cartarr.reduce(
      (total, element) => +element.quantity + total,
      0
    );
    noOfItems.textContent = totalItems;
    cartarr.map((element, index) => {
      let {
        productname,
        price,
        MRP,
        offer,
        description,
        manufacturer,
        img1,
        quantity,
      } = element;
      let card = document.createElement("div");
      card.setAttribute("class", "cart-itemsCard");
      let imgDiv = document.createElement("div");
      imgDiv.setAttribute("class", "cart-imgDiv");
      let details = document.createElement("div");
      details.setAttribute("class", "cart-detailsDiv");
      let description1 = document.createElement("div");
      description1.setAttribute("class", "cart-description");
      let priceDiv = document.createElement("div");
      priceDiv.setAttribute("class", "cart-priceDiv");
      let deleteDiv = document.createElement("div");
      deleteDiv.setAttribute("class", "cart-deleteDiv");
      let quantityDiv = document.createElement("div");
      quantityDiv.setAttribute("class", "cart-quantityDiv");

      let quantity1 = document.createElement("div");
      quantity1.setAttribute("class", "cartQty");
      let numberItemInput = document.createElement("div");
      let numberItem = document.createElement("p");
      numberItem.textContent = quantity;
      let numberItemIncrease = document.createElement("button");
      numberItemIncrease.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
      let numberItemDecrease = document.createElement("button");
      numberItemDecrease.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;

      numberItemInput.append(numberItem);
      quantity1.append(numberItemIncrease, numberItemInput, numberItemDecrease);
      numberItemIncrease.addEventListener("click", () => {
        quantityIncrease(index);
      });

      numberItemDecrease.addEventListener("click", () => {
        quantityDecrease(index);
      });

      let deletebtn = document.createElement("button");
      deletebtn.setAttribute("class", "deletebtn");
      deletebtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
      deletebtn.addEventListener("click", () => {
        remove(index);
      });

      let img = document.createElement("img");
      img.src = img1;

      let name = document.createElement("p");
      let manuName = document.createElement("p");
      let desc = document.createElement("p");
      let mrp = document.createElement("h3");
      let price1 = document.createElement("h3");
      let off = document.createElement("span");

      name.textContent = productname;
      manuName.textContent = `By ${manufacturer}`;
      desc.textContent = description;
      mrp.textContent = `₹${MRP}`;
      price1.textContent = `₹${price}`;
      off.textContent = `${offer}% OFF`;

      imgDiv.append(img);
      priceDiv.append(mrp, price1, off);
      description1.append(name, manuName, desc, priceDiv);
      deleteDiv.append(deletebtn);
      quantityDiv.append(quantity1);
      details.append(description1, deleteDiv, quantityDiv);
      card.append(imgDiv, details);
      div.append(card);
    });

    billing(cartarr);
  }
}

function billing(cartarr) {
  if (cartarr.length < 1) {
    var cartTotal = 0;
    localStorage.setItem("CartTotal", cartTotal);
    document.querySelector(".cart-right-upper-itemTotal").textContent = "00.00";
    let div = document.querySelector(".cart-right-lower");
    div.setAttribute("class", "nodisplay");
  } else {
    let div = document.querySelector(".cart-right-lower");
    if (div.classList.contains("nodisplay")) {
      div.removeAttribute("class", "nodisplay");
    }

    let carttotal = cartarr.reduce(
      (total, element) => +(element.price * element.quantity) + total,
      0
    );

    var cartTotal = carttotal.toFixed(2);
    localStorage.setItem("CartTotal", cartTotal);
    document.querySelector(
      ".cart-right-upper-itemTotal"
    ).textContent = `₹${carttotal.toFixed(2)}`;
    document.querySelector(
      ".cart-right-lower-itemTotal"
    ).textContent = `₹${carttotal.toFixed(2)}`;
    document.querySelector(
      ".cart-right-lower-tobePaid"
    ).textContent = `₹${carttotal.toFixed(2)}`;
  }
}

function remove(index) {
  event.target.parentNode.remove();
  cartarr.splice(index, 1);
  localStorage.setItem("cartarr", JSON.stringify(cartarr));
  append(cartarr);
}

function quantityIncrease(index) {
  cartarr[index].quantity++;
  localStorage.setItem("cartarr", JSON.stringify(cartarr));
  append(cartarr);
}

function quantityDecrease(index) {
  if (cartarr[index].quantity <= 1) {
    remove(index);
  } else {
    cartarr[index].quantity--;
    localStorage.setItem("cartarr", JSON.stringify(cartarr));
    append(cartarr);
  }
}

addEventListener("load", function () {
  // get the add more products button here and add eventlisteners
  // onload invoke append function m
  append(cartarr);
});

document
  .querySelector(".proceedToCheckout-btn")
  .addEventListener("click", toCheckoutPage);

function toCheckoutPage() {
  if (cartarr.length > 0) {
    window.location.href = "../Pages/payment.html";
  }
}
