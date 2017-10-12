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
var GunBar = (function (_super) {
    __extends(GunBar, _super);
    function GunBar(type, info) {
        if (info === void 0) { info = false; }
        var _this = _super.call(this) || this;
        _this.info = info;
        _this.type = type;
        _this.setType(type);
        return _this;
    }
    GunBar.prototype.setType = function (type) {
        while (this.numChildren > 0)
            this.removeChildAt(0);
        this.type = type;
        var g = Global.createBitmapByName('g' + type + '_png');
        g.x = g.width / -2;
        g.y = g.height / -2;
        this.addChild(g);
        if (this.info) {
            var jfTxt = new egret.TextField();
            jfTxt.size = 32;
            jfTxt.textAlign = "center";
            jfTxt.textColor = 0xffffff;
            jfTxt.width = 117;
            jfTxt.y = 20;
            jfTxt.x = 170;
            jfTxt.text = GameInfo.gunData[this.type].sco.toString();
            var jf = Global.createBitmapByName('buy_jf_png', 170, 0);
            var name = new Middle(Global.createBitmapByName('gun_name' + this.type + '_png'), 0, -130);
            var star = GameInfo.gunData[this.type].star;
            this.addChild(jf);
            this.addChild(jfTxt);
            this.addChild(name);
            var s;
            for (var i = 0; i < 5; i++) {
                if (star > i) {
                    s = Global.createBitmapByName('buy_star1_png', -100 + 36 * i, 100);
                }
                else {
                    s = Global.createBitmapByName('buy_star2_png', -100 + 36 * i, 100);
                }
                this.addChild(s);
            }
        }
    };
    return GunBar;
}(egret.Sprite));
__reflect(GunBar.prototype, "GunBar");
//# sourceMappingURL=GunBar.js.map