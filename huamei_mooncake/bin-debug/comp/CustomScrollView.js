var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CustomScrollView = (function (_super) {
    __extends(CustomScrollView, _super);
    function CustomScrollView(content, offset, gap) {
        if (content === void 0) { content = null; }
        if (offset === void 0) { offset = 0; }
        if (gap === void 0) { gap = 0; }
        var _this = _super.call(this, content) || this;
        _this.offset = offset;
        _this.gap = gap;
        return _this;
    }
    /**
     * 设置滚动距离左侧的位置
     * @param scrollLeft 距离左侧的位置
     * @param duration 缓动时间，毫秒单位
     * @returns 获取水平滚动的tween
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    CustomScrollView.prototype.setScrollLeft = function (scrollLeft, duration) {
        if (duration === void 0) { duration = 0; }
        console.log(scrollLeft, this.getMaxScrollLeft());
        if (scrollLeft < -50 + this.gap / 2) {
            scrollLeft = -50;
        }
        else if (scrollLeft > 50 + this.getMaxScrollLeft() - this.gap / 2) {
            scrollLeft = 50 + this.getMaxScrollLeft();
        }
        else {
            var num = Math.round((scrollLeft - 50) / this.gap);
            console.log(num);
            scrollLeft = num * this.gap;
        }
        _super.prototype.setScrollLeft.call(this, scrollLeft, duration);
        // let finalPosition = Math.min(this.getMaxScrollLeft(), Math.max(scrollLeft, 0));
        // if (duration == 0) {
        //     this.scrollLeft = finalPosition;
        //     return;
        // }
        // if (this._ScrV_Props_._bounces == false)
        //     scrollLeft = finalPosition;
        // let htween = egret.ScrollTween.get(this).to({scrollLeft: scrollLeft}, duration, egret.ScrollEase.quartOut);
        // if (finalPosition != scrollLeft) {
        //     htween.to({scrollLeft: finalPosition}, 300, egret.ScrollEase.quintOut);
        // }
        // this._ScrV_Props_._isHTweenPlaying = true;
        // this._ScrV_Props_._hScrollTween = htween;
        // htween.call(this.onTweenFinished, this, [htween]);
        // if (!this._ScrV_Props_._isVTweenPlaying)
        //     this._onScrollStarted();
    };
    return CustomScrollView;
}(egret.ScrollView));
__reflect(CustomScrollView.prototype, "CustomScrollView");
//# sourceMappingURL=CustomScrollView.js.map