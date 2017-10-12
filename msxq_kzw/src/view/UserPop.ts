class UserPop extends PopView
{
	public constructor() 
	{
		super();
	}

	public setData(data:any = null):void
	{
		this.data = data;

		var img = new CustomImage("resource/assets/asyn/user_bg.png",true,function(){
			img.x = StageUtils.SW - img.width >> 1;
			img.y = 65;
		});
		this.addChild(img);

		var btnClose:egret.Bitmap = Global.createBitmapByName("close_png");
		btnClose.x = StageUtils.SW - btnClose.width - 50;
		btnClose.y = 75;
		this.addChild(btnClose);

		btnClose.touchEnabled = true;
		Global.setBut(btnClose);
		btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClickHandler,this);
		
		this.tabContainer = new egret.DisplayObjectContainer();
		this.addChild(this.tabContainer);

		this.loadHead();
		this.initTabbar();

		this.setTabSelect(data);
	}

	private tab1:egret.Bitmap;

	private tab2:egret.Bitmap;

	private tab3:egret.Bitmap;

	private tabSelectIndex;
	private tabSelect:egret.Bitmap;

	private tabContainer:egret.DisplayObjectContainer;

	private initTabbar():void
	{
		var line1 = Global.createBitmapByName("line2_png");
		line1.x = 200;
		line1.y = 115;
		this.addChild(line1);

		var line2 = Global.createBitmapByName("line1_png");
		line2.x = StageUtils.SW - line2.width >> 1;
		line2.y = 155;
		this.addChild(line2);
		

		this.tab1 = Global.createBitmapByName("tabbar_1_2_png");
		this.tab1.x = 155;
		this.tab1.y = 115;
		this.addChild(this.tab1);

		this.tab2 = Global.createBitmapByName("tabbar_2_2_png");
		this.tab2.x = 155 + 70;
		this.tab2.y = 115;
		this.addChild(this.tab2);

		this.tab3 = Global.createBitmapByName("tabbar_3_2_png");
		this.tab3.x = 155 + 140;
		this.tab3.y = 115;
		this.addChild(this.tab3);

		this.tab1.touchEnabled = true;
		this.tab2.touchEnabled = true;
		this.tab3.touchEnabled = true;

		Global.setBut(this.tab1);
		Global.setBut(this.tab2);
		Global.setBut(this.tab3);

		this.tab1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tab1ClickHandler,this);
		this.tab2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tab2ClickHandler,this);
		this.tab3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tab3ClickHandler,this);
	}

	private tab1ClickHandler():void
	{
		this.setTabSelect(1);
	}

	private tab2ClickHandler():void
	{
		this.setTabSelect(2);
	}

	private tab3ClickHandler():void
	{
		this.setTabSelect(3);
	}

	private setTabSelect(index):void
	{
		if(index == this.tabSelectIndex)
		{
			return;
		}
		if(this.tabSelect)
		{
			this.tabSelect.texture = RES.getRes("tabbar_"+this.tabSelectIndex+"_2_png");
		}
		var item = this["tab"+index];
		if(item)
		{
			this.tabSelectIndex = index;
			this.tabSelect = item;
			this.tabSelect.texture = RES.getRes("tabbar_"+this.tabSelectIndex+"_1_png");
		}

		this.initTabContent();
	}

	private initTabContent():void
	{
		this.tabContainer.removeChildren();
		if(this.tabSelectIndex == 1)
		{
			//我
			var bg = new CustomImage("resource/assets/asyn/user_wo.png",true,function(){
				bg.x = StageUtils.SW - bg.width >> 1;
				bg.y = 200;
			});
			this.tabContainer.addChild(bg);
		}else if(this.tabSelectIndex == 2)
		{
			//红包
			var bg = new CustomImage("resource/assets/asyn/user_hb.png",true,function(){
				bg.x = StageUtils.SW - bg.width >> 1;
				bg.y = 200;
			});
			this.tabContainer.addChild(bg);
		}else
		{
			//体验卷
			var bg = new CustomImage("resource/assets/asyn/user_lq.png",true,function(){
				bg.x = StageUtils.SW - bg.width >> 1;
				bg.y = 200;
			});
			this.tabContainer.addChild(bg);
		}
	}

	private loadHead():void
	{
		var img = new CustomImage(UserInfo.instance.url,true,function(){
			img.width = 122;
			img.height = 122;
			img.x = 3;
			img.y = 10;
		});
		this.addChild(img);

		var headBg = Global.createBitmapByName("head_bg_png");
		headBg.x = 3;
		headBg.y = 10;
		this.addChild(headBg);

		var maskBg:egret.Shape = new egret.Shape();
		maskBg.graphics.beginFill(0x0);
		maskBg.graphics.drawCircle(headBg.x+headBg.width / 2,headBg.y + headBg.height / 2,50);
		maskBg.graphics.drawCircle
		maskBg.graphics.endFill();
		this.addChild(maskBg);
		img.mask = maskBg;
	}

	private closeClickHandler():void
	{
		PopManager.hidePop("UserPop");
	}
}