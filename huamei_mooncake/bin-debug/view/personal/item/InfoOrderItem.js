var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoOrderItem = (function (_super) {
    __extends(InfoOrderItem, _super);
    function InfoOrderItem(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        var bg = new CustomImage("resource/assets/asyn/info_order_item_bg.png", true, function () {
        });
        _this.addChild(bg);
        var btnGet = Global.createBitmapByName("btn_wuliu_png");
        btnGet.x = 450;
        btnGet.y = 215;
        _this.addChild(btnGet);
        Global.setBut(btnGet);
        btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getHandler, _this);
        //btn_wuliu_png
        var txtAddress = new egret.TextField();
        txtAddress.x = 140;
        txtAddress.y = 40;
        txtAddress.textAlign = egret.HorizontalAlign.CENTER;
        // txtAddress.width = 54;
        txtAddress.textColor = 0x0;
        txtAddress.size = 18;
        _this.addChild(txtAddress);
        var txtName = new egret.TextField();
        txtName.x = 140;
        txtName.y = 70;
        txtName.textAlign = egret.HorizontalAlign.CENTER;
        // txtName.width = 54;
        txtName.textColor = 0x0;
        txtName.size = 18;
        _this.addChild(txtName);
        var txtPhone = new egret.TextField();
        txtPhone.x = 250;
        txtPhone.y = 70;
        txtPhone.textAlign = egret.HorizontalAlign.CENTER;
        // txtPhone.width = 54;
        txtPhone.textColor = 0x0;
        txtPhone.size = 18;
        _this.addChild(txtPhone);
        var txtOrderID = new egret.TextField();
        txtOrderID.x = 30;
        txtOrderID.y = 150;
        txtOrderID.textAlign = egret.HorizontalAlign.CENTER;
        // txtOrderID.width = 54;
        txtOrderID.textColor = 0x0;
        txtOrderID.size = 18;
        _this.addChild(txtOrderID);
        var txtTime = new egret.TextField();
        txtTime.x = 390;
        txtTime.y = 150;
        txtTime.textAlign = egret.HorizontalAlign.CENTER;
        // txtTime.width = 54;
        txtTime.textColor = 0x0;
        txtTime.size = 18;
        _this.addChild(txtTime);
        // txtAddress.text = "上海市徐汇区浦北路7号1803室";
        // txtName.text = "张三李四";
        // txtPhone.text = "13311965555";
        // txtOrderID.text = "订单号:18888888888888888";
        // txtTime.text = "2017-06-06 17:50:50";
        txtAddress.text = (data.province ? data.province + "省" : "") + data.city + "市" + data.county + " " + data.address;
        txtName.text = data.name + "";
        txtPhone.text = data.telephone + "";
        txtOrderID.text = "订单号:" + data.id;
        txtTime.text = data.time + "";
        var icon = new CustomImage("resource/assets/asyn/moontype/5/" + data.type + ".png", true, function () {
        });
        icon.x = 10;
        icon.y = 195;
        _this.addChild(icon);
        return _this;
    }
    InfoOrderItem.prototype.getHandler = function () {
        if (this.data) {
            PopManager.showPop("MailSelectPop", this.data.id);
        }
        // PopManager.hidePop("InfoPop");
        // PopManager.showPop("PersonalPop",1);
    };
    return InfoOrderItem;
}(egret.DisplayObjectContainer));
__reflect(InfoOrderItem.prototype, "InfoOrderItem");
//# sourceMappingURL=InfoOrderItem.js.map