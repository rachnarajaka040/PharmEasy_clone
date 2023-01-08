let medsquery=localStorage.getItem("medsquery")
let spsquery=document.getElementById("spSquery")
spsquery.textContent=medsquery


let fetchMedData= async()=>{
    let url=`https://concerned-red-jersey.cyclic.app/medisons?q=${medsquery}`

    let res=await fetch(url)
    let data= await res.json();
    console.log(data);
    displayData(data)

    getManufacList(data)
    getBrandList(data)
    getSortOptions(data)

}
let displayData=(mdata)=>{

    let cartArr=JSON.parse(localStorage.getItem("cartarr")) || []
    let spCartCount=document.getElementById("spCartCount")
    if(cartArr.length==1 || cartArr.length==0){
        spCartCount.textContent=cartArr.length+" Item"
    }else{
        spCartCount.textContent=cartArr.length+" Items"
    }


    let div_pr_card=document.querySelector(".div_pr_list_con")
    div_pr_card.innerText=''

    mdata.forEach(element => {
        console.log(element.manufacturer)

        let div_card=document.createElement("div")
        let div_img=document.createElement("div")
        let pimage=document.createElement("img")
        pimage.src=element.img1
        div_img.append(pimage)
        
        let div_det=document.createElement("div")
        let pname=document.createElement("h2")
        pname.textContent=element.productname
        let pmanufac=document.createElement("p")
        pmanufac.textContent="By "+element.manufacturer
        let pdesc=document.createElement("p")
        pdesc.textContent=element.description

        let div_det_ft=document.createElement("div")

        let div_price=document.createElement("div")
        let prate=document.createElement("h3")
        prate.textContent="₹"+element.price+"*"
        let pmrp=document.createElement("p")
        let poffer=document.createElement("span")
        pmrp.innerHTML="MRP ₹"+`<span>${element.MRP}</span>`
        poffer.textContent="Save "+element.offer+"%"
        div_price.append(prate,pmrp,poffer)

        let div_btn=document.createElement("div")
        let btn_cart=document.createElement("button")
        btn_cart.textContent="Add To Cart"
      

        
        let objInd=cartArr.findIndex((obj=>obj.id==element.id))
        

        if(objInd!="-1"){
            console.log(objInd)
            btn_cart.className="btninCart"
            btn_cart.textContent="Added To Cart"
        }

        btn_cart.addEventListener("click",()=>{
            let cartArr=JSON.parse(localStorage.getItem("cartarr")) || []
            let objInd=cartArr.findIndex((obj=>obj.id==element.id))
           if(objInd=='-1'){
            saveToCartfun(element)
            btn_cart.className="btninCart"
            btn_cart.textContent="Added To Cart"
           }else{
            alert("Item Already Added To Cart")
           }
        })


        div_btn.append(btn_cart)



        div_det_ft.append(div_price,div_btn)

        div_det.append(pname,pmanufac,pdesc,div_det_ft,)
        
        div_det.className="div_pr_details"
        div_card.append(div_img,div_det)
        div_card.className="div_pr_card"
        div_pr_card.append(div_card)
    });
}
fetchMedData();

let saveToCartfun=(elObj)=>{
    let cartArr=JSON.parse(localStorage.getItem("cartarr")) || []

    cartArr.push(elObj)

    localStorage.setItem("cartarr",JSON.stringify(cartArr))
}


let getManufacList=(mdata)=>{

    let manList=mdata.map((obj)=> obj.manufacturer)
    .filter((val,ind,self)=> self.indexOf(val)===ind)



  //  console.log(manList);

    let divrdman=document.getElementById("div_rdman")
    divrdman.innerText=''
     for (let index = 0; index < manList.length; index++) {
        const element = manList[index];
        let inRdo=document.createElement("input")
        inRdo.type="radio"
        inRdo.name="man"
        inRdo.id="man"+index
        inRdo.value=element

        let lblman=document.createElement("label")
        lblman.htmlFor="man"+index
        lblman.textContent=element

        lblman.addEventListener("click",()=>{
           // funFilterMan(mdata,element)
           fetchFilteredData(
            `https://concerned-red-jersey.cyclic.app/medisons?manufacturer=${element}&q=${medsquery}`
           )
        })

        divrdman.append(inRdo,lblman)

        
     }
}
let getBrandList=(mdata)=>{

    let manList=mdata.map((obj)=> obj.Brand)
    .filter((val,ind,self)=> self.indexOf(val)===ind)



    console.log(manList);

    let divrdman=document.getElementById("div_rdbrand")
    divrdman.innerText=''
     for (let index = 0; index < manList.length; index++) {
        const element = manList[index];
        let inRdo=document.createElement("input")
        inRdo.type="radio"
        inRdo.name="brand"
        inRdo.id="brand"+index
        inRdo.value=element

        let lblman=document.createElement("label")
        lblman.htmlFor="brand"+index
        lblman.textContent=element

        lblman.addEventListener("click",()=>{
            fetchFilteredData(
                `https://concerned-red-jersey.cyclic.app/medisons?Brand=${element}&q=${medsquery}`
               )
        })

        divrdman.append(inRdo,lblman)

        
     }
}


let fetchFilteredData= async(url)=>{
    let res=await fetch(url)
    let data= await res.json();
   // console.log(data);
    displayData(data)
    getSortOptions(data)
    

}



let funFilterMan=(filstr)=>{

    let filmanArr=mdata.filter((el)=>{
        return el.manufacturer===filstr
    })

    //console.log(filmanArr)
    displayData(filmanArr)
}

let getSortOptions=(mdata)=>{

   


    

    let divrdman=document.getElementById("div_rdSortprice")

    divrdman.innerText=''
        
        let inRdo=document.createElement("input")
        inRdo.type="radio"
        inRdo.name="sortprice"
        inRdo.id="sortpLH"
        inRdo.value="LH"

        let lbllw=document.createElement("label")
        lbllw.htmlFor="sortpLH"
        lbllw.textContent="Low to High"

        lbllw.addEventListener("click",()=>{
            sortByPriceLH(mdata)
            console.log("lww")
        })


        let inRdohl=document.createElement("input")
        inRdohl.type="radio"
        inRdohl.name="sortprice"
        inRdohl.id="sortpHL"
        inRdohl.value="HL"

        let lblhl=document.createElement("label")
        lblhl.htmlFor="sortpHL"
        lblhl.textContent="High to Low"

        lblhl.addEventListener("click",()=>{
            sortByPriceHL(mdata)
        })





        divrdman.append(inRdo,lbllw,inRdohl,lblhl)

        
     
}


let sortByPriceLH=(data)=>{

    let srtArr=data.sort((a,b)=>{
        return a.price - b.price
    })

    displayData(srtArr)
}

let sortByPriceHL=(data)=>{

    let srtArr=data.sort((a,b)=>{
        return b.price - a.price
    })
    displayData(srtArr)
}


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