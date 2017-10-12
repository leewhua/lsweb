class DetailItem extends egret.DisplayObjectContainer
{
	private imgSale:egret.Bitmap;

	public constructor()
	{
		super();

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xffffff,0.001);
		bg.graphics.drawRect(0,0,StageUtils.SW,385);
		bg.graphics.endFill();
		this.addChild(bg);

		var line1 = Global.createBitmapByName("line_2_png");
		line1.x = 0;
		line1.y = 380;
		this.addChild(line1);
	}

	public setData(str,data):void
	{
		this.imgSale = Global.createBitmapByName("select_sale_"+str+"_png");
		this.imgSale.x = 45;
		this.imgSale.y = 385 - this.imgSale.height >> 1;
		this.addChild(this.imgSale);

		var line1 = Global.createBitmapByName("line_3_png");
		line1.x = 180;
		line1.y = 95;
		this.addChild(line1);

		var line1 = Global.createBitmapByName("line_3_png");
		line1.x = 180;
		line1.y = 190;
		this.addChild(line1);

		var line1 = Global.createBitmapByName("line_3_png");
		line1.x = 180;
		line1.y = 285;
		this.addChild(line1);

		var len = data.length;
		for(var i = 0;i<len;i++)
		{
			var item = new DetailSimpleItem();
			item.setData(data[i]);
			item.x = 180;
			item.y = 30 + i * 97;
			this.addChild(item);
		}
	}
}