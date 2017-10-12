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

class Main extends egret.DisplayObjectContainer {

    private gameScene:GameScene;

    public static loaded_music:boolean;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        StageUtils.registStage(this.stage);

        this.gameScene = new GameScene();
        this.addChild(this.gameScene);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        // this.addEventListener(egret.Event.RESIZE);
        var self = this;
        window.onorientationchange = function(e)
        {
            if(window.orientation != 0)
            {
                self.gameScene.refreshBg();
                // alert("切换到竖屏体验更佳~"+window.orientation);
            }
        }
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");

    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            

            this.gameScene.setComplete();

            RES.loadGroup("music");



             //创建 URLLoader 对象

            // var loader:egret.URLLoader = new egret.URLLoader();

            // //设置加载方式为声音

            // loader.dataFormat = egret.URLLoaderDataFormat.SOUND;

            // //添加加载完成侦听

            // loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            // loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.error,this);

            // var url: string = "resource/assets/music/bg.mp3";

            // var request:egret.URLRequest = new egret.URLRequest(url);

            // //开始加载

            // loader.load(request);

            

            // this.gameScene.showContent(3);
        }else if(event.groupName == "loading")
        {
            //显示背景
            this.gameScene.showBG();
            

            this.gameScene.showLoading();

            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

            RES.loadGroup("preload");
        }else if(event.groupName == "music")
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            // alert("加载完成");
            Main.loaded_music = true;
            var sound:egret.Sound = RES.getRes("bg_mp3");
            sound.play();
        }
    }

    private onLoadComplete(event):void
    {
        alert("加载完成");
        var loader:egret.URLLoader = <egret.URLLoader>event.target;

        //获取加载到的 Sound 对象

        var sound = <egret.Sound>loader.data;

        // sound.play(0,0); 
        // if(!CommonUtil.isIos()){
        //     this.channel = 
        //     this.isIos = 0;
        // }else{
        //     this.isIos = 1;
        // }
    }

    private error(e):void
    {
        console.log(e);
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void 
    {
        if (event.groupName == "preload") 
        {
            this.gameScene.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
}