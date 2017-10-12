var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GetShareOKPop = (function (_super) {
    __extends(GetShareOKPop, _super);
    function GetShareOKPop() {
        return _super.call(this) || this;
    }
    GetShareOKPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/get_share_ok.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        var btnDuihuan = Global.createBitmapByName("btn_select_info_png");
        btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        btnDuihuan.y = 350;
        this.addChild(btnDuihuan);
        Global.setBut(btnDuihuan);
        btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
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
    };
    GetShareOKPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("GetShareOKPop");
        PopManager.showPop("InfoPop");
    };
    return GetShareOKPop;
}(PopView));
__reflect(GetShareOKPop.prototype, "GetShareOKPop");
//# sourceMappingURL=GetShareOKPop.js.map