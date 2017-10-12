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
//var api="http://play.leasiondata.cn/lsplaycity/";   // user_info"test/";
var api = "http://coeasion.cn:81/17playcity/";
// var api="test/";
var user={};
var userTicket = "";
// user.ticket=getQueryString('ticket');

var isTest=true;

function getTicket() {
	var ticket = window.location.href.split("#")[0].split("?")[1];
	console.log(ticket);
	if(ticket){
        ticket = ticket.substring(0, 32);
        userTicket = ticket;
        console.log(userTicket.length);
        return true;
	}else {
		return false;
	}
}

function checkMobile(str){
	console.log("checkMobile:"+str);
	// var reg = /^1[34578]\d{9}$/;
	if(!(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(str))){
		return true;
	}else{
		return false;
	}
}
function resetUrl(str){
	return str;
}
function loadData(api,data,cb){
	var _cb=cb;
	// data.ran=Math.random()*new Date().getTime();
	// data.token=user.token;
	//if(action=="user_info"){
	//	data.url4wxjssdk=window.location.href.split("#")[0];
	//}

	console.log(data);
	$.post(api,data,function(result){
		// console.log("result:"+result);
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
	// console.log(user.ticket);
	//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	$(".home_luck_but").bind(event,function(){
		window.location.href="playcity/game/index.html?"+user.poolsTicket;
	});
	$(".home_personal_but").bind(event,function(){
		window.location.href="playcity/personal.html?"+user.selfticket;
	});
	$(".home_exchange_but").bind(event,function(){
		window.location.href="playcity/list.html?"+user.listTicket;
	});
	$(".home_order_list_but").bind(event,function(){
		window.location.href="playcity/order_list.html?ticket="+user.ticket;
	});

	$(".luck_but").bind(event,function(){
		window.location.href="game/index.html?ticket="+user.ticket;
	});
	$(".personal_but").bind(event,function(){
		window.location.href="personal.html?"+sessionStorage.getItem("self");
	});
	$(".exchange_but").bind(event,function(){
		window.location.href="list.html?ticket="+user.ticket;
	});
	$(".order_list_but").bind(event,function(){
		window.location.href="order_list.html?"+sessionStorage.getItem("self");
	});
	$(".back-but").bind(event,function(){
		window.location.href="../index.html?"+sessionStorage.getItem("firstTicket");
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
		window.location.href="rotating.html?ticket="+user.ticket+"&aj=aj10";
	});

	loadUser();
	// setInterval(loadUser,30000);
});


