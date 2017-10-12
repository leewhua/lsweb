var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var JfBar = (function (_super) {
    __extends(JfBar, _super);
    function JfBar() {
        var _this = _super.call(this) || this;
        _this.sco = 1;
        _this.scaleY = Main.scale;
        _this.scoTxt = new egret.TextField();
        var nameTxt = new egret.TextField();
        nameTxt.size = 26;
        nameTxt.textAlign = "right";
        nameTxt.textColor = 0xffffff;
        nameTxt.width = 200;
        nameTxt.y = 20;
        nameTxt.x = -310;
        _this.scoTxt.size = 26;
        _this.scoTxt.textAlign = "right";
        _this.scoTxt.textColor = 0xffffff;
        _this.scoTxt.width = 200;
        _this.scoTxt.y = 52;
        _this.scoTxt.x = -310;
        var faceBg = new FaceBar();
        _this.addChild(faceBg);
        _this.addChild(nameTxt);
        _this.addChild(_this.scoTxt);
        _this.x = 1180;
        _this.y = 20;
        faceBg.scaleX = faceBg.scaleY = 100 / 128;
        faceBg.x = -100;
        faceBg.loadFace(Api.user.headimgurl);
        nameTxt.text = Api.user.nickname;
        _this.reSetSco();
        return _this;
    }
    JfBar.prototype.reSetSco = function () {
        // this.scoTxt.text=GameInfo.sco+'积分'
    };
    return JfBar;
}(egret.Sprite));
__reflect(JfBar.prototype, "JfBar");
//# sourceMappingURL=JfBar.js.map