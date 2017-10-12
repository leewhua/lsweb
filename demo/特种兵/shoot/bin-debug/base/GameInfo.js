var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameInfo = (function () {
    function GameInfo() {
    }
    return GameInfo;
}());
GameInfo.enemy_gun = 0;
GameInfo.play_ren = -1;
GameInfo.hb = 0;
GameInfo.sco = 0;
GameInfo.gun = 0;
GameInfo.level = 1;
GameInfo.guns = [{ type: 0 }];
GameInfo.gunsInshop = [{ type: 1, has: 0 }, { type: 2, has: 0 }, { type: 3, has: 0 }, { type: 4, has: 0 }];
GameInfo.gunSelect = 0;
GameInfo.gunData = [{ type: 0, name: "常规", sco: 0, star: 1, damage: [15, 10, 5], id: 0 },
    { type: 1, name: "幽灵射线", sco: 200, star: 2, damage: [20, 15, 10], id: 0 },
    { type: 2, name: "极速终结者", sco: 500, star: 3, damage: [40, 35, 30], id: 0 },
    { type: 3, name: "Merlin-II", sco: 1000, star: 4, damage: [60, 55, 50], id: 0 },
    { type: 4, name: "艾德曼合金", sco: 2000, star: 5, damage: [80, 75, 70], id: 0 }];
__reflect(GameInfo.prototype, "GameInfo");
//# sourceMappingURL=GameInfo.js.map