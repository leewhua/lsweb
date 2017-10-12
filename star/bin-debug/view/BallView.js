var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BallView = (function (_super) {
    __extends(BallView, _super);
    function BallView() {
        return _super.call(this) || this;
    }
    // private returnClickHandler():void
    // {
    // 	GameScene.instance.hideBall();
    // 	GameScene.instance.showMain();
    // }
    BallView.prototype.initView = function (index) {
        this.index = index;
        // this.btnReturn = AssetsUtils.createBitmapByName("btnReturn_png");
        // this.btnReturn.x = StageUtils.stage.stageWidth - this.btnReturn.width;
        // this.btnReturn.y = StageUtils.stage.stageHeight - this.btnReturn.height;
        // this.btnReturn.touchEnabled = true;
        // this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnClickHandler,this);
        // this.addChild(this.btnReturn);
        this.imgBall = AssetsUtils.createBitmapByName("ball" + index + "_png");
        this.imgBall.anchorOffsetX = 100;
        this.imgBall.anchorOffsetY = 100;
        this.imgBall.x = StageUtils.CW;
        this.imgBall.y = StageUtils.CH - 100;
        // StageUtils.centerInParent(this.imgBall);
        // this.imgBall.y -= 400;
        this.addChild(this.imgBall);
        this.selectBg1 = AssetsUtils.createBitmapByName("ball_bg2_png");
        this.selectBg1.anchorOffsetX = 224;
        this.selectBg1.anchorOffsetY = 228;
        this.selectBg1.x = this.imgBall.x;
        this.selectBg1.y = this.imgBall.y;
        this.addChild(this.selectBg1);
        this.selectBg2 = AssetsUtils.createBitmapByName("ball_bg3_png");
        this.selectBg2.anchorOffsetX = 224;
        this.selectBg2.anchorOffsetY = 228;
        this.selectBg2.x = this.imgBall.x;
        this.selectBg2.y = this.imgBall.y;
        this.addChild(this.selectBg2);
        this.selectBg3 = AssetsUtils.createBitmapByName("ball_bg4_png");
        this.selectBg3.anchorOffsetX = 112;
        this.selectBg3.anchorOffsetY = 104;
        this.selectBg3.x = this.imgBall.x + 0;
        this.selectBg3.y = this.imgBall.y + 2;
        this.selectBg3.scaleX = this.selectBg3.scaleY = 2;
        this.addChild(this.selectBg3);
        var s = new egret.Shape();
        s.graphics.beginFill(0x000000);
        s.graphics.drawCircle(this.selectBg3.x, this.selectBg3.y, 2);
        s.graphics.endFill();
        this.addChild(s);
        this.selectBg1.alpha = 0;
        this.selectBg2.alpha = 0;
        this.selectBg3.alpha = 0;
        this.imgText = AssetsUtils.createBitmapByName("p3_c" + index + "_png");
        StageUtils.centerInParent(this.imgText);
        this.imgText.y += 200;
        this.addChild(this.imgText);
        this.btnOpen = AssetsUtils.createBitmapByName("search_png");
        StageUtils.centerInParent(this.btnOpen);
        this.btnOpen.y += 300;
        this.addChild(this.btnOpen);
        this.btnOpen.touchEnabled = true;
        this.btnOpen.addEventListener(egret.TouchEvent.TOUCH_END, this.openClick, this);
        this.showFlash();
    };
    BallView.prototype.showFlash = function () {
        this.imgBall.alpha = 0;
        egret.Tween.get(this.imgBall).to({ scaleX: 1.75, scaleY: 1.75, alpha: 1 }, 500);
        this.imgText.alpha = 0;
        egret.Tween.get(this.imgText).to({ alpha: 1 }, 500);
        this.btnOpen.alpha = 0;
        egret.Tween.get(this.btnOpen).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(this.selectBg1).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(this.selectBg2).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(this.selectBg3).wait(500).to({ alpha: 1 }, 500);
        egret.Tween.get(this.selectBg2, { loop: true }).to({ rotation: 360 }, 5000);
        egret.Tween.get(this.selectBg3, { loop: true }).to({ rotation: -360 }, 5000);
    };
    // private showFlash1():void
    // {
    // 	egret.Tween.get(this.selectBg2,{loop:true}).to({rotation:360},5000);
    // 	egret.Tween.get(this.selectBg3,{loop:true}).to({rotation:-360},5000);
    // 	egret.Tween.get(this.selectBg1,{loop:true}).to({rotation:-360},5000);
    // }
    BallView.prototype.openClick = function () {
        if (this.index) {
            if (this.index == 4) {
                // var tiket = window.location.href.split("#")[0].split("?")[1];
                window.location.href = "http://res.leasiondata.cn/lstatic/demo/kzw-ball/index.html";
            }
            else {
                if (Main.loaded_music) {
                    var sound = RES.getRes("loading_click_mp3");
                    sound.play(0.8, 1);
                }
                GameDispatcher.instance.dispatchEventWith(EventName.Into_Content, false, this.index);
            }
        }
    };
    return BallView;
}(egret.DisplayObjectContainer));
__reflect(BallView.prototype, "BallView");
//# sourceMappingURL=BallView.js.map