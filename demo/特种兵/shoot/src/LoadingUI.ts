
class LoadingUI extends egret.Sprite {
    private loadingTxt;
    private slog;
    public constructor() {
        super();
        //this.loadCity();
        this.createView();

    }
    public hide() {
        var tw2 = egret.Tween.get(this.slog);
        tw2.to({ alpha: 0,scaleX: 0.8,scaleY: 0.8 },500,egret.Ease.backIn);
        var tw = egret.Tween.get(this);
        tw.wait(200);
        tw.to({ alpha: 0 },600);
    }
    private createView(): void {

        var mark;
        var bg = new egret.Shape();

        bg.graphics.beginFill(0x0,0.8);
        bg.graphics.drawRect(0,0,1200,640);

        this.loadingTxt = new egret.TextField();

        this.loadingTxt.textAlign = "center";
        this.loadingTxt.width = 1200;
        this.loadingTxt.text = "loading...";
        this.loadingTxt.y = 400;

        this.slog = new Middle(Global.createBitmapByName('title_png'));
      
        this.slog.x = 600;
        this.slog.y = 300;

        this.addChild(bg);
        this.addChild(this.slog);
        this.addChild(this.loadingTxt);

        var tw = egret.Tween.get(bg);
        bg.alpha = 0;
        tw.to({ alpha: 1 },400);

        var tw2 = egret.Tween.get(this.slog);
        this.slog.alpha = 0;
        this.slog.scaleX = this.slog.scaleY = 0.6;
        tw2.wait(200);
        tw2.to({ alpha: 1,scaleX: 1,scaleY: 1 },500,egret.Ease.backOut);

        var tw3 = egret.Tween.get(this.loadingTxt);
        this.loadingTxt.alpha = 0;
        tw3.wait(300);
        tw3.to({ alpha: 1 },500);



        this.addEventListener(egret.Event.ENTER_FRAME,this.loop,this);
    }
    private count = 0;
    private fps = 0;
    private loop(): void {
        this.fps++;
        if(this.fps % 5 == 0) {
            this.count++;
            //console.log(this.count + "::" + this.loaded);
            //if(Main.isTest)this.count=200;

            if(this.count > 3) {
                this.count = 0;
            }
            var str = ".";
            for(var i = 0;i < 3;i++) {
                if(i < this.count) {
                    str += ".";
                } else {
                    str += " ";
                }

            }
            this.loadingTxt.text = "loading" + str;
        }
        if(this.fps >= 100) this.fps = 0;
    }
}
