var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SuccessPop = (function (_super) {
    __extends(SuccessPop, _super);
    function SuccessPop() {
        return _super.call(this) || this;
    }
    SuccessPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/success_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = (StageUtils.SH - bg.height >> 1) - 100;
        });
        this.addChild(bg);
        var share = Global.createBitmapByName("btn_share_friend_png");
        share.x = StageUtils.SW - share.width >> 1;
        share.y = 650;
        this.addChild(share);
        Global.setBut(share);
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
    };
    SuccessPop.prototype.shareHandler = function () {
        PopManager.hidePop("SuccessPop");
        PopManager.showPop("SharePop");
    };
    return SuccessPop;
}(PopView));
__reflect(SuccessPop.prototype, "SuccessPop");
//# sourceMappingURL=SuccessPop.js.map