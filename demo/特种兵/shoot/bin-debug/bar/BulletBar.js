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
var BulletBar = (function (_super) {
    __extends(BulletBar, _super);
    function BulletBar(t) {
        if (t === void 0) { t = 1; }
        var _this = _super.call(this) || this;
        _this.speed = 20;
        _this.area = [{ x: -3.85, y: 509.2 }, { x: 113.3, y: 437.5 }, { x: 162.75, y: 432.45 }, { x: 241.6, y: 398.25 }, { x: 305.85, y: 432.45 }, { x: 978.65, y: 425.6 }, { x: 1040.95, y: 455.7 }, { x: 1200, y: 518.5 }];
        _this.speed = _this.speed * t;
        var g = Global.createBitmapByName('bullet0_png');
        g.scaleX = t;
        g.x = g.width / -2;
        g.y = g.height / -2;
        _this.addChild(g);
        return _this;
        //this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }
    BulletBar.prototype.checkOut = function () {
        this.x += this.speed;
        if (this.x < -50 || this.x > 1250) {
            return true;
        }
        else {
            for (var i = 1; i < this.area.length; i++) {
                var x2 = this.area[i].x;
                if (this.x < x2) {
                    var x1 = this.area[i - 1].x;
                    var y1 = this.area[i - 1].y;
                    var y2 = this.area[i].y;
                    var a = (x2 - x1) / (y2 - y1);
                    var yy = (this.x - x1) / a + y1;
                    if (this.y >= yy) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        }
        //return false;
    };
    BulletBar.prototype.kill = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BulletBar;
}(egret.Sprite));
__reflect(BulletBar.prototype, "BulletBar");
//# sourceMappingURL=BulletBar.js.map