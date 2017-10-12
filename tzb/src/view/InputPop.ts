class InputPop extends PopView
{
	private txtCard:egret.TextField;

	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/input_bg.png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = (StageUtils.SH - bg.height >> 1) - 100;
		});
		this.addChild(bg);

		this.txtCard = new egret.TextField();
		this.txtCard.type = egret.TextFieldType.INPUT;
		this.txtCard.y = 440;
		this.txtCard.width = 450;
		this.txtCard.x = StageUtils.SW - this.txtCard.width >> 1;
		// this.txtName.height = 50;
		this.addChild(this.txtCard);
		// this.txtCard.border = true;
		// this.txtCard.borderColor = 0xffffff;

		var text1=new egret.TextField();
		text1.size=25;
		text1.text="请致电400人工客服索要兑奖码";
		text1.x=150;
		text1.y=520;
		this.addChild(text1);

		var share = Global.createBitmapByName("btn_ok_png");
		share.x = StageUtils.SW - share.width >> 1;
		share.y = 650;
		this.addChild(share);
		
		Global.setBut(share);
		share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareHandler,this);

		var phone = Global.createBitmapByName("btn_400_png");
		phone.x = StageUtils.SW - phone.width >> 1;
		phone.y = 760;
		this.addChild(phone);

		Global.setBut(phone);
		phone.addEventListener(egret.TouchEvent.TOUCH_TAP,this.phoneHandler,this);
	}

	private shareHandler():void
	{
		var card = this.txtCard.text;
		if(card)
		{
			var self = this;
			// alert("ajax_confirmticket2:" + sessionStorage.getItem("confirmticket2"));
			$.ajax({
				//url: Main.PLAY_API,
				//data: {ticket:Main.PLAY_TICKET,nostr:card},
				url: sessionStorage.getItem("interface"),
				data: {ticket:sessionStorage.getItem("confirmticket2"),"UUID6":card},
				success: function(data)
				{
					if(data.result == "success")
					{
						//if(data.more.result == "success")
						//{
							Main.share(true);
							PopManager.hidePop("InputPop");
							PopManager.showPop("SuccessPop");
						//}else if(data.more.result == "fail" && data.more.reason == "c1ashed")
						//{
						//	PopManager.showPop("ErrorPop",1);
						//}else if(data.more.result == "fail" && data.more.reason == "nostrinvalid")
						//{
						//	PopManager.showPop("ErrorPop",3);
						//}
						//else
						//{
							// Message.show(data.more.reason);
						//	PopManager.showPop("ErrorPop",2);
						//}
					}else
					{
						// Message.show(data.reason);
						//PopManager.showPop("ErrorPop",2);
						PopManager.showPop("ErrorPop",3);
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
		}else
		{
			Message.show("请输入兑奖码!");
		}
		
	}

	private phoneHandler():void
	{
		window.location.href = "tel:4000828079";
	}
}