class LoadingUI extends egret.Sprite 
{
    private btnReturn:egret.Bitmap;

    private txtLasttime:egret.TextField;

    private txtLasttime1:egret.TextField;

    private rectMask:egret.Rectangle;

    private timer:egret.Timer;

    private isload;

    public constructor() 
    {
        super();
        this.createView();
    }

    private createView():void 
    {
        this.isload = window.sessionStorage.getItem("loading_load");
        // this.isload = 0;
        if(this.isload == "1")
        {
            this.lastOk = true;
        }else
        {
            var bg = new CustomImage("resource/assets/loading/loading_bg.jpg",true,function(){
                bg.width = StageUtils.SW;
                bg.height = StageUtils.SH;
            });
            this.addChild(bg);

            var btn = new CustomImage("resource/assets/loading/loading_btn.png",false,function(){
                btn.x = StageUtils.SW - btn.width - 30;
                btn.y = 30;
            });
            this.addChild(btn);
            this.btnReturn = btn;

            this.txtLasttime1 = new egret.TextField();
            this.addChild(this.txtLasttime1);
            this.txtLasttime1.textColor = 0x666666;
            this.txtLasttime1.size = 22;
            this.txtLasttime1.x = StageUtils.SW - 100 - 30;
            this.txtLasttime1.y = 37;
            this.txtLasttime1.width = 100;
            this.txtLasttime1.textAlign = "center";
            this.txtLasttime1.text = "跳过 3S";

            this.txtLasttime = new egret.TextField();
            this.addChild(this.txtLasttime);
            this.txtLasttime.size = 22;
            this.txtLasttime.x = StageUtils.SW - 100 - 30;
            this.txtLasttime.y = 37;
            this.txtLasttime.width = 100;
            this.txtLasttime.textAlign = "center";
            this.txtLasttime.text = "跳过 3S";

            this.rectMask = new egret.Rectangle(0,0,100,50);
            this.rectMask.x = -100;

            this.txtLasttime.mask = this.rectMask;

            this.timer = new egret.Timer(1000,3);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
            this.timer.start();
        }
    }

    private index = 3;
    private timerHandler():void
    {
        this.index --;
        if(this.index > 0)
        {
            this.txtLasttime.text = "跳过 "+this.index+"S";
            this.txtLasttime.mask = this.rectMask;

            this.txtLasttime1.text = "跳过 "+this.index+"S";
        }else
        {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
            this.timer = null;

            this.txtLasttime.text = "跳  过";
            this.txtLasttime.mask = this.rectMask;

            this.txtLasttime1.text = "跳  过";

            this.lastOk = true;
            this.checkInto();
        }
    }

    private loadOk = false;
    private lastOk = false;
    private checkInto():void
    {
        if(this.loadOk && this.lastOk)
        {
            if(this.btnReturn)
            {
                Global.setBut(this.btnReturn);
                this.btnReturn.touchEnabled = true;
                this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnClickHandler,this);
            }
            this.returnClickHandler();
        }
    }

    private returnClickHandler():void
    {
        UIManager.instance.mainUILayer.removeChild(this);
        UIManager.instance.initMainView();
    }

    public setProgress(current:number, total:number):void
    {
        if(this.isload != "1")
        {
            var num = Math.floor(current / total * 100);
            // this.txtLasttime.text = `加载...${current}/${total}`;
            // this.txtLasttime.text = "加载 "+num+"%"

            var w = StageUtils.SW - 102 - 30;
            this.rectMask.x = -100 + num;
            this.txtLasttime.mask = this.rectMask;
        }
    }

    public loadComp():void
    {
        window.sessionStorage.setItem("loading_load","1");
        if(this.txtLasttime)
        {
            this.txtLasttime.mask = null;
        }
        this.rectMask = null;

        this.loadOk = true;
        this.checkInto();
    }
}
