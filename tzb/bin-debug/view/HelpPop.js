var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HelpPop = (function (_super) {
    __extends(HelpPop, _super);
    function HelpPop() {
        return _super.call(this) || this;
    }
    HelpPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/action_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        //创建 ScrollView
        var scrollView = new egret.ScrollView();
        //设置滚动区域宽高
        scrollView.width = 473;
        scrollView.height = 450;
        scrollView.y = 415;
        this.addChild(scrollView);
        var content = new CustomImage("resource/assets/asyn/action.png", true, function () {
            //设置滚动内容
            scrollView.setContent(content);
            scrollView.x = StageUtils.SW - content.width >> 1;
        });
        var up = Global.createBitmapByName("btn_up_png");
        up.x = StageUtils.SW - up.width >> 1;
        up.y = StageUtils.SH - 160;
        this.addChild(up);
        var close = Global.createBitmapByName("btn_close_png");
        close.x = 545;
        close.y = 133;
        this.addChild(close);
        Global.setBut(close);
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    HelpPop.prototype.closeHandler = function () {
        PopManager.hidePop("HelpPop");
    };
    return HelpPop;
}(PopView));
__reflect(HelpPop.prototype, "HelpPop");
//# sourceMappingURL=HelpPop.js.map