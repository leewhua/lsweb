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
var EnemyBar = (function (_super) {
    __extends(EnemyBar, _super);
    function EnemyBar() {
        var _this = _super.call(this) || this;
        _this.sco = 1;
        _this.scaleY = Main.scale;
        _this.maskShape = new egret.Shape();
        _this.maskShape.graphics.beginFill(0, 1);
        _this.maskShape.graphics.drawRect(0, 0, -298, 28);
        var lineBg = Global.createBitmapByName('p_line_bg_png');
        var line = Global.createBitmapByName('p_line_png');
        _this.face = new FaceBar();
        var nameTxt = new egret.TextField();
        nameTxt.size = 26;
        nameTxt.textAlign = "right";
        nameTxt.textColor = 0x0;
        nameTxt.width = 200;
        nameTxt.y = 10;
        nameTxt.x = -350;
        nameTxt.text = "****";
        lineBg.x = -404;
        lineBg.y = 45;
        line.x = -397;
        _this.maskShape.y = line.y = 52;
        _this.maskShape.x = line.x + 298;
        _this.face.x = -136;
        _this.addChild(lineBg);
        _this.addChild(line);
        _this.addChild(_this.face);
        _this.addChild(_this.maskShape);
        _this.addChild(nameTxt);
        line.mask = _this.maskShape;
        _this.x = 1180;
        _this.y = 20;
        _this.search();
        return _this;
    }
    EnemyBar.prototype.hit = function (k, g) {
        k = 3 - k;
        var damage = GameInfo.gunData[g].damage;
        console.log(g, GameInfo.gunData[g], damage[k]);
        this.sco -= damage[k] / 100;
        if (this.sco <= 0) {
            this.sco = 0;
        }
        this.maskShape.scaleX = this.sco * 0.95 + 0.05;
        if (this.sco == 0 && GameInfo.hb == 0) {
            this.dispatchEvent(new EventObj('event', 'win', true));
        }
    };
    EnemyBar.prototype.search = function () {
        var ran = Math.floor(Math.random() * 60) + 1;
        //ran=0.8;
        //_this1.face.loadFace("http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0");
        this.face.loadFace("resource/face/" + ran + ".jpg");
        var _this1 = this;
        setTimeout(function () {
        }, 2000);
    };
    return EnemyBar;
}(egret.Sprite));
__reflect(EnemyBar.prototype, "EnemyBar");
//# sourceMappingURL=EnemyBar.js.map