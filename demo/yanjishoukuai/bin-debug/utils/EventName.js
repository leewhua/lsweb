var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventName = (function () {
    function EventName() {
    }
    return EventName;
}());
EventName.Start_Game = "1";
EventName.Logo_End = "2";
EventName.Ball_Click = "3";
EventName.Into_Content = "4";
__reflect(EventName.prototype, "EventName");
//# sourceMappingURL=EventName.js.map