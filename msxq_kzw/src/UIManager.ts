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

	private isTips;
	public initMainView():void
	{
		MapManager.instance;
		this.mainUILayer.addChild(new MainView());
		
		this.isTips = window.sessionStorage.getItem("tips_load");
        if(this.isTips != "1")
        {
			if(UserInfo.instance.fixed == "0")
			{
				PopManager.showPop("TipsPop",3);
				window.sessionStorage.setItem("tips_load","1");
			}
        }
	}
}