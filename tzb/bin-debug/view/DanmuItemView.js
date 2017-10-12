var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmuItemView = (function (_super) {
    __extends(DanmuItemView, _super);
    function DanmuItemView() {
        var _this = _super.call(this) || this;
        _this.isAdd = false;
        _this.isPlay = false;
        return _this;
    }
    //nickname,headimgurl,content,type
    DanmuItemView.prototype.setData = function (obj) {
        this.obj = obj;
        if (obj) {
            if (obj.type == 0) {
                //系统的文字
                this.w = 526;
                var item = new CustomImage("resource/assets/danmu/img/danmu_txt_" + obj.content + ".png");
                this.addChild(item);
            }
            else if (obj.type == 1) {
                //玩家发的
                this.setInfo(obj);
            }
            else if (obj.type == 2) {
                //系统的音量
                this.w = 532;
                var str = this.obj.content > 4 ? this.obj.content - 4 : this.obj.content;
                var item = new CustomImage("resource/assets/danmu/img/danmu_audio_" + str + ".png");
                this.addChild(item);
                this.img1 = Global.createBitmapByName("sound_no_png");
                this.img1.x = 354;
                this.img1.y = 53;
                this.addChild(this.img1);
                Global.setBut(this);
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.img1Handler, this);
            }
        }
    };
    DanmuItemView.prototype.img1Handler = function () {
        if (this.obj) {
            if (this.isPlay) {
                this.stop();
            }
            else {
                this.img1.texture = RES.getRes("sound_1_png");
                this.img1.x = 354;
                this.img1.y = 72;
                this.img2 = Global.createBitmapByName("sound_2_png");
                this.img2.x = 365;
                this.img2.y = 63;
                this.addChild(this.img2);
                this.img2.alpha = 0;
                this.img3 = Global.createBitmapByName("sound_3_png");
                this.img3.x = 372;
                this.img3.y = 53;
                this.addChild(this.img3);
                this.img3.alpha = 0;
                console.log("addTween");
                egret.Tween.get(this.img2, { loop: true }).wait(500).to({ alpha: 1 }, 100).wait(1000).to({ alpha: 0 }, 100);
                egret.Tween.get(this.img3, { loop: true }).wait(1000).to({ alpha: 1 }, 100).wait(500).to({ alpha: 0 }, 100);
                this.startLoad(this.obj.content);
            }
        }
    };
    DanmuItemView.prototype.startLoad = function (str) {
        if (this.isPlay) {
            return;
        }
        this.isPlay = true;
        this.sound = RES.getRes("sound_" + str + "_mp3");
        //播放音乐
        this.channel = this.sound.play(0, 1);
        this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    DanmuItemView.prototype.onSoundComplete = function (event) {
        egret.log("onSoundComplete");
        this.stop();
    };
    DanmuItemView.prototype.stop = function () {
        console.log("stop");
        this.img1.texture = RES.getRes("sound_no_png");
        this.img1.x = 354;
        this.img1.y = 53;
        console.log("removeTween");
        egret.Tween.removeTweens(this.img2);
        this.img2.alpha = 0;
        egret.Tween.removeTweens(this.img3);
        this.img3.alpha = 0;
        // this.removeChild(this.img3);
        // this.removeChild(this.img3);
        this.isPlay = false;
        if (this.channel) {
            this.channel.stop();
            this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.channel = null;
        }
        this.sound = null;
    };
    DanmuItemView.prototype.setInfo = function (obj) {
        var _this = this;
        var bg = Global.createBitmapByName("danmu_bg1_png");
        this.addChild(bg);
        var head = new CustomImage(obj.headimgurl, false, function () {
            head.width = 80;
            head.height = 80;
            head.x = 21;
            head.y = 21;
            var mask = new egret.Shape();
            mask.graphics.beginFill(0x0);
            mask.graphics.drawCircle(40, 40, 40);
            mask.x = head.x;
            mask.y = head.y;
            head.mask = mask;
            _this.addChild(head);
            _this.addChild(mask);
        });
        this.addChild(head);
        var txtName = new egret.TextField();
        txtName.x = 110;
        txtName.y = 21;
        txtName.size = 25;
        txtName.textColor = 0x817e7e;
        this.addChild(txtName);
        var nickname = decodeURI(obj.nickname);
        txtName.text = nickname;
        var txtContent = new egret.TextField();
        txtContent.x = 115;
        txtContent.y = 60;
        this.addChild(txtContent);
        txtContent.text = decodeURI(obj.content);
        if (obj.self || nickname == Main.username) {
            txtContent.textColor = 0x007eff;
        }
        else {
            txtContent.textColor = 0x3a3a3a;
        }
        var bw = txtContent.textWidth + 140;
        if (bw < 300) {
            bw = 300;
        }
        bg.width = bw;
        this.w = bw;
    };
    return DanmuItemView;
}(egret.DisplayObjectContainer));
__reflect(DanmuItemView.prototype, "DanmuItemView");
//# sourceMappingURL=DanmuItemView.js.map