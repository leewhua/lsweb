class SharePop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);
		var url = "";
		if(data)
		{
			url = "resource/assets/asyn/end_no.png";
		}else
		{
			url = "resource/assets/asyn/share.png";
		}
		var bg = new CustomImage(url,true,()=>
		{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = 30;
		});
		this.addChild(bg);
	}
}