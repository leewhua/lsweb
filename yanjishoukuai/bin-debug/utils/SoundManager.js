var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    SoundManager.getInstance = function () {
        if (!SoundManager._instance) {
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    };
    SoundManager.prototype.play = function (res, startTime, loops) {
        if (startTime === void 0) { startTime = 0; }
        if (loops === void 0) { loops = 1; }
        if (this.isLoad) {
            var sound = RES.getRes(res);
            sound.play(startTime, loops);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map