class CustomScrollView extends egret.ScrollView
{
	private offset;
	private gap;
	public constructor(content:egret.DisplayObject = null,offset = 0,gap = 0) 
	{
		super(content);
		this.offset = offset;
		this.gap = gap;
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
	public setScrollLeft(scrollLeft:number, duration:number = 0):void 
	{
		console.log(scrollLeft,this.getMaxScrollLeft());
		if(scrollLeft < -50 + this.gap / 2)
		{
			scrollLeft = -50;
		}else if(scrollLeft > 50 + this.getMaxScrollLeft() - this.gap / 2)
		{
			scrollLeft = 50 + this.getMaxScrollLeft();
		}else
		{
			var num = Math.round((scrollLeft - 50 ) / this.gap);
			console.log(num);
			scrollLeft = num * this.gap;
		}
		super.setScrollLeft(scrollLeft,duration);
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
	}
}