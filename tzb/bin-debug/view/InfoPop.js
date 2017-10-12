var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoPop = (function (_super) {
    __extends(InfoPop, _super);
    function InfoPop() {
        return _super.call(this) || this;
    }
    InfoPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        var bg = new CustomImage("resource/assets/asyn/info_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        this.container.addChild(bg);
        var share = Global.createBitmapByName("btn_input_png");
        share.x = StageUtils.SW - share.width >> 1;
        share.y = 870;
        this.container.addChild(share);
        Global.setBut(share);
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareHandler, this);
    };
    InfoPop.prototype.shareHandler = function () {
        // alert("click");
        var self = this;
        // self.initInputView();
        var weixin = eval("wx");
        weixin.openAddress({
            success: function (data) {
                // alert(data);
                var username = data.userName;
                var phone = data.telNumber;
                // var address = data.cityName + "" + data.countryName + "" + data.detailInfo;
                var address = data.cityName + "" + data.countryName;
                if (phone.length != 11) {
                    Message.show("手机号必须为11位！");
                }
                else if (username && phone && address) {
                    self.submit(username, phone, address);
                }
                else {
                    Message.show("请填写全部信息!");
                }
            },
            cancel: function () {
                // Message.show("取消");
                // 用户取消 拉出地址
                self.initInputView();
            }
        });
    };
    InfoPop.prototype.submitHandler = function () {
        var username = this.txtName.text.trim();
        var phone = this.txtPhone.text.trim();
        var city = this.txtCity.text.trim();
        var qu = this.txtQu.text.trim();
        if (phone.length != 11) {
            Message.show("手机号必须为11位！");
        }
        else if (username && phone && city && qu) {
            this.submit(username, phone, city + "" + qu);
        }
        else {
            Message.show("请填写完整信息！");
        }
    };
    InfoPop.prototype.initInputView = function () {
        var self = this;
        self.container.removeChildren();
        var bg = new CustomImage("resource/assets/asyn/info_bg_copy.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = StageUtils.SH - bg.height >> 1;
        });
        self.container.addChild(bg);
        var share = Global.createBitmapByName("btn_ok_png");
        share.x = StageUtils.SW - share.width >> 1;
        share.y = 870;
        self.container.addChild(share);
        Global.setBut(share);
        share.addEventListener(egret.TouchEvent.TOUCH_TAP, self.submitHandler, self);
        self.txtName = new egret.TextField();
        self.txtName.type = egret.TextFieldType.INPUT;
        self.txtName.x = 185;
        self.txtName.y = 382;
        self.txtName.width = 350;
        // self.txtName.height = 50;
        // self.txtName.border = true;
        // self.txtName.borderColor = 0xffffff;
        self.container.addChild(self.txtName);
        self.txtPhone = new egret.TextField();
        self.txtPhone.type = egret.TextFieldType.INPUT;
        self.txtPhone.x = 185;
        self.txtPhone.y = 496;
        self.txtPhone.width = 350;
        // self.txtPhone.height = 50;
        self.txtPhone.maxChars = 11;
        self.txtPhone.restrict = "0-9";
        self.container.addChild(self.txtPhone);
        // self.txtPhone.border = true;
        // self.txtPhone.borderColor = 0xffffff;
        self.txtCity = new egret.TextField();
        self.txtCity.type = egret.TextFieldType.INPUT;
        self.txtCity.x = 250;
        self.txtCity.y = 602;
        self.txtCity.width = 300;
        // self.txtIDCARD.height = 50;
        self.container.addChild(self.txtCity);
        // self.txtCity.border = true;
        // self.txtCity.borderColor = 0xffffff;
        self.txtQu = new egret.TextField();
        self.txtQu.type = egret.TextFieldType.INPUT;
        self.txtQu.x = 200;
        self.txtQu.y = 710;
        self.txtQu.width = 350;
        // self.txtPhone.height = 50;
        self.container.addChild(self.txtQu);
        // self.txtQu.border = true;
        // self.txtQu.borderColor = 0xffffff;
    };
    InfoPop.prototype.submit = function (username, phone, address) {
        var address1 = username + "," + phone + "," + address;
        var ADDR = sessionStorage.getItem("addr");
        var confirm;
        if (Main.step == "cashed") {
            confirm = sessionStorage.getItem("confirmticket0");
        }
        else {
            confirm = sessionStorage.getItem("confirmticket");
        }
        $.ajax({
            url: sessionStorage.getItem("interface"),
            data: { ticket: confirm, ADDR: address1 },
            success: function (data) {
                if (data.result == "success") {
                    // if(data.more.result == "success")
                    // {
                    // alert(data.result);
                    PopManager.hidePop("InfoPop");
                    PopManager.showPop("OkPop");
                    sessionStorage.setItem("confirmticket2", data.prize.ticket);
                }
                else {
                    // Message.show(data.reason);
                    PopManager.showPop("ErrorPop", 2);
                }
            },
            error: function () {
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                }
            }
        });
    };
    return InfoPop;
}(PopView));
__reflect(InfoPop.prototype, "InfoPop");
//# sourceMappingURL=InfoPop.js.map