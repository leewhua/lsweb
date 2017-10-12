var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SubmitView = (function (_super) {
    __extends(SubmitView, _super);
    function SubmitView() {
        var _this = _super.call(this) || this;
        _this.show(false);
        return _this;
    }
    SubmitView.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay);
        this.view.y = -50;
        var bg = Global.createBitmapByName('pop_bg_png');
        StageUtils.centerInParent(bg);
        this.view.addChild(bg);
        var inputReward = new CustomImage("resource/assets/reward/" + GameView.rewardData.desc + "_input.png", true, function () {
            inputReward.x = StageUtils.SW - inputReward.width >> 1;
            inputReward.y = (StageUtils.SH - inputReward.height >> 1) - 100;
        });
        this.view.addChild(inputReward);
        var inputBg = new CustomImage("resource/assets/reward/sw_input_bg.png", true, function () {
            inputBg.x = StageUtils.SW - inputBg.width >> 1;
            inputBg.y = (StageUtils.SH - inputBg.height >> 1) + 200;
        });
        this.view.addChild(inputBg);
        var txtName = this.getTxt();
        txtName.text = "";
        txtName.maxChars = 20;
        txtName.width = 300;
        txtName.x = 200;
        txtName.y = 594 + 50;
        this.view.addChild(txtName);
        var txtPhone = this.getTxt();
        txtPhone.text = "";
        txtPhone.maxChars = 11;
        txtPhone.restrict = "0-9";
        txtPhone.width = 300;
        txtPhone.x = 200;
        txtPhone.y = 662 + 50;
        this.view.addChild(txtPhone);
        var txtAddress = this.getTxt();
        txtAddress.text = "";
        txtAddress.multiline = true;
        txtAddress.maxChars = 100;
        txtAddress.width = 300;
        txtAddress.height = 100;
        txtAddress.x = 200;
        txtAddress.y = 726 + 50;
        this.view.addChild(txtAddress);
        var toReceive = Global.createBitmapByName('btn_get_png');
        toReceive.x = StageUtils.SW - toReceive.width >> 1;
        toReceive.y = StageUtils.SH - 100;
        this.view.addChild(toReceive);
        toReceive.touchEnabled = true;
        toReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        Global.setBut(toReceive);
        this.txtName = txtName;
        this.txtPhone = txtPhone;
        this.txtAddress = txtAddress;
    };
    SubmitView.prototype.touchHandler = function () {
        this.saveLuck();
    };
    SubmitView.prototype.saveLuck = function () {
        var name = this.txtName.text;
        var phone = this.txtPhone.text;
        var address = this.txtAddress.text;
        if (name && phone && address) {
            Main.removePop("SubmitView");
            Main.showPop("TipsView");
            sessionStorage.removeItem('yanjishoukuai');
        }
        else {
            Message.show("请填写完整信息~");
        }
    };
    SubmitView.prototype.getTxt = function () {
        var txt = new egret.TextField();
        txt.type = egret.TextFieldType.INPUT;
        txt.textColor = 0x000000;
        txt.size = 25;
        // txt.
        return txt;
    };
    return SubmitView;
}(PopUp));
__reflect(SubmitView.prototype, "SubmitView");
//# sourceMappingURL=SubmitView.js.map