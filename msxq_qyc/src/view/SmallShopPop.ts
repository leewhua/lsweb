class SmallShopPop extends PopView
{
	private state = 0;
	public constructor()
	{
		super();
	}

	public setData(data:any = null):void
	{
		this.data = data;

		this.removeChildren();

		var bg = Global.createBitmapByName("pop_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var share = new CustomImage("resource/assets/asyn/smallsow_bg.png",true,()=>{
			share.x = (StageUtils.SW - share.width >> 1) + 10;
			share.y = (StageUtils.SH - share.height >> 1) - 100;
		});
		this.addChild(share);

		var btnReturn = Global.createBitmapByName("btn_return_png");
		btnReturn.x = StageUtils.SW - btnReturn.width >> 1;
		btnReturn.y = 600;
		this.addChild(btnReturn);

		btnReturn.touchEnabled = true;
		Global.setBut(btnReturn);
		btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnClickHandler,this);
		
		var btnInto = Global.createBitmapByName("btn_into_shop_png");
		btnInto.x = StageUtils.SW - btnInto.width >> 1;
		btnInto.y = 718;
		this.addChild(btnInto);

		btnInto.touchEnabled = true;
		Global.setBut(btnInto);
		btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okClickHandler,this);
	}

	private okClickHandler():void
	{
		window.location.href = UserInfo.instance.smallsow_url;
	}

	private returnClickHandler():void
	{
		PopManager.hidePop("SmallShopPop");
	}
}