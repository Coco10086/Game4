var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();!function(){function t(e,n,o){function i(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(r)return r(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return i(n||t)},l,l.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}return t}()({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("./script/GameUI"),i=t("./script/GameControl"),r=t("./script/ItemBox"),a=function(){function t(){}return t.init=function(){var t=Laya.ClassUtils.regClass;t("script/GameUI.ts",o["default"]),t("script/GameControl.ts",i["default"]),t("script/ItemBox.ts",r["default"])},t.width=640,t.height=1136,t.scaleMode="fixedwidth",t.screenMode="none",t.alignV="top",t.alignH="left",t.startScene="test/TestScene.scene",t.sceneRoot="",t.debug=!1,t.stat=!1,t.physicsDebug=!1,t.exportSceneToJson=!0,t}();n["default"]=a,a.init()},{"./script/GameControl":3,"./script/GameUI":4,"./script/ItemBox":5}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("./GameConfig"),i=function(){function t(){window.Laya3D?Laya3D.init(o["default"].width,o["default"].height):Laya.init(o["default"].width,o["default"].height,Laya.WebGL),Laya.Physics&&Laya.Physics.enable(),Laya.DebugPanel&&Laya.DebugPanel.enable(),Laya.stage.scaleMode=o["default"].scaleMode,Laya.stage.screenMode=o["default"].screenMode,Laya.URL.exportSceneToJson=o["default"].exportSceneToJson,(o["default"].debug||"true"==Laya.Utils.getQueryString("debug"))&&Laya.enableDebugPanel(),o["default"].physicsDebug&&Laya.PhysicsDebugDraw&&Laya.PhysicsDebugDraw.enable(),o["default"].stat&&Laya.Stat.show(),Laya.alertGlobalError=!0,Laya.ResourceVersion.enable("version.json",Laya.Handler.create(this,this.onVersionLoaded),Laya.ResourceVersion.FILENAME_VERSION)}return t.prototype.onVersionLoaded=function(){Laya.AtlasInfoManager.enable("fileconfig.json",Laya.Handler.create(this,this.onConfigLoaded))},t.prototype.onConfigLoaded=function(){o["default"].startScene&&Laya.Scene.open(o["default"].startScene)},t}();new i},{"./GameConfig":1}],3:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("./GameUI"),i=function(t){function e(){var e=t.call(this)||this;return e.curTargetCount=-1,e.isSuccess=!0,e.started=!1,e._targetQueueList=new Array,e.maxCount=100,e._curClickValue=-1,e._renderIndex=-1,e._index=-1,e}return __extends(e,t),Object.defineProperty(e.prototype,"RenderIndex",{get:function(){return this._renderIndex},set:function(t){this._renderIndex=t,this.lock&&-1!=t&&(t>=this._targetQueueList.length?this.OnRenderEffectComplete():this.OnRenderEffect())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"Index",{get:function(){return this._index},set:function(t){this._index=t,0!=t&&this.OnInputValueAllSuccess()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"ColumnCount",{get:function(){return this._columnCount},set:function(t){this._columnCount!=t&&(o["default"].instance.ResetPosition(t,this.RowCount),this._columnCount=t)},enumerable:!0,configurable:!0}),e.prototype.Init=function(){this.lifeTime=6e6,this._renderGapTime=500,this.Reset()},e.prototype.Reset=function(){this.ColumnCount=2,this.RowCount=2,this.OnInitNextTeamData()},e.prototype.OnStartRender=function(){this._targetQueueList=this.randUnique(1,this.curTargetCount),this._renderTime=.1;for(var t="",e=0;e<this._targetQueueList.length;e++)t+=this._targetQueueList[e]-1+",";o["default"].instance.lblInput.text="Queue："+t},e.prototype.OnInitTargetCount=function(){this._changeFlag?this.ColumnCount++:this.RowCount++},e.prototype.OnInitNextTeamData=function(){this.lock=!0,this.Index=0,this._startTime=Date.now(),this._renderTime=0,this.RenderIndex=-1,this.curTargetCount=this.ColumnCount*this.RowCount,o["default"].instance.OnRenderItemBox(this.curTargetCount,this.ColumnCount,this.RowCount),this._targetQueueList.splice(0,this._targetQueueList.length),this.OnStartRender()},e.prototype.SetCurClickValue=function(t){this._curClickValue=t,this.lock,this.OnSuccess()},e.prototype.OnSuccess=function(){++this.Index},e.prototype.OnError=function(){},e.prototype.RandomInt=function(t,e){return t+Math.floor(Math.random()*(e-t))},e.prototype.onUpdate=function(){this.isSuccess&&this.started&&this.OnRenderUpdate()},e.prototype.OnTimeUpdate=function(){o["default"].instance.OnTimeUpdate(Date.now()-this._startTime)},e.prototype.OnRenderUpdate=function(){if(this.lock){var t=Date.now();this._renderTime>0&&t>this._renderTime&&(++this.RenderIndex,this._renderTime=t+this._renderGapTime)}},e.prototype.OnRenderEffect=function(){var t=this._targetQueueList[this.RenderIndex];o["default"].instance.OnSelectItem(t)},e.prototype.OnRenderEffectComplete=function(){this.lock=!1,o["default"].instance.OnHideSelectItem()},e.prototype.OnInputValueAllSuccess=function(){this.OnInitTargetCount(),this.OnInitNextTeamData(),this._changeFlag=!this._changeFlag},e.prototype.startGame=function(){this.started=!0,this.Init()},e.prototype.stopGame=function(){},e.prototype.randUnique=function(t,e){for(var n=new Array,o=t,i=0;e>=o;o++,i++)n[i]=o;return n.sort(function(){return.5-Math.random()}),n},e.style1="comp/img_bg3.png",e.style2="comp/label.png",e}(Laya.Script);n["default"]=i},{"./GameUI":4}],4:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("./../ui/layaMaxUI"),i=t("./GameControl"),r=t("./ItemBox"),a=Laya.Tween,s=function(t){function e(){var n=t.call(this)||this;return n.itemBoxArray=new Array,e.instance=n,Laya.MouseManager.multiTouchEnabled=!1,n}return __extends(e,t),e.prototype.onEnable=function(){this._control=this.getComponent(i["default"]),this.Init(),this.startGame()},e.prototype.Init=function(){this.lblScore.text="Score: ",this.lblTime.text="Time:"},e.prototype.OnRenderItemBox=function(t,e,n){for(var o=(Math.max(0,t-this.itemBoxArray.length),this.itemBoxArray.length);t>o;o++)this.createBox(o);for(var i=0;i<this.itemBoxArray.length;i++){var r=this.itemBoxArray[i];a.from(r.root,{scaleX:.5,scaleY:.5},100),a.to(r.root,{scaleX:1,scaleY:1},100)}this.ResetPosition(e,n)},e.prototype.OnSelectItem=function(t){this.selectFlag.visible||(this.selectFlag.visible=!0);var e=t-1;a.from(this.selectFlag,{scaleX:.5,scaleY:.5},100),a.to(this.selectFlag,{scaleX:1,scaleY:1},100);var n=this.itemBoxArray[e];this.selectFlag.x=n.root.x,this.selectFlag.y=n.root.y,this.selectFlag.zOrder=10},e.prototype.OnHideSelectItem=function(){this.selectFlag.visible=!1},e.prototype.createBox=function(t){var n=Laya.Pool.getItemByCreateFun("itemBox",this._control.itemBox.create,this._control.itemBox);e.instance.itemBoxs.addChild(n);var o=n.getComponent(r["default"]);o.lblIndex.text=t+"",o.index=t,this.itemBoxArray[t]=o},e.prototype.OnClickItem=function(t){this._control.SetCurClickValue(t)},e.prototype.ResetPosition=function(t,e){for(var n=0,o=0,i=66,r=33,a=(this.itemBoxArray.length,320-r*(t-1)),s=320-r*(e-1),u=0;u<this.itemBoxArray.length;u++){var c=this.itemBoxArray[u],l=a+i*n,h=s+i*o;c.root.x=l,c.root.y=h,++n>=t&&t>0&&(n=0,++o)}},e.prototype.OnTimeUpdate=function(t){var e=Math.floor(t/6e4),n=Math.floor((t-6e4*e)/1e3),o=Math.floor((t-6e4*e-1e3*n)/10);this.lblTime.text="Time:"+(10>e?"0"+e:e)+":"+(10>n?"0"+n:n)+":"+(10>o?"0"+o:o),t+1e4>this._control.lifeTime&&(this.lblTime.color="FF0000")},e.prototype.startGame=function(){this._control.startGame()},e.prototype.stopGame=function(){this._control.stopGame()},e}(o.ui.test.TestSceneUI);n["default"]=s},{"./../ui/layaMaxUI":6,"./GameControl":3,"./ItemBox":5}],5:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("./GameUI"),i=Laya.Tween,r=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.onAwake=function(){this.Init(),this.root.scale},e.prototype.Init=function(){this.root=this.owner,this.owner.on(Laya.Event.CLICK,this,this.onItemClick),this.lblIndex=this.owner.getChildByName("lblIndex")},e.prototype.ChangeStyle=function(t,e){this.root.graphics.clear();var n=Laya.loader.getRes(e);this.root.graphics.drawTexture(n,32,32,64,64)},e.prototype.onItemClick=function(){i.from(this.root,{scaleX:.5,scaleY:.5},100),i.to(this.root,{scaleX:1,scaleY:1},100),o["default"].instance.OnClickItem(this.index)},e.prototype.onDisable=function(){Laya.Pool.recover("itemBox",this.owner)},e}(Laya.Script);n["default"]=r},{"./GameUI":4}],6:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o,i=Laya.Scene,r=Laya.ClassUtils.regClass;!function(t){var e;!function(t){var e=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),this.loadScene("test/TestScene")},e}(i);t.TestSceneUI=e,r("ui.test.TestSceneUI",e)}(e=t.test||(t.test={}))}(o=n.ui||(n.ui={}))},{}]},{},[2]);