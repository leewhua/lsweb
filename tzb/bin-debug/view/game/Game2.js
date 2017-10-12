var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game2 = (function (_super) {
    __extends(Game2, _super);
    function Game2() {
        var _this = _super.call(this) || this;
        _this.isover = false;
        var bg = Global.createBitmapByName("game_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height >> 1;
        _this.addChild(bg);
        var title = Global.createBitmapByName("game2_title_png");
        title.x = (StageUtils.SW - title.width >> 1) + 10;
        title.y = -title.height;
        _this.addChild(title);
        egret.Tween.get(title).to({ y: 20 }, 800, egret.Ease.backOut);
        var face = Global.createBitmapByName("game_face_png");
        face.x = StageUtils.SW - face.width >> 1;
        //face.y = (StageUtils.SH - face.height >> 1);
        face.y = (StageUtils.SH - face.height >> 1) + face.height;
        face.anchorOffsetY = face.height;
        _this.addChild(face);
        var fy = face.y;
        egret.Tween.get(face, { loop: true }).to({ y: fy + 0, scaleY: 0.9 }, 100).to({ y: fy, scaleY: 1 }, 100);
        var btn = Global.createBitmapByName("game2_btn_up_png");
        btn.x = StageUtils.SW - btn.width >> 1;
        btn.y = StageUtils.SH - btn.height - 100;
        _this.addChild(btn);
        _this.btn = btn;
        Global.setBut(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.btnTouchHandler, _this);
        btn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.btnTouchEndHandler, _this);
        btn.addEventListener(egret.TouchEvent.TOUCH_END, _this.btnTouchEndHandler, _this);
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.btnTouchEndHandler, _this);
        var tips = Global.createBitmapByName("game2_tips_png");
        tips.x = StageUtils.SW - tips.width >> 1;
        tips.y = StageUtils.SH - tips.height - 40;
        _this.addChild(tips);
        _this.tips = tips;
        var btnHelp = Global.createBitmapByName("btn_htlp_png");
        btnHelp.x = 25;
        btnHelp.y = 270;
        _this.addChild(btnHelp);
        Global.setBut(btnHelp);
        btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.helpTouchHandler, _this);
        _this.initDanmuList();
        _this.timeContainer = new egret.DisplayObjectContainer();
        _this.addChild(_this.timeContainer);
        _this.timer = new egret.Timer(1000, 10);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerHandler, _this);
        _this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerCompleteHandler, _this);
        _this.lasttime = 0;
        return _this;
    }
    Game2.prototype.btnTouchHandler = function () {
        this.btn.texture = RES.getRes("game2_btn_down_png");
        this.btn.x += 11;
        this.btn.y += 14;
        this.tips.visible = false;
        this.showTime();
        this.timer.start();
        this.lasttime = 0;
        this.isover = false;
        //开始录音
        var weixin = eval("wx");
        weixin.startRecord();
    };
    Game2.prototype.btnTouchEndHandler = function () {
        this.btn.texture = RES.getRes("game2_btn_up_png");
        this.btn.x = StageUtils.SW - this.btn.width >> 1;
        this.btn.y = StageUtils.SH - this.btn.height - 100;
        this.tips.visible = false;
        this.timeContainer.removeChildren();
        this.timer.reset();
        if (!this.isover) {
            this.isover = true;
            this.stopRecord();
        }
    };
    Game2.prototype.helpTouchHandler = function () {
        PopManager.showPop("HelpPop");
    };
    Game2.prototype.showTime = function () {
        this.timeContainer.removeChildren();
        var bg = Global.createBitmapByName("time_bg_png");
        bg.x = 199;
        bg.y = 929;
        this.timeContainer.addChild(bg);
        this.num1 = Global.createBitmapByName("time_0_png");
        this.num1.x = 370 - this.num1.width;
        this.num1.y = 960;
        this.timeContainer.addChild(this.num1);
        this.num2 = Global.createBitmapByName("time_0_png");
        this.num2.x = 391 - this.num2.width;
        this.num2.y = 960;
        this.timeContainer.addChild(this.num2);
    };
    Game2.prototype.timerHandler = function () {
        this.lasttime++;
        var shi = Math.floor(this.lasttime / 10);
        var ge = this.lasttime % 10;
        this.num1.texture = RES.getRes("time_" + shi + "_png");
        this.num1.x = 370 - this.num1.width;
        this.num2.texture = RES.getRes("time_" + ge + "_png");
        this.num2.x = 391 - this.num2.width;
    };
    Game2.prototype.timerCompleteHandler = function () {
        if (!this.isover) {
            this.isover = true;
            //
            this.stopRecord();
        }
    };
    Game2.prototype.translateResult = function (str) {
        var _this = this;
        if (str) {
            this.play();
        }
        else {
            var bg = Global.createBitmapByName("game2_tips_2_png");
            bg.x = StageUtils.CW;
            bg.y = StageUtils.CH;
            this.addChild(bg);
            bg.anchorOffsetX = bg.width >> 1;
            bg.anchorOffsetY = bg.height >> 1;
            bg.scaleX = bg.scaleY = 0;
            bg.alpha = 0;
            egret.Tween.get(bg).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut).wait(2000).call(function () {
                _this.removeChild(bg);
            });
        }
    };
    Game2.prototype.stopRecord = function () {
        var self = this;
        var weixin = eval("wx");
        weixin.stopRecord({
            success: function (res) {
                var localId = res.localId;
                weixin.translateVoice({
                    localId: localId,
                    isShowProgressTips: 1,
                    success: function (res) {
                        self.translateResult(res.translateResult);
                    }
                });
            }
        });
    };
    return Game2;
}(GameBaseView));
__reflect(Game2.prototype, "Game2");
//# sourceMappingURL=Game2.js.map