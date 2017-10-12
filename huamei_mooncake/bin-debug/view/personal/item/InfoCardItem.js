var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InfoCardItem = (function (_super) {
    __extends(InfoCardItem, _super);
    function InfoCardItem(count, type, state, eshare) {
        if (eshare === void 0) { eshare = null; }
        var _this = _super.call(this) || this;
        _this.count = count;
        _this.type = type;
        _this.state = state;
        _this.eshare = eshare;
        var bg = new CustomImage("resource/assets/asyn/moontype/" + (state == 2 ? 8 : 3) + "/" + type + ".png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
        });
        _this.addChild(bg);
        if (state == 0) {
            var btnGet = Global.createBitmapByName("btn_get1_png");
            btnGet.x = 365;
            btnGet.y = 16;
            _this.addChild(btnGet);
            Global.setBut(btnGet);
            btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getHandler, _this);
        }
        else if (state == 1) {
            var btnGet = Global.createBitmapByName("btn_get_png");
            btnGet.x = 390;
            btnGet.y = 16;
            _this.addChild(btnGet);
            Global.setBut(btnGet);
            btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.getHandler, _this);
        }
        var numBg = Global.createBitmapByName("num_bg_png");
        numBg.x = 297;
        numBg.y = 16;
        _this.addChild(numBg);
        _this.txtNum = new egret.TextField();
        _this.txtNum.x = 300;
        _this.txtNum.y = 22;
        _this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.txtNum.width = 54;
        _this.txtNum.textColor = 0x0;
        _this.addChild(_this.txtNum);
        _this.txtNum.text = _this.count + "";
        return _this;
    }
    InfoCardItem.prototype.getHandler = function () {
        if (this.count) {
            PopManager.hidePop("InfoPop");
            if (this.state == 0) {
                PopManager.showPop("PersonalPop", { type: 1, ptype: this.type, isShare: true });
            }
            else {
                PopManager.showPop("PersonalPop", { type: 1, ptype: this.type, eshare: this.eshare });
            }
        }
    };
    return InfoCardItem;
}(egret.DisplayObjectContainer));
__reflect(InfoCardItem.prototype, "InfoCardItem");
//# sourceMappingURL=InfoCardItem.js.map