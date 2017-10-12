var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    TipsView.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var bg = Global.createBitmapByName('pop_bg_png');
        StageUtils.centerInParent(bg);
        this.view.addChild(bg);
        var reward = new CustomImage("resource/assets/reward/tips_1.png", true, function () {
            reward.x = StageUtils.SW - reward.width >> 1;
            reward.y = StageUtils.SH - reward.height >> 1;
        });
        this.view.addChild(reward);
    };
    return TipsView;
}(PopUp));
__reflect(TipsView.prototype, "TipsView");
//# sourceMappingURL=TipsView.js.map