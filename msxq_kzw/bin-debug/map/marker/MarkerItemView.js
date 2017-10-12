var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MarkerItemView = (function (_super) {
    __extends(MarkerItemView, _super);
    function MarkerItemView() {
        var _this = _super.call(this) || this;
        _this.showMenu = false;
        _this.initView();
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchClickHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStageHandler, _this);
        return _this;
    }
    MarkerItemView.prototype.addStageHandler = function () {
        this.alpha = 0;
        this.scaleY = this.scaleX = 0;
        egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 1000);
    };
    MarkerItemView.prototype.touchClickHandler = function (e) {
        if (this.data) {
            if (this.data.type > 1) {
                PopManager.showPop("ThreePop", this.data.type);
            }
        }
    };
    MarkerItemView.prototype.initView = function () {
        this.txtName = new egret.TextField();
        this.txtName.background = true;
        this.txtName.fontFamily = "宋体";
        this.txtName.size = 23;
        this.txtName.y = -60;
        this.addChild(this.txtName);
    };
    MarkerItemView.prototype.setData = function (data) {
        this.data = data;
        if (data) {
            this.txtName.text = data.name + "";
            this.txtName.x = -this.txtName.textWidth / 2;
            this.txtName.backgroundColor = this.getTextColor();
            this.monster = Global.createMc("monster_json", "monster_png", "m" + 1);
            this.addChild(this.monster);
            this.monster.anchorOffsetX = this.monster.width / 2;
            this.monster.anchorOffsetY = this.monster.height / 2;
            this.refreshPos();
        }
    };
    MarkerItemView.prototype.getTextColor = function () {
        if (this.data) {
            console.log(this.data.type);
            if (this.data.type == 1) {
                return 0xB2DFEE;
            }
            else if (this.data.type == 2) {
                return 0xFFD700;
            }
            else if (this.data.type == 3) {
                return 0xFFFF00;
            }
            else if (this.data.type == 4) {
                return 0xEEB4B4;
            }
        }
        return 0xB22222;
    };
    MarkerItemView.prototype.refreshPos = function () {
        if (this.data && MapManager.instance.Gmap) {
            var p = eval("MapManager.instance.Gmap.pointToPixel(new BMap.Point(" + this.data.lng + "," + this.data.lat + "))");
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
    return MarkerItemView;
}(egret.DisplayObjectContainer));
__reflect(MarkerItemView.prototype, "MarkerItemView");
//# sourceMappingURL=MarkerItemView.js.map