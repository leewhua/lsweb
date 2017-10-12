class Game3 extends GameBaseView
{
	private btn:egret.Bitmap;
	private tips:egret.Bitmap;

	private bar:egret.Bitmap;

	private maskBar:egret.Bitmap;

	private light:egret.Bitmap;

	private light1:egret.Bitmap;

	private btnStart:egret.Bitmap;

	private yezi:egret.Bitmap;

	private chuizi:egret.Bitmap;

	public constructor()
	{
		super();

		var bg = Global.createBitmapByName("game_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		this.light = Global.createBitmapByName("game3_bg_light_png");
		this.light.x = StageUtils.SW - this.light.width >> 1;
		this.light.y = StageUtils.SH - this.light.height >> 1;
		this.addChild(this.light);
		this.light.visible = false;

		var title = Global.createBitmapByName("game3_title_png");
		title.x = (StageUtils.SW - title.width >> 1) + 10;
		title.y = - title.height;
		this.addChild(title);
		egret.Tween.get(title).to({y:20},800,egret.Ease.backOut);

		var tips = Global.createBitmapByName("game3_tips_png");
		tips.x = StageUtils.SW - tips.width >> 1;
		tips.y = StageUtils.SH - tips.height - 240;
		this.addChild(tips);
		this.tips = tips;
			
		var btnHelp = Global.createBitmapByName("btn_htlp_png");
		btnHelp.x = 25;
		btnHelp.y = StageUtils.SH - btnHelp.height - 25;
		this.addChild(btnHelp);
		Global.setBut(btnHelp);
		btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.helpTouchHandler,this);

		var yezi = Global.createBitmapByName("game3_yezi_png");
		yezi.x = (StageUtils.SW - yezi.width >> 1) - 45;
		yezi.y = StageUtils.SH - yezi.height >> 1;
		this.addChild(yezi);
		this.yezi = yezi;
		egret.Tween.get(this.yezi,{loop:true}).to({y:yezi.y+10},1000).to({y:yezi.y},1000);

		var barBg = Global.createBitmapByName("game3_bar_bg_png");
		barBg.x = 34;
		barBg.y = StageUtils.SH - barBg.height >> 1;
		this.addChild(barBg);
		
		this.bar = Global.createBitmapByName("game3_bar_png");
		this.bar.x = 34;
		this.bar.y = StageUtils.SH - this.bar.height >> 1;
		this.addChild(this.bar);

		var maskBar = Global.createBitmapByName("game3_bar_png");
		maskBar.x = this.bar.x;
		maskBar.y = this.bar.y + 440;
		this.addChild(maskBar);
		this.bar.mask = maskBar;
		this.maskBar = maskBar;

		this.light1 = Global.createBitmapByName("game3_light_png");
		this.light1.x = StageUtils.CW;
		this.light1.y = StageUtils.SH - this.light1.height - 10 + this.light1.height / 2;
		this.light1.anchorOffsetX = this.light1.width >> 1;
		this.light1.anchorOffsetY = this.light1.height >> 1;
		this.addChild(this.light1);
		this.light1.visible = false;

		var chuizi = Global.createBitmapByName("game3_chuizi_png");
		chuizi.x = 560;
		chuizi.y = 585;
		chuizi.anchorOffsetX = chuizi.width - 10;
		chuizi.anchorOffsetY = chuizi.height - 10;
		this.addChild(chuizi);
		this.chuizi = chuizi;
		// egret.Tween.get(this.chuizi,{loop:true}).to({y:590},500).to({y:585},500);

		var btnStart = Global.createBitmapByName("btn_start_png");
		btnStart.x = StageUtils.SW - btnStart.width >> 1;
		btnStart.y = StageUtils.SH - btnStart.height - 105;
		this.addChild(btnStart);
		Global.setBut(btnStart);

		btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.btnTouchHandler,this);
		btnStart.addEventListener(egret.TouchEvent.TOUCH_END,this.btnTouchEndHandler,this);
		btnStart.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.btnTouchEndHandler,this);
		btnStart.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.btnTouchEndHandler,this);

		this.btnStart = btnStart;
	}

	private isMove = false;
	private btnTouchHandler():void
	{
		this.light1.visible = true;
		this.light1.scaleX = this.light1.scaleY = 0.3;
		this.light1.alpha = 0.3;
		egret.Tween.get(this.light1,{loop:true}).to({scaleX:1,scaleY:1,alpha:1},800).to({scaleX:0.3,scaleY:0.3,alpha:0.3},500);

		// if(!this.isMove)
		// {
		// 	this.isMove = true;
		// 	egret.Tween.get(this.maskBar).to({y:this.bar.y},3000).call(()=>{
		// 		this.openYezi();
		// 	});
		// }


		egret.Tween.get(this.maskBar,{loop:true}).to({y:this.bar.y},1000).to({y:this.bar.y + 440},1000);

		
	}

	private btnTouchEndHandler():void
	{
		egret.Tween.removeTweens(this.light1);
		this.light1.visible = false;

		// egret.Tween.removeTweens(this.maskBar);
		// egret.Tween.get(this.maskBar).to({y:this.bar.y + 440},1000).call(()=>{
		// 	this.isMove = false;
		// });

		egret.Tween.removeTweens(this.maskBar);
		if(this.maskBar.y < this.bar.y + 150)
		{
			//成功
			egret.Tween.get(this.chuizi).to({alpha:1,rotation:30},400,egret.Ease.circOut).to({rotation:0},200,egret.Ease.backIn).call(()=>
			{
				this.showOpenYezi();
			});
		}else
		{
			//失败
			egret.Tween.get(this.maskBar).to({y:this.bar.y + 440},500);
		}
	}

	private helpTouchHandler():void
	{
		PopManager.showPop("HelpPop");
	}

	private openYezi():void
	{
		this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.btnTouchHandler,this);
		this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_END,this.btnTouchEndHandler,this);
		this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.btnTouchEndHandler,this);
		this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.btnTouchEndHandler,this);

		var chuizi = Global.createBitmapByName("game3_chuizi_png");
		chuizi.x = 560;
		chuizi.y = 585;
		chuizi.anchorOffsetX = chuizi.width - 10;
		chuizi.anchorOffsetY = chuizi.height - 10;
		this.addChild(chuizi);
		// chuizi.alpha = 0;

		egret.Tween.get(chuizi).to({alpha:1,rotation:30},400,egret.Ease.circOut).to({rotation:0},200,egret.Ease.backIn).call(()=>{
			this.showOpenYezi();
		});
	}

	private showOpenYezi():void
	{
		egret.Tween.removeTweens(this.yezi);
		var tx = this.yezi.x;
		var ty = this.yezi.y;
		egret.Tween.get(this.yezi).to({x:tx+5},100)
		.to({x:tx},100)
		.to({y:ty+5},100)
		.to({y:ty},100);

		this.light.visible = true;

		var liefeng = Global.createBitmapByName("game3_liefeng_png");
		liefeng.x = 195;
		liefeng.y = 290;
		this.addChild(liefeng);
		liefeng.alpha = 0;

		var light = Global.createBitmapByName("game3_light1_png");
		light.x = 20;
		light.y = 235;
		this.addChild(light);

		egret.Tween.get(liefeng).wait(0).to({alpha:1},100).wait(500).call(()=>{
			this.play();
		});
	}
}