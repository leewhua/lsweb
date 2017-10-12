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
var PlayPage = (function (_super) {
    __extends(PlayPage, _super);
    function PlayPage() {
        var _this = _super.call(this) || this;
        _this.played = 0;
        _this.status = 0;
        _this.oldPop = null;
        _this.leftBullets = [];
        _this.rightBullets = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener('event', _this.eventHandler, _this);
        return _this;
    }
    PlayPage.prototype.eventHandler = function (event) {
        console.log("eventHandler:" + event.name);
        switch (event.name) {
            case 'show_game_help':
                this.showPop('help');
                event.stopPropagation();
                break;
            case 'start_321':
                this.showPop('321');
                event.stopPropagation();
                break;
            case 'play':
                this.play();
                event.stopPropagation();
                break;
            case 'win':
                this.toStop('win');
                event.stopPropagation();
                break;
            case 'lost':
                this.toStop('lost');
                event.stopPropagation();
                break;
            case 'hb':
                this.toStop('hb');
                event.stopPropagation();
                break;
            case 'end':
                this.showPop('end');
                event.stopPropagation();
                break;
            case 'start_play':
                this.status = 1;
                event.stopPropagation();
                break;
            case 'close_pop':
                this.closePop();
                event.stopPropagation();
                break;
            case 'left':
                this.move(-1);
                event.stopPropagation();
                break;
            case 'right':
                this.move(1);
                event.stopPropagation();
                break;
            case 'control_end':
                this.leftRen.play('stand');
                event.stopPropagation();
                break;
            case 'shoot':
                this.leftRen.play('shoot');
                event.stopPropagation();
                break;
            case 'left_shoot':
                this.leftShoot();
                //this.rightShoot();
                event.stopPropagation();
                break;
            case 'right_shoot':
                this.rightShoot();
                event.stopPropagation();
                break;
            case 'away':
                var bag = event.data;
                bag.x = bag.x * 0.8 + this.rightRen.x;
                bag.y = bag.y * 0.8 + this.rightRen.y;
                bag.scaleX = bag.scaleY = 0.8;
                this.addChildAt(bag, this.getChildIndex(this.rightRen) - 1);
                var tw = egret.Tween.get(bag);
                var _this1 = this;
                tw.to({ x: 450, y: 170, scaleX: 1, scaleY: 1 }, 2000, egret.Ease.cubicOut);
                tw.call(function () {
                    _this1.dispatchEvent(new EventObj('event', 'hb', true));
                });
                event.stopPropagation();
                break;
            case 'boom':
                this.leftRen.play('boom');
                event.stopPropagation();
                break;
        }
        //play_mov
    };
    PlayPage.prototype.play = function () {
        this.gameSp.touchChildren = true;
        this.status = 1;
    };
    PlayPage.prototype.toStop = function (lab) {
        this.gameSp.touchChildren = false;
        this.status = 2;
        if (lab == "win") {
            this.showPop('win');
        }
        else if (lab == "lost") {
            this.showPop('lost');
        }
        else if (lab == "hb") {
            this.showPop('hb');
        }
    };
    PlayPage.prototype.onAddToStage = function (event) {
        //初始化intro
        var _this1 = this;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = Global.createBitmapByName('p_bg_jpg');
        var road = Global.createBitmapByName('p_road_png');
        var r1 = GameInfo.play_ren;
        var g1 = GameInfo.gun;
        var r2;
        var g2;
        if (GameInfo.hb > 0) {
            r2 = 3;
            g2 = 0;
        }
        else {
            r2 = Math.floor(Math.random() * 3);
            g2 = Math.floor(Math.random() * 5);
        }
        GameInfo.enemy_gun = g2;
        this.gameSp = new egret.Sprite();
        this.leftRen = new PlayRenBar(r1, g1);
        this.rightRen = new PlayRenBar(r2, g2, true);
        this.leftRen.x = PlayRenBar.leftX[0];
        this.leftRen.y = PlayRenBar.initY[0];
        this.rightRen.x = PlayRenBar.rightX[0];
        this.rightRen.y = PlayRenBar.initY[1];
        this.rightRen.play('stand');
        this.leftRen.play('stand');
        this.controlBar = new ControlBar();
        this.shootBar = new ShootBar();
        this.grenadeBar = new GrenadeBar();
        this.mineBar = new MineBar();
        this.enemyBar = new EnemyBar();
        var _this1 = this;
        road.y = 397;
        this.gameSp.touchChildren = false;
        this.addChild(bg);
        this.addChild(this.leftRen);
        this.addChild(this.rightRen);
        this.addChild(road);
        this.addChild(this.gameSp);
        this.gameSp.addChild(this.controlBar);
        this.gameSp.addChild(this.shootBar);
        //this.gameSp.addChild(this.grenadeBar);
        this.addChild(this.mineBar);
        this.addChild(this.enemyBar);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    PlayPage.prototype.move = function (m) {
        //30 560
        //216 452
        this.leftRen.move(m);
    };
    PlayPage.prototype.rightShoot = function () {
        var b = this.rightRen.getBullet();
        this.addChild(b);
        this.rightBullets.push(b);
    };
    PlayPage.prototype.leftShoot = function () {
        var b = this.leftRen.getBullet();
        this.addChild(b);
        this.leftBullets.push(b);
    };
    PlayPage.prototype.checkHit = function () {
        var i;
        var tem = [];
        var b;
        var out;
        for (i = 0; i < this.leftBullets.length; i++) {
            out = false;
            b = this.leftBullets[i];
            if (b.checkOut()) {
                out = true;
            }
            else {
                var k = this.rightRen.check(b);
                if (k) {
                    this.hit(1, k);
                    out = true;
                }
            }
            if (!out) {
                tem.push(b);
            }
            else {
                b.kill();
            }
        }
        this.leftBullets = tem;
        tem = [];
        for (i = 0; i < this.rightBullets.length; i++) {
            out = false;
            b = this.rightBullets[i];
            if (b.checkOut()) {
                out = true;
            }
            else {
                var k = this.leftRen.check(b);
                if (k) {
                    this.hit(0, k);
                    out = true;
                }
            }
            if (!out) {
                tem.push(b);
            }
            else {
                b.kill();
            }
        }
        this.rightBullets = tem;
    };
    PlayPage.prototype.hit = function (t, k) {
        if (t == 0) {
            this.mineBar.hit(k, GameInfo.enemy_gun);
        }
        else {
            this.enemyBar.hit(k, GameInfo.gun);
        }
    };
    PlayPage.prototype.loop = function (e) {
        if (this.status == 0) {
        }
        else if (this.status == 1) {
            this.rightRen.playAi();
            this.checkHit();
        }
        else if (this.status == 2) {
        }
    };
    PlayPage.prototype.closePop = function () {
        var hasOld = false;
        var old = this.oldPop;
        if (old) {
            old.out();
            hasOld = true;
        }
        this.oldPop = null;
        return hasOld;
    };
    PlayPage.prototype.showPop = function (lab) {
        console.log('showpop:' + lab);
        var hasOld = this.closePop();
        if (lab == "help") {
            this.oldPop = new HelpPop();
        }
        else if (lab == "321") {
            this.oldPop = new P321Pop();
        }
        else if (lab == "win") {
            this.oldPop = new WinPop();
        }
        else if (lab == "lost") {
            this.oldPop = new LostPop();
        }
        else if (lab == "hb") {
            this.oldPop = new HbPop();
        }
        else if (lab == "end") {
            this.oldPop = new EndPop();
        }
        this.addChild(this.oldPop);
        this.oldPop.show(hasOld);
    };
    return PlayPage;
}(egret.DisplayObjectContainer));
__reflect(PlayPage.prototype, "PlayPage");
//# sourceMappingURL=PlayPage.js.map