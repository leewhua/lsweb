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
        _this.inLuck = 0;
        _this.speed1 = 0;
        _this.speed2 = 0;
        _this.speed3 = 0;
        _this.sa1 = 0;
        _this.sa2 = 0;
        _this.sa3 = 0;
        _this.stop1 = 100;
        _this.stop2 = 100;
        _this.stop3 = 100;
        _this.pList = [];
        _this.gCount = 8;
        _this.stopA = 10;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Scene.prototype.onAddToStage = function (event) {
        //初始化intro
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.pointText = new egret.TextField();
        this.pointText.textFlow = [
            { text: "剩余积分：", style: { "textColor": 0x336699, "size": 22 } },
            { text: Main.user.point, style: { "textColor": 0x336699, "size": 26 } },
        ];
        this.pointText.x = 250;
        this.pointText.y = 208;
        this.points = [0, 0, 0];
        this.list = [];
        this.list[0] = [Main.createBitmapByName("g0_png"), Main.createBitmapByName("g1_png"),
            Main.createBitmapByName("g30_png"), Main.createBitmapByName("g88_png"),
            Main.createBitmapByName("g100_png"), Main.createBitmapByName("g10_png"),
            Main.createBitmapByName("g30_png"), Main.createBitmapByName("g0_png"),
            Main.createBitmapByName("g1_png"), Main.createBitmapByName("g10_png"),
            Main.createBitmapByName("g100_png"), Main.createBitmapByName("g88_png")];
        this.list[1] = [Main.createBitmapByName("g100_png"), Main.createBitmapByName("g88_png"),
            Main.createBitmapByName("g30_png"), Main.createBitmapByName("g10_png"),
            Main.createBitmapByName("g1_png"), Main.createBitmapByName("g0_png"),
            Main.createBitmapByName("g88_png"), Main.createBitmapByName("g1_png"),
            Main.createBitmapByName("g100_png"), Main.createBitmapByName("g88_png"),
            Main.createBitmapByName("g30_png"), Main.createBitmapByName("g10_png")];
        this.list[2] = [Main.createBitmapByName("g30_png"), Main.createBitmapByName("g0_png"),
            Main.createBitmapByName("g1_png"), Main.createBitmapByName("g30_png"),
            Main.createBitmapByName("g10_png"), Main.createBitmapByName("g88_png"),
            Main.createBitmapByName("g1_png"), Main.createBitmapByName("g100_png"),
            Main.createBitmapByName("g0_png"), Main.createBitmapByName("g88_png"),
            Main.createBitmapByName("g0_png"), Main.createBitmapByName("g1_png")];
        this.pList = [[6, 7, 0, 1, 2, 3, 4, 5],
            [4, 3, 2, 1, 0, 7, 6, 5],
            [7, 5, 3, 2, 4, 6, 1, 0]];
        var i;
        this.playBar = new egret.Sprite();
        this.bar1 = new egret.Sprite();
        this.bar2 = new egret.Sprite();
        this.bar3 = new egret.Sprite();
        this.help = new Help();
        var help_but = Main.createBitmapByName("help-but_png");
        help_but.x = 420;
        help_but.y = 880;
        for (i = 0; i < this.list[0].length; i++) {
            this.list[0][i].scaleY = Main.scale;
            this.list[1][i].scaleY = Main.scale;
            this.list[2][i].scaleY = Main.scale;
            this.list[0][i].x = 60 - this.list[0][i].width / 2;
            this.list[0][i].y = 100 * i + 50 - this.list[0][i].height / 2;
            this.list[1][i].x = 60 - this.list[1][i].width / 2;
            this.list[1][i].y = 100 * i + 50 - this.list[1][i].height / 2;
            this.list[2][i].x = 60 - this.list[2][i].width / 2;
            this.list[2][i].y = 100 * i + 50 - this.list[2][i].height / 2;
            this.bar1.addChild(this.list[0][i]);
            this.bar2.addChild(this.list[1][i]);
            this.bar3.addChild(this.list[2][i]);
        }
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x0, 1);
        mask.graphics.drawRect(0, 0, 440, 302);
        var bg = Main.createBitmapByName("bg_jpg");
        bg.x = 0;
        bg.y = 0;
        var man = Main.createBitmapByName("man_png");
        var over = Main.createBitmapByName("over_png");
        man.x = 0;
        man.y = stageH - man.height;
        var sc = Main.createBitmapByName("sc_png");
        var start_png = Main.createBitmapByName("start_png");
        sc.y = -38;
        start_png.x = 380;
        start_png.y = 688;
        this.but = start_png;
        this.playBar.x = 115;
        this.playBar.y = 314;
        mask.x = 105;
        mask.y = 314;
        over.x = 112;
        over.y = 304;
        this.bar2.x = 150;
        this.bar3.x = 300;
        this.playBar.addChild(this.bar1);
        this.playBar.addChild(this.bar2);
        this.playBar.addChild(this.bar3);
        this.addChild(bg);
        this.addChild(sc);
        this.addChild(this.playBar);
        this.addChild(mask);
        this.addChild(over);
        this.addChild(this.pointText);
        this.addChild(start_png);
        this.playBar.mask = mask;
        this.addChild(man);
        this.addChild(help_but);
        this.addChild(this.help);
        var _this1 = this;
        Main.setBut(start_png);
        start_png.touchEnabled = true;
        start_png.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.play();
            console.log("start_png");
        }, this);
        help_but.touchEnabled = true;
        help_but.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.addChild(this.help);
        }, this);
        //this.bar2.y=this.points[1]=-100*3;
        //this.bar3.y =this.points[2] = -100 * 6;
    };
    Scene.prototype.setMove = function (sp, l, my, ma, st) {
        var ah = this.gCount * 100;
        if (st <= 0) {
            this.points[l] = this.points[l] + (st - this.points[l]) / this.stopA;
        }
        else {
            ma = ma + (my - ma) / 100;
            this.points[l] += ma;
        }
        sp.y = this.points[l] % ah;
        return ma;
    };
    Scene.prototype.play = function () {
        // alert(Main.user.point);
        if (Main.user.point < 30) {
            this.helptips = new HelpTips();
            this.addChild(this.helptips);
        }
        else {
            if (this.inLuck == 0) {
                this.but.touchEnabled = false;
                var _this1 = this;
                this.speed1 = -80 - 80 * Math.random();
                this.speed2 = -80 - 80 * Math.random();
                this.speed3 = -80 - 80 * Math.random();
                this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
                this.inLuck = 1;
                this.loadLuck();
            }
            else {
            }
            console.log("play");
        }
    };
    Scene.prototype.initBar = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.speed1 = 0;
        this.speed2 = 0;
        this.speed3 = 0;
        this.sa1 = 0;
        this.sa2 = 0;
        this.sa3 = 0;
        this.stop1 = 100;
        this.stop2 = 100;
        this.stop3 = 100;
        this.inLuck = 0;
        console.log("initBar");
    };
    Scene.prototype.toWin = function () {
        var w = Main.win;
        var ran;
        var l1, l2, l3;
        if (w == 0) {
            ran = Math.random();
            if (ran < 0.33) {
                l1 = 0;
                l2 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
                l3 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
            }
            else if (ran < 0.66) {
                l2 = 0;
                l1 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
                l3 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
            }
            else {
                l3 = 0;
                l1 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
                l2 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
            }
        }
        else {
            l1 = l2 = l3 = w;
        }
        console.log(l1, l2, l3);
        this.setStop1(l1);
        var _this1 = this;
        setTimeout(function () {
            _this1.setStop2(l2);
        }, 1000);
        setTimeout(function () {
            _this1.setStop3(l3);
        }, 2000);
        setTimeout(function () {
            _this1.showEnd();
        }, 5000);
        this.pointText.textFlow = [
            { text: "剩余积分：", style: { "textColor": 0x336699, "size": 22 } },
            { text: Main.user.point, style: { "textColor": 0x336699, "size": 26 } },
        ];
    };
    Scene.prototype.showEnd = function () {
        var _this1 = this;
        this.but.touchEnabled = true;
        this.end = new End();
        this.addChild(this.end);
        setTimeout(function () {
            _this1.initBar();
        }, 500);
    };
    Scene.prototype.setStop1 = function (l1) {
        var s1 = this.pList[0][l1];
        var hh = this.gCount * 100;
        this.stop1 = Math.round((this.sa1 * this.stopA + this.points[0]) / 800) * hh - 100 * s1;
    };
    Scene.prototype.setStop2 = function (l2) {
        var s2 = this.pList[1][l2];
        var hh = this.gCount * 100;
        this.stop2 = Math.round((this.sa2 * this.stopA + this.points[1]) / 800) * hh - 100 * s2;
    };
    Scene.prototype.setStop3 = function (l3) {
        var s3 = this.pList[2][l3];
        var hh = this.gCount * 100;
        this.stop3 = Math.round((this.sa3 * this.stopA + this.points[2]) / 800) * hh - 100 * s3; //(Math.floor(this.points[2]/ 900) - 1) * 900 - 100 * 2;
    };
    Scene.prototype.loop = function () {
        this.sa1 = this.setMove(this.bar1, 0, this.speed1, this.sa1, this.stop1);
        this.sa2 = this.setMove(this.bar2, 1, this.speed2, this.sa2, this.stop2);
        this.sa3 = this.setMove(this.bar3, 2, this.speed3, this.sa3, this.stop3);
    };
    Scene.prototype.loadLuck = function () {
        console.log("loadLuck");
        var time = new Date();
        var _this1 = this;
        if (Main.isTest) {
            Main.luck = { type: -1 };
            var list = { p0: 0, p1: 1, p10: 2, p30: 3, p88: 4, p100: 5 };
            //var pid=6;
            var pid = 0;
            Main.win = list["p" + pid];
            var dd = new Date().getTime() - time.getTime();
            if (dd < 2000) {
                setTimeout(function () {
                    _this1.toWin();
                }, 1000);
            }
            else {
                _this1.toWin();
            }
            return;
        }
        if (this.inLuck == 2)
            return;
        this.inLuck = 2;
        // if(Main.user.point < 30){
        //     _this1.helptips = new HelpTips();
        // }else{
        $.ajax({
            url: Main.userApi,
            data: { ticket: Main.ticket },
            error: function () {
                Main.showLost("出现错误，请稍后尝试");
            },
            success: function (data) {
                //alert("data:" + data.msg + ",count:" + data.data.count);
                if (data.prizes[0].amount == 1) {
                    Main.luck = data.prizes[0];
                    // var list = { p1: 6,p2: 5,p3: 4,p4: 8,p5: 7,p6: 3,p7: 2,p8: 1,p9: 0};
                    list = { p0: 0, p1: 1, p10: 2, p30: 3, p88: 4, p100: 5 };
                    console.log(parseInt(data.prizes[0].desc));
                    Main.win = list["p" + parseInt(data.prizes[0].desc)];
                    console.log(Main.win);
                    Main.id = data.prizes[0].id;
                    var dd = new Date().getTime() - time.getTime();
                    if (dd < 2000) {
                        setTimeout(function () {
                            _this1.toWin();
                        }, 1000);
                    }
                    else {
                        _this1.toWin();
                    }
                    if (parseInt(data.prizes[0].desc) != 0) {
                        Main.user.point = Main.user.point + (parseInt(data.prizes[0].desc)) - 30;
                    }
                    else {
                        Main.user.point = Main.user.point - 30;
                    }
                }
                else {
                    Main.showLost("出现错误，请稍后尝试");
                }
            },
            dataType: "json", async: true, type: "POST"
        });
        // }
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map