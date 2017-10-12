var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ErrorPop = (function (_super) {
    __extends(ErrorPop, _super);
    function ErrorPop() {
        return _super.call(this) || this;
    }
    ErrorPop.prototype.setData = function (data) {
        if (data === void 0) { data = 1; }
        var url = "";
        if (data == 1) {
            url = "resource/assets/error/is_get.png";
            var btnGame = new CustomImage("resource/assets/error/btn_game.png", true, function () {
                btnGame.x = StageUtils.SW - btnGame.width >> 1;
                btnGame.y = (StageUtils.SH - btnGame.height >> 1) + 60;
            });
        }
        else if (data == 2) {
            url = "resource/assets/error/web_error.png";
        }
        else if (data == 3) {
            url = "resource/assets/error/code_error.png";
        }
        else if (data == 4) {
            url = "resource/assets/error/limit_error.png";
        }
        var bg = new CustomImage(url, true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
    };
    ErrorPop.prototype.gameHandler = function () {
        PopManager.hidePop("ErrorPop");
        Main.instance.loadRes();
    };
    return ErrorPop;
}(PopView));
__reflect(ErrorPop.prototype, "ErrorPop");
//# sourceMappingURL=ErrorPop.js.map