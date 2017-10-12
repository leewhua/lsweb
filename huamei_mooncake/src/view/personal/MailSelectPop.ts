class MailSelectPop extends PopView
{
	public constructor()
	{
		super();
	}

	private txtState:egret.TextField;

	private txtName:egret.TextField;

	private txtTime:egret.TextField;

	private container:egret.DisplayObjectContainer;

	public setData(data):void
	{
		super.setData(data);

		var block = new egret.Shape();
		block.graphics.beginFill(0xffffff);
		block.graphics.drawRect(0,0,StageUtils.SW,170);
		block.graphics.drawRect(0,200,StageUtils.SW,StageUtils.SH - 200 - 146);
		block.graphics.endFill();
		this.addChild(block);

		var block1 = new egret.Shape();
		block1.graphics.beginFill(0xf3f3f3);
		block1.graphics.drawRect(0,170,StageUtils.SW,30);
		block1.graphics.drawRect(0,StageUtils.SH - 146,StageUtils.SW,146);
		block1.graphics.endFill();
		this.addChild(block1);

		var tips1:egret.TextField = new egret.TextField();
		tips1.text = "订单状态：";
		tips1.textColor = 0x0;
		tips1.x = 40;
		tips1.y = 40;
		this.addChild(tips1);

		this.txtState = new egret.TextField();
		this.txtState.textColor = 0xff7323;
		this.txtState.x = 190;
		this.txtState.y = 40;
		this.txtState.text = "";
		this.addChild(this.txtState);

		var tips2:egret.TextField = new egret.TextField();
		tips2.text = "配送方式：";
		tips2.textColor = 0x565656;
		tips2.size = 24;
		tips2.x = 40;
		tips2.y = 83;
		this.addChild(tips2);

		this.txtName = new egret.TextField();
		this.txtName.textColor = 0x565656;
		this.txtName.size = 24;
		this.txtName.x = 160;
		this.txtName.y = 83;
		this.txtName.text = "中国邮政速递物流";
		this.addChild(this.txtName);

		var tips3:egret.TextField = new egret.TextField();
		tips3.text = "时间：";
		tips3.textColor = 0x565656;
		tips3.size = 24;
		tips3.x = 40;
		tips3.y = 123;
		this.addChild(tips3);

		this.txtTime = new egret.TextField();
		this.txtTime.textColor = 0x565656;
		this.txtTime.size = 24;
		this.txtTime.x = 110;
		this.txtTime.y = 123;
		this.txtTime.text = "";
		this.addChild(this.txtTime);


		// var item = new MailItem();
		// item.setData(0,null);
		// item.x = 0;
		// item.y = 200;
		// this.addChild(item);

		this.container = new egret.DisplayObjectContainer();
		
		var scroll = new egret.ScrollView(this.container);
		scroll.width = StageUtils.SW;
		scroll.height = StageUtils.SH - 200 - 146;
		scroll.x = 0;
		scroll.y = 200;
		scroll.horizontalScrollPolicy = "off";
		this.addChild(scroll);

		var btnClose = Global.createBitmapByName("mail_close_png");
		btnClose.x = StageUtils.SW - btnClose.width >> 1;
		btnClose.y = StageUtils.SH - 105;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);

		this.loadData(data);
	}

	private closeHandler():void
	{
		PopManager.hidePop("MailSelectPop");
	}

	private loadData(id):void
	{
		var self = this;
		$.ajax({
			url: Main.USER_INFO_API,
			data: {type:"wuliu",ticket:Main.USER_TICKET,exchangeid:id},
			success: function(data)
			{
				if(data.result == 0)
				{
					if(data.trace)
					{
						var list = JSON.parse(data.trace);
						if(list)
						{
							list.reverse();
							var len = list.length;
							var _y = 0;
							var obj;
							for(var i = 0;i<len;i++)
							{
								obj = list[i];
								if(obj)
								{
									var item = new MailItem();
									item.setData(i,obj);
									item.y = _y;
									self.container.addChild(item);
									_y+=item.h;
								}
							}
							if(obj)
							{
								self.txtTime.text = obj.AcceptTime.substr(0,10) + "";
							}
						}
					}
					self.txtState.text = data.status + "";
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