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

let medsquery = localStorage.getItem("medsquery");
let spsquery = document.getElementById("spSquery");
spsquery.textContent = medsquery;


document.title=`Order ${medsquery} Online - PharmEasy`

let fetchMedData = async () => {
  try {
    let url = `https://concerned-red-jersey.cyclic.app/medisons?q=${medsquery}`;

    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    displayData(data);

    getManufacList(data);
    getBrandList(data);
    getSortOptions(data);
  } catch (err) {
    alert(err);
    console.log(err);
  }
};
let displayData = (mdata) => {
  let cartArr = JSON.parse(localStorage.getItem("cartarr")) || [];
  let spCartCount = document.getElementById("spCartCount");
  if (cartArr.length == 1 || cartArr.length == 0) {
    spCartCount.textContent = cartArr.length + " Item";
  } else {
    spCartCount.textContent = cartArr.length + " Items";
  }

  let div_pr_card = document.querySelector(".div_pr_list_con");
  div_pr_card.innerText = "";

  mdata.forEach((element) => {
    console.log(element.manufacturer);

    let div_card = document.createElement("div");
    let div_img = document.createElement("div");
    let pimage = document.createElement("img");
    pimage.src = element.img1;
    div_img.append(pimage);

    let div_det = document.createElement("div");
    let div_head_name = document.createElement("div_head_name");
    div_head_name.id = "div_head_name";

    let pname = document.createElement("h2");
    pname.textContent = element.productname;

    let div_svg = document.createElement("div");
    div_svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-0.1 -0.1 18.4 18.4"><g fill="none" fill-rule="evenodd"><rect width="17" height="17" x=".5" y=".5" stroke="#8897A2" rx="8.5"></rect><path fill="#8897A2" fill-rule="nonzero" d="M6.337 5c.923.023 1.846.017 2.77.034.786.014 1.473.566 1.59 1.347.116.77-.029 1.489-.977 1.906-.02.009-.036.03-.094.08.325.44.65.883.992 1.349.218-.282.43-.515.592-.781.113-.186.236-.242.431-.235.367.014.734.006 1.101.009.022 0 .044.013.121.037-.21.296-.406.577-.606.855-.235.326-.46.66-.715.968-.134.162-.113.257.005.41.453.587.892 1.184 1.334 1.78.041.055.064.125.119.236-.495 0-.94.017-1.384-.012-.115-.007-.244-.136-.327-.243-.218-.276-.413-.571-.655-.912-.244.32-.495.607-.697.929-.125.198-.263.249-.468.243-.4-.013-.8-.004-1.273-.004l1.648-2.231c-.44-.607-.913-1.19-1.306-1.83-.306-.498-.712-.35-1.158-.353v2.22H6.005v-.455c0-1.66.006-3.321-.005-4.982-.002-.276.068-.371.337-.365zm1.052 1.12v1.31c.496 0 .954.007 1.412-.003.313-.006.586-.281.615-.592.03-.317-.18-.68-.49-.705-.51-.04-1.024-.01-1.537-.01z"></path></g></svg>`;

    if (element.prescription === "yes") {
      div_svg.style.display = "flex";
    } else {
      div_svg.style.display = "none";
    }

    div_head_name.append(pname, div_svg);
    let pmanufac = document.createElement("p");
    pmanufac.textContent = "By " + element.manufacturer;
    let pdesc = document.createElement("p");
    pdesc.textContent = element.description;

    let div_det_ft = document.createElement("div");

    let div_price = document.createElement("div");
    let prate = document.createElement("h3");
    prate.textContent = "₹" + element.price + "*";
    let pmrp = document.createElement("p");
    let poffer = document.createElement("span");
    pmrp.innerHTML = "MRP ₹" + `<span>${element.MRP}</span>`;
    poffer.textContent = "Save " + element.offer + "%";
    div_price.append(prate, pmrp, poffer);

    let div_btn = document.createElement("div");
    let btn_cart = document.createElement("button");
    btn_cart.textContent = "Add To Cart";

    let objInd = cartArr.findIndex((obj) => obj.id == element.id);

    if (objInd != "-1") {
      console.log(objInd);
      btn_cart.className = "btninCart";
      btn_cart.textContent = "Added To Cart";
    }

    btn_cart.addEventListener("click", () => {
      let cartArr = JSON.parse(localStorage.getItem("cartarr")) || [];
      let objInd = cartArr.findIndex((obj) => obj.id == element.id);
      if (objInd == "-1") {
        saveToCartfun(element);
        btn_cart.className = "btninCart";
        btn_cart.textContent = "Added To Cart";

        let spCartCount = document.getElementById("spCartCount");
        if (cartArr.length == 1 || cartArr.length == 0) {
          spCartCount.textContent = cartArr.length+1 + " Item";
        } else {
          spCartCount.textContent = cartArr.length+1 + " Items";
        }
      } else {
        alert("Item Already Added To Cart");
      }
    });

    div_btn.append(btn_cart);

    div_det_ft.append(div_price, div_btn);

    div_det.append(div_head_name, pmanufac, pdesc, div_det_ft);

    div_det.className = "div_pr_details";
    div_card.append(div_img, div_det);
    div_card.className = "div_pr_card";
    div_pr_card.append(div_card);
  });
};
fetchMedData();

