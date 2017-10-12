class MenuItemView extends egret.DisplayObjectContainer
{
	public data:any;

	private icon:egret.Bitmap;

	public constructor()
	{
		super();
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchClickHandler,this);
	}

	private touchClickHandler(e:egret.TouchEvent):void
	{
		if(this.data)
		{
			alert("menu_item_id:"+this.data.id);
		}
	}

	public setData(data):void
	{
		this.data = data;
		if(data)
		{
			this.icon = Global.createBitmapByName("btn_func"+data.icon+"_png");
			this.icon.x = -this.icon.width >> 1;
			this.icon.y = -this.icon.height >> 1;
			this.addChild(this.icon);
			this.x = data.x;
			this.y = data.y;
		}
	}
}