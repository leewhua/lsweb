var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ConfirmAddress = (function (_super) {
    __extends(ConfirmAddress, _super);
    function ConfirmAddress() {
        var _this = _super.call(this) || this;
        _this.confirmAddress();
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.confirmAddress, this);
    }
    ConfirmAddress.prototype.confirmAddress = function () {
        var confirmAdd = Global.createBitmapByName("confirm_address_png");
        confirmAdd.x = StageUtils.SW - confirmAdd.width >> 1;
        confirmAdd.y = StageUtils.SH - confirmAdd.height >> 1;
        this.addChild(confirmAdd);
        this.btnOK = Global.createBitmapByName("btn_OK_png");
        this.btnOK.x = 100;
        this.btnOK.y = 580;
        this.addChild(this.btnOK);
        // btnOK.touchEnabled = true;
        // btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);
        this.btnBack = Global.createBitmapByName("btn_back_png");
        this.btnBack.x = 330;
        this.btnBack.y = 580;
        this.addChild(this.btnBack);
        // btnBack.touchEnabled = true;
        // btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    return ConfirmAddress;
}(egret.DisplayObjectContainer));
__reflect(ConfirmAddress.prototype, "ConfirmAddress");
//# sourceMappingURL=ConfirmAddress.js.map