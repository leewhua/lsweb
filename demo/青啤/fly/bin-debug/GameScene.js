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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.aw = 2300;
        _this.ah = 1533;
        _this.viewWidth = 1015;
        _this.viewHeigh = 640;
        _this.points = [{ x: 877.15, y: 281.6 }, { x: 1694.65, y: 442.55 }, { x: 582.4, y: 678.25 },
            { x: 663.95, y: 645.05 }, { x: 906.1, y: 662.1 }, { x: 1251.2, y: 699.1 }, { x: 1713.65, y: 661.1 }, { x: 709.2, y: 843.15 }, { x: 1088.15, y: 929.2 },
            { x: 1394.2, y: 843.15 }, { x: 1536.15, y: 997.2 }, { x: 625.95, y: 1152.25 }, { x: 1536.15, y: 1200.25 }];
        _this.status = 0;
        _this.sco = 0;
        _this.fullSco = 7;
        _this.lostTime = 5000;
        _this.playTime = 30000;
        _this.initAngle = null;
        _this.gammaOff = 16;
        _this.betaOff = 20;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    GameScene.prototype.eventHandler = function (event) {
        switch (event.name) {
            case 'close_help':
                console.log("close_help");
                //this.removeChild();
                break;
            case 'play_end':
                console.log("play_end");
                break;
            case 'to_shop':
                break;
        }
        console.log(event.type + ":" + event.name);
    };
    //inKo
    GameScene.prototype.play321 = function () {
        var _this1 = this;
        var sp3 = new Middle(Main.createBitmapByName('3_png'));
        var sp2 = new Middle(Main.createBitmapByName('2_png'));
        var sp1 = new Middle(Main.createBitmapByName('1_png'));
        _this1.view.addChild(sp3);
        var tw = egret.Tween.get(sp3);
        tw.to({ scaleX: 3, scaleY: 3, alpha: 0 }, 500);
        tw.call(function () {
            var tw = egret.Tween.get(sp2);
            tw.wait(500);
            _this1.view.addChild(sp2);
            tw.to({ scaleX: 3, scaleY: 3, alpha: 0 }, 500);
            tw.call(function () {
                var tw = egret.Tween.get(sp1);
                tw.wait(500);
                _this1.view.addChild(sp1);
                tw.to({ scaleX: 3, scaleY: 3, alpha: 0 }, 500);
                tw.call(function () {
                    _this1.start();
                });
            });
        });
    };
    GameScene.prototype.start = function () {
        if (this.status == 0) {
            this.sco = 0;
            this.status = 1;
            this.startTime = new Date().getTime();
            this.addEventListener(egret.Event.ENTER_FRAME, this.playLoop, this);
            this.setSco();
        }
    };
    GameScene.prototype.playLoop = function (e) {
        var time = new Date().getTime() - this.startTime;
        time = this.playTime - time;
        if (time <= 0) {
            time = 0;
        }
        if (time == 0 && this.status == 1) {
            this.showEnd();
        }
        this.timeTxt.text = this.add0(Math.floor(time / 1000));
    };
    GameScene.prototype.add0 = function (n) {
        if (n < 10) {
            return "0" + n;
        }
        else {
            return n.toString();
        }
    };
    GameScene.prototype.setSco = function () {
        if (this.scoPro && this.sco >= 1 && this.sco <= this.scoPro.length) {
            var s = Main.createBitmapByName('c-guan_png');
            var n = Math.floor(this.sco - 1);
            s.x = this.scoPro[n].x;
            s.y = this.scoPro[n].y;
            this.view.removeChild(this.scoPro[n]);
            this.scoPro[n] = s;
            this.view.addChild(s);
        }
        this.scoTxt.text = "￥" + this.sco.toString();
    };
    GameScene.prototype.koEnd = function () {
        this.status = 1;
        this.flyBar.x = 0;
        this.flyBar.y = 0;
        this.fly.gotoAndStop(1);
        this.view.addChild(this.flyBar);
        if (this.sco >= this.fullSco) {
            this.showWin();
        }
    };
    GameScene.prototype.shoot = function () {
        if (this.status == 1) {
            this.status = 2;
            this.fly.play(1);
        }
    };
    GameScene.prototype.showEnd = function () {
        this.status = 4;
        if (this.sco > 0) {
            this.showWin();
        }
        else {
            this.showLost();
        }
    };
    GameScene.prototype.showLost = function () {
        this.status = 6;
        var _this1 = this;
        var tipBg = new Middle(Main.createBitmapByName('game_lost_bg_png'));
        var tip = Main.createBitmapByName('lost-copy_png');
        var again = new Middle(Main.createBitmapByName('game_again_png'));
        again.y = tipBg.height / 2;
        tip.x = -tip.width / 2;
        tip.y = -tip.height / 2;
        Main.setBut(again);
        tipBg.scaleX = Main.scale;
        tipBg.addChild(tip);
        tipBg.addChild(again);
        this.view.addChild(tipBg);
        again.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            Main._main.dispatchEvent(new EventObj('event', 'game_again'));
        }, this);
        tipBg.alpha = 0;
        Main.zoomIn(tipBg, 0, 400, 0.6);
    };
    GameScene.prototype.showWin = function () {
        this.status = 5;
        var _this1 = this;
        var end = new Middle(Main.createBitmapByName('game_end_png'));
        var scoTxt = new egret.TextField();
        var copyTxt = new egret.TextField();
        var tipTxt = new egret.TextField();
        var receive = new Middle(Main.createBitmapByName('receive_png'));
        var share = new Middle(Main.createBitmapByName('game_share_png'));
        end.scaleX = Main.scale;
        Main.setBut(receive);
        Main.setBut(share);
        scoTxt.textAlign = "center";
        copyTxt.textAlign = "center";
        tipTxt.textAlign = "center";
        scoTxt.size = 50;
        scoTxt.textColor = 0xff4e55;
        scoTxt.x = -100;
        scoTxt.y = -56;
        scoTxt.width = 200;
        copyTxt.size = 32;
        copyTxt.textColor = 0xed1b23;
        copyTxt.width = 400;
        copyTxt.x = -200;
        copyTxt.y = 116;
        tipTxt.width = 1000;
        tipTxt.x = -500;
        tipTxt.y = 180;
        scoTxt.text = "¥" + this.sco;
        copyTxt.text = "干得漂亮";
        tipTxt.text = "恭喜您累计赢得" + this.sco + "元现金红包";
        end.addChild(scoTxt);
        end.addChild(copyTxt);
        end.addChild(tipTxt);
        this.view.addChild(end);
        this.view.addChild(receive);
        end.y = -40;
        receive.y = 230;
        share.y = 230;
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            Main._main.dispatchEvent(new EventObj('event', 'to_share'));
        }, this);
        receive.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this1.saveLuck();
        }, this);
        end.alpha = 0;
        receive.alpha = 0;
        share.alpha = 0;
        Main.zoomIn(end, 0, 400, 0.6);
        Main.zoomIn(receive, 200, 400, 0.6);
        this.receive = receive;
        this.share = share;
        this.copyTxt = copyTxt;
        this.tipTxt = tipTxt;
    };
    GameScene.prototype.showTip = function () {
        var _this1 = this;
        var tipBg = new Middle(Main.createBitmapByName('game_lost_bg_png'));
        var tip = Main.createBitmapByName('game_tip_png');
        var start = new Middle(Main.createBitmapByName('start_png'));
        start.y = tipBg.height / 2;
        tip.x = -tip.width / 2;
        tip.y = -tip.height / 2;
        Main.setBut(start);
        start.touchEnabled = true;
        tipBg.addChild(tip);
        tipBg.addChild(start);
        this.view.addChild(tipBg);
        start.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            Main.zoomOut(tipBg, 0, 400, 1.2);
            setTimeout(function () {
                _this1.play321();
            }, 600);
        }, this);
        tipBg.alpha = 0;
        Main.zoomIn(tipBg, 0, 400, 0.6);
    };
    GameScene.prototype.showFlyEnd = function () {
        var _this1 = this;
        this.flyBar.x = -this.sc.x;
        this.flyBar.y = -this.sc.y;
        this.sc.addChild(this.flyBar);
        var ko = this.checkKo(this.flyBar.x, this.flyBar.y);
        if (this.log)
            this.log.text += Math.round(this.flyBar.x) + ":" + Math.round(this.flyBar.y) + ":" + ko;
        if (ko > -1) {
            this.showKo(ko);
        }
        else {
            setTimeout(function () {
                _this1.koEnd();
            }, 600);
        }
    };
    GameScene.prototype.checkKo = function (xx, yy) {
        for (var i = 0; i < this.proList.length; i++) {
            var v = this.proList[i];
            // if(this.log) this.log.text += Math.round(this.flyBar.x) + ":" + Math.round(this.flyBar.y) + ":" + ko;
            if (xx >= v.x && xx <= (v.x + v.width) && yy >= v.y && yy <= v.y + v.height) {
                return i;
            }
        }
        return -1;
    };
    GameScene.prototype.showKo = function (ko) {
        var _this1 = this;
        this.jia1.alpha = this.winPro.alpha = 0;
        Main.zoomIn(this.winPro, 300, 500, 0.6);
        Main.zoomIn(this.jia1, 1500, 500, 0.6);
        setTimeout(function () {
            Main.zoomOut(_this1.winPro, 0, 400, 1.2);
        }, 1200);
        setTimeout(function () {
            Main.zoomOut(_this1.jia1, 0, 400, 1.2);
            _this1.koEnd();
        }, 2000);
        var v = this.proList.splice(ko, 1)[0];
        setTimeout(function () {
            v.alpha = 0;
            setTimeout(function () {
                v.alpha = 1;
                setTimeout(function () {
                    v.alpha = 0;
                    setTimeout(function () {
                        v.alpha = 1;
                        setTimeout(function () {
                            v.alpha = 0;
                            if (v.parent)
                                v.parent.removeChild(v);
                        }, 50);
                    }, 50);
                }, 50);
            }, 50);
        }, 1000);
        if (this.sco == 0) {
            this.sco = 1.5;
        }
        else if (this.sco == 1.5) {
            this.sco = 2;
        }
        else {
            this.sco += 1;
        }
        this.setSco();
        this.view.addChild(this.winPro);
        this.view.addChild(this.jia1);
    };
    GameScene.prototype.onAddToStage = function (event) {
        //初始化intro
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.winPro = new Middle(Main.createBitmapByName('game_pro_png'));
        this.jia1 = new Middle(Main.createBitmapByName('jia1_png'));
        this.jia1.y = -200;
        this.view = new egret.Sprite();
        this.sc = new egret.Sprite();
        this.view.rotation = 90;
        this.view.x = 320;
        this.view.y = 507;
        var bg = Main.createBitmapByName('bg_jpg');
        var slog = Main.createBitmapByName('copy_png');
        var logo = Main.createBitmapByName('logo_png');
        var mIco = Main.createBitmapByName('m-ico_png');
        var countDown = Main.createBitmapByName('count-down_png');
        this.aw = bg.width;
        this.ah = bg.height;
        this.setSc(0, 0);
        this.scoTxt = new egret.TextField();
        this.scoTxt.textColor = 0xffd000;
        this.scoTxt.size = 35;
        this.scoTxt.textAlign = "left";
        this.scoTxt.width = 100;
        this.setSco();
        this.timeTxt = new egret.BitmapText();
        this.timeTxt.font = RES.getRes("count_font_fnt");
        this.timeTxt.text = Math.floor(this.playTime / 1000).toString();
        mIco.x = -482;
        mIco.y = -294;
        this.scoTxt.x = -440;
        this.scoTxt.y = -291;
        logo.x = 356;
        logo.y = -317;
        //logo.scaleX = logo.scaleY=0.6;
        this.timeTxt.x = 410;
        this.timeTxt.y = -208;
        countDown.x = 410;
        countDown.y = -165;
        slog.x = 350;
        slog.y = 212;
        var star = Main.createBitmapByName('game_star_png');
        var overBg = Main.createBitmapByName('game_over_png');
        overBg.scaleX = overBg.scaleY = 2;
        overBg.x = -507;
        overBg.y = -320;
        star.x = -44;
        star.y = -44;
        this.flyBar = new egret.Sprite();
        this.fly = Main.createMc('fly_json', 'fly_png', 'fly');
        this.fly.addEventListener(egret.Event.COMPLETE, this.showFlyEnd, this);
        this.fly.x = -1;
        this.fly.y = -59;
        this.flyBar.addChild(this.fly);
        this.addChild(this.view);
        this.view.addChild(this.sc);
        this.sc.addChild(bg);
        this.view.addChild(this.flyBar);
        this.view.addChild(overBg);
        this.view.addChild(slog);
        this.view.addChild(logo);
        this.view.addChild(mIco);
        this.view.addChild(countDown);
        this.view.addChild(this.scoTxt);
        this.view.addChild(this.timeTxt);
        this.view.addChild(star);
        this.proList = [];
        this.prosIn = Main.getArrayItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 7);
        this.scoPro = [];
        console.log(this.prosIn);
        for (var i = 0; i < this.prosIn.length; i++) {
            var ii = this.prosIn[i];
            var v = Main.createBitmapByName('p' + (ii + 1) + '_png');
            v.x = this.points[ii].x;
            v.y = this.points[ii].y + 20;
            this.sc.addChild(v);
            this.proList.push(v);
            var s = Main.createBitmapByName('g-guan_png');
            s.x = 150 + i * 30 - this.view.y;
            s.y = 20 - this.view.x;
            this.view.addChild(s);
            this.scoPro.push(s);
        }
        //this.sc.scaleX = this.sc.scaleY=0.6;
        //this.sc.x *= 0.6;
        //this.sc.y *= 0.6;
        this.view.touchEnabled = true;
        this.view.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.shoot();
        }, this);
        console.log('game show');
        var _this1 = this;
        setTimeout(function () {
            _this1.showTip();
            //_this1.play321();
        }, 600);
        this.log = new egret.TextField();
        this.log.width = 1000;
        this.log.x = -500;
        this.log.y = -200;
        //this.view.addChild(this.log);
        this.log.text = '000000';
        this.initMotion();
    };
    GameScene.prototype.initMotion = function () {
        if (window['DeviceMotionEvent']) {
            var _this1 = this;
            window.addEventListener("deviceorientation", function (event) {
                _this1.deviceorientationHandler(event);
            }, true);
        }
        else {
        }
    };
    GameScene.prototype.deviceorientationHandler = function (event) {
        // var alpha=event.alpha; 
        var beta = event.beta;
        var gamma = event.gamma;
        if (this.status == 1 || this.status == 2) {
            if (this.initAngle == null) {
                this.initAngle = { beta: beta, gamma: gamma };
            }
            else {
                this.setSc((this.initAngle.beta - beta) % 360, (this.initAngle.gamma - gamma) % 360);
            }
        }
        //gamma上下
        //beta左右
    };
    GameScene.prototype.setSc = function (beta, gamma) {
        var sx = beta / this.betaOff;
        var sy = gamma / this.gammaOff;
        sx = Math.min(sx, 1);
        sx = Math.max(sx, -1);
        sy = Math.min(sy, 1);
        sy = Math.max(sy, -1);
        var ox = (this.aw - this.viewWidth) / 2;
        var oy = (this.ah - this.viewHeigh) / 2;
        this.sc.x = this.aw / -2 + ox * sx;
        this.sc.y = this.ah / -2 + oy * sy;
        //if(this.log) this.log.text = Math.round(sx * 100) + ":" + Math.round(sy * 100);
    };
    GameScene.prototype.saveOk = function () {
        var user = Main.user;
        user.c2times = user.c2times - 1;
        Main.zoomOut(this.receive, 0, 400, 1.2);
        this.view.addChild(this.share);
        Main.zoomIn(this.share, 600, 400, 0.6);
        this.copyTxt.text = "领取成功";
        this.tipTxt.text = "红包将于24小时内到账";
        //Main._main.dispatchEvent(new EventObj('event','to_map'));
    };
    GameScene.prototype.saveLuck = function () {
        var _this1 = this;
        if (Main.isTest) {
            _this1.saveOk();
            return;
        }
        $.ajax({
            url: Main.api,
            data: { ticket: Main.status_ticket, desc: "挑战红包", amount: this.sco },
            success: function (data) {
                if (data.result == 'success') {
                    var more = data.more;
                    if (more.result == 'success') {
                        if (more.reason && more.reason.indexOf('failedtransfer') == 0) {
                            Main.showLost(31);
                        }
                        else {
                            Main.status_ticket = more.ticket;
                            _this1.saveOk();
                        }
                    }
                    else {
                        Main.showLost(2);
                    }
                }
                else {
                    Main.showLost(2);
                }
            },
            error: function () {
                Main.showLost(404);
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    Main.showLost(404);
                }
            }
        });
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map