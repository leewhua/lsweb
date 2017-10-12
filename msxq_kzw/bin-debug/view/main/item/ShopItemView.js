var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopItemView = (function (_super) {
    __extends(ShopItemView, _super);
    function ShopItemView(obj) {
        var _this = _super.call(this) || this;
        _this.obj = obj;
        //.shopid,obj.ticket,obj.type
        // this.id = obj.shopid;
        //	this.id = obj.id;
        _this.status = obj.ticket;
        _this.type = obj.type;
        if (_this.type == "weidian") {
            _this.id = 3;
        }
        else if (_this.type == "hongbao") {
            _this.id = 2;
        }
        _this.init();
        console.log("id:" + _this.id);
        return _this;
    }
    ShopItemView.prototype.init = function () {
        this.icon = Global.createBitmapByName("icon" + this.id + "_png");
        this.icon.x = -this.icon.width >> 1;
        this.icon.y = -this.icon.height;
        if (!this.status) {
            this.icon.filters = Global.grayFlilter;
        }
        this.addChild(this.icon);
    };
    return ShopItemView;
}(egret.DisplayObjectContainer));
__reflect(ShopItemView.prototype, "ShopItemView");
//# sourceMappingURL=ShopItemView.js.map