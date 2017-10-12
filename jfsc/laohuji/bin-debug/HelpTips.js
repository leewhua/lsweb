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
var HelpTips = (function (_super) {
    __extends(HelpTips, _super);
    function HelpTips() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    HelpTips.prototype.initView = function () {
        var over = new egret.Shape();
        over.graphics.beginFill(0x0, 0.68);
        over.graphics.drawRect(0, 0, 640, 1010);
        // var but = Main.createBitmapByName("close-help_png");
        var copy = Main.createBitmapByName("help-tips_png");
        copy.x = 48;
        copy.y = 260;
        // but.x=236
        // but.y=645;
        this.addChild(over);
        this.addChild(copy);
        // this.addChild(but);
        // Main.setBut(but);
        //     var _this1=this;
        //    this.touchEnabled = true;
        //    this.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) { 
        //         if(_this1.parent) _this1.parent.removeChild(_this1);
        //         },this);
    };
    return HelpTips;
}(egret.Sprite));
__reflect(HelpTips.prototype, "HelpTips");
//# sourceMappingURL=HelpTips.js.map