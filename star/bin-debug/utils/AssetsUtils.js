var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AssetsUtils = (function () {
    function AssetsUtils() {
    }
    /**
     * 获得单张图片
     */
    AssetsUtils.createBitmapByName = function (name, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        return result;
    };
    return AssetsUtils;
}());
__reflect(AssetsUtils.prototype, "AssetsUtils");
//# sourceMappingURL=AssetsUtils.js.map