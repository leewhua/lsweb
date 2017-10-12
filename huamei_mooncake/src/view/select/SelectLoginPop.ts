class SelectLoginPop extends LoginPop
{
	public constructor()
	{
		super();
	}

	protected loginOK():void
	{
		PopManager.hidePop("SelectLoginPop");
		PopManager.showPop("SelectPop");
	}
}