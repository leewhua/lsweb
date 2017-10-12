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
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Help.prototype.onAddToStage = function (event) {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.7);
        bg.graphics.drawRect(0, 0, 640, 1015);
        var close = new Middle(Main.createBitmapByName('ok_png'));
        var sc = new Middle(Main.createBitmapByName('help_png'));
        sc.x = 320;
        sc.y = 1015 / 2;
        close.x = 320;
        close.y = 820;
        this.addChild(bg);
        this.addChild(sc);
        this.addChild(close);
        bg.touchEnabled = true;
        close.touchEnabled = true;
        Main.setBut(close);
        sc.alpha = 0;
        close.alpha = 0;
        Main.zoomIn(sc, 0, 400, 0.6);
        Main.zoomIn(close, 200, 400, 0.6);
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (this.parent)
                this.parent.removeChild(this);
        }, this);
    };
    return Help;
}(egret.Sprite));
__reflect(Help.prototype, "Help");
//# sourceMappingURL=Help.js.map