var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PersonalPop = (function (_super) {
    __extends(PersonalPop, _super);
    function PersonalPop() {
        return _super.call(this) || this;
    }
    PersonalPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/moontype/1/" + data.ptype + ".png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnDuihuan = Global.createBitmapByName("btn_duihuan_png");
        btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        btnDuihuan.y = StageUtils.SH - 205;
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        if (data.isShare) {
            btnDuihuan.x = 36;
            var btnShare = Global.createBitmapByName("btn_share_png");
            btnShare.x = StageUtils.SW - btnShare.width - 36;
            btnShare.y = StageUtils.SH - 205;
            this.addChild(btnShare);
            Global.setBut(btnShare);
            btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
            console.log("true");
        }
        else {
            console.log("skip");
            btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        }
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
    };
    PersonalPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("PersonalPop");
        PopManager.showPop("AddressPop", this.data);
    };
    PersonalPop.prototype.shareHandler = function () {
        console.log("shareClick");
        if (this.data) {
            if (this.data.type == 0) {
                //纸卷
                var self = this;
                $.ajax({
                    url: Main.USER_INFO_API,
                    data: { type: "pshare", ticket: Main.USER_TICKET, ptype: this.data.ptype },
                    success: function (data) {
                        // console.log("112");
                        if (data.result == 0) {
                            PopManager.hidePop("PersonalPop");
                            PopManager.showPop("SharePop", { code: data.code });
                        }
                        else {
                            Message.show(data.result);
                        }
                    },
                    error: function () {
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                        }
                    }
                });
            }
            else {
                //电子卷
                var self = this;
                $.ajax({
                    url: Main.USER_INFO_API,
                    data: { type: "eshare", ticket: Main.USER_TICKET, ptype: this.data.ptype },
                    success: function (data) {
                        if (data.result == 0) {
                            PopManager.hidePop("PersonalPop");
                            PopManager.showPop("SharePop", { eshareinfo: data.eshareinfo, time: data.sharetime });
                        }
                        else {
                            Message.show(data.result);
                        }
                    },
                    error: function () {
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                        }
                    }
                });
            }
        }
    };
    return PersonalPop;
}(PopView));
__reflect(PersonalPop.prototype, "PersonalPop");
//# sourceMappingURL=PersonalPop.js.map