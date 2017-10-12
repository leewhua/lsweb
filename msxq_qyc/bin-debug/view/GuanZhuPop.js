var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GuanZhuPop = (function (_super) {
    __extends(GuanZhuPop, _super);
    function GuanZhuPop() {
        var _this = _super.call(this) || this;
        _this.state = 0;
        return _this;
    }
    GuanZhuPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        this.removeChildren();
        // var bg = new CustomImage("resource/assets/asyn/pop_bg.png",true,()=>{
        // 	bg.x = StageUtils.SW - bg.width >> 1;
        // 	bg.y = StageUtils.SH - bg.height >> 1;
        // });
        // this.addChild(bg);
        var bg = Global.createBitmapByName("pop_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        this.addChild(bg);
        var bg1 = Global.createBitmapByName("guanzhu_bg_png");
        bg1.x = StageUtils.SW - bg1.width >> 1;
        bg1.y = StageUtils.SH - bg1.height >> 1;
        this.addChild(bg1);
        var btnInto = Global.createBitmapByName("btn_get_zhidao_png");
        btnInto.x = StageUtils.SW - btnInto.width >> 1;
        btnInto.y = 750;
        this.addChild(btnInto);
        btnInto.touchEnabled = true;
        Global.setBut(btnInto);
        btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okClickHandler, this);
        this.code = new QRCode("resource/assets/asyn/guanzhu_code.png");
        this.code.setPosition(StageUtils.SW - 206 >> 1, (StageUtils.SH - 206 >> 1) + 20, 206, 206);
        this.code.showHtmlCode();
    };
    GuanZhuPop.prototype.okClickHandler = function () {
        this.code.hideHtmlCode();
        PopManager.hidePop("GuanZhuPop");
    };
    return GuanZhuPop;
}(PopView));
__reflect(GuanZhuPop.prototype, "GuanZhuPop");
//# sourceMappingURL=GuanZhuPop.js.map