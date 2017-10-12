var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MailItem = (function (_super) {
    __extends(MailItem, _super);
    function MailItem() {
        var _this = _super.call(this) || this;
        _this.bg = new egret.Shape();
        _this.addChild(_this.bg);
        _this.txtContent = new egret.TextField();
        _this.txtContent.textColor = 0x565656;
        _this.txtContent.size = 24;
        _this.txtContent.x = 100;
        _this.txtContent.y = 20;
        _this.txtContent.text = "";
        // this.txtContent.wordWrap = true;
        _this.txtContent.multiline = true;
        // this.txtContent.height = 60;
        _this.txtContent.width = 510;
        _this.txtContent.lineSpacing = 5;
        _this.addChild(_this.txtContent);
        // this.txtContent.border = true;
        _this.txtTime = new egret.TextField();
        _this.txtTime.textColor = 0x565656;
        _this.txtTime.size = 20;
        _this.txtTime.x = 100;
        _this.txtTime.y = 85;
        _this.txtTime.text = "";
        _this.addChild(_this.txtTime);
        _this.icon = Global.createBitmapByName("mail_item_2_png");
        _this.icon.x = 40;
        _this.icon.y = 25;
        _this.addChild(_this.icon);
        _this.line = Global.createBitmapByName("mail_item_3_png");
        _this.line.x = 85;
        _this.line.y = 120;
        _this.addChild(_this.line);
        return _this;
    }
    MailItem.prototype.setData = function (index, data) {
        if (index == 0) {
            this.txtContent.textColor = 0xff7323;
            this.txtTime.textColor = 0xff7323;
            this.icon.texture = RES.getRes("mail_item_1_png");
        }
        else {
            this.txtContent.textColor = 0x444444;
            this.txtTime.textColor = 0x848484;
            this.icon.texture = RES.getRes("mail_item_2_png");
        }
        this.txtContent.text = data.AcceptStation + "";
        this.txtTime.text = data.AcceptTime + "";
        this.txtTime.y = this.txtContent.y + this.txtContent.height + 15;
        this.line.y = this.txtTime.y + this.txtTime.height + 10;
        this.bg.graphics.beginFill(0x0, 0.001);
        this.bg.graphics.drawRect(0, 0, StageUtils.SW, this.line.y + this.line.height);
        this.bg.graphics.endFill();
        this.h = this.height;
    };
    return MailItem;
}(egret.DisplayObjectContainer));
__reflect(MailItem.prototype, "MailItem");
//# sourceMappingURL=MailItem.js.map