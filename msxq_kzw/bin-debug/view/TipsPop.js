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
        var _this = _super.call(this) || this;
        _this.state = 0;
        return _this;
    }
    TipsPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        this.removeChildren();
        var bg = new CustomImage("resource/assets/asyn/tips_" + data + ".png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var btnInto = Global.createBitmapByName("btn_ok_png");
        btnInto.x = StageUtils.SW - btnInto.width >> 1;
        btnInto.y = 770;
        this.addChild(btnInto);
        btnInto.touchEnabled = true;
        Global.setBut(btnInto);
        btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okClickHandler, this);
        var btnClose = Global.createBitmapByName("close_png");
        btnClose.x = StageUtils.SW - btnClose.width - 65;
        btnClose.y = 198;
        this.addChild(btnClose);
        btnClose.touchEnabled = true;
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
    };
    TipsPop.prototype.okClickHandler = function () {
        PopManager.hidePop("TipsPop");
    };
    TipsPop.prototype.closeClickHandler = function () {
        PopManager.hidePop("TipsPop");
    };
    return TipsPop;
}(PopView));
__reflect(TipsPop.prototype, "TipsPop");
//# sourceMappingURL=TipsPop.js.map