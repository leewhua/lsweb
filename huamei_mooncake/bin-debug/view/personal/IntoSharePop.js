var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IntoSharePop = (function (_super) {
    __extends(IntoSharePop, _super);
    function IntoSharePop() {
        return _super.call(this) || this;
    }
    IntoSharePop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var list = data.sharelist;
        var len = list.length;
        var index = 0;
        for (var i = 0; i < len; i++) {
            if (list[i]) {
                var bg = new CustomImage("resource/assets/asyn/moontype/4/" + (i + 1) + ".png", true, function () {
                    bg.width = StageUtils.SW;
                    bg.height = StageUtils.SH;
                });
                this.addChild(bg);
            }
        }
        var btnDuihuan = Global.createBitmapByName("btn_share_4_png");
        btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        btnDuihuan.y = StageUtils.SH - 235;
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        // var btnShare = Global.createBitmapByName("btn_share_2_png");
        // btnShare.x = StageUtils.SW - btnShare.width - 36;
        // btnShare.y = StageUtils.SH - 165;
        // this.addChild(btnShare);
        // Global.setBut(btnShare);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
        // btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler,this);
        // var tips = Global.createBitmapByName("personal_tips_png");
        // tips.x = StageUtils.SW - tips.width >> 1;
        // tips.y = StageUtils.SH - 60;
        // this.addChild(tips);
        var self = this;
        $.ajax({
            url: Main.USER_INFO_API,
            data: { type: "eshareget", ticket: Main.USER_TICKET, eshareinfo: this.data.payorder },
            success: function (data) {
                // if(data.result == 0)
                // {
                // 	PopManager.hidePop("PersonalPop");
                // 	PopManager.showPop("SharePop",{eshareinfo:data.eshareinfo});
                // }else
                // {
                // 	Message.show(data.result);
                // }
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
        setTimeout(function () {
            PopManager.showPop("TipsPop", { url: "personal_tips_bg1_png", callback: function () { } });
        }, 500);
    };
    IntoSharePop.prototype.duihuanHandler = function () {
        PopManager.hidePop("IntoSharePop");
        PopManager.showPop("InfoPop");
        // PopManager.showPop("AddressPop",{type:2,ptype:this.data.payorder,sharelist:this.data.sharelist});
    };
    return IntoSharePop;
}(PopView));
__reflect(IntoSharePop.prototype, "IntoSharePop");
//# sourceMappingURL=IntoSharePop.js.map