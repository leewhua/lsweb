var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CountData = (function () {
    function CountData() {
        this.lastTime = 0;
    }
    Object.defineProperty(CountData, "instance", {
        get: function () {
            if (!CountData._instance) {
                CountData._instance = new CountData();
            }
            return CountData._instance;
        },
        enumerable: true,
        configurable: true
    });
    CountData.prototype.init = function (stage, cusTicket) {
        this.ticket = cusTicket;
        if (stage) {
            stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginHandler, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveHandler, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, this.endHandler, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.endHandler, this);
        }
    };
    CountData.prototype.beginHandler = function (e) {
        console.log("beginHandler");
        this.isMove = false;
        this.startX = e.stageX;
        this.startY = e.stageY;
    };
    CountData.prototype.moveHandler = function (e) {
        console.log("moveHandler");
        this.isMove = true;
    };
    CountData.prototype.endHandler = function (e) {
        console.log("endHandler");
        var endX = e.stageX;
        var endY = e.stageY;
        var ope;
        if (this.isMove) {
            var maxX = endX - this.startX;
            var maxY = endY - this.startY;
            if (Math.abs(maxX) > Math.abs(maxY)) {
                if (maxX > 0) {
                    ope = "right";
                }
                else {
                    ope = "left";
                }
            }
            else {
                if (maxY > 0) {
                    ope = "down";
                }
                else {
                    ope = "up";
                }
            }
            console.log("move:" + ope);
        }
        else {
            ope = "clilck";
            console.log("click");
        }
        var curTime = egret.getTimer();
        if (curTime - this.lastTime < 200) {
            return;
        }
        this.lastTime = curTime;
        var _this = this;
        $.ajax({
            url: "http://123.59.156.230/lstat",
            // from=H5
            // url=链接
            // px=x坐标
            // py=y坐标
            // operation=click up down left right
            // stay=停留时长
            // ticket=一级接口第一个ticket
            data: { from: "H5", url: window.location.href, px: endX, py: endY, operation: ope, ticket: this.ticket },
            success: function (data) {
            },
            error: function () {
                console.log("error");
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    console.log("timeout");
                }
            }
        });
    };
    return CountData;
}());
__reflect(CountData.prototype, "CountData");
//# sourceMappingURL=CountData.js.map