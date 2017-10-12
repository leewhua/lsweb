class CustomTabButton extends egret.DisplayObjectContainer
{
	public txtLable:egret.TextField;

	private bg:egret.Shape;

	private _select = false;

	public w;
	public h;

	public constructor(label,w,h,size) 
	{
		super();
		this.w = w;
		this.h = h;

		this.bg = new egret.Shape();
		this.bg.graphics.beginFill(0x186cd1);
		this.bg.graphics.drawRect(0,0,w,h);
		this.bg.graphics.endFill();
		this.addChild(this.bg);

		this.txtLable = new egret.TextField();
		this.txtLable.text = label;
		this.txtLable.size = size;
		this.txtLable.x = 0;
		this.txtLable.y = 0;
		this.txtLable.width = w;
		this.txtLable.height = h;
		this.txtLable.textAlign = "center";
		this.txtLable.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.txtLable.textColor = 0xffffff;
		this.addChild(this.txtLable);

		this.touchEnabled = true;
	}

	public set select(val)
	{
		this._select = val;
		if(this._select)
		{
			this.txtLable.textColor = 0xffffff;
			this.bg.graphics.clear();
			this.bg.graphics.beginFill(0x186cd1);
			this.bg.graphics.drawRect(0,0,this.w,this.h);
			this.bg.graphics.endFill();
		}else
		{
			this.txtLable.textColor = 0x0;
			this.bg.graphics.clear();
			this.bg.graphics.beginFill(0xffffff);
			this.bg.graphics.drawRect(0,0,this.w,this.h);
			this.bg.graphics.endFill();
		}
	}

	public get select()
	{
		return this._select;
	}
}