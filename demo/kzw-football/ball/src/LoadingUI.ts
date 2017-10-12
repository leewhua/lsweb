
class LoadingUI extends egret.Sprite {


    private type;
    private sc=640/500;
    private points = { "p25": { x: 180,y: 580 },
            "p26": { x: 56,y: 250 },
        "p27": { x: 50,y: 580 },
        "p28": { x: 60,y: 230 },
        "p29": { x: 60,y: 570 },
        "p30": { x: 60,y: 350 },
        "p31": { x: 40,y: 750 },
        "p32": { x: 80,y: 612 },
        "p33": { x: 80,y: 690 },
        "p34": { x: 45,y: 630 }};
    public constructor() {
        super();
        RES.getResAsync(Main.product_type + "_copy_json",this.getType,this)
    }
    
    private getType(result: Array<any>) {
        var list=[];
        for(var i = 0;i < result.length;i++){
            var level=result[i].level;
            if(!list[level]){
                list[level]=[];
            }
            list[level].push(result[i]);
        }
        console.log(list);
        var now=new Date();
        var date = this.pattern(now,"yyyy-MM-dd");
        var time = this.pattern(now,"HH:mm");
        var week = now.getDay();
        var nowTime = new Date(date).getTime();
      
        if(week == 0) week=7;
        var weekList = { w1: 1,w2: 2,w3: 3,w4: 4,w5: 5,w6: 6,w7: 7};
        for(var i = list.length-1;i>=0 ;i--) {
            if(list[i]){
                for(var n = 0;n < list[i].length;n++) {
                    var obj = list[i][n];
                    var inTime=true;
                    var d1,d2,t1,t2;
                    console.log("d:" + now,time, obj.date[0],obj.date[1],obj.time[0],obj.time[1],week , weekList[obj.date[0]]);
                    if(obj.date[0]){
                        if(weekList[obj.date[0]]){
                            console.log("www:" + week , weekList[obj.date[0]]);
                            if(week < weekList[obj.date[0]]){
                                console.log("o1");
                                continue;
                            }
                        }else{
                            
                            d1 = new Date(obj.date[0]).getTime();
                           
                            console.log("www:" + now,d1);
                            
                            if(nowTime < d1) {
                                console.log("o2");
                                continue;
                            }
                        }
                        
                    }
                    if(obj.date[1]) {
                        if(weekList[obj.date[1]]) {
                            if(week > weekList[obj.date[1]]) {
                                console.log("o3");
                                continue;
                            }
                        } else {
                            d2 = new Date(obj.date[1]).getTime();
                            console.log("www2:" + nowTime,d2);
                            if(nowTime > d2) {
                                console.log("o4");
                                continue;
                            }
                        }

                    } else if(obj.date[0]) {
                        if(weekList[obj.date[0]]) {
                           
                            if(week != weekList[obj.date[0]]) {
                                console.log("o5");
                                continue;
                            }
                        } else {
                            d1 = new Date(obj.date[0]).getTime();
                            console.log("www3:" + nowTime,d1);
                            if(nowTime!= d1) {
                                console.log("o6");
                                continue;
                            }
                        }
                    }
                    if(obj.time[0] && time < obj.time[0]) {
                        console.log("o7");
                        continue;
                    }
                    if(obj.time[1] && time > obj.time[1]) {
                        console.log("o8");
                        continue;
                    }
                    var d = obj.data;
                    var r = Math.floor(Math.random() * d.length);
                    this.type = parseInt(d[r]);
                    this.loadBg();
                    console.log("find:" + obj,obj.data,this.type,r);
                    return;
                  
                }
            }
           
        }
        
     
    }
    private createView(bg): void {
        var logo;
        if(this.type == 27 || this.type ==29 || this.type == 30 || this.type == 31) {
            logo = Main.createBitmapByRes(Main.product_type + "_json","logo-white");
        } else {
            logo = Main.createBitmapByRes(Main.product_type + "_json","logo-blue");
        }

        logo.x = 500;
        logo.y = 20;
        var mark;
        bg.scaleX = bg.scaleY =this.sc;

        var tw = egret.Tween.get(bg);
        bg.alpha = 0;

        tw.to({ alpha: 1 },600);

        this.addChild(bg);
        this.addChild(logo);
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
    private loadBg(): void {
     
        var url = "resource/loading/copy/" + this.type + ".jpg";
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
        var xx = 0;//this.points["p"+this.type].x;
        var yy =0;// this.points["p" + this.type].y;
        copy.alpha = 0;
        copy.scaleX = copy.scaleY=this.sc;
        copy.y = yy;
        copy.x = xx+10;
       
        tw.to({ x: xx,alpha: 1 },800,egret.Ease.quadOut);
        this.addChild(copy);
    }
    private onLoadComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        //获取加载到的纹理对象
        var texture: egret.Texture = <egret.Texture>loader.data;
        //创建 Bitmap 进行显示
        this.createView(new egret.Bitmap(texture));
    }
   
    private pattern(date,fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份         
            "d+": date.getDate(), //日         
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时         
            "H+": date.getHours(), //小时         
            "m+": date.getMinutes(), //分         
            "s+": date.getSeconds(), //秒         
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度         
            "S": date.getMilliseconds() //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1,((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }
        for(var k in o) {
            if(new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
}
