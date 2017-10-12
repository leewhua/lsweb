var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SharePop = (function (_super) {
    __extends(SharePop, _super);
    function SharePop() {
        return _super.call(this) || this;
    }
    SharePop.prototype.show = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.8);
        bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        bg.graphics.endFill();
        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        this.addChildAt(bg, 0);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
        var share = new CustomImage("resource/assets/asyn/share_bg.png", true, function () {
            share.x = StageUtils.SW - share.width - 35;
            share.y = 35;
        });
        this.addChild(share);
    };
    return SharePop;
}(PopView));
__reflect(SharePop.prototype, "SharePop");
//# sourceMappingURL=SharePop.js.map