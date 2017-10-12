var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StopJihuoPop = (function (_super) {
    __extends(StopJihuoPop, _super);
    function StopJihuoPop() {
        return _super.call(this) || this;
    }
    StopJihuoPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this);
        var bg = new CustomImage("resource/assets/asyn/error/stop_jihuo.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnToInfo = Global.createBitmapByName("btnToInfo_png");
        btnToInfo.x = StageUtils.SW - btnToInfo.width >> 1;
        btnToInfo.y = 650;
        this.addChild(btnToInfo);
        Global.setBut(btnToInfo);
        btnToInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btntoinfoHandler, this);
    };
    StopJihuoPop.prototype.btntoinfoHandler = function () {
        PopManager.hidePop("StopJihuoPop");
        PopManager.showPop("InfoPop");
    };
    return StopJihuoPop;
}(PopView));
__reflect(StopJihuoPop.prototype, "StopJihuoPop");
//# sourceMappingURL=StopJihuoPop.js.map