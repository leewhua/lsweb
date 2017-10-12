var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewName;
(function (ViewName) {
    ViewName[ViewName["None"] = 0] = "None";
    ViewName[ViewName["Loading"] = 1] = "Loading";
    ViewName[ViewName["Logo"] = 2] = "Logo";
    ViewName[ViewName["Main"] = 3] = "Main";
    ViewName[ViewName["Ball"] = 4] = "Ball";
    ViewName[ViewName["Content"] = 5] = "Content";
})(ViewName || (ViewName = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        GameScene.instance = _this;
        _this.container = new egret.DisplayObjectContainer();
        _this.addChild(_this.container);
        // this.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        //创建 DeviceOrientation 类
        var orientation = new egret.DeviceOrientation();
        //添加事件监听器
        orientation.addEventListener(egret.Event.CHANGE, _this.onOrientation, _this);
        //开始监听设备方向变化
        orientation.start();
        _this.gamma = 0;
        _this.beta = 0;
        return _this;
    }
    GameScene.prototype.onOrientation = function (e) {
        console.log(e.alpha, e.beta, e.gamma);
        if (this.sky) {
            egret.Tween.removeTweens(this.sky);
            egret.Tween.get(this.sky).to({ x: this.skyX + e.gamma, y: this.skyY + e.beta }, 100);
            // this.sky.x = this.skyX + e.gamma;
            // this.sky.y = this.skyY + e.beta;
            this.gamma = e.gamma;
            this.beta = e.beta;
        }
    };
    GameScene.prototype.touchBegin = function (evt) {
        this.beginY = evt.stageY;
        this.beginTime = egret.getTimer();
        this.beginStageY = 0;
        console.log("touchBegin:" + this.beginY);
    };
    GameScene.prototype.touchMove = function (evt) {
        if (this.beginStageY) {
            var tempY = evt.stageY;
            var temp = tempY - this.beginStageY;
            this.container.y += temp;
        }
        this.beginStageY = evt.stageY;
    };
    GameScene.prototype.touchEnd = function (evt) {
        var tempY = evt.stageY;
        var tempTime = egret.getTimer();
        var speed = (tempY - this.beginY) / (tempTime - this.beginTime);
        console.log("touchEnd:" + speed, tempY, this.beginY, tempTime, this.beginTime, this.curPage);
        if (Math.abs(speed) < 0.3) {
            this.moveEnd();
        }
        else {
            //触发滚动事件
            switch (this.curPage) {
                case ViewName.Loading:
                    if (speed > 0) {
                        this.moveEnd();
                    }
                    else {
                        this.container.y = 0;
                        this.startGame(null);
                    }
                    break;
                case ViewName.Logo:
                    this.moveEnd();
                    break;
                case ViewName.Main:
                    if (speed > 0) {
                        this.container.y = 0;
                        this.hideMain();
                        this.showLoading();
                        this.loadingView.setComplete();
                    }
                    else {
                        this.moveEnd();
                    }
                    break;
                case ViewName.Ball:
                    if (speed > 0) {
                        this.container.y = 0;
                        this.hideBall();
                        this.showMain();
                    }
                    else {
                        this.container.y = 0;
                        this.showContent(this.ballView.index);
                    }
                    break;
                case ViewName.Content:
                    if (speed > 0) {
                        if (this.contentView.select == 0) {
                            this.container.y = 0;
                            this.showBall(this.contentView.index);
                            this.hideContent();
                        }
                        else {
                            this.moveEnd();
                            this.contentView.movePage(0);
                        }
                    }
                    else {
                        if (this.contentView.select == 0) {
                            // this.container.y = 0;
                            // this.showBall(this.contentView.index);
                            // this.hideContent();
                            if (this.contentView.index == 4) {
                                this.moveEnd();
                                this.contentView.movePage(0);
                            }
                            else {
                                this.moveEnd(-1059);
                                this.contentView.movePage(1);
                            }
                        }
                        else {
                            this.moveEnd(-1059);
                        }
                    }
                    break;
            }
        }
    };
    GameScene.prototype.moveEnd = function (tempY) {
        if (tempY === void 0) { tempY = 0; }
        egret.Tween.get(this.container).to({ y: tempY }, 500, egret.Ease.circOut);
    };
    GameScene.prototype.intoContent = function (evt) {
        var index = evt.data;
        this.showContent(index);
    };
    GameScene.prototype.ballClick = function (evt) {
        this.hideMain();
        var index = evt.data;
        this.showBall(index);
        GameDispatcher.instance.addEventListener(EventName.Into_Content, this.intoContent, this);
    };
    GameScene.prototype.startGame = function (evt) {
        this.hideLoading();
        this.showLogo();
    };
    GameScene.prototype.logoEnd = function (evt) {
        console.log("logoEnd");
        this.hideLogo();
        this.showMain();
    };
    GameScene.prototype.showContent = function (index) {
        // if(this.ballView)
        // {
        // 	egret.Tween.get(this.ballView).to({y:-StageUtils.stage.stageHeight},500,egret.Ease.circOut).call(this.hideBall,this);
        // }
        if (this.ballView) {
            this.hideBall();
        }
        this.contentView = new ContentView();
        // this.contentView.y = StageUtils.stage.stageHeight;
        this.container.addChild(this.contentView);
        this.contentView.setData(index);
        // egret.Tween.get(this.contentView).to({y:0},400,egret.Ease.circOut);
        this.curPage = ViewName.Content;
    };
    GameScene.prototype.hideContent = function () {
        this.container.removeChild(this.contentView);
        this.contentView = null;
    };
    GameScene.prototype.showBall = function (index) {
        console.log("ball");
        this.curPage = ViewName.Ball;
        this.ballView = new BallView();
        this.container.addChild(this.ballView);
        this.ballView.initView(index);
    };
    GameScene.prototype.hideBall = function () {
        this.container.removeChild(this.ballView);
        this.ballView = null;
    };
    GameScene.prototype.showMain = function () {
        console.log("main");
        this.curPage = ViewName.Main;
        this.mainView = new MainView();
        this.container.addChild(this.mainView);
        GameDispatcher.instance.addEventListener(EventName.Ball_Click, this.ballClick, this);
    };
    GameScene.prototype.hideMain = function () {
        this.container.removeChild(this.mainView);
        this.mainView = null;
    };
    GameScene.prototype.showLogo = function () {
        GameDispatcher.instance.addEventListener(EventName.Logo_End, this.logoEnd, this);
        this.logoView = new LogoView();
        this.container.addChild(this.logoView);
        this.curPage = ViewName.Logo;
    };
    GameScene.prototype.hideLogo = function () {
        this.container.removeChild(this.logoView);
        this.logoView = null;
        GameDispatcher.instance.removeEventListener(EventName.Logo_End, this.logoEnd, this);
    };
    GameScene.prototype.showLoading = function () {
        this.loadingView = new LoadingView();
        this.container.addChild(this.loadingView);
        GameDispatcher.instance.addEventListener(EventName.Start_Game, this.startGame, this);
        this.curPage = ViewName.Loading;
    };
    GameScene.prototype.hideLoading = function () {
        this.container.removeChild(this.loadingView);
        this.loadingView = null;
        GameDispatcher.instance.removeEventListener(EventName.Start_Game, this.startGame, this);
    };
    GameScene.prototype.setProgress = function (current, total) {
        this.loadingView.setProgress(current, total);
    };
    GameScene.prototype.setComplete = function () {
        this.loadingView.setComplete();
    };
    GameScene.prototype.showBG = function () {
        this.sky = AssetsUtils.createBitmapByName("bg_jpg");
        this.addChildAt(this.sky, 0);
        // this.sky.width = this.stage.stageWidth;
        // this.sky.height = this.stage.stageHeight;
        this.sky.x = this.stage.stageWidth - this.sky.width >> 1;
        this.sky.y = this.stage.stageHeight - this.sky.height >> 1;
        this.skyX = this.sky.x;
        this.skyY = this.sky.y;
        // var sx = window.innerWidth / this.stage.stageWidth;
        // var sy = window.innerHeight / this.stage.stageHeight;
        // sky.scaleX = 2;
        // sky.scaleX = sx / sy; 
        // sky.scaleY = sx / sy;
        // var sx = this.stage.stageWidth / window.innerWidth;
        // var sy = this.stage.stageHeight / window.innerHeight;
        // sky.scaleX = sx;
        // sky.scaleY = sy;
        // sky.width = window.innerWidth;
        // sky.height = window.innerHeight;
        console.log(window.innerWidth, this.stage.stageWidth, window.innerHeight, this.stage.stageHeight);
    };
    GameScene.prototype.refreshBg = function () {
        var tempx = this.sky.x;
        var tempy = this.sky.y;
        this.sky.x = (this.stage.stageWidth - this.sky.width >> 1) + this.gamma;
        this.sky.y = (this.stage.stageHeight - this.sky.height >> 1) + this.beta;
        this.skyX = this.sky.x;
        this.skyY = this.sky.y;
        // alert("refresh:"+this.sky.x+"_"+this.sky.y+","+tempx+"_"+tempy+","+this.gamma+"_"+this.beta);
        // alert(this.stage.stageWidth+"_"+this.stage.stageHeight);
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map