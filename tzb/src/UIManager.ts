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
		this.mainUILayer = new egret.DisplayObjectContainer();
		this.addChild(this.mainUILayer);

		this.popLayer = new egret.DisplayObjectContainer();
		this.addChild(this.popLayer);

		this.topLayer = new egret.DisplayObjectContainer();
		this.addChild(this.topLayer);
	}

	private game:GameBaseView;

	public initMainView():void
	{
		if(Main.IS_SHARE)
		{
			this.mainUILayer.addChild(new ShareView());
		}else
		{
			if(Main.type == 1)
			{
				this.game = new Game1();
				this.mainUILayer.addChild(this.game);
			}else if(Main.type == 2)
			{
				this.game = new Game2();
				this.mainUILayer.addChild(this.game);
			}else
			{
				this.game = new Game3();
				this.mainUILayer.addChild(this.game);
			}
		}

		if(Main.step == "filled")
		{
			PopManager.showPop("InputPop");
			console.log("input");
		}else if(Main.step == "cashed")
		{
			PopManager.showPop("InfoPop");
		}
	}

	public initShareView():void
	{
		if(this.game)
		{
			this.mainUILayer.removeChild(this.game);
			this.game = null;
		}
		this.mainUILayer.addChild(new ShareView());
	}
}