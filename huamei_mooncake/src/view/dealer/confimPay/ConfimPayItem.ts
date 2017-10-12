class ConfimPayItem extends egret.Sprite
{
	public data;

	public len;
	public price;
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		this.data = data;

		this.graphics.beginFill(0xdedede);
		this.graphics.drawRect(0,0,600,133);
		this.graphics.endFill();

		var txtName = new egret.TextField();
		txtName.x = 30;
		txtName.y = 30;
		txtName.textColor = 0x072a47;
		this.addChild(txtName);

		var txtCount = new egret.TextField();
		txtCount.x = 250;
		txtCount.y = 30;
		txtCount.textColor = 0xff4900;
		this.addChild(txtCount);

		var xiaoji = new egret.TextField();
		xiaoji.x = 30;
		xiaoji.y = 80;
		xiaoji.textColor = 0x072a47;
		xiaoji.text = "小计：";
		xiaoji.size = 24;
		this.addChild(xiaoji);

		var txtPrice = new egret.TextField();
		txtPrice.x = 100;
		txtPrice.y = 80;
		txtPrice.textColor = 0xff4900;
		txtPrice.size = 24;
		this.addChild(txtPrice);

		

		this.len = data.length;
		this.price = 0;
		var cname = "";
		for(var i = 0;i<this.len;i++)
		{
			// this.price += parseFloat(data[i].disprice);
			this.price += Math.floor(data[i].disprice * 100) / 100;
			cname = data[i].name;
			console.log(this.price);
		}

		txtName.text = cname + "";
		txtCount.text = "X"+this.len;
		txtPrice.text = "￥"+this.price;

		var btnDetail = Global.createBitmapByName("btn_detail_png");
		btnDetail.x = this.width - btnDetail.width - 30;
		btnDetail.y = 46;
		this.addChild(btnDetail);
		Global.setBut(btnDetail);
		btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP,this.detailHandler,this);
	}

	private detailHandler():void
	{
		if(this.data)
		{
			PopManager.showPop("PayDetailPop",this.data);
		}
	}
}