var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangeIDPop = (function (_super) {
    __extends(ChangeIDPop, _super);
    function ChangeIDPop() {
        return _super.call(this) || this;
    }
    ChangeIDPop.prototype.show = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.7);
        bg.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
        bg.graphics.endFill();
        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        this.addChildAt(bg, 0);
        bg.alpha = 0;
        Global.fadeIn(bg);
        UIManager.instance.popLayer.addChild(this);
        this.touchEnabled = true;
    };
    ChangeIDPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var title = Global.createBitmapByName("change_id_png");
        title.x = StageUtils.SW - title.width >> 1;
        title.y = StageUtils.SH - title.height >> 1;
        this.addChild(title);
        var btnClose = Global.createBitmapByName("btn_change_close_png");
        btnClose.x = 515;
        btnClose.y = 210;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        var btnSubmit = Global.createBitmapByName("btn_change_submit_png");
        btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
        btnSubmit.y = (StageUtils.SH - btnSubmit.height >> 1) + 195;
        this.addChild(btnSubmit);
        Global.setBut(btnSubmit);
        btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);
        this.btnSubmit = btnSubmit;
        this.txtID = new egret.TextField();
        this.txtID.width = 270;
        this.txtID.fontFamily = "微软雅黑";
        this.txtID.type = egret.TextFieldType.INPUT;
        this.txtID.x = 240;
        this.txtID.y = 375;
        this.txtID.text = "请输入原用户名";
        this.txtID.size = 24;
        this.txtID.textColor = 0xC3C5C6;
        this.txtID.maxChars = 20;
        this.addChild(this.txtID);
        this.txtID.addEventListener(egret.FocusEvent.FOCUS_IN, this.idFocusInHandler, this);
        this.txtID.addEventListener(egret.FocusEvent.FOCUS_OUT, this.idFocusOutHandler, this);
        this.txtPW = new egret.TextField();
        this.txtPW.width = 270;
        this.txtPW.fontFamily = "微软雅黑";
        this.txtPW.type = egret.TextFieldType.INPUT;
        this.txtPW.x = 240;
        this.txtPW.y = 450;
        this.txtPW.text = "请输入密码";
        this.txtPW.size = 24;
        this.txtPW.textColor = 0xC3C5C6;
        this.txtPW.maxChars = 20;
        this.txtPW.inputType = egret.TextFieldInputType.PASSWORD;
        this.addChild(this.txtPW);
        this.txtPW.addEventListener(egret.FocusEvent.FOCUS_IN, this.pwFocusInHandler, this);
        this.txtPW.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pwFocusOutHandler, this);
        this.txtNewID = new egret.TextField();
        this.txtNewID.width = 270;
        this.txtNewID.fontFamily = "微软雅黑";
        this.txtNewID.type = egret.TextFieldType.INPUT;
        this.txtNewID.x = 240;
        this.txtNewID.y = 568;
        this.txtNewID.text = "请输入新用户名";
        this.txtNewID.size = 24;
        this.txtNewID.textColor = 0xC3C5C6;
        this.txtNewID.maxChars = 20;
        this.addChild(this.txtNewID);
        this.txtNewID.addEventListener(egret.FocusEvent.FOCUS_IN, this.newIDFocusInHandler, this);
        this.txtNewID.addEventListener(egret.FocusEvent.FOCUS_OUT, this.newIDFocusOutHandler, this);
    };
    ChangeIDPop.prototype.idFocusInHandler = function () {
        if (this.txtID.text == "请输入原用户名") {
            this.txtID.text = "";
        }
    };
    ChangeIDPop.prototype.idFocusOutHandler = function () {
        if (this.txtID.text == "") {
            this.txtID.text = "请输入原用户名";
        }
    };
    ChangeIDPop.prototype.pwFocusInHandler = function () {
        if (this.txtPW.text == "请输入密码") {
            this.txtPW.text = "";
            this.txtPW.displayAsPassword = true;
        }
        else {
            this.txtPW.displayAsPassword = false;
        }
    };
    ChangeIDPop.prototype.pwFocusOutHandler = function () {
        if (this.txtPW.text == "") {
            this.txtPW.text = "请输入密码";
            this.txtPW.displayAsPassword = false;
        }
        else {
            this.txtPW.displayAsPassword = true;
        }
    };
    ChangeIDPop.prototype.newIDFocusInHandler = function () {
        if (this.txtNewID.text == "请输入新用户名") {
            this.txtNewID.text = "";
        }
    };
    ChangeIDPop.prototype.newIDFocusOutHandler = function () {
        if (this.txtNewID.text == "") {
            this.txtNewID.text = "请输入新用户名";
        }
    };
    ChangeIDPop.prototype.closeHandler = function () {
        PopManager.hidePop("ChangeIDPop");
    };
    ChangeIDPop.prototype.submitHandler = function () {
        var id = this.txtID.text.trim();
        var pw = this.txtPW.text.trim();
        var newid = this.txtNewID.text.trim();
        if (!id || id == "请输入原用户名") {
            Message.show("请输入原用户名!");
        }
        else if (!pw || pw == "请输入密码") {
            Message.show("请输入密码!");
        }
        else if (!newid || newid == "请输入新用户名") {
            Message.show("请输入新用户名!");
        }
        else if (newid == id) {
            Message.show("新用户名不得与原用户名相同!");
        }
        else {
            var self = this;
            $.ajax({
                url: Main.USER_INFO_API,
                data: { type: "modifyinfo", ticket: Main.USER_TICKET, oldname: id, oldpassword: pw, newname: newid, newpassword: pw },
                success: function (data) {
                    if (data.result == 0) {
                        self.showResult(true);
                    }
                    else if (data.result == 1) {
                        Message.show("用户名或密码错误!");
                    }
                    else if (data.result == 2) {
                        Message.show("用户名或密码错误!");
                    }
                    else if (data.result == 3) {
                        Message.show("该用户名已被使用!");
                    }
                    else if (data.result == 4) {
                        Message.show("很抱歉，您不能修改用户名!");
                    }
                    else {
                        Message.show("系统异常:" + data.result);
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
    };
    ChangeIDPop.prototype.showResult = function (bl) {
        this.btnSubmit.visible = false;
        var str = "";
        if (bl) {
            str = "change_ok_png";
        }
        else {
            str = "change_no_png";
        }
        var result = Global.createBitmapByName(str);
        result.x = StageUtils.SW - result.width >> 1;
        result.y = this.btnSubmit.y + 10;
        this.addChild(result);
    };
    return ChangeIDPop;
}(PopView));
__reflect(ChangeIDPop.prototype, "ChangeIDPop");
//# sourceMappingURL=ChangeIDPop.js.map