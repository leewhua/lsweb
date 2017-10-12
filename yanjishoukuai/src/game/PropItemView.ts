class PropItemView extends egret.DisplayObjectContainer 
{
	private icon:Middle;

	public isGlow:boolean;

	public canSelect:boolean;

	public canMove:boolean;

	private id:number;

	public constructor(id) 
	{
		super();
		this.id = id;
		this.canSelect = true;
		this.canMove = true;
		var prop = Global.createBitmapByName("prop"+id+"_png");
		this.icon = new Middle(prop);
		// prop.y -= (prop.height >> 1);
		this.addChild(this.icon);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
	}

	private clickHandler():void
	{
		if(this.isGlow)
		{
			SoundManager.getInstance().play('click_mp3',0.5,1);
			GameDispatcher.instance.dispatchEvent(new EventObj("custom","item_click",false,false,{id:this.id,x:this.x,y:this.y}));
		}
	}

	public setGlow(bl):void
	{
		if(this.isGlow != bl)
		{
			if(bl)
			{
				this.touchEnabled = true;
				this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
			}else
			{
				this.touchEnabled = false;
				this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
				this.icon.filters = [];
			}
			this.isGlow = bl;
		}
	}

	private index:number = 8;
	private isAdd:boolean;
	private enterFrameHandler():void
	{

		this.icon.filters = [new egret.GlowFilter( 0x00fcff, 0.8, this.index, this.index,2, egret.BitmapFilterQuality.HIGH, false, false )];

		
		if(this.isAdd)
		{
			this.index += 2;
			if(this.index > 15)
			{
				this.isAdd = false;
			}

		}else
		{
			this.index -= 2;
			if(this.index < 0)
			{
				this.isAdd = true;
			}
		}
	} 
}