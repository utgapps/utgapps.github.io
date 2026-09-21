var hS=Object.defineProperty;var dS=(r,t,i)=>t in r?hS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var zt=(r,t,i)=>dS(r,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var gh={exports:{}},qo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z_;function pS(){if(Z_)return qo;Z_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:h,ref:l!==void 0?l:null,props:c}}return qo.Fragment=t,qo.jsx=i,qo.jsxs=i,qo}var K_;function mS(){return K_||(K_=1,gh.exports=pS()),gh.exports}var at=mS(),_h={exports:{}},ne={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q_;function gS(){if(Q_)return ne;Q_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),x=Symbol.iterator;function S(N){return N===null||typeof N!="object"?null:(N=x&&N[x]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,M={};function v(N,et,Et){this.props=N,this.context=et,this.refs=M,this.updater=Et||E}v.prototype.isReactComponent={},v.prototype.setState=function(N,et){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,et,"setState")},v.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function F(){}F.prototype=v.prototype;function O(N,et,Et){this.props=N,this.context=et,this.refs=M,this.updater=Et||E}var U=O.prototype=new F;U.constructor=O,A(U,v.prototype),U.isPureReactComponent=!0;var Q=Array.isArray;function X(){}var z={H:null,A:null,T:null,S:null},J=Object.prototype.hasOwnProperty;function D(N,et,Et){var w=Et.ref;return{$$typeof:r,type:N,key:et,ref:w!==void 0?w:null,props:Et}}function C(N,et){return D(N.type,et,N.props)}function k(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function ft(N){var et={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Et){return et[Et]})}var ct=/\/+/g;function vt(N,et){return typeof N=="object"&&N!==null&&N.key!=null?ft(""+N.key):et.toString(36)}function yt(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(X,X):(N.status="pending",N.then(function(et){N.status==="pending"&&(N.status="fulfilled",N.value=et)},function(et){N.status==="pending"&&(N.status="rejected",N.reason=et)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function P(N,et,Et,w,H){var st=typeof N;(st==="undefined"||st==="boolean")&&(N=null);var dt=!1;if(N===null)dt=!0;else switch(st){case"bigint":case"string":case"number":dt=!0;break;case"object":switch(N.$$typeof){case r:case t:dt=!0;break;case g:return dt=N._init,P(dt(N._payload),et,Et,w,H)}}if(dt)return H=H(N),dt=w===""?"."+vt(N,0):w,Q(H)?(Et="",dt!=null&&(Et=dt.replace(ct,"$&/")+"/"),P(H,et,Et,"",function(ie){return ie})):H!=null&&(k(H)&&(H=C(H,Et+(H.key==null||N&&N.key===H.key?"":(""+H.key).replace(ct,"$&/")+"/")+dt)),et.push(H)),1;dt=0;var Rt=w===""?".":w+":";if(Q(N))for(var Ot=0;Ot<N.length;Ot++)w=N[Ot],st=Rt+vt(w,Ot),dt+=P(w,et,Et,st,H);else if(Ot=S(N),typeof Ot=="function")for(N=Ot.call(N),Ot=0;!(w=N.next()).done;)w=w.value,st=Rt+vt(w,Ot++),dt+=P(w,et,Et,st,H);else if(st==="object"){if(typeof N.then=="function")return P(yt(N),et,Et,w,H);throw et=String(N),Error("Objects are not valid as a React child (found: "+(et==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":et)+"). If you meant to render a collection of children, use an array instead.")}return dt}function Z(N,et,Et){if(N==null)return N;var w=[],H=0;return P(N,w,"","",function(st){return et.call(Et,st,H++)}),w}function K(N){if(N._status===-1){var et=N._result;et=et(),et.then(function(Et){(N._status===0||N._status===-1)&&(N._status=1,N._result=Et)},function(Et){(N._status===0||N._status===-1)&&(N._status=2,N._result=Et)}),N._status===-1&&(N._status=0,N._result=et)}if(N._status===1)return N._result.default;throw N._result}var Mt=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var et=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(et))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},Tt={map:Z,forEach:function(N,et,Et){Z(N,function(){et.apply(this,arguments)},Et)},count:function(N){var et=0;return Z(N,function(){et++}),et},toArray:function(N){return Z(N,function(et){return et})||[]},only:function(N){if(!k(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return ne.Activity=_,ne.Children=Tt,ne.Component=v,ne.Fragment=i,ne.Profiler=l,ne.PureComponent=O,ne.StrictMode=s,ne.Suspense=p,ne.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,ne.__COMPILER_RUNTIME={__proto__:null,c:function(N){return z.H.useMemoCache(N)}},ne.cache=function(N){return function(){return N.apply(null,arguments)}},ne.cacheSignal=function(){return null},ne.cloneElement=function(N,et,Et){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var w=A({},N.props),H=N.key;if(et!=null)for(st in et.key!==void 0&&(H=""+et.key),et)!J.call(et,st)||st==="key"||st==="__self"||st==="__source"||st==="ref"&&et.ref===void 0||(w[st]=et[st]);var st=arguments.length-2;if(st===1)w.children=Et;else if(1<st){for(var dt=Array(st),Rt=0;Rt<st;Rt++)dt[Rt]=arguments[Rt+2];w.children=dt}return D(N.type,H,w)},ne.createContext=function(N){return N={$$typeof:h,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},ne.createElement=function(N,et,Et){var w,H={},st=null;if(et!=null)for(w in et.key!==void 0&&(st=""+et.key),et)J.call(et,w)&&w!=="key"&&w!=="__self"&&w!=="__source"&&(H[w]=et[w]);var dt=arguments.length-2;if(dt===1)H.children=Et;else if(1<dt){for(var Rt=Array(dt),Ot=0;Ot<dt;Ot++)Rt[Ot]=arguments[Ot+2];H.children=Rt}if(N&&N.defaultProps)for(w in dt=N.defaultProps,dt)H[w]===void 0&&(H[w]=dt[w]);return D(N,st,H)},ne.createRef=function(){return{current:null}},ne.forwardRef=function(N){return{$$typeof:d,render:N}},ne.isValidElement=k,ne.lazy=function(N){return{$$typeof:g,_payload:{_status:-1,_result:N},_init:K}},ne.memo=function(N,et){return{$$typeof:m,type:N,compare:et===void 0?null:et}},ne.startTransition=function(N){var et=z.T,Et={};z.T=Et;try{var w=N(),H=z.S;H!==null&&H(Et,w),typeof w=="object"&&w!==null&&typeof w.then=="function"&&w.then(X,Mt)}catch(st){Mt(st)}finally{et!==null&&Et.types!==null&&(et.types=Et.types),z.T=et}},ne.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},ne.use=function(N){return z.H.use(N)},ne.useActionState=function(N,et,Et){return z.H.useActionState(N,et,Et)},ne.useCallback=function(N,et){return z.H.useCallback(N,et)},ne.useContext=function(N){return z.H.useContext(N)},ne.useDebugValue=function(){},ne.useDeferredValue=function(N,et){return z.H.useDeferredValue(N,et)},ne.useEffect=function(N,et){return z.H.useEffect(N,et)},ne.useEffectEvent=function(N){return z.H.useEffectEvent(N)},ne.useId=function(){return z.H.useId()},ne.useImperativeHandle=function(N,et,Et){return z.H.useImperativeHandle(N,et,Et)},ne.useInsertionEffect=function(N,et){return z.H.useInsertionEffect(N,et)},ne.useLayoutEffect=function(N,et){return z.H.useLayoutEffect(N,et)},ne.useMemo=function(N,et){return z.H.useMemo(N,et)},ne.useOptimistic=function(N,et){return z.H.useOptimistic(N,et)},ne.useReducer=function(N,et,Et){return z.H.useReducer(N,et,Et)},ne.useRef=function(N){return z.H.useRef(N)},ne.useState=function(N){return z.H.useState(N)},ne.useSyncExternalStore=function(N,et,Et){return z.H.useSyncExternalStore(N,et,Et)},ne.useTransition=function(){return z.H.useTransition()},ne.version="19.2.8",ne}var J_;function ep(){return J_||(J_=1,_h.exports=gS()),_h.exports}var sn=ep(),vh={exports:{}},Yo={},yh={exports:{}},xh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $_;function _S(){return $_||($_=1,(function(r){function t(P,Z){var K=P.length;P.push(Z);t:for(;0<K;){var Mt=K-1>>>1,Tt=P[Mt];if(0<l(Tt,Z))P[Mt]=Z,P[K]=Tt,K=Mt;else break t}}function i(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var Z=P[0],K=P.pop();if(K!==Z){P[0]=K;t:for(var Mt=0,Tt=P.length,N=Tt>>>1;Mt<N;){var et=2*(Mt+1)-1,Et=P[et],w=et+1,H=P[w];if(0>l(Et,K))w<Tt&&0>l(H,Et)?(P[Mt]=H,P[w]=K,Mt=w):(P[Mt]=Et,P[et]=K,Mt=et);else if(w<Tt&&0>l(H,K))P[Mt]=H,P[w]=K,Mt=w;else break t}}return Z}function l(P,Z){var K=P.sortIndex-Z.sortIndex;return K!==0?K:P.id-Z.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();r.unstable_now=function(){return h.now()-d}}var p=[],m=[],g=1,_=null,x=3,S=!1,E=!1,A=!1,M=!1,v=typeof setTimeout=="function"?setTimeout:null,F=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function U(P){for(var Z=i(m);Z!==null;){if(Z.callback===null)s(m);else if(Z.startTime<=P)s(m),Z.sortIndex=Z.expirationTime,t(p,Z);else break;Z=i(m)}}function Q(P){if(A=!1,U(P),!E)if(i(p)!==null)E=!0,X||(X=!0,ft());else{var Z=i(m);Z!==null&&yt(Q,Z.startTime-P)}}var X=!1,z=-1,J=5,D=-1;function C(){return M?!0:!(r.unstable_now()-D<J)}function k(){if(M=!1,X){var P=r.unstable_now();D=P;var Z=!0;try{t:{E=!1,A&&(A=!1,F(z),z=-1),S=!0;var K=x;try{e:{for(U(P),_=i(p);_!==null&&!(_.expirationTime>P&&C());){var Mt=_.callback;if(typeof Mt=="function"){_.callback=null,x=_.priorityLevel;var Tt=Mt(_.expirationTime<=P);if(P=r.unstable_now(),typeof Tt=="function"){_.callback=Tt,U(P),Z=!0;break e}_===i(p)&&s(p),U(P)}else s(p);_=i(p)}if(_!==null)Z=!0;else{var N=i(m);N!==null&&yt(Q,N.startTime-P),Z=!1}}break t}finally{_=null,x=K,S=!1}Z=void 0}}finally{Z?ft():X=!1}}}var ft;if(typeof O=="function")ft=function(){O(k)};else if(typeof MessageChannel<"u"){var ct=new MessageChannel,vt=ct.port2;ct.port1.onmessage=k,ft=function(){vt.postMessage(null)}}else ft=function(){v(k,0)};function yt(P,Z){z=v(function(){P(r.unstable_now())},Z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(P){P.callback=null},r.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<P?Math.floor(1e3/P):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(P){switch(x){case 1:case 2:case 3:var Z=3;break;default:Z=x}var K=x;x=Z;try{return P()}finally{x=K}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(P,Z){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var K=x;x=P;try{return Z()}finally{x=K}},r.unstable_scheduleCallback=function(P,Z,K){var Mt=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?Mt+K:Mt):K=Mt,P){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=K+Tt,P={id:g++,callback:Z,priorityLevel:P,startTime:K,expirationTime:Tt,sortIndex:-1},K>Mt?(P.sortIndex=K,t(m,P),i(p)===null&&P===i(m)&&(A?(F(z),z=-1):A=!0,yt(Q,K-Mt))):(P.sortIndex=Tt,t(p,P),E||S||(E=!0,X||(X=!0,ft()))),P},r.unstable_shouldYield=C,r.unstable_wrapCallback=function(P){var Z=x;return function(){var K=x;x=Z;try{return P.apply(this,arguments)}finally{x=K}}}})(xh)),xh}var tv;function vS(){return tv||(tv=1,yh.exports=_S()),yh.exports}var Sh={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ev;function yS(){if(ev)return zn;ev=1;var r=ep();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)m+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:p,containerInfo:m,implementation:g}}var h=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,zn.createPortal=function(p,m){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,g)},zn.flushSync=function(p){var m=h.T,g=s.p;try{if(h.T=null,s.p=2,p)return p()}finally{h.T=m,s.p=g,s.d.f()}},zn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(p,m))},zn.prefetchDNS=function(p){typeof p=="string"&&s.d.D(p)},zn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var g=m.as,_=d(g,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,S=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;g==="style"?s.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:_,integrity:x,fetchPriority:S}):g==="script"&&s.d.X(p,{crossOrigin:_,integrity:x,fetchPriority:S,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},zn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var g=d(m.as,m.crossOrigin);s.d.M(p,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&s.d.M(p)},zn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var g=m.as,_=d(g,m.crossOrigin);s.d.L(p,g,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},zn.preloadModule=function(p,m){if(typeof p=="string")if(m){var g=d(m.as,m.crossOrigin);s.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else s.d.m(p)},zn.requestFormReset=function(p){s.d.r(p)},zn.unstable_batchedUpdates=function(p,m){return p(m)},zn.useFormState=function(p,m,g){return h.H.useFormState(p,m,g)},zn.useFormStatus=function(){return h.H.useHostTransitionStatus()},zn.version="19.2.8",zn}var nv;function xS(){if(nv)return Sh.exports;nv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Sh.exports=yS(),Sh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iv;function SS(){if(iv)return Yo;iv=1;var r=vS(),t=ep(),i=xS();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(s(188))}function m(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return p(u),e;if(f===o)return p(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=f;else{for(var y=!1,b=u.child;b;){if(b===a){y=!0,a=u,o=f;break}if(b===o){y=!0,o=u,a=f;break}b=b.sibling}if(!y){for(b=f.child;b;){if(b===a){y=!0,a=f,o=u;break}if(b===o){y=!0,o=f,a=u;break}b=b.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,x=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),F=Symbol.for("react.consumer"),O=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),J=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function ft(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}var ct=Symbol.for("react.client.reference");function vt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ct?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case A:return"Fragment";case v:return"Profiler";case M:return"StrictMode";case Q:return"Suspense";case X:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case O:return e.displayName||"Context";case F:return(e._context.displayName||"Context")+".Consumer";case U:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case z:return n=e.displayName||null,n!==null?n:vt(e.type)||"Memo";case J:n=e._payload,e=e._init;try{return vt(e(n))}catch{}}return null}var yt=Array.isArray,P=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},Mt=[],Tt=-1;function N(e){return{current:e}}function et(e){0>Tt||(e.current=Mt[Tt],Mt[Tt]=null,Tt--)}function Et(e,n){Tt++,Mt[Tt]=e.current,e.current=n}var w=N(null),H=N(null),st=N(null),dt=N(null);function Rt(e,n){switch(Et(st,n),Et(H,e),Et(w,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?v_(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=v_(n),e=y_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}et(w),Et(w,e)}function Ot(){et(w),et(H),et(st)}function ie(e){e.memoizedState!==null&&Et(dt,e);var n=w.current,a=y_(n,e.type);n!==a&&(Et(H,e),Et(w,a))}function Be(e){H.current===e&&(et(w),et(H)),dt.current===e&&(et(dt),Vo._currentValue=K)}var me,Qe;function G(e){if(me===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);me=n&&n[1]||"",Qe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+me+e+Qe}var On=!1;function de(e,n){if(!e||On)return"";On=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(lt){var nt=lt}Reflect.construct(e,[],_t)}else{try{_t.call()}catch(lt){nt=lt}e.call(_t.prototype)}}else{try{throw Error()}catch(lt){nt=lt}(_t=e())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(lt){if(lt&&nt&&typeof lt.stack=="string")return[lt.stack,nt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),y=f[0],b=f[1];if(y&&b){var B=y.split(`
`),tt=b.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===tt.length)for(o=B.length-1,u=tt.length-1;1<=o&&0<=u&&B[o]!==tt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==tt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==tt[u]){var ht=`
`+B[o].replace(" at new "," at ");return e.displayName&&ht.includes("<anonymous>")&&(ht=ht.replace("<anonymous>",e.displayName)),ht}while(1<=o&&0<=u);break}}}finally{On=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?G(a):""}function ye(e,n){switch(e.tag){case 26:case 27:case 5:return G(e.type);case 16:return G("Lazy");case 13:return e.child!==n&&n!==null?G("Suspense Fallback"):G("Suspense");case 19:return G("SuspenseList");case 0:case 15:return de(e.type,!1);case 11:return de(e.type.render,!1);case 1:return de(e.type,!0);case 31:return G("Activity");default:return""}}function Yt(e){try{var n="",a=null;do n+=ye(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Oe=Object.prototype.hasOwnProperty,qt=r.unstable_scheduleCallback,L=r.unstable_cancelCallback,T=r.unstable_shouldYield,it=r.unstable_requestPaint,pt=r.unstable_now,bt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,Xt=r.unstable_UserBlockingPriority,Dt=r.unstable_NormalPriority,Ft=r.unstable_LowPriority,xe=r.unstable_IdlePriority,At=r.log,Ht=r.unstable_setDisableYieldValue,jt=null,Wt=null;function Pt(e){if(typeof At=="function"&&Ht(e),Wt&&typeof Wt.setStrictMode=="function")try{Wt.setStrictMode(jt,e)}catch{}}var $t=Math.clz32?Math.clz32:W,oe=Math.log,Ie=Math.LN2;function W(e){return e>>>=0,e===0?32:31-(oe(e)/Ie|0)|0}var Ct=256,ut=262144,xt=4194304;function wt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ut(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,f=e.suspendedLanes,y=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~f,o!==0?u=wt(o):(y&=b,y!==0?u=wt(y):a||(a=b&~e,a!==0&&(u=wt(a))))):(b=o&~f,b!==0?u=wt(b):y!==0?u=wt(y):a||(a=o&~e,a!==0&&(u=wt(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function te(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Je(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function gn(){var e=xt;return xt<<=1,(xt&62914560)===0&&(xt=4194304),e}function Ae(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function Rn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function bi(e,n,a,o,u,f){var y=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,B=e.expirationTimes,tt=e.hiddenUpdates;for(a=y&~a;0<a;){var ht=31-$t(a),_t=1<<ht;b[ht]=0,B[ht]=-1;var nt=tt[ht];if(nt!==null)for(tt[ht]=null,ht=0;ht<nt.length;ht++){var lt=nt[ht];lt!==null&&(lt.lane&=-536870913)}a&=~_t}o!==0&&to(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(y&~n))}function to(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-$t(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function eo(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-$t(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function Bi(e,n){var a=n&-n;return a=(a&42)!==0?1:ns(a),(a&(e.suspendedLanes|n))!==0?0:a}function ns(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Gs(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function no(){var e=Z.p;return e!==0?e:(e=window.event,e===void 0?32:V_(e.type))}function is(e,n){var a=Z.p;try{return Z.p=e,n()}finally{Z.p=a}}var Ti=Math.random().toString(36).slice(2),en="__reactFiber$"+Ti,Cn="__reactProps$"+Ti,Yi="__reactContainer$"+Ti,io="__reactEvents$"+Ti,cu="__reactListeners$"+Ti,uu="__reactHandles$"+Ti,cl="__reactResources$"+Ti,as="__reactMarker$"+Ti;function R(e){delete e[en],delete e[Cn],delete e[io],delete e[cu],delete e[uu]}function q(e){var n=e[en];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Yi]||a[en]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=A_(e);e!==null;){if(a=e[en])return a;e=A_(e)}return n}e=a,a=e.parentNode}return null}function rt(e){if(e=e[en]||e[Yi]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function ot(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Y(e){var n=e[cl];return n||(n=e[cl]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function St(e){e[as]=!0}var Lt=new Set,It={};function Bt(e,n){Qt(e,n),Qt(e+"Capture",n)}function Qt(e,n){for(It[e]=n,e=0;e<n.length;e++)Lt.add(n[e])}var ee=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Zt={},Se={};function Re(e){return Oe.call(Se,e)?!0:Oe.call(Zt,e)?!1:ee.test(e)?Se[e]=!0:(Zt[e]=!0,!1)}function Ye(e,n,a){if(Re(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function We(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function le(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function Vt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function un(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ce(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,f.call(this,y)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Fn(e){if(!e._valueTracker){var n=un(e)?"checked":"value";e._valueTracker=Ce(e,n,""+e[n])}}function ji(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=un(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function En(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var ss=/[\n"\\]/g;function ge(e){return e.replace(ss,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Pn(e,n,a,o,u,f,y,b){e.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.type=y:e.removeAttribute("type"),n!=null?y==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Vt(n)):e.value!==""+Vt(n)&&(e.value=""+Vt(n)):y!=="submit"&&y!=="reset"||e.removeAttribute("value"),n!=null?_n(e,y,Vt(n)):a!=null?_n(e,y,Vt(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+Vt(b):e.removeAttribute("name")}function Hn(e,n,a,o,u,f,y,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Fn(e);return}a=a!=null?""+Vt(a):"",n=n!=null?""+Vt(n):a,b||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(e.name=y),Fn(e)}function _n(e,n,a){n==="number"&&En(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function on(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Vt(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Vs(e,n,a){if(n!=null&&(n=""+Vt(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Vt(a):""}function Ii(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(yt(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Vt(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Fn(e)}function ks(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var oy=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function mp(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||oy.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function gp(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&mp(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&mp(e,f,n[f])}function fu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ly=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),cy=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ul(e){return cy.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Zi(){}var hu=null;function du(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Xs=null,Ws=null;function _p(e){var n=rt(e);if(n&&(e=n.stateNode)){var a=e[Cn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Pn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ge(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Cn]||null;if(!u)throw Error(s(90));Pn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&ji(o)}break t;case"textarea":Vs(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&on(e,!!a.multiple,n,!1)}}}var pu=!1;function vp(e,n,a){if(pu)return e(n,a);pu=!0;try{var o=e(n);return o}finally{if(pu=!1,(Xs!==null||Ws!==null)&&(Ql(),Xs&&(n=Xs,e=Ws,Ws=Xs=null,_p(n),e)))for(n=0;n<e.length;n++)_p(e[n])}}function ao(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Cn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mu=!1;if(Ki)try{var so={};Object.defineProperty(so,"passive",{get:function(){mu=!0}}),window.addEventListener("test",so,so),window.removeEventListener("test",so,so)}catch{mu=!1}var Ma=null,gu=null,fl=null;function yp(){if(fl)return fl;var e,n=gu,a=n.length,o,u="value"in Ma?Ma.value:Ma.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var y=a-e;for(o=1;o<=y&&n[a-o]===u[f-o];o++);return fl=u.slice(e,1<o?1-o:void 0)}function hl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function dl(){return!0}function xp(){return!1}function Wn(e){function n(a,o,u,f,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=y,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?dl:xp,this.isPropagationStopped=xp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=dl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=dl)},persist:function(){},isPersistent:dl}),n}var rs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pl=Wn(rs),ro=_({},rs,{view:0,detail:0}),uy=Wn(ro),_u,vu,oo,ml=_({},ro,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==oo&&(oo&&e.type==="mousemove"?(_u=e.screenX-oo.screenX,vu=e.screenY-oo.screenY):vu=_u=0,oo=e),_u)},movementY:function(e){return"movementY"in e?e.movementY:vu}}),Sp=Wn(ml),fy=_({},ml,{dataTransfer:0}),hy=Wn(fy),dy=_({},ro,{relatedTarget:0}),yu=Wn(dy),py=_({},rs,{animationName:0,elapsedTime:0,pseudoElement:0}),my=Wn(py),gy=_({},rs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),_y=Wn(gy),vy=_({},rs,{data:0}),Mp=Wn(vy),yy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function My(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Sy[e])?!!n[e]:!1}function xu(){return My}var Ey=_({},ro,{key:function(e){if(e.key){var n=yy[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=hl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xu,charCode:function(e){return e.type==="keypress"?hl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?hl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),by=Wn(Ey),Ty=_({},ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ep=Wn(Ty),Ay=_({},ro,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xu}),Ry=Wn(Ay),Cy=_({},rs,{propertyName:0,elapsedTime:0,pseudoElement:0}),wy=Wn(Cy),Dy=_({},ml,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Uy=Wn(Dy),Ly=_({},rs,{newState:0,oldState:0}),Ny=Wn(Ly),Oy=[9,13,27,32],Su=Ki&&"CompositionEvent"in window,lo=null;Ki&&"documentMode"in document&&(lo=document.documentMode);var Py=Ki&&"TextEvent"in window&&!lo,bp=Ki&&(!Su||lo&&8<lo&&11>=lo),Tp=" ",Ap=!1;function Rp(e,n){switch(e){case"keyup":return Oy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qs=!1;function zy(e,n){switch(e){case"compositionend":return Cp(n);case"keypress":return n.which!==32?null:(Ap=!0,Tp);case"textInput":return e=n.data,e===Tp&&Ap?null:e;default:return null}}function By(e,n){if(qs)return e==="compositionend"||!Su&&Rp(e,n)?(e=yp(),fl=gu=Ma=null,qs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return bp&&n.locale!=="ko"?null:n.data;default:return null}}var Iy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Iy[e.type]:n==="textarea"}function Dp(e,n,a,o){Xs?Ws?Ws.push(o):Ws=[o]:Xs=o,n=ac(n,"onChange"),0<n.length&&(a=new pl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var co=null,uo=null;function Fy(e){h_(e,0)}function gl(e){var n=ot(e);if(ji(n))return e}function Up(e,n){if(e==="change")return n}var Lp=!1;if(Ki){var Mu;if(Ki){var Eu="oninput"in document;if(!Eu){var Np=document.createElement("div");Np.setAttribute("oninput","return;"),Eu=typeof Np.oninput=="function"}Mu=Eu}else Mu=!1;Lp=Mu&&(!document.documentMode||9<document.documentMode)}function Op(){co&&(co.detachEvent("onpropertychange",Pp),uo=co=null)}function Pp(e){if(e.propertyName==="value"&&gl(uo)){var n=[];Dp(n,uo,e,du(e)),vp(Fy,n)}}function Hy(e,n,a){e==="focusin"?(Op(),co=n,uo=a,co.attachEvent("onpropertychange",Pp)):e==="focusout"&&Op()}function Gy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return gl(uo)}function Vy(e,n){if(e==="click")return gl(n)}function ky(e,n){if(e==="input"||e==="change")return gl(n)}function Xy(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ni=typeof Object.is=="function"?Object.is:Xy;function fo(e,n){if(ni(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Oe.call(n,u)||!ni(e[u],n[u]))return!1}return!0}function zp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Bp(e,n){var a=zp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=zp(a)}}function Ip(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Ip(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Fp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=En(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=En(e.document)}return n}function bu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Wy=Ki&&"documentMode"in document&&11>=document.documentMode,Ys=null,Tu=null,ho=null,Au=!1;function Hp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Au||Ys==null||Ys!==En(o)||(o=Ys,"selectionStart"in o&&bu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),ho&&fo(ho,o)||(ho=o,o=ac(Tu,"onSelect"),0<o.length&&(n=new pl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Ys)))}function os(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var js={animationend:os("Animation","AnimationEnd"),animationiteration:os("Animation","AnimationIteration"),animationstart:os("Animation","AnimationStart"),transitionrun:os("Transition","TransitionRun"),transitionstart:os("Transition","TransitionStart"),transitioncancel:os("Transition","TransitionCancel"),transitionend:os("Transition","TransitionEnd")},Ru={},Gp={};Ki&&(Gp=document.createElement("div").style,"AnimationEvent"in window||(delete js.animationend.animation,delete js.animationiteration.animation,delete js.animationstart.animation),"TransitionEvent"in window||delete js.transitionend.transition);function ls(e){if(Ru[e])return Ru[e];if(!js[e])return e;var n=js[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Gp)return Ru[e]=n[a];return e}var Vp=ls("animationend"),kp=ls("animationiteration"),Xp=ls("animationstart"),qy=ls("transitionrun"),Yy=ls("transitionstart"),jy=ls("transitioncancel"),Wp=ls("transitionend"),qp=new Map,Cu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Cu.push("scrollEnd");function Ai(e,n){qp.set(e,n),Bt(n,[e])}var _l=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},hi=[],Zs=0,wu=0;function vl(){for(var e=Zs,n=wu=Zs=0;n<e;){var a=hi[n];hi[n++]=null;var o=hi[n];hi[n++]=null;var u=hi[n];hi[n++]=null;var f=hi[n];if(hi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}f!==0&&Yp(a,u,f)}}function yl(e,n,a,o){hi[Zs++]=e,hi[Zs++]=n,hi[Zs++]=a,hi[Zs++]=o,wu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Du(e,n,a,o){return yl(e,n,a,o),xl(e)}function cs(e,n){return yl(e,null,null,n),xl(e)}function Yp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-$t(a),e=f.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function xl(e){if(50<Po)throw Po=0,Hf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Ks={};function Zy(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,n,a,o){return new Zy(e,n,a,o)}function Uu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qi(e,n){var a=e.alternate;return a===null?(a=ii(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function jp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Sl(e,n,a,o,u,f){var y=0;if(o=e,typeof e=="function")Uu(e)&&(y=1);else if(typeof e=="string")y=tS(e,a,w.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ii(31,a,n,u),e.elementType=D,e.lanes=f,e;case A:return us(a.children,u,f,n);case M:y=8,u|=24;break;case v:return e=ii(12,a,n,u|2),e.elementType=v,e.lanes=f,e;case Q:return e=ii(13,a,n,u),e.elementType=Q,e.lanes=f,e;case X:return e=ii(19,a,n,u),e.elementType=X,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case O:y=10;break t;case F:y=9;break t;case U:y=11;break t;case z:y=14;break t;case J:y=16,o=null;break t}y=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ii(y,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function us(e,n,a,o){return e=ii(7,e,o,n),e.lanes=a,e}function Lu(e,n,a){return e=ii(6,e,null,n),e.lanes=a,e}function Zp(e){var n=ii(18,null,null,0);return n.stateNode=e,n}function Nu(e,n,a){return n=ii(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Kp=new WeakMap;function di(e,n){if(typeof e=="object"&&e!==null){var a=Kp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:Yt(n)},Kp.set(e,n),n)}return{value:e,source:n,stack:Yt(n)}}var Qs=[],Js=0,Ml=null,po=0,pi=[],mi=0,Ea=null,Fi=1,Hi="";function Ji(e,n){Qs[Js++]=po,Qs[Js++]=Ml,Ml=e,po=n}function Qp(e,n,a){pi[mi++]=Fi,pi[mi++]=Hi,pi[mi++]=Ea,Ea=e;var o=Fi;e=Hi;var u=32-$t(o)-1;o&=~(1<<u),a+=1;var f=32-$t(n)+u;if(30<f){var y=u-u%5;f=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Fi=1<<32-$t(n)+u|a<<u|o,Hi=f+e}else Fi=1<<f|a<<u|o,Hi=e}function Ou(e){e.return!==null&&(Ji(e,1),Qp(e,1,0))}function Pu(e){for(;e===Ml;)Ml=Qs[--Js],Qs[Js]=null,po=Qs[--Js],Qs[Js]=null;for(;e===Ea;)Ea=pi[--mi],pi[mi]=null,Hi=pi[--mi],pi[mi]=null,Fi=pi[--mi],pi[mi]=null}function Jp(e,n){pi[mi++]=Fi,pi[mi++]=Hi,pi[mi++]=Ea,Fi=n.id,Hi=n.overflow,Ea=e}var wn=null,je=null,be=!1,ba=null,gi=!1,zu=Error(s(519));function Ta(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw mo(di(n,e)),zu}function $p(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[en]=e,n[Cn]=o,a){case"dialog":ve("cancel",n),ve("close",n);break;case"iframe":case"object":case"embed":ve("load",n);break;case"video":case"audio":for(a=0;a<Bo.length;a++)ve(Bo[a],n);break;case"source":ve("error",n);break;case"img":case"image":case"link":ve("error",n),ve("load",n);break;case"details":ve("toggle",n);break;case"input":ve("invalid",n),Hn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":ve("invalid",n);break;case"textarea":ve("invalid",n),Ii(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||g_(n.textContent,a)?(o.popover!=null&&(ve("beforetoggle",n),ve("toggle",n)),o.onScroll!=null&&ve("scroll",n),o.onScrollEnd!=null&&ve("scrollend",n),o.onClick!=null&&(n.onclick=Zi),n=!0):n=!1,n||Ta(e,!0)}function tm(e){for(wn=e.return;wn;)switch(wn.tag){case 5:case 31:case 13:gi=!1;return;case 27:case 3:gi=!0;return;default:wn=wn.return}}function $s(e){if(e!==wn)return!1;if(!be)return tm(e),be=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||eh(e.type,e.memoizedProps)),a=!a),a&&je&&Ta(e),tm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=T_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=T_(e)}else n===27?(n=je,Fa(e.type)?(e=rh,rh=null,je=e):je=n):je=wn?vi(e.stateNode.nextSibling):null;return!0}function fs(){je=wn=null,be=!1}function Bu(){var e=ba;return e!==null&&(Zn===null?Zn=e:Zn.push.apply(Zn,e),ba=null),e}function mo(e){ba===null?ba=[e]:ba.push(e)}var Iu=N(null),hs=null,$i=null;function Aa(e,n,a){Et(Iu,n._currentValue),n._currentValue=a}function ta(e){e._currentValue=Iu.current,et(Iu)}function Fu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Hu(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var y=u.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=u;for(var B=0;B<n.length;B++)if(b.context===n[B]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),Fu(f.return,a,e),o||(y=null);break t}f=b.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,f=y.alternate,f!==null&&(f.lanes|=a),Fu(y,a,e),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===e){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function tr(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var b=u.type;ni(u.pendingProps.value,y.value)||(e!==null?e.push(b):e=[b])}}else if(u===dt.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Vo):e=[Vo])}u=u.return}e!==null&&Hu(n,e,a,o),n.flags|=262144}function El(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ds(e){hs=e,$i=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Dn(e){return em(hs,e)}function bl(e,n){return hs===null&&ds(e),em(e,n)}function em(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},$i===null){if(e===null)throw Error(s(308));$i=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else $i=$i.next=n;return a}var Ky=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Qy=r.unstable_scheduleCallback,Jy=r.unstable_NormalPriority,fn={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Gu(){return{controller:new Ky,data:new Map,refCount:0}}function go(e){e.refCount--,e.refCount===0&&Qy(Jy,function(){e.controller.abort()})}var _o=null,Vu=0,er=0,nr=null;function $y(e,n){if(_o===null){var a=_o=[];Vu=0,er=qf(),nr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Vu++,n.then(nm,nm),n}function nm(){if(--Vu===0&&_o!==null){nr!==null&&(nr.status="fulfilled");var e=_o;_o=null,er=0,nr=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function tx(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var im=P.S;P.S=function(e,n){Hg=pt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&$y(e,n),im!==null&&im(e,n)};var ps=N(null);function ku(){var e=ps.current;return e!==null?e:qe.pooledCache}function Tl(e,n){n===null?Et(ps,ps.current):Et(ps,n.pool)}function am(){var e=ku();return e===null?null:{parent:fn._currentValue,pool:e}}var ir=Error(s(460)),Xu=Error(s(474)),Al=Error(s(542)),Rl={then:function(){}};function sm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function rm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Zi,Zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,lm(e),e;default:if(typeof n.status=="string")n.then(Zi,Zi);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,lm(e),e}throw gs=n,ir}}function ms(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(gs=a,ir):a}}var gs=null;function om(){if(gs===null)throw Error(s(459));var e=gs;return gs=null,e}function lm(e){if(e===ir||e===Al)throw Error(s(483))}var ar=null,vo=0;function Cl(e){var n=vo;return vo+=1,ar===null&&(ar=[]),rm(ar,e,n)}function yo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function wl(e,n){throw n.$$typeof===x?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function cm(e){function n(j,V){if(e){var $=j.deletions;$===null?(j.deletions=[V],j.flags|=16):$.push(V)}}function a(j,V){if(!e)return null;for(;V!==null;)n(j,V),V=V.sibling;return null}function o(j){for(var V=new Map;j!==null;)j.key!==null?V.set(j.key,j):V.set(j.index,j),j=j.sibling;return V}function u(j,V){return j=Qi(j,V),j.index=0,j.sibling=null,j}function f(j,V,$){return j.index=$,e?($=j.alternate,$!==null?($=$.index,$<V?(j.flags|=67108866,V):$):(j.flags|=67108866,V)):(j.flags|=1048576,V)}function y(j){return e&&j.alternate===null&&(j.flags|=67108866),j}function b(j,V,$,mt){return V===null||V.tag!==6?(V=Lu($,j.mode,mt),V.return=j,V):(V=u(V,$),V.return=j,V)}function B(j,V,$,mt){var Kt=$.type;return Kt===A?ht(j,V,$.props.children,mt,$.key):V!==null&&(V.elementType===Kt||typeof Kt=="object"&&Kt!==null&&Kt.$$typeof===J&&ms(Kt)===V.type)?(V=u(V,$.props),yo(V,$),V.return=j,V):(V=Sl($.type,$.key,$.props,null,j.mode,mt),yo(V,$),V.return=j,V)}function tt(j,V,$,mt){return V===null||V.tag!==4||V.stateNode.containerInfo!==$.containerInfo||V.stateNode.implementation!==$.implementation?(V=Nu($,j.mode,mt),V.return=j,V):(V=u(V,$.children||[]),V.return=j,V)}function ht(j,V,$,mt,Kt){return V===null||V.tag!==7?(V=us($,j.mode,mt,Kt),V.return=j,V):(V=u(V,$),V.return=j,V)}function _t(j,V,$){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=Lu(""+V,j.mode,$),V.return=j,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case S:return $=Sl(V.type,V.key,V.props,null,j.mode,$),yo($,V),$.return=j,$;case E:return V=Nu(V,j.mode,$),V.return=j,V;case J:return V=ms(V),_t(j,V,$)}if(yt(V)||ft(V))return V=us(V,j.mode,$,null),V.return=j,V;if(typeof V.then=="function")return _t(j,Cl(V),$);if(V.$$typeof===O)return _t(j,bl(j,V),$);wl(j,V)}return null}function nt(j,V,$,mt){var Kt=V!==null?V.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Kt!==null?null:b(j,V,""+$,mt);if(typeof $=="object"&&$!==null){switch($.$$typeof){case S:return $.key===Kt?B(j,V,$,mt):null;case E:return $.key===Kt?tt(j,V,$,mt):null;case J:return $=ms($),nt(j,V,$,mt)}if(yt($)||ft($))return Kt!==null?null:ht(j,V,$,mt,null);if(typeof $.then=="function")return nt(j,V,Cl($),mt);if($.$$typeof===O)return nt(j,V,bl(j,$),mt);wl(j,$)}return null}function lt(j,V,$,mt,Kt){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return j=j.get($)||null,b(V,j,""+mt,Kt);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case S:return j=j.get(mt.key===null?$:mt.key)||null,B(V,j,mt,Kt);case E:return j=j.get(mt.key===null?$:mt.key)||null,tt(V,j,mt,Kt);case J:return mt=ms(mt),lt(j,V,$,mt,Kt)}if(yt(mt)||ft(mt))return j=j.get($)||null,ht(V,j,mt,Kt,null);if(typeof mt.then=="function")return lt(j,V,$,Cl(mt),Kt);if(mt.$$typeof===O)return lt(j,V,$,bl(V,mt),Kt);wl(V,mt)}return null}function Gt(j,V,$,mt){for(var Kt=null,we=null,kt=V,ue=V=0,Ee=null;kt!==null&&ue<$.length;ue++){kt.index>ue?(Ee=kt,kt=null):Ee=kt.sibling;var De=nt(j,kt,$[ue],mt);if(De===null){kt===null&&(kt=Ee);break}e&&kt&&De.alternate===null&&n(j,kt),V=f(De,V,ue),we===null?Kt=De:we.sibling=De,we=De,kt=Ee}if(ue===$.length)return a(j,kt),be&&Ji(j,ue),Kt;if(kt===null){for(;ue<$.length;ue++)kt=_t(j,$[ue],mt),kt!==null&&(V=f(kt,V,ue),we===null?Kt=kt:we.sibling=kt,we=kt);return be&&Ji(j,ue),Kt}for(kt=o(kt);ue<$.length;ue++)Ee=lt(kt,j,ue,$[ue],mt),Ee!==null&&(e&&Ee.alternate!==null&&kt.delete(Ee.key===null?ue:Ee.key),V=f(Ee,V,ue),we===null?Kt=Ee:we.sibling=Ee,we=Ee);return e&&kt.forEach(function(Xa){return n(j,Xa)}),be&&Ji(j,ue),Kt}function Jt(j,V,$,mt){if($==null)throw Error(s(151));for(var Kt=null,we=null,kt=V,ue=V=0,Ee=null,De=$.next();kt!==null&&!De.done;ue++,De=$.next()){kt.index>ue?(Ee=kt,kt=null):Ee=kt.sibling;var Xa=nt(j,kt,De.value,mt);if(Xa===null){kt===null&&(kt=Ee);break}e&&kt&&Xa.alternate===null&&n(j,kt),V=f(Xa,V,ue),we===null?Kt=Xa:we.sibling=Xa,we=Xa,kt=Ee}if(De.done)return a(j,kt),be&&Ji(j,ue),Kt;if(kt===null){for(;!De.done;ue++,De=$.next())De=_t(j,De.value,mt),De!==null&&(V=f(De,V,ue),we===null?Kt=De:we.sibling=De,we=De);return be&&Ji(j,ue),Kt}for(kt=o(kt);!De.done;ue++,De=$.next())De=lt(kt,j,ue,De.value,mt),De!==null&&(e&&De.alternate!==null&&kt.delete(De.key===null?ue:De.key),V=f(De,V,ue),we===null?Kt=De:we.sibling=De,we=De);return e&&kt.forEach(function(fS){return n(j,fS)}),be&&Ji(j,ue),Kt}function Ge(j,V,$,mt){if(typeof $=="object"&&$!==null&&$.type===A&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case S:t:{for(var Kt=$.key;V!==null;){if(V.key===Kt){if(Kt=$.type,Kt===A){if(V.tag===7){a(j,V.sibling),mt=u(V,$.props.children),mt.return=j,j=mt;break t}}else if(V.elementType===Kt||typeof Kt=="object"&&Kt!==null&&Kt.$$typeof===J&&ms(Kt)===V.type){a(j,V.sibling),mt=u(V,$.props),yo(mt,$),mt.return=j,j=mt;break t}a(j,V);break}else n(j,V);V=V.sibling}$.type===A?(mt=us($.props.children,j.mode,mt,$.key),mt.return=j,j=mt):(mt=Sl($.type,$.key,$.props,null,j.mode,mt),yo(mt,$),mt.return=j,j=mt)}return y(j);case E:t:{for(Kt=$.key;V!==null;){if(V.key===Kt)if(V.tag===4&&V.stateNode.containerInfo===$.containerInfo&&V.stateNode.implementation===$.implementation){a(j,V.sibling),mt=u(V,$.children||[]),mt.return=j,j=mt;break t}else{a(j,V);break}else n(j,V);V=V.sibling}mt=Nu($,j.mode,mt),mt.return=j,j=mt}return y(j);case J:return $=ms($),Ge(j,V,$,mt)}if(yt($))return Gt(j,V,$,mt);if(ft($)){if(Kt=ft($),typeof Kt!="function")throw Error(s(150));return $=Kt.call($),Jt(j,V,$,mt)}if(typeof $.then=="function")return Ge(j,V,Cl($),mt);if($.$$typeof===O)return Ge(j,V,bl(j,$),mt);wl(j,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,V!==null&&V.tag===6?(a(j,V.sibling),mt=u(V,$),mt.return=j,j=mt):(a(j,V),mt=Lu($,j.mode,mt),mt.return=j,j=mt),y(j)):a(j,V)}return function(j,V,$,mt){try{vo=0;var Kt=Ge(j,V,$,mt);return ar=null,Kt}catch(kt){if(kt===ir||kt===Al)throw kt;var we=ii(29,kt,null,j.mode);return we.lanes=mt,we.return=j,we}finally{}}}var _s=cm(!0),um=cm(!1),Ra=!1;function Wu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ca(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function wa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=xl(e),Yp(e,null,a),n}return yl(e,o,n,a),xl(e)}function xo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,eo(e,a)}}function Yu(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=y:f=f.next=y,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var ju=!1;function So(){if(ju){var e=nr;if(e!==null)throw e}}function Mo(e,n,a,o){ju=!1;var u=e.updateQueue;Ra=!1;var f=u.firstBaseUpdate,y=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var B=b,tt=B.next;B.next=null,y===null?f=tt:y.next=tt,y=B;var ht=e.alternate;ht!==null&&(ht=ht.updateQueue,b=ht.lastBaseUpdate,b!==y&&(b===null?ht.firstBaseUpdate=tt:b.next=tt,ht.lastBaseUpdate=B))}if(f!==null){var _t=u.baseState;y=0,ht=tt=B=null,b=f;do{var nt=b.lane&-536870913,lt=nt!==b.lane;if(lt?(Me&nt)===nt:(o&nt)===nt){nt!==0&&nt===er&&(ju=!0),ht!==null&&(ht=ht.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Gt=e,Jt=b;nt=n;var Ge=a;switch(Jt.tag){case 1:if(Gt=Jt.payload,typeof Gt=="function"){_t=Gt.call(Ge,_t,nt);break t}_t=Gt;break t;case 3:Gt.flags=Gt.flags&-65537|128;case 0:if(Gt=Jt.payload,nt=typeof Gt=="function"?Gt.call(Ge,_t,nt):Gt,nt==null)break t;_t=_({},_t,nt);break t;case 2:Ra=!0}}nt=b.callback,nt!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[nt]:lt.push(nt))}else lt={lane:nt,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ht===null?(tt=ht=lt,B=_t):ht=ht.next=lt,y|=nt;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;lt=b,b=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);ht===null&&(B=_t),u.baseState=B,u.firstBaseUpdate=tt,u.lastBaseUpdate=ht,f===null&&(u.shared.lanes=0),Oa|=y,e.lanes=y,e.memoizedState=_t}}function fm(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function hm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)fm(a[e],n)}var sr=N(null),Dl=N(0);function dm(e,n){e=ca,Et(Dl,e),Et(sr,n),ca=e|n.baseLanes}function Zu(){Et(Dl,ca),Et(sr,sr.current)}function Ku(){ca=Dl.current,et(sr),et(Dl)}var ai=N(null),_i=null;function Da(e){var n=e.alternate;Et(ln,ln.current&1),Et(ai,e),_i===null&&(n===null||sr.current!==null||n.memoizedState!==null)&&(_i=e)}function Qu(e){Et(ln,ln.current),Et(ai,e),_i===null&&(_i=e)}function pm(e){e.tag===22?(Et(ln,ln.current),Et(ai,e),_i===null&&(_i=e)):Ua()}function Ua(){Et(ln,ln.current),Et(ai,ai.current)}function si(e){et(ai),_i===e&&(_i=null),et(ln)}var ln=N(0);function Ul(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ah(a)||sh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ea=0,ce=null,Fe=null,hn=null,Ll=!1,rr=!1,vs=!1,Nl=0,Eo=0,or=null,ex=0;function nn(){throw Error(s(321))}function Ju(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ni(e[a],n[a]))return!1;return!0}function $u(e,n,a,o,u,f){return ea=f,ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,P.H=e===null||e.memoizedState===null?Qm:mf,vs=!1,f=a(o,u),vs=!1,rr&&(f=gm(n,a,o,u)),mm(e),f}function mm(e){P.H=Ao;var n=Fe!==null&&Fe.next!==null;if(ea=0,hn=Fe=ce=null,Ll=!1,Eo=0,or=null,n)throw Error(s(300));e===null||dn||(e=e.dependencies,e!==null&&El(e)&&(dn=!0))}function gm(e,n,a,o){ce=e;var u=0;do{if(rr&&(or=null),Eo=0,rr=!1,25<=u)throw Error(s(301));if(u+=1,hn=Fe=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}P.H=Jm,f=n(a,o)}while(rr);return f}function nx(){var e=P.H,n=e.useState()[0];return n=typeof n.then=="function"?bo(n):n,e=e.useState()[0],(Fe!==null?Fe.memoizedState:null)!==e&&(ce.flags|=1024),n}function tf(){var e=Nl!==0;return Nl=0,e}function ef(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function nf(e){if(Ll){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Ll=!1}ea=0,hn=Fe=ce=null,rr=!1,Eo=Nl=0,or=null}function Gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?ce.memoizedState=hn=e:hn=hn.next=e,hn}function cn(){if(Fe===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Fe.next;var n=hn===null?ce.memoizedState:hn.next;if(n!==null)hn=n,Fe=e;else{if(e===null)throw ce.alternate===null?Error(s(467)):Error(s(310));Fe=e,e={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},hn===null?ce.memoizedState=hn=e:hn=hn.next=e}return hn}function Ol(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function bo(e){var n=Eo;return Eo+=1,or===null&&(or=[]),e=rm(or,e,n),n=ce,(hn===null?n.memoizedState:hn.next)===null&&(n=n.alternate,P.H=n===null||n.memoizedState===null?Qm:mf),e}function Pl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return bo(e);if(e.$$typeof===O)return Dn(e)}throw Error(s(438,String(e)))}function af(e){var n=null,a=ce.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ce.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ol(),ce.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=C;return n.index++,a}function na(e,n){return typeof n=="function"?n(e):n}function zl(e){var n=cn();return sf(n,Fe,e)}function sf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var y=u.next;u.next=f.next,f.next=y}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var b=y=null,B=null,tt=n,ht=!1;do{var _t=tt.lane&-536870913;if(_t!==tt.lane?(Me&_t)===_t:(ea&_t)===_t){var nt=tt.revertLane;if(nt===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),_t===er&&(ht=!0);else if((ea&nt)===nt){tt=tt.next,nt===er&&(ht=!0);continue}else _t={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(b=B=_t,y=f):B=B.next=_t,ce.lanes|=nt,Oa|=nt;_t=tt.action,vs&&a(f,_t),f=tt.hasEagerState?tt.eagerState:a(f,_t)}else nt={lane:_t,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(b=B=nt,y=f):B=B.next=nt,ce.lanes|=_t,Oa|=_t;tt=tt.next}while(tt!==null&&tt!==n);if(B===null?y=f:B.next=b,!ni(f,e.memoizedState)&&(dn=!0,ht&&(a=nr,a!==null)))throw a;e.memoizedState=f,e.baseState=y,e.baseQueue=B,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function rf(e){var n=cn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do f=e(f,y.action),y=y.next;while(y!==u);ni(f,n.memoizedState)||(dn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function _m(e,n,a){var o=ce,u=cn(),f=be;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!ni((Fe||u).memoizedState,a);if(y&&(u.memoizedState=a,dn=!0),u=u.queue,cf(xm.bind(null,o,u,e),[e]),u.getSnapshot!==n||y||hn!==null&&hn.memoizedState.tag&1){if(o.flags|=2048,lr(9,{destroy:void 0},ym.bind(null,o,u,a,n),null),qe===null)throw Error(s(349));f||(ea&127)!==0||vm(o,n,a)}return a}function vm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ce.updateQueue,n===null?(n=Ol(),ce.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function ym(e,n,a,o){n.value=a,n.getSnapshot=o,Sm(n)&&Mm(e)}function xm(e,n,a){return a(function(){Sm(n)&&Mm(e)})}function Sm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ni(e,a)}catch{return!0}}function Mm(e){var n=cs(e,2);n!==null&&Kn(n,e,2)}function of(e){var n=Gn();if(typeof e=="function"){var a=e;if(e=a(),vs){Pt(!0);try{a()}finally{Pt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:e},n}function Em(e,n,a,o){return e.baseState=a,sf(e,Fe,typeof o=="function"?o:na)}function ix(e,n,a,o,u){if(Fl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){f.listeners.push(y)}};P.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,bm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function bm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=P.T,y={};P.T=y;try{var b=a(u,o),B=P.S;B!==null&&B(y,b),Tm(e,n,b)}catch(tt){lf(e,n,tt)}finally{f!==null&&y.types!==null&&(f.types=y.types),P.T=f}}else try{f=a(u,o),Tm(e,n,f)}catch(tt){lf(e,n,tt)}}function Tm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Am(e,n,o)},function(o){return lf(e,n,o)}):Am(e,n,a)}function Am(e,n,a){n.status="fulfilled",n.value=a,Rm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,bm(e,a)))}function lf(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Rm(n),n=n.next;while(n!==o)}e.action=null}function Rm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Cm(e,n){return n}function wm(e,n){if(be){var a=qe.formState;if(a!==null){t:{var o=ce;if(be){if(je){e:{for(var u=je,f=gi;u.nodeType!==8;){if(!f){u=null;break e}if(u=vi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){je=vi(u.nextSibling),o=u.data==="F!";break t}}Ta(o)}o=!1}o&&(n=a[0])}}return a=Gn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Cm,lastRenderedState:n},a.queue=o,a=jm.bind(null,ce,o),o.dispatch=a,o=of(!1),f=pf.bind(null,ce,!1,o.queue),o=Gn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=ix.bind(null,ce,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Dm(e){var n=cn();return Um(n,Fe,e)}function Um(e,n,a){if(n=sf(e,n,Cm)[0],e=zl(na)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=bo(n)}catch(y){throw y===ir?Al:y}else o=n;n=cn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ce.flags|=2048,lr(9,{destroy:void 0},ax.bind(null,u,a),null)),[o,f,e]}function ax(e,n){e.action=n}function Lm(e){var n=cn(),a=Fe;if(a!==null)return Um(n,a,e);cn(),n=n.memoizedState,a=cn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function lr(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ce.updateQueue,n===null&&(n=Ol(),ce.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Nm(){return cn().memoizedState}function Bl(e,n,a,o){var u=Gn();ce.flags|=e,u.memoizedState=lr(1|n,{destroy:void 0},a,o===void 0?null:o)}function Il(e,n,a,o){var u=cn();o=o===void 0?null:o;var f=u.memoizedState.inst;Fe!==null&&o!==null&&Ju(o,Fe.memoizedState.deps)?u.memoizedState=lr(n,f,a,o):(ce.flags|=e,u.memoizedState=lr(1|n,f,a,o))}function Om(e,n){Bl(8390656,8,e,n)}function cf(e,n){Il(2048,8,e,n)}function sx(e){ce.flags|=4;var n=ce.updateQueue;if(n===null)n=Ol(),ce.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Pm(e){var n=cn().memoizedState;return sx({ref:n,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function zm(e,n){return Il(4,2,e,n)}function Bm(e,n){return Il(4,4,e,n)}function Im(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Fm(e,n,a){a=a!=null?a.concat([e]):null,Il(4,4,Im.bind(null,n,e),a)}function uf(){}function Hm(e,n){var a=cn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Ju(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Gm(e,n){var a=cn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Ju(n,o[1]))return o[0];if(o=e(),vs){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[o,n],o}function ff(e,n,a){return a===void 0||(ea&1073741824)!==0&&(Me&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=Vg(),ce.lanes|=e,Oa|=e,a)}function Vm(e,n,a,o){return ni(a,n)?a:sr.current!==null?(e=ff(e,a,o),ni(e,n)||(dn=!0),e):(ea&42)===0||(ea&1073741824)!==0&&(Me&261930)===0?(dn=!0,e.memoizedState=a):(e=Vg(),ce.lanes|=e,Oa|=e,n)}function km(e,n,a,o,u){var f=Z.p;Z.p=f!==0&&8>f?f:8;var y=P.T,b={};P.T=b,pf(e,!1,n,a);try{var B=u(),tt=P.S;if(tt!==null&&tt(b,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ht=tx(B,o);To(e,n,ht,li(e))}else To(e,n,o,li(e))}catch(_t){To(e,n,{then:function(){},status:"rejected",reason:_t},li())}finally{Z.p=f,y!==null&&b.types!==null&&(y.types=b.types),P.T=y}}function rx(){}function hf(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=Xm(e).queue;km(e,u,n,K,a===null?rx:function(){return Wm(e),a(o)})}function Xm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Wm(e){var n=Xm(e);n.next===null&&(n=e.alternate.memoizedState),To(e,n.next.queue,{},li())}function df(){return Dn(Vo)}function qm(){return cn().memoizedState}function Ym(){return cn().memoizedState}function ox(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=li();e=Ca(a);var o=wa(n,e,a);o!==null&&(Kn(o,n,a),xo(o,n,a)),n={cache:Gu()},e.payload=n;return}n=n.return}}function lx(e,n,a){var o=li();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Fl(e)?Zm(n,a):(a=Du(e,n,a,o),a!==null&&(Kn(a,e,o),Km(a,n,o)))}function jm(e,n,a){var o=li();To(e,n,a,o)}function To(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Fl(e))Zm(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var y=n.lastRenderedState,b=f(y,a);if(u.hasEagerState=!0,u.eagerState=b,ni(b,y))return yl(e,n,u,0),qe===null&&vl(),!1}catch{}finally{}if(a=Du(e,n,u,o),a!==null)return Kn(a,e,o),Km(a,n,o),!0}return!1}function pf(e,n,a,o){if(o={lane:2,revertLane:qf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Fl(e)){if(n)throw Error(s(479))}else n=Du(e,a,o,2),n!==null&&Kn(n,e,2)}function Fl(e){var n=e.alternate;return e===ce||n!==null&&n===ce}function Zm(e,n){rr=Ll=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Km(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,eo(e,a)}}var Ao={readContext:Dn,use:Pl,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};Ao.useEffectEvent=nn;var Qm={readContext:Dn,use:Pl,useCallback:function(e,n){return Gn().memoizedState=[e,n===void 0?null:n],e},useContext:Dn,useEffect:Om,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Bl(4194308,4,Im.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Bl(4194308,4,e,n)},useInsertionEffect:function(e,n){Bl(4,2,e,n)},useMemo:function(e,n){var a=Gn();n=n===void 0?null:n;var o=e();if(vs){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Gn();if(a!==void 0){var u=a(n);if(vs){Pt(!0);try{a(n)}finally{Pt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=lx.bind(null,ce,e),[o.memoizedState,e]},useRef:function(e){var n=Gn();return e={current:e},n.memoizedState=e},useState:function(e){e=of(e);var n=e.queue,a=jm.bind(null,ce,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:uf,useDeferredValue:function(e,n){var a=Gn();return ff(a,e,n)},useTransition:function(){var e=of(!1);return e=km.bind(null,ce,e.queue,!0,!1),Gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ce,u=Gn();if(be){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),qe===null)throw Error(s(349));(Me&127)!==0||vm(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Om(xm.bind(null,o,f,e),[e]),o.flags|=2048,lr(9,{destroy:void 0},ym.bind(null,o,f,a,n),null),a},useId:function(){var e=Gn(),n=qe.identifierPrefix;if(be){var a=Hi,o=Fi;a=(o&~(1<<32-$t(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Nl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=ex++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:df,useFormState:wm,useActionState:wm,useOptimistic:function(e){var n=Gn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=pf.bind(null,ce,!0,a),a.dispatch=n,[e,n]},useMemoCache:af,useCacheRefresh:function(){return Gn().memoizedState=ox.bind(null,ce)},useEffectEvent:function(e){var n=Gn(),a={impl:e};return n.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},mf={readContext:Dn,use:Pl,useCallback:Hm,useContext:Dn,useEffect:cf,useImperativeHandle:Fm,useInsertionEffect:zm,useLayoutEffect:Bm,useMemo:Gm,useReducer:zl,useRef:Nm,useState:function(){return zl(na)},useDebugValue:uf,useDeferredValue:function(e,n){var a=cn();return Vm(a,Fe.memoizedState,e,n)},useTransition:function(){var e=zl(na)[0],n=cn().memoizedState;return[typeof e=="boolean"?e:bo(e),n]},useSyncExternalStore:_m,useId:qm,useHostTransitionStatus:df,useFormState:Dm,useActionState:Dm,useOptimistic:function(e,n){var a=cn();return Em(a,Fe,e,n)},useMemoCache:af,useCacheRefresh:Ym};mf.useEffectEvent=Pm;var Jm={readContext:Dn,use:Pl,useCallback:Hm,useContext:Dn,useEffect:cf,useImperativeHandle:Fm,useInsertionEffect:zm,useLayoutEffect:Bm,useMemo:Gm,useReducer:rf,useRef:Nm,useState:function(){return rf(na)},useDebugValue:uf,useDeferredValue:function(e,n){var a=cn();return Fe===null?ff(a,e,n):Vm(a,Fe.memoizedState,e,n)},useTransition:function(){var e=rf(na)[0],n=cn().memoizedState;return[typeof e=="boolean"?e:bo(e),n]},useSyncExternalStore:_m,useId:qm,useHostTransitionStatus:df,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,n){var a=cn();return Fe!==null?Em(a,Fe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:af,useCacheRefresh:Ym};Jm.useEffectEvent=Pm;function gf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var _f={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=li(),u=Ca(o);u.payload=n,a!=null&&(u.callback=a),n=wa(e,u,o),n!==null&&(Kn(n,e,o),xo(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=li(),u=Ca(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=wa(e,u,o),n!==null&&(Kn(n,e,o),xo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=li(),o=Ca(a);o.tag=2,n!=null&&(o.callback=n),n=wa(e,o,a),n!==null&&(Kn(n,e,a),xo(n,e,a))}};function $m(e,n,a,o,u,f,y){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,y):n.prototype&&n.prototype.isPureReactComponent?!fo(a,o)||!fo(u,f):!0}function tg(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&_f.enqueueReplaceState(n,n.state,null)}function ys(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function eg(e){_l(e)}function ng(e){console.error(e)}function ig(e){_l(e)}function Hl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function ag(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function vf(e,n,a){return a=Ca(a),a.tag=3,a.payload={element:null},a.callback=function(){Hl(e,n)},a}function sg(e){return e=Ca(e),e.tag=3,e}function rg(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){ag(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(e.callback=function(){ag(n,a,o),typeof u!="function"&&(Pa===null?Pa=new Set([this]):Pa.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function cx(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&tr(n,a,u,!0),a=ai.current,a!==null){switch(a.tag){case 31:case 13:return _i===null?Jl():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Rl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),kf(e,o,u)),!1;case 22:return a.flags|=65536,o===Rl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),kf(e,o,u)),!1}throw Error(s(435,a.tag))}return kf(e,o,u),Jl(),!1}if(be)return n=ai.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==zu&&(e=Error(s(422),{cause:o}),mo(di(e,a)))):(o!==zu&&(n=Error(s(423),{cause:o}),mo(di(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=di(o,a),u=vf(e.stateNode,o,u),Yu(e,u),an!==4&&(an=2)),!1;var f=Error(s(520),{cause:o});if(f=di(f,a),Oo===null?Oo=[f]:Oo.push(f),an!==4&&(an=2),n===null)return!0;o=di(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=vf(a.stateNode,o,e),Yu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Pa===null||!Pa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=sg(u),rg(u,e,a,o),Yu(a,u),!1}a=a.return}while(a!==null);return!1}var yf=Error(s(461)),dn=!1;function Un(e,n,a,o){n.child=e===null?um(n,null,a,o):_s(n,e.child,a,o)}function og(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var y={};for(var b in o)b!=="ref"&&(y[b]=o[b])}else y=o;return ds(n),o=$u(e,n,a,y,f,u),b=tf(),e!==null&&!dn?(ef(e,n,u),ia(e,n,u)):(be&&b&&Ou(n),n.flags|=1,Un(e,n,o,u),n.child)}function lg(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Uu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,cg(e,n,f,o,u)):(e=Sl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Rf(e,u)){var y=f.memoizedProps;if(a=a.compare,a=a!==null?a:fo,a(y,o)&&e.ref===n.ref)return ia(e,n,u)}return n.flags|=1,e=Qi(f,o),e.ref=n.ref,e.return=n,n.child=e}function cg(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if(fo(f,o)&&e.ref===n.ref)if(dn=!1,n.pendingProps=o=f,Rf(e,u))(e.flags&131072)!==0&&(dn=!0);else return n.lanes=e.lanes,ia(e,n,u)}return xf(e,n,a,o,u)}function ug(e,n,a,o){var u=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return fg(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Tl(n,f!==null?f.cachePool:null),f!==null?dm(n,f):Zu(),pm(n);else return o=n.lanes=536870912,fg(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Tl(n,f.cachePool),dm(n,f),Ua(),n.memoizedState=null):(e!==null&&Tl(n,null),Zu(),Ua());return Un(e,n,u,a),n.child}function Ro(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function fg(e,n,a,o,u){var f=ku();return f=f===null?null:{parent:fn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&Tl(n,null),Zu(),pm(n),e!==null&&tr(e,n,o,!0),n.childLanes=u,null}function Gl(e,n){return n=kl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function hg(e,n,a){return _s(n,e.child,null,a),e=Gl(n,n.pendingProps),e.flags|=2,si(n),n.memoizedState=null,e}function ux(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(be){if(o.mode==="hidden")return e=Gl(n,o),n.lanes=536870912,Ro(null,e);if(Qu(n),(e=je)?(e=b_(e,gi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ea!==null?{id:Fi,overflow:Hi}:null,retryLane:536870912,hydrationErrors:null},a=Zp(e),a.return=n,n.child=a,wn=n,je=null)):e=null,e===null)throw Ta(n);return n.lanes=536870912,null}return Gl(n,o)}var f=e.memoizedState;if(f!==null){var y=f.dehydrated;if(Qu(n),u)if(n.flags&256)n.flags&=-257,n=hg(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(dn||tr(e,n,a,!1),u=(a&e.childLanes)!==0,dn||u){if(o=qe,o!==null&&(y=Bi(o,a),y!==0&&y!==f.retryLane))throw f.retryLane=y,cs(e,y),Kn(o,e,y),yf;Jl(),n=hg(e,n,a)}else e=f.treeContext,je=vi(y.nextSibling),wn=n,be=!0,ba=null,gi=!1,e!==null&&Jp(n,e),n=Gl(n,o),n.flags|=4096;return n}return e=Qi(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Vl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function xf(e,n,a,o,u){return ds(n),a=$u(e,n,a,o,void 0,u),o=tf(),e!==null&&!dn?(ef(e,n,u),ia(e,n,u)):(be&&o&&Ou(n),n.flags|=1,Un(e,n,a,u),n.child)}function dg(e,n,a,o,u,f){return ds(n),n.updateQueue=null,a=gm(n,o,a,u),mm(e),o=tf(),e!==null&&!dn?(ef(e,n,f),ia(e,n,f)):(be&&o&&Ou(n),n.flags|=1,Un(e,n,a,f),n.child)}function pg(e,n,a,o,u){if(ds(n),n.stateNode===null){var f=Ks,y=a.contextType;typeof y=="object"&&y!==null&&(f=Dn(y)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=_f,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Wu(n),y=a.contextType,f.context=typeof y=="object"&&y!==null?Dn(y):Ks,f.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(gf(n,a,y,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(y=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),y!==f.state&&_f.enqueueReplaceState(f,f.state,null),Mo(n,o,f,u),So(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var b=n.memoizedProps,B=ys(a,b);f.props=B;var tt=f.context,ht=a.contextType;y=Ks,typeof ht=="object"&&ht!==null&&(y=Dn(ht));var _t=a.getDerivedStateFromProps;ht=typeof _t=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ht||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||tt!==y)&&tg(n,f,o,y),Ra=!1;var nt=n.memoizedState;f.state=nt,Mo(n,o,f,u),So(),tt=n.memoizedState,b||nt!==tt||Ra?(typeof _t=="function"&&(gf(n,a,_t,o),tt=n.memoizedState),(B=Ra||$m(n,a,B,o,nt,tt,y))?(ht||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=tt),f.props=o,f.state=tt,f.context=y,o=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,qu(e,n),y=n.memoizedProps,ht=ys(a,y),f.props=ht,_t=n.pendingProps,nt=f.context,tt=a.contextType,B=Ks,typeof tt=="object"&&tt!==null&&(B=Dn(tt)),b=a.getDerivedStateFromProps,(tt=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==_t||nt!==B)&&tg(n,f,o,B),Ra=!1,nt=n.memoizedState,f.state=nt,Mo(n,o,f,u),So();var lt=n.memoizedState;y!==_t||nt!==lt||Ra||e!==null&&e.dependencies!==null&&El(e.dependencies)?(typeof b=="function"&&(gf(n,a,b,o),lt=n.memoizedState),(ht=Ra||$m(n,a,ht,o,nt,lt,B)||e!==null&&e.dependencies!==null&&El(e.dependencies))?(tt||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,lt,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,lt,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=lt),f.props=o,f.state=lt,f.context=B,o=ht):(typeof f.componentDidUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,Vl(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=_s(n,e.child,null,u),n.child=_s(n,null,a,u)):Un(e,n,a,u),n.memoizedState=f.state,e=n.child):e=ia(e,n,u),e}function mg(e,n,a,o){return fs(),n.flags|=256,Un(e,n,a,o),n.child}var Sf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Mf(e){return{baseLanes:e,cachePool:am()}}function Ef(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=oi),e}function gg(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,y;if((y=f)||(y=e!==null&&e.memoizedState===null?!1:(ln.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,e===null){if(be){if(u?Da(n):Ua(),(e=je)?(e=b_(e,gi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ea!==null?{id:Fi,overflow:Hi}:null,retryLane:536870912,hydrationErrors:null},a=Zp(e),a.return=n,n.child=a,wn=n,je=null)):e=null,e===null)throw Ta(n);return sh(e)?n.lanes=32:n.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Ua(),u=n.mode,b=kl({mode:"hidden",children:b},u),o=us(o,u,a,null),b.return=n,o.return=n,b.sibling=o,n.child=b,o=n.child,o.memoizedState=Mf(a),o.childLanes=Ef(e,y,a),n.memoizedState=Sf,Ro(null,o)):(Da(n),bf(n,b))}var B=e.memoizedState;if(B!==null&&(b=B.dehydrated,b!==null)){if(f)n.flags&256?(Da(n),n.flags&=-257,n=Tf(e,n,a)):n.memoizedState!==null?(Ua(),n.child=e.child,n.flags|=128,n=null):(Ua(),b=o.fallback,u=n.mode,o=kl({mode:"visible",children:o.children},u),b=us(b,u,a,null),b.flags|=2,o.return=n,b.return=n,o.sibling=b,n.child=o,_s(n,e.child,null,a),o=n.child,o.memoizedState=Mf(a),o.childLanes=Ef(e,y,a),n.memoizedState=Sf,n=Ro(null,o));else if(Da(n),sh(b)){if(y=b.nextSibling&&b.nextSibling.dataset,y)var tt=y.dgst;y=tt,o=Error(s(419)),o.stack="",o.digest=y,mo({value:o,source:null,stack:null}),n=Tf(e,n,a)}else if(dn||tr(e,n,a,!1),y=(a&e.childLanes)!==0,dn||y){if(y=qe,y!==null&&(o=Bi(y,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,cs(e,o),Kn(y,e,o),yf;ah(b)||Jl(),n=Tf(e,n,a)}else ah(b)?(n.flags|=192,n.child=e.child,n=null):(e=B.treeContext,je=vi(b.nextSibling),wn=n,be=!0,ba=null,gi=!1,e!==null&&Jp(n,e),n=bf(n,o.children),n.flags|=4096);return n}return u?(Ua(),b=o.fallback,u=n.mode,B=e.child,tt=B.sibling,o=Qi(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,tt!==null?b=Qi(tt,b):(b=us(b,u,a,null),b.flags|=2),b.return=n,o.return=n,o.sibling=b,n.child=o,Ro(null,o),o=n.child,b=e.child.memoizedState,b===null?b=Mf(a):(u=b.cachePool,u!==null?(B=fn._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=am(),b={baseLanes:b.baseLanes|a,cachePool:u}),o.memoizedState=b,o.childLanes=Ef(e,y,a),n.memoizedState=Sf,Ro(e.child,o)):(Da(n),a=e.child,e=a.sibling,a=Qi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(y=n.deletions,y===null?(n.deletions=[e],n.flags|=16):y.push(e)),n.child=a,n.memoizedState=null,a)}function bf(e,n){return n=kl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function kl(e,n){return e=ii(22,e,null,n),e.lanes=0,e}function Tf(e,n,a){return _s(n,e.child,null,a),e=bf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function _g(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Fu(e.return,n,a)}function Af(e,n,a,o,u,f){var y=e.memoizedState;y===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=f)}function vg(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var y=ln.current,b=(y&2)!==0;if(b?(y=y&1|2,n.flags|=128):y&=1,Et(ln,y),Un(e,n,o,a),o=be?po:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&_g(e,a,n);else if(e.tag===19)_g(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Ul(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Af(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Ul(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Af(n,!0,a,null,f,o);break;case"together":Af(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ia(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Oa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(tr(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Qi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Qi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Rf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&El(e)))}function fx(e,n,a){switch(n.tag){case 3:Rt(n,n.stateNode.containerInfo),Aa(n,fn,e.memoizedState.cache),fs();break;case 27:case 5:ie(n);break;case 4:Rt(n,n.stateNode.containerInfo);break;case 10:Aa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Qu(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Da(n),n.flags|=128,null):(a&n.child.childLanes)!==0?gg(e,n,a):(Da(n),e=ia(e,n,a),e!==null?e.sibling:null);Da(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(tr(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return vg(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Et(ln,ln.current),o)break;return null;case 22:return n.lanes=0,ug(e,n,a,n.pendingProps);case 24:Aa(n,fn,e.memoizedState.cache)}return ia(e,n,a)}function yg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)dn=!0;else{if(!Rf(e,a)&&(n.flags&128)===0)return dn=!1,fx(e,n,a);dn=(e.flags&131072)!==0}else dn=!1,be&&(n.flags&1048576)!==0&&Qp(n,po,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=ms(n.elementType),n.type=e,typeof e=="function")Uu(e)?(o=ys(e,o),n.tag=1,n=pg(null,n,e,o,a)):(n.tag=0,n=xf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===U){n.tag=11,n=og(null,n,e,o,a);break t}else if(u===z){n.tag=14,n=lg(null,n,e,o,a);break t}}throw n=vt(e)||e,Error(s(306,n,""))}}return n;case 0:return xf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=ys(o,n.pendingProps),pg(e,n,o,u,a);case 3:t:{if(Rt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,qu(e,n),Mo(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Aa(n,fn,o),o!==f.cache&&Hu(n,[fn],a,!0),So(),o=y.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=mg(e,n,o,a);break t}else if(o!==u){u=di(Error(s(424)),n),mo(u),n=mg(e,n,o,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(je=vi(e.firstChild),wn=n,be=!0,ba=null,gi=!0,a=um(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(fs(),o===u){n=ia(e,n,a);break t}Un(e,n,o,a)}n=n.child}return n;case 26:return Vl(e,n),e===null?(a=D_(n.type,null,n.pendingProps,null))?n.memoizedState=a:be||(a=n.type,e=n.pendingProps,o=sc(st.current).createElement(a),o[en]=n,o[Cn]=e,Ln(o,a,e),St(o),n.stateNode=o):n.memoizedState=D_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return ie(n),e===null&&be&&(o=n.stateNode=R_(n.type,n.pendingProps,st.current),wn=n,gi=!0,u=je,Fa(n.type)?(rh=u,je=vi(o.firstChild)):je=u),Un(e,n,n.pendingProps.children,a),Vl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&be&&((u=o=je)&&(o=Gx(o,n.type,n.pendingProps,gi),o!==null?(n.stateNode=o,wn=n,je=vi(o.firstChild),gi=!1,u=!0):u=!1),u||Ta(n)),ie(n),u=n.type,f=n.pendingProps,y=e!==null?e.memoizedProps:null,o=f.children,eh(u,f)?o=null:y!==null&&eh(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=$u(e,n,nx,null,null,a),Vo._currentValue=u),Vl(e,n),Un(e,n,o,a),n.child;case 6:return e===null&&be&&((e=a=je)&&(a=Vx(a,n.pendingProps,gi),a!==null?(n.stateNode=a,wn=n,je=null,e=!0):e=!1),e||Ta(n)),null;case 13:return gg(e,n,a);case 4:return Rt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=_s(n,null,o,a):Un(e,n,o,a),n.child;case 11:return og(e,n,n.type,n.pendingProps,a);case 7:return Un(e,n,n.pendingProps,a),n.child;case 8:return Un(e,n,n.pendingProps.children,a),n.child;case 12:return Un(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Aa(n,n.type,o.value),Un(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,ds(n),u=Dn(u),o=o(u),n.flags|=1,Un(e,n,o,a),n.child;case 14:return lg(e,n,n.type,n.pendingProps,a);case 15:return cg(e,n,n.type,n.pendingProps,a);case 19:return vg(e,n,a);case 31:return ux(e,n,a);case 22:return ug(e,n,a,n.pendingProps);case 24:return ds(n),o=Dn(fn),e===null?(u=ku(),u===null&&(u=qe,f=Gu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Wu(n),Aa(n,fn,u)):((e.lanes&a)!==0&&(qu(e,n),Mo(n,null,null,a),So()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Aa(n,fn,o)):(o=f.cache,Aa(n,fn,o),o!==u.cache&&Hu(n,[fn],a,!0))),Un(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function aa(e){e.flags|=4}function Cf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(qg())e.flags|=8192;else throw gs=Rl,Xu}else e.flags&=-16777217}function xg(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!P_(n))if(qg())e.flags|=8192;else throw gs=Rl,Xu}function Xl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?gn():536870912,e.lanes|=n,hr|=n)}function Co(e,n){if(!be)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ze(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function hx(e,n,a){var o=n.pendingProps;switch(Pu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(n),null;case 1:return Ze(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ta(fn),Ot(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&($s(n)?aa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Bu())),Ze(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(aa(n),f!==null?(Ze(n),xg(n,f)):(Ze(n),Cf(n,u,null,o,a))):f?f!==e.memoizedState?(aa(n),Ze(n),xg(n,f)):(Ze(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&aa(n),Ze(n),Cf(n,u,e,o,a)),null;case 27:if(Be(n),a=st.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ze(n),null}e=w.current,$s(n)?$p(n):(e=R_(u,o,a),n.stateNode=e,aa(n))}return Ze(n),null;case 5:if(Be(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ze(n),null}if(f=w.current,$s(n))$p(n);else{var y=sc(st.current);switch(f){case 1:f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=y.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}f[en]=n,f[Cn]=o;t:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)f.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break t;for(;y.sibling===null;){if(y.return===null||y.return===n)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=f;t:switch(Ln(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&aa(n)}}return Ze(n),Cf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=st.current,$s(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=wn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[en]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||g_(e.nodeValue,a)),e||Ta(n,!0)}else e=sc(e).createTextNode(o),e[en]=n,n.stateNode=e}return Ze(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=$s(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[en]=n}else fs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),e=!1}else a=Bu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(si(n),n):(si(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ze(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=$s(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[en]=n}else fs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),u=!1}else u=Bu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(si(n),n):(si(n),null)}return si(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Xl(n,n.updateQueue),Ze(n),null);case 4:return Ot(),e===null&&Kf(n.stateNode.containerInfo),Ze(n),null;case 10:return ta(n.type),Ze(n),null;case 19:if(et(ln),o=n.memoizedState,o===null)return Ze(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Co(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=Ul(e),f!==null){for(n.flags|=128,Co(o,!1),e=f.updateQueue,n.updateQueue=e,Xl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)jp(a,e),a=a.sibling;return Et(ln,ln.current&1|2),be&&Ji(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&pt()>Zl&&(n.flags|=128,u=!0,Co(o,!1),n.lanes=4194304)}else{if(!u)if(e=Ul(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Xl(n,e),Co(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!be)return Ze(n),null}else 2*pt()-o.renderingStartTime>Zl&&a!==536870912&&(n.flags|=128,u=!0,Co(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=pt(),e.sibling=null,a=ln.current,Et(ln,u?a&1|2:a&1),be&&Ji(n,o.treeForkCount),e):(Ze(n),null);case 22:case 23:return si(n),Ku(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Ze(n),n.subtreeFlags&6&&(n.flags|=8192)):Ze(n),a=n.updateQueue,a!==null&&Xl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&et(ps),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ta(fn),Ze(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function dx(e,n){switch(Pu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ta(fn),Ot(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Be(n),null;case 31:if(n.memoizedState!==null){if(si(n),n.alternate===null)throw Error(s(340));fs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(si(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));fs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return et(ln),null;case 4:return Ot(),null;case 10:return ta(n.type),null;case 22:case 23:return si(n),Ku(),e!==null&&et(ps),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ta(fn),null;case 25:return null;default:return null}}function Sg(e,n){switch(Pu(n),n.tag){case 3:ta(fn),Ot();break;case 26:case 27:case 5:Be(n);break;case 4:Ot();break;case 31:n.memoizedState!==null&&si(n);break;case 13:si(n);break;case 19:et(ln);break;case 10:ta(n.type);break;case 22:case 23:si(n),Ku(),e!==null&&et(ps);break;case 24:ta(fn)}}function wo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,y=a.inst;o=f(),y.destroy=o}a=a.next}while(a!==u)}}catch(b){ze(n,n.return,b)}}function La(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var y=o.inst,b=y.destroy;if(b!==void 0){y.destroy=void 0,u=n;var B=a,tt=b;try{tt()}catch(ht){ze(u,B,ht)}}}o=o.next}while(o!==f)}}catch(ht){ze(n,n.return,ht)}}function Mg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{hm(n,a)}catch(o){ze(e,e.return,o)}}}function Eg(e,n,a){a.props=ys(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){ze(e,n,o)}}function Do(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){ze(e,n,u)}}function Gi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){ze(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){ze(e,n,u)}else a.current=null}function bg(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){ze(e,e.return,u)}}function wf(e,n,a){try{var o=e.stateNode;Px(o,e.type,a,n),o[Cn]=n}catch(u){ze(e,e.return,u)}}function Tg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Fa(e.type)||e.tag===4}function Df(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Tg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Fa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Uf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Zi));else if(o!==4&&(o===27&&Fa(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Uf(e,n,a),e=e.sibling;e!==null;)Uf(e,n,a),e=e.sibling}function Wl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Fa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Wl(e,n,a),e=e.sibling;e!==null;)Wl(e,n,a),e=e.sibling}function Ag(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Ln(n,o,a),n[en]=e,n[Cn]=a}catch(f){ze(e,e.return,f)}}var sa=!1,pn=!1,Lf=!1,Rg=typeof WeakSet=="function"?WeakSet:Set,bn=null;function px(e,n){if(e=e.containerInfo,$f=hc,e=Fp(e),bu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var y=0,b=-1,B=-1,tt=0,ht=0,_t=e,nt=null;e:for(;;){for(var lt;_t!==a||u!==0&&_t.nodeType!==3||(b=y+u),_t!==f||o!==0&&_t.nodeType!==3||(B=y+o),_t.nodeType===3&&(y+=_t.nodeValue.length),(lt=_t.firstChild)!==null;)nt=_t,_t=lt;for(;;){if(_t===e)break e;if(nt===a&&++tt===u&&(b=y),nt===f&&++ht===o&&(B=y),(lt=_t.nextSibling)!==null)break;_t=nt,nt=_t.parentNode}_t=lt}a=b===-1||B===-1?null:{start:b,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(th={focusedElem:e,selectionRange:a},hc=!1,bn=n;bn!==null;)if(n=bn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,bn=e;else for(;bn!==null;){switch(n=bn,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var Gt=ys(a.type,u);e=o.getSnapshotBeforeUpdate(Gt,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){ze(a,a.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)ih(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ih(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,bn=e;break}bn=n.return}}function Cg(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:oa(e,a),o&4&&wo(5,a);break;case 1:if(oa(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(y){ze(a,a.return,y)}else{var u=ys(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(y){ze(a,a.return,y)}}o&64&&Mg(a),o&512&&Do(a,a.return);break;case 3:if(oa(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{hm(e,n)}catch(y){ze(a,a.return,y)}}break;case 27:n===null&&o&4&&Ag(a);case 26:case 5:oa(e,a),n===null&&o&4&&bg(a),o&512&&Do(a,a.return);break;case 12:oa(e,a);break;case 31:oa(e,a),o&4&&Ug(e,a);break;case 13:oa(e,a),o&4&&Lg(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=Ex.bind(null,a),kx(e,a))));break;case 22:if(o=a.memoizedState!==null||sa,!o){n=n!==null&&n.memoizedState!==null||pn,u=sa;var f=pn;sa=o,(pn=n)&&!f?la(e,a,(a.subtreeFlags&8772)!==0):oa(e,a),sa=u,pn=f}break;case 30:break;default:oa(e,a)}}function wg(e){var n=e.alternate;n!==null&&(e.alternate=null,wg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&R(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,qn=!1;function ra(e,n,a){for(a=a.child;a!==null;)Dg(e,n,a),a=a.sibling}function Dg(e,n,a){if(Wt&&typeof Wt.onCommitFiberUnmount=="function")try{Wt.onCommitFiberUnmount(jt,a)}catch{}switch(a.tag){case 26:pn||Gi(a,n),ra(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:pn||Gi(a,n);var o=$e,u=qn;Fa(a.type)&&($e=a.stateNode,qn=!1),ra(e,n,a),Fo(a.stateNode),$e=o,qn=u;break;case 5:pn||Gi(a,n);case 6:if(o=$e,u=qn,$e=null,ra(e,n,a),$e=o,qn=u,$e!==null)if(qn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(a.stateNode)}catch(f){ze(a,n,f)}else try{$e.removeChild(a.stateNode)}catch(f){ze(a,n,f)}break;case 18:$e!==null&&(qn?(e=$e,M_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),xr(e)):M_($e,a.stateNode));break;case 4:o=$e,u=qn,$e=a.stateNode.containerInfo,qn=!0,ra(e,n,a),$e=o,qn=u;break;case 0:case 11:case 14:case 15:La(2,a,n),pn||La(4,a,n),ra(e,n,a);break;case 1:pn||(Gi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Eg(a,n,o)),ra(e,n,a);break;case 21:ra(e,n,a);break;case 22:pn=(o=pn)||a.memoizedState!==null,ra(e,n,a),pn=o;break;default:ra(e,n,a)}}function Ug(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{xr(e)}catch(a){ze(n,n.return,a)}}}function Lg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{xr(e)}catch(a){ze(n,n.return,a)}}function mx(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Rg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Rg),n;default:throw Error(s(435,e.tag))}}function ql(e,n){var a=mx(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=bx.bind(null,e,o);o.then(u,u)}})}function Yn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,y=n,b=y;t:for(;b!==null;){switch(b.tag){case 27:if(Fa(b.type)){$e=b.stateNode,qn=!1;break t}break;case 5:$e=b.stateNode,qn=!1;break t;case 3:case 4:$e=b.stateNode.containerInfo,qn=!0;break t}b=b.return}if($e===null)throw Error(s(160));Dg(f,y,u),$e=null,qn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Ng(n,e),n=n.sibling}var Ri=null;function Ng(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Yn(n,e),jn(e),o&4&&(La(3,e,e.return),wo(3,e),La(5,e,e.return));break;case 1:Yn(n,e),jn(e),o&512&&(pn||a===null||Gi(a,a.return)),o&64&&sa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ri;if(Yn(n,e),jn(e),o&512&&(pn||a===null||Gi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[as]||f[en]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Ln(f,o,a),f[en]=e,St(f),o=f;break t;case"link":var y=N_("link","href",u).get(o+(a.href||""));if(y){for(var b=0;b<y.length;b++)if(f=y[b],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(b,1);break e}}f=u.createElement(o),Ln(f,o,a),u.head.appendChild(f);break;case"meta":if(y=N_("meta","content",u).get(o+(a.content||""))){for(b=0;b<y.length;b++)if(f=y[b],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(b,1);break e}}f=u.createElement(o),Ln(f,o,a),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[en]=e,St(f),o=f}e.stateNode=o}else O_(u,e.type,e.stateNode);else e.stateNode=L_(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?O_(u,e.type,e.stateNode):L_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&wf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Yn(n,e),jn(e),o&512&&(pn||a===null||Gi(a,a.return)),a!==null&&o&4&&wf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Yn(n,e),jn(e),o&512&&(pn||a===null||Gi(a,a.return)),e.flags&32){u=e.stateNode;try{ks(u,"")}catch(Gt){ze(e,e.return,Gt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,wf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Lf=!0);break;case 6:if(Yn(n,e),jn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(Gt){ze(e,e.return,Gt)}}break;case 3:if(lc=null,u=Ri,Ri=rc(n.containerInfo),Yn(n,e),Ri=u,jn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{xr(n.containerInfo)}catch(Gt){ze(e,e.return,Gt)}Lf&&(Lf=!1,Og(e));break;case 4:o=Ri,Ri=rc(e.stateNode.containerInfo),Yn(n,e),jn(e),Ri=o;break;case 12:Yn(n,e),jn(e);break;case 31:Yn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 13:Yn(n,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(jl=pt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 22:u=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,tt=sa,ht=pn;if(sa=tt||u,pn=ht||B,Yn(n,e),pn=ht,sa=tt,jn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||sa||pn||xs(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,u)y=f.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{b=B.stateNode;var _t=B.memoizedProps.style,nt=_t!=null&&_t.hasOwnProperty("display")?_t.display:null;b.style.display=nt==null||typeof nt=="boolean"?"":(""+nt).trim()}}catch(Gt){ze(B,B.return,Gt)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(Gt){ze(B,B.return,Gt)}}}else if(n.tag===18){if(a===null){B=n;try{var lt=B.stateNode;u?E_(lt,!0):E_(B.stateNode,!1)}catch(Gt){ze(B,B.return,Gt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,ql(e,a))));break;case 19:Yn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,ql(e,o)));break;case 30:break;case 21:break;default:Yn(n,e),jn(e)}}function jn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(Tg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=Df(e);Wl(e,f,u);break;case 5:var y=a.stateNode;a.flags&32&&(ks(y,""),a.flags&=-33);var b=Df(e);Wl(e,b,y);break;case 3:case 4:var B=a.stateNode.containerInfo,tt=Df(e);Uf(e,tt,B);break;default:throw Error(s(161))}}catch(ht){ze(e,e.return,ht)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Og(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Og(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function oa(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Cg(e,n.alternate,n),n=n.sibling}function xs(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:La(4,n,n.return),xs(n);break;case 1:Gi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Eg(n,n.return,a),xs(n);break;case 27:Fo(n.stateNode);case 26:case 5:Gi(n,n.return),xs(n);break;case 22:n.memoizedState===null&&xs(n);break;case 30:xs(n);break;default:xs(n)}e=e.sibling}}function la(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,y=f.flags;switch(f.tag){case 0:case 11:case 15:la(u,f,a),wo(4,f);break;case 1:if(la(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){ze(o,o.return,tt)}if(o=f,u=o.updateQueue,u!==null){var b=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)fm(B[u],b)}catch(tt){ze(o,o.return,tt)}}a&&y&64&&Mg(f),Do(f,f.return);break;case 27:Ag(f);case 26:case 5:la(u,f,a),a&&o===null&&y&4&&bg(f),Do(f,f.return);break;case 12:la(u,f,a);break;case 31:la(u,f,a),a&&y&4&&Ug(u,f);break;case 13:la(u,f,a),a&&y&4&&Lg(u,f);break;case 22:f.memoizedState===null&&la(u,f,a),Do(f,f.return);break;case 30:break;default:la(u,f,a)}n=n.sibling}}function Nf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&go(a))}function Of(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&go(e))}function Ci(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Pg(e,n,a,o),n=n.sibling}function Pg(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ci(e,n,a,o),u&2048&&wo(9,n);break;case 1:Ci(e,n,a,o);break;case 3:Ci(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&go(e)));break;case 12:if(u&2048){Ci(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,y=f.id,b=f.onPostCommit;typeof b=="function"&&b(y,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){ze(n,n.return,B)}}else Ci(e,n,a,o);break;case 31:Ci(e,n,a,o);break;case 13:Ci(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,y=n.alternate,n.memoizedState!==null?f._visibility&2?Ci(e,n,a,o):Uo(e,n):f._visibility&2?Ci(e,n,a,o):(f._visibility|=2,cr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Nf(y,n);break;case 24:Ci(e,n,a,o),u&2048&&Of(n.alternate,n);break;default:Ci(e,n,a,o)}}function cr(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,y=n,b=a,B=o,tt=y.flags;switch(y.tag){case 0:case 11:case 15:cr(f,y,b,B,u),wo(8,y);break;case 23:break;case 22:var ht=y.stateNode;y.memoizedState!==null?ht._visibility&2?cr(f,y,b,B,u):Uo(f,y):(ht._visibility|=2,cr(f,y,b,B,u)),u&&tt&2048&&Nf(y.alternate,y);break;case 24:cr(f,y,b,B,u),u&&tt&2048&&Of(y.alternate,y);break;default:cr(f,y,b,B,u)}n=n.sibling}}function Uo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:Uo(a,o),u&2048&&Nf(o.alternate,o);break;case 24:Uo(a,o),u&2048&&Of(o.alternate,o);break;default:Uo(a,o)}n=n.sibling}}var Lo=8192;function ur(e,n,a){if(e.subtreeFlags&Lo)for(e=e.child;e!==null;)zg(e,n,a),e=e.sibling}function zg(e,n,a){switch(e.tag){case 26:ur(e,n,a),e.flags&Lo&&e.memoizedState!==null&&eS(a,Ri,e.memoizedState,e.memoizedProps);break;case 5:ur(e,n,a);break;case 3:case 4:var o=Ri;Ri=rc(e.stateNode.containerInfo),ur(e,n,a),Ri=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Lo,Lo=16777216,ur(e,n,a),Lo=o):ur(e,n,a));break;default:ur(e,n,a)}}function Bg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function No(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];bn=o,Fg(o,e)}Bg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ig(e),e=e.sibling}function Ig(e){switch(e.tag){case 0:case 11:case 15:No(e),e.flags&2048&&La(9,e,e.return);break;case 3:No(e);break;case 12:No(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Yl(e)):No(e);break;default:No(e)}}function Yl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];bn=o,Fg(o,e)}Bg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:La(8,n,n.return),Yl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Yl(n));break;default:Yl(n)}e=e.sibling}}function Fg(e,n){for(;bn!==null;){var a=bn;switch(a.tag){case 0:case 11:case 15:La(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:go(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,bn=o;else t:for(a=e;bn!==null;){o=bn;var u=o.sibling,f=o.return;if(wg(o),o===a){bn=null;break t}if(u!==null){u.return=f,bn=u;break t}bn=f}}}var gx={getCacheForType:function(e){var n=Dn(fn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return Dn(fn).controller.signal}},_x=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,_e=null,Me=0,Pe=0,ri=null,Na=!1,fr=!1,Pf=!1,ca=0,an=0,Oa=0,Ss=0,zf=0,oi=0,hr=0,Oo=null,Zn=null,Bf=!1,jl=0,Hg=0,Zl=1/0,Kl=null,Pa=null,vn=0,za=null,dr=null,ua=0,If=0,Ff=null,Gg=null,Po=0,Hf=null;function li(){return(Le&2)!==0&&Me!==0?Me&-Me:P.T!==null?qf():no()}function Vg(){if(oi===0)if((Me&536870912)===0||be){var e=ut;ut<<=1,(ut&3932160)===0&&(ut=262144),oi=e}else oi=536870912;return e=ai.current,e!==null&&(e.flags|=32),oi}function Kn(e,n,a){(e===qe&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(pr(e,0),Ba(e,Me,oi,!1)),Rn(e,a),((Le&2)===0||e!==qe)&&(e===qe&&((Le&2)===0&&(Ss|=a),an===4&&Ba(e,Me,oi,!1)),Vi(e))}function kg(e,n,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||te(e,n),u=o?xx(e,n):Vf(e,n,!0),f=o;do{if(u===0){fr&&!o&&Ba(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!vx(a)){u=Vf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var y=0;else y=e.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;t:{var b=e;u=Oo;var B=b.current.memoizedState.isDehydrated;if(B&&(pr(b,y).flags|=256),y=Vf(b,y,!1),y!==2){if(Pf&&!B){b.errorRecoveryDisabledLanes|=f,Ss|=f,u=4;break t}f=Zn,Zn=u,f!==null&&(Zn===null?Zn=f:Zn.push.apply(Zn,f))}u=y}if(f=!1,u!==2)continue}}if(u===1){pr(e,0),Ba(e,n,0,!0);break}t:{switch(o=e,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ba(o,n,oi,!Na);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=jl+300-pt(),10<u)){if(Ba(o,n,oi,!Na),Ut(o,0,!0)!==0)break t;ua=n,o.timeoutHandle=x_(Xg.bind(null,o,a,Zn,Kl,Bf,n,oi,Ss,hr,Na,f,"Throttled",-0,0),u);break t}Xg(o,a,Zn,Kl,Bf,n,oi,Ss,hr,Na,f,null,-0,0)}}break}while(!0);Vi(e)}function Xg(e,n,a,o,u,f,y,b,B,tt,ht,_t,nt,lt){if(e.timeoutHandle=-1,_t=n.subtreeFlags,_t&8192||(_t&16785408)===16785408){_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zi},zg(n,f,_t);var Gt=(f&62914560)===f?jl-pt():(f&4194048)===f?Hg-pt():0;if(Gt=nS(_t,Gt),Gt!==null){ua=f,e.cancelPendingCommit=Gt(Jg.bind(null,e,n,f,a,o,u,y,b,B,ht,_t,null,nt,lt)),Ba(e,f,y,!tt);return}}Jg(e,n,f,a,o,u,y,b,B)}function vx(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ni(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ba(e,n,a,o){n&=~zf,n&=~Ss,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-$t(u),y=1<<f;o[f]=-1,u&=~y}a!==0&&to(e,a,n)}function Ql(){return(Le&6)===0?(zo(0),!1):!0}function Gf(){if(_e!==null){if(Pe===0)var e=_e.return;else e=_e,$i=hs=null,nf(e),ar=null,vo=0,e=_e;for(;e!==null;)Sg(e.alternate,e),e=e.return;_e=null}}function pr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,Ix(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ua=0,Gf(),qe=e,_e=a=Qi(e.current,null),Me=n,Pe=0,ri=null,Na=!1,fr=te(e,n),Pf=!1,hr=oi=zf=Ss=Oa=an=0,Zn=Oo=null,Bf=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-$t(o),f=1<<u;n|=e[u],o&=~f}return ca=n,vl(),a}function Wg(e,n){ce=null,P.H=Ao,n===ir||n===Al?(n=om(),Pe=3):n===Xu?(n=om(),Pe=4):Pe=n===yf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ri=n,_e===null&&(an=1,Hl(e,di(n,e.current)))}function qg(){var e=ai.current;return e===null?!0:(Me&4194048)===Me?_i===null:(Me&62914560)===Me||(Me&536870912)!==0?e===_i:!1}function Yg(){var e=P.H;return P.H=Ao,e===null?Ao:e}function jg(){var e=P.A;return P.A=gx,e}function Jl(){an=4,Na||(Me&4194048)!==Me&&ai.current!==null||(fr=!0),(Oa&134217727)===0&&(Ss&134217727)===0||qe===null||Ba(qe,Me,oi,!1)}function Vf(e,n,a){var o=Le;Le|=2;var u=Yg(),f=jg();(qe!==e||Me!==n)&&(Kl=null,pr(e,n)),n=!1;var y=an;t:do try{if(Pe!==0&&_e!==null){var b=_e,B=ri;switch(Pe){case 8:Gf(),y=6;break t;case 3:case 2:case 9:case 6:ai.current===null&&(n=!0);var tt=Pe;if(Pe=0,ri=null,mr(e,b,B,tt),a&&fr){y=0;break t}break;default:tt=Pe,Pe=0,ri=null,mr(e,b,B,tt)}}yx(),y=an;break}catch(ht){Wg(e,ht)}while(!0);return n&&e.shellSuspendCounter++,$i=hs=null,Le=o,P.H=u,P.A=f,_e===null&&(qe=null,Me=0,vl()),y}function yx(){for(;_e!==null;)Zg(_e)}function xx(e,n){var a=Le;Le|=2;var o=Yg(),u=jg();qe!==e||Me!==n?(Kl=null,Zl=pt()+500,pr(e,n)):fr=te(e,n);t:do try{if(Pe!==0&&_e!==null){n=_e;var f=ri;e:switch(Pe){case 1:Pe=0,ri=null,mr(e,n,f,1);break;case 2:case 9:if(sm(f)){Pe=0,ri=null,Kg(n);break}n=function(){Pe!==2&&Pe!==9||qe!==e||(Pe=7),Vi(e)},f.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:sm(f)?(Pe=0,ri=null,Kg(n)):(Pe=0,ri=null,mr(e,n,f,7));break;case 5:var y=null;switch(_e.tag){case 26:y=_e.memoizedState;case 5:case 27:var b=_e;if(y?P_(y):b.stateNode.complete){Pe=0,ri=null;var B=b.sibling;if(B!==null)_e=B;else{var tt=b.return;tt!==null?(_e=tt,$l(tt)):_e=null}break e}}Pe=0,ri=null,mr(e,n,f,5);break;case 6:Pe=0,ri=null,mr(e,n,f,6);break;case 8:Gf(),an=6;break t;default:throw Error(s(462))}}Sx();break}catch(ht){Wg(e,ht)}while(!0);return $i=hs=null,P.H=o,P.A=u,Le=a,_e!==null?0:(qe=null,Me=0,vl(),an)}function Sx(){for(;_e!==null&&!T();)Zg(_e)}function Zg(e){var n=yg(e.alternate,e,ca);e.memoizedProps=e.pendingProps,n===null?$l(e):_e=n}function Kg(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=dg(a,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=dg(a,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:nf(n);default:Sg(a,n),n=_e=jp(n,ca),n=yg(a,n,ca)}e.memoizedProps=e.pendingProps,n===null?$l(e):_e=n}function mr(e,n,a,o){$i=hs=null,nf(n),ar=null,vo=0;var u=n.return;try{if(cx(e,u,n,a,Me)){an=1,Hl(e,di(a,e.current)),_e=null;return}}catch(f){if(u!==null)throw _e=u,f;an=1,Hl(e,di(a,e.current)),_e=null;return}n.flags&32768?(be||o===1?e=!0:fr||(Me&536870912)!==0?e=!1:(Na=e=!0,(o===2||o===9||o===3||o===6)&&(o=ai.current,o!==null&&o.tag===13&&(o.flags|=16384))),Qg(n,e)):$l(n)}function $l(e){var n=e;do{if((n.flags&32768)!==0){Qg(n,Na);return}e=n.return;var a=hx(n.alternate,n,ca);if(a!==null){_e=a;return}if(n=n.sibling,n!==null){_e=n;return}_e=n=e}while(n!==null);an===0&&(an=5)}function Qg(e,n){do{var a=dx(e.alternate,e);if(a!==null){a.flags&=32767,_e=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){_e=e;return}_e=e=a}while(e!==null);an=6,_e=null}function Jg(e,n,a,o,u,f,y,b,B){e.cancelPendingCommit=null;do tc();while(vn!==0);if((Le&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=wu,bi(e,a,f,y,b,B),e===qe&&(_e=qe=null,Me=0),dr=n,za=e,ua=a,If=f,Ff=u,Gg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Tx(Dt,function(){return i_(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=P.T,P.T=null,u=Z.p,Z.p=2,y=Le,Le|=4;try{px(e,n,a)}finally{Le=y,Z.p=u,P.T=o}}vn=1,$g(),t_(),e_()}}function $g(){if(vn===1){vn=0;var e=za,n=dr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var o=Z.p;Z.p=2;var u=Le;Le|=4;try{Ng(n,e);var f=th,y=Fp(e.containerInfo),b=f.focusedElem,B=f.selectionRange;if(y!==b&&b&&b.ownerDocument&&Ip(b.ownerDocument.documentElement,b)){if(B!==null&&bu(b)){var tt=B.start,ht=B.end;if(ht===void 0&&(ht=tt),"selectionStart"in b)b.selectionStart=tt,b.selectionEnd=Math.min(ht,b.value.length);else{var _t=b.ownerDocument||document,nt=_t&&_t.defaultView||window;if(nt.getSelection){var lt=nt.getSelection(),Gt=b.textContent.length,Jt=Math.min(B.start,Gt),Ge=B.end===void 0?Jt:Math.min(B.end,Gt);!lt.extend&&Jt>Ge&&(y=Ge,Ge=Jt,Jt=y);var j=Bp(b,Jt),V=Bp(b,Ge);if(j&&V&&(lt.rangeCount!==1||lt.anchorNode!==j.node||lt.anchorOffset!==j.offset||lt.focusNode!==V.node||lt.focusOffset!==V.offset)){var $=_t.createRange();$.setStart(j.node,j.offset),lt.removeAllRanges(),Jt>Ge?(lt.addRange($),lt.extend(V.node,V.offset)):($.setEnd(V.node,V.offset),lt.addRange($))}}}}for(_t=[],lt=b;lt=lt.parentNode;)lt.nodeType===1&&_t.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<_t.length;b++){var mt=_t[b];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}hc=!!$f,th=$f=null}finally{Le=u,Z.p=o,P.T=a}}e.current=n,vn=2}}function t_(){if(vn===2){vn=0;var e=za,n=dr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var o=Z.p;Z.p=2;var u=Le;Le|=4;try{Cg(e,n.alternate,n)}finally{Le=u,Z.p=o,P.T=a}}vn=3}}function e_(){if(vn===4||vn===3){vn=0,it();var e=za,n=dr,a=ua,o=Gg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?vn=5:(vn=0,dr=za=null,n_(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Pa=null),Gs(a),n=n.stateNode,Wt&&typeof Wt.onCommitFiberRoot=="function")try{Wt.onCommitFiberRoot(jt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=P.T,u=Z.p,Z.p=2,P.T=null;try{for(var f=e.onRecoverableError,y=0;y<o.length;y++){var b=o[y];f(b.value,{componentStack:b.stack})}}finally{P.T=n,Z.p=u}}(ua&3)!==0&&tc(),Vi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Hf?Po++:(Po=0,Hf=e):Po=0,zo(0)}}function n_(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,go(n)))}function tc(){return $g(),t_(),e_(),i_()}function i_(){if(vn!==5)return!1;var e=za,n=If;If=0;var a=Gs(ua),o=P.T,u=Z.p;try{Z.p=32>a?32:a,P.T=null,a=Ff,Ff=null;var f=za,y=ua;if(vn=0,dr=za=null,ua=0,(Le&6)!==0)throw Error(s(331));var b=Le;if(Le|=4,Ig(f.current),Pg(f,f.current,y,a),Le=b,zo(0,!1),Wt&&typeof Wt.onPostCommitFiberRoot=="function")try{Wt.onPostCommitFiberRoot(jt,f)}catch{}return!0}finally{Z.p=u,P.T=o,n_(e,n)}}function a_(e,n,a){n=di(a,n),n=vf(e.stateNode,n,2),e=wa(e,n,2),e!==null&&(Rn(e,2),Vi(e))}function ze(e,n,a){if(e.tag===3)a_(e,e,a);else for(;n!==null;){if(n.tag===3){a_(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Pa===null||!Pa.has(o))){e=di(a,e),a=sg(2),o=wa(n,a,2),o!==null&&(rg(a,o,n,e),Rn(o,2),Vi(o));break}}n=n.return}}function kf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new _x;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Pf=!0,u.add(a),e=Mx.bind(null,e,n,a),n.then(e,e))}function Mx(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,qe===e&&(Me&a)===a&&(an===4||an===3&&(Me&62914560)===Me&&300>pt()-jl?(Le&2)===0&&pr(e,0):zf|=a,hr===Me&&(hr=0)),Vi(e)}function s_(e,n){n===0&&(n=gn()),e=cs(e,n),e!==null&&(Rn(e,n),Vi(e))}function Ex(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),s_(e,a)}function bx(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),s_(e,a)}function Tx(e,n){return qt(e,n)}var ec=null,gr=null,Xf=!1,nc=!1,Wf=!1,Ia=0;function Vi(e){e!==gr&&e.next===null&&(gr===null?ec=gr=e:gr=gr.next=e),nc=!0,Xf||(Xf=!0,Rx())}function zo(e,n){if(!Wf&&nc){Wf=!0;do for(var a=!1,o=ec;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var y=o.suspendedLanes,b=o.pingedLanes;f=(1<<31-$t(42|e)+1)-1,f&=u&~(y&~b),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,c_(o,f))}else f=Me,f=Ut(o,o===qe?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||te(o,f)||(a=!0,c_(o,f));o=o.next}while(a);Wf=!1}}function Ax(){r_()}function r_(){nc=Xf=!1;var e=0;Ia!==0&&Bx()&&(e=Ia);for(var n=pt(),a=null,o=ec;o!==null;){var u=o.next,f=o_(o,n);f===0?(o.next=null,a===null?ec=u:a.next=u,u===null&&(gr=a)):(a=o,(e!==0||(f&3)!==0)&&(nc=!0)),o=u}vn!==0&&vn!==5||zo(e),Ia!==0&&(Ia=0)}function o_(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var y=31-$t(f),b=1<<y,B=u[y];B===-1?((b&a)===0||(b&o)!==0)&&(u[y]=Je(b,n)):B<=n&&(e.expiredLanes|=b),f&=~b}if(n=qe,a=Me,a=Ut(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&L(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||te(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&L(o),Gs(a)){case 2:case 8:a=Xt;break;case 32:a=Dt;break;case 268435456:a=xe;break;default:a=Dt}return o=l_.bind(null,e),a=qt(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&L(o),e.callbackPriority=2,e.callbackNode=null,2}function l_(e,n){if(vn!==0&&vn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(tc()&&e.callbackNode!==a)return null;var o=Me;return o=Ut(e,e===qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(kg(e,o,n),o_(e,pt()),e.callbackNode!=null&&e.callbackNode===a?l_.bind(null,e):null)}function c_(e,n){if(tc())return null;kg(e,n,!0)}function Rx(){Fx(function(){(Le&6)!==0?qt(gt,Ax):r_()})}function qf(){if(Ia===0){var e=er;e===0&&(e=Ct,Ct<<=1,(Ct&261888)===0&&(Ct=256)),Ia=e}return Ia}function u_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ul(""+e)}function f_(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function Cx(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=u_((u[Cn]||null).action),y=o.submitter;y&&(n=(n=y[Cn]||null)?u_(n.formAction):y.getAttribute("formAction"),n!==null&&(f=n,y=null));var b=new pl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ia!==0){var B=y?f_(u,y):new FormData(u);hf(a,{pending:!0,data:B,method:u.method,action:f},null,B)}}else typeof f=="function"&&(b.preventDefault(),B=y?f_(u,y):new FormData(u),hf(a,{pending:!0,data:B,method:u.method,action:f},f,B))},currentTarget:u}]})}}for(var Yf=0;Yf<Cu.length;Yf++){var jf=Cu[Yf],wx=jf.toLowerCase(),Dx=jf[0].toUpperCase()+jf.slice(1);Ai(wx,"on"+Dx)}Ai(Vp,"onAnimationEnd"),Ai(kp,"onAnimationIteration"),Ai(Xp,"onAnimationStart"),Ai("dblclick","onDoubleClick"),Ai("focusin","onFocus"),Ai("focusout","onBlur"),Ai(qy,"onTransitionRun"),Ai(Yy,"onTransitionStart"),Ai(jy,"onTransitionCancel"),Ai(Wp,"onTransitionEnd"),Qt("onMouseEnter",["mouseout","mouseover"]),Qt("onMouseLeave",["mouseout","mouseover"]),Qt("onPointerEnter",["pointerout","pointerover"]),Qt("onPointerLeave",["pointerout","pointerover"]),Bt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Bt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Bt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Bt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Bt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Bt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Bo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ux=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bo));function h_(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var y=o.length-1;0<=y;y--){var b=o[y],B=b.instance,tt=b.currentTarget;if(b=b.listener,B!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=tt;try{f(u)}catch(ht){_l(ht)}u.currentTarget=null,f=B}else for(y=0;y<o.length;y++){if(b=o[y],B=b.instance,tt=b.currentTarget,b=b.listener,B!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=tt;try{f(u)}catch(ht){_l(ht)}u.currentTarget=null,f=B}}}}function ve(e,n){var a=n[io];a===void 0&&(a=n[io]=new Set);var o=e+"__bubble";a.has(o)||(d_(n,e,2,!1),a.add(o))}function Zf(e,n,a){var o=0;n&&(o|=4),d_(a,e,o,n)}var ic="_reactListening"+Math.random().toString(36).slice(2);function Kf(e){if(!e[ic]){e[ic]=!0,Lt.forEach(function(a){a!=="selectionchange"&&(Ux.has(a)||Zf(a,!1,e),Zf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ic]||(n[ic]=!0,Zf("selectionchange",!1,n))}}function d_(e,n,a,o){switch(V_(n)){case 2:var u=sS;break;case 8:u=rS;break;default:u=fh}a=u.bind(null,n,a,e),u=void 0,!mu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Qf(e,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var b=o.stateNode.containerInfo;if(b===u)break;if(y===4)for(y=o.return;y!==null;){var B=y.tag;if((B===3||B===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;b!==null;){if(y=q(b),y===null)return;if(B=y.tag,B===5||B===6||B===26||B===27){o=f=y;continue t}b=b.parentNode}}o=o.return}vp(function(){var tt=f,ht=du(a),_t=[];t:{var nt=qp.get(e);if(nt!==void 0){var lt=pl,Gt=e;switch(e){case"keypress":if(hl(a)===0)break t;case"keydown":case"keyup":lt=by;break;case"focusin":Gt="focus",lt=yu;break;case"focusout":Gt="blur",lt=yu;break;case"beforeblur":case"afterblur":lt=yu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=Sp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=hy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Ry;break;case Vp:case kp:case Xp:lt=my;break;case Wp:lt=wy;break;case"scroll":case"scrollend":lt=uy;break;case"wheel":lt=Uy;break;case"copy":case"cut":case"paste":lt=_y;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Ep;break;case"toggle":case"beforetoggle":lt=Ny}var Jt=(n&4)!==0,Ge=!Jt&&(e==="scroll"||e==="scrollend"),j=Jt?nt!==null?nt+"Capture":null:nt;Jt=[];for(var V=tt,$;V!==null;){var mt=V;if($=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||$===null||j===null||(mt=ao(V,j),mt!=null&&Jt.push(Io(V,mt,$))),Ge)break;V=V.return}0<Jt.length&&(nt=new lt(nt,Gt,null,a,ht),_t.push({event:nt,listeners:Jt}))}}if((n&7)===0){t:{if(nt=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",nt&&a!==hu&&(Gt=a.relatedTarget||a.fromElement)&&(q(Gt)||Gt[Yi]))break t;if((lt||nt)&&(nt=ht.window===ht?ht:(nt=ht.ownerDocument)?nt.defaultView||nt.parentWindow:window,lt?(Gt=a.relatedTarget||a.toElement,lt=tt,Gt=Gt?q(Gt):null,Gt!==null&&(Ge=c(Gt),Jt=Gt.tag,Gt!==Ge||Jt!==5&&Jt!==27&&Jt!==6)&&(Gt=null)):(lt=null,Gt=tt),lt!==Gt)){if(Jt=Sp,mt="onMouseLeave",j="onMouseEnter",V="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Ep,mt="onPointerLeave",j="onPointerEnter",V="pointer"),Ge=lt==null?nt:ot(lt),$=Gt==null?nt:ot(Gt),nt=new Jt(mt,V+"leave",lt,a,ht),nt.target=Ge,nt.relatedTarget=$,mt=null,q(ht)===tt&&(Jt=new Jt(j,V+"enter",Gt,a,ht),Jt.target=$,Jt.relatedTarget=Ge,mt=Jt),Ge=mt,lt&&Gt)e:{for(Jt=Lx,j=lt,V=Gt,$=0,mt=j;mt;mt=Jt(mt))$++;mt=0;for(var Kt=V;Kt;Kt=Jt(Kt))mt++;for(;0<$-mt;)j=Jt(j),$--;for(;0<mt-$;)V=Jt(V),mt--;for(;$--;){if(j===V||V!==null&&j===V.alternate){Jt=j;break e}j=Jt(j),V=Jt(V)}Jt=null}else Jt=null;lt!==null&&p_(_t,nt,lt,Jt,!1),Gt!==null&&Ge!==null&&p_(_t,Ge,Gt,Jt,!0)}}t:{if(nt=tt?ot(tt):window,lt=nt.nodeName&&nt.nodeName.toLowerCase(),lt==="select"||lt==="input"&&nt.type==="file")var we=Up;else if(wp(nt))if(Lp)we=ky;else{we=Gy;var kt=Hy}else lt=nt.nodeName,!lt||lt.toLowerCase()!=="input"||nt.type!=="checkbox"&&nt.type!=="radio"?tt&&fu(tt.elementType)&&(we=Up):we=Vy;if(we&&(we=we(e,tt))){Dp(_t,we,a,ht);break t}kt&&kt(e,nt,tt),e==="focusout"&&tt&&nt.type==="number"&&tt.memoizedProps.value!=null&&_n(nt,"number",nt.value)}switch(kt=tt?ot(tt):window,e){case"focusin":(wp(kt)||kt.contentEditable==="true")&&(Ys=kt,Tu=tt,ho=null);break;case"focusout":ho=Tu=Ys=null;break;case"mousedown":Au=!0;break;case"contextmenu":case"mouseup":case"dragend":Au=!1,Hp(_t,a,ht);break;case"selectionchange":if(Wy)break;case"keydown":case"keyup":Hp(_t,a,ht)}var ue;if(Su)t:{switch(e){case"compositionstart":var Ee="onCompositionStart";break t;case"compositionend":Ee="onCompositionEnd";break t;case"compositionupdate":Ee="onCompositionUpdate";break t}Ee=void 0}else qs?Rp(e,a)&&(Ee="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Ee="onCompositionStart");Ee&&(bp&&a.locale!=="ko"&&(qs||Ee!=="onCompositionStart"?Ee==="onCompositionEnd"&&qs&&(ue=yp()):(Ma=ht,gu="value"in Ma?Ma.value:Ma.textContent,qs=!0)),kt=ac(tt,Ee),0<kt.length&&(Ee=new Mp(Ee,e,null,a,ht),_t.push({event:Ee,listeners:kt}),ue?Ee.data=ue:(ue=Cp(a),ue!==null&&(Ee.data=ue)))),(ue=Py?zy(e,a):By(e,a))&&(Ee=ac(tt,"onBeforeInput"),0<Ee.length&&(kt=new Mp("onBeforeInput","beforeinput",null,a,ht),_t.push({event:kt,listeners:Ee}),kt.data=ue)),Cx(_t,e,tt,a,ht)}h_(_t,n)})}function Io(e,n,a){return{instance:e,listener:n,currentTarget:a}}function ac(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=ao(e,a),u!=null&&o.unshift(Io(e,u,f)),u=ao(e,n),u!=null&&o.push(Io(e,u,f))),e.tag===3)return o;e=e.return}return[]}function Lx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function p_(e,n,a,o,u){for(var f=n._reactName,y=[];a!==null&&a!==o;){var b=a,B=b.alternate,tt=b.stateNode;if(b=b.tag,B!==null&&B===o)break;b!==5&&b!==26&&b!==27||tt===null||(B=tt,u?(tt=ao(a,f),tt!=null&&y.unshift(Io(a,tt,B))):u||(tt=ao(a,f),tt!=null&&y.push(Io(a,tt,B)))),a=a.return}y.length!==0&&e.push({event:n,listeners:y})}var Nx=/\r\n?/g,Ox=/\u0000|\uFFFD/g;function m_(e){return(typeof e=="string"?e:""+e).replace(Nx,`
`).replace(Ox,"")}function g_(e,n){return n=m_(n),m_(e)===n}function He(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||ks(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&ks(e,""+o);break;case"className":We(e,"class",o);break;case"tabIndex":We(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":We(e,a,o);break;case"style":gp(e,o,f);break;case"data":if(n!=="object"){We(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ul(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&He(e,n,"name",u.name,u,null),He(e,n,"formEncType",u.formEncType,u,null),He(e,n,"formMethod",u.formMethod,u,null),He(e,n,"formTarget",u.formTarget,u,null)):(He(e,n,"encType",u.encType,u,null),He(e,n,"method",u.method,u,null),He(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ul(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Zi);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=ul(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":ve("beforetoggle",e),ve("toggle",e),Ye(e,"popover",o);break;case"xlinkActuate":le(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":le(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":le(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":le(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":le(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":le(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":le(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":le(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":le(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ye(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ly.get(a)||a,Ye(e,a,o))}}function Jf(e,n,a,o,u,f){switch(a){case"style":gp(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?ks(e,o):(typeof o=="number"||typeof o=="bigint")&&ks(e,""+o);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Zi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!It.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[Cn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Ye(e,a,o)}}}function Ln(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ve("error",e),ve("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var y=a[f];if(y!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:He(e,n,f,y,a,null)}}u&&He(e,n,"srcSet",a.srcSet,a,null),o&&He(e,n,"src",a.src,a,null);return;case"input":ve("invalid",e);var b=f=y=u=null,B=null,tt=null;for(o in a)if(a.hasOwnProperty(o)){var ht=a[o];if(ht!=null)switch(o){case"name":u=ht;break;case"type":y=ht;break;case"checked":B=ht;break;case"defaultChecked":tt=ht;break;case"value":f=ht;break;case"defaultValue":b=ht;break;case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(s(137,n));break;default:He(e,n,o,ht,a,null)}}Hn(e,f,b,B,tt,y,u,!1);return;case"select":ve("invalid",e),o=y=f=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":f=b;break;case"defaultValue":y=b;break;case"multiple":o=b;default:He(e,n,u,b,a,null)}n=f,a=y,e.multiple=!!o,n!=null?on(e,!!o,n,!1):a!=null&&on(e,!!o,a,!0);return;case"textarea":ve("invalid",e),f=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(b=a[y],b!=null))switch(y){case"value":o=b;break;case"defaultValue":u=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:He(e,n,y,b,a,null)}Ii(e,o,u,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(o=a[B],o!=null))switch(B){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:He(e,n,B,o,a,null)}return;case"dialog":ve("beforetoggle",e),ve("toggle",e),ve("cancel",e),ve("close",e);break;case"iframe":case"object":ve("load",e);break;case"video":case"audio":for(o=0;o<Bo.length;o++)ve(Bo[o],e);break;case"image":ve("error",e),ve("load",e);break;case"details":ve("toggle",e);break;case"embed":case"source":case"link":ve("error",e),ve("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(o=a[tt],o!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:He(e,n,tt,o,a,null)}return;default:if(fu(n)){for(ht in a)a.hasOwnProperty(ht)&&(o=a[ht],o!==void 0&&Jf(e,n,ht,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&He(e,n,b,o,a,null))}function Px(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,y=null,b=null,B=null,tt=null,ht=null;for(lt in a){var _t=a[lt];if(a.hasOwnProperty(lt)&&_t!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":B=_t;default:o.hasOwnProperty(lt)||He(e,n,lt,null,o,_t)}}for(var nt in o){var lt=o[nt];if(_t=a[nt],o.hasOwnProperty(nt)&&(lt!=null||_t!=null))switch(nt){case"type":f=lt;break;case"name":u=lt;break;case"checked":tt=lt;break;case"defaultChecked":ht=lt;break;case"value":y=lt;break;case"defaultValue":b=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(s(137,n));break;default:lt!==_t&&He(e,n,nt,lt,o,_t)}}Pn(e,y,b,B,tt,ht,f,u);return;case"select":lt=y=b=nt=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":lt=B;default:o.hasOwnProperty(f)||He(e,n,f,null,o,B)}for(u in o)if(f=o[u],B=a[u],o.hasOwnProperty(u)&&(f!=null||B!=null))switch(u){case"value":nt=f;break;case"defaultValue":b=f;break;case"multiple":y=f;default:f!==B&&He(e,n,u,f,o,B)}n=b,a=y,o=lt,nt!=null?on(e,!!a,nt,!1):!!o!=!!a&&(n!=null?on(e,!!a,n,!0):on(e,!!a,a?[]:"",!1));return;case"textarea":lt=nt=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:He(e,n,b,null,o,u)}for(y in o)if(u=o[y],f=a[y],o.hasOwnProperty(y)&&(u!=null||f!=null))switch(y){case"value":nt=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&He(e,n,y,u,o,f)}Vs(e,nt,lt);return;case"option":for(var Gt in a)if(nt=a[Gt],a.hasOwnProperty(Gt)&&nt!=null&&!o.hasOwnProperty(Gt))switch(Gt){case"selected":e.selected=!1;break;default:He(e,n,Gt,null,o,nt)}for(B in o)if(nt=o[B],lt=a[B],o.hasOwnProperty(B)&&nt!==lt&&(nt!=null||lt!=null))switch(B){case"selected":e.selected=nt&&typeof nt!="function"&&typeof nt!="symbol";break;default:He(e,n,B,nt,o,lt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in a)nt=a[Jt],a.hasOwnProperty(Jt)&&nt!=null&&!o.hasOwnProperty(Jt)&&He(e,n,Jt,null,o,nt);for(tt in o)if(nt=o[tt],lt=a[tt],o.hasOwnProperty(tt)&&nt!==lt&&(nt!=null||lt!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(s(137,n));break;default:He(e,n,tt,nt,o,lt)}return;default:if(fu(n)){for(var Ge in a)nt=a[Ge],a.hasOwnProperty(Ge)&&nt!==void 0&&!o.hasOwnProperty(Ge)&&Jf(e,n,Ge,void 0,o,nt);for(ht in o)nt=o[ht],lt=a[ht],!o.hasOwnProperty(ht)||nt===lt||nt===void 0&&lt===void 0||Jf(e,n,ht,nt,o,lt);return}}for(var j in a)nt=a[j],a.hasOwnProperty(j)&&nt!=null&&!o.hasOwnProperty(j)&&He(e,n,j,null,o,nt);for(_t in o)nt=o[_t],lt=a[_t],!o.hasOwnProperty(_t)||nt===lt||nt==null&&lt==null||He(e,n,_t,nt,o,lt)}function __(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function zx(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,y=u.initiatorType,b=u.duration;if(f&&b&&__(y)){for(y=0,b=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],tt=B.startTime;if(tt>b)break;var ht=B.transferSize,_t=B.initiatorType;ht&&__(_t)&&(B=B.responseEnd,y+=ht*(B<b?1:(b-tt)/(B-tt)))}if(--o,n+=8*(f+y)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var $f=null,th=null;function sc(e){return e.nodeType===9?e:e.ownerDocument}function v_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function y_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function eh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var nh=null;function Bx(){var e=window.event;return e&&e.type==="popstate"?e===nh?!1:(nh=e,!0):(nh=null,!1)}var x_=typeof setTimeout=="function"?setTimeout:void 0,Ix=typeof clearTimeout=="function"?clearTimeout:void 0,S_=typeof Promise=="function"?Promise:void 0,Fx=typeof queueMicrotask=="function"?queueMicrotask:typeof S_<"u"?function(e){return S_.resolve(null).then(e).catch(Hx)}:x_;function Hx(e){setTimeout(function(){throw e})}function Fa(e){return e==="head"}function M_(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),xr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Fo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Fo(a);for(var f=a.firstChild;f;){var y=f.nextSibling,b=f.nodeName;f[as]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=y}}else a==="body"&&Fo(e.ownerDocument.body);a=u}while(a);xr(n)}function E_(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function ih(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":ih(a),R(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function Gx(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[as])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=vi(e.nextSibling),e===null)break}return null}function Vx(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=vi(e.nextSibling),e===null))return null;return e}function b_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=vi(e.nextSibling),e===null))return null;return e}function ah(e){return e.data==="$?"||e.data==="$~"}function sh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function kx(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function vi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var rh=null;function T_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return vi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function A_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function R_(e,n,a){switch(n=sc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Fo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);R(e)}var yi=new Map,C_=new Set;function rc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var fa=Z.d;Z.d={f:Xx,r:Wx,D:qx,C:Yx,L:jx,m:Zx,X:Qx,S:Kx,M:Jx};function Xx(){var e=fa.f(),n=Ql();return e||n}function Wx(e){var n=rt(e);n!==null&&n.tag===5&&n.type==="form"?Wm(n):fa.r(e)}var _r=typeof document>"u"?null:document;function w_(e,n,a){var o=_r;if(o&&typeof n=="string"&&n){var u=ge(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),C_.has(u)||(C_.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Ln(n,"link",e),St(n),o.head.appendChild(n)))}}function qx(e){fa.D(e),w_("dns-prefetch",e,null)}function Yx(e,n){fa.C(e,n),w_("preconnect",e,n)}function jx(e,n,a){fa.L(e,n,a);var o=_r;if(o&&e&&n){var u='link[rel="preload"][as="'+ge(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+ge(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+ge(a.imageSizes)+'"]')):u+='[href="'+ge(e)+'"]';var f=u;switch(n){case"style":f=vr(e);break;case"script":f=yr(e)}yi.has(f)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),yi.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Ho(f))||n==="script"&&o.querySelector(Go(f))||(n=o.createElement("link"),Ln(n,"link",e),St(n),o.head.appendChild(n)))}}function Zx(e,n){fa.m(e,n);var a=_r;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+ge(o)+'"][href="'+ge(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=yr(e)}if(!yi.has(f)&&(e=_({rel:"modulepreload",href:e},n),yi.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Go(f)))return}o=a.createElement("link"),Ln(o,"link",e),St(o),a.head.appendChild(o)}}}function Kx(e,n,a){fa.S(e,n,a);var o=_r;if(o&&e){var u=Y(o).hoistableStyles,f=vr(e);n=n||"default";var y=u.get(f);if(!y){var b={loading:0,preload:null};if(y=o.querySelector(Ho(f)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=yi.get(f))&&oh(e,a);var B=y=o.createElement("link");St(B),Ln(B,"link",e),B._p=new Promise(function(tt,ht){B.onload=tt,B.onerror=ht}),B.addEventListener("load",function(){b.loading|=1}),B.addEventListener("error",function(){b.loading|=2}),b.loading|=4,oc(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:b},u.set(f,y)}}}function Qx(e,n){fa.X(e,n);var a=_r;if(a&&e){var o=Y(a).hoistableScripts,u=yr(e),f=o.get(u);f||(f=a.querySelector(Go(u)),f||(e=_({src:e,async:!0},n),(n=yi.get(u))&&lh(e,n),f=a.createElement("script"),St(f),Ln(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function Jx(e,n){fa.M(e,n);var a=_r;if(a&&e){var o=Y(a).hoistableScripts,u=yr(e),f=o.get(u);f||(f=a.querySelector(Go(u)),f||(e=_({src:e,async:!0,type:"module"},n),(n=yi.get(u))&&lh(e,n),f=a.createElement("script"),St(f),Ln(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function D_(e,n,a,o){var u=(u=st.current)?rc(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=vr(a.href),a=Y(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=vr(a.href);var f=Y(u).hoistableStyles,y=f.get(e);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,y),(f=u.querySelector(Ho(e)))&&!f._p&&(y.instance=f,y.state.loading=5),yi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(e,a),f||$x(u,e,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=yr(a),a=Y(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function vr(e){return'href="'+ge(e)+'"'}function Ho(e){return'link[rel="stylesheet"]['+e+"]"}function U_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function $x(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Ln(n,"link",a),St(n),e.head.appendChild(n))}function yr(e){return'[src="'+ge(e)+'"]'}function Go(e){return"script[async]"+e}function L_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+ge(a.href)+'"]');if(o)return n.instance=o,St(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),St(o),Ln(o,"style",u),oc(o,a.precedence,e),n.instance=o;case"stylesheet":u=vr(a.href);var f=e.querySelector(Ho(u));if(f)return n.state.loading|=4,n.instance=f,St(f),f;o=U_(a),(u=yi.get(u))&&oh(o,u),f=(e.ownerDocument||e).createElement("link"),St(f);var y=f;return y._p=new Promise(function(b,B){y.onload=b,y.onerror=B}),Ln(f,"link",o),n.state.loading|=4,oc(f,a.precedence,e),n.instance=f;case"script":return f=yr(a.src),(u=e.querySelector(Go(f)))?(n.instance=u,St(u),u):(o=a,(u=yi.get(f))&&(o=_({},a),lh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),St(u),Ln(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,oc(o,a.precedence,e));return n.instance}function oc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,y=0;y<o.length;y++){var b=o[y];if(b.dataset.precedence===n)f=b;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function oh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function lh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var lc=null;function N_(e,n,a){if(lc===null){var o=new Map,u=lc=new Map;u.set(a,o)}else u=lc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[as]||f[en]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var y=f.getAttribute(n)||"";y=e+y;var b=o.get(y);b?b.push(f):o.set(y,[f])}}return o}function O_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function tS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function P_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function eS(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=vr(o.href),f=n.querySelector(Ho(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=cc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,St(f);return}f=n.ownerDocument||n,o=U_(o),(u=yi.get(u))&&oh(o,u),f=f.createElement("link"),St(f);var y=f;y._p=new Promise(function(b,B){y.onload=b,y.onerror=B}),Ln(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=cc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var ch=0;function nS(e,n){return e.stylesheets&&e.count===0&&fc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&fc(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&ch===0&&(ch=62500*zx());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&fc(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>ch?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function cc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)fc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var uc=null;function fc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,uc=new Map,n.forEach(iS,e),uc=null,cc.call(e))}function iS(e,n){if(!(n.state.loading&4)){var a=uc.get(e);if(a)var o=a.get(null);else{a=new Map,uc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var y=u[f];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),f=a.get(y)||o,f===o&&a.set(null,u),a.set(y,u),this.count++,o=cc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Vo={$$typeof:O,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function aS(e,n,a,o,u,f,y,b,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function z_(e,n,a,o,u,f,y,b,B,tt,ht,_t){return e=new aS(e,n,a,y,B,tt,ht,_t,b),n=1,f===!0&&(n|=24),f=ii(3,null,null,n),e.current=f,f.stateNode=e,n=Gu(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Wu(f),e}function B_(e){return e?(e=Ks,e):Ks}function I_(e,n,a,o,u,f){u=B_(u),o.context===null?o.context=u:o.pendingContext=u,o=Ca(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=wa(e,o,n),a!==null&&(Kn(a,e,n),xo(a,e,n))}function F_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function uh(e,n){F_(e,n),(e=e.alternate)&&F_(e,n)}function H_(e){if(e.tag===13||e.tag===31){var n=cs(e,67108864);n!==null&&Kn(n,e,67108864),uh(e,67108864)}}function G_(e){if(e.tag===13||e.tag===31){var n=li();n=ns(n);var a=cs(e,n);a!==null&&Kn(a,e,n),uh(e,n)}}var hc=!0;function sS(e,n,a,o){var u=P.T;P.T=null;var f=Z.p;try{Z.p=2,fh(e,n,a,o)}finally{Z.p=f,P.T=u}}function rS(e,n,a,o){var u=P.T;P.T=null;var f=Z.p;try{Z.p=8,fh(e,n,a,o)}finally{Z.p=f,P.T=u}}function fh(e,n,a,o){if(hc){var u=hh(o);if(u===null)Qf(e,n,o,dc,a),k_(e,o);else if(lS(u,e,n,a,o))o.stopPropagation();else if(k_(e,o),n&4&&-1<oS.indexOf(e)){for(;u!==null;){var f=rt(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var y=wt(f.pendingLanes);if(y!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;y;){var B=1<<31-$t(y);b.entanglements[1]|=B,y&=~B}Vi(f),(Le&6)===0&&(Zl=pt()+500,zo(0))}}break;case 31:case 13:b=cs(f,2),b!==null&&Kn(b,f,2),Ql(),uh(f,2)}if(f=hh(o),f===null&&Qf(e,n,o,dc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Qf(e,n,o,null,a)}}function hh(e){return e=du(e),dh(e)}var dc=null;function dh(e){if(dc=null,e=q(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return dc=e,null}function V_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bt()){case gt:return 2;case Xt:return 8;case Dt:case Ft:return 32;case xe:return 268435456;default:return 32}default:return 32}}var ph=!1,Ha=null,Ga=null,Va=null,ko=new Map,Xo=new Map,ka=[],oS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function k_(e,n){switch(e){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":Ga=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":ko.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xo.delete(n.pointerId)}}function Wo(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=rt(n),n!==null&&H_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function lS(e,n,a,o,u){switch(n){case"focusin":return Ha=Wo(Ha,e,n,a,o,u),!0;case"dragenter":return Ga=Wo(Ga,e,n,a,o,u),!0;case"mouseover":return Va=Wo(Va,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return ko.set(f,Wo(ko.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Xo.set(f,Wo(Xo.get(f)||null,e,n,a,o,u)),!0}return!1}function X_(e){var n=q(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,is(e.priority,function(){G_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,is(e.priority,function(){G_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function pc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=hh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);hu=o,a.target.dispatchEvent(o),hu=null}else return n=rt(a),n!==null&&H_(n),e.blockedOn=a,!1;n.shift()}return!0}function W_(e,n,a){pc(e)&&a.delete(n)}function cS(){ph=!1,Ha!==null&&pc(Ha)&&(Ha=null),Ga!==null&&pc(Ga)&&(Ga=null),Va!==null&&pc(Va)&&(Va=null),ko.forEach(W_),Xo.forEach(W_)}function mc(e,n){e.blockedOn===n&&(e.blockedOn=null,ph||(ph=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,cS)))}var gc=null;function q_(e){gc!==e&&(gc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){gc===e&&(gc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(dh(o||a)===null)continue;break}var f=rt(a);f!==null&&(e.splice(n,3),n-=3,hf(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function xr(e){function n(B){return mc(B,e)}Ha!==null&&mc(Ha,e),Ga!==null&&mc(Ga,e),Va!==null&&mc(Va,e),ko.forEach(n),Xo.forEach(n);for(var a=0;a<ka.length;a++){var o=ka[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ka.length&&(a=ka[0],a.blockedOn===null);)X_(a),a.blockedOn===null&&ka.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],y=u[Cn]||null;if(typeof f=="function")y||q_(a);else if(y){var b=null;if(f&&f.hasAttribute("formAction")){if(u=f,y=f[Cn]||null)b=y.formAction;else if(dh(u)!==null)continue}else b=y.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),q_(a)}}}function Y_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function mh(e){this._internalRoot=e}_c.prototype.render=mh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=li();I_(a,o,e,n,null,null)},_c.prototype.unmount=mh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;I_(e.current,2,null,e,null,null),Ql(),n[Yi]=null}};function _c(e){this._internalRoot=e}_c.prototype.unstable_scheduleHydration=function(e){if(e){var n=no();e={blockedOn:null,target:e,priority:n};for(var a=0;a<ka.length&&n!==0&&n<ka[a].priority;a++);ka.splice(a,0,e),a===0&&X_(e)}};var j_=t.version;if(j_!=="19.2.8")throw Error(s(527,j_,"19.2.8"));Z.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=m(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var uS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vc.isDisabled&&vc.supportsFiber)try{jt=vc.inject(uS),Wt=vc}catch{}}return Yo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=eg,f=ng,y=ig;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=z_(e,1,!1,null,null,a,o,null,u,f,y,Y_),e[Yi]=n.current,Kf(e),new mh(n)},Yo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",f=eg,y=ng,b=ig,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=z_(e,1,!0,n,a??null,o,u,B,f,y,b,Y_),n.context=B_(null),a=n.current,o=li(),o=ns(o),u=Ca(o),u.callback=null,wa(a,u,o),a=o,n.current.lanes=a,Rn(n,a),Vi(n),e[Yi]=n.current,Kf(e),new _c(n)},Yo.version="19.2.8",Yo}var av;function MS(){if(av)return vh.exports;av=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),vh.exports=SS(),vh.exports}var ES=MS();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const np="171",Hr={ROTATE:0,DOLLY:1,PAN:2},Br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bS=0,sv=1,TS=2,M0=1,E0=2,_a=3,ts=0,$n=1,Ei=2,Ja=0,Gr=1,rv=2,ov=3,lv=4,AS=5,Ls=100,RS=101,CS=102,wS=103,DS=104,US=200,LS=201,NS=202,OS=203,fd=204,hd=205,PS=206,zS=207,BS=208,IS=209,FS=210,HS=211,GS=212,VS=213,kS=214,dd=0,pd=1,md=2,Xr=3,gd=4,_d=5,vd=6,yd=7,b0=0,XS=1,WS=2,$a=0,qS=1,YS=2,jS=3,ZS=4,KS=5,QS=6,JS=7,T0=300,Wr=301,qr=302,xd=303,Sd=304,su=306,Md=1e3,Ps=1001,Ed=1002,zi=1003,$S=1004,yc=1005,Wi=1006,Mh=1007,zs=1008,Sa=1009,A0=1010,R0=1011,al=1012,ip=1013,Bs=1014,va=1015,rl=1016,ap=1017,sp=1018,Yr=1020,C0=35902,w0=1021,D0=1022,Pi=1023,U0=1024,L0=1025,Vr=1026,jr=1027,N0=1028,rp=1029,O0=1030,op=1031,lp=1033,qc=33776,Yc=33777,jc=33778,Zc=33779,bd=35840,Td=35841,Ad=35842,Rd=35843,Cd=36196,wd=37492,Dd=37496,Ud=37808,Ld=37809,Nd=37810,Od=37811,Pd=37812,zd=37813,Bd=37814,Id=37815,Fd=37816,Hd=37817,Gd=37818,Vd=37819,kd=37820,Xd=37821,Kc=36492,Wd=36494,qd=36495,P0=36283,Yd=36284,jd=36285,Zd=36286,tM=3200,eM=3201,z0=0,nM=1,Qa="",Si="srgb",Zr="srgb-linear",$c="linear",Ve="srgb",Sr=7680,cv=519,iM=512,aM=513,sM=514,B0=515,rM=516,oM=517,lM=518,cM=519,uv=35044,fv="300 es",ya=2e3,tu=2001;class Fs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hv=1234567;const el=Math.PI/180,sl=180/Math.PI;function Qr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]).toLowerCase()}function pe(r,t,i){return Math.max(t,Math.min(i,r))}function cp(r,t){return(r%t+t)%t}function uM(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function fM(r,t,i){return r!==t?(i-r)/(t-r):0}function nl(r,t,i){return(1-i)*r+i*t}function hM(r,t,i,s){return nl(r,t,1-Math.exp(-i*s))}function dM(r,t=1){return t-Math.abs(cp(r,t*2)-t)}function pM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function mM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function gM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function _M(r,t){return r+Math.random()*(t-r)}function vM(r){return r*(.5-Math.random())}function yM(r){r!==void 0&&(hv=r);let t=hv+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xM(r){return r*el}function SM(r){return r*sl}function MM(r){return(r&r-1)===0&&r!==0}function EM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function bM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function TM(r,t,i,s,l){const c=Math.cos,h=Math.sin,d=c(i/2),p=h(i/2),m=c((t+s)/2),g=h((t+s)/2),_=c((t-s)/2),x=h((t-s)/2),S=c((s-t)/2),E=h((s-t)/2);switch(l){case"XYX":r.set(d*g,p*_,p*x,d*m);break;case"YZY":r.set(p*x,d*g,p*_,d*m);break;case"ZXZ":r.set(p*_,p*x,d*g,d*m);break;case"XZX":r.set(d*g,p*E,p*S,d*m);break;case"YXY":r.set(p*S,d*g,p*E,d*m);break;case"ZYZ":r.set(p*E,p*S,d*g,d*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Pr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Vn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Qc={DEG2RAD:el,RAD2DEG:sl,generateUUID:Qr,clamp:pe,euclideanModulo:cp,mapLinear:uM,inverseLerp:fM,lerp:nl,damp:hM,pingpong:dM,smoothstep:pM,smootherstep:mM,randInt:gM,randFloat:_M,randFloatSpread:vM,seededRandom:yM,degToRad:xM,radToDeg:SM,isPowerOfTwo:MM,ceilPowerOfTwo:EM,floorPowerOfTwo:bM,setQuaternionFromProperEuler:TM,normalize:Vn,denormalize:Pr};class re{constructor(t=0,i=0){re.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=pe(this.x,t.x,i.x),this.y=pe(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=pe(this.x,t,i),this.y=pe(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(pe(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(pe(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class se{constructor(t,i,s,l,c,h,d,p,m){se.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,p,m)}set(t,i,s,l,c,h,d,p,m){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=p,g[6]=s,g[7]=h,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],p=s[6],m=s[1],g=s[4],_=s[7],x=s[2],S=s[5],E=s[8],A=l[0],M=l[3],v=l[6],F=l[1],O=l[4],U=l[7],Q=l[2],X=l[5],z=l[8];return c[0]=h*A+d*F+p*Q,c[3]=h*M+d*O+p*X,c[6]=h*v+d*U+p*z,c[1]=m*A+g*F+_*Q,c[4]=m*M+g*O+_*X,c[7]=m*v+g*U+_*z,c[2]=x*A+S*F+E*Q,c[5]=x*M+S*O+E*X,c[8]=x*v+S*U+E*z,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],p=t[6],m=t[7],g=t[8];return i*h*g-i*d*m-s*c*g+s*d*p+l*c*m-l*h*p}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],p=t[6],m=t[7],g=t[8],_=g*h-d*m,x=d*p-g*c,S=m*c-h*p,E=i*_+s*x+l*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=_*A,t[1]=(l*m-g*s)*A,t[2]=(d*s-l*h)*A,t[3]=x*A,t[4]=(g*i-l*p)*A,t[5]=(l*c-d*i)*A,t[6]=S*A,t[7]=(s*p-m*i)*A,t[8]=(h*i-s*c)*A,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,d){const p=Math.cos(c),m=Math.sin(c);return this.set(s*p,s*m,-s*(p*h+m*d)+h+t,-l*m,l*p,-l*(-m*h+p*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(Eh.makeScale(t,i)),this}rotate(t){return this.premultiply(Eh.makeRotation(-t)),this}translate(t,i){return this.premultiply(Eh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Eh=new se;function I0(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function eu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function AM(){const r=eu("canvas");return r.style.display="block",r}const dv={};function zr(r){r in dv||(dv[r]=!0,console.warn(r))}function RM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function CM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function wM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const pv=new se().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mv=new se().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function DM(){const r={enabled:!0,workingColorSpace:Zr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Ve&&(l.r=xa(l.r),l.g=xa(l.g),l.b=xa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ve&&(l.r=kr(l.r),l.g=kr(l.g),l.b=kr(l.b))),l},fromWorkingColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},toWorkingColorSpace:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Qa?$c:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Zr]:{primaries:t,whitePoint:s,transfer:$c,toXYZ:pv,fromXYZ:mv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Si},outputColorSpaceConfig:{drawingBufferColorSpace:Si}},[Si]:{primaries:t,whitePoint:s,transfer:Ve,toXYZ:pv,fromXYZ:mv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Si}}}),r}const Ue=DM();function xa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function kr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Mr;class UM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Mr===void 0&&(Mr=eu("canvas")),Mr.width=t.width,Mr.height=t.height;const s=Mr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Mr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=eu("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=xa(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(xa(i[s]/255)*255):i[s]=xa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let LM=0;class F0{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:LM++}),this.uuid=Qr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(bh(l[h].image)):c.push(bh(l[h]))}else c=bh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function bh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?UM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let NM=0;class ti extends Fs{constructor(t=ti.DEFAULT_IMAGE,i=ti.DEFAULT_MAPPING,s=Ps,l=Ps,c=Wi,h=zs,d=Pi,p=Sa,m=ti.DEFAULT_ANISOTROPY,g=Qa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:NM++}),this.uuid=Qr(),this.name="",this.source=new F0(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==T0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Md:t.x=t.x-Math.floor(t.x);break;case Ps:t.x=t.x<0?0:1;break;case Ed:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Md:t.y=t.y-Math.floor(t.y);break;case Ps:t.y=t.y<0?0:1;break;case Ed:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ti.DEFAULT_IMAGE=null;ti.DEFAULT_MAPPING=T0;ti.DEFAULT_ANISOTROPY=1;class rn{constructor(t=0,i=0,s=0,l=1){rn.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const p=t.elements,m=p[0],g=p[4],_=p[8],x=p[1],S=p[5],E=p[9],A=p[2],M=p[6],v=p[10];if(Math.abs(g-x)<.01&&Math.abs(_-A)<.01&&Math.abs(E-M)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+A)<.1&&Math.abs(E+M)<.1&&Math.abs(m+S+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(m+1)/2,U=(S+1)/2,Q=(v+1)/2,X=(g+x)/4,z=(_+A)/4,J=(E+M)/4;return O>U&&O>Q?O<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(O),l=X/s,c=z/s):U>Q?U<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),s=X/l,c=J/l):Q<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(Q),s=z/c,l=J/c),this.set(s,l,c,i),this}let F=Math.sqrt((M-E)*(M-E)+(_-A)*(_-A)+(x-g)*(x-g));return Math.abs(F)<.001&&(F=1),this.x=(M-E)/F,this.y=(_-A)/F,this.z=(x-g)/F,this.w=Math.acos((m+S+v-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=pe(this.x,t.x,i.x),this.y=pe(this.y,t.y,i.y),this.z=pe(this.z,t.z,i.z),this.w=pe(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=pe(this.x,t,i),this.y=pe(this.y,t,i),this.z=pe(this.z,t,i),this.w=pe(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(pe(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class OM extends Fs{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new rn(0,0,t,i),this.scissorTest=!1,this.viewport=new rn(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new ti(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new F0(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends OM{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class H0 extends ti{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=zi,this.minFilter=zi,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class PM extends ti{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=zi,this.minFilter=zi,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,d){let p=s[l+0],m=s[l+1],g=s[l+2],_=s[l+3];const x=c[h+0],S=c[h+1],E=c[h+2],A=c[h+3];if(d===0){t[i+0]=p,t[i+1]=m,t[i+2]=g,t[i+3]=_;return}if(d===1){t[i+0]=x,t[i+1]=S,t[i+2]=E,t[i+3]=A;return}if(_!==A||p!==x||m!==S||g!==E){let M=1-d;const v=p*x+m*S+g*E+_*A,F=v>=0?1:-1,O=1-v*v;if(O>Number.EPSILON){const Q=Math.sqrt(O),X=Math.atan2(Q,v*F);M=Math.sin(M*X)/Q,d=Math.sin(d*X)/Q}const U=d*F;if(p=p*M+x*U,m=m*M+S*U,g=g*M+E*U,_=_*M+A*U,M===1-d){const Q=1/Math.sqrt(p*p+m*m+g*g+_*_);p*=Q,m*=Q,g*=Q,_*=Q}}t[i]=p,t[i+1]=m,t[i+2]=g,t[i+3]=_}static multiplyQuaternionsFlat(t,i,s,l,c,h){const d=s[l],p=s[l+1],m=s[l+2],g=s[l+3],_=c[h],x=c[h+1],S=c[h+2],E=c[h+3];return t[i]=d*E+g*_+p*S-m*x,t[i+1]=p*E+g*x+m*_-d*S,t[i+2]=m*E+g*S+d*x-p*_,t[i+3]=g*E-d*_-p*x-m*S,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,p=Math.sin,m=d(s/2),g=d(l/2),_=d(c/2),x=p(s/2),S=p(l/2),E=p(c/2);switch(h){case"XYZ":this._x=x*g*_+m*S*E,this._y=m*S*_-x*g*E,this._z=m*g*E+x*S*_,this._w=m*g*_-x*S*E;break;case"YXZ":this._x=x*g*_+m*S*E,this._y=m*S*_-x*g*E,this._z=m*g*E-x*S*_,this._w=m*g*_+x*S*E;break;case"ZXY":this._x=x*g*_-m*S*E,this._y=m*S*_+x*g*E,this._z=m*g*E+x*S*_,this._w=m*g*_-x*S*E;break;case"ZYX":this._x=x*g*_-m*S*E,this._y=m*S*_+x*g*E,this._z=m*g*E-x*S*_,this._w=m*g*_+x*S*E;break;case"YZX":this._x=x*g*_+m*S*E,this._y=m*S*_+x*g*E,this._z=m*g*E-x*S*_,this._w=m*g*_-x*S*E;break;case"XZY":this._x=x*g*_-m*S*E,this._y=m*S*_-x*g*E,this._z=m*g*E+x*S*_,this._w=m*g*_+x*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],p=i[9],m=i[2],g=i[6],_=i[10],x=s+d+_;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(g-p)*S,this._y=(c-m)*S,this._z=(h-l)*S}else if(s>d&&s>_){const S=2*Math.sqrt(1+s-d-_);this._w=(g-p)/S,this._x=.25*S,this._y=(l+h)/S,this._z=(c+m)/S}else if(d>_){const S=2*Math.sqrt(1+d-s-_);this._w=(c-m)/S,this._x=(l+h)/S,this._y=.25*S,this._z=(p+g)/S}else{const S=2*Math.sqrt(1+_-s-d);this._w=(h-l)/S,this._x=(c+m)/S,this._y=(p+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pe(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,d=i._x,p=i._y,m=i._z,g=i._w;return this._x=s*g+h*d+l*m-c*p,this._y=l*g+h*p+c*d-s*m,this._z=c*g+h*m+s*p-l*d,this._w=h*g-s*d-l*p-c*m,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=c,this;const p=1-d*d;if(p<=Number.EPSILON){const S=1-i;return this._w=S*h+i*this._w,this._x=S*s+i*this._x,this._y=S*l+i*this._y,this._z=S*c+i*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,d),_=Math.sin((1-i)*g)/m,x=Math.sin(i*g)/m;return this._w=h*_+this._w*x,this._x=s*_+this._x*x,this._y=l*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,i=0,s=0){I.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(gv.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(gv.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,d=t.z,p=t.w,m=2*(h*l-d*s),g=2*(d*i-c*l),_=2*(c*s-h*i);return this.x=i+p*m+h*_-d*g,this.y=s+p*g+d*m-c*_,this.z=l+p*_+c*g-h*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=pe(this.x,t.x,i.x),this.y=pe(this.y,t.y,i.y),this.z=pe(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=pe(this.x,t,i),this.y=pe(this.y,t,i),this.z=pe(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(pe(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,d=i.y,p=i.z;return this.x=l*p-c*d,this.y=c*h-s*p,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Th.copy(this).projectOnVector(t),this.sub(Th)}reflect(t){return this.sub(Th.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(pe(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Th=new I,gv=new Nn;class Ni{constructor(t=new I(1/0,1/0,1/0),i=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(wi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(wi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=wi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,wi):wi.fromBufferAttribute(c,h),wi.applyMatrix4(t.matrixWorld),this.expandByPoint(wi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),xc.copy(s.boundingBox)),xc.applyMatrix4(t.matrixWorld),this.union(xc)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wi),wi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(jo),Sc.subVectors(this.max,jo),Er.subVectors(t.a,jo),br.subVectors(t.b,jo),Tr.subVectors(t.c,jo),Wa.subVectors(br,Er),qa.subVectors(Tr,br),Ms.subVectors(Er,Tr);let i=[0,-Wa.z,Wa.y,0,-qa.z,qa.y,0,-Ms.z,Ms.y,Wa.z,0,-Wa.x,qa.z,0,-qa.x,Ms.z,0,-Ms.x,-Wa.y,Wa.x,0,-qa.y,qa.x,0,-Ms.y,Ms.x,0];return!Ah(i,Er,br,Tr,Sc)||(i=[1,0,0,0,1,0,0,0,1],!Ah(i,Er,br,Tr,Sc))?!1:(Mc.crossVectors(Wa,qa),i=[Mc.x,Mc.y,Mc.z],Ah(i,Er,br,Tr,Sc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ha[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ha[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ha[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ha[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ha[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ha[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ha[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ha[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ha),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ha=[new I,new I,new I,new I,new I,new I,new I,new I],wi=new I,xc=new Ni,Er=new I,br=new I,Tr=new I,Wa=new I,qa=new I,Ms=new I,jo=new I,Sc=new I,Mc=new I,Es=new I;function Ah(r,t,i,s,l){for(let c=0,h=r.length-3;c<=h;c+=3){Es.fromArray(r,c);const d=l.x*Math.abs(Es.x)+l.y*Math.abs(Es.y)+l.z*Math.abs(Es.z),p=t.dot(Es),m=i.dot(Es),g=s.dot(Es);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>d)return!1}return!0}const zM=new Ni,Zo=new I,Rh=new I;class ru{constructor(t=new I,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):zM.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zo.subVectors(t,this.center);const i=Zo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Zo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Rh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zo.copy(t.center).add(Rh)),this.expandByPoint(Zo.copy(t.center).sub(Rh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const da=new I,Ch=new I,Ec=new I,Ya=new I,wh=new I,bc=new I,Dh=new I;class ol{constructor(t=new I,i=new I(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,da)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=da.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(da.copy(this.origin).addScaledVector(this.direction,i),da.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){Ch.copy(t).add(i).multiplyScalar(.5),Ec.copy(i).sub(t).normalize(),Ya.copy(this.origin).sub(Ch);const c=t.distanceTo(i)*.5,h=-this.direction.dot(Ec),d=Ya.dot(this.direction),p=-Ya.dot(Ec),m=Ya.lengthSq(),g=Math.abs(1-h*h);let _,x,S,E;if(g>0)if(_=h*p-d,x=h*d-p,E=c*g,_>=0)if(x>=-E)if(x<=E){const A=1/g;_*=A,x*=A,S=_*(_+h*x+2*d)+x*(h*_+x+2*p)+m}else x=c,_=Math.max(0,-(h*x+d)),S=-_*_+x*(x+2*p)+m;else x=-c,_=Math.max(0,-(h*x+d)),S=-_*_+x*(x+2*p)+m;else x<=-E?(_=Math.max(0,-(-h*c+d)),x=_>0?-c:Math.min(Math.max(-c,-p),c),S=-_*_+x*(x+2*p)+m):x<=E?(_=0,x=Math.min(Math.max(-c,-p),c),S=x*(x+2*p)+m):(_=Math.max(0,-(h*c+d)),x=_>0?c:Math.min(Math.max(-c,-p),c),S=-_*_+x*(x+2*p)+m);else x=h>0?-c:c,_=Math.max(0,-(h*x+d)),S=-_*_+x*(x+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(Ch).addScaledVector(Ec,x),S}intersectSphere(t,i){da.subVectors(t.center,this.origin);const s=da.dot(this.direction),l=da.dot(da)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,p=s+h;return p<0?null:d<0?this.at(p,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,d,p;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(s=(t.min.x-x.x)*m,l=(t.max.x-x.x)*m):(s=(t.max.x-x.x)*m,l=(t.min.x-x.x)*m),g>=0?(c=(t.min.y-x.y)*g,h=(t.max.y-x.y)*g):(c=(t.max.y-x.y)*g,h=(t.min.y-x.y)*g),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),_>=0?(d=(t.min.z-x.z)*_,p=(t.max.z-x.z)*_):(d=(t.max.z-x.z)*_,p=(t.min.z-x.z)*_),s>p||d>l)||((d>s||s!==s)&&(s=d),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,da)!==null}intersectTriangle(t,i,s,l,c){wh.subVectors(i,t),bc.subVectors(s,t),Dh.crossVectors(wh,bc);let h=this.direction.dot(Dh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ya.subVectors(this.origin,t);const p=d*this.direction.dot(bc.crossVectors(Ya,bc));if(p<0)return null;const m=d*this.direction.dot(wh.cross(Ya));if(m<0||p+m>h)return null;const g=-d*Ya.dot(Dh);return g<0?null:this.at(g/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(t,i,s,l,c,h,d,p,m,g,_,x,S,E,A,M){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,p,m,g,_,x,S,E,A,M)}set(t,i,s,l,c,h,d,p,m,g,_,x,S,E,A,M){const v=this.elements;return v[0]=t,v[4]=i,v[8]=s,v[12]=l,v[1]=c,v[5]=h,v[9]=d,v[13]=p,v[2]=m,v[6]=g,v[10]=_,v[14]=x,v[3]=S,v[7]=E,v[11]=A,v[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/Ar.setFromMatrixColumn(t,0).length(),c=1/Ar.setFromMatrixColumn(t,1).length(),h=1/Ar.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),d=Math.sin(s),p=Math.cos(l),m=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const x=h*g,S=h*_,E=d*g,A=d*_;i[0]=p*g,i[4]=-p*_,i[8]=m,i[1]=S+E*m,i[5]=x-A*m,i[9]=-d*p,i[2]=A-x*m,i[6]=E+S*m,i[10]=h*p}else if(t.order==="YXZ"){const x=p*g,S=p*_,E=m*g,A=m*_;i[0]=x+A*d,i[4]=E*d-S,i[8]=h*m,i[1]=h*_,i[5]=h*g,i[9]=-d,i[2]=S*d-E,i[6]=A+x*d,i[10]=h*p}else if(t.order==="ZXY"){const x=p*g,S=p*_,E=m*g,A=m*_;i[0]=x-A*d,i[4]=-h*_,i[8]=E+S*d,i[1]=S+E*d,i[5]=h*g,i[9]=A-x*d,i[2]=-h*m,i[6]=d,i[10]=h*p}else if(t.order==="ZYX"){const x=h*g,S=h*_,E=d*g,A=d*_;i[0]=p*g,i[4]=E*m-S,i[8]=x*m+A,i[1]=p*_,i[5]=A*m+x,i[9]=S*m-E,i[2]=-m,i[6]=d*p,i[10]=h*p}else if(t.order==="YZX"){const x=h*p,S=h*m,E=d*p,A=d*m;i[0]=p*g,i[4]=A-x*_,i[8]=E*_+S,i[1]=_,i[5]=h*g,i[9]=-d*g,i[2]=-m*g,i[6]=S*_+E,i[10]=x-A*_}else if(t.order==="XZY"){const x=h*p,S=h*m,E=d*p,A=d*m;i[0]=p*g,i[4]=-_,i[8]=m*g,i[1]=x*_+A,i[5]=h*g,i[9]=S*_-E,i[2]=E*_-S,i[6]=d*g,i[10]=A*_+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(BM,t,IM)}lookAt(t,i,s){const l=this.elements;return ci.subVectors(t,i),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),ja.crossVectors(s,ci),ja.lengthSq()===0&&(Math.abs(s.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),ja.crossVectors(s,ci)),ja.normalize(),Tc.crossVectors(ci,ja),l[0]=ja.x,l[4]=Tc.x,l[8]=ci.x,l[1]=ja.y,l[5]=Tc.y,l[9]=ci.y,l[2]=ja.z,l[6]=Tc.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],p=s[8],m=s[12],g=s[1],_=s[5],x=s[9],S=s[13],E=s[2],A=s[6],M=s[10],v=s[14],F=s[3],O=s[7],U=s[11],Q=s[15],X=l[0],z=l[4],J=l[8],D=l[12],C=l[1],k=l[5],ft=l[9],ct=l[13],vt=l[2],yt=l[6],P=l[10],Z=l[14],K=l[3],Mt=l[7],Tt=l[11],N=l[15];return c[0]=h*X+d*C+p*vt+m*K,c[4]=h*z+d*k+p*yt+m*Mt,c[8]=h*J+d*ft+p*P+m*Tt,c[12]=h*D+d*ct+p*Z+m*N,c[1]=g*X+_*C+x*vt+S*K,c[5]=g*z+_*k+x*yt+S*Mt,c[9]=g*J+_*ft+x*P+S*Tt,c[13]=g*D+_*ct+x*Z+S*N,c[2]=E*X+A*C+M*vt+v*K,c[6]=E*z+A*k+M*yt+v*Mt,c[10]=E*J+A*ft+M*P+v*Tt,c[14]=E*D+A*ct+M*Z+v*N,c[3]=F*X+O*C+U*vt+Q*K,c[7]=F*z+O*k+U*yt+Q*Mt,c[11]=F*J+O*ft+U*P+Q*Tt,c[15]=F*D+O*ct+U*Z+Q*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],d=t[5],p=t[9],m=t[13],g=t[2],_=t[6],x=t[10],S=t[14],E=t[3],A=t[7],M=t[11],v=t[15];return E*(+c*p*_-l*m*_-c*d*x+s*m*x+l*d*S-s*p*S)+A*(+i*p*S-i*m*x+c*h*x-l*h*S+l*m*g-c*p*g)+M*(+i*m*_-i*d*S-c*h*_+s*h*S+c*d*g-s*m*g)+v*(-l*d*g-i*p*_+i*d*x+l*h*_-s*h*x+s*p*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],p=t[6],m=t[7],g=t[8],_=t[9],x=t[10],S=t[11],E=t[12],A=t[13],M=t[14],v=t[15],F=_*M*m-A*x*m+A*p*S-d*M*S-_*p*v+d*x*v,O=E*x*m-g*M*m-E*p*S+h*M*S+g*p*v-h*x*v,U=g*A*m-E*_*m+E*d*S-h*A*S-g*d*v+h*_*v,Q=E*_*p-g*A*p-E*d*x+h*A*x+g*d*M-h*_*M,X=i*F+s*O+l*U+c*Q;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/X;return t[0]=F*z,t[1]=(A*x*c-_*M*c-A*l*S+s*M*S+_*l*v-s*x*v)*z,t[2]=(d*M*c-A*p*c+A*l*m-s*M*m-d*l*v+s*p*v)*z,t[3]=(_*p*c-d*x*c-_*l*m+s*x*m+d*l*S-s*p*S)*z,t[4]=O*z,t[5]=(g*M*c-E*x*c+E*l*S-i*M*S-g*l*v+i*x*v)*z,t[6]=(E*p*c-h*M*c-E*l*m+i*M*m+h*l*v-i*p*v)*z,t[7]=(h*x*c-g*p*c+g*l*m-i*x*m-h*l*S+i*p*S)*z,t[8]=U*z,t[9]=(E*_*c-g*A*c-E*s*S+i*A*S+g*s*v-i*_*v)*z,t[10]=(h*A*c-E*d*c+E*s*m-i*A*m-h*s*v+i*d*v)*z,t[11]=(g*d*c-h*_*c-g*s*m+i*_*m+h*s*S-i*d*S)*z,t[12]=Q*z,t[13]=(g*A*l-E*_*l+E*s*x-i*A*x-g*s*M+i*_*M)*z,t[14]=(E*d*l-h*A*l-E*s*p+i*A*p+h*s*M-i*d*M)*z,t[15]=(h*_*l-g*d*l+g*s*p-i*_*p-h*s*x+i*d*x)*z,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,d=t.y,p=t.z,m=c*h,g=c*d;return this.set(m*h+s,m*d-l*p,m*p+l*d,0,m*d+l*p,g*d+s,g*p-l*h,0,m*p-l*d,g*p+l*h,c*p*p+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,p=i._w,m=c+c,g=h+h,_=d+d,x=c*m,S=c*g,E=c*_,A=h*g,M=h*_,v=d*_,F=p*m,O=p*g,U=p*_,Q=s.x,X=s.y,z=s.z;return l[0]=(1-(A+v))*Q,l[1]=(S+U)*Q,l[2]=(E-O)*Q,l[3]=0,l[4]=(S-U)*X,l[5]=(1-(x+v))*X,l[6]=(M+F)*X,l[7]=0,l[8]=(E+O)*z,l[9]=(M-F)*z,l[10]=(1-(x+A))*z,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=Ar.set(l[0],l[1],l[2]).length();const h=Ar.set(l[4],l[5],l[6]).length(),d=Ar.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Di.copy(this);const m=1/c,g=1/h,_=1/d;return Di.elements[0]*=m,Di.elements[1]*=m,Di.elements[2]*=m,Di.elements[4]*=g,Di.elements[5]*=g,Di.elements[6]*=g,Di.elements[8]*=_,Di.elements[9]*=_,Di.elements[10]*=_,i.setFromRotationMatrix(Di),s.x=c,s.y=h,s.z=d,this}makePerspective(t,i,s,l,c,h,d=ya){const p=this.elements,m=2*c/(i-t),g=2*c/(s-l),_=(i+t)/(i-t),x=(s+l)/(s-l);let S,E;if(d===ya)S=-(h+c)/(h-c),E=-2*h*c/(h-c);else if(d===tu)S=-h/(h-c),E=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=g,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=S,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,s,l,c,h,d=ya){const p=this.elements,m=1/(i-t),g=1/(s-l),_=1/(h-c),x=(i+t)*m,S=(s+l)*g;let E,A;if(d===ya)E=(h+c)*_,A=-2*_;else if(d===tu)E=c*_,A=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-S,p[2]=0,p[6]=0,p[10]=A,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const Ar=new I,Di=new Xe,BM=new I(0,0,0),IM=new I(1,1,1),ja=new I,Tc=new I,ci=new I,_v=new Xe,vv=new Nn;class qi{constructor(t=0,i=0,s=0,l=qi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],p=l[1],m=l[5],g=l[9],_=l[2],x=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(pe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-pe(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(pe(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-h,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-pe(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-h,m));break;case"YZX":this._z=Math.asin(pe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-pe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return _v.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_v,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return vv.setFromEuler(this),this.setFromQuaternion(vv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qi.DEFAULT_ORDER="XYZ";class up{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let FM=0;const yv=new I,Rr=new Nn,pa=new Xe,Ac=new I,Ko=new I,HM=new I,GM=new Nn,xv=new I(1,0,0),Sv=new I(0,1,0),Mv=new I(0,0,1),Ev={type:"added"},VM={type:"removed"},Cr={type:"childadded",child:null},Uh={type:"childremoved",child:null};class An extends Fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:FM++}),this.uuid=Qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=An.DEFAULT_UP.clone();const t=new I,i=new qi,s=new Nn,l=new I(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Xe},normalMatrix:{value:new se}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=An.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new up,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Rr.setFromAxisAngle(t,i),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(t,i){return Rr.setFromAxisAngle(t,i),this.quaternion.premultiply(Rr),this}rotateX(t){return this.rotateOnAxis(xv,t)}rotateY(t){return this.rotateOnAxis(Sv,t)}rotateZ(t){return this.rotateOnAxis(Mv,t)}translateOnAxis(t,i){return yv.copy(t).applyQuaternion(this.quaternion),this.position.add(yv.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(xv,t)}translateY(t){return this.translateOnAxis(Sv,t)}translateZ(t){return this.translateOnAxis(Mv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Ac.copy(t):Ac.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(Ko,Ac,this.up):pa.lookAt(Ac,Ko,this.up),this.quaternion.setFromRotationMatrix(pa),l&&(pa.extractRotation(l.matrixWorld),Rr.setFromRotationMatrix(pa),this.quaternion.premultiply(Rr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ev),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(VM),Uh.child=t,this.dispatchEvent(Uh),Uh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pa.multiply(t.parent.matrixWorld)),t.applyMatrix4(pa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ev),Cr.child=t,this.dispatchEvent(Cr),Cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ko,t,HM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ko,GM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const _=p[m];c(t.shapes,_)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(c(t.materials,this.material[p]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];l.animations.push(c(t.animations,p))}}if(i){const d=h(t.geometries),p=h(t.materials),m=h(t.textures),g=h(t.images),_=h(t.shapes),x=h(t.skeletons),S=h(t.animations),E=h(t.nodes);d.length>0&&(s.geometries=d),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),g.length>0&&(s.images=g),_.length>0&&(s.shapes=_),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=l,s;function h(d){const p=[];for(const m in d){const g=d[m];delete g.metadata,p.push(g)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}An.DEFAULT_UP=new I(0,1,0);An.DEFAULT_MATRIX_AUTO_UPDATE=!0;An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ui=new I,ma=new I,Lh=new I,ga=new I,wr=new I,Dr=new I,bv=new I,Nh=new I,Oh=new I,Ph=new I,zh=new rn,Bh=new rn,Ih=new rn;class Oi{constructor(t=new I,i=new I,s=new I){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Ui.subVectors(t,i),l.cross(Ui);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Ui.subVectors(l,i),ma.subVectors(s,i),Lh.subVectors(t,i);const h=Ui.dot(Ui),d=Ui.dot(ma),p=Ui.dot(Lh),m=ma.dot(ma),g=ma.dot(Lh),_=h*m-d*d;if(_===0)return c.set(0,0,0),null;const x=1/_,S=(m*p-d*g)*x,E=(h*g-d*p)*x;return c.set(1-S-E,E,S)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ga)===null?!1:ga.x>=0&&ga.y>=0&&ga.x+ga.y<=1}static getInterpolation(t,i,s,l,c,h,d,p){return this.getBarycoord(t,i,s,l,ga)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,ga.x),p.addScaledVector(h,ga.y),p.addScaledVector(d,ga.z),p)}static getInterpolatedAttribute(t,i,s,l,c,h){return zh.setScalar(0),Bh.setScalar(0),Ih.setScalar(0),zh.fromBufferAttribute(t,i),Bh.fromBufferAttribute(t,s),Ih.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(zh,c.x),h.addScaledVector(Bh,c.y),h.addScaledVector(Ih,c.z),h}static isFrontFacing(t,i,s,l){return Ui.subVectors(s,i),ma.subVectors(t,i),Ui.cross(ma).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ui.subVectors(this.c,this.b),ma.subVectors(this.a,this.b),Ui.cross(ma).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Oi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Oi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Oi.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Oi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Oi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,d;wr.subVectors(l,s),Dr.subVectors(c,s),Nh.subVectors(t,s);const p=wr.dot(Nh),m=Dr.dot(Nh);if(p<=0&&m<=0)return i.copy(s);Oh.subVectors(t,l);const g=wr.dot(Oh),_=Dr.dot(Oh);if(g>=0&&_<=g)return i.copy(l);const x=p*_-g*m;if(x<=0&&p>=0&&g<=0)return h=p/(p-g),i.copy(s).addScaledVector(wr,h);Ph.subVectors(t,c);const S=wr.dot(Ph),E=Dr.dot(Ph);if(E>=0&&S<=E)return i.copy(c);const A=S*m-p*E;if(A<=0&&m>=0&&E<=0)return d=m/(m-E),i.copy(s).addScaledVector(Dr,d);const M=g*E-S*_;if(M<=0&&_-g>=0&&S-E>=0)return bv.subVectors(c,l),d=(_-g)/(_-g+(S-E)),i.copy(l).addScaledVector(bv,d);const v=1/(M+A+x);return h=A*v,d=x*v,i.copy(s).addScaledVector(wr,h).addScaledVector(Dr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const G0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Za={h:0,s:0,l:0},Rc={h:0,s:0,l:0};function Fh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class he{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=Si){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=Ue.workingColorSpace){return this.r=t,this.g=i,this.b=s,Ue.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=Ue.workingColorSpace){if(t=cp(t,1),i=pe(i,0,1),s=pe(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=Fh(h,c,t+1/3),this.g=Fh(h,c,t),this.b=Fh(h,c,t-1/3)}return Ue.toWorkingColorSpace(this,l),this}setStyle(t,i=Si){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=Si){const s=G0[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xa(t.r),this.g=xa(t.g),this.b=xa(t.b),this}copyLinearToSRGB(t){return this.r=kr(t.r),this.g=kr(t.g),this.b=kr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Si){return Ue.fromWorkingColorSpace(In.copy(this),t),Math.round(pe(In.r*255,0,255))*65536+Math.round(pe(In.g*255,0,255))*256+Math.round(pe(In.b*255,0,255))}getHexString(t=Si){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ue.workingColorSpace){Ue.fromWorkingColorSpace(In.copy(this),i);const s=In.r,l=In.g,c=In.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let p,m;const g=(d+h)/2;if(d===h)p=0,m=0;else{const _=h-d;switch(m=g<=.5?_/(h+d):_/(2-h-d),h){case s:p=(l-c)/_+(l<c?6:0);break;case l:p=(c-s)/_+2;break;case c:p=(s-l)/_+4;break}p/=6}return t.h=p,t.s=m,t.l=g,t}getRGB(t,i=Ue.workingColorSpace){return Ue.fromWorkingColorSpace(In.copy(this),i),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=Si){Ue.fromWorkingColorSpace(In.copy(this),t);const i=In.r,s=In.g,l=In.b;return t!==Si?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Za),this.setHSL(Za.h+t,Za.s+i,Za.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Za),t.getHSL(Rc);const s=nl(Za.h,Rc.h,i),l=nl(Za.s,Rc.s,i),c=nl(Za.l,Rc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new he;he.NAMES=G0;let kM=0;class Hs extends Fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kM++}),this.uuid=Qr(),this.name="",this.type="Material",this.blending=Gr,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fd,this.blendDst=hd,this.blendEquation=Ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sr,this.stencilZFail=Sr,this.stencilZPass=Sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Gr&&(s.blending=this.blending),this.side!==ts&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==fd&&(s.blendSrc=this.blendSrc),this.blendDst!==hd&&(s.blendDst=this.blendDst),this.blendEquation!==Ls&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Xr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cv&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Sr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Sr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Sr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const p=c[d];delete p.metadata,h.push(p)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class il extends Hs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.combine=b0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const mn=new I,Cc=new re;class ei{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=uv,this.updateRanges=[],this.gpuType=va,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Cc.fromBufferAttribute(this,i),Cc.applyMatrix3(t),this.setXY(i,Cc.x,Cc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)mn.fromBufferAttribute(this,i),mn.applyMatrix3(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)mn.fromBufferAttribute(this,i),mn.applyMatrix4(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)mn.fromBufferAttribute(this,i),mn.applyNormalMatrix(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)mn.fromBufferAttribute(this,i),mn.transformDirection(t),this.setXYZ(i,mn.x,mn.y,mn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Pr(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Vn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Pr(i,this.array)),i}setX(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Pr(i,this.array)),i}setY(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Pr(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Pr(i,this.array)),i}setW(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array),c=Vn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uv&&(t.usage=this.usage),t}}class V0 extends ei{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class k0 extends ei{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Xn extends ei{constructor(t,i,s){super(new Float32Array(t),i,s)}}let XM=0;const xi=new Xe,Hh=new An,Ur=new I,ui=new Ni,Qo=new Ni,Tn=new I;class fi extends Fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:XM++}),this.uuid=Qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(I0(t)?k0:V0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new se().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xi.makeRotationFromQuaternion(t),this.applyMatrix4(xi),this}rotateX(t){return xi.makeRotationX(t),this.applyMatrix4(xi),this}rotateY(t){return xi.makeRotationY(t),this.applyMatrix4(xi),this}rotateZ(t){return xi.makeRotationZ(t),this.applyMatrix4(xi),this}translate(t,i,s){return xi.makeTranslation(t,i,s),this.applyMatrix4(xi),this}scale(t,i,s){return xi.makeScale(t,i,s),this.applyMatrix4(xi),this}lookAt(t){return Hh.lookAt(t),Hh.updateMatrix(),this.applyMatrix4(Hh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ur).negate(),this.translate(Ur.x,Ur.y,Ur.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Xn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ui.setFromBufferAttribute(c),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ru);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const s=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Qo.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(ui.min,Qo.min),ui.expandByPoint(Tn),Tn.addVectors(ui.max,Qo.max),ui.expandByPoint(Tn)):(ui.expandByPoint(Qo.min),ui.expandByPoint(Qo.max))}ui.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)Tn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(Tn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],p=this.morphTargetsRelative;for(let m=0,g=d.count;m<g;m++)Tn.fromBufferAttribute(d,m),p&&(Ur.fromBufferAttribute(t,m),Tn.add(Ur)),l=Math.max(l,s.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ei(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],p=[];for(let J=0;J<s.count;J++)d[J]=new I,p[J]=new I;const m=new I,g=new I,_=new I,x=new re,S=new re,E=new re,A=new I,M=new I;function v(J,D,C){m.fromBufferAttribute(s,J),g.fromBufferAttribute(s,D),_.fromBufferAttribute(s,C),x.fromBufferAttribute(c,J),S.fromBufferAttribute(c,D),E.fromBufferAttribute(c,C),g.sub(m),_.sub(m),S.sub(x),E.sub(x);const k=1/(S.x*E.y-E.x*S.y);isFinite(k)&&(A.copy(g).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(k),M.copy(_).multiplyScalar(S.x).addScaledVector(g,-E.x).multiplyScalar(k),d[J].add(A),d[D].add(A),d[C].add(A),p[J].add(M),p[D].add(M),p[C].add(M))}let F=this.groups;F.length===0&&(F=[{start:0,count:t.count}]);for(let J=0,D=F.length;J<D;++J){const C=F[J],k=C.start,ft=C.count;for(let ct=k,vt=k+ft;ct<vt;ct+=3)v(t.getX(ct+0),t.getX(ct+1),t.getX(ct+2))}const O=new I,U=new I,Q=new I,X=new I;function z(J){Q.fromBufferAttribute(l,J),X.copy(Q);const D=d[J];O.copy(D),O.sub(Q.multiplyScalar(Q.dot(D))).normalize(),U.crossVectors(X,D);const k=U.dot(p[J])<0?-1:1;h.setXYZW(J,O.x,O.y,O.z,k)}for(let J=0,D=F.length;J<D;++J){const C=F[J],k=C.start,ft=C.count;for(let ct=k,vt=k+ft;ct<vt;ct+=3)z(t.getX(ct+0)),z(t.getX(ct+1)),z(t.getX(ct+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new ei(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const l=new I,c=new I,h=new I,d=new I,p=new I,m=new I,g=new I,_=new I;if(t)for(let x=0,S=t.count;x<S;x+=3){const E=t.getX(x+0),A=t.getX(x+1),M=t.getX(x+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,A),h.fromBufferAttribute(i,M),g.subVectors(h,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(s,E),p.fromBufferAttribute(s,A),m.fromBufferAttribute(s,M),d.add(g),p.add(g),m.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(A,p.x,p.y,p.z),s.setXYZ(M,m.x,m.y,m.z)}else for(let x=0,S=i.count;x<S;x+=3)l.fromBufferAttribute(i,x+0),c.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),g.subVectors(h,c),_.subVectors(l,c),g.cross(_),s.setXYZ(x+0,g.x,g.y,g.z),s.setXYZ(x+1,g.x,g.y,g.z),s.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)Tn.fromBufferAttribute(t,i),Tn.normalize(),t.setXYZ(i,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(d,p){const m=d.array,g=d.itemSize,_=d.normalized,x=new m.constructor(p.length*g);let S=0,E=0;for(let A=0,M=p.length;A<M;A++){d.isInterleavedBufferAttribute?S=p[A]*d.data.stride+d.offset:S=p[A]*g;for(let v=0;v<g;v++)x[E++]=m[S++]}return new ei(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new fi,s=this.index.array,l=this.attributes;for(const d in l){const p=l[d],m=t(p,s);i.setAttribute(d,m)}const c=this.morphAttributes;for(const d in c){const p=[],m=c[d];for(let g=0,_=m.length;g<_;g++){const x=m[g],S=t(x,s);p.push(S)}i.morphAttributes[d]=p}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,p=h.length;d<p;d++){const m=h[d];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let _=0,x=m.length;_<x;_++){const S=m[_];g.push(S.toJSON(t.data))}g.length>0&&(l[p]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const m in l){const g=l[m];this.setAttribute(m,g.clone(i))}const c=t.morphAttributes;for(const m in c){const g=[],_=c[m];for(let x=0,S=_.length;x<S;x++)g.push(_[x].clone(i));this.morphAttributes[m]=g}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let m=0,g=h.length;m<g;m++){const _=h[m];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tv=new Xe,bs=new ol,wc=new ru,Av=new I,Dc=new I,Uc=new I,Lc=new I,Gh=new I,Nc=new I,Rv=new I,Oc=new I;class Jn extends An{constructor(t=new fi,i=new il){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Nc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const g=d[p],_=c[p];g!==0&&(Gh.fromBufferAttribute(_,t),h?Nc.addScaledVector(Gh,g):Nc.addScaledVector(Gh.sub(i),g))}i.add(Nc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),wc.copy(s.boundingSphere),wc.applyMatrix4(c),bs.copy(t.ray).recast(t.near),!(wc.containsPoint(bs.origin)===!1&&(bs.intersectSphere(wc,Av)===null||bs.origin.distanceToSquared(Av)>(t.far-t.near)**2))&&(Tv.copy(c).invert(),bs.copy(t.ray).applyMatrix4(Tv),!(s.boundingBox!==null&&bs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,bs)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,d=c.index,p=c.attributes.position,m=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,x=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,A=x.length;E<A;E++){const M=x[E],v=h[M.materialIndex],F=Math.max(M.start,S.start),O=Math.min(d.count,Math.min(M.start+M.count,S.start+S.count));for(let U=F,Q=O;U<Q;U+=3){const X=d.getX(U),z=d.getX(U+1),J=d.getX(U+2);l=Pc(this,v,t,s,m,g,_,X,z,J),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),A=Math.min(d.count,S.start+S.count);for(let M=E,v=A;M<v;M+=3){const F=d.getX(M),O=d.getX(M+1),U=d.getX(M+2);l=Pc(this,h,t,s,m,g,_,F,O,U),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(h))for(let E=0,A=x.length;E<A;E++){const M=x[E],v=h[M.materialIndex],F=Math.max(M.start,S.start),O=Math.min(p.count,Math.min(M.start+M.count,S.start+S.count));for(let U=F,Q=O;U<Q;U+=3){const X=U,z=U+1,J=U+2;l=Pc(this,v,t,s,m,g,_,X,z,J),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),A=Math.min(p.count,S.start+S.count);for(let M=E,v=A;M<v;M+=3){const F=M,O=M+1,U=M+2;l=Pc(this,h,t,s,m,g,_,F,O,U),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function WM(r,t,i,s,l,c,h,d){let p;if(t.side===$n?p=s.intersectTriangle(h,c,l,!0,d):p=s.intersectTriangle(l,c,h,t.side===ts,d),p===null)return null;Oc.copy(d),Oc.applyMatrix4(r.matrixWorld);const m=i.ray.origin.distanceTo(Oc);return m<i.near||m>i.far?null:{distance:m,point:Oc.clone(),object:r}}function Pc(r,t,i,s,l,c,h,d,p,m){r.getVertexPosition(d,Dc),r.getVertexPosition(p,Uc),r.getVertexPosition(m,Lc);const g=WM(r,t,i,s,Dc,Uc,Lc,Rv);if(g){const _=new I;Oi.getBarycoord(Rv,Dc,Uc,Lc,_),l&&(g.uv=Oi.getInterpolatedAttribute(l,d,p,m,_,new re)),c&&(g.uv1=Oi.getInterpolatedAttribute(c,d,p,m,_,new re)),h&&(g.normal=Oi.getInterpolatedAttribute(h,d,p,m,_,new I),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:p,c:m,normal:new I,materialIndex:0};Oi.getNormal(Dc,Uc,Lc,x.normal),g.face=x,g.barycoord=_}return g}class Jr extends fi{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const p=[],m=[],g=[],_=[];let x=0,S=0;E("z","y","x",-1,-1,s,i,t,h,c,0),E("z","y","x",1,-1,s,i,-t,h,c,1),E("x","z","y",1,1,t,s,i,l,h,2),E("x","z","y",1,-1,t,s,-i,l,h,3),E("x","y","z",1,-1,t,i,s,l,c,4),E("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(p),this.setAttribute("position",new Xn(m,3)),this.setAttribute("normal",new Xn(g,3)),this.setAttribute("uv",new Xn(_,2));function E(A,M,v,F,O,U,Q,X,z,J,D){const C=U/z,k=Q/J,ft=U/2,ct=Q/2,vt=X/2,yt=z+1,P=J+1;let Z=0,K=0;const Mt=new I;for(let Tt=0;Tt<P;Tt++){const N=Tt*k-ct;for(let et=0;et<yt;et++){const Et=et*C-ft;Mt[A]=Et*F,Mt[M]=N*O,Mt[v]=vt,m.push(Mt.x,Mt.y,Mt.z),Mt[A]=0,Mt[M]=0,Mt[v]=X>0?1:-1,g.push(Mt.x,Mt.y,Mt.z),_.push(et/z),_.push(1-Tt/J),Z+=1}}for(let Tt=0;Tt<J;Tt++)for(let N=0;N<z;N++){const et=x+N+yt*Tt,Et=x+N+yt*(Tt+1),w=x+(N+1)+yt*(Tt+1),H=x+(N+1)+yt*Tt;p.push(et,Et,H),p.push(Et,w,H),K+=6}d.addGroup(S,K,D),S+=K,x+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Kr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function kn(r){const t={};for(let i=0;i<r.length;i++){const s=Kr(r[i]);for(const l in s)t[l]=s[l]}return t}function qM(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function X0(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const YM={clone:Kr,merge:kn};var jM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ZM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class es extends Hs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jM,this.fragmentShader=ZM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Kr(t.uniforms),this.uniformsGroups=qM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class W0 extends An{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=ya}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ka=new I,Cv=new re,wv=new re;class Mi extends W0{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=sl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(el*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return sl*2*Math.atan(Math.tan(el*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){Ka.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ka.x,Ka.y).multiplyScalar(-t/Ka.z),Ka.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ka.x,Ka.y).multiplyScalar(-t/Ka.z)}getViewSize(t,i){return this.getViewBounds(t,Cv,wv),i.subVectors(wv,Cv)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(el*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const p=h.fullWidth,m=h.fullHeight;c+=h.offsetX*l/p,i-=h.offsetY*s/m,l*=h.width/p,s*=h.height/m}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Lr=-90,Nr=1;class KM extends An{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Mi(Lr,Nr,t,i);l.layers=this.layers,this.add(l);const c=new Mi(Lr,Nr,t,i);c.layers=this.layers,this.add(c);const h=new Mi(Lr,Nr,t,i);h.layers=this.layers,this.add(h);const d=new Mi(Lr,Nr,t,i);d.layers=this.layers,this.add(d);const p=new Mi(Lr,Nr,t,i);p.layers=this.layers,this.add(p);const m=new Mi(Lr,Nr,t,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,p]=i;for(const m of i)this.remove(m);if(t===ya)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===tu)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of i)this.add(m),m.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,p,m,g]=this.children,_=t.getRenderTarget(),x=t.getActiveCubeFace(),S=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const A=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,p),t.setRenderTarget(s,4,l),t.render(i,m),s.texture.generateMipmaps=A,t.setRenderTarget(s,5,l),t.render(i,g),t.setRenderTarget(_,x,S),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class q0 extends ti{constructor(t,i,s,l,c,h,d,p,m,g){t=t!==void 0?t:[],i=i!==void 0?i:Wr,super(t,i,s,l,c,h,d,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class QM extends Is{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new q0(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Wi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Jr(5,5,5),c=new es({name:"CubemapFromEquirect",uniforms:Kr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:$n,blending:Ja});c.uniforms.tEquirect.value=i;const h=new Jn(l,c),d=i.minFilter;return i.minFilter===zs&&(i.minFilter=Wi),new KM(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}class fp{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new he(t),this.near=i,this.far=s}clone(){return new fp(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class JM extends An{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qi,this.environmentIntensity=1,this.environmentRotation=new qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Vh=new I,$M=new I,tE=new se;class ki{constructor(t=new I(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Vh.subVectors(s,i).cross($M.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(Vh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||tE.getNormalMatrix(t),l=this.coplanarPoint(Vh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ts=new ru,zc=new I;class hp{constructor(t=new ki,i=new ki,s=new ki,l=new ki,c=new ki,h=new ki){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ya){const s=this.planes,l=t.elements,c=l[0],h=l[1],d=l[2],p=l[3],m=l[4],g=l[5],_=l[6],x=l[7],S=l[8],E=l[9],A=l[10],M=l[11],v=l[12],F=l[13],O=l[14],U=l[15];if(s[0].setComponents(p-c,x-m,M-S,U-v).normalize(),s[1].setComponents(p+c,x+m,M+S,U+v).normalize(),s[2].setComponents(p+h,x+g,M+E,U+F).normalize(),s[3].setComponents(p-h,x-g,M-E,U-F).normalize(),s[4].setComponents(p-d,x-_,M-A,U-O).normalize(),i===ya)s[5].setComponents(p+d,x+_,M+A,U+O).normalize();else if(i===tu)s[5].setComponents(d,_,A,O).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ts.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ts.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ts)}intersectsSprite(t){return Ts.center.set(0,0,0),Ts.radius=.7071067811865476,Ts.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ts)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(zc.x=l.normal.x>0?t.max.x:t.min.x,zc.y=l.normal.y>0?t.max.y:t.min.y,zc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(zc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ou extends Hs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const nu=new I,iu=new I,Dv=new Xe,Jo=new ol,Bc=new ru,kh=new I,Uv=new I;class Y0 extends An{constructor(t=new fi,i=new ou){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)nu.fromBufferAttribute(i,l-1),iu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=nu.distanceTo(iu);t.setAttribute("lineDistance",new Xn(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Bc.copy(s.boundingSphere),Bc.applyMatrix4(l),Bc.radius+=c,t.ray.intersectsSphere(Bc)===!1)return;Dv.copy(l).invert(),Jo.copy(t.ray).applyMatrix4(Dv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=d*d,m=this.isLineSegments?2:1,g=s.index,x=s.attributes.position;if(g!==null){const S=Math.max(0,h.start),E=Math.min(g.count,h.start+h.count);for(let A=S,M=E-1;A<M;A+=m){const v=g.getX(A),F=g.getX(A+1),O=Ic(this,t,Jo,p,v,F);O&&i.push(O)}if(this.isLineLoop){const A=g.getX(E-1),M=g.getX(S),v=Ic(this,t,Jo,p,A,M);v&&i.push(v)}}else{const S=Math.max(0,h.start),E=Math.min(x.count,h.start+h.count);for(let A=S,M=E-1;A<M;A+=m){const v=Ic(this,t,Jo,p,A,A+1);v&&i.push(v)}if(this.isLineLoop){const A=Ic(this,t,Jo,p,E-1,S);A&&i.push(A)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Ic(r,t,i,s,l,c){const h=r.geometry.attributes.position;if(nu.fromBufferAttribute(h,l),iu.fromBufferAttribute(h,c),i.distanceSqToSegment(nu,iu,kh,Uv)>s)return;kh.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(kh);if(!(p<t.near||p>t.far))return{distance:p,point:Uv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}const Lv=new I,Nv=new I;class j0 extends Y0{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)Lv.fromBufferAttribute(i,l),Nv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Lv.distanceTo(Nv);t.setAttribute("lineDistance",new Xn(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Fc extends An{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Z0 extends ti{constructor(t,i,s,l,c,h,d,p,m,g=Vr){if(g!==Vr&&g!==jr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===Vr&&(s=Bs),s===void 0&&g===jr&&(s=Yr),super(null,l,c,h,d,p,g,s,m),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:zi,this.minFilter=p!==void 0?p:zi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class au extends fi{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],h=[],d=[],p=[],m=new I,g=new re;h.push(0,0,0),d.push(0,0,1),p.push(.5,.5);for(let _=0,x=3;_<=i;_++,x+=3){const S=s+_/i*l;m.x=t*Math.cos(S),m.y=t*Math.sin(S),h.push(m.x,m.y,m.z),d.push(0,0,1),g.x=(h[x]/t+1)/2,g.y=(h[x+1]/t+1)/2,p.push(g.x,g.y)}for(let _=1;_<=i;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new Xn(h,3)),this.setAttribute("normal",new Xn(d,3)),this.setAttribute("uv",new Xn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new au(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ll extends fi{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(s),p=Math.floor(l),m=d+1,g=p+1,_=t/d,x=i/p,S=[],E=[],A=[],M=[];for(let v=0;v<g;v++){const F=v*x-h;for(let O=0;O<m;O++){const U=O*_-c;E.push(U,-F,0),A.push(0,0,1),M.push(O/d),M.push(1-v/p)}}for(let v=0;v<p;v++)for(let F=0;F<d;F++){const O=F+m*v,U=F+m*(v+1),Q=F+1+m*(v+1),X=F+1+m*v;S.push(O,U,X),S.push(U,Q,X)}this.setIndex(S),this.setAttribute("position",new Xn(E,3)),this.setAttribute("normal",new Xn(A,3)),this.setAttribute("uv",new Xn(M,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.width,t.height,t.widthSegments,t.heightSegments)}}class eE extends Hs{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new he(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Xh extends Hs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=z0,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nE extends Hs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class iE extends Hs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class K0 extends An{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class aE extends K0{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(An.DEFAULT_UP),this.updateMatrix(),this.groundColor=new he(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}}const Wh=new Xe,Ov=new I,Pv=new I;class sE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hp,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new rn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;Ov.setFromMatrixPosition(t.matrixWorld),i.position.copy(Ov),Pv.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(Pv),i.updateMatrixWorld(),Wh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wh),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Wh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Q0 extends W0{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,d=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,h=c+m*this.view.width,d-=g*this.view.offsetY,p=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class rE extends sE{constructor(){super(new Q0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oE extends K0{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(An.DEFAULT_UP),this.updateMatrix(),this.target=new An,this.shadow=new rE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class lE extends Mi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const zv=new Xe;class cE{constructor(t,i,s=0,l=1/0){this.ray=new ol(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new up,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return zv.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zv),this}intersectObject(t,i=!0,s=[]){return Kd(t,this,s,i),s.sort(Bv),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)Kd(t[l],this,s,i);return s.sort(Bv),s}}function Bv(r,t){return r.distance-t.distance}function Kd(r,t,i,s){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=r.children;for(let h=0,d=c.length;h<d;h++)Kd(c[h],t,i,!0)}}class Iv{constructor(t=1,i=0,s=0){return this.radius=t,this.phi=i,this.theta=s,this}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=pe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(pe(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class uE extends j0{constructor(t=10,i=10,s=4473924,l=8947848){s=new he(s),l=new he(l);const c=i/2,h=t/i,d=t/2,p=[],m=[];for(let x=0,S=0,E=-d;x<=i;x++,E+=h){p.push(-d,0,E,d,0,E),p.push(E,0,-d,E,0,d);const A=x===c?s:l;A.toArray(m,S),S+=3,A.toArray(m,S),S+=3,A.toArray(m,S),S+=3,A.toArray(m,S),S+=3}const g=new fi;g.setAttribute("position",new Xn(p,3)),g.setAttribute("color",new Xn(m,3));const _=new ou({vertexColors:!0,toneMapped:!1});super(g,_),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class fE extends j0{constructor(t,i=16776960){const s=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),l=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],c=new fi;c.setIndex(new ei(s,1)),c.setAttribute("position",new Xn(l,3)),super(c,new ou({color:i,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){const i=this.box;i.isEmpty()||(i.getCenter(this.position),i.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}}class hE extends Fs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function Fv(r,t,i,s){const l=dE(s);switch(i){case w0:return r*t;case U0:return r*t;case L0:return r*t*2;case N0:return r*t/l.components*l.byteLength;case rp:return r*t/l.components*l.byteLength;case O0:return r*t*2/l.components*l.byteLength;case op:return r*t*2/l.components*l.byteLength;case D0:return r*t*3/l.components*l.byteLength;case Pi:return r*t*4/l.components*l.byteLength;case lp:return r*t*4/l.components*l.byteLength;case qc:case Yc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case jc:case Zc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Td:case Rd:return Math.max(r,16)*Math.max(t,8)/4;case bd:case Ad:return Math.max(r,8)*Math.max(t,8)/2;case Cd:case wd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Dd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Nd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Od:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Pd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case zd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Gd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case kd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Xd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Kc:case Wd:case qd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case P0:case Yd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case jd:case Zd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function dE(r){switch(r){case Sa:case A0:return{byteLength:1,components:1};case al:case R0:case rl:return{byteLength:2,components:1};case ap:case sp:return{byteLength:2,components:4};case Bs:case ip:case va:return{byteLength:4,components:1};case C0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:np}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=np);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function J0(){let r=null,t=!1,i=null,s=null;function l(c,h){i(c,h),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function pE(r){const t=new WeakMap;function i(d,p){const m=d.array,g=d.usage,_=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,g),d.onUploadCallback();let S;if(m instanceof Float32Array)S=r.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=r.SHORT;else if(m instanceof Uint32Array)S=r.UNSIGNED_INT;else if(m instanceof Int32Array)S=r.INT;else if(m instanceof Int8Array)S=r.BYTE;else if(m instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,p,m){const g=p.array,_=p.updateRanges;if(r.bindBuffer(m,d),_.length===0)r.bufferSubData(m,0,g);else{_.sort((S,E)=>S.start-E.start);let x=0;for(let S=1;S<_.length;S++){const E=_[x],A=_[S];A.start<=E.start+E.count+1?E.count=Math.max(E.count,A.start+A.count-E.start):(++x,_[x]=A)}_.length=x+1;for(let S=0,E=_.length;S<E;S++){const A=_[S];r.bufferSubData(m,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=t.get(d);p&&(r.deleteBuffer(p.buffer),t.delete(d))}function h(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=t.get(d);if(m===void 0)t.set(d,i(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,d,p),m.version=d.version}}return{get:l,remove:c,update:h}}var mE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gE=`#ifdef USE_ALPHAHASH
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
#endif`,_E=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,SE=`#ifdef USE_AOMAP
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
#endif`,ME=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,EE=`#ifdef USE_BATCHING
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
#endif`,bE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,TE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,AE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,CE=`#ifdef USE_IRIDESCENCE
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
#endif`,wE=`#ifdef USE_BUMPMAP
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
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,OE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,BE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,IE=`#define PI 3.141592653589793
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
} // validated`,FE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HE=`vec3 transformedNormal = objectNormal;
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
#endif`,GE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,VE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,WE="gl_FragColor = linearToOutputTexel( gl_FragColor );",qE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,YE=`#ifdef USE_ENVMAP
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
#endif`,jE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ZE=`#ifdef USE_ENVMAP
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
#endif`,KE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QE=`#ifdef USE_ENVMAP
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
#endif`,JE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$E=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nb=`#ifdef USE_GRADIENTMAP
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
}`,ib=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ab=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rb=`uniform bool receiveShadow;
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
#endif`,ob=`#ifdef USE_ENVMAP
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
#endif`,lb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ub=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hb=`PhysicalMaterial material;
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
#endif`,db=`struct PhysicalMaterial {
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
}`,pb=`
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
#endif`,mb=`#if defined( RE_IndirectDiffuse )
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
#endif`,gb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_b=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Eb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bb=`#if defined( USE_POINTS_UV )
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
#endif`,Tb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ab=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Db=`#ifdef USE_MORPHTARGETS
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
#endif`,Ub=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Nb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ob=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bb=`#ifdef USE_NORMALMAP
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
#endif`,Ib=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$b=`float getShadowMask() {
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
}`,tT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eT=`#ifdef USE_SKINNING
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
#endif`,nT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iT=`#ifdef USE_SKINNING
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
#endif`,aT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,oT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lT=`#ifdef USE_TRANSMISSION
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
#endif`,cT=`#ifdef USE_TRANSMISSION
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
#endif`,uT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mT=`uniform sampler2D t2D;
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
}`,gT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xT=`#include <common>
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
}`,ST=`#if DEPTH_PACKING == 3200
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
}`,MT=`#define DISTANCE
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
}`,ET=`#define DISTANCE
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
}`,bT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,TT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AT=`uniform float scale;
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
}`,RT=`uniform vec3 diffuse;
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
}`,CT=`#include <common>
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
}`,wT=`uniform vec3 diffuse;
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
}`,DT=`#define LAMBERT
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
}`,UT=`#define LAMBERT
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
}`,LT=`#define MATCAP
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
}`,NT=`#define MATCAP
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
}`,OT=`#define NORMAL
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
}`,PT=`#define NORMAL
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
}`,zT=`#define PHONG
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
}`,BT=`#define PHONG
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
}`,IT=`#define STANDARD
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
}`,FT=`#define STANDARD
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
}`,HT=`#define TOON
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
}`,GT=`#define TOON
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
}`,VT=`uniform float size;
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
}`,kT=`uniform vec3 diffuse;
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
}`,XT=`#include <common>
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
}`,WT=`uniform vec3 color;
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
}`,qT=`uniform float rotation;
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
}`,YT=`uniform vec3 diffuse;
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
}`,fe={alphahash_fragment:mE,alphahash_pars_fragment:gE,alphamap_fragment:_E,alphamap_pars_fragment:vE,alphatest_fragment:yE,alphatest_pars_fragment:xE,aomap_fragment:SE,aomap_pars_fragment:ME,batching_pars_vertex:EE,batching_vertex:bE,begin_vertex:TE,beginnormal_vertex:AE,bsdfs:RE,iridescence_fragment:CE,bumpmap_pars_fragment:wE,clipping_planes_fragment:DE,clipping_planes_pars_fragment:UE,clipping_planes_pars_vertex:LE,clipping_planes_vertex:NE,color_fragment:OE,color_pars_fragment:PE,color_pars_vertex:zE,color_vertex:BE,common:IE,cube_uv_reflection_fragment:FE,defaultnormal_vertex:HE,displacementmap_pars_vertex:GE,displacementmap_vertex:VE,emissivemap_fragment:kE,emissivemap_pars_fragment:XE,colorspace_fragment:WE,colorspace_pars_fragment:qE,envmap_fragment:YE,envmap_common_pars_fragment:jE,envmap_pars_fragment:ZE,envmap_pars_vertex:KE,envmap_physical_pars_fragment:ob,envmap_vertex:QE,fog_vertex:JE,fog_pars_vertex:$E,fog_fragment:tb,fog_pars_fragment:eb,gradientmap_pars_fragment:nb,lightmap_pars_fragment:ib,lights_lambert_fragment:ab,lights_lambert_pars_fragment:sb,lights_pars_begin:rb,lights_toon_fragment:lb,lights_toon_pars_fragment:cb,lights_phong_fragment:ub,lights_phong_pars_fragment:fb,lights_physical_fragment:hb,lights_physical_pars_fragment:db,lights_fragment_begin:pb,lights_fragment_maps:mb,lights_fragment_end:gb,logdepthbuf_fragment:_b,logdepthbuf_pars_fragment:vb,logdepthbuf_pars_vertex:yb,logdepthbuf_vertex:xb,map_fragment:Sb,map_pars_fragment:Mb,map_particle_fragment:Eb,map_particle_pars_fragment:bb,metalnessmap_fragment:Tb,metalnessmap_pars_fragment:Ab,morphinstance_vertex:Rb,morphcolor_vertex:Cb,morphnormal_vertex:wb,morphtarget_pars_vertex:Db,morphtarget_vertex:Ub,normal_fragment_begin:Lb,normal_fragment_maps:Nb,normal_pars_fragment:Ob,normal_pars_vertex:Pb,normal_vertex:zb,normalmap_pars_fragment:Bb,clearcoat_normal_fragment_begin:Ib,clearcoat_normal_fragment_maps:Fb,clearcoat_pars_fragment:Hb,iridescence_pars_fragment:Gb,opaque_fragment:Vb,packing:kb,premultiplied_alpha_fragment:Xb,project_vertex:Wb,dithering_fragment:qb,dithering_pars_fragment:Yb,roughnessmap_fragment:jb,roughnessmap_pars_fragment:Zb,shadowmap_pars_fragment:Kb,shadowmap_pars_vertex:Qb,shadowmap_vertex:Jb,shadowmask_pars_fragment:$b,skinbase_vertex:tT,skinning_pars_vertex:eT,skinning_vertex:nT,skinnormal_vertex:iT,specularmap_fragment:aT,specularmap_pars_fragment:sT,tonemapping_fragment:rT,tonemapping_pars_fragment:oT,transmission_fragment:lT,transmission_pars_fragment:cT,uv_pars_fragment:uT,uv_pars_vertex:fT,uv_vertex:hT,worldpos_vertex:dT,background_vert:pT,background_frag:mT,backgroundCube_vert:gT,backgroundCube_frag:_T,cube_vert:vT,cube_frag:yT,depth_vert:xT,depth_frag:ST,distanceRGBA_vert:MT,distanceRGBA_frag:ET,equirect_vert:bT,equirect_frag:TT,linedashed_vert:AT,linedashed_frag:RT,meshbasic_vert:CT,meshbasic_frag:wT,meshlambert_vert:DT,meshlambert_frag:UT,meshmatcap_vert:LT,meshmatcap_frag:NT,meshnormal_vert:OT,meshnormal_frag:PT,meshphong_vert:zT,meshphong_frag:BT,meshphysical_vert:IT,meshphysical_frag:FT,meshtoon_vert:HT,meshtoon_frag:GT,points_vert:VT,points_frag:kT,shadow_vert:XT,shadow_frag:WT,sprite_vert:qT,sprite_frag:YT},Nt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},Xi={basic:{uniforms:kn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:kn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new he(0)}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:kn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:kn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:kn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new he(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:kn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:kn([Nt.points,Nt.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:kn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:kn([Nt.common,Nt.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:kn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:kn([Nt.sprite,Nt.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distanceRGBA:{uniforms:kn([Nt.common,Nt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distanceRGBA_vert,fragmentShader:fe.distanceRGBA_frag},shadow:{uniforms:kn([Nt.lights,Nt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};Xi.physical={uniforms:kn([Xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const Hc={r:0,b:0,g:0},As=new qi,jT=new Xe;function ZT(r,t,i,s,l,c,h){const d=new he(0);let p=c===!0?0:1,m,g,_=null,x=0,S=null;function E(O){let U=O.isScene===!0?O.background:null;return U&&U.isTexture&&(U=(O.backgroundBlurriness>0?i:t).get(U)),U}function A(O){let U=!1;const Q=E(O);Q===null?v(d,p):Q&&Q.isColor&&(v(Q,1),U=!0);const X=r.xr.getEnvironmentBlendMode();X==="additive"?s.buffers.color.setClear(0,0,0,1,h):X==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(r.autoClear||U)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function M(O,U){const Q=E(U);Q&&(Q.isCubeTexture||Q.mapping===su)?(g===void 0&&(g=new Jn(new Jr(1,1,1),new es({name:"BackgroundCubeMaterial",uniforms:Kr(Xi.backgroundCube.uniforms),vertexShader:Xi.backgroundCube.vertexShader,fragmentShader:Xi.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(X,z,J){this.matrixWorld.copyPosition(J.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),As.copy(U.backgroundRotation),As.x*=-1,As.y*=-1,As.z*=-1,Q.isCubeTexture&&Q.isRenderTargetTexture===!1&&(As.y*=-1,As.z*=-1),g.material.uniforms.envMap.value=Q,g.material.uniforms.flipEnvMap.value=Q.isCubeTexture&&Q.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(jT.makeRotationFromEuler(As)),g.material.toneMapped=Ue.getTransfer(Q.colorSpace)!==Ve,(_!==Q||x!==Q.version||S!==r.toneMapping)&&(g.material.needsUpdate=!0,_=Q,x=Q.version,S=r.toneMapping),g.layers.enableAll(),O.unshift(g,g.geometry,g.material,0,0,null)):Q&&Q.isTexture&&(m===void 0&&(m=new Jn(new ll(2,2),new es({name:"BackgroundMaterial",uniforms:Kr(Xi.background.uniforms),vertexShader:Xi.background.vertexShader,fragmentShader:Xi.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=Q,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=Ue.getTransfer(Q.colorSpace)!==Ve,Q.matrixAutoUpdate===!0&&Q.updateMatrix(),m.material.uniforms.uvTransform.value.copy(Q.matrix),(_!==Q||x!==Q.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,_=Q,x=Q.version,S=r.toneMapping),m.layers.enableAll(),O.unshift(m,m.geometry,m.material,0,0,null))}function v(O,U){O.getRGB(Hc,X0(r)),s.buffers.color.setClear(Hc.r,Hc.g,Hc.b,U,h)}function F(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),m!==void 0&&(m.geometry.dispose(),m.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(O,U=1){d.set(O),p=U,v(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(O){p=O,v(d,p)},render:A,addToRenderList:M,dispose:F}}function KT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,h=!1;function d(C,k,ft,ct,vt){let yt=!1;const P=_(ct,ft,k);c!==P&&(c=P,m(c.object)),yt=S(C,ct,ft,vt),yt&&E(C,ct,ft,vt),vt!==null&&t.update(vt,r.ELEMENT_ARRAY_BUFFER),(yt||h)&&(h=!1,U(C,k,ft,ct),vt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(vt).buffer))}function p(){return r.createVertexArray()}function m(C){return r.bindVertexArray(C)}function g(C){return r.deleteVertexArray(C)}function _(C,k,ft){const ct=ft.wireframe===!0;let vt=s[C.id];vt===void 0&&(vt={},s[C.id]=vt);let yt=vt[k.id];yt===void 0&&(yt={},vt[k.id]=yt);let P=yt[ct];return P===void 0&&(P=x(p()),yt[ct]=P),P}function x(C){const k=[],ft=[],ct=[];for(let vt=0;vt<i;vt++)k[vt]=0,ft[vt]=0,ct[vt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:ft,attributeDivisors:ct,object:C,attributes:{},index:null}}function S(C,k,ft,ct){const vt=c.attributes,yt=k.attributes;let P=0;const Z=ft.getAttributes();for(const K in Z)if(Z[K].location>=0){const Tt=vt[K];let N=yt[K];if(N===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),Tt===void 0||Tt.attribute!==N||N&&Tt.data!==N.data)return!0;P++}return c.attributesNum!==P||c.index!==ct}function E(C,k,ft,ct){const vt={},yt=k.attributes;let P=0;const Z=ft.getAttributes();for(const K in Z)if(Z[K].location>=0){let Tt=yt[K];Tt===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(Tt=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(Tt=C.instanceColor));const N={};N.attribute=Tt,Tt&&Tt.data&&(N.data=Tt.data),vt[K]=N,P++}c.attributes=vt,c.attributesNum=P,c.index=ct}function A(){const C=c.newAttributes;for(let k=0,ft=C.length;k<ft;k++)C[k]=0}function M(C){v(C,0)}function v(C,k){const ft=c.newAttributes,ct=c.enabledAttributes,vt=c.attributeDivisors;ft[C]=1,ct[C]===0&&(r.enableVertexAttribArray(C),ct[C]=1),vt[C]!==k&&(r.vertexAttribDivisor(C,k),vt[C]=k)}function F(){const C=c.newAttributes,k=c.enabledAttributes;for(let ft=0,ct=k.length;ft<ct;ft++)k[ft]!==C[ft]&&(r.disableVertexAttribArray(ft),k[ft]=0)}function O(C,k,ft,ct,vt,yt,P){P===!0?r.vertexAttribIPointer(C,k,ft,vt,yt):r.vertexAttribPointer(C,k,ft,ct,vt,yt)}function U(C,k,ft,ct){A();const vt=ct.attributes,yt=ft.getAttributes(),P=k.defaultAttributeValues;for(const Z in yt){const K=yt[Z];if(K.location>=0){let Mt=vt[Z];if(Mt===void 0&&(Z==="instanceMatrix"&&C.instanceMatrix&&(Mt=C.instanceMatrix),Z==="instanceColor"&&C.instanceColor&&(Mt=C.instanceColor)),Mt!==void 0){const Tt=Mt.normalized,N=Mt.itemSize,et=t.get(Mt);if(et===void 0)continue;const Et=et.buffer,w=et.type,H=et.bytesPerElement,st=w===r.INT||w===r.UNSIGNED_INT||Mt.gpuType===ip;if(Mt.isInterleavedBufferAttribute){const dt=Mt.data,Rt=dt.stride,Ot=Mt.offset;if(dt.isInstancedInterleavedBuffer){for(let ie=0;ie<K.locationSize;ie++)v(K.location+ie,dt.meshPerAttribute);C.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let ie=0;ie<K.locationSize;ie++)M(K.location+ie);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let ie=0;ie<K.locationSize;ie++)O(K.location+ie,N/K.locationSize,w,Tt,Rt*H,(Ot+N/K.locationSize*ie)*H,st)}else{if(Mt.isInstancedBufferAttribute){for(let dt=0;dt<K.locationSize;dt++)v(K.location+dt,Mt.meshPerAttribute);C.isInstancedMesh!==!0&&ct._maxInstanceCount===void 0&&(ct._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let dt=0;dt<K.locationSize;dt++)M(K.location+dt);r.bindBuffer(r.ARRAY_BUFFER,Et);for(let dt=0;dt<K.locationSize;dt++)O(K.location+dt,N/K.locationSize,w,Tt,N*H,N/K.locationSize*dt*H,st)}}else if(P!==void 0){const Tt=P[Z];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(K.location,Tt);break;case 3:r.vertexAttrib3fv(K.location,Tt);break;case 4:r.vertexAttrib4fv(K.location,Tt);break;default:r.vertexAttrib1fv(K.location,Tt)}}}}F()}function Q(){J();for(const C in s){const k=s[C];for(const ft in k){const ct=k[ft];for(const vt in ct)g(ct[vt].object),delete ct[vt];delete k[ft]}delete s[C]}}function X(C){if(s[C.id]===void 0)return;const k=s[C.id];for(const ft in k){const ct=k[ft];for(const vt in ct)g(ct[vt].object),delete ct[vt];delete k[ft]}delete s[C.id]}function z(C){for(const k in s){const ft=s[k];if(ft[C.id]===void 0)continue;const ct=ft[C.id];for(const vt in ct)g(ct[vt].object),delete ct[vt];delete ft[C.id]}}function J(){D(),h=!0,c!==l&&(c=l,m(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:J,resetDefaultState:D,dispose:Q,releaseStatesOfGeometry:X,releaseStatesOfProgram:z,initAttributes:A,enableAttribute:M,disableUnusedAttributes:F}}function QT(r,t,i){let s;function l(m){s=m}function c(m,g){r.drawArrays(s,m,g),i.update(g,s,1)}function h(m,g,_){_!==0&&(r.drawArraysInstanced(s,m,g,_),i.update(g,s,_))}function d(m,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,g,0,_);let S=0;for(let E=0;E<_;E++)S+=g[E];i.update(S,s,1)}function p(m,g,_,x){if(_===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<m.length;E++)h(m[E],g[E],x[E]);else{S.multiDrawArraysInstancedWEBGL(s,m,0,g,0,x,0,_);let E=0;for(let A=0;A<_;A++)E+=g[A]*x[A];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function JT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const z=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(z){return!(z!==Pi&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(z){const J=z===rl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(z!==Sa&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==va&&!J)}function p(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const g=p(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),F=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),U=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),Q=E>0,X=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:h,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:E,maxTextureSize:A,maxCubemapSize:M,maxAttributes:v,maxVertexUniforms:F,maxVaryings:O,maxFragmentUniforms:U,vertexTextures:Q,maxSamples:X}}function $T(r){const t=this;let i=null,s=0,l=!1,c=!1;const h=new ki,d=new se,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const S=_.length!==0||x||s!==0||l;return l=x,s=_.length,S},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){i=g(_,x,0)},this.setState=function(_,x,S){const E=_.clippingPlanes,A=_.clipIntersection,M=_.clipShadows,v=r.get(_);if(!l||E===null||E.length===0||c&&!M)c?g(null):m();else{const F=c?0:s,O=F*4;let U=v.clippingState||null;p.value=U,U=g(E,x,O,S);for(let Q=0;Q!==O;++Q)U[Q]=i[Q];v.clippingState=U,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=F}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(_,x,S,E){const A=_!==null?_.length:0;let M=null;if(A!==0){if(M=p.value,E!==!0||M===null){const v=S+A*4,F=x.matrixWorldInverse;d.getNormalMatrix(F),(M===null||M.length<v)&&(M=new Float32Array(v));for(let O=0,U=S;O!==A;++O,U+=4)h.copy(_[O]).applyMatrix4(F,d),h.normal.toArray(M,U),M[U+3]=h.constant}p.value=M,p.needsUpdate=!0}return t.numPlanes=A,t.numIntersection=0,M}}function t1(r){let t=new WeakMap;function i(h,d){return d===xd?h.mapping=Wr:d===Sd&&(h.mapping=qr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===xd||d===Sd)if(t.has(h)){const p=t.get(h).texture;return i(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const m=new QM(p.height);return m.fromEquirectangularTexture(r,h),t.set(h,m),h.addEventListener("dispose",l),i(m.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Ir=4,Hv=[.125,.215,.35,.446,.526,.582],Ns=20,qh=new Q0,Gv=new he;let Yh=null,jh=0,Zh=0,Kh=!1;const Us=(1+Math.sqrt(5))/2,Or=1/Us,Vv=[new I(-Us,Or,0),new I(Us,Or,0),new I(-Or,0,Us),new I(Or,0,Us),new I(0,Us,-Or),new I(0,Us,Or),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class kv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){Yh=this._renderer.getRenderTarget(),jh=this._renderer.getActiveCubeFace(),Zh=this._renderer.getActiveMipmapLevel(),Kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Yh,jh,Zh),this._renderer.xr.enabled=Kh,t.scissorTest=!1,Gc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Wr||t.mapping===qr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yh=this._renderer.getRenderTarget(),jh=this._renderer.getActiveCubeFace(),Zh=this._renderer.getActiveMipmapLevel(),Kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Wi,minFilter:Wi,generateMipmaps:!1,type:rl,format:Pi,colorSpace:Zr,depthBuffer:!1},l=Xv(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xv(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=e1(c)),this._blurMaterial=n1(c,t,i)}return l}_compileMaterial(t){const i=new Jn(this._lodPlanes[0],t);this._renderer.compile(i,qh)}_sceneToCubeUV(t,i,s,l){const d=new Mi(90,1,i,s),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(Gv),g.toneMapping=$a,g.autoClear=!1;const S=new il({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1}),E=new Jn(new Jr,S);let A=!1;const M=t.background;M?M.isColor&&(S.color.copy(M),t.background=null,A=!0):(S.color.copy(Gv),A=!0);for(let v=0;v<6;v++){const F=v%3;F===0?(d.up.set(0,p[v],0),d.lookAt(m[v],0,0)):F===1?(d.up.set(0,0,p[v]),d.lookAt(0,m[v],0)):(d.up.set(0,p[v],0),d.lookAt(0,0,m[v]));const O=this._cubeSize;Gc(l,F*O,v>2?O:0,O,O),g.setRenderTarget(l),A&&g.render(E,d),g.render(t,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,t.background=M}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Wr||t.mapping===qr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=qv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wv());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new Jn(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const p=this._cubeSize;Gc(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(h,qh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=Vv[(l-c-1)%Vv.length];this._blur(t,c-1,c,h,d)}i.autoClear=s}_blur(t,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",c),this._halfBlur(h,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,h,d){const p=this._renderer,m=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Jn(this._lodPlanes[l],m),x=m.uniforms,S=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*Ns-1),A=c/E,M=isFinite(c)?1+Math.floor(g*A):Ns;M>Ns&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${Ns}`);const v=[];let F=0;for(let z=0;z<Ns;++z){const J=z/A,D=Math.exp(-J*J/2);v.push(D),z===0?F+=D:z<M&&(F+=2*D)}for(let z=0;z<v.length;z++)v[z]=v[z]/F;x.envMap.value=t.texture,x.samples.value=M,x.weights.value=v,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:O}=this;x.dTheta.value=E,x.mipInt.value=O-s;const U=this._sizeLods[l],Q=3*U*(l>O-Ir?l-O+Ir:0),X=4*(this._cubeSize-U);Gc(i,Q,X,3*U,2*U),p.setRenderTarget(i),p.render(_,qh)}}function e1(r){const t=[],i=[],s=[];let l=r;const c=r-Ir+1+Hv.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let p=1/d;h>r-Ir?p=Hv[h-r+Ir-1]:h===0&&(p=0),s.push(p);const m=1/(d-2),g=-m,_=1+m,x=[g,g,_,g,_,_,g,g,_,_,g,_],S=6,E=6,A=3,M=2,v=1,F=new Float32Array(A*E*S),O=new Float32Array(M*E*S),U=new Float32Array(v*E*S);for(let X=0;X<S;X++){const z=X%3*2/3-1,J=X>2?0:-1,D=[z,J,0,z+2/3,J,0,z+2/3,J+1,0,z,J,0,z+2/3,J+1,0,z,J+1,0];F.set(D,A*E*X),O.set(x,M*E*X);const C=[X,X,X,X,X,X];U.set(C,v*E*X)}const Q=new fi;Q.setAttribute("position",new ei(F,A)),Q.setAttribute("uv",new ei(O,M)),Q.setAttribute("faceIndex",new ei(U,v)),t.push(Q),l>Ir&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function Xv(r,t,i){const s=new Is(r,t,i);return s.texture.mapping=su,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Gc(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function n1(r,t,i){const s=new Float32Array(Ns),l=new I(0,1,0);return new es({name:"SphericalGaussianBlur",defines:{n:Ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:dp(),fragmentShader:`

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
		`,blending:Ja,depthTest:!1,depthWrite:!1})}function Wv(){return new es({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dp(),fragmentShader:`

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
		`,blending:Ja,depthTest:!1,depthWrite:!1})}function qv(){return new es({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ja,depthTest:!1,depthWrite:!1})}function dp(){return`

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
	`}function i1(r){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const p=d.mapping,m=p===xd||p===Sd,g=p===Wr||p===qr;if(m||g){let _=t.get(d);const x=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new kv(r)),_=m?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const S=d.image;return m&&S&&S.height>0||g&&S&&l(S)?(i===null&&(i=new kv(r)),_=m?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let p=0;const m=6;for(let g=0;g<m;g++)d[g]!==void 0&&p++;return p===m}function c(d){const p=d.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function a1(r){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&zr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function s1(r,t,i,s){const l={},c=new WeakMap;function h(_){const x=_.target;x.index!==null&&t.remove(x.index);for(const E in x.attributes)t.remove(x.attributes[E]);x.removeEventListener("dispose",h),delete l[x.id];const S=c.get(x);S&&(t.remove(S),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(_,x){return l[x.id]===!0||(x.addEventListener("dispose",h),l[x.id]=!0,i.memory.geometries++),x}function p(_){const x=_.attributes;for(const S in x)t.update(x[S],r.ARRAY_BUFFER)}function m(_){const x=[],S=_.index,E=_.attributes.position;let A=0;if(S!==null){const F=S.array;A=S.version;for(let O=0,U=F.length;O<U;O+=3){const Q=F[O+0],X=F[O+1],z=F[O+2];x.push(Q,X,X,z,z,Q)}}else if(E!==void 0){const F=E.array;A=E.version;for(let O=0,U=F.length/3-1;O<U;O+=3){const Q=O+0,X=O+1,z=O+2;x.push(Q,X,X,z,z,Q)}}else return;const M=new(I0(x)?k0:V0)(x,1);M.version=A;const v=c.get(_);v&&t.remove(v),c.set(_,M)}function g(_){const x=c.get(_);if(x){const S=_.index;S!==null&&x.version<S.version&&m(_)}else m(_);return c.get(_)}return{get:d,update:p,getWireframeAttribute:g}}function r1(r,t,i){let s;function l(x){s=x}let c,h;function d(x){c=x.type,h=x.bytesPerElement}function p(x,S){r.drawElements(s,S,c,x*h),i.update(S,s,1)}function m(x,S,E){E!==0&&(r.drawElementsInstanced(s,S,c,x*h,E),i.update(S,s,E))}function g(x,S,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,x,0,E);let M=0;for(let v=0;v<E;v++)M+=S[v];i.update(M,s,1)}function _(x,S,E,A){if(E===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let v=0;v<x.length;v++)m(x[v]/h,S[v],A[v]);else{M.multiDrawElementsInstancedWEBGL(s,S,0,c,x,0,A,0,E);let v=0;for(let F=0;F<E;F++)v+=S[F]*A[F];i.update(v,s,1)}}this.setMode=l,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function o1(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case r.TRIANGLES:i.triangles+=d*(c/3);break;case r.LINES:i.lines+=d*(c/2);break;case r.LINE_STRIP:i.lines+=d*(c-1);break;case r.LINE_LOOP:i.lines+=d*c;break;case r.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function l1(r,t,i){const s=new WeakMap,l=new rn;function c(h,d,p){const m=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let x=s.get(d);if(x===void 0||x.count!==_){let C=function(){J.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var S=C;x!==void 0&&x.texture.dispose();const E=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,M=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],F=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let U=0;E===!0&&(U=1),A===!0&&(U=2),M===!0&&(U=3);let Q=d.attributes.position.count*U,X=1;Q>t.maxTextureSize&&(X=Math.ceil(Q/t.maxTextureSize),Q=t.maxTextureSize);const z=new Float32Array(Q*X*4*_),J=new H0(z,Q,X,_);J.type=va,J.needsUpdate=!0;const D=U*4;for(let k=0;k<_;k++){const ft=v[k],ct=F[k],vt=O[k],yt=Q*X*4*k;for(let P=0;P<ft.count;P++){const Z=P*D;E===!0&&(l.fromBufferAttribute(ft,P),z[yt+Z+0]=l.x,z[yt+Z+1]=l.y,z[yt+Z+2]=l.z,z[yt+Z+3]=0),A===!0&&(l.fromBufferAttribute(ct,P),z[yt+Z+4]=l.x,z[yt+Z+5]=l.y,z[yt+Z+6]=l.z,z[yt+Z+7]=0),M===!0&&(l.fromBufferAttribute(vt,P),z[yt+Z+8]=l.x,z[yt+Z+9]=l.y,z[yt+Z+10]=l.z,z[yt+Z+11]=vt.itemSize===4?l.w:1)}}x={count:_,texture:J,size:new re(Q,X)},s.set(d,x),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",h.morphTexture,i);else{let E=0;for(let M=0;M<m.length;M++)E+=m[M];const A=d.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",A),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function c1(r,t,i,s){let l=new WeakMap;function c(p){const m=s.render.frame,g=p.geometry,_=t.get(p,g);if(l.get(_)!==m&&(t.update(_),l.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),l.get(p)!==m&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return _}function h(){l=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:c,dispose:h}}const $0=new ti,Yv=new Z0(1,1),ty=new H0,ey=new PM,ny=new q0,jv=[],Zv=[],Kv=new Float32Array(16),Qv=new Float32Array(9),Jv=new Float32Array(4);function $r(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=jv[l];if(c===void 0&&(c=new Float32Array(l),jv[l]=c),t!==0){s.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,r[h].toArray(c,d)}return c}function Sn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function Mn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function lu(r,t){let i=Zv[t];i===void 0&&(i=new Int32Array(t),Zv[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function u1(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function f1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;r.uniform2fv(this.addr,t),Mn(i,t)}}function h1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Sn(i,t))return;r.uniform3fv(this.addr,t),Mn(i,t)}}function d1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;r.uniform4fv(this.addr,t),Mn(i,t)}}function p1(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Sn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),Mn(i,t)}else{if(Sn(i,s))return;Jv.set(s),r.uniformMatrix2fv(this.addr,!1,Jv),Mn(i,s)}}function m1(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Sn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),Mn(i,t)}else{if(Sn(i,s))return;Qv.set(s),r.uniformMatrix3fv(this.addr,!1,Qv),Mn(i,s)}}function g1(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Sn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),Mn(i,t)}else{if(Sn(i,s))return;Kv.set(s),r.uniformMatrix4fv(this.addr,!1,Kv),Mn(i,s)}}function _1(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function v1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;r.uniform2iv(this.addr,t),Mn(i,t)}}function y1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Sn(i,t))return;r.uniform3iv(this.addr,t),Mn(i,t)}}function x1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;r.uniform4iv(this.addr,t),Mn(i,t)}}function S1(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function M1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;r.uniform2uiv(this.addr,t),Mn(i,t)}}function E1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Sn(i,t))return;r.uniform3uiv(this.addr,t),Mn(i,t)}}function b1(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;r.uniform4uiv(this.addr,t),Mn(i,t)}}function T1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Yv.compareFunction=B0,c=Yv):c=$0,i.setTexture2D(t||c,l)}function A1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||ey,l)}function R1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||ny,l)}function C1(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||ty,l)}function w1(r){switch(r){case 5126:return u1;case 35664:return f1;case 35665:return h1;case 35666:return d1;case 35674:return p1;case 35675:return m1;case 35676:return g1;case 5124:case 35670:return _1;case 35667:case 35671:return v1;case 35668:case 35672:return y1;case 35669:case 35673:return x1;case 5125:return S1;case 36294:return M1;case 36295:return E1;case 36296:return b1;case 35678:case 36198:case 36298:case 36306:case 35682:return T1;case 35679:case 36299:case 36307:return A1;case 35680:case 36300:case 36308:case 36293:return R1;case 36289:case 36303:case 36311:case 36292:return C1}}function D1(r,t){r.uniform1fv(this.addr,t)}function U1(r,t){const i=$r(t,this.size,2);r.uniform2fv(this.addr,i)}function L1(r,t){const i=$r(t,this.size,3);r.uniform3fv(this.addr,i)}function N1(r,t){const i=$r(t,this.size,4);r.uniform4fv(this.addr,i)}function O1(r,t){const i=$r(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function P1(r,t){const i=$r(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function z1(r,t){const i=$r(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function B1(r,t){r.uniform1iv(this.addr,t)}function I1(r,t){r.uniform2iv(this.addr,t)}function F1(r,t){r.uniform3iv(this.addr,t)}function H1(r,t){r.uniform4iv(this.addr,t)}function G1(r,t){r.uniform1uiv(this.addr,t)}function V1(r,t){r.uniform2uiv(this.addr,t)}function k1(r,t){r.uniform3uiv(this.addr,t)}function X1(r,t){r.uniform4uiv(this.addr,t)}function W1(r,t,i){const s=this.cache,l=t.length,c=lu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||$0,c[h])}function q1(r,t,i){const s=this.cache,l=t.length,c=lu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||ey,c[h])}function Y1(r,t,i){const s=this.cache,l=t.length,c=lu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||ny,c[h])}function j1(r,t,i){const s=this.cache,l=t.length,c=lu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),Mn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||ty,c[h])}function Z1(r){switch(r){case 5126:return D1;case 35664:return U1;case 35665:return L1;case 35666:return N1;case 35674:return O1;case 35675:return P1;case 35676:return z1;case 5124:case 35670:return B1;case 35667:case 35671:return I1;case 35668:case 35672:return F1;case 35669:case 35673:return H1;case 5125:return G1;case 36294:return V1;case 36295:return k1;case 36296:return X1;case 35678:case 36198:case 36298:case 36306:case 35682:return W1;case 35679:case 36299:case 36307:return q1;case 35680:case 36300:case 36308:case 36293:return Y1;case 36289:case 36303:case 36311:case 36292:return j1}}class K1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=w1(i.type)}}class Q1{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=Z1(i.type)}}class J1{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const Qh=/(\w+)(\])?(\[|\.)?/g;function $v(r,t){r.seq.push(t),r.map[t.id]=t}function $1(r,t,i){const s=r.name,l=s.length;for(Qh.lastIndex=0;;){const c=Qh.exec(s),h=Qh.lastIndex;let d=c[1];const p=c[2]==="]",m=c[3];if(p&&(d=d|0),m===void 0||m==="["&&h+2===l){$v(i,m===void 0?new K1(d,r,t):new Q1(d,r,t));break}else{let _=i.map[d];_===void 0&&(_=new J1(d),$v(i,_)),i=_}}}class Jc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),h=t.getUniformLocation(i,c.name);$1(c,h,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],p=s[d.id];p.needsUpdate!==!1&&d.setValue(t,p.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function t0(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const tA=37297;let eA=0;function nA(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const e0=new se;function iA(r){Ue._getMatrix(e0,Ue.workingColorSpace,r);const t=`mat3( ${e0.elements.map(i=>i.toFixed(4))} )`;switch(Ue.getTransfer(r)){case $c:return[t,"LinearTransferOETF"];case Ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function n0(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const h=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+nA(r.getShaderSource(t),h)}else return l}function aA(r,t){const i=iA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function sA(r,t){let i;switch(t){case qS:i="Linear";break;case YS:i="Reinhard";break;case jS:i="Cineon";break;case ZS:i="ACESFilmic";break;case QS:i="AgX";break;case JS:i="Neutral";break;case KS:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Vc=new I;function rA(){Ue.getLuminanceCoefficients(Vc);const r=Vc.x.toFixed(4),t=Vc.y.toFixed(4),i=Vc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tl).join(`
`)}function lA(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function cA(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),h=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:r.getAttribLocation(t,h),locationSize:d}}return i}function tl(r){return r!==""}function i0(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function a0(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const uA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qd(r){return r.replace(uA,hA)}const fA=new Map;function hA(r,t){let i=fe[t];if(i===void 0){const s=fA.get(t);if(s!==void 0)i=fe[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Qd(i)}const dA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function s0(r){return r.replace(dA,pA)}function pA(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function r0(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===M0?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===E0?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===_a&&(t="SHADOWMAP_TYPE_VSM"),t}function gA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Wr:case qr:t="ENVMAP_TYPE_CUBE";break;case su:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _A(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case qr:t="ENVMAP_MODE_REFRACTION";break}return t}function vA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case b0:t="ENVMAP_BLENDING_MULTIPLY";break;case XS:t="ENVMAP_BLENDING_MIX";break;case WS:t="ENVMAP_BLENDING_ADD";break}return t}function yA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function xA(r,t,i,s){const l=r.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const p=mA(i),m=gA(i),g=_A(i),_=vA(i),x=yA(i),S=oA(i),E=lA(c),A=l.createProgram();let M,v,F=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(tl).join(`
`),M.length>0&&(M+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(tl).join(`
`),v.length>0&&(v+=`
`)):(M=[r0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tl).join(`
`),v=[r0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==$a?"#define TONE_MAPPING":"",i.toneMapping!==$a?fe.tonemapping_pars_fragment:"",i.toneMapping!==$a?sA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,aA("linearToOutputTexel",i.outputColorSpace),rA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(tl).join(`
`)),h=Qd(h),h=i0(h,i),h=a0(h,i),d=Qd(d),d=i0(d,i),d=a0(d,i),h=s0(h),d=s0(d),i.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,M=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,v=["#define varying in",i.glslVersion===fv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===fv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const O=F+M+h,U=F+v+d,Q=t0(l,l.VERTEX_SHADER,O),X=t0(l,l.FRAGMENT_SHADER,U);l.attachShader(A,Q),l.attachShader(A,X),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function z(k){if(r.debug.checkShaderErrors){const ft=l.getProgramInfoLog(A).trim(),ct=l.getShaderInfoLog(Q).trim(),vt=l.getShaderInfoLog(X).trim();let yt=!0,P=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(yt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,A,Q,X);else{const Z=n0(l,Q,"vertex"),K=n0(l,X,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+ft+`
`+Z+`
`+K)}else ft!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ft):(ct===""||vt==="")&&(P=!1);P&&(k.diagnostics={runnable:yt,programLog:ft,vertexShader:{log:ct,prefix:M},fragmentShader:{log:vt,prefix:v}})}l.deleteShader(Q),l.deleteShader(X),J=new Jc(l,A),D=cA(l,A)}let J;this.getUniforms=function(){return J===void 0&&z(this),J};let D;this.getAttributes=function(){return D===void 0&&z(this),D};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(A,tA)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=eA++,this.cacheKey=t,this.usedTimes=1,this.program=A,this.vertexShader=Q,this.fragmentShader=X,this}let SA=0;class MA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new EA(t),i.set(t,s)),s}}class EA{constructor(t){this.id=SA++,this.code=t,this.usedTimes=0}}function bA(r,t,i,s,l,c,h){const d=new up,p=new MA,m=new Set,g=[],_=l.logarithmicDepthBuffer,x=l.vertexTextures;let S=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(D){return m.add(D),D===0?"uv":`uv${D}`}function M(D,C,k,ft,ct){const vt=ft.fog,yt=ct.geometry,P=D.isMeshStandardMaterial?ft.environment:null,Z=(D.isMeshStandardMaterial?i:t).get(D.envMap||P),K=Z&&Z.mapping===su?Z.image.height:null,Mt=E[D.type];D.precision!==null&&(S=l.getMaxPrecision(D.precision),S!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",S,"instead."));const Tt=yt.morphAttributes.position||yt.morphAttributes.normal||yt.morphAttributes.color,N=Tt!==void 0?Tt.length:0;let et=0;yt.morphAttributes.position!==void 0&&(et=1),yt.morphAttributes.normal!==void 0&&(et=2),yt.morphAttributes.color!==void 0&&(et=3);let Et,w,H,st;if(Mt){const Ae=Xi[Mt];Et=Ae.vertexShader,w=Ae.fragmentShader}else Et=D.vertexShader,w=D.fragmentShader,p.update(D),H=p.getVertexShaderID(D),st=p.getFragmentShaderID(D);const dt=r.getRenderTarget(),Rt=r.state.buffers.depth.getReversed(),Ot=ct.isInstancedMesh===!0,ie=ct.isBatchedMesh===!0,Be=!!D.map,me=!!D.matcap,Qe=!!Z,G=!!D.aoMap,On=!!D.lightMap,de=!!D.bumpMap,ye=!!D.normalMap,Yt=!!D.displacementMap,Oe=!!D.emissiveMap,qt=!!D.metalnessMap,L=!!D.roughnessMap,T=D.anisotropy>0,it=D.clearcoat>0,pt=D.dispersion>0,bt=D.iridescence>0,gt=D.sheen>0,Xt=D.transmission>0,Dt=T&&!!D.anisotropyMap,Ft=it&&!!D.clearcoatMap,xe=it&&!!D.clearcoatNormalMap,At=it&&!!D.clearcoatRoughnessMap,Ht=bt&&!!D.iridescenceMap,jt=bt&&!!D.iridescenceThicknessMap,Wt=gt&&!!D.sheenColorMap,Pt=gt&&!!D.sheenRoughnessMap,$t=!!D.specularMap,oe=!!D.specularColorMap,Ie=!!D.specularIntensityMap,W=Xt&&!!D.transmissionMap,Ct=Xt&&!!D.thicknessMap,ut=!!D.gradientMap,xt=!!D.alphaMap,wt=D.alphaTest>0,Ut=!!D.alphaHash,te=!!D.extensions;let Je=$a;D.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(Je=r.toneMapping);const gn={shaderID:Mt,shaderType:D.type,shaderName:D.name,vertexShader:Et,fragmentShader:w,defines:D.defines,customVertexShaderID:H,customFragmentShaderID:st,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:S,batching:ie,batchingColor:ie&&ct._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&ct.instanceColor!==null,instancingMorph:Ot&&ct.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:dt===null?r.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Zr,alphaToCoverage:!!D.alphaToCoverage,map:Be,matcap:me,envMap:Qe,envMapMode:Qe&&Z.mapping,envMapCubeUVHeight:K,aoMap:G,lightMap:On,bumpMap:de,normalMap:ye,displacementMap:x&&Yt,emissiveMap:Oe,normalMapObjectSpace:ye&&D.normalMapType===nM,normalMapTangentSpace:ye&&D.normalMapType===z0,metalnessMap:qt,roughnessMap:L,anisotropy:T,anisotropyMap:Dt,clearcoat:it,clearcoatMap:Ft,clearcoatNormalMap:xe,clearcoatRoughnessMap:At,dispersion:pt,iridescence:bt,iridescenceMap:Ht,iridescenceThicknessMap:jt,sheen:gt,sheenColorMap:Wt,sheenRoughnessMap:Pt,specularMap:$t,specularColorMap:oe,specularIntensityMap:Ie,transmission:Xt,transmissionMap:W,thicknessMap:Ct,gradientMap:ut,opaque:D.transparent===!1&&D.blending===Gr&&D.alphaToCoverage===!1,alphaMap:xt,alphaTest:wt,alphaHash:Ut,combine:D.combine,mapUv:Be&&A(D.map.channel),aoMapUv:G&&A(D.aoMap.channel),lightMapUv:On&&A(D.lightMap.channel),bumpMapUv:de&&A(D.bumpMap.channel),normalMapUv:ye&&A(D.normalMap.channel),displacementMapUv:Yt&&A(D.displacementMap.channel),emissiveMapUv:Oe&&A(D.emissiveMap.channel),metalnessMapUv:qt&&A(D.metalnessMap.channel),roughnessMapUv:L&&A(D.roughnessMap.channel),anisotropyMapUv:Dt&&A(D.anisotropyMap.channel),clearcoatMapUv:Ft&&A(D.clearcoatMap.channel),clearcoatNormalMapUv:xe&&A(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&A(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Ht&&A(D.iridescenceMap.channel),iridescenceThicknessMapUv:jt&&A(D.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&A(D.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&A(D.sheenRoughnessMap.channel),specularMapUv:$t&&A(D.specularMap.channel),specularColorMapUv:oe&&A(D.specularColorMap.channel),specularIntensityMapUv:Ie&&A(D.specularIntensityMap.channel),transmissionMapUv:W&&A(D.transmissionMap.channel),thicknessMapUv:Ct&&A(D.thicknessMap.channel),alphaMapUv:xt&&A(D.alphaMap.channel),vertexTangents:!!yt.attributes.tangent&&(ye||T),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!yt.attributes.color&&yt.attributes.color.itemSize===4,pointsUvs:ct.isPoints===!0&&!!yt.attributes.uv&&(Be||xt),fog:!!vt,useFog:D.fog===!0,fogExp2:!!vt&&vt.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Rt,skinning:ct.isSkinnedMesh===!0,morphTargets:yt.morphAttributes.position!==void 0,morphNormals:yt.morphAttributes.normal!==void 0,morphColors:yt.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:et,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:Je,decodeVideoTexture:Be&&D.map.isVideoTexture===!0&&Ue.getTransfer(D.map.colorSpace)===Ve,decodeVideoTextureEmissive:Oe&&D.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(D.emissiveMap.colorSpace)===Ve,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Ei,flipSided:D.side===$n,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:te&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&D.extensions.multiDraw===!0||ie)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return gn.vertexUv1s=m.has(1),gn.vertexUv2s=m.has(2),gn.vertexUv3s=m.has(3),m.clear(),gn}function v(D){const C=[];if(D.shaderID?C.push(D.shaderID):(C.push(D.customVertexShaderID),C.push(D.customFragmentShaderID)),D.defines!==void 0)for(const k in D.defines)C.push(k),C.push(D.defines[k]);return D.isRawShaderMaterial===!1&&(F(C,D),O(C,D),C.push(r.outputColorSpace)),C.push(D.customProgramCacheKey),C.join()}function F(D,C){D.push(C.precision),D.push(C.outputColorSpace),D.push(C.envMapMode),D.push(C.envMapCubeUVHeight),D.push(C.mapUv),D.push(C.alphaMapUv),D.push(C.lightMapUv),D.push(C.aoMapUv),D.push(C.bumpMapUv),D.push(C.normalMapUv),D.push(C.displacementMapUv),D.push(C.emissiveMapUv),D.push(C.metalnessMapUv),D.push(C.roughnessMapUv),D.push(C.anisotropyMapUv),D.push(C.clearcoatMapUv),D.push(C.clearcoatNormalMapUv),D.push(C.clearcoatRoughnessMapUv),D.push(C.iridescenceMapUv),D.push(C.iridescenceThicknessMapUv),D.push(C.sheenColorMapUv),D.push(C.sheenRoughnessMapUv),D.push(C.specularMapUv),D.push(C.specularColorMapUv),D.push(C.specularIntensityMapUv),D.push(C.transmissionMapUv),D.push(C.thicknessMapUv),D.push(C.combine),D.push(C.fogExp2),D.push(C.sizeAttenuation),D.push(C.morphTargetsCount),D.push(C.morphAttributeCount),D.push(C.numDirLights),D.push(C.numPointLights),D.push(C.numSpotLights),D.push(C.numSpotLightMaps),D.push(C.numHemiLights),D.push(C.numRectAreaLights),D.push(C.numDirLightShadows),D.push(C.numPointLightShadows),D.push(C.numSpotLightShadows),D.push(C.numSpotLightShadowsWithMaps),D.push(C.numLightProbes),D.push(C.shadowMapType),D.push(C.toneMapping),D.push(C.numClippingPlanes),D.push(C.numClipIntersection),D.push(C.depthPacking)}function O(D,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),D.push(d.mask)}function U(D){const C=E[D.type];let k;if(C){const ft=Xi[C];k=YM.clone(ft.uniforms)}else k=D.uniforms;return k}function Q(D,C){let k;for(let ft=0,ct=g.length;ft<ct;ft++){const vt=g[ft];if(vt.cacheKey===C){k=vt,++k.usedTimes;break}}return k===void 0&&(k=new xA(r,C,D,c),g.push(k)),k}function X(D){if(--D.usedTimes===0){const C=g.indexOf(D);g[C]=g[g.length-1],g.pop(),D.destroy()}}function z(D){p.remove(D)}function J(){p.dispose()}return{getParameters:M,getProgramCacheKey:v,getUniforms:U,acquireProgram:Q,releaseProgram:X,releaseShaderCache:z,programs:g,dispose:J}}function TA(){let r=new WeakMap;function t(h){return r.has(h)}function i(h){let d=r.get(h);return d===void 0&&(d={},r.set(h,d)),d}function s(h){r.delete(h)}function l(h,d,p){r.get(h)[d]=p}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function AA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function o0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function l0(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(_,x,S,E,A,M){let v=r[t];return v===void 0?(v={id:_.id,object:_,geometry:x,material:S,groupOrder:E,renderOrder:_.renderOrder,z:A,group:M},r[t]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=S,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=A,v.group=M),t++,v}function d(_,x,S,E,A,M){const v=h(_,x,S,E,A,M);S.transmission>0?s.push(v):S.transparent===!0?l.push(v):i.push(v)}function p(_,x,S,E,A,M){const v=h(_,x,S,E,A,M);S.transmission>0?s.unshift(v):S.transparent===!0?l.unshift(v):i.unshift(v)}function m(_,x){i.length>1&&i.sort(_||AA),s.length>1&&s.sort(x||o0),l.length>1&&l.sort(x||o0)}function g(){for(let _=t,x=r.length;_<x;_++){const S=r[_];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:p,finish:g,sort:m}}function RA(){let r=new WeakMap;function t(s,l){const c=r.get(s);let h;return c===void 0?(h=new l0,r.set(s,[h])):l>=c.length?(h=new l0,c.push(h)):h=c[l],h}function i(){r=new WeakMap}return{get:t,dispose:i}}function CA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new I,color:new he};break;case"SpotLight":i={position:new I,direction:new I,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new I,color:new he,distance:0,decay:0};break;case"HemisphereLight":i={direction:new I,skyColor:new he,groundColor:new he};break;case"RectAreaLight":i={color:new he,position:new I,halfWidth:new I,halfHeight:new I};break}return r[t.id]=i,i}}}function wA(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let DA=0;function UA(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function LA(r){const t=new CA,i=wA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new I);const l=new I,c=new Xe,h=new Xe;function d(m){let g=0,_=0,x=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let S=0,E=0,A=0,M=0,v=0,F=0,O=0,U=0,Q=0,X=0,z=0;m.sort(UA);for(let D=0,C=m.length;D<C;D++){const k=m[D],ft=k.color,ct=k.intensity,vt=k.distance,yt=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)g+=ft.r*ct,_+=ft.g*ct,x+=ft.b*ct;else if(k.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(k.sh.coefficients[P],ct);z++}else if(k.isDirectionalLight){const P=t.get(k);if(P.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const Z=k.shadow,K=i.get(k);K.shadowIntensity=Z.intensity,K.shadowBias=Z.bias,K.shadowNormalBias=Z.normalBias,K.shadowRadius=Z.radius,K.shadowMapSize=Z.mapSize,s.directionalShadow[S]=K,s.directionalShadowMap[S]=yt,s.directionalShadowMatrix[S]=k.shadow.matrix,F++}s.directional[S]=P,S++}else if(k.isSpotLight){const P=t.get(k);P.position.setFromMatrixPosition(k.matrixWorld),P.color.copy(ft).multiplyScalar(ct),P.distance=vt,P.coneCos=Math.cos(k.angle),P.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),P.decay=k.decay,s.spot[A]=P;const Z=k.shadow;if(k.map&&(s.spotLightMap[Q]=k.map,Q++,Z.updateMatrices(k),k.castShadow&&X++),s.spotLightMatrix[A]=Z.matrix,k.castShadow){const K=i.get(k);K.shadowIntensity=Z.intensity,K.shadowBias=Z.bias,K.shadowNormalBias=Z.normalBias,K.shadowRadius=Z.radius,K.shadowMapSize=Z.mapSize,s.spotShadow[A]=K,s.spotShadowMap[A]=yt,U++}A++}else if(k.isRectAreaLight){const P=t.get(k);P.color.copy(ft).multiplyScalar(ct),P.halfWidth.set(k.width*.5,0,0),P.halfHeight.set(0,k.height*.5,0),s.rectArea[M]=P,M++}else if(k.isPointLight){const P=t.get(k);if(P.color.copy(k.color).multiplyScalar(k.intensity),P.distance=k.distance,P.decay=k.decay,k.castShadow){const Z=k.shadow,K=i.get(k);K.shadowIntensity=Z.intensity,K.shadowBias=Z.bias,K.shadowNormalBias=Z.normalBias,K.shadowRadius=Z.radius,K.shadowMapSize=Z.mapSize,K.shadowCameraNear=Z.camera.near,K.shadowCameraFar=Z.camera.far,s.pointShadow[E]=K,s.pointShadowMap[E]=yt,s.pointShadowMatrix[E]=k.shadow.matrix,O++}s.point[E]=P,E++}else if(k.isHemisphereLight){const P=t.get(k);P.skyColor.copy(k.color).multiplyScalar(ct),P.groundColor.copy(k.groundColor).multiplyScalar(ct),s.hemi[v]=P,v++}}M>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Nt.LTC_FLOAT_1,s.rectAreaLTC2=Nt.LTC_FLOAT_2):(s.rectAreaLTC1=Nt.LTC_HALF_1,s.rectAreaLTC2=Nt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=_,s.ambient[2]=x;const J=s.hash;(J.directionalLength!==S||J.pointLength!==E||J.spotLength!==A||J.rectAreaLength!==M||J.hemiLength!==v||J.numDirectionalShadows!==F||J.numPointShadows!==O||J.numSpotShadows!==U||J.numSpotMaps!==Q||J.numLightProbes!==z)&&(s.directional.length=S,s.spot.length=A,s.rectArea.length=M,s.point.length=E,s.hemi.length=v,s.directionalShadow.length=F,s.directionalShadowMap.length=F,s.pointShadow.length=O,s.pointShadowMap.length=O,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=F,s.pointShadowMatrix.length=O,s.spotLightMatrix.length=U+Q-X,s.spotLightMap.length=Q,s.numSpotLightShadowsWithMaps=X,s.numLightProbes=z,J.directionalLength=S,J.pointLength=E,J.spotLength=A,J.rectAreaLength=M,J.hemiLength=v,J.numDirectionalShadows=F,J.numPointShadows=O,J.numSpotShadows=U,J.numSpotMaps=Q,J.numLightProbes=z,s.version=DA++)}function p(m,g){let _=0,x=0,S=0,E=0,A=0;const M=g.matrixWorldInverse;for(let v=0,F=m.length;v<F;v++){const O=m[v];if(O.isDirectionalLight){const U=s.directional[_];U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(M),_++}else if(O.isSpotLight){const U=s.spot[S];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(M),U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(M),S++}else if(O.isRectAreaLight){const U=s.rectArea[E];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(M),h.identity(),c.copy(O.matrixWorld),c.premultiply(M),h.extractRotation(c),U.halfWidth.set(O.width*.5,0,0),U.halfHeight.set(0,O.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),E++}else if(O.isPointLight){const U=s.point[x];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(M),x++}else if(O.isHemisphereLight){const U=s.hemi[A];U.direction.setFromMatrixPosition(O.matrixWorld),U.direction.transformDirection(M),A++}}}return{setup:d,setupView:p,state:s}}function c0(r){const t=new LA(r),i=[],s=[];function l(g){m.camera=g,i.length=0,s.length=0}function c(g){i.push(g)}function h(g){s.push(g)}function d(){t.setup(i)}function p(g){t.setupView(i,g)}const m={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:d,setupLightsView:p,pushLight:c,pushShadow:h}}function NA(r){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new c0(r),t.set(l,[d])):c>=h.length?(d=new c0(r),h.push(d)):d=h[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const OA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,PA=`uniform sampler2D shadow_pass;
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
}`;function zA(r,t,i){let s=new hp;const l=new re,c=new re,h=new rn,d=new nE({depthPacking:eM}),p=new iE,m={},g=i.maxTextureSize,_={[ts]:$n,[$n]:ts,[Ei]:Ei},x=new es({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:OA,fragmentShader:PA}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const E=new fi;E.setAttribute("position",new ei(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Jn(E,x),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=M0;let v=this.type;this.render=function(X,z,J){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||X.length===0)return;const D=r.getRenderTarget(),C=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),ft=r.state;ft.setBlending(Ja),ft.buffers.color.setClear(1,1,1,1),ft.buffers.depth.setTest(!0),ft.setScissorTest(!1);const ct=v!==_a&&this.type===_a,vt=v===_a&&this.type!==_a;for(let yt=0,P=X.length;yt<P;yt++){const Z=X[yt],K=Z.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const Mt=K.getFrameExtents();if(l.multiply(Mt),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/Mt.x),l.x=c.x*Mt.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/Mt.y),l.y=c.y*Mt.y,K.mapSize.y=c.y)),K.map===null||ct===!0||vt===!0){const N=this.type!==_a?{minFilter:zi,magFilter:zi}:{};K.map!==null&&K.map.dispose(),K.map=new Is(l.x,l.y,N),K.map.texture.name=Z.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const Tt=K.getViewportCount();for(let N=0;N<Tt;N++){const et=K.getViewport(N);h.set(c.x*et.x,c.y*et.y,c.x*et.z,c.y*et.w),ft.viewport(h),K.updateMatrices(Z,N),s=K.getFrustum(),U(z,J,K.camera,Z,this.type)}K.isPointLightShadow!==!0&&this.type===_a&&F(K,J),K.needsUpdate=!1}v=this.type,M.needsUpdate=!1,r.setRenderTarget(D,C,k)};function F(X,z){const J=t.update(A);x.defines.VSM_SAMPLES!==X.blurSamples&&(x.defines.VSM_SAMPLES=X.blurSamples,S.defines.VSM_SAMPLES=X.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),X.mapPass===null&&(X.mapPass=new Is(l.x,l.y)),x.uniforms.shadow_pass.value=X.map.texture,x.uniforms.resolution.value=X.mapSize,x.uniforms.radius.value=X.radius,r.setRenderTarget(X.mapPass),r.clear(),r.renderBufferDirect(z,null,J,x,A,null),S.uniforms.shadow_pass.value=X.mapPass.texture,S.uniforms.resolution.value=X.mapSize,S.uniforms.radius.value=X.radius,r.setRenderTarget(X.map),r.clear(),r.renderBufferDirect(z,null,J,S,A,null)}function O(X,z,J,D){let C=null;const k=J.isPointLight===!0?X.customDistanceMaterial:X.customDepthMaterial;if(k!==void 0)C=k;else if(C=J.isPointLight===!0?p:d,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0){const ft=C.uuid,ct=z.uuid;let vt=m[ft];vt===void 0&&(vt={},m[ft]=vt);let yt=vt[ct];yt===void 0&&(yt=C.clone(),vt[ct]=yt,z.addEventListener("dispose",Q)),C=yt}if(C.visible=z.visible,C.wireframe=z.wireframe,D===_a?C.side=z.shadowSide!==null?z.shadowSide:z.side:C.side=z.shadowSide!==null?z.shadowSide:_[z.side],C.alphaMap=z.alphaMap,C.alphaTest=z.alphaTest,C.map=z.map,C.clipShadows=z.clipShadows,C.clippingPlanes=z.clippingPlanes,C.clipIntersection=z.clipIntersection,C.displacementMap=z.displacementMap,C.displacementScale=z.displacementScale,C.displacementBias=z.displacementBias,C.wireframeLinewidth=z.wireframeLinewidth,C.linewidth=z.linewidth,J.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const ft=r.properties.get(C);ft.light=J}return C}function U(X,z,J,D,C){if(X.visible===!1)return;if(X.layers.test(z.layers)&&(X.isMesh||X.isLine||X.isPoints)&&(X.castShadow||X.receiveShadow&&C===_a)&&(!X.frustumCulled||s.intersectsObject(X))){X.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,X.matrixWorld);const ct=t.update(X),vt=X.material;if(Array.isArray(vt)){const yt=ct.groups;for(let P=0,Z=yt.length;P<Z;P++){const K=yt[P],Mt=vt[K.materialIndex];if(Mt&&Mt.visible){const Tt=O(X,Mt,D,C);X.onBeforeShadow(r,X,z,J,ct,Tt,K),r.renderBufferDirect(J,null,ct,Tt,X,K),X.onAfterShadow(r,X,z,J,ct,Tt,K)}}}else if(vt.visible){const yt=O(X,vt,D,C);X.onBeforeShadow(r,X,z,J,ct,yt,null),r.renderBufferDirect(J,null,ct,yt,X,null),X.onAfterShadow(r,X,z,J,ct,yt,null)}}const ft=X.children;for(let ct=0,vt=ft.length;ct<vt;ct++)U(ft[ct],z,J,D,C)}function Q(X){X.target.removeEventListener("dispose",Q);for(const J in m){const D=m[J],C=X.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}}const BA={[dd]:pd,[md]:vd,[gd]:yd,[Xr]:_d,[pd]:dd,[vd]:md,[yd]:gd,[_d]:Xr};function IA(r,t){function i(){let W=!1;const Ct=new rn;let ut=null;const xt=new rn(0,0,0,0);return{setMask:function(wt){ut!==wt&&!W&&(r.colorMask(wt,wt,wt,wt),ut=wt)},setLocked:function(wt){W=wt},setClear:function(wt,Ut,te,Je,gn){gn===!0&&(wt*=Je,Ut*=Je,te*=Je),Ct.set(wt,Ut,te,Je),xt.equals(Ct)===!1&&(r.clearColor(wt,Ut,te,Je),xt.copy(Ct))},reset:function(){W=!1,ut=null,xt.set(-1,0,0,0)}}}function s(){let W=!1,Ct=!1,ut=null,xt=null,wt=null;return{setReversed:function(Ut){if(Ct!==Ut){const te=t.get("EXT_clip_control");Ct?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT);const Je=wt;wt=null,this.setClear(Je)}Ct=Ut},getReversed:function(){return Ct},setTest:function(Ut){Ut?dt(r.DEPTH_TEST):Rt(r.DEPTH_TEST)},setMask:function(Ut){ut!==Ut&&!W&&(r.depthMask(Ut),ut=Ut)},setFunc:function(Ut){if(Ct&&(Ut=BA[Ut]),xt!==Ut){switch(Ut){case dd:r.depthFunc(r.NEVER);break;case pd:r.depthFunc(r.ALWAYS);break;case md:r.depthFunc(r.LESS);break;case Xr:r.depthFunc(r.LEQUAL);break;case gd:r.depthFunc(r.EQUAL);break;case _d:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case yd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}xt=Ut}},setLocked:function(Ut){W=Ut},setClear:function(Ut){wt!==Ut&&(Ct&&(Ut=1-Ut),r.clearDepth(Ut),wt=Ut)},reset:function(){W=!1,ut=null,xt=null,wt=null,Ct=!1}}}function l(){let W=!1,Ct=null,ut=null,xt=null,wt=null,Ut=null,te=null,Je=null,gn=null;return{setTest:function(Ae){W||(Ae?dt(r.STENCIL_TEST):Rt(r.STENCIL_TEST))},setMask:function(Ae){Ct!==Ae&&!W&&(r.stencilMask(Ae),Ct=Ae)},setFunc:function(Ae,Rn,bi){(ut!==Ae||xt!==Rn||wt!==bi)&&(r.stencilFunc(Ae,Rn,bi),ut=Ae,xt=Rn,wt=bi)},setOp:function(Ae,Rn,bi){(Ut!==Ae||te!==Rn||Je!==bi)&&(r.stencilOp(Ae,Rn,bi),Ut=Ae,te=Rn,Je=bi)},setLocked:function(Ae){W=Ae},setClear:function(Ae){gn!==Ae&&(r.clearStencil(Ae),gn=Ae)},reset:function(){W=!1,Ct=null,ut=null,xt=null,wt=null,Ut=null,te=null,Je=null,gn=null}}}const c=new i,h=new s,d=new l,p=new WeakMap,m=new WeakMap;let g={},_={},x=new WeakMap,S=[],E=null,A=!1,M=null,v=null,F=null,O=null,U=null,Q=null,X=null,z=new he(0,0,0),J=0,D=!1,C=null,k=null,ft=null,ct=null,vt=null;const yt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,Z=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(K)[1]),P=Z>=1):K.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),P=Z>=2);let Mt=null,Tt={};const N=r.getParameter(r.SCISSOR_BOX),et=r.getParameter(r.VIEWPORT),Et=new rn().fromArray(N),w=new rn().fromArray(et);function H(W,Ct,ut,xt){const wt=new Uint8Array(4),Ut=r.createTexture();r.bindTexture(W,Ut),r.texParameteri(W,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(W,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let te=0;te<ut;te++)W===r.TEXTURE_3D||W===r.TEXTURE_2D_ARRAY?r.texImage3D(Ct,0,r.RGBA,1,1,xt,0,r.RGBA,r.UNSIGNED_BYTE,wt):r.texImage2D(Ct+te,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,wt);return Ut}const st={};st[r.TEXTURE_2D]=H(r.TEXTURE_2D,r.TEXTURE_2D,1),st[r.TEXTURE_CUBE_MAP]=H(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[r.TEXTURE_2D_ARRAY]=H(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),st[r.TEXTURE_3D]=H(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),dt(r.DEPTH_TEST),h.setFunc(Xr),de(!1),ye(sv),dt(r.CULL_FACE),G(Ja);function dt(W){g[W]!==!0&&(r.enable(W),g[W]=!0)}function Rt(W){g[W]!==!1&&(r.disable(W),g[W]=!1)}function Ot(W,Ct){return _[W]!==Ct?(r.bindFramebuffer(W,Ct),_[W]=Ct,W===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Ct),W===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Ct),!0):!1}function ie(W,Ct){let ut=S,xt=!1;if(W){ut=x.get(Ct),ut===void 0&&(ut=[],x.set(Ct,ut));const wt=W.textures;if(ut.length!==wt.length||ut[0]!==r.COLOR_ATTACHMENT0){for(let Ut=0,te=wt.length;Ut<te;Ut++)ut[Ut]=r.COLOR_ATTACHMENT0+Ut;ut.length=wt.length,xt=!0}}else ut[0]!==r.BACK&&(ut[0]=r.BACK,xt=!0);xt&&r.drawBuffers(ut)}function Be(W){return E!==W?(r.useProgram(W),E=W,!0):!1}const me={[Ls]:r.FUNC_ADD,[RS]:r.FUNC_SUBTRACT,[CS]:r.FUNC_REVERSE_SUBTRACT};me[wS]=r.MIN,me[DS]=r.MAX;const Qe={[US]:r.ZERO,[LS]:r.ONE,[NS]:r.SRC_COLOR,[fd]:r.SRC_ALPHA,[FS]:r.SRC_ALPHA_SATURATE,[BS]:r.DST_COLOR,[PS]:r.DST_ALPHA,[OS]:r.ONE_MINUS_SRC_COLOR,[hd]:r.ONE_MINUS_SRC_ALPHA,[IS]:r.ONE_MINUS_DST_COLOR,[zS]:r.ONE_MINUS_DST_ALPHA,[HS]:r.CONSTANT_COLOR,[GS]:r.ONE_MINUS_CONSTANT_COLOR,[VS]:r.CONSTANT_ALPHA,[kS]:r.ONE_MINUS_CONSTANT_ALPHA};function G(W,Ct,ut,xt,wt,Ut,te,Je,gn,Ae){if(W===Ja){A===!0&&(Rt(r.BLEND),A=!1);return}if(A===!1&&(dt(r.BLEND),A=!0),W!==AS){if(W!==M||Ae!==D){if((v!==Ls||U!==Ls)&&(r.blendEquation(r.FUNC_ADD),v=Ls,U=Ls),Ae)switch(W){case Gr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rv:r.blendFunc(r.ONE,r.ONE);break;case ov:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lv:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Gr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case rv:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case ov:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case lv:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}F=null,O=null,Q=null,X=null,z.set(0,0,0),J=0,M=W,D=Ae}return}wt=wt||Ct,Ut=Ut||ut,te=te||xt,(Ct!==v||wt!==U)&&(r.blendEquationSeparate(me[Ct],me[wt]),v=Ct,U=wt),(ut!==F||xt!==O||Ut!==Q||te!==X)&&(r.blendFuncSeparate(Qe[ut],Qe[xt],Qe[Ut],Qe[te]),F=ut,O=xt,Q=Ut,X=te),(Je.equals(z)===!1||gn!==J)&&(r.blendColor(Je.r,Je.g,Je.b,gn),z.copy(Je),J=gn),M=W,D=!1}function On(W,Ct){W.side===Ei?Rt(r.CULL_FACE):dt(r.CULL_FACE);let ut=W.side===$n;Ct&&(ut=!ut),de(ut),W.blending===Gr&&W.transparent===!1?G(Ja):G(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),h.setFunc(W.depthFunc),h.setTest(W.depthTest),h.setMask(W.depthWrite),c.setMask(W.colorWrite);const xt=W.stencilWrite;d.setTest(xt),xt&&(d.setMask(W.stencilWriteMask),d.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),d.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Oe(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?dt(r.SAMPLE_ALPHA_TO_COVERAGE):Rt(r.SAMPLE_ALPHA_TO_COVERAGE)}function de(W){C!==W&&(W?r.frontFace(r.CW):r.frontFace(r.CCW),C=W)}function ye(W){W!==bS?(dt(r.CULL_FACE),W!==k&&(W===sv?r.cullFace(r.BACK):W===TS?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Rt(r.CULL_FACE),k=W}function Yt(W){W!==ft&&(P&&r.lineWidth(W),ft=W)}function Oe(W,Ct,ut){W?(dt(r.POLYGON_OFFSET_FILL),(ct!==Ct||vt!==ut)&&(r.polygonOffset(Ct,ut),ct=Ct,vt=ut)):Rt(r.POLYGON_OFFSET_FILL)}function qt(W){W?dt(r.SCISSOR_TEST):Rt(r.SCISSOR_TEST)}function L(W){W===void 0&&(W=r.TEXTURE0+yt-1),Mt!==W&&(r.activeTexture(W),Mt=W)}function T(W,Ct,ut){ut===void 0&&(Mt===null?ut=r.TEXTURE0+yt-1:ut=Mt);let xt=Tt[ut];xt===void 0&&(xt={type:void 0,texture:void 0},Tt[ut]=xt),(xt.type!==W||xt.texture!==Ct)&&(Mt!==ut&&(r.activeTexture(ut),Mt=ut),r.bindTexture(W,Ct||st[W]),xt.type=W,xt.texture=Ct)}function it(){const W=Tt[Mt];W!==void 0&&W.type!==void 0&&(r.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function pt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function bt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Xt(){try{r.texSubImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Dt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ft(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function xe(){try{r.texStorage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ht(){try{r.texImage2D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function jt(){try{r.texImage3D.apply(r,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Wt(W){Et.equals(W)===!1&&(r.scissor(W.x,W.y,W.z,W.w),Et.copy(W))}function Pt(W){w.equals(W)===!1&&(r.viewport(W.x,W.y,W.z,W.w),w.copy(W))}function $t(W,Ct){let ut=m.get(Ct);ut===void 0&&(ut=new WeakMap,m.set(Ct,ut));let xt=ut.get(W);xt===void 0&&(xt=r.getUniformBlockIndex(Ct,W.name),ut.set(W,xt))}function oe(W,Ct){const xt=m.get(Ct).get(W);p.get(Ct)!==xt&&(r.uniformBlockBinding(Ct,xt,W.__bindingPointIndex),p.set(Ct,xt))}function Ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),h.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},Mt=null,Tt={},_={},x=new WeakMap,S=[],E=null,A=!1,M=null,v=null,F=null,O=null,U=null,Q=null,X=null,z=new he(0,0,0),J=0,D=!1,C=null,k=null,ft=null,ct=null,vt=null,Et.set(0,0,r.canvas.width,r.canvas.height),w.set(0,0,r.canvas.width,r.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:dt,disable:Rt,bindFramebuffer:Ot,drawBuffers:ie,useProgram:Be,setBlending:G,setMaterial:On,setFlipSided:de,setCullFace:ye,setLineWidth:Yt,setPolygonOffset:Oe,setScissorTest:qt,activeTexture:L,bindTexture:T,unbindTexture:it,compressedTexImage2D:pt,compressedTexImage3D:bt,texImage2D:Ht,texImage3D:jt,updateUBOMapping:$t,uniformBlockBinding:oe,texStorage2D:xe,texStorage3D:At,texSubImage2D:gt,texSubImage3D:Xt,compressedTexSubImage2D:Dt,compressedTexSubImage3D:Ft,scissor:Wt,viewport:Pt,reset:Ie}}function FA(r,t,i,s,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new re,g=new WeakMap;let _;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,T){return S?new OffscreenCanvas(L,T):eu("canvas")}function A(L,T,it){let pt=1;const bt=qt(L);if((bt.width>it||bt.height>it)&&(pt=it/Math.max(bt.width,bt.height)),pt<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const gt=Math.floor(pt*bt.width),Xt=Math.floor(pt*bt.height);_===void 0&&(_=E(gt,Xt));const Dt=T?E(gt,Xt):_;return Dt.width=gt,Dt.height=Xt,Dt.getContext("2d").drawImage(L,0,0,gt,Xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+bt.width+"x"+bt.height+") to ("+gt+"x"+Xt+")."),Dt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+bt.width+"x"+bt.height+")."),L;return L}function M(L){return L.generateMipmaps}function v(L){r.generateMipmap(L)}function F(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function O(L,T,it,pt,bt=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let gt=T;if(T===r.RED&&(it===r.FLOAT&&(gt=r.R32F),it===r.HALF_FLOAT&&(gt=r.R16F),it===r.UNSIGNED_BYTE&&(gt=r.R8)),T===r.RED_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.R8UI),it===r.UNSIGNED_SHORT&&(gt=r.R16UI),it===r.UNSIGNED_INT&&(gt=r.R32UI),it===r.BYTE&&(gt=r.R8I),it===r.SHORT&&(gt=r.R16I),it===r.INT&&(gt=r.R32I)),T===r.RG&&(it===r.FLOAT&&(gt=r.RG32F),it===r.HALF_FLOAT&&(gt=r.RG16F),it===r.UNSIGNED_BYTE&&(gt=r.RG8)),T===r.RG_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RG8UI),it===r.UNSIGNED_SHORT&&(gt=r.RG16UI),it===r.UNSIGNED_INT&&(gt=r.RG32UI),it===r.BYTE&&(gt=r.RG8I),it===r.SHORT&&(gt=r.RG16I),it===r.INT&&(gt=r.RG32I)),T===r.RGB_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),it===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),it===r.UNSIGNED_INT&&(gt=r.RGB32UI),it===r.BYTE&&(gt=r.RGB8I),it===r.SHORT&&(gt=r.RGB16I),it===r.INT&&(gt=r.RGB32I)),T===r.RGBA_INTEGER&&(it===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),it===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),it===r.UNSIGNED_INT&&(gt=r.RGBA32UI),it===r.BYTE&&(gt=r.RGBA8I),it===r.SHORT&&(gt=r.RGBA16I),it===r.INT&&(gt=r.RGBA32I)),T===r.RGB&&it===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),T===r.RGBA){const Xt=bt?$c:Ue.getTransfer(pt);it===r.FLOAT&&(gt=r.RGBA32F),it===r.HALF_FLOAT&&(gt=r.RGBA16F),it===r.UNSIGNED_BYTE&&(gt=Xt===Ve?r.SRGB8_ALPHA8:r.RGBA8),it===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),it===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function U(L,T){let it;return L?T===null||T===Bs||T===Yr?it=r.DEPTH24_STENCIL8:T===va?it=r.DEPTH32F_STENCIL8:T===al&&(it=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Bs||T===Yr?it=r.DEPTH_COMPONENT24:T===va?it=r.DEPTH_COMPONENT32F:T===al&&(it=r.DEPTH_COMPONENT16),it}function Q(L,T){return M(L)===!0||L.isFramebufferTexture&&L.minFilter!==zi&&L.minFilter!==Wi?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function X(L){const T=L.target;T.removeEventListener("dispose",X),J(T),T.isVideoTexture&&g.delete(T)}function z(L){const T=L.target;T.removeEventListener("dispose",z),C(T)}function J(L){const T=s.get(L);if(T.__webglInit===void 0)return;const it=L.source,pt=x.get(it);if(pt){const bt=pt[T.__cacheKey];bt.usedTimes--,bt.usedTimes===0&&D(L),Object.keys(pt).length===0&&x.delete(it)}s.remove(L)}function D(L){const T=s.get(L);r.deleteTexture(T.__webglTexture);const it=L.source,pt=x.get(it);delete pt[T.__cacheKey],h.memory.textures--}function C(L){const T=s.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),s.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(T.__webglFramebuffer[pt]))for(let bt=0;bt<T.__webglFramebuffer[pt].length;bt++)r.deleteFramebuffer(T.__webglFramebuffer[pt][bt]);else r.deleteFramebuffer(T.__webglFramebuffer[pt]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[pt])}else{if(Array.isArray(T.__webglFramebuffer))for(let pt=0;pt<T.__webglFramebuffer.length;pt++)r.deleteFramebuffer(T.__webglFramebuffer[pt]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let pt=0;pt<T.__webglColorRenderbuffer.length;pt++)T.__webglColorRenderbuffer[pt]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[pt]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const it=L.textures;for(let pt=0,bt=it.length;pt<bt;pt++){const gt=s.get(it[pt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),h.memory.textures--),s.remove(it[pt])}s.remove(L)}let k=0;function ft(){k=0}function ct(){const L=k;return L>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l.maxTextures),k+=1,L}function vt(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function yt(L,T){const it=s.get(L);if(L.isVideoTexture&&Yt(L),L.isRenderTargetTexture===!1&&L.version>0&&it.__version!==L.version){const pt=L.image;if(pt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{w(it,L,T);return}}i.bindTexture(r.TEXTURE_2D,it.__webglTexture,r.TEXTURE0+T)}function P(L,T){const it=s.get(L);if(L.version>0&&it.__version!==L.version){w(it,L,T);return}i.bindTexture(r.TEXTURE_2D_ARRAY,it.__webglTexture,r.TEXTURE0+T)}function Z(L,T){const it=s.get(L);if(L.version>0&&it.__version!==L.version){w(it,L,T);return}i.bindTexture(r.TEXTURE_3D,it.__webglTexture,r.TEXTURE0+T)}function K(L,T){const it=s.get(L);if(L.version>0&&it.__version!==L.version){H(it,L,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,it.__webglTexture,r.TEXTURE0+T)}const Mt={[Md]:r.REPEAT,[Ps]:r.CLAMP_TO_EDGE,[Ed]:r.MIRRORED_REPEAT},Tt={[zi]:r.NEAREST,[$S]:r.NEAREST_MIPMAP_NEAREST,[yc]:r.NEAREST_MIPMAP_LINEAR,[Wi]:r.LINEAR,[Mh]:r.LINEAR_MIPMAP_NEAREST,[zs]:r.LINEAR_MIPMAP_LINEAR},N={[iM]:r.NEVER,[cM]:r.ALWAYS,[aM]:r.LESS,[B0]:r.LEQUAL,[sM]:r.EQUAL,[lM]:r.GEQUAL,[rM]:r.GREATER,[oM]:r.NOTEQUAL};function et(L,T){if(T.type===va&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Wi||T.magFilter===Mh||T.magFilter===yc||T.magFilter===zs||T.minFilter===Wi||T.minFilter===Mh||T.minFilter===yc||T.minFilter===zs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,Mt[T.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,Mt[T.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,Mt[T.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,Tt[T.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,Tt[T.minFilter]),T.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,N[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===zi||T.minFilter!==yc&&T.minFilter!==zs||T.type===va&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function Et(L,T){let it=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",X));const pt=T.source;let bt=x.get(pt);bt===void 0&&(bt={},x.set(pt,bt));const gt=vt(T);if(gt!==L.__cacheKey){bt[gt]===void 0&&(bt[gt]={texture:r.createTexture(),usedTimes:0},h.memory.textures++,it=!0),bt[gt].usedTimes++;const Xt=bt[L.__cacheKey];Xt!==void 0&&(bt[L.__cacheKey].usedTimes--,Xt.usedTimes===0&&D(T)),L.__cacheKey=gt,L.__webglTexture=bt[gt].texture}return it}function w(L,T,it){let pt=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(pt=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(pt=r.TEXTURE_3D);const bt=Et(L,T),gt=T.source;i.bindTexture(pt,L.__webglTexture,r.TEXTURE0+it);const Xt=s.get(gt);if(gt.version!==Xt.__version||bt===!0){i.activeTexture(r.TEXTURE0+it);const Dt=Ue.getPrimaries(Ue.workingColorSpace),Ft=T.colorSpace===Qa?null:Ue.getPrimaries(T.colorSpace),xe=T.colorSpace===Qa||Dt===Ft?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let At=A(T.image,!1,l.maxTextureSize);At=Oe(T,At);const Ht=c.convert(T.format,T.colorSpace),jt=c.convert(T.type);let Wt=O(T.internalFormat,Ht,jt,T.colorSpace,T.isVideoTexture);et(pt,T);let Pt;const $t=T.mipmaps,oe=T.isVideoTexture!==!0,Ie=Xt.__version===void 0||bt===!0,W=gt.dataReady,Ct=Q(T,At);if(T.isDepthTexture)Wt=U(T.format===jr,T.type),Ie&&(oe?i.texStorage2D(r.TEXTURE_2D,1,Wt,At.width,At.height):i.texImage2D(r.TEXTURE_2D,0,Wt,At.width,At.height,0,Ht,jt,null));else if(T.isDataTexture)if($t.length>0){oe&&Ie&&i.texStorage2D(r.TEXTURE_2D,Ct,Wt,$t[0].width,$t[0].height);for(let ut=0,xt=$t.length;ut<xt;ut++)Pt=$t[ut],oe?W&&i.texSubImage2D(r.TEXTURE_2D,ut,0,0,Pt.width,Pt.height,Ht,jt,Pt.data):i.texImage2D(r.TEXTURE_2D,ut,Wt,Pt.width,Pt.height,0,Ht,jt,Pt.data);T.generateMipmaps=!1}else oe?(Ie&&i.texStorage2D(r.TEXTURE_2D,Ct,Wt,At.width,At.height),W&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Ht,jt,At.data)):i.texImage2D(r.TEXTURE_2D,0,Wt,At.width,At.height,0,Ht,jt,At.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){oe&&Ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ct,Wt,$t[0].width,$t[0].height,At.depth);for(let ut=0,xt=$t.length;ut<xt;ut++)if(Pt=$t[ut],T.format!==Pi)if(Ht!==null)if(oe){if(W)if(T.layerUpdates.size>0){const wt=Fv(Pt.width,Pt.height,T.format,T.type);for(const Ut of T.layerUpdates){const te=Pt.data.subarray(Ut*wt/Pt.data.BYTES_PER_ELEMENT,(Ut+1)*wt/Pt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ut,0,0,Ut,Pt.width,Pt.height,1,Ht,te)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ut,0,0,0,Pt.width,Pt.height,At.depth,Ht,Pt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ut,Wt,Pt.width,Pt.height,At.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?W&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,ut,0,0,0,Pt.width,Pt.height,At.depth,Ht,jt,Pt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,ut,Wt,Pt.width,Pt.height,At.depth,0,Ht,jt,Pt.data)}else{oe&&Ie&&i.texStorage2D(r.TEXTURE_2D,Ct,Wt,$t[0].width,$t[0].height);for(let ut=0,xt=$t.length;ut<xt;ut++)Pt=$t[ut],T.format!==Pi?Ht!==null?oe?W&&i.compressedTexSubImage2D(r.TEXTURE_2D,ut,0,0,Pt.width,Pt.height,Ht,Pt.data):i.compressedTexImage2D(r.TEXTURE_2D,ut,Wt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?W&&i.texSubImage2D(r.TEXTURE_2D,ut,0,0,Pt.width,Pt.height,Ht,jt,Pt.data):i.texImage2D(r.TEXTURE_2D,ut,Wt,Pt.width,Pt.height,0,Ht,jt,Pt.data)}else if(T.isDataArrayTexture)if(oe){if(Ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ct,Wt,At.width,At.height,At.depth),W)if(T.layerUpdates.size>0){const ut=Fv(At.width,At.height,T.format,T.type);for(const xt of T.layerUpdates){const wt=At.data.subarray(xt*ut/At.data.BYTES_PER_ELEMENT,(xt+1)*ut/At.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,xt,At.width,At.height,1,Ht,jt,wt)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Ht,jt,At.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Wt,At.width,At.height,At.depth,0,Ht,jt,At.data);else if(T.isData3DTexture)oe?(Ie&&i.texStorage3D(r.TEXTURE_3D,Ct,Wt,At.width,At.height,At.depth),W&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Ht,jt,At.data)):i.texImage3D(r.TEXTURE_3D,0,Wt,At.width,At.height,At.depth,0,Ht,jt,At.data);else if(T.isFramebufferTexture){if(Ie)if(oe)i.texStorage2D(r.TEXTURE_2D,Ct,Wt,At.width,At.height);else{let ut=At.width,xt=At.height;for(let wt=0;wt<Ct;wt++)i.texImage2D(r.TEXTURE_2D,wt,Wt,ut,xt,0,Ht,jt,null),ut>>=1,xt>>=1}}else if($t.length>0){if(oe&&Ie){const ut=qt($t[0]);i.texStorage2D(r.TEXTURE_2D,Ct,Wt,ut.width,ut.height)}for(let ut=0,xt=$t.length;ut<xt;ut++)Pt=$t[ut],oe?W&&i.texSubImage2D(r.TEXTURE_2D,ut,0,0,Ht,jt,Pt):i.texImage2D(r.TEXTURE_2D,ut,Wt,Ht,jt,Pt);T.generateMipmaps=!1}else if(oe){if(Ie){const ut=qt(At);i.texStorage2D(r.TEXTURE_2D,Ct,Wt,ut.width,ut.height)}W&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Ht,jt,At)}else i.texImage2D(r.TEXTURE_2D,0,Wt,Ht,jt,At);M(T)&&v(pt),Xt.__version=gt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function H(L,T,it){if(T.image.length!==6)return;const pt=Et(L,T),bt=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+it);const gt=s.get(bt);if(bt.version!==gt.__version||pt===!0){i.activeTexture(r.TEXTURE0+it);const Xt=Ue.getPrimaries(Ue.workingColorSpace),Dt=T.colorSpace===Qa?null:Ue.getPrimaries(T.colorSpace),Ft=T.colorSpace===Qa||Xt===Dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);const xe=T.isCompressedTexture||T.image[0].isCompressedTexture,At=T.image[0]&&T.image[0].isDataTexture,Ht=[];for(let xt=0;xt<6;xt++)!xe&&!At?Ht[xt]=A(T.image[xt],!0,l.maxCubemapSize):Ht[xt]=At?T.image[xt].image:T.image[xt],Ht[xt]=Oe(T,Ht[xt]);const jt=Ht[0],Wt=c.convert(T.format,T.colorSpace),Pt=c.convert(T.type),$t=O(T.internalFormat,Wt,Pt,T.colorSpace),oe=T.isVideoTexture!==!0,Ie=gt.__version===void 0||pt===!0,W=bt.dataReady;let Ct=Q(T,jt);et(r.TEXTURE_CUBE_MAP,T);let ut;if(xe){oe&&Ie&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,$t,jt.width,jt.height);for(let xt=0;xt<6;xt++){ut=Ht[xt].mipmaps;for(let wt=0;wt<ut.length;wt++){const Ut=ut[wt];T.format!==Pi?Wt!==null?oe?W&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt,0,0,Ut.width,Ut.height,Wt,Ut.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt,$t,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt,0,0,Ut.width,Ut.height,Wt,Pt,Ut.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt,$t,Ut.width,Ut.height,0,Wt,Pt,Ut.data)}}}else{if(ut=T.mipmaps,oe&&Ie){ut.length>0&&Ct++;const xt=qt(Ht[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,$t,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(At){oe?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Ht[xt].width,Ht[xt].height,Wt,Pt,Ht[xt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,$t,Ht[xt].width,Ht[xt].height,0,Wt,Pt,Ht[xt].data);for(let wt=0;wt<ut.length;wt++){const te=ut[wt].image[xt].image;oe?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt+1,0,0,te.width,te.height,Wt,Pt,te.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt+1,$t,te.width,te.height,0,Wt,Pt,te.data)}}else{oe?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Wt,Pt,Ht[xt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,$t,Wt,Pt,Ht[xt]);for(let wt=0;wt<ut.length;wt++){const Ut=ut[wt];oe?W&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt+1,0,0,Wt,Pt,Ut.image[xt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,wt+1,$t,Wt,Pt,Ut.image[xt])}}}M(T)&&v(r.TEXTURE_CUBE_MAP),gt.__version=bt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function st(L,T,it,pt,bt,gt){const Xt=c.convert(it.format,it.colorSpace),Dt=c.convert(it.type),Ft=O(it.internalFormat,Xt,Dt,it.colorSpace),xe=s.get(T),At=s.get(it);if(At.__renderTarget=T,!xe.__hasExternalTextures){const Ht=Math.max(1,T.width>>gt),jt=Math.max(1,T.height>>gt);bt===r.TEXTURE_3D||bt===r.TEXTURE_2D_ARRAY?i.texImage3D(bt,gt,Ft,Ht,jt,T.depth,0,Xt,Dt,null):i.texImage2D(bt,gt,Ft,Ht,jt,0,Xt,Dt,null)}i.bindFramebuffer(r.FRAMEBUFFER,L),ye(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pt,bt,At.__webglTexture,0,de(T)):(bt===r.TEXTURE_2D||bt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&bt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,pt,bt,At.__webglTexture,gt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function dt(L,T,it){if(r.bindRenderbuffer(r.RENDERBUFFER,L),T.depthBuffer){const pt=T.depthTexture,bt=pt&&pt.isDepthTexture?pt.type:null,gt=U(T.stencilBuffer,bt),Xt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Dt=de(T);ye(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Dt,gt,T.width,T.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,gt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,gt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Xt,r.RENDERBUFFER,L)}else{const pt=T.textures;for(let bt=0;bt<pt.length;bt++){const gt=pt[bt],Xt=c.convert(gt.format,gt.colorSpace),Dt=c.convert(gt.type),Ft=O(gt.internalFormat,Xt,Dt,gt.colorSpace),xe=de(T);it&&ye(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,xe,Ft,T.width,T.height):ye(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xe,Ft,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Ft,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Rt(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const pt=s.get(T.depthTexture);pt.__renderTarget=T,(!pt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),yt(T.depthTexture,0);const bt=pt.__webglTexture,gt=de(T);if(T.depthTexture.format===Vr)ye(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,bt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,bt,0);else if(T.depthTexture.format===jr)ye(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,bt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,bt,0);else throw new Error("Unknown depthTexture format")}function Ot(L){const T=s.get(L),it=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const pt=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),pt){const bt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,pt.removeEventListener("dispose",bt)};pt.addEventListener("dispose",bt),T.__depthDisposeCallback=bt}T.__boundDepthTexture=pt}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");Rt(T.__webglFramebuffer,L)}else if(it){T.__webglDepthbuffer=[];for(let pt=0;pt<6;pt++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[pt]),T.__webglDepthbuffer[pt]===void 0)T.__webglDepthbuffer[pt]=r.createRenderbuffer(),dt(T.__webglDepthbuffer[pt],L,!1);else{const bt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=T.__webglDepthbuffer[pt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,bt,r.RENDERBUFFER,gt)}}else if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),dt(T.__webglDepthbuffer,L,!1);else{const pt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,bt),r.framebufferRenderbuffer(r.FRAMEBUFFER,pt,r.RENDERBUFFER,bt)}i.bindFramebuffer(r.FRAMEBUFFER,null)}function ie(L,T,it){const pt=s.get(L);T!==void 0&&st(pt.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),it!==void 0&&Ot(L)}function Be(L){const T=L.texture,it=s.get(L),pt=s.get(T);L.addEventListener("dispose",z);const bt=L.textures,gt=L.isWebGLCubeRenderTarget===!0,Xt=bt.length>1;if(Xt||(pt.__webglTexture===void 0&&(pt.__webglTexture=r.createTexture()),pt.__version=T.version,h.memory.textures++),gt){it.__webglFramebuffer=[];for(let Dt=0;Dt<6;Dt++)if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer[Dt]=[];for(let Ft=0;Ft<T.mipmaps.length;Ft++)it.__webglFramebuffer[Dt][Ft]=r.createFramebuffer()}else it.__webglFramebuffer[Dt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer=[];for(let Dt=0;Dt<T.mipmaps.length;Dt++)it.__webglFramebuffer[Dt]=r.createFramebuffer()}else it.__webglFramebuffer=r.createFramebuffer();if(Xt)for(let Dt=0,Ft=bt.length;Dt<Ft;Dt++){const xe=s.get(bt[Dt]);xe.__webglTexture===void 0&&(xe.__webglTexture=r.createTexture(),h.memory.textures++)}if(L.samples>0&&ye(L)===!1){it.__webglMultisampledFramebuffer=r.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let Dt=0;Dt<bt.length;Dt++){const Ft=bt[Dt];it.__webglColorRenderbuffer[Dt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,it.__webglColorRenderbuffer[Dt]);const xe=c.convert(Ft.format,Ft.colorSpace),At=c.convert(Ft.type),Ht=O(Ft.internalFormat,xe,At,Ft.colorSpace,L.isXRRenderTarget===!0),jt=de(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,jt,Ht,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Dt,r.RENDERBUFFER,it.__webglColorRenderbuffer[Dt])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(it.__webglDepthRenderbuffer=r.createRenderbuffer(),dt(it.__webglDepthRenderbuffer,L,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){i.bindTexture(r.TEXTURE_CUBE_MAP,pt.__webglTexture),et(r.TEXTURE_CUBE_MAP,T);for(let Dt=0;Dt<6;Dt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ft=0;Ft<T.mipmaps.length;Ft++)st(it.__webglFramebuffer[Dt][Ft],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,Ft);else st(it.__webglFramebuffer[Dt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Dt,0);M(T)&&v(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Xt){for(let Dt=0,Ft=bt.length;Dt<Ft;Dt++){const xe=bt[Dt],At=s.get(xe);i.bindTexture(r.TEXTURE_2D,At.__webglTexture),et(r.TEXTURE_2D,xe),st(it.__webglFramebuffer,L,xe,r.COLOR_ATTACHMENT0+Dt,r.TEXTURE_2D,0),M(xe)&&v(r.TEXTURE_2D)}i.unbindTexture()}else{let Dt=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Dt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Dt,pt.__webglTexture),et(Dt,T),T.mipmaps&&T.mipmaps.length>0)for(let Ft=0;Ft<T.mipmaps.length;Ft++)st(it.__webglFramebuffer[Ft],L,T,r.COLOR_ATTACHMENT0,Dt,Ft);else st(it.__webglFramebuffer,L,T,r.COLOR_ATTACHMENT0,Dt,0);M(T)&&v(Dt),i.unbindTexture()}L.depthBuffer&&Ot(L)}function me(L){const T=L.textures;for(let it=0,pt=T.length;it<pt;it++){const bt=T[it];if(M(bt)){const gt=F(L),Xt=s.get(bt).__webglTexture;i.bindTexture(gt,Xt),v(gt),i.unbindTexture()}}}const Qe=[],G=[];function On(L){if(L.samples>0){if(ye(L)===!1){const T=L.textures,it=L.width,pt=L.height;let bt=r.COLOR_BUFFER_BIT;const gt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Xt=s.get(L),Dt=T.length>1;if(Dt)for(let Ft=0;Ft<T.length;Ft++)i.bindFramebuffer(r.FRAMEBUFFER,Xt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Xt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Xt.__webglMultisampledFramebuffer),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Xt.__webglFramebuffer);for(let Ft=0;Ft<T.length;Ft++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(bt|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(bt|=r.STENCIL_BUFFER_BIT)),Dt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Xt.__webglColorRenderbuffer[Ft]);const xe=s.get(T[Ft]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,xe,0)}r.blitFramebuffer(0,0,it,pt,0,0,it,pt,bt,r.NEAREST),p===!0&&(Qe.length=0,G.length=0,Qe.push(r.COLOR_ATTACHMENT0+Ft),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Qe.push(gt),G.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,G)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qe))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Dt)for(let Ft=0;Ft<T.length;Ft++){i.bindFramebuffer(r.FRAMEBUFFER,Xt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.RENDERBUFFER,Xt.__webglColorRenderbuffer[Ft]);const xe=s.get(T[Ft]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Xt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ft,r.TEXTURE_2D,xe,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Xt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&p){const T=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function de(L){return Math.min(l.maxSamples,L.samples)}function ye(L){const T=s.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Yt(L){const T=h.render.frame;g.get(L)!==T&&(g.set(L,T),L.update())}function Oe(L,T){const it=L.colorSpace,pt=L.format,bt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||it!==Zr&&it!==Qa&&(Ue.getTransfer(it)===Ve?(pt!==Pi||bt!==Sa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),T}function qt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(m.width=L.naturalWidth||L.width,m.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(m.width=L.displayWidth,m.height=L.displayHeight):(m.width=L.width,m.height=L.height),m}this.allocateTextureUnit=ct,this.resetTextureUnits=ft,this.setTexture2D=yt,this.setTexture2DArray=P,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=ie,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=On,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=st,this.useMultisampledRTT=ye}function HA(r,t){function i(s,l=Qa){let c;const h=Ue.getTransfer(l);if(s===Sa)return r.UNSIGNED_BYTE;if(s===ap)return r.UNSIGNED_SHORT_4_4_4_4;if(s===sp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===C0)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===A0)return r.BYTE;if(s===R0)return r.SHORT;if(s===al)return r.UNSIGNED_SHORT;if(s===ip)return r.INT;if(s===Bs)return r.UNSIGNED_INT;if(s===va)return r.FLOAT;if(s===rl)return r.HALF_FLOAT;if(s===w0)return r.ALPHA;if(s===D0)return r.RGB;if(s===Pi)return r.RGBA;if(s===U0)return r.LUMINANCE;if(s===L0)return r.LUMINANCE_ALPHA;if(s===Vr)return r.DEPTH_COMPONENT;if(s===jr)return r.DEPTH_STENCIL;if(s===N0)return r.RED;if(s===rp)return r.RED_INTEGER;if(s===O0)return r.RG;if(s===op)return r.RG_INTEGER;if(s===lp)return r.RGBA_INTEGER;if(s===qc||s===Yc||s===jc||s===Zc)if(h===Ve)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===qc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Yc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Zc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===qc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Yc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===jc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Zc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===bd||s===Td||s===Ad||s===Rd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===bd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Td)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ad)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Rd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Cd||s===wd||s===Dd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Cd||s===wd)return h===Ve?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Dd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ud||s===Ld||s===Nd||s===Od||s===Pd||s===zd||s===Bd||s===Id||s===Fd||s===Hd||s===Gd||s===Vd||s===kd||s===Xd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Ud)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ld)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Nd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Od)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===zd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Bd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Id)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Hd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Gd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===kd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Kc||s===Wd||s===qd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Kc)return h===Ve?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===P0||s===Yd||s===jd||s===Zd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Kc)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Yd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Yr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const GA={type:"move"};class Jh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const d=this._targetRay,p=this._grip,m=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(m&&t.hand){h=!0;for(const A of t.hand.values()){const M=i.getJointPose(A,s),v=this._getHandJoint(m,A);M!==null&&(v.matrix.fromArray(M.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=M.radius),v.visible=M!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=g.position.distanceTo(_.position),S=.02,E=.005;m.inputState.pinching&&x>S+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&x<=S-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(GA)))}return d!==null&&(d.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new Fc;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const VA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kA=`
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

}`;class XA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new ti,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new es({vertexShader:VA,fragmentShader:kA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Jn(new ll(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class WA extends Fs{constructor(t,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",p=1,m=null,g=null,_=null,x=null,S=null,E=null;const A=new XA,M=i.getContextAttributes();let v=null,F=null;const O=[],U=[],Q=new re;let X=null;const z=new Mi;z.viewport=new rn;const J=new Mi;J.viewport=new rn;const D=[z,J],C=new lE;let k=null,ft=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(w){let H=O[w];return H===void 0&&(H=new Jh,O[w]=H),H.getTargetRaySpace()},this.getControllerGrip=function(w){let H=O[w];return H===void 0&&(H=new Jh,O[w]=H),H.getGripSpace()},this.getHand=function(w){let H=O[w];return H===void 0&&(H=new Jh,O[w]=H),H.getHandSpace()};function ct(w){const H=U.indexOf(w.inputSource);if(H===-1)return;const st=O[H];st!==void 0&&(st.update(w.inputSource,w.frame,m||h),st.dispatchEvent({type:w.type,data:w.inputSource}))}function vt(){l.removeEventListener("select",ct),l.removeEventListener("selectstart",ct),l.removeEventListener("selectend",ct),l.removeEventListener("squeeze",ct),l.removeEventListener("squeezestart",ct),l.removeEventListener("squeezeend",ct),l.removeEventListener("end",vt),l.removeEventListener("inputsourceschange",yt);for(let w=0;w<O.length;w++){const H=U[w];H!==null&&(U[w]=null,O[w].disconnect(H))}k=null,ft=null,A.reset(),t.setRenderTarget(v),S=null,x=null,_=null,l=null,F=null,Et.stop(),s.isPresenting=!1,t.setPixelRatio(X),t.setSize(Q.width,Q.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(w){c=w,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(w){d=w,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||h},this.setReferenceSpace=function(w){m=w},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(w){if(l=w,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",ct),l.addEventListener("selectstart",ct),l.addEventListener("selectend",ct),l.addEventListener("squeeze",ct),l.addEventListener("squeezestart",ct),l.addEventListener("squeezeend",ct),l.addEventListener("end",vt),l.addEventListener("inputsourceschange",yt),M.xrCompatible!==!0&&await i.makeXRCompatible(),X=t.getPixelRatio(),t.getSize(Q),l.renderState.layers===void 0){const H={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,H),l.updateRenderState({baseLayer:S}),t.setPixelRatio(1),t.setSize(S.framebufferWidth,S.framebufferHeight,!1),F=new Is(S.framebufferWidth,S.framebufferHeight,{format:Pi,type:Sa,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil})}else{let H=null,st=null,dt=null;M.depth&&(dt=M.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,H=M.stencil?jr:Vr,st=M.stencil?Yr:Bs);const Rt={colorFormat:i.RGBA8,depthFormat:dt,scaleFactor:c};_=new XRWebGLBinding(l,i),x=_.createProjectionLayer(Rt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),F=new Is(x.textureWidth,x.textureHeight,{format:Pi,type:Sa,depthTexture:new Z0(x.textureWidth,x.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}F.isXRRenderTarget=!0,this.setFoveation(p),m=null,h=await l.requestReferenceSpace(d),Et.setContext(l),Et.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function yt(w){for(let H=0;H<w.removed.length;H++){const st=w.removed[H],dt=U.indexOf(st);dt>=0&&(U[dt]=null,O[dt].disconnect(st))}for(let H=0;H<w.added.length;H++){const st=w.added[H];let dt=U.indexOf(st);if(dt===-1){for(let Ot=0;Ot<O.length;Ot++)if(Ot>=U.length){U.push(st),dt=Ot;break}else if(U[Ot]===null){U[Ot]=st,dt=Ot;break}if(dt===-1)break}const Rt=O[dt];Rt&&Rt.connect(st)}}const P=new I,Z=new I;function K(w,H,st){P.setFromMatrixPosition(H.matrixWorld),Z.setFromMatrixPosition(st.matrixWorld);const dt=P.distanceTo(Z),Rt=H.projectionMatrix.elements,Ot=st.projectionMatrix.elements,ie=Rt[14]/(Rt[10]-1),Be=Rt[14]/(Rt[10]+1),me=(Rt[9]+1)/Rt[5],Qe=(Rt[9]-1)/Rt[5],G=(Rt[8]-1)/Rt[0],On=(Ot[8]+1)/Ot[0],de=ie*G,ye=ie*On,Yt=dt/(-G+On),Oe=Yt*-G;if(H.matrixWorld.decompose(w.position,w.quaternion,w.scale),w.translateX(Oe),w.translateZ(Yt),w.matrixWorld.compose(w.position,w.quaternion,w.scale),w.matrixWorldInverse.copy(w.matrixWorld).invert(),Rt[10]===-1)w.projectionMatrix.copy(H.projectionMatrix),w.projectionMatrixInverse.copy(H.projectionMatrixInverse);else{const qt=ie+Yt,L=Be+Yt,T=de-Oe,it=ye+(dt-Oe),pt=me*Be/L*qt,bt=Qe*Be/L*qt;w.projectionMatrix.makePerspective(T,it,pt,bt,qt,L),w.projectionMatrixInverse.copy(w.projectionMatrix).invert()}}function Mt(w,H){H===null?w.matrixWorld.copy(w.matrix):w.matrixWorld.multiplyMatrices(H.matrixWorld,w.matrix),w.matrixWorldInverse.copy(w.matrixWorld).invert()}this.updateCamera=function(w){if(l===null)return;let H=w.near,st=w.far;A.texture!==null&&(A.depthNear>0&&(H=A.depthNear),A.depthFar>0&&(st=A.depthFar)),C.near=J.near=z.near=H,C.far=J.far=z.far=st,(k!==C.near||ft!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),k=C.near,ft=C.far),z.layers.mask=w.layers.mask|2,J.layers.mask=w.layers.mask|4,C.layers.mask=z.layers.mask|J.layers.mask;const dt=w.parent,Rt=C.cameras;Mt(C,dt);for(let Ot=0;Ot<Rt.length;Ot++)Mt(Rt[Ot],dt);Rt.length===2?K(C,z,J):C.projectionMatrix.copy(z.projectionMatrix),Tt(w,C,dt)};function Tt(w,H,st){st===null?w.matrix.copy(H.matrixWorld):(w.matrix.copy(st.matrixWorld),w.matrix.invert(),w.matrix.multiply(H.matrixWorld)),w.matrix.decompose(w.position,w.quaternion,w.scale),w.updateMatrixWorld(!0),w.projectionMatrix.copy(H.projectionMatrix),w.projectionMatrixInverse.copy(H.projectionMatrixInverse),w.isPerspectiveCamera&&(w.fov=sl*2*Math.atan(1/w.projectionMatrix.elements[5]),w.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(x===null&&S===null))return p},this.setFoveation=function(w){p=w,x!==null&&(x.fixedFoveation=w),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=w)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(C)};let N=null;function et(w,H){if(g=H.getViewerPose(m||h),E=H,g!==null){const st=g.views;S!==null&&(t.setRenderTargetFramebuffer(F,S.framebuffer),t.setRenderTarget(F));let dt=!1;st.length!==C.cameras.length&&(C.cameras.length=0,dt=!0);for(let Ot=0;Ot<st.length;Ot++){const ie=st[Ot];let Be=null;if(S!==null)Be=S.getViewport(ie);else{const Qe=_.getViewSubImage(x,ie);Be=Qe.viewport,Ot===0&&(t.setRenderTargetTextures(F,Qe.colorTexture,x.ignoreDepthValues?void 0:Qe.depthStencilTexture),t.setRenderTarget(F))}let me=D[Ot];me===void 0&&(me=new Mi,me.layers.enable(Ot),me.viewport=new rn,D[Ot]=me),me.matrix.fromArray(ie.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(ie.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Be.x,Be.y,Be.width,Be.height),Ot===0&&(C.matrix.copy(me.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),dt===!0&&C.cameras.push(me)}const Rt=l.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Ot=_.getDepthInformation(st[0]);Ot&&Ot.isValid&&Ot.texture&&A.init(t,Ot,l.renderState)}}for(let st=0;st<O.length;st++){const dt=U[st],Rt=O[st];dt!==null&&Rt!==void 0&&Rt.update(dt,H,m||h)}N&&N(w,H),H.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:H}),E=null}const Et=new J0;Et.setAnimationLoop(et),this.setAnimationLoop=function(w){N=w},this.dispose=function(){}}}const Rs=new qi,qA=new Xe;function YA(r,t){function i(M,v){M.matrixAutoUpdate===!0&&M.updateMatrix(),v.value.copy(M.matrix)}function s(M,v){v.color.getRGB(M.fogColor.value,X0(r)),v.isFog?(M.fogNear.value=v.near,M.fogFar.value=v.far):v.isFogExp2&&(M.fogDensity.value=v.density)}function l(M,v,F,O,U){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(M,v):v.isMeshToonMaterial?(c(M,v),_(M,v)):v.isMeshPhongMaterial?(c(M,v),g(M,v)):v.isMeshStandardMaterial?(c(M,v),x(M,v),v.isMeshPhysicalMaterial&&S(M,v,U)):v.isMeshMatcapMaterial?(c(M,v),E(M,v)):v.isMeshDepthMaterial?c(M,v):v.isMeshDistanceMaterial?(c(M,v),A(M,v)):v.isMeshNormalMaterial?c(M,v):v.isLineBasicMaterial?(h(M,v),v.isLineDashedMaterial&&d(M,v)):v.isPointsMaterial?p(M,v,F,O):v.isSpriteMaterial?m(M,v):v.isShadowMaterial?(M.color.value.copy(v.color),M.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(M,v){M.opacity.value=v.opacity,v.color&&M.diffuse.value.copy(v.color),v.emissive&&M.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(M.map.value=v.map,i(v.map,M.mapTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,i(v.alphaMap,M.alphaMapTransform)),v.bumpMap&&(M.bumpMap.value=v.bumpMap,i(v.bumpMap,M.bumpMapTransform),M.bumpScale.value=v.bumpScale,v.side===$n&&(M.bumpScale.value*=-1)),v.normalMap&&(M.normalMap.value=v.normalMap,i(v.normalMap,M.normalMapTransform),M.normalScale.value.copy(v.normalScale),v.side===$n&&M.normalScale.value.negate()),v.displacementMap&&(M.displacementMap.value=v.displacementMap,i(v.displacementMap,M.displacementMapTransform),M.displacementScale.value=v.displacementScale,M.displacementBias.value=v.displacementBias),v.emissiveMap&&(M.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,M.emissiveMapTransform)),v.specularMap&&(M.specularMap.value=v.specularMap,i(v.specularMap,M.specularMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest);const F=t.get(v),O=F.envMap,U=F.envMapRotation;O&&(M.envMap.value=O,Rs.copy(U),Rs.x*=-1,Rs.y*=-1,Rs.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Rs.y*=-1,Rs.z*=-1),M.envMapRotation.value.setFromMatrix4(qA.makeRotationFromEuler(Rs)),M.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=v.reflectivity,M.ior.value=v.ior,M.refractionRatio.value=v.refractionRatio),v.lightMap&&(M.lightMap.value=v.lightMap,M.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,M.lightMapTransform)),v.aoMap&&(M.aoMap.value=v.aoMap,M.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,M.aoMapTransform))}function h(M,v){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,v.map&&(M.map.value=v.map,i(v.map,M.mapTransform))}function d(M,v){M.dashSize.value=v.dashSize,M.totalSize.value=v.dashSize+v.gapSize,M.scale.value=v.scale}function p(M,v,F,O){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,M.size.value=v.size*F,M.scale.value=O*.5,v.map&&(M.map.value=v.map,i(v.map,M.uvTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,i(v.alphaMap,M.alphaMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest)}function m(M,v){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,M.rotation.value=v.rotation,v.map&&(M.map.value=v.map,i(v.map,M.mapTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,i(v.alphaMap,M.alphaMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest)}function g(M,v){M.specular.value.copy(v.specular),M.shininess.value=Math.max(v.shininess,1e-4)}function _(M,v){v.gradientMap&&(M.gradientMap.value=v.gradientMap)}function x(M,v){M.metalness.value=v.metalness,v.metalnessMap&&(M.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,M.metalnessMapTransform)),M.roughness.value=v.roughness,v.roughnessMap&&(M.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,M.roughnessMapTransform)),v.envMap&&(M.envMapIntensity.value=v.envMapIntensity)}function S(M,v,F){M.ior.value=v.ior,v.sheen>0&&(M.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),M.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(M.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,M.sheenColorMapTransform)),v.sheenRoughnessMap&&(M.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,M.sheenRoughnessMapTransform))),v.clearcoat>0&&(M.clearcoat.value=v.clearcoat,M.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(M.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,M.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(M.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===$n&&M.clearcoatNormalScale.value.negate())),v.dispersion>0&&(M.dispersion.value=v.dispersion),v.iridescence>0&&(M.iridescence.value=v.iridescence,M.iridescenceIOR.value=v.iridescenceIOR,M.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(M.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,M.iridescenceMapTransform)),v.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),v.transmission>0&&(M.transmission.value=v.transmission,M.transmissionSamplerMap.value=F.texture,M.transmissionSamplerSize.value.set(F.width,F.height),v.transmissionMap&&(M.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,M.transmissionMapTransform)),M.thickness.value=v.thickness,v.thicknessMap&&(M.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=v.attenuationDistance,M.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(M.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(M.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=v.specularIntensity,M.specularColor.value.copy(v.specularColor),v.specularColorMap&&(M.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,M.specularColorMapTransform)),v.specularIntensityMap&&(M.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,v){v.matcap&&(M.matcap.value=v.matcap)}function A(M,v){const F=t.get(v).light;M.referencePosition.value.setFromMatrixPosition(F.matrixWorld),M.nearDistance.value=F.shadow.camera.near,M.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function jA(r,t,i,s){let l={},c={},h=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(F,O){const U=O.program;s.uniformBlockBinding(F,U)}function m(F,O){let U=l[F.id];U===void 0&&(E(F),U=g(F),l[F.id]=U,F.addEventListener("dispose",M));const Q=O.program;s.updateUBOMapping(F,Q);const X=t.render.frame;c[F.id]!==X&&(x(F),c[F.id]=X)}function g(F){const O=_();F.__bindingPointIndex=O;const U=r.createBuffer(),Q=F.__size,X=F.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,Q,X),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,U),U}function _(){for(let F=0;F<d;F++)if(h.indexOf(F)===-1)return h.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(F){const O=l[F.id],U=F.uniforms,Q=F.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let X=0,z=U.length;X<z;X++){const J=Array.isArray(U[X])?U[X]:[U[X]];for(let D=0,C=J.length;D<C;D++){const k=J[D];if(S(k,X,D,Q)===!0){const ft=k.__offset,ct=Array.isArray(k.value)?k.value:[k.value];let vt=0;for(let yt=0;yt<ct.length;yt++){const P=ct[yt],Z=A(P);typeof P=="number"||typeof P=="boolean"?(k.__data[0]=P,r.bufferSubData(r.UNIFORM_BUFFER,ft+vt,k.__data)):P.isMatrix3?(k.__data[0]=P.elements[0],k.__data[1]=P.elements[1],k.__data[2]=P.elements[2],k.__data[3]=0,k.__data[4]=P.elements[3],k.__data[5]=P.elements[4],k.__data[6]=P.elements[5],k.__data[7]=0,k.__data[8]=P.elements[6],k.__data[9]=P.elements[7],k.__data[10]=P.elements[8],k.__data[11]=0):(P.toArray(k.__data,vt),vt+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,ft,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(F,O,U,Q){const X=F.value,z=O+"_"+U;if(Q[z]===void 0)return typeof X=="number"||typeof X=="boolean"?Q[z]=X:Q[z]=X.clone(),!0;{const J=Q[z];if(typeof X=="number"||typeof X=="boolean"){if(J!==X)return Q[z]=X,!0}else if(J.equals(X)===!1)return J.copy(X),!0}return!1}function E(F){const O=F.uniforms;let U=0;const Q=16;for(let z=0,J=O.length;z<J;z++){const D=Array.isArray(O[z])?O[z]:[O[z]];for(let C=0,k=D.length;C<k;C++){const ft=D[C],ct=Array.isArray(ft.value)?ft.value:[ft.value];for(let vt=0,yt=ct.length;vt<yt;vt++){const P=ct[vt],Z=A(P),K=U%Q,Mt=K%Z.boundary,Tt=K+Mt;U+=Mt,Tt!==0&&Q-Tt<Z.storage&&(U+=Q-Tt),ft.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),ft.__offset=U,U+=Z.storage}}}const X=U%Q;return X>0&&(U+=Q-X),F.__size=U,F.__cache={},this}function A(F){const O={boundary:0,storage:0};return typeof F=="number"||typeof F=="boolean"?(O.boundary=4,O.storage=4):F.isVector2?(O.boundary=8,O.storage=8):F.isVector3||F.isColor?(O.boundary=16,O.storage=12):F.isVector4?(O.boundary=16,O.storage=16):F.isMatrix3?(O.boundary=48,O.storage=48):F.isMatrix4?(O.boundary=64,O.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),O}function M(F){const O=F.target;O.removeEventListener("dispose",M);const U=h.indexOf(O.__bindingPointIndex);h.splice(U,1),r.deleteBuffer(l[O.id]),delete l[O.id],delete c[O.id]}function v(){for(const F in l)r.deleteBuffer(l[F]);h=[],l={},c={}}return{bind:p,update:m,dispose:v}}class ZA{constructor(t={}){const{canvas:i=AM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=h;const E=new Uint32Array(4),A=new Int32Array(4);let M=null,v=null;const F=[],O=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Si,this.toneMapping=$a,this.toneMappingExposure=1;const U=this;let Q=!1,X=0,z=0,J=null,D=-1,C=null;const k=new rn,ft=new rn;let ct=null;const vt=new he(0);let yt=0,P=i.width,Z=i.height,K=1,Mt=null,Tt=null;const N=new rn(0,0,P,Z),et=new rn(0,0,P,Z);let Et=!1;const w=new hp;let H=!1,st=!1;const dt=new Xe,Rt=new Xe,Ot=new I,ie=new rn,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Qe(){return J===null?K:1}let G=s;function On(R,q){return i.getContext(R,q)}try{const R={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${np}`),i.addEventListener("webglcontextlost",xt,!1),i.addEventListener("webglcontextrestored",wt,!1),i.addEventListener("webglcontextcreationerror",Ut,!1),G===null){const q="webgl2";if(G=On(q,R),G===null)throw On(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let de,ye,Yt,Oe,qt,L,T,it,pt,bt,gt,Xt,Dt,Ft,xe,At,Ht,jt,Wt,Pt,$t,oe,Ie,W;function Ct(){de=new a1(G),de.init(),oe=new HA(G,de),ye=new JT(G,de,t,oe),Yt=new IA(G,de),ye.reverseDepthBuffer&&x&&Yt.buffers.depth.setReversed(!0),Oe=new o1(G),qt=new TA,L=new FA(G,de,Yt,qt,ye,oe,Oe),T=new t1(U),it=new i1(U),pt=new pE(G),Ie=new KT(G,pt),bt=new s1(G,pt,Oe,Ie),gt=new c1(G,bt,pt,Oe),Wt=new l1(G,ye,L),At=new $T(qt),Xt=new bA(U,T,it,de,ye,Ie,At),Dt=new YA(U,qt),Ft=new RA,xe=new NA(de),jt=new ZT(U,T,it,Yt,gt,S,p),Ht=new zA(U,gt,ye),W=new jA(G,Oe,ye,Yt),Pt=new QT(G,de,Oe),$t=new r1(G,de,Oe),Oe.programs=Xt.programs,U.capabilities=ye,U.extensions=de,U.properties=qt,U.renderLists=Ft,U.shadowMap=Ht,U.state=Yt,U.info=Oe}Ct();const ut=new WA(U,G);this.xr=ut,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const R=de.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=de.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(R){R!==void 0&&(K=R,this.setSize(P,Z,!1))},this.getSize=function(R){return R.set(P,Z)},this.setSize=function(R,q,rt=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=R,Z=q,i.width=Math.floor(R*K),i.height=Math.floor(q*K),rt===!0&&(i.style.width=R+"px",i.style.height=q+"px"),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(P*K,Z*K).floor()},this.setDrawingBufferSize=function(R,q,rt){P=R,Z=q,K=rt,i.width=Math.floor(R*rt),i.height=Math.floor(q*rt),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(k)},this.getViewport=function(R){return R.copy(N)},this.setViewport=function(R,q,rt,ot){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,q,rt,ot),Yt.viewport(k.copy(N).multiplyScalar(K).round())},this.getScissor=function(R){return R.copy(et)},this.setScissor=function(R,q,rt,ot){R.isVector4?et.set(R.x,R.y,R.z,R.w):et.set(R,q,rt,ot),Yt.scissor(ft.copy(et).multiplyScalar(K).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(R){Yt.setScissorTest(Et=R)},this.setOpaqueSort=function(R){Mt=R},this.setTransparentSort=function(R){Tt=R},this.getClearColor=function(R){return R.copy(jt.getClearColor())},this.setClearColor=function(){jt.setClearColor.apply(jt,arguments)},this.getClearAlpha=function(){return jt.getClearAlpha()},this.setClearAlpha=function(){jt.setClearAlpha.apply(jt,arguments)},this.clear=function(R=!0,q=!0,rt=!0){let ot=0;if(R){let Y=!1;if(J!==null){const St=J.texture.format;Y=St===lp||St===op||St===rp}if(Y){const St=J.texture.type,Lt=St===Sa||St===Bs||St===al||St===Yr||St===ap||St===sp,It=jt.getClearColor(),Bt=jt.getClearAlpha(),Qt=It.r,ee=It.g,Zt=It.b;Lt?(E[0]=Qt,E[1]=ee,E[2]=Zt,E[3]=Bt,G.clearBufferuiv(G.COLOR,0,E)):(A[0]=Qt,A[1]=ee,A[2]=Zt,A[3]=Bt,G.clearBufferiv(G.COLOR,0,A))}else ot|=G.COLOR_BUFFER_BIT}q&&(ot|=G.DEPTH_BUFFER_BIT),rt&&(ot|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",xt,!1),i.removeEventListener("webglcontextrestored",wt,!1),i.removeEventListener("webglcontextcreationerror",Ut,!1),jt.dispose(),Ft.dispose(),xe.dispose(),qt.dispose(),T.dispose(),it.dispose(),gt.dispose(),Ie.dispose(),W.dispose(),Xt.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",to),ut.removeEventListener("sessionend",eo),Bi.stop()};function xt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Q=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),Q=!1;const R=Oe.autoReset,q=Ht.enabled,rt=Ht.autoUpdate,ot=Ht.needsUpdate,Y=Ht.type;Ct(),Oe.autoReset=R,Ht.enabled=q,Ht.autoUpdate=rt,Ht.needsUpdate=ot,Ht.type=Y}function Ut(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function te(R){const q=R.target;q.removeEventListener("dispose",te),Je(q)}function Je(R){gn(R),qt.remove(R)}function gn(R){const q=qt.get(R).programs;q!==void 0&&(q.forEach(function(rt){Xt.releaseProgram(rt)}),R.isShaderMaterial&&Xt.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,rt,ot,Y,St){q===null&&(q=Be);const Lt=Y.isMesh&&Y.matrixWorld.determinant()<0,It=io(R,q,rt,ot,Y);Yt.setMaterial(ot,Lt);let Bt=rt.index,Qt=1;if(ot.wireframe===!0){if(Bt=bt.getWireframeAttribute(rt),Bt===void 0)return;Qt=2}const ee=rt.drawRange,Zt=rt.attributes.position;let Se=ee.start*Qt,Re=(ee.start+ee.count)*Qt;St!==null&&(Se=Math.max(Se,St.start*Qt),Re=Math.min(Re,(St.start+St.count)*Qt)),Bt!==null?(Se=Math.max(Se,0),Re=Math.min(Re,Bt.count)):Zt!=null&&(Se=Math.max(Se,0),Re=Math.min(Re,Zt.count));const Ye=Re-Se;if(Ye<0||Ye===1/0)return;Ie.setup(Y,ot,It,rt,Bt);let We,le=Pt;if(Bt!==null&&(We=pt.get(Bt),le=$t,le.setIndex(We)),Y.isMesh)ot.wireframe===!0?(Yt.setLineWidth(ot.wireframeLinewidth*Qe()),le.setMode(G.LINES)):le.setMode(G.TRIANGLES);else if(Y.isLine){let Vt=ot.linewidth;Vt===void 0&&(Vt=1),Yt.setLineWidth(Vt*Qe()),Y.isLineSegments?le.setMode(G.LINES):Y.isLineLoop?le.setMode(G.LINE_LOOP):le.setMode(G.LINE_STRIP)}else Y.isPoints?le.setMode(G.POINTS):Y.isSprite&&le.setMode(G.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)le.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(de.get("WEBGL_multi_draw"))le.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const Vt=Y._multiDrawStarts,un=Y._multiDrawCounts,Ce=Y._multiDrawCount,Fn=Bt?pt.get(Bt).bytesPerElement:1,ji=qt.get(ot).currentProgram.getUniforms();for(let En=0;En<Ce;En++)ji.setValue(G,"_gl_DrawID",En),le.render(Vt[En]/Fn,un[En])}else if(Y.isInstancedMesh)le.renderInstances(Se,Ye,Y.count);else if(rt.isInstancedBufferGeometry){const Vt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,un=Math.min(rt.instanceCount,Vt);le.renderInstances(Se,Ye,un)}else le.render(Se,Ye)};function Ae(R,q,rt){R.transparent===!0&&R.side===Ei&&R.forceSinglePass===!1?(R.side=$n,R.needsUpdate=!0,en(R,q,rt),R.side=ts,R.needsUpdate=!0,en(R,q,rt),R.side=Ei):en(R,q,rt)}this.compile=function(R,q,rt=null){rt===null&&(rt=R),v=xe.get(rt),v.init(q),O.push(v),rt.traverseVisible(function(Y){Y.isLight&&Y.layers.test(q.layers)&&(v.pushLight(Y),Y.castShadow&&v.pushShadow(Y))}),R!==rt&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(q.layers)&&(v.pushLight(Y),Y.castShadow&&v.pushShadow(Y))}),v.setupLights();const ot=new Set;return R.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const St=Y.material;if(St)if(Array.isArray(St))for(let Lt=0;Lt<St.length;Lt++){const It=St[Lt];Ae(It,rt,Y),ot.add(It)}else Ae(St,rt,Y),ot.add(St)}),O.pop(),v=null,ot},this.compileAsync=function(R,q,rt=null){const ot=this.compile(R,q,rt);return new Promise(Y=>{function St(){if(ot.forEach(function(Lt){qt.get(Lt).currentProgram.isReady()&&ot.delete(Lt)}),ot.size===0){Y(R);return}setTimeout(St,10)}de.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let Rn=null;function bi(R){Rn&&Rn(R)}function to(){Bi.stop()}function eo(){Bi.start()}const Bi=new J0;Bi.setAnimationLoop(bi),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(R){Rn=R,ut.setAnimationLoop(R),R===null?Bi.stop():Bi.start()},ut.addEventListener("sessionstart",to),ut.addEventListener("sessionend",eo),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(q),q=ut.getCamera()),R.isScene===!0&&R.onBeforeRender(U,R,q,J),v=xe.get(R,O.length),v.init(q),O.push(v),Rt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),w.setFromProjectionMatrix(Rt),st=this.localClippingEnabled,H=At.init(this.clippingPlanes,st),M=Ft.get(R,F.length),M.init(),F.push(M),ut.enabled===!0&&ut.isPresenting===!0){const St=U.xr.getDepthSensingMesh();St!==null&&ns(St,q,-1/0,U.sortObjects)}ns(R,q,0,U.sortObjects),M.finish(),U.sortObjects===!0&&M.sort(Mt,Tt),me=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,me&&jt.addToRenderList(M,R),this.info.render.frame++,H===!0&&At.beginShadows();const rt=v.state.shadowsArray;Ht.render(rt,R,q),H===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const ot=M.opaque,Y=M.transmissive;if(v.setupLights(),q.isArrayCamera){const St=q.cameras;if(Y.length>0)for(let Lt=0,It=St.length;Lt<It;Lt++){const Bt=St[Lt];no(ot,Y,R,Bt)}me&&jt.render(R);for(let Lt=0,It=St.length;Lt<It;Lt++){const Bt=St[Lt];Gs(M,R,Bt,Bt.viewport)}}else Y.length>0&&no(ot,Y,R,q),me&&jt.render(R),Gs(M,R,q);J!==null&&(L.updateMultisampleRenderTarget(J),L.updateRenderTargetMipmap(J)),R.isScene===!0&&R.onAfterRender(U,R,q),Ie.resetDefaultState(),D=-1,C=null,O.pop(),O.length>0?(v=O[O.length-1],H===!0&&At.setGlobalState(U.clippingPlanes,v.state.camera)):v=null,F.pop(),F.length>0?M=F[F.length-1]:M=null};function ns(R,q,rt,ot){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)rt=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||w.intersectsSprite(R)){ot&&ie.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Rt);const Lt=gt.update(R),It=R.material;It.visible&&M.push(R,Lt,It,rt,ie.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||w.intersectsObject(R))){const Lt=gt.update(R),It=R.material;if(ot&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ie.copy(R.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),ie.copy(Lt.boundingSphere.center)),ie.applyMatrix4(R.matrixWorld).applyMatrix4(Rt)),Array.isArray(It)){const Bt=Lt.groups;for(let Qt=0,ee=Bt.length;Qt<ee;Qt++){const Zt=Bt[Qt],Se=It[Zt.materialIndex];Se&&Se.visible&&M.push(R,Lt,Se,rt,ie.z,Zt)}}else It.visible&&M.push(R,Lt,It,rt,ie.z,null)}}const St=R.children;for(let Lt=0,It=St.length;Lt<It;Lt++)ns(St[Lt],q,rt,ot)}function Gs(R,q,rt,ot){const Y=R.opaque,St=R.transmissive,Lt=R.transparent;v.setupLightsView(rt),H===!0&&At.setGlobalState(U.clippingPlanes,rt),ot&&Yt.viewport(k.copy(ot)),Y.length>0&&is(Y,q,rt),St.length>0&&is(St,q,rt),Lt.length>0&&is(Lt,q,rt),Yt.buffers.depth.setTest(!0),Yt.buffers.depth.setMask(!0),Yt.buffers.color.setMask(!0),Yt.setPolygonOffset(!1)}function no(R,q,rt,ot){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[ot.id]===void 0&&(v.state.transmissionRenderTarget[ot.id]=new Is(1,1,{generateMipmaps:!0,type:de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float")?rl:Sa,minFilter:zs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const St=v.state.transmissionRenderTarget[ot.id],Lt=ot.viewport||k;St.setSize(Lt.z,Lt.w);const It=U.getRenderTarget();U.setRenderTarget(St),U.getClearColor(vt),yt=U.getClearAlpha(),yt<1&&U.setClearColor(16777215,.5),U.clear(),me&&jt.render(rt);const Bt=U.toneMapping;U.toneMapping=$a;const Qt=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),v.setupLightsView(ot),H===!0&&At.setGlobalState(U.clippingPlanes,ot),is(R,rt,ot),L.updateMultisampleRenderTarget(St),L.updateRenderTargetMipmap(St),de.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let Zt=0,Se=q.length;Zt<Se;Zt++){const Re=q[Zt],Ye=Re.object,We=Re.geometry,le=Re.material,Vt=Re.group;if(le.side===Ei&&Ye.layers.test(ot.layers)){const un=le.side;le.side=$n,le.needsUpdate=!0,Ti(Ye,rt,ot,We,le,Vt),le.side=un,le.needsUpdate=!0,ee=!0}}ee===!0&&(L.updateMultisampleRenderTarget(St),L.updateRenderTargetMipmap(St))}U.setRenderTarget(It),U.setClearColor(vt,yt),Qt!==void 0&&(ot.viewport=Qt),U.toneMapping=Bt}function is(R,q,rt){const ot=q.isScene===!0?q.overrideMaterial:null;for(let Y=0,St=R.length;Y<St;Y++){const Lt=R[Y],It=Lt.object,Bt=Lt.geometry,Qt=ot===null?Lt.material:ot,ee=Lt.group;It.layers.test(rt.layers)&&Ti(It,q,rt,Bt,Qt,ee)}}function Ti(R,q,rt,ot,Y,St){R.onBeforeRender(U,q,rt,ot,Y,St),R.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(U,q,rt,ot,R,St),Y.transparent===!0&&Y.side===Ei&&Y.forceSinglePass===!1?(Y.side=$n,Y.needsUpdate=!0,U.renderBufferDirect(rt,q,ot,Y,R,St),Y.side=ts,Y.needsUpdate=!0,U.renderBufferDirect(rt,q,ot,Y,R,St),Y.side=Ei):U.renderBufferDirect(rt,q,ot,Y,R,St),R.onAfterRender(U,q,rt,ot,Y,St)}function en(R,q,rt){q.isScene!==!0&&(q=Be);const ot=qt.get(R),Y=v.state.lights,St=v.state.shadowsArray,Lt=Y.state.version,It=Xt.getParameters(R,Y.state,St,q,rt),Bt=Xt.getProgramCacheKey(It);let Qt=ot.programs;ot.environment=R.isMeshStandardMaterial?q.environment:null,ot.fog=q.fog,ot.envMap=(R.isMeshStandardMaterial?it:T).get(R.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,Qt===void 0&&(R.addEventListener("dispose",te),Qt=new Map,ot.programs=Qt);let ee=Qt.get(Bt);if(ee!==void 0){if(ot.currentProgram===ee&&ot.lightsStateVersion===Lt)return Yi(R,It),ee}else It.uniforms=Xt.getUniforms(R),R.onBeforeCompile(It,U),ee=Xt.acquireProgram(It,Bt),Qt.set(Bt,ee),ot.uniforms=It.uniforms;const Zt=ot.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Zt.clippingPlanes=At.uniform),Yi(R,It),ot.needsLights=uu(R),ot.lightsStateVersion=Lt,ot.needsLights&&(Zt.ambientLightColor.value=Y.state.ambient,Zt.lightProbe.value=Y.state.probe,Zt.directionalLights.value=Y.state.directional,Zt.directionalLightShadows.value=Y.state.directionalShadow,Zt.spotLights.value=Y.state.spot,Zt.spotLightShadows.value=Y.state.spotShadow,Zt.rectAreaLights.value=Y.state.rectArea,Zt.ltc_1.value=Y.state.rectAreaLTC1,Zt.ltc_2.value=Y.state.rectAreaLTC2,Zt.pointLights.value=Y.state.point,Zt.pointLightShadows.value=Y.state.pointShadow,Zt.hemisphereLights.value=Y.state.hemi,Zt.directionalShadowMap.value=Y.state.directionalShadowMap,Zt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Zt.spotShadowMap.value=Y.state.spotShadowMap,Zt.spotLightMatrix.value=Y.state.spotLightMatrix,Zt.spotLightMap.value=Y.state.spotLightMap,Zt.pointShadowMap.value=Y.state.pointShadowMap,Zt.pointShadowMatrix.value=Y.state.pointShadowMatrix),ot.currentProgram=ee,ot.uniformsList=null,ee}function Cn(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=Jc.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function Yi(R,q){const rt=qt.get(R);rt.outputColorSpace=q.outputColorSpace,rt.batching=q.batching,rt.batchingColor=q.batchingColor,rt.instancing=q.instancing,rt.instancingColor=q.instancingColor,rt.instancingMorph=q.instancingMorph,rt.skinning=q.skinning,rt.morphTargets=q.morphTargets,rt.morphNormals=q.morphNormals,rt.morphColors=q.morphColors,rt.morphTargetsCount=q.morphTargetsCount,rt.numClippingPlanes=q.numClippingPlanes,rt.numIntersection=q.numClipIntersection,rt.vertexAlphas=q.vertexAlphas,rt.vertexTangents=q.vertexTangents,rt.toneMapping=q.toneMapping}function io(R,q,rt,ot,Y){q.isScene!==!0&&(q=Be),L.resetTextureUnits();const St=q.fog,Lt=ot.isMeshStandardMaterial?q.environment:null,It=J===null?U.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Zr,Bt=(ot.isMeshStandardMaterial?it:T).get(ot.envMap||Lt),Qt=ot.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,ee=!!rt.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Zt=!!rt.morphAttributes.position,Se=!!rt.morphAttributes.normal,Re=!!rt.morphAttributes.color;let Ye=$a;ot.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Ye=U.toneMapping);const We=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,le=We!==void 0?We.length:0,Vt=qt.get(ot),un=v.state.lights;if(H===!0&&(st===!0||R!==C)){const _n=R===C&&ot.id===D;At.setState(ot,R,_n)}let Ce=!1;ot.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==un.state.version||Vt.outputColorSpace!==It||Y.isBatchedMesh&&Vt.batching===!1||!Y.isBatchedMesh&&Vt.batching===!0||Y.isBatchedMesh&&Vt.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Vt.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Vt.instancing===!1||!Y.isInstancedMesh&&Vt.instancing===!0||Y.isSkinnedMesh&&Vt.skinning===!1||!Y.isSkinnedMesh&&Vt.skinning===!0||Y.isInstancedMesh&&Vt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Vt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Vt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Vt.instancingMorph===!1&&Y.morphTexture!==null||Vt.envMap!==Bt||ot.fog===!0&&Vt.fog!==St||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==At.numPlanes||Vt.numIntersection!==At.numIntersection)||Vt.vertexAlphas!==Qt||Vt.vertexTangents!==ee||Vt.morphTargets!==Zt||Vt.morphNormals!==Se||Vt.morphColors!==Re||Vt.toneMapping!==Ye||Vt.morphTargetsCount!==le)&&(Ce=!0):(Ce=!0,Vt.__version=ot.version);let Fn=Vt.currentProgram;Ce===!0&&(Fn=en(ot,q,Y));let ji=!1,En=!1,ss=!1;const ge=Fn.getUniforms(),Pn=Vt.uniforms;if(Yt.useProgram(Fn.program)&&(ji=!0,En=!0,ss=!0),ot.id!==D&&(D=ot.id,En=!0),ji||C!==R){Yt.buffers.depth.getReversed()?(dt.copy(R.projectionMatrix),CM(dt),wM(dt),ge.setValue(G,"projectionMatrix",dt)):ge.setValue(G,"projectionMatrix",R.projectionMatrix),ge.setValue(G,"viewMatrix",R.matrixWorldInverse);const on=ge.map.cameraPosition;on!==void 0&&on.setValue(G,Ot.setFromMatrixPosition(R.matrixWorld)),ye.logarithmicDepthBuffer&&ge.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&ge.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,En=!0,ss=!0)}if(Y.isSkinnedMesh){ge.setOptional(G,Y,"bindMatrix"),ge.setOptional(G,Y,"bindMatrixInverse");const _n=Y.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),ge.setValue(G,"boneTexture",_n.boneTexture,L))}Y.isBatchedMesh&&(ge.setOptional(G,Y,"batchingTexture"),ge.setValue(G,"batchingTexture",Y._matricesTexture,L),ge.setOptional(G,Y,"batchingIdTexture"),ge.setValue(G,"batchingIdTexture",Y._indirectTexture,L),ge.setOptional(G,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ge.setValue(G,"batchingColorTexture",Y._colorsTexture,L));const Hn=rt.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&Wt.update(Y,rt,Fn),(En||Vt.receiveShadow!==Y.receiveShadow)&&(Vt.receiveShadow=Y.receiveShadow,ge.setValue(G,"receiveShadow",Y.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(Pn.envMap.value=Bt,Pn.flipEnvMap.value=Bt.isCubeTexture&&Bt.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&q.environment!==null&&(Pn.envMapIntensity.value=q.environmentIntensity),En&&(ge.setValue(G,"toneMappingExposure",U.toneMappingExposure),Vt.needsLights&&cu(Pn,ss),St&&ot.fog===!0&&Dt.refreshFogUniforms(Pn,St),Dt.refreshMaterialUniforms(Pn,ot,K,Z,v.state.transmissionRenderTarget[R.id]),Jc.upload(G,Cn(Vt),Pn,L)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Jc.upload(G,Cn(Vt),Pn,L),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&ge.setValue(G,"center",Y.center),ge.setValue(G,"modelViewMatrix",Y.modelViewMatrix),ge.setValue(G,"normalMatrix",Y.normalMatrix),ge.setValue(G,"modelMatrix",Y.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const _n=ot.uniformsGroups;for(let on=0,Vs=_n.length;on<Vs;on++){const Ii=_n[on];W.update(Ii,Fn),W.bind(Ii,Fn)}}return Fn}function cu(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function uu(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(R,q,rt){qt.get(R.texture).__webglTexture=q,qt.get(R.depthTexture).__webglTexture=rt;const ot=qt.get(R);ot.__hasExternalTextures=!0,ot.__autoAllocateDepthBuffer=rt===void 0,ot.__autoAllocateDepthBuffer||de.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,q){const rt=qt.get(R);rt.__webglFramebuffer=q,rt.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(R,q=0,rt=0){J=R,X=q,z=rt;let ot=!0,Y=null,St=!1,Lt=!1;if(R){const Bt=qt.get(R);if(Bt.__useDefaultFramebuffer!==void 0)Yt.bindFramebuffer(G.FRAMEBUFFER,null),ot=!1;else if(Bt.__webglFramebuffer===void 0)L.setupRenderTarget(R);else if(Bt.__hasExternalTextures)L.rebindTextures(R,qt.get(R.texture).__webglTexture,qt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Zt=R.depthTexture;if(Bt.__boundDepthTexture!==Zt){if(Zt!==null&&qt.has(Zt)&&(R.width!==Zt.image.width||R.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(R)}}const Qt=R.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(Lt=!0);const ee=qt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ee[q])?Y=ee[q][rt]:Y=ee[q],St=!0):R.samples>0&&L.useMultisampledRTT(R)===!1?Y=qt.get(R).__webglMultisampledFramebuffer:Array.isArray(ee)?Y=ee[rt]:Y=ee,k.copy(R.viewport),ft.copy(R.scissor),ct=R.scissorTest}else k.copy(N).multiplyScalar(K).floor(),ft.copy(et).multiplyScalar(K).floor(),ct=Et;if(Yt.bindFramebuffer(G.FRAMEBUFFER,Y)&&ot&&Yt.drawBuffers(R,Y),Yt.viewport(k),Yt.scissor(ft),Yt.setScissorTest(ct),St){const Bt=qt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+q,Bt.__webglTexture,rt)}else if(Lt){const Bt=qt.get(R.texture),Qt=q||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Bt.__webglTexture,rt||0,Qt)}D=-1},this.readRenderTargetPixels=function(R,q,rt,ot,Y,St,Lt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=qt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Lt!==void 0&&(It=It[Lt]),It){Yt.bindFramebuffer(G.FRAMEBUFFER,It);try{const Bt=R.texture,Qt=Bt.format,ee=Bt.type;if(!ye.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ye.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-ot&&rt>=0&&rt<=R.height-Y&&G.readPixels(q,rt,ot,Y,oe.convert(Qt),oe.convert(ee),St)}finally{const Bt=J!==null?qt.get(J).__webglFramebuffer:null;Yt.bindFramebuffer(G.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(R,q,rt,ot,Y,St,Lt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=qt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Lt!==void 0&&(It=It[Lt]),It){const Bt=R.texture,Qt=Bt.format,ee=Bt.type;if(!ye.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ye.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=R.width-ot&&rt>=0&&rt<=R.height-Y){Yt.bindFramebuffer(G.FRAMEBUFFER,It);const Zt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,Zt),G.bufferData(G.PIXEL_PACK_BUFFER,St.byteLength,G.STREAM_READ),G.readPixels(q,rt,ot,Y,oe.convert(Qt),oe.convert(ee),0);const Se=J!==null?qt.get(J).__webglFramebuffer:null;Yt.bindFramebuffer(G.FRAMEBUFFER,Se);const Re=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await RM(G,Re,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,Zt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,St),G.deleteBuffer(Zt),G.deleteSync(Re),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,q=null,rt=0){R.isTexture!==!0&&(zr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1]);const ot=Math.pow(2,-rt),Y=Math.floor(R.image.width*ot),St=Math.floor(R.image.height*ot),Lt=q!==null?q.x:0,It=q!==null?q.y:0;L.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,rt,0,0,Lt,It,Y,St),Yt.unbindTexture()};const cl=G.createFramebuffer(),as=G.createFramebuffer();this.copyTextureToTexture=function(R,q,rt=null,ot=null,Y=0,St=null){R.isTexture!==!0&&(zr("WebGLRenderer: copyTextureToTexture function signature has changed."),ot=arguments[0]||null,R=arguments[1],q=arguments[2],St=arguments[3]||0,rt=null),St===null&&(Y!==0?(zr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),St=Y,Y=0):St=0);let Lt,It,Bt,Qt,ee,Zt,Se,Re,Ye;const We=R.isCompressedTexture?R.mipmaps[St]:R.image;if(rt!==null)Lt=rt.max.x-rt.min.x,It=rt.max.y-rt.min.y,Bt=rt.isBox3?rt.max.z-rt.min.z:1,Qt=rt.min.x,ee=rt.min.y,Zt=rt.isBox3?rt.min.z:0;else{const Hn=Math.pow(2,-Y);Lt=Math.floor(We.width*Hn),It=Math.floor(We.height*Hn),R.isDataArrayTexture?Bt=We.depth:R.isData3DTexture?Bt=Math.floor(We.depth*Hn):Bt=1,Qt=0,ee=0,Zt=0}ot!==null?(Se=ot.x,Re=ot.y,Ye=ot.z):(Se=0,Re=0,Ye=0);const le=oe.convert(q.format),Vt=oe.convert(q.type);let un;q.isData3DTexture?(L.setTexture3D(q,0),un=G.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(L.setTexture2DArray(q,0),un=G.TEXTURE_2D_ARRAY):(L.setTexture2D(q,0),un=G.TEXTURE_2D),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,q.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,q.unpackAlignment);const Ce=G.getParameter(G.UNPACK_ROW_LENGTH),Fn=G.getParameter(G.UNPACK_IMAGE_HEIGHT),ji=G.getParameter(G.UNPACK_SKIP_PIXELS),En=G.getParameter(G.UNPACK_SKIP_ROWS),ss=G.getParameter(G.UNPACK_SKIP_IMAGES);G.pixelStorei(G.UNPACK_ROW_LENGTH,We.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,We.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Qt),G.pixelStorei(G.UNPACK_SKIP_ROWS,ee),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Zt);const ge=R.isDataArrayTexture||R.isData3DTexture,Pn=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const Hn=qt.get(R),_n=qt.get(q),on=qt.get(Hn.__renderTarget),Vs=qt.get(_n.__renderTarget);Yt.bindFramebuffer(G.READ_FRAMEBUFFER,on.__webglFramebuffer),Yt.bindFramebuffer(G.DRAW_FRAMEBUFFER,Vs.__webglFramebuffer);for(let Ii=0;Ii<Bt;Ii++)ge&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,qt.get(R).__webglTexture,Y,Zt+Ii),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,qt.get(q).__webglTexture,St,Ye+Ii)),G.blitFramebuffer(Qt,ee,Lt,It,Se,Re,Lt,It,G.DEPTH_BUFFER_BIT,G.NEAREST);Yt.bindFramebuffer(G.READ_FRAMEBUFFER,null),Yt.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(Y!==0||R.isRenderTargetTexture||qt.has(R)){const Hn=qt.get(R),_n=qt.get(q);Yt.bindFramebuffer(G.READ_FRAMEBUFFER,cl),Yt.bindFramebuffer(G.DRAW_FRAMEBUFFER,as);for(let on=0;on<Bt;on++)ge?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Hn.__webglTexture,Y,Zt+on):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Hn.__webglTexture,Y),Pn?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,_n.__webglTexture,St,Ye+on):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,_n.__webglTexture,St),Y!==0?G.blitFramebuffer(Qt,ee,Lt,It,Se,Re,Lt,It,G.COLOR_BUFFER_BIT,G.NEAREST):Pn?G.copyTexSubImage3D(un,St,Se,Re,Ye+on,Qt,ee,Lt,It):G.copyTexSubImage2D(un,St,Se,Re,Qt,ee,Lt,It);Yt.bindFramebuffer(G.READ_FRAMEBUFFER,null),Yt.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Pn?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(un,St,Se,Re,Ye,Lt,It,Bt,le,Vt,We.data):q.isCompressedArrayTexture?G.compressedTexSubImage3D(un,St,Se,Re,Ye,Lt,It,Bt,le,We.data):G.texSubImage3D(un,St,Se,Re,Ye,Lt,It,Bt,le,Vt,We):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,St,Se,Re,Lt,It,le,Vt,We.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,St,Se,Re,We.width,We.height,le,We.data):G.texSubImage2D(G.TEXTURE_2D,St,Se,Re,Lt,It,le,Vt,We);G.pixelStorei(G.UNPACK_ROW_LENGTH,Ce),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Fn),G.pixelStorei(G.UNPACK_SKIP_PIXELS,ji),G.pixelStorei(G.UNPACK_SKIP_ROWS,En),G.pixelStorei(G.UNPACK_SKIP_IMAGES,ss),St===0&&q.generateMipmaps&&G.generateMipmap(un),Yt.unbindTexture()},this.copyTextureToTexture3D=function(R,q,rt=null,ot=null,Y=0){return R.isTexture!==!0&&(zr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,ot=arguments[1]||null,R=arguments[2],q=arguments[3],Y=arguments[4]||0),zr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,q,rt,ot,Y)},this.initRenderTarget=function(R){qt.get(R).__webglFramebuffer===void 0&&L.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),Yt.unbindTexture()},this.resetState=function(){X=0,z=0,J=null,Yt.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ya}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=Ue._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ue._getUnpackColorSpace()}}const u0={type:"change"},pp={type:"start"},iy={type:"end"},kc=new ol,f0=new ki,KA=Math.cos(70*Qc.DEG2RAD),yn=new I,Qn=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$h=1e-6;class QA extends hE{constructor(t,i=null){super(t,i),this.state=ke.NONE,this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hr.ROTATE,MIDDLE:Hr.DOLLY,RIGHT:Hr.PAN},this.touches={ONE:Br.ROTATE,TWO:Br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Nn,this._lastTargetPosition=new I,this._quat=new Nn().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Iv,this._sphericalDelta=new Iv,this._scale=1,this._panOffset=new I,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new I,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=$A.bind(this),this._onPointerDown=JA.bind(this),this._onPointerUp=tR.bind(this),this._onContextMenu=oR.bind(this),this._onMouseWheel=iR.bind(this),this._onKeyDown=aR.bind(this),this._onTouchStart=sR.bind(this),this._onTouchMove=rR.bind(this),this._onMouseDown=eR.bind(this),this._onMouseMove=nR.bind(this),this._interceptControlDown=lR.bind(this),this._interceptControlUp=cR.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(u0),this.update(),this.state=ke.NONE}update(t=null){const i=this.object.position;yn.copy(i).sub(this.target),yn.applyQuaternion(this._quat),this._spherical.setFromVector3(yn),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Qn:s>Math.PI&&(s-=Qn),l<-Math.PI?l+=Qn:l>Math.PI&&(l-=Qn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(yn.setFromSpherical(this._spherical),yn.applyQuaternion(this._quatInverse),i.copy(this.target).add(yn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=yn.length();h=this._clampDistance(d*this._scale);const p=d-h;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),c=!!p}else if(this.object.isOrthographicCamera){const d=new I(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=p!==this.object.zoom;const m=new I(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(d),this.object.updateMatrixWorld(),h=yn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(kc.origin.copy(this.object.position),kc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(kc.direction))<KA?this.object.lookAt(this.target):(f0.setFromNormalAndCoplanarPoint(this.object.up,this.target),kc.intersectPlane(f0,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>$h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$h||this._lastTargetPosition.distanceToSquared(this.target)>$h?(this.dispatchEvent(u0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Qn/60*this.autoRotateSpeed*t:Qn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){yn.setFromMatrixColumn(i,0),yn.multiplyScalar(-t),this._panOffset.add(yn)}_panUp(t,i){this.screenSpacePanning===!0?yn.setFromMatrixColumn(i,1):(yn.setFromMatrixColumn(i,0),yn.crossVectors(this.object.up,yn)),yn.multiplyScalar(t),this._panOffset.add(yn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;yn.copy(l).sub(this.target);let c=yn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new re,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function JA(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function $A(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function tR(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(iy),this.state=ke.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function eR(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Hr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ke.DOLLY;break;case Hr.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ke.ROTATE}break;case Hr.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(pp)}function nR(r){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function iR(r){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(r.preventDefault(),this.dispatchEvent(pp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(iy))}function aR(r){this.enabled!==!1&&this._handleKeyDown(r)}function sR(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Br.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ke.TOUCH_ROTATE;break;case Br.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case Br.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ke.TOUCH_DOLLY_PAN;break;case Br.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(pp)}function rR(r){switch(this._trackPointer(r),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ke.NONE}}function oR(r){this.enabled!==!1&&r.preventDefault()}function lR(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function cR(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Te={c:null,u:[new I,new I,new I],e:[]},Ne={c:null,u:[new I,new I,new I],e:[]},tn=[[],[],[]],ae=[[],[],[]],Ke=[],Cs=new I,ws=new I,Ds=new I,xn=new I,h0=new I,d0=new I,Li=new se,p0=new Ni,Xc=new Xe,m0=new Xe,g0=new ol;class ay{constructor(t=new I,i=new I,s=new se){this.center=t,this.halfSize=i,this.rotation=s}set(t,i,s){return this.center=t,this.halfSize=i,this.rotation=s,this}copy(t){return this.center.copy(t.center),this.halfSize.copy(t.halfSize),this.rotation.copy(t.rotation),this}clone(){return new this.constructor().copy(this)}getSize(t){return t.copy(this.halfSize).multiplyScalar(2)}clampPoint(t,i){const s=this.halfSize;xn.subVectors(t,this.center),this.rotation.extractBasis(Cs,ws,Ds),i.copy(this.center);const l=Qc.clamp(xn.dot(Cs),-s.x,s.x);i.add(Cs.multiplyScalar(l));const c=Qc.clamp(xn.dot(ws),-s.y,s.y);i.add(ws.multiplyScalar(c));const h=Qc.clamp(xn.dot(Ds),-s.z,s.z);return i.add(Ds.multiplyScalar(h)),i}containsPoint(t){return xn.subVectors(t,this.center),this.rotation.extractBasis(Cs,ws,Ds),Math.abs(xn.dot(Cs))<=this.halfSize.x&&Math.abs(xn.dot(ws))<=this.halfSize.y&&Math.abs(xn.dot(Ds))<=this.halfSize.z}intersectsBox3(t){return this.intersectsOBB(uR.fromBox3(t))}intersectsSphere(t){return this.clampPoint(t.center,d0),d0.distanceToSquared(t.center)<=t.radius*t.radius}intersectsOBB(t,i=Number.EPSILON){Te.c=this.center,Te.e[0]=this.halfSize.x,Te.e[1]=this.halfSize.y,Te.e[2]=this.halfSize.z,this.rotation.extractBasis(Te.u[0],Te.u[1],Te.u[2]),Ne.c=t.center,Ne.e[0]=t.halfSize.x,Ne.e[1]=t.halfSize.y,Ne.e[2]=t.halfSize.z,t.rotation.extractBasis(Ne.u[0],Ne.u[1],Ne.u[2]);for(let c=0;c<3;c++)for(let h=0;h<3;h++)tn[c][h]=Te.u[c].dot(Ne.u[h]);xn.subVectors(Ne.c,Te.c),Ke[0]=xn.dot(Te.u[0]),Ke[1]=xn.dot(Te.u[1]),Ke[2]=xn.dot(Te.u[2]);for(let c=0;c<3;c++)for(let h=0;h<3;h++)ae[c][h]=Math.abs(tn[c][h])+i;let s,l;for(let c=0;c<3;c++)if(s=Te.e[c],l=Ne.e[0]*ae[c][0]+Ne.e[1]*ae[c][1]+Ne.e[2]*ae[c][2],Math.abs(Ke[c])>s+l)return!1;for(let c=0;c<3;c++)if(s=Te.e[0]*ae[0][c]+Te.e[1]*ae[1][c]+Te.e[2]*ae[2][c],l=Ne.e[c],Math.abs(Ke[0]*tn[0][c]+Ke[1]*tn[1][c]+Ke[2]*tn[2][c])>s+l)return!1;return s=Te.e[1]*ae[2][0]+Te.e[2]*ae[1][0],l=Ne.e[1]*ae[0][2]+Ne.e[2]*ae[0][1],!(Math.abs(Ke[2]*tn[1][0]-Ke[1]*tn[2][0])>s+l||(s=Te.e[1]*ae[2][1]+Te.e[2]*ae[1][1],l=Ne.e[0]*ae[0][2]+Ne.e[2]*ae[0][0],Math.abs(Ke[2]*tn[1][1]-Ke[1]*tn[2][1])>s+l)||(s=Te.e[1]*ae[2][2]+Te.e[2]*ae[1][2],l=Ne.e[0]*ae[0][1]+Ne.e[1]*ae[0][0],Math.abs(Ke[2]*tn[1][2]-Ke[1]*tn[2][2])>s+l)||(s=Te.e[0]*ae[2][0]+Te.e[2]*ae[0][0],l=Ne.e[1]*ae[1][2]+Ne.e[2]*ae[1][1],Math.abs(Ke[0]*tn[2][0]-Ke[2]*tn[0][0])>s+l)||(s=Te.e[0]*ae[2][1]+Te.e[2]*ae[0][1],l=Ne.e[0]*ae[1][2]+Ne.e[2]*ae[1][0],Math.abs(Ke[0]*tn[2][1]-Ke[2]*tn[0][1])>s+l)||(s=Te.e[0]*ae[2][2]+Te.e[2]*ae[0][2],l=Ne.e[0]*ae[1][1]+Ne.e[1]*ae[1][0],Math.abs(Ke[0]*tn[2][2]-Ke[2]*tn[0][2])>s+l)||(s=Te.e[0]*ae[1][0]+Te.e[1]*ae[0][0],l=Ne.e[1]*ae[2][2]+Ne.e[2]*ae[2][1],Math.abs(Ke[1]*tn[0][0]-Ke[0]*tn[1][0])>s+l)||(s=Te.e[0]*ae[1][1]+Te.e[1]*ae[0][1],l=Ne.e[0]*ae[2][2]+Ne.e[2]*ae[2][0],Math.abs(Ke[1]*tn[0][1]-Ke[0]*tn[1][1])>s+l)||(s=Te.e[0]*ae[1][2]+Te.e[1]*ae[0][2],l=Ne.e[0]*ae[2][1]+Ne.e[1]*ae[2][0],Math.abs(Ke[1]*tn[0][2]-Ke[0]*tn[1][2])>s+l))}intersectsPlane(t){this.rotation.extractBasis(Cs,ws,Ds);const i=this.halfSize.x*Math.abs(t.normal.dot(Cs))+this.halfSize.y*Math.abs(t.normal.dot(ws))+this.halfSize.z*Math.abs(t.normal.dot(Ds)),s=t.normal.dot(this.center)-t.constant;return Math.abs(s)<=i}intersectRay(t,i){return this.getSize(h0),p0.setFromCenterAndSize(xn.set(0,0,0),h0),Xc.setFromMatrix3(this.rotation),Xc.setPosition(this.center),m0.copy(Xc).invert(),g0.copy(t).applyMatrix4(m0),g0.intersectBox(p0,i)?i.applyMatrix4(Xc):null}intersectsRay(t){return this.intersectRay(t,xn)!==null}fromBox3(t){return t.getCenter(this.center),t.getSize(this.halfSize).multiplyScalar(.5),this.rotation.identity(),this}equals(t){return t.center.equals(this.center)&&t.halfSize.equals(this.halfSize)&&t.rotation.equals(this.rotation)}applyMatrix4(t){const i=t.elements;let s=xn.set(i[0],i[1],i[2]).length();const l=xn.set(i[4],i[5],i[6]).length(),c=xn.set(i[8],i[9],i[10]).length();t.determinant()<0&&(s=-s),Li.setFromMatrix4(t);const d=1/s,p=1/l,m=1/c;return Li.elements[0]*=d,Li.elements[1]*=d,Li.elements[2]*=d,Li.elements[3]*=p,Li.elements[4]*=p,Li.elements[5]*=p,Li.elements[6]*=m,Li.elements[7]*=m,Li.elements[8]*=m,this.rotation.multiply(Li),this.halfSize.x*=s,this.halfSize.y*=l,this.halfSize.z*=c,xn.setFromMatrixPosition(t),this.center.add(xn),this}}const uR=new ay,sy="/vex-build-center/";async function fR(){const r=await fetch(`${sy}parts/manifest.json`,{cache:"no-cache"});if(!r.ok)throw new Error("Could not load the parts library.");return r.json()}function td(r){const t=atob(r),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}const _0=new Map;function Wc(r){const t=_0.get(r.id);if(t)return t;const i=(async()=>{if(r.primitive==="box"){const[c,h,d]=r.sizeMM,p=new Jr(c,h,d);return p.computeBoundingBox(),p}const s=await(await fetch(`${sy}parts/${r.id}.json`,{cache:"force-cache"})).json(),l=new fi;return l.setAttribute("position",new ei(new Float32Array(td(s.position).buffer),3)),s.normal&&l.setAttribute("normal",new ei(new Float32Array(td(s.normal).buffer),3)),l.setIndex(new ei(new Uint32Array(td(s.index).buffer),1)),s.normal||l.computeVertexNormals(),l.computeBoundingBox(),l})();return _0.set(r.id,i),i}const ed={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"},hR={beam:"Beams",plate:"Plates",pin:"Pins",standoff:"Standoffs",corner:"Corners",gear:"Gears",wheel:"Wheels",shaft:"Axles",spacer:"Spacers",motor:"Motors",brain:"Brain & Battery",sensor:"Sensors"},v0=["beam","plate","corner","pin","standoff","gear","wheel","shaft","spacer","motor","sensor","brain"],ry=12.7,Jd=[[1,0,0],[0,1,0],[0,0,1]],dR=["beam","plate","standoff","corner","gear","wheel"];function pR(r){return r.holes&&r.holes.length>0||dR.includes(r.category)}function mR(r,t){const i=t.findIndex(c=>c!==0),s=[0,1,2].filter(c=>c!==i),l=r.sizeMM[s[0]]>=r.sizeMM[s[1]]?s[0]:s[1];return Jd[l]}const nd=r=>Math.max(1,Math.round(r/ry)),id=(r,t)=>(r-(t-1)/2)*ry;function gR(r){if(r.holes&&r.holes.length){const m=r.holes.filter(g=>g.kind==="hole"||g.kind==="stud");if(m.length){const g=new Map;return m.map(_=>{const x=_.axis.findIndex(v=>v!==0),S=[0,1,2].filter(v=>v!==x),E=_.kind==="stud"?`s:${_.p.map(v=>Math.round(v)).join(",")}`:`h:${x}:${Math.round(_.p[S[0]])}:${Math.round(_.p[S[1]])}`;let A=g.get(E);A===void 0&&(A=g.size,g.set(E,A));const M=_.kind==="stud"?"stud":"hole";return{p:_.p,axis:_.axis,tan:mR(r,_.axis),kind:M,core:A}})}}const t=r.sizeMM,i=[0,1,2].sort((m,g)=>t[m]-t[g]),s=i[0],l=i[1],c=i[2],h=[];let d=0;const p=(m,g,_)=>{const x=t[g]/2,S=Jd[g],E=Jd[_],A=[...m];A[g]+=x;const M=[...m];M[g]-=x;const v=d++;h.push({p:A,axis:S,tan:E,kind:"hole",core:v}),h.push({p:M,axis:[-S[0],-S[1],-S[2]],tan:E,kind:"hole",core:v})};if(r.category==="beam"){const m=nd(t[c]);for(let g=0;g<m;g++)p([0,0,0].map((_,x)=>x===c?id(g,m):0),s,c)}else if(r.category==="plate"||r.category==="corner"){const m=nd(t[c]),g=nd(t[l]);for(let _=0;_<m;_++)for(let x=0;x<g;x++){const S=[0,0,0];S[c]=id(_,m),S[l]=id(x,g),p(S,s,c)}}else r.category==="standoff"?p([0,0,0],c,l):(r.category==="gear"||r.category==="wheel")&&p([0,0,0],s,c);return h}const $d=12.7,Os=$d/2,ad=1,$o=r=>Math.round(r/Os)*Os,sd=new Set(["pin","shaft"]),y0=r=>r.startsWith("pin-connector-0x")||r.startsWith("pin-sheet");let rd=1;const Fr=class Fr{constructor(t){zt(this,"scene",new JM);zt(this,"camera");zt(this,"renderer");zt(this,"controls");zt(this,"onChange",()=>{});zt(this,"onConnect",()=>{});zt(this,"onPartMenu",()=>{});zt(this,"onArmChange",()=>{});zt(this,"occupied",new Set);zt(this,"headAxisCache",new Map);zt(this,"disabledPins",new Set);zt(this,"pinLinks",new Map);zt(this,"adj",new Map);zt(this,"studJoins",[]);zt(this,"colliding",new Set);zt(this,"obbCache",new Map);zt(this,"dragGroup",[]);zt(this,"dragGrabStart",new I);zt(this,"container");zt(this,"raycaster",new cE);zt(this,"pointer",new re);zt(this,"parts",new Map);zt(this,"selected",null);zt(this,"selBox",new Ni);zt(this,"helper",new fE(this.selBox,new he("#ffb020")));zt(this,"markers",[]);zt(this,"discGeo",new au(2.6,20));zt(this,"markerMat",new il({color:1614079,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:Ei}));zt(this,"markerHotMat",new il({color:16756768,transparent:!0,opacity:.95,depthTest:!0,depthWrite:!1,side:Ei}));zt(this,"studGeo",new au(3.1,20));zt(this,"studMat",new il({color:15769632,transparent:!0,opacity:.75,depthTest:!0,depthWrite:!1,side:Ei}));zt(this,"hovered",null);zt(this,"markersVisible",!0);zt(this,"armed",null);zt(this,"emptyDown",null);zt(this,"connectFrom",null);zt(this,"connectLine");zt(this,"ground");zt(this,"dragging",!1);zt(this,"dragPlane",new ki);zt(this,"dragOffset",new I);zt(this,"hit",new I);zt(this,"raf",0);zt(this,"ro");zt(this,"grid");zt(this,"needsRender",!0);zt(this,"contextLost",!1);zt(this,"cullDirty",!0);zt(this,"lastCullCam",new I(NaN,NaN,NaN));zt(this,"visibleCache",[]);zt(this,"activePointer",null);zt(this,"downAt",{x:0,y:0});zt(this,"pendingMove",null);zt(this,"past",[]);zt(this,"future",[]);zt(this,"restoring",!1);zt(this,"dragUndo",null);zt(this,"catalog",new Map);zt(this,"onContextMenu",t=>{t.preventDefault(),this.setPointer(t);const i=this.raycaster.intersectObjects([...this.parts.values()].map(s=>s.mesh),!1);for(const s of i){const l=this.parts.get(s.object.userData.uid);if(l&&sd.has(l.meta.category)){this.onPartMenu({uid:l.uid,name:l.meta.name,disabled:this.disabledPins.has(l.uid),screen:{x:t.clientX,y:t.clientY}});return}}});zt(this,"onPointerDown",t=>{if(t.button!==0||this.activePointer!==null)return;if(this.pendingMove=null,this.emptyDown=null,this.downAt={x:t.clientX,y:t.clientY},this.setPointer(t),this.markersVisible){const l=this.raycaster.intersectObjects(this.visibleMarkers(),!1);if(l.length){this.capturePointer(t),this.connectFrom=l[0].object,this.controls.enabled=!1,this.setHot(this.connectFrom,!0),this.connectLine.visible=!0,this.updateConnectLine(this.worldOf(this.connectFrom)),t.stopPropagation();return}}const i=[...this.parts.values()].map(l=>l.mesh),s=this.raycaster.intersectObjects(i,!1);if(s.length){const l=this.parts.get(s[0].object.userData.uid)||null;if(!l)return;this.capturePointer(t),this.select(l),this.emit(),this.dragUndo=this.snapshot(),this.dragging=!0,this.controls.enabled=!1,this.dragPlane.setFromNormalAndCoplanarPoint(new I(0,1,0),s[0].point),this.dragOffset.copy(s[0].point).sub(l.mesh.position),this.dragGrabStart.copy(l.mesh.position),this.dragGroup=[...this.componentOf(l.uid)].map(c=>this.parts.get(c)).filter(Boolean).map(c=>({mesh:c.mesh,start:c.mesh.position.clone()})),t.stopPropagation()}else this.emptyDown={x:t.clientX,y:t.clientY}});zt(this,"onPointerMove",t=>{this.activePointer!==null&&t.pointerId!==this.activePointer||(this.pendingMove={clientX:t.clientX,clientY:t.clientY,buttons:t.buttons},this.invalidate())});zt(this,"onPointerUp",t=>{if(!(this.activePointer!==null&&t.pointerId!==this.activePointer)){if(this.flushPointerMove(),this.releasePointer(),this.connectFrom){const i=this.connectFrom,s=i.userData.holeRef,l=this.hovered&&this.hovered!==i?this.hovered:null,c=l?l.userData.holeRef:null,h=c&&c.partUid!==s.partUid?c:null,d=Math.hypot(t.clientX-this.downAt.x,t.clientY-this.downAt.y)<4,p={x:t.clientX,y:t.clientY};if(i!==this.armed&&this.setHot(i,!1),this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.connectLine.visible=!1,this.controls.enabled=!0,this.connectFrom=null,this.hovered=null,this.invalidate(),h){this.clearArm(),this.pairUp(i,l,p);return}if(!d)return;if(!this.armed){this.setArm(i);return}const m=this.armed,g=m.userData.holeRef,_=g.partUid===s.partUid&&g.holeIndex===s.holeIndex;this.clearArm(),_?this.isStud(i)||this.onConnect({from:s,to:null,depth:this.stackAtHole(s),screen:p}):g.partUid!==s.partUid?this.pairUp(m,i,p):this.setArm(i);return}if(this.dragging){this.dragging=!1;const i=this.dragGroup.some(s=>!s.mesh.position.equals(s.start));this.dragGroup=[],this.controls.enabled=!0,i&&this.dragUndo&&this.commit(this.dragUndo),this.dragUndo=null,this.emit();return}if(this.emptyDown){const i=Math.hypot(t.clientX-this.emptyDown.x,t.clientY-this.emptyDown.y);this.emptyDown=null,i<4&&(this.clearArm(),this.selected&&(this.select(null),this.emit()))}}});zt(this,"onPointerCancel",()=>{if(!this.connectFrom&&!this.dragging&&!this.emptyDown)return;const t=this.dragging;this.connectFrom&&this.connectFrom!==this.armed&&this.setHot(this.connectFrom,!1),this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.connectFrom=null,this.hovered=null,this.dragging=!1,this.dragGroup=[],this.dragUndo=null,this.emptyDown=null,this.pendingMove=null,this.connectLine.visible=!1,this.controls.enabled=!0,this.releasePointer(),t?this.emit():this.invalidate()});zt(this,"onPointerLeave",()=>{this.connectFrom||this.dragging||(this.pendingMove=null,this.hovered&&this.hovered!==this.armed&&(this.setHot(this.hovered,!1),this.hovered=null,this.invalidate()))});zt(this,"onContextLost",t=>{t.preventDefault(),this.contextLost=!0});zt(this,"onContextRestored",()=>{this.contextLost=!1,this.cullDirty=!0,this.invalidate()});zt(this,"invalidate",()=>{this.needsRender=!0});zt(this,"animate",()=>{this.raf=requestAnimationFrame(this.animate),!this.contextLost&&(this.pendingMove&&this.flushPointerMove(),this.controls.update()&&(this.needsRender=!0),this.needsRender&&(this.needsRender=!1,this.cullMarkers(),this.renderer.render(this.scene,this.camera)))});this.container=t;const i=t.clientWidth||800,s=t.clientHeight||600;this.scene.background=new he("#eaeef4"),this.scene.fog=new fp(15396596,900,2e3),this.camera=new Mi(45,i/s,1,6e3),this.camera.position.set(220,190,260),this.renderer=new ZA({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=E0,t.appendChild(this.renderer.domElement),this.controls=new QA(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.target.set(0,25,0),this.controls.maxPolarAngle=Math.PI*.495,this.controls.minDistance=60,this.controls.maxDistance=1600,this.scene.add(new aE(16777215,10135478,.85));const l=new oE(16777215,1.15);l.position.set(160,260,180),l.castShadow=!0,l.shadow.mapSize.set(2048,2048);const c=l.shadow.camera;c.near=10,c.far=900,c.left=-350,c.right=350,c.top=350,c.bottom=-350,l.shadow.bias=-5e-4,this.scene.add(l);const h=$d*48;this.grid=new uE(h,48,11122374,13687010),this.grid.material.transparent=!0,this.grid.material.opacity=.75,this.scene.add(this.grid),this.ground=new Jn(new ll(h,h),new eE({opacity:.16})),this.ground.rotation.x=-Math.PI/2,this.ground.receiveShadow=!0,this.ground.name="ground",this.scene.add(this.ground),this.connectLine=new Y0(new fi().setFromPoints([new I,new I]),new ou({color:16756768,transparent:!0,opacity:.9,depthTest:!1})),this.connectLine.visible=!1,this.connectLine.renderOrder=999,this.scene.add(this.connectLine),this.helper.visible=!1,this.scene.add(this.helper);const d=this.renderer.domElement;d.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),d.addEventListener("contextmenu",this.onContextMenu),d.addEventListener("pointermove",this.onPointerMove),d.addEventListener("pointerup",this.onPointerUp),d.addEventListener("pointerleave",this.onPointerLeave),d.addEventListener("pointercancel",this.onPointerCancel),window.addEventListener("blur",this.onPointerCancel),d.addEventListener("webglcontextlost",this.onContextLost),d.addEventListener("webglcontextrestored",this.onContextRestored),this.controls.addEventListener("change",this.invalidate),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.animate()}async addPart(t){const i=await Wc(t);this.catalog.set(t.id,t);const s=this.snapshot(),l=t.color||ed[t.category]||"#6b7787",c=new Xh({color:l,metalness:.18,roughness:.55}),h=new Jn(i,c);h.castShadow=!0,h.receiveShadow=!0;const d=`p${rd++}`;h.userData.uid=d;const p=this.parts.size%4*Os;h.position.set($o(this.controls.target.x)+p,0,$o(this.controls.target.z)+p),this.restOnGrid(h),this.scene.add(h);const m={uid:d,meta:t,mesh:h};this.parts.set(d,m),this.addMarkers(m),this.select(m),this.commit(s),this.emit()}restOnGrid(t){t.updateMatrixWorld(!0);const i=t.geometry.boundingBox.clone().applyMatrix4(t.matrixWorld);t.position.y+=-i.min.y,t.position.y=Math.max(0,t.position.y),t.updateMatrixWorld(!0)}addMarkers(t){if(!pR(t.meta))return;const i=new I(0,0,1);gR(t.meta).forEach((s,l)=>{const c=s.kind==="stud",h=new Jn(c?this.studGeo:this.discGeo,c?this.studMat:this.markerMat),d=new I(s.axis[0],s.axis[1],s.axis[2]).normalize(),p=c?ad*1.6:ad;h.position.set(s.p[0]+d.x*p,s.p[1]+d.y*p,s.p[2]+d.z*p),h.quaternion.setFromUnitVectors(i,d),h.visible=this.markersVisible,h.userData.holeRef={partUid:t.uid,holeIndex:l},h.userData.localTan=s.tan,h.userData.kind=s.kind,h.userData.core=s.core,h.userData.coreKey=`${t.uid}:${s.core}`,h.userData.proud=p,t.mesh.add(h),this.markers.push(h)}),this.cullDirty=!0}setMarkersVisible(t){this.markersVisible=t;for(const i of this.markers)i.visible=t;this.cullDirty=!0,this.invalidate()}select(t){this.selected=t,this.updateHelper()}updateHelper(){const t=this.selected;if(!t||!t.mesh.geometry.boundingBox){this.helper.visible=!1,this.invalidate();return}t.mesh.updateMatrixWorld(!0),this.selBox.copy(t.mesh.geometry.boundingBox).applyMatrix4(t.mesh.matrixWorld),this.helper.visible=!0,this.helper.updateMatrixWorld(!0),this.invalidate()}selectByUid(t){this.select(t&&this.parts.get(t)||null),this.emit()}rotateSelected(t){if(!this.selected)return;const i=[...this.componentOf(this.selected.uid)].map(d=>this.parts.get(d)).filter(Boolean);if(!i.length)return;const s=this.snapshot(),l=new Ni;for(const d of i)l.union(this.worldBox(d));const c=l.getCenter(new I),h=new Nn().setFromAxisAngle(new I(t==="x"?1:0,t==="y"?1:0,t==="z"?1:0),Math.PI/2);for(const d of i)d.mesh.position.sub(c).applyQuaternion(h).add(c),d.mesh.quaternion.premultiply(h),d.mesh.updateMatrixWorld(!0);this.updateHelper(),this.commit(s),this.emit()}nudgeSelectedY(t){if(!this.selected)return;const i=this.groupOf(this.selected.uid);if(t<0&&i.some(l=>this.worldBox(l).min.y<Os-.01))return;const s=this.snapshot();for(const l of i)l.mesh.position.y+=t*Os,l.mesh.updateMatrixWorld(!0);this.updateHelper(),this.commit(s),this.emit()}moveSelected(t,i){if(!this.selected)return;const s=this.camera.getWorldDirection(new I);if(s.y=0,s.lengthSq()<1e-6)return;s.normalize();const l=Math.abs(s.x)>=Math.abs(s.z)?new I(Math.sign(s.x)||1,0,0):new I(0,0,Math.sign(s.z)||1),c=new I(-l.z,0,l.x),h=new I().addScaledVector(c,t*Os).addScaledVector(l,i*Os);if(!h.lengthSq())return;const d=this.snapshot();for(const p of this.groupOf(this.selected.uid))p.mesh.position.add(h),p.mesh.updateMatrixWorld(!0);this.updateHelper(),this.commit(d),this.emit()}async duplicateSelected(){const t=this.selected;if(!t)return;const i=this.componentOf(t.uid),s=[...this.parts.values()],l=this.serialize(),c=s.map((S,E)=>E).filter(S=>i.has(s[S].uid)),h=new Map(c.map((S,E)=>[S,E])),d=c.map(S=>{var v;const E=l[S],A=(v=E.sj)==null?void 0:v.map(([F,O,U])=>[F,h.get(O)??-1,U]).filter(([,F])=>F>=0),M={id:E.id,p:E.p,q:E.q};return E.off&&(M.off=!0),A&&A.length&&(M.sj=A),M}),p=new Ni;for(const S of c)p.union(this.worldBox(s[S]));const m=new I($o(p.getSize(new I).x)+$d,0,0),g=this.snapshot(),_=await this.instantiate(d,m);this.commit(g);const x=c.indexOf(s.indexOf(t));this.select(_[x]||_.find(Boolean)||null),this.emit()}groupOf(t){return[...this.componentOf(t)].map(i=>this.parts.get(i)).filter(Boolean)}deleteSelected(){if(!this.selected)return;const t=this.snapshot();this.removePart(this.selected),this.select(null),this.commit(t),this.emit()}removePart(t){this.armed&&this.armed.userData.holeRef.partUid===t.uid&&this.clearArm(),this.hovered&&this.hovered.userData.holeRef.partUid===t.uid&&(this.hovered=null),this.connectFrom&&this.connectFrom.userData.holeRef.partUid===t.uid&&(this.connectFrom=null,this.connectLine.visible=!1,this.controls.enabled=!0),this.selected===t&&this.select(null),this.dragGroup=this.dragGroup.filter(i=>i.mesh!==t.mesh),this.studJoins=this.studJoins.filter(i=>i.studPart!==t.uid&&i.holePart!==t.uid),this.markers=this.markers.filter(i=>i.userData.holeRef.partUid!==t.uid),this.scene.remove(t.mesh),t.mesh.clear(),t.mesh.material.dispose(),this.parts.delete(t.uid),this.disabledPins.delete(t.uid),this.pinLinks.delete(t.uid),this.colliding.delete(t.uid),this.cullDirty=!0}clear(){const t=this.snapshot();this.wipe(),this.select(null),this.commit(t),this.emit()}wipe(){for(const t of[...this.parts.values()])this.removePart(t);this.studJoins=[]}serialize(){const t=[...this.parts.values()],i=new Map(t.map((l,c)=>[l.uid,c])),s=l=>+l.slice(l.lastIndexOf(":")+1);return t.map(l=>{const c={id:l.meta.id,p:[l.mesh.position.x,l.mesh.position.y,l.mesh.position.z],q:[l.mesh.quaternion.x,l.mesh.quaternion.y,l.mesh.quaternion.z,l.mesh.quaternion.w]};this.disabledPins.has(l.uid)&&(c.off=!0);const h=this.studJoins.filter(d=>d.studPart===l.uid&&i.has(d.holePart));return h.length&&(c.sj=h.map(d=>[s(d.studCore),i.get(d.holePart),s(d.holeCore)])),c})}setCatalog(t){for(const[i,s]of t)this.catalog.set(i,s)}async load(t,i){i&&this.setCatalog(i);const s=this.snapshot();this.wipe(),await this.instantiate(t),this.select(null),this.commit(s),this.emit()}async instantiate(t,i){const s=[];for(const l of t){const c=this.catalog.get(l.id);if(!c){s.push(null);continue}const h=await Wc(c),d=c.color||ed[c.category]||"#6b7787",p=new Jn(h,new Xh({color:d,metalness:.18,roughness:.55}));p.castShadow=p.receiveShadow=!0;const m=`p${rd++}`;p.userData.uid=m,p.position.set(l.p[0],l.p[1],l.p[2]),i&&p.position.add(i),p.quaternion.set(l.q[0],l.q[1],l.q[2],l.q[3]),p.updateMatrixWorld(!0),this.scene.add(p);const g={uid:m,meta:c,mesh:p};if(this.parts.set(m,g),this.addMarkers(g),l.off){this.disabledPins.add(m);const _=p.material;_.transparent=!0,_.opacity=.35,_.needsUpdate=!0}s.push(g)}return t.forEach((l,c)=>{const h=s[c];if(!(!h||!l.sj))for(const[d,p,m]of l.sj){const g=s[p];g&&this.studJoins.push({studPart:h.uid,studCore:`${h.uid}:${d}`,holePart:g.uid,holeCore:`${g.uid}:${m}`})}}),s}snapshot(){const t=[...this.parts.values()],i=this.selected?t.indexOf(this.selected):-1;return{parts:this.serialize(),selected:i<0?null:i}}commit(t){this.restoring||(this.past.push(t),this.past.length>Fr.HISTORY_LIMIT&&this.past.shift(),this.future.length=0)}canUndo(){return this.past.length>0}canRedo(){return this.future.length>0}async undo(){const t=this.past.pop();return t?(this.future.push(this.snapshot()),await this.replay(t),!0):!1}async redo(){const t=this.future.pop();return t?(this.past.push(this.snapshot()),await this.replay(t),!0):!1}async replay(t){this.restoring=!0;try{this.clearArm(),this.wipe();const i=await this.instantiate(t.parts);this.select(t.selected===null?null:i[t.selected]||null)}finally{this.restoring=!1}this.emit()}computeState(){var l,c,h;const t=new Ni;let i=0;for(const d of this.parts.values())d.mesh.updateMatrixWorld(!0),d.mesh.geometry.boundingBox&&t.union(d.mesh.geometry.boundingBox.clone().applyMatrix4(d.mesh.matrixWorld)),d.meta.isMotor&&i++;const s=this.parts.size?t.getSize(new I):new I;return{count:this.parts.size,selectedUid:((l=this.selected)==null?void 0:l.uid)??null,selectedName:((c=this.selected)==null?void 0:c.meta.name)??null,bboxMM:{w:+s.x.toFixed(1),h:+s.y.toFixed(1),d:+s.z.toFixed(1)},motors:i,canPivot:this.canPivot((h=this.selected)==null?void 0:h.uid),overlaps:this.colliding.size,canUndo:this.past.length>0,canRedo:this.future.length>0,inventory:this.inventory()}}inventory(){const t=new Map;for(const i of this.parts.values()){const s=t.get(i.meta.id);s?s.count++:t.set(i.meta.id,{id:i.meta.id,name:i.meta.name,category:i.meta.category,count:1})}return[...t.values()].sort((i,s)=>i.category.localeCompare(s.category)||i.name.localeCompare(s.name))}settleGroups(){const t=new Set;for(const i of this.parts.values()){if(t.has(i.uid))continue;const s=this.componentOf(i.uid);for(const h of s)t.add(h);const l=[...s].map(h=>this.parts.get(h)).filter(Boolean);if(!l.length)continue;let c=1/0;for(const h of l)c=Math.min(c,this.worldBox(h).min.y);if(!(!isFinite(c)||c>-.01))for(const h of l)h.mesh.position.y-=c,h.mesh.updateMatrixWorld(!0)}}emit(){this.recomputeOccupancy(),this.settleGroups(),this.recomputeCollisions(),this.updateHelper(),this.cullDirty=!0,this.invalidate(),this.onChange(this.computeState())}setPointer(t){const i=this.renderer.domElement.getBoundingClientRect();this.pointer.set((t.clientX-i.left)/i.width*2-1,-((t.clientY-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}capturePointer(t){this.activePointer=t.pointerId;try{this.renderer.domElement.setPointerCapture(t.pointerId)}catch{}}releasePointer(){const t=this.activePointer;if(t!==null){this.activePointer=null;try{this.renderer.domElement.releasePointerCapture(t)}catch{}}}flushPointerMove(){var i;const t=this.pendingMove;if(t){if(this.pendingMove=null,this.setPointer(t),this.connectFrom){const s=this.markerUnderPointer(this.connectFrom);s!==this.hovered&&(this.hovered&&this.hovered!==this.connectFrom&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.hovered=s,s&&this.setHot(s,!0));const l=this.worldOf(this.connectFrom);this.updateConnectLine(l,s?this.worldOf(s):this.pointerOnPlane(l));return}if(this.dragging&&this.selected){if(this.raycaster.ray.intersectPlane(this.dragPlane,this.hit)){const s=$o(this.hit.x-this.dragOffset.x)-this.dragGrabStart.x,l=$o(this.hit.z-this.dragOffset.z)-this.dragGrabStart.z;for(const c of this.dragGroup)c.mesh.position.set(c.start.x+s,c.start.y,c.start.z+l),c.mesh.updateMatrixWorld(!0);this.updateHelper(),this.cullDirty=!0}return}if(this.markersVisible&&t.buttons===0){const s=((i=this.raycaster.intersectObjects(this.visibleMarkers(),!1)[0])==null?void 0:i.object)||null;s!==this.hovered&&(this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.hovered=s,s&&this.setHot(s,!0))}}}worldOf(t){return t.getWorldPosition(new I)}axisOf(t){return t.getWorldDirection(new I).normalize()}setHot(t,i){const s=t.userData.kind==="stud"?this.studMat:this.markerMat;t.material=i?this.markerHotMat:s,t.scale.setScalar(i?1.5:1),this.invalidate()}isStud(t){return t.userData.kind==="stud"}markerFor(t){return this.markers.find(i=>{const s=i.userData.holeRef;return s.partUid===t.partUid&&s.holeIndex===t.holeIndex})||null}pairUp(t,i,s){const l=t.userData.holeRef,c=i.userData.holeRef,h=this.isStud(t),d=this.isStud(i);if(!(h&&d)){if(h||d){this.joinStud(h?l:c,h?c:l,l.partUid);return}this.onConnect({from:l,to:c,depth:this.connectionDepth(l,c),screen:s})}}setArm(t){this.armed=t,this.setHot(t,!0),this.onArmChange(!0)}clearArm(){this.armed&&this.setHot(this.armed,!1),this.armed=null,this.onArmChange(!1)}visibleMarkers(){return this.cullMarkers(),this.visibleCache}markerUnderPointer(t){for(const i of this.raycaster.intersectObjects(this.visibleMarkers(),!1))if(i.object!==t)return i.object;return null}faceOf(t){return this.worldOf(t).addScaledVector(this.axisOf(t),-(t.userData.proud??ad))}tanOf(t){const i=new Nn;t.parent.getWorldQuaternion(i);const s=t.userData.localTan;return new I(s[0],s[1],s[2]).applyQuaternion(i).normalize()}pointerOnPlane(t){const i=this.camera.getWorldDirection(new I).negate(),s=new ki().setFromNormalAndCoplanarPoint(i,t),l=new I;return this.raycaster.ray.intersectPlane(s,l)?l:t.clone()}updateConnectLine(t,i){const s=this.connectLine.geometry.attributes.position,l=i||t;s.setXYZ(0,t.x,t.y,t.z),s.setXYZ(1,l.x,l.y,l.z),s.needsUpdate=!0,this.invalidate()}extentAlong(t,i){const s=t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld).getSize(new I);return Math.abs(s.x*i.x)+Math.abs(s.y*i.y)+Math.abs(s.z*i.z)}longAxis(t){const i=t.sizeMM,s=i[0]>=i[1]&&i[0]>=i[2]?0:i[1]>=i[2]?1:2;return new I(s===0?1:0,s===1?1:0,s===2?1:0)}coreKey(t){return t.userData.coreKey}headLocalAxis(t,i){const s=this.headAxisCache.get(t.id);if(s)return s.clone();const l=t.sizeMM,c=l[0]>=l[1]&&l[0]>=l[2]?0:l[1]>=l[2]?1:2,h=[0,1,2].filter(_=>_!==c),d=i.attributes.position.array;let p=0,m=0;for(let _=0;_<d.length;_+=3){const x=Math.hypot(d[_+h[0]],d[_+h[1]]);d[_+c]>0?p=Math.max(p,x):m=Math.max(m,x)}const g=new I().setComponent(c,p>=m?1:-1);return this.headAxisCache.set(t.id,g.clone()),g}alignGroupTo(t,i){const s=t.userData.holeRef.partUid,l=this.axisOf(t),c=this.tanOf(t),h=this.axisOf(i),d=this.tanOf(i),p=h.clone().negate(),m=d.clone(),g=new I().crossVectors(p,m).normalize(),_=l.clone(),x=c.clone(),S=new I().crossVectors(_,x).normalize(),E=new Nn().setFromRotationMatrix(new Xe().makeBasis(p,m,g)),A=new Nn().setFromRotationMatrix(new Xe().makeBasis(_,x,S)),M=E.multiply(A.invert()),v=[...this.componentOf(s)].map(U=>this.parts.get(U)).filter(Boolean),F=this.faceOf(t);for(const U of v)U.mesh.quaternion.premultiply(M),U.mesh.position.sub(F).applyQuaternion(M).add(F),U.mesh.updateMatrixWorld(!0);const O=this.faceOf(i).sub(this.faceOf(t));for(const U of v)U.mesh.position.add(O),U.mesh.updateMatrixWorld(!0)}joinStud(t,i,s){const l=this.markerFor(t),c=this.markerFor(i);if(!l||!c||this.occupied.has(this.coreKey(c))||this.occupied.has(this.coreKey(l)))return;const h=this.snapshot(),d=s===t.partUid?l:c;this.alignGroupTo(d,d===l?c:l),this.studJoins.push({studPart:t.partUid,studCore:this.coreKey(l),holePart:i.partUid,holeCore:this.coreKey(c)}),this.select(this.parts.get(s)||null),this.commit(h),this.emit()}async connect(t,i,s){const l=this.markerFor(t);if(!l)return;const c=this.parts.get(t.partUid);if(!c||this.occupied.has(this.coreKey(l)))return;const h=await Wc(s);this.catalog.set(s.id,s);const d=this.snapshot();if(i){const g=this.markerFor(i),_=this.parts.get(i.partUid);if(g&&_&&!this.occupied.has(this.coreKey(g))){this.alignGroupTo(l,g);const x=this.faceOf(g),S=this.axisOf(l);y0(s.id)?await this.addHeadedPin(s,h,x.clone().addScaledVector(S,-this.extentAlong(c,S)),S):await this.addCenteredConnector(s,x,S),this.select(c),this.commit(d),this.emit();return}}const p=this.axisOf(l),m=this.faceOf(l);y0(s.id)?await this.addHeadedPin(s,h,m,p.clone().negate()):await this.addCenteredConnector(s,m,p),this.commit(d),this.emit()}async addHeadedPin(t,i,s,l){const c=Math.max(...t.sizeMM)/2,h=new Nn().setFromUnitVectors(this.headLocalAxis(t,i),l.clone().negate());await this.addConnectorMesh(t,s.clone().addScaledVector(l,c),h)}async addCenteredConnector(t,i,s){await this.addConnectorMesh(t,i,new Nn().setFromUnitVectors(this.longAxis(t),s))}async addConnectorMesh(t,i,s){const l=await Wc(t),c=new Jn(l,new Xh({color:ed[t.category]||"#e0a13a",metalness:.2,roughness:.5}));c.castShadow=c.receiveShadow=!0;const h=`p${rd++}`;c.userData.uid=h,c.position.copy(i),c.quaternion.copy(s),c.updateMatrixWorld(!0),this.scene.add(c);const d={uid:h,meta:t,mesh:c};this.parts.set(h,d),this.addMarkers(d)}recomputeOccupancy(){this.occupied.clear(),this.pinLinks.clear(),this.adj.clear();const t=[...this.parts.values()].filter(s=>sd.has(s.meta.category)),i=this.buildCores();for(const s of t){const l=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Nn)).normalize(),c=s.mesh.getWorldPosition(new I),h=this.extentAlong(s,l)/2+1.5,d=new Set;for(const p of i){if(Math.abs(p.a.dot(l))<.9)continue;const m=p.c.clone().sub(c),g=m.dot(l);Math.abs(g)>h||m.addScaledVector(l,-g).length()>3.5||(this.occupied.add(p.key),d.add(p.key.slice(0,p.key.lastIndexOf(":"))))}this.pinLinks.set(s.uid,d)}for(const[s,l]of this.pinLinks)if(!this.disabledPins.has(s))for(const c of l)this.link(s,c);this.studJoins=this.studJoins.filter(s=>this.parts.has(s.studPart)&&this.parts.has(s.holePart));for(const s of this.studJoins)this.occupied.add(s.holeCore),this.occupied.add(s.studCore),this.link(s.studPart,s.holePart);for(const s of this.markers)this.occupied.has(this.coreKey(s))&&(s.visible=!1)}link(t,i){(this.adj.get(t)||this.adj.set(t,new Set).get(t)).add(i),(this.adj.get(i)||this.adj.set(i,new Set).get(i)).add(t)}componentOf(t){const i=new Set([t]),s=[t];for(;s.length;){const l=s.pop();for(const c of this.adj.get(l)||[])i.has(c)||(i.add(c),s.push(c))}return i}setPinEnabled(t,i){const s=this.parts.get(t);if(!s)return;const l=this.snapshot();i?this.disabledPins.delete(t):this.disabledPins.add(t);const c=s.mesh.material;c.transparent=!i,c.opacity=i?1:.35,c.needsUpdate=!0,this.commit(l),this.emit()}isPinDisabled(t){return this.disabledPins.has(t)}stackAt(t,i){const s=new Set;for(const l of this.buildCores()){if(Math.abs(l.a.dot(i))<.9)continue;const c=l.c.clone().sub(t),h=c.dot(i);Math.abs(h)>45||c.addScaledVector(i,-h).length()>3.5||s.add(l.key.slice(0,l.key.lastIndexOf(":")))}return Math.max(1,s.size)}buildCores(){this.scene.updateMatrixWorld(!1);const t=new Map;for(const s of this.markers){if(this.isStud(s))continue;const l=this.coreKey(s);(t.get(l)||t.set(l,[]).get(l)).push(s)}const i=[];for(const[s,l]of t){const c=new I;for(const d of l){const p=d.matrixWorld.elements;c.x+=p[12],c.y+=p[13],c.z+=p[14]}c.multiplyScalar(1/l.length);const h=l[0].matrixWorld.elements;i.push({key:s,c,a:new I(h[8],h[9],h[10]).normalize()})}return i}connectionDepth(t,i){const s=this.markerFor(t),l=this.markerFor(i);return!s||!l?2:this.stackAt(this.faceOf(s),this.axisOf(s))+this.stackAt(this.faceOf(l),this.axisOf(l))}stackAtHole(t){const i=this.markerFor(t);return i?this.stackAt(this.faceOf(i),this.axisOf(i)):1}pinsAdjacent(t){return[...this.adj.get(t)||[]].filter(i=>{const s=this.parts.get(i);return s&&sd.has(s.meta.category)})}canPivot(t){return!!t&&this.pinsAdjacent(t).length===1}componentWithout(t,i){const s=new Set([t]),l=[t];for(;l.length;){const c=l.pop();for(const h of this.adj.get(c)||[])h===i||s.has(h)||(s.add(h),l.push(h))}return s}worldBox(t){return t.mesh.updateMatrixWorld(!0),t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)}obbWorld(t){let i=this.obbCache.get(t.meta.id);if(!i){const l=t.mesh.geometry.boundingBox,c=l.getSize(new I).multiplyScalar(.5),h=l.getCenter(new I);i=new ay(h,c),this.obbCache.set(t.meta.id,i.clone())}const s=i.clone();return s.halfSize.subScalar(Fr.COLLIDE_SLOP).max(new I(.1,.1,.1)),t.mesh.updateMatrixWorld(!0),s.applyMatrix4(t.mesh.matrixWorld)}setColliding(t,i){const s=t.mesh.material;s.emissive.setHex(i?15022389:0),s.emissiveIntensity=i?.55:1,s.needsUpdate=!0,this.invalidate()}recomputeCollisions(){var c;const t=[...this.parts.values()],i=new Map,s=new Map;for(const h of t)i.set(h.uid,this.obbWorld(h)),s.set(h.uid,this.worldBox(h));const l=new Set;for(let h=0;h<t.length;h++)for(let d=h+1;d<t.length;d++){const p=t[h],m=t[d];(c=this.adj.get(p.uid))!=null&&c.has(m.uid)||s.get(p.uid).intersectsBox(s.get(m.uid))&&i.get(p.uid).intersectsOBB(i.get(m.uid))&&(l.add(p.uid),l.add(m.uid))}for(const h of this.colliding)if(!l.has(h)){const d=this.parts.get(h);d&&this.setColliding(d,!1)}for(const h of l)if(!this.colliding.has(h)){const d=this.parts.get(h);d&&this.setColliding(d,!0)}this.colliding=l}pivotSelected(){const t=this.selected;if(!t)return!1;const i=this.pinsAdjacent(t.uid);if(i.length!==1)return!1;const s=this.parts.get(i[0]),l=this.snapshot(),c=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Nn)).normalize(),h=s.mesh.getWorldPosition(new I),p=[...this.componentWithout(t.uid,s.uid)].map(g=>this.parts.get(g)).filter(Boolean),m=new Nn().setFromAxisAngle(c,Math.PI/2);for(const g of p)g.mesh.position.copy(g.mesh.position.clone().sub(h).applyQuaternion(m).add(h)),g.mesh.quaternion.premultiply(m),g.mesh.updateMatrixWorld(!0);return this.updateHelper(),this.commit(l),this.emit(),!0}deletePartByUid(t){const i=this.parts.get(t);if(!i)return;const s=this.snapshot();this.selected===i&&this.select(null),this.removePart(i),this.commit(s),this.emit()}async replaceConnector(t,i){const s=this.parts.get(t);if(!s)return;this.catalog.set(i.id,i);const l=this.snapshot(),c=s.mesh.getWorldPosition(new I),h=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Nn)).normalize();this.removePart(s),await this.addCenteredConnector(i,c,h),this.select(null),this.commit(l),this.emit()}resize(){const t=this.container.clientWidth,i=this.container.clientHeight;!t||!i||(this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.setSize(t,i),this.invalidate())}cullMarkers(){if(!this.cullDirty&&this.lastCullCam.equals(this.camera.position))return;if(this.lastCullCam.copy(this.camera.position),this.cullDirty=!1,!this.markers.length){this.visibleCache=[];return}this.scene.updateMatrixWorld(!1);const t=this.camera.position,i=[];for(const s of this.markers){if(!this.markersVisible){s.visible=!1;continue}const l=s.matrixWorld.elements,c=l[8]*(t.x-l[12])+l[9]*(t.y-l[13])+l[10]*(t.z-l[14])>0;s.visible=s===this.armed||c&&!this.occupied.has(s.userData.coreKey),s.visible&&i.push(s)}this.visibleCache=i,this.invalidate()}frameAll(){this.setView("corner")}setView(t){const i=new Ni;for(const d of this.parts.values())i.union(this.worldBox(d));const s=!this.parts.size||i.isEmpty(),l=s?new I(0,25,0):i.getCenter(new I),c=s?380:i.getSize(new I).length()*.6+90,h=t==="front"?new I(0,.001,1):t==="side"?new I(1,.001,0):t==="top"?new I(0,1,.002):new I(.85,.72,1);this.controls.target.copy(l),this.camera.position.copy(l).addScaledVector(h.normalize(),Math.min(Math.max(c,70),1500)),this.camera.up.set(0,1,0),this.controls.update(),this.invalidate()}dispose(){cancelAnimationFrame(this.raf);const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),t.removeEventListener("contextmenu",this.onContextMenu),t.removeEventListener("pointermove",this.onPointerMove),t.removeEventListener("pointerup",this.onPointerUp),t.removeEventListener("pointerleave",this.onPointerLeave),t.removeEventListener("pointercancel",this.onPointerCancel),t.removeEventListener("webglcontextlost",this.onContextLost),t.removeEventListener("webglcontextrestored",this.onContextRestored),window.removeEventListener("blur",this.onPointerCancel),this.controls.removeEventListener("change",this.invalidate),this.ro.disconnect(),this.controls.dispose(),this.wipe(),this.discGeo.dispose(),this.studGeo.dispose(),this.markerMat.dispose(),this.markerHotMat.dispose(),this.studMat.dispose(),this.connectLine.geometry.dispose(),this.connectLine.material.dispose(),this.ground.geometry.dispose(),this.ground.material.dispose(),this.grid.geometry.dispose(),this.grid.material.dispose(),this.helper.geometry.dispose(),this.helper.material.dispose(),this.renderer.dispose(),t.remove()}};zt(Fr,"HISTORY_LIMIT",80),zt(Fr,"COLLIDE_SLOP",1.4);let tp=Fr;const _R=25.4,x0="utg_vex_build",od=r=>+(r/_R).toFixed(1),S0={w:11,h:15,d:11,motors:6},vR={count:0,selectedUid:null,selectedName:null,bboxMM:{w:0,h:0,d:0},motors:0,canPivot:!1,overlaps:0,canUndo:!1,canRedo:!1,inventory:[]};function yR(){const r=sn.useRef(null),t=sn.useRef(null),i=sn.useRef(null),[s,l]=sn.useState(null),[c,h]=sn.useState(vR),[d,p]=sn.useState(()=>{try{return{...S0,...JSON.parse(localStorage.getItem("utg_vex_limits")||"{}")}}catch{return S0}}),[m,g]=sn.useState("Loading parts…"),[_,x]=sn.useState(""),[S,E]=sn.useState(null),[A,M]=sn.useState(null),[v,F]=sn.useState(""),[O,U]=sn.useState(!1),Q=sn.useMemo(()=>new Map(((s==null?void 0:s.parts)||[]).map(w=>[w.id,w])),[s]);sn.useEffect(()=>{fR().then(l).catch(()=>x("The parts library failed to load."))},[]),sn.useEffect(()=>{if(!s||!r.current)return;let w;try{w=new tp(r.current)}catch{x("This computer could not start 3D graphics (WebGL). Try updating the graphics driver, or open the tool in a different browser.");return}return w.setCatalog(Q),w.onChange=h,w.onConnect=E,w.onPartMenu=M,w.onArmChange=H=>g(H?"First hole picked — click another hole to connect, or click it again for a single connector. (Esc cancels)":"Pick a part on the left, or click a hole to start a connection."),t.current=w,g("Pick a part on the left to start building."),()=>{w.dispose(),t.current=null}},[s,Q]),sn.useEffect(()=>{localStorage.setItem("utg_vex_limits",JSON.stringify(d))},[d]);async function X(){var w;await((w=t.current)==null?void 0:w.undo())?g("Undone. (Ctrl+Y puts it back)"):g("Nothing left to undo.")}async function z(){var w;await((w=t.current)==null?void 0:w.redo())?g("Redone."):g("Nothing left to redo.")}async function J(){const w=t.current;!w||!c.selectedUid||(await w.duplicateSelected(),g("Copied — the new one is sitting next to the original."))}function D(w,H){var st;(st=t.current)==null||st.setView(w),g(`${H} view.`)}sn.useEffect(()=>{const w=H=>{const st=t.current;if(!st)return;const dt=H.target;if(!(dt&&(dt.tagName==="INPUT"||dt.tagName==="TEXTAREA"||dt.tagName==="SELECT"||dt.isContentEditable))){if(H.ctrlKey||H.metaKey){const Rt=H.key.toLowerCase();Rt==="z"&&!H.shiftKey?(H.preventDefault(),X()):Rt==="y"||Rt==="z"&&H.shiftKey?(H.preventDefault(),z()):Rt==="d"&&(H.preventDefault(),J());return}H.altKey||(H.key==="Delete"||H.key==="Backspace"?(H.preventDefault(),st.deleteSelected()):H.key==="ArrowLeft"?(H.preventDefault(),st.moveSelected(-1,0)):H.key==="ArrowRight"?(H.preventDefault(),st.moveSelected(1,0)):H.key==="ArrowUp"?(H.preventDefault(),st.moveSelected(0,1)):H.key==="ArrowDown"?(H.preventDefault(),st.moveSelected(0,-1)):H.key==="r"||H.key==="R"?st.rotateSelected("y"):H.key==="x"||H.key==="X"?st.rotateSelected("x"):H.key==="z"||H.key==="Z"?st.rotateSelected("z"):H.key==="]"?st.nudgeSelectedY(1):H.key==="["?st.nudgeSelectedY(-1):H.key==="f"||H.key==="F"?st.frameAll():H.key==="?"?U(!0):H.key==="Escape"&&(st.clearArm(),st.selectByUid(null),E(null),M(null),U(!1)))}};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[c.selectedUid]);function C(w){var H;(H=t.current)==null||H.addPart(w),g(`Added ${w.name}. Drag to move · R to rotate · Del to remove.`)}function k(){var H;const w=((H=t.current)==null?void 0:H.serialize())||[];localStorage.setItem(x0,JSON.stringify(w)),g(`Saved your build (${w.length} parts) to this device.`)}async function ft(){var w,H;try{const st=JSON.parse(localStorage.getItem(x0)||"[]");if(!st.length){g("No saved build on this device yet.");return}await((w=t.current)==null?void 0:w.load(st,Q)),(H=t.current)==null||H.frameAll(),g(`Loaded your saved build (${st.length} parts). Ctrl+Z undoes it.`)}catch{g("That saved build could not be opened.")}}function ct(){var dt;const w=((dt=t.current)==null?void 0:dt.serialize())||[];if(!w.length){g("Nothing to export yet — build something first.");return}const H=URL.createObjectURL(new Blob([JSON.stringify(w)],{type:"application/json"})),st=document.createElement("a");st.href=H,st.download=`vex-build-${w.length}-parts.json`,st.click(),setTimeout(()=>URL.revokeObjectURL(H),1e3),g(`Exported ${w.length} parts to your Downloads folder.`)}async function vt(w){var H,st;try{const dt=JSON.parse(await w.text());if(!Array.isArray(dt)||!dt.every(Ot=>Ot&&typeof Ot.id=="string"))throw new Error("bad shape");await((H=t.current)==null?void 0:H.load(dt,Q)),(st=t.current)==null||st.frameAll();const Rt=dt.filter(Ot=>!Q.has(Ot.id)).length;g(Rt?`Opened ${dt.length-Rt} parts — ${Rt} weren't in this parts library.`:`Opened ${w.name} (${dt.length} parts).`)}catch{g("That file isn't a VEX Build Center build.")}}function yt(){var w;confirm("Clear the whole build?")&&((w=t.current)==null||w.clear(),g("Cleared — Ctrl+Z brings it back if that was a mistake."))}const P=sn.useMemo(()=>{const w=v.trim().toLowerCase(),H=new Map;for(const st of(s==null?void 0:s.parts)||[]){if(w&&!st.name.toLowerCase().includes(w)&&!st.id.includes(w))continue;const dt=H.get(st.category)||[];dt.push(st),H.set(st.category,dt)}return v0.filter(st=>H.has(st)).map(st=>({category:st,parts:H.get(st)}))},[s,v]),Z=sn.useMemo(()=>((s==null?void 0:s.parts)||[]).filter(w=>w.category==="pin"||w.category==="shaft"||w.category==="standoff"),[s]),K=sn.useMemo(()=>{if(!S)return[];const w=S.depth,H=Z.filter(Rt=>Rt.category!=="pin"||cd(Rt)>=w),st=H.filter(Rt=>Rt.category==="pin").sort((Rt,Ot)=>cd(Rt)-cd(Ot)),dt=H.filter(Rt=>Rt.category!=="pin");return[...st,...dt].map((Rt,Ot)=>({meta:Rt,best:Ot===0&&st.length>0}))},[S,Z]),Mt=sn.useMemo(()=>{const w=new Map(v0.map((H,st)=>[H,st]));return[...c.inventory].sort((H,st)=>(w.get(H.category)??99)-(w.get(st.category)??99)||H.name.localeCompare(st.name))},[c.inventory]),Tt={w:od(c.bboxMM.w),h:od(c.bboxMM.h),d:od(c.bboxMM.d)},N={w:Tt.w>d.w,h:Tt.h>d.h,d:Tt.d>d.d,motors:c.motors>d.motors},et=N.w||N.h||N.d||N.motors,Et=!!c.selectedUid;return _?at.jsx("main",{className:"shell",children:at.jsx("div",{className:"fatal",children:_})}):at.jsxs("main",{className:"shell",children:[at.jsxs("header",{className:"topbar",children:[at.jsxs("a",{className:"brand",href:"../",children:[at.jsx("img",{src:"https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg",alt:"UTG Academy"}),at.jsx("span",{children:"VEX Build Center"})]}),at.jsxs("div",{className:"toolbar",children:[at.jsx("button",{className:"tool",onClick:X,disabled:!c.canUndo,title:"Undo (Ctrl+Z)",children:"↶ Undo"}),at.jsx("button",{className:"tool",onClick:z,disabled:!c.canRedo,title:"Redo (Ctrl+Y)",children:"↷ Redo"}),at.jsx("button",{className:"tool",onClick:J,disabled:!Et,title:"Duplicate the selected part and everything pinned to it (Ctrl+D)",children:"⧉ Copy"})]}),at.jsxs("div",{className:"badges",children:[c.overlaps>0&&at.jsxs("div",{className:"legality warn",title:"Parts highlighted red are clipping into each other",children:["⚠ ",c.overlaps," part",c.overlaps===1?"":"s"," overlapping"]}),at.jsx("div",{className:`legality ${et?"bad":"good"}`,children:c.count?et?"Over the limits":"Within the limits":"Empty build"}),at.jsx("button",{className:"tool help-btn",onClick:()=>U(!0),title:"How to build · keyboard shortcuts",children:"? Help"})]})]}),at.jsxs("div",{className:"workspace",children:[at.jsxs("aside",{className:"palette",children:[at.jsx("h2",{children:"Parts"}),at.jsx("input",{className:"pal-search",type:"search",placeholder:"Search parts…",value:v,onChange:w=>F(w.target.value)}),!s&&at.jsx("p",{className:"muted",children:"Loading…"}),s&&!P.length&&at.jsxs("p",{className:"muted small",children:["No part matches “",v,"”."]}),P.map(w=>at.jsxs("section",{className:"pal-group",children:[at.jsx("h3",{children:hR[w.category]}),at.jsx("div",{className:"pal-grid",children:w.parts.map(H=>at.jsxs("button",{className:"pal-item",onClick:()=>C(H),title:H.name,children:[at.jsx("span",{className:"pal-swatch",style:{background:ud(H)}}),at.jsx("span",{className:"pal-name",children:H.name})]},H.id))})]},w.category))]}),at.jsxs("div",{className:"stage",children:[at.jsx("div",{className:"canvas-host",ref:r}),at.jsxs("div",{className:"view-bar",children:[at.jsx("button",{onClick:()=>D("corner","3D"),title:"Three-quarter view (F)",children:"3D"}),at.jsx("button",{onClick:()=>D("front","Front"),title:"Look at the front",children:"Front"}),at.jsx("button",{onClick:()=>D("side","Side"),title:"Look at the side",children:"Side"}),at.jsx("button",{onClick:()=>D("top","Top"),title:"Look from above",children:"Top"})]}),at.jsx("div",{className:"stage-hint",children:"Click a hole then another to connect (or drag between them) · click the same hole twice for one connector · drag a part to move"})]}),at.jsxs("aside",{className:"inspector",children:[at.jsxs("section",{className:"card",children:[at.jsx("h3",{children:"Robot size"}),at.jsxs("div",{className:"dims",children:[at.jsx(ld,{label:"Width",mm:c.bboxMM.w,inV:Tt.w,limit:d.w,over:N.w,onLimit:w=>p({...d,w})}),at.jsx(ld,{label:"Height",mm:c.bboxMM.h,inV:Tt.h,limit:d.h,over:N.h,onLimit:w=>p({...d,h:w})}),at.jsx(ld,{label:"Depth",mm:c.bboxMM.d,inV:Tt.d,limit:d.d,over:N.d,onLimit:w=>p({...d,d:w})})]}),at.jsx("p",{className:"muted small",children:"Limits are in inches — set them to your season's rules."})]}),at.jsxs("section",{className:"card",children:[at.jsx("h3",{children:"Motors"}),at.jsxs("div",{className:`motor-row ${N.motors?"over":""}`,children:[at.jsx("span",{className:"motor-count",children:c.motors}),at.jsx("span",{className:"muted",children:"of"}),at.jsx("input",{type:"number",min:0,value:d.motors,onChange:w=>p({...d,motors:Math.max(0,+w.target.value||0)})}),at.jsx("span",{className:"muted",children:"max"})]})]}),at.jsxs("section",{className:"card",children:[at.jsx("h3",{children:"Selected part"}),Et?at.jsxs(at.Fragment,{children:[at.jsx("p",{className:"sel-name",children:c.selectedName}),c.canPivot&&at.jsx("div",{className:"btn-row",children:at.jsx("button",{className:"pivot",onClick:()=>{var w;(w=t.current)==null||w.pivotSelected(),g("Pivoted 90° around the pin.")},children:"⟳ Pivot on pin 90°"})}),at.jsxs("div",{className:"btn-row",children:[at.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("x")},children:"Rotate X"}),at.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("y")},children:"Rotate Y"}),at.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("z")},children:"Rotate Z"})]}),at.jsxs("div",{className:"btn-row",children:[at.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.nudgeSelectedY(1)},children:"Raise"}),at.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.nudgeSelectedY(-1)},children:"Lower"}),at.jsx("button",{onClick:J,children:"Copy"})]}),at.jsx("div",{className:"btn-row",children:at.jsx("button",{className:"danger",onClick:()=>{var w;return(w=t.current)==null?void 0:w.deleteSelected()},children:"Delete"})}),at.jsx("p",{className:"muted small",children:"Arrow keys slide it one hole at a time."})]}):at.jsx("p",{className:"muted small",children:"Click a part in the scene to select it."})]}),at.jsxs("section",{className:"card",children:[at.jsxs("h3",{children:["Parts list · ",c.count," total"]}),Mt.length?at.jsxs(at.Fragment,{children:[at.jsx("ul",{className:"bom",children:Mt.map(w=>at.jsxs("li",{children:[at.jsxs("span",{className:"bom-n",children:[w.count,"×"]}),at.jsx("span",{className:"bom-name",children:w.name})]},w.id))}),at.jsx("div",{className:"btn-row",children:at.jsx("button",{onClick:()=>SR(Mt.map(w=>`${w.count} x ${w.name}`).join(`
`),g),children:"Copy list"})}),at.jsx("p",{className:"muted small",children:"Everything you'd take off the shelf to build this for real."})]}):at.jsx("p",{className:"muted small",children:"Add parts and they'll be counted up here."})]}),at.jsxs("section",{className:"card",children:[at.jsx("h3",{children:"Your build"}),at.jsxs("div",{className:"btn-row",children:[at.jsx("button",{onClick:k,children:"Save"}),at.jsx("button",{onClick:ft,children:"Load"}),at.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.frameAll()},children:"Fit view"})]}),at.jsxs("div",{className:"btn-row",children:[at.jsx("button",{onClick:ct,children:"Export file"}),at.jsx("button",{onClick:()=>{var w;return(w=i.current)==null?void 0:w.click()},children:"Open file"})]}),at.jsx("div",{className:"btn-row",children:at.jsx("button",{className:"danger",onClick:yt,children:"Clear all"})}),at.jsx("input",{ref:i,type:"file",accept:"application/json,.json",hidden:!0,onChange:w=>{var st;const H=(st=w.target.files)==null?void 0:st[0];H&&vt(H),w.target.value=""}}),at.jsx("p",{className:"muted small",children:"Save keeps it on this computer. Export makes a file you can take with you."})]})]})]}),S&&at.jsxs(at.Fragment,{children:[at.jsx("div",{className:"picker-scrim",onClick:()=>E(null)}),at.jsxs("div",{className:"picker",style:{left:Math.min(S.screen.x,window.innerWidth-210),top:Math.min(S.screen.y,window.innerHeight-260)},children:[at.jsx("div",{className:"picker-head",children:S.to?`Connect ${S.depth} stacked holes with…`:"Put in this hole…"}),at.jsx("div",{className:"picker-grid",children:K.map(({meta:w,best:H})=>at.jsxs("button",{className:`picker-item ${H?"best":""}`,onClick:()=>{var st;(st=t.current)==null||st.connect(S.from,S.to,w),E(null),g(`Placed ${w.name}.`)},children:[at.jsx("span",{className:"pal-swatch",style:{background:ud(w)}}),at.jsx("span",{className:"picker-name",children:w.name}),H&&at.jsx("span",{className:"pill",children:"best fit"})]},w.id))})]})]}),A&&at.jsxs(at.Fragment,{children:[at.jsx("div",{className:"picker-scrim",onClick:()=>M(null)}),at.jsxs("div",{className:"picker",style:{left:Math.min(A.screen.x,window.innerWidth-210),top:Math.min(A.screen.y,window.innerHeight-300)},children:[at.jsxs("div",{className:"picker-head",children:[A.name,A.disabled?" · disabled":""]}),at.jsx("button",{className:"picker-item",onClick:()=>{var w;(w=t.current)==null||w.setPinEnabled(A.uid,A.disabled),M(null),g(A.disabled?"Pin enabled — parts are stuck together.":"Pin disabled — you can pull the parts apart.")},children:A.disabled?"Enable (stick parts)":"Disable (release parts)"}),at.jsx("button",{className:"picker-item danger",onClick:()=>{var w;(w=t.current)==null||w.deletePartByUid(A.uid),M(null),g("Removed the pin.")},children:"Delete pin"}),at.jsx("div",{className:"picker-head",style:{paddingTop:8},children:"Replace with…"}),at.jsx("div",{className:"picker-grid",children:Z.map(w=>at.jsxs("button",{className:"picker-item",onClick:()=>{var H;(H=t.current)==null||H.replaceConnector(A.uid,w),M(null),g(`Replaced with ${w.name}.`)},children:[at.jsx("span",{className:"pal-swatch",style:{background:ud(w)}}),at.jsx("span",{className:"picker-name",children:w.name})]},w.id))})]})]}),O&&at.jsx(xR,{onClose:()=>U(!1)}),at.jsx("footer",{className:"statusbar",children:m})]})}function xR({onClose:r}){return at.jsxs(at.Fragment,{children:[at.jsx("div",{className:"modal-scrim",onClick:r}),at.jsxs("div",{className:"modal",role:"dialog","aria-label":"How to build",children:[at.jsx("button",{className:"modal-x",onClick:r,"aria-label":"Close",children:"×"}),at.jsx("h2",{children:"How to build"}),at.jsxs("ol",{className:"steps",children:[at.jsxs("li",{children:[at.jsx("b",{children:"Pick a part"})," from the left. It lands on the grid."]}),at.jsxs("li",{children:[at.jsx("b",{children:"Drag it"})," to move it. It snaps to the grid so parts line up."]}),at.jsxs("li",{children:[at.jsx("b",{children:"Click a blue hole"}),", then click another hole on a different part. The first part you clicked flies over and lines up."]}),at.jsxs("li",{children:[at.jsx("b",{children:"Choose a pin"})," from the little menu — the top one is already the right length."]}),at.jsxs("li",{children:[at.jsx("b",{children:"Gold circles"})," are built-in pins on corner brackets. Click one, then a hole, and they plug straight together."]})]}),at.jsx("p",{className:"muted small",children:"Parts glowing red are overlapping — move one out of the way. Right-click a pin to disable it if you want to pull parts apart again."}),at.jsx("h2",{children:"Keys"}),at.jsx("div",{className:"keys",children:[["Ctrl + Z","Undo"],["Ctrl + Y","Redo"],["Ctrl + D","Copy the selected part"],["Arrow keys","Slide one hole"],["] and [","Raise / lower"],["R","Turn (Y)"],["X","Turn (X)"],["Z","Turn (Z)"],["Delete","Remove"],["F","Fit the view"],["Esc","Cancel / deselect"]].map(([t,i])=>at.jsxs("div",{className:"key-row",children:[at.jsx("kbd",{children:t}),at.jsx("span",{children:i})]},t))}),at.jsx("p",{className:"muted small",children:"Drag on empty space to spin the view · scroll to zoom · right-drag to slide it."})]})]})}function ld({label:r,mm:t,inV:i,limit:s,over:l,onLimit:c}){return at.jsxs("div",{className:`dim ${l?"over":""}`,children:[at.jsx("span",{className:"dim-label",children:r}),at.jsxs("span",{className:"dim-val",children:[i,at.jsx("small",{children:"in"})," ",at.jsxs("span",{className:"muted",children:["/ ",t,"mm"]})]}),at.jsxs("label",{className:"dim-limit",children:["≤ ",at.jsx("input",{type:"number",min:0,step:.5,value:s,onChange:h=>c(Math.max(0,+h.target.value||0))})," in"]})]})}function SR(r,t){var i;(i=navigator.clipboard)==null||i.writeText(r).then(()=>t("Parts list copied — paste it into your notes.")).catch(()=>t("Couldn't copy the list on this computer."))}function cd(r){return Math.round(Math.max(...r.sizeMM)/6.35)}function ud(r){const t={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"};return r.color||t[r.category]||"#6b7787"}ES.createRoot(document.getElementById("root")).render(at.jsx(sn.StrictMode,{children:at.jsx(yR,{})}));
