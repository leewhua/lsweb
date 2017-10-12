var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SharePop = (function (_super) {
    __extends(SharePop, _super);
    function SharePop() {
        return _super.call(this) || this;
    }
    SharePop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var url = "";
        if (data) {
            url = "resource/assets/asyn/end_no.png";
        }
        else {
            url = "resource/assets/asyn/share.png";
        }
        var bg = new CustomImage(url, true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 30;
        });
        this.addChild(bg);
    };
    return SharePop;
}(PopView));
__reflect(SharePop.prototype, "SharePop");
//# sourceMappingURL=SharePop.js.map