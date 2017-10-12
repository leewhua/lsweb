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
var MineBar = (function (_super) {
    __extends(MineBar, _super);
    function MineBar() {
        var _this = _super.call(this) || this;
        _this.sco = 1;
        _this.scaleY = Main.scale;
        _this.maskShape = new egret.Shape();
        _this.maskShape.graphics.beginFill(0, 1);
        _this.maskShape.graphics.drawRect(0, 0, 298, 28);
        var nameTxt = new egret.TextField();
        nameTxt.size = 26;
        nameTxt.textAlign = "left";
        nameTxt.textColor = 0x0;
        nameTxt.width = 200;
        nameTxt.y = 10;
        nameTxt.x = 150;
        nameTxt.text = Api.user.nickname;
        var lineBg = Global.createBitmapByName('p_line_bg_png');
        var line = Global.createBitmapByName('p_line_png');
        var faceBg = new FaceBar();
        lineBg.scaleX = -1;
        lineBg.x = 418;
        lineBg.y = 45;
        _this.maskShape.x = line.x = 112;
        _this.maskShape.y = line.y = 52;
        _this.addChild(lineBg);
        _this.addChild(line);
        _this.addChild(faceBg);
        _this.addChild(_this.maskShape);
        _this.addChild(nameTxt);
        line.mask = _this.maskShape;
        _this.x = 20;
        _this.y = 20;
        faceBg.loadFace(Api.user.headimgurl);
        return _this;
    }
    MineBar.prototype.hit = function (k, g) {
        k = 3 - k;
        var damage = GameInfo.gunData[g].damage;
        console.log('2L', g, GameInfo.gunData[g], damage[k]);
        this.sco -= damage[k] / 100;
        if (this.sco <= 0) {
            this.sco = 0;
        }
        this.maskShape.scaleX = this.sco * 0.95 + 0.05;
        if (this.sco == 0) {
            this.dispatchEvent(new EventObj('event', 'lost', true));
        }
    };
    return MineBar;
}(egret.Sprite));
__reflect(MineBar.prototype, "MineBar");
//# sourceMappingURL=MineBar.js.map