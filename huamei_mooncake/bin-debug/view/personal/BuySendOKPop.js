var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BuySendOKPop = (function (_super) {
    __extends(BuySendOKPop, _super);
    function BuySendOKPop() {
        return _super.call(this) || this;
    }
    BuySendOKPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/pay_send_ok_bg.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnClose = Global.createBitmapByName("btn_share_3_png");
        btnClose.x = StageUtils.SW - btnClose.width >> 1;
        btnClose.y = 300;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    BuySendOKPop.prototype.closeHandler = function () {
        PopManager.hidePop("BuySendOKPop");
        PopManager.showPop("InfoPop", 2);
    };
    return BuySendOKPop;
}(PopView));
__reflect(BuySendOKPop.prototype, "BuySendOKPop");
//# sourceMappingURL=BuySendOKPop.js.map