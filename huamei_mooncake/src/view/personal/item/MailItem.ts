class MailItem extends egret.DisplayObjectContainer
{
	private txtContent:egret.TextField;

	private txtTime:egret.TextField;

	private icon:egret.Bitmap;

	private line:egret.Bitmap;

	private bg:egret.Shape;

	public h:number;

	public constructor() 
	{
		super();

		this.bg = new egret.Shape();
		this.addChild(this.bg);

		this.txtContent = new egret.TextField();
		this.txtContent.textColor = 0x565656;
		this.txtContent.size = 24;
		this.txtContent.x = 100;
		this.txtContent.y = 20;
		this.txtContent.text = "";
		// this.txtContent.wordWrap = true;
		this.txtContent.multiline = true;
		// this.txtContent.height = 60;
		this.txtContent.width = 510;
		this.txtContent.lineSpacing = 5;
		this.addChild(this.txtContent);
		// this.txtContent.border = true;

		this.txtTime = new egret.TextField();
		this.txtTime.textColor = 0x565656;
		this.txtTime.size = 20;
		this.txtTime.x = 100;
		this.txtTime.y = 85;
		this.txtTime.text = "";
		this.addChild(this.txtTime);

		this.icon = Global.createBitmapByName("mail_item_2_png");
		this.icon.x = 40;
		this.icon.y = 25;
		this.addChild(this.icon);

		this.line = Global.createBitmapByName("mail_item_3_png");
		this.line.x = 85;
		this.line.y = 120;
		this.addChild(this.line);
	}

	public setData(index,data):void
	{
		if(index == 0)
		{
			this.txtContent.textColor = 0xff7323;
			this.txtTime.textColor = 0xff7323;
			this.icon.texture = RES.getRes("mail_item_1_png");
		}else
		{
			this.txtContent.textColor = 0x444444;
			this.txtTime.textColor = 0x848484;
			this.icon.texture = RES.getRes("mail_item_2_png");
		}
		this.txtContent.text = data.AcceptStation + "";
		this.txtTime.text = data.AcceptTime + "";

		this.txtTime.y = this.txtContent.y + this.txtContent.height + 15;
		this.line.y = this.txtTime.y + this.txtTime.height + 10;

		this.bg.graphics.beginFill(0x0,0.001);
		this.bg.graphics.drawRect(0,0,StageUtils.SW,this.line.y + this.line.height);
		this.bg.graphics.endFill();

		this.h = this.height;
	}
}