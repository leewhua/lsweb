var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    EndView.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var bg = Global.createBitmapByName('pop_bg_png');
        StageUtils.centerInParent(bg);
        this.view.addChild(bg);
        if (Main.isTest) {
            var ran = Math.random();
            if (ran > 0.3) {
                GameView.rewardData = { desc: "cup" };
            }
            else if (ran > 0.6) {
                GameView.rewardData = { desc: "tshirt" };
            }
            else {
                GameView.rewardData = { desc: "thankyou" };
            }
        }
        var prizes = sessionStorage.getItem("yanjishoukuai");
        if (prizes) {
            prizes = eval('(' + prizes + ')');
            GameView.rewardData = prizes;
            console.log(prizes);
            if (GameView.rewardData.desc == "thankyou" || GameView.rewardData.id == -1) {
                var reward = new CustomImage("resource/assets/reward/thankyou.png", true, function () {
                    reward.x = StageUtils.SW - reward.width >> 1;
                    reward.y = StageUtils.SH - reward.height >> 1;
                });
                this.view.addChild(reward);
                return;
            }
            var reward = new CustomImage("resource/assets/reward/" + GameView.rewardData.desc + ".png", true, function () {
                reward.x = StageUtils.SW - reward.width >> 1;
                reward.y = StageUtils.SH - reward.height >> 1;
            });
            this.view.addChild(reward);
        }
        else {
            SoundManager.getInstance().play("open_mp3");
            if (GameView.rewardData.desc == "thankyou") {
                var reward = new CustomImage("resource/assets/reward/" + GameView.rewardData.desc + ".png", true, function () {
                    reward.x = StageUtils.SW - reward.width >> 1;
                    reward.y = StageUtils.SH - reward.height >> 1;
                });
                this.view.addChild(reward);
                return;
            }
            var reward = new CustomImage("resource/assets/reward/" + GameView.rewardData.desc + ".png", true, function () {
                reward.x = StageUtils.SW - reward.width >> 1;
                reward.y = StageUtils.SH - reward.height - 240;
            });
            this.view.addChild(reward);
        }
        var toReceive = Global.createBitmapByName('btn_get_png');
        toReceive.x = StageUtils.SW - toReceive.width >> 1;
        toReceive.y = StageUtils.SH - 100;
        this.view.addChild(toReceive);
        Global.setBut(toReceive);
        Global.zoomIn(toReceive, 0, 400, 0.6);
        toReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (GameView.rewardData.desc == "thankyou") {
            }
            else {
                Main.removePop("EndView");
                Main.showPop("SubmitView");
            }
        }, this);
    };
    EndView.prototype.gotoReward = function () {
        if (GameView.rewardData.length != 0) {
            window.location.href = "link";
        }
        else {
            Main.removePop("EndView");
            Main.showPop("SubmitView");
        }
    };
    EndView.prototype.saveLuck = function () {
        // var url = sessionStorage.getItem("kzw_href");
        // console.log(url);
        // window.location.href = GameView.rewardData.link;
        var self = this;
        $.ajax({
            url: Main.PLAY_API,
            data: { ticket: GameView.rewardData.ticket },
            success: function (data) {
                if (data.result == "success") {
                    if (data.prizes[0].require != "") {
                        var url = sessionStorage.getItem("kzw_href");
                        if (url) {
                            window.history.replaceState(null, null, url);
                        }
                        window.location.href = GameView.rewardData.link;
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
    return EndView;
}(PopUp));
__reflect(EndView.prototype, "EndView");
//# sourceMappingURL=EndView.js.map