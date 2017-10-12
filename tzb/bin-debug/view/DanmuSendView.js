var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmuSendView = (function (_super) {
    __extends(DanmuSendView, _super);
    function DanmuSendView() {
        var _this = _super.call(this) || this;
        _this.danmu_text = "弹幕发的好，出名能趁早!";
        var bg = Global.createBitmapByName("danmu_bg_png");
        bg.x = StageUtils.SW - bg.width >> 1;
        bg.y = StageUtils.SH - bg.height - 20;
        _this.addChild(bg);
        var line = Global.createBitmapByName("danmu_line_png");
        line.x = 130;
        line.y = 955;
        // this.addChild(line);
        egret.Tween.get(line, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        var btnSend = Global.createBitmapByName("btn_send_png");
        btnSend.x = 550;
        btnSend.y = 935;
        _this.addChild(btnSend);
        Global.setBut(btnSend);
        btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.sendHandler, _this);
        _this.setData();
        return _this;
    }
    DanmuSendView.prototype.setData = function () {
        var _this = this;
        var url;
        var name;
        if (Main.isTest) {
            url = "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0";
            name = "有X的男女";
        }
        else {
            url = Main.headurl;
            name = Main.username;
        }
        var head = new CustomImage(url, false, function () {
            head.width = 80;
            head.height = 80;
            head.x = 35;
            head.y = 920;
            var mask = new egret.Shape();
            mask.graphics.beginFill(0x0);
            mask.graphics.drawCircle(40, 40, 40);
            mask.x = head.x;
            mask.y = head.y;
            head.mask = mask;
            _this.addChild(head);
            _this.addChild(mask);
        });
        this.addChild(head);
        var txtName = new egret.TextField();
        txtName.x = 130;
        txtName.y = 920;
        txtName.size = 25;
        txtName.textColor = 0x817e7e;
        this.addChild(txtName);
        txtName.text = name;
        this.txtContent = new egret.TextField();
        this.txtContent.x = 135;
        this.txtContent.y = 958;
        this.txtContent.width = 400;
        this.txtContent.type = egret.TextFieldType.INPUT;
        this.addChild(this.txtContent);
        this.txtContent.text = this.danmu_text;
        this.txtContent.textColor = 0x817e7e;
        // this.txtContent.border = true;
        this.txtContent.addEventListener(egret.FocusEvent.FOCUS_IN, this.focusInHandler, this);
        this.txtContent.addEventListener(egret.FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
    };
    DanmuSendView.prototype.beginHandler = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    DanmuSendView.prototype.sendHandler = function () {
        var str = this.txtContent.text;
        if (str && str != this.danmu_text) {
            var self = this;
            $.ajax({
                url: sessionStorage.getItem("interface"),
                data: { actiontype: "danmu", content: str, ticket: sessionStorage.getItem("mainticket") },
                success: function (data) {
                    if (data.result == "success") {
                        // if(data.more.result == "success")
                        // {
                        // 	if(data.more.content)
                        // 	{
                        self.txtContent.text = self.danmu_text;
                        self.txtContent.textColor = 0x817e7e;
                        self.dispatchEventWith("add_self", false, { nickname: Main.username, headimgurl: Main.headurl, content: data.more.content, type: 1, self: 1 });
                    }
                    else {
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
        }
    };
    DanmuSendView.prototype.focusInHandler = function () {
        if (this.txtContent.text == this.danmu_text) {
            this.txtContent.text = "";
            this.txtContent.textColor = 0x007eff;
        }
    };
    DanmuSendView.prototype.focusOutHandler = function () {
        if (this.txtContent.text == "") {
            this.txtContent.text = this.danmu_text;
            this.txtContent.textColor = 0x817e7e;
        }
    };
    return DanmuSendView;
}(egret.DisplayObjectContainer));
__reflect(DanmuSendView.prototype, "DanmuSendView");
//# sourceMappingURL=DanmuSendView.js.map