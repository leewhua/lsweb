class TipsPop extends PopView
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

		var bg = new CustomImage("resource/assets/asyn/tips_"+data+".png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);
		
		var btnInto = Global.createBitmapByName("btn_ok_png");
		btnInto.x = StageUtils.SW - btnInto.width >> 1;
		btnInto.y = 770;
		this.addChild(btnInto);

		btnInto.touchEnabled = true;
		Global.setBut(btnInto);
		btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okClickHandler,this);

		var btnClose:egret.Bitmap = Global.createBitmapByName("close_png");
		btnClose.x = StageUtils.SW - btnClose.width - 65;
		btnClose.y = 198;
		this.addChild(btnClose);

		btnClose.touchEnabled = true;
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler,this);
	}

	private okClickHandler():void
	{
		PopManager.hidePop("TipsPop");
	}

	private closeClickHandler():void
	{
		PopManager.hidePop("TipsPop");
	}
}