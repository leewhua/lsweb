class ItemBox extends egret.DisplayObjectContainer
{
	public type;
	public dir;
	public list;

	public px;
	public py;

	public icon:egret.Bitmap;

	public constructor()
	{
		super();
	}

	public init(type,dir = 1):void
	{
		this.type = type;
		this.dir = dir;

		this.icon = Global.createBitmapByName("box_"+this.type + "_png");
		this.addChild(this.icon);

		this.setRotate(this.dir);
	}

	public changeDir():void
	{
		this.dir ++;
		if(this.dir > 4)
		{
			this.dir = 1;
		}
		this.setRotate(this.dir);
	}

	public preDir():any
	{
		var dir = this.dir;
		dir ++;
		if(dir > 4)
		{
			dir = 1;
		}
		return this.preRotate(dir);
	}

	public refreshPos(x,y):void
	{
		this.px = x;
		this.py = y;

		this.x = TetrisGame.size * this.px;
		this.y = TetrisGame.size * this.py;
	}

	public preRotate(dir):any
	{
		var type = this.type;
		if(type == 1)
		{
			//方块
			return [
				[0,0,0,0],
				[0,0,0,0],
				[0,1,1,0],
				[0,1,1,0]
			];
		}else if(type == 2)
		{
			//竖条
			if(dir == 1 || dir == 3)
			{
				return [
					[1,0,0,0],
					[1,0,0,0],
					[1,0,0,0],
					[1,0,0,0]
				];
			}else
			{
				return [
					[1,1,1,1],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
				];
			}
		}else if(type == 3)
		{
			//反L
			if(dir == 1)
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[1,0,0,0],
					[1,1,1,0]
				];
			}else if(dir == 2)
			{
				return [
					[0,0,0,0],
					[0,1,0,0],
					[0,1,0,0],
					[1,1,0,0]
				];
			}else if(dir == 3)
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[1,1,1,0],
					[0,0,1,0]
				];
			}else
			{
				return [
					[0,0,0,0],
					[1,1,0,0],
					[1,0,0,0],
					[1,0,0,0]
				];
			}
			
		}else if(type == 4)
		{
			//丁字
			if(dir == 1)
			{
				return [
					[0,0,0,0],
					[0,1,0,0],
					[1,1,0,0],
					[0,1,0,0]
				];
			}else if(dir == 2)
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[1,1,1,0],
					[0,1,0,0]
				];
			}else if(dir == 3)
			{
				return [
					[0,0,0,0],
					[0,1,0,0],
					[0,1,1,0],
					[0,1,0,0]
				];
			}else
			{
				return [
					[0,0,0,0],
					[0,1,0,0],
					[1,1,1,0],
					[0,0,0,0]
				];
			}
		}else if(type == 5)
		{
			//反Z
			if(dir == 1 || dir == 3)
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[0,1,1,0],
					[1,1,0,0]
				];
			}else
			{
				return [
					[0,0,0,0],
					[1,0,0,0],
					[1,1,0,0],
					[0,1,0,0]
				];
			}
		}else if(type == 6)
		{
			//正Z
			if(dir == 1 || dir == 3)
			{
				return [
					[0,0,0,0],
					[0,1,0,0],
					[1,1,0,0],
					[1,0,0,0]
				];
			}else
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[1,1,0,0],
					[0,1,1,0]
				];
			}
		}else if(type == 7)
		{
			//正L
			if(dir == 1)
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[0,0,1,0],
					[1,1,1,0]
				];
			}else if(dir == 2)
			{
				return [
					[0,0,0,0],
					[1,1,0,0],
					[0,1,0,0],
					[0,1,0,0]
				];
			}else if(dir == 3)
			{
				return [
					[0,0,0,0],
					[0,0,0,0],
					[1,1,1,0],
					[1,0,0,0]
				];
			}else
			{
				return [
					[0,0,0,0],
					[1,0,0,0],
					[1,0,0,0],
					[1,1,0,0]
				];
			}
		}
	}

	public setRotate(dir):void
	{
		var type = this.type;
		if(type == 1)
		{
			//方块
			this.list = [
				[0,0,0,0],
				[0,0,0,0],
				[0,1,2,0],
				[0,3,4,0]
			];
			this.icon.x = TetrisGame.size;
			this.icon.y = TetrisGame.size * 2;
			this.icon.rotation = 0;
		}else if(type == 2)
		{
			//竖条
			if(dir == 1 || dir == 3)
			{
				this.list = [
					[1,0,0,0],
					[2,0,0,0],
					[3,0,0,0],
					[4,0,0,0]
				];
				this.icon.x = 0;
				this.icon.y = 0;
				this.icon.rotation = 0;
			}else
			{
				this.list = [
					[1,2,3,4],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size;
				this.icon.rotation = -90;
			}
		}else if(type == 3)
		{
			//反L
			if(dir == 1)
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[1,0,0,0],
					[2,3,4,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 2;
				this.icon.rotation = 0;
			}else if(dir == 2)
			{
				this.list = [
					[0,0,0,0],
					[0,4,0,0],
					[0,3,0,0],
					[1,2,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -90;
			}else if(dir == 3)
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[4,3,2,0],
					[0,0,1,0]
				];
				this.icon.x = TetrisGame.size * 3;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -180;
			}else
			{
				this.list = [
					[0,0,0,0],
					[2,1,0,0],
					[3,0,0,0],
					[4,0,0,0]
				];
				this.icon.x = TetrisGame.size * 2;
				this.icon.y = TetrisGame.size;
				this.icon.rotation = -270;
			}
			
		}else if(type == 4)
		{
			//丁字
			if(dir == 1)
			{
				this.list = [
					[0,0,0,0],
					[0,1,0,0],
					[2,3,0,0],
					[0,4,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size;
				this.icon.rotation = 0;
			}else if(dir == 2)
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[1,3,4,0],
					[0,2,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -90;
			}else if(dir == 3)
			{
				this.list = [
					[0,0,0,0],
					[0,4,0,0],
					[0,3,2,0],
					[0,1,0,0]
				];
				this.icon.x = TetrisGame.size * 3;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -180;
			}else
			{
				this.list = [
					[0,0,0,0],
					[0,2,0,0],
					[4,3,1,0],
					[0,0,0,0]
				];
				this.icon.x = TetrisGame.size * 3;
				this.icon.y = TetrisGame.size;
				this.icon.rotation = -270;
			}
		}else if(type == 5)
		{
			//反Z
			if(dir == 1 || dir == 3)
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[0,1,2,0],
					[3,4,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 2;
				this.icon.rotation = 0;
			}else
			{
				this.list = [
					[0,0,0,0],
					[2,0,0,0],
					[1,4,0,0],
					[0,3,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -90;
			}
		}else if(type == 6)
		{
			//正Z
			if(dir == 1 || dir == 3)
			{
				this.list = [
					[0,0,0,0],
					[0,1,0,0],
					[2,3,0,0],
					[4,0,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size;
				this.icon.rotation = 0;
			}else
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[4,2,0,0],
					[0,3,1,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -90;
			}
		}else if(type == 7)
		{
			//正L
			if(dir == 1)
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[0,0,1,0],
					[2,3,4,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 2;
				this.icon.rotation = 0;
			}else if(dir == 2)
			{
				this.list = [
					[0,0,0,0],
					[1,4,0,0],
					[0,3,0,0],
					[0,2,0,0]
				];
				this.icon.x = 0;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -90;
			}else if(dir == 3)
			{
				this.list = [
					[0,0,0,0],
					[0,0,0,0],
					[4,3,2,0],
					[1,0,0,0]
				];
				this.icon.x = TetrisGame.size * 3;
				this.icon.y = TetrisGame.size * 4;
				this.icon.rotation = -180;
			}else
			{
				this.list = [
					[0,0,0,0],
					[2,0,0,0],
					[3,0,0,0],
					[4,1,0,0]
				];
				this.icon.x = TetrisGame.size * 2;
				this.icon.y = TetrisGame.size;
				this.icon.rotation = -270;
			}
		}
	}

	public getButtomIndex()
	{
		var len = this.list.length;
		for(var i = len - 1;i>=0;i--)
		{
			var itemList = this.list[i];
			var itemLen = itemList.length;
			for(var j = 0;j<itemLen;j++)
			{
				if(itemList[j] == 1)
				{
					console.log(this.py + i);
					
					return this.py + i;
				}
			}
		}
		console.log(0);
		
		return 0;
	}
}