var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResultPop = (function (_super) {
    __extends(ResultPop, _super);
    function ResultPop() {
        return _super.call(this) || this;
    }
    ResultPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        var img = new CustomImage("resource/assets/asyn/answer_bg.png", true, function () {
            img.x = StageUtils.SW - img.width >> 1;
            img.y = StageUtils.SH - img.height >> 1;
        });
        this.addChild(img);
        var bg = new CustomImage("resource/assets/asyn/answer_result_" + data + ".png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var btnClose = Global.createBitmapByName("close_png");
        btnClose.x = StageUtils.SW - btnClose.width - 90;
        btnClose.y = 185;
        this.addChild(btnClose);
        btnClose.touchEnabled = true;
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
        MainView.instance.people.visible = false;
    };
    ResultPop.prototype.closeClickHandler = function () {
        PopManager.hidePop("ResultPop");
        MainView.instance.people.visible = true;
    };
    return ResultPop;
}(PopView));
__reflect(ResultPop.prototype, "ResultPop");
//# sourceMappingURL=ResultPop.js.map