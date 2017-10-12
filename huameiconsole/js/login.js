$(function () {
    // 用户名和密码不为空
    $('#username').blur(function () {
        if($(this).val() == ''){
            $('#helpBlock1').css("display", "block").html('密码不能为空');
        }else{
            $('#helpBlock1').css("display", "none");
        }
    });
    $('#password').blur(function () {
        if($(this).val() == ''){
            $('#helpBlock2').css("display", "block").html('用户名不能为空');
        }else{
            $('#helpBlock2').css("display", "none");
        }
    });

    $('#btn').click(function () {
        if($('#username').val() == '' || $('#password').val() == ''){
            $('#helpBlock3').css("display", "block").html('用户名或密码不能为空！');
        }else{
            $('#helpBlock3').css("display", "none");
            var encrypt = new JSEncrypt();
            encrypt.setKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJfwNgpo3aT+o6MW3UNqXvZ/a1sPOOGJ/DuubU"+
                "fjJ3QCf+b3kpfPVQV1qmdGuRYkLfJ0wOMbriiAIvzr8njDTBUhK7SYZ2iZxicBPMu85t9oDwIhIU"+
                "Wv4X09KiOaz05/2ZY7fX5j8BsmzEEh/Cka1Z5DfHYpOj+9I+NVMzk5EIxQIDAQAB");
            sessionStorage.setItem("k3y", Math.random()*100000000000000000);
            var pwd = encodeURIComponent(encrypt.encrypt(sessionStorage.getItem("k3y") + "#" + $('#password').val()));

            $.ajax({
                type: "POST",
                url: "http://106.75.93.169/hmconsole/bg/l0gin",
                dataType: "json",
                data: {
                    "name": $('#username').val(),
                    "password": pwd, "type": "login"
                },
                success: function (msg) {
                    if(msg.result == 'success'){
                        // console.log(msg);
                        sessionStorage.setItem("token", aesdecrypt(msg.t0ken0));
                        sessionStorage.setItem("username", $('#username').val());
                        window.location.href = "createAccount.html";
                    }else{
                        $('#helpBlock3').css("display", "block").html('用户名或密码不正确！');
                    }

                },
                error: function () {
                    //错误处理
                }
            });
        }
    });
    function aesdecrypt(enc){
        var iterationCount = 1000;
        var keySize = 128;
        var encryptionKey  = sessionStorage.getItem("k3y");
        var iv = "dc0da04af8fee58593442bf834b30739"
        var salt = "dc0da04af8fee58593442bf834b30739"
        var aesUtil = new AesUtil(keySize, iterationCount);
        return aesUtil.decrypt(salt, iv, encryptionKey, enc);
    }
});