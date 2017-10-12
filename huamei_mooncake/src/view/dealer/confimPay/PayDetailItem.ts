class PayDetailItem extends egret.DisplayObjectContainer
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		var bg = new egret.Shape();
		bg.graphics.beginFill(0x0,0.001);
		bg.graphics.drawRect(0,0,510,100);
		bg.graphics.endFill();
		this.addChild(bg);

		var txtName = new egret.TextField();
		txtName.x = 0;
		txtName.y = 0;
		txtName.textColor = 0x0;
		this.addChild(txtName);

		var txtCode = new egret.TextField();
		txtCode.x = 200;
		txtCode.y = 0;
		txtCode.textColor = 0x0;
		this.addChild(txtCode);

		var txtPrice = new egret.TextField();
		txtPrice.x = 330;
		txtPrice.y = 0;
		txtPrice.textColor = 0x0;
		txtPrice.width = 120;
		txtPrice.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(txtPrice);

		txtName.text = data.name + "";
		txtCode.text = data.batchcode1 + "";
		txtPrice.text =  Math.floor(data.disprice * 100 ) / 100 + "";
	}
}