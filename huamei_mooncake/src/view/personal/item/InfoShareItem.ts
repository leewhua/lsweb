class InfoShareItem extends egret.DisplayObjectContainer
{
	private txtNum:egret.TextField;

	public constructor(type,num)
	{
		super();
		var bg = new CustomImage("resource/assets/asyn/moontype/3/"+type+".png",true,()=>{
			
		});
		this.addChild(bg);

		var numBg = Global.createBitmapByName("num_bg_png");
		numBg.x = 420;
		numBg.y = 20;
		this.addChild(numBg);

		this.txtNum = new egret.TextField();
		this.txtNum.x = 424;
		this.txtNum.y = 26;
		this.txtNum.textAlign = egret.HorizontalAlign.CENTER;
		this.txtNum.width = 54;
		this.txtNum.textColor = 0x0;
		this.addChild(this.txtNum);

		this.txtNum.text = num + "";
	}
}