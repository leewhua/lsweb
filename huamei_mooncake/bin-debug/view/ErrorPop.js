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
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage(data.url, true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.addChild(bg);
        if (data.qr) {
            this.htmlCode = new QRCode("resource/assets/asyn/pay_send_ok_code.png");
            this.htmlCode.setPosition(data.x, data.y, 125, 127);
            this.htmlCode.showHtmlCode();
        }
    };
    return ErrorPop;
}(PopView));
__reflect(ErrorPop.prototype, "ErrorPop");
//# sourceMappingURL=ErrorPop.js.map