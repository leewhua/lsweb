var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoShareItem = (function (_super) {
    __extends(InfoShareItem, _super);
    function InfoShareItem(type, num) {
        var _this = _super.call(this) || this;
        var bg = new CustomImage("resource/assets/asyn/moontype/3/" + type + ".png", true, function () {
        });
        _this.addChild(bg);
        var numBg = Global.createBitmapByName("num_bg_png");
        numBg.x = 420;
        numBg.y = 20;
        _this.addChild(numBg);
        _this.txtNum = new egret.TextField();
        _this.txtNum.x = 424;
        _this.txtNum.y = 26;
        _this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.txtNum.width = 54;
        _this.txtNum.textColor = 0x0;
        _this.addChild(_this.txtNum);
        _this.txtNum.text = num + "";
        return _this;
    }
    return InfoShareItem;
}(egret.DisplayObjectContainer));
__reflect(InfoShareItem.prototype, "InfoShareItem");
//# sourceMappingURL=InfoShareItem.js.map