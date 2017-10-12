/**
 *
 * @author 
 *
 */
class Api {
    static city_url = "http://0k6.cn/t/goplaycity";
    static user_api_url: string = "http://leasiondata.cn/info";
    static play_url: string = "http://leasiondata.cn/play";
    //isplay
    //gameres=1
    //desc=抽中红包
    static user_buy_url: string = "http://play.leasiondata.cn/newplaycity/exprize";
    
    
    static user_ticket: string = "d82cf56540134d6f93fb88d3edf5dc50";
    static status_ticket: string = "136c4f5463e047deb8e797c5a94280dc";
    
    static code_api_url: string = "http://123.59.156.230/newinputcode";
    static verify_path: string = "http://123.59.156.230/lstatic/verify/";
    static buy_list_url: string = "http://play.leasiondata.cn/newplaycity/gift";
    static user: any = null;
    static browser: string = 'weixin';
    static award: any = { type: "cash",count: 1 };

	
    static load(type,url,data,thisObj,success=null,error = null,async=true){
        console.log("api load:"+type);
        data.ran = Math.random() * new Date().getTime() + new Date().getTime();
        $.ajax({
            url: url,
            data:data,
            success: function(obj) {
                if(success)success.call(thisObj,obj);
            },
            error: function() {
                if(error){
                    error.call(thisObj);
                }else{
                    Main._main.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_upgrade));
                }
            },timeout: 8000,
            dataType: "json",async: async,type: "POST",
            complete: function(XMLHttpRequest,status) {
                if(status == 'timeout') {
                    Main._main.dispatchEvent(new EventObj('event','msg_event',true,false,MsgPop.at_time_out));
                }
            }
        });
	}
    static getTicket() {
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
        console.log("getTicket");

        if(url && url.length > 20) {
            ut = url.split(",");
            Api.user_ticket = ut[0];
            Api.status_ticket = ut[1];
            console.log(Api.user_ticket,Api.status_ticket);
            return true;
        } else {
            return false;
        }
    }

    static reSetShareUrl() {

        var user: any = Api.user;

        var f = user.headimgurl.split("http://")[1];
        var n = encodeURIComponent(user.nickname);
        var a = "";
        var obj: any = $["shareObj"];

        obj.link = "http://res.leasiondata.cn/lstatic/r/share.html?f=" + f + "&n=" + n + "&a=" + a;
        //obj.copy = user.nickname + "酒量战胜全国" + w + "%酒友！赢取" + m + "元现金红包！买青啤原浆开罐扫码与他一战！";
        $["setWxObj"]();
    }
    
    static cookie(name,value = undefined,options = undefined) {
        if(typeof value != 'undefined') {
            options = options || {};
            if(value === null) {
                value = '';
                options = $.extend({},options);
                options.expires = -1;
            }
            var expires = '';
            if(options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if(typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }

            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');
        } else {
            var cookieValue = null;
            if(document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for(var i = 0;i < cookies.length;i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if(cookie.substring(0,name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
    
 
    public constructor() {
    }

}
