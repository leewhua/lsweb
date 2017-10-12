var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameDispatcher = (function (_super) {
    __extends(GameDispatcher, _super);
    function GameDispatcher() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GameDispatcher, "instance", {
        get: function () {
            if (!GameDispatcher._instance) {
                GameDispatcher._instance = new GameDispatcher();
            }
            return GameDispatcher._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameDispatcher;
}(egret.EventDispatcher));
__reflect(GameDispatcher.prototype, "GameDispatcher");
//# sourceMappingURL=GameDispatcher.js.map