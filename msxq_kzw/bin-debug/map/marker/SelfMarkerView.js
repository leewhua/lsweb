var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelfMarkerView = (function (_super) {
    __extends(SelfMarkerView, _super);
    function SelfMarkerView() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x0096ff, 0.15);
        shape.graphics.drawCircle(0, 0, 300);
        shape.graphics.endFill();
        _this.addChild(shape);
        var bg = Global.createBitmapByName("self_png");
        bg.anchorOffsetX = bg.width >> 1;
        bg.anchorOffsetY = bg.height - 16;
        // bg.x = - bg.width >> 1;
        // bg.y = - bg.height >> 1;
        _this.addChild(bg);
        _this.head_tip = Global.createBitmapByName("head_tip_png");
        _this.head_tip.x = 100;
        _this.head_tip.y = 235;
        UIManager.instance.topLayer.addChild(_this.head_tip);
        _this.head_tip.visible = false;
        return _this;
    }
    SelfMarkerView.prototype.touchClickHandler = function (e) {
        if (this.showMenu) {
            this.head_tip.visible = true;
        }
        else {
            this.head_tip.visible = false;
        }
        this.showMenu = !this.showMenu;
    };
    SelfMarkerView.prototype.setData = function () {
        this.data = {};
        // this.data = data;
        // if(data)
        // {
        // this.txtName.text = UserInfo.instance.username;
        // this.txtName.x = - this.txtName.textWidth / 2;
        // this.txtName.backgroundColor = this.getTextColor();
        this.txtName.text = "";
        this.loadHead();
        this.refreshPos();
        // }
    };
    SelfMarkerView.prototype.loadHead = function () {
        // var url;
        // if(Main.isTest)
        // {
        // 	url = "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0";
        // }else
        // {
        var url = UserInfo.instance.url;
        // }
        var self = this;
        var head = new CustomImage(url, false, function () {
            head.width = 95;
            head.height = 95;
            head.x = -48;
            head.y = -120;
            var mask = new egret.Shape();
            mask.graphics.beginFill(0x0);
            mask.graphics.drawCircle(50, 50, 45);
            mask.x = head.x;
            mask.y = head.y;
            head.mask = mask;
            self.addChild(head);
            self.addChild(mask);
        });
        this.head = head;
        this.addChild(head);
        // var loader: egret.URLLoader = new egret.URLLoader();
        // loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        // //添加加载完成侦听
        // loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        // var request: egret.URLRequest = new egret.URLRequest(url);
        // //开始加载
        // loader.load(request);
    };
    SelfMarkerView.prototype.onLoadComplete = function (event) {
        var loader = event.target;
        //获取加载到的纹理对象
        var texture = loader.data;
        //创建 Bitmap 进行显示
        var b = new egret.Bitmap(texture);
        b.width = 70;
        b.height = 70;
        b.x = -35;
        b.y = -35;
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x0);
        mask.graphics.drawCircle(35, 35, 35);
        mask.x = -35;
        mask.y = -35;
        b.mask = mask;
        this.addChild(b);
        this.addChild(mask);
        // b.alpha=0;
        // Global.tweenTo(b,0,400,0,0,1);
        this.head = b;
        // this.filters = [new egret.GlowFilter( 0x00fcff, 0.8, 30, 30,2, egret.BitmapFilterQuality.HIGH, false, false )];
    };
    SelfMarkerView.prototype.refreshPos = function () {
        if (MapManager.instance.Gmap) {
            var p = eval("MapManager.instance.Gmap.pointToPixel(new BMap.Point(" + MapManager.instance.lng + "," + MapManager.instance.lat + "))");
            // var sw = StageUtils.stage.stageWidth;
            // var sh = StageUtils.stage.stageHeight;
            // var lw = window.innerWidth;
            // var lh = window.innerHeight;
            // console.log(sw,lw,sh,lh);
            this.x = p.x * (StageUtils.SW / StageUtils.LW);
            this.y = p.y * (StageUtils.SH / StageUtils.LH);
            console.log(p.x, p.y, this.x, this.y);
            if (this.monster) {
                this.monster.play(-1);
            }
        }
    };
    return SelfMarkerView;
}(MarkerItemView));
__reflect(SelfMarkerView.prototype, "SelfMarkerView");
//# sourceMappingURL=SelfMarkerView.js.map