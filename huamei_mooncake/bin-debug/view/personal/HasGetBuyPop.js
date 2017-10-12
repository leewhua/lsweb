var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HasGetBuyPop = (function (_super) {
    __extends(HasGetBuyPop, _super);
    function HasGetBuyPop() {
        return _super.call(this) || this;
    }
    HasGetBuyPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/has_get_buy_bg.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnDuihuan = Global.createBitmapByName("btn_buy_gift_png");
        btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        btnDuihuan.y = 450;
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
    };
    HasGetBuyPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("HasGetBuyPop");
        PopManager.showPop("InfoPop", 3);
    };
    return HasGetBuyPop;
}(PopView));
__reflect(HasGetBuyPop.prototype, "HasGetBuyPop");
//# sourceMappingURL=HasGetBuyPop.js.map