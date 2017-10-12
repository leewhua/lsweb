var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MenuView = (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MenuView, "instance", {
        get: function () {
            if (!MenuView._instance) {
                MenuView._instance = new MenuView();
            }
            return MenuView._instance;
        },
        enumerable: true,
        configurable: true
    });
    MenuView.prototype.showMenu = function (target, arr) {
        if (arr === void 0) { arr = null; }
        this.removeChildren();
        if (arr) {
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var item = new MenuItemView();
                item.setData(arr[i]);
                this.addChild(item);
                item.scaleX = item.scaleY = 0;
                egret.Tween.get(item).wait(i * 100).to({ scaleX: 1, scaleY: 1 }, 300);
            }
            target.addChild(this);
            StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        }
        else {
            StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    };
    MenuView.prototype.touchHandler = function (e) {
        this.showMenu(null);
    };
    return MenuView;
}(egret.DisplayObjectContainer));
MenuView.SELF_MENU = [{ id: 1, icon: 1, x: -57, y: 21 }, { id: 2, icon: 1, x: -25, y: 58 }, { id: 3, icon: 1, x: 25, y: 58 }, { id: 4, icon: 1, x: 57, y: 21 }];
MenuView.OTHER_MENU = [{ id: 1, icon: 1, x: -25, y: 58 }, { id: 2, icon: 1, x: 25, y: 58 }];
__reflect(MenuView.prototype, "MenuView");
//# sourceMappingURL=MenuView.js.map