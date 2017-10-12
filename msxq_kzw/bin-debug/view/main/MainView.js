var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        // private txtChicken;
        _this.posX = [280, 530, 130, 150, 520];
        _this.posY = [800, 300, 750, 500, 670];
        _this.shopList = {};
        _this.isShowGlow = false;
        _this.filterList = {};
        _this.index = 0;
        MainView.instance = _this;
        _this.initView();
        return _this;
    }
    MainView.prototype.loadHead = function () {
        var img = new CustomImage(UserInfo.instance.url, true, function () {
            img.width = 100;
            img.height = 100;
        });
        img.x = 22;
        img.y = 12;
        this.addChild(img);
        var maskBg = new egret.Shape();
        maskBg.graphics.beginFill(0x0);
        maskBg.graphics.drawCircle(img.x + 100 / 2, img.y + 100 / 2, 50);
        maskBg.graphics.drawCircle;
        maskBg.graphics.endFill();
        this.addChild(maskBg);
        img.mask = maskBg;
        // img.touchEnabled = true;
        // img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.headClickHandler,this);
        // Global.setBut(img);
    };
    MainView.prototype.headClickHandler = function () {
        PopManager.showPop("UserPop", 1);
    };
    MainView.prototype.initFlash = function () {
        var dai = Global.createBitmapByName("dai1_png");
        UIManager.instance.topLayer.addChild(dai);
        dai.x = 700;
        dai.y = 100;
        dai.anchorOffsetX = 23;
        dai.anchorOffsetY = 9;
        egret.Tween.get(dai, { loop: false }).to({ skewX: 180, x: 300, y: 200 }, 1000).to({ skewX: 360, x: -130, y: 300 }, 1000).wait(1000);
        var dai1 = Global.createBitmapByName("dai2_png");
        UIManager.instance.topLayer.addChild(dai1);
        dai1.x = 700;
        dai1.y = 150;
        dai1.anchorOffsetX = 23;
        dai1.anchorOffsetY = 9;
        egret.Tween.get(dai1, { loop: false }).wait(500).to({ skewX: 180, x: 300, y: 250 }, 1000).to({ skewX: 360, x: -100, y: 350 }, 1000).wait(1400);
        var dai2 = Global.createBitmapByName("dai3_png");
        UIManager.instance.topLayer.addChild(dai2);
        dai2.x = 700;
        dai2.y = 200;
        dai2.anchorOffsetX = 23;
        dai2.anchorOffsetY = 9;
        egret.Tween.get(dai2, { loop: false }).wait(1000).to({ skewX: 180, x: 300, y: 200 }, 1000).to({ skewX: 360, x: -100, y: 200 }, 1000).wait(1500);
        var dai3 = Global.createBitmapByName("dai4_png");
        UIManager.instance.topLayer.addChild(dai3);
        dai3.x = 700;
        dai3.y = 100;
        dai3.anchorOffsetX = 23;
        dai3.anchorOffsetY = 9;
        egret.Tween.get(dai3, { loop: false }).wait(1500).to({ skewX: 180, x: 300, y: 150 }, 1000).to({ skewX: 360, x: -100, y: 300 }, 1000).wait(2500);
        var dai4 = Global.createBitmapByName("dai5_png");
        UIManager.instance.topLayer.addChild(dai4);
        dai4.x = 700;
        dai4.y = 300;
        dai4.anchorOffsetX = 23;
        dai4.anchorOffsetY = 9;
        egret.Tween.get(dai4, { loop: false }).wait(2000).to({ skewX: 180, x: 300, y: 350 }, 1000).to({ skewX: 360, x: -100, y: 400 }, 1000).wait(3000);
        var dai5 = Global.createBitmapByName("dai6_png");
        UIManager.instance.topLayer.addChild(dai5);
        dai5.x = 700;
        dai5.y = 285;
        dai5.anchorOffsetX = 23;
        dai5.anchorOffsetY = 9;
        egret.Tween.get(dai5, { loop: false }).wait(2500).to({ skewX: 180, x: 300, y: 350 }, 1000).to({ skewX: 360, x: -100, y: 400 }, 1000).wait(3500);
    };
    MainView.prototype.initView = function () {
        this.loadHead();
        var topBg = Global.createBitmapByName("head_png");
        topBg.x = 3;
        topBg.y = 6;
        this.addChild(topBg);
        this.txtName = new egret.TextField();
        this.txtName.size = 30;
        this.txtName.text = UserInfo.instance.username;
        this.txtName.width = 400;
        this.txtName.x = 150;
        this.txtName.y = 45;
        this.addChild(this.txtName);
        // this.initPeople();
        this.shopContainer = new egret.DisplayObjectContainer();
        this.addChild(this.shopContainer);
        this.initFlash();
    };
    MainView.prototype.initGuanZhu = function (obj) {
        var _this = this;
        var btnAdd = Global.createBitmapByName("btn_add_png");
        btnAdd.x = 340;
        btnAdd.y = 35;
        this.addChild(btnAdd);
        Global.setBut(btnAdd);
        btnAdd.touchEnabled = true;
        btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            $('.wx').show();
            _this.play(obj);
        }, this);
    };
    MainView.prototype.addTouchHandler = function () {
        // window.location.href = "http://weixin.qq.com/r/tjpcRG3ENTBKrSkn92_k";
    };
    MainView.prototype.initZhuan = function (obj) {
        var _this = this;
        this.btnZhuan = Global.createBitmapByName("btn_zhuan_png");
        this.btnZhuan.x = 10;
        this.btnZhuan.y = 150;
        this.btnZhuan.touchEnabled = true;
        this.btnZhuan.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.play(obj);
            // window.location.href = obj.link;
        }, this);
        this.addChild(this.btnZhuan);
        Global.setBut(this.btnZhuan);
    };
    MainView.prototype.initPeople = function (obj) {
        var p2 = Global.createBitmapByName("people_2_png");
        p2.x = StageUtils.SW - p2.width >> 1;
        p2.y = StageUtils.SH - p2.height;
        this.addChild(p2);
        var container = new egret.DisplayObjectContainer();
        this.addChild(container);
        var p4 = Global.createBitmapByName("people_4_png");
        p4.x = StageUtils.SW - p4.width;
        p4.y = StageUtils.SH - p4.height;
        container.addChild(p4);
        var p1 = Global.createBitmapByName("people_1_png");
        p1.x = StageUtils.SW - p1.width - 60;
        p1.y = StageUtils.SH - p1.height - 72;
        var p3 = Global.createBitmapByName("people_3_png");
        p3.x = p1.x - 60 + p3.width;
        p3.y = p1.y + 10 + p3.height;
        p3.anchorOffsetX = p3.width;
        p3.anchorOffsetY = p3.height;
        container.addChild(p3);
        container.addChild(p1);
        container.touchEnabled = true;
        Global.setBut(container);
        container.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (UserInfo.instance.fixed == "0") {
                console.log(obj.ticket);
                if (obj.ticket) {
                    // PopManager.showPop("TipsPop",1);
                    PopManager.showPop("ShopPop", obj);
                }
                else {
                    PopManager.showPop("TipsPop", 1);
                }
            }
            else {
                PopManager.showPop("TipsPop", 2);
            }
        }, this);
        egret.Tween.get(p3, { loop: true }).to({ rotation: 10 }, 500).to({ rotation: 0 }, 500);
    };
    MainView.prototype.zongZiClickHandler = function () {
        PopManager.showPop("AnswerPop");
    };
    MainView.prototype.showShiZi = function () {
        this.shizi = Global.createBitmapByName("shizi_png");
        this.shizi.x = StageUtils.SW - this.shizi.width;
        this.shizi.y = StageUtils.SH - this.shizi.height + 30;
        this.addChild(this.shizi);
    };
    MainView.prototype.initZongZi = function () {
        this.btnZongzi = Global.createBitmapByName("btn_zongzi_png");
        this.btnZongzi.pixelHitTest = true;
        this.btnZongzi.anchorOffsetX = this.btnZongzi.width >> 1;
        this.btnZongzi.x = StageUtils.SW - this.btnZongzi.width / 2;
        this.btnZongzi.y = 0;
        this.btnZongzi.touchEnabled = true;
        this.btnZongzi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zongZiClickHandler, this);
        this.addChild(this.btnZongzi);
        Global.setBut(this.btnZongzi);
        egret.Tween.get(this.btnZongzi, { loop: true }).wait(100).to({ rotation: -10 }, 1000).wait(100).to({ rotation: 0 }, 1000);
    };
    MainView.prototype.removeZongZi = function () {
        if (this.btnZongzi) {
            this.btnZongzi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.zongZiClickHandler, this);
            egret.Tween.removeTweens(this.btnZongzi);
            this.removeChild(this.btnZongzi);
            this.btnZongzi = null;
        }
    };
    MainView.prototype.hbClickHandler = function () {
        PopManager.showPop("UserPop", 2);
    };
    MainView.prototype.kqClickHandler = function () {
        PopManager.showPop("UserPop", 3);
    };
    MainView.prototype.showMask = function (str, target) {
        this.showGlow(target);
        // if(!this.maskBG)
        // {
        // 	this.maskBG = new egret.Shape();
        // 	this.maskBG.graphics.beginFill(0x000000,0.8);
        // 	this.maskBG.graphics.drawRect(0,0,StageUtils.SW,StageUtils.SH);
        // 	this.maskBG.graphics.endFill();
        // 	this.maskContainer.addChild(this.maskBG);
        // 	this.maskBG.touchEnabled = true;
        // }
        // // 将原来的遮罩图的混合模式设置为擦除
        // let bitmapMask = Global.createBitmapByName(str);
        // bitmapMask.x = target.x;
        // bitmapMask.y = target.y;
        // bitmapMask.blendMode = egret.BlendMode.ERASE;
        // // 绘制一个黑色的Sprite作为反遮罩，然后把上面的遮罩加进去
        // let reverseMask = new egret.Sprite();
        // reverseMask.graphics.beginFill(0, 1);
        // reverseMask.graphics.drawRect(0, 0, StageUtils.SW,StageUtils.SH);
        // reverseMask.graphics.endFill();
        // reverseMask.addChild(bitmapMask);
        // // 创建一个RenderTexture，把反遮罩绘制上去
        // let renderTex = new egret.RenderTexture();
        // renderTex.drawToTexture(reverseMask);
        // // 用得到的Texture创建一个Bitmap，这样就得到最终的反遮罩位图对象了
        // this.reverseMask = new egret.Bitmap(renderTex);
        // // this.reverseMask.x = target.x;
        // // this.reverseMask.y = target.y;
        // this.reverseMask.pixelHitTest = true;
        // this.maskContainer.mask = this.reverseMask;
        // this.maskContainer.addChild(this.reverseMask);
        // this.maskContainer.visible = true;
    };
    MainView.prototype.hideMask = function () {
        if (this.curObject) {
            this.curObject.filter = MainView.nullFilter;
            this.curObject = null;
        }
        // if(this.reverseMask && this.reverseMask.parent)
        // {
        // 	this.reverseMask.parent.removeChild(this.reverseMask);
        // 	this.maskContainer.visible = false;
        // }
    };
    MainView.prototype.showShop = function (list) {
        var yjskdata = sessionStorage.getItem("yanjishoukuai");
        var temp = 0;
        if (yjskdata) {
            //眼疾手快
            var ydata = eval('(' + yjskdata + ')');
            console.log(ydata);
            var obj1 = { "ticket": "", "id": "3", "type": "yanjishoukuai" };
            obj1.ticket = ydata.ticket;
            this.initPeople(obj1);
        }
        var hongbao = sessionStorage.getItem("hongbao");
        if (hongbao) {
            var ydata = eval('(' + hongbao + ')');
            var obj1 = { "ticket": "", "id": "1", "type": "hongbao" };
            obj1.ticket = ydata.ticket;
            var shop = new ShopItemView(obj1);
            var inx = Math.floor(Math.random() * this.posX.length);
            console.log(inx, this.posX.length, this.posX);
            shop.x = this.posX[inx];
            shop.y = this.posY[inx];
            shop.oy = shop.y;
            this.posX.splice(inx, 1);
            this.posY.splice(inx, 1);
            // shop.scaleX = shop.scaleY = 0.7;
            this.shopContainer.addChild(shop);
            // this.shopList[obj.shopid] = shop;
            this.shopList[obj1.type] = shop;
            shop.touchEnabled = true;
            shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shopClickHandler, this);
            Global.setBut(shop);
            if (obj1.ticket) {
                // this.filterList[obj.shopid] = shop;
                this.filterList[obj1.type] = shop;
                temp++;
            }
        }
        var isprize = 0;
        if (list) {
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var obj = list[i];
                if (obj) {
                    if (obj.type == "yanjishoukuai") {
                        //眼疾手快
                        this.initPeople(obj);
                        isprize = 1;
                    }
                    else if (obj.type == "gongzhonghao") {
                        if (UserInfo.instance.fixed == "0") {
                            this.initGuanZhu(obj);
                        }
                    }
                    else {
                        if (obj.ticket) {
                            var shop = new ShopItemView(obj);
                            var inx = Math.floor(Math.random() * this.posX.length);
                            console.log(inx, this.posX.length, this.posX);
                            shop.x = this.posX[inx];
                            shop.y = this.posY[inx];
                            shop.oy = shop.y;
                            this.posX.splice(inx, 1);
                            this.posY.splice(inx, 1);
                            // shop.scaleX = shop.scaleY = 0.7;
                            this.shopContainer.addChild(shop);
                            // this.shopList[obj.shopid] = shop;
                            this.shopList[obj.type] = shop;
                            shop.touchEnabled = true;
                            shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shopClickHandler, this);
                            Global.setBut(shop);
                            if (obj.ticket) {
                                // this.filterList[obj.shopid] = shop;
                                this.filterList[obj.type] = shop;
                                temp++;
                            }
                        }
                    }
                }
            }
            for (var str in list) {
            }
            if (temp) {
                this.timer = new egret.Timer(5000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.showJump, this);
                this.timer.start();
            }
        }
        if (isprize == 0 && yjskdata == null) {
            var obj2 = { "id": "3", "type": "yanjishoukuai" };
            this.initPeople(obj2);
        }
        if (this.container) {
            if (this.container.parent) {
                this.removeChild(this.container);
            }
        }
        this.container = null;
    };
    MainView.prototype.play = function (obj) {
        var hongbao = sessionStorage.getItem("hongbao");
        if (obj.type == "hongbao" && hongbao) {
            hongbao = eval('(' + hongbao + ')');
            console.log(hongbao);
            if (hongbao) {
                PopManager.showPop("RewardPop", hongbao);
            }
        }
        else {
            if (obj.type == "yanjishoukuai") {
                var yjskdata = sessionStorage.getItem("yanjishoukuai");
                // console.log(yjskdata);
                if (yjskdata) {
                    window.location.href = "http://res.leasiondata.cn/lstatic/av2/yjsk/index.html";
                }
                else {
                    // window.location.href = "http://res.leasiondata.cn/lstatic/a/test/yjsk/index.html?"+obj.ticket;
                    // window.location.href = obj.link + "?"+obj.ticket;
                    window.location.href = "http://res.leasiondata.cn/lstatic/av2/yjsk/index.html?" + obj.ticket;
                }
            }
            else {
                // Message.show(obj.ticket);
                var self = this;
                $.ajax({
                    url: MapManager.PLAY_API,
                    data: { type: "play", ticket: obj.ticket, isshared: MapManager.isShared },
                    success: function (data) {
                        console.log(data);
                        if (data.result == "success") {
                            if (obj.type == "gongzhonghao") {
                            }
                            else if (obj.desc == "weidian") {
                                // window.location.href = "https://kzwsc.weiyianwds.com/";
                                window.location.href = obj.value;
                            }
                            else {
                                var shop = self.shopList[obj.type];
                                if (shop && shop.parent) {
                                    if (data.prizes[0].type == "cash" || data.prizes[0].id == -1) {
                                        console.log("cash");
                                        shop.parent.removeChild(shop);
                                    }
                                    else {
                                        console.log("link");
                                        sessionStorage.setItem("hongbao", JSON.stringify(data.prizes[0]));
                                    }
                                }
                                // window.location.href = obj.link;
                                PopManager.showPop("RewardPop", data.prizes[0]);
                            }
                        }
                        else {
                            Message.show("系统错误！");
                        }
                    },
                    error: function () {
                        Message.show("error");
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            Message.show("timeout");
                        }
                    }
                });
            }
        }
    };
    MainView.prototype.showJump = function () {
        var list = [];
        for (var str in this.filterList) {
            list.push(this.filterList[str]);
        }
        var len = list.length;
        if (len == 0) {
            this.timer.stop();
            return;
        }
        var index = Math.floor(Math.random() * len);
        if (this.curJump) {
            egret.Tween.removeTweens(this.curJump);
            this.curJump.scaleX = this.curJump.scaleY = 1;
            this.curJump.rotation = 0;
            this.curJump.y = this.curJump.oy;
            this.curJump = null;
        }
        var shop = list[index];
        if (shop) {
            var temp = Math.floor(Math.random() * 3);
            if (temp == 0) {
                // egret.Tween.get(shop,{loop:true}).to({scaleY:1.1},100).to({scaleY:1},100);
                egret.Tween.get(shop, { loop: true }).to({ rotation: 5 }, 100).to({ rotation: 0 }, 100).to({ rotation: -5 }, 100).to({ rotation: 0 }, 100);
                egret.Tween.get(shop, { loop: true }).to({ y: shop.y - 30 }, 200).to({ y: shop.y }, 200);
            }
            else if (temp == 1) {
                egret.Tween.get(shop, { loop: true }).to({ rotation: 5 }, 100).to({ rotation: 0 }, 100).to({ rotation: -5 }, 100).to({ rotation: 0 }, 100);
            }
            else {
                egret.Tween.get(shop, { loop: true }).to({ rotation: 5 }, 100).to({ rotation: 0 }, 100).to({ rotation: -5 }, 100).to({ rotation: 0 }, 100);
                egret.Tween.get(shop, { loop: true }).to({ scaleY: 1.1 }, 100).to({ scaleY: 1 }, 100);
            }
            this.curJump = shop;
        }
    };
    MainView.prototype.removeJumpShop = function (id) {
        var shop = this.filterList[id];
        if (shop) {
            this.filterList[id] = null;
            delete this.filterList[id];
        }
        if (shop && shop == this.curJump) {
            egret.Tween.removeTweens(shop);
            shop.scaleX = shop.scaleY = 1;
            shop.rotation = 0;
            console.log(shop.y, this.posY[id - 1]);
            shop.y = this.posY[id - 1];
        }
        this.curJump = null;
    };
    MainView.prototype.enterFrameHandler = function () {
        if (this.index % 10 == 0) {
            var temp = 0;
            for (var str in this.filterList) {
                var obj = this.filterList[str];
                if (obj) {
                    temp++;
                    if (this.isShowGlow) {
                        obj.filters = MainView.nullFilter;
                    }
                    else {
                        obj.filters = MainView.glowFilter;
                    }
                }
            }
            if (temp == 0) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
                this.showGuide(15);
            }
            this.isShowGlow = !this.isShowGlow;
        }
        this.index++;
    };
    MainView.prototype.showGlow = function (obj) {
        egret.Tween.get(obj, { loop: true }).wait(200).call(function () {
            obj.filters = MainView.glowFilter;
        }).wait(200).call(function () {
            obj.filters = MainView.nullFilter;
        });
    };
    MainView.prototype.hideGlow = function (obj) {
        egret.Tween.removeTweens(obj);
        obj.filters = MainView.nullFilter;
    };
    MainView.prototype.showGuide = function (id) {
        this.curGuideID = id;
        // if(id == 1)
        // {
        // 	//鸡
        // 	this.showGlow(this.chicken);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+1+"_png");
        // }else if(id == 2)
        // {
        // 	//红包
        // 	this.showMask("icon_hb_png",this.iconHb);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+2+"_png");
        // }else if(id == 3)
        // {
        // 	//礼券
        // 	this.showMask("icon_kq_png",this.iconKq);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+2+"_png");
        // }else if(id == 4)
        // {
        // 	//金币
        // 	this.showMask("icon_money_png",this.iconMoney);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+2+"_png");
        // }else if(id == 5)
        // {
        // 	//能量
        // 	this.showMask("icon_nl_png",this.iconNl);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+2+"_png");
        // }else if(id == 6)
        // {
        // 	//鸡蛋
        // 	this.showMask("icon_egg_png",this.iconEgg);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+2+"_png");
        // }else if(id == 7)
        // {
        // 	//商店1
        // 	this.showMask("icon1_png",this.shopList[1]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 8)
        // {
        // 	//商店2
        // 	this.showMask("icon2_png",this.shopList[2]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 9)
        // {
        // 	//商店3
        // 	this.showMask("icon3_png",this.shopList[3]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 10)
        // {
        // 	//商店4
        // 	this.showMask("icon4_png",this.shopList[4]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 11)
        // {
        // 	//商店5
        // 	this.showMask("icon5_png",this.shopList[5]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 12)
        // {
        // 	//商店6
        // 	this.showMask("icon6_png",this.shopList[6]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 13)
        // {
        // 	//商店7
        // 	this.showMask("icon7_png",this.shopList[7]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 14)
        // {
        // 	//商店8
        // 	this.showMask("icon8_png",this.shopList[8]);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+3+"_png");
        // }else if(id == 15)
        // {
        // 	//宠物升级
        // 	this.showMask("icon_egg_png",this.iconEgg);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+2+"_png");
        // }
        // else if(id == 16)
        // {
        // 	//秘境
        // 	this.showMask("copy_icon_png",this.btnCopy);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+4+"_png");
        // }else if(id == 17)
        // {
        // 	//市场
        // 	this.showMask("market_icon_png",this.btnMarket);
        // 	// this.tips.texture = RES.getRes("tips_guide_"+5+"_png");
        // }else 
        // {
        // 	this.hideMask();
        // 	PopManager.showPop("EndPop");
        // }
    };
    MainView.prototype.shopClickHandler = function (e) {
        if (e.target.status) {
            console.log(e.target);
            if (e.target.type == "weidian") {
                var w = {};
                $.ajax({
                    url: MapManager.PLAY_API,
                    data: { type: "play", ticket: e.target.obj.ticket, isshared: MapManager.isShared },
                    success: function (data) {
                        w = { "ticket": data.prizes[0].ticket, "desc": data.prizes[0].desc, "type": "weidian", "value": data.prizes[0].value };
                        if (data.result == "success") {
                            console.log(w);
                            PopManager.showPop("ShopPop", w);
                        }
                        else {
                            Message.show("系统错误！");
                        }
                    },
                    error: function () {
                        Message.show("error");
                    }, timeout: 8000,
                    dataType: "json", async: true, type: "POST",
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {
                            Message.show("timeout");
                        }
                    }
                });
            }
            else {
                this.play(e.target.obj);
            }
        }
    };
    MainView.prototype.getReward = function (id, kq) {
        if (kq === void 0) { kq = 0; }
        var self = this;
        var iswin = 1;
        if (id == 10) {
            id = 0;
            iswin = 0;
        }
        var dat;
        if (kq) {
            dat = { ticket: MapManager.USER_TICKET, isshared: MapManager.isShared, shopid: id, iswin: iswin, kq: 1 };
        }
        else {
            dat = { ticket: MapManager.USER_TICKET, isshared: MapManager.isShared, shopid: id, iswin: iswin };
        }
        $.ajax({
            url: MapManager.PLAY_API,
            data: dat,
            success: function (data) {
                if (data.result == 0 || data.result == "success") {
                    // 					cashed：100；领取金额数
                    // energy：0 领取能量值
                    // coin:0  金币
                    if (data.shopid == "0" || data.shopid == "10") {
                        if (self.chicken && self.chicken.parent) {
                            self.chicken.parent.removeChild(self.chicken);
                        }
                        self.showShiZi();
                        PopManager.showPop("LanternResultPop", data);
                    }
                    else {
                        if (data.kq && data.kq1) {
                            PopManager.showPop("RewardPop", data);
                        }
                        else if (data.kq) {
                            var addcard = eval("$.addCard");
                            addcard(this, data.signs, function () {
                                console.log("领取成功");
                                self.getReward(1, 1);
                            }, function () {
                                console.log("领取失败");
                            });
                        }
                        else {
                            PopManager.showPop("RewardPop", data);
                        }
                        // MainView.instance.refreshInfo();
                        self.removeJumpShop(data.shopid);
                    }
                }
                else {
                    self.removeJumpShop(id);
                    // var shop = self.filterList[id];
                    // if(shop)
                    // {
                    // 	// shop.filters = MainView.nullFilter;
                    // 	self.filterList[id] = null;
                    // 	delete self.filterList[id];
                    // }
                    if (data.result == 6) {
                        Message.show("领取失败，请重新领取");
                    }
                    else if (data.result == 2) {
                        Message.show("分享数量达到上限");
                    }
                    else if (data.result == 3) {
                        Message.show("已经领取过");
                    }
                    else {
                        Message.show("系统异常:" + data.result);
                    }
                }
            },
            error: function () {
                //Main.showLost(2);
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                }
            }
        });
    };
    /**
     * now 现在的数值
     * val 目标的数值
     * target 作用域对象
     */
    MainView.prototype.addValue = function (now, val, target) {
        if (target) {
            var len = val - now;
            var _loop_1 = function (i) {
                egret.Tween.get(target).wait(i * 10).call(function () {
                    target.text = now + i + 1 + "";
                });
            };
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
        }
    };
    MainView.prototype.addHb = function (val) {
        MapManager.instance.hb += val;
        var self = this;
        egret.Tween.get(this.iconHb)
            .to({ rotation: -5 }, 100)
            .to({ rotation: 5 }, 100)
            .to({ rotation: -5 }, 100)
            .to({ rotation: 5 }, 100)
            .to({ rotation: -5 }, 100)
            .to({ rotation: 0 }, 100);
        this.txtHb.anchorOffsetX = this.txtHb.width >> 1;
        this.txtHb.anchorOffsetY = this.txtHb.height >> 1;
        this.txtHb.x = this.iconHb.x + 30 + this.txtHb.width / 2;
        this.txtHb.y = 23 + this.txtHb.height / 2;
        egret.Tween.get(self.txtHb).wait(600).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0.5 }, 500).call(function () {
            self.txtHb.text = MapManager.instance.hb / 100 + "";
        }).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500);
    };
    MainView.prototype.refreshInfo = function () {
        // this.txtHb.text = MapManager.instance.hb / 100 + "";
        // this.txtMoney.text = MapManager.instance.money+"";
        // this.txtNl.text = MapManager.instance.nl+"";
        // this.txtEgg.text = MapManager.instance.egg+"";
        // this.txtKq.text = MapManager.instance.kq + "";
    };
    MainView.prototype.refreshInfo1 = function () {
        // MapManager.instance.money += MapManager.instance.add_money;
        // MapManager.instance.nl += MapManager.instance.add_nl;
        // MapManager.instance.egg += MapManager.instance.add_egg;
        // MapManager.instance.add_money = 0;
        // MapManager.instance.add_nl = 0;
        // MapManager.instance.add_egg = 0;
        // this.refreshInfo();
    };
    MainView.prototype.activityClickHandler = function () {
        PopManager.showPop("ActivityPop");
    };
    MainView.prototype.addClickHandler = function () {
        if (MapManager.instance.curMapLevel < 18) {
            if (MapManager.instance.Gmap) {
                MapManager.instance.Gmap.zoomIn();
                MapManager.instance.curMapLevel++;
                MapManager.instance.refreshMap();
            }
        }
    };
    MainView.prototype.lessClickHandler = function () {
        if (MapManager.instance.curMapLevel > 0) {
            if (MapManager.instance.Gmap) {
                MapManager.instance.Gmap.zoomOut();
                MapManager.instance.curMapLevel--;
                MapManager.instance.refreshMap();
            }
        }
    };
    MainView.prototype.marketClickHandler = function () {
        if (this.curGuideID == 1) {
            return;
        }
        PopManager.showPop("MarketPop");
    };
    MainView.prototype.postClickHandler = function () {
        if (MapManager.instance.serverLng) {
            MapManager.instance.curMapLevel = 17;
            MapManager.instance.refreshMap();
        }
    };
    MainView.prototype.copyClickHandler = function () {
        if (this.curGuideID == 1) {
            return;
        }
        PopManager.showPop("CopyPop");
    };
    return MainView;
}(egret.DisplayObjectContainer));
MainView.glowFilter = [new egret.GlowFilter(0xffff00, 1, 5, 5, 20, 1, false, false)];
MainView.nullFilter = [];
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map