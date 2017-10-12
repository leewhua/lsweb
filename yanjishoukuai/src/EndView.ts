class EndView extends PopUp
{
   
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

		if(Main.isTest)
		{
			GameView.rewardData = {desc:"thankyou"};
		}

		var prizes =sessionStorage.getItem("yanjishoukuai");

		if(prizes){
			prizes = eval('(' + prizes + ')');
			GameView.rewardData = prizes;
			console.log(prizes);
			if(GameView.rewardData.desc == "thankyou" || GameView.rewardData.id == -1)
			{
				var reward = new CustomImage("resource/assets/reward/thankyou.png",true,()=>{
					reward.x = StageUtils.SW - reward.width >> 1;
					reward.y = StageUtils.SH - reward.height >> 1;
				});
				this.view.addChild(reward);
				return;
			}
			var reward = new CustomImage("resource/assets/reward/"+GameView.rewardData.desc+".png",true,()=>{
				reward.x = StageUtils.SW - reward.width >> 1;
				reward.y = StageUtils.SH - reward.height >> 1;
			});
			this.view.addChild(reward);
			
		}else{
			SoundManager.getInstance().play("open_mp3");
			if(GameView.rewardData.desc == "thankyou")
			{
				var reward = new CustomImage("resource/assets/reward/"+GameView.rewardData.desc+".png",true,()=>{
					reward.x = StageUtils.SW - reward.width >> 1;
					reward.y = StageUtils.SH - reward.height >> 1;
				});
				this.view.addChild(reward);
				return;
			}

			var reward = new CustomImage("resource/assets/reward/"+GameView.rewardData.desc+".png",true,()=>{
				reward.x = StageUtils.SW - reward.width >> 1;
				reward.y = StageUtils.SH - reward.height - 240;
			});
			this.view.addChild(reward);
		}
   
        var toReceive = Global.createBitmapByName('btn_get_png');
		toReceive.x = StageUtils.SW - toReceive.width >> 1;
		toReceive.y = StageUtils.SH - 100;
		this.view.addChild(toReceive);

            
		Global.setBut(toReceive);

		Global.zoomIn(toReceive,0,400,0.6);
       
		toReceive.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>
		{
			if(GameView.rewardData.desc == "thankyou")
			{
				//this.saveLuck();
				// sessionStorage.removeItem('yanjishoukuai');
			}
			else
			{
				Main.removePop("EndView");
				Main.showPop("SubmitView");
			}
			
		},this);
    }

	private gotoReward():void
	{
		if(GameView.rewardData.length != 0)  //GameView.rewardData.unit == "thirdparty"
		{
			
			window.location.href = "link";
		}else
		{
			Main.removePop("EndView");
			Main.showPop("SubmitView");
		}
	}

	private saveLuck(): void 
	{
        var self = this;
        $.ajax({
            url: Main.PLAY_API,
            data: { ticket: GameView.rewardData.ticket},
            success: function(data) 
			{
				if(data.result == "success")
				{
					if(data.prizes[0].require != ""){
						var url = sessionStorage.getItem("kzw_href");
						if(url){
							window.history.replaceState(null,null,url);
						}
						window.location.href = GameView.rewardData.link;
					}else{
						Main.showLost(1);
					}
					
					// if(data.more.result == "success")
					// {
					// 	var url = sessionStorage.getItem("kzw_href");
					// 	if(url)
					// 	{
					// 		// @状态对象：记录历史记录点的额外对象，可以为空
					// 		// @页面标题：目前所有浏览器都不支持
					// 		// @可选的url：浏览器不会检查url是否存在，只改变url，url必须同域，不能跨域
					// 		window.history.replaceState(null,null,url);
					// 	}
					// 	window.location.href = GameView.rewardData.link;
					// }else
					// {
					// 	Main.showLost(1);
					// }
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
    }
}