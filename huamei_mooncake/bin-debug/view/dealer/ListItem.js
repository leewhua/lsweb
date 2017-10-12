var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListItem = (function (_super) {
    __extends(ListItem, _super);
    function ListItem() {
        var _this = _super.call(this) || this;
        _this._select = false;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xf9f9f9);
        bg.graphics.drawRect(0, 0, StageUtils.SW, 97);
        // bg.graphics.lineStyle(1,0x0,0.5);
        // bg.graphics.moveTo(0,97);
        // bg.graphics.lineTo(StageUtils.SW,97);
        bg.graphics.endFill();
        _this.addChild(bg);
        _this.txtCount = new egret.TextField();
        _this.txtCount.fontFamily = "微软雅黑";
        _this.txtCount.textColor = 0x072a47;
        _this.txtCount.text = "库存紧张";
        _this.txtCount.width = 50;
        _this.txtCount.size = 19;
        _this.txtCount.x = 20;
        _this.txtCount.y = 28;
        _this.addChild(_this.txtCount);
        _this.imgCheck = Global.createBitmapByName("check_no_png");
        _this.imgCheck.x = 80;
        _this.imgCheck.y = 38;
        _this.addChild(_this.imgCheck);
        _this.txtName = new egret.TextField();
        _this.txtName.textColor = 0x072a47;
        _this.txtName.fontFamily = "微软雅黑";
        _this.txtName.text = "金秋福运";
        _this.txtName.x = 110;
        _this.txtName.y = 35;
        _this.txtName.size = 27;
        _this.addChild(_this.txtName);
        _this.txtCode = new egret.TextField();
        _this.txtCode.textColor = 0x545b66;
        _this.txtCode.fontFamily = "微软雅黑";
        _this.txtCode.text = "8K98";
        _this.txtCode.x = 315;
        _this.txtCode.y = 35;
        _this.txtCode.size = 24;
        _this.addChild(_this.txtCode);
        _this.txtPrice = new egret.TextField();
        _this.txtPrice.textColor = 0x072a47;
        _this.txtPrice.fontFamily = "微软雅黑";
        _this.txtPrice.text = "998";
        _this.txtPrice.x = 380;
        _this.txtPrice.y = 35;
        _this.txtPrice.size = 24;
        _this.txtPrice.width = 110;
        _this.txtPrice.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.txtPrice);
        _this.txtRate = new egret.TextField();
        _this.txtRate.textColor = 0xff4900;
        _this.txtRate.fontFamily = "微软雅黑";
        _this.txtRate.text = "7折";
        _this.txtRate.x = 490;
        _this.txtRate.y = 35;
        _this.txtRate.size = 24;
        _this.addChild(_this.txtRate);
        // this.txtRate.border = true;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchHandler, _this);
        return _this;
    }
    ListItem.prototype.touchHandler = function () {
        if (this.data) {
            if (this.data.status != 0) {
                Message.show("已经购买过");
            }
            else if (this.data.rest) {
                this.select = !this.select;
                if (!this.select) {
                    GameDispatcher.instance.dispatchEventWith("item_cancel");
                }
            }
            else {
                Message.show("库存不足");
            }
        }
    };
    Object.defineProperty(ListItem.prototype, "select", {
        get: function () {
            if (this.data && this.data.rest) {
                return this._select;
            }
            return false;
        },
        set: function (val) {
            this._select = val;
            if (this._select) {
                this.imgCheck.texture = RES.getRes("check_ok_png");
            }
            else {
                this.imgCheck.texture = RES.getRes("check_no_png");
            }
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.setData = function (data) {
        this.data = data;
        //name,price,batchcode1,status,discount,rest
        this.txtName.text = data.name + "";
        this.txtPrice.text = "￥" + data.price + "";
        this.txtCode.text = data.batchcode1 + "";
        this.txtRate.text = data.discount + "折/￥" + Math.floor(data.disprice * 100) / 100;
        if (data.rest == 0) {
            this.txtCount.text = "库存不足";
            this.txtCount.textColor = 0x666666;
        }
        else if (data.rest > 5) {
            this.txtCount.text = "库存充足";
            this.txtCount.textColor = 0x0068AB;
        }
        else {
            this.txtCount.textColor = 0xFE3E55;
            this.txtCode.text = "库存紧张";
        }
        if (data.status != 0) {
            this.filters = Global.grayFlilter;
        }
        else {
            this.filters = [];
        }
        if (data.ischecked == 1) {
            this.select = true;
        }
    };
    return ListItem;
}(egret.DisplayObjectContainer));
__reflect(ListItem.prototype, "ListItem");
//# sourceMappingURL=ListItem.js.map