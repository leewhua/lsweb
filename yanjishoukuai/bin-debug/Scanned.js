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
var Scanned = (function (_super) {
    __extends(Scanned, _super);
    function Scanned() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Scanned.prototype.init = function () {
        this.touchEnabled = true;
        var ran = Math.floor(Math.random() * 4);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.8);
        bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        var bar = new Middle(Global.createBitmapByName('back_png'));
        var toJifen = new Middle(Global.createBitmapByName('button_store_png'));
        var toaj = new Middle(Global.createBitmapByName('button_dzp_png'));
        bar.x = 320;
        bar.y = 480;
        toJifen.x = 320;
        toJifen.y = 620;
        toaj.x = 320;
        toaj.y = 720;
        this.addChild(bg);
        this.addChild(bar);
        this.addChild(toJifen);
        this.addChild(toaj);
        toaj.alpha = bar.alpha = toJifen.alpha = 0;
        Global.setBut(toJifen);
        Global.setBut(toaj);
        Global.zoomIn(bar, 0, 400, 0.6);
        Global.zoomIn(toJifen, 200, 400, 0.6);
        Global.zoomIn(toaj, 300, 400, 0.6);
        toaj.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (Main.award.type == "cash") {
                window.location.href = "rotating.html?ticket=" + Main.user_ticket + "&aj=hb";
            }
            else {
                window.location.href = "rotating.html?ticket=" + Main.user_ticket + "&aj=jf";
            }
        }, this);
        toJifen.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            window.location.href = "http://0k6.cn/a/gotoplaycity";
        }, this);
    };
    return Scanned;
}(egret.Sprite));
__reflect(Scanned.prototype, "Scanned");
//# sourceMappingURL=Scanned.js.map