class OkPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/ok_bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = (StageUtils.SH - bg.height >> 1) - 100;
		});
		this.addChild(bg);

		var share = Global.createBitmapByName("btn_get_png");
		share.x = StageUtils.SW - share.width >> 1;
		share.y = 650;
		this.addChild(share);

		Global.setBut(share);
		share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler,this);

		var phone = Global.createBitmapByName("btn_400_png");
		phone.x = StageUtils.SW - phone.width >> 1;
		phone.y = 760;
		this.addChild(phone);

		Global.setBut(phone);
		phone.addEventListener(egret.TouchEvent.TOUCH_TAP,this.phoneHandler,this);
	}

	private shareHandler():void
	{
		PopManager.hidePop("OkPop");
		PopManager.showPop("InputPop");
	}

	private phoneHandler():void
	{
		window.location.href = "tel:4000828079";
	}
}