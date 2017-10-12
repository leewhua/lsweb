class ShopPop extends PopView
{
	public constructor()
	{
		super();
	}

	public show():void
	{
		var bg=new egret.Shape()
      
        // bg.graphics.beginFill(0x0,0.8);
        // bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        // bg.graphics.endFill();

        // // this.view.scaleY = Main.scale;
        // // this.view.x=600;
        // // this.view.y=320;
        
        // this.addChildAt(bg,0);
        // bg.alpha=0;
        // Global.fadeIn(bg);

		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;
	}

	public setData(data):void
	{
		super.setData(data);
		this.removeChildren();

		var bg = Global.createBitmapByName("shop_bg_png");
		bg.width = StageUtils.SW;
		this.addChild(bg);

		var icon = Global.createBitmapByName("shop_icon_png");
		icon.x = 60;
		icon.y = 85;
		this.addChild(icon);

		var txtTitle = new egret.TextField();
		txtTitle.x = 60;
		txtTitle.y = 40;
		txtTitle.bold = true;
		this.addChild(txtTitle);
		txtTitle.text = decodeURI(data.name) + "";

		var txtAddress = new egret.TextField();
		txtAddress.x = 90;
		txtAddress.y = 84;
		this.addChild(txtAddress);
		txtAddress.size = 24;
		txtAddress.text = decodeURI(data.address)+"";


		this.y = StageUtils.SH;

		egret.Tween.get(this).to({y:StageUtils.SH - bg.height},300);


		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		PopManager.hidePop("ShopPop");
	}
}