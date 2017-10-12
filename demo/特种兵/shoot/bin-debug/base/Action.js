var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Action = (function () {
    function Action() {
    }
    Action.linkTo = function (page, save) {
        if (save === void 0) { save = false; }
        if (save)
            Api.cookie('page', page, { expires: 1 });
        window.location.href = page;
    };
    Action.toCookiePage = function () {
        var ticket = Api.cookie('ticket');
        var page = Api.cookie('page');
        if (Api.user_ticket == ticket && page == "exchange") {
            Action.linkTo(page);
        }
        Api.cookie('ticket', Api.user_ticket, { expires: 1 });
    };
    return Action;
}());
__reflect(Action.prototype, "Action");
//# sourceMappingURL=Action.js.map