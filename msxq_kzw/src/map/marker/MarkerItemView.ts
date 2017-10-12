class MarkerItemView extends egret.DisplayObjectContainer 
{
	protected txtName:egret.TextField;

	protected monster:egret.MovieClip;

	public data:any;

	protected showMenu:boolean = false;

	public constructor()
	{
		super();

		this.initView();

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchClickHandler,this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addStageHandler,this);
	}

	private addStageHandler():void
	{
		this.alpha = 0;
		this.scaleY = this.scaleX = 0;
		egret.Tween.get(this).to({alpha:1,scaleX:1,scaleY:1},1000);
	}

	protected touchClickHandler(e:egret.TouchEvent):void
	{
		if(this.data)
		{
			if(this.data.type > 1)
			{
				PopManager.showPop("ThreePop",this.data.type);
			}
		}
	}

	private initView():void
	{
		this.txtName = new egret.TextField();
		this.txtName.background = true;
		this.txtName.fontFamily = "宋体";
		this.txtName.size = 23;
		this.txtName.y = - 60;
		this.addChild(this.txtName);
	}

	public setData(data):void
	{
		this.data = data;
		if(data)
		{
			this.txtName.text = data.name + "";
			this.txtName.x = - this.txtName.textWidth / 2;
			this.txtName.backgroundColor = this.getTextColor();

			this.monster = Global.createMc("monster_json","monster_png","m"+1);
			this.addChild(this.monster);
			this.monster.anchorOffsetX = this.monster.width / 2;
			this.monster.anchorOffsetY = this.monster.height / 2;

			this.refreshPos();
		}
	}

	protected getTextColor():number
	{
		if(this.data)
		{
			console.log(this.data.type);
			if(this.data.type == 1)
			{
				return 0xB2DFEE;
			}else if(this.data.type == 2)
			{
				return 0xFFD700;
			}else if(this.data.type == 3)
			{
				return 0xFFFF00;
			}else if(this.data.type == 4)
			{
				return 0xEEB4B4;
			}
		}
		return 0xB22222;
	}

	public refreshPos():void
	{
		if(this.data && MapManager.instance.Gmap)
		{
			var p = eval("MapManager.instance.Gmap.pointToPixel(new BMap.Point("+this.data.lng+","+this.data.lat+"))");
			// var sw = StageUtils.stage.stageWidth;
			// var sh = StageUtils.stage.stageHeight;

			// var lw = window.innerWidth;
			// var lh = window.innerHeight;

			// console.log(sw,lw,sh,lh);

			this.x = p.x * (StageUtils.SW / StageUtils.LW);
			this.y = p.y * (StageUtils.SH / StageUtils.LH);
			console.log(p.x,p.y,this.x,this.y);
			if(this.monster)
			{
				this.monster.play(-1);
			}
		}
	}
}