var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game3 = (function (_super) {
    __extends(Game3, _super);
    function Game3() {
        var _this = _super.call(this) || this;
        _this.isMove = false;
        var bg = Global.createBitmapByName("game_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        _this.addChild(bg);
        _this.light = Global.createBitmapByName("game3_bg_light_png");
        _this.light.x = StageUtils.SW - _this.light.width >> 1;
        _this.light.y = StageUtils.SH - _this.light.height >> 1;
        _this.addChild(_this.light);
        _this.light.visible = false;
        var title = Global.createBitmapByName("game3_title_png");
        title.x = (StageUtils.SW - title.width >> 1) + 10;
        title.y = -title.height;
        _this.addChild(title);
        egret.Tween.get(title).to({ y: 20 }, 800, egret.Ease.backOut);
        var tips = Global.createBitmapByName("game3_tips_png");
        tips.x = StageUtils.SW - tips.width >> 1;
        tips.y = StageUtils.SH - tips.height - 240;
        _this.addChild(tips);
        _this.tips = tips;
        var btnHelp = Global.createBitmapByName("btn_htlp_png");
        btnHelp.x = 25;
        btnHelp.y = StageUtils.SH - btnHelp.height - 25;
        _this.addChild(btnHelp);
        Global.setBut(btnHelp);
        btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.helpTouchHandler, _this);
        var yezi = Global.createBitmapByName("game3_yezi_png");
        yezi.x = (StageUtils.SW - yezi.width >> 1) - 45;
        yezi.y = StageUtils.SH - yezi.height >> 1;
        _this.addChild(yezi);
        _this.yezi = yezi;
        egret.Tween.get(_this.yezi, { loop: true }).to({ y: yezi.y + 10 }, 1000).to({ y: yezi.y }, 1000);
        var barBg = Global.createBitmapByName("game3_bar_bg_png");
        barBg.x = 34;
        barBg.y = StageUtils.SH - barBg.height >> 1;
        _this.addChild(barBg);
        _this.bar = Global.createBitmapByName("game3_bar_png");
        _this.bar.x = 34;
        _this.bar.y = StageUtils.SH - _this.bar.height >> 1;
        _this.addChild(_this.bar);
        var maskBar = Global.createBitmapByName("game3_bar_png");
        maskBar.x = _this.bar.x;
        maskBar.y = _this.bar.y + 440;
        _this.addChild(maskBar);
        _this.bar.mask = maskBar;
        _this.maskBar = maskBar;
        _this.light1 = Global.createBitmapByName("game3_light_png");
        _this.light1.x = StageUtils.CW;
        _this.light1.y = StageUtils.SH - _this.light1.height - 10 + _this.light1.height / 2;
        _this.light1.anchorOffsetX = _this.light1.width >> 1;
        _this.light1.anchorOffsetY = _this.light1.height >> 1;
        _this.addChild(_this.light1);
        _this.light1.visible = false;
        var chuizi = Global.createBitmapByName("game3_chuizi_png");
        chuizi.x = 560;
        chuizi.y = 585;
        chuizi.anchorOffsetX = chuizi.width - 10;
        chuizi.anchorOffsetY = chuizi.height - 10;
        _this.addChild(chuizi);
        _this.chuizi = chuizi;
        // egret.Tween.get(this.chuizi,{loop:true}).to({y:590},500).to({y:585},500);
        var btnStart = Global.createBitmapByName("btn_start_png");
        btnStart.x = StageUtils.SW - btnStart.width >> 1;
        btnStart.y = StageUtils.SH - btnStart.height - 105;
        _this.addChild(btnStart);
        Global.setBut(btnStart);
        btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.btnTouchHandler, _this);
        btnStart.addEventListener(egret.TouchEvent.TOUCH_END, _this.btnTouchEndHandler, _this);
        btnStart.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.btnTouchEndHandler, _this);
        btnStart.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.btnTouchEndHandler, _this);
        _this.btnStart = btnStart;
        return _this;
    }
    Game3.prototype.btnTouchHandler = function () {
        this.light1.visible = true;
        this.light1.scaleX = this.light1.scaleY = 0.3;
        this.light1.alpha = 0.3;
        egret.Tween.get(this.light1, { loop: true }).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 800).to({ scaleX: 0.3, scaleY: 0.3, alpha: 0.3 }, 500);
        // if(!this.isMove)
        // {
        // 	this.isMove = true;
        // 	egret.Tween.get(this.maskBar).to({y:this.bar.y},3000).call(()=>{
        // 		this.openYezi();
        // 	});
        // }
        egret.Tween.get(this.maskBar, { loop: true }).to({ y: this.bar.y }, 1000).to({ y: this.bar.y + 440 }, 1000);
    };
    Game3.prototype.btnTouchEndHandler = function () {
        var _this = this;
        egret.Tween.removeTweens(this.light1);
        this.light1.visible = false;
        // egret.Tween.removeTweens(this.maskBar);
        // egret.Tween.get(this.maskBar).to({y:this.bar.y + 440},1000).call(()=>{
        // 	this.isMove = false;
        // });
        egret.Tween.removeTweens(this.maskBar);
        if (this.maskBar.y < this.bar.y + 150) {
            //成功
            egret.Tween.get(this.chuizi).to({ alpha: 1, rotation: 30 }, 400, egret.Ease.circOut).to({ rotation: 0 }, 200, egret.Ease.backIn).call(function () {
                _this.showOpenYezi();
            });
        }
        else {
            //失败
            egret.Tween.get(this.maskBar).to({ y: this.bar.y + 440 }, 500);
        }
    };
    Game3.prototype.helpTouchHandler = function () {
        PopManager.showPop("HelpPop");
    };
    Game3.prototype.openYezi = function () {
        var _this = this;
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnTouchHandler, this);
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchEndHandler, this);
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.btnTouchEndHandler, this);
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.btnTouchEndHandler, this);
        var chuizi = Global.createBitmapByName("game3_chuizi_png");
        chuizi.x = 560;
        chuizi.y = 585;
        chuizi.anchorOffsetX = chuizi.width - 10;
        chuizi.anchorOffsetY = chuizi.height - 10;
        this.addChild(chuizi);
        // chuizi.alpha = 0;
        egret.Tween.get(chuizi).to({ alpha: 1, rotation: 30 }, 400, egret.Ease.circOut).to({ rotation: 0 }, 200, egret.Ease.backIn).call(function () {
            _this.showOpenYezi();
        });
    };
    Game3.prototype.showOpenYezi = function () {
        var _this = this;
        egret.Tween.removeTweens(this.yezi);
        var tx = this.yezi.x;
        var ty = this.yezi.y;
        egret.Tween.get(this.yezi).to({ x: tx + 5 }, 100)
            .to({ x: tx }, 100)
            .to({ y: ty + 5 }, 100)
            .to({ y: ty }, 100);
        this.light.visible = true;
        var liefeng = Global.createBitmapByName("game3_liefeng_png");
        liefeng.x = 195;
        liefeng.y = 290;
        this.addChild(liefeng);
        liefeng.alpha = 0;
        var light = Global.createBitmapByName("game3_light1_png");
        light.x = 20;
        light.y = 235;
        this.addChild(light);
        egret.Tween.get(liefeng).wait(0).to({ alpha: 1 }, 100).wait(500).call(function () {
            _this.play();
        });
    };
    return Game3;
}(GameBaseView));
__reflect(Game3.prototype, "Game3");
//# sourceMappingURL=Game3.js.map