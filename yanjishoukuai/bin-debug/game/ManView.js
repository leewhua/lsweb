var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ManView = (function (_super) {
    __extends(ManView, _super);
    function ManView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    ManView.prototype.init = function () {
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        var car = Global.createBitmapByName("car_png");
        car.x = -285;
        car.y = -40;
        this.addChild(car);
        this.mc = Global.createMc("man_json", "man_png", "man");
        this.mc.x = -this.mc.width >> 1;
        this.mc.y = -this.mc.height >> 1;
        this.addChild(this.mc);
        // GameDispatcher.instance.addEventListener("custom",this.customEventHandler,this);
    };
    ManView.prototype.addProp = function (prop) {
        prop.x = -150 + Math.random() * 50 - 25;
        prop.y = 90;
        this.container.addChild(prop);
    };
    ManView.prototype.stand = function () {
        this.mc.gotoAndPlay("stand", -1);
        this.mc.frameRate = 12;
    };
    ManView.prototype.play = function () {
        this.mc.gotoAndPlay("play", -1);
        this.mc.frameRate = 24;
        SoundManager.getInstance().play("play_mp3");
    };
    ManView.getInstance = function () {
        if (!ManView._instance) {
            ManView._instance = new ManView();
        }
        return ManView._instance;
    };
    return ManView;
}(egret.DisplayObjectContainer));
__reflect(ManView.prototype, "ManView");
//# sourceMappingURL=ManView.js.map