class EndPop extends PopView
{
	private container:egret.DisplayObjectContainer;

	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);
		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		var str;
		var str1;
		if(data == 66600)
		{
			str = "resource/assets/asyn/game"+Main.type+"_result_bg1.png";
			str1 = "btn_get_png";
		}else
		{
			str = "resource/assets/asyn/game"+Main.type+"_result_bg.png";
			str1 = "btn_share_png";
		}
		var bg = new CustomImage(str,true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.container.addChild(bg);

		var share = Global.createBitmapByName(str1);
		share.x = StageUtils.SW - share.width >> 1;
		share.y = 870;
		this.container.addChild(share);

		Global.setBut(share);
		share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler,this);

		var money = Global.createBitmapByName("money_"+data+"_png");
		money.x = 212;
		money.y = 538;
		this.container.addChild(money);

		if(Main.type == 2)
		{
			money.y = 535;
		}
		else if(Main.type == 3)
		{
			money.y = 558;
		}
	}

	private shareHandler():void
	{
		if(this.data == 66600)
		{
			PopManager.hidePop("EndPop");
			PopManager.showPop("InfoPop");
			// PopManager.showPop("InputPop");
		}else
		{

			this.container.removeChildren();

			var bg = new CustomImage("resource/assets/asyn/get_ok.png",true,()=>{
				bg.x = StageUtils.SW - bg.width >> 1;
				bg.y = StageUtils.SH - bg.height >> 1;
			});
			this.container.addChild(bg);

			var share = Global.createBitmapByName("btn_share_friend_png");
			share.x = StageUtils.SW - share.width >> 1;
			share.y = 870;
			this.container.addChild(share);

			Global.setBut(share);
			share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler1,this);
		}
	}

	private shareHandler1():void
	{
		PopManager.hidePop("EndPop");
		PopManager.showPop("SharePop");
	}
}