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
var EndPop = (function (_super) {
    __extends(EndPop, _super);
    function EndPop() {
        return _super.call(this) || this;
    }
    EndPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        var tip = Global.createBitmapByName('win_tip_png', -199, -60);
        var title = Global.createBitmapByName('win_title_png', -64, -144);
        var toCity = Global.createBitmapByName('to_city_png', -107, 46);
        Global.setBut(toCity);
        this.view.addChild(title);
        this.view.addChild(toCity);
        this.view.addChild(tip);
        toCity.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'to_city', true));
        }, this);
    };
    return EndPop;
}(PopView));
__reflect(EndPop.prototype, "EndPop");
//# sourceMappingURL=EndPop.js.map