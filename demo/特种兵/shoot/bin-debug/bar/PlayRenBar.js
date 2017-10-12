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
var PlayRenBar = (function (_super) {
    __extends(PlayRenBar, _super);
    function PlayRenBar(type, g, a) {
        if (a === void 0) { a = false; }
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.speed = 3;
        _this.nowLab = null;
        _this.lock = false;
        _this.a = true;
        _this.time = 0;
        //////////
        _this.aiStatus = 0;
        _this.toX = 0;
        _this.aiSc = 0;
        _this.gun = g;
        _this.type = type;
        _this.view = new egret.Sprite();
        _this.renSp = new egret.Sprite();
        var sc = 0.8;
        _this.sc = sc;
        _this.view.scaleX = _this.view.scaleY = sc;
        _this.a = a;
        if (a == true) {
        }
        else {
            _this.view.scaleX = -sc;
        }
        _this.renSp.x = -150;
        _this.renSp.y = -300;
        _this.addChild(_this.view);
        if (type < 3) {
            _this.gunSp = Global.createMc("r_g" + g + "_json", "r_g" + g + "_png", "r_g" + g);
            _this.gunSp.x = -150;
            _this.gunSp.y = -300;
            _this.view.addChild(_this.renSp);
            _this.view.addChild(_this.gunSp);
        }
        else {
            _this.gunSp = Global.createMc("r3_json", "r3_png", 'r3_bag');
            _this.ren = Global.createMc("r3_json", "r3_png", 'r3');
            _this.gunSp.x = -150;
            _this.gunSp.y = -300;
            _this.ren.gotoAndStop(0);
            _this.gunSp.gotoAndStop(0);
            _this.renSp.addChild(_this.ren);
            _this.view.addChild(_this.gunSp);
            _this.view.addChild(_this.renSp);
        }
        _this.play("stand");
        return _this;
    }
    PlayRenBar.prototype.removeAll = function (_mc) {
        if (_mc.numChildren > 0)
            _mc.removeChildAt(0);
    };
    PlayRenBar.prototype.play = function (lab) {
        //  console.log("play::" + lab + ":" + this.nowLab);
        var _this1 = this;
        var stand;
        if (this.lock)
            return;
        if (this.nowLab == lab)
            return;
        if (lab == "stand") {
            if (this.type < 3) {
                stand = Global.createBitmapByName("r" + this.type + "_stand_png");
                this.removeAll(this.renSp);
                this.renSp.addChild(stand);
                this.gunSp.gotoAndStop(0);
            }
            else {
                this.ren.gotoAndStop(0);
                if (this.gunSp)
                    this.gunSp.gotoAndStop(0);
            }
        }
        else if (lab == "run") {
            console.log('run');
            if (this.type < 3) {
                var run = Global.createMc("r" + this.type + "_mc_json", "r" + this.type + "_mc_png", 'r' + this.type);
                run.gotoAndPlay(0, -1);
                this.gunSp.gotoAndPlay(0, -1);
                this.removeAll(this.renSp);
                this.renSp.addChild(run);
            }
            else {
                this.ren.gotoAndPlay(0, -1);
                if (this.gunSp)
                    this.gunSp.gotoAndPlay(0, -1);
            }
        }
        else if (lab == "shoot") {
            _this1.play('stand');
            this.lock = true;
            if (this.a) {
                this.dispatchEvent(new EventObj('event', 'right_shoot', true));
            }
            else {
                this.dispatchEvent(new EventObj('event', 'left_shoot', true));
            }
            setTimeout(function () {
                _this1.lock = false;
                _this1.play('stand');
            }, 1000);
        }
        else if (lab == "boom") {
            if (this.a) {
                this.dispatchEvent(new EventObj('event', 'right_boom', true));
            }
            else {
                this.dispatchEvent(new EventObj('event', 'left_boom', true));
            }
            stand = Global.createBitmapByName("r" + this.type + "_stand_png");
            this.removeAll(this.renSp);
            this.renSp.addChild(stand);
            this.gunSp.gotoAndStop(0);
            this.lock = true;
            setTimeout(function () {
                _this1.lock = false;
                _this1.play('stand');
            }, 2000);
        }
        else if (lab == "away") {
            this.aiStatus = 4;
            this.gunSp.stop();
            this.ren.scaleX = -1;
            this.renSp.x = 150;
            this.ren.play(-1);
            this.dispatchEvent(new EventObj('event', 'away', true, false, this.gunSp));
            this.gunSp = null;
        }
        this.nowLab = lab;
    };
    PlayRenBar.prototype.check = function (b) {
        var x = b.x - this.x;
        var y = b.y - this.y;
        //console.log(x,y);
        if (x > -40 && x < 40) {
            if (y > -220 && y < -180) {
                return 3;
            }
            else if (y > -180 && y < 100) {
                return 2;
            }
            else if (y > -100 && y < 0) {
                return 1;
            }
        }
        return 0;
    };
    PlayRenBar.prototype.getBullet = function () {
        var b, x, y;
        if (this.a) {
            b = new BulletBar(-1);
            x = this.x + (57 - 150) * this.sc;
            y = this.y - (300 - 166) * this.sc;
        }
        else {
            b = new BulletBar();
            x = this.x + (150 - 57) * this.sc;
            y = this.y - (300 - 166) * this.sc;
        }
        b.x = x;
        b.y = y;
        return b;
    };
    PlayRenBar.prototype.move = function (m) {
        if (this.lock)
            return;
        var s = this.speed;
        if (this.a) {
            var a = (1150 - 987) / (600 - 473);
            var x = this.x;
            var y;
            if (m == -1) {
                x -= s;
            }
            else if (m == 1) {
                x += s;
            }
            if (x > PlayRenBar.rightX[0]) {
                if (this.aiStatus != 4)
                    x = PlayRenBar.rightX[0];
            }
            else if (x < PlayRenBar.rightX[1]) {
                x = PlayRenBar.rightX[1];
            }
            y = (x - PlayRenBar.rightX[0]) / a + PlayRenBar.initY[1];
            this.x = x;
            this.y = y;
            this.play('run');
        }
        else {
            var a = 186 / -108;
            var x = this.x;
            var y;
            if (m == -1) {
                x -= s;
            }
            else if (m == 1) {
                x += s;
            }
            if (x < PlayRenBar.leftX[0]) {
                x = PlayRenBar.leftX[0];
            }
            else if (x > PlayRenBar.leftX[1]) {
                if (this.aiStatus != 4)
                    x = PlayRenBar.leftX[1];
            }
            y = (x - PlayRenBar.leftX[0]) / a + PlayRenBar.initY[0];
            this.x = x;
            this.y = y;
            this.play('run');
        }
    };
    PlayRenBar.prototype.getScX = function (sc) {
        return (sc * (PlayRenBar.rightX[1] - PlayRenBar.rightX[0]) + PlayRenBar.rightX[0]);
    };
    PlayRenBar.prototype.playAi = function () {
        this.time++;
        if (this.type == 3) {
            if (this.aiStatus != 4 && this.time > 200) {
                this.play("away");
                return;
            }
        }
        if (this.lock)
            return;
        if (this.aiStatus == 0) {
            if (this.aiSc > 0.6) {
                this.aiSc = Math.random();
            }
            else {
                this.aiSc = Math.random() * 0.6 + 0.4;
            }
            this.toX = this.getScX(this.aiSc);
            //console.log("this.toX",this.toX);
            this.aiStatus = 1;
        }
        else if (this.aiStatus == 1) {
            var xx = this.toX - this.x;
            if (Math.abs(xx) < this.speed) {
                this.aiStatus = 2;
            }
            else {
                if (xx > 0) {
                    this.move(1);
                }
                else {
                    this.move(-1);
                }
            }
        }
        else if (this.aiStatus == 2) {
            var r = Math.random();
            if (r > 0.5) {
                if (this.type < 3 && this.aiSc > 0.6) {
                    this.play("shoot");
                    if (Math.random() > 0.8) {
                        this.aiStatus = 0;
                    }
                }
                else {
                    if (Math.random() > 0.8) {
                        this.aiStatus = 0;
                    }
                }
            }
            else if (r > 0.3) {
            }
            else {
                this.aiStatus = 0;
            }
        }
        else if (this.aiStatus == 4) {
            this.move(1);
        }
    };
    return PlayRenBar;
}(egret.Sprite));
PlayRenBar.leftX = [30, 216];
PlayRenBar.initY = [560, 600];
PlayRenBar.rightX = [1150, 987];
__reflect(PlayRenBar.prototype, "PlayRenBar");
//# sourceMappingURL=PlayRenBar.js.map