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
var PopView = (function (_super) {
    __extends(PopView, _super);
    function PopView() {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.view = new egret.Sprite();
        return _this;
    }
    PopView.prototype.show = function (hasDelay, hasBg, now) {
        if (hasDelay === void 0) { hasDelay = false; }
        if (hasBg === void 0) { hasBg = true; }
        if (now === void 0) { now = true; }
        var delay = 0;
        if (hasDelay)
            delay = 500;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.6);
        bg.graphics.drawRect(0, 0, 1200, 640);
        this.view.scaleY = Main.scale;
        this.view.x = 600;
        this.view.y = 320;
        if (hasBg)
            this.addChild(bg);
        this.addChild(this.view);
        bg.alpha = this.view.alpha = 0;
        Global.fadeIn(bg);
        //Global.zoomIn(this.view,delay);
        this.view.scaleX = this.view.scaleY = 0.6;
        if (now) {
            var tw = egret.Tween.get(this.view);
            tw.wait(delay);
            tw.to({ alpha: 1, scaleX: 1, scaleY: Main.scale }, 500, egret.Ease.backOut);
        }
    };
    PopView.prototype.out = function () {
        Global.fadeOut(this);
        var tw = egret.Tween.get(this.view);
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 400, egret.Ease.cubicIn);
        tw.call(function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        });
    };
    return PopView;
}(egret.Sprite));
__reflect(PopView.prototype, "PopView");
//# sourceMappingURL=PopView.js.map