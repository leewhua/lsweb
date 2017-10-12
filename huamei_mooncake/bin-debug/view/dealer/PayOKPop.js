var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PayOKPop = (function (_super) {
    __extends(PayOKPop, _super);
    function PayOKPop() {
        return _super.call(this) || this;
    }
    PayOKPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/pay_complete_bg.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btn = Global.createBitmapByName("btn_complete_png");
        btn.x = StageUtils.SW - btn.width >> 1;
        btn.y = 300;
        this.addChild(btn);
        Global.setBut(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHandler, this);
        var txtPrice = new egret.TextField();
        txtPrice.width = 400;
        txtPrice.textAlign = egret.HorizontalAlign.CENTER;
        txtPrice.x = StageUtils.SW - 400 >> 1;
        txtPrice.y = 175;
        txtPrice.textColor = 0xffffff;
        txtPrice.size = 40;
        this.addChild(txtPrice);
        txtPrice.text = "￥" + data.price;
        this.htmlCode = new QRCode("resource/assets/asyn/pay_send_ok_code.png");
        this.htmlCode.setPosition(70, 433, 171, 175);
        this.htmlCode.showHtmlCode();
    };
    PayOKPop.prototype.btnHandler = function () {
        if (this.data) {
            this.htmlCode.destroy();
            PopManager.hidePop("PayOKPop");
            PopManager.showPop("SelectListPop", this.data.list);
        }
    };
    return PayOKPop;
}(PopView));
__reflect(PayOKPop.prototype, "PayOKPop");
//# sourceMappingURL=PayOKPop.js.map