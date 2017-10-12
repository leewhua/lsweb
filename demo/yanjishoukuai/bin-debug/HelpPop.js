var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HelpPop = (function (_super) {
    __extends(HelpPop, _super);
    function HelpPop() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    HelpPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var bg = Global.createBitmapByName('pop_bg_png');
        StageUtils.centerInParent(bg);
        this.view.addChild(bg);
        var title = Global.createBitmapByName('help_bg_png');
        StageUtils.centerInParent(title, 0, 50);
        this.view.addChild(title);
        var toPlay = Global.createBitmapByName('ok_png');
        StageUtils.centerInParent(toPlay, 0, 480);
        this.view.addChild(toPlay);
        Global.setBut(toPlay);
        // this.view.addChild(bg);
        // this.view.addChild(title);
        // this.view.addChild(toPlay);
        toPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            Main.removePop("HelpPop");
        }, this);
    };
    return HelpPop;
}(PopUp));
__reflect(HelpPop.prototype, "HelpPop");
//# sourceMappingURL=HelpPop.js.map