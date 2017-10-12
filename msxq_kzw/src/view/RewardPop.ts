class RewardPop extends PopView
{
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

		var btnClose;
		if(data.type == "cash"){
			var img = new CustomImage("resource/assets/reward/" + data.desc + ".png", true, function (){
				img.x = StageUtils.SW - img.width >> 1;
				img.y = StageUtils.SH - img.height >> 1;
			});
			this.addChild(img);
			btnClose = Global.createBitmapByName("btn_reward_1_png");
			btnClose.y = 780;
		}else if(data.id == -1){
			var img = new CustomImage("resource/assets/reward/thankyou.png", true, function(){
				img.x = StageUtils.SW - img.width >> 1;
				img.y = StageUtils.SH - img.height >> 1;
			});
			this.addChild(img);
			btnClose = Global.createBitmapByName("btn_reward_1_png");
			btnClose.y = 780;
		}else{
			var img = new CustomImage("resource/assets/reward/reward_"+data.desc+".png",true,function(){
				img.x = StageUtils.SW - img.width >> 1;
				img.y = StageUtils.SH - img.height >> 1;
			});
			this.addChild(img);
			btnClose = Global.createBitmapByName("btn_reward_png");
			btnClose.y = 770;
		}
		

		btnClose.x = StageUtils.SW - btnClose.width >> 1;
		this.addChild(btnClose);
		
		btnClose.touchEnabled = true;
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler,this);


		var btnClose1:egret.Bitmap = Global.createBitmapByName("close_png");
		btnClose1.x = StageUtils.SW - btnClose1.width - 90;
		btnClose1.y = 185;
		this.addChild(btnClose1);

		btnClose1.touchEnabled = true;
		Global.setBut(btnClose1);
		btnClose1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler1,this);
	}

	private closeClickHandler():void
	{
		if(this.data.type == "cash" || this.data.id == -1)
		{
			PopManager.hidePop("RewardPop");
			// sessionStorage.removeItem('hongbao');
		}else
		{
			var hongbao=sessionStorage.getItem("hongbao");
			// console.log(this.data);
			$.ajax({
					url: MapManager.PLAY_API,
					data: {type:"play",ticket:this.data.ticket,isshared:MapManager.isShared},
					success: function(data)
					{
						// console.log(data);
						if(data.result == "success")
						{	
							sessionStorage.removeItem('hongbao');
							window.location.href = data.prize.value;
						}else
						{
							Message.show("系统错误！");
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
	}

	private closeClickHandler1():void
	{
		PopManager.hidePop("RewardPop");
	}
}