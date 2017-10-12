class ResultPop extends PopView
{
	public constructor() 
	{
		super();
	}

	public setData(data:any = null):void
	{
		this.data = data;

		var img = new CustomImage("resource/assets/asyn/answer_bg.png",true,function(){
			img.x = StageUtils.SW - img.width >> 1;
			img.y = StageUtils.SH - img.height >> 1;
		});
		this.addChild(img);

		var bg = new CustomImage("resource/assets/asyn/answer_result_"+data+".png",true,function(){
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);

		var btnClose:egret.Bitmap = Global.createBitmapByName("close_png");
		btnClose.x = StageUtils.SW - btnClose.width - 90;
		btnClose.y = 185;
		this.addChild(btnClose);

		btnClose.touchEnabled = true;
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler,this);

		MainView.instance.people.visible = false;
	}

	private closeClickHandler():void
	{
		PopManager.hidePop("ResultPop");
		MainView.instance.people.visible = true;
	}
}