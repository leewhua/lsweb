class OrderOKPop extends PopView
{
	public constructor()
	{
		super();
	}

	public setData(data):void
	{
		super.setData(data);

		var bg = new CustomImage("resource/assets/asyn/order_bg.png",true,()=>{
			bg.width = StageUtils.SW;
			bg.height = StageUtils.SH;
		});
		this.addChild(bg);

		var btnDuihuan = Global.createBitmapByName("btn_buy_gift_png");
		btnDuihuan.x = StageUtils.SW - btnDuihuan.width >> 1;
		btnDuihuan.y = StageUtils.SH - 165;
		this.addChild(btnDuihuan);
		Global.setBut(btnDuihuan);

		btnDuihuan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.duihuanHandler,this);

		var txtOrderID = new egret.TextField();
		txtOrderID.x = 0;
		txtOrderID.y = 200;
		txtOrderID.width = StageUtils.SW;
		txtOrderID.size = 36;
		txtOrderID.textAlign = egret.HorizontalAlign.CENTER;
		txtOrderID.text = data + "";
		txtOrderID.textColor = 0x0;
		this.addChild(txtOrderID);
	}

	private duihuanHandler():void
	{
		PopManager.hidePop("OrderOKPop");
		PopManager.showPop("InfoPop",3);
	}
}