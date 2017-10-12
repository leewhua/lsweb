var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    MainView.prototype.initView = function () {
        this.img1 = AssetsUtils.createBitmapByName("p3_title_png");
        StageUtils.centerInParent(this.img1);
        this.img1.y -= 400;
        this.addChild(this.img1);
        this.img2 = AssetsUtils.createBitmapByName("org_png");
        StageUtils.centerInParent(this.img2);
        this.img2.x += 270;
        this.img2.y -= 460;
        this.addChild(this.img2);
        this.img3 = AssetsUtils.createBitmapByName("p3_kuang_png");
        StageUtils.centerInParent(this.img3);
        this.img3.y += 30;
        this.addChild(this.img3);
        var logo = AssetsUtils.createBitmapByName("llogo_png");
        logo.scaleX = logo.scaleY = 0.8;
        StageUtils.centerInParent(logo, 30, 0);
        this.addChild(logo);
        this.ball1 = AssetsUtils.createBitmapByName("ball1_png");
        // this.ball1.x = StageUtils.CW - 124;
        // this.ball1.y = StageUtils.CH - 158;
        StageUtils.centerInParent(this.ball1, -124 + 100, -158 + 100);
        this.ball2 = AssetsUtils.createBitmapByName("ball2_png");
        // this.ball2.x = StageUtils.CW + 124;
        // this.ball2.y = StageUtils.CH - 158;
        StageUtils.centerInParent(this.ball2, 124 + 100, -158 + 100);
        this.ball3 = AssetsUtils.createBitmapByName("ball3_png");
        // this.ball3.x = StageUtils.CW + 200;
        // this.ball3.y = StageUtils.CH + 76;
        StageUtils.centerInParent(this.ball3, 200 + 100, 76 + 100);
        this.ball4 = AssetsUtils.createBitmapByName("ball4_png");
        // this.ball4.x = StageUtils.CW;
        // this.ball4.y = StageUtils.CH + 227;
        StageUtils.centerInParent(this.ball4, 0 + 100, 227 + 100);
        this.ball5 = AssetsUtils.createBitmapByName("ball5_png");
        // this.ball5.x = StageUtils.CW - 200;
        // this.ball5.y = StageUtils.CH + 76;
        StageUtils.centerInParent(this.ball5, -200 + 100, 76 + 100);
        var b1bg = AssetsUtils.createBitmapByName("ball_bg4_png");
        b1bg.x = this.ball1.x - 122;
        b1bg.y = this.ball1.y - 116;
        this.addChild(b1bg);
        var b2bg = AssetsUtils.createBitmapByName("ball_bg4_png");
        b2bg.x = this.ball2.x - 122;
        b2bg.y = this.ball2.y - 116;
        this.addChild(b2bg);
        var b3bg = AssetsUtils.createBitmapByName("ball_bg4_png");
        b3bg.x = this.ball3.x - 122;
        b3bg.y = this.ball3.y - 116;
        this.addChild(b3bg);
        var b4bg = AssetsUtils.createBitmapByName("ball_bg4_png");
        b4bg.x = this.ball4.x - 122;
        b4bg.y = this.ball4.y - 116;
        this.addChild(b4bg);
        var b5bg = AssetsUtils.createBitmapByName("ball_bg4_png");
        b5bg.x = this.ball5.x - 122;
        b5bg.y = this.ball5.y - 116;
        this.addChild(b5bg);
        this.addChild(this.ball1);
        this.addChild(this.ball2);
        this.addChild(this.ball3);
        this.addChild(this.ball4);
        this.addChild(this.ball5);
        this.selectBg1 = AssetsUtils.createBitmapByName("ball_bg2_png");
        this.selectBg1.x = this.ball1.x - 140;
        this.selectBg1.y = this.ball1.y - 145;
        this.selectBg1.scaleX = this.selectBg1.scaleY = 0.58;
        this.addChild(this.selectBg1);
        this.selectBg2 = AssetsUtils.createBitmapByName("ball_bg3_png");
        this.selectBg2.x = this.ball1.x - 140;
        this.selectBg2.y = this.ball1.y - 145;
        this.selectBg2.scaleX = this.selectBg2.scaleY = 0.58;
        this.addChild(this.selectBg2);
        this.selectBg1.visible = false;
        this.selectBg2.visible = false;
        this.txt1 = AssetsUtils.createBitmapByName("p3_c1_png");
        StageUtils.centerInParent(this.txt1, -124, -310);
        this.addChild(this.txt1);
        this.txt2 = AssetsUtils.createBitmapByName("p3_c2_png");
        StageUtils.centerInParent(this.txt2, 124, -310);
        this.addChild(this.txt2);
        this.txt3 = AssetsUtils.createBitmapByName("p3_c3_png");
        StageUtils.centerInParent(this.txt3, 200, 210);
        this.addChild(this.txt3);
        this.txt4 = AssetsUtils.createBitmapByName("p3_c4_png");
        StageUtils.centerInParent(this.txt4, 0, 360);
        this.addChild(this.txt4);
        this.txt5 = AssetsUtils.createBitmapByName("p3_c5_png");
        StageUtils.centerInParent(this.txt5, -200, 210);
        this.addChild(this.txt5);
        this.showFlash();
        this.ball1.touchEnabled = true;
        this.ball2.touchEnabled = true;
        this.ball3.touchEnabled = true;
        this.ball4.touchEnabled = true;
        this.ball5.touchEnabled = true;
        this.ball1.addEventListener(egret.TouchEvent.TOUCH_END, this.ballClick, this);
        this.ball2.addEventListener(egret.TouchEvent.TOUCH_END, this.ballClick, this);
        this.ball3.addEventListener(egret.TouchEvent.TOUCH_END, this.ballClick, this);
        this.ball4.addEventListener(egret.TouchEvent.TOUCH_END, this.ballClick, this);
        this.ball5.addEventListener(egret.TouchEvent.TOUCH_END, this.ballClick, this);
    };
    MainView.prototype.ballClick = function (evt) {
        var index = 0;
        if (this.ball1 == evt.currentTarget) {
            index = 1;
        }
        else if (this.ball2 == evt.currentTarget) {
            index = 2;
        }
        else if (this.ball3 == evt.currentTarget) {
            index = 3;
        }
        else if (this.ball4 == evt.currentTarget) {
            index = 4;
        }
        else if (this.ball5 == evt.currentTarget) {
            index = 5;
        }
        this.selectBg1.x = this["ball" + index].x - 140;
        this.selectBg1.y = this["ball" + index].y - 145;
        this.selectBg2.x = this["ball" + index].x - 140;
        this.selectBg2.y = this["ball" + index].y - 145;
        this.selectBg1.visible = true;
        this.selectBg2.visible = true;
        GameDispatcher.instance.dispatchEventWith(EventName.Ball_Click, false, index);
        if (Main.loaded_music) {
            var sound = RES.getRes("loading_click_mp3");
            sound.play(0.5, 1);
        }
    };
    MainView.prototype.showFlash = function () {
        // var sound:egret.Sound = RES.getRes("main_show_mp3");
        // sound.play(1.1,1);
        this.ball1.anchorOffsetX = 110;
        this.ball1.anchorOffsetY = 110;
        this.ball1.alpha = 0;
        this.ball1.scaleX = this.ball1.scaleY = 0.8;
        egret.Tween.get(this.ball1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
        this.ball2.anchorOffsetX = 110;
        this.ball2.anchorOffsetY = 110;
        this.ball2.alpha = 0;
        this.ball2.scaleX = this.ball2.scaleY = 0.8;
        egret.Tween.get(this.ball2).wait(200).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
        this.ball3.anchorOffsetX = 110;
        this.ball3.anchorOffsetY = 110;
        this.ball3.alpha = 0;
        this.ball3.scaleX = this.ball3.scaleY = 0.8;
        egret.Tween.get(this.ball3).wait(400).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
        this.ball4.anchorOffsetX = 110;
        this.ball4.anchorOffsetY = 110;
        this.ball4.alpha = 0;
        this.ball4.scaleX = this.ball4.scaleY = 0.8;
        egret.Tween.get(this.ball4).wait(600).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
        this.ball5.anchorOffsetX = 110;
        this.ball5.anchorOffsetY = 110;
        this.ball5.alpha = 0;
        this.ball5.scaleX = this.ball5.scaleY = 0.8;
        egret.Tween.get(this.ball5).wait(800).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300);
    };
    return MainView;
}(egret.DisplayObjectContainer));
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map