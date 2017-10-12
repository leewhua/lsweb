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
        _this.stop1 = 120;
        _this.stop2 = 120;
        _this.stop3 = 120;
        _this.pList = [];
        _this.gCount = 5;
        _this.stopA = 10;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Scene.prototype.onAddToStage = function (event) {
        //初始化intro
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        // this.pointText=new egret.TextField();
        // this.pointText.textFlow = <Array<egret.ITextElement>>[
        //     { text: "剩余积分：",style: { "textColor": 0x336699,"size": 22 } },
        //     { text: Main.user.point,style: { "textColor": 0x336699,"size": 26 } },
        // ];
        // this.pointText.x=250;
        // this.pointText.y=208;
        this.points = [0, 0, 0];
        this.list = [];
        this.list[0] = [Main.createBitmapByName("1.8yuanhongbao_png"), Main.createBitmapByName("1000coupon_png"),
            Main.createBitmapByName("88yuanhongbao_png"), Main.createBitmapByName("500coupon_png"),
            Main.createBitmapByName("8yuanhongbao_png"), Main.createBitmapByName("1.8yuanhongbao_png"),
            Main.createBitmapByName("500coupon_png"), Main.createBitmapByName("88yuanhongbao_png")];
        this.list[1] = [Main.createBitmapByName("1.8yuanhongbao_png"), Main.createBitmapByName("8yuanhongbao_png"),
            Main.createBitmapByName("1000coupon_png"), Main.createBitmapByName("500coupon_png"),
            Main.createBitmapByName("1.8yuanhongbao_png"), Main.createBitmapByName("88yuanhongbao_png"),
            Main.createBitmapByName("8yuanhongbao_png"), Main.createBitmapByName("500coupon_png")];
        this.list[2] = [Main.createBitmapByName("1000coupon_png"), Main.createBitmapByName("88yuanhongbao_png"),
            Main.createBitmapByName("1.8yuanhongbao_png"), Main.createBitmapByName("8yuanhongbao_png"),
            Main.createBitmapByName("500coupon_png"), Main.createBitmapByName("1000coupon_png"),
            Main.createBitmapByName("1.8yuanhongbao_png"), Main.createBitmapByName("8yuanhongbao_png")];
        // this.pList=[["1.8yuanhongbao", "8yuanhongbao", "88yuanhongbao", "500coupon", "1000coupon"],
        //             ["1.8yuanhongbao", "8yuanhongbao", "88yuanhongbao", "500coupon", "1000coupon"],
        //             ["1.8yuanhongbao", "8yuanhongbao", "88yuanhongbao", "500coupon", "1000coupon"]];
        this.pList = [[0, 4, 2, 3, 1],
            [4, 1, 0, 3, 2],
            [2, 3, 1, 4, 0]];
        var i;
        this.playBar = new egret.Sprite();
        this.bar1 = new egret.Sprite();
        this.bar2 = new egret.Sprite();
        this.bar3 = new egret.Sprite();
        // this.help=new Help();
        // var help_but = Main.createBitmapByName("help-but_png");
        // help_but.x=420;
        // help_but.y=880;
        // console.log("MainScale:" + Main.scale);
        for (i = 0; i < this.list[0].length; i++) {
            this.list[0][i].scaleY = Main.scale;
            this.list[1][i].scaleY = Main.scale;
            this.list[2][i].scaleY = Main.scale;
            this.list[0][i].x = 60 - this.list[0][i].width / 2;
            this.list[0][i].y = 120 * i + 60 - this.list[0][i].height / 2;
            this.list[1][i].x = 60 - this.list[1][i].width / 2;
            this.list[1][i].y = 120 * i + 60 - this.list[1][i].height / 2;
            this.list[2][i].x = 60 - this.list[2][i].width / 2;
            this.list[2][i].y = 120 * i + 60 - this.list[2][i].height / 2;
            this.bar1.addChild(this.list[0][i]);
            this.bar2.addChild(this.list[1][i]);
            this.bar3.addChild(this.list[2][i]);
        }
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x0, 1);
        mask.graphics.drawRect(0, 0, 440, 138);
        // var over: egret.Bitmap = Main.createBitmapByName("over_png");
        // man.x=0;
        // man.y = stageH - man.height;
        var sc = Main.createBitmapByName("sc_png");
        this.start_png = Main.createBitmapByName("start_png");
        var music = Main.createBitmapByName("music_png");
        var musicClose = Main.createBitmapByName("music-close_png");
        // var btnHelp = Main.createBitmapByName("help_png");
        var top1 = Main.createBitmapByName("top1_png");
        var top2 = Main.createBitmapByName("top2_png");
        // sc.y=-38;
        this.start_png.x = 220;
        this.start_png.y = 668;
        this.but = this.start_png;
        music.x = 460;
        music.y = 720;
        musicClose.x = 460;
        musicClose.y = 720;
        // btnHelp.x = 90;
        // btnHelp.y= 720;
        top1.x = 64;
        top1.y = -170;
        top2.x = 156;
        top2.y = -40;
        egret.Tween.get(top2).to({ y: 158 }, 300).call(function () {
            // console.log(this);
            egret.Tween.get(top2).to({ y: 146 }, 350).call(function () {
                egret.Tween.get(top2).to({ y: 158 }, 300).call(function () {
                    egret.Tween.get(top2).to({ y: 152 }, 200).call(function () {
                        egret.Tween.get(top2).to({ y: 158 }, 100);
                    });
                });
            });
        });
        var tw = egret.Tween.get(top1);
        tw.wait(1200).to({ y: 14 }, 300).call(function () {
            egret.Tween.get(top1).wait(100).to({ scaleX: 1.3, scaleY: 1.3, x: -20 }, 200).call(function () {
                egret.Tween.get(top1).to({ scaleX: 1, scaleY: 1, x: 64 }, 320).call(function () {
                    egret.Tween.get(top1).to({ scaleX: 1.3, scaleY: 1.3, x: -20 }, 200).call(function () {
                        egret.Tween.get(top1).to({ scaleX: 1, scaleY: 1, x: 64 }, 200);
                    });
                });
                // });
            });
        });
        this.playBar.x = 112;
        this.playBar.y = 370;
        mask.x = 100;
        mask.y = 360;
        // over.x=112;
        // over.y=304;
        this.bar2.x = 146;
        this.bar3.x = 294;
        this.playBar.addChild(this.bar1);
        this.playBar.addChild(this.bar2);
        this.playBar.addChild(this.bar3);
        this.addChild(sc);
        this.addChild(this.playBar);
        this.addChild(mask);
        // this.addChild(over);
        // this.addChild(this.pointText);
        this.addChild(this.start_png);
        this.addChild(music);
        // this.addChild(btnHelp);
        this.addChild(top1);
        this.addChild(top2);
        this.playBar.mask = mask;
        // this.addChild(help_but);
        // this.addChild(this.help);
        var _this1 = this;
        var prizes = sessionStorage.getItem("prizes");
        if (prizes) {
            _this1.start_png.touchEnabled = false;
            // prizes = eval("(" + prizes + ")");
            // setTimeout(function () {
            _this1.toWin();
            // },1);
            sessionStorage.removeItem("prizes");
            return;
        }
        Main.setBut(this.start_png);
        this.start_png.touchEnabled = true;
        this.start_png.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.play();
            console.log("start_png");
        }, this);
        Main.setBut(music);
        var sound = RES.getRes("music_mp3");
        var channel = this.soundChannel;
        //播放音乐
        setTimeout(function () {
            Main.setBut(music);
            channel = sound.play();
        }, 1000);
        music.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            // channel = sound.play();
            //暂停音乐
            if (channel) {
                //调用soundChannel对象的stop方法停止播放音频
                console.log(channel);
                channel.stop();
                this.soundChannel = null;
            }
            this.removeChild(music);
            this.addChild(musicClose);
        }, this);
        Main.setBut(musicClose);
        // musicClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function(event) {
        //     this.removeChild(musicClose);
        //     this.addChild(music);
        // }, this);
        // help_but.touchEnabled = true;
        // help_but.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
        //    this.addChild(this.help);
        // },this);
        //this.bar2.y=this.points[1]=-100*3;
        //this.bar3.y =this.points[2] = -100 * 6;
    };
    Scene.prototype.setMove = function (sp, l, my, ma, st) {
        var ah = this.gCount * 120;
        if (st <= 0) {
            this.points[l] = this.points[l] + (st - this.points[l]) / this.stopA;
        }
        else {
            ma = ma + (my - ma) / 120; //(speed - sal)
            this.points[l] += ma;
        }
        sp.y = this.points[l] % ah;
        return ma;
    };
    Scene.prototype.play = function () {
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
    };
    Scene.prototype.initBar = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.speed1 = 0;
        this.speed2 = 0;
        this.speed3 = 0;
        this.sa1 = 0;
        this.sa2 = 0;
        this.sa3 = 0;
        this.stop1 = 120;
        this.stop2 = 120;
        this.stop3 = 120;
        this.inLuck = 0;
        console.log("initBar");
    };
    Scene.prototype.toWin = function () {
        var w = Main.win;
        var ran;
        var l1, l2, l3;
        // if(w==0){
        //     ran =Math.random();
        //     if(ran<0.33){
        //         l1=0;
        //         l2 = Math.floor(Math.random() * (this.gCount-1))+1;
        //         l3 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
        //     } else if(ran < 0.66) {
        //         l2 = 0;
        //         l1 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
        //         l3 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
        //     }else{
        //         l3 = 0;
        //         l1 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
        //         l2 = Math.floor(Math.random() * (this.gCount - 1)) + 1;
        //     }
        // }else{
        //     l1=l2=l3=w;
        // }
        l1 = l2 = l3 = w;
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
        // this.pointText.textFlow = <Array<egret.ITextElement>>[
        //     { text: "剩余积分：",style: { "textColor": 0x336699,"size": 22 } },
        //     { text: Main.user.point,style: { "textColor": 0x336699,"size": 26 } },
        // ];
    };
    Scene.prototype.showEnd = function () {
        var _this1 = this;
        this.but.touchEnabled = false;
        this.end = new End();
        this.addChild(this.end);
        setTimeout(function () {
            _this1.initBar();
        }, 500);
    };
    // public showPrizes(){
    //     var _this2 = this;
    //     var end2= new End();
    //     _this2.addChild(end2);
    // }
    Scene.prototype.setStop1 = function (l1) {
        var s1 = this.pList[0][l1];
        var hh = this.gCount * 120;
        this.stop1 = Math.round((this.sa1 * this.stopA + this.points[0]) / 600) * hh - 120 * s1;
        console.log(this.stop1);
    };
    Scene.prototype.setStop2 = function (l2) {
        var s2 = this.pList[1][l2];
        var hh = this.gCount * 120;
        this.stop2 = Math.round((this.sa2 * this.stopA + this.points[1]) / 600) * hh - 120 * s2;
        console.log(this.stop2);
    };
    Scene.prototype.setStop3 = function (l3) {
        var s3 = this.pList[2][l3];
        var hh = this.gCount * 120;
        this.stop3 = Math.round((this.sa3 * this.stopA + this.points[2]) / 600) * hh - 120 * s3; //(Math.floor(this.points[2]/ 900) - 1) * 900 - 100 * 2;
        console.log(this.stop3);
    };
    Scene.prototype.loop = function () {
        this.sa1 = this.setMove(this.bar1, 0, this.speed1, this.sa1, this.stop1);
        this.sa2 = this.setMove(this.bar2, 1, this.speed2, this.sa2, this.stop2);
        this.sa3 = this.setMove(this.bar3, 2, this.speed3, this.sa3, this.stop3);
        // console.log(this.sa1);
    };
    Scene.prototype.loadLuck = function () {
        console.log("loadLuck");
        var _this1 = this;
        // var prizes = sessionStorage.getItem("prizes");
        // if(prizes){
        //     prizes = eval("(" + prizes + ")");
        //     _this1.toWin();
        //     sessionStorage.removeItem("prizes");
        //     return;
        // }
        var time = new Date();
        console.log(time);
        if (Main.isTest) {
            // Main.luck = { type: -1 };
            // var list = { p1: 2,p2: 4,p3: 1,p4: 3,p5: 0 };
            //var pid=6;
            // var pid=2;
            Main.win = 4;
            alert("test");
            var dd = new Date().getTime() - time.getTime();
            console.log(dd);
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
        $.ajax({
            url: Main.api,
            data: { ticket: Main.user.uid },
            error: function () {
                Main.showLost("出现错误，请稍后尝试");
            },
            success: function (data) {
                //alert("data:" + data.msg + ",count:" + data.data.count);
                console.log(data);
                if (data.result == "success") {
                    // Main.user.point = Main.user.point - data.price;
                    // Main.luck = data;
                    // var list = {p0: "1.8yuanhongbao", p1: "8yuanhongbao", p2: "88yuanhongbao", p3: "500coupon", p4: "1000coupon"};
                    // Main.win = list["p" + data.prizes[0].id];
                    Main.win = data.prizes[0].id;
                    console.log(Main.win);
                    Main.oid = data.prizes[0].ticket;
                    var dd = new Date().getTime() - time.getTime();
                    if (dd < 2000) {
                        setTimeout(function () {
                            _this1.toWin();
                        }, 1000);
                    }
                    else {
                        _this1.toWin();
                    }
                }
                else if (data.error_code) {
                    Main.showLost(data.error);
                }
                else {
                    Main.showLost("出现错误，请稍后尝试");
                }
            },
            dataType: "json", async: true, type: "POST"
        });
    };
    Object.defineProperty(Scene, "instance", {
        get: function () {
            if (!Scene._scene) {
                Scene._scene = new Scene();
            }
            return Scene._scene;
        },
        enumerable: true,
        configurable: true
    });
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map