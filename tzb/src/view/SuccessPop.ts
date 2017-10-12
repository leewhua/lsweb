class SuccessPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/success_bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = (StageUtils.SH - bg.height >> 1) - 100;
		});
		this.addChild(bg);

		var share = Global.createBitmapByName("btn_share_friend_png");
		share.x = StageUtils.SW - share.width >> 1;
		share.y = 650;
		this.addChild(share);

		Global.setBut(share);
		share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler,this);
	}

	private shareHandler():void
	{
		PopManager.hidePop("SuccessPop");
		PopManager.showPop("SharePop");
	}
}