var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomCheckBox = (function (_super) {
    __extends(CustomCheckBox, _super);
    function CustomCheckBox(type, str, select) {
        if (select === void 0) { select = 0; }
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.text = str;
        _this.select = select;
        _this.init();
        return _this;
    }
    CustomCheckBox.prototype.init = function () {
        console.log();
        this.icon = Global.createBitmapByName("cbx_" + this.type + "_" + this.select + "_png");
        this.addChild(this.icon);
        this.txtContent = new egret.TextField();
        this.txtContent.x = 50;
        this.txtContent.text = this.text;
        this.addChild(this.txtContent);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    CustomCheckBox.prototype.clickHandler = function () {
        this.change();
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    CustomCheckBox.prototype.setSelect = function (sel) {
        this.select = sel;
        this.icon.texture = RES.getRes("cbx_" + this.type + "_" + this.select + "_png");
    };
    CustomCheckBox.prototype.change = function () {
        this.setSelect(this.select == 0 ? 1 : 0);
    };
    return CustomCheckBox;
}(egret.DisplayObjectContainer));
__reflect(CustomCheckBox.prototype, "CustomCheckBox");
//# sourceMappingURL=CustomCheckBox.js.map