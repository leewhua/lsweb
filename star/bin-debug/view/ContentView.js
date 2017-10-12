var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ContentView = (function (_super) {
    __extends(ContentView, _super);
    function ContentView() {
        var _this = _super.call(this) || this;
        _this.tempT = 0;
        _this.initView();
        return _this;
    }
    ContentView.prototype.returnClickHandler = function () {
        if (Main.loaded_music) {
            var sound = RES.getRes("loading_click_mp3");
            sound.play(0.5, 1);
        }
        GameScene.instance.hideContent();
        GameScene.instance.showMain();
    };
    ContentView.prototype.initView = function () {
        this.bg = AssetsUtils.createBitmapByName("kuang_png");
        StageUtils.centerInParent(this.bg);
        this.addChild(this.bg);
        this.y1 = this.bg.y;
        this.container = new egret.Sprite();
        this.container.graphics.beginFill(0x000000, 0.01);
        this.container.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight * 2);
        this.container.graphics.endFill();
        this.addChild(this.container);
        this.container.touchEnabled = true;
        this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.container.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.container.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.container.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        var mk = new egret.Shape();
        mk.graphics.beginFill(0x000000);
        mk.graphics.drawRect(this.bg.x, this.bg.y + 200, this.bg.width, this.bg.height - 100);
        mk.graphics.endFill();
        this.addChild(mk);
        this.container.mask = mk;
        this.isFirst = true;
        this.angle = 360;
        this.btnReturn = AssetsUtils.createBitmapByName("btnReturn_png");
        this.btnReturn.x = StageUtils.stage.stageWidth - this.btnReturn.width;
        this.btnReturn.y = StageUtils.stage.stageHeight - this.btnReturn.height;
        this.btnReturn.touchEnabled = true;
        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnClickHandler, this);
        this.addChild(this.btnReturn);
        this.addEventListener(egret.Event.ENTER_FRAME, this.efHandler, this);
        this.tempT = egret.getTimer();
    };
    ContentView.prototype.efHandler = function (e) {
        var t = egret.getTimer();
        if (this.bl && t - this.tempT > 1000) {
            // alert("hh:"+t+":"+this.tempT);
            // console.log(t,this.tempT);
            this.tempT = t;
            this.bl = false;
            this.moveEnd(this.select);
        }
    };
    ContentView.prototype.touchBegin = function (evt) {
        this.bl = true;
        this.beginY = evt.stageY;
        this.beginTime = egret.getTimer();
        this.tempT = this.beginTime;
        this.beginStageY = 0;
        console.log("touchBegin:" + this.beginY);
    };
    ContentView.prototype.touchMove = function (evt) {
        this.tempT = egret.getTimer();
        if (this.beginStageY) {
            var tempY = evt.stageY;
            var temp = tempY - this.beginStageY;
            this.container.y += temp;
        }
        this.beginStageY = evt.stageY;
    };
    ContentView.prototype.touchEnd = function (evt) {
        this.bl = false;
        var tempY = evt.stageY;
        var tempTime = egret.getTimer();
        var speed = (tempY - this.beginY) / (tempTime - this.beginTime);
        console.log("touchEnd:" + speed, tempY, this.beginY, tempTime, this.beginTime);
        if (Math.abs(speed) < 0.3) {
            this.moveEnd(this.select);
        }
        else {
            //触发滚动事件
            if (speed > 0) {
                this.moveEnd(0);
            }
            else {
                if (this.select == 0) {
                    this.moveEnd(1);
                }
                else {
                    this.moveEnd(1);
                }
            }
        }
    };
    ContentView.prototype.moveEnd = function (sel) {
        egret.Tween.removeTweens(this.container);
        if (sel == 0) {
            egret.Tween.get(this.container).to({ y: 0 }, 500, egret.Ease.circOut).call(this.moveEndEnd, this, [this.select != sel]);
        }
        else {
            egret.Tween.get(this.container).to({ y: -StageUtils.stage.stageHeight }, 500, egret.Ease.circOut).call(this.moveEndEnd, this, [this.select != sel]);
        }
        this.select = sel;
    };
    ContentView.prototype.moveEndEnd = function (bl) {
        if (bl) {
            if (this.isFirst) {
                var num = StageUtils.stage.stageHeight;
                this.isFirst = false;
                if (this.index == 1) {
                    this.icon5.alpha = 0;
                    this.icon6.alpha = 0;
                    this.icon7.alpha = 0;
                    this.bg1_2.alpha = 0;
                    egret.Tween.get(this.bg1_2).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon5).wait(200).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon6).wait(400).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon7).wait(600).to({ alpha: 1 }, 200);
                }
                else if (this.index == 2) {
                    this.icon4.alpha = 0;
                    this.icon5.alpha = 0;
                    this.icon6.alpha = 0;
                    this.icon7.alpha = 0;
                    this.icon8.alpha = 0;
                    this.icon9.alpha = 0;
                    this.icon10.alpha = 0;
                    egret.Tween.get(this.icon4).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon5).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon6).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon7).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon8).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon9).to({ alpha: 1 }, 200);
                    egret.Tween.get(this.icon10).to({ alpha: 1 }, 200);
                    var temp6 = this.icon6.y;
                    egret.Tween.get(this.icon6, { loop: true }).to({ y: temp6 + 10 }, 300).to({ y: temp6 }, 300);
                    var temp7 = this.icon7.y;
                    egret.Tween.get(this.icon7, { loop: true }).to({ scaleY: 0.9, y: temp7 + 15 }, 200).to({ scaleY: 1, y: temp7 }, 200);
                    egret.Tween.get(this.icon10, { loop: true }).to({ rotation: 5 }, 200).to({ rotation: 0 }, 200);
                }
                else if (this.index == 3) {
                    var temp1 = this.icon3.y;
                    var temp2 = this.icon4.y;
                    this.icon3.y = num * 2;
                    this.icon4.y = num * 2;
                    egret.Tween.get(this.icon3).to({ y: temp1, alpha: 1 }, 500);
                    egret.Tween.get(this.icon4).wait(500).to({ y: temp2, alpha: 1 }, 500);
                }
                else if (this.index == 5) {
                    // var icon8:egret.Bitmap = AssetsUtils.createBitmapByName("content5_8_png");
                    // StageUtils.centerInParent(icon8,this.bg.x,this.bg.y - 100 + num,this.bg);
                    // this.container.addChild(icon8);
                    // var icon9:egret.Bitmap = AssetsUtils.createBitmapByName("content5_9_png");
                    // StageUtils.centerInParent(icon9,this.bg.x,this.bg.y + 140 + num,this.bg);
                    // this.container.addChild(icon9);
                    // var icon10:egret.Bitmap = AssetsUtils.createBitmapByName("content5_10_png");
                    // StageUtils.centerInParent(icon10,this.bg.x,this.bg.y + 380 + num,this.bg);
                    // this.container.addChild(icon10);
                    var temp8 = this.icon8.y;
                    var temp9 = this.icon9.y;
                    var temp10 = this.icon10.y;
                    this.icon8.y = num * 2;
                    this.icon9.y = num * 2;
                    this.icon10.y = num * 2;
                    egret.Tween.get(this.icon8).to({ y: temp8, alpha: 1 }, 500);
                    egret.Tween.get(this.icon9).wait(500).to({ y: temp9, alpha: 1 }, 500);
                    egret.Tween.get(this.icon10).wait(1000).to({ y: temp10, alpha: 1 }, 500);
                }
            }
        }
    };
    ContentView.prototype.setData = function (index) {
        this.index = index;
        this.select = 0;
        var str1;
        var str2;
        var str3;
        var str4;
        var num = StageUtils.stage.stageHeight;
        if (index == 1) {
            str1 = "p4_1_title";
            str3 = "p4_2_title";
            var title1 = AssetsUtils.createBitmapByName(str1 + "_png");
            StageUtils.centerInParent(title1, this.bg.x, this.bg.y - 240, this.bg);
            this.container.addChild(title1);
            var bg1_1 = AssetsUtils.createBitmapByName("content1_1_png");
            StageUtils.centerInParent(bg1_1, this.bg.x, this.bg.y + 60, this.bg);
            this.container.addChild(bg1_1);
            var icon1 = AssetsUtils.createBitmapByName("content1_2_png");
            StageUtils.centerInParent(icon1, this.bg.x + 60, this.bg.y - 135, this.bg);
            this.container.addChild(icon1);
            var icon2 = AssetsUtils.createBitmapByName("content1_3_png");
            StageUtils.centerInParent(icon2, this.bg.x - 97, this.bg.y - 10, this.bg);
            this.container.addChild(icon2);
            var icon3 = AssetsUtils.createBitmapByName("content1_4_png");
            StageUtils.centerInParent(icon3, this.bg.x + 115, this.bg.y + 58, this.bg);
            this.container.addChild(icon3);
            var icon4 = AssetsUtils.createBitmapByName("content1_5_png");
            StageUtils.centerInParent(icon4, this.bg.x - 12, this.bg.y + 215, this.bg);
            this.container.addChild(icon4);
            var arrow = AssetsUtils.createBitmapByName("content_arrow_png");
            StageUtils.centerInParent(arrow, this.bg.x, this.bg.y + 400, this.bg);
            this.container.addChild(arrow);
            bg1_1.alpha = 0;
            icon1.alpha = 0;
            icon2.alpha = 0;
            icon3.alpha = 0;
            icon4.alpha = 0;
            egret.Tween.get(bg1_1).wait(200).to({ alpha: 1 }, 200);
            egret.Tween.get(icon1).wait(400).to({ alpha: 1 }, 200);
            egret.Tween.get(icon2).wait(600).to({ alpha: 1 }, 200);
            egret.Tween.get(icon3).wait(800).to({ alpha: 1 }, 200);
            egret.Tween.get(icon4).wait(1000).to({ alpha: 1 }, 200);
            var title2 = AssetsUtils.createBitmapByName(str3 + "_png");
            StageUtils.centerInParent(title2, this.bg.x, this.bg.y - 240 + num, this.bg);
            this.container.addChild(title2);
            var bg1_2 = AssetsUtils.createBitmapByName("content1_6_png");
            StageUtils.centerInParent(bg1_2, this.bg.x, this.bg.y + 70 + num, this.bg);
            this.container.addChild(bg1_2);
            var icon5 = AssetsUtils.createBitmapByName("content1_7_png");
            StageUtils.centerInParent(icon5, this.bg.x, this.bg.y + 70 + num, this.bg);
            this.container.addChild(icon5);
            var icon6 = AssetsUtils.createBitmapByName("content1_8_png");
            StageUtils.centerInParent(icon6, this.bg.x, this.bg.y + 50 + num, this.bg);
            this.container.addChild(icon6);
            var icon7 = AssetsUtils.createBitmapByName("content_buttom_png");
            StageUtils.centerInParent(icon7, this.bg.x, this.bg.y + 420 + num, this.bg);
            this.container.addChild(icon7);
            this.icon5 = icon5;
            this.icon6 = icon6;
            this.icon7 = icon7;
            this.bg1_2 = bg1_2;
            this.icon5.alpha = 0;
            this.icon6.alpha = 0;
            this.icon7.alpha = 0;
            this.bg1_2.alpha = 0;
        }
        else if (index == 2) {
            str1 = "p5_1_title";
            str3 = "p5_2_title";
            var title1 = AssetsUtils.createBitmapByName(str1 + "_png");
            StageUtils.centerInParent(title1, this.bg.x, this.bg.y - 240, this.bg);
            this.container.addChild(title1);
            var icon1 = AssetsUtils.createBitmapByName("content2_1_png");
            StageUtils.centerInParent(icon1, this.bg.x, this.bg.y + 100, this.bg);
            this.container.addChild(icon1);
            var icon2 = AssetsUtils.createBitmapByName("content2_3_png");
            StageUtils.centerInParent(icon2, this.bg.x + 38, this.bg.y + 80, this.bg);
            icon2.scaleX = icon2.scaleY = 0.8;
            this.container.addChild(icon2);
            var icon3 = AssetsUtils.createBitmapByName("content2_4_png");
            StageUtils.centerInParent(icon3, this.bg.x - 150, this.bg.y + 40, this.bg);
            this.container.addChild(icon3);
            var icon4 = AssetsUtils.createBitmapByName("content2_5_png");
            StageUtils.centerInParent(icon4, this.bg.x + 150, this.bg.y + 50, this.bg);
            this.container.addChild(icon4);
            var arrow = AssetsUtils.createBitmapByName("content_arrow_png");
            StageUtils.centerInParent(arrow, this.bg.x, this.bg.y + 400, this.bg);
            this.container.addChild(arrow);
            var tempY = icon1.y;
            icon1.alpha = 0;
            icon1.y = this.bg.y - 100;
            icon2.alpha = 0;
            icon3.alpha = 0;
            icon4.alpha = 0;
            egret.Tween.get(icon1).wait(200).to({ alpha: 1, y: tempY }, 500, egret.Ease.backOut).call(function () {
                icon1.texture = RES.getRes("content2_2_png");
            });
            egret.Tween.get(icon2).wait(700).to({ alpha: 1 }, 200);
            egret.Tween.get(icon3).wait(900).to({ alpha: 1 }, 200);
            egret.Tween.get(icon4).wait(1100).to({ alpha: 1 }, 200);
            var title2 = AssetsUtils.createBitmapByName(str3 + "_png");
            StageUtils.centerInParent(title2, this.bg.x, this.bg.y - 240 + num, this.bg);
            this.container.addChild(title2);
            var icon4 = AssetsUtils.createBitmapByName("content2_6_png");
            StageUtils.centerInParent(icon4, this.bg.x, this.bg.y + 30 + num, this.bg);
            this.container.addChild(icon4);
            var icon5 = AssetsUtils.createBitmapByName("content2_7_png");
            StageUtils.centerInParent(icon5, this.bg.x, this.bg.y + 310 + num, this.bg);
            this.container.addChild(icon5);
            var icon6 = AssetsUtils.createBitmapByName("content2_8_png");
            StageUtils.centerInParent(icon6, this.bg.x - 180, this.bg.y - 20 + num, this.bg);
            this.container.addChild(icon6);
            var icon7 = AssetsUtils.createBitmapByName("content2_9_png");
            StageUtils.centerInParent(icon7, this.bg.x - 90, this.bg.y - 55 + num, this.bg);
            this.container.addChild(icon7);
            var icon8 = AssetsUtils.createBitmapByName("content2_10_png");
            StageUtils.centerInParent(icon8, this.bg.x - 40, this.bg.y - 150 + num, this.bg);
            this.container.addChild(icon8);
            var icon9 = AssetsUtils.createBitmapByName("content2_11_png");
            StageUtils.centerInParent(icon9, this.bg.x + 120, this.bg.y - 130 + num, this.bg);
            this.container.addChild(icon9);
            var icon10 = AssetsUtils.createBitmapByName("content2_12_png");
            StageUtils.centerInParent(icon10, this.bg.x + 120, this.bg.y - 30 + num, this.bg);
            this.container.addChild(icon10);
            this.icon4 = icon4;
            this.icon5 = icon5;
            this.icon6 = icon6;
            this.icon7 = icon7;
            this.icon8 = icon8;
            this.icon9 = icon9;
            this.icon10 = icon10;
            this.icon4.alpha = 0;
            this.icon5.alpha = 0;
            this.icon6.alpha = 0;
            this.icon7.alpha = 0;
            this.icon8.alpha = 0;
            this.icon9.alpha = 0;
            this.icon10.alpha = 0;
        }
        else if (index == 3) {
            str1 = "p6_1_title";
            str3 = "p6_2_title";
            var title1 = AssetsUtils.createBitmapByName(str1 + "_png");
            StageUtils.centerInParent(title1, this.bg.x, this.bg.y - 240, this.bg);
            this.container.addChild(title1);
            var icon1 = AssetsUtils.createBitmapByName("content3_3_png");
            StageUtils.centerInParent(icon1, this.bg.x, this.bg.y - 70, this.bg);
            this.container.addChild(icon1);
            var icon2 = AssetsUtils.createBitmapByName("content3_4_png");
            StageUtils.centerInParent(icon2, this.bg.x, this.bg.y + 200, this.bg);
            this.container.addChild(icon2);
            var arrow = AssetsUtils.createBitmapByName("content_arrow_png");
            StageUtils.centerInParent(arrow, this.bg.x, this.bg.y + 400, this.bg);
            this.container.addChild(arrow);
            icon1.alpha = 0;
            icon2.alpha = 0;
            var temp1 = icon1.y;
            var temp2 = icon2.y;
            icon1.y = num;
            icon2.y = num;
            egret.Tween.get(icon1).to({ y: temp1, alpha: 1 }, 500);
            egret.Tween.get(icon2).wait(500).to({ y: temp2, alpha: 1 }, 500);
            var title2 = AssetsUtils.createBitmapByName(str3 + "_png");
            StageUtils.centerInParent(title2, this.bg.x, this.bg.y - 240 + num, this.bg);
            this.container.addChild(title2);
            var icon3 = AssetsUtils.createBitmapByName("content3_1_png");
            StageUtils.centerInParent(icon3, this.bg.x, this.bg.y + 10 + num, this.bg);
            this.container.addChild(icon3);
            var icon4 = AssetsUtils.createBitmapByName("content3_2_png");
            StageUtils.centerInParent(icon4, this.bg.x, this.bg.y + 290 + num, this.bg);
            this.container.addChild(icon4);
            icon3.alpha = 0;
            icon4.alpha = 0;
            this.icon3 = icon3;
            this.icon4 = icon4;
        }
        else if (index == 4) {
        }
        else if (index == 5) {
            str1 = "p8_1_title";
            str3 = "p4_2_title";
            var title1 = AssetsUtils.createBitmapByName(str1 + "_png");
            StageUtils.centerInParent(title1, this.bg.x, this.bg.y - 240, this.bg);
            this.container.addChild(title1);
            this.bg1_1 = AssetsUtils.createBitmapByName("p2_yuan_png");
            StageUtils.centerInParent(this.bg1_1, this.bg.x, this.bg.y + 50, this.bg);
            this.container.addChild(this.bg1_1);
            var icon1 = AssetsUtils.createBitmapByName("content5_1_png");
            StageUtils.centerInParent(icon1, this.bg.x, this.bg.y + 60, this.bg);
            this.container.addChild(icon1);
            var icon2 = AssetsUtils.createBitmapByName("content5_2_png");
            StageUtils.centerInParent(icon2, this.bg.x, this.bg.y - 110, this.bg);
            this.container.addChild(icon2);
            var icon3 = AssetsUtils.createBitmapByName("content5_3_png");
            StageUtils.centerInParent(icon3, this.bg.x + 150, this.bg.y - 120, this.bg);
            this.container.addChild(icon3);
            var icon4 = AssetsUtils.createBitmapByName("content5_4_png");
            StageUtils.centerInParent(icon4, this.bg.x + 220, this.bg.y + 110, this.bg);
            this.container.addChild(icon4);
            var icon5 = AssetsUtils.createBitmapByName("content5_5_png");
            StageUtils.centerInParent(icon5, this.bg.x + 140, this.bg.y + 270, this.bg);
            this.container.addChild(icon5);
            var icon6 = AssetsUtils.createBitmapByName("content5_6_png");
            StageUtils.centerInParent(icon6, this.bg.x - 140, this.bg.y + 270, this.bg);
            this.container.addChild(icon6);
            var icon7 = AssetsUtils.createBitmapByName("content5_7_png");
            StageUtils.centerInParent(icon7, this.bg.x - 220, this.bg.y + 110, this.bg);
            this.container.addChild(icon7);
            var arrow = AssetsUtils.createBitmapByName("content_arrow_png");
            StageUtils.centerInParent(arrow, this.bg.x, this.bg.y + 400, this.bg);
            this.container.addChild(arrow);
            icon1.alpha = 0;
            icon2.alpha = 0;
            icon3.alpha = 0;
            icon4.alpha = 0;
            icon5.alpha = 0;
            icon6.alpha = 0;
            icon7.alpha = 0;
            // this.icon1 = icon1;
            // this.icon2 = icon2;
            // this.icon3 = icon3;
            // this.icon4 = icon4;
            // this.icon5 = icon5;
            // this.icon6 = icon6;
            // this.icon7 = icon7;
            egret.Tween.get(icon1).to({ alpha: 1 }, 200);
            egret.Tween.get(icon2).wait(200).to({ alpha: 1 }, 200);
            egret.Tween.get(icon4).wait(400).to({ alpha: 1 }, 200);
            egret.Tween.get(icon3).wait(600).to({ alpha: 1 }, 200);
            egret.Tween.get(icon7).wait(200).to({ alpha: 1 }, 200);
            egret.Tween.get(icon6).wait(400).to({ alpha: 1 }, 200);
            egret.Tween.get(icon5).wait(600).to({ alpha: 1 }, 200);
            this.maskBg = new egret.Shape();
            this.maskBg.graphics.beginFill(0x000000);
            this.maskBg.graphics.drawCircle(230, 230, 1);
            this.maskBg.graphics.endFill();
            this.maskBg.x = (StageUtils.stage.stageWidth - 460 >> 1);
            this.maskBg.y = (StageUtils.stage.stageHeight - 460 >> 1) + 50;
            this.container.addChild(this.maskBg);
            this.bg1_1.mask = this.maskBg;
            this.angle = 360;
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            var title2 = AssetsUtils.createBitmapByName(str3 + "_png");
            StageUtils.centerInParent(title2, this.bg.x, this.bg.y - 240 + num, this.bg);
            this.container.addChild(title2);
            var icon8 = AssetsUtils.createBitmapByName("content5_8_png");
            StageUtils.centerInParent(icon8, this.bg.x, this.bg.y - 100 + num, this.bg);
            this.container.addChild(icon8);
            var icon9 = AssetsUtils.createBitmapByName("content5_9_png");
            StageUtils.centerInParent(icon9, this.bg.x, this.bg.y + 140 + num, this.bg);
            this.container.addChild(icon9);
            var icon10 = AssetsUtils.createBitmapByName("content5_10_png");
            StageUtils.centerInParent(icon10, this.bg.x, this.bg.y + 380 + num, this.bg);
            this.container.addChild(icon10);
            icon8.alpha = 0;
            icon9.alpha = 0;
            icon10.alpha = 0;
            this.icon8 = icon8;
            this.icon9 = icon9;
            this.icon10 = icon10;
        }
        // var title1:egret.Bitmap = AssetsUtils.createBitmapByName(str1 + "_png");
        // StageUtils.centerInParent(title1,this.bg.x,this.bg.y - 240,this.bg);
        // this.addChild(title1);
        // var content1:egret.Bitmap = AssetsUtils.createBitmapByName(str2 + "_png");
        // StageUtils.centerInParent(content1,this.bg.x,this.bg.y + 60,this.bg);
        // this.addChild(content1);
        // var title2:egret.Bitmap = AssetsUtils.createBitmapByName(str3 + "_png");
        // StageUtils.centerInParent(title2,this.bg1.x,this.bg1.y - 240,this.bg1);
        // this.addChild(title2);
        // var content2:egret.Bitmap = AssetsUtils.createBitmapByName(str4 + "_png");
        // StageUtils.centerInParent(content2,this.bg1.x,this.bg1.y + 60,this.bg1);
        // this.addChild(content2);
    };
    ContentView.prototype.enterFrameHandler = function () {
        this.angle -= 8;
        var tx = 230 * Math.cos(this.angle * Math.PI);
        var ty = 230 * Math.sin(this.angle * Math.PI);
        this.maskBg.graphics.clear();
        this.maskBg.graphics.beginFill(0xff0000);
        this.maskBg.graphics.moveTo(230, 230); //绘制点移动(r, r)点
        this.maskBg.graphics.lineTo(460, 230); //画线到弧的起始点
        this.maskBg.graphics.drawArc(230, 230, 230, 0, this.angle * Math.PI / 180, true); //从起始点顺时针画弧到终点
        this.maskBg.graphics.lineTo(230, 230); //从终点画线到圆形。到此扇形的封闭区域形成
        this.maskBg.graphics.lineTo(0, 230); //从终点画线到圆形。到此扇形的封闭区域形成
        this.maskBg.graphics.drawArc(230, 230, 230, (this.angle - 180) * Math.PI / 180, Math.PI, false); //从起始点顺时针画弧到终点
        this.maskBg.graphics.lineTo(230, 230); //从终点画线到圆形。到此扇形的封闭区域形成
        this.maskBg.graphics.endFill();
        if (this.angle < 180) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
        console.log(this.angle);
    };
    ContentView.prototype.movePage = function (select) {
        this.select = select;
        console.log(select);
        // if(select == 0)
        // {
        // 	egret.Tween.get(this).to({y:this.y1},500,egret.Ease.circOut);
        // }else
        // {
        // 	egret.Tween.get(this).to({y:this.y2},500,egret.Ease.circOut);
        // }
    };
    return ContentView;
}(egret.DisplayObjectContainer));
__reflect(ContentView.prototype, "ContentView");
//# sourceMappingURL=ContentView.js.map