class MenuView extends egret.DisplayObjectContainer 
{
	public static SELF_MENU = [{id:1,icon:1,x:-57,y:21},{id:2,icon:1,x:-25,y:58},{id:3,icon:1,x:25,y:58},{id:4,icon:1,x:57,y:21}];

	public static OTHER_MENU = [{id:1,icon:1,x:-25,y:58},{id:2,icon:1,x:25,y:58}];

	private static _instance:MenuView;

	public constructor() 
	{
		super();
	}

	public static get instance():MenuView
	{
		if(!MenuView._instance)
		{
			MenuView._instance = new MenuView();
		}
		return MenuView._instance;
	}

	public showMenu(target,arr = null):void
	{
		this.removeChildren();
		if(arr)
		{
			var len = arr.length;
			for(var i = 0;i<len;i++)
			{
				var item = new MenuItemView();
				item.setData(arr[i]);
				this.addChild(item);
				item.scaleX = item.scaleY = 0;

				egret.Tween.get(item).wait(i*100).to({scaleX:1,scaleY:1},300);
			}
			target.addChild(this);

			StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
		}else
		{
			StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
			if(this.parent)
			{
				this.parent.removeChild(this);
			}
		}
		
	}

	private touchHandler(e:egret.TouchEvent):void
	{
		this.showMenu(null);
	}
}