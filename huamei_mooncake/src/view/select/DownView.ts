class DownView extends egret.DisplayObjectContainer
{
	private txtMail:egret.TextField;

	public constructor()
	{
		super();

		var tips = Global.createBitmapByName("select_tips1_png");
		this.addChild(tips);
		var bg = Global.createBitmapByName("select_down_bg_png");
		bg.x = 0;
		bg.y = 130;
		this.addChild(bg);

		// var btnDown = Global.createBitmapByName("btn_select_phone_png");
		// btnDown.x = 100;
		// btnDown.y = 220;
		// this.addChild(btnDown);
		// Global.setBut(btnDown);
		// btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP,this.downHandler,this);

		var btnSend = Global.createBitmapByName("btn_select_sendmail_png");
		btnSend.x = 316;
		btnSend.y = 263;
		this.addChild(btnSend);
		Global.setBut(btnSend);
		btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendHandler,this);

		this.txtMail = new egret.TextField();
		this.txtMail.width = 260;
		this.txtMail.fontFamily = "微软雅黑";
		this.txtMail.type = egret.TextFieldType.INPUT;
		this.txtMail.x = 40;
		this.txtMail.y = 283;
		this.txtMail.text = "请输入邮箱帐号";
		this.txtMail.size = 24;
		this.txtMail.textColor = 0xC3C5C6;
		this.txtMail.maxChars = 50;
		this.addChild(this.txtMail);
		this.txtMail.addEventListener(egret.FocusEvent.FOCUS_IN,this.mailFocusInHandler,this);
		this.txtMail.addEventListener(egret.FocusEvent.FOCUS_OUT,this.mailFocusOutHandler,this);

	}

	private downHandler():void
	{
		// window.location.href = "http://res.leasiondata.cn/lstatic/h/v70/resource/assets/asyn/aaa.xlsx";
		// window.open("http://res.leasiondata.cn/lstatic/h/v70/resource/assets/asyn/aaa.xlsx");
		// this.downloadFile("http://res.leasiondata.cn/lstatic/h/v70/resource/assets/asyn/info_bg.png");
	}

	private downloadFile(url) 
	{   
        try{ 
            var elemIF = document.createElement("iframe");   
            elemIF.src = url;   
            elemIF.style.display = "none";   
            document.body.appendChild(elemIF);   
        }catch(e){ 
 
        } 
    }

	private sendHandler():void
	{
		var str = this.txtMail.text;
		var reg =/^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		if(str && str != "请输入邮箱帐号" )
		{
			if(reg.test(str)){
				Message.show("即将发送!");
				$.ajax({
					type: "POST",
					dataType: "json",
					url: Main.USER_INFO_API,
					data: {
						"type": "report",
						"email": str,
						"ticket": Main.USER_TICKET
					},
					success: function(data){
						
						if(data.result == 0){
							console.log(data);
							Message.show("发送成功!");
						}else{
							Message.show("发送失败!");
						}
					},
					error: function(){},
					async: true
				});
				
			}else{
				Message.show("邮箱格式不正确!");
			}
			
		}else
		{
			Message.show("请输入邮箱帐号!");
		}
	}

	// private sendHandler():void
	// {
	// 	var str = this.txtMail.text;
	// 	if(str && str != "请输入邮箱帐号")
	// 	{
	// 		Message.show("即将发送!");
	// 	}else
	// 	{
	// 		Message.show("请输入邮箱帐号!");
	// 	}
	// }

	private mailFocusInHandler():void
	{
		if(this.txtMail.text == "请输入邮箱帐号")
		{
			this.txtMail.text = "";
		}
	}

	private mailFocusOutHandler():void
	{
		if(this.txtMail.text == "")
		{
			this.txtMail.text = "请输入邮箱帐号";
		}
	}
}