class LastTimeView extends egret.DisplayObjectContainer
{
	public constructor() 
	{
		super();
	}

	private go()
	{
		GameDispatcher.instance.dispatchEvent(new EventObj("custom","timer_go"));
	}

	public play()
	{
        var self=this;
        var s1 = new Middle(Global.createBitmapByName('time1_png'));
        var s2 = new Middle(Global.createBitmapByName('time2_png'));
        var s3 = new Middle(Global.createBitmapByName('time3_png'));
        var go = new Middle(Global.createBitmapByName('timego_png'));

        this.addChild(s3);
        
        
        SoundManager.getInstance().play("1_mp3",0.2);

        var tw = egret.Tween.get(s3);
        tw.wait(500);
        tw.to({ scaleX: 2,scaleY: 2,alpha: 0 },500);
        tw.call(function() {
            self.removeChild(s3);
            var tw = egret.Tween.get(s2);
            tw.wait(500);
            self.addChild(s2);
            SoundManager.getInstance().play("1_mp3",0.2);
            tw.to({ scaleX: 2,scaleY: 2,alpha: 0 },500);
            tw.call(function() {
                self.removeChild(s2);
                var tw = egret.Tween.get(s1);
                tw.wait(500);
                self.addChild(s1);
                SoundManager.getInstance().play("1_mp3",0.2);
                tw.to({ scaleX: 2,scaleY: 2,alpha: 0 },500);
                tw.call(function() {
                    self.removeChild(s1);
                    var tw = egret.Tween.get(go);
                    tw.wait(500);
                    self.addChild(go);
                    SoundManager.getInstance().play("go_mp3",0.5);
                    tw.to({ scaleX: 2,scaleY: 2,alpha: 0 },500);
                    tw.call(function() {
                        self.removeChild(go);
                        self.go();
                    });
                });
            });
        });
    }
}