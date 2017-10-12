class ShareView extends GameBaseView
{
	public constructor()
	{
		super();

		var bg = new CustomImage("resource/assets/share/share_bg_"+Main.type+".jpg",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		// var btn = Global.createBitmapByName("btn_weidian_png");
		// btn.x = StageUtils.SW - btn.width >> 1;
		// btn.y = StageUtils.SH - btn.height - 60;
		// this.addChild(btn);
		// Global.setBut(btn);
		// btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTouchHandler,this);



		if(Main.type == 2)
		{
			Main.content =  [
								{
									"nickname": "",
									"headimgurl": "",
									"content": "1",
									"type": "2"
								},
								{
									"nickname": "",
									"headimgurl": "",
									"content": "2",
									"type": "2"
								},
								{
									"nickname": "",
									"headimgurl": "",
									"content": "3",
									"type": "2"
								},
								{
									"nickname": "",
									"headimgurl": "",
									"content": "4",
									"type": "2"
								}
							];
		}else
		{
			Main.content = [{
								"nickname": "",
								"headimgurl": "",
								"content": "1",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "2",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "3",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "4",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "5",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "6",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "7",
								"type": "0"
							},
							{
								"nickname": "",
								"headimgurl": "",
								"content": "8",
								"type": "0"
							}];
		}
		this.initDanmuList();
	}

	// private btnTouchHandler():void
	// {
	// 	window.location.href = "https://item.jd.com/2918108.html?dist=jd";
	// }
}