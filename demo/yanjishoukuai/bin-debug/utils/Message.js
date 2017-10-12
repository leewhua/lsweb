var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        var _this = _super.call(this) || this;
        _this.bg = Global.createBitmapByName("message_bg_png");
        _this.bg.y = -10;
        _this.addChild(_this.bg);
        _this.txtStr = new egret.TextField();
        _this.txtStr.width = StageUtils.SW;
        _this.txtStr.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.txtStr);
        return _this;
    }
    Message.prototype.show = function (str) {
        this.txtStr.text = str;
        this.bg.width = this.txtStr.textWidth + 50;
        this.bg.height = this.txtStr.textHeight + 20;
        this.bg.x = StageUtils.SW - this.bg.width >> 1;
        this.y = StageUtils.SH >> 1;
        this.alpha = 1;
        egret.Tween.get(this).wait(1000).to({ y: this.y - 100, alpha: 0 }, 1000, egret.Ease.quadIn).call(this.tweenEnd, this);
    };
    Message.prototype.tweenEnd = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            Message.pool.push(this);
        }
    };
    Message.show = function (str) {
        var item;
        if (Message.pool.length > 0) {
            item = Message.pool.pop();
        }
        else {
            item = new Message();
        }
        if (item) {
            item.show(str);
            Main.instance.addChild(item);
        }
    };
    return Message;
}(egret.DisplayObjectContainer));
Message.pool = [];
__reflect(Message.prototype, "Message");
//# sourceMappingURL=Message.js.map