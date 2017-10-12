var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DetailSimpleItem = (function (_super) {
    __extends(DetailSimpleItem, _super);
    function DetailSimpleItem() {
        var _this = _super.call(this) || this;
        _this.txtName = new egret.TextField();
        _this.txtName.x = 0;
        _this.txtName.y = 0;
        _this.txtName.textColor = 0x072a47;
        _this.addChild(_this.txtName);
        _this.txtCount = new egret.TextField();
        _this.txtCount.x = 180;
        _this.txtCount.y = 3;
        _this.txtCount.textColor = 0x072a47;
        _this.txtCount.width = 100;
        _this.txtCount.textAlign = "center";
        _this.txtCount.size = 24;
        _this.addChild(_this.txtCount);
        _this.txtPrice = new egret.TextField();
        _this.txtPrice.x = 310;
        _this.txtPrice.y = 3;
        _this.txtPrice.textColor = 0xff4900;
        _this.txtPrice.width = 120;
        _this.txtPrice.textAlign = "right";
        _this.txtPrice.size = 24;
        _this.addChild(_this.txtPrice);
        return _this;
    }
    DetailSimpleItem.prototype.setData = function (data) {
        this.txtName.text = decodeURI(data.name) + "";
        this.txtCount.text = data.cnt + "";
        this.txtPrice.text = data.price + "";
    };
    return DetailSimpleItem;
}(egret.DisplayObjectContainer));
__reflect(DetailSimpleItem.prototype, "DetailSimpleItem");
//# sourceMappingURL=DetailSimpleItem.js.map