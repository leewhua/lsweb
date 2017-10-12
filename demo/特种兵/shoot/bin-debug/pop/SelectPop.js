var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var SelectPop = (function (_super) {
    __extends(SelectPop, _super);
    function SelectPop() {
        var _this = _super.call(this) || this;
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    SelectPop.prototype.eventHandler = function (event) {
        console.log("eventHandler:" + event.name);
        switch (event.name) {
            case 'select_ren':
                GameInfo.play_ren = event.data;
                this.dispatchEvent(new EventObj('event', 'to_setting', true));
                //  Api.load("save role",Api.user_api_url,{ ticket: Api.user_ticket,role_id: GameInfo.play_ren+1 },this);
                event.stopPropagation();
                break;
            case 'active_ren':
                //console.log('active_ren:'+event.currentTarget,event.target);
                var r = event.data;
                for (var i = 0; i < this.rens.length; i++) {
                    if (i == r) {
                        this.rens[i].active(true);
                    }
                    else {
                        this.rens[i].active(false);
                    }
                }
                event.stopPropagation();
                break;
        }
        //play_mov
    };
    SelectPop.prototype.show = function (hasDelay) {
        _super.prototype.show.call(this, hasDelay, false);
        var tip = Global.createBitmapByName('r_s_tip_png', -172, 250);
        var s1 = new SelectRenBar(0);
        var s2 = new SelectRenBar(1);
        var s3 = new SelectRenBar(2);
        this.rens = [s1, s2, s3];
        s1.x = -362;
        s2.x = -8;
        s3.x = 376;
        s1.y = s2.y = s3.y = 20;
        this.view.addChild(tip);
        this.view.addChild(s1);
        this.view.addChild(s2);
        this.view.addChild(s3);
    };
    return SelectPop;
}(PopView));
__reflect(SelectPop.prototype, "SelectPop");
//# sourceMappingURL=SelectPop.js.map