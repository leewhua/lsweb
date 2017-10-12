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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    Scene.prototype.eventHandler = function (event) {
        switch (event.name) {
            case 'play_end':
                console.log("play_end");
                this.end = new End();
                this.addChild(this.end);
                this.addChild(this.logo);
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
        var bg = Main.createBitmapByName("bg_jpg");
        bg.x = 0;
        bg.y = 0;
        bg.scaleX = bg.scaleY = 2;
        this.tree = new Tree();
        this.tree.x = 320;
        this.tree.y = 1200; //1100;
        this.tree.scaleX = this.tree.scaleY = 0.96;
        this.logo = Main.createBitmapByRes(Main.product_type + "_json", "logo-white");
        this.logo.x = 20;
        this.logo.y = 20;
        this.helpBut = Main.createBitmapByName("help-but_png");
        this.helpBut.x = 640 - this.helpBut.width - 0;
        this.helpBut.y = 0;
        this.helpBut.scaleY = Main.scale;
        var bottom = Main.createBitmapByRes("sc_json", "bottom");
        bottom.y = 1040;
        var cc1 = Main.createBitmapByRes("sc_json", "clound");
        cc1.x = 600;
        cc1.y = 160;
        var cc2 = Main.createBitmapByRes("sc_json", "clound");
        cc2.x = 100;
        cc2.y = 800;
        cc2.scaleX = cc2.scaleY = 0.6;
        var gg = Main.createBitmapByRes("sc_json", "g");
        gg.x = 600;
        gg.y = 200;
        this.title = Main.createBitmapByName("title_png");
        this.title.x = 100;
        this.title.y = 120;
        this.pro = Main.createBitmapByRes(Main.product_type + "_json", "pro");
        this.pro.x = 50;
        this.pro.y = 206;
        this.pro.scaleX = this.pro.scaleY = 2;
        this.help = new Help();
        this.help.x = 320;
        this.help.y = 460;
        this.addChild(bg);
        this.addChild(cc1);
        this.addChild(cc2);
        this.addChild(gg);
        //this.addChild(this.pro);
        this.addChild(this.tree);
        this.addChild(bottom);
        this.addChild(this.title);
        this.addChild(this.helpBut);
        // this.addChild(this.logo);
        bottom.y = 953; //1040;//-87;
        console.log(bottom.height);
        var _this1 = this;
        setTimeout(function () {
            _this1.play321();
        }, 800);
        var tw1 = egret.Tween.get(cc1);
        tw1.to({ x: -400 }, 30000);
        var tw2 = egret.Tween.get(cc2);
        tw2.to({ x: 640 }, 18000);
        var _this1 = this;
        window["playTree"] = function () {
            if (_this1.help.parent) {
                _this1.help.parent.removeChild(_this1.help);
            }
            if (_this1.tree.index == 0) {
                _this1.tree.playIndex(1);
                _this1.loadLuck();
            }
        };
        this.helpBut.touchEnabled = true;
        this.helpBut.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this1.inHelp = true;
            var info = Main.createBitmapByName("help_png");
            _this1.addChild(info);
            info.scaleX = info.scaleY = 2;
            info.alpha = 0;
            var tw = egret.Tween.get(info);
            tw.to({ alpha: 1 }, 400);
            info.touchEnabled = true;
            info.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                _this1.inHelp = false;
                _this1.removeChild(info);
            }, this);
        }, this);
        //eval("playCb(" + this.playYao+","+this+")");
    };
    Scene.prototype.play321 = function () {
        var _this1 = this;
        var h3 = Main.createBitmapByRes('h321_json', 'h3');
        var h2 = Main.createBitmapByRes('h321_json', 'h2');
        var h1 = Main.createBitmapByRes('h321_json', 'h1');
        var sp3 = new egret.Sprite();
        var sp2 = new egret.Sprite();
        var sp1 = new egret.Sprite();
        h3.x = h3.width / -2;
        h3.y = h3.height / -2;
        h2.x = h2.width / -2;
        h2.y = h2.height / -2;
        h1.x = h1.width / -2;
        h1.y = h1.height / -2;
        sp3.addChild(h3);
        sp2.addChild(h2);
        sp1.addChild(h1);
        sp3.x = 320;
        sp3.y = 580;
        sp2.x = 320;
        sp2.y = 580;
        sp1.x = 320;
        sp1.y = 580;
        _this1.addChild(sp3);
        var tw = egret.Tween.get(sp3);
        tw.to({ scaleX: 3, scaleY: 3, alpha: 0 }, 500);
        tw.call(function () {
            var tw = egret.Tween.get(sp2);
            tw.wait(500);
            _this1.addChild(sp2);
            tw.to({ scaleX: 3, scaleY: 3, alpha: 0 }, 500);
            tw.call(function () {
                var tw = egret.Tween.get(sp1);
                tw.wait(500);
                _this1.addChild(sp1);
                tw.to({ scaleX: 3, scaleY: 3, alpha: 0 }, 500);
                tw.call(function () {
                    _this1.play();
                });
            });
        });
    };
    Scene.prototype.play = function () {
        //this.title
        //this.tk
        var tw = egret.Tween.get(this.title);
        tw.to({ y: 100, alpha: 0 }, 400);
        var tw1 = egret.Tween.get(this.pro);
        tw1.to({ alpha: 0 }, 400);
        var _this1 = this;
        tw1.call(function () {
            _this1.pro.y = 680;
            var tw3 = egret.Tween.get(_this1.pro);
            tw3.wait(200);
            tw3.to({ alpha: 1 }, 400);
        });
        var tw2 = egret.Tween.get(this.tree);
        tw2.wait(100);
        tw2.to({ "y": 1100, scaleX: 1, scaleY: 1 }, 500);
        // this.tree.playIndex(2);
        //
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    Scene.prototype.playYao = function () {
        if (this.help.parent) {
            this.help.parent.removeChild(this.help);
        }
        if (this.tree.index == 0) {
            this.tree.playIndex(1);
            this.loadLuck();
        }
    };
    Scene.prototype.playEnd = function () {
        console.log("playEnd:" + this);
        if (this.help && this.help.parent) {
            this.help.parent.removeChild(this.help);
        }
        this.count = 1200;
        if (this.tree.index == 0) {
            this.tree.playIndex(1);
            this.loadLuck();
        }
        else {
            this.loadLuck();
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    Scene.prototype.loop = function () {
        if (this.inHelp) {
            this.count = 0;
            return;
        }
        this.count++;
        if (this.count >= 500) {
            this.playEnd();
        }
        else if (this.count == 20) {
            if (this.tree.index == 0)
                this.addChild(this.help);
        }
    };
    Scene.prototype.loadLuck = function () {
        console.log("loadLuck");
        var _this1 = this;
        if (this.inLuck)
            return;
        this.inLuck = true;
        if (Main.isTest) {
            //Main.award = { type: "cash" };//jifen
            Main.award = { type: "jifen" };
            if (1) {
                Main.award.count = 1;
            }
            else {
                Main.award.count = 10;
            }
            if (_this1.tree.index == 0) {
                _this1.tree.index = 4;
                _this1.tree.playIndex(2);
            }
            else {
                _this1.tree.index = 4;
            }
            return;
        }
        $.ajax({
            url: Main.api,
            data: { ticket: Main.status_ticket, desc: "抽中红包" },
            success: function (data) {
                //alert("data:" + data.msg + ",count:" + data.data.count);
                if (data.msg == 1) {
                    if (1 || data.data.count > 0) {
                        Main.award = data.data;
                        if (data.data.type == "cash") {
                            var cc = parseInt(data.data.count) / 100;
                            Main.award.count = cc;
                        }
                        else {
                            Main.award.count = 10;
                        }
                        if (_this1.tree.index == 0) {
                            _this1.tree.index = 4;
                            _this1.tree.playIndex(2);
                        }
                        else
                            _this1.tree.index = 4;
                    }
                    else {
                        Main.showLost(1);
                    }
                }
                else if (data.data == "invalid ticket3") {
                    Main.showLost(1);
                }
                else {
                    Main.showLost(2);
                }
            },
            dataType: "json", async: true, type: "POST"
        });
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map