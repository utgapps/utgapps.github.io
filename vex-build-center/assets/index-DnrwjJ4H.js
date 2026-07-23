var fx=Object.defineProperty;var hx=(r,t,i)=>t in r?fx(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var Jt=(r,t,i)=>hx(r,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var _h={exports:{}},Xo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j_;function dx(){if(j_)return Xo;j_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:h,ref:l!==void 0?l:null,props:c}}return Xo.Fragment=t,Xo.jsx=i,Xo.jsxs=i,Xo}var Z_;function px(){return Z_||(Z_=1,_h.exports=dx()),_h.exports}var Tt=px(),vh={exports:{}},ne={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var K_;function mx(){if(K_)return ne;K_=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),S=Symbol.iterator;function M(N){return N===null||typeof N!="object"?null:(N=S&&N[S]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},R=Object.assign,x={};function y(N,at,St){this.props=N,this.context=at,this.refs=x,this.updater=St||E}y.prototype.isReactComponent={},y.prototype.setState=function(N,at){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,at,"setState")},y.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function I(){}I.prototype=y.prototype;function O(N,at,St){this.props=N,this.context=at,this.refs=x,this.updater=St||E}var U=O.prototype=new I;U.constructor=O,R(U,y.prototype),U.isPureReactComponent=!0;var J=Array.isArray;function V(){}var P={H:null,A:null,T:null,S:null},W=Object.prototype.hasOwnProperty;function D(N,at,St){var Z=St.ref;return{$$typeof:r,type:N,key:at,ref:Z!==void 0?Z:null,props:St}}function C(N,at){return D(N.type,at,N.props)}function w(N){return typeof N=="object"&&N!==null&&N.$$typeof===r}function j(N){var at={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(St){return at[St]})}var et=/\/+/g;function mt(N,at){return typeof N=="object"&&N!==null&&N.key!=null?j(""+N.key):at.toString(36)}function gt(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(V,V):(N.status="pending",N.then(function(at){N.status==="pending"&&(N.status="fulfilled",N.value=at)},function(at){N.status==="pending"&&(N.status="rejected",N.reason=at)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function z(N,at,St,Z,ct){var Et=typeof N;(Et==="undefined"||Et==="boolean")&&(N=null);var yt=!1;if(N===null)yt=!0;else switch(Et){case"bigint":case"string":case"number":yt=!0;break;case"object":switch(N.$$typeof){case r:case t:yt=!0;break;case g:return yt=N._init,z(yt(N._payload),at,St,Z,ct)}}if(yt)return ct=ct(N),yt=Z===""?"."+mt(N,0):Z,J(ct)?(St="",yt!=null&&(St=yt.replace(et,"$&/")+"/"),z(ct,at,St,"",function(ie){return ie})):ct!=null&&(w(ct)&&(ct=C(ct,St+(ct.key==null||N&&N.key===ct.key?"":(""+ct.key).replace(et,"$&/")+"/")+yt)),at.push(ct)),1;yt=0;var Gt=Z===""?".":Z+":";if(J(N))for(var Ft=0;Ft<N.length;Ft++)Z=N[Ft],Et=Gt+mt(Z,Ft),yt+=z(Z,at,St,Et,ct);else if(Ft=M(N),typeof Ft=="function")for(N=Ft.call(N),Ft=0;!(Z=N.next()).done;)Z=Z.value,Et=Gt+mt(Z,Ft++),yt+=z(Z,at,St,Et,ct);else if(Et==="object"){if(typeof N.then=="function")return z(gt(N),at,St,Z,ct);throw at=String(N),Error("Objects are not valid as a React child (found: "+(at==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":at)+"). If you meant to render a collection of children, use an array instead.")}return yt}function Q(N,at,St){if(N==null)return N;var Z=[],ct=0;return z(N,Z,"","",function(Et){return at.call(St,Et,ct++)}),Z}function K(N){if(N._status===-1){var at=N._result;at=at(),at.then(function(St){(N._status===0||N._status===-1)&&(N._status=1,N._result=St)},function(St){(N._status===0||N._status===-1)&&(N._status=2,N._result=St)}),N._status===-1&&(N._status=0,N._result=at)}if(N._status===1)return N._result.default;throw N._result}var xt=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var at=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(at))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},bt={map:Q,forEach:function(N,at,St){Q(N,function(){at.apply(this,arguments)},St)},count:function(N){var at=0;return Q(N,function(){at++}),at},toArray:function(N){return Q(N,function(at){return at})||[]},only:function(N){if(!w(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return ne.Activity=_,ne.Children=bt,ne.Component=y,ne.Fragment=i,ne.Profiler=l,ne.PureComponent=O,ne.StrictMode=s,ne.Suspense=m,ne.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ne.__COMPILER_RUNTIME={__proto__:null,c:function(N){return P.H.useMemoCache(N)}},ne.cache=function(N){return function(){return N.apply(null,arguments)}},ne.cacheSignal=function(){return null},ne.cloneElement=function(N,at,St){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var Z=R({},N.props),ct=N.key;if(at!=null)for(Et in at.key!==void 0&&(ct=""+at.key),at)!W.call(at,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&at.ref===void 0||(Z[Et]=at[Et]);var Et=arguments.length-2;if(Et===1)Z.children=St;else if(1<Et){for(var yt=Array(Et),Gt=0;Gt<Et;Gt++)yt[Gt]=arguments[Gt+2];Z.children=yt}return D(N.type,ct,Z)},ne.createContext=function(N){return N={$$typeof:h,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:c,_context:N},N},ne.createElement=function(N,at,St){var Z,ct={},Et=null;if(at!=null)for(Z in at.key!==void 0&&(Et=""+at.key),at)W.call(at,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ct[Z]=at[Z]);var yt=arguments.length-2;if(yt===1)ct.children=St;else if(1<yt){for(var Gt=Array(yt),Ft=0;Ft<yt;Ft++)Gt[Ft]=arguments[Ft+2];ct.children=Gt}if(N&&N.defaultProps)for(Z in yt=N.defaultProps,yt)ct[Z]===void 0&&(ct[Z]=yt[Z]);return D(N,Et,ct)},ne.createRef=function(){return{current:null}},ne.forwardRef=function(N){return{$$typeof:d,render:N}},ne.isValidElement=w,ne.lazy=function(N){return{$$typeof:g,_payload:{_status:-1,_result:N},_init:K}},ne.memo=function(N,at){return{$$typeof:p,type:N,compare:at===void 0?null:at}},ne.startTransition=function(N){var at=P.T,St={};P.T=St;try{var Z=N(),ct=P.S;ct!==null&&ct(St,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(V,xt)}catch(Et){xt(Et)}finally{at!==null&&St.types!==null&&(at.types=St.types),P.T=at}},ne.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ne.use=function(N){return P.H.use(N)},ne.useActionState=function(N,at,St){return P.H.useActionState(N,at,St)},ne.useCallback=function(N,at){return P.H.useCallback(N,at)},ne.useContext=function(N){return P.H.useContext(N)},ne.useDebugValue=function(){},ne.useDeferredValue=function(N,at){return P.H.useDeferredValue(N,at)},ne.useEffect=function(N,at){return P.H.useEffect(N,at)},ne.useEffectEvent=function(N){return P.H.useEffectEvent(N)},ne.useId=function(){return P.H.useId()},ne.useImperativeHandle=function(N,at,St){return P.H.useImperativeHandle(N,at,St)},ne.useInsertionEffect=function(N,at){return P.H.useInsertionEffect(N,at)},ne.useLayoutEffect=function(N,at){return P.H.useLayoutEffect(N,at)},ne.useMemo=function(N,at){return P.H.useMemo(N,at)},ne.useOptimistic=function(N,at){return P.H.useOptimistic(N,at)},ne.useReducer=function(N,at,St){return P.H.useReducer(N,at,St)},ne.useRef=function(N){return P.H.useRef(N)},ne.useState=function(N){return P.H.useState(N)},ne.useSyncExternalStore=function(N,at,St){return P.H.useSyncExternalStore(N,at,St)},ne.useTransition=function(){return P.H.useTransition()},ne.version="19.2.8",ne}var Q_;function tp(){return Q_||(Q_=1,vh.exports=mx()),vh.exports}var Ln=tp(),yh={exports:{}},Wo={},Sh={exports:{}},xh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J_;function gx(){return J_||(J_=1,(function(r){function t(z,Q){var K=z.length;z.push(Q);t:for(;0<K;){var xt=K-1>>>1,bt=z[xt];if(0<l(bt,Q))z[xt]=Q,z[K]=bt,K=xt;else break t}}function i(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var Q=z[0],K=z.pop();if(K!==Q){z[0]=K;t:for(var xt=0,bt=z.length,N=bt>>>1;xt<N;){var at=2*(xt+1)-1,St=z[at],Z=at+1,ct=z[Z];if(0>l(St,K))Z<bt&&0>l(ct,St)?(z[xt]=ct,z[Z]=K,xt=Z):(z[xt]=St,z[at]=K,xt=at);else if(Z<bt&&0>l(ct,K))z[xt]=ct,z[Z]=K,xt=Z;else break t}}return Q}function l(z,Q){var K=z.sortIndex-Q.sortIndex;return K!==0?K:z.id-Q.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();r.unstable_now=function(){return h.now()-d}}var m=[],p=[],g=1,_=null,S=3,M=!1,E=!1,R=!1,x=!1,y=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;function U(z){for(var Q=i(p);Q!==null;){if(Q.callback===null)s(p);else if(Q.startTime<=z)s(p),Q.sortIndex=Q.expirationTime,t(m,Q);else break;Q=i(p)}}function J(z){if(R=!1,U(z),!E)if(i(m)!==null)E=!0,V||(V=!0,j());else{var Q=i(p);Q!==null&&gt(J,Q.startTime-z)}}var V=!1,P=-1,W=5,D=-1;function C(){return x?!0:!(r.unstable_now()-D<W)}function w(){if(x=!1,V){var z=r.unstable_now();D=z;var Q=!0;try{t:{E=!1,R&&(R=!1,I(P),P=-1),M=!0;var K=S;try{e:{for(U(z),_=i(m);_!==null&&!(_.expirationTime>z&&C());){var xt=_.callback;if(typeof xt=="function"){_.callback=null,S=_.priorityLevel;var bt=xt(_.expirationTime<=z);if(z=r.unstable_now(),typeof bt=="function"){_.callback=bt,U(z),Q=!0;break e}_===i(m)&&s(m),U(z)}else s(m);_=i(m)}if(_!==null)Q=!0;else{var N=i(p);N!==null&&gt(J,N.startTime-z),Q=!1}}break t}finally{_=null,S=K,M=!1}Q=void 0}}finally{Q?j():V=!1}}}var j;if(typeof O=="function")j=function(){O(w)};else if(typeof MessageChannel<"u"){var et=new MessageChannel,mt=et.port2;et.port1.onmessage=w,j=function(){mt.postMessage(null)}}else j=function(){y(w,0)};function gt(z,Q){P=y(function(){z(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return S},r.unstable_next=function(z){switch(S){case 1:case 2:case 3:var Q=3;break;default:Q=S}var K=S;S=Q;try{return z()}finally{S=K}},r.unstable_requestPaint=function(){x=!0},r.unstable_runWithPriority=function(z,Q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=S;S=z;try{return Q()}finally{S=K}},r.unstable_scheduleCallback=function(z,Q,K){var xt=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?xt+K:xt):K=xt,z){case 1:var bt=-1;break;case 2:bt=250;break;case 5:bt=1073741823;break;case 4:bt=1e4;break;default:bt=5e3}return bt=K+bt,z={id:g++,callback:Q,priorityLevel:z,startTime:K,expirationTime:bt,sortIndex:-1},K>xt?(z.sortIndex=K,t(p,z),i(m)===null&&z===i(p)&&(R?(I(P),P=-1):R=!0,gt(J,K-xt))):(z.sortIndex=bt,t(m,z),E||M||(E=!0,V||(V=!0,j()))),z},r.unstable_shouldYield=C,r.unstable_wrapCallback=function(z){var Q=S;return function(){var K=S;S=Q;try{return z.apply(this,arguments)}finally{S=K}}}})(xh)),xh}var $_;function _x(){return $_||($_=1,Sh.exports=gx()),Sh.exports}var Mh={exports:{}},zn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var t0;function vx(){if(t0)return zn;t0=1;var r=tp();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,g){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:g}}var h=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,zn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,g)},zn.flushSync=function(m){var p=h.T,g=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=g,s.d.f()}},zn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},zn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},zn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin),S=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:S,fetchPriority:M}):g==="script"&&s.d.X(m,{crossOrigin:_,integrity:S,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},zn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},zn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,_=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},zn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},zn.requestFormReset=function(m){s.d.r(m)},zn.unstable_batchedUpdates=function(m,p){return m(p)},zn.useFormState=function(m,p,g){return h.H.useFormState(m,p,g)},zn.useFormStatus=function(){return h.H.useHostTransitionStatus()},zn.version="19.2.8",zn}var e0;function yx(){if(e0)return Mh.exports;e0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Mh.exports=vx(),Mh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n0;function Sx(){if(n0)return Wo;n0=1;var r=_x(),t=tp(),i=yx();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),e;if(f===o)return m(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=f;else{for(var v=!1,b=u.child;b;){if(b===a){v=!0,a=u,o=f;break}if(b===o){v=!0,o=u,a=f;break}b=b.sibling}if(!v){for(b=f.child;b;){if(b===a){v=!0,a=f,o=u;break}if(b===o){v=!0,o=f,a=u;break}b=b.sibling}if(!v)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var _=Object.assign,S=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),R=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),O=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),W=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),w=Symbol.iterator;function j(e){return e===null||typeof e!="object"?null:(e=w&&e[w]||e["@@iterator"],typeof e=="function"?e:null)}var et=Symbol.for("react.client.reference");function mt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===et?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case R:return"Fragment";case y:return"Profiler";case x:return"StrictMode";case J:return"Suspense";case V:return"SuspenseList";case D:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case O:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case U:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:mt(e.type)||"Memo";case W:n=e._payload,e=e._init;try{return mt(e(n))}catch{}}return null}var gt=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},xt=[],bt=-1;function N(e){return{current:e}}function at(e){0>bt||(e.current=xt[bt],xt[bt]=null,bt--)}function St(e,n){bt++,xt[bt]=e.current,e.current=n}var Z=N(null),ct=N(null),Et=N(null),yt=N(null);function Gt(e,n){switch(St(Et,n),St(ct,e),St(Z,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?__(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=__(n),e=v_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}at(Z),St(Z,e)}function Ft(){at(Z),at(ct),at(Et)}function ie(e){e.memoizedState!==null&&St(yt,e);var n=Z.current,a=v_(n,e.type);n!==a&&(St(ct,e),St(Z,a))}function Be(e){ct.current===e&&(at(Z),at(ct)),yt.current===e&&(at(yt),Ho._currentValue=K)}var me,Qe;function H(e){if(me===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);me=n&&n[1]||"",Qe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+me+e+Qe}var On=!1;function de(e,n){if(!e||On)return"";On=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(ot){var nt=ot}Reflect.construct(e,[],pt)}else{try{pt.call()}catch(ot){nt=ot}e.call(pt.prototype)}}else{try{throw Error()}catch(ot){nt=ot}(pt=e())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(ot){if(ot&&nt&&typeof ot.stack=="string")return[ot.stack,nt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),v=f[0],b=f[1];if(v&&b){var B=v.split(`
`),tt=b.split(`
`);for(u=o=0;o<B.length&&!B[o].includes("DetermineComponentFrameRoot");)o++;for(;u<tt.length&&!tt[u].includes("DetermineComponentFrameRoot");)u++;if(o===B.length||u===tt.length)for(o=B.length-1,u=tt.length-1;1<=o&&0<=u&&B[o]!==tt[u];)u--;for(;1<=o&&0<=u;o--,u--)if(B[o]!==tt[u]){if(o!==1||u!==1)do if(o--,u--,0>u||B[o]!==tt[u]){var ut=`
`+B[o].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=o&&0<=u);break}}}finally{On=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?H(a):""}function ye(e,n){switch(e.tag){case 26:case 27:case 5:return H(e.type);case 16:return H("Lazy");case 13:return e.child!==n&&n!==null?H("Suspense Fallback"):H("Suspense");case 19:return H("SuspenseList");case 0:case 15:return de(e.type,!1);case 11:return de(e.type.render,!1);case 1:return de(e.type,!0);case 31:return H("Activity");default:return""}}function qt(e){try{var n="",a=null;do n+=ye(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Oe=Object.prototype.hasOwnProperty,Wt=r.unstable_scheduleCallback,L=r.unstable_cancelCallback,T=r.unstable_shouldYield,it=r.unstable_requestPaint,ft=r.unstable_now,Mt=r.unstable_getCurrentPriorityLevel,dt=r.unstable_ImmediatePriority,kt=r.unstable_UserBlockingPriority,wt=r.unstable_NormalPriority,zt=r.unstable_LowPriority,Se=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Yt=null,Xt=null;function Nt(e){if(typeof At=="function"&&Bt(e),Xt&&typeof Xt.setStrictMode=="function")try{Xt.setStrictMode(Yt,e)}catch{}}var $t=Math.clz32?Math.clz32:k,oe=Math.log,Ie=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(oe(e)/Ie|0)|0}var Rt=256,lt=262144,_t=4194304;function Ct(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Dt(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,f=e.suspendedLanes,v=e.pingedLanes;e=e.warmLanes;var b=o&134217727;return b!==0?(o=b&~f,o!==0?u=Ct(o):(v&=b,v!==0?u=Ct(v):a||(a=b&~e,a!==0&&(u=Ct(a))))):(b=o&~f,b!==0?u=Ct(b):v!==0?u=Ct(v):a||(a=o&~e,a!==0&&(u=Ct(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function te(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Je(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function mn(){var e=_t;return _t<<=1,(_t&62914560)===0&&(_t=4194304),e}function Ae(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function An(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function bi(e,n,a,o,u,f){var v=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var b=e.entanglements,B=e.expirationTimes,tt=e.hiddenUpdates;for(a=v&~a;0<a;){var ut=31-$t(a),pt=1<<ut;b[ut]=0,B[ut]=-1;var nt=tt[ut];if(nt!==null)for(tt[ut]=null,ut=0;ut<nt.length;ut++){var ot=nt[ut];ot!==null&&(ot.lane&=-536870913)}a&=~pt}o!==0&&Jr(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(v&~n))}function Jr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-$t(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function $r(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-$t(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function zi(e,n){var a=n&-n;return a=(a&42)!==0?1:ns(a),(a&(e.suspendedLanes|n))!==0?0:a}function ns(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Hs(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function to(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:G_(e.type))}function is(e,n){var a=Q.p;try{return Q.p=e,n()}finally{Q.p=a}}var Ti=Math.random().toString(36).slice(2),en="__reactFiber$"+Ti,Rn="__reactProps$"+Ti,Yi="__reactContainer$"+Ti,eo="__reactEvents$"+Ti,uu="__reactListeners$"+Ti,fu="__reactHandles$"+Ti,rl="__reactResources$"+Ti,as="__reactMarker$"+Ti;function A(e){delete e[en],delete e[Rn],delete e[eo],delete e[uu],delete e[fu]}function X(e){var n=e[en];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Yi]||a[en]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=T_(e);e!==null;){if(a=e[en])return a;e=T_(e)}return n}e=a,a=e.parentNode}return null}function st(e){if(e=e[en]||e[Yi]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function rt(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function q(e){var n=e[rl];return n||(n=e[rl]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vt(e){e[as]=!0}var Ut=new Set,Pt={};function Ot(e,n){Kt(e,n),Kt(e+"Capture",n)}function Kt(e,n){for(Pt[e]=n,e=0;e<n.length;e++)Ut.add(n[e])}var ee=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jt={},xe={};function Re(e){return Oe.call(xe,e)?!0:Oe.call(jt,e)?!1:ee.test(e)?xe[e]=!0:(jt[e]=!0,!1)}function Ye(e,n,a){if(Re(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function We(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function le(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function Ht(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function cn(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ce(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(v){a=""+v,f.call(this,v)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(v){a=""+v},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Fn(e){if(!e._valueTracker){var n=cn(e)?"checked":"value";e._valueTracker=Ce(e,n,""+e[n])}}function ji(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=cn(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Mn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var ss=/[\n"\\]/g;function ge(e){return e.replace(ss,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Pn(e,n,a,o,u,f,v,b){e.name="",v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?e.type=v:e.removeAttribute("type"),n!=null?v==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ht(n)):e.value!==""+Ht(n)&&(e.value=""+Ht(n)):v!=="submit"&&v!=="reset"||e.removeAttribute("value"),n!=null?gn(e,v,Ht(n)):a!=null?gn(e,v,Ht(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?e.name=""+Ht(b):e.removeAttribute("name")}function Hn(e,n,a,o,u,f,v,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Fn(e);return}a=a!=null?""+Ht(a):"",n=n!=null?""+Ht(n):a,b||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=b?e.checked:!!o,e.defaultChecked=!!o,v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"&&(e.name=v),Fn(e)}function gn(e,n,a){n==="number"&&Mn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function rn(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+Ht(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Gs(e,n,a){if(n!=null&&(n=""+Ht(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Ht(a):""}function Bi(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(gt(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=Ht(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Fn(e)}function Vs(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var ry=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function pp(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||ry.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function mp(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&pp(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&pp(e,f,n[f])}function hu(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var oy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ly=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ol(e){return ly.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Zi(){}var du=null;function pu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ks=null,Xs=null;function gp(e){var n=st(e);if(n&&(e=n.stateNode)){var a=e[Rn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Pn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ge(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[Rn]||null;if(!u)throw Error(s(90));Pn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&ji(o)}break t;case"textarea":Gs(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&rn(e,!!a.multiple,n,!1)}}}var mu=!1;function _p(e,n,a){if(mu)return e(n,a);mu=!0;try{var o=e(n);return o}finally{if(mu=!1,(ks!==null||Xs!==null)&&(jl(),ks&&(n=ks,e=Xs,Xs=ks=null,gp(n),e)))for(n=0;n<e.length;n++)gp(e[n])}}function no(e,n){var a=e.stateNode;if(a===null)return null;var o=a[Rn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),gu=!1;if(Ki)try{var io={};Object.defineProperty(io,"passive",{get:function(){gu=!0}}),window.addEventListener("test",io,io),window.removeEventListener("test",io,io)}catch{gu=!1}var Ma=null,_u=null,ll=null;function vp(){if(ll)return ll;var e,n=_u,a=n.length,o,u="value"in Ma?Ma.value:Ma.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var v=a-e;for(o=1;o<=v&&n[a-o]===u[f-o];o++);return ll=u.slice(e,1<o?1-o:void 0)}function cl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function ul(){return!0}function yp(){return!1}function Wn(e){function n(a,o,u,f,v){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=v,this.currentTarget=null;for(var b in e)e.hasOwnProperty(b)&&(a=e[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?ul:yp,this.isPropagationStopped=yp,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ul)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ul)},persist:function(){},isPersistent:ul}),n}var rs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fl=Wn(rs),ao=_({},rs,{view:0,detail:0}),cy=Wn(ao),vu,yu,so,hl=_({},ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==so&&(so&&e.type==="mousemove"?(vu=e.screenX-so.screenX,yu=e.screenY-so.screenY):yu=vu=0,so=e),vu)},movementY:function(e){return"movementY"in e?e.movementY:yu}}),Sp=Wn(hl),uy=_({},hl,{dataTransfer:0}),fy=Wn(uy),hy=_({},ao,{relatedTarget:0}),Su=Wn(hy),dy=_({},rs,{animationName:0,elapsedTime:0,pseudoElement:0}),py=Wn(dy),my=_({},rs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),gy=Wn(my),_y=_({},rs,{data:0}),xp=Wn(_y),vy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},yy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Sy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xy(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Sy[e])?!!n[e]:!1}function xu(){return xy}var My=_({},ao,{key:function(e){if(e.key){var n=vy[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?yy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xu,charCode:function(e){return e.type==="keypress"?cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ey=Wn(My),by=_({},hl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mp=Wn(by),Ty=_({},ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xu}),Ay=Wn(Ty),Ry=_({},rs,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cy=Wn(Ry),wy=_({},hl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dy=Wn(wy),Uy=_({},rs,{newState:0,oldState:0}),Ly=Wn(Uy),Ny=[9,13,27,32],Mu=Ki&&"CompositionEvent"in window,ro=null;Ki&&"documentMode"in document&&(ro=document.documentMode);var Oy=Ki&&"TextEvent"in window&&!ro,Ep=Ki&&(!Mu||ro&&8<ro&&11>=ro),bp=" ",Tp=!1;function Ap(e,n){switch(e){case"keyup":return Ny.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ws=!1;function Py(e,n){switch(e){case"compositionend":return Rp(n);case"keypress":return n.which!==32?null:(Tp=!0,bp);case"textInput":return e=n.data,e===bp&&Tp?null:e;default:return null}}function zy(e,n){if(Ws)return e==="compositionend"||!Mu&&Ap(e,n)?(e=vp(),ll=_u=Ma=null,Ws=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ep&&n.locale!=="ko"?null:n.data;default:return null}}var By={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!By[e.type]:n==="textarea"}function wp(e,n,a,o){ks?Xs?Xs.push(o):Xs=[o]:ks=o,n=ec(n,"onChange"),0<n.length&&(a=new fl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var oo=null,lo=null;function Iy(e){f_(e,0)}function dl(e){var n=rt(e);if(ji(n))return e}function Dp(e,n){if(e==="change")return n}var Up=!1;if(Ki){var Eu;if(Ki){var bu="oninput"in document;if(!bu){var Lp=document.createElement("div");Lp.setAttribute("oninput","return;"),bu=typeof Lp.oninput=="function"}Eu=bu}else Eu=!1;Up=Eu&&(!document.documentMode||9<document.documentMode)}function Np(){oo&&(oo.detachEvent("onpropertychange",Op),lo=oo=null)}function Op(e){if(e.propertyName==="value"&&dl(lo)){var n=[];wp(n,lo,e,pu(e)),_p(Iy,n)}}function Fy(e,n,a){e==="focusin"?(Np(),oo=n,lo=a,oo.attachEvent("onpropertychange",Op)):e==="focusout"&&Np()}function Hy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return dl(lo)}function Gy(e,n){if(e==="click")return dl(n)}function Vy(e,n){if(e==="input"||e==="change")return dl(n)}function ky(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var ni=typeof Object.is=="function"?Object.is:ky;function co(e,n){if(ni(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Oe.call(n,u)||!ni(e[u],n[u]))return!1}return!0}function Pp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function zp(e,n){var a=Pp(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Pp(a)}}function Bp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Bp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ip(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Mn(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Mn(e.document)}return n}function Tu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Xy=Ki&&"documentMode"in document&&11>=document.documentMode,qs=null,Au=null,uo=null,Ru=!1;function Fp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ru||qs==null||qs!==Mn(o)||(o=qs,"selectionStart"in o&&Tu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),uo&&co(uo,o)||(uo=o,o=ec(Au,"onSelect"),0<o.length&&(n=new fl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=qs)))}function os(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Ys={animationend:os("Animation","AnimationEnd"),animationiteration:os("Animation","AnimationIteration"),animationstart:os("Animation","AnimationStart"),transitionrun:os("Transition","TransitionRun"),transitionstart:os("Transition","TransitionStart"),transitioncancel:os("Transition","TransitionCancel"),transitionend:os("Transition","TransitionEnd")},Cu={},Hp={};Ki&&(Hp=document.createElement("div").style,"AnimationEvent"in window||(delete Ys.animationend.animation,delete Ys.animationiteration.animation,delete Ys.animationstart.animation),"TransitionEvent"in window||delete Ys.transitionend.transition);function ls(e){if(Cu[e])return Cu[e];if(!Ys[e])return e;var n=Ys[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Hp)return Cu[e]=n[a];return e}var Gp=ls("animationend"),Vp=ls("animationiteration"),kp=ls("animationstart"),Wy=ls("transitionrun"),qy=ls("transitionstart"),Yy=ls("transitioncancel"),Xp=ls("transitionend"),Wp=new Map,wu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wu.push("scrollEnd");function Ai(e,n){Wp.set(e,n),Ot(n,[e])}var pl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},hi=[],js=0,Du=0;function ml(){for(var e=js,n=Du=js=0;n<e;){var a=hi[n];hi[n++]=null;var o=hi[n];hi[n++]=null;var u=hi[n];hi[n++]=null;var f=hi[n];if(hi[n++]=null,o!==null&&u!==null){var v=o.pending;v===null?u.next=u:(u.next=v.next,v.next=u),o.pending=u}f!==0&&qp(a,u,f)}}function gl(e,n,a,o){hi[js++]=e,hi[js++]=n,hi[js++]=a,hi[js++]=o,Du|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Uu(e,n,a,o){return gl(e,n,a,o),_l(e)}function cs(e,n){return gl(e,null,null,n),_l(e)}function qp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-$t(a),e=f.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function _l(e){if(50<No)throw No=0,Gf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Zs={};function jy(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,n,a,o){return new jy(e,n,a,o)}function Lu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qi(e,n){var a=e.alternate;return a===null?(a=ii(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Yp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function vl(e,n,a,o,u,f){var v=0;if(o=e,typeof e=="function")Lu(e)&&(v=1);else if(typeof e=="string")v=$S(e,a,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case D:return e=ii(31,a,n,u),e.elementType=D,e.lanes=f,e;case R:return us(a.children,u,f,n);case x:v=8,u|=24;break;case y:return e=ii(12,a,n,u|2),e.elementType=y,e.lanes=f,e;case J:return e=ii(13,a,n,u),e.elementType=J,e.lanes=f,e;case V:return e=ii(19,a,n,u),e.elementType=V,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case O:v=10;break t;case I:v=9;break t;case U:v=11;break t;case P:v=14;break t;case W:v=16,o=null;break t}v=29,a=Error(s(130,e===null?"null":typeof e,"")),o=null}return n=ii(v,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function us(e,n,a,o){return e=ii(7,e,o,n),e.lanes=a,e}function Nu(e,n,a){return e=ii(6,e,null,n),e.lanes=a,e}function jp(e){var n=ii(18,null,null,0);return n.stateNode=e,n}function Ou(e,n,a){return n=ii(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Zp=new WeakMap;function di(e,n){if(typeof e=="object"&&e!==null){var a=Zp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:qt(n)},Zp.set(e,n),n)}return{value:e,source:n,stack:qt(n)}}var Ks=[],Qs=0,yl=null,fo=0,pi=[],mi=0,Ea=null,Ii=1,Fi="";function Ji(e,n){Ks[Qs++]=fo,Ks[Qs++]=yl,yl=e,fo=n}function Kp(e,n,a){pi[mi++]=Ii,pi[mi++]=Fi,pi[mi++]=Ea,Ea=e;var o=Ii;e=Fi;var u=32-$t(o)-1;o&=~(1<<u),a+=1;var f=32-$t(n)+u;if(30<f){var v=u-u%5;f=(o&(1<<v)-1).toString(32),o>>=v,u-=v,Ii=1<<32-$t(n)+u|a<<u|o,Fi=f+e}else Ii=1<<f|a<<u|o,Fi=e}function Pu(e){e.return!==null&&(Ji(e,1),Kp(e,1,0))}function zu(e){for(;e===yl;)yl=Ks[--Qs],Ks[Qs]=null,fo=Ks[--Qs],Ks[Qs]=null;for(;e===Ea;)Ea=pi[--mi],pi[mi]=null,Fi=pi[--mi],pi[mi]=null,Ii=pi[--mi],pi[mi]=null}function Qp(e,n){pi[mi++]=Ii,pi[mi++]=Fi,pi[mi++]=Ea,Ii=n.id,Fi=n.overflow,Ea=e}var Cn=null,je=null,be=!1,ba=null,gi=!1,Bu=Error(s(519));function Ta(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ho(di(n,e)),Bu}function Jp(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[en]=e,n[Rn]=o,a){case"dialog":ve("cancel",n),ve("close",n);break;case"iframe":case"object":case"embed":ve("load",n);break;case"video":case"audio":for(a=0;a<Po.length;a++)ve(Po[a],n);break;case"source":ve("error",n);break;case"img":case"image":case"link":ve("error",n),ve("load",n);break;case"details":ve("toggle",n);break;case"input":ve("invalid",n),Hn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":ve("invalid",n);break;case"textarea":ve("invalid",n),Bi(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||m_(n.textContent,a)?(o.popover!=null&&(ve("beforetoggle",n),ve("toggle",n)),o.onScroll!=null&&ve("scroll",n),o.onScrollEnd!=null&&ve("scrollend",n),o.onClick!=null&&(n.onclick=Zi),n=!0):n=!1,n||Ta(e,!0)}function $p(e){for(Cn=e.return;Cn;)switch(Cn.tag){case 5:case 31:case 13:gi=!1;return;case 27:case 3:gi=!0;return;default:Cn=Cn.return}}function Js(e){if(e!==Cn)return!1;if(!be)return $p(e),be=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||nh(e.type,e.memoizedProps)),a=!a),a&&je&&Ta(e),$p(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=b_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));je=b_(e)}else n===27?(n=je,Fa(e.type)?(e=oh,oh=null,je=e):je=n):je=Cn?vi(e.stateNode.nextSibling):null;return!0}function fs(){je=Cn=null,be=!1}function Iu(){var e=ba;return e!==null&&(Zn===null?Zn=e:Zn.push.apply(Zn,e),ba=null),e}function ho(e){ba===null?ba=[e]:ba.push(e)}var Fu=N(null),hs=null,$i=null;function Aa(e,n,a){St(Fu,n._currentValue),n._currentValue=a}function ta(e){e._currentValue=Fu.current,at(Fu)}function Hu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Gu(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var v=u.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=u;for(var B=0;B<n.length;B++)if(b.context===n[B]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),Hu(f.return,a,e),o||(v=null);break t}f=b.next}}else if(u.tag===18){if(v=u.return,v===null)throw Error(s(341));v.lanes|=a,f=v.alternate,f!==null&&(f.lanes|=a),Hu(v,a,e),v=null}else v=u.child;if(v!==null)v.return=u;else for(v=u;v!==null;){if(v===e){v=null;break}if(u=v.sibling,u!==null){u.return=v.return,v=u;break}v=v.return}u=v}}function $s(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var v=u.alternate;if(v===null)throw Error(s(387));if(v=v.memoizedProps,v!==null){var b=u.type;ni(u.pendingProps.value,v.value)||(e!==null?e.push(b):e=[b])}}else if(u===yt.current){if(v=u.alternate,v===null)throw Error(s(387));v.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Ho):e=[Ho])}u=u.return}e!==null&&Gu(n,e,a,o),n.flags|=262144}function Sl(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ds(e){hs=e,$i=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function wn(e){return tm(hs,e)}function xl(e,n){return hs===null&&ds(e),tm(e,n)}function tm(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},$i===null){if(e===null)throw Error(s(308));$i=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else $i=$i.next=n;return a}var Zy=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Ky=r.unstable_scheduleCallback,Qy=r.unstable_NormalPriority,un={$$typeof:O,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Vu(){return{controller:new Zy,data:new Map,refCount:0}}function po(e){e.refCount--,e.refCount===0&&Ky(Qy,function(){e.controller.abort()})}var mo=null,ku=0,tr=0,er=null;function Jy(e,n){if(mo===null){var a=mo=[];ku=0,tr=Yf(),er={status:"pending",value:void 0,then:function(o){a.push(o)}}}return ku++,n.then(em,em),n}function em(){if(--ku===0&&mo!==null){er!==null&&(er.status="fulfilled");var e=mo;mo=null,tr=0,er=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function $y(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var nm=z.S;z.S=function(e,n){Fg=ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Jy(e,n),nm!==null&&nm(e,n)};var ps=N(null);function Xu(){var e=ps.current;return e!==null?e:qe.pooledCache}function Ml(e,n){n===null?St(ps,ps.current):St(ps,n.pool)}function im(){var e=Xu();return e===null?null:{parent:un._currentValue,pool:e}}var nr=Error(s(460)),Wu=Error(s(474)),El=Error(s(542)),bl={then:function(){}};function am(e){return e=e.status,e==="fulfilled"||e==="rejected"}function sm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Zi,Zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,om(e),e;default:if(typeof n.status=="string")n.then(Zi,Zi);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,om(e),e}throw gs=n,nr}}function ms(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(gs=a,nr):a}}var gs=null;function rm(){if(gs===null)throw Error(s(459));var e=gs;return gs=null,e}function om(e){if(e===nr||e===El)throw Error(s(483))}var ir=null,go=0;function Tl(e){var n=go;return go+=1,ir===null&&(ir=[]),sm(ir,e,n)}function _o(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Al(e,n){throw n.$$typeof===S?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function lm(e){function n(Y,G){if(e){var $=Y.deletions;$===null?(Y.deletions=[G],Y.flags|=16):$.push(G)}}function a(Y,G){if(!e)return null;for(;G!==null;)n(Y,G),G=G.sibling;return null}function o(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function u(Y,G){return Y=Qi(Y,G),Y.index=0,Y.sibling=null,Y}function f(Y,G,$){return Y.index=$,e?($=Y.alternate,$!==null?($=$.index,$<G?(Y.flags|=67108866,G):$):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function v(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function b(Y,G,$,ht){return G===null||G.tag!==6?(G=Nu($,Y.mode,ht),G.return=Y,G):(G=u(G,$),G.return=Y,G)}function B(Y,G,$,ht){var Zt=$.type;return Zt===R?ut(Y,G,$.props.children,ht,$.key):G!==null&&(G.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===W&&ms(Zt)===G.type)?(G=u(G,$.props),_o(G,$),G.return=Y,G):(G=vl($.type,$.key,$.props,null,Y.mode,ht),_o(G,$),G.return=Y,G)}function tt(Y,G,$,ht){return G===null||G.tag!==4||G.stateNode.containerInfo!==$.containerInfo||G.stateNode.implementation!==$.implementation?(G=Ou($,Y.mode,ht),G.return=Y,G):(G=u(G,$.children||[]),G.return=Y,G)}function ut(Y,G,$,ht,Zt){return G===null||G.tag!==7?(G=us($,Y.mode,ht,Zt),G.return=Y,G):(G=u(G,$),G.return=Y,G)}function pt(Y,G,$){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=Nu(""+G,Y.mode,$),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return $=vl(G.type,G.key,G.props,null,Y.mode,$),_o($,G),$.return=Y,$;case E:return G=Ou(G,Y.mode,$),G.return=Y,G;case W:return G=ms(G),pt(Y,G,$)}if(gt(G)||j(G))return G=us(G,Y.mode,$,null),G.return=Y,G;if(typeof G.then=="function")return pt(Y,Tl(G),$);if(G.$$typeof===O)return pt(Y,xl(Y,G),$);Al(Y,G)}return null}function nt(Y,G,$,ht){var Zt=G!==null?G.key:null;if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return Zt!==null?null:b(Y,G,""+$,ht);if(typeof $=="object"&&$!==null){switch($.$$typeof){case M:return $.key===Zt?B(Y,G,$,ht):null;case E:return $.key===Zt?tt(Y,G,$,ht):null;case W:return $=ms($),nt(Y,G,$,ht)}if(gt($)||j($))return Zt!==null?null:ut(Y,G,$,ht,null);if(typeof $.then=="function")return nt(Y,G,Tl($),ht);if($.$$typeof===O)return nt(Y,G,xl(Y,$),ht);Al(Y,$)}return null}function ot(Y,G,$,ht,Zt){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return Y=Y.get($)||null,b(G,Y,""+ht,Zt);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case M:return Y=Y.get(ht.key===null?$:ht.key)||null,B(G,Y,ht,Zt);case E:return Y=Y.get(ht.key===null?$:ht.key)||null,tt(G,Y,ht,Zt);case W:return ht=ms(ht),ot(Y,G,$,ht,Zt)}if(gt(ht)||j(ht))return Y=Y.get($)||null,ut(G,Y,ht,Zt,null);if(typeof ht.then=="function")return ot(Y,G,$,Tl(ht),Zt);if(ht.$$typeof===O)return ot(Y,G,$,xl(G,ht),Zt);Al(G,ht)}return null}function It(Y,G,$,ht){for(var Zt=null,we=null,Vt=G,ue=G=0,Ee=null;Vt!==null&&ue<$.length;ue++){Vt.index>ue?(Ee=Vt,Vt=null):Ee=Vt.sibling;var De=nt(Y,Vt,$[ue],ht);if(De===null){Vt===null&&(Vt=Ee);break}e&&Vt&&De.alternate===null&&n(Y,Vt),G=f(De,G,ue),we===null?Zt=De:we.sibling=De,we=De,Vt=Ee}if(ue===$.length)return a(Y,Vt),be&&Ji(Y,ue),Zt;if(Vt===null){for(;ue<$.length;ue++)Vt=pt(Y,$[ue],ht),Vt!==null&&(G=f(Vt,G,ue),we===null?Zt=Vt:we.sibling=Vt,we=Vt);return be&&Ji(Y,ue),Zt}for(Vt=o(Vt);ue<$.length;ue++)Ee=ot(Vt,Y,ue,$[ue],ht),Ee!==null&&(e&&Ee.alternate!==null&&Vt.delete(Ee.key===null?ue:Ee.key),G=f(Ee,G,ue),we===null?Zt=Ee:we.sibling=Ee,we=Ee);return e&&Vt.forEach(function(Xa){return n(Y,Xa)}),be&&Ji(Y,ue),Zt}function Qt(Y,G,$,ht){if($==null)throw Error(s(151));for(var Zt=null,we=null,Vt=G,ue=G=0,Ee=null,De=$.next();Vt!==null&&!De.done;ue++,De=$.next()){Vt.index>ue?(Ee=Vt,Vt=null):Ee=Vt.sibling;var Xa=nt(Y,Vt,De.value,ht);if(Xa===null){Vt===null&&(Vt=Ee);break}e&&Vt&&Xa.alternate===null&&n(Y,Vt),G=f(Xa,G,ue),we===null?Zt=Xa:we.sibling=Xa,we=Xa,Vt=Ee}if(De.done)return a(Y,Vt),be&&Ji(Y,ue),Zt;if(Vt===null){for(;!De.done;ue++,De=$.next())De=pt(Y,De.value,ht),De!==null&&(G=f(De,G,ue),we===null?Zt=De:we.sibling=De,we=De);return be&&Ji(Y,ue),Zt}for(Vt=o(Vt);!De.done;ue++,De=$.next())De=ot(Vt,Y,ue,De.value,ht),De!==null&&(e&&De.alternate!==null&&Vt.delete(De.key===null?ue:De.key),G=f(De,G,ue),we===null?Zt=De:we.sibling=De,we=De);return e&&Vt.forEach(function(ux){return n(Y,ux)}),be&&Ji(Y,ue),Zt}function Ge(Y,G,$,ht){if(typeof $=="object"&&$!==null&&$.type===R&&$.key===null&&($=$.props.children),typeof $=="object"&&$!==null){switch($.$$typeof){case M:t:{for(var Zt=$.key;G!==null;){if(G.key===Zt){if(Zt=$.type,Zt===R){if(G.tag===7){a(Y,G.sibling),ht=u(G,$.props.children),ht.return=Y,Y=ht;break t}}else if(G.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===W&&ms(Zt)===G.type){a(Y,G.sibling),ht=u(G,$.props),_o(ht,$),ht.return=Y,Y=ht;break t}a(Y,G);break}else n(Y,G);G=G.sibling}$.type===R?(ht=us($.props.children,Y.mode,ht,$.key),ht.return=Y,Y=ht):(ht=vl($.type,$.key,$.props,null,Y.mode,ht),_o(ht,$),ht.return=Y,Y=ht)}return v(Y);case E:t:{for(Zt=$.key;G!==null;){if(G.key===Zt)if(G.tag===4&&G.stateNode.containerInfo===$.containerInfo&&G.stateNode.implementation===$.implementation){a(Y,G.sibling),ht=u(G,$.children||[]),ht.return=Y,Y=ht;break t}else{a(Y,G);break}else n(Y,G);G=G.sibling}ht=Ou($,Y.mode,ht),ht.return=Y,Y=ht}return v(Y);case W:return $=ms($),Ge(Y,G,$,ht)}if(gt($))return It(Y,G,$,ht);if(j($)){if(Zt=j($),typeof Zt!="function")throw Error(s(150));return $=Zt.call($),Qt(Y,G,$,ht)}if(typeof $.then=="function")return Ge(Y,G,Tl($),ht);if($.$$typeof===O)return Ge(Y,G,xl(Y,$),ht);Al(Y,$)}return typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint"?($=""+$,G!==null&&G.tag===6?(a(Y,G.sibling),ht=u(G,$),ht.return=Y,Y=ht):(a(Y,G),ht=Nu($,Y.mode,ht),ht.return=Y,Y=ht),v(Y)):a(Y,G)}return function(Y,G,$,ht){try{go=0;var Zt=Ge(Y,G,$,ht);return ir=null,Zt}catch(Vt){if(Vt===nr||Vt===El)throw Vt;var we=ii(29,Vt,null,Y.mode);return we.lanes=ht,we.return=Y,we}finally{}}}var _s=lm(!0),cm=lm(!1),Ra=!1;function qu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Yu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ca(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function wa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Le&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=_l(e),qp(e,null,a),n}return gl(e,o,n,a),_l(e)}function vo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,$r(e,a)}}function ju(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var v={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=v:f=f.next=v,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Zu=!1;function yo(){if(Zu){var e=er;if(e!==null)throw e}}function So(e,n,a,o){Zu=!1;var u=e.updateQueue;Ra=!1;var f=u.firstBaseUpdate,v=u.lastBaseUpdate,b=u.shared.pending;if(b!==null){u.shared.pending=null;var B=b,tt=B.next;B.next=null,v===null?f=tt:v.next=tt,v=B;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,b=ut.lastBaseUpdate,b!==v&&(b===null?ut.firstBaseUpdate=tt:b.next=tt,ut.lastBaseUpdate=B))}if(f!==null){var pt=u.baseState;v=0,ut=tt=B=null,b=f;do{var nt=b.lane&-536870913,ot=nt!==b.lane;if(ot?(Me&nt)===nt:(o&nt)===nt){nt!==0&&nt===tr&&(Zu=!0),ut!==null&&(ut=ut.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var It=e,Qt=b;nt=n;var Ge=a;switch(Qt.tag){case 1:if(It=Qt.payload,typeof It=="function"){pt=It.call(Ge,pt,nt);break t}pt=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Qt.payload,nt=typeof It=="function"?It.call(Ge,pt,nt):It,nt==null)break t;pt=_({},pt,nt);break t;case 2:Ra=!0}}nt=b.callback,nt!==null&&(e.flags|=64,ot&&(e.flags|=8192),ot=u.callbacks,ot===null?u.callbacks=[nt]:ot.push(nt))}else ot={lane:nt,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ut===null?(tt=ut=ot,B=pt):ut=ut.next=ot,v|=nt;if(b=b.next,b===null){if(b=u.shared.pending,b===null)break;ot=b,b=ot.next,ot.next=null,u.lastBaseUpdate=ot,u.shared.pending=null}}while(!0);ut===null&&(B=pt),u.baseState=B,u.firstBaseUpdate=tt,u.lastBaseUpdate=ut,f===null&&(u.shared.lanes=0),Oa|=v,e.lanes=v,e.memoizedState=pt}}function um(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function fm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)um(a[e],n)}var ar=N(null),Rl=N(0);function hm(e,n){e=ca,St(Rl,e),St(ar,n),ca=e|n.baseLanes}function Ku(){St(Rl,ca),St(ar,ar.current)}function Qu(){ca=Rl.current,at(ar),at(Rl)}var ai=N(null),_i=null;function Da(e){var n=e.alternate;St(on,on.current&1),St(ai,e),_i===null&&(n===null||ar.current!==null||n.memoizedState!==null)&&(_i=e)}function Ju(e){St(on,on.current),St(ai,e),_i===null&&(_i=e)}function dm(e){e.tag===22?(St(on,on.current),St(ai,e),_i===null&&(_i=e)):Ua()}function Ua(){St(on,on.current),St(ai,ai.current)}function si(e){at(ai),_i===e&&(_i=null),at(on)}var on=N(0);function Cl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||sh(a)||rh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ea=0,ce=null,Fe=null,fn=null,wl=!1,sr=!1,vs=!1,Dl=0,xo=0,rr=null,tS=0;function nn(){throw Error(s(321))}function $u(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!ni(e[a],n[a]))return!1;return!0}function tf(e,n,a,o,u,f){return ea=f,ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,z.H=e===null||e.memoizedState===null?Km:gf,vs=!1,f=a(o,u),vs=!1,sr&&(f=mm(n,a,o,u)),pm(e),f}function pm(e){z.H=bo;var n=Fe!==null&&Fe.next!==null;if(ea=0,fn=Fe=ce=null,wl=!1,xo=0,rr=null,n)throw Error(s(300));e===null||hn||(e=e.dependencies,e!==null&&Sl(e)&&(hn=!0))}function mm(e,n,a,o){ce=e;var u=0;do{if(sr&&(rr=null),xo=0,sr=!1,25<=u)throw Error(s(301));if(u+=1,fn=Fe=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}z.H=Qm,f=n(a,o)}while(sr);return f}function eS(){var e=z.H,n=e.useState()[0];return n=typeof n.then=="function"?Mo(n):n,e=e.useState()[0],(Fe!==null?Fe.memoizedState:null)!==e&&(ce.flags|=1024),n}function ef(){var e=Dl!==0;return Dl=0,e}function nf(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function af(e){if(wl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}wl=!1}ea=0,fn=Fe=ce=null,sr=!1,xo=Dl=0,rr=null}function Gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?ce.memoizedState=fn=e:fn=fn.next=e,fn}function ln(){if(Fe===null){var e=ce.alternate;e=e!==null?e.memoizedState:null}else e=Fe.next;var n=fn===null?ce.memoizedState:fn.next;if(n!==null)fn=n,Fe=e;else{if(e===null)throw ce.alternate===null?Error(s(467)):Error(s(310));Fe=e,e={memoizedState:Fe.memoizedState,baseState:Fe.baseState,baseQueue:Fe.baseQueue,queue:Fe.queue,next:null},fn===null?ce.memoizedState=fn=e:fn=fn.next=e}return fn}function Ul(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Mo(e){var n=xo;return xo+=1,rr===null&&(rr=[]),e=sm(rr,e,n),n=ce,(fn===null?n.memoizedState:fn.next)===null&&(n=n.alternate,z.H=n===null||n.memoizedState===null?Km:gf),e}function Ll(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Mo(e);if(e.$$typeof===O)return wn(e)}throw Error(s(438,String(e)))}function sf(e){var n=null,a=ce.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ce.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ul(),ce.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=C;return n.index++,a}function na(e,n){return typeof n=="function"?n(e):n}function Nl(e){var n=ln();return rf(n,Fe,e)}function rf(e,n,a){var o=e.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var v=u.next;u.next=f.next,f.next=v}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var b=v=null,B=null,tt=n,ut=!1;do{var pt=tt.lane&-536870913;if(pt!==tt.lane?(Me&pt)===pt:(ea&pt)===pt){var nt=tt.revertLane;if(nt===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),pt===tr&&(ut=!0);else if((ea&nt)===nt){tt=tt.next,nt===tr&&(ut=!0);continue}else pt={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(b=B=pt,v=f):B=B.next=pt,ce.lanes|=nt,Oa|=nt;pt=tt.action,vs&&a(f,pt),f=tt.hasEagerState?tt.eagerState:a(f,pt)}else nt={lane:pt,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(b=B=nt,v=f):B=B.next=nt,ce.lanes|=pt,Oa|=pt;tt=tt.next}while(tt!==null&&tt!==n);if(B===null?v=f:B.next=b,!ni(f,e.memoizedState)&&(hn=!0,ut&&(a=er,a!==null)))throw a;e.memoizedState=f,e.baseState=v,e.baseQueue=B,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function of(e){var n=ln(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var v=u=u.next;do f=e(f,v.action),v=v.next;while(v!==u);ni(f,n.memoizedState)||(hn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function gm(e,n,a){var o=ce,u=ln(),f=be;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var v=!ni((Fe||u).memoizedState,a);if(v&&(u.memoizedState=a,hn=!0),u=u.queue,uf(ym.bind(null,o,u,e),[e]),u.getSnapshot!==n||v||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,or(9,{destroy:void 0},vm.bind(null,o,u,a,n),null),qe===null)throw Error(s(349));f||(ea&127)!==0||_m(o,n,a)}return a}function _m(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ce.updateQueue,n===null?(n=Ul(),ce.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function vm(e,n,a,o){n.value=a,n.getSnapshot=o,Sm(n)&&xm(e)}function ym(e,n,a){return a(function(){Sm(n)&&xm(e)})}function Sm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!ni(e,a)}catch{return!0}}function xm(e){var n=cs(e,2);n!==null&&Kn(n,e,2)}function lf(e){var n=Gn();if(typeof e=="function"){var a=e;if(e=a(),vs){Nt(!0);try{a()}finally{Nt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:e},n}function Mm(e,n,a,o){return e.baseState=a,rf(e,Fe,typeof o=="function"?o:na)}function nS(e,n,a,o,u){if(zl(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(v){f.listeners.push(v)}};z.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,Em(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Em(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=z.T,v={};z.T=v;try{var b=a(u,o),B=z.S;B!==null&&B(v,b),bm(e,n,b)}catch(tt){cf(e,n,tt)}finally{f!==null&&v.types!==null&&(f.types=v.types),z.T=f}}else try{f=a(u,o),bm(e,n,f)}catch(tt){cf(e,n,tt)}}function bm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Tm(e,n,o)},function(o){return cf(e,n,o)}):Tm(e,n,a)}function Tm(e,n,a){n.status="fulfilled",n.value=a,Am(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,Em(e,a)))}function cf(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Am(n),n=n.next;while(n!==o)}e.action=null}function Am(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Rm(e,n){return n}function Cm(e,n){if(be){var a=qe.formState;if(a!==null){t:{var o=ce;if(be){if(je){e:{for(var u=je,f=gi;u.nodeType!==8;){if(!f){u=null;break e}if(u=vi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){je=vi(u.nextSibling),o=u.data==="F!";break t}}Ta(o)}o=!1}o&&(n=a[0])}}return a=Gn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rm,lastRenderedState:n},a.queue=o,a=Ym.bind(null,ce,o),o.dispatch=a,o=lf(!1),f=mf.bind(null,ce,!1,o.queue),o=Gn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=nS.bind(null,ce,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function wm(e){var n=ln();return Dm(n,Fe,e)}function Dm(e,n,a){if(n=rf(e,n,Rm)[0],e=Nl(na)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Mo(n)}catch(v){throw v===nr?El:v}else o=n;n=ln();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ce.flags|=2048,or(9,{destroy:void 0},iS.bind(null,u,a),null)),[o,f,e]}function iS(e,n){e.action=n}function Um(e){var n=ln(),a=Fe;if(a!==null)return Dm(n,a,e);ln(),n=n.memoizedState,a=ln();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function or(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ce.updateQueue,n===null&&(n=Ul(),ce.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Lm(){return ln().memoizedState}function Ol(e,n,a,o){var u=Gn();ce.flags|=e,u.memoizedState=or(1|n,{destroy:void 0},a,o===void 0?null:o)}function Pl(e,n,a,o){var u=ln();o=o===void 0?null:o;var f=u.memoizedState.inst;Fe!==null&&o!==null&&$u(o,Fe.memoizedState.deps)?u.memoizedState=or(n,f,a,o):(ce.flags|=e,u.memoizedState=or(1|n,f,a,o))}function Nm(e,n){Ol(8390656,8,e,n)}function uf(e,n){Pl(2048,8,e,n)}function aS(e){ce.flags|=4;var n=ce.updateQueue;if(n===null)n=Ul(),ce.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Om(e){var n=ln().memoizedState;return aS({ref:n,nextImpl:e}),function(){if((Le&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Pm(e,n){return Pl(4,2,e,n)}function zm(e,n){return Pl(4,4,e,n)}function Bm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Im(e,n,a){a=a!=null?a.concat([e]):null,Pl(4,4,Bm.bind(null,n,e),a)}function ff(){}function Fm(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&$u(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Hm(e,n){var a=ln();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&$u(n,o[1]))return o[0];if(o=e(),vs){Nt(!0);try{e()}finally{Nt(!1)}}return a.memoizedState=[o,n],o}function hf(e,n,a){return a===void 0||(ea&1073741824)!==0&&(Me&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=Gg(),ce.lanes|=e,Oa|=e,a)}function Gm(e,n,a,o){return ni(a,n)?a:ar.current!==null?(e=hf(e,a,o),ni(e,n)||(hn=!0),e):(ea&42)===0||(ea&1073741824)!==0&&(Me&261930)===0?(hn=!0,e.memoizedState=a):(e=Gg(),ce.lanes|=e,Oa|=e,n)}function Vm(e,n,a,o,u){var f=Q.p;Q.p=f!==0&&8>f?f:8;var v=z.T,b={};z.T=b,mf(e,!1,n,a);try{var B=u(),tt=z.S;if(tt!==null&&tt(b,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ut=$y(B,o);Eo(e,n,ut,li(e))}else Eo(e,n,o,li(e))}catch(pt){Eo(e,n,{then:function(){},status:"rejected",reason:pt},li())}finally{Q.p=f,v!==null&&b.types!==null&&(v.types=b.types),z.T=v}}function sS(){}function df(e,n,a,o){if(e.tag!==5)throw Error(s(476));var u=km(e).queue;Vm(e,u,n,K,a===null?sS:function(){return Xm(e),a(o)})}function km(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Xm(e){var n=km(e);n.next===null&&(n=e.alternate.memoizedState),Eo(e,n.next.queue,{},li())}function pf(){return wn(Ho)}function Wm(){return ln().memoizedState}function qm(){return ln().memoizedState}function rS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=li();e=Ca(a);var o=wa(n,e,a);o!==null&&(Kn(o,n,a),vo(o,n,a)),n={cache:Vu()},e.payload=n;return}n=n.return}}function oS(e,n,a){var o=li();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},zl(e)?jm(n,a):(a=Uu(e,n,a,o),a!==null&&(Kn(a,e,o),Zm(a,n,o)))}function Ym(e,n,a){var o=li();Eo(e,n,a,o)}function Eo(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(zl(e))jm(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var v=n.lastRenderedState,b=f(v,a);if(u.hasEagerState=!0,u.eagerState=b,ni(b,v))return gl(e,n,u,0),qe===null&&ml(),!1}catch{}finally{}if(a=Uu(e,n,u,o),a!==null)return Kn(a,e,o),Zm(a,n,o),!0}return!1}function mf(e,n,a,o){if(o={lane:2,revertLane:Yf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},zl(e)){if(n)throw Error(s(479))}else n=Uu(e,a,o,2),n!==null&&Kn(n,e,2)}function zl(e){var n=e.alternate;return e===ce||n!==null&&n===ce}function jm(e,n){sr=wl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Zm(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,$r(e,a)}}var bo={readContext:wn,use:Ll,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useLayoutEffect:nn,useInsertionEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useSyncExternalStore:nn,useId:nn,useHostTransitionStatus:nn,useFormState:nn,useActionState:nn,useOptimistic:nn,useMemoCache:nn,useCacheRefresh:nn};bo.useEffectEvent=nn;var Km={readContext:wn,use:Ll,useCallback:function(e,n){return Gn().memoizedState=[e,n===void 0?null:n],e},useContext:wn,useEffect:Nm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Ol(4194308,4,Bm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Ol(4194308,4,e,n)},useInsertionEffect:function(e,n){Ol(4,2,e,n)},useMemo:function(e,n){var a=Gn();n=n===void 0?null:n;var o=e();if(vs){Nt(!0);try{e()}finally{Nt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Gn();if(a!==void 0){var u=a(n);if(vs){Nt(!0);try{a(n)}finally{Nt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=oS.bind(null,ce,e),[o.memoizedState,e]},useRef:function(e){var n=Gn();return e={current:e},n.memoizedState=e},useState:function(e){e=lf(e);var n=e.queue,a=Ym.bind(null,ce,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:ff,useDeferredValue:function(e,n){var a=Gn();return hf(a,e,n)},useTransition:function(){var e=lf(!1);return e=Vm.bind(null,ce,e.queue,!0,!1),Gn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ce,u=Gn();if(be){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),qe===null)throw Error(s(349));(Me&127)!==0||_m(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Nm(ym.bind(null,o,f,e),[e]),o.flags|=2048,or(9,{destroy:void 0},vm.bind(null,o,f,a,n),null),a},useId:function(){var e=Gn(),n=qe.identifierPrefix;if(be){var a=Fi,o=Ii;a=(o&~(1<<32-$t(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Dl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=tS++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:pf,useFormState:Cm,useActionState:Cm,useOptimistic:function(e){var n=Gn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=mf.bind(null,ce,!0,a),a.dispatch=n,[e,n]},useMemoCache:sf,useCacheRefresh:function(){return Gn().memoizedState=rS.bind(null,ce)},useEffectEvent:function(e){var n=Gn(),a={impl:e};return n.memoizedState=a,function(){if((Le&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},gf={readContext:wn,use:Ll,useCallback:Fm,useContext:wn,useEffect:uf,useImperativeHandle:Im,useInsertionEffect:Pm,useLayoutEffect:zm,useMemo:Hm,useReducer:Nl,useRef:Lm,useState:function(){return Nl(na)},useDebugValue:ff,useDeferredValue:function(e,n){var a=ln();return Gm(a,Fe.memoizedState,e,n)},useTransition:function(){var e=Nl(na)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:Mo(e),n]},useSyncExternalStore:gm,useId:Wm,useHostTransitionStatus:pf,useFormState:wm,useActionState:wm,useOptimistic:function(e,n){var a=ln();return Mm(a,Fe,e,n)},useMemoCache:sf,useCacheRefresh:qm};gf.useEffectEvent=Om;var Qm={readContext:wn,use:Ll,useCallback:Fm,useContext:wn,useEffect:uf,useImperativeHandle:Im,useInsertionEffect:Pm,useLayoutEffect:zm,useMemo:Hm,useReducer:of,useRef:Lm,useState:function(){return of(na)},useDebugValue:ff,useDeferredValue:function(e,n){var a=ln();return Fe===null?hf(a,e,n):Gm(a,Fe.memoizedState,e,n)},useTransition:function(){var e=of(na)[0],n=ln().memoizedState;return[typeof e=="boolean"?e:Mo(e),n]},useSyncExternalStore:gm,useId:Wm,useHostTransitionStatus:pf,useFormState:Um,useActionState:Um,useOptimistic:function(e,n){var a=ln();return Fe!==null?Mm(a,Fe,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:sf,useCacheRefresh:qm};Qm.useEffectEvent=Om;function _f(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var vf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=li(),u=Ca(o);u.payload=n,a!=null&&(u.callback=a),n=wa(e,u,o),n!==null&&(Kn(n,e,o),vo(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=li(),u=Ca(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=wa(e,u,o),n!==null&&(Kn(n,e,o),vo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=li(),o=Ca(a);o.tag=2,n!=null&&(o.callback=n),n=wa(e,o,a),n!==null&&(Kn(n,e,a),vo(n,e,a))}};function Jm(e,n,a,o,u,f,v){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,v):n.prototype&&n.prototype.isPureReactComponent?!co(a,o)||!co(u,f):!0}function $m(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&vf.enqueueReplaceState(n,n.state,null)}function ys(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=_({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function tg(e){pl(e)}function eg(e){console.error(e)}function ng(e){pl(e)}function Bl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function ig(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function yf(e,n,a){return a=Ca(a),a.tag=3,a.payload={element:null},a.callback=function(){Bl(e,n)},a}function ag(e){return e=Ca(e),e.tag=3,e}function sg(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){ig(n,a,o)}}var v=a.stateNode;v!==null&&typeof v.componentDidCatch=="function"&&(e.callback=function(){ig(n,a,o),typeof u!="function"&&(Pa===null?Pa=new Set([this]):Pa.add(this));var b=o.stack;this.componentDidCatch(o.value,{componentStack:b!==null?b:""})})}function lS(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&$s(n,a,u,!0),a=ai.current,a!==null){switch(a.tag){case 31:case 13:return _i===null?Zl():a.alternate===null&&an===0&&(an=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===bl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Xf(e,o,u)),!1;case 22:return a.flags|=65536,o===bl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Xf(e,o,u)),!1}throw Error(s(435,a.tag))}return Xf(e,o,u),Zl(),!1}if(be)return n=ai.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Bu&&(e=Error(s(422),{cause:o}),ho(di(e,a)))):(o!==Bu&&(n=Error(s(423),{cause:o}),ho(di(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=di(o,a),u=yf(e.stateNode,o,u),ju(e,u),an!==4&&(an=2)),!1;var f=Error(s(520),{cause:o});if(f=di(f,a),Lo===null?Lo=[f]:Lo.push(f),an!==4&&(an=2),n===null)return!0;o=di(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=yf(a.stateNode,o,e),ju(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Pa===null||!Pa.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=ag(u),sg(u,e,a,o),ju(a,u),!1}a=a.return}while(a!==null);return!1}var Sf=Error(s(461)),hn=!1;function Dn(e,n,a,o){n.child=e===null?cm(n,null,a,o):_s(n,e.child,a,o)}function rg(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var v={};for(var b in o)b!=="ref"&&(v[b]=o[b])}else v=o;return ds(n),o=tf(e,n,a,v,f,u),b=ef(),e!==null&&!hn?(nf(e,n,u),ia(e,n,u)):(be&&b&&Pu(n),n.flags|=1,Dn(e,n,o,u),n.child)}function og(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Lu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,lg(e,n,f,o,u)):(e=vl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Cf(e,u)){var v=f.memoizedProps;if(a=a.compare,a=a!==null?a:co,a(v,o)&&e.ref===n.ref)return ia(e,n,u)}return n.flags|=1,e=Qi(f,o),e.ref=n.ref,e.return=n,n.child=e}function lg(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if(co(f,o)&&e.ref===n.ref)if(hn=!1,n.pendingProps=o=f,Cf(e,u))(e.flags&131072)!==0&&(hn=!0);else return n.lanes=e.lanes,ia(e,n,u)}return xf(e,n,a,o,u)}function cg(e,n,a,o){var u=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return ug(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ml(n,f!==null?f.cachePool:null),f!==null?hm(n,f):Ku(),dm(n);else return o=n.lanes=536870912,ug(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Ml(n,f.cachePool),hm(n,f),Ua(),n.memoizedState=null):(e!==null&&Ml(n,null),Ku(),Ua());return Dn(e,n,u,a),n.child}function To(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function ug(e,n,a,o,u){var f=Xu();return f=f===null?null:{parent:un._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&Ml(n,null),Ku(),dm(n),e!==null&&$s(e,n,o,!0),n.childLanes=u,null}function Il(e,n){return n=Hl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function fg(e,n,a){return _s(n,e.child,null,a),e=Il(n,n.pendingProps),e.flags|=2,si(n),n.memoizedState=null,e}function cS(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(be){if(o.mode==="hidden")return e=Il(n,o),n.lanes=536870912,To(null,e);if(Ju(n),(e=je)?(e=E_(e,gi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ea!==null?{id:Ii,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=jp(e),a.return=n,n.child=a,Cn=n,je=null)):e=null,e===null)throw Ta(n);return n.lanes=536870912,null}return Il(n,o)}var f=e.memoizedState;if(f!==null){var v=f.dehydrated;if(Ju(n),u)if(n.flags&256)n.flags&=-257,n=fg(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(hn||$s(e,n,a,!1),u=(a&e.childLanes)!==0,hn||u){if(o=qe,o!==null&&(v=zi(o,a),v!==0&&v!==f.retryLane))throw f.retryLane=v,cs(e,v),Kn(o,e,v),Sf;Zl(),n=fg(e,n,a)}else e=f.treeContext,je=vi(v.nextSibling),Cn=n,be=!0,ba=null,gi=!1,e!==null&&Qp(n,e),n=Il(n,o),n.flags|=4096;return n}return e=Qi(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Fl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function xf(e,n,a,o,u){return ds(n),a=tf(e,n,a,o,void 0,u),o=ef(),e!==null&&!hn?(nf(e,n,u),ia(e,n,u)):(be&&o&&Pu(n),n.flags|=1,Dn(e,n,a,u),n.child)}function hg(e,n,a,o,u,f){return ds(n),n.updateQueue=null,a=mm(n,o,a,u),pm(e),o=ef(),e!==null&&!hn?(nf(e,n,f),ia(e,n,f)):(be&&o&&Pu(n),n.flags|=1,Dn(e,n,a,f),n.child)}function dg(e,n,a,o,u){if(ds(n),n.stateNode===null){var f=Zs,v=a.contextType;typeof v=="object"&&v!==null&&(f=wn(v)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=vf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},qu(n),v=a.contextType,f.context=typeof v=="object"&&v!==null?wn(v):Zs,f.state=n.memoizedState,v=a.getDerivedStateFromProps,typeof v=="function"&&(_f(n,a,v,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(v=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),v!==f.state&&vf.enqueueReplaceState(f,f.state,null),So(n,o,f,u),yo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var b=n.memoizedProps,B=ys(a,b);f.props=B;var tt=f.context,ut=a.contextType;v=Zs,typeof ut=="object"&&ut!==null&&(v=wn(ut));var pt=a.getDerivedStateFromProps;ut=typeof pt=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||tt!==v)&&$m(n,f,o,v),Ra=!1;var nt=n.memoizedState;f.state=nt,So(n,o,f,u),yo(),tt=n.memoizedState,b||nt!==tt||Ra?(typeof pt=="function"&&(_f(n,a,pt,o),tt=n.memoizedState),(B=Ra||Jm(n,a,B,o,nt,tt,v))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=tt),f.props=o,f.state=tt,f.context=v,o=B):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Yu(e,n),v=n.memoizedProps,ut=ys(a,v),f.props=ut,pt=n.pendingProps,nt=f.context,tt=a.contextType,B=Zs,typeof tt=="object"&&tt!==null&&(B=wn(tt)),b=a.getDerivedStateFromProps,(tt=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(v!==pt||nt!==B)&&$m(n,f,o,B),Ra=!1,nt=n.memoizedState,f.state=nt,So(n,o,f,u),yo();var ot=n.memoizedState;v!==pt||nt!==ot||Ra||e!==null&&e.dependencies!==null&&Sl(e.dependencies)?(typeof b=="function"&&(_f(n,a,b,o),ot=n.memoizedState),(ut=Ra||Jm(n,a,ut,o,nt,ot,B)||e!==null&&e.dependencies!==null&&Sl(e.dependencies))?(tt||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,ot,B),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,ot,B)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||v===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=ot),f.props=o,f.state=ot,f.context=B,o=ut):(typeof f.componentDidUpdate!="function"||v===e.memoizedProps&&nt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&nt===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,Fl(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=_s(n,e.child,null,u),n.child=_s(n,null,a,u)):Dn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=ia(e,n,u),e}function pg(e,n,a,o){return fs(),n.flags|=256,Dn(e,n,a,o),n.child}var Mf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ef(e){return{baseLanes:e,cachePool:im()}}function bf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=oi),e}function mg(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,v;if((v=f)||(v=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),v&&(u=!0,n.flags&=-129),v=(n.flags&32)!==0,n.flags&=-33,e===null){if(be){if(u?Da(n):Ua(),(e=je)?(e=E_(e,gi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ea!==null?{id:Ii,overflow:Fi}:null,retryLane:536870912,hydrationErrors:null},a=jp(e),a.return=n,n.child=a,Cn=n,je=null)):e=null,e===null)throw Ta(n);return rh(e)?n.lanes=32:n.lanes=536870912,null}var b=o.children;return o=o.fallback,u?(Ua(),u=n.mode,b=Hl({mode:"hidden",children:b},u),o=us(o,u,a,null),b.return=n,o.return=n,b.sibling=o,n.child=b,o=n.child,o.memoizedState=Ef(a),o.childLanes=bf(e,v,a),n.memoizedState=Mf,To(null,o)):(Da(n),Tf(n,b))}var B=e.memoizedState;if(B!==null&&(b=B.dehydrated,b!==null)){if(f)n.flags&256?(Da(n),n.flags&=-257,n=Af(e,n,a)):n.memoizedState!==null?(Ua(),n.child=e.child,n.flags|=128,n=null):(Ua(),b=o.fallback,u=n.mode,o=Hl({mode:"visible",children:o.children},u),b=us(b,u,a,null),b.flags|=2,o.return=n,b.return=n,o.sibling=b,n.child=o,_s(n,e.child,null,a),o=n.child,o.memoizedState=Ef(a),o.childLanes=bf(e,v,a),n.memoizedState=Mf,n=To(null,o));else if(Da(n),rh(b)){if(v=b.nextSibling&&b.nextSibling.dataset,v)var tt=v.dgst;v=tt,o=Error(s(419)),o.stack="",o.digest=v,ho({value:o,source:null,stack:null}),n=Af(e,n,a)}else if(hn||$s(e,n,a,!1),v=(a&e.childLanes)!==0,hn||v){if(v=qe,v!==null&&(o=zi(v,a),o!==0&&o!==B.retryLane))throw B.retryLane=o,cs(e,o),Kn(v,e,o),Sf;sh(b)||Zl(),n=Af(e,n,a)}else sh(b)?(n.flags|=192,n.child=e.child,n=null):(e=B.treeContext,je=vi(b.nextSibling),Cn=n,be=!0,ba=null,gi=!1,e!==null&&Qp(n,e),n=Tf(n,o.children),n.flags|=4096);return n}return u?(Ua(),b=o.fallback,u=n.mode,B=e.child,tt=B.sibling,o=Qi(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&65011712,tt!==null?b=Qi(tt,b):(b=us(b,u,a,null),b.flags|=2),b.return=n,o.return=n,o.sibling=b,n.child=o,To(null,o),o=n.child,b=e.child.memoizedState,b===null?b=Ef(a):(u=b.cachePool,u!==null?(B=un._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=im(),b={baseLanes:b.baseLanes|a,cachePool:u}),o.memoizedState=b,o.childLanes=bf(e,v,a),n.memoizedState=Mf,To(e.child,o)):(Da(n),a=e.child,e=a.sibling,a=Qi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(v=n.deletions,v===null?(n.deletions=[e],n.flags|=16):v.push(e)),n.child=a,n.memoizedState=null,a)}function Tf(e,n){return n=Hl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Hl(e,n){return e=ii(22,e,null,n),e.lanes=0,e}function Af(e,n,a){return _s(n,e.child,null,a),e=Tf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function gg(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Hu(e.return,n,a)}function Rf(e,n,a,o,u,f){var v=e.memoizedState;v===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(v.isBackwards=n,v.rendering=null,v.renderingStartTime=0,v.last=o,v.tail=a,v.tailMode=u,v.treeForkCount=f)}function _g(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var v=on.current,b=(v&2)!==0;if(b?(v=v&1|2,n.flags|=128):v&=1,St(on,v),Dn(e,n,o,a),o=be?fo:0,!b&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&gg(e,a,n);else if(e.tag===19)gg(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&Cl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Rf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&Cl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Rf(n,!0,a,null,f,o);break;case"together":Rf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ia(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Oa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if($s(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Qi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Qi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Cf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Sl(e)))}function uS(e,n,a){switch(n.tag){case 3:Gt(n,n.stateNode.containerInfo),Aa(n,un,e.memoizedState.cache),fs();break;case 27:case 5:ie(n);break;case 4:Gt(n,n.stateNode.containerInfo);break;case 10:Aa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Ju(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Da(n),n.flags|=128,null):(a&n.child.childLanes)!==0?mg(e,n,a):(Da(n),e=ia(e,n,a),e!==null?e.sibling:null);Da(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||($s(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return _g(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),St(on,on.current),o)break;return null;case 22:return n.lanes=0,cg(e,n,a,n.pendingProps);case 24:Aa(n,un,e.memoizedState.cache)}return ia(e,n,a)}function vg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)hn=!0;else{if(!Cf(e,a)&&(n.flags&128)===0)return hn=!1,uS(e,n,a);hn=(e.flags&131072)!==0}else hn=!1,be&&(n.flags&1048576)!==0&&Kp(n,fo,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=ms(n.elementType),n.type=e,typeof e=="function")Lu(e)?(o=ys(e,o),n.tag=1,n=dg(null,n,e,o,a)):(n.tag=0,n=xf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===U){n.tag=11,n=rg(null,n,e,o,a);break t}else if(u===P){n.tag=14,n=og(null,n,e,o,a);break t}}throw n=mt(e)||e,Error(s(306,n,""))}}return n;case 0:return xf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=ys(o,n.pendingProps),dg(e,n,o,u,a);case 3:t:{if(Gt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,Yu(e,n),So(n,o,null,a);var v=n.memoizedState;if(o=v.cache,Aa(n,un,o),o!==f.cache&&Gu(n,[un],a,!0),yo(),o=v.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:v.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=pg(e,n,o,a);break t}else if(o!==u){u=di(Error(s(424)),n),ho(u),n=pg(e,n,o,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(je=vi(e.firstChild),Cn=n,be=!0,ba=null,gi=!0,a=cm(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(fs(),o===u){n=ia(e,n,a);break t}Dn(e,n,o,a)}n=n.child}return n;case 26:return Fl(e,n),e===null?(a=w_(n.type,null,n.pendingProps,null))?n.memoizedState=a:be||(a=n.type,e=n.pendingProps,o=nc(Et.current).createElement(a),o[en]=n,o[Rn]=e,Un(o,a,e),vt(o),n.stateNode=o):n.memoizedState=w_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return ie(n),e===null&&be&&(o=n.stateNode=A_(n.type,n.pendingProps,Et.current),Cn=n,gi=!0,u=je,Fa(n.type)?(oh=u,je=vi(o.firstChild)):je=u),Dn(e,n,n.pendingProps.children,a),Fl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&be&&((u=o=je)&&(o=HS(o,n.type,n.pendingProps,gi),o!==null?(n.stateNode=o,Cn=n,je=vi(o.firstChild),gi=!1,u=!0):u=!1),u||Ta(n)),ie(n),u=n.type,f=n.pendingProps,v=e!==null?e.memoizedProps:null,o=f.children,nh(u,f)?o=null:v!==null&&nh(u,v)&&(n.flags|=32),n.memoizedState!==null&&(u=tf(e,n,eS,null,null,a),Ho._currentValue=u),Fl(e,n),Dn(e,n,o,a),n.child;case 6:return e===null&&be&&((e=a=je)&&(a=GS(a,n.pendingProps,gi),a!==null?(n.stateNode=a,Cn=n,je=null,e=!0):e=!1),e||Ta(n)),null;case 13:return mg(e,n,a);case 4:return Gt(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=_s(n,null,o,a):Dn(e,n,o,a),n.child;case 11:return rg(e,n,n.type,n.pendingProps,a);case 7:return Dn(e,n,n.pendingProps,a),n.child;case 8:return Dn(e,n,n.pendingProps.children,a),n.child;case 12:return Dn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Aa(n,n.type,o.value),Dn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,ds(n),u=wn(u),o=o(u),n.flags|=1,Dn(e,n,o,a),n.child;case 14:return og(e,n,n.type,n.pendingProps,a);case 15:return lg(e,n,n.type,n.pendingProps,a);case 19:return _g(e,n,a);case 31:return cS(e,n,a);case 22:return cg(e,n,a,n.pendingProps);case 24:return ds(n),o=wn(un),e===null?(u=Xu(),u===null&&(u=qe,f=Vu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},qu(n),Aa(n,un,u)):((e.lanes&a)!==0&&(Yu(e,n),So(n,null,null,a),yo()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Aa(n,un,o)):(o=f.cache,Aa(n,un,o),o!==u.cache&&Gu(n,[un],a,!0))),Dn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function aa(e){e.flags|=4}function wf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Wg())e.flags|=8192;else throw gs=bl,Wu}else e.flags&=-16777217}function yg(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!O_(n))if(Wg())e.flags|=8192;else throw gs=bl,Wu}function Gl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?mn():536870912,e.lanes|=n,fr|=n)}function Ao(e,n){if(!be)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ze(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function fS(e,n,a){var o=n.pendingProps;switch(zu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ze(n),null;case 1:return Ze(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),ta(un),Ft(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Js(n)?aa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Iu())),Ze(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(aa(n),f!==null?(Ze(n),yg(n,f)):(Ze(n),wf(n,u,null,o,a))):f?f!==e.memoizedState?(aa(n),Ze(n),yg(n,f)):(Ze(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&aa(n),Ze(n),wf(n,u,e,o,a)),null;case 27:if(Be(n),a=Et.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ze(n),null}e=Z.current,Js(n)?Jp(n):(e=A_(u,o,a),n.stateNode=e,aa(n))}return Ze(n),null;case 5:if(Be(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ze(n),null}if(f=Z.current,Js(n))Jp(n);else{var v=nc(Et.current);switch(f){case 1:f=v.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=v.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=v.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=v.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?v.createElement("select",{is:o.is}):v.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?v.createElement(u,{is:o.is}):v.createElement(u)}}f[en]=n,f[Rn]=o;t:for(v=n.child;v!==null;){if(v.tag===5||v.tag===6)f.appendChild(v.stateNode);else if(v.tag!==4&&v.tag!==27&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===n)break t;for(;v.sibling===null;){if(v.return===null||v.return===n)break t;v=v.return}v.sibling.return=v.return,v=v.sibling}n.stateNode=f;t:switch(Un(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&aa(n)}}return Ze(n),wf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&aa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(e=Et.current,Js(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=Cn,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[en]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||m_(e.nodeValue,a)),e||Ta(n,!0)}else e=nc(e).createTextNode(o),e[en]=n,n.stateNode=e}return Ze(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=Js(n),a!==null){if(e===null){if(!o)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[en]=n}else fs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),e=!1}else a=Iu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(si(n),n):(si(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ze(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Js(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[en]=n}else fs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ze(n),u=!1}else u=Iu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(si(n),n):(si(n),null)}return si(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Gl(n,n.updateQueue),Ze(n),null);case 4:return Ft(),e===null&&Qf(n.stateNode.containerInfo),Ze(n),null;case 10:return ta(n.type),Ze(n),null;case 19:if(at(on),o=n.memoizedState,o===null)return Ze(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Ao(o,!1);else{if(an!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=Cl(e),f!==null){for(n.flags|=128,Ao(o,!1),e=f.updateQueue,n.updateQueue=e,Gl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)Yp(a,e),a=a.sibling;return St(on,on.current&1|2),be&&Ji(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&ft()>ql&&(n.flags|=128,u=!0,Ao(o,!1),n.lanes=4194304)}else{if(!u)if(e=Cl(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Gl(n,e),Ao(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!be)return Ze(n),null}else 2*ft()-o.renderingStartTime>ql&&a!==536870912&&(n.flags|=128,u=!0,Ao(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=ft(),e.sibling=null,a=on.current,St(on,u?a&1|2:a&1),be&&Ji(n,o.treeForkCount),e):(Ze(n),null);case 22:case 23:return si(n),Qu(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Ze(n),n.subtreeFlags&6&&(n.flags|=8192)):Ze(n),a=n.updateQueue,a!==null&&Gl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&at(ps),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),ta(un),Ze(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function hS(e,n){switch(zu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ta(un),Ft(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Be(n),null;case 31:if(n.memoizedState!==null){if(si(n),n.alternate===null)throw Error(s(340));fs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(si(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));fs()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return at(on),null;case 4:return Ft(),null;case 10:return ta(n.type),null;case 22:case 23:return si(n),Qu(),e!==null&&at(ps),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ta(un),null;case 25:return null;default:return null}}function Sg(e,n){switch(zu(n),n.tag){case 3:ta(un),Ft();break;case 26:case 27:case 5:Be(n);break;case 4:Ft();break;case 31:n.memoizedState!==null&&si(n);break;case 13:si(n);break;case 19:at(on);break;case 10:ta(n.type);break;case 22:case 23:si(n),Qu(),e!==null&&at(ps);break;case 24:ta(un)}}function Ro(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,v=a.inst;o=f(),v.destroy=o}a=a.next}while(a!==u)}}catch(b){ze(n,n.return,b)}}function La(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var v=o.inst,b=v.destroy;if(b!==void 0){v.destroy=void 0,u=n;var B=a,tt=b;try{tt()}catch(ut){ze(u,B,ut)}}}o=o.next}while(o!==f)}}catch(ut){ze(n,n.return,ut)}}function xg(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{fm(n,a)}catch(o){ze(e,e.return,o)}}}function Mg(e,n,a){a.props=ys(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){ze(e,n,o)}}function Co(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){ze(e,n,u)}}function Hi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){ze(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){ze(e,n,u)}else a.current=null}function Eg(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){ze(e,e.return,u)}}function Df(e,n,a){try{var o=e.stateNode;OS(o,e.type,a,n),o[Rn]=n}catch(u){ze(e,e.return,u)}}function bg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Fa(e.type)||e.tag===4}function Uf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||bg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Fa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Lf(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Zi));else if(o!==4&&(o===27&&Fa(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Lf(e,n,a),e=e.sibling;e!==null;)Lf(e,n,a),e=e.sibling}function Vl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&Fa(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Vl(e,n,a),e=e.sibling;e!==null;)Vl(e,n,a),e=e.sibling}function Tg(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);Un(n,o,a),n[en]=e,n[Rn]=a}catch(f){ze(e,e.return,f)}}var sa=!1,dn=!1,Nf=!1,Ag=typeof WeakSet=="function"?WeakSet:Set,En=null;function dS(e,n){if(e=e.containerInfo,th=cc,e=Ip(e),Tu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var v=0,b=-1,B=-1,tt=0,ut=0,pt=e,nt=null;e:for(;;){for(var ot;pt!==a||u!==0&&pt.nodeType!==3||(b=v+u),pt!==f||o!==0&&pt.nodeType!==3||(B=v+o),pt.nodeType===3&&(v+=pt.nodeValue.length),(ot=pt.firstChild)!==null;)nt=pt,pt=ot;for(;;){if(pt===e)break e;if(nt===a&&++tt===u&&(b=v),nt===f&&++ut===o&&(B=v),(ot=pt.nextSibling)!==null)break;pt=nt,nt=pt.parentNode}pt=ot}a=b===-1||B===-1?null:{start:b,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(eh={focusedElem:e,selectionRange:a},cc=!1,En=n;En!==null;)if(n=En,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,En=e;else for(;En!==null;){switch(n=En,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var It=ys(a.type,u);e=o.getSnapshotBeforeUpdate(It,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(Qt){ze(a,a.return,Qt)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)ah(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":ah(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,En=e;break}En=n.return}}function Rg(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:oa(e,a),o&4&&Ro(5,a);break;case 1:if(oa(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(v){ze(a,a.return,v)}else{var u=ys(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(v){ze(a,a.return,v)}}o&64&&xg(a),o&512&&Co(a,a.return);break;case 3:if(oa(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{fm(e,n)}catch(v){ze(a,a.return,v)}}break;case 27:n===null&&o&4&&Tg(a);case 26:case 5:oa(e,a),n===null&&o&4&&Eg(a),o&512&&Co(a,a.return);break;case 12:oa(e,a);break;case 31:oa(e,a),o&4&&Dg(e,a);break;case 13:oa(e,a),o&4&&Ug(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=MS.bind(null,a),VS(e,a))));break;case 22:if(o=a.memoizedState!==null||sa,!o){n=n!==null&&n.memoizedState!==null||dn,u=sa;var f=dn;sa=o,(dn=n)&&!f?la(e,a,(a.subtreeFlags&8772)!==0):oa(e,a),sa=u,dn=f}break;case 30:break;default:oa(e,a)}}function Cg(e){var n=e.alternate;n!==null&&(e.alternate=null,Cg(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&A(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var $e=null,qn=!1;function ra(e,n,a){for(a=a.child;a!==null;)wg(e,n,a),a=a.sibling}function wg(e,n,a){if(Xt&&typeof Xt.onCommitFiberUnmount=="function")try{Xt.onCommitFiberUnmount(Yt,a)}catch{}switch(a.tag){case 26:dn||Hi(a,n),ra(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:dn||Hi(a,n);var o=$e,u=qn;Fa(a.type)&&($e=a.stateNode,qn=!1),ra(e,n,a),Bo(a.stateNode),$e=o,qn=u;break;case 5:dn||Hi(a,n);case 6:if(o=$e,u=qn,$e=null,ra(e,n,a),$e=o,qn=u,$e!==null)if(qn)try{($e.nodeType===9?$e.body:$e.nodeName==="HTML"?$e.ownerDocument.body:$e).removeChild(a.stateNode)}catch(f){ze(a,n,f)}else try{$e.removeChild(a.stateNode)}catch(f){ze(a,n,f)}break;case 18:$e!==null&&(qn?(e=$e,x_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),yr(e)):x_($e,a.stateNode));break;case 4:o=$e,u=qn,$e=a.stateNode.containerInfo,qn=!0,ra(e,n,a),$e=o,qn=u;break;case 0:case 11:case 14:case 15:La(2,a,n),dn||La(4,a,n),ra(e,n,a);break;case 1:dn||(Hi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Mg(a,n,o)),ra(e,n,a);break;case 21:ra(e,n,a);break;case 22:dn=(o=dn)||a.memoizedState!==null,ra(e,n,a),dn=o;break;default:ra(e,n,a)}}function Dg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{yr(e)}catch(a){ze(n,n.return,a)}}}function Ug(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{yr(e)}catch(a){ze(n,n.return,a)}}function pS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Ag),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Ag),n;default:throw Error(s(435,e.tag))}}function kl(e,n){var a=pS(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=ES.bind(null,e,o);o.then(u,u)}})}function Yn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,v=n,b=v;t:for(;b!==null;){switch(b.tag){case 27:if(Fa(b.type)){$e=b.stateNode,qn=!1;break t}break;case 5:$e=b.stateNode,qn=!1;break t;case 3:case 4:$e=b.stateNode.containerInfo,qn=!0;break t}b=b.return}if($e===null)throw Error(s(160));wg(f,v,u),$e=null,qn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Lg(n,e),n=n.sibling}var Ri=null;function Lg(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Yn(n,e),jn(e),o&4&&(La(3,e,e.return),Ro(3,e),La(5,e,e.return));break;case 1:Yn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),o&64&&sa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ri;if(Yn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[as]||f[en]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),Un(f,o,a),f[en]=e,vt(f),o=f;break t;case"link":var v=L_("link","href",u).get(o+(a.href||""));if(v){for(var b=0;b<v.length;b++)if(f=v[b],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){v.splice(b,1);break e}}f=u.createElement(o),Un(f,o,a),u.head.appendChild(f);break;case"meta":if(v=L_("meta","content",u).get(o+(a.content||""))){for(b=0;b<v.length;b++)if(f=v[b],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){v.splice(b,1);break e}}f=u.createElement(o),Un(f,o,a),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[en]=e,vt(f),o=f}e.stateNode=o}else N_(u,e.type,e.stateNode);else e.stateNode=U_(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?N_(u,e.type,e.stateNode):U_(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Df(e,e.memoizedProps,a.memoizedProps)}break;case 27:Yn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),a!==null&&o&4&&Df(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Yn(n,e),jn(e),o&512&&(dn||a===null||Hi(a,a.return)),e.flags&32){u=e.stateNode;try{Vs(u,"")}catch(It){ze(e,e.return,It)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Df(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Nf=!0);break;case 6:if(Yn(n,e),jn(e),o&4){if(e.stateNode===null)throw Error(s(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(It){ze(e,e.return,It)}}break;case 3:if(sc=null,u=Ri,Ri=ic(n.containerInfo),Yn(n,e),Ri=u,jn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{yr(n.containerInfo)}catch(It){ze(e,e.return,It)}Nf&&(Nf=!1,Ng(e));break;case 4:o=Ri,Ri=ic(e.stateNode.containerInfo),Yn(n,e),jn(e),Ri=o;break;case 12:Yn(n,e),jn(e);break;case 31:Yn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,kl(e,o)));break;case 13:Yn(n,e),jn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Wl=ft()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,kl(e,o)));break;case 22:u=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,tt=sa,ut=dn;if(sa=tt||u,dn=ut||B,Yn(n,e),dn=ut,sa=tt,jn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||B||sa||dn||Ss(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){B=a=n;try{if(f=B.stateNode,u)v=f.style,typeof v.setProperty=="function"?v.setProperty("display","none","important"):v.display="none";else{b=B.stateNode;var pt=B.memoizedProps.style,nt=pt!=null&&pt.hasOwnProperty("display")?pt.display:null;b.style.display=nt==null||typeof nt=="boolean"?"":(""+nt).trim()}}catch(It){ze(B,B.return,It)}}}else if(n.tag===6){if(a===null){B=n;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(It){ze(B,B.return,It)}}}else if(n.tag===18){if(a===null){B=n;try{var ot=B.stateNode;u?M_(ot,!0):M_(B.stateNode,!1)}catch(It){ze(B,B.return,It)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,kl(e,a))));break;case 19:Yn(n,e),jn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,kl(e,o)));break;case 30:break;case 21:break;default:Yn(n,e),jn(e)}}function jn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(bg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=Uf(e);Vl(e,f,u);break;case 5:var v=a.stateNode;a.flags&32&&(Vs(v,""),a.flags&=-33);var b=Uf(e);Vl(e,b,v);break;case 3:case 4:var B=a.stateNode.containerInfo,tt=Uf(e);Lf(e,tt,B);break;default:throw Error(s(161))}}catch(ut){ze(e,e.return,ut)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Ng(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Ng(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function oa(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Rg(e,n.alternate,n),n=n.sibling}function Ss(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:La(4,n,n.return),Ss(n);break;case 1:Hi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Mg(n,n.return,a),Ss(n);break;case 27:Bo(n.stateNode);case 26:case 5:Hi(n,n.return),Ss(n);break;case 22:n.memoizedState===null&&Ss(n);break;case 30:Ss(n);break;default:Ss(n)}e=e.sibling}}function la(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,v=f.flags;switch(f.tag){case 0:case 11:case 15:la(u,f,a),Ro(4,f);break;case 1:if(la(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(tt){ze(o,o.return,tt)}if(o=f,u=o.updateQueue,u!==null){var b=o.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)um(B[u],b)}catch(tt){ze(o,o.return,tt)}}a&&v&64&&xg(f),Co(f,f.return);break;case 27:Tg(f);case 26:case 5:la(u,f,a),a&&o===null&&v&4&&Eg(f),Co(f,f.return);break;case 12:la(u,f,a);break;case 31:la(u,f,a),a&&v&4&&Dg(u,f);break;case 13:la(u,f,a),a&&v&4&&Ug(u,f);break;case 22:f.memoizedState===null&&la(u,f,a),Co(f,f.return);break;case 30:break;default:la(u,f,a)}n=n.sibling}}function Of(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&po(a))}function Pf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&po(e))}function Ci(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Og(e,n,a,o),n=n.sibling}function Og(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ci(e,n,a,o),u&2048&&Ro(9,n);break;case 1:Ci(e,n,a,o);break;case 3:Ci(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&po(e)));break;case 12:if(u&2048){Ci(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,v=f.id,b=f.onPostCommit;typeof b=="function"&&b(v,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){ze(n,n.return,B)}}else Ci(e,n,a,o);break;case 31:Ci(e,n,a,o);break;case 13:Ci(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,v=n.alternate,n.memoizedState!==null?f._visibility&2?Ci(e,n,a,o):wo(e,n):f._visibility&2?Ci(e,n,a,o):(f._visibility|=2,lr(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Of(v,n);break;case 24:Ci(e,n,a,o),u&2048&&Pf(n.alternate,n);break;default:Ci(e,n,a,o)}}function lr(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,v=n,b=a,B=o,tt=v.flags;switch(v.tag){case 0:case 11:case 15:lr(f,v,b,B,u),Ro(8,v);break;case 23:break;case 22:var ut=v.stateNode;v.memoizedState!==null?ut._visibility&2?lr(f,v,b,B,u):wo(f,v):(ut._visibility|=2,lr(f,v,b,B,u)),u&&tt&2048&&Of(v.alternate,v);break;case 24:lr(f,v,b,B,u),u&&tt&2048&&Pf(v.alternate,v);break;default:lr(f,v,b,B,u)}n=n.sibling}}function wo(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:wo(a,o),u&2048&&Of(o.alternate,o);break;case 24:wo(a,o),u&2048&&Pf(o.alternate,o);break;default:wo(a,o)}n=n.sibling}}var Do=8192;function cr(e,n,a){if(e.subtreeFlags&Do)for(e=e.child;e!==null;)Pg(e,n,a),e=e.sibling}function Pg(e,n,a){switch(e.tag){case 26:cr(e,n,a),e.flags&Do&&e.memoizedState!==null&&tx(a,Ri,e.memoizedState,e.memoizedProps);break;case 5:cr(e,n,a);break;case 3:case 4:var o=Ri;Ri=ic(e.stateNode.containerInfo),cr(e,n,a),Ri=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Do,Do=16777216,cr(e,n,a),Do=o):cr(e,n,a));break;default:cr(e,n,a)}}function zg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Uo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];En=o,Ig(o,e)}zg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Bg(e),e=e.sibling}function Bg(e){switch(e.tag){case 0:case 11:case 15:Uo(e),e.flags&2048&&La(9,e,e.return);break;case 3:Uo(e);break;case 12:Uo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Xl(e)):Uo(e);break;default:Uo(e)}}function Xl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];En=o,Ig(o,e)}zg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:La(8,n,n.return),Xl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Xl(n));break;default:Xl(n)}e=e.sibling}}function Ig(e,n){for(;En!==null;){var a=En;switch(a.tag){case 0:case 11:case 15:La(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:po(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,En=o;else t:for(a=e;En!==null;){o=En;var u=o.sibling,f=o.return;if(Cg(o),o===a){En=null;break t}if(u!==null){u.return=f,En=u;break t}En=f}}}var mS={getCacheForType:function(e){var n=wn(un),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return wn(un).controller.signal}},gS=typeof WeakMap=="function"?WeakMap:Map,Le=0,qe=null,_e=null,Me=0,Pe=0,ri=null,Na=!1,ur=!1,zf=!1,ca=0,an=0,Oa=0,xs=0,Bf=0,oi=0,fr=0,Lo=null,Zn=null,If=!1,Wl=0,Fg=0,ql=1/0,Yl=null,Pa=null,_n=0,za=null,hr=null,ua=0,Ff=0,Hf=null,Hg=null,No=0,Gf=null;function li(){return(Le&2)!==0&&Me!==0?Me&-Me:z.T!==null?Yf():to()}function Gg(){if(oi===0)if((Me&536870912)===0||be){var e=lt;lt<<=1,(lt&3932160)===0&&(lt=262144),oi=e}else oi=536870912;return e=ai.current,e!==null&&(e.flags|=32),oi}function Kn(e,n,a){(e===qe&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)&&(dr(e,0),Ba(e,Me,oi,!1)),An(e,a),((Le&2)===0||e!==qe)&&(e===qe&&((Le&2)===0&&(xs|=a),an===4&&Ba(e,Me,oi,!1)),Gi(e))}function Vg(e,n,a){if((Le&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||te(e,n),u=o?yS(e,n):kf(e,n,!0),f=o;do{if(u===0){ur&&!o&&Ba(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!_S(a)){u=kf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var v=0;else v=e.pendingLanes&-536870913,v=v!==0?v:v&536870912?536870912:0;if(v!==0){n=v;t:{var b=e;u=Lo;var B=b.current.memoizedState.isDehydrated;if(B&&(dr(b,v).flags|=256),v=kf(b,v,!1),v!==2){if(zf&&!B){b.errorRecoveryDisabledLanes|=f,xs|=f,u=4;break t}f=Zn,Zn=u,f!==null&&(Zn===null?Zn=f:Zn.push.apply(Zn,f))}u=v}if(f=!1,u!==2)continue}}if(u===1){dr(e,0),Ba(e,n,0,!0);break}t:{switch(o=e,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ba(o,n,oi,!Na);break t;case 2:Zn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Wl+300-ft(),10<u)){if(Ba(o,n,oi,!Na),Dt(o,0,!0)!==0)break t;ua=n,o.timeoutHandle=y_(kg.bind(null,o,a,Zn,Yl,If,n,oi,xs,fr,Na,f,"Throttled",-0,0),u);break t}kg(o,a,Zn,Yl,If,n,oi,xs,fr,Na,f,null,-0,0)}}break}while(!0);Gi(e)}function kg(e,n,a,o,u,f,v,b,B,tt,ut,pt,nt,ot){if(e.timeoutHandle=-1,pt=n.subtreeFlags,pt&8192||(pt&16785408)===16785408){pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zi},Pg(n,f,pt);var It=(f&62914560)===f?Wl-ft():(f&4194048)===f?Fg-ft():0;if(It=ex(pt,It),It!==null){ua=f,e.cancelPendingCommit=It(Qg.bind(null,e,n,f,a,o,u,v,b,B,ut,pt,null,nt,ot)),Ba(e,f,v,!tt);return}}Qg(e,n,f,a,o,u,v,b,B)}function _S(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!ni(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ba(e,n,a,o){n&=~Bf,n&=~xs,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-$t(u),v=1<<f;o[f]=-1,u&=~v}a!==0&&Jr(e,a,n)}function jl(){return(Le&6)===0?(Oo(0),!1):!0}function Vf(){if(_e!==null){if(Pe===0)var e=_e.return;else e=_e,$i=hs=null,af(e),ir=null,go=0,e=_e;for(;e!==null;)Sg(e.alternate,e),e=e.return;_e=null}}function dr(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,BS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ua=0,Vf(),qe=e,_e=a=Qi(e.current,null),Me=n,Pe=0,ri=null,Na=!1,ur=te(e,n),zf=!1,fr=oi=Bf=xs=Oa=an=0,Zn=Lo=null,If=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-$t(o),f=1<<u;n|=e[u],o&=~f}return ca=n,ml(),a}function Xg(e,n){ce=null,z.H=bo,n===nr||n===El?(n=rm(),Pe=3):n===Wu?(n=rm(),Pe=4):Pe=n===Sf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ri=n,_e===null&&(an=1,Bl(e,di(n,e.current)))}function Wg(){var e=ai.current;return e===null?!0:(Me&4194048)===Me?_i===null:(Me&62914560)===Me||(Me&536870912)!==0?e===_i:!1}function qg(){var e=z.H;return z.H=bo,e===null?bo:e}function Yg(){var e=z.A;return z.A=mS,e}function Zl(){an=4,Na||(Me&4194048)!==Me&&ai.current!==null||(ur=!0),(Oa&134217727)===0&&(xs&134217727)===0||qe===null||Ba(qe,Me,oi,!1)}function kf(e,n,a){var o=Le;Le|=2;var u=qg(),f=Yg();(qe!==e||Me!==n)&&(Yl=null,dr(e,n)),n=!1;var v=an;t:do try{if(Pe!==0&&_e!==null){var b=_e,B=ri;switch(Pe){case 8:Vf(),v=6;break t;case 3:case 2:case 9:case 6:ai.current===null&&(n=!0);var tt=Pe;if(Pe=0,ri=null,pr(e,b,B,tt),a&&ur){v=0;break t}break;default:tt=Pe,Pe=0,ri=null,pr(e,b,B,tt)}}vS(),v=an;break}catch(ut){Xg(e,ut)}while(!0);return n&&e.shellSuspendCounter++,$i=hs=null,Le=o,z.H=u,z.A=f,_e===null&&(qe=null,Me=0,ml()),v}function vS(){for(;_e!==null;)jg(_e)}function yS(e,n){var a=Le;Le|=2;var o=qg(),u=Yg();qe!==e||Me!==n?(Yl=null,ql=ft()+500,dr(e,n)):ur=te(e,n);t:do try{if(Pe!==0&&_e!==null){n=_e;var f=ri;e:switch(Pe){case 1:Pe=0,ri=null,pr(e,n,f,1);break;case 2:case 9:if(am(f)){Pe=0,ri=null,Zg(n);break}n=function(){Pe!==2&&Pe!==9||qe!==e||(Pe=7),Gi(e)},f.then(n,n);break t;case 3:Pe=7;break t;case 4:Pe=5;break t;case 7:am(f)?(Pe=0,ri=null,Zg(n)):(Pe=0,ri=null,pr(e,n,f,7));break;case 5:var v=null;switch(_e.tag){case 26:v=_e.memoizedState;case 5:case 27:var b=_e;if(v?O_(v):b.stateNode.complete){Pe=0,ri=null;var B=b.sibling;if(B!==null)_e=B;else{var tt=b.return;tt!==null?(_e=tt,Kl(tt)):_e=null}break e}}Pe=0,ri=null,pr(e,n,f,5);break;case 6:Pe=0,ri=null,pr(e,n,f,6);break;case 8:Vf(),an=6;break t;default:throw Error(s(462))}}SS();break}catch(ut){Xg(e,ut)}while(!0);return $i=hs=null,z.H=o,z.A=u,Le=a,_e!==null?0:(qe=null,Me=0,ml(),an)}function SS(){for(;_e!==null&&!T();)jg(_e)}function jg(e){var n=vg(e.alternate,e,ca);e.memoizedProps=e.pendingProps,n===null?Kl(e):_e=n}function Zg(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=hg(a,n,n.pendingProps,n.type,void 0,Me);break;case 11:n=hg(a,n,n.pendingProps,n.type.render,n.ref,Me);break;case 5:af(n);default:Sg(a,n),n=_e=Yp(n,ca),n=vg(a,n,ca)}e.memoizedProps=e.pendingProps,n===null?Kl(e):_e=n}function pr(e,n,a,o){$i=hs=null,af(n),ir=null,go=0;var u=n.return;try{if(lS(e,u,n,a,Me)){an=1,Bl(e,di(a,e.current)),_e=null;return}}catch(f){if(u!==null)throw _e=u,f;an=1,Bl(e,di(a,e.current)),_e=null;return}n.flags&32768?(be||o===1?e=!0:ur||(Me&536870912)!==0?e=!1:(Na=e=!0,(o===2||o===9||o===3||o===6)&&(o=ai.current,o!==null&&o.tag===13&&(o.flags|=16384))),Kg(n,e)):Kl(n)}function Kl(e){var n=e;do{if((n.flags&32768)!==0){Kg(n,Na);return}e=n.return;var a=fS(n.alternate,n,ca);if(a!==null){_e=a;return}if(n=n.sibling,n!==null){_e=n;return}_e=n=e}while(n!==null);an===0&&(an=5)}function Kg(e,n){do{var a=hS(e.alternate,e);if(a!==null){a.flags&=32767,_e=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){_e=e;return}_e=e=a}while(e!==null);an=6,_e=null}function Qg(e,n,a,o,u,f,v,b,B){e.cancelPendingCommit=null;do Ql();while(_n!==0);if((Le&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=Du,bi(e,a,f,v,b,B),e===qe&&(_e=qe=null,Me=0),hr=n,za=e,ua=a,Ff=f,Hf=u,Hg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,bS(wt,function(){return n_(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Q.p,Q.p=2,v=Le,Le|=4;try{dS(e,n,a)}finally{Le=v,Q.p=u,z.T=o}}_n=1,Jg(),$g(),t_()}}function Jg(){if(_n===1){_n=0;var e=za,n=hr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Le;Le|=4;try{Lg(n,e);var f=eh,v=Ip(e.containerInfo),b=f.focusedElem,B=f.selectionRange;if(v!==b&&b&&b.ownerDocument&&Bp(b.ownerDocument.documentElement,b)){if(B!==null&&Tu(b)){var tt=B.start,ut=B.end;if(ut===void 0&&(ut=tt),"selectionStart"in b)b.selectionStart=tt,b.selectionEnd=Math.min(ut,b.value.length);else{var pt=b.ownerDocument||document,nt=pt&&pt.defaultView||window;if(nt.getSelection){var ot=nt.getSelection(),It=b.textContent.length,Qt=Math.min(B.start,It),Ge=B.end===void 0?Qt:Math.min(B.end,It);!ot.extend&&Qt>Ge&&(v=Ge,Ge=Qt,Qt=v);var Y=zp(b,Qt),G=zp(b,Ge);if(Y&&G&&(ot.rangeCount!==1||ot.anchorNode!==Y.node||ot.anchorOffset!==Y.offset||ot.focusNode!==G.node||ot.focusOffset!==G.offset)){var $=pt.createRange();$.setStart(Y.node,Y.offset),ot.removeAllRanges(),Qt>Ge?(ot.addRange($),ot.extend(G.node,G.offset)):($.setEnd(G.node,G.offset),ot.addRange($))}}}}for(pt=[],ot=b;ot=ot.parentNode;)ot.nodeType===1&&pt.push({element:ot,left:ot.scrollLeft,top:ot.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<pt.length;b++){var ht=pt[b];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}cc=!!th,eh=th=null}finally{Le=u,Q.p=o,z.T=a}}e.current=n,_n=2}}function $g(){if(_n===2){_n=0;var e=za,n=hr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Le;Le|=4;try{Rg(e,n.alternate,n)}finally{Le=u,Q.p=o,z.T=a}}_n=3}}function t_(){if(_n===4||_n===3){_n=0,it();var e=za,n=hr,a=ua,o=Hg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?_n=5:(_n=0,hr=za=null,e_(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Pa=null),Hs(a),n=n.stateNode,Xt&&typeof Xt.onCommitFiberRoot=="function")try{Xt.onCommitFiberRoot(Yt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=z.T,u=Q.p,Q.p=2,z.T=null;try{for(var f=e.onRecoverableError,v=0;v<o.length;v++){var b=o[v];f(b.value,{componentStack:b.stack})}}finally{z.T=n,Q.p=u}}(ua&3)!==0&&Ql(),Gi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Gf?No++:(No=0,Gf=e):No=0,Oo(0)}}function e_(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,po(n)))}function Ql(){return Jg(),$g(),t_(),n_()}function n_(){if(_n!==5)return!1;var e=za,n=Ff;Ff=0;var a=Hs(ua),o=z.T,u=Q.p;try{Q.p=32>a?32:a,z.T=null,a=Hf,Hf=null;var f=za,v=ua;if(_n=0,hr=za=null,ua=0,(Le&6)!==0)throw Error(s(331));var b=Le;if(Le|=4,Bg(f.current),Og(f,f.current,v,a),Le=b,Oo(0,!1),Xt&&typeof Xt.onPostCommitFiberRoot=="function")try{Xt.onPostCommitFiberRoot(Yt,f)}catch{}return!0}finally{Q.p=u,z.T=o,e_(e,n)}}function i_(e,n,a){n=di(a,n),n=yf(e.stateNode,n,2),e=wa(e,n,2),e!==null&&(An(e,2),Gi(e))}function ze(e,n,a){if(e.tag===3)i_(e,e,a);else for(;n!==null;){if(n.tag===3){i_(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Pa===null||!Pa.has(o))){e=di(a,e),a=ag(2),o=wa(n,a,2),o!==null&&(sg(a,o,n,e),An(o,2),Gi(o));break}}n=n.return}}function Xf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new gS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(zf=!0,u.add(a),e=xS.bind(null,e,n,a),n.then(e,e))}function xS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,qe===e&&(Me&a)===a&&(an===4||an===3&&(Me&62914560)===Me&&300>ft()-Wl?(Le&2)===0&&dr(e,0):Bf|=a,fr===Me&&(fr=0)),Gi(e)}function a_(e,n){n===0&&(n=mn()),e=cs(e,n),e!==null&&(An(e,n),Gi(e))}function MS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),a_(e,a)}function ES(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),a_(e,a)}function bS(e,n){return Wt(e,n)}var Jl=null,mr=null,Wf=!1,$l=!1,qf=!1,Ia=0;function Gi(e){e!==mr&&e.next===null&&(mr===null?Jl=mr=e:mr=mr.next=e),$l=!0,Wf||(Wf=!0,AS())}function Oo(e,n){if(!qf&&$l){qf=!0;do for(var a=!1,o=Jl;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var v=o.suspendedLanes,b=o.pingedLanes;f=(1<<31-$t(42|e)+1)-1,f&=u&~(v&~b),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,l_(o,f))}else f=Me,f=Dt(o,o===qe?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||te(o,f)||(a=!0,l_(o,f));o=o.next}while(a);qf=!1}}function TS(){s_()}function s_(){$l=Wf=!1;var e=0;Ia!==0&&zS()&&(e=Ia);for(var n=ft(),a=null,o=Jl;o!==null;){var u=o.next,f=r_(o,n);f===0?(o.next=null,a===null?Jl=u:a.next=u,u===null&&(mr=a)):(a=o,(e!==0||(f&3)!==0)&&($l=!0)),o=u}_n!==0&&_n!==5||Oo(e),Ia!==0&&(Ia=0)}function r_(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var v=31-$t(f),b=1<<v,B=u[v];B===-1?((b&a)===0||(b&o)!==0)&&(u[v]=Je(b,n)):B<=n&&(e.expiredLanes|=b),f&=~b}if(n=qe,a=Me,a=Dt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Pe===2||Pe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&L(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||te(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&L(o),Hs(a)){case 2:case 8:a=kt;break;case 32:a=wt;break;case 268435456:a=Se;break;default:a=wt}return o=o_.bind(null,e),a=Wt(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&L(o),e.callbackPriority=2,e.callbackNode=null,2}function o_(e,n){if(_n!==0&&_n!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Ql()&&e.callbackNode!==a)return null;var o=Me;return o=Dt(e,e===qe?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(Vg(e,o,n),r_(e,ft()),e.callbackNode!=null&&e.callbackNode===a?o_.bind(null,e):null)}function l_(e,n){if(Ql())return null;Vg(e,n,!0)}function AS(){IS(function(){(Le&6)!==0?Wt(dt,TS):s_()})}function Yf(){if(Ia===0){var e=tr;e===0&&(e=Rt,Rt<<=1,(Rt&261888)===0&&(Rt=256)),Ia=e}return Ia}function c_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ol(""+e)}function u_(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function RS(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=c_((u[Rn]||null).action),v=o.submitter;v&&(n=(n=v[Rn]||null)?c_(n.formAction):v.getAttribute("formAction"),n!==null&&(f=n,v=null));var b=new fl("action","action",null,o,u);e.push({event:b,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ia!==0){var B=v?u_(u,v):new FormData(u);df(a,{pending:!0,data:B,method:u.method,action:f},null,B)}}else typeof f=="function"&&(b.preventDefault(),B=v?u_(u,v):new FormData(u),df(a,{pending:!0,data:B,method:u.method,action:f},f,B))},currentTarget:u}]})}}for(var jf=0;jf<wu.length;jf++){var Zf=wu[jf],CS=Zf.toLowerCase(),wS=Zf[0].toUpperCase()+Zf.slice(1);Ai(CS,"on"+wS)}Ai(Gp,"onAnimationEnd"),Ai(Vp,"onAnimationIteration"),Ai(kp,"onAnimationStart"),Ai("dblclick","onDoubleClick"),Ai("focusin","onFocus"),Ai("focusout","onBlur"),Ai(Wy,"onTransitionRun"),Ai(qy,"onTransitionStart"),Ai(Yy,"onTransitionCancel"),Ai(Xp,"onTransitionEnd"),Kt("onMouseEnter",["mouseout","mouseover"]),Kt("onMouseLeave",["mouseout","mouseover"]),Kt("onPointerEnter",["pointerout","pointerover"]),Kt("onPointerLeave",["pointerout","pointerover"]),Ot("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ot("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ot("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ot("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ot("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ot("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),DS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Po));function f_(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var v=o.length-1;0<=v;v--){var b=o[v],B=b.instance,tt=b.currentTarget;if(b=b.listener,B!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=tt;try{f(u)}catch(ut){pl(ut)}u.currentTarget=null,f=B}else for(v=0;v<o.length;v++){if(b=o[v],B=b.instance,tt=b.currentTarget,b=b.listener,B!==f&&u.isPropagationStopped())break t;f=b,u.currentTarget=tt;try{f(u)}catch(ut){pl(ut)}u.currentTarget=null,f=B}}}}function ve(e,n){var a=n[eo];a===void 0&&(a=n[eo]=new Set);var o=e+"__bubble";a.has(o)||(h_(n,e,2,!1),a.add(o))}function Kf(e,n,a){var o=0;n&&(o|=4),h_(a,e,o,n)}var tc="_reactListening"+Math.random().toString(36).slice(2);function Qf(e){if(!e[tc]){e[tc]=!0,Ut.forEach(function(a){a!=="selectionchange"&&(DS.has(a)||Kf(a,!1,e),Kf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[tc]||(n[tc]=!0,Kf("selectionchange",!1,n))}}function h_(e,n,a,o){switch(G_(n)){case 2:var u=ax;break;case 8:u=sx;break;default:u=hh}a=u.bind(null,n,a,e),u=void 0,!gu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Jf(e,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var v=o.tag;if(v===3||v===4){var b=o.stateNode.containerInfo;if(b===u)break;if(v===4)for(v=o.return;v!==null;){var B=v.tag;if((B===3||B===4)&&v.stateNode.containerInfo===u)return;v=v.return}for(;b!==null;){if(v=X(b),v===null)return;if(B=v.tag,B===5||B===6||B===26||B===27){o=f=v;continue t}b=b.parentNode}}o=o.return}_p(function(){var tt=f,ut=pu(a),pt=[];t:{var nt=Wp.get(e);if(nt!==void 0){var ot=fl,It=e;switch(e){case"keypress":if(cl(a)===0)break t;case"keydown":case"keyup":ot=Ey;break;case"focusin":It="focus",ot=Su;break;case"focusout":It="blur",ot=Su;break;case"beforeblur":case"afterblur":ot=Su;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=Sp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=fy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=Ay;break;case Gp:case Vp:case kp:ot=py;break;case Xp:ot=Cy;break;case"scroll":case"scrollend":ot=cy;break;case"wheel":ot=Dy;break;case"copy":case"cut":case"paste":ot=gy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=Mp;break;case"toggle":case"beforetoggle":ot=Ly}var Qt=(n&4)!==0,Ge=!Qt&&(e==="scroll"||e==="scrollend"),Y=Qt?nt!==null?nt+"Capture":null:nt;Qt=[];for(var G=tt,$;G!==null;){var ht=G;if($=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||$===null||Y===null||(ht=no(G,Y),ht!=null&&Qt.push(zo(G,ht,$))),Ge)break;G=G.return}0<Qt.length&&(nt=new ot(nt,It,null,a,ut),pt.push({event:nt,listeners:Qt}))}}if((n&7)===0){t:{if(nt=e==="mouseover"||e==="pointerover",ot=e==="mouseout"||e==="pointerout",nt&&a!==du&&(It=a.relatedTarget||a.fromElement)&&(X(It)||It[Yi]))break t;if((ot||nt)&&(nt=ut.window===ut?ut:(nt=ut.ownerDocument)?nt.defaultView||nt.parentWindow:window,ot?(It=a.relatedTarget||a.toElement,ot=tt,It=It?X(It):null,It!==null&&(Ge=c(It),Qt=It.tag,It!==Ge||Qt!==5&&Qt!==27&&Qt!==6)&&(It=null)):(ot=null,It=tt),ot!==It)){if(Qt=Sp,ht="onMouseLeave",Y="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Qt=Mp,ht="onPointerLeave",Y="onPointerEnter",G="pointer"),Ge=ot==null?nt:rt(ot),$=It==null?nt:rt(It),nt=new Qt(ht,G+"leave",ot,a,ut),nt.target=Ge,nt.relatedTarget=$,ht=null,X(ut)===tt&&(Qt=new Qt(Y,G+"enter",It,a,ut),Qt.target=$,Qt.relatedTarget=Ge,ht=Qt),Ge=ht,ot&&It)e:{for(Qt=US,Y=ot,G=It,$=0,ht=Y;ht;ht=Qt(ht))$++;ht=0;for(var Zt=G;Zt;Zt=Qt(Zt))ht++;for(;0<$-ht;)Y=Qt(Y),$--;for(;0<ht-$;)G=Qt(G),ht--;for(;$--;){if(Y===G||G!==null&&Y===G.alternate){Qt=Y;break e}Y=Qt(Y),G=Qt(G)}Qt=null}else Qt=null;ot!==null&&d_(pt,nt,ot,Qt,!1),It!==null&&Ge!==null&&d_(pt,Ge,It,Qt,!0)}}t:{if(nt=tt?rt(tt):window,ot=nt.nodeName&&nt.nodeName.toLowerCase(),ot==="select"||ot==="input"&&nt.type==="file")var we=Dp;else if(Cp(nt))if(Up)we=Vy;else{we=Hy;var Vt=Fy}else ot=nt.nodeName,!ot||ot.toLowerCase()!=="input"||nt.type!=="checkbox"&&nt.type!=="radio"?tt&&hu(tt.elementType)&&(we=Dp):we=Gy;if(we&&(we=we(e,tt))){wp(pt,we,a,ut);break t}Vt&&Vt(e,nt,tt),e==="focusout"&&tt&&nt.type==="number"&&tt.memoizedProps.value!=null&&gn(nt,"number",nt.value)}switch(Vt=tt?rt(tt):window,e){case"focusin":(Cp(Vt)||Vt.contentEditable==="true")&&(qs=Vt,Au=tt,uo=null);break;case"focusout":uo=Au=qs=null;break;case"mousedown":Ru=!0;break;case"contextmenu":case"mouseup":case"dragend":Ru=!1,Fp(pt,a,ut);break;case"selectionchange":if(Xy)break;case"keydown":case"keyup":Fp(pt,a,ut)}var ue;if(Mu)t:{switch(e){case"compositionstart":var Ee="onCompositionStart";break t;case"compositionend":Ee="onCompositionEnd";break t;case"compositionupdate":Ee="onCompositionUpdate";break t}Ee=void 0}else Ws?Ap(e,a)&&(Ee="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Ee="onCompositionStart");Ee&&(Ep&&a.locale!=="ko"&&(Ws||Ee!=="onCompositionStart"?Ee==="onCompositionEnd"&&Ws&&(ue=vp()):(Ma=ut,_u="value"in Ma?Ma.value:Ma.textContent,Ws=!0)),Vt=ec(tt,Ee),0<Vt.length&&(Ee=new xp(Ee,e,null,a,ut),pt.push({event:Ee,listeners:Vt}),ue?Ee.data=ue:(ue=Rp(a),ue!==null&&(Ee.data=ue)))),(ue=Oy?Py(e,a):zy(e,a))&&(Ee=ec(tt,"onBeforeInput"),0<Ee.length&&(Vt=new xp("onBeforeInput","beforeinput",null,a,ut),pt.push({event:Vt,listeners:Ee}),Vt.data=ue)),RS(pt,e,tt,a,ut)}f_(pt,n)})}function zo(e,n,a){return{instance:e,listener:n,currentTarget:a}}function ec(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=no(e,a),u!=null&&o.unshift(zo(e,u,f)),u=no(e,n),u!=null&&o.push(zo(e,u,f))),e.tag===3)return o;e=e.return}return[]}function US(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function d_(e,n,a,o,u){for(var f=n._reactName,v=[];a!==null&&a!==o;){var b=a,B=b.alternate,tt=b.stateNode;if(b=b.tag,B!==null&&B===o)break;b!==5&&b!==26&&b!==27||tt===null||(B=tt,u?(tt=no(a,f),tt!=null&&v.unshift(zo(a,tt,B))):u||(tt=no(a,f),tt!=null&&v.push(zo(a,tt,B)))),a=a.return}v.length!==0&&e.push({event:n,listeners:v})}var LS=/\r\n?/g,NS=/\u0000|\uFFFD/g;function p_(e){return(typeof e=="string"?e:""+e).replace(LS,`
`).replace(NS,"")}function m_(e,n){return n=p_(n),p_(e)===n}function He(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||Vs(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&Vs(e,""+o);break;case"className":We(e,"class",o);break;case"tabIndex":We(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":We(e,a,o);break;case"style":mp(e,o,f);break;case"data":if(n!=="object"){We(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ol(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&He(e,n,"name",u.name,u,null),He(e,n,"formEncType",u.formEncType,u,null),He(e,n,"formMethod",u.formMethod,u,null),He(e,n,"formTarget",u.formTarget,u,null)):(He(e,n,"encType",u.encType,u,null),He(e,n,"method",u.method,u,null),He(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ol(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Zi);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=ol(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":ve("beforetoggle",e),ve("toggle",e),Ye(e,"popover",o);break;case"xlinkActuate":le(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":le(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":le(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":le(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":le(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":le(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":le(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":le(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":le(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Ye(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=oy.get(a)||a,Ye(e,a,o))}}function $f(e,n,a,o,u,f){switch(a){case"style":mp(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof o=="string"?Vs(e,o):(typeof o=="number"||typeof o=="bigint")&&Vs(e,""+o);break;case"onScroll":o!=null&&ve("scroll",e);break;case"onScrollEnd":o!=null&&ve("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Zi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Pt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[Rn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):Ye(e,a,o)}}}function Un(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ve("error",e),ve("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var v=a[f];if(v!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:He(e,n,f,v,a,null)}}u&&He(e,n,"srcSet",a.srcSet,a,null),o&&He(e,n,"src",a.src,a,null);return;case"input":ve("invalid",e);var b=f=v=u=null,B=null,tt=null;for(o in a)if(a.hasOwnProperty(o)){var ut=a[o];if(ut!=null)switch(o){case"name":u=ut;break;case"type":v=ut;break;case"checked":B=ut;break;case"defaultChecked":tt=ut;break;case"value":f=ut;break;case"defaultValue":b=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:He(e,n,o,ut,a,null)}}Hn(e,f,b,B,tt,v,u,!1);return;case"select":ve("invalid",e),o=v=f=null;for(u in a)if(a.hasOwnProperty(u)&&(b=a[u],b!=null))switch(u){case"value":f=b;break;case"defaultValue":v=b;break;case"multiple":o=b;default:He(e,n,u,b,a,null)}n=f,a=v,e.multiple=!!o,n!=null?rn(e,!!o,n,!1):a!=null&&rn(e,!!o,a,!0);return;case"textarea":ve("invalid",e),f=u=o=null;for(v in a)if(a.hasOwnProperty(v)&&(b=a[v],b!=null))switch(v){case"value":o=b;break;case"defaultValue":u=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:He(e,n,v,b,a,null)}Bi(e,o,u,f);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(o=a[B],o!=null))switch(B){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:He(e,n,B,o,a,null)}return;case"dialog":ve("beforetoggle",e),ve("toggle",e),ve("cancel",e),ve("close",e);break;case"iframe":case"object":ve("load",e);break;case"video":case"audio":for(o=0;o<Po.length;o++)ve(Po[o],e);break;case"image":ve("error",e),ve("load",e);break;case"details":ve("toggle",e);break;case"embed":case"source":case"link":ve("error",e),ve("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(o=a[tt],o!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:He(e,n,tt,o,a,null)}return;default:if(hu(n)){for(ut in a)a.hasOwnProperty(ut)&&(o=a[ut],o!==void 0&&$f(e,n,ut,o,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(o=a[b],o!=null&&He(e,n,b,o,a,null))}function OS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,v=null,b=null,B=null,tt=null,ut=null;for(ot in a){var pt=a[ot];if(a.hasOwnProperty(ot)&&pt!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":B=pt;default:o.hasOwnProperty(ot)||He(e,n,ot,null,o,pt)}}for(var nt in o){var ot=o[nt];if(pt=a[nt],o.hasOwnProperty(nt)&&(ot!=null||pt!=null))switch(nt){case"type":f=ot;break;case"name":u=ot;break;case"checked":tt=ot;break;case"defaultChecked":ut=ot;break;case"value":v=ot;break;case"defaultValue":b=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,n));break;default:ot!==pt&&He(e,n,nt,ot,o,pt)}}Pn(e,v,b,B,tt,ut,f,u);return;case"select":ot=v=b=nt=null;for(f in a)if(B=a[f],a.hasOwnProperty(f)&&B!=null)switch(f){case"value":break;case"multiple":ot=B;default:o.hasOwnProperty(f)||He(e,n,f,null,o,B)}for(u in o)if(f=o[u],B=a[u],o.hasOwnProperty(u)&&(f!=null||B!=null))switch(u){case"value":nt=f;break;case"defaultValue":b=f;break;case"multiple":v=f;default:f!==B&&He(e,n,u,f,o,B)}n=b,a=v,o=ot,nt!=null?rn(e,!!a,nt,!1):!!o!=!!a&&(n!=null?rn(e,!!a,n,!0):rn(e,!!a,a?[]:"",!1));return;case"textarea":ot=nt=null;for(b in a)if(u=a[b],a.hasOwnProperty(b)&&u!=null&&!o.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:He(e,n,b,null,o,u)}for(v in o)if(u=o[v],f=a[v],o.hasOwnProperty(v)&&(u!=null||f!=null))switch(v){case"value":nt=u;break;case"defaultValue":ot=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&He(e,n,v,u,o,f)}Gs(e,nt,ot);return;case"option":for(var It in a)if(nt=a[It],a.hasOwnProperty(It)&&nt!=null&&!o.hasOwnProperty(It))switch(It){case"selected":e.selected=!1;break;default:He(e,n,It,null,o,nt)}for(B in o)if(nt=o[B],ot=a[B],o.hasOwnProperty(B)&&nt!==ot&&(nt!=null||ot!=null))switch(B){case"selected":e.selected=nt&&typeof nt!="function"&&typeof nt!="symbol";break;default:He(e,n,B,nt,o,ot)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Qt in a)nt=a[Qt],a.hasOwnProperty(Qt)&&nt!=null&&!o.hasOwnProperty(Qt)&&He(e,n,Qt,null,o,nt);for(tt in o)if(nt=o[tt],ot=a[tt],o.hasOwnProperty(tt)&&nt!==ot&&(nt!=null||ot!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(nt!=null)throw Error(s(137,n));break;default:He(e,n,tt,nt,o,ot)}return;default:if(hu(n)){for(var Ge in a)nt=a[Ge],a.hasOwnProperty(Ge)&&nt!==void 0&&!o.hasOwnProperty(Ge)&&$f(e,n,Ge,void 0,o,nt);for(ut in o)nt=o[ut],ot=a[ut],!o.hasOwnProperty(ut)||nt===ot||nt===void 0&&ot===void 0||$f(e,n,ut,nt,o,ot);return}}for(var Y in a)nt=a[Y],a.hasOwnProperty(Y)&&nt!=null&&!o.hasOwnProperty(Y)&&He(e,n,Y,null,o,nt);for(pt in o)nt=o[pt],ot=a[pt],!o.hasOwnProperty(pt)||nt===ot||nt==null&&ot==null||He(e,n,pt,nt,o,ot)}function g_(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function PS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,v=u.initiatorType,b=u.duration;if(f&&b&&g_(v)){for(v=0,b=u.responseEnd,o+=1;o<a.length;o++){var B=a[o],tt=B.startTime;if(tt>b)break;var ut=B.transferSize,pt=B.initiatorType;ut&&g_(pt)&&(B=B.responseEnd,v+=ut*(B<b?1:(b-tt)/(B-tt)))}if(--o,n+=8*(f+v)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var th=null,eh=null;function nc(e){return e.nodeType===9?e:e.ownerDocument}function __(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function v_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function nh(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ih=null;function zS(){var e=window.event;return e&&e.type==="popstate"?e===ih?!1:(ih=e,!0):(ih=null,!1)}var y_=typeof setTimeout=="function"?setTimeout:void 0,BS=typeof clearTimeout=="function"?clearTimeout:void 0,S_=typeof Promise=="function"?Promise:void 0,IS=typeof queueMicrotask=="function"?queueMicrotask:typeof S_<"u"?function(e){return S_.resolve(null).then(e).catch(FS)}:y_;function FS(e){setTimeout(function(){throw e})}function Fa(e){return e==="head"}function x_(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),yr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Bo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Bo(a);for(var f=a.firstChild;f;){var v=f.nextSibling,b=f.nodeName;f[as]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=v}}else a==="body"&&Bo(e.ownerDocument.body);a=u}while(a);yr(n)}function M_(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function ah(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":ah(a),A(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function HS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[as])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=vi(e.nextSibling),e===null)break}return null}function GS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=vi(e.nextSibling),e===null))return null;return e}function E_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=vi(e.nextSibling),e===null))return null;return e}function sh(e){return e.data==="$?"||e.data==="$~"}function rh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function VS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function vi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var oh=null;function b_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return vi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function T_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function A_(e,n,a){switch(n=nc(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function Bo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);A(e)}var yi=new Map,R_=new Set;function ic(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var fa=Q.d;Q.d={f:kS,r:XS,D:WS,C:qS,L:YS,m:jS,X:KS,S:ZS,M:QS};function kS(){var e=fa.f(),n=jl();return e||n}function XS(e){var n=st(e);n!==null&&n.tag===5&&n.type==="form"?Xm(n):fa.r(e)}var gr=typeof document>"u"?null:document;function C_(e,n,a){var o=gr;if(o&&typeof n=="string"&&n){var u=ge(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),R_.has(u)||(R_.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),Un(n,"link",e),vt(n),o.head.appendChild(n)))}}function WS(e){fa.D(e),C_("dns-prefetch",e,null)}function qS(e,n){fa.C(e,n),C_("preconnect",e,n)}function YS(e,n,a){fa.L(e,n,a);var o=gr;if(o&&e&&n){var u='link[rel="preload"][as="'+ge(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+ge(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+ge(a.imageSizes)+'"]')):u+='[href="'+ge(e)+'"]';var f=u;switch(n){case"style":f=_r(e);break;case"script":f=vr(e)}yi.has(f)||(e=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),yi.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(Io(f))||n==="script"&&o.querySelector(Fo(f))||(n=o.createElement("link"),Un(n,"link",e),vt(n),o.head.appendChild(n)))}}function jS(e,n){fa.m(e,n);var a=gr;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+ge(o)+'"][href="'+ge(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=vr(e)}if(!yi.has(f)&&(e=_({rel:"modulepreload",href:e},n),yi.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Fo(f)))return}o=a.createElement("link"),Un(o,"link",e),vt(o),a.head.appendChild(o)}}}function ZS(e,n,a){fa.S(e,n,a);var o=gr;if(o&&e){var u=q(o).hoistableStyles,f=_r(e);n=n||"default";var v=u.get(f);if(!v){var b={loading:0,preload:null};if(v=o.querySelector(Io(f)))b.loading=5;else{e=_({rel:"stylesheet",href:e,"data-precedence":n},a),(a=yi.get(f))&&lh(e,a);var B=v=o.createElement("link");vt(B),Un(B,"link",e),B._p=new Promise(function(tt,ut){B.onload=tt,B.onerror=ut}),B.addEventListener("load",function(){b.loading|=1}),B.addEventListener("error",function(){b.loading|=2}),b.loading|=4,ac(v,n,o)}v={type:"stylesheet",instance:v,count:1,state:b},u.set(f,v)}}}function KS(e,n){fa.X(e,n);var a=gr;if(a&&e){var o=q(a).hoistableScripts,u=vr(e),f=o.get(u);f||(f=a.querySelector(Fo(u)),f||(e=_({src:e,async:!0},n),(n=yi.get(u))&&ch(e,n),f=a.createElement("script"),vt(f),Un(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function QS(e,n){fa.M(e,n);var a=gr;if(a&&e){var o=q(a).hoistableScripts,u=vr(e),f=o.get(u);f||(f=a.querySelector(Fo(u)),f||(e=_({src:e,async:!0,type:"module"},n),(n=yi.get(u))&&ch(e,n),f=a.createElement("script"),vt(f),Un(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function w_(e,n,a,o){var u=(u=Et.current)?ic(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=_r(a.href),a=q(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=_r(a.href);var f=q(u).hoistableStyles,v=f.get(e);if(v||(u=u.ownerDocument||u,v={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,v),(f=u.querySelector(Io(e)))&&!f._p&&(v.instance=f,v.state.loading=5),yi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},yi.set(e,a),f||JS(u,e,a,v.state))),n&&o===null)throw Error(s(528,""));return v}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=vr(a),a=q(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function _r(e){return'href="'+ge(e)+'"'}function Io(e){return'link[rel="stylesheet"]['+e+"]"}function D_(e){return _({},e,{"data-precedence":e.precedence,precedence:null})}function JS(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),Un(n,"link",a),vt(n),e.head.appendChild(n))}function vr(e){return'[src="'+ge(e)+'"]'}function Fo(e){return"script[async]"+e}function U_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+ge(a.href)+'"]');if(o)return n.instance=o,vt(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),vt(o),Un(o,"style",u),ac(o,a.precedence,e),n.instance=o;case"stylesheet":u=_r(a.href);var f=e.querySelector(Io(u));if(f)return n.state.loading|=4,n.instance=f,vt(f),f;o=D_(a),(u=yi.get(u))&&lh(o,u),f=(e.ownerDocument||e).createElement("link"),vt(f);var v=f;return v._p=new Promise(function(b,B){v.onload=b,v.onerror=B}),Un(f,"link",o),n.state.loading|=4,ac(f,a.precedence,e),n.instance=f;case"script":return f=vr(a.src),(u=e.querySelector(Fo(f)))?(n.instance=u,vt(u),u):(o=a,(u=yi.get(f))&&(o=_({},a),ch(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),vt(u),Un(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,ac(o,a.precedence,e));return n.instance}function ac(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,v=0;v<o.length;v++){var b=o[v];if(b.dataset.precedence===n)f=b;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function lh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function ch(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var sc=null;function L_(e,n,a){if(sc===null){var o=new Map,u=sc=new Map;u.set(a,o)}else u=sc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[as]||f[en]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var v=f.getAttribute(n)||"";v=e+v;var b=o.get(v);b?b.push(f):o.set(v,[f])}}return o}function N_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function $S(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function O_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function tx(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=_r(o.href),f=n.querySelector(Io(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=rc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,vt(f);return}f=n.ownerDocument||n,o=D_(o),(u=yi.get(u))&&lh(o,u),f=f.createElement("link"),vt(f);var v=f;v._p=new Promise(function(b,B){v.onload=b,v.onerror=B}),Un(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=rc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var uh=0;function ex(e,n){return e.stylesheets&&e.count===0&&lc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&lc(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&uh===0&&(uh=62500*PS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&lc(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>uh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function rc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)lc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var oc=null;function lc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,oc=new Map,n.forEach(nx,e),oc=null,rc.call(e))}function nx(e,n){if(!(n.state.loading&4)){var a=oc.get(e);if(a)var o=a.get(null);else{a=new Map,oc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var v=u[f];(v.nodeName==="LINK"||v.getAttribute("media")!=="not all")&&(a.set(v.dataset.precedence,v),o=v)}o&&a.set(null,o)}u=n.instance,v=u.getAttribute("data-precedence"),f=a.get(v)||o,f===o&&a.set(null,u),a.set(v,u),this.count++,o=rc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Ho={$$typeof:O,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function ix(e,n,a,o,u,f,v,b,B){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=v,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function P_(e,n,a,o,u,f,v,b,B,tt,ut,pt){return e=new ix(e,n,a,v,B,tt,ut,pt,b),n=1,f===!0&&(n|=24),f=ii(3,null,null,n),e.current=f,f.stateNode=e,n=Vu(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},qu(f),e}function z_(e){return e?(e=Zs,e):Zs}function B_(e,n,a,o,u,f){u=z_(u),o.context===null?o.context=u:o.pendingContext=u,o=Ca(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=wa(e,o,n),a!==null&&(Kn(a,e,n),vo(a,e,n))}function I_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function fh(e,n){I_(e,n),(e=e.alternate)&&I_(e,n)}function F_(e){if(e.tag===13||e.tag===31){var n=cs(e,67108864);n!==null&&Kn(n,e,67108864),fh(e,67108864)}}function H_(e){if(e.tag===13||e.tag===31){var n=li();n=ns(n);var a=cs(e,n);a!==null&&Kn(a,e,n),fh(e,n)}}var cc=!0;function ax(e,n,a,o){var u=z.T;z.T=null;var f=Q.p;try{Q.p=2,hh(e,n,a,o)}finally{Q.p=f,z.T=u}}function sx(e,n,a,o){var u=z.T;z.T=null;var f=Q.p;try{Q.p=8,hh(e,n,a,o)}finally{Q.p=f,z.T=u}}function hh(e,n,a,o){if(cc){var u=dh(o);if(u===null)Jf(e,n,o,uc,a),V_(e,o);else if(ox(u,e,n,a,o))o.stopPropagation();else if(V_(e,o),n&4&&-1<rx.indexOf(e)){for(;u!==null;){var f=st(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var v=Ct(f.pendingLanes);if(v!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;v;){var B=1<<31-$t(v);b.entanglements[1]|=B,v&=~B}Gi(f),(Le&6)===0&&(ql=ft()+500,Oo(0))}}break;case 31:case 13:b=cs(f,2),b!==null&&Kn(b,f,2),jl(),fh(f,2)}if(f=dh(o),f===null&&Jf(e,n,o,uc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Jf(e,n,o,null,a)}}function dh(e){return e=pu(e),ph(e)}var uc=null;function ph(e){if(uc=null,e=X(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return uc=e,null}function G_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case dt:return 2;case kt:return 8;case wt:case zt:return 32;case Se:return 268435456;default:return 32}default:return 32}}var mh=!1,Ha=null,Ga=null,Va=null,Go=new Map,Vo=new Map,ka=[],rx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function V_(e,n){switch(e){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":Ga=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":Go.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vo.delete(n.pointerId)}}function ko(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=st(n),n!==null&&F_(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function ox(e,n,a,o,u){switch(n){case"focusin":return Ha=ko(Ha,e,n,a,o,u),!0;case"dragenter":return Ga=ko(Ga,e,n,a,o,u),!0;case"mouseover":return Va=ko(Va,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return Go.set(f,ko(Go.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,Vo.set(f,ko(Vo.get(f)||null,e,n,a,o,u)),!0}return!1}function k_(e){var n=X(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,is(e.priority,function(){H_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,is(e.priority,function(){H_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function fc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=dh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);du=o,a.target.dispatchEvent(o),du=null}else return n=st(a),n!==null&&F_(n),e.blockedOn=a,!1;n.shift()}return!0}function X_(e,n,a){fc(e)&&a.delete(n)}function lx(){mh=!1,Ha!==null&&fc(Ha)&&(Ha=null),Ga!==null&&fc(Ga)&&(Ga=null),Va!==null&&fc(Va)&&(Va=null),Go.forEach(X_),Vo.forEach(X_)}function hc(e,n){e.blockedOn===n&&(e.blockedOn=null,mh||(mh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,lx)))}var dc=null;function W_(e){dc!==e&&(dc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){dc===e&&(dc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(ph(o||a)===null)continue;break}var f=st(a);f!==null&&(e.splice(n,3),n-=3,df(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function yr(e){function n(B){return hc(B,e)}Ha!==null&&hc(Ha,e),Ga!==null&&hc(Ga,e),Va!==null&&hc(Va,e),Go.forEach(n),Vo.forEach(n);for(var a=0;a<ka.length;a++){var o=ka[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ka.length&&(a=ka[0],a.blockedOn===null);)k_(a),a.blockedOn===null&&ka.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],v=u[Rn]||null;if(typeof f=="function")v||W_(a);else if(v){var b=null;if(f&&f.hasAttribute("formAction")){if(u=f,v=f[Rn]||null)b=v.formAction;else if(ph(u)!==null)continue}else b=v.action;typeof b=="function"?a[o+1]=b:(a.splice(o,3),o-=3),W_(a)}}}function q_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(v){return u=v})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function gh(e){this._internalRoot=e}pc.prototype.render=gh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=li();B_(a,o,e,n,null,null)},pc.prototype.unmount=gh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;B_(e.current,2,null,e,null,null),jl(),n[Yi]=null}};function pc(e){this._internalRoot=e}pc.prototype.unstable_scheduleHydration=function(e){if(e){var n=to();e={blockedOn:null,target:e,priority:n};for(var a=0;a<ka.length&&n!==0&&n<ka[a].priority;a++);ka.splice(a,0,e),a===0&&k_(e)}};var Y_=t.version;if(Y_!=="19.2.8")throw Error(s(527,Y_,"19.2.8"));Q.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var cx={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mc.isDisabled&&mc.supportsFiber)try{Yt=mc.inject(cx),Xt=mc}catch{}}return Wo.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,o="",u=tg,f=eg,v=ng;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(v=n.onRecoverableError)),n=P_(e,1,!1,null,null,a,o,null,u,f,v,q_),e[Yi]=n.current,Qf(e),new gh(n)},Wo.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var o=!1,u="",f=tg,v=eg,b=ng,B=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(v=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=P_(e,1,!0,n,a??null,o,u,B,f,v,b,q_),n.context=z_(null),a=n.current,o=li(),o=ns(o),u=Ca(o),u.callback=null,wa(a,u,o),a=o,n.current.lanes=a,An(n,a),Gi(n),e[Yi]=n.current,Qf(e),new pc(n)},Wo.version="19.2.8",Wo}var i0;function xx(){if(i0)return yh.exports;i0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),yh.exports=Sx(),yh.exports}var Mx=xx();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ep="171",Ir={ROTATE:0,DOLLY:1,PAN:2},zr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ex=0,a0=1,bx=2,Sv=1,xv=2,_a=3,ts=0,$n=1,Ei=2,Ja=0,Fr=1,s0=2,r0=3,o0=4,Tx=5,Ls=100,Ax=101,Rx=102,Cx=103,wx=104,Dx=200,Ux=201,Lx=202,Nx=203,fd=204,hd=205,Ox=206,Px=207,zx=208,Bx=209,Ix=210,Fx=211,Hx=212,Gx=213,Vx=214,dd=0,pd=1,md=2,Vr=3,gd=4,_d=5,vd=6,yd=7,Mv=0,kx=1,Xx=2,$a=0,Wx=1,qx=2,Yx=3,jx=4,Zx=5,Kx=6,Qx=7,Ev=300,kr=301,Xr=302,Sd=303,xd=304,ru=306,Md=1e3,Os=1001,Ed=1002,Pi=1003,Jx=1004,gc=1005,Xi=1006,Eh=1007,Ps=1008,xa=1009,bv=1010,Tv=1011,el=1012,np=1013,zs=1014,va=1015,il=1016,ip=1017,ap=1018,Wr=1020,Av=35902,Rv=1021,Cv=1022,Oi=1023,wv=1024,Dv=1025,Hr=1026,qr=1027,Uv=1028,sp=1029,Lv=1030,rp=1031,op=1033,Wc=33776,qc=33777,Yc=33778,jc=33779,bd=35840,Td=35841,Ad=35842,Rd=35843,Cd=36196,wd=37492,Dd=37496,Ud=37808,Ld=37809,Nd=37810,Od=37811,Pd=37812,zd=37813,Bd=37814,Id=37815,Fd=37816,Hd=37817,Gd=37818,Vd=37819,kd=37820,Xd=37821,Zc=36492,Wd=36494,qd=36495,Nv=36283,Yd=36284,jd=36285,Zd=36286,$x=3200,tM=3201,Ov=0,eM=1,Qa="",xi="srgb",Yr="srgb-linear",Jc="linear",Ve="srgb",Sr=7680,l0=519,nM=512,iM=513,aM=514,Pv=515,sM=516,rM=517,oM=518,lM=519,c0=35044,u0="300 es",ya=2e3,$c=2001;class Is{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let f0=1234567;const Jo=Math.PI/180,nl=180/Math.PI;function Zr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Bn[r&255]+Bn[r>>8&255]+Bn[r>>16&255]+Bn[r>>24&255]+"-"+Bn[t&255]+Bn[t>>8&255]+"-"+Bn[t>>16&15|64]+Bn[t>>24&255]+"-"+Bn[i&63|128]+Bn[i>>8&255]+"-"+Bn[i>>16&255]+Bn[i>>24&255]+Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]).toLowerCase()}function pe(r,t,i){return Math.max(t,Math.min(i,r))}function lp(r,t){return(r%t+t)%t}function cM(r,t,i,s,l){return s+(r-t)*(l-s)/(i-t)}function uM(r,t,i){return r!==t?(i-r)/(t-r):0}function $o(r,t,i){return(1-i)*r+i*t}function fM(r,t,i,s){return $o(r,t,1-Math.exp(-i*s))}function hM(r,t=1){return t-Math.abs(lp(r,t*2)-t)}function dM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*(3-2*r))}function pM(r,t,i){return r<=t?0:r>=i?1:(r=(r-t)/(i-t),r*r*r*(r*(r*6-15)+10))}function mM(r,t){return r+Math.floor(Math.random()*(t-r+1))}function gM(r,t){return r+Math.random()*(t-r)}function _M(r){return r*(.5-Math.random())}function vM(r){r!==void 0&&(f0=r);let t=f0+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function yM(r){return r*Jo}function SM(r){return r*nl}function xM(r){return(r&r-1)===0&&r!==0}function MM(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function EM(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function bM(r,t,i,s,l){const c=Math.cos,h=Math.sin,d=c(i/2),m=h(i/2),p=c((t+s)/2),g=h((t+s)/2),_=c((t-s)/2),S=h((t-s)/2),M=c((s-t)/2),E=h((s-t)/2);switch(l){case"XYX":r.set(d*g,m*_,m*S,d*p);break;case"YZY":r.set(m*S,d*g,m*_,d*p);break;case"ZXZ":r.set(m*_,m*S,d*g,d*p);break;case"XZX":r.set(d*g,m*E,m*M,d*p);break;case"YXY":r.set(m*M,d*g,m*E,d*p);break;case"ZYZ":r.set(m*E,m*M,d*g,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+l)}}function Or(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Vn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Kc={DEG2RAD:Jo,RAD2DEG:nl,generateUUID:Zr,clamp:pe,euclideanModulo:lp,mapLinear:cM,inverseLerp:uM,lerp:$o,damp:fM,pingpong:hM,smoothstep:dM,smootherstep:pM,randInt:mM,randFloat:gM,randFloatSpread:_M,seededRandom:vM,degToRad:yM,radToDeg:SM,isPowerOfTwo:xM,ceilPowerOfTwo:MM,floorPowerOfTwo:EM,setQuaternionFromProperEuler:bM,normalize:Vn,denormalize:Or};class re{constructor(t=0,i=0){re.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=pe(this.x,t.x,i.x),this.y=pe(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=pe(this.x,t,i),this.y=pe(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(pe(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(pe(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class se{constructor(t,i,s,l,c,h,d,m,p){se.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p)}set(t,i,s,l,c,h,d,m,p){const g=this.elements;return g[0]=t,g[1]=l,g[2]=d,g[3]=i,g[4]=c,g[5]=m,g[6]=s,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],g=s[4],_=s[7],S=s[2],M=s[5],E=s[8],R=l[0],x=l[3],y=l[6],I=l[1],O=l[4],U=l[7],J=l[2],V=l[5],P=l[8];return c[0]=h*R+d*I+m*J,c[3]=h*x+d*O+m*V,c[6]=h*y+d*U+m*P,c[1]=p*R+g*I+_*J,c[4]=p*x+g*O+_*V,c[7]=p*y+g*U+_*P,c[2]=S*R+M*I+E*J,c[5]=S*x+M*O+E*V,c[8]=S*y+M*U+E*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8];return i*h*g-i*d*p-s*c*g+s*d*m+l*c*p-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=g*h-d*p,S=d*m-g*c,M=p*c-h*m,E=i*_+s*S+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const R=1/E;return t[0]=_*R,t[1]=(l*p-g*s)*R,t[2]=(d*s-l*h)*R,t[3]=S*R,t[4]=(g*i-l*m)*R,t[5]=(l*c-d*i)*R,t[6]=M*R,t[7]=(s*m-p*i)*R,t[8]=(h*i-s*c)*R,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(bh.makeScale(t,i)),this}rotate(t){return this.premultiply(bh.makeRotation(-t)),this}translate(t,i){return this.premultiply(bh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const bh=new se;function zv(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function tu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function TM(){const r=tu("canvas");return r.style.display="block",r}const h0={};function Pr(r){r in h0||(h0[r]=!0,console.warn(r))}function AM(r,t,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function RM(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function CM(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const d0=new se().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),p0=new se().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wM(){const r={enabled:!0,workingColorSpace:Yr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Ve&&(l.r=Sa(l.r),l.g=Sa(l.g),l.b=Sa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ve&&(l.r=Gr(l.r),l.g=Gr(l.g),l.b=Gr(l.b))),l},fromWorkingColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},toWorkingColorSpace:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Qa?Jc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Yr]:{primaries:t,whitePoint:s,transfer:Jc,toXYZ:d0,fromXYZ:p0,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:xi},outputColorSpaceConfig:{drawingBufferColorSpace:xi}},[xi]:{primaries:t,whitePoint:s,transfer:Ve,toXYZ:d0,fromXYZ:p0,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:xi}}}),r}const Ue=wM();function Sa(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let xr;class DM{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{xr===void 0&&(xr=tu("canvas")),xr.width=t.width,xr.height=t.height;const s=xr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=xr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=tu("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=Sa(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Sa(i[s]/255)*255):i[s]=Sa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let UM=0;class Bv{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:UM++}),this.uuid=Zr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(Th(l[h].image)):c.push(Th(l[h]))}else c=Th(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function Th(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?DM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let LM=0;class ti extends Is{constructor(t=ti.DEFAULT_IMAGE,i=ti.DEFAULT_MAPPING,s=Os,l=Os,c=Xi,h=Ps,d=Oi,m=xa,p=ti.DEFAULT_ANISOTROPY,g=Qa){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:LM++}),this.uuid=Zr(),this.name="",this.source=new Bv(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new se,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ev)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Md:t.x=t.x-Math.floor(t.x);break;case Os:t.x=t.x<0?0:1;break;case Ed:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Md:t.y=t.y-Math.floor(t.y);break;case Os:t.y=t.y<0?0:1;break;case Ed:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ti.DEFAULT_IMAGE=null;ti.DEFAULT_MAPPING=Ev;ti.DEFAULT_ANISOTROPY=1;class sn{constructor(t=0,i=0,s=0,l=1){sn.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,p=m[0],g=m[4],_=m[8],S=m[1],M=m[5],E=m[9],R=m[2],x=m[6],y=m[10];if(Math.abs(g-S)<.01&&Math.abs(_-R)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+S)<.1&&Math.abs(_+R)<.1&&Math.abs(E+x)<.1&&Math.abs(p+M+y-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const O=(p+1)/2,U=(M+1)/2,J=(y+1)/2,V=(g+S)/4,P=(_+R)/4,W=(E+x)/4;return O>U&&O>J?O<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(O),l=V/s,c=P/s):U>J?U<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),s=V/l,c=W/l):J<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(J),s=P/c,l=W/c),this.set(s,l,c,i),this}let I=Math.sqrt((x-E)*(x-E)+(_-R)*(_-R)+(S-g)*(S-g));return Math.abs(I)<.001&&(I=1),this.x=(x-E)/I,this.y=(_-R)/I,this.z=(S-g)/I,this.w=Math.acos((p+M+y-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=pe(this.x,t.x,i.x),this.y=pe(this.y,t.y,i.y),this.z=pe(this.z,t.z,i.z),this.w=pe(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=pe(this.x,t,i),this.y=pe(this.y,t,i),this.z=pe(this.z,t,i),this.w=pe(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(pe(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class NM extends Is{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new sn(0,0,t,i),this.scissorTest=!1,this.viewport=new sn(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new ti(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new Bv(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bs extends NM{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class Iv extends ti{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Pi,this.minFilter=Pi,this.wrapR=Os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class OM extends ti{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Pi,this.minFilter=Pi,this.wrapR=Os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,d){let m=s[l+0],p=s[l+1],g=s[l+2],_=s[l+3];const S=c[h+0],M=c[h+1],E=c[h+2],R=c[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=g,t[i+3]=_;return}if(d===1){t[i+0]=S,t[i+1]=M,t[i+2]=E,t[i+3]=R;return}if(_!==R||m!==S||p!==M||g!==E){let x=1-d;const y=m*S+p*M+g*E+_*R,I=y>=0?1:-1,O=1-y*y;if(O>Number.EPSILON){const J=Math.sqrt(O),V=Math.atan2(J,y*I);x=Math.sin(x*V)/J,d=Math.sin(d*V)/J}const U=d*I;if(m=m*x+S*U,p=p*x+M*U,g=g*x+E*U,_=_*x+R*U,x===1-d){const J=1/Math.sqrt(m*m+p*p+g*g+_*_);m*=J,p*=J,g*=J,_*=J}}t[i]=m,t[i+1]=p,t[i+2]=g,t[i+3]=_}static multiplyQuaternionsFlat(t,i,s,l,c,h){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],_=c[h],S=c[h+1],M=c[h+2],E=c[h+3];return t[i]=d*E+g*_+m*M-p*S,t[i+1]=m*E+g*S+p*_-d*M,t[i+2]=p*E+g*M+d*S-m*_,t[i+3]=g*E-d*_-m*S-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),_=d(c/2),S=m(s/2),M=m(l/2),E=m(c/2);switch(h){case"XYZ":this._x=S*g*_+p*M*E,this._y=p*M*_-S*g*E,this._z=p*g*E+S*M*_,this._w=p*g*_-S*M*E;break;case"YXZ":this._x=S*g*_+p*M*E,this._y=p*M*_-S*g*E,this._z=p*g*E-S*M*_,this._w=p*g*_+S*M*E;break;case"ZXY":this._x=S*g*_-p*M*E,this._y=p*M*_+S*g*E,this._z=p*g*E+S*M*_,this._w=p*g*_-S*M*E;break;case"ZYX":this._x=S*g*_-p*M*E,this._y=p*M*_+S*g*E,this._z=p*g*E-S*M*_,this._w=p*g*_+S*M*E;break;case"YZX":this._x=S*g*_+p*M*E,this._y=p*M*_+S*g*E,this._z=p*g*E-S*M*_,this._w=p*g*_-S*M*E;break;case"XZY":this._x=S*g*_-p*M*E,this._y=p*M*_-S*g*E,this._z=p*g*E+S*M*_,this._w=p*g*_+S*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],g=i[6],_=i[10],S=s+d+_;if(S>0){const M=.5/Math.sqrt(S+1);this._w=.25/M,this._x=(g-m)*M,this._y=(c-p)*M,this._z=(h-l)*M}else if(s>d&&s>_){const M=2*Math.sqrt(1+s-d-_);this._w=(g-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(c+p)/M}else if(d>_){const M=2*Math.sqrt(1+d-s-_);this._w=(c-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+_-s-d);this._w=(h-l)/M,this._x=(c+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(pe(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=s*g+h*d+l*p-c*m,this._y=l*g+h*m+c*d-s*p,this._z=c*g+h*p+s*m-l*d,this._w=h*g-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*c+i*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),_=Math.sin((1-i)*g)/p,S=Math.sin(i*g)/p;return this._w=h*_+this._w*S,this._x=s*_+this._x*S,this._y=l*_+this._y*S,this._z=c*_+this._z*S,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,i=0,s=0){F.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(m0.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(m0.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*s),g=2*(d*i-c*l),_=2*(c*s-h*i);return this.x=i+m*p+h*_-d*g,this.y=s+m*g+d*p-c*_,this.z=l+m*_+c*g-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=pe(this.x,t.x,i.x),this.y=pe(this.y,t.y,i.y),this.z=pe(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=pe(this.x,t,i),this.y=pe(this.y,t,i),this.z=pe(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(pe(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-s*m,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return Ah.copy(this).projectOnVector(t),this.sub(Ah)}reflect(t){return this.sub(Ah.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(pe(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ah=new F,m0=new Nn;class Wi{constructor(t=new F(1/0,1/0,1/0),i=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(wi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(wi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=wi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,wi):wi.fromBufferAttribute(c,h),wi.applyMatrix4(t.matrixWorld),this.expandByPoint(wi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),_c.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),_c.copy(s.boundingBox)),_c.applyMatrix4(t.matrixWorld),this.union(_c)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wi),wi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qo),vc.subVectors(this.max,qo),Mr.subVectors(t.a,qo),Er.subVectors(t.b,qo),br.subVectors(t.c,qo),Wa.subVectors(Er,Mr),qa.subVectors(br,Er),Ms.subVectors(Mr,br);let i=[0,-Wa.z,Wa.y,0,-qa.z,qa.y,0,-Ms.z,Ms.y,Wa.z,0,-Wa.x,qa.z,0,-qa.x,Ms.z,0,-Ms.x,-Wa.y,Wa.x,0,-qa.y,qa.x,0,-Ms.y,Ms.x,0];return!Rh(i,Mr,Er,br,vc)||(i=[1,0,0,0,1,0,0,0,1],!Rh(i,Mr,Er,br,vc))?!1:(yc.crossVectors(Wa,qa),i=[yc.x,yc.y,yc.z],Rh(i,Mr,Er,br,vc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ha[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ha[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ha[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ha[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ha[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ha[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ha[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ha[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ha),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ha=[new F,new F,new F,new F,new F,new F,new F,new F],wi=new F,_c=new Wi,Mr=new F,Er=new F,br=new F,Wa=new F,qa=new F,Ms=new F,qo=new F,vc=new F,yc=new F,Es=new F;function Rh(r,t,i,s,l){for(let c=0,h=r.length-3;c<=h;c+=3){Es.fromArray(r,c);const d=l.x*Math.abs(Es.x)+l.y*Math.abs(Es.y)+l.z*Math.abs(Es.z),m=t.dot(Es),p=i.dot(Es),g=s.dot(Es);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const PM=new Wi,Yo=new F,Ch=new F;class ou{constructor(t=new F,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):PM.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yo.subVectors(t,this.center);const i=Yo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Yo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ch.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yo.copy(t.center).add(Ch)),this.expandByPoint(Yo.copy(t.center).sub(Ch))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const da=new F,wh=new F,Sc=new F,Ya=new F,Dh=new F,xc=new F,Uh=new F;class al{constructor(t=new F,i=new F(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,da)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=da.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(da.copy(this.origin).addScaledVector(this.direction,i),da.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){wh.copy(t).add(i).multiplyScalar(.5),Sc.copy(i).sub(t).normalize(),Ya.copy(this.origin).sub(wh);const c=t.distanceTo(i)*.5,h=-this.direction.dot(Sc),d=Ya.dot(this.direction),m=-Ya.dot(Sc),p=Ya.lengthSq(),g=Math.abs(1-h*h);let _,S,M,E;if(g>0)if(_=h*m-d,S=h*d-m,E=c*g,_>=0)if(S>=-E)if(S<=E){const R=1/g;_*=R,S*=R,M=_*(_+h*S+2*d)+S*(h*_+S+2*m)+p}else S=c,_=Math.max(0,-(h*S+d)),M=-_*_+S*(S+2*m)+p;else S=-c,_=Math.max(0,-(h*S+d)),M=-_*_+S*(S+2*m)+p;else S<=-E?(_=Math.max(0,-(-h*c+d)),S=_>0?-c:Math.min(Math.max(-c,-m),c),M=-_*_+S*(S+2*m)+p):S<=E?(_=0,S=Math.min(Math.max(-c,-m),c),M=S*(S+2*m)+p):(_=Math.max(0,-(h*c+d)),S=_>0?c:Math.min(Math.max(-c,-m),c),M=-_*_+S*(S+2*m)+p);else S=h>0?-c:c,_=Math.max(0,-(h*S+d)),M=-_*_+S*(S+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(wh).addScaledVector(Sc,S),M}intersectSphere(t,i){da.subVectors(t.center,this.origin);const s=da.dot(this.direction),l=da.dot(da)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,d,m;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,S=this.origin;return p>=0?(s=(t.min.x-S.x)*p,l=(t.max.x-S.x)*p):(s=(t.max.x-S.x)*p,l=(t.min.x-S.x)*p),g>=0?(c=(t.min.y-S.y)*g,h=(t.max.y-S.y)*g):(c=(t.max.y-S.y)*g,h=(t.min.y-S.y)*g),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),_>=0?(d=(t.min.z-S.z)*_,m=(t.max.z-S.z)*_):(d=(t.max.z-S.z)*_,m=(t.min.z-S.z)*_),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,da)!==null}intersectTriangle(t,i,s,l,c){Dh.subVectors(i,t),xc.subVectors(s,t),Uh.crossVectors(Dh,xc);let h=this.direction.dot(Uh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ya.subVectors(this.origin,t);const m=d*this.direction.dot(xc.crossVectors(Ya,xc));if(m<0)return null;const p=d*this.direction.dot(Dh.cross(Ya));if(p<0||m+p>h)return null;const g=-d*Ya.dot(Uh);return g<0?null:this.at(g/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(t,i,s,l,c,h,d,m,p,g,_,S,M,E,R,x){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p,g,_,S,M,E,R,x)}set(t,i,s,l,c,h,d,m,p,g,_,S,M,E,R,x){const y=this.elements;return y[0]=t,y[4]=i,y[8]=s,y[12]=l,y[1]=c,y[5]=h,y[9]=d,y[13]=m,y[2]=p,y[6]=g,y[10]=_,y[14]=S,y[3]=M,y[7]=E,y[11]=R,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/Tr.setFromMatrixColumn(t,0).length(),c=1/Tr.setFromMatrixColumn(t,1).length(),h=1/Tr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(c),_=Math.sin(c);if(t.order==="XYZ"){const S=h*g,M=h*_,E=d*g,R=d*_;i[0]=m*g,i[4]=-m*_,i[8]=p,i[1]=M+E*p,i[5]=S-R*p,i[9]=-d*m,i[2]=R-S*p,i[6]=E+M*p,i[10]=h*m}else if(t.order==="YXZ"){const S=m*g,M=m*_,E=p*g,R=p*_;i[0]=S+R*d,i[4]=E*d-M,i[8]=h*p,i[1]=h*_,i[5]=h*g,i[9]=-d,i[2]=M*d-E,i[6]=R+S*d,i[10]=h*m}else if(t.order==="ZXY"){const S=m*g,M=m*_,E=p*g,R=p*_;i[0]=S-R*d,i[4]=-h*_,i[8]=E+M*d,i[1]=M+E*d,i[5]=h*g,i[9]=R-S*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const S=h*g,M=h*_,E=d*g,R=d*_;i[0]=m*g,i[4]=E*p-M,i[8]=S*p+R,i[1]=m*_,i[5]=R*p+S,i[9]=M*p-E,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const S=h*m,M=h*p,E=d*m,R=d*p;i[0]=m*g,i[4]=R-S*_,i[8]=E*_+M,i[1]=_,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=M*_+E,i[10]=S-R*_}else if(t.order==="XZY"){const S=h*m,M=h*p,E=d*m,R=d*p;i[0]=m*g,i[4]=-_,i[8]=p*g,i[1]=S*_+R,i[5]=h*g,i[9]=M*_-E,i[2]=E*_-M,i[6]=d*g,i[10]=R*_+S}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zM,t,BM)}lookAt(t,i,s){const l=this.elements;return ci.subVectors(t,i),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),ja.crossVectors(s,ci),ja.lengthSq()===0&&(Math.abs(s.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),ja.crossVectors(s,ci)),ja.normalize(),Mc.crossVectors(ci,ja),l[0]=ja.x,l[4]=Mc.x,l[8]=ci.x,l[1]=ja.y,l[5]=Mc.y,l[9]=ci.y,l[2]=ja.z,l[6]=Mc.z,l[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],g=s[1],_=s[5],S=s[9],M=s[13],E=s[2],R=s[6],x=s[10],y=s[14],I=s[3],O=s[7],U=s[11],J=s[15],V=l[0],P=l[4],W=l[8],D=l[12],C=l[1],w=l[5],j=l[9],et=l[13],mt=l[2],gt=l[6],z=l[10],Q=l[14],K=l[3],xt=l[7],bt=l[11],N=l[15];return c[0]=h*V+d*C+m*mt+p*K,c[4]=h*P+d*w+m*gt+p*xt,c[8]=h*W+d*j+m*z+p*bt,c[12]=h*D+d*et+m*Q+p*N,c[1]=g*V+_*C+S*mt+M*K,c[5]=g*P+_*w+S*gt+M*xt,c[9]=g*W+_*j+S*z+M*bt,c[13]=g*D+_*et+S*Q+M*N,c[2]=E*V+R*C+x*mt+y*K,c[6]=E*P+R*w+x*gt+y*xt,c[10]=E*W+R*j+x*z+y*bt,c[14]=E*D+R*et+x*Q+y*N,c[3]=I*V+O*C+U*mt+J*K,c[7]=I*P+O*w+U*gt+J*xt,c[11]=I*W+O*j+U*z+J*bt,c[15]=I*D+O*et+U*Q+J*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],d=t[5],m=t[9],p=t[13],g=t[2],_=t[6],S=t[10],M=t[14],E=t[3],R=t[7],x=t[11],y=t[15];return E*(+c*m*_-l*p*_-c*d*S+s*p*S+l*d*M-s*m*M)+R*(+i*m*M-i*p*S+c*h*S-l*h*M+l*p*g-c*m*g)+x*(+i*p*_-i*d*M-c*h*_+s*h*M+c*d*g-s*p*g)+y*(-l*d*g-i*m*_+i*d*S+l*h*_-s*h*S+s*m*g)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],g=t[8],_=t[9],S=t[10],M=t[11],E=t[12],R=t[13],x=t[14],y=t[15],I=_*x*p-R*S*p+R*m*M-d*x*M-_*m*y+d*S*y,O=E*S*p-g*x*p-E*m*M+h*x*M+g*m*y-h*S*y,U=g*R*p-E*_*p+E*d*M-h*R*M-g*d*y+h*_*y,J=E*_*m-g*R*m-E*d*S+h*R*S+g*d*x-h*_*x,V=i*I+s*O+l*U+c*J;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/V;return t[0]=I*P,t[1]=(R*S*c-_*x*c-R*l*M+s*x*M+_*l*y-s*S*y)*P,t[2]=(d*x*c-R*m*c+R*l*p-s*x*p-d*l*y+s*m*y)*P,t[3]=(_*m*c-d*S*c-_*l*p+s*S*p+d*l*M-s*m*M)*P,t[4]=O*P,t[5]=(g*x*c-E*S*c+E*l*M-i*x*M-g*l*y+i*S*y)*P,t[6]=(E*m*c-h*x*c-E*l*p+i*x*p+h*l*y-i*m*y)*P,t[7]=(h*S*c-g*m*c+g*l*p-i*S*p-h*l*M+i*m*M)*P,t[8]=U*P,t[9]=(E*_*c-g*R*c-E*s*M+i*R*M+g*s*y-i*_*y)*P,t[10]=(h*R*c-E*d*c+E*s*p-i*R*p-h*s*y+i*d*y)*P,t[11]=(g*d*c-h*_*c-g*s*p+i*_*p+h*s*M-i*d*M)*P,t[12]=J*P,t[13]=(g*R*l-E*_*l+E*s*S-i*R*S-g*s*x+i*_*x)*P,t[14]=(E*d*l-h*R*l-E*s*m+i*R*m+h*s*x-i*d*x)*P,t[15]=(h*_*l-g*d*l+g*s*m-i*_*m-h*s*S+i*d*S)*P,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,d=t.y,m=t.z,p=c*h,g=c*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*h,0,p*m-l*d,g*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,g=h+h,_=d+d,S=c*p,M=c*g,E=c*_,R=h*g,x=h*_,y=d*_,I=m*p,O=m*g,U=m*_,J=s.x,V=s.y,P=s.z;return l[0]=(1-(R+y))*J,l[1]=(M+U)*J,l[2]=(E-O)*J,l[3]=0,l[4]=(M-U)*V,l[5]=(1-(S+y))*V,l[6]=(x+I)*V,l[7]=0,l[8]=(E+O)*P,l[9]=(x-I)*P,l[10]=(1-(S+R))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=Tr.set(l[0],l[1],l[2]).length();const h=Tr.set(l[4],l[5],l[6]).length(),d=Tr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Di.copy(this);const p=1/c,g=1/h,_=1/d;return Di.elements[0]*=p,Di.elements[1]*=p,Di.elements[2]*=p,Di.elements[4]*=g,Di.elements[5]*=g,Di.elements[6]*=g,Di.elements[8]*=_,Di.elements[9]*=_,Di.elements[10]*=_,i.setFromRotationMatrix(Di),s.x=c,s.y=h,s.z=d,this}makePerspective(t,i,s,l,c,h,d=ya){const m=this.elements,p=2*c/(i-t),g=2*c/(s-l),_=(i+t)/(i-t),S=(s+l)/(s-l);let M,E;if(d===ya)M=-(h+c)/(h-c),E=-2*h*c/(h-c);else if(d===$c)M=-h/(h-c),E=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=_,m[12]=0,m[1]=0,m[5]=g,m[9]=S,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=E,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,c,h,d=ya){const m=this.elements,p=1/(i-t),g=1/(s-l),_=1/(h-c),S=(i+t)*p,M=(s+l)*g;let E,R;if(d===ya)E=(h+c)*_,R=-2*_;else if(d===$c)E=c*_,R=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-S,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=R,m[14]=-E,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const Tr=new F,Di=new Xe,zM=new F(0,0,0),BM=new F(1,1,1),ja=new F,Mc=new F,ci=new F,g0=new Xe,_0=new Nn;class qi{constructor(t=0,i=0,s=0,l=qi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],g=l[9],_=l[2],S=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(pe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(S,p),this._z=0);break;case"YXZ":this._x=Math.asin(-pe(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(pe(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(-_,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-pe(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(S,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(pe(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-pe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(S,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return g0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(g0,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return _0.setFromEuler(this),this.setFromQuaternion(_0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qi.DEFAULT_ORDER="XYZ";class cp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let IM=0;const v0=new F,Ar=new Nn,pa=new Xe,Ec=new F,jo=new F,FM=new F,HM=new Nn,y0=new F(1,0,0),S0=new F(0,1,0),x0=new F(0,0,1),M0={type:"added"},GM={type:"removed"},Rr={type:"childadded",child:null},Lh={type:"childremoved",child:null};class Tn extends Is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:IM++}),this.uuid=Zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tn.DEFAULT_UP.clone();const t=new F,i=new qi,s=new Nn,l=new F(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Xe},normalMatrix:{value:new se}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=Tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Ar.setFromAxisAngle(t,i),this.quaternion.multiply(Ar),this}rotateOnWorldAxis(t,i){return Ar.setFromAxisAngle(t,i),this.quaternion.premultiply(Ar),this}rotateX(t){return this.rotateOnAxis(y0,t)}rotateY(t){return this.rotateOnAxis(S0,t)}rotateZ(t){return this.rotateOnAxis(x0,t)}translateOnAxis(t,i){return v0.copy(t).applyQuaternion(this.quaternion),this.position.add(v0.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(y0,t)}translateY(t){return this.translateOnAxis(S0,t)}translateZ(t){return this.translateOnAxis(x0,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?Ec.copy(t):Ec.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),jo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(jo,Ec,this.up):pa.lookAt(Ec,jo,this.up),this.quaternion.setFromRotationMatrix(pa),l&&(pa.extractRotation(l.matrixWorld),Ar.setFromRotationMatrix(pa),this.quaternion.premultiply(Ar.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(M0),Rr.child=t,this.dispatchEvent(Rr),Rr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(GM),Lh.child=t,this.dispatchEvent(Lh),Lh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pa.multiply(t.parent.matrixWorld)),t.applyMatrix4(pa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(M0),Rr.child=t,this.dispatchEvent(Rr),Rr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jo,t,FM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jo,HM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const _=m[p];c(t.shapes,_)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),g=h(t.images),_=h(t.shapes),S=h(t.skeletons),M=h(t.animations),E=h(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),_.length>0&&(s.shapes=_),S.length>0&&(s.skeletons=S),M.length>0&&(s.animations=M),E.length>0&&(s.nodes=E)}return s.object=l,s;function h(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Tn.DEFAULT_UP=new F(0,1,0);Tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ui=new F,ma=new F,Nh=new F,ga=new F,Cr=new F,wr=new F,E0=new F,Oh=new F,Ph=new F,zh=new F,Bh=new sn,Ih=new sn,Fh=new sn;class Ni{constructor(t=new F,i=new F,s=new F){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Ui.subVectors(t,i),l.cross(Ui);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Ui.subVectors(l,i),ma.subVectors(s,i),Nh.subVectors(t,i);const h=Ui.dot(Ui),d=Ui.dot(ma),m=Ui.dot(Nh),p=ma.dot(ma),g=ma.dot(Nh),_=h*p-d*d;if(_===0)return c.set(0,0,0),null;const S=1/_,M=(p*m-d*g)*S,E=(h*g-d*m)*S;return c.set(1-M-E,E,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,ga)===null?!1:ga.x>=0&&ga.y>=0&&ga.x+ga.y<=1}static getInterpolation(t,i,s,l,c,h,d,m){return this.getBarycoord(t,i,s,l,ga)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ga.x),m.addScaledVector(h,ga.y),m.addScaledVector(d,ga.z),m)}static getInterpolatedAttribute(t,i,s,l,c,h){return Bh.setScalar(0),Ih.setScalar(0),Fh.setScalar(0),Bh.fromBufferAttribute(t,i),Ih.fromBufferAttribute(t,s),Fh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Bh,c.x),h.addScaledVector(Ih,c.y),h.addScaledVector(Fh,c.z),h}static isFrontFacing(t,i,s,l){return Ui.subVectors(s,i),ma.subVectors(t,i),Ui.cross(ma).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ui.subVectors(this.c,this.b),ma.subVectors(this.a,this.b),Ui.cross(ma).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ni.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return Ni.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return Ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,d;Cr.subVectors(l,s),wr.subVectors(c,s),Oh.subVectors(t,s);const m=Cr.dot(Oh),p=wr.dot(Oh);if(m<=0&&p<=0)return i.copy(s);Ph.subVectors(t,l);const g=Cr.dot(Ph),_=wr.dot(Ph);if(g>=0&&_<=g)return i.copy(l);const S=m*_-g*p;if(S<=0&&m>=0&&g<=0)return h=m/(m-g),i.copy(s).addScaledVector(Cr,h);zh.subVectors(t,c);const M=Cr.dot(zh),E=wr.dot(zh);if(E>=0&&M<=E)return i.copy(c);const R=M*p-m*E;if(R<=0&&p>=0&&E<=0)return d=p/(p-E),i.copy(s).addScaledVector(wr,d);const x=g*E-M*_;if(x<=0&&_-g>=0&&M-E>=0)return E0.subVectors(c,l),d=(_-g)/(_-g+(M-E)),i.copy(l).addScaledVector(E0,d);const y=1/(x+R+S);return h=R*y,d=S*y,i.copy(s).addScaledVector(Cr,h).addScaledVector(wr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Fv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Za={h:0,s:0,l:0},bc={h:0,s:0,l:0};function Hh(r,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(t-r)*6*i:i<1/2?t:i<2/3?r+(t-r)*6*(2/3-i):r}class he{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=xi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=Ue.workingColorSpace){return this.r=t,this.g=i,this.b=s,Ue.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=Ue.workingColorSpace){if(t=lp(t,1),i=pe(i,0,1),s=pe(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=Hh(h,c,t+1/3),this.g=Hh(h,c,t),this.b=Hh(h,c,t-1/3)}return Ue.toWorkingColorSpace(this,l),this}setStyle(t,i=xi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=xi){const s=Fv[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sa(t.r),this.g=Sa(t.g),this.b=Sa(t.b),this}copyLinearToSRGB(t){return this.r=Gr(t.r),this.g=Gr(t.g),this.b=Gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xi){return Ue.fromWorkingColorSpace(In.copy(this),t),Math.round(pe(In.r*255,0,255))*65536+Math.round(pe(In.g*255,0,255))*256+Math.round(pe(In.b*255,0,255))}getHexString(t=xi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Ue.workingColorSpace){Ue.fromWorkingColorSpace(In.copy(this),i);const s=In.r,l=In.g,c=In.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const g=(d+h)/2;if(d===h)m=0,p=0;else{const _=h-d;switch(p=g<=.5?_/(h+d):_/(2-h-d),h){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return t.h=m,t.s=p,t.l=g,t}getRGB(t,i=Ue.workingColorSpace){return Ue.fromWorkingColorSpace(In.copy(this),i),t.r=In.r,t.g=In.g,t.b=In.b,t}getStyle(t=xi){Ue.fromWorkingColorSpace(In.copy(this),t);const i=In.r,s=In.g,l=In.b;return t!==xi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Za),this.setHSL(Za.h+t,Za.s+i,Za.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Za),t.getHSL(bc);const s=$o(Za.h,bc.h,i),l=$o(Za.s,bc.s,i),c=$o(Za.l,bc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const In=new he;he.NAMES=Fv;let VM=0;class Fs extends Is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:VM++}),this.uuid=Zr(),this.name="",this.type="Material",this.blending=Fr,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fd,this.blendDst=hd,this.blendEquation=Ls,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=l0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sr,this.stencilZFail=Sr,this.stencilZPass=Sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Fr&&(s.blending=this.blending),this.side!==ts&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==fd&&(s.blendSrc=this.blendSrc),this.blendDst!==hd&&(s.blendDst=this.blendDst),this.blendEquation!==Ls&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Vr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==l0&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Sr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Sr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Sr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class tl extends Fs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.combine=Mv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pn=new F,Tc=new re;class Xn{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=c0,this.updateRanges=[],this.gpuType=va,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Tc.fromBufferAttribute(this,i),Tc.applyMatrix3(t),this.setXY(i,Tc.x,Tc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix3(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyMatrix4(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.applyNormalMatrix(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)pn.fromBufferAttribute(this,i),pn.transformDirection(t),this.setXYZ(i,pn.x,pn.y,pn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Or(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=Vn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Or(i,this.array)),i}setX(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Or(i,this.array)),i}setY(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Or(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Or(i,this.array)),i}setW(t,i){return this.normalized&&(i=Vn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=Vn(i,this.array),s=Vn(s,this.array),l=Vn(l,this.array),c=Vn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==c0&&(t.usage=this.usage),t}}class Hv extends Xn{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class Gv extends Xn{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class ei extends Xn{constructor(t,i,s){super(new Float32Array(t),i,s)}}let kM=0;const Si=new Xe,Gh=new Tn,Dr=new F,ui=new Wi,Zo=new Wi,bn=new F;class fi extends Is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kM++}),this.uuid=Zr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zv(t)?Gv:Hv)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new se().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Si.makeRotationFromQuaternion(t),this.applyMatrix4(Si),this}rotateX(t){return Si.makeRotationX(t),this.applyMatrix4(Si),this}rotateY(t){return Si.makeRotationY(t),this.applyMatrix4(Si),this}rotateZ(t){return Si.makeRotationZ(t),this.applyMatrix4(Si),this}translate(t,i,s){return Si.makeTranslation(t,i,s),this.applyMatrix4(Si),this}scale(t,i,s){return Si.makeScale(t,i,s),this.applyMatrix4(Si),this}lookAt(t){return Gh.lookAt(t),Gh.updateMatrix(),this.applyMatrix4(Gh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dr).negate(),this.translate(Dr.x,Dr.y,Dr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new ei(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ui.setFromBufferAttribute(c),this.morphTargetsRelative?(bn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(bn),bn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(bn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ou);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const s=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Zo.setFromBufferAttribute(d),this.morphTargetsRelative?(bn.addVectors(ui.min,Zo.min),ui.expandByPoint(bn),bn.addVectors(ui.max,Zo.max),ui.expandByPoint(bn)):(ui.expandByPoint(Zo.min),ui.expandByPoint(Zo.max))}ui.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)bn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(bn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)bn.fromBufferAttribute(d,p),m&&(Dr.fromBufferAttribute(t,p),bn.add(Dr)),l=Math.max(l,s.distanceToSquared(bn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Xn(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let W=0;W<s.count;W++)d[W]=new F,m[W]=new F;const p=new F,g=new F,_=new F,S=new re,M=new re,E=new re,R=new F,x=new F;function y(W,D,C){p.fromBufferAttribute(s,W),g.fromBufferAttribute(s,D),_.fromBufferAttribute(s,C),S.fromBufferAttribute(c,W),M.fromBufferAttribute(c,D),E.fromBufferAttribute(c,C),g.sub(p),_.sub(p),M.sub(S),E.sub(S);const w=1/(M.x*E.y-E.x*M.y);isFinite(w)&&(R.copy(g).multiplyScalar(E.y).addScaledVector(_,-M.y).multiplyScalar(w),x.copy(_).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(w),d[W].add(R),d[D].add(R),d[C].add(R),m[W].add(x),m[D].add(x),m[C].add(x))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let W=0,D=I.length;W<D;++W){const C=I[W],w=C.start,j=C.count;for(let et=w,mt=w+j;et<mt;et+=3)y(t.getX(et+0),t.getX(et+1),t.getX(et+2))}const O=new F,U=new F,J=new F,V=new F;function P(W){J.fromBufferAttribute(l,W),V.copy(J);const D=d[W];O.copy(D),O.sub(J.multiplyScalar(J.dot(D))).normalize(),U.crossVectors(V,D);const w=U.dot(m[W])<0?-1:1;h.setXYZW(W,O.x,O.y,O.z,w)}for(let W=0,D=I.length;W<D;++W){const C=I[W],w=C.start,j=C.count;for(let et=w,mt=w+j;et<mt;et+=3)P(t.getX(et+0)),P(t.getX(et+1)),P(t.getX(et+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Xn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let S=0,M=s.count;S<M;S++)s.setXYZ(S,0,0,0);const l=new F,c=new F,h=new F,d=new F,m=new F,p=new F,g=new F,_=new F;if(t)for(let S=0,M=t.count;S<M;S+=3){const E=t.getX(S+0),R=t.getX(S+1),x=t.getX(S+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,R),h.fromBufferAttribute(i,x),g.subVectors(h,c),_.subVectors(l,c),g.cross(_),d.fromBufferAttribute(s,E),m.fromBufferAttribute(s,R),p.fromBufferAttribute(s,x),d.add(g),m.add(g),p.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(R,m.x,m.y,m.z),s.setXYZ(x,p.x,p.y,p.z)}else for(let S=0,M=i.count;S<M;S+=3)l.fromBufferAttribute(i,S+0),c.fromBufferAttribute(i,S+1),h.fromBufferAttribute(i,S+2),g.subVectors(h,c),_.subVectors(l,c),g.cross(_),s.setXYZ(S+0,g.x,g.y,g.z),s.setXYZ(S+1,g.x,g.y,g.z),s.setXYZ(S+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)bn.fromBufferAttribute(t,i),bn.normalize(),t.setXYZ(i,bn.x,bn.y,bn.z)}toNonIndexed(){function t(d,m){const p=d.array,g=d.itemSize,_=d.normalized,S=new p.constructor(m.length*g);let M=0,E=0;for(let R=0,x=m.length;R<x;R++){d.isInterleavedBufferAttribute?M=m[R]*d.data.stride+d.offset:M=m[R]*g;for(let y=0;y<g;y++)S[E++]=p[M++]}return new Xn(S,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new fi,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let g=0,_=p.length;g<_;g++){const S=p[g],M=t(S,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let _=0,S=p.length;_<S;_++){const M=p[_];g.push(M.toJSON(t.data))}g.length>0&&(l[m]=g,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const c=t.morphAttributes;for(const p in c){const g=[],_=c[p];for(let S=0,M=_.length;S<M;S++)g.push(_[S].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,g=h.length;p<g;p++){const _=h[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const b0=new Xe,bs=new al,Ac=new ou,T0=new F,Rc=new F,Cc=new F,wc=new F,Vh=new F,Dc=new F,A0=new F,Uc=new F;class Jn extends Tn{constructor(t=new fi,i=new tl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Dc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const g=d[m],_=c[m];g!==0&&(Vh.fromBufferAttribute(_,t),h?Dc.addScaledVector(Vh,g):Dc.addScaledVector(Vh.sub(i),g))}i.add(Dc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Ac.copy(s.boundingSphere),Ac.applyMatrix4(c),bs.copy(t.ray).recast(t.near),!(Ac.containsPoint(bs.origin)===!1&&(bs.intersectSphere(Ac,T0)===null||bs.origin.distanceToSquared(T0)>(t.far-t.near)**2))&&(b0.copy(c).invert(),bs.copy(t.ray).applyMatrix4(b0),!(s.boundingBox!==null&&bs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,bs)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,S=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,R=S.length;E<R;E++){const x=S[E],y=h[x.materialIndex],I=Math.max(x.start,M.start),O=Math.min(d.count,Math.min(x.start+x.count,M.start+M.count));for(let U=I,J=O;U<J;U+=3){const V=d.getX(U),P=d.getX(U+1),W=d.getX(U+2);l=Lc(this,y,t,s,p,g,_,V,P,W),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),R=Math.min(d.count,M.start+M.count);for(let x=E,y=R;x<y;x+=3){const I=d.getX(x),O=d.getX(x+1),U=d.getX(x+2);l=Lc(this,h,t,s,p,g,_,I,O,U),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let E=0,R=S.length;E<R;E++){const x=S[E],y=h[x.materialIndex],I=Math.max(x.start,M.start),O=Math.min(m.count,Math.min(x.start+x.count,M.start+M.count));for(let U=I,J=O;U<J;U+=3){const V=U,P=U+1,W=U+2;l=Lc(this,y,t,s,p,g,_,V,P,W),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),R=Math.min(m.count,M.start+M.count);for(let x=E,y=R;x<y;x+=3){const I=x,O=x+1,U=x+2;l=Lc(this,h,t,s,p,g,_,I,O,U),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function XM(r,t,i,s,l,c,h,d){let m;if(t.side===$n?m=s.intersectTriangle(h,c,l,!0,d):m=s.intersectTriangle(l,c,h,t.side===ts,d),m===null)return null;Uc.copy(d),Uc.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(Uc);return p<i.near||p>i.far?null:{distance:p,point:Uc.clone(),object:r}}function Lc(r,t,i,s,l,c,h,d,m,p){r.getVertexPosition(d,Rc),r.getVertexPosition(m,Cc),r.getVertexPosition(p,wc);const g=XM(r,t,i,s,Rc,Cc,wc,A0);if(g){const _=new F;Ni.getBarycoord(A0,Rc,Cc,wc,_),l&&(g.uv=Ni.getInterpolatedAttribute(l,d,m,p,_,new re)),c&&(g.uv1=Ni.getInterpolatedAttribute(c,d,m,p,_,new re)),h&&(g.normal=Ni.getInterpolatedAttribute(h,d,m,p,_,new F),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const S={a:d,b:m,c:p,normal:new F,materialIndex:0};Ni.getNormal(Rc,Cc,wc,S.normal),g.face=S,g.barycoord=_}return g}class Kr extends fi{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],g=[],_=[];let S=0,M=0;E("z","y","x",-1,-1,s,i,t,h,c,0),E("z","y","x",1,-1,s,i,-t,h,c,1),E("x","z","y",1,1,t,s,i,l,h,2),E("x","z","y",1,-1,t,s,-i,l,h,3),E("x","y","z",1,-1,t,i,s,l,c,4),E("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new ei(p,3)),this.setAttribute("normal",new ei(g,3)),this.setAttribute("uv",new ei(_,2));function E(R,x,y,I,O,U,J,V,P,W,D){const C=U/P,w=J/W,j=U/2,et=J/2,mt=V/2,gt=P+1,z=W+1;let Q=0,K=0;const xt=new F;for(let bt=0;bt<z;bt++){const N=bt*w-et;for(let at=0;at<gt;at++){const St=at*C-j;xt[R]=St*I,xt[x]=N*O,xt[y]=mt,p.push(xt.x,xt.y,xt.z),xt[R]=0,xt[x]=0,xt[y]=V>0?1:-1,g.push(xt.x,xt.y,xt.z),_.push(at/P),_.push(1-bt/W),Q+=1}}for(let bt=0;bt<W;bt++)for(let N=0;N<P;N++){const at=S+N+gt*bt,St=S+N+gt*(bt+1),Z=S+(N+1)+gt*(bt+1),ct=S+(N+1)+gt*bt;m.push(at,St,ct),m.push(St,Z,ct),K+=6}d.addGroup(M,K,D),M+=K,S+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function jr(r){const t={};for(const i in r){t[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function kn(r){const t={};for(let i=0;i<r.length;i++){const s=jr(r[i]);for(const l in s)t[l]=s[l]}return t}function WM(r){const t=[];for(let i=0;i<r.length;i++)t.push(r[i].clone());return t}function Vv(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const qM={clone:jr,merge:kn};var YM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class es extends Fs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=YM,this.fragmentShader=jM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=jr(t.uniforms),this.uniformsGroups=WM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class kv extends Tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=ya}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ka=new F,R0=new re,C0=new re;class Mi extends kv{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=nl*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Jo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return nl*2*Math.atan(Math.tan(Jo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){Ka.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ka.x,Ka.y).multiplyScalar(-t/Ka.z),Ka.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ka.x,Ka.y).multiplyScalar(-t/Ka.z)}getViewSize(t,i){return this.getViewBounds(t,R0,C0),i.subVectors(C0,R0)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Jo*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Ur=-90,Lr=1;class ZM extends Tn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Mi(Ur,Lr,t,i);l.layers=this.layers,this.add(l);const c=new Mi(Ur,Lr,t,i);c.layers=this.layers,this.add(c);const h=new Mi(Ur,Lr,t,i);h.layers=this.layers,this.add(h);const d=new Mi(Ur,Lr,t,i);d.layers=this.layers,this.add(d);const m=new Mi(Ur,Lr,t,i);m.layers=this.layers,this.add(m);const p=new Mi(Ur,Lr,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(t===ya)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===$c)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,g]=this.children,_=t.getRenderTarget(),S=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const R=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,m),t.setRenderTarget(s,4,l),t.render(i,p),s.texture.generateMipmaps=R,t.setRenderTarget(s,5,l),t.render(i,g),t.setRenderTarget(_,S,M),t.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class Xv extends ti{constructor(t,i,s,l,c,h,d,m,p,g){t=t!==void 0?t:[],i=i!==void 0?i:kr,super(t,i,s,l,c,h,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class KM extends Bs{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new Xv(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Xi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Kr(5,5,5),c=new es({name:"CubemapFromEquirect",uniforms:jr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:$n,blending:Ja});c.uniforms.tEquirect.value=i;const h=new Jn(l,c),d=i.minFilter;return i.minFilter===Ps&&(i.minFilter=Xi),new ZM(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}class up{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new he(t),this.near=i,this.far=s}clone(){return new up(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class QM extends Tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qi,this.environmentIntensity=1,this.environmentRotation=new qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const kh=new F,JM=new F,$M=new se;class Vi{constructor(t=new F(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=kh.subVectors(s,i).cross(JM.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(kh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||$M.getNormalMatrix(t),l=this.coplanarPoint(kh).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ts=new ou,Nc=new F;class fp{constructor(t=new Vi,i=new Vi,s=new Vi,l=new Vi,c=new Vi,h=new Vi){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ya){const s=this.planes,l=t.elements,c=l[0],h=l[1],d=l[2],m=l[3],p=l[4],g=l[5],_=l[6],S=l[7],M=l[8],E=l[9],R=l[10],x=l[11],y=l[12],I=l[13],O=l[14],U=l[15];if(s[0].setComponents(m-c,S-p,x-M,U-y).normalize(),s[1].setComponents(m+c,S+p,x+M,U+y).normalize(),s[2].setComponents(m+h,S+g,x+E,U+I).normalize(),s[3].setComponents(m-h,S-g,x-E,U-I).normalize(),s[4].setComponents(m-d,S-_,x-R,U-O).normalize(),i===ya)s[5].setComponents(m+d,S+_,x+R,U+O).normalize();else if(i===$c)s[5].setComponents(d,_,R,O).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ts.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ts.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ts)}intersectsSprite(t){return Ts.center.set(0,0,0),Ts.radius=.7071067811865476,Ts.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ts)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Nc.x=l.normal.x>0?t.max.x:t.min.x,Nc.y=l.normal.y>0?t.max.y:t.min.y,Nc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Nc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lu extends Fs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const eu=new F,nu=new F,w0=new Xe,Ko=new al,Oc=new ou,Xh=new F,D0=new F;class Wv extends Tn{constructor(t=new fi,i=new lu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)eu.fromBufferAttribute(i,l-1),nu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=eu.distanceTo(nu);t.setAttribute("lineDistance",new ei(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Oc.copy(s.boundingSphere),Oc.applyMatrix4(l),Oc.radius+=c,t.ray.intersectsSphere(Oc)===!1)return;w0.copy(l).invert(),Ko.copy(t.ray).applyMatrix4(w0);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,S=s.attributes.position;if(g!==null){const M=Math.max(0,h.start),E=Math.min(g.count,h.start+h.count);for(let R=M,x=E-1;R<x;R+=p){const y=g.getX(R),I=g.getX(R+1),O=Pc(this,t,Ko,m,y,I);O&&i.push(O)}if(this.isLineLoop){const R=g.getX(E-1),x=g.getX(M),y=Pc(this,t,Ko,m,R,x);y&&i.push(y)}}else{const M=Math.max(0,h.start),E=Math.min(S.count,h.start+h.count);for(let R=M,x=E-1;R<x;R+=p){const y=Pc(this,t,Ko,m,R,R+1);y&&i.push(y)}if(this.isLineLoop){const R=Pc(this,t,Ko,m,E-1,M);R&&i.push(R)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Pc(r,t,i,s,l,c){const h=r.geometry.attributes.position;if(eu.fromBufferAttribute(h,l),nu.fromBufferAttribute(h,c),i.distanceSqToSegment(eu,nu,Xh,D0)>s)return;Xh.applyMatrix4(r.matrixWorld);const m=t.ray.origin.distanceTo(Xh);if(!(m<t.near||m>t.far))return{distance:m,point:D0.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}const U0=new F,L0=new F;class qv extends Wv{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)U0.fromBufferAttribute(i,l),L0.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+U0.distanceTo(L0);t.setAttribute("lineDistance",new ei(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zc extends Tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Yv extends ti{constructor(t,i,s,l,c,h,d,m,p,g=Hr){if(g!==Hr&&g!==qr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===Hr&&(s=zs),s===void 0&&g===qr&&(s=Wr),super(null,l,c,h,d,m,g,s,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:Pi,this.minFilter=m!==void 0?m:Pi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class iu extends fi{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],h=[],d=[],m=[],p=new F,g=new re;h.push(0,0,0),d.push(0,0,1),m.push(.5,.5);for(let _=0,S=3;_<=i;_++,S+=3){const M=s+_/i*l;p.x=t*Math.cos(M),p.y=t*Math.sin(M),h.push(p.x,p.y,p.z),d.push(0,0,1),g.x=(h[S]/t+1)/2,g.y=(h[S+1]/t+1)/2,m.push(g.x,g.y)}for(let _=1;_<=i;_++)c.push(_,_+1,0);this.setIndex(c),this.setAttribute("position",new ei(h,3)),this.setAttribute("normal",new ei(d,3)),this.setAttribute("uv",new ei(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new iu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class sl extends fi{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,_=t/d,S=i/m,M=[],E=[],R=[],x=[];for(let y=0;y<g;y++){const I=y*S-h;for(let O=0;O<p;O++){const U=O*_-c;E.push(U,-I,0),R.push(0,0,1),x.push(O/d),x.push(1-y/m)}}for(let y=0;y<m;y++)for(let I=0;I<d;I++){const O=I+p*y,U=I+p*(y+1),J=I+1+p*(y+1),V=I+1+p*y;M.push(O,U,V),M.push(U,J,V)}this.setIndex(M),this.setAttribute("position",new ei(E,3)),this.setAttribute("normal",new ei(R,3)),this.setAttribute("uv",new ei(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sl(t.width,t.height,t.widthSegments,t.heightSegments)}}class tE extends Fs{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new he(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Wh extends Fs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ov,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class eE extends Fs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$x,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class nE extends Fs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class jv extends Tn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class iE extends jv{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new he(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}}const qh=new Xe,N0=new F,O0=new F;class aE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fp,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;N0.setFromMatrixPosition(t.matrixWorld),i.position.copy(N0),O0.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(O0),i.updateMatrixWorld(),qh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qh),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(qh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Zv extends kv{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class sE extends aE{constructor(){super(new Zv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rE extends jv{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.target=new Tn,this.shadow=new sE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class oE extends Mi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const P0=new Xe;class lE{constructor(t,i,s=0,l=1/0){this.ray=new al(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new cp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return P0.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(P0),this}intersectObject(t,i=!0,s=[]){return Kd(t,this,s,i),s.sort(z0),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)Kd(t[l],this,s,i);return s.sort(z0),s}}function z0(r,t){return r.distance-t.distance}function Kd(r,t,i,s){let l=!0;if(r.layers.test(t.layers)&&r.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=r.children;for(let h=0,d=c.length;h<d;h++)Kd(c[h],t,i,!0)}}class B0{constructor(t=1,i=0,s=0){return this.radius=t,this.phi=i,this.theta=s,this}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=pe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(pe(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class cE extends qv{constructor(t=10,i=10,s=4473924,l=8947848){s=new he(s),l=new he(l);const c=i/2,h=t/i,d=t/2,m=[],p=[];for(let S=0,M=0,E=-d;S<=i;S++,E+=h){m.push(-d,0,E,d,0,E),m.push(E,0,-d,E,0,d);const R=S===c?s:l;R.toArray(p,M),M+=3,R.toArray(p,M),M+=3,R.toArray(p,M),M+=3,R.toArray(p,M),M+=3}const g=new fi;g.setAttribute("position",new ei(m,3)),g.setAttribute("color",new ei(p,3));const _=new lu({vertexColors:!0,toneMapped:!1});super(g,_),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Bc=new Wi;class uE extends qv{constructor(t,i=16776960){const s=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),l=new Float32Array(24),c=new fi;c.setIndex(new Xn(s,1)),c.setAttribute("position",new Xn(l,3)),super(c,new lu({color:i,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Bc.setFromObject(this.object),Bc.isEmpty())return;const i=Bc.min,s=Bc.max,l=this.geometry.attributes.position,c=l.array;c[0]=s.x,c[1]=s.y,c[2]=s.z,c[3]=i.x,c[4]=s.y,c[5]=s.z,c[6]=i.x,c[7]=i.y,c[8]=s.z,c[9]=s.x,c[10]=i.y,c[11]=s.z,c[12]=s.x,c[13]=s.y,c[14]=i.z,c[15]=i.x,c[16]=s.y,c[17]=i.z,c[18]=i.x,c[19]=i.y,c[20]=i.z,c[21]=s.x,c[22]=i.y,c[23]=i.z,l.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,i){return super.copy(t,i),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class fE extends Is{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function I0(r,t,i,s){const l=hE(s);switch(i){case Rv:return r*t;case wv:return r*t;case Dv:return r*t*2;case Uv:return r*t/l.components*l.byteLength;case sp:return r*t/l.components*l.byteLength;case Lv:return r*t*2/l.components*l.byteLength;case rp:return r*t*2/l.components*l.byteLength;case Cv:return r*t*3/l.components*l.byteLength;case Oi:return r*t*4/l.components*l.byteLength;case op:return r*t*4/l.components*l.byteLength;case Wc:case qc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Yc:case jc:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Td:case Rd:return Math.max(r,16)*Math.max(t,8)/4;case bd:case Ad:return Math.max(r,8)*Math.max(t,8)/2;case Cd:case wd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Dd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ld:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Nd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Od:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Pd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case zd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Bd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Fd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Hd:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Gd:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case kd:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Xd:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Zc:case Wd:case qd:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Nv:case Yd:return Math.ceil(r/4)*Math.ceil(t/4)*8;case jd:case Zd:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function hE(r){switch(r){case xa:case bv:return{byteLength:1,components:1};case el:case Tv:case il:return{byteLength:2,components:1};case ip:case ap:return{byteLength:2,components:4};case zs:case np:case va:return{byteLength:4,components:1};case Av:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ep}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ep);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kv(){let r=null,t=!1,i=null,s=null;function l(c,h){i(c,h),s=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function dE(r){const t=new WeakMap;function i(d,m){const p=d.array,g=d.usage,_=p.byteLength,S=r.createBuffer();r.bindBuffer(m,S),r.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=r.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=r.SHORT;else if(p instanceof Uint32Array)M=r.UNSIGNED_INT;else if(p instanceof Int32Array)M=r.INT;else if(p instanceof Int8Array)M=r.BYTE;else if(p instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:S,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function s(d,m,p){const g=m.array,_=m.updateRanges;if(r.bindBuffer(p,d),_.length===0)r.bufferSubData(p,0,g);else{_.sort((M,E)=>M.start-E.start);let S=0;for(let M=1;M<_.length;M++){const E=_[S],R=_[M];R.start<=E.start+E.count+1?E.count=Math.max(E.count,R.start+R.count-E.start):(++S,_[S]=R)}_.length=S+1;for(let M=0,E=_.length;M<E;M++){const R=_[M];r.bufferSubData(p,R.start*g.BYTES_PER_ELEMENT,g,R.start,R.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(r.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=t.get(d);(!g||g.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var pE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mE=`#ifdef USE_ALPHAHASH
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
#endif`,gE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_E=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yE=`#ifdef USE_ALPHATEST
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
#endif`,xE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ME=`#ifdef USE_BATCHING
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
#endif`,EE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,TE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,AE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,RE=`#ifdef USE_IRIDESCENCE
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
#endif`,CE=`#ifdef USE_BUMPMAP
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
#endif`,wE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,DE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,LE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,OE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,BE=`#define PI 3.141592653589793
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
} // validated`,IE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,FE=`vec3 transformedNormal = objectNormal;
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
#endif`,HE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,VE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,XE="gl_FragColor = linearToOutputTexel( gl_FragColor );",WE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qE=`#ifdef USE_ENVMAP
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
#endif`,YE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jE=`#ifdef USE_ENVMAP
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
#endif`,ZE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,KE=`#ifdef USE_ENVMAP
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
#endif`,QE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,JE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$E=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eb=`#ifdef USE_GRADIENTMAP
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
}`,nb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ib=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ab=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sb=`uniform bool receiveShadow;
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
#endif`,rb=`#ifdef USE_ENVMAP
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
#endif`,ob=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ub=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fb=`PhysicalMaterial material;
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
#endif`,hb=`struct PhysicalMaterial {
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
}`,db=`
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
#endif`,pb=`#if defined( RE_IndirectDiffuse )
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
#endif`,mb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_b=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Eb=`#if defined( USE_POINTS_UV )
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
#endif`,bb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ab=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wb=`#ifdef USE_MORPHTARGETS
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
#endif`,Db=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ub=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ob=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zb=`#ifdef USE_NORMALMAP
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
#endif`,Bb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ib=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jb=`float getShadowMask() {
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
}`,$b=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tT=`#ifdef USE_SKINNING
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
#endif`,eT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nT=`#ifdef USE_SKINNING
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
#endif`,iT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,oT=`#ifdef USE_TRANSMISSION
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
#endif`,lT=`#ifdef USE_TRANSMISSION
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
#endif`,cT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pT=`uniform sampler2D t2D;
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
}`,mT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_T=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yT=`#include <common>
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
}`,xT=`#define DISTANCE
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
}`,MT=`#define DISTANCE
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
}`,ET=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TT=`uniform float scale;
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
}`,AT=`uniform vec3 diffuse;
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
}`,RT=`#include <common>
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
}`,CT=`uniform vec3 diffuse;
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
}`,wT=`#define LAMBERT
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
}`,DT=`#define LAMBERT
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
}`,UT=`#define MATCAP
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
}`,LT=`#define MATCAP
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
}`,NT=`#define NORMAL
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
}`,OT=`#define NORMAL
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
}`,PT=`#define PHONG
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
}`,zT=`#define PHONG
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
}`,BT=`#define STANDARD
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
}`,IT=`#define STANDARD
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
}`,FT=`#define TOON
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
}`,HT=`#define TOON
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
}`,GT=`uniform float size;
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
}`,VT=`uniform vec3 diffuse;
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
}`,kT=`#include <common>
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
}`,XT=`uniform vec3 color;
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
}`,WT=`uniform float rotation;
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
}`,qT=`uniform vec3 diffuse;
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
}`,fe={alphahash_fragment:pE,alphahash_pars_fragment:mE,alphamap_fragment:gE,alphamap_pars_fragment:_E,alphatest_fragment:vE,alphatest_pars_fragment:yE,aomap_fragment:SE,aomap_pars_fragment:xE,batching_pars_vertex:ME,batching_vertex:EE,begin_vertex:bE,beginnormal_vertex:TE,bsdfs:AE,iridescence_fragment:RE,bumpmap_pars_fragment:CE,clipping_planes_fragment:wE,clipping_planes_pars_fragment:DE,clipping_planes_pars_vertex:UE,clipping_planes_vertex:LE,color_fragment:NE,color_pars_fragment:OE,color_pars_vertex:PE,color_vertex:zE,common:BE,cube_uv_reflection_fragment:IE,defaultnormal_vertex:FE,displacementmap_pars_vertex:HE,displacementmap_vertex:GE,emissivemap_fragment:VE,emissivemap_pars_fragment:kE,colorspace_fragment:XE,colorspace_pars_fragment:WE,envmap_fragment:qE,envmap_common_pars_fragment:YE,envmap_pars_fragment:jE,envmap_pars_vertex:ZE,envmap_physical_pars_fragment:rb,envmap_vertex:KE,fog_vertex:QE,fog_pars_vertex:JE,fog_fragment:$E,fog_pars_fragment:tb,gradientmap_pars_fragment:eb,lightmap_pars_fragment:nb,lights_lambert_fragment:ib,lights_lambert_pars_fragment:ab,lights_pars_begin:sb,lights_toon_fragment:ob,lights_toon_pars_fragment:lb,lights_phong_fragment:cb,lights_phong_pars_fragment:ub,lights_physical_fragment:fb,lights_physical_pars_fragment:hb,lights_fragment_begin:db,lights_fragment_maps:pb,lights_fragment_end:mb,logdepthbuf_fragment:gb,logdepthbuf_pars_fragment:_b,logdepthbuf_pars_vertex:vb,logdepthbuf_vertex:yb,map_fragment:Sb,map_pars_fragment:xb,map_particle_fragment:Mb,map_particle_pars_fragment:Eb,metalnessmap_fragment:bb,metalnessmap_pars_fragment:Tb,morphinstance_vertex:Ab,morphcolor_vertex:Rb,morphnormal_vertex:Cb,morphtarget_pars_vertex:wb,morphtarget_vertex:Db,normal_fragment_begin:Ub,normal_fragment_maps:Lb,normal_pars_fragment:Nb,normal_pars_vertex:Ob,normal_vertex:Pb,normalmap_pars_fragment:zb,clearcoat_normal_fragment_begin:Bb,clearcoat_normal_fragment_maps:Ib,clearcoat_pars_fragment:Fb,iridescence_pars_fragment:Hb,opaque_fragment:Gb,packing:Vb,premultiplied_alpha_fragment:kb,project_vertex:Xb,dithering_fragment:Wb,dithering_pars_fragment:qb,roughnessmap_fragment:Yb,roughnessmap_pars_fragment:jb,shadowmap_pars_fragment:Zb,shadowmap_pars_vertex:Kb,shadowmap_vertex:Qb,shadowmask_pars_fragment:Jb,skinbase_vertex:$b,skinning_pars_vertex:tT,skinning_vertex:eT,skinnormal_vertex:nT,specularmap_fragment:iT,specularmap_pars_fragment:aT,tonemapping_fragment:sT,tonemapping_pars_fragment:rT,transmission_fragment:oT,transmission_pars_fragment:lT,uv_pars_fragment:cT,uv_pars_vertex:uT,uv_vertex:fT,worldpos_vertex:hT,background_vert:dT,background_frag:pT,backgroundCube_vert:mT,backgroundCube_frag:gT,cube_vert:_T,cube_frag:vT,depth_vert:yT,depth_frag:ST,distanceRGBA_vert:xT,distanceRGBA_frag:MT,equirect_vert:ET,equirect_frag:bT,linedashed_vert:TT,linedashed_frag:AT,meshbasic_vert:RT,meshbasic_frag:CT,meshlambert_vert:wT,meshlambert_frag:DT,meshmatcap_vert:UT,meshmatcap_frag:LT,meshnormal_vert:NT,meshnormal_frag:OT,meshphong_vert:PT,meshphong_frag:zT,meshphysical_vert:BT,meshphysical_frag:IT,meshtoon_vert:FT,meshtoon_frag:HT,points_vert:GT,points_frag:VT,shadow_vert:kT,shadow_frag:XT,sprite_vert:WT,sprite_frag:qT},Lt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new se}},envmap:{envMap:{value:null},envMapRotation:{value:new se},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new se}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new se}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new se},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new se},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new se},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new se}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new se}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new se}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0},uvTransform:{value:new se}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new se},alphaMap:{value:null},alphaMapTransform:{value:new se},alphaTest:{value:0}}},ki={basic:{uniforms:kn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:fe.meshbasic_vert,fragmentShader:fe.meshbasic_frag},lambert:{uniforms:kn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new he(0)}}]),vertexShader:fe.meshlambert_vert,fragmentShader:fe.meshlambert_frag},phong:{uniforms:kn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:fe.meshphong_vert,fragmentShader:fe.meshphong_frag},standard:{uniforms:kn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag},toon:{uniforms:kn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new he(0)}}]),vertexShader:fe.meshtoon_vert,fragmentShader:fe.meshtoon_frag},matcap:{uniforms:kn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:fe.meshmatcap_vert,fragmentShader:fe.meshmatcap_frag},points:{uniforms:kn([Lt.points,Lt.fog]),vertexShader:fe.points_vert,fragmentShader:fe.points_frag},dashed:{uniforms:kn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fe.linedashed_vert,fragmentShader:fe.linedashed_frag},depth:{uniforms:kn([Lt.common,Lt.displacementmap]),vertexShader:fe.depth_vert,fragmentShader:fe.depth_frag},normal:{uniforms:kn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:fe.meshnormal_vert,fragmentShader:fe.meshnormal_frag},sprite:{uniforms:kn([Lt.sprite,Lt.fog]),vertexShader:fe.sprite_vert,fragmentShader:fe.sprite_frag},background:{uniforms:{uvTransform:{value:new se},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fe.background_vert,fragmentShader:fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new se}},vertexShader:fe.backgroundCube_vert,fragmentShader:fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fe.cube_vert,fragmentShader:fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fe.equirect_vert,fragmentShader:fe.equirect_frag},distanceRGBA:{uniforms:kn([Lt.common,Lt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fe.distanceRGBA_vert,fragmentShader:fe.distanceRGBA_frag},shadow:{uniforms:kn([Lt.lights,Lt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:fe.shadow_vert,fragmentShader:fe.shadow_frag}};ki.physical={uniforms:kn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new se},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new se},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new se},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new se},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new se},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new se},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new se},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new se},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new se},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new se},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new se},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new se}}]),vertexShader:fe.meshphysical_vert,fragmentShader:fe.meshphysical_frag};const Ic={r:0,b:0,g:0},As=new qi,YT=new Xe;function jT(r,t,i,s,l,c,h){const d=new he(0);let m=c===!0?0:1,p,g,_=null,S=0,M=null;function E(O){let U=O.isScene===!0?O.background:null;return U&&U.isTexture&&(U=(O.backgroundBlurriness>0?i:t).get(U)),U}function R(O){let U=!1;const J=E(O);J===null?y(d,m):J&&J.isColor&&(y(J,1),U=!0);const V=r.xr.getEnvironmentBlendMode();V==="additive"?s.buffers.color.setClear(0,0,0,1,h):V==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(r.autoClear||U)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(O,U){const J=E(U);J&&(J.isCubeTexture||J.mapping===ru)?(g===void 0&&(g=new Jn(new Kr(1,1,1),new es({name:"BackgroundCubeMaterial",uniforms:jr(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(V,P,W){this.matrixWorld.copyPosition(W.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),As.copy(U.backgroundRotation),As.x*=-1,As.y*=-1,As.z*=-1,J.isCubeTexture&&J.isRenderTargetTexture===!1&&(As.y*=-1,As.z*=-1),g.material.uniforms.envMap.value=J,g.material.uniforms.flipEnvMap.value=J.isCubeTexture&&J.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(YT.makeRotationFromEuler(As)),g.material.toneMapped=Ue.getTransfer(J.colorSpace)!==Ve,(_!==J||S!==J.version||M!==r.toneMapping)&&(g.material.needsUpdate=!0,_=J,S=J.version,M=r.toneMapping),g.layers.enableAll(),O.unshift(g,g.geometry,g.material,0,0,null)):J&&J.isTexture&&(p===void 0&&(p=new Jn(new sl(2,2),new es({name:"BackgroundMaterial",uniforms:jr(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=J,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.toneMapped=Ue.getTransfer(J.colorSpace)!==Ve,J.matrixAutoUpdate===!0&&J.updateMatrix(),p.material.uniforms.uvTransform.value.copy(J.matrix),(_!==J||S!==J.version||M!==r.toneMapping)&&(p.material.needsUpdate=!0,_=J,S=J.version,M=r.toneMapping),p.layers.enableAll(),O.unshift(p,p.geometry,p.material,0,0,null))}function y(O,U){O.getRGB(Ic,Vv(r)),s.buffers.color.setClear(Ic.r,Ic.g,Ic.b,U,h)}function I(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(O,U=1){d.set(O),m=U,y(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(O){m=O,y(d,m)},render:R,addToRenderList:x,dispose:I}}function ZT(r,t){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=S(null);let c=l,h=!1;function d(C,w,j,et,mt){let gt=!1;const z=_(et,j,w);c!==z&&(c=z,p(c.object)),gt=M(C,et,j,mt),gt&&E(C,et,j,mt),mt!==null&&t.update(mt,r.ELEMENT_ARRAY_BUFFER),(gt||h)&&(h=!1,U(C,w,j,et),mt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(mt).buffer))}function m(){return r.createVertexArray()}function p(C){return r.bindVertexArray(C)}function g(C){return r.deleteVertexArray(C)}function _(C,w,j){const et=j.wireframe===!0;let mt=s[C.id];mt===void 0&&(mt={},s[C.id]=mt);let gt=mt[w.id];gt===void 0&&(gt={},mt[w.id]=gt);let z=gt[et];return z===void 0&&(z=S(m()),gt[et]=z),z}function S(C){const w=[],j=[],et=[];for(let mt=0;mt<i;mt++)w[mt]=0,j[mt]=0,et[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:j,attributeDivisors:et,object:C,attributes:{},index:null}}function M(C,w,j,et){const mt=c.attributes,gt=w.attributes;let z=0;const Q=j.getAttributes();for(const K in Q)if(Q[K].location>=0){const bt=mt[K];let N=gt[K];if(N===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),bt===void 0||bt.attribute!==N||N&&bt.data!==N.data)return!0;z++}return c.attributesNum!==z||c.index!==et}function E(C,w,j,et){const mt={},gt=w.attributes;let z=0;const Q=j.getAttributes();for(const K in Q)if(Q[K].location>=0){let bt=gt[K];bt===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(bt=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(bt=C.instanceColor));const N={};N.attribute=bt,bt&&bt.data&&(N.data=bt.data),mt[K]=N,z++}c.attributes=mt,c.attributesNum=z,c.index=et}function R(){const C=c.newAttributes;for(let w=0,j=C.length;w<j;w++)C[w]=0}function x(C){y(C,0)}function y(C,w){const j=c.newAttributes,et=c.enabledAttributes,mt=c.attributeDivisors;j[C]=1,et[C]===0&&(r.enableVertexAttribArray(C),et[C]=1),mt[C]!==w&&(r.vertexAttribDivisor(C,w),mt[C]=w)}function I(){const C=c.newAttributes,w=c.enabledAttributes;for(let j=0,et=w.length;j<et;j++)w[j]!==C[j]&&(r.disableVertexAttribArray(j),w[j]=0)}function O(C,w,j,et,mt,gt,z){z===!0?r.vertexAttribIPointer(C,w,j,mt,gt):r.vertexAttribPointer(C,w,j,et,mt,gt)}function U(C,w,j,et){R();const mt=et.attributes,gt=j.getAttributes(),z=w.defaultAttributeValues;for(const Q in gt){const K=gt[Q];if(K.location>=0){let xt=mt[Q];if(xt===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(xt=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(xt=C.instanceColor)),xt!==void 0){const bt=xt.normalized,N=xt.itemSize,at=t.get(xt);if(at===void 0)continue;const St=at.buffer,Z=at.type,ct=at.bytesPerElement,Et=Z===r.INT||Z===r.UNSIGNED_INT||xt.gpuType===np;if(xt.isInterleavedBufferAttribute){const yt=xt.data,Gt=yt.stride,Ft=xt.offset;if(yt.isInstancedInterleavedBuffer){for(let ie=0;ie<K.locationSize;ie++)y(K.location+ie,yt.meshPerAttribute);C.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let ie=0;ie<K.locationSize;ie++)x(K.location+ie);r.bindBuffer(r.ARRAY_BUFFER,St);for(let ie=0;ie<K.locationSize;ie++)O(K.location+ie,N/K.locationSize,Z,bt,Gt*ct,(Ft+N/K.locationSize*ie)*ct,Et)}else{if(xt.isInstancedBufferAttribute){for(let yt=0;yt<K.locationSize;yt++)y(K.location+yt,xt.meshPerAttribute);C.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let yt=0;yt<K.locationSize;yt++)x(K.location+yt);r.bindBuffer(r.ARRAY_BUFFER,St);for(let yt=0;yt<K.locationSize;yt++)O(K.location+yt,N/K.locationSize,Z,bt,N*ct,N/K.locationSize*yt*ct,Et)}}else if(z!==void 0){const bt=z[Q];if(bt!==void 0)switch(bt.length){case 2:r.vertexAttrib2fv(K.location,bt);break;case 3:r.vertexAttrib3fv(K.location,bt);break;case 4:r.vertexAttrib4fv(K.location,bt);break;default:r.vertexAttrib1fv(K.location,bt)}}}}I()}function J(){W();for(const C in s){const w=s[C];for(const j in w){const et=w[j];for(const mt in et)g(et[mt].object),delete et[mt];delete w[j]}delete s[C]}}function V(C){if(s[C.id]===void 0)return;const w=s[C.id];for(const j in w){const et=w[j];for(const mt in et)g(et[mt].object),delete et[mt];delete w[j]}delete s[C.id]}function P(C){for(const w in s){const j=s[w];if(j[C.id]===void 0)continue;const et=j[C.id];for(const mt in et)g(et[mt].object),delete et[mt];delete j[C.id]}}function W(){D(),h=!0,c!==l&&(c=l,p(c.object))}function D(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:W,resetDefaultState:D,dispose:J,releaseStatesOfGeometry:V,releaseStatesOfProgram:P,initAttributes:R,enableAttribute:x,disableUnusedAttributes:I}}function KT(r,t,i){let s;function l(p){s=p}function c(p,g){r.drawArrays(s,p,g),i.update(g,s,1)}function h(p,g,_){_!==0&&(r.drawArraysInstanced(s,p,g,_),i.update(g,s,_))}function d(p,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,_);let M=0;for(let E=0;E<_;E++)M+=g[E];i.update(M,s,1)}function m(p,g,_,S){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<p.length;E++)h(p[E],g[E],S[E]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,g,0,S,0,_);let E=0;for(let R=0;R<_;R++)E+=g[R]*S[R];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function QT(r,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Oi&&s.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const W=P===il&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==xa&&s.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==va&&!W)}function m(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=i.logarithmicDepthBuffer===!0,S=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),R=r.getParameter(r.MAX_TEXTURE_SIZE),x=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),y=r.getParameter(r.MAX_VERTEX_ATTRIBS),I=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),O=r.getParameter(r.MAX_VARYING_VECTORS),U=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),J=E>0,V=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reverseDepthBuffer:S,maxTextures:M,maxVertexTextures:E,maxTextureSize:R,maxCubemapSize:x,maxAttributes:y,maxVertexUniforms:I,maxVaryings:O,maxFragmentUniforms:U,vertexTextures:J,maxSamples:V}}function JT(r){const t=this;let i=null,s=0,l=!1,c=!1;const h=new Vi,d=new se,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,S){const M=_.length!==0||S||s!==0||l;return l=S,s=_.length,M},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,S){i=g(_,S,0)},this.setState=function(_,S,M){const E=_.clippingPlanes,R=_.clipIntersection,x=_.clipShadows,y=r.get(_);if(!l||E===null||E.length===0||c&&!x)c?g(null):p();else{const I=c?0:s,O=I*4;let U=y.clippingState||null;m.value=U,U=g(E,S,O,M);for(let J=0;J!==O;++J)U[J]=i[J];y.clippingState=U,this.numIntersection=R?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function g(_,S,M,E){const R=_!==null?_.length:0;let x=null;if(R!==0){if(x=m.value,E!==!0||x===null){const y=M+R*4,I=S.matrixWorldInverse;d.getNormalMatrix(I),(x===null||x.length<y)&&(x=new Float32Array(y));for(let O=0,U=M;O!==R;++O,U+=4)h.copy(_[O]).applyMatrix4(I,d),h.normal.toArray(x,U),x[U+3]=h.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=R,t.numIntersection=0,x}}function $T(r){let t=new WeakMap;function i(h,d){return d===Sd?h.mapping=kr:d===xd&&(h.mapping=Xr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===Sd||d===xd)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new KM(m.height);return p.fromEquirectangularTexture(r,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Br=4,F0=[.125,.215,.35,.446,.526,.582],Ns=20,Yh=new Zv,H0=new he;let jh=null,Zh=0,Kh=0,Qh=!1;const Us=(1+Math.sqrt(5))/2,Nr=1/Us,G0=[new F(-Us,Nr,0),new F(Us,Nr,0),new F(-Nr,0,Us),new F(Nr,0,Us),new F(0,Us,-Nr),new F(0,Us,Nr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class V0{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){jh=this._renderer.getRenderTarget(),Zh=this._renderer.getActiveCubeFace(),Kh=this._renderer.getActiveMipmapLevel(),Qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=W0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=X0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(jh,Zh,Kh),this._renderer.xr.enabled=Qh,t.scissorTest=!1,Fc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===kr||t.mapping===Xr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jh=this._renderer.getRenderTarget(),Zh=this._renderer.getActiveCubeFace(),Kh=this._renderer.getActiveMipmapLevel(),Qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Xi,minFilter:Xi,generateMipmaps:!1,type:il,format:Oi,colorSpace:Yr,depthBuffer:!1},l=k0(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=k0(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tA(c)),this._blurMaterial=eA(c,t,i)}return l}_compileMaterial(t){const i=new Jn(this._lodPlanes[0],t);this._renderer.compile(i,Yh)}_sceneToCubeUV(t,i,s,l){const d=new Mi(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,S=g.toneMapping;g.getClearColor(H0),g.toneMapping=$a,g.autoClear=!1;const M=new tl({name:"PMREM.Background",side:$n,depthWrite:!1,depthTest:!1}),E=new Jn(new Kr,M);let R=!1;const x=t.background;x?x.isColor&&(M.color.copy(x),t.background=null,R=!0):(M.color.copy(H0),R=!0);for(let y=0;y<6;y++){const I=y%3;I===0?(d.up.set(0,m[y],0),d.lookAt(p[y],0,0)):I===1?(d.up.set(0,0,m[y]),d.lookAt(0,p[y],0)):(d.up.set(0,m[y],0),d.lookAt(0,0,p[y]));const O=this._cubeSize;Fc(l,I*O,y>2?O:0,O,O),g.setRenderTarget(l),R&&g.render(E,d),g.render(t,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=S,g.autoClear=_,t.background=x}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===kr||t.mapping===Xr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=W0()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=X0());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new Jn(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;Fc(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Yh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=G0[(l-c-1)%G0.length];this._blur(t,c-1,c,h,d)}i.autoClear=s}_blur(t,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",c),this._halfBlur(h,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Jn(this._lodPlanes[l],p),S=p.uniforms,M=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Ns-1),R=c/E,x=isFinite(c)?1+Math.floor(g*R):Ns;x>Ns&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Ns}`);const y=[];let I=0;for(let P=0;P<Ns;++P){const W=P/R,D=Math.exp(-W*W/2);y.push(D),P===0?I+=D:P<x&&(I+=2*D)}for(let P=0;P<y.length;P++)y[P]=y[P]/I;S.envMap.value=t.texture,S.samples.value=x,S.weights.value=y,S.latitudinal.value=h==="latitudinal",d&&(S.poleAxis.value=d);const{_lodMax:O}=this;S.dTheta.value=E,S.mipInt.value=O-s;const U=this._sizeLods[l],J=3*U*(l>O-Br?l-O+Br:0),V=4*(this._cubeSize-U);Fc(i,J,V,3*U,2*U),m.setRenderTarget(i),m.render(_,Yh)}}function tA(r){const t=[],i=[],s=[];let l=r;const c=r-Br+1+F0.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>r-Br?m=F0[h-r+Br-1]:h===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,_=1+p,S=[g,g,_,g,_,_,g,g,_,_,g,_],M=6,E=6,R=3,x=2,y=1,I=new Float32Array(R*E*M),O=new Float32Array(x*E*M),U=new Float32Array(y*E*M);for(let V=0;V<M;V++){const P=V%3*2/3-1,W=V>2?0:-1,D=[P,W,0,P+2/3,W,0,P+2/3,W+1,0,P,W,0,P+2/3,W+1,0,P,W+1,0];I.set(D,R*E*V),O.set(S,x*E*V);const C=[V,V,V,V,V,V];U.set(C,y*E*V)}const J=new fi;J.setAttribute("position",new Xn(I,R)),J.setAttribute("uv",new Xn(O,x)),J.setAttribute("faceIndex",new Xn(U,y)),t.push(J),l>Br&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function k0(r,t,i){const s=new Bs(r,t,i);return s.texture.mapping=ru,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Fc(r,t,i,s,l){r.viewport.set(t,i,s,l),r.scissor.set(t,i,s,l)}function eA(r,t,i){const s=new Float32Array(Ns),l=new F(0,1,0);return new es({name:"SphericalGaussianBlur",defines:{n:Ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:hp(),fragmentShader:`

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
		`,blending:Ja,depthTest:!1,depthWrite:!1})}function X0(){return new es({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hp(),fragmentShader:`

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
		`,blending:Ja,depthTest:!1,depthWrite:!1})}function W0(){return new es({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ja,depthTest:!1,depthWrite:!1})}function hp(){return`

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
	`}function nA(r){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===Sd||m===xd,g=m===kr||m===Xr;if(p||g){let _=t.get(d);const S=_!==void 0?_.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==S)return i===null&&(i=new V0(r)),_=p?i.fromEquirectangular(d,_):i.fromCubemap(d,_),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),_.texture;if(_!==void 0)return _.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new V0(r)),_=p?i.fromEquirectangular(d):i.fromCubemap(d),_.texture.pmremVersion=d.pmremVersion,t.set(d,_),d.addEventListener("dispose",c),_.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function iA(r){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Pr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function aA(r,t,i,s){const l={},c=new WeakMap;function h(_){const S=_.target;S.index!==null&&t.remove(S.index);for(const E in S.attributes)t.remove(S.attributes[E]);S.removeEventListener("dispose",h),delete l[S.id];const M=c.get(S);M&&(t.remove(M),c.delete(S)),s.releaseStatesOfGeometry(S),S.isInstancedBufferGeometry===!0&&delete S._maxInstanceCount,i.memory.geometries--}function d(_,S){return l[S.id]===!0||(S.addEventListener("dispose",h),l[S.id]=!0,i.memory.geometries++),S}function m(_){const S=_.attributes;for(const M in S)t.update(S[M],r.ARRAY_BUFFER)}function p(_){const S=[],M=_.index,E=_.attributes.position;let R=0;if(M!==null){const I=M.array;R=M.version;for(let O=0,U=I.length;O<U;O+=3){const J=I[O+0],V=I[O+1],P=I[O+2];S.push(J,V,V,P,P,J)}}else if(E!==void 0){const I=E.array;R=E.version;for(let O=0,U=I.length/3-1;O<U;O+=3){const J=O+0,V=O+1,P=O+2;S.push(J,V,V,P,P,J)}}else return;const x=new(zv(S)?Gv:Hv)(S,1);x.version=R;const y=c.get(_);y&&t.remove(y),c.set(_,x)}function g(_){const S=c.get(_);if(S){const M=_.index;M!==null&&S.version<M.version&&p(_)}else p(_);return c.get(_)}return{get:d,update:m,getWireframeAttribute:g}}function sA(r,t,i){let s;function l(S){s=S}let c,h;function d(S){c=S.type,h=S.bytesPerElement}function m(S,M){r.drawElements(s,M,c,S*h),i.update(M,s,1)}function p(S,M,E){E!==0&&(r.drawElementsInstanced(s,M,c,S*h,E),i.update(M,s,E))}function g(S,M,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,S,0,E);let x=0;for(let y=0;y<E;y++)x+=M[y];i.update(x,s,1)}function _(S,M,E,R){if(E===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<S.length;y++)p(S[y]/h,M[y],R[y]);else{x.multiDrawElementsInstancedWEBGL(s,M,0,c,S,0,R,0,E);let y=0;for(let I=0;I<E;I++)y+=M[I]*R[I];i.update(y,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function rA(r){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case r.TRIANGLES:i.triangles+=d*(c/3);break;case r.LINES:i.lines+=d*(c/2);break;case r.LINE_STRIP:i.lines+=d*(c-1);break;case r.LINE_LOOP:i.lines+=d*c;break;case r.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function oA(r,t,i){const s=new WeakMap,l=new sn;function c(h,d,m){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let S=s.get(d);if(S===void 0||S.count!==_){let C=function(){W.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var M=C;S!==void 0&&S.texture.dispose();const E=d.morphAttributes.position!==void 0,R=d.morphAttributes.normal!==void 0,x=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let U=0;E===!0&&(U=1),R===!0&&(U=2),x===!0&&(U=3);let J=d.attributes.position.count*U,V=1;J>t.maxTextureSize&&(V=Math.ceil(J/t.maxTextureSize),J=t.maxTextureSize);const P=new Float32Array(J*V*4*_),W=new Iv(P,J,V,_);W.type=va,W.needsUpdate=!0;const D=U*4;for(let w=0;w<_;w++){const j=y[w],et=I[w],mt=O[w],gt=J*V*4*w;for(let z=0;z<j.count;z++){const Q=z*D;E===!0&&(l.fromBufferAttribute(j,z),P[gt+Q+0]=l.x,P[gt+Q+1]=l.y,P[gt+Q+2]=l.z,P[gt+Q+3]=0),R===!0&&(l.fromBufferAttribute(et,z),P[gt+Q+4]=l.x,P[gt+Q+5]=l.y,P[gt+Q+6]=l.z,P[gt+Q+7]=0),x===!0&&(l.fromBufferAttribute(mt,z),P[gt+Q+8]=l.x,P[gt+Q+9]=l.y,P[gt+Q+10]=l.z,P[gt+Q+11]=mt.itemSize===4?l.w:1)}}S={count:_,texture:W,size:new re(J,V)},s.set(d,S),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",h.morphTexture,i);else{let E=0;for(let x=0;x<p.length;x++)E+=p[x];const R=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(r,"morphTargetBaseInfluence",R),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",S.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",S.size)}return{update:c}}function lA(r,t,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,g=m.geometry,_=t.get(m,g);if(l.get(_)!==p&&(t.update(_),l.set(_,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,r.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,r.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const S=m.skeleton;l.get(S)!==p&&(S.update(),l.set(S,p))}return _}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const Qv=new ti,q0=new Yv(1,1),Jv=new Iv,$v=new OM,ty=new Xv,Y0=[],j0=[],Z0=new Float32Array(16),K0=new Float32Array(9),Q0=new Float32Array(4);function Qr(r,t,i){const s=r[0];if(s<=0||s>0)return r;const l=t*i;let c=Y0[l];if(c===void 0&&(c=new Float32Array(l),Y0[l]=c),t!==0){s.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,r[h].toArray(c,d)}return c}function Sn(r,t){if(r.length!==t.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==t[i])return!1;return!0}function xn(r,t){for(let i=0,s=t.length;i<s;i++)r[i]=t[i]}function cu(r,t){let i=j0[t];i===void 0&&(i=new Int32Array(t),j0[t]=i);for(let s=0;s!==t;++s)i[s]=r.allocateTextureUnit();return i}function cA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1f(this.addr,t),i[0]=t)}function uA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;r.uniform2fv(this.addr,t),xn(i,t)}}function fA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(Sn(i,t))return;r.uniform3fv(this.addr,t),xn(i,t)}}function hA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;r.uniform4fv(this.addr,t),xn(i,t)}}function dA(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Sn(i,t))return;r.uniformMatrix2fv(this.addr,!1,t),xn(i,t)}else{if(Sn(i,s))return;Q0.set(s),r.uniformMatrix2fv(this.addr,!1,Q0),xn(i,s)}}function pA(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Sn(i,t))return;r.uniformMatrix3fv(this.addr,!1,t),xn(i,t)}else{if(Sn(i,s))return;K0.set(s),r.uniformMatrix3fv(this.addr,!1,K0),xn(i,s)}}function mA(r,t){const i=this.cache,s=t.elements;if(s===void 0){if(Sn(i,t))return;r.uniformMatrix4fv(this.addr,!1,t),xn(i,t)}else{if(Sn(i,s))return;Z0.set(s),r.uniformMatrix4fv(this.addr,!1,Z0),xn(i,s)}}function gA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1i(this.addr,t),i[0]=t)}function _A(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;r.uniform2iv(this.addr,t),xn(i,t)}}function vA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Sn(i,t))return;r.uniform3iv(this.addr,t),xn(i,t)}}function yA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;r.uniform4iv(this.addr,t),xn(i,t)}}function SA(r,t){const i=this.cache;i[0]!==t&&(r.uniform1ui(this.addr,t),i[0]=t)}function xA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(Sn(i,t))return;r.uniform2uiv(this.addr,t),xn(i,t)}}function MA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(Sn(i,t))return;r.uniform3uiv(this.addr,t),xn(i,t)}}function EA(r,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(Sn(i,t))return;r.uniform4uiv(this.addr,t),xn(i,t)}}function bA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(q0.compareFunction=Pv,c=q0):c=Qv,i.setTexture2D(t||c,l)}function TA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||$v,l)}function AA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||ty,l)}function RA(r,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||Jv,l)}function CA(r){switch(r){case 5126:return cA;case 35664:return uA;case 35665:return fA;case 35666:return hA;case 35674:return dA;case 35675:return pA;case 35676:return mA;case 5124:case 35670:return gA;case 35667:case 35671:return _A;case 35668:case 35672:return vA;case 35669:case 35673:return yA;case 5125:return SA;case 36294:return xA;case 36295:return MA;case 36296:return EA;case 35678:case 36198:case 36298:case 36306:case 35682:return bA;case 35679:case 36299:case 36307:return TA;case 35680:case 36300:case 36308:case 36293:return AA;case 36289:case 36303:case 36311:case 36292:return RA}}function wA(r,t){r.uniform1fv(this.addr,t)}function DA(r,t){const i=Qr(t,this.size,2);r.uniform2fv(this.addr,i)}function UA(r,t){const i=Qr(t,this.size,3);r.uniform3fv(this.addr,i)}function LA(r,t){const i=Qr(t,this.size,4);r.uniform4fv(this.addr,i)}function NA(r,t){const i=Qr(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function OA(r,t){const i=Qr(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function PA(r,t){const i=Qr(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function zA(r,t){r.uniform1iv(this.addr,t)}function BA(r,t){r.uniform2iv(this.addr,t)}function IA(r,t){r.uniform3iv(this.addr,t)}function FA(r,t){r.uniform4iv(this.addr,t)}function HA(r,t){r.uniform1uiv(this.addr,t)}function GA(r,t){r.uniform2uiv(this.addr,t)}function VA(r,t){r.uniform3uiv(this.addr,t)}function kA(r,t){r.uniform4uiv(this.addr,t)}function XA(r,t,i){const s=this.cache,l=t.length,c=cu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),xn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||Qv,c[h])}function WA(r,t,i){const s=this.cache,l=t.length,c=cu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),xn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||$v,c[h])}function qA(r,t,i){const s=this.cache,l=t.length,c=cu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),xn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||ty,c[h])}function YA(r,t,i){const s=this.cache,l=t.length,c=cu(i,l);Sn(s,c)||(r.uniform1iv(this.addr,c),xn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||Jv,c[h])}function jA(r){switch(r){case 5126:return wA;case 35664:return DA;case 35665:return UA;case 35666:return LA;case 35674:return NA;case 35675:return OA;case 35676:return PA;case 5124:case 35670:return zA;case 35667:case 35671:return BA;case 35668:case 35672:return IA;case 35669:case 35673:return FA;case 5125:return HA;case 36294:return GA;case 36295:return VA;case 36296:return kA;case 35678:case 36198:case 36298:case 36306:case 35682:return XA;case 35679:case 36299:case 36307:return WA;case 35680:case 36300:case 36308:case 36293:return qA;case 36289:case 36303:case 36311:case 36292:return YA}}class ZA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=CA(i.type)}}class KA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=jA(i.type)}}class QA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const Jh=/(\w+)(\])?(\[|\.)?/g;function J0(r,t){r.seq.push(t),r.map[t.id]=t}function JA(r,t,i){const s=r.name,l=s.length;for(Jh.lastIndex=0;;){const c=Jh.exec(s),h=Jh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){J0(i,p===void 0?new ZA(d,r,t):new KA(d,r,t));break}else{let _=i.map[d];_===void 0&&(_=new QA(d),J0(i,_)),i=_}}}class Qc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),h=t.getUniformLocation(i,c.name);JA(c,h,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function $0(r,t,i){const s=r.createShader(t);return r.shaderSource(s,i),r.compileShader(s),s}const $A=37297;let t1=0;function e1(r,t){const i=r.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const tv=new se;function n1(r){Ue._getMatrix(tv,Ue.workingColorSpace,r);const t=`mat3( ${tv.elements.map(i=>i.toFixed(4))} )`;switch(Ue.getTransfer(r)){case Jc:return[t,"LinearTransferOETF"];case Ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function ev(r,t,i){const s=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const h=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+e1(r.getShaderSource(t),h)}else return l}function i1(r,t){const i=n1(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function a1(r,t){let i;switch(t){case Wx:i="Linear";break;case qx:i="Reinhard";break;case Yx:i="Cineon";break;case jx:i="ACESFilmic";break;case Kx:i="AgX";break;case Qx:i="Neutral";break;case Zx:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Hc=new F;function s1(){Ue.getLuminanceCoefficients(Hc);const r=Hc.x.toFixed(4),t=Hc.y.toFixed(4),i=Hc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r1(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qo).join(`
`)}function o1(r){const t=[];for(const i in r){const s=r[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function l1(r,t){const i={},s=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(t,l),h=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:r.getAttribLocation(t,h),locationSize:d}}return i}function Qo(r){return r!==""}function nv(r,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function iv(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const c1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qd(r){return r.replace(c1,f1)}const u1=new Map;function f1(r,t){let i=fe[t];if(i===void 0){const s=u1.get(t);if(s!==void 0)i=fe[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Qd(i)}const h1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function av(r){return r.replace(h1,d1)}function d1(r,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function sv(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function p1(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Sv?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===xv?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===_a&&(t="SHADOWMAP_TYPE_VSM"),t}function m1(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case kr:case Xr:t="ENVMAP_TYPE_CUBE";break;case ru:t="ENVMAP_TYPE_CUBE_UV";break}return t}function g1(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Xr:t="ENVMAP_MODE_REFRACTION";break}return t}function _1(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Mv:t="ENVMAP_BLENDING_MULTIPLY";break;case kx:t="ENVMAP_BLENDING_MIX";break;case Xx:t="ENVMAP_BLENDING_ADD";break}return t}function v1(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function y1(r,t,i,s){const l=r.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=p1(i),p=m1(i),g=g1(i),_=_1(i),S=v1(i),M=r1(i),E=o1(c),R=l.createProgram();let x,y,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Qo).join(`
`),x.length>0&&(x+=`
`),y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Qo).join(`
`),y.length>0&&(y+=`
`)):(x=[sv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qo).join(`
`),y=[sv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+_:"",S?"#define CUBEUV_TEXEL_WIDTH "+S.texelWidth:"",S?"#define CUBEUV_TEXEL_HEIGHT "+S.texelHeight:"",S?"#define CUBEUV_MAX_MIP "+S.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==$a?"#define TONE_MAPPING":"",i.toneMapping!==$a?fe.tonemapping_pars_fragment:"",i.toneMapping!==$a?a1("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",fe.colorspace_pars_fragment,i1("linearToOutputTexel",i.outputColorSpace),s1(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Qo).join(`
`)),h=Qd(h),h=nv(h,i),h=iv(h,i),d=Qd(d),d=nv(d,i),d=iv(d,i),h=av(h),d=av(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,y=["#define varying in",i.glslVersion===u0?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===u0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const O=I+x+h,U=I+y+d,J=$0(l,l.VERTEX_SHADER,O),V=$0(l,l.FRAGMENT_SHADER,U);l.attachShader(R,J),l.attachShader(R,V),i.index0AttributeName!==void 0?l.bindAttribLocation(R,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(R,0,"position"),l.linkProgram(R);function P(w){if(r.debug.checkShaderErrors){const j=l.getProgramInfoLog(R).trim(),et=l.getShaderInfoLog(J).trim(),mt=l.getShaderInfoLog(V).trim();let gt=!0,z=!0;if(l.getProgramParameter(R,l.LINK_STATUS)===!1)if(gt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,R,J,V);else{const Q=ev(l,J,"vertex"),K=ev(l,V,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(R,l.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+j+`
`+Q+`
`+K)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(et===""||mt==="")&&(z=!1);z&&(w.diagnostics={runnable:gt,programLog:j,vertexShader:{log:et,prefix:x},fragmentShader:{log:mt,prefix:y}})}l.deleteShader(J),l.deleteShader(V),W=new Qc(l,R),D=l1(l,R)}let W;this.getUniforms=function(){return W===void 0&&P(this),W};let D;this.getAttributes=function(){return D===void 0&&P(this),D};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(R,$A)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(R),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=t1++,this.cacheKey=t,this.usedTimes=1,this.program=R,this.vertexShader=J,this.fragmentShader=V,this}let S1=0;class x1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new M1(t),i.set(t,s)),s}}class M1{constructor(t){this.id=S1++,this.code=t,this.usedTimes=0}}function E1(r,t,i,s,l,c,h){const d=new cp,m=new x1,p=new Set,g=[],_=l.logarithmicDepthBuffer,S=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(D){return p.add(D),D===0?"uv":`uv${D}`}function x(D,C,w,j,et){const mt=j.fog,gt=et.geometry,z=D.isMeshStandardMaterial?j.environment:null,Q=(D.isMeshStandardMaterial?i:t).get(D.envMap||z),K=Q&&Q.mapping===ru?Q.image.height:null,xt=E[D.type];D.precision!==null&&(M=l.getMaxPrecision(D.precision),M!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",M,"instead."));const bt=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,N=bt!==void 0?bt.length:0;let at=0;gt.morphAttributes.position!==void 0&&(at=1),gt.morphAttributes.normal!==void 0&&(at=2),gt.morphAttributes.color!==void 0&&(at=3);let St,Z,ct,Et;if(xt){const Ae=ki[xt];St=Ae.vertexShader,Z=Ae.fragmentShader}else St=D.vertexShader,Z=D.fragmentShader,m.update(D),ct=m.getVertexShaderID(D),Et=m.getFragmentShaderID(D);const yt=r.getRenderTarget(),Gt=r.state.buffers.depth.getReversed(),Ft=et.isInstancedMesh===!0,ie=et.isBatchedMesh===!0,Be=!!D.map,me=!!D.matcap,Qe=!!Q,H=!!D.aoMap,On=!!D.lightMap,de=!!D.bumpMap,ye=!!D.normalMap,qt=!!D.displacementMap,Oe=!!D.emissiveMap,Wt=!!D.metalnessMap,L=!!D.roughnessMap,T=D.anisotropy>0,it=D.clearcoat>0,ft=D.dispersion>0,Mt=D.iridescence>0,dt=D.sheen>0,kt=D.transmission>0,wt=T&&!!D.anisotropyMap,zt=it&&!!D.clearcoatMap,Se=it&&!!D.clearcoatNormalMap,At=it&&!!D.clearcoatRoughnessMap,Bt=Mt&&!!D.iridescenceMap,Yt=Mt&&!!D.iridescenceThicknessMap,Xt=dt&&!!D.sheenColorMap,Nt=dt&&!!D.sheenRoughnessMap,$t=!!D.specularMap,oe=!!D.specularColorMap,Ie=!!D.specularIntensityMap,k=kt&&!!D.transmissionMap,Rt=kt&&!!D.thicknessMap,lt=!!D.gradientMap,_t=!!D.alphaMap,Ct=D.alphaTest>0,Dt=!!D.alphaHash,te=!!D.extensions;let Je=$a;D.toneMapped&&(yt===null||yt.isXRRenderTarget===!0)&&(Je=r.toneMapping);const mn={shaderID:xt,shaderType:D.type,shaderName:D.name,vertexShader:St,fragmentShader:Z,defines:D.defines,customVertexShaderID:ct,customFragmentShaderID:Et,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:M,batching:ie,batchingColor:ie&&et._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&et.instanceColor!==null,instancingMorph:Ft&&et.morphTexture!==null,supportsVertexTextures:S,outputColorSpace:yt===null?r.outputColorSpace:yt.isXRRenderTarget===!0?yt.texture.colorSpace:Yr,alphaToCoverage:!!D.alphaToCoverage,map:Be,matcap:me,envMap:Qe,envMapMode:Qe&&Q.mapping,envMapCubeUVHeight:K,aoMap:H,lightMap:On,bumpMap:de,normalMap:ye,displacementMap:S&&qt,emissiveMap:Oe,normalMapObjectSpace:ye&&D.normalMapType===eM,normalMapTangentSpace:ye&&D.normalMapType===Ov,metalnessMap:Wt,roughnessMap:L,anisotropy:T,anisotropyMap:wt,clearcoat:it,clearcoatMap:zt,clearcoatNormalMap:Se,clearcoatRoughnessMap:At,dispersion:ft,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Yt,sheen:dt,sheenColorMap:Xt,sheenRoughnessMap:Nt,specularMap:$t,specularColorMap:oe,specularIntensityMap:Ie,transmission:kt,transmissionMap:k,thicknessMap:Rt,gradientMap:lt,opaque:D.transparent===!1&&D.blending===Fr&&D.alphaToCoverage===!1,alphaMap:_t,alphaTest:Ct,alphaHash:Dt,combine:D.combine,mapUv:Be&&R(D.map.channel),aoMapUv:H&&R(D.aoMap.channel),lightMapUv:On&&R(D.lightMap.channel),bumpMapUv:de&&R(D.bumpMap.channel),normalMapUv:ye&&R(D.normalMap.channel),displacementMapUv:qt&&R(D.displacementMap.channel),emissiveMapUv:Oe&&R(D.emissiveMap.channel),metalnessMapUv:Wt&&R(D.metalnessMap.channel),roughnessMapUv:L&&R(D.roughnessMap.channel),anisotropyMapUv:wt&&R(D.anisotropyMap.channel),clearcoatMapUv:zt&&R(D.clearcoatMap.channel),clearcoatNormalMapUv:Se&&R(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&R(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&R(D.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&R(D.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&R(D.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&R(D.sheenRoughnessMap.channel),specularMapUv:$t&&R(D.specularMap.channel),specularColorMapUv:oe&&R(D.specularColorMap.channel),specularIntensityMapUv:Ie&&R(D.specularIntensityMap.channel),transmissionMapUv:k&&R(D.transmissionMap.channel),thicknessMapUv:Rt&&R(D.thicknessMap.channel),alphaMapUv:_t&&R(D.alphaMap.channel),vertexTangents:!!gt.attributes.tangent&&(ye||T),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,pointsUvs:et.isPoints===!0&&!!gt.attributes.uv&&(Be||_t),fog:!!mt,useFog:D.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:Gt,skinning:et.isSkinnedMesh===!0,morphTargets:gt.morphAttributes.position!==void 0,morphNormals:gt.morphAttributes.normal!==void 0,morphColors:gt.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:at,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&w.length>0,shadowMapType:r.shadowMap.type,toneMapping:Je,decodeVideoTexture:Be&&D.map.isVideoTexture===!0&&Ue.getTransfer(D.map.colorSpace)===Ve,decodeVideoTextureEmissive:Oe&&D.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(D.emissiveMap.colorSpace)===Ve,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===Ei,flipSided:D.side===$n,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:te&&D.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&D.extensions.multiDraw===!0||ie)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return mn.vertexUv1s=p.has(1),mn.vertexUv2s=p.has(2),mn.vertexUv3s=p.has(3),p.clear(),mn}function y(D){const C=[];if(D.shaderID?C.push(D.shaderID):(C.push(D.customVertexShaderID),C.push(D.customFragmentShaderID)),D.defines!==void 0)for(const w in D.defines)C.push(w),C.push(D.defines[w]);return D.isRawShaderMaterial===!1&&(I(C,D),O(C,D),C.push(r.outputColorSpace)),C.push(D.customProgramCacheKey),C.join()}function I(D,C){D.push(C.precision),D.push(C.outputColorSpace),D.push(C.envMapMode),D.push(C.envMapCubeUVHeight),D.push(C.mapUv),D.push(C.alphaMapUv),D.push(C.lightMapUv),D.push(C.aoMapUv),D.push(C.bumpMapUv),D.push(C.normalMapUv),D.push(C.displacementMapUv),D.push(C.emissiveMapUv),D.push(C.metalnessMapUv),D.push(C.roughnessMapUv),D.push(C.anisotropyMapUv),D.push(C.clearcoatMapUv),D.push(C.clearcoatNormalMapUv),D.push(C.clearcoatRoughnessMapUv),D.push(C.iridescenceMapUv),D.push(C.iridescenceThicknessMapUv),D.push(C.sheenColorMapUv),D.push(C.sheenRoughnessMapUv),D.push(C.specularMapUv),D.push(C.specularColorMapUv),D.push(C.specularIntensityMapUv),D.push(C.transmissionMapUv),D.push(C.thicknessMapUv),D.push(C.combine),D.push(C.fogExp2),D.push(C.sizeAttenuation),D.push(C.morphTargetsCount),D.push(C.morphAttributeCount),D.push(C.numDirLights),D.push(C.numPointLights),D.push(C.numSpotLights),D.push(C.numSpotLightMaps),D.push(C.numHemiLights),D.push(C.numRectAreaLights),D.push(C.numDirLightShadows),D.push(C.numPointLightShadows),D.push(C.numSpotLightShadows),D.push(C.numSpotLightShadowsWithMaps),D.push(C.numLightProbes),D.push(C.shadowMapType),D.push(C.toneMapping),D.push(C.numClippingPlanes),D.push(C.numClipIntersection),D.push(C.depthPacking)}function O(D,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),D.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),D.push(d.mask)}function U(D){const C=E[D.type];let w;if(C){const j=ki[C];w=qM.clone(j.uniforms)}else w=D.uniforms;return w}function J(D,C){let w;for(let j=0,et=g.length;j<et;j++){const mt=g[j];if(mt.cacheKey===C){w=mt,++w.usedTimes;break}}return w===void 0&&(w=new y1(r,C,D,c),g.push(w)),w}function V(D){if(--D.usedTimes===0){const C=g.indexOf(D);g[C]=g[g.length-1],g.pop(),D.destroy()}}function P(D){m.remove(D)}function W(){m.dispose()}return{getParameters:x,getProgramCacheKey:y,getUniforms:U,acquireProgram:J,releaseProgram:V,releaseShaderCache:P,programs:g,dispose:W}}function b1(){let r=new WeakMap;function t(h){return r.has(h)}function i(h){let d=r.get(h);return d===void 0&&(d={},r.set(h,d)),d}function s(h){r.delete(h)}function l(h,d,m){r.get(h)[d]=m}function c(){r=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function T1(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function rv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function ov(){const r=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(_,S,M,E,R,x){let y=r[t];return y===void 0?(y={id:_.id,object:_,geometry:S,material:M,groupOrder:E,renderOrder:_.renderOrder,z:R,group:x},r[t]=y):(y.id=_.id,y.object=_,y.geometry=S,y.material=M,y.groupOrder=E,y.renderOrder=_.renderOrder,y.z=R,y.group=x),t++,y}function d(_,S,M,E,R,x){const y=h(_,S,M,E,R,x);M.transmission>0?s.push(y):M.transparent===!0?l.push(y):i.push(y)}function m(_,S,M,E,R,x){const y=h(_,S,M,E,R,x);M.transmission>0?s.unshift(y):M.transparent===!0?l.unshift(y):i.unshift(y)}function p(_,S){i.length>1&&i.sort(_||T1),s.length>1&&s.sort(S||rv),l.length>1&&l.sort(S||rv)}function g(){for(let _=t,S=r.length;_<S;_++){const M=r[_];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:g,sort:p}}function A1(){let r=new WeakMap;function t(s,l){const c=r.get(s);let h;return c===void 0?(h=new ov,r.set(s,[h])):l>=c.length?(h=new ov,c.push(h)):h=c[l],h}function i(){r=new WeakMap}return{get:t,dispose:i}}function R1(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new F,color:new he};break;case"SpotLight":i={position:new F,direction:new F,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new F,color:new he,distance:0,decay:0};break;case"HemisphereLight":i={direction:new F,skyColor:new he,groundColor:new he};break;case"RectAreaLight":i={color:new he,position:new F,halfWidth:new F,halfHeight:new F};break}return r[t.id]=i,i}}}function C1(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=i,i}}}let w1=0;function D1(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function U1(r){const t=new R1,i=C1(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new F);const l=new F,c=new Xe,h=new Xe;function d(p){let g=0,_=0,S=0;for(let D=0;D<9;D++)s.probe[D].set(0,0,0);let M=0,E=0,R=0,x=0,y=0,I=0,O=0,U=0,J=0,V=0,P=0;p.sort(D1);for(let D=0,C=p.length;D<C;D++){const w=p[D],j=w.color,et=w.intensity,mt=w.distance,gt=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)g+=j.r*et,_+=j.g*et,S+=j.b*et;else if(w.isLightProbe){for(let z=0;z<9;z++)s.probe[z].addScaledVector(w.sh.coefficients[z],et);P++}else if(w.isDirectionalLight){const z=t.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Q=w.shadow,K=i.get(w);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,s.directionalShadow[M]=K,s.directionalShadowMap[M]=gt,s.directionalShadowMatrix[M]=w.shadow.matrix,I++}s.directional[M]=z,M++}else if(w.isSpotLight){const z=t.get(w);z.position.setFromMatrixPosition(w.matrixWorld),z.color.copy(j).multiplyScalar(et),z.distance=mt,z.coneCos=Math.cos(w.angle),z.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),z.decay=w.decay,s.spot[R]=z;const Q=w.shadow;if(w.map&&(s.spotLightMap[J]=w.map,J++,Q.updateMatrices(w),w.castShadow&&V++),s.spotLightMatrix[R]=Q.matrix,w.castShadow){const K=i.get(w);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,s.spotShadow[R]=K,s.spotShadowMap[R]=gt,U++}R++}else if(w.isRectAreaLight){const z=t.get(w);z.color.copy(j).multiplyScalar(et),z.halfWidth.set(w.width*.5,0,0),z.halfHeight.set(0,w.height*.5,0),s.rectArea[x]=z,x++}else if(w.isPointLight){const z=t.get(w);if(z.color.copy(w.color).multiplyScalar(w.intensity),z.distance=w.distance,z.decay=w.decay,w.castShadow){const Q=w.shadow,K=i.get(w);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,s.pointShadow[E]=K,s.pointShadowMap[E]=gt,s.pointShadowMatrix[E]=w.shadow.matrix,O++}s.point[E]=z,E++}else if(w.isHemisphereLight){const z=t.get(w);z.skyColor.copy(w.color).multiplyScalar(et),z.groundColor.copy(w.groundColor).multiplyScalar(et),s.hemi[y]=z,y++}}x>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_FLOAT_1,s.rectAreaLTC2=Lt.LTC_FLOAT_2):(s.rectAreaLTC1=Lt.LTC_HALF_1,s.rectAreaLTC2=Lt.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=_,s.ambient[2]=S;const W=s.hash;(W.directionalLength!==M||W.pointLength!==E||W.spotLength!==R||W.rectAreaLength!==x||W.hemiLength!==y||W.numDirectionalShadows!==I||W.numPointShadows!==O||W.numSpotShadows!==U||W.numSpotMaps!==J||W.numLightProbes!==P)&&(s.directional.length=M,s.spot.length=R,s.rectArea.length=x,s.point.length=E,s.hemi.length=y,s.directionalShadow.length=I,s.directionalShadowMap.length=I,s.pointShadow.length=O,s.pointShadowMap.length=O,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=I,s.pointShadowMatrix.length=O,s.spotLightMatrix.length=U+J-V,s.spotLightMap.length=J,s.numSpotLightShadowsWithMaps=V,s.numLightProbes=P,W.directionalLength=M,W.pointLength=E,W.spotLength=R,W.rectAreaLength=x,W.hemiLength=y,W.numDirectionalShadows=I,W.numPointShadows=O,W.numSpotShadows=U,W.numSpotMaps=J,W.numLightProbes=P,s.version=w1++)}function m(p,g){let _=0,S=0,M=0,E=0,R=0;const x=g.matrixWorldInverse;for(let y=0,I=p.length;y<I;y++){const O=p[y];if(O.isDirectionalLight){const U=s.directional[_];U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(x),_++}else if(O.isSpotLight){const U=s.spot[M];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(x),U.direction.setFromMatrixPosition(O.matrixWorld),l.setFromMatrixPosition(O.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(x),M++}else if(O.isRectAreaLight){const U=s.rectArea[E];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(x),h.identity(),c.copy(O.matrixWorld),c.premultiply(x),h.extractRotation(c),U.halfWidth.set(O.width*.5,0,0),U.halfHeight.set(0,O.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),E++}else if(O.isPointLight){const U=s.point[S];U.position.setFromMatrixPosition(O.matrixWorld),U.position.applyMatrix4(x),S++}else if(O.isHemisphereLight){const U=s.hemi[R];U.direction.setFromMatrixPosition(O.matrixWorld),U.direction.transformDirection(x),R++}}}return{setup:d,setupView:m,state:s}}function lv(r){const t=new U1(r),i=[],s=[];function l(g){p.camera=g,i.length=0,s.length=0}function c(g){i.push(g)}function h(g){s.push(g)}function d(){t.setup(i)}function m(g){t.setupView(i,g)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function L1(r){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new lv(r),t.set(l,[d])):c>=h.length?(d=new lv(r),h.push(d)):d=h[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const N1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,O1=`uniform sampler2D shadow_pass;
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
}`;function P1(r,t,i){let s=new fp;const l=new re,c=new re,h=new sn,d=new eE({depthPacking:tM}),m=new nE,p={},g=i.maxTextureSize,_={[ts]:$n,[$n]:ts,[Ei]:Ei},S=new es({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:N1,fragmentShader:O1}),M=S.clone();M.defines.HORIZONTAL_PASS=1;const E=new fi;E.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const R=new Jn(E,S),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sv;let y=this.type;this.render=function(V,P,W){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||V.length===0)return;const D=r.getRenderTarget(),C=r.getActiveCubeFace(),w=r.getActiveMipmapLevel(),j=r.state;j.setBlending(Ja),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const et=y!==_a&&this.type===_a,mt=y===_a&&this.type!==_a;for(let gt=0,z=V.length;gt<z;gt++){const Q=V[gt],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const xt=K.getFrameExtents();if(l.multiply(xt),c.copy(K.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(c.x=Math.floor(g/xt.x),l.x=c.x*xt.x,K.mapSize.x=c.x),l.y>g&&(c.y=Math.floor(g/xt.y),l.y=c.y*xt.y,K.mapSize.y=c.y)),K.map===null||et===!0||mt===!0){const N=this.type!==_a?{minFilter:Pi,magFilter:Pi}:{};K.map!==null&&K.map.dispose(),K.map=new Bs(l.x,l.y,N),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const bt=K.getViewportCount();for(let N=0;N<bt;N++){const at=K.getViewport(N);h.set(c.x*at.x,c.y*at.y,c.x*at.z,c.y*at.w),j.viewport(h),K.updateMatrices(Q,N),s=K.getFrustum(),U(P,W,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===_a&&I(K,W),K.needsUpdate=!1}y=this.type,x.needsUpdate=!1,r.setRenderTarget(D,C,w)};function I(V,P){const W=t.update(R);S.defines.VSM_SAMPLES!==V.blurSamples&&(S.defines.VSM_SAMPLES=V.blurSamples,M.defines.VSM_SAMPLES=V.blurSamples,S.needsUpdate=!0,M.needsUpdate=!0),V.mapPass===null&&(V.mapPass=new Bs(l.x,l.y)),S.uniforms.shadow_pass.value=V.map.texture,S.uniforms.resolution.value=V.mapSize,S.uniforms.radius.value=V.radius,r.setRenderTarget(V.mapPass),r.clear(),r.renderBufferDirect(P,null,W,S,R,null),M.uniforms.shadow_pass.value=V.mapPass.texture,M.uniforms.resolution.value=V.mapSize,M.uniforms.radius.value=V.radius,r.setRenderTarget(V.map),r.clear(),r.renderBufferDirect(P,null,W,M,R,null)}function O(V,P,W,D){let C=null;const w=W.isPointLight===!0?V.customDistanceMaterial:V.customDepthMaterial;if(w!==void 0)C=w;else if(C=W.isPointLight===!0?m:d,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const j=C.uuid,et=P.uuid;let mt=p[j];mt===void 0&&(mt={},p[j]=mt);let gt=mt[et];gt===void 0&&(gt=C.clone(),mt[et]=gt,P.addEventListener("dispose",J)),C=gt}if(C.visible=P.visible,C.wireframe=P.wireframe,D===_a?C.side=P.shadowSide!==null?P.shadowSide:P.side:C.side=P.shadowSide!==null?P.shadowSide:_[P.side],C.alphaMap=P.alphaMap,C.alphaTest=P.alphaTest,C.map=P.map,C.clipShadows=P.clipShadows,C.clippingPlanes=P.clippingPlanes,C.clipIntersection=P.clipIntersection,C.displacementMap=P.displacementMap,C.displacementScale=P.displacementScale,C.displacementBias=P.displacementBias,C.wireframeLinewidth=P.wireframeLinewidth,C.linewidth=P.linewidth,W.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const j=r.properties.get(C);j.light=W}return C}function U(V,P,W,D,C){if(V.visible===!1)return;if(V.layers.test(P.layers)&&(V.isMesh||V.isLine||V.isPoints)&&(V.castShadow||V.receiveShadow&&C===_a)&&(!V.frustumCulled||s.intersectsObject(V))){V.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,V.matrixWorld);const et=t.update(V),mt=V.material;if(Array.isArray(mt)){const gt=et.groups;for(let z=0,Q=gt.length;z<Q;z++){const K=gt[z],xt=mt[K.materialIndex];if(xt&&xt.visible){const bt=O(V,xt,D,C);V.onBeforeShadow(r,V,P,W,et,bt,K),r.renderBufferDirect(W,null,et,bt,V,K),V.onAfterShadow(r,V,P,W,et,bt,K)}}}else if(mt.visible){const gt=O(V,mt,D,C);V.onBeforeShadow(r,V,P,W,et,gt,null),r.renderBufferDirect(W,null,et,gt,V,null),V.onAfterShadow(r,V,P,W,et,gt,null)}}const j=V.children;for(let et=0,mt=j.length;et<mt;et++)U(j[et],P,W,D,C)}function J(V){V.target.removeEventListener("dispose",J);for(const W in p){const D=p[W],C=V.target.uuid;C in D&&(D[C].dispose(),delete D[C])}}}const z1={[dd]:pd,[md]:vd,[gd]:yd,[Vr]:_d,[pd]:dd,[vd]:md,[yd]:gd,[_d]:Vr};function B1(r,t){function i(){let k=!1;const Rt=new sn;let lt=null;const _t=new sn(0,0,0,0);return{setMask:function(Ct){lt!==Ct&&!k&&(r.colorMask(Ct,Ct,Ct,Ct),lt=Ct)},setLocked:function(Ct){k=Ct},setClear:function(Ct,Dt,te,Je,mn){mn===!0&&(Ct*=Je,Dt*=Je,te*=Je),Rt.set(Ct,Dt,te,Je),_t.equals(Rt)===!1&&(r.clearColor(Ct,Dt,te,Je),_t.copy(Rt))},reset:function(){k=!1,lt=null,_t.set(-1,0,0,0)}}}function s(){let k=!1,Rt=!1,lt=null,_t=null,Ct=null;return{setReversed:function(Dt){if(Rt!==Dt){const te=t.get("EXT_clip_control");Rt?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT);const Je=Ct;Ct=null,this.setClear(Je)}Rt=Dt},getReversed:function(){return Rt},setTest:function(Dt){Dt?yt(r.DEPTH_TEST):Gt(r.DEPTH_TEST)},setMask:function(Dt){lt!==Dt&&!k&&(r.depthMask(Dt),lt=Dt)},setFunc:function(Dt){if(Rt&&(Dt=z1[Dt]),_t!==Dt){switch(Dt){case dd:r.depthFunc(r.NEVER);break;case pd:r.depthFunc(r.ALWAYS);break;case md:r.depthFunc(r.LESS);break;case Vr:r.depthFunc(r.LEQUAL);break;case gd:r.depthFunc(r.EQUAL);break;case _d:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case yd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}_t=Dt}},setLocked:function(Dt){k=Dt},setClear:function(Dt){Ct!==Dt&&(Rt&&(Dt=1-Dt),r.clearDepth(Dt),Ct=Dt)},reset:function(){k=!1,lt=null,_t=null,Ct=null,Rt=!1}}}function l(){let k=!1,Rt=null,lt=null,_t=null,Ct=null,Dt=null,te=null,Je=null,mn=null;return{setTest:function(Ae){k||(Ae?yt(r.STENCIL_TEST):Gt(r.STENCIL_TEST))},setMask:function(Ae){Rt!==Ae&&!k&&(r.stencilMask(Ae),Rt=Ae)},setFunc:function(Ae,An,bi){(lt!==Ae||_t!==An||Ct!==bi)&&(r.stencilFunc(Ae,An,bi),lt=Ae,_t=An,Ct=bi)},setOp:function(Ae,An,bi){(Dt!==Ae||te!==An||Je!==bi)&&(r.stencilOp(Ae,An,bi),Dt=Ae,te=An,Je=bi)},setLocked:function(Ae){k=Ae},setClear:function(Ae){mn!==Ae&&(r.clearStencil(Ae),mn=Ae)},reset:function(){k=!1,Rt=null,lt=null,_t=null,Ct=null,Dt=null,te=null,Je=null,mn=null}}}const c=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},_={},S=new WeakMap,M=[],E=null,R=!1,x=null,y=null,I=null,O=null,U=null,J=null,V=null,P=new he(0,0,0),W=0,D=!1,C=null,w=null,j=null,et=null,mt=null;const gt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=Q>=2);let xt=null,bt={};const N=r.getParameter(r.SCISSOR_BOX),at=r.getParameter(r.VIEWPORT),St=new sn().fromArray(N),Z=new sn().fromArray(at);function ct(k,Rt,lt,_t){const Ct=new Uint8Array(4),Dt=r.createTexture();r.bindTexture(k,Dt),r.texParameteri(k,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(k,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let te=0;te<lt;te++)k===r.TEXTURE_3D||k===r.TEXTURE_2D_ARRAY?r.texImage3D(Rt,0,r.RGBA,1,1,_t,0,r.RGBA,r.UNSIGNED_BYTE,Ct):r.texImage2D(Rt+te,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ct);return Dt}const Et={};Et[r.TEXTURE_2D]=ct(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ct(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ct(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ct(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),yt(r.DEPTH_TEST),h.setFunc(Vr),de(!1),ye(a0),yt(r.CULL_FACE),H(Ja);function yt(k){g[k]!==!0&&(r.enable(k),g[k]=!0)}function Gt(k){g[k]!==!1&&(r.disable(k),g[k]=!1)}function Ft(k,Rt){return _[k]!==Rt?(r.bindFramebuffer(k,Rt),_[k]=Rt,k===r.DRAW_FRAMEBUFFER&&(_[r.FRAMEBUFFER]=Rt),k===r.FRAMEBUFFER&&(_[r.DRAW_FRAMEBUFFER]=Rt),!0):!1}function ie(k,Rt){let lt=M,_t=!1;if(k){lt=S.get(Rt),lt===void 0&&(lt=[],S.set(Rt,lt));const Ct=k.textures;if(lt.length!==Ct.length||lt[0]!==r.COLOR_ATTACHMENT0){for(let Dt=0,te=Ct.length;Dt<te;Dt++)lt[Dt]=r.COLOR_ATTACHMENT0+Dt;lt.length=Ct.length,_t=!0}}else lt[0]!==r.BACK&&(lt[0]=r.BACK,_t=!0);_t&&r.drawBuffers(lt)}function Be(k){return E!==k?(r.useProgram(k),E=k,!0):!1}const me={[Ls]:r.FUNC_ADD,[Ax]:r.FUNC_SUBTRACT,[Rx]:r.FUNC_REVERSE_SUBTRACT};me[Cx]=r.MIN,me[wx]=r.MAX;const Qe={[Dx]:r.ZERO,[Ux]:r.ONE,[Lx]:r.SRC_COLOR,[fd]:r.SRC_ALPHA,[Ix]:r.SRC_ALPHA_SATURATE,[zx]:r.DST_COLOR,[Ox]:r.DST_ALPHA,[Nx]:r.ONE_MINUS_SRC_COLOR,[hd]:r.ONE_MINUS_SRC_ALPHA,[Bx]:r.ONE_MINUS_DST_COLOR,[Px]:r.ONE_MINUS_DST_ALPHA,[Fx]:r.CONSTANT_COLOR,[Hx]:r.ONE_MINUS_CONSTANT_COLOR,[Gx]:r.CONSTANT_ALPHA,[Vx]:r.ONE_MINUS_CONSTANT_ALPHA};function H(k,Rt,lt,_t,Ct,Dt,te,Je,mn,Ae){if(k===Ja){R===!0&&(Gt(r.BLEND),R=!1);return}if(R===!1&&(yt(r.BLEND),R=!0),k!==Tx){if(k!==x||Ae!==D){if((y!==Ls||U!==Ls)&&(r.blendEquation(r.FUNC_ADD),y=Ls,U=Ls),Ae)switch(k){case Fr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case s0:r.blendFunc(r.ONE,r.ONE);break;case r0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case o0:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Fr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case s0:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case r0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case o0:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}I=null,O=null,J=null,V=null,P.set(0,0,0),W=0,x=k,D=Ae}return}Ct=Ct||Rt,Dt=Dt||lt,te=te||_t,(Rt!==y||Ct!==U)&&(r.blendEquationSeparate(me[Rt],me[Ct]),y=Rt,U=Ct),(lt!==I||_t!==O||Dt!==J||te!==V)&&(r.blendFuncSeparate(Qe[lt],Qe[_t],Qe[Dt],Qe[te]),I=lt,O=_t,J=Dt,V=te),(Je.equals(P)===!1||mn!==W)&&(r.blendColor(Je.r,Je.g,Je.b,mn),P.copy(Je),W=mn),x=k,D=!1}function On(k,Rt){k.side===Ei?Gt(r.CULL_FACE):yt(r.CULL_FACE);let lt=k.side===$n;Rt&&(lt=!lt),de(lt),k.blending===Fr&&k.transparent===!1?H(Ja):H(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),h.setFunc(k.depthFunc),h.setTest(k.depthTest),h.setMask(k.depthWrite),c.setMask(k.colorWrite);const _t=k.stencilWrite;d.setTest(_t),_t&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Oe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?yt(r.SAMPLE_ALPHA_TO_COVERAGE):Gt(r.SAMPLE_ALPHA_TO_COVERAGE)}function de(k){C!==k&&(k?r.frontFace(r.CW):r.frontFace(r.CCW),C=k)}function ye(k){k!==Ex?(yt(r.CULL_FACE),k!==w&&(k===a0?r.cullFace(r.BACK):k===bx?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Gt(r.CULL_FACE),w=k}function qt(k){k!==j&&(z&&r.lineWidth(k),j=k)}function Oe(k,Rt,lt){k?(yt(r.POLYGON_OFFSET_FILL),(et!==Rt||mt!==lt)&&(r.polygonOffset(Rt,lt),et=Rt,mt=lt)):Gt(r.POLYGON_OFFSET_FILL)}function Wt(k){k?yt(r.SCISSOR_TEST):Gt(r.SCISSOR_TEST)}function L(k){k===void 0&&(k=r.TEXTURE0+gt-1),xt!==k&&(r.activeTexture(k),xt=k)}function T(k,Rt,lt){lt===void 0&&(xt===null?lt=r.TEXTURE0+gt-1:lt=xt);let _t=bt[lt];_t===void 0&&(_t={type:void 0,texture:void 0},bt[lt]=_t),(_t.type!==k||_t.texture!==Rt)&&(xt!==lt&&(r.activeTexture(lt),xt=lt),r.bindTexture(k,Rt||Et[k]),_t.type=k,_t.texture=Rt)}function it(){const k=bt[xt];k!==void 0&&k.type!==void 0&&(r.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ft(){try{r.compressedTexImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function dt(){try{r.texSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{r.texSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function wt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Se(){try{r.texStorage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Yt(){try{r.texImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xt(k){St.equals(k)===!1&&(r.scissor(k.x,k.y,k.z,k.w),St.copy(k))}function Nt(k){Z.equals(k)===!1&&(r.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function $t(k,Rt){let lt=p.get(Rt);lt===void 0&&(lt=new WeakMap,p.set(Rt,lt));let _t=lt.get(k);_t===void 0&&(_t=r.getUniformBlockIndex(Rt,k.name),lt.set(k,_t))}function oe(k,Rt){const _t=p.get(Rt).get(k);m.get(Rt)!==_t&&(r.uniformBlockBinding(Rt,_t,k.__bindingPointIndex),m.set(Rt,_t))}function Ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),h.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),g={},xt=null,bt={},_={},S=new WeakMap,M=[],E=null,R=!1,x=null,y=null,I=null,O=null,U=null,J=null,V=null,P=new he(0,0,0),W=0,D=!1,C=null,w=null,j=null,et=null,mt=null,St.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:yt,disable:Gt,bindFramebuffer:Ft,drawBuffers:ie,useProgram:Be,setBlending:H,setMaterial:On,setFlipSided:de,setCullFace:ye,setLineWidth:qt,setPolygonOffset:Oe,setScissorTest:Wt,activeTexture:L,bindTexture:T,unbindTexture:it,compressedTexImage2D:ft,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Yt,updateUBOMapping:$t,uniformBlockBinding:oe,texStorage2D:Se,texStorage3D:At,texSubImage2D:dt,texSubImage3D:kt,compressedTexSubImage2D:wt,compressedTexSubImage3D:zt,scissor:Xt,viewport:Nt,reset:Ie}}function I1(r,t,i,s,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new re,g=new WeakMap;let _;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(L,T){return M?new OffscreenCanvas(L,T):tu("canvas")}function R(L,T,it){let ft=1;const Mt=Wt(L);if((Mt.width>it||Mt.height>it)&&(ft=it/Math.max(Mt.width,Mt.height)),ft<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const dt=Math.floor(ft*Mt.width),kt=Math.floor(ft*Mt.height);_===void 0&&(_=E(dt,kt));const wt=T?E(dt,kt):_;return wt.width=dt,wt.height=kt,wt.getContext("2d").drawImage(L,0,0,dt,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+dt+"x"+kt+")."),wt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),L;return L}function x(L){return L.generateMipmaps}function y(L){r.generateMipmap(L)}function I(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function O(L,T,it,ft,Mt=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let dt=T;if(T===r.RED&&(it===r.FLOAT&&(dt=r.R32F),it===r.HALF_FLOAT&&(dt=r.R16F),it===r.UNSIGNED_BYTE&&(dt=r.R8)),T===r.RED_INTEGER&&(it===r.UNSIGNED_BYTE&&(dt=r.R8UI),it===r.UNSIGNED_SHORT&&(dt=r.R16UI),it===r.UNSIGNED_INT&&(dt=r.R32UI),it===r.BYTE&&(dt=r.R8I),it===r.SHORT&&(dt=r.R16I),it===r.INT&&(dt=r.R32I)),T===r.RG&&(it===r.FLOAT&&(dt=r.RG32F),it===r.HALF_FLOAT&&(dt=r.RG16F),it===r.UNSIGNED_BYTE&&(dt=r.RG8)),T===r.RG_INTEGER&&(it===r.UNSIGNED_BYTE&&(dt=r.RG8UI),it===r.UNSIGNED_SHORT&&(dt=r.RG16UI),it===r.UNSIGNED_INT&&(dt=r.RG32UI),it===r.BYTE&&(dt=r.RG8I),it===r.SHORT&&(dt=r.RG16I),it===r.INT&&(dt=r.RG32I)),T===r.RGB_INTEGER&&(it===r.UNSIGNED_BYTE&&(dt=r.RGB8UI),it===r.UNSIGNED_SHORT&&(dt=r.RGB16UI),it===r.UNSIGNED_INT&&(dt=r.RGB32UI),it===r.BYTE&&(dt=r.RGB8I),it===r.SHORT&&(dt=r.RGB16I),it===r.INT&&(dt=r.RGB32I)),T===r.RGBA_INTEGER&&(it===r.UNSIGNED_BYTE&&(dt=r.RGBA8UI),it===r.UNSIGNED_SHORT&&(dt=r.RGBA16UI),it===r.UNSIGNED_INT&&(dt=r.RGBA32UI),it===r.BYTE&&(dt=r.RGBA8I),it===r.SHORT&&(dt=r.RGBA16I),it===r.INT&&(dt=r.RGBA32I)),T===r.RGB&&it===r.UNSIGNED_INT_5_9_9_9_REV&&(dt=r.RGB9_E5),T===r.RGBA){const kt=Mt?Jc:Ue.getTransfer(ft);it===r.FLOAT&&(dt=r.RGBA32F),it===r.HALF_FLOAT&&(dt=r.RGBA16F),it===r.UNSIGNED_BYTE&&(dt=kt===Ve?r.SRGB8_ALPHA8:r.RGBA8),it===r.UNSIGNED_SHORT_4_4_4_4&&(dt=r.RGBA4),it===r.UNSIGNED_SHORT_5_5_5_1&&(dt=r.RGB5_A1)}return(dt===r.R16F||dt===r.R32F||dt===r.RG16F||dt===r.RG32F||dt===r.RGBA16F||dt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),dt}function U(L,T){let it;return L?T===null||T===zs||T===Wr?it=r.DEPTH24_STENCIL8:T===va?it=r.DEPTH32F_STENCIL8:T===el&&(it=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===zs||T===Wr?it=r.DEPTH_COMPONENT24:T===va?it=r.DEPTH_COMPONENT32F:T===el&&(it=r.DEPTH_COMPONENT16),it}function J(L,T){return x(L)===!0||L.isFramebufferTexture&&L.minFilter!==Pi&&L.minFilter!==Xi?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function V(L){const T=L.target;T.removeEventListener("dispose",V),W(T),T.isVideoTexture&&g.delete(T)}function P(L){const T=L.target;T.removeEventListener("dispose",P),C(T)}function W(L){const T=s.get(L);if(T.__webglInit===void 0)return;const it=L.source,ft=S.get(it);if(ft){const Mt=ft[T.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&D(L),Object.keys(ft).length===0&&S.delete(it)}s.remove(L)}function D(L){const T=s.get(L);r.deleteTexture(T.__webglTexture);const it=L.source,ft=S.get(it);delete ft[T.__cacheKey],h.memory.textures--}function C(L){const T=s.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),s.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(T.__webglFramebuffer[ft]))for(let Mt=0;Mt<T.__webglFramebuffer[ft].length;Mt++)r.deleteFramebuffer(T.__webglFramebuffer[ft][Mt]);else r.deleteFramebuffer(T.__webglFramebuffer[ft]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ft])}else{if(Array.isArray(T.__webglFramebuffer))for(let ft=0;ft<T.__webglFramebuffer.length;ft++)r.deleteFramebuffer(T.__webglFramebuffer[ft]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ft=0;ft<T.__webglColorRenderbuffer.length;ft++)T.__webglColorRenderbuffer[ft]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ft]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const it=L.textures;for(let ft=0,Mt=it.length;ft<Mt;ft++){const dt=s.get(it[ft]);dt.__webglTexture&&(r.deleteTexture(dt.__webglTexture),h.memory.textures--),s.remove(it[ft])}s.remove(L)}let w=0;function j(){w=0}function et(){const L=w;return L>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+l.maxTextures),w+=1,L}function mt(L){const T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function gt(L,T){const it=s.get(L);if(L.isVideoTexture&&qt(L),L.isRenderTargetTexture===!1&&L.version>0&&it.__version!==L.version){const ft=L.image;if(ft===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(it,L,T);return}}i.bindTexture(r.TEXTURE_2D,it.__webglTexture,r.TEXTURE0+T)}function z(L,T){const it=s.get(L);if(L.version>0&&it.__version!==L.version){Z(it,L,T);return}i.bindTexture(r.TEXTURE_2D_ARRAY,it.__webglTexture,r.TEXTURE0+T)}function Q(L,T){const it=s.get(L);if(L.version>0&&it.__version!==L.version){Z(it,L,T);return}i.bindTexture(r.TEXTURE_3D,it.__webglTexture,r.TEXTURE0+T)}function K(L,T){const it=s.get(L);if(L.version>0&&it.__version!==L.version){ct(it,L,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,it.__webglTexture,r.TEXTURE0+T)}const xt={[Md]:r.REPEAT,[Os]:r.CLAMP_TO_EDGE,[Ed]:r.MIRRORED_REPEAT},bt={[Pi]:r.NEAREST,[Jx]:r.NEAREST_MIPMAP_NEAREST,[gc]:r.NEAREST_MIPMAP_LINEAR,[Xi]:r.LINEAR,[Eh]:r.LINEAR_MIPMAP_NEAREST,[Ps]:r.LINEAR_MIPMAP_LINEAR},N={[nM]:r.NEVER,[lM]:r.ALWAYS,[iM]:r.LESS,[Pv]:r.LEQUAL,[aM]:r.EQUAL,[oM]:r.GEQUAL,[sM]:r.GREATER,[rM]:r.NOTEQUAL};function at(L,T){if(T.type===va&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Xi||T.magFilter===Eh||T.magFilter===gc||T.magFilter===Ps||T.minFilter===Xi||T.minFilter===Eh||T.minFilter===gc||T.minFilter===Ps)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,xt[T.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,xt[T.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,xt[T.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,bt[T.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,bt[T.minFilter]),T.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,N[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Pi||T.minFilter!==gc&&T.minFilter!==Ps||T.type===va&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const it=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function St(L,T){let it=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",V));const ft=T.source;let Mt=S.get(ft);Mt===void 0&&(Mt={},S.set(ft,Mt));const dt=mt(T);if(dt!==L.__cacheKey){Mt[dt]===void 0&&(Mt[dt]={texture:r.createTexture(),usedTimes:0},h.memory.textures++,it=!0),Mt[dt].usedTimes++;const kt=Mt[L.__cacheKey];kt!==void 0&&(Mt[L.__cacheKey].usedTimes--,kt.usedTimes===0&&D(T)),L.__cacheKey=dt,L.__webglTexture=Mt[dt].texture}return it}function Z(L,T,it){let ft=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ft=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ft=r.TEXTURE_3D);const Mt=St(L,T),dt=T.source;i.bindTexture(ft,L.__webglTexture,r.TEXTURE0+it);const kt=s.get(dt);if(dt.version!==kt.__version||Mt===!0){i.activeTexture(r.TEXTURE0+it);const wt=Ue.getPrimaries(Ue.workingColorSpace),zt=T.colorSpace===Qa?null:Ue.getPrimaries(T.colorSpace),Se=T.colorSpace===Qa||wt===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let At=R(T.image,!1,l.maxTextureSize);At=Oe(T,At);const Bt=c.convert(T.format,T.colorSpace),Yt=c.convert(T.type);let Xt=O(T.internalFormat,Bt,Yt,T.colorSpace,T.isVideoTexture);at(ft,T);let Nt;const $t=T.mipmaps,oe=T.isVideoTexture!==!0,Ie=kt.__version===void 0||Mt===!0,k=dt.dataReady,Rt=J(T,At);if(T.isDepthTexture)Xt=U(T.format===qr,T.type),Ie&&(oe?i.texStorage2D(r.TEXTURE_2D,1,Xt,At.width,At.height):i.texImage2D(r.TEXTURE_2D,0,Xt,At.width,At.height,0,Bt,Yt,null));else if(T.isDataTexture)if($t.length>0){oe&&Ie&&i.texStorage2D(r.TEXTURE_2D,Rt,Xt,$t[0].width,$t[0].height);for(let lt=0,_t=$t.length;lt<_t;lt++)Nt=$t[lt],oe?k&&i.texSubImage2D(r.TEXTURE_2D,lt,0,0,Nt.width,Nt.height,Bt,Yt,Nt.data):i.texImage2D(r.TEXTURE_2D,lt,Xt,Nt.width,Nt.height,0,Bt,Yt,Nt.data);T.generateMipmaps=!1}else oe?(Ie&&i.texStorage2D(r.TEXTURE_2D,Rt,Xt,At.width,At.height),k&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Yt,At.data)):i.texImage2D(r.TEXTURE_2D,0,Xt,At.width,At.height,0,Bt,Yt,At.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){oe&&Ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Xt,$t[0].width,$t[0].height,At.depth);for(let lt=0,_t=$t.length;lt<_t;lt++)if(Nt=$t[lt],T.format!==Oi)if(Bt!==null)if(oe){if(k)if(T.layerUpdates.size>0){const Ct=I0(Nt.width,Nt.height,T.format,T.type);for(const Dt of T.layerUpdates){const te=Nt.data.subarray(Dt*Ct/Nt.data.BYTES_PER_ELEMENT,(Dt+1)*Ct/Nt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,lt,0,0,Dt,Nt.width,Nt.height,1,Bt,te)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,lt,0,0,0,Nt.width,Nt.height,At.depth,Bt,Nt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,lt,Xt,Nt.width,Nt.height,At.depth,0,Nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?k&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,lt,0,0,0,Nt.width,Nt.height,At.depth,Bt,Yt,Nt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,lt,Xt,Nt.width,Nt.height,At.depth,0,Bt,Yt,Nt.data)}else{oe&&Ie&&i.texStorage2D(r.TEXTURE_2D,Rt,Xt,$t[0].width,$t[0].height);for(let lt=0,_t=$t.length;lt<_t;lt++)Nt=$t[lt],T.format!==Oi?Bt!==null?oe?k&&i.compressedTexSubImage2D(r.TEXTURE_2D,lt,0,0,Nt.width,Nt.height,Bt,Nt.data):i.compressedTexImage2D(r.TEXTURE_2D,lt,Xt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?k&&i.texSubImage2D(r.TEXTURE_2D,lt,0,0,Nt.width,Nt.height,Bt,Yt,Nt.data):i.texImage2D(r.TEXTURE_2D,lt,Xt,Nt.width,Nt.height,0,Bt,Yt,Nt.data)}else if(T.isDataArrayTexture)if(oe){if(Ie&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Rt,Xt,At.width,At.height,At.depth),k)if(T.layerUpdates.size>0){const lt=I0(At.width,At.height,T.format,T.type);for(const _t of T.layerUpdates){const Ct=At.data.subarray(_t*lt/At.data.BYTES_PER_ELEMENT,(_t+1)*lt/At.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,_t,At.width,At.height,1,Bt,Yt,Ct)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Yt,At.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Xt,At.width,At.height,At.depth,0,Bt,Yt,At.data);else if(T.isData3DTexture)oe?(Ie&&i.texStorage3D(r.TEXTURE_3D,Rt,Xt,At.width,At.height,At.depth),k&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Yt,At.data)):i.texImage3D(r.TEXTURE_3D,0,Xt,At.width,At.height,At.depth,0,Bt,Yt,At.data);else if(T.isFramebufferTexture){if(Ie)if(oe)i.texStorage2D(r.TEXTURE_2D,Rt,Xt,At.width,At.height);else{let lt=At.width,_t=At.height;for(let Ct=0;Ct<Rt;Ct++)i.texImage2D(r.TEXTURE_2D,Ct,Xt,lt,_t,0,Bt,Yt,null),lt>>=1,_t>>=1}}else if($t.length>0){if(oe&&Ie){const lt=Wt($t[0]);i.texStorage2D(r.TEXTURE_2D,Rt,Xt,lt.width,lt.height)}for(let lt=0,_t=$t.length;lt<_t;lt++)Nt=$t[lt],oe?k&&i.texSubImage2D(r.TEXTURE_2D,lt,0,0,Bt,Yt,Nt):i.texImage2D(r.TEXTURE_2D,lt,Xt,Bt,Yt,Nt);T.generateMipmaps=!1}else if(oe){if(Ie){const lt=Wt(At);i.texStorage2D(r.TEXTURE_2D,Rt,Xt,lt.width,lt.height)}k&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Yt,At)}else i.texImage2D(r.TEXTURE_2D,0,Xt,Bt,Yt,At);x(T)&&y(ft),kt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function ct(L,T,it){if(T.image.length!==6)return;const ft=St(L,T),Mt=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+it);const dt=s.get(Mt);if(Mt.version!==dt.__version||ft===!0){i.activeTexture(r.TEXTURE0+it);const kt=Ue.getPrimaries(Ue.workingColorSpace),wt=T.colorSpace===Qa?null:Ue.getPrimaries(T.colorSpace),zt=T.colorSpace===Qa||kt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const Se=T.isCompressedTexture||T.image[0].isCompressedTexture,At=T.image[0]&&T.image[0].isDataTexture,Bt=[];for(let _t=0;_t<6;_t++)!Se&&!At?Bt[_t]=R(T.image[_t],!0,l.maxCubemapSize):Bt[_t]=At?T.image[_t].image:T.image[_t],Bt[_t]=Oe(T,Bt[_t]);const Yt=Bt[0],Xt=c.convert(T.format,T.colorSpace),Nt=c.convert(T.type),$t=O(T.internalFormat,Xt,Nt,T.colorSpace),oe=T.isVideoTexture!==!0,Ie=dt.__version===void 0||ft===!0,k=Mt.dataReady;let Rt=J(T,Yt);at(r.TEXTURE_CUBE_MAP,T);let lt;if(Se){oe&&Ie&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,$t,Yt.width,Yt.height);for(let _t=0;_t<6;_t++){lt=Bt[_t].mipmaps;for(let Ct=0;Ct<lt.length;Ct++){const Dt=lt[Ct];T.format!==Oi?Xt!==null?oe?k&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,0,0,Dt.width,Dt.height,Xt,Dt.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,$t,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,0,0,Dt.width,Dt.height,Xt,Nt,Dt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct,$t,Dt.width,Dt.height,0,Xt,Nt,Dt.data)}}}else{if(lt=T.mipmaps,oe&&Ie){lt.length>0&&Rt++;const _t=Wt(Bt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Rt,$t,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(At){oe?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Bt[_t].width,Bt[_t].height,Xt,Nt,Bt[_t].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,$t,Bt[_t].width,Bt[_t].height,0,Xt,Nt,Bt[_t].data);for(let Ct=0;Ct<lt.length;Ct++){const te=lt[Ct].image[_t].image;oe?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,0,0,te.width,te.height,Xt,Nt,te.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,$t,te.width,te.height,0,Xt,Nt,te.data)}}else{oe?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Xt,Nt,Bt[_t]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,$t,Xt,Nt,Bt[_t]);for(let Ct=0;Ct<lt.length;Ct++){const Dt=lt[Ct];oe?k&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,0,0,Xt,Nt,Dt.image[_t]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ct+1,$t,Xt,Nt,Dt.image[_t])}}}x(T)&&y(r.TEXTURE_CUBE_MAP),dt.__version=Mt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function Et(L,T,it,ft,Mt,dt){const kt=c.convert(it.format,it.colorSpace),wt=c.convert(it.type),zt=O(it.internalFormat,kt,wt,it.colorSpace),Se=s.get(T),At=s.get(it);if(At.__renderTarget=T,!Se.__hasExternalTextures){const Bt=Math.max(1,T.width>>dt),Yt=Math.max(1,T.height>>dt);Mt===r.TEXTURE_3D||Mt===r.TEXTURE_2D_ARRAY?i.texImage3D(Mt,dt,zt,Bt,Yt,T.depth,0,kt,wt,null):i.texImage2D(Mt,dt,zt,Bt,Yt,0,kt,wt,null)}i.bindFramebuffer(r.FRAMEBUFFER,L),ye(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ft,Mt,At.__webglTexture,0,de(T)):(Mt===r.TEXTURE_2D||Mt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ft,Mt,At.__webglTexture,dt),i.bindFramebuffer(r.FRAMEBUFFER,null)}function yt(L,T,it){if(r.bindRenderbuffer(r.RENDERBUFFER,L),T.depthBuffer){const ft=T.depthTexture,Mt=ft&&ft.isDepthTexture?ft.type:null,dt=U(T.stencilBuffer,Mt),kt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,wt=de(T);ye(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,wt,dt,T.width,T.height):it?r.renderbufferStorageMultisample(r.RENDERBUFFER,wt,dt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,dt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,kt,r.RENDERBUFFER,L)}else{const ft=T.textures;for(let Mt=0;Mt<ft.length;Mt++){const dt=ft[Mt],kt=c.convert(dt.format,dt.colorSpace),wt=c.convert(dt.type),zt=O(dt.internalFormat,kt,wt,dt.colorSpace),Se=de(T);it&&ye(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Se,zt,T.width,T.height):ye(T)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Se,zt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,zt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Gt(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ft=s.get(T.depthTexture);ft.__renderTarget=T,(!ft.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),gt(T.depthTexture,0);const Mt=ft.__webglTexture,dt=de(T);if(T.depthTexture.format===Hr)ye(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0,dt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Mt,0);else if(T.depthTexture.format===qr)ye(T)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0,dt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Ft(L){const T=s.get(L),it=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){const ft=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ft){const Mt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ft.removeEventListener("dispose",Mt)};ft.addEventListener("dispose",Mt),T.__depthDisposeCallback=Mt}T.__boundDepthTexture=ft}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(it)throw new Error("target.depthTexture not supported in Cube render targets");Gt(T.__webglFramebuffer,L)}else if(it){T.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ft]),T.__webglDepthbuffer[ft]===void 0)T.__webglDepthbuffer[ft]=r.createRenderbuffer(),yt(T.__webglDepthbuffer[ft],L,!1);else{const Mt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=T.__webglDepthbuffer[ft];r.bindRenderbuffer(r.RENDERBUFFER,dt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Mt,r.RENDERBUFFER,dt)}}else if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),yt(T.__webglDepthbuffer,L,!1);else{const ft=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Mt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Mt),r.framebufferRenderbuffer(r.FRAMEBUFFER,ft,r.RENDERBUFFER,Mt)}i.bindFramebuffer(r.FRAMEBUFFER,null)}function ie(L,T,it){const ft=s.get(L);T!==void 0&&Et(ft.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),it!==void 0&&Ft(L)}function Be(L){const T=L.texture,it=s.get(L),ft=s.get(T);L.addEventListener("dispose",P);const Mt=L.textures,dt=L.isWebGLCubeRenderTarget===!0,kt=Mt.length>1;if(kt||(ft.__webglTexture===void 0&&(ft.__webglTexture=r.createTexture()),ft.__version=T.version,h.memory.textures++),dt){it.__webglFramebuffer=[];for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer[wt]=[];for(let zt=0;zt<T.mipmaps.length;zt++)it.__webglFramebuffer[wt][zt]=r.createFramebuffer()}else it.__webglFramebuffer[wt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){it.__webglFramebuffer=[];for(let wt=0;wt<T.mipmaps.length;wt++)it.__webglFramebuffer[wt]=r.createFramebuffer()}else it.__webglFramebuffer=r.createFramebuffer();if(kt)for(let wt=0,zt=Mt.length;wt<zt;wt++){const Se=s.get(Mt[wt]);Se.__webglTexture===void 0&&(Se.__webglTexture=r.createTexture(),h.memory.textures++)}if(L.samples>0&&ye(L)===!1){it.__webglMultisampledFramebuffer=r.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let wt=0;wt<Mt.length;wt++){const zt=Mt[wt];it.__webglColorRenderbuffer[wt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,it.__webglColorRenderbuffer[wt]);const Se=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=O(zt.internalFormat,Se,At,zt.colorSpace,L.isXRRenderTarget===!0),Yt=de(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt,Bt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,it.__webglColorRenderbuffer[wt])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(it.__webglDepthRenderbuffer=r.createRenderbuffer(),yt(it.__webglDepthRenderbuffer,L,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(dt){i.bindTexture(r.TEXTURE_CUBE_MAP,ft.__webglTexture),at(r.TEXTURE_CUBE_MAP,T);for(let wt=0;wt<6;wt++)if(T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Et(it.__webglFramebuffer[wt][zt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+wt,zt);else Et(it.__webglFramebuffer[wt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0);x(T)&&y(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(kt){for(let wt=0,zt=Mt.length;wt<zt;wt++){const Se=Mt[wt],At=s.get(Se);i.bindTexture(r.TEXTURE_2D,At.__webglTexture),at(r.TEXTURE_2D,Se),Et(it.__webglFramebuffer,L,Se,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,0),x(Se)&&y(r.TEXTURE_2D)}i.unbindTexture()}else{let wt=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(wt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(wt,ft.__webglTexture),at(wt,T),T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Et(it.__webglFramebuffer[zt],L,T,r.COLOR_ATTACHMENT0,wt,zt);else Et(it.__webglFramebuffer,L,T,r.COLOR_ATTACHMENT0,wt,0);x(T)&&y(wt),i.unbindTexture()}L.depthBuffer&&Ft(L)}function me(L){const T=L.textures;for(let it=0,ft=T.length;it<ft;it++){const Mt=T[it];if(x(Mt)){const dt=I(L),kt=s.get(Mt).__webglTexture;i.bindTexture(dt,kt),y(dt),i.unbindTexture()}}}const Qe=[],H=[];function On(L){if(L.samples>0){if(ye(L)===!1){const T=L.textures,it=L.width,ft=L.height;let Mt=r.COLOR_BUFFER_BIT;const dt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,kt=s.get(L),wt=T.length>1;if(wt)for(let zt=0;zt<T.length;zt++)i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let zt=0;zt<T.length;zt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Mt|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Mt|=r.STENCIL_BUFFER_BIT)),wt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const Se=s.get(T[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Se,0)}r.blitFramebuffer(0,0,it,ft,0,0,it,ft,Mt,r.NEAREST),m===!0&&(Qe.length=0,H.length=0,Qe.push(r.COLOR_ATTACHMENT0+zt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Qe.push(dt),H.push(dt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,H)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qe))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),wt)for(let zt=0;zt<T.length;zt++){i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const Se=s.get(T[zt]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,kt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,Se,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&m){const T=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function de(L){return Math.min(l.maxSamples,L.samples)}function ye(L){const T=s.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function qt(L){const T=h.render.frame;g.get(L)!==T&&(g.set(L,T),L.update())}function Oe(L,T){const it=L.colorSpace,ft=L.format,Mt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||it!==Yr&&it!==Qa&&(Ue.getTransfer(it)===Ve?(ft!==Oi||Mt!==xa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",it)),T}function Wt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(p.width=L.naturalWidth||L.width,p.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(p.width=L.displayWidth,p.height=L.displayHeight):(p.width=L.width,p.height=L.height),p}this.allocateTextureUnit=et,this.resetTextureUnits=j,this.setTexture2D=gt,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=ie,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=On,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=ye}function F1(r,t){function i(s,l=Qa){let c;const h=Ue.getTransfer(l);if(s===xa)return r.UNSIGNED_BYTE;if(s===ip)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ap)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Av)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===bv)return r.BYTE;if(s===Tv)return r.SHORT;if(s===el)return r.UNSIGNED_SHORT;if(s===np)return r.INT;if(s===zs)return r.UNSIGNED_INT;if(s===va)return r.FLOAT;if(s===il)return r.HALF_FLOAT;if(s===Rv)return r.ALPHA;if(s===Cv)return r.RGB;if(s===Oi)return r.RGBA;if(s===wv)return r.LUMINANCE;if(s===Dv)return r.LUMINANCE_ALPHA;if(s===Hr)return r.DEPTH_COMPONENT;if(s===qr)return r.DEPTH_STENCIL;if(s===Uv)return r.RED;if(s===sp)return r.RED_INTEGER;if(s===Lv)return r.RG;if(s===rp)return r.RG_INTEGER;if(s===op)return r.RGBA_INTEGER;if(s===Wc||s===qc||s===Yc||s===jc)if(h===Ve)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Wc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===qc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Yc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Wc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===qc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Yc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===jc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===bd||s===Td||s===Ad||s===Rd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===bd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Td)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ad)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Rd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Cd||s===wd||s===Dd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Cd||s===wd)return h===Ve?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Dd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ud||s===Ld||s===Nd||s===Od||s===Pd||s===zd||s===Bd||s===Id||s===Fd||s===Hd||s===Gd||s===Vd||s===kd||s===Xd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Ud)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ld)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Nd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Od)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===zd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Bd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Id)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Hd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Gd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===kd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xd)return h===Ve?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Zc||s===Wd||s===qd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Zc)return h===Ve?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Nv||s===Yd||s===jd||s===Zd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Zc)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Yd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Wr?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const H1={type:"move"};class $h{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const R of t.hand.values()){const x=i.getJointPose(R,s),y=this._getHandJoint(p,R);x!==null&&(y.matrix.fromArray(x.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=x.radius),y.visible=x!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],S=g.position.distanceTo(_.position),M=.02,E=.005;p.inputState.pinching&&S>M+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&S<=M-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(H1)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new zc;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const G1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V1=`
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

}`;class k1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new ti,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new es({vertexShader:G1,fragmentShader:V1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Jn(new sl(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class X1 extends Is{constructor(t,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,g=null,_=null,S=null,M=null,E=null;const R=new k1,x=i.getContextAttributes();let y=null,I=null;const O=[],U=[],J=new re;let V=null;const P=new Mi;P.viewport=new sn;const W=new Mi;W.viewport=new sn;const D=[P,W],C=new oE;let w=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ct=O[Z];return ct===void 0&&(ct=new $h,O[Z]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Z){let ct=O[Z];return ct===void 0&&(ct=new $h,O[Z]=ct),ct.getGripSpace()},this.getHand=function(Z){let ct=O[Z];return ct===void 0&&(ct=new $h,O[Z]=ct),ct.getHandSpace()};function et(Z){const ct=U.indexOf(Z.inputSource);if(ct===-1)return;const Et=O[ct];Et!==void 0&&(Et.update(Z.inputSource,Z.frame,p||h),Et.dispatchEvent({type:Z.type,data:Z.inputSource}))}function mt(){l.removeEventListener("select",et),l.removeEventListener("selectstart",et),l.removeEventListener("selectend",et),l.removeEventListener("squeeze",et),l.removeEventListener("squeezestart",et),l.removeEventListener("squeezeend",et),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",gt);for(let Z=0;Z<O.length;Z++){const ct=U[Z];ct!==null&&(U[Z]=null,O[Z].disconnect(ct))}w=null,j=null,R.reset(),t.setRenderTarget(y),M=null,S=null,_=null,l=null,I=null,St.stop(),s.isPresenting=!1,t.setPixelRatio(V),t.setSize(J.width,J.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(Z){p=Z},this.getBaseLayer=function(){return S!==null?S:M},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(y=t.getRenderTarget(),l.addEventListener("select",et),l.addEventListener("selectstart",et),l.addEventListener("selectend",et),l.addEventListener("squeeze",et),l.addEventListener("squeezestart",et),l.addEventListener("squeezeend",et),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",gt),x.xrCompatible!==!0&&await i.makeXRCompatible(),V=t.getPixelRatio(),t.getSize(J),l.renderState.layers===void 0){const ct={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,ct),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new Bs(M.framebufferWidth,M.framebufferHeight,{format:Oi,type:xa,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let ct=null,Et=null,yt=null;x.depth&&(yt=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ct=x.stencil?qr:Hr,Et=x.stencil?Wr:zs);const Gt={colorFormat:i.RGBA8,depthFormat:yt,scaleFactor:c};_=new XRWebGLBinding(l,i),S=_.createProjectionLayer(Gt),l.updateRenderState({layers:[S]}),t.setPixelRatio(1),t.setSize(S.textureWidth,S.textureHeight,!1),I=new Bs(S.textureWidth,S.textureHeight,{format:Oi,type:xa,depthTexture:new Yv(S.textureWidth,S.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:S.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),St.setContext(l),St.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return R.getDepthTexture()};function gt(Z){for(let ct=0;ct<Z.removed.length;ct++){const Et=Z.removed[ct],yt=U.indexOf(Et);yt>=0&&(U[yt]=null,O[yt].disconnect(Et))}for(let ct=0;ct<Z.added.length;ct++){const Et=Z.added[ct];let yt=U.indexOf(Et);if(yt===-1){for(let Ft=0;Ft<O.length;Ft++)if(Ft>=U.length){U.push(Et),yt=Ft;break}else if(U[Ft]===null){U[Ft]=Et,yt=Ft;break}if(yt===-1)break}const Gt=O[yt];Gt&&Gt.connect(Et)}}const z=new F,Q=new F;function K(Z,ct,Et){z.setFromMatrixPosition(ct.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const yt=z.distanceTo(Q),Gt=ct.projectionMatrix.elements,Ft=Et.projectionMatrix.elements,ie=Gt[14]/(Gt[10]-1),Be=Gt[14]/(Gt[10]+1),me=(Gt[9]+1)/Gt[5],Qe=(Gt[9]-1)/Gt[5],H=(Gt[8]-1)/Gt[0],On=(Ft[8]+1)/Ft[0],de=ie*H,ye=ie*On,qt=yt/(-H+On),Oe=qt*-H;if(ct.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Oe),Z.translateZ(qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Gt[10]===-1)Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{const Wt=ie+qt,L=Be+qt,T=de-Oe,it=ye+(yt-Oe),ft=me*Be/L*Wt,Mt=Qe*Be/L*Wt;Z.projectionMatrix.makePerspective(T,it,ft,Mt,Wt,L),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function xt(Z,ct){ct===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ct.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let ct=Z.near,Et=Z.far;R.texture!==null&&(R.depthNear>0&&(ct=R.depthNear),R.depthFar>0&&(Et=R.depthFar)),C.near=W.near=P.near=ct,C.far=W.far=P.far=Et,(w!==C.near||j!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),w=C.near,j=C.far),P.layers.mask=Z.layers.mask|2,W.layers.mask=Z.layers.mask|4,C.layers.mask=P.layers.mask|W.layers.mask;const yt=Z.parent,Gt=C.cameras;xt(C,yt);for(let Ft=0;Ft<Gt.length;Ft++)xt(Gt[Ft],yt);Gt.length===2?K(C,P,W):C.projectionMatrix.copy(P.projectionMatrix),bt(Z,C,yt)};function bt(Z,ct,Et){Et===null?Z.matrix.copy(ct.matrixWorld):(Z.matrix.copy(Et.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ct.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ct.projectionMatrix),Z.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=nl*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(S===null&&M===null))return m},this.setFoveation=function(Z){m=Z,S!==null&&(S.fixedFoveation=Z),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Z)},this.hasDepthSensing=function(){return R.texture!==null},this.getDepthSensingMesh=function(){return R.getMesh(C)};let N=null;function at(Z,ct){if(g=ct.getViewerPose(p||h),E=ct,g!==null){const Et=g.views;M!==null&&(t.setRenderTargetFramebuffer(I,M.framebuffer),t.setRenderTarget(I));let yt=!1;Et.length!==C.cameras.length&&(C.cameras.length=0,yt=!0);for(let Ft=0;Ft<Et.length;Ft++){const ie=Et[Ft];let Be=null;if(M!==null)Be=M.getViewport(ie);else{const Qe=_.getViewSubImage(S,ie);Be=Qe.viewport,Ft===0&&(t.setRenderTargetTextures(I,Qe.colorTexture,S.ignoreDepthValues?void 0:Qe.depthStencilTexture),t.setRenderTarget(I))}let me=D[Ft];me===void 0&&(me=new Mi,me.layers.enable(Ft),me.viewport=new sn,D[Ft]=me),me.matrix.fromArray(ie.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(ie.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Be.x,Be.y,Be.width,Be.height),Ft===0&&(C.matrix.copy(me.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),yt===!0&&C.cameras.push(me)}const Gt=l.enabledFeatures;if(Gt&&Gt.includes("depth-sensing")){const Ft=_.getDepthInformation(Et[0]);Ft&&Ft.isValid&&Ft.texture&&R.init(t,Ft,l.renderState)}}for(let Et=0;Et<O.length;Et++){const yt=U[Et],Gt=O[Et];yt!==null&&Gt!==void 0&&Gt.update(yt,ct,p||h)}N&&N(Z,ct),ct.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ct}),E=null}const St=new Kv;St.setAnimationLoop(at),this.setAnimationLoop=function(Z){N=Z},this.dispose=function(){}}}const Rs=new qi,W1=new Xe;function q1(r,t){function i(x,y){x.matrixAutoUpdate===!0&&x.updateMatrix(),y.value.copy(x.matrix)}function s(x,y){y.color.getRGB(x.fogColor.value,Vv(r)),y.isFog?(x.fogNear.value=y.near,x.fogFar.value=y.far):y.isFogExp2&&(x.fogDensity.value=y.density)}function l(x,y,I,O,U){y.isMeshBasicMaterial||y.isMeshLambertMaterial?c(x,y):y.isMeshToonMaterial?(c(x,y),_(x,y)):y.isMeshPhongMaterial?(c(x,y),g(x,y)):y.isMeshStandardMaterial?(c(x,y),S(x,y),y.isMeshPhysicalMaterial&&M(x,y,U)):y.isMeshMatcapMaterial?(c(x,y),E(x,y)):y.isMeshDepthMaterial?c(x,y):y.isMeshDistanceMaterial?(c(x,y),R(x,y)):y.isMeshNormalMaterial?c(x,y):y.isLineBasicMaterial?(h(x,y),y.isLineDashedMaterial&&d(x,y)):y.isPointsMaterial?m(x,y,I,O):y.isSpriteMaterial?p(x,y):y.isShadowMaterial?(x.color.value.copy(y.color),x.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(x,y){x.opacity.value=y.opacity,y.color&&x.diffuse.value.copy(y.color),y.emissive&&x.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(x.map.value=y.map,i(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.bumpMap&&(x.bumpMap.value=y.bumpMap,i(y.bumpMap,x.bumpMapTransform),x.bumpScale.value=y.bumpScale,y.side===$n&&(x.bumpScale.value*=-1)),y.normalMap&&(x.normalMap.value=y.normalMap,i(y.normalMap,x.normalMapTransform),x.normalScale.value.copy(y.normalScale),y.side===$n&&x.normalScale.value.negate()),y.displacementMap&&(x.displacementMap.value=y.displacementMap,i(y.displacementMap,x.displacementMapTransform),x.displacementScale.value=y.displacementScale,x.displacementBias.value=y.displacementBias),y.emissiveMap&&(x.emissiveMap.value=y.emissiveMap,i(y.emissiveMap,x.emissiveMapTransform)),y.specularMap&&(x.specularMap.value=y.specularMap,i(y.specularMap,x.specularMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest);const I=t.get(y),O=I.envMap,U=I.envMapRotation;O&&(x.envMap.value=O,Rs.copy(U),Rs.x*=-1,Rs.y*=-1,Rs.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Rs.y*=-1,Rs.z*=-1),x.envMapRotation.value.setFromMatrix4(W1.makeRotationFromEuler(Rs)),x.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=y.reflectivity,x.ior.value=y.ior,x.refractionRatio.value=y.refractionRatio),y.lightMap&&(x.lightMap.value=y.lightMap,x.lightMapIntensity.value=y.lightMapIntensity,i(y.lightMap,x.lightMapTransform)),y.aoMap&&(x.aoMap.value=y.aoMap,x.aoMapIntensity.value=y.aoMapIntensity,i(y.aoMap,x.aoMapTransform))}function h(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,y.map&&(x.map.value=y.map,i(y.map,x.mapTransform))}function d(x,y){x.dashSize.value=y.dashSize,x.totalSize.value=y.dashSize+y.gapSize,x.scale.value=y.scale}function m(x,y,I,O){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.size.value=y.size*I,x.scale.value=O*.5,y.map&&(x.map.value=y.map,i(y.map,x.uvTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function p(x,y){x.diffuse.value.copy(y.color),x.opacity.value=y.opacity,x.rotation.value=y.rotation,y.map&&(x.map.value=y.map,i(y.map,x.mapTransform)),y.alphaMap&&(x.alphaMap.value=y.alphaMap,i(y.alphaMap,x.alphaMapTransform)),y.alphaTest>0&&(x.alphaTest.value=y.alphaTest)}function g(x,y){x.specular.value.copy(y.specular),x.shininess.value=Math.max(y.shininess,1e-4)}function _(x,y){y.gradientMap&&(x.gradientMap.value=y.gradientMap)}function S(x,y){x.metalness.value=y.metalness,y.metalnessMap&&(x.metalnessMap.value=y.metalnessMap,i(y.metalnessMap,x.metalnessMapTransform)),x.roughness.value=y.roughness,y.roughnessMap&&(x.roughnessMap.value=y.roughnessMap,i(y.roughnessMap,x.roughnessMapTransform)),y.envMap&&(x.envMapIntensity.value=y.envMapIntensity)}function M(x,y,I){x.ior.value=y.ior,y.sheen>0&&(x.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),x.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(x.sheenColorMap.value=y.sheenColorMap,i(y.sheenColorMap,x.sheenColorMapTransform)),y.sheenRoughnessMap&&(x.sheenRoughnessMap.value=y.sheenRoughnessMap,i(y.sheenRoughnessMap,x.sheenRoughnessMapTransform))),y.clearcoat>0&&(x.clearcoat.value=y.clearcoat,x.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(x.clearcoatMap.value=y.clearcoatMap,i(y.clearcoatMap,x.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,i(y.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(x.clearcoatNormalMap.value=y.clearcoatNormalMap,i(y.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===$n&&x.clearcoatNormalScale.value.negate())),y.dispersion>0&&(x.dispersion.value=y.dispersion),y.iridescence>0&&(x.iridescence.value=y.iridescence,x.iridescenceIOR.value=y.iridescenceIOR,x.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(x.iridescenceMap.value=y.iridescenceMap,i(y.iridescenceMap,x.iridescenceMapTransform)),y.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=y.iridescenceThicknessMap,i(y.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),y.transmission>0&&(x.transmission.value=y.transmission,x.transmissionSamplerMap.value=I.texture,x.transmissionSamplerSize.value.set(I.width,I.height),y.transmissionMap&&(x.transmissionMap.value=y.transmissionMap,i(y.transmissionMap,x.transmissionMapTransform)),x.thickness.value=y.thickness,y.thicknessMap&&(x.thicknessMap.value=y.thicknessMap,i(y.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=y.attenuationDistance,x.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(x.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(x.anisotropyMap.value=y.anisotropyMap,i(y.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=y.specularIntensity,x.specularColor.value.copy(y.specularColor),y.specularColorMap&&(x.specularColorMap.value=y.specularColorMap,i(y.specularColorMap,x.specularColorMapTransform)),y.specularIntensityMap&&(x.specularIntensityMap.value=y.specularIntensityMap,i(y.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,y){y.matcap&&(x.matcap.value=y.matcap)}function R(x,y){const I=t.get(y).light;x.referencePosition.value.setFromMatrixPosition(I.matrixWorld),x.nearDistance.value=I.shadow.camera.near,x.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function Y1(r,t,i,s){let l={},c={},h=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,O){const U=O.program;s.uniformBlockBinding(I,U)}function p(I,O){let U=l[I.id];U===void 0&&(E(I),U=g(I),l[I.id]=U,I.addEventListener("dispose",x));const J=O.program;s.updateUBOMapping(I,J);const V=t.render.frame;c[I.id]!==V&&(S(I),c[I.id]=V)}function g(I){const O=_();I.__bindingPointIndex=O;const U=r.createBuffer(),J=I.__size,V=I.usage;return r.bindBuffer(r.UNIFORM_BUFFER,U),r.bufferData(r.UNIFORM_BUFFER,J,V),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,O,U),U}function _(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function S(I){const O=l[I.id],U=I.uniforms,J=I.__cache;r.bindBuffer(r.UNIFORM_BUFFER,O);for(let V=0,P=U.length;V<P;V++){const W=Array.isArray(U[V])?U[V]:[U[V]];for(let D=0,C=W.length;D<C;D++){const w=W[D];if(M(w,V,D,J)===!0){const j=w.__offset,et=Array.isArray(w.value)?w.value:[w.value];let mt=0;for(let gt=0;gt<et.length;gt++){const z=et[gt],Q=R(z);typeof z=="number"||typeof z=="boolean"?(w.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,j+mt,w.__data)):z.isMatrix3?(w.__data[0]=z.elements[0],w.__data[1]=z.elements[1],w.__data[2]=z.elements[2],w.__data[3]=0,w.__data[4]=z.elements[3],w.__data[5]=z.elements[4],w.__data[6]=z.elements[5],w.__data[7]=0,w.__data[8]=z.elements[6],w.__data[9]=z.elements[7],w.__data[10]=z.elements[8],w.__data[11]=0):(z.toArray(w.__data,mt),mt+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,j,w.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(I,O,U,J){const V=I.value,P=O+"_"+U;if(J[P]===void 0)return typeof V=="number"||typeof V=="boolean"?J[P]=V:J[P]=V.clone(),!0;{const W=J[P];if(typeof V=="number"||typeof V=="boolean"){if(W!==V)return J[P]=V,!0}else if(W.equals(V)===!1)return W.copy(V),!0}return!1}function E(I){const O=I.uniforms;let U=0;const J=16;for(let P=0,W=O.length;P<W;P++){const D=Array.isArray(O[P])?O[P]:[O[P]];for(let C=0,w=D.length;C<w;C++){const j=D[C],et=Array.isArray(j.value)?j.value:[j.value];for(let mt=0,gt=et.length;mt<gt;mt++){const z=et[mt],Q=R(z),K=U%J,xt=K%Q.boundary,bt=K+xt;U+=xt,bt!==0&&J-bt<Q.storage&&(U+=J-bt),j.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=U,U+=Q.storage}}}const V=U%J;return V>0&&(U+=J-V),I.__size=U,I.__cache={},this}function R(I){const O={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(O.boundary=4,O.storage=4):I.isVector2?(O.boundary=8,O.storage=8):I.isVector3||I.isColor?(O.boundary=16,O.storage=12):I.isVector4?(O.boundary=16,O.storage=16):I.isMatrix3?(O.boundary=48,O.storage=48):I.isMatrix4?(O.boundary=64,O.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),O}function x(I){const O=I.target;O.removeEventListener("dispose",x);const U=h.indexOf(O.__bindingPointIndex);h.splice(U,1),r.deleteBuffer(l[O.id]),delete l[O.id],delete c[O.id]}function y(){for(const I in l)r.deleteBuffer(l[I]);h=[],l={},c={}}return{bind:m,update:p,dispose:y}}class j1{constructor(t={}){const{canvas:i=TM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:S=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const E=new Uint32Array(4),R=new Int32Array(4);let x=null,y=null;const I=[],O=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xi,this.toneMapping=$a,this.toneMappingExposure=1;const U=this;let J=!1,V=0,P=0,W=null,D=-1,C=null;const w=new sn,j=new sn;let et=null;const mt=new he(0);let gt=0,z=i.width,Q=i.height,K=1,xt=null,bt=null;const N=new sn(0,0,z,Q),at=new sn(0,0,z,Q);let St=!1;const Z=new fp;let ct=!1,Et=!1;const yt=new Xe,Gt=new Xe,Ft=new F,ie=new sn,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function Qe(){return W===null?K:1}let H=s;function On(A,X){return i.getContext(A,X)}try{const A={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${ep}`),i.addEventListener("webglcontextlost",_t,!1),i.addEventListener("webglcontextrestored",Ct,!1),i.addEventListener("webglcontextcreationerror",Dt,!1),H===null){const X="webgl2";if(H=On(X,A),H===null)throw On(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let de,ye,qt,Oe,Wt,L,T,it,ft,Mt,dt,kt,wt,zt,Se,At,Bt,Yt,Xt,Nt,$t,oe,Ie,k;function Rt(){de=new iA(H),de.init(),oe=new F1(H,de),ye=new QT(H,de,t,oe),qt=new B1(H,de),ye.reverseDepthBuffer&&S&&qt.buffers.depth.setReversed(!0),Oe=new rA(H),Wt=new b1,L=new I1(H,de,qt,Wt,ye,oe,Oe),T=new $T(U),it=new nA(U),ft=new dE(H),Ie=new ZT(H,ft),Mt=new aA(H,ft,Oe,Ie),dt=new lA(H,Mt,ft,Oe),Xt=new oA(H,ye,L),At=new JT(Wt),kt=new E1(U,T,it,de,ye,Ie,At),wt=new q1(U,Wt),zt=new A1,Se=new L1(de),Yt=new jT(U,T,it,qt,dt,M,m),Bt=new P1(U,dt,ye),k=new Y1(H,Oe,ye,qt),Nt=new KT(H,de,Oe),$t=new sA(H,de,Oe),Oe.programs=kt.programs,U.capabilities=ye,U.extensions=de,U.properties=Wt,U.renderLists=zt,U.shadowMap=Bt,U.state=qt,U.info=Oe}Rt();const lt=new X1(U,H);this.xr=lt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=de.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=de.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(z,Q,!1))},this.getSize=function(A){return A.set(z,Q)},this.setSize=function(A,X,st=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=A,Q=X,i.width=Math.floor(A*K),i.height=Math.floor(X*K),st===!0&&(i.style.width=A+"px",i.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(z*K,Q*K).floor()},this.setDrawingBufferSize=function(A,X,st){z=A,Q=X,K=st,i.width=Math.floor(A*st),i.height=Math.floor(X*st),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy(N)},this.setViewport=function(A,X,st,rt){A.isVector4?N.set(A.x,A.y,A.z,A.w):N.set(A,X,st,rt),qt.viewport(w.copy(N).multiplyScalar(K).round())},this.getScissor=function(A){return A.copy(at)},this.setScissor=function(A,X,st,rt){A.isVector4?at.set(A.x,A.y,A.z,A.w):at.set(A,X,st,rt),qt.scissor(j.copy(at).multiplyScalar(K).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(A){qt.setScissorTest(St=A)},this.setOpaqueSort=function(A){xt=A},this.setTransparentSort=function(A){bt=A},this.getClearColor=function(A){return A.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(A=!0,X=!0,st=!0){let rt=0;if(A){let q=!1;if(W!==null){const vt=W.texture.format;q=vt===op||vt===rp||vt===sp}if(q){const vt=W.texture.type,Ut=vt===xa||vt===zs||vt===el||vt===Wr||vt===ip||vt===ap,Pt=Yt.getClearColor(),Ot=Yt.getClearAlpha(),Kt=Pt.r,ee=Pt.g,jt=Pt.b;Ut?(E[0]=Kt,E[1]=ee,E[2]=jt,E[3]=Ot,H.clearBufferuiv(H.COLOR,0,E)):(R[0]=Kt,R[1]=ee,R[2]=jt,R[3]=Ot,H.clearBufferiv(H.COLOR,0,R))}else rt|=H.COLOR_BUFFER_BIT}X&&(rt|=H.DEPTH_BUFFER_BIT),st&&(rt|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_t,!1),i.removeEventListener("webglcontextrestored",Ct,!1),i.removeEventListener("webglcontextcreationerror",Dt,!1),Yt.dispose(),zt.dispose(),Se.dispose(),Wt.dispose(),T.dispose(),it.dispose(),dt.dispose(),Ie.dispose(),k.dispose(),kt.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",Jr),lt.removeEventListener("sessionend",$r),zi.stop()};function _t(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),J=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),J=!1;const A=Oe.autoReset,X=Bt.enabled,st=Bt.autoUpdate,rt=Bt.needsUpdate,q=Bt.type;Rt(),Oe.autoReset=A,Bt.enabled=X,Bt.autoUpdate=st,Bt.needsUpdate=rt,Bt.type=q}function Dt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function te(A){const X=A.target;X.removeEventListener("dispose",te),Je(X)}function Je(A){mn(A),Wt.remove(A)}function mn(A){const X=Wt.get(A).programs;X!==void 0&&(X.forEach(function(st){kt.releaseProgram(st)}),A.isShaderMaterial&&kt.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,st,rt,q,vt){X===null&&(X=Be);const Ut=q.isMesh&&q.matrixWorld.determinant()<0,Pt=eo(A,X,st,rt,q);qt.setMaterial(rt,Ut);let Ot=st.index,Kt=1;if(rt.wireframe===!0){if(Ot=Mt.getWireframeAttribute(st),Ot===void 0)return;Kt=2}const ee=st.drawRange,jt=st.attributes.position;let xe=ee.start*Kt,Re=(ee.start+ee.count)*Kt;vt!==null&&(xe=Math.max(xe,vt.start*Kt),Re=Math.min(Re,(vt.start+vt.count)*Kt)),Ot!==null?(xe=Math.max(xe,0),Re=Math.min(Re,Ot.count)):jt!=null&&(xe=Math.max(xe,0),Re=Math.min(Re,jt.count));const Ye=Re-xe;if(Ye<0||Ye===1/0)return;Ie.setup(q,rt,Pt,st,Ot);let We,le=Nt;if(Ot!==null&&(We=ft.get(Ot),le=$t,le.setIndex(We)),q.isMesh)rt.wireframe===!0?(qt.setLineWidth(rt.wireframeLinewidth*Qe()),le.setMode(H.LINES)):le.setMode(H.TRIANGLES);else if(q.isLine){let Ht=rt.linewidth;Ht===void 0&&(Ht=1),qt.setLineWidth(Ht*Qe()),q.isLineSegments?le.setMode(H.LINES):q.isLineLoop?le.setMode(H.LINE_LOOP):le.setMode(H.LINE_STRIP)}else q.isPoints?le.setMode(H.POINTS):q.isSprite&&le.setMode(H.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)le.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(de.get("WEBGL_multi_draw"))le.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Ht=q._multiDrawStarts,cn=q._multiDrawCounts,Ce=q._multiDrawCount,Fn=Ot?ft.get(Ot).bytesPerElement:1,ji=Wt.get(rt).currentProgram.getUniforms();for(let Mn=0;Mn<Ce;Mn++)ji.setValue(H,"_gl_DrawID",Mn),le.render(Ht[Mn]/Fn,cn[Mn])}else if(q.isInstancedMesh)le.renderInstances(xe,Ye,q.count);else if(st.isInstancedBufferGeometry){const Ht=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,cn=Math.min(st.instanceCount,Ht);le.renderInstances(xe,Ye,cn)}else le.render(xe,Ye)};function Ae(A,X,st){A.transparent===!0&&A.side===Ei&&A.forceSinglePass===!1?(A.side=$n,A.needsUpdate=!0,en(A,X,st),A.side=ts,A.needsUpdate=!0,en(A,X,st),A.side=Ei):en(A,X,st)}this.compile=function(A,X,st=null){st===null&&(st=A),y=Se.get(st),y.init(X),O.push(y),st.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(y.pushLight(q),q.castShadow&&y.pushShadow(q))}),A!==st&&A.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(y.pushLight(q),q.castShadow&&y.pushShadow(q))}),y.setupLights();const rt=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const vt=q.material;if(vt)if(Array.isArray(vt))for(let Ut=0;Ut<vt.length;Ut++){const Pt=vt[Ut];Ae(Pt,st,q),rt.add(Pt)}else Ae(vt,st,q),rt.add(vt)}),O.pop(),y=null,rt},this.compileAsync=function(A,X,st=null){const rt=this.compile(A,X,st);return new Promise(q=>{function vt(){if(rt.forEach(function(Ut){Wt.get(Ut).currentProgram.isReady()&&rt.delete(Ut)}),rt.size===0){q(A);return}setTimeout(vt,10)}de.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let An=null;function bi(A){An&&An(A)}function Jr(){zi.stop()}function $r(){zi.start()}const zi=new Kv;zi.setAnimationLoop(bi),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(A){An=A,lt.setAnimationLoop(A),A===null?zi.stop():zi.start()},lt.addEventListener("sessionstart",Jr),lt.addEventListener("sessionend",$r),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(J===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(X),X=lt.getCamera()),A.isScene===!0&&A.onBeforeRender(U,A,X,W),y=Se.get(A,O.length),y.init(X),O.push(y),Gt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Z.setFromProjectionMatrix(Gt),Et=this.localClippingEnabled,ct=At.init(this.clippingPlanes,Et),x=zt.get(A,I.length),x.init(),I.push(x),lt.enabled===!0&&lt.isPresenting===!0){const vt=U.xr.getDepthSensingMesh();vt!==null&&ns(vt,X,-1/0,U.sortObjects)}ns(A,X,0,U.sortObjects),x.finish(),U.sortObjects===!0&&x.sort(xt,bt),me=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,me&&Yt.addToRenderList(x,A),this.info.render.frame++,ct===!0&&At.beginShadows();const st=y.state.shadowsArray;Bt.render(st,A,X),ct===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=x.opaque,q=x.transmissive;if(y.setupLights(),X.isArrayCamera){const vt=X.cameras;if(q.length>0)for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++){const Ot=vt[Ut];to(rt,q,A,Ot)}me&&Yt.render(A);for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++){const Ot=vt[Ut];Hs(x,A,Ot,Ot.viewport)}}else q.length>0&&to(rt,q,A,X),me&&Yt.render(A),Hs(x,A,X);W!==null&&(L.updateMultisampleRenderTarget(W),L.updateRenderTargetMipmap(W)),A.isScene===!0&&A.onAfterRender(U,A,X),Ie.resetDefaultState(),D=-1,C=null,O.pop(),O.length>0?(y=O[O.length-1],ct===!0&&At.setGlobalState(U.clippingPlanes,y.state.camera)):y=null,I.pop(),I.length>0?x=I[I.length-1]:x=null};function ns(A,X,st,rt){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)st=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)y.pushLight(A),A.castShadow&&y.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Z.intersectsSprite(A)){rt&&ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Gt);const Ut=dt.update(A),Pt=A.material;Pt.visible&&x.push(A,Ut,Pt,st,ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Z.intersectsObject(A))){const Ut=dt.update(A),Pt=A.material;if(rt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ie.copy(A.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ie.copy(Ut.boundingSphere.center)),ie.applyMatrix4(A.matrixWorld).applyMatrix4(Gt)),Array.isArray(Pt)){const Ot=Ut.groups;for(let Kt=0,ee=Ot.length;Kt<ee;Kt++){const jt=Ot[Kt],xe=Pt[jt.materialIndex];xe&&xe.visible&&x.push(A,Ut,xe,st,ie.z,jt)}}else Pt.visible&&x.push(A,Ut,Pt,st,ie.z,null)}}const vt=A.children;for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++)ns(vt[Ut],X,st,rt)}function Hs(A,X,st,rt){const q=A.opaque,vt=A.transmissive,Ut=A.transparent;y.setupLightsView(st),ct===!0&&At.setGlobalState(U.clippingPlanes,st),rt&&qt.viewport(w.copy(rt)),q.length>0&&is(q,X,st),vt.length>0&&is(vt,X,st),Ut.length>0&&is(Ut,X,st),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function to(A,X,st,rt){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[rt.id]===void 0&&(y.state.transmissionRenderTarget[rt.id]=new Bs(1,1,{generateMipmaps:!0,type:de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float")?il:xa,minFilter:Ps,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const vt=y.state.transmissionRenderTarget[rt.id],Ut=rt.viewport||w;vt.setSize(Ut.z,Ut.w);const Pt=U.getRenderTarget();U.setRenderTarget(vt),U.getClearColor(mt),gt=U.getClearAlpha(),gt<1&&U.setClearColor(16777215,.5),U.clear(),me&&Yt.render(st);const Ot=U.toneMapping;U.toneMapping=$a;const Kt=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),y.setupLightsView(rt),ct===!0&&At.setGlobalState(U.clippingPlanes,rt),is(A,st,rt),L.updateMultisampleRenderTarget(vt),L.updateRenderTargetMipmap(vt),de.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let jt=0,xe=X.length;jt<xe;jt++){const Re=X[jt],Ye=Re.object,We=Re.geometry,le=Re.material,Ht=Re.group;if(le.side===Ei&&Ye.layers.test(rt.layers)){const cn=le.side;le.side=$n,le.needsUpdate=!0,Ti(Ye,st,rt,We,le,Ht),le.side=cn,le.needsUpdate=!0,ee=!0}}ee===!0&&(L.updateMultisampleRenderTarget(vt),L.updateRenderTargetMipmap(vt))}U.setRenderTarget(Pt),U.setClearColor(mt,gt),Kt!==void 0&&(rt.viewport=Kt),U.toneMapping=Ot}function is(A,X,st){const rt=X.isScene===!0?X.overrideMaterial:null;for(let q=0,vt=A.length;q<vt;q++){const Ut=A[q],Pt=Ut.object,Ot=Ut.geometry,Kt=rt===null?Ut.material:rt,ee=Ut.group;Pt.layers.test(st.layers)&&Ti(Pt,X,st,Ot,Kt,ee)}}function Ti(A,X,st,rt,q,vt){A.onBeforeRender(U,X,st,rt,q,vt),A.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(U,X,st,rt,A,vt),q.transparent===!0&&q.side===Ei&&q.forceSinglePass===!1?(q.side=$n,q.needsUpdate=!0,U.renderBufferDirect(st,X,rt,q,A,vt),q.side=ts,q.needsUpdate=!0,U.renderBufferDirect(st,X,rt,q,A,vt),q.side=Ei):U.renderBufferDirect(st,X,rt,q,A,vt),A.onAfterRender(U,X,st,rt,q,vt)}function en(A,X,st){X.isScene!==!0&&(X=Be);const rt=Wt.get(A),q=y.state.lights,vt=y.state.shadowsArray,Ut=q.state.version,Pt=kt.getParameters(A,q.state,vt,X,st),Ot=kt.getProgramCacheKey(Pt);let Kt=rt.programs;rt.environment=A.isMeshStandardMaterial?X.environment:null,rt.fog=X.fog,rt.envMap=(A.isMeshStandardMaterial?it:T).get(A.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Kt===void 0&&(A.addEventListener("dispose",te),Kt=new Map,rt.programs=Kt);let ee=Kt.get(Ot);if(ee!==void 0){if(rt.currentProgram===ee&&rt.lightsStateVersion===Ut)return Yi(A,Pt),ee}else Pt.uniforms=kt.getUniforms(A),A.onBeforeCompile(Pt,U),ee=kt.acquireProgram(Pt,Ot),Kt.set(Ot,ee),rt.uniforms=Pt.uniforms;const jt=rt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(jt.clippingPlanes=At.uniform),Yi(A,Pt),rt.needsLights=fu(A),rt.lightsStateVersion=Ut,rt.needsLights&&(jt.ambientLightColor.value=q.state.ambient,jt.lightProbe.value=q.state.probe,jt.directionalLights.value=q.state.directional,jt.directionalLightShadows.value=q.state.directionalShadow,jt.spotLights.value=q.state.spot,jt.spotLightShadows.value=q.state.spotShadow,jt.rectAreaLights.value=q.state.rectArea,jt.ltc_1.value=q.state.rectAreaLTC1,jt.ltc_2.value=q.state.rectAreaLTC2,jt.pointLights.value=q.state.point,jt.pointLightShadows.value=q.state.pointShadow,jt.hemisphereLights.value=q.state.hemi,jt.directionalShadowMap.value=q.state.directionalShadowMap,jt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,jt.spotShadowMap.value=q.state.spotShadowMap,jt.spotLightMatrix.value=q.state.spotLightMatrix,jt.spotLightMap.value=q.state.spotLightMap,jt.pointShadowMap.value=q.state.pointShadowMap,jt.pointShadowMatrix.value=q.state.pointShadowMatrix),rt.currentProgram=ee,rt.uniformsList=null,ee}function Rn(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Qc.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function Yi(A,X){const st=Wt.get(A);st.outputColorSpace=X.outputColorSpace,st.batching=X.batching,st.batchingColor=X.batchingColor,st.instancing=X.instancing,st.instancingColor=X.instancingColor,st.instancingMorph=X.instancingMorph,st.skinning=X.skinning,st.morphTargets=X.morphTargets,st.morphNormals=X.morphNormals,st.morphColors=X.morphColors,st.morphTargetsCount=X.morphTargetsCount,st.numClippingPlanes=X.numClippingPlanes,st.numIntersection=X.numClipIntersection,st.vertexAlphas=X.vertexAlphas,st.vertexTangents=X.vertexTangents,st.toneMapping=X.toneMapping}function eo(A,X,st,rt,q){X.isScene!==!0&&(X=Be),L.resetTextureUnits();const vt=X.fog,Ut=rt.isMeshStandardMaterial?X.environment:null,Pt=W===null?U.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:Yr,Ot=(rt.isMeshStandardMaterial?it:T).get(rt.envMap||Ut),Kt=rt.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,ee=!!st.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),jt=!!st.morphAttributes.position,xe=!!st.morphAttributes.normal,Re=!!st.morphAttributes.color;let Ye=$a;rt.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(Ye=U.toneMapping);const We=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,le=We!==void 0?We.length:0,Ht=Wt.get(rt),cn=y.state.lights;if(ct===!0&&(Et===!0||A!==C)){const gn=A===C&&rt.id===D;At.setState(rt,A,gn)}let Ce=!1;rt.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==cn.state.version||Ht.outputColorSpace!==Pt||q.isBatchedMesh&&Ht.batching===!1||!q.isBatchedMesh&&Ht.batching===!0||q.isBatchedMesh&&Ht.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Ht.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Ht.instancing===!1||!q.isInstancedMesh&&Ht.instancing===!0||q.isSkinnedMesh&&Ht.skinning===!1||!q.isSkinnedMesh&&Ht.skinning===!0||q.isInstancedMesh&&Ht.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ht.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ht.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ht.instancingMorph===!1&&q.morphTexture!==null||Ht.envMap!==Ot||rt.fog===!0&&Ht.fog!==vt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==At.numPlanes||Ht.numIntersection!==At.numIntersection)||Ht.vertexAlphas!==Kt||Ht.vertexTangents!==ee||Ht.morphTargets!==jt||Ht.morphNormals!==xe||Ht.morphColors!==Re||Ht.toneMapping!==Ye||Ht.morphTargetsCount!==le)&&(Ce=!0):(Ce=!0,Ht.__version=rt.version);let Fn=Ht.currentProgram;Ce===!0&&(Fn=en(rt,X,q));let ji=!1,Mn=!1,ss=!1;const ge=Fn.getUniforms(),Pn=Ht.uniforms;if(qt.useProgram(Fn.program)&&(ji=!0,Mn=!0,ss=!0),rt.id!==D&&(D=rt.id,Mn=!0),ji||C!==A){qt.buffers.depth.getReversed()?(yt.copy(A.projectionMatrix),RM(yt),CM(yt),ge.setValue(H,"projectionMatrix",yt)):ge.setValue(H,"projectionMatrix",A.projectionMatrix),ge.setValue(H,"viewMatrix",A.matrixWorldInverse);const rn=ge.map.cameraPosition;rn!==void 0&&rn.setValue(H,Ft.setFromMatrixPosition(A.matrixWorld)),ye.logarithmicDepthBuffer&&ge.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&ge.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),C!==A&&(C=A,Mn=!0,ss=!0)}if(q.isSkinnedMesh){ge.setOptional(H,q,"bindMatrix"),ge.setOptional(H,q,"bindMatrixInverse");const gn=q.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),ge.setValue(H,"boneTexture",gn.boneTexture,L))}q.isBatchedMesh&&(ge.setOptional(H,q,"batchingTexture"),ge.setValue(H,"batchingTexture",q._matricesTexture,L),ge.setOptional(H,q,"batchingIdTexture"),ge.setValue(H,"batchingIdTexture",q._indirectTexture,L),ge.setOptional(H,q,"batchingColorTexture"),q._colorsTexture!==null&&ge.setValue(H,"batchingColorTexture",q._colorsTexture,L));const Hn=st.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&Xt.update(q,st,Fn),(Mn||Ht.receiveShadow!==q.receiveShadow)&&(Ht.receiveShadow=q.receiveShadow,ge.setValue(H,"receiveShadow",q.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(Pn.envMap.value=Ot,Pn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&X.environment!==null&&(Pn.envMapIntensity.value=X.environmentIntensity),Mn&&(ge.setValue(H,"toneMappingExposure",U.toneMappingExposure),Ht.needsLights&&uu(Pn,ss),vt&&rt.fog===!0&&wt.refreshFogUniforms(Pn,vt),wt.refreshMaterialUniforms(Pn,rt,K,Q,y.state.transmissionRenderTarget[A.id]),Qc.upload(H,Rn(Ht),Pn,L)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Qc.upload(H,Rn(Ht),Pn,L),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&ge.setValue(H,"center",q.center),ge.setValue(H,"modelViewMatrix",q.modelViewMatrix),ge.setValue(H,"normalMatrix",q.normalMatrix),ge.setValue(H,"modelMatrix",q.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const gn=rt.uniformsGroups;for(let rn=0,Gs=gn.length;rn<Gs;rn++){const Bi=gn[rn];k.update(Bi,Fn),k.bind(Bi,Fn)}}return Fn}function uu(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function fu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(A,X,st){Wt.get(A.texture).__webglTexture=X,Wt.get(A.depthTexture).__webglTexture=st;const rt=Wt.get(A);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=st===void 0,rt.__autoAllocateDepthBuffer||de.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){const st=Wt.get(A);st.__webglFramebuffer=X,st.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,st=0){W=A,V=X,P=st;let rt=!0,q=null,vt=!1,Ut=!1;if(A){const Ot=Wt.get(A);if(Ot.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(H.FRAMEBUFFER,null),rt=!1;else if(Ot.__webglFramebuffer===void 0)L.setupRenderTarget(A);else if(Ot.__hasExternalTextures)L.rebindTextures(A,Wt.get(A.texture).__webglTexture,Wt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const jt=A.depthTexture;if(Ot.__boundDepthTexture!==jt){if(jt!==null&&Wt.has(jt)&&(A.width!==jt.image.width||A.height!==jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(A)}}const Kt=A.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Ut=!0);const ee=Wt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ee[X])?q=ee[X][st]:q=ee[X],vt=!0):A.samples>0&&L.useMultisampledRTT(A)===!1?q=Wt.get(A).__webglMultisampledFramebuffer:Array.isArray(ee)?q=ee[st]:q=ee,w.copy(A.viewport),j.copy(A.scissor),et=A.scissorTest}else w.copy(N).multiplyScalar(K).floor(),j.copy(at).multiplyScalar(K).floor(),et=St;if(qt.bindFramebuffer(H.FRAMEBUFFER,q)&&rt&&qt.drawBuffers(A,q),qt.viewport(w),qt.scissor(j),qt.setScissorTest(et),vt){const Ot=Wt.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ot.__webglTexture,st)}else if(Ut){const Ot=Wt.get(A.texture),Kt=X||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ot.__webglTexture,st||0,Kt)}D=-1},this.readRenderTargetPixels=function(A,X,st,rt,q,vt,Ut){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){qt.bindFramebuffer(H.FRAMEBUFFER,Pt);try{const Ot=A.texture,Kt=Ot.format,ee=Ot.type;if(!ye.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ye.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-rt&&st>=0&&st<=A.height-q&&H.readPixels(X,st,rt,q,oe.convert(Kt),oe.convert(ee),vt)}finally{const Ot=W!==null?Wt.get(W).__webglFramebuffer:null;qt.bindFramebuffer(H.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,X,st,rt,q,vt,Ut){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){const Ot=A.texture,Kt=Ot.format,ee=Ot.type;if(!ye.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ye.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-rt&&st>=0&&st<=A.height-q){qt.bindFramebuffer(H.FRAMEBUFFER,Pt);const jt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,jt),H.bufferData(H.PIXEL_PACK_BUFFER,vt.byteLength,H.STREAM_READ),H.readPixels(X,st,rt,q,oe.convert(Kt),oe.convert(ee),0);const xe=W!==null?Wt.get(W).__webglFramebuffer:null;qt.bindFramebuffer(H.FRAMEBUFFER,xe);const Re=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await AM(H,Re,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,jt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,vt),H.deleteBuffer(jt),H.deleteSync(Re),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,st=0){A.isTexture!==!0&&(Pr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);const rt=Math.pow(2,-st),q=Math.floor(A.image.width*rt),vt=Math.floor(A.image.height*rt),Ut=X!==null?X.x:0,Pt=X!==null?X.y:0;L.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,st,0,0,Ut,Pt,q,vt),qt.unbindTexture()};const rl=H.createFramebuffer(),as=H.createFramebuffer();this.copyTextureToTexture=function(A,X,st=null,rt=null,q=0,vt=null){A.isTexture!==!0&&(Pr("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,A=arguments[1],X=arguments[2],vt=arguments[3]||0,st=null),vt===null&&(q!==0?(Pr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=q,q=0):vt=0);let Ut,Pt,Ot,Kt,ee,jt,xe,Re,Ye;const We=A.isCompressedTexture?A.mipmaps[vt]:A.image;if(st!==null)Ut=st.max.x-st.min.x,Pt=st.max.y-st.min.y,Ot=st.isBox3?st.max.z-st.min.z:1,Kt=st.min.x,ee=st.min.y,jt=st.isBox3?st.min.z:0;else{const Hn=Math.pow(2,-q);Ut=Math.floor(We.width*Hn),Pt=Math.floor(We.height*Hn),A.isDataArrayTexture?Ot=We.depth:A.isData3DTexture?Ot=Math.floor(We.depth*Hn):Ot=1,Kt=0,ee=0,jt=0}rt!==null?(xe=rt.x,Re=rt.y,Ye=rt.z):(xe=0,Re=0,Ye=0);const le=oe.convert(X.format),Ht=oe.convert(X.type);let cn;X.isData3DTexture?(L.setTexture3D(X,0),cn=H.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(L.setTexture2DArray(X,0),cn=H.TEXTURE_2D_ARRAY):(L.setTexture2D(X,0),cn=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const Ce=H.getParameter(H.UNPACK_ROW_LENGTH),Fn=H.getParameter(H.UNPACK_IMAGE_HEIGHT),ji=H.getParameter(H.UNPACK_SKIP_PIXELS),Mn=H.getParameter(H.UNPACK_SKIP_ROWS),ss=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,We.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,We.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Kt),H.pixelStorei(H.UNPACK_SKIP_ROWS,ee),H.pixelStorei(H.UNPACK_SKIP_IMAGES,jt);const ge=A.isDataArrayTexture||A.isData3DTexture,Pn=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const Hn=Wt.get(A),gn=Wt.get(X),rn=Wt.get(Hn.__renderTarget),Gs=Wt.get(gn.__renderTarget);qt.bindFramebuffer(H.READ_FRAMEBUFFER,rn.__webglFramebuffer),qt.bindFramebuffer(H.DRAW_FRAMEBUFFER,Gs.__webglFramebuffer);for(let Bi=0;Bi<Ot;Bi++)ge&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Wt.get(A).__webglTexture,q,jt+Bi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Wt.get(X).__webglTexture,vt,Ye+Bi)),H.blitFramebuffer(Kt,ee,Ut,Pt,xe,Re,Ut,Pt,H.DEPTH_BUFFER_BIT,H.NEAREST);qt.bindFramebuffer(H.READ_FRAMEBUFFER,null),qt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(q!==0||A.isRenderTargetTexture||Wt.has(A)){const Hn=Wt.get(A),gn=Wt.get(X);qt.bindFramebuffer(H.READ_FRAMEBUFFER,rl),qt.bindFramebuffer(H.DRAW_FRAMEBUFFER,as);for(let rn=0;rn<Ot;rn++)ge?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Hn.__webglTexture,q,jt+rn):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Hn.__webglTexture,q),Pn?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,gn.__webglTexture,vt,Ye+rn):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,gn.__webglTexture,vt),q!==0?H.blitFramebuffer(Kt,ee,Ut,Pt,xe,Re,Ut,Pt,H.COLOR_BUFFER_BIT,H.NEAREST):Pn?H.copyTexSubImage3D(cn,vt,xe,Re,Ye+rn,Kt,ee,Ut,Pt):H.copyTexSubImage2D(cn,vt,xe,Re,Kt,ee,Ut,Pt);qt.bindFramebuffer(H.READ_FRAMEBUFFER,null),qt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Pn?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(cn,vt,xe,Re,Ye,Ut,Pt,Ot,le,Ht,We.data):X.isCompressedArrayTexture?H.compressedTexSubImage3D(cn,vt,xe,Re,Ye,Ut,Pt,Ot,le,We.data):H.texSubImage3D(cn,vt,xe,Re,Ye,Ut,Pt,Ot,le,Ht,We):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,vt,xe,Re,Ut,Pt,le,Ht,We.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,vt,xe,Re,We.width,We.height,le,We.data):H.texSubImage2D(H.TEXTURE_2D,vt,xe,Re,Ut,Pt,le,Ht,We);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ce),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Fn),H.pixelStorei(H.UNPACK_SKIP_PIXELS,ji),H.pixelStorei(H.UNPACK_SKIP_ROWS,Mn),H.pixelStorei(H.UNPACK_SKIP_IMAGES,ss),vt===0&&X.generateMipmaps&&H.generateMipmap(cn),qt.unbindTexture()},this.copyTextureToTexture3D=function(A,X,st=null,rt=null,q=0){return A.isTexture!==!0&&(Pr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),st=arguments[0]||null,rt=arguments[1]||null,A=arguments[2],X=arguments[3],q=arguments[4]||0),Pr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,st,rt,q)},this.initRenderTarget=function(A){Wt.get(A).__webglFramebuffer===void 0&&L.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?L.setTextureCube(A,0):A.isData3DTexture?L.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?L.setTexture2DArray(A,0):L.setTexture2D(A,0),qt.unbindTexture()},this.resetState=function(){V=0,P=0,W=null,qt.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ya}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=Ue._getDrawingBufferColorSpace(t),i.unpackColorSpace=Ue._getUnpackColorSpace()}}const cv={type:"change"},dp={type:"start"},ey={type:"end"},Gc=new al,uv=new Vi,Z1=Math.cos(70*Kc.DEG2RAD),vn=new F,Qn=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},td=1e-6;class K1 extends fE{constructor(t,i=null){super(t,i),this.state=ke.NONE,this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ir.ROTATE,MIDDLE:Ir.DOLLY,RIGHT:Ir.PAN},this.touches={ONE:zr.ROTATE,TWO:zr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Nn,this._lastTargetPosition=new F,this._quat=new Nn().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new B0,this._sphericalDelta=new B0,this._scale=1,this._panOffset=new F,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new F,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=J1.bind(this),this._onPointerDown=Q1.bind(this),this._onPointerUp=$1.bind(this),this._onContextMenu=rR.bind(this),this._onMouseWheel=nR.bind(this),this._onKeyDown=iR.bind(this),this._onTouchStart=aR.bind(this),this._onTouchMove=sR.bind(this),this._onMouseDown=tR.bind(this),this._onMouseMove=eR.bind(this),this._interceptControlDown=oR.bind(this),this._interceptControlUp=lR.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cv),this.update(),this.state=ke.NONE}update(t=null){const i=this.object.position;vn.copy(i).sub(this.target),vn.applyQuaternion(this._quat),this._spherical.setFromVector3(vn),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Qn:s>Math.PI&&(s-=Qn),l<-Math.PI?l+=Qn:l>Math.PI&&(l-=Qn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(vn.setFromSpherical(this._spherical),vn.applyQuaternion(this._quatInverse),i.copy(this.target).add(vn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=vn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new F(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new F(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=vn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Gc.origin.copy(this.object.position),Gc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gc.direction))<Z1?this.object.lookAt(this.target):(uv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gc.intersectPlane(uv,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>td||8*(1-this._lastQuaternion.dot(this.object.quaternion))>td||this._lastTargetPosition.distanceToSquared(this.target)>td?(this.dispatchEvent(cv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Qn/60*this.autoRotateSpeed*t:Qn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){vn.setFromMatrixColumn(i,0),vn.multiplyScalar(-t),this._panOffset.add(vn)}_panUp(t,i){this.screenSpacePanning===!0?vn.setFromMatrixColumn(i,1):(vn.setFromMatrixColumn(i,0),vn.crossVectors(this.object.up,vn)),vn.multiplyScalar(t),this._panOffset.add(vn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;vn.copy(l).sub(this.target);let c=vn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Qn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new re,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function Q1(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function J1(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function $1(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ey),this.state=ke.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function tR(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ir.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ke.DOLLY;break;case Ir.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ke.ROTATE}break;case Ir.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(dp)}function eR(r){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function nR(r){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(r.preventDefault(),this.dispatchEvent(dp),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(ey))}function iR(r){this.enabled!==!1&&this._handleKeyDown(r)}function aR(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case zr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ke.TOUCH_ROTATE;break;case zr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case zr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ke.TOUCH_DOLLY_PAN;break;case zr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(dp)}function sR(r){switch(this._trackPointer(r),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ke.NONE}}function rR(r){this.enabled!==!1&&r.preventDefault()}function oR(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lR(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Te={c:null,u:[new F,new F,new F],e:[]},Ne={c:null,u:[new F,new F,new F],e:[]},tn=[[],[],[]],ae=[[],[],[]],Ke=[],Cs=new F,ws=new F,Ds=new F,yn=new F,fv=new F,hv=new F,Li=new se,dv=new Wi,Vc=new Xe,pv=new Xe,mv=new al;class ny{constructor(t=new F,i=new F,s=new se){this.center=t,this.halfSize=i,this.rotation=s}set(t,i,s){return this.center=t,this.halfSize=i,this.rotation=s,this}copy(t){return this.center.copy(t.center),this.halfSize.copy(t.halfSize),this.rotation.copy(t.rotation),this}clone(){return new this.constructor().copy(this)}getSize(t){return t.copy(this.halfSize).multiplyScalar(2)}clampPoint(t,i){const s=this.halfSize;yn.subVectors(t,this.center),this.rotation.extractBasis(Cs,ws,Ds),i.copy(this.center);const l=Kc.clamp(yn.dot(Cs),-s.x,s.x);i.add(Cs.multiplyScalar(l));const c=Kc.clamp(yn.dot(ws),-s.y,s.y);i.add(ws.multiplyScalar(c));const h=Kc.clamp(yn.dot(Ds),-s.z,s.z);return i.add(Ds.multiplyScalar(h)),i}containsPoint(t){return yn.subVectors(t,this.center),this.rotation.extractBasis(Cs,ws,Ds),Math.abs(yn.dot(Cs))<=this.halfSize.x&&Math.abs(yn.dot(ws))<=this.halfSize.y&&Math.abs(yn.dot(Ds))<=this.halfSize.z}intersectsBox3(t){return this.intersectsOBB(cR.fromBox3(t))}intersectsSphere(t){return this.clampPoint(t.center,hv),hv.distanceToSquared(t.center)<=t.radius*t.radius}intersectsOBB(t,i=Number.EPSILON){Te.c=this.center,Te.e[0]=this.halfSize.x,Te.e[1]=this.halfSize.y,Te.e[2]=this.halfSize.z,this.rotation.extractBasis(Te.u[0],Te.u[1],Te.u[2]),Ne.c=t.center,Ne.e[0]=t.halfSize.x,Ne.e[1]=t.halfSize.y,Ne.e[2]=t.halfSize.z,t.rotation.extractBasis(Ne.u[0],Ne.u[1],Ne.u[2]);for(let c=0;c<3;c++)for(let h=0;h<3;h++)tn[c][h]=Te.u[c].dot(Ne.u[h]);yn.subVectors(Ne.c,Te.c),Ke[0]=yn.dot(Te.u[0]),Ke[1]=yn.dot(Te.u[1]),Ke[2]=yn.dot(Te.u[2]);for(let c=0;c<3;c++)for(let h=0;h<3;h++)ae[c][h]=Math.abs(tn[c][h])+i;let s,l;for(let c=0;c<3;c++)if(s=Te.e[c],l=Ne.e[0]*ae[c][0]+Ne.e[1]*ae[c][1]+Ne.e[2]*ae[c][2],Math.abs(Ke[c])>s+l)return!1;for(let c=0;c<3;c++)if(s=Te.e[0]*ae[0][c]+Te.e[1]*ae[1][c]+Te.e[2]*ae[2][c],l=Ne.e[c],Math.abs(Ke[0]*tn[0][c]+Ke[1]*tn[1][c]+Ke[2]*tn[2][c])>s+l)return!1;return s=Te.e[1]*ae[2][0]+Te.e[2]*ae[1][0],l=Ne.e[1]*ae[0][2]+Ne.e[2]*ae[0][1],!(Math.abs(Ke[2]*tn[1][0]-Ke[1]*tn[2][0])>s+l||(s=Te.e[1]*ae[2][1]+Te.e[2]*ae[1][1],l=Ne.e[0]*ae[0][2]+Ne.e[2]*ae[0][0],Math.abs(Ke[2]*tn[1][1]-Ke[1]*tn[2][1])>s+l)||(s=Te.e[1]*ae[2][2]+Te.e[2]*ae[1][2],l=Ne.e[0]*ae[0][1]+Ne.e[1]*ae[0][0],Math.abs(Ke[2]*tn[1][2]-Ke[1]*tn[2][2])>s+l)||(s=Te.e[0]*ae[2][0]+Te.e[2]*ae[0][0],l=Ne.e[1]*ae[1][2]+Ne.e[2]*ae[1][1],Math.abs(Ke[0]*tn[2][0]-Ke[2]*tn[0][0])>s+l)||(s=Te.e[0]*ae[2][1]+Te.e[2]*ae[0][1],l=Ne.e[0]*ae[1][2]+Ne.e[2]*ae[1][0],Math.abs(Ke[0]*tn[2][1]-Ke[2]*tn[0][1])>s+l)||(s=Te.e[0]*ae[2][2]+Te.e[2]*ae[0][2],l=Ne.e[0]*ae[1][1]+Ne.e[1]*ae[1][0],Math.abs(Ke[0]*tn[2][2]-Ke[2]*tn[0][2])>s+l)||(s=Te.e[0]*ae[1][0]+Te.e[1]*ae[0][0],l=Ne.e[1]*ae[2][2]+Ne.e[2]*ae[2][1],Math.abs(Ke[1]*tn[0][0]-Ke[0]*tn[1][0])>s+l)||(s=Te.e[0]*ae[1][1]+Te.e[1]*ae[0][1],l=Ne.e[0]*ae[2][2]+Ne.e[2]*ae[2][0],Math.abs(Ke[1]*tn[0][1]-Ke[0]*tn[1][1])>s+l)||(s=Te.e[0]*ae[1][2]+Te.e[1]*ae[0][2],l=Ne.e[0]*ae[2][1]+Ne.e[1]*ae[2][0],Math.abs(Ke[1]*tn[0][2]-Ke[0]*tn[1][2])>s+l))}intersectsPlane(t){this.rotation.extractBasis(Cs,ws,Ds);const i=this.halfSize.x*Math.abs(t.normal.dot(Cs))+this.halfSize.y*Math.abs(t.normal.dot(ws))+this.halfSize.z*Math.abs(t.normal.dot(Ds)),s=t.normal.dot(this.center)-t.constant;return Math.abs(s)<=i}intersectRay(t,i){return this.getSize(fv),dv.setFromCenterAndSize(yn.set(0,0,0),fv),Vc.setFromMatrix3(this.rotation),Vc.setPosition(this.center),pv.copy(Vc).invert(),mv.copy(t).applyMatrix4(pv),mv.intersectBox(dv,i)?i.applyMatrix4(Vc):null}intersectsRay(t){return this.intersectRay(t,yn)!==null}fromBox3(t){return t.getCenter(this.center),t.getSize(this.halfSize).multiplyScalar(.5),this.rotation.identity(),this}equals(t){return t.center.equals(this.center)&&t.halfSize.equals(this.halfSize)&&t.rotation.equals(this.rotation)}applyMatrix4(t){const i=t.elements;let s=yn.set(i[0],i[1],i[2]).length();const l=yn.set(i[4],i[5],i[6]).length(),c=yn.set(i[8],i[9],i[10]).length();t.determinant()<0&&(s=-s),Li.setFromMatrix4(t);const d=1/s,m=1/l,p=1/c;return Li.elements[0]*=d,Li.elements[1]*=d,Li.elements[2]*=d,Li.elements[3]*=m,Li.elements[4]*=m,Li.elements[5]*=m,Li.elements[6]*=p,Li.elements[7]*=p,Li.elements[8]*=p,this.rotation.multiply(Li),this.halfSize.x*=s,this.halfSize.y*=l,this.halfSize.z*=c,yn.setFromMatrixPosition(t),this.center.add(yn),this}}const cR=new ny,iy="/vex-build-center/";async function uR(){const r=await fetch(`${iy}parts/manifest.json`,{cache:"force-cache"});if(!r.ok)throw new Error("Could not load the parts library.");return r.json()}function ed(r){const t=atob(r),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}const gv=new Map;function kc(r){const t=gv.get(r.id);if(t)return t;const i=(async()=>{if(r.primitive==="box"){const[c,h,d]=r.sizeMM,m=new Kr(c,h,d);return m.computeBoundingBox(),m}const s=await(await fetch(`${iy}parts/${r.id}.json`,{cache:"force-cache"})).json(),l=new fi;return l.setAttribute("position",new Xn(new Float32Array(ed(s.position).buffer),3)),s.normal&&l.setAttribute("normal",new Xn(new Float32Array(ed(s.normal).buffer),3)),l.setIndex(new Xn(new Uint32Array(ed(s.index).buffer),1)),s.normal||l.computeVertexNormals(),l.computeBoundingBox(),l})();return gv.set(r.id,i),i}const nd={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"},fR={beam:"Beams",plate:"Plates",pin:"Pins",standoff:"Standoffs",corner:"Corners",gear:"Gears",wheel:"Wheels",shaft:"Shafts",spacer:"Spacers",motor:"Motors",brain:"Brain & Battery",sensor:"Sensors"},hR=["beam","plate","corner","pin","standoff","gear","wheel","shaft","spacer","motor","sensor","brain"],ay=12.7,Jd=[[1,0,0],[0,1,0],[0,0,1]],dR=["beam","plate","standoff","corner","gear","wheel"];function pR(r){return r.holes&&r.holes.length>0||dR.includes(r.category)}function mR(r,t){const i=t.findIndex(c=>c!==0),s=[0,1,2].filter(c=>c!==i),l=r.sizeMM[s[0]]>=r.sizeMM[s[1]]?s[0]:s[1];return Jd[l]}const id=r=>Math.max(1,Math.round(r/ay)),ad=(r,t)=>(r-(t-1)/2)*ay;function gR(r){if(r.holes&&r.holes.length){const p=r.holes.filter(g=>g.kind==="hole"||g.kind==="stud");if(p.length){const g=new Map;return p.map(_=>{const S=_.axis.findIndex(y=>y!==0),M=[0,1,2].filter(y=>y!==S),E=_.kind==="stud"?`s:${_.p.map(y=>Math.round(y)).join(",")}`:`h:${S}:${Math.round(_.p[M[0]])}:${Math.round(_.p[M[1]])}`;let R=g.get(E);R===void 0&&(R=g.size,g.set(E,R));const x=_.kind==="stud"?"stud":"hole";return{p:_.p,axis:_.axis,tan:mR(r,_.axis),kind:x,core:R}})}}const t=r.sizeMM,i=[0,1,2].sort((p,g)=>t[p]-t[g]),s=i[0],l=i[1],c=i[2],h=[];let d=0;const m=(p,g,_)=>{const S=t[g]/2,M=Jd[g],E=Jd[_],R=[...p];R[g]+=S;const x=[...p];x[g]-=S;const y=d++;h.push({p:R,axis:M,tan:E,kind:"hole",core:y}),h.push({p:x,axis:[-M[0],-M[1],-M[2]],tan:E,kind:"hole",core:y})};if(r.category==="beam"){const p=id(t[c]);for(let g=0;g<p;g++)m([0,0,0].map((_,S)=>S===c?ad(g,p):0),s,c)}else if(r.category==="plate"||r.category==="corner"){const p=id(t[c]),g=id(t[l]);for(let _=0;_<p;_++)for(let S=0;S<g;S++){const M=[0,0,0];M[c]=ad(_,p),M[l]=ad(S,g),m(M,s,c)}}else r.category==="standoff"?m([0,0,0],c,l):(r.category==="gear"||r.category==="wheel")&&m([0,0,0],s,c);return h}const sy=12.7,au=sy/2,sd=1,Xc=r=>Math.round(r/au)*au,rd=new Set(["pin","shaft"]),_v=r=>r.startsWith("pin-connector-0x")||r.startsWith("pin-sheet");let od=1;const su=class su{constructor(t){Jt(this,"scene",new QM);Jt(this,"camera");Jt(this,"renderer");Jt(this,"controls");Jt(this,"onChange",()=>{});Jt(this,"onConnect",()=>{});Jt(this,"onPartMenu",()=>{});Jt(this,"onArmChange",()=>{});Jt(this,"occupied",new Set);Jt(this,"headAxisCache",new Map);Jt(this,"disabledPins",new Set);Jt(this,"pinLinks",new Map);Jt(this,"adj",new Map);Jt(this,"studJoins",[]);Jt(this,"colliding",new Set);Jt(this,"obbCache",new Map);Jt(this,"dragGroup",[]);Jt(this,"dragGrabStart",new F);Jt(this,"container");Jt(this,"raycaster",new lE);Jt(this,"pointer",new re);Jt(this,"parts",new Map);Jt(this,"selected",null);Jt(this,"helper",null);Jt(this,"markers",[]);Jt(this,"discGeo",new iu(2.6,20));Jt(this,"markerMat",new tl({color:1614079,transparent:!0,opacity:.6,depthTest:!0,depthWrite:!1,side:Ei}));Jt(this,"markerHotMat",new tl({color:16756768,transparent:!0,opacity:.95,depthTest:!0,depthWrite:!1,side:Ei}));Jt(this,"studGeo",new iu(3.1,20));Jt(this,"studMat",new tl({color:15769632,transparent:!0,opacity:.75,depthTest:!0,depthWrite:!1,side:Ei}));Jt(this,"hovered",null);Jt(this,"markersVisible",!0);Jt(this,"armed",null);Jt(this,"emptyDown",null);Jt(this,"connectFrom",null);Jt(this,"connectLine");Jt(this,"movedDuringDrag",!1);Jt(this,"ground");Jt(this,"dragging",!1);Jt(this,"dragPlane",new Vi);Jt(this,"dragOffset",new F);Jt(this,"hit",new F);Jt(this,"raf",0);Jt(this,"ro");Jt(this,"onContextMenu",t=>{t.preventDefault(),this.setPointer(t);const i=this.raycaster.intersectObjects([...this.parts.values()].map(s=>s.mesh),!1);for(const s of i){const l=this.parts.get(s.object.userData.uid);if(l&&rd.has(l.meta.category)){this.onPartMenu({uid:l.uid,name:l.meta.name,disabled:this.disabledPins.has(l.uid),screen:{x:t.clientX,y:t.clientY}});return}}});Jt(this,"onPointerDown",t=>{if(t.button!==0)return;if(this.setPointer(t),this.markersVisible){const l=this.raycaster.intersectObjects(this.visibleMarkers(),!1);if(l.length){this.connectFrom=l[0].object,this.movedDuringDrag=!1,this.controls.enabled=!1,this.setHot(this.connectFrom,!0),this.connectLine.visible=!0,this.updateConnectLine(this.worldOf(this.connectFrom)),t.stopPropagation();return}}const i=[...this.parts.values()].map(l=>l.mesh),s=this.raycaster.intersectObjects(i,!1);if(s.length){const l=this.parts.get(s[0].object.userData.uid)||null;this.select(l),this.emit(),this.dragging=!0,this.controls.enabled=!1,this.dragPlane.setFromNormalAndCoplanarPoint(new F(0,1,0),s[0].point),this.dragOffset.copy(s[0].point).sub(l.mesh.position),this.dragGrabStart.copy(l.mesh.position),this.dragGroup=[...this.componentOf(l.uid)].map(c=>this.parts.get(c)).filter(Boolean).map(c=>({mesh:c.mesh,start:c.mesh.position.clone()})),t.stopPropagation()}else this.emptyDown={x:t.clientX,y:t.clientY}});Jt(this,"onPointerMove",t=>{var i,s;if(this.setPointer(t),this.connectFrom){this.movedDuringDrag=!0;const l=this.markerUnderPointer(this.connectFrom);l!==this.hovered&&(this.hovered&&this.hovered!==this.connectFrom&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.hovered=l,l&&this.setHot(l,!0));const c=this.worldOf(this.connectFrom);this.updateConnectLine(c,l?this.worldOf(l):this.pointerOnPlane(c));return}if(this.dragging&&this.selected){if(this.raycaster.ray.intersectPlane(this.dragPlane,this.hit)){const l=Xc(this.hit.x-this.dragOffset.x)-this.dragGrabStart.x,c=Xc(this.hit.z-this.dragOffset.z)-this.dragGrabStart.z;for(const h of this.dragGroup)h.mesh.position.set(h.start.x+l,h.start.y,h.start.z+c),h.mesh.updateMatrixWorld(!0);(i=this.helper)==null||i.update()}return}if(this.markersVisible){const l=((s=this.raycaster.intersectObjects(this.visibleMarkers(),!1)[0])==null?void 0:s.object)||null;l!==this.hovered&&(this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.hovered=l,l&&this.setHot(l,!0))}});Jt(this,"onPointerUp",t=>{if(this.connectFrom){const i=this.connectFrom,s=i.userData.holeRef,l=this.hovered&&this.hovered!==i?this.hovered:null,c=l?l.userData.holeRef:null,h=c&&c.partUid!==s.partUid?c:null,d=!this.movedDuringDrag,m={x:t.clientX,y:t.clientY};if(i!==this.armed&&this.setHot(i,!1),this.hovered&&this.hovered!==this.armed&&this.setHot(this.hovered,!1),this.connectLine.visible=!1,this.controls.enabled=!0,this.connectFrom=null,this.hovered=null,h){this.clearArm(),this.pairUp(i,l,m);return}if(!d)return;if(!this.armed){this.setArm(i);return}const p=this.armed,g=p.userData.holeRef,_=g.partUid===s.partUid&&g.holeIndex===s.holeIndex;this.clearArm(),_?this.isStud(i)||this.onConnect({from:s,to:null,depth:this.stackAtHole(s),screen:m}):g.partUid!==s.partUid?this.pairUp(p,i,m):this.setArm(i);return}if(this.dragging){this.dragging=!1,this.controls.enabled=!0,this.emit();return}if(this.emptyDown){const i=Math.hypot(t.clientX-this.emptyDown.x,t.clientY-this.emptyDown.y);this.emptyDown=null,i<4&&(this.clearArm(),this.selected&&(this.select(null),this.emit()))}});Jt(this,"animate",()=>{this.raf=requestAnimationFrame(this.animate),this.controls.update(),this.cullMarkers(),this.renderer.render(this.scene,this.camera)});this.container=t;const i=t.clientWidth||800,s=t.clientHeight||600;this.scene.background=new he("#eaeef4"),this.scene.fog=new up(15396596,900,2e3),this.camera=new Mi(45,i/s,1,6e3),this.camera.position.set(220,190,260),this.renderer=new j1({antialias:!0}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=xv,t.appendChild(this.renderer.domElement),this.controls=new K1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.target.set(0,25,0),this.controls.maxPolarAngle=Math.PI*.495,this.controls.minDistance=60,this.controls.maxDistance=1600,this.scene.add(new iE(16777215,10135478,.85));const l=new rE(16777215,1.15);l.position.set(160,260,180),l.castShadow=!0,l.shadow.mapSize.set(2048,2048);const c=l.shadow.camera;c.near=10,c.far=900,c.left=-350,c.right=350,c.top=350,c.bottom=-350,l.shadow.bias=-5e-4,this.scene.add(l);const h=sy*48,d=new cE(h,48,11122374,13687010);d.material.transparent=!0,d.material.opacity=.75,this.scene.add(d),this.ground=new Jn(new sl(h,h),new tE({opacity:.16})),this.ground.rotation.x=-Math.PI/2,this.ground.receiveShadow=!0,this.ground.name="ground",this.scene.add(this.ground),this.connectLine=new Wv(new fi().setFromPoints([new F,new F]),new lu({color:16756768,transparent:!0,opacity:.9,depthTest:!1})),this.connectLine.visible=!1,this.connectLine.renderOrder=999,this.scene.add(this.connectLine);const m=this.renderer.domElement;m.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),m.addEventListener("contextmenu",this.onContextMenu),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.animate()}async addPart(t){const i=await kc(t),s=t.color||nd[t.category]||"#6b7787",l=new Wh({color:s,metalness:.18,roughness:.55}),c=new Jn(i,l);c.castShadow=!0,c.receiveShadow=!0;const h=`p${od++}`;c.userData.uid=h;const d=this.parts.size%4*au;c.position.set(Xc(this.controls.target.x)+d,0,Xc(this.controls.target.z)+d),this.restOnGrid(c),this.scene.add(c);const m={uid:h,meta:t,mesh:c};this.parts.set(h,m),this.addMarkers(m),this.select(m),this.emit()}restOnGrid(t){t.updateMatrixWorld(!0);const i=t.geometry.boundingBox.clone().applyMatrix4(t.matrixWorld);t.position.y+=-i.min.y,t.position.y=Math.max(0,t.position.y),t.updateMatrixWorld(!0)}addMarkers(t){if(!pR(t.meta))return;const i=new F(0,0,1);gR(t.meta).forEach((s,l)=>{const c=s.kind==="stud",h=new Jn(c?this.studGeo:this.discGeo,c?this.studMat:this.markerMat),d=new F(s.axis[0],s.axis[1],s.axis[2]).normalize(),m=c?sd*1.6:sd;h.position.set(s.p[0]+d.x*m,s.p[1]+d.y*m,s.p[2]+d.z*m),h.quaternion.setFromUnitVectors(i,d),h.visible=this.markersVisible,h.userData.holeRef={partUid:t.uid,holeIndex:l},h.userData.localTan=s.tan,h.userData.kind=s.kind,h.userData.core=s.core,h.userData.proud=m,t.mesh.add(h),this.markers.push(h)})}setMarkersVisible(t){this.markersVisible=t;for(const i of this.markers)i.visible=t}select(t){this.selected=t,this.helper&&(this.scene.remove(this.helper),this.helper.geometry.dispose(),this.helper=null),t&&(this.helper=new uE(t.mesh,new he("#ffb020")),this.helper.material.linewidth=2,this.scene.add(this.helper))}selectByUid(t){this.select(t&&this.parts.get(t)||null),this.emit()}rotateSelected(t){var h;if(!this.selected)return;const i=[...this.componentOf(this.selected.uid)].map(d=>this.parts.get(d)).filter(Boolean);if(!i.length)return;const s=new Wi;for(const d of i)s.union(this.worldBox(d));const l=s.getCenter(new F),c=new Nn().setFromAxisAngle(new F(t==="x"?1:0,t==="y"?1:0,t==="z"?1:0),Math.PI/2);for(const d of i)d.mesh.position.sub(l).applyQuaternion(c).add(l),d.mesh.quaternion.premultiply(c),d.mesh.updateMatrixWorld(!0);(h=this.helper)==null||h.update(),this.emit()}nudgeSelectedY(t){var i;this.selected&&(this.selected.mesh.position.y=Math.max(0,this.selected.mesh.position.y+t*au),this.selected.mesh.updateMatrixWorld(!0),(i=this.helper)==null||i.update(),this.emit())}deleteSelected(){this.selected&&(this.removePart(this.selected),this.select(null),this.emit())}removePart(t){this.markers=this.markers.filter(i=>i.userData.holeRef.partUid!==t.uid),this.scene.remove(t.mesh),t.mesh.material.dispose(),this.parts.delete(t.uid),this.disabledPins.delete(t.uid)}clear(){for(const t of[...this.parts.values()])this.removePart(t);this.select(null),this.emit()}serialize(){return[...this.parts.values()].map(t=>({id:t.meta.id,p:[t.mesh.position.x,t.mesh.position.y,t.mesh.position.z],q:[t.mesh.quaternion.x,t.mesh.quaternion.y,t.mesh.quaternion.z,t.mesh.quaternion.w]}))}async load(t,i){this.clear();for(const s of t){const l=i.get(s.id);if(!l)continue;const c=await kc(l),h=l.color||nd[l.category]||"#6b7787",d=new Jn(c,new Wh({color:h,metalness:.18,roughness:.55}));d.castShadow=d.receiveShadow=!0;const m=`p${od++}`;d.userData.uid=m,d.position.set(s.p[0],s.p[1],s.p[2]),d.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]),d.updateMatrixWorld(!0),this.scene.add(d);const p={uid:m,meta:l,mesh:d};this.parts.set(m,p),this.addMarkers(p)}this.select(null),this.emit()}computeState(){var l,c,h;const t=new Wi;let i=0;for(const d of this.parts.values())d.mesh.updateMatrixWorld(!0),d.mesh.geometry.boundingBox&&t.union(d.mesh.geometry.boundingBox.clone().applyMatrix4(d.mesh.matrixWorld)),d.meta.isMotor&&i++;const s=this.parts.size?t.getSize(new F):new F;return{count:this.parts.size,selectedUid:((l=this.selected)==null?void 0:l.uid)??null,selectedName:((c=this.selected)==null?void 0:c.meta.name)??null,bboxMM:{w:+s.x.toFixed(1),h:+s.y.toFixed(1),d:+s.z.toFixed(1)},motors:i,canPivot:this.canPivot((h=this.selected)==null?void 0:h.uid),overlaps:this.colliding.size}}settleGroups(){const t=new Set;for(const i of this.parts.values()){if(t.has(i.uid))continue;const s=this.componentOf(i.uid);for(const h of s)t.add(h);const l=[...s].map(h=>this.parts.get(h)).filter(Boolean);if(!l.length)continue;let c=1/0;for(const h of l)c=Math.min(c,this.worldBox(h).min.y);if(!(!isFinite(c)||Math.abs(c)<.01))for(const h of l)h.mesh.position.y-=c,h.mesh.updateMatrixWorld(!0)}}emit(){var t;this.recomputeOccupancy(),this.settleGroups(),this.recomputeCollisions(),(t=this.helper)==null||t.update(),this.onChange(this.computeState())}setPointer(t){const i=this.renderer.domElement.getBoundingClientRect();this.pointer.set((t.clientX-i.left)/i.width*2-1,-((t.clientY-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}worldOf(t){return t.getWorldPosition(new F)}axisOf(t){return t.getWorldDirection(new F).normalize()}setHot(t,i){const s=t.userData.kind==="stud"?this.studMat:this.markerMat;t.material=i?this.markerHotMat:s,t.scale.setScalar(i?1.5:1)}isStud(t){return t.userData.kind==="stud"}markerFor(t){return this.markers.find(i=>{const s=i.userData.holeRef;return s.partUid===t.partUid&&s.holeIndex===t.holeIndex})||null}pairUp(t,i,s){const l=t.userData.holeRef,c=i.userData.holeRef,h=this.isStud(t),d=this.isStud(i);if(!(h&&d)){if(h||d){this.joinStud(h?l:c,h?c:l,l.partUid);return}this.onConnect({from:l,to:c,depth:this.connectionDepth(l,c),screen:s})}}setArm(t){this.armed=t,this.setHot(t,!0),this.onArmChange(!0)}clearArm(){this.armed&&this.setHot(this.armed,!1),this.armed=null,this.onArmChange(!1)}visibleMarkers(){return this.markers.filter(t=>t.visible)}markerUnderPointer(t){for(const i of this.raycaster.intersectObjects(this.visibleMarkers(),!1))if(i.object!==t)return i.object;return null}faceOf(t){return this.worldOf(t).addScaledVector(this.axisOf(t),-(t.userData.proud??sd))}tanOf(t){const i=new Nn;t.parent.getWorldQuaternion(i);const s=t.userData.localTan;return new F(s[0],s[1],s[2]).applyQuaternion(i).normalize()}pointerOnPlane(t){const i=this.camera.getWorldDirection(new F).negate(),s=new Vi().setFromNormalAndCoplanarPoint(i,t),l=new F;return this.raycaster.ray.intersectPlane(s,l)?l:t.clone()}updateConnectLine(t,i){const s=this.connectLine.geometry.attributes.position,l=i||t;s.setXYZ(0,t.x,t.y,t.z),s.setXYZ(1,l.x,l.y,l.z),s.needsUpdate=!0}extentAlong(t,i){const s=t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld).getSize(new F);return Math.abs(s.x*i.x)+Math.abs(s.y*i.y)+Math.abs(s.z*i.z)}longAxis(t){const i=t.sizeMM,s=i[0]>=i[1]&&i[0]>=i[2]?0:i[1]>=i[2]?1:2;return new F(s===0?1:0,s===1?1:0,s===2?1:0)}coreKey(t){return`${t.userData.holeRef.partUid}:${t.userData.core}`}headLocalAxis(t,i){const s=this.headAxisCache.get(t.id);if(s)return s.clone();const l=t.sizeMM,c=l[0]>=l[1]&&l[0]>=l[2]?0:l[1]>=l[2]?1:2,h=[0,1,2].filter(_=>_!==c),d=i.attributes.position.array;let m=0,p=0;for(let _=0;_<d.length;_+=3){const S=Math.hypot(d[_+h[0]],d[_+h[1]]);d[_+c]>0?m=Math.max(m,S):p=Math.max(p,S)}const g=new F().setComponent(c,m>=p?1:-1);return this.headAxisCache.set(t.id,g.clone()),g}alignGroupTo(t,i){const s=t.userData.holeRef.partUid,l=this.axisOf(t),c=this.tanOf(t),h=this.axisOf(i),d=this.tanOf(i),m=h.clone().negate(),p=d.clone(),g=new F().crossVectors(m,p).normalize(),_=l.clone(),S=c.clone(),M=new F().crossVectors(_,S).normalize(),E=new Nn().setFromRotationMatrix(new Xe().makeBasis(m,p,g)),R=new Nn().setFromRotationMatrix(new Xe().makeBasis(_,S,M)),x=E.multiply(R.invert()),y=[...this.componentOf(s)].map(U=>this.parts.get(U)).filter(Boolean),I=this.faceOf(t);for(const U of y)U.mesh.quaternion.premultiply(x),U.mesh.position.sub(I).applyQuaternion(x).add(I),U.mesh.updateMatrixWorld(!0);const O=this.faceOf(i).sub(this.faceOf(t));for(const U of y)U.mesh.position.add(O),U.mesh.updateMatrixWorld(!0)}joinStud(t,i,s){const l=this.markerFor(t),c=this.markerFor(i);if(!l||!c||this.occupied.has(this.coreKey(c))||this.occupied.has(this.coreKey(l)))return;const h=s===t.partUid?l:c;this.alignGroupTo(h,h===l?c:l),this.studJoins.push({studPart:t.partUid,studCore:this.coreKey(l),holePart:i.partUid,holeCore:this.coreKey(c)}),this.select(this.parts.get(s)||null),this.emit()}async connect(t,i,s){const l=this.markerFor(t);if(!l)return;const c=this.parts.get(t.partUid);if(!c||this.occupied.has(this.coreKey(l)))return;const h=await kc(s);if(i){const p=this.markerFor(i),g=this.parts.get(i.partUid);if(p&&g&&!this.occupied.has(this.coreKey(p))){this.alignGroupTo(l,p);const _=this.faceOf(p),S=this.axisOf(l);_v(s.id)?await this.addHeadedPin(s,h,_.clone().addScaledVector(S,-this.extentAlong(c,S)),S):await this.addCenteredConnector(s,_,S),this.select(c),this.emit();return}}const d=this.axisOf(l),m=this.faceOf(l);_v(s.id)?await this.addHeadedPin(s,h,m,d.clone().negate()):await this.addCenteredConnector(s,m,d),this.emit()}async addHeadedPin(t,i,s,l){const c=Math.max(...t.sizeMM)/2,h=new Nn().setFromUnitVectors(this.headLocalAxis(t,i),l.clone().negate());await this.addConnectorMesh(t,s.clone().addScaledVector(l,c),h)}async addCenteredConnector(t,i,s){await this.addConnectorMesh(t,i,new Nn().setFromUnitVectors(this.longAxis(t),s))}async addConnectorMesh(t,i,s){const l=await kc(t),c=new Jn(l,new Wh({color:nd[t.category]||"#e0a13a",metalness:.2,roughness:.5}));c.castShadow=c.receiveShadow=!0;const h=`p${od++}`;c.userData.uid=h,c.position.copy(i),c.quaternion.copy(s),c.updateMatrixWorld(!0),this.scene.add(c);const d={uid:h,meta:t,mesh:c};this.parts.set(h,d),this.addMarkers(d)}recomputeOccupancy(){this.occupied.clear(),this.pinLinks.clear(),this.adj.clear();const t=[...this.parts.values()].filter(l=>rd.has(l.meta.category)),i=new Map;for(const l of this.markers){if(this.isStud(l))continue;const c=this.coreKey(l);(i.get(c)||i.set(c,[]).get(c)).push(l)}const s=[...i.entries()].map(([l,c])=>{const h=new F;for(const d of c)h.add(d.getWorldPosition(new F));return{key:l,c:h.multiplyScalar(1/c.length),a:this.axisOf(c[0])}});for(const l of t){const c=this.longAxis(l.meta).applyQuaternion(l.mesh.getWorldQuaternion(new Nn)).normalize(),h=l.mesh.getWorldPosition(new F),d=this.extentAlong(l,c)/2+1.5,m=new Set;for(const p of s){if(Math.abs(p.a.dot(c))<.9)continue;const g=p.c.clone().sub(h),_=g.dot(c);Math.abs(_)>d||g.addScaledVector(c,-_).length()>3.5||(this.occupied.add(p.key),m.add(p.key.slice(0,p.key.lastIndexOf(":"))))}this.pinLinks.set(l.uid,m)}for(const[l,c]of this.pinLinks)if(!this.disabledPins.has(l))for(const h of c)this.link(l,h);this.studJoins=this.studJoins.filter(l=>this.parts.has(l.studPart)&&this.parts.has(l.holePart));for(const l of this.studJoins)this.occupied.add(l.holeCore),this.occupied.add(l.studCore),this.link(l.studPart,l.holePart);for(const l of this.markers)this.occupied.has(this.coreKey(l))&&(l.visible=!1)}link(t,i){(this.adj.get(t)||this.adj.set(t,new Set).get(t)).add(i),(this.adj.get(i)||this.adj.set(i,new Set).get(i)).add(t)}componentOf(t){const i=new Set([t]),s=[t];for(;s.length;){const l=s.pop();for(const c of this.adj.get(l)||[])i.has(c)||(i.add(c),s.push(c))}return i}setPinEnabled(t,i){const s=this.parts.get(t);if(!s)return;i?this.disabledPins.delete(t):this.disabledPins.add(t);const l=s.mesh.material;l.transparent=!i,l.opacity=i?1:.35,l.needsUpdate=!0,this.emit()}isPinDisabled(t){return this.disabledPins.has(t)}stackAt(t,i){const s=new Set,l=new Map;for(const c of this.markers){if(this.isStud(c))continue;const h=this.coreKey(c);(l.get(h)||l.set(h,[]).get(h)).push(c)}for(const[c,h]of l){const d=new F;for(const g of h)d.add(g.getWorldPosition(new F));if(d.multiplyScalar(1/h.length),Math.abs(this.axisOf(h[0]).dot(i))<.9)continue;const m=d.sub(t),p=m.dot(i);Math.abs(p)>45||m.addScaledVector(i,-p).length()>3.5||s.add(c.slice(0,c.lastIndexOf(":")))}return Math.max(1,s.size)}connectionDepth(t,i){const s=this.markerFor(t),l=this.markerFor(i);return!s||!l?2:this.stackAt(this.faceOf(s),this.axisOf(s))+this.stackAt(this.faceOf(l),this.axisOf(l))}stackAtHole(t){const i=this.markerFor(t);return i?this.stackAt(this.faceOf(i),this.axisOf(i)):1}pinsAdjacent(t){return[...this.adj.get(t)||[]].filter(i=>{const s=this.parts.get(i);return s&&rd.has(s.meta.category)})}canPivot(t){return!!t&&this.pinsAdjacent(t).length===1}componentWithout(t,i){const s=new Set([t]),l=[t];for(;l.length;){const c=l.pop();for(const h of this.adj.get(c)||[])h===i||s.has(h)||(s.add(h),l.push(h))}return s}worldBox(t){return t.mesh.updateMatrixWorld(!0),t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld)}obbWorld(t){let i=this.obbCache.get(t.meta.id);if(!i){const l=t.mesh.geometry.boundingBox,c=l.getSize(new F).multiplyScalar(.5),h=l.getCenter(new F);i=new ny(h,c),this.obbCache.set(t.meta.id,i.clone())}const s=i.clone();return s.halfSize.subScalar(su.COLLIDE_SLOP).max(new F(.1,.1,.1)),t.mesh.updateMatrixWorld(!0),s.applyMatrix4(t.mesh.matrixWorld)}setColliding(t,i){const s=t.mesh.material;s.emissive.setHex(i?15022389:0),s.emissiveIntensity=i?.55:1,s.needsUpdate=!0}recomputeCollisions(){var l;const t=[...this.parts.values()],i=new Map;for(const c of t)i.set(c.uid,this.obbWorld(c));const s=new Set;for(let c=0;c<t.length;c++)for(let h=c+1;h<t.length;h++){const d=t[c],m=t[h];(l=this.adj.get(d.uid))!=null&&l.has(m.uid)||i.get(d.uid).intersectsOBB(i.get(m.uid))&&(s.add(d.uid),s.add(m.uid))}for(const c of this.colliding)if(!s.has(c)){const h=this.parts.get(c);h&&this.setColliding(h,!1)}for(const c of s)if(!this.colliding.has(c)){const h=this.parts.get(c);h&&this.setColliding(h,!0)}this.colliding=s}pivotSelected(){var p;const t=this.selected;if(!t)return!1;const i=this.pinsAdjacent(t.uid);if(i.length!==1)return!1;const s=this.parts.get(i[0]),l=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Nn)).normalize(),c=s.mesh.getWorldPosition(new F),d=[...this.componentWithout(t.uid,s.uid)].map(g=>this.parts.get(g)).filter(Boolean),m=new Nn().setFromAxisAngle(l,Math.PI/2);for(const g of d)g.mesh.position.copy(g.mesh.position.clone().sub(c).applyQuaternion(m).add(c)),g.mesh.quaternion.premultiply(m),g.mesh.updateMatrixWorld(!0);return(p=this.helper)==null||p.update(),this.emit(),!0}deletePartByUid(t){const i=this.parts.get(t);i&&(this.selected===i&&this.select(null),this.removePart(i),this.emit())}async replaceConnector(t,i){const s=this.parts.get(t);if(!s)return;const l=s.mesh.getWorldPosition(new F),c=this.longAxis(s.meta).applyQuaternion(s.mesh.getWorldQuaternion(new Nn)).normalize();this.removePart(s),await this.addCenteredConnector(i,l,c),this.select(null),this.emit()}resize(){const t=this.container.clientWidth,i=this.container.clientHeight;!t||!i||(this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i))}cullMarkers(){if(!this.markersVisible||!this.markers.length)return;const t=this.camera.position,i=new F,s=new F,l=new F;for(const c of this.markers)c.getWorldPosition(i),c.getWorldDirection(s),l.subVectors(t,i),c.visible=c===this.armed||s.dot(l)>0&&!this.occupied.has(this.coreKey(c))}frameAll(){if(!this.parts.size){this.camera.position.set(220,190,260),this.controls.target.set(0,25,0);return}const t=new Wi;for(const l of this.parts.values())t.expandByObject(l.mesh);const i=t.getCenter(new F),s=t.getSize(new F).length()*.6+60;this.controls.target.copy(i),this.camera.position.set(i.x+s,i.y+s*.8,i.z+s)}dispose(){cancelAnimationFrame(this.raf);const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),t.removeEventListener("contextmenu",this.onContextMenu),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),this.ro.disconnect(),this.controls.dispose(),this.renderer.dispose(),t.remove()}};Jt(su,"COLLIDE_SLOP",1.4);let $d=su;const _R=25.4,vv="utg_vex_build",ld=r=>+(r/_R).toFixed(1),yv={w:11,h:15,d:11,motors:6};function vR(){const r=Ln.useRef(null),t=Ln.useRef(null),[i,s]=Ln.useState(null),[l,c]=Ln.useState({count:0,selectedUid:null,selectedName:null,bboxMM:{w:0,h:0,d:0},motors:0,canPivot:!1,overlaps:0}),[h,d]=Ln.useState(()=>{try{return{...yv,...JSON.parse(localStorage.getItem("utg_vex_limits")||"{}")}}catch{return yv}}),[m,p]=Ln.useState("Loading parts…"),[g,_]=Ln.useState(""),[S,M]=Ln.useState(null),[E,R]=Ln.useState(null),x=Ln.useMemo(()=>new Map(((i==null?void 0:i.parts)||[]).map(w=>[w.id,w])),[i]);Ln.useEffect(()=>{uR().then(s).catch(()=>_("The parts library failed to load."))},[]),Ln.useEffect(()=>{if(!i||!r.current)return;const w=new $d(r.current);return w.onChange=c,w.onConnect=M,w.onPartMenu=R,w.onArmChange=j=>p(j?"First hole picked — click another hole to connect, or click it again for a single connector. (Esc cancels)":"Pick a part on the left, or click a hole to start a connection."),t.current=w,p("Pick a part on the left to start building."),()=>{w.dispose(),t.current=null}},[i]),Ln.useEffect(()=>{localStorage.setItem("utg_vex_limits",JSON.stringify(h))},[h]),Ln.useEffect(()=>{const w=j=>{var mt;const et=t.current;et&&((mt=j.target)==null?void 0:mt.tagName)!=="INPUT"&&(j.key==="Delete"||j.key==="Backspace"?(j.preventDefault(),et.deleteSelected()):j.key==="r"||j.key==="R"?et.rotateSelected("y"):j.key==="x"||j.key==="X"?et.rotateSelected("x"):j.key==="z"||j.key==="Z"?et.rotateSelected("z"):j.key==="]"?et.nudgeSelectedY(1):j.key==="["?et.nudgeSelectedY(-1):j.key==="f"||j.key==="F"?et.frameAll():j.key==="Escape"&&(et.clearArm(),et.selectByUid(null),M(null),R(null)))};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[]);function y(w){var j;(j=t.current)==null||j.addPart(w),p(`Added ${w.name}. Drag to move · R to rotate · Del to remove.`)}function I(){var j;const w=((j=t.current)==null?void 0:j.serialize())||[];localStorage.setItem(vv,JSON.stringify(w)),p(`Saved your build (${w.length} parts) to this device.`)}async function O(){var w,j;try{const et=JSON.parse(localStorage.getItem(vv)||"[]");if(!et.length){p("No saved build on this device yet.");return}await((w=t.current)==null?void 0:w.load(et,x)),(j=t.current)==null||j.frameAll(),p(`Loaded your saved build (${et.length} parts).`)}catch{p("That saved build could not be opened.")}}function U(){var w;confirm("Clear the whole build?")&&((w=t.current)==null||w.clear(),p("Cleared. Start a new build."))}const J=Ln.useMemo(()=>{const w=new Map;for(const j of(i==null?void 0:i.parts)||[]){const et=w.get(j.category)||[];et.push(j),w.set(j.category,et)}return hR.filter(j=>w.has(j)).map(j=>({category:j,parts:w.get(j)}))},[i]),V=Ln.useMemo(()=>((i==null?void 0:i.parts)||[]).filter(w=>w.category==="pin"||w.category==="shaft"||w.category==="standoff"),[i]),P={w:ld(l.bboxMM.w),h:ld(l.bboxMM.h),d:ld(l.bboxMM.d)},W={w:P.w>h.w,h:P.h>h.h,d:P.d>h.d,motors:l.motors>h.motors},D=W.w||W.h||W.d||W.motors,C=!!l.selectedUid;return g?Tt.jsx("main",{className:"shell",children:Tt.jsx("div",{className:"fatal",children:g})}):Tt.jsxs("main",{className:"shell",children:[Tt.jsxs("header",{className:"topbar",children:[Tt.jsxs("a",{className:"brand",href:"../",children:[Tt.jsx("img",{src:"https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg",alt:"UTG Academy"}),Tt.jsx("span",{children:"VEX Build Center"})]}),Tt.jsxs("div",{className:"badges",children:[l.overlaps>0&&Tt.jsxs("div",{className:"legality warn",title:"Parts highlighted red are clipping into each other",children:["⚠ ",l.overlaps," part",l.overlaps===1?"":"s"," overlapping"]}),Tt.jsx("div",{className:`legality ${D?"bad":"good"}`,children:l.count?D?"Over the limits":"Within the limits":"Empty build"})]})]}),Tt.jsxs("div",{className:"workspace",children:[Tt.jsxs("aside",{className:"palette",children:[Tt.jsx("h2",{children:"Parts"}),!i&&Tt.jsx("p",{className:"muted",children:"Loading…"}),J.map(w=>Tt.jsxs("section",{className:"pal-group",children:[Tt.jsx("h3",{children:fR[w.category]}),Tt.jsx("div",{className:"pal-grid",children:w.parts.map(j=>Tt.jsxs("button",{className:"pal-item",onClick:()=>y(j),title:j.name,children:[Tt.jsx("span",{className:"pal-swatch",style:{background:ud(j)}}),Tt.jsx("span",{className:"pal-name",children:j.name})]},j.id))})]},w.category))]}),Tt.jsxs("div",{className:"stage",children:[Tt.jsx("div",{className:"canvas-host",ref:r}),Tt.jsx("div",{className:"stage-hint",children:"Click a hole then another to connect (or drag between them) · click the same hole twice for one connector · drag a part to move"})]}),Tt.jsxs("aside",{className:"inspector",children:[Tt.jsxs("section",{className:"card",children:[Tt.jsx("h3",{children:"Robot size"}),Tt.jsxs("div",{className:"dims",children:[Tt.jsx(cd,{label:"Width",mm:l.bboxMM.w,inV:P.w,limit:h.w,over:W.w,onLimit:w=>d({...h,w})}),Tt.jsx(cd,{label:"Height",mm:l.bboxMM.h,inV:P.h,limit:h.h,over:W.h,onLimit:w=>d({...h,h:w})}),Tt.jsx(cd,{label:"Depth",mm:l.bboxMM.d,inV:P.d,limit:h.d,over:W.d,onLimit:w=>d({...h,d:w})})]}),Tt.jsx("p",{className:"muted small",children:"Limits are in inches — set them to your season's rules."})]}),Tt.jsxs("section",{className:"card",children:[Tt.jsx("h3",{children:"Motors"}),Tt.jsxs("div",{className:`motor-row ${W.motors?"over":""}`,children:[Tt.jsx("span",{className:"motor-count",children:l.motors}),Tt.jsx("span",{className:"muted",children:"of"}),Tt.jsx("input",{type:"number",min:0,value:h.motors,onChange:w=>d({...h,motors:Math.max(0,+w.target.value||0)})}),Tt.jsx("span",{className:"muted",children:"max"})]})]}),Tt.jsxs("section",{className:"card",children:[Tt.jsx("h3",{children:"Selected part"}),C?Tt.jsxs(Tt.Fragment,{children:[Tt.jsx("p",{className:"sel-name",children:l.selectedName}),l.canPivot&&Tt.jsx("div",{className:"btn-row",children:Tt.jsx("button",{className:"pivot",onClick:()=>{var w;(w=t.current)==null||w.pivotSelected(),p("Pivoted 90° around the pin.")},children:"⟳ Pivot on pin 90°"})}),Tt.jsxs("div",{className:"btn-row",children:[Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("x")},children:"Rotate X"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("y")},children:"Rotate Y"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.rotateSelected("z")},children:"Rotate Z"})]}),Tt.jsxs("div",{className:"btn-row",children:[Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.nudgeSelectedY(1)},children:"Raise"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.nudgeSelectedY(-1)},children:"Lower"}),Tt.jsx("button",{className:"danger",onClick:()=>{var w;return(w=t.current)==null?void 0:w.deleteSelected()},children:"Delete"})]})]}):Tt.jsx("p",{className:"muted small",children:"Click a part in the scene to select it."})]}),Tt.jsxs("section",{className:"card",children:[Tt.jsxs("h3",{children:["Build · ",l.count," parts"]}),Tt.jsxs("div",{className:"btn-row",children:[Tt.jsx("button",{onClick:I,children:"Save"}),Tt.jsx("button",{onClick:O,children:"Load"}),Tt.jsx("button",{onClick:()=>{var w;return(w=t.current)==null?void 0:w.frameAll()},children:"Fit view"})]}),Tt.jsx("div",{className:"btn-row",children:Tt.jsx("button",{className:"danger",onClick:U,children:"Clear all"})})]})]})]}),S&&Tt.jsxs(Tt.Fragment,{children:[Tt.jsx("div",{className:"picker-scrim",onClick:()=>M(null)}),Tt.jsxs("div",{className:"picker",style:{left:Math.min(S.screen.x,window.innerWidth-210),top:Math.min(S.screen.y,window.innerHeight-260)},children:[Tt.jsx("div",{className:"picker-head",children:S.to?`Connect ${S.depth} stacked holes with…`:"Put in this hole…"}),Tt.jsx("div",{className:"picker-grid",children:V.filter(w=>w.category!=="pin"||yR(w)>=S.depth).map(w=>Tt.jsxs("button",{className:"picker-item",onClick:()=>{var j;(j=t.current)==null||j.connect(S.from,S.to,w),M(null),p(`Placed ${w.name}.`)},children:[Tt.jsx("span",{className:"pal-swatch",style:{background:ud(w)}}),w.name]},w.id))})]})]}),E&&Tt.jsxs(Tt.Fragment,{children:[Tt.jsx("div",{className:"picker-scrim",onClick:()=>R(null)}),Tt.jsxs("div",{className:"picker",style:{left:Math.min(E.screen.x,window.innerWidth-210),top:Math.min(E.screen.y,window.innerHeight-300)},children:[Tt.jsxs("div",{className:"picker-head",children:[E.name,E.disabled?" · disabled":""]}),Tt.jsx("button",{className:"picker-item",onClick:()=>{var w;(w=t.current)==null||w.setPinEnabled(E.uid,E.disabled),R(null),p(E.disabled?"Pin enabled — parts are stuck together.":"Pin disabled — you can pull the parts apart.")},children:E.disabled?"Enable (stick parts)":"Disable (release parts)"}),Tt.jsx("button",{className:"picker-item danger",onClick:()=>{var w;(w=t.current)==null||w.deletePartByUid(E.uid),R(null),p("Removed the pin.")},children:"Delete pin"}),Tt.jsx("div",{className:"picker-head",style:{paddingTop:8},children:"Replace with…"}),Tt.jsx("div",{className:"picker-grid",children:V.map(w=>Tt.jsxs("button",{className:"picker-item",onClick:()=>{var j;(j=t.current)==null||j.replaceConnector(E.uid,w),R(null),p(`Replaced with ${w.name}.`)},children:[Tt.jsx("span",{className:"pal-swatch",style:{background:ud(w)}}),w.name]},w.id))})]})]}),Tt.jsx("footer",{className:"statusbar",children:m})]})}function cd({label:r,mm:t,inV:i,limit:s,over:l,onLimit:c}){return Tt.jsxs("div",{className:`dim ${l?"over":""}`,children:[Tt.jsx("span",{className:"dim-label",children:r}),Tt.jsxs("span",{className:"dim-val",children:[i,Tt.jsx("small",{children:"in"})," ",Tt.jsxs("span",{className:"muted",children:["/ ",t,"mm"]})]}),Tt.jsxs("label",{className:"dim-limit",children:["≤ ",Tt.jsx("input",{type:"number",min:0,step:.5,value:s,onChange:h=>c(Math.max(0,+h.target.value||0))})," in"]})]})}function yR(r){return Math.round(Math.max(...r.sizeMM)/6.35)}function ud(r){const t={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"};return r.color||t[r.category]||"#6b7787"}Mx.createRoot(document.getElementById("root")).render(Tt.jsx(Ln.StrictMode,{children:Tt.jsx(vR,{})}));
