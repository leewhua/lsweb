$.shareObj={link:"http://res.leasiondata.cn/lstatic/y/share.html",
			imgUrl:"http://res.leasiondata.cn/lstatic/y/share.jpg",
			copy:"北冰洋-真橙意够桔气！"};
$.wxIsReady=false;
$.wxConfig=null;
var loadWx=function(){
	$.ajax({
		url: "http://lsid.me/newlsplay4hm/info",
		data: {type:"getwxconfig",url4wxjssdk:window.location.href.split("#")[0],eid:"y"},//encodeURIComponent
		success: function(data) {
			if(data) {
				$.wxConfig=data;
				initWx();
			}
		},
		dataType: "json",async: false,type: "POST"
	});
}
$.setWxObj=function(){
	if(wx && $.wxConfig){
		wx.onMenuShareTimeline({
				title: $.shareObj.copy,
				link:$.shareObj.link,
				imgUrl:$.shareObj.imgUrl,
				success: function () {

				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title:$.shareObj.copy,
				desc: '',
				link:$.shareObj.link,
				imgUrl:$.shareObj.imgUrl,
				success: function () {

				},
				cancel: function () {

				}
			});
	}
}
var initWx=function(){
	if(wx && $.wxConfig){
		wx.ready(function() {
			$.wxIsReady=true;
			$.setWxObj();
			
		});
		//alert($.wxConfig.appId+":"+$.wxConfig.timestamp+":"+$.wxConfig.nonceStr+":"+$.wxConfig.signature);
		wx.config({
			debug: false,
			appId: $.wxConfig.appId,
			timestamp:$.wxConfig.timestamp,
			nonceStr:$.wxConfig.nonceStr,
			signature:$.wxConfig.signature,
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"]
		});
	}
}
$(document).ready(function(){
	setTimeout(function(){
		loadWx();
	},1000);
});

//读取用户数据
var infoResult=function(data){
	if(data.result == "success"  &&  data.c1ashed.length>0) {//获得正确数据
		return 1;
	}else if(1 ) {//已被扫描
		return 0;
	}else if(1 ) {//tiket过期
		return 0;
	}else if(1 ) {//10分钟后再扫
		return 0;
	}else if( 1) {//假码
		return 0;
	}else if( 1) {//活动未开始
		return 0;
	}else if(1 ) {//活动已结束
		return 0;
	} else {//系统错误
		return 0;
	}
};

//读取抽奖结果
var luckResult=function(data){//data
	if(1) {//获得正确数据
		return 1;
	}else if(1 ) {//已被扫描
		return 0;
	}else if(1 ) {//tiket过期
		return 0;
	}else if( 1) {//10分钟后再扫
		return 0;
	} else {//系统错误
		return 0;
	}
};
