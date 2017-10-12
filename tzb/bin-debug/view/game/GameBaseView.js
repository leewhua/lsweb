var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameBaseView = (function (_super) {
    __extends(GameBaseView, _super);
    function GameBaseView() {
        return _super.call(this) || this;
    }
    GameBaseView.prototype.initDanmuSend = function () {
        var danmu = new DanmuSendView();
        this.addChild(danmu);
        danmu.addEventListener("add_self", this.addSelfHandler, this);
    };
    GameBaseView.prototype.addSelfHandler = function (e) {
        var obj = e.data;
        if (obj) {
            if (this.danmuList) {
                this.danmuList.addSelf(obj);
            }
        }
    };
    GameBaseView.prototype.initDanmuList = function () {
        this.danmuList = new DanmuListView();
        this.danmuList.setData(Main.content);
        this.addChild(this.danmuList);
    };
    GameBaseView.prototype.play = function () {
        if (Main.isGet) {
            UIManager.instance.initShareView();
        }
        else {
            var self = this;
            $.ajax({
                url: sessionStorage.getItem("interface"),
                data: { ticket: sessionStorage.getItem("luckticket") },
                success: function (data) {
                    if (data.result == "success") {
                        // if(data.prizes[0].require != "" && data.prizes[0].require.indexOf("ADDR") == 0){
                        // 	//step=cashed  没填信息
                        // 	Main.step = "cashed";
                        // 	sessionStorage.setItem("addr", "ADDR");
                        // }else{
                        // 	//step=filled  填过信息
                        // 	Main.step = "filled";
                        // 	var addr = data.prizes[0].require.split("#")[0];
                        // 	sessionStorage.setItem("addr", addr);
                        // }
                        if (data.prizes.length > 0) {
                            if (data.prizes[0].value == "0") {
                                Main.share(true);
                                PopManager.showPop("SharePop", 1);
                            }
                            else {
                                Main.share(true);
                                PopManager.showPop("EndPop", data.prizes[0].value);
                                if (data.prizes[0].value = "66600") {
                                    sessionStorage.setItem("confirmticket", data.prizes[0].ticket);
                                }
                            }
                        }
                        else {
                            PopManager.showPop("SharePop", 1);
                        }
                    }
                    else {
                        // Message.show(data.reason);
                        PopManager.showPop("ErrorPop", 2);
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
        } /*
                $.ajax({
                    url: Main.PLAY_API,
                    data: {ticket:Main.PLAY_TICKET},
                    success: function(data)
                    {
                        if(data.result == "success")
                        {
                            if(data.more.result == "success")
                            {
                                self.result(data);
                            }else if(data.more.result == "fail" && data.more.reason == "c1ashed")
                            {
                                PopManager.showPop("ErrorPop",1);
                            }
                            else
                            {
                                // Message.show(data.more.reason);
                                PopManager.showPop("ErrorPop",2);
                            }
                        }else
                        {
                            // Message.show(data.reason);
                            PopManager.showPop("ErrorPop",2);
                        }
                    },
                    error: function()
                    {
                    },timeout: 8000,
                    dataType: "json",async: true,type: "POST",
                    complete: function(XMLHttpRequest,status)
                    {
                        if(status == 'timeout')
                        {
                        }
                    }
                });
            }*/
    };
    GameBaseView.prototype.result = function (data) {
        var money = data.more.c1ashed;
        if (money) {
            Main.share(true);
            PopManager.showPop("EndPop", money);
        }
        else {
            PopManager.showPop("SharePop", 1);
        }
    };
    return GameBaseView;
}(egret.DisplayObjectContainer));
__reflect(GameBaseView.prototype, "GameBaseView");
//# sourceMappingURL=GameBaseView.js.map