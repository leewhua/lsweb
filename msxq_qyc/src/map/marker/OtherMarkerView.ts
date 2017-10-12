class OtherMarkerView extends SelfMarkerView 
{
	public constructor() 
	{
		super();
	}

	protected touchClickHandler(e:egret.TouchEvent):void
	{
		if(this.showMenu)
		{
			MenuView.instance.showMenu(this);
		}else
		{
			MenuView.instance.showMenu(this,MenuView.OTHER_MENU);
		}
		this.showMenu = !this.showMenu;
	}
}