var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OkPop = (function (_super) {
    __extends(OkPop, _super);
    function OkPop() {
        return _super.call(this) || this;
    }
    OkPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/ok_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = (StageUtils.SH - bg.height >> 1) - 100;
        });
        this.addChild(bg);
        var share = Global.createBitmapByName("btn_get_png");
        share.x = StageUtils.SW - share.width >> 1;
        share.y = 650;
        this.addChild(share);
        Global.setBut(share);
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
        var phone = Global.createBitmapByName("btn_400_png");
        phone.x = StageUtils.SW - phone.width >> 1;
        phone.y = 760;
        this.addChild(phone);
        Global.setBut(phone);
        phone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.phoneHandler, this);
    };
    OkPop.prototype.shareHandler = function () {
        PopManager.hidePop("OkPop");
        PopManager.showPop("InputPop");
    };
    OkPop.prototype.phoneHandler = function () {
        window.location.href = "tel:4000828079";
    };
    return OkPop;
}(PopView));
__reflect(OkPop.prototype, "OkPop");
//# sourceMappingURL=OkPop.js.map