var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareIntoPop = (function (_super) {
    __extends(ShareIntoPop, _super);
    function ShareIntoPop() {
        return _super.call(this) || this;
    }
    ShareIntoPop.prototype.show = function () {
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    ShareIntoPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/share_bg.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var img = new CustomImage(data.url, true, function () {
            img.width = 130;
            img.height = 130;
        });
        img.x = StageUtils.CW - 65;
        img.y = 250;
        this.addChild(img);
        var headBg = Global.createBitmapByName("head_bg_png");
        headBg.x = 0;
        headBg.y = 20;
        this.addChild(headBg);
        var maskBg = new egret.Shape();
        maskBg.graphics.beginFill(0x0);
        maskBg.graphics.drawCircle(img.x + 65, img.y + 65, 65);
        maskBg.graphics.drawCircle;
        maskBg.graphics.endFill();
        this.addChild(maskBg);
        img.mask = maskBg;
        var txtName = new egret.TextField();
        txtName.text = decodeURI(data.username) + "";
        txtName.width = StageUtils.SW;
        txtName.textAlign = "center";
        txtName.x = 0;
        txtName.y = 400;
        txtName.textColor = 0xfff000;
        this.addChild(txtName);
        var url = "";
        if (data.isget == 1) {
            url = "resource/assets/asyn/share_phone.png";
        }
        else {
            url = "resource/assets/asyn/share_other.png";
        }
        var tip = new CustomImage(url, true, function () {
            tip.x = StageUtils.SW - tip.width >> 1;
            tip.y = StageUtils.SH - 550;
        });
        this.addChild(tip);
        var btn = new CustomImage("resource/assets/main/btn_buy.png", true, function () {
            btn.x = StageUtils.SW - btn.width >> 1;
            btn.y = StageUtils.SH - 300;
        });
        this.addChild(btn);
        Global.setBut(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    ShareIntoPop.prototype.touchHandler = function () {
        window.location.href = UserInfo.instance.smallsow_url;
    };
    return ShareIntoPop;
}(PopView));
__reflect(ShareIntoPop.prototype, "ShareIntoPop");
//# sourceMappingURL=ShareIntoPop.js.map