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
		this.id = obj.shopid;
		this.status = obj.ticket;
		this.type = obj.type;
		this.init();
		console.log("id:"+this.id);
		
	}

	private init():void
	{
		this.icon = Global.createBitmapByName("icon"+this.id+"_png");
		this.icon.x = -this.icon.width >> 1;
		this.icon.y = -this.icon.height;
		// if(!this.status)
		// {
		// 	this.icon.filters = Global.grayFlilter;
		// }	
		this.addChild(this.icon);
	}

	public refreshPos():void
	{
		if(this.obj && MapManager.instance.Gmap)
		{
			var p = eval("MapManager.instance.Gmap.pointToPixel(new BMap.Point("+this.obj.lng+","+this.obj.lat+"))");
			// var sw = StageUtils.stage.stageWidth;
			// var sh = StageUtils.stage.stageHeight;

			// var lw = window.innerWidth;
			// var lh = window.innerHeight;

			// console.log(sw,lw,sh,lh);

			this.x = p.x * (StageUtils.SW / StageUtils.LW);
			this.y = p.y * (StageUtils.SH / StageUtils.LH);
			console.log(p.x,p.y,this.x,this.y);
		}
	}
}