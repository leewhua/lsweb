var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserPop = (function (_super) {
    __extends(UserPop, _super);
    function UserPop() {
        return _super.call(this) || this;
    }
    UserPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        var img = new CustomImage("resource/assets/asyn/user_bg.png", true, function () {
            img.x = StageUtils.SW - img.width >> 1;
            img.y = 65;
        });
        this.addChild(img);
        var btnClose = Global.createBitmapByName("close_png");
        btnClose.x = StageUtils.SW - btnClose.width - 50;
        btnClose.y = 75;
        this.addChild(btnClose);
        btnClose.touchEnabled = true;
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
        this.tabContainer = new egret.DisplayObjectContainer();
        this.addChild(this.tabContainer);
        this.loadHead();
        this.initTabbar();
        this.setTabSelect(data);
    };
    UserPop.prototype.initTabbar = function () {
        var line1 = Global.createBitmapByName("line2_png");
        line1.x = 200;
        line1.y = 115;
        this.addChild(line1);
        var line2 = Global.createBitmapByName("line1_png");
        line2.x = StageUtils.SW - line2.width >> 1;
        line2.y = 155;
        this.addChild(line2);
        this.tab1 = Global.createBitmapByName("tabbar_1_2_png");
        this.tab1.x = 155;
        this.tab1.y = 115;
        this.addChild(this.tab1);
        this.tab2 = Global.createBitmapByName("tabbar_2_2_png");
        this.tab2.x = 155 + 70;
        this.tab2.y = 115;
        this.addChild(this.tab2);
        this.tab3 = Global.createBitmapByName("tabbar_3_2_png");
        this.tab3.x = 155 + 140;
        this.tab3.y = 115;
        this.addChild(this.tab3);
        this.tab1.touchEnabled = true;
        this.tab2.touchEnabled = true;
        this.tab3.touchEnabled = true;
        Global.setBut(this.tab1);
        Global.setBut(this.tab2);
        Global.setBut(this.tab3);
        this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tab1ClickHandler, this);
        this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tab2ClickHandler, this);
        this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tab3ClickHandler, this);
    };
    UserPop.prototype.tab1ClickHandler = function () {
        this.setTabSelect(1);
    };
    UserPop.prototype.tab2ClickHandler = function () {
        this.setTabSelect(2);
    };
    UserPop.prototype.tab3ClickHandler = function () {
        this.setTabSelect(3);
    };
    UserPop.prototype.setTabSelect = function (index) {
        if (index == this.tabSelectIndex) {
            return;
        }
        if (this.tabSelect) {
            this.tabSelect.texture = RES.getRes("tabbar_" + this.tabSelectIndex + "_2_png");
        }
        var item = this["tab" + index];
        if (item) {
            this.tabSelectIndex = index;
            this.tabSelect = item;
            this.tabSelect.texture = RES.getRes("tabbar_" + this.tabSelectIndex + "_1_png");
        }
        this.initTabContent();
    };
    UserPop.prototype.initTabContent = function () {
        this.tabContainer.removeChildren();
        if (this.tabSelectIndex == 1) {
            //我
            var bg = new CustomImage("resource/assets/asyn/user_wo.png", true, function () {
                bg.x = StageUtils.SW - bg.width >> 1;
                bg.y = 200;
            });
            this.tabContainer.addChild(bg);
        }
        else if (this.tabSelectIndex == 2) {
            //红包
            var bg = new CustomImage("resource/assets/asyn/user_hb.png", true, function () {
                bg.x = StageUtils.SW - bg.width >> 1;
                bg.y = 200;
            });
            this.tabContainer.addChild(bg);
        }
        else {
            //体验卷
            var bg = new CustomImage("resource/assets/asyn/user_lq.png", true, function () {
                bg.x = StageUtils.SW - bg.width >> 1;
                bg.y = 200;
            });
            this.tabContainer.addChild(bg);
        }
    };
    UserPop.prototype.loadHead = function () {
        var img = new CustomImage(UserInfo.instance.url, true, function () {
            img.width = 122;
            img.height = 122;
            img.x = 3;
            img.y = 10;
        });
        this.addChild(img);
        var headBg = Global.createBitmapByName("head_bg_png");
        headBg.x = 3;
        headBg.y = 10;
        this.addChild(headBg);
        var maskBg = new egret.Shape();
        maskBg.graphics.beginFill(0x0);
        maskBg.graphics.drawCircle(headBg.x + headBg.width / 2, headBg.y + headBg.height / 2, 50);
        maskBg.graphics.drawCircle;
        maskBg.graphics.endFill();
        this.addChild(maskBg);
        img.mask = maskBg;
    };
    UserPop.prototype.closeClickHandler = function () {
        PopManager.hidePop("UserPop");
    };
    return UserPop;
}(PopView));
__reflect(UserPop.prototype, "UserPop");
//# sourceMappingURL=UserPop.js.map