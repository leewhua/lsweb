class HasGetBuyPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/has_get_buy_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnDuihuan = Global.createBitmapByName("btn_buy_gift_png");
		btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
		btnDuihuan.y = 450;
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);
	}

	private duihuanHandler():void
	{
		PopManager.hidePop("HasGetBuyPop");
		PopManager.showPop("InfoPop",3);
	}
}