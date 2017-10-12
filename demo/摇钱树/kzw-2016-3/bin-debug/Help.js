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
        this.sp = new egret.Sprite();
        var help = Main.createBitmapByRes("h321_json", "icon");
        this.scaleY = Main.scale;
        help.x = help.width / -2;
        help.y = help.height / -2;
        this.sp.addChild(help);
        this.addChild(this.sp);
        this.sp.rotation = 20;
        this.play();
    };
    Help.prototype.play = function () {
        var tw = egret.Tween.get(this.sp, {});
        tw.to({ "rotation": -20 }, 200);
        tw.call(function () {
            this.play2();
        }, this);
    };
    Help.prototype.play2 = function () {
        var tw = egret.Tween.get(this.sp, {});
        tw.to({ "rotation": 20 }, 200);
        tw.call(function () {
            this.play();
        }, this);
    };
    return Help;
}(egret.Sprite));
__reflect(Help.prototype, "Help");
//# sourceMappingURL=Help.js.map