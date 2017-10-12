class Game1 extends GameBaseView
{
	
	public constructor()
	{
		super();

		var bg = Global.createBitmapByName("game1_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var title = Global.createBitmapByName("game1_title_png");
		title.x = (StageUtils.SW - title.width >> 1) + 10;
		title.y = - title.height;
		this.addChild(title);

		egret.Tween.get(title).to({y:20},800,egret.Ease.backOut).call(()=>
		{
			var lip = Global.createBitmapByName("game1_lip_png");
			lip.anchorOffsetX = lip.width >> 1;
			lip.anchorOffsetY = lip.height >> 1;
			lip.scaleX = lip.scaleY = 5;
			lip.alpha = 0;
			this.addChild(lip);
			egret.Tween.get(lip).to({alpha:1,scaleX:1,scaleY:1},1000).call(()=>
			{
				var tips = Global.createBitmapByName("game1_tips_png");
				tips.x = 410;
				tips.y = 285;
				tips.scaleX = 0;
				egret.Tween.get(tips).wait(300).to({scaleX:1},100).call(this.showHeart,this);
				egret.Tween.get(tips,{loop:true}).to({x:415},100).to({x:410},100);
				this.addChild(tips);
			}).to({scaleX:1.2,scaleY:0.2},300).to({scaleX:1,scaleY:1},100);
			lip.x = 20 + lip.width / 2;
			lip.y = 260 + lip.height / 2;
		});
		var btnHelp = Global.createBitmapByName("btn_htlp_png");
		btnHelp.x = 25;
		btnHelp.y = StageUtils.SH - 178;
		this.addChild(btnHelp);
		Global.setBut(btnHelp);
		btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.helpTouchHandler,this);

		
		this.initDanmuSend();
		this.initDanmuList();


		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHandler,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHandler,this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchEndHandler,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEndHandler,this);

		// PopManager.showPop("EndPop",100);
	}

	private showHeart():void
	{
		var heart1 = Global.createBitmapByName("game1_heart_png");
		heart1.scaleX = 0;
		heart1.scaleY = 0;
		heart1.anchorOffsetX = heart1.width >> 1;
		heart1.anchorOffsetY = heart1.height >> 1;
		heart1.x = 90;
		heart1.y = 790;
		this.addChild(heart1);
		egret.Tween.get(heart1,{loop:true}).to({scaleX:0,scaleY:0,y:790,alpha:0}).to({scaleX:0.5,scaleY:0.5,y:500,alpha:1},3000).to({alpha:0,scaleX:0.8,scaleY:0.8,y:360},1000);
		egret.Tween.get(heart1,{loop:true}).to({x:95},300).to({x:90},300);

		var heart2 = Global.createBitmapByName("game1_heart_png");
		heart2.scaleX = 0;
		heart2.scaleY = 0;
		heart2.anchorOffsetX = heart2.width >> 1;
		heart2.anchorOffsetY = heart2.height >> 1;
		heart2.x = 550;
		heart2.y = 790;
		this.addChild(heart2);
		egret.Tween.get(heart2,{loop:true}).wait(500).to({scaleX:0,scaleY:0,y:790,alpha:0}).to({scaleX:0.5,scaleY:0.5,y:500,alpha:1},3000).to({alpha:0,scaleX:1,scaleY:1,y:300},1000);
		egret.Tween.get(heart2,{loop:true}).to({x:560},300).to({x:550},300);

		var heart3 = Global.createBitmapByName("game1_heart_png");
		heart3.scaleX = 0;
		heart3.scaleY = 0;
		heart3.anchorOffsetX = heart3.width >> 1;
		heart3.anchorOffsetY = heart3.height >> 1;
		heart3.x = 580;
		heart3.y = 790;
		this.addChild(heart3);
		egret.Tween.get(heart3,{loop:true}).wait(1000).to({scaleX:0,scaleY:0,y:790,alpha:0}).to({scaleX:0.5,scaleY:0.5,y:550,alpha:1},3000).to({alpha:0,scaleX:1,scaleY:1,y:450},1000);
		egret.Tween.get(heart3,{loop:true}).to({x:590},300).to({x:580},300);
	}

	private touchList = [];
	private touchBeginHandler(e:egret.TouchEvent):void
	{
		this.touchList.push(e.touchPointID);
		if(this.touchList.length >= 2)
		{
			// alert("双击:"+this.touchList[0]+"_"+this.touchList[1]);
			var face = Global.createBitmapByName("game1_face_png");
			face.x = 195;
			face.y = 445;
			this.addChild(face);
			face.alpha = 0;
			egret.Tween.get(face).to({alpha:1},1000);

			this.play();
		}
	}

	private touchEndHandler(e:egret.TouchEvent):void
	{
		this.touchList.splice(this.touchList.indexOf(e.touchPointID),1);
	}

	private helpTouchHandler():void
	{
		PopManager.showPop("HelpPop");
	}
}