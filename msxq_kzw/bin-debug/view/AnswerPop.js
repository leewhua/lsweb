var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnswerPop = (function (_super) {
    __extends(AnswerPop, _super);
    function AnswerPop() {
        var _this = _super.call(this) || this;
        _this.answerList = [{ ok: 3, list: ["秦国", "赵国", "魏国", "楚国"] }, { ok: 3, list: ["吃粽子", "赛龙舟", "饮雄黄酒", "登高采菊"] }];
        _this.result = -1;
        return _this;
    }
    AnswerPop.prototype.setData = function (data) {
        if (data === void 0) { data = null; }
        this.data = data;
        this.index = Math.floor(Math.random() * 2);
        console.log(this.index);
        this.curObj = this.answerList[this.index];
        var img = new CustomImage("resource/assets/asyn/answer_bg.png", true, function () {
            img.x = StageUtils.SW - img.width >> 1;
            img.y = StageUtils.SH - img.height >> 1;
        });
        this.addChild(img);
        var bg = new CustomImage("resource/assets/asyn/answer" + (this.index + 1) + "_bg.png", true, function () {
            bg.x = StageUtils.SW - bg.width >> 1;
            bg.y = 400 - bg.height;
        });
        this.addChild(bg);
        var ti = Global.createBitmapByName("answer_" + (this.index + 1) + "_png");
        ti.x = StageUtils.SW - ti.width >> 1;
        ti.y = 400;
        this.addChild(ti);
        var list = this.curObj.list;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var cbx = new CustomCheckBox(1, list[i]);
            cbx.index = i;
            cbx.x = 150;
            cbx.y = 470 + i * 60;
            this.addChild(cbx);
            cbx.addEventListener(egret.Event.CHANGE, this.cbxChangeHandler, this);
        }
        var btnSubmit = Global.createBitmapByName("btn_submit_png");
        btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
        btnSubmit.y = StageUtils.SH - 300;
        this.addChild(btnSubmit);
        btnSubmit.touchEnabled = true;
        Global.setBut(btnSubmit);
        btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitClickHandler, this);
        var btnClose = Global.createBitmapByName("close_png");
        btnClose.x = StageUtils.SW - btnClose.width - 90;
        btnClose.y = 185;
        this.addChild(btnClose);
        btnClose.touchEnabled = true;
        Global.setBut(btnClose);
        btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
        MainView.instance.people.visible = false;
    };
    AnswerPop.prototype.closeClickHandler = function () {
        MainView.instance.people.visible = true;
        PopManager.hidePop("AnswerPop");
    };
    AnswerPop.prototype.cbxChangeHandler = function (e) {
        var cbx = e.target;
        this.result = cbx.index;
        if (this.select) {
            this.select.change();
        }
        this.select = cbx;
    };
    AnswerPop.prototype.submitClickHandler = function () {
        if (this.result != -1 && this.curObj) {
            if (this.result == this.curObj.ok) {
                //正确
                PopManager.showPop("ResultPop", 1);
            }
            else {
                //错误
                PopManager.showPop("ResultPop", 0);
            }
            PopManager.hidePop("AnswerPop");
            MainView.instance.removeZongZi();
        }
    };
    return AnswerPop;
}(PopView));
__reflect(AnswerPop.prototype, "AnswerPop");
//# sourceMappingURL=AnswerPop.js.map