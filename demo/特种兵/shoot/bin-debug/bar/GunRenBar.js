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
var GunRenBar = (function (_super) {
    __extends(GunRenBar, _super);
    function GunRenBar(type, g) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.x = -660;
        _this.y = -280;
        _this.scaleX = _this.scaleY = 1.8;
        if (type == 0) {
            _this.scaleX = -1.8;
            _this.x = -680 + 300 * 1.8;
        }
        ;
        if (type == 1) {
            var ren = Global.createBitmapByRes('r' + type + '_w_json', 'r1_stand'); //'r1_gun'+g
            _this.addChild(ren);
            _this.x = -620;
        }
        else {
            var ren = Global.createBitmapByName("r" + _this.type + "_stand_png");
            _this.addChild(ren);
        }
        _this.setGun(g);
        return _this;
    }
    GunRenBar.prototype.setGun = function (g) {
        if (this.type == 1) {
            Global.remove(this.gunSp);
            this.gunSp = Global.createBitmapByRes('r1_w_json', 'r1_gun' + g); //
            this.addChildAt(this.gunSp, 0);
        }
        else {
            Global.remove(this.gunSp);
            this.gunSp = Global.createMc("r_g" + g + "_json", "r_g" + g + "_png", "r_g" + g);
            this.gunSp.gotoAndStop(0);
            this.addChild(this.gunSp);
        }
    };
    return GunRenBar;
}(egret.Sprite));
__reflect(GunRenBar.prototype, "GunRenBar");
//# sourceMappingURL=GunRenBar.js.map