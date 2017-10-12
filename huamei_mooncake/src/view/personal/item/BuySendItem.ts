class BuySendItem extends egret.DisplayObjectContainer
{
	public num = 0;
	private txtNum:egret.TextField;

	public constructor(type)
	{
		super();
		var bg = new CustomImage("resource/assets/asyn/moontype/6/"+type+".png",true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
		});
		this.addChild(bg);

		var btnbg = Global.createBitmapByName("btn_addless_bg_png");
		btnbg.x = 400 + 80;
		btnbg.y = 25;
		this.addChild(btnbg);

		var btnLess = Global.createBitmapByName("btn_less_png");
		btnLess.x = 370 + 80;
		btnLess.y = 25;
		this.addChild(btnLess);

		var btnAdd = Global.createBitmapByName("btn_add_png");
		btnAdd.x = 453 + 80;
		btnAdd.y = 25;
		this.addChild(btnAdd);

		Global.setBut(btnLess);
		Global.setBut(btnAdd);

		btnLess.addEventListener(egret.TouchEvent.TOUCH_TAP,this.lessHandler,this);
		btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addHandler,this);

		this.txtNum = new egret.TextField();
		this.txtNum.x = 400 + 80;
		this.txtNum.y = 26;
		this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
		this.txtNum.width = 54;
		this.txtNum.textColor = 0x0;
		this.addChild(this.txtNum);

		this.txtNum.text = this.num + "";
	}

	private lessHandler():void
	{
		if(this.num > 0)
		{
			this.num --;
			this.txtNum.text = this.num + "";
		}
	}

	private addHandler():void
	{
		this.num ++;
		this.txtNum.text = this.num + "";
	}
}