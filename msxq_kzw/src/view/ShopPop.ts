class ShopPop extends PopView
{
	private state = 0;
	public constructor()
	{
		super();
	}

	public setData(data:any = null):void
	{
		console.log(data);
		this.data = data;
		var n,t;
		if(data.type == "yanjishoukuai"){
			n = 5;
			t = 2;
		}else if(data.type == "weidian"){
			n = 3;
			t = 3;
		}
		this.removeChildren();

		var bg = new CustomImage("resource/assets/asyn/shop_"+ n +".png",true,()=>{ //data.shopid
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);
		
		var t;
		// if(data.shopid == 3)
		// {
		// 	t = 3;
		// }else
		// {
		// 	t = 2;
		// }
		var btnInto = Global.createBitmapByName("btn_into_"+t+"_png");
		btnInto.x = StageUtils.SW - btnInto.width >> 1;
		btnInto.y = 718;
		this.addChild(btnInto);

		btnInto.touchEnabled = true;
		Global.setBut(btnInto);
		btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okClickHandler,this);

		var btnClose:egret.Bitmap = Global.createBitmapByName("close_png");
		btnClose.x = StageUtils.SW - btnClose.width - 60;
		btnClose.y = 210;
		this.addChild(btnClose);

		btnClose.touchEnabled = true;
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler,this);
	}

	private okClickHandler():void
	{
		MainView.instance.play(this.data);
	}

	private closeClickHandler():void
	{
		PopManager.hidePop("ShopPop");
	}
}