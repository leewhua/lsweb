class SelectPop extends PopView
{
	private txtContent1:egret.TextField;

	private txtContent2:egret.TextField;

	private sp1:egret.Sprite;

	private sp2:egret.Sprite;

	private line1:egret.Bitmap;

	public txtName:egret.TextField;

	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new egret.Shape();
		bg.graphics.beginFill(0xffffff);
		bg.graphics.drawRect(0,0,StageUtils.SW,StageUtils.SH);
		bg.graphics.endFill();
		this.addChild(bg);

		this.initContent();
	}

	private initContent():void
	{	
		this.sp1 = new egret.Sprite();
		this.sp1.graphics.beginFill(0x0,0.001);
		this.sp1.graphics.drawRect(0,0,320,95);
		this.sp1.graphics.endFill();
		this.addChild(this.sp1);
		this.txtContent1 = new egret.TextField();
		this.txtContent1.text = "付款明细";
		this.txtContent1.size = 36;
		this.txtContent1.x = this.sp1.width - this.txtContent1.width >> 1;
		this.txtContent1.y = this.sp1.height - this.txtContent1.height >> 1;
		this.txtContent1.textColor = 0xff4900;
		this.sp1.addChild(this.txtContent1);

		this.sp2 = new egret.Sprite();
		this.sp2.graphics.beginFill(0x0,0.001);
		this.sp2.graphics.drawRect(0,0,320,95);
		this.sp2.graphics.endFill();
		this.sp2.x = 320;
		this.addChild(this.sp2);
		this.txtContent2 = new egret.TextField();
		this.txtContent2.text = "下载表格";
		this.txtContent2.size = 36;
		this.txtContent2.x = this.sp2.width - this.txtContent2.width >> 1;
		this.txtContent2.y = this.sp2.height - this.txtContent2.height >> 1;
		this.txtContent2.textColor = 0x32393D;
		this.sp2.addChild(this.txtContent2);
		

		this.sp1.touchEnabled = true;
		this.sp2.touchEnabled = true;

		this.sp1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.spHandler,this);
		this.sp2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.spHandler,this);

		var line2 = Global.createBitmapByName("line_2_png");
		line2.x = 0;
		line2.y = 91;
		this.addChild(line2);

		this.line1 = Global.createBitmapByName("line_1_png");
		this.line1.x = 0;
		this.line1.y = 95;
		this.addChild(this.line1);

		this.txtName = new egret.TextField();
		this.txtName.width = StageUtils.SW;
		this.txtName.x = 0;
		this.txtName.y = 150;
		this.txtName.textColor = 0x072a47;
		this.txtName.textAlign = "center";
		this.addChild(this.txtName);
		this.txtName.text = "【账户名：华美】";

		// this.sp2.visible = false;

		this.showView(0);
	}

	private spHandler(e:egret.TouchEvent):void
	{
		if(e.target == this.sp1)
		{
			this.txtContent1.textColor = 0xff4900;
			this.txtContent2.textColor = 0x32393D;
			this.line1.x = 0;
			this.showView(0);
		}else
		{
			this.txtContent1.textColor = 0x32393D;
			this.txtContent2.textColor = 0xff4900;
			this.line1.x = 320;
			this.showView(1);
		}
	}

	private detail:DetailView;

	private down:DownView;

	private showView(index):void
	{
		if(index == 0)
		{
			if(!this.detail)
			{
				this.detail = new DetailView();
				this.detail.x = StageUtils.SW - this.detail.width >> 1;
				this.detail.y = 240;
				this.addChild(this.detail);
			}
			this.detail.visible = true;
			if(this.down)
			{
				this.down.visible = false;
			}
		}else
		{
			if(!this.down)
			{
				this.down = new DownView();
				this.down.x = StageUtils.SW - this.down.width >> 1;
				this.down.y = 240;
				this.addChild(this.down);
			}
			this.down.visible = true;
			if(this.detail)
			{
				this.detail.visible = false;
			}
		}
	}
}