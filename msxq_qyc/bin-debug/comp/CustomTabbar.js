var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomTabbar = (function (_super) {
    __extends(CustomTabbar, _super);
    function CustomTabbar(len, type, gap) {
        var _this = _super.call(this) || this;
        for (var i = 0; i < len; i++) {
            var item = Global.createBitmapByName("tabbar_" + (i + 1) + "_2_png");
            item.x = 155 + 140;
            item.y = 115;
            _this.addChild(item);
        }
        return _this;
    }
    return CustomTabbar;
}(egret.DisplayObjectContainer));
__reflect(CustomTabbar.prototype, "CustomTabbar");
//# sourceMappingURL=CustomTabbar.js.map