
var sco=0;
var user_ticket;
var status_ticket;
var api = "http://leasiondata.cn/play";
var loadCount=180;
var is_main=true;

var add0=function(n){
	var s= n.toString();
	var c=5-s.length;
	for(var i=0;i<c;i++){
		s="0"+s;
	}
	//console.log(n,s,c);
	return s;
}

var startLoad=function(cb){

	var loadEnd=function(){
		cb();
	}

	$("#load-none img").each(function(){

		var loadEdCount=1;
		var loadFun=function(){
			loadEdCount++;
			if(loadEdCount>=loadCount){
				loadEnd();
			}else{
				//setTimeout(function(){
				$(this).attr('src','images/roads/road_'+add0(loadEdCount)+'.png');
				//},10);

			}
		}
		$(this).load(loadFun);
		$(this).attr('src','images/roads/road_'+add0(loadEdCount)+'.png');
	});


}


var initMov=function(obj){
	var type=obj.attr('mov');
	var ox,oy,sc;
	switch(type){
		case "fade-up":
			ox=0;
			oy="10%";
			sc=1;
			break;
		case "fade-down":
			ox=0;
			oy="-10%";
			sc=1;
			break;
		case "fade-left":
			oy=0;
			ox="-10%";
			sc=1;
			break;
		case "fade-right":
			oy=0;
			ox="10%";
			sc=1;
			break;
		case "zoom-in":
			oy=0;
			ox=0;
			sc=0.8;
			break;
		case "zoom-out":
			oy=0;
			ox=0;
			sc=1.2;
			break;
		case "fade":
			oy=0;
			ox=0;
			sc=1;
			break;
	}
	obj.animate({
		opacity:0,
		transform: 'translate('+ox+','+oy+') scale('+sc+','+sc+')'
	},0);
}
var playMov=function(obj){
	var duration=obj.attr('duration');
	var delay=obj.attr('delay');
	obj.delay(delay).animate({
		opacity:1,
		//transform: 'matrix(0,0) scale(1,1)'
		transform: 'translate(0,0) scale(1,1)'
	},duration);
}
var playOutMov=function(obj){
	var duration=obj.attr('out-duration');
	var delay=obj.attr('out-delay');
	obj.delay(delay).animate({
		opacity:0
	},duration);
}
var initPage=function(obj){
	obj.find('[mov]').each(function(){
		initMov($(this));
	});
}
var playPage=function(obj){
	obj.find('[mov]').each(function(){
		playMov($(this));
	});
	obj.find('[out]').each(function(){
		playOutMov($(this));
	});
}


$(window).load(function(){

});

