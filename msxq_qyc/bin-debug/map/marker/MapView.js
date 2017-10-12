var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        _this.markerLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.markerLayer);
        _this.selfLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.selfLayer);
        // this.timer = new egret.Timer(10000,1);
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
        // this.timer.start();
        _this.itemList = [];
        _this.itemDic = {};
        _this.otherDic = {};
        _this.companyDic = {};
        _this.virCompDic = {};
        _this.threeDic = {};
        return _this;
        // this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    }
    MapView.prototype.refreshSelf = function () {
        if (this.self) {
            this.self.refreshPos();
        }
        else {
            this.self = new SelfMarkerView();
            this.self.setData();
            this.selfLayer.addChild(this.self);
        }
    };
    MapView.prototype.refreshOther = function (list) {
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var data = list[i];
                if (data) {
                    var item = this.findMarkerByID(data.id, this.otherDic);
                    if (item) {
                        item.refreshPos();
                    }
                    else {
                        item = new OtherMarkerView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.otherDic[data.id] = item;
                    }
                }
            }
        }
    };
    MapView.prototype.refreshCompany = function (list) {
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var data = list[i];
                if (data) {
                    var item = this.findMarkerByID(data.id, this.companyDic);
                    if (item) {
                        item.refreshPos();
                    }
                    else {
                        item = new MarkerItemView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.companyDic[data.id] = item;
                    }
                }
            }
        }
    };
    MapView.prototype.refreshVIRComp = function (list) {
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var data = list[i];
                if (data) {
                    var item = this.findMarkerByID(data.id, this.virCompDic);
                    if (item) {
                        item.refreshPos();
                    }
                    else {
                        item = new MarkerItemView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.virCompDic[data.id] = item;
                    }
                }
            }
        }
    };
    MapView.prototype.refreshThree = function (list) {
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var data = list[i];
                if (data) {
                    var item = this.findMarkerByID(data.id, this.threeDic);
                    if (item) {
                        item.refreshPos();
                    }
                    else {
                        item = new MarkerItemView();
                        item.setData(data);
                        this.selfLayer.addChild(item);
                        this.threeDic[data.id] = item;
                    }
                }
            }
        }
    };
    MapView.prototype.refreshMap = function () {
        if (this.self) {
            this.self.refreshPos();
        }
        for (var str in this.otherDic) {
            var item = this.otherDic[str];
            if (item) {
                item.refreshPos();
            }
        }
        for (var str in this.companyDic) {
            var item = this.companyDic[str];
            if (item) {
                item.refreshPos();
            }
        }
        for (var str in this.virCompDic) {
            var item = this.virCompDic[str];
            if (item) {
                item.refreshPos();
            }
        }
        for (var str in this.threeDic) {
            var item = this.threeDic[str];
            if (item) {
                item.refreshPos();
            }
        }
        // if(list)
        // {
        // 	//{"name":"上海南站","lng":31.15952311239576,"lat":121.43577423051164}
        // 	var len = list.length;
        // 	for(var i = 0;i<len;i++)
        // 	{
        //         var obj = list[i];
        //         if(obj)
        //         {
        //             obj.id = i+1;
        //             var target = this.findMarker(obj);
        //             if(target)
        //             {
        //                 target.refreshPos();
        //             }else
        //             {
        //                 var item = new MarkerItemView();
        //                 item.setData(obj);
        //                 this.markerLayer.addChild(item);
        //                 this.itemList.push(item);
        //             }
        //         }
        // 	}
        // }
    };
    MapView.prototype.findMarkerByID = function (id, target) {
        for (var str in target) {
            if (str == id) {
                return target[str];
            }
        }
        return null;
    };
    MapView.prototype.findMarker = function (target) {
        var len = this.itemList.length;
        for (var i = 0; i < len; i++) {
            var item = this.itemList[i];
            if (item) {
                if (item.data.id == target.id) {
                    return item;
                }
            }
        }
        return null;
    };
    return MapView;
}(egret.DisplayObjectContainer));
__reflect(MapView.prototype, "MapView");
//# sourceMappingURL=MapView.js.map