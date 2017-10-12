var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PayDetailPop = (function (_super) {
    __extends(PayDetailPop, _super);
    function PayDetailPop() {
        return _super.call(this) || this;
    }
    PayDetailPop.prototype.show = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.7);
        bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        bg.graphics.endFill();
        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        this.addChildAt(bg, 0);
        bg.alpha = 0;
        Global.fadeIn(bg);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    PayDetailPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/pop_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        var title = Global.createBitmapByName("detail_title_png");
        title.x = StageUtils.SW - title.width >> 1;
        title.y = 195;
        this.addChild(title);
        var btnClose = Global.createBitmapByName("btn_change_close_png");
        btnClose.x = 530;
        btnClose.y = 100;
        this.addChild(btnClose);
        var container = new egret.DisplayObjectContainer();
        var scroll = new egret.ScrollView(container);
        scroll.width = 510;
        scroll.height = 580;
        scroll.x = 100;
        scroll.y = 270;
        this.addChild(scroll);
        // scroll.setContent(container);
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var item = new PayDetailItem();
            item.setData(data[i]);
            item.x = 0;
            item.y = 30 + 100 * i;
            container.addChild(item);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    PayDetailPop.prototype.touchHandler = function (e) {
        var target = e.target;
        if (target == this) {
            PopManager.hidePop("PayDetailPop");
        }
    };
    return PayDetailPop;
}(PopView));
__reflect(PayDetailPop.prototype, "PayDetailPop");
//# sourceMappingURL=PayDetailPop.js.map