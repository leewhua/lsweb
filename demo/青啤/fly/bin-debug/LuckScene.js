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
var LuckScene = (function (_super) {
    __extends(LuckScene, _super);
    function LuckScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    LuckScene.prototype.onAddToStage = function (event) {
        //初始化intro
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = Main.createBitmapByName("luck_bg_jpg");
        this.winbar = new Middle(Main.createBitmapByName('win_bar_png'));
        this.receive = new Middle(Main.createBitmapByName('receive_png'));
        var help = new Middle(Main.createBitmapByName('help_png'));
        var slog = new Middle(Main.createBitmapByName('slog_png'));
        var logo = Main.createBitmapByName('logo_png');
        this.luckTxt = new egret.TextField();
        this.luckTxt.width = 320;
        this.luckTxt.textColor = 0xed1b23;
        this.luckTxt.textAlign = 'center';
        this.luckTxt.text = "您已获得1元红包！";
        this.luckTxt.size = 32;
        this.luckTxt.x = -160;
        this.luckTxt.y = 108;
        this.butCopy = new egret.TextField();
        this.butCopy.textAlign = "center";
        this.butCopy.width = 500;
        this.butCopy.textColor = 0xffffff;
        this.butCopy.size = 32;
        this.butCopy.text = "点击领取\n还有机会赢得更多现金红包";
        var winSp = new Middle(this.butCopy);
        winSp.x = 320;
        winSp.y = 760;
        winSp.alpha = 0;
        this.winbar.addChild(this.luckTxt);
        this.addChild(bg);
        this.addChild(slog);
        this.addChild(this.winbar);
        this.addChild(winSp);
        this.addChild(this.receive);
        this.addChild(help);
        this.addChild(logo);
        slog.x = 320;
        slog.y = 220;
        this.winbar.x = 320;
        this.winbar.y = 540;
        this.receive.x = 320;
        this.receive.y = 860;
        help.x = 320;
        help.y = 960;
        slog.alpha = this.winbar.alpha = this.receive.alpha = help.alpha = 0;
        Main.zoomIn(slog, 500, 400, .6);
        Main.zoomIn(this.winbar, 600, 400, .6);
        Main.zoomIn(winSp, 700, 400, .6);
        Main.zoomIn(this.receive, 800, 400, .6);
        Main.zoomIn(help, 900, 400, .6);
        Main.setBut(this.receive);
        this.receive.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.receive.touchEnabled = false;
            this.loadLuck();
            //this.parent.dispatchEvent(new EventObj('event','help'));
        }, this);
        Main.setBut(help);
        help.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            Main._main.dispatchEvent(new EventObj('event', 'help'));
        }, this);
    };
    LuckScene.prototype.saveOk = function () {
        console.log("saveOk");
        this.luckTxt.text = "领取成功";
        Main.zoomOut(this.butCopy.parent, 100, 400, 1.6);
        Main.zoomOut(this.receive, 200, 400, 1.6);
        var butCopy = new egret.TextField();
        butCopy.textAlign = "center";
        butCopy.width = 500;
        butCopy.textColor = 0xffffff;
        butCopy.size = 32;
        butCopy.text = "您已经成功领取1元红包";
        var winSp = new Middle(butCopy);
        winSp.x = 320;
        winSp.y = 760;
        winSp.alpha = 0;
        var butCopy2 = new egret.TextField();
        butCopy2.textAlign = "center";
        butCopy2.width = 500;
        butCopy2.textColor = 0xffffff;
        butCopy2.size = 20;
        butCopy2.text = "红包将于24小时内到账";
        var winSp2 = new Middle(butCopy2);
        winSp2.x = 320;
        winSp2.y = 800;
        winSp.alpha = winSp2.alpha = 0;
        Main.zoomIn(winSp, 400, 400, .6);
        Main.zoomIn(winSp2, 500, 400, .6);
        //this.winbar.addChild(luckTxt);
        this.addChild(winSp);
        this.addChild(winSp2);
        setTimeout(function () {
            Main._main.dispatchEvent(new EventObj('event', 'to_map'));
        }, 2000);
    };
    LuckScene.prototype.loadUser = function () {
        console.log("loadUser");
        //
        var _this1 = this;
        $.ajax({
            url: Main.user_api,
            data: { ticket: Main.user_ticket, desc: "test" },
            success: function (data) {
                if (data.result == 'success') {
                    data.nickname = decodeURIComponent(data.nickname);
                    data.city = decodeURIComponent(data.city);
                    Main.user = data;
                    _this1.saveOk();
                }
                else {
                    Main.showLost(2);
                }
            },
            error: function () {
                Main.showLost(400);
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    Main.showLost(502);
                }
            }
        });
    };
    LuckScene.prototype.loadLuck = function () {
        var _this1 = this;
        if (Main.isTest) {
            _this1.saveOk();
            //Main._main.dispatchEvent(new EventObj('event','to_map'));
            return;
        }
        $.ajax({
            url: Main.api,
            data: { ticket: Main.status_ticket, desc: "蓄能红包" },
            success: function (data) {
                if (data.result == 'success') {
                    var more = data.more;
                    if (more.result == 'success') {
                        if (more.reason && more.reason.indexOf('failedtransfer') > 0) {
                        }
                        else {
                            Main.status_ticket = more.ticket;
                            _this1.loadUser();
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
    return LuckScene;
}(egret.DisplayObjectContainer));
__reflect(LuckScene.prototype, "LuckScene");
//# sourceMappingURL=LuckScene.js.map