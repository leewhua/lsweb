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
var mainScroll;
//var api="http://play.leasiondata.cn/lsplaycity/";    user_info"test/";
var api="test/";
var user={};
user.token=getQueryString('token');

var isTest=true;

function checkMobile(str){
	console.log("checkMobile:"+str);
	if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(str)){
		return true;
	}else{
		return false;
	}
}
function resetUrl(str){
	return str;
}
function loadData(action,data,cb){
	var _cb=cb;
	data.ran=Math.random()*new Date().getTime();
	data.token=user.token;
	//if(action=="user_info"){
	//	data.url4wxjssdk=window.location.href.split("#")[0];
	//}
	console.log(data);
	$.post(api+action,data,function(result){
		console.log("result:"+result);
		var json = eval("("+result+")");
		if(checkData(json)){
			_cb(json);
		}else{

		}
	});
}

function checkData(data){
	if(data.error){
		console.log(data.error_code,data.error);
		setTimeout(function(){
			if(!isTest)window.location.href="http://0k6.cn/a/gotoplaycity";
		},500);
		//
		return false;
	}else{
		//if(data.wxconfig){
		//	$.wxConfig=data.wxconfig;
		//	$.initWx();
		//}
		return true;
	}
}
function getQueryString(name) {
	var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}



$(document).ready(function(){
	var event="click";
	console.log(user.token);
	//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	$(".home_luck_but").bind(event,function(){
		window.location.href="playcity/game/index.html?token="+user.token;
	});
	$(".home_personal_but").bind(event,function(){
		window.location.href="playcity/personal.html?token="+user.token;
	});
	$(".home_exchange_but").bind(event,function(){
		window.location.href="playcity/list.html?token="+user.token;
	});
	$(".home_order_list_but").bind(event,function(){
		window.location.href="playcity/order_list.html?token="+user.token;
	});

	$(".luck_but").bind(event,function(){
		window.location.href="game/index.html?token="+user.token;
	});
	$(".personal_but").bind(event,function(){
		window.location.href="personal.html?token="+user.token;
	});
	$(".exchange_but").bind(event,function(){
		window.location.href="list.html?token="+user.token;
	});
	$(".order_list_but").bind(event,function(){
		window.location.href="order_list.html?token="+user.token;
	});
	$(".back-but").bind(event,function(){
		window.location.href="../playcity.html?token="+user.token;
	});
//
	$(".to-follow").bind(event,function(){
		$(".wx2").fadeIn();
	});
	$(".wx .qr-close").bind(event,function(){
		$(".wx").fadeOut();
	});
	$(".wx2 .qr-close2").bind(event,function(){
		$(".wx2").fadeOut();
	});
	$('.to-aj').bind(event,function(){
		window.location.href="rotating.html?ticket="+user.token+"&aj=aj10";
	});
	loadUser();
	setInterval(loadUser,30000);
});


