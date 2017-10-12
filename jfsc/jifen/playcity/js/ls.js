$.shareObj={link:"http://0k6.cn/a/gotoplaycityfromshare",
			imgUrl:"http://res.leasiondata.cn/lstatic/a/share/kzw.jpg",
			copy:"我在这里参加了“康之味”的积分抽奖活动，快来扫码和我一起赢大奖吧！"};

$.wxIsReady=false;
$.wxConfig=null;
var loadWx=function(){
	$.ajax({
		url: "http://123.59.89.56:81/newwxakouter/wxshare",
		data: {url4wxjssdk:window.location.href.split("#")[0]},
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
	loadWx();
});

