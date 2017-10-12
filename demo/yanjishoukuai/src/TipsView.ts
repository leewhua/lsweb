class TipsView extends PopUp
{
    public constructor() {
        super();
        this.show(false);
    }
    
    public show(hasDelay)
	{ 
		super.show(hasDelay);

		this.view.y = -50;
		var bg = Global.createBitmapByName('pop_bg_png');
		StageUtils.centerInParent(bg);
		this.view.addChild(bg);


		var reward = new CustomImage("resource/assets/reward/tips_1.png",true,()=>{
			reward.x = StageUtils.SW - reward.width >> 1;
			reward.y = StageUtils.SH - reward.height >> 1;
		});
		this.view.addChild(reward);
    }
}