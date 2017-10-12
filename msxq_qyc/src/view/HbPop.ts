class HbPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData();

		var bg = Global.createBitmapByName("hb_light_png");
		bg.x = StageUtils.CW;
		bg.y = StageUtils.CH;
		bg.anchorOffsetX = bg.width >> 1;
		bg.anchorOffsetY = bg.height >> 1;
		this.addChild(bg);
		egret.Tween.get(bg).to({rotation:3600},80000);

		var btn = Global.createBitmapByName("bg_btn_png");
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = StageUtils.SH - btn.height >> 1;
		this.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			egret.Tween.removeTweens(bg);
			PopManager.hidePop("HbPop");
			PopManager.showPop("RewardPop",{val:100,desc:"hb"});
		},this);


		var mc = Global.createMc("loading_json","loading_png","");
		mc.play();
		mc.x = 0;
		mc.y = 0;
		this.addChild(mc);
	}
}