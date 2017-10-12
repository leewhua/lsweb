
var phoneW =  parseInt(window.screen.width),phoneScale = phoneW/640,ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)){
	var version = parseFloat(RegExp.$1);
	if(version>2.3){
		document.write('<meta name="viewport" content="width=640, initial-scale='+phoneScale+', minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
	}else{
		document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
	}
} else {document.write(
	'<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}




	
$(document).ready(function(){

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	var $resize=function() {
		var w=window.innerWidth;
		var h=window.innerHeight;
		var iw=640;
		var ih=1000;
		var sw=w/iw;
		var sh=h/ih;
		var ss=Math.min(sw,sh);
		$(".main-wapper").animate({
			transform: 'scale('+ss+','+ss+')'
		},0);
	};

	$(window).resize($resize);
	$resize();

	$('.pop-wapper .close').bind('touchstart',function(){
		window.location.href='http://www.qjd1864.com/';
		//$('.pop-bar').fadeOut();
	});

	$(".to-weixin").bind('touchstart',function(){
		$(".wx").show();
	});
	$(".wx").bind('touchend',function(){
		$(".wx").hide();
	});

	
});
