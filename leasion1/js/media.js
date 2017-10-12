$(function () {
    
        var _width = $(window).width();
        // console.log(_width);
        if(_width <= 768 ){
            
            $('#imgSlide').attr('src', '');
            $('.banner .kv1text').html('');
            $('.banner .kv2text').html('');
            $('.banner .kv1text').html('<img src="images/imagesMobile/kv1_1.png">');
            $('.banner .kv2text').html('<img src="images/imagesMobile/kv2_1.png">');
            $('#product #img1').html('');
            $('#product #img1').html('<img src="images/imagesMobile/product1.png">');
            $('#product #img2').html('');
            $('#product #img2').html('<img src="images/imagesMobile/product2.png">');

            // product
            $('#product').find('.img1').animate({
                marginLeft: '0px'
            },1000);
            $('#product').find('.img2').animate({
                marginRight: '0px'
            },1000);


            // 导航跳转
            $('#menuList ul li').click(function() {
                $('#btnMenu').children().attr("src","images/imagesMobile/btn_menu1.png");
                btn2toggle = false;
                var name = $(this).attr('name');
                // console.log(name);
                var offsetTop = $('#' + name).offset().top;
                // console.log(offsetTop);
                $('html,body').animate({scrollTop: offsetTop}, 'swing');
                $('#menuList').hide();
                return false;
            });

            //关闭按钮显示/隐藏
            $(window).scroll(function () {
                var _minTop = $('.navboxMobile').height();
                var _maxTop = $('#slideToggleM').height() + $('#slideToggleM').offset().top;

                if(_minTop < $(document).scrollTop() && $(document).scrollTop() < _maxTop){
                    
                    $('#slideToggleM #closeM').css("display","inline-block");
                }else{
                    $('#slideToggleM #closeM').css("display","none");
                }
            });
            // 查看详细
            $('#moreM img').click(function () {
                $('#slideToggleM').slideDown(1000);
                $(this).css("visibility", "hidden");
                $('#slideToggleM #closeM').css("display", "inline-block");
            });

            //关闭折叠层
            $('#slideToggleM #closeM').click(function () {
                $('#slideToggleM').slideUp(1000);
                $(this).css("display", "none");
                $('#moreM img').css("visibility", "visible");
                var iTop = $('#product').offset().top;
                $('html,body').animate({
                    scrollTop: iTop
                });
            });
            // btnPhone
            var btn1toggle = false;
            $('#btnPhone').click(function () {
                $('#menuList').hide();
                if(btn2toggle){
                    // console.log(btn2toggle);
                    $('#btnMenu').children().attr("src","images/imagesMobile/btn_menu1.png");
                    btn2toggle = false;
                }
                $('#phoneNumber').slideToggle();
                if(!btn1toggle){
                    $(this).children().attr("src","images/imagesMobile/btn_phone2.png");
                    btn1toggle = true;
                }else{
                    $(this).children().attr("src","images/imagesMobile/btn_phone1.png");
                    btn1toggle = false;
                }

            });

            // menu
            var btn2toggle = false;
            $('#btnMenu').click(function () {
                $('#phoneNumber').hide();
                if(btn1toggle){
                    // console.log(btn1toggle);
                    $('#btnPhone').children().attr("src","images/imagesMobile/btn_phone1.png");
                    btn1toggle = false;
                }
                $('#menuList').slideToggle();
                if(!btn2toggle){
                    $(this).children().attr("src","images/imagesMobile/btn_menu2.png");
                    btn2toggle = true;
                }else{
                    $(this).children().attr("src","images/imagesMobile/btn_menu1.png");
                    btn2toggle = false;
                }
            });

            //轮播图
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                slidesPerView: 1,   //手控
                spaceBetween: 0,
                centeredSlides: true,
                // autoplay: 2500,
                autoplayDisableOnInteraction: false,
                loop: true
            });
        }
});