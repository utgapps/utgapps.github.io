var Ny=Object.defineProperty;var Oy=(o,t,i)=>t in o?Ny(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var Ze=(o,t,i)=>Oy(o,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();var Jf={exports:{}},Lo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xg;function Py(){if(xg)return Lo;xg=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,u){var h=null;if(u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),"key"in l){u={};for(var d in l)d!=="key"&&(u[d]=l[d])}else u=l;return l=u.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:u}}return Lo.Fragment=t,Lo.jsx=i,Lo.jsxs=i,Lo}var Mg;function zy(){return Mg||(Mg=1,Jf.exports=Py()),Jf.exports}var Pt=zy(),$f={exports:{}},ee={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eg;function By(){if(Eg)return ee;Eg=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),y=Symbol.iterator;function M(O){return O===null||typeof O!="object"?null:(O=y&&O[y]||O["@@iterator"],typeof O=="function"?O:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,x={};function g(O,nt,yt){this.props=O,this.context=nt,this.refs=x,this.updater=yt||b}g.prototype.isReactComponent={},g.prototype.setState=function(O,nt){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,nt,"setState")},g.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function I(){}I.prototype=g.prototype;function P(O,nt,yt){this.props=O,this.context=nt,this.refs=x,this.updater=yt||b}var L=P.prototype=new I;L.constructor=P,R(L,g.prototype),L.isPureReactComponent=!0;var K=Array.isArray;function N(){}var D={H:null,A:null,T:null,S:null},V=Object.prototype.hasOwnProperty;function w(O,nt,yt){var Y=yt.ref;return{$$typeof:o,type:O,key:nt,ref:Y!==void 0?Y:null,props:yt}}function C(O,nt){return w(O.type,nt,O.props)}function G(O){return typeof O=="object"&&O!==null&&O.$$typeof===o}function lt(O){var nt={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(yt){return nt[yt]})}var rt=/\/+/g;function mt(O,nt){return typeof O=="object"&&O!==null&&O.key!=null?lt(""+O.key):nt.toString(36)}function _t(O){switch(O.status){case"fulfilled":return O.value;case"rejected":throw O.reason;default:switch(typeof O.status=="string"?O.then(N,N):(O.status="pending",O.then(function(nt){O.status==="pending"&&(O.status="fulfilled",O.value=nt)},function(nt){O.status==="pending"&&(O.status="rejected",O.reason=nt)})),O.status){case"fulfilled":return O.value;case"rejected":throw O.reason}}throw O}function z(O,nt,yt,Y,ct){var Et=typeof O;(Et==="undefined"||Et==="boolean")&&(O=null);var St=!1;if(O===null)St=!0;else switch(Et){case"bigint":case"string":case"number":St=!0;break;case"object":switch(O.$$typeof){case o:case t:St=!0;break;case v:return St=O._init,z(St(O._payload),nt,yt,Y,ct)}}if(St)return ct=ct(O),St=Y===""?"."+mt(O,0):Y,K(ct)?(yt="",St!=null&&(yt=St.replace(rt,"$&/")+"/"),z(ct,nt,yt,"",function(ne){return ne})):ct!=null&&(G(ct)&&(ct=C(ct,yt+(ct.key==null||O&&O.key===ct.key?"":(""+ct.key).replace(rt,"$&/")+"/")+St)),nt.push(ct)),1;St=0;var Gt=Y===""?".":Y+":";if(K(O))for(var Ft=0;Ft<O.length;Ft++)Y=O[Ft],Et=Gt+mt(Y,Ft),St+=z(Y,nt,yt,Et,ct);else if(Ft=M(O),typeof Ft=="function")for(O=Ft.call(O),Ft=0;!(Y=O.next()).done;)Y=Y.value,Et=Gt+mt(Y,Ft++),St+=z(Y,nt,yt,Et,ct);else if(Et==="object"){if(typeof O.then=="function")return z(_t(O),nt,yt,Y,ct);throw nt=String(O),Error("Objects are not valid as a React child (found: "+(nt==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":nt)+"). If you meant to render a collection of children, use an array instead.")}return St}function Z(O,nt,yt){if(O==null)return O;var Y=[],ct=0;return z(O,Y,"","",function(Et){return nt.call(yt,Et,ct++)}),Y}function j(O){if(O._status===-1){var nt=O._result;nt=nt(),nt.then(function(yt){(O._status===0||O._status===-1)&&(O._status=1,O._result=yt)},function(yt){(O._status===0||O._status===-1)&&(O._status=2,O._result=yt)}),O._status===-1&&(O._status=0,O._result=nt)}if(O._status===1)return O._result.default;throw O._result}var xt=typeof reportError=="function"?reportError:function(O){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var nt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof O=="object"&&O!==null&&typeof O.message=="string"?String(O.message):String(O),error:O});if(!window.dispatchEvent(nt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",O);return}console.error(O)},Tt={map:Z,forEach:function(O,nt,yt){Z(O,function(){nt.apply(this,arguments)},yt)},count:function(O){var nt=0;return Z(O,function(){nt++}),nt},toArray:function(O){return Z(O,function(nt){return nt})||[]},only:function(O){if(!G(O))throw Error("React.Children.only expected to receive a single React element child.");return O}};return ee.Activity=S,ee.Children=Tt,ee.Component=g,ee.Fragment=i,ee.Profiler=l,ee.PureComponent=P,ee.StrictMode=s,ee.Suspense=m,ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,ee.__COMPILER_RUNTIME={__proto__:null,c:function(O){return D.H.useMemoCache(O)}},ee.cache=function(O){return function(){return O.apply(null,arguments)}},ee.cacheSignal=function(){return null},ee.cloneElement=function(O,nt,yt){if(O==null)throw Error("The argument must be a React element, but you passed "+O+".");var Y=R({},O.props),ct=O.key;if(nt!=null)for(Et in nt.key!==void 0&&(ct=""+nt.key),nt)!V.call(nt,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&nt.ref===void 0||(Y[Et]=nt[Et]);var Et=arguments.length-2;if(Et===1)Y.children=yt;else if(1<Et){for(var St=Array(Et),Gt=0;Gt<Et;Gt++)St[Gt]=arguments[Gt+2];Y.children=St}return w(O.type,ct,Y)},ee.createContext=function(O){return O={$$typeof:h,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null},O.Provider=O,O.Consumer={$$typeof:u,_context:O},O},ee.createElement=function(O,nt,yt){var Y,ct={},Et=null;if(nt!=null)for(Y in nt.key!==void 0&&(Et=""+nt.key),nt)V.call(nt,Y)&&Y!=="key"&&Y!=="__self"&&Y!=="__source"&&(ct[Y]=nt[Y]);var St=arguments.length-2;if(St===1)ct.children=yt;else if(1<St){for(var Gt=Array(St),Ft=0;Ft<St;Ft++)Gt[Ft]=arguments[Ft+2];ct.children=Gt}if(O&&O.defaultProps)for(Y in St=O.defaultProps,St)ct[Y]===void 0&&(ct[Y]=St[Y]);return w(O,Et,ct)},ee.createRef=function(){return{current:null}},ee.forwardRef=function(O){return{$$typeof:d,render:O}},ee.isValidElement=G,ee.lazy=function(O){return{$$typeof:v,_payload:{_status:-1,_result:O},_init:j}},ee.memo=function(O,nt){return{$$typeof:p,type:O,compare:nt===void 0?null:nt}},ee.startTransition=function(O){var nt=D.T,yt={};D.T=yt;try{var Y=O(),ct=D.S;ct!==null&&ct(yt,Y),typeof Y=="object"&&Y!==null&&typeof Y.then=="function"&&Y.then(N,xt)}catch(Et){xt(Et)}finally{nt!==null&&yt.types!==null&&(nt.types=yt.types),D.T=nt}},ee.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},ee.use=function(O){return D.H.use(O)},ee.useActionState=function(O,nt,yt){return D.H.useActionState(O,nt,yt)},ee.useCallback=function(O,nt){return D.H.useCallback(O,nt)},ee.useContext=function(O){return D.H.useContext(O)},ee.useDebugValue=function(){},ee.useDeferredValue=function(O,nt){return D.H.useDeferredValue(O,nt)},ee.useEffect=function(O,nt){return D.H.useEffect(O,nt)},ee.useEffectEvent=function(O){return D.H.useEffectEvent(O)},ee.useId=function(){return D.H.useId()},ee.useImperativeHandle=function(O,nt,yt){return D.H.useImperativeHandle(O,nt,yt)},ee.useInsertionEffect=function(O,nt){return D.H.useInsertionEffect(O,nt)},ee.useLayoutEffect=function(O,nt){return D.H.useLayoutEffect(O,nt)},ee.useMemo=function(O,nt){return D.H.useMemo(O,nt)},ee.useOptimistic=function(O,nt){return D.H.useOptimistic(O,nt)},ee.useReducer=function(O,nt,yt){return D.H.useReducer(O,nt,yt)},ee.useRef=function(O){return D.H.useRef(O)},ee.useState=function(O){return D.H.useState(O)},ee.useSyncExternalStore=function(O,nt,yt){return D.H.useSyncExternalStore(O,nt,yt)},ee.useTransition=function(){return D.H.useTransition()},ee.version="19.2.8",ee}var Tg;function Rd(){return Tg||(Tg=1,$f.exports=By()),$f.exports}var Xn=Rd(),th={exports:{}},No={},eh={exports:{}},nh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bg;function Iy(){return bg||(bg=1,(function(o){function t(z,Z){var j=z.length;z.push(Z);t:for(;0<j;){var xt=j-1>>>1,Tt=z[xt];if(0<l(Tt,Z))z[xt]=Z,z[j]=Tt,j=xt;else break t}}function i(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var Z=z[0],j=z.pop();if(j!==Z){z[0]=j;t:for(var xt=0,Tt=z.length,O=Tt>>>1;xt<O;){var nt=2*(xt+1)-1,yt=z[nt],Y=nt+1,ct=z[Y];if(0>l(yt,j))Y<Tt&&0>l(ct,yt)?(z[xt]=ct,z[Y]=j,xt=Y):(z[xt]=yt,z[nt]=j,xt=nt);else if(Y<Tt&&0>l(ct,j))z[xt]=ct,z[Y]=j,xt=Y;else break t}}return Z}function l(z,Z){var j=z.sortIndex-Z.sortIndex;return j!==0?j:z.id-Z.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;o.unstable_now=function(){return u.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],v=1,S=null,y=3,M=!1,b=!1,R=!1,x=!1,g=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,P=typeof setImmediate<"u"?setImmediate:null;function L(z){for(var Z=i(p);Z!==null;){if(Z.callback===null)s(p);else if(Z.startTime<=z)s(p),Z.sortIndex=Z.expirationTime,t(m,Z);else break;Z=i(p)}}function K(z){if(R=!1,L(z),!b)if(i(m)!==null)b=!0,N||(N=!0,lt());else{var Z=i(p);Z!==null&&_t(K,Z.startTime-z)}}var N=!1,D=-1,V=5,w=-1;function C(){return x?!0:!(o.unstable_now()-w<V)}function G(){if(x=!1,N){var z=o.unstable_now();w=z;var Z=!0;try{t:{b=!1,R&&(R=!1,I(D),D=-1),M=!0;var j=y;try{e:{for(L(z),S=i(m);S!==null&&!(S.expirationTime>z&&C());){var xt=S.callback;if(typeof xt=="function"){S.callback=null,y=S.priorityLevel;var Tt=xt(S.expirationTime<=z);if(z=o.unstable_now(),typeof Tt=="function"){S.callback=Tt,L(z),Z=!0;break e}S===i(m)&&s(m),L(z)}else s(m);S=i(m)}if(S!==null)Z=!0;else{var O=i(p);O!==null&&_t(K,O.startTime-z),Z=!1}}break t}finally{S=null,y=j,M=!1}Z=void 0}}finally{Z?lt():N=!1}}}var lt;if(typeof P=="function")lt=function(){P(G)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,mt=rt.port2;rt.port1.onmessage=G,lt=function(){mt.postMessage(null)}}else lt=function(){g(G,0)};function _t(z,Z){D=g(function(){z(o.unstable_now())},Z)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(z){z.callback=null},o.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<z?Math.floor(1e3/z):5},o.unstable_getCurrentPriorityLevel=function(){return y},o.unstable_next=function(z){switch(y){case 1:case 2:case 3:var Z=3;break;default:Z=y}var j=y;y=Z;try{return z()}finally{y=j}},o.unstable_requestPaint=function(){x=!0},o.unstable_runWithPriority=function(z,Z){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var j=y;y=z;try{return Z()}finally{y=j}},o.unstable_scheduleCallback=function(z,Z,j){var xt=o.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?xt+j:xt):j=xt,z){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=j+Tt,z={id:v++,callback:Z,priorityLevel:z,startTime:j,expirationTime:Tt,sortIndex:-1},j>xt?(z.sortIndex=j,t(p,z),i(m)===null&&z===i(p)&&(R?(I(D),D=-1):R=!0,_t(K,j-xt))):(z.sortIndex=Tt,t(m,z),b||M||(b=!0,N||(N=!0,lt()))),z},o.unstable_shouldYield=C,o.unstable_wrapCallback=function(z){var Z=y;return function(){var j=y;y=Z;try{return z.apply(this,arguments)}finally{y=j}}}})(nh)),nh}var Ag;function Fy(){return Ag||(Ag=1,eh.exports=Iy()),eh.exports}var ih={exports:{}},Cn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rg;function Hy(){if(Rg)return Cn;Rg=1;var o=Rd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,p,v){var S=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:S==null?null:""+S,children:m,containerInfo:p,implementation:v}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Cn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Cn.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return u(m,p,null,v)},Cn.flushSync=function(m){var p=h.T,v=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=v,s.d.f()}},Cn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Cn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Cn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,S=d(v,p.crossOrigin),y=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:S,integrity:y,fetchPriority:M}):v==="script"&&s.d.X(m,{crossOrigin:S,integrity:y,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Cn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Cn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,S=d(v,p.crossOrigin);s.d.L(m,v,{crossOrigin:S,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Cn.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Cn.requestFormReset=function(m){s.d.r(m)},Cn.unstable_batchedUpdates=function(m,p){return m(p)},Cn.useFormState=function(m,p,v){return h.H.useFormState(m,p,v)},Cn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Cn.version="19.2.8",Cn}var Cg;function Gy(){if(Cg)return ih.exports;Cg=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),ih.exports=Hy(),ih.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wg;function Vy(){if(wg)return No;wg=1;var o=Fy(),t=Rd(),i=Gy();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function u(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(u(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=u(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,r=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return m(c),e;if(f===r)return m(c),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=f;else{for(var _=!1,E=c.child;E;){if(E===a){_=!0,a=c,r=f;break}if(E===r){_=!0,r=c,a=f;break}E=E.sibling}if(!_){for(E=f.child;E;){if(E===a){_=!0,a=f,r=c;break}if(E===r){_=!0,r=f,a=c;break}E=E.sibling}if(!_)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function v(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=v(e),n!==null)return n;e=e.sibling}return null}var S=Object.assign,y=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),P=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),V=Symbol.for("react.lazy"),w=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function lt(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var rt=Symbol.for("react.client.reference");function mt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===rt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case g:return"Profiler";case x:return"StrictMode";case K:return"Suspense";case N:return"SuspenseList";case w:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case P:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case L:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case D:return n=e.displayName||null,n!==null?n:mt(e.type)||"Memo";case V:n=e._payload,e=e._init;try{return mt(e(n))}catch{}}return null}var _t=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j={pending:!1,data:null,method:null,action:null},xt=[],Tt=-1;function O(e){return{current:e}}function nt(e){0>Tt||(e.current=xt[Tt],xt[Tt]=null,Tt--)}function yt(e,n){Tt++,xt[Tt]=e.current,e.current=n}var Y=O(null),ct=O(null),Et=O(null),St=O(null);function Gt(e,n){switch(yt(Et,n),yt(ct,e),yt(Y,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?X_(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=X_(n),e=W_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}nt(Y),yt(Y,e)}function Ft(){nt(Y),nt(ct),nt(Et)}function ne(e){e.memoizedState!==null&&yt(St,e);var n=Y.current,a=W_(n,e.type);n!==a&&(yt(ct,e),yt(Y,a))}function Ne(e){ct.current===e&&(nt(Y),nt(ct)),St.current===e&&(nt(St),Co._currentValue=j)}var he,We;function F(e){if(he===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);he=n&&n[1]||"",We=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+We}var An=!1;function fe(e,n){if(!e||An)return"";An=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(st){var tt=st}Reflect.construct(e,[],pt)}else{try{pt.call()}catch(st){tt=st}e.call(pt.prototype)}}else{try{throw Error()}catch(st){tt=st}(pt=e())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(st){if(st&&tt&&typeof st.stack=="string")return[st.stack,tt.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),_=f[0],E=f[1];if(_&&E){var B=_.split(`
`),$=E.split(`
`);for(c=r=0;r<B.length&&!B[r].includes("DetermineComponentFrameRoot");)r++;for(;c<$.length&&!$[c].includes("DetermineComponentFrameRoot");)c++;if(r===B.length||c===$.length)for(r=B.length-1,c=$.length-1;1<=r&&0<=c&&B[r]!==$[c];)c--;for(;1<=r&&0<=c;r--,c--)if(B[r]!==$[c]){if(r!==1||c!==1)do if(r--,c--,0>c||B[r]!==$[c]){var ut=`
`+B[r].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=r&&0<=c);break}}}finally{An=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?F(a):""}function ge(e,n){switch(e.tag){case 26:case 27:case 5:return F(e.type);case 16:return F("Lazy");case 13:return e.child!==n&&n!==null?F("Suspense Fallback"):F("Suspense");case 19:return F("SuspenseList");case 0:case 15:return fe(e.type,!1);case 11:return fe(e.type.render,!1);case 1:return fe(e.type,!0);case 31:return F("Activity");default:return""}}function qt(e){try{var n="",a=null;do n+=ge(e,a),a=e,e=e.return;while(e);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var De=Object.prototype.hasOwnProperty,Wt=o.unstable_scheduleCallback,U=o.unstable_cancelCallback,T=o.unstable_shouldYield,et=o.unstable_requestPaint,ft=o.unstable_now,Mt=o.unstable_getCurrentPriorityLevel,dt=o.unstable_ImmediatePriority,kt=o.unstable_UserBlockingPriority,Ct=o.unstable_NormalPriority,zt=o.unstable_LowPriority,ve=o.unstable_IdlePriority,bt=o.log,Bt=o.unstable_setDisableYieldValue,Yt=null,Xt=null;function Lt(e){if(typeof bt=="function"&&Bt(e),Xt&&typeof Xt.setStrictMode=="function")try{Xt.setStrictMode(Yt,e)}catch{}}var Jt=Math.clz32?Math.clz32:k,ie=Math.log,Oe=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(ie(e)/Oe|0)|0}var At=256,ot=262144,gt=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function wt(e,n,a){var r=e.pendingLanes;if(r===0)return 0;var c=0,f=e.suspendedLanes,_=e.pingedLanes;e=e.warmLanes;var E=r&134217727;return E!==0?(r=E&~f,r!==0?c=Rt(r):(_&=E,_!==0?c=Rt(_):a||(a=E&~e,a!==0&&(c=Rt(a))))):(E=r&~f,E!==0?c=Rt(E):_!==0?c=Rt(_):a||(a=r&~e,a!==0&&(c=Rt(a)))),c===0?0:n!==0&&n!==c&&(n&f)===0&&(f=c&-c,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:c}function $t(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function qe(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function un(){var e=gt;return gt<<=1,(gt&62914560)===0&&(gt=4194304),e}function Ee(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function yn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function pi(e,n,a,r,c,f){var _=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var E=e.entanglements,B=e.expirationTimes,$=e.hiddenUpdates;for(a=_&~a;0<a;){var ut=31-Jt(a),pt=1<<ut;E[ut]=0,B[ut]=-1;var tt=$[ut];if(tt!==null)for($[ut]=null,ut=0;ut<tt.length;ut++){var st=tt[ut];st!==null&&(st.lane&=-536870913)}a&=~pt}r!==0&&Hr(e,r,0),f!==0&&c===0&&e.tag!==0&&(e.suspendedLanes|=f&~(_&~n))}function Hr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var r=31-Jt(n);e.entangledLanes|=n,e.entanglements[r]=e.entanglements[r]|1073741824|a&261930}function Gr(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var r=31-Jt(a),c=1<<r;c&n|e[r]&n&&(e[r]|=n),a&=~c}}function Ri(e,n){var a=n&-n;return a=(a&42)!==0?1:Za(a),(a&(e.suspendedLanes|n))!==0?0:a}function Za(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ds(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Vr(){var e=Z.p;return e!==0?e:(e=window.event,e===void 0?32:pg(e.type))}function Ka(e,n){var a=Z.p;try{return Z.p=e,n()}finally{Z.p=a}}var mi=Math.random().toString(36).slice(2),Ke="__reactFiber$"+mi,xn="__reactProps$"+mi,zi="__reactContainer$"+mi,kr="__reactEvents$"+mi,Wc="__reactListeners$"+mi,qc="__reactHandles$"+mi,Wo="__reactResources$"+mi,Qa="__reactMarker$"+mi;function A(e){delete e[Ke],delete e[xn],delete e[kr],delete e[Wc],delete e[qc]}function X(e){var n=e[Ke];if(n)return n;for(var a=e.parentNode;a;){if(n=a[zi]||a[Ke]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=J_(e);e!==null;){if(a=e[Ke])return a;e=J_(e)}return n}e=a,a=e.parentNode}return null}function it(e){if(e=e[Ke]||e[zi]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function at(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function W(e){var n=e[Wo];return n||(n=e[Wo]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vt(e){e[Qa]=!0}var Dt=new Set,Ot={};function Nt(e,n){Kt(e,n),Kt(e+"Capture",n)}function Kt(e,n){for(Ot[e]=n,e=0;e<n.length;e++)Dt.add(n[e])}var te=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jt={},Se={};function Te(e){return De.call(Se,e)?!0:De.call(jt,e)?!1:te.test(e)?Se[e]=!0:(jt[e]=!0,!1)}function Ve(e,n,a){if(Te(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function He(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function ae(e,n,a,r){if(r===null)e.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+r)}}function Ht(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function an(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function be(e,n,a){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,f=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return c.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Un(e){if(!e._valueTracker){var n=an(e)?"checked":"value";e._valueTracker=be(e,n,""+e[n])}}function Bi(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return e&&(r=an(e)?e.checked?"true":"false":e.value),e=r,e!==a?(n.setValue(e),!0):!1}function _n(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ja=/[\n"\\]/g;function de(e){return e.replace(Ja,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Rn(e,n,a,r,c,f,_,E){e.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?e.type=_:e.removeAttribute("type"),n!=null?_==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ht(n)):e.value!==""+Ht(n)&&(e.value=""+Ht(n)):_!=="submit"&&_!=="reset"||e.removeAttribute("value"),n!=null?fn(e,_,Ht(n)):a!=null?fn(e,_,Ht(a)):r!=null&&e.removeAttribute("value"),c==null&&f!=null&&(e.defaultChecked=!!f),c!=null&&(e.checked=c&&typeof c!="function"&&typeof c!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.name=""+Ht(E):e.removeAttribute("name")}function Ln(e,n,a,r,c,f,_,E){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Un(e);return}a=a!=null?""+Ht(a):"",n=n!=null?""+Ht(n):a,E||n===e.value||(e.value=n),e.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=E?e.checked:!!r,e.defaultChecked=!!r,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(e.name=_),Un(e)}function fn(e,n,a){n==="number"&&_n(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function tn(e,n,a,r){if(e=e.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<e.length;a++)c=n.hasOwnProperty("$"+e[a].value),e[a].selected!==c&&(e[a].selected=c),c&&r&&(e[a].defaultSelected=!0)}else{for(a=""+Ht(a),n=null,c=0;c<e.length;c++){if(e[c].value===a){e[c].selected=!0,r&&(e[c].defaultSelected=!0);return}n!==null||e[c].disabled||(n=e[c])}n!==null&&(n.selected=!0)}}function Us(e,n,a){if(n!=null&&(n=""+Ht(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Ht(a):""}function Ci(e,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(_t(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=Ht(n),e.defaultValue=a,r=e.textContent,r===a&&r!==""&&r!==null&&(e.value=r),Un(e)}function Ls(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var C0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Gd(e,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":r?e.setProperty(n,a):typeof a!="number"||a===0||C0.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Vd(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&Gd(e,c,r)}else for(var f in n)n.hasOwnProperty(f)&&Gd(e,f,n[f])}function Yc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var w0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),D0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qo(e){return D0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ii(){}var jc=null;function Zc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ns=null,Os=null;function kd(e){var n=it(e);if(n&&(e=n.stateNode)){var a=e[xn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Rn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+de(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==e&&r.form===e.form){var c=r[xn]||null;if(!c)throw Error(s(90));Rn(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===e.form&&Bi(r)}break t;case"textarea":Us(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&tn(e,!!a.multiple,n,!1)}}}var Kc=!1;function Xd(e,n,a){if(Kc)return e(n,a);Kc=!0;try{var r=e(n);return r}finally{if(Kc=!1,(Ns!==null||Os!==null)&&(Nl(),Ns&&(n=Ns,e=Os,Os=Ns=null,kd(n),e)))for(n=0;n<e.length;n++)kd(e[n])}}function Xr(e,n){var a=e.stateNode;if(a===null)return null;var r=a[xn]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Fi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Qc=!1;if(Fi)try{var Wr={};Object.defineProperty(Wr,"passive",{get:function(){Qc=!0}}),window.addEventListener("test",Wr,Wr),window.removeEventListener("test",Wr,Wr)}catch{Qc=!1}var pa=null,Jc=null,Yo=null;function Wd(){if(Yo)return Yo;var e,n=Jc,a=n.length,r,c="value"in pa?pa.value:pa.textContent,f=c.length;for(e=0;e<a&&n[e]===c[e];e++);var _=a-e;for(r=1;r<=_&&n[a-r]===c[f-r];r++);return Yo=c.slice(e,1<r?1-r:void 0)}function jo(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Zo(){return!0}function qd(){return!1}function zn(e){function n(a,r,c,f,_){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var E in e)e.hasOwnProperty(E)&&(a=e[E],this[E]=a?a(f):f[E]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Zo:qd,this.isPropagationStopped=qd,this}return S(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Zo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Zo)},persist:function(){},isPersistent:Zo}),n}var $a={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ko=zn($a),qr=S({},$a,{view:0,detail:0}),U0=zn(qr),$c,tu,Yr,Qo=S({},qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yr&&(Yr&&e.type==="mousemove"?($c=e.screenX-Yr.screenX,tu=e.screenY-Yr.screenY):tu=$c=0,Yr=e),$c)},movementY:function(e){return"movementY"in e?e.movementY:tu}}),Yd=zn(Qo),L0=S({},Qo,{dataTransfer:0}),N0=zn(L0),O0=S({},qr,{relatedTarget:0}),eu=zn(O0),P0=S({},$a,{animationName:0,elapsedTime:0,pseudoElement:0}),z0=zn(P0),B0=S({},$a,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),I0=zn(B0),F0=S({},$a,{data:0}),jd=zn(F0),H0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},G0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},V0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function k0(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=V0[e])?!!n[e]:!1}function nu(){return k0}var X0=S({},qr,{key:function(e){if(e.key){var n=H0[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=jo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?G0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nu,charCode:function(e){return e.type==="keypress"?jo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?jo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),W0=zn(X0),q0=S({},Qo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zd=zn(q0),Y0=S({},qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nu}),j0=zn(Y0),Z0=S({},$a,{propertyName:0,elapsedTime:0,pseudoElement:0}),K0=zn(Z0),Q0=S({},Qo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),J0=zn(Q0),$0=S({},$a,{newState:0,oldState:0}),tS=zn($0),eS=[9,13,27,32],iu=Fi&&"CompositionEvent"in window,jr=null;Fi&&"documentMode"in document&&(jr=document.documentMode);var nS=Fi&&"TextEvent"in window&&!jr,Kd=Fi&&(!iu||jr&&8<jr&&11>=jr),Qd=" ",Jd=!1;function $d(e,n){switch(e){case"keyup":return eS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function tp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ps=!1;function iS(e,n){switch(e){case"compositionend":return tp(n);case"keypress":return n.which!==32?null:(Jd=!0,Qd);case"textInput":return e=n.data,e===Qd&&Jd?null:e;default:return null}}function aS(e,n){if(Ps)return e==="compositionend"||!iu&&$d(e,n)?(e=Wd(),Yo=Jc=pa=null,Ps=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Kd&&n.locale!=="ko"?null:n.data;default:return null}}var sS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ep(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!sS[e.type]:n==="textarea"}function np(e,n,a,r){Ns?Os?Os.push(r):Os=[r]:Ns=r,n=Hl(n,"onChange"),0<n.length&&(a=new Ko("onChange","change",null,a,r),e.push({event:a,listeners:n}))}var Zr=null,Kr=null;function rS(e){I_(e,0)}function Jo(e){var n=at(e);if(Bi(n))return e}function ip(e,n){if(e==="change")return n}var ap=!1;if(Fi){var au;if(Fi){var su="oninput"in document;if(!su){var sp=document.createElement("div");sp.setAttribute("oninput","return;"),su=typeof sp.oninput=="function"}au=su}else au=!1;ap=au&&(!document.documentMode||9<document.documentMode)}function rp(){Zr&&(Zr.detachEvent("onpropertychange",op),Kr=Zr=null)}function op(e){if(e.propertyName==="value"&&Jo(Kr)){var n=[];np(n,Kr,e,Zc(e)),Xd(rS,n)}}function oS(e,n,a){e==="focusin"?(rp(),Zr=n,Kr=a,Zr.attachEvent("onpropertychange",op)):e==="focusout"&&rp()}function lS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Jo(Kr)}function cS(e,n){if(e==="click")return Jo(n)}function uS(e,n){if(e==="input"||e==="change")return Jo(n)}function fS(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Yn=typeof Object.is=="function"?Object.is:fS;function Qr(e,n){if(Yn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!De.call(n,c)||!Yn(e[c],n[c]))return!1}return!0}function lp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cp(e,n){var a=lp(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=n&&r>=n)return{node:a,offset:n-e};e=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=lp(a)}}function up(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?up(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function fp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=_n(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=_n(e.document)}return n}function ru(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var hS=Fi&&"documentMode"in document&&11>=document.documentMode,zs=null,ou=null,Jr=null,lu=!1;function hp(e,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;lu||zs==null||zs!==_n(r)||(r=zs,"selectionStart"in r&&ru(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jr&&Qr(Jr,r)||(Jr=r,r=Hl(ou,"onSelect"),0<r.length&&(n=new Ko("onSelect","select",null,n,a),e.push({event:n,listeners:r}),n.target=zs)))}function ts(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Bs={animationend:ts("Animation","AnimationEnd"),animationiteration:ts("Animation","AnimationIteration"),animationstart:ts("Animation","AnimationStart"),transitionrun:ts("Transition","TransitionRun"),transitionstart:ts("Transition","TransitionStart"),transitioncancel:ts("Transition","TransitionCancel"),transitionend:ts("Transition","TransitionEnd")},cu={},dp={};Fi&&(dp=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function es(e){if(cu[e])return cu[e];if(!Bs[e])return e;var n=Bs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in dp)return cu[e]=n[a];return e}var pp=es("animationend"),mp=es("animationiteration"),_p=es("animationstart"),dS=es("transitionrun"),pS=es("transitionstart"),mS=es("transitioncancel"),gp=es("transitionend"),vp=new Map,uu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");uu.push("scrollEnd");function _i(e,n){vp.set(e,n),Nt(n,[e])}var $o=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ni=[],Is=0,fu=0;function tl(){for(var e=Is,n=fu=Is=0;n<e;){var a=ni[n];ni[n++]=null;var r=ni[n];ni[n++]=null;var c=ni[n];ni[n++]=null;var f=ni[n];if(ni[n++]=null,r!==null&&c!==null){var _=r.pending;_===null?c.next=c:(c.next=_.next,_.next=c),r.pending=c}f!==0&&Sp(a,c,f)}}function el(e,n,a,r){ni[Is++]=e,ni[Is++]=n,ni[Is++]=a,ni[Is++]=r,fu|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function hu(e,n,a,r){return el(e,n,a,r),nl(e)}function ns(e,n){return el(e,null,null,n),nl(e)}function Sp(e,n,a){e.lanes|=a;var r=e.alternate;r!==null&&(r.lanes|=a);for(var c=!1,f=e.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(c=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,c&&n!==null&&(c=31-Jt(a),e=f.hiddenUpdates,r=e[c],r===null?e[c]=[n]:r.push(n),n.lane=a|536870912),f):null}function nl(e){if(50<xo)throw xo=0,Mf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Fs={};function _S(e,n,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jn(e,n,a,r){return new _S(e,n,a,r)}function du(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hi(e,n){var a=e.alternate;return a===null?(a=jn(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function yp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function il(e,n,a,r,c,f){var _=0;if(r=e,typeof e=="function")du(e)&&(_=1);else if(typeof e=="string")_=xy(e,a,Y.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case w:return e=jn(31,a,n,c),e.elementType=w,e.lanes=f,e;case R:return is(a.children,c,f,n);case x:_=8,c|=24;break;case g:return e=jn(12,a,n,c|2),e.elementType=g,e.lanes=f,e;case K:return e=jn(13,a,n,c),e.elementType=K,e.lanes=f,e;case N:return e=jn(19,a,n,c),e.elementType=N,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case P:_=10;break t;case I:_=9;break t;case L:_=11;break t;case D:_=14;break t;case V:_=16,r=null;break t}_=29,a=Error(s(130,e===null?"null":typeof e,"")),r=null}return n=jn(_,a,n,c),n.elementType=e,n.type=r,n.lanes=f,n}function is(e,n,a,r){return e=jn(7,e,r,n),e.lanes=a,e}function pu(e,n,a){return e=jn(6,e,null,n),e.lanes=a,e}function xp(e){var n=jn(18,null,null,0);return n.stateNode=e,n}function mu(e,n,a){return n=jn(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Mp=new WeakMap;function ii(e,n){if(typeof e=="object"&&e!==null){var a=Mp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:qt(n)},Mp.set(e,n),n)}return{value:e,source:n,stack:qt(n)}}var Hs=[],Gs=0,al=null,$r=0,ai=[],si=0,ma=null,wi=1,Di="";function Gi(e,n){Hs[Gs++]=$r,Hs[Gs++]=al,al=e,$r=n}function Ep(e,n,a){ai[si++]=wi,ai[si++]=Di,ai[si++]=ma,ma=e;var r=wi;e=Di;var c=32-Jt(r)-1;r&=~(1<<c),a+=1;var f=32-Jt(n)+c;if(30<f){var _=c-c%5;f=(r&(1<<_)-1).toString(32),r>>=_,c-=_,wi=1<<32-Jt(n)+c|a<<c|r,Di=f+e}else wi=1<<f|a<<c|r,Di=e}function _u(e){e.return!==null&&(Gi(e,1),Ep(e,1,0))}function gu(e){for(;e===al;)al=Hs[--Gs],Hs[Gs]=null,$r=Hs[--Gs],Hs[Gs]=null;for(;e===ma;)ma=ai[--si],ai[si]=null,Di=ai[--si],ai[si]=null,wi=ai[--si],ai[si]=null}function Tp(e,n){ai[si++]=wi,ai[si++]=Di,ai[si++]=ma,wi=n.id,Di=n.overflow,ma=e}var Mn=null,ke=null,Me=!1,_a=null,ri=!1,vu=Error(s(519));function ga(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw to(ii(n,e)),vu}function bp(e){var n=e.stateNode,a=e.type,r=e.memoizedProps;switch(n[Ke]=e,n[xn]=r,a){case"dialog":me("cancel",n),me("close",n);break;case"iframe":case"object":case"embed":me("load",n);break;case"video":case"audio":for(a=0;a<Eo.length;a++)me(Eo[a],n);break;case"source":me("error",n);break;case"img":case"image":case"link":me("error",n),me("load",n);break;case"details":me("toggle",n);break;case"input":me("invalid",n),Ln(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":me("invalid",n);break;case"textarea":me("invalid",n),Ci(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||V_(n.textContent,a)?(r.popover!=null&&(me("beforetoggle",n),me("toggle",n)),r.onScroll!=null&&me("scroll",n),r.onScrollEnd!=null&&me("scrollend",n),r.onClick!=null&&(n.onclick=Ii),n=!0):n=!1,n||ga(e,!0)}function Ap(e){for(Mn=e.return;Mn;)switch(Mn.tag){case 5:case 31:case 13:ri=!1;return;case 27:case 3:ri=!0;return;default:Mn=Mn.return}}function Vs(e){if(e!==Mn)return!1;if(!Me)return Ap(e),Me=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Bf(e.type,e.memoizedProps)),a=!a),a&&ke&&ga(e),Ap(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));ke=Q_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));ke=Q_(e)}else n===27?(n=ke,Ua(e.type)?(e=Vf,Vf=null,ke=e):ke=n):ke=Mn?li(e.stateNode.nextSibling):null;return!0}function as(){ke=Mn=null,Me=!1}function Su(){var e=_a;return e!==null&&(Hn===null?Hn=e:Hn.push.apply(Hn,e),_a=null),e}function to(e){_a===null?_a=[e]:_a.push(e)}var yu=O(null),ss=null,Vi=null;function va(e,n,a){yt(yu,n._currentValue),n._currentValue=a}function ki(e){e._currentValue=yu.current,nt(yu)}function xu(e,n,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===a)break;e=e.return}}function Mu(e,n,a,r){var c=e.child;for(c!==null&&(c.return=e);c!==null;){var f=c.dependencies;if(f!==null){var _=c.child;f=f.firstContext;t:for(;f!==null;){var E=f;f=c;for(var B=0;B<n.length;B++)if(E.context===n[B]){f.lanes|=a,E=f.alternate,E!==null&&(E.lanes|=a),xu(f.return,a,e),r||(_=null);break t}f=E.next}}else if(c.tag===18){if(_=c.return,_===null)throw Error(s(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),xu(_,a,e),_=null}else _=c.child;if(_!==null)_.return=c;else for(_=c;_!==null;){if(_===e){_=null;break}if(c=_.sibling,c!==null){c.return=_.return,_=c;break}_=_.return}c=_}}function ks(e,n,a,r){e=null;for(var c=n,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var _=c.alternate;if(_===null)throw Error(s(387));if(_=_.memoizedProps,_!==null){var E=c.type;Yn(c.pendingProps.value,_.value)||(e!==null?e.push(E):e=[E])}}else if(c===St.current){if(_=c.alternate,_===null)throw Error(s(387));_.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(e!==null?e.push(Co):e=[Co])}c=c.return}e!==null&&Mu(n,e,a,r),n.flags|=262144}function sl(e){for(e=e.firstContext;e!==null;){if(!Yn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function rs(e){ss=e,Vi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function En(e){return Rp(ss,e)}function rl(e,n){return ss===null&&rs(e),Rp(e,n)}function Rp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Vi===null){if(e===null)throw Error(s(308));Vi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Vi=Vi.next=n;return a}var gS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,r){e.push(r)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},vS=o.unstable_scheduleCallback,SS=o.unstable_NormalPriority,sn={$$typeof:P,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Eu(){return{controller:new gS,data:new Map,refCount:0}}function eo(e){e.refCount--,e.refCount===0&&vS(SS,function(){e.controller.abort()})}var no=null,Tu=0,Xs=0,Ws=null;function yS(e,n){if(no===null){var a=no=[];Tu=0,Xs=Cf(),Ws={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Tu++,n.then(Cp,Cp),n}function Cp(){if(--Tu===0&&no!==null){Ws!==null&&(Ws.status="fulfilled");var e=no;no=null,Xs=0,Ws=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function xS(e,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return e.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var wp=z.S;z.S=function(e,n){h_=ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&yS(e,n),wp!==null&&wp(e,n)};var os=O(null);function bu(){var e=os.current;return e!==null?e:Ge.pooledCache}function ol(e,n){n===null?yt(os,os.current):yt(os,n.pool)}function Dp(){var e=bu();return e===null?null:{parent:sn._currentValue,pool:e}}var qs=Error(s(460)),Au=Error(s(474)),ll=Error(s(542)),cl={then:function(){}};function Up(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Lp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Ii,Ii),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Op(e),e;default:if(typeof n.status=="string")n.then(Ii,Ii);else{if(e=Ge,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Op(e),e}throw cs=n,qs}}function ls(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(cs=a,qs):a}}var cs=null;function Np(){if(cs===null)throw Error(s(459));var e=cs;return cs=null,e}function Op(e){if(e===qs||e===ll)throw Error(s(483))}var Ys=null,io=0;function ul(e){var n=io;return io+=1,Ys===null&&(Ys=[]),Lp(Ys,e,n)}function ao(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function fl(e,n){throw n.$$typeof===y?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Pp(e){function n(q,H){if(e){var J=q.deletions;J===null?(q.deletions=[H],q.flags|=16):J.push(H)}}function a(q,H){if(!e)return null;for(;H!==null;)n(q,H),H=H.sibling;return null}function r(q){for(var H=new Map;q!==null;)q.key!==null?H.set(q.key,q):H.set(q.index,q),q=q.sibling;return H}function c(q,H){return q=Hi(q,H),q.index=0,q.sibling=null,q}function f(q,H,J){return q.index=J,e?(J=q.alternate,J!==null?(J=J.index,J<H?(q.flags|=67108866,H):J):(q.flags|=67108866,H)):(q.flags|=1048576,H)}function _(q){return e&&q.alternate===null&&(q.flags|=67108866),q}function E(q,H,J,ht){return H===null||H.tag!==6?(H=pu(J,q.mode,ht),H.return=q,H):(H=c(H,J),H.return=q,H)}function B(q,H,J,ht){var Zt=J.type;return Zt===R?ut(q,H,J.props.children,ht,J.key):H!==null&&(H.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===V&&ls(Zt)===H.type)?(H=c(H,J.props),ao(H,J),H.return=q,H):(H=il(J.type,J.key,J.props,null,q.mode,ht),ao(H,J),H.return=q,H)}function $(q,H,J,ht){return H===null||H.tag!==4||H.stateNode.containerInfo!==J.containerInfo||H.stateNode.implementation!==J.implementation?(H=mu(J,q.mode,ht),H.return=q,H):(H=c(H,J.children||[]),H.return=q,H)}function ut(q,H,J,ht,Zt){return H===null||H.tag!==7?(H=is(J,q.mode,ht,Zt),H.return=q,H):(H=c(H,J),H.return=q,H)}function pt(q,H,J){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return H=pu(""+H,q.mode,J),H.return=q,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case M:return J=il(H.type,H.key,H.props,null,q.mode,J),ao(J,H),J.return=q,J;case b:return H=mu(H,q.mode,J),H.return=q,H;case V:return H=ls(H),pt(q,H,J)}if(_t(H)||lt(H))return H=is(H,q.mode,J,null),H.return=q,H;if(typeof H.then=="function")return pt(q,ul(H),J);if(H.$$typeof===P)return pt(q,rl(q,H),J);fl(q,H)}return null}function tt(q,H,J,ht){var Zt=H!==null?H.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Zt!==null?null:E(q,H,""+J,ht);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case M:return J.key===Zt?B(q,H,J,ht):null;case b:return J.key===Zt?$(q,H,J,ht):null;case V:return J=ls(J),tt(q,H,J,ht)}if(_t(J)||lt(J))return Zt!==null?null:ut(q,H,J,ht,null);if(typeof J.then=="function")return tt(q,H,ul(J),ht);if(J.$$typeof===P)return tt(q,H,rl(q,J),ht);fl(q,J)}return null}function st(q,H,J,ht,Zt){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return q=q.get(J)||null,E(H,q,""+ht,Zt);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case M:return q=q.get(ht.key===null?J:ht.key)||null,B(H,q,ht,Zt);case b:return q=q.get(ht.key===null?J:ht.key)||null,$(H,q,ht,Zt);case V:return ht=ls(ht),st(q,H,J,ht,Zt)}if(_t(ht)||lt(ht))return q=q.get(J)||null,ut(H,q,ht,Zt,null);if(typeof ht.then=="function")return st(q,H,J,ul(ht),Zt);if(ht.$$typeof===P)return st(q,H,J,rl(H,ht),Zt);fl(H,ht)}return null}function It(q,H,J,ht){for(var Zt=null,Ae=null,Vt=H,oe=H=0,xe=null;Vt!==null&&oe<J.length;oe++){Vt.index>oe?(xe=Vt,Vt=null):xe=Vt.sibling;var Re=tt(q,Vt,J[oe],ht);if(Re===null){Vt===null&&(Vt=xe);break}e&&Vt&&Re.alternate===null&&n(q,Vt),H=f(Re,H,oe),Ae===null?Zt=Re:Ae.sibling=Re,Ae=Re,Vt=xe}if(oe===J.length)return a(q,Vt),Me&&Gi(q,oe),Zt;if(Vt===null){for(;oe<J.length;oe++)Vt=pt(q,J[oe],ht),Vt!==null&&(H=f(Vt,H,oe),Ae===null?Zt=Vt:Ae.sibling=Vt,Ae=Vt);return Me&&Gi(q,oe),Zt}for(Vt=r(Vt);oe<J.length;oe++)xe=st(Vt,q,oe,J[oe],ht),xe!==null&&(e&&xe.alternate!==null&&Vt.delete(xe.key===null?oe:xe.key),H=f(xe,H,oe),Ae===null?Zt=xe:Ae.sibling=xe,Ae=xe);return e&&Vt.forEach(function(za){return n(q,za)}),Me&&Gi(q,oe),Zt}function Qt(q,H,J,ht){if(J==null)throw Error(s(151));for(var Zt=null,Ae=null,Vt=H,oe=H=0,xe=null,Re=J.next();Vt!==null&&!Re.done;oe++,Re=J.next()){Vt.index>oe?(xe=Vt,Vt=null):xe=Vt.sibling;var za=tt(q,Vt,Re.value,ht);if(za===null){Vt===null&&(Vt=xe);break}e&&Vt&&za.alternate===null&&n(q,Vt),H=f(za,H,oe),Ae===null?Zt=za:Ae.sibling=za,Ae=za,Vt=xe}if(Re.done)return a(q,Vt),Me&&Gi(q,oe),Zt;if(Vt===null){for(;!Re.done;oe++,Re=J.next())Re=pt(q,Re.value,ht),Re!==null&&(H=f(Re,H,oe),Ae===null?Zt=Re:Ae.sibling=Re,Ae=Re);return Me&&Gi(q,oe),Zt}for(Vt=r(Vt);!Re.done;oe++,Re=J.next())Re=st(Vt,q,oe,Re.value,ht),Re!==null&&(e&&Re.alternate!==null&&Vt.delete(Re.key===null?oe:Re.key),H=f(Re,H,oe),Ae===null?Zt=Re:Ae.sibling=Re,Ae=Re);return e&&Vt.forEach(function(Ly){return n(q,Ly)}),Me&&Gi(q,oe),Zt}function Be(q,H,J,ht){if(typeof J=="object"&&J!==null&&J.type===R&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case M:t:{for(var Zt=J.key;H!==null;){if(H.key===Zt){if(Zt=J.type,Zt===R){if(H.tag===7){a(q,H.sibling),ht=c(H,J.props.children),ht.return=q,q=ht;break t}}else if(H.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===V&&ls(Zt)===H.type){a(q,H.sibling),ht=c(H,J.props),ao(ht,J),ht.return=q,q=ht;break t}a(q,H);break}else n(q,H);H=H.sibling}J.type===R?(ht=is(J.props.children,q.mode,ht,J.key),ht.return=q,q=ht):(ht=il(J.type,J.key,J.props,null,q.mode,ht),ao(ht,J),ht.return=q,q=ht)}return _(q);case b:t:{for(Zt=J.key;H!==null;){if(H.key===Zt)if(H.tag===4&&H.stateNode.containerInfo===J.containerInfo&&H.stateNode.implementation===J.implementation){a(q,H.sibling),ht=c(H,J.children||[]),ht.return=q,q=ht;break t}else{a(q,H);break}else n(q,H);H=H.sibling}ht=mu(J,q.mode,ht),ht.return=q,q=ht}return _(q);case V:return J=ls(J),Be(q,H,J,ht)}if(_t(J))return It(q,H,J,ht);if(lt(J)){if(Zt=lt(J),typeof Zt!="function")throw Error(s(150));return J=Zt.call(J),Qt(q,H,J,ht)}if(typeof J.then=="function")return Be(q,H,ul(J),ht);if(J.$$typeof===P)return Be(q,H,rl(q,J),ht);fl(q,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,H!==null&&H.tag===6?(a(q,H.sibling),ht=c(H,J),ht.return=q,q=ht):(a(q,H),ht=pu(J,q.mode,ht),ht.return=q,q=ht),_(q)):a(q,H)}return function(q,H,J,ht){try{io=0;var Zt=Be(q,H,J,ht);return Ys=null,Zt}catch(Vt){if(Vt===qs||Vt===ll)throw Vt;var Ae=jn(29,Vt,null,q.mode);return Ae.lanes=ht,Ae.return=q,Ae}finally{}}}var us=Pp(!0),zp=Pp(!1),Sa=!1;function Ru(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Cu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ya(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function xa(e,n,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(we&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=nl(e),Sp(e,null,a),n}return el(e,r,n,a),nl(e)}function so(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Gr(e,a)}}function wu(e,n){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Du=!1;function ro(){if(Du){var e=Ws;if(e!==null)throw e}}function oo(e,n,a,r){Du=!1;var c=e.updateQueue;Sa=!1;var f=c.firstBaseUpdate,_=c.lastBaseUpdate,E=c.shared.pending;if(E!==null){c.shared.pending=null;var B=E,$=B.next;B.next=null,_===null?f=$:_.next=$,_=B;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,E=ut.lastBaseUpdate,E!==_&&(E===null?ut.firstBaseUpdate=$:E.next=$,ut.lastBaseUpdate=B))}if(f!==null){var pt=c.baseState;_=0,ut=$=B=null,E=f;do{var tt=E.lane&-536870913,st=tt!==E.lane;if(st?(ye&tt)===tt:(r&tt)===tt){tt!==0&&tt===Xs&&(Du=!0),ut!==null&&(ut=ut.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var It=e,Qt=E;tt=n;var Be=a;switch(Qt.tag){case 1:if(It=Qt.payload,typeof It=="function"){pt=It.call(Be,pt,tt);break t}pt=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Qt.payload,tt=typeof It=="function"?It.call(Be,pt,tt):It,tt==null)break t;pt=S({},pt,tt);break t;case 2:Sa=!0}}tt=E.callback,tt!==null&&(e.flags|=64,st&&(e.flags|=8192),st=c.callbacks,st===null?c.callbacks=[tt]:st.push(tt))}else st={lane:tt,tag:E.tag,payload:E.payload,callback:E.callback,next:null},ut===null?($=ut=st,B=pt):ut=ut.next=st,_|=tt;if(E=E.next,E===null){if(E=c.shared.pending,E===null)break;st=E,E=st.next,st.next=null,c.lastBaseUpdate=st,c.shared.pending=null}}while(!0);ut===null&&(B=pt),c.baseState=B,c.firstBaseUpdate=$,c.lastBaseUpdate=ut,f===null&&(c.shared.lanes=0),Aa|=_,e.lanes=_,e.memoizedState=pt}}function Bp(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Ip(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Bp(a[e],n)}var js=O(null),hl=O(0);function Fp(e,n){e=Ji,yt(hl,e),yt(js,n),Ji=e|n.baseLanes}function Uu(){yt(hl,Ji),yt(js,js.current)}function Lu(){Ji=hl.current,nt(js),nt(hl)}var Zn=O(null),oi=null;function Ma(e){var n=e.alternate;yt(en,en.current&1),yt(Zn,e),oi===null&&(n===null||js.current!==null||n.memoizedState!==null)&&(oi=e)}function Nu(e){yt(en,en.current),yt(Zn,e),oi===null&&(oi=e)}function Hp(e){e.tag===22?(yt(en,en.current),yt(Zn,e),oi===null&&(oi=e)):Ea()}function Ea(){yt(en,en.current),yt(Zn,Zn.current)}function Kn(e){nt(Zn),oi===e&&(oi=null),nt(en)}var en=O(0);function dl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Hf(a)||Gf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Xi=0,se=null,Pe=null,rn=null,pl=!1,Zs=!1,fs=!1,ml=0,lo=0,Ks=null,MS=0;function Qe(){throw Error(s(321))}function Ou(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Yn(e[a],n[a]))return!1;return!0}function Pu(e,n,a,r,c,f){return Xi=f,se=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=e===null||e.memoizedState===null?Em:Ku,fs=!1,f=a(r,c),fs=!1,Zs&&(f=Vp(n,a,r,c)),Gp(e),f}function Gp(e){z.H=fo;var n=Pe!==null&&Pe.next!==null;if(Xi=0,rn=Pe=se=null,pl=!1,lo=0,Ks=null,n)throw Error(s(300));e===null||on||(e=e.dependencies,e!==null&&sl(e)&&(on=!0))}function Vp(e,n,a,r){se=e;var c=0;do{if(Zs&&(Ks=null),lo=0,Zs=!1,25<=c)throw Error(s(301));if(c+=1,rn=Pe=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}z.H=Tm,f=n(a,r)}while(Zs);return f}function ES(){var e=z.H,n=e.useState()[0];return n=typeof n.then=="function"?co(n):n,e=e.useState()[0],(Pe!==null?Pe.memoizedState:null)!==e&&(se.flags|=1024),n}function zu(){var e=ml!==0;return ml=0,e}function Bu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Iu(e){if(pl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}pl=!1}Xi=0,rn=Pe=se=null,Zs=!1,lo=ml=0,Ks=null}function Nn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?se.memoizedState=rn=e:rn=rn.next=e,rn}function nn(){if(Pe===null){var e=se.alternate;e=e!==null?e.memoizedState:null}else e=Pe.next;var n=rn===null?se.memoizedState:rn.next;if(n!==null)rn=n,Pe=e;else{if(e===null)throw se.alternate===null?Error(s(467)):Error(s(310));Pe=e,e={memoizedState:Pe.memoizedState,baseState:Pe.baseState,baseQueue:Pe.baseQueue,queue:Pe.queue,next:null},rn===null?se.memoizedState=rn=e:rn=rn.next=e}return rn}function _l(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function co(e){var n=lo;return lo+=1,Ks===null&&(Ks=[]),e=Lp(Ks,e,n),n=se,(rn===null?n.memoizedState:rn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?Em:Ku),e}function gl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return co(e);if(e.$$typeof===P)return En(e)}throw Error(s(438,String(e)))}function Fu(e){var n=null,a=se.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=se.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=_l(),se.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),r=0;r<e;r++)a[r]=C;return n.index++,a}function Wi(e,n){return typeof n=="function"?n(e):n}function vl(e){var n=nn();return Hu(n,Pe,e)}function Hu(e,n,a){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=e.baseQueue,f=r.pending;if(f!==null){if(c!==null){var _=c.next;c.next=f.next,f.next=_}n.baseQueue=c=f,r.pending=null}if(f=e.baseState,c===null)e.memoizedState=f;else{n=c.next;var E=_=null,B=null,$=n,ut=!1;do{var pt=$.lane&-536870913;if(pt!==$.lane?(ye&pt)===pt:(Xi&pt)===pt){var tt=$.revertLane;if(tt===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null}),pt===Xs&&(ut=!0);else if((Xi&tt)===tt){$=$.next,tt===Xs&&(ut=!0);continue}else pt={lane:0,revertLane:$.revertLane,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},B===null?(E=B=pt,_=f):B=B.next=pt,se.lanes|=tt,Aa|=tt;pt=$.action,fs&&a(f,pt),f=$.hasEagerState?$.eagerState:a(f,pt)}else tt={lane:pt,revertLane:$.revertLane,gesture:$.gesture,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},B===null?(E=B=tt,_=f):B=B.next=tt,se.lanes|=pt,Aa|=pt;$=$.next}while($!==null&&$!==n);if(B===null?_=f:B.next=E,!Yn(f,e.memoizedState)&&(on=!0,ut&&(a=Ws,a!==null)))throw a;e.memoizedState=f,e.baseState=_,e.baseQueue=B,r.lastRenderedState=f}return c===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Gu(e){var n=nn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var r=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var _=c=c.next;do f=e(f,_.action),_=_.next;while(_!==c);Yn(f,n.memoizedState)||(on=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function kp(e,n,a){var r=se,c=nn(),f=Me;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var _=!Yn((Pe||c).memoizedState,a);if(_&&(c.memoizedState=a,on=!0),c=c.queue,Xu(qp.bind(null,r,c,e),[e]),c.getSnapshot!==n||_||rn!==null&&rn.memoizedState.tag&1){if(r.flags|=2048,Qs(9,{destroy:void 0},Wp.bind(null,r,c,a,n),null),Ge===null)throw Error(s(349));f||(Xi&127)!==0||Xp(r,n,a)}return a}function Xp(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=se.updateQueue,n===null?(n=_l(),se.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function Wp(e,n,a,r){n.value=a,n.getSnapshot=r,Yp(n)&&jp(e)}function qp(e,n,a){return a(function(){Yp(n)&&jp(e)})}function Yp(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Yn(e,a)}catch{return!0}}function jp(e){var n=ns(e,2);n!==null&&Gn(n,e,2)}function Vu(e){var n=Nn();if(typeof e=="function"){var a=e;if(e=a(),fs){Lt(!0);try{a()}finally{Lt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:e},n}function Zp(e,n,a,r){return e.baseState=a,Hu(e,Pe,typeof r=="function"?r:Wi)}function TS(e,n,a,r,c){if(xl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:c,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};z.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,Kp(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Kp(e,n){var a=n.action,r=n.payload,c=e.state;if(n.isTransition){var f=z.T,_={};z.T=_;try{var E=a(c,r),B=z.S;B!==null&&B(_,E),Qp(e,n,E)}catch($){ku(e,n,$)}finally{f!==null&&_.types!==null&&(f.types=_.types),z.T=f}}else try{f=a(c,r),Qp(e,n,f)}catch($){ku(e,n,$)}}function Qp(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Jp(e,n,r)},function(r){return ku(e,n,r)}):Jp(e,n,a)}function Jp(e,n,a){n.status="fulfilled",n.value=a,$p(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Kp(e,a)))}function ku(e,n,a){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,$p(n),n=n.next;while(n!==r)}e.action=null}function $p(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function tm(e,n){return n}function em(e,n){if(Me){var a=Ge.formState;if(a!==null){t:{var r=se;if(Me){if(ke){e:{for(var c=ke,f=ri;c.nodeType!==8;){if(!f){c=null;break e}if(c=li(c.nextSibling),c===null){c=null;break e}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){ke=li(c.nextSibling),r=c.data==="F!";break t}}ga(r)}r=!1}r&&(n=a[0])}}return a=Nn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:tm,lastRenderedState:n},a.queue=r,a=ym.bind(null,se,r),r.dispatch=a,r=Vu(!1),f=Zu.bind(null,se,!1,r.queue),r=Nn(),c={state:n,dispatch:null,action:e,pending:null},r.queue=c,a=TS.bind(null,se,c,f,a),c.dispatch=a,r.memoizedState=e,[n,a,!1]}function nm(e){var n=nn();return im(n,Pe,e)}function im(e,n,a){if(n=Hu(e,n,tm)[0],e=vl(Wi)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=co(n)}catch(_){throw _===qs?ll:_}else r=n;n=nn();var c=n.queue,f=c.dispatch;return a!==n.memoizedState&&(se.flags|=2048,Qs(9,{destroy:void 0},bS.bind(null,c,a),null)),[r,f,e]}function bS(e,n){e.action=n}function am(e){var n=nn(),a=Pe;if(a!==null)return im(n,a,e);nn(),n=n.memoizedState,a=nn();var r=a.queue.dispatch;return a.memoizedState=e,[n,r,!1]}function Qs(e,n,a,r){return e={tag:e,create:a,deps:r,inst:n,next:null},n=se.updateQueue,n===null&&(n=_l(),se.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,n.lastEffect=e),e}function sm(){return nn().memoizedState}function Sl(e,n,a,r){var c=Nn();se.flags|=e,c.memoizedState=Qs(1|n,{destroy:void 0},a,r===void 0?null:r)}function yl(e,n,a,r){var c=nn();r=r===void 0?null:r;var f=c.memoizedState.inst;Pe!==null&&r!==null&&Ou(r,Pe.memoizedState.deps)?c.memoizedState=Qs(n,f,a,r):(se.flags|=e,c.memoizedState=Qs(1|n,f,a,r))}function rm(e,n){Sl(8390656,8,e,n)}function Xu(e,n){yl(2048,8,e,n)}function AS(e){se.flags|=4;var n=se.updateQueue;if(n===null)n=_l(),se.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function om(e){var n=nn().memoizedState;return AS({ref:n,nextImpl:e}),function(){if((we&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function lm(e,n){return yl(4,2,e,n)}function cm(e,n){return yl(4,4,e,n)}function um(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function fm(e,n,a){a=a!=null?a.concat([e]):null,yl(4,4,um.bind(null,n,e),a)}function Wu(){}function hm(e,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Ou(n,r[1])?r[0]:(a.memoizedState=[e,n],e)}function dm(e,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Ou(n,r[1]))return r[0];if(r=e(),fs){Lt(!0);try{e()}finally{Lt(!1)}}return a.memoizedState=[r,n],r}function qu(e,n,a){return a===void 0||(Xi&1073741824)!==0&&(ye&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=p_(),se.lanes|=e,Aa|=e,a)}function pm(e,n,a,r){return Yn(a,n)?a:js.current!==null?(e=qu(e,a,r),Yn(e,n)||(on=!0),e):(Xi&42)===0||(Xi&1073741824)!==0&&(ye&261930)===0?(on=!0,e.memoizedState=a):(e=p_(),se.lanes|=e,Aa|=e,n)}function mm(e,n,a,r,c){var f=Z.p;Z.p=f!==0&&8>f?f:8;var _=z.T,E={};z.T=E,Zu(e,!1,n,a);try{var B=c(),$=z.S;if($!==null&&$(E,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ut=xS(B,r);uo(e,n,ut,$n(e))}else uo(e,n,r,$n(e))}catch(pt){uo(e,n,{then:function(){},status:"rejected",reason:pt},$n())}finally{Z.p=f,_!==null&&E.types!==null&&(_.types=E.types),z.T=_}}function RS(){}function Yu(e,n,a,r){if(e.tag!==5)throw Error(s(476));var c=_m(e).queue;mm(e,c,n,j,a===null?RS:function(){return gm(e),a(r)})}function _m(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:j,baseState:j,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:j},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function gm(e){var n=_m(e);n.next===null&&(n=e.alternate.memoizedState),uo(e,n.next.queue,{},$n())}function ju(){return En(Co)}function vm(){return nn().memoizedState}function Sm(){return nn().memoizedState}function CS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=$n();e=ya(a);var r=xa(n,e,a);r!==null&&(Gn(r,n,a),so(r,n,a)),n={cache:Eu()},e.payload=n;return}n=n.return}}function wS(e,n,a){var r=$n();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},xl(e)?xm(n,a):(a=hu(e,n,a,r),a!==null&&(Gn(a,e,r),Mm(a,n,r)))}function ym(e,n,a){var r=$n();uo(e,n,a,r)}function uo(e,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(xl(e))xm(n,c);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,E=f(_,a);if(c.hasEagerState=!0,c.eagerState=E,Yn(E,_))return el(e,n,c,0),Ge===null&&tl(),!1}catch{}finally{}if(a=hu(e,n,c,r),a!==null)return Gn(a,e,r),Mm(a,n,r),!0}return!1}function Zu(e,n,a,r){if(r={lane:2,revertLane:Cf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},xl(e)){if(n)throw Error(s(479))}else n=hu(e,a,r,2),n!==null&&Gn(n,e,2)}function xl(e){var n=e.alternate;return e===se||n!==null&&n===se}function xm(e,n){Zs=pl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Mm(e,n,a){if((a&4194048)!==0){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Gr(e,a)}}var fo={readContext:En,use:gl,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useLayoutEffect:Qe,useInsertionEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useSyncExternalStore:Qe,useId:Qe,useHostTransitionStatus:Qe,useFormState:Qe,useActionState:Qe,useOptimistic:Qe,useMemoCache:Qe,useCacheRefresh:Qe};fo.useEffectEvent=Qe;var Em={readContext:En,use:gl,useCallback:function(e,n){return Nn().memoizedState=[e,n===void 0?null:n],e},useContext:En,useEffect:rm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Sl(4194308,4,um.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Sl(4194308,4,e,n)},useInsertionEffect:function(e,n){Sl(4,2,e,n)},useMemo:function(e,n){var a=Nn();n=n===void 0?null:n;var r=e();if(fs){Lt(!0);try{e()}finally{Lt(!1)}}return a.memoizedState=[r,n],r},useReducer:function(e,n,a){var r=Nn();if(a!==void 0){var c=a(n);if(fs){Lt(!0);try{a(n)}finally{Lt(!1)}}}else c=n;return r.memoizedState=r.baseState=c,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:c},r.queue=e,e=e.dispatch=wS.bind(null,se,e),[r.memoizedState,e]},useRef:function(e){var n=Nn();return e={current:e},n.memoizedState=e},useState:function(e){e=Vu(e);var n=e.queue,a=ym.bind(null,se,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Wu,useDeferredValue:function(e,n){var a=Nn();return qu(a,e,n)},useTransition:function(){var e=Vu(!1);return e=mm.bind(null,se,e.queue,!0,!1),Nn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var r=se,c=Nn();if(Me){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Ge===null)throw Error(s(349));(ye&127)!==0||Xp(r,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,rm(qp.bind(null,r,f,e),[e]),r.flags|=2048,Qs(9,{destroy:void 0},Wp.bind(null,r,f,a,n),null),a},useId:function(){var e=Nn(),n=Ge.identifierPrefix;if(Me){var a=Di,r=wi;a=(r&~(1<<32-Jt(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ml++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=MS++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:ju,useFormState:em,useActionState:em,useOptimistic:function(e){var n=Nn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Zu.bind(null,se,!0,a),a.dispatch=n,[e,n]},useMemoCache:Fu,useCacheRefresh:function(){return Nn().memoizedState=CS.bind(null,se)},useEffectEvent:function(e){var n=Nn(),a={impl:e};return n.memoizedState=a,function(){if((we&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Ku={readContext:En,use:gl,useCallback:hm,useContext:En,useEffect:Xu,useImperativeHandle:fm,useInsertionEffect:lm,useLayoutEffect:cm,useMemo:dm,useReducer:vl,useRef:sm,useState:function(){return vl(Wi)},useDebugValue:Wu,useDeferredValue:function(e,n){var a=nn();return pm(a,Pe.memoizedState,e,n)},useTransition:function(){var e=vl(Wi)[0],n=nn().memoizedState;return[typeof e=="boolean"?e:co(e),n]},useSyncExternalStore:kp,useId:vm,useHostTransitionStatus:ju,useFormState:nm,useActionState:nm,useOptimistic:function(e,n){var a=nn();return Zp(a,Pe,e,n)},useMemoCache:Fu,useCacheRefresh:Sm};Ku.useEffectEvent=om;var Tm={readContext:En,use:gl,useCallback:hm,useContext:En,useEffect:Xu,useImperativeHandle:fm,useInsertionEffect:lm,useLayoutEffect:cm,useMemo:dm,useReducer:Gu,useRef:sm,useState:function(){return Gu(Wi)},useDebugValue:Wu,useDeferredValue:function(e,n){var a=nn();return Pe===null?qu(a,e,n):pm(a,Pe.memoizedState,e,n)},useTransition:function(){var e=Gu(Wi)[0],n=nn().memoizedState;return[typeof e=="boolean"?e:co(e),n]},useSyncExternalStore:kp,useId:vm,useHostTransitionStatus:ju,useFormState:am,useActionState:am,useOptimistic:function(e,n){var a=nn();return Pe!==null?Zp(a,Pe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Fu,useCacheRefresh:Sm};Tm.useEffectEvent=om;function Qu(e,n,a,r){n=e.memoizedState,a=a(r,n),a=a==null?n:S({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Ju={enqueueSetState:function(e,n,a){e=e._reactInternals;var r=$n(),c=ya(r);c.payload=n,a!=null&&(c.callback=a),n=xa(e,c,r),n!==null&&(Gn(n,e,r),so(n,e,r))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var r=$n(),c=ya(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=xa(e,c,r),n!==null&&(Gn(n,e,r),so(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=$n(),r=ya(a);r.tag=2,n!=null&&(r.callback=n),n=xa(e,r,a),n!==null&&(Gn(n,e,a),so(n,e,a))}};function bm(e,n,a,r,c,f,_){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,f,_):n.prototype&&n.prototype.isPureReactComponent?!Qr(a,r)||!Qr(c,f):!0}function Am(e,n,a,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==e&&Ju.enqueueReplaceState(n,n.state,null)}function hs(e,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(e=e.defaultProps){a===n&&(a=S({},a));for(var c in e)a[c]===void 0&&(a[c]=e[c])}return a}function Rm(e){$o(e)}function Cm(e){console.error(e)}function wm(e){$o(e)}function Ml(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function Dm(e,n,a){try{var r=e.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function $u(e,n,a){return a=ya(a),a.tag=3,a.payload={element:null},a.callback=function(){Ml(e,n)},a}function Um(e){return e=ya(e),e.tag=3,e}function Lm(e,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=r.value;e.payload=function(){return c(f)},e.callback=function(){Dm(n,a,r)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(e.callback=function(){Dm(n,a,r),typeof c!="function"&&(Ra===null?Ra=new Set([this]):Ra.add(this));var E=r.stack;this.componentDidCatch(r.value,{componentStack:E!==null?E:""})})}function DS(e,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&ks(n,a,c,!0),a=Zn.current,a!==null){switch(a.tag){case 31:case 13:return oi===null?Ol():a.alternate===null&&Je===0&&(Je=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===cl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),bf(e,r,c)),!1;case 22:return a.flags|=65536,r===cl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),bf(e,r,c)),!1}throw Error(s(435,a.tag))}return bf(e,r,c),Ol(),!1}if(Me)return n=Zn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==vu&&(e=Error(s(422),{cause:r}),to(ii(e,a)))):(r!==vu&&(n=Error(s(423),{cause:r}),to(ii(n,a))),e=e.current.alternate,e.flags|=65536,c&=-c,e.lanes|=c,r=ii(r,a),c=$u(e.stateNode,r,c),wu(e,c),Je!==4&&(Je=2)),!1;var f=Error(s(520),{cause:r});if(f=ii(f,a),yo===null?yo=[f]:yo.push(f),Je!==4&&(Je=2),n===null)return!0;r=ii(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=c&-c,a.lanes|=e,e=$u(a.stateNode,r,e),wu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ra===null||!Ra.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=Um(c),Lm(c,e,a,r),wu(a,c),!1}a=a.return}while(a!==null);return!1}var tf=Error(s(461)),on=!1;function Tn(e,n,a,r){n.child=e===null?zp(n,null,a,r):us(n,e.child,a,r)}function Nm(e,n,a,r,c){a=a.render;var f=n.ref;if("ref"in r){var _={};for(var E in r)E!=="ref"&&(_[E]=r[E])}else _=r;return rs(n),r=Pu(e,n,a,_,f,c),E=zu(),e!==null&&!on?(Bu(e,n,c),qi(e,n,c)):(Me&&E&&_u(n),n.flags|=1,Tn(e,n,r,c),n.child)}function Om(e,n,a,r,c){if(e===null){var f=a.type;return typeof f=="function"&&!du(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Pm(e,n,f,r,c)):(e=il(a.type,null,r,n,n.mode,c),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!cf(e,c)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:Qr,a(_,r)&&e.ref===n.ref)return qi(e,n,c)}return n.flags|=1,e=Hi(f,r),e.ref=n.ref,e.return=n,n.child=e}function Pm(e,n,a,r,c){if(e!==null){var f=e.memoizedProps;if(Qr(f,r)&&e.ref===n.ref)if(on=!1,n.pendingProps=r=f,cf(e,c))(e.flags&131072)!==0&&(on=!0);else return n.lanes=e.lanes,qi(e,n,c)}return ef(e,n,a,r,c)}function zm(e,n,a,r){var c=r.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(r=n.child=e.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~f}else r=0,n.child=null;return Bm(e,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&ol(n,f!==null?f.cachePool:null),f!==null?Fp(n,f):Uu(),Hp(n);else return r=n.lanes=536870912,Bm(e,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(ol(n,f.cachePool),Fp(n,f),Ea(),n.memoizedState=null):(e!==null&&ol(n,null),Uu(),Ea());return Tn(e,n,c,a),n.child}function ho(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Bm(e,n,a,r,c){var f=bu();return f=f===null?null:{parent:sn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&ol(n,null),Uu(),Hp(n),e!==null&&ks(e,n,r,!0),n.childLanes=c,null}function El(e,n){return n=bl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Im(e,n,a){return us(n,e.child,null,a),e=El(n,n.pendingProps),e.flags|=2,Kn(n),n.memoizedState=null,e}function US(e,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(r.mode==="hidden")return e=El(n,r),n.lanes=536870912,ho(null,e);if(Nu(n),(e=ke)?(e=K_(e,ri),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ma!==null?{id:wi,overflow:Di}:null,retryLane:536870912,hydrationErrors:null},a=xp(e),a.return=n,n.child=a,Mn=n,ke=null)):e=null,e===null)throw ga(n);return n.lanes=536870912,null}return El(n,r)}var f=e.memoizedState;if(f!==null){var _=f.dehydrated;if(Nu(n),c)if(n.flags&256)n.flags&=-257,n=Im(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(on||ks(e,n,a,!1),c=(a&e.childLanes)!==0,on||c){if(r=Ge,r!==null&&(_=Ri(r,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,ns(e,_),Gn(r,e,_),tf;Ol(),n=Im(e,n,a)}else e=f.treeContext,ke=li(_.nextSibling),Mn=n,Me=!0,_a=null,ri=!1,e!==null&&Tp(n,e),n=El(n,r),n.flags|=4096;return n}return e=Hi(e.child,{mode:r.mode,children:r.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Tl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function ef(e,n,a,r,c){return rs(n),a=Pu(e,n,a,r,void 0,c),r=zu(),e!==null&&!on?(Bu(e,n,c),qi(e,n,c)):(Me&&r&&_u(n),n.flags|=1,Tn(e,n,a,c),n.child)}function Fm(e,n,a,r,c,f){return rs(n),n.updateQueue=null,a=Vp(n,r,a,c),Gp(e),r=zu(),e!==null&&!on?(Bu(e,n,f),qi(e,n,f)):(Me&&r&&_u(n),n.flags|=1,Tn(e,n,a,f),n.child)}function Hm(e,n,a,r,c){if(rs(n),n.stateNode===null){var f=Fs,_=a.contextType;typeof _=="object"&&_!==null&&(f=En(_)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Ju,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Ru(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?En(_):Fs,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Qu(n,a,_,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&Ju.enqueueReplaceState(f,f.state,null),oo(n,r,f,c),ro(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(e===null){f=n.stateNode;var E=n.memoizedProps,B=hs(a,E);f.props=B;var $=f.context,ut=a.contextType;_=Fs,typeof ut=="object"&&ut!==null&&(_=En(ut));var pt=a.getDerivedStateFromProps;ut=typeof pt=="function"||typeof f.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(E||$!==_)&&Am(n,f,r,_),Sa=!1;var tt=n.memoizedState;f.state=tt,oo(n,r,f,c),ro(),$=n.memoizedState,E||tt!==$||Sa?(typeof pt=="function"&&(Qu(n,a,pt,r),$=n.memoizedState),(B=Sa||bm(n,a,B,r,tt,$,_))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=$),f.props=r,f.state=$,f.context=_,r=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,Cu(e,n),_=n.memoizedProps,ut=hs(a,_),f.props=ut,pt=n.pendingProps,tt=f.context,$=a.contextType,B=Fs,typeof $=="object"&&$!==null&&(B=En($)),E=a.getDerivedStateFromProps,($=typeof E=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==pt||tt!==B)&&Am(n,f,r,B),Sa=!1,tt=n.memoizedState,f.state=tt,oo(n,r,f,c),ro();var st=n.memoizedState;_!==pt||tt!==st||Sa||e!==null&&e.dependencies!==null&&sl(e.dependencies)?(typeof E=="function"&&(Qu(n,a,E,r),st=n.memoizedState),(ut=Sa||bm(n,a,ut,r,tt,st,B)||e!==null&&e.dependencies!==null&&sl(e.dependencies))?($||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,st,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,st,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&tt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&tt===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=st),f.props=r,f.state=st,f.context=B,r=ut):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&tt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&tt===e.memoizedState||(n.flags|=1024),r=!1)}return f=r,Tl(e,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&r?(n.child=us(n,e.child,null,c),n.child=us(n,null,a,c)):Tn(e,n,a,c),n.memoizedState=f.state,e=n.child):e=qi(e,n,c),e}function Gm(e,n,a,r){return as(),n.flags|=256,Tn(e,n,a,r),n.child}var nf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function af(e){return{baseLanes:e,cachePool:Dp()}}function sf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=Jn),e}function Vm(e,n,a){var r=n.pendingProps,c=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=e!==null&&e.memoizedState===null?!1:(en.current&2)!==0),_&&(c=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(c?Ma(n):Ea(),(e=ke)?(e=K_(e,ri),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ma!==null?{id:wi,overflow:Di}:null,retryLane:536870912,hydrationErrors:null},a=xp(e),a.return=n,n.child=a,Mn=n,ke=null)):e=null,e===null)throw ga(n);return Gf(e)?n.lanes=32:n.lanes=536870912,null}var E=r.children;return r=r.fallback,c?(Ea(),c=n.mode,E=bl({mode:"hidden",children:E},c),r=is(r,c,a,null),E.return=n,r.return=n,E.sibling=r,n.child=E,r=n.child,r.memoizedState=af(a),r.childLanes=sf(e,_,a),n.memoizedState=nf,ho(null,r)):(Ma(n),rf(n,E))}var B=e.memoizedState;if(B!==null&&(E=B.dehydrated,E!==null)){if(f)n.flags&256?(Ma(n),n.flags&=-257,n=of(e,n,a)):n.memoizedState!==null?(Ea(),n.child=e.child,n.flags|=128,n=null):(Ea(),E=r.fallback,c=n.mode,r=bl({mode:"visible",children:r.children},c),E=is(E,c,a,null),E.flags|=2,r.return=n,E.return=n,r.sibling=E,n.child=r,us(n,e.child,null,a),r=n.child,r.memoizedState=af(a),r.childLanes=sf(e,_,a),n.memoizedState=nf,n=ho(null,r));else if(Ma(n),Gf(E)){if(_=E.nextSibling&&E.nextSibling.dataset,_)var $=_.dgst;_=$,r=Error(s(419)),r.stack="",r.digest=_,to({value:r,source:null,stack:null}),n=of(e,n,a)}else if(on||ks(e,n,a,!1),_=(a&e.childLanes)!==0,on||_){if(_=Ge,_!==null&&(r=Ri(_,a),r!==0&&r!==B.retryLane))throw B.retryLane=r,ns(e,r),Gn(_,e,r),tf;Hf(E)||Ol(),n=of(e,n,a)}else Hf(E)?(n.flags|=192,n.child=e.child,n=null):(e=B.treeContext,ke=li(E.nextSibling),Mn=n,Me=!0,_a=null,ri=!1,e!==null&&Tp(n,e),n=rf(n,r.children),n.flags|=4096);return n}return c?(Ea(),E=r.fallback,c=n.mode,B=e.child,$=B.sibling,r=Hi(B,{mode:"hidden",children:r.children}),r.subtreeFlags=B.subtreeFlags&65011712,$!==null?E=Hi($,E):(E=is(E,c,a,null),E.flags|=2),E.return=n,r.return=n,r.sibling=E,n.child=r,ho(null,r),r=n.child,E=e.child.memoizedState,E===null?E=af(a):(c=E.cachePool,c!==null?(B=sn._currentValue,c=c.parent!==B?{parent:B,pool:B}:c):c=Dp(),E={baseLanes:E.baseLanes|a,cachePool:c}),r.memoizedState=E,r.childLanes=sf(e,_,a),n.memoizedState=nf,ho(e.child,r)):(Ma(n),a=e.child,e=a.sibling,a=Hi(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,e!==null&&(_=n.deletions,_===null?(n.deletions=[e],n.flags|=16):_.push(e)),n.child=a,n.memoizedState=null,a)}function rf(e,n){return n=bl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function bl(e,n){return e=jn(22,e,null,n),e.lanes=0,e}function of(e,n,a){return us(n,e.child,null,a),e=rf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function km(e,n,a){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),xu(e.return,n,a)}function lf(e,n,a,r,c,f){var _=e.memoizedState;_===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=r,_.tail=a,_.tailMode=c,_.treeForkCount=f)}function Xm(e,n,a){var r=n.pendingProps,c=r.revealOrder,f=r.tail;r=r.children;var _=en.current,E=(_&2)!==0;if(E?(_=_&1|2,n.flags|=128):_&=1,yt(en,_),Tn(e,n,r,a),r=Me?$r:0,!E&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&km(e,a,n);else if(e.tag===19)km(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)e=a.alternate,e!==null&&dl(e)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),lf(n,!1,c,a,f,r);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(e=c.alternate,e!==null&&dl(e)===null){n.child=c;break}e=c.sibling,c.sibling=a,a=c,c=e}lf(n,!0,a,null,f,r);break;case"together":lf(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function qi(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Aa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(ks(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Hi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Hi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function cf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&sl(e)))}function LS(e,n,a){switch(n.tag){case 3:Gt(n,n.stateNode.containerInfo),va(n,sn,e.memoizedState.cache),as();break;case 27:case 5:ne(n);break;case 4:Gt(n,n.stateNode.containerInfo);break;case 10:va(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Nu(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(Ma(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Vm(e,n,a):(Ma(n),e=qi(e,n,a),e!==null?e.sibling:null);Ma(n);break;case 19:var c=(e.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(ks(e,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return Xm(e,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),yt(en,en.current),r)break;return null;case 22:return n.lanes=0,zm(e,n,a,n.pendingProps);case 24:va(n,sn,e.memoizedState.cache)}return qi(e,n,a)}function Wm(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)on=!0;else{if(!cf(e,a)&&(n.flags&128)===0)return on=!1,LS(e,n,a);on=(e.flags&131072)!==0}else on=!1,Me&&(n.flags&1048576)!==0&&Ep(n,$r,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(e=ls(n.elementType),n.type=e,typeof e=="function")du(e)?(r=hs(e,r),n.tag=1,n=Hm(null,n,e,r,a)):(n.tag=0,n=ef(null,n,e,r,a));else{if(e!=null){var c=e.$$typeof;if(c===L){n.tag=11,n=Nm(null,n,e,r,a);break t}else if(c===D){n.tag=14,n=Om(null,n,e,r,a);break t}}throw n=mt(e)||e,Error(s(306,n,""))}}return n;case 0:return ef(e,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=hs(r,n.pendingProps),Hm(e,n,r,c,a);case 3:t:{if(Gt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;c=f.element,Cu(e,n),oo(n,r,null,a);var _=n.memoizedState;if(r=_.cache,va(n,sn,r),r!==f.cache&&Mu(n,[sn],a,!0),ro(),r=_.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Gm(e,n,r,a);break t}else if(r!==c){c=ii(Error(s(424)),n),to(c),n=Gm(e,n,r,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(ke=li(e.firstChild),Mn=n,Me=!0,_a=null,ri=!0,a=zp(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(as(),r===c){n=qi(e,n,a);break t}Tn(e,n,r,a)}n=n.child}return n;case 26:return Tl(e,n),e===null?(a=ng(n.type,null,n.pendingProps,null))?n.memoizedState=a:Me||(a=n.type,e=n.pendingProps,r=Gl(Et.current).createElement(a),r[Ke]=n,r[xn]=e,bn(r,a,e),vt(r),n.stateNode=r):n.memoizedState=ng(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return ne(n),e===null&&Me&&(r=n.stateNode=$_(n.type,n.pendingProps,Et.current),Mn=n,ri=!0,c=ke,Ua(n.type)?(Vf=c,ke=li(r.firstChild)):ke=c),Tn(e,n,n.pendingProps.children,a),Tl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((c=r=ke)&&(r=ly(r,n.type,n.pendingProps,ri),r!==null?(n.stateNode=r,Mn=n,ke=li(r.firstChild),ri=!1,c=!0):c=!1),c||ga(n)),ne(n),c=n.type,f=n.pendingProps,_=e!==null?e.memoizedProps:null,r=f.children,Bf(c,f)?r=null:_!==null&&Bf(c,_)&&(n.flags|=32),n.memoizedState!==null&&(c=Pu(e,n,ES,null,null,a),Co._currentValue=c),Tl(e,n),Tn(e,n,r,a),n.child;case 6:return e===null&&Me&&((e=a=ke)&&(a=cy(a,n.pendingProps,ri),a!==null?(n.stateNode=a,Mn=n,ke=null,e=!0):e=!1),e||ga(n)),null;case 13:return Vm(e,n,a);case 4:return Gt(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=us(n,null,r,a):Tn(e,n,r,a),n.child;case 11:return Nm(e,n,n.type,n.pendingProps,a);case 7:return Tn(e,n,n.pendingProps,a),n.child;case 8:return Tn(e,n,n.pendingProps.children,a),n.child;case 12:return Tn(e,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,va(n,n.type,r.value),Tn(e,n,r.children,a),n.child;case 9:return c=n.type._context,r=n.pendingProps.children,rs(n),c=En(c),r=r(c),n.flags|=1,Tn(e,n,r,a),n.child;case 14:return Om(e,n,n.type,n.pendingProps,a);case 15:return Pm(e,n,n.type,n.pendingProps,a);case 19:return Xm(e,n,a);case 31:return US(e,n,a);case 22:return zm(e,n,a,n.pendingProps);case 24:return rs(n),r=En(sn),e===null?(c=bu(),c===null&&(c=Ge,f=Eu(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:r,cache:c},Ru(n),va(n,sn,c)):((e.lanes&a)!==0&&(Cu(e,n),oo(n,null,null,a),ro()),c=e.memoizedState,f=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),va(n,sn,r)):(r=f.cache,va(n,sn,r),r!==c.cache&&Mu(n,[sn],a,!0))),Tn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Yi(e){e.flags|=4}function uf(e,n,a,r,c){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(c&335544128)===c)if(e.stateNode.complete)e.flags|=8192;else if(v_())e.flags|=8192;else throw cs=cl,Au}else e.flags&=-16777217}function qm(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!og(n))if(v_())e.flags|=8192;else throw cs=cl,Au}function Al(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?un():536870912,e.lanes|=n,er|=n)}function po(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Xe(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(n)for(var c=e.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&65011712,r|=c.flags&65011712,c.return=e,c=c.sibling;else for(c=e.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=e,c=c.sibling;return e.subtreeFlags|=r,e.childLanes=a,n}function NS(e,n,a){var r=n.pendingProps;switch(gu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xe(n),null;case 1:return Xe(n),null;case 3:return a=n.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),ki(sn),Ft(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Vs(n)?Yi(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Su())),Xe(n),null;case 26:var c=n.type,f=n.memoizedState;return e===null?(Yi(n),f!==null?(Xe(n),qm(n,f)):(Xe(n),uf(n,c,null,r,a))):f?f!==e.memoizedState?(Yi(n),Xe(n),qm(n,f)):(Xe(n),n.flags&=-16777217):(e=e.memoizedProps,e!==r&&Yi(n),Xe(n),uf(n,c,e,r,a)),null;case 27:if(Ne(n),a=Et.current,c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Yi(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Xe(n),null}e=Y.current,Vs(n)?bp(n):(e=$_(c,r,a),n.stateNode=e,Yi(n))}return Xe(n),null;case 5:if(Ne(n),c=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Yi(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return Xe(n),null}if(f=Y.current,Vs(n))bp(n);else{var _=Gl(Et.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?_.createElement("select",{is:r.is}):_.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?_.createElement(c,{is:r.is}):_.createElement(c)}}f[Ke]=n,f[xn]=r;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;t:switch(bn(f,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Yi(n)}}return Xe(n),uf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==r&&Yi(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(e=Et.current,Vs(n)){if(e=n.stateNode,a=n.memoizedProps,r=null,c=Mn,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}e[Ke]=n,e=!!(e.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||V_(e.nodeValue,a)),e||ga(n,!0)}else e=Gl(e).createTextNode(r),e[Ke]=n,n.stateNode=e}return Xe(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(r=Vs(n),a!==null){if(e===null){if(!r)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[Ke]=n}else as(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Xe(n),e=!1}else a=Su(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(Kn(n),n):(Kn(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Xe(n),null;case 13:if(r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(c=Vs(n),r!==null&&r.dehydrated!==null){if(e===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[Ke]=n}else as(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Xe(n),c=!1}else c=Su(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(Kn(n),n):(Kn(n),null)}return Kn(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,e=e!==null&&e.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==c&&(r.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Al(n,n.updateQueue),Xe(n),null);case 4:return Ft(),e===null&&Lf(n.stateNode.containerInfo),Xe(n),null;case 10:return ki(n.type),Xe(n),null;case 19:if(nt(en),r=n.memoizedState,r===null)return Xe(n),null;if(c=(n.flags&128)!==0,f=r.rendering,f===null)if(c)po(r,!1);else{if(Je!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=dl(e),f!==null){for(n.flags|=128,po(r,!1),e=f.updateQueue,n.updateQueue=e,Al(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)yp(a,e),a=a.sibling;return yt(en,en.current&1|2),Me&&Gi(n,r.treeForkCount),n.child}e=e.sibling}r.tail!==null&&ft()>Ul&&(n.flags|=128,c=!0,po(r,!1),n.lanes=4194304)}else{if(!c)if(e=dl(f),e!==null){if(n.flags|=128,c=!0,e=e.updateQueue,n.updateQueue=e,Al(n,e),po(r,!0),r.tail===null&&r.tailMode==="hidden"&&!f.alternate&&!Me)return Xe(n),null}else 2*ft()-r.renderingStartTime>Ul&&a!==536870912&&(n.flags|=128,c=!0,po(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(e=r.last,e!==null?e.sibling=f:n.child=f,r.last=f)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ft(),e.sibling=null,a=en.current,yt(en,c?a&1|2:a&1),Me&&Gi(n,r.treeForkCount),e):(Xe(n),null);case 22:case 23:return Kn(n),Lu(),r=n.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(Xe(n),n.subtreeFlags&6&&(n.flags|=8192)):Xe(n),a=n.updateQueue,a!==null&&Al(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),e!==null&&nt(os),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ki(sn),Xe(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function OS(e,n){switch(gu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ki(sn),Ft(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Ne(n),null;case 31:if(n.memoizedState!==null){if(Kn(n),n.alternate===null)throw Error(s(340));as()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Kn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));as()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return nt(en),null;case 4:return Ft(),null;case 10:return ki(n.type),null;case 22:case 23:return Kn(n),Lu(),e!==null&&nt(os),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ki(sn),null;case 25:return null;default:return null}}function Ym(e,n){switch(gu(n),n.tag){case 3:ki(sn),Ft();break;case 26:case 27:case 5:Ne(n);break;case 4:Ft();break;case 31:n.memoizedState!==null&&Kn(n);break;case 13:Kn(n);break;case 19:nt(en);break;case 10:ki(n.type);break;case 22:case 23:Kn(n),Lu(),e!==null&&nt(os);break;case 24:ki(sn)}}function mo(e,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&e)===e){r=void 0;var f=a.create,_=a.inst;r=f(),_.destroy=r}a=a.next}while(a!==c)}}catch(E){Le(n,n.return,E)}}function Ta(e,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var f=c.next;r=f;do{if((r.tag&e)===e){var _=r.inst,E=_.destroy;if(E!==void 0){_.destroy=void 0,c=n;var B=a,$=E;try{$()}catch(ut){Le(c,B,ut)}}}r=r.next}while(r!==f)}}catch(ut){Le(n,n.return,ut)}}function jm(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Ip(n,a)}catch(r){Le(e,e.return,r)}}}function Zm(e,n,a){a.props=hs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(r){Le(e,n,r)}}function _o(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof a=="function"?e.refCleanup=a(r):a.current=r}}catch(c){Le(e,n,c)}}function Ui(e,n){var a=e.ref,r=e.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){Le(e,n,c)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){Le(e,n,c)}else a.current=null}function Km(e){var n=e.type,a=e.memoizedProps,r=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){Le(e,e.return,c)}}function ff(e,n,a){try{var r=e.stateNode;ny(r,e.type,a,n),r[xn]=n}catch(c){Le(e,e.return,c)}}function Qm(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ua(e.type)||e.tag===4}function hf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Qm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ua(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function df(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Ii));else if(r!==4&&(r===27&&Ua(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(df(e,n,a),e=e.sibling;e!==null;)df(e,n,a),e=e.sibling}function Rl(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(r!==4&&(r===27&&Ua(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Rl(e,n,a),e=e.sibling;e!==null;)Rl(e,n,a),e=e.sibling}function Jm(e){var n=e.stateNode,a=e.memoizedProps;try{for(var r=e.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);bn(n,r,a),n[Ke]=e,n[xn]=a}catch(f){Le(e,e.return,f)}}var ji=!1,ln=!1,pf=!1,$m=typeof WeakSet=="function"?WeakSet:Set,gn=null;function PS(e,n){if(e=e.containerInfo,Pf=jl,e=fp(e),ru(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var c=r.anchorOffset,f=r.focusNode;r=r.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var _=0,E=-1,B=-1,$=0,ut=0,pt=e,tt=null;e:for(;;){for(var st;pt!==a||c!==0&&pt.nodeType!==3||(E=_+c),pt!==f||r!==0&&pt.nodeType!==3||(B=_+r),pt.nodeType===3&&(_+=pt.nodeValue.length),(st=pt.firstChild)!==null;)tt=pt,pt=st;for(;;){if(pt===e)break e;if(tt===a&&++$===c&&(E=_),tt===f&&++ut===r&&(B=_),(st=pt.nextSibling)!==null)break;pt=tt,tt=pt.parentNode}pt=st}a=E===-1||B===-1?null:{start:E,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(zf={focusedElem:e,selectionRange:a},jl=!1,gn=n;gn!==null;)if(n=gn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,gn=e;else for(;gn!==null;){switch(n=gn,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)c=e[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,c=f.memoizedProps,f=f.memoizedState,r=a.stateNode;try{var It=hs(a.type,c);e=r.getSnapshotBeforeUpdate(It,f),r.__reactInternalSnapshotBeforeUpdate=e}catch(Qt){Le(a,a.return,Qt)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Ff(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Ff(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,gn=e;break}gn=n.return}}function t_(e,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:Ki(e,a),r&4&&mo(5,a);break;case 1:if(Ki(e,a),r&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(_){Le(a,a.return,_)}else{var c=hs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(c,n,e.__reactInternalSnapshotBeforeUpdate)}catch(_){Le(a,a.return,_)}}r&64&&jm(a),r&512&&_o(a,a.return);break;case 3:if(Ki(e,a),r&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Ip(e,n)}catch(_){Le(a,a.return,_)}}break;case 27:n===null&&r&4&&Jm(a);case 26:case 5:Ki(e,a),n===null&&r&4&&Km(a),r&512&&_o(a,a.return);break;case 12:Ki(e,a);break;case 31:Ki(e,a),r&4&&i_(e,a);break;case 13:Ki(e,a),r&4&&a_(e,a),r&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=XS.bind(null,a),uy(e,a))));break;case 22:if(r=a.memoizedState!==null||ji,!r){n=n!==null&&n.memoizedState!==null||ln,c=ji;var f=ln;ji=r,(ln=n)&&!f?Qi(e,a,(a.subtreeFlags&8772)!==0):Ki(e,a),ji=c,ln=f}break;case 30:break;default:Ki(e,a)}}function e_(e){var n=e.alternate;n!==null&&(e.alternate=null,e_(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&A(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ye=null,Bn=!1;function Zi(e,n,a){for(a=a.child;a!==null;)n_(e,n,a),a=a.sibling}function n_(e,n,a){if(Xt&&typeof Xt.onCommitFiberUnmount=="function")try{Xt.onCommitFiberUnmount(Yt,a)}catch{}switch(a.tag){case 26:ln||Ui(a,n),Zi(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ln||Ui(a,n);var r=Ye,c=Bn;Ua(a.type)&&(Ye=a.stateNode,Bn=!1),Zi(e,n,a),bo(a.stateNode),Ye=r,Bn=c;break;case 5:ln||Ui(a,n);case 6:if(r=Ye,c=Bn,Ye=null,Zi(e,n,a),Ye=r,Bn=c,Ye!==null)if(Bn)try{(Ye.nodeType===9?Ye.body:Ye.nodeName==="HTML"?Ye.ownerDocument.body:Ye).removeChild(a.stateNode)}catch(f){Le(a,n,f)}else try{Ye.removeChild(a.stateNode)}catch(f){Le(a,n,f)}break;case 18:Ye!==null&&(Bn?(e=Ye,j_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),cr(e)):j_(Ye,a.stateNode));break;case 4:r=Ye,c=Bn,Ye=a.stateNode.containerInfo,Bn=!0,Zi(e,n,a),Ye=r,Bn=c;break;case 0:case 11:case 14:case 15:Ta(2,a,n),ln||Ta(4,a,n),Zi(e,n,a);break;case 1:ln||(Ui(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&Zm(a,n,r)),Zi(e,n,a);break;case 21:Zi(e,n,a);break;case 22:ln=(r=ln)||a.memoizedState!==null,Zi(e,n,a),ln=r;break;default:Zi(e,n,a)}}function i_(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{cr(e)}catch(a){Le(n,n.return,a)}}}function a_(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{cr(e)}catch(a){Le(n,n.return,a)}}function zS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new $m),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new $m),n;default:throw Error(s(435,e.tag))}}function Cl(e,n){var a=zS(e);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=WS.bind(null,e,r);r.then(c,c)}})}function In(e,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r],f=e,_=n,E=_;t:for(;E!==null;){switch(E.tag){case 27:if(Ua(E.type)){Ye=E.stateNode,Bn=!1;break t}break;case 5:Ye=E.stateNode,Bn=!1;break t;case 3:case 4:Ye=E.stateNode.containerInfo,Bn=!0;break t}E=E.return}if(Ye===null)throw Error(s(160));n_(f,_,c),Ye=null,Bn=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)s_(n,e),n=n.sibling}var gi=null;function s_(e,n){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:In(n,e),Fn(e),r&4&&(Ta(3,e,e.return),mo(3,e),Ta(5,e,e.return));break;case 1:In(n,e),Fn(e),r&512&&(ln||a===null||Ui(a,a.return)),r&64&&ji&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var c=gi;if(In(n,e),Fn(e),r&512&&(ln||a===null||Ui(a,a.return)),r&4){var f=a!==null?a.memoizedState:null;if(r=e.memoizedState,a===null)if(r===null)if(e.stateNode===null){t:{r=e.type,a=e.memoizedProps,c=c.ownerDocument||c;e:switch(r){case"title":f=c.getElementsByTagName("title")[0],(!f||f[Qa]||f[Ke]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(r),c.head.insertBefore(f,c.querySelector("head > title"))),bn(f,r,a),f[Ke]=e,vt(f),r=f;break t;case"link":var _=sg("link","href",c).get(r+(a.href||""));if(_){for(var E=0;E<_.length;E++)if(f=_[E],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){_.splice(E,1);break e}}f=c.createElement(r),bn(f,r,a),c.head.appendChild(f);break;case"meta":if(_=sg("meta","content",c).get(r+(a.content||""))){for(E=0;E<_.length;E++)if(f=_[E],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){_.splice(E,1);break e}}f=c.createElement(r),bn(f,r,a),c.head.appendChild(f);break;default:throw Error(s(468,r))}f[Ke]=e,vt(f),r=f}e.stateNode=r}else rg(c,e.type,e.stateNode);else e.stateNode=ag(c,r,e.memoizedProps);else f!==r?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,r===null?rg(c,e.type,e.stateNode):ag(c,r,e.memoizedProps)):r===null&&e.stateNode!==null&&ff(e,e.memoizedProps,a.memoizedProps)}break;case 27:In(n,e),Fn(e),r&512&&(ln||a===null||Ui(a,a.return)),a!==null&&r&4&&ff(e,e.memoizedProps,a.memoizedProps);break;case 5:if(In(n,e),Fn(e),r&512&&(ln||a===null||Ui(a,a.return)),e.flags&32){c=e.stateNode;try{Ls(c,"")}catch(It){Le(e,e.return,It)}}r&4&&e.stateNode!=null&&(c=e.memoizedProps,ff(e,c,a!==null?a.memoizedProps:c)),r&1024&&(pf=!0);break;case 6:if(In(n,e),Fn(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,a=e.stateNode;try{a.nodeValue=r}catch(It){Le(e,e.return,It)}}break;case 3:if(Xl=null,c=gi,gi=Vl(n.containerInfo),In(n,e),gi=c,Fn(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{cr(n.containerInfo)}catch(It){Le(e,e.return,It)}pf&&(pf=!1,r_(e));break;case 4:r=gi,gi=Vl(e.stateNode.containerInfo),In(n,e),Fn(e),gi=r;break;case 12:In(n,e),Fn(e);break;case 31:In(n,e),Fn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Cl(e,r)));break;case 13:In(n,e),Fn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Dl=ft()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Cl(e,r)));break;case 22:c=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,$=ji,ut=ln;if(ji=$||c,ln=ut||B,In(n,e),ln=ut,ji=$,Fn(e),r&8192)t:for(n=e.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||B||ji||ln||ds(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,c)_=f.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none";else{E=B.stateNode;var pt=B.memoizedProps.style,tt=pt!=null&&pt.hasOwnProperty("display")?pt.display:null;E.style.display=tt==null||typeof tt=="boolean"?"":(""+tt).trim()}}catch(It){Le(B,B.return,It)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=c?"":B.memoizedProps}catch(It){Le(B,B.return,It)}}}else if(n.tag===18){if(a===null){B=n;try{var st=B.stateNode;c?Z_(st,!0):Z_(B.stateNode,!1)}catch(It){Le(B,B.return,It)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=e.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,Cl(e,a))));break;case 19:In(n,e),Fn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Cl(e,r)));break;case 30:break;case 21:break;default:In(n,e),Fn(e)}}function Fn(e){var n=e.flags;if(n&2){try{for(var a,r=e.return;r!==null;){if(Qm(r)){a=r;break}r=r.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var c=a.stateNode,f=hf(e);Rl(e,f,c);break;case 5:var _=a.stateNode;a.flags&32&&(Ls(_,""),a.flags&=-33);var E=hf(e);Rl(e,E,_);break;case 3:case 4:var B=a.stateNode.containerInfo,$=hf(e);df(e,$,B);break;default:throw Error(s(161))}}catch(ut){Le(e,e.return,ut)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function r_(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;r_(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Ki(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)t_(e,n.alternate,n),n=n.sibling}function ds(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Ta(4,n,n.return),ds(n);break;case 1:Ui(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Zm(n,n.return,a),ds(n);break;case 27:bo(n.stateNode);case 26:case 5:Ui(n,n.return),ds(n);break;case 22:n.memoizedState===null&&ds(n);break;case 30:ds(n);break;default:ds(n)}e=e.sibling}}function Qi(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,c=e,f=n,_=f.flags;switch(f.tag){case 0:case 11:case 15:Qi(c,f,a),mo(4,f);break;case 1:if(Qi(c,f,a),r=f,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch($){Le(r,r.return,$)}if(r=f,c=r.updateQueue,c!==null){var E=r.stateNode;try{var B=c.shared.hiddenCallbacks;if(B!==null)for(c.shared.hiddenCallbacks=null,c=0;c<B.length;c++)Bp(B[c],E)}catch($){Le(r,r.return,$)}}a&&_&64&&jm(f),_o(f,f.return);break;case 27:Jm(f);case 26:case 5:Qi(c,f,a),a&&r===null&&_&4&&Km(f),_o(f,f.return);break;case 12:Qi(c,f,a);break;case 31:Qi(c,f,a),a&&_&4&&i_(c,f);break;case 13:Qi(c,f,a),a&&_&4&&a_(c,f);break;case 22:f.memoizedState===null&&Qi(c,f,a),_o(f,f.return);break;case 30:break;default:Qi(c,f,a)}n=n.sibling}}function mf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&eo(a))}function _f(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e))}function vi(e,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)o_(e,n,a,r),n=n.sibling}function o_(e,n,a,r){var c=n.flags;switch(n.tag){case 0:case 11:case 15:vi(e,n,a,r),c&2048&&mo(9,n);break;case 1:vi(e,n,a,r);break;case 3:vi(e,n,a,r),c&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e)));break;case 12:if(c&2048){vi(e,n,a,r),e=n.stateNode;try{var f=n.memoizedProps,_=f.id,E=f.onPostCommit;typeof E=="function"&&E(_,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){Le(n,n.return,B)}}else vi(e,n,a,r);break;case 31:vi(e,n,a,r);break;case 13:vi(e,n,a,r);break;case 23:break;case 22:f=n.stateNode,_=n.alternate,n.memoizedState!==null?f._visibility&2?vi(e,n,a,r):go(e,n):f._visibility&2?vi(e,n,a,r):(f._visibility|=2,Js(e,n,a,r,(n.subtreeFlags&10256)!==0||!1)),c&2048&&mf(_,n);break;case 24:vi(e,n,a,r),c&2048&&_f(n.alternate,n);break;default:vi(e,n,a,r)}}function Js(e,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,_=n,E=a,B=r,$=_.flags;switch(_.tag){case 0:case 11:case 15:Js(f,_,E,B,c),mo(8,_);break;case 23:break;case 22:var ut=_.stateNode;_.memoizedState!==null?ut._visibility&2?Js(f,_,E,B,c):go(f,_):(ut._visibility|=2,Js(f,_,E,B,c)),c&&$&2048&&mf(_.alternate,_);break;case 24:Js(f,_,E,B,c),c&&$&2048&&_f(_.alternate,_);break;default:Js(f,_,E,B,c)}n=n.sibling}}function go(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,r=n,c=r.flags;switch(r.tag){case 22:go(a,r),c&2048&&mf(r.alternate,r);break;case 24:go(a,r),c&2048&&_f(r.alternate,r);break;default:go(a,r)}n=n.sibling}}var vo=8192;function $s(e,n,a){if(e.subtreeFlags&vo)for(e=e.child;e!==null;)l_(e,n,a),e=e.sibling}function l_(e,n,a){switch(e.tag){case 26:$s(e,n,a),e.flags&vo&&e.memoizedState!==null&&My(a,gi,e.memoizedState,e.memoizedProps);break;case 5:$s(e,n,a);break;case 3:case 4:var r=gi;gi=Vl(e.stateNode.containerInfo),$s(e,n,a),gi=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=vo,vo=16777216,$s(e,n,a),vo=r):$s(e,n,a));break;default:$s(e,n,a)}}function c_(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function So(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];gn=r,f_(r,e)}c_(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)u_(e),e=e.sibling}function u_(e){switch(e.tag){case 0:case 11:case 15:So(e),e.flags&2048&&Ta(9,e,e.return);break;case 3:So(e);break;case 12:So(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,wl(e)):So(e);break;default:So(e)}}function wl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];gn=r,f_(r,e)}c_(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Ta(8,n,n.return),wl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,wl(n));break;default:wl(n)}e=e.sibling}}function f_(e,n){for(;gn!==null;){var a=gn;switch(a.tag){case 0:case 11:case 15:Ta(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:eo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,gn=r;else t:for(a=e;gn!==null;){r=gn;var c=r.sibling,f=r.return;if(e_(r),r===a){gn=null;break t}if(c!==null){c.return=f,gn=c;break t}gn=f}}}var BS={getCacheForType:function(e){var n=En(sn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return En(sn).controller.signal}},IS=typeof WeakMap=="function"?WeakMap:Map,we=0,Ge=null,pe=null,ye=0,Ue=0,Qn=null,ba=!1,tr=!1,gf=!1,Ji=0,Je=0,Aa=0,ps=0,vf=0,Jn=0,er=0,yo=null,Hn=null,Sf=!1,Dl=0,h_=0,Ul=1/0,Ll=null,Ra=null,hn=0,Ca=null,nr=null,$i=0,yf=0,xf=null,d_=null,xo=0,Mf=null;function $n(){return(we&2)!==0&&ye!==0?ye&-ye:z.T!==null?Cf():Vr()}function p_(){if(Jn===0)if((ye&536870912)===0||Me){var e=ot;ot<<=1,(ot&3932160)===0&&(ot=262144),Jn=e}else Jn=536870912;return e=Zn.current,e!==null&&(e.flags|=32),Jn}function Gn(e,n,a){(e===Ge&&(Ue===2||Ue===9)||e.cancelPendingCommit!==null)&&(ir(e,0),wa(e,ye,Jn,!1)),yn(e,a),((we&2)===0||e!==Ge)&&(e===Ge&&((we&2)===0&&(ps|=a),Je===4&&wa(e,ye,Jn,!1)),Li(e))}function m_(e,n,a){if((we&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&e.expiredLanes)===0||$t(e,n),c=r?GS(e,n):Tf(e,n,!0),f=r;do{if(c===0){tr&&!r&&wa(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!FS(a)){c=Tf(e,n,!1),f=!1;continue}if(c===2){if(f=n,e.errorRecoveryDisabledLanes&f)var _=0;else _=e.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var E=e;c=yo;var B=E.current.memoizedState.isDehydrated;if(B&&(ir(E,_).flags|=256),_=Tf(E,_,!1),_!==2){if(gf&&!B){E.errorRecoveryDisabledLanes|=f,ps|=f,c=4;break t}f=Hn,Hn=c,f!==null&&(Hn===null?Hn=f:Hn.push.apply(Hn,f))}c=_}if(f=!1,c!==2)continue}}if(c===1){ir(e,0),wa(e,n,0,!0);break}t:{switch(r=e,f=c,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:wa(r,n,Jn,!ba);break t;case 2:Hn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=Dl+300-ft(),10<c)){if(wa(r,n,Jn,!ba),wt(r,0,!0)!==0)break t;$i=n,r.timeoutHandle=q_(__.bind(null,r,a,Hn,Ll,Sf,n,Jn,ps,er,ba,f,"Throttled",-0,0),c);break t}__(r,a,Hn,Ll,Sf,n,Jn,ps,er,ba,f,null,-0,0)}}break}while(!0);Li(e)}function __(e,n,a,r,c,f,_,E,B,$,ut,pt,tt,st){if(e.timeoutHandle=-1,pt=n.subtreeFlags,pt&8192||(pt&16785408)===16785408){pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ii},l_(n,f,pt);var It=(f&62914560)===f?Dl-ft():(f&4194048)===f?h_-ft():0;if(It=Ey(pt,It),It!==null){$i=f,e.cancelPendingCommit=It(T_.bind(null,e,n,f,a,r,c,_,E,B,ut,pt,null,tt,st)),wa(e,f,_,!$);return}}T_(e,n,f,a,r,c,_,E,B)}function FS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],f=c.getSnapshot;c=c.value;try{if(!Yn(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function wa(e,n,a,r){n&=~vf,n&=~ps,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes;for(var c=n;0<c;){var f=31-Jt(c),_=1<<f;r[f]=-1,c&=~_}a!==0&&Hr(e,a,n)}function Nl(){return(we&6)===0?(Mo(0),!1):!0}function Ef(){if(pe!==null){if(Ue===0)var e=pe.return;else e=pe,Vi=ss=null,Iu(e),Ys=null,io=0,e=pe;for(;e!==null;)Ym(e.alternate,e),e=e.return;pe=null}}function ir(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,sy(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),$i=0,Ef(),Ge=e,pe=a=Hi(e.current,null),ye=n,Ue=0,Qn=null,ba=!1,tr=$t(e,n),gf=!1,er=Jn=vf=ps=Aa=Je=0,Hn=yo=null,Sf=!1,(n&8)!==0&&(n|=n&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=n;0<r;){var c=31-Jt(r),f=1<<c;n|=e[c],r&=~f}return Ji=n,tl(),a}function g_(e,n){se=null,z.H=fo,n===qs||n===ll?(n=Np(),Ue=3):n===Au?(n=Np(),Ue=4):Ue=n===tf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Qn=n,pe===null&&(Je=1,Ml(e,ii(n,e.current)))}function v_(){var e=Zn.current;return e===null?!0:(ye&4194048)===ye?oi===null:(ye&62914560)===ye||(ye&536870912)!==0?e===oi:!1}function S_(){var e=z.H;return z.H=fo,e===null?fo:e}function y_(){var e=z.A;return z.A=BS,e}function Ol(){Je=4,ba||(ye&4194048)!==ye&&Zn.current!==null||(tr=!0),(Aa&134217727)===0&&(ps&134217727)===0||Ge===null||wa(Ge,ye,Jn,!1)}function Tf(e,n,a){var r=we;we|=2;var c=S_(),f=y_();(Ge!==e||ye!==n)&&(Ll=null,ir(e,n)),n=!1;var _=Je;t:do try{if(Ue!==0&&pe!==null){var E=pe,B=Qn;switch(Ue){case 8:Ef(),_=6;break t;case 3:case 2:case 9:case 6:Zn.current===null&&(n=!0);var $=Ue;if(Ue=0,Qn=null,ar(e,E,B,$),a&&tr){_=0;break t}break;default:$=Ue,Ue=0,Qn=null,ar(e,E,B,$)}}HS(),_=Je;break}catch(ut){g_(e,ut)}while(!0);return n&&e.shellSuspendCounter++,Vi=ss=null,we=r,z.H=c,z.A=f,pe===null&&(Ge=null,ye=0,tl()),_}function HS(){for(;pe!==null;)x_(pe)}function GS(e,n){var a=we;we|=2;var r=S_(),c=y_();Ge!==e||ye!==n?(Ll=null,Ul=ft()+500,ir(e,n)):tr=$t(e,n);t:do try{if(Ue!==0&&pe!==null){n=pe;var f=Qn;e:switch(Ue){case 1:Ue=0,Qn=null,ar(e,n,f,1);break;case 2:case 9:if(Up(f)){Ue=0,Qn=null,M_(n);break}n=function(){Ue!==2&&Ue!==9||Ge!==e||(Ue=7),Li(e)},f.then(n,n);break t;case 3:Ue=7;break t;case 4:Ue=5;break t;case 7:Up(f)?(Ue=0,Qn=null,M_(n)):(Ue=0,Qn=null,ar(e,n,f,7));break;case 5:var _=null;switch(pe.tag){case 26:_=pe.memoizedState;case 5:case 27:var E=pe;if(_?og(_):E.stateNode.complete){Ue=0,Qn=null;var B=E.sibling;if(B!==null)pe=B;else{var $=E.return;$!==null?(pe=$,Pl($)):pe=null}break e}}Ue=0,Qn=null,ar(e,n,f,5);break;case 6:Ue=0,Qn=null,ar(e,n,f,6);break;case 8:Ef(),Je=6;break t;default:throw Error(s(462))}}VS();break}catch(ut){g_(e,ut)}while(!0);return Vi=ss=null,z.H=r,z.A=c,we=a,pe!==null?0:(Ge=null,ye=0,tl(),Je)}function VS(){for(;pe!==null&&!T();)x_(pe)}function x_(e){var n=Wm(e.alternate,e,Ji);e.memoizedProps=e.pendingProps,n===null?Pl(e):pe=n}function M_(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Fm(a,n,n.pendingProps,n.type,void 0,ye);break;case 11:n=Fm(a,n,n.pendingProps,n.type.render,n.ref,ye);break;case 5:Iu(n);default:Ym(a,n),n=pe=yp(n,Ji),n=Wm(a,n,Ji)}e.memoizedProps=e.pendingProps,n===null?Pl(e):pe=n}function ar(e,n,a,r){Vi=ss=null,Iu(n),Ys=null,io=0;var c=n.return;try{if(DS(e,c,n,a,ye)){Je=1,Ml(e,ii(a,e.current)),pe=null;return}}catch(f){if(c!==null)throw pe=c,f;Je=1,Ml(e,ii(a,e.current)),pe=null;return}n.flags&32768?(Me||r===1?e=!0:tr||(ye&536870912)!==0?e=!1:(ba=e=!0,(r===2||r===9||r===3||r===6)&&(r=Zn.current,r!==null&&r.tag===13&&(r.flags|=16384))),E_(n,e)):Pl(n)}function Pl(e){var n=e;do{if((n.flags&32768)!==0){E_(n,ba);return}e=n.return;var a=NS(n.alternate,n,Ji);if(a!==null){pe=a;return}if(n=n.sibling,n!==null){pe=n;return}pe=n=e}while(n!==null);Je===0&&(Je=5)}function E_(e,n){do{var a=OS(e.alternate,e);if(a!==null){a.flags&=32767,pe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){pe=e;return}pe=e=a}while(e!==null);Je=6,pe=null}function T_(e,n,a,r,c,f,_,E,B){e.cancelPendingCommit=null;do zl();while(hn!==0);if((we&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=fu,pi(e,a,f,_,E,B),e===Ge&&(pe=Ge=null,ye=0),nr=n,Ca=e,$i=a,yf=f,xf=c,d_=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,qS(Ct,function(){return w_(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=z.T,z.T=null,c=Z.p,Z.p=2,_=we,we|=4;try{PS(e,n,a)}finally{we=_,Z.p=c,z.T=r}}hn=1,b_(),A_(),R_()}}function b_(){if(hn===1){hn=0;var e=Ca,n=nr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var r=Z.p;Z.p=2;var c=we;we|=4;try{s_(n,e);var f=zf,_=fp(e.containerInfo),E=f.focusedElem,B=f.selectionRange;if(_!==E&&E&&E.ownerDocument&&up(E.ownerDocument.documentElement,E)){if(B!==null&&ru(E)){var $=B.start,ut=B.end;if(ut===void 0&&(ut=$),"selectionStart"in E)E.selectionStart=$,E.selectionEnd=Math.min(ut,E.value.length);else{var pt=E.ownerDocument||document,tt=pt&&pt.defaultView||window;if(tt.getSelection){var st=tt.getSelection(),It=E.textContent.length,Qt=Math.min(B.start,It),Be=B.end===void 0?Qt:Math.min(B.end,It);!st.extend&&Qt>Be&&(_=Be,Be=Qt,Qt=_);var q=cp(E,Qt),H=cp(E,Be);if(q&&H&&(st.rangeCount!==1||st.anchorNode!==q.node||st.anchorOffset!==q.offset||st.focusNode!==H.node||st.focusOffset!==H.offset)){var J=pt.createRange();J.setStart(q.node,q.offset),st.removeAllRanges(),Qt>Be?(st.addRange(J),st.extend(H.node,H.offset)):(J.setEnd(H.node,H.offset),st.addRange(J))}}}}for(pt=[],st=E;st=st.parentNode;)st.nodeType===1&&pt.push({element:st,left:st.scrollLeft,top:st.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<pt.length;E++){var ht=pt[E];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}jl=!!Pf,zf=Pf=null}finally{we=c,Z.p=r,z.T=a}}e.current=n,hn=2}}function A_(){if(hn===2){hn=0;var e=Ca,n=nr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var r=Z.p;Z.p=2;var c=we;we|=4;try{t_(e,n.alternate,n)}finally{we=c,Z.p=r,z.T=a}}hn=3}}function R_(){if(hn===4||hn===3){hn=0,et();var e=Ca,n=nr,a=$i,r=d_;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?hn=5:(hn=0,nr=Ca=null,C_(e,e.pendingLanes));var c=e.pendingLanes;if(c===0&&(Ra=null),Ds(a),n=n.stateNode,Xt&&typeof Xt.onCommitFiberRoot=="function")try{Xt.onCommitFiberRoot(Yt,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=z.T,c=Z.p,Z.p=2,z.T=null;try{for(var f=e.onRecoverableError,_=0;_<r.length;_++){var E=r[_];f(E.value,{componentStack:E.stack})}}finally{z.T=n,Z.p=c}}($i&3)!==0&&zl(),Li(e),c=e.pendingLanes,(a&261930)!==0&&(c&42)!==0?e===Mf?xo++:(xo=0,Mf=e):xo=0,Mo(0)}}function C_(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,eo(n)))}function zl(){return b_(),A_(),R_(),w_()}function w_(){if(hn!==5)return!1;var e=Ca,n=yf;yf=0;var a=Ds($i),r=z.T,c=Z.p;try{Z.p=32>a?32:a,z.T=null,a=xf,xf=null;var f=Ca,_=$i;if(hn=0,nr=Ca=null,$i=0,(we&6)!==0)throw Error(s(331));var E=we;if(we|=4,u_(f.current),o_(f,f.current,_,a),we=E,Mo(0,!1),Xt&&typeof Xt.onPostCommitFiberRoot=="function")try{Xt.onPostCommitFiberRoot(Yt,f)}catch{}return!0}finally{Z.p=c,z.T=r,C_(e,n)}}function D_(e,n,a){n=ii(a,n),n=$u(e.stateNode,n,2),e=xa(e,n,2),e!==null&&(yn(e,2),Li(e))}function Le(e,n,a){if(e.tag===3)D_(e,e,a);else for(;n!==null;){if(n.tag===3){D_(n,e,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ra===null||!Ra.has(r))){e=ii(a,e),a=Um(2),r=xa(n,a,2),r!==null&&(Lm(a,r,n,e),yn(r,2),Li(r));break}}n=n.return}}function bf(e,n,a){var r=e.pingCache;if(r===null){r=e.pingCache=new IS;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(gf=!0,c.add(a),e=kS.bind(null,e,n,a),n.then(e,e))}function kS(e,n,a){var r=e.pingCache;r!==null&&r.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ge===e&&(ye&a)===a&&(Je===4||Je===3&&(ye&62914560)===ye&&300>ft()-Dl?(we&2)===0&&ir(e,0):vf|=a,er===ye&&(er=0)),Li(e)}function U_(e,n){n===0&&(n=un()),e=ns(e,n),e!==null&&(yn(e,n),Li(e))}function XS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),U_(e,a)}function WS(e,n){var a=0;switch(e.tag){case 31:case 13:var r=e.stateNode,c=e.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),U_(e,a)}function qS(e,n){return Wt(e,n)}var Bl=null,sr=null,Af=!1,Il=!1,Rf=!1,Da=0;function Li(e){e!==sr&&e.next===null&&(sr===null?Bl=sr=e:sr=sr.next=e),Il=!0,Af||(Af=!0,jS())}function Mo(e,n){if(!Rf&&Il){Rf=!0;do for(var a=!1,r=Bl;r!==null;){if(e!==0){var c=r.pendingLanes;if(c===0)var f=0;else{var _=r.suspendedLanes,E=r.pingedLanes;f=(1<<31-Jt(42|e)+1)-1,f&=c&~(_&~E),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,P_(r,f))}else f=ye,f=wt(r,r===Ge?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||$t(r,f)||(a=!0,P_(r,f));r=r.next}while(a);Rf=!1}}function YS(){L_()}function L_(){Il=Af=!1;var e=0;Da!==0&&ay()&&(e=Da);for(var n=ft(),a=null,r=Bl;r!==null;){var c=r.next,f=N_(r,n);f===0?(r.next=null,a===null?Bl=c:a.next=c,c===null&&(sr=a)):(a=r,(e!==0||(f&3)!==0)&&(Il=!0)),r=c}hn!==0&&hn!==5||Mo(e),Da!==0&&(Da=0)}function N_(e,n){for(var a=e.suspendedLanes,r=e.pingedLanes,c=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var _=31-Jt(f),E=1<<_,B=c[_];B===-1?((E&a)===0||(E&r)!==0)&&(c[_]=qe(E,n)):B<=n&&(e.expiredLanes|=E),f&=~E}if(n=Ge,a=ye,a=wt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,a===0||e===n&&(Ue===2||Ue===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&U(r),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||$t(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(r!==null&&U(r),Ds(a)){case 2:case 8:a=kt;break;case 32:a=Ct;break;case 268435456:a=ve;break;default:a=Ct}return r=O_.bind(null,e),a=Wt(a,r),e.callbackPriority=n,e.callbackNode=a,n}return r!==null&&r!==null&&U(r),e.callbackPriority=2,e.callbackNode=null,2}function O_(e,n){if(hn!==0&&hn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(zl()&&e.callbackNode!==a)return null;var r=ye;return r=wt(e,e===Ge?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(m_(e,r,n),N_(e,ft()),e.callbackNode!=null&&e.callbackNode===a?O_.bind(null,e):null)}function P_(e,n){if(zl())return null;m_(e,n,!0)}function jS(){ry(function(){(we&6)!==0?Wt(dt,YS):L_()})}function Cf(){if(Da===0){var e=Xs;e===0&&(e=At,At<<=1,(At&261888)===0&&(At=256)),Da=e}return Da}function z_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:qo(""+e)}function B_(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function ZS(e,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var f=z_((c[xn]||null).action),_=r.submitter;_&&(n=(n=_[xn]||null)?z_(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var E=new Ko("action","action",null,r,c);e.push({event:E,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Da!==0){var B=_?B_(c,_):new FormData(c);Yu(a,{pending:!0,data:B,method:c.method,action:f},null,B)}}else typeof f=="function"&&(E.preventDefault(),B=_?B_(c,_):new FormData(c),Yu(a,{pending:!0,data:B,method:c.method,action:f},f,B))},currentTarget:c}]})}}for(var wf=0;wf<uu.length;wf++){var Df=uu[wf],KS=Df.toLowerCase(),QS=Df[0].toUpperCase()+Df.slice(1);_i(KS,"on"+QS)}_i(pp,"onAnimationEnd"),_i(mp,"onAnimationIteration"),_i(_p,"onAnimationStart"),_i("dblclick","onDoubleClick"),_i("focusin","onFocus"),_i("focusout","onBlur"),_i(dS,"onTransitionRun"),_i(pS,"onTransitionStart"),_i(mS,"onTransitionCancel"),_i(gp,"onTransitionEnd"),Kt("onMouseEnter",["mouseout","mouseover"]),Kt("onMouseLeave",["mouseout","mouseover"]),Kt("onPointerEnter",["pointerout","pointerover"]),Kt("onPointerLeave",["pointerout","pointerover"]),Nt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Nt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Nt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Nt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Nt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Nt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),JS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eo));function I_(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],c=r.event;r=r.listeners;t:{var f=void 0;if(n)for(var _=r.length-1;0<=_;_--){var E=r[_],B=E.instance,$=E.currentTarget;if(E=E.listener,B!==f&&c.isPropagationStopped())break t;f=E,c.currentTarget=$;try{f(c)}catch(ut){$o(ut)}c.currentTarget=null,f=B}else for(_=0;_<r.length;_++){if(E=r[_],B=E.instance,$=E.currentTarget,E=E.listener,B!==f&&c.isPropagationStopped())break t;f=E,c.currentTarget=$;try{f(c)}catch(ut){$o(ut)}c.currentTarget=null,f=B}}}}function me(e,n){var a=n[kr];a===void 0&&(a=n[kr]=new Set);var r=e+"__bubble";a.has(r)||(F_(n,e,2,!1),a.add(r))}function Uf(e,n,a){var r=0;n&&(r|=4),F_(a,e,r,n)}var Fl="_reactListening"+Math.random().toString(36).slice(2);function Lf(e){if(!e[Fl]){e[Fl]=!0,Dt.forEach(function(a){a!=="selectionchange"&&(JS.has(a)||Uf(a,!1,e),Uf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Fl]||(n[Fl]=!0,Uf("selectionchange",!1,n))}}function F_(e,n,a,r){switch(pg(n)){case 2:var c=Ay;break;case 8:c=Ry;break;default:c=Yf}a=c.bind(null,n,a,e),c=void 0,!Qc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?e.addEventListener(n,a,{capture:!0,passive:c}):e.addEventListener(n,a,!0):c!==void 0?e.addEventListener(n,a,{passive:c}):e.addEventListener(n,a,!1)}function Nf(e,n,a,r,c){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var _=r.tag;if(_===3||_===4){var E=r.stateNode.containerInfo;if(E===c)break;if(_===4)for(_=r.return;_!==null;){var B=_.tag;if((B===3||B===4)&&_.stateNode.containerInfo===c)return;_=_.return}for(;E!==null;){if(_=X(E),_===null)return;if(B=_.tag,B===5||B===6||B===26||B===27){r=f=_;continue t}E=E.parentNode}}r=r.return}Xd(function(){var $=f,ut=Zc(a),pt=[];t:{var tt=vp.get(e);if(tt!==void 0){var st=Ko,It=e;switch(e){case"keypress":if(jo(a)===0)break t;case"keydown":case"keyup":st=W0;break;case"focusin":It="focus",st=eu;break;case"focusout":It="blur",st=eu;break;case"beforeblur":case"afterblur":st=eu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":st=Yd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":st=N0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":st=j0;break;case pp:case mp:case _p:st=z0;break;case gp:st=K0;break;case"scroll":case"scrollend":st=U0;break;case"wheel":st=J0;break;case"copy":case"cut":case"paste":st=I0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":st=Zd;break;case"toggle":case"beforetoggle":st=tS}var Qt=(n&4)!==0,Be=!Qt&&(e==="scroll"||e==="scrollend"),q=Qt?tt!==null?tt+"Capture":null:tt;Qt=[];for(var H=$,J;H!==null;){var ht=H;if(J=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||J===null||q===null||(ht=Xr(H,q),ht!=null&&Qt.push(To(H,ht,J))),Be)break;H=H.return}0<Qt.length&&(tt=new st(tt,It,null,a,ut),pt.push({event:tt,listeners:Qt}))}}if((n&7)===0){t:{if(tt=e==="mouseover"||e==="pointerover",st=e==="mouseout"||e==="pointerout",tt&&a!==jc&&(It=a.relatedTarget||a.fromElement)&&(X(It)||It[zi]))break t;if((st||tt)&&(tt=ut.window===ut?ut:(tt=ut.ownerDocument)?tt.defaultView||tt.parentWindow:window,st?(It=a.relatedTarget||a.toElement,st=$,It=It?X(It):null,It!==null&&(Be=u(It),Qt=It.tag,It!==Be||Qt!==5&&Qt!==27&&Qt!==6)&&(It=null)):(st=null,It=$),st!==It)){if(Qt=Yd,ht="onMouseLeave",q="onMouseEnter",H="mouse",(e==="pointerout"||e==="pointerover")&&(Qt=Zd,ht="onPointerLeave",q="onPointerEnter",H="pointer"),Be=st==null?tt:at(st),J=It==null?tt:at(It),tt=new Qt(ht,H+"leave",st,a,ut),tt.target=Be,tt.relatedTarget=J,ht=null,X(ut)===$&&(Qt=new Qt(q,H+"enter",It,a,ut),Qt.target=J,Qt.relatedTarget=Be,ht=Qt),Be=ht,st&&It)e:{for(Qt=$S,q=st,H=It,J=0,ht=q;ht;ht=Qt(ht))J++;ht=0;for(var Zt=H;Zt;Zt=Qt(Zt))ht++;for(;0<J-ht;)q=Qt(q),J--;for(;0<ht-J;)H=Qt(H),ht--;for(;J--;){if(q===H||H!==null&&q===H.alternate){Qt=q;break e}q=Qt(q),H=Qt(H)}Qt=null}else Qt=null;st!==null&&H_(pt,tt,st,Qt,!1),It!==null&&Be!==null&&H_(pt,Be,It,Qt,!0)}}t:{if(tt=$?at($):window,st=tt.nodeName&&tt.nodeName.toLowerCase(),st==="select"||st==="input"&&tt.type==="file")var Ae=ip;else if(ep(tt))if(ap)Ae=uS;else{Ae=lS;var Vt=oS}else st=tt.nodeName,!st||st.toLowerCase()!=="input"||tt.type!=="checkbox"&&tt.type!=="radio"?$&&Yc($.elementType)&&(Ae=ip):Ae=cS;if(Ae&&(Ae=Ae(e,$))){np(pt,Ae,a,ut);break t}Vt&&Vt(e,tt,$),e==="focusout"&&$&&tt.type==="number"&&$.memoizedProps.value!=null&&fn(tt,"number",tt.value)}switch(Vt=$?at($):window,e){case"focusin":(ep(Vt)||Vt.contentEditable==="true")&&(zs=Vt,ou=$,Jr=null);break;case"focusout":Jr=ou=zs=null;break;case"mousedown":lu=!0;break;case"contextmenu":case"mouseup":case"dragend":lu=!1,hp(pt,a,ut);break;case"selectionchange":if(hS)break;case"keydown":case"keyup":hp(pt,a,ut)}var oe;if(iu)t:{switch(e){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else Ps?$d(e,a)&&(xe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(xe="onCompositionStart");xe&&(Kd&&a.locale!=="ko"&&(Ps||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&Ps&&(oe=Wd()):(pa=ut,Jc="value"in pa?pa.value:pa.textContent,Ps=!0)),Vt=Hl($,xe),0<Vt.length&&(xe=new jd(xe,e,null,a,ut),pt.push({event:xe,listeners:Vt}),oe?xe.data=oe:(oe=tp(a),oe!==null&&(xe.data=oe)))),(oe=nS?iS(e,a):aS(e,a))&&(xe=Hl($,"onBeforeInput"),0<xe.length&&(Vt=new jd("onBeforeInput","beforeinput",null,a,ut),pt.push({event:Vt,listeners:xe}),Vt.data=oe)),ZS(pt,e,$,a,ut)}I_(pt,n)})}function To(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Hl(e,n){for(var a=n+"Capture",r=[];e!==null;){var c=e,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=Xr(e,a),c!=null&&r.unshift(To(e,c,f)),c=Xr(e,n),c!=null&&r.push(To(e,c,f))),e.tag===3)return r;e=e.return}return[]}function $S(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function H_(e,n,a,r,c){for(var f=n._reactName,_=[];a!==null&&a!==r;){var E=a,B=E.alternate,$=E.stateNode;if(E=E.tag,B!==null&&B===r)break;E!==5&&E!==26&&E!==27||$===null||(B=$,c?($=Xr(a,f),$!=null&&_.unshift(To(a,$,B))):c||($=Xr(a,f),$!=null&&_.push(To(a,$,B)))),a=a.return}_.length!==0&&e.push({event:n,listeners:_})}var ty=/\r\n?/g,ey=/\u0000|\uFFFD/g;function G_(e){return(typeof e=="string"?e:""+e).replace(ty,`
`).replace(ey,"")}function V_(e,n){return n=G_(n),G_(e)===n}function ze(e,n,a,r,c,f){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||Ls(e,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&Ls(e,""+r);break;case"className":He(e,"class",r);break;case"tabIndex":He(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":He(e,a,r);break;case"style":Vd(e,r,f);break;case"data":if(n!=="object"){He(e,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=qo(""+r),e.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&ze(e,n,"name",c.name,c,null),ze(e,n,"formEncType",c.formEncType,c,null),ze(e,n,"formMethod",c.formMethod,c,null),ze(e,n,"formTarget",c.formTarget,c,null)):(ze(e,n,"encType",c.encType,c,null),ze(e,n,"method",c.method,c,null),ze(e,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=qo(""+r),e.setAttribute(a,r);break;case"onClick":r!=null&&(e.onclick=Ii);break;case"onScroll":r!=null&&me("scroll",e);break;case"onScrollEnd":r!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}a=qo(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""+r):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":r===!0?e.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(a,r):e.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(a):e.setAttribute(a,r);break;case"popover":me("beforetoggle",e),me("toggle",e),Ve(e,"popover",r);break;case"xlinkActuate":ae(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":ae(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":ae(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":ae(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":ae(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":ae(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":ae(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":ae(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":ae(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Ve(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=w0.get(a)||a,Ve(e,a,r))}}function Of(e,n,a,r,c,f){switch(a){case"style":Vd(e,r,f);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof r=="string"?Ls(e,r):(typeof r=="number"||typeof r=="bigint")&&Ls(e,""+r);break;case"onScroll":r!=null&&me("scroll",e);break;case"onScrollEnd":r!=null&&me("scrollend",e);break;case"onClick":r!=null&&(e.onclick=Ii);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ot.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),f=e[xn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,c),typeof r=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,r,c);break t}a in e?e[a]=r:r===!0?e.setAttribute(a,""):Ve(e,a,r)}}}function bn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var r=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:ze(e,n,f,_,a,null)}}c&&ze(e,n,"srcSet",a.srcSet,a,null),r&&ze(e,n,"src",a.src,a,null);return;case"input":me("invalid",e);var E=f=_=c=null,B=null,$=null;for(r in a)if(a.hasOwnProperty(r)){var ut=a[r];if(ut!=null)switch(r){case"name":c=ut;break;case"type":_=ut;break;case"checked":B=ut;break;case"defaultChecked":$=ut;break;case"value":f=ut;break;case"defaultValue":E=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:ze(e,n,r,ut,a,null)}}Ln(e,f,E,B,$,_,c,!1);return;case"select":me("invalid",e),r=_=f=null;for(c in a)if(a.hasOwnProperty(c)&&(E=a[c],E!=null))switch(c){case"value":f=E;break;case"defaultValue":_=E;break;case"multiple":r=E;default:ze(e,n,c,E,a,null)}n=f,a=_,e.multiple=!!r,n!=null?tn(e,!!r,n,!1):a!=null&&tn(e,!!r,a,!0);return;case"textarea":me("invalid",e),f=c=r=null;for(_ in a)if(a.hasOwnProperty(_)&&(E=a[_],E!=null))switch(_){case"value":r=E;break;case"defaultValue":c=E;break;case"children":f=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(s(91));break;default:ze(e,n,_,E,a,null)}Ci(e,r,c,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(r=a[B],r!=null))switch(B){case"selected":e.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:ze(e,n,B,r,a,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(r=0;r<Eo.length;r++)me(Eo[r],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for($ in a)if(a.hasOwnProperty($)&&(r=a[$],r!=null))switch($){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:ze(e,n,$,r,a,null)}return;default:if(Yc(n)){for(ut in a)a.hasOwnProperty(ut)&&(r=a[ut],r!==void 0&&Of(e,n,ut,r,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(r=a[E],r!=null&&ze(e,n,E,r,a,null))}function ny(e,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,_=null,E=null,B=null,$=null,ut=null;for(st in a){var pt=a[st];if(a.hasOwnProperty(st)&&pt!=null)switch(st){case"checked":break;case"value":break;case"defaultValue":B=pt;default:r.hasOwnProperty(st)||ze(e,n,st,null,r,pt)}}for(var tt in r){var st=r[tt];if(pt=a[tt],r.hasOwnProperty(tt)&&(st!=null||pt!=null))switch(tt){case"type":f=st;break;case"name":c=st;break;case"checked":$=st;break;case"defaultChecked":ut=st;break;case"value":_=st;break;case"defaultValue":E=st;break;case"children":case"dangerouslySetInnerHTML":if(st!=null)throw Error(s(137,n));break;default:st!==pt&&ze(e,n,tt,st,r,pt)}}Rn(e,_,E,B,$,ut,f,c);return;case"select":st=_=E=tt=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":st=B;default:r.hasOwnProperty(f)||ze(e,n,f,null,r,B)}for(c in r)if(f=r[c],B=a[c],r.hasOwnProperty(c)&&(f!=null||B!=null))switch(c){case"value":tt=f;break;case"defaultValue":E=f;break;case"multiple":_=f;default:f!==B&&ze(e,n,c,f,r,B)}n=E,a=_,r=st,tt!=null?tn(e,!!a,tt,!1):!!r!=!!a&&(n!=null?tn(e,!!a,n,!0):tn(e,!!a,a?[]:"",!1));return;case"textarea":st=tt=null;for(E in a)if(c=a[E],a.hasOwnProperty(E)&&c!=null&&!r.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:ze(e,n,E,null,r,c)}for(_ in r)if(c=r[_],f=a[_],r.hasOwnProperty(_)&&(c!=null||f!=null))switch(_){case"value":tt=c;break;case"defaultValue":st=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==f&&ze(e,n,_,c,r,f)}Us(e,tt,st);return;case"option":for(var It in a)if(tt=a[It],a.hasOwnProperty(It)&&tt!=null&&!r.hasOwnProperty(It))switch(It){case"selected":e.selected=!1;break;default:ze(e,n,It,null,r,tt)}for(B in r)if(tt=r[B],st=a[B],r.hasOwnProperty(B)&&tt!==st&&(tt!=null||st!=null))switch(B){case"selected":e.selected=tt&&typeof tt!="function"&&typeof tt!="symbol";break;default:ze(e,n,B,tt,r,st)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Qt in a)tt=a[Qt],a.hasOwnProperty(Qt)&&tt!=null&&!r.hasOwnProperty(Qt)&&ze(e,n,Qt,null,r,tt);for($ in r)if(tt=r[$],st=a[$],r.hasOwnProperty($)&&tt!==st&&(tt!=null||st!=null))switch($){case"children":case"dangerouslySetInnerHTML":if(tt!=null)throw Error(s(137,n));break;default:ze(e,n,$,tt,r,st)}return;default:if(Yc(n)){for(var Be in a)tt=a[Be],a.hasOwnProperty(Be)&&tt!==void 0&&!r.hasOwnProperty(Be)&&Of(e,n,Be,void 0,r,tt);for(ut in r)tt=r[ut],st=a[ut],!r.hasOwnProperty(ut)||tt===st||tt===void 0&&st===void 0||Of(e,n,ut,tt,r,st);return}}for(var q in a)tt=a[q],a.hasOwnProperty(q)&&tt!=null&&!r.hasOwnProperty(q)&&ze(e,n,q,null,r,tt);for(pt in r)tt=r[pt],st=a[pt],!r.hasOwnProperty(pt)||tt===st||tt==null&&st==null||ze(e,n,pt,tt,r,st)}function k_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function iy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],f=c.transferSize,_=c.initiatorType,E=c.duration;if(f&&E&&k_(_)){for(_=0,E=c.responseEnd,r+=1;r<a.length;r++){var B=a[r],$=B.startTime;if($>E)break;var ut=B.transferSize,pt=B.initiatorType;ut&&k_(pt)&&(B=B.responseEnd,_+=ut*(B<E?1:(E-$)/(B-$)))}if(--r,n+=8*(f+_)/(c.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Pf=null,zf=null;function Gl(e){return e.nodeType===9?e:e.ownerDocument}function X_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function W_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Bf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var If=null;function ay(){var e=window.event;return e&&e.type==="popstate"?e===If?!1:(If=e,!0):(If=null,!1)}var q_=typeof setTimeout=="function"?setTimeout:void 0,sy=typeof clearTimeout=="function"?clearTimeout:void 0,Y_=typeof Promise=="function"?Promise:void 0,ry=typeof queueMicrotask=="function"?queueMicrotask:typeof Y_<"u"?function(e){return Y_.resolve(null).then(e).catch(oy)}:q_;function oy(e){setTimeout(function(){throw e})}function Ua(e){return e==="head"}function j_(e,n){var a=n,r=0;do{var c=a.nextSibling;if(e.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){e.removeChild(c),cr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")bo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,bo(a);for(var f=a.firstChild;f;){var _=f.nextSibling,E=f.nodeName;f[Qa]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&bo(e.ownerDocument.body);a=c}while(a);cr(n)}function Z_(e,n){var a=e;e=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=r}while(a)}function Ff(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Ff(a),A(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function ly(e,n,a,r){for(;e.nodeType===1;){var c=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[Qa])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==c.rel||e.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||e.getAttribute("title")!==(c.title==null?null:c.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(c.src==null?null:c.src)||e.getAttribute("type")!==(c.type==null?null:c.type)||e.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=li(e.nextSibling),e===null)break}return null}function cy(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=li(e.nextSibling),e===null))return null;return e}function K_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=li(e.nextSibling),e===null))return null;return e}function Hf(e){return e.data==="$?"||e.data==="$~"}function Gf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function uy(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function li(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Vf=null;function Q_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return li(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function J_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function $_(e,n,a){switch(n=Gl(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function bo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);A(e)}var ci=new Map,tg=new Set;function Vl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ta=Z.d;Z.d={f:fy,r:hy,D:dy,C:py,L:my,m:_y,X:vy,S:gy,M:Sy};function fy(){var e=ta.f(),n=Nl();return e||n}function hy(e){var n=it(e);n!==null&&n.tag===5&&n.type==="form"?gm(n):ta.r(e)}var rr=typeof document>"u"?null:document;function eg(e,n,a){var r=rr;if(r&&typeof n=="string"&&n){var c=de(n);c='link[rel="'+e+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),tg.has(c)||(tg.add(c),e={rel:e,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),bn(n,"link",e),vt(n),r.head.appendChild(n)))}}function dy(e){ta.D(e),eg("dns-prefetch",e,null)}function py(e,n){ta.C(e,n),eg("preconnect",e,n)}function my(e,n,a){ta.L(e,n,a);var r=rr;if(r&&e&&n){var c='link[rel="preload"][as="'+de(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+de(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+de(a.imageSizes)+'"]')):c+='[href="'+de(e)+'"]';var f=c;switch(n){case"style":f=or(e);break;case"script":f=lr(e)}ci.has(f)||(e=S({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),ci.set(f,e),r.querySelector(c)!==null||n==="style"&&r.querySelector(Ao(f))||n==="script"&&r.querySelector(Ro(f))||(n=r.createElement("link"),bn(n,"link",e),vt(n),r.head.appendChild(n)))}}function _y(e,n){ta.m(e,n);var a=rr;if(a&&e){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+de(r)+'"][href="'+de(e)+'"]',f=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=lr(e)}if(!ci.has(f)&&(e=S({rel:"modulepreload",href:e},n),ci.set(f,e),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ro(f)))return}r=a.createElement("link"),bn(r,"link",e),vt(r),a.head.appendChild(r)}}}function gy(e,n,a){ta.S(e,n,a);var r=rr;if(r&&e){var c=W(r).hoistableStyles,f=or(e);n=n||"default";var _=c.get(f);if(!_){var E={loading:0,preload:null};if(_=r.querySelector(Ao(f)))E.loading=5;else{e=S({rel:"stylesheet",href:e,"data-precedence":n},a),(a=ci.get(f))&&kf(e,a);var B=_=r.createElement("link");vt(B),bn(B,"link",e),B._p=new Promise(function($,ut){B.onload=$,B.onerror=ut}),B.addEventListener("load",function(){E.loading|=1}),B.addEventListener("error",function(){E.loading|=2}),E.loading|=4,kl(_,n,r)}_={type:"stylesheet",instance:_,count:1,state:E},c.set(f,_)}}}function vy(e,n){ta.X(e,n);var a=rr;if(a&&e){var r=W(a).hoistableScripts,c=lr(e),f=r.get(c);f||(f=a.querySelector(Ro(c)),f||(e=S({src:e,async:!0},n),(n=ci.get(c))&&Xf(e,n),f=a.createElement("script"),vt(f),bn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function Sy(e,n){ta.M(e,n);var a=rr;if(a&&e){var r=W(a).hoistableScripts,c=lr(e),f=r.get(c);f||(f=a.querySelector(Ro(c)),f||(e=S({src:e,async:!0,type:"module"},n),(n=ci.get(c))&&Xf(e,n),f=a.createElement("script"),vt(f),bn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function ng(e,n,a,r){var c=(c=Et.current)?Vl(c):null;if(!c)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=or(a.href),a=W(c).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=or(a.href);var f=W(c).hoistableStyles,_=f.get(e);if(_||(c=c.ownerDocument||c,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,_),(f=c.querySelector(Ao(e)))&&!f._p&&(_.instance=f,_.state.loading=5),ci.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ci.set(e,a),f||yy(c,e,a,_.state))),n&&r===null)throw Error(s(528,""));return _}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=lr(a),a=W(c).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function or(e){return'href="'+de(e)+'"'}function Ao(e){return'link[rel="stylesheet"]['+e+"]"}function ig(e){return S({},e,{"data-precedence":e.precedence,precedence:null})}function yy(e,n,a,r){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=e.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),bn(n,"link",a),vt(n),e.head.appendChild(n))}function lr(e){return'[src="'+de(e)+'"]'}function Ro(e){return"script[async]"+e}function ag(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=e.querySelector('style[data-href~="'+de(a.href)+'"]');if(r)return n.instance=r,vt(r),r;var c=S({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),vt(r),bn(r,"style",c),kl(r,a.precedence,e),n.instance=r;case"stylesheet":c=or(a.href);var f=e.querySelector(Ao(c));if(f)return n.state.loading|=4,n.instance=f,vt(f),f;r=ig(a),(c=ci.get(c))&&kf(r,c),f=(e.ownerDocument||e).createElement("link"),vt(f);var _=f;return _._p=new Promise(function(E,B){_.onload=E,_.onerror=B}),bn(f,"link",r),n.state.loading|=4,kl(f,a.precedence,e),n.instance=f;case"script":return f=lr(a.src),(c=e.querySelector(Ro(f)))?(n.instance=c,vt(c),c):(r=a,(c=ci.get(f))&&(r=S({},a),Xf(r,c)),e=e.ownerDocument||e,c=e.createElement("script"),vt(c),bn(c,"link",r),e.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,kl(r,a.precedence,e));return n.instance}function kl(e,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,f=c,_=0;_<r.length;_++){var E=r[_];if(E.dataset.precedence===n)f=E;else if(f!==c)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function kf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Xf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Xl=null;function sg(e,n,a){if(Xl===null){var r=new Map,c=Xl=new Map;c.set(a,r)}else c=Xl,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(e))return r;for(r.set(e,null),a=a.getElementsByTagName(e),c=0;c<a.length;c++){var f=a[c];if(!(f[Qa]||f[Ke]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=e+_;var E=r.get(_);E?E.push(f):r.set(_,[f])}}return r}function rg(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function xy(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function og(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function My(e,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=or(r.href),f=n.querySelector(Ao(c));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Wl.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,vt(f);return}f=n.ownerDocument||n,r=ig(r),(c=ci.get(c))&&kf(r,c),f=f.createElement("link"),vt(f);var _=f;_._p=new Promise(function(E,B){_.onload=E,_.onerror=B}),bn(f,"link",r),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Wl.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var Wf=0;function Ey(e,n){return e.stylesheets&&e.count===0&&Yl(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var r=setTimeout(function(){if(e.stylesheets&&Yl(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&Wf===0&&(Wf=62500*iy());var c=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Yl(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>Wf?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function Wl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Yl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ql=null;function Yl(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ql=new Map,n.forEach(Ty,e),ql=null,Wl.call(e))}function Ty(e,n){if(!(n.state.loading&4)){var a=ql.get(e);if(a)var r=a.get(null);else{a=new Map,ql.set(e,a);for(var c=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var _=c[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),r=_)}r&&a.set(null,r)}c=n.instance,_=c.getAttribute("data-precedence"),f=a.get(_)||r,f===r&&a.set(null,c),a.set(_,c),this.count++,r=Wl.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),f?f.parentNode.insertBefore(c,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(c,e.firstChild)),n.state.loading|=4}}var Co={$$typeof:P,Provider:null,Consumer:null,_currentValue:j,_currentValue2:j,_threadCount:0};function by(e,n,a,r,c,f,_,E,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ee(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ee(0),this.hiddenUpdates=Ee(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function lg(e,n,a,r,c,f,_,E,B,$,ut,pt){return e=new by(e,n,a,_,B,$,ut,pt,E),n=1,f===!0&&(n|=24),f=jn(3,null,null,n),e.current=f,f.stateNode=e,n=Eu(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Ru(f),e}function cg(e){return e?(e=Fs,e):Fs}function ug(e,n,a,r,c,f){c=cg(c),r.context===null?r.context=c:r.pendingContext=c,r=ya(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=xa(e,r,n),a!==null&&(Gn(a,e,n),so(a,e,n))}function fg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function qf(e,n){fg(e,n),(e=e.alternate)&&fg(e,n)}function hg(e){if(e.tag===13||e.tag===31){var n=ns(e,67108864);n!==null&&Gn(n,e,67108864),qf(e,67108864)}}function dg(e){if(e.tag===13||e.tag===31){var n=$n();n=Za(n);var a=ns(e,n);a!==null&&Gn(a,e,n),qf(e,n)}}var jl=!0;function Ay(e,n,a,r){var c=z.T;z.T=null;var f=Z.p;try{Z.p=2,Yf(e,n,a,r)}finally{Z.p=f,z.T=c}}function Ry(e,n,a,r){var c=z.T;z.T=null;var f=Z.p;try{Z.p=8,Yf(e,n,a,r)}finally{Z.p=f,z.T=c}}function Yf(e,n,a,r){if(jl){var c=jf(r);if(c===null)Nf(e,n,r,Zl,a),mg(e,r);else if(wy(c,e,n,a,r))r.stopPropagation();else if(mg(e,r),n&4&&-1<Cy.indexOf(e)){for(;c!==null;){var f=it(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=Rt(f.pendingLanes);if(_!==0){var E=f;for(E.pendingLanes|=2,E.entangledLanes|=2;_;){var B=1<<31-Jt(_);E.entanglements[1]|=B,_&=~B}Li(f),(we&6)===0&&(Ul=ft()+500,Mo(0))}}break;case 31:case 13:E=ns(f,2),E!==null&&Gn(E,f,2),Nl(),qf(f,2)}if(f=jf(r),f===null&&Nf(e,n,r,Zl,a),f===c)break;c=f}c!==null&&r.stopPropagation()}else Nf(e,n,r,null,a)}}function jf(e){return e=Zc(e),Zf(e)}var Zl=null;function Zf(e){if(Zl=null,e=X(e),e!==null){var n=u(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Zl=e,null}function pg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case dt:return 2;case kt:return 8;case Ct:case zt:return 32;case ve:return 268435456;default:return 32}default:return 32}}var Kf=!1,La=null,Na=null,Oa=null,wo=new Map,Do=new Map,Pa=[],Cy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function mg(e,n){switch(e){case"focusin":case"focusout":La=null;break;case"dragenter":case"dragleave":Na=null;break;case"mouseover":case"mouseout":Oa=null;break;case"pointerover":case"pointerout":wo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Do.delete(n.pointerId)}}function Uo(e,n,a,r,c,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[c]},n!==null&&(n=it(n),n!==null&&hg(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),e)}function wy(e,n,a,r,c){switch(n){case"focusin":return La=Uo(La,e,n,a,r,c),!0;case"dragenter":return Na=Uo(Na,e,n,a,r,c),!0;case"mouseover":return Oa=Uo(Oa,e,n,a,r,c),!0;case"pointerover":var f=c.pointerId;return wo.set(f,Uo(wo.get(f)||null,e,n,a,r,c)),!0;case"gotpointercapture":return f=c.pointerId,Do.set(f,Uo(Do.get(f)||null,e,n,a,r,c)),!0}return!1}function _g(e){var n=X(e.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Ka(e.priority,function(){dg(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,Ka(e.priority,function(){dg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kl(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=jf(e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);jc=r,a.target.dispatchEvent(r),jc=null}else return n=it(a),n!==null&&hg(n),e.blockedOn=a,!1;n.shift()}return!0}function gg(e,n,a){Kl(e)&&a.delete(n)}function Dy(){Kf=!1,La!==null&&Kl(La)&&(La=null),Na!==null&&Kl(Na)&&(Na=null),Oa!==null&&Kl(Oa)&&(Oa=null),wo.forEach(gg),Do.forEach(gg)}function Ql(e,n){e.blockedOn===n&&(e.blockedOn=null,Kf||(Kf=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Dy)))}var Jl=null;function vg(e){Jl!==e&&(Jl=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Jl===e&&(Jl=null);for(var n=0;n<e.length;n+=3){var a=e[n],r=e[n+1],c=e[n+2];if(typeof r!="function"){if(Zf(r||a)===null)continue;break}var f=it(a);f!==null&&(e.splice(n,3),n-=3,Yu(f,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function cr(e){function n(B){return Ql(B,e)}La!==null&&Ql(La,e),Na!==null&&Ql(Na,e),Oa!==null&&Ql(Oa,e),wo.forEach(n),Do.forEach(n);for(var a=0;a<Pa.length;a++){var r=Pa[a];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Pa.length&&(a=Pa[0],a.blockedOn===null);)_g(a),a.blockedOn===null&&Pa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],f=a[r+1],_=c[xn]||null;if(typeof f=="function")_||vg(a);else if(_){var E=null;if(f&&f.hasAttribute("formAction")){if(c=f,_=f[xn]||null)E=_.formAction;else if(Zf(c)!==null)continue}else E=_.action;typeof E=="function"?a[r+1]=E:(a.splice(r,3),r-=3),vg(a)}}}function Sg(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return c=_})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Qf(e){this._internalRoot=e}$l.prototype.render=Qf.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=$n();ug(a,r,e,n,null,null)},$l.prototype.unmount=Qf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;ug(e.current,2,null,e,null,null),Nl(),n[zi]=null}};function $l(e){this._internalRoot=e}$l.prototype.unstable_scheduleHydration=function(e){if(e){var n=Vr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Pa.length&&n!==0&&n<Pa[a].priority;a++);Pa.splice(a,0,e),a===0&&_g(e)}};var yg=t.version;if(yg!=="19.2.8")throw Error(s(527,yg,"19.2.8"));Z.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var Uy={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var tc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!tc.isDisabled&&tc.supportsFiber)try{Yt=tc.inject(Uy),Xt=tc}catch{}}return No.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,r="",c=Rm,f=Cm,_=wm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=lg(e,1,!1,null,null,a,r,null,c,f,_,Sg),e[zi]=n.current,Lf(e),new Qf(n)},No.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var r=!1,c="",f=Rm,_=Cm,E=wm,B=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=lg(e,1,!0,n,a??null,r,c,B,f,_,E,Sg),n.context=cg(null),a=n.current,r=$n(),r=Za(r),c=ya(r),c.callback=null,xa(a,c,r),a=r,n.current.lanes=a,yn(n,a),Li(n),e[zi]=n.current,Lf(e),new $l(n)},No.version="19.2.8",No}var Dg;function ky(){if(Dg)return th.exports;Dg=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),th.exports=Vy(),th.exports}var Xy=ky();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cd="171",Rr={ROTATE:0,DOLLY:1,PAN:2},br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Wy=0,Ug=1,qy=2,Xv=1,Wv=2,ra=3,qa=0,Wn=1,la=2,Xa=0,Cr=1,Lg=2,Ng=3,Og=4,Yy=5,Ms=100,jy=101,Zy=102,Ky=103,Qy=104,Jy=200,$y=201,tx=202,ex=203,Fh=204,Hh=205,nx=206,ix=207,ax=208,sx=209,rx=210,ox=211,lx=212,cx=213,ux=214,Gh=0,Vh=1,kh=2,Ur=3,Xh=4,Wh=5,qh=6,Yh=7,qv=0,fx=1,hx=2,Wa=0,dx=1,px=2,mx=3,_x=4,gx=5,vx=6,Sx=7,Yv=300,Lr=301,Nr=302,jh=303,Zh=304,Gc=306,Kh=1e3,Ts=1001,Qh=1002,Ti=1003,yx=1004,ec=1005,Oi=1006,ah=1007,bs=1008,da=1009,jv=1010,Zv=1011,Go=1012,wd=1013,As=1014,ca=1015,Vo=1016,Dd=1017,Ud=1018,Or=1020,Kv=35902,Qv=1021,Jv=1022,Ei=1023,$v=1024,t0=1025,wr=1026,Pr=1027,e0=1028,Ld=1029,n0=1030,Nd=1031,Od=1033,Cc=33776,wc=33777,Dc=33778,Uc=33779,Jh=35840,$h=35841,td=35842,ed=35843,nd=36196,id=37492,ad=37496,sd=37808,rd=37809,od=37810,ld=37811,cd=37812,ud=37813,fd=37814,hd=37815,dd=37816,pd=37817,md=37818,_d=37819,gd=37820,vd=37821,Lc=36492,Sd=36494,yd=36495,i0=36283,xd=36284,Md=36285,Ed=36286,xx=3200,Mx=3201,a0=0,Ex=1,ka="",fi="srgb",zr="srgb-linear",Pc="linear",Ie="srgb",ur=7680,Pg=519,Tx=512,bx=513,Ax=514,s0=515,Rx=516,Cx=517,wx=518,Dx=519,zg=35044,Bg="300 es",ua=2e3,zc=2001;class Cs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let u=0,h=l.length;u<h;u++)l[u].call(this,t);t.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nc=Math.PI/180,Td=180/Math.PI;function ko(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(wn[o&255]+wn[o>>8&255]+wn[o>>16&255]+wn[o>>24&255]+"-"+wn[t&255]+wn[t>>8&255]+"-"+wn[t>>16&15|64]+wn[t>>24&255]+"-"+wn[i&63|128]+wn[i>>8&255]+"-"+wn[i>>16&255]+wn[i>>24&255]+wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]).toLowerCase()}function _e(o,t,i){return Math.max(t,Math.min(i,o))}function Ux(o,t){return(o%t+t)%t}function sh(o,t,i){return(1-i)*o+i*t}function Oo(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Vn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Lx={DEG2RAD:Nc};class re{constructor(t=0,i=0){re.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),u=this.x-t.x,h=this.y-t.y;return this.x=u*s-h*l+t.x,this.y=u*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class le{constructor(t,i,s,l,u,h,d,m,p){le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,h,d,m,p)}set(t,i,s,l,u,h,d,m,p){const v=this.elements;return v[0]=t,v[1]=l,v[2]=d,v[3]=i,v[4]=u,v[5]=m,v[6]=s,v[7]=h,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],v=s[4],S=s[7],y=s[2],M=s[5],b=s[8],R=l[0],x=l[3],g=l[6],I=l[1],P=l[4],L=l[7],K=l[2],N=l[5],D=l[8];return u[0]=h*R+d*I+m*K,u[3]=h*x+d*P+m*N,u[6]=h*g+d*L+m*D,u[1]=p*R+v*I+S*K,u[4]=p*x+v*P+S*N,u[7]=p*g+v*L+S*D,u[2]=y*R+M*I+b*K,u[5]=y*x+M*P+b*N,u[8]=y*g+M*L+b*D,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8];return i*h*v-i*d*p-s*u*v+s*d*m+l*u*p-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8],S=v*h-d*p,y=d*m-v*u,M=p*u-h*m,b=i*S+s*y+l*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=S*R,t[1]=(l*p-v*s)*R,t[2]=(d*s-l*h)*R,t[3]=y*R,t[4]=(v*i-l*m)*R,t[5]=(l*u-d*i)*R,t[6]=M*R,t[7]=(s*m-p*i)*R,t[8]=(h*i-s*u)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,u,h,d){const m=Math.cos(u),p=Math.sin(u);return this.set(s*m,s*p,-s*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(rh.makeScale(t,i)),this}rotate(t){return this.premultiply(rh.makeRotation(-t)),this}translate(t,i){return this.premultiply(rh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const rh=new le;function r0(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function Bc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Nx(){const o=Bc("canvas");return o.style.display="block",o}const Ig={};function Tr(o){o in Ig||(Ig[o]=!0,console.warn(o))}function Ox(o,t,i){return new Promise(function(s,l){function u(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:s()}}setTimeout(u,i)})}function Px(o){const t=o.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function zx(o){const t=o.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Fg=new le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hg=new le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bx(){const o={enabled:!0,workingColorSpace:zr,spaces:{},convert:function(l,u,h){return this.enabled===!1||u===h||!u||!h||(this.spaces[u].transfer===Ie&&(l.r=fa(l.r),l.g=fa(l.g),l.b=fa(l.b)),this.spaces[u].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ie&&(l.r=Dr(l.r),l.g=Dr(l.g),l.b=Dr(l.b))),l},fromWorkingColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},toWorkingColorSpace:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ka?Pc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,h){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[zr]:{primaries:t,whitePoint:s,transfer:Pc,toXYZ:Fg,fromXYZ:Hg,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:fi},outputColorSpaceConfig:{drawingBufferColorSpace:fi}},[fi]:{primaries:t,whitePoint:s,transfer:Ie,toXYZ:Fg,fromXYZ:Hg,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:fi}}}),o}const Ce=Bx();function fa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Dr(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let fr;class Ix{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{fr===void 0&&(fr=Bc("canvas")),fr.width=t.width,fr.height=t.height;const s=fr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=fr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Bc("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),u=l.data;for(let h=0;h<u.length;h++)u[h]=fa(u[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(fa(i[s]/255)*255):i[s]=fa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fx=0;class o0{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=ko(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?u.push(oh(l[h].image)):u.push(oh(l[h]))}else u=oh(l);s.url=u}return i||(t.images[this.uuid]=s),s}}function oh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Ix.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hx=0;class qn extends Cs{constructor(t=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,s=Ts,l=Ts,u=Oi,h=bs,d=Ei,m=da,p=qn.DEFAULT_ANISOTROPY,v=ka){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=ko(),this.name="",this.source=new o0(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=u,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Kh:t.x=t.x-Math.floor(t.x);break;case Ts:t.x=t.x<0?0:1;break;case Qh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Kh:t.y=t.y-Math.floor(t.y);break;case Ts:t.y=t.y<0?0:1;break;case Qh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=Yv;qn.DEFAULT_ANISOTROPY=1;class $e{constructor(t=0,i=0,s=0,l=1){$e.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*u,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*u,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*u,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*u,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,u;const m=t.elements,p=m[0],v=m[4],S=m[8],y=m[1],M=m[5],b=m[9],R=m[2],x=m[6],g=m[10];if(Math.abs(v-y)<.01&&Math.abs(S-R)<.01&&Math.abs(b-x)<.01){if(Math.abs(v+y)<.1&&Math.abs(S+R)<.1&&Math.abs(b+x)<.1&&Math.abs(p+M+g-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const P=(p+1)/2,L=(M+1)/2,K=(g+1)/2,N=(v+y)/4,D=(S+R)/4,V=(b+x)/4;return P>L&&P>K?P<.01?(s=0,l=.707106781,u=.707106781):(s=Math.sqrt(P),l=N/s,u=D/s):L>K?L<.01?(s=.707106781,l=0,u=.707106781):(l=Math.sqrt(L),s=N/l,u=V/l):K<.01?(s=.707106781,l=.707106781,u=0):(u=Math.sqrt(K),s=D/u,l=V/u),this.set(s,l,u,i),this}let I=Math.sqrt((x-b)*(x-b)+(S-R)*(S-R)+(y-v)*(y-v));return Math.abs(I)<.001&&(I=1),this.x=(x-b)/I,this.y=(S-R)/I,this.z=(y-v)/I,this.w=Math.acos((p+M+g-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this.w=_e(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this.w=_e(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gx extends Cs{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new $e(0,0,t,i),this.scissorTest=!1,this.viewport=new $e(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const u=new qn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);u.flipY=!1,u.generateMipmaps=s.generateMipmaps,u.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new o0(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rs extends Gx{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class l0 extends qn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Ti,this.minFilter=Ti,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vx extends qn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Ti,this.minFilter=Ti,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ya{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,u,h,d){let m=s[l+0],p=s[l+1],v=s[l+2],S=s[l+3];const y=u[h+0],M=u[h+1],b=u[h+2],R=u[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=v,t[i+3]=S;return}if(d===1){t[i+0]=y,t[i+1]=M,t[i+2]=b,t[i+3]=R;return}if(S!==R||m!==y||p!==M||v!==b){let x=1-d;const g=m*y+p*M+v*b+S*R,I=g>=0?1:-1,P=1-g*g;if(P>Number.EPSILON){const K=Math.sqrt(P),N=Math.atan2(K,g*I);x=Math.sin(x*N)/K,d=Math.sin(d*N)/K}const L=d*I;if(m=m*x+y*L,p=p*x+M*L,v=v*x+b*L,S=S*x+R*L,x===1-d){const K=1/Math.sqrt(m*m+p*p+v*v+S*S);m*=K,p*=K,v*=K,S*=K}}t[i]=m,t[i+1]=p,t[i+2]=v,t[i+3]=S}static multiplyQuaternionsFlat(t,i,s,l,u,h){const d=s[l],m=s[l+1],p=s[l+2],v=s[l+3],S=u[h],y=u[h+1],M=u[h+2],b=u[h+3];return t[i]=d*b+v*S+m*M-p*y,t[i+1]=m*b+v*y+p*S-d*M,t[i+2]=p*b+v*M+d*y-m*S,t[i+3]=v*b-d*S-m*y-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,u=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(s/2),v=d(l/2),S=d(u/2),y=m(s/2),M=m(l/2),b=m(u/2);switch(h){case"XYZ":this._x=y*v*S+p*M*b,this._y=p*M*S-y*v*b,this._z=p*v*b+y*M*S,this._w=p*v*S-y*M*b;break;case"YXZ":this._x=y*v*S+p*M*b,this._y=p*M*S-y*v*b,this._z=p*v*b-y*M*S,this._w=p*v*S+y*M*b;break;case"ZXY":this._x=y*v*S-p*M*b,this._y=p*M*S+y*v*b,this._z=p*v*b+y*M*S,this._w=p*v*S-y*M*b;break;case"ZYX":this._x=y*v*S-p*M*b,this._y=p*M*S+y*v*b,this._z=p*v*b-y*M*S,this._w=p*v*S+y*M*b;break;case"YZX":this._x=y*v*S+p*M*b,this._y=p*M*S+y*v*b,this._z=p*v*b-y*M*S,this._w=p*v*S-y*M*b;break;case"XZY":this._x=y*v*S-p*M*b,this._y=p*M*S-y*v*b,this._z=p*v*b+y*M*S,this._w=p*v*S+y*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],u=i[8],h=i[1],d=i[5],m=i[9],p=i[2],v=i[6],S=i[10],y=s+d+S;if(y>0){const M=.5/Math.sqrt(y+1);this._w=.25/M,this._x=(v-m)*M,this._y=(u-p)*M,this._z=(h-l)*M}else if(s>d&&s>S){const M=2*Math.sqrt(1+s-d-S);this._w=(v-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(u+p)/M}else if(d>S){const M=2*Math.sqrt(1+d-s-S);this._w=(u-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+v)/M}else{const M=2*Math.sqrt(1+S-s-d);this._w=(h-l)/M,this._x=(u+p)/M,this._y=(m+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(_e(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,u=t._z,h=t._w,d=i._x,m=i._y,p=i._z,v=i._w;return this._x=s*v+h*d+l*p-u*m,this._y=l*v+h*m+u*d-s*p,this._z=u*v+h*p+s*m-l*d,this._w=h*v-s*d-l*m-u*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,u=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+u*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=u,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*u+i*this._z,this.normalize(),this}const p=Math.sqrt(m),v=Math.atan2(p,d),S=Math.sin((1-i)*v)/p,y=Math.sin(i*v)/p;return this._w=h*S+this._w*y,this._x=s*S+this._x*y,this._y=l*S+this._y*y,this._z=u*S+this._z*y,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),u=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),u*Math.sin(i),u*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,i=0,s=0){Q.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(Gg.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(Gg.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[3]*s+u[6]*l,this.y=u[1]*i+u[4]*s+u[7]*l,this.z=u[2]*i+u[5]*s+u[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,u=t.elements,h=1/(u[3]*i+u[7]*s+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*s+u[8]*l+u[12])*h,this.y=(u[1]*i+u[5]*s+u[9]*l+u[13])*h,this.z=(u[2]*i+u[6]*s+u[10]*l+u[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,u=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*s),v=2*(d*i-u*l),S=2*(u*s-h*i);return this.x=i+m*p+h*S-d*v,this.y=s+m*v+d*p-u*S,this.z=l+m*S+u*v-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,u=t.elements;return this.x=u[0]*i+u[4]*s+u[8]*l,this.y=u[1]*i+u[5]*s+u[9]*l,this.z=u[2]*i+u[6]*s+u[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,u=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-u*d,this.y=u*h-s*m,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return lh.copy(this).projectOnVector(t),this.sub(lh)}reflect(t){return this.sub(lh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lh=new Q,Gg=new Ya;class ha{constructor(t=new Q(1/0,1/0,1/0),i=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Si.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Si.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Si.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const u=s.getAttribute("position");if(i===!0&&u!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=u.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,Si):Si.fromBufferAttribute(u,h),Si.applyMatrix4(t.matrixWorld),this.expandByPoint(Si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),nc.copy(s.boundingBox)),nc.applyMatrix4(t.matrixWorld),this.union(nc)}const l=t.children;for(let u=0,h=l.length;u<h;u++)this.expandByObject(l[u],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Si),Si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Po),ic.subVectors(this.max,Po),hr.subVectors(t.a,Po),dr.subVectors(t.b,Po),pr.subVectors(t.c,Po),Ba.subVectors(dr,hr),Ia.subVectors(pr,dr),ms.subVectors(hr,pr);let i=[0,-Ba.z,Ba.y,0,-Ia.z,Ia.y,0,-ms.z,ms.y,Ba.z,0,-Ba.x,Ia.z,0,-Ia.x,ms.z,0,-ms.x,-Ba.y,Ba.x,0,-Ia.y,Ia.x,0,-ms.y,ms.x,0];return!ch(i,hr,dr,pr,ic)||(i=[1,0,0,0,1,0,0,0,1],!ch(i,hr,dr,pr,ic))?!1:(ac.crossVectors(Ba,Ia),i=[ac.x,ac.y,ac.z],ch(i,hr,dr,pr,ic))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ea[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ea[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ea[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ea[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ea[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ea[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ea[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ea[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ea),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ea=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Si=new Q,nc=new ha,hr=new Q,dr=new Q,pr=new Q,Ba=new Q,Ia=new Q,ms=new Q,Po=new Q,ic=new Q,ac=new Q,_s=new Q;function ch(o,t,i,s,l){for(let u=0,h=o.length-3;u<=h;u+=3){_s.fromArray(o,u);const d=l.x*Math.abs(_s.x)+l.y*Math.abs(_s.y)+l.z*Math.abs(_s.z),m=t.dot(_s),p=i.dot(_s),v=s.dot(_s);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const kx=new ha,zo=new Q,uh=new Q;class Vc{constructor(t=new Q,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):kx.setFromPoints(t).getCenter(s);let l=0;for(let u=0,h=t.length;u<h;u++)l=Math.max(l,s.distanceToSquared(t[u]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zo.subVectors(t,this.center);const i=zo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(zo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zo.copy(t.center).add(uh)),this.expandByPoint(zo.copy(t.center).sub(uh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const na=new Q,fh=new Q,sc=new Q,Fa=new Q,hh=new Q,rc=new Q,dh=new Q;class kc{constructor(t=new Q,i=new Q(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,na)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=na.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(na.copy(this.origin).addScaledVector(this.direction,i),na.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){fh.copy(t).add(i).multiplyScalar(.5),sc.copy(i).sub(t).normalize(),Fa.copy(this.origin).sub(fh);const u=t.distanceTo(i)*.5,h=-this.direction.dot(sc),d=Fa.dot(this.direction),m=-Fa.dot(sc),p=Fa.lengthSq(),v=Math.abs(1-h*h);let S,y,M,b;if(v>0)if(S=h*m-d,y=h*d-m,b=u*v,S>=0)if(y>=-b)if(y<=b){const R=1/v;S*=R,y*=R,M=S*(S+h*y+2*d)+y*(h*S+y+2*m)+p}else y=u,S=Math.max(0,-(h*y+d)),M=-S*S+y*(y+2*m)+p;else y=-u,S=Math.max(0,-(h*y+d)),M=-S*S+y*(y+2*m)+p;else y<=-b?(S=Math.max(0,-(-h*u+d)),y=S>0?-u:Math.min(Math.max(-u,-m),u),M=-S*S+y*(y+2*m)+p):y<=b?(S=0,y=Math.min(Math.max(-u,-m),u),M=y*(y+2*m)+p):(S=Math.max(0,-(h*u+d)),y=S>0?u:Math.min(Math.max(-u,-m),u),M=-S*S+y*(y+2*m)+p);else y=h>0?-u:u,S=Math.max(0,-(h*y+d)),M=-S*S+y*(y+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,S),l&&l.copy(fh).addScaledVector(sc,y),M}intersectSphere(t,i){na.subVectors(t.center,this.origin);const s=na.dot(this.direction),l=na.dot(na)-s*s,u=t.radius*t.radius;if(l>u)return null;const h=Math.sqrt(u-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,u,h,d,m;const p=1/this.direction.x,v=1/this.direction.y,S=1/this.direction.z,y=this.origin;return p>=0?(s=(t.min.x-y.x)*p,l=(t.max.x-y.x)*p):(s=(t.max.x-y.x)*p,l=(t.min.x-y.x)*p),v>=0?(u=(t.min.y-y.y)*v,h=(t.max.y-y.y)*v):(u=(t.max.y-y.y)*v,h=(t.min.y-y.y)*v),s>h||u>l||((u>s||isNaN(s))&&(s=u),(h<l||isNaN(l))&&(l=h),S>=0?(d=(t.min.z-y.z)*S,m=(t.max.z-y.z)*S):(d=(t.max.z-y.z)*S,m=(t.min.z-y.z)*S),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,na)!==null}intersectTriangle(t,i,s,l,u){hh.subVectors(i,t),rc.subVectors(s,t),dh.crossVectors(hh,rc);let h=this.direction.dot(dh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Fa.subVectors(this.origin,t);const m=d*this.direction.dot(rc.crossVectors(Fa,rc));if(m<0)return null;const p=d*this.direction.dot(hh.cross(Fa));if(p<0||m+p>h)return null;const v=-d*Fa.dot(dh);return v<0?null:this.at(v/h,u)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class je{constructor(t,i,s,l,u,h,d,m,p,v,S,y,M,b,R,x){je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,u,h,d,m,p,v,S,y,M,b,R,x)}set(t,i,s,l,u,h,d,m,p,v,S,y,M,b,R,x){const g=this.elements;return g[0]=t,g[4]=i,g[8]=s,g[12]=l,g[1]=u,g[5]=h,g[9]=d,g[13]=m,g[2]=p,g[6]=v,g[10]=S,g[14]=y,g[3]=M,g[7]=b,g[11]=R,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new je().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/mr.setFromMatrixColumn(t,0).length(),u=1/mr.setFromMatrixColumn(t,1).length(),h=1/mr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*u,i[5]=s[5]*u,i[6]=s[6]*u,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,u=t.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),v=Math.cos(u),S=Math.sin(u);if(t.order==="XYZ"){const y=h*v,M=h*S,b=d*v,R=d*S;i[0]=m*v,i[4]=-m*S,i[8]=p,i[1]=M+b*p,i[5]=y-R*p,i[9]=-d*m,i[2]=R-y*p,i[6]=b+M*p,i[10]=h*m}else if(t.order==="YXZ"){const y=m*v,M=m*S,b=p*v,R=p*S;i[0]=y+R*d,i[4]=b*d-M,i[8]=h*p,i[1]=h*S,i[5]=h*v,i[9]=-d,i[2]=M*d-b,i[6]=R+y*d,i[10]=h*m}else if(t.order==="ZXY"){const y=m*v,M=m*S,b=p*v,R=p*S;i[0]=y-R*d,i[4]=-h*S,i[8]=b+M*d,i[1]=M+b*d,i[5]=h*v,i[9]=R-y*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const y=h*v,M=h*S,b=d*v,R=d*S;i[0]=m*v,i[4]=b*p-M,i[8]=y*p+R,i[1]=m*S,i[5]=R*p+y,i[9]=M*p-b,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const y=h*m,M=h*p,b=d*m,R=d*p;i[0]=m*v,i[4]=R-y*S,i[8]=b*S+M,i[1]=S,i[5]=h*v,i[9]=-d*v,i[2]=-p*v,i[6]=M*S+b,i[10]=y-R*S}else if(t.order==="XZY"){const y=h*m,M=h*p,b=d*m,R=d*p;i[0]=m*v,i[4]=-S,i[8]=p*v,i[1]=y*S+R,i[5]=h*v,i[9]=M*S-b,i[2]=b*S-M,i[6]=d*v,i[10]=R*S+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xx,t,Wx)}lookAt(t,i,s){const l=this.elements;return ti.subVectors(t,i),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),Ha.crossVectors(s,ti),Ha.lengthSq()===0&&(Math.abs(s.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),Ha.crossVectors(s,ti)),Ha.normalize(),oc.crossVectors(ti,Ha),l[0]=Ha.x,l[4]=oc.x,l[8]=ti.x,l[1]=Ha.y,l[5]=oc.y,l[9]=ti.y,l[2]=Ha.z,l[6]=oc.z,l[10]=ti.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,u=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],v=s[1],S=s[5],y=s[9],M=s[13],b=s[2],R=s[6],x=s[10],g=s[14],I=s[3],P=s[7],L=s[11],K=s[15],N=l[0],D=l[4],V=l[8],w=l[12],C=l[1],G=l[5],lt=l[9],rt=l[13],mt=l[2],_t=l[6],z=l[10],Z=l[14],j=l[3],xt=l[7],Tt=l[11],O=l[15];return u[0]=h*N+d*C+m*mt+p*j,u[4]=h*D+d*G+m*_t+p*xt,u[8]=h*V+d*lt+m*z+p*Tt,u[12]=h*w+d*rt+m*Z+p*O,u[1]=v*N+S*C+y*mt+M*j,u[5]=v*D+S*G+y*_t+M*xt,u[9]=v*V+S*lt+y*z+M*Tt,u[13]=v*w+S*rt+y*Z+M*O,u[2]=b*N+R*C+x*mt+g*j,u[6]=b*D+R*G+x*_t+g*xt,u[10]=b*V+R*lt+x*z+g*Tt,u[14]=b*w+R*rt+x*Z+g*O,u[3]=I*N+P*C+L*mt+K*j,u[7]=I*D+P*G+L*_t+K*xt,u[11]=I*V+P*lt+L*z+K*Tt,u[15]=I*w+P*rt+L*Z+K*O,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],u=t[12],h=t[1],d=t[5],m=t[9],p=t[13],v=t[2],S=t[6],y=t[10],M=t[14],b=t[3],R=t[7],x=t[11],g=t[15];return b*(+u*m*S-l*p*S-u*d*y+s*p*y+l*d*M-s*m*M)+R*(+i*m*M-i*p*y+u*h*y-l*h*M+l*p*v-u*m*v)+x*(+i*p*S-i*d*M-u*h*S+s*h*M+u*d*v-s*p*v)+g*(-l*d*v-i*m*S+i*d*y+l*h*S-s*h*y+s*m*v)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],u=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8],S=t[9],y=t[10],M=t[11],b=t[12],R=t[13],x=t[14],g=t[15],I=S*x*p-R*y*p+R*m*M-d*x*M-S*m*g+d*y*g,P=b*y*p-v*x*p-b*m*M+h*x*M+v*m*g-h*y*g,L=v*R*p-b*S*p+b*d*M-h*R*M-v*d*g+h*S*g,K=b*S*m-v*R*m-b*d*y+h*R*y+v*d*x-h*S*x,N=i*I+s*P+l*L+u*K;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/N;return t[0]=I*D,t[1]=(R*y*u-S*x*u-R*l*M+s*x*M+S*l*g-s*y*g)*D,t[2]=(d*x*u-R*m*u+R*l*p-s*x*p-d*l*g+s*m*g)*D,t[3]=(S*m*u-d*y*u-S*l*p+s*y*p+d*l*M-s*m*M)*D,t[4]=P*D,t[5]=(v*x*u-b*y*u+b*l*M-i*x*M-v*l*g+i*y*g)*D,t[6]=(b*m*u-h*x*u-b*l*p+i*x*p+h*l*g-i*m*g)*D,t[7]=(h*y*u-v*m*u+v*l*p-i*y*p-h*l*M+i*m*M)*D,t[8]=L*D,t[9]=(b*S*u-v*R*u-b*s*M+i*R*M+v*s*g-i*S*g)*D,t[10]=(h*R*u-b*d*u+b*s*p-i*R*p-h*s*g+i*d*g)*D,t[11]=(v*d*u-h*S*u-v*s*p+i*S*p+h*s*M-i*d*M)*D,t[12]=K*D,t[13]=(v*R*l-b*S*l+b*s*y-i*R*y-v*s*x+i*S*x)*D,t[14]=(b*d*l-h*R*l-b*s*m+i*R*m+h*s*x-i*d*x)*D,t[15]=(h*S*l-v*d*l+v*s*m-i*S*m-h*s*y+i*d*y)*D,this}scale(t){const i=this.elements,s=t.x,l=t.y,u=t.z;return i[0]*=s,i[4]*=l,i[8]*=u,i[1]*=s,i[5]*=l,i[9]*=u,i[2]*=s,i[6]*=l,i[10]*=u,i[3]*=s,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),u=1-s,h=t.x,d=t.y,m=t.z,p=u*h,v=u*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,v*d+s,v*m-l*h,0,p*m-l*d,v*m+l*h,u*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,u,h){return this.set(1,s,u,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,u=i._x,h=i._y,d=i._z,m=i._w,p=u+u,v=h+h,S=d+d,y=u*p,M=u*v,b=u*S,R=h*v,x=h*S,g=d*S,I=m*p,P=m*v,L=m*S,K=s.x,N=s.y,D=s.z;return l[0]=(1-(R+g))*K,l[1]=(M+L)*K,l[2]=(b-P)*K,l[3]=0,l[4]=(M-L)*N,l[5]=(1-(y+g))*N,l[6]=(x+I)*N,l[7]=0,l[8]=(b+P)*D,l[9]=(x-I)*D,l[10]=(1-(y+R))*D,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let u=mr.set(l[0],l[1],l[2]).length();const h=mr.set(l[4],l[5],l[6]).length(),d=mr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(u=-u),t.x=l[12],t.y=l[13],t.z=l[14],yi.copy(this);const p=1/u,v=1/h,S=1/d;return yi.elements[0]*=p,yi.elements[1]*=p,yi.elements[2]*=p,yi.elements[4]*=v,yi.elements[5]*=v,yi.elements[6]*=v,yi.elements[8]*=S,yi.elements[9]*=S,yi.elements[10]*=S,i.setFromRotationMatrix(yi),s.x=u,s.y=h,s.z=d,this}makePerspective(t,i,s,l,u,h,d=ua){const m=this.elements,p=2*u/(i-t),v=2*u/(s-l),S=(i+t)/(i-t),y=(s+l)/(s-l);let M,b;if(d===ua)M=-(h+u)/(h-u),b=-2*h*u/(h-u);else if(d===zc)M=-h/(h-u),b=-h*u/(h-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=S,m[12]=0,m[1]=0,m[5]=v,m[9]=y,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=b,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,u,h,d=ua){const m=this.elements,p=1/(i-t),v=1/(s-l),S=1/(h-u),y=(i+t)*p,M=(s+l)*v;let b,R;if(d===ua)b=(h+u)*S,R=-2*S;else if(d===zc)b=u*S,R=-1*S;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-y,m[1]=0,m[5]=2*v,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=R,m[14]=-b,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const mr=new Q,yi=new je,Xx=new Q(0,0,0),Wx=new Q(1,1,1),Ha=new Q,oc=new Q,ti=new Q,Vg=new je,kg=new Ya;class Pi{constructor(t=0,i=0,s=0,l=Pi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,u=l[0],h=l[4],d=l[8],m=l[1],p=l[5],v=l[9],S=l[2],y=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(_e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-h,u)):(this._x=Math.atan2(y,p),this._z=0);break;case"YXZ":this._x=Math.asin(-_e(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-S,u),this._z=0);break;case"ZXY":this._x=Math.asin(_e(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-S,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-_e(S,-1,1)),Math.abs(S)<.9999999?(this._x=Math.atan2(y,M),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(_e(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-S,u)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-_e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(y,p),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return Vg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Vg,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return kg.setFromEuler(this),this.setFromQuaternion(kg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pi.DEFAULT_ORDER="XYZ";class Pd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let qx=0;const Xg=new Q,_r=new Ya,ia=new je,lc=new Q,Bo=new Q,Yx=new Q,jx=new Ya,Wg=new Q(1,0,0),qg=new Q(0,1,0),Yg=new Q(0,0,1),jg={type:"added"},Zx={type:"removed"},gr={type:"childadded",child:null},ph={type:"childremoved",child:null};class Sn extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=ko(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const t=new Q,i=new Pi,s=new Ya,l=new Q(1,1,1);function u(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(u),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new je},normalMatrix:{value:new le}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return _r.setFromAxisAngle(t,i),this.quaternion.multiply(_r),this}rotateOnWorldAxis(t,i){return _r.setFromAxisAngle(t,i),this.quaternion.premultiply(_r),this}rotateX(t){return this.rotateOnAxis(Wg,t)}rotateY(t){return this.rotateOnAxis(qg,t)}rotateZ(t){return this.rotateOnAxis(Yg,t)}translateOnAxis(t,i){return Xg.copy(t).applyQuaternion(this.quaternion),this.position.add(Xg.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(Wg,t)}translateY(t){return this.translateOnAxis(qg,t)}translateZ(t){return this.translateOnAxis(Yg,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ia.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?lc.copy(t):lc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ia.lookAt(Bo,lc,this.up):ia.lookAt(lc,Bo,this.up),this.quaternion.setFromRotationMatrix(ia),l&&(ia.extractRotation(l.matrixWorld),_r.setFromRotationMatrix(ia),this.quaternion.premultiply(_r.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(jg),gr.child=t,this.dispatchEvent(gr),gr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(Zx),ph.child=t,this.dispatchEvent(ph),ph.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ia.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ia.multiply(t.parent.matrixWorld)),t.applyMatrix4(ia),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(jg),gr.child=t,this.dispatchEvent(gr),gr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,t,Yx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,jx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function u(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const S=m[p];u(t.shapes,S)}else u(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(u(t.materials,this.material[m]));l.material=d}else l.material=u(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(u(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),v=h(t.images),S=h(t.shapes),y=h(t.skeletons),M=h(t.animations),b=h(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),v.length>0&&(s.images=v),S.length>0&&(s.shapes=S),y.length>0&&(s.skeletons=y),M.length>0&&(s.animations=M),b.length>0&&(s.nodes=b)}return s.object=l,s;function h(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Sn.DEFAULT_UP=new Q(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xi=new Q,aa=new Q,mh=new Q,sa=new Q,vr=new Q,Sr=new Q,Zg=new Q,_h=new Q,gh=new Q,vh=new Q,Sh=new $e,yh=new $e,xh=new $e;class Mi{constructor(t=new Q,i=new Q,s=new Q){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),xi.subVectors(t,i),l.cross(xi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(t,i,s,l,u){xi.subVectors(l,i),aa.subVectors(s,i),mh.subVectors(t,i);const h=xi.dot(xi),d=xi.dot(aa),m=xi.dot(mh),p=aa.dot(aa),v=aa.dot(mh),S=h*p-d*d;if(S===0)return u.set(0,0,0),null;const y=1/S,M=(p*m-d*v)*y,b=(h*v-d*m)*y;return u.set(1-M-b,b,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,sa)===null?!1:sa.x>=0&&sa.y>=0&&sa.x+sa.y<=1}static getInterpolation(t,i,s,l,u,h,d,m){return this.getBarycoord(t,i,s,l,sa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,sa.x),m.addScaledVector(h,sa.y),m.addScaledVector(d,sa.z),m)}static getInterpolatedAttribute(t,i,s,l,u,h){return Sh.setScalar(0),yh.setScalar(0),xh.setScalar(0),Sh.fromBufferAttribute(t,i),yh.fromBufferAttribute(t,s),xh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Sh,u.x),h.addScaledVector(yh,u.y),h.addScaledVector(xh,u.z),h}static isFrontFacing(t,i,s,l){return xi.subVectors(s,i),aa.subVectors(t,i),xi.cross(aa).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xi.subVectors(this.c,this.b),aa.subVectors(this.a,this.b),xi.cross(aa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Mi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,u){return Mi.getInterpolation(t,this.a,this.b,this.c,i,s,l,u)}containsPoint(t){return Mi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,u=this.c;let h,d;vr.subVectors(l,s),Sr.subVectors(u,s),_h.subVectors(t,s);const m=vr.dot(_h),p=Sr.dot(_h);if(m<=0&&p<=0)return i.copy(s);gh.subVectors(t,l);const v=vr.dot(gh),S=Sr.dot(gh);if(v>=0&&S<=v)return i.copy(l);const y=m*S-v*p;if(y<=0&&m>=0&&v<=0)return h=m/(m-v),i.copy(s).addScaledVector(vr,h);vh.subVectors(t,u);const M=vr.dot(vh),b=Sr.dot(vh);if(b>=0&&M<=b)return i.copy(u);const R=M*p-m*b;if(R<=0&&p>=0&&b<=0)return d=p/(p-b),i.copy(s).addScaledVector(Sr,d);const x=v*b-M*S;if(x<=0&&S-v>=0&&M-b>=0)return Zg.subVectors(u,l),d=(S-v)/(S-v+(M-b)),i.copy(l).addScaledVector(Zg,d);const g=1/(x+R+y);return h=R*g,d=y*g,i.copy(s).addScaledVector(vr,h).addScaledVector(Sr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const c0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ga={h:0,s:0,l:0},cc={h:0,s:0,l:0};function Mh(o,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(t-o)*6*i:i<1/2?t:i<2/3?o+(t-o)*6*(2/3-i):o}class ue{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=fi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ce.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=Ce.workingColorSpace){return this.r=t,this.g=i,this.b=s,Ce.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=Ce.workingColorSpace){if(t=Ux(t,1),i=_e(i,0,1),s=_e(s,0,1),i===0)this.r=this.g=this.b=s;else{const u=s<=.5?s*(1+i):s+i-s*i,h=2*s-u;this.r=Mh(h,u,t+1/3),this.g=Mh(h,u,t),this.b=Mh(h,u,t-1/3)}return Ce.toWorkingColorSpace(this,l),this}setStyle(t,i=fi){function s(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let u;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const u=l[1],h=u.length;if(h===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(u,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=fi){const s=c0[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fa(t.r),this.g=fa(t.g),this.b=fa(t.b),this}copyLinearToSRGB(t){return this.r=Dr(t.r),this.g=Dr(t.g),this.b=Dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fi){return Ce.fromWorkingColorSpace(Dn.copy(this),t),Math.round(_e(Dn.r*255,0,255))*65536+Math.round(_e(Dn.g*255,0,255))*256+Math.round(_e(Dn.b*255,0,255))}getHexString(t=fi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ce.workingColorSpace){Ce.fromWorkingColorSpace(Dn.copy(this),i);const s=Dn.r,l=Dn.g,u=Dn.b,h=Math.max(s,l,u),d=Math.min(s,l,u);let m,p;const v=(d+h)/2;if(d===h)m=0,p=0;else{const S=h-d;switch(p=v<=.5?S/(h+d):S/(2-h-d),h){case s:m=(l-u)/S+(l<u?6:0);break;case l:m=(u-s)/S+2;break;case u:m=(s-l)/S+4;break}m/=6}return t.h=m,t.s=p,t.l=v,t}getRGB(t,i=Ce.workingColorSpace){return Ce.fromWorkingColorSpace(Dn.copy(this),i),t.r=Dn.r,t.g=Dn.g,t.b=Dn.b,t}getStyle(t=fi){Ce.fromWorkingColorSpace(Dn.copy(this),t);const i=Dn.r,s=Dn.g,l=Dn.b;return t!==fi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Ga),this.setHSL(Ga.h+t,Ga.s+i,Ga.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Ga),t.getHSL(cc);const s=sh(Ga.h,cc.h,i),l=sh(Ga.s,cc.s,i),u=sh(Ga.l,cc.l,i);return this.setHSL(s,l,u),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,u=t.elements;return this.r=u[0]*i+u[3]*s+u[6]*l,this.g=u[1]*i+u[4]*s+u[7]*l,this.b=u[2]*i+u[5]*s+u[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dn=new ue;ue.NAMES=c0;let Kx=0;class ws extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=ko(),this.name="",this.type="Material",this.blending=Cr,this.side=qa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fh,this.blendDst=Hh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Cr&&(s.blending=this.blending),this.side!==qa&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Fh&&(s.blendSrc=this.blendSrc),this.blendDst!==Hh&&(s.blendDst=this.blendDst),this.blendEquation!==Ms&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Ur&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pg&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(s.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(u){const h=[];for(const d in u){const m=u[d];delete m.metadata,h.push(m)}return h}if(i){const u=l(t.textures),h=l(t.images);u.length>0&&(s.textures=u),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let u=0;u!==l;++u)s[u]=i[u].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class u0 extends ws{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.combine=qv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const cn=new Q,uc=new re;class Pn{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=zg,this.updateRanges=[],this.gpuType=ca,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)uc.fromBufferAttribute(this,i),uc.applyMatrix3(t),this.setXY(i,uc.x,uc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix3(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix4(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyNormalMatrix(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.transformDirection(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Oo(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Vn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Oo(i,this.array)),i}setX(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Oo(i,this.array)),i}setY(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Oo(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Oo(i,this.array)),i}setW(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,u){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array),u=Vn(u,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=u,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zg&&(t.usage=this.usage),t}}class f0 extends Pn{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class h0 extends Pn{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class bi extends Pn{constructor(t,i,s){super(new Float32Array(t),i,s)}}let Qx=0;const ui=new je,Eh=new Sn,yr=new Q,ei=new ha,Io=new ha,vn=new Q;class Ai extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qx++}),this.uuid=ko(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(r0(t)?h0:f0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const u=new le().getNormalMatrix(t);s.applyNormalMatrix(u),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ui.makeRotationFromQuaternion(t),this.applyMatrix4(ui),this}rotateX(t){return ui.makeRotationX(t),this.applyMatrix4(ui),this}rotateY(t){return ui.makeRotationY(t),this.applyMatrix4(ui),this}rotateZ(t){return ui.makeRotationZ(t),this.applyMatrix4(ui),this}translate(t,i,s){return ui.makeTranslation(t,i,s),this.applyMatrix4(ui),this}scale(t,i,s){return ui.makeScale(t,i,s),this.applyMatrix4(ui),this}lookAt(t){return Eh.lookAt(t),Eh.updateMatrix(),this.applyMatrix4(Eh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new bi(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const u=t[l];i.setXYZ(l,u.x,u.y,u.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ha);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const u=i[s];ei.setFromBufferAttribute(u),this.morphTargetsRelative?(vn.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(vn),vn.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(vn)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vc);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const s=this.boundingSphere.center;if(ei.setFromBufferAttribute(t),i)for(let u=0,h=i.length;u<h;u++){const d=i[u];Io.setFromBufferAttribute(d),this.morphTargetsRelative?(vn.addVectors(ei.min,Io.min),ei.expandByPoint(vn),vn.addVectors(ei.max,Io.max),ei.expandByPoint(vn)):(ei.expandByPoint(Io.min),ei.expandByPoint(Io.max))}ei.getCenter(s);let l=0;for(let u=0,h=t.count;u<h;u++)vn.fromBufferAttribute(t,u),l=Math.max(l,s.distanceToSquared(vn));if(i)for(let u=0,h=i.length;u<h;u++){const d=i[u],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)vn.fromBufferAttribute(d,p),m&&(yr.fromBufferAttribute(t,p),vn.add(yr)),l=Math.max(l,s.distanceToSquared(vn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,u=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let V=0;V<s.count;V++)d[V]=new Q,m[V]=new Q;const p=new Q,v=new Q,S=new Q,y=new re,M=new re,b=new re,R=new Q,x=new Q;function g(V,w,C){p.fromBufferAttribute(s,V),v.fromBufferAttribute(s,w),S.fromBufferAttribute(s,C),y.fromBufferAttribute(u,V),M.fromBufferAttribute(u,w),b.fromBufferAttribute(u,C),v.sub(p),S.sub(p),M.sub(y),b.sub(y);const G=1/(M.x*b.y-b.x*M.y);isFinite(G)&&(R.copy(v).multiplyScalar(b.y).addScaledVector(S,-M.y).multiplyScalar(G),x.copy(S).multiplyScalar(M.x).addScaledVector(v,-b.x).multiplyScalar(G),d[V].add(R),d[w].add(R),d[C].add(R),m[V].add(x),m[w].add(x),m[C].add(x))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let V=0,w=I.length;V<w;++V){const C=I[V],G=C.start,lt=C.count;for(let rt=G,mt=G+lt;rt<mt;rt+=3)g(t.getX(rt+0),t.getX(rt+1),t.getX(rt+2))}const P=new Q,L=new Q,K=new Q,N=new Q;function D(V){K.fromBufferAttribute(l,V),N.copy(K);const w=d[V];P.copy(w),P.sub(K.multiplyScalar(K.dot(w))).normalize(),L.crossVectors(N,w);const G=L.dot(m[V])<0?-1:1;h.setXYZW(V,P.x,P.y,P.z,G)}for(let V=0,w=I.length;V<w;++V){const C=I[V],G=C.start,lt=C.count;for(let rt=G,mt=G+lt;rt<mt;rt+=3)D(t.getX(rt+0)),D(t.getX(rt+1)),D(t.getX(rt+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Pn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let y=0,M=s.count;y<M;y++)s.setXYZ(y,0,0,0);const l=new Q,u=new Q,h=new Q,d=new Q,m=new Q,p=new Q,v=new Q,S=new Q;if(t)for(let y=0,M=t.count;y<M;y+=3){const b=t.getX(y+0),R=t.getX(y+1),x=t.getX(y+2);l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,R),h.fromBufferAttribute(i,x),v.subVectors(h,u),S.subVectors(l,u),v.cross(S),d.fromBufferAttribute(s,b),m.fromBufferAttribute(s,R),p.fromBufferAttribute(s,x),d.add(v),m.add(v),p.add(v),s.setXYZ(b,d.x,d.y,d.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(x,p.x,p.y,p.z)}else for(let y=0,M=i.count;y<M;y+=3)l.fromBufferAttribute(i,y+0),u.fromBufferAttribute(i,y+1),h.fromBufferAttribute(i,y+2),v.subVectors(h,u),S.subVectors(l,u),v.cross(S),s.setXYZ(y+0,v.x,v.y,v.z),s.setXYZ(y+1,v.x,v.y,v.z),s.setXYZ(y+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)vn.fromBufferAttribute(t,i),vn.normalize(),t.setXYZ(i,vn.x,vn.y,vn.z)}toNonIndexed(){function t(d,m){const p=d.array,v=d.itemSize,S=d.normalized,y=new p.constructor(m.length*v);let M=0,b=0;for(let R=0,x=m.length;R<x;R++){d.isInterleavedBufferAttribute?M=m[R]*d.data.stride+d.offset:M=m[R]*v;for(let g=0;g<v;g++)y[b++]=p[M++]}return new Pn(y,v,S)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ai,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const u=this.morphAttributes;for(const d in u){const m=[],p=u[d];for(let v=0,S=p.length;v<S;v++){const y=p[v],M=t(y,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let S=0,y=p.length;S<y;S++){const M=p[S];v.push(M.toJSON(t.data))}v.length>0&&(l[m]=v,u=!0)}u&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(i))}const u=t.morphAttributes;for(const p in u){const v=[],S=u[p];for(let y=0,M=S.length;y<M;y++)v.push(S[y].clone(i));this.morphAttributes[p]=v}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,v=h.length;p<v;p++){const S=h[p];this.addGroup(S.start,S.count,S.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kg=new je,gs=new kc,fc=new Vc,Qg=new Q,hc=new Q,dc=new Q,pc=new Q,Th=new Q,mc=new Q,Jg=new Q,_c=new Q;class di extends Sn{constructor(t=new Ai,i=new u0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,u=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(u&&d){mc.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const v=d[m],S=u[m];v!==0&&(Th.fromBufferAttribute(S,t),h?mc.addScaledVector(Th,v):mc.addScaledVector(Th.sub(i),v))}i.add(mc)}return i}raycast(t,i){const s=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),fc.copy(s.boundingSphere),fc.applyMatrix4(u),gs.copy(t.ray).recast(t.near),!(fc.containsPoint(gs.origin)===!1&&(gs.intersectSphere(fc,Qg)===null||gs.origin.distanceToSquared(Qg)>(t.far-t.near)**2))&&(Kg.copy(u).invert(),gs.copy(t.ray).applyMatrix4(Kg),!(s.boundingBox!==null&&gs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,gs)))}_computeIntersections(t,i,s){let l;const u=this.geometry,h=this.material,d=u.index,m=u.attributes.position,p=u.attributes.uv,v=u.attributes.uv1,S=u.attributes.normal,y=u.groups,M=u.drawRange;if(d!==null)if(Array.isArray(h))for(let b=0,R=y.length;b<R;b++){const x=y[b],g=h[x.materialIndex],I=Math.max(x.start,M.start),P=Math.min(d.count,Math.min(x.start+x.count,M.start+M.count));for(let L=I,K=P;L<K;L+=3){const N=d.getX(L),D=d.getX(L+1),V=d.getX(L+2);l=gc(this,g,t,s,p,v,S,N,D,V),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),R=Math.min(d.count,M.start+M.count);for(let x=b,g=R;x<g;x+=3){const I=d.getX(x),P=d.getX(x+1),L=d.getX(x+2);l=gc(this,h,t,s,p,v,S,I,P,L),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let b=0,R=y.length;b<R;b++){const x=y[b],g=h[x.materialIndex],I=Math.max(x.start,M.start),P=Math.min(m.count,Math.min(x.start+x.count,M.start+M.count));for(let L=I,K=P;L<K;L+=3){const N=L,D=L+1,V=L+2;l=gc(this,g,t,s,p,v,S,N,D,V),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),R=Math.min(m.count,M.start+M.count);for(let x=b,g=R;x<g;x+=3){const I=x,P=x+1,L=x+2;l=gc(this,h,t,s,p,v,S,I,P,L),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function Jx(o,t,i,s,l,u,h,d){let m;if(t.side===Wn?m=s.intersectTriangle(h,u,l,!0,d):m=s.intersectTriangle(l,u,h,t.side===qa,d),m===null)return null;_c.copy(d),_c.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(_c);return p<i.near||p>i.far?null:{distance:p,point:_c.clone(),object:o}}function gc(o,t,i,s,l,u,h,d,m,p){o.getVertexPosition(d,hc),o.getVertexPosition(m,dc),o.getVertexPosition(p,pc);const v=Jx(o,t,i,s,hc,dc,pc,Jg);if(v){const S=new Q;Mi.getBarycoord(Jg,hc,dc,pc,S),l&&(v.uv=Mi.getInterpolatedAttribute(l,d,m,p,S,new re)),u&&(v.uv1=Mi.getInterpolatedAttribute(u,d,m,p,S,new re)),h&&(v.normal=Mi.getInterpolatedAttribute(h,d,m,p,S,new Q),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const y={a:d,b:m,c:p,normal:new Q,materialIndex:0};Mi.getNormal(hc,dc,pc,y.normal),v.face=y,v.barycoord=S}return v}class Ir extends Ai{constructor(t=1,i=1,s=1,l=1,u=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:u,depthSegments:h};const d=this;l=Math.floor(l),u=Math.floor(u),h=Math.floor(h);const m=[],p=[],v=[],S=[];let y=0,M=0;b("z","y","x",-1,-1,s,i,t,h,u,0),b("z","y","x",1,-1,s,i,-t,h,u,1),b("x","z","y",1,1,t,s,i,l,h,2),b("x","z","y",1,-1,t,s,-i,l,h,3),b("x","y","z",1,-1,t,i,s,l,u,4),b("x","y","z",-1,-1,t,i,-s,l,u,5),this.setIndex(m),this.setAttribute("position",new bi(p,3)),this.setAttribute("normal",new bi(v,3)),this.setAttribute("uv",new bi(S,2));function b(R,x,g,I,P,L,K,N,D,V,w){const C=L/D,G=K/V,lt=L/2,rt=K/2,mt=N/2,_t=D+1,z=V+1;let Z=0,j=0;const xt=new Q;for(let Tt=0;Tt<z;Tt++){const O=Tt*G-rt;for(let nt=0;nt<_t;nt++){const yt=nt*C-lt;xt[R]=yt*I,xt[x]=O*P,xt[g]=mt,p.push(xt.x,xt.y,xt.z),xt[R]=0,xt[x]=0,xt[g]=N>0?1:-1,v.push(xt.x,xt.y,xt.z),S.push(nt/D),S.push(1-Tt/V),Z+=1}}for(let Tt=0;Tt<V;Tt++)for(let O=0;O<D;O++){const nt=y+O+_t*Tt,yt=y+O+_t*(Tt+1),Y=y+(O+1)+_t*(Tt+1),ct=y+(O+1)+_t*Tt;m.push(nt,yt,ct),m.push(yt,Y,ct),j+=6}d.addGroup(M,j,w),M+=j,y+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ir(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Br(o){const t={};for(const i in o){t[i]={};for(const s in o[i]){const l=o[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function On(o){const t={};for(let i=0;i<o.length;i++){const s=Br(o[i]);for(const l in s)t[l]=s[l]}return t}function $x(o){const t=[];for(let i=0;i<o.length;i++)t.push(o[i].clone());return t}function d0(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ce.workingColorSpace}const tM={clone:Br,merge:On};var eM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ja extends ws{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eM,this.fragmentShader=nM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Br(t.uniforms),this.uniformsGroups=$x(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class p0 extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=ua}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Va=new Q,$g=new re,tv=new re;class hi extends p0{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Td*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Nc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Td*2*Math.atan(Math.tan(Nc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){Va.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Va.x,Va.y).multiplyScalar(-t/Va.z),Va.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Va.x,Va.y).multiplyScalar(-t/Va.z)}getViewSize(t,i){return this.getViewBounds(t,$g,tv),i.subVectors(tv,$g)}setViewOffset(t,i,s,l,u,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Nc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,u=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;u+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(u+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const xr=-90,Mr=1;class iM extends Sn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new hi(xr,Mr,t,i);l.layers=this.layers,this.add(l);const u=new hi(xr,Mr,t,i);u.layers=this.layers,this.add(u);const h=new hi(xr,Mr,t,i);h.layers=this.layers,this.add(h);const d=new hi(xr,Mr,t,i);d.layers=this.layers,this.add(d);const m=new hi(xr,Mr,t,i);m.layers=this.layers,this.add(m);const p=new hi(xr,Mr,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,u,h,d,m]=i;for(const p of i)this.remove(p);if(t===ua)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===zc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[u,h,d,m,p,v]=this.children,S=t.getRenderTarget(),y=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,u),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,m),t.setRenderTarget(s,4,l),t.render(i,p),s.texture.generateMipmaps=R,t.setRenderTarget(s,5,l),t.render(i,v),t.setRenderTarget(S,y,M),t.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class m0 extends qn{constructor(t,i,s,l,u,h,d,m,p,v){t=t!==void 0?t:[],i=i!==void 0?i:Lr,super(t,i,s,l,u,h,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class aM extends Rs{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new m0(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Oi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Ir(5,5,5),u=new ja({name:"CubemapFromEquirect",uniforms:Br(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Wn,blending:Xa});u.uniforms.tEquirect.value=i;const h=new di(l,u),d=i.minFilter;return i.minFilter===bs&&(i.minFilter=Oi),new iM(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const u=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(u)}}class zd{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new ue(t),this.near=i,this.far=s}clone(){return new zd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class sM extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pi,this.environmentIntensity=1,this.environmentRotation=new Pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const bh=new Q,rM=new Q,oM=new le;class oa{constructor(t=new Q(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=bh.subVectors(s,i).cross(rM.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(bh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const u=-(t.start.dot(this.normal)+this.constant)/l;return u<0||u>1?null:i.copy(t.start).addScaledVector(s,u)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||oM.getNormalMatrix(t),l=this.coplanarPoint(bh).applyMatrix4(t),u=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(u),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vs=new Vc,vc=new Q;class Bd{constructor(t=new oa,i=new oa,s=new oa,l=new oa,u=new oa,h=new oa){this.planes=[t,i,s,l,u,h]}set(t,i,s,l,u,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(u),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ua){const s=this.planes,l=t.elements,u=l[0],h=l[1],d=l[2],m=l[3],p=l[4],v=l[5],S=l[6],y=l[7],M=l[8],b=l[9],R=l[10],x=l[11],g=l[12],I=l[13],P=l[14],L=l[15];if(s[0].setComponents(m-u,y-p,x-M,L-g).normalize(),s[1].setComponents(m+u,y+p,x+M,L+g).normalize(),s[2].setComponents(m+h,y+v,x+b,L+I).normalize(),s[3].setComponents(m-h,y-v,x-b,L-I).normalize(),s[4].setComponents(m-d,y-S,x-R,L-P).normalize(),i===ua)s[5].setComponents(m+d,y+S,x+R,L+P).normalize();else if(i===zc)s[5].setComponents(d,S,R,P).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){return vs.center.set(0,0,0),vs.radius=.7071067811865476,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(vc.x=l.normal.x>0?t.max.x:t.min.x,vc.y=l.normal.y>0?t.max.y:t.min.y,vc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(vc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Id extends ws{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ic=new Q,Fc=new Q,ev=new je,Fo=new kc,Sc=new Vc,Ah=new Q,nv=new Q;class lM extends Sn{constructor(t=new Ai,i=new Id){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,u=i.count;l<u;l++)Ic.fromBufferAttribute(i,l-1),Fc.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Ic.distanceTo(Fc);t.setAttribute("lineDistance",new bi(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,u=t.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Sc.copy(s.boundingSphere),Sc.applyMatrix4(l),Sc.radius+=u,t.ray.intersectsSphere(Sc)===!1)return;ev.copy(l).invert(),Fo.copy(t.ray).applyMatrix4(ev);const d=u/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,v=s.index,y=s.attributes.position;if(v!==null){const M=Math.max(0,h.start),b=Math.min(v.count,h.start+h.count);for(let R=M,x=b-1;R<x;R+=p){const g=v.getX(R),I=v.getX(R+1),P=yc(this,t,Fo,m,g,I);P&&i.push(P)}if(this.isLineLoop){const R=v.getX(b-1),x=v.getX(M),g=yc(this,t,Fo,m,R,x);g&&i.push(g)}}else{const M=Math.max(0,h.start),b=Math.min(y.count,h.start+h.count);for(let R=M,x=b-1;R<x;R+=p){const g=yc(this,t,Fo,m,R,R+1);g&&i.push(g)}if(this.isLineLoop){const R=yc(this,t,Fo,m,b-1,M);R&&i.push(R)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}}function yc(o,t,i,s,l,u){const h=o.geometry.attributes.position;if(Ic.fromBufferAttribute(h,l),Fc.fromBufferAttribute(h,u),i.distanceSqToSegment(Ic,Fc,Ah,nv)>s)return;Ah.applyMatrix4(o.matrixWorld);const m=t.ray.origin.distanceTo(Ah);if(!(m<t.near||m>t.far))return{distance:m,point:nv.clone().applyMatrix4(o.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:o}}const iv=new Q,av=new Q;class _0 extends lM{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,u=i.count;l<u;l+=2)iv.fromBufferAttribute(i,l),av.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+iv.distanceTo(av);t.setAttribute("lineDistance",new bi(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xc extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class g0 extends qn{constructor(t,i,s,l,u,h,d,m,p,v=wr){if(v!==wr&&v!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&v===wr&&(s=As),s===void 0&&v===Pr&&(s=Or),super(null,l,u,h,d,m,v,s,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:Ti,this.minFilter=m!==void 0?m:Ti,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Xo extends Ai{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const u=t/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,v=m+1,S=t/d,y=i/m,M=[],b=[],R=[],x=[];for(let g=0;g<v;g++){const I=g*y-h;for(let P=0;P<p;P++){const L=P*S-u;b.push(L,-I,0),R.push(0,0,1),x.push(P/d),x.push(1-g/m)}}for(let g=0;g<m;g++)for(let I=0;I<d;I++){const P=I+p*g,L=I+p*(g+1),K=I+1+p*(g+1),N=I+1+p*g;M.push(P,L,N),M.push(L,K,N)}this.setIndex(M),this.setAttribute("position",new bi(b,3)),this.setAttribute("normal",new bi(R,3)),this.setAttribute("uv",new bi(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xo(t.width,t.height,t.widthSegments,t.heightSegments)}}class cM extends ws{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ue(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class sv extends ws{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=a0,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class uM extends ws{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fM extends ws{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class v0 extends Sn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class hM extends v0{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ue(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}}const Rh=new je,rv=new Q,ov=new Q;class dM{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bd,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;rv.setFromMatrixPosition(t.matrixWorld),i.position.copy(rv),ov.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(ov),i.updateMatrixWorld(),Rh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rh),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Rh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class S0 extends p0{constructor(t=-1,i=1,s=1,l=-1,u=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=u,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,u,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=s-t,h=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,h=u+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(u,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class pM extends dM{constructor(){super(new S0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mM extends v0{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.shadow=new pM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _M extends hi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const lv=new je;class gM{constructor(t,i,s=0,l=1/0){this.ray=new kc(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new Pd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return lv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lv),this}intersectObject(t,i=!0,s=[]){return bd(t,this,s,i),s.sort(cv),s}intersectObjects(t,i=!0,s=[]){for(let l=0,u=t.length;l<u;l++)bd(t[l],this,s,i);return s.sort(cv),s}}function cv(o,t){return o.distance-t.distance}function bd(o,t,i,s){let l=!0;if(o.layers.test(t.layers)&&o.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const u=o.children;for(let h=0,d=u.length;h<d;h++)bd(u[h],t,i,!0)}}class uv{constructor(t=1,i=0,s=0){return this.radius=t,this.phi=i,this.theta=s,this}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=_e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(_e(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class vM extends _0{constructor(t=10,i=10,s=4473924,l=8947848){s=new ue(s),l=new ue(l);const u=i/2,h=t/i,d=t/2,m=[],p=[];for(let y=0,M=0,b=-d;y<=i;y++,b+=h){m.push(-d,0,b,d,0,b),m.push(b,0,-d,b,0,d);const R=y===u?s:l;R.toArray(p,M),M+=3,R.toArray(p,M),M+=3,R.toArray(p,M),M+=3,R.toArray(p,M),M+=3}const v=new Ai;v.setAttribute("position",new bi(m,3)),v.setAttribute("color",new bi(p,3));const S=new Id({vertexColors:!0,toneMapped:!1});super(v,S),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Mc=new ha;class SM extends _0{constructor(t,i=16776960){const s=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),l=new Float32Array(24),u=new Ai;u.setIndex(new Pn(s,1)),u.setAttribute("position",new Pn(l,3)),super(u,new Id({color:i,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Mc.setFromObject(this.object),Mc.isEmpty())return;const i=Mc.min,s=Mc.max,l=this.geometry.attributes.position,u=l.array;u[0]=s.x,u[1]=s.y,u[2]=s.z,u[3]=i.x,u[4]=s.y,u[5]=s.z,u[6]=i.x,u[7]=i.y,u[8]=s.z,u[9]=s.x,u[10]=i.y,u[11]=s.z,u[12]=s.x,u[13]=s.y,u[14]=i.z,u[15]=i.x,u[16]=s.y,u[17]=i.z,u[18]=i.x,u[19]=i.y,u[20]=i.z,u[21]=s.x,u[22]=i.y,u[23]=i.z,l.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,i){return super.copy(t,i),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class yM extends Cs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function fv(o,t,i,s){const l=xM(s);switch(i){case Qv:return o*t;case $v:return o*t;case t0:return o*t*2;case e0:return o*t/l.components*l.byteLength;case Ld:return o*t/l.components*l.byteLength;case n0:return o*t*2/l.components*l.byteLength;case Nd:return o*t*2/l.components*l.byteLength;case Jv:return o*t*3/l.components*l.byteLength;case Ei:return o*t*4/l.components*l.byteLength;case Od:return o*t*4/l.components*l.byteLength;case Cc:case wc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Dc:case Uc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case $h:case ed:return Math.max(o,16)*Math.max(t,8)/4;case Jh:case td:return Math.max(o,8)*Math.max(t,8)/2;case nd:case id:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case ad:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case sd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case rd:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case od:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case ld:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case cd:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case ud:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case fd:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case hd:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case dd:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case pd:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case md:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case _d:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case gd:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case vd:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case Lc:case Sd:case yd:return Math.ceil(o/4)*Math.ceil(t/4)*16;case i0:case xd:return Math.ceil(o/4)*Math.ceil(t/4)*8;case Md:case Ed:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function xM(o){switch(o){case da:case jv:return{byteLength:1,components:1};case Go:case Zv:case Vo:return{byteLength:2,components:1};case Dd:case Ud:return{byteLength:2,components:4};case As:case wd:case ca:return{byteLength:4,components:1};case Kv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cd);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function y0(){let o=null,t=!1,i=null,s=null;function l(u,h){i(u,h),s=o.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=o.requestAnimationFrame(l),t=!0)},stop:function(){o.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(u){i=u},setContext:function(u){o=u}}}function MM(o){const t=new WeakMap;function i(d,m){const p=d.array,v=d.usage,S=p.byteLength,y=o.createBuffer();o.bindBuffer(m,y),o.bufferData(m,p,v),d.onUploadCallback();let M;if(p instanceof Float32Array)M=o.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=o.SHORT;else if(p instanceof Uint32Array)M=o.UNSIGNED_INT;else if(p instanceof Int32Array)M=o.INT;else if(p instanceof Int8Array)M=o.BYTE;else if(p instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:S}}function s(d,m,p){const v=m.array,S=m.updateRanges;if(o.bindBuffer(p,d),S.length===0)o.bufferSubData(p,0,v);else{S.sort((M,b)=>M.start-b.start);let y=0;for(let M=1;M<S.length;M++){const b=S[y],R=S[M];R.start<=b.start+b.count+1?b.count=Math.max(b.count,R.start+R.count-b.start):(++y,S[y]=R)}S.length=y+1;for(let M=0,b=S.length;M<b;M++){const R=S[M];o.bufferSubData(p,R.start*v.BYTES_PER_ELEMENT,v,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(o.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=t.get(d);(!v||v.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:u,update:h}}var EM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,TM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,AM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,CM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,DM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,UM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,LM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,NM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,OM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,PM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,BM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,IM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,FM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,XM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,WM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,qM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,YM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,KM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$M="gl_FragColor = linearToOutputTexel( gl_FragColor );",tE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,iE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,aE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_E=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,SE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ME=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,EE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,TE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,AE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,DE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,UE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,LE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,OE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,PE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,BE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,FE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,GE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,VE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,WE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,YE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,KE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,JE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$E=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,iT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,oT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_T=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ST=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const MT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ET=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,DT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,UT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,LT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,NT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,BT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,GT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,XT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,YT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,QT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,JT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$T=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ce={alphahash_fragment:EM,alphahash_pars_fragment:TM,alphamap_fragment:bM,alphamap_pars_fragment:AM,alphatest_fragment:RM,alphatest_pars_fragment:CM,aomap_fragment:wM,aomap_pars_fragment:DM,batching_pars_vertex:UM,batching_vertex:LM,begin_vertex:NM,beginnormal_vertex:OM,bsdfs:PM,iridescence_fragment:zM,bumpmap_pars_fragment:BM,clipping_planes_fragment:IM,clipping_planes_pars_fragment:FM,clipping_planes_pars_vertex:HM,clipping_planes_vertex:GM,color_fragment:VM,color_pars_fragment:kM,color_pars_vertex:XM,color_vertex:WM,common:qM,cube_uv_reflection_fragment:YM,defaultnormal_vertex:jM,displacementmap_pars_vertex:ZM,displacementmap_vertex:KM,emissivemap_fragment:QM,emissivemap_pars_fragment:JM,colorspace_fragment:$M,colorspace_pars_fragment:tE,envmap_fragment:eE,envmap_common_pars_fragment:nE,envmap_pars_fragment:iE,envmap_pars_vertex:aE,envmap_physical_pars_fragment:mE,envmap_vertex:sE,fog_vertex:rE,fog_pars_vertex:oE,fog_fragment:lE,fog_pars_fragment:cE,gradientmap_pars_fragment:uE,lightmap_pars_fragment:fE,lights_lambert_fragment:hE,lights_lambert_pars_fragment:dE,lights_pars_begin:pE,lights_toon_fragment:_E,lights_toon_pars_fragment:gE,lights_phong_fragment:vE,lights_phong_pars_fragment:SE,lights_physical_fragment:yE,lights_physical_pars_fragment:xE,lights_fragment_begin:ME,lights_fragment_maps:EE,lights_fragment_end:TE,logdepthbuf_fragment:bE,logdepthbuf_pars_fragment:AE,logdepthbuf_pars_vertex:RE,logdepthbuf_vertex:CE,map_fragment:wE,map_pars_fragment:DE,map_particle_fragment:UE,map_particle_pars_fragment:LE,metalnessmap_fragment:NE,metalnessmap_pars_fragment:OE,morphinstance_vertex:PE,morphcolor_vertex:zE,morphnormal_vertex:BE,morphtarget_pars_vertex:IE,morphtarget_vertex:FE,normal_fragment_begin:HE,normal_fragment_maps:GE,normal_pars_fragment:VE,normal_pars_vertex:kE,normal_vertex:XE,normalmap_pars_fragment:WE,clearcoat_normal_fragment_begin:qE,clearcoat_normal_fragment_maps:YE,clearcoat_pars_fragment:jE,iridescence_pars_fragment:ZE,opaque_fragment:KE,packing:QE,premultiplied_alpha_fragment:JE,project_vertex:$E,dithering_fragment:tT,dithering_pars_fragment:eT,roughnessmap_fragment:nT,roughnessmap_pars_fragment:iT,shadowmap_pars_fragment:aT,shadowmap_pars_vertex:sT,shadowmap_vertex:rT,shadowmask_pars_fragment:oT,skinbase_vertex:lT,skinning_pars_vertex:cT,skinning_vertex:uT,skinnormal_vertex:fT,specularmap_fragment:hT,specularmap_pars_fragment:dT,tonemapping_fragment:pT,tonemapping_pars_fragment:mT,transmission_fragment:_T,transmission_pars_fragment:gT,uv_pars_fragment:vT,uv_pars_vertex:ST,uv_vertex:yT,worldpos_vertex:xT,background_vert:MT,background_frag:ET,backgroundCube_vert:TT,backgroundCube_frag:bT,cube_vert:AT,cube_frag:RT,depth_vert:CT,depth_frag:wT,distanceRGBA_vert:DT,distanceRGBA_frag:UT,equirect_vert:LT,equirect_frag:NT,linedashed_vert:OT,linedashed_frag:PT,meshbasic_vert:zT,meshbasic_frag:BT,meshlambert_vert:IT,meshlambert_frag:FT,meshmatcap_vert:HT,meshmatcap_frag:GT,meshnormal_vert:VT,meshnormal_frag:kT,meshphong_vert:XT,meshphong_frag:WT,meshphysical_vert:qT,meshphysical_frag:YT,meshtoon_vert:jT,meshtoon_frag:ZT,points_vert:KT,points_frag:QT,shadow_vert:JT,shadow_frag:$T,sprite_vert:tb,sprite_frag:eb},Ut={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new le}},envmap:{envMap:{value:null},envMapRotation:{value:new le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new le},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0},uvTransform:{value:new le}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}}},Ni={basic:{uniforms:On([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:On([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ue(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:On([Ut.common,Ut.specularmap,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,Ut.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:On([Ut.common,Ut.envmap,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.roughnessmap,Ut.metalnessmap,Ut.fog,Ut.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:On([Ut.common,Ut.aomap,Ut.lightmap,Ut.emissivemap,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.gradientmap,Ut.fog,Ut.lights,{emissive:{value:new ue(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:On([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,Ut.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:On([Ut.points,Ut.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:On([Ut.common,Ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:On([Ut.common,Ut.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:On([Ut.common,Ut.bumpmap,Ut.normalmap,Ut.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:On([Ut.sprite,Ut.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new le}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:On([Ut.common,Ut.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:On([Ut.lights,Ut.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};Ni.physical={uniforms:On([Ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new le},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new le},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new le},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new le},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new le},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new le}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const Ec={r:0,b:0,g:0},Ss=new Pi,nb=new je;function ib(o,t,i,s,l,u,h){const d=new ue(0);let m=u===!0?0:1,p,v,S=null,y=0,M=null;function b(P){let L=P.isScene===!0?P.background:null;return L&&L.isTexture&&(L=(P.backgroundBlurriness>0?i:t).get(L)),L}function R(P){let L=!1;const K=b(P);K===null?g(d,m):K&&K.isColor&&(g(K,1),L=!0);const N=o.xr.getEnvironmentBlendMode();N==="additive"?s.buffers.color.setClear(0,0,0,1,h):N==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||L)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function x(P,L){const K=b(L);K&&(K.isCubeTexture||K.mapping===Gc)?(v===void 0&&(v=new di(new Ir(1,1,1),new ja({name:"BackgroundCubeMaterial",uniforms:Br(Ni.backgroundCube.uniforms),vertexShader:Ni.backgroundCube.vertexShader,fragmentShader:Ni.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(N,D,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Ss.copy(L.backgroundRotation),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,K.isCubeTexture&&K.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),v.material.uniforms.envMap.value=K,v.material.uniforms.flipEnvMap.value=K.isCubeTexture&&K.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(nb.makeRotationFromEuler(Ss)),v.material.toneMapped=Ce.getTransfer(K.colorSpace)!==Ie,(S!==K||y!==K.version||M!==o.toneMapping)&&(v.material.needsUpdate=!0,S=K,y=K.version,M=o.toneMapping),v.layers.enableAll(),P.unshift(v,v.geometry,v.material,0,0,null)):K&&K.isTexture&&(p===void 0&&(p=new di(new Xo(2,2),new ja({name:"BackgroundMaterial",uniforms:Br(Ni.background.uniforms),vertexShader:Ni.background.vertexShader,fragmentShader:Ni.background.fragmentShader,side:qa,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=K,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.toneMapped=Ce.getTransfer(K.colorSpace)!==Ie,K.matrixAutoUpdate===!0&&K.updateMatrix(),p.material.uniforms.uvTransform.value.copy(K.matrix),(S!==K||y!==K.version||M!==o.toneMapping)&&(p.material.needsUpdate=!0,S=K,y=K.version,M=o.toneMapping),p.layers.enableAll(),P.unshift(p,p.geometry,p.material,0,0,null))}function g(P,L){P.getRGB(Ec,d0(o)),s.buffers.color.setClear(Ec.r,Ec.g,Ec.b,L,h)}function I(){v!==void 0&&(v.geometry.dispose(),v.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(P,L=1){d.set(P),m=L,g(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(P){m=P,g(d,m)},render:R,addToRenderList:x,dispose:I}}function ab(o,t){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=y(null);let u=l,h=!1;function d(C,G,lt,rt,mt){let _t=!1;const z=S(rt,lt,G);u!==z&&(u=z,p(u.object)),_t=M(C,rt,lt,mt),_t&&b(C,rt,lt,mt),mt!==null&&t.update(mt,o.ELEMENT_ARRAY_BUFFER),(_t||h)&&(h=!1,L(C,G,lt,rt),mt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(mt).buffer))}function m(){return o.createVertexArray()}function p(C){return o.bindVertexArray(C)}function v(C){return o.deleteVertexArray(C)}function S(C,G,lt){const rt=lt.wireframe===!0;let mt=s[C.id];mt===void 0&&(mt={},s[C.id]=mt);let _t=mt[G.id];_t===void 0&&(_t={},mt[G.id]=_t);let z=_t[rt];return z===void 0&&(z=y(m()),_t[rt]=z),z}function y(C){const G=[],lt=[],rt=[];for(let mt=0;mt<i;mt++)G[mt]=0,lt[mt]=0,rt[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:lt,attributeDivisors:rt,object:C,attributes:{},index:null}}function M(C,G,lt,rt){const mt=u.attributes,_t=G.attributes;let z=0;const Z=lt.getAttributes();for(const j in Z)if(Z[j].location>=0){const Tt=mt[j];let O=_t[j];if(O===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(O=C.instanceColor)),Tt===void 0||Tt.attribute!==O||O&&Tt.data!==O.data)return!0;z++}return u.attributesNum!==z||u.index!==rt}function b(C,G,lt,rt){const mt={},_t=G.attributes;let z=0;const Z=lt.getAttributes();for(const j in Z)if(Z[j].location>=0){let Tt=_t[j];Tt===void 0&&(j==="instanceMatrix"&&C.instanceMatrix&&(Tt=C.instanceMatrix),j==="instanceColor"&&C.instanceColor&&(Tt=C.instanceColor));const O={};O.attribute=Tt,Tt&&Tt.data&&(O.data=Tt.data),mt[j]=O,z++}u.attributes=mt,u.attributesNum=z,u.index=rt}function R(){const C=u.newAttributes;for(let G=0,lt=C.length;G<lt;G++)C[G]=0}function x(C){g(C,0)}function g(C,G){const lt=u.newAttributes,rt=u.enabledAttributes,mt=u.attributeDivisors;lt[C]=1,rt[C]===0&&(o.enableVertexAttribArray(C),rt[C]=1),mt[C]!==G&&(o.vertexAttribDivisor(C,G),mt[C]=G)}function I(){const C=u.newAttributes,G=u.enabledAttributes;for(let lt=0,rt=G.length;lt<rt;lt++)G[lt]!==C[lt]&&(o.disableVertexAttribArray(lt),G[lt]=0)}function P(C,G,lt,rt,mt,_t,z){z===!0?o.vertexAttribIPointer(C,G,lt,mt,_t):o.vertexAttribPointer(C,G,lt,rt,mt,_t)}function L(C,G,lt,rt){R();const mt=rt.attributes,_t=lt.getAttributes(),z=G.defaultAttributeValues;for(const Z in _t){const j=_t[Z];if(j.location>=0){let xt=mt[Z];if(xt===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(xt=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(xt=C.instanceColor)),xt!==void 0){const Tt=xt.normalized,O=xt.itemSize,nt=t.get(xt);if(nt===void 0)continue;const yt=nt.buffer,Y=nt.type,ct=nt.bytesPerElement,Et=Y===o.INT||Y===o.UNSIGNED_INT||xt.gpuType===wd;if(xt.isInterleavedBufferAttribute){const St=xt.data,Gt=St.stride,Ft=xt.offset;if(St.isInstancedInterleavedBuffer){for(let ne=0;ne<j.locationSize;ne++)g(j.location+ne,St.meshPerAttribute);C.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let ne=0;ne<j.locationSize;ne++)x(j.location+ne);o.bindBuffer(o.ARRAY_BUFFER,yt);for(let ne=0;ne<j.locationSize;ne++)P(j.location+ne,O/j.locationSize,Y,Tt,Gt*ct,(Ft+O/j.locationSize*ne)*ct,Et)}else{if(xt.isInstancedBufferAttribute){for(let St=0;St<j.locationSize;St++)g(j.location+St,xt.meshPerAttribute);C.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let St=0;St<j.locationSize;St++)x(j.location+St);o.bindBuffer(o.ARRAY_BUFFER,yt);for(let St=0;St<j.locationSize;St++)P(j.location+St,O/j.locationSize,Y,Tt,O*ct,O/j.locationSize*St*ct,Et)}}else if(z!==void 0){const Tt=z[Z];if(Tt!==void 0)switch(Tt.length){case 2:o.vertexAttrib2fv(j.location,Tt);break;case 3:o.vertexAttrib3fv(j.location,Tt);break;case 4:o.vertexAttrib4fv(j.location,Tt);break;default:o.vertexAttrib1fv(j.location,Tt)}}}}I()}function K(){V();for(const C in s){const G=s[C];for(const lt in G){const rt=G[lt];for(const mt in rt)v(rt[mt].object),delete rt[mt];delete G[lt]}delete s[C]}}function N(C){if(s[C.id]===void 0)return;const G=s[C.id];for(const lt in G){const rt=G[lt];for(const mt in rt)v(rt[mt].object),delete rt[mt];delete G[lt]}delete s[C.id]}function D(C){for(const G in s){const lt=s[G];if(lt[C.id]===void 0)continue;const rt=lt[C.id];for(const mt in rt)v(rt[mt].object),delete rt[mt];delete lt[C.id]}}function V(){w(),h=!0,u!==l&&(u=l,p(u.object))}function w(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:V,resetDefaultState:w,dispose:K,releaseStatesOfGeometry:N,releaseStatesOfProgram:D,initAttributes:R,enableAttribute:x,disableUnusedAttributes:I}}function sb(o,t,i){let s;function l(p){s=p}function u(p,v){o.drawArrays(s,p,v),i.update(v,s,1)}function h(p,v,S){S!==0&&(o.drawArraysInstanced(s,p,v,S),i.update(v,s,S))}function d(p,v,S){if(S===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,v,0,S);let M=0;for(let b=0;b<S;b++)M+=v[b];i.update(M,s,1)}function m(p,v,S,y){if(S===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<p.length;b++)h(p[b],v[b],y[b]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,v,0,y,0,S);let b=0;for(let R=0;R<S;R++)b+=v[R]*y[R];i.update(b,s,1)}}this.setMode=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function rb(o,t,i,s){let l;function u(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");l=o.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(D){return!(D!==Ei&&s.convert(D)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(D){const V=D===Vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==da&&s.convert(D)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==ca&&!V)}function m(D){if(D==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const v=m(p);v!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const S=i.logarithmicDepthBuffer===!0,y=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),b=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=o.getParameter(o.MAX_TEXTURE_SIZE),x=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),g=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),P=o.getParameter(o.MAX_VARYING_VECTORS),L=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),K=b>0,N=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:S,reverseDepthBuffer:y,maxTextures:M,maxVertexTextures:b,maxTextureSize:R,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:I,maxVaryings:P,maxFragmentUniforms:L,vertexTextures:K,maxSamples:N}}function ob(o){const t=this;let i=null,s=0,l=!1,u=!1;const h=new oa,d=new le,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(S,y){const M=S.length!==0||y||s!==0||l;return l=y,s=S.length,M},this.beginShadows=function(){u=!0,v(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(S,y){i=v(S,y,0)},this.setState=function(S,y,M){const b=S.clippingPlanes,R=S.clipIntersection,x=S.clipShadows,g=o.get(S);if(!l||b===null||b.length===0||u&&!x)u?v(null):p();else{const I=u?0:s,P=I*4;let L=g.clippingState||null;m.value=L,L=v(b,y,P,M);for(let K=0;K!==P;++K)L[K]=i[K];g.clippingState=L,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function v(S,y,M,b){const R=S!==null?S.length:0;let x=null;if(R!==0){if(x=m.value,b!==!0||x===null){const g=M+R*4,I=y.matrixWorldInverse;d.getNormalMatrix(I),(x===null||x.length<g)&&(x=new Float32Array(g));for(let P=0,L=M;P!==R;++P,L+=4)h.copy(S[P]).applyMatrix4(I,d),h.normal.toArray(x,L),x[L+3]=h.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,x}}function lb(o){let t=new WeakMap;function i(h,d){return d===jh?h.mapping=Lr:d===Zh&&(h.mapping=Nr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===jh||d===Zh)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new aM(m.height);return p.fromEquirectangularTexture(o,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function u(){t=new WeakMap}return{get:s,dispose:u}}const Ar=4,hv=[.125,.215,.35,.446,.526,.582],Es=20,Ch=new S0,dv=new ue;let wh=null,Dh=0,Uh=0,Lh=!1;const xs=(1+Math.sqrt(5))/2,Er=1/xs,pv=[new Q(-xs,Er,0),new Q(xs,Er,0),new Q(-Er,0,xs),new Q(Er,0,xs),new Q(0,xs,-Er),new Q(0,xs,Er),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class mv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){wh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(t,s,l,u),i>0&&this._blur(u,0,0,i),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wh,Dh,Uh),this._renderer.xr.enabled=Lh,t.scissorTest=!1,Tc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Lr||t.mapping===Nr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wh=this._renderer.getRenderTarget(),Dh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Oi,minFilter:Oi,generateMipmaps:!1,type:Vo,format:Ei,colorSpace:zr,depthBuffer:!1},l=_v(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_v(t,i,s);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cb(u)),this._blurMaterial=ub(u,t,i)}return l}_compileMaterial(t){const i=new di(this._lodPlanes[0],t);this._renderer.compile(i,Ch)}_sceneToCubeUV(t,i,s,l){const d=new hi(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],v=this._renderer,S=v.autoClear,y=v.toneMapping;v.getClearColor(dv),v.toneMapping=Wa,v.autoClear=!1;const M=new u0({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1}),b=new di(new Ir,M);let R=!1;const x=t.background;x?x.isColor&&(M.color.copy(x),t.background=null,R=!0):(M.color.copy(dv),R=!0);for(let g=0;g<6;g++){const I=g%3;I===0?(d.up.set(0,m[g],0),d.lookAt(p[g],0,0)):I===1?(d.up.set(0,0,m[g]),d.lookAt(0,p[g],0)):(d.up.set(0,m[g],0),d.lookAt(0,0,p[g]));const P=this._cubeSize;Tc(l,I*P,g>2?P:0,P,P),v.setRenderTarget(l),R&&v.render(b,d),v.render(t,d)}b.geometry.dispose(),b.material.dispose(),v.toneMapping=y,v.autoClear=S,t.background=x}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Lr||t.mapping===Nr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=vv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gv());const u=l?this._cubemapMaterial:this._equirectMaterial,h=new di(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=t;const m=this._cubeSize;Tc(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Ch)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let u=1;u<l;u++){const h=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=pv[(l-u-1)%pv.length];this._blur(t,u-1,u,h,d)}i.autoClear=s}_blur(t,i,s,l,u){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",u),this._halfBlur(h,t,s,s,l,"longitudinal",u)}_halfBlur(t,i,s,l,u,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,S=new di(this._lodPlanes[l],p),y=p.uniforms,M=this._sizeLods[s]-1,b=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*Es-1),R=u/b,x=isFinite(u)?1+Math.floor(v*R):Es;x>Es&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Es}`);const g=[];let I=0;for(let D=0;D<Es;++D){const V=D/R,w=Math.exp(-V*V/2);g.push(w),D===0?I+=w:D<x&&(I+=2*w)}for(let D=0;D<g.length;D++)g[D]=g[D]/I;y.envMap.value=t.texture,y.samples.value=x,y.weights.value=g,y.latitudinal.value=h==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:P}=this;y.dTheta.value=b,y.mipInt.value=P-s;const L=this._sizeLods[l],K=3*L*(l>P-Ar?l-P+Ar:0),N=4*(this._cubeSize-L);Tc(i,K,N,3*L,2*L),m.setRenderTarget(i),m.render(S,Ch)}}function cb(o){const t=[],i=[],s=[];let l=o;const u=o-Ar+1+hv.length;for(let h=0;h<u;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>o-Ar?m=hv[h-o+Ar-1]:h===0&&(m=0),s.push(m);const p=1/(d-2),v=-p,S=1+p,y=[v,v,S,v,S,S,v,v,S,S,v,S],M=6,b=6,R=3,x=2,g=1,I=new Float32Array(R*b*M),P=new Float32Array(x*b*M),L=new Float32Array(g*b*M);for(let N=0;N<M;N++){const D=N%3*2/3-1,V=N>2?0:-1,w=[D,V,0,D+2/3,V,0,D+2/3,V+1,0,D,V,0,D+2/3,V+1,0,D,V+1,0];I.set(w,R*b*N),P.set(y,x*b*N);const C=[N,N,N,N,N,N];L.set(C,g*b*N)}const K=new Ai;K.setAttribute("position",new Pn(I,R)),K.setAttribute("uv",new Pn(P,x)),K.setAttribute("faceIndex",new Pn(L,g)),t.push(K),l>Ar&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function _v(o,t,i){const s=new Rs(o,t,i);return s.texture.mapping=Gc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Tc(o,t,i,s,l){o.viewport.set(t,i,s,l),o.scissor.set(t,i,s,l)}function ub(o,t,i){const s=new Float32Array(Es),l=new Q(0,1,0);return new ja({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function gv(){return new ja({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function vv(){return new ja({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function Fd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fb(o){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===jh||m===Zh,v=m===Lr||m===Nr;if(p||v){let S=t.get(d);const y=S!==void 0?S.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new mv(o)),S=p?i.fromEquirectangular(d,S):i.fromCubemap(d,S),S.texture.pmremVersion=d.pmremVersion,t.set(d,S),S.texture;if(S!==void 0)return S.texture;{const M=d.image;return p&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new mv(o)),S=p?i.fromEquirectangular(d):i.fromCubemap(d),S.texture.pmremVersion=d.pmremVersion,t.set(d,S),d.addEventListener("dispose",u),S.texture):null}}}return d}function l(d){let m=0;const p=6;for(let v=0;v<p;v++)d[v]!==void 0&&m++;return m===p}function u(d){const m=d.target;m.removeEventListener("dispose",u);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function hb(o){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Tr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function db(o,t,i,s){const l={},u=new WeakMap;function h(S){const y=S.target;y.index!==null&&t.remove(y.index);for(const b in y.attributes)t.remove(y.attributes[b]);y.removeEventListener("dispose",h),delete l[y.id];const M=u.get(y);M&&(t.remove(M),u.delete(y)),s.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(S,y){return l[y.id]===!0||(y.addEventListener("dispose",h),l[y.id]=!0,i.memory.geometries++),y}function m(S){const y=S.attributes;for(const M in y)t.update(y[M],o.ARRAY_BUFFER)}function p(S){const y=[],M=S.index,b=S.attributes.position;let R=0;if(M!==null){const I=M.array;R=M.version;for(let P=0,L=I.length;P<L;P+=3){const K=I[P+0],N=I[P+1],D=I[P+2];y.push(K,N,N,D,D,K)}}else if(b!==void 0){const I=b.array;R=b.version;for(let P=0,L=I.length/3-1;P<L;P+=3){const K=P+0,N=P+1,D=P+2;y.push(K,N,N,D,D,K)}}else return;const x=new(r0(y)?h0:f0)(y,1);x.version=R;const g=u.get(S);g&&t.remove(g),u.set(S,x)}function v(S){const y=u.get(S);if(y){const M=S.index;M!==null&&y.version<M.version&&p(S)}else p(S);return u.get(S)}return{get:d,update:m,getWireframeAttribute:v}}function pb(o,t,i){let s;function l(y){s=y}let u,h;function d(y){u=y.type,h=y.bytesPerElement}function m(y,M){o.drawElements(s,M,u,y*h),i.update(M,s,1)}function p(y,M,b){b!==0&&(o.drawElementsInstanced(s,M,u,y*h,b),i.update(M,s,b))}function v(y,M,b){if(b===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,u,y,0,b);let x=0;for(let g=0;g<b;g++)x+=M[g];i.update(x,s,1)}function S(y,M,b,R){if(b===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let g=0;g<y.length;g++)p(y[g]/h,M[g],R[g]);else{x.multiDrawElementsInstancedWEBGL(s,M,0,u,y,0,R,0,b);let g=0;for(let I=0;I<b;I++)g+=M[I]*R[I];i.update(g,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v,this.renderMultiDrawInstances=S}function mb(o){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(u,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(u/3);break;case o.LINES:i.lines+=d*(u/2);break;case o.LINE_STRIP:i.lines+=d*(u-1);break;case o.LINE_LOOP:i.lines+=d*u;break;case o.POINTS:i.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function _b(o,t,i){const s=new WeakMap,l=new $e;function u(h,d,m){const p=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,S=v!==void 0?v.length:0;let y=s.get(d);if(y===void 0||y.count!==S){let C=function(){V.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var M=C;y!==void 0&&y.texture.dispose();const b=d.morphAttributes.position!==void 0,R=d.morphAttributes.normal!==void 0,x=d.morphAttributes.color!==void 0,g=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],P=d.morphAttributes.color||[];let L=0;b===!0&&(L=1),R===!0&&(L=2),x===!0&&(L=3);let K=d.attributes.position.count*L,N=1;K>t.maxTextureSize&&(N=Math.ceil(K/t.maxTextureSize),K=t.maxTextureSize);const D=new Float32Array(K*N*4*S),V=new l0(D,K,N,S);V.type=ca,V.needsUpdate=!0;const w=L*4;for(let G=0;G<S;G++){const lt=g[G],rt=I[G],mt=P[G],_t=K*N*4*G;for(let z=0;z<lt.count;z++){const Z=z*w;b===!0&&(l.fromBufferAttribute(lt,z),D[_t+Z+0]=l.x,D[_t+Z+1]=l.y,D[_t+Z+2]=l.z,D[_t+Z+3]=0),R===!0&&(l.fromBufferAttribute(rt,z),D[_t+Z+4]=l.x,D[_t+Z+5]=l.y,D[_t+Z+6]=l.z,D[_t+Z+7]=0),x===!0&&(l.fromBufferAttribute(mt,z),D[_t+Z+8]=l.x,D[_t+Z+9]=l.y,D[_t+Z+10]=l.z,D[_t+Z+11]=mt.itemSize===4?l.w:1)}}y={count:S,texture:V,size:new re(K,N)},s.set(d,y),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let b=0;for(let x=0;x<p.length;x++)b+=p[x];const R=d.morphTargetsRelative?1:1-b;m.getUniforms().setValue(o,"morphTargetBaseInfluence",R),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",y.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",y.size)}return{update:u}}function gb(o,t,i,s){let l=new WeakMap;function u(m){const p=s.render.frame,v=m.geometry,S=t.get(m,v);if(l.get(S)!==p&&(t.update(S),l.set(S,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const y=m.skeleton;l.get(y)!==p&&(y.update(),l.set(y,p))}return S}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:u,dispose:h}}const x0=new qn,Sv=new g0(1,1),M0=new l0,E0=new Vx,T0=new m0,yv=[],xv=[],Mv=new Float32Array(16),Ev=new Float32Array(9),Tv=new Float32Array(4);function Fr(o,t,i){const s=o[0];if(s<=0||s>0)return o;const l=t*i;let u=yv[l];if(u===void 0&&(u=new Float32Array(l),yv[l]=u),t!==0){s.toArray(u,0);for(let h=1,d=0;h!==t;++h)d+=i,o[h].toArray(u,d)}return u}function pn(o,t){if(o.length!==t.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==t[i])return!1;return!0}function mn(o,t){for(let i=0,s=t.length;i<s;i++)o[i]=t[i]}function Xc(o,t){let i=xv[t];i===void 0&&(i=new Int32Array(t),xv[t]=i);for(let s=0;s!==t;++s)i[s]=o.allocateTextureUnit();return i}function vb(o,t){const i=this.cache;i[0]!==t&&(o.uniform1f(this.addr,t),i[0]=t)}function Sb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2fv(this.addr,t),mn(i,t)}}function yb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(pn(i,t))return;o.uniform3fv(this.addr,t),mn(i,t)}}function xb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4fv(this.addr,t),mn(i,t)}}function Mb(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix2fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;Tv.set(s),o.uniformMatrix2fv(this.addr,!1,Tv),mn(i,s)}}function Eb(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix3fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;Ev.set(s),o.uniformMatrix3fv(this.addr,!1,Ev),mn(i,s)}}function Tb(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix4fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;Mv.set(s),o.uniformMatrix4fv(this.addr,!1,Mv),mn(i,s)}}function bb(o,t){const i=this.cache;i[0]!==t&&(o.uniform1i(this.addr,t),i[0]=t)}function Ab(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2iv(this.addr,t),mn(i,t)}}function Rb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(pn(i,t))return;o.uniform3iv(this.addr,t),mn(i,t)}}function Cb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4iv(this.addr,t),mn(i,t)}}function wb(o,t){const i=this.cache;i[0]!==t&&(o.uniform1ui(this.addr,t),i[0]=t)}function Db(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2uiv(this.addr,t),mn(i,t)}}function Ub(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(pn(i,t))return;o.uniform3uiv(this.addr,t),mn(i,t)}}function Lb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4uiv(this.addr,t),mn(i,t)}}function Nb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let u;this.type===o.SAMPLER_2D_SHADOW?(Sv.compareFunction=s0,u=Sv):u=x0,i.setTexture2D(t||u,l)}function Ob(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||E0,l)}function Pb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||T0,l)}function zb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||M0,l)}function Bb(o){switch(o){case 5126:return vb;case 35664:return Sb;case 35665:return yb;case 35666:return xb;case 35674:return Mb;case 35675:return Eb;case 35676:return Tb;case 5124:case 35670:return bb;case 35667:case 35671:return Ab;case 35668:case 35672:return Rb;case 35669:case 35673:return Cb;case 5125:return wb;case 36294:return Db;case 36295:return Ub;case 36296:return Lb;case 35678:case 36198:case 36298:case 36306:case 35682:return Nb;case 35679:case 36299:case 36307:return Ob;case 35680:case 36300:case 36308:case 36293:return Pb;case 36289:case 36303:case 36311:case 36292:return zb}}function Ib(o,t){o.uniform1fv(this.addr,t)}function Fb(o,t){const i=Fr(t,this.size,2);o.uniform2fv(this.addr,i)}function Hb(o,t){const i=Fr(t,this.size,3);o.uniform3fv(this.addr,i)}function Gb(o,t){const i=Fr(t,this.size,4);o.uniform4fv(this.addr,i)}function Vb(o,t){const i=Fr(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function kb(o,t){const i=Fr(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function Xb(o,t){const i=Fr(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function Wb(o,t){o.uniform1iv(this.addr,t)}function qb(o,t){o.uniform2iv(this.addr,t)}function Yb(o,t){o.uniform3iv(this.addr,t)}function jb(o,t){o.uniform4iv(this.addr,t)}function Zb(o,t){o.uniform1uiv(this.addr,t)}function Kb(o,t){o.uniform2uiv(this.addr,t)}function Qb(o,t){o.uniform3uiv(this.addr,t)}function Jb(o,t){o.uniform4uiv(this.addr,t)}function $b(o,t,i){const s=this.cache,l=t.length,u=Xc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||x0,u[h])}function tA(o,t,i){const s=this.cache,l=t.length,u=Xc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||E0,u[h])}function eA(o,t,i){const s=this.cache,l=t.length,u=Xc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||T0,u[h])}function nA(o,t,i){const s=this.cache,l=t.length,u=Xc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||M0,u[h])}function iA(o){switch(o){case 5126:return Ib;case 35664:return Fb;case 35665:return Hb;case 35666:return Gb;case 35674:return Vb;case 35675:return kb;case 35676:return Xb;case 5124:case 35670:return Wb;case 35667:case 35671:return qb;case 35668:case 35672:return Yb;case 35669:case 35673:return jb;case 5125:return Zb;case 36294:return Kb;case 36295:return Qb;case 36296:return Jb;case 35678:case 36198:case 36298:case 36306:case 35682:return $b;case 35679:case 36299:case 36307:return tA;case 35680:case 36300:case 36308:case 36293:return eA;case 36289:case 36303:case 36311:case 36292:return nA}}class aA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=Bb(i.type)}}class sA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=iA(i.type)}}class rA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let u=0,h=l.length;u!==h;++u){const d=l[u];d.setValue(t,i[d.id],s)}}}const Nh=/(\w+)(\])?(\[|\.)?/g;function bv(o,t){o.seq.push(t),o.map[t.id]=t}function oA(o,t,i){const s=o.name,l=s.length;for(Nh.lastIndex=0;;){const u=Nh.exec(s),h=Nh.lastIndex;let d=u[1];const m=u[2]==="]",p=u[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){bv(i,p===void 0?new aA(d,o,t):new sA(d,o,t));break}else{let S=i.map[d];S===void 0&&(S=new rA(d),bv(i,S)),i=S}}}class Oc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const u=t.getActiveUniform(i,l),h=t.getUniformLocation(i,u.name);oA(u,h,this)}}setValue(t,i,s,l){const u=this.map[i];u!==void 0&&u.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let u=0,h=i.length;u!==h;++u){const d=i[u],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,u=t.length;l!==u;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function Av(o,t,i){const s=o.createShader(t);return o.shaderSource(s,i),o.compileShader(s),s}const lA=37297;let cA=0;function uA(o,t){const i=o.split(`
`),s=[],l=Math.max(t-6,0),u=Math.min(t+6,i.length);for(let h=l;h<u;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const Rv=new le;function fA(o){Ce._getMatrix(Rv,Ce.workingColorSpace,o);const t=`mat3( ${Rv.elements.map(i=>i.toFixed(4))} )`;switch(Ce.getTransfer(o)){case Pc:return[t,"LinearTransferOETF"];case Ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function Cv(o,t,i){const s=o.getShaderParameter(t,o.COMPILE_STATUS),l=o.getShaderInfoLog(t).trim();if(s&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const h=parseInt(u[1]);return i.toUpperCase()+`

`+l+`

`+uA(o.getShaderSource(t),h)}else return l}function hA(o,t){const i=fA(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function dA(o,t){let i;switch(t){case dx:i="Linear";break;case px:i="Reinhard";break;case mx:i="Cineon";break;case _x:i="ACESFilmic";break;case vx:i="AgX";break;case Sx:i="Neutral";break;case gx:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const bc=new Q;function pA(){Ce.getLuminanceCoefficients(bc);const o=bc.x.toFixed(4),t=bc.y.toFixed(4),i=bc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mA(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ho).join(`
`)}function _A(o){const t=[];for(const i in o){const s=o[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function gA(o,t){const i={},s=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const u=o.getActiveAttrib(t,l),h=u.name;let d=1;u.type===o.FLOAT_MAT2&&(d=2),u.type===o.FLOAT_MAT3&&(d=3),u.type===o.FLOAT_MAT4&&(d=4),i[h]={type:u.type,location:o.getAttribLocation(t,h),locationSize:d}}return i}function Ho(o){return o!==""}function wv(o,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dv(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const vA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ad(o){return o.replace(vA,yA)}const SA=new Map;function yA(o,t){let i=ce[t];if(i===void 0){const s=SA.get(t);if(s!==void 0)i=ce[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Ad(i)}const xA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uv(o){return o.replace(xA,MA)}function MA(o,t,i,s){let l="";for(let u=parseInt(t);u<parseInt(i);u++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function Lv(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function EA(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Xv?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===Wv?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===ra&&(t="SHADOWMAP_TYPE_VSM"),t}function TA(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Lr:case Nr:t="ENVMAP_TYPE_CUBE";break;case Gc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bA(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Nr:t="ENVMAP_MODE_REFRACTION";break}return t}function AA(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case qv:t="ENVMAP_BLENDING_MULTIPLY";break;case fx:t="ENVMAP_BLENDING_MIX";break;case hx:t="ENVMAP_BLENDING_ADD";break}return t}function RA(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function CA(o,t,i,s){const l=o.getContext(),u=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=EA(i),p=TA(i),v=bA(i),S=AA(i),y=RA(i),M=mA(i),b=_A(u),R=l.createProgram();let x,g,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Ho).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Ho).join(`
`),g.length>0&&(g+=`
`)):(x=[Lv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ho).join(`
`),g=[Lv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+v:"",i.envMap?"#define "+S:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Wa?"#define TONE_MAPPING":"",i.toneMapping!==Wa?ce.tonemapping_pars_fragment:"",i.toneMapping!==Wa?dA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,hA("linearToOutputTexel",i.outputColorSpace),pA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ho).join(`
`)),h=Ad(h),h=wv(h,i),h=Dv(h,i),d=Ad(d),d=wv(d,i),d=Dv(d,i),h=Uv(h),d=Uv(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",i.glslVersion===Bg?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Bg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const P=I+x+h,L=I+g+d,K=Av(l,l.VERTEX_SHADER,P),N=Av(l,l.FRAGMENT_SHADER,L);l.attachShader(R,K),l.attachShader(R,N),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function D(G){if(o.debug.checkShaderErrors){const lt=l.getProgramInfoLog(R).trim(),rt=l.getShaderInfoLog(K).trim(),mt=l.getShaderInfoLog(N).trim();let _t=!0,z=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(_t=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,R,K,N);else{const Z=Cv(l,K,"vertex"),j=Cv(l,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+lt+`
`+Z+`
`+j)}else lt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",lt):(rt===""||mt==="")&&(z=!1);z&&(G.diagnostics={runnable:_t,programLog:lt,vertexShader:{log:rt,prefix:x},fragmentShader:{log:mt,prefix:g}})}l.deleteShader(K),l.deleteShader(N),V=new Oc(l,R),w=gA(l,R)}let V;this.getUniforms=function(){return V===void 0&&D(this),V};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(R,lA)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=cA++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=K,this.fragmentShader=N,this}let wA=0;class DA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),u=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(u)===!1&&(h.add(u),u.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new UA(t),i.set(t,s)),s}}class UA{constructor(t){this.id=wA++,this.code=t,this.usedTimes=0}}function LA(o,t,i,s,l,u,h){const d=new Pd,m=new DA,p=new Set,v=[],S=l.logarithmicDepthBuffer,y=l.vertexTextures;let M=l.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(w){return p.add(w),w===0?"uv":`uv${w}`}function x(w,C,G,lt,rt){const mt=lt.fog,_t=rt.geometry,z=w.isMeshStandardMaterial?lt.environment:null,Z=(w.isMeshStandardMaterial?i:t).get(w.envMap||z),j=Z&&Z.mapping===Gc?Z.image.height:null,xt=b[w.type];w.precision!==null&&(M=l.getMaxPrecision(w.precision),M!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",M,"instead."));const Tt=_t.morphAttributes.position||_t.morphAttributes.normal||_t.morphAttributes.color,O=Tt!==void 0?Tt.length:0;let nt=0;_t.morphAttributes.position!==void 0&&(nt=1),_t.morphAttributes.normal!==void 0&&(nt=2),_t.morphAttributes.color!==void 0&&(nt=3);let yt,Y,ct,Et;if(xt){const Ee=Ni[xt];yt=Ee.vertexShader,Y=Ee.fragmentShader}else yt=w.vertexShader,Y=w.fragmentShader,m.update(w),ct=m.getVertexShaderID(w),Et=m.getFragmentShaderID(w);const St=o.getRenderTarget(),Gt=o.state.buffers.depth.getReversed(),Ft=rt.isInstancedMesh===!0,ne=rt.isBatchedMesh===!0,Ne=!!w.map,he=!!w.matcap,We=!!Z,F=!!w.aoMap,An=!!w.lightMap,fe=!!w.bumpMap,ge=!!w.normalMap,qt=!!w.displacementMap,De=!!w.emissiveMap,Wt=!!w.metalnessMap,U=!!w.roughnessMap,T=w.anisotropy>0,et=w.clearcoat>0,ft=w.dispersion>0,Mt=w.iridescence>0,dt=w.sheen>0,kt=w.transmission>0,Ct=T&&!!w.anisotropyMap,zt=et&&!!w.clearcoatMap,ve=et&&!!w.clearcoatNormalMap,bt=et&&!!w.clearcoatRoughnessMap,Bt=Mt&&!!w.iridescenceMap,Yt=Mt&&!!w.iridescenceThicknessMap,Xt=dt&&!!w.sheenColorMap,Lt=dt&&!!w.sheenRoughnessMap,Jt=!!w.specularMap,ie=!!w.specularColorMap,Oe=!!w.specularIntensityMap,k=kt&&!!w.transmissionMap,At=kt&&!!w.thicknessMap,ot=!!w.gradientMap,gt=!!w.alphaMap,Rt=w.alphaTest>0,wt=!!w.alphaHash,$t=!!w.extensions;let qe=Wa;w.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(qe=o.toneMapping);const un={shaderID:xt,shaderType:w.type,shaderName:w.name,vertexShader:yt,fragmentShader:Y,defines:w.defines,customVertexShaderID:ct,customFragmentShaderID:Et,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:M,batching:ne,batchingColor:ne&&rt._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&rt.instanceColor!==null,instancingMorph:Ft&&rt.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:St===null?o.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:zr,alphaToCoverage:!!w.alphaToCoverage,map:Ne,matcap:he,envMap:We,envMapMode:We&&Z.mapping,envMapCubeUVHeight:j,aoMap:F,lightMap:An,bumpMap:fe,normalMap:ge,displacementMap:y&&qt,emissiveMap:De,normalMapObjectSpace:ge&&w.normalMapType===Ex,normalMapTangentSpace:ge&&w.normalMapType===a0,metalnessMap:Wt,roughnessMap:U,anisotropy:T,anisotropyMap:Ct,clearcoat:et,clearcoatMap:zt,clearcoatNormalMap:ve,clearcoatRoughnessMap:bt,dispersion:ft,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Yt,sheen:dt,sheenColorMap:Xt,sheenRoughnessMap:Lt,specularMap:Jt,specularColorMap:ie,specularIntensityMap:Oe,transmission:kt,transmissionMap:k,thicknessMap:At,gradientMap:ot,opaque:w.transparent===!1&&w.blending===Cr&&w.alphaToCoverage===!1,alphaMap:gt,alphaTest:Rt,alphaHash:wt,combine:w.combine,mapUv:Ne&&R(w.map.channel),aoMapUv:F&&R(w.aoMap.channel),lightMapUv:An&&R(w.lightMap.channel),bumpMapUv:fe&&R(w.bumpMap.channel),normalMapUv:ge&&R(w.normalMap.channel),displacementMapUv:qt&&R(w.displacementMap.channel),emissiveMapUv:De&&R(w.emissiveMap.channel),metalnessMapUv:Wt&&R(w.metalnessMap.channel),roughnessMapUv:U&&R(w.roughnessMap.channel),anisotropyMapUv:Ct&&R(w.anisotropyMap.channel),clearcoatMapUv:zt&&R(w.clearcoatMap.channel),clearcoatNormalMapUv:ve&&R(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&R(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&R(w.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&R(w.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&R(w.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&R(w.sheenRoughnessMap.channel),specularMapUv:Jt&&R(w.specularMap.channel),specularColorMapUv:ie&&R(w.specularColorMap.channel),specularIntensityMapUv:Oe&&R(w.specularIntensityMap.channel),transmissionMapUv:k&&R(w.transmissionMap.channel),thicknessMapUv:At&&R(w.thicknessMap.channel),alphaMapUv:gt&&R(w.alphaMap.channel),vertexTangents:!!_t.attributes.tangent&&(ge||T),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!_t.attributes.color&&_t.attributes.color.itemSize===4,pointsUvs:rt.isPoints===!0&&!!_t.attributes.uv&&(Ne||gt),fog:!!mt,useFog:w.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:S,reverseDepthBuffer:Gt,skinning:rt.isSkinnedMesh===!0,morphTargets:_t.morphAttributes.position!==void 0,morphNormals:_t.morphAttributes.normal!==void 0,morphColors:_t.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:nt,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:w.dithering,shadowMapEnabled:o.shadowMap.enabled&&G.length>0,shadowMapType:o.shadowMap.type,toneMapping:qe,decodeVideoTexture:Ne&&w.map.isVideoTexture===!0&&Ce.getTransfer(w.map.colorSpace)===Ie,decodeVideoTextureEmissive:De&&w.emissiveMap.isVideoTexture===!0&&Ce.getTransfer(w.emissiveMap.colorSpace)===Ie,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===la,flipSided:w.side===Wn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:$t&&w.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&w.extensions.multiDraw===!0||ne)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return un.vertexUv1s=p.has(1),un.vertexUv2s=p.has(2),un.vertexUv3s=p.has(3),p.clear(),un}function g(w){const C=[];if(w.shaderID?C.push(w.shaderID):(C.push(w.customVertexShaderID),C.push(w.customFragmentShaderID)),w.defines!==void 0)for(const G in w.defines)C.push(G),C.push(w.defines[G]);return w.isRawShaderMaterial===!1&&(I(C,w),P(C,w),C.push(o.outputColorSpace)),C.push(w.customProgramCacheKey),C.join()}function I(w,C){w.push(C.precision),w.push(C.outputColorSpace),w.push(C.envMapMode),w.push(C.envMapCubeUVHeight),w.push(C.mapUv),w.push(C.alphaMapUv),w.push(C.lightMapUv),w.push(C.aoMapUv),w.push(C.bumpMapUv),w.push(C.normalMapUv),w.push(C.displacementMapUv),w.push(C.emissiveMapUv),w.push(C.metalnessMapUv),w.push(C.roughnessMapUv),w.push(C.anisotropyMapUv),w.push(C.clearcoatMapUv),w.push(C.clearcoatNormalMapUv),w.push(C.clearcoatRoughnessMapUv),w.push(C.iridescenceMapUv),w.push(C.iridescenceThicknessMapUv),w.push(C.sheenColorMapUv),w.push(C.sheenRoughnessMapUv),w.push(C.specularMapUv),w.push(C.specularColorMapUv),w.push(C.specularIntensityMapUv),w.push(C.transmissionMapUv),w.push(C.thicknessMapUv),w.push(C.combine),w.push(C.fogExp2),w.push(C.sizeAttenuation),w.push(C.morphTargetsCount),w.push(C.morphAttributeCount),w.push(C.numDirLights),w.push(C.numPointLights),w.push(C.numSpotLights),w.push(C.numSpotLightMaps),w.push(C.numHemiLights),w.push(C.numRectAreaLights),w.push(C.numDirLightShadows),w.push(C.numPointLightShadows),w.push(C.numSpotLightShadows),w.push(C.numSpotLightShadowsWithMaps),w.push(C.numLightProbes),w.push(C.shadowMapType),w.push(C.toneMapping),w.push(C.numClippingPlanes),w.push(C.numClipIntersection),w.push(C.depthPacking)}function P(w,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),w.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),w.push(d.mask)}function L(w){const C=b[w.type];let G;if(C){const lt=Ni[C];G=tM.clone(lt.uniforms)}else G=w.uniforms;return G}function K(w,C){let G;for(let lt=0,rt=v.length;lt<rt;lt++){const mt=v[lt];if(mt.cacheKey===C){G=mt,++G.usedTimes;break}}return G===void 0&&(G=new CA(o,C,w,u),v.push(G)),G}function N(w){if(--w.usedTimes===0){const C=v.indexOf(w);v[C]=v[v.length-1],v.pop(),w.destroy()}}function D(w){m.remove(w)}function V(){m.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:L,acquireProgram:K,releaseProgram:N,releaseShaderCache:D,programs:v,dispose:V}}function NA(){let o=new WeakMap;function t(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function u(){o=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:u}}function OA(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function Nv(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Ov(){const o=[];let t=0;const i=[],s=[],l=[];function u(){t=0,i.length=0,s.length=0,l.length=0}function h(S,y,M,b,R,x){let g=o[t];return g===void 0?(g={id:S.id,object:S,geometry:y,material:M,groupOrder:b,renderOrder:S.renderOrder,z:R,group:x},o[t]=g):(g.id=S.id,g.object=S,g.geometry=y,g.material=M,g.groupOrder=b,g.renderOrder=S.renderOrder,g.z=R,g.group=x),t++,g}function d(S,y,M,b,R,x){const g=h(S,y,M,b,R,x);M.transmission>0?s.push(g):M.transparent===!0?l.push(g):i.push(g)}function m(S,y,M,b,R,x){const g=h(S,y,M,b,R,x);M.transmission>0?s.unshift(g):M.transparent===!0?l.unshift(g):i.unshift(g)}function p(S,y){i.length>1&&i.sort(S||OA),s.length>1&&s.sort(y||Nv),l.length>1&&l.sort(y||Nv)}function v(){for(let S=t,y=o.length;S<y;S++){const M=o[S];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:u,push:d,unshift:m,finish:v,sort:p}}function PA(){let o=new WeakMap;function t(s,l){const u=o.get(s);let h;return u===void 0?(h=new Ov,o.set(s,[h])):l>=u.length?(h=new Ov,u.push(h)):h=u[l],h}function i(){o=new WeakMap}return{get:t,dispose:i}}function zA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new Q,color:new ue};break;case"SpotLight":i={position:new Q,direction:new Q,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new Q,color:new ue,distance:0,decay:0};break;case"HemisphereLight":i={direction:new Q,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":i={color:new ue,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return o[t.id]=i,i}}}function BA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=i,i}}}let IA=0;function FA(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function HA(o){const t=new zA,i=BA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new Q);const l=new Q,u=new je,h=new je;function d(p){let v=0,S=0,y=0;for(let w=0;w<9;w++)s.probe[w].set(0,0,0);let M=0,b=0,R=0,x=0,g=0,I=0,P=0,L=0,K=0,N=0,D=0;p.sort(FA);for(let w=0,C=p.length;w<C;w++){const G=p[w],lt=G.color,rt=G.intensity,mt=G.distance,_t=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)v+=lt.r*rt,S+=lt.g*rt,y+=lt.b*rt;else if(G.isLightProbe){for(let z=0;z<9;z++)s.probe[z].addScaledVector(G.sh.coefficients[z],rt);D++}else if(G.isDirectionalLight){const z=t.get(G);if(z.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const Z=G.shadow,j=i.get(G);j.shadowIntensity=Z.intensity,j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,s.directionalShadow[M]=j,s.directionalShadowMap[M]=_t,s.directionalShadowMatrix[M]=G.shadow.matrix,I++}s.directional[M]=z,M++}else if(G.isSpotLight){const z=t.get(G);z.position.setFromMatrixPosition(G.matrixWorld),z.color.copy(lt).multiplyScalar(rt),z.distance=mt,z.coneCos=Math.cos(G.angle),z.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),z.decay=G.decay,s.spot[R]=z;const Z=G.shadow;if(G.map&&(s.spotLightMap[K]=G.map,K++,Z.updateMatrices(G),G.castShadow&&N++),s.spotLightMatrix[R]=Z.matrix,G.castShadow){const j=i.get(G);j.shadowIntensity=Z.intensity,j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,s.spotShadow[R]=j,s.spotShadowMap[R]=_t,L++}R++}else if(G.isRectAreaLight){const z=t.get(G);z.color.copy(lt).multiplyScalar(rt),z.halfWidth.set(G.width*.5,0,0),z.halfHeight.set(0,G.height*.5,0),s.rectArea[x]=z,x++}else if(G.isPointLight){const z=t.get(G);if(z.color.copy(G.color).multiplyScalar(G.intensity),z.distance=G.distance,z.decay=G.decay,G.castShadow){const Z=G.shadow,j=i.get(G);j.shadowIntensity=Z.intensity,j.shadowBias=Z.bias,j.shadowNormalBias=Z.normalBias,j.shadowRadius=Z.radius,j.shadowMapSize=Z.mapSize,j.shadowCameraNear=Z.camera.near,j.shadowCameraFar=Z.camera.far,s.pointShadow[b]=j,s.pointShadowMap[b]=_t,s.pointShadowMatrix[b]=G.shadow.matrix,P++}s.point[b]=z,b++}else if(G.isHemisphereLight){const z=t.get(G);z.skyColor.copy(G.color).multiplyScalar(rt),z.groundColor.copy(G.groundColor).multiplyScalar(rt),s.hemi[g]=z,g++}}x>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ut.LTC_FLOAT_1,s.rectAreaLTC2=Ut.LTC_FLOAT_2):(s.rectAreaLTC1=Ut.LTC_HALF_1,s.rectAreaLTC2=Ut.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=S,s.ambient[2]=y;const V=s.hash;(V.directionalLength!==M||V.pointLength!==b||V.spotLength!==R||V.rectAreaLength!==x||V.hemiLength!==g||V.numDirectionalShadows!==I||V.numPointShadows!==P||V.numSpotShadows!==L||V.numSpotMaps!==K||V.numLightProbes!==D)&&(s.directional.length=M,s.spot.length=R,s.rectArea.length=x,s.point.length=b,s.hemi.length=g,s.directionalShadow.length=I,s.directionalShadowMap.length=I,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=L,s.spotShadowMap.length=L,s.directionalShadowMatrix.length=I,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=L+K-N,s.spotLightMap.length=K,s.numSpotLightShadowsWithMaps=N,s.numLightProbes=D,V.directionalLength=M,V.pointLength=b,V.spotLength=R,V.rectAreaLength=x,V.hemiLength=g,V.numDirectionalShadows=I,V.numPointShadows=P,V.numSpotShadows=L,V.numSpotMaps=K,V.numLightProbes=D,s.version=IA++)}function m(p,v){let S=0,y=0,M=0,b=0,R=0;const x=v.matrixWorldInverse;for(let g=0,I=p.length;g<I;g++){const P=p[g];if(P.isDirectionalLight){const L=s.directional[S];L.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(x),S++}else if(P.isSpotLight){const L=s.spot[M];L.position.setFromMatrixPosition(P.matrixWorld),L.position.applyMatrix4(x),L.direction.setFromMatrixPosition(P.matrixWorld),l.setFromMatrixPosition(P.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(x),M++}else if(P.isRectAreaLight){const L=s.rectArea[b];L.position.setFromMatrixPosition(P.matrixWorld),L.position.applyMatrix4(x),h.identity(),u.copy(P.matrixWorld),u.premultiply(x),h.extractRotation(u),L.halfWidth.set(P.width*.5,0,0),L.halfHeight.set(0,P.height*.5,0),L.halfWidth.applyMatrix4(h),L.halfHeight.applyMatrix4(h),b++}else if(P.isPointLight){const L=s.point[y];L.position.setFromMatrixPosition(P.matrixWorld),L.position.applyMatrix4(x),y++}else if(P.isHemisphereLight){const L=s.hemi[R];L.direction.setFromMatrixPosition(P.matrixWorld),L.direction.transformDirection(x),R++}}}return{setup:d,setupView:m,state:s}}function Pv(o){const t=new HA(o),i=[],s=[];function l(v){p.camera=v,i.length=0,s.length=0}function u(v){i.push(v)}function h(v){s.push(v)}function d(){t.setup(i)}function m(v){t.setupView(i,v)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:u,pushShadow:h}}function GA(o){let t=new WeakMap;function i(l,u=0){const h=t.get(l);let d;return h===void 0?(d=new Pv(o),t.set(l,[d])):u>=h.length?(d=new Pv(o),h.push(d)):d=h[u],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const VA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function XA(o,t,i){let s=new Bd;const l=new re,u=new re,h=new $e,d=new uM({depthPacking:Mx}),m=new fM,p={},v=i.maxTextureSize,S={[qa]:Wn,[Wn]:qa,[la]:la},y=new ja({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:VA,fragmentShader:kA}),M=y.clone();M.defines.HORIZONTAL_PASS=1;const b=new Ai;b.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new di(b,y),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xv;let g=this.type;this.render=function(N,D,V){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||N.length===0)return;const w=o.getRenderTarget(),C=o.getActiveCubeFace(),G=o.getActiveMipmapLevel(),lt=o.state;lt.setBlending(Xa),lt.buffers.color.setClear(1,1,1,1),lt.buffers.depth.setTest(!0),lt.setScissorTest(!1);const rt=g!==ra&&this.type===ra,mt=g===ra&&this.type!==ra;for(let _t=0,z=N.length;_t<z;_t++){const Z=N[_t],j=Z.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;l.copy(j.mapSize);const xt=j.getFrameExtents();if(l.multiply(xt),u.copy(j.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(u.x=Math.floor(v/xt.x),l.x=u.x*xt.x,j.mapSize.x=u.x),l.y>v&&(u.y=Math.floor(v/xt.y),l.y=u.y*xt.y,j.mapSize.y=u.y)),j.map===null||rt===!0||mt===!0){const O=this.type!==ra?{minFilter:Ti,magFilter:Ti}:{};j.map!==null&&j.map.dispose(),j.map=new Rs(l.x,l.y,O),j.map.texture.name=Z.name+".shadowMap",j.camera.updateProjectionMatrix()}o.setRenderTarget(j.map),o.clear();const Tt=j.getViewportCount();for(let O=0;O<Tt;O++){const nt=j.getViewport(O);h.set(u.x*nt.x,u.y*nt.y,u.x*nt.z,u.y*nt.w),lt.viewport(h),j.updateMatrices(Z,O),s=j.getFrustum(),L(D,V,j.camera,Z,this.type)}j.isPointLightShadow!==!0&&this.type===ra&&I(j,V),j.needsUpdate=!1}g=this.type,x.needsUpdate=!1,o.setRenderTarget(w,C,G)};function I(N,D){const V=t.update(R);y.defines.VSM_SAMPLES!==N.blurSamples&&(y.defines.VSM_SAMPLES=N.blurSamples,M.defines.VSM_SAMPLES=N.blurSamples,y.needsUpdate=!0,M.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new Rs(l.x,l.y)),y.uniforms.shadow_pass.value=N.map.texture,y.uniforms.resolution.value=N.mapSize,y.uniforms.radius.value=N.radius,o.setRenderTarget(N.mapPass),o.clear(),o.renderBufferDirect(D,null,V,y,R,null),M.uniforms.shadow_pass.value=N.mapPass.texture,M.uniforms.resolution.value=N.mapSize,M.uniforms.radius.value=N.radius,o.setRenderTarget(N.map),o.clear(),o.renderBufferDirect(D,null,V,M,R,null)}function P(N,D,V,w){let C=null;const G=V.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(G!==void 0)C=G;else if(C=V.isPointLight===!0?m:d,o.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const lt=C.uuid,rt=D.uuid;let mt=p[lt];mt===void 0&&(mt={},p[lt]=mt);let _t=mt[rt];_t===void 0&&(_t=C.clone(),mt[rt]=_t,D.addEventListener("dispose",K)),C=_t}if(C.visible=D.visible,C.wireframe=D.wireframe,w===ra?C.side=D.shadowSide!==null?D.shadowSide:D.side:C.side=D.shadowSide!==null?D.shadowSide:S[D.side],C.alphaMap=D.alphaMap,C.alphaTest=D.alphaTest,C.map=D.map,C.clipShadows=D.clipShadows,C.clippingPlanes=D.clippingPlanes,C.clipIntersection=D.clipIntersection,C.displacementMap=D.displacementMap,C.displacementScale=D.displacementScale,C.displacementBias=D.displacementBias,C.wireframeLinewidth=D.wireframeLinewidth,C.linewidth=D.linewidth,V.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const lt=o.properties.get(C);lt.light=V}return C}function L(N,D,V,w,C){if(N.visible===!1)return;if(N.layers.test(D.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&C===ra)&&(!N.frustumCulled||s.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,N.matrixWorld);const rt=t.update(N),mt=N.material;if(Array.isArray(mt)){const _t=rt.groups;for(let z=0,Z=_t.length;z<Z;z++){const j=_t[z],xt=mt[j.materialIndex];if(xt&&xt.visible){const Tt=P(N,xt,w,C);N.onBeforeShadow(o,N,D,V,rt,Tt,j),o.renderBufferDirect(V,null,rt,Tt,N,j),N.onAfterShadow(o,N,D,V,rt,Tt,j)}}}else if(mt.visible){const _t=P(N,mt,w,C);N.onBeforeShadow(o,N,D,V,rt,_t,null),o.renderBufferDirect(V,null,rt,_t,N,null),N.onAfterShadow(o,N,D,V,rt,_t,null)}}const lt=N.children;for(let rt=0,mt=lt.length;rt<mt;rt++)L(lt[rt],D,V,w,C)}function K(N){N.target.removeEventListener("dispose",K);for(const V in p){const w=p[V],C=N.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}const WA={[Gh]:Vh,[kh]:qh,[Xh]:Yh,[Ur]:Wh,[Vh]:Gh,[qh]:kh,[Yh]:Xh,[Wh]:Ur};function qA(o,t){function i(){let k=!1;const At=new $e;let ot=null;const gt=new $e(0,0,0,0);return{setMask:function(Rt){ot!==Rt&&!k&&(o.colorMask(Rt,Rt,Rt,Rt),ot=Rt)},setLocked:function(Rt){k=Rt},setClear:function(Rt,wt,$t,qe,un){un===!0&&(Rt*=qe,wt*=qe,$t*=qe),At.set(Rt,wt,$t,qe),gt.equals(At)===!1&&(o.clearColor(Rt,wt,$t,qe),gt.copy(At))},reset:function(){k=!1,ot=null,gt.set(-1,0,0,0)}}}function s(){let k=!1,At=!1,ot=null,gt=null,Rt=null;return{setReversed:function(wt){if(At!==wt){const $t=t.get("EXT_clip_control");At?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const qe=Rt;Rt=null,this.setClear(qe)}At=wt},getReversed:function(){return At},setTest:function(wt){wt?St(o.DEPTH_TEST):Gt(o.DEPTH_TEST)},setMask:function(wt){ot!==wt&&!k&&(o.depthMask(wt),ot=wt)},setFunc:function(wt){if(At&&(wt=WA[wt]),gt!==wt){switch(wt){case Gh:o.depthFunc(o.NEVER);break;case Vh:o.depthFunc(o.ALWAYS);break;case kh:o.depthFunc(o.LESS);break;case Ur:o.depthFunc(o.LEQUAL);break;case Xh:o.depthFunc(o.EQUAL);break;case Wh:o.depthFunc(o.GEQUAL);break;case qh:o.depthFunc(o.GREATER);break;case Yh:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}gt=wt}},setLocked:function(wt){k=wt},setClear:function(wt){Rt!==wt&&(At&&(wt=1-wt),o.clearDepth(wt),Rt=wt)},reset:function(){k=!1,ot=null,gt=null,Rt=null,At=!1}}}function l(){let k=!1,At=null,ot=null,gt=null,Rt=null,wt=null,$t=null,qe=null,un=null;return{setTest:function(Ee){k||(Ee?St(o.STENCIL_TEST):Gt(o.STENCIL_TEST))},setMask:function(Ee){At!==Ee&&!k&&(o.stencilMask(Ee),At=Ee)},setFunc:function(Ee,yn,pi){(ot!==Ee||gt!==yn||Rt!==pi)&&(o.stencilFunc(Ee,yn,pi),ot=Ee,gt=yn,Rt=pi)},setOp:function(Ee,yn,pi){(wt!==Ee||$t!==yn||qe!==pi)&&(o.stencilOp(Ee,yn,pi),wt=Ee,$t=yn,qe=pi)},setLocked:function(Ee){k=Ee},setClear:function(Ee){un!==Ee&&(o.clearStencil(Ee),un=Ee)},reset:function(){k=!1,At=null,ot=null,gt=null,Rt=null,wt=null,$t=null,qe=null,un=null}}}const u=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let v={},S={},y=new WeakMap,M=[],b=null,R=!1,x=null,g=null,I=null,P=null,L=null,K=null,N=null,D=new ue(0,0,0),V=0,w=!1,C=null,G=null,lt=null,rt=null,mt=null;const _t=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Z=0;const j=o.getParameter(o.VERSION);j.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(j)[1]),z=Z>=1):j.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),z=Z>=2);let xt=null,Tt={};const O=o.getParameter(o.SCISSOR_BOX),nt=o.getParameter(o.VIEWPORT),yt=new $e().fromArray(O),Y=new $e().fromArray(nt);function ct(k,At,ot,gt){const Rt=new Uint8Array(4),wt=o.createTexture();o.bindTexture(k,wt),o.texParameteri(k,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(k,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let $t=0;$t<ot;$t++)k===o.TEXTURE_3D||k===o.TEXTURE_2D_ARRAY?o.texImage3D(At,0,o.RGBA,1,1,gt,0,o.RGBA,o.UNSIGNED_BYTE,Rt):o.texImage2D(At+$t,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Rt);return wt}const Et={};Et[o.TEXTURE_2D]=ct(o.TEXTURE_2D,o.TEXTURE_2D,1),Et[o.TEXTURE_CUBE_MAP]=ct(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[o.TEXTURE_2D_ARRAY]=ct(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Et[o.TEXTURE_3D]=ct(o.TEXTURE_3D,o.TEXTURE_3D,1,1),u.setClear(0,0,0,1),h.setClear(1),d.setClear(0),St(o.DEPTH_TEST),h.setFunc(Ur),fe(!1),ge(Ug),St(o.CULL_FACE),F(Xa);function St(k){v[k]!==!0&&(o.enable(k),v[k]=!0)}function Gt(k){v[k]!==!1&&(o.disable(k),v[k]=!1)}function Ft(k,At){return S[k]!==At?(o.bindFramebuffer(k,At),S[k]=At,k===o.DRAW_FRAMEBUFFER&&(S[o.FRAMEBUFFER]=At),k===o.FRAMEBUFFER&&(S[o.DRAW_FRAMEBUFFER]=At),!0):!1}function ne(k,At){let ot=M,gt=!1;if(k){ot=y.get(At),ot===void 0&&(ot=[],y.set(At,ot));const Rt=k.textures;if(ot.length!==Rt.length||ot[0]!==o.COLOR_ATTACHMENT0){for(let wt=0,$t=Rt.length;wt<$t;wt++)ot[wt]=o.COLOR_ATTACHMENT0+wt;ot.length=Rt.length,gt=!0}}else ot[0]!==o.BACK&&(ot[0]=o.BACK,gt=!0);gt&&o.drawBuffers(ot)}function Ne(k){return b!==k?(o.useProgram(k),b=k,!0):!1}const he={[Ms]:o.FUNC_ADD,[jy]:o.FUNC_SUBTRACT,[Zy]:o.FUNC_REVERSE_SUBTRACT};he[Ky]=o.MIN,he[Qy]=o.MAX;const We={[Jy]:o.ZERO,[$y]:o.ONE,[tx]:o.SRC_COLOR,[Fh]:o.SRC_ALPHA,[rx]:o.SRC_ALPHA_SATURATE,[ax]:o.DST_COLOR,[nx]:o.DST_ALPHA,[ex]:o.ONE_MINUS_SRC_COLOR,[Hh]:o.ONE_MINUS_SRC_ALPHA,[sx]:o.ONE_MINUS_DST_COLOR,[ix]:o.ONE_MINUS_DST_ALPHA,[ox]:o.CONSTANT_COLOR,[lx]:o.ONE_MINUS_CONSTANT_COLOR,[cx]:o.CONSTANT_ALPHA,[ux]:o.ONE_MINUS_CONSTANT_ALPHA};function F(k,At,ot,gt,Rt,wt,$t,qe,un,Ee){if(k===Xa){R===!0&&(Gt(o.BLEND),R=!1);return}if(R===!1&&(St(o.BLEND),R=!0),k!==Yy){if(k!==x||Ee!==w){if((g!==Ms||L!==Ms)&&(o.blendEquation(o.FUNC_ADD),g=Ms,L=Ms),Ee)switch(k){case Cr:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Lg:o.blendFunc(o.ONE,o.ONE);break;case Ng:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Og:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Cr:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Lg:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Ng:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Og:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}I=null,P=null,K=null,N=null,D.set(0,0,0),V=0,x=k,w=Ee}return}Rt=Rt||At,wt=wt||ot,$t=$t||gt,(At!==g||Rt!==L)&&(o.blendEquationSeparate(he[At],he[Rt]),g=At,L=Rt),(ot!==I||gt!==P||wt!==K||$t!==N)&&(o.blendFuncSeparate(We[ot],We[gt],We[wt],We[$t]),I=ot,P=gt,K=wt,N=$t),(qe.equals(D)===!1||un!==V)&&(o.blendColor(qe.r,qe.g,qe.b,un),D.copy(qe),V=un),x=k,w=!1}function An(k,At){k.side===la?Gt(o.CULL_FACE):St(o.CULL_FACE);let ot=k.side===Wn;At&&(ot=!ot),fe(ot),k.blending===Cr&&k.transparent===!1?F(Xa):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),u.setMask(k.colorWrite);const gt=k.stencilWrite;d.setTest(gt),gt&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),De(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?St(o.SAMPLE_ALPHA_TO_COVERAGE):Gt(o.SAMPLE_ALPHA_TO_COVERAGE)}function fe(k){C!==k&&(k?o.frontFace(o.CW):o.frontFace(o.CCW),C=k)}function ge(k){k!==Wy?(St(o.CULL_FACE),k!==G&&(k===Ug?o.cullFace(o.BACK):k===qy?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Gt(o.CULL_FACE),G=k}function qt(k){k!==lt&&(z&&o.lineWidth(k),lt=k)}function De(k,At,ot){k?(St(o.POLYGON_OFFSET_FILL),(rt!==At||mt!==ot)&&(o.polygonOffset(At,ot),rt=At,mt=ot)):Gt(o.POLYGON_OFFSET_FILL)}function Wt(k){k?St(o.SCISSOR_TEST):Gt(o.SCISSOR_TEST)}function U(k){k===void 0&&(k=o.TEXTURE0+_t-1),xt!==k&&(o.activeTexture(k),xt=k)}function T(k,At,ot){ot===void 0&&(xt===null?ot=o.TEXTURE0+_t-1:ot=xt);let gt=Tt[ot];gt===void 0&&(gt={type:void 0,texture:void 0},Tt[ot]=gt),(gt.type!==k||gt.texture!==At)&&(xt!==ot&&(o.activeTexture(ot),xt=ot),o.bindTexture(k,At||Et[k]),gt.type=k,gt.texture=At)}function et(){const k=Tt[xt];k!==void 0&&k.type!==void 0&&(o.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ft(){try{o.compressedTexImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function dt(){try{o.texSubImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{o.texSubImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ve(){try{o.texStorage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{o.texStorage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{o.texImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Yt(){try{o.texImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xt(k){yt.equals(k)===!1&&(o.scissor(k.x,k.y,k.z,k.w),yt.copy(k))}function Lt(k){Y.equals(k)===!1&&(o.viewport(k.x,k.y,k.z,k.w),Y.copy(k))}function Jt(k,At){let ot=p.get(At);ot===void 0&&(ot=new WeakMap,p.set(At,ot));let gt=ot.get(k);gt===void 0&&(gt=o.getUniformBlockIndex(At,k.name),ot.set(k,gt))}function ie(k,At){const gt=p.get(At).get(k);m.get(At)!==gt&&(o.uniformBlockBinding(At,gt,k.__bindingPointIndex),m.set(At,gt))}function Oe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),v={},xt=null,Tt={},S={},y=new WeakMap,M=[],b=null,R=!1,x=null,g=null,I=null,P=null,L=null,K=null,N=null,D=new ue(0,0,0),V=0,w=!1,C=null,G=null,lt=null,rt=null,mt=null,yt.set(0,0,o.canvas.width,o.canvas.height),Y.set(0,0,o.canvas.width,o.canvas.height),u.reset(),h.reset(),d.reset()}return{buffers:{color:u,depth:h,stencil:d},enable:St,disable:Gt,bindFramebuffer:Ft,drawBuffers:ne,useProgram:Ne,setBlending:F,setMaterial:An,setFlipSided:fe,setCullFace:ge,setLineWidth:qt,setPolygonOffset:De,setScissorTest:Wt,activeTexture:U,bindTexture:T,unbindTexture:et,compressedTexImage2D:ft,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Yt,updateUBOMapping:Jt,uniformBlockBinding:ie,texStorage2D:ve,texStorage3D:bt,texSubImage2D:dt,texSubImage3D:kt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:zt,scissor:Xt,viewport:Lt,reset:Oe}}function YA(o,t,i,s,l,u,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new re,v=new WeakMap;let S;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(U,T){return M?new OffscreenCanvas(U,T):Bc("canvas")}function R(U,T,et){let ft=1;const Mt=Wt(U);if((Mt.width>et||Mt.height>et)&&(ft=et/Math.max(Mt.width,Mt.height)),ft<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const dt=Math.floor(ft*Mt.width),kt=Math.floor(ft*Mt.height);S===void 0&&(S=b(dt,kt));const Ct=T?b(dt,kt):S;return Ct.width=dt,Ct.height=kt,Ct.getContext("2d").drawImage(U,0,0,dt,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+dt+"x"+kt+")."),Ct}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),U;return U}function x(U){return U.generateMipmaps}function g(U){o.generateMipmap(U)}function I(U){return U.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?o.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function P(U,T,et,ft,Mt=!1){if(U!==null){if(o[U]!==void 0)return o[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let dt=T;if(T===o.RED&&(et===o.FLOAT&&(dt=o.R32F),et===o.HALF_FLOAT&&(dt=o.R16F),et===o.UNSIGNED_BYTE&&(dt=o.R8)),T===o.RED_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.R8UI),et===o.UNSIGNED_SHORT&&(dt=o.R16UI),et===o.UNSIGNED_INT&&(dt=o.R32UI),et===o.BYTE&&(dt=o.R8I),et===o.SHORT&&(dt=o.R16I),et===o.INT&&(dt=o.R32I)),T===o.RG&&(et===o.FLOAT&&(dt=o.RG32F),et===o.HALF_FLOAT&&(dt=o.RG16F),et===o.UNSIGNED_BYTE&&(dt=o.RG8)),T===o.RG_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.RG8UI),et===o.UNSIGNED_SHORT&&(dt=o.RG16UI),et===o.UNSIGNED_INT&&(dt=o.RG32UI),et===o.BYTE&&(dt=o.RG8I),et===o.SHORT&&(dt=o.RG16I),et===o.INT&&(dt=o.RG32I)),T===o.RGB_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.RGB8UI),et===o.UNSIGNED_SHORT&&(dt=o.RGB16UI),et===o.UNSIGNED_INT&&(dt=o.RGB32UI),et===o.BYTE&&(dt=o.RGB8I),et===o.SHORT&&(dt=o.RGB16I),et===o.INT&&(dt=o.RGB32I)),T===o.RGBA_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.RGBA8UI),et===o.UNSIGNED_SHORT&&(dt=o.RGBA16UI),et===o.UNSIGNED_INT&&(dt=o.RGBA32UI),et===o.BYTE&&(dt=o.RGBA8I),et===o.SHORT&&(dt=o.RGBA16I),et===o.INT&&(dt=o.RGBA32I)),T===o.RGB&&et===o.UNSIGNED_INT_5_9_9_9_REV&&(dt=o.RGB9_E5),T===o.RGBA){const kt=Mt?Pc:Ce.getTransfer(ft);et===o.FLOAT&&(dt=o.RGBA32F),et===o.HALF_FLOAT&&(dt=o.RGBA16F),et===o.UNSIGNED_BYTE&&(dt=kt===Ie?o.SRGB8_ALPHA8:o.RGBA8),et===o.UNSIGNED_SHORT_4_4_4_4&&(dt=o.RGBA4),et===o.UNSIGNED_SHORT_5_5_5_1&&(dt=o.RGB5_A1)}return(dt===o.R16F||dt===o.R32F||dt===o.RG16F||dt===o.RG32F||dt===o.RGBA16F||dt===o.RGBA32F)&&t.get("EXT_color_buffer_float"),dt}function L(U,T){let et;return U?T===null||T===As||T===Or?et=o.DEPTH24_STENCIL8:T===ca?et=o.DEPTH32F_STENCIL8:T===Go&&(et=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===As||T===Or?et=o.DEPTH_COMPONENT24:T===ca?et=o.DEPTH_COMPONENT32F:T===Go&&(et=o.DEPTH_COMPONENT16),et}function K(U,T){return x(U)===!0||U.isFramebufferTexture&&U.minFilter!==Ti&&U.minFilter!==Oi?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function N(U){const T=U.target;T.removeEventListener("dispose",N),V(T),T.isVideoTexture&&v.delete(T)}function D(U){const T=U.target;T.removeEventListener("dispose",D),C(T)}function V(U){const T=s.get(U);if(T.__webglInit===void 0)return;const et=U.source,ft=y.get(et);if(ft){const Mt=ft[T.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&w(U),Object.keys(ft).length===0&&y.delete(et)}s.remove(U)}function w(U){const T=s.get(U);o.deleteTexture(T.__webglTexture);const et=U.source,ft=y.get(et);delete ft[T.__cacheKey],h.memory.textures--}function C(U){const T=s.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),s.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(T.__webglFramebuffer[ft]))for(let Mt=0;Mt<T.__webglFramebuffer[ft].length;Mt++)o.deleteFramebuffer(T.__webglFramebuffer[ft][Mt]);else o.deleteFramebuffer(T.__webglFramebuffer[ft]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[ft])}else{if(Array.isArray(T.__webglFramebuffer))for(let ft=0;ft<T.__webglFramebuffer.length;ft++)o.deleteFramebuffer(T.__webglFramebuffer[ft]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ft=0;ft<T.__webglColorRenderbuffer.length;ft++)T.__webglColorRenderbuffer[ft]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[ft]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const et=U.textures;for(let ft=0,Mt=et.length;ft<Mt;ft++){const dt=s.get(et[ft]);dt.__webglTexture&&(o.deleteTexture(dt.__webglTexture),h.memory.textures--),s.remove(et[ft])}s.remove(U)}let G=0;function lt(){G=0}function rt(){const U=G;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),G+=1,U}function mt(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function _t(U,T){const et=s.get(U);if(U.isVideoTexture&&qt(U),U.isRenderTargetTexture===!1&&U.version>0&&et.__version!==U.version){const ft=U.image;if(ft===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(et,U,T);return}}i.bindTexture(o.TEXTURE_2D,et.__webglTexture,o.TEXTURE0+T)}function z(U,T){const et=s.get(U);if(U.version>0&&et.__version!==U.version){Y(et,U,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,et.__webglTexture,o.TEXTURE0+T)}function Z(U,T){const et=s.get(U);if(U.version>0&&et.__version!==U.version){Y(et,U,T);return}i.bindTexture(o.TEXTURE_3D,et.__webglTexture,o.TEXTURE0+T)}function j(U,T){const et=s.get(U);if(U.version>0&&et.__version!==U.version){ct(et,U,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,et.__webglTexture,o.TEXTURE0+T)}const xt={[Kh]:o.REPEAT,[Ts]:o.CLAMP_TO_EDGE,[Qh]:o.MIRRORED_REPEAT},Tt={[Ti]:o.NEAREST,[yx]:o.NEAREST_MIPMAP_NEAREST,[ec]:o.NEAREST_MIPMAP_LINEAR,[Oi]:o.LINEAR,[ah]:o.LINEAR_MIPMAP_NEAREST,[bs]:o.LINEAR_MIPMAP_LINEAR},O={[Tx]:o.NEVER,[Dx]:o.ALWAYS,[bx]:o.LESS,[s0]:o.LEQUAL,[Ax]:o.EQUAL,[wx]:o.GEQUAL,[Rx]:o.GREATER,[Cx]:o.NOTEQUAL};function nt(U,T){if(T.type===ca&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Oi||T.magFilter===ah||T.magFilter===ec||T.magFilter===bs||T.minFilter===Oi||T.minFilter===ah||T.minFilter===ec||T.minFilter===bs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(U,o.TEXTURE_WRAP_S,xt[T.wrapS]),o.texParameteri(U,o.TEXTURE_WRAP_T,xt[T.wrapT]),(U===o.TEXTURE_3D||U===o.TEXTURE_2D_ARRAY)&&o.texParameteri(U,o.TEXTURE_WRAP_R,xt[T.wrapR]),o.texParameteri(U,o.TEXTURE_MAG_FILTER,Tt[T.magFilter]),o.texParameteri(U,o.TEXTURE_MIN_FILTER,Tt[T.minFilter]),T.compareFunction&&(o.texParameteri(U,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(U,o.TEXTURE_COMPARE_FUNC,O[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ti||T.minFilter!==ec&&T.minFilter!==bs||T.type===ca&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const et=t.get("EXT_texture_filter_anisotropic");o.texParameterf(U,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function yt(U,T){let et=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",N));const ft=T.source;let Mt=y.get(ft);Mt===void 0&&(Mt={},y.set(ft,Mt));const dt=mt(T);if(dt!==U.__cacheKey){Mt[dt]===void 0&&(Mt[dt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,et=!0),Mt[dt].usedTimes++;const kt=Mt[U.__cacheKey];kt!==void 0&&(Mt[U.__cacheKey].usedTimes--,kt.usedTimes===0&&w(T)),U.__cacheKey=dt,U.__webglTexture=Mt[dt].texture}return et}function Y(U,T,et){let ft=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ft=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ft=o.TEXTURE_3D);const Mt=yt(U,T),dt=T.source;i.bindTexture(ft,U.__webglTexture,o.TEXTURE0+et);const kt=s.get(dt);if(dt.version!==kt.__version||Mt===!0){i.activeTexture(o.TEXTURE0+et);const Ct=Ce.getPrimaries(Ce.workingColorSpace),zt=T.colorSpace===ka?null:Ce.getPrimaries(T.colorSpace),ve=T.colorSpace===ka||Ct===zt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let bt=R(T.image,!1,l.maxTextureSize);bt=De(T,bt);const Bt=u.convert(T.format,T.colorSpace),Yt=u.convert(T.type);let Xt=P(T.internalFormat,Bt,Yt,T.colorSpace,T.isVideoTexture);nt(ft,T);let Lt;const Jt=T.mipmaps,ie=T.isVideoTexture!==!0,Oe=kt.__version===void 0||Mt===!0,k=dt.dataReady,At=K(T,bt);if(T.isDepthTexture)Xt=L(T.format===Pr,T.type),Oe&&(ie?i.texStorage2D(o.TEXTURE_2D,1,Xt,bt.width,bt.height):i.texImage2D(o.TEXTURE_2D,0,Xt,bt.width,bt.height,0,Bt,Yt,null));else if(T.isDataTexture)if(Jt.length>0){ie&&Oe&&i.texStorage2D(o.TEXTURE_2D,At,Xt,Jt[0].width,Jt[0].height);for(let ot=0,gt=Jt.length;ot<gt;ot++)Lt=Jt[ot],ie?k&&i.texSubImage2D(o.TEXTURE_2D,ot,0,0,Lt.width,Lt.height,Bt,Yt,Lt.data):i.texImage2D(o.TEXTURE_2D,ot,Xt,Lt.width,Lt.height,0,Bt,Yt,Lt.data);T.generateMipmaps=!1}else ie?(Oe&&i.texStorage2D(o.TEXTURE_2D,At,Xt,bt.width,bt.height),k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,bt.width,bt.height,Bt,Yt,bt.data)):i.texImage2D(o.TEXTURE_2D,0,Xt,bt.width,bt.height,0,Bt,Yt,bt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ie&&Oe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,Xt,Jt[0].width,Jt[0].height,bt.depth);for(let ot=0,gt=Jt.length;ot<gt;ot++)if(Lt=Jt[ot],T.format!==Ei)if(Bt!==null)if(ie){if(k)if(T.layerUpdates.size>0){const Rt=fv(Lt.width,Lt.height,T.format,T.type);for(const wt of T.layerUpdates){const $t=Lt.data.subarray(wt*Rt/Lt.data.BYTES_PER_ELEMENT,(wt+1)*Rt/Lt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ot,0,0,wt,Lt.width,Lt.height,1,Bt,$t)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ot,0,0,0,Lt.width,Lt.height,bt.depth,Bt,Lt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ot,Xt,Lt.width,Lt.height,bt.depth,0,Lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?k&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,ot,0,0,0,Lt.width,Lt.height,bt.depth,Bt,Yt,Lt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,ot,Xt,Lt.width,Lt.height,bt.depth,0,Bt,Yt,Lt.data)}else{ie&&Oe&&i.texStorage2D(o.TEXTURE_2D,At,Xt,Jt[0].width,Jt[0].height);for(let ot=0,gt=Jt.length;ot<gt;ot++)Lt=Jt[ot],T.format!==Ei?Bt!==null?ie?k&&i.compressedTexSubImage2D(o.TEXTURE_2D,ot,0,0,Lt.width,Lt.height,Bt,Lt.data):i.compressedTexImage2D(o.TEXTURE_2D,ot,Xt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?k&&i.texSubImage2D(o.TEXTURE_2D,ot,0,0,Lt.width,Lt.height,Bt,Yt,Lt.data):i.texImage2D(o.TEXTURE_2D,ot,Xt,Lt.width,Lt.height,0,Bt,Yt,Lt.data)}else if(T.isDataArrayTexture)if(ie){if(Oe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,Xt,bt.width,bt.height,bt.depth),k)if(T.layerUpdates.size>0){const ot=fv(bt.width,bt.height,T.format,T.type);for(const gt of T.layerUpdates){const Rt=bt.data.subarray(gt*ot/bt.data.BYTES_PER_ELEMENT,(gt+1)*ot/bt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,gt,bt.width,bt.height,1,Bt,Yt,Rt)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,bt.width,bt.height,bt.depth,Bt,Yt,bt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Xt,bt.width,bt.height,bt.depth,0,Bt,Yt,bt.data);else if(T.isData3DTexture)ie?(Oe&&i.texStorage3D(o.TEXTURE_3D,At,Xt,bt.width,bt.height,bt.depth),k&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,bt.width,bt.height,bt.depth,Bt,Yt,bt.data)):i.texImage3D(o.TEXTURE_3D,0,Xt,bt.width,bt.height,bt.depth,0,Bt,Yt,bt.data);else if(T.isFramebufferTexture){if(Oe)if(ie)i.texStorage2D(o.TEXTURE_2D,At,Xt,bt.width,bt.height);else{let ot=bt.width,gt=bt.height;for(let Rt=0;Rt<At;Rt++)i.texImage2D(o.TEXTURE_2D,Rt,Xt,ot,gt,0,Bt,Yt,null),ot>>=1,gt>>=1}}else if(Jt.length>0){if(ie&&Oe){const ot=Wt(Jt[0]);i.texStorage2D(o.TEXTURE_2D,At,Xt,ot.width,ot.height)}for(let ot=0,gt=Jt.length;ot<gt;ot++)Lt=Jt[ot],ie?k&&i.texSubImage2D(o.TEXTURE_2D,ot,0,0,Bt,Yt,Lt):i.texImage2D(o.TEXTURE_2D,ot,Xt,Bt,Yt,Lt);T.generateMipmaps=!1}else if(ie){if(Oe){const ot=Wt(bt);i.texStorage2D(o.TEXTURE_2D,At,Xt,ot.width,ot.height)}k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Bt,Yt,bt)}else i.texImage2D(o.TEXTURE_2D,0,Xt,Bt,Yt,bt);x(T)&&g(ft),kt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function ct(U,T,et){if(T.image.length!==6)return;const ft=yt(U,T),Mt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,U.__webglTexture,o.TEXTURE0+et);const dt=s.get(Mt);if(Mt.version!==dt.__version||ft===!0){i.activeTexture(o.TEXTURE0+et);const kt=Ce.getPrimaries(Ce.workingColorSpace),Ct=T.colorSpace===ka?null:Ce.getPrimaries(T.colorSpace),zt=T.colorSpace===ka||kt===Ct?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const ve=T.isCompressedTexture||T.image[0].isCompressedTexture,bt=T.image[0]&&T.image[0].isDataTexture,Bt=[];for(let gt=0;gt<6;gt++)!ve&&!bt?Bt[gt]=R(T.image[gt],!0,l.maxCubemapSize):Bt[gt]=bt?T.image[gt].image:T.image[gt],Bt[gt]=De(T,Bt[gt]);const Yt=Bt[0],Xt=u.convert(T.format,T.colorSpace),Lt=u.convert(T.type),Jt=P(T.internalFormat,Xt,Lt,T.colorSpace),ie=T.isVideoTexture!==!0,Oe=dt.__version===void 0||ft===!0,k=Mt.dataReady;let At=K(T,Yt);nt(o.TEXTURE_CUBE_MAP,T);let ot;if(ve){ie&&Oe&&i.texStorage2D(o.TEXTURE_CUBE_MAP,At,Jt,Yt.width,Yt.height);for(let gt=0;gt<6;gt++){ot=Bt[gt].mipmaps;for(let Rt=0;Rt<ot.length;Rt++){const wt=ot[Rt];T.format!==Ei?Xt!==null?ie?k&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt,0,0,wt.width,wt.height,Xt,wt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt,Jt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ie?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt,0,0,wt.width,wt.height,Xt,Lt,wt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt,Jt,wt.width,wt.height,0,Xt,Lt,wt.data)}}}else{if(ot=T.mipmaps,ie&&Oe){ot.length>0&&At++;const gt=Wt(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,At,Jt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(bt){ie?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Bt[gt].width,Bt[gt].height,Xt,Lt,Bt[gt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Jt,Bt[gt].width,Bt[gt].height,0,Xt,Lt,Bt[gt].data);for(let Rt=0;Rt<ot.length;Rt++){const $t=ot[Rt].image[gt].image;ie?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt+1,0,0,$t.width,$t.height,Xt,Lt,$t.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt+1,Jt,$t.width,$t.height,0,Xt,Lt,$t.data)}}else{ie?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Xt,Lt,Bt[gt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Jt,Xt,Lt,Bt[gt]);for(let Rt=0;Rt<ot.length;Rt++){const wt=ot[Rt];ie?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt+1,0,0,Xt,Lt,wt.image[gt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Rt+1,Jt,Xt,Lt,wt.image[gt])}}}x(T)&&g(o.TEXTURE_CUBE_MAP),dt.__version=Mt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function Et(U,T,et,ft,Mt,dt){const kt=u.convert(et.format,et.colorSpace),Ct=u.convert(et.type),zt=P(et.internalFormat,kt,Ct,et.colorSpace),ve=s.get(T),bt=s.get(et);if(bt.__renderTarget=T,!ve.__hasExternalTextures){const Bt=Math.max(1,T.width>>dt),Yt=Math.max(1,T.height>>dt);Mt===o.TEXTURE_3D||Mt===o.TEXTURE_2D_ARRAY?i.texImage3D(Mt,dt,zt,Bt,Yt,T.depth,0,kt,Ct,null):i.texImage2D(Mt,dt,zt,Bt,Yt,0,kt,Ct,null)}i.bindFramebuffer(o.FRAMEBUFFER,U),ge(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ft,Mt,bt.__webglTexture,0,fe(T)):(Mt===o.TEXTURE_2D||Mt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ft,Mt,bt.__webglTexture,dt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function St(U,T,et){if(o.bindRenderbuffer(o.RENDERBUFFER,U),T.depthBuffer){const ft=T.depthTexture,Mt=ft&&ft.isDepthTexture?ft.type:null,dt=L(T.stencilBuffer,Mt),kt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ct=fe(T);ge(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ct,dt,T.width,T.height):et?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ct,dt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,dt,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,kt,o.RENDERBUFFER,U)}else{const ft=T.textures;for(let Mt=0;Mt<ft.length;Mt++){const dt=ft[Mt],kt=u.convert(dt.format,dt.colorSpace),Ct=u.convert(dt.type),zt=P(dt.internalFormat,kt,Ct,dt.colorSpace),ve=fe(T);et&&ge(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,ve,zt,T.width,T.height):ge(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ve,zt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,zt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Gt(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ft=s.get(T.depthTexture);ft.__renderTarget=T,(!ft.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),_t(T.depthTexture,0);const Mt=ft.__webglTexture,dt=fe(T);if(T.depthTexture.format===wr)ge(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0);else if(T.depthTexture.format===Pr)ge(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Ft(U){const T=s.get(U),et=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const ft=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ft){const Mt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ft.removeEventListener("dispose",Mt)};ft.addEventListener("dispose",Mt),T.__depthDisposeCallback=Mt}T.__boundDepthTexture=ft}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(et)throw new Error("target.depthTexture not supported in Cube render targets");Gt(T.__webglFramebuffer,U)}else if(et){T.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[ft]),T.__webglDepthbuffer[ft]===void 0)T.__webglDepthbuffer[ft]=o.createRenderbuffer(),St(T.__webglDepthbuffer[ft],U,!1);else{const Mt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,dt=T.__webglDepthbuffer[ft];o.bindRenderbuffer(o.RENDERBUFFER,dt),o.framebufferRenderbuffer(o.FRAMEBUFFER,Mt,o.RENDERBUFFER,dt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),St(T.__webglDepthbuffer,U,!1);else{const ft=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Mt=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Mt),o.framebufferRenderbuffer(o.FRAMEBUFFER,ft,o.RENDERBUFFER,Mt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function ne(U,T,et){const ft=s.get(U);T!==void 0&&Et(ft.__webglFramebuffer,U,U.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),et!==void 0&&Ft(U)}function Ne(U){const T=U.texture,et=s.get(U),ft=s.get(T);U.addEventListener("dispose",D);const Mt=U.textures,dt=U.isWebGLCubeRenderTarget===!0,kt=Mt.length>1;if(kt||(ft.__webglTexture===void 0&&(ft.__webglTexture=o.createTexture()),ft.__version=T.version,h.memory.textures++),dt){et.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(T.mipmaps&&T.mipmaps.length>0){et.__webglFramebuffer[Ct]=[];for(let zt=0;zt<T.mipmaps.length;zt++)et.__webglFramebuffer[Ct][zt]=o.createFramebuffer()}else et.__webglFramebuffer[Ct]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){et.__webglFramebuffer=[];for(let Ct=0;Ct<T.mipmaps.length;Ct++)et.__webglFramebuffer[Ct]=o.createFramebuffer()}else et.__webglFramebuffer=o.createFramebuffer();if(kt)for(let Ct=0,zt=Mt.length;Ct<zt;Ct++){const ve=s.get(Mt[Ct]);ve.__webglTexture===void 0&&(ve.__webglTexture=o.createTexture(),h.memory.textures++)}if(U.samples>0&&ge(U)===!1){et.__webglMultisampledFramebuffer=o.createFramebuffer(),et.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,et.__webglMultisampledFramebuffer);for(let Ct=0;Ct<Mt.length;Ct++){const zt=Mt[Ct];et.__webglColorRenderbuffer[Ct]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,et.__webglColorRenderbuffer[Ct]);const ve=u.convert(zt.format,zt.colorSpace),bt=u.convert(zt.type),Bt=P(zt.internalFormat,ve,bt,zt.colorSpace,U.isXRRenderTarget===!0),Yt=fe(U);o.renderbufferStorageMultisample(o.RENDERBUFFER,Yt,Bt,U.width,U.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.RENDERBUFFER,et.__webglColorRenderbuffer[Ct])}o.bindRenderbuffer(o.RENDERBUFFER,null),U.depthBuffer&&(et.__webglDepthRenderbuffer=o.createRenderbuffer(),St(et.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(dt){i.bindTexture(o.TEXTURE_CUBE_MAP,ft.__webglTexture),nt(o.TEXTURE_CUBE_MAP,T);for(let Ct=0;Ct<6;Ct++)if(T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Et(et.__webglFramebuffer[Ct][zt],U,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,zt);else Et(et.__webglFramebuffer[Ct],U,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);x(T)&&g(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(kt){for(let Ct=0,zt=Mt.length;Ct<zt;Ct++){const ve=Mt[Ct],bt=s.get(ve);i.bindTexture(o.TEXTURE_2D,bt.__webglTexture),nt(o.TEXTURE_2D,ve),Et(et.__webglFramebuffer,U,ve,o.COLOR_ATTACHMENT0+Ct,o.TEXTURE_2D,0),x(ve)&&g(o.TEXTURE_2D)}i.unbindTexture()}else{let Ct=o.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Ct=U.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ct,ft.__webglTexture),nt(Ct,T),T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Et(et.__webglFramebuffer[zt],U,T,o.COLOR_ATTACHMENT0,Ct,zt);else Et(et.__webglFramebuffer,U,T,o.COLOR_ATTACHMENT0,Ct,0);x(T)&&g(Ct),i.unbindTexture()}U.depthBuffer&&Ft(U)}function he(U){const T=U.textures;for(let et=0,ft=T.length;et<ft;et++){const Mt=T[et];if(x(Mt)){const dt=I(U),kt=s.get(Mt).__webglTexture;i.bindTexture(dt,kt),g(dt),i.unbindTexture()}}}const We=[],F=[];function An(U){if(U.samples>0){if(ge(U)===!1){const T=U.textures,et=U.width,ft=U.height;let Mt=o.COLOR_BUFFER_BIT;const dt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,kt=s.get(U),Ct=T.length>1;if(Ct)for(let zt=0;zt<T.length;zt++)i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let zt=0;zt<T.length;zt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Mt|=o.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Mt|=o.STENCIL_BUFFER_BIT)),Ct){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const ve=s.get(T[zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ve,0)}o.blitFramebuffer(0,0,et,ft,0,0,et,ft,Mt,o.NEAREST),m===!0&&(We.length=0,F.length=0,We.push(o.COLOR_ATTACHMENT0+zt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(We.push(dt),F.push(dt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,F)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,We))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ct)for(let zt=0;zt<T.length;zt++){i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const ve=s.get(T[zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,ve,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const T=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function fe(U){return Math.min(l.maxSamples,U.samples)}function ge(U){const T=s.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function qt(U){const T=h.render.frame;v.get(U)!==T&&(v.set(U,T),U.update())}function De(U,T){const et=U.colorSpace,ft=U.format,Mt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||et!==zr&&et!==ka&&(Ce.getTransfer(et)===Ie?(ft!==Ei||Mt!==da)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",et)),T}function Wt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=rt,this.resetTextureUnits=lt,this.setTexture2D=_t,this.setTexture2DArray=z,this.setTexture3D=Z,this.setTextureCube=j,this.rebindTextures=ne,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=An,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ge}function jA(o,t){function i(s,l=ka){let u;const h=Ce.getTransfer(l);if(s===da)return o.UNSIGNED_BYTE;if(s===Dd)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Ud)return o.UNSIGNED_SHORT_5_5_5_1;if(s===Kv)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===jv)return o.BYTE;if(s===Zv)return o.SHORT;if(s===Go)return o.UNSIGNED_SHORT;if(s===wd)return o.INT;if(s===As)return o.UNSIGNED_INT;if(s===ca)return o.FLOAT;if(s===Vo)return o.HALF_FLOAT;if(s===Qv)return o.ALPHA;if(s===Jv)return o.RGB;if(s===Ei)return o.RGBA;if(s===$v)return o.LUMINANCE;if(s===t0)return o.LUMINANCE_ALPHA;if(s===wr)return o.DEPTH_COMPONENT;if(s===Pr)return o.DEPTH_STENCIL;if(s===e0)return o.RED;if(s===Ld)return o.RED_INTEGER;if(s===n0)return o.RG;if(s===Nd)return o.RG_INTEGER;if(s===Od)return o.RGBA_INTEGER;if(s===Cc||s===wc||s===Dc||s===Uc)if(h===Ie)if(u=t.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(s===Cc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===wc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Dc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Uc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=t.get("WEBGL_compressed_texture_s3tc"),u!==null){if(s===Cc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===wc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Dc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Uc)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Jh||s===$h||s===td||s===ed)if(u=t.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(s===Jh)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$h)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===td)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ed)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===nd||s===id||s===ad)if(u=t.get("WEBGL_compressed_texture_etc"),u!==null){if(s===nd||s===id)return h===Ie?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(s===ad)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===sd||s===rd||s===od||s===ld||s===cd||s===ud||s===fd||s===hd||s===dd||s===pd||s===md||s===_d||s===gd||s===vd)if(u=t.get("WEBGL_compressed_texture_astc"),u!==null){if(s===sd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===rd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===od)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===ld)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===cd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ud)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===fd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===hd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===dd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===pd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===md)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===_d)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===gd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===vd)return h===Ie?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Lc||s===Sd||s===yd)if(u=t.get("EXT_texture_compression_bptc"),u!==null){if(s===Lc)return h===Ie?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Sd)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===yd)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===i0||s===xd||s===Md||s===Ed)if(u=t.get("EXT_texture_compression_rgtc"),u!==null){if(s===Lc)return u.COMPRESSED_RED_RGTC1_EXT;if(s===xd)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Md)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ed)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Or?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const ZA={type:"move"};class Oh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,u=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const R of t.hand.values()){const x=i.getJointPose(R,s),g=this._getHandJoint(p,R);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const v=p.joints["index-finger-tip"],S=p.joints["thumb-tip"],y=v.position.distanceTo(S.position),M=.02,b=.005;p.inputState.pinching&&y>M+b?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&y<=M-b&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(u=i.getPose(t.gripSpace,s),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&u!==null&&(l=u),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(ZA)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new xc;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const KA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,QA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class JA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new qn,u=t.properties.get(l);u.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new ja({vertexShader:KA,fragmentShader:QA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new di(new Xo(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $A extends Cs{constructor(t,i){super();const s=this;let l=null,u=1,h=null,d="local-floor",m=1,p=null,v=null,S=null,y=null,M=null,b=null;const R=new JA,x=i.getContextAttributes();let g=null,I=null;const P=[],L=[],K=new re;let N=null;const D=new hi;D.viewport=new $e;const V=new hi;V.viewport=new $e;const w=[D,V],C=new _M;let G=null,lt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ct=P[Y];return ct===void 0&&(ct=new Oh,P[Y]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Y){let ct=P[Y];return ct===void 0&&(ct=new Oh,P[Y]=ct),ct.getGripSpace()},this.getHand=function(Y){let ct=P[Y];return ct===void 0&&(ct=new Oh,P[Y]=ct),ct.getHandSpace()};function rt(Y){const ct=L.indexOf(Y.inputSource);if(ct===-1)return;const Et=P[ct];Et!==void 0&&(Et.update(Y.inputSource,Y.frame,p||h),Et.dispatchEvent({type:Y.type,data:Y.inputSource}))}function mt(){l.removeEventListener("select",rt),l.removeEventListener("selectstart",rt),l.removeEventListener("selectend",rt),l.removeEventListener("squeeze",rt),l.removeEventListener("squeezestart",rt),l.removeEventListener("squeezeend",rt),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",_t);for(let Y=0;Y<P.length;Y++){const ct=L[Y];ct!==null&&(L[Y]=null,P[Y].disconnect(ct))}G=null,lt=null,R.reset(),t.setRenderTarget(g),M=null,y=null,S=null,l=null,I=null,yt.stop(),s.isPresenting=!1,t.setPixelRatio(N),t.setSize(K.width,K.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){u=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){d=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(Y){p=Y},this.getBaseLayer=function(){return y!==null?y:M},this.getBinding=function(){return S},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(Y){if(l=Y,l!==null){if(g=t.getRenderTarget(),l.addEventListener("select",rt),l.addEventListener("selectstart",rt),l.addEventListener("selectend",rt),l.addEventListener("squeeze",rt),l.addEventListener("squeezestart",rt),l.addEventListener("squeezeend",rt),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",_t),x.xrCompatible!==!0&&await i.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(K),l.renderState.layers===void 0){const ct={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,ct),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new Rs(M.framebufferWidth,M.framebufferHeight,{format:Ei,type:da,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let ct=null,Et=null,St=null;x.depth&&(St=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ct=x.stencil?Pr:wr,Et=x.stencil?Or:As);const Gt={colorFormat:i.RGBA8,depthFormat:St,scaleFactor:u};S=new XRWebGLBinding(l,i),y=S.createProjectionLayer(Gt),l.updateRenderState({layers:[y]}),t.setPixelRatio(1),t.setSize(y.textureWidth,y.textureHeight,!1),I=new Rs(y.textureWidth,y.textureHeight,{format:Ei,type:da,depthTexture:new g0(y.textureWidth,y.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),yt.setContext(l),yt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return R.getDepthTexture()};function _t(Y){for(let ct=0;ct<Y.removed.length;ct++){const Et=Y.removed[ct],St=L.indexOf(Et);St>=0&&(L[St]=null,P[St].disconnect(Et))}for(let ct=0;ct<Y.added.length;ct++){const Et=Y.added[ct];let St=L.indexOf(Et);if(St===-1){for(let Ft=0;Ft<P.length;Ft++)if(Ft>=L.length){L.push(Et),St=Ft;break}else if(L[Ft]===null){L[Ft]=Et,St=Ft;break}if(St===-1)break}const Gt=P[St];Gt&&Gt.connect(Et)}}const z=new Q,Z=new Q;function j(Y,ct,Et){z.setFromMatrixPosition(ct.matrixWorld),Z.setFromMatrixPosition(Et.matrixWorld);const St=z.distanceTo(Z),Gt=ct.projectionMatrix.elements,Ft=Et.projectionMatrix.elements,ne=Gt[14]/(Gt[10]-1),Ne=Gt[14]/(Gt[10]+1),he=(Gt[9]+1)/Gt[5],We=(Gt[9]-1)/Gt[5],F=(Gt[8]-1)/Gt[0],An=(Ft[8]+1)/Ft[0],fe=ne*F,ge=ne*An,qt=St/(-F+An),De=qt*-F;if(ct.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(De),Y.translateZ(qt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Gt[10]===-1)Y.projectionMatrix.copy(ct.projectionMatrix),Y.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{const Wt=ne+qt,U=Ne+qt,T=fe-De,et=ge+(St-De),ft=he*Ne/U*Wt,Mt=We*Ne/U*Wt;Y.projectionMatrix.makePerspective(T,et,ft,Mt,Wt,U),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function xt(Y,ct){ct===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ct.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(l===null)return;let ct=Y.near,Et=Y.far;R.texture!==null&&(R.depthNear>0&&(ct=R.depthNear),R.depthFar>0&&(Et=R.depthFar)),C.near=V.near=D.near=ct,C.far=V.far=D.far=Et,(G!==C.near||lt!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),G=C.near,lt=C.far),D.layers.mask=Y.layers.mask|2,V.layers.mask=Y.layers.mask|4,C.layers.mask=D.layers.mask|V.layers.mask;const St=Y.parent,Gt=C.cameras;xt(C,St);for(let Ft=0;Ft<Gt.length;Ft++)xt(Gt[Ft],St);Gt.length===2?j(C,D,V):C.projectionMatrix.copy(D.projectionMatrix),Tt(Y,C,St)};function Tt(Y,ct,Et){Et===null?Y.matrix.copy(ct.matrixWorld):(Y.matrix.copy(Et.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ct.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ct.projectionMatrix),Y.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Td*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(y===null&&M===null))return m},this.setFoveation=function(Y){m=Y,y!==null&&(y.fixedFoveation=Y),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Y)},this.hasDepthSensing=function(){return R.texture!==null},this.getDepthSensingMesh=function(){return R.getMesh(C)};let O=null;function nt(Y,ct){if(v=ct.getViewerPose(p||h),b=ct,v!==null){const Et=v.views;M!==null&&(t.setRenderTargetFramebuffer(I,M.framebuffer),t.setRenderTarget(I));let St=!1;Et.length!==C.cameras.length&&(C.cameras.length=0,St=!0);for(let Ft=0;Ft<Et.length;Ft++){const ne=Et[Ft];let Ne=null;if(M!==null)Ne=M.getViewport(ne);else{const We=S.getViewSubImage(y,ne);Ne=We.viewport,Ft===0&&(t.setRenderTargetTextures(I,We.colorTexture,y.ignoreDepthValues?void 0:We.depthStencilTexture),t.setRenderTarget(I))}let he=w[Ft];he===void 0&&(he=new hi,he.layers.enable(Ft),he.viewport=new $e,w[Ft]=he),he.matrix.fromArray(ne.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(ne.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),Ft===0&&(C.matrix.copy(he.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),St===!0&&C.cameras.push(he)}const Gt=l.enabledFeatures;if(Gt&&Gt.includes("depth-sensing")){const Ft=S.getDepthInformation(Et[0]);Ft&&Ft.isValid&&Ft.texture&&R.init(t,Ft,l.renderState)}}for(let Et=0;Et<P.length;Et++){const St=L[Et],Gt=P[Et];St!==null&&Gt!==void 0&&Gt.update(St,ct,p||h)}O&&O(Y,ct),ct.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ct}),b=null}const yt=new y0;yt.setAnimationLoop(nt),this.setAnimationLoop=function(Y){O=Y},this.dispose=function(){}}}const ys=new Pi,t1=new je;function e1(o,t){function i(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function s(x,g){g.color.getRGB(x.fogColor.value,d0(o)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function l(x,g,I,P,L){g.isMeshBasicMaterial||g.isMeshLambertMaterial?u(x,g):g.isMeshToonMaterial?(u(x,g),S(x,g)):g.isMeshPhongMaterial?(u(x,g),v(x,g)):g.isMeshStandardMaterial?(u(x,g),y(x,g),g.isMeshPhysicalMaterial&&M(x,g,L)):g.isMeshMatcapMaterial?(u(x,g),b(x,g)):g.isMeshDepthMaterial?u(x,g):g.isMeshDistanceMaterial?(u(x,g),R(x,g)):g.isMeshNormalMaterial?u(x,g):g.isLineBasicMaterial?(h(x,g),g.isLineDashedMaterial&&d(x,g)):g.isPointsMaterial?m(x,g,I,P):g.isSpriteMaterial?p(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function u(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,i(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,i(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,i(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===Wn&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,i(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===Wn&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,i(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,i(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,i(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const I=t.get(g),P=I.envMap,L=I.envMapRotation;P&&(x.envMap.value=P,ys.copy(L),ys.x*=-1,ys.y*=-1,ys.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),x.envMapRotation.value.setFromMatrix4(t1.makeRotationFromEuler(ys)),x.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,i(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,i(g.aoMap,x.aoMapTransform))}function h(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,i(g.map,x.mapTransform))}function d(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function m(x,g,I,P){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*I,x.scale.value=P*.5,g.map&&(x.map.value=g.map,i(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,i(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function p(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,i(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,i(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function v(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function S(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function y(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,i(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,i(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function M(x,g,I){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,i(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,i(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,i(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,i(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,i(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Wn&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,i(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,i(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=I.texture,x.transmissionSamplerSize.value.set(I.width,I.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,i(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,i(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,i(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,i(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,i(g.specularIntensityMap,x.specularIntensityMapTransform))}function b(x,g){g.matcap&&(x.matcap.value=g.matcap)}function R(x,g){const I=t.get(g).light;x.referencePosition.value.setFromMatrixPosition(I.matrixWorld),x.nearDistance.value=I.shadow.camera.near,x.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function n1(o,t,i,s){let l={},u={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,P){const L=P.program;s.uniformBlockBinding(I,L)}function p(I,P){let L=l[I.id];L===void 0&&(b(I),L=v(I),l[I.id]=L,I.addEventListener("dispose",x));const K=P.program;s.updateUBOMapping(I,K);const N=t.render.frame;u[I.id]!==N&&(y(I),u[I.id]=N)}function v(I){const P=S();I.__bindingPointIndex=P;const L=o.createBuffer(),K=I.__size,N=I.usage;return o.bindBuffer(o.UNIFORM_BUFFER,L),o.bufferData(o.UNIFORM_BUFFER,K,N),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,P,L),L}function S(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(I){const P=l[I.id],L=I.uniforms,K=I.__cache;o.bindBuffer(o.UNIFORM_BUFFER,P);for(let N=0,D=L.length;N<D;N++){const V=Array.isArray(L[N])?L[N]:[L[N]];for(let w=0,C=V.length;w<C;w++){const G=V[w];if(M(G,N,w,K)===!0){const lt=G.__offset,rt=Array.isArray(G.value)?G.value:[G.value];let mt=0;for(let _t=0;_t<rt.length;_t++){const z=rt[_t],Z=R(z);typeof z=="number"||typeof z=="boolean"?(G.__data[0]=z,o.bufferSubData(o.UNIFORM_BUFFER,lt+mt,G.__data)):z.isMatrix3?(G.__data[0]=z.elements[0],G.__data[1]=z.elements[1],G.__data[2]=z.elements[2],G.__data[3]=0,G.__data[4]=z.elements[3],G.__data[5]=z.elements[4],G.__data[6]=z.elements[5],G.__data[7]=0,G.__data[8]=z.elements[6],G.__data[9]=z.elements[7],G.__data[10]=z.elements[8],G.__data[11]=0):(z.toArray(G.__data,mt),mt+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,lt,G.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(I,P,L,K){const N=I.value,D=P+"_"+L;if(K[D]===void 0)return typeof N=="number"||typeof N=="boolean"?K[D]=N:K[D]=N.clone(),!0;{const V=K[D];if(typeof N=="number"||typeof N=="boolean"){if(V!==N)return K[D]=N,!0}else if(V.equals(N)===!1)return V.copy(N),!0}return!1}function b(I){const P=I.uniforms;let L=0;const K=16;for(let D=0,V=P.length;D<V;D++){const w=Array.isArray(P[D])?P[D]:[P[D]];for(let C=0,G=w.length;C<G;C++){const lt=w[C],rt=Array.isArray(lt.value)?lt.value:[lt.value];for(let mt=0,_t=rt.length;mt<_t;mt++){const z=rt[mt],Z=R(z),j=L%K,xt=j%Z.boundary,Tt=j+xt;L+=xt,Tt!==0&&K-Tt<Z.storage&&(L+=K-Tt),lt.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),lt.__offset=L,L+=Z.storage}}}const N=L%K;return N>0&&(L+=K-N),I.__size=L,I.__cache={},this}function R(I){const P={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(P.boundary=4,P.storage=4):I.isVector2?(P.boundary=8,P.storage=8):I.isVector3||I.isColor?(P.boundary=16,P.storage=12):I.isVector4?(P.boundary=16,P.storage=16):I.isMatrix3?(P.boundary=48,P.storage=48):I.isMatrix4?(P.boundary=64,P.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),P}function x(I){const P=I.target;P.removeEventListener("dispose",x);const L=h.indexOf(P.__bindingPointIndex);h.splice(L,1),o.deleteBuffer(l[P.id]),delete l[P.id],delete u[P.id]}function g(){for(const I in l)o.deleteBuffer(l[I]);h=[],l={},u={}}return{bind:m,update:p,dispose:g}}class i1{constructor(t={}){const{canvas:i=Nx(),context:s=null,depth:l=!0,stencil:u=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:S=!1,reverseDepthBuffer:y=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const b=new Uint32Array(4),R=new Int32Array(4);let x=null,g=null;const I=[],P=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fi,this.toneMapping=Wa,this.toneMappingExposure=1;const L=this;let K=!1,N=0,D=0,V=null,w=-1,C=null;const G=new $e,lt=new $e;let rt=null;const mt=new ue(0);let _t=0,z=i.width,Z=i.height,j=1,xt=null,Tt=null;const O=new $e(0,0,z,Z),nt=new $e(0,0,z,Z);let yt=!1;const Y=new Bd;let ct=!1,Et=!1;const St=new je,Gt=new je,Ft=new Q,ne=new $e,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function We(){return V===null?j:1}let F=s;function An(A,X){return i.getContext(A,X)}try{const A={alpha:!0,depth:l,stencil:u,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:S};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Cd}`),i.addEventListener("webglcontextlost",gt,!1),i.addEventListener("webglcontextrestored",Rt,!1),i.addEventListener("webglcontextcreationerror",wt,!1),F===null){const X="webgl2";if(F=An(X,A),F===null)throw An(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let fe,ge,qt,De,Wt,U,T,et,ft,Mt,dt,kt,Ct,zt,ve,bt,Bt,Yt,Xt,Lt,Jt,ie,Oe,k;function At(){fe=new hb(F),fe.init(),ie=new jA(F,fe),ge=new rb(F,fe,t,ie),qt=new qA(F,fe),ge.reverseDepthBuffer&&y&&qt.buffers.depth.setReversed(!0),De=new mb(F),Wt=new NA,U=new YA(F,fe,qt,Wt,ge,ie,De),T=new lb(L),et=new fb(L),ft=new MM(F),Oe=new ab(F,ft),Mt=new db(F,ft,De,Oe),dt=new gb(F,Mt,ft,De),Xt=new _b(F,ge,U),bt=new ob(Wt),kt=new LA(L,T,et,fe,ge,Oe,bt),Ct=new e1(L,Wt),zt=new PA,ve=new GA(fe),Yt=new ib(L,T,et,qt,dt,M,m),Bt=new XA(L,dt,ge),k=new n1(F,De,ge,qt),Lt=new sb(F,fe,De),Jt=new pb(F,fe,De),De.programs=kt.programs,L.capabilities=ge,L.extensions=fe,L.properties=Wt,L.renderLists=zt,L.shadowMap=Bt,L.state=qt,L.info=De}At();const ot=new $A(L,F);this.xr=ot,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=fe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=fe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(z,Z,!1))},this.getSize=function(A){return A.set(z,Z)},this.setSize=function(A,X,it=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=A,Z=X,i.width=Math.floor(A*j),i.height=Math.floor(X*j),it===!0&&(i.style.width=A+"px",i.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(z*j,Z*j).floor()},this.setDrawingBufferSize=function(A,X,it){z=A,Z=X,j=it,i.width=Math.floor(A*it),i.height=Math.floor(X*it),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(G)},this.getViewport=function(A){return A.copy(O)},this.setViewport=function(A,X,it,at){A.isVector4?O.set(A.x,A.y,A.z,A.w):O.set(A,X,it,at),qt.viewport(G.copy(O).multiplyScalar(j).round())},this.getScissor=function(A){return A.copy(nt)},this.setScissor=function(A,X,it,at){A.isVector4?nt.set(A.x,A.y,A.z,A.w):nt.set(A,X,it,at),qt.scissor(lt.copy(nt).multiplyScalar(j).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(A){qt.setScissorTest(yt=A)},this.setOpaqueSort=function(A){xt=A},this.setTransparentSort=function(A){Tt=A},this.getClearColor=function(A){return A.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(A=!0,X=!0,it=!0){let at=0;if(A){let W=!1;if(V!==null){const vt=V.texture.format;W=vt===Od||vt===Nd||vt===Ld}if(W){const vt=V.texture.type,Dt=vt===da||vt===As||vt===Go||vt===Or||vt===Dd||vt===Ud,Ot=Yt.getClearColor(),Nt=Yt.getClearAlpha(),Kt=Ot.r,te=Ot.g,jt=Ot.b;Dt?(b[0]=Kt,b[1]=te,b[2]=jt,b[3]=Nt,F.clearBufferuiv(F.COLOR,0,b)):(R[0]=Kt,R[1]=te,R[2]=jt,R[3]=Nt,F.clearBufferiv(F.COLOR,0,R))}else at|=F.COLOR_BUFFER_BIT}X&&(at|=F.DEPTH_BUFFER_BIT),it&&(at|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",gt,!1),i.removeEventListener("webglcontextrestored",Rt,!1),i.removeEventListener("webglcontextcreationerror",wt,!1),Yt.dispose(),zt.dispose(),ve.dispose(),Wt.dispose(),T.dispose(),et.dispose(),dt.dispose(),Oe.dispose(),k.dispose(),kt.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Hr),ot.removeEventListener("sessionend",Gr),Ri.stop()};function gt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),K=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),K=!1;const A=De.autoReset,X=Bt.enabled,it=Bt.autoUpdate,at=Bt.needsUpdate,W=Bt.type;At(),De.autoReset=A,Bt.enabled=X,Bt.autoUpdate=it,Bt.needsUpdate=at,Bt.type=W}function wt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function $t(A){const X=A.target;X.removeEventListener("dispose",$t),qe(X)}function qe(A){un(A),Wt.remove(A)}function un(A){const X=Wt.get(A).programs;X!==void 0&&(X.forEach(function(it){kt.releaseProgram(it)}),A.isShaderMaterial&&kt.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,it,at,W,vt){X===null&&(X=Ne);const Dt=W.isMesh&&W.matrixWorld.determinant()<0,Ot=kr(A,X,it,at,W);qt.setMaterial(at,Dt);let Nt=it.index,Kt=1;if(at.wireframe===!0){if(Nt=Mt.getWireframeAttribute(it),Nt===void 0)return;Kt=2}const te=it.drawRange,jt=it.attributes.position;let Se=te.start*Kt,Te=(te.start+te.count)*Kt;vt!==null&&(Se=Math.max(Se,vt.start*Kt),Te=Math.min(Te,(vt.start+vt.count)*Kt)),Nt!==null?(Se=Math.max(Se,0),Te=Math.min(Te,Nt.count)):jt!=null&&(Se=Math.max(Se,0),Te=Math.min(Te,jt.count));const Ve=Te-Se;if(Ve<0||Ve===1/0)return;Oe.setup(W,at,Ot,it,Nt);let He,ae=Lt;if(Nt!==null&&(He=ft.get(Nt),ae=Jt,ae.setIndex(He)),W.isMesh)at.wireframe===!0?(qt.setLineWidth(at.wireframeLinewidth*We()),ae.setMode(F.LINES)):ae.setMode(F.TRIANGLES);else if(W.isLine){let Ht=at.linewidth;Ht===void 0&&(Ht=1),qt.setLineWidth(Ht*We()),W.isLineSegments?ae.setMode(F.LINES):W.isLineLoop?ae.setMode(F.LINE_LOOP):ae.setMode(F.LINE_STRIP)}else W.isPoints?ae.setMode(F.POINTS):W.isSprite&&ae.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ae.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))ae.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Ht=W._multiDrawStarts,an=W._multiDrawCounts,be=W._multiDrawCount,Un=Nt?ft.get(Nt).bytesPerElement:1,Bi=Wt.get(at).currentProgram.getUniforms();for(let _n=0;_n<be;_n++)Bi.setValue(F,"_gl_DrawID",_n),ae.render(Ht[_n]/Un,an[_n])}else if(W.isInstancedMesh)ae.renderInstances(Se,Ve,W.count);else if(it.isInstancedBufferGeometry){const Ht=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,an=Math.min(it.instanceCount,Ht);ae.renderInstances(Se,Ve,an)}else ae.render(Se,Ve)};function Ee(A,X,it){A.transparent===!0&&A.side===la&&A.forceSinglePass===!1?(A.side=Wn,A.needsUpdate=!0,Ke(A,X,it),A.side=qa,A.needsUpdate=!0,Ke(A,X,it),A.side=la):Ke(A,X,it)}this.compile=function(A,X,it=null){it===null&&(it=A),g=ve.get(it),g.init(X),P.push(g),it.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(g.pushLight(W),W.castShadow&&g.pushShadow(W))}),A!==it&&A.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(g.pushLight(W),W.castShadow&&g.pushShadow(W))}),g.setupLights();const at=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const vt=W.material;if(vt)if(Array.isArray(vt))for(let Dt=0;Dt<vt.length;Dt++){const Ot=vt[Dt];Ee(Ot,it,W),at.add(Ot)}else Ee(vt,it,W),at.add(vt)}),P.pop(),g=null,at},this.compileAsync=function(A,X,it=null){const at=this.compile(A,X,it);return new Promise(W=>{function vt(){if(at.forEach(function(Dt){Wt.get(Dt).currentProgram.isReady()&&at.delete(Dt)}),at.size===0){W(A);return}setTimeout(vt,10)}fe.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let yn=null;function pi(A){yn&&yn(A)}function Hr(){Ri.stop()}function Gr(){Ri.start()}const Ri=new y0;Ri.setAnimationLoop(pi),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(A){yn=A,ot.setAnimationLoop(A),A===null?Ri.stop():Ri.start()},ot.addEventListener("sessionstart",Hr),ot.addEventListener("sessionend",Gr),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(K===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(X),X=ot.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,X,V),g=ve.get(A,P.length),g.init(X),P.push(g),Gt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Y.setFromProjectionMatrix(Gt),Et=this.localClippingEnabled,ct=bt.init(this.clippingPlanes,Et),x=zt.get(A,I.length),x.init(),I.push(x),ot.enabled===!0&&ot.isPresenting===!0){const vt=L.xr.getDepthSensingMesh();vt!==null&&Za(vt,X,-1/0,L.sortObjects)}Za(A,X,0,L.sortObjects),x.finish(),L.sortObjects===!0&&x.sort(xt,Tt),he=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,he&&Yt.addToRenderList(x,A),this.info.render.frame++,ct===!0&&bt.beginShadows();const it=g.state.shadowsArray;Bt.render(it,A,X),ct===!0&&bt.endShadows(),this.info.autoReset===!0&&this.info.reset();const at=x.opaque,W=x.transmissive;if(g.setupLights(),X.isArrayCamera){const vt=X.cameras;if(W.length>0)for(let Dt=0,Ot=vt.length;Dt<Ot;Dt++){const Nt=vt[Dt];Vr(at,W,A,Nt)}he&&Yt.render(A);for(let Dt=0,Ot=vt.length;Dt<Ot;Dt++){const Nt=vt[Dt];Ds(x,A,Nt,Nt.viewport)}}else W.length>0&&Vr(at,W,A,X),he&&Yt.render(A),Ds(x,A,X);V!==null&&(U.updateMultisampleRenderTarget(V),U.updateRenderTargetMipmap(V)),A.isScene===!0&&A.onAfterRender(L,A,X),Oe.resetDefaultState(),w=-1,C=null,P.pop(),P.length>0?(g=P[P.length-1],ct===!0&&bt.setGlobalState(L.clippingPlanes,g.state.camera)):g=null,I.pop(),I.length>0?x=I[I.length-1]:x=null};function Za(A,X,it,at){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)it=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Y.intersectsSprite(A)){at&&ne.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Gt);const Dt=dt.update(A),Ot=A.material;Ot.visible&&x.push(A,Dt,Ot,it,ne.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Y.intersectsObject(A))){const Dt=dt.update(A),Ot=A.material;if(at&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ne.copy(A.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),ne.copy(Dt.boundingSphere.center)),ne.applyMatrix4(A.matrixWorld).applyMatrix4(Gt)),Array.isArray(Ot)){const Nt=Dt.groups;for(let Kt=0,te=Nt.length;Kt<te;Kt++){const jt=Nt[Kt],Se=Ot[jt.materialIndex];Se&&Se.visible&&x.push(A,Dt,Se,it,ne.z,jt)}}else Ot.visible&&x.push(A,Dt,Ot,it,ne.z,null)}}const vt=A.children;for(let Dt=0,Ot=vt.length;Dt<Ot;Dt++)Za(vt[Dt],X,it,at)}function Ds(A,X,it,at){const W=A.opaque,vt=A.transmissive,Dt=A.transparent;g.setupLightsView(it),ct===!0&&bt.setGlobalState(L.clippingPlanes,it),at&&qt.viewport(G.copy(at)),W.length>0&&Ka(W,X,it),vt.length>0&&Ka(vt,X,it),Dt.length>0&&Ka(Dt,X,it),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function Vr(A,X,it,at){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[at.id]===void 0&&(g.state.transmissionRenderTarget[at.id]=new Rs(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?Vo:da,minFilter:bs,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ce.workingColorSpace}));const vt=g.state.transmissionRenderTarget[at.id],Dt=at.viewport||G;vt.setSize(Dt.z,Dt.w);const Ot=L.getRenderTarget();L.setRenderTarget(vt),L.getClearColor(mt),_t=L.getClearAlpha(),_t<1&&L.setClearColor(16777215,.5),L.clear(),he&&Yt.render(it);const Nt=L.toneMapping;L.toneMapping=Wa;const Kt=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),g.setupLightsView(at),ct===!0&&bt.setGlobalState(L.clippingPlanes,at),Ka(A,it,at),U.updateMultisampleRenderTarget(vt),U.updateRenderTargetMipmap(vt),fe.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let jt=0,Se=X.length;jt<Se;jt++){const Te=X[jt],Ve=Te.object,He=Te.geometry,ae=Te.material,Ht=Te.group;if(ae.side===la&&Ve.layers.test(at.layers)){const an=ae.side;ae.side=Wn,ae.needsUpdate=!0,mi(Ve,it,at,He,ae,Ht),ae.side=an,ae.needsUpdate=!0,te=!0}}te===!0&&(U.updateMultisampleRenderTarget(vt),U.updateRenderTargetMipmap(vt))}L.setRenderTarget(Ot),L.setClearColor(mt,_t),Kt!==void 0&&(at.viewport=Kt),L.toneMapping=Nt}function Ka(A,X,it){const at=X.isScene===!0?X.overrideMaterial:null;for(let W=0,vt=A.length;W<vt;W++){const Dt=A[W],Ot=Dt.object,Nt=Dt.geometry,Kt=at===null?Dt.material:at,te=Dt.group;Ot.layers.test(it.layers)&&mi(Ot,X,it,Nt,Kt,te)}}function mi(A,X,it,at,W,vt){A.onBeforeRender(L,X,it,at,W,vt),A.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(L,X,it,at,A,vt),W.transparent===!0&&W.side===la&&W.forceSinglePass===!1?(W.side=Wn,W.needsUpdate=!0,L.renderBufferDirect(it,X,at,W,A,vt),W.side=qa,W.needsUpdate=!0,L.renderBufferDirect(it,X,at,W,A,vt),W.side=la):L.renderBufferDirect(it,X,at,W,A,vt),A.onAfterRender(L,X,it,at,W,vt)}function Ke(A,X,it){X.isScene!==!0&&(X=Ne);const at=Wt.get(A),W=g.state.lights,vt=g.state.shadowsArray,Dt=W.state.version,Ot=kt.getParameters(A,W.state,vt,X,it),Nt=kt.getProgramCacheKey(Ot);let Kt=at.programs;at.environment=A.isMeshStandardMaterial?X.environment:null,at.fog=X.fog,at.envMap=(A.isMeshStandardMaterial?et:T).get(A.envMap||at.environment),at.envMapRotation=at.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Kt===void 0&&(A.addEventListener("dispose",$t),Kt=new Map,at.programs=Kt);let te=Kt.get(Nt);if(te!==void 0){if(at.currentProgram===te&&at.lightsStateVersion===Dt)return zi(A,Ot),te}else Ot.uniforms=kt.getUniforms(A),A.onBeforeCompile(Ot,L),te=kt.acquireProgram(Ot,Nt),Kt.set(Nt,te),at.uniforms=Ot.uniforms;const jt=at.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(jt.clippingPlanes=bt.uniform),zi(A,Ot),at.needsLights=qc(A),at.lightsStateVersion=Dt,at.needsLights&&(jt.ambientLightColor.value=W.state.ambient,jt.lightProbe.value=W.state.probe,jt.directionalLights.value=W.state.directional,jt.directionalLightShadows.value=W.state.directionalShadow,jt.spotLights.value=W.state.spot,jt.spotLightShadows.value=W.state.spotShadow,jt.rectAreaLights.value=W.state.rectArea,jt.ltc_1.value=W.state.rectAreaLTC1,jt.ltc_2.value=W.state.rectAreaLTC2,jt.pointLights.value=W.state.point,jt.pointLightShadows.value=W.state.pointShadow,jt.hemisphereLights.value=W.state.hemi,jt.directionalShadowMap.value=W.state.directionalShadowMap,jt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,jt.spotShadowMap.value=W.state.spotShadowMap,jt.spotLightMatrix.value=W.state.spotLightMatrix,jt.spotLightMap.value=W.state.spotLightMap,jt.pointShadowMap.value=W.state.pointShadowMap,jt.pointShadowMatrix.value=W.state.pointShadowMatrix),at.currentProgram=te,at.uniformsList=null,te}function xn(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Oc.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function zi(A,X){const it=Wt.get(A);it.outputColorSpace=X.outputColorSpace,it.batching=X.batching,it.batchingColor=X.batchingColor,it.instancing=X.instancing,it.instancingColor=X.instancingColor,it.instancingMorph=X.instancingMorph,it.skinning=X.skinning,it.morphTargets=X.morphTargets,it.morphNormals=X.morphNormals,it.morphColors=X.morphColors,it.morphTargetsCount=X.morphTargetsCount,it.numClippingPlanes=X.numClippingPlanes,it.numIntersection=X.numClipIntersection,it.vertexAlphas=X.vertexAlphas,it.vertexTangents=X.vertexTangents,it.toneMapping=X.toneMapping}function kr(A,X,it,at,W){X.isScene!==!0&&(X=Ne),U.resetTextureUnits();const vt=X.fog,Dt=at.isMeshStandardMaterial?X.environment:null,Ot=V===null?L.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:zr,Nt=(at.isMeshStandardMaterial?et:T).get(at.envMap||Dt),Kt=at.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,te=!!it.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),jt=!!it.morphAttributes.position,Se=!!it.morphAttributes.normal,Te=!!it.morphAttributes.color;let Ve=Wa;at.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Ve=L.toneMapping);const He=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,ae=He!==void 0?He.length:0,Ht=Wt.get(at),an=g.state.lights;if(ct===!0&&(Et===!0||A!==C)){const fn=A===C&&at.id===w;bt.setState(at,A,fn)}let be=!1;at.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==an.state.version||Ht.outputColorSpace!==Ot||W.isBatchedMesh&&Ht.batching===!1||!W.isBatchedMesh&&Ht.batching===!0||W.isBatchedMesh&&Ht.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ht.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ht.instancing===!1||!W.isInstancedMesh&&Ht.instancing===!0||W.isSkinnedMesh&&Ht.skinning===!1||!W.isSkinnedMesh&&Ht.skinning===!0||W.isInstancedMesh&&Ht.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ht.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ht.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ht.instancingMorph===!1&&W.morphTexture!==null||Ht.envMap!==Nt||at.fog===!0&&Ht.fog!==vt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==bt.numPlanes||Ht.numIntersection!==bt.numIntersection)||Ht.vertexAlphas!==Kt||Ht.vertexTangents!==te||Ht.morphTargets!==jt||Ht.morphNormals!==Se||Ht.morphColors!==Te||Ht.toneMapping!==Ve||Ht.morphTargetsCount!==ae)&&(be=!0):(be=!0,Ht.__version=at.version);let Un=Ht.currentProgram;be===!0&&(Un=Ke(at,X,W));let Bi=!1,_n=!1,Ja=!1;const de=Un.getUniforms(),Rn=Ht.uniforms;if(qt.useProgram(Un.program)&&(Bi=!0,_n=!0,Ja=!0),at.id!==w&&(w=at.id,_n=!0),Bi||C!==A){qt.buffers.depth.getReversed()?(St.copy(A.projectionMatrix),Px(St),zx(St),de.setValue(F,"projectionMatrix",St)):de.setValue(F,"projectionMatrix",A.projectionMatrix),de.setValue(F,"viewMatrix",A.matrixWorldInverse);const tn=de.map.cameraPosition;tn!==void 0&&tn.setValue(F,Ft.setFromMatrixPosition(A.matrixWorld)),ge.logarithmicDepthBuffer&&de.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&de.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),C!==A&&(C=A,_n=!0,Ja=!0)}if(W.isSkinnedMesh){de.setOptional(F,W,"bindMatrix"),de.setOptional(F,W,"bindMatrixInverse");const fn=W.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),de.setValue(F,"boneTexture",fn.boneTexture,U))}W.isBatchedMesh&&(de.setOptional(F,W,"batchingTexture"),de.setValue(F,"batchingTexture",W._matricesTexture,U),de.setOptional(F,W,"batchingIdTexture"),de.setValue(F,"batchingIdTexture",W._indirectTexture,U),de.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&de.setValue(F,"batchingColorTexture",W._colorsTexture,U));const Ln=it.morphAttributes;if((Ln.position!==void 0||Ln.normal!==void 0||Ln.color!==void 0)&&Xt.update(W,it,Un),(_n||Ht.receiveShadow!==W.receiveShadow)&&(Ht.receiveShadow=W.receiveShadow,de.setValue(F,"receiveShadow",W.receiveShadow)),at.isMeshGouraudMaterial&&at.envMap!==null&&(Rn.envMap.value=Nt,Rn.flipEnvMap.value=Nt.isCubeTexture&&Nt.isRenderTargetTexture===!1?-1:1),at.isMeshStandardMaterial&&at.envMap===null&&X.environment!==null&&(Rn.envMapIntensity.value=X.environmentIntensity),_n&&(de.setValue(F,"toneMappingExposure",L.toneMappingExposure),Ht.needsLights&&Wc(Rn,Ja),vt&&at.fog===!0&&Ct.refreshFogUniforms(Rn,vt),Ct.refreshMaterialUniforms(Rn,at,j,Z,g.state.transmissionRenderTarget[A.id]),Oc.upload(F,xn(Ht),Rn,U)),at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(Oc.upload(F,xn(Ht),Rn,U),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&de.setValue(F,"center",W.center),de.setValue(F,"modelViewMatrix",W.modelViewMatrix),de.setValue(F,"normalMatrix",W.normalMatrix),de.setValue(F,"modelMatrix",W.matrixWorld),at.isShaderMaterial||at.isRawShaderMaterial){const fn=at.uniformsGroups;for(let tn=0,Us=fn.length;tn<Us;tn++){const Ci=fn[tn];k.update(Ci,Un),k.bind(Ci,Un)}}return Un}function Wc(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function qc(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(A,X,it){Wt.get(A.texture).__webglTexture=X,Wt.get(A.depthTexture).__webglTexture=it;const at=Wt.get(A);at.__hasExternalTextures=!0,at.__autoAllocateDepthBuffer=it===void 0,at.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),at.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){const it=Wt.get(A);it.__webglFramebuffer=X,it.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,it=0){V=A,N=X,D=it;let at=!0,W=null,vt=!1,Dt=!1;if(A){const Nt=Wt.get(A);if(Nt.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(F.FRAMEBUFFER,null),at=!1;else if(Nt.__webglFramebuffer===void 0)U.setupRenderTarget(A);else if(Nt.__hasExternalTextures)U.rebindTextures(A,Wt.get(A.texture).__webglTexture,Wt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const jt=A.depthTexture;if(Nt.__boundDepthTexture!==jt){if(jt!==null&&Wt.has(jt)&&(A.width!==jt.image.width||A.height!==jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(A)}}const Kt=A.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Dt=!0);const te=Wt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(te[X])?W=te[X][it]:W=te[X],vt=!0):A.samples>0&&U.useMultisampledRTT(A)===!1?W=Wt.get(A).__webglMultisampledFramebuffer:Array.isArray(te)?W=te[it]:W=te,G.copy(A.viewport),lt.copy(A.scissor),rt=A.scissorTest}else G.copy(O).multiplyScalar(j).floor(),lt.copy(nt).multiplyScalar(j).floor(),rt=yt;if(qt.bindFramebuffer(F.FRAMEBUFFER,W)&&at&&qt.drawBuffers(A,W),qt.viewport(G),qt.scissor(lt),qt.setScissorTest(rt),vt){const Nt=Wt.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+X,Nt.__webglTexture,it)}else if(Dt){const Nt=Wt.get(A.texture),Kt=X||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Nt.__webglTexture,it||0,Kt)}w=-1},this.readRenderTargetPixels=function(A,X,it,at,W,vt,Dt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ot=Ot[Dt]),Ot){qt.bindFramebuffer(F.FRAMEBUFFER,Ot);try{const Nt=A.texture,Kt=Nt.format,te=Nt.type;if(!ge.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-at&&it>=0&&it<=A.height-W&&F.readPixels(X,it,at,W,ie.convert(Kt),ie.convert(te),vt)}finally{const Nt=V!==null?Wt.get(V).__webglFramebuffer:null;qt.bindFramebuffer(F.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(A,X,it,at,W,vt,Dt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ot=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ot=Ot[Dt]),Ot){const Nt=A.texture,Kt=Nt.format,te=Nt.type;if(!ge.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-at&&it>=0&&it<=A.height-W){qt.bindFramebuffer(F.FRAMEBUFFER,Ot);const jt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.bufferData(F.PIXEL_PACK_BUFFER,vt.byteLength,F.STREAM_READ),F.readPixels(X,it,at,W,ie.convert(Kt),ie.convert(te),0);const Se=V!==null?Wt.get(V).__webglFramebuffer:null;qt.bindFramebuffer(F.FRAMEBUFFER,Se);const Te=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Ox(F,Te,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,vt),F.deleteBuffer(jt),F.deleteSync(Te),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,it=0){A.isTexture!==!0&&(Tr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);const at=Math.pow(2,-it),W=Math.floor(A.image.width*at),vt=Math.floor(A.image.height*at),Dt=X!==null?X.x:0,Ot=X!==null?X.y:0;U.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,it,0,0,Dt,Ot,W,vt),qt.unbindTexture()};const Wo=F.createFramebuffer(),Qa=F.createFramebuffer();this.copyTextureToTexture=function(A,X,it=null,at=null,W=0,vt=null){A.isTexture!==!0&&(Tr("WebGLRenderer: copyTextureToTexture function signature has changed."),at=arguments[0]||null,A=arguments[1],X=arguments[2],vt=arguments[3]||0,it=null),vt===null&&(W!==0?(Tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=W,W=0):vt=0);let Dt,Ot,Nt,Kt,te,jt,Se,Te,Ve;const He=A.isCompressedTexture?A.mipmaps[vt]:A.image;if(it!==null)Dt=it.max.x-it.min.x,Ot=it.max.y-it.min.y,Nt=it.isBox3?it.max.z-it.min.z:1,Kt=it.min.x,te=it.min.y,jt=it.isBox3?it.min.z:0;else{const Ln=Math.pow(2,-W);Dt=Math.floor(He.width*Ln),Ot=Math.floor(He.height*Ln),A.isDataArrayTexture?Nt=He.depth:A.isData3DTexture?Nt=Math.floor(He.depth*Ln):Nt=1,Kt=0,te=0,jt=0}at!==null?(Se=at.x,Te=at.y,Ve=at.z):(Se=0,Te=0,Ve=0);const ae=ie.convert(X.format),Ht=ie.convert(X.type);let an;X.isData3DTexture?(U.setTexture3D(X,0),an=F.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(U.setTexture2DArray(X,0),an=F.TEXTURE_2D_ARRAY):(U.setTexture2D(X,0),an=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,X.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,X.unpackAlignment);const be=F.getParameter(F.UNPACK_ROW_LENGTH),Un=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Bi=F.getParameter(F.UNPACK_SKIP_PIXELS),_n=F.getParameter(F.UNPACK_SKIP_ROWS),Ja=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,He.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,He.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Kt),F.pixelStorei(F.UNPACK_SKIP_ROWS,te),F.pixelStorei(F.UNPACK_SKIP_IMAGES,jt);const de=A.isDataArrayTexture||A.isData3DTexture,Rn=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const Ln=Wt.get(A),fn=Wt.get(X),tn=Wt.get(Ln.__renderTarget),Us=Wt.get(fn.__renderTarget);qt.bindFramebuffer(F.READ_FRAMEBUFFER,tn.__webglFramebuffer),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Us.__webglFramebuffer);for(let Ci=0;Ci<Nt;Ci++)de&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wt.get(A).__webglTexture,W,jt+Ci),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wt.get(X).__webglTexture,vt,Ve+Ci)),F.blitFramebuffer(Kt,te,Dt,Ot,Se,Te,Dt,Ot,F.DEPTH_BUFFER_BIT,F.NEAREST);qt.bindFramebuffer(F.READ_FRAMEBUFFER,null),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||Wt.has(A)){const Ln=Wt.get(A),fn=Wt.get(X);qt.bindFramebuffer(F.READ_FRAMEBUFFER,Wo),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Qa);for(let tn=0;tn<Nt;tn++)de?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ln.__webglTexture,W,jt+tn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ln.__webglTexture,W),Rn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,fn.__webglTexture,vt,Ve+tn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,fn.__webglTexture,vt),W!==0?F.blitFramebuffer(Kt,te,Dt,Ot,Se,Te,Dt,Ot,F.COLOR_BUFFER_BIT,F.NEAREST):Rn?F.copyTexSubImage3D(an,vt,Se,Te,Ve+tn,Kt,te,Dt,Ot):F.copyTexSubImage2D(an,vt,Se,Te,Kt,te,Dt,Ot);qt.bindFramebuffer(F.READ_FRAMEBUFFER,null),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Rn?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(an,vt,Se,Te,Ve,Dt,Ot,Nt,ae,Ht,He.data):X.isCompressedArrayTexture?F.compressedTexSubImage3D(an,vt,Se,Te,Ve,Dt,Ot,Nt,ae,He.data):F.texSubImage3D(an,vt,Se,Te,Ve,Dt,Ot,Nt,ae,Ht,He):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,vt,Se,Te,Dt,Ot,ae,Ht,He.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,vt,Se,Te,He.width,He.height,ae,He.data):F.texSubImage2D(F.TEXTURE_2D,vt,Se,Te,Dt,Ot,ae,Ht,He);F.pixelStorei(F.UNPACK_ROW_LENGTH,be),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Un),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Bi),F.pixelStorei(F.UNPACK_SKIP_ROWS,_n),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ja),vt===0&&X.generateMipmaps&&F.generateMipmap(an),qt.unbindTexture()},this.copyTextureToTexture3D=function(A,X,it=null,at=null,W=0){return A.isTexture!==!0&&(Tr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),it=arguments[0]||null,at=arguments[1]||null,A=arguments[2],X=arguments[3],W=arguments[4]||0),Tr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,it,at,W)},this.initRenderTarget=function(A){Wt.get(A).__webglFramebuffer===void 0&&U.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?U.setTextureCube(A,0):A.isData3DTexture?U.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?U.setTexture2DArray(A,0):U.setTexture2D(A,0),qt.unbindTexture()},this.resetState=function(){N=0,D=0,V=null,qt.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ua}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=Ce._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ce._getUnpackColorSpace()}}const zv={type:"change"},Hd={type:"start"},b0={type:"end"},Ac=new kc,Bv=new oa,a1=Math.cos(70*Lx.DEG2RAD),dn=new Q,kn=2*Math.PI,Fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ph=1e-6;class s1 extends yM{constructor(t,i=null){super(t,i),this.state=Fe.NONE,this.enabled=!0,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rr.ROTATE,MIDDLE:Rr.DOLLY,RIGHT:Rr.PAN},this.touches={ONE:br.ROTATE,TWO:br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new Ya,this._lastTargetPosition=new Q,this._quat=new Ya().setFromUnitVectors(t.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new uv,this._sphericalDelta=new uv,this._scale=1,this._panOffset=new Q,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new Q,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=o1.bind(this),this._onPointerDown=r1.bind(this),this._onPointerUp=l1.bind(this),this._onContextMenu=m1.bind(this),this._onMouseWheel=f1.bind(this),this._onKeyDown=h1.bind(this),this._onTouchStart=d1.bind(this),this._onTouchMove=p1.bind(this),this._onMouseDown=c1.bind(this),this._onMouseMove=u1.bind(this),this._interceptControlDown=_1.bind(this),this._interceptControlUp=g1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zv),this.update(),this.state=Fe.NONE}update(t=null){const i=this.object.position;dn.copy(i).sub(this.target),dn.applyQuaternion(this._quat),this._spherical.setFromVector3(dn),this.autoRotate&&this.state===Fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=kn:s>Math.PI&&(s-=kn),l<-Math.PI?l+=kn:l>Math.PI&&(l-=kn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=h!=this._spherical.radius}if(dn.setFromSpherical(this._spherical),dn.applyQuaternion(this._quatInverse),i.copy(this.target).add(dn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=dn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),u=!!m}else if(this.object.isOrthographicCamera){const d=new Q(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=m!==this.object.zoom;const p=new Q(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=dn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Ac.origin.copy(this.object.position),Ac.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ac.direction))<a1?this.object.lookAt(this.target):(Bv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ac.intersectPlane(Bv,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>Ph||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ph||this._lastTargetPosition.distanceToSquared(this.target)>Ph?(this.dispatchEvent(zv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?kn/60*this.autoRotateSpeed*t:kn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){dn.setFromMatrixColumn(i,0),dn.multiplyScalar(-t),this._panOffset.add(dn)}_panUp(t,i){this.screenSpacePanning===!0?dn.setFromMatrixColumn(i,1):(dn.setFromMatrixColumn(i,0),dn.crossVectors(this.object.up,dn)),dn.multiplyScalar(t),this._panOffset.add(dn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;dn.copy(l).sub(this.target);let u=dn.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*u/s.clientHeight,this.object.matrix),this._panUp(2*i*u/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,u=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(u/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(kn*this._rotateDelta.x/i.clientHeight),this._rotateUp(kn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(kn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-kn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(kn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-kn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,u=Math.sqrt(s*s+l*l);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),u=.5*(t.pageY+s.y);this._rotateEnd.set(l,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(kn*this._rotateDelta.x/i.clientHeight),this._rotateUp(kn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,u=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new re,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function r1(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function o1(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function l1(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(b0),this.state=Fe.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function c1(o){let t;switch(o.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Fe.DOLLY;break;case Rr.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Fe.ROTATE}break;case Rr.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Fe.PAN}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(Hd)}function u1(o){switch(this.state){case Fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function f1(o){this.enabled===!1||this.enableZoom===!1||this.state!==Fe.NONE||(o.preventDefault(),this.dispatchEvent(Hd),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(b0))}function h1(o){this.enabled!==!1&&this._handleKeyDown(o)}function d1(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case br.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Fe.TOUCH_ROTATE;break;case br.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Fe.TOUCH_PAN;break;default:this.state=Fe.NONE}break;case 2:switch(this.touches.TWO){case br.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Fe.TOUCH_DOLLY_PAN;break;case br.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Fe.TOUCH_DOLLY_ROTATE;break;default:this.state=Fe.NONE}break;default:this.state=Fe.NONE}this.state!==Fe.NONE&&this.dispatchEvent(Hd)}function p1(o){switch(this._trackPointer(o),this.state){case Fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Fe.NONE}}function m1(o){this.enabled!==!1&&o.preventDefault()}function _1(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function g1(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const A0="/vex-build-center/";async function v1(){const o=await fetch(`${A0}parts/manifest.json`,{cache:"force-cache"});if(!o.ok)throw new Error("Could not load the parts library.");return o.json()}function zh(o){const t=atob(o),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}const Iv=new Map;function Fv(o){const t=Iv.get(o.id);if(t)return t;const i=(async()=>{if(o.primitive==="box"){const[u,h,d]=o.sizeMM,m=new Ir(u,h,d);return m.computeBoundingBox(),m}const s=await(await fetch(`${A0}parts/${o.id}.json`,{cache:"force-cache"})).json(),l=new Ai;return l.setAttribute("position",new Pn(new Float32Array(zh(s.position).buffer),3)),s.normal&&l.setAttribute("normal",new Pn(new Float32Array(zh(s.normal).buffer),3)),l.setIndex(new Pn(new Uint32Array(zh(s.index).buffer),1)),s.normal||l.computeVertexNormals(),l.computeBoundingBox(),l})();return Iv.set(o.id,i),i}const Hv={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47"},S1={beam:"Beams",plate:"Plates",pin:"Pins",standoff:"Standoffs",corner:"Corners",gear:"Gears",wheel:"Wheels",shaft:"Shafts",spacer:"Spacers",motor:"Motors",brain:"Brain"},y1=["beam","plate","corner","pin","standoff","gear","wheel","shaft","spacer","motor","brain"],R0=12.7,Hc=R0/2,Rc=o=>Math.round(o/Hc)*Hc;let Gv=1;class x1{constructor(t){Ze(this,"scene",new sM);Ze(this,"camera");Ze(this,"renderer");Ze(this,"controls");Ze(this,"onChange",()=>{});Ze(this,"container");Ze(this,"raycaster",new gM);Ze(this,"pointer",new re);Ze(this,"parts",new Map);Ze(this,"selected",null);Ze(this,"helper",null);Ze(this,"ground");Ze(this,"dragging",!1);Ze(this,"dragPlane",new oa);Ze(this,"dragOffset",new Q);Ze(this,"hit",new Q);Ze(this,"raf",0);Ze(this,"ro");Ze(this,"onPointerDown",t=>{if(t.button!==0)return;this.setPointer(t);const i=[...this.parts.values()].map(l=>l.mesh),s=this.raycaster.intersectObjects(i,!1);if(s.length){const l=s[0].object.userData.uid,u=this.parts.get(l)||null;this.select(u),this.dragging=!0,this.controls.enabled=!1,this.dragPlane.setFromNormalAndCoplanarPoint(new Q(0,1,0),s[0].point),this.dragOffset.copy(s[0].point).sub(u.mesh.position),t.stopPropagation(),this.emit()}else this.selected&&(this.select(null),this.emit())});Ze(this,"onPointerMove",t=>{var i;if(!(!this.dragging||!this.selected)&&(this.setPointer(t),this.raycaster.ray.intersectPlane(this.dragPlane,this.hit))){const s=Rc(this.hit.x-this.dragOffset.x),l=Rc(this.hit.z-this.dragOffset.z);this.selected.mesh.position.x=s,this.selected.mesh.position.z=l,this.selected.mesh.updateMatrixWorld(!0),(i=this.helper)==null||i.update()}});Ze(this,"onPointerUp",()=>{this.dragging&&(this.dragging=!1,this.controls.enabled=!0,this.emit())});Ze(this,"animate",()=>{this.raf=requestAnimationFrame(this.animate),this.controls.update(),this.renderer.render(this.scene,this.camera)});this.container=t;const i=t.clientWidth||800,s=t.clientHeight||600;this.scene.background=new ue("#eaeef4"),this.scene.fog=new zd(15396596,900,2e3),this.camera=new hi(45,i/s,1,6e3),this.camera.position.set(220,190,260),this.renderer=new i1({antialias:!0}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Wv,t.appendChild(this.renderer.domElement),this.controls=new s1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.target.set(0,25,0),this.controls.maxPolarAngle=Math.PI*.495,this.controls.minDistance=60,this.controls.maxDistance=1600,this.scene.add(new hM(16777215,10135478,.85));const l=new mM(16777215,1.15);l.position.set(160,260,180),l.castShadow=!0,l.shadow.mapSize.set(2048,2048);const u=l.shadow.camera;u.near=10,u.far=900,u.left=-350,u.right=350,u.top=350,u.bottom=-350,l.shadow.bias=-5e-4,this.scene.add(l);const h=R0*48,d=new vM(h,48,11122374,13687010);d.material.transparent=!0,d.material.opacity=.75,this.scene.add(d),this.ground=new di(new Xo(h,h),new cM({opacity:.16})),this.ground.rotation.x=-Math.PI/2,this.ground.receiveShadow=!0,this.ground.name="ground",this.scene.add(this.ground),this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.animate()}async addPart(t){const i=await Fv(t),s=t.color||Hv[t.category]||"#6b7787",l=new sv({color:s,metalness:.18,roughness:.55}),u=new di(i,l);u.castShadow=!0,u.receiveShadow=!0;const h=`p${Gv++}`;u.userData.uid=h;const d=this.parts.size%4*Hc;u.position.set(Rc(this.controls.target.x)+d,0,Rc(this.controls.target.z)+d),this.restOnGrid(u),this.scene.add(u);const m={uid:h,meta:t,mesh:u};this.parts.set(h,m),this.select(m),this.emit()}restOnGrid(t){t.updateMatrixWorld(!0);const i=new ha().setFromObject(t);t.position.y+=-i.min.y,t.position.y=Math.max(0,t.position.y),t.updateMatrixWorld(!0)}select(t){this.selected=t,this.helper&&(this.scene.remove(this.helper),this.helper.geometry.dispose(),this.helper=null),t&&(this.helper=new SM(t.mesh,new ue("#ffb020")),this.helper.material.linewidth=2,this.scene.add(this.helper))}selectByUid(t){this.select(t&&this.parts.get(t)||null),this.emit()}rotateSelected(t){var s;if(!this.selected)return;const i=new Ya().setFromAxisAngle(new Q(t==="x"?1:0,t==="y"?1:0,t==="z"?1:0),Math.PI/2);this.selected.mesh.quaternion.premultiply(i),this.restOnGrid(this.selected.mesh),(s=this.helper)==null||s.update(),this.emit()}nudgeSelectedY(t){var i;this.selected&&(this.selected.mesh.position.y=Math.max(0,this.selected.mesh.position.y+t*Hc),this.selected.mesh.updateMatrixWorld(!0),(i=this.helper)==null||i.update(),this.emit())}deleteSelected(){this.selected&&(this.removePart(this.selected),this.select(null),this.emit())}removePart(t){this.scene.remove(t.mesh),t.mesh.material.dispose(),this.parts.delete(t.uid)}clear(){for(const t of[...this.parts.values()])this.removePart(t);this.select(null),this.emit()}serialize(){return[...this.parts.values()].map(t=>({id:t.meta.id,p:[t.mesh.position.x,t.mesh.position.y,t.mesh.position.z],q:[t.mesh.quaternion.x,t.mesh.quaternion.y,t.mesh.quaternion.z,t.mesh.quaternion.w]}))}async load(t,i){this.clear();for(const s of t){const l=i.get(s.id);if(!l)continue;const u=await Fv(l),h=l.color||Hv[l.category]||"#6b7787",d=new di(u,new sv({color:h,metalness:.18,roughness:.55}));d.castShadow=d.receiveShadow=!0;const m=`p${Gv++}`;d.userData.uid=m,d.position.set(s.p[0],s.p[1],s.p[2]),d.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]),d.updateMatrixWorld(!0),this.scene.add(d),this.parts.set(m,{uid:m,meta:l,mesh:d})}this.select(null),this.emit()}computeState(){var l,u;const t=new ha;let i=0;for(const h of this.parts.values())t.expandByObject(h.mesh),h.meta.isMotor&&i++;const s=this.parts.size?t.getSize(new Q):new Q;return{count:this.parts.size,selectedUid:((l=this.selected)==null?void 0:l.uid)??null,selectedName:((u=this.selected)==null?void 0:u.meta.name)??null,bboxMM:{w:+s.x.toFixed(1),h:+s.y.toFixed(1),d:+s.z.toFixed(1)},motors:i}}emit(){var t;(t=this.helper)==null||t.update(),this.onChange(this.computeState())}setPointer(t){const i=this.renderer.domElement.getBoundingClientRect();this.pointer.set((t.clientX-i.left)/i.width*2-1,-((t.clientY-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}resize(){const t=this.container.clientWidth,i=this.container.clientHeight;!t||!i||(this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i))}frameAll(){if(!this.parts.size){this.camera.position.set(220,190,260),this.controls.target.set(0,25,0);return}const t=new ha;for(const l of this.parts.values())t.expandByObject(l.mesh);const i=t.getCenter(new Q),s=t.getSize(new Q).length()*.6+60;this.controls.target.copy(i),this.camera.position.set(i.x+s,i.y+s*.8,i.z+s)}dispose(){cancelAnimationFrame(this.raf);const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),this.ro.disconnect(),this.controls.dispose(),this.renderer.dispose(),t.remove()}}const M1=25.4,Vv="utg_vex_build",Bh=o=>+(o/M1).toFixed(1),kv={w:11,h:15,d:11,motors:6};function E1(){const o=Xn.useRef(null),t=Xn.useRef(null),[i,s]=Xn.useState(null),[l,u]=Xn.useState({count:0,selectedUid:null,selectedName:null,bboxMM:{w:0,h:0,d:0},motors:0}),[h,d]=Xn.useState(()=>{try{return{...kv,...JSON.parse(localStorage.getItem("utg_vex_limits")||"{}")}}catch{return kv}}),[m,p]=Xn.useState("Loading parts…"),[v,S]=Xn.useState(""),y=Xn.useMemo(()=>new Map(((i==null?void 0:i.parts)||[]).map(N=>[N.id,N])),[i]);Xn.useEffect(()=>{v1().then(s).catch(()=>S("The parts library failed to load."))},[]),Xn.useEffect(()=>{if(!i||!o.current)return;const N=new x1(o.current);return N.onChange=u,t.current=N,p("Pick a part on the left to start building."),()=>{N.dispose(),t.current=null}},[i]),Xn.useEffect(()=>{localStorage.setItem("utg_vex_limits",JSON.stringify(h))},[h]),Xn.useEffect(()=>{const N=D=>{var w;const V=t.current;V&&((w=D.target)==null?void 0:w.tagName)!=="INPUT"&&(D.key==="Delete"||D.key==="Backspace"?(D.preventDefault(),V.deleteSelected()):D.key==="r"||D.key==="R"?V.rotateSelected("y"):D.key==="x"||D.key==="X"?V.rotateSelected("x"):D.key==="z"||D.key==="Z"?V.rotateSelected("z"):D.key==="]"?V.nudgeSelectedY(1):D.key==="["?V.nudgeSelectedY(-1):D.key==="f"||D.key==="F"?V.frameAll():D.key==="Escape"&&V.selectByUid(null))};return window.addEventListener("keydown",N),()=>window.removeEventListener("keydown",N)},[]);function M(N){var D;(D=t.current)==null||D.addPart(N),p(`Added ${N.name}. Drag to move · R to rotate · Del to remove.`)}function b(){var D;const N=((D=t.current)==null?void 0:D.serialize())||[];localStorage.setItem(Vv,JSON.stringify(N)),p(`Saved your build (${N.length} parts) to this device.`)}async function R(){var N,D;try{const V=JSON.parse(localStorage.getItem(Vv)||"[]");if(!V.length){p("No saved build on this device yet.");return}await((N=t.current)==null?void 0:N.load(V,y)),(D=t.current)==null||D.frameAll(),p(`Loaded your saved build (${V.length} parts).`)}catch{p("That saved build could not be opened.")}}function x(){var N;confirm("Clear the whole build?")&&((N=t.current)==null||N.clear(),p("Cleared. Start a new build."))}const g=Xn.useMemo(()=>{const N=new Map;for(const D of(i==null?void 0:i.parts)||[]){const V=N.get(D.category)||[];V.push(D),N.set(D.category,V)}return y1.filter(D=>N.has(D)).map(D=>({category:D,parts:N.get(D)}))},[i]),I={w:Bh(l.bboxMM.w),h:Bh(l.bboxMM.h),d:Bh(l.bboxMM.d)},P={w:I.w>h.w,h:I.h>h.h,d:I.d>h.d,motors:l.motors>h.motors},L=P.w||P.h||P.d||P.motors,K=!!l.selectedUid;return v?Pt.jsx("main",{className:"shell",children:Pt.jsx("div",{className:"fatal",children:v})}):Pt.jsxs("main",{className:"shell",children:[Pt.jsxs("header",{className:"topbar",children:[Pt.jsxs("a",{className:"brand",href:"../",children:[Pt.jsx("img",{src:"https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg",alt:"UTG Academy"}),Pt.jsx("span",{children:"VEX Build Center"})]}),Pt.jsx("div",{className:`legality ${L?"bad":"good"}`,children:l.count?L?"Over the limits":"Within the limits":"Empty build"})]}),Pt.jsxs("div",{className:"workspace",children:[Pt.jsxs("aside",{className:"palette",children:[Pt.jsx("h2",{children:"Parts"}),!i&&Pt.jsx("p",{className:"muted",children:"Loading…"}),g.map(N=>Pt.jsxs("section",{className:"pal-group",children:[Pt.jsx("h3",{children:S1[N.category]}),Pt.jsx("div",{className:"pal-grid",children:N.parts.map(D=>Pt.jsxs("button",{className:"pal-item",onClick:()=>M(D),title:D.name,children:[Pt.jsx("span",{className:"pal-swatch",style:{background:T1(D)}}),Pt.jsx("span",{className:"pal-name",children:D.name})]},D.id))})]},N.category))]}),Pt.jsxs("div",{className:"stage",children:[Pt.jsx("div",{className:"canvas-host",ref:o}),Pt.jsx("div",{className:"stage-hint",children:"Drag a part to move · orbit with a drag on empty space · scroll to zoom"})]}),Pt.jsxs("aside",{className:"inspector",children:[Pt.jsxs("section",{className:"card",children:[Pt.jsx("h3",{children:"Robot size"}),Pt.jsxs("div",{className:"dims",children:[Pt.jsx(Ih,{label:"Width",mm:l.bboxMM.w,inV:I.w,limit:h.w,over:P.w,onLimit:N=>d({...h,w:N})}),Pt.jsx(Ih,{label:"Height",mm:l.bboxMM.h,inV:I.h,limit:h.h,over:P.h,onLimit:N=>d({...h,h:N})}),Pt.jsx(Ih,{label:"Depth",mm:l.bboxMM.d,inV:I.d,limit:h.d,over:P.d,onLimit:N=>d({...h,d:N})})]}),Pt.jsx("p",{className:"muted small",children:"Limits are in inches — set them to your season's rules."})]}),Pt.jsxs("section",{className:"card",children:[Pt.jsx("h3",{children:"Motors"}),Pt.jsxs("div",{className:`motor-row ${P.motors?"over":""}`,children:[Pt.jsx("span",{className:"motor-count",children:l.motors}),Pt.jsx("span",{className:"muted",children:"of"}),Pt.jsx("input",{type:"number",min:0,value:h.motors,onChange:N=>d({...h,motors:Math.max(0,+N.target.value||0)})}),Pt.jsx("span",{className:"muted",children:"max"})]})]}),Pt.jsxs("section",{className:"card",children:[Pt.jsx("h3",{children:"Selected part"}),K?Pt.jsxs(Pt.Fragment,{children:[Pt.jsx("p",{className:"sel-name",children:l.selectedName}),Pt.jsxs("div",{className:"btn-row",children:[Pt.jsx("button",{onClick:()=>{var N;return(N=t.current)==null?void 0:N.rotateSelected("x")},children:"Rotate X"}),Pt.jsx("button",{onClick:()=>{var N;return(N=t.current)==null?void 0:N.rotateSelected("y")},children:"Rotate Y"}),Pt.jsx("button",{onClick:()=>{var N;return(N=t.current)==null?void 0:N.rotateSelected("z")},children:"Rotate Z"})]}),Pt.jsxs("div",{className:"btn-row",children:[Pt.jsx("button",{onClick:()=>{var N;return(N=t.current)==null?void 0:N.nudgeSelectedY(1)},children:"Raise"}),Pt.jsx("button",{onClick:()=>{var N;return(N=t.current)==null?void 0:N.nudgeSelectedY(-1)},children:"Lower"}),Pt.jsx("button",{className:"danger",onClick:()=>{var N;return(N=t.current)==null?void 0:N.deleteSelected()},children:"Delete"})]})]}):Pt.jsx("p",{className:"muted small",children:"Click a part in the scene to select it."})]}),Pt.jsxs("section",{className:"card",children:[Pt.jsxs("h3",{children:["Build · ",l.count," parts"]}),Pt.jsxs("div",{className:"btn-row",children:[Pt.jsx("button",{onClick:b,children:"Save"}),Pt.jsx("button",{onClick:R,children:"Load"}),Pt.jsx("button",{onClick:()=>{var N;return(N=t.current)==null?void 0:N.frameAll()},children:"Fit view"})]}),Pt.jsx("div",{className:"btn-row",children:Pt.jsx("button",{className:"danger",onClick:x,children:"Clear all"})})]})]})]}),Pt.jsx("footer",{className:"statusbar",children:m})]})}function Ih({label:o,mm:t,inV:i,limit:s,over:l,onLimit:u}){return Pt.jsxs("div",{className:`dim ${l?"over":""}`,children:[Pt.jsx("span",{className:"dim-label",children:o}),Pt.jsxs("span",{className:"dim-val",children:[i,Pt.jsx("small",{children:"in"})," ",Pt.jsxs("span",{className:"muted",children:["/ ",t,"mm"]})]}),Pt.jsxs("label",{className:"dim-limit",children:["≤ ",Pt.jsx("input",{type:"number",min:0,step:.5,value:s,onChange:h=>u(Math.max(0,+h.target.value||0))})," in"]})]})}function T1(o){const t={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47"};return o.color||t[o.category]||"#6b7787"}Xy.createRoot(document.getElementById("root")).render(Pt.jsx(Xn.StrictMode,{children:Pt.jsx(E1,{})}));
