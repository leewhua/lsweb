class WelcomePop extends PopView
{
	public constructor() 
	{
		super();
	}

	public setData(data:any = null):void
	{
		this.data = data;
		
		var img = new CustomImage(UserInfo.instance.url,true,function(){
			img.width = 100;
			img.height = 100;
			img.x = StageUtils.SW - img.width >> 1;
			img.y = (StageUtils.SH - img.height >> 1) - 200;
		});
		this.addChild(img);

		var headBg = Global.createBitmapByName("wel_head_png");
		headBg.x = StageUtils.SW - headBg.width >> 1;
		headBg.y = (StageUtils.SH - headBg.height >> 1) - 200;
		this.addChild(headBg);

		var maskBg:egret.Shape = new egret.Shape();
		maskBg.graphics.beginFill(0x0);
		maskBg.graphics.drawCircle(headBg.x+headBg.width / 2,headBg.y + headBg.height / 2,50);
		maskBg.graphics.endFill();
		this.addChild(maskBg);
		img.mask = maskBg;

		var txtName:egret.TextField = new egret.TextField();
		txtName.text = UserInfo.instance.username;
		txtName.width = StageUtils.SW;
		txtName.textAlign = egret.HorizontalAlign.CENTER;
		txtName.y = StageUtils.CH - 130;
		this.addChild(txtName);

		var btnInto = Global.createBitmapByName("wel_btn_png");
		btnInto.x = StageUtils.SW - btnInto.width >> 1;
		btnInto.y = StageUtils.SH - btnInto.height >> 1;
		this.addChild(btnInto);

		btnInto.touchEnabled = true;
		Global.setBut(btnInto);
		btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.intoClickHandler,this);

		var bg = Global.createBitmapByName("wel_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = (StageUtils.SH - bg.height >> 1) + 200;
		this.addChild(bg);

		egret.Tween.get(this).to({alpha:0},3000).call(function(){
			PopManager.hidePop("WelcomePop");
		});
	}

	private intoClickHandler():void
	{
		PopManager.hidePop("WelcomePop");
	}
}