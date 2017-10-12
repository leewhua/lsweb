$.shareObj={link:"http://res.leasiondata.cn/lstatic/p/share.html",
			imgUrl:"http://res.leasiondata.cn/lstatic/p/share.jpg",
			copy:"拉开鲜活码上赢奖"};
$.wxIsReady=false;
$.wxConfig=null;
var loadWx=function(){
	$.ajax({
		url: "http://lsid.me/newlsplay4hm/info",   //http://123.59.89.56:81/newwxakouter/wxshare
		data: {type:"getwxconfig",url4wxjssdk:window.location.href.split("#")[0],eid:"p"},
		success: function(data) {
			if(data) {
				$.wxConfig=data;
				console.log($.wxConfig);
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

