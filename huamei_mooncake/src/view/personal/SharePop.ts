class SharePop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		Main.showShare();

		var bg = new CustomImage("resource/assets/asyn/share_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		if(data != undefined)
		{
			// alert(data);
			if(data.code)
			{
				// console.log("true");
				// alert("code1");
				Main.share(data.code);
			}else
			{
				// console.log("flase");
				// alert("code2");
				// alert(data.eshareinfo);
				Main.share("http://res.leasiondata.cn/lstatic/wxShare/weixin-share.html?"+data.eshareinfo,data.eshareinfo,data.time);
				// window.location.href = "http://res.leasiondata.cn/lstatic/wxShare/wxShare.html?"+data.eshareinfo,data.eshareinfo,data.time;
			}
		}
	}
}