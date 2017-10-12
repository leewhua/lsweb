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
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        return _super.call(this) || this;
    }
    Tips.prototype.clearNow = function () {
        if (this.nowMov) {
            //this.removeChild(this.nowMov);
            Main.zoomOut(this.nowMov, 0, 400, 1.2);
        }
        this.nowMov = null;
    };
    Tips.prototype.hide = function () {
        this.clearNow();
    };
    Tips.prototype.wating = function (d) {
        this.clearNow();
        this.nowMov = new Middle(Main.createBitmapByName("play-tip_png"));
        //this.nowMov.x = this.nowMov.width/-2;
        //this.nowMov.y = this.nowMov.height/-2;
        this.nowMov.alpha = 0;
        Main.zoomIn(this.nowMov, d, 400, 0.6);
        this.addChild(this.nowMov);
    };
    Tips.prototype.lost = function (d) {
        this.clearNow();
        this.nowMov = new Middle(Main.createBitmapByName("lost-copy_png"));
        this.nowMov.alpha = 0;
        Main.zoomIn(this.nowMov, d, 400, 0.6);
        this.addChild(this.nowMov);
    };
    Tips.prototype.win = function (d) {
        this.clearNow();
        this.nowMov = new Middle(Main.createBitmapByName("win-copy_png"));
        this.nowMov.alpha = 0;
        Main.zoomIn(this.nowMov, d, 400, 0.6);
        this.addChild(this.nowMov);
    };
    return Tips;
}(egret.Sprite));
__reflect(Tips.prototype, "Tips");
//# sourceMappingURL=Tips.js.map