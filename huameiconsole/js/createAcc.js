$(function () {
    $("#sideBar li").click(function () {
        var index = $(this).index();
        $("#sideBar li").removeClass('active').eq(index).addClass('active');
        $(".main .form").removeClass('active').eq(index).addClass('active');
    });
//	$('input').blur(function () {
//		if($(this).val() == ''){
//			var placeholder = $(this).attr('placeholder');
//			// console.log(placeholder);
//			$(this).parent().siblings('div').addClass('has-error');
//
//			$(this).parent().siblings('div').children().css("display", "block").html("请输入" + placeholder);
//		}
//	});

    // 基本信息
    $('#createAccount').click(function () {
        var array = [];
        for(var i=0; i<$('.fillIn input').length; i++){
            if($('.fillIn input').eq(i).val() == ''){

                $('#helpBlock6').parent().addClass('has-error');
                $('#helpBlock6').css({'display':'block'}).html('请完善所有信息');
                break;
            }else{
                $('#helpBlock6').css('display', 'none');
                array.push($('.fillIn input').eq(i).val());
            }
        }
        // console.log(array);

        if(array.length == $('.fillIn input').length){
            var reg =/^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;     //邮箱格式
            var numreg = /^(1[345678])\d{9}$/;        //手机号码电话号码格式

            if( !numreg.test($('.fillIn #inputPhone').val()) ){
                $('#helpBlock6').parent().addClass('has-error');
                $('#helpBlock6').css("display", "block").html("手机号格式不正确!");
            }else if ( !reg.test( $('.fillIn #inputEmail').val() ) ){
                $('#helpBlock6').parent().addClass('has-error');
                $('#helpBlock6').css("display", "block").html("邮箱格式不正确!");
            }else {
                $('#helpBlock6').css("display", "none").html("");
                $.ajax({
                    type: "POST",
                    url: "http://106.75.93.169/hmconsole/bg",
                    dataType: "json",
                    data: {
                        "account": $('#inputAccount').val(),
                        "aname": $('#inputDealer').val(),
                        "name": $('#inputName').val(),
                        "telephone": $('#inputPhone').val(),
                        "address": $('#inputAdress').val(),
                        "email": $('#inputEmail').val(),
                        "type": "info",
                        "t0ken": sessionStorage.getItem("token")
                    },
                    success: function (msg) {
                        console.log(msg);
                        if (msg.result == 'success') {
                            sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                            alert("账号已生成！");
                        }else if(msg.reason == "account is exist"){
                            sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                            alert("账号已存在，请重新输入！");
                        }else{
                            sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                            alert("登记失败！");
                        }
                    },
                    error: function () {
                    }
                });
            }
        }
    });

    // 设置增加序列号
    var addInput = $('#addInput').html();
    $('#setNum .q1').find('a').click(function () {
        $(this).parents('.q1').append(addInput);
    });
    // $('#setNum').find('input').blur(function () {
    //     console.log('blur');
    //     var isNum = /^[0-9]*$/;
    //     var htmlTips = "<span style='color: #ff0000; width: 142px; margin-left: 15px;' id='prompt'>序列号必须由纯数字组成</span>";
    //     if(!isNum.test($(this).val())){
    //         $(this).parents('.form-group').append(htmlTips);
    //     }else{
    //         $('#prompt').remove();
    //     }
    // });
    $('#btn2').click(function () {
        var fyjqVal = $('#setNum .q1').eq(0).find('input').map(function () {
            if($(this).val() != ""){
                return $(this).val();
            }
        }).get();
        var dhbVal = $('#setNum .q1').eq(1).find('input').map(function () {
            if($(this).val() != ""){
                return $(this).val();
            }
        }).get();
        var hmshVal = $('#setNum .q1').eq(2).find('input').map(function () {
            if($(this).val() != ""){
                return $(this).val();
            }
        }).get();
        var lxnhVal = $('#setNum .q1').eq(3).find('input').map(function () {
            if($(this).val() != ""){
                return $(this).val();
            }
        }).get();
        console.log("福运金秋：" + fyjqVal);

        // 序列号格式验证
        var values = $('#setNum').find('input').map(function () {
            return $(this).val();
        }).get().join('');
        // console.log(values);


        if (isNaN(values) && $('#prompt').remove()) {
            $('#setNum').append("<span style='color: #ff0000; display:block; width: 100%; text-align: center; padding-right: 40px;' id='prompt'>序列号必须由纯数字组成</span>");
        } else {
            $('#prompt').remove();
        }

        var fyjq = "";
        // console.log(fyjqVal.length);
        if(fyjqVal.length >0){
            for (var i = 0; i <fyjqVal.length; i++ ) {

                    fyjq  += fyjqVal[i] +'-'+fyjqVal[i+1] + ",";
                    i++;
                    console.log("fyjq:" + fyjq);
            }
        }
        var dhblr = "";
        if(dhbVal.length >0) {
            for (var i = 0; i < dhbVal.length; i++) {
                dhblr += dhbVal[i] + '-' + dhbVal[i + 1] + ",";
                i++;
                console.log(dhblr);
            }
        }
        var hmsh ="";
        if(hmshVal.length >0) {
            for (var i = 0; i < hmshVal.length; i++) {
                hmsh += hmshVal[i] + '-' + hmshVal[i + 1] + ",";
                i++;
                console.log(hmsh);
            }
        }
        var lxnh ="";
        if(lxnhVal.length >0) {
            for (var i = 0; i < lxnhVal.length; i++) {
                lxnh += lxnhVal[i] + '-' + lxnhVal[i + 1] + ",";
                i++;
                console.log(lxnh);
            }
        }
        if ($('#inputAccount').val()) {
           $.ajax({
               type: "POST",
               url: "http://106.75.93.169/hmconsole/bg",
               dataType: "json",
               data: {
                   "account": $('#inputAccount').val(),
                    "type3": fyjq,
                   "type2": dhblr,
                   "type4": hmsh,
                   "type1": lxnh,
                   "type": "receive",
                   "t0ken": sessionStorage.getItem("token")
               },
               success: function (msg) {
                    console.log(msg);
                   if (msg.result == 'success') {
                       sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                       alert("领取成功！");
                       $('#setNum').find('input').val("");
                       $('form.fillIn').find('input').val("");
                   }else{
                       sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                       alert("领取失败！");
                   }
               },
               error: function () {}
           });
        }
    });


    //账号查询
    $('#search').click(function () {
        $('#searchYbq').find('input').removeAttr("readonly");
       $.ajax({
           type: "POST",
           url: "http://106.75.93.169/hmconsole/bg"  ,
           dataType: "json",
           data: {
                "type": "query",
                "account": $('#account').val(),
               "telephone": $('#phone').val(),
               "name": $('#name').val(),
               "t0ken": sessionStorage.getItem("token")
           },
           success: function (msg) {
               // console.log("msg: " + msg);
               // console.log("userinfo.length: " + msg.userinfo.length);

               if (msg.result == 'success') {
                   sessionStorage.setItem("token", aesdecrypt(msg.t0ken));

                   $('#searchInfo').find('input').val("");
                   $('#searchYbq').find('input').val("");
                   $('#searchYbq .y1add').html("");

                   if( msg.userinfo.length > 0 ){
                       var info =msg.userinfo[0];
                       // $('#searchInfo').find('input').val();
                       // console.log(msg.userinfo[0]);
                       $('#ID').attr("para", info.id);
                       // console.log(info.name);

                    $('#showAcc').val(info.account);
                    $('#showdealerName').val(info.aname);
                    $('#showName').val(info.name);
                    $('#showPhone').val(info.telephone);
                    $('#showAddress').val(info.address);
                    $('#showMail').val(info.email);
                    $('#searchInfo').find('input').attr("readonly","true");


                        // console.log("info.length: " + msg.userinfo.length);
                       var n1 = 0;
                       var n2 = 0;
                       var n3 = 0;
                       var n4 = 0;
                       for(var i = 0; i < msg.cardnum.length; i++){

                           if(msg.cardnum[i].type == "1"){

                                if( n1 >= 2){
                                    $('#searchYbq .y4 .y1add').append($('#addYbq').html());
                                }
                               $('#searchYbq .y4').find('input').attr("readonly", "true");
                               $('#searchYbq .y4').find('input').eq(n1).val(msg.cardnum[i].low);
                               $('#searchYbq .y4').find('input').eq(n1+1).val(msg.cardnum[i].high);
                               $('#searchYbq .y4').find('input').eq(n1+2).val(msg.cardnum[i].id);
                               console.log($('#searchYbq .y4').find('input').eq(n1+2).val());
                               n1 += 3;
                           }
                           if(msg.cardnum[i].type == "2"){

                               if( n2 >= 2){
                                   $('#searchYbq .y2 .y1add').append($('#addYbq').html());
                               }
                               $('#searchYbq .y2').find('input').attr("readonly", "true");
                               $('#searchYbq .y2').find('input').eq(n2).val(msg.cardnum[i].low);
                               $('#searchYbq .y2').find('input').eq(n2+1).val(msg.cardnum[i].high);
                               $('#searchYbq .y2').find('input').eq(n2+2).val(msg.cardnum[i].id);
                               n2 += 3;
                           }
                           if(msg.cardnum[i].type == "3"){
                               if( n3 >= 2){
                                   $('#searchYbq .y1 .y1add').append($('#addYbq').html());
                               }
                               // console.log(n3);
                               $('#searchYbq .y1').find('input').attr("readonly", "true");
                               $('#searchYbq .y1').find('input').eq(n3).val(msg.cardnum[i].low);
                               $('#searchYbq .y1').find('input').eq(n3+1).val(msg.cardnum[i].high);
                               $('#searchYbq .y1').find('input').eq(n3+2).val(msg.cardnum[i].id);
                               n3 += 3;
                               // console.log($('#searchYbq .y3').find('input').length + " i:" + i);
                           }
                           if(msg.cardnum[i].type == "4"){
                               if( n4 >= 2){
                                   $('#searchYbq .y3 .y1add').append($('#addYbq').html());
                               }
                               $('#searchYbq .y3').find('input').attr("readonly", "true");
                               $('#searchYbq .y3').find('input').eq(n4).val(msg.cardnum[i].low);
                               $('#searchYbq .y3').find('input').eq(n4+1).val(msg.cardnum[i].high);
                               $('#searchYbq .y3').find('input').eq(n4+2).val(msg.cardnum[i].id);
                               n4 += 3;
                           }
                       }

                   $('#searchYbq .form-group').find('button').click(function () {
                       $(this).parents('.form-group').find('input').removeAttr("readonly");
                   });
                   }else {
                       alert("您查找的信息不存在！");
                       $('#ybqadd').remove();
                       $('#searchInfo').find('input').removeAttr("readonly");
                       $('#searchYbq').find('input').removeAttr("readonly");
                       sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                   }
               }
           },
           error: function (){}
       });
    });
    //	修改
    $('#searchInfo .form-group').find('button').click(function () {
        $(this).parents('.tipsbox').siblings('div').children().removeAttr("readonly");
    });
// 信息修改保存
$('#btn3').click(function () {
    // console.log($('#searchInfo #ID').attr("para"));
    $.ajax({

        type: "POST",
        url: "http://106.75.93.169/hmconsole/bg",
        dataType: "json",
        data: {
            "id": $('#ID').attr("para"),
            "account": $('#showAcc').val(),
            "aname": $('#showdealerName').val(),
            "name": $('#showName').val(),
            "telephone": $('#showPhone').val(),
            "address": $('#showAddress').val(),
            "email": $('#showMail').val(),
            "type": "info",
            "t0ken": sessionStorage.getItem("token")
        },
        success: function (msg) {
            console.log(msg);
            // sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
            if(msg.result == "success"){
                sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                alert("信息修改成功！");
            }else{
                sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                alert("修改失败！");
            }
        },
        error: function () {
        }
    });
});
// 月饼券修改
$('#btn4').click(function () {
    console.log($('#searchInfo #ID').attr("para"));
    var showfyjqVal = $('#searchYbq .y1').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var showdhbVal = $('#searchYbq .y2').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var showhmshVal = $('#searchYbq .y3').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var showlxnhVal = $('#searchYbq .y4').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    console.log(showlxnhVal);

    // 序列号格式验证
    var values = $('#searchYbq').find('input').map(function () {
        return $(this).val();
    }).get().join('');
    if (isNaN(values) && $('#prompt').remove()) {
        $('#setNum').append("<span style='color: #ff0000; display:block; width: 100%; text-align: center; padding-right: 40px;' id='prompt'>序列号必须由纯数字组成</span>");
    } else {
        $('#prompt').remove();
    }

    var fyjq;
    // console.log(fyjqVal.length);
    if(showfyjqVal.length >0){
        for (var i = 0; i <showfyjqVal.length; i++ ) {

            fyjq  =showfyjqVal[i+2] + ":" + showfyjqVal[i] +'-'+showfyjqVal[i+1];
            i += 2;
            console.log("福运金秋:" + fyjq);
        }
    }
    var dhblr;
    if(showdhbVal.length >0) {
        for (var i = 0; i < showdhbVal.length; i++) {
            dhblr = showdhbVal[i+2] + ":" + showdhbVal[i] + '-' + showdhbVal[i + 1];
            i += 2;
            console.log("蛋黄白莲蓉:" + dhblr);
        }
    }
    var hmsh;
    if(showhmshVal.length >0) {
        for (var i = 0; i < showhmshVal.length; i++) {
            hmsh = showhmshVal[i + 2] + ":" + showhmshVal[i] + '-' + showhmshVal[i + 1];
            i += 2;
            console.log("双黄白莲蓉:" + hmsh);
        }
    }
    var lxnh;
    if(showlxnhVal.length >0) {
        for (var i = 0; i < showlxnhVal.length; i++) {
            lxnh = showlxnhVal[i + 2] + ":" + showlxnhVal[i] + '-' + showlxnhVal[i + 1];
            console.log("流心奶黄:" + lxnh);
            // console.log(showlxnhVal[i + 2]);
            i += 2;
        }
    }
    $.ajax({

        type: "POST",
        url: "http://106.75.93.169/hmconsole/bg",
        dataType: "json",
        data: {
            "id": $('#ID').attr("para"),
            "type3": fyjq,
            "type2": dhblr,
            "type4": hmsh,
            "type1": lxnh,
            "type": "codesave",
            "t0ken": sessionStorage.getItem("token")
        },
        success: function (msg) {
            console.log(msg);

            sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
            // $('#searchYbq').find('input').removeAttr("readonly");
            if(msg.result == "success"){
                alert("修改成功！");
            }else{
                alert("修改失败！");
                // $('#searchYbq').find('input').removeAttr("readonly");
            }
        },
        error: function () {
        }
    });
});

$('#jh').find('button').click( function () {
    // console.log($(this).parent().siblings('div').find('input').length);

    var jhfyjqVal = $('#jh .jh1').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var jhdhbVal = $('#jh .jh2').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var jhhmshVal = $('#jh .jh3').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var jhlxnhVal = $('#jh .jh4').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    // console.log(fyjqVal);

    // 序列号格式验证
    var values = $('#jh').find('input').map(function () {
        return $(this).val();
    }).get().join('');
    // console.log(values);

    if (isNaN(values) && $('#prompt').remove()) {
        $('#jh').append("<span style='color: #ff0000; display:block; width: 100%; text-align: center; padding-right: 40px;' id='prompt'>序列号必须由纯数字组成</span>");
    }else {
        $('#prompt').remove();
        var fyjq;
        // console.log(fyjqVal.length);
        if (jhfyjqVal.length > 0) {
            for (var i = 0; i < jhfyjqVal.length; i++) {

                fyjq = jhfyjqVal[i] + '-' + jhfyjqVal[i + 1];
                i++;
                console.log(fyjq);
            }
        }
        var dhblr;
        if (jhdhbVal.length > 0) {
            for (var i = 0; i < jhdhbVal.length; i++) {
                dhblr = jhdhbVal[i] + '-' + jhdhbVal[i + 1];
                i++;
                console.log(dhblr);
            }
        }
        var hmsh;
        if (jhhmshVal.length > 0) {
            for (var i = 0; i < jhhmshVal.length; i++) {
                hmsh = jhhmshVal[i] + '-' + jhhmshVal[i + 1];
                i++;
                console.log(hmsh);
            }
        }
        var lxnh;
        if (jhlxnhVal.length > 0) {
            for (var i = 0; i < jhlxnhVal.length; i++) {
                lxnh = jhlxnhVal[i] + '-' + jhlxnhVal[i + 1];
                i++;
                console.log(lxnh);
            }
        }
        $.ajax({
            type: "POST",
            url: "http://106.75.93.169/hmconsole/bg",
            dataType: "json",
            data: {

                "type3": fyjq,
                "type2": dhblr,
                "type4": hmsh,
                "type1": lxnh,
                "type": "active",
                "t0ken": sessionStorage.getItem("token")
            },
            success: function (msg) {
                console.log(msg);
                sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                if (msg.result == "success") {
                    alert("激活成功！");
                    $('#jh').find('input').val("");
                } else {
                    sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                    alert("激活失败！");
                    $('#jh').find('input').val("");
                }
            },
            error: function () {
            }
        });
    }
});
$('#zx').find('button').click( function () {
    var jhfyjqVal = $('#zx .zx1').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var jhdhbVal = $('#zx .zx2').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var jhhmshVal = $('#zx .zx3').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    var jhlxnhVal = $('#zx .zx4').find('input').map(function () {
        if($(this).val() != ""){
            return $(this).val();
        }
    }).get();
    // console.log(fyjqVal);

    // 序列号格式验证
    var values = $('#zx').find('input').map(function () {
        return $(this).val();
    }).get().join('');
    // console.log(values);

    if (isNaN(values) && $('#prompt').remove()) {
        console.log(isNaN(values));
        // $('#zx').find('input').val("");
        $('#zx').append("<span style='color: #ff0000; display:block; width: 100%; text-align: center; padding-right: 40px;' id='prompt'>序列号必须由纯数字组成</span>");
    } else {
        $('#prompt').remove();

        var fyjq;
        // console.log(fyjqVal.length);
        if(jhfyjqVal.length >0){
            for (var i = 0; i <jhfyjqVal.length; i++ ) {

                fyjq  = jhfyjqVal[i] +'-'+jhfyjqVal[i+1];
                i++;
                console.log(fyjq);
            }
        }
        var dhblr;
        if(jhdhbVal.length >0) {
            for (var i = 0; i < jhdhbVal.length; i++) {
                dhblr = jhdhbVal[i] + '-' + jhdhbVal[i + 1];
                i++;
                console.log(dhblr);
            }
        }
        var hmsh;
        if(jhhmshVal.length >0) {
            for (var i = 0; i < jhhmshVal.length; i++) {
                hmsh = jhhmshVal[i] + '-' + jhhmshVal[i + 1];
                i++;
                console.log(hmsh);
            }
        }
        var lxnh;
        if(jhlxnhVal.length >0) {
            for (var i = 0; i < jhlxnhVal.length; i++) {
                lxnh = jhlxnhVal[i] + '-' + jhlxnhVal[i + 1];
                i++;
                console.log(lxnh);
            }
        }
        $.ajax({
            type: "POST",
            url: "http://106.75.93.169/hmconsole/bg",
            dataType: "json",
            data: {
                "type3": fyjq,
                "type2": dhblr,
                "type4": hmsh,
                "type1": lxnh,
                "type": "nactive",
                "t0ken": sessionStorage.getItem("token")
            },
            success: function (msg) {
                console.log(msg);
                sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
                if(msg.result == "success"){
                    alert("撤销成功！");
                    $('#zx').find('input').val("");
                }else {
                    alert("撤销失败！");
                }
            },
            error: function () {
            }
        });
    }


});

$('#mailBtn').click(function () {
    $.ajax({
        type: "POST",
        url: "http://106.75.93.169/hmconsole/bg",
        dataType: "json",
        data: {
            "type": "download",
            "t0ken": sessionStorage.getItem("token")
        },
        success: function (msg) {
            // console.log(msg);
            sessionStorage.setItem("token", aesdecrypt(msg.t0ken));
            if(msg.result == "success"){
                // console.log(msg.reportname);
                // $('#mailBtn').attr("href", "http://lsid.me/hmconsole/report/" + msg.reportname);
                window.open("http://lsid.me/hmconsole/report/" + msg.reportname);
            }else {
                alert("下载失败！");
            }
        },
        error: function () {
        }
    });
})
    function aesdecrypt(enc){
        var iterationCount = 1000;
        var keySize = 128;
        var encryptionKey  = sessionStorage.getItem("k3y");
        var iv = "dc0da04af8fee58593442bf834b30739"
        var salt = "dc0da04af8fee58593442bf834b30739"
        var aesUtil = new AesUtil(keySize, iterationCount);
        return aesUtil.decrypt(salt, iv, encryptionKey, enc);
    }
    // $('#test').click( function () {
    //     $.ajax({
    //         type: "POST",
    //         url: "http://lsid.me/hmconsole/bg",
    //         datatype: "json",
    //         data: {
    //             "type": "generuser",
    //             "t0ken": sessionStorage.getItem("token")
    //         },
    //         success: function (msg) {
    //             console.log(msg);
    //         }
    //     });
    // });
});