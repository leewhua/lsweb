class SelectListItem extends egret.DisplayObjectContainer
{
	private txtName:egret.TextField;
	private txtCode:egret.TextField;
	private txtPrice:egret.TextField;
	private txtRate:egret.TextField;
	private txtStatus:egret.TextField;

	public constructor()
	{
		super();

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xf9f9f9);
		bg.graphics.drawRect(0,0,StageUtils.SW,97);
		bg.graphics.lineStyle(1,0x0);
		bg.graphics.moveTo(0,97);
		bg.graphics.lineTo(StageUtils.SW,97);
		bg.graphics.endFill();
		this.addChild(bg);

		this.txtName = new egret.TextField();
		this.txtName.textColor = 0x072a47;
		this.txtName.fontFamily = "微软雅黑";
		this.txtName.text = "金秋福运";
		this.txtName.x = 15;
		this.txtName.y = 32;
		this.txtName.size = 27;
		this.addChild(this.txtName);

		this.txtCode = new egret.TextField();
		this.txtCode.textColor = 0x545b66;
		this.txtCode.fontFamily = "微软雅黑";
		this.txtCode.text = "8K98";
		this.txtCode.x = 225;
		this.txtCode.y = 35;
		this.txtCode.size = 24;
		this.addChild(this.txtCode);

		this.txtPrice = new egret.TextField();
		this.txtPrice.textColor = 0xff4900;
		this.txtPrice.fontFamily = "微软雅黑";
		this.txtPrice.text = "998";
		this.txtPrice.x = 300;
		this.txtPrice.y = 35;
		this.txtPrice.size = 24;
		this.txtPrice.width = 110;
		this.txtPrice.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.txtPrice);

		this.txtRate = new egret.TextField();
		this.txtRate.textColor = 0x072a47;
		this.txtRate.fontFamily = "微软雅黑";
		this.txtRate.text = "7折";
		this.txtRate.x = 425;
		this.txtRate.y = 35;
		this.txtRate.size = 24;
		this.addChild(this.txtRate);

		this.txtStatus = new egret.TextField();
		this.txtStatus.textColor = 0x13629E;
		this.txtStatus.fontFamily = "微软雅黑";
		this.txtStatus.text = "已付款";
		this.txtStatus.x = StageUtils.SW - 135;
		this.txtStatus.y = 35;
		this.txtStatus.width = 120;
		this.txtStatus.size = 24;
		this.txtStatus.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.txtStatus);
	}

	public setData(data):void
	{
		//name,price,batchcode1,status,discount,rest
		this.txtName.text = data.name + "";
		this.txtPrice.text = "￥"+data.price + "";
		this.txtCode.text = data.batchcode1 + "";
		this.txtRate.text = data.discount + "折";
		// if(data.status == "1")
		// {
			this.txtStatus.textColor = 0x13629E;
			this.txtStatus.text = "已付款";
		// }else if(data.status == "0")
		// {
		// 	this.txtStatus.textColor = 0xFE3E55;
		// 	this.txtStatus.text = "未付款";
		// }else
		// {
		// 	this.txtStatus.textColor = 0xFE3E55;
		// 	this.txtStatus.text = "付款失败";
		// }
	}
}