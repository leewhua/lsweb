var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomButton = (function (_super) {
    __extends(CustomButton, _super);
    function CustomButton(url, w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
        var _this = _super.call(this) || this;
        _this.bg = Global.createBitmapByName(url);
        if (w) {
            _this.bg.width = w;
        }
        if (h) {
            _this.bg.height = h;
        }
        _this.addChild(_this.bg);
        _this.label = new egret.TextField();
        _this.label.fontFamily = "微软雅黑";
        _this.label.size = 40;
        _this.label.textColor = 0xffffff;
        // this.label.bold = true;
        // this.label.stroke = 1;
        _this.label.width = _this.bg.width;
        _this.label.height = _this.bg.height - 5;
        _this.label.textAlign = egret.HorizontalAlign.CENTER;
        _this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.addChild(_this.label);
        _this.touchEnabled = true;
        Global.setBut(_this);
        return _this;
    }
    Object.defineProperty(CustomButton.prototype, "text", {
        get: function () {
            return this.label.text;
        },
        set: function (val) {
            this.label.text = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomButton.prototype, "enabled", {
        set: function (bl) {
            if (bl) {
                this.alpha = 1;
                this.touchEnabled = true;
            }
            else {
                this.alpha = 0.68;
                this.touchEnabled = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return CustomButton;
}(egret.DisplayObjectContainer));
__reflect(CustomButton.prototype, "CustomButton");
//# sourceMappingURL=CustomButton.js.map