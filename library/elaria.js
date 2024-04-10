!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.elaria=e():t.elaria=e()}(this,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{AnchorsPreset:()=>u,AnimatedSprite:()=>x,Animation:()=>b,AudioSource:()=>m,Button:()=>P,Component:()=>h,Debug:()=>R,Ease:()=>w,Game:()=>r,GameObject:()=>d,Graphic:()=>S,Input:()=>a,LoopType:()=>g,RectTransform:()=>l,SceneDescription:()=>n,SceneManager:()=>o,Sprite:()=>v,SpriteSheet:()=>y,Text:()=>O,Transform:()=>c,Tween:()=>p,UIImage:()=>M,Vector2D:()=>i,WorldText:()=>C});class i{constructor(t,e){this.x=t||0,this.y=e||0}static zero=Object.freeze(new i(0,0));static one=Object.freeze(new i(1,1));add(t,e=void 0){return void 0===e?new i(this.x+t.x,this.y+t.y):new i(this.x+t,this.y+e)}sub(t){return new i(this.x-t.x,this.y-t.y)}setX(t){return new i(t,this.y)}setY(t){return new i(this.x,t)}mul(t,e){if(void 0===e){if(!(t instanceof i))throw new Error("Argument must be a Vector2D");return new i(this.x*t.x,this.y*t.y)}if("number"!=typeof t||"number"!=typeof e)throw new Error("Arguments must be numbers");return new i(this.x*t,this.y*e)}mulScalar(t){if("number"!=typeof t)throw console.log(t),new Error("Argument must be a number");return new i(this.x*t,this.y*t)}divScalar(t){if("number"!=typeof t)throw new Error("Argument must be a number");if(0===t)throw new Error("Division by zero is not allowed.");return new i(this.x/t,this.y/t)}rotate(t){const e=Math.cos(t),s=Math.sin(t),n=this.x*e-this.y*s,o=this.x*s+this.y*e;return new i(n,o)}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}toString(){return`(${this.x}, ${this.y})`}clone(){return new i(this.x,this.y)}}class s{#t="";#e=[];constructor(t){this.#t=t,this._container={parent:null,position:i.zero,rotation:0,localRotation:0,localPosition:i.zero,localScale:i.one,_children:[]}}get name(){return this.#t}addGameObject(t){this.#e.push(t)}removeGameObject(t){const e=this.#e.indexOf(t);e>-1&&this.#e.splice(e,1)}update(t){for(const e of this.#e)e._update(t)}render(){for(const t of this._container._children)t.gameObject._render()}destroy(){for(const t of this.#e)t._destroy()}}class n{#i;constructor(t="New Scene"){this._scene=null,this.#i=t}build(){}create(){return this._scene=new s(this.#i),this._scene}}class o{static#s=[];static#n;static get activeScene(){return this.#n}static registerScene(t){if(!(t instanceof n))throw new Error("Scene must be an instance of SceneDescription");this.#s.push(t)}static loadScene(t){if(t<0||t>=this.#s.length)throw new Error("Invalid scene index");this.#n=this.#s[t].create(),this.#s[t].build()}}class a{#o=new Set;#a=new Set;#r=new Set;#h={x:0,y:0};#c={0:!1,1:!1,2:!1};#l={0:!1,1:!1,2:!1};#u={0:!1,1:!1,2:!1};#d=!1;#m=!1;static#p;constructor(){document.addEventListener("keydown",(t=>{this.#o.has(t.code)||(this.#a.add(t.code),this.#o.add(t.code))})),document.addEventListener("keyup",(t=>{this.#o.delete(t.code),this.#r.add(t.code)})),r.canvas.addEventListener("mousemove",(t=>{this.#h=this.#f(r.canvas,t)})),r.canvas.addEventListener("mousedown",(t=>{this.#l[t.button]||(this.#c[t.button]=!0,this.#l[t.button]=!0)})),r.canvas.addEventListener("mouseup",(t=>{this.#c[t.button]=!1,this.#l[t.button]=!1,this.#u[t.button]=!0})),r.canvas.addEventListener("wheel",(t=>{t.preventDefault(),t.deltaY<0?this.#d=!0:this.#m=!0})),r.canvas.addEventListener("mousewheel",(t=>{t.preventDefault()})),r.canvas.oncontextmenu=function(t){t.preventDefault(),t.stopPropagation()},a.#p=this}#f(t,e){const i=t.getBoundingClientRect();return{x:e.clientX-i.left,y:e.clientY-i.top}}static update(){a.#p.#a.clear(),a.#p.#r.clear(),a.#p.#c={left:!1,middle:!1,right:!1},a.#p.#u={left:!1,middle:!1,right:!1},a.#p.#d=!1,a.#p.#m=!1}static isKeyHold(t){return a.#p.#o.has(t)}static isKeyDown(t){return a.#p.#a.has(t)}static isKeyUp(t){return a.#p.#r.has(t)}static get mousePosition(){return a.#p.#h}static isMouseDown(t){return a.#p.#c[t]}static isMouseHold(t){return a.#p.#l[t]}static isMouseUp(t){return a.#p.#u[t]}static isMouseScrollUp(){return a.#p.#d}static isMouseScrollDown(){return a.#p.#m}}class r{static#p;#g=0;#n;#w;#v;#x;#b;get fps(){return this.#b}constructor(t){this.#n=null,this.#w=t,this.#w.width=this.#w.clientWidth,this.#w.height=this.#w.clientHeight,new ResizeObserver((()=>{this.#v=!0})).observe(this.#w),r.#p=this}static get instance(){return r.#p}#y(){this.#C()}#C(){let t=performance.now();const e=i=>{this.#S(),this.#P(),this.#g=(i-t)/1e3,t=i,this.#b=1/this.#g,window.requestAnimationFrame(e)};window.requestAnimationFrame(e)}#S(){this.#n&&(this.#n.update(this.#g),a.update()),this.#n!==o.activeScene&&(null!=this.#n&&this.#n.destroy(),this.#n=o.activeScene)}#P(){if(this.#n){if(this.#v)this.#w.width=this.#w.clientWidth,this.#w.height=this.#w.clientHeight,this.#v=!1;else{const{width:t,height:e}=this.#w;this.#w.getContext("2d").clearRect(0,0,t,e)}this.#n.render()}}static get canvas(){return r.#p.#w}start(t){t?o.loadScene(t):o.loadScene(0),this.#x=new a,this.#y()}}class h{_gameObject=null;_transform=null;get transform(){return this._transform}get gameObject(){return this._gameObject}addComponent(t,e={}){return this._gameObject.addComponent(t,e)}getComponent(t){return this._gameObject.getComponent(t)}removeComponent(t){return this._gameObject.removeComponent(t)}clone(){return new this.constructor}awake(){}start(){}onEnable(){}onDisable(){}onDestroy(){}update(t){}render(t){}}class c extends h{#M=null;#O=i.zero;#T=0;#R=i.one;_init(){this._children=[],this.setParent(null)}get transform(){return this}get position(){if(null==this.#M)return this.#O;const t=this.#M.position,e=this.#M.rotation,i=this.#O.rotate(e);return t.add(i)}set position(t){if(null==this.#M)this.localPosition=t;else{const e=this.#M.position;this.localPosition=t.sub(e).rotate(-this.#M.rotation)}}get positionX(){return this.position.x}set positionX(t){this.position=this.position.setX(t)}get positionY(){return this.position.y}set positionY(t){this.#O=this.position.setY(t)}get localPosition(){return this.#O}set localPosition(t){this.#O=t}get localPositionX(){return this.#O.x}set localPositionX(t){this.#O=this.#O.setX(t)}get localPositionY(){return this.#O.y}set localPositionY(t){this.#O=this.#O.setY(t)}get rotation(){return null!=this.parent?this.parent.rotation+this.localRotation:this.localRotation}set rotation(t){this.localRotation=null!=this.parent?t-this.parent.rotation:t}get localRotation(){return this.#T}set localRotation(t){this.#T=t}get localScale(){return this.#R}set localScale(t){this.#R=t}get children(){return this._children}get parent(){return this.#M===this.gameObject.scene._container?null:this.#M}set parent(t){this.setParent(t,!0)}setParent(t,e=!0){if(null!==t&&!(t instanceof c))throw new Error("Parent must be an instance of Transform or null.");if(t===this)return;const s=this.#M;null!==s&&s._children.splice(s._children.indexOf(this),1);const n=this.position,o=this.rotation;this.#M=null==t?this.gameObject.scene._container:t,this.#M._children.push(this),e&&null!==s&&(this.position=n,this.rotation=o,this.localScale=new i(this.localScale.x*s.localScale.x/this.#M.localScale.x,this.localScale.y*s.localScale.y/this.#M.localScale.y))}setSiblingIndex(t){const e=this.#M._children;if(t<0||t>=e.length)throw new Error(`Invalid sibling index - ${t}! The object has ${e.length} children.`);const i=e.splice(e.indexOf(this),1)[0];e.splice(t,0,i)}getSiblingIndex(){return this.#M._children.indexOf(this)}getChild(t){if(t<0||t>=this._children.length)throw new Error(`Invalid child index - ${t}! The object has ${this._children.length} children.`);return this._children[t]}cloneTo(t,e){t.position=this.position,t.rotation=this.rotation,t.localScale=this.localScale,e instanceof c&&(t.parent=e);for(const e of this.children)d.instantiate(e.gameObject,t)}onDestroy(){let t;t=null===this.#M?this.gameObject.scene._container._children:this.#M._children,t.splice(t.indexOf(this),1)}}class l extends c{#E=100;#j=100;#A=new i(.5,.5);#F=new i(.5,.5);#I=new i(.5,.5);#_=new i(-50,-50);#D=new i(50,50);#k=new i(0,0);#z=!0;#V=!0;get width(){return this.#E}set width(t){this.#E=t,this.#z=!0,this.#V=!0}get height(){return this.#j}set height(t){this.#j=t,this.#z=!0,this.#V=!0}get pivot(){return this.#A}set pivot(t){this.#A=t}get anchorMin(){return this.#F}set anchorMin(t){this.#F=t,this.#V=!0}get anchorMax(){return this.#I}set anchorMax(t){this.#I=t,this.#V=!0}get offsetMin(){return this.#_}set offsetMin(t){this.#_=t,this.#z=!0}get offsetMax(){return this.#D}set offsetMax(t){this.#D=t,this.#z=!0}get anchoredPosition(){return this.#k}set anchoredPosition(t){this.#k=t;const e=this.#L(),i=this.anchorMin.mul(e.parentSize),s=this.anchorMax.mul(e.parentSize),n=i.add(s).divScalar(2);super.localPosition=n.add(t).sub(e.parentPivotInRectangleSpace),this.#V=!0}get localPosition(){return super.localPosition}set localPosition(t){super.localPosition=t,this.recalculateOffsets()}#L(){if(null!=this.parent&&!(this.parent instanceof l))throw new Error(`Parent ${this.parent.gameObject.name} of ${this.gameObject.name} RectTransform should also have a RectTransform component`);const t=this.parent?this.parent.width:r.canvas.width,e=this.parent?this.parent.height:r.canvas.height,s=this.parent?this.parent.pivot:new i(0,0),n=s.mul(t,e);return{parentSize:new i(t,e),parentWidth:t,parentHeight:e,parentPivot:s,parentPivotInRectangleSpace:n}}setParent(t,e=!0){super.setParent(t,e),t!==this&&this.recalculateOffsets()}setAnchors(t,e=!0){let s=i.zero,n=i.zero,o=i.zero;switch(t){case u.fullRect:this.anchorMin=new i(0,0),this.anchorMax=new i(1,1),s=new i(0,0),n=new i(0,0);break;case u.topLeft:this.anchorMin=new i(0,0),this.anchorMax=new i(0,0),o=new i(this.width/2,this.height/2),s=new i(0,0),n=new i(this.width,this.height);break;case u.topRight:this.anchorMin=new i(1,0),this.anchorMax=new i(1,0),o=new i(-this.width/2,this.height/2),s=new i(-this.width,0),n=new i(0,this.height);break;case u.bottomRight:this.anchorMin=new i(1,1),this.anchorMax=new i(1,1),o=new i(-this.width/2,-this.height/2),s=new i(-this.width,-this.height),n=new i(0,0);break;case u.bottomLeft:this.anchorMin=new i(0,1),this.anchorMax=new i(0,1),o=new i(this.width/2,-this.height/2),s=new i(0,-this.height),n=new i(this.width,0);break;case u.centerLeft:this.anchorMin=new i(0,.5),this.anchorMax=new i(0,.5),o=new i(this.width/2,0),s=new i(0,-this.height/2),n=new i(this.width,this.height/2);break;case u.centerTop:this.anchorMin=new i(.5,0),this.anchorMax=new i(.5,0),o=new i(0,this.height/2),s=new i(-this.width/2,0),n=new i(this.width/2,this.height);break;case u.centerRight:this.anchorMin=new i(1,.5),this.anchorMax=new i(1,.5),o=new i(-this.width/2,0),s=new i(-this.width,-this.height/2),n=new i(0,this.height/2);break;case u.centerBottom:this.anchorMin=new i(.5,1),this.anchorMax=new i(.5,1),o=new i(0,-this.height/2),s=new i(-this.width/2,-this.height),n=new i(this.width/2,0);break;case u.center:this.anchorMin=new i(.5,.5),this.anchorMax=new i(.5,.5),o=new i(0,0),s=new i(-this.width/2,-this.height/2),n=new i(this.width/2,this.height/2);break;case u.leftWide:this.anchorMin=new i(0,0),this.anchorMax=new i(0,1),o=new i(this.width/2,0),s=new i(0,0),n=new i(this.width,0);break;case u.topWide:this.anchorMin=new i(0,0),this.anchorMax=new i(1,0),o=new i(0,this.height/2),s=new i(0,0),n=new i(0,this.height);break;case u.rightWide:this.anchorMin=new i(1,0),this.anchorMax=new i(1,1),o=new i(-this.width/2,0),s=new i(-this.width,0),n=new i(0,0);break;case u.bottomWide:this.anchorMin=new i(0,1),this.anchorMax=new i(1,1),o=new i(0,-this.height/2),s=new i(0,-this.height),n=new i(0,0);break;case u.vCenterWide:this.anchorMin=new i(.5,0),this.anchorMax=new i(.5,1),o=new i(0,0),s=new i(-this.width/2,0),n=new i(this.width/2,0);break;case u.hCenterWide:this.anchorMin=new i(0,.5),this.anchorMax=new i(1,.5),o=new i(0,0),s=new i(0,-this.height/2),n=new i(0,this.height/2)}if(e)this.offsetMin=s,this.offsetMax=n,this.anchoredPosition=o,this.recalculateRect(),this.#z=!1;else{const t=this.#L(),e=this.anchorMin.mul(t.parentSize),i=this.anchorMax.mul(t.parentSize),s=e.add(i).divScalar(2);this.anchoredPosition=this.localPosition.add(t.parentPivotInRectangleSpace).sub(s),this.recalculateOffsets(),this.#V=!1}}recalculateOffsets(){const t=this.#L(),e=this.anchorMin.mul(t.parentSize),i=this.anchorMax.mul(t.parentSize),s=this.pivot.mul(this.width,this.height),n=this.localPosition.add(t.parentPivotInRectangleSpace);this.offsetMin=n.sub(s).sub(e),this.offsetMax=e.add(this.offsetMin).add(this.width,this.height).sub(i)}recalculateRect(){const t=this.#L(),e=this.anchorMin.mul(t.parentSize),i=this.anchorMax.mul(t.parentSize);this.#E=i.x+this.offsetMax.x-(e.x+this.offsetMin.x),this.#j=i.y+this.offsetMax.y-(e.y+this.offsetMin.y);const s=e.add(i).divScalar(2);super.localPosition=s.add(this.anchoredPosition).sub(t.parentPivotInRectangleSpace),this.#H(),this.#z=!1}#H(){for(const t of this.children)t instanceof l&&t.recalculateRect()}awake(){this.recalculateOffsets()}update(t){this.#V&&(this.#V=!1,this.recalculateOffsets()),this.#z&&(this.#z=!1,this.#H())}cloneTo(t,e){super.cloneTo(t,e),t.width=this.width,t.height=this.height,t.pivot=this.pivot.clone(),t.anchorMin=this.anchorMin.clone(),t.anchorMax=this.anchorMax.clone()}}const u=Object.freeze({fullRect:0,topLeft:1,topRight:2,bottomRight:3,bottomLeft:4,centerLeft:5,centerTop:6,centerRight:7,centerBottom:8,center:9,leftWide:10,topWide:11,rightWide:12,bottomWide:13,vCenterWide:14,hCenterWide:15});class d{#W=!1;#G=!1;#Y=!1;#$=!1;#X=!0;#B=!1;#K;#U;constructor(t,e=!1){this.name=t||"GameObject",this.components=[],this.#K=this.addComponent(e?l:c),this.#U=o.activeScene,o.activeScene.addGameObject(this),this.#K._init()}get transform(){return this.#K}get scene(){return this.#U}get activeSelf(){return this.#X}get isDestroyed(){return this.#B}_update(t){if(!this.#W){this.#W=!0;for(const t of this.components)t.awake()}if(this.activeSelf&&!this.#Y){this.#Y=!0;for(const t of this.components)t.onEnable()}if(!this.activeSelf&&!this.#$){this.#$=!0;for(const t of this.components)t.onDisable()}if(this.#G)for(const e of this.components)e.update(t);else{this.#G=!0;for(const t of this.components)t.start()}}_render(){if(!this.#G||!this.activeSelf)return;const t=r.canvas.getContext("2d");t.save();const e=this.transform.parent?.localScale.x||1,i=this.transform.parent?.localScale.y||1,s=Math.PI/180;t.translate(this.transform.localPosition.x/e,this.transform.localPosition.y/i),t.rotate(this.transform.localRotation*s),t.scale(this.transform.localScale.x,this.transform.localScale.y);for(const e of this.components)e.render(t);for(const t of this.transform.children)t.gameObject._render();t.restore()}_destroy(){for(const t of this.transform.children)d.destroy(t.gameObject);for(const t of this.components)this.activeSelf&&t.onDisable(),t.onDestroy();this.#B=!0}setActive(t){this.#X!==t&&(this.#X=t,t?this.#Y=!1:this.#$=!1)}addComponent(t,e={}){let i;if(t instanceof h)i=t;else{if(!(t.prototype instanceof h))throw new Error("The added component must be an instance of Component.");if(t.prototype instanceof c&&null!=this.#K)throw new Error("Transform always exists in a GameObject, you don't need to add it by yourself!");i=new t}i._gameObject=this,i._transform=this.transform;for(const s of Object.keys(e))s in i?i[s]=e[s]:console.log("Parameter <"+s+"> is not a valid property of "+t.name+" component.");return this.components.push(i),i}getComponent(t){return this.components.find((e=>e instanceof t))}removeComponent(t){if(t.prototype instanceof c)console.log("Transform component cannot be removed!");else for(let e=0;e<this.components.length;e++)if(this.components[e]instanceof t)return void this.components.splice(e,1)}toString(){let t=`GameObject: ${this.name}\n`;t+=`Active: ${this.activeSelf}\n`,t+=`Destroyed: ${this.isDestroyed}\n`,t+="Components:\n";for(const e of this.components)t+=`- ${e.constructor.name}\n`;t+="Children:";for(const e of this.transform.children)t+=`\n- ${e.gameObject.name}`;return 0===this.transform.children.length&&(t+=" None\n"),t}static instantiate(t,e=null){if(!(t instanceof d))throw new Error("Only GameObjects can be instantiated!");const i=new d(t.name+"_clone");for(const e of t.components)e instanceof c||i.addComponent(e.clone());return t.transform.cloneTo(i.transform,e),i}static destroy(t){if(!(t instanceof d))throw new Error("Only gameObjects can be destroyed!");o.activeScene.removeGameObject(t),t._destroy()}static dontDestroyOnLoad(t){}}class m extends h{#q=new Audio;get source(){return this.#q.src}set source(t){this.#q.src=t}get loop(){return this.#q.loop}set loop(t){this.#q.loop=t}get audio(){return this.#q}play(){this.#q.play()}pause(){this.#q.pause()}awake(){}render(){}clone(){const t=super.clone();return t.source=this.source,t.loop=this.loop,t}}class p{#Q;#N;#J=0;#Z=0;#tt=0;#et=0;#it=g.restart;#st=p.lerpNumberFunction;#nt=w.linear;#ot;#at;#rt;#ht;#ct=0;#lt;#ut=!1;#dt=!1;#mt=!1;static#pt;static create(t,e,s){if(null==t)throw new Error("From is required");if(null==e)throw new Error("To is required");if(null==s)throw new Error("Duration is required");if(s<0)throw new Error("Duration must be a non-negative value.");if(typeof t!=typeof e)throw new Error("From and To must have the same type");const n=new p;return n.#Q=t,n.#N=e,n.#ht=t,n.#Z=s,n.#mt=!0,t instanceof i&&(n.#st=this.lerpVector2DFunction),p.#pt&&!p.#pt.gameObject.isDestroyed||(p.#pt=new d("TweensContainer").addComponent(f)),p.#pt.registerTween(n),n}get isComplete(){return 1===this.#J}play(){this.#mt=!0}pause(){this.#mt=!1}reset(){this.#J=0,this.#ct=0,this.#lt=-1===this.#et?0:this.#et,this.#ut=!1,this.#dt=!1,this.pause()}bindTo(t){return this.#ot=t,this}setDelay(t,e=!0){return t>=0&&(this.#tt=t),e&&this.#ot&&this.#ot(this.#Q),this}setFrom(t){return t&&(this.#Q=t),this}setEase(t){return t?this.#nt=t:(console.log("Ease function is invalid. Linear is used by default."),this.#nt=w.linear),this}setLoops(t,e=g.restart){return t&&(this.#et=t,this.#lt=-1===this.#et?0:t),this.#it=e,this.#ut=!1,this}setLerpFunction(t){if("function"!=typeof t)throw new Error("Lerp function must be a function");return this.#st=t,this}onStart(t){return this.#at=t,this}onComplete(t){return this.#rt=t,this}update(t){if(this.#mt&&(this.#ct+=t,this.#ct>=this.#tt&&(this.#dt||(this.#dt=!0,this.#at&&this.#at()),this.#J=Math.min(Math.max((this.#ct-this.#tt)/this.#Z,0),1),this.#ht=this.#st(this.#Q,this.#N,this.#nt(this.#ut?1-this.#J:this.#J)),this.#ot&&this.#ot(this.#ht),1===this.#J)))if(-1===this.#et||this.#lt>0)if(this.#lt>0&&(this.#lt-=1),this.#it===g.restart)this.#J=0,this.#ct=this.#tt;else if(this.#it===g.pingPong){const t=this.#Q;this.#Q=this.#N,this.#N=t,this.#J=0,this.#ct=this.#tt}else if(this.#it===g.incremental){const t=this.#N-this.#Q;this.#Q=this.#N,this.#N+=t,this.#J=0,this.#ct=this.#tt}else this.#it===g.rewind&&(this.#J=0,this.#ct=this.#tt,this.#ut=!this.#ut);else this.#rt&&this.#rt()}static lerpNumberFunction(t,e,i){return i*(e-t)+t}static lerpVector2DFunction(t,e,s){return new i(t.x+(e.x-t.x)*s,t.y+(e.y-t.y)*s)}static delay(t){return p.create(0,1,t)}static position(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.position=e))}static positionX(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.positionX=e))}static positionY(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.positionY=e))}static localPosition(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.localPosition=e))}static localPositionX(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.localPositionX=e))}static localPositionY(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.localPositionY=e))}static localRotation(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.localRotation=e))}static localScale(t,e,i,s){return p.create(e,i,s).bindTo((e=>t.localScale=e))}}class f extends h{#ft;constructor(){super(),this.#ft=[]}update(t){for(const e of this.#ft)e.update(t),e.isComplete&&this.#ft.splice(this.#ft.indexOf(e),1)}registerTween(t){this.#ft.push(t)}}const g=Object.freeze({restart:0,pingPong:1,incremental:2,rewind:3}),w=Object.freeze({linear:t=>t,inSine:t=>1-Math.cos(t*Math.PI/2),outSine:t=>Math.sin(t*Math.PI/2),inOutSine:t=>-(Math.cos(Math.PI*t)-1)/2,inQuad:t=>t*t,outQuad:t=>t*(2-t),inOutQuad:t=>t<.5?2*t*t:(4-2*t)*t-1,inCubic:t=>t*t*t,outCubic:t=>1-Math.pow(1-t,3),inOutCubic:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,inQuart:t=>t*t*t*t,outQuart:t=>1-Math.pow(1-t,4),inOutQuart:t=>t<.5?8*t*t*t*t:1-Math.pow(-2*t+2,4)/2,inQuint:t=>t*t*t*t*t,outQuint:t=>1-Math.pow(1-t,5),inOutQuint:t=>t<.5?16*t*t*t*t*t:1-Math.pow(-2*t+2,5)/2,inExpo:t=>Math.pow(2,10*(t-1)),outExpo:t=>1-Math.pow(2,-10*t),inOutExpo:t=>0===t||1===t?t:t<.5?Math.pow(2,20*t-10)/2:(2-Math.pow(2,-20*t+10))/2,inCirc:t=>1-Math.sqrt(1-t*t),outCirc:t=>Math.sqrt(1-Math.pow(t-1,2)),inOutCirc:t=>t<.5?(1-Math.sqrt(1-Math.pow(2*t,2)))/2:(Math.sqrt(1-Math.pow(-2*t+2,2))+1)/2,inBack:t=>2.70158*t*t*t-1.70158*t*t,outBack:t=>1+2.70158*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2),inOutBack:t=>t<.5?Math.pow(2*t,2)*(7.189819*t-2.5949095)/2:(Math.pow(2*t-2,2)*(3.5949095*(2*t-2)+2.5949095)+2)/2,inBounce:t=>1-w.outBounce(1-t),outBounce:t=>t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,inOutBounce:t=>t<.5?(1-w.outBounce(1-2*t))/2:(1+w.outBounce(2*t-1))/2,inElastic:t=>1-w.outElastic(1-t),outElastic:t=>{const e=2*Math.PI/3;return 0===t?0:1===t?1:-Math.pow(2,10*t-10)*Math.sin((10*t-10.75)*e)},inOutElastic:t=>t<.5?(1-w.outElastic(1-2*t))/2:(1+w.outElastic(2*t-1))/2});class v extends h{#gt=new Image;#wt=!1;get image(){return this.#gt}get imageSource(){return this.#gt.src}set imageSource(t){this.#gt.src=t}get width(){return this.#gt.width}set width(t){this.#gt.width=t}get height(){return this.#gt.height}set height(t){this.#gt.height=t}get pixelPerfect(){return this.#wt}set pixelPerfect(t){this.#wt=t}clone(){const t=super.clone();return t.imageSource=this.imageSource,t.width=this.width,t.height=this.height,t.pixelPerfect=this.pixelPerfect,t}render(t){const e=t.imageSmoothingEnabled;t.imageSmoothingEnabled=!this.pixelPerfect,t.drawImage(this.#gt,-this.width/2,-this.height/2,this.width,this.height),t.imageSmoothingEnabled=e}}class x extends v{#ct=0;#vt=0;#xt=!1;#bt=[];addAnimation(t){this.#bt.push(t)}removeAnimation(t){const e=this.#bt.findIndex((e=>e.name===t));return this.#vt===e&&(this.#vt=0),this.#bt.splice(e,1)}playAnimation(t){const e=this.#bt.findIndex((e=>e.name===t));-1!==e?(this.#vt=e,this.#ct=0,this.#xt=!1,this.#bt[this.#vt].resetFramePosition()):console.log(`Animation by name ${t} doesn't exist`)}update(t){if(this.#xt)return;this.#ct+=t;const e=this.#bt[this.#vt];if(this.#ct>=e.timeOnFrame){if(this.#ct=0,e.spriteSheet.isLastFrame&&!e.looped)return this.#xt=!0,void(null!=e.onPlayEnd&&e.onPlayEnd());"forward"===e.direction?e.nextFrame():"backward"===e.direction&&e.prevFrame()}}render(t){const e=t.imageSmoothingEnabled;t.imageSmoothingEnabled=!this.pixelPerfect;const i=this.#bt[this.#vt];t.drawImage(i.image,i.framePosX,i.framePosY,i.frameWidth,i.frameHeight,-this.width/2,-this.height/2,this.width,this.height),t.imageSmoothingEnabled=e}clone(){const t=super.clone();return t.#bt=this.#bt.map((t=>t.clone())),t.#ct=this.#ct,t.#vt=this.#vt,t.#xt=this.#xt,t}}class b{onPlayEnd=null;#gt=null;get image(){return this.#gt}get imageSource(){return this.#gt.src}set imageSource(t){null==this.#gt&&(this.#gt=new Image),this.#gt.src=t}get frameWidth(){return this.spriteSheet.frameWidth}get frameHeight(){return this.spriteSheet.frameHeight}get framePosX(){return this.spriteSheet.framePosX}get framePosY(){return this.spriteSheet.framePosY}constructor(t,e,i,s,n,o){this.name=t,this.imageSource=e,this.spriteSheet=i,this.timeOnFrame=s||.1,this.direction=n||"forward",this.looped=o||!1}resetFramePosition(){this.spriteSheet.resetFramePosition()}prevFrame(){this.spriteSheet.prevFrame()}nextFrame(){this.spriteSheet.nextFrame()}clone(){const t=new b(this.name,this.imageSource,this.spriteSheet.clone(),this.timeOnFrame,this.direction,this.looped);return t.onPlayEnd=this.onPlayEnd,t}}class y{#yt;#Ct;#St;#Pt;#Mt;#Ot=0;get frameWidth(){return this.#yt}set frameWidth(t){this.#yt=t}get frameHeight(){return this.#Ct}set frameHeight(t){this.#Ct=t}get framesCount(){return this.#St}set framesCount(t){this.#St=t}get columns(){return this.#Pt}set columns(t){this.#Pt=t}get startFrom(){return this.#Mt}set startFrom(t){this.#Mt=t}get frameIndex(){return this.#Ot}set frameIndex(t){this.#Ot=t}get isLastFrame(){return this.#Ot===this.#Mt+this.#St-1}get framePosX(){return this.#Ot%this.#Pt*this.#yt}get framePosY(){return Math.floor(this.#Ot/this.#Pt)*this.#Ct}constructor(t,e,i,s,n){this.#yt=t||32,this.#Ct=e||32,this.#St=i||1,this.#Pt=s||1,this.#Mt=n||0,this.#Ot=this.#Mt}resetFramePosition(){this.#Ot=this.#Mt}prevFrame(){this.#Ot--,this.#Ot<this.#Mt&&(this.#Ot=this.#Mt+this.#St-1)}nextFrame(){this.#Ot++,this.#Ot>=this.#Mt+this.#St&&(this.#Ot=this.#Mt)}clone(){return new y(this.#yt,this.#Ct,this.#St,this.#Pt,this.#Mt)}}class C extends h{constructor(){super(),this.text="",this.fontSize=18,this.fontFamily="serif"}render(t){t.save(),t.font=`${this.fontSize}px ${this.fontFamily}`,t.fillText(this.text,0,0),t.restore()}clone(){const t=super.clone();return t.text=this.text,t.fontSize=this.fontSize,t.fontFamily=this.fontFamily,t}}class S extends h{#Tt="rgba(255, 255, 255, 255)";#Rt="rgba(255, 255, 255, 255)";#wt=!1;#Et;#jt;get virtualCanvas(){return this.#Et}get virtualContext(){return this.#jt}constructor(){super(),this.#Et=document.createElement("canvas"),this.#jt=this.#Et.getContext("2d")}get color(){return this.#Tt}set color(t){this.#Tt=t}get tintColor(){return this.#Rt}set tintColor(t){this.#Rt=t}get pixelPerfect(){return this.#wt}set pixelPerfect(t){this.#wt=t}awake(){if(null==this.gameObject.getComponent(l))throw new Error("Can't find RectTransform on GameObject. When creating new GameObject use withTransform boolean flag!")}draw(t,e,i,s,n){}render(t){const e=this.transform,i=e.width,s=e.height;this.#Et.width=i,this.#Et.height=s,this.#jt.imageSmoothingEnabled=!this.#wt,this.#jt.fillStyle=this.color,this.draw(this.#jt,0,0,i,s),this.#jt.globalCompositeOperation="multiply",this.#jt.fillRect(0,0,i,s),null!=this.tintColor&&(this.#jt.fillStyle=this.tintColor,this.#jt.fillRect(0,0,i,s)),this.#jt.globalCompositeOperation="destination-in",this.draw(this.#jt,0,0,i,s),t.drawImage(this.#Et,-i*e.pivot.x,-s*e.pivot.y,i,s)}}class P extends h{#At=null;onClick=null;#Ft=!1;#It=!1;#_t="white";#Dt="grey";#kt;get graphic(){return this.#At}set graphic(t){this.#At=t}get pressedColor(){return this.#_t}set pressedColor(t){this.#_t=t}get hoverColor(){return this.#Dt}set hoverColor(t){this.#Dt=t}awake(){null==this.graphic&&(this.graphic=this.gameObject.getComponent(S)),null==this.graphic?console.log("Graphic component must be on the same object as a Button was."):this.#kt=this.graphic.tintColor}update(t){if(null==this.graphic)return;const e=a.mousePosition,i=this.transform,s=this.getRotatedVertices(i);this.isPointInsideRotatedRect(e,s)?(this.#Ft=!0,a.isMouseDown(0)&&(this.#It=!0),a.isMouseUp(0)&&(this.#It=!1,this.onClick&&this.onClick())):(this.#Ft=!1,a.isMouseUp(0)&&(this.#It=!1)),this.#It?this.graphic.tintColor=this.#_t:this.#Ft?this.graphic.tintColor=this.#Dt:this.graphic.tintColor=null}getRotatedVertices(t){const e=[],i=t.localPositionX-t.width*t.pivot.x,s=t.localPositionY-t.height*t.pivot.y,n=t.width,o=t.height,a=(t.localRotation||t.rotation)*Math.PI/180,r=i+n/2,h=s+o/2,c=Math.sin(a),l=Math.cos(a);return e.push([r+(i-r)*l-(s-h)*c,h+(i-r)*c+(s-h)*l]),e.push([r+(i+n-r)*l-(s-h)*c,h+(i+n-r)*c+(s-h)*l]),e.push([r+(i+n-r)*l-(s+o-h)*c,h+(i+n-r)*c+(s+o-h)*l]),e.push([r+(i-r)*l-(s+o-h)*c,h+(i-r)*c+(s+o-h)*l]),e}isPointInsideRotatedRect(t,e){let i,s,n=!1;const o=e.length;for(i=0,s=o-1;i<o;s=i++)e[i][1]>t.y!=e[s][1]>t.y&&t.x<(e[s][0]-e[i][0])*(t.y-e[i][1])/(e[s][1]-e[i][1])+e[i][0]&&(n=!n);return n}}class M extends S{#gt=new Image;get imageSource(){return this.#gt.src}set imageSource(t){this.#gt.src=t}draw(t,e,i,s,n){null==this.imageSource||""===this.imageSource?t.fillRect(e,i,s,n):t.drawImage(this.#gt,e,i,s,n)}clone(){const t=super.clone();return t.imageSource=this.imageSource,t}}class O extends S{#zt="";#Vt="16px Arial";#Lt="center";#Ht="center";constructor(){super(),super.color="black",super.virtualContext.font=this.#Vt,super.virtualContext.textAlign=this.#Lt,super.virtualContext.textBaseline="center"===this.#Ht?"middle":this.#Ht}get text(){return this.#zt}set text(t){this.#zt=t}get font(){return this.#Vt}set font(t){this.#Vt=t}get horizontalAlign(){return this.#Lt}set horizontalAlign(t){this.#Lt=t}get verticalAlign(){return this.#Ht}set verticalAlign(t){this.#Ht=t}render(t){const e=this.transform,i=e.width,s=e.height;this.virtualCanvas.width=i,this.virtualCanvas.height=s,this.virtualContext.fillStyle=this.color,this.virtualContext.font=this.font,this.virtualContext.textAlign=this.#Lt,this.virtualContext.textBaseline="center"===this.#Ht?"middle":this.#Ht;const n="left"===this.#Lt?0:"center"===this.#Lt?i/2:i,o="top"===this.#Ht?0:"center"===this.#Ht?s/2:s;this.virtualContext.fillText(this.#zt,n,o,i),t.drawImage(this.virtualCanvas,-e.pivot.x*i,-e.pivot.y*s)}clone(){const t=super.clone();return t.text=this.text,t.font=this.font,t.horizontalAlign=this.horizontalAlign,t.verticalAlign=this.verticalAlign,t.color=this.color,t.tintColor=this.tintColor,t.pixelPerfect=this.pixelPerfect,t}}class T{static getObjectHierarchy(t){const e=(t,i)=>{let s=`${"-".repeat(2*i)}${t.gameObject.name}\n`;for(const n of t.children)s+=e(n,i+1);return s};return e(t,0)}static getSceneHierarchy(){if(null!==o.activeScene&&void 0!==o.activeScene){let t="";for(const e of o.activeScene._container._children)t+=T.getObjectHierarchy(e);return t}console.log("No active scene!")}}const R=T;return e})()));