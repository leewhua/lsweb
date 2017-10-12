class GuanZhuPop extends PopView
{
	private state = 0;

	private code:QRCode;

	public constructor()
	{
		super();
	}

	public setData(data:any = null):void
	{
		this.data = data;

		this.removeChildren();

		// var bg = new CustomImage("resource/assets/asyn/pop_bg.png",true,()=>{
		// 	bg.x = StageUtils.SW - bg.width >> 1;
		// 	bg.y = StageUtils.SH - bg.height >> 1;
		// });
		// this.addChild(bg);

		var bg = Global.createBitmapByName("pop_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var bg1 = Global.createBitmapByName("guanzhu_bg_png");
		bg1.x = StageUtils.SW - bg1.width >> 1;
		bg1.y = StageUtils.SH - bg1.height >> 1;
		this.addChild(bg1);
		
		
		var btnInto = Global.createBitmapByName("btn_get_zhidao_png");
		btnInto.x = StageUtils.SW - btnInto.width >> 1;
		btnInto.y = 750;
		this.addChild(btnInto);

		btnInto.touchEnabled = true;
		Global.setBut(btnInto);
		btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okClickHandler,this);

		this.code = new QRCode("resource/assets/asyn/guanzhu_code.png");
		this.code.setPosition(StageUtils.SW - 206 >> 1,(StageUtils.SH - 206 >> 1) + 20,206,206);
		this.code.showHtmlCode();
	}

	private okClickHandler():void
	{
		this.code.hideHtmlCode();
		PopManager.hidePop("GuanZhuPop");	
	}
}