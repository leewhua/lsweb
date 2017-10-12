var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AddressPop = (function (_super) {
    __extends(AddressPop, _super);
    // public confirmAdd:ConfirmAddress;
    function AddressPop() {
        return _super.call(this) || this;
    }
    AddressPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new CustomImage("resource/assets/asyn/address_bg.png", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        if (data.sharelist) {
            var container = new egret.DisplayObjectContainer();
            this.addChild(container);
            var len = data.sharelist.length;
            var list = [];
            for (i = 0; i < len; i++) {
                if (data.sharelist[i]) {
                    list.push(data.sharelist[i]);
                }
            }
            len = list.length;
            for (var i = 0; i < len; i++) {
                var num = list[i];
                if (num) {
                    var icon = new CustomImage("resource/assets/asyn/moontype/7/" + (i + 1) + ".png", true, function () {
                    });
                    icon.x = 0;
                    icon.y = i * 60;
                    container.addChild(icon);
                    if (i != len - 1) {
                        var line = Global.createBitmapByName("p_line_1_png");
                        line.x = 0;
                        line.y = 52 + i * 60;
                        container.addChild(line);
                    }
                    var txt = new egret.TextField();
                    txt.textColor = 0xffb680;
                    txt.size = 24;
                    txt.x = 315;
                    txt.y = 16 + i * 60;
                    txt.text = "X" + num;
                    container.addChild(txt);
                }
            }
            console.log(container.height, container.width);
            container.x = StageUtils.SW - 350 >> 1;
            container.y = 115 + (189 - container.height >> 1);
        }
        else {
            var moon = new CustomImage("resource/assets/asyn/moontype/2/" + data.ptype + ".png", true, function () {
                moon.x = StageUtils.SW - moon.width >> 1;
                moon.y = 84;
            });
            this.addChild(moon);
        }
        this.btnDuihuan = Global.createBitmapByName("btn_submit_png");
        this.btnDuihuan.x = StageUtils.SW - this.btnDuihuan.width >> 1;
        this.btnDuihuan.y = StageUtils.SH - 310;
        this.addChild(this.btnDuihuan);
        Global.setBut(this.btnDuihuan);
        this.btnDuihuan.touchEnabled = true;
        this.btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.duihuanHandler, this);
        var address = Global.createBitmapByName("address_png");
        address.x = StageUtils.SW - address.width >> 1;
        address.y = 390;
        this.addChild(address);
        this.txtName = new egret.TextField();
        this.txtName.type = egret.TextFieldType.INPUT;
        this.txtName.x = 200;
        this.txtName.y = 385;
        this.txtName.width = 380;
        this.txtName.height = 50;
        this.txtName.maxChars = 10;
        this.addChild(this.txtName);
        // this.txtName.border = true;
        this.txtSheng = new egret.TextField();
        this.txtSheng.type = egret.TextFieldType.INPUT;
        this.txtSheng.x = 160;
        this.txtSheng.y = 456;
        this.txtSheng.width = 300;
        this.txtSheng.height = 50;
        this.txtSheng.maxChars = 10;
        this.txtSheng.size = 20;
        this.txtSheng.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txtSheng);
        // this.txtSheng.border = true;
        this.txtShi = new egret.TextField();
        this.txtShi.type = egret.TextFieldType.INPUT;
        this.txtShi.x = 192;
        this.txtShi.y = 519;
        this.txtShi.width = 140;
        this.txtShi.height = 50;
        this.txtShi.maxChars = 10;
        this.txtShi.size = 20;
        this.txtShi.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txtShi);
        // this.txtShi.border = true;
        this.txtXian = new egret.TextField();
        this.txtXian.type = egret.TextFieldType.INPUT;
        this.txtXian.x = 375;
        this.txtXian.y = 519;
        this.txtXian.width = 118;
        this.txtXian.height = 50;
        this.txtXian.maxChars = 10;
        this.txtXian.size = 20;
        this.txtXian.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txtXian);
        // this.txtXian.border = true;
        // this.txtAddress = new egret.TextField();
        // this.txtAddress.type = egret.TextFieldType.INPUT;
        // this.txtAddress.x = 420;
        // this.txtAddress.y = 516;
        // this.txtAddress.width = 300;
        // this.txtAddress.height = 50;
        // this.txtAddress.maxChars = 6;
        // this.txtAddress.size = 20;
        // this.addChild(this.txtAddress);
        // this.txtAddress.addEventListener(egret.Event.CHANGE, function(e:egret.Event){
        // 	console.log(e.target.size);
        // }, this);
        this.txtAddress = new egret.TextField();
        this.txtAddress.type = egret.TextFieldType.INPUT;
        this.txtAddress.x = 254;
        this.txtAddress.y = 577;
        this.txtAddress.width = 317;
        this.txtAddress.height = 50;
        this.txtAddress.maxChars = 100;
        this.txtAddress.size = 20;
        this.addChild(this.txtAddress);
        this.txtPhone = new egret.TextField();
        this.txtPhone.type = egret.TextFieldType.INPUT;
        this.txtPhone.x = 200;
        this.txtPhone.y = 640;
        this.txtPhone.width = 350;
        this.txtPhone.height = 50;
        this.txtPhone.maxChars = 11;
        this.txtPhone.restrict = "0-9";
        this.txtPhone.inputType = egret.TextFieldInputType.TEL;
        this.txtPhone.size = 20;
        this.addChild(this.txtPhone);
        // this.txtPhone.border = true;
        var tips = new egret.TextField();
        tips.textColor = 0xFE3E55;
        // tips.text = "注：西藏、青海、新疆暂不支持兑换收货。";
        tips.text = "注：全国包邮。";
        tips.size = 20;
        tips.x = StageUtils.SW - tips.width >> 1;
        tips.y = 680;
        this.addChild(tips);
        var btnInfo = Global.createBitmapByName("btn_info_png");
        btnInfo.x = StageUtils.SW - btnInfo.width - 20;
        btnInfo.y = 20;
        this.addChild(btnInfo);
        Global.setBut(btnInfo);
        btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.infoHandler, this);
    };
    AddressPop.prototype.infoHandler = function () {
        PopManager.hidePop("AddressPop");
        PopManager.showPop("InfoPop");
    };
    AddressPop.prototype.duihuanHandler = function () {
        var uname = this.txtName.text.trim();
        var sheng = this.txtSheng.text.trim();
        var shi = this.txtShi.text.trim();
        var xian = this.txtXian.text.trim();
        var address = this.txtAddress.text.trim();
        var phone = this.txtPhone.text.trim();
        if (!uname) {
            Message.show("姓名 不能为空!");
        }
        else if (!sheng) {
            Message.show("地址栏 省/直辖市 不能为空!");
        }
        else if (!shi) {
            Message.show("地址栏 市 不能为空!");
        }
        else if (!xian) {
            Message.show("地址栏 县/区 不能为空!");
        }
        else if (!address) {
            Message.show("详细地址 不能为空!");
        }
        else if (!phone) {
            Message.show("手机号码 不能为空!");
        }
        else if (phone.length != 11) {
            Message.show("电话号码 必须11位!");
        }
        else {
            var confirmAdd = new ConfirmAddress();
            this.addChild(confirmAdd);
            confirmAdd.btnOK.touchEnabled = true;
            confirmAdd.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //提交
                var type = "";
                var ptype = "";
                if (this.data.type == 0) {
                    type = "exchange";
                    ptype = this.data.ptype;
                }
                else {
                    type = "eexchange";
                    if (this.data.eshare) {
                        ptype = this.data.eshare;
                    }
                    else {
                        ptype = this.data.ptype;
                    }
                }
                var self = this;
                $.ajax({
                    url: Main.USER_INFO_API,
                    data: { type: type, ticket: Main.USER_TICKET, ptype: ptype, name: uname, province: sheng, city: shi, county: xian, address: address, telephone: phone },
                    success: function (data) {
                        if (data.result == 0) {
                            PopManager.hidePop("AddressPop");
                            PopManager.showPop("OrderOKPop", data.exchangeorder);
                        }
                        else {
                            Message.show("兑换失败:" + data.result);
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
            }, this); //this.submitHandler
            confirmAdd.btnBack.touchEnabled = true;
            confirmAdd.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                this.removeChild(confirmAdd);
            }, this);
        }
    };
    return AddressPop;
}(PopView));
__reflect(AddressPop.prototype, "AddressPop");
//# sourceMappingURL=AddressPop.js.map