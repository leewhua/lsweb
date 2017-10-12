class InfoOrderItem extends egret.DisplayObjectContainer
{
	private data;

	public constructor(data)
	{
		super();
		this.data = data;
		var bg = new CustomImage("resource/assets/asyn/info_order_item_bg.png",true,()=>{
			
		});
		this.addChild(bg);

		var btnGet = Global.createBitmapByName("btn_wuliu_png");
		btnGet.x = 450;
		btnGet.y = 215;
		this.addChild(btnGet);

		Global.setBut(btnGet);

		btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getHandler,this);

		//btn_wuliu_png

		var txtAddress = new egret.TextField();
		txtAddress.x = 140;
		txtAddress.y = 40;
		txtAddress.textAlign = egret.HorizontalAlign.CENTER;
		// txtAddress.width = 54;
		txtAddress.textColor = 0x0;
		txtAddress.size = 18;
		this.addChild(txtAddress);

		var txtName = new egret.TextField();
		txtName.x = 140;
		txtName.y = 70;
		txtName.textAlign = egret.HorizontalAlign.CENTER;
		// txtName.width = 54;
		txtName.textColor = 0x0;
		txtName.size = 18;
		this.addChild(txtName);

		var txtPhone = new egret.TextField();
		txtPhone.x = 250;
		txtPhone.y = 70;
		txtPhone.textAlign = egret.HorizontalAlign.CENTER;
		// txtPhone.width = 54;
		txtPhone.textColor = 0x0;
		txtPhone.size = 18;
		this.addChild(txtPhone);

		var txtOrderID = new egret.TextField();
		txtOrderID.x = 30;
		txtOrderID.y = 150;
		txtOrderID.textAlign = egret.HorizontalAlign.CENTER;
		// txtOrderID.width = 54;
		txtOrderID.textColor = 0x0;
		txtOrderID.size = 18;
		this.addChild(txtOrderID);

		var txtTime = new egret.TextField();
		txtTime.x = 390;
		txtTime.y = 150;
		txtTime.textAlign = egret.HorizontalAlign.CENTER;
		// txtTime.width = 54;
		txtTime.textColor = 0x0;
		txtTime.size = 18;
		this.addChild(txtTime);



		

		// txtAddress.text = "上海市徐汇区浦北路7号1803室";
		// txtName.text = "张三李四";
		// txtPhone.text = "13311965555";
		// txtOrderID.text = "订单号:18888888888888888";
		// txtTime.text = "2017-06-06 17:50:50";

		txtAddress.text = (data.province ? data.province + "省":"") + data.city+"市"+data.county+" "+data.address;
		txtName.text = data.name + "";
		txtPhone.text = data.telephone + "";
		txtOrderID.text = "订单号:"+data.id;
		txtTime.text = data.time + "";


		var icon = new CustomImage("resource/assets/asyn/moontype/5/"+data.type+".png",true,()=>{

		});
		icon.x = 10;
		icon.y = 195;
		this.addChild(icon);

	}

	private getHandler():void
	{
		if(this.data)
		{
			PopManager.showPop("MailSelectPop",this.data.id);
		}
		// PopManager.hidePop("InfoPop");
		// PopManager.showPop("PersonalPop",1);
	}
}