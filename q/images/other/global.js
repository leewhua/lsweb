
$(window).load(function(){
	//initAll();
	$('.copy>img').css("left",Math.round($('.copy>img').width()/-2)+'px');
	$('.copy>img').css("top",Math.round($('.copy>img').height()/-2)+'px');
});

$(document).ready(function(){
	
	var showWidth=640;
	var showHeight=1000;
	
	var getWidth= function(){
		if(window.innerWidth!= undefined){
			return window.innerWidth;
		}
		else{
			var B= document.body, D= document.documentElement;
			return Math.max(D.clientWidth, B.clientWidth);
		}
	}
	var getHeight= function(){
		if(window.innerHeight!= undefined){
			return window.innerHeight;
		}
		else{
			var B= document.body, D= document.documentElement;
			return Math.max(D.clientHeight, B.clientHeight);
		}
	}

	var $resize=function() {
		var w=getWidth();
		var h=getHeight();
		var iw=showWidth;
		var ih=showHeight;
		var rr=0;
		var ow=0;

		if(w>h){
			showMode=1;
			ow=w;
			rr=90;
			h=window.innerWidth;
			w=window.innerHeight;
		}
		
		var sw=w/iw;
		var sh=h/ih;
		var ss=Math.min(sw,sh);
		var ss2=Math.max(sw,sh);

		scale=ss;
		scale2=ss2;
	
		$(".wapper").width(w);
		$(".wapper").height(h);
		JT.to(".content", 0, {scaleX: ss2, scaleY: ss2});
		JT.to(".inner-content", 0,{scaleX:ss,scaleY:ss});
		JT.to(".wapper", 0,{rotationZ:rr,x:ow});

	};
	$(window).resize($resize);
	$resize();
	
});

