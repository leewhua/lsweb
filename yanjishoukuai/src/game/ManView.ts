class ManView extends egret.DisplayObjectContainer 
{
	private mc:egret.MovieClip;

	private container:egret.DisplayObjectContainer;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		var car = Global.createBitmapByName("car_png");
		car.x = -285;
		car.y = -40	;
		this.addChild(car);

		this.mc = Global.createMc("man_json","man_png","man");
		this.mc.x = -this.mc.width >> 1;
		this.mc.y = -this.mc.height >> 1;
		this.addChild(this.mc);
		
		// GameDispatcher.instance.addEventListener("custom",this.customEventHandler,this);
	}

	public addProp(prop):void
	{
		prop.x = -150 + Math.random() * 50 - 25;
		prop.y = 90;
		this.container.addChild(prop);
	}
	
	public stand():void
	{
		this.mc.gotoAndPlay("stand",-1);
		this.mc.frameRate = 12;
	}

	public play():void
	{
		this.mc.gotoAndPlay("play",-1);
		this.mc.frameRate = 24;

		SoundManager.getInstance().play("play_mp3");
	}

	private static _instance:ManView;

	public static getInstance():ManView
	{
		if(!ManView._instance)
		{
			ManView._instance = new ManView();
		}
		return ManView._instance;
	}
}