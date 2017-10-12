$(function () {
	
	// banner
	var num = 0;
	setInterval(function () {
		num ++;
		if(num >= $('#list li').length){
			num = 0;
		}
		$('#item li').removeClass('active').eq(num).addClass('active');
		$('#list li').fadeOut(3000).eq(num).fadeIn(3000);
		
	},6000);
	
	// 导航跳转
	$('#nav ul li').click(function() {
		var name = $(this).attr('name');
		// console.log(name);
		var offsetTop = $('#' + name).offset().top;
		// console.log(offsetTop);
		$('html,body').animate({scrollTop: offsetTop}, 'swing');
		return false;
	});

	// 导航渐变
	$(window).scroll(function () {
		if($(window).scrollTop() > 0){
			$('#navbox').addClass('bgColor');
			$('#goToTop').show();
		}else{
			$('#navbox').removeClass('bgColor');
			$('#goToTop').hide();
		}
	});

	

	// go To Top
	$('#goToTop').click(function () {
		$('html,body').animate({
			scrollTop: 0
		});
	});

	// telephone
	$('#telephone').click(function(){
		$('#teleNumber').slideToggle("slow");
	
	});


	// product
	if($(window).width() > $(window).height() && $(window).width() > 768){ //PC

		//关闭按钮 显示/隐藏
		$(window).scroll(function () {
			var _minTop = $('#slideToggle').offset().top;
			var _maxTop = $('#slideToggle').height() + _minTop;

			if(_minTop < $(document).scrollTop() && $(document).scrollTop() < _maxTop){
				
				$('#slideToggle .closeicon').css("display","block");
			}else{
				$('#slideToggle .closeicon').css("display","none");
			}
		});

		// $('.One').simpleSlide();
		$(window).scroll(function () {

			var minTop = $('#product').offset().top-100;
			// var minTop = $('#product').height()-200;

			// var maxTop = $('#WeDid').offset().top-600;
			var maxTop = minTop + $('#product .img').height() - 130;

			// console.log("最小高度" + minTop + ' 最大高度' + maxTop + " 滚动高度" + $(document).scrollTop());

			if(minTop < $(document).scrollTop() && $(document).scrollTop() < maxTop){
				var mLeft = $('#product').find('.img1').css("marginLeft");
				// console.log('往里移marginLeft：'+ mLeft);
				if(mLeft == '0px'){
					// console.log('123');
					$('#product').find('.img1').animate({
						marginLeft: '230px'
					},1000);
					$('#product').find('.img2').animate({
						marginRight: '230px'
					},1000);
				}
			}else{
				var mLeft = $('#product').find('.img1').css("marginLeft");
				// console.log('往外移marginLeft：' + mLeft);
				if(mLeft == '230px'){
					$('#product').find('.img1').animate({
						marginLeft: '0px'
					},1000);
					$('#product').find('.img2').animate({
						marginRight: '0px'
					},1000);

				}
			}
		});
	}

	// 查看详细
	$('#more img').click(function () {
		$('#slideToggle').slideDown(1000);
		$(this).fadeOut();
		$('#slideToggle #close1').css("visibility", "visible");
	});
	
	$('#slideToggle .closeicon1').click(function () {
		$('#slideToggle').slideUp(1000);
		// $(this).css("visibility", "hidden");
		$('#more img').fadeIn(2000);
		var iTop = $('#product').offset().top;
		$('html,body').animate({
            scrollTop: iTop
        });
	});
	$('#slideToggle #close').click(function () {
		$('#slideToggle').slideUp(1000);
		$('#more img').fadeIn(2000);
        var iTop = $('#product').offset().top;
        $('html,body').animate({
            scrollTop: iTop
        });
	});
});