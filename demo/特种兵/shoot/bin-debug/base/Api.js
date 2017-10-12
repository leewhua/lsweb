var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Api = (function () {
    function Api() {
    }
    Api.load = function (type, url, data, thisObj, success, error, async) {
        if (success === void 0) { success = null; }
        if (error === void 0) { error = null; }
        if (async === void 0) { async = true; }
        console.log("api load:" + type);
        data.ran = Math.random() * new Date().getTime() + new Date().getTime();
        $.ajax({
            url: url,
            data: data,
            success: function (obj) {
                if (success)
                    success.call(thisObj, obj);
            },
            error: function () {
                if (error) {
                    error.call(thisObj);
                }
                else {
                    Main._main.dispatchEvent(new EventObj('event', 'msg_event', true, false, MsgPop.at_upgrade));
                }
            }, timeout: 8000,
            dataType: "json", async: async, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    Main._main.dispatchEvent(new EventObj('event', 'msg_event', true, false, MsgPop.at_time_out));
                }
            }
        });
    };
    Api.getTicket = function () {
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
        console.log("getTicket");
        if (url && url.length > 20) {
            ut = url.split(",");
            Api.user_ticket = ut[0];
            Api.status_ticket = ut[1];
            console.log(Api.user_ticket, Api.status_ticket);
            return true;
        }
        else {
            return false;
        }
    };
    Api.reSetShareUrl = function () {
        var user = Api.user;
        var f = user.headimgurl.split("http://")[1];
        var n = encodeURIComponent(user.nickname);
        var a = "";
        var obj = $["shareObj"];
        obj.link = "http://res.leasiondata.cn/lstatic/r/share.html?f=" + f + "&n=" + n + "&a=" + a;
        //obj.copy = user.nickname + "酒量战胜全国" + w + "%酒友！赢取" + m + "元现金红包！买青啤原浆开罐扫码与他一战！";
        $["setWxObj"]();
    };
    Api.cookie = function (name, value, options) {
        if (value === void 0) { value = undefined; }
        if (options === void 0) { options = undefined; }
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options = $.extend({}, options);
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                }
                else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        }
        else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
    return Api;
}());
Api.city_url = "http://0k6.cn/t/goplaycity";
Api.user_api_url = "http://leasiondata.cn/info";
Api.play_url = "http://leasiondata.cn/play";
//isplay
//gameres=1
//desc=抽中红包
Api.user_buy_url = "http://play.leasiondata.cn/newplaycity/exprize";
Api.user_ticket = "d82cf56540134d6f93fb88d3edf5dc50";
Api.status_ticket = "136c4f5463e047deb8e797c5a94280dc";
Api.code_api_url = "http://123.59.156.230/newinputcode";
Api.verify_path = "http://123.59.156.230/lstatic/verify/";
Api.buy_list_url = "http://play.leasiondata.cn/newplaycity/gift";
Api.user = null;
Api.browser = 'weixin';
Api.award = { type: "cash", count: 1 };
__reflect(Api.prototype, "Api");
//# sourceMappingURL=Api.js.map