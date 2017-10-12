var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PropListView = (function (_super) {
    __extends(PropListView, _super);
    function PropListView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    PropListView.prototype.init = function () {
        this.initList();
    };
    PropListView.prototype.initList = function () {
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        this.listArr = [];
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 3; j++) {
                var prop = new PropItemView(Math.ceil(Math.random() * 8));
                // prop.scaleX = prop.scaleY = 0.5;
                this.container.addChild(prop);
                prop.x = i * 110 + 45;
                prop.y = j * 160 + 330;
                this.listArr.push(prop);
            }
        }
    };
    PropListView.prototype.move = function (bl) {
        if (bl) {
            this.randomGlow();
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
        else {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.removeSelect();
        }
    };
    PropListView.prototype.enterFrameHandler = function () {
        var hasGlow;
        var num = 0;
        var arr = [];
        var len = this.listArr.length;
        for (var i = 0; i < len; i++) {
            var prop = this.listArr[i];
            if (prop) {
                if (prop.canMove) {
                    prop.x -= 2;
                }
                if (prop.x < 50 && prop.canSelect) {
                    arr.push(prop.y);
                    num++;
                    prop.canSelect = false;
                    if (prop.isGlow) {
                        prop.setGlow(false);
                        hasGlow = true;
                    }
                }
                if (prop.x < -50) {
                    this.container.removeChild(prop);
                    this.listArr.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
        if (num > 0) {
            this.addProp(num, arr, hasGlow);
        }
    };
    PropListView.prototype.removeSelect = function () {
        if (this.select) {
            var index = this.listArr.indexOf(this.select);
            if (index != -1) {
                this.listArr.splice(index, 1);
            }
            this.container.removeChild(this.select);
            this.select = null;
        }
    };
    PropListView.prototype.randomGlow = function () {
        var len = this.listArr.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
            var prop = this.listArr[i];
            if (prop && prop.canSelect) {
                arr.push(prop);
            }
        }
        var index = Math.floor(Math.random() * arr.length);
        var prop = arr[index];
        console.log("index:" + index);
        if (prop) {
            prop.setGlow(true);
            this.select = prop;
        }
    };
    PropListView.prototype.addProp = function (num, arr, hasGlow) {
        for (var i = 0; i < num; i++) {
            var prop = new PropItemView(Math.ceil(Math.random() * 8));
            // prop.scaleX = prop.scaleY = 0.5;
            this.container.addChild(prop);
            prop.x = 6 * 110 + 45;
            prop.y = arr[i];
            this.listArr.push(prop);
        }
        if (hasGlow) {
            this.randomGlow();
        }
    };
    return PropListView;
}(egret.DisplayObjectContainer));
__reflect(PropListView.prototype, "PropListView");
//# sourceMappingURL=PropListView.js.map