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
var HelpPop = (function (_super) {
    __extends(HelpPop, _super);
    function HelpPop() {
        return _super.call(this) || this;
    }
    HelpPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        var bg = Global.createBitmapByName('pop_bg_png', -254, -165);
        var title = Global.createBitmapByName('p_tip_png', -171, -144);
        var toPlay = Global.createBitmapByName('to_play_png', -146, 38);
        Global.setBut(toPlay);
        this.view.addChild(bg);
        this.view.addChild(title);
        this.view.addChild(toPlay);
        toPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'start_321', true));
        }, this);
    };
    return HelpPop;
}(PopView));
__reflect(HelpPop.prototype, "HelpPop");
//# sourceMappingURL=HelpPop.js.map