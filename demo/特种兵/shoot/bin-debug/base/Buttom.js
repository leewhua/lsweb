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
var Buttom = (function (_super) {
    __extends(Buttom, _super);
    //private lable:string
    function Buttom(out, over, x, y) {
        if (over === void 0) { over = null; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = _super.call(this) || this;
        _this.addChild(out);
        _this.x = x;
        _this.y = y;
        Global.setBut(_this);
        return _this;
    }
    return Buttom;
}(egret.Sprite));
__reflect(Buttom.prototype, "Buttom");
//# sourceMappingURL=Buttom.js.map