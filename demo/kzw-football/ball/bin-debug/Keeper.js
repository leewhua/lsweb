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
var Keeper = (function (_super) {
    __extends(Keeper, _super);
    function Keeper() {
        var _this = _super.call(this) || this;
        _this.wating();
        return _this;
    }
    Keeper.prototype.clearNow = function () {
        if (this.nowMov) {
            this.removeChild(this.nowMov);
        }
        this.nowMov = null;
    };
    Keeper.prototype.wating = function () {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-dengdai_json", Main.product_type + "-dengdai_png", "dengdai");
        this.nowMov.x = -130;
        this.nowMov.y = -200;
        this.nowMov.play(-1);
        this.addChild(this.nowMov);
        console.log(Main.product_type + "-dengdai_json", Main.product_type + "-dengdai_png", 'dengdai');
    };
    Keeper.prototype.left_top = function () {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-left_json", Main.product_type + "-left_png", "left");
        this.nowMov.x = -258;
        this.nowMov.y = -360;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    };
    Keeper.prototype.left_bottom = function () {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-left-lost_json", Main.product_type + "-left-lost_png", "left-lost");
        this.nowMov.x = -258;
        this.nowMov.y = -280;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    };
    Keeper.prototype.right_top = function () {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-right_json", Main.product_type + "-right_png", "right");
        this.nowMov.x = -114;
        this.nowMov.y = -300;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    };
    Keeper.prototype.right_bottom = function () {
        this.clearNow();
        this.nowMov = Main.createMc(Main.product_type + "-right-lost_json", Main.product_type + "-right-lost_png", "right-lost");
        this.nowMov.x = -114;
        this.nowMov.y = -280;
        this.nowMov.play(1);
        this.addChild(this.nowMov);
    };
    return Keeper;
}(egret.Sprite));
__reflect(Keeper.prototype, "Keeper");
//# sourceMappingURL=Keeper.js.map