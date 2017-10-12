var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTipView = (function (_super) {
    __extends(GameTipView, _super);
    function GameTipView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    GameTipView.prototype.init = function () {
        var tip = Global.createBitmapByName("game_tip1_png");
        StageUtils.centerInParent(tip);
        this.addChild(tip);
    };
    return GameTipView;
}(egret.DisplayObjectContainer));
__reflect(GameTipView.prototype, "GameTipView");
//# sourceMappingURL=GameTipView.js.map