class ShareIntoPop extends PopView
{
	public constructor()
	{
		super();
	}

	public show():void
	{
		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/share_bg.jpg",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);
	
		var img = new CustomImage(data.url,true,function(){
			img.width = 130;
			img.height = 130;
		});
		img.x = StageUtils.CW - 65;
		img.y = 250;
		this.addChild(img);

		var headBg = Global.createBitmapByName("head_bg_png");
		headBg.x = 0;
		headBg.y = 20;
		this.addChild(headBg);

		var maskBg:egret.Shape = new egret.Shape();
		maskBg.graphics.beginFill(0x0);
		maskBg.graphics.drawCircle(img.x + 65,img.y + 65,65);
		maskBg.graphics.drawCircle
		maskBg.graphics.endFill();
		this.addChild(maskBg);
		img.mask = maskBg;

		var txtName = new egret.TextField();
		txtName.text = decodeURI(data.username) + "";
		txtName.width = StageUtils.SW;
		txtName.textAlign = "center";
		txtName.x = 0;
		txtName.y = 400;
		txtName.textColor = 0xfff000;
		this.addChild(txtName);

		var url = "";
		if(data.isget == 1)
		{
			url = "resource/assets/asyn/share_phone.png";
		}else
		{
			url = "resource/assets/asyn/share_other.png";
		}
		var tip = new CustomImage(url,true,()=>{
			tip.x = StageUtils.SW - tip.width >> 1;
			tip.y = StageUtils.SH - 550;
		});
		this.addChild(tip);

		var btn = new CustomImage("resource/assets/main/btn_buy.png",true,()=>{
			btn.x = StageUtils.SW - btn.width >> 1;
			btn.y = StageUtils.SH - 300;
		});
		this.addChild(btn);
		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		window.location.href = UserInfo.instance.smallsow_url;
	}
}