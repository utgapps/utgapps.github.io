var kx=Object.defineProperty;var Xx=(o,t,i)=>t in o?kx(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var ee=(o,t,i)=>Xx(o,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var nh={exports:{}},Lo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N_;function Wx(){if(N_)return Lo;N_=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:c}}return Lo.Fragment=t,Lo.jsx=i,Lo.jsxs=i,Lo}var O_;function qx(){return O_||(O_=1,nh.exports=Wx()),nh.exports}var Tt=qx(),ih={exports:{}},ne={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P_;function Yx(){if(P_)return ne;P_=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.for("react.activity"),x=Symbol.iterator;function M(N){return N===null||typeof N!="object"?null:(N=x&&N[x]||N["@@iterator"],typeof N=="function"?N:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,S={};function y(N,at,xt){this.props=N,this.context=at,this.refs=S,this.updater=xt||b}y.prototype.isReactComponent={},y.prototype.setState=function(N,at){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,at,"setState")},y.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function I(){}I.prototype=y.prototype;function O(N,at,xt){this.props=N,this.context=at,this.refs=S,this.updater=xt||b}var L=O.prototype=new I;L.constructor=O,R(L,y.prototype),L.isPureReactComponent=!0;var Q=Array.isArray;function G(){}var P={H:null,A:null,T:null,S:null},W=Object.prototype.hasOwnProperty;function D(N,at,xt){var Z=xt.ref;return{$$typeof:o,type:N,key:at,ref:Z!==void 0?Z:null,props:xt}}function C(N,at){return D(N.type,at,N.props)}function w(N){return typeof N=="object"&&N!==null&&N.$$typeof===o}function j(N){var at={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(xt){return at[xt]})}var et=/\/+/g;function mt(N,at){return typeof N=="object"&&N!==null&&N.key!=null?j(""+N.key):at.toString(36)}function gt(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(G,G):(N.status="pending",N.then(function(at){N.status==="pending"&&(N.status="fulfilled",N.value=at)},function(at){N.status==="pending"&&(N.status="rejected",N.reason=at)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function z(N,at,xt,Z,ct){var Et=typeof N;(Et==="undefined"||Et==="boolean")&&(N=null);var yt=!1;if(N===null)yt=!0;else switch(Et){case"bigint":case"string":case"number":yt=!0;break;case"object":switch(N.$$typeof){case o:case t:yt=!0;break;case g:return yt=N._init,z(yt(N._payload),at,xt,Z,ct)}}if(yt)return ct=ct(N),yt=Z===""?"."+mt(N,0):Z,Q(ct)?(xt="",yt!=null&&(xt=yt.replace(et,"$&/")+"/"),z(ct,at,xt,"",function(ie){return ie})):ct!=null&&(w(ct)&&(ct=C(ct,xt+(ct.key==null||N&&N.key===ct.key?"":(""+ct.key).replace(et,"$&/")+"/")+yt)),at.push(ct)),1;yt=0;var Gt=Z===""?".":Z+":";if(Q(N))for(var Ft=0;Ft<N.length;Ft++)Z=N[Ft],Et=Gt+mt(Z,Ft),yt+=z(Z,at,xt,Et,ct);else if(Ft=M(N),typeof Ft=="function")for(N=Ft.call(N),Ft=0;!(Z=N.next()).done;)Z=Z.value,Et=Gt+mt(Z,Ft++),yt+=z(Z,at,xt,Et,ct);else if(Et==="object"){if(typeof N.then=="function")return z(gt(N),at,xt,Z,ct);throw at=String(N),Error("Objects are not valid as a React child (found: "+(at==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":at)+"). If you meant to render a collection of children, use an array instead.")}return yt}function J(N,at,xt){if(N==null)return N;var Z=[],ct=0;return z(N,Z,"","",function(Et){return at.call(xt,Et,ct++)}),Z}function K(N){if(N._status===-1){var at=N._result;at=at(),at.then(function(xt){(N._status===0||N._status===-1)&&(N._status=1,N._result=xt)},function(xt){(N._status===0||N._status===-1)&&(N._status=2,N._result=xt)}),N._status===-1&&(N._status=0,N._result=at)}if(N._status===1)return N._result.default;throw N._result}var St=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var at=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(at))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},bt={map:J,forEach:function(N,at,xt){J(N,function(){at.apply(this,arguments)},xt)},count:function(N){var at=0;return J(N,function(){at++}),at},toArray:function(N){return J(N,function(at){return at})||[]},only:function(N){if(!w(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return ne.Activity=v,ne.Children=bt,ne.Component=y,ne.Fragment=i,ne.Profiler=l,ne.PureComponent=O,ne.StrictMode=s,ne.Suspense=m,ne.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ne.__COMPILER_RUNTIME={__proto__:null,c:function(N){return P.H.useMemoCache(N)}},ne.cache=function(N){return function(){return N.apply(null,arguments)}},ne.cacheSignal=function(){return null},ne.cloneElement=function(N,at,xt){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var Z=R({},N.props),ct=N.key;if(at!=null)for(Et in at.key!==void 0&&(ct=""+at.key),at)!W.call(at,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&at.ref===void 0||(Z[Et]=at[Et]);var Et=arguments.length-2;if(Et===1)Z.children=xt;else if(1<Et){for(var yt=Array(Et),Gt=0;Gt<Et;Gt++)yt[Gt]=arguments[Gt+2];Z.children=yt}return D(N.type,ct,Z)},ne.createContext=function(N){return N={$$typeof:h,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},ne.createElement=function(N,at,xt){var Z,ct={},Et=null;if(at!=null)for(Z in at.key!==void 0&&(Et=""+at.key),at)W.call(at,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ct[Z]=at[Z]);var yt=arguments.length-2;if(yt===1)ct.children=xt;else if(1<yt){for(var Gt=Array(yt),Ft=0;Ft<yt;Ft++)Gt[Ft]=arguments[Ft+2];ct.children=Gt}if(N&&N.defaultProps)for(Z in yt=N.defaultProps,yt)ct[Z]===void 0&&(ct[Z]=yt[Z]);return D(N,Et,ct)},ne.createRef=function(){return{current:null}},ne.forwardRef=function(N){return{$$typeof:d,render:N}},ne.isValidElement=w,ne.lazy=function(N){return{$$typeof:g,_payload:{_status:-1,_result:N},_init:K}},ne.memo=function(N,at){return{$$typeof:p,type:N,compare:at===void 0?null:at}},ne.startTransition=function(N){var at=P.T,xt={};P.T=xt;try{var Z=N(),ct=P.S;ct!==null&&ct(xt,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(G,St)}catch(Et){St(Et)}finally{at!==null&&xt.types!==null&&(at.types=xt.types),P.T=at}},ne.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ne.use=function(N){return P.H.use(N)},ne.useActionState=function(N,at,xt){return P.H.useActionState(N,at,xt)},ne.useCallback=function(N,at){return P.H.useCallback(N,at)},ne.useContext=function(N){return P.H.useContext(N)},ne.useDebugValue=function(){},ne.useDeferredValue=function(N,at){return P.H.useDeferredValue(N,at)},ne.useEffect=function(N,at){return P.H.useEffect(N,at)},ne.useEffectEvent=function(N){return P.H.useEffectEvent(N)},ne.useId=function(){return P.H.useId()},ne.useImperativeHandle=function(N,at,xt){return P.H.useImperativeHandle(N,at,xt)},ne.useInsertionEffect=function(N,at){return P.H.useInsertionEffect(N,at)},ne.useLayoutEffect=function(N,at){return P.H.useLayoutEffect(N,at)},ne.useMemo=function(N,at){return P.H.useMemo(N,at)},ne.useOptimistic=function(N,at){return P.H.useOptimistic(N,at)},ne.useReducer=function(N,at,xt){return P.H.useReducer(N,at,xt)},ne.useRef=function(N){return P.H.useRef(N)},ne.useState=function(N){return P.H.useState(N)},ne.useSyncExternalStore=function(N,at,xt){return P.H.useSyncExternalStore(N,at,xt)},ne.useTransition=function(){return P.H.useTransition()},ne.version="19.2.8",ne}var z_;function Fd(){return z_||(z_=1,ih.exports=Yx()),ih.exports}var An=Fd(),ah={exports:{}},No={},sh={exports:{}},rh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B_;function jx(){return B_||(B_=1,(function(o){function t(z,J){var K=z.length;z.push(J);t:for(;0<K;){var St=K-1>>>1,bt=z[St];if(0<l(bt,J))z[St]=J,z[K]=bt,K=St;else break t}}function i(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var J=z[0],K=z.pop();if(K!==J){z[0]=K;t:for(var St=0,bt=z.length,N=bt>>>1;St<N;){var at=2*(St+1)-1,xt=z[at],Z=at+1,ct=z[Z];if(0>l(xt,K))Z<bt&&0>l(ct,xt)?(z[St]=ct,z[Z]=K,St=Z):(z[St]=xt,z[at]=K,St=at);else if(Z<bt&&0>l(ct,K))z[St]=ct,z[Z]=K,St=Z;else break t}}return J}function l(z,J){var K=z.sortIndex-J.sortIndex;return K!==0?K:z.id-J.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;o.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],g=1,v=null,x=3,M=!1,b=!1,R=!1,S=!1,y=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function L(z){for(var J=i(p);J!==null;){if(J.callback===null)s(p);else if(J.startTime<=z)s(p),J.sortIndex=J.expirationTime,t(m,J);else break;J=i(p)}}function Q(z){if(R=!1,L(z),!b)if(i(m)!==null)b=!0,G||(G=!0,j());else{var J=i(p);J!==null&&gt(Q,J.startTime-z)}}var G=!1,P=-1,W=5,D=-1;function C(){return S?!0:!(o.unstable_now()-D<W)}function w(){if(S=!1,G){var z=o.unstable_now();D=z;var J=!0;try{t:{b=!1,R&&(R=!1,I(P),P=-1),M=!0;var K=x;try{e:{for(L(z),v=i(m);v!==null&&!(v.expirationTime>z&&C());){var St=v.callback;if(typeof St=="function"){v.callback=null,x=v.priorityLevel;var bt=St(v.expirationTime<=z);if(z=o.unstable_now(),typeof bt=="function"){v.callback=bt,L(z),J=!0;break e}v===i(m)&&s(m),L(z)}else s(m);v=i(m)}if(v!==null)J=!0;else{var N=i(p);N!==null&&gt(Q,N.startTime-z),J=!1}}break t}finally{v=null,x=K,M=!1}J=void 0}}finally{J?j():G=!1}}}var j;if(typeof O=="function")j=function(){O(w)};else if(typeof MessageChannel<"u"){var et=new MessageChannel,mt=et.port2;et.port1.onmessage=w,j=function(){mt.postMessage(null)}}else j=function(){y(w,0)};function gt(z,J){P=y(function(){z(o.unstable_now())},J)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(z){z.callback=null},o.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<z?Math.floor(1e3/z):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_next=function(z){switch(x){case 1:case 2:case 3:var J=3;break;default:J=x}var K=x;x=J;try{return z()}finally{x=K}},o.unstable_requestPaint=function(){S=!0},o.unstable_runWithPriority=function(z,J){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=x;x=z;try{return J()}finally{x=K}},o.unstable_scheduleCallback=function(z,J,K){var St=o.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?St+K:St):K=St,z){case 1:var bt=-1;break;case 2:bt=250;break;case 5:bt=1073741823;break;case 4:bt=1e4;break;default:bt=5e3}return bt=K+bt,z={id:g++,callback:J,priorityLevel:z,startTime:K,expirationTime:bt,sortIndex:-1},K>St?(z.sortIndex=K,t(p,z),i(m)===null&&z===i(p)&&(R?(I(P),P=-1):R=!0,gt(Q,K-St))):(z.sortIndex=bt,t(m,z),b||M||(b=!0,G||(G=!0,j()))),z},o.unstable_shouldYield=C,o.unstable_wrapCallback=function(z){var J=x;return function(){var K=x;x=J;try{return z.apply(this,arguments)}finally{x=K}}}})(rh)),rh}var I_;function Zx(){return I_||(I_=1,sh.exports=jx()),sh.exports}var oh={exports:{}},Dn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var F_;function Kx(){if(F_)return Dn;F_=1;var o=Fd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var v=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:v==null?null:""+v,children:m,containerInfo:p,implementation:g}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Dn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Dn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},Dn.flushSync=function(m){var p=h.T,g=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=g,s.d.f()}},Dn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Dn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Dn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,v=d(g,p.crossOrigin),x=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:v,integrity:x,fetchPriority:M}):g==="script"&&s.d.X(m,{crossOrigin:v,integrity:x,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Dn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Dn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,v=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Dn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Dn.requestFormReset=function(m){s.d.r(m)},Dn.unstable_batchedUpdates=function(m,p){return m(p)},Dn.useFormState=function(m,p,g){return h.H.useFormState(m,p,g)},Dn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Dn.version="19.2.8",Dn}var H_;function Qx(){if(H_)return oh.exports;H_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),oh.exports=Kx(),oh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G_;function Jx(){if(G_)return No;G_=1;var o=Zx(),t=Fd(),i=Qx();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,r=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(r=u.return,r!==null){a=r;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),e;if(f===r)return m(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=u,r=f;else{for(var _=!1,E=u.child;E;){if(E===a){_=!0,a=u,r=f;break}if(E===r){_=!0,r=u,a=f;break}E=E.sibling}if(!_){for(E=f.child;E;){if(E===a){_=!0,a=f,r=u;break}if(E===r){_=!0,r=f,a=u;break}E=E.sibling}if(!_)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var v=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),b=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),O=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),G=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),W=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),w=Symbol.iterator;function j(e){return e===null||typeof e!="object"?null:(e=w&&e[w]||e["@@iterator"],typeof e=="function"?e:null)}var et=Symbol.for("react.client.reference");function mt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===et?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case y:return"Profiler";case S:return"StrictMode";case Q:return"Suspense";case G:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case b:return"Portal";case O:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case L:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:mt(e.type)||"Memo";case W:n=e._payload,e=e._init;try{return mt(e(n))}catch{}}return null}var gt=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,J=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},St=[],bt=-1;function N(e){return{current:e}}function at(e){0>bt||(e.current=St[bt],St[bt]=null,bt--)}function xt(e,n){bt++,St[bt]=e.current,e.current=n}var Z=N(null),ct=N(null),Et=N(null),yt=N(null);function Gt(e,n){switch(xt(Et,n),xt(ct,e),xt(Z,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?n_(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=n_(n),e=i_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}at(Z),xt(Z,e)}function Ft(){at(Z),at(ct),at(Et)}function ie(e){e.memoizedState!==null&&xt(yt,e);var n=Z.current,a=i_(n,e.type);n!==a&&(xt(ct,e),xt(Z,a))}function Oe(e){ct.current===e&&(at(Z),at(ct)),yt.current===e&&(at(yt),Co._currentValue=K)}var de,Ye;function F(e){if(de===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);de=n&&n[1]||"",Ye=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+de+e+Ye}var Cn=!1;function he(e,n){if(!e||Cn)return"";Cn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(ot){var nt=ot}Reflect.construct(e,[],pt)}else{try{pt.call()}catch(ot){nt=ot}e.call(pt.prototype)}}else{try{throw Error()}catch(ot){nt=ot}(pt=e())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(ot){if(ot&&nt&&typeof ot.stack=="string")return[ot.stack,nt.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),_=f[0],E=f[1];if(_&&E){var B=_.split(`
`),tt=E.split(`
`);for(u=r=0;r<B.length&&!B[r].includes("DetermineComponentFrameRoot");)r++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(r===B.length||u===tt.length)for(r=B.length-1,u=tt.length-1;1<=r&&0<=u&&B[r]!==tt[u];)u--;for(;1<=r&&0<=u;r--,u--)if(B[r]!==tt[u]){if(r!==1||u!==1)do if(r--,u--,0>u||B[r]!==tt[u]){var ut=`
`+B[r].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=r&&0<=u);break}}}finally{Cn=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?F(a):""}function ve(e,n){switch(e.tag){case 26:case 27:case 5:return F(e.type);case 16:return F("Lazy");case 13:return e.child!==n&&n!==null?F("Suspense Fallback"):F("Suspense");case 19:return F("SuspenseList");case 0:case 15:return he(e.type,!1);case 11:return he(e.type.render,!1);case 1:return he(e.type,!0);case 31:return F("Activity");default:return""}}function qt(e){try{var n="",a=null;do n+=ve(e,a),a=e,e=e.return;while(e);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Ue=Object.prototype.hasOwnProperty,Wt=o.unstable_scheduleCallback,U=o.unstable_cancelCallback,T=o.unstable_shouldYield,it=o.unstable_requestPaint,ft=o.unstable_now,Mt=o.unstable_getCurrentPriorityLevel,dt=o.unstable_ImmediatePriority,kt=o.unstable_UserBlockingPriority,wt=o.unstable_NormalPriority,zt=o.unstable_LowPriority,ye=o.unstable_IdlePriority,At=o.log,Bt=o.unstable_setDisableYieldValue,Yt=null,Xt=null;function Nt(e){if(typeof At=="function"&&Bt(e),Xt&&typeof Xt.setStrictMode=="function")try{Xt.setStrictMode(Yt,e)}catch{}}var Jt=Math.clz32?Math.clz32:k,se=Math.log,Pe=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(se(e)/Pe|0)|0}var Rt=256,lt=262144,_t=4194304;function Ct(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Dt(e,n,a){var r=e.pendingLanes;if(r===0)return 0;var u=0,f=e.suspendedLanes,_=e.pingedLanes;e=e.warmLanes;var E=r&134217727;return E!==0?(r=E&~f,r!==0?u=Ct(r):(_&=E,_!==0?u=Ct(_):a||(a=E&~e,a!==0&&(u=Ct(a))))):(E=r&~f,E!==0?u=Ct(E):_!==0?u=Ct(_):a||(a=r&~e,a!==0&&(u=Ct(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function $t(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function je(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function un(){var e=_t;return _t<<=1,(_t&62914560)===0&&(_t=4194304),e}function be(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function xn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function _i(e,n,a,r,u,f){var _=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var E=e.entanglements,B=e.expirationTimes,tt=e.hiddenUpdates;for(a=_&~a;0<a;){var ut=31-Jt(a),pt=1<<ut;E[ut]=0,B[ut]=-1;var nt=tt[ut];if(nt!==null)for(tt[ut]=null,ut=0;ut<nt.length;ut++){var ot=nt[ut];ot!==null&&(ot.lane&=-536870913)}a&=~pt}r!==0&&Hr(e,r,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(_&~n))}function Hr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var r=31-Jt(n);e.entangledLanes|=n,e.entanglements[r]=e.entanglements[r]|1073741824|a&261930}function Gr(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var r=31-Jt(a),u=1<<r;u&n|e[r]&n&&(e[r]|=n),a&=~u}}function wi(e,n){var a=n&-n;return a=(a&42)!==0?1:Za(a),(a&(e.suspendedLanes|n))!==0?0:a}function Za(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ds(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Vr(){var e=J.p;return e!==0?e:(e=window.event,e===void 0?32:A_(e.type))}function Ka(e,n){var a=J.p;try{return J.p=e,n()}finally{J.p=a}}var vi=Math.random().toString(36).slice(2),Ke="__reactFiber$"+vi,Sn="__reactProps$"+vi,Fi="__reactContainer$"+vi,kr="__reactEvents$"+vi,Zc="__reactListeners$"+vi,Kc="__reactHandles$"+vi,Wo="__reactResources$"+vi,Qa="__reactMarker$"+vi;function A(e){delete e[Ke],delete e[Sn],delete e[kr],delete e[Zc],delete e[Kc]}function X(e){var n=e[Ke];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Fi]||a[Ke]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=u_(e);e!==null;){if(a=e[Ke])return a;e=u_(e)}return n}e=a,a=e.parentNode}return null}function st(e){if(e=e[Ke]||e[Fi]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function rt(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function q(e){var n=e[Wo];return n||(n=e[Wo]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vt(e){e[Qa]=!0}var Ut=new Set,Pt={};function Ot(e,n){Kt(e,n),Kt(e+"Capture",n)}function Kt(e,n){for(Pt[e]=n,e=0;e<n.length;e++)Ut.add(n[e])}var te=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jt={},xe={};function Te(e){return Ue.call(xe,e)?!0:Ue.call(jt,e)?!1:te.test(e)?xe[e]=!0:(jt[e]=!0,!1)}function Xe(e,n,a){if(Te(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ge(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function re(e,n,a,r){if(r===null)e.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+r)}}function Ht(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function an(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ae(e,n,a){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var u=r.get,f=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Nn(e){if(!e._valueTracker){var n=an(e)?"checked":"value";e._valueTracker=Ae(e,n,""+e[n])}}function Hi(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return e&&(r=an(e)?e.checked?"true":"false":e.value),e=r,e!==a?(n.setValue(e),!0):!1}function gn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ja=/[\n"\\]/g;function pe(e){return e.replace(Ja,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function wn(e,n,a,r,u,f,_,E){e.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?e.type=_:e.removeAttribute("type"),n!=null?_==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ht(n)):e.value!==""+Ht(n)&&(e.value=""+Ht(n)):_!=="submit"&&_!=="reset"||e.removeAttribute("value"),n!=null?fn(e,_,Ht(n)):a!=null?fn(e,_,Ht(a)):r!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.name=""+Ht(E):e.removeAttribute("name")}function On(e,n,a,r,u,f,_,E){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Nn(e);return}a=a!=null?""+Ht(a):"",n=n!=null?""+Ht(n):a,E||n===e.value||(e.value=n),e.defaultValue=n}r=r??u,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=E?e.checked:!!r,e.defaultChecked=!!r,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(e.name=_),Nn(e)}function fn(e,n,a){n==="number"&&gn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function tn(e,n,a,r){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&r&&(e[a].defaultSelected=!0)}else{for(a=""+Ht(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,r&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Us(e,n,a){if(n!=null&&(n=""+Ht(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Ht(a):""}function Di(e,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(gt(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=Ht(n),e.defaultValue=a,r=e.textContent,r===a&&r!==""&&r!==null&&(e.value=r),Nn(e)}function Ls(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Iv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $d(e,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":r?e.setProperty(n,a):typeof a!="number"||a===0||Iv.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function tp(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var u in n)r=n[u],n.hasOwnProperty(u)&&a[u]!==r&&$d(e,u,r)}else for(var f in n)n.hasOwnProperty(f)&&$d(e,f,n[f])}function Qc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Fv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Hv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qo(e){return Hv.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Gi(){}var Jc=null;function $c(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ns=null,Os=null;function ep(e){var n=st(e);if(n&&(e=n.stateNode)){var a=e[Sn]||null;t:switch(e=n.stateNode,n.type){case"input":if(wn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+pe(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==e&&r.form===e.form){var u=r[Sn]||null;if(!u)throw Error(s(90));wn(r,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===e.form&&Hi(r)}break t;case"textarea":Us(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&tn(e,!!a.multiple,n,!1)}}}var tu=!1;function np(e,n,a){if(tu)return e(n,a);tu=!0;try{var r=e(n);return r}finally{if(tu=!1,(Ns!==null||Os!==null)&&(Nl(),Ns&&(n=Ns,e=Os,Os=Ns=null,ep(n),e)))for(n=0;n<e.length;n++)ep(e[n])}}function Xr(e,n){var a=e.stateNode;if(a===null)return null;var r=a[Sn]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),eu=!1;if(Vi)try{var Wr={};Object.defineProperty(Wr,"passive",{get:function(){eu=!0}}),window.addEventListener("test",Wr,Wr),window.removeEventListener("test",Wr,Wr)}catch{eu=!1}var ma=null,nu=null,Yo=null;function ip(){if(Yo)return Yo;var e,n=nu,a=n.length,r,u="value"in ma?ma.value:ma.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var _=a-e;for(r=1;r<=_&&n[a-r]===u[f-r];r++);return Yo=u.slice(e,1<r?1-r:void 0)}function jo(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Zo(){return!0}function ap(){return!1}function In(e){function n(a,r,u,f,_){this._reactName=a,this._targetInst=u,this.type=r,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var E in e)e.hasOwnProperty(E)&&(a=e[E],this[E]=a?a(f):f[E]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Zo:ap,this.isPropagationStopped=ap,this}return v(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Zo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Zo)},persist:function(){},isPersistent:Zo}),n}var $a={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ko=In($a),qr=v({},$a,{view:0,detail:0}),Gv=In(qr),iu,au,Yr,Qo=v({},qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ru,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yr&&(Yr&&e.type==="mousemove"?(iu=e.screenX-Yr.screenX,au=e.screenY-Yr.screenY):au=iu=0,Yr=e),iu)},movementY:function(e){return"movementY"in e?e.movementY:au}}),sp=In(Qo),Vv=v({},Qo,{dataTransfer:0}),kv=In(Vv),Xv=v({},qr,{relatedTarget:0}),su=In(Xv),Wv=v({},$a,{animationName:0,elapsedTime:0,pseudoElement:0}),qv=In(Wv),Yv=v({},$a,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jv=In(Yv),Zv=v({},$a,{data:0}),rp=In(Zv),Kv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Qv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $v(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Jv[e])?!!n[e]:!1}function ru(){return $v}var ty=v({},qr,{key:function(e){if(e.key){var n=Kv[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=jo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Qv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ru,charCode:function(e){return e.type==="keypress"?jo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?jo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ey=In(ty),ny=v({},Qo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),op=In(ny),iy=v({},qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ru}),ay=In(iy),sy=v({},$a,{propertyName:0,elapsedTime:0,pseudoElement:0}),ry=In(sy),oy=v({},Qo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ly=In(oy),cy=v({},$a,{newState:0,oldState:0}),uy=In(cy),fy=[9,13,27,32],ou=Vi&&"CompositionEvent"in window,jr=null;Vi&&"documentMode"in document&&(jr=document.documentMode);var hy=Vi&&"TextEvent"in window&&!jr,lp=Vi&&(!ou||jr&&8<jr&&11>=jr),cp=" ",up=!1;function fp(e,n){switch(e){case"keyup":return fy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ps=!1;function dy(e,n){switch(e){case"compositionend":return hp(n);case"keypress":return n.which!==32?null:(up=!0,cp);case"textInput":return e=n.data,e===cp&&up?null:e;default:return null}}function py(e,n){if(Ps)return e==="compositionend"||!ou&&fp(e,n)?(e=ip(),Yo=nu=ma=null,Ps=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return lp&&n.locale!=="ko"?null:n.data;default:return null}}var my={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!my[e.type]:n==="textarea"}function pp(e,n,a,r){Ns?Os?Os.push(r):Os=[r]:Ns=r,n=Hl(n,"onChange"),0<n.length&&(a=new Ko("onChange","change",null,a,r),e.push({event:a,listeners:n}))}var Zr=null,Kr=null;function gy(e){Kg(e,0)}function Jo(e){var n=rt(e);if(Hi(n))return e}function mp(e,n){if(e==="change")return n}var gp=!1;if(Vi){var lu;if(Vi){var cu="oninput"in document;if(!cu){var _p=document.createElement("div");_p.setAttribute("oninput","return;"),cu=typeof _p.oninput=="function"}lu=cu}else lu=!1;gp=lu&&(!document.documentMode||9<document.documentMode)}function vp(){Zr&&(Zr.detachEvent("onpropertychange",yp),Kr=Zr=null)}function yp(e){if(e.propertyName==="value"&&Jo(Kr)){var n=[];pp(n,Kr,e,$c(e)),np(gy,n)}}function _y(e,n,a){e==="focusin"?(vp(),Zr=n,Kr=a,Zr.attachEvent("onpropertychange",yp)):e==="focusout"&&vp()}function vy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Jo(Kr)}function yy(e,n){if(e==="click")return Jo(n)}function xy(e,n){if(e==="input"||e==="change")return Jo(n)}function Sy(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Kn=typeof Object.is=="function"?Object.is:Sy;function Qr(e,n){if(Kn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var u=a[r];if(!Ue.call(n,u)||!Kn(e[u],n[u]))return!1}return!0}function xp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sp(e,n){var a=xp(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=n&&r>=n)return{node:a,offset:n-e};e=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=xp(a)}}function Mp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Mp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ep(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=gn(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=gn(e.document)}return n}function uu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var My=Vi&&"documentMode"in document&&11>=document.documentMode,zs=null,fu=null,Jr=null,hu=!1;function bp(e,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;hu||zs==null||zs!==gn(r)||(r=zs,"selectionStart"in r&&uu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jr&&Qr(Jr,r)||(Jr=r,r=Hl(fu,"onSelect"),0<r.length&&(n=new Ko("onSelect","select",null,n,a),e.push({event:n,listeners:r}),n.target=zs)))}function ts(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Bs={animationend:ts("Animation","AnimationEnd"),animationiteration:ts("Animation","AnimationIteration"),animationstart:ts("Animation","AnimationStart"),transitionrun:ts("Transition","TransitionRun"),transitionstart:ts("Transition","TransitionStart"),transitioncancel:ts("Transition","TransitionCancel"),transitionend:ts("Transition","TransitionEnd")},du={},Tp={};Vi&&(Tp=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function es(e){if(du[e])return du[e];if(!Bs[e])return e;var n=Bs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Tp)return du[e]=n[a];return e}var Ap=es("animationend"),Rp=es("animationiteration"),Cp=es("animationstart"),Ey=es("transitionrun"),by=es("transitionstart"),Ty=es("transitioncancel"),wp=es("transitionend"),Dp=new Map,pu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");pu.push("scrollEnd");function yi(e,n){Dp.set(e,n),Ot(n,[e])}var $o=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ri=[],Is=0,mu=0;function tl(){for(var e=Is,n=mu=Is=0;n<e;){var a=ri[n];ri[n++]=null;var r=ri[n];ri[n++]=null;var u=ri[n];ri[n++]=null;var f=ri[n];if(ri[n++]=null,r!==null&&u!==null){var _=r.pending;_===null?u.next=u:(u.next=_.next,_.next=u),r.pending=u}f!==0&&Up(a,u,f)}}function el(e,n,a,r){ri[Is++]=e,ri[Is++]=n,ri[Is++]=a,ri[Is++]=r,mu|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function gu(e,n,a,r){return el(e,n,a,r),nl(e)}function ns(e,n){return el(e,null,null,n),nl(e)}function Up(e,n,a){e.lanes|=a;var r=e.alternate;r!==null&&(r.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-Jt(a),e=f.hiddenUpdates,r=e[u],r===null?e[u]=[n]:r.push(n),n.lane=a|536870912),f):null}function nl(e){if(50<So)throw So=0,Af=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Fs={};function Ay(e,n,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qn(e,n,a,r){return new Ay(e,n,a,r)}function _u(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ki(e,n){var a=e.alternate;return a===null?(a=Qn(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Lp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function il(e,n,a,r,u,f){var _=0;if(r=e,typeof e=="function")_u(e)&&(_=1);else if(typeof e=="string")_=Ux(e,a,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=Qn(31,a,n,u),e.elementType=D,e.lanes=f,e;case R:return is(a.children,u,f,n);case S:_=8,u|=24;break;case y:return e=Qn(12,a,n,u|2),e.elementType=y,e.lanes=f,e;case Q:return e=Qn(13,a,n,u),e.elementType=Q,e.lanes=f,e;case G:return e=Qn(19,a,n,u),e.elementType=G,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case O:_=10;break t;case I:_=9;break t;case L:_=11;break t;case P:_=14;break t;case W:_=16,r=null;break t}_=29,a=Error(s(130,e===null?"null":typeof e,"")),r=null}return n=Qn(_,a,n,u),n.elementType=e,n.type=r,n.lanes=f,n}function is(e,n,a,r){return e=Qn(7,e,r,n),e.lanes=a,e}function vu(e,n,a){return e=Qn(6,e,null,n),e.lanes=a,e}function Np(e){var n=Qn(18,null,null,0);return n.stateNode=e,n}function yu(e,n,a){return n=Qn(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Op=new WeakMap;function oi(e,n){if(typeof e=="object"&&e!==null){var a=Op.get(e);return a!==void 0?a:(n={value:e,source:n,stack:qt(n)},Op.set(e,n),n)}return{value:e,source:n,stack:qt(n)}}var Hs=[],Gs=0,al=null,$r=0,li=[],ci=0,ga=null,Ui=1,Li="";function Xi(e,n){Hs[Gs++]=$r,Hs[Gs++]=al,al=e,$r=n}function Pp(e,n,a){li[ci++]=Ui,li[ci++]=Li,li[ci++]=ga,ga=e;var r=Ui;e=Li;var u=32-Jt(r)-1;r&=~(1<<u),a+=1;var f=32-Jt(n)+u;if(30<f){var _=u-u%5;f=(r&(1<<_)-1).toString(32),r>>=_,u-=_,Ui=1<<32-Jt(n)+u|a<<u|r,Li=f+e}else Ui=1<<f|a<<u|r,Li=e}function xu(e){e.return!==null&&(Xi(e,1),Pp(e,1,0))}function Su(e){for(;e===al;)al=Hs[--Gs],Hs[Gs]=null,$r=Hs[--Gs],Hs[Gs]=null;for(;e===ga;)ga=li[--ci],li[ci]=null,Li=li[--ci],li[ci]=null,Ui=li[--ci],li[ci]=null}function zp(e,n){li[ci++]=Ui,li[ci++]=Li,li[ci++]=ga,Ui=n.id,Li=n.overflow,ga=e}var Mn=null,We=null,Ee=!1,_a=null,ui=!1,Mu=Error(s(519));function va(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw to(oi(n,e)),Mu}function Bp(e){var n=e.stateNode,a=e.type,r=e.memoizedProps;switch(n[Ke]=e,n[Sn]=r,a){case"dialog":ge("cancel",n),ge("close",n);break;case"iframe":case"object":case"embed":ge("load",n);break;case"video":case"audio":for(a=0;a<Eo.length;a++)ge(Eo[a],n);break;case"source":ge("error",n);break;case"img":case"image":case"link":ge("error",n),ge("load",n);break;case"details":ge("toggle",n);break;case"input":ge("invalid",n),On(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":ge("invalid",n);break;case"textarea":ge("invalid",n),Di(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||t_(n.textContent,a)?(r.popover!=null&&(ge("beforetoggle",n),ge("toggle",n)),r.onScroll!=null&&ge("scroll",n),r.onScrollEnd!=null&&ge("scrollend",n),r.onClick!=null&&(n.onclick=Gi),n=!0):n=!1,n||va(e,!0)}function Ip(e){for(Mn=e.return;Mn;)switch(Mn.tag){case 5:case 31:case 13:ui=!1;return;case 27:case 3:ui=!0;return;default:Mn=Mn.return}}function Vs(e){if(e!==Mn)return!1;if(!Ee)return Ip(e),Ee=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Gf(e.type,e.memoizedProps)),a=!a),a&&We&&va(e),Ip(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));We=c_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));We=c_(e)}else n===27?(n=We,La(e.type)?(e=qf,qf=null,We=e):We=n):We=Mn?hi(e.stateNode.nextSibling):null;return!0}function as(){We=Mn=null,Ee=!1}function Eu(){var e=_a;return e!==null&&(Vn===null?Vn=e:Vn.push.apply(Vn,e),_a=null),e}function to(e){_a===null?_a=[e]:_a.push(e)}var bu=N(null),ss=null,Wi=null;function ya(e,n,a){xt(bu,n._currentValue),n._currentValue=a}function qi(e){e._currentValue=bu.current,at(bu)}function Tu(e,n,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===a)break;e=e.return}}function Au(e,n,a,r){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var _=u.child;f=f.firstContext;t:for(;f!==null;){var E=f;f=u;for(var B=0;B<n.length;B++)if(E.context===n[B]){f.lanes|=a,E=f.alternate,E!==null&&(E.lanes|=a),Tu(f.return,a,e),r||(_=null);break t}f=E.next}}else if(u.tag===18){if(_=u.return,_===null)throw Error(s(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),Tu(_,a,e),_=null}else _=u.child;if(_!==null)_.return=u;else for(_=u;_!==null;){if(_===e){_=null;break}if(u=_.sibling,u!==null){u.return=_.return,_=u;break}_=_.return}u=_}}function ks(e,n,a,r){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var _=u.alternate;if(_===null)throw Error(s(387));if(_=_.memoizedProps,_!==null){var E=u.type;Kn(u.pendingProps.value,_.value)||(e!==null?e.push(E):e=[E])}}else if(u===yt.current){if(_=u.alternate,_===null)throw Error(s(387));_.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Co):e=[Co])}u=u.return}e!==null&&Au(n,e,a,r),n.flags|=262144}function sl(e){for(e=e.firstContext;e!==null;){if(!Kn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function rs(e){ss=e,Wi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function En(e){return Fp(ss,e)}function rl(e,n){return ss===null&&rs(e),Fp(e,n)}function Fp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Wi===null){if(e===null)throw Error(s(308));Wi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Wi=Wi.next=n;return a}var Ry=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,r){e.push(r)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Cy=o.unstable_scheduleCallback,wy=o.unstable_NormalPriority,sn={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ru(){return{controller:new Ry,data:new Map,refCount:0}}function eo(e){e.refCount--,e.refCount===0&&Cy(wy,function(){e.controller.abort()})}var no=null,Cu=0,Xs=0,Ws=null;function Dy(e,n){if(no===null){var a=no=[];Cu=0,Xs=Lf(),Ws={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Cu++,n.then(Hp,Hp),n}function Hp(){if(--Cu===0&&no!==null){Ws!==null&&(Ws.status="fulfilled");var e=no;no=null,Xs=0,Ws=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Uy(e,n){var a=[],r={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){r.status="fulfilled",r.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(r.status="rejected",r.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),r}var Gp=z.S;z.S=function(e,n){bg=ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Dy(e,n),Gp!==null&&Gp(e,n)};var os=N(null);function wu(){var e=os.current;return e!==null?e:Ve.pooledCache}function ol(e,n){n===null?xt(os,os.current):xt(os,n.pool)}function Vp(){var e=wu();return e===null?null:{parent:sn._currentValue,pool:e}}var qs=Error(s(460)),Du=Error(s(474)),ll=Error(s(542)),cl={then:function(){}};function kp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Xp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Gi,Gi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,qp(e),e;default:if(typeof n.status=="string")n.then(Gi,Gi);else{if(e=Ve,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(r){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=r}},function(r){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,qp(e),e}throw cs=n,qs}}function ls(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(cs=a,qs):a}}var cs=null;function Wp(){if(cs===null)throw Error(s(459));var e=cs;return cs=null,e}function qp(e){if(e===qs||e===ll)throw Error(s(483))}var Ys=null,io=0;function ul(e){var n=io;return io+=1,Ys===null&&(Ys=[]),Xp(Ys,e,n)}function ao(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function fl(e,n){throw n.$$typeof===x?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Yp(e){function n(Y,H){if(e){var $=Y.deletions;$===null?(Y.deletions=[H],Y.flags|=16):$.push(H)}}function a(Y,H){if(!e)return null;for(;H!==null;)n(Y,H),H=H.sibling;return null}function r(Y){for(var H=new Map;Y!==null;)Y.key!==null?H.set(Y.key,Y):H.set(Y.index,Y),Y=Y.sibling;return H}function u(Y,H){return Y=ki(Y,H),Y.index=0,Y.sibling=null,Y}function f(Y,H,$){return Y.index=$,e?($=Y.alternate,$!==null?($=$.index,$<H?(Y.flags|=67108866,H):$):(Y.flags|=67108866,H)):(Y.flags|=1048576,H)}function _(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function E(Y,H,$,ht){return H===null||H.tag!==6?(H=vu($,Y.mode,ht),H.return=Y,H):(H=u(H,$),H.return=Y,H)}function B(Y,H,$,ht){var Zt=$.type;return Zt===R?ut(Y,H,$.props.children,ht,$.key):H!==null&&(H.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===W&&ls(Zt)===H.type)?(H=u(H,$.props),ao(H,$),H.return=Y,H):(H=il($.type,$.key,$.props,null,Y.mode,ht),ao(H,$),H.return=Y,H)}function tt(Y,H,$,ht){return H===null||H.tag!==4||H.stateNode.containerInfo!==$.containerInfo||H.stateNode.implementation!==$.implementation?(H=yu($,Y.mode,ht),H.return=Y,H):(H=u(H,$.children||[]),H.return=Y,H)}function ut(Y,H,$,ht,Zt){return H===null||H.tag!==7?(H=is($,Y.mode,ht,Zt),H.return=Y,H):(H=u(H,$),H.return=Y,H)}function pt(Y,H,$){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return H=vu(""+H,Y.mode,$),H.return=Y,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case M:return $=il(H.type,H.key,H.props,null,Y.mode,$),ao($,H),$.return=Y,$;case b:return H=yu(H,Y.mode,$),H.return=Y,H;case W:return H=ls(H),pt(Y,H,$)}if(gt(H)||j(H))return H=is(H,Y.mode,$,null),H.return=Y,H;if(typeof H.then=="function")return pt(Y,ul(H),$);if(H.$$typeof===O)return pt(Y,rl(Y,H),$);fl(Y,H)}return null}function nt(Y,H,$,ht){var Zt=H!==null?H.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Zt!==null?null:E(Y,H,""+$,ht);if(typeof $=="object"&&$!==null){switch($.$$typeof){case M:return $.key===Zt?B(Y,H,$,ht):null;case b:return $.key===Zt?tt(Y,H,$,ht):null;case W:return $=ls($),nt(Y,H,$,ht)}if(gt($)||j($))return Zt!==null?null:ut(Y,H,$,ht,null);if(typeof $.then=="function")return nt(Y,H,ul($),ht);if($.$$typeof===O)return nt(Y,H,rl(Y,$),ht);fl(Y,$)}return null}function ot(Y,H,$,ht,Zt){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return Y=Y.get($)||null,E(H,Y,""+ht,Zt);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case M:return Y=Y.get(ht.key===null?$:ht.key)||null,B(H,Y,ht,Zt);case b:return Y=Y.get(ht.key===null?$:ht.key)||null,tt(H,Y,ht,Zt);case W:return ht=ls(ht),ot(Y,H,$,ht,Zt)}if(gt(ht)||j(ht))return Y=Y.get($)||null,ut(H,Y,ht,Zt,null);if(typeof ht.then=="function")return ot(Y,H,$,ul(ht),Zt);if(ht.$$typeof===O)return ot(Y,H,$,rl(H,ht),Zt);fl(H,ht)}return null}function It(Y,H,$,ht){for(var Zt=null,Re=null,Vt=H,le=H=0,Me=null;Vt!==null&&le<$.length;le++){Vt.index>le?(Me=Vt,Vt=null):Me=Vt.sibling;var Ce=nt(Y,Vt,$[le],ht);if(Ce===null){Vt===null&&(Vt=Me);break}e&&Vt&&Ce.alternate===null&&n(Y,Vt),H=f(Ce,H,le),Re===null?Zt=Ce:Re.sibling=Ce,Re=Ce,Vt=Me}if(le===$.length)return a(Y,Vt),Ee&&Xi(Y,le),Zt;if(Vt===null){for(;le<$.length;le++)Vt=pt(Y,$[le],ht),Vt!==null&&(H=f(Vt,H,le),Re===null?Zt=Vt:Re.sibling=Vt,Re=Vt);return Ee&&Xi(Y,le),Zt}for(Vt=r(Vt);le<$.length;le++)Me=ot(Vt,Y,le,$[le],ht),Me!==null&&(e&&Me.alternate!==null&&Vt.delete(Me.key===null?le:Me.key),H=f(Me,H,le),Re===null?Zt=Me:Re.sibling=Me,Re=Me);return e&&Vt.forEach(function(Ba){return n(Y,Ba)}),Ee&&Xi(Y,le),Zt}function Qt(Y,H,$,ht){if($==null)throw Error(s(151));for(var Zt=null,Re=null,Vt=H,le=H=0,Me=null,Ce=$.next();Vt!==null&&!Ce.done;le++,Ce=$.next()){Vt.index>le?(Me=Vt,Vt=null):Me=Vt.sibling;var Ba=nt(Y,Vt,Ce.value,ht);if(Ba===null){Vt===null&&(Vt=Me);break}e&&Vt&&Ba.alternate===null&&n(Y,Vt),H=f(Ba,H,le),Re===null?Zt=Ba:Re.sibling=Ba,Re=Ba,Vt=Me}if(Ce.done)return a(Y,Vt),Ee&&Xi(Y,le),Zt;if(Vt===null){for(;!Ce.done;le++,Ce=$.next())Ce=pt(Y,Ce.value,ht),Ce!==null&&(H=f(Ce,H,le),Re===null?Zt=Ce:Re.sibling=Ce,Re=Ce);return Ee&&Xi(Y,le),Zt}for(Vt=r(Vt);!Ce.done;le++,Ce=$.next())Ce=ot(Vt,Y,le,Ce.value,ht),Ce!==null&&(e&&Ce.alternate!==null&&Vt.delete(Ce.key===null?le:Ce.key),H=f(Ce,H,le),Re===null?Zt=Ce:Re.sibling=Ce,Re=Ce);return e&&Vt.forEach(function(Vx){return n(Y,Vx)}),Ee&&Xi(Y,le),Zt}function Ie(Y,H,$,ht){if(typeof $=="object"&&$!==null&&$.type===R&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case M:t:{for(var Zt=$.key;H!==null;){if(H.key===Zt){if(Zt=$.type,Zt===R){if(H.tag===7){a(Y,H.sibling),ht=u(H,$.props.children),ht.return=Y,Y=ht;break t}}else if(H.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===W&&ls(Zt)===H.type){a(Y,H.sibling),ht=u(H,$.props),ao(ht,$),ht.return=Y,Y=ht;break t}a(Y,H);break}else n(Y,H);H=H.sibling}$.type===R?(ht=is($.props.children,Y.mode,ht,$.key),ht.return=Y,Y=ht):(ht=il($.type,$.key,$.props,null,Y.mode,ht),ao(ht,$),ht.return=Y,Y=ht)}return _(Y);case b:t:{for(Zt=$.key;H!==null;){if(H.key===Zt)if(H.tag===4&&H.stateNode.containerInfo===$.containerInfo&&H.stateNode.implementation===$.implementation){a(Y,H.sibling),ht=u(H,$.children||[]),ht.return=Y,Y=ht;break t}else{a(Y,H);break}else n(Y,H);H=H.sibling}ht=yu($,Y.mode,ht),ht.return=Y,Y=ht}return _(Y);case W:return $=ls($),Ie(Y,H,$,ht)}if(gt($))return It(Y,H,$,ht);if(j($)){if(Zt=j($),typeof Zt!="function")throw Error(s(150));return $=Zt.call($),Qt(Y,H,$,ht)}if(typeof $.then=="function")return Ie(Y,H,ul($),ht);if($.$$typeof===O)return Ie(Y,H,rl(Y,$),ht);fl(Y,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,H!==null&&H.tag===6?(a(Y,H.sibling),ht=u(H,$),ht.return=Y,Y=ht):(a(Y,H),ht=vu($,Y.mode,ht),ht.return=Y,Y=ht),_(Y)):a(Y,H)}return function(Y,H,$,ht){try{io=0;var Zt=Ie(Y,H,$,ht);return Ys=null,Zt}catch(Vt){if(Vt===qs||Vt===ll)throw Vt;var Re=Qn(29,Vt,null,Y.mode);return Re.lanes=ht,Re.return=Y,Re}finally{}}}var us=Yp(!0),jp=Yp(!1),xa=!1;function Uu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Lu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Sa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ma(e,n,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(De&2)!==0){var u=r.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),r.pending=n,n=nl(e),Up(e,null,a),n}return el(e,r,n,a),nl(e)}function so(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Gr(e,a)}}function Nu(e,n){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:r.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Ou=!1;function ro(){if(Ou){var e=Ws;if(e!==null)throw e}}function oo(e,n,a,r){Ou=!1;var u=e.updateQueue;xa=!1;var f=u.firstBaseUpdate,_=u.lastBaseUpdate,E=u.shared.pending;if(E!==null){u.shared.pending=null;var B=E,tt=B.next;B.next=null,_===null?f=tt:_.next=tt,_=B;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,E=ut.lastBaseUpdate,E!==_&&(E===null?ut.firstBaseUpdate=tt:E.next=tt,ut.lastBaseUpdate=B))}if(f!==null){var pt=u.baseState;_=0,ut=tt=B=null,E=f;do{var nt=E.lane&-536870913,ot=nt!==E.lane;if(ot?(Se&nt)===nt:(r&nt)===nt){nt!==0&&nt===Xs&&(Ou=!0),ut!==null&&(ut=ut.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var It=e,Qt=E;nt=n;var Ie=a;switch(Qt.tag){case 1:if(It=Qt.payload,typeof It=="function"){pt=It.call(Ie,pt,nt);break t}pt=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Qt.payload,nt=typeof It=="function"?It.call(Ie,pt,nt):It,nt==null)break t;pt=v({},pt,nt);break t;case 2:xa=!0}}nt=E.callback,nt!==null&&(e.flags|=64,ot&&(e.flags|=8192),ot=u.callbacks,ot===null?u.callbacks=[nt]:ot.push(nt))}else ot={lane:nt,tag:E.tag,payload:E.payload,callback:E.callback,next:null},ut===null?(tt=ut=ot,B=pt):ut=ut.next=ot,_|=nt;if(E=E.next,E===null){if(E=u.shared.pending,E===null)break;ot=E,E=ot.next,ot.next=null,u.lastBaseUpdate=ot,u.shared.pending=null}}while(!0);ut===null&&(B=pt),u.baseState=B,u.firstBaseUpdate=tt,u.lastBaseUpdate=ut,f===null&&(u.shared.lanes=0),Ra|=_,e.lanes=_,e.memoizedState=pt}}function Zp(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Kp(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)Zp(a[e],n)}var js=N(null),hl=N(0);function Qp(e,n){e=ea,xt(hl,e),xt(js,n),ea=e|n.baseLanes}function Pu(){xt(hl,ea),xt(js,js.current)}function zu(){ea=hl.current,at(js),at(hl)}var Jn=N(null),fi=null;function Ea(e){var n=e.alternate;xt(en,en.current&1),xt(Jn,e),fi===null&&(n===null||js.current!==null||n.memoizedState!==null)&&(fi=e)}function Bu(e){xt(en,en.current),xt(Jn,e),fi===null&&(fi=e)}function Jp(e){e.tag===22?(xt(en,en.current),xt(Jn,e),fi===null&&(fi=e)):ba()}function ba(){xt(en,en.current),xt(Jn,Jn.current)}function $n(e){at(Jn),fi===e&&(fi=null),at(en)}var en=N(0);function dl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Xf(a)||Wf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Yi=0,oe=null,ze=null,rn=null,pl=!1,Zs=!1,fs=!1,ml=0,lo=0,Ks=null,Ly=0;function Qe(){throw Error(s(321))}function Iu(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Kn(e[a],n[a]))return!1;return!0}function Fu(e,n,a,r,u,f){return Yi=f,oe=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=e===null||e.memoizedState===null?Pm:tf,fs=!1,f=a(r,u),fs=!1,Zs&&(f=tm(n,a,r,u)),$p(e),f}function $p(e){z.H=fo;var n=ze!==null&&ze.next!==null;if(Yi=0,rn=ze=oe=null,pl=!1,lo=0,Ks=null,n)throw Error(s(300));e===null||on||(e=e.dependencies,e!==null&&sl(e)&&(on=!0))}function tm(e,n,a,r){oe=e;var u=0;do{if(Zs&&(Ks=null),lo=0,Zs=!1,25<=u)throw Error(s(301));if(u+=1,rn=ze=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}z.H=zm,f=n(a,r)}while(Zs);return f}function Ny(){var e=z.H,n=e.useState()[0];return n=typeof n.then=="function"?co(n):n,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(oe.flags|=1024),n}function Hu(){var e=ml!==0;return ml=0,e}function Gu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Vu(e){if(pl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}pl=!1}Yi=0,rn=ze=oe=null,Zs=!1,lo=ml=0,Ks=null}function Pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?oe.memoizedState=rn=e:rn=rn.next=e,rn}function nn(){if(ze===null){var e=oe.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var n=rn===null?oe.memoizedState:rn.next;if(n!==null)rn=n,ze=e;else{if(e===null)throw oe.alternate===null?Error(s(467)):Error(s(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},rn===null?oe.memoizedState=rn=e:rn=rn.next=e}return rn}function gl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function co(e){var n=lo;return lo+=1,Ks===null&&(Ks=[]),e=Xp(Ks,e,n),n=oe,(rn===null?n.memoizedState:rn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?Pm:tf),e}function _l(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return co(e);if(e.$$typeof===O)return En(e)}throw Error(s(438,String(e)))}function ku(e){var n=null,a=oe.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=oe.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=gl(),oe.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),r=0;r<e;r++)a[r]=C;return n.index++,a}function ji(e,n){return typeof n=="function"?n(e):n}function vl(e){var n=nn();return Xu(n,ze,e)}function Xu(e,n,a){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var u=e.baseQueue,f=r.pending;if(f!==null){if(u!==null){var _=u.next;u.next=f.next,f.next=_}n.baseQueue=u=f,r.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var E=_=null,B=null,tt=n,ut=!1;do{var pt=tt.lane&-536870913;if(pt!==tt.lane?(Se&pt)===pt:(Yi&pt)===pt){var nt=tt.revertLane;if(nt===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),pt===Xs&&(ut=!0);else if((Yi&nt)===nt){tt=tt.next,nt===Xs&&(ut=!0);continue}else pt={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(E=B=pt,_=f):B=B.next=pt,oe.lanes|=nt,Ra|=nt;pt=tt.action,fs&&a(f,pt),f=tt.hasEagerState?tt.eagerState:a(f,pt)}else nt={lane:pt,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(E=B=nt,_=f):B=B.next=nt,oe.lanes|=pt,Ra|=pt;tt=tt.next}while(tt!==null&&tt!==n);if(B===null?_=f:B.next=E,!Kn(f,e.memoizedState)&&(on=!0,ut&&(a=Ws,a!==null)))throw a;e.memoizedState=f,e.baseState=_,e.baseQueue=B,r.lastRenderedState=f}return u===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Wu(e){var n=nn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var r=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var _=u=u.next;do f=e(f,_.action),_=_.next;while(_!==u);Kn(f,n.memoizedState)||(on=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function em(e,n,a){var r=oe,u=nn(),f=Ee;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var _=!Kn((ze||u).memoizedState,a);if(_&&(u.memoizedState=a,on=!0),u=u.queue,ju(am.bind(null,r,u,e),[e]),u.getSnapshot!==n||_||rn!==null&&rn.memoizedState.tag&1){if(r.flags|=2048,Qs(9,{destroy:void 0},im.bind(null,r,u,a,n),null),Ve===null)throw Error(s(349));f||(Yi&127)!==0||nm(r,n,a)}return a}function nm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=oe.updateQueue,n===null?(n=gl(),oe.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function im(e,n,a,r){n.value=a,n.getSnapshot=r,sm(n)&&rm(e)}function am(e,n,a){return a(function(){sm(n)&&rm(e)})}function sm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Kn(e,a)}catch{return!0}}function rm(e){var n=ns(e,2);n!==null&&kn(n,e,2)}function qu(e){var n=Pn();if(typeof e=="function"){var a=e;if(e=a(),fs){Nt(!0);try{a()}finally{Nt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ji,lastRenderedState:e},n}function om(e,n,a,r){return e.baseState=a,Xu(e,ze,typeof r=="function"?r:ji)}function Oy(e,n,a,r,u){if(Sl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};z.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,lm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function lm(e,n){var a=n.action,r=n.payload,u=e.state;if(n.isTransition){var f=z.T,_={};z.T=_;try{var E=a(u,r),B=z.S;B!==null&&B(_,E),cm(e,n,E)}catch(tt){Yu(e,n,tt)}finally{f!==null&&_.types!==null&&(f.types=_.types),z.T=f}}else try{f=a(u,r),cm(e,n,f)}catch(tt){Yu(e,n,tt)}}function cm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){um(e,n,r)},function(r){return Yu(e,n,r)}):um(e,n,a)}function um(e,n,a){n.status="fulfilled",n.value=a,fm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,lm(e,a)))}function Yu(e,n,a){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,fm(n),n=n.next;while(n!==r)}e.action=null}function fm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function hm(e,n){return n}function dm(e,n){if(Ee){var a=Ve.formState;if(a!==null){t:{var r=oe;if(Ee){if(We){e:{for(var u=We,f=ui;u.nodeType!==8;){if(!f){u=null;break e}if(u=hi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){We=hi(u.nextSibling),r=u.data==="F!";break t}}va(r)}r=!1}r&&(n=a[0])}}return a=Pn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hm,lastRenderedState:n},a.queue=r,a=Lm.bind(null,oe,r),r.dispatch=a,r=qu(!1),f=$u.bind(null,oe,!1,r.queue),r=Pn(),u={state:n,dispatch:null,action:e,pending:null},r.queue=u,a=Oy.bind(null,oe,u,f,a),u.dispatch=a,r.memoizedState=e,[n,a,!1]}function pm(e){var n=nn();return mm(n,ze,e)}function mm(e,n,a){if(n=Xu(e,n,hm)[0],e=vl(ji)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=co(n)}catch(_){throw _===qs?ll:_}else r=n;n=nn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(oe.flags|=2048,Qs(9,{destroy:void 0},Py.bind(null,u,a),null)),[r,f,e]}function Py(e,n){e.action=n}function gm(e){var n=nn(),a=ze;if(a!==null)return mm(n,a,e);nn(),n=n.memoizedState,a=nn();var r=a.queue.dispatch;return a.memoizedState=e,[n,r,!1]}function Qs(e,n,a,r){return e={tag:e,create:a,deps:r,inst:n,next:null},n=oe.updateQueue,n===null&&(n=gl(),oe.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,n.lastEffect=e),e}function _m(){return nn().memoizedState}function yl(e,n,a,r){var u=Pn();oe.flags|=e,u.memoizedState=Qs(1|n,{destroy:void 0},a,r===void 0?null:r)}function xl(e,n,a,r){var u=nn();r=r===void 0?null:r;var f=u.memoizedState.inst;ze!==null&&r!==null&&Iu(r,ze.memoizedState.deps)?u.memoizedState=Qs(n,f,a,r):(oe.flags|=e,u.memoizedState=Qs(1|n,f,a,r))}function vm(e,n){yl(8390656,8,e,n)}function ju(e,n){xl(2048,8,e,n)}function zy(e){oe.flags|=4;var n=oe.updateQueue;if(n===null)n=gl(),oe.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function ym(e){var n=nn().memoizedState;return zy({ref:n,nextImpl:e}),function(){if((De&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function xm(e,n){return xl(4,2,e,n)}function Sm(e,n){return xl(4,4,e,n)}function Mm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Em(e,n,a){a=a!=null?a.concat([e]):null,xl(4,4,Mm.bind(null,n,e),a)}function Zu(){}function bm(e,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Iu(n,r[1])?r[0]:(a.memoizedState=[e,n],e)}function Tm(e,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Iu(n,r[1]))return r[0];if(r=e(),fs){Nt(!0);try{e()}finally{Nt(!1)}}return a.memoizedState=[r,n],r}function Ku(e,n,a){return a===void 0||(Yi&1073741824)!==0&&(Se&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=Ag(),oe.lanes|=e,Ra|=e,a)}function Am(e,n,a,r){return Kn(a,n)?a:js.current!==null?(e=Ku(e,a,r),Kn(e,n)||(on=!0),e):(Yi&42)===0||(Yi&1073741824)!==0&&(Se&261930)===0?(on=!0,e.memoizedState=a):(e=Ag(),oe.lanes|=e,Ra|=e,n)}function Rm(e,n,a,r,u){var f=J.p;J.p=f!==0&&8>f?f:8;var _=z.T,E={};z.T=E,$u(e,!1,n,a);try{var B=u(),tt=z.S;if(tt!==null&&tt(E,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ut=Uy(B,r);uo(e,n,ut,ni(e))}else uo(e,n,r,ni(e))}catch(pt){uo(e,n,{then:function(){},status:"rejected",reason:pt},ni())}finally{J.p=f,_!==null&&E.types!==null&&(_.types=E.types),z.T=_}}function By(){}function Qu(e,n,a,r){if(e.tag!==5)throw Error(s(476));var u=Cm(e).queue;Rm(e,u,n,K,a===null?By:function(){return wm(e),a(r)})}function Cm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ji,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ji,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function wm(e){var n=Cm(e);n.next===null&&(n=e.alternate.memoizedState),uo(e,n.next.queue,{},ni())}function Ju(){return En(Co)}function Dm(){return nn().memoizedState}function Um(){return nn().memoizedState}function Iy(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=ni();e=Sa(a);var r=Ma(n,e,a);r!==null&&(kn(r,n,a),so(r,n,a)),n={cache:Ru()},e.payload=n;return}n=n.return}}function Fy(e,n,a){var r=ni();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Sl(e)?Nm(n,a):(a=gu(e,n,a,r),a!==null&&(kn(a,e,r),Om(a,n,r)))}function Lm(e,n,a){var r=ni();uo(e,n,a,r)}function uo(e,n,a,r){var u={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Sl(e))Nm(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,E=f(_,a);if(u.hasEagerState=!0,u.eagerState=E,Kn(E,_))return el(e,n,u,0),Ve===null&&tl(),!1}catch{}finally{}if(a=gu(e,n,u,r),a!==null)return kn(a,e,r),Om(a,n,r),!0}return!1}function $u(e,n,a,r){if(r={lane:2,revertLane:Lf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Sl(e)){if(n)throw Error(s(479))}else n=gu(e,a,r,2),n!==null&&kn(n,e,2)}function Sl(e){var n=e.alternate;return e===oe||n!==null&&n===oe}function Nm(e,n){Zs=pl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Om(e,n,a){if((a&4194048)!==0){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Gr(e,a)}}var fo={readContext:En,use:_l,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useLayoutEffect:Qe,useInsertionEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useSyncExternalStore:Qe,useId:Qe,useHostTransitionStatus:Qe,useFormState:Qe,useActionState:Qe,useOptimistic:Qe,useMemoCache:Qe,useCacheRefresh:Qe};fo.useEffectEvent=Qe;var Pm={readContext:En,use:_l,useCallback:function(e,n){return Pn().memoizedState=[e,n===void 0?null:n],e},useContext:En,useEffect:vm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,yl(4194308,4,Mm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return yl(4194308,4,e,n)},useInsertionEffect:function(e,n){yl(4,2,e,n)},useMemo:function(e,n){var a=Pn();n=n===void 0?null:n;var r=e();if(fs){Nt(!0);try{e()}finally{Nt(!1)}}return a.memoizedState=[r,n],r},useReducer:function(e,n,a){var r=Pn();if(a!==void 0){var u=a(n);if(fs){Nt(!0);try{a(n)}finally{Nt(!1)}}}else u=n;return r.memoizedState=r.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},r.queue=e,e=e.dispatch=Fy.bind(null,oe,e),[r.memoizedState,e]},useRef:function(e){var n=Pn();return e={current:e},n.memoizedState=e},useState:function(e){e=qu(e);var n=e.queue,a=Lm.bind(null,oe,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:Zu,useDeferredValue:function(e,n){var a=Pn();return Ku(a,e,n)},useTransition:function(){var e=qu(!1);return e=Rm.bind(null,oe,e.queue,!0,!1),Pn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var r=oe,u=Pn();if(Ee){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Ve===null)throw Error(s(349));(Se&127)!==0||nm(r,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,vm(am.bind(null,r,f,e),[e]),r.flags|=2048,Qs(9,{destroy:void 0},im.bind(null,r,f,a,n),null),a},useId:function(){var e=Pn(),n=Ve.identifierPrefix;if(Ee){var a=Li,r=Ui;a=(r&~(1<<32-Jt(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ml++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Ly++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Ju,useFormState:dm,useActionState:dm,useOptimistic:function(e){var n=Pn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=$u.bind(null,oe,!0,a),a.dispatch=n,[e,n]},useMemoCache:ku,useCacheRefresh:function(){return Pn().memoizedState=Iy.bind(null,oe)},useEffectEvent:function(e){var n=Pn(),a={impl:e};return n.memoizedState=a,function(){if((De&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},tf={readContext:En,use:_l,useCallback:bm,useContext:En,useEffect:ju,useImperativeHandle:Em,useInsertionEffect:xm,useLayoutEffect:Sm,useMemo:Tm,useReducer:vl,useRef:_m,useState:function(){return vl(ji)},useDebugValue:Zu,useDeferredValue:function(e,n){var a=nn();return Am(a,ze.memoizedState,e,n)},useTransition:function(){var e=vl(ji)[0],n=nn().memoizedState;return[typeof e=="boolean"?e:co(e),n]},useSyncExternalStore:em,useId:Dm,useHostTransitionStatus:Ju,useFormState:pm,useActionState:pm,useOptimistic:function(e,n){var a=nn();return om(a,ze,e,n)},useMemoCache:ku,useCacheRefresh:Um};tf.useEffectEvent=ym;var zm={readContext:En,use:_l,useCallback:bm,useContext:En,useEffect:ju,useImperativeHandle:Em,useInsertionEffect:xm,useLayoutEffect:Sm,useMemo:Tm,useReducer:Wu,useRef:_m,useState:function(){return Wu(ji)},useDebugValue:Zu,useDeferredValue:function(e,n){var a=nn();return ze===null?Ku(a,e,n):Am(a,ze.memoizedState,e,n)},useTransition:function(){var e=Wu(ji)[0],n=nn().memoizedState;return[typeof e=="boolean"?e:co(e),n]},useSyncExternalStore:em,useId:Dm,useHostTransitionStatus:Ju,useFormState:gm,useActionState:gm,useOptimistic:function(e,n){var a=nn();return ze!==null?om(a,ze,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:ku,useCacheRefresh:Um};zm.useEffectEvent=ym;function ef(e,n,a,r){n=e.memoizedState,a=a(r,n),a=a==null?n:v({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var nf={enqueueSetState:function(e,n,a){e=e._reactInternals;var r=ni(),u=Sa(r);u.payload=n,a!=null&&(u.callback=a),n=Ma(e,u,r),n!==null&&(kn(n,e,r),so(n,e,r))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var r=ni(),u=Sa(r);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ma(e,u,r),n!==null&&(kn(n,e,r),so(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=ni(),r=Sa(a);r.tag=2,n!=null&&(r.callback=n),n=Ma(e,r,a),n!==null&&(kn(n,e,a),so(n,e,a))}};function Bm(e,n,a,r,u,f,_){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,f,_):n.prototype&&n.prototype.isPureReactComponent?!Qr(a,r)||!Qr(u,f):!0}function Im(e,n,a,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==e&&nf.enqueueReplaceState(n,n.state,null)}function hs(e,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(e=e.defaultProps){a===n&&(a=v({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function Fm(e){$o(e)}function Hm(e){console.error(e)}function Gm(e){$o(e)}function Ml(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function Vm(e,n,a){try{var r=e.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function af(e,n,a){return a=Sa(a),a.tag=3,a.payload={element:null},a.callback=function(){Ml(e,n)},a}function km(e){return e=Sa(e),e.tag=3,e}function Xm(e,n,a,r){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=r.value;e.payload=function(){return u(f)},e.callback=function(){Vm(n,a,r)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(e.callback=function(){Vm(n,a,r),typeof u!="function"&&(Ca===null?Ca=new Set([this]):Ca.add(this));var E=r.stack;this.componentDidCatch(r.value,{componentStack:E!==null?E:""})})}function Hy(e,n,a,r,u){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&ks(n,a,u,!0),a=Jn.current,a!==null){switch(a.tag){case 31:case 13:return fi===null?Ol():a.alternate===null&&Je===0&&(Je=3),a.flags&=-257,a.flags|=65536,a.lanes=u,r===cl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),wf(e,r,u)),!1;case 22:return a.flags|=65536,r===cl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),wf(e,r,u)),!1}throw Error(s(435,a.tag))}return wf(e,r,u),Ol(),!1}if(Ee)return n=Jn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,r!==Mu&&(e=Error(s(422),{cause:r}),to(oi(e,a)))):(r!==Mu&&(n=Error(s(423),{cause:r}),to(oi(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,r=oi(r,a),u=af(e.stateNode,r,u),Nu(e,u),Je!==4&&(Je=2)),!1;var f=Error(s(520),{cause:r});if(f=oi(f,a),xo===null?xo=[f]:xo.push(f),Je!==4&&(Je=2),n===null)return!0;r=oi(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=af(a.stateNode,r,e),Nu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ca===null||!Ca.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=km(u),Xm(u,e,a,r),Nu(a,u),!1}a=a.return}while(a!==null);return!1}var sf=Error(s(461)),on=!1;function bn(e,n,a,r){n.child=e===null?jp(n,null,a,r):us(n,e.child,a,r)}function Wm(e,n,a,r,u){a=a.render;var f=n.ref;if("ref"in r){var _={};for(var E in r)E!=="ref"&&(_[E]=r[E])}else _=r;return rs(n),r=Fu(e,n,a,_,f,u),E=Hu(),e!==null&&!on?(Gu(e,n,u),Zi(e,n,u)):(Ee&&E&&xu(n),n.flags|=1,bn(e,n,r,u),n.child)}function qm(e,n,a,r,u){if(e===null){var f=a.type;return typeof f=="function"&&!_u(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Ym(e,n,f,r,u)):(e=il(a.type,null,r,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!df(e,u)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:Qr,a(_,r)&&e.ref===n.ref)return Zi(e,n,u)}return n.flags|=1,e=ki(f,r),e.ref=n.ref,e.return=n,n.child=e}function Ym(e,n,a,r,u){if(e!==null){var f=e.memoizedProps;if(Qr(f,r)&&e.ref===n.ref)if(on=!1,n.pendingProps=r=f,df(e,u))(e.flags&131072)!==0&&(on=!0);else return n.lanes=e.lanes,Zi(e,n,u)}return rf(e,n,a,r,u)}function jm(e,n,a,r){var u=r.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(r=n.child=e.child,u=0;r!==null;)u=u|r.lanes|r.childLanes,r=r.sibling;r=u&~f}else r=0,n.child=null;return Zm(e,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&ol(n,f!==null?f.cachePool:null),f!==null?Qp(n,f):Pu(),Jp(n);else return r=n.lanes=536870912,Zm(e,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(ol(n,f.cachePool),Qp(n,f),ba(),n.memoizedState=null):(e!==null&&ol(n,null),Pu(),ba());return bn(e,n,u,a),n.child}function ho(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Zm(e,n,a,r,u){var f=wu();return f=f===null?null:{parent:sn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&ol(n,null),Pu(),Jp(n),e!==null&&ks(e,n,r,!0),n.childLanes=u,null}function El(e,n){return n=Tl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Km(e,n,a){return us(n,e.child,null,a),e=El(n,n.pendingProps),e.flags|=2,$n(n),n.memoizedState=null,e}function Gy(e,n,a){var r=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ee){if(r.mode==="hidden")return e=El(n,r),n.lanes=536870912,ho(null,e);if(Bu(n),(e=We)?(e=l_(e,ui),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ga!==null?{id:Ui,overflow:Li}:null,retryLane:536870912,hydrationErrors:null},a=Np(e),a.return=n,n.child=a,Mn=n,We=null)):e=null,e===null)throw va(n);return n.lanes=536870912,null}return El(n,r)}var f=e.memoizedState;if(f!==null){var _=f.dehydrated;if(Bu(n),u)if(n.flags&256)n.flags&=-257,n=Km(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(on||ks(e,n,a,!1),u=(a&e.childLanes)!==0,on||u){if(r=Ve,r!==null&&(_=wi(r,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,ns(e,_),kn(r,e,_),sf;Ol(),n=Km(e,n,a)}else e=f.treeContext,We=hi(_.nextSibling),Mn=n,Ee=!0,_a=null,ui=!1,e!==null&&zp(n,e),n=El(n,r),n.flags|=4096;return n}return e=ki(e.child,{mode:r.mode,children:r.children}),e.ref=n.ref,n.child=e,e.return=n,e}function bl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function rf(e,n,a,r,u){return rs(n),a=Fu(e,n,a,r,void 0,u),r=Hu(),e!==null&&!on?(Gu(e,n,u),Zi(e,n,u)):(Ee&&r&&xu(n),n.flags|=1,bn(e,n,a,u),n.child)}function Qm(e,n,a,r,u,f){return rs(n),n.updateQueue=null,a=tm(n,r,a,u),$p(e),r=Hu(),e!==null&&!on?(Gu(e,n,f),Zi(e,n,f)):(Ee&&r&&xu(n),n.flags|=1,bn(e,n,a,f),n.child)}function Jm(e,n,a,r,u){if(rs(n),n.stateNode===null){var f=Fs,_=a.contextType;typeof _=="object"&&_!==null&&(f=En(_)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=nf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Uu(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?En(_):Fs,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(ef(n,a,_,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&nf.enqueueReplaceState(f,f.state,null),oo(n,r,f,u),ro(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(e===null){f=n.stateNode;var E=n.memoizedProps,B=hs(a,E);f.props=B;var tt=f.context,ut=a.contextType;_=Fs,typeof ut=="object"&&ut!==null&&(_=En(ut));var pt=a.getDerivedStateFromProps;ut=typeof pt=="function"||typeof f.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(E||tt!==_)&&Im(n,f,r,_),xa=!1;var nt=n.memoizedState;f.state=nt,oo(n,r,f,u),ro(),tt=n.memoizedState,E||nt!==tt||xa?(typeof pt=="function"&&(ef(n,a,pt,r),tt=n.memoizedState),(B=xa||Bm(n,a,B,r,nt,tt,_))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=tt),f.props=r,f.state=tt,f.context=_,r=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,Lu(e,n),_=n.memoizedProps,ut=hs(a,_),f.props=ut,pt=n.pendingProps,nt=f.context,tt=a.contextType,B=Fs,typeof tt=="object"&&tt!==null&&(B=En(tt)),E=a.getDerivedStateFromProps,(tt=typeof E=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==pt||nt!==B)&&Im(n,f,r,B),xa=!1,nt=n.memoizedState,f.state=nt,oo(n,r,f,u),ro();var ot=n.memoizedState;_!==pt||nt!==ot||xa||e!==null&&e.dependencies!==null&&sl(e.dependencies)?(typeof E=="function"&&(ef(n,a,E,r),ot=n.memoizedState),(ut=xa||Bm(n,a,ut,r,nt,ot,B)||e!==null&&e.dependencies!==null&&sl(e.dependencies))?(tt||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,ot,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,ot,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=ot),f.props=r,f.state=ot,f.context=B,r=ut):(typeof f.componentDidUpdate!="function"||_===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),r=!1)}return f=r,bl(e,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&r?(n.child=us(n,e.child,null,u),n.child=us(n,null,a,u)):bn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=Zi(e,n,u),e}function $m(e,n,a,r){return as(),n.flags|=256,bn(e,n,a,r),n.child}var of={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function lf(e){return{baseLanes:e,cachePool:Vp()}}function cf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ei),e}function tg(e,n,a){var r=n.pendingProps,u=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=e!==null&&e.memoizedState===null?!1:(en.current&2)!==0),_&&(u=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ee){if(u?Ea(n):ba(),(e=We)?(e=l_(e,ui),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ga!==null?{id:Ui,overflow:Li}:null,retryLane:536870912,hydrationErrors:null},a=Np(e),a.return=n,n.child=a,Mn=n,We=null)):e=null,e===null)throw va(n);return Wf(e)?n.lanes=32:n.lanes=536870912,null}var E=r.children;return r=r.fallback,u?(ba(),u=n.mode,E=Tl({mode:"hidden",children:E},u),r=is(r,u,a,null),E.return=n,r.return=n,E.sibling=r,n.child=E,r=n.child,r.memoizedState=lf(a),r.childLanes=cf(e,_,a),n.memoizedState=of,ho(null,r)):(Ea(n),uf(n,E))}var B=e.memoizedState;if(B!==null&&(E=B.dehydrated,E!==null)){if(f)n.flags&256?(Ea(n),n.flags&=-257,n=ff(e,n,a)):n.memoizedState!==null?(ba(),n.child=e.child,n.flags|=128,n=null):(ba(),E=r.fallback,u=n.mode,r=Tl({mode:"visible",children:r.children},u),E=is(E,u,a,null),E.flags|=2,r.return=n,E.return=n,r.sibling=E,n.child=r,us(n,e.child,null,a),r=n.child,r.memoizedState=lf(a),r.childLanes=cf(e,_,a),n.memoizedState=of,n=ho(null,r));else if(Ea(n),Wf(E)){if(_=E.nextSibling&&E.nextSibling.dataset,_)var tt=_.dgst;_=tt,r=Error(s(419)),r.stack="",r.digest=_,to({value:r,source:null,stack:null}),n=ff(e,n,a)}else if(on||ks(e,n,a,!1),_=(a&e.childLanes)!==0,on||_){if(_=Ve,_!==null&&(r=wi(_,a),r!==0&&r!==B.retryLane))throw B.retryLane=r,ns(e,r),kn(_,e,r),sf;Xf(E)||Ol(),n=ff(e,n,a)}else Xf(E)?(n.flags|=192,n.child=e.child,n=null):(e=B.treeContext,We=hi(E.nextSibling),Mn=n,Ee=!0,_a=null,ui=!1,e!==null&&zp(n,e),n=uf(n,r.children),n.flags|=4096);return n}return u?(ba(),E=r.fallback,u=n.mode,B=e.child,tt=B.sibling,r=ki(B,{mode:"hidden",children:r.children}),r.subtreeFlags=B.subtreeFlags&65011712,tt!==null?E=ki(tt,E):(E=is(E,u,a,null),E.flags|=2),E.return=n,r.return=n,r.sibling=E,n.child=r,ho(null,r),r=n.child,E=e.child.memoizedState,E===null?E=lf(a):(u=E.cachePool,u!==null?(B=sn._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=Vp(),E={baseLanes:E.baseLanes|a,cachePool:u}),r.memoizedState=E,r.childLanes=cf(e,_,a),n.memoizedState=of,ho(e.child,r)):(Ea(n),a=e.child,e=a.sibling,a=ki(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,e!==null&&(_=n.deletions,_===null?(n.deletions=[e],n.flags|=16):_.push(e)),n.child=a,n.memoizedState=null,a)}function uf(e,n){return n=Tl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Tl(e,n){return e=Qn(22,e,null,n),e.lanes=0,e}function ff(e,n,a){return us(n,e.child,null,a),e=uf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function eg(e,n,a){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Tu(e.return,n,a)}function hf(e,n,a,r,u,f){var _=e.memoizedState;_===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:u,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=r,_.tail=a,_.tailMode=u,_.treeForkCount=f)}function ng(e,n,a){var r=n.pendingProps,u=r.revealOrder,f=r.tail;r=r.children;var _=en.current,E=(_&2)!==0;if(E?(_=_&1|2,n.flags|=128):_&=1,xt(en,_),bn(e,n,r,a),r=Ee?$r:0,!E&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&eg(e,a,n);else if(e.tag===19)eg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&dl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),hf(n,!1,u,a,f,r);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&dl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}hf(n,!0,a,null,f,r);break;case"together":hf(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function Zi(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ra|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(ks(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=ki(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=ki(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function df(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&sl(e)))}function Vy(e,n,a){switch(n.tag){case 3:Gt(n,n.stateNode.containerInfo),ya(n,sn,e.memoizedState.cache),as();break;case 27:case 5:ie(n);break;case 4:Gt(n,n.stateNode.containerInfo);break;case 10:ya(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Bu(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(Ea(n),n.flags|=128,null):(a&n.child.childLanes)!==0?tg(e,n,a):(Ea(n),e=Zi(e,n,a),e!==null?e.sibling:null);Ea(n);break;case 19:var u=(e.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(ks(e,n,a,!1),r=(a&n.childLanes)!==0),u){if(r)return ng(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),xt(en,en.current),r)break;return null;case 22:return n.lanes=0,jm(e,n,a,n.pendingProps);case 24:ya(n,sn,e.memoizedState.cache)}return Zi(e,n,a)}function ig(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)on=!0;else{if(!df(e,a)&&(n.flags&128)===0)return on=!1,Vy(e,n,a);on=(e.flags&131072)!==0}else on=!1,Ee&&(n.flags&1048576)!==0&&Pp(n,$r,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(e=ls(n.elementType),n.type=e,typeof e=="function")_u(e)?(r=hs(e,r),n.tag=1,n=Jm(null,n,e,r,a)):(n.tag=0,n=rf(null,n,e,r,a));else{if(e!=null){var u=e.$$typeof;if(u===L){n.tag=11,n=Wm(null,n,e,r,a);break t}else if(u===P){n.tag=14,n=qm(null,n,e,r,a);break t}}throw n=mt(e)||e,Error(s(306,n,""))}}return n;case 0:return rf(e,n,n.type,n.pendingProps,a);case 1:return r=n.type,u=hs(r,n.pendingProps),Jm(e,n,r,u,a);case 3:t:{if(Gt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;u=f.element,Lu(e,n),oo(n,r,null,a);var _=n.memoizedState;if(r=_.cache,ya(n,sn,r),r!==f.cache&&Au(n,[sn],a,!0),ro(),r=_.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=$m(e,n,r,a);break t}else if(r!==u){u=oi(Error(s(424)),n),to(u),n=$m(e,n,r,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(We=hi(e.firstChild),Mn=n,Ee=!0,_a=null,ui=!0,a=jp(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(as(),r===u){n=Zi(e,n,a);break t}bn(e,n,r,a)}n=n.child}return n;case 26:return bl(e,n),e===null?(a=p_(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ee||(a=n.type,e=n.pendingProps,r=Gl(Et.current).createElement(a),r[Ke]=n,r[Sn]=e,Tn(r,a,e),vt(r),n.stateNode=r):n.memoizedState=p_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return ie(n),e===null&&Ee&&(r=n.stateNode=f_(n.type,n.pendingProps,Et.current),Mn=n,ui=!0,u=We,La(n.type)?(qf=u,We=hi(r.firstChild)):We=u),bn(e,n,n.pendingProps.children,a),bl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ee&&((u=r=We)&&(r=vx(r,n.type,n.pendingProps,ui),r!==null?(n.stateNode=r,Mn=n,We=hi(r.firstChild),ui=!1,u=!0):u=!1),u||va(n)),ie(n),u=n.type,f=n.pendingProps,_=e!==null?e.memoizedProps:null,r=f.children,Gf(u,f)?r=null:_!==null&&Gf(u,_)&&(n.flags|=32),n.memoizedState!==null&&(u=Fu(e,n,Ny,null,null,a),Co._currentValue=u),bl(e,n),bn(e,n,r,a),n.child;case 6:return e===null&&Ee&&((e=a=We)&&(a=yx(a,n.pendingProps,ui),a!==null?(n.stateNode=a,Mn=n,We=null,e=!0):e=!1),e||va(n)),null;case 13:return tg(e,n,a);case 4:return Gt(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=us(n,null,r,a):bn(e,n,r,a),n.child;case 11:return Wm(e,n,n.type,n.pendingProps,a);case 7:return bn(e,n,n.pendingProps,a),n.child;case 8:return bn(e,n,n.pendingProps.children,a),n.child;case 12:return bn(e,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,ya(n,n.type,r.value),bn(e,n,r.children,a),n.child;case 9:return u=n.type._context,r=n.pendingProps.children,rs(n),u=En(u),r=r(u),n.flags|=1,bn(e,n,r,a),n.child;case 14:return qm(e,n,n.type,n.pendingProps,a);case 15:return Ym(e,n,n.type,n.pendingProps,a);case 19:return ng(e,n,a);case 31:return Gy(e,n,a);case 22:return jm(e,n,a,n.pendingProps);case 24:return rs(n),r=En(sn),e===null?(u=wu(),u===null&&(u=Ve,f=Ru(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:r,cache:u},Uu(n),ya(n,sn,u)):((e.lanes&a)!==0&&(Lu(e,n),oo(n,null,null,a),ro()),u=e.memoizedState,f=n.memoizedState,u.parent!==r?(u={parent:r,cache:r},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),ya(n,sn,r)):(r=f.cache,ya(n,sn,r),r!==u.cache&&Au(n,[sn],a,!0))),bn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ki(e){e.flags|=4}function pf(e,n,a,r,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Dg())e.flags|=8192;else throw cs=cl,Du}else e.flags&=-16777217}function ag(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!y_(n))if(Dg())e.flags|=8192;else throw cs=cl,Du}function Al(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?un():536870912,e.lanes|=n,er|=n)}function po(e,n){if(!Ee)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function qe(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags&65011712,r|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags,r|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=r,e.childLanes=a,n}function ky(e,n,a){var r=n.pendingProps;switch(Su(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qe(n),null;case 1:return qe(n),null;case 3:return a=n.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),qi(sn),Ft(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Vs(n)?Ki(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Eu())),qe(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(Ki(n),f!==null?(qe(n),ag(n,f)):(qe(n),pf(n,u,null,r,a))):f?f!==e.memoizedState?(Ki(n),qe(n),ag(n,f)):(qe(n),n.flags&=-16777217):(e=e.memoizedProps,e!==r&&Ki(n),qe(n),pf(n,u,e,r,a)),null;case 27:if(Oe(n),a=Et.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Ki(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return qe(n),null}e=Z.current,Vs(n)?Bp(n):(e=f_(u,r,a),n.stateNode=e,Ki(n))}return qe(n),null;case 5:if(Oe(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Ki(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return qe(n),null}if(f=Z.current,Vs(n))Bp(n);else{var _=Gl(Et.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?_.createElement("select",{is:r.is}):_.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?_.createElement(u,{is:r.is}):_.createElement(u)}}f[Ke]=n,f[Sn]=r;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;t:switch(Tn(f,u,r),u){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Ki(n)}}return qe(n),pf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==r&&Ki(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(e=Et.current,Vs(n)){if(e=n.stateNode,a=n.memoizedProps,r=null,u=Mn,u!==null)switch(u.tag){case 27:case 5:r=u.memoizedProps}e[Ke]=n,e=!!(e.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||t_(e.nodeValue,a)),e||va(n,!0)}else e=Gl(e).createTextNode(r),e[Ke]=n,n.stateNode=e}return qe(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(r=Vs(n),a!==null){if(e===null){if(!r)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[Ke]=n}else as(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),e=!1}else a=Eu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?($n(n),n):($n(n),null);if((n.flags&128)!==0)throw Error(s(558))}return qe(n),null;case 13:if(r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Vs(n),r!==null&&r.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Ke]=n}else as(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;qe(n),u=!1}else u=Eu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?($n(n),n):($n(n),null)}return $n(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,e=e!==null&&e.memoizedState!==null,a&&(r=n.child,u=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(u=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==u&&(r.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Al(n,n.updateQueue),qe(n),null);case 4:return Ft(),e===null&&zf(n.stateNode.containerInfo),qe(n),null;case 10:return qi(n.type),qe(n),null;case 19:if(at(en),r=n.memoizedState,r===null)return qe(n),null;if(u=(n.flags&128)!==0,f=r.rendering,f===null)if(u)po(r,!1);else{if(Je!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=dl(e),f!==null){for(n.flags|=128,po(r,!1),e=f.updateQueue,n.updateQueue=e,Al(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Lp(a,e),a=a.sibling;return xt(en,en.current&1|2),Ee&&Xi(n,r.treeForkCount),n.child}e=e.sibling}r.tail!==null&&ft()>Ul&&(n.flags|=128,u=!0,po(r,!1),n.lanes=4194304)}else{if(!u)if(e=dl(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Al(n,e),po(r,!0),r.tail===null&&r.tailMode==="hidden"&&!f.alternate&&!Ee)return qe(n),null}else 2*ft()-r.renderingStartTime>Ul&&a!==536870912&&(n.flags|=128,u=!0,po(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(e=r.last,e!==null?e.sibling=f:n.child=f,r.last=f)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ft(),e.sibling=null,a=en.current,xt(en,u?a&1|2:a&1),Ee&&Xi(n,r.treeForkCount),e):(qe(n),null);case 22:case 23:return $n(n),zu(),r=n.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(qe(n),n.subtreeFlags&6&&(n.flags|=8192)):qe(n),a=n.updateQueue,a!==null&&Al(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),e!==null&&at(os),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),qi(sn),qe(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Xy(e,n){switch(Su(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return qi(sn),Ft(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Oe(n),null;case 31:if(n.memoizedState!==null){if($n(n),n.alternate===null)throw Error(s(340));as()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if($n(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));as()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return at(en),null;case 4:return Ft(),null;case 10:return qi(n.type),null;case 22:case 23:return $n(n),zu(),e!==null&&at(os),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return qi(sn),null;case 25:return null;default:return null}}function sg(e,n){switch(Su(n),n.tag){case 3:qi(sn),Ft();break;case 26:case 27:case 5:Oe(n);break;case 4:Ft();break;case 31:n.memoizedState!==null&&$n(n);break;case 13:$n(n);break;case 19:at(en);break;case 10:qi(n.type);break;case 22:case 23:$n(n),zu(),e!==null&&at(os);break;case 24:qi(sn)}}function mo(e,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var u=r.next;a=u;do{if((a.tag&e)===e){r=void 0;var f=a.create,_=a.inst;r=f(),_.destroy=r}a=a.next}while(a!==u)}}catch(E){Ne(n,n.return,E)}}function Ta(e,n,a){try{var r=n.updateQueue,u=r!==null?r.lastEffect:null;if(u!==null){var f=u.next;r=f;do{if((r.tag&e)===e){var _=r.inst,E=_.destroy;if(E!==void 0){_.destroy=void 0,u=n;var B=a,tt=E;try{tt()}catch(ut){Ne(u,B,ut)}}}r=r.next}while(r!==f)}}catch(ut){Ne(n,n.return,ut)}}function rg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Kp(n,a)}catch(r){Ne(e,e.return,r)}}}function og(e,n,a){a.props=hs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(r){Ne(e,n,r)}}function go(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof a=="function"?e.refCleanup=a(r):a.current=r}}catch(u){Ne(e,n,u)}}function Ni(e,n){var a=e.ref,r=e.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(u){Ne(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ne(e,n,u)}else a.current=null}function lg(e){var n=e.type,a=e.memoizedProps,r=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(u){Ne(e,e.return,u)}}function mf(e,n,a){try{var r=e.stateNode;hx(r,e.type,a,n),r[Sn]=n}catch(u){Ne(e,e.return,u)}}function cg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&La(e.type)||e.tag===4}function gf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||cg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&La(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _f(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Gi));else if(r!==4&&(r===27&&La(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(_f(e,n,a),e=e.sibling;e!==null;)_f(e,n,a),e=e.sibling}function Rl(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(r!==4&&(r===27&&La(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Rl(e,n,a),e=e.sibling;e!==null;)Rl(e,n,a),e=e.sibling}function ug(e){var n=e.stateNode,a=e.memoizedProps;try{for(var r=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Tn(n,r,a),n[Ke]=e,n[Sn]=a}catch(f){Ne(e,e.return,f)}}var Qi=!1,ln=!1,vf=!1,fg=typeof WeakSet=="function"?WeakSet:Set,_n=null;function Wy(e,n){if(e=e.containerInfo,Ff=jl,e=Ep(e),uu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var u=r.anchorOffset,f=r.focusNode;r=r.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var _=0,E=-1,B=-1,tt=0,ut=0,pt=e,nt=null;e:for(;;){for(var ot;pt!==a||u!==0&&pt.nodeType!==3||(E=_+u),pt!==f||r!==0&&pt.nodeType!==3||(B=_+r),pt.nodeType===3&&(_+=pt.nodeValue.length),(ot=pt.firstChild)!==null;)nt=pt,pt=ot;for(;;){if(pt===e)break e;if(nt===a&&++tt===u&&(E=_),nt===f&&++ut===r&&(B=_),(ot=pt.nextSibling)!==null)break;pt=nt,nt=pt.parentNode}pt=ot}a=E===-1||B===-1?null:{start:E,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(Hf={focusedElem:e,selectionRange:a},jl=!1,_n=n;_n!==null;)if(n=_n,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_n=e;else for(;_n!==null;){switch(n=_n,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,r=a.stateNode;try{var It=hs(a.type,u);e=r.getSnapshotBeforeUpdate(It,f),r.__reactInternalSnapshotBeforeUpdate=e}catch(Qt){Ne(a,a.return,Qt)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)kf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":kf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,_n=e;break}_n=n.return}}function hg(e,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:$i(e,a),r&4&&mo(5,a);break;case 1:if($i(e,a),r&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(_){Ne(a,a.return,_)}else{var u=hs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(_){Ne(a,a.return,_)}}r&64&&rg(a),r&512&&go(a,a.return);break;case 3:if($i(e,a),r&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Kp(e,n)}catch(_){Ne(a,a.return,_)}}break;case 27:n===null&&r&4&&ug(a);case 26:case 5:$i(e,a),n===null&&r&4&&lg(a),r&512&&go(a,a.return);break;case 12:$i(e,a);break;case 31:$i(e,a),r&4&&mg(e,a);break;case 13:$i(e,a),r&4&&gg(e,a),r&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=tx.bind(null,a),xx(e,a))));break;case 22:if(r=a.memoizedState!==null||Qi,!r){n=n!==null&&n.memoizedState!==null||ln,u=Qi;var f=ln;Qi=r,(ln=n)&&!f?ta(e,a,(a.subtreeFlags&8772)!==0):$i(e,a),Qi=u,ln=f}break;case 30:break;default:$i(e,a)}}function dg(e){var n=e.alternate;n!==null&&(e.alternate=null,dg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&A(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ze=null,Fn=!1;function Ji(e,n,a){for(a=a.child;a!==null;)pg(e,n,a),a=a.sibling}function pg(e,n,a){if(Xt&&typeof Xt.onCommitFiberUnmount=="function")try{Xt.onCommitFiberUnmount(Yt,a)}catch{}switch(a.tag){case 26:ln||Ni(a,n),Ji(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ln||Ni(a,n);var r=Ze,u=Fn;La(a.type)&&(Ze=a.stateNode,Fn=!1),Ji(e,n,a),To(a.stateNode),Ze=r,Fn=u;break;case 5:ln||Ni(a,n);case 6:if(r=Ze,u=Fn,Ze=null,Ji(e,n,a),Ze=r,Fn=u,Ze!==null)if(Fn)try{(Ze.nodeType===9?Ze.body:Ze.nodeName==="HTML"?Ze.ownerDocument.body:Ze).removeChild(a.stateNode)}catch(f){Ne(a,n,f)}else try{Ze.removeChild(a.stateNode)}catch(f){Ne(a,n,f)}break;case 18:Ze!==null&&(Fn?(e=Ze,r_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),cr(e)):r_(Ze,a.stateNode));break;case 4:r=Ze,u=Fn,Ze=a.stateNode.containerInfo,Fn=!0,Ji(e,n,a),Ze=r,Fn=u;break;case 0:case 11:case 14:case 15:Ta(2,a,n),ln||Ta(4,a,n),Ji(e,n,a);break;case 1:ln||(Ni(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&og(a,n,r)),Ji(e,n,a);break;case 21:Ji(e,n,a);break;case 22:ln=(r=ln)||a.memoizedState!==null,Ji(e,n,a),ln=r;break;default:Ji(e,n,a)}}function mg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{cr(e)}catch(a){Ne(n,n.return,a)}}}function gg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{cr(e)}catch(a){Ne(n,n.return,a)}}function qy(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new fg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new fg),n;default:throw Error(s(435,e.tag))}}function Cl(e,n){var a=qy(e);n.forEach(function(r){if(!a.has(r)){a.add(r);var u=ex.bind(null,e,r);r.then(u,u)}})}function Hn(e,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var u=a[r],f=e,_=n,E=_;t:for(;E!==null;){switch(E.tag){case 27:if(La(E.type)){Ze=E.stateNode,Fn=!1;break t}break;case 5:Ze=E.stateNode,Fn=!1;break t;case 3:case 4:Ze=E.stateNode.containerInfo,Fn=!0;break t}E=E.return}if(Ze===null)throw Error(s(160));pg(f,_,u),Ze=null,Fn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)_g(n,e),n=n.sibling}var xi=null;function _g(e,n){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Hn(n,e),Gn(e),r&4&&(Ta(3,e,e.return),mo(3,e),Ta(5,e,e.return));break;case 1:Hn(n,e),Gn(e),r&512&&(ln||a===null||Ni(a,a.return)),r&64&&Qi&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var u=xi;if(Hn(n,e),Gn(e),r&512&&(ln||a===null||Ni(a,a.return)),r&4){var f=a!==null?a.memoizedState:null;if(r=e.memoizedState,a===null)if(r===null)if(e.stateNode===null){t:{r=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(r){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Qa]||f[Ke]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(r),u.head.insertBefore(f,u.querySelector("head > title"))),Tn(f,r,a),f[Ke]=e,vt(f),r=f;break t;case"link":var _=__("link","href",u).get(r+(a.href||""));if(_){for(var E=0;E<_.length;E++)if(f=_[E],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){_.splice(E,1);break e}}f=u.createElement(r),Tn(f,r,a),u.head.appendChild(f);break;case"meta":if(_=__("meta","content",u).get(r+(a.content||""))){for(E=0;E<_.length;E++)if(f=_[E],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){_.splice(E,1);break e}}f=u.createElement(r),Tn(f,r,a),u.head.appendChild(f);break;default:throw Error(s(468,r))}f[Ke]=e,vt(f),r=f}e.stateNode=r}else v_(u,e.type,e.stateNode);else e.stateNode=g_(u,r,e.memoizedProps);else f!==r?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,r===null?v_(u,e.type,e.stateNode):g_(u,r,e.memoizedProps)):r===null&&e.stateNode!==null&&mf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Hn(n,e),Gn(e),r&512&&(ln||a===null||Ni(a,a.return)),a!==null&&r&4&&mf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Hn(n,e),Gn(e),r&512&&(ln||a===null||Ni(a,a.return)),e.flags&32){u=e.stateNode;try{Ls(u,"")}catch(It){Ne(e,e.return,It)}}r&4&&e.stateNode!=null&&(u=e.memoizedProps,mf(e,u,a!==null?a.memoizedProps:u)),r&1024&&(vf=!0);break;case 6:if(Hn(n,e),Gn(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,a=e.stateNode;try{a.nodeValue=r}catch(It){Ne(e,e.return,It)}}break;case 3:if(Xl=null,u=xi,xi=Vl(n.containerInfo),Hn(n,e),xi=u,Gn(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{cr(n.containerInfo)}catch(It){Ne(e,e.return,It)}vf&&(vf=!1,vg(e));break;case 4:r=xi,xi=Vl(e.stateNode.containerInfo),Hn(n,e),Gn(e),xi=r;break;case 12:Hn(n,e),Gn(e);break;case 31:Hn(n,e),Gn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Cl(e,r)));break;case 13:Hn(n,e),Gn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Dl=ft()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Cl(e,r)));break;case 22:u=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,tt=Qi,ut=ln;if(Qi=tt||u,ln=ut||B,Hn(n,e),ln=ut,Qi=tt,Gn(e),r&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||Qi||ln||ds(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,u)_=f.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none";else{E=B.stateNode;var pt=B.memoizedProps.style,nt=pt!=null&&pt.hasOwnProperty("display")?pt.display:null;E.style.display=nt==null||typeof nt=="boolean"?"":(""+nt).trim()}}catch(It){Ne(B,B.return,It)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(It){Ne(B,B.return,It)}}}else if(n.tag===18){if(a===null){B=n;try{var ot=B.stateNode;u?o_(ot,!0):o_(B.stateNode,!1)}catch(It){Ne(B,B.return,It)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=e.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,Cl(e,a))));break;case 19:Hn(n,e),Gn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Cl(e,r)));break;case 30:break;case 21:break;default:Hn(n,e),Gn(e)}}function Gn(e){var n=e.flags;if(n&2){try{for(var a,r=e.return;r!==null;){if(cg(r)){a=r;break}r=r.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=gf(e);Rl(e,f,u);break;case 5:var _=a.stateNode;a.flags&32&&(Ls(_,""),a.flags&=-33);var E=gf(e);Rl(e,E,_);break;case 3:case 4:var B=a.stateNode.containerInfo,tt=gf(e);_f(e,tt,B);break;default:throw Error(s(161))}}catch(ut){Ne(e,e.return,ut)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function vg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;vg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function $i(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)hg(e,n.alternate,n),n=n.sibling}function ds(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Ta(4,n,n.return),ds(n);break;case 1:Ni(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&og(n,n.return,a),ds(n);break;case 27:To(n.stateNode);case 26:case 5:Ni(n,n.return),ds(n);break;case 22:n.memoizedState===null&&ds(n);break;case 30:ds(n);break;default:ds(n)}e=e.sibling}}function ta(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,u=e,f=n,_=f.flags;switch(f.tag){case 0:case 11:case 15:ta(u,f,a),mo(4,f);break;case 1:if(ta(u,f,a),r=f,u=r.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){Ne(r,r.return,tt)}if(r=f,u=r.updateQueue,u!==null){var E=r.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)Zp(B[u],E)}catch(tt){Ne(r,r.return,tt)}}a&&_&64&&rg(f),go(f,f.return);break;case 27:ug(f);case 26:case 5:ta(u,f,a),a&&r===null&&_&4&&lg(f),go(f,f.return);break;case 12:ta(u,f,a);break;case 31:ta(u,f,a),a&&_&4&&mg(u,f);break;case 13:ta(u,f,a),a&&_&4&&gg(u,f);break;case 22:f.memoizedState===null&&ta(u,f,a),go(f,f.return);break;case 30:break;default:ta(u,f,a)}n=n.sibling}}function yf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&eo(a))}function xf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e))}function Si(e,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)yg(e,n,a,r),n=n.sibling}function yg(e,n,a,r){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Si(e,n,a,r),u&2048&&mo(9,n);break;case 1:Si(e,n,a,r);break;case 3:Si(e,n,a,r),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e)));break;case 12:if(u&2048){Si(e,n,a,r),e=n.stateNode;try{var f=n.memoizedProps,_=f.id,E=f.onPostCommit;typeof E=="function"&&E(_,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){Ne(n,n.return,B)}}else Si(e,n,a,r);break;case 31:Si(e,n,a,r);break;case 13:Si(e,n,a,r);break;case 23:break;case 22:f=n.stateNode,_=n.alternate,n.memoizedState!==null?f._visibility&2?Si(e,n,a,r):_o(e,n):f._visibility&2?Si(e,n,a,r):(f._visibility|=2,Js(e,n,a,r,(n.subtreeFlags&10256)!==0||!1)),u&2048&&yf(_,n);break;case 24:Si(e,n,a,r),u&2048&&xf(n.alternate,n);break;default:Si(e,n,a,r)}}function Js(e,n,a,r,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,_=n,E=a,B=r,tt=_.flags;switch(_.tag){case 0:case 11:case 15:Js(f,_,E,B,u),mo(8,_);break;case 23:break;case 22:var ut=_.stateNode;_.memoizedState!==null?ut._visibility&2?Js(f,_,E,B,u):_o(f,_):(ut._visibility|=2,Js(f,_,E,B,u)),u&&tt&2048&&yf(_.alternate,_);break;case 24:Js(f,_,E,B,u),u&&tt&2048&&xf(_.alternate,_);break;default:Js(f,_,E,B,u)}n=n.sibling}}function _o(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,r=n,u=r.flags;switch(r.tag){case 22:_o(a,r),u&2048&&yf(r.alternate,r);break;case 24:_o(a,r),u&2048&&xf(r.alternate,r);break;default:_o(a,r)}n=n.sibling}}var vo=8192;function $s(e,n,a){if(e.subtreeFlags&vo)for(e=e.child;e!==null;)xg(e,n,a),e=e.sibling}function xg(e,n,a){switch(e.tag){case 26:$s(e,n,a),e.flags&vo&&e.memoizedState!==null&&Lx(a,xi,e.memoizedState,e.memoizedProps);break;case 5:$s(e,n,a);break;case 3:case 4:var r=xi;xi=Vl(e.stateNode.containerInfo),$s(e,n,a),xi=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=vo,vo=16777216,$s(e,n,a),vo=r):$s(e,n,a));break;default:$s(e,n,a)}}function Sg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function yo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];_n=r,Eg(r,e)}Sg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Mg(e),e=e.sibling}function Mg(e){switch(e.tag){case 0:case 11:case 15:yo(e),e.flags&2048&&Ta(9,e,e.return);break;case 3:yo(e);break;case 12:yo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,wl(e)):yo(e);break;default:yo(e)}}function wl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];_n=r,Eg(r,e)}Sg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Ta(8,n,n.return),wl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,wl(n));break;default:wl(n)}e=e.sibling}}function Eg(e,n){for(;_n!==null;){var a=_n;switch(a.tag){case 0:case 11:case 15:Ta(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:eo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,_n=r;else t:for(a=e;_n!==null;){r=_n;var u=r.sibling,f=r.return;if(dg(r),r===a){_n=null;break t}if(u!==null){u.return=f,_n=u;break t}_n=f}}}var Yy={getCacheForType:function(e){var n=En(sn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return En(sn).controller.signal}},jy=typeof WeakMap=="function"?WeakMap:Map,De=0,Ve=null,me=null,Se=0,Le=0,ti=null,Aa=!1,tr=!1,Sf=!1,ea=0,Je=0,Ra=0,ps=0,Mf=0,ei=0,er=0,xo=null,Vn=null,Ef=!1,Dl=0,bg=0,Ul=1/0,Ll=null,Ca=null,hn=0,wa=null,nr=null,na=0,bf=0,Tf=null,Tg=null,So=0,Af=null;function ni(){return(De&2)!==0&&Se!==0?Se&-Se:z.T!==null?Lf():Vr()}function Ag(){if(ei===0)if((Se&536870912)===0||Ee){var e=lt;lt<<=1,(lt&3932160)===0&&(lt=262144),ei=e}else ei=536870912;return e=Jn.current,e!==null&&(e.flags|=32),ei}function kn(e,n,a){(e===Ve&&(Le===2||Le===9)||e.cancelPendingCommit!==null)&&(ir(e,0),Da(e,Se,ei,!1)),xn(e,a),((De&2)===0||e!==Ve)&&(e===Ve&&((De&2)===0&&(ps|=a),Je===4&&Da(e,Se,ei,!1)),Oi(e))}function Rg(e,n,a){if((De&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&e.expiredLanes)===0||$t(e,n),u=r?Qy(e,n):Cf(e,n,!0),f=r;do{if(u===0){tr&&!r&&Da(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!Zy(a)){u=Cf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var _=0;else _=e.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var E=e;u=xo;var B=E.current.memoizedState.isDehydrated;if(B&&(ir(E,_).flags|=256),_=Cf(E,_,!1),_!==2){if(Sf&&!B){E.errorRecoveryDisabledLanes|=f,ps|=f,u=4;break t}f=Vn,Vn=u,f!==null&&(Vn===null?Vn=f:Vn.push.apply(Vn,f))}u=_}if(f=!1,u!==2)continue}}if(u===1){ir(e,0),Da(e,n,0,!0);break}t:{switch(r=e,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Da(r,n,ei,!Aa);break t;case 2:Vn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Dl+300-ft(),10<u)){if(Da(r,n,ei,!Aa),Dt(r,0,!0)!==0)break t;na=n,r.timeoutHandle=a_(Cg.bind(null,r,a,Vn,Ll,Ef,n,ei,ps,er,Aa,f,"Throttled",-0,0),u);break t}Cg(r,a,Vn,Ll,Ef,n,ei,ps,er,Aa,f,null,-0,0)}}break}while(!0);Oi(e)}function Cg(e,n,a,r,u,f,_,E,B,tt,ut,pt,nt,ot){if(e.timeoutHandle=-1,pt=n.subtreeFlags,pt&8192||(pt&16785408)===16785408){pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Gi},xg(n,f,pt);var It=(f&62914560)===f?Dl-ft():(f&4194048)===f?bg-ft():0;if(It=Nx(pt,It),It!==null){na=f,e.cancelPendingCommit=It(zg.bind(null,e,n,f,a,r,u,_,E,B,ut,pt,null,nt,ot)),Da(e,f,_,!tt);return}}zg(e,n,f,a,r,u,_,E,B)}function Zy(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var u=a[r],f=u.getSnapshot;u=u.value;try{if(!Kn(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Da(e,n,a,r){n&=~Mf,n&=~ps,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes;for(var u=n;0<u;){var f=31-Jt(u),_=1<<f;r[f]=-1,u&=~_}a!==0&&Hr(e,a,n)}function Nl(){return(De&6)===0?(Mo(0),!1):!0}function Rf(){if(me!==null){if(Le===0)var e=me.return;else e=me,Wi=ss=null,Vu(e),Ys=null,io=0,e=me;for(;e!==null;)sg(e.alternate,e),e=e.return;me=null}}function ir(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,mx(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),na=0,Rf(),Ve=e,me=a=ki(e.current,null),Se=n,Le=0,ti=null,Aa=!1,tr=$t(e,n),Sf=!1,er=ei=Mf=ps=Ra=Je=0,Vn=xo=null,Ef=!1,(n&8)!==0&&(n|=n&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=n;0<r;){var u=31-Jt(r),f=1<<u;n|=e[u],r&=~f}return ea=n,tl(),a}function wg(e,n){oe=null,z.H=fo,n===qs||n===ll?(n=Wp(),Le=3):n===Du?(n=Wp(),Le=4):Le=n===sf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ti=n,me===null&&(Je=1,Ml(e,oi(n,e.current)))}function Dg(){var e=Jn.current;return e===null?!0:(Se&4194048)===Se?fi===null:(Se&62914560)===Se||(Se&536870912)!==0?e===fi:!1}function Ug(){var e=z.H;return z.H=fo,e===null?fo:e}function Lg(){var e=z.A;return z.A=Yy,e}function Ol(){Je=4,Aa||(Se&4194048)!==Se&&Jn.current!==null||(tr=!0),(Ra&134217727)===0&&(ps&134217727)===0||Ve===null||Da(Ve,Se,ei,!1)}function Cf(e,n,a){var r=De;De|=2;var u=Ug(),f=Lg();(Ve!==e||Se!==n)&&(Ll=null,ir(e,n)),n=!1;var _=Je;t:do try{if(Le!==0&&me!==null){var E=me,B=ti;switch(Le){case 8:Rf(),_=6;break t;case 3:case 2:case 9:case 6:Jn.current===null&&(n=!0);var tt=Le;if(Le=0,ti=null,ar(e,E,B,tt),a&&tr){_=0;break t}break;default:tt=Le,Le=0,ti=null,ar(e,E,B,tt)}}Ky(),_=Je;break}catch(ut){wg(e,ut)}while(!0);return n&&e.shellSuspendCounter++,Wi=ss=null,De=r,z.H=u,z.A=f,me===null&&(Ve=null,Se=0,tl()),_}function Ky(){for(;me!==null;)Ng(me)}function Qy(e,n){var a=De;De|=2;var r=Ug(),u=Lg();Ve!==e||Se!==n?(Ll=null,Ul=ft()+500,ir(e,n)):tr=$t(e,n);t:do try{if(Le!==0&&me!==null){n=me;var f=ti;e:switch(Le){case 1:Le=0,ti=null,ar(e,n,f,1);break;case 2:case 9:if(kp(f)){Le=0,ti=null,Og(n);break}n=function(){Le!==2&&Le!==9||Ve!==e||(Le=7),Oi(e)},f.then(n,n);break t;case 3:Le=7;break t;case 4:Le=5;break t;case 7:kp(f)?(Le=0,ti=null,Og(n)):(Le=0,ti=null,ar(e,n,f,7));break;case 5:var _=null;switch(me.tag){case 26:_=me.memoizedState;case 5:case 27:var E=me;if(_?y_(_):E.stateNode.complete){Le=0,ti=null;var B=E.sibling;if(B!==null)me=B;else{var tt=E.return;tt!==null?(me=tt,Pl(tt)):me=null}break e}}Le=0,ti=null,ar(e,n,f,5);break;case 6:Le=0,ti=null,ar(e,n,f,6);break;case 8:Rf(),Je=6;break t;default:throw Error(s(462))}}Jy();break}catch(ut){wg(e,ut)}while(!0);return Wi=ss=null,z.H=r,z.A=u,De=a,me!==null?0:(Ve=null,Se=0,tl(),Je)}function Jy(){for(;me!==null&&!T();)Ng(me)}function Ng(e){var n=ig(e.alternate,e,ea);e.memoizedProps=e.pendingProps,n===null?Pl(e):me=n}function Og(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=Qm(a,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=Qm(a,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:Vu(n);default:sg(a,n),n=me=Lp(n,ea),n=ig(a,n,ea)}e.memoizedProps=e.pendingProps,n===null?Pl(e):me=n}function ar(e,n,a,r){Wi=ss=null,Vu(n),Ys=null,io=0;var u=n.return;try{if(Hy(e,u,n,a,Se)){Je=1,Ml(e,oi(a,e.current)),me=null;return}}catch(f){if(u!==null)throw me=u,f;Je=1,Ml(e,oi(a,e.current)),me=null;return}n.flags&32768?(Ee||r===1?e=!0:tr||(Se&536870912)!==0?e=!1:(Aa=e=!0,(r===2||r===9||r===3||r===6)&&(r=Jn.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pg(n,e)):Pl(n)}function Pl(e){var n=e;do{if((n.flags&32768)!==0){Pg(n,Aa);return}e=n.return;var a=ky(n.alternate,n,ea);if(a!==null){me=a;return}if(n=n.sibling,n!==null){me=n;return}me=n=e}while(n!==null);Je===0&&(Je=5)}function Pg(e,n){do{var a=Xy(e.alternate,e);if(a!==null){a.flags&=32767,me=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){me=e;return}me=e=a}while(e!==null);Je=6,me=null}function zg(e,n,a,r,u,f,_,E,B){e.cancelPendingCommit=null;do zl();while(hn!==0);if((De&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=mu,_i(e,a,f,_,E,B),e===Ve&&(me=Ve=null,Se=0),nr=n,wa=e,na=a,bf=f,Tf=u,Tg=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,nx(wt,function(){return Gg(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=z.T,z.T=null,u=J.p,J.p=2,_=De,De|=4;try{Wy(e,n,a)}finally{De=_,J.p=u,z.T=r}}hn=1,Bg(),Ig(),Fg()}}function Bg(){if(hn===1){hn=0;var e=wa,n=nr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var r=J.p;J.p=2;var u=De;De|=4;try{_g(n,e);var f=Hf,_=Ep(e.containerInfo),E=f.focusedElem,B=f.selectionRange;if(_!==E&&E&&E.ownerDocument&&Mp(E.ownerDocument.documentElement,E)){if(B!==null&&uu(E)){var tt=B.start,ut=B.end;if(ut===void 0&&(ut=tt),"selectionStart"in E)E.selectionStart=tt,E.selectionEnd=Math.min(ut,E.value.length);else{var pt=E.ownerDocument||document,nt=pt&&pt.defaultView||window;if(nt.getSelection){var ot=nt.getSelection(),It=E.textContent.length,Qt=Math.min(B.start,It),Ie=B.end===void 0?Qt:Math.min(B.end,It);!ot.extend&&Qt>Ie&&(_=Ie,Ie=Qt,Qt=_);var Y=Sp(E,Qt),H=Sp(E,Ie);if(Y&&H&&(ot.rangeCount!==1||ot.anchorNode!==Y.node||ot.anchorOffset!==Y.offset||ot.focusNode!==H.node||ot.focusOffset!==H.offset)){var $=pt.createRange();$.setStart(Y.node,Y.offset),ot.removeAllRanges(),Qt>Ie?(ot.addRange($),ot.extend(H.node,H.offset)):($.setEnd(H.node,H.offset),ot.addRange($))}}}}for(pt=[],ot=E;ot=ot.parentNode;)ot.nodeType===1&&pt.push({element:ot,left:ot.scrollLeft,top:ot.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<pt.length;E++){var ht=pt[E];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}jl=!!Ff,Hf=Ff=null}finally{De=u,J.p=r,z.T=a}}e.current=n,hn=2}}function Ig(){if(hn===2){hn=0;var e=wa,n=nr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var r=J.p;J.p=2;var u=De;De|=4;try{hg(e,n.alternate,n)}finally{De=u,J.p=r,z.T=a}}hn=3}}function Fg(){if(hn===4||hn===3){hn=0,it();var e=wa,n=nr,a=na,r=Tg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?hn=5:(hn=0,nr=wa=null,Hg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ca=null),Ds(a),n=n.stateNode,Xt&&typeof Xt.onCommitFiberRoot=="function")try{Xt.onCommitFiberRoot(Yt,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=z.T,u=J.p,J.p=2,z.T=null;try{for(var f=e.onRecoverableError,_=0;_<r.length;_++){var E=r[_];f(E.value,{componentStack:E.stack})}}finally{z.T=n,J.p=u}}(na&3)!==0&&zl(),Oi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Af?So++:(So=0,Af=e):So=0,Mo(0)}}function Hg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,eo(n)))}function zl(){return Bg(),Ig(),Fg(),Gg()}function Gg(){if(hn!==5)return!1;var e=wa,n=bf;bf=0;var a=Ds(na),r=z.T,u=J.p;try{J.p=32>a?32:a,z.T=null,a=Tf,Tf=null;var f=wa,_=na;if(hn=0,nr=wa=null,na=0,(De&6)!==0)throw Error(s(331));var E=De;if(De|=4,Mg(f.current),yg(f,f.current,_,a),De=E,Mo(0,!1),Xt&&typeof Xt.onPostCommitFiberRoot=="function")try{Xt.onPostCommitFiberRoot(Yt,f)}catch{}return!0}finally{J.p=u,z.T=r,Hg(e,n)}}function Vg(e,n,a){n=oi(a,n),n=af(e.stateNode,n,2),e=Ma(e,n,2),e!==null&&(xn(e,2),Oi(e))}function Ne(e,n,a){if(e.tag===3)Vg(e,e,a);else for(;n!==null;){if(n.tag===3){Vg(n,e,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ca===null||!Ca.has(r))){e=oi(a,e),a=km(2),r=Ma(n,a,2),r!==null&&(Xm(a,r,n,e),xn(r,2),Oi(r));break}}n=n.return}}function wf(e,n,a){var r=e.pingCache;if(r===null){r=e.pingCache=new jy;var u=new Set;r.set(n,u)}else u=r.get(n),u===void 0&&(u=new Set,r.set(n,u));u.has(a)||(Sf=!0,u.add(a),e=$y.bind(null,e,n,a),n.then(e,e))}function $y(e,n,a){var r=e.pingCache;r!==null&&r.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ve===e&&(Se&a)===a&&(Je===4||Je===3&&(Se&62914560)===Se&&300>ft()-Dl?(De&2)===0&&ir(e,0):Mf|=a,er===Se&&(er=0)),Oi(e)}function kg(e,n){n===0&&(n=un()),e=ns(e,n),e!==null&&(xn(e,n),Oi(e))}function tx(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),kg(e,a)}function ex(e,n){var a=0;switch(e.tag){case 31:case 13:var r=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),kg(e,a)}function nx(e,n){return Wt(e,n)}var Bl=null,sr=null,Df=!1,Il=!1,Uf=!1,Ua=0;function Oi(e){e!==sr&&e.next===null&&(sr===null?Bl=sr=e:sr=sr.next=e),Il=!0,Df||(Df=!0,ax())}function Mo(e,n){if(!Uf&&Il){Uf=!0;do for(var a=!1,r=Bl;r!==null;){if(e!==0){var u=r.pendingLanes;if(u===0)var f=0;else{var _=r.suspendedLanes,E=r.pingedLanes;f=(1<<31-Jt(42|e)+1)-1,f&=u&~(_&~E),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Yg(r,f))}else f=Se,f=Dt(r,r===Ve?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||$t(r,f)||(a=!0,Yg(r,f));r=r.next}while(a);Uf=!1}}function ix(){Xg()}function Xg(){Il=Df=!1;var e=0;Ua!==0&&px()&&(e=Ua);for(var n=ft(),a=null,r=Bl;r!==null;){var u=r.next,f=Wg(r,n);f===0?(r.next=null,a===null?Bl=u:a.next=u,u===null&&(sr=a)):(a=r,(e!==0||(f&3)!==0)&&(Il=!0)),r=u}hn!==0&&hn!==5||Mo(e),Ua!==0&&(Ua=0)}function Wg(e,n){for(var a=e.suspendedLanes,r=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var _=31-Jt(f),E=1<<_,B=u[_];B===-1?((E&a)===0||(E&r)!==0)&&(u[_]=je(E,n)):B<=n&&(e.expiredLanes|=E),f&=~E}if(n=Ve,a=Se,a=Dt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,a===0||e===n&&(Le===2||Le===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&U(r),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||$t(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(r!==null&&U(r),Ds(a)){case 2:case 8:a=kt;break;case 32:a=wt;break;case 268435456:a=ye;break;default:a=wt}return r=qg.bind(null,e),a=Wt(a,r),e.callbackPriority=n,e.callbackNode=a,n}return r!==null&&r!==null&&U(r),e.callbackPriority=2,e.callbackNode=null,2}function qg(e,n){if(hn!==0&&hn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(zl()&&e.callbackNode!==a)return null;var r=Se;return r=Dt(e,e===Ve?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Rg(e,r,n),Wg(e,ft()),e.callbackNode!=null&&e.callbackNode===a?qg.bind(null,e):null)}function Yg(e,n){if(zl())return null;Rg(e,n,!0)}function ax(){gx(function(){(De&6)!==0?Wt(dt,ix):Xg()})}function Lf(){if(Ua===0){var e=Xs;e===0&&(e=Rt,Rt<<=1,(Rt&261888)===0&&(Rt=256)),Ua=e}return Ua}function jg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:qo(""+e)}function Zg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function sx(e,n,a,r,u){if(n==="submit"&&a&&a.stateNode===u){var f=jg((u[Sn]||null).action),_=r.submitter;_&&(n=(n=_[Sn]||null)?jg(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var E=new Ko("action","action",null,r,u);e.push({event:E,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Ua!==0){var B=_?Zg(u,_):new FormData(u);Qu(a,{pending:!0,data:B,method:u.method,action:f},null,B)}}else typeof f=="function"&&(E.preventDefault(),B=_?Zg(u,_):new FormData(u),Qu(a,{pending:!0,data:B,method:u.method,action:f},f,B))},currentTarget:u}]})}}for(var Nf=0;Nf<pu.length;Nf++){var Of=pu[Nf],rx=Of.toLowerCase(),ox=Of[0].toUpperCase()+Of.slice(1);yi(rx,"on"+ox)}yi(Ap,"onAnimationEnd"),yi(Rp,"onAnimationIteration"),yi(Cp,"onAnimationStart"),yi("dblclick","onDoubleClick"),yi("focusin","onFocus"),yi("focusout","onBlur"),yi(Ey,"onTransitionRun"),yi(by,"onTransitionStart"),yi(Ty,"onTransitionCancel"),yi(wp,"onTransitionEnd"),Kt("onMouseEnter",["mouseout","mouseover"]),Kt("onMouseLeave",["mouseout","mouseover"]),Kt("onPointerEnter",["pointerout","pointerover"]),Kt("onPointerLeave",["pointerout","pointerover"]),Ot("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ot("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ot("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ot("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ot("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ot("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lx=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eo));function Kg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],u=r.event;r=r.listeners;t:{var f=void 0;if(n)for(var _=r.length-1;0<=_;_--){var E=r[_],B=E.instance,tt=E.currentTarget;if(E=E.listener,B!==f&&u.isPropagationStopped())break t;f=E,u.currentTarget=tt;try{f(u)}catch(ut){$o(ut)}u.currentTarget=null,f=B}else for(_=0;_<r.length;_++){if(E=r[_],B=E.instance,tt=E.currentTarget,E=E.listener,B!==f&&u.isPropagationStopped())break t;f=E,u.currentTarget=tt;try{f(u)}catch(ut){$o(ut)}u.currentTarget=null,f=B}}}}function ge(e,n){var a=n[kr];a===void 0&&(a=n[kr]=new Set);var r=e+"__bubble";a.has(r)||(Qg(n,e,2,!1),a.add(r))}function Pf(e,n,a){var r=0;n&&(r|=4),Qg(a,e,r,n)}var Fl="_reactListening"+Math.random().toString(36).slice(2);function zf(e){if(!e[Fl]){e[Fl]=!0,Ut.forEach(function(a){a!=="selectionchange"&&(lx.has(a)||Pf(a,!1,e),Pf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Fl]||(n[Fl]=!0,Pf("selectionchange",!1,n))}}function Qg(e,n,a,r){switch(A_(n)){case 2:var u=zx;break;case 8:u=Bx;break;default:u=Qf}a=u.bind(null,n,a,e),u=void 0,!eu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),r?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Bf(e,n,a,r,u){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var _=r.tag;if(_===3||_===4){var E=r.stateNode.containerInfo;if(E===u)break;if(_===4)for(_=r.return;_!==null;){var B=_.tag;if((B===3||B===4)&&_.stateNode.containerInfo===u)return;_=_.return}for(;E!==null;){if(_=X(E),_===null)return;if(B=_.tag,B===5||B===6||B===26||B===27){r=f=_;continue t}E=E.parentNode}}r=r.return}np(function(){var tt=f,ut=$c(a),pt=[];t:{var nt=Dp.get(e);if(nt!==void 0){var ot=Ko,It=e;switch(e){case"keypress":if(jo(a)===0)break t;case"keydown":case"keyup":ot=ey;break;case"focusin":It="focus",ot=su;break;case"focusout":It="blur",ot=su;break;case"beforeblur":case"afterblur":ot=su;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=sp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=kv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=ay;break;case Ap:case Rp:case Cp:ot=qv;break;case wp:ot=ry;break;case"scroll":case"scrollend":ot=Gv;break;case"wheel":ot=ly;break;case"copy":case"cut":case"paste":ot=jv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=op;break;case"toggle":case"beforetoggle":ot=uy}var Qt=(n&4)!==0,Ie=!Qt&&(e==="scroll"||e==="scrollend"),Y=Qt?nt!==null?nt+"Capture":null:nt;Qt=[];for(var H=tt,$;H!==null;){var ht=H;if($=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||$===null||Y===null||(ht=Xr(H,Y),ht!=null&&Qt.push(bo(H,ht,$))),Ie)break;H=H.return}0<Qt.length&&(nt=new ot(nt,It,null,a,ut),pt.push({event:nt,listeners:Qt}))}}if((n&7)===0){t:{if(nt=e==="mouseover"||e==="pointerover",ot=e==="mouseout"||e==="pointerout",nt&&a!==Jc&&(It=a.relatedTarget||a.fromElement)&&(X(It)||It[Fi]))break t;if((ot||nt)&&(nt=ut.window===ut?ut:(nt=ut.ownerDocument)?nt.defaultView||nt.parentWindow:window,ot?(It=a.relatedTarget||a.toElement,ot=tt,It=It?X(It):null,It!==null&&(Ie=c(It),Qt=It.tag,It!==Ie||Qt!==5&&Qt!==27&&Qt!==6)&&(It=null)):(ot=null,It=tt),ot!==It)){if(Qt=sp,ht="onMouseLeave",Y="onMouseEnter",H="mouse",(e==="pointerout"||e==="pointerover")&&(Qt=op,ht="onPointerLeave",Y="onPointerEnter",H="pointer"),Ie=ot==null?nt:rt(ot),$=It==null?nt:rt(It),nt=new Qt(ht,H+"leave",ot,a,ut),nt.target=Ie,nt.relatedTarget=$,ht=null,X(ut)===tt&&(Qt=new Qt(Y,H+"enter",It,a,ut),Qt.target=$,Qt.relatedTarget=Ie,ht=Qt),Ie=ht,ot&&It)e:{for(Qt=cx,Y=ot,H=It,$=0,ht=Y;ht;ht=Qt(ht))$++;ht=0;for(var Zt=H;Zt;Zt=Qt(Zt))ht++;for(;0<$-ht;)Y=Qt(Y),$--;for(;0<ht-$;)H=Qt(H),ht--;for(;$--;){if(Y===H||H!==null&&Y===H.alternate){Qt=Y;break e}Y=Qt(Y),H=Qt(H)}Qt=null}else Qt=null;ot!==null&&Jg(pt,nt,ot,Qt,!1),It!==null&&Ie!==null&&Jg(pt,Ie,It,Qt,!0)}}t:{if(nt=tt?rt(tt):window,ot=nt.nodeName&&nt.nodeName.toLowerCase(),ot==="select"||ot==="input"&&nt.type==="file")var Re=mp;else if(dp(nt))if(gp)Re=xy;else{Re=vy;var Vt=_y}else ot=nt.nodeName,!ot||ot.toLowerCase()!=="input"||nt.type!=="checkbox"&&nt.type!=="radio"?tt&&Qc(tt.elementType)&&(Re=mp):Re=yy;if(Re&&(Re=Re(e,tt))){pp(pt,Re,a,ut);break t}Vt&&Vt(e,nt,tt),e==="focusout"&&tt&&nt.type==="number"&&tt.memoizedProps.value!=null&&fn(nt,"number",nt.value)}switch(Vt=tt?rt(tt):window,e){case"focusin":(dp(Vt)||Vt.contentEditable==="true")&&(zs=Vt,fu=tt,Jr=null);break;case"focusout":Jr=fu=zs=null;break;case"mousedown":hu=!0;break;case"contextmenu":case"mouseup":case"dragend":hu=!1,bp(pt,a,ut);break;case"selectionchange":if(My)break;case"keydown":case"keyup":bp(pt,a,ut)}var le;if(ou)t:{switch(e){case"compositionstart":var Me="onCompositionStart";break t;case"compositionend":Me="onCompositionEnd";break t;case"compositionupdate":Me="onCompositionUpdate";break t}Me=void 0}else Ps?fp(e,a)&&(Me="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Me="onCompositionStart");Me&&(lp&&a.locale!=="ko"&&(Ps||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&Ps&&(le=ip()):(ma=ut,nu="value"in ma?ma.value:ma.textContent,Ps=!0)),Vt=Hl(tt,Me),0<Vt.length&&(Me=new rp(Me,e,null,a,ut),pt.push({event:Me,listeners:Vt}),le?Me.data=le:(le=hp(a),le!==null&&(Me.data=le)))),(le=hy?dy(e,a):py(e,a))&&(Me=Hl(tt,"onBeforeInput"),0<Me.length&&(Vt=new rp("onBeforeInput","beforeinput",null,a,ut),pt.push({event:Vt,listeners:Me}),Vt.data=le)),sx(pt,e,tt,a,ut)}Kg(pt,n)})}function bo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Hl(e,n){for(var a=n+"Capture",r=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Xr(e,a),u!=null&&r.unshift(bo(e,u,f)),u=Xr(e,n),u!=null&&r.push(bo(e,u,f))),e.tag===3)return r;e=e.return}return[]}function cx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Jg(e,n,a,r,u){for(var f=n._reactName,_=[];a!==null&&a!==r;){var E=a,B=E.alternate,tt=E.stateNode;if(E=E.tag,B!==null&&B===r)break;E!==5&&E!==26&&E!==27||tt===null||(B=tt,u?(tt=Xr(a,f),tt!=null&&_.unshift(bo(a,tt,B))):u||(tt=Xr(a,f),tt!=null&&_.push(bo(a,tt,B)))),a=a.return}_.length!==0&&e.push({event:n,listeners:_})}var ux=/\r\n?/g,fx=/\u0000|\uFFFD/g;function $g(e){return(typeof e=="string"?e:""+e).replace(ux,`
`).replace(fx,"")}function t_(e,n){return n=$g(n),$g(e)===n}function Be(e,n,a,r,u,f){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||Ls(e,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&Ls(e,""+r);break;case"className":Ge(e,"class",r);break;case"tabIndex":Ge(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Ge(e,a,r);break;case"style":tp(e,r,f);break;case"data":if(n!=="object"){Ge(e,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=qo(""+r),e.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Be(e,n,"name",u.name,u,null),Be(e,n,"formEncType",u.formEncType,u,null),Be(e,n,"formMethod",u.formMethod,u,null),Be(e,n,"formTarget",u.formTarget,u,null)):(Be(e,n,"encType",u.encType,u,null),Be(e,n,"method",u.method,u,null),Be(e,n,"target",u.target,u,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=qo(""+r),e.setAttribute(a,r);break;case"onClick":r!=null&&(e.onclick=Gi);break;case"onScroll":r!=null&&ge("scroll",e);break;case"onScrollEnd":r!=null&&ge("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}a=qo(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""+r):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":r===!0?e.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(a,r):e.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(a):e.setAttribute(a,r);break;case"popover":ge("beforetoggle",e),ge("toggle",e),Xe(e,"popover",r);break;case"xlinkActuate":re(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":re(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":re(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":re(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":re(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":re(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":re(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":re(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":re(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Xe(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Fv.get(a)||a,Xe(e,a,r))}}function If(e,n,a,r,u,f){switch(a){case"style":tp(e,r,f);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof r=="string"?Ls(e,r):(typeof r=="number"||typeof r=="bigint")&&Ls(e,""+r);break;case"onScroll":r!=null&&ge("scroll",e);break;case"onScrollEnd":r!=null&&ge("scrollend",e);break;case"onClick":r!=null&&(e.onclick=Gi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Pt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[Sn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof r=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,r,u);break t}a in e?e[a]=r:r===!0?e.setAttribute(a,""):Xe(e,a,r)}}}function Tn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ge("error",e),ge("load",e);var r=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":r=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Be(e,n,f,_,a,null)}}u&&Be(e,n,"srcSet",a.srcSet,a,null),r&&Be(e,n,"src",a.src,a,null);return;case"input":ge("invalid",e);var E=f=_=u=null,B=null,tt=null;for(r in a)if(a.hasOwnProperty(r)){var ut=a[r];if(ut!=null)switch(r){case"name":u=ut;break;case"type":_=ut;break;case"checked":B=ut;break;case"defaultChecked":tt=ut;break;case"value":f=ut;break;case"defaultValue":E=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:Be(e,n,r,ut,a,null)}}On(e,f,E,B,tt,_,u,!1);return;case"select":ge("invalid",e),r=_=f=null;for(u in a)if(a.hasOwnProperty(u)&&(E=a[u],E!=null))switch(u){case"value":f=E;break;case"defaultValue":_=E;break;case"multiple":r=E;default:Be(e,n,u,E,a,null)}n=f,a=_,e.multiple=!!r,n!=null?tn(e,!!r,n,!1):a!=null&&tn(e,!!r,a,!0);return;case"textarea":ge("invalid",e),f=u=r=null;for(_ in a)if(a.hasOwnProperty(_)&&(E=a[_],E!=null))switch(_){case"value":r=E;break;case"defaultValue":u=E;break;case"children":f=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(s(91));break;default:Be(e,n,_,E,a,null)}Di(e,r,u,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(r=a[B],r!=null))switch(B){case"selected":e.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Be(e,n,B,r,a,null)}return;case"dialog":ge("beforetoggle",e),ge("toggle",e),ge("cancel",e),ge("close",e);break;case"iframe":case"object":ge("load",e);break;case"video":case"audio":for(r=0;r<Eo.length;r++)ge(Eo[r],e);break;case"image":ge("error",e),ge("load",e);break;case"details":ge("toggle",e);break;case"embed":case"source":case"link":ge("error",e),ge("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(r=a[tt],r!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Be(e,n,tt,r,a,null)}return;default:if(Qc(n)){for(ut in a)a.hasOwnProperty(ut)&&(r=a[ut],r!==void 0&&If(e,n,ut,r,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(r=a[E],r!=null&&Be(e,n,E,r,a,null))}function hx(e,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,_=null,E=null,B=null,tt=null,ut=null;for(ot in a){var pt=a[ot];if(a.hasOwnProperty(ot)&&pt!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":B=pt;default:r.hasOwnProperty(ot)||Be(e,n,ot,null,r,pt)}}for(var nt in r){var ot=r[nt];if(pt=a[nt],r.hasOwnProperty(nt)&&(ot!=null||pt!=null))switch(nt){case"type":f=ot;break;case"name":u=ot;break;case"checked":tt=ot;break;case"defaultChecked":ut=ot;break;case"value":_=ot;break;case"defaultValue":E=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,n));break;default:ot!==pt&&Be(e,n,nt,ot,r,pt)}}wn(e,_,E,B,tt,ut,f,u);return;case"select":ot=_=E=nt=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":ot=B;default:r.hasOwnProperty(f)||Be(e,n,f,null,r,B)}for(u in r)if(f=r[u],B=a[u],r.hasOwnProperty(u)&&(f!=null||B!=null))switch(u){case"value":nt=f;break;case"defaultValue":E=f;break;case"multiple":_=f;default:f!==B&&Be(e,n,u,f,r,B)}n=E,a=_,r=ot,nt!=null?tn(e,!!a,nt,!1):!!r!=!!a&&(n!=null?tn(e,!!a,n,!0):tn(e,!!a,a?[]:"",!1));return;case"textarea":ot=nt=null;for(E in a)if(u=a[E],a.hasOwnProperty(E)&&u!=null&&!r.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Be(e,n,E,null,r,u)}for(_ in r)if(u=r[_],f=a[_],r.hasOwnProperty(_)&&(u!=null||f!=null))switch(_){case"value":nt=u;break;case"defaultValue":ot=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Be(e,n,_,u,r,f)}Us(e,nt,ot);return;case"option":for(var It in a)if(nt=a[It],a.hasOwnProperty(It)&&nt!=null&&!r.hasOwnProperty(It))switch(It){case"selected":e.selected=!1;break;default:Be(e,n,It,null,r,nt)}for(B in r)if(nt=r[B],ot=a[B],r.hasOwnProperty(B)&&nt!==ot&&(nt!=null||ot!=null))switch(B){case"selected":e.selected=nt&&typeof nt!="function"&&typeof nt!="symbol";break;default:Be(e,n,B,nt,r,ot)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Qt in a)nt=a[Qt],a.hasOwnProperty(Qt)&&nt!=null&&!r.hasOwnProperty(Qt)&&Be(e,n,Qt,null,r,nt);for(tt in r)if(nt=r[tt],ot=a[tt],r.hasOwnProperty(tt)&&nt!==ot&&(nt!=null||ot!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(s(137,n));break;default:Be(e,n,tt,nt,r,ot)}return;default:if(Qc(n)){for(var Ie in a)nt=a[Ie],a.hasOwnProperty(Ie)&&nt!==void 0&&!r.hasOwnProperty(Ie)&&If(e,n,Ie,void 0,r,nt);for(ut in r)nt=r[ut],ot=a[ut],!r.hasOwnProperty(ut)||nt===ot||nt===void 0&&ot===void 0||If(e,n,ut,nt,r,ot);return}}for(var Y in a)nt=a[Y],a.hasOwnProperty(Y)&&nt!=null&&!r.hasOwnProperty(Y)&&Be(e,n,Y,null,r,nt);for(pt in r)nt=r[pt],ot=a[pt],!r.hasOwnProperty(pt)||nt===ot||nt==null&&ot==null||Be(e,n,pt,nt,r,ot)}function e_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function dx(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var u=a[r],f=u.transferSize,_=u.initiatorType,E=u.duration;if(f&&E&&e_(_)){for(_=0,E=u.responseEnd,r+=1;r<a.length;r++){var B=a[r],tt=B.startTime;if(tt>E)break;var ut=B.transferSize,pt=B.initiatorType;ut&&e_(pt)&&(B=B.responseEnd,_+=ut*(B<E?1:(E-tt)/(B-tt)))}if(--r,n+=8*(f+_)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Ff=null,Hf=null;function Gl(e){return e.nodeType===9?e:e.ownerDocument}function n_(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function i_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Gf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Vf=null;function px(){var e=window.event;return e&&e.type==="popstate"?e===Vf?!1:(Vf=e,!0):(Vf=null,!1)}var a_=typeof setTimeout=="function"?setTimeout:void 0,mx=typeof clearTimeout=="function"?clearTimeout:void 0,s_=typeof Promise=="function"?Promise:void 0,gx=typeof queueMicrotask=="function"?queueMicrotask:typeof s_<"u"?function(e){return s_.resolve(null).then(e).catch(_x)}:a_;function _x(e){setTimeout(function(){throw e})}function La(e){return e==="head"}function r_(e,n){var a=n,r=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(r===0){e.removeChild(u),cr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")To(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,To(a);for(var f=a.firstChild;f;){var _=f.nextSibling,E=f.nodeName;f[Qa]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&To(e.ownerDocument.body);a=u}while(a);cr(n)}function o_(e,n){var a=e;e=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=r}while(a)}function kf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":kf(a),A(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function vx(e,n,a,r){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[Qa])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=hi(e.nextSibling),e===null)break}return null}function yx(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=hi(e.nextSibling),e===null))return null;return e}function l_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=hi(e.nextSibling),e===null))return null;return e}function Xf(e){return e.data==="$?"||e.data==="$~"}function Wf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function xx(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function hi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var qf=null;function c_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return hi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function u_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function f_(e,n,a){switch(n=Gl(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function To(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);A(e)}var di=new Map,h_=new Set;function Vl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ia=J.d;J.d={f:Sx,r:Mx,D:Ex,C:bx,L:Tx,m:Ax,X:Cx,S:Rx,M:wx};function Sx(){var e=ia.f(),n=Nl();return e||n}function Mx(e){var n=st(e);n!==null&&n.tag===5&&n.type==="form"?wm(n):ia.r(e)}var rr=typeof document>"u"?null:document;function d_(e,n,a){var r=rr;if(r&&typeof n=="string"&&n){var u=pe(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),h_.has(u)||(h_.add(u),e={rel:e,crossOrigin:a,href:n},r.querySelector(u)===null&&(n=r.createElement("link"),Tn(n,"link",e),vt(n),r.head.appendChild(n)))}}function Ex(e){ia.D(e),d_("dns-prefetch",e,null)}function bx(e,n){ia.C(e,n),d_("preconnect",e,n)}function Tx(e,n,a){ia.L(e,n,a);var r=rr;if(r&&e&&n){var u='link[rel="preload"][as="'+pe(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+pe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+pe(a.imageSizes)+'"]')):u+='[href="'+pe(e)+'"]';var f=u;switch(n){case"style":f=or(e);break;case"script":f=lr(e)}di.has(f)||(e=v({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),di.set(f,e),r.querySelector(u)!==null||n==="style"&&r.querySelector(Ao(f))||n==="script"&&r.querySelector(Ro(f))||(n=r.createElement("link"),Tn(n,"link",e),vt(n),r.head.appendChild(n)))}}function Ax(e,n){ia.m(e,n);var a=rr;if(a&&e){var r=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+pe(r)+'"][href="'+pe(e)+'"]',f=u;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=lr(e)}if(!di.has(f)&&(e=v({rel:"modulepreload",href:e},n),di.set(f,e),a.querySelector(u)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ro(f)))return}r=a.createElement("link"),Tn(r,"link",e),vt(r),a.head.appendChild(r)}}}function Rx(e,n,a){ia.S(e,n,a);var r=rr;if(r&&e){var u=q(r).hoistableStyles,f=or(e);n=n||"default";var _=u.get(f);if(!_){var E={loading:0,preload:null};if(_=r.querySelector(Ao(f)))E.loading=5;else{e=v({rel:"stylesheet",href:e,"data-precedence":n},a),(a=di.get(f))&&Yf(e,a);var B=_=r.createElement("link");vt(B),Tn(B,"link",e),B._p=new Promise(function(tt,ut){B.onload=tt,B.onerror=ut}),B.addEventListener("load",function(){E.loading|=1}),B.addEventListener("error",function(){E.loading|=2}),E.loading|=4,kl(_,n,r)}_={type:"stylesheet",instance:_,count:1,state:E},u.set(f,_)}}}function Cx(e,n){ia.X(e,n);var a=rr;if(a&&e){var r=q(a).hoistableScripts,u=lr(e),f=r.get(u);f||(f=a.querySelector(Ro(u)),f||(e=v({src:e,async:!0},n),(n=di.get(u))&&jf(e,n),f=a.createElement("script"),vt(f),Tn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(u,f))}}function wx(e,n){ia.M(e,n);var a=rr;if(a&&e){var r=q(a).hoistableScripts,u=lr(e),f=r.get(u);f||(f=a.querySelector(Ro(u)),f||(e=v({src:e,async:!0,type:"module"},n),(n=di.get(u))&&jf(e,n),f=a.createElement("script"),vt(f),Tn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(u,f))}}function p_(e,n,a,r){var u=(u=Et.current)?Vl(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=or(a.href),a=q(u).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=or(a.href);var f=q(u).hoistableStyles,_=f.get(e);if(_||(u=u.ownerDocument||u,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,_),(f=u.querySelector(Ao(e)))&&!f._p&&(_.instance=f,_.state.loading=5),di.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},di.set(e,a),f||Dx(u,e,a,_.state))),n&&r===null)throw Error(s(528,""));return _}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=lr(a),a=q(u).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function or(e){return'href="'+pe(e)+'"'}function Ao(e){return'link[rel="stylesheet"]['+e+"]"}function m_(e){return v({},e,{"data-precedence":e.precedence,precedence:null})}function Dx(e,n,a,r){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=e.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),Tn(n,"link",a),vt(n),e.head.appendChild(n))}function lr(e){return'[src="'+pe(e)+'"]'}function Ro(e){return"script[async]"+e}function g_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=e.querySelector('style[data-href~="'+pe(a.href)+'"]');if(r)return n.instance=r,vt(r),r;var u=v({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),vt(r),Tn(r,"style",u),kl(r,a.precedence,e),n.instance=r;case"stylesheet":u=or(a.href);var f=e.querySelector(Ao(u));if(f)return n.state.loading|=4,n.instance=f,vt(f),f;r=m_(a),(u=di.get(u))&&Yf(r,u),f=(e.ownerDocument||e).createElement("link"),vt(f);var _=f;return _._p=new Promise(function(E,B){_.onload=E,_.onerror=B}),Tn(f,"link",r),n.state.loading|=4,kl(f,a.precedence,e),n.instance=f;case"script":return f=lr(a.src),(u=e.querySelector(Ro(f)))?(n.instance=u,vt(u),u):(r=a,(u=di.get(f))&&(r=v({},a),jf(r,u)),e=e.ownerDocument||e,u=e.createElement("script"),vt(u),Tn(u,"link",r),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,kl(r,a.precedence,e));return n.instance}function kl(e,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=r.length?r[r.length-1]:null,f=u,_=0;_<r.length;_++){var E=r[_];if(E.dataset.precedence===n)f=E;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function Yf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function jf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Xl=null;function __(e,n,a){if(Xl===null){var r=new Map,u=Xl=new Map;u.set(a,r)}else u=Xl,r=u.get(a),r||(r=new Map,u.set(a,r));if(r.has(e))return r;for(r.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[Qa]||f[Ke]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=e+_;var E=r.get(_);E?E.push(f):r.set(_,[f])}}return r}function v_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function Ux(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function y_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Lx(e,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=or(r.href),f=n.querySelector(Ao(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Wl.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,vt(f);return}f=n.ownerDocument||n,r=m_(r),(u=di.get(u))&&Yf(r,u),f=f.createElement("link"),vt(f);var _=f;_._p=new Promise(function(E,B){_.onload=E,_.onerror=B}),Tn(f,"link",r),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=Wl.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var Zf=0;function Nx(e,n){return e.stylesheets&&e.count===0&&Yl(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var r=setTimeout(function(){if(e.stylesheets&&Yl(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&Zf===0&&(Zf=62500*dx());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Yl(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>Zf?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(u)}}:null}function Wl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Yl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ql=null;function Yl(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ql=new Map,n.forEach(Ox,e),ql=null,Wl.call(e))}function Ox(e,n){if(!(n.state.loading&4)){var a=ql.get(e);if(a)var r=a.get(null);else{a=new Map,ql.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var _=u[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),r=_)}r&&a.set(null,r)}u=n.instance,_=u.getAttribute("data-precedence"),f=a.get(_)||r,f===r&&a.set(null,u),a.set(_,u),this.count++,r=Wl.bind(this),u.addEventListener("load",r),u.addEventListener("error",r),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Co={$$typeof:O,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Px(e,n,a,r,u,f,_,E,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=be(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=be(0),this.hiddenUpdates=be(null),this.identifierPrefix=r,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function x_(e,n,a,r,u,f,_,E,B,tt,ut,pt){return e=new Px(e,n,a,_,B,tt,ut,pt,E),n=1,f===!0&&(n|=24),f=Qn(3,null,null,n),e.current=f,f.stateNode=e,n=Ru(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Uu(f),e}function S_(e){return e?(e=Fs,e):Fs}function M_(e,n,a,r,u,f){u=S_(u),r.context===null?r.context=u:r.pendingContext=u,r=Sa(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=Ma(e,r,n),a!==null&&(kn(a,e,n),so(a,e,n))}function E_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Kf(e,n){E_(e,n),(e=e.alternate)&&E_(e,n)}function b_(e){if(e.tag===13||e.tag===31){var n=ns(e,67108864);n!==null&&kn(n,e,67108864),Kf(e,67108864)}}function T_(e){if(e.tag===13||e.tag===31){var n=ni();n=Za(n);var a=ns(e,n);a!==null&&kn(a,e,n),Kf(e,n)}}var jl=!0;function zx(e,n,a,r){var u=z.T;z.T=null;var f=J.p;try{J.p=2,Qf(e,n,a,r)}finally{J.p=f,z.T=u}}function Bx(e,n,a,r){var u=z.T;z.T=null;var f=J.p;try{J.p=8,Qf(e,n,a,r)}finally{J.p=f,z.T=u}}function Qf(e,n,a,r){if(jl){var u=Jf(r);if(u===null)Bf(e,n,r,Zl,a),R_(e,r);else if(Fx(u,e,n,a,r))r.stopPropagation();else if(R_(e,r),n&4&&-1<Ix.indexOf(e)){for(;u!==null;){var f=st(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=Ct(f.pendingLanes);if(_!==0){var E=f;for(E.pendingLanes|=2,E.entangledLanes|=2;_;){var B=1<<31-Jt(_);E.entanglements[1]|=B,_&=~B}Oi(f),(De&6)===0&&(Ul=ft()+500,Mo(0))}}break;case 31:case 13:E=ns(f,2),E!==null&&kn(E,f,2),Nl(),Kf(f,2)}if(f=Jf(r),f===null&&Bf(e,n,r,Zl,a),f===u)break;u=f}u!==null&&r.stopPropagation()}else Bf(e,n,r,null,a)}}function Jf(e){return e=$c(e),$f(e)}var Zl=null;function $f(e){if(Zl=null,e=X(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Zl=e,null}function A_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case dt:return 2;case kt:return 8;case wt:case zt:return 32;case ye:return 268435456;default:return 32}default:return 32}}var th=!1,Na=null,Oa=null,Pa=null,wo=new Map,Do=new Map,za=[],Ix="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function R_(e,n){switch(e){case"focusin":case"focusout":Na=null;break;case"dragenter":case"dragleave":Oa=null;break;case"mouseover":case"mouseout":Pa=null;break;case"pointerover":case"pointerout":wo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Do.delete(n.pointerId)}}function Uo(e,n,a,r,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[u]},n!==null&&(n=st(n),n!==null&&b_(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function Fx(e,n,a,r,u){switch(n){case"focusin":return Na=Uo(Na,e,n,a,r,u),!0;case"dragenter":return Oa=Uo(Oa,e,n,a,r,u),!0;case"mouseover":return Pa=Uo(Pa,e,n,a,r,u),!0;case"pointerover":var f=u.pointerId;return wo.set(f,Uo(wo.get(f)||null,e,n,a,r,u)),!0;case"gotpointercapture":return f=u.pointerId,Do.set(f,Uo(Do.get(f)||null,e,n,a,r,u)),!0}return!1}function C_(e){var n=X(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Ka(e.priority,function(){T_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,Ka(e.priority,function(){T_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kl(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Jf(e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);Jc=r,a.target.dispatchEvent(r),Jc=null}else return n=st(a),n!==null&&b_(n),e.blockedOn=a,!1;n.shift()}return!0}function w_(e,n,a){Kl(e)&&a.delete(n)}function Hx(){th=!1,Na!==null&&Kl(Na)&&(Na=null),Oa!==null&&Kl(Oa)&&(Oa=null),Pa!==null&&Kl(Pa)&&(Pa=null),wo.forEach(w_),Do.forEach(w_)}function Ql(e,n){e.blockedOn===n&&(e.blockedOn=null,th||(th=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Hx)))}var Jl=null;function D_(e){Jl!==e&&(Jl=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Jl===e&&(Jl=null);for(var n=0;n<e.length;n+=3){var a=e[n],r=e[n+1],u=e[n+2];if(typeof r!="function"){if($f(r||a)===null)continue;break}var f=st(a);f!==null&&(e.splice(n,3),n-=3,Qu(f,{pending:!0,data:u,method:a.method,action:r},r,u))}}))}function cr(e){function n(B){return Ql(B,e)}Na!==null&&Ql(Na,e),Oa!==null&&Ql(Oa,e),Pa!==null&&Ql(Pa,e),wo.forEach(n),Do.forEach(n);for(var a=0;a<za.length;a++){var r=za[a];r.blockedOn===e&&(r.blockedOn=null)}for(;0<za.length&&(a=za[0],a.blockedOn===null);)C_(a),a.blockedOn===null&&za.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var u=a[r],f=a[r+1],_=u[Sn]||null;if(typeof f=="function")_||D_(a);else if(_){var E=null;if(f&&f.hasAttribute("formAction")){if(u=f,_=f[Sn]||null)E=_.formAction;else if($f(u)!==null)continue}else E=_.action;typeof E=="function"?a[r+1]=E:(a.splice(r,3),r-=3),D_(a)}}}function U_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return u=_})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function eh(e){this._internalRoot=e}$l.prototype.render=eh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ni();M_(a,r,e,n,null,null)},$l.prototype.unmount=eh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;M_(e.current,2,null,e,null,null),Nl(),n[Fi]=null}};function $l(e){this._internalRoot=e}$l.prototype.unstable_scheduleHydration=function(e){if(e){var n=Vr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<za.length&&n!==0&&n<za[a].priority;a++);za.splice(a,0,e),a===0&&C_(e)}};var L_=t.version;if(L_!=="19.2.8")throw Error(s(527,L_,"19.2.8"));J.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Gx={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var tc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!tc.isDisabled&&tc.supportsFiber)try{Yt=tc.inject(Gx),Xt=tc}catch{}}return No.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,r="",u=Fm,f=Hm,_=Gm;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=x_(e,1,!1,null,null,a,r,null,u,f,_,U_),e[Fi]=n.current,zf(e),new eh(n)},No.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var r=!1,u="",f=Fm,_=Hm,E=Gm,B=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=x_(e,1,!0,n,a??null,r,u,B,f,_,E,U_),n.context=S_(null),a=n.current,r=ni(),r=Za(r),u=Sa(r),u.callback=null,Ma(a,u,r),a=r,n.current.lanes=a,xn(n,a),Oi(n),e[Fi]=n.current,zf(e),new $l(n)},No.version="19.2.8",No}var V_;function $x(){if(V_)return ah.exports;V_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),ah.exports=Jx(),ah.exports}var tS=$x();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hd="171",Rr={ROTATE:0,DOLLY:1,PAN:2},Tr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},eS=0,k_=1,nS=2,$0=1,tv=2,ca=3,Ya=0,Yn=1,Ti=2,Wa=0,Cr=1,X_=2,W_=3,q_=4,iS=5,Ms=100,aS=101,sS=102,rS=103,oS=104,lS=200,cS=201,uS=202,fS=203,Kh=204,Qh=205,hS=206,dS=207,pS=208,mS=209,gS=210,_S=211,vS=212,yS=213,xS=214,Jh=0,$h=1,td=2,Ur=3,ed=4,nd=5,id=6,ad=7,ev=0,SS=1,MS=2,qa=0,ES=1,bS=2,TS=3,AS=4,RS=5,CS=6,wS=7,nv=300,Lr=301,Nr=302,sd=303,rd=304,Xc=306,od=1e3,bs=1001,ld=1002,Ci=1003,DS=1004,ec=1005,Bi=1006,lh=1007,Ts=1008,pa=1009,iv=1010,av=1011,Go=1012,Gd=1013,As=1014,ua=1015,Vo=1016,Vd=1017,kd=1018,Or=1020,sv=35902,rv=1021,ov=1022,Ri=1023,lv=1024,cv=1025,wr=1026,Pr=1027,uv=1028,Xd=1029,fv=1030,Wd=1031,qd=1033,Dc=33776,Uc=33777,Lc=33778,Nc=33779,cd=35840,ud=35841,fd=35842,hd=35843,dd=36196,pd=37492,md=37496,gd=37808,_d=37809,vd=37810,yd=37811,xd=37812,Sd=37813,Md=37814,Ed=37815,bd=37816,Td=37817,Ad=37818,Rd=37819,Cd=37820,wd=37821,Oc=36492,Dd=36494,Ud=36495,hv=36283,Ld=36284,Nd=36285,Od=36286,US=3200,LS=3201,dv=0,NS=1,Xa="",mi="srgb",zr="srgb-linear",Bc="linear",Fe="srgb",ur=7680,Y_=519,OS=512,PS=513,zS=514,pv=515,BS=516,IS=517,FS=518,HS=519,j_=35044,Z_="300 es",fa=2e3,Ic=2001;class Cs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const Un=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pc=Math.PI/180,Pd=180/Math.PI;function ko(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Un[o&255]+Un[o>>8&255]+Un[o>>16&255]+Un[o>>24&255]+"-"+Un[t&255]+Un[t>>8&255]+"-"+Un[t>>16&15|64]+Un[t>>24&255]+"-"+Un[i&63|128]+Un[i>>8&255]+"-"+Un[i>>16&255]+Un[i>>24&255]+Un[s&255]+Un[s>>8&255]+Un[s>>16&255]+Un[s>>24&255]).toLowerCase()}function _e(o,t,i){return Math.max(t,Math.min(i,o))}function GS(o,t){return(o%t+t)%t}function ch(o,t,i){return(1-i)*o+i*t}function Oo(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Xn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const VS={DEG2RAD:Pc};class ae{constructor(t=0,i=0){ae.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,i,s,l,c,h,d,m,p){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p)}set(t,i,s,l,c,h,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=m,g[6]=s,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],g=s[4],v=s[7],x=s[2],M=s[5],b=s[8],R=l[0],S=l[3],y=l[6],I=l[1],O=l[4],L=l[7],Q=l[2],G=l[5],P=l[8];return c[0]=h*R+d*I+m*Q,c[3]=h*S+d*O+m*G,c[6]=h*y+d*L+m*P,c[1]=p*R+g*I+v*Q,c[4]=p*S+g*O+v*G,c[7]=p*y+g*L+v*P,c[2]=x*R+M*I+b*Q,c[5]=x*S+M*O+b*G,c[8]=x*y+M*L+b*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return i*h*g-i*d*p-s*c*g+s*d*m+l*c*p-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],v=g*h-d*p,x=d*m-g*c,M=p*c-h*m,b=i*v+s*x+l*M;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/b;return t[0]=v*R,t[1]=(l*p-g*s)*R,t[2]=(d*s-l*h)*R,t[3]=x*R,t[4]=(g*i-l*m)*R,t[5]=(l*c-d*i)*R,t[6]=M*R,t[7]=(s*m-p*i)*R,t[8]=(h*i-s*c)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(uh.makeScale(t,i)),this}rotate(t){return this.premultiply(uh.makeRotation(-t)),this}translate(t,i){return this.premultiply(uh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const uh=new ce;function mv(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function Fc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function kS(){const o=Fc("canvas");return o.style.display="block",o}const K_={};function br(o){o in K_||(K_[o]=!0,console.warn(o))}function XS(o,t,i){return new Promise(function(s,l){function c(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function WS(o){const t=o.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function qS(o){const t=o.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Q_=new ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),J_=new ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function YS(){const o={enabled:!0,workingColorSpace:zr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Fe&&(l.r=ha(l.r),l.g=ha(l.g),l.b=ha(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Fe&&(l.r=Dr(l.r),l.g=Dr(l.g),l.b=Dr(l.b))),l},fromWorkingColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},toWorkingColorSpace:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Xa?Bc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[zr]:{primaries:t,whitePoint:s,transfer:Bc,toXYZ:Q_,fromXYZ:J_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:t,whitePoint:s,transfer:Fe,toXYZ:Q_,fromXYZ:J_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),o}const we=YS();function ha(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Dr(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let fr;class jS{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{fr===void 0&&(fr=Fc("canvas")),fr.width=t.width,fr.height=t.height;const s=fr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=fr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Fc("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=ha(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(ha(i[s]/255)*255):i[s]=ha(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ZS=0;class gv{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=ko(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(fh(l[h].image)):c.push(fh(l[h]))}else c=fh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function fh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?jS.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let KS=0;class jn extends Cs{constructor(t=jn.DEFAULT_IMAGE,i=jn.DEFAULT_MAPPING,s=bs,l=bs,c=Bi,h=Ts,d=Ri,m=pa,p=jn.DEFAULT_ANISOTROPY,g=Xa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=ko(),this.name="",this.source=new gv(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case od:t.x=t.x-Math.floor(t.x);break;case bs:t.x=t.x<0?0:1;break;case ld:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case od:t.y=t.y-Math.floor(t.y);break;case bs:t.y=t.y<0?0:1;break;case ld:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=nv;jn.DEFAULT_ANISOTROPY=1;class $e{constructor(t=0,i=0,s=0,l=1){$e.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,p=m[0],g=m[4],v=m[8],x=m[1],M=m[5],b=m[9],R=m[2],S=m[6],y=m[10];if(Math.abs(g-x)<.01&&Math.abs(v-R)<.01&&Math.abs(b-S)<.01){if(Math.abs(g+x)<.1&&Math.abs(v+R)<.1&&Math.abs(b+S)<.1&&Math.abs(p+M+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(p+1)/2,L=(M+1)/2,Q=(y+1)/2,G=(g+x)/4,P=(v+R)/4,W=(b+S)/4;return O>L&&O>Q?O<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(O),l=G/s,c=P/s):L>Q?L<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(L),s=G/l,c=W/l):Q<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(Q),s=P/c,l=W/c),this.set(s,l,c,i),this}let I=Math.sqrt((S-b)*(S-b)+(v-R)*(v-R)+(x-g)*(x-g));return Math.abs(I)<.001&&(I=1),this.x=(S-b)/I,this.y=(v-R)/I,this.z=(x-g)/I,this.w=Math.acos((p+M+y-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this.w=_e(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this.w=_e(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class QS extends Cs{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new $e(0,0,t,i),this.scissorTest=!1,this.viewport=new $e(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new jn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new gv(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rs extends QS{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class _v extends jn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Ci,this.minFilter=Ci,this.wrapR=bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class JS extends jn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Ci,this.minFilter=Ci,this.wrapR=bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rn{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,d){let m=s[l+0],p=s[l+1],g=s[l+2],v=s[l+3];const x=c[h+0],M=c[h+1],b=c[h+2],R=c[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=g,t[i+3]=v;return}if(d===1){t[i+0]=x,t[i+1]=M,t[i+2]=b,t[i+3]=R;return}if(v!==R||m!==x||p!==M||g!==b){let S=1-d;const y=m*x+p*M+g*b+v*R,I=y>=0?1:-1,O=1-y*y;if(O>Number.EPSILON){const Q=Math.sqrt(O),G=Math.atan2(Q,y*I);S=Math.sin(S*G)/Q,d=Math.sin(d*G)/Q}const L=d*I;if(m=m*S+x*L,p=p*S+M*L,g=g*S+b*L,v=v*S+R*L,S===1-d){const Q=1/Math.sqrt(m*m+p*p+g*g+v*v);m*=Q,p*=Q,g*=Q,v*=Q}}t[i]=m,t[i+1]=p,t[i+2]=g,t[i+3]=v}static multiplyQuaternionsFlat(t,i,s,l,c,h){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],v=c[h],x=c[h+1],M=c[h+2],b=c[h+3];return t[i]=d*b+g*v+m*M-p*x,t[i+1]=m*b+g*x+p*v-d*M,t[i+2]=p*b+g*M+d*x-m*v,t[i+3]=g*b-d*v-m*x-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),v=d(c/2),x=m(s/2),M=m(l/2),b=m(c/2);switch(h){case"XYZ":this._x=x*g*v+p*M*b,this._y=p*M*v-x*g*b,this._z=p*g*b+x*M*v,this._w=p*g*v-x*M*b;break;case"YXZ":this._x=x*g*v+p*M*b,this._y=p*M*v-x*g*b,this._z=p*g*b-x*M*v,this._w=p*g*v+x*M*b;break;case"ZXY":this._x=x*g*v-p*M*b,this._y=p*M*v+x*g*b,this._z=p*g*b+x*M*v,this._w=p*g*v-x*M*b;break;case"ZYX":this._x=x*g*v-p*M*b,this._y=p*M*v+x*g*b,this._z=p*g*b-x*M*v,this._w=p*g*v+x*M*b;break;case"YZX":this._x=x*g*v+p*M*b,this._y=p*M*v+x*g*b,this._z=p*g*b-x*M*v,this._w=p*g*v-x*M*b;break;case"XZY":this._x=x*g*v-p*M*b,this._y=p*M*v-x*g*b,this._z=p*g*b+x*M*v,this._w=p*g*v+x*M*b;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],g=i[6],v=i[10],x=s+d+v;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(g-m)*M,this._y=(c-p)*M,this._z=(h-l)*M}else if(s>d&&s>v){const M=2*Math.sqrt(1+s-d-v);this._w=(g-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(c+p)/M}else if(d>v){const M=2*Math.sqrt(1+d-s-v);this._w=(c-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+v-s-d);this._w=(h-l)/M,this._x=(c+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(_e(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=s*g+h*d+l*p-c*m,this._y=l*g+h*m+c*d-s*p,this._z=c*g+h*p+s*m-l*d,this._w=h*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*c+i*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),v=Math.sin((1-i)*g)/p,x=Math.sin(i*g)/p;return this._w=h*v+this._w*x,this._x=s*v+this._x*x,this._y=l*v+this._y*x,this._z=c*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,i=0,s=0){V.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion($_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion($_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*s),g=2*(d*i-c*l),v=2*(c*s-h*i);return this.x=i+m*p+h*v-d*g,this.y=s+m*g+d*p-c*v,this.z=l+m*v+c*g-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=_e(this.x,t.x,i.x),this.y=_e(this.y,t.y,i.y),this.z=_e(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=_e(this.x,t,i),this.y=_e(this.y,t,i),this.z=_e(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(_e(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-s*m,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return hh.copy(this).projectOnVector(t),this.sub(hh)}reflect(t){return this.sub(hh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(_e(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hh=new V,$_=new Rn;class da{constructor(t=new V(1/0,1/0,1/0),i=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(Mi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(Mi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=Mi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,Mi):Mi.fromBufferAttribute(c,h),Mi.applyMatrix4(t.matrixWorld),this.expandByPoint(Mi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nc.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),nc.copy(s.boundingBox)),nc.applyMatrix4(t.matrixWorld),this.union(nc)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Mi),Mi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Po),ic.subVectors(this.max,Po),hr.subVectors(t.a,Po),dr.subVectors(t.b,Po),pr.subVectors(t.c,Po),Ia.subVectors(dr,hr),Fa.subVectors(pr,dr),ms.subVectors(hr,pr);let i=[0,-Ia.z,Ia.y,0,-Fa.z,Fa.y,0,-ms.z,ms.y,Ia.z,0,-Ia.x,Fa.z,0,-Fa.x,ms.z,0,-ms.x,-Ia.y,Ia.x,0,-Fa.y,Fa.x,0,-ms.y,ms.x,0];return!dh(i,hr,dr,pr,ic)||(i=[1,0,0,0,1,0,0,0,1],!dh(i,hr,dr,pr,ic))?!1:(ac.crossVectors(Ia,Fa),i=[ac.x,ac.y,ac.z],dh(i,hr,dr,pr,ic))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Mi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(aa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),aa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),aa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),aa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),aa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),aa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),aa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),aa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(aa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const aa=[new V,new V,new V,new V,new V,new V,new V,new V],Mi=new V,nc=new da,hr=new V,dr=new V,pr=new V,Ia=new V,Fa=new V,ms=new V,Po=new V,ic=new V,ac=new V,gs=new V;function dh(o,t,i,s,l){for(let c=0,h=o.length-3;c<=h;c+=3){gs.fromArray(o,c);const d=l.x*Math.abs(gs.x)+l.y*Math.abs(gs.y)+l.z*Math.abs(gs.z),m=t.dot(gs),p=i.dot(gs),g=s.dot(gs);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const $S=new da,zo=new V,ph=new V;class Wc{constructor(t=new V,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):$S.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zo.subVectors(t,this.center);const i=zo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(zo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ph.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zo.copy(t.center).add(ph)),this.expandByPoint(zo.copy(t.center).sub(ph))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sa=new V,mh=new V,sc=new V,Ha=new V,gh=new V,rc=new V,_h=new V;class qc{constructor(t=new V,i=new V(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=sa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(sa.copy(this.origin).addScaledVector(this.direction,i),sa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){mh.copy(t).add(i).multiplyScalar(.5),sc.copy(i).sub(t).normalize(),Ha.copy(this.origin).sub(mh);const c=t.distanceTo(i)*.5,h=-this.direction.dot(sc),d=Ha.dot(this.direction),m=-Ha.dot(sc),p=Ha.lengthSq(),g=Math.abs(1-h*h);let v,x,M,b;if(g>0)if(v=h*m-d,x=h*d-m,b=c*g,v>=0)if(x>=-b)if(x<=b){const R=1/g;v*=R,x*=R,M=v*(v+h*x+2*d)+x*(h*v+x+2*m)+p}else x=c,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*m)+p;else x=-c,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*m)+p;else x<=-b?(v=Math.max(0,-(-h*c+d)),x=v>0?-c:Math.min(Math.max(-c,-m),c),M=-v*v+x*(x+2*m)+p):x<=b?(v=0,x=Math.min(Math.max(-c,-m),c),M=x*(x+2*m)+p):(v=Math.max(0,-(h*c+d)),x=v>0?c:Math.min(Math.max(-c,-m),c),M=-v*v+x*(x+2*m)+p);else x=h>0?-c:c,v=Math.max(0,-(h*x+d)),M=-v*v+x*(x+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,v),l&&l.copy(mh).addScaledVector(sc,x),M}intersectSphere(t,i){sa.subVectors(t.center,this.origin);const s=sa.dot(this.direction),l=sa.dot(sa)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,d,m;const p=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,x=this.origin;return p>=0?(s=(t.min.x-x.x)*p,l=(t.max.x-x.x)*p):(s=(t.max.x-x.x)*p,l=(t.min.x-x.x)*p),g>=0?(c=(t.min.y-x.y)*g,h=(t.max.y-x.y)*g):(c=(t.max.y-x.y)*g,h=(t.min.y-x.y)*g),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),v>=0?(d=(t.min.z-x.z)*v,m=(t.max.z-x.z)*v):(d=(t.max.z-x.z)*v,m=(t.min.z-x.z)*v),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,sa)!==null}intersectTriangle(t,i,s,l,c){gh.subVectors(i,t),rc.subVectors(s,t),_h.crossVectors(gh,rc);let h=this.direction.dot(_h),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ha.subVectors(this.origin,t);const m=d*this.direction.dot(rc.crossVectors(Ha,rc));if(m<0)return null;const p=d*this.direction.dot(gh.cross(Ha));if(p<0||m+p>h)return null;const g=-d*Ha.dot(_h);return g<0?null:this.at(g/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ke{constructor(t,i,s,l,c,h,d,m,p,g,v,x,M,b,R,S){ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p,g,v,x,M,b,R,S)}set(t,i,s,l,c,h,d,m,p,g,v,x,M,b,R,S){const y=this.elements;return y[0]=t,y[4]=i,y[8]=s,y[12]=l,y[1]=c,y[5]=h,y[9]=d,y[13]=m,y[2]=p,y[6]=g,y[10]=v,y[14]=x,y[3]=M,y[7]=b,y[11]=R,y[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/mr.setFromMatrixColumn(t,0).length(),c=1/mr.setFromMatrixColumn(t,1).length(),h=1/mr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),v=Math.sin(c);if(t.order==="XYZ"){const x=h*g,M=h*v,b=d*g,R=d*v;i[0]=m*g,i[4]=-m*v,i[8]=p,i[1]=M+b*p,i[5]=x-R*p,i[9]=-d*m,i[2]=R-x*p,i[6]=b+M*p,i[10]=h*m}else if(t.order==="YXZ"){const x=m*g,M=m*v,b=p*g,R=p*v;i[0]=x+R*d,i[4]=b*d-M,i[8]=h*p,i[1]=h*v,i[5]=h*g,i[9]=-d,i[2]=M*d-b,i[6]=R+x*d,i[10]=h*m}else if(t.order==="ZXY"){const x=m*g,M=m*v,b=p*g,R=p*v;i[0]=x-R*d,i[4]=-h*v,i[8]=b+M*d,i[1]=M+b*d,i[5]=h*g,i[9]=R-x*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const x=h*g,M=h*v,b=d*g,R=d*v;i[0]=m*g,i[4]=b*p-M,i[8]=x*p+R,i[1]=m*v,i[5]=R*p+x,i[9]=M*p-b,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const x=h*m,M=h*p,b=d*m,R=d*p;i[0]=m*g,i[4]=R-x*v,i[8]=b*v+M,i[1]=v,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=M*v+b,i[10]=x-R*v}else if(t.order==="XZY"){const x=h*m,M=h*p,b=d*m,R=d*p;i[0]=m*g,i[4]=-v,i[8]=p*g,i[1]=x*v+R,i[5]=h*g,i[9]=M*v-b,i[2]=b*v-M,i[6]=d*g,i[10]=R*v+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tM,t,eM)}lookAt(t,i,s){const l=this.elements;return ii.subVectors(t,i),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),Ga.crossVectors(s,ii),Ga.lengthSq()===0&&(Math.abs(s.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),Ga.crossVectors(s,ii)),Ga.normalize(),oc.crossVectors(ii,Ga),l[0]=Ga.x,l[4]=oc.x,l[8]=ii.x,l[1]=Ga.y,l[5]=oc.y,l[9]=ii.y,l[2]=Ga.z,l[6]=oc.z,l[10]=ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],g=s[1],v=s[5],x=s[9],M=s[13],b=s[2],R=s[6],S=s[10],y=s[14],I=s[3],O=s[7],L=s[11],Q=s[15],G=l[0],P=l[4],W=l[8],D=l[12],C=l[1],w=l[5],j=l[9],et=l[13],mt=l[2],gt=l[6],z=l[10],J=l[14],K=l[3],St=l[7],bt=l[11],N=l[15];return c[0]=h*G+d*C+m*mt+p*K,c[4]=h*P+d*w+m*gt+p*St,c[8]=h*W+d*j+m*z+p*bt,c[12]=h*D+d*et+m*J+p*N,c[1]=g*G+v*C+x*mt+M*K,c[5]=g*P+v*w+x*gt+M*St,c[9]=g*W+v*j+x*z+M*bt,c[13]=g*D+v*et+x*J+M*N,c[2]=b*G+R*C+S*mt+y*K,c[6]=b*P+R*w+S*gt+y*St,c[10]=b*W+R*j+S*z+y*bt,c[14]=b*D+R*et+S*J+y*N,c[3]=I*G+O*C+L*mt+Q*K,c[7]=I*P+O*w+L*gt+Q*St,c[11]=I*W+O*j+L*z+Q*bt,c[15]=I*D+O*et+L*J+Q*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],d=t[5],m=t[9],p=t[13],g=t[2],v=t[6],x=t[10],M=t[14],b=t[3],R=t[7],S=t[11],y=t[15];return b*(+c*m*v-l*p*v-c*d*x+s*p*x+l*d*M-s*m*M)+R*(+i*m*M-i*p*x+c*h*x-l*h*M+l*p*g-c*m*g)+S*(+i*p*v-i*d*M-c*h*v+s*h*M+c*d*g-s*p*g)+y*(-l*d*g-i*m*v+i*d*x+l*h*v-s*h*x+s*m*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],v=t[9],x=t[10],M=t[11],b=t[12],R=t[13],S=t[14],y=t[15],I=v*S*p-R*x*p+R*m*M-d*S*M-v*m*y+d*x*y,O=b*x*p-g*S*p-b*m*M+h*S*M+g*m*y-h*x*y,L=g*R*p-b*v*p+b*d*M-h*R*M-g*d*y+h*v*y,Q=b*v*m-g*R*m-b*d*x+h*R*x+g*d*S-h*v*S,G=i*I+s*O+l*L+c*Q;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/G;return t[0]=I*P,t[1]=(R*x*c-v*S*c-R*l*M+s*S*M+v*l*y-s*x*y)*P,t[2]=(d*S*c-R*m*c+R*l*p-s*S*p-d*l*y+s*m*y)*P,t[3]=(v*m*c-d*x*c-v*l*p+s*x*p+d*l*M-s*m*M)*P,t[4]=O*P,t[5]=(g*S*c-b*x*c+b*l*M-i*S*M-g*l*y+i*x*y)*P,t[6]=(b*m*c-h*S*c-b*l*p+i*S*p+h*l*y-i*m*y)*P,t[7]=(h*x*c-g*m*c+g*l*p-i*x*p-h*l*M+i*m*M)*P,t[8]=L*P,t[9]=(b*v*c-g*R*c-b*s*M+i*R*M+g*s*y-i*v*y)*P,t[10]=(h*R*c-b*d*c+b*s*p-i*R*p-h*s*y+i*d*y)*P,t[11]=(g*d*c-h*v*c-g*s*p+i*v*p+h*s*M-i*d*M)*P,t[12]=Q*P,t[13]=(g*R*l-b*v*l+b*s*x-i*R*x-g*s*S+i*v*S)*P,t[14]=(b*d*l-h*R*l-b*s*m+i*R*m+h*s*S-i*d*S)*P,t[15]=(h*v*l-g*d*l+g*s*m-i*v*m-h*s*x+i*d*x)*P,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,d=t.y,m=t.z,p=c*h,g=c*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*h,0,p*m-l*d,g*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,g=h+h,v=d+d,x=c*p,M=c*g,b=c*v,R=h*g,S=h*v,y=d*v,I=m*p,O=m*g,L=m*v,Q=s.x,G=s.y,P=s.z;return l[0]=(1-(R+y))*Q,l[1]=(M+L)*Q,l[2]=(b-O)*Q,l[3]=0,l[4]=(M-L)*G,l[5]=(1-(x+y))*G,l[6]=(S+I)*G,l[7]=0,l[8]=(b+O)*P,l[9]=(S-I)*P,l[10]=(1-(x+R))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=mr.set(l[0],l[1],l[2]).length();const h=mr.set(l[4],l[5],l[6]).length(),d=mr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Ei.copy(this);const p=1/c,g=1/h,v=1/d;return Ei.elements[0]*=p,Ei.elements[1]*=p,Ei.elements[2]*=p,Ei.elements[4]*=g,Ei.elements[5]*=g,Ei.elements[6]*=g,Ei.elements[8]*=v,Ei.elements[9]*=v,Ei.elements[10]*=v,i.setFromRotationMatrix(Ei),s.x=c,s.y=h,s.z=d,this}makePerspective(t,i,s,l,c,h,d=fa){const m=this.elements,p=2*c/(i-t),g=2*c/(s-l),v=(i+t)/(i-t),x=(s+l)/(s-l);let M,b;if(d===fa)M=-(h+c)/(h-c),b=-2*h*c/(h-c);else if(d===Ic)M=-h/(h-c),b=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=v,m[12]=0,m[1]=0,m[5]=g,m[9]=x,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=b,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,c,h,d=fa){const m=this.elements,p=1/(i-t),g=1/(s-l),v=1/(h-c),x=(i+t)*p,M=(s+l)*g;let b,R;if(d===fa)b=(h+c)*v,R=-2*v;else if(d===Ic)b=c*v,R=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-x,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=R,m[14]=-b,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const mr=new V,Ei=new ke,tM=new V(0,0,0),eM=new V(1,1,1),Ga=new V,oc=new V,ii=new V,t0=new ke,e0=new Rn;class Ii{constructor(t=0,i=0,s=0,l=Ii.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],g=l[9],v=l[2],x=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(_e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-_e(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-v,c),this._z=0);break;case"ZXY":this._x=Math.asin(_e(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-_e(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(_e(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-v,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-_e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return t0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(t0,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return e0.setFromEuler(this),this.setFromQuaternion(e0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ii.DEFAULT_ORDER="XYZ";class Yd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nM=0;const n0=new V,gr=new Rn,ra=new ke,lc=new V,Bo=new V,iM=new V,aM=new Rn,i0=new V(1,0,0),a0=new V(0,1,0),s0=new V(0,0,1),r0={type:"added"},sM={type:"removed"},_r={type:"childadded",child:null},vh={type:"childremoved",child:null};class yn extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nM++}),this.uuid=ko(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yn.DEFAULT_UP.clone();const t=new V,i=new Ii,s=new Rn,l=new V(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new ke},normalMatrix:{value:new ce}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=yn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return gr.setFromAxisAngle(t,i),this.quaternion.multiply(gr),this}rotateOnWorldAxis(t,i){return gr.setFromAxisAngle(t,i),this.quaternion.premultiply(gr),this}rotateX(t){return this.rotateOnAxis(i0,t)}rotateY(t){return this.rotateOnAxis(a0,t)}rotateZ(t){return this.rotateOnAxis(s0,t)}translateOnAxis(t,i){return n0.copy(t).applyQuaternion(this.quaternion),this.position.add(n0.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(i0,t)}translateY(t){return this.translateOnAxis(a0,t)}translateZ(t){return this.translateOnAxis(s0,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ra.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?lc.copy(t):lc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ra.lookAt(Bo,lc,this.up):ra.lookAt(lc,Bo,this.up),this.quaternion.setFromRotationMatrix(ra),l&&(ra.extractRotation(l.matrixWorld),gr.setFromRotationMatrix(ra),this.quaternion.premultiply(gr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(r0),_r.child=t,this.dispatchEvent(_r),_r.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(sM),vh.child=t,this.dispatchEvent(vh),vh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ra.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ra.multiply(t.parent.matrixWorld)),t.applyMatrix4(ra),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(r0),_r.child=t,this.dispatchEvent(_r),_r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,t,iM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,aM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const v=m[p];c(t.shapes,v)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),g=h(t.images),v=h(t.shapes),x=h(t.skeletons),M=h(t.animations),b=h(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),v.length>0&&(s.shapes=v),x.length>0&&(s.skeletons=x),M.length>0&&(s.animations=M),b.length>0&&(s.nodes=b)}return s.object=l,s;function h(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}yn.DEFAULT_UP=new V(0,1,0);yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bi=new V,oa=new V,yh=new V,la=new V,vr=new V,yr=new V,o0=new V,xh=new V,Sh=new V,Mh=new V,Eh=new $e,bh=new $e,Th=new $e;class Ai{constructor(t=new V,i=new V,s=new V){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),bi.subVectors(t,i),l.cross(bi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){bi.subVectors(l,i),oa.subVectors(s,i),yh.subVectors(t,i);const h=bi.dot(bi),d=bi.dot(oa),m=bi.dot(yh),p=oa.dot(oa),g=oa.dot(yh),v=h*p-d*d;if(v===0)return c.set(0,0,0),null;const x=1/v,M=(p*m-d*g)*x,b=(h*g-d*m)*x;return c.set(1-M-b,b,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,la)===null?!1:la.x>=0&&la.y>=0&&la.x+la.y<=1}static getInterpolation(t,i,s,l,c,h,d,m){return this.getBarycoord(t,i,s,l,la)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,la.x),m.addScaledVector(h,la.y),m.addScaledVector(d,la.z),m)}static getInterpolatedAttribute(t,i,s,l,c,h){return Eh.setScalar(0),bh.setScalar(0),Th.setScalar(0),Eh.fromBufferAttribute(t,i),bh.fromBufferAttribute(t,s),Th.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Eh,c.x),h.addScaledVector(bh,c.y),h.addScaledVector(Th,c.z),h}static isFrontFacing(t,i,s,l){return bi.subVectors(s,i),oa.subVectors(t,i),bi.cross(oa).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bi.subVectors(this.c,this.b),oa.subVectors(this.a,this.b),bi.cross(oa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ai.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ai.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Ai.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Ai.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ai.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,d;vr.subVectors(l,s),yr.subVectors(c,s),xh.subVectors(t,s);const m=vr.dot(xh),p=yr.dot(xh);if(m<=0&&p<=0)return i.copy(s);Sh.subVectors(t,l);const g=vr.dot(Sh),v=yr.dot(Sh);if(g>=0&&v<=g)return i.copy(l);const x=m*v-g*p;if(x<=0&&m>=0&&g<=0)return h=m/(m-g),i.copy(s).addScaledVector(vr,h);Mh.subVectors(t,c);const M=vr.dot(Mh),b=yr.dot(Mh);if(b>=0&&M<=b)return i.copy(c);const R=M*p-m*b;if(R<=0&&p>=0&&b<=0)return d=p/(p-b),i.copy(s).addScaledVector(yr,d);const S=g*b-M*v;if(S<=0&&v-g>=0&&M-b>=0)return o0.subVectors(c,l),d=(v-g)/(v-g+(M-b)),i.copy(l).addScaledVector(o0,d);const y=1/(S+R+x);return h=R*y,d=x*y,i.copy(s).addScaledVector(vr,h).addScaledVector(yr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Va={h:0,s:0,l:0},cc={h:0,s:0,l:0};function Ah(o,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(t-o)*6*i:i<1/2?t:i<2/3?o+(t-o)*6*(2/3-i):o}class fe{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=mi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=we.workingColorSpace){return this.r=t,this.g=i,this.b=s,we.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=we.workingColorSpace){if(t=GS(t,1),i=_e(i,0,1),s=_e(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=Ah(h,c,t+1/3),this.g=Ah(h,c,t),this.b=Ah(h,c,t-1/3)}return we.toWorkingColorSpace(this,l),this}setStyle(t,i=mi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=mi){const s=vv[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ha(t.r),this.g=ha(t.g),this.b=ha(t.b),this}copyLinearToSRGB(t){return this.r=Dr(t.r),this.g=Dr(t.g),this.b=Dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mi){return we.fromWorkingColorSpace(Ln.copy(this),t),Math.round(_e(Ln.r*255,0,255))*65536+Math.round(_e(Ln.g*255,0,255))*256+Math.round(_e(Ln.b*255,0,255))}getHexString(t=mi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=we.workingColorSpace){we.fromWorkingColorSpace(Ln.copy(this),i);const s=Ln.r,l=Ln.g,c=Ln.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+h)/2;if(d===h)m=0,p=0;else{const v=h-d;switch(p=g<=.5?v/(h+d):v/(2-h-d),h){case s:m=(l-c)/v+(l<c?6:0);break;case l:m=(c-s)/v+2;break;case c:m=(s-l)/v+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,i=we.workingColorSpace){return we.fromWorkingColorSpace(Ln.copy(this),i),t.r=Ln.r,t.g=Ln.g,t.b=Ln.b,t}getStyle(t=mi){we.fromWorkingColorSpace(Ln.copy(this),t);const i=Ln.r,s=Ln.g,l=Ln.b;return t!==mi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Va),this.setHSL(Va.h+t,Va.s+i,Va.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Va),t.getHSL(cc);const s=ch(Va.h,cc.h,i),l=ch(Va.s,cc.s,i),c=ch(Va.l,cc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ln=new fe;fe.NAMES=vv;let rM=0;class ws extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rM++}),this.uuid=ko(),this.name="",this.type="Material",this.blending=Cr,this.side=Ya,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kh,this.blendDst=Qh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=Ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Y_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Cr&&(s.blending=this.blending),this.side!==Ya&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Kh&&(s.blendSrc=this.blendSrc),this.blendDst!==Qh&&(s.blendDst=this.blendDst),this.blendEquation!==Ms&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Ur&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Y_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(s.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hc extends ws{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ii,this.combine=ev,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const cn=new V,uc=new ae;class Bn{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=j_,this.updateRanges=[],this.gpuType=ua,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)uc.fromBufferAttribute(this,i),uc.applyMatrix3(t),this.setXY(i,uc.x,uc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix3(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix4(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyNormalMatrix(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.transformDirection(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Oo(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Xn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Oo(i,this.array)),i}setX(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Oo(i,this.array)),i}setY(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Oo(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Oo(i,this.array)),i}setW(t,i){return this.normalized&&(i=Xn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array),l=Xn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array),l=Xn(l,this.array),c=Xn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==j_&&(t.usage=this.usage),t}}class yv extends Bn{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class xv extends Bn{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class Zn extends Bn{constructor(t,i,s){super(new Float32Array(t),i,s)}}let oM=0;const pi=new ke,Rh=new yn,xr=new V,ai=new da,Io=new da,vn=new V;class si extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oM++}),this.uuid=ko(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(mv(t)?xv:yv)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new ce().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pi.makeRotationFromQuaternion(t),this.applyMatrix4(pi),this}rotateX(t){return pi.makeRotationX(t),this.applyMatrix4(pi),this}rotateY(t){return pi.makeRotationY(t),this.applyMatrix4(pi),this}rotateZ(t){return pi.makeRotationZ(t),this.applyMatrix4(pi),this}translate(t,i,s){return pi.makeTranslation(t,i,s),this.applyMatrix4(pi),this}scale(t,i,s){return pi.makeScale(t,i,s),this.applyMatrix4(pi),this}lookAt(t){return Rh.lookAt(t),Rh.updateMatrix(),this.applyMatrix4(Rh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xr).negate(),this.translate(xr.x,xr.y,xr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new Zn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new da);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ai.setFromBufferAttribute(c),this.morphTargetsRelative?(vn.addVectors(this.boundingBox.min,ai.min),this.boundingBox.expandByPoint(vn),vn.addVectors(this.boundingBox.max,ai.max),this.boundingBox.expandByPoint(vn)):(this.boundingBox.expandByPoint(ai.min),this.boundingBox.expandByPoint(ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wc);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const s=this.boundingSphere.center;if(ai.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Io.setFromBufferAttribute(d),this.morphTargetsRelative?(vn.addVectors(ai.min,Io.min),ai.expandByPoint(vn),vn.addVectors(ai.max,Io.max),ai.expandByPoint(vn)):(ai.expandByPoint(Io.min),ai.expandByPoint(Io.max))}ai.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)vn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(vn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)vn.fromBufferAttribute(d,p),m&&(xr.fromBufferAttribute(t,p),vn.add(xr)),l=Math.max(l,s.distanceToSquared(vn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bn(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let W=0;W<s.count;W++)d[W]=new V,m[W]=new V;const p=new V,g=new V,v=new V,x=new ae,M=new ae,b=new ae,R=new V,S=new V;function y(W,D,C){p.fromBufferAttribute(s,W),g.fromBufferAttribute(s,D),v.fromBufferAttribute(s,C),x.fromBufferAttribute(c,W),M.fromBufferAttribute(c,D),b.fromBufferAttribute(c,C),g.sub(p),v.sub(p),M.sub(x),b.sub(x);const w=1/(M.x*b.y-b.x*M.y);isFinite(w)&&(R.copy(g).multiplyScalar(b.y).addScaledVector(v,-M.y).multiplyScalar(w),S.copy(v).multiplyScalar(M.x).addScaledVector(g,-b.x).multiplyScalar(w),d[W].add(R),d[D].add(R),d[C].add(R),m[W].add(S),m[D].add(S),m[C].add(S))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let W=0,D=I.length;W<D;++W){const C=I[W],w=C.start,j=C.count;for(let et=w,mt=w+j;et<mt;et+=3)y(t.getX(et+0),t.getX(et+1),t.getX(et+2))}const O=new V,L=new V,Q=new V,G=new V;function P(W){Q.fromBufferAttribute(l,W),G.copy(Q);const D=d[W];O.copy(D),O.sub(Q.multiplyScalar(Q.dot(D))).normalize(),L.crossVectors(G,D);const w=L.dot(m[W])<0?-1:1;h.setXYZW(W,O.x,O.y,O.z,w)}for(let W=0,D=I.length;W<D;++W){const C=I[W],w=C.start,j=C.count;for(let et=w,mt=w+j;et<mt;et+=3)P(t.getX(et+0)),P(t.getX(et+1)),P(t.getX(et+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Bn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,M=s.count;x<M;x++)s.setXYZ(x,0,0,0);const l=new V,c=new V,h=new V,d=new V,m=new V,p=new V,g=new V,v=new V;if(t)for(let x=0,M=t.count;x<M;x+=3){const b=t.getX(x+0),R=t.getX(x+1),S=t.getX(x+2);l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,S),g.subVectors(h,c),v.subVectors(l,c),g.cross(v),d.fromBufferAttribute(s,b),m.fromBufferAttribute(s,R),p.fromBufferAttribute(s,S),d.add(g),m.add(g),p.add(g),s.setXYZ(b,d.x,d.y,d.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(S,p.x,p.y,p.z)}else for(let x=0,M=i.count;x<M;x+=3)l.fromBufferAttribute(i,x+0),c.fromBufferAttribute(i,x+1),h.fromBufferAttribute(i,x+2),g.subVectors(h,c),v.subVectors(l,c),g.cross(v),s.setXYZ(x+0,g.x,g.y,g.z),s.setXYZ(x+1,g.x,g.y,g.z),s.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)vn.fromBufferAttribute(t,i),vn.normalize(),t.setXYZ(i,vn.x,vn.y,vn.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,v=d.normalized,x=new p.constructor(m.length*g);let M=0,b=0;for(let R=0,S=m.length;R<S;R++){d.isInterleavedBufferAttribute?M=m[R]*d.data.stride+d.offset:M=m[R]*g;for(let y=0;y<g;y++)x[b++]=p[M++]}return new Bn(x,g,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new si,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,v=p.length;g<v;g++){const x=p[g],M=t(x,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let v=0,x=p.length;v<x;v++){const M=p[v];g.push(M.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const c=t.morphAttributes;for(const p in c){const g=[],v=c[p];for(let x=0,M=v.length;x<M;x++)g.push(v[x].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,g=h.length;p<g;p++){const v=h[p];this.addGroup(v.start,v.count,v.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const l0=new ke,_s=new qc,fc=new Wc,c0=new V,hc=new V,dc=new V,pc=new V,Ch=new V,mc=new V,u0=new V,gc=new V;class qn extends yn{constructor(t=new si,i=new Hc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){mc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],v=c[m];g!==0&&(Ch.fromBufferAttribute(v,t),h?mc.addScaledVector(Ch,g):mc.addScaledVector(Ch.sub(i),g))}i.add(mc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),fc.copy(s.boundingSphere),fc.applyMatrix4(c),_s.copy(t.ray).recast(t.near),!(fc.containsPoint(_s.origin)===!1&&(_s.intersectSphere(fc,c0)===null||_s.origin.distanceToSquared(c0)>(t.far-t.near)**2))&&(l0.copy(c).invert(),_s.copy(t.ray).applyMatrix4(l0),!(s.boundingBox!==null&&_s.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,_s)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,v=c.attributes.normal,x=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(h))for(let b=0,R=x.length;b<R;b++){const S=x[b],y=h[S.materialIndex],I=Math.max(S.start,M.start),O=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let L=I,Q=O;L<Q;L+=3){const G=d.getX(L),P=d.getX(L+1),W=d.getX(L+2);l=_c(this,y,t,s,p,g,v,G,P,W),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),R=Math.min(d.count,M.start+M.count);for(let S=b,y=R;S<y;S+=3){const I=d.getX(S),O=d.getX(S+1),L=d.getX(S+2);l=_c(this,h,t,s,p,g,v,I,O,L),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let b=0,R=x.length;b<R;b++){const S=x[b],y=h[S.materialIndex],I=Math.max(S.start,M.start),O=Math.min(m.count,Math.min(S.start+S.count,M.start+M.count));for(let L=I,Q=O;L<Q;L+=3){const G=L,P=L+1,W=L+2;l=_c(this,y,t,s,p,g,v,G,P,W),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const b=Math.max(0,M.start),R=Math.min(m.count,M.start+M.count);for(let S=b,y=R;S<y;S+=3){const I=S,O=S+1,L=S+2;l=_c(this,h,t,s,p,g,v,I,O,L),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function lM(o,t,i,s,l,c,h,d){let m;if(t.side===Yn?m=s.intersectTriangle(h,c,l,!0,d):m=s.intersectTriangle(l,c,h,t.side===Ya,d),m===null)return null;gc.copy(d),gc.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(gc);return p<i.near||p>i.far?null:{distance:p,point:gc.clone(),object:o}}function _c(o,t,i,s,l,c,h,d,m,p){o.getVertexPosition(d,hc),o.getVertexPosition(m,dc),o.getVertexPosition(p,pc);const g=lM(o,t,i,s,hc,dc,pc,u0);if(g){const v=new V;Ai.getBarycoord(u0,hc,dc,pc,v),l&&(g.uv=Ai.getInterpolatedAttribute(l,d,m,p,v,new ae)),c&&(g.uv1=Ai.getInterpolatedAttribute(c,d,m,p,v,new ae)),h&&(g.normal=Ai.getInterpolatedAttribute(h,d,m,p,v,new V),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:m,c:p,normal:new V,materialIndex:0};Ai.getNormal(hc,dc,pc,x.normal),g.face=x,g.barycoord=v}return g}class Ir extends si{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],g=[],v=[];let x=0,M=0;b("z","y","x",-1,-1,s,i,t,h,c,0),b("z","y","x",1,-1,s,i,-t,h,c,1),b("x","z","y",1,1,t,s,i,l,h,2),b("x","z","y",1,-1,t,s,-i,l,h,3),b("x","y","z",1,-1,t,i,s,l,c,4),b("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Zn(p,3)),this.setAttribute("normal",new Zn(g,3)),this.setAttribute("uv",new Zn(v,2));function b(R,S,y,I,O,L,Q,G,P,W,D){const C=L/P,w=Q/W,j=L/2,et=Q/2,mt=G/2,gt=P+1,z=W+1;let J=0,K=0;const St=new V;for(let bt=0;bt<z;bt++){const N=bt*w-et;for(let at=0;at<gt;at++){const xt=at*C-j;St[R]=xt*I,St[S]=N*O,St[y]=mt,p.push(St.x,St.y,St.z),St[R]=0,St[S]=0,St[y]=G>0?1:-1,g.push(St.x,St.y,St.z),v.push(at/P),v.push(1-bt/W),J+=1}}for(let bt=0;bt<W;bt++)for(let N=0;N<P;N++){const at=x+N+gt*bt,xt=x+N+gt*(bt+1),Z=x+(N+1)+gt*(bt+1),ct=x+(N+1)+gt*bt;m.push(at,xt,ct),m.push(xt,Z,ct),K+=6}d.addGroup(M,K,D),M+=K,x+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ir(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Br(o){const t={};for(const i in o){t[i]={};for(const s in o[i]){const l=o[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function zn(o){const t={};for(let i=0;i<o.length;i++){const s=Br(o[i]);for(const l in s)t[l]=s[l]}return t}function cM(o){const t=[];for(let i=0;i<o.length;i++)t.push(o[i].clone());return t}function Sv(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const uM={clone:Br,merge:zn};var fM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ja extends ws{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fM,this.fragmentShader=hM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Br(t.uniforms),this.uniformsGroups=cM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class Mv extends yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=fa}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ka=new V,f0=new ae,h0=new ae;class gi extends Mv{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Pd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Pc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pd*2*Math.atan(Math.tan(Pc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){ka.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ka.x,ka.y).multiplyScalar(-t/ka.z),ka.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ka.x,ka.y).multiplyScalar(-t/ka.z)}getViewSize(t,i){return this.getViewBounds(t,f0,h0),i.subVectors(h0,f0)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Pc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Sr=-90,Mr=1;class dM extends yn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new gi(Sr,Mr,t,i);l.layers=this.layers,this.add(l);const c=new gi(Sr,Mr,t,i);c.layers=this.layers,this.add(c);const h=new gi(Sr,Mr,t,i);h.layers=this.layers,this.add(h);const d=new gi(Sr,Mr,t,i);d.layers=this.layers,this.add(d);const m=new gi(Sr,Mr,t,i);m.layers=this.layers,this.add(m);const p=new gi(Sr,Mr,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(t===fa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Ic)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,g]=this.children,v=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),b=t.xr.enabled;t.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,m),t.setRenderTarget(s,4,l),t.render(i,p),s.texture.generateMipmaps=R,t.setRenderTarget(s,5,l),t.render(i,g),t.setRenderTarget(v,x,M),t.xr.enabled=b,s.texture.needsPMREMUpdate=!0}}class Ev extends jn{constructor(t,i,s,l,c,h,d,m,p,g){t=t!==void 0?t:[],i=i!==void 0?i:Lr,super(t,i,s,l,c,h,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class pM extends Rs{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Ev(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Bi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ir(5,5,5),c=new ja({name:"CubemapFromEquirect",uniforms:Br(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Yn,blending:Wa});c.uniforms.tEquirect.value=i;const h=new qn(l,c),d=i.minFilter;return i.minFilter===Ts&&(i.minFilter=Bi),new dM(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}class jd{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new fe(t),this.near=i,this.far=s}clone(){return new jd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class mM extends yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ii,this.environmentIntensity=1,this.environmentRotation=new Ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const wh=new V,gM=new V,_M=new ce;class Pi{constructor(t=new V(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=wh.subVectors(s,i).cross(gM.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(wh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||_M.getNormalMatrix(t),l=this.coplanarPoint(wh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vs=new Wc,vc=new V;class Zd{constructor(t=new Pi,i=new Pi,s=new Pi,l=new Pi,c=new Pi,h=new Pi){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=fa){const s=this.planes,l=t.elements,c=l[0],h=l[1],d=l[2],m=l[3],p=l[4],g=l[5],v=l[6],x=l[7],M=l[8],b=l[9],R=l[10],S=l[11],y=l[12],I=l[13],O=l[14],L=l[15];if(s[0].setComponents(m-c,x-p,S-M,L-y).normalize(),s[1].setComponents(m+c,x+p,S+M,L+y).normalize(),s[2].setComponents(m+h,x+g,S+b,L+I).normalize(),s[3].setComponents(m-h,x-g,S-b,L-I).normalize(),s[4].setComponents(m-d,x-v,S-R,L-O).normalize(),i===fa)s[5].setComponents(m+d,x+v,S+R,L+O).normalize();else if(i===Ic)s[5].setComponents(d,v,R,O).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){return vs.center.set(0,0,0),vs.radius=.7071067811865476,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(vc.x=l.normal.x>0?t.max.x:t.min.x,vc.y=l.normal.y>0?t.max.y:t.min.y,vc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(vc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yc extends ws{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Gc=new V,Vc=new V,d0=new ke,Fo=new qc,yc=new Wc,Dh=new V,p0=new V;class bv extends yn{constructor(t=new si,i=new Yc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)Gc.fromBufferAttribute(i,l-1),Vc.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Gc.distanceTo(Vc);t.setAttribute("lineDistance",new Zn(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),yc.copy(s.boundingSphere),yc.applyMatrix4(l),yc.radius+=c,t.ray.intersectsSphere(yc)===!1)return;d0.copy(l).invert(),Fo.copy(t.ray).applyMatrix4(d0);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,x=s.attributes.position;if(g!==null){const M=Math.max(0,h.start),b=Math.min(g.count,h.start+h.count);for(let R=M,S=b-1;R<S;R+=p){const y=g.getX(R),I=g.getX(R+1),O=xc(this,t,Fo,m,y,I);O&&i.push(O)}if(this.isLineLoop){const R=g.getX(b-1),S=g.getX(M),y=xc(this,t,Fo,m,R,S);y&&i.push(y)}}else{const M=Math.max(0,h.start),b=Math.min(x.count,h.start+h.count);for(let R=M,S=b-1;R<S;R+=p){const y=xc(this,t,Fo,m,R,R+1);y&&i.push(y)}if(this.isLineLoop){const R=xc(this,t,Fo,m,b-1,M);R&&i.push(R)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function xc(o,t,i,s,l,c){const h=o.geometry.attributes.position;if(Gc.fromBufferAttribute(h,l),Vc.fromBufferAttribute(h,c),i.distanceSqToSegment(Gc,Vc,Dh,p0)>s)return;Dh.applyMatrix4(o.matrixWorld);const m=t.ray.origin.distanceTo(Dh);if(!(m<t.near||m>t.far))return{distance:m,point:p0.clone().applyMatrix4(o.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:o}}const m0=new V,g0=new V;class Tv extends bv{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)m0.fromBufferAttribute(i,l),g0.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+m0.distanceTo(g0);t.setAttribute("lineDistance",new Zn(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Sc extends yn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Av extends jn{constructor(t,i,s,l,c,h,d,m,p,g=wr){if(g!==wr&&g!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===wr&&(s=As),s===void 0&&g===Pr&&(s=Or),super(null,l,c,h,d,m,g,s,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:Ci,this.minFilter=m!==void 0?m:Ci,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Kd extends si{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],h=[],d=[],m=[],p=new V,g=new ae;h.push(0,0,0),d.push(0,0,1),m.push(.5,.5);for(let v=0,x=3;v<=i;v++,x+=3){const M=s+v/i*l;p.x=t*Math.cos(M),p.y=t*Math.sin(M),h.push(p.x,p.y,p.z),d.push(0,0,1),g.x=(h[x]/t+1)/2,g.y=(h[x+1]/t+1)/2,m.push(g.x,g.y)}for(let v=1;v<=i;v++)c.push(v,v+1,0);this.setIndex(c),this.setAttribute("position",new Zn(h,3)),this.setAttribute("normal",new Zn(d,3)),this.setAttribute("uv",new Zn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kd(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Xo extends si{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,v=t/d,x=i/m,M=[],b=[],R=[],S=[];for(let y=0;y<g;y++){const I=y*x-h;for(let O=0;O<p;O++){const L=O*v-c;b.push(L,-I,0),R.push(0,0,1),S.push(O/d),S.push(1-y/m)}}for(let y=0;y<m;y++)for(let I=0;I<d;I++){const O=I+p*y,L=I+p*(y+1),Q=I+1+p*(y+1),G=I+1+p*y;M.push(O,L,G),M.push(L,Q,G)}this.setIndex(M),this.setAttribute("position",new Zn(b,3)),this.setAttribute("normal",new Zn(R,3)),this.setAttribute("uv",new Zn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xo(t.width,t.height,t.widthSegments,t.heightSegments)}}class vM extends ws{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new fe(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Uh extends ws{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dv,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yM extends ws{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=US,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xM extends ws{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Rv extends yn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class SM extends Rv{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new fe(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}}const Lh=new ke,_0=new V,v0=new V;class MM{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zd,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;_0.setFromMatrixPosition(t.matrixWorld),i.position.copy(_0),v0.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(v0),i.updateMatrixWorld(),Lh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lh),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Lh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Cv extends Mv{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class EM extends MM{constructor(){super(new Cv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bM extends Rv{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.target=new yn,this.shadow=new EM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class TM extends gi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const y0=new ke;class AM{constructor(t,i,s=0,l=1/0){this.ray=new qc(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new Yd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return y0.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(y0),this}intersectObject(t,i=!0,s=[]){return zd(t,this,s,i),s.sort(x0),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)zd(t[l],this,s,i);return s.sort(x0),s}}function x0(o,t){return o.distance-t.distance}function zd(o,t,i,s){let l=!0;if(o.layers.test(t.layers)&&o.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=o.children;for(let h=0,d=c.length;h<d;h++)zd(c[h],t,i,!0)}}class S0{constructor(t=1,i=0,s=0){return this.radius=t,this.phi=i,this.theta=s,this}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=_e(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(_e(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class RM extends Tv{constructor(t=10,i=10,s=4473924,l=8947848){s=new fe(s),l=new fe(l);const c=i/2,h=t/i,d=t/2,m=[],p=[];for(let x=0,M=0,b=-d;x<=i;x++,b+=h){m.push(-d,0,b,d,0,b),m.push(b,0,-d,b,0,d);const R=x===c?s:l;R.toArray(p,M),M+=3,R.toArray(p,M),M+=3,R.toArray(p,M),M+=3,R.toArray(p,M),M+=3}const g=new si;g.setAttribute("position",new Zn(m,3)),g.setAttribute("color",new Zn(p,3));const v=new Yc({vertexColors:!0,toneMapped:!1});super(g,v),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Mc=new da;class CM extends Tv{constructor(t,i=16776960){const s=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),l=new Float32Array(24),c=new si;c.setIndex(new Bn(s,1)),c.setAttribute("position",new Bn(l,3)),super(c,new Yc({color:i,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Mc.setFromObject(this.object),Mc.isEmpty())return;const i=Mc.min,s=Mc.max,l=this.geometry.attributes.position,c=l.array;c[0]=s.x,c[1]=s.y,c[2]=s.z,c[3]=i.x,c[4]=s.y,c[5]=s.z,c[6]=i.x,c[7]=i.y,c[8]=s.z,c[9]=s.x,c[10]=i.y,c[11]=s.z,c[12]=s.x,c[13]=s.y,c[14]=i.z,c[15]=i.x,c[16]=s.y,c[17]=i.z,c[18]=i.x,c[19]=i.y,c[20]=i.z,c[21]=s.x,c[22]=i.y,c[23]=i.z,l.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,i){return super.copy(t,i),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class wM extends Cs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function M0(o,t,i,s){const l=DM(s);switch(i){case rv:return o*t;case lv:return o*t;case cv:return o*t*2;case uv:return o*t/l.components*l.byteLength;case Xd:return o*t/l.components*l.byteLength;case fv:return o*t*2/l.components*l.byteLength;case Wd:return o*t*2/l.components*l.byteLength;case ov:return o*t*3/l.components*l.byteLength;case Ri:return o*t*4/l.components*l.byteLength;case qd:return o*t*4/l.components*l.byteLength;case Dc:case Uc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Lc:case Nc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case ud:case hd:return Math.max(o,16)*Math.max(t,8)/4;case cd:case fd:return Math.max(o,8)*Math.max(t,8)/2;case dd:case pd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case md:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case gd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case _d:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case vd:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case yd:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case xd:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Md:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Ed:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case bd:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Td:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Ad:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case Rd:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case Cd:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case wd:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case Oc:case Dd:case Ud:return Math.ceil(o/4)*Math.ceil(t/4)*16;case hv:case Ld:return Math.ceil(o/4)*Math.ceil(t/4)*8;case Nd:case Od:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function DM(o){switch(o){case pa:case iv:return{byteLength:1,components:1};case Go:case av:case Vo:return{byteLength:2,components:1};case Vd:case kd:return{byteLength:2,components:4};case As:case Gd:case ua:return{byteLength:4,components:1};case sv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hd);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wv(){let o=null,t=!1,i=null,s=null;function l(c,h){i(c,h),s=o.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=o.requestAnimationFrame(l),t=!0)},stop:function(){o.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){o=c}}}function UM(o){const t=new WeakMap;function i(d,m){const p=d.array,g=d.usage,v=p.byteLength,x=o.createBuffer();o.bindBuffer(m,x),o.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=o.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=o.SHORT;else if(p instanceof Uint32Array)M=o.UNSIGNED_INT;else if(p instanceof Int32Array)M=o.INT;else if(p instanceof Int8Array)M=o.BYTE;else if(p instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:v}}function s(d,m,p){const g=m.array,v=m.updateRanges;if(o.bindBuffer(p,d),v.length===0)o.bufferSubData(p,0,g);else{v.sort((M,b)=>M.start-b.start);let x=0;for(let M=1;M<v.length;M++){const b=v[x],R=v[M];R.start<=b.start+b.count+1?b.count=Math.max(b.count,R.start+R.count-b.start):(++x,v[x]=R)}v.length=x+1;for(let M=0,b=v.length;M<b;M++){const R=v[M];o.bufferSubData(p,R.start*g.BYTES_PER_ELEMENT,g,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(o.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var LM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,NM=`#ifdef USE_ALPHAHASH
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
#endif`,OM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,PM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,BM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,IM=`#ifdef USE_AOMAP
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
#endif`,FM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,HM=`#ifdef USE_BATCHING
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
#endif`,GM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,VM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,WM=`#ifdef USE_IRIDESCENCE
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
#endif`,qM=`#ifdef USE_BUMPMAP
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
#endif`,YM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ZM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,KM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,QM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,JM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$M=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,eE=`#define PI 3.141592653589793
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
} // validated`,nE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,iE=`vec3 transformedNormal = objectNormal;
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
#endif`,aE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,oE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lE="gl_FragColor = linearToOutputTexel( gl_FragColor );",cE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uE=`#ifdef USE_ENVMAP
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
#endif`,fE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hE=`#ifdef USE_ENVMAP
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
#endif`,dE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pE=`#ifdef USE_ENVMAP
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
#endif`,mE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_E=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yE=`#ifdef USE_GRADIENTMAP
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
}`,xE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,SE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ME=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,EE=`uniform bool receiveShadow;
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
#endif`,bE=`#ifdef USE_ENVMAP
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
#endif`,TE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,RE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,CE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wE=`PhysicalMaterial material;
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
#endif`,DE=`struct PhysicalMaterial {
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
}`,UE=`
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
#endif`,LE=`#if defined( RE_IndirectDiffuse )
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
#endif`,NE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,PE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,IE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,FE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,HE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,GE=`#if defined( USE_POINTS_UV )
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
#endif`,VE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,XE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,WE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,YE=`#ifdef USE_MORPHTARGETS
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
#endif`,jE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,KE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,QE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$E=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tb=`#ifdef USE_NORMALMAP
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
#endif`,eb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ib=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ab=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ob=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ub=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,db=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gb=`float getShadowMask() {
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
}`,_b=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vb=`#ifdef USE_SKINNING
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
#endif`,yb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xb=`#ifdef USE_SKINNING
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
#endif`,Sb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Eb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tb=`#ifdef USE_TRANSMISSION
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
#endif`,Ab=`#ifdef USE_TRANSMISSION
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
#endif`,Rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Db=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ub=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lb=`uniform sampler2D t2D;
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
}`,Nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ob=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bb=`#include <common>
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
}`,Ib=`#if DEPTH_PACKING == 3200
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
}`,Fb=`#define DISTANCE
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
}`,Hb=`#define DISTANCE
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
}`,Gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kb=`uniform float scale;
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
}`,Xb=`uniform vec3 diffuse;
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
}`,Wb=`#include <common>
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
}`,qb=`uniform vec3 diffuse;
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
}`,Yb=`#define LAMBERT
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
}`,jb=`#define LAMBERT
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
}`,Zb=`#define MATCAP
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
}`,Kb=`#define MATCAP
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
}`,Qb=`#define NORMAL
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
}`,Jb=`#define NORMAL
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
}`,$b=`#define PHONG
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
}`,tT=`#define PHONG
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
}`,eT=`#define STANDARD
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
}`,nT=`#define STANDARD
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
}`,iT=`#define TOON
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
}`,aT=`#define TOON
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
}`,sT=`uniform float size;
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
}`,rT=`uniform vec3 diffuse;
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
}`,oT=`#include <common>
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
}`,lT=`uniform vec3 color;
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
}`,cT=`uniform float rotation;
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
}`,uT=`uniform vec3 diffuse;
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
}`,ue={alphahash_fragment:LM,alphahash_pars_fragment:NM,alphamap_fragment:OM,alphamap_pars_fragment:PM,alphatest_fragment:zM,alphatest_pars_fragment:BM,aomap_fragment:IM,aomap_pars_fragment:FM,batching_pars_vertex:HM,batching_vertex:GM,begin_vertex:VM,beginnormal_vertex:kM,bsdfs:XM,iridescence_fragment:WM,bumpmap_pars_fragment:qM,clipping_planes_fragment:YM,clipping_planes_pars_fragment:jM,clipping_planes_pars_vertex:ZM,clipping_planes_vertex:KM,color_fragment:QM,color_pars_fragment:JM,color_pars_vertex:$M,color_vertex:tE,common:eE,cube_uv_reflection_fragment:nE,defaultnormal_vertex:iE,displacementmap_pars_vertex:aE,displacementmap_vertex:sE,emissivemap_fragment:rE,emissivemap_pars_fragment:oE,colorspace_fragment:lE,colorspace_pars_fragment:cE,envmap_fragment:uE,envmap_common_pars_fragment:fE,envmap_pars_fragment:hE,envmap_pars_vertex:dE,envmap_physical_pars_fragment:bE,envmap_vertex:pE,fog_vertex:mE,fog_pars_vertex:gE,fog_fragment:_E,fog_pars_fragment:vE,gradientmap_pars_fragment:yE,lightmap_pars_fragment:xE,lights_lambert_fragment:SE,lights_lambert_pars_fragment:ME,lights_pars_begin:EE,lights_toon_fragment:TE,lights_toon_pars_fragment:AE,lights_phong_fragment:RE,lights_phong_pars_fragment:CE,lights_physical_fragment:wE,lights_physical_pars_fragment:DE,lights_fragment_begin:UE,lights_fragment_maps:LE,lights_fragment_end:NE,logdepthbuf_fragment:OE,logdepthbuf_pars_fragment:PE,logdepthbuf_pars_vertex:zE,logdepthbuf_vertex:BE,map_fragment:IE,map_pars_fragment:FE,map_particle_fragment:HE,map_particle_pars_fragment:GE,metalnessmap_fragment:VE,metalnessmap_pars_fragment:kE,morphinstance_vertex:XE,morphcolor_vertex:WE,morphnormal_vertex:qE,morphtarget_pars_vertex:YE,morphtarget_vertex:jE,normal_fragment_begin:ZE,normal_fragment_maps:KE,normal_pars_fragment:QE,normal_pars_vertex:JE,normal_vertex:$E,normalmap_pars_fragment:tb,clearcoat_normal_fragment_begin:eb,clearcoat_normal_fragment_maps:nb,clearcoat_pars_fragment:ib,iridescence_pars_fragment:ab,opaque_fragment:sb,packing:rb,premultiplied_alpha_fragment:ob,project_vertex:lb,dithering_fragment:cb,dithering_pars_fragment:ub,roughnessmap_fragment:fb,roughnessmap_pars_fragment:hb,shadowmap_pars_fragment:db,shadowmap_pars_vertex:pb,shadowmap_vertex:mb,shadowmask_pars_fragment:gb,skinbase_vertex:_b,skinning_pars_vertex:vb,skinning_vertex:yb,skinnormal_vertex:xb,specularmap_fragment:Sb,specularmap_pars_fragment:Mb,tonemapping_fragment:Eb,tonemapping_pars_fragment:bb,transmission_fragment:Tb,transmission_pars_fragment:Ab,uv_pars_fragment:Rb,uv_pars_vertex:Cb,uv_vertex:wb,worldpos_vertex:Db,background_vert:Ub,background_frag:Lb,backgroundCube_vert:Nb,backgroundCube_frag:Ob,cube_vert:Pb,cube_frag:zb,depth_vert:Bb,depth_frag:Ib,distanceRGBA_vert:Fb,distanceRGBA_frag:Hb,equirect_vert:Gb,equirect_frag:Vb,linedashed_vert:kb,linedashed_frag:Xb,meshbasic_vert:Wb,meshbasic_frag:qb,meshlambert_vert:Yb,meshlambert_frag:jb,meshmatcap_vert:Zb,meshmatcap_frag:Kb,meshnormal_vert:Qb,meshnormal_frag:Jb,meshphong_vert:$b,meshphong_frag:tT,meshphysical_vert:eT,meshphysical_frag:nT,meshtoon_vert:iT,meshtoon_frag:aT,points_vert:sT,points_frag:rT,shadow_vert:oT,shadow_frag:lT,sprite_vert:cT,sprite_frag:uT},Lt={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},zi={basic:{uniforms:zn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ue.meshbasic_vert,fragmentShader:ue.meshbasic_frag},lambert:{uniforms:zn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshlambert_vert,fragmentShader:ue.meshlambert_frag},phong:{uniforms:zn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:ue.meshphong_vert,fragmentShader:ue.meshphong_frag},standard:{uniforms:zn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag},toon:{uniforms:zn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new fe(0)}}]),vertexShader:ue.meshtoon_vert,fragmentShader:ue.meshtoon_frag},matcap:{uniforms:zn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ue.meshmatcap_vert,fragmentShader:ue.meshmatcap_frag},points:{uniforms:zn([Lt.points,Lt.fog]),vertexShader:ue.points_vert,fragmentShader:ue.points_frag},dashed:{uniforms:zn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ue.linedashed_vert,fragmentShader:ue.linedashed_frag},depth:{uniforms:zn([Lt.common,Lt.displacementmap]),vertexShader:ue.depth_vert,fragmentShader:ue.depth_frag},normal:{uniforms:zn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ue.meshnormal_vert,fragmentShader:ue.meshnormal_frag},sprite:{uniforms:zn([Lt.sprite,Lt.fog]),vertexShader:ue.sprite_vert,fragmentShader:ue.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ue.background_vert,fragmentShader:ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:ue.backgroundCube_vert,fragmentShader:ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ue.cube_vert,fragmentShader:ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ue.equirect_vert,fragmentShader:ue.equirect_frag},distanceRGBA:{uniforms:zn([Lt.common,Lt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ue.distanceRGBA_vert,fragmentShader:ue.distanceRGBA_frag},shadow:{uniforms:zn([Lt.lights,Lt.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:ue.shadow_vert,fragmentShader:ue.shadow_frag}};zi.physical={uniforms:zn([zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:ue.meshphysical_vert,fragmentShader:ue.meshphysical_frag};const Ec={r:0,b:0,g:0},ys=new Ii,fT=new ke;function hT(o,t,i,s,l,c,h){const d=new fe(0);let m=c===!0?0:1,p,g,v=null,x=0,M=null;function b(O){let L=O.isScene===!0?O.background:null;return L&&L.isTexture&&(L=(O.backgroundBlurriness>0?i:t).get(L)),L}function R(O){let L=!1;const Q=b(O);Q===null?y(d,m):Q&&Q.isColor&&(y(Q,1),L=!0);const G=o.xr.getEnvironmentBlendMode();G==="additive"?s.buffers.color.setClear(0,0,0,1,h):G==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||L)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function S(O,L){const Q=b(L);Q&&(Q.isCubeTexture||Q.mapping===Xc)?(g===void 0&&(g=new qn(new Ir(1,1,1),new ja({name:"BackgroundCubeMaterial",uniforms:Br(zi.backgroundCube.uniforms),vertexShader:zi.backgroundCube.vertexShader,fragmentShader:zi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(G,P,W){this.matrixWorld.copyPosition(W.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),ys.copy(L.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,Q.isCubeTexture&&Q.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),g.material.uniforms.envMap.value=Q,g.material.uniforms.flipEnvMap.value=Q.isCubeTexture&&Q.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(fT.makeRotationFromEuler(ys)),g.material.toneMapped=we.getTransfer(Q.colorSpace)!==Fe,(v!==Q||x!==Q.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,v=Q,x=Q.version,M=o.toneMapping),g.layers.enableAll(),O.unshift(g,g.geometry,g.material,0,0,null)):Q&&Q.isTexture&&(p===void 0&&(p=new qn(new Xo(2,2),new ja({name:"BackgroundMaterial",uniforms:Br(zi.background.uniforms),vertexShader:zi.background.vertexShader,fragmentShader:zi.background.fragmentShader,side:Ya,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=Q,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.toneMapped=we.getTransfer(Q.colorSpace)!==Fe,Q.matrixAutoUpdate===!0&&Q.updateMatrix(),p.material.uniforms.uvTransform.value.copy(Q.matrix),(v!==Q||x!==Q.version||M!==o.toneMapping)&&(p.material.needsUpdate=!0,v=Q,x=Q.version,M=o.toneMapping),p.layers.enableAll(),O.unshift(p,p.geometry,p.material,0,0,null))}function y(O,L){O.getRGB(Ec,Sv(o)),s.buffers.color.setClear(Ec.r,Ec.g,Ec.b,L,h)}function I(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(O,L=1){d.set(O),m=L,y(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(O){m=O,y(d,m)},render:R,addToRenderList:S,dispose:I}}function dT(o,t){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,h=!1;function d(C,w,j,et,mt){let gt=!1;const z=v(et,j,w);c!==z&&(c=z,p(c.object)),gt=M(C,et,j,mt),gt&&b(C,et,j,mt),mt!==null&&t.update(mt,o.ELEMENT_ARRAY_BUFFER),(gt||h)&&(h=!1,L(C,w,j,et),mt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(mt).buffer))}function m(){return o.createVertexArray()}function p(C){return o.bindVertexArray(C)}function g(C){return o.deleteVertexArray(C)}function v(C,w,j){const et=j.wireframe===!0;let mt=s[C.id];mt===void 0&&(mt={},s[C.id]=mt);let gt=mt[w.id];gt===void 0&&(gt={},mt[w.id]=gt);let z=gt[et];return z===void 0&&(z=x(m()),gt[et]=z),z}function x(C){const w=[],j=[],et=[];for(let mt=0;mt<i;mt++)w[mt]=0,j[mt]=0,et[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:j,attributeDivisors:et,object:C,attributes:{},index:null}}function M(C,w,j,et){const mt=c.attributes,gt=w.attributes;let z=0;const J=j.getAttributes();for(const K in J)if(J[K].location>=0){const bt=mt[K];let N=gt[K];if(N===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),bt===void 0||bt.attribute!==N||N&&bt.data!==N.data)return!0;z++}return c.attributesNum!==z||c.index!==et}function b(C,w,j,et){const mt={},gt=w.attributes;let z=0;const J=j.getAttributes();for(const K in J)if(J[K].location>=0){let bt=gt[K];bt===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(bt=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(bt=C.instanceColor));const N={};N.attribute=bt,bt&&bt.data&&(N.data=bt.data),mt[K]=N,z++}c.attributes=mt,c.attributesNum=z,c.index=et}function R(){const C=c.newAttributes;for(let w=0,j=C.length;w<j;w++)C[w]=0}function S(C){y(C,0)}function y(C,w){const j=c.newAttributes,et=c.enabledAttributes,mt=c.attributeDivisors;j[C]=1,et[C]===0&&(o.enableVertexAttribArray(C),et[C]=1),mt[C]!==w&&(o.vertexAttribDivisor(C,w),mt[C]=w)}function I(){const C=c.newAttributes,w=c.enabledAttributes;for(let j=0,et=w.length;j<et;j++)w[j]!==C[j]&&(o.disableVertexAttribArray(j),w[j]=0)}function O(C,w,j,et,mt,gt,z){z===!0?o.vertexAttribIPointer(C,w,j,mt,gt):o.vertexAttribPointer(C,w,j,et,mt,gt)}function L(C,w,j,et){R();const mt=et.attributes,gt=j.getAttributes(),z=w.defaultAttributeValues;for(const J in gt){const K=gt[J];if(K.location>=0){let St=mt[J];if(St===void 0&&(J==="instanceMatrix"&&C.instanceMatrix&&(St=C.instanceMatrix),J==="instanceColor"&&C.instanceColor&&(St=C.instanceColor)),St!==void 0){const bt=St.normalized,N=St.itemSize,at=t.get(St);if(at===void 0)continue;const xt=at.buffer,Z=at.type,ct=at.bytesPerElement,Et=Z===o.INT||Z===o.UNSIGNED_INT||St.gpuType===Gd;if(St.isInterleavedBufferAttribute){const yt=St.data,Gt=yt.stride,Ft=St.offset;if(yt.isInstancedInterleavedBuffer){for(let ie=0;ie<K.locationSize;ie++)y(K.location+ie,yt.meshPerAttribute);C.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let ie=0;ie<K.locationSize;ie++)S(K.location+ie);o.bindBuffer(o.ARRAY_BUFFER,xt);for(let ie=0;ie<K.locationSize;ie++)O(K.location+ie,N/K.locationSize,Z,bt,Gt*ct,(Ft+N/K.locationSize*ie)*ct,Et)}else{if(St.isInstancedBufferAttribute){for(let yt=0;yt<K.locationSize;yt++)y(K.location+yt,St.meshPerAttribute);C.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let yt=0;yt<K.locationSize;yt++)S(K.location+yt);o.bindBuffer(o.ARRAY_BUFFER,xt);for(let yt=0;yt<K.locationSize;yt++)O(K.location+yt,N/K.locationSize,Z,bt,N*ct,N/K.locationSize*yt*ct,Et)}}else if(z!==void 0){const bt=z[J];if(bt!==void 0)switch(bt.length){case 2:o.vertexAttrib2fv(K.location,bt);break;case 3:o.vertexAttrib3fv(K.location,bt);break;case 4:o.vertexAttrib4fv(K.location,bt);break;default:o.vertexAttrib1fv(K.location,bt)}}}}I()}function Q(){W();for(const C in s){const w=s[C];for(const j in w){const et=w[j];for(const mt in et)g(et[mt].object),delete et[mt];delete w[j]}delete s[C]}}function G(C){if(s[C.id]===void 0)return;const w=s[C.id];for(const j in w){const et=w[j];for(const mt in et)g(et[mt].object),delete et[mt];delete w[j]}delete s[C.id]}function P(C){for(const w in s){const j=s[w];if(j[C.id]===void 0)continue;const et=j[C.id];for(const mt in et)g(et[mt].object),delete et[mt];delete j[C.id]}}function W(){D(),h=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:W,resetDefaultState:D,dispose:Q,releaseStatesOfGeometry:G,releaseStatesOfProgram:P,initAttributes:R,enableAttribute:S,disableUnusedAttributes:I}}function pT(o,t,i){let s;function l(p){s=p}function c(p,g){o.drawArrays(s,p,g),i.update(g,s,1)}function h(p,g,v){v!==0&&(o.drawArraysInstanced(s,p,g,v),i.update(g,s,v))}function d(p,g,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,v);let M=0;for(let b=0;b<v;b++)M+=g[b];i.update(M,s,1)}function m(p,g,v,x){if(v===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let b=0;b<p.length;b++)h(p[b],g[b],x[b]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,g,0,x,0,v);let b=0;for(let R=0;R<v;R++)b+=g[R]*x[R];i.update(b,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function mT(o,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Ri&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const W=P===Vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==pa&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ua&&!W)}function m(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const v=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),b=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=o.getParameter(o.MAX_TEXTURE_SIZE),S=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),y=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),O=o.getParameter(o.MAX_VARYING_VECTORS),L=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),Q=b>0,G=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:b,maxTextureSize:R,maxCubemapSize:S,maxAttributes:y,maxVertexUniforms:I,maxVaryings:O,maxFragmentUniforms:L,vertexTextures:Q,maxSamples:G}}function gT(o){const t=this;let i=null,s=0,l=!1,c=!1;const h=new Pi,d=new ce,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const M=v.length!==0||x||s!==0||l;return l=x,s=v.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(v,x){i=g(v,x,0)},this.setState=function(v,x,M){const b=v.clippingPlanes,R=v.clipIntersection,S=v.clipShadows,y=o.get(v);if(!l||b===null||b.length===0||c&&!S)c?g(null):p();else{const I=c?0:s,O=I*4;let L=y.clippingState||null;m.value=L,L=g(b,x,O,M);for(let Q=0;Q!==O;++Q)L[Q]=i[Q];y.clippingState=L,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(v,x,M,b){const R=v!==null?v.length:0;let S=null;if(R!==0){if(S=m.value,b!==!0||S===null){const y=M+R*4,I=x.matrixWorldInverse;d.getNormalMatrix(I),(S===null||S.length<y)&&(S=new Float32Array(y));for(let O=0,L=M;O!==R;++O,L+=4)h.copy(v[O]).applyMatrix4(I,d),h.normal.toArray(S,L),S[L+3]=h.constant}m.value=S,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,S}}function _T(o){let t=new WeakMap;function i(h,d){return d===sd?h.mapping=Lr:d===rd&&(h.mapping=Nr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===sd||d===rd)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new pM(m.height);return p.fromEquirectangularTexture(o,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Ar=4,E0=[.125,.215,.35,.446,.526,.582],Es=20,Nh=new Cv,b0=new fe;let Oh=null,Ph=0,zh=0,Bh=!1;const Ss=(1+Math.sqrt(5))/2,Er=1/Ss,T0=[new V(-Ss,Er,0),new V(Ss,Er,0),new V(-Er,0,Ss),new V(Er,0,Ss),new V(0,Ss,-Er),new V(0,Ss,Er),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class A0{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){Oh=this._renderer.getRenderTarget(),Ph=this._renderer.getActiveCubeFace(),zh=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=w0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=C0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Oh,Ph,zh),this._renderer.xr.enabled=Bh,t.scissorTest=!1,bc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Lr||t.mapping===Nr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Oh=this._renderer.getRenderTarget(),Ph=this._renderer.getActiveCubeFace(),zh=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Bi,minFilter:Bi,generateMipmaps:!1,type:Vo,format:Ri,colorSpace:zr,depthBuffer:!1},l=R0(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=R0(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vT(c)),this._blurMaterial=yT(c,t,i)}return l}_compileMaterial(t){const i=new qn(this._lodPlanes[0],t);this._renderer.compile(i,Nh)}_sceneToCubeUV(t,i,s,l){const d=new gi(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,x=g.toneMapping;g.getClearColor(b0),g.toneMapping=qa,g.autoClear=!1;const M=new Hc({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1}),b=new qn(new Ir,M);let R=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,R=!0):(M.color.copy(b0),R=!0);for(let y=0;y<6;y++){const I=y%3;I===0?(d.up.set(0,m[y],0),d.lookAt(p[y],0,0)):I===1?(d.up.set(0,0,m[y]),d.lookAt(0,p[y],0)):(d.up.set(0,m[y],0),d.lookAt(0,0,p[y]));const O=this._cubeSize;bc(l,I*O,y>2?O:0,O,O),g.setRenderTarget(l),R&&g.render(b,d),g.render(t,d)}b.geometry.dispose(),b.material.dispose(),g.toneMapping=x,g.autoClear=v,t.background=S}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Lr||t.mapping===Nr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=w0()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=C0());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new qn(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;bc(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Nh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=T0[(l-c-1)%T0.length];this._blur(t,c-1,c,h,d)}i.autoClear=s}_blur(t,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",c),this._halfBlur(h,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,v=new qn(this._lodPlanes[l],p),x=p.uniforms,M=this._sizeLods[s]-1,b=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Es-1),R=c/b,S=isFinite(c)?1+Math.floor(g*R):Es;S>Es&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Es}`);const y=[];let I=0;for(let P=0;P<Es;++P){const W=P/R,D=Math.exp(-W*W/2);y.push(D),P===0?I+=D:P<S&&(I+=2*D)}for(let P=0;P<y.length;P++)y[P]=y[P]/I;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=y,x.latitudinal.value=h==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:O}=this;x.dTheta.value=b,x.mipInt.value=O-s;const L=this._sizeLods[l],Q=3*L*(l>O-Ar?l-O+Ar:0),G=4*(this._cubeSize-L);bc(i,Q,G,3*L,2*L),m.setRenderTarget(i),m.render(v,Nh)}}function vT(o){const t=[],i=[],s=[];let l=o;const c=o-Ar+1+E0.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>o-Ar?m=E0[h-o+Ar-1]:h===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,v=1+p,x=[g,g,v,g,v,v,g,g,v,v,g,v],M=6,b=6,R=3,S=2,y=1,I=new Float32Array(R*b*M),O=new Float32Array(S*b*M),L=new Float32Array(y*b*M);for(let G=0;G<M;G++){const P=G%3*2/3-1,W=G>2?0:-1,D=[P,W,0,P+2/3,W,0,P+2/3,W+1,0,P,W,0,P+2/3,W+1,0,P,W+1,0];I.set(D,R*b*G),O.set(x,S*b*G);const C=[G,G,G,G,G,G];L.set(C,y*b*G)}const Q=new si;Q.setAttribute("position",new Bn(I,R)),Q.setAttribute("uv",new Bn(O,S)),Q.setAttribute("faceIndex",new Bn(L,y)),t.push(Q),l>Ar&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function R0(o,t,i){const s=new Rs(o,t,i);return s.texture.mapping=Xc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function bc(o,t,i,s,l){o.viewport.set(t,i,s,l),o.scissor.set(t,i,s,l)}function yT(o,t,i){const s=new Float32Array(Es),l=new V(0,1,0);return new ja({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Qd(),fragmentShader:`

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
		`,blending:Wa,depthTest:!1,depthWrite:!1})}function C0(){return new ja({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qd(),fragmentShader:`

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
		`,blending:Wa,depthTest:!1,depthWrite:!1})}function w0(){return new ja({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wa,depthTest:!1,depthWrite:!1})}function Qd(){return`

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
	`}function xT(o){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===sd||m===rd,g=m===Lr||m===Nr;if(p||g){let v=t.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return i===null&&(i=new A0(o)),v=p?i.fromEquirectangular(d,v):i.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,t.set(d,v),v.texture;if(v!==void 0)return v.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new A0(o)),v=p?i.fromEquirectangular(d):i.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,t.set(d,v),d.addEventListener("dispose",c),v.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function ST(o){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&br("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function MT(o,t,i,s){const l={},c=new WeakMap;function h(v){const x=v.target;x.index!==null&&t.remove(x.index);for(const b in x.attributes)t.remove(x.attributes[b]);x.removeEventListener("dispose",h),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function d(v,x){return l[x.id]===!0||(x.addEventListener("dispose",h),l[x.id]=!0,i.memory.geometries++),x}function m(v){const x=v.attributes;for(const M in x)t.update(x[M],o.ARRAY_BUFFER)}function p(v){const x=[],M=v.index,b=v.attributes.position;let R=0;if(M!==null){const I=M.array;R=M.version;for(let O=0,L=I.length;O<L;O+=3){const Q=I[O+0],G=I[O+1],P=I[O+2];x.push(Q,G,G,P,P,Q)}}else if(b!==void 0){const I=b.array;R=b.version;for(let O=0,L=I.length/3-1;O<L;O+=3){const Q=O+0,G=O+1,P=O+2;x.push(Q,G,G,P,P,Q)}}else return;const S=new(mv(x)?xv:yv)(x,1);S.version=R;const y=c.get(v);y&&t.remove(y),c.set(v,S)}function g(v){const x=c.get(v);if(x){const M=v.index;M!==null&&x.version<M.version&&p(v)}else p(v);return c.get(v)}return{get:d,update:m,getWireframeAttribute:g}}function ET(o,t,i){let s;function l(x){s=x}let c,h;function d(x){c=x.type,h=x.bytesPerElement}function m(x,M){o.drawElements(s,M,c,x*h),i.update(M,s,1)}function p(x,M,b){b!==0&&(o.drawElementsInstanced(s,M,c,x*h,b),i.update(M,s,b))}function g(x,M,b){if(b===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,x,0,b);let S=0;for(let y=0;y<b;y++)S+=M[y];i.update(S,s,1)}function v(x,M,b,R){if(b===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let y=0;y<x.length;y++)p(x[y]/h,M[y],R[y]);else{S.multiDrawElementsInstancedWEBGL(s,M,0,c,x,0,R,0,b);let y=0;for(let I=0;I<b;I++)y+=M[I]*R[I];i.update(y,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=v}function bT(o){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(c/3);break;case o.LINES:i.lines+=d*(c/2);break;case o.LINE_STRIP:i.lines+=d*(c-1);break;case o.LINE_LOOP:i.lines+=d*c;break;case o.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function TT(o,t,i){const s=new WeakMap,l=new $e;function c(h,d,m){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=g!==void 0?g.length:0;let x=s.get(d);if(x===void 0||x.count!==v){let C=function(){W.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var M=C;x!==void 0&&x.texture.dispose();const b=d.morphAttributes.position!==void 0,R=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let L=0;b===!0&&(L=1),R===!0&&(L=2),S===!0&&(L=3);let Q=d.attributes.position.count*L,G=1;Q>t.maxTextureSize&&(G=Math.ceil(Q/t.maxTextureSize),Q=t.maxTextureSize);const P=new Float32Array(Q*G*4*v),W=new _v(P,Q,G,v);W.type=ua,W.needsUpdate=!0;const D=L*4;for(let w=0;w<v;w++){const j=y[w],et=I[w],mt=O[w],gt=Q*G*4*w;for(let z=0;z<j.count;z++){const J=z*D;b===!0&&(l.fromBufferAttribute(j,z),P[gt+J+0]=l.x,P[gt+J+1]=l.y,P[gt+J+2]=l.z,P[gt+J+3]=0),R===!0&&(l.fromBufferAttribute(et,z),P[gt+J+4]=l.x,P[gt+J+5]=l.y,P[gt+J+6]=l.z,P[gt+J+7]=0),S===!0&&(l.fromBufferAttribute(mt,z),P[gt+J+8]=l.x,P[gt+J+9]=l.y,P[gt+J+10]=l.z,P[gt+J+11]=mt.itemSize===4?l.w:1)}}x={count:v,texture:W,size:new ae(Q,G)},s.set(d,x),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let b=0;for(let S=0;S<p.length;S++)b+=p[S];const R=d.morphTargetsRelative?1:1-b;m.getUniforms().setValue(o,"morphTargetBaseInfluence",R),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:c}}function AT(o,t,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,v=t.get(m,g);if(l.get(v)!==p&&(t.update(v),l.set(v,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const x=m.skeleton;l.get(x)!==p&&(x.update(),l.set(x,p))}return v}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const Dv=new jn,D0=new Av(1,1),Uv=new _v,Lv=new JS,Nv=new Ev,U0=[],L0=[],N0=new Float32Array(16),O0=new Float32Array(9),P0=new Float32Array(4);function Fr(o,t,i){const s=o[0];if(s<=0||s>0)return o;const l=t*i;let c=U0[l];if(c===void 0&&(c=new Float32Array(l),U0[l]=c),t!==0){s.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,o[h].toArray(c,d)}return c}function pn(o,t){if(o.length!==t.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==t[i])return!1;return!0}function mn(o,t){for(let i=0,s=t.length;i<s;i++)o[i]=t[i]}function jc(o,t){let i=L0[t];i===void 0&&(i=new Int32Array(t),L0[t]=i);for(let s=0;s!==t;++s)i[s]=o.allocateTextureUnit();return i}function RT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1f(this.addr,t),i[0]=t)}function CT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2fv(this.addr,t),mn(i,t)}}function wT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(pn(i,t))return;o.uniform3fv(this.addr,t),mn(i,t)}}function DT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4fv(this.addr,t),mn(i,t)}}function UT(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix2fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;P0.set(s),o.uniformMatrix2fv(this.addr,!1,P0),mn(i,s)}}function LT(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix3fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;O0.set(s),o.uniformMatrix3fv(this.addr,!1,O0),mn(i,s)}}function NT(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix4fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;N0.set(s),o.uniformMatrix4fv(this.addr,!1,N0),mn(i,s)}}function OT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1i(this.addr,t),i[0]=t)}function PT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2iv(this.addr,t),mn(i,t)}}function zT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(pn(i,t))return;o.uniform3iv(this.addr,t),mn(i,t)}}function BT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4iv(this.addr,t),mn(i,t)}}function IT(o,t){const i=this.cache;i[0]!==t&&(o.uniform1ui(this.addr,t),i[0]=t)}function FT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2uiv(this.addr,t),mn(i,t)}}function HT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(pn(i,t))return;o.uniform3uiv(this.addr,t),mn(i,t)}}function GT(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4uiv(this.addr,t),mn(i,t)}}function VT(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let c;this.type===o.SAMPLER_2D_SHADOW?(D0.compareFunction=pv,c=D0):c=Dv,i.setTexture2D(t||c,l)}function kT(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||Lv,l)}function XT(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||Nv,l)}function WT(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||Uv,l)}function qT(o){switch(o){case 5126:return RT;case 35664:return CT;case 35665:return wT;case 35666:return DT;case 35674:return UT;case 35675:return LT;case 35676:return NT;case 5124:case 35670:return OT;case 35667:case 35671:return PT;case 35668:case 35672:return zT;case 35669:case 35673:return BT;case 5125:return IT;case 36294:return FT;case 36295:return HT;case 36296:return GT;case 35678:case 36198:case 36298:case 36306:case 35682:return VT;case 35679:case 36299:case 36307:return kT;case 35680:case 36300:case 36308:case 36293:return XT;case 36289:case 36303:case 36311:case 36292:return WT}}function YT(o,t){o.uniform1fv(this.addr,t)}function jT(o,t){const i=Fr(t,this.size,2);o.uniform2fv(this.addr,i)}function ZT(o,t){const i=Fr(t,this.size,3);o.uniform3fv(this.addr,i)}function KT(o,t){const i=Fr(t,this.size,4);o.uniform4fv(this.addr,i)}function QT(o,t){const i=Fr(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function JT(o,t){const i=Fr(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function $T(o,t){const i=Fr(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function tA(o,t){o.uniform1iv(this.addr,t)}function eA(o,t){o.uniform2iv(this.addr,t)}function nA(o,t){o.uniform3iv(this.addr,t)}function iA(o,t){o.uniform4iv(this.addr,t)}function aA(o,t){o.uniform1uiv(this.addr,t)}function sA(o,t){o.uniform2uiv(this.addr,t)}function rA(o,t){o.uniform3uiv(this.addr,t)}function oA(o,t){o.uniform4uiv(this.addr,t)}function lA(o,t,i){const s=this.cache,l=t.length,c=jc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||Dv,c[h])}function cA(o,t,i){const s=this.cache,l=t.length,c=jc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||Lv,c[h])}function uA(o,t,i){const s=this.cache,l=t.length,c=jc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||Nv,c[h])}function fA(o,t,i){const s=this.cache,l=t.length,c=jc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||Uv,c[h])}function hA(o){switch(o){case 5126:return YT;case 35664:return jT;case 35665:return ZT;case 35666:return KT;case 35674:return QT;case 35675:return JT;case 35676:return $T;case 5124:case 35670:return tA;case 35667:case 35671:return eA;case 35668:case 35672:return nA;case 35669:case 35673:return iA;case 5125:return aA;case 36294:return sA;case 36295:return rA;case 36296:return oA;case 35678:case 36198:case 36298:case 36306:case 35682:return lA;case 35679:case 36299:case 36307:return cA;case 35680:case 36300:case 36308:case 36293:return uA;case 36289:case 36303:case 36311:case 36292:return fA}}class dA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=qT(i.type)}}class pA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=hA(i.type)}}class mA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const Ih=/(\w+)(\])?(\[|\.)?/g;function z0(o,t){o.seq.push(t),o.map[t.id]=t}function gA(o,t,i){const s=o.name,l=s.length;for(Ih.lastIndex=0;;){const c=Ih.exec(s),h=Ih.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){z0(i,p===void 0?new dA(d,o,t):new pA(d,o,t));break}else{let v=i.map[d];v===void 0&&(v=new mA(d),z0(i,v)),i=v}}}class zc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),h=t.getUniformLocation(i,c.name);gA(c,h,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function B0(o,t,i){const s=o.createShader(t);return o.shaderSource(s,i),o.compileShader(s),s}const _A=37297;let vA=0;function yA(o,t){const i=o.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const I0=new ce;function xA(o){we._getMatrix(I0,we.workingColorSpace,o);const t=`mat3( ${I0.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(o)){case Bc:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function F0(o,t,i){const s=o.getShaderParameter(t,o.COMPILE_STATUS),l=o.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const h=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+yA(o.getShaderSource(t),h)}else return l}function SA(o,t){const i=xA(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function MA(o,t){let i;switch(t){case ES:i="Linear";break;case bS:i="Reinhard";break;case TS:i="Cineon";break;case AS:i="ACESFilmic";break;case CS:i="AgX";break;case wS:i="Neutral";break;case RS:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Tc=new V;function EA(){we.getLuminanceCoefficients(Tc);const o=Tc.x.toFixed(4),t=Tc.y.toFixed(4),i=Tc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bA(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ho).join(`
`)}function TA(o){const t=[];for(const i in o){const s=o[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function AA(o,t){const i={},s=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=o.getActiveAttrib(t,l),h=c.name;let d=1;c.type===o.FLOAT_MAT2&&(d=2),c.type===o.FLOAT_MAT3&&(d=3),c.type===o.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:o.getAttribLocation(t,h),locationSize:d}}return i}function Ho(o){return o!==""}function H0(o,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function G0(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const RA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bd(o){return o.replace(RA,wA)}const CA=new Map;function wA(o,t){let i=ue[t];if(i===void 0){const s=CA.get(t);if(s!==void 0)i=ue[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Bd(i)}const DA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function V0(o){return o.replace(DA,UA)}function UA(o,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function k0(o){let t=`precision ${o.precision} float;
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
#define LOW_PRECISION`),t}function LA(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===$0?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===tv?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===ca&&(t="SHADOWMAP_TYPE_VSM"),t}function NA(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Lr:case Nr:t="ENVMAP_TYPE_CUBE";break;case Xc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function OA(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Nr:t="ENVMAP_MODE_REFRACTION";break}return t}function PA(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case ev:t="ENVMAP_BLENDING_MULTIPLY";break;case SS:t="ENVMAP_BLENDING_MIX";break;case MS:t="ENVMAP_BLENDING_ADD";break}return t}function zA(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function BA(o,t,i,s){const l=o.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=LA(i),p=NA(i),g=OA(i),v=PA(i),x=zA(i),M=bA(i),b=TA(c),R=l.createProgram();let S,y,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Ho).join(`
`),S.length>0&&(S+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b].filter(Ho).join(`
`),y.length>0&&(y+=`
`)):(S=[k0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ho).join(`
`),y=[k0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,b,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==qa?"#define TONE_MAPPING":"",i.toneMapping!==qa?ue.tonemapping_pars_fragment:"",i.toneMapping!==qa?MA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ue.colorspace_pars_fragment,SA("linearToOutputTexel",i.outputColorSpace),EA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Ho).join(`
`)),h=Bd(h),h=H0(h,i),h=G0(h,i),d=Bd(d),d=H0(d,i),d=G0(d,i),h=V0(h),d=V0(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,y=["#define varying in",i.glslVersion===Z_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Z_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const O=I+S+h,L=I+y+d,Q=B0(l,l.VERTEX_SHADER,O),G=B0(l,l.FRAGMENT_SHADER,L);l.attachShader(R,Q),l.attachShader(R,G),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function P(w){if(o.debug.checkShaderErrors){const j=l.getProgramInfoLog(R).trim(),et=l.getShaderInfoLog(Q).trim(),mt=l.getShaderInfoLog(G).trim();let gt=!0,z=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(gt=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,R,Q,G);else{const J=F0(l,Q,"vertex"),K=F0(l,G,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+j+`
`+J+`
`+K)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(et===""||mt==="")&&(z=!1);z&&(w.diagnostics={runnable:gt,programLog:j,vertexShader:{log:et,prefix:S},fragmentShader:{log:mt,prefix:y}})}l.deleteShader(Q),l.deleteShader(G),W=new zc(l,R),D=AA(l,R)}let W;this.getUniforms=function(){return W===void 0&&P(this),W};let D;this.getAttributes=function(){return D===void 0&&P(this),D};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(R,_A)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=vA++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=Q,this.fragmentShader=G,this}let IA=0;class FA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new HA(t),i.set(t,s)),s}}class HA{constructor(t){this.id=IA++,this.code=t,this.usedTimes=0}}function GA(o,t,i,s,l,c,h){const d=new Yd,m=new FA,p=new Set,g=[],v=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(D){return p.add(D),D===0?"uv":`uv${D}`}function S(D,C,w,j,et){const mt=j.fog,gt=et.geometry,z=D.isMeshStandardMaterial?j.environment:null,J=(D.isMeshStandardMaterial?i:t).get(D.envMap||z),K=J&&J.mapping===Xc?J.image.height:null,St=b[D.type];D.precision!==null&&(M=l.getMaxPrecision(D.precision),M!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",M,"instead."));const bt=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,N=bt!==void 0?bt.length:0;let at=0;gt.morphAttributes.position!==void 0&&(at=1),gt.morphAttributes.normal!==void 0&&(at=2),gt.morphAttributes.color!==void 0&&(at=3);let xt,Z,ct,Et;if(St){const be=zi[St];xt=be.vertexShader,Z=be.fragmentShader}else xt=D.vertexShader,Z=D.fragmentShader,m.update(D),ct=m.getVertexShaderID(D),Et=m.getFragmentShaderID(D);const yt=o.getRenderTarget(),Gt=o.state.buffers.depth.getReversed(),Ft=et.isInstancedMesh===!0,ie=et.isBatchedMesh===!0,Oe=!!D.map,de=!!D.matcap,Ye=!!J,F=!!D.aoMap,Cn=!!D.lightMap,he=!!D.bumpMap,ve=!!D.normalMap,qt=!!D.displacementMap,Ue=!!D.emissiveMap,Wt=!!D.metalnessMap,U=!!D.roughnessMap,T=D.anisotropy>0,it=D.clearcoat>0,ft=D.dispersion>0,Mt=D.iridescence>0,dt=D.sheen>0,kt=D.transmission>0,wt=T&&!!D.anisotropyMap,zt=it&&!!D.clearcoatMap,ye=it&&!!D.clearcoatNormalMap,At=it&&!!D.clearcoatRoughnessMap,Bt=Mt&&!!D.iridescenceMap,Yt=Mt&&!!D.iridescenceThicknessMap,Xt=dt&&!!D.sheenColorMap,Nt=dt&&!!D.sheenRoughnessMap,Jt=!!D.specularMap,se=!!D.specularColorMap,Pe=!!D.specularIntensityMap,k=kt&&!!D.transmissionMap,Rt=kt&&!!D.thicknessMap,lt=!!D.gradientMap,_t=!!D.alphaMap,Ct=D.alphaTest>0,Dt=!!D.alphaHash,$t=!!D.extensions;let je=qa;D.toneMapped&&(yt===null||yt.isXRRenderTarget===!0)&&(je=o.toneMapping);const un={shaderID:St,shaderType:D.type,shaderName:D.name,vertexShader:xt,fragmentShader:Z,defines:D.defines,customVertexShaderID:ct,customFragmentShaderID:Et,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:M,batching:ie,batchingColor:ie&&et._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&et.instanceColor!==null,instancingMorph:Ft&&et.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:yt===null?o.outputColorSpace:yt.isXRRenderTarget===!0?yt.texture.colorSpace:zr,alphaToCoverage:!!D.alphaToCoverage,map:Oe,matcap:de,envMap:Ye,envMapMode:Ye&&J.mapping,envMapCubeUVHeight:K,aoMap:F,lightMap:Cn,bumpMap:he,normalMap:ve,displacementMap:x&&qt,emissiveMap:Ue,normalMapObjectSpace:ve&&D.normalMapType===NS,normalMapTangentSpace:ve&&D.normalMapType===dv,metalnessMap:Wt,roughnessMap:U,anisotropy:T,anisotropyMap:wt,clearcoat:it,clearcoatMap:zt,clearcoatNormalMap:ye,clearcoatRoughnessMap:At,dispersion:ft,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Yt,sheen:dt,sheenColorMap:Xt,sheenRoughnessMap:Nt,specularMap:Jt,specularColorMap:se,specularIntensityMap:Pe,transmission:kt,transmissionMap:k,thicknessMap:Rt,gradientMap:lt,opaque:D.transparent===!1&&D.blending===Cr&&D.alphaToCoverage===!1,alphaMap:_t,alphaTest:Ct,alphaHash:Dt,combine:D.combine,mapUv:Oe&&R(D.map.channel),aoMapUv:F&&R(D.aoMap.channel),lightMapUv:Cn&&R(D.lightMap.channel),bumpMapUv:he&&R(D.bumpMap.channel),normalMapUv:ve&&R(D.normalMap.channel),displacementMapUv:qt&&R(D.displacementMap.channel),emissiveMapUv:Ue&&R(D.emissiveMap.channel),metalnessMapUv:Wt&&R(D.metalnessMap.channel),roughnessMapUv:U&&R(D.roughnessMap.channel),anisotropyMapUv:wt&&R(D.anisotropyMap.channel),clearcoatMapUv:zt&&R(D.clearcoatMap.channel),clearcoatNormalMapUv:ye&&R(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&R(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&R(D.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&R(D.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&R(D.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&R(D.sheenRoughnessMap.channel),specularMapUv:Jt&&R(D.specularMap.channel),specularColorMapUv:se&&R(D.specularColorMap.channel),specularIntensityMapUv:Pe&&R(D.specularIntensityMap.channel),transmissionMapUv:k&&R(D.transmissionMap.channel),thicknessMapUv:Rt&&R(D.thicknessMap.channel),alphaMapUv:_t&&R(D.alphaMap.channel),vertexTangents:!!gt.attributes.tangent&&(ve||T),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,pointsUvs:et.isPoints===!0&&!!gt.attributes.uv&&(Oe||_t),fog:!!mt,useFog:D.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:Gt,skinning:et.isSkinnedMesh===!0,morphTargets:gt.morphAttributes.position!==void 0,morphNormals:gt.morphAttributes.normal!==void 0,morphColors:gt.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:at,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:o.shadowMap.enabled&&w.length>0,shadowMapType:o.shadowMap.type,toneMapping:je,decodeVideoTexture:Oe&&D.map.isVideoTexture===!0&&we.getTransfer(D.map.colorSpace)===Fe,decodeVideoTextureEmissive:Ue&&D.emissiveMap.isVideoTexture===!0&&we.getTransfer(D.emissiveMap.colorSpace)===Fe,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Ti,flipSided:D.side===Yn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:$t&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&D.extensions.multiDraw===!0||ie)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return un.vertexUv1s=p.has(1),un.vertexUv2s=p.has(2),un.vertexUv3s=p.has(3),p.clear(),un}function y(D){const C=[];if(D.shaderID?C.push(D.shaderID):(C.push(D.customVertexShaderID),C.push(D.customFragmentShaderID)),D.defines!==void 0)for(const w in D.defines)C.push(w),C.push(D.defines[w]);return D.isRawShaderMaterial===!1&&(I(C,D),O(C,D),C.push(o.outputColorSpace)),C.push(D.customProgramCacheKey),C.join()}function I(D,C){D.push(C.precision),D.push(C.outputColorSpace),D.push(C.envMapMode),D.push(C.envMapCubeUVHeight),D.push(C.mapUv),D.push(C.alphaMapUv),D.push(C.lightMapUv),D.push(C.aoMapUv),D.push(C.bumpMapUv),D.push(C.normalMapUv),D.push(C.displacementMapUv),D.push(C.emissiveMapUv),D.push(C.metalnessMapUv),D.push(C.roughnessMapUv),D.push(C.anisotropyMapUv),D.push(C.clearcoatMapUv),D.push(C.clearcoatNormalMapUv),D.push(C.clearcoatRoughnessMapUv),D.push(C.iridescenceMapUv),D.push(C.iridescenceThicknessMapUv),D.push(C.sheenColorMapUv),D.push(C.sheenRoughnessMapUv),D.push(C.specularMapUv),D.push(C.specularColorMapUv),D.push(C.specularIntensityMapUv),D.push(C.transmissionMapUv),D.push(C.thicknessMapUv),D.push(C.combine),D.push(C.fogExp2),D.push(C.sizeAttenuation),D.push(C.morphTargetsCount),D.push(C.morphAttributeCount),D.push(C.numDirLights),D.push(C.numPointLights),D.push(C.numSpotLights),D.push(C.numSpotLightMaps),D.push(C.numHemiLights),D.push(C.numRectAreaLights),D.push(C.numDirLightShadows),D.push(C.numPointLightShadows),D.push(C.numSpotLightShadows),D.push(C.numSpotLightShadowsWithMaps),D.push(C.numLightProbes),D.push(C.shadowMapType),D.push(C.toneMapping),D.push(C.numClippingPlanes),D.push(C.numClipIntersection),D.push(C.depthPacking)}function O(D,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),D.push(d.mask)}function L(D){const C=b[D.type];let w;if(C){const j=zi[C];w=uM.clone(j.uniforms)}else w=D.uniforms;return w}function Q(D,C){let w;for(let j=0,et=g.length;j<et;j++){const mt=g[j];if(mt.cacheKey===C){w=mt,++w.usedTimes;break}}return w===void 0&&(w=new BA(o,C,D,c),g.push(w)),w}function G(D){if(--D.usedTimes===0){const C=g.indexOf(D);g[C]=g[g.length-1],g.pop(),D.destroy()}}function P(D){m.remove(D)}function W(){m.dispose()}return{getParameters:S,getProgramCacheKey:y,getUniforms:L,acquireProgram:Q,releaseProgram:G,releaseShaderCache:P,programs:g,dispose:W}}function VA(){let o=new WeakMap;function t(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function c(){o=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function kA(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function X0(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function W0(){const o=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(v,x,M,b,R,S){let y=o[t];return y===void 0?(y={id:v.id,object:v,geometry:x,material:M,groupOrder:b,renderOrder:v.renderOrder,z:R,group:S},o[t]=y):(y.id=v.id,y.object=v,y.geometry=x,y.material=M,y.groupOrder=b,y.renderOrder=v.renderOrder,y.z=R,y.group=S),t++,y}function d(v,x,M,b,R,S){const y=h(v,x,M,b,R,S);M.transmission>0?s.push(y):M.transparent===!0?l.push(y):i.push(y)}function m(v,x,M,b,R,S){const y=h(v,x,M,b,R,S);M.transmission>0?s.unshift(y):M.transparent===!0?l.unshift(y):i.unshift(y)}function p(v,x){i.length>1&&i.sort(v||kA),s.length>1&&s.sort(x||X0),l.length>1&&l.sort(x||X0)}function g(){for(let v=t,x=o.length;v<x;v++){const M=o[v];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function XA(){let o=new WeakMap;function t(s,l){const c=o.get(s);let h;return c===void 0?(h=new W0,o.set(s,[h])):l>=c.length?(h=new W0,c.push(h)):h=c[l],h}function i(){o=new WeakMap}return{get:t,dispose:i}}function WA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new V,color:new fe};break;case"SpotLight":i={position:new V,direction:new V,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new V,color:new fe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new V,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":i={color:new fe,position:new V,halfWidth:new V,halfHeight:new V};break}return o[t.id]=i,i}}}function qA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=i,i}}}let YA=0;function jA(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function ZA(o){const t=new WA,i=qA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new V);const l=new V,c=new ke,h=new ke;function d(p){let g=0,v=0,x=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let M=0,b=0,R=0,S=0,y=0,I=0,O=0,L=0,Q=0,G=0,P=0;p.sort(jA);for(let D=0,C=p.length;D<C;D++){const w=p[D],j=w.color,et=w.intensity,mt=w.distance,gt=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)g+=j.r*et,v+=j.g*et,x+=j.b*et;else if(w.isLightProbe){for(let z=0;z<9;z++)s.probe[z].addScaledVector(w.sh.coefficients[z],et);P++}else if(w.isDirectionalLight){const z=t.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const J=w.shadow,K=i.get(w);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,s.directionalShadow[M]=K,s.directionalShadowMap[M]=gt,s.directionalShadowMatrix[M]=w.shadow.matrix,I++}s.directional[M]=z,M++}else if(w.isSpotLight){const z=t.get(w);z.position.setFromMatrixPosition(w.matrixWorld),z.color.copy(j).multiplyScalar(et),z.distance=mt,z.coneCos=Math.cos(w.angle),z.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),z.decay=w.decay,s.spot[R]=z;const J=w.shadow;if(w.map&&(s.spotLightMap[Q]=w.map,Q++,J.updateMatrices(w),w.castShadow&&G++),s.spotLightMatrix[R]=J.matrix,w.castShadow){const K=i.get(w);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,s.spotShadow[R]=K,s.spotShadowMap[R]=gt,L++}R++}else if(w.isRectAreaLight){const z=t.get(w);z.color.copy(j).multiplyScalar(et),z.halfWidth.set(w.width*.5,0,0),z.halfHeight.set(0,w.height*.5,0),s.rectArea[S]=z,S++}else if(w.isPointLight){const z=t.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity),z.distance=w.distance,z.decay=w.decay,w.castShadow){const J=w.shadow,K=i.get(w);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,K.shadowCameraNear=J.camera.near,K.shadowCameraFar=J.camera.far,s.pointShadow[b]=K,s.pointShadowMap[b]=gt,s.pointShadowMatrix[b]=w.shadow.matrix,O++}s.point[b]=z,b++}else if(w.isHemisphereLight){const z=t.get(w);z.skyColor.copy(w.color).multiplyScalar(et),z.groundColor.copy(w.groundColor).multiplyScalar(et),s.hemi[y]=z,y++}}S>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_FLOAT_1,s.rectAreaLTC2=Lt.LTC_FLOAT_2):(s.rectAreaLTC1=Lt.LTC_HALF_1,s.rectAreaLTC2=Lt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=v,s.ambient[2]=x;const W=s.hash;(W.directionalLength!==M||W.pointLength!==b||W.spotLength!==R||W.rectAreaLength!==S||W.hemiLength!==y||W.numDirectionalShadows!==I||W.numPointShadows!==O||W.numSpotShadows!==L||W.numSpotMaps!==Q||W.numLightProbes!==P)&&(s.directional.length=M,s.spot.length=R,s.rectArea.length=S,s.point.length=b,s.hemi.length=y,s.directionalShadow.length=I,s.directionalShadowMap.length=I,s.pointShadow.length=O,s.pointShadowMap.length=O,s.spotShadow.length=L,s.spotShadowMap.length=L,s.directionalShadowMatrix.length=I,s.pointShadowMatrix.length=O,s.spotLightMatrix.length=L+Q-G,s.spotLightMap.length=Q,s.numSpotLightShadowsWithMaps=G,s.numLightProbes=P,W.directionalLength=M,W.pointLength=b,W.spotLength=R,W.rectAreaLength=S,W.hemiLength=y,W.numDirectionalShadows=I,W.numPointShadows=O,W.numSpotShadows=L,W.numSpotMaps=Q,W.numLightProbes=P,s.version=YA++)}function m(p,g){let v=0,x=0,M=0,b=0,R=0;const S=g.matrixWorldInverse;for(let y=0,I=p.length;y<I;y++){const O=p[y];if(O.isDirectionalLight){const L=s.directional[v];L.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(S),v++}else if(O.isSpotLight){const L=s.spot[M];L.position.setFromMatrixPosition(O.matrixWorld),L.position.applyMatrix4(S),L.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(S),M++}else if(O.isRectAreaLight){const L=s.rectArea[b];L.position.setFromMatrixPosition(O.matrixWorld),L.position.applyMatrix4(S),h.identity(),c.copy(O.matrixWorld),c.premultiply(S),h.extractRotation(c),L.halfWidth.set(O.width*.5,0,0),L.halfHeight.set(0,O.height*.5,0),L.halfWidth.applyMatrix4(h),L.halfHeight.applyMatrix4(h),b++}else if(O.isPointLight){const L=s.point[x];L.position.setFromMatrixPosition(O.matrixWorld),L.position.applyMatrix4(S),x++}else if(O.isHemisphereLight){const L=s.hemi[R];L.direction.setFromMatrixPosition(O.matrixWorld),L.direction.transformDirection(S),R++}}}return{setup:d,setupView:m,state:s}}function q0(o){const t=new ZA(o),i=[],s=[];function l(g){p.camera=g,i.length=0,s.length=0}function c(g){i.push(g)}function h(g){s.push(g)}function d(){t.setup(i)}function m(g){t.setupView(i,g)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function KA(o){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new q0(o),t.set(l,[d])):c>=h.length?(d=new q0(o),h.push(d)):d=h[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const QA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,JA=`uniform sampler2D shadow_pass;
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
}`;function $A(o,t,i){let s=new Zd;const l=new ae,c=new ae,h=new $e,d=new yM({depthPacking:LS}),m=new xM,p={},g=i.maxTextureSize,v={[Ya]:Yn,[Yn]:Ya,[Ti]:Ti},x=new ja({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:QA,fragmentShader:JA}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const b=new si;b.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new qn(b,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$0;let y=this.type;this.render=function(G,P,W){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||G.length===0)return;const D=o.getRenderTarget(),C=o.getActiveCubeFace(),w=o.getActiveMipmapLevel(),j=o.state;j.setBlending(Wa),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const et=y!==ca&&this.type===ca,mt=y===ca&&this.type!==ca;for(let gt=0,z=G.length;gt<z;gt++){const J=G[gt],K=J.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const St=K.getFrameExtents();if(l.multiply(St),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/St.x),l.x=c.x*St.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/St.y),l.y=c.y*St.y,K.mapSize.y=c.y)),K.map===null||et===!0||mt===!0){const N=this.type!==ca?{minFilter:Ci,magFilter:Ci}:{};K.map!==null&&K.map.dispose(),K.map=new Rs(l.x,l.y,N),K.map.texture.name=J.name+".shadowMap",K.camera.updateProjectionMatrix()}o.setRenderTarget(K.map),o.clear();const bt=K.getViewportCount();for(let N=0;N<bt;N++){const at=K.getViewport(N);h.set(c.x*at.x,c.y*at.y,c.x*at.z,c.y*at.w),j.viewport(h),K.updateMatrices(J,N),s=K.getFrustum(),L(P,W,K.camera,J,this.type)}K.isPointLightShadow!==!0&&this.type===ca&&I(K,W),K.needsUpdate=!1}y=this.type,S.needsUpdate=!1,o.setRenderTarget(D,C,w)};function I(G,P){const W=t.update(R);x.defines.VSM_SAMPLES!==G.blurSamples&&(x.defines.VSM_SAMPLES=G.blurSamples,M.defines.VSM_SAMPLES=G.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),G.mapPass===null&&(G.mapPass=new Rs(l.x,l.y)),x.uniforms.shadow_pass.value=G.map.texture,x.uniforms.resolution.value=G.mapSize,x.uniforms.radius.value=G.radius,o.setRenderTarget(G.mapPass),o.clear(),o.renderBufferDirect(P,null,W,x,R,null),M.uniforms.shadow_pass.value=G.mapPass.texture,M.uniforms.resolution.value=G.mapSize,M.uniforms.radius.value=G.radius,o.setRenderTarget(G.map),o.clear(),o.renderBufferDirect(P,null,W,M,R,null)}function O(G,P,W,D){let C=null;const w=W.isPointLight===!0?G.customDistanceMaterial:G.customDepthMaterial;if(w!==void 0)C=w;else if(C=W.isPointLight===!0?m:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const j=C.uuid,et=P.uuid;let mt=p[j];mt===void 0&&(mt={},p[j]=mt);let gt=mt[et];gt===void 0&&(gt=C.clone(),mt[et]=gt,P.addEventListener("dispose",Q)),C=gt}if(C.visible=P.visible,C.wireframe=P.wireframe,D===ca?C.side=P.shadowSide!==null?P.shadowSide:P.side:C.side=P.shadowSide!==null?P.shadowSide:v[P.side],C.alphaMap=P.alphaMap,C.alphaTest=P.alphaTest,C.map=P.map,C.clipShadows=P.clipShadows,C.clippingPlanes=P.clippingPlanes,C.clipIntersection=P.clipIntersection,C.displacementMap=P.displacementMap,C.displacementScale=P.displacementScale,C.displacementBias=P.displacementBias,C.wireframeLinewidth=P.wireframeLinewidth,C.linewidth=P.linewidth,W.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const j=o.properties.get(C);j.light=W}return C}function L(G,P,W,D,C){if(G.visible===!1)return;if(G.layers.test(P.layers)&&(G.isMesh||G.isLine||G.isPoints)&&(G.castShadow||G.receiveShadow&&C===ca)&&(!G.frustumCulled||s.intersectsObject(G))){G.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,G.matrixWorld);const et=t.update(G),mt=G.material;if(Array.isArray(mt)){const gt=et.groups;for(let z=0,J=gt.length;z<J;z++){const K=gt[z],St=mt[K.materialIndex];if(St&&St.visible){const bt=O(G,St,D,C);G.onBeforeShadow(o,G,P,W,et,bt,K),o.renderBufferDirect(W,null,et,bt,G,K),G.onAfterShadow(o,G,P,W,et,bt,K)}}}else if(mt.visible){const gt=O(G,mt,D,C);G.onBeforeShadow(o,G,P,W,et,gt,null),o.renderBufferDirect(W,null,et,gt,G,null),G.onAfterShadow(o,G,P,W,et,gt,null)}}const j=G.children;for(let et=0,mt=j.length;et<mt;et++)L(j[et],P,W,D,C)}function Q(G){G.target.removeEventListener("dispose",Q);for(const W in p){const D=p[W],C=G.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}}const t1={[Jh]:$h,[td]:id,[ed]:ad,[Ur]:nd,[$h]:Jh,[id]:td,[ad]:ed,[nd]:Ur};function e1(o,t){function i(){let k=!1;const Rt=new $e;let lt=null;const _t=new $e(0,0,0,0);return{setMask:function(Ct){lt!==Ct&&!k&&(o.colorMask(Ct,Ct,Ct,Ct),lt=Ct)},setLocked:function(Ct){k=Ct},setClear:function(Ct,Dt,$t,je,un){un===!0&&(Ct*=je,Dt*=je,$t*=je),Rt.set(Ct,Dt,$t,je),_t.equals(Rt)===!1&&(o.clearColor(Ct,Dt,$t,je),_t.copy(Rt))},reset:function(){k=!1,lt=null,_t.set(-1,0,0,0)}}}function s(){let k=!1,Rt=!1,lt=null,_t=null,Ct=null;return{setReversed:function(Dt){if(Rt!==Dt){const $t=t.get("EXT_clip_control");Rt?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const je=Ct;Ct=null,this.setClear(je)}Rt=Dt},getReversed:function(){return Rt},setTest:function(Dt){Dt?yt(o.DEPTH_TEST):Gt(o.DEPTH_TEST)},setMask:function(Dt){lt!==Dt&&!k&&(o.depthMask(Dt),lt=Dt)},setFunc:function(Dt){if(Rt&&(Dt=t1[Dt]),_t!==Dt){switch(Dt){case Jh:o.depthFunc(o.NEVER);break;case $h:o.depthFunc(o.ALWAYS);break;case td:o.depthFunc(o.LESS);break;case Ur:o.depthFunc(o.LEQUAL);break;case ed:o.depthFunc(o.EQUAL);break;case nd:o.depthFunc(o.GEQUAL);break;case id:o.depthFunc(o.GREATER);break;case ad:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}_t=Dt}},setLocked:function(Dt){k=Dt},setClear:function(Dt){Ct!==Dt&&(Rt&&(Dt=1-Dt),o.clearDepth(Dt),Ct=Dt)},reset:function(){k=!1,lt=null,_t=null,Ct=null,Rt=!1}}}function l(){let k=!1,Rt=null,lt=null,_t=null,Ct=null,Dt=null,$t=null,je=null,un=null;return{setTest:function(be){k||(be?yt(o.STENCIL_TEST):Gt(o.STENCIL_TEST))},setMask:function(be){Rt!==be&&!k&&(o.stencilMask(be),Rt=be)},setFunc:function(be,xn,_i){(lt!==be||_t!==xn||Ct!==_i)&&(o.stencilFunc(be,xn,_i),lt=be,_t=xn,Ct=_i)},setOp:function(be,xn,_i){(Dt!==be||$t!==xn||je!==_i)&&(o.stencilOp(be,xn,_i),Dt=be,$t=xn,je=_i)},setLocked:function(be){k=be},setClear:function(be){un!==be&&(o.clearStencil(be),un=be)},reset:function(){k=!1,Rt=null,lt=null,_t=null,Ct=null,Dt=null,$t=null,je=null,un=null}}}const c=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},v={},x=new WeakMap,M=[],b=null,R=!1,S=null,y=null,I=null,O=null,L=null,Q=null,G=null,P=new fe(0,0,0),W=0,D=!1,C=null,w=null,j=null,et=null,mt=null;const gt=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,J=0;const K=o.getParameter(o.VERSION);K.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=J>=1):K.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=J>=2);let St=null,bt={};const N=o.getParameter(o.SCISSOR_BOX),at=o.getParameter(o.VIEWPORT),xt=new $e().fromArray(N),Z=new $e().fromArray(at);function ct(k,Rt,lt,_t){const Ct=new Uint8Array(4),Dt=o.createTexture();o.bindTexture(k,Dt),o.texParameteri(k,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(k,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let $t=0;$t<lt;$t++)k===o.TEXTURE_3D||k===o.TEXTURE_2D_ARRAY?o.texImage3D(Rt,0,o.RGBA,1,1,_t,0,o.RGBA,o.UNSIGNED_BYTE,Ct):o.texImage2D(Rt+$t,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Ct);return Dt}const Et={};Et[o.TEXTURE_2D]=ct(o.TEXTURE_2D,o.TEXTURE_2D,1),Et[o.TEXTURE_CUBE_MAP]=ct(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[o.TEXTURE_2D_ARRAY]=ct(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Et[o.TEXTURE_3D]=ct(o.TEXTURE_3D,o.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),yt(o.DEPTH_TEST),h.setFunc(Ur),he(!1),ve(k_),yt(o.CULL_FACE),F(Wa);function yt(k){g[k]!==!0&&(o.enable(k),g[k]=!0)}function Gt(k){g[k]!==!1&&(o.disable(k),g[k]=!1)}function Ft(k,Rt){return v[k]!==Rt?(o.bindFramebuffer(k,Rt),v[k]=Rt,k===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=Rt),k===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=Rt),!0):!1}function ie(k,Rt){let lt=M,_t=!1;if(k){lt=x.get(Rt),lt===void 0&&(lt=[],x.set(Rt,lt));const Ct=k.textures;if(lt.length!==Ct.length||lt[0]!==o.COLOR_ATTACHMENT0){for(let Dt=0,$t=Ct.length;Dt<$t;Dt++)lt[Dt]=o.COLOR_ATTACHMENT0+Dt;lt.length=Ct.length,_t=!0}}else lt[0]!==o.BACK&&(lt[0]=o.BACK,_t=!0);_t&&o.drawBuffers(lt)}function Oe(k){return b!==k?(o.useProgram(k),b=k,!0):!1}const de={[Ms]:o.FUNC_ADD,[aS]:o.FUNC_SUBTRACT,[sS]:o.FUNC_REVERSE_SUBTRACT};de[rS]=o.MIN,de[oS]=o.MAX;const Ye={[lS]:o.ZERO,[cS]:o.ONE,[uS]:o.SRC_COLOR,[Kh]:o.SRC_ALPHA,[gS]:o.SRC_ALPHA_SATURATE,[pS]:o.DST_COLOR,[hS]:o.DST_ALPHA,[fS]:o.ONE_MINUS_SRC_COLOR,[Qh]:o.ONE_MINUS_SRC_ALPHA,[mS]:o.ONE_MINUS_DST_COLOR,[dS]:o.ONE_MINUS_DST_ALPHA,[_S]:o.CONSTANT_COLOR,[vS]:o.ONE_MINUS_CONSTANT_COLOR,[yS]:o.CONSTANT_ALPHA,[xS]:o.ONE_MINUS_CONSTANT_ALPHA};function F(k,Rt,lt,_t,Ct,Dt,$t,je,un,be){if(k===Wa){R===!0&&(Gt(o.BLEND),R=!1);return}if(R===!1&&(yt(o.BLEND),R=!0),k!==iS){if(k!==S||be!==D){if((y!==Ms||L!==Ms)&&(o.blendEquation(o.FUNC_ADD),y=Ms,L=Ms),be)switch(k){case Cr:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case X_:o.blendFunc(o.ONE,o.ONE);break;case W_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case q_:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Cr:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case X_:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case W_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case q_:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}I=null,O=null,Q=null,G=null,P.set(0,0,0),W=0,S=k,D=be}return}Ct=Ct||Rt,Dt=Dt||lt,$t=$t||_t,(Rt!==y||Ct!==L)&&(o.blendEquationSeparate(de[Rt],de[Ct]),y=Rt,L=Ct),(lt!==I||_t!==O||Dt!==Q||$t!==G)&&(o.blendFuncSeparate(Ye[lt],Ye[_t],Ye[Dt],Ye[$t]),I=lt,O=_t,Q=Dt,G=$t),(je.equals(P)===!1||un!==W)&&(o.blendColor(je.r,je.g,je.b,un),P.copy(je),W=un),S=k,D=!1}function Cn(k,Rt){k.side===Ti?Gt(o.CULL_FACE):yt(o.CULL_FACE);let lt=k.side===Yn;Rt&&(lt=!lt),he(lt),k.blending===Cr&&k.transparent===!1?F(Wa):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),c.setMask(k.colorWrite);const _t=k.stencilWrite;d.setTest(_t),_t&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ue(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?yt(o.SAMPLE_ALPHA_TO_COVERAGE):Gt(o.SAMPLE_ALPHA_TO_COVERAGE)}function he(k){C!==k&&(k?o.frontFace(o.CW):o.frontFace(o.CCW),C=k)}function ve(k){k!==eS?(yt(o.CULL_FACE),k!==w&&(k===k_?o.cullFace(o.BACK):k===nS?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Gt(o.CULL_FACE),w=k}function qt(k){k!==j&&(z&&o.lineWidth(k),j=k)}function Ue(k,Rt,lt){k?(yt(o.POLYGON_OFFSET_FILL),(et!==Rt||mt!==lt)&&(o.polygonOffset(Rt,lt),et=Rt,mt=lt)):Gt(o.POLYGON_OFFSET_FILL)}function Wt(k){k?yt(o.SCISSOR_TEST):Gt(o.SCISSOR_TEST)}function U(k){k===void 0&&(k=o.TEXTURE0+gt-1),St!==k&&(o.activeTexture(k),St=k)}function T(k,Rt,lt){lt===void 0&&(St===null?lt=o.TEXTURE0+gt-1:lt=St);let _t=bt[lt];_t===void 0&&(_t={type:void 0,texture:void 0},bt[lt]=_t),(_t.type!==k||_t.texture!==Rt)&&(St!==lt&&(o.activeTexture(lt),St=lt),o.bindTexture(k,Rt||Et[k]),_t.type=k,_t.texture=Rt)}function it(){const k=bt[St];k!==void 0&&k.type!==void 0&&(o.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ft(){try{o.compressedTexImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function dt(){try{o.texSubImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{o.texSubImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function wt(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ye(){try{o.texStorage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{o.texStorage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{o.texImage2D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Yt(){try{o.texImage3D.apply(o,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xt(k){xt.equals(k)===!1&&(o.scissor(k.x,k.y,k.z,k.w),xt.copy(k))}function Nt(k){Z.equals(k)===!1&&(o.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function Jt(k,Rt){let lt=p.get(Rt);lt===void 0&&(lt=new WeakMap,p.set(Rt,lt));let _t=lt.get(k);_t===void 0&&(_t=o.getUniformBlockIndex(Rt,k.name),lt.set(k,_t))}function se(k,Rt){const _t=p.get(Rt).get(k);m.get(Rt)!==_t&&(o.uniformBlockBinding(Rt,_t,k.__bindingPointIndex),m.set(Rt,_t))}function Pe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),g={},St=null,bt={},v={},x=new WeakMap,M=[],b=null,R=!1,S=null,y=null,I=null,O=null,L=null,Q=null,G=null,P=new fe(0,0,0),W=0,D=!1,C=null,w=null,j=null,et=null,mt=null,xt.set(0,0,o.canvas.width,o.canvas.height),Z.set(0,0,o.canvas.width,o.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:yt,disable:Gt,bindFramebuffer:Ft,drawBuffers:ie,useProgram:Oe,setBlending:F,setMaterial:Cn,setFlipSided:he,setCullFace:ve,setLineWidth:qt,setPolygonOffset:Ue,setScissorTest:Wt,activeTexture:U,bindTexture:T,unbindTexture:it,compressedTexImage2D:ft,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Yt,updateUBOMapping:Jt,uniformBlockBinding:se,texStorage2D:ye,texStorage3D:At,texSubImage2D:dt,texSubImage3D:kt,compressedTexSubImage2D:wt,compressedTexSubImage3D:zt,scissor:Xt,viewport:Nt,reset:Pe}}function n1(o,t,i,s,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ae,g=new WeakMap;let v;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(U,T){return M?new OffscreenCanvas(U,T):Fc("canvas")}function R(U,T,it){let ft=1;const Mt=Wt(U);if((Mt.width>it||Mt.height>it)&&(ft=it/Math.max(Mt.width,Mt.height)),ft<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const dt=Math.floor(ft*Mt.width),kt=Math.floor(ft*Mt.height);v===void 0&&(v=b(dt,kt));const wt=T?b(dt,kt):v;return wt.width=dt,wt.height=kt,wt.getContext("2d").drawImage(U,0,0,dt,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+dt+"x"+kt+")."),wt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),U;return U}function S(U){return U.generateMipmaps}function y(U){o.generateMipmap(U)}function I(U){return U.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?o.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function O(U,T,it,ft,Mt=!1){if(U!==null){if(o[U]!==void 0)return o[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let dt=T;if(T===o.RED&&(it===o.FLOAT&&(dt=o.R32F),it===o.HALF_FLOAT&&(dt=o.R16F),it===o.UNSIGNED_BYTE&&(dt=o.R8)),T===o.RED_INTEGER&&(it===o.UNSIGNED_BYTE&&(dt=o.R8UI),it===o.UNSIGNED_SHORT&&(dt=o.R16UI),it===o.UNSIGNED_INT&&(dt=o.R32UI),it===o.BYTE&&(dt=o.R8I),it===o.SHORT&&(dt=o.R16I),it===o.INT&&(dt=o.R32I)),T===o.RG&&(it===o.FLOAT&&(dt=o.RG32F),it===o.HALF_FLOAT&&(dt=o.RG16F),it===o.UNSIGNED_BYTE&&(dt=o.RG8)),T===o.RG_INTEGER&&(it===o.UNSIGNED_BYTE&&(dt=o.RG8UI),it===o.UNSIGNED_SHORT&&(dt=o.RG16UI),it===o.UNSIGNED_INT&&(dt=o.RG32UI),it===o.BYTE&&(dt=o.RG8I),it===o.SHORT&&(dt=o.RG16I),it===o.INT&&(dt=o.RG32I)),T===o.RGB_INTEGER&&(it===o.UNSIGNED_BYTE&&(dt=o.RGB8UI),it===o.UNSIGNED_SHORT&&(dt=o.RGB16UI),it===o.UNSIGNED_INT&&(dt=o.RGB32UI),it===o.BYTE&&(dt=o.RGB8I),it===o.SHORT&&(dt=o.RGB16I),it===o.INT&&(dt=o.RGB32I)),T===o.RGBA_INTEGER&&(it===o.UNSIGNED_BYTE&&(dt=o.RGBA8UI),it===o.UNSIGNED_SHORT&&(dt=o.RGBA16UI),it===o.UNSIGNED_INT&&(dt=o.RGBA32UI),it===o.BYTE&&(dt=o.RGBA8I),it===o.SHORT&&(dt=o.RGBA16I),it===o.INT&&(dt=o.RGBA32I)),T===o.RGB&&it===o.UNSIGNED_INT_5_9_9_9_REV&&(dt=o.RGB9_E5),T===o.RGBA){const kt=Mt?Bc:we.getTransfer(ft);it===o.FLOAT&&(dt=o.RGBA32F),it===o.HALF_FLOAT&&(dt=o.RGBA16F),it===o.UNSIGNED_BYTE&&(dt=kt===Fe?o.SRGB8_ALPHA8:o.RGBA8),it===o.UNSIGNED_SHORT_4_4_4_4&&(dt=o.RGBA4),it===o.UNSIGNED_SHORT_5_5_5_1&&(dt=o.RGB5_A1)}return(dt===o.R16F||dt===o.R32F||dt===o.RG16F||dt===o.RG32F||dt===o.RGBA16F||dt===o.RGBA32F)&&t.get("EXT_color_buffer_float"),dt}function L(U,T){let it;return U?T===null||T===As||T===Or?it=o.DEPTH24_STENCIL8:T===ua?it=o.DEPTH32F_STENCIL8:T===Go&&(it=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===As||T===Or?it=o.DEPTH_COMPONENT24:T===ua?it=o.DEPTH_COMPONENT32F:T===Go&&(it=o.DEPTH_COMPONENT16),it}function Q(U,T){return S(U)===!0||U.isFramebufferTexture&&U.minFilter!==Ci&&U.minFilter!==Bi?Math.log2(Math.max(T.width,T.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?T.mipmaps.length:1}function G(U){const T=U.target;T.removeEventListener("dispose",G),W(T),T.isVideoTexture&&g.delete(T)}function P(U){const T=U.target;T.removeEventListener("dispose",P),C(T)}function W(U){const T=s.get(U);if(T.__webglInit===void 0)return;const it=U.source,ft=x.get(it);if(ft){const Mt=ft[T.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&D(U),Object.keys(ft).length===0&&x.delete(it)}s.remove(U)}function D(U){const T=s.get(U);o.deleteTexture(T.__webglTexture);const it=U.source,ft=x.get(it);delete ft[T.__cacheKey],h.memory.textures--}function C(U){const T=s.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),s.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(T.__webglFramebuffer[ft]))for(let Mt=0;Mt<T.__webglFramebuffer[ft].length;Mt++)o.deleteFramebuffer(T.__webglFramebuffer[ft][Mt]);else o.deleteFramebuffer(T.__webglFramebuffer[ft]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[ft])}else{if(Array.isArray(T.__webglFramebuffer))for(let ft=0;ft<T.__webglFramebuffer.length;ft++)o.deleteFramebuffer(T.__webglFramebuffer[ft]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ft=0;ft<T.__webglColorRenderbuffer.length;ft++)T.__webglColorRenderbuffer[ft]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[ft]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const it=U.textures;for(let ft=0,Mt=it.length;ft<Mt;ft++){const dt=s.get(it[ft]);dt.__webglTexture&&(o.deleteTexture(dt.__webglTexture),h.memory.textures--),s.remove(it[ft])}s.remove(U)}let w=0;function j(){w=0}function et(){const U=w;return U>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+l.maxTextures),w+=1,U}function mt(U){const T=[];return T.push(U.wrapS),T.push(U.wrapT),T.push(U.wrapR||0),T.push(U.magFilter),T.push(U.minFilter),T.push(U.anisotropy),T.push(U.internalFormat),T.push(U.format),T.push(U.type),T.push(U.generateMipmaps),T.push(U.premultiplyAlpha),T.push(U.flipY),T.push(U.unpackAlignment),T.push(U.colorSpace),T.join()}function gt(U,T){const it=s.get(U);if(U.isVideoTexture&&qt(U),U.isRenderTargetTexture===!1&&U.version>0&&it.__version!==U.version){const ft=U.image;if(ft===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(it,U,T);return}}i.bindTexture(o.TEXTURE_2D,it.__webglTexture,o.TEXTURE0+T)}function z(U,T){const it=s.get(U);if(U.version>0&&it.__version!==U.version){Z(it,U,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,it.__webglTexture,o.TEXTURE0+T)}function J(U,T){const it=s.get(U);if(U.version>0&&it.__version!==U.version){Z(it,U,T);return}i.bindTexture(o.TEXTURE_3D,it.__webglTexture,o.TEXTURE0+T)}function K(U,T){const it=s.get(U);if(U.version>0&&it.__version!==U.version){ct(it,U,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,it.__webglTexture,o.TEXTURE0+T)}const St={[od]:o.REPEAT,[bs]:o.CLAMP_TO_EDGE,[ld]:o.MIRRORED_REPEAT},bt={[Ci]:o.NEAREST,[DS]:o.NEAREST_MIPMAP_NEAREST,[ec]:o.NEAREST_MIPMAP_LINEAR,[Bi]:o.LINEAR,[lh]:o.LINEAR_MIPMAP_NEAREST,[Ts]:o.LINEAR_MIPMAP_LINEAR},N={[OS]:o.NEVER,[HS]:o.ALWAYS,[PS]:o.LESS,[pv]:o.LEQUAL,[zS]:o.EQUAL,[FS]:o.GEQUAL,[BS]:o.GREATER,[IS]:o.NOTEQUAL};function at(U,T){if(T.type===ua&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Bi||T.magFilter===lh||T.magFilter===ec||T.magFilter===Ts||T.minFilter===Bi||T.minFilter===lh||T.minFilter===ec||T.minFilter===Ts)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(U,o.TEXTURE_WRAP_S,St[T.wrapS]),o.texParameteri(U,o.TEXTURE_WRAP_T,St[T.wrapT]),(U===o.TEXTURE_3D||U===o.TEXTURE_2D_ARRAY)&&o.texParameteri(U,o.TEXTURE_WRAP_R,St[T.wrapR]),o.texParameteri(U,o.TEXTURE_MAG_FILTER,bt[T.magFilter]),o.texParameteri(U,o.TEXTURE_MIN_FILTER,bt[T.minFilter]),T.compareFunction&&(o.texParameteri(U,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(U,o.TEXTURE_COMPARE_FUNC,N[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ci||T.minFilter!==ec&&T.minFilter!==Ts||T.type===ua&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");o.texParameterf(U,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function xt(U,T){let it=!1;U.__webglInit===void 0&&(U.__webglInit=!0,T.addEventListener("dispose",G));const ft=T.source;let Mt=x.get(ft);Mt===void 0&&(Mt={},x.set(ft,Mt));const dt=mt(T);if(dt!==U.__cacheKey){Mt[dt]===void 0&&(Mt[dt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,it=!0),Mt[dt].usedTimes++;const kt=Mt[U.__cacheKey];kt!==void 0&&(Mt[U.__cacheKey].usedTimes--,kt.usedTimes===0&&D(T)),U.__cacheKey=dt,U.__webglTexture=Mt[dt].texture}return it}function Z(U,T,it){let ft=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ft=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ft=o.TEXTURE_3D);const Mt=xt(U,T),dt=T.source;i.bindTexture(ft,U.__webglTexture,o.TEXTURE0+it);const kt=s.get(dt);if(dt.version!==kt.__version||Mt===!0){i.activeTexture(o.TEXTURE0+it);const wt=we.getPrimaries(we.workingColorSpace),zt=T.colorSpace===Xa?null:we.getPrimaries(T.colorSpace),ye=T.colorSpace===Xa||wt===zt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let At=R(T.image,!1,l.maxTextureSize);At=Ue(T,At);const Bt=c.convert(T.format,T.colorSpace),Yt=c.convert(T.type);let Xt=O(T.internalFormat,Bt,Yt,T.colorSpace,T.isVideoTexture);at(ft,T);let Nt;const Jt=T.mipmaps,se=T.isVideoTexture!==!0,Pe=kt.__version===void 0||Mt===!0,k=dt.dataReady,Rt=Q(T,At);if(T.isDepthTexture)Xt=L(T.format===Pr,T.type),Pe&&(se?i.texStorage2D(o.TEXTURE_2D,1,Xt,At.width,At.height):i.texImage2D(o.TEXTURE_2D,0,Xt,At.width,At.height,0,Bt,Yt,null));else if(T.isDataTexture)if(Jt.length>0){se&&Pe&&i.texStorage2D(o.TEXTURE_2D,Rt,Xt,Jt[0].width,Jt[0].height);for(let lt=0,_t=Jt.length;lt<_t;lt++)Nt=Jt[lt],se?k&&i.texSubImage2D(o.TEXTURE_2D,lt,0,0,Nt.width,Nt.height,Bt,Yt,Nt.data):i.texImage2D(o.TEXTURE_2D,lt,Xt,Nt.width,Nt.height,0,Bt,Yt,Nt.data);T.generateMipmaps=!1}else se?(Pe&&i.texStorage2D(o.TEXTURE_2D,Rt,Xt,At.width,At.height),k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Yt,At.data)):i.texImage2D(o.TEXTURE_2D,0,Xt,At.width,At.height,0,Bt,Yt,At.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){se&&Pe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Rt,Xt,Jt[0].width,Jt[0].height,At.depth);for(let lt=0,_t=Jt.length;lt<_t;lt++)if(Nt=Jt[lt],T.format!==Ri)if(Bt!==null)if(se){if(k)if(T.layerUpdates.size>0){const Ct=M0(Nt.width,Nt.height,T.format,T.type);for(const Dt of T.layerUpdates){const $t=Nt.data.subarray(Dt*Ct/Nt.data.BYTES_PER_ELEMENT,(Dt+1)*Ct/Nt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,lt,0,0,Dt,Nt.width,Nt.height,1,Bt,$t)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,lt,0,0,0,Nt.width,Nt.height,At.depth,Bt,Nt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,lt,Xt,Nt.width,Nt.height,At.depth,0,Nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else se?k&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,lt,0,0,0,Nt.width,Nt.height,At.depth,Bt,Yt,Nt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,lt,Xt,Nt.width,Nt.height,At.depth,0,Bt,Yt,Nt.data)}else{se&&Pe&&i.texStorage2D(o.TEXTURE_2D,Rt,Xt,Jt[0].width,Jt[0].height);for(let lt=0,_t=Jt.length;lt<_t;lt++)Nt=Jt[lt],T.format!==Ri?Bt!==null?se?k&&i.compressedTexSubImage2D(o.TEXTURE_2D,lt,0,0,Nt.width,Nt.height,Bt,Nt.data):i.compressedTexImage2D(o.TEXTURE_2D,lt,Xt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?k&&i.texSubImage2D(o.TEXTURE_2D,lt,0,0,Nt.width,Nt.height,Bt,Yt,Nt.data):i.texImage2D(o.TEXTURE_2D,lt,Xt,Nt.width,Nt.height,0,Bt,Yt,Nt.data)}else if(T.isDataArrayTexture)if(se){if(Pe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Rt,Xt,At.width,At.height,At.depth),k)if(T.layerUpdates.size>0){const lt=M0(At.width,At.height,T.format,T.type);for(const _t of T.layerUpdates){const Ct=At.data.subarray(_t*lt/At.data.BYTES_PER_ELEMENT,(_t+1)*lt/At.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,_t,At.width,At.height,1,Bt,Yt,Ct)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Yt,At.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Xt,At.width,At.height,At.depth,0,Bt,Yt,At.data);else if(T.isData3DTexture)se?(Pe&&i.texStorage3D(o.TEXTURE_3D,Rt,Xt,At.width,At.height,At.depth),k&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Yt,At.data)):i.texImage3D(o.TEXTURE_3D,0,Xt,At.width,At.height,At.depth,0,Bt,Yt,At.data);else if(T.isFramebufferTexture){if(Pe)if(se)i.texStorage2D(o.TEXTURE_2D,Rt,Xt,At.width,At.height);else{let lt=At.width,_t=At.height;for(let Ct=0;Ct<Rt;Ct++)i.texImage2D(o.TEXTURE_2D,Ct,Xt,lt,_t,0,Bt,Yt,null),lt>>=1,_t>>=1}}else if(Jt.length>0){if(se&&Pe){const lt=Wt(Jt[0]);i.texStorage2D(o.TEXTURE_2D,Rt,Xt,lt.width,lt.height)}for(let lt=0,_t=Jt.length;lt<_t;lt++)Nt=Jt[lt],se?k&&i.texSubImage2D(o.TEXTURE_2D,lt,0,0,Bt,Yt,Nt):i.texImage2D(o.TEXTURE_2D,lt,Xt,Bt,Yt,Nt);T.generateMipmaps=!1}else if(se){if(Pe){const lt=Wt(At);i.texStorage2D(o.TEXTURE_2D,Rt,Xt,lt.width,lt.height)}k&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Bt,Yt,At)}else i.texImage2D(o.TEXTURE_2D,0,Xt,Bt,Yt,At);S(T)&&y(ft),kt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function ct(U,T,it){if(T.image.length!==6)return;const ft=xt(U,T),Mt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,U.__webglTexture,o.TEXTURE0+it);const dt=s.get(Mt);if(Mt.version!==dt.__version||ft===!0){i.activeTexture(o.TEXTURE0+it);const kt=we.getPrimaries(we.workingColorSpace),wt=T.colorSpace===Xa?null:we.getPrimaries(T.colorSpace),zt=T.colorSpace===Xa||kt===wt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const ye=T.isCompressedTexture||T.image[0].isCompressedTexture,At=T.image[0]&&T.image[0].isDataTexture,Bt=[];for(let _t=0;_t<6;_t++)!ye&&!At?Bt[_t]=R(T.image[_t],!0,l.maxCubemapSize):Bt[_t]=At?T.image[_t].image:T.image[_t],Bt[_t]=Ue(T,Bt[_t]);const Yt=Bt[0],Xt=c.convert(T.format,T.colorSpace),Nt=c.convert(T.type),Jt=O(T.internalFormat,Xt,Nt,T.colorSpace),se=T.isVideoTexture!==!0,Pe=dt.__version===void 0||ft===!0,k=Mt.dataReady;let Rt=Q(T,Yt);at(o.TEXTURE_CUBE_MAP,T);let lt;if(ye){se&&Pe&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Rt,Jt,Yt.width,Yt.height);for(let _t=0;_t<6;_t++){lt=Bt[_t].mipmaps;for(let Ct=0;Ct<lt.length;Ct++){const Dt=lt[Ct];T.format!==Ri?Xt!==null?se?k&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,0,0,Dt.width,Dt.height,Xt,Dt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,Jt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):se?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,0,0,Dt.width,Dt.height,Xt,Nt,Dt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,Jt,Dt.width,Dt.height,0,Xt,Nt,Dt.data)}}}else{if(lt=T.mipmaps,se&&Pe){lt.length>0&&Rt++;const _t=Wt(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Rt,Jt,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(At){se?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Bt[_t].width,Bt[_t].height,Xt,Nt,Bt[_t].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Jt,Bt[_t].width,Bt[_t].height,0,Xt,Nt,Bt[_t].data);for(let Ct=0;Ct<lt.length;Ct++){const $t=lt[Ct].image[_t].image;se?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,0,0,$t.width,$t.height,Xt,Nt,$t.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,Jt,$t.width,$t.height,0,Xt,Nt,$t.data)}}else{se?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Xt,Nt,Bt[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Jt,Xt,Nt,Bt[_t]);for(let Ct=0;Ct<lt.length;Ct++){const Dt=lt[Ct];se?k&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,0,0,Xt,Nt,Dt.image[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,Jt,Xt,Nt,Dt.image[_t])}}}S(T)&&y(o.TEXTURE_CUBE_MAP),dt.__version=Mt.version,T.onUpdate&&T.onUpdate(T)}U.__version=T.version}function Et(U,T,it,ft,Mt,dt){const kt=c.convert(it.format,it.colorSpace),wt=c.convert(it.type),zt=O(it.internalFormat,kt,wt,it.colorSpace),ye=s.get(T),At=s.get(it);if(At.__renderTarget=T,!ye.__hasExternalTextures){const Bt=Math.max(1,T.width>>dt),Yt=Math.max(1,T.height>>dt);Mt===o.TEXTURE_3D||Mt===o.TEXTURE_2D_ARRAY?i.texImage3D(Mt,dt,zt,Bt,Yt,T.depth,0,kt,wt,null):i.texImage2D(Mt,dt,zt,Bt,Yt,0,kt,wt,null)}i.bindFramebuffer(o.FRAMEBUFFER,U),ve(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ft,Mt,At.__webglTexture,0,he(T)):(Mt===o.TEXTURE_2D||Mt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ft,Mt,At.__webglTexture,dt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function yt(U,T,it){if(o.bindRenderbuffer(o.RENDERBUFFER,U),T.depthBuffer){const ft=T.depthTexture,Mt=ft&&ft.isDepthTexture?ft.type:null,dt=L(T.stencilBuffer,Mt),kt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,wt=he(T);ve(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,wt,dt,T.width,T.height):it?o.renderbufferStorageMultisample(o.RENDERBUFFER,wt,dt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,dt,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,kt,o.RENDERBUFFER,U)}else{const ft=T.textures;for(let Mt=0;Mt<ft.length;Mt++){const dt=ft[Mt],kt=c.convert(dt.format,dt.colorSpace),wt=c.convert(dt.type),zt=O(dt.internalFormat,kt,wt,dt.colorSpace),ye=he(T);it&&ve(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,ye,zt,T.width,T.height):ve(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ye,zt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,zt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Gt(U,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,U),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ft=s.get(T.depthTexture);ft.__renderTarget=T,(!ft.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),gt(T.depthTexture,0);const Mt=ft.__webglTexture,dt=he(T);if(T.depthTexture.format===wr)ve(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0);else if(T.depthTexture.format===Pr)ve(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Ft(U){const T=s.get(U),it=U.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==U.depthTexture){const ft=U.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ft){const Mt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ft.removeEventListener("dispose",Mt)};ft.addEventListener("dispose",Mt),T.__depthDisposeCallback=Mt}T.__boundDepthTexture=ft}if(U.depthTexture&&!T.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");Gt(T.__webglFramebuffer,U)}else if(it){T.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[ft]),T.__webglDepthbuffer[ft]===void 0)T.__webglDepthbuffer[ft]=o.createRenderbuffer(),yt(T.__webglDepthbuffer[ft],U,!1);else{const Mt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,dt=T.__webglDepthbuffer[ft];o.bindRenderbuffer(o.RENDERBUFFER,dt),o.framebufferRenderbuffer(o.FRAMEBUFFER,Mt,o.RENDERBUFFER,dt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),yt(T.__webglDepthbuffer,U,!1);else{const ft=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Mt=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Mt),o.framebufferRenderbuffer(o.FRAMEBUFFER,ft,o.RENDERBUFFER,Mt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function ie(U,T,it){const ft=s.get(U);T!==void 0&&Et(ft.__webglFramebuffer,U,U.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),it!==void 0&&Ft(U)}function Oe(U){const T=U.texture,it=s.get(U),ft=s.get(T);U.addEventListener("dispose",P);const Mt=U.textures,dt=U.isWebGLCubeRenderTarget===!0,kt=Mt.length>1;if(kt||(ft.__webglTexture===void 0&&(ft.__webglTexture=o.createTexture()),ft.__version=T.version,h.memory.textures++),dt){it.__webglFramebuffer=[];for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer[wt]=[];for(let zt=0;zt<T.mipmaps.length;zt++)it.__webglFramebuffer[wt][zt]=o.createFramebuffer()}else it.__webglFramebuffer[wt]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer=[];for(let wt=0;wt<T.mipmaps.length;wt++)it.__webglFramebuffer[wt]=o.createFramebuffer()}else it.__webglFramebuffer=o.createFramebuffer();if(kt)for(let wt=0,zt=Mt.length;wt<zt;wt++){const ye=s.get(Mt[wt]);ye.__webglTexture===void 0&&(ye.__webglTexture=o.createTexture(),h.memory.textures++)}if(U.samples>0&&ve(U)===!1){it.__webglMultisampledFramebuffer=o.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let wt=0;wt<Mt.length;wt++){const zt=Mt[wt];it.__webglColorRenderbuffer[wt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,it.__webglColorRenderbuffer[wt]);const ye=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=O(zt.internalFormat,ye,At,zt.colorSpace,U.isXRRenderTarget===!0),Yt=he(U);o.renderbufferStorageMultisample(o.RENDERBUFFER,Yt,Bt,U.width,U.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+wt,o.RENDERBUFFER,it.__webglColorRenderbuffer[wt])}o.bindRenderbuffer(o.RENDERBUFFER,null),U.depthBuffer&&(it.__webglDepthRenderbuffer=o.createRenderbuffer(),yt(it.__webglDepthRenderbuffer,U,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(dt){i.bindTexture(o.TEXTURE_CUBE_MAP,ft.__webglTexture),at(o.TEXTURE_CUBE_MAP,T);for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Et(it.__webglFramebuffer[wt][zt],U,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+wt,zt);else Et(it.__webglFramebuffer[wt],U,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0);S(T)&&y(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(kt){for(let wt=0,zt=Mt.length;wt<zt;wt++){const ye=Mt[wt],At=s.get(ye);i.bindTexture(o.TEXTURE_2D,At.__webglTexture),at(o.TEXTURE_2D,ye),Et(it.__webglFramebuffer,U,ye,o.COLOR_ATTACHMENT0+wt,o.TEXTURE_2D,0),S(ye)&&y(o.TEXTURE_2D)}i.unbindTexture()}else{let wt=o.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(wt=U.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(wt,ft.__webglTexture),at(wt,T),T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Et(it.__webglFramebuffer[zt],U,T,o.COLOR_ATTACHMENT0,wt,zt);else Et(it.__webglFramebuffer,U,T,o.COLOR_ATTACHMENT0,wt,0);S(T)&&y(wt),i.unbindTexture()}U.depthBuffer&&Ft(U)}function de(U){const T=U.textures;for(let it=0,ft=T.length;it<ft;it++){const Mt=T[it];if(S(Mt)){const dt=I(U),kt=s.get(Mt).__webglTexture;i.bindTexture(dt,kt),y(dt),i.unbindTexture()}}}const Ye=[],F=[];function Cn(U){if(U.samples>0){if(ve(U)===!1){const T=U.textures,it=U.width,ft=U.height;let Mt=o.COLOR_BUFFER_BIT;const dt=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,kt=s.get(U),wt=T.length>1;if(wt)for(let zt=0;zt<T.length;zt++)i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let zt=0;zt<T.length;zt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(Mt|=o.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(Mt|=o.STENCIL_BUFFER_BIT)),wt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const ye=s.get(T[zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ye,0)}o.blitFramebuffer(0,0,it,ft,0,0,it,ft,Mt,o.NEAREST),m===!0&&(Ye.length=0,F.length=0,Ye.push(o.COLOR_ATTACHMENT0+zt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Ye.push(dt),F.push(dt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,F)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Ye))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),wt)for(let zt=0;zt<T.length;zt++){i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const ye=s.get(T[zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,ye,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&m){const T=U.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function he(U){return Math.min(l.maxSamples,U.samples)}function ve(U){const T=s.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function qt(U){const T=h.render.frame;g.get(U)!==T&&(g.set(U,T),U.update())}function Ue(U,T){const it=U.colorSpace,ft=U.format,Mt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||it!==zr&&it!==Xa&&(we.getTransfer(it)===Fe?(ft!==Ri||Mt!==pa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),T}function Wt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(p.width=U.naturalWidth||U.width,p.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(p.width=U.displayWidth,p.height=U.displayHeight):(p.width=U.width,p.height=U.height),p}this.allocateTextureUnit=et,this.resetTextureUnits=j,this.setTexture2D=gt,this.setTexture2DArray=z,this.setTexture3D=J,this.setTextureCube=K,this.rebindTextures=ie,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=Cn,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ve}function i1(o,t){function i(s,l=Xa){let c;const h=we.getTransfer(l);if(s===pa)return o.UNSIGNED_BYTE;if(s===Vd)return o.UNSIGNED_SHORT_4_4_4_4;if(s===kd)return o.UNSIGNED_SHORT_5_5_5_1;if(s===sv)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===iv)return o.BYTE;if(s===av)return o.SHORT;if(s===Go)return o.UNSIGNED_SHORT;if(s===Gd)return o.INT;if(s===As)return o.UNSIGNED_INT;if(s===ua)return o.FLOAT;if(s===Vo)return o.HALF_FLOAT;if(s===rv)return o.ALPHA;if(s===ov)return o.RGB;if(s===Ri)return o.RGBA;if(s===lv)return o.LUMINANCE;if(s===cv)return o.LUMINANCE_ALPHA;if(s===wr)return o.DEPTH_COMPONENT;if(s===Pr)return o.DEPTH_STENCIL;if(s===uv)return o.RED;if(s===Xd)return o.RED_INTEGER;if(s===fv)return o.RG;if(s===Wd)return o.RG_INTEGER;if(s===qd)return o.RGBA_INTEGER;if(s===Dc||s===Uc||s===Lc||s===Nc)if(h===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Dc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Uc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Lc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Nc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Dc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Uc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Lc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Nc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===cd||s===ud||s===fd||s===hd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===cd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ud)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===fd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===hd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===dd||s===pd||s===md)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===dd||s===pd)return h===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===md)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===gd||s===_d||s===vd||s===yd||s===xd||s===Sd||s===Md||s===Ed||s===bd||s===Td||s===Ad||s===Rd||s===Cd||s===wd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===gd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===_d)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===vd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===yd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===xd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Sd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Md)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ed)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===bd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Td)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ad)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Rd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Cd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===wd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Oc||s===Dd||s===Ud)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Oc)return h===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Dd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ud)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===hv||s===Ld||s===Nd||s===Od)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Oc)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Ld)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Nd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Od)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Or?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const a1={type:"move"};class Fh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Sc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Sc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Sc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const R of t.hand.values()){const S=i.getJointPose(R,s),y=this._getHandJoint(p,R);S!==null&&(y.matrix.fromArray(S.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=S.radius),y.visible=S!==null}const g=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],x=g.position.distanceTo(v.position),M=.02,b=.005;p.inputState.pinching&&x>M+b?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&x<=M-b&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(a1)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new Sc;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const s1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r1=`
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

}`;class o1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new jn,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new ja({vertexShader:s1,fragmentShader:r1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new qn(new Xo(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class l1 extends Cs{constructor(t,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,g=null,v=null,x=null,M=null,b=null;const R=new o1,S=i.getContextAttributes();let y=null,I=null;const O=[],L=[],Q=new ae;let G=null;const P=new gi;P.viewport=new $e;const W=new gi;W.viewport=new $e;const D=[P,W],C=new TM;let w=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ct=O[Z];return ct===void 0&&(ct=new Fh,O[Z]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Z){let ct=O[Z];return ct===void 0&&(ct=new Fh,O[Z]=ct),ct.getGripSpace()},this.getHand=function(Z){let ct=O[Z];return ct===void 0&&(ct=new Fh,O[Z]=ct),ct.getHandSpace()};function et(Z){const ct=L.indexOf(Z.inputSource);if(ct===-1)return;const Et=O[ct];Et!==void 0&&(Et.update(Z.inputSource,Z.frame,p||h),Et.dispatchEvent({type:Z.type,data:Z.inputSource}))}function mt(){l.removeEventListener("select",et),l.removeEventListener("selectstart",et),l.removeEventListener("selectend",et),l.removeEventListener("squeeze",et),l.removeEventListener("squeezestart",et),l.removeEventListener("squeezeend",et),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",gt);for(let Z=0;Z<O.length;Z++){const ct=L[Z];ct!==null&&(L[Z]=null,O[Z].disconnect(ct))}w=null,j=null,R.reset(),t.setRenderTarget(y),M=null,x=null,v=null,l=null,I=null,xt.stop(),s.isPresenting=!1,t.setPixelRatio(G),t.setSize(Q.width,Q.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(Z){p=Z},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return v},this.getFrame=function(){return b},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(y=t.getRenderTarget(),l.addEventListener("select",et),l.addEventListener("selectstart",et),l.addEventListener("selectend",et),l.addEventListener("squeeze",et),l.addEventListener("squeezestart",et),l.addEventListener("squeezeend",et),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",gt),S.xrCompatible!==!0&&await i.makeXRCompatible(),G=t.getPixelRatio(),t.getSize(Q),l.renderState.layers===void 0){const ct={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,ct),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new Rs(M.framebufferWidth,M.framebufferHeight,{format:Ri,type:pa,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ct=null,Et=null,yt=null;S.depth&&(yt=S.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ct=S.stencil?Pr:wr,Et=S.stencil?Or:As);const Gt={colorFormat:i.RGBA8,depthFormat:yt,scaleFactor:c};v=new XRWebGLBinding(l,i),x=v.createProjectionLayer(Gt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),I=new Rs(x.textureWidth,x.textureHeight,{format:Ri,type:pa,depthTexture:new Av(x.textureWidth,x.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),xt.setContext(l),xt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return R.getDepthTexture()};function gt(Z){for(let ct=0;ct<Z.removed.length;ct++){const Et=Z.removed[ct],yt=L.indexOf(Et);yt>=0&&(L[yt]=null,O[yt].disconnect(Et))}for(let ct=0;ct<Z.added.length;ct++){const Et=Z.added[ct];let yt=L.indexOf(Et);if(yt===-1){for(let Ft=0;Ft<O.length;Ft++)if(Ft>=L.length){L.push(Et),yt=Ft;break}else if(L[Ft]===null){L[Ft]=Et,yt=Ft;break}if(yt===-1)break}const Gt=O[yt];Gt&&Gt.connect(Et)}}const z=new V,J=new V;function K(Z,ct,Et){z.setFromMatrixPosition(ct.matrixWorld),J.setFromMatrixPosition(Et.matrixWorld);const yt=z.distanceTo(J),Gt=ct.projectionMatrix.elements,Ft=Et.projectionMatrix.elements,ie=Gt[14]/(Gt[10]-1),Oe=Gt[14]/(Gt[10]+1),de=(Gt[9]+1)/Gt[5],Ye=(Gt[9]-1)/Gt[5],F=(Gt[8]-1)/Gt[0],Cn=(Ft[8]+1)/Ft[0],he=ie*F,ve=ie*Cn,qt=yt/(-F+Cn),Ue=qt*-F;if(ct.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ue),Z.translateZ(qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Gt[10]===-1)Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{const Wt=ie+qt,U=Oe+qt,T=he-Ue,it=ve+(yt-Ue),ft=de*Oe/U*Wt,Mt=Ye*Oe/U*Wt;Z.projectionMatrix.makePerspective(T,it,ft,Mt,Wt,U),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function St(Z,ct){ct===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ct.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let ct=Z.near,Et=Z.far;R.texture!==null&&(R.depthNear>0&&(ct=R.depthNear),R.depthFar>0&&(Et=R.depthFar)),C.near=W.near=P.near=ct,C.far=W.far=P.far=Et,(w!==C.near||j!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),w=C.near,j=C.far),P.layers.mask=Z.layers.mask|2,W.layers.mask=Z.layers.mask|4,C.layers.mask=P.layers.mask|W.layers.mask;const yt=Z.parent,Gt=C.cameras;St(C,yt);for(let Ft=0;Ft<Gt.length;Ft++)St(Gt[Ft],yt);Gt.length===2?K(C,P,W):C.projectionMatrix.copy(P.projectionMatrix),bt(Z,C,yt)};function bt(Z,ct,Et){Et===null?Z.matrix.copy(ct.matrixWorld):(Z.matrix.copy(Et.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ct.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Pd*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(x===null&&M===null))return m},this.setFoveation=function(Z){m=Z,x!==null&&(x.fixedFoveation=Z),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Z)},this.hasDepthSensing=function(){return R.texture!==null},this.getDepthSensingMesh=function(){return R.getMesh(C)};let N=null;function at(Z,ct){if(g=ct.getViewerPose(p||h),b=ct,g!==null){const Et=g.views;M!==null&&(t.setRenderTargetFramebuffer(I,M.framebuffer),t.setRenderTarget(I));let yt=!1;Et.length!==C.cameras.length&&(C.cameras.length=0,yt=!0);for(let Ft=0;Ft<Et.length;Ft++){const ie=Et[Ft];let Oe=null;if(M!==null)Oe=M.getViewport(ie);else{const Ye=v.getViewSubImage(x,ie);Oe=Ye.viewport,Ft===0&&(t.setRenderTargetTextures(I,Ye.colorTexture,x.ignoreDepthValues?void 0:Ye.depthStencilTexture),t.setRenderTarget(I))}let de=D[Ft];de===void 0&&(de=new gi,de.layers.enable(Ft),de.viewport=new $e,D[Ft]=de),de.matrix.fromArray(ie.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(ie.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),Ft===0&&(C.matrix.copy(de.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),yt===!0&&C.cameras.push(de)}const Gt=l.enabledFeatures;if(Gt&&Gt.includes("depth-sensing")){const Ft=v.getDepthInformation(Et[0]);Ft&&Ft.isValid&&Ft.texture&&R.init(t,Ft,l.renderState)}}for(let Et=0;Et<O.length;Et++){const yt=L[Et],Gt=O[Et];yt!==null&&Gt!==void 0&&Gt.update(yt,ct,p||h)}N&&N(Z,ct),ct.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ct}),b=null}const xt=new wv;xt.setAnimationLoop(at),this.setAnimationLoop=function(Z){N=Z},this.dispose=function(){}}}const xs=new Ii,c1=new ke;function u1(o,t){function i(S,y){S.matrixAutoUpdate===!0&&S.updateMatrix(),y.value.copy(S.matrix)}function s(S,y){y.color.getRGB(S.fogColor.value,Sv(o)),y.isFog?(S.fogNear.value=y.near,S.fogFar.value=y.far):y.isFogExp2&&(S.fogDensity.value=y.density)}function l(S,y,I,O,L){y.isMeshBasicMaterial||y.isMeshLambertMaterial?c(S,y):y.isMeshToonMaterial?(c(S,y),v(S,y)):y.isMeshPhongMaterial?(c(S,y),g(S,y)):y.isMeshStandardMaterial?(c(S,y),x(S,y),y.isMeshPhysicalMaterial&&M(S,y,L)):y.isMeshMatcapMaterial?(c(S,y),b(S,y)):y.isMeshDepthMaterial?c(S,y):y.isMeshDistanceMaterial?(c(S,y),R(S,y)):y.isMeshNormalMaterial?c(S,y):y.isLineBasicMaterial?(h(S,y),y.isLineDashedMaterial&&d(S,y)):y.isPointsMaterial?m(S,y,I,O):y.isSpriteMaterial?p(S,y):y.isShadowMaterial?(S.color.value.copy(y.color),S.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(S,y){S.opacity.value=y.opacity,y.color&&S.diffuse.value.copy(y.color),y.emissive&&S.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.bumpMap&&(S.bumpMap.value=y.bumpMap,i(y.bumpMap,S.bumpMapTransform),S.bumpScale.value=y.bumpScale,y.side===Yn&&(S.bumpScale.value*=-1)),y.normalMap&&(S.normalMap.value=y.normalMap,i(y.normalMap,S.normalMapTransform),S.normalScale.value.copy(y.normalScale),y.side===Yn&&S.normalScale.value.negate()),y.displacementMap&&(S.displacementMap.value=y.displacementMap,i(y.displacementMap,S.displacementMapTransform),S.displacementScale.value=y.displacementScale,S.displacementBias.value=y.displacementBias),y.emissiveMap&&(S.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,S.emissiveMapTransform)),y.specularMap&&(S.specularMap.value=y.specularMap,i(y.specularMap,S.specularMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest);const I=t.get(y),O=I.envMap,L=I.envMapRotation;O&&(S.envMap.value=O,xs.copy(L),xs.x*=-1,xs.y*=-1,xs.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),S.envMapRotation.value.setFromMatrix4(c1.makeRotationFromEuler(xs)),S.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=y.reflectivity,S.ior.value=y.ior,S.refractionRatio.value=y.refractionRatio),y.lightMap&&(S.lightMap.value=y.lightMap,S.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,S.lightMapTransform)),y.aoMap&&(S.aoMap.value=y.aoMap,S.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,S.aoMapTransform))}function h(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform))}function d(S,y){S.dashSize.value=y.dashSize,S.totalSize.value=y.dashSize+y.gapSize,S.scale.value=y.scale}function m(S,y,I,O){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.size.value=y.size*I,S.scale.value=O*.5,y.map&&(S.map.value=y.map,i(y.map,S.uvTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function p(S,y){S.diffuse.value.copy(y.color),S.opacity.value=y.opacity,S.rotation.value=y.rotation,y.map&&(S.map.value=y.map,i(y.map,S.mapTransform)),y.alphaMap&&(S.alphaMap.value=y.alphaMap,i(y.alphaMap,S.alphaMapTransform)),y.alphaTest>0&&(S.alphaTest.value=y.alphaTest)}function g(S,y){S.specular.value.copy(y.specular),S.shininess.value=Math.max(y.shininess,1e-4)}function v(S,y){y.gradientMap&&(S.gradientMap.value=y.gradientMap)}function x(S,y){S.metalness.value=y.metalness,y.metalnessMap&&(S.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,S.metalnessMapTransform)),S.roughness.value=y.roughness,y.roughnessMap&&(S.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,S.roughnessMapTransform)),y.envMap&&(S.envMapIntensity.value=y.envMapIntensity)}function M(S,y,I){S.ior.value=y.ior,y.sheen>0&&(S.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),S.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(S.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,S.sheenColorMapTransform)),y.sheenRoughnessMap&&(S.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,S.sheenRoughnessMapTransform))),y.clearcoat>0&&(S.clearcoat.value=y.clearcoat,S.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(S.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,S.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(S.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===Yn&&S.clearcoatNormalScale.value.negate())),y.dispersion>0&&(S.dispersion.value=y.dispersion),y.iridescence>0&&(S.iridescence.value=y.iridescence,S.iridescenceIOR.value=y.iridescenceIOR,S.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(S.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,S.iridescenceMapTransform)),y.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),y.transmission>0&&(S.transmission.value=y.transmission,S.transmissionSamplerMap.value=I.texture,S.transmissionSamplerSize.value.set(I.width,I.height),y.transmissionMap&&(S.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,S.transmissionMapTransform)),S.thickness.value=y.thickness,y.thicknessMap&&(S.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=y.attenuationDistance,S.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(S.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(S.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=y.specularIntensity,S.specularColor.value.copy(y.specularColor),y.specularColorMap&&(S.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,S.specularColorMapTransform)),y.specularIntensityMap&&(S.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,S.specularIntensityMapTransform))}function b(S,y){y.matcap&&(S.matcap.value=y.matcap)}function R(S,y){const I=t.get(y).light;S.referencePosition.value.setFromMatrixPosition(I.matrixWorld),S.nearDistance.value=I.shadow.camera.near,S.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function f1(o,t,i,s){let l={},c={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,O){const L=O.program;s.uniformBlockBinding(I,L)}function p(I,O){let L=l[I.id];L===void 0&&(b(I),L=g(I),l[I.id]=L,I.addEventListener("dispose",S));const Q=O.program;s.updateUBOMapping(I,Q);const G=t.render.frame;c[I.id]!==G&&(x(I),c[I.id]=G)}function g(I){const O=v();I.__bindingPointIndex=O;const L=o.createBuffer(),Q=I.__size,G=I.usage;return o.bindBuffer(o.UNIFORM_BUFFER,L),o.bufferData(o.UNIFORM_BUFFER,Q,G),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,O,L),L}function v(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const O=l[I.id],L=I.uniforms,Q=I.__cache;o.bindBuffer(o.UNIFORM_BUFFER,O);for(let G=0,P=L.length;G<P;G++){const W=Array.isArray(L[G])?L[G]:[L[G]];for(let D=0,C=W.length;D<C;D++){const w=W[D];if(M(w,G,D,Q)===!0){const j=w.__offset,et=Array.isArray(w.value)?w.value:[w.value];let mt=0;for(let gt=0;gt<et.length;gt++){const z=et[gt],J=R(z);typeof z=="number"||typeof z=="boolean"?(w.__data[0]=z,o.bufferSubData(o.UNIFORM_BUFFER,j+mt,w.__data)):z.isMatrix3?(w.__data[0]=z.elements[0],w.__data[1]=z.elements[1],w.__data[2]=z.elements[2],w.__data[3]=0,w.__data[4]=z.elements[3],w.__data[5]=z.elements[4],w.__data[6]=z.elements[5],w.__data[7]=0,w.__data[8]=z.elements[6],w.__data[9]=z.elements[7],w.__data[10]=z.elements[8],w.__data[11]=0):(z.toArray(w.__data,mt),mt+=J.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,j,w.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(I,O,L,Q){const G=I.value,P=O+"_"+L;if(Q[P]===void 0)return typeof G=="number"||typeof G=="boolean"?Q[P]=G:Q[P]=G.clone(),!0;{const W=Q[P];if(typeof G=="number"||typeof G=="boolean"){if(W!==G)return Q[P]=G,!0}else if(W.equals(G)===!1)return W.copy(G),!0}return!1}function b(I){const O=I.uniforms;let L=0;const Q=16;for(let P=0,W=O.length;P<W;P++){const D=Array.isArray(O[P])?O[P]:[O[P]];for(let C=0,w=D.length;C<w;C++){const j=D[C],et=Array.isArray(j.value)?j.value:[j.value];for(let mt=0,gt=et.length;mt<gt;mt++){const z=et[mt],J=R(z),K=L%Q,St=K%J.boundary,bt=K+St;L+=St,bt!==0&&Q-bt<J.storage&&(L+=Q-bt),j.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=L,L+=J.storage}}}const G=L%Q;return G>0&&(L+=Q-G),I.__size=L,I.__cache={},this}function R(I){const O={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(O.boundary=4,O.storage=4):I.isVector2?(O.boundary=8,O.storage=8):I.isVector3||I.isColor?(O.boundary=16,O.storage=12):I.isVector4?(O.boundary=16,O.storage=16):I.isMatrix3?(O.boundary=48,O.storage=48):I.isMatrix4?(O.boundary=64,O.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),O}function S(I){const O=I.target;O.removeEventListener("dispose",S);const L=h.indexOf(O.__bindingPointIndex);h.splice(L,1),o.deleteBuffer(l[O.id]),delete l[O.id],delete c[O.id]}function y(){for(const I in l)o.deleteBuffer(l[I]);h=[],l={},c={}}return{bind:m,update:p,dispose:y}}class h1{constructor(t={}){const{canvas:i=kS(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const b=new Uint32Array(4),R=new Int32Array(4);let S=null,y=null;const I=[],O=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=mi,this.toneMapping=qa,this.toneMappingExposure=1;const L=this;let Q=!1,G=0,P=0,W=null,D=-1,C=null;const w=new $e,j=new $e;let et=null;const mt=new fe(0);let gt=0,z=i.width,J=i.height,K=1,St=null,bt=null;const N=new $e(0,0,z,J),at=new $e(0,0,z,J);let xt=!1;const Z=new Zd;let ct=!1,Et=!1;const yt=new ke,Gt=new ke,Ft=new V,ie=new $e,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Ye(){return W===null?K:1}let F=s;function Cn(A,X){return i.getContext(A,X)}try{const A={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Hd}`),i.addEventListener("webglcontextlost",_t,!1),i.addEventListener("webglcontextrestored",Ct,!1),i.addEventListener("webglcontextcreationerror",Dt,!1),F===null){const X="webgl2";if(F=Cn(X,A),F===null)throw Cn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let he,ve,qt,Ue,Wt,U,T,it,ft,Mt,dt,kt,wt,zt,ye,At,Bt,Yt,Xt,Nt,Jt,se,Pe,k;function Rt(){he=new ST(F),he.init(),se=new i1(F,he),ve=new mT(F,he,t,se),qt=new e1(F,he),ve.reverseDepthBuffer&&x&&qt.buffers.depth.setReversed(!0),Ue=new bT(F),Wt=new VA,U=new n1(F,he,qt,Wt,ve,se,Ue),T=new _T(L),it=new xT(L),ft=new UM(F),Pe=new dT(F,ft),Mt=new MT(F,ft,Ue,Pe),dt=new AT(F,Mt,ft,Ue),Xt=new TT(F,ve,U),At=new gT(Wt),kt=new GA(L,T,it,he,ve,Pe,At),wt=new u1(L,Wt),zt=new XA,ye=new KA(he),Yt=new hT(L,T,it,qt,dt,M,m),Bt=new $A(L,dt,ve),k=new f1(F,Ue,ve,qt),Nt=new pT(F,he,Ue),Jt=new ET(F,he,Ue),Ue.programs=kt.programs,L.capabilities=ve,L.extensions=he,L.properties=Wt,L.renderLists=zt,L.shadowMap=Bt,L.state=qt,L.info=Ue}Rt();const lt=new l1(L,F);this.xr=lt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=he.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=he.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(z,J,!1))},this.getSize=function(A){return A.set(z,J)},this.setSize=function(A,X,st=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=A,J=X,i.width=Math.floor(A*K),i.height=Math.floor(X*K),st===!0&&(i.style.width=A+"px",i.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(z*K,J*K).floor()},this.setDrawingBufferSize=function(A,X,st){z=A,J=X,K=st,i.width=Math.floor(A*st),i.height=Math.floor(X*st),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy(N)},this.setViewport=function(A,X,st,rt){A.isVector4?N.set(A.x,A.y,A.z,A.w):N.set(A,X,st,rt),qt.viewport(w.copy(N).multiplyScalar(K).round())},this.getScissor=function(A){return A.copy(at)},this.setScissor=function(A,X,st,rt){A.isVector4?at.set(A.x,A.y,A.z,A.w):at.set(A,X,st,rt),qt.scissor(j.copy(at).multiplyScalar(K).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(A){qt.setScissorTest(xt=A)},this.setOpaqueSort=function(A){St=A},this.setTransparentSort=function(A){bt=A},this.getClearColor=function(A){return A.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(A=!0,X=!0,st=!0){let rt=0;if(A){let q=!1;if(W!==null){const vt=W.texture.format;q=vt===qd||vt===Wd||vt===Xd}if(q){const vt=W.texture.type,Ut=vt===pa||vt===As||vt===Go||vt===Or||vt===Vd||vt===kd,Pt=Yt.getClearColor(),Ot=Yt.getClearAlpha(),Kt=Pt.r,te=Pt.g,jt=Pt.b;Ut?(b[0]=Kt,b[1]=te,b[2]=jt,b[3]=Ot,F.clearBufferuiv(F.COLOR,0,b)):(R[0]=Kt,R[1]=te,R[2]=jt,R[3]=Ot,F.clearBufferiv(F.COLOR,0,R))}else rt|=F.COLOR_BUFFER_BIT}X&&(rt|=F.DEPTH_BUFFER_BIT),st&&(rt|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_t,!1),i.removeEventListener("webglcontextrestored",Ct,!1),i.removeEventListener("webglcontextcreationerror",Dt,!1),Yt.dispose(),zt.dispose(),ye.dispose(),Wt.dispose(),T.dispose(),it.dispose(),dt.dispose(),Pe.dispose(),k.dispose(),kt.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Hr),lt.removeEventListener("sessionend",Gr),wi.stop()};function _t(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Q=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),Q=!1;const A=Ue.autoReset,X=Bt.enabled,st=Bt.autoUpdate,rt=Bt.needsUpdate,q=Bt.type;Rt(),Ue.autoReset=A,Bt.enabled=X,Bt.autoUpdate=st,Bt.needsUpdate=rt,Bt.type=q}function Dt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function $t(A){const X=A.target;X.removeEventListener("dispose",$t),je(X)}function je(A){un(A),Wt.remove(A)}function un(A){const X=Wt.get(A).programs;X!==void 0&&(X.forEach(function(st){kt.releaseProgram(st)}),A.isShaderMaterial&&kt.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,st,rt,q,vt){X===null&&(X=Oe);const Ut=q.isMesh&&q.matrixWorld.determinant()<0,Pt=kr(A,X,st,rt,q);qt.setMaterial(rt,Ut);let Ot=st.index,Kt=1;if(rt.wireframe===!0){if(Ot=Mt.getWireframeAttribute(st),Ot===void 0)return;Kt=2}const te=st.drawRange,jt=st.attributes.position;let xe=te.start*Kt,Te=(te.start+te.count)*Kt;vt!==null&&(xe=Math.max(xe,vt.start*Kt),Te=Math.min(Te,(vt.start+vt.count)*Kt)),Ot!==null?(xe=Math.max(xe,0),Te=Math.min(Te,Ot.count)):jt!=null&&(xe=Math.max(xe,0),Te=Math.min(Te,jt.count));const Xe=Te-xe;if(Xe<0||Xe===1/0)return;Pe.setup(q,rt,Pt,st,Ot);let Ge,re=Nt;if(Ot!==null&&(Ge=ft.get(Ot),re=Jt,re.setIndex(Ge)),q.isMesh)rt.wireframe===!0?(qt.setLineWidth(rt.wireframeLinewidth*Ye()),re.setMode(F.LINES)):re.setMode(F.TRIANGLES);else if(q.isLine){let Ht=rt.linewidth;Ht===void 0&&(Ht=1),qt.setLineWidth(Ht*Ye()),q.isLineSegments?re.setMode(F.LINES):q.isLineLoop?re.setMode(F.LINE_LOOP):re.setMode(F.LINE_STRIP)}else q.isPoints?re.setMode(F.POINTS):q.isSprite&&re.setMode(F.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)re.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))re.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Ht=q._multiDrawStarts,an=q._multiDrawCounts,Ae=q._multiDrawCount,Nn=Ot?ft.get(Ot).bytesPerElement:1,Hi=Wt.get(rt).currentProgram.getUniforms();for(let gn=0;gn<Ae;gn++)Hi.setValue(F,"_gl_DrawID",gn),re.render(Ht[gn]/Nn,an[gn])}else if(q.isInstancedMesh)re.renderInstances(xe,Xe,q.count);else if(st.isInstancedBufferGeometry){const Ht=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,an=Math.min(st.instanceCount,Ht);re.renderInstances(xe,Xe,an)}else re.render(xe,Xe)};function be(A,X,st){A.transparent===!0&&A.side===Ti&&A.forceSinglePass===!1?(A.side=Yn,A.needsUpdate=!0,Ke(A,X,st),A.side=Ya,A.needsUpdate=!0,Ke(A,X,st),A.side=Ti):Ke(A,X,st)}this.compile=function(A,X,st=null){st===null&&(st=A),y=ye.get(st),y.init(X),O.push(y),st.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(y.pushLight(q),q.castShadow&&y.pushShadow(q))}),A!==st&&A.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(y.pushLight(q),q.castShadow&&y.pushShadow(q))}),y.setupLights();const rt=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const vt=q.material;if(vt)if(Array.isArray(vt))for(let Ut=0;Ut<vt.length;Ut++){const Pt=vt[Ut];be(Pt,st,q),rt.add(Pt)}else be(vt,st,q),rt.add(vt)}),O.pop(),y=null,rt},this.compileAsync=function(A,X,st=null){const rt=this.compile(A,X,st);return new Promise(q=>{function vt(){if(rt.forEach(function(Ut){Wt.get(Ut).currentProgram.isReady()&&rt.delete(Ut)}),rt.size===0){q(A);return}setTimeout(vt,10)}he.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let xn=null;function _i(A){xn&&xn(A)}function Hr(){wi.stop()}function Gr(){wi.start()}const wi=new wv;wi.setAnimationLoop(_i),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(A){xn=A,lt.setAnimationLoop(A),A===null?wi.stop():wi.start()},lt.addEventListener("sessionstart",Hr),lt.addEventListener("sessionend",Gr),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(X),X=lt.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,X,W),y=ye.get(A,O.length),y.init(X),O.push(y),Gt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Z.setFromProjectionMatrix(Gt),Et=this.localClippingEnabled,ct=At.init(this.clippingPlanes,Et),S=zt.get(A,I.length),S.init(),I.push(S),lt.enabled===!0&&lt.isPresenting===!0){const vt=L.xr.getDepthSensingMesh();vt!==null&&Za(vt,X,-1/0,L.sortObjects)}Za(A,X,0,L.sortObjects),S.finish(),L.sortObjects===!0&&S.sort(St,bt),de=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,de&&Yt.addToRenderList(S,A),this.info.render.frame++,ct===!0&&At.beginShadows();const st=y.state.shadowsArray;Bt.render(st,A,X),ct===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=S.opaque,q=S.transmissive;if(y.setupLights(),X.isArrayCamera){const vt=X.cameras;if(q.length>0)for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++){const Ot=vt[Ut];Vr(rt,q,A,Ot)}de&&Yt.render(A);for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++){const Ot=vt[Ut];Ds(S,A,Ot,Ot.viewport)}}else q.length>0&&Vr(rt,q,A,X),de&&Yt.render(A),Ds(S,A,X);W!==null&&(U.updateMultisampleRenderTarget(W),U.updateRenderTargetMipmap(W)),A.isScene===!0&&A.onAfterRender(L,A,X),Pe.resetDefaultState(),D=-1,C=null,O.pop(),O.length>0?(y=O[O.length-1],ct===!0&&At.setGlobalState(L.clippingPlanes,y.state.camera)):y=null,I.pop(),I.length>0?S=I[I.length-1]:S=null};function Za(A,X,st,rt){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)st=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)y.pushLight(A),A.castShadow&&y.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Z.intersectsSprite(A)){rt&&ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Gt);const Ut=dt.update(A),Pt=A.material;Pt.visible&&S.push(A,Ut,Pt,st,ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Z.intersectsObject(A))){const Ut=dt.update(A),Pt=A.material;if(rt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ie.copy(A.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ie.copy(Ut.boundingSphere.center)),ie.applyMatrix4(A.matrixWorld).applyMatrix4(Gt)),Array.isArray(Pt)){const Ot=Ut.groups;for(let Kt=0,te=Ot.length;Kt<te;Kt++){const jt=Ot[Kt],xe=Pt[jt.materialIndex];xe&&xe.visible&&S.push(A,Ut,xe,st,ie.z,jt)}}else Pt.visible&&S.push(A,Ut,Pt,st,ie.z,null)}}const vt=A.children;for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++)Za(vt[Ut],X,st,rt)}function Ds(A,X,st,rt){const q=A.opaque,vt=A.transmissive,Ut=A.transparent;y.setupLightsView(st),ct===!0&&At.setGlobalState(L.clippingPlanes,st),rt&&qt.viewport(w.copy(rt)),q.length>0&&Ka(q,X,st),vt.length>0&&Ka(vt,X,st),Ut.length>0&&Ka(Ut,X,st),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function Vr(A,X,st,rt){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[rt.id]===void 0&&(y.state.transmissionRenderTarget[rt.id]=new Rs(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Vo:pa,minFilter:Ts,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const vt=y.state.transmissionRenderTarget[rt.id],Ut=rt.viewport||w;vt.setSize(Ut.z,Ut.w);const Pt=L.getRenderTarget();L.setRenderTarget(vt),L.getClearColor(mt),gt=L.getClearAlpha(),gt<1&&L.setClearColor(16777215,.5),L.clear(),de&&Yt.render(st);const Ot=L.toneMapping;L.toneMapping=qa;const Kt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),y.setupLightsView(rt),ct===!0&&At.setGlobalState(L.clippingPlanes,rt),Ka(A,st,rt),U.updateMultisampleRenderTarget(vt),U.updateRenderTargetMipmap(vt),he.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let jt=0,xe=X.length;jt<xe;jt++){const Te=X[jt],Xe=Te.object,Ge=Te.geometry,re=Te.material,Ht=Te.group;if(re.side===Ti&&Xe.layers.test(rt.layers)){const an=re.side;re.side=Yn,re.needsUpdate=!0,vi(Xe,st,rt,Ge,re,Ht),re.side=an,re.needsUpdate=!0,te=!0}}te===!0&&(U.updateMultisampleRenderTarget(vt),U.updateRenderTargetMipmap(vt))}L.setRenderTarget(Pt),L.setClearColor(mt,gt),Kt!==void 0&&(rt.viewport=Kt),L.toneMapping=Ot}function Ka(A,X,st){const rt=X.isScene===!0?X.overrideMaterial:null;for(let q=0,vt=A.length;q<vt;q++){const Ut=A[q],Pt=Ut.object,Ot=Ut.geometry,Kt=rt===null?Ut.material:rt,te=Ut.group;Pt.layers.test(st.layers)&&vi(Pt,X,st,Ot,Kt,te)}}function vi(A,X,st,rt,q,vt){A.onBeforeRender(L,X,st,rt,q,vt),A.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(L,X,st,rt,A,vt),q.transparent===!0&&q.side===Ti&&q.forceSinglePass===!1?(q.side=Yn,q.needsUpdate=!0,L.renderBufferDirect(st,X,rt,q,A,vt),q.side=Ya,q.needsUpdate=!0,L.renderBufferDirect(st,X,rt,q,A,vt),q.side=Ti):L.renderBufferDirect(st,X,rt,q,A,vt),A.onAfterRender(L,X,st,rt,q,vt)}function Ke(A,X,st){X.isScene!==!0&&(X=Oe);const rt=Wt.get(A),q=y.state.lights,vt=y.state.shadowsArray,Ut=q.state.version,Pt=kt.getParameters(A,q.state,vt,X,st),Ot=kt.getProgramCacheKey(Pt);let Kt=rt.programs;rt.environment=A.isMeshStandardMaterial?X.environment:null,rt.fog=X.fog,rt.envMap=(A.isMeshStandardMaterial?it:T).get(A.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Kt===void 0&&(A.addEventListener("dispose",$t),Kt=new Map,rt.programs=Kt);let te=Kt.get(Ot);if(te!==void 0){if(rt.currentProgram===te&&rt.lightsStateVersion===Ut)return Fi(A,Pt),te}else Pt.uniforms=kt.getUniforms(A),A.onBeforeCompile(Pt,L),te=kt.acquireProgram(Pt,Ot),Kt.set(Ot,te),rt.uniforms=Pt.uniforms;const jt=rt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(jt.clippingPlanes=At.uniform),Fi(A,Pt),rt.needsLights=Kc(A),rt.lightsStateVersion=Ut,rt.needsLights&&(jt.ambientLightColor.value=q.state.ambient,jt.lightProbe.value=q.state.probe,jt.directionalLights.value=q.state.directional,jt.directionalLightShadows.value=q.state.directionalShadow,jt.spotLights.value=q.state.spot,jt.spotLightShadows.value=q.state.spotShadow,jt.rectAreaLights.value=q.state.rectArea,jt.ltc_1.value=q.state.rectAreaLTC1,jt.ltc_2.value=q.state.rectAreaLTC2,jt.pointLights.value=q.state.point,jt.pointLightShadows.value=q.state.pointShadow,jt.hemisphereLights.value=q.state.hemi,jt.directionalShadowMap.value=q.state.directionalShadowMap,jt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,jt.spotShadowMap.value=q.state.spotShadowMap,jt.spotLightMatrix.value=q.state.spotLightMatrix,jt.spotLightMap.value=q.state.spotLightMap,jt.pointShadowMap.value=q.state.pointShadowMap,jt.pointShadowMatrix.value=q.state.pointShadowMatrix),rt.currentProgram=te,rt.uniformsList=null,te}function Sn(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=zc.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function Fi(A,X){const st=Wt.get(A);st.outputColorSpace=X.outputColorSpace,st.batching=X.batching,st.batchingColor=X.batchingColor,st.instancing=X.instancing,st.instancingColor=X.instancingColor,st.instancingMorph=X.instancingMorph,st.skinning=X.skinning,st.morphTargets=X.morphTargets,st.morphNormals=X.morphNormals,st.morphColors=X.morphColors,st.morphTargetsCount=X.morphTargetsCount,st.numClippingPlanes=X.numClippingPlanes,st.numIntersection=X.numClipIntersection,st.vertexAlphas=X.vertexAlphas,st.vertexTangents=X.vertexTangents,st.toneMapping=X.toneMapping}function kr(A,X,st,rt,q){X.isScene!==!0&&(X=Oe),U.resetTextureUnits();const vt=X.fog,Ut=rt.isMeshStandardMaterial?X.environment:null,Pt=W===null?L.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:zr,Ot=(rt.isMeshStandardMaterial?it:T).get(rt.envMap||Ut),Kt=rt.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,te=!!st.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),jt=!!st.morphAttributes.position,xe=!!st.morphAttributes.normal,Te=!!st.morphAttributes.color;let Xe=qa;rt.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(Xe=L.toneMapping);const Ge=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,re=Ge!==void 0?Ge.length:0,Ht=Wt.get(rt),an=y.state.lights;if(ct===!0&&(Et===!0||A!==C)){const fn=A===C&&rt.id===D;At.setState(rt,A,fn)}let Ae=!1;rt.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==an.state.version||Ht.outputColorSpace!==Pt||q.isBatchedMesh&&Ht.batching===!1||!q.isBatchedMesh&&Ht.batching===!0||q.isBatchedMesh&&Ht.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Ht.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Ht.instancing===!1||!q.isInstancedMesh&&Ht.instancing===!0||q.isSkinnedMesh&&Ht.skinning===!1||!q.isSkinnedMesh&&Ht.skinning===!0||q.isInstancedMesh&&Ht.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ht.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ht.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ht.instancingMorph===!1&&q.morphTexture!==null||Ht.envMap!==Ot||rt.fog===!0&&Ht.fog!==vt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==At.numPlanes||Ht.numIntersection!==At.numIntersection)||Ht.vertexAlphas!==Kt||Ht.vertexTangents!==te||Ht.morphTargets!==jt||Ht.morphNormals!==xe||Ht.morphColors!==Te||Ht.toneMapping!==Xe||Ht.morphTargetsCount!==re)&&(Ae=!0):(Ae=!0,Ht.__version=rt.version);let Nn=Ht.currentProgram;Ae===!0&&(Nn=Ke(rt,X,q));let Hi=!1,gn=!1,Ja=!1;const pe=Nn.getUniforms(),wn=Ht.uniforms;if(qt.useProgram(Nn.program)&&(Hi=!0,gn=!0,Ja=!0),rt.id!==D&&(D=rt.id,gn=!0),Hi||C!==A){qt.buffers.depth.getReversed()?(yt.copy(A.projectionMatrix),WS(yt),qS(yt),pe.setValue(F,"projectionMatrix",yt)):pe.setValue(F,"projectionMatrix",A.projectionMatrix),pe.setValue(F,"viewMatrix",A.matrixWorldInverse);const tn=pe.map.cameraPosition;tn!==void 0&&tn.setValue(F,Ft.setFromMatrixPosition(A.matrixWorld)),ve.logarithmicDepthBuffer&&pe.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&pe.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),C!==A&&(C=A,gn=!0,Ja=!0)}if(q.isSkinnedMesh){pe.setOptional(F,q,"bindMatrix"),pe.setOptional(F,q,"bindMatrixInverse");const fn=q.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),pe.setValue(F,"boneTexture",fn.boneTexture,U))}q.isBatchedMesh&&(pe.setOptional(F,q,"batchingTexture"),pe.setValue(F,"batchingTexture",q._matricesTexture,U),pe.setOptional(F,q,"batchingIdTexture"),pe.setValue(F,"batchingIdTexture",q._indirectTexture,U),pe.setOptional(F,q,"batchingColorTexture"),q._colorsTexture!==null&&pe.setValue(F,"batchingColorTexture",q._colorsTexture,U));const On=st.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&Xt.update(q,st,Nn),(gn||Ht.receiveShadow!==q.receiveShadow)&&(Ht.receiveShadow=q.receiveShadow,pe.setValue(F,"receiveShadow",q.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(wn.envMap.value=Ot,wn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&X.environment!==null&&(wn.envMapIntensity.value=X.environmentIntensity),gn&&(pe.setValue(F,"toneMappingExposure",L.toneMappingExposure),Ht.needsLights&&Zc(wn,Ja),vt&&rt.fog===!0&&wt.refreshFogUniforms(wn,vt),wt.refreshMaterialUniforms(wn,rt,K,J,y.state.transmissionRenderTarget[A.id]),zc.upload(F,Sn(Ht),wn,U)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(zc.upload(F,Sn(Ht),wn,U),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&pe.setValue(F,"center",q.center),pe.setValue(F,"modelViewMatrix",q.modelViewMatrix),pe.setValue(F,"normalMatrix",q.normalMatrix),pe.setValue(F,"modelMatrix",q.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const fn=rt.uniformsGroups;for(let tn=0,Us=fn.length;tn<Us;tn++){const Di=fn[tn];k.update(Di,Nn),k.bind(Di,Nn)}}return Nn}function Zc(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Kc(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(A,X,st){Wt.get(A.texture).__webglTexture=X,Wt.get(A.depthTexture).__webglTexture=st;const rt=Wt.get(A);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=st===void 0,rt.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){const st=Wt.get(A);st.__webglFramebuffer=X,st.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,st=0){W=A,G=X,P=st;let rt=!0,q=null,vt=!1,Ut=!1;if(A){const Ot=Wt.get(A);if(Ot.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(F.FRAMEBUFFER,null),rt=!1;else if(Ot.__webglFramebuffer===void 0)U.setupRenderTarget(A);else if(Ot.__hasExternalTextures)U.rebindTextures(A,Wt.get(A.texture).__webglTexture,Wt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const jt=A.depthTexture;if(Ot.__boundDepthTexture!==jt){if(jt!==null&&Wt.has(jt)&&(A.width!==jt.image.width||A.height!==jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(A)}}const Kt=A.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Ut=!0);const te=Wt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(te[X])?q=te[X][st]:q=te[X],vt=!0):A.samples>0&&U.useMultisampledRTT(A)===!1?q=Wt.get(A).__webglMultisampledFramebuffer:Array.isArray(te)?q=te[st]:q=te,w.copy(A.viewport),j.copy(A.scissor),et=A.scissorTest}else w.copy(N).multiplyScalar(K).floor(),j.copy(at).multiplyScalar(K).floor(),et=xt;if(qt.bindFramebuffer(F.FRAMEBUFFER,q)&&rt&&qt.drawBuffers(A,q),qt.viewport(w),qt.scissor(j),qt.setScissorTest(et),vt){const Ot=Wt.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ot.__webglTexture,st)}else if(Ut){const Ot=Wt.get(A.texture),Kt=X||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.__webglTexture,st||0,Kt)}D=-1},this.readRenderTargetPixels=function(A,X,st,rt,q,vt,Ut){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){qt.bindFramebuffer(F.FRAMEBUFFER,Pt);try{const Ot=A.texture,Kt=Ot.format,te=Ot.type;if(!ve.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ve.textureTypeReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-rt&&st>=0&&st<=A.height-q&&F.readPixels(X,st,rt,q,se.convert(Kt),se.convert(te),vt)}finally{const Ot=W!==null?Wt.get(W).__webglFramebuffer:null;qt.bindFramebuffer(F.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,X,st,rt,q,vt,Ut){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){const Ot=A.texture,Kt=Ot.format,te=Ot.type;if(!ve.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ve.textureTypeReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-rt&&st>=0&&st<=A.height-q){qt.bindFramebuffer(F.FRAMEBUFFER,Pt);const jt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.bufferData(F.PIXEL_PACK_BUFFER,vt.byteLength,F.STREAM_READ),F.readPixels(X,st,rt,q,se.convert(Kt),se.convert(te),0);const xe=W!==null?Wt.get(W).__webglFramebuffer:null;qt.bindFramebuffer(F.FRAMEBUFFER,xe);const Te=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await XS(F,Te,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,vt),F.deleteBuffer(jt),F.deleteSync(Te),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,st=0){A.isTexture!==!0&&(br("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);const rt=Math.pow(2,-st),q=Math.floor(A.image.width*rt),vt=Math.floor(A.image.height*rt),Ut=X!==null?X.x:0,Pt=X!==null?X.y:0;U.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,st,0,0,Ut,Pt,q,vt),qt.unbindTexture()};const Wo=F.createFramebuffer(),Qa=F.createFramebuffer();this.copyTextureToTexture=function(A,X,st=null,rt=null,q=0,vt=null){A.isTexture!==!0&&(br("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,A=arguments[1],X=arguments[2],vt=arguments[3]||0,st=null),vt===null&&(q!==0?(br("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=q,q=0):vt=0);let Ut,Pt,Ot,Kt,te,jt,xe,Te,Xe;const Ge=A.isCompressedTexture?A.mipmaps[vt]:A.image;if(st!==null)Ut=st.max.x-st.min.x,Pt=st.max.y-st.min.y,Ot=st.isBox3?st.max.z-st.min.z:1,Kt=st.min.x,te=st.min.y,jt=st.isBox3?st.min.z:0;else{const On=Math.pow(2,-q);Ut=Math.floor(Ge.width*On),Pt=Math.floor(Ge.height*On),A.isDataArrayTexture?Ot=Ge.depth:A.isData3DTexture?Ot=Math.floor(Ge.depth*On):Ot=1,Kt=0,te=0,jt=0}rt!==null?(xe=rt.x,Te=rt.y,Xe=rt.z):(xe=0,Te=0,Xe=0);const re=se.convert(X.format),Ht=se.convert(X.type);let an;X.isData3DTexture?(U.setTexture3D(X,0),an=F.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(U.setTexture2DArray(X,0),an=F.TEXTURE_2D_ARRAY):(U.setTexture2D(X,0),an=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,X.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,X.unpackAlignment);const Ae=F.getParameter(F.UNPACK_ROW_LENGTH),Nn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Hi=F.getParameter(F.UNPACK_SKIP_PIXELS),gn=F.getParameter(F.UNPACK_SKIP_ROWS),Ja=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ge.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ge.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Kt),F.pixelStorei(F.UNPACK_SKIP_ROWS,te),F.pixelStorei(F.UNPACK_SKIP_IMAGES,jt);const pe=A.isDataArrayTexture||A.isData3DTexture,wn=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const On=Wt.get(A),fn=Wt.get(X),tn=Wt.get(On.__renderTarget),Us=Wt.get(fn.__renderTarget);qt.bindFramebuffer(F.READ_FRAMEBUFFER,tn.__webglFramebuffer),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Us.__webglFramebuffer);for(let Di=0;Di<Ot;Di++)pe&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wt.get(A).__webglTexture,q,jt+Di),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wt.get(X).__webglTexture,vt,Xe+Di)),F.blitFramebuffer(Kt,te,Ut,Pt,xe,Te,Ut,Pt,F.DEPTH_BUFFER_BIT,F.NEAREST);qt.bindFramebuffer(F.READ_FRAMEBUFFER,null),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(q!==0||A.isRenderTargetTexture||Wt.has(A)){const On=Wt.get(A),fn=Wt.get(X);qt.bindFramebuffer(F.READ_FRAMEBUFFER,Wo),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Qa);for(let tn=0;tn<Ot;tn++)pe?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,On.__webglTexture,q,jt+tn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,On.__webglTexture,q),wn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,fn.__webglTexture,vt,Xe+tn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,fn.__webglTexture,vt),q!==0?F.blitFramebuffer(Kt,te,Ut,Pt,xe,Te,Ut,Pt,F.COLOR_BUFFER_BIT,F.NEAREST):wn?F.copyTexSubImage3D(an,vt,xe,Te,Xe+tn,Kt,te,Ut,Pt):F.copyTexSubImage2D(an,vt,xe,Te,Kt,te,Ut,Pt);qt.bindFramebuffer(F.READ_FRAMEBUFFER,null),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else wn?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(an,vt,xe,Te,Xe,Ut,Pt,Ot,re,Ht,Ge.data):X.isCompressedArrayTexture?F.compressedTexSubImage3D(an,vt,xe,Te,Xe,Ut,Pt,Ot,re,Ge.data):F.texSubImage3D(an,vt,xe,Te,Xe,Ut,Pt,Ot,re,Ht,Ge):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,vt,xe,Te,Ut,Pt,re,Ht,Ge.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,vt,xe,Te,Ge.width,Ge.height,re,Ge.data):F.texSubImage2D(F.TEXTURE_2D,vt,xe,Te,Ut,Pt,re,Ht,Ge);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ae),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Nn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Hi),F.pixelStorei(F.UNPACK_SKIP_ROWS,gn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ja),vt===0&&X.generateMipmaps&&F.generateMipmap(an),qt.unbindTexture()},this.copyTextureToTexture3D=function(A,X,st=null,rt=null,q=0){return A.isTexture!==!0&&(br("WebGLRenderer: copyTextureToTexture3D function signature has changed."),st=arguments[0]||null,rt=arguments[1]||null,A=arguments[2],X=arguments[3],q=arguments[4]||0),br('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,st,rt,q)},this.initRenderTarget=function(A){Wt.get(A).__webglFramebuffer===void 0&&U.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?U.setTextureCube(A,0):A.isData3DTexture?U.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?U.setTexture2DArray(A,0):U.setTexture2D(A,0),qt.unbindTexture()},this.resetState=function(){G=0,P=0,W=null,qt.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=we._getDrawingBufferColorSpace(t),i.unpackColorSpace=we._getUnpackColorSpace()}}const Y0={type:"change"},Jd={type:"start"},Ov={type:"end"},Ac=new qc,j0=new Pi,d1=Math.cos(70*VS.DEG2RAD),dn=new V,Wn=2*Math.PI,He={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hh=1e-6;class p1 extends wM{constructor(t,i=null){super(t,i),this.state=He.NONE,this.enabled=!0,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rr.ROTATE,MIDDLE:Rr.DOLLY,RIGHT:Rr.PAN},this.touches={ONE:Tr.ROTATE,TWO:Tr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Rn,this._lastTargetPosition=new V,this._quat=new Rn().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new S0,this._sphericalDelta=new S0,this._scale=1,this._panOffset=new V,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new V,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=g1.bind(this),this._onPointerDown=m1.bind(this),this._onPointerUp=_1.bind(this),this._onContextMenu=b1.bind(this),this._onMouseWheel=x1.bind(this),this._onKeyDown=S1.bind(this),this._onTouchStart=M1.bind(this),this._onTouchMove=E1.bind(this),this._onMouseDown=v1.bind(this),this._onMouseMove=y1.bind(this),this._interceptControlDown=T1.bind(this),this._interceptControlUp=A1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Y0),this.update(),this.state=He.NONE}update(t=null){const i=this.object.position;dn.copy(i).sub(this.target),dn.applyQuaternion(this._quat),this._spherical.setFromVector3(dn),this.autoRotate&&this.state===He.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Wn:s>Math.PI&&(s-=Wn),l<-Math.PI?l+=Wn:l>Math.PI&&(l-=Wn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(dn.setFromSpherical(this._spherical),dn.applyQuaternion(this._quatInverse),i.copy(this.target).add(dn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=dn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new V(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new V(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=dn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Ac.origin.copy(this.object.position),Ac.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ac.direction))<d1?this.object.lookAt(this.target):(j0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ac.intersectPlane(j0,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Hh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hh||this._lastTargetPosition.distanceToSquared(this.target)>Hh?(this.dispatchEvent(Y0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Wn/60*this.autoRotateSpeed*t:Wn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){dn.setFromMatrixColumn(i,0),dn.multiplyScalar(-t),this._panOffset.add(dn)}_panUp(t,i){this.screenSpacePanning===!0?dn.setFromMatrixColumn(i,1):(dn.setFromMatrixColumn(i,0),dn.crossVectors(this.object.up,dn)),dn.multiplyScalar(t),this._panOffset.add(dn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;dn.copy(l).sub(this.target);let c=dn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Wn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Wn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Wn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Wn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Wn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Wn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Wn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Wn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ae,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function m1(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function g1(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function _1(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ov),this.state=He.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function v1(o){let t;switch(o.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=He.DOLLY;break;case Rr.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=He.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=He.ROTATE}break;case Rr.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=He.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=He.PAN}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(Jd)}function y1(o){switch(this.state){case He.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case He.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case He.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function x1(o){this.enabled===!1||this.enableZoom===!1||this.state!==He.NONE||(o.preventDefault(),this.dispatchEvent(Jd),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Ov))}function S1(o){this.enabled!==!1&&this._handleKeyDown(o)}function M1(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case Tr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=He.TOUCH_ROTATE;break;case Tr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=He.TOUCH_PAN;break;default:this.state=He.NONE}break;case 2:switch(this.touches.TWO){case Tr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=He.TOUCH_DOLLY_PAN;break;case Tr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=He.TOUCH_DOLLY_ROTATE;break;default:this.state=He.NONE}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(Jd)}function E1(o){switch(this._trackPointer(o),this.state){case He.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case He.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case He.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case He.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=He.NONE}}function b1(o){this.enabled!==!1&&o.preventDefault()}function T1(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function A1(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Pv="/vex-build-center/";async function R1(){const o=await fetch(`${Pv}parts/manifest.json`,{cache:"force-cache"});if(!o.ok)throw new Error("Could not load the parts library.");return o.json()}function Gh(o){const t=atob(o),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}const Z0=new Map;function Rc(o){const t=Z0.get(o.id);if(t)return t;const i=(async()=>{if(o.primitive==="box"){const[c,h,d]=o.sizeMM,m=new Ir(c,h,d);return m.computeBoundingBox(),m}const s=await(await fetch(`${Pv}parts/${o.id}.json`,{cache:"force-cache"})).json(),l=new si;return l.setAttribute("position",new Bn(new Float32Array(Gh(s.position).buffer),3)),s.normal&&l.setAttribute("normal",new Bn(new Float32Array(Gh(s.normal).buffer),3)),l.setIndex(new Bn(new Uint32Array(Gh(s.index).buffer),1)),s.normal||l.computeVertexNormals(),l.computeBoundingBox(),l})();return Z0.set(o.id,i),i}const Vh={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"},C1={beam:"Beams",plate:"Plates",pin:"Pins",standoff:"Standoffs",corner:"Corners",gear:"Gears",wheel:"Wheels",shaft:"Shafts",spacer:"Spacers",motor:"Motors",brain:"Brain & Battery",sensor:"Sensors"},w1=["beam","plate","corner","pin","standoff","gear","wheel","shaft","spacer","motor","sensor","brain"],zv=12.7,Id=[[1,0,0],[0,1,0],[0,0,1]],D1=["beam","plate","standoff","corner","gear","wheel"];function U1(o){return o.holes&&o.holes.length>0||D1.includes(o.category)}function L1(o,t){const i=t.findIndex(c=>c!==0),s=[0,1,2].filter(c=>c!==i),l=o.sizeMM[s[0]]>=o.sizeMM[s[1]]?s[0]:s[1];return Id[l]}const kh=o=>Math.max(1,Math.round(o/zv)),Xh=(o,t)=>(o-(t-1)/2)*zv;function N1(o){if(o.holes&&o.holes.length)return o.holes.map(m=>({p:m.p,axis:m.axis,tan:L1(o,m.axis)}));const t=o.sizeMM,i=[0,1,2].sort((m,p)=>t[m]-t[p]),s=i[0],l=i[1],c=i[2],h=[],d=(m,p,g)=>{const v=t[p]/2,x=Id[p],M=Id[g],b=[...m];b[p]+=v;const R=[...m];R[p]-=v,h.push({p:b,axis:x,tan:M}),h.push({p:R,axis:[-x[0],-x[1],-x[2]],tan:M})};if(o.category==="beam"){const m=kh(t[c]);for(let p=0;p<m;p++)d([0,0,0].map((g,v)=>v===c?Xh(p,m):0),s,c)}else if(o.category==="plate"||o.category==="corner"){const m=kh(t[c]),p=kh(t[l]);for(let g=0;g<m;g++)for(let v=0;v<p;v++){const x=[0,0,0];x[c]=Xh(g,m),x[l]=Xh(v,p),d(x,s,c)}}else o.category==="standoff"?d([0,0,0],c,l):(o.category==="gear"||o.category==="wheel")&&d([0,0,0],s,c);return h}const Bv=12.7,kc=Bv/2,Cc=1,wc=o=>Math.round(o/kc)*kc,Wh=new Set(["pin","shaft"]),K0=o=>o.startsWith("pin-connector-0x")||o.startsWith("pin-sheet");let qh=1;class O1{constructor(t){ee(this,"scene",new mM);ee(this,"camera");ee(this,"renderer");ee(this,"controls");ee(this,"onChange",()=>{});ee(this,"onConnect",()=>{});ee(this,"onPartMenu",()=>{});ee(this,"onArmChange",()=>{});ee(this,"occupied",new Set);ee(this,"headAxisCache",new Map);ee(this,"disabledPins",new Set);ee(this,"pinLinks",new Map);ee(this,"adj",new Map);ee(this,"dragGroup",[]);ee(this,"dragGrabStart",new V);ee(this,"container");ee(this,"raycaster",new AM);ee(this,"pointer",new ae);ee(this,"parts",new Map);ee(this,"selected",null);ee(this,"helper",null);ee(this,"markers",[]);ee(this,"discGeo",new Kd(2.6,20));ee(this,"markerMat",new Hc({color:1614079,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:Ti}));ee(this,"markerHotMat",new Hc({color:16756768,transparent:!0,opacity:.95,depthTest:!0,depthWrite:!1,side:Ti}));ee(this,"hovered",null);ee(this,"markersVisible",!0);ee(this,"armed",null);ee(this,"emptyDown",null);ee(this,"connectFrom",null);ee(this,"connectLine");ee(this,"movedDuringDrag",!1);ee(this,"ground");ee(this,"dragging",!1);ee(this,"dragPlane",new Pi);ee(this,"dragOffset",new V);ee(this,"hit",new V);ee(this,"raf",0);ee(this,"ro");ee(this,"onContextMenu",t=>{t.preventDefault(),this.setPointer(t);const i=this.raycaster.intersectObjects([...this.parts.values()].map(s=>s.mesh),!1);for(const s of i){const l=this.parts.get(s.object.userData.uid);if(l&&Wh.has(l.meta.category)){this.onPartMenu({uid:l.uid,name:l.meta.name,disabled:this.disabledPins.has(l.uid),screen:{x:t.clientX,y:t.clientY}});return}}});ee(this,"onPointerDown",t=>{if(t.button!==0)return;if(this.setPointer(t),this.markersVisible){const l=this.raycaster.intersectObjects(this.visibleMarkers(),!1);if(l.length){this.connectFrom=l[0].object,this.movedDuringDrag=!1,this.controls.enabled=!1,this.setHot(this.connectFrom,!0),this.connectLine.visible=!0,this.updateConnectLine(this.worldOf(this.connectFrom)),t.stopPropagation();return}}const i=[...this.parts.values()].map(l=>l.mesh),s=this.raycaster.intersectObjects(i,!1);if(s.length){const l=this.parts.get(s[0].object.userData.uid)||null;this.select(l),this.emit(),this.dragging=!0,this.controls.enabled=!1,this.dragPlane.setFromNormalAndCoplanarPoint(new V(0,1,0),s[0].point),this.dragOffset.copy(s[0].point).sub(l.mesh.position),this.dragGrabStart.copy(l.mesh.position),this.dragGroup=[...this.componentOf(l.uid)].map(c=>this.parts.get(c)).filter(Boolean).map(c=>({mesh:c.mesh,start:c.mesh.position.clone()})),t.stopPropagation()}else this.emptyDown={x:t.clientX,y:t.clientY}});ee(this,"onPointerMove",t=>{var i,s;if(this.setPointer(t),this.connectFrom){this.movedDuringDrag=!0;const l=this.markerUnderPointer(this.connectFrom);l!==this.hovered&&(this.hovered&&this.hovered!==this.connectFrom&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.hovered=l,l&&this.setHot(l,!0));const c=this.worldOf(this.connectFrom);this.updateConnectLine(c,l?this.worldOf(l):this.pointerOnPlane(c));return}if(this.dragging&&this.selected){if(this.raycaster.ray.intersectPlane(this.dragPlane,this.hit)){const l=wc(this.hit.x-this.dragOffset.x)-this.dragGrabStart.x,c=wc(this.hit.z-this.dragOffset.z)-this.dragGrabStart.z;for(const h of this.dragGroup)h.mesh.position.set(h.start.x+l,h.start.y,h.start.z+c),h.mesh.updateMatrixWorld(!0);(i=this.helper)==null||i.update()}return}if(this.markersVisible){const l=((s=this.raycaster.intersectObjects(this.visibleMarkers(),!1)[0])==null?void 0:s.object)||null;l!==this.hovered&&(this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.hovered=l,l&&this.setHot(l,!0))}});ee(this,"onPointerUp",t=>{if(this.connectFrom){const i=this.connectFrom,s=i.userData.holeRef,l=this.hovered&&this.hovered!==i?this.hovered:null,c=l?l.userData.holeRef:null,h=c&&c.partUid!==s.partUid?c:null,d=!this.movedDuringDrag,m={x:t.clientX,y:t.clientY};if(i!==this.armed&&this.setHot(i,!1),this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.connectLine.visible=!1,this.controls.enabled=!0,this.connectFrom=null,this.hovered=null,h){this.clearArm(),this.onConnect({from:s,to:h,depth:this.connectionDepth(s,h),screen:m});return}if(!d)return;if(!this.armed){this.setArm(i);return}const p=this.armed.userData.holeRef,g=p.partUid===s.partUid&&p.holeIndex===s.holeIndex;this.clearArm(),g?this.onConnect({from:s,to:null,depth:this.stackAtHole(s),screen:m}):p.partUid!==s.partUid?this.onConnect({from:p,to:s,depth:this.connectionDepth(p,s),screen:m}):this.setArm(i);return}if(this.dragging){this.dragging=!1,this.controls.enabled=!0,this.emit();return}if(this.emptyDown){const i=Math.hypot(t.clientX-this.emptyDown.x,t.clientY-this.emptyDown.y);this.emptyDown=null,i<4&&(this.clearArm(),this.selected&&(this.select(null),this.emit()))}});ee(this,"animate",()=>{this.raf=requestAnimationFrame(this.animate),this.controls.update(),this.cullMarkers(),this.renderer.render(this.scene,this.camera)});this.container=t;const i=t.clientWidth||800,s=t.clientHeight||600;this.scene.background=new fe("#eaeef4"),this.scene.fog=new jd(15396596,900,2e3),this.camera=new gi(45,i/s,1,6e3),this.camera.position.set(220,190,260),this.renderer=new h1({antialias:!0}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=tv,t.appendChild(this.renderer.domElement),this.controls=new p1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.target.set(0,25,0),this.controls.maxPolarAngle=Math.PI*.495,this.controls.minDistance=60,this.controls.maxDistance=1600,this.scene.add(new SM(16777215,10135478,.85));const l=new bM(16777215,1.15);l.position.set(160,260,180),l.castShadow=!0,l.shadow.mapSize.set(2048,2048);const c=l.shadow.camera;c.near=10,c.far=900,c.left=-350,c.right=350,c.top=350,c.bottom=-350,l.shadow.bias=-5e-4,this.scene.add(l);const h=Bv*48,d=new RM(h,48,11122374,13687010);d.material.transparent=!0,d.material.opacity=.75,this.scene.add(d),this.ground=new qn(new Xo(h,h),new vM({opacity:.16})),this.ground.rotation.x=-Math.PI/2,this.ground.receiveShadow=!0,this.ground.name="ground",this.scene.add(this.ground),this.connectLine=new bv(new si().setFromPoints([new V,new V]),new Yc({color:16756768,transparent:!0,opacity:.9,depthTest:!1})),this.connectLine.visible=!1,this.connectLine.renderOrder=999,this.scene.add(this.connectLine);const m=this.renderer.domElement;m.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),m.addEventListener("contextmenu",this.onContextMenu),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.animate()}async addPart(t){const i=await Rc(t),s=t.color||Vh[t.category]||"#6b7787",l=new Uh({color:s,metalness:.18,roughness:.55}),c=new qn(i,l);c.castShadow=!0,c.receiveShadow=!0;const h=`p${qh++}`;c.userData.uid=h;const d=this.parts.size%4*kc;c.position.set(wc(this.controls.target.x)+d,0,wc(this.controls.target.z)+d),this.restOnGrid(c),this.scene.add(c);const m={uid:h,meta:t,mesh:c};this.parts.set(h,m),this.addMarkers(m),this.select(m),this.emit()}restOnGrid(t){t.updateMatrixWorld(!0);const i=t.geometry.boundingBox.clone().applyMatrix4(t.matrixWorld);t.position.y+=-i.min.y,t.position.y=Math.max(0,t.position.y),t.updateMatrixWorld(!0)}addMarkers(t){if(!U1(t.meta))return;const i=new V(0,0,1);N1(t.meta).forEach((s,l)=>{const c=new qn(this.discGeo,this.markerMat),h=new V(s.axis[0],s.axis[1],s.axis[2]).normalize();c.position.set(s.p[0]+h.x*Cc,s.p[1]+h.y*Cc,s.p[2]+h.z*Cc),c.quaternion.setFromUnitVectors(i,h),c.visible=this.markersVisible,c.userData.holeRef={partUid:t.uid,holeIndex:l},c.userData.localTan=s.tan,t.mesh.add(c),this.markers.push(c)})}setMarkersVisible(t){this.markersVisible=t;for(const i of this.markers)i.visible=t}select(t){this.selected=t,this.helper&&(this.scene.remove(this.helper),this.helper.geometry.dispose(),this.helper=null),t&&(this.helper=new CM(t.mesh,new fe("#ffb020")),this.helper.material.linewidth=2,this.scene.add(this.helper))}selectByUid(t){this.select(t&&this.parts.get(t)||null),this.emit()}rotateSelected(t){var h;if(!this.selected)return;const i=[...this.componentOf(this.selected.uid)].map(d=>this.parts.get(d)).filter(Boolean);if(!i.length)return;const s=new da;for(const d of i)s.union(this.worldBox(d));const l=s.getCenter(new V),c=new Rn().setFromAxisAngle(new V(t==="x"?1:0,t==="y"?1:0,t==="z"?1:0),Math.PI/2);for(const d of i)d.mesh.position.sub(l).applyQuaternion(c).add(l),d.mesh.quaternion.premultiply(c),d.mesh.updateMatrixWorld(!0);(h=this.helper)==null||h.update(),this.emit()}nudgeSelectedY(t){var i;this.selected&&(this.selected.mesh.position.y=Math.max(0,this.selected.mesh.position.y+t*kc),this.selected.mesh.updateMatrixWorld(!0),(i=this.helper)==null||i.update(),this.emit())}deleteSelected(){this.selected&&(this.removePart(this.selected),this.select(null),this.emit())}removePart(t){this.markers=this.markers.filter(i=>i.userData.holeRef.partUid!==t.uid),this.scene.remove(t.mesh),t.mesh.material.dispose(),this.parts.delete(t.uid),this.disabledPins.delete(t.uid)}clear(){for(const t of[...this.parts.values()])this.removePart(t);this.select(null),this.emit()}serialize(){return[...this.parts.values()].map(t=>({id:t.meta.id,p:[t.mesh.position.x,t.mesh.position.y,t.mesh.position.z],q:[t.mesh.quaternion.x,t.mesh.quaternion.y,t.mesh.quaternion.z,t.mesh.quaternion.w]}))}async load(t,i){this.clear();for(const s of t){const l=i.get(s.id);if(!l)continue;const c=await Rc(l),h=l.color||Vh[l.category]||"#6b7787",d=new qn(c,new Uh({color:h,metalness:.18,roughness:.55}));d.castShadow=d.receiveShadow=!0;const m=`p${qh++}`;d.userData.uid=m,d.position.set(s.p[0],s.p[1],s.p[2]),d.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]),d.updateMatrixWorld(!0),this.scene.add(d);const p={uid:m,meta:l,mesh:d};this.parts.set(m,p),this.addMarkers(p)}this.select(null),this.emit()}computeState(){var l,c,h;const t=new da;let i=0;for(const d of this.parts.values())d.mesh.updateMatrixWorld(!0),d.mesh.geometry.boundingBox&&t.union(d.mesh.geometry.boundingBox.clone().applyMatrix4(d.mesh.matrixWorld)),d.meta.isMotor&&i++;const s=this.parts.size?t.getSize(new V):new V;return{count:this.parts.size,selectedUid:((l=this.selected)==null?void 0:l.uid)??null,selectedName:((c=this.selected)==null?void 0:c.meta.name)??null,bboxMM:{w:+s.x.toFixed(1),h:+s.y.toFixed(1),d:+s.z.toFixed(1)},motors:i,canPivot:this.canPivot((h=this.selected)==null?void 0:h.uid)}}settleGroups(){const t=new Set;for(const i of this.parts.values()){if(t.has(i.uid))continue;const s=this.componentOf(i.uid);for(const h of s)t.add(h);const l=[...s].map(h=>this.parts.get(h)).filter(Boolean);if(!l.length)continue;let c=1/0;for(const h of l)c=Math.min(c,this.worldBox(h).min.y);if(!(!isFinite(c)||Math.abs(c)<.01))for(const h of l)h.mesh.position.y-=c,h.mesh.updateMatrixWorld(!0)}}emit(){var t;this.recomputeOccupancy(),this.settleGroups(),(t=this.helper)==null||t.update(),this.onChange(this.computeState())}setPointer(t){const i=this.renderer.domElement.getBoundingClientRect();this.pointer.set((t.clientX-i.left)/i.width*2-1,-((t.clientY-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}worldOf(t){return t.getWorldPosition(new V)}axisOf(t){return t.getWorldDirection(new V).normalize()}setHot(t,i){t.material=i?this.markerHotMat:this.markerMat,t.scale.setScalar(i?1.5:1)}markerFor(t){return this.markers.find(i=>{const s=i.userData.holeRef;return s.partUid===t.partUid&&s.holeIndex===t.holeIndex})||null}setArm(t){this.armed=t,this.setHot(t,!0),this.onArmChange(!0)}clearArm(){this.armed&&this.setHot(this.armed,!1),this.armed=null,this.onArmChange(!1)}visibleMarkers(){return this.markers.filter(t=>t.visible)}markerUnderPointer(t){for(const i of this.raycaster.intersectObjects(this.visibleMarkers(),!1))if(i.object!==t)return i.object;return null}faceOf(t){return this.worldOf(t).addScaledVector(this.axisOf(t),-Cc)}tanOf(t){const i=new Rn;t.parent.getWorldQuaternion(i);const s=t.userData.localTan;return new V(s[0],s[1],s[2]).applyQuaternion(i).normalize()}pointerOnPlane(t){const i=this.camera.getWorldDirection(new V).negate(),s=new Pi().setFromNormalAndCoplanarPoint(i,t),l=new V;return this.raycaster.ray.intersectPlane(s,l)?l:t.clone()}updateConnectLine(t,i){const s=this.connectLine.geometry.attributes.position,l=i||t;s.setXYZ(0,t.x,t.y,t.z),s.setXYZ(1,l.x,l.y,l.z),s.needsUpdate=!0}extentAlong(t,i){const s=t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld).getSize(new V);return Math.abs(s.x*i.x)+Math.abs(s.y*i.y)+Math.abs(s.z*i.z)}longAxis(t){const i=t.sizeMM,s=i[0]>=i[1]&&i[0]>=i[2]?0:i[1]>=i[2]?1:2;return new V(s===0?1:0,s===1?1:0,s===2?1:0)}coreKey(t){const i=t.userData.holeRef;return`${i.partUid}:${Math.floor(i.holeIndex/2)}`}headLocalAxis(t,i){const s=this.headAxisCache.get(t.id);if(s)return s.clone();const l=t.sizeMM,c=l[0]>=l[1]&&l[0]>=l[2]?0:l[1]>=l[2]?1:2,h=[0,1,2].filter(v=>v!==c),d=i.attributes.position.array;let m=0,p=0;for(let v=0;v<d.length;v+=3){const x=Math.hypot(d[v+h[0]],d[v+h[1]]);d[v+c]>0?m=Math.max(m,x):p=Math.max(p,x)}const g=new V().setComponent(c,m>=p?1:-1);return this.headAxisCache.set(t.id,g.clone()),g}async connect(t,i,s){const l=this.markerFor(t);if(!l)return;const c=this.parts.get(t.partUid);if(!c||this.occupied.has(this.coreKey(l)))return;const h=this.axisOf(l),d=this.faceOf(l),m=await Rc(s);if(i){const p=this.markerFor(i),g=this.parts.get(i.partUid);if(p&&g&&!this.occupied.has(this.coreKey(p))){const v=this.axisOf(p),x=this.tanOf(p),M=this.tanOf(l),b=h.clone().negate(),R=M.clone(),S=new V().crossVectors(b,R).normalize(),y=v.clone(),I=x.clone(),O=new V().crossVectors(y,I).normalize(),L=new Rn().setFromRotationMatrix(new ke().makeBasis(b,R,S)),Q=new Rn().setFromRotationMatrix(new ke().makeBasis(y,I,O));g.mesh.quaternion.premultiply(L.multiply(Q.invert())),g.mesh.updateMatrixWorld(!0),g.mesh.position.add(d.clone().sub(this.faceOf(p))),g.mesh.updateMatrixWorld(!0),K0(s.id)?await this.addHeadedPin(s,m,d.clone().addScaledVector(h,-this.extentAlong(c,h)),h):await this.addCenteredConnector(s,d,h),this.select(g),this.emit();return}}K0(s.id)?await this.addHeadedPin(s,m,d,h.clone().negate()):await this.addCenteredConnector(s,d,h),this.emit()}async addHeadedPin(t,i,s,l){const c=Math.max(...t.sizeMM)/2,h=new Rn().setFromUnitVectors(this.headLocalAxis(t,i),l.clone().negate());await this.addConnectorMesh(t,s.clone().addScaledVector(l,c),h)}async addCenteredConnector(t,i,s){await this.addConnectorMesh(t,i,new Rn().setFromUnitVectors(this.longAxis(t),s))}async addConnectorMesh(t,i,s){const l=await Rc(t),c=new qn(l,new Uh({color:Vh[t.category]||"#e0a13a",metalness:.2,roughness:.5}));c.castShadow=c.receiveShadow=!0;const h=`p${qh++}`;c.userData.uid=h,c.position.copy(i),c.quaternion.copy(s),c.updateMatrixWorld(!0),this.scene.add(c);const d={uid:h,meta:t,mesh:c};this.parts.set(h,d),this.addMarkers(d)}recomputeOccupancy(){this.occupied.clear(),this.pinLinks.clear(),this.adj.clear();const t=[...this.parts.values()].filter(l=>Wh.has(l.meta.category)),i=new Map;for(const l of this.markers){const c=this.coreKey(l);(i.get(c)||i.set(c,[]).get(c)).push(l)}const s=[...i.entries()].map(([l,c])=>{const h=new V;for(const d of c)h.add(d.getWorldPosition(new V));return{key:l,c:h.multiplyScalar(1/c.length),a:this.axisOf(c[0])}});for(const l of t){const c=this.longAxis(l.meta).applyQuaternion(l.mesh.getWorldQuaternion(new Rn)).normalize(),h=l.mesh.getWorldPosition(new V),d=this.extentAlong(l,c)/2+1.5,m=new Set;for(const p of s){if(Math.abs(p.a.dot(c))<.9)continue;const g=p.c.clone().sub(h),v=g.dot(c);Math.abs(v)>d||g.addScaledVector(c,-v).length()>3.5||(this.occupied.add(p.key),m.add(p.key.slice(0,p.key.lastIndexOf(":"))))}this.pinLinks.set(l.uid,m)}for(const[l,c]of this.pinLinks)if(!this.disabledPins.has(l))for(const h of c)this.link(l,h);for(const l of this.markers)this.occupied.has(this.coreKey(l))&&(l.visible=!1)}link(t,i){(this.adj.get(t)||this.adj.set(t,new Set).get(t)).add(i),(this.adj.get(i)||this.adj.set(i,new Set).get(i)).add(t)}componentOf(t){const i=new Set([t]),s=[t];for(;s.length;){const l=s.pop();for(const c of this.adj.get(l)||[])i.has(c)||(i.add(c),s.push(c))}return i}setPinEnabled(t,i){const s=this.parts.get(t);if(!s)return;i?this.disabledPins.delete(t):this.disabledPins.add(t);const l=s.mesh.material;l.transparent=!i,l.opacity=i?1:.35,l.needsUpdate=!0,this.emit()}isPinDisabled(t){return this.disabledPins.has(t)}stackAt(t,i){const s=new Set,l=new Map;for(const c of this.markers){const h=this.coreKey(c);(l.get(h)||l.set(h,[]).get(h)).push(c)}for(const[c,h]of l){const d=new V;for(const g of h)d.add(g.getWorldPosition(new V));if(d.multiplyScalar(1/h.length),Math.abs(this.axisOf(h[0]).dot(i))<.9)continue;const m=d.sub(t),p=m.dot(i);Math.abs(p)>45||m.addScaledVector(i,-p).length()>3.5||s.add(c.slice(0,c.lastIndexOf(":")))}return Math.max(1,s.size)}connectionDepth(t,i){const s=this.markerFor(t),l=this.markerFor(i);return!s||!l?2:this.stackAt(this.faceOf(s),this.axisOf(s))+this.stackAt(this.faceOf(l),this.axisOf(l))}stackAtHole(t){const i=this.markerFor(t);return i?this.stackAt(this.faceOf(i),this.axisOf(i)):1}pinsAdjacent(t){return[...this.adj.get(t)||[]].filter(i=>{const s=this.parts.get(i);return s&&Wh.has(s.meta.category)})}canPivot(t){return!!t&&this.pinsAdjacent(t).length===1}componentWithout(t,i){const s=new Set([t]),l=[t];for(;l.length;){const c=l.pop();for(const h of this.adj.get(c)||[])h===i||s.has(h)||(s.add(h),l.push(h))}return s}futureBox(t,i,s){const l=new ke().compose(i,s,new V(1,1,1));return t.mesh.geometry.boundingBox.clone().applyMatrix4(l)}worldBox(t){return t.mesh.updateMatrixWorld(!0),t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)}flashRed(t){for(const i of t){const s=i.mesh.material,l=s.emissive.clone();s.emissive.setHex(13777706),s.needsUpdate=!0,window.setTimeout(()=>{s.emissive.copy(l),s.needsUpdate=!0},450)}}pivotSelected(){var R;const t=this.selected;if(!t)return!1;const i=this.pinsAdjacent(t.uid);if(i.length!==1)return!1;const s=this.parts.get(i[0]),l=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Rn)).normalize(),c=s.mesh.getWorldPosition(new V),h=this.componentWithout(t.uid,s.uid),d=[...h].map(S=>this.parts.get(S)).filter(Boolean),m=this.pinLinks.get(s.uid)||new Set,p=[...this.parts.values()].filter(S=>!h.has(S.uid)&&S.uid!==s.uid&&!m.has(S.uid)),g=new Rn().setFromAxisAngle(l,Math.PI/2),v=new Map,x=new Map;for(const S of d)v.set(S.uid,S.mesh.position.clone().sub(c).applyQuaternion(g).add(c)),x.set(S.uid,g.clone().multiply(S.mesh.quaternion));const M=d.map(S=>this.futureBox(S,v.get(S.uid),x.get(S.uid)).expandByScalar(-1.5)),b=p.map(S=>this.worldBox(S).expandByScalar(-1.5));if(M.some(S=>b.some(y=>S.intersectsBox(y))))return this.flashRed(d),!1;for(const S of d)S.mesh.position.copy(v.get(S.uid)),S.mesh.quaternion.copy(x.get(S.uid)),S.mesh.updateMatrixWorld(!0);return(R=this.helper)==null||R.update(),this.emit(),!0}deletePartByUid(t){const i=this.parts.get(t);i&&(this.selected===i&&this.select(null),this.removePart(i),this.emit())}async replaceConnector(t,i){const s=this.parts.get(t);if(!s)return;const l=s.mesh.getWorldPosition(new V),c=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Rn)).normalize();this.removePart(s),await this.addCenteredConnector(i,l,c),this.select(null),this.emit()}resize(){const t=this.container.clientWidth,i=this.container.clientHeight;!t||!i||(this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i))}cullMarkers(){if(!this.markersVisible||!this.markers.length)return;const t=this.camera.position,i=new V,s=new V,l=new V;for(const c of this.markers)c.getWorldPosition(i),c.getWorldDirection(s),l.subVectors(t,i),c.visible=c===this.armed||s.dot(l)>0&&!this.occupied.has(this.coreKey(c))}frameAll(){if(!this.parts.size){this.camera.position.set(220,190,260),this.controls.target.set(0,25,0);return}const t=new da;for(const l of this.parts.values())t.expandByObject(l.mesh);const i=t.getCenter(new V),s=t.getSize(new V).length()*.6+60;this.controls.target.copy(i),this.camera.position.set(i.x+s,i.y+s*.8,i.z+s)}dispose(){cancelAnimationFrame(this.raf);const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),t.removeEventListener("contextmenu",this.onContextMenu),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),this.ro.disconnect(),this.controls.dispose(),this.renderer.dispose(),t.remove()}}const P1=25.4,Q0="utg_vex_build",Yh=o=>+(o/P1).toFixed(1),J0={w:11,h:15,d:11,motors:6};function z1(){const o=An.useRef(null),t=An.useRef(null),[i,s]=An.useState(null),[l,c]=An.useState({count:0,selectedUid:null,selectedName:null,bboxMM:{w:0,h:0,d:0},motors:0,canPivot:!1}),[h,d]=An.useState(()=>{try{return{...J0,...JSON.parse(localStorage.getItem("utg_vex_limits")||"{}")}}catch{return J0}}),[m,p]=An.useState("Loading parts…"),[g,v]=An.useState(""),[x,M]=An.useState(null),[b,R]=An.useState(null),S=An.useMemo(()=>new Map(((i==null?void 0:i.parts)||[]).map(w=>[w.id,w])),[i]);An.useEffect(()=>{R1().then(s).catch(()=>v("The parts library failed to load."))},[]),An.useEffect(()=>{if(!i||!o.current)return;const w=new O1(o.current);return w.onChange=c,w.onConnect=M,w.onPartMenu=R,w.onArmChange=j=>p(j?"First hole picked — click another hole to connect, or click it again for a single connector. (Esc cancels)":"Pick a part on the left, or click a hole to start a connection."),t.current=w,p("Pick a part on the left to start building."),()=>{w.dispose(),t.current=null}},[i]),An.useEffect(()=>{localStorage.setItem("utg_vex_limits",JSON.stringify(h))},[h]),An.useEffect(()=>{const w=j=>{var mt;const et=t.current;et&&((mt=j.target)==null?void 0:mt.tagName)!=="INPUT"&&(j.key==="Delete"||j.key==="Backspace"?(j.preventDefault(),et.deleteSelected()):j.key==="r"||j.key==="R"?et.rotateSelected("y"):j.key==="x"||j.key==="X"?et.rotateSelected("x"):j.key==="z"||j.key==="Z"?et.rotateSelected("z"):j.key==="]"?et.nudgeSelectedY(1):j.key==="["?et.nudgeSelectedY(-1):j.key==="f"||j.key==="F"?et.frameAll():j.key==="Escape"&&(et.clearArm(),et.selectByUid(null),M(null),R(null)))};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[]);function y(w){var j;(j=t.current)==null||j.addPart(w),p(`Added ${w.name}. Drag to move · R to rotate · Del to remove.`)}function I(){var j;const w=((j=t.current)==null?void 0:j.serialize())||[];localStorage.setItem(Q0,JSON.stringify(w)),p(`Saved your build (${w.length} parts) to this device.`)}async function O(){var w,j;try{const et=JSON.parse(localStorage.getItem(Q0)||"[]");if(!et.length){p("No saved build on this device yet.");return}await((w=t.current)==null?void 0:w.load(et,S)),(j=t.current)==null||j.frameAll(),p(`Loaded your saved build (${et.length} parts).`)}catch{p("That saved build could not be opened.")}}function L(){var w;confirm("Clear the whole build?")&&((w=t.current)==null||w.clear(),p("Cleared. Start a new build."))}const Q=An.useMemo(()=>{const w=new Map;for(const j of(i==null?void 0:i.parts)||[]){const et=w.get(j.category)||[];et.push(j),w.set(j.category,et)}return w1.filter(j=>w.has(j)).map(j=>({category:j,parts:w.get(j)}))},[i]),G=An.useMemo(()=>((i==null?void 0:i.parts)||[]).filter(w=>w.category==="pin"||w.category==="shaft"||w.category==="standoff"),[i]),P={w:Yh(l.bboxMM.w),h:Yh(l.bboxMM.h),d:Yh(l.bboxMM.d)},W={w:P.w>h.w,h:P.h>h.h,d:P.d>h.d,motors:l.motors>h.motors},D=W.w||W.h||W.d||W.motors,C=!!l.selectedUid;return g?Tt.jsx("main",{className:"shell",children:Tt.jsx("div",{className:"fatal",children:g})}):Tt.jsxs("main",{className:"shell",children:[Tt.jsxs("header",{className:"topbar",children:[Tt.jsxs("a",{className:"brand",href:"../",children:[Tt.jsx("img",{src:"https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg",alt:"UTG Academy"}),Tt.jsx("span",{children:"VEX Build Center"})]}),Tt.jsx("div",{className:`legality ${D?"bad":"good"}`,children:l.count?D?"Over the limits":"Within the limits":"Empty build"})]}),Tt.jsxs("div",{className:"workspace",children:[Tt.jsxs("aside",{className:"palette",children:[Tt.jsx("h2",{children:"Parts"}),!i&&Tt.jsx("p",{className:"muted",children:"Loading…"}),Q.map(w=>Tt.jsxs("section",{className:"pal-group",children:[Tt.jsx("h3",{children:C1[w.category]}),Tt.jsx("div",{className:"pal-grid",children:w.parts.map(j=>Tt.jsxs("button",{className:"pal-item",onClick:()=>y(j),title:j.name,children:[Tt.jsx("span",{className:"pal-swatch",style:{background:Zh(j)}}),Tt.jsx("span",{className:"pal-name",children:j.name})]},j.id))})]},w.category))]}),Tt.jsxs("div",{className:"stage",children:[Tt.jsx("div",{className:"canvas-host",ref:o}),Tt.jsx("div",{className:"stage-hint",children:"Click a hole then another to connect (or drag between them) · click the same hole twice for one connector · drag a part to move"})]}),Tt.jsxs("aside",{className:"inspector",children:[Tt.jsxs("section",{className:"card",children:[Tt.jsx("h3",{children:"Robot size"}),Tt.jsxs("div",{className:"dims",children:[Tt.jsx(jh,{label:"Width",mm:l.bboxMM.w,inV:P.w,limit:h.w,over:W.w,onLimit:w=>d({...h,w})}),Tt.jsx(jh,{label:"Height",mm:l.bboxMM.h,inV:P.h,limit:h.h,over:W.h,onLimit:w=>d({...h,h:w})}),Tt.jsx(jh,{label:"Depth",mm:l.bboxMM.d,inV:P.d,limit:h.d,over:W.d,onLimit:w=>d({...h,d:w})})]}),Tt.jsx("p",{className:"muted small",children:"Limits are in inches — set them to your season's rules."})]}),Tt.jsxs("section",{className:"card",children:[Tt.jsx("h3",{children:"Motors"}),Tt.jsxs("div",{className:`motor-row ${W.motors?"over":""}`,children:[Tt.jsx("span",{className:"motor-count",children:l.motors}),Tt.jsx("span",{className:"muted",children:"of"}),Tt.jsx("input",{type:"number",min:0,value:h.motors,onChange:w=>d({...h,motors:Math.max(0,+w.target.value||0)})}),Tt.jsx("span",{className:"muted",children:"max"})]})]}),Tt.jsxs("section",{className:"card",children:[Tt.jsx("h3",{children:"Selected part"}),C?Tt.jsxs(Tt.Fragment,{children:[Tt.jsx("p",{className:"sel-name",children:l.selectedName}),l.canPivot&&Tt.jsx("div",{className:"btn-row",children:Tt.jsx("button",{className:"pivot",onClick:()=>{var j;const w=(j=t.current)==null?void 0:j.pivotSelected();p(w?"Pivoted 90° around the pin.":"Can't turn there — it would hit another piece.")},children:"⟳ Pivot on pin 90°"})}),Tt.jsxs("div",{className:"btn-row",children:[Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("x")},children:"Rotate X"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("y")},children:"Rotate Y"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("z")},children:"Rotate Z"})]}),Tt.jsxs("div",{className:"btn-row",children:[Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.nudgeSelectedY(1)},children:"Raise"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.nudgeSelectedY(-1)},children:"Lower"}),Tt.jsx("button",{className:"danger",onClick:()=>{var w;return(w=t.current)==null?void 0:w.deleteSelected()},children:"Delete"})]})]}):Tt.jsx("p",{className:"muted small",children:"Click a part in the scene to select it."})]}),Tt.jsxs("section",{className:"card",children:[Tt.jsxs("h3",{children:["Build · ",l.count," parts"]}),Tt.jsxs("div",{className:"btn-row",children:[Tt.jsx("button",{onClick:I,children:"Save"}),Tt.jsx("button",{onClick:O,children:"Load"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.frameAll()},children:"Fit view"})]}),Tt.jsx("div",{className:"btn-row",children:Tt.jsx("button",{className:"danger",onClick:L,children:"Clear all"})})]})]})]}),x&&Tt.jsxs(Tt.Fragment,{children:[Tt.jsx("div",{className:"picker-scrim",onClick:()=>M(null)}),Tt.jsxs("div",{className:"picker",style:{left:Math.min(x.screen.x,window.innerWidth-210),top:Math.min(x.screen.y,window.innerHeight-260)},children:[Tt.jsx("div",{className:"picker-head",children:x.to?`Connect ${x.depth} stacked holes with…`:"Put in this hole…"}),Tt.jsx("div",{className:"picker-grid",children:G.filter(w=>w.category!=="pin"||B1(w)>=x.depth).map(w=>Tt.jsxs("button",{className:"picker-item",onClick:()=>{var j;(j=t.current)==null||j.connect(x.from,x.to,w),M(null),p(`Placed ${w.name}.`)},children:[Tt.jsx("span",{className:"pal-swatch",style:{background:Zh(w)}}),w.name]},w.id))})]})]}),b&&Tt.jsxs(Tt.Fragment,{children:[Tt.jsx("div",{className:"picker-scrim",onClick:()=>R(null)}),Tt.jsxs("div",{className:"picker",style:{left:Math.min(b.screen.x,window.innerWidth-210),top:Math.min(b.screen.y,window.innerHeight-300)},children:[Tt.jsxs("div",{className:"picker-head",children:[b.name,b.disabled?" · disabled":""]}),Tt.jsx("button",{className:"picker-item",onClick:()=>{var w;(w=t.current)==null||w.setPinEnabled(b.uid,b.disabled),R(null),p(b.disabled?"Pin enabled — parts are stuck together.":"Pin disabled — you can pull the parts apart.")},children:b.disabled?"Enable (stick parts)":"Disable (release parts)"}),Tt.jsx("button",{className:"picker-item danger",onClick:()=>{var w;(w=t.current)==null||w.deletePartByUid(b.uid),R(null),p("Removed the pin.")},children:"Delete pin"}),Tt.jsx("div",{className:"picker-head",style:{paddingTop:8},children:"Replace with…"}),Tt.jsx("div",{className:"picker-grid",children:G.map(w=>Tt.jsxs("button",{className:"picker-item",onClick:()=>{var j;(j=t.current)==null||j.replaceConnector(b.uid,w),R(null),p(`Replaced with ${w.name}.`)},children:[Tt.jsx("span",{className:"pal-swatch",style:{background:Zh(w)}}),w.name]},w.id))})]})]}),Tt.jsx("footer",{className:"statusbar",children:m})]})}function jh({label:o,mm:t,inV:i,limit:s,over:l,onLimit:c}){return Tt.jsxs("div",{className:`dim ${l?"over":""}`,children:[Tt.jsx("span",{className:"dim-label",children:o}),Tt.jsxs("span",{className:"dim-val",children:[i,Tt.jsx("small",{children:"in"})," ",Tt.jsxs("span",{className:"muted",children:["/ ",t,"mm"]})]}),Tt.jsxs("label",{className:"dim-limit",children:["≤ ",Tt.jsx("input",{type:"number",min:0,step:.5,value:s,onChange:h=>c(Math.max(0,+h.target.value||0))})," in"]})]})}function B1(o){return Math.round(Math.max(...o.sizeMM)/6.35)}function Zh(o){const t={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"};return o.color||t[o.category]||"#6b7787"}tS.createRoot(document.getElementById("root")).render(Tt.jsx(An.StrictMode,{children:Tt.jsx(z1,{})}));
