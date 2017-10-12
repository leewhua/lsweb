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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this._sx = 0;
        _this._sy = 0;
        _this.oldX = 0;
        _this.oldY = 0;
        _this.ball = Main.createBitmapByName('ball_png');
        _this.blurBall = Main.createBitmapByName('ball2_png');
        _this.flash = new Middle(Main.createBitmapByName('ball-flash_png'));
        _this.ball.x = _this.ball.width / -2;
        _this.ball.y = _this.ball.height / -2;
        _this.blurBall.x = _this.blurBall.width / -2;
        _this.blurBall.y = _this.blurBall.height / -2;
        _this.flash.x = 0;
        _this.flash.y = 0;
        _this.addChild(_this.ball);
        _this.addChild(_this.blurBall);
        _this.blurBall.alpha = 0;
        return _this;
    }
    Ball.prototype.initXY = function (xx, yy) {
        this.sx = xx;
        this.sy = yy;
        this.oldX = xx;
        this.oldY = yy;
        this.checkBlue();
        console.log('initXY');
    };
    Object.defineProperty(Ball.prototype, "sx", {
        get: function () {
            return this._sx;
        },
        set: function (xx) {
            this.oldX = this._sx;
            this._sx = xx;
            this.x = xx;
            this.checkBlue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "sy", {
        get: function () {
            return this._sy;
        },
        set: function (yy) {
            this.oldY = this._sy;
            this._sy = yy;
            this.y = yy;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.boom = function () {
        this.addChildAt(this.flash, 0);
        Main.zoomOut(this.flash, 0, 200, 1.6);
        console.log("boom");
    };
    Ball.prototype.checkBlue = function () {
        var ox = (this._sx - this.oldX);
        var oy = (this._sy - this.oldY);
        var c = ox * ox + oy * oy;
        c = c / 10;
        c = Math.min(c, 1);
        this.blurBall.alpha = c;
        //console.log("his.blurBall.alpha :" + this.blurBall.alpha + ":"+(ox * ox + oy * oy) );
    };
    return Ball;
}(egret.Sprite));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map