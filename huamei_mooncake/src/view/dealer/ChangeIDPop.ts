class ChangeIDPop extends PopView
{
	private txtID:egret.TextField;

	private txtPW:egret.TextField;

	private txtNewID:egret.TextField;

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

		var title = Global.createBitmapByName("change_id_png");
		title.x = StageUtils.SW - title.width >> 1;
		title.y = StageUtils.SH - title.height >> 1;
		this.addChild(title);

		var btnClose = Global.createBitmapByName("btn_change_close_png");
		btnClose.x = 515;
		btnClose.y = 210;
		this.addChild(btnClose);
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeHandler,this);

		var btnSubmit = Global.createBitmapByName("btn_change_submit_png");
		btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
		btnSubmit.y = (StageUtils.SH - btnSubmit.height >> 1) + 195;
		this.addChild(btnSubmit);
		Global.setBut(btnSubmit);
		btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitHandler,this);
		this.btnSubmit = btnSubmit;

		this.txtID = new egret.TextField();
		this.txtID.width = 270;
		this.txtID.fontFamily = "微软雅黑";
		this.txtID.type = egret.TextFieldType.INPUT;
		this.txtID.x = 240;
		this.txtID.y = 375;
		this.txtID.text = "请输入原用户名";
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
		this.txtPW.x = 240;
		this.txtPW.y = 450;
		this.txtPW.text = "请输入密码";
		this.txtPW.size = 24;
		this.txtPW.textColor = 0xC3C5C6;
		this.txtPW.maxChars = 20;
		
		this.txtPW.inputType = egret.TextFieldInputType.PASSWORD;
		this.addChild(this.txtPW);
		this.txtPW.addEventListener(egret.FocusEvent.FOCUS_IN,this.pwFocusInHandler,this);
		this.txtPW.addEventListener(egret.FocusEvent.FOCUS_OUT,this.pwFocusOutHandler,this);

		this.txtNewID = new egret.TextField();
		this.txtNewID.width = 270;
		this.txtNewID.fontFamily = "微软雅黑";
		this.txtNewID.type = egret.TextFieldType.INPUT;
		this.txtNewID.x = 240;
		this.txtNewID.y = 568;
		this.txtNewID.text = "请输入新用户名";
		this.txtNewID.size = 24;
		this.txtNewID.textColor = 0xC3C5C6;
		this.txtNewID.maxChars = 20;
		this.addChild(this.txtNewID);
		this.txtNewID.addEventListener(egret.FocusEvent.FOCUS_IN,this.newIDFocusInHandler,this);
		this.txtNewID.addEventListener(egret.FocusEvent.FOCUS_OUT,this.newIDFocusOutHandler,this);

	}

	private idFocusInHandler():void
	{
		if(this.txtID.text == "请输入原用户名")
		{
			this.txtID.text = "";
		}
	}

	private idFocusOutHandler():void
	{
		if(this.txtID.text == "")
		{
			this.txtID.text = "请输入原用户名";
		}
	}

	private pwFocusInHandler():void
	{
		if(this.txtPW.text == "请输入密码")
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
			this.txtPW.text = "请输入密码";
			this.txtPW.displayAsPassword = false;
		}else
		{
			this.txtPW.displayAsPassword = true;
		}
	}

	private newIDFocusInHandler():void
	{
		if(this.txtNewID.text == "请输入新用户名")
		{
			this.txtNewID.text = "";
		}
	}

	private newIDFocusOutHandler():void
	{
		if(this.txtNewID.text == "")
		{
			this.txtNewID.text = "请输入新用户名";
		}
	}

	private closeHandler():void
	{
		PopManager.hidePop("ChangeIDPop");
	}

	private submitHandler():void
	{
		var id = this.txtID.text.trim();
		var pw = this.txtPW.text.trim();
		var newid = this.txtNewID.text.trim();
		if(!id || id == "请输入原用户名")
		{
			Message.show("请输入原用户名!");
		}else if(!pw || pw == "请输入密码")
		{
			Message.show("请输入密码!");
		}else if(!newid || newid == "请输入新用户名")
		{
			Message.show("请输入新用户名!");
		}else if(newid == id)
		{
			Message.show("新用户名不得与原用户名相同!");
		}
		else
		{
			var self = this;
            $.ajax({
                url: Main.USER_INFO_API,
                data: {type:"modifyinfo",ticket:Main.USER_TICKET,oldname:id,oldpassword:pw,newname:newid,newpassword:pw},
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
					}else if(data.result == 3)
					{
						Message.show("该用户名已被使用!");
					}else if(data.result == 4)
					{
						Message.show("很抱歉，您不能修改用户名!");
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