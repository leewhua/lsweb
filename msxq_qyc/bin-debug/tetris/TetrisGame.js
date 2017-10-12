var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TetrisGame = (function (_super) {
    __extends(TetrisGame, _super);
    function TetrisGame() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.step = 0;
        _this.ok18 = false;
        _this.ok19 = false;
        _this.initLine();
        return _this;
    }
    TetrisGame.prototype.initLine = function () {
        var bg = Global.createBitmapByName("kuang_png");
        bg.width = TetrisGame.maxW + 8;
        bg.height = TetrisGame.maxH + 8;
        bg.x = (StageUtils.SW - bg.width >> 1) - 4;
        bg.y = (StageUtils.SH - bg.height >> 1) - 4;
        this.addChild(bg);
        TetrisGame.initX = bg.x + 4;
        TetrisGame.initY = bg.y + 4;
        this.boxContainer = new egret.DisplayObjectContainer();
        this.boxContainer.x = TetrisGame.initX;
        this.boxContainer.y = TetrisGame.initY;
        this.addChild(this.boxContainer);
        for (var i = 0; i < 20; i++) {
            var line = new egret.Shape();
            line.graphics.lineStyle(2, 0xffffff, 0.5);
            line.graphics.moveTo(0, i * TetrisGame.size);
            line.graphics.lineTo(TetrisGame.maxW, i * TetrisGame.size);
            line.graphics.endFill();
            this.boxContainer.addChild(line);
        }
        for (var i = 0; i < 10; i++) {
            var line = new egret.Shape();
            line.graphics.lineStyle(2, 0xffffff, 0.5);
            line.graphics.moveTo(i * TetrisGame.size, 0);
            line.graphics.lineTo(i * TetrisGame.size, TetrisGame.maxH);
            line.graphics.endFill();
            this.boxContainer.addChild(line);
        }
        // var box = new ItemBox();
        // box.init(5,1);
        // box.refreshPos(3,0);
        // // box.x = TetrisGame.initX + 200;
        // // box.y = TetrisGame.initY + 500;
        // this.boxContainer.addChild(box);
        // var box = new ItemBox();
        // box.init(5,4);
        // box.refreshPos(3,0);
        // // box.x = TetrisGame.initX + 200;
        // // box.y = TetrisGame.initY + 500;
        // this.boxContainer.addChild(box);
        this.list = [];
        for (var i = 0; i < 20; i++) {
            var itemList = [];
            for (var j = 0; j < 10; j++) {
                itemList[j] = 0;
            }
            this.list.push(itemList);
        }
        this.boxList = {};
        this.txtScore = new egret.TextField();
        this.txtScore.textColor = 0x000000;
        this.txtScore.text = "score:0";
        this.addChild(this.txtScore);
        this.txtStep = new egret.TextField();
        this.txtStep.textColor = 0xff00ff;
        this.txtStep.text = "step:0";
        this.txtStep.y = 50;
        this.addChild(this.txtStep);
        this.initEvent();
        this.randomBox();
        this.initData();
        this.stepTimer = new egret.Timer(500);
        this.stepTimer.addEventListener(egret.TimerEvent.TIMER, this.stepTimerHandler, this);
        this.stepTimer.start();
    };
    TetrisGame.prototype.initData = function () {
        // this.list[17] = [1,1,1,1,1,1,1,1,1,1];
        // for(var i = 0;i<10;i++)
        // {
        // 	var gray = Global.createBitmapByName("box_gray_png");
        // 	gray.x = i * TetrisGame.size;
        // 	gray.y = 17 * TetrisGame.size;
        // 	this.boxContainer.addChild(gray);
        // 	this.boxList[17+"_"+i] = gray;
        // }
        for (var i = 16; i < 20; i++) {
            var itemList = this.list[i];
            var itemLen = itemList.length;
            for (var j = 0; j < itemLen; j++) {
                itemList[j] = Math.floor(Math.random() * 2);
                if (itemList[j] > 0) {
                    var t = Math.ceil(Math.random() * 7);
                    var index = Math.ceil(Math.random() * 4);
                    var gray = Global.createBitmapByName(t + "_" + index + "_png");
                    gray.x = j * TetrisGame.size;
                    gray.y = i * TetrisGame.size;
                    this.boxContainer.addChild(gray);
                    this.boxList[i + "_" + j] = gray;
                }
            }
        }
        this.list[18][4] = 1;
        this.list[18][5] = 1;
        this.list[19][4] = 1;
        this.list[19][5] = 1;
        var item = this.boxList["18_4"];
        if (item) {
            item.texture = RES.getRes("box_red_png");
        }
        else {
            item = Global.createBitmapByName("box_red_png");
            item.x = 4 * TetrisGame.size;
            item.y = 18 * TetrisGame.size;
            this.boxContainer.addChild(item);
            this.boxList["18_4"] = item;
        }
        var item = this.boxList["18_5"];
        if (item) {
            item.texture = RES.getRes("box_red_png");
        }
        else {
            item = Global.createBitmapByName("box_red_png");
            item.x = 5 * TetrisGame.size;
            item.y = 18 * TetrisGame.size;
            this.boxContainer.addChild(item);
            this.boxList["18_5"] = item;
        }
        var item = this.boxList["19_4"];
        if (item) {
            item.texture = RES.getRes("box_red_png");
        }
        else {
            item = Global.createBitmapByName("box_red_png");
            item.x = 4 * TetrisGame.size;
            item.y = 19 * TetrisGame.size;
            this.boxContainer.addChild(item);
            this.boxList["19_4"] = item;
        }
        var item = this.boxList["19_5"];
        if (item) {
            item.texture = RES.getRes("box_red_png");
        }
        else {
            item = Global.createBitmapByName("box_red_png");
            item.x = 5 * TetrisGame.size;
            item.y = 19 * TetrisGame.size;
            this.boxContainer.addChild(item);
            this.boxList["19_5"] = item;
        }
    };
    TetrisGame.prototype.stepTimerHandler = function () {
        this.downBox();
    };
    TetrisGame.prototype.initEvent = function () {
        var arr1 = Global.createBitmapByName("arrow_png");
        arr1.rotation = 180;
        arr1.x = arr1.width;
        arr1.y = StageUtils.SH - arr1.height * 1 - 50;
        this.addChild(arr1);
        var arr2 = Global.createBitmapByName("arrow_png");
        arr2.x = StageUtils.SW - arr2.width;
        arr2.y = StageUtils.SH - arr2.height * 2 - 50;
        this.addChild(arr2);
        var arr3 = Global.createBitmapByName("arrow_png");
        arr3.rotation = 270;
        arr3.x = 0;
        arr3.y = StageUtils.SH - 25;
        this.addChild(arr3);
        var arr4 = Global.createBitmapByName("arrow_png");
        arr4.rotation = 90;
        arr4.x = StageUtils.SW;
        arr4.y = StageUtils.SH - arr4.height * 1 - 25;
        this.addChild(arr4);
        arr1.touchEnabled = true;
        arr2.touchEnabled = true;
        arr3.touchEnabled = true;
        arr4.touchEnabled = true;
        Global.setBut(arr1);
        Global.setBut(arr2);
        Global.setBut(arr3);
        Global.setBut(arr4);
        arr1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftHandler, this);
        arr2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightHandler, this);
        arr3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upHandler, this);
        arr4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        arr4.addEventListener(egret.TouchEvent.TOUCH_END, this.downEndHandler, this);
        arr4.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.downEndHandler, this);
        arr4.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.downEndHandler, this);
    };
    TetrisGame.prototype.leftHandler = function () {
        if (this.select) {
            this.select.px--;
            if (this.check(this.select, this.select.list)) {
                // this.updateList(this.select);
                this.select.refreshPos(this.select.px, this.select.py);
            }
            else {
                this.select.px++;
            }
        }
    };
    TetrisGame.prototype.rightHandler = function () {
        if (this.select) {
            this.select.px++;
            if (this.check(this.select, this.select.list)) {
                // this.updateList(this.select);
                this.select.refreshPos(this.select.px, this.select.py);
            }
            else {
                this.select.px--;
            }
        }
    };
    TetrisGame.prototype.upHandler = function () {
        if (this.select) {
            var list = this.select.preDir();
            if (this.check(this.select, list)) {
                this.select.changeDir();
            }
        }
    };
    TetrisGame.prototype.downHandler = function () {
        this.stepTimer.delay = 50;
    };
    TetrisGame.prototype.downEndHandler = function () {
        this.stepTimer.delay = 500;
    };
    TetrisGame.prototype.downBox = function () {
        if (this.select) {
            this.select.py++;
            if (this.check(this.select, this.select.list)) {
                // this.updateList(this.select);
                this.select.refreshPos(this.select.px, this.select.py);
            }
            else {
                this.select.py--;
                this.updateList(this.select);
                this.boxContainer.removeChild(this.select);
                this.select = null;
                this.checkScore();
                this.randomBox();
            }
        }
    };
    TetrisGame.prototype.checkScore = function () {
        var num = 0;
        var len = this.list.length;
        for (var i = 0; i < len; i++) {
            var itemList = this.list[i];
            var itemLen = itemList.length;
            var bl = true;
            for (var j = 0; j < itemLen; j++) {
                if (itemList[j] == 0) {
                    bl = false;
                    break;
                }
            }
            if (bl) {
                for (var j = 0; j < itemLen; j++) {
                    var item = this.boxList[i + "_" + j];
                    if (item) {
                        this.boxContainer.removeChild(item);
                        delete this.boxList[i + "_" + j];
                    }
                }
                this.listDownMove(i);
                num++;
                if (i == 18) {
                    this.ok18 = true;
                }
                else if (i == 19) {
                    this.ok19 = true;
                }
                if (this.ok18 && this.ok19) {
                    this.stepTimer.stop();
                    alert("pass:" + this.step + "步," + this.score + "分");
                }
            }
        }
        this.score += num * 1000;
        this.txtScore.text = "score:" + this.score;
    };
    TetrisGame.prototype.listDownMove = function (index) {
        var len = this.list.length;
        for (var i = index; i > 0; i--) {
            var itemList = this.list[i];
            var lastList = this.list[i - 1];
            var itemLen = itemList.length;
            for (var j = 0; j < itemLen; j++) {
                var item = this.boxList[(i - 1) + "_" + j];
                if (item) {
                    item.x = j * TetrisGame.size + (item.width >> 1);
                    item.y = i * TetrisGame.size + (item.height >> 1);
                }
                itemList[j] = lastList[j];
                if (item) {
                    this.boxList[i + "_" + j] = item;
                }
                else {
                    delete this.boxList[i + "_" + j];
                }
                delete this.boxList[(i - 1) + "_" + j];
            }
        }
    };
    TetrisGame.prototype.check = function (item, list) {
        if (item.getButtomIndex() > 20) {
            return false;
        }
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var itemList = list[i];
            var itemLen = itemList.length;
            for (var j = 0; j < itemLen; j++) {
                if (list[i][j] > 0) {
                    try {
                        if (item.py + i >= TetrisGame.hNum) {
                            return false;
                        }
                        else if (item.px + j < 0 || item.px + j > TetrisGame.wNum - 1) {
                            return false;
                        }
                        else if (this.list[item.py + i][item.px + j] > 0) {
                            return false;
                        }
                    }
                    catch (error) {
                        console.log("sdf");
                    }
                }
            }
        }
        return true;
    };
    TetrisGame.prototype.randomBox = function () {
        var type = Math.ceil(Math.random() * 7);
        // var type = 2;
        var item = new ItemBox();
        item.init(type, 1);
        item.refreshPos(3, 0);
        this.boxContainer.addChild(item);
        if (this.check(item, item.list)) {
            this.select = item;
        }
        else {
            alert("over:" + this.step + "步," + this.score + "分");
            this.stepTimer.stop();
        }
        this.step++;
        this.txtStep.text = "step:" + this.step;
    };
    TetrisGame.prototype.updateList = function (item) {
        var list = item.list;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var itemList = list[i];
            var itemLen = itemList.length;
            for (var j = 0; j < itemLen; j++) {
                var val = itemList[j];
                if (val) {
                    this.list[item.py + i][item.px + j] = val;
                    var gray = Global.createBitmapByName(item.type + "_" + val + "_png");
                    gray.anchorOffsetX = gray.width >> 1;
                    gray.anchorOffsetY = gray.height >> 1;
                    gray.x = (item.px + j) * TetrisGame.size + (gray.width >> 1);
                    gray.y = (item.py + i) * TetrisGame.size + (gray.height >> 1);
                    gray.rotation = item.icon.rotation;
                    this.boxContainer.addChild(gray);
                    this.boxList[(item.py + i) + "_" + (item.px + j)] = gray;
                }
            }
        }
    };
    return TetrisGame;
}(egret.DisplayObjectContainer));
TetrisGame.maxW = 500;
TetrisGame.maxH = 1000;
TetrisGame.wNum = 10;
TetrisGame.hNum = 20;
TetrisGame.size = 50;
__reflect(TetrisGame.prototype, "TetrisGame");
//# sourceMappingURL=TetrisGame.js.map