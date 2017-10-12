var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HasGetPop = (function (_super) {
    __extends(HasGetPop, _super);
    function HasGetPop() {
        return _super.call(this) || this;
    }
    HasGetPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/error/error_yilingqu.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnDuihuan = Global.createBitmapByName("btn_select_info_png");
        btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        btnDuihuan.y = 350;
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
    };
    HasGetPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("HasGetPop");
        PopManager.showPop("InfoPop");
    };
    return HasGetPop;
}(PopView));
__reflect(HasGetPop.prototype, "HasGetPop");
//# sourceMappingURL=HasGetPop.js.map