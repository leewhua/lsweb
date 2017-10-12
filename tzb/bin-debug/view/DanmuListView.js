var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DanmuListView = (function (_super) {
    __extends(DanmuListView, _super);
    function DanmuListView() {
        return _super.call(this) || this;
    }
    DanmuListView.prototype.setData = function (list) {
        var _this = this;
        this.list = list;
        if (!list) {
            return;
        }
        this.showList = [];
        this.index = 0;
        this.showLine(Main.type == 2 ? 530 : 580);
        setTimeout(function () {
            _this.showLine(Main.type == 2 ? 390 : 720);
        }, 2500);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    DanmuListView.prototype.enterFrameHandler = function () {
        var len = this.showList.length;
        for (var i = 0; i < len; i++) {
            var item = this.showList[i];
            if (item) {
                item.x -= 2;
                if (item.x < -item.w) {
                    this.removeChild(item);
                    item = null;
                    this.showList.splice(i, 1);
                    i--;
                    len--;
                }
                else if (item.x < StageUtils.SW - item.w - 200) {
                    if (!item.isAdd) {
                        item.isAdd = true;
                        this.showLine(item.y);
                    }
                }
            }
        }
    };
    DanmuListView.prototype.showLine = function (ty) {
        if (this.index >= this.list.length) {
            this.index = 0;
        }
        var obj = this.list[this.index];
        if (obj) {
            var item = new DanmuItemView();
            item.setData(obj);
            item.x = StageUtils.SW;
            item.y = ty;
            this.addChild(item);
            // egret.Tween.get(item).to({x:StageUtils.SW - item.w - 50},5000);
            this.showList.push(item);
        }
        this.index++;
    };
    DanmuListView.prototype.addSelf = function (obj) {
        this.list.splice(this.index, 0, obj);
        // var item = new DanmuItemView();
        // item.setData(obj);
        // item.x = StageUtils.SW;
        // item.y = ty;
        // this.addChild(item);
        // // egret.Tween.get(item).to({x:StageUtils.SW - item.w - 50},5000);
        // this.showList.push(item);
    };
    return DanmuListView;
}(egret.DisplayObjectContainer));
__reflect(DanmuListView.prototype, "DanmuListView");
//# sourceMappingURL=DanmuListView.js.map