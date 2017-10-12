var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BuySendItem = (function (_super) {
    __extends(BuySendItem, _super);
    function BuySendItem(type) {
        var _this = _super.call(this) || this;
        _this.num = 0;
        var bg = new CustomImage("resource/assets/asyn/moontype/6/" + type + ".png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
        });
        _this.addChild(bg);
        var btnbg = Global.createBitmapByName("btn_addless_bg_png");
        btnbg.x = 400 + 80;
        btnbg.y = 25;
        _this.addChild(btnbg);
        var btnLess = Global.createBitmapByName("btn_less_png");
        btnLess.x = 370 + 80;
        btnLess.y = 25;
        _this.addChild(btnLess);
        var btnAdd = Global.createBitmapByName("btn_add_png");
        btnAdd.x = 453 + 80;
        btnAdd.y = 25;
        _this.addChild(btnAdd);
        Global.setBut(btnLess);
        Global.setBut(btnAdd);
        btnLess.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.lessHandler, _this);
        btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.addHandler, _this);
        _this.txtNum = new egret.TextField();
        _this.txtNum.x = 400 + 80;
        _this.txtNum.y = 26;
        _this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.txtNum.width = 54;
        _this.txtNum.textColor = 0x0;
        _this.addChild(_this.txtNum);
        _this.txtNum.text = _this.num + "";
        return _this;
    }
    BuySendItem.prototype.lessHandler = function () {
        if (this.num > 0) {
            this.num--;
            this.txtNum.text = this.num + "";
        }
    };
    BuySendItem.prototype.addHandler = function () {
        this.num++;
        this.txtNum.text = this.num + "";
    };
    return BuySendItem;
}(egret.DisplayObjectContainer));
__reflect(BuySendItem.prototype, "BuySendItem");
//# sourceMappingURL=BuySendItem.js.map