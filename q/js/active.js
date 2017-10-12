$(function () {
    var api="http://coeasion.cn/";
    var user_ticket = "";
    var status_ticket;
    var new_ticket;
    // var count=0;

    function getTicket(){
        var url = window.location.href.split("?")[1];
        console.log("url:" + url);
        if(url){
            url = url.substring(0, 32);
            user_ticket = url;
            console.log(url + " ticket.length:" + url.length);
            return true;
        }else {
            return false;
        }
    }
    getTicket();

    //弹出层
    function layerPop(){
        layer.open({
            type: 1,
            title: 0,
//          closeBtn: 0,
            scrollbar: false,
//            shadeClose: true,
            content: $('#popup')
        });
    }
    function reasonChecked(json){
//		var text = $('#popup').text();invalidticket
        if(json.reason.indexOf("expireticket") >= 0) {
            $('#popup').html("");
            $('#popup').html("操作过期，请重新扫码！");
            layerPop();
        }else if(json.reason.indexOf("ipdenied") == 0){
            $('#popup').html("");
            $('#popup').html("活动火爆，请10分钟后重新扫码！");
            layerPop();
        }else if(json.reason.indexOf("before") >= 0){
            $('#popup').html("");
            $('#popup').html("活动即将上线，敬请期待！");
            layerPop();
        }else if(json.reason.indexOf("after") >= 0){
            $('#popup').html("");
            $('#popup').html("活动已下线，敬请关注！");
            layerPop();
        }else if(json.reason.indexOf("black") >= 0){
            $('#popup').html("");
            $('#popup').html("很抱歉！此二维码异常。请慎重购买！");
            layerPop();
        }else if(json.reason.indexOf("limit") >= 0) {
            $('#popup').html("");
            $('#popup').html("扫码达到上限，请明日继续扫码！");
            layerPop();
        }else {
            $('#popup').html("");
            $('#popup').html("活动火爆，请稍后重新扫码！");
            layerPop();
        }
    }

    var loadCheck=function(){
        $.ajax({
            url: api,
            type: "POST",
            timeout: 5000,
            data:{
                ticket:user_ticket
            },
            success: function(result){
                console.log("result:"+result);
                var json = eval("("+result+")");
                if(json.result=="success"){
                    console.log(json.activedate);
                    if(json.activedate == ""){
                        $('#user').css("opacity", "0");
                        $('#yan-default').css("opacity", "0");
                        $('#yan-first').css("opacity", "1");
                        $('.weima-tips').css("display", "block");
                        return;
                    }else{
                        sessionStorage.setItem("activedate", json.activedate);
                        sessionStorage.setItem("count", json.countenc + 1);
                        $('#user').css("opacity", "1");
                        $("#user-profile").attr('src',json.headimgurl);
                        $("#user-profile").css("width","96px");
                        $(".user-name").text(decodeURIComponent(json.nickname));
                        $(".user-city").text(decodeURIComponent(json.city));

                        $('#yan-first').css("opacity", "0");
                        $('.weima-tips').css("display", "none");
                        // $('#user').css("display", "block");
                        // $('#yan-default').css("opacity", "0");
                    }
                    new_ticket= (json.pools[0].ticket).substring(0, 32);
                    console.log("firstTicket: " + new_ticket);
                    setTimeout(function(){
                        secondCheck();
                    },500);

                }else{
                    reasonChecked(json);
                }
            },
            complete: function (XMLHttpRequest, status){
                if (status == "timeout") {
                    alert("网络请求超时，刷新一下，稍后再试！");
                }
            }
        });
    }
    var secondCheck = function(){
        $.ajax({
            url: api,
            type: "POST",
            timeout: 5000,
            data: {
                ticket:new_ticket
            },
            success: function(result){
                console.log("result:"+result);
                var json = eval("("+result+")");
                if(json.result == "success"){
                    var secondTicket = (json.prizes[0].ticket).substring(0, 32);
                    console.log("secondTicket:" + secondTicket);
                    sessionStorage.setItem("secondTicket", secondTicket);
                    $('.yan-tip').addClass('on');
                    $('#yan-first').css('opactiy', "0");
                    $('#yan').css('opacity', "1");
                    $('#yan-default').css('opacity', "0");
                    setTimeout(function(){
                        yan();
                    },500);
                }else {
                    reasonChecked(json);
                }
            },
            complete: function(XMLHttpRequest, status){
                if (status == "timeout") {
                    alert("网络请求超时，刷新一下，稍后再试！");
                }
            }
        });
    }
    function yan(){
        $(".yan").bind('click',function(){

            $(this).unbind('click');
            $('.yan-tip').removeClass('on');
            $(".yuan-white").fadeIn();
            $(".yan-red").fadeIn();
            $(".yuan-red").fadeOut();
            $(".yan-white").fadeOut();
            $.ajax({
                url: api,
                type: "POST",
                timeout: 5000,
                data: {ticket:sessionStorage.getItem("secondTicket")},
                success: function(result){
                    console.log("result:"+result);
                    var json = eval("("+result+")");
                    if(json.result == "success"){
                        sessionStorage.setItem("values", json.prize.value);
                        setTimeout(function(){
                            window.location.href='pop.html';
                        },1000);
                    }else{
                        setTimeout(function () {
                            reasonChecked(json);
                        },1300);
                    }
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == "timeout") {
                        alert("网络请求超时，刷新一下，稍后再试！");
                    }
                }
            });

        });
    }
    if(user_ticket){
        loadCheck();
    }
});