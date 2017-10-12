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
var SelectGunPop = (function (_super) {
    __extends(SelectGunPop, _super);
    function SelectGunPop() {
        return _super.call(this) || this;
    }
    SelectGunPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay, false);
        var bg = Global.createBitmapByName('s_bg_png', -588, -180);
        var title = Global.createBitmapByName('settting_my_png', 384, -94);
        var levelIco;
        var levelTip;
        if (GameInfo.level == 0) {
            levelTip = Global.createBitmapByName('setting_level' + GameInfo.level + '_title_png', -240, -94);
        }
        else {
            levelIco = Global.createBitmapByName('setting_level' + GameInfo.level + '_png', -180, -118);
            levelTip = Global.createBitmapByName('setting_level' + GameInfo.level + '_title_png', -120, -94);
        }
        //s_a_png
        this.leftBtn = new Middle(Global.createBitmapByName('s_a_png'), -180, 55);
        this.rightBtn = new Middle(Global.createBitmapByName('s_a_png'), 491, 55);
        this.rightBtn.scaleX = -1;
        var line = Global.createBitmapByName('buy_line_png', -188, -41);
        var toPlay = Global.createBitmapByName('to_play_png', -72, 165);
        var toShop = Global.createBitmapByName('to_shop_png', 213, 165);
        this.ren = new GunRenBar(GameInfo.play_ren, GameInfo.gun);
        this.gun = new GunBar(GameInfo.gun);
        this.gun.x = 162;
        this.gun.y = 70;
        Global.setBut(this.leftBtn);
        Global.setBut(this.rightBtn);
        Global.setBut(toPlay);
        Global.setBut(toShop);
        this.view.addChild(bg);
        this.view.addChild(title);
        if (levelIco)
            this.view.addChild(levelIco);
        this.view.addChild(levelTip);
        this.view.addChild(line);
        this.view.addChild(this.ren);
        this.view.addChild(this.gun);
        this.view.addChild(toPlay);
        this.view.addChild(toShop);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.select(-1);
        }, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.select(1);
        }, this);
        toPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'to_play', true));
        }, this);
        toShop.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            this.dispatchEvent(new EventObj('event', 'to_shop', true));
        }, this);
        this.select(0);
    };
    SelectGunPop.prototype.select = function (f) {
        var list = GameInfo.guns;
        var index = GameInfo.gunSelect;
        console.log(list, index);
        if (f == -1) {
            index = index - 1;
        }
        else if (f == 1) {
            index = index + 1;
        }
        console.log(index, list.length);
        if (index < 0)
            index = 0;
        if (index >= list.length)
            index = list.length - 1;
        GameInfo.gunSelect = index;
        var type = GameInfo.guns[index].type;
        GameInfo.gun = type;
        this.gun.setType(type);
        this.ren.setGun(type);
        if (list.length > 1 && index > 0) {
            this.view.addChild(this.leftBtn);
        }
        else {
            Global.remove(this.leftBtn);
        }
        if (index < list.length - 1) {
            this.view.addChild(this.rightBtn);
        }
        else {
            Global.remove(this.rightBtn);
        }
    };
    return SelectGunPop;
}(PopView));
__reflect(SelectGunPop.prototype, "SelectGunPop");
//# sourceMappingURL=SelectGunPop.js.map