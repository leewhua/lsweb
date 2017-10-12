class DanmuListView extends egret.DisplayObjectContainer
{
	private list;
	private index;
	public constructor()
	{
		super();
	}

	private showList;

	public setData(list):void
	{
		this.list = list;
		if(!list)
		{
			return;
		}
		this.showList = [];
		this.index = 0;
		this.showLine(Main.type == 2 ? 530:580);
		setTimeout(()=> 
		{
			this.showLine(Main.type == 2 ? 390 : 720);
		}, 2500);
		this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
	}

	private enterFrameHandler():void
	{
		var len = this.showList.length;
		for(var i = 0;i<len;i++)
		{
			var item = this.showList[i];
			if(item)
			{
				item.x -= 2;
				if(item.x < -item.w)
				{
					this.removeChild(item);
					item = null;
					this.showList.splice(i,1);
					i--;
					len--;
				}else if(item.x < StageUtils.SW - item.w - 200)
				{
					if(!item.isAdd)
					{
						item.isAdd = true;
						this.showLine(item.y);
					}
				}
			}
		}
	}

	private showLine(ty):void
	{
		if(this.index >= this.list.length)
		{
			this.index = 0;
		}
		var obj = this.list[this.index];
		if(obj)
		{
			var item = new DanmuItemView();
			item.setData(obj);
			item.x = StageUtils.SW;
			item.y = ty;
			this.addChild(item);
			// egret.Tween.get(item).to({x:StageUtils.SW - item.w - 50},5000);
			this.showList.push(item);
		}
		this.index ++;
	}

	public addSelf(obj):void
	{
		this.list.splice(this.index,0,obj);
		// var item = new DanmuItemView();
		// item.setData(obj);
		// item.x = StageUtils.SW;
		// item.y = ty;
		// this.addChild(item);
		// // egret.Tween.get(item).to({x:StageUtils.SW - item.w - 50},5000);
		// this.showList.push(item);
	}
}