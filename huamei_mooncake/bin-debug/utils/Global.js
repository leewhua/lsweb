var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Global = (function () {
    function Global() {
    }
    Global.createBitmapByRes = function (res, name) {
        var result = new egret.Bitmap();
        var spriteSheet = RES.getRes(res);
        console.log("name::" + name + "::" + res);
        result.texture = spriteSheet.getTexture(name);
        return result;
    };
    Global.createBitmapByName = function (name, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        return result;
    };
    Global.fadeIn = function (m, d, t, sc) {
        if (d === void 0) { d = 0; }
        if (t === void 0) { t = 500; }
        if (sc === void 0) { sc = 1; }
        Global.tweenFrom(m, d, t, 0, 0, sc, egret.Ease.cubicOut);
    };
    Global.fadeOut = function (m, d, t, sc) {
        if (d === void 0) { d = 0; }
        if (t === void 0) { t = 500; }
        if (sc === void 0) { sc = 1; }
        Global.tweenToHide(m, d, t, 0, 0, sc, egret.Ease.cubicOut);
    };
    Global.zoomIn = function (m, d, t, sc) {
        if (d === void 0) { d = 0; }
        if (t === void 0) { t = 500; }
        if (sc === void 0) { sc = 0.6; }
        Global.tweenFrom(m, d, t, 0, 0, sc, egret.Ease.backOut);
    };
    Global.zoomOut = function (m, d, t, sc) {
        if (d === void 0) { d = 0; }
        if (t === void 0) { t = 500; }
        if (sc === void 0) { sc = 1.5; }
        Global.tweenToHide(m, d, t, 0, 0, sc, egret.Ease.cubicIn);
    };
    Global.tweenToHide = function (m, d, t, ox, oy, sc, ease, alpha) {
        if (alpha === void 0) { alpha = 0; }
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        //var h = m.height;
        xx = xx + ox; // + (1 - sc) / 2 * w;
        yy = yy + oy; // + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: alpha, scaleX: sc, scaleY: sc, x: xx, y: yy }, t, ease);
        tw.call(function () {
            if (m.parent)
                m.parent.removeChild(m);
        });
    };
    Global.tweenTo = function (m, d, t, x, y, a, sc, ease) {
        if (a === void 0) { a = 1; }
        if (sc === void 0) { sc = 1; }
        if (ease === void 0) { ease = egret.Ease.cubicOut; }
        var tw = egret.Tween.get(m);
        tw.wait(d);
        if (ease) {
            tw.to({ alpha: a, scaleX: sc, scaleY: sc, x: x, y: y }, t, ease);
        }
        else {
            tw.to({ alpha: a, scaleX: sc, scaleY: sc, x: x, y: y }, t);
        }
    };
    Global.tweenFrom = function (m, d, t, ox, oy, sc, ease) {
        var tw = egret.Tween.get(m);
        var xx = m.x;
        var yy = m.y;
        //var w = m.width;
        // var h = m.height;
        m.scaleX = m.scaleY = sc;
        m.x = xx + ox; // + (1 - sc) / 2 * w;
        m.y = yy + oy; // + (1 - sc) / 2 * h;
        tw.wait(d);
        tw.to({ alpha: 1, scaleX: 1, scaleY: 1, x: xx, y: yy }, t, ease);
    };
    Global.createMc = function (json, png, lab) {
        var data = RES.getRes(json); //JSON  
        var texture = RES.getRes(png); //Texture  
        var md = new egret.MovieClipDataFactory(data, texture);
        var result = new egret.MovieClip(md.generateMovieClipData(lab));
        //result.play();
        return result;
    };
    Global.remove = function (sp) {
        if (sp && sp.parent) {
            sp.parent.removeChild(sp);
        }
    };
    Global.setBut = function (sp) {
        if (sp) {
            sp.touchEnabled = true;
            sp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { sp.alpha = 0.68; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_END, function () { sp.alpha = 1; }, sp);
            sp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () { sp.alpha = 1; }, sp);
        }
    };
    Global.getArrayItems = function (arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            }
            else {
                break;
            }
        }
        return return_array;
    };
    Global.errorTips = function (data) {
        if (data) {
            if (data.reason == "invalidticket") {
                //ticket过期
                PopManager.showPop("ErrorPop", ErrorCode.TICKET_TIME_OUT);
            }
            else if (data.reason == "invalidticketparam") {
                //无效ticket
                PopManager.showPop("ErrorPop", ErrorCode.NOT_FOUND);
            }
            else {
                //系统繁忙
                PopManager.showPop("ErrorPop", ErrorCode.SYSTEM_ERROR);
            }
        }
    };
    Global.showTips = function (str) {
        Message.show(str);
    };
    return Global;
}());
Global.grayMatrix = [
    0.3, 0.6, 0, 0, 0,
    0.3, 0.6, 0, 0, 0,
    0.3, 0.6, 0, 0, 0,
    0, 0, 0, 1, 0
];
/**
 * 变灰滤镜
 */
Global.grayFlilter = [new egret.ColorMatrixFilter(Global.grayMatrix)];
Global.grayFlilter1 = [new egret.ColorMatrixFilter([
        0.1, 0.1, 0, 0, 200,
        0.1, 0.1, 0, 0, 0,
        0.1, 0.1, 0, 0, 0,
        0, 0, 0, 1, 0
    ])];
Global.DM_Filter = [new egret.GlowFilter(0x149340, 0.5, 30, 30, 2, 1)];
Global.GZ_Filter = [new egret.GlowFilter(0xB0D54C, 0.5, 30, 30, 2, 1)];
Global.JZ_Filter = [new egret.GlowFilter(0xD4C884, 0.5, 30, 30, 2, 1)];
Global.RP_Filter = [new egret.GlowFilter(0x4CBFFF, 0.5, 30, 30, 2, 1)];
Global.QP_Filter = [new egret.GlowFilter(0xA2A2A2, 0.5, 30, 30, 2, 1)];
Global.AI_Filter = [new egret.GlowFilter(0xCC0000, 0.5, 30, 30, 2, 1)];
__reflect(Global.prototype, "Global");
//# sourceMappingURL=Global.js.map