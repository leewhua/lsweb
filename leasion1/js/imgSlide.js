$(function () {

    if($(window).width() > $(window).height()) {  //PC
        
        var n;
        var timer = null;  

        $('#WeDid').find('li').click(function () {
            n = 0;
            var index = $(this).parents('ul').index() * 2 + $(this).index();
            // console.log(index);   //0....7
            $('#mask').show();
            $('#bigShow ul').removeClass('show').eq(index).addClass('show');
            $('#bigShow .show li').hide();
            $('#num').html('');   //清除圆点
            //根据图片个数追加圆点
            for (var i = 0; i < $('#bigShow .show li').length; i++) {
                $('#num').append("<li></li>");
            }
            // console.log($('#bigShow .show li').length);
            autoPlay();
            // console.log(i);
            timer = setInterval(function () {
                n ++;
                if (n >= $('#bigShow .show li').length) {
                    n = 0;
                }
                autoPlay();
            }, 3000);

            $('#num li').hover(
                function () {
                    n = $(this).index();
                    autoPlay();
                },
                function () {

                }
            );
        });

        $('#bigShow').hover(
            function () {
                $('#leftBtn, #rightBtn').show();
                clearInterval(timer);
            },
            function () {
                $('#leftBtn, #rightBtn').hide();
                timer = setInterval(function () {
                    n++;
                    if (n >= $('#bigShow .show li').length) {
                        n = 0;
                    }
                    autoPlay();
                }, 3000);
            }
        );

        function autoPlay() {
            $('#num li').removeClass('on').eq(n).addClass('on');
            $('#bigShow .show li').fadeOut(800).eq(n).fadeIn(800);
        }

        

        $('#leftBtn').click(function () {
            n--;
            if (n < 0) {
                n = $('#bigShow .show li').length - 1;
            }
            autoPlay();
        });

        $('#rightBtn').click(function () {
            n++;
            if (n >= $('#bigShow .show li').length) {
                n = 0;
            }
            autoPlay();
        });

        $('#bigClose').click(function () {
            clearInterval(timer);
            $('#mask').hide();
        });
    }
});