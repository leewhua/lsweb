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
var FlyBar = (function (_super) {
    __extends(FlyBar, _super);
    function FlyBar() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        var g = Global.createBitmapByName('p_thunder_png');
        g.x = g.width / -2;
        g.y = g.height / -2;
        _this.addChild(g);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBeginHander, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEndHander, _this);
        _this.x = 1092;
        _this.y = 518;
        return _this;
    }
    FlyBar.prototype.touchBeginHander = function (e) {
        this.alpha = 0.6;
    };
    FlyBar.prototype.touchEndHander = function (e) {
        this.alpha = 1;
    };
    return FlyBar;
}(egret.Sprite));
__reflect(FlyBar.prototype, "FlyBar");
//# sourceMappingURL=FlyBar.js.map