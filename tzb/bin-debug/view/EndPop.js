var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EndPop = (function (_super) {
    __extends(EndPop, _super);
    function EndPop() {
        return _super.call(this) || this;
    }
    EndPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        var str;
        var str1;
        if (data == 66600) {
            str = "resource/assets/asyn/game" + Main.type + "_result_bg1.png";
            str1 = "btn_get_png";
        }
        else {
            str = "resource/assets/asyn/game" + Main.type + "_result_bg.png";
            str1 = "btn_share_png";
        }
        var bg = new CustomImage(str, true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.container.addChild(bg);
        var share = Global.createBitmapByName(str1);
        share.x = StageUtils.SW - share.width >> 1;
        share.y = 870;
        this.container.addChild(share);
        Global.setBut(share);
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
        var money = Global.createBitmapByName("money_" + data + "_png");
        money.x = 212;
        money.y = 538;
        this.container.addChild(money);
        if (Main.type == 2) {
            money.y = 535;
        }
        else if (Main.type == 3) {
            money.y = 558;
        }
    };
    EndPop.prototype.shareHandler = function () {
        if (this.data == 66600) {
            PopManager.hidePop("EndPop");
            PopManager.showPop("InfoPop");
        }
        else {
            this.container.removeChildren();
            var bg = new CustomImage("resource/assets/asyn/get_ok.png", true, function () {
                bg.x = StageUtils.SW - bg.width >> 1;
                bg.y = StageUtils.SH - bg.height >> 1;
            });
            this.container.addChild(bg);
            var share = Global.createBitmapByName("btn_share_friend_png");
            share.x = StageUtils.SW - share.width >> 1;
            share.y = 870;
            this.container.addChild(share);
            Global.setBut(share);
            share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler1, this);
        }
    };
    EndPop.prototype.shareHandler1 = function () {
        PopManager.hidePop("EndPop");
        PopManager.showPop("SharePop");
    };
    return EndPop;
}(PopView));
__reflect(EndPop.prototype, "EndPop");
//# sourceMappingURL=EndPop.js.map