var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StageUtils = (function () {
    function StageUtils() {
    }
    StageUtils.registStage = function (cusStage) {
        StageUtils.stage = cusStage;
        StageUtils.CW = cusStage.stageWidth >> 1;
        StageUtils.CH = cusStage.stageHeight >> 1;
    };
    StageUtils.centerInParentX = function (target, parent) {
        if (parent === void 0) { parent = null; }
        if (target) {
            if (parent) {
                target.x = parent.width - target.width >> 1;
            }
            else {
                target.x = StageUtils.stage.stageWidth - target.width >> 1;
            }
        }
    };
    StageUtils.centerInParentY = function (target, parent) {
        if (parent === void 0) { parent = null; }
        if (target) {
            if (parent) {
                target.y = parent.height - target.height >> 1;
            }
            else {
                target.y = StageUtils.stage.stageHeight - target.height >> 1;
            }
        }
    };
    StageUtils.centerInParent = function (target, cusX, cusY, parent) {
        if (cusX === void 0) { cusX = 0; }
        if (cusY === void 0) { cusY = 0; }
        if (parent === void 0) { parent = null; }
        if (target) {
            if (parent) {
                target.x = (parent.width - target.width >> 1) + cusX;
                target.y = (parent.height - target.height >> 1) + cusY;
            }
            else {
                target.x = (StageUtils.stage.stageWidth - target.width >> 1) + cusX;
                target.y = (StageUtils.stage.stageHeight - target.height >> 1) + cusY;
            }
        }
    };
    return StageUtils;
}());
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map