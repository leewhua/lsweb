var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopPop = (function (_super) {
    __extends(ShopPop, _super);
    function ShopPop() {
        return _super.call(this) || this;
    }
    ShopPop.prototype.show = function () {
        var bg = new egret.Shape();
        // bg.graphics.beginFill(0x0,0.8);
        // bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        // bg.graphics.endFill();
        // // this.view.scaleY = Main.scale;
        // // this.view.x=600;
        // // this.view.y=320;
        // this.addChildAt(bg,0);
        // bg.alpha=0;
        // Global.fadeIn(bg);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    ShopPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.removeChildren();
        var bg = Global.createBitmapByName("shop_bg_png");
        bg.width = StageUtils.SW;
        this.addChild(bg);
        var icon = Global.createBitmapByName("shop_icon_png");
        icon.x = 60;
        icon.y = 85;
        this.addChild(icon);
        var txtTitle = new egret.TextField();
        txtTitle.x = 60;
        txtTitle.y = 40;
        txtTitle.bold = true;
        this.addChild(txtTitle);
        txtTitle.text = decodeURI(data.name) + "";
        var txtAddress = new egret.TextField();
        txtAddress.x = 90;
        txtAddress.y = 84;
        this.addChild(txtAddress);
        txtAddress.size = 24;
        txtAddress.text = decodeURI(data.address) + "";
        this.y = StageUtils.SH;
        egret.Tween.get(this).to({ y: StageUtils.SH - bg.height }, 300);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    ShopPop.prototype.touchHandler = function () {
        PopManager.hidePop("ShopPop");
    };
    return ShopPop;
}(PopView));
__reflect(ShopPop.prototype, "ShopPop");
//# sourceMappingURL=ShopPop.js.map