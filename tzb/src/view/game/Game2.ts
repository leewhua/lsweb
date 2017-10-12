class Game2 extends GameBaseView
{
	private btn:egret.Bitmap;
	private tips:egret.Bitmap;

	private timeContainer:egret.DisplayObjectContainer;

	private num1:egret.Bitmap;

	private num2:egret.Bitmap;

	private timer:egret.Timer;

	private lasttime:number;

	private isover = false;

	public constructor()
	{
		super();

		var bg = Global.createBitmapByName("game_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = StageUtils.SH - bg.height >> 1;
		this.addChild(bg);

		var title = Global.createBitmapByName("game2_title_png");
		title.x = (StageUtils.SW - title.width >> 1) + 10;
		title.y = - title.height;
		this.addChild(title);
		egret.Tween.get(title).to({y:20},800,egret.Ease.backOut);

		var face = Global.createBitmapByName("game_face_png");
		face.x = StageUtils.SW - face.width >> 1;
		//face.y = (StageUtils.SH - face.height >> 1);
		face.y = (StageUtils.SH - face.height >> 1) + face.height;
		face.anchorOffsetY = face.height;
		this.addChild(face);
		var fy = face.y;
		egret.Tween.get(face,{loop:true}).to({y:fy + 0,scaleY:0.9},100).to({y:fy,scaleY:1},100);

		var btn = Global.createBitmapByName("game2_btn_up_png");
		btn.x = StageUtils.SW - btn.width >> 1;
		btn.y = StageUtils.SH - btn.height - 100;
		this.addChild(btn);
		this.btn = btn;

		Global.setBut(btn);
		btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.btnTouchHandler,this);
		btn.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.btnTouchEndHandler,this);
		btn.addEventListener(egret.TouchEvent.TOUCH_END,this.btnTouchEndHandler,this);
		btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.btnTouchEndHandler,this);

		
		var tips = Global.createBitmapByName("game2_tips_png");
		tips.x = StageUtils.SW - tips.width >> 1;
		tips.y = StageUtils.SH - tips.height - 40;
		this.addChild(tips);
		this.tips = tips;
			
		var btnHelp = Global.createBitmapByName("btn_htlp_png");
		btnHelp.x = 25;
		btnHelp.y = 270;
		this.addChild(btnHelp);
		Global.setBut(btnHelp);
		btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.helpTouchHandler,this);
		
		this.initDanmuList();

		this.timeContainer = new egret.DisplayObjectContainer();
		this.addChild(this.timeContainer);

		this.timer = new egret.Timer(1000,10);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteHandler,this);

		this.lasttime = 0;
	}

	private btnTouchHandler():void
	{
		this.btn.texture = RES.getRes("game2_btn_down_png");
		this.btn.x += 11;
		this.btn.y += 14;

		this.tips.visible = false;
		this.showTime();

		this.timer.start();
		this.lasttime = 0;

		this.isover = false;
		//开始录音
		var weixin = eval("wx");
		weixin.startRecord();
	}

	private btnTouchEndHandler():void
	{
		this.btn.texture = RES.getRes("game2_btn_up_png");
		this.btn.x = StageUtils.SW - this.btn.width >> 1;
		this.btn.y = StageUtils.SH - this.btn.height - 100;
		this.tips.visible = false;

		this.timeContainer.removeChildren();
		this.timer.reset();

		if(!this.isover)
		{
			this.isover = true;
			this.stopRecord();
		}
	}

	private helpTouchHandler():void
	{
		PopManager.showPop("HelpPop");
	}
	
	private showTime():void
	{
		this.timeContainer.removeChildren();

		var bg = Global.createBitmapByName("time_bg_png");
		bg.x = 199;
		bg.y = 929;
		this.timeContainer.addChild(bg);

		this.num1 = Global.createBitmapByName("time_0_png");
		this.num1.x = 370 - this.num1.width;
		this.num1.y = 960;
		this.timeContainer.addChild(this.num1);

		this.num2 = Global.createBitmapByName("time_0_png");
		this.num2.x = 391 - this.num2.width;
		this.num2.y = 960;
		this.timeContainer.addChild(this.num2);
	}

	private timerHandler():void
	{
		this.lasttime ++;

		var shi = Math.floor(this.lasttime / 10);
		var ge = this.lasttime % 10
		
		this.num1.texture = RES.getRes("time_"+shi+"_png");
		this.num1.x = 370 - this.num1.width;

		this.num2.texture = RES.getRes("time_"+ge+"_png");
		this.num2.x = 391 - this.num2.width;
	}

	private timerCompleteHandler():void
	{
		if(!this.isover)
		{
			this.isover = true;
			//
			this.stopRecord();
		}
	}

	private translateResult(str):void
	{
		if(str)
		{
			this.play();
		}else
		{
			var bg = Global.createBitmapByName("game2_tips_2_png");
			bg.x = StageUtils.CW;
			bg.y = StageUtils.CH;
			this.addChild(bg);
			bg.anchorOffsetX = bg.width >> 1;
			bg.anchorOffsetY = bg.height >> 1;
			bg.scaleX = bg.scaleY = 0;
			bg.alpha = 0;
			egret.Tween.get(bg).to({alpha:1,scaleX:1,scaleY:1},500,egret.Ease.backOut).wait(2000).call(()=>{
				this.removeChild(bg);
			});
		}
	}

	private stopRecord():void
	{
		var self = this;
		var weixin = eval("wx");
		weixin.stopRecord(
		{
			success: function (res) 
			{
				var localId = res.localId;
				weixin.translateVoice(
				{
					localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) 
					{
						self.translateResult(res.translateResult);
					}
				});
			}
		});
	}
}