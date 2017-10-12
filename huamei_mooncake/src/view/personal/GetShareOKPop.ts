class GetShareOKPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/get_share_ok.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnDuihuan = Global.createBitmapByName("btn_select_info_png");
		btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
		btnDuihuan.y = 350;
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);

		var self = this;
		$.ajax({
			url: Main.USER_INFO_API,
			data: {type:"eshareget",ticket:Main.USER_TICKET,eshareinfo:this.data.payorder},
			success: function(data)
			{
				// if(data.result == 0)
				// {
				// 	PopManager.hidePop("PersonalPop");
				// 	PopManager.showPop("SharePop",{eshareinfo:data.eshareinfo});
				// }else
				// {
				// 	Message.show(data.result);
				// }
			},
			error: function()
			{
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
					PopManager.showPop("ErrorPop",{url:"resource/assets/asyn/error/error_web.png"});
				}
			}
		});
	}

	private duihuanHandler():void
	{
		PopManager.hidePop("GetShareOKPop");
		PopManager.showPop("InfoPop");
	}
}