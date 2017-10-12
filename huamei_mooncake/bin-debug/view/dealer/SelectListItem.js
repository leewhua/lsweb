var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectListItem = (function (_super) {
    __extends(SelectListItem, _super);
    function SelectListItem() {
        var _this = _super.call(this) || this;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xf9f9f9);
        bg.graphics.drawRect(0, 0, StageUtils.SW, 97);
        bg.graphics.lineStyle(1, 0x0);
        bg.graphics.moveTo(0, 97);
        bg.graphics.lineTo(StageUtils.SW, 97);
        bg.graphics.endFill();
        _this.addChild(bg);
        _this.txtName = new egret.TextField();
        _this.txtName.textColor = 0x072a47;
        _this.txtName.fontFamily = "微软雅黑";
        _this.txtName.text = "金秋福运";
        _this.txtName.x = 15;
        _this.txtName.y = 32;
        _this.txtName.size = 27;
        _this.addChild(_this.txtName);
        _this.txtCode = new egret.TextField();
        _this.txtCode.textColor = 0x545b66;
        _this.txtCode.fontFamily = "微软雅黑";
        _this.txtCode.text = "8K98";
        _this.txtCode.x = 225;
        _this.txtCode.y = 35;
        _this.txtCode.size = 24;
        _this.addChild(_this.txtCode);
        _this.txtPrice = new egret.TextField();
        _this.txtPrice.textColor = 0xff4900;
        _this.txtPrice.fontFamily = "微软雅黑";
        _this.txtPrice.text = "998";
        _this.txtPrice.x = 300;
        _this.txtPrice.y = 35;
        _this.txtPrice.size = 24;
        _this.txtPrice.width = 110;
        _this.txtPrice.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.txtPrice);
        _this.txtRate = new egret.TextField();
        _this.txtRate.textColor = 0x072a47;
        _this.txtRate.fontFamily = "微软雅黑";
        _this.txtRate.text = "7折";
        _this.txtRate.x = 425;
        _this.txtRate.y = 35;
        _this.txtRate.size = 24;
        _this.addChild(_this.txtRate);
        _this.txtStatus = new egret.TextField();
        _this.txtStatus.textColor = 0x13629E;
        _this.txtStatus.fontFamily = "微软雅黑";
        _this.txtStatus.text = "已付款";
        _this.txtStatus.x = StageUtils.SW - 135;
        _this.txtStatus.y = 35;
        _this.txtStatus.width = 120;
        _this.txtStatus.size = 24;
        _this.txtStatus.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.txtStatus);
        return _this;
    }
    SelectListItem.prototype.setData = function (data) {
        //name,price,batchcode1,status,discount,rest
        this.txtName.text = data.name + "";
        this.txtPrice.text = "￥" + data.price + "";
        this.txtCode.text = data.batchcode1 + "";
        this.txtRate.text = data.discount + "折";
        // if(data.status == "1")
        // {
        this.txtStatus.textColor = 0x13629E;
        this.txtStatus.text = "已付款";
        // }else if(data.status == "0")
        // {
        // 	this.txtStatus.textColor = 0xFE3E55;
        // 	this.txtStatus.text = "未付款";
        // }else
        // {
        // 	this.txtStatus.textColor = 0xFE3E55;
        // 	this.txtStatus.text = "付款失败";
        // }
    };
    return SelectListItem;
}(egret.DisplayObjectContainer));
__reflect(SelectListItem.prototype, "SelectListItem");
//# sourceMappingURL=SelectListItem.js.map