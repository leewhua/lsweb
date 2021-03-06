var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        var bg = new CustomImage("resource/assets/asyn/loading_bg.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = StageUtils.SW;
        this.textField.height = 100;
        this.textField.x = 0;
        this.textField.y = 0; //StageUtils.CH;
        this.textField.size = 20;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map