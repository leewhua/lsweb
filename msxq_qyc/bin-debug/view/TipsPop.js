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
    TipsPop.prototype.setData = function () {
        var bg = Global.createBitmapByName("tips_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        this.addChild(bg);
        var btnClose = Global.createBitmapByName("close_png");
        btnClose.x = StageUtils.SW - 80;
        btnClose.y = (StageUtils.SH - btnClose.height >> 1) - 205;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    TipsPop.prototype.closeHandler = function () {
        PopManager.hidePop("TipsPop");
    };
    return TipsPop;
}(PopView));
__reflect(TipsPop.prototype, "TipsPop");
//# sourceMappingURL=TipsPop.js.map