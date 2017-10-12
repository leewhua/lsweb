enum ViewName
{
	None,
	Loading,
	Logo,
	Main,
	Ball,
	Content
}
class GameScene extends egret.DisplayObjectContainer 
{
	/**
     * 加载进度界面
     * Process interface loading
     */
	private loadingView:LoadingView;

	private logoView:LogoView;

	private mainView:MainView;

	private ballView:BallView;

	private contentView:ContentView;

	private container:egret.DisplayObjectContainer;

	private curPage:ViewName;

	private sky:egret.Bitmap;

	private skyX:number;
	private skyY:number;

	private gamma:number;
	private beta:number;

	public static instance:GameScene;

	

	public constructor() {
		super();

		GameScene.instance = this;
		
		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		// this.touchEnabled = true;
		// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
		// this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
		// this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);

		//创建 DeviceOrientation 类
        var orientation = new egret.DeviceOrientation();
        //添加事件监听器
        orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        //开始监听设备方向变化
        orientation.start();

		this.gamma = 0;
		this.beta = 0;
    }
    private onOrientation(e:egret.OrientationEvent)
	{
		console.log(e.alpha,e.beta,e.gamma);
		if(this.sky)
		{
			egret.Tween.removeTweens(this.sky);
			egret.Tween.get(this.sky).to({x:this.skyX + e.gamma,y:this.skyY + e.beta},100);
			// this.sky.x = this.skyX + e.gamma;
			// this.sky.y = this.skyY + e.beta;

			this.gamma = e.gamma;
			this.beta = e.beta;
		}
    }

	private beginY:number;

	private beginTime:number;
	private touchBegin(evt:egret.TouchEvent):void
	{
		this.beginY = evt.stageY;
		this.beginTime = egret.getTimer();
		this.beginStageY = 0;
		console.log("touchBegin:"+this.beginY);
	}

	private beginStageY:number;
	private touchMove(evt:egret.TouchEvent):void
	{
		if(this.beginStageY)
		{
			var tempY = evt.stageY;
			var temp = tempY - this.beginStageY;
			this.container.y += temp;
		}
		this.beginStageY = evt.stageY;
	}

	private touchEnd(evt:egret.TouchEvent):void
	{
		var tempY:number = evt.stageY;
		var tempTime:number = egret.getTimer();
		var speed = (tempY - this.beginY) / (tempTime - this.beginTime)
		console.log("touchEnd:"+speed,tempY,this.beginY,tempTime,this.beginTime,this.curPage);

		if(Math.abs(speed) < 0.3)
		{
			this.moveEnd();
		}else
		{
			//触发滚动事件
			switch(this.curPage)
			{
				case ViewName.Loading:
					if(speed > 0)
					{
						this.moveEnd();
					}else
					{
						this.container.y = 0;
						this.startGame(null);
					}
					break;
				case ViewName.Logo:
					this.moveEnd();
					break;
				case ViewName.Main:
					if(speed > 0)
					{
						this.container.y = 0;
						this.hideMain();
						this.showLoading();
						this.loadingView.setComplete();
					}else
					{
						this.moveEnd();
					}
					break;
				case ViewName.Ball:
					if(speed > 0)
					{
						this.container.y = 0;
						this.hideBall();
						this.showMain();
					}else
					{
						this.container.y = 0;
						this.showContent(this.ballView.index);
						
					}
					break;
				case ViewName.Content:
					if(speed > 0)
					{
						if(this.contentView.select == 0)
						{
							this.container.y = 0;
							this.showBall(this.contentView.index);
							this.hideContent();
						}else
						{
							this.moveEnd();
							this.contentView.movePage(0);
						}
					}else
					{
						if(this.contentView.select == 0)
						{
							// this.container.y = 0;
							// this.showBall(this.contentView.index);
							// this.hideContent();
							
							if(this.contentView.index == 4)
							{
								this.moveEnd();
								this.contentView.movePage(0);
							}else
							{
								this.moveEnd(-1059);
								this.contentView.movePage(1);
							}
						}else
						{
							this.moveEnd(-1059);
						}
						// this.container.y = 0;
						// this.showContent(this.ballView.index);
						
					}
					break;
			}
		}
	}

	private moveEnd(tempY:number = 0):void
	{
		egret.Tween.get(this.container).to({y:tempY},500,egret.Ease.circOut);
	}

	private intoContent(evt:egret.Event):void
	{
		var index:number = evt.data;

		
		this.showContent(index);
	}

	private ballClick(evt:egret.Event):void
	{
		this.hideMain();
		var index:number = evt.data;
		this.showBall(index);
		GameDispatcher.instance.addEventListener(EventName.Into_Content,this.intoContent,this);
	}

