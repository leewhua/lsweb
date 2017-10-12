var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopView = (function (_super) {
    __extends(PopView, _super);
    function PopView() {
        return _super.call(this) || this;
    }
    PopView.prototype.show = function () {
        // var bg=new egret.Shape()
        // bg.graphics.beginFill(0xf9f9f9,0.5);
        // bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        // bg.graphics.endFill();
        // // this.view.scaleY = Main.scale;
        // // this.view.x=600;
        // // this.view.y=320;
        // this.addChildAt(bg,0);
        // bg.alpha=0;
        // Global.fadeIn(bg);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    PopView.prototype.hide = function () {
        UIManager.instance.popLayer.removeChild(this);
    };
    PopView.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
    };
    return PopView;
}(egret.DisplayObjectContainer));
__reflect(PopView.prototype, "PopView");
//# sourceMappingURL=PopView.js.map