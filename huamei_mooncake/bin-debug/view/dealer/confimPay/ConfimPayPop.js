var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConfimPayPop = (function (_super) {
    __extends(ConfimPayPop, _super);
    function ConfimPayPop() {
        var _this = _super.call(this) || this;
        _this.allCount = 0;
        _this.allPrice = 0;
        _this.idList = [];
        _this.dic = {};
        return _this;
    }
    ConfimPayPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xffffff);
        bg.graphics.drawRect(0, 0, StageUtils.SW, StageUtils.SH);
        bg.graphics.endFill();
        this.addChild(bg);
        var title = Global.createBitmapByName("confim_order_title_png");
        title.x = StageUtils.SW - title.width >> 1;
        title.y = 40;
        this.addChild(title);
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var obj = data[i];
            if (obj) {
                this.idList.push(obj.id);
                if (!this.dic[obj.name]) {
                    this.dic[obj.name] = [];
                }
                this.dic[obj.name].push(obj);
            }
        }
        len = this.dic.length;
        var index = 0;
        for (var str in this.dic) {
            var item = new ConfimPayItem();
            item.x = StageUtils.SW - 600 >> 1;
            item.y = 105 + index * 147;
            item.setData(this.dic[str]);
            this.addChild(item);
            index++;
            this.allCount += item.len;
            this.allPrice += item.price;
        }
        var downbg = Global.createBitmapByName("down_bg_png");
        downbg.x = 0;
        downbg.y = StageUtils.SH - downbg.height;
        this.addChild(downbg);
        var txtCount = new egret.TextField();
        txtCount.x = 30;
        txtCount.y = StageUtils.SH - 55;
        txtCount.text = "总量:" + this.allCount + "盒";
        txtCount.textColor = 0x0;
        txtCount.size = 22;
        this.addChild(txtCount);
        var txtTotal = new egret.TextField();
        txtTotal.x = 180;
        txtTotal.y = StageUtils.SH - 55;
        txtTotal.text = "总计:";
        txtTotal.textColor = 0x0;
        txtTotal.size = 22;
        this.addChild(txtTotal);
        var txtAll = new egret.TextField();
        txtAll.x = 230;
        txtAll.y = StageUtils.SH - 63;
        txtAll.text = "￥" + this.allPrice;
        txtAll.textColor = 0xff4900;
        txtAll.size = 33;
        this.addChild(txtAll);
        var btnPay = Global.createBitmapByName("btn_pay_1_png");
        btnPay.x = StageUtils.SW - btnPay.width;
        btnPay.y = StageUtils.SH - btnPay.height;
        this.addChild(btnPay);
        Global.setBut(btnPay);
        btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.payTouchHandler, this);
    };
    ConfimPayPop.prototype.payTouchHandler = function () {
        var self = this;
        $.ajax({
            url: Main.PLAY_API,
            data: { ticket: Main.USER_TICKET, type: "pcoup", ids: this.idList.join(",") },
            success: function (data) {
                if (data.result == 0) {
                    var weixin = eval("wx");
                    weixin.chooseWXPay({
                        timestamp: data.timestemps,
                        nonceStr: data.nonce_str,
                        package: "prepay_id=" + data.prepay_id,
                        signType: 'MD5',
                        paySign: data.sign,
                        success: function (res) {
                            // 支付成功后的回调函数
                            self.payResult(true, data.payorder, self.data, self.allPrice);
                        }, fail: function (res) {
                            self.payResult(false, data.payorder);
                        }, cancel: function (res) {
                            self.payResult(false, data.payorder);
                        }
                    });
                }
                else {
                    PopManager.showPop("TipsPop", { url: "tips_error_png", callback: function () {
                            PopManager.hidePop("ConfimPayPop");
                            PopManager.showPop("ListPop");
                        } });
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
    };
    ConfimPayPop.prototype.payResult = function (ok, orderid, list, price) {
        if (list === void 0) { list = null; }
        if (price === void 0) { price = null; }
        var self = this;
        $.ajax({
            url: Main.PLAY_API,
            data: { ticket: Main.USER_TICKET, type: "pwxcallback", payorder: orderid, issuccess: ok ? 1 : 0, cardtype: "pcoup" },
            success: function (data) {
                if (data.result == 0) {
                    if (ok) {
                        PopManager.hidePop("ConfimPayPop");
                        PopManager.showPop("PayOKPop", { list: list, price: price });
                    }
                    else {
                        PopManager.showPop("TipsPop", { url: "tips_error_png", callback: function () {
                                PopManager.hidePop("ConfimPayPop");
                                PopManager.showPop("ListPop");
                            } });
                    }
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
    };
    return ConfimPayPop;
}(PopView));
__reflect(ConfimPayPop.prototype, "ConfimPayPop");
//# sourceMappingURL=ConfimPayPop.js.map