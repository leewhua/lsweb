class InfoCardItem extends egret.DisplayObjectContainer
{
	private count;

	private type;

	/**
	 * 0 可兑换可分享
	 * 1 可兑换
	 * 2 不可兑换不可分享
	 */
	private state;

	private eshare;

	private txtNum:egret.TextField;

	public constructor(count,type,state,eshare = null)
	{
		super();
		this.count = count;
		this.type = type;
		this.state = state;
		this.eshare = eshare;
		var bg = new CustomImage("resource/assets/asyn/moontype/"+(state == 2?8:3)+"/"+type+".png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
		});
		this.addChild(bg);

		if(state == 0)
		{
			var btnGet = Global.createBitmapByName("btn_get1_png");
			btnGet.x = 365;
			btnGet.y = 16;
			this.addChild(btnGet);
			Global.setBut(btnGet);
			btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getHandler,this);
		}else if(state == 1)
		{
			var btnGet = Global.createBitmapByName("btn_get_png");
			btnGet.x = 390;
			btnGet.y = 16;
			this.addChild(btnGet);
			Global.setBut(btnGet);
			btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getHandler,this);
		}

		var numBg = Global.createBitmapByName("num_bg_png");
		numBg.x = 297;
		numBg.y = 16;
		this.addChild(numBg);
		
		this.txtNum = new egret.TextField();
		this.txtNum.x = 300;
		this.txtNum.y = 22;
		this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
		this.txtNum.width = 54;
		this.txtNum.textColor = 0x0;
		this.addChild(this.txtNum);

		this.txtNum.text = this.count + "";
	}

	private getHandler():void
	{
		if(this.count)
		{
			PopManager.hidePop("InfoPop");
			if(this.state == 0)
			{
				PopManager.showPop("PersonalPop",{type:1,ptype:this.type,isShare:true});
			}else
			{
				PopManager.showPop("PersonalPop",{type:1,ptype:this.type,eshare:this.eshare});
			}
		}
	}
}