var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ErrorCode = (function () {
    function ErrorCode() {
    }
    return ErrorCode;
}());
ErrorCode.TIME_OUT = 999;
ErrorCode.NOT_FOUND = 404;
ErrorCode.SYSTEM_ERROR = 100;
ErrorCode.TICKET_TIME_OUT = 1;
ErrorCode.RECEIVED_SELF = 2;
ErrorCode.RECEIVED_OTHER = 3;
ErrorCode.RECEIVED_ERROR = 4;
__reflect(ErrorCode.prototype, "ErrorCode");
//# sourceMappingURL=ErrorCode.js.map