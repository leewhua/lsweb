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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.inLuck = false;
        _this.inHelp = false;
        _this.inPlay = false;
        _this.ballX = 320;
        _this.ballY = 680;
        _this.delayCall = false;
        _this.saveOk = false;
        _this.flashCount = 0;
        _this.flashIndex = 1;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    Scene.prototype.eventHandler = function (event) {
        switch (event.name) {
            case 'close_help':
                console.log("close_help");
                //this.removeChild();
                break;
            case 'play_end':
                console.log("play_end");
                this.end = new End();
                this.addChild(this.end);
                break;
            case 'to_shop':
                break;
        }
        console.log(event.type + ":" + event.name);
    };
    Scene.prototype.onAddToStage = function (event) {
        //初始化intro
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = Main.createBitmapByName(Main.product_type + "-bg_jpg");
        var men = Main.createBitmapByName("men_png");
        var flash = new egret.Sprite();
        var w1 = Main.createBitmapByName("wang1_png");
        var w2 = Main.createBitmapByName("wang2_png");
        var w3 = Main.createBitmapByName("wang3_png");
        var w4 = Main.createBitmapByName("wang4_png");
        this.w1 = w1;
        this.w2 = w2;
        this.w3 = w3;
        this.w4 = w4;
        men.x = 75;
        men.y = 212;
        w1.x = 85;
        w1.y = 218;
        w2.x = 85;
        w2.y = 302;
        w3.x = 325;
        w3.y = 218;
        w4.x = 325;
        w4.y = 300;
        this.ballShade = new Middle(Main.createBitmapByName('ball-shade_png'));
        this.ballShade.x = 320;
        this.ballShade.y = 760;
        this.ballShade.alpha = 0;
        this.point = Main.createMc('point_json', 'point_png', 'point');
        this.point.alpha = 0;
        this.point.play(-1);
        this.start = new Middle(Main.createBitmapByName("start_png"));
        this.home_title = new Middle(Main.createBitmapByName(Main.product_type + "-home-title_png"));
        this.help_btn = new Middle(Main.createBitmapByName("help-btn_png"));
        this.tips = new Tips();
        this.player = new Player();
        this.keeper = new Keeper();
        this.ball = new Ball();
        this.tips.x = 320;
        this.tips.y = 920;
        this.keeper.x = 320;
        this.keeper.y = 475;
        this.player.x = 320;
        this.player.y = 843;
        this.ball.initXY(320, 680);
        this.start.x = 320;
        this.start.y = 868;
        this.home_title.x = 320;
        this.home_title.y = 680;
        this.help_btn.x = 320;
        this.help_btn.y = 960;
        this.addChild(bg);
        this.addChild(flash);
        this.addChild(w1);
        this.addChild(w2);
        this.addChild(w3);
        this.addChild(w4);
        this.addChild(men);
        this.addChild(this.point);
        this.addChild(this.keeper);
        this.addChild(this.home_title);
        this.addChild(this.start);
        this.addChild(this.help_btn);
        this.addChild(this.tips);
        //help-btn.png
        //eval("playCb(" + this.playYao+","+this+")");
        this.start.touchEnabled = true;
        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.startPlay();
        }, this);
        this.help_btn.touchEnabled = true;
        this.help_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.showHelp();
        }, this);
        Main.setBut(this.start);
        w1.touchEnabled = true;
        w1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.shoot(0);
        }, this);
        w2.touchEnabled = true;
        w2.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.shoot(1);
        }, this);
        w3.touchEnabled = true;
        w3.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.shoot(2);
        }, this);
        w4.touchEnabled = true;
        w4.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.shoot(3);
        }, this);
    };
    Scene.prototype.ballFly = function (ii) {
        var time = 500;
        var tw, tw2;
        var _this1 = this;
        var ss = 0.6;
        this.ball.initXY(320, 680);
        this.ball.scaleX = this.ball.scaleY = 1;
        if (ii == 0) {
            tw = egret.Tween.get(this.ball);
            tw.wait(100);
            tw.to({ scaleX: ss, scaleY: ss }, time);
            tw.call(function () {
                _this1.playEnd();
            });
            tw2 = egret.Tween.get(this.ball);
            tw2.wait(100);
            tw2.to({ sx: 180, sy: 260 }, time, egret.Ease.backOut);
        }
        else if (ii == 1) {
            tw = egret.Tween.get(this.ball);
            tw.wait(100);
            tw.to({ scaleX: ss, scaleY: ss }, time);
            tw.call(function () {
                _this1.playEnd();
            });
            tw2 = egret.Tween.get(this.ball);
            tw2.wait(100);
            tw2.to({ sx: 140, sy: 400 }, time, egret.Ease.backOut);
        }
        else if (ii == 2) {
            tw = egret.Tween.get(this.ball);
            tw.wait(100);
            tw.to({ scaleX: ss, scaleY: ss }, time);
            tw.call(function () {
                _this1.playEnd();
            });
            tw2 = egret.Tween.get(this.ball);
            tw2.wait(100);
            tw2.to({ sx: 450, sy: 270 }, time, egret.Ease.backOut);
        }
        else if (ii == 3) {
            tw = egret.Tween.get(this.ball);
            tw.wait(100);
            tw.to({ scaleX: ss, scaleY: ss }, time);
            tw.call(function () {
                _this1.playEnd();
            });
            tw2 = egret.Tween.get(this.ball);
            tw2.wait(100);
            tw2.to({ sx: 480, sy: 410 }, time, egret.Ease.backOut);
        }
        tw = egret.Tween.get(this.ballShade);
        tw.to({ scaleX: 0.6, scaleY: 0.6, alpha: 0 }, time);
    };
    Scene.prototype.playEnd = function () {
        //this.showEnd();
        this.ball.boom();
        var _this1 = this;
        setTimeout(function () {
            _this1.delayCall = true;
            _this1.showEnd();
        }, 2000);
        if (Main.win) {
            this.player.win();
            this.tips.win(200);
        }
        else {
            this.player.lost();
            this.tips.lost(200);
        }
    };
    Scene.prototype.shoot = function (ii) {
        this.delayCall = false;
        this.saveOk = false;
        if (this.point.parent)
            this.removeChild(this.point);
        if (!this.inPlay) {
            return false;
        }
        this.inPlay = false;
        if (!Main.win) {
            this.keeperPlay(ii);
        }
        else {
            this.keeperPlay(this.getOther(ii));
        }
        this.ballFly(ii);
        this.player.shoot();
        this.saveLuck();
        return true;
    };
    Scene.prototype.getOther = function (ii) {
        var l = [0, 1, 2, 3];
        l.splice(ii, 1);
        var r = Math.floor(l.length * Math.random());
        return l[r];
    };
    Scene.prototype.keeperPlay = function (ii) {
        var _this1 = this;
        setTimeout(function () {
            if (ii == 0) {
                _this1.keeper.left_top();
            }
            else if (ii == 1) {
                _this1.keeper.left_bottom();
            }
            else if (ii == 2) {
                _this1.keeper.right_top();
            }
            else if (ii == 3) {
                _this1.keeper.right_bottom();
            }
        }, 300);
    };
    Scene.prototype.startPlay = function () {
        Main.zoomOut(this.start, 0, 400, 1.2);
        Main.zoomOut(this.home_title, 100, 400, 1.2);
        Main.zoomOut(this.help_btn, 200, 400, 1.2);
        //this.removeChild(this.start);
        //this.removeChild(this.home_title);
        //this.removeChild(this.help_btn);
        this.addChild(this.ballShade);
        this.addChild(this.ball);
        this.addChild(this.player);
        this.ball.alpha = 0;
        this.player.alpha = 0;
        Main.zoomIn(this.ballShade, 600, 400, 0.6);
        Main.zoomIn(this.ball, 600, 400, 0.6);
        Main.zoomIn(this.player, 600, 400, 0.6);
        this.tips.wating(700);
        var _this1 = this;
        this.inPlay = true;
        this.flash();
    };
    Scene.prototype.flash = function () {
        var mm = this['w' + this.flashIndex];
        this.flashCount = 0;
        this.fadeOut(mm);
        this.point.alpha = 1;
        this.point.x = mm.x + (mm.width - 140) / 2;
        this.point.y = mm.y + (mm.height - 140) / 2;
    };
    Scene.prototype.startFlash = function () {
        this.point.alpha = 0;
    };
    Scene.prototype.flashNext = function () {
        this.flashIndex++;
        if (this.flashIndex > 4)
            this.flashIndex = 1;
        this.flash();
    };
    Scene.prototype.fadeIn = function (m) {
        var _this1 = this;
        var tw = egret.Tween.get(m);
        tw.to({ alpha: 1 }, 200);
        tw.call(function () {
            _this1.flashCount++;
            if (_this1.inPlay) {
                if (_this1.flashCount < 1) {
                    _this1.fadeOut(m);
                }
                else {
                    _this1.flashNext();
                }
            }
            else {
                _this1.startFlash();
            }
        });
    };
    Scene.prototype.fadeOut = function (m) {
        var _this1 = this;
        var tw = egret.Tween.get(m);
        tw.wait(600);
        tw.to({ alpha: 0 }, 200);
        tw.call(function () {
            _this1.fadeIn(m);
        });
    };
    Scene.prototype.showEnd = function () {
        if (this.delayCall && this.saveOk) {
            var end = new End();
            this.addChild(end);
        }
    };
    Scene.prototype.showHelp = function () {
        var help = new Help();
        this.addChild(help);
    };
    Scene.prototype.saveLuck = function () {
        var _this1 = this;
        if (this.inLuck)
            return;
        this.inLuck = true;
        if (Main.isTest) {
            _this1.saveOk = true;
            return;
        }
        $.ajax({
            url: Main.api,
            data: { ticket: Main.save_ticket, desc: "抽中红包" },
            success: function (data) {
                if (data.msg == 1) {
                    _this1.saveOk = true;
                    _this1.showEnd();
                }
                else if (data.msg == 2) {
                    Main.showLost(33);
                }
                else if (data.msg == 4) {
                    Main.showLost(11);
                }
                else if (data.msg == 5) {
                    Main.showLost(2);
                }
                else if (data.data == "invalid ticket3") {
                    Main.showLost(2);
                }
                else {
                    Main.showLost(100);
                }
            }, error: function () {
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
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map