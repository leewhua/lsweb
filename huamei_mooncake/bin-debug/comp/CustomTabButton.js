var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomTabButton = (function (_super) {
    __extends(CustomTabButton, _super);
    function CustomTabButton(label, w, h, size) {
        var _this = _super.call(this) || this;
        _this._select = false;
        _this.w = w;
        _this.h = h;
        _this.bg = new egret.Shape();
        _this.bg.graphics.beginFill(0x186cd1);
        _this.bg.graphics.drawRect(0, 0, w, h);
        _this.bg.graphics.endFill();
        _this.addChild(_this.bg);
        _this.txtLable = new egret.TextField();
        _this.txtLable.text = label;
        _this.txtLable.size = size;
        _this.txtLable.x = 0;
        _this.txtLable.y = 0;
        _this.txtLable.width = w;
        _this.txtLable.height = h;
        _this.txtLable.textAlign = "center";
        _this.txtLable.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.txtLable.textColor = 0xffffff;
        _this.addChild(_this.txtLable);
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(CustomTabButton.prototype, "select", {
        get: function () {
            return this._select;
        },
        set: function (val) {
            this._select = val;
            if (this._select) {
                this.txtLable.textColor = 0xffffff;
                this.bg.graphics.clear();
                this.bg.graphics.beginFill(0x186cd1);
                this.bg.graphics.drawRect(0, 0, this.w, this.h);
                this.bg.graphics.endFill();
            }
            else {
                this.txtLable.textColor = 0x0;
                this.bg.graphics.clear();
                this.bg.graphics.beginFill(0xffffff);
                this.bg.graphics.drawRect(0, 0, this.w, this.h);
                this.bg.graphics.endFill();
            }
        },
        enumerable: true,
        configurable: true
    });
    return CustomTabButton;
}(egret.DisplayObjectContainer));
__reflect(CustomTabButton.prototype, "CustomTabButton");
//# sourceMappingURL=CustomTabButton.js.map