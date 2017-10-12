var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DetailItem = (function (_super) {
    __extends(DetailItem, _super);
    function DetailItem() {
        var _this = _super.call(this) || this;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff, 0.001);
        bg.graphics.drawRect(0, 0, StageUtils.SW, 385);
        bg.graphics.endFill();
        _this.addChild(bg);
        var line1 = Global.createBitmapByName("line_2_png");
        line1.x = 0;
        line1.y = 380;
        _this.addChild(line1);
        return _this;
    }
    DetailItem.prototype.setData = function (str, data) {
        this.imgSale = Global.createBitmapByName("select_sale_" + str + "_png");
        this.imgSale.x = 45;
        this.imgSale.y = 385 - this.imgSale.height >> 1;
        this.addChild(this.imgSale);
        var line1 = Global.createBitmapByName("line_3_png");
        line1.x = 180;
        line1.y = 95;
        this.addChild(line1);
        var line1 = Global.createBitmapByName("line_3_png");
        line1.x = 180;
        line1.y = 190;
        this.addChild(line1);
        var line1 = Global.createBitmapByName("line_3_png");
        line1.x = 180;
        line1.y = 285;
        this.addChild(line1);
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var item = new DetailSimpleItem();
            item.setData(data[i]);
            item.x = 180;
            item.y = 30 + i * 97;
            this.addChild(item);
        }
    };
    return DetailItem;
}(egret.DisplayObjectContainer));
__reflect(DetailItem.prototype, "DetailItem");
//# sourceMappingURL=DetailItem.js.map