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
var SelectRenBar = (function (_super) {
    __extends(SelectRenBar, _super);
    function SelectRenBar(type) {
        var _this = _super.call(this) || this;
        _this.inActive = false;
        _this.type = type;
        var bg = Global.createBitmapByName('r_bg_png', -213.5, -214);
        _this.over = Global.createBitmapByName('r_black_png', -165.5, -190);
        var ren = Global.createBitmapByName('r' + type + "_png", -165.5, -190);
        _this.but = new Middle(Global.createBitmapByName('r_s_png'), 0, 190);
        _this.addChild(bg);
        _this.addChild(ren);
        _this.addChild(_this.over);
        _this.but.alpha = 1;
        Global.setBut(_this.but);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'active_ren', true, false, this.type));
        }, _this);
        _this.but.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'select_ren', true, false, this.type));
        }, _this);
        return _this;
    }
    SelectRenBar.prototype.active = function (b) {
        if (this.inActive != b) {
            this.inActive = b;
            if (b) {
                this.addChild(this.but);
                Global.fadeOut(this.over);
            }
            else {
                this.addChild(this.over);
                Global.fadeIn(this.over);
                if (this.but.parent)
                    this.but.parent.removeChild(this.but);
            }
        }
    };
    return SelectRenBar;
}(egret.Sprite));
__reflect(SelectRenBar.prototype, "SelectRenBar");
//# sourceMappingURL=SelectRenBar.js.map