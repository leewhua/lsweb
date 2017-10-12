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
var Fly = (function (_super) {
    __extends(Fly, _super);
    function Fly() {
        var _this = _super.call(this) || this;
        _this.wating();
        return _this;
    }
    Fly.prototype.clearNow = function () {
        if (this.nowMov) {
            this.removeChild(this.nowMov);
        }
        this.nowMov = null;
    };
    Fly.prototype.wating = function () {
        this.clearNow();
        this.nowMov = Main.createMc("shemen_json", "shemen_png", "shemen");
        this.nowMov.gotoAndStop(1);
        this.nowMov.x = -320;
        this.nowMov.y = -500;
        this.addChild(this.nowMov);
    };
    Fly.prototype.shoot = function () {
        this.clearNow();
        this.nowMov = Main.createMc("shemen_json", "shemen_png", "shemen");
        this.nowMov.play(1);
        this.nowMov.x = -320;
        this.nowMov.y = -500;
        this.addChild(this.nowMov);
    };
    Fly.prototype.win = function () {
        this.clearNow();
        this.nowMov = Main.createMc("huanhu_json", "huanhu_png", "huanhu");
        this.nowMov.x = -180;
        this.nowMov.y = -500;
        this.nowMov.play(-1);
        this.addChild(this.nowMov);
    };
    Fly.prototype.lost = function () {
        this.clearNow();
        this.nowMov = Main.createBitmapByName("lost_png");
        this.nowMov.x = -130;
        this.nowMov.y = -370;
        this.addChild(this.nowMov);
    };
    return Fly;
}(egret.Sprite));
__reflect(Fly.prototype, "Fly");
//# sourceMappingURL=Fly.js.map