var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.playEffect = function (url) {
        var audio = RES.getRes(url);
        audio.play(0, 1);
    };
    return AudioManager;
}());
__reflect(AudioManager.prototype, "AudioManager");
//# sourceMappingURL=AudioManager.js.map