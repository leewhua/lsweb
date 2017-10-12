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
var HbPop = (function (_super) {
    __extends(HbPop, _super);
    function HbPop() {
        return _super.call(this) || this;
    }
    HbPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        var bg = Global.createBitmapByName('pop_bg_png', -254, -165);
        var title = Global.createBitmapByName('win_copy_png', -222, -144);
        var toCity = Global.createBitmapByName('to_city_png', -221, 38);
        var toShare = Global.createBitmapByName('to_share_png', -110, 38);
        Global.setBut(toCity);
        Global.setBut(toShare);
        this.view.addChild(bg);
        this.view.addChild(title);
        // this.view.addChild(toCity);
        this.view.addChild(toShare);
        toCity.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'to_city', true));
        }, this);
        toShare.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'to_share', true));
        }, this);
    };
    return HbPop;
}(PopView));
__reflect(HbPop.prototype, "HbPop");
//# sourceMappingURL=HbPop.js.map