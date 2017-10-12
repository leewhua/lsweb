class TipsPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData():void
	{
		var bg = Global.createBitmapByName("tips_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var btnClose = Global.createBitmapByName("close_png");
		btnClose.x = StageUtils.SW - 80;
		btnClose.y = (StageUtils.SH - btnClose.height >> 1) - 205;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);
	}

	private closeHandler():void
	{
		PopManager.hidePop("TipsPop");
	}
}