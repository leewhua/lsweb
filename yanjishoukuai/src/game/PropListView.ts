class PropListView extends egret.DisplayObjectContainer
{
	private container:egret.DisplayObjectContainer;

	private listArr:Array<PropItemView>;

	public select:PropItemView;

	public constructor() 
	{
		super();
		this.init();
	}

	private init():void
	{
		this.initList();
	}

	private initList():void
	{
		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		this.listArr = [];
		for(var i = 0;i<6;i++)
		{
			for(var j = 0;j<3;j++)
			{
				var prop = new PropItemView(Math.ceil(Math.random() * 8));
				// prop.scaleX = prop.scaleY = 0.5;
				this.container.addChild(prop);
				prop.x = i * 110 + 45;
				prop.y = j * 160 + 330;
				this.listArr.push(prop);
			}
		}
	}

	public move(bl):void
	{
		if(bl)
		{
			this.randomGlow();
			this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
		}else
		{
			this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
			this.removeSelect();
		}
	}

	private enterFrameHandler():void
	{
		var hasGlow:boolean;
		var num = 0;
		var arr = [];
		var len = this.listArr.length;
		for(var i = 0;i<len;i++)
		{
			var prop = this.listArr[i];
			if(prop)
			{
				if(prop.canMove)
				{
					prop.x -= 2;
				}
				if(prop.x < 50 && prop.canSelect)
				{
					arr.push(prop.y);
					num++;
					prop.canSelect = false;

					if(prop.isGlow)
					{
						prop.setGlow(false);
						hasGlow = true;
					}
				}
				if(prop.x < -50)
				{
					this.container.removeChild(prop);
					this.listArr.splice(i,1);
					i--;
					len--;
				}
			}
		}
		if(num > 0)
		{
			this.addProp(num,arr,hasGlow);
		}
	}

	public removeSelect():void
	{
		if(this.select)
		{
			var index = this.listArr.indexOf(this.select);
			if(index != -1)
			{
				this.listArr.splice(index,1);
			}
			this.container.removeChild(this.select);
			this.select = null;
			
		}
	}

	public randomGlow():void
	{
		var len = this.listArr.length;
		var arr = [];
		for(var i = 0;i<len;i++)
		{
			var prop = this.listArr[i];
			if(prop && prop.canSelect)
			{
				arr.push(prop);
			}
		}
		var index = Math.floor(Math.random() * arr.length);
		var prop:PropItemView = arr[index];
		console.log("index:"+index);
		if(prop)
		{
			prop.setGlow(true);
			this.select = prop;
		}
	}

	private addProp(num,arr,hasGlow):void
	{
		for(var i = 0;i<num;i++)
		{
			var prop = new PropItemView(Math.ceil(Math.random() * 8));
				// prop.scaleX = prop.scaleY = 0.5;
				this.container.addChild(prop);
				prop.x = 6 * 110 + 45;
				prop.y = arr[i];
				this.listArr.push(prop);
		}
		if(hasGlow)
		{
			this.randomGlow();
		}
	}
}