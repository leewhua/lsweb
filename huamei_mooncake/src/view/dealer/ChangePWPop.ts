class ChangePWPop extends PopView
{
	private txtID:egret.TextField;

	private txtPW:egret.TextField;

	private txtNewPW:egret.TextField;

	private txtNewPW1:egret.TextField;

	private btnSubmit:egret.Bitmap;

	public constructor()
	{
		super();
	}

	public show():void
	{
		var bg=new egret.Shape()
      
        bg.graphics.beginFill(0x0,0.7);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();

        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        
        this.addChildAt(bg,0);
        bg.alpha=0;
        Global.fadeIn(bg);

		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;
	}

	public setData(data):void
	{
		super.setData(data);

		var title = Global.createBitmapByName("change_pd_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = StageUtils.SH - title.height >> 1;
		this.addChild(title);

		var btnClose = Global.createBitmapByName("btn_change_close_png");
		btnClose.x = 515;
		btnClose.y = 200;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);

		var btnSubmit = Global.createBitmapByName("btn_change_submit_png");
		btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
		btnSubmit.y = (StageUtils.SH - btnSubmit.height >> 1) + 210;
		this.addChild(btnSubmit);
		Global.setBut(btnSubmit);
		btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitHandler,this);
		this.btnSubmit = btnSubmit;

		this.txtID = new egret.TextField();
		this.txtID.width = 270;
		this.txtID.fontFamily = "微软雅黑";
		this.txtID.type = egret.TextFieldType.INPUT;
		this.txtID.x = 260;
		this.txtID.y = 357;
		this.txtID.text = "请输入用户名";
		this.txtID.size = 24;
		this.txtID.textColor = 0xC3C5C6;
		this.txtID.maxChars = 20;
		this.addChild(this.txtID);
		this.txtID.addEventListener(egret.FocusEvent.FOCUS_IN,this.idFocusInHandler,this);
		this.txtID.addEventListener(egret.FocusEvent.FOCUS_OUT,this.idFocusOutHandler,this);

		this.txtPW = new egret.TextField();
		this.txtPW.width = 270;
		this.txtPW.fontFamily = "微软雅黑";
		this.txtPW.type = egret.TextFieldType.INPUT;
		this.txtPW.x = 260;
		this.txtPW.y = 427;
		this.txtPW.text = "请输入原密码";
		this.txtPW.size = 24;
		this.txtPW.textColor = 0xC3C5C6;
		this.txtPW.maxChars = 20;
		
		this.txtPW.inputType = egret.TextFieldInputType.PASSWORD;
		this.addChild(this.txtPW);
		// this.txtPW.border = true;
		this.txtPW.addEventListener(egret.FocusEvent.FOCUS_IN,this.pwFocusInHandler,this);
		this.txtPW.addEventListener(egret.FocusEvent.FOCUS_OUT,this.pwFocusOutHandler,this);

		this.txtNewPW = new egret.TextField();
		this.txtNewPW.width = 270;
		this.txtNewPW.fontFamily = "微软雅黑";
		this.txtNewPW.type = egret.TextFieldType.INPUT;
		this.txtNewPW.x = 260;
		this.txtNewPW.y = 522;
		this.txtNewPW.text = "请输入新密码";
		this.txtNewPW.size = 24;
		this.txtNewPW.textColor = 0xC3C5C6;
		this.txtNewPW.maxChars = 20;
		
		this.txtNewPW.inputType = egret.TextFieldInputType.PASSWORD;
		this.addChild(this.txtNewPW);
		this.txtNewPW.addEventListener(egret.FocusEvent.FOCUS_IN,this.newIDFocusInHandler,this);
		this.txtNewPW.addEventListener(egret.FocusEvent.FOCUS_OUT,this.newIDFocusOutHandler,this);

		this.txtNewPW1 = new egret.TextField();
		this.txtNewPW1.width = 270;
		this.txtNewPW1.fontFamily = "微软雅黑";
		this.txtNewPW1.type = egret.TextFieldType.INPUT;
		this.txtNewPW1.x = 260;
		this.txtNewPW1.y = 598;
		this.txtNewPW1.text = "请再次输入新密码";
		this.txtNewPW1.size = 24;
		this.txtNewPW1.textColor = 0xC3C5C6;
		this.txtNewPW1.maxChars = 20;
		
		this.txtNewPW1.inputType = egret.TextFieldInputType.PASSWORD;
		this.addChild(this.txtNewPW1);
		this.txtNewPW1.addEventListener(egret.FocusEvent.FOCUS_IN,this.newID1FocusInHandler,this);
		this.txtNewPW1.addEventListener(egret.FocusEvent.FOCUS_OUT,this.newID1FocusOutHandler,this);
	}

	private idFocusInHandler():void
	{
		if(this.txtID.text == "请输入用户名")
		{
			this.txtID.text = "";
		}
	}

	private idFocusOutHandler():void
	{
		if(this.txtID.text == "")
		{
			this.txtID.text = "请输入用户名";
		}
	}

	private pwFocusInHandler():void
	{
		if(this.txtPW.text == "请输入原密码")
		{
			this.txtPW.text = "";
			this.txtPW.displayAsPassword = true;
		}else
		{
			this.txtPW.displayAsPassword = false;
		}
	}

	private pwFocusOutHandler():void
	{
		if(this.txtPW.text == "")
		{
			this.txtPW.text = "请输入原密码";
			this.txtPW.displayAsPassword = false;
		}else
		{
			this.txtPW.displayAsPassword = true;
		}
	}

	private newIDFocusInHandler():void
	{
		if(this.txtNewPW.text == "请输入新密码")
		{
			this.txtNewPW.text = "";
			this.txtNewPW.displayAsPassword = true;
		}else
		{
			this.txtNewPW.displayAsPassword = false;
		}
	}

	private newIDFocusOutHandler():void
	{
		if(this.txtNewPW.text == "")
		{
			this.txtNewPW.text = "请输入新密码";
			this.txtNewPW.displayAsPassword = false;
		}else
		{
			this.txtNewPW.displayAsPassword = true;
		}
	}

	private newID1FocusInHandler():void
	{
		if(this.txtNewPW1.text == "请再次输入新密码")
		{
			this.txtNewPW1.text = "";
			this.txtNewPW1.displayAsPassword = true;
		}else
		{
			this.txtNewPW1.displayAsPassword = false;
		}
	}

	private newID1FocusOutHandler():void
	{
		if(this.txtNewPW1.text == "")
		{
			this.txtNewPW1.text = "请再次输入新密码";
			this.txtNewPW1.displayAsPassword = false;
		}else
		{
			this.txtNewPW1.displayAsPassword = true;
		}
	}

	private closeHandler():void
	{
		PopManager.hidePop("ChangePWPop");
	}

	private submitHandler():void
	{
		var id = this.txtID.text.trim();
		var pw = this.txtPW.text.trim();
		var newpw = this.txtNewPW.text.trim();
		var newpw1 = this.txtNewPW1.text.trim();
		if(!id || id == "请输入用户名")
		{
			Message.show("请输入用户名!");
		}else if(!pw || pw == "请输入原密码")
		{
			Message.show("请输入原密码!");
		}else if(!newpw || newpw == "请输入新密码")
		{
			Message.show("请输入新密码!");
		}else if(!newpw1 || newpw1 == "请再次输入新密码")
		{
			Message.show("请再次输入新密码!");
		}else if(newpw != newpw1)
		{
			Message.show("两次密码不一致!");
			// this.txtNewPW.text = "";
			// this.txtNewPW1.text = "";
			// this.txtNewPW.setFocus();
		}else if(pw == newpw)
		{
			Message.show("新密码不得与原密码相同!");
		}
		else
		{
			var self = this;
            $.ajax({
                url: Main.USER_INFO_API,
                data: {type:"modifyinfo",ticket:Main.USER_TICKET,oldname:id,oldpassword:pw,newname:id,newpassword:newpw},
                success: function(data)
                {
                    if(data.result == 0)
                    {
                        self.showResult(true);
                    }else if(data.result == 1)
					{
						Message.show("用户名或密码错误!");
					}else if(data.result == 2)
					{
						Message.show("用户名或密码错误!");
					}
					else
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

	private showResult(bl):void
	{
		this.btnSubmit.visible = false;
		var str = "";
		if(bl)
		{
			str = "change_ok_png";
		}else
		{
			str = "change_no_png";
		}
		var result = Global.createBitmapByName(str);
		result.x = StageUtils.SW - result.width >> 1;
		result.y = this.btnSubmit.y + 10;
		this.addChild(result);
	}
}