class SharePop extends PopView
{
	public constructor()
	{
		super();
	}

	public show():void
	{
		var bg=new egret.Shape()
      
        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);
        bg.graphics.endFill();

        // this.view.scaleY = Main.scale;
        // this.view.x=600;
        // this.view.y=320;
        
        this.addChildAt(bg,0);

		UIManager.instance.popLayer.addChild(this);
		this.touchEnabled = true;


		var share = new CustomImage("resource/assets/asyn/share_bg.png",true,()=>{
			share.x = StageUtils.SW - share.width - 35;
			share.y = 35;
		});
		this.addChild(share);
	}
}