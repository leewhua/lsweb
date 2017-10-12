var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DetailView = (function (_super) {
    __extends(DetailView, _super);
    function DetailView() {
        var _this = _super.call(this) || this;
        var title = Global.createBitmapByName("select_title_png");
        title.x = 0;
        title.y = 0;
        _this.addChild(title);
        _this.container = new egret.DisplayObjectContainer();
        var scroll = new egret.ScrollView(_this.container);
        scroll.width = 640;
        scroll.height = StageUtils.SH - 300 - 90;
        scroll.x = 0;
        scroll.y = 64;
        scroll.horizontalScrollPolicy = "off";
        _this.addChild(scroll);
        var down = Global.createBitmapByName("select_down_png");
        down.x = 0;
        down.y = StageUtils.SH - down.height - 240;
        _this.addChild(down);
        var zongji = new egret.TextField();
        zongji.x = 97;
        zongji.y = StageUtils.SH - 300;
        zongji.text = "总计：";
        _this.addChild(zongji);
        var txtZongji = new egret.TextField();
        txtZongji.x = zongji.x + 90;
        txtZongji.y = StageUtils.SH - 300;
        txtZongji.textColor = 0xffb680;
        _this.addChild(txtZongji);
        var zongjia = new egret.TextField();
        zongjia.x = 325;
        zongjia.y = StageUtils.SH - 300;
        zongjia.text = "总价：";
        _this.addChild(zongjia);
        var txtZongJia = new egret.TextField();
        txtZongJia.x = zongjia.x + 90;
        txtZongJia.y = StageUtils.SH - 300;
        txtZongJia.textColor = 0xffb680;
        _this.addChild(txtZongJia);
        txtZongji.text = "300盒";
        txtZongJia.text = "￥500000.00";
        _this.txtZongJi = txtZongji;
        _this.txtZongJia = txtZongJia;
        _this.getData();
        return _this;
    }
    DetailView.prototype.getData = function () {
        var self = this;
        $.ajax({
            url: Main.USER_INFO_API,
            data: { type: "querysum", ticket: Main.USER_TICKET },
            success: function (data) {
                if (data.result == 0) {
                    self.txtZongJi.text = data.sumcnt + "盒";
                    self.txtZongJia.text = "￥" + data.sumprice;
                    (self.parent).txtName.text = "【账户名：" + data.username + "】";
                    self.setData(data.discount);
                }
                else {
                    PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                }
            },
            error: function () {
                PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
            }, timeout: 8000,
            dataType: "json", async: true, type: "POST",
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    PopManager.showPop("ErrorPop", { url: "resource/assets/asyn/error/error_web.png" });
                }
            }
        });
    };
    DetailView.prototype.setData = function (data) {
        if (data) {
            var index = 0;
            for (var str in data) {
                var item = new DetailItem();
                item.setData(str, data[str]);
                item.x = 0;
                item.y = index * 385;
                this.container.addChild(item);
                index++;
            }
        }
        // var len = data.list.length;
        // for(var i = 0;i<len;i++)
        // {
        // 	var item = new DetailItem();
        // 	item.setData(data.list[i]);
        // 	item.x = 0;
        // 	item.y = i * 385;
        // 	this.container.addChild(item);
        // }
    };
    return DetailView;
}(egret.DisplayObjectContainer));
__reflect(DetailView.prototype, "DetailView");
//# sourceMappingURL=DetailView.js.map