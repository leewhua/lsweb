var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.index = 3;
        _this.loadOk = false;
        _this.lastOk = false;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.lastOk = true;
        // this.isload = window.sessionStorage.getItem("loading_load");
        // if(this.isload == "1")
        // {
        //     this.lastOk = true;
        // }else
        // {
        var bg = new CustomImage("resource/assets/loading/loading_bg.jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        this.addChild(bg);
        // var btn = new CustomImage("resource/assets/loading/loading_btn.png",false,function(){
        //     btn.x = StageUtils.SW - btn.width - 30;
        //     btn.y = 30;
        // });
        // this.addChild(btn);
        // this.btnReturn = btn;
        // this.txtLasttime1 = new egret.TextField();
        // this.addChild(this.txtLasttime1);
        // this.txtLasttime1.textColor = 0x666666;
        // this.txtLasttime1.size = 22;
        // this.txtLasttime1.x = StageUtils.SW - 100 - 30;
        // this.txtLasttime1.y = 37;
        // this.txtLasttime1.width = 100;
        // this.txtLasttime1.textAlign = "center";
        // this.txtLasttime1.text = "跳过 3S";
        // this.txtLasttime = new egret.TextField();
        // this.addChild(this.txtLasttime);
        // this.txtLasttime.size = 22;
        // this.txtLasttime.x = StageUtils.SW - 100 - 30;
        // this.txtLasttime.y = 37;
        // this.txtLasttime.width = 100;
        // this.txtLasttime.textAlign = "center";
        // this.txtLasttime.text = "跳过 3S";
        // this.rectMask = new egret.Rectangle(0,0,100,50);
        // this.rectMask.x = -100;
        // this.txtLasttime.mask = this.rectMask;
        var barBg = Global.createBitmapByName("loading_bar_bg_png");
        barBg.x = StageUtils.SW - barBg.width >> 1;
        barBg.y = StageUtils.SH - 80;
        this.addChild(barBg);
        this.bar = Global.createBitmapByName("loading_bar_png");
        this.bar.x = StageUtils.SW - this.bar.width >> 1;
        this.bar.y = barBg.y - 2;
        this.addChild(this.bar);
        this.txtPro = new egret.TextField();
        this.txtPro.size = 20;
        this.txtPro.width = 100;
        this.txtPro.textAlign = egret.HorizontalAlign.CENTER;
        this.txtPro.x = StageUtils.SW - this.txtPro.width >> 1;
        this.txtPro.y = barBg.y + 20;
        this.addChild(this.txtPro);
        this.txtPro.text = "0%";
        this.bar.width = 0;
        // this.timer = new egret.Timer(1000,3);
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        // this.timer.start();
        // }
    };
    LoadingUI.prototype.timerHandler = function () {
        this.index--;
        if (this.index > 0) {
            this.txtLasttime.text = "跳过 " + this.index + "S";
            this.txtLasttime.mask = this.rectMask;
            this.txtLasttime1.text = "跳过 " + this.index + "S";
        }
        else {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            this.timer = null;
            this.txtLasttime.text = "跳  过";
            this.txtLasttime.mask = this.rectMask;
            this.txtLasttime1.text = "跳  过";
            this.lastOk = true;
            this.checkInto();
        }
    };
    LoadingUI.prototype.checkInto = function () {
        if (this.loadOk && this.lastOk) {
            if (this.btnReturn) {
                Global.setBut(this.btnReturn);
                this.btnReturn.touchEnabled = true;
                this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnClickHandler, this);
            }
            this.returnClickHandler();
        }
    };
    LoadingUI.prototype.returnClickHandler = function () {
        UIManager.instance.initMainView();
        UIManager.instance.mainUILayer.removeChild(this);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        var num = current / total;
        // this.txtLasttime.text = `加载...${current}/${total}`;
        // this.txtLasttime.text = "加载 "+num+"%"
        this.bar.width = 323 * num;
        this.txtPro.text = Math.floor(num * 100) + "%";
    };
    LoadingUI.prototype.loadComp = function () {
        window.sessionStorage.setItem("loading_load", "1");
        console.log("loadComp");
        this.loadOk = true;
        this.checkInto();
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map