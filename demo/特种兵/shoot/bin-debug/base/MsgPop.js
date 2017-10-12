var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var MsgPop = (function (_super) {
    __extends(MsgPop, _super);
    function MsgPop() {
        var _this = _super.call(this) || this;
        _this.view = new egret.Sprite();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MsgPop.prototype.onAddToStage = function (e) {
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
    };
    MsgPop.prototype.show = function (msg) {
        this.stageWidth = this.stage.stageWidth;
        this.stageHeight = this.stage.stageHeight;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x0, 0.8);
        bg.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        this.view.x = this.stageWidth / 2;
        this.view.y = this.stageHeight / 2;
        var msgTxt = new egret.TextField();
        msgTxt.background = false;
        msgTxt.x = -200;
        msgTxt.width = 400;
        msgTxt.textColor = 0xffffff;
        msgTxt.textAlign = "center";
        msgTxt.size = 32;
        msgTxt.lineSpacing = 12;
        msgTxt.text = msg;
        bg.alpha = this.view.alpha = 0;
        Global.fadeIn(bg);
        this.addChild(bg);
        this.addChild(this.view);
        this.view.addChild(msgTxt);
        this.loadBg();
    };
    MsgPop.prototype.loadBg = function () {
        var url = "resource/shoot/title.png";
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        var request = new egret.URLRequest(url);
        loader.load(request);
    };
    MsgPop.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        var texture = loader.data;
        var kuang = new egret.Bitmap(texture);
        kuang.x = kuang.width / -2;
        kuang.y = kuang.height / -2 * 3;
        this.view.addChildAt(kuang, 0);
        Global.zoomIn(this.view);
    };
    return MsgPop;
}(egret.Sprite));
MsgPop.not_exist = "很抱歉,查询不到此串码，\n您购买的可能非正品!";
MsgPop.err_limit = "很抱歉,您串码输错的次数已达到上限，\n请30分钟后再扫码进入！";
MsgPop.at_anomaly = "很抱歉,网络异常. \n请重新再输入串码参与活动.";
MsgPop.at_limit = "很抱歉,\n您今日输入串码参与活动次数已超过上限. \n请明日继续来哦!";
MsgPop.at_used = "很抱歉,该串码已被使用. \n再次购买指定产品!更多惊喜哟!";
MsgPop.at_lost = "很抱歉,领取失败";
MsgPop.at_upgrade = "很抱歉，系统正在维护\n请稍候再参与活动.";
MsgPop.err_link = "链接异常\n请重试操作尝试";
MsgPop.at_time_out = "网络超时\n请检查您的网络再尝试";
__reflect(MsgPop.prototype, "MsgPop");
//# sourceMappingURL=MsgPop.js.map