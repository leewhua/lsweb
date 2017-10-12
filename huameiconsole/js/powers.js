$(function(){
   var username = sessionStorage.getItem("username");
   // console.log(username);
    $('#sideBar').find('li').eq(3).remove();
    if( username == "huamei" || username == "hmassist"){
        $('#sideBar').find('li').eq(3).remove();
    // $('#sideBar').find('li').eq(2).remove();
    }
    if( username == "hmcw"){
        $('#sideBar').find('li').eq(3).remove();
    }
});