	private startGame(evt:egret.Event):void
	{
		this.hideLoading();
		this.showLogo();
	}

	private logoEnd(evt:egret.Event):void
	{
		console.log("logoEnd");
		this.hideLogo();
		this.showMain();
	}

	public showContent(index:number):void
	{
		// if(this.ballView)
		// {
		// 	egret.Tween.get(this.ballView).to({y:-StageUtils.stage.stageHeight},500,egret.Ease.circOut).call(this.hideBall,this);
		// }
		if(this.ballView)
		{
			this.hideBall();
		}

		this.contentView = new ContentView();
		// this.contentView.y = StageUtils.stage.stageHeight;
		this.container.addChild(this.contentView);
		this.contentView.setData(index);

		// egret.Tween.get(this.contentView).to({y:0},400,egret.Ease.circOut);
		this.curPage = ViewName.Content;
	}

	public hideContent():void
	{
		this.container.removeChild(this.contentView);
		this.contentView = null;
	}

	public showBall(index:number):void
	{
		console.log("ball");
		this.curPage = ViewName.Ball;
		this.ballView = new BallView();
		this.container.addChild(this.ballView);
		this.ballView.initView(index);
	}

	public hideBall():void
	{
		this.container.removeChild(this.ballView);
		this.ballView = null;
	}

	public showMain():void
	{
		console.log("main");
		this.curPage = ViewName.Main;
		this.mainView = new MainView();
		this.container.addChild(this.mainView);
		GameDispatcher.instance.addEventListener(EventName.Ball_Click,this.ballClick,this);
	}

	public hideMain():void
	{
		this.container.removeChild(this.mainView);
		this.mainView = null;
	}

	public showLogo():void
	{
		GameDispatcher.instance.addEventListener(EventName.Logo_End,this.logoEnd,this);
		this.logoView = new LogoView();
		this.container.addChild(this.logoView);
		this.curPage = ViewName.Logo;
	}

	public hideLogo():void
	{
		this.container.removeChild(this.logoView);
		this.logoView = null;
		GameDispatcher.instance.removeEventListener(EventName.Logo_End,this.logoEnd,this);
	}


	public showLoading():void
	{
		this.loadingView = new LoadingView();
		this.container.addChild(this.loadingView);
		GameDispatcher.instance.addEventListener(EventName.Start_Game,this.startGame,this);
		this.curPage = ViewName.Loading;
	}

	public hideLoading():void
	{
		this.container.removeChild(this.loadingView);
		this.loadingView = null;
		GameDispatcher.instance.removeEventListener(EventName.Start_Game,this.startGame,this);
	}

	public setProgress(current:number, total:number):void 
	{
		this.loadingView.setProgress(current,total);
    }

    public setComplete():void
    {
		this.loadingView.setComplete();
	}

	public showBG():void
	{
		this.sky = AssetsUtils.createBitmapByName("bg_jpg");
		this.addChildAt(this.sky,0);
		// this.sky.width = this.stage.stageWidth;
		// this.sky.height = this.stage.stageHeight;

		this.sky.x = this.stage.stageWidth - this.sky.width >> 1;
		this.sky.y = this.stage.stageHeight - this.sky.height >> 1;

		this.skyX = this.sky.x;
		this.skyY = this.sky.y;

		// var sx = window.innerWidth / this.stage.stageWidth;
        // var sy = window.innerHeight / this.stage.stageHeight;
	
		// sky.scaleX = 2;

		// sky.scaleX = sx / sy; 
		// sky.scaleY = sx / sy;

		// var sx = this.stage.stageWidth / window.innerWidth;
        // var sy = this.stage.stageHeight / window.innerHeight;
		// sky.scaleX = sx;
		// sky.scaleY = sy;
		// sky.width = window.innerWidth;
		// sky.height = window.innerHeight;
		console.log(window.innerWidth,this.stage.stageWidth,window.innerHeight,this.stage.stageHeight); 
	}

	public refreshBg():void
	{
		var tempx = this.sky.x;
		var tempy = this.sky.y;
		this.sky.x = (this.stage.stageWidth - this.sky.width >> 1) + this.gamma;
		this.sky.y = (this.stage.stageHeight - this.sky.height >> 1) + this.beta;


		this.skyX = this.sky.x;
		this.skyY = this.sky.y;


		// alert("refresh:"+this.sky.x+"_"+this.sky.y+","+tempx+"_"+tempy+","+this.gamma+"_"+this.beta);
		// alert(this.stage.stageWidth+"_"+this.stage.stageHeight);
	}
}