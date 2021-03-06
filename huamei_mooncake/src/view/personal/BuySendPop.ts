class BuySendPop extends egret.DisplayObjectContainer
{
	private itemList = [];
	public constructor()
	{
		super();
		this.setData();
	}

	public setData():void
	{
		// var bg = new CustomImage("resource/assets/asyn/buy_send_bg.png",true,()=>{
		// 	bg.width = StageUtils.SW;
		// 	bg.height = StageUtils.SH;
		// });
		// this.addChild(bg);

		var btnDuihuan = Global.createBitmapByName("btn_buy_send_png");
		btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
		btnDuihuan.y = StageUtils.SH - 115;
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xffffff);
		bg.graphics.drawRect(0,106,StageUtils.SW,StageUtils.SH - 106 - 150);
		bg.graphics.endFill();
		this.addChild(bg);

		var container = new egret.DisplayObjectContainer();
		
		var scroll = new egret.ScrollView(container);

		scroll.width = StageUtils.SW;
		scroll.height = StageUtils.SH - 130 - 150;
		scroll.x = 0;
		scroll.y = 130;
		scroll.horizontalScrollPolicy = "off";
		this.addChild(scroll);

		// var block = new egret.Shape();
		// block.graphics.beginFill(0x0,0.001);
		// block.graphics.drawRect(0,0,30,30);
		// block.graphics.endFill();
		// container.addChild(block);

		for(var i = 0;i<4;i++)
		{
			var item = new BuySendItem(i+1);
			item.y = 0 + 300 * i;
			container.addChild(item);
			this.itemList.push(item);
		}

		var line = Global.createBitmapByName("p_line_2_png");
		line.x = 0;
		line.y = StageUtils.SH - 150 - 5;
		this.addChild(line);
	}

	private duihuanHandler():void
	{
		var type1 = this.itemList[0].num;
		var type2 = this.itemList[1].num;
		var type3 = this.itemList[2].num;
		var type4 = this.itemList[3].num;

		if(!(type1 || type2 || type3 || type4))
		{
			Message.show("没有选中的物品!");
			return;
		}
		var self = this;
		$.ajax({
			url: Main.PLAY_API,
			data: {type:"ecoup",ticket:Main.USER_TICKET,type1:type1,type2:type2,type3:type3,type4:type4},
			success: function(data)
			{
				if(data.result == 0)
				{
					var weixin = eval("wx");
					weixin.chooseWXPay({
						timestamp: data.timestemps, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
						package: "prepay_id="+data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: data.sign, // 支付签名
						success: function (res) 
						{
							// 支付成功后的回调函数
							self.payResult(true,data.payorder);
						},fail:function(res)
						{
							self.payResult(false,data.payorder);
						},cancel:function(res)
						{
							self.payResult(false,data.payorder);
						}
					});
				}else
				{
					PopManager.showPop("TipsPop",{url:"tips_error_png",callback:()=>{
						
					}});
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

	private payResult(ok,orderid):void
	{
		var self = this;
		$.ajax(
		{
			url: Main.PLAY_API,
			data: {ticket:Main.USER_TICKET,type:"pwxcallback",payorder:orderid,issuccess:ok?1:0,cardtype:"ecoup"},
			success: function(data)
			{
				if(data.result == 0)
				{
					if(ok)
					{
						self.share(orderid);

					}else
					{
						PopManager.showPop("TipsPop",{url:"tips_error_png",callback:()=>{
							
						}});
					}
				}else
				{
					PopManager.showPop("TipsPop",{url:"tips_error_png",callback:()=>{
						
					}});
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

	private share(orderid):void
	{
		//电子卷
		var self = this;
		$.ajax({
			url: Main.USER_INFO_API,
			data: {type:"eshare",ticket:Main.USER_TICKET,ptype:orderid},
			success: function(data)
			{
					console.log("data.eshareinfo");
				if(data.result == 0)
				{
					Main.share("http://lsid.me/h/esharecode$eshareinfo="+data.eshareinfo);
					PopManager.hidePop("InfoPop");
					PopManager.showPop("BuySendOKPop");
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