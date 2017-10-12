var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmallShopPop1 = (function (_super) {
    __extends(SmallShopPop1, _super);
    function SmallShopPop1() {
        return _super.call(this) || this;
    }
    SmallShopPop1.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/shop_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var btn = Global.createBitmapByName("btn_into_shop_png");
        btn.x = StageUtils.SW - btn.width >> 1;
        btn.y = StageUtils.SH - 300;
        this.addChild(btn);
        Global.setBut(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        var close1 = Global.createBitmapByName("close_png");
        close1.x = 540;
        close1.y = 160;
        this.addChild(close1);
        Global.setBut(close1);
        close1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler1, this);
    };
    SmallShopPop1.prototype.closeHandler1 = function () {
        PopManager.hidePop("SmallShopPop1");
    };
    SmallShopPop1.prototype.touchHandler = function () {
        window.location.href = UserInfo.instance.smallsow_url;
    };
    return SmallShopPop1;
}(PopView));
__reflect(SmallShopPop1.prototype, "SmallShopPop1");
//# sourceMappingURL=SmallShopPop1.js.map