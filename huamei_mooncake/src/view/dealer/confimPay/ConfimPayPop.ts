class ConfimPayPop extends PopView
{
	private dic;

	private allCount = 0;
	private allPrice = 0;
	private idList = [];
	public constructor()
	{
		super();
		this.dic = {};
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xffffff);
		bg.graphics.drawRect(0,0,StageUtils.SW,StageUtils.SH);
		bg.graphics.endFill();
		this.addChild(bg);

		var title = Global.createBitmapByName("confim_order_title_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = 40;
		this.addChild(title);

		var len = data.length;
		for(var i = 0;i<len;i++)
		{
			var obj = data[i];
			if(obj)
			{
				this.idList.push(obj.id);
				if(!this.dic[obj.name])
				{
					this.dic[obj.name] = [];
				}
				this.dic[obj.name].push(obj);
			}
		}

		len = this.dic.length;

		var index = 0;
		for(var str in this.dic)
		{
			var item = new ConfimPayItem();
			item.x = StageUtils.SW - 600 >> 1;
			item.y = 105 + index * 147;
			item.setData(this.dic[str]);
			this.addChild(item);
			index ++;
			this.allCount += item.len;
			this.allPrice += item.price;
		}

		var downbg = Global.createBitmapByName("down_bg_png");
		downbg.x = 0;
		downbg.y = StageUtils.SH - downbg.height;
		this.addChild(downbg);

		var txtCount = new egret.TextField();
		txtCount.x = 30;
		txtCount.y = StageUtils.SH - 55;
		txtCount.text = "总量:"+this.allCount+"盒";
		txtCount.textColor = 0x0;
		txtCount.size = 22;
		this.addChild(txtCount);

		var txtTotal = new egret.TextField();
		txtTotal.x = 180;
		txtTotal.y = StageUtils.SH - 55;
		txtTotal.text = "总计:";
		txtTotal.textColor = 0x0;
		txtTotal.size = 22;
		this.addChild(txtTotal);

		var txtAll = new egret.TextField();
		txtAll.x = 230;
		txtAll.y = StageUtils.SH - 63;
		txtAll.text = "￥"+this.allPrice;
		txtAll.textColor = 0xff4900;
		txtAll.size = 33;
		this.addChild(txtAll);

		var btnPay = Global.createBitmapByName("btn_pay_1_png");
		btnPay.x = StageUtils.SW - btnPay.width;
		btnPay.y = StageUtils.SH - btnPay.height;
		this.addChild(btnPay);
		Global.setBut(btnPay);
		btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.payTouchHandler,this);
	}
	
	private payTouchHandler():void
	{
		var self = this;
		$.ajax(
		{
			url: Main.PLAY_API,
			data: {ticket:Main.USER_TICKET,type:"pcoup",ids:this.idList.join(",")},
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
							self.payResult(true,data.payorder,self.data,self.allPrice);
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
						PopManager.hidePop("ConfimPayPop");
						PopManager.showPop("ListPop");
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

	private payResult(ok,orderid,list = null,price = null):void
	{
		var self = this;
		$.ajax(
		{
			url: Main.PLAY_API,
			data: {ticket:Main.USER_TICKET,type:"pwxcallback",payorder:orderid,issuccess:ok?1:0,cardtype:"pcoup"},
			success: function(data)
			{
				if(data.result == 0)
				{
					if(ok)
					{
						PopManager.hidePop("ConfimPayPop");
						PopManager.showPop("PayOKPop",{list:list,price:price});
					}else
					{
						PopManager.showPop("TipsPop",{url:"tips_error_png",callback:()=>{
							PopManager.hidePop("ConfimPayPop");
							PopManager.showPop("ListPop");
						}});
					}
				}else
				{
					Message.show("系统异常:"+data.result);
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