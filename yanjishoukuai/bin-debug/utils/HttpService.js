var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpService = (function () {
    function HttpService(data, post) {
        if (post === void 0) { post = egret.HttpMethod.GET; }
        this.data = data;
        this.post = post;
    }
    HttpService.prototype.exec = function () {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        if (this.post == egret.HttpMethod.GET) {
            request.open(this.url + "?" + this.data, this.post);
        }
        else {
            request.open(this.url, this.post);
        }
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
        if (this.post == egret.HttpMethod.GET) {
            request.send(this.data);
        }
        else {
            request.send();
        }
    };
    HttpService.prototype.onComplete = function (e) {
        var request = e.currentTarget;
        this.result(request.response);
    };
    HttpService.prototype.onIOError = function () {
    };
    HttpService.prototype.result = function (result) {
    };
    return HttpService;
}());
__reflect(HttpService.prototype, "HttpService");
//# sourceMappingURL=HttpService.js.map