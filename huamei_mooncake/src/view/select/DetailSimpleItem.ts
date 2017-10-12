class DetailSimpleItem extends egret.DisplayObjectContainer
{
	private txtName:egret.TextField;

	private txtCount:egret.TextField;

	private txtPrice:egret.TextField;

	public constructor()
	{
		super();

		this.txtName = new egret.TextField();
		this.txtName.x = 0;
		this.txtName.y = 0;
		this.txtName.textColor = 0x072a47;
		this.addChild(this.txtName);

		this.txtCount = new egret.TextField();
		this.txtCount.x = 180;
		this.txtCount.y = 3;
		this.txtCount.textColor = 0x072a47;
		this.txtCount.width = 100;
		this.txtCount.textAlign = "center";
		this.txtCount.size = 24;
		this.addChild(this.txtCount);

		this.txtPrice = new egret.TextField();
		this.txtPrice.x = 310;
		this.txtPrice.y = 3;
		this.txtPrice.textColor = 0xff4900;
		this.txtPrice.width = 120;
		this.txtPrice.textAlign = "right";
		this.txtPrice.size = 24;
		this.addChild(this.txtPrice);
	}

	public setData(data):void
	{
		this.txtName.text = decodeURI(data.name) + "";
		this.txtCount.text = data.cnt + "";
		this.txtPrice.text = data.price + "";
	}
}