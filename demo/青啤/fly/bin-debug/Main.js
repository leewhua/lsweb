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
        _this.nowScene = "luck";
        _this.nowLoad = "";
        Main._main = _this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.RESIZE, _this.reSizeHander, true);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    Main.prototype.reSizeHander = function (event) {
        var sx = window.innerWidth / 640;
        var sy = window.innerHeight / 1040;
        Main.scale = sx / sy;
        console.log('reSizeHander');
    };
    Main.prototype.eventHandler = function (event) {
        console.log('eventHandler', event.name);
        switch (event.name) {
            case 'help':
                this.showHelp();
                break;
            case 'start':
                break;
            case 'to_game':
                this.nowScene = "game";
                this.startLoad();
                break;
            case 'to_map':
                this.nowScene = "map";
                this.startLoad();
                break;
            case 'game_again':
                this.showSceneFun();
                break;
            case 'to_share':
                $('.wx').fadeIn();
                break;
        }
    };
    Main.prototype.onAddToStage = function (event) {
        var sx = window.innerWidth / 640;
        var sy = window.innerHeight / 1040;
        Main.scale = 1; //sx/sy;
        this.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        if (this.getData()) {
            this.loadUser();
        }
        else {
            Main.showLost(0);
        }
        $('.wx').click(function () {
            $('.wx').fadeOut();
        });
    };
    Main.prototype.loadConfig = function () {
        console.log("loadConfig");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/config.json", "resource/");
    };
    Main.prototype.outOld = function () {
        if (this.old) {
            var view = this.old;
            var tw = egret.Tween.get(this.old);
            tw.to({ y: -1015 }, 600, egret.Ease.circIn);
            tw.call(function () {
                if (view.parent) {
                    view.parent.removeChild(view);
                }
            });
            //this.removeChild(this.old);
            this.old = null;
        }
    };
    Main.prototype.showScene = function () {
        var _this1 = this;
        this.hideLoading();
        setTimeout(function () {
            _this1.showSceneFun();
        }, 800);
    };
    Main.prototype.showSceneFun = function () {
        console.log("showScene");
        if (this.now) {
            this.old = this.now;
        }
        this.outOld();
        if (this.nowScene == "luck") {
            this.now = new LuckScene();
        }
        else if (this.nowScene == "game") {
            this.now = new GameScene();
        }
        else if (this.nowScene == "map") {
            this.now = new MapScene();
        }
        this.addChildAt(this.now, 0);
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
        RES.loadGroup("loading");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        console.log("onResourceLoadComplete:" + event.groupName);
        this.nowLoad = "";
        if (event.groupName == "loading") {
            this.startLoad();
            if (this.nowScene == "map") {
                this.showMsgPop();
            }
        }
        else if (event.groupName == "luck") {
            this.showScene();
        }
        else if (event.groupName == "map") {
            this.showScene();
        }
        else if (event.groupName == "game") {
            this.showScene();
        }
        //game_again
    };
    Main.prototype.showHelp = function () {
        //var help=new Help();
        //this.addChild(help);
        $['showHelp']();
    };
    Main.prototype.showMsgPop = function () {
        var msg = new MsgPop();
        this.addChild(msg);
    };
    Main.prototype.showLoading = function () {
        if (this.loadingView)
            return;
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
    };
    Main.prototype.hideLoading = function () {
        if (this.loadingView) {
            this.loadingView.hide();
            this.loadingView = null;
        }
    };
    Main.prototype.startLoad = function () {
        this.showLoading();
        if (this.nowLoad != this.nowScene) {
            this.nowLoad = this.nowScene;
            console.log("this.nowScene:" + this.nowScene);
            if (this.nowScene == "luck") {
                RES.loadGroup("luck");
            }
            else if (this.nowScene == "game") {
                RES.loadGroup("game");
            }
            else if (this.nowScene == "map") {
                RES.loadGroup("map");
            }
            else {
            }
        }
        console.log("startLoad：" + this.nowScene);
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
    Main.zoomIn = function (m, d, t, sc) {
        Main.tweenTo(m, d, t, 0, 0, sc, egret.Ease.backOut);
    };
    Main.zoomOut = function (m, d, t, sc) {
        Main.tweenToHide(m, d, t, 0, 0, sc, egret.Ease.cubicIn);
    };
    Main.tweenToHide = function (m, d, t, ox, oy, sc, ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        //var h = m.height;
        xx = xx + ox; // + (1 - sc) / 2 * w;
        yy = yy + oy; // + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: 0, scaleX: sc, scaleY: sc, x: xx, y: yy }, t, ease);
        tw.call(function () {
            if (m.parent)
                m.parent.removeChild(m);
        });
    };
    Main.tweenTo = function (m, d, t, ox, oy, sc, ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        // var h = m.height;
        m.scaleX = m.scaleY = sc;
        m.x = xx + ox; // + (1 - sc) / 2 * w;
        m.y = yy + oy; // + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: 1, scaleX: 1, scaleY: 1, x: xx, y: yy }, t, ease);
    };
    Main.createMc = function (json, png, lab) {
        var data = RES.getRes(json); //JSON  
        var texture = RES.getRes(png); //Texture  
        var md = new egret.MovieClipDataFactory(data, texture);
        var result = new egret.MovieClip(md.generateMovieClipData(lab));
        //result.play();
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
    /**
    * 资源组加载出错
    *  The resource group loading failed
    */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
    };
    Main.prototype.getData = function () {
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
        console.log("loadUser");
        if (Main.isTest) {
            return true;
        }
        //Main.api ="test.json";
        if (url && url.length > 20) {
            ut = url.split(",");
            Main.user_ticket = ut[0];
            Main.status_ticket = ut[1];
            console.log(Main.user_ticket, Main.status_ticket);
            return true;
        }
        else {
            return false;
        }
    };
    Main.reSetShareUrl = function () {
        //http://res.leasiondata.cn/lstatic/p/share.html
        //f=&n=&t=&w=&m=
        var user = Main.user;
        var more = user.more;
        var t = more.mytotal;
        var w;
        if (user.mysort == 0) {
            w = 0;
        }
        else {
            w = Math.floor((user.more.total - user.more.mysort) / (user.more.total - 1) * 100);
        }
        var m = more.mytotal;
        var f = user.headimgurl.split("http://")[1];
        var n = encodeURIComponent(user.nickname);
        var obj = $["shareObj"];
        obj.link = "http://res.leasiondata.cn/lstatic/p/share.html?f=" + f + "&n=" + n + "&t=" + t + "&w=" + w + "&m=" + m;
        obj.copy = user.nickname + "酒量战胜全国" + w + "%酒友！赢取" + m + "元现金红包！买青啤原浆开罐扫码与他一战！";
        //user.nickname+"酒量战胜全国23%酒友！赢取xx元现金红包！买青啤原浆开罐扫码与他一战！
        $["setWxObj"]();
    };
    Main.prototype.loadUser = function () {
        console.log("loadUser");
        if (Main.isTest) {
            //this.nowScene ="game";
            this.nowScene = "game";
            this.loadConfig();
            Main.user = { "nickname": "jeff", "headimgurl": "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0" };
            return;
        }
        //
        var _this1 = this;
        $.ajax({
            url: Main.user_api,
            data: { ticket: Main.user_ticket, desc: "test" },
            success: function (data) {
                if (data.result == 'success') {
                    data.nickname = decodeURIComponent(data.nickname);
                    data.city = decodeURIComponent(data.city);
                    Main.user = data;
                    var more = data.more;
                    if (data.c1ashed == '') {
                        _this1.nowScene = "luck";
                    }
                    else {
                        _this1.nowScene = "map";
                    }
                    _this1.loadConfig();
                    Main.reSetShareUrl();
                }
                else {
                    Main.showLost(2);
                }
            },
            error: function () {
                Main.showLost(400);
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    Main.showLost(502);
                }
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
    Main.prototype.showLost = function (type) {
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
        if (type == 0) {
            msg.text = "错误的链接，请重新扫码...";
        }
        else if (type == 1) {
            msg.text = "已过期，请重新扫码...";
        }
        else if (type == 2) {
            msg.text = "网络异常，请重新扫码...";
        }
        else if (type == 3) {
            msg.text = "码已经被抽过了...";
        }
        else if (type == 31) {
            msg.text = "您已领过奖品";
        }
        else if (type == 400) {
            msg.text = "表示系统繁忙，请稍后再试...";
        }
        else if (type == 502) {
            msg.text = "访问超时，请重新扫码...";
        }
        else {
            msg.text = "已过期，请重新扫码...";
        }
        msg.y = 500;
        msg.x = 20;
        lost.addChild(bg);
        lost.addChild(msg);
        this.addChild(lost);
        lost.alpha = 0;
        var tw = egret.Tween.get(lost);
        tw.to({ "alpha": 1 }, 400);
    };
    Main.showLost = function (type) {
        Main._main.showLost(type);
        //Main._main=this;
    };
    Main.getArrayItems = function (arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            }
            else {
                break;
            }
        }
        return return_array;
    };
    return Main;
}(egret.DisplayObjectContainer));
Main.isTest = true;
Main.user_api = "http://leasiondata.cn/info";
Main.api = "http://leasiondata.cn/play";
Main.user_ticket = "d82cf56540134d6f93fb88d3edf5dc50";
Main.status_ticket = "136c4f5463e047deb8e797c5a94280dc";
//public  static save_ticket: string = "136c4f5463e047deb8e797c5a94280dc";
Main.user = { nickname: "", headimgurl: "" };
Main._main = null;
Main.scale = 1;
Main.location = { country: null, province: null, city: null };
Main.award = { uid: null, nickname: null, type: "cash", count: 1 };
__reflect(Main.prototype, "Main");
///share.html?f=wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0&m=12&t=10&w=80
//# sourceMappingURL=Main.js.map