var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TipsPop = (function (_super) {
    __extends(TipsPop, _super);
    function TipsPop() {
        return _super.call(this) || this;
    }
    TipsPop.prototype.show = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.7);
        bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        bg.graphics.endFill();
        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        this.addChildAt(bg, 0);
        bg.alpha = 0;
        Global.fadeIn(bg);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    TipsPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = Global.createBitmapByName(data.url);
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        this.addChild(bg);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    TipsPop.prototype.touchHandler = function () {
        PopManager.hidePop("TipsPop");
        if (this.data.callback) {
            this.data.callback();
        }
    };
    return TipsPop;
}(PopView));
__reflect(TipsPop.prototype, "TipsPop");
//# sourceMappingURL=TipsPop.js.map