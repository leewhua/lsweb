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
        }
        else if (data == 2) {
            url = "resource/assets/error/error_web.png";
        }
        else if (data == 3) {
            url = "resource/assets/error/error_code.png";
        }
        var bg = new CustomImage(url, true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = (StageUtils.SH - bg.height >> 1) - 100;
        });
        this.addChild(bg);
    };
    return ErrorPop;
}(PopView));
__reflect(ErrorPop.prototype, "ErrorPop");
//# sourceMappingURL=ErrorPop.js.map