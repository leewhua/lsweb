var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReceivedPop = (function (_super) {
    __extends(ReceivedPop, _super);
    function ReceivedPop() {
        return _super.call(this) || this;
    }
    ReceivedPop.prototype.setData = function () {
        var bg = Global.createBitmapByName("pop_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        this.addChild(bg);
        var tips = Global.createBitmapByName("received_bg_png");
        tips.x = StageUtils.SW - tips.width >> 1;
        tips.y = (StageUtils.SH - tips.height >> 1) - 80;
        this.addChild(tips);
        var btnClose = Global.createBitmapByName("btn_into_shop_png");
        btnClose.x = StageUtils.SW - btnClose.width >> 1;
        btnClose.y = (StageUtils.SH - btnClose.height >> 1) + 220;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        var close1 = Global.createBitmapByName("close_png");
        close1.x = 540;
        close1.y = 160;
        this.addChild(close1);
        Global.setBut(close1);
        close1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler1, this);
    };
    ReceivedPop.prototype.closeHandler1 = function () {
        PopManager.hidePop("ReceivedPop");
    };
    ReceivedPop.prototype.closeHandler = function () {
        window.location.href = UserInfo.instance.smallsow_url;
    };
    return ReceivedPop;
}(PopView));
__reflect(ReceivedPop.prototype, "ReceivedPop");
//# sourceMappingURL=ReceivedPop.js.map