$(document).ready(function(){
	var event="touchstart";
	$('[mov]').each(function(){
		initMov($(this));
	});
	var toErrPage=function(){
		window.location.href=reSetUrl('err.html');
	};
	
	var checkActive=function(){
		playPage($(".swiper-container .swiper-slide-active"));
		var bg=$('.swiper-container .swiper-slide-active').attr('bg');
		var id=$('.swiper-container .swiper-slide-active').attr('id');
		if(id=="p1") {
			$('.skip').fadeIn();
		}else if(id=="p8"){
			playZuang();
			$('.skip').fadeOut();
		}else{
			$('.skip').fadeOut();
		}
		if(bg=="0"){
			$('.help-but').fadeIn();
			$('.help-but2').fadeOut();
			$('.right-logo').fadeIn();
			$('.right-logo2').fadeOut();

		}else{
			$('.help-but2').fadeIn();
			$('.help-but').fadeOut();
			$('.right-logo2').fadeIn();
			$('.right-logo').fadeOut();

		}
	}
	var mySwiper = new Swiper('.swiper-container', {
		onSlideChangeEnd: function(swiper){
			console.log("onSlideChangeEnd");
			checkActive();
		},
		onInit: function(swiper){
			checkActive();
		},
		direction : 'vertical',
		hashnav:false,
		touchRatio : 1/*,
		 watchSlidesProgress : true,
		 onProgress: function(swiper, progress){
		 //console.log(progress);
		 var nn=Math.round(progress*(loadCount-2))+1;
		 nn=Math.max(1,nn);
		 nn=Math.min(loadCount-1,nn);
		 $('#bg img').attr('src','images/roads/road_'+add0(nn)+'.png');
		 }
		 */
	});



	var getData=function(){
		var url = window.location.href.split("#")[0].split("?")[1];
		var ut;
		if(url && url.length>20){
			ut = url.split(",");
			user_ticket = ut[0];
			status_ticket = ut[1];
			return true;
		}else{
			return false;
		}
	}

	var luck=function(){
        sco = 1;
        showWin();
		/* $.ajax({
			url: api,
			data: { ticket: status_ticket,desc: "抽中红包" },
			success: function(data) {
				if(data.result == "success" && data.more.result == "success") {
					sco=(data.more.c1ashed)/100;
					showWin();
				} else if(data.result == "success" && data.more.result == "fail" &&  data.more.reason != "") {
					window.location.href=reSetUrl('scanned.html');
				} else if(data.result == "fail") {
					window.location.href=reSetUrl('err.html');
				} else {
					window.location.href=reSetUrl('err.html');
				}
			},error:function() {
              toErrPage();
            },timeout: 8000,
            dataType: "json",async: true,type: "POST",
            complete: function(XMLHttpRequest,status) {
                if(status == 'timeout') {
                    toErrPage();
                }
            }
		}); */
	}

	var check=function(){
		if(!user_ticket){
			// window.location.href='active.html';
			return;
		}
		$.ajax({
			url: 'http://leasiondata.cn/info',
			data: { ticket: user_ticket },
			success: function(data) {
				if(data.result == "success"  &&  data.c1ashed.length>0) {
					window.location.href=reSetUrl('scanned.html');
				} else if(data.result == "fail") {
					window.location.href=reSetUrl('err.html');
				} else {
					//window.location.href='err.html';
				}
			},error:function() {
              toErrPage();
            },timeout: 8000,
            dataType: "json",async: true,type: "POST",
            complete: function(XMLHttpRequest,status) {
                if(status == 'timeout') {
                    toErrPage();
                }
            }
		});
	}

	var showWin=function(){
		$('.win-sco').text(sco+"元");
		$('.win-pop').fadeIn();
		playMov($('.win-pop .pop-bar'));
	}
	var showWin2=function(){
		$('#win1').fadeOut();
		$('#win2').delay(300).fadeIn();
	}

	$('.list-one').click(function(){
		luck();
		//showWin();
	});
	$('#win2 .but').bind(event,function(){
		showWin2();
	});
	$('#win1 .but').bind(event,function(){
		$('.wx').fadeIn();
	});
	$('.help-but').bind(event,function(){
		$('.help-pop').fadeIn();
		playMov($('.help-pop .pop-bar'));
		var myScroll = new IScroll('#copy-scroll', { scrollX: true, freeScroll: false });
	});
	$('.help-but2').bind(event,function(){
		$('.help-pop').fadeIn();
		playMov($('.help-pop .pop-bar'));
		var myScroll = new IScroll('#copy-scroll', { scrollX: true, freeScroll: false });
	});
	$('.help-but3').bind(event,function(){
		$('.help-pop').fadeIn();
		playMov($('.help-pop .pop-bar'));
		var myScroll = new IScroll('#copy-scroll', { scrollX: true, freeScroll: false });
	});
	$('.help-pop .close').click(function(){
		$('.help-pop').fadeOut();
	});

	$('.home-pop .close').click(function(){
		$('.home-pop').fadeOut();
	});

	$('.skip').bind(event,function(){
		if(mySwiper){
			mySwiper.slideTo(8, 1000, false);
			setTimeout(checkActive,1200);
		}
	});
	$('.icon-arrow-up,.icon-arrow-up2').bind(event,function(){
		mySwiper.slideNext();
	});

	var mUp=function(dom,time){
		dom.animate({
			transform: 'translate(0,-10)'
		},time,'linear',function(){
			mDown(dom,time);
		});
	}
	var mDown=function(dom,time){
		dom.animate({
			transform: 'translate(0,10)'
		},time,'linear',function(){
			mUp(dom,time);
		});
	}
	var playZuang=function(){
		$('.zuang').each(function(){
			var dom=$(this);
			var time=Math.random()*400+800;
			mUp(dom,time);
		});
	};
	//

	var soundPlay=true;
	if(window["soundManager"]){
		soundManager.url="swf";
		soundManager.setup({
			onready: function() {
				soundManager.createSound({
					id:'bg',
					loops:999999,
					autoLoad:true,
					autoPlay:true,
					url:'sound.mp3'
				});

			}
		});
		$('#audio_btn').bind(event,function(){
			if(soundPlay){
				soundManager.pause('bg');
				$('#audio_btn').addClass('off');

				soundPlay=false;
			}else{
				soundManager.resume('bg');
				soundPlay=true;

				$('#audio_btn').removeClass('off');
			}
		});
	}

	var reSetUrl=function(url){
		if(user_ticket && status_ticket){
			return url;
		}
		return url;
	}
	var $resize=function() {
		var w=window.innerWidth;
		var h=window.innerHeight;
		console.log(w,h);
		var iw=640;
		var ih=1037;
		var sw=w/iw;
		var sh=h/ih;
		var ss=Math.min(sw,sh);
		$(".innerbox .wapper").animate({
			transform: 'scale('+ss+','+ss+')'
		},0);
	};

	$(window).resize($resize);

	/*share*/





	$resize();
	getData();
	if(is_main){
		check();
	}
	
	setTimeout(function(){
		$('.home-pop').fadeIn();
		playMov($('.home-pop .pop-bar'));
	},800);

	//$('.main').hide();
	//startLoad(function(){
	//$('.main').show();
	//});
});
