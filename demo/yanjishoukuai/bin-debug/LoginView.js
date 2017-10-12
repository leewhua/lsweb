var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    LoginView.prototype.init = function () {
        var gameBg = Global.createBitmapByName("game_bg_png");
        gameBg.width = StageUtils.stage.stageWidth;
        gameBg.height = StageUtils.stage.stageHeight;
        this.addChild(gameBg);
        var bg = Global.createBitmapByName("login_bg_png");
        StageUtils.centerInParent(bg, 0, 50);
        this.addChild(bg);
        var title = Global.createBitmapByName("title_png");
        // title.scaleX = title.scaleY = 0.85;
        StageUtils.centerInParent(title, 10, -350);
        this.addChild(title);
        var logo = Global.createBitmapByName(Main.product_type + "_json.logo-blue");
        StageUtils.centerInParent(logo, 0, -500);
        this.addChild(logo);
        this.btnStart = Global.createBitmapByName("start_png");
        this.btnStart.x = 50;
        this.btnStart.y = 980;
        this.addChild(this.btnStart);
        this.btnGZ = Global.createBitmapByName("help-btn_png");
        this.btnGZ.x = 510;
        this.btnGZ.y = 20;
        this.addChild(this.btnGZ);
        this.btnStart.touchEnabled = true;
        this.btnStart.once(egret.TouchEvent.TOUCH_TAP, this.startClickHandler, this);
        this.btnGZ.touchEnabled = true;
        this.btnGZ.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gzClickHandler, this);
        Global.setBut(this.btnStart);
        Global.setBut(this.btnGZ);
        var man = new ManView();
        man.x = 550;
        man.y = 900;
        man.stand();
        this.addChild(man);
        // Main.showLost(1);
    };
    LoginView.prototype.startClickHandler = function () {
        Main.instance.showGame();
    };
    LoginView.prototype.gzClickHandler = function () {
        Main.showPop("HelpPop");
    };
    return LoginView;
}(egret.DisplayObjectContainer));
__reflect(LoginView.prototype, "LoginView");
//# sourceMappingURL=LoginView.js.map