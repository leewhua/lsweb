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
var GunMiniBar = (function (_super) {
    __extends(GunMiniBar, _super);
    function GunMiniBar(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        var s = new egret.Shape();
        s.graphics.beginFill(0x0, 0);
        s.graphics.drawRect(-60, -60, 120, 120);
        var g = Global.createBitmapByName('g' + type + '_png');
        g.scaleX = g.scaleY = 0.2;
        g.x = g.width / -2 * 0.2;
        g.y = g.height / -2 * 0.2;
        _this.addChild(s);
        _this.addChild(g);
        Global.setBut(_this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'select_gun', true, false, this.type));
        }, _this);
        return _this;
    }
    GunMiniBar.prototype.lock = function () {
        this.touchEnabled = false;
        this.alpha = 0.3;
    };
    return GunMiniBar;
}(egret.Sprite));
__reflect(GunMiniBar.prototype, "GunMiniBar");
//# sourceMappingURL=GunMiniBar.js.map