class SmallShopPop1 extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/shop_bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);
	
		var btn = Global.createBitmapByName("btn_into_shop_png");
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = StageUtils.SH - 300;
		this.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);

		var close1 = Global.createBitmapByName("close_png");
		close1.x = 540;
		close1.y = 160;
		this.addChild(close1);
		Global.setBut(close1);
		close1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler1,this);
	}

	private closeHandler1():void
	{
		PopManager.hidePop("SmallShopPop1");
	}

	private touchHandler():void
	{
		window.location.href = UserInfo.instance.smallsow_url;
	}
}