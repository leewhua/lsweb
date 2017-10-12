var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.fps = 0;
        //this.loadCity();
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.hide = function () {
        var tw2 = egret.Tween.get(this.slog);
        tw2.to({ alpha: 0, scaleX: 0.8, scaleY: 0.8 }, 500, egret.Ease.backIn);
        var tw = egret.Tween.get(this);
        tw.wait(200);
        tw.to({ alpha: 0 }, 600);
    };
    LoadingUI.prototype.createView = function () {
        var mark;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.8);
        bg.graphics.drawRect(0, 0, 1200, 640);
        this.loadingTxt = new egret.TextField();
        this.loadingTxt.textAlign = "center";
        this.loadingTxt.width = 1200;
        this.loadingTxt.text = "loading...";
        this.loadingTxt.y = 400;
        this.slog = new Middle(Global.createBitmapByName('title_png'));
        this.slog.x = 600;
        this.slog.y = 300;
        this.addChild(bg);
        this.addChild(this.slog);
        this.addChild(this.loadingTxt);
        var tw = egret.Tween.get(bg);
        bg.alpha = 0;
        tw.to({ alpha: 1 }, 400);
        var tw2 = egret.Tween.get(this.slog);
        this.slog.alpha = 0;
        this.slog.scaleX = this.slog.scaleY = 0.6;
        tw2.wait(200);
        tw2.to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        var tw3 = egret.Tween.get(this.loadingTxt);
        this.loadingTxt.alpha = 0;
        tw3.wait(300);
        tw3.to({ alpha: 1 }, 500);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    LoadingUI.prototype.loop = function () {
        this.fps++;
        if (this.fps % 5 == 0) {
            this.count++;
            //console.log(this.count + "::" + this.loaded);
            //if(Main.isTest)this.count=200;
            if (this.count > 3) {
                this.count = 0;
            }
            var str = ".";
            for (var i = 0; i < 3; i++) {
                if (i < this.count) {
                    str += ".";
                }
                else {
                    str += " ";
                }
            }
            this.loadingTxt.text = "loading" + str;
        }
        if (this.fps >= 100)
            this.fps = 0;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map