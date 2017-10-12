//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingView.prototype.createView = function () {
        // this.textField = new egret.TextField();
        // this.addChild(this.textField);
        // this.textField.textAlign = "center";
        // this.textField.text = "Loading...00/00";
        // StageUtils.centerInParentX(this.textField);
        // this.textField.y = 0;
    };
    LoadingView.prototype.setProgress = function (current, total) {
        // this.textField.text = `Loading...${current}/${total}`;
    };
    LoadingView.prototype.setComplete = function () {
        console.log("setComplete");
        this.txt1 = AssetsUtils.createBitmapByName("p1_title_png");
        StageUtils.centerInParentX(this.txt1);
        this.txt1.y = StageUtils.CH - 240;
        this.addChild(this.txt1);
        this.quan = AssetsUtils.createBitmapByName("p1_but_png");
        StageUtils.centerInParentX(this.quan);
        this.quan.y = StageUtils.CH + 200;
        this.addChild(this.quan);
        this.quan.touchEnabled = true;
        this.quan.addEventListener(egret.TouchEvent.TOUCH_END, this.quanClickHandler, this);
        this.txt2 = AssetsUtils.createBitmapByName("p1_tip_png");
        StageUtils.centerInParentX(this.txt2);
        this.txt2.y = StageUtils.CH + 360;
        // this.txt2.x += 100;
        this.addChild(this.txt2);
        this.showFlash();
    };
    LoadingView.prototype.showFlash = function () {
        this.txt1.y = StageUtils.CH - 240;
        this.txt1.alpha = 0;
        egret.Tween.get(this.txt1).to({ y: this.txt1.y + 20, alpha: 1 }, 300);
        this.quan.y = StageUtils.CH + 200;
        this.quan.alpha = 0;
        egret.Tween.get(this.quan).wait(150).to({ y: this.quan.y + 20, alpha: 1 }, 300);
        this.txt2.y = StageUtils.CH + 360;
        this.txt2.alpha = 0;
        egret.Tween.get(this.txt2).wait(300).to({ y: this.txt2.y + 20, alpha: 1 }, 300);
    };
    LoadingView.prototype.quanClickHandler = function (evt) {
        if (Main.loaded_music) {
            var sound = RES.getRes("loading_click_mp3");
            sound.play(0.8, 1);
        }
        GameDispatcher.instance.dispatchEventWith(EventName.Start_Game);
    };
    return LoadingView;
}(egret.Sprite));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingView.js.map