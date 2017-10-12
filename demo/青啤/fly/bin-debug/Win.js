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
var Win = (function (_super) {
    __extends(Win, _super);
    function Win() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    Win.prototype.eventHandler = function (event) {
        switch (event.name) {
            case 'close_help':
                console.log("close_help");
                //this.removeChild();
                break;
            case 'play_end':
                console.log("play_end");
                break;
            case 'to_shop':
                break;
        }
        console.log(event.type + ":" + event.name);
    };
    Win.prototype.onAddToStage = function (event) {
        //初始化intro
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
    };
    return Win;
}(egret.DisplayObjectContainer));
__reflect(Win.prototype, "Win");
//# sourceMappingURL=Win.js.map