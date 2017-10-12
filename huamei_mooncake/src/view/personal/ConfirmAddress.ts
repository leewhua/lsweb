class ConfirmAddress extends egret.DisplayObjectContainer{
    public btnOK: egret.Bitmap;
    public btnBack: egret.Bitmap;
    public constructor(){
        super();
        this.confirmAddress();
		// this.addEventListener(egret.Event.ADDED_TO_STAGE, this.confirmAddress, this);
    }
    private confirmAddress():void
	{
		var confirmAdd = Global.createBitmapByName("confirm_address_png");
		confirmAdd.x = StageUtils.SW - confirmAdd.width >> 1;
		confirmAdd.y = StageUtils.SH - confirmAdd.height >> 1;
		this.addChild(confirmAdd);

		this.btnOK = Global.createBitmapByName("btn_OK_png");
		this.btnOK.x = 100;
		this.btnOK.y = 580;
		this.addChild(this.btnOK);
		// btnOK.touchEnabled = true;
		// btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);

		this.btnBack = Global.createBitmapByName("btn_back_png");
		this.btnBack.x = 330;
		this.btnBack.y = 580;
		this.addChild(this.btnBack);
		// btnBack.touchEnabled = true;
		// btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
	}

	// public setData(data):void{
	// 	super.setData(data);
	// 	var bg = new CustomImage("resource/assets/login/personal/confirm_address.png", true, () => {
	// 		bg.x = StageUtils.SW - bg.width >> 1;
	// 		bg.y = StageUtils.SH - bg.height >> 1;
	// 	});
	// 	this.addChild(bg);

	// 	var btnOK = new CustomImage("resource/assets/login/personal/btn_OK_png", true, () => {
	// 		btnOK.x = bg.x + 50;
	// 		btnOK.y = bg.y + 120;
	// 	});
	// 	this.addChild(btnOK);
	// 	btnOK.touchEnabled = true;
	// 	btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandler, this);

	// 	var btnBack = new CustomImage("resource/assets/login/personal/btn_back_png", true, () => {
	// 		btnBack.x = bg.x + 150;
	// 		btnBack.y = bg.y + 120;
	// 	});
	// 	this.addChild(btnBack);
	// 	btnBack.touchEnabled = true;
	// 	btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
	// }

	// private submitHandler(){

	// }
	// private closeHandler():void{
	// 	this.parent.removeChild(this);
	// }
}