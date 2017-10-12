class RewardPop extends PopView
{
	private container:egret.DisplayObjectContainer;

	public constructor() 
	{
		super();
	}

	public setData(data:any = null):void
	{
		this.data = data;

		var bg = Global.createBitmapByName("pop_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		var img = new CustomImage("resource/assets/reward/"+data.prizes[0].desc+".png",true,function(){
			img.x = StageUtils.SW - img.width >> 1;
			img.y = (StageUtils.SH - img.height >> 1) - 50;
		});
		this.container.addChild(img);

		var btnUrl;
		//hb  kq  sw
		if(data.prizes[0].pooltype == "cash")
		{
			
			btnUrl = "btn_get_hb_png";
		}else
		{
			btnUrl = "btn_get_ok_png";
		}
		var btn = Global.createBitmapByName(btnUrl);
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = 745;
		this.container.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			if(data.prizes[0].pooltype == "cash")
			{
				
				this.getHB();
			}else 
			{
				this.getOther();
			}
			// else
			// {
			// 	if(data.val == 0)
			// 	{
			// 		this.container.removeChildren();

			// 		var img = new CustomImage("resource/assets/asyn/get_reward_ok.png",true,function(){
			// 			img.x = StageUtils.SW - img.width >> 1;
			// 			img.y = (StageUtils.SH - img.height >> 1) - 0;
			// 		});
			// 		this.container.addChild(img);

			// 		var qr = new QRCode("resource/assets/asyn/code.png");
			// 		qr.setPosition(StageUtils.SW - 206 >> 1,StageUtils.SH - 206 >> 1,206,206);
			// 		qr.showHtmlCode();

			// 		// var btn = Global.createBitmapByName("btn_guanzhu_png");
			// 		// btn.x = StageUtils.SW - btn.width >> 1;
			// 		// btn.y = 756;
			// 		// this.container.addChild(btn);
			// 		// Global.setBut(btn);
			// 		// btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			// 		// 	qr.hideHtmlCode();
			// 		// 	PopManager.hidePop("RewardPop");
			// 		// 	// PopManager.showPop("SharePop");
			// 		// },this);
			// 	}else if(data.val == 1)
			// 	{
			// 		PopManager.hidePop("RewardPop");
			// 		PopManager.showPop("SharePop");
			// 	}else
			// 	{
			// 		PopManager.hidePop("RewardPop");
			// 	}
			// }
		},this);
	}

	private getHB():void
	{
		var self = this;
		$.ajax({
			url: MapManager.PLAY_API,
			data: {ticket:this.data.prizes[0].ticket},
			success: function(data)
			{
				if(data.result == "success")
				{
					// if(data.more.result == "success")
					// {
						self.container.removeChildren();
						var img = new CustomImage("resource/assets/asyn/get_hb_ok.png",true,function(){
							img.x = StageUtils.SW - img.width >> 1;
							img.y = (StageUtils.SH - img.height >> 1) - 50;
						});
						self.container.addChild(img);

						var btn = Global.createBitmapByName("btn_share_png");
						btn.x = StageUtils.SW - btn.width >> 1;
						btn.y = 745;
						self.container.addChild(btn);
						Global.setBut(btn);
						btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>
						{
							PopManager.hidePop("RewardPop");
							PopManager.showPop("SharePop");
						},self);
					// }else
					// {
					// 	PopManager.showPop("ErrorPop",2);
					// }
				}else
				{
					PopManager.showPop("ErrorPop",2);
				}
			},
			error: function()
			{
				Message.show("error");
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
					Message.show("timeout");
				}
			}
		});
	}

	private getOther():void
	{


		this.container.removeChildren();
		var img = new CustomImage("resource/assets/asyn/other_bg.png",true,function(){
			img.x = StageUtils.SW - img.width >> 1;
			img.y = (StageUtils.SH - img.height >> 1) - 50;
		});
		this.container.addChild(img);

		var txtName = new egret.TextField();
		txtName.type = egret.TextFieldType.INPUT;
		txtName.x = 230;
		txtName.y = 375;
		txtName.width = 280;
		txtName.maxChars = 20;
		this.addChild(txtName);
		// txtName.border = true;

		var txtPhpne = new egret.TextField();
		txtPhpne.type = egret.TextFieldType.INPUT;
		txtPhpne.x = 230;
		txtPhpne.y = 445;
		txtPhpne.width = 280;
		txtPhpne.maxChars = 11;
		txtPhpne.restrict = "0-9";
		txtPhpne.inputType = egret.TextFieldInputType.TEL;
		this.addChild(txtPhpne);
		// txtPhpne.border = true;

		var txtAddress = new egret.TextField();
		txtAddress.type = egret.TextFieldType.INPUT;
		txtAddress.x = 150;
		txtAddress.y = 565;
		txtAddress.width = 350;
		txtAddress.height = 60;
		txtAddress.multiline = true;
		txtAddress.maxChars = 100;
		this.addChild(txtAddress);
		// txtAddress.border = true;

		var btn = Global.createBitmapByName("btn_submit_png");
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = 745;
		this.container.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>
		{
			var username = txtName.text.trim();
			var phone = txtPhpne.text.trim();
			var address = txtAddress.text.trim();
			if(!username)
			{
				Message.show("请输入姓名!");
			}else if(!phone || phone.length != 11)
			{
				Message.show("请输入手机号!");
			}else if(!address)
			{
				Message.show("请输入地址!");
			}else
			{
				this.play(username,phone,address);
			}
		},this);

		MapManager.instance.share(1);
	}

	private play(name,telephone,address):void
	{
		var self = this;
		$.ajax({
			url: MapManager.PLAY_API,
			data: {ticket:this.data.ticket,name:name,telephone:telephone,address:address},
			success: function(data)
			{
				if(data.result == "success")
				{
					// if(data.more.result == "success")
					// {
						PopManager.hidePop("RewardPop");
						PopManager.showPop("SharePop");
					// }else
					// {
					// 	PopManager.showPop("ErrorPop",2);
					// }
				}else
				{
					PopManager.showPop("ErrorPop",2);
				}
			},
			error: function()
			{
				Message.show("error");
			},timeout: 8000,
			dataType: "json",async: true,type: "POST",
			complete: function(XMLHttpRequest,status)
			{
				if(status == 'timeout')
				{
					Message.show("timeout");
				}
			}
		});
	}

	private closeClickHandler():void
	{
		if(this.data.prizes[0].type == "cash")
		{
			PopManager.hidePop("RewardPop");
		}else
		{
			window.location.href = this.data.prizes[0].value;
		}
	}

	private closeClickHandler1():void
	{
		PopManager.hidePop("RewardPop");
	}

	private showGetReward():void
	{
		var img = new CustomImage("resource/assets/reward/get_reward_ok.png",true,function(){
			img.x = StageUtils.SW - img.width >> 1;
			img.y = StageUtils.SH - img.height >> 1;
		});
		this.container.addChild(img);

		var btn = Global.createBitmapByName("btn_guanzhu_png");
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = 756;
		this.container.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			
		},this);
	}
}