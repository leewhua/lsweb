
class LoadingUI1 extends egret.Sprite 
{
    private type;

    private isLoadComp:boolean;

    private isTimeComp:boolean;

    private timer:egret.Timer;

    public constructor() 
    {
        super();
		this.loadBg();
    }

    public setLoadComp()
    {
        // this.isLoadComp = true;
        // if(this.checkComp())
        // {
            Main.instance.showLogin();
        // }
    }

    public setTimeComp()
    {
        this.isTimeComp = true;
        if(this.checkComp())
        {
            Main.instance.showLogin();
        }
    }

    public checkComp()
    {
		return true;
        // return this.isLoadComp && this.isTimeComp;
    }

    private timerEndHandler()
    {
        this.sendMsg(6);
        this.setTimeComp();
    }

    private touchClickHandler()
    {
        this.timer.stop();
        this.isTimeComp = true;
        if(this.checkComp())
        {
            Main.instance.showLogin();
        }
    }

	private container:egret.DisplayObjectContainer;
	private mc;

	private txtPro:egret.TextField;
    private loadBg(): void 
    {
        this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);

		this.container = new egret.DisplayObjectContainer();
		this.addChild(this.container);

		var car = Global.createBitmapByName("car_png");
		car.x = -285;
		car.y = -40	;
		this.container.addChild(car);

		this.mc = Global.createMc("man_json","man_png","man");
		this.mc.x = -this.mc.width >> 1;
		this.mc.y = -this.mc.height >> 1;
		this.container.addChild(this.mc);

		this.mc.gotoAndPlay("play",-1);
		this.mc.frameRate = 24;


		this.container.scaleX = -0.7;
		this.container.scaleY = 0.7;

		this.container.y = StageUtils.CH;

		var bg = Global.createBitmapByName("loading_bar_bg_png");
		bg.x = StageUtils.SW - bg.width >> 1;
		bg.y = (StageUtils.SH - bg.height >> 1) + 150;
		this.addChild(bg);

		this.txtPro = new egret.TextField();
		this.txtPro.textColor = 0x21b1ff;
		this.txtPro.text = "0%";
		this.txtPro.textAlign = egret.HorizontalAlign.CENTER;
		this.txtPro.width = 200;
		this.txtPro.x = StageUtils.SW - this.txtPro.width >> 1;
		this.txtPro.y = bg.y + 50;
		this.addChild(this.txtPro);
    }


    private containueHandler():void
    {
        this.sendMsg(5);

        this.timer.stop();
        this.isTimeComp = true;
        if(this.checkComp())
        {
            Main.instance.showLogin();
        }
    }

    private sendMsg(index):void
    {
        console.log("sendMsg:"+index);
        $.ajax({
            url: "http://123.59.156.230/newpic",
            data: { loading:index},
            success: function(data) {
                console.log("sendMsg");
            },
            error:function(){
            },
            dataType: "json",async: true,type: "POST"
        });
    }

    private beginX:number;
	private beginY:number;

	private beginTime:number;

    private dir:number;


	private touchBegin(evt:egret.TouchEvent):void
	{
        this.beginX = evt.stageX;
		this.beginY = evt.stageY;
		this.beginTime = egret.getTimer();
		console.log("touchBegin:"+this.beginY);
	}

	private touchEnd(evt:egret.TouchEvent):void
	{
        var tempX:number = evt.stageX;
		var tempY:number = evt.stageY;
        var maxX:number = tempX - this.beginX;
        var maxY:number = tempY - this.beginY;

		var tempTime:number = egret.getTimer();

        var speed;
        if(Math.abs(maxX) > Math.abs(maxY))
        {
            speed = maxX / (tempTime - this.beginTime);
            if(speed > 0)
            {
                this.dir = 4;
            }else 
            {
                this.dir = 3;
            }
        }else
        {
            speed = maxY / (tempTime - this.beginTime);
            if(speed > 0)
            {
                this.dir = 2;
            }else 
            {
                this.dir = 1;
            }
        }
		console.log("touchEnd:"+speed,maxX,maxY,tempX,this.beginX);

		if(Math.abs(speed) < 0.3)
		{

		}else
		{
            this.sendMsg(this.dir);
            this.timer.stop();

            this.isTimeComp = true;
            if(this.checkComp())
            {
                Main.instance.showLogin();
            }
		}
	}


    private textrue:egret.Texture;

    private bitmap:egret.Bitmap;

    private onLoadComplete(event: egret.Event): void 
    {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        // //获取加载到的纹理对象
        var texture: egret.Texture = <egret.Texture>loader.data;
        // //创建 Bitmap 进行显示
        this.createView(new egret.Bitmap(texture));
    }

    private createView(bg): void 
    {
        var logo = Global.createBitmapByName(Main.product_type + "_json.logo-white");
        logo.x = 500;
        logo.y = 20;

        // bg.scaleX = bg.scaleY = this.sc;
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        bg.alpha = 0;

        var tw = egret.Tween.get(bg).to({ alpha: 1 }, 600);

        this.addChildAt(bg,0);
        this.addChild(logo);
    }

	private index = 0;
	public setProgress(current:number, total:number):void
    {
		var rate = current / total;
		var num = Math.floor(rate * StageUtils.SW);
		this.container.x = num;

		this.txtPro.text = Math.floor(rate * 100)+"%";
		// this.txtLasttime.text = `加载...${current}/${total}`;
		// this.txtLasttime.text = "加载 "+num+"%"

		var c = Math.floor(rate * 23);
		if(c > this.index)
		{
			var len = c - this.index;
			for(var i = 0;i<len;i++)
			{
				var box = Global.createBitmapByName("loading_bar_png");
				box.x = (StageUtils.SW - 22 * 23 >> 1) + 22 * this.index;
				box.y = this.txtPro.y - 50;
				this.addChild(box);
				this.index ++;
			}
		}
    }
}