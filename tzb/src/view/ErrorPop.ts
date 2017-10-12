class ErrorPop extends PopView
{
	public constructor() 
	{
		super();
	}

	public setData(data = 1):void
	{
		var url = "";
		if(data == 1)
		{
			url = "resource/assets/error/is_get.png";

			var btnGame = new CustomImage("resource/assets/error/btn_game.png",true,()=>{
				btnGame.x = StageUtils.SW - btnGame.width >> 1;
				btnGame.y = (StageUtils.SH - btnGame.height >> 1) + 60;
			});
			//this.addChild(btnGame);
			//Global.setBut(btnGame);
			//btnGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameHandler,this);

		}else if(data == 2)
		{
			url = "resource/assets/error/web_error.png";
		}else if(data == 3)
		{
			url = "resource/assets/error/code_error.png";
		}else if(data == 4){
			url = "resource/assets/error/limit_error.png";
		}
		var bg = new CustomImage(url,true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);
	}

	private gameHandler():void
	{
		PopManager.hidePop("ErrorPop");
		Main.instance.loadRes();
	}
}