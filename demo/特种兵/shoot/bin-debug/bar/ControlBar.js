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
var ControlBar = (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar() {
        var _this = _super.call(this) || this;
        _this.localX = 0;
        _this.scaleY = Main.scale;
        _this.touchEnabled = true;
        var bg = Global.createBitmapByName('c_bg_png');
        _this.point = new Middle(Global.createBitmapByName('c_m_png'));
        bg.x = bg.width / -2;
        bg.y = bg.height / -2;
        _this.point.x = 0;
        _this.point.y = 0;
        _this.addChild(bg);
        _this.addChild(_this.point);
        _this.x = 180;
        _this.y = 525;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBeginHander, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touchMoveHander, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEndHander, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.touchEndHander, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.touchEndHander, _this);
        return _this;
    }
    ControlBar.prototype.touchBeginHander = function (e) {
        this.localX = e.localX;
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    ControlBar.prototype.loop = function (e) {
        if (this.localX < 0) {
            this.dispatchEvent(new EventObj('event', 'left', true));
            this.point.x = -18;
        }
        else if (this.localX >= 0) {
            this.dispatchEvent(new EventObj('event', 'right', true));
            this.point.x = 18;
        }
    };
    ControlBar.prototype.touchMoveHander = function (e) {
        this.localX = e.localX;
    };
    ControlBar.prototype.touchEndHander = function (e) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.point.x = 0;
        this.dispatchEvent(new EventObj('event', 'control_end', true));
    };
    return ControlBar;
}(egret.Sprite));
__reflect(ControlBar.prototype, "ControlBar");
//# sourceMappingURL=ControlBar.js.map