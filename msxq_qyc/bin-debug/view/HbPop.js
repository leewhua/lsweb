var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HbPop = (function (_super) {
    __extends(HbPop, _super);
    function HbPop() {
        return _super.call(this) || this;
    }
    HbPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this);
        var bg = Global.createBitmapByName("hb_light_png");
        bg.x = StageUtils.CW;
        bg.y = StageUtils.CH;
        bg.anchorOffsetX = bg.width >> 1;
        bg.anchorOffsetY = bg.height >> 1;
        this.addChild(bg);
        egret.Tween.get(bg).to({ rotation: 3600 }, 80000);
        var btn = Global.createBitmapByName("bg_btn_png");
        btn.x = StageUtils.SW - btn.width >> 1;
        btn.y = StageUtils.SH - btn.height >> 1;
        this.addChild(btn);
        Global.setBut(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            egret.Tween.removeTweens(bg);
            PopManager.hidePop("HbPop");
            PopManager.showPop("RewardPop", { val: 100, desc: "hb" });
        }, this);
        var mc = Global.createMc("loading_json", "loading_png", "");
        mc.play();
        mc.x = 0;
        mc.y = 0;
        this.addChild(mc);
    };
    return HbPop;
}(PopView));
__reflect(HbPop.prototype, "HbPop");
//# sourceMappingURL=HbPop.js.map