class PersonalPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/moontype/1/"+data.ptype+".png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnDuihuan = Global.createBitmapByName("btn_duihuan_png");
		btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
		btnDuihuan.y = StageUtils.SH - 205;
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);

		if(data.isShare)
		{
			btnDuihuan.x = 36;

			var btnShare = Global.createBitmapByName("btn_share_png");
			btnShare.x = StageUtils.SW - btnShare.width - 36;
			btnShare.y = StageUtils.SH - 205;
			this.addChild(btnShare);
			Global.setBut(btnShare);
			btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler,this);
			console.log("true");
		}else
		{
			console.log("skip");
			btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
		}

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);
		
	}

	private duihuanHandler():void
	{
		PopManager.hidePop("PersonalPop");
		PopManager.showPop("AddressPop",this.data);
	}

	private shareHandler():void
	{
		console.log("shareClick");
		if(this.data)
		{
			if(this.data.type == 0)
			{
				//纸卷
				var self = this;
				$.ajax({
					url: Main.USER_INFO_API,
					data: {type:"pshare",ticket:Main.USER_TICKET,ptype:this.data.ptype},
					success: function(data)
					{
						// console.log("112");
						if(data.result == 0)
						{
							PopManager.hidePop("PersonalPop");
							PopManager.showPop("SharePop",{code:data.code});
						}else
						{
							Message.show(data.result);
						}
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
			}else
			{
				//电子卷
				var self = this;
				$.ajax({
					url: Main.USER_INFO_API,
					data: {type:"eshare",ticket:Main.USER_TICKET,ptype:this.data.ptype},
					success: function(data)
					{
						if(data.result == 0)
						{
							PopManager.hidePop("PersonalPop");
							PopManager.showPop("SharePop",{eshareinfo:data.eshareinfo,time:data.sharetime});
						}else
						{
							Message.show(data.result);
						}
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
		}
	}
}