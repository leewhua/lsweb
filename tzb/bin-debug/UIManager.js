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
        this.mainUILayer = new egret.DisplayObjectContainer();
        this.addChild(this.mainUILayer);
        this.popLayer = new egret.DisplayObjectContainer();
        this.addChild(this.popLayer);
        this.topLayer = new egret.DisplayObjectContainer();
        this.addChild(this.topLayer);
    };
    UIManager.prototype.initMainView = function () {
        if (Main.IS_SHARE) {
            this.mainUILayer.addChild(new ShareView());
        }
        else {
            if (Main.type == 1) {
                this.game = new Game1();
                this.mainUILayer.addChild(this.game);
            }
            else if (Main.type == 2) {
                this.game = new Game2();
                this.mainUILayer.addChild(this.game);
            }
            else {
                this.game = new Game3();
                this.mainUILayer.addChild(this.game);
            }
        }
        if (Main.step == "filled") {
            PopManager.showPop("InputPop");
            console.log("input");
        }
        else if (Main.step == "cashed") {
            PopManager.showPop("InfoPop");
        }
    };
    UIManager.prototype.initShareView = function () {
        if (this.game) {
            this.mainUILayer.removeChild(this.game);
            this.game = null;
        }
        this.mainUILayer.addChild(new ShareView());
    };
    return UIManager;
}(egret.DisplayObjectContainer));
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map