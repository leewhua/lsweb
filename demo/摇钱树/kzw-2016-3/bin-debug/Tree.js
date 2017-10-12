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
var Tree = (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.count = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Tree.prototype.onAddToStage = function (event) {
        this.tree = Main.createMc("tree1_json", "tree1_png", 'tree');
        this.d1 = Main.createMc("d1_json", "d1_png", 'dmov1');
        this.tree.scaleX = this.tree.scaleY = 2;
        this.d1.scaleX = this.d1.scaleY = 2;
        this.tree.x = -350;
        this.tree.y = -900;
        this.d1.x = -350;
        this.d1.y = -900;
        this.playIndex(0);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    Tree.prototype.playIndex = function (i) {
        while (this.numChildren > 0)
            this.removeChildAt(0);
        if (i == 0) {
            this.addChild(this.tree);
            this.tree.gotoAndStop(0);
            this.now = this.tree;
        }
        else if (i == 1) {
            this.addChild(this.tree);
            this.tree.play();
            this.now = this.tree;
        }
        else if (i == 2) {
            this.addChild(this.d1);
            this.d1.play();
            this.now = this.d1;
        }
        else if (i == 3) {
            this.addChild(this.d1);
            //this.d1.gotoAndStop(this.d1.totalFrames);
            this.now = this.tree;
        }
        else if (i == 4) {
            this.addChild(this.now);
        }
        this.index = i;
        this.count++;
    };
    Tree.prototype.loop = function () {
        if (this.now.currentFrame >= this.now.totalFrames) {
            var i = this.index;
            if (i == 0) {
            }
            else if (i == 1) {
                this.playIndex(0);
            }
            else if (i == 2) {
                this.playIndex(3);
                this.parent.dispatchEvent(new EventObj('event', 'play_end'));
            }
            else if (i == 3) {
            }
            else if (i == 4) {
                this.playIndex(2);
            }
        }
    };
    return Tree;
}(egret.Sprite));
__reflect(Tree.prototype, "Tree");
//# sourceMappingURL=Tree.js.map