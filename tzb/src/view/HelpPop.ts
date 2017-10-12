class HelpPop extends PopView
{
	public constructor() 
	{
		super();
	}

	public setData(data:any = null):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/action_bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);

		 //创建 ScrollView
        var scrollView:egret.ScrollView = new egret.ScrollView();
        
        //设置滚动区域宽高
        scrollView.width = 473;
        scrollView.height = 450;
		
		scrollView.y = 415;
        this.addChild(scrollView);
		var content = new CustomImage("resource/assets/asyn/action.png",true,()=>{
			//设置滚动内容
        	scrollView.setContent(content);
			scrollView.x = StageUtils.SW - content.width >> 1;
		});

		var up = Global.createBitmapByName("btn_up_png");
		up.x = StageUtils.SW - up.width >> 1;
		up.y = StageUtils.SH - 160;
		this.addChild(up);

		var close = Global.createBitmapByName("btn_close_png");
		close.x = 545;
		close.y = 133;
		this.addChild(close);
		Global.setBut(close);
		close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);
	}

	private closeHandler():void
	{
		PopManager.hidePop("HelpPop");
	}
}