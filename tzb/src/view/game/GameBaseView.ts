class GameBaseView extends egret.DisplayObjectContainer
{
	private danmuList:DanmuListView;
	public constructor()
	{
		super();
	}

	protected initDanmuSend():void
	{
		var danmu = new DanmuSendView();
		this.addChild(danmu);
		danmu.addEventListener("add_self",this.addSelfHandler,this);
	}

	private addSelfHandler(e:egret.Event):void
	{
		var obj = e.data;
		if(obj)
		{
			if(this.danmuList)
			{
				this.danmuList.addSelf(obj);
			}
		}
	}

	protected initDanmuList():void
	{
		this.danmuList = new DanmuListView();
		this.danmuList.setData(Main.content);
		this.addChild(this.danmuList);
	}

	public play():void
	{
		if(Main.isGet)
		{
			UIManager.instance.initShareView();
		}else
		{
			var self = this;
			$.ajax({
				url: sessionStorage.getItem("interface"),
				data: {ticket:sessionStorage.getItem("luckticket")},
				success: function(data)
				{
					if(data.result == "success")
					{
						// if(data.prizes[0].require != "" && data.prizes[0].require.indexOf("ADDR") == 0){
						// 	//step=cashed  没填信息
						// 	Main.step = "cashed";
						// 	sessionStorage.setItem("addr", "ADDR");
						// }else{
						// 	//step=filled  填过信息
						// 	Main.step = "filled";
						// 	var addr = data.prizes[0].require.split("#")[0];
						// 	sessionStorage.setItem("addr", addr);
						// }
						
						if (data.prizes.length>0){
							if (data.prizes[0].value=="0"){
								Main.share(true);
								PopManager.showPop("SharePop",1);
							} else {
								Main.share(true);
								PopManager.showPop("EndPop",data.prizes[0].value);
								if (data.prizes[0].value="66600"){
									sessionStorage.setItem("confirmticket",data.prizes[0].ticket);
									// alert("666yuanticket:" + sessionStorage.getItem("confirmticket"));
								}
							}
					} else {
						PopManager.showPop("SharePop",1);
					}
					}else
					{
						// Message.show(data.reason);
						PopManager.showPop("ErrorPop",2);
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
					}
				}
			});
	}/*
			$.ajax({
				url: Main.PLAY_API,
				data: {ticket:Main.PLAY_TICKET},
				success: function(data)
				{
					if(data.result == "success")
					{
						if(data.more.result == "success")
						{
							self.result(data);
						}else if(data.more.result == "fail" && data.more.reason == "c1ashed")
						{
							PopManager.showPop("ErrorPop",1);
						}
						else
						{
							// Message.show(data.more.reason);
							PopManager.showPop("ErrorPop",2);
						}
					}else
					{
						// Message.show(data.reason);
						PopManager.showPop("ErrorPop",2);
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
					}
				}
			});
		}*/
	}

	public result(data):void
	{
		var money = data.more.c1ashed;
		if(money)
		{
			Main.share(true);
			PopManager.showPop("EndPop",money);
		}else
		{
			PopManager.showPop("SharePop",1);
		}
	}
}