class ListItem extends egret.DisplayObjectContainer
{
	private txtCount:egret.TextField;
	private txtName:egret.TextField;
	private txtCode:egret.TextField;
	private txtPrice:egret.TextField;
	private txtRate:egret.TextField;

	private imgCheck:egret.Bitmap;
	
	private _select = false;

	public data;

	public constructor()
	{
		super();

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xf9f9f9);
		bg.graphics.drawRect(0,0,StageUtils.SW,97);
		// bg.graphics.lineStyle(1,0x0,0.5);
		// bg.graphics.moveTo(0,97);
		// bg.graphics.lineTo(StageUtils.SW,97);
		bg.graphics.endFill();
		this.addChild(bg);

		this.txtCount = new egret.TextField();
		this.txtCount.fontFamily = "微软雅黑";
		this.txtCount.textColor = 0x072a47;
		this.txtCount.text = "库存紧张";
		this.txtCount.width = 50;
		this.txtCount.size = 19;
		this.txtCount.x = 20;
		this.txtCount.y = 28;
		this.addChild(this.txtCount);

		this.imgCheck = Global.createBitmapByName("check_no_png");
		this.imgCheck.x = 80;
		this.imgCheck.y = 38;
		this.addChild(this.imgCheck);

		this.txtName = new egret.TextField();
		this.txtName.textColor = 0x072a47;
		this.txtName.fontFamily = "微软雅黑";
		this.txtName.text = "金秋福运";
		this.txtName.x = 110;
		this.txtName.y = 35;
		this.txtName.size = 27;
		this.addChild(this.txtName);

		this.txtCode = new egret.TextField();
		this.txtCode.textColor = 0x545b66;
		this.txtCode.fontFamily = "微软雅黑";
		this.txtCode.text = "8K98";
		this.txtCode.x = 315;
		this.txtCode.y = 35;
		this.txtCode.size = 24;
		this.addChild(this.txtCode);

		this.txtPrice = new egret.TextField();
		this.txtPrice.textColor = 0x072a47;
		this.txtPrice.fontFamily = "微软雅黑";
		this.txtPrice.text = "998";
		this.txtPrice.x = 380;
		this.txtPrice.y = 35;
		this.txtPrice.size = 24;
		this.txtPrice.width = 110;
		this.txtPrice.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.txtPrice);
		

		this.txtRate = new egret.TextField();
		this.txtRate.textColor = 0xff4900;
		this.txtRate.fontFamily = "微软雅黑";
		this.txtRate.text = "7折";
		this.txtRate.x = 490;
		this.txtRate.y = 35;
		this.txtRate.size = 24;
		this.addChild(this.txtRate);

		// this.txtRate.border = true;

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
	}

	private touchHandler():void
	{
		if(this.data)
		{
			if(this.data.status != 0)
			{
				Message.show("已经购买过");
			}else if(this.data.rest)
			{
				this.select = !this.select;
				if(!this.select)
				{
					GameDispatcher.instance.dispatchEventWith("item_cancel");
				}
			}else
			{
				Message.show("库存不足");
			}
		}
	}

	public get select()
	{
		if(this.data && this.data.rest)
		{
			return this._select;
		}
		return false;
	}

	public set select(val)
	{
		this._select = val;
		if(this._select)
		{
			this.imgCheck.texture = RES.getRes("check_ok_png");
		}else
		{
			this.imgCheck.texture = RES.getRes("check_no_png");
		}
	}

	public setData(data):void
	{
		this.data = data;
		//name,price,batchcode1,status,discount,rest

		this.txtName.text = data.name + "";
		this.txtPrice.text = "￥"+data.price + "";
		this.txtCode.text = data.batchcode1 + "";
		this.txtRate.text = data.discount + "折/￥"+  Math.floor(data.disprice * 100 ) / 100;
		if(data.rest == 0)
		{
			this.txtCount.text = "库存不足";
			this.txtCount.textColor = 0x666666;
		}else if(data.rest > 5)
		{
			this.txtCount.text = "库存充足";
			this.txtCount.textColor = 0x0068AB;
		}else
		{
			this.txtCount.textColor = 0xFE3E55;
			this.txtCode.text = "库存紧张";
		}
		if(data.status != 0)
		{
			this.filters = Global.grayFlilter;
		}else
		{
			this.filters = [];
		}
		if(data.ischecked == 1)
		{
			this.select = true;
		}
	}
}