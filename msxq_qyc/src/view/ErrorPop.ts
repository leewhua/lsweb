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
		}else if(data == 2)
		{
			url = "resource/assets/error/error_web.png";
		}else if(data == 3)
		{
			url = "resource/assets/error/error_code.png";
		}
		var bg = new CustomImage(url,true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = (StageUtils.SH - bg.height >> 1) - 100;
		});
		this.addChild(bg);
	}
}