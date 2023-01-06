function openNav(x) {
    document.getElementById("mySidenav").style.width = "250px";
    if(x===1){
      document.getElementById("mySidenav").innerHTML = `
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Clients</a>
    <a href="#">Contact</a>`;
    }else if(x===2){
      document.getElementById("mySidenav").innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`;
    }
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }