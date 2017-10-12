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
        if (data) {
            this.index = data;
        }
        else {
            this.index = 1;
        }
        this.tab1 = new CustomTabButton("我的订单", 213, 105, 28);
        this.tab1.x = 0;
        this.tab1.y = 0;
        this.addChild(this.tab1);
        this.tab2 = new CustomTabButton("我的卡券", 213, 105, 28);
        this.tab2.x = 213;
        this.tab2.y = 0;
        this.addChild(this.tab2);
        this.tab3 = new CustomTabButton("购买卡券", 214, 105, 28);
        this.tab3.x = 426;
        this.tab3.y = 0;
        this.addChild(this.tab3);
        if (this.index == 1) {
            this.tab1.select = true;
            this.tab2.select = false;
            this.tab3.select = false;
        }
        else if (this.index == 2) {
            this.tab1.select = false;
            this.tab2.select = true;
            this.tab3.select = false;
        }
        else {
            this.tab1.select = false;
            this.tab2.select = false;
            this.tab3.select = true;
        }
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabTouchHandler, this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabTouchHandler, this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tabTouchHandler, this);
        var line = Global.createBitmapByName("p_line_2_png");
        line.x = 0;
        line.y = 105 - 5;
        this.addChild(line);
        // var btnDuihuan = Global.createBitmapByName("btn_buy_card_png");
        // btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
        // btnDuihuan.y = StageUtils.SH - 107;
        // this.addChild(btnDuihuan);
        // Global.setBut(btnDuihuan);
        // btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);
        this.loadData();
    };
    InfoPop.prototype.tabTouchHandler = function (e) {
        if (e.target == this.tab1) {
            if (!this.tab1.select) {
                this.tab1.select = true;
                this.tab2.select = false;
                this.tab3.select = false;
                this.index = 1;
                if (this.cardPage) {
                    this.removeChild(this.cardPage);
                    this.cardPage = null;
                }
                if (this.buyPage) {
                    this.removeChild(this.buyPage);
                    this.buyPage = null;
                }
                this.loadData();
            }
        }
        else if (e.target == this.tab2) {
            if (!this.tab2.select) {
                this.tab1.select = false;
                this.tab2.select = true;
                this.tab3.select = false;
                this.index = 2;
                this.loadData();
            }
            // if(this.cardPage)
            // {
            // 	this.removeChild(this.cardPage);
            // 	this.cardPage = null;
            // }
            if (this.orderPage) {
                this.removeChild(this.orderPage);
                this.orderPage = null;
            }
            if (this.buyPage) {
                this.removeChild(this.buyPage);
                this.buyPage = null;
            }
        }
        else {
            if (!this.tab3.select) {
                this.tab1.select = false;
                this.tab2.select = false;
                this.tab3.select = true;
                this.index = 3;
                this.showPage(this.index);
            }
            if (this.cardPage) {
                this.removeChild(this.cardPage);
                this.cardPage = null;
            }
            if (this.orderPage) {
                this.removeChild(this.orderPage);
                this.orderPage = null;
            }
        }
    };
    InfoPop.prototype.showPage = function (index) {
        if (index == 1) {
            this.initOrder();
        }
        else if (index == 2) {
            this.initCard();
        }
        else {
            this.initBuy();
        }
    };
    InfoPop.prototype.initBuy = function () {
        this.buyPage = new BuySendPop();
        this.addChild(this.buyPage);
    };
    InfoPop.prototype.initCard = function () {
        if (this.card) {
            this.cardPage = new egret.DisplayObjectContainer();
            this.addChild(this.cardPage);
            var bg = new egret.Shape();
            bg.graphics.beginFill(0xffffff);
            bg.graphics.drawRect(0, 106, StageUtils.SW, StageUtils.SH - 106);
            bg.graphics.endFill();
            this.cardPage.addChild(bg);
            var tips = Global.createBitmapByName("btn_tips_1_png");
            tips.x = StageUtils.SW - tips.width >> 1;
            tips.y = 130;
            this.cardPage.addChild(tips);
            Global.setBut(tips);
            tips.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                PopManager.showPop("TipsPop", { url: "personal_tips_bg2_png", callback: function () { } });
            }, this);
            var container = new egret.DisplayObjectContainer();
            var scroll = new egret.ScrollView(container);
            scroll.width = StageUtils.SW;
            scroll.height = StageUtils.SH - 175;
            scroll.x = 0;
            scroll.y = 175;
            scroll.horizontalScrollPolicy = "off";
            this.cardPage.addChild(scroll);
            var h = 0;
            var tips1 = Global.createBitmapByName("card_type_buy_png");
            tips1.x = StageUtils.SW - tips1.width >> 1;
            container.addChild(tips1);
            h += tips1.height;
            var len = this.card.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                if (this.card[i]) {
                    var item = new InfoCardItem(this.card[i], i + 1, 0);
                    item.y = h + 25;
                    container.addChild(item);
                    h += 296;
                }
            }
            var tips2 = Global.createBitmapByName("card_type_get_png");
            tips2.x = StageUtils.SW - tips2.width >> 1;
            tips2.y = h + 25;
            container.addChild(tips2);
            h += tips2.height + 25;
            var len = this.esharedlist.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                if (this.esharedlist[i]) {
                    if (this.esharedInfo) {
                        var temp = this.esharedInfo[i];
                        if (temp && temp.length) {
                            var item = new InfoCardItem(this.esharedlist[i], i + 1, 1, temp[0]);
                            item.y = h + 25;
                            container.addChild(item);
                            h += 296;
                        }
                    }
                }
            }
            var tips3 = Global.createBitmapByName("card_type_out_png");
            tips3.x = StageUtils.SW - tips3.width >> 1;
            tips3.y = h + 25;
            container.addChild(tips3);
            h += tips3.height + 25;
            var len = this.esharelist.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                if (this.esharelist[i]) {
                    var item = new InfoCardItem(this.esharelist[i], i + 1, 2);
                    item.y = h + 25;
                    container.addChild(item);
                    h += 285;
                }
            }
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x0, 0.001);
            bg.graphics.drawRect(0, 0, StageUtils.SW, h);
            bg.graphics.endFill();
            container.addChildAt(bg, 0);
        }
    };
    InfoPop.prototype.initOrder = function () {
        if (this.exchange) {
            this.orderPage = new egret.DisplayObjectContainer();
            this.addChild(this.orderPage);
            var container = new egret.DisplayObjectContainer();
            var scroll = new egret.ScrollView(container);
            scroll.width = StageUtils.SW;
            scroll.height = StageUtils.SH - 106;
            scroll.x = 22;
            scroll.y = 106;
            scroll.horizontalScrollPolicy = "off";
            this.orderPage.addChild(scroll);
            var block = new egret.Shape();
            block.graphics.beginFill(0x0, 0.001);
            block.graphics.drawRect(0, 0, 30, 30);
            block.graphics.endFill();
            container.addChild(block);
            var len = this.exchange.length;
            for (var i = 0; i < len; i++) {
                //{type:i+1,num:i+4}
                var item = new InfoOrderItem(this.exchange[i]);
                item.y = 30 + 368 * i;
                container.addChild(item);
            }
        }
    };
    InfoPop.prototype.duihuanHandler = function () {
        PopManager.hidePop("InfoPop");
        PopManager.showPop("BuySendPop");
    };
    InfoPop.prototype.loadData = function () {
        var self = this;
        $.ajax({
            url: Main.USER_INFO_API,
            data: { type: "personcard", ticket: Main.USER_TICKET },
            success: function (data) {
                if (data.result == 0) {
                    // result.put("exchange", list);
                    // result.put("card", list1);
                    // self.initCard(data.card);
                    self.exchange = data.exchange;
                    self.card = data.card;
                    self.esharelist = data.esharelist;
                    self.esharedlist = data.esharedlist;
                    self.esharedInfo = data.eshareid;
                    // self.esharelist = [0,1,2,1];
                    // self.esharedlist = [0,1,0,0];
                    self.showPage(self.index);
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
    };
    return InfoPop;
}(PopView));
__reflect(InfoPop.prototype, "InfoPop");
//# sourceMappingURL=InfoPop.js.map