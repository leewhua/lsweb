var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.loaded = 0;
        Main._main = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var sx = window.innerWidth / 640;
        var sy = window.innerHeight / 1030;
        Main.scale = sx / sy;
        console.log(Main.scale);
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        if (Main.isTest || this.getData()) {
            this.loadUser();
            var _this1 = this;
        }
        else {
            Main.showLost('没有用户信息，请返回。');
        }
    };
    Main.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    };
    Main.prototype.loadConfig = function () {
        console.log("loadConfig");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/config.json", "resource/");
    };
    Main.prototype.showScene = function () {
        console.log("showScene");
        this.scene = new Scene();
        this.stage.addChildAt(this.scene, 0);
    };
    Main.prototype.clearOld = function () {
        if (this.old && this.old.parent)
            this.removeChild(this.old);
        this.old = null;
    };
    Main.prototype.onConfigComplete = function (event) {
        console.log("onConfigComplete");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.loadGroup("sc");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        console.log("onResourceLoadComplete:" + event.groupName);
        this.scene = Scene.instance;
        this.stage.addChildAt(Scene._scene, 0);
        this.stage.removeChild(this.loadingView);
        // RES.loadGroup("music");
    };
    Main.createBitmapByRes = function (res, name) {
        var result = new egret.Bitmap();
        var spriteSheet = RES.getRes(res);
        console.log("name::" + name + "::" + res);
        result.texture = spriteSheet.getTexture(name);
        return result;
    };
    Main.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.tweenTo = function (m, d, t, ox, oy, sc, ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        var w = m.width;
        var h = m.height;
        m.scaleX = m.scaleY = sc;
        m.x = xx + ox + (1 - sc) / 2 * w;
        m.y = yy + oy + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ "alpha": 1, scaleX: 1, scaleY: 1, x: xx, y: yy }, t, ease);
    };
    Main.createMc = function (json, png, lab) {
        var data = RES.getRes(json); //JSON  
        var texture = RES.getRes(png); //Texture  
        var md = new egret.MovieClipDataFactory(data, texture);
        var result = new egret.MovieClip(md.generateMovieClipData(lab));
        return result;
    };
    Main.setBut = function (sp) {
        if (sp) {
            sp.touchEnabled = true;
            sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { sp.alpha = 0.68; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_END, function () { sp.alpha = 1; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () { sp.alpha = 1; }, sp);
        }
    };
    /*
    *资源组加载出错
    *The resource group loading failed
    */
    Main.prototype.onResourceLoadError = function (event) {
        this.onResourceLoadComplete(event);
    };
    Main.prototype.onResourceProgress = function (event) {
        this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    };
    Main.prototype.getData = function () {
        var url = window.location.href.split("#")[0].split("?")[1].substring(0, 32); //
        var ut;
        console.log("loadUser");
        console.log(url);
        Main.ticket = url;
        if (Main.isTest || Main.ticket != "") {
            return true;
        }
        else {
            return false;
        }
    };
    Main.prototype.loadUser = function () {
        var self = this;
        console.log("loadUser", Main.userApi);
        if (Main.isTest) {
            Main.user.name = "test";
            Main.user.uid = "100";
            Main.user.profile = "";
            Main.user.point = 100;
            this.loadConfig();
            return;
        }
        //
        var _this1 = this;
        $.post(Main.api, { ticket: Main.ticket }, function (result) {
            var data = eval("(" + result + ")");
            if (data.error) {
                console.log(data.error_code, data.error);
                _this1.showLost("错误的用户信息。");
            }
            if (data.result == "fail") {
                _this1.showLost(data.result);
            }
            else {
                Main.user.name = data.nickname;
                if (data.prizes.length != 0) {
                    var dataPrizes = data.prizes[0];
                    sessionStorage.setItem("prizes", JSON.stringify(dataPrizes));
                    Main.oid = data.prizes[0].ticket;
                    Main.win = data.prizes[0].id;
                    // Scene.instance.showPrizes();
                    // var end = new End();
                    // _this1.addChild(end);
                    console.log(Main.user.uid);
                }
                else if (data.pools.length != 0) {
                    Main.user.uid = data.pools[0].ticket;
                    console.log(Main.user.uid);
                }
                else if (data.prizes.length == 0 && data.pools.length == 0) {
                    _this1.showLost("该二维码已参与抽奖！");
                    return;
                }
                // Main.user.profile = data.profile_image_url;
                // Main.user.point=data.point;
                _this1.loadConfig();
            }
        });
    };
    Main.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        console.log("get data : ", request.response);
    };
    Main.prototype.onGetIOError = function (event) {
        //console.log("get error : " + event);
    };
    Main.prototype.onGetProgress = function (event) {
        //console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    Main.prototype.showLost = function (str) {
        console.log("showLost");
        var lost = new egret.Sprite();
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.8);
        bg.graphics.drawRect(0, 0, 640, 1040);
        var msg = new egret.TextField();
        msg.background = false;
        msg.width = 600;
        msg.textColor = 0xffffff;
        msg.textAlign = "center";
        msg.size = 36;
        msg.text = str;
        msg.y = 500;
        msg.x = 20;
        lost.addChild(bg);
        lost.addChild(msg);
        this.addChild(lost);
        lost.alpha = 0;
        var tw = egret.Tween.get(lost);
        tw.to({ "alpha": 1 }, 400);
        // setTimeout(function(){
        //     window.location.href = "http://0k6.cn/a/gotoplaycity";
        //     },2000);
    };
    Main.showLost = function (str) {
        Main._main.showLost(str);
        //Main._main=this;
    };
    Main.track = function (str) {
        //eval("_hmt.push(['_trackEvent', 'click', '" + str + "', ''])");
    };
    Main.trackEvent = function (str) {
        //eval("_hmt.push(['_trackEvent', 'event', '" + str + "', ''])");
    };
    return Main;
}(egret.DisplayObjectContainer));
Main.shopUrl = "";
Main.win = 0;
Main.oid = "";
Main.isTest = false;
Main.userApi = "http://play.leasiondata.cn/lsplaycity/user_info";
// public static api: string = "http://play.leasiondata.cn/lsplaycity/luck";     //"http://lsid.me/luck/play";//"http://leasiondata.cn/luck/play1";//http://coeasion.cn/
Main.api = "http://coeasion.cn/";
Main.ticket = "d82cf56540134d6f93fb88d3edf5dc50";
Main.product_type = 'tk';
Main.user = {};
Main._main = null;
Main.scale = 1;
Main.luck = {};
Main.location = { country: null, province: null, city: null };
Main.award = { uid: null, nickname: null, type: "cash", count: 0.88 };
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map