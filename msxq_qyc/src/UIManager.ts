class UIManager extends egret.DisplayObjectContainer 
{
	public static _instance:UIManager;

	public static get instance():UIManager
	{
		if(!UIManager._instance)
		{
			UIManager._instance = new UIManager();
		}
		return UIManager._instance;
	}

	public mapLayer:egret.DisplayObjectContainer;

	public mainUILayer:egret.DisplayObjectContainer;

	public popLayer:egret.DisplayObjectContainer;

	public topLayer:egret.DisplayObjectContainer;

	public constructor()
	{
		super();
		this.initLayer();
	}

	private initLayer():void
	{
		this.mapLayer = new egret.DisplayObjectContainer();
		this.addChild(this.mapLayer);

		this.mainUILayer = new egret.DisplayObjectContainer();
		this.addChild(this.mainUILayer);

		this.popLayer = new egret.DisplayObjectContainer();
		this.addChild(this.popLayer);

		this.topLayer = new egret.DisplayObjectContainer();
		this.addChild(this.topLayer);
	}

	public initMainView():void
	{
		MapManager.instance;
		this.mainUILayer.addChild(new MainView());

		// PopManager.showPop("TipsPop");

		// MainView.instance.showPingZi();
		// MainView.instance.initSmallShop();

		//领奖
		// PopManager.showPop("RewardPop",{desc:"sw",val:1});
		//兑奖
		// PopManager.showPop("RewardPop",{desc:"sw",val:0});
		//已兑奖
		// PopManager.showPop("RewardPop",{desc:"sw",val:-1});

		// PopManager.showPop("ShopPop");
	}
}