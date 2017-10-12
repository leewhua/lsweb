class ShopItemView extends egret.DisplayObjectContainer
{
	public id;
	public status;
	public type;
	public obj;
	public oy;
	private icon:egret.Bitmap;

	public constructor(obj) 
	{
		super();
		this.obj = obj;
		//.shopid,obj.ticket,obj.type
		// this.id = obj.shopid;
	//	this.id = obj.id;
		this.status = obj.ticket;
		this.type = obj.type;
		if(this.type=="weidian"){
			this.id=3;
		}else if(this.type=="hongbao"){
			this.id=2;
		}
		this.init();
		console.log("id:"+this.id);
		
	}

	private init():void
	{
		this.icon = Global.createBitmapByName("icon"+this.id+"_png");
		this.icon.x = -this.icon.width >> 1;
		this.icon.y = -this.icon.height;
		if(!this.status)
		{
			this.icon.filters = Global.grayFlilter;
		}	
		this.addChild(this.icon);
	}
}