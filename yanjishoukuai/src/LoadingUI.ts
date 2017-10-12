
class LoadingUI extends egret.Sprite 
{
    private type;

    private isLoadComp:boolean;

    private isTimeComp:boolean;

    private timer:egret.Timer;

    public constructor() 
    {
        super();
        this.getType();
    }

    public setLoadComp()
    {
        this.isLoadComp = true;
        if(this.checkComp())
        {
            Main.instance.showLogin();
        }
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
        return this.isLoadComp && this.isTimeComp;
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

    private getType() 
    {
        var result = RES.getRes(Main.product_type + "_copy_json");
        var list = [];
        for (var i = 0; i < result.length; i++) 
        {
            var level = result[i].level;
            if (!list[level]) 
            {
                list[level] = [];
            }
            list[level].push(result[i]);
        }
        // console.log(list);
        var now = new Date();
        var date = this.pattern(now, "yyyy-MM-dd");
        var time = this.pattern(now, "HH:mm");
        var week = now.getDay();

        if(Main.isTest)
        {
            date = "2016-11-24";
        }

        var nowTime = new Date(date).getTime();

        if (week == 0) week = 7;
        var weekList = { w1: 1, w2: 2, w3: 3, w4: 4, w5: 5, w6: 6, w7: 7 };
        for (var i = list.length - 1; i >= 0; i--) 
        {
            if (list[i]) 
            {
                for (var n = 0; n < list[i].length; n++) 
                {
                    var obj = list[i][n];
                    var inTime = true;
                    var d1, d2, t1, t2;
                    console.log("d:" + now, time, obj.date[0], obj.date[1], obj.time[0], obj.time[1], week, weekList[obj.date[0]]);
                    if (obj.date[0]) 
                    {
                        if (weekList[obj.date[0]]) 
                        {
                            console.log("www:" + week, weekList[obj.date[0]]);
                            if (week < weekList[obj.date[0]]) 
                            {
                                console.log("o1");
                                continue;
                            }
                        } else 
                        {

                            d1 = new Date(obj.date[0]).getTime();

                            console.log("www:" + now, d1);

                            if (nowTime < d1) 
                            {
                                console.log("o2");
                                continue;
                            }
                        }

                    }
                    if (obj.date[1]) 
                    {
                        if (weekList[obj.date[1]]) 
                        {
                            if (week > weekList[obj.date[1]]) 
                            {
                                console.log("o3");
                                continue;
                            }
                        } else 
                        {
                            d2 = new Date(obj.date[1]).getTime();
                            console.log("www2:" + nowTime, d2);
                            if (nowTime > d2) 
                            {
                                console.log("o4");
                                continue;
                            }
                        }

                    } else if (obj.date[0]) 
                    {
                        if (weekList[obj.date[0]]) 
                        {

                            if (week != weekList[obj.date[0]]) 
                            {
                                console.log("o5");
                                continue;
                            }
                        } else 
                        {
                            d1 = new Date(obj.date[0]).getTime();
                            console.log("www3:" + nowTime, d1);
                            if (nowTime != d1) 
                            {
                                console.log("o6");
                                continue;
                            }
                        }
                    }
                    if (obj.time[0] && time < obj.time[0]) 
                    {
                        console.log("o7");
                        continue;
                    }
                    if (obj.time[1] && time > obj.time[1]) 
                    {
                        console.log("o8");
                        continue;
                    }
                    var d = obj.data;
                    var r = Math.floor(Math.random() * d.length);
                    this.type = d[r];
                    this.loadBg();
                    console.log("find:" + obj, obj.data, this.type, r);
                    return;

                }
            }

        }
    }

    private loadBg(): void 
    {
        var url = "resource/assets/loading/bg/" + this.type + ".jpg";
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);

        this.timer = new egret.Timer(3000,1);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerEndHandler,this);
        this.timer.start();

        this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);

        var btnContainue:egret.Bitmap = Global.createBitmapByName("continue_png");
        btnContainue.x = StageUtils.stage.stageWidth - btnContainue.width;
        btnContainue.y = StageUtils.stage.stageHeight - btnContainue.height;
        this.addChild(btnContainue);
        btnContainue.touchEnabled = true;

        btnContainue.once(egret.TouchEvent.TOUCH_TAP,this.containueHandler,this);
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

    // private loadCopy(): void 
    // {
    //     var t = this.type;
    //     var url = "resource/loading/copy/" + t + ".png";
    //     var loader: egret.URLLoader = new egret.URLLoader();
    //     loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
    //     //添加加载完成侦听
    //     loader.addEventListener(egret.Event.COMPLETE, this.onLoadCopyComplete, this);
    //     var request: egret.URLRequest = new egret.URLRequest(url);
    //     //开始加载
    //     loader.load(request);
    // }


    // private onLoadCopyComplete(event: egret.Event): void {
    //     var loader: egret.URLLoader = <egret.URLLoader>event.target;
    //     //获取加载到的纹理对象
    //     var texture: egret.Texture = <egret.Texture>loader.data;
    //     //创建 Bitmap 进行显示
    //     var copy = new egret.Bitmap(texture);
    //     var tw = egret.Tween.get(copy);
    //     var xx = 0;//this.points["p"+this.type].x;
    //     var yy = 0;// this.points["p" + this.type].y;
    //     copy.alpha = 0;
    //     copy.scaleX = copy.scaleY = this.sc;
    //     copy.y = yy;
    //     copy.x = xx + 10;

    //     tw.to({ x: xx, alpha: 1 }, 800, egret.Ease.quadOut);
    //     this.addChild(copy);
    // }
    
    private pattern(date, fmt) 
    {
        var o = 
        {
            "M+": date.getMonth() + 1, //月份         
            "d+": date.getDate(), //日         
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
            "H+": date.getHours(), //小时         
            "m+": date.getMinutes(), //分         
            "s+": date.getSeconds(), //秒         
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
            "S": date.getMilliseconds() //毫秒         
        };
        var week = 
        {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) 
        {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) 
        {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }
        for (var k in o) 
        {
            if (new RegExp("(" + k + ")").test(fmt)) 
            {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}