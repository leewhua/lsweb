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
var Paper = (function (_super) {
    __extends(Paper, _super);
    function Paper(i) {
        var _this = _super.call(this) || this;
        _this.index = i;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Paper.prototype.onAddToStage = function (event) {
        //this.index = Math.floor(Math.random()*4);
        this.paper = new egret.Sprite();
        var down = Main.createBitmapByRes("hb_json", "p-down");
        var middle = Main.createBitmapByRes("hb_json", "p-m");
        var up = Main.createBitmapByRes("hb_json", "p-up");
        var up = Main.createBitmapByRes("hb_json", "p-up");
        var money = new egret.Sprite(); //= Main.createBitmapByRes("money_json",this.index);
        var n;
        var ss = this.index.split("");
        var xx = -26;
        for (var i = 0; i < ss.length; i++) {
            var s = ss[i];
            if (s == ".")
                s = "10";
            n = Main.createBitmapByRes("font_json", 'b' + s);
            n.x = xx;
            if (s == "10") {
                xx += 42;
            }
            else if (s == "1") {
                xx += 80;
            }
            else {
                xx += 90;
            }
            money.addChild(n);
        }
        var yuan;
        if (Main.award.type == "jifen") {
            yuan = Main.createBitmapByRes("sc_json", "jf");
            yuan.x = xx;
            yuan.y = 20;
        }
        else {
            yuan = Main.createBitmapByRes("sc_json", "yuan");
            yuan.x = xx;
            yuan.y = 20;
        }
        money.addChild(yuan);
        this.paper.y = 260; //50
        this.paper.x = 50;
        up.y = 176;
        money.x = 60 + (380 - money.width) / 2;
        money.y = 60;
        this.paper.addChild(middle);
        this.paper.addChild(money);
        this.addChild(down);
        this.addChild(this.paper);
        this.addChild(up);
        down.x -= 260;
        down.y -= 420;
        this.paper.x -= 260;
        this.paper.y -= 420;
        up.x -= 260;
        up.y -= 420;
    };
    Paper.prototype.play = function () {
        var tw = egret.Tween.get(this.paper);
        tw.to({ "y": 50 - 420 }, 300);
    };
    return Paper;
}(egret.Sprite));
__reflect(Paper.prototype, "Paper");
//# sourceMappingURL=Paper.js.map