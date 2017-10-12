/**
 *
 * @author 
 *
 */
class Scanned extends egret.Sprite {

    public constructor() {
        super();
        this.init();
    }

    private init():void 
    {
        this.touchEnabled = true;
        var ran = Math.floor(Math.random() * 4);

        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000,0.8);
        bg.graphics.drawRect(0,0,StageUtils.stage.stageWidth,StageUtils.stage.stageHeight);

        var bar = new Middle(Global.createBitmapByName('back_png'));
        var toJifen = new Middle(Global.createBitmapByName('button_store_png'));
        var toaj = new Middle(Global.createBitmapByName('button_dzp_png'));

        bar.x = 320;
        bar.y = 480;
        toJifen.x = 320;
        toJifen.y = 620;
        toaj.x = 320;
        toaj.y = 720;
        this.addChild(bg);
        this.addChild(bar);

        this.addChild(toJifen);
        this.addChild(toaj);
        toaj.alpha=bar.alpha = toJifen.alpha = 0;


        Global.setBut(toJifen);
        Global.setBut(toaj);
        Global.zoomIn(bar,0,400,0.6);

        Global.zoomIn(toJifen,200,400,0.6);
        Global.zoomIn(toaj,300,400,0.6);

        toaj.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            if(Main.award.type == "cash") 
			{
                    window.location.href = "rotating.html?ticket=" + Main.user_ticket +"&aj=hb";
            }else
			{
                    window.location.href = "rotating.html?ticket=" + Main.user_ticket + "&aj=jf";
            }
        },this);
        
        toJifen.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event) {
            window.location.href = "http://0k6.cn/a/gotoplaycity";
        },this);
    }
}
