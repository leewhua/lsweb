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
        var _this = _super.call(this) || this;
        _this.state = 0;
        return _this;
    }
    ShopPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        console.log(data);
        this.data = data;
        var n, t;
        if (data.type == "yanjishoukuai") {
            n = 5;
            t = 2;
        }
        else if (data.type == "weidian") {
            n = 3;
            t = 3;
        }
        this.removeChildren();
        var bg = new CustomImage("resource/assets/asyn/shop_" + n + ".png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var t;
        // if(data.shopid == 3)
        // {
        // 	t = 3;
        // }else
        // {
        // 	t = 2;
        // }
        var btnInto = Global.createBitmapByName("btn_into_" + t + "_png");
        btnInto.x = StageUtils.SW - btnInto.width >> 1;
        btnInto.y = 718;
        this.addChild(btnInto);
        btnInto.touchEnabled = true;
        Global.setBut(btnInto);
        btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okClickHandler, this);
        var btnClose = Global.createBitmapByName("close_png");
        btnClose.x = StageUtils.SW - btnClose.width - 60;
        btnClose.y = 210;
        this.addChild(btnClose);
        btnClose.touchEnabled = true;
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
    };
    ShopPop.prototype.okClickHandler = function () {
        MainView.instance.play(this.data);
    };
    ShopPop.prototype.closeClickHandler = function () {
        PopManager.hidePop("ShopPop");
    };
    return ShopPop;
}(PopView));
__reflect(ShopPop.prototype, "ShopPop");
//# sourceMappingURL=ShopPop.js.map