let saveToCartfun = (elObj) => {
  let cartArr = JSON.parse(localStorage.getItem("cartarr")) || [];

  cartArr.push(elObj);

  localStorage.setItem("cartarr", JSON.stringify(cartArr));
};

let getManufacList = (mdata) => {
  let manList = mdata
    .map((obj) => obj.manufacturer)
    .filter((val, ind, self) => self.indexOf(val) === ind);

  //  console.log(manList);

  let divrdman = document.getElementById("div_rdman");
  divrdman.innerText = "";
  for (let index = 0; index < manList.length; index++) {
    const element = manList[index];
    let inRdo = document.createElement("input");
    inRdo.type = "radio";
    inRdo.name = "man";
    inRdo.id = "man" + index;
    inRdo.value = element;

    let lblman = document.createElement("label");
    lblman.htmlFor = "man" + index;
    lblman.textContent = element;

    lblman.addEventListener("click", () => {
      // funFilterMan(mdata,element)
      fetchFilteredData(
        `https://concerned-red-jersey.cyclic.app/medisons?manufacturer=${element}&q=${medsquery}`
      );
    });

    divrdman.append(inRdo, lblman);
  }
};
let getBrandList = (mdata) => {
  let manList = mdata
    .map((obj) => obj.Brand)
    .filter((val, ind, self) => self.indexOf(val) === ind);

  console.log(manList);

  let divrdman = document.getElementById("div_rdbrand");
  divrdman.innerText = "";
  for (let index = 0; index < manList.length; index++) {
    const element = manList[index];
    let inRdo = document.createElement("input");
    inRdo.type = "radio";
    inRdo.name = "brand";
    inRdo.id = "brand" + index;
    inRdo.value = element;

    let lblman = document.createElement("label");
    lblman.htmlFor = "brand" + index;
    lblman.textContent = element;

    lblman.addEventListener("click", () => {
      fetchFilteredData(
        `https://concerned-red-jersey.cyclic.app/medisons?Brand=${element}&q=${medsquery}`
      );
    });

    divrdman.append(inRdo, lblman);
  }
};

let fetchFilteredData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data);
    displayData(data);
    getSortOptions(data);
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

let funFilterMan = (filstr) => {
  let filmanArr = mdata.filter((el) => {
    return el.manufacturer === filstr;
  });

  //console.log(filmanArr)
  displayData(filmanArr);
};

let getSortOptions = (mdata) => {
  let divrdman = document.getElementById("div_rdSortprice");

  divrdman.innerText = "";

  let inRdo = document.createElement("input");
  inRdo.type = "radio";
  inRdo.name = "sortprice";
  inRdo.id = "sortpLH";
  inRdo.value = "LH";

  let lbllw = document.createElement("label");
  lbllw.htmlFor = "sortpLH";
  lbllw.textContent = "Low to High";

  lbllw.addEventListener("click", () => {
    sortByPriceLH(mdata);
    console.log("lww");
  });

  let inRdohl = document.createElement("input");
  inRdohl.type = "radio";
  inRdohl.name = "sortprice";
  inRdohl.id = "sortpHL";
  inRdohl.value = "HL";

  let lblhl = document.createElement("label");
  lblhl.htmlFor = "sortpHL";
  lblhl.textContent = "High to Low";

  lblhl.addEventListener("click", () => {
    sortByPriceHL(mdata);
  });

  divrdman.append(inRdo, lbllw, inRdohl, lblhl);
};

let sortByPriceLH = (data) => {
  let srtArr = data.sort((a, b) => {
    return a.price - b.price;
  });

  displayData(srtArr);
};

let sortByPriceHL = (data) => {
  let srtArr = data.sort((a, b) => {
    return b.price - a.price;
  });
  displayData(srtArr);
};

let btn_pr_viewcart = document.getElementById("btn_pr_viewcart");
btn_pr_viewcart.addEventListener("click", () => {
  window.location.href = "../pages/cart.html";
});

/*
let funFilterMan=(mdata,filstr)=>{

    let filmanArr=mdata.filter((el)=>{
        return el.manufacturer===filstr
    })

    //console.log(filmanArr)
    displayData(filmanArr)
}
let funFilterbrand=(mdata,filstr)=>{

    let filmanArr=mdata.filter((el)=>{
        return el.Brand===filstr
    })

    console.log(filmanArr)
    displayData(filmanArr)
}

*/

//https://concerned-red-jersey.cyclic.app/medisons?Brand=DOLO&q=dolo
