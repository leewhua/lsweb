class HelpPop extends PopUp {

    public constructor() {
        super();

		this.show(false);
    }

    public show(hasDelay) {
        super.show(hasDelay);
		this.view.y = -50;
        var bg = Global.createBitmapByName('pop_bg_png');
		StageUtils.centerInParent(bg);
		this.view.addChild(bg);

        var title = Global.createBitmapByName('help_bg_png');
		StageUtils.centerInParent(title,0,50);
		this.view.addChild(title);

        var toPlay = Global.createBitmapByName('ok_png');
		StageUtils.centerInParent(toPlay,0,480);
		this.view.addChild(toPlay);
       
		Global.setBut(toPlay);
        // this.view.addChild(bg);
        // this.view.addChild(title);
        // this.view.addChild(toPlay);
       
        toPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            Main.removePop("HelpPop");
        },this);
    }
}