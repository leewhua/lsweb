var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemBox = (function (_super) {
    __extends(ItemBox, _super);
    function ItemBox() {
        return _super.call(this) || this;
    }
    ItemBox.prototype.init = function (type, dir) {
        if (dir === void 0) { dir = 1; }
        this.type = type;
        this.dir = dir;
        this.icon = Global.createBitmapByName("box_" + this.type + "_png");
        this.addChild(this.icon);
        this.setRotate(this.dir);
    };
    ItemBox.prototype.changeDir = function () {
        this.dir++;
        if (this.dir > 4) {
            this.dir = 1;
        }
        this.setRotate(this.dir);
    };
    ItemBox.prototype.preDir = function () {
        var dir = this.dir;
        dir++;
        if (dir > 4) {
            dir = 1;
        }
        return this.preRotate(dir);
    };
    ItemBox.prototype.refreshPos = function (x, y) {
        this.px = x;
        this.py = y;
        this.x = TetrisGame.size * this.px;
        this.y = TetrisGame.size * this.py;
    };
    ItemBox.prototype.preRotate = function (dir) {
        var type = this.type;
        if (type == 1) {
            //方块
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0]
            ];
        }
        else if (type == 2) {
            //竖条
            if (dir == 1 || dir == 3) {
                return [
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0]
                ];
            }
            else {
                return [
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
            }
        }
        else if (type == 3) {
            //反L
            if (dir == 1) {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 1, 1, 0]
                ];
            }
            else if (dir == 2) {
                return [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0]
                ];
            }
            else if (dir == 3) {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 1, 0]
                ];
            }
            else {
                return [
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0]
                ];
            }
        }
        else if (type == 4) {
            //丁字
            if (dir == 1) {
                return [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0]
                ];
            }
            else if (dir == 2) {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 1, 0, 0]
                ];
            }
            else if (dir == 3) {
                return [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0]
                ];
            }
            else {
                return [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0]
                ];
            }
        }
        else if (type == 5) {
            //反Z
            if (dir == 1 || dir == 3) {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [1, 1, 0, 0]
                ];
            }
            else {
                return [
                    [0, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0]
                ];
            }
        }
        else if (type == 6) {
            //正Z
            if (dir == 1 || dir == 3) {
                return [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [1, 1, 0, 0],
                    [1, 0, 0, 0]
                ];
            }
            else {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 1, 0]
                ];
            }
        }
        else if (type == 7) {
            //正L
            if (dir == 1) {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [1, 1, 1, 0]
                ];
            }
            else if (dir == 2) {
                return [
                    [0, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ];
            }
            else if (dir == 3) {
                return [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [1, 0, 0, 0]
                ];
            }
            else {
                return [
                    [0, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 0, 0, 0],
                    [1, 1, 0, 0]
                ];
            }
        }
    };
    ItemBox.prototype.setRotate = function (dir) {
        var type = this.type;
        if (type == 1) {
            //方块
            this.list = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 1, 2, 0],
                [0, 3, 4, 0]
            ];
            this.icon.x = TetrisGame.size;
            this.icon.y = TetrisGame.size * 2;
            this.icon.rotation = 0;
        }
        else if (type == 2) {
            //竖条
            if (dir == 1 || dir == 3) {
                this.list = [
                    [1, 0, 0, 0],
                    [2, 0, 0, 0],
                    [3, 0, 0, 0],
                    [4, 0, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = 0;
                this.icon.rotation = 0;
            }
            else {
                this.list = [
                    [1, 2, 3, 4],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size;
                this.icon.rotation = -90;
            }
        }
        else if (type == 3) {
            //反L
            if (dir == 1) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 0, 0, 0],
                    [2, 3, 4, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 2;
                this.icon.rotation = 0;
            }
            else if (dir == 2) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 4, 0, 0],
                    [0, 3, 0, 0],
                    [1, 2, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -90;
            }
            else if (dir == 3) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [4, 3, 2, 0],
                    [0, 0, 1, 0]
                ];
                this.icon.x = TetrisGame.size * 3;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -180;
            }
            else {
                this.list = [
                    [0, 0, 0, 0],
                    [2, 1, 0, 0],
                    [3, 0, 0, 0],
                    [4, 0, 0, 0]
                ];
                this.icon.x = TetrisGame.size * 2;
                this.icon.y = TetrisGame.size;
                this.icon.rotation = -270;
            }
        }
        else if (type == 4) {
            //丁字
            if (dir == 1) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [2, 3, 0, 0],
                    [0, 4, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size;
                this.icon.rotation = 0;
            }
            else if (dir == 2) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [1, 3, 4, 0],
                    [0, 2, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -90;
            }
            else if (dir == 3) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 4, 0, 0],
                    [0, 3, 2, 0],
                    [0, 1, 0, 0]
                ];
                this.icon.x = TetrisGame.size * 3;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -180;
            }
            else {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 2, 0, 0],
                    [4, 3, 1, 0],
                    [0, 0, 0, 0]
                ];
                this.icon.x = TetrisGame.size * 3;
                this.icon.y = TetrisGame.size;
                this.icon.rotation = -270;
            }
        }
        else if (type == 5) {
            //反Z
            if (dir == 1 || dir == 3) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 1, 2, 0],
                    [3, 4, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 2;
                this.icon.rotation = 0;
            }
            else {
                this.list = [
                    [0, 0, 0, 0],
                    [2, 0, 0, 0],
                    [1, 4, 0, 0],
                    [0, 3, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -90;
            }
        }
        else if (type == 6) {
            //正Z
            if (dir == 1 || dir == 3) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [2, 3, 0, 0],
                    [4, 0, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size;
                this.icon.rotation = 0;
            }
            else {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [4, 2, 0, 0],
                    [0, 3, 1, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -90;
            }
        }
        else if (type == 7) {
            //正L
            if (dir == 1) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [2, 3, 4, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 2;
                this.icon.rotation = 0;
            }
            else if (dir == 2) {
                this.list = [
                    [0, 0, 0, 0],
                    [1, 4, 0, 0],
                    [0, 3, 0, 0],
                    [0, 2, 0, 0]
                ];
                this.icon.x = 0;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -90;
            }
            else if (dir == 3) {
                this.list = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [4, 3, 2, 0],
                    [1, 0, 0, 0]
                ];
                this.icon.x = TetrisGame.size * 3;
                this.icon.y = TetrisGame.size * 4;
                this.icon.rotation = -180;
            }
            else {
                this.list = [
                    [0, 0, 0, 0],
                    [2, 0, 0, 0],
                    [3, 0, 0, 0],
                    [4, 1, 0, 0]
                ];
                this.icon.x = TetrisGame.size * 2;
                this.icon.y = TetrisGame.size;
                this.icon.rotation = -270;
            }
        }
    };
    ItemBox.prototype.getButtomIndex = function () {
        var len = this.list.length;
        for (var i = len - 1; i >= 0; i--) {
            var itemList = this.list[i];
            var itemLen = itemList.length;
            for (var j = 0; j < itemLen; j++) {
                if (itemList[j] == 1) {
                    console.log(this.py + i);
                    return this.py + i;
                }
            }
        }
        console.log(0);
        return 0;
    };
    return ItemBox;
}(egret.DisplayObjectContainer));
__reflect(ItemBox.prototype, "ItemBox");
//# sourceMappingURL=ItemBox.js.map