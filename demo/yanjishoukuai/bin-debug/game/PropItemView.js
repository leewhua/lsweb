var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PropItemView = (function (_super) {
    __extends(PropItemView, _super);
    function PropItemView(id) {
        var _this = _super.call(this) || this;
        _this.index = 8;
        _this.id = id;
        _this.canSelect = true;
        _this.canMove = true;
        var prop = Global.createBitmapByName("prop" + id + "_png");
        _this.icon = new Middle(prop);
        // prop.y -= (prop.height >> 1);
        _this.addChild(_this.icon);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickHandler, _this);
        return _this;
    }
    PropItemView.prototype.clickHandler = function () {
        if (this.isGlow) {
            SoundManager.getInstance().play('click_mp3', 0.5, 1);
            GameDispatcher.instance.dispatchEvent(new EventObj("custom", "item_click", false, false, { id: this.id, x: this.x, y: this.y }));
        }
    };
    PropItemView.prototype.setGlow = function (bl) {
        if (this.isGlow != bl) {
            if (bl) {
                this.touchEnabled = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            }
            else {
                this.touchEnabled = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
                this.icon.filters = [];
            }
            this.isGlow = bl;
        }
    };
    PropItemView.prototype.enterFrameHandler = function () {
        this.icon.filters = [new egret.GlowFilter(0x00fcff, 0.8, this.index, this.index, 2, 3 /* HIGH */, false, false)];
        if (this.isAdd) {
            this.index += 2;
            if (this.index > 15) {
                this.isAdd = false;
            }
        }
        else {
            this.index -= 2;
            if (this.index < 0) {
                this.isAdd = true;
            }
        }
    };
    return PropItemView;
}(egret.DisplayObjectContainer));
__reflect(PropItemView.prototype, "PropItemView");
//# sourceMappingURL=PropItemView.js.map