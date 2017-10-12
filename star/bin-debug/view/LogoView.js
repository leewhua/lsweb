var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LogoView = (function (_super) {
    __extends(LogoView, _super);
    function LogoView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    LogoView.prototype.initView = function () {
        this.img1 = AssetsUtils.createBitmapByName("p2_yuan_png");
        StageUtils.centerInParent(this.img1);
        this.addChild(this.img1);
        this.maskBg = new egret.Shape();
        this.maskBg.graphics.beginFill(0x000000);
        this.maskBg.graphics.drawCircle(230, 230, 1);
        this.maskBg.graphics.endFill();
        this.maskBg.x = (StageUtils.stage.stageWidth - 460 >> 1);
        this.maskBg.y = (StageUtils.stage.stageHeight - 460 >> 1);
        this.addChild(this.maskBg);
        this.img1.mask = this.maskBg;
        this.img2 = AssetsUtils.createBitmapByName("logo_png");
        StageUtils.centerInParent(this.img2);
        this.img2.y -= 50;
        this.addChild(this.img2);
        this.img3 = AssetsUtils.createBitmapByName("ls_logo_png");
        StageUtils.centerInParent(this.img3);
        this.img3.y -= 140;
        this.addChild(this.img3);
        this.img4 = AssetsUtils.createBitmapByName("p2_en_png");
        StageUtils.centerInParent(this.img4);
        this.img4.y += 80;
        this.addChild(this.img4);
        this.showFlash();
    };
    LogoView.prototype.showFlash = function () {
        this.img1.alpha = 0;
        egret.Tween.get(this.img1).to({ alpha: 1 }, 500);
        this.img2.alpha = 0;
        egret.Tween.get(this.img2).wait(350).to({ alpha: 1 }, 500);
        this.img3.alpha = 0;
        egret.Tween.get(this.img3).wait(550).to({ alpha: 1 }, 500);
        this.img4.alpha = 0;
        egret.Tween.get(this.img4).wait(750).to({ alpha: 1 }, 500);
        egret.Tween.get(this).wait(2000).to({ alpha: 0 }, 800).call(this.onComplete, this);
        this.angle = 360;
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    LogoView.prototype.enterFrameHandler = function () {
        this.angle -= 8;
        var tx = 230 * Math.cos(this.angle * Math.PI);
        var ty = 230 * Math.sin(this.angle * Math.PI);
        this.maskBg.graphics.clear();
        this.maskBg.graphics.beginFill(0xff0000);
        this.maskBg.graphics.moveTo(230, 230); //绘制点移动(r, r)点
        this.maskBg.graphics.lineTo(460, 230); //画线到弧的起始点
        this.maskBg.graphics.drawArc(230, 230, 230, 0, this.angle * Math.PI / 180, true); //从起始点顺时针画弧到终点
        this.maskBg.graphics.lineTo(230, 230); //从终点画线到圆形。到此扇形的封闭区域形成
        this.maskBg.graphics.lineTo(0, 230); //从终点画线到圆形。到此扇形的封闭区域形成
        this.maskBg.graphics.drawArc(230, 230, 230, (this.angle - 180) * Math.PI / 180, Math.PI, false); //从起始点顺时针画弧到终点
        this.maskBg.graphics.lineTo(230, 230); //从终点画线到圆形。到此扇形的封闭区域形成
        this.maskBg.graphics.endFill();
        if (this.angle < 180) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
        console.log(this.angle);
    };
    LogoView.prototype.onComplete = function () {
        console.log("onComplete");
        GameDispatcher.instance.dispatchEventWith(EventName.Logo_End);
    };
    return LogoView;
}(egret.DisplayObjectContainer));
__reflect(LogoView.prototype, "LogoView");
//# sourceMappingURL=LogoView.js.map