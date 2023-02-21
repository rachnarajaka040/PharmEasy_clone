import { navbar, menuSelector } from "../header/header.js";
import { footer } from "../Script/footer.js";

addEventListener("load", () => {
  document.querySelector("header").innerHTML = navbar();
  document.querySelector("footer").innerHTML = footer();
  let div = document.querySelectorAll(".healthcare-div-left-menuHeadings>span");
  for (let i = 0; i < div.length; i++) {
    const element = div[i];
    element.addEventListener("click", menuSelector);
  }
});

let timeoutid;
let debSearch = () => {
  let insearch = document.getElementById("insearch");
  if (timeoutid) {
    clearTimeout(timeoutid);
  }

  timeoutid = setTimeout(async () => {
    let url = `https://concerned-red-jersey.cyclic.app/medisons?q=${insearch.value}`;

    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    displayData(data);
  }, 1000);
};

let insearch = document.getElementById("insearch");
insearch.addEventListener("input", () => {
  document.getElementById("div_res").style.display = "block";
  document.body.style.overflow = 'hidden';
  debSearch();

  if(insearch.value===''){
    document.body.style.overflow = 'unset';
    document.getElementById("div_res").style.display = "none";
  }
});

document.addEventListener("click",()=>{
  document.body.style.overflow = 'unset';
    document.getElementById("div_res").style.display = "none";
})

let displayData = (obj) => {
  let div_res = document.getElementById("div_res");
  let con_res = document.createElement("div");
  let div_caption = document.createElement("div");
  let p_caption = document.createElement("p");
  div_caption.className = "div_caption";
  p_caption.className = "p_caption";
  p_caption.textContent = "Showing results for ";
  div_caption.append(p_caption);
  div_res.innerText = "";
  con_res.className = "con_res";
  obj.forEach((element) => {
    let div_item = document.createElement("div");
    let pname = document.createElement("p");
    let pdesc = document.createElement("p");
    pname.textContent = element.productname;
    pdesc.textContent = element.description;

    div_item.className = "div_item";
    pname.className = "pname";
    pdesc.className = "pdesc";

    div_item.append(pname, pdesc);

    div_item.onclick = () => {
      localStorage.setItem("medsquery", element.productname);
      window.location.href = "../pages/products.html";
    };

    con_res.append(div_item);
  });

  div_res.append(div_caption, con_res);
};



let div_serpincode = document.getElementById("div_serpincode");

div_serpincode.addEventListener("click", () => {
  // document.querySelector('.bg-modal').style.display = "flex";

  $(".drawer").drawer("open");
  getAddressData();
});

let div_btn_add_new = document.getElementById("div_btn_add_new");

div_btn_add_new.addEventListener("click", () => {
  document.querySelector(".add_dt_modal_main").style.display = "block";
  
});

let btnSaveAd = document.getElementById("btnSaveAd");
btnSaveAd.addEventListener("click", () => {
  saveAddressData();
});
let saveAddressData = () => {
  let adInname = document.getElementById("adInname");
  let adInMobile = document.getElementById("adInMobile");
  let adInPincode = document.getElementById("adInPincode");
  let adInHouse = document.getElementById("adInHouse");
  let adInStreet = document.getElementById("adInStreet");

  let adType = document.getElementsByName("adType");

  let strAdType = "";

  for (let rdtype of adType) {
    if (rdtype.checked) {
      strAdType = rdtype.value;
    }
  }

  console.log(strAdType);

  if (adInname.value === "") {
    alert("Please Enter Delivery to");
    return;
  }

  if (adInMobile.value === "") {
    alert("Please enter mobile no.");
    return;
  }

  if (adInPincode.value === "") {
    alert("Please enter pincode");
    return;
  }

  if (adInHouse.value === "") {
    alert("Please enter House no.");
    return;
  }

  if (adInStreet.value === "") {
    alert("Please enter Street Name");
    return;
  }

  if (strAdType === "") {
    alert("Please Select Address Type");
  }

  let arrAddr = JSON.parse(localStorage.getItem("addressData")) || [];

  let objAdd = {
    Delivery: adInname.value,
    Mobile: adInMobile.value,
    Pincode: adInPincode.value,
    HouseNo: adInHouse.value,
    Street: adInStreet.value,
    AdType: strAdType,
    Address: adInPincode.value + ", " + adInStreet.value,
  };

  arrAddr.push(objAdd);
  localStorage.setItem("addressData", JSON.stringify(arrAddr));
  localStorage.setItem("CurrentAd", JSON.stringify(objAdd));

  document.querySelector(".add_dt_modal_main").style.display = "none";

  $(".drawer").drawer("close");

  getCurrAdd();
};

document.getElementById("btn_close_add").addEventListener("click", () => {
  document.querySelector(".add_dt_modal_main").style.display = "none";
});

$(".drawer").on("drawer.closed", function () {
  document.querySelector(".add_dt_modal_main").style.display = "none";
});

let getCurrAdd = () => {
  let objCurr = JSON.parse(localStorage.getItem("CurrentAd")) || {};

  let hCur_pincode = document.getElementById("hCur_pincode");

  if (Object.keys(objCurr).length === 0) {
    hCur_pincode.textContent = "Pincode";
  } else {
    hCur_pincode.textContent = objCurr.Address;
  }
};

let getAddressData = () => {
  let arrAddr = JSON.parse(localStorage.getItem("addressData")) || [];
  let div_add_con = document.getElementById("div_add_cont");
  div_add_con.innerText = "";
  arrAddr.forEach((element) => {
    let div_Add = document.createElement("div");
    let div_data = document.createElement("div");

    let hhome = document.createElement("h5");
    let pdeliver = document.createElement("p");
    let phouse = document.createElement("p");
    let pstreet = document.createElement("p");
    let ppincode = document.createElement("p");
    let br = document.createElement("br");

    let img = document.createElement("img");

    img.src =
      "https://assets.pharmeasy.in/web-assets/_next/icons/home-address.svg";

    hhome.textContent = element.AdType;
    pdeliver.textContent = element.Delivery;
    phouse.textContent = element.HouseNo;
    pstreet.textContent = element.Street;
    ppincode.textContent = element.Address;

    div_data.addEventListener("click",()=>{
      localStorage.setItem("CurrentAd", JSON.stringify(element));
      

      getCurrAdd();
      $(".drawer").drawer("close");
    })

    div_Add.append(hhome, br, pdeliver, phouse, pstreet, ppincode);

    div_data.append(img, div_Add);
    div_add_con.append(div_data);
  });
};

getAddressData();
getCurrAdd();

let btnSearchmed = document.getElementById("btnSearchmed");
btnSearchmed.addEventListener("click", () => {
  let insearch = document.getElementById("insearch");
  if (insearch.value === "") {
    alert("Please Enter Valid search data");
    return;
  }

  localStorage.setItem("medsquery", insearch.value);
  window.location.href = "../pages/products.html";
});
