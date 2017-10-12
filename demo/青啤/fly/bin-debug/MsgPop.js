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
var MsgPop = (function (_super) {
    __extends(MsgPop, _super);
    function MsgPop() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MsgPop.prototype.onAddToStage = function (event) {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.9);
        bg.graphics.drawRect(0, 0, 640, 1015);
        var sc = new Middle(Main.createBitmapByName('out_png'));
        sc.x = 320;
        sc.y = 1015 / 2;
        var msg = new egret.TextField();
        msg.width = 480;
        msg.textColor = 0xffffff;
        msg.textAlign = 'center';
        msg.text = "您的二维码已被抽奖\n若有任何疑问请联系客服";
        msg.size = 32;
        msg.lineSpacing = 12;
        msg.x = -240;
        msg.y = -180;
        this.addChild(bg);
        this.addChild(sc);
        sc.addChild(msg);
        sc.alpha = 0;
        bg.alpha = 0;
        Main.tweenTo(bg, 0, 400, 0, 0, 1, egret.Ease.cubicOut);
        Main.zoomIn(sc, 200, 400, 0.6);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (this.parent)
                this.parent.removeChild(this);
        }, this);
    };
    return MsgPop;
}(egret.Sprite));
__reflect(MsgPop.prototype, "MsgPop");
//# sourceMappingURL=MsgPop.js.map