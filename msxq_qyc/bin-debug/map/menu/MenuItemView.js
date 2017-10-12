var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuItemView = (function (_super) {
    __extends(MenuItemView, _super);
    function MenuItemView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchClickHandler, _this);
        return _this;
    }
    MenuItemView.prototype.touchClickHandler = function (e) {
        if (this.data) {
            alert("menu_item_id:" + this.data.id);
        }
    };
    MenuItemView.prototype.setData = function (data) {
        this.data = data;
        if (data) {
            this.icon = Global.createBitmapByName("btn_func" + data.icon + "_png");
            this.icon.x = -this.icon.width >> 1;
            this.icon.y = -this.icon.height >> 1;
            this.addChild(this.icon);
            this.x = data.x;
            this.y = data.y;
        }
    };
    return MenuItemView;
}(egret.DisplayObjectContainer));
__reflect(MenuItemView.prototype, "MenuItemView");
//# sourceMappingURL=MenuItemView.js.map