var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.lng = 121.48789948999993;
        _this.lat = 31.249161578948787;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Object.defineProperty(Main, "instance", {
        get: function () {
            if (!Main._instance) {
                Main._instance = new Main();
            }
            return Main._instance;
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.onAddToStage = function (event) {
        var self = this;
        StageUtils.registStage(this.stage);
        this.addChild(UIManager.instance);
        $('.wx').click(function () {
            $('.wx').hide();
        });
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        UIManager.instance.mainUILayer.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        // setTimeout(function () {
        //     self.getLoct();
        // },500);
        // self.getLoct();
    };
    Main.prototype.createGameScene = function () {
        if (this.getData()) {
            // alert("ticket:" + MapManager.USER_TICKET + ", length:" + MapManager.USER_TICKET.length);
            var x = this.lng;
            var y = this.lat;
            var self = this;
            var data = {};
            // alert('你的位置：' + x + ',' + y + "," + (x > 0 && y>0));
            if (x > 0 && y > 0) {
                data = { type: "info", lng: x, lat: y, ticket: MapManager.USER_TICKET, isshared: MapManager.isShared };
            }
            else {
                data = { type: "info", ticket: MapManager.USER_TICKET, isshared: MapManager.isShared };
            }
            $.ajax({
                url: MapManager.USER_INFO_API,
                data: data,
                success: function (data) {
                    // alert( "reason:" + data.reason + ",result:" + data.result);
                    // data.result == "success";
                    if (data.result == "success") {
                        var lenth = data.prizes.length;
                        if (data.prizes.length != 0) {
                            for (var i = 0; i < lenth; i++) {
                                if (data.prizes[i].pooltype == "yanjishoukuai") {
                                    var ss = JSON.stringify(data.prizes[i]);
                                    sessionStorage.setItem("yanjishoukuai", ss);
                                }
                                else if (data.prizes[i].pooltype == "hongbao") {
                                    var ss = JSON.stringify(data.prizes[i]);
                                    sessionStorage.setItem("hongbao", ss);
                                }
                            }
                            console.log(ss);
                        }
                        UserInfo.instance.fixed = 0;
                        UserInfo.instance.shopList = data.pools;
                        egret.localStorage.setItem("activedate", data.activedate);
                        UserInfo.instance.username = decodeURI(data.nickname);
                        // var newTicket = data.pools[0].ticket.substring(0, 32);
                        var url = data.headimgurl.substr(0, data.headimgurl.length - 1);
                        url += "132";
                        UserInfo.instance.url = url;
                        //初始化Resource资源加载库
                        //initiate Resource loading library
                        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, self.onConfigComplete, self);
                        // RES.loadConfig("resource/default.res.json", "resource/");
                        UIManager.instance.initMainView();
                    }
                    else {
                        Message.show(data.result);
                    }
                },
                error: function () {
                }, timeout: 8000,
                dataType: "json", async: true, type: "POST",
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') {
                    }
                }
            });
        }
        else {
        }
    };
    Main.prototype.getLoct = function () {
        this.lng = 0;
        this.lat = 0;
        var self = this;
        console.log("getLoct");
        // alert("getLocation");
        // console.log(self);
        var geolocation = eval("new BMap.Geolocation();");
        geolocation.getCurrentPosition(function (r) {
            if (geolocation.getStatus() == eval("BMAP_STATUS_SUCCESS")) {
                // alert("ininin");
                self.lng = r.point.lng;
                self.lat = r.point.lat;
                self.createGameScene();
            }
            else {
                alert('failed' + geolocation.getStatus());
            }
        }, { enableHighAccuracy: true });
    };
    Main.prototype.getData = function () {
        // var url = window.location.href.split("?")[1];
        var url = window.location.href.split("#")[0].split("?")[1];
        var ut;
        console.log("loadUser");
        // alert(window.location.href + " , url: " + url);
        sessionStorage.setItem("kzw_href", window.location.href);
        // window.sessionStorage
        if (Main.isTest) {
            return true;
        }
        //Main.api ="test.json";
        if (url) {
            // ut = url.split("$");
            ut = url.substring(0, 32);
            // var arr = ut[0].split("=")[0].split(",");
            // var t1 = arr[0];
            // var t2 = arr[1];
            // egret.localStorage.setItem("ticket1",t1);
            // egret.localStorage.setItem("ticket2",t2);
            MapManager.USER_TICKET = ut;
            // MapManager. = arr[0];
            // if(ut[1])
            // {
            //     var temp = ut[1].substring(0,10);
            //     MapManager.isShared = temp.split("=")[1];
            // }
            return true;
        }
        else {
            return false;
        }
    };
    Main.prototype.initMap = function () {
        this.Gmap = eval("new BMap.Map('GameMap',{enableHighResolution:true,enableMapClick:false});");
        this.curMapLevel = 17;
        //$Gmap.centerAndZoom(new BMap.Point(116.404, 39.915), 17);
        this.Gmap.centerAndZoom(eval("new BMap.Point(" + this.lng + ", " + this.lat + ")"), this.curMapLevel);
        //$Gmap.setMinZoom(16);
        //$Gmap.setMaxZoom(17);
        this.Gmap.disableDragging();
        this.Gmap.disableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        // $Gmap.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
        this.Gmap.disableDoubleClickZoom(); //禁用双击放大
        this.Gmap.disableKeyboard();
        this.Gmap.disableInertialDragging();
        console.log("地图初始化完毕");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("main");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "main") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.loadingView.loadComp();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        Message.show("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        Message.show("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "main") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
Main.isTest = false;
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map