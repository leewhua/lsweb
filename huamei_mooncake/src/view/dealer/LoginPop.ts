class LoginPop extends PopView
{
	protected txtName:egret.TextField;

	protected txtPassword:egret.TextField;

	protected txtPassword1:egret.TextField;

	public constructor() 
	{
		super();
	}

	public setData(data):void
	{
		super.setData();
		var bg = new CustomImage("resource/assets/asyn/login_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var inputBg = Global.createBitmapByName("login_input_bg_png");
		inputBg.x = StageUtils.SW - inputBg.width >> 1;
		inputBg.y = 260;
		this.addChild(inputBg);

		var btnSubmit = Global.createBitmapByName("login_submit_png");
		btnSubmit.x = StageUtils.SW - btnSubmit.width >> 1;
		btnSubmit.y = 435;
		this.addChild(btnSubmit);
		Global.setBut(btnSubmit);
		btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.submitHandler,this);

		this.txtName = new egret.TextField();
		this.txtName.width = 400;
		this.txtName.fontFamily = "微软雅黑";
		this.txtName.type = egret.TextFieldType.INPUT;
		this.txtName.x = (StageUtils.SW - this.txtName.width >> 1) + 30;
		this.txtName.y = 275;
		this.txtName.text = "请输入帐号";
		this.txtName.size = 24;
		this.txtName.textColor = 0x80A6C8;
		this.txtName.maxChars = 20;
		this.addChild(this.txtName);

		this.txtPassword = new egret.TextField();
		this.txtPassword.width = 400;
		this.txtPassword.fontFamily = "微软雅黑";
		this.txtPassword.type = egret.TextFieldType.INPUT;
		this.txtPassword.x = (StageUtils.SW - this.txtPassword.width >> 1) + 30;
		this.txtPassword.y = 360;
		this.txtPassword.text = "请输入密码";
		this.txtPassword.size = 24;
		this.txtPassword.textColor = 0x80A6C8;
		this.txtPassword.maxChars = 20;
		
		this.txtPassword.inputType = egret.TextFieldInputType.PASSWORD;
		this.addChild(this.txtPassword);

		this.txtName.addEventListener(egret.FocusEvent.FOCUS_IN,this.nameFocusInHandler,this);
		this.txtName.addEventListener(egret.FocusEvent.FOCUS_OUT,this.nameFocusOutHandler,this);

		this.txtPassword.addEventListener(egret.FocusEvent.FOCUS_IN,this.passFocusInHandler,this);
		this.txtPassword.addEventListener(egret.FocusEvent.FOCUS_OUT,this.passFocusOutHandler,this);
		// this.txtPassword.addEventListener(egret.Event.CHANGE,this.passChangeHandler,this);

		
		var btnChangeID = Global.createBitmapByName("btn_change_id_png");
		btnChangeID.x = 145;
		btnChangeID.y = 515;
		this.addChild(btnChangeID);
		Global.setBut(btnChangeID);
		btnChangeID.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeIDHandler,this);

		var btnChangePW = Global.createBitmapByName("btn_change_pw_png");
		btnChangePW.x = 385;
		btnChangePW.y = 515;
		this.addChild(btnChangePW);
		Global.setBut(btnChangePW);
		btnChangePW.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changePWHandler,this);
	}

	private changePWHandler():void
	{
		PopManager.showPop("ChangePWPop");
	}

	private changeIDHandler():void
	{
		PopManager.showPop("ChangeIDPop");
	}

	private nameFocusInHandler():void
	{
		if(this.txtName.text == "请输入帐号")
		{
			this.txtName.text = "";
		}
	}

	private nameFocusOutHandler():void
	{
		if(this.txtName.text == "")
		{
			this.txtName.text = "请输入帐号";
		}
	}

	private passFocusInHandler():void
	{
		if(this.txtPassword.text == "请输入密码")
		{
			this.txtPassword.text = "";
			this.txtPassword.displayAsPassword = true;
		}else
		{
			this.txtPassword.displayAsPassword = false;
		}
	}

	private passFocusOutHandler():void
	{
		if(this.txtPassword.text == "")
		{
			this.txtPassword.text = "请输入密码";
			this.txtPassword.displayAsPassword = false;
		}else
		{
			this.txtPassword.displayAsPassword = true;
		}
	}

	protected passStr = "888888";
	private passChangeHandler(e:egret.Event):void
	{
		var str:string = e.target.text;
		var len = str.length;
		str = str.replace(/\*/g,"");

		this.passStr += str;

		this.passStr = this.passStr.substr(0,len);
		
		str = "";
		for(var i = 0;i<len;i++)
		{
			str += "*";
		}
		this.txtPassword1.text = str;
		// this.txtPassword.text = str;
		console.log(this.passStr);
		
	}

	private submitHandler():void
	{
		var name = this.txtName.text.trim();
		var pass = this.txtPassword.text.trim();//this.passStr;
		if(name && name != "请输入密码" && pass && pass != "请输入密码")
		{
			var self = this;
            $.ajax({
                url: Main.USER_INFO_API,
                data: {type:"login",ticket:Main.USER_TICKET,user:name,password:pass},
                success: function(data)
                {
                    if(data.result == 0)
                    {
						self.loginOK();
                        
                    }else
                    {
                        Message.show("账号或密码错误，请重试！");
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
		}else
		{
			Message.show("请完整填写账号和密码");
		}
	}

	protected loginOK():void
	{
		PopManager.hidePop("LoginPop");
		PopManager.showPop("ListPop");
	}
}