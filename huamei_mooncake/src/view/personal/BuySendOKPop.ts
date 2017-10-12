class BuySendOKPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/pay_send_ok_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnClose = Global.createBitmapByName("btn_share_3_png");
		btnClose.x = StageUtils.SW - btnClose.width >> 1;
		btnClose.y = 300;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);
	}

	private closeHandler():void
	{
		PopManager.hidePop("BuySendOKPop");
		PopManager.showPop("InfoPop",2);
	}
}