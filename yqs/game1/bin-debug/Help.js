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
        _this.initView();
        return _this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Help.prototype.initView = function () {
        var over = new egret.Shape();
        over.graphics.beginFill(0x0, 0.68);
        over.graphics.drawRect(0, 0, 640, 1010);
        var but = Main.createBitmapByName("close-help_png");
        var copy = Main.createBitmapByName("help-copy_png");
        copy.x = 68;
        copy.y = 220;
        but.x = 236;
        but.y = 645;
        this.addChild(over);
        this.addChild(copy);
        this.addChild(but);
        Main.setBut(but);
        var _this1 = this;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (_this1.parent)
                _this1.parent.removeChild(_this1);
        }, this);
    };
    return Help;
}(egret.Sprite));
__reflect(Help.prototype, "Help");
//# sourceMappingURL=Help.js.map