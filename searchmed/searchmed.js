import { dataObj } from "./meddata.js";

let dataobj=dataObj();

console.log(dataobj);

let timeoutid;
let debSearch=()=>{
    let insearch=document.getElementById("insearch")
    if(timeoutid){
        clearTimeout(timeoutid)
    }

    timeoutid=setTimeout(() => {
       let fildata=filterByValue(dataobj,insearch.value)
      console.log(fildata)
      displayData(fildata)
    }, 1000);


}

function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}


let insearch=document.getElementById("insearch")
insearch.addEventListener("input",()=>{
    debSearch()
})

let displayData=(obj)=>{
    let div_res=document.getElementById("div_res");
    let con_res=document.createElement("div")
    let div_caption=document.createElement("div")
    let p_caption=document.createElement("p")
    div_caption.className='div_caption'
    p_caption.className='p_caption'
    p_caption.textContent='Showing results for '
    div_caption.append(p_caption)
    div_res.innerText=""
    con_res.className='con_res'
    obj.forEach(element => {
        let div_item=document.createElement("div")
        let pname=document.createElement("p")
        let pdesc=document.createElement("p")
        pname.textContent=element.productname
        pdesc.textContent=element.description
        
        div_item.className='div_item'
        pname.className='pname'
        pdesc.className='pdesc'

        div_item.append(pname,pdesc)
        con_res.append(div_item)

        div_item.onclick=()=>{
            localStorage.setItem("pharmdata",JSON.stringify(element))
        }

    });

    div_res.append(div_caption,con_res)


}

let inSearchinput=document.getElementById("insearch")
insearch.addEventListener("input",()=>{
    document.getElementById("div_res").style.display="block";
})


