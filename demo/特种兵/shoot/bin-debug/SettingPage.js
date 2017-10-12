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
var SettingPage = (function (_super) {
    __extends(SettingPage, _super);
    function SettingPage() {
        var _this = _super.call(this) || this;
        _this.status = 0;
        _this.oldPop = null;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    SettingPage.prototype.eventHandler = function (event) {
        console.log("eventHandler:" + event.name);
        switch (event.name) {
            case 'buy_sunccess':
                //this.dispatchEvent(new EventObj('event','to_play',true,false));
                //event.stopPropagation();
                this.jfBar.reSetSco();
                break;
            case 'buy_sunccess_close':
                this.showPop('setting');
                break;
            //
            case 'buy_gun':
                event.stopPropagation();
                break; //buy_gun
            case 'to_shop':
                this.showPop('shop');
                event.stopPropagation();
                break;
            case 'to_select':
                this.showPop('select');
                event.stopPropagation();
                break;
            case 'to_setting':
                this.showPop('setting');
                event.stopPropagation();
                break;
            case 'reset_sco':
                this.jfBar.reSetSco();
                event.stopPropagation();
                break;
        }
        //play_mov
    };
    SettingPage.prototype.out = function () {
        var tw = egret.Tween.get(this);
        tw.to({ y: -640 }, 400, egret.Ease.cubicIn);
        tw.call(function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        });
    };
    SettingPage.prototype.showPop = function (lab) {
        var hasPop = this.closePop();
        if (lab == "select") {
            this.oldPop = new SelectPop();
        }
        else if (lab == "setting") {
            this.oldPop = new SelectGunPop();
        }
        else if (lab == "shop") {
            this.oldPop = new ShopPop();
        }
        this.addChildAt(this.oldPop, 1);
        this.oldPop.show(hasPop);
    };
    SettingPage.prototype.closePop = function () {
        var hasOld = false;
        var old = this.oldPop;
        if (old) {
            var tw = egret.Tween.get(old);
            tw.to({ y: -640 }, 400, egret.Ease.cubicIn);
            tw.call(function () {
                if (old.parent) {
                    old.parent.removeChild(old);
                }
            });
            hasOld = true;
        }
        this.oldPop = null;
        return hasOld;
    };
    SettingPage.prototype.onAddToStage = function (event) {
        //初始化intro
        var _this1 = this;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = Global.createBitmapByName('bg_jpg');
        var logo = Global.createBitmapByName('logo_png', 20, 20);
        var title = Global.createBitmapByName('title_png', 420, 26);
        this.jfBar = new JfBar();
        var faceSp = new egret.Sprite();
        faceSp.x = 1180;
        faceSp.y = 20;
        logo.scaleY = Main.scale;
        this.addChild(bg);
        this.addChild(logo);
        this.addChild(title);
        this.addChild(faceSp);
        this.addChild(this.jfBar);
    };
    return SettingPage;
}(egret.DisplayObjectContainer));
__reflect(SettingPage.prototype, "SettingPage");
//# sourceMappingURL=SettingPage.js.map