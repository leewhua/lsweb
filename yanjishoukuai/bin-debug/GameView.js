var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.init();
        _this.addEvent();
        return _this;
    }
    GameView.prototype.init = function () {
        var bg = Global.createBitmapByName("game_bg_png");
        bg.width = StageUtils.stage.stageWidth;
        bg.height = StageUtils.stage.stageHeight;
        this.addChild(bg);
        var box = Global.createBitmapByName("game_box_png");
        StageUtils.centerInParent(box, 0, -130);
        this.addChild(box);
        var logo = Global.createBitmapByName(Main.product_type + "_json.logo-blue");
        StageUtils.centerInParent(logo, 0, -500);
        this.addChild(logo);
        this.propList = new PropListView();
        this.addChild(this.propList);
        this.lastTime = new LastTimeView();
        StageUtils.centerInParent(this.lastTime, -130, 450);
        this.addChild(this.lastTime);
        this.lastTime.play();
        var tip = Global.createBitmapByName("game_tip_png");
        StageUtils.centerInParent(tip, -40, 230);
        this.addChild(tip);
        var self = this;
        setTimeout(function () {
            self.removeChild(tip);
        }, 4000);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timerIndex = 0;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        var man = ManView.getInstance();
        man.x = 550;
        man.y = 900;
        man.stand();
        this.addChild(man);
    };
    GameView.prototype.addMoveProp = function (data) {
        var id = data.id;
        var x = data.x;
        var y = data.y;
        var man = ManView.getInstance();
        man.play();
        var prop = Global.createBitmapByName("prop" + id + "_png");
        prop.anchorOffsetX = prop.width >> 1;
        prop.anchorOffsetY = prop.height >> 1;
        prop.x = x;
        prop.y = y;
        this.container.addChild(prop);
        var self = this;
        egret.Tween.get(prop).to({ y: 900, rotation: Math.random() * 90 - 45 }, 500).call(function () {
            man.stand();
            man.addProp(prop);
        });
        egret.Tween.get(man).to({ x: x + 150 }, 400);
    };
    GameView.prototype.clickHandler = function () {
        if (this.tip && this.tip.parent) {
            this.removeChild(this.tip);
        }
    };
    GameView.prototype.timerHandler = function () {
        this.timerIndex++;
        if (this.timerIndex > 3) {
            if (!this.tip) {
                this.tip = new GameTipView();
            }
            this.addChild(this.tip);
            this.timerIndex = 0;
        }
    };
    GameView.prototype.addEvent = function () {
        GameDispatcher.instance.addEventListener("custom", this.customEventHandler, this);
    };
    GameView.prototype.customEventHandler = function (evt) {
        if (evt.name == "timer_go") {
            //倒计时结束
            this.propList.move(true);
            this.timer.start();
            if (!this.tip) {
                this.tip = new GameTipView();
            }
            this.addChild(this.tip);
            this.timerIndex = 0;
        }
        else if (evt.name == "item_click") {
            this.timerIndex = 0;
            this.addMoveProp(evt.data);
            // this.propList.removeSelect();
            // this.propList.randomGlow();
            // return;
            //商品点击
            var num = Math.ceil(Math.random() * 4);
            if (num == 1) {
                this.propList.move(false);
                this.saveLuck();
            }
            else {
                if (this.index >= 3) {
                    this.propList.move(false);
                    this.saveLuck();
                }
                else {
                    this.propList.removeSelect();
                    this.propList.randomGlow();
                }
            }
            this.index++;
        }
    };
    GameView.prototype.saveLuck = function () {
        var self = this;
        // if(this.inLuck) return;
        // this.inLuck = true;
        if (Main.isTest) {
            // self.saveOk = true;
            // Main.more = 3871;
            self.showEnd();
            return;
        }
        $.ajax({
            url: Main.PLAY_API,
            data: { ticket: Main.user_ticket, desc: "抽中红包" },
            success: function (data) {
                if (data.result == "success") {
                    if (data.prizes.length != 0) {
                        GameView.rewardData = data.prizes[0];
                        Main.user_ticket = data.prizes[0].ticket;
                        self.showEnd();
                    }
                    else {
                        Main.showLost(1);
                    }
                }
                else {
                    if (data.reason == "invalidticketparam") {
                        Main.showLost(21);
                    }
                    else if (data.reason == "invalidticket") {
                        Main.showLost(3);
                    }
                    else {
                        Main.showLost(1);
                    }
                }
            }, error: function () {
                Main.showLost(2);
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    Main.showLost(2);
                }
            }
        });
    };
    GameView.prototype.showEnd = function () {
        Main.showPop("EndView");
        this.timer.stop();
    };
    return GameView;
}(egret.DisplayObjectContainer));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map