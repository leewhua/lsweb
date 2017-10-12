class GameTipView extends egret.DisplayObjectContainer 
{
	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		var tip = Global.createBitmapByName("game_tip1_png");
		StageUtils.centerInParent(tip);
		this.addChild(tip);
	}
}