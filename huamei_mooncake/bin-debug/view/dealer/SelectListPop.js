var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectListPop = (function (_super) {
    __extends(SelectListPop, _super);
    function SelectListPop() {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        return _this;
    }
    SelectListPop.prototype.setData = function (data) {
        _super.prototype.setData.call(this, data);
        var title = Global.createBitmapByName("select_list_title_png");
        title.x = StageUtils.SW - title.width >> 1;
        ;
        title.y = 0;
        this.addChild(title);
        // var btnContinue = Global.createBitmapByName("btn_down_png");
        // btnContinue.x = StageUtils.SW - btnContinue.width >> 1;
        // btnContinue.y = StageUtils.SH - btnContinue.height - 150;
        // this.addChild(btnContinue);
        // Global.setBut(btnContinue);
        // var btnPay = Global.createBitmapByName("btn_send_png");
        // btnPay.x = 375;
        // btnPay.y = StageUtils.SH - btnPay.height - 100;
        // this.addChild(btnPay);
        // Global.setBut(btnPay);
        // var bg = Global.createBitmapByName("email_bg_png");
        // bg.x = 42;
        // bg.y = btnPay.y;
        // this.addChild(bg);
        // btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP,this.containerHandler,this);
        // btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.payHandler,this);
        this.txtEmail = new egret.TextField();
        this.txtEmail.textColor = 0x8C93A1;
        // this.txtEmail.border = true;
        // this.txtEmail.type = egret.TextFieldType.INPUT;
        this.txtEmail.text = "您还可以通过关注“华美食品”公众号\r从经销商入口查询付款详情";
        this.txtEmail.width = 600;
        // this.txtEmail.height = 68;
        this.txtEmail.x = 20;
        this.txtEmail.y = StageUtils.SH - 100;
        this.txtEmail.size = 24;
        this.txtEmail.lineSpacing = 10;
        this.txtEmail.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txtEmail);
        this.txtEmail.addEventListener(egret.FocusEvent.FOCUS_IN, this.emailFocusInHandler, this);
        this.txtEmail.addEventListener(egret.FocusEvent.FOCUS_OUT, this.emailFocusOutHandler, this);
        this.container = new egret.DisplayObjectContainer();
        var scroll = new egret.ScrollView();
        scroll.setContent(this.container);
        scroll.horizontalScrollPolicy = "off";
        scroll.scrollSpeed = 0.5;
        this.addChild(scroll);
        scroll.x = 0;
        scroll.y = 82;
        scroll.width = StageUtils.SW;
        scroll.height = 700;
        this.getData();
        var btnClose = Global.createBitmapByName("btn_close_png");
        btnClose.x = 50;
        btnClose.y = StageUtils.SH - btnClose.height - 120;
        this.addChild(btnClose);
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        var btnSelect = Global.createBitmapByName("btn_select_png");
        btnSelect.x = StageUtils.SW - btnSelect.width - 50;
        btnSelect.y = StageUtils.SH - btnSelect.height - 120 - 7;
        this.addChild(btnSelect);
        Global.setBut(btnSelect);
        btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectHandler, this);
        var down = Global.createBitmapByName("select_bg_down_png");
        down.x = StageUtils.SW - down.width >> 1;
        down.y = StageUtils.SH - down.height;
        this.addChild(down);
    };
    SelectListPop.prototype.selectHandler = function () {
        PopManager.hidePop("SelectListPop");
        PopManager.showPop("SelectPop");
    };
    SelectListPop.prototype.closeHandler = function () {
        var weixin = eval("wx");
        if (weixin) {
            weixin.closeWindow();
        }
    };
    // private containerHandler():void
    // {
    // }
    SelectListPop.prototype.payHandler = function () {
        var email = this.txtEmail.text;
        if (email && email != "请输入邮箱") {
            // $.ajax({
            // 	url: Main.USER_INFO_API,
            // 	data: {type:"info",ticket:Main.USER_TICKET},
            // 	success: function(data)
            // 	{
            // 		if(data.result == 0)
            // 		{
            // 			Message.show("发送成功!");
            // 		}else
            // 		{
            // 			Message.show(data.result);
            // 		}
            // 	},
            // 	error: function()
            // 	{
            // 	},timeout: 8000,
            // 	dataType: "json",async: true,type: "POST",
            // 	complete: function(XMLHttpRequest,status)
            // 	{
            // 		if(status == 'timeout')
            // 		{
            // 		}
            // 	}
            // });
            Message.show("发送成功!");
        }
        else {
            Message.show("请输入邮箱!");
        }
    };
    SelectListPop.prototype.emailFocusInHandler = function () {
        if (this.txtEmail.text == "请输入邮箱") {
            this.txtEmail.text = "";
        }
    };
    SelectListPop.prototype.emailFocusOutHandler = function () {
        if (this.txtEmail.text == "") {
            this.txtEmail.text = "请输入邮箱";
        }
    };
    SelectListPop.prototype.getData = function () {
        this.refreshData(this.data);
        // var self = this;
        // $.ajax({
        // 	url: Main.USER_INFO_API,
        // 	data: {type:"query",ticket:Main.USER_TICKET},
        // 	success: function(data)
        // 	{
        // 		if(data.result == 0)
        // 		{
        // 			self.refreshData(data.list);
        // 		}else
        // 		{
        // 			Message.show(data.result);
        // 		}
        // 	},
        // 	error: function()
        // 	{
        // 	},timeout: 8000,
        // 	dataType: "json",async: true,type: "POST",
        // 	complete: function(XMLHttpRequest,status)
        // 	{
        // 		if(status == 'timeout')
        // 		{
        // 		}
        // 	}
        // });
    };
    SelectListPop.prototype.refreshData = function (list) {
        this.itemList.length = 0;
        this.container.removeChildren();
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = new SelectListItem();
                item.y = i * 100;
                item.setData(list[i]);
                this.container.addChild(item);
                this.itemList.push(item);
            }
        }
    };
    return SelectListPop;
}(PopView));
__reflect(SelectListPop.prototype, "SelectListPop");
//# sourceMappingURL=SelectListPop.js.map