var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        _this.initLayer();
        return _this;
    }
    Object.defineProperty(UIManager, "instance", {
        get: function () {
            if (!UIManager._instance) {
                UIManager._instance = new UIManager();
            }
            return UIManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.initLayer = function () {
        this.mapLayer = new egret.DisplayObjectContainer();
        this.addChild(this.mapLayer);
        this.mainUILayer = new egret.DisplayObjectContainer();
        this.addChild(this.mainUILayer);
        this.popLayer = new egret.DisplayObjectContainer();
        this.addChild(this.popLayer);
        this.topLayer = new egret.DisplayObjectContainer();
        this.addChild(this.topLayer);
    };
    UIManager.prototype.initMainView = function () {
        MapManager.instance;
        this.mainUILayer.addChild(new MainView());
        // PopManager.showPop("TipsPop");
        // MainView.instance.showPingZi();
        // MainView.instance.initSmallShop();
        //领奖
        // PopManager.showPop("RewardPop",{desc:"sw",val:1});
        //兑奖
        // PopManager.showPop("RewardPop",{desc:"sw",val:0});
        //已兑奖
        // PopManager.showPop("RewardPop",{desc:"sw",val:-1});
        // PopManager.showPop("ShopPop");
    };
    return UIManager;
}(egret.DisplayObjectContainer));
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map