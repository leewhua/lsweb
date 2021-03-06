class DanmuSendView extends egret.DisplayObjectContainer
{
	private txtContent:egret.TextField;

	public constructor() 
	{
		super();
		var bg = Global.createBitmapByName("danmu_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height - 20;
		this.addChild(bg);

		var line = Global.createBitmapByName("danmu_line_png");
		line.x = 130;
		line.y = 955;
		// this.addChild(line);

		egret.Tween.get(line,{loop:true}).to({alpha:0},500).to({alpha:1},500);

		var btnSend = Global.createBitmapByName("btn_send_png");
		btnSend.x = 550;
		btnSend.y = 935;
		this.addChild(btnSend);
		Global.setBut(btnSend);
		btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendHandler,this);

		this.setData();
	}

	public setData():void
	{
		var url;
		var name;
		if(Main.isTest)
		{
			url = "http://wx.qlogo.cn/mmopen/6BD2qP9V7sout0oux0ts55Pns1xtEpOl7icGF5GV68YdruILNBBCJvMMFCy0Wbbl7zFiaibjfibaIlKFcYIhRM6ntCU37lhk8amY/0";
			name = "有X的男女";
		}else
		{
			url = Main.headurl;
			name = Main.username;
		}

		var head = new CustomImage(url,false,()=>{
			head.width=80;
			head.height=80;
			head.x= 35;
			head.y= 920;

			var mask=new egret.Shape();
			mask.graphics.beginFill(0x0);
			mask.graphics.drawCircle(40,40,40);
			mask.x=head.x;
			mask.y=head.y;
			head.mask=mask;
			this.addChild(head);
			this.addChild(mask);
		});
		this.addChild(head);

		var txtName = new egret.TextField();
		txtName.x = 130;
		txtName.y = 920;
		txtName.size = 25;
		txtName.textColor = 0x817e7e;
		this.addChild(txtName);
		txtName.text = name;

		this.txtContent = new egret.TextField();
		this.txtContent.x = 135;
		this.txtContent.y = 958;
		this.txtContent.width = 400;
		this.txtContent.type = egret.TextFieldType.INPUT;
		this.addChild(this.txtContent);
		this.txtContent.text = this.danmu_text;
		this.txtContent.textColor = 0x817e7e;
		// this.txtContent.border = true;

		this.txtContent.addEventListener(egret.FocusEvent.FOCUS_IN,this.focusInHandler,this);
		this.txtContent.addEventListener(egret.FocusEvent.FOCUS_OUT,this.focusOutHandler,this);

		this.touchEnabled = true;

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.beginHandler,this);
	}

	private beginHandler(e:egret.TouchEvent):void
	{
		e.stopPropagation();
		e.stopImmediatePropagation();
	}

	private danmu_text = "弹幕发的好，出名能趁早!";

	private sendHandler():void
	{
		var str = this.txtContent.text;
		if(str && str != this.danmu_text)
		{
			var self = this;
            $.ajax({
				url: sessionStorage.getItem("interface"),
                data: {actiontype:"danmu",content:str,ticket:sessionStorage.getItem("mainticket")},
                success: function(data)
                {
                    if(data.result == "success")
                    {
                        // if(data.more.result == "success")
                        // {
						// 	if(data.more.content)
						// 	{
								self.txtContent.text = self.danmu_text;
								self.txtContent.textColor = 0x817e7e;
                            	self.dispatchEventWith("add_self",false,{nickname:Main.username,headimgurl:Main.headurl,content:data.more.content,type:1,self:1});
						// 	}
                        // }else
                        // {
                        //     PopManager.showPop("ErrorPop",2);
                        // }
                    }else
                    {
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
		}
	}

	private focusInHandler():void
	{
		if(this.txtContent.text == this.danmu_text)
		{
			this.txtContent.text = "";
			this.txtContent.textColor = 0x007eff;
		}
	}

	private focusOutHandler():void
	{
		if(this.txtContent.text == "")
		{
			this.txtContent.text = this.danmu_text;
			this.txtContent.textColor = 0x817e7e;
		}
	}
}