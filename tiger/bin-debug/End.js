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
var End = (function (_super) {
    __extends(End, _super);
    function End() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    End.prototype.onAddToStage = function (event) {
        var over = new egret.Shape();
        var win = Main.createBitmapByName("w" + Main.win + "_png");
        //win.scaleY=Main.scale;
        over.graphics.beginFill(0x0, 0.8);
        over.graphics.drawRect(0, 0, 640, 1030);
        var overBg = Main.createBitmapByName("over-bg_png");
        // overBg.height = overBg.height*Main.scale;
        overBg.x = this.stage.width - overBg.width >> 1;
        overBg.y = 34;
        var but = Main.createBitmapByName("btn-hb_png");
        var btn_q = Main.createBitmapByName("btn-q_png");
        var tips_hb = Main.createBitmapByName("tips-hb_png");
        tips_hb.x = this.stage.width - tips_hb.width >> 1;
        tips_hb.y = 540;
        btn_q.x = (640 - but.width) / 2;
        btn_q.y = 875;
        var tips_q = Main.createBitmapByName("tips-q_png");
        tips_q.x = this.stage.width - tips_q.width >> 1;
        tips_q.y = 540;
        // var close = Main.createBitmapByName("close_png");
        //     close.x=520;
        //     close.y=120;
        var guangSp = new egret.Sprite();
        // var guang = Main.createBitmapByName("guang_png");
        var winSp = new egret.Sprite();
        // guang.x = ( - guang.width)/2;
        // guang.y = ( - guang.height) / 2;
        // guangSp.addChild(guang);
        guangSp.x = 320;
        guangSp.y = 505;
        win.height = win.height * Main.scale;
        win.x = (-win.width) / 2;
        win.y = win.height / -2 - 6;
        winSp.addChild(win);
        winSp.x = 320;
        winSp.y = 410;
        but.x = (640 - but.width) / 2;
        but.y = 880;
        this.addChild(over);
        this.addChild(overBg);
        this.addChild(guangSp);
        this.addChild(winSp);
        if (Main.win < 3) {
            this.addChild(but);
            this.addChild(tips_hb);
        }
        else {
            this.addChild(btn_q);
            this.addChild(tips_q);
        }
        over.alpha = 0;
        guangSp.alpha = 0;
        winSp.alpha = 0;
        winSp.scaleX = winSp.scaleY = 0.6;
        but.alpha = 0;
        var tw = egret.Tween.get(over);
        tw.to({ "alpha": 1 }, 300);
        var tw = egret.Tween.get(guangSp);
        tw.wait(100).to({ "alpha": 1 }, 300);
        var tw = egret.Tween.get(winSp);
        tw.wait(200).to({ "alpha": 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        var tw = egret.Tween.get(but);
        tw.wait(300).to({ "alpha": 1 }, 300);
        // guang.touchEnabled = true;
        Main.setBut(but);
        but.touchEnabled = true;
        but.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (this.parent) {
                // window.close();
                var weixin = eval("wx");
                if (weixin) {
                    weixin.closeWindow();
                }
            }
            // var type=0;
            // if(Main.win == 2 || Main.win==3){
            //     type=1;
            // }else{
            // }
            // // window.location.href = "../receive.html?token=" + Main.token + "&oid=" + Main.oid + "&type="+type;
        }, this);
        btn_q.touchEnabled = true;
        btn_q.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            $.ajax({
                url: Main.api,
                data: { ticket: Main.oid },
                error: function () {
                    Main.showLost("出现错误，请稍后尝试");
                },
                success: function (data) {
                    //alert("data:" + data.msg + ",count:" + data.data.count);
                    console.log(data);
                    if (data.result == "success") {
                        // alert(JSON.stringify(data));
                        var size = data.prize.value.length;
                        // alert(size);
                        var _wx = window['wx'];
                        if (_wx) {
                            _wx.addCard({
                                cardList: data.prize.value,
                                success: function (res1) {
                                    // alert("add"+JSON.stringify(res1));
                                }, fail: function (res2) {
                                    // alert("fail"+JSON.stringify(res2));
                                }
                            });
                        }
                    }
                    else if (data.error_code) {
                        Main.showLost(data.error);
                    }
                    else {
                        Main.showLost("出现错误，请稍后尝试");
                    }
                },
                dataType: "json", async: true, type: "POST"
            });
        }, this);
        // close.touchEnabled = true;
        // close.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
        //     if(this.parent){
        //         this.parent.removeChild(this);
        //     }
        // },this);
        setInterval(function () {
            guangSp.rotation += 2;
        }, 100);
    };
    return End;
}(egret.Sprite));
__reflect(End.prototype, "End");
//# sourceMappingURL=End.js.map