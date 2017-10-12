
class LoadingUI extends egret.Sprite {


    private weatherObj = ["晴","多云","阴","阵雨","小雨","中雨","大雨","冻雨","雨夹雪","沙尘","雾","霾","风","大风","台风","龙卷风","阵雪","小雪","中雪","大雪"];
    private type;
    private points = [{ x: 40,y: 352 },{ x:244,y:532},{ x:60,y:352},{ x:290,y:352},{ x:180,y:440},
            { x:40,y:620},{ x:200,y:250},{ x:90,y:330},{ x:60,y:580},{ x:70,y:220},{ x:60,y:220},{ x:110,y:300},{ x:65,y:460},
            { x:40,y:600},{ x:90,y:180},{ x:40,y:560},{ x:196,y:600},{ x:200,y:520},{ x:80,y:630},{ x:40,y:310}];
    public constructor() {
        super();
        //this.loadCity();
        Main.location = window['remote_ip_info'];
        this.loadWeather();
        //console.log(window.weather.$('#ltlCity').text());
    }
    private getType(type): number {
        console.log("type:" + Main.location.city+":"+type);
        for(var i=this.weatherObj.length-1;i>=0;i--){
            if(type.indexOf(this.weatherObj[i])>-1){
                return i+1;
            }
        }
        return 1;
    }
    private createView(bg):void {
        var logo;
        if(this.type == 1 || this.type == 5 || this.type == 11 || this.type == 16){
            logo = Main.createBitmapByRes(Main.product_type + "_json","logo-white");
        }else{
            logo = Main.createBitmapByRes(Main.product_type + "_json","logo-blue");
        }
        
        logo.x = 500;
        logo.y = 20;
        var mark;
        bg.scaleX = bg.scaleY=1.12;
        
        var tw = egret.Tween.get(bg);
        bg.alpha = 0;
       
        tw.to({alpha: 1 },600);
        
        this.addChild(bg);
      //  this.addChild(logo);
        this.loadMark();
        this.loadCopy();
       
    }
    
    private loadCopy(): void {
        var t = this.type;
        var url = "resource/loading/copy/" + t + ".png";
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadCopyComplete,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }
    private loadBg(type): void {
        var t = this.getType(type);
        this.type=t;
        var url = "resource/loading/bg/" + t + ".jpg";
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        //开始加载
        loader.load(request);
    }
    private onLoadCopyComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的纹理对象
        var texture: egret.Texture = <egret.Texture>loader.data;
        //创建 Bitmap 进行显示
        var copy = new egret.Bitmap(texture);
        var tw = egret.Tween.get(copy);
        var xx=this.points[this.type-1].x;
        var yy = this.points[this.type-1].y;
        copy.alpha = 0;
        copy.y = yy+10;
        copy.x = xx;
        tw.to({ y: yy,alpha: 1 },400);
        this.addChild(copy);
    }
    private onLoadComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的纹理对象
        var texture: egret.Texture = <egret.Texture>loader.data;
        //创建 Bitmap 进行显示
        this.createView(new egret.Bitmap(texture));
    }
    private loadMark(): void {
        var url = "resource/loading/mark.png";
        var loader: egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE,this.onLoadMarkComplete,this);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
    }
    private onLoadMarkComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var texture: egret.Texture = <egret.Texture>loader.data;
        var city=new egret.Sprite();
        var mark = new egret.Bitmap(texture);
        var cityName=new egret.TextField();
            cityName.background = false;
            //设置背景颜色
            //cityName.backgroundColor = 0xffffff;
            //label.fontFamily = "Arial";
            cityName.textColor = 0xffffff;
            //设置字号
            cityName.size = 30;
            //设置显示文本
            cityName.text = Main.location.city;
            cityName.x=46;
            cityName.y=6;
            city.addChild(cityName);
            city.addChild(mark);
            this.addChild(city);
            var tw = egret.Tween.get(city);
            city.alpha=0;
            city.y=1040-80;
            city.x=30;
            tw.to({ x: 20,alpha: 1 },400);
    }
    //
    private loadCity(): void {
        console.log('loadCity');
        var _this1 = this;
        $.ajax({
            url: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',
            data: {},
            success: function(data) {
                console.log('loadCity:' + data);
                if(data.ret == 1) {
                   
                    Main.location = data;
                    _this1.loadWeather();
                } else {
                }
            },
            dataType: "text",async: false,type: "GET"
        });
    }
    private loadWeather(): void {
        console.log('loadWeather');
        var _this1 = this;
        $.ajax({
            url: "http://wthrcdn.etouch.cn/weather_mini",
            data: { city: Main.location.city},
            success: function(data) {
                if(data.status = 1000) {
                    console.log('loadWeather:'+data.data);
                    _this1.loadBg(data.data.forecast[0].type);
                } else {
                    setTimeout(function() {
                        _this1.loadWeather();
                    },1000);
                    
                }
            },
            dataType: "json",async: false,type: "GET"
        });
    }
}
