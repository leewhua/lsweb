var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShareView = (function (_super) {
    __extends(ShareView, _super);
    function ShareView() {
        var _this = _super.call(this) || this;
        var bg = new CustomImage("resource/assets/share/share_bg_" + Main.type + ".jpg", true, function () {
            bg.width = StageUtils.SW;
            bg.height = StageUtils.SH;
        });
        _this.addChild(bg);
        // var btn = Global.createBitmapByName("btn_weidian_png");
        // btn.x = StageUtils.SW - btn.width >> 1;
        // btn.y = StageUtils.SH - btn.height - 60;
        // this.addChild(btn);
        // Global.setBut(btn);
        // btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTouchHandler,this);
        if (Main.type == 2) {
            Main.content = [
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "1",
                    "type": "2"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "2",
                    "type": "2"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "3",
                    "type": "2"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "4",
                    "type": "2"
                }
            ];
        }
        else {
            Main.content = [{
                    "nickname": "",
                    "headimgurl": "",
                    "content": "1",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "2",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "3",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "4",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "5",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "6",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "7",
                    "type": "0"
                },
                {
                    "nickname": "",
                    "headimgurl": "",
                    "content": "8",
                    "type": "0"
                }];
        }
        _this.initDanmuList();
        return _this;
    }
    return ShareView;
}(GameBaseView));
__reflect(ShareView.prototype, "ShareView");
//# sourceMappingURL=ShareView.js.map