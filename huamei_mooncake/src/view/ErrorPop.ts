class ErrorPop extends PopView
{
	private htmlCode:QRCode;

	public constructor()
	{
		super();
	}
	
	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage(data.url,true,()=>{
			bg.x = StageUtils.SW - bg.width >> 1;
			bg.y = StageUtils.SH - bg.height >> 1;
		});
		this.addChild(bg);

		if(data.qr)
		{
			this.htmlCode = new QRCode("resource/assets/asyn/pay_send_ok_code.png");
			this.htmlCode.setPosition(data.x, data.y, 125, 127);
			this.htmlCode.showHtmlCode();
		}
	}
}