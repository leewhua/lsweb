var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var Middle = (function (_super) {
    __extends(Middle, _super);
    function Middle(view, x, y, ox, oy) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var _this = _super.call(this) || this;
        view.x = view.width / -2 + ox;
        view.y = view.height / -2 + oy;
        _this.x = x;
        _this.y = y;
        _this.view = view;
        _this.addChild(view);
        return _this;
    }
    return Middle;
}(egret.Sprite));
__reflect(Middle.prototype, "Middle");
//# sourceMappingURL=Middle.js.map