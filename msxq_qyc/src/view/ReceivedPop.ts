class ReceivedPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData():void
	{
		var bg = Global.createBitmapByName("pop_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var tips = Global.createBitmapByName("received_bg_png");
		tips.x = StageUtils.SW - tips.width >> 1;
		tips.y = (StageUtils.SH - tips.height >> 1) - 80;
		this.addChild(tips);

		var btnClose = Global.createBitmapByName("btn_into_shop_png");
		btnClose.x = StageUtils.SW - btnClose.width >> 1;
		btnClose.y = (StageUtils.SH - btnClose.height >> 1) + 220;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);

		var close1 = Global.createBitmapByName("close_png");
		close1.x = 540;
		close1.y = 160;
		this.addChild(close1);
		Global.setBut(close1);
		close1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler1,this);
	}

	private closeHandler1():void
	{
		PopManager.hidePop("ReceivedPop");
	}

	private closeHandler():void
	{
		window.location.href = UserInfo.instance.smallsow_url;
	}
}