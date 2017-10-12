class LoginView extends egret.DisplayObjectContainer
{
	private btnStart:egret.Bitmap;

	private btnGZ:egret.Bitmap;

	public constructor() 
	{
		super();
		this.init();
	}

	private init()
	{
		var gameBg = Global.createBitmapByName("game_bg_png");
        gameBg.width = StageUtils.stage.stageWidth;
        gameBg.height = StageUtils.stage.stageHeight;
        this.addChild(gameBg);

		var bg = Global.createBitmapByName("login_bg_png");
		StageUtils.centerInParent(bg,0,50);
        this.addChild(bg);

		var title = Global.createBitmapByName("title_png");
		// title.scaleX = title.scaleY = 0.85;
		StageUtils.centerInParent(title,10,-350);
        this.addChild(title);

		var logo = Global.createBitmapByName(Main.product_type + "_json.logo-blue");
		StageUtils.centerInParent(logo,0,-500);
        this.addChild(logo);

		this.btnStart = Global.createBitmapByName("start_png");
		this.btnStart.x = 50;
		this.btnStart.y = 980;
		this.addChild(this.btnStart);

		this.btnGZ = Global.createBitmapByName("help-btn_png");
		this.btnGZ.x = 510;
		this.btnGZ.y = 20;
		this.addChild(this.btnGZ);

		this.btnStart.touchEnabled = true;
		this.btnStart.once(egret.TouchEvent.TOUCH_TAP,this.startClickHandler,this);

		this.btnGZ.touchEnabled = true;
		this.btnGZ.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gzClickHandler,this);

		Global.setBut(this.btnStart);
		Global.setBut(this.btnGZ);

		var man = new ManView();
		man.x = 550;
		man.y = 900;
		man.stand();
		this.addChild(man);

		// Main.showLost(1);
	}

	private startClickHandler():void
	{
		Main.instance.showGame();
	}

	private gzClickHandler():void
	{
		Main.showPop("HelpPop");
	}
}