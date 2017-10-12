var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PayDetailItem = (function (_super) {
    __extends(PayDetailItem, _super);
    function PayDetailItem() {
        return _super.call(this) || this;
    }
    PayDetailItem.prototype.setData = function (data) {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.001);
        bg.graphics.drawRect(0, 0, 510, 100);
        bg.graphics.endFill();
        this.addChild(bg);
        var txtName = new egret.TextField();
        txtName.x = 0;
        txtName.y = 0;
        txtName.textColor = 0x0;
        this.addChild(txtName);
        var txtCode = new egret.TextField();
        txtCode.x = 200;
        txtCode.y = 0;
        txtCode.textColor = 0x0;
        this.addChild(txtCode);
        var txtPrice = new egret.TextField();
        txtPrice.x = 330;
        txtPrice.y = 0;
        txtPrice.textColor = 0x0;
        txtPrice.width = 120;
        txtPrice.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(txtPrice);
        txtName.text = data.name + "";
        txtCode.text = data.batchcode1 + "";
        txtPrice.text = Math.floor(data.disprice * 100) / 100 + "";
    };
    return PayDetailItem;
}(egret.DisplayObjectContainer));
__reflect(PayDetailItem.prototype, "PayDetailItem");
//# sourceMappingURL=PayDetailItem.js.map