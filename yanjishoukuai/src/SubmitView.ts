class SubmitView extends PopUp
{
	private txtName;
	private txtPhone;
	private txtAddress;

    public constructor() {
        super();
        this.show(false);
    }
    
    public show(hasDelay)
	{
		super.show(hasDelay);

		this.view.y = -50;
		var bg = Global.createBitmapByName('pop_bg_png');
		StageUtils.centerInParent(bg);
		this.view.addChild(bg);

		var inputReward = new CustomImage("resource/assets/reward/"+GameView.rewardData.desc+"_input.png",true,()=>{
			inputReward.x = StageUtils.SW - inputReward.width >> 1;
			inputReward.y = (StageUtils.SH - inputReward.height >> 1) - 100;
		});
		this.view.addChild(inputReward);

		var inputBg = new CustomImage("resource/assets/reward/sw_input_bg.png",true,()=>{
			inputBg.x = StageUtils.SW - inputBg.width >> 1;
			inputBg.y = (StageUtils.SH - inputBg.height >> 1) + 200;
		});
		this.view.addChild(inputBg);
		
		var txtName:egret.TextField = this.getTxt();
		txtName.text = "";
		txtName.maxChars = 20;
		txtName.width = 300;
		txtName.x = 200;
		txtName.y = 594 + 50;
		this.view.addChild(txtName);

		var txtPhone:egret.TextField = this.getTxt();
		txtPhone.text = "";
		txtPhone.maxChars = 11;
		txtPhone.restrict = "0-9";
		txtPhone.width = 300;
		txtPhone.x = 200;
		txtPhone.y = 662 + 50;
		this.view.addChild(txtPhone);

		var txtAddress:egret.TextField = this.getTxt();
		txtAddress.text = "";
		txtAddress.multiline = true;
		txtAddress.maxChars = 100;
		txtAddress.width = 300;
		txtAddress.height = 100;
		txtAddress.x = 200;
		txtAddress.y = 726 + 50;
		this.view.addChild(txtAddress);

        var toReceive = Global.createBitmapByName('btn_get_png');
		toReceive.x = StageUtils.SW - toReceive.width >> 1;
		toReceive.y = StageUtils.SH - 100;
		this.view.addChild(toReceive);
		toReceive.touchEnabled = true;

		toReceive.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
		Global.setBut(toReceive);

		this.txtName = txtName;
		this.txtPhone = txtPhone;
		this.txtAddress = txtAddress;
    }

	private touchHandler():void
	{
		this.saveLuck();
	}

	private saveLuck(): void 
	{
		var name = this.txtName.text;
		var phone = this.txtPhone.text;
		var address = this.txtAddress.text;

		if(name && phone && address)
		{
			var self = this;
			var ADDR = GameView.rewardData.require;
			console.log(ADDR);
			$.ajax({
				url: Main.PLAY_API,
				data: { ticket: GameView.rewardData.ticket, ADDR: name + "," + phone + "," + address},
				success: function(data) 
				{
					if(data.result == "success")
					{
						Main.removePop("SubmitView");
						Main.showPop("TipsView");
						// if(data.prizes[0].require != "")
						// {
						// 	Main.removePop("SubmitView");
						// 	Main.showPop("TipsView");
						// }else
						// {
						// 	Main.showLost(1);
						// }
						// if(data.more.result == "success")
						// {
						// 	Main.removePop("SubmitView");
						// 	Main.showPop("TipsView");
						// }else
						// {
						// 	Main.showLost(1);
						// }
						sessionStorage.removeItem('yanjishoukuai');
					}else
					{
						if(data.reason == "invalidticketparam")
						{
							Main.showLost(21);
						}else if(data.reason == "invalidticket")
						{
							Main.showLost(3);
						}else
						{
							Main.showLost(1);
						}
					}
				},error: function() {
					Main.showLost(2);
				},timeout: 8000,
				dataType: "json",async: true,type: "POST",
				complete: function(XMLHttpRequest,status) {
					if(status == 'timeout') {
						Main.showLost(2);
					}
				}
			});
		}else
		{
			Message.show("请填写完整信息~");
		}
		
    }

	private getTxt():egret.TextField
	{
		var txt = new egret.TextField();
		txt.type = egret.TextFieldType.INPUT;
		txt.textColor = 0x000000;
		txt.size = 25;
		// txt.
		return txt;
	}
}