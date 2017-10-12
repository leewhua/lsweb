$.shareObj={link:"http://res.leasiondata.cn/lstatic/a/test/bv_paper.html",
			imgUrl:"http://res.leasiondata.cn/lstatic/a/share.jpg",
			copy:"这可能是一份无人问津的神秘《呐喊王日报》"};
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

$.addCard=function(obj,cardList,success,cancel){
	if(wx){
		wx.addCard({
	      cardList:cardList,
	      /* 
	      [
	        {
	          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
	          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"ad9cf9463610bc8752c95084716581d52cd33aa0"}'
	        },
	        {
	          cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
	          cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"ad9cf9463610bc8752c95084716581d52cd33aa0"}'
	        }
	      ],*/
	      success: function (res) {
	        //alert('已添加卡券：' + JSON.stringify(res.cardList));
	         success.call(obj,res);
	      },
	      cancel: function (res) {
	        cancel.call(obj,res);
	        //alert(JSON.stringify(res))
	      }
	    });
	} 
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
        $WxIsInit = true;
        // getLoct();
        //每5秒获取一次地址经纬坐标
        //setInterval(getLoct, 2000);
        //setTimeout(getLoct,2000);
    }
}

var getLoct =  function () {
    //if(wx && $.wxConfig)
    //{
    //    //每5秒获取一次地址经纬坐标
    //    //获取地理信息
    //    wx.getLocation({
    //        type: 'wgs84',
    //        success: function (res) {
    //            var loctData = {
    //                desc: "lng是经度，lat是维度",
    //                lng: res.longitude, //经度
    //                lat: res.latitude,  //维度
    //                speed: res.speed,
    //                accuracy: res.accuracy
    //            };
    //            loadDate(res.longitude,res.latitude);
    //            //$WxGpsLoct = {
    //            //    lng: res.longitude,
    //            //    lat: res.latitude
    //            //};
    //        },
    //        cancel: function (res) {
    //            alert('用户拒绝授权获取地理位置' + res);
    //            loadDate("","");
    //        },
    //        error:function(res)
    //        {
    //            alert("error:"+res);
    //            loadDate("","");
    //        }
    //    });
    //}

    loadDate("","");
}

var loadDate = function(x,y)
{
    $.ajax({
        url: $API,
        data: { lng:x,lat:y},
        success: function(data)
        {
            //"result":“fail"
            if(data.result == "fail")
            {

            }else
            {
                $WxGpsLoct = {
                    lng: data.lng,
                    lat: data.lat
                };

                $marketList = data.nearby;

                $refreshMap();
            }
            setTimeout(getLoct,5000);
        },
        error: function()
        {
            //Main.showLost(2);
            setTimeout(getLoct,5000);
        },timeout: 8000,
        dataType: "json",async: true,type: "POST",
        complete: function(XMLHttpRequest,status)
        {
            if(status == 'timeout')
            {
                //Main.showLost(2);
                setTimeout(getLoct,5000);
            }
        }
    });
}

var initWx=function(){
	if(wx && $.wxConfig){
		wx.ready(function() {
			$.wxIsReady=true;
			// $.setWxObj();
			
		});
		//alert($.wxConfig.appId+":"+$.wxConfig.timestamp+":"+$.wxConfig.nonceStr+":"+$.wxConfig.signature);
		wx.config({
			debug: false,
			appId: $.wxConfig.appId,
			timestamp:$.wxConfig.timestamp,
			nonceStr:$.wxConfig.nonceStr,
			signature:$.wxConfig.signature,
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","getLocation","addCard"]
		});
	}
}
$(document).ready(function(){
	loadWx();
});

