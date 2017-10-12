var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderOKPop = (function (_super) {
    __extends(OrderOKPop, _super);
    function OrderOKPop() {
        return _super.call(this) || this;
    }
    OrderOKPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/order_bg.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnDuihuan = Global.createBitmapByName("btn_buy_gift_png");
        btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        btnDuihuan.y = StageUtils.SH - 165;
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
        var txtOrderID = new egret.TextField();
        txtOrderID.x = 0;
        txtOrderID.y = 200;
        txtOrderID.width = StageUtils.SW;
        txtOrderID.size = 36;
        txtOrderID.textAlign = egret.HorizontalAlign.CENTER;
        txtOrderID.text = data + "";
        txtOrderID.textColor = 0x0;
        this.addChild(txtOrderID);
    };
    OrderOKPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("OrderOKPop");
        PopManager.showPop("InfoPop", 3);
    };
    return OrderOKPop;
}(PopView));
__reflect(OrderOKPop.prototype, "OrderOKPop");
//# sourceMappingURL=OrderOKPop.js.map