var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmallShopPop = (function (_super) {
    __extends(SmallShopPop, _super);
    function SmallShopPop() {
        var _this = _super.call(this) || this;
        _this.state = 0;
        return _this;
    }
    SmallShopPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        this.removeChildren();
        var bg = Global.createBitmapByName("pop_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        this.addChild(bg);
        var share = new CustomImage("resource/assets/asyn/smallsow_bg.png", true, function () {
            share.x = (StageUtils.SW - share.width >> 1) + 10;
            share.y = (StageUtils.SH - share.height >> 1) - 100;
        });
        this.addChild(share);
        var btnReturn = Global.createBitmapByName("btn_return_png");
        btnReturn.x = StageUtils.SW - btnReturn.width >> 1;
        btnReturn.y = 600;
        this.addChild(btnReturn);
        btnReturn.touchEnabled = true;
        Global.setBut(btnReturn);
        btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnClickHandler, this);
        var btnInto = Global.createBitmapByName("btn_into_shop_png");
        btnInto.x = StageUtils.SW - btnInto.width >> 1;
        btnInto.y = 718;
        this.addChild(btnInto);
        btnInto.touchEnabled = true;
        Global.setBut(btnInto);
        btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okClickHandler, this);
    };
    SmallShopPop.prototype.okClickHandler = function () {
        window.location.href = UserInfo.instance.smallsow_url;
    };
    SmallShopPop.prototype.returnClickHandler = function () {
        PopManager.hidePop("SmallShopPop");
    };
    return SmallShopPop;
}(PopView));
__reflect(SmallShopPop.prototype, "SmallShopPop");
//# sourceMappingURL=SmallShopPop.js.map