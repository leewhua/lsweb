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
var End = (function (_super) {
    __extends(End, _super);
    function End() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    End.prototype.onAddToStage = function (event) {
        var ran = Math.floor(Math.random() * 4);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, 0.8);
        bg.graphics.drawRect(0, 0, 640, 1015);
        var bar = new Middle(Main.createBitmapByName('win-bar_png'));
        var toCity = new Middle(Main.createBitmapByName('to-city_png'));
        var win;
        console.log("Main.award.count::" + Main.award.count);
        if (Main.award.type == "thanks") {
            win = Main.createBitmapByName('thanks_png');
            win.x = win.width / -2;
            win.y = win.height / -2;
        }
        else if (Main.award.type == "cash") {
            win = Main.createBitmapByName(Main.award.count.toString() + '_png');
            win.x = win.width / -2;
            win.y = win.height / -2;
        }
        else {
            win = Main.createBitmapByName('p-10_png');
            win.x = win.width / -2;
            win.y = win.height / -2 - 76;
        }
        //1_png 2_png 3_png 99_png  p-10_png
        bar.x = 320;
        bar.y = 520;
        toCity.x = 320;
        toCity.y = 920;
        bg.touchEnabled = true;
        bar.addChild(win);
        Main.setBut(toCity);
        this.addChild(bg);
        this.addChild(bar);
        this.addChild(toCity);
        bar.alpha = 0;
        toCity.alpha = 0;
        Main.zoomIn(bar, 0, 400, 0.6);
        Main.zoomIn(toCity, 200, 400, 0.6);
        toCity.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            window.location.href = "http://res.leasiondata.cn/lstatic/kzwyqs/jifen/playcity.html";
        }, this);
    };
    return End;
}(egret.Sprite));
__reflect(End.prototype, "End");
//# sourceMappingURL=End.js.map