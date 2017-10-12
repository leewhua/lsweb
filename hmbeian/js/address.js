$(function () {
    $('body').height($('body')[0].clientHeight);
    var prompt = $('#prompt');
    $('#submit').click(function () {
        var name = $('#nameIpt').val().trim();
        var sheng = $('#sheng').val().trim();
        var shi = $('#shi').val().trim();
        var xian = $('#xian').val().trim();
        var add= $('#add').val().trim();
        var phone = $('#phoneNum').val().trim();
       if( name == "" ){
           console.log("name为空");
           console.log("prompt：" + prompt);
           promptFun();
           prompt.find('span').text("姓名 不能为空！");

       }else if( sheng == "" ){
           promptFun();
           prompt.find('span').text("省/直辖市 不能为空！");
       }else if(sheng.indexOf("西藏") != -1 || sheng.indexOf("青海") != -1 || sheng.indexOf("新疆") != -1){
           promptFun();
           prompt.find('span').text("西藏、青海、新疆暂不支持兑换收货!");
       }else if( shi == "" ){
           promptFun();
           prompt.find('span').text("市 不能为空！");
       }else if( xian == "" ){
           promptFun();
           prompt.find('span').text("县/区 不能为空！");
       }else if( add == ""){
           promptFun();
           prompt.find('span').text("详细地址 不能为空！");
       }else if(phone == ""){
           promptFun();
           prompt.find('span').text("手机号码 不能为空！");
       }else if(phone.length != 11){
           promptFun();
           prompt.find('span').text("手机号码 必须11位！");
       }else{
           // window.open("order-number.html");
           window.location.href = "order-number.html";
            // $.ajax({
            //     type: "POST",
            //     url: "",
            //     data:{},
            //     timeout: 5000,
            //     success: function (data) {
            //
            //     },
            //     complete: function (XMLHttpRequest, status) {
            //         if(status == "timeout"){
            //             alert("网络请求超时，刷新一下，稍后再试！");
            //         }
            //     }
            // });
       }

    });

    function promptFun(){
        prompt.find('span').text("");
        prompt.fadeIn();
        prompt.animate({
            "top": "50%"
        },1000,function(){
            $(this).hide();
            $(this).css("top", "55%");
        });
    }

});