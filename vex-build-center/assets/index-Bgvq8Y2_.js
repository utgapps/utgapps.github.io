var Hy=Object.defineProperty;var Gy=(o,t,i)=>t in o?Hy(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var Te=(o,t,i)=>Gy(o,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var eh={exports:{}},Lo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D_;function Vy(){if(D_)return Lo;D_=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(s,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:c}}return Lo.Fragment=t,Lo.jsx=i,Lo.jsxs=i,Lo}var U_;function ky(){return U_||(U_=1,eh.exports=Vy()),eh.exports}var wt=ky(),nh={exports:{}},ee={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var L_;function Xy(){if(L_)return ee;L_=1;var o=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),y=Symbol.iterator;function M(L){return L===null||typeof L!="object"?null:(L=y&&L[y]||L["@@iterator"],typeof L=="function"?L:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,x={};function v(L,nt,yt){this.props=L,this.context=nt,this.refs=x,this.updater=yt||R}v.prototype.isReactComponent={},v.prototype.setState=function(L,nt){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,nt,"setState")},v.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function I(){}I.prototype=v.prototype;function N(L,nt,yt){this.props=L,this.context=nt,this.refs=x,this.updater=yt||R}var U=N.prototype=new I;U.constructor=N,w(U,v.prototype),U.isPureReactComponent=!0;var q=Array.isArray;function G(){}var P={H:null,A:null,T:null,S:null},K=Object.prototype.hasOwnProperty;function T(L,nt,yt){var Y=yt.ref;return{$$typeof:o,type:L,key:nt,ref:Y!==void 0?Y:null,props:yt}}function b(L,nt){return T(L.type,nt,L.props)}function B(L){return typeof L=="object"&&L!==null&&L.$$typeof===o}function lt(L){var nt={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(yt){return nt[yt]})}var rt=/\/+/g;function mt(L,nt){return typeof L=="object"&&L!==null&&L.key!=null?lt(""+L.key):nt.toString(36)}function gt(L){switch(L.status){case"fulfilled":return L.value;case"rejected":throw L.reason;default:switch(typeof L.status=="string"?L.then(G,G):(L.status="pending",L.then(function(nt){L.status==="pending"&&(L.status="fulfilled",L.value=nt)},function(nt){L.status==="pending"&&(L.status="rejected",L.reason=nt)})),L.status){case"fulfilled":return L.value;case"rejected":throw L.reason}}throw L}function O(L,nt,yt,Y,ct){var Et=typeof L;(Et==="undefined"||Et==="boolean")&&(L=null);var St=!1;if(L===null)St=!0;else switch(Et){case"bigint":case"string":case"number":St=!0;break;case"object":switch(L.$$typeof){case o:case t:St=!0;break;case _:return St=L._init,O(St(L._payload),nt,yt,Y,ct)}}if(St)return ct=ct(L),St=Y===""?"."+mt(L,0):Y,q(ct)?(yt="",St!=null&&(yt=St.replace(rt,"$&/")+"/"),O(ct,nt,yt,"",function(ne){return ne})):ct!=null&&(B(ct)&&(ct=b(ct,yt+(ct.key==null||L&&L.key===ct.key?"":(""+ct.key).replace(rt,"$&/")+"/")+St)),nt.push(ct)),1;St=0;var Gt=Y===""?".":Y+":";if(q(L))for(var Ft=0;Ft<L.length;Ft++)Y=L[Ft],Et=Gt+mt(Y,Ft),St+=O(Y,nt,yt,Et,ct);else if(Ft=M(L),typeof Ft=="function")for(L=Ft.call(L),Ft=0;!(Y=L.next()).done;)Y=Y.value,Et=Gt+mt(Y,Ft++),St+=O(Y,nt,yt,Et,ct);else if(Et==="object"){if(typeof L.then=="function")return O(gt(L),nt,yt,Y,ct);throw nt=String(L),Error("Objects are not valid as a React child (found: "+(nt==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":nt)+"). If you meant to render a collection of children, use an array instead.")}return St}function Q(L,nt,yt){if(L==null)return L;var Y=[],ct=0;return O(L,Y,"","",function(Et){return nt.call(yt,Et,ct++)}),Y}function Z(L){if(L._status===-1){var nt=L._result;nt=nt(),nt.then(function(yt){(L._status===0||L._status===-1)&&(L._status=1,L._result=yt)},function(yt){(L._status===0||L._status===-1)&&(L._status=2,L._result=yt)}),L._status===-1&&(L._status=0,L._result=nt)}if(L._status===1)return L._result.default;throw L._result}var xt=typeof reportError=="function"?reportError:function(L){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var nt=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof L=="object"&&L!==null&&typeof L.message=="string"?String(L.message):String(L),error:L});if(!window.dispatchEvent(nt))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",L);return}console.error(L)},Tt={map:Q,forEach:function(L,nt,yt){Q(L,function(){nt.apply(this,arguments)},yt)},count:function(L){var nt=0;return Q(L,function(){nt++}),nt},toArray:function(L){return Q(L,function(nt){return nt})||[]},only:function(L){if(!B(L))throw Error("React.Children.only expected to receive a single React element child.");return L}};return ee.Activity=S,ee.Children=Tt,ee.Component=v,ee.Fragment=i,ee.Profiler=l,ee.PureComponent=N,ee.StrictMode=s,ee.Suspense=m,ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=P,ee.__COMPILER_RUNTIME={__proto__:null,c:function(L){return P.H.useMemoCache(L)}},ee.cache=function(L){return function(){return L.apply(null,arguments)}},ee.cacheSignal=function(){return null},ee.cloneElement=function(L,nt,yt){if(L==null)throw Error("The argument must be a React element, but you passed "+L+".");var Y=w({},L.props),ct=L.key;if(nt!=null)for(Et in nt.key!==void 0&&(ct=""+nt.key),nt)!K.call(nt,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&nt.ref===void 0||(Y[Et]=nt[Et]);var Et=arguments.length-2;if(Et===1)Y.children=yt;else if(1<Et){for(var St=Array(Et),Gt=0;Gt<Et;Gt++)St[Gt]=arguments[Gt+2];Y.children=St}return T(L.type,ct,Y)},ee.createContext=function(L){return L={$$typeof:h,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null},L.Provider=L,L.Consumer={$$typeof:c,_context:L},L},ee.createElement=function(L,nt,yt){var Y,ct={},Et=null;if(nt!=null)for(Y in nt.key!==void 0&&(Et=""+nt.key),nt)K.call(nt,Y)&&Y!=="key"&&Y!=="__self"&&Y!=="__source"&&(ct[Y]=nt[Y]);var St=arguments.length-2;if(St===1)ct.children=yt;else if(1<St){for(var Gt=Array(St),Ft=0;Ft<St;Ft++)Gt[Ft]=arguments[Ft+2];ct.children=Gt}if(L&&L.defaultProps)for(Y in St=L.defaultProps,St)ct[Y]===void 0&&(ct[Y]=St[Y]);return T(L,Et,ct)},ee.createRef=function(){return{current:null}},ee.forwardRef=function(L){return{$$typeof:d,render:L}},ee.isValidElement=B,ee.lazy=function(L){return{$$typeof:_,_payload:{_status:-1,_result:L},_init:Z}},ee.memo=function(L,nt){return{$$typeof:p,type:L,compare:nt===void 0?null:nt}},ee.startTransition=function(L){var nt=P.T,yt={};P.T=yt;try{var Y=L(),ct=P.S;ct!==null&&ct(yt,Y),typeof Y=="object"&&Y!==null&&typeof Y.then=="function"&&Y.then(G,xt)}catch(Et){xt(Et)}finally{nt!==null&&yt.types!==null&&(nt.types=yt.types),P.T=nt}},ee.unstable_useCacheRefresh=function(){return P.H.useCacheRefresh()},ee.use=function(L){return P.H.use(L)},ee.useActionState=function(L,nt,yt){return P.H.useActionState(L,nt,yt)},ee.useCallback=function(L,nt){return P.H.useCallback(L,nt)},ee.useContext=function(L){return P.H.useContext(L)},ee.useDebugValue=function(){},ee.useDeferredValue=function(L,nt){return P.H.useDeferredValue(L,nt)},ee.useEffect=function(L,nt){return P.H.useEffect(L,nt)},ee.useEffectEvent=function(L){return P.H.useEffectEvent(L)},ee.useId=function(){return P.H.useId()},ee.useImperativeHandle=function(L,nt,yt){return P.H.useImperativeHandle(L,nt,yt)},ee.useInsertionEffect=function(L,nt){return P.H.useInsertionEffect(L,nt)},ee.useLayoutEffect=function(L,nt){return P.H.useLayoutEffect(L,nt)},ee.useMemo=function(L,nt){return P.H.useMemo(L,nt)},ee.useOptimistic=function(L,nt){return P.H.useOptimistic(L,nt)},ee.useReducer=function(L,nt,yt){return P.H.useReducer(L,nt,yt)},ee.useRef=function(L){return P.H.useRef(L)},ee.useState=function(L){return P.H.useState(L)},ee.useSyncExternalStore=function(L,nt,yt){return P.H.useSyncExternalStore(L,nt,yt)},ee.useTransition=function(){return P.H.useTransition()},ee.version="19.2.8",ee}var N_;function zd(){return N_||(N_=1,nh.exports=Xy()),nh.exports}var Un=zd(),ih={exports:{}},No={},ah={exports:{}},sh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O_;function Wy(){return O_||(O_=1,(function(o){function t(O,Q){var Z=O.length;O.push(Q);t:for(;0<Z;){var xt=Z-1>>>1,Tt=O[xt];if(0<l(Tt,Q))O[xt]=Q,O[Z]=Tt,Z=xt;else break t}}function i(O){return O.length===0?null:O[0]}function s(O){if(O.length===0)return null;var Q=O[0],Z=O.pop();if(Z!==Q){O[0]=Z;t:for(var xt=0,Tt=O.length,L=Tt>>>1;xt<L;){var nt=2*(xt+1)-1,yt=O[nt],Y=nt+1,ct=O[Y];if(0>l(yt,Z))Y<Tt&&0>l(ct,yt)?(O[xt]=ct,O[Y]=Z,xt=Y):(O[xt]=yt,O[nt]=Z,xt=nt);else if(Y<Tt&&0>l(ct,Z))O[xt]=ct,O[Y]=Z,xt=Y;else break t}}return Q}function l(O,Q){var Z=O.sortIndex-Q.sortIndex;return Z!==0?Z:O.id-Q.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;o.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],_=1,S=null,y=3,M=!1,R=!1,w=!1,x=!1,v=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function U(O){for(var Q=i(p);Q!==null;){if(Q.callback===null)s(p);else if(Q.startTime<=O)s(p),Q.sortIndex=Q.expirationTime,t(m,Q);else break;Q=i(p)}}function q(O){if(w=!1,U(O),!R)if(i(m)!==null)R=!0,G||(G=!0,lt());else{var Q=i(p);Q!==null&&gt(q,Q.startTime-O)}}var G=!1,P=-1,K=5,T=-1;function b(){return x?!0:!(o.unstable_now()-T<K)}function B(){if(x=!1,G){var O=o.unstable_now();T=O;var Q=!0;try{t:{R=!1,w&&(w=!1,I(P),P=-1),M=!0;var Z=y;try{e:{for(U(O),S=i(m);S!==null&&!(S.expirationTime>O&&b());){var xt=S.callback;if(typeof xt=="function"){S.callback=null,y=S.priorityLevel;var Tt=xt(S.expirationTime<=O);if(O=o.unstable_now(),typeof Tt=="function"){S.callback=Tt,U(O),Q=!0;break e}S===i(m)&&s(m),U(O)}else s(m);S=i(m)}if(S!==null)Q=!0;else{var L=i(p);L!==null&&gt(q,L.startTime-O),Q=!1}}break t}finally{S=null,y=Z,M=!1}Q=void 0}}finally{Q?lt():G=!1}}}var lt;if(typeof N=="function")lt=function(){N(B)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,mt=rt.port2;rt.port1.onmessage=B,lt=function(){mt.postMessage(null)}}else lt=function(){v(B,0)};function gt(O,Q){P=v(function(){O(o.unstable_now())},Q)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(O){O.callback=null},o.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):K=0<O?Math.floor(1e3/O):5},o.unstable_getCurrentPriorityLevel=function(){return y},o.unstable_next=function(O){switch(y){case 1:case 2:case 3:var Q=3;break;default:Q=y}var Z=y;y=Q;try{return O()}finally{y=Z}},o.unstable_requestPaint=function(){x=!0},o.unstable_runWithPriority=function(O,Q){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var Z=y;y=O;try{return Q()}finally{y=Z}},o.unstable_scheduleCallback=function(O,Q,Z){var xt=o.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?xt+Z:xt):Z=xt,O){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=Z+Tt,O={id:_++,callback:Q,priorityLevel:O,startTime:Z,expirationTime:Tt,sortIndex:-1},Z>xt?(O.sortIndex=Z,t(p,O),i(m)===null&&O===i(p)&&(w?(I(P),P=-1):w=!0,gt(q,Z-xt))):(O.sortIndex=Tt,t(m,O),R||M||(R=!0,G||(G=!0,lt()))),O},o.unstable_shouldYield=b,o.unstable_wrapCallback=function(O){var Q=y;return function(){var Z=y;y=Q;try{return O.apply(this,arguments)}finally{y=Z}}}})(sh)),sh}var P_;function qy(){return P_||(P_=1,ah.exports=Wy()),ah.exports}var rh={exports:{}},Cn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z_;function Yy(){if(z_)return Cn;z_=1;var o=zd();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var S=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:S==null?null:""+S,children:m,containerInfo:p,implementation:_}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Cn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Cn.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,_)},Cn.flushSync=function(m){var p=h.T,_=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=_,s.d.f()}},Cn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Cn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Cn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,S=d(_,p.crossOrigin),y=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:S,integrity:y,fetchPriority:M}):_==="script"&&s.d.X(m,{crossOrigin:S,integrity:y,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Cn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Cn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,S=d(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:S,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Cn.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Cn.requestFormReset=function(m){s.d.r(m)},Cn.unstable_batchedUpdates=function(m,p){return m(p)},Cn.useFormState=function(m,p,_){return h.H.useFormState(m,p,_)},Cn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Cn.version="19.2.8",Cn}var B_;function jy(){if(B_)return rh.exports;B_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),rh.exports=Yy(),rh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I_;function Zy(){if(I_)return No;I_=1;var o=qy(),t=zd(),i=jy();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(s(188));return n!==e?null:e}for(var a=e,r=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(r=u.return,r!==null){a=r;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),e;if(f===r)return m(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=u,r=f;else{for(var g=!1,E=u.child;E;){if(E===a){g=!0,a=u,r=f;break}if(E===r){g=!0,r=u,a=f;break}E=E.sibling}if(!g){for(E=f.child;E;){if(E===a){g=!0,a=f,r=u;break}if(E===r){g=!0,r=f,a=u;break}E=E.sibling}if(!g)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?e:n}function _(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=_(e),n!==null)return n;e=e.sibling}return null}var S=Object.assign,y=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),R=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),N=Symbol.for("react.context"),U=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),G=Symbol.for("react.suspense_list"),P=Symbol.for("react.memo"),K=Symbol.for("react.lazy"),T=Symbol.for("react.activity"),b=Symbol.for("react.memo_cache_sentinel"),B=Symbol.iterator;function lt(e){return e===null||typeof e!="object"?null:(e=B&&e[B]||e["@@iterator"],typeof e=="function"?e:null)}var rt=Symbol.for("react.client.reference");function mt(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===rt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case w:return"Fragment";case v:return"Profiler";case x:return"StrictMode";case q:return"Suspense";case G:return"SuspenseList";case T:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case R:return"Portal";case N:return e.displayName||"Context";case I:return(e._context.displayName||"Context")+".Consumer";case U:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case P:return n=e.displayName||null,n!==null?n:mt(e.type)||"Memo";case K:n=e._payload,e=e._init;try{return mt(e(n))}catch{}}return null}var gt=Array.isArray,O=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Z={pending:!1,data:null,method:null,action:null},xt=[],Tt=-1;function L(e){return{current:e}}function nt(e){0>Tt||(e.current=xt[Tt],xt[Tt]=null,Tt--)}function yt(e,n){Tt++,xt[Tt]=e.current,e.current=n}var Y=L(null),ct=L(null),Et=L(null),St=L(null);function Gt(e,n){switch(yt(Et,n),yt(ct,e),yt(Y,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?$g(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=$g(n),e=t_(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}nt(Y),yt(Y,e)}function Ft(){nt(Y),nt(ct),nt(Et)}function ne(e){e.memoizedState!==null&&yt(St,e);var n=Y.current,a=t_(n,e.type);n!==a&&(yt(ct,e),yt(Y,a))}function Oe(e){ct.current===e&&(nt(Y),nt(ct)),St.current===e&&(nt(St),Co._currentValue=Z)}var he,qe;function F(e){if(he===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);he=n&&n[1]||"",qe=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+he+e+qe}var An=!1;function fe(e,n){if(!e||An)return"";An=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var pt=function(){throw Error()};if(Object.defineProperty(pt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(pt,[])}catch(st){var tt=st}Reflect.construct(e,[],pt)}else{try{pt.call()}catch(st){tt=st}e.call(pt.prototype)}}else{try{throw Error()}catch(st){tt=st}(pt=e())&&typeof pt.catch=="function"&&pt.catch(function(){})}}catch(st){if(st&&tt&&typeof st.stack=="string")return[st.stack,tt.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),g=f[0],E=f[1];if(g&&E){var z=g.split(`
`),$=E.split(`
`);for(u=r=0;r<z.length&&!z[r].includes("DetermineComponentFrameRoot");)r++;for(;u<$.length&&!$[u].includes("DetermineComponentFrameRoot");)u++;if(r===z.length||u===$.length)for(r=z.length-1,u=$.length-1;1<=r&&0<=u&&z[r]!==$[u];)u--;for(;1<=r&&0<=u;r--,u--)if(z[r]!==$[u]){if(r!==1||u!==1)do if(r--,u--,0>u||z[r]!==$[u]){var ut=`
`+z[r].replace(" at new "," at ");return e.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",e.displayName)),ut}while(1<=r&&0<=u);break}}}finally{An=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?F(a):""}function _e(e,n){switch(e.tag){case 26:case 27:case 5:return F(e.type);case 16:return F("Lazy");case 13:return e.child!==n&&n!==null?F("Suspense Fallback"):F("Suspense");case 19:return F("SuspenseList");case 0:case 15:return fe(e.type,!1);case 11:return fe(e.type.render,!1);case 1:return fe(e.type,!0);case 31:return F("Activity");default:return""}}function qt(e){try{var n="",a=null;do n+=_e(e,a),a=e,e=e.return;while(e);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Ue=Object.prototype.hasOwnProperty,Wt=o.unstable_scheduleCallback,D=o.unstable_cancelCallback,A=o.unstable_shouldYield,et=o.unstable_requestPaint,ft=o.unstable_now,Mt=o.unstable_getCurrentPriorityLevel,dt=o.unstable_ImmediatePriority,kt=o.unstable_UserBlockingPriority,Ct=o.unstable_NormalPriority,zt=o.unstable_LowPriority,ve=o.unstable_IdlePriority,bt=o.log,Bt=o.unstable_setDisableYieldValue,Yt=null,Xt=null;function Nt(e){if(typeof bt=="function"&&Bt(e),Xt&&typeof Xt.setStrictMode=="function")try{Xt.setStrictMode(Yt,e)}catch{}}var Jt=Math.clz32?Math.clz32:V,ae=Math.log,Pe=Math.LN2;function V(e){return e>>>=0,e===0?32:31-(ae(e)/Pe|0)|0}var At=256,ot=262144,_t=4194304;function Rt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Dt(e,n,a){var r=e.pendingLanes;if(r===0)return 0;var u=0,f=e.suspendedLanes,g=e.pingedLanes;e=e.warmLanes;var E=r&134217727;return E!==0?(r=E&~f,r!==0?u=Rt(r):(g&=E,g!==0?u=Rt(g):a||(a=E&~e,a!==0&&(u=Rt(a))))):(E=r&~f,E!==0?u=Rt(E):g!==0?u=Rt(g):a||(a=r&~e,a!==0&&(u=Rt(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function $t(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Ye(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function un(){var e=_t;return _t<<=1,(_t&62914560)===0&&(_t=4194304),e}function Ee(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function yn(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function gi(e,n,a,r,u,f){var g=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var E=e.entanglements,z=e.expirationTimes,$=e.hiddenUpdates;for(a=g&~a;0<a;){var ut=31-Jt(a),pt=1<<ut;E[ut]=0,z[ut]=-1;var tt=$[ut];if(tt!==null)for($[ut]=null,ut=0;ut<tt.length;ut++){var st=tt[ut];st!==null&&(st.lane&=-536870913)}a&=~pt}r!==0&&Hr(e,r,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(g&~n))}function Hr(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var r=31-Jt(n);e.entangledLanes|=n,e.entanglements[r]=e.entanglements[r]|1073741824|a&261930}function Gr(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var r=31-Jt(a),u=1<<r;u&n|e[r]&n&&(e[r]|=n),a&=~u}}function Ci(e,n){var a=n&-n;return a=(a&42)!==0?1:Za(a),(a&(e.suspendedLanes|n))!==0?0:a}function Za(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ds(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Vr(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:E_(e.type))}function Ka(e,n){var a=Q.p;try{return Q.p=e,n()}finally{Q.p=a}}var _i=Math.random().toString(36).slice(2),Ke="__reactFiber$"+_i,xn="__reactProps$"+_i,Ii="__reactContainer$"+_i,kr="__reactEvents$"+_i,jc="__reactListeners$"+_i,Zc="__reactHandles$"+_i,qo="__reactResources$"+_i,Qa="__reactMarker$"+_i;function C(e){delete e[Ke],delete e[xn],delete e[kr],delete e[jc],delete e[Zc]}function k(e){var n=e[Ke];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Ii]||a[Ke]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=o_(e);e!==null;){if(a=e[Ke])return a;e=o_(e)}return n}e=a,a=e.parentNode}return null}function it(e){if(e=e[Ke]||e[Ii]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function at(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function X(e){var n=e[qo];return n||(n=e[qo]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vt(e){e[Qa]=!0}var Ut=new Set,Pt={};function Ot(e,n){Kt(e,n),Kt(e+"Capture",n)}function Kt(e,n){for(Pt[e]=n,e=0;e<n.length;e++)Ut.add(n[e])}var te=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jt={},Se={};function be(e){return Ue.call(Se,e)?!0:Ue.call(jt,e)?!1:te.test(e)?Se[e]=!0:(jt[e]=!0,!1)}function ke(e,n,a){if(be(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function Ge(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function se(e,n,a,r){if(r===null)e.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+r)}}function Ht(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function an(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ae(e,n,a){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var u=r.get,f=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(g){a=""+g,f.call(this,g)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Ln(e){if(!e._valueTracker){var n=an(e)?"checked":"value";e._valueTracker=Ae(e,n,""+e[n])}}function Fi(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return e&&(r=an(e)?e.checked?"true":"false":e.value),e=r,e!==a?(n.setValue(e),!0):!1}function gn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ja=/[\n"\\]/g;function de(e){return e.replace(Ja,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Rn(e,n,a,r,u,f,g,E){e.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?e.type=g:e.removeAttribute("type"),n!=null?g==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Ht(n)):e.value!==""+Ht(n)&&(e.value=""+Ht(n)):g!=="submit"&&g!=="reset"||e.removeAttribute("value"),n!=null?fn(e,g,Ht(n)):a!=null?fn(e,g,Ht(a)):r!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.name=""+Ht(E):e.removeAttribute("name")}function Nn(e,n,a,r,u,f,g,E){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Ln(e);return}a=a!=null?""+Ht(a):"",n=n!=null?""+Ht(n):a,E||n===e.value||(e.value=n),e.defaultValue=n}r=r??u,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=E?e.checked:!!r,e.defaultChecked=!!r,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(e.name=g),Ln(e)}function fn(e,n,a){n==="number"&&gn(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function tn(e,n,a,r){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&r&&(e[a].defaultSelected=!0)}else{for(a=""+Ht(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,r&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Us(e,n,a){if(n!=null&&(n=""+Ht(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+Ht(a):""}function wi(e,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(gt(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=Ht(n),e.defaultValue=a,r=e.textContent,r===a&&r!==""&&r!==null&&(e.value=r),Ln(e)}function Ls(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var Pv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Kd(e,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":r?e.setProperty(n,a):typeof a!="number"||a===0||Pv.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Qd(e,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var u in n)r=n[u],n.hasOwnProperty(u)&&a[u]!==r&&Kd(e,u,r)}else for(var f in n)n.hasOwnProperty(f)&&Kd(e,f,n[f])}function Kc(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Bv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Yo(e){return Bv.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Hi(){}var Qc=null;function Jc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ns=null,Os=null;function Jd(e){var n=it(e);if(n&&(e=n.stateNode)){var a=e[xn]||null;t:switch(e=n.stateNode,n.type){case"input":if(Rn(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+de(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==e&&r.form===e.form){var u=r[xn]||null;if(!u)throw Error(s(90));Rn(r,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===e.form&&Fi(r)}break t;case"textarea":Us(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&tn(e,!!a.multiple,n,!1)}}}var $c=!1;function $d(e,n,a){if($c)return e(n,a);$c=!0;try{var r=e(n);return r}finally{if($c=!1,(Ns!==null||Os!==null)&&(Ol(),Ns&&(n=Ns,e=Os,Os=Ns=null,Jd(n),e)))for(n=0;n<e.length;n++)Jd(e[n])}}function Xr(e,n){var a=e.stateNode;if(a===null)return null;var r=a[xn]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Gi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tu=!1;if(Gi)try{var Wr={};Object.defineProperty(Wr,"passive",{get:function(){tu=!0}}),window.addEventListener("test",Wr,Wr),window.removeEventListener("test",Wr,Wr)}catch{tu=!1}var pa=null,eu=null,jo=null;function tp(){if(jo)return jo;var e,n=eu,a=n.length,r,u="value"in pa?pa.value:pa.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var g=a-e;for(r=1;r<=g&&n[a-r]===u[f-r];r++);return jo=u.slice(e,1<r?1-r:void 0)}function Zo(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ko(){return!0}function ep(){return!1}function Bn(e){function n(a,r,u,f,g){this._reactName=a,this._targetInst=u,this.type=r,this.nativeEvent=f,this.target=g,this.currentTarget=null;for(var E in e)e.hasOwnProperty(E)&&(a=e[E],this[E]=a?a(f):f[E]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Ko:ep,this.isPropagationStopped=ep,this}return S(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ko)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ko)},persist:function(){},isPersistent:Ko}),n}var $a={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qo=Bn($a),qr=S({},$a,{view:0,detail:0}),Iv=Bn(qr),nu,iu,Yr,Jo=S({},qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:su,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Yr&&(Yr&&e.type==="mousemove"?(nu=e.screenX-Yr.screenX,iu=e.screenY-Yr.screenY):iu=nu=0,Yr=e),nu)},movementY:function(e){return"movementY"in e?e.movementY:iu}}),np=Bn(Jo),Fv=S({},Jo,{dataTransfer:0}),Hv=Bn(Fv),Gv=S({},qr,{relatedTarget:0}),au=Bn(Gv),Vv=S({},$a,{animationName:0,elapsedTime:0,pseudoElement:0}),kv=Bn(Vv),Xv=S({},$a,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Wv=Bn(Xv),qv=S({},$a,{data:0}),ip=Bn(qv),Yv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Kv(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Zv[e])?!!n[e]:!1}function su(){return Kv}var Qv=S({},qr,{key:function(e){if(e.key){var n=Yv[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Zo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jv[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:su,charCode:function(e){return e.type==="keypress"?Zo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jv=Bn(Qv),$v=S({},Jo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ap=Bn($v),tS=S({},qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:su}),eS=Bn(tS),nS=S({},$a,{propertyName:0,elapsedTime:0,pseudoElement:0}),iS=Bn(nS),aS=S({},Jo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),sS=Bn(aS),rS=S({},$a,{newState:0,oldState:0}),oS=Bn(rS),lS=[9,13,27,32],ru=Gi&&"CompositionEvent"in window,jr=null;Gi&&"documentMode"in document&&(jr=document.documentMode);var cS=Gi&&"TextEvent"in window&&!jr,sp=Gi&&(!ru||jr&&8<jr&&11>=jr),rp=" ",op=!1;function lp(e,n){switch(e){case"keyup":return lS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ps=!1;function uS(e,n){switch(e){case"compositionend":return cp(n);case"keypress":return n.which!==32?null:(op=!0,rp);case"textInput":return e=n.data,e===rp&&op?null:e;default:return null}}function fS(e,n){if(Ps)return e==="compositionend"||!ru&&lp(e,n)?(e=tp(),jo=eu=pa=null,Ps=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return sp&&n.locale!=="ko"?null:n.data;default:return null}}var hS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function up(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!hS[e.type]:n==="textarea"}function fp(e,n,a,r){Ns?Os?Os.push(r):Os=[r]:Ns=r,n=Gl(n,"onChange"),0<n.length&&(a=new Qo("onChange","change",null,a,r),e.push({event:a,listeners:n}))}var Zr=null,Kr=null;function dS(e){Yg(e,0)}function $o(e){var n=at(e);if(Fi(n))return e}function hp(e,n){if(e==="change")return n}var dp=!1;if(Gi){var ou;if(Gi){var lu="oninput"in document;if(!lu){var pp=document.createElement("div");pp.setAttribute("oninput","return;"),lu=typeof pp.oninput=="function"}ou=lu}else ou=!1;dp=ou&&(!document.documentMode||9<document.documentMode)}function mp(){Zr&&(Zr.detachEvent("onpropertychange",gp),Kr=Zr=null)}function gp(e){if(e.propertyName==="value"&&$o(Kr)){var n=[];fp(n,Kr,e,Jc(e)),$d(dS,n)}}function pS(e,n,a){e==="focusin"?(mp(),Zr=n,Kr=a,Zr.attachEvent("onpropertychange",gp)):e==="focusout"&&mp()}function mS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $o(Kr)}function gS(e,n){if(e==="click")return $o(n)}function _S(e,n){if(e==="input"||e==="change")return $o(n)}function vS(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Zn=typeof Object.is=="function"?Object.is:vS;function Qr(e,n){if(Zn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var u=a[r];if(!Ue.call(n,u)||!Zn(e[u],n[u]))return!1}return!0}function _p(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function vp(e,n){var a=_p(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=n&&r>=n)return{node:a,offset:n-e};e=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=_p(a)}}function Sp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Sp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function yp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=gn(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=gn(e.document)}return n}function cu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var SS=Gi&&"documentMode"in document&&11>=document.documentMode,zs=null,uu=null,Jr=null,fu=!1;function xp(e,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;fu||zs==null||zs!==gn(r)||(r=zs,"selectionStart"in r&&cu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jr&&Qr(Jr,r)||(Jr=r,r=Gl(uu,"onSelect"),0<r.length&&(n=new Qo("onSelect","select",null,n,a),e.push({event:n,listeners:r}),n.target=zs)))}function ts(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var Bs={animationend:ts("Animation","AnimationEnd"),animationiteration:ts("Animation","AnimationIteration"),animationstart:ts("Animation","AnimationStart"),transitionrun:ts("Transition","TransitionRun"),transitionstart:ts("Transition","TransitionStart"),transitioncancel:ts("Transition","TransitionCancel"),transitionend:ts("Transition","TransitionEnd")},hu={},Mp={};Gi&&(Mp=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function es(e){if(hu[e])return hu[e];if(!Bs[e])return e;var n=Bs[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Mp)return hu[e]=n[a];return e}var Ep=es("animationend"),Tp=es("animationiteration"),bp=es("animationstart"),yS=es("transitionrun"),xS=es("transitionstart"),MS=es("transitioncancel"),Ap=es("transitionend"),Rp=new Map,du="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");du.push("scrollEnd");function vi(e,n){Rp.set(e,n),Ot(n,[e])}var tl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},si=[],Is=0,pu=0;function el(){for(var e=Is,n=pu=Is=0;n<e;){var a=si[n];si[n++]=null;var r=si[n];si[n++]=null;var u=si[n];si[n++]=null;var f=si[n];if(si[n++]=null,r!==null&&u!==null){var g=r.pending;g===null?u.next=u:(u.next=g.next,g.next=u),r.pending=u}f!==0&&Cp(a,u,f)}}function nl(e,n,a,r){si[Is++]=e,si[Is++]=n,si[Is++]=a,si[Is++]=r,pu|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function mu(e,n,a,r){return nl(e,n,a,r),il(e)}function ns(e,n){return nl(e,null,null,n),il(e)}function Cp(e,n,a){e.lanes|=a;var r=e.alternate;r!==null&&(r.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-Jt(a),e=f.hiddenUpdates,r=e[u],r===null?e[u]=[n]:r.push(n),n.lane=a|536870912),f):null}function il(e){if(50<xo)throw xo=0,bf=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Fs={};function ES(e,n,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kn(e,n,a,r){return new ES(e,n,a,r)}function gu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Vi(e,n){var a=e.alternate;return a===null?(a=Kn(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function wp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function al(e,n,a,r,u,f){var g=0;if(r=e,typeof e=="function")gu(e)&&(g=1);else if(typeof e=="string")g=Cy(e,a,Y.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case T:return e=Kn(31,a,n,u),e.elementType=T,e.lanes=f,e;case w:return is(a.children,u,f,n);case x:g=8,u|=24;break;case v:return e=Kn(12,a,n,u|2),e.elementType=v,e.lanes=f,e;case q:return e=Kn(13,a,n,u),e.elementType=q,e.lanes=f,e;case G:return e=Kn(19,a,n,u),e.elementType=G,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case N:g=10;break t;case I:g=9;break t;case U:g=11;break t;case P:g=14;break t;case K:g=16,r=null;break t}g=29,a=Error(s(130,e===null?"null":typeof e,"")),r=null}return n=Kn(g,a,n,u),n.elementType=e,n.type=r,n.lanes=f,n}function is(e,n,a,r){return e=Kn(7,e,r,n),e.lanes=a,e}function _u(e,n,a){return e=Kn(6,e,null,n),e.lanes=a,e}function Dp(e){var n=Kn(18,null,null,0);return n.stateNode=e,n}function vu(e,n,a){return n=Kn(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Up=new WeakMap;function ri(e,n){if(typeof e=="object"&&e!==null){var a=Up.get(e);return a!==void 0?a:(n={value:e,source:n,stack:qt(n)},Up.set(e,n),n)}return{value:e,source:n,stack:qt(n)}}var Hs=[],Gs=0,sl=null,$r=0,oi=[],li=0,ma=null,Di=1,Ui="";function ki(e,n){Hs[Gs++]=$r,Hs[Gs++]=sl,sl=e,$r=n}function Lp(e,n,a){oi[li++]=Di,oi[li++]=Ui,oi[li++]=ma,ma=e;var r=Di;e=Ui;var u=32-Jt(r)-1;r&=~(1<<u),a+=1;var f=32-Jt(n)+u;if(30<f){var g=u-u%5;f=(r&(1<<g)-1).toString(32),r>>=g,u-=g,Di=1<<32-Jt(n)+u|a<<u|r,Ui=f+e}else Di=1<<f|a<<u|r,Ui=e}function Su(e){e.return!==null&&(ki(e,1),Lp(e,1,0))}function yu(e){for(;e===sl;)sl=Hs[--Gs],Hs[Gs]=null,$r=Hs[--Gs],Hs[Gs]=null;for(;e===ma;)ma=oi[--li],oi[li]=null,Ui=oi[--li],oi[li]=null,Di=oi[--li],oi[li]=null}function Np(e,n){oi[li++]=Di,oi[li++]=Ui,oi[li++]=ma,Di=n.id,Ui=n.overflow,ma=e}var Mn=null,Xe=null,Me=!1,ga=null,ci=!1,xu=Error(s(519));function _a(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw to(ri(n,e)),xu}function Op(e){var n=e.stateNode,a=e.type,r=e.memoizedProps;switch(n[Ke]=e,n[xn]=r,a){case"dialog":me("cancel",n),me("close",n);break;case"iframe":case"object":case"embed":me("load",n);break;case"video":case"audio":for(a=0;a<Eo.length;a++)me(Eo[a],n);break;case"source":me("error",n);break;case"img":case"image":case"link":me("error",n),me("load",n);break;case"details":me("toggle",n);break;case"input":me("invalid",n),Nn(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":me("invalid",n);break;case"textarea":me("invalid",n),wi(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||Qg(n.textContent,a)?(r.popover!=null&&(me("beforetoggle",n),me("toggle",n)),r.onScroll!=null&&me("scroll",n),r.onScrollEnd!=null&&me("scrollend",n),r.onClick!=null&&(n.onclick=Hi),n=!0):n=!1,n||_a(e,!0)}function Pp(e){for(Mn=e.return;Mn;)switch(Mn.tag){case 5:case 31:case 13:ci=!1;return;case 27:case 3:ci=!0;return;default:Mn=Mn.return}}function Vs(e){if(e!==Mn)return!1;if(!Me)return Pp(e),Me=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||Hf(e.type,e.memoizedProps)),a=!a),a&&Xe&&_a(e),Pp(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Xe=r_(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));Xe=r_(e)}else n===27?(n=Xe,Ua(e.type)?(e=Wf,Wf=null,Xe=e):Xe=n):Xe=Mn?fi(e.stateNode.nextSibling):null;return!0}function as(){Xe=Mn=null,Me=!1}function Mu(){var e=ga;return e!==null&&(Gn===null?Gn=e:Gn.push.apply(Gn,e),ga=null),e}function to(e){ga===null?ga=[e]:ga.push(e)}var Eu=L(null),ss=null,Xi=null;function va(e,n,a){yt(Eu,n._currentValue),n._currentValue=a}function Wi(e){e._currentValue=Eu.current,nt(Eu)}function Tu(e,n,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===a)break;e=e.return}}function bu(e,n,a,r){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var g=u.child;f=f.firstContext;t:for(;f!==null;){var E=f;f=u;for(var z=0;z<n.length;z++)if(E.context===n[z]){f.lanes|=a,E=f.alternate,E!==null&&(E.lanes|=a),Tu(f.return,a,e),r||(g=null);break t}f=E.next}}else if(u.tag===18){if(g=u.return,g===null)throw Error(s(341));g.lanes|=a,f=g.alternate,f!==null&&(f.lanes|=a),Tu(g,a,e),g=null}else g=u.child;if(g!==null)g.return=u;else for(g=u;g!==null;){if(g===e){g=null;break}if(u=g.sibling,u!==null){u.return=g.return,g=u;break}g=g.return}u=g}}function ks(e,n,a,r){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var g=u.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var E=u.type;Zn(u.pendingProps.value,g.value)||(e!==null?e.push(E):e=[E])}}else if(u===St.current){if(g=u.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Co):e=[Co])}u=u.return}e!==null&&bu(n,e,a,r),n.flags|=262144}function rl(e){for(e=e.firstContext;e!==null;){if(!Zn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function rs(e){ss=e,Xi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function En(e){return zp(ss,e)}function ol(e,n){return ss===null&&rs(e),zp(e,n)}function zp(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Xi===null){if(e===null)throw Error(s(308));Xi=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else Xi=Xi.next=n;return a}var TS=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,r){e.push(r)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},bS=o.unstable_scheduleCallback,AS=o.unstable_NormalPriority,sn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Au(){return{controller:new TS,data:new Map,refCount:0}}function eo(e){e.refCount--,e.refCount===0&&bS(AS,function(){e.controller.abort()})}var no=null,Ru=0,Xs=0,Ws=null;function RS(e,n){if(no===null){var a=no=[];Ru=0,Xs=Uf(),Ws={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Ru++,n.then(Bp,Bp),n}function Bp(){if(--Ru===0&&no!==null){Ws!==null&&(Ws.status="fulfilled");var e=no;no=null,Xs=0,Ws=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function CS(e,n){var a=[],r={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){r.status="fulfilled",r.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(r.status="rejected",r.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),r}var Ip=O.S;O.S=function(e,n){xg=ft(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&RS(e,n),Ip!==null&&Ip(e,n)};var os=L(null);function Cu(){var e=os.current;return e!==null?e:Ve.pooledCache}function ll(e,n){n===null?yt(os,os.current):yt(os,n.pool)}function Fp(){var e=Cu();return e===null?null:{parent:sn._currentValue,pool:e}}var qs=Error(s(460)),wu=Error(s(474)),cl=Error(s(542)),ul={then:function(){}};function Hp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Gp(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Hi,Hi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,kp(e),e;default:if(typeof n.status=="string")n.then(Hi,Hi);else{if(e=Ve,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(r){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=r}},function(r){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,kp(e),e}throw cs=n,qs}}function ls(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(cs=a,qs):a}}var cs=null;function Vp(){if(cs===null)throw Error(s(459));var e=cs;return cs=null,e}function kp(e){if(e===qs||e===cl)throw Error(s(483))}var Ys=null,io=0;function fl(e){var n=io;return io+=1,Ys===null&&(Ys=[]),Gp(Ys,e,n)}function ao(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function hl(e,n){throw n.$$typeof===y?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Xp(e){function n(W,H){if(e){var J=W.deletions;J===null?(W.deletions=[H],W.flags|=16):J.push(H)}}function a(W,H){if(!e)return null;for(;H!==null;)n(W,H),H=H.sibling;return null}function r(W){for(var H=new Map;W!==null;)W.key!==null?H.set(W.key,W):H.set(W.index,W),W=W.sibling;return H}function u(W,H){return W=Vi(W,H),W.index=0,W.sibling=null,W}function f(W,H,J){return W.index=J,e?(J=W.alternate,J!==null?(J=J.index,J<H?(W.flags|=67108866,H):J):(W.flags|=67108866,H)):(W.flags|=1048576,H)}function g(W){return e&&W.alternate===null&&(W.flags|=67108866),W}function E(W,H,J,ht){return H===null||H.tag!==6?(H=_u(J,W.mode,ht),H.return=W,H):(H=u(H,J),H.return=W,H)}function z(W,H,J,ht){var Zt=J.type;return Zt===w?ut(W,H,J.props.children,ht,J.key):H!==null&&(H.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===K&&ls(Zt)===H.type)?(H=u(H,J.props),ao(H,J),H.return=W,H):(H=al(J.type,J.key,J.props,null,W.mode,ht),ao(H,J),H.return=W,H)}function $(W,H,J,ht){return H===null||H.tag!==4||H.stateNode.containerInfo!==J.containerInfo||H.stateNode.implementation!==J.implementation?(H=vu(J,W.mode,ht),H.return=W,H):(H=u(H,J.children||[]),H.return=W,H)}function ut(W,H,J,ht,Zt){return H===null||H.tag!==7?(H=is(J,W.mode,ht,Zt),H.return=W,H):(H=u(H,J),H.return=W,H)}function pt(W,H,J){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return H=_u(""+H,W.mode,J),H.return=W,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case M:return J=al(H.type,H.key,H.props,null,W.mode,J),ao(J,H),J.return=W,J;case R:return H=vu(H,W.mode,J),H.return=W,H;case K:return H=ls(H),pt(W,H,J)}if(gt(H)||lt(H))return H=is(H,W.mode,J,null),H.return=W,H;if(typeof H.then=="function")return pt(W,fl(H),J);if(H.$$typeof===N)return pt(W,ol(W,H),J);hl(W,H)}return null}function tt(W,H,J,ht){var Zt=H!==null?H.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Zt!==null?null:E(W,H,""+J,ht);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case M:return J.key===Zt?z(W,H,J,ht):null;case R:return J.key===Zt?$(W,H,J,ht):null;case K:return J=ls(J),tt(W,H,J,ht)}if(gt(J)||lt(J))return Zt!==null?null:ut(W,H,J,ht,null);if(typeof J.then=="function")return tt(W,H,fl(J),ht);if(J.$$typeof===N)return tt(W,H,ol(W,J),ht);hl(W,J)}return null}function st(W,H,J,ht,Zt){if(typeof ht=="string"&&ht!==""||typeof ht=="number"||typeof ht=="bigint")return W=W.get(J)||null,E(H,W,""+ht,Zt);if(typeof ht=="object"&&ht!==null){switch(ht.$$typeof){case M:return W=W.get(ht.key===null?J:ht.key)||null,z(H,W,ht,Zt);case R:return W=W.get(ht.key===null?J:ht.key)||null,$(H,W,ht,Zt);case K:return ht=ls(ht),st(W,H,J,ht,Zt)}if(gt(ht)||lt(ht))return W=W.get(J)||null,ut(H,W,ht,Zt,null);if(typeof ht.then=="function")return st(W,H,J,fl(ht),Zt);if(ht.$$typeof===N)return st(W,H,J,ol(H,ht),Zt);hl(H,ht)}return null}function It(W,H,J,ht){for(var Zt=null,Re=null,Vt=H,oe=H=0,xe=null;Vt!==null&&oe<J.length;oe++){Vt.index>oe?(xe=Vt,Vt=null):xe=Vt.sibling;var Ce=tt(W,Vt,J[oe],ht);if(Ce===null){Vt===null&&(Vt=xe);break}e&&Vt&&Ce.alternate===null&&n(W,Vt),H=f(Ce,H,oe),Re===null?Zt=Ce:Re.sibling=Ce,Re=Ce,Vt=xe}if(oe===J.length)return a(W,Vt),Me&&ki(W,oe),Zt;if(Vt===null){for(;oe<J.length;oe++)Vt=pt(W,J[oe],ht),Vt!==null&&(H=f(Vt,H,oe),Re===null?Zt=Vt:Re.sibling=Vt,Re=Vt);return Me&&ki(W,oe),Zt}for(Vt=r(Vt);oe<J.length;oe++)xe=st(Vt,W,oe,J[oe],ht),xe!==null&&(e&&xe.alternate!==null&&Vt.delete(xe.key===null?oe:xe.key),H=f(xe,H,oe),Re===null?Zt=xe:Re.sibling=xe,Re=xe);return e&&Vt.forEach(function(za){return n(W,za)}),Me&&ki(W,oe),Zt}function Qt(W,H,J,ht){if(J==null)throw Error(s(151));for(var Zt=null,Re=null,Vt=H,oe=H=0,xe=null,Ce=J.next();Vt!==null&&!Ce.done;oe++,Ce=J.next()){Vt.index>oe?(xe=Vt,Vt=null):xe=Vt.sibling;var za=tt(W,Vt,Ce.value,ht);if(za===null){Vt===null&&(Vt=xe);break}e&&Vt&&za.alternate===null&&n(W,Vt),H=f(za,H,oe),Re===null?Zt=za:Re.sibling=za,Re=za,Vt=xe}if(Ce.done)return a(W,Vt),Me&&ki(W,oe),Zt;if(Vt===null){for(;!Ce.done;oe++,Ce=J.next())Ce=pt(W,Ce.value,ht),Ce!==null&&(H=f(Ce,H,oe),Re===null?Zt=Ce:Re.sibling=Ce,Re=Ce);return Me&&ki(W,oe),Zt}for(Vt=r(Vt);!Ce.done;oe++,Ce=J.next())Ce=st(Vt,W,oe,Ce.value,ht),Ce!==null&&(e&&Ce.alternate!==null&&Vt.delete(Ce.key===null?oe:Ce.key),H=f(Ce,H,oe),Re===null?Zt=Ce:Re.sibling=Ce,Re=Ce);return e&&Vt.forEach(function(Fy){return n(W,Fy)}),Me&&ki(W,oe),Zt}function Ie(W,H,J,ht){if(typeof J=="object"&&J!==null&&J.type===w&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case M:t:{for(var Zt=J.key;H!==null;){if(H.key===Zt){if(Zt=J.type,Zt===w){if(H.tag===7){a(W,H.sibling),ht=u(H,J.props.children),ht.return=W,W=ht;break t}}else if(H.elementType===Zt||typeof Zt=="object"&&Zt!==null&&Zt.$$typeof===K&&ls(Zt)===H.type){a(W,H.sibling),ht=u(H,J.props),ao(ht,J),ht.return=W,W=ht;break t}a(W,H);break}else n(W,H);H=H.sibling}J.type===w?(ht=is(J.props.children,W.mode,ht,J.key),ht.return=W,W=ht):(ht=al(J.type,J.key,J.props,null,W.mode,ht),ao(ht,J),ht.return=W,W=ht)}return g(W);case R:t:{for(Zt=J.key;H!==null;){if(H.key===Zt)if(H.tag===4&&H.stateNode.containerInfo===J.containerInfo&&H.stateNode.implementation===J.implementation){a(W,H.sibling),ht=u(H,J.children||[]),ht.return=W,W=ht;break t}else{a(W,H);break}else n(W,H);H=H.sibling}ht=vu(J,W.mode,ht),ht.return=W,W=ht}return g(W);case K:return J=ls(J),Ie(W,H,J,ht)}if(gt(J))return It(W,H,J,ht);if(lt(J)){if(Zt=lt(J),typeof Zt!="function")throw Error(s(150));return J=Zt.call(J),Qt(W,H,J,ht)}if(typeof J.then=="function")return Ie(W,H,fl(J),ht);if(J.$$typeof===N)return Ie(W,H,ol(W,J),ht);hl(W,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,H!==null&&H.tag===6?(a(W,H.sibling),ht=u(H,J),ht.return=W,W=ht):(a(W,H),ht=_u(J,W.mode,ht),ht.return=W,W=ht),g(W)):a(W,H)}return function(W,H,J,ht){try{io=0;var Zt=Ie(W,H,J,ht);return Ys=null,Zt}catch(Vt){if(Vt===qs||Vt===cl)throw Vt;var Re=Kn(29,Vt,null,W.mode);return Re.lanes=ht,Re.return=W,Re}finally{}}}var us=Xp(!0),Wp=Xp(!1),Sa=!1;function Du(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Uu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ya(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function xa(e,n,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(De&2)!==0){var u=r.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),r.pending=n,n=il(e),Cp(e,null,a),n}return nl(e,r,n,a),il(e)}function so(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Gr(e,a)}}function Lu(e,n){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=g:f=f.next=g,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:r.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Nu=!1;function ro(){if(Nu){var e=Ws;if(e!==null)throw e}}function oo(e,n,a,r){Nu=!1;var u=e.updateQueue;Sa=!1;var f=u.firstBaseUpdate,g=u.lastBaseUpdate,E=u.shared.pending;if(E!==null){u.shared.pending=null;var z=E,$=z.next;z.next=null,g===null?f=$:g.next=$,g=z;var ut=e.alternate;ut!==null&&(ut=ut.updateQueue,E=ut.lastBaseUpdate,E!==g&&(E===null?ut.firstBaseUpdate=$:E.next=$,ut.lastBaseUpdate=z))}if(f!==null){var pt=u.baseState;g=0,ut=$=z=null,E=f;do{var tt=E.lane&-536870913,st=tt!==E.lane;if(st?(ye&tt)===tt:(r&tt)===tt){tt!==0&&tt===Xs&&(Nu=!0),ut!==null&&(ut=ut.next={lane:0,tag:E.tag,payload:E.payload,callback:null,next:null});t:{var It=e,Qt=E;tt=n;var Ie=a;switch(Qt.tag){case 1:if(It=Qt.payload,typeof It=="function"){pt=It.call(Ie,pt,tt);break t}pt=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Qt.payload,tt=typeof It=="function"?It.call(Ie,pt,tt):It,tt==null)break t;pt=S({},pt,tt);break t;case 2:Sa=!0}}tt=E.callback,tt!==null&&(e.flags|=64,st&&(e.flags|=8192),st=u.callbacks,st===null?u.callbacks=[tt]:st.push(tt))}else st={lane:tt,tag:E.tag,payload:E.payload,callback:E.callback,next:null},ut===null?($=ut=st,z=pt):ut=ut.next=st,g|=tt;if(E=E.next,E===null){if(E=u.shared.pending,E===null)break;st=E,E=st.next,st.next=null,u.lastBaseUpdate=st,u.shared.pending=null}}while(!0);ut===null&&(z=pt),u.baseState=z,u.firstBaseUpdate=$,u.lastBaseUpdate=ut,f===null&&(u.shared.lanes=0),Aa|=g,e.lanes=g,e.memoizedState=pt}}function qp(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Yp(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)qp(a[e],n)}var js=L(null),dl=L(0);function jp(e,n){e=ta,yt(dl,e),yt(js,n),ta=e|n.baseLanes}function Ou(){yt(dl,ta),yt(js,js.current)}function Pu(){ta=dl.current,nt(js),nt(dl)}var Qn=L(null),ui=null;function Ma(e){var n=e.alternate;yt(en,en.current&1),yt(Qn,e),ui===null&&(n===null||js.current!==null||n.memoizedState!==null)&&(ui=e)}function zu(e){yt(en,en.current),yt(Qn,e),ui===null&&(ui=e)}function Zp(e){e.tag===22?(yt(en,en.current),yt(Qn,e),ui===null&&(ui=e)):Ea()}function Ea(){yt(en,en.current),yt(Qn,Qn.current)}function Jn(e){nt(Qn),ui===e&&(ui=null),nt(en)}var en=L(0);function pl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||kf(a)||Xf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var qi=0,re=null,ze=null,rn=null,ml=!1,Zs=!1,fs=!1,gl=0,lo=0,Ks=null,wS=0;function Qe(){throw Error(s(321))}function Bu(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!Zn(e[a],n[a]))return!1;return!0}function Iu(e,n,a,r,u,f){return qi=f,re=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,O.H=e===null||e.memoizedState===null?Lm:$u,fs=!1,f=a(r,u),fs=!1,Zs&&(f=Qp(n,a,r,u)),Kp(e),f}function Kp(e){O.H=fo;var n=ze!==null&&ze.next!==null;if(qi=0,rn=ze=re=null,ml=!1,lo=0,Ks=null,n)throw Error(s(300));e===null||on||(e=e.dependencies,e!==null&&rl(e)&&(on=!0))}function Qp(e,n,a,r){re=e;var u=0;do{if(Zs&&(Ks=null),lo=0,Zs=!1,25<=u)throw Error(s(301));if(u+=1,rn=ze=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}O.H=Nm,f=n(a,r)}while(Zs);return f}function DS(){var e=O.H,n=e.useState()[0];return n=typeof n.then=="function"?co(n):n,e=e.useState()[0],(ze!==null?ze.memoizedState:null)!==e&&(re.flags|=1024),n}function Fu(){var e=gl!==0;return gl=0,e}function Hu(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function Gu(e){if(ml){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}ml=!1}qi=0,rn=ze=re=null,Zs=!1,lo=gl=0,Ks=null}function On(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?re.memoizedState=rn=e:rn=rn.next=e,rn}function nn(){if(ze===null){var e=re.alternate;e=e!==null?e.memoizedState:null}else e=ze.next;var n=rn===null?re.memoizedState:rn.next;if(n!==null)rn=n,ze=e;else{if(e===null)throw re.alternate===null?Error(s(467)):Error(s(310));ze=e,e={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},rn===null?re.memoizedState=rn=e:rn=rn.next=e}return rn}function _l(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function co(e){var n=lo;return lo+=1,Ks===null&&(Ks=[]),e=Gp(Ks,e,n),n=re,(rn===null?n.memoizedState:rn.next)===null&&(n=n.alternate,O.H=n===null||n.memoizedState===null?Lm:$u),e}function vl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return co(e);if(e.$$typeof===N)return En(e)}throw Error(s(438,String(e)))}function Vu(e){var n=null,a=re.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=re.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=_l(),re.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),r=0;r<e;r++)a[r]=b;return n.index++,a}function Yi(e,n){return typeof n=="function"?n(e):n}function Sl(e){var n=nn();return ku(n,ze,e)}function ku(e,n,a){var r=e.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var u=e.baseQueue,f=r.pending;if(f!==null){if(u!==null){var g=u.next;u.next=f.next,f.next=g}n.baseQueue=u=f,r.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var E=g=null,z=null,$=n,ut=!1;do{var pt=$.lane&-536870913;if(pt!==$.lane?(ye&pt)===pt:(qi&pt)===pt){var tt=$.revertLane;if(tt===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null}),pt===Xs&&(ut=!0);else if((qi&tt)===tt){$=$.next,tt===Xs&&(ut=!0);continue}else pt={lane:0,revertLane:$.revertLane,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},z===null?(E=z=pt,g=f):z=z.next=pt,re.lanes|=tt,Aa|=tt;pt=$.action,fs&&a(f,pt),f=$.hasEagerState?$.eagerState:a(f,pt)}else tt={lane:pt,revertLane:$.revertLane,gesture:$.gesture,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},z===null?(E=z=tt,g=f):z=z.next=tt,re.lanes|=pt,Aa|=pt;$=$.next}while($!==null&&$!==n);if(z===null?g=f:z.next=E,!Zn(f,e.memoizedState)&&(on=!0,ut&&(a=Ws,a!==null)))throw a;e.memoizedState=f,e.baseState=g,e.baseQueue=z,r.lastRenderedState=f}return u===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Xu(e){var n=nn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=e;var r=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var g=u=u.next;do f=e(f,g.action),g=g.next;while(g!==u);Zn(f,n.memoizedState)||(on=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function Jp(e,n,a){var r=re,u=nn(),f=Me;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var g=!Zn((ze||u).memoizedState,a);if(g&&(u.memoizedState=a,on=!0),u=u.queue,Yu(em.bind(null,r,u,e),[e]),u.getSnapshot!==n||g||rn!==null&&rn.memoizedState.tag&1){if(r.flags|=2048,Qs(9,{destroy:void 0},tm.bind(null,r,u,a,n),null),Ve===null)throw Error(s(349));f||(qi&127)!==0||$p(r,n,a)}return a}function $p(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=re.updateQueue,n===null?(n=_l(),re.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function tm(e,n,a,r){n.value=a,n.getSnapshot=r,nm(n)&&im(e)}function em(e,n,a){return a(function(){nm(n)&&im(e)})}function nm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!Zn(e,a)}catch{return!0}}function im(e){var n=ns(e,2);n!==null&&Vn(n,e,2)}function Wu(e){var n=On();if(typeof e=="function"){var a=e;if(e=a(),fs){Nt(!0);try{a()}finally{Nt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yi,lastRenderedState:e},n}function am(e,n,a,r){return e.baseState=a,ku(e,ze,typeof r=="function"?r:Yi)}function US(e,n,a,r,u){if(Ml(e))throw Error(s(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){f.listeners.push(g)}};O.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,sm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function sm(e,n){var a=n.action,r=n.payload,u=e.state;if(n.isTransition){var f=O.T,g={};O.T=g;try{var E=a(u,r),z=O.S;z!==null&&z(g,E),rm(e,n,E)}catch($){qu(e,n,$)}finally{f!==null&&g.types!==null&&(f.types=g.types),O.T=f}}else try{f=a(u,r),rm(e,n,f)}catch($){qu(e,n,$)}}function rm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){om(e,n,r)},function(r){return qu(e,n,r)}):om(e,n,a)}function om(e,n,a){n.status="fulfilled",n.value=a,lm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,sm(e,a)))}function qu(e,n,a){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,lm(n),n=n.next;while(n!==r)}e.action=null}function lm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function cm(e,n){return n}function um(e,n){if(Me){var a=Ve.formState;if(a!==null){t:{var r=re;if(Me){if(Xe){e:{for(var u=Xe,f=ci;u.nodeType!==8;){if(!f){u=null;break e}if(u=fi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Xe=fi(u.nextSibling),r=u.data==="F!";break t}}_a(r)}r=!1}r&&(n=a[0])}}return a=On(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:cm,lastRenderedState:n},a.queue=r,a=wm.bind(null,re,r),r.dispatch=a,r=Wu(!1),f=Ju.bind(null,re,!1,r.queue),r=On(),u={state:n,dispatch:null,action:e,pending:null},r.queue=u,a=US.bind(null,re,u,f,a),u.dispatch=a,r.memoizedState=e,[n,a,!1]}function fm(e){var n=nn();return hm(n,ze,e)}function hm(e,n,a){if(n=ku(e,n,cm)[0],e=Sl(Yi)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=co(n)}catch(g){throw g===qs?cl:g}else r=n;n=nn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(re.flags|=2048,Qs(9,{destroy:void 0},LS.bind(null,u,a),null)),[r,f,e]}function LS(e,n){e.action=n}function dm(e){var n=nn(),a=ze;if(a!==null)return hm(n,a,e);nn(),n=n.memoizedState,a=nn();var r=a.queue.dispatch;return a.memoizedState=e,[n,r,!1]}function Qs(e,n,a,r){return e={tag:e,create:a,deps:r,inst:n,next:null},n=re.updateQueue,n===null&&(n=_l(),re.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,n.lastEffect=e),e}function pm(){return nn().memoizedState}function yl(e,n,a,r){var u=On();re.flags|=e,u.memoizedState=Qs(1|n,{destroy:void 0},a,r===void 0?null:r)}function xl(e,n,a,r){var u=nn();r=r===void 0?null:r;var f=u.memoizedState.inst;ze!==null&&r!==null&&Bu(r,ze.memoizedState.deps)?u.memoizedState=Qs(n,f,a,r):(re.flags|=e,u.memoizedState=Qs(1|n,f,a,r))}function mm(e,n){yl(8390656,8,e,n)}function Yu(e,n){xl(2048,8,e,n)}function NS(e){re.flags|=4;var n=re.updateQueue;if(n===null)n=_l(),re.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function gm(e){var n=nn().memoizedState;return NS({ref:n,nextImpl:e}),function(){if((De&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function _m(e,n){return xl(4,2,e,n)}function vm(e,n){return xl(4,4,e,n)}function Sm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function ym(e,n,a){a=a!=null?a.concat([e]):null,xl(4,4,Sm.bind(null,n,e),a)}function ju(){}function xm(e,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Bu(n,r[1])?r[0]:(a.memoizedState=[e,n],e)}function Mm(e,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Bu(n,r[1]))return r[0];if(r=e(),fs){Nt(!0);try{e()}finally{Nt(!1)}}return a.memoizedState=[r,n],r}function Zu(e,n,a){return a===void 0||(qi&1073741824)!==0&&(ye&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=Eg(),re.lanes|=e,Aa|=e,a)}function Em(e,n,a,r){return Zn(a,n)?a:js.current!==null?(e=Zu(e,a,r),Zn(e,n)||(on=!0),e):(qi&42)===0||(qi&1073741824)!==0&&(ye&261930)===0?(on=!0,e.memoizedState=a):(e=Eg(),re.lanes|=e,Aa|=e,n)}function Tm(e,n,a,r,u){var f=Q.p;Q.p=f!==0&&8>f?f:8;var g=O.T,E={};O.T=E,Ju(e,!1,n,a);try{var z=u(),$=O.S;if($!==null&&$(E,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var ut=CS(z,r);uo(e,n,ut,ei(e))}else uo(e,n,r,ei(e))}catch(pt){uo(e,n,{then:function(){},status:"rejected",reason:pt},ei())}finally{Q.p=f,g!==null&&E.types!==null&&(g.types=E.types),O.T=g}}function OS(){}function Ku(e,n,a,r){if(e.tag!==5)throw Error(s(476));var u=bm(e).queue;Tm(e,u,n,Z,a===null?OS:function(){return Am(e),a(r)})}function bm(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:Z,baseState:Z,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yi,lastRenderedState:Z},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yi,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Am(e){var n=bm(e);n.next===null&&(n=e.alternate.memoizedState),uo(e,n.next.queue,{},ei())}function Qu(){return En(Co)}function Rm(){return nn().memoizedState}function Cm(){return nn().memoizedState}function PS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=ei();e=ya(a);var r=xa(n,e,a);r!==null&&(Vn(r,n,a),so(r,n,a)),n={cache:Au()},e.payload=n;return}n=n.return}}function zS(e,n,a){var r=ei();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ml(e)?Dm(n,a):(a=mu(e,n,a,r),a!==null&&(Vn(a,e,r),Um(a,n,r)))}function wm(e,n,a){var r=ei();uo(e,n,a,r)}function uo(e,n,a,r){var u={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ml(e))Dm(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var g=n.lastRenderedState,E=f(g,a);if(u.hasEagerState=!0,u.eagerState=E,Zn(E,g))return nl(e,n,u,0),Ve===null&&el(),!1}catch{}finally{}if(a=mu(e,n,u,r),a!==null)return Vn(a,e,r),Um(a,n,r),!0}return!1}function Ju(e,n,a,r){if(r={lane:2,revertLane:Uf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ml(e)){if(n)throw Error(s(479))}else n=mu(e,a,r,2),n!==null&&Vn(n,e,2)}function Ml(e){var n=e.alternate;return e===re||n!==null&&n===re}function Dm(e,n){Zs=ml=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Um(e,n,a){if((a&4194048)!==0){var r=n.lanes;r&=e.pendingLanes,a|=r,n.lanes=a,Gr(e,a)}}var fo={readContext:En,use:vl,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useLayoutEffect:Qe,useInsertionEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useSyncExternalStore:Qe,useId:Qe,useHostTransitionStatus:Qe,useFormState:Qe,useActionState:Qe,useOptimistic:Qe,useMemoCache:Qe,useCacheRefresh:Qe};fo.useEffectEvent=Qe;var Lm={readContext:En,use:vl,useCallback:function(e,n){return On().memoizedState=[e,n===void 0?null:n],e},useContext:En,useEffect:mm,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,yl(4194308,4,Sm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return yl(4194308,4,e,n)},useInsertionEffect:function(e,n){yl(4,2,e,n)},useMemo:function(e,n){var a=On();n=n===void 0?null:n;var r=e();if(fs){Nt(!0);try{e()}finally{Nt(!1)}}return a.memoizedState=[r,n],r},useReducer:function(e,n,a){var r=On();if(a!==void 0){var u=a(n);if(fs){Nt(!0);try{a(n)}finally{Nt(!1)}}}else u=n;return r.memoizedState=r.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},r.queue=e,e=e.dispatch=zS.bind(null,re,e),[r.memoizedState,e]},useRef:function(e){var n=On();return e={current:e},n.memoizedState=e},useState:function(e){e=Wu(e);var n=e.queue,a=wm.bind(null,re,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:ju,useDeferredValue:function(e,n){var a=On();return Zu(a,e,n)},useTransition:function(){var e=Wu(!1);return e=Tm.bind(null,re,e.queue,!0,!1),On().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var r=re,u=On();if(Me){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Ve===null)throw Error(s(349));(ye&127)!==0||$p(r,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,mm(em.bind(null,r,f,e),[e]),r.flags|=2048,Qs(9,{destroy:void 0},tm.bind(null,r,f,a,n),null),a},useId:function(){var e=On(),n=Ve.identifierPrefix;if(Me){var a=Ui,r=Di;a=(r&~(1<<32-Jt(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=gl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=wS++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:Qu,useFormState:um,useActionState:um,useOptimistic:function(e){var n=On();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Ju.bind(null,re,!0,a),a.dispatch=n,[e,n]},useMemoCache:Vu,useCacheRefresh:function(){return On().memoizedState=PS.bind(null,re)},useEffectEvent:function(e){var n=On(),a={impl:e};return n.memoizedState=a,function(){if((De&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},$u={readContext:En,use:vl,useCallback:xm,useContext:En,useEffect:Yu,useImperativeHandle:ym,useInsertionEffect:_m,useLayoutEffect:vm,useMemo:Mm,useReducer:Sl,useRef:pm,useState:function(){return Sl(Yi)},useDebugValue:ju,useDeferredValue:function(e,n){var a=nn();return Em(a,ze.memoizedState,e,n)},useTransition:function(){var e=Sl(Yi)[0],n=nn().memoizedState;return[typeof e=="boolean"?e:co(e),n]},useSyncExternalStore:Jp,useId:Rm,useHostTransitionStatus:Qu,useFormState:fm,useActionState:fm,useOptimistic:function(e,n){var a=nn();return am(a,ze,e,n)},useMemoCache:Vu,useCacheRefresh:Cm};$u.useEffectEvent=gm;var Nm={readContext:En,use:vl,useCallback:xm,useContext:En,useEffect:Yu,useImperativeHandle:ym,useInsertionEffect:_m,useLayoutEffect:vm,useMemo:Mm,useReducer:Xu,useRef:pm,useState:function(){return Xu(Yi)},useDebugValue:ju,useDeferredValue:function(e,n){var a=nn();return ze===null?Zu(a,e,n):Em(a,ze.memoizedState,e,n)},useTransition:function(){var e=Xu(Yi)[0],n=nn().memoizedState;return[typeof e=="boolean"?e:co(e),n]},useSyncExternalStore:Jp,useId:Rm,useHostTransitionStatus:Qu,useFormState:dm,useActionState:dm,useOptimistic:function(e,n){var a=nn();return ze!==null?am(a,ze,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:Vu,useCacheRefresh:Cm};Nm.useEffectEvent=gm;function tf(e,n,a,r){n=e.memoizedState,a=a(r,n),a=a==null?n:S({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var ef={enqueueSetState:function(e,n,a){e=e._reactInternals;var r=ei(),u=ya(r);u.payload=n,a!=null&&(u.callback=a),n=xa(e,u,r),n!==null&&(Vn(n,e,r),so(n,e,r))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var r=ei(),u=ya(r);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=xa(e,u,r),n!==null&&(Vn(n,e,r),so(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=ei(),r=ya(a);r.tag=2,n!=null&&(r.callback=n),n=xa(e,r,a),n!==null&&(Vn(n,e,a),so(n,e,a))}};function Om(e,n,a,r,u,f,g){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,f,g):n.prototype&&n.prototype.isPureReactComponent?!Qr(a,r)||!Qr(u,f):!0}function Pm(e,n,a,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==e&&ef.enqueueReplaceState(n,n.state,null)}function hs(e,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(e=e.defaultProps){a===n&&(a=S({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function zm(e){tl(e)}function Bm(e){console.error(e)}function Im(e){tl(e)}function El(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function Fm(e,n,a){try{var r=e.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function nf(e,n,a){return a=ya(a),a.tag=3,a.payload={element:null},a.callback=function(){El(e,n)},a}function Hm(e){return e=ya(e),e.tag=3,e}function Gm(e,n,a,r){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=r.value;e.payload=function(){return u(f)},e.callback=function(){Fm(n,a,r)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(e.callback=function(){Fm(n,a,r),typeof u!="function"&&(Ra===null?Ra=new Set([this]):Ra.add(this));var E=r.stack;this.componentDidCatch(r.value,{componentStack:E!==null?E:""})})}function BS(e,n,a,r,u){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&ks(n,a,u,!0),a=Qn.current,a!==null){switch(a.tag){case 31:case 13:return ui===null?Pl():a.alternate===null&&Je===0&&(Je=3),a.flags&=-257,a.flags|=65536,a.lanes=u,r===ul?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Cf(e,r,u)),!1;case 22:return a.flags|=65536,r===ul?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Cf(e,r,u)),!1}throw Error(s(435,a.tag))}return Cf(e,r,u),Pl(),!1}if(Me)return n=Qn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,r!==xu&&(e=Error(s(422),{cause:r}),to(ri(e,a)))):(r!==xu&&(n=Error(s(423),{cause:r}),to(ri(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,r=ri(r,a),u=nf(e.stateNode,r,u),Lu(e,u),Je!==4&&(Je=2)),!1;var f=Error(s(520),{cause:r});if(f=ri(f,a),yo===null?yo=[f]:yo.push(f),Je!==4&&(Je=2),n===null)return!0;r=ri(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=nf(a.stateNode,r,e),Lu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ra===null||!Ra.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Hm(u),Gm(u,e,a,r),Lu(a,u),!1}a=a.return}while(a!==null);return!1}var af=Error(s(461)),on=!1;function Tn(e,n,a,r){n.child=e===null?Wp(n,null,a,r):us(n,e.child,a,r)}function Vm(e,n,a,r,u){a=a.render;var f=n.ref;if("ref"in r){var g={};for(var E in r)E!=="ref"&&(g[E]=r[E])}else g=r;return rs(n),r=Iu(e,n,a,g,f,u),E=Fu(),e!==null&&!on?(Hu(e,n,u),ji(e,n,u)):(Me&&E&&Su(n),n.flags|=1,Tn(e,n,r,u),n.child)}function km(e,n,a,r,u){if(e===null){var f=a.type;return typeof f=="function"&&!gu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,Xm(e,n,f,r,u)):(e=al(a.type,null,r,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!hf(e,u)){var g=f.memoizedProps;if(a=a.compare,a=a!==null?a:Qr,a(g,r)&&e.ref===n.ref)return ji(e,n,u)}return n.flags|=1,e=Vi(f,r),e.ref=n.ref,e.return=n,n.child=e}function Xm(e,n,a,r,u){if(e!==null){var f=e.memoizedProps;if(Qr(f,r)&&e.ref===n.ref)if(on=!1,n.pendingProps=r=f,hf(e,u))(e.flags&131072)!==0&&(on=!0);else return n.lanes=e.lanes,ji(e,n,u)}return sf(e,n,a,r,u)}function Wm(e,n,a,r){var u=r.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(r=n.child=e.child,u=0;r!==null;)u=u|r.lanes|r.childLanes,r=r.sibling;r=u&~f}else r=0,n.child=null;return qm(e,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&ll(n,f!==null?f.cachePool:null),f!==null?jp(n,f):Ou(),Zp(n);else return r=n.lanes=536870912,qm(e,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(ll(n,f.cachePool),jp(n,f),Ea(),n.memoizedState=null):(e!==null&&ll(n,null),Ou(),Ea());return Tn(e,n,u,a),n.child}function ho(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function qm(e,n,a,r,u){var f=Cu();return f=f===null?null:{parent:sn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&ll(n,null),Ou(),Zp(n),e!==null&&ks(e,n,r,!0),n.childLanes=u,null}function Tl(e,n){return n=Al({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Ym(e,n,a){return us(n,e.child,null,a),e=Tl(n,n.pendingProps),e.flags|=2,Jn(n),n.memoizedState=null,e}function IS(e,n,a){var r=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Me){if(r.mode==="hidden")return e=Tl(n,r),n.lanes=536870912,ho(null,e);if(zu(n),(e=Xe)?(e=s_(e,ci),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ma!==null?{id:Di,overflow:Ui}:null,retryLane:536870912,hydrationErrors:null},a=Dp(e),a.return=n,n.child=a,Mn=n,Xe=null)):e=null,e===null)throw _a(n);return n.lanes=536870912,null}return Tl(n,r)}var f=e.memoizedState;if(f!==null){var g=f.dehydrated;if(zu(n),u)if(n.flags&256)n.flags&=-257,n=Ym(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(on||ks(e,n,a,!1),u=(a&e.childLanes)!==0,on||u){if(r=Ve,r!==null&&(g=Ci(r,a),g!==0&&g!==f.retryLane))throw f.retryLane=g,ns(e,g),Vn(r,e,g),af;Pl(),n=Ym(e,n,a)}else e=f.treeContext,Xe=fi(g.nextSibling),Mn=n,Me=!0,ga=null,ci=!1,e!==null&&Np(n,e),n=Tl(n,r),n.flags|=4096;return n}return e=Vi(e.child,{mode:r.mode,children:r.children}),e.ref=n.ref,n.child=e,e.return=n,e}function bl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function sf(e,n,a,r,u){return rs(n),a=Iu(e,n,a,r,void 0,u),r=Fu(),e!==null&&!on?(Hu(e,n,u),ji(e,n,u)):(Me&&r&&Su(n),n.flags|=1,Tn(e,n,a,u),n.child)}function jm(e,n,a,r,u,f){return rs(n),n.updateQueue=null,a=Qp(n,r,a,u),Kp(e),r=Fu(),e!==null&&!on?(Hu(e,n,f),ji(e,n,f)):(Me&&r&&Su(n),n.flags|=1,Tn(e,n,a,f),n.child)}function Zm(e,n,a,r,u){if(rs(n),n.stateNode===null){var f=Fs,g=a.contextType;typeof g=="object"&&g!==null&&(f=En(g)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=ef,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Du(n),g=a.contextType,f.context=typeof g=="object"&&g!==null?En(g):Fs,f.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(tf(n,a,g,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(g=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),g!==f.state&&ef.enqueueReplaceState(f,f.state,null),oo(n,r,f,u),ro(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(e===null){f=n.stateNode;var E=n.memoizedProps,z=hs(a,E);f.props=z;var $=f.context,ut=a.contextType;g=Fs,typeof ut=="object"&&ut!==null&&(g=En(ut));var pt=a.getDerivedStateFromProps;ut=typeof pt=="function"||typeof f.getSnapshotBeforeUpdate=="function",E=n.pendingProps!==E,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(E||$!==g)&&Pm(n,f,r,g),Sa=!1;var tt=n.memoizedState;f.state=tt,oo(n,r,f,u),ro(),$=n.memoizedState,E||tt!==$||Sa?(typeof pt=="function"&&(tf(n,a,pt,r),$=n.memoizedState),(z=Sa||Om(n,a,z,r,tt,$,g))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=$),f.props=r,f.state=$,f.context=g,r=z):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,Uu(e,n),g=n.memoizedProps,ut=hs(a,g),f.props=ut,pt=n.pendingProps,tt=f.context,$=a.contextType,z=Fs,typeof $=="object"&&$!==null&&(z=En($)),E=a.getDerivedStateFromProps,($=typeof E=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(g!==pt||tt!==z)&&Pm(n,f,r,z),Sa=!1,tt=n.memoizedState,f.state=tt,oo(n,r,f,u),ro();var st=n.memoizedState;g!==pt||tt!==st||Sa||e!==null&&e.dependencies!==null&&rl(e.dependencies)?(typeof E=="function"&&(tf(n,a,E,r),st=n.memoizedState),(ut=Sa||Om(n,a,ut,r,tt,st,z)||e!==null&&e.dependencies!==null&&rl(e.dependencies))?($||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,st,z),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,st,z)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=st),f.props=r,f.state=st,f.context=z,r=ut):(typeof f.componentDidUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||g===e.memoizedProps&&tt===e.memoizedState||(n.flags|=1024),r=!1)}return f=r,bl(e,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&r?(n.child=us(n,e.child,null,u),n.child=us(n,null,a,u)):Tn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=ji(e,n,u),e}function Km(e,n,a,r){return as(),n.flags|=256,Tn(e,n,a,r),n.child}var rf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function of(e){return{baseLanes:e,cachePool:Fp()}}function lf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ti),e}function Qm(e,n,a){var r=n.pendingProps,u=!1,f=(n.flags&128)!==0,g;if((g=f)||(g=e!==null&&e.memoizedState===null?!1:(en.current&2)!==0),g&&(u=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,e===null){if(Me){if(u?Ma(n):Ea(),(e=Xe)?(e=s_(e,ci),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:ma!==null?{id:Di,overflow:Ui}:null,retryLane:536870912,hydrationErrors:null},a=Dp(e),a.return=n,n.child=a,Mn=n,Xe=null)):e=null,e===null)throw _a(n);return Xf(e)?n.lanes=32:n.lanes=536870912,null}var E=r.children;return r=r.fallback,u?(Ea(),u=n.mode,E=Al({mode:"hidden",children:E},u),r=is(r,u,a,null),E.return=n,r.return=n,E.sibling=r,n.child=E,r=n.child,r.memoizedState=of(a),r.childLanes=lf(e,g,a),n.memoizedState=rf,ho(null,r)):(Ma(n),cf(n,E))}var z=e.memoizedState;if(z!==null&&(E=z.dehydrated,E!==null)){if(f)n.flags&256?(Ma(n),n.flags&=-257,n=uf(e,n,a)):n.memoizedState!==null?(Ea(),n.child=e.child,n.flags|=128,n=null):(Ea(),E=r.fallback,u=n.mode,r=Al({mode:"visible",children:r.children},u),E=is(E,u,a,null),E.flags|=2,r.return=n,E.return=n,r.sibling=E,n.child=r,us(n,e.child,null,a),r=n.child,r.memoizedState=of(a),r.childLanes=lf(e,g,a),n.memoizedState=rf,n=ho(null,r));else if(Ma(n),Xf(E)){if(g=E.nextSibling&&E.nextSibling.dataset,g)var $=g.dgst;g=$,r=Error(s(419)),r.stack="",r.digest=g,to({value:r,source:null,stack:null}),n=uf(e,n,a)}else if(on||ks(e,n,a,!1),g=(a&e.childLanes)!==0,on||g){if(g=Ve,g!==null&&(r=Ci(g,a),r!==0&&r!==z.retryLane))throw z.retryLane=r,ns(e,r),Vn(g,e,r),af;kf(E)||Pl(),n=uf(e,n,a)}else kf(E)?(n.flags|=192,n.child=e.child,n=null):(e=z.treeContext,Xe=fi(E.nextSibling),Mn=n,Me=!0,ga=null,ci=!1,e!==null&&Np(n,e),n=cf(n,r.children),n.flags|=4096);return n}return u?(Ea(),E=r.fallback,u=n.mode,z=e.child,$=z.sibling,r=Vi(z,{mode:"hidden",children:r.children}),r.subtreeFlags=z.subtreeFlags&65011712,$!==null?E=Vi($,E):(E=is(E,u,a,null),E.flags|=2),E.return=n,r.return=n,r.sibling=E,n.child=r,ho(null,r),r=n.child,E=e.child.memoizedState,E===null?E=of(a):(u=E.cachePool,u!==null?(z=sn._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=Fp(),E={baseLanes:E.baseLanes|a,cachePool:u}),r.memoizedState=E,r.childLanes=lf(e,g,a),n.memoizedState=rf,ho(e.child,r)):(Ma(n),a=e.child,e=a.sibling,a=Vi(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,e!==null&&(g=n.deletions,g===null?(n.deletions=[e],n.flags|=16):g.push(e)),n.child=a,n.memoizedState=null,a)}function cf(e,n){return n=Al({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Al(e,n){return e=Kn(22,e,null,n),e.lanes=0,e}function uf(e,n,a){return us(n,e.child,null,a),e=cf(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Jm(e,n,a){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Tu(e.return,n,a)}function ff(e,n,a,r,u,f){var g=e.memoizedState;g===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:u,treeForkCount:f}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=r,g.tail=a,g.tailMode=u,g.treeForkCount=f)}function $m(e,n,a){var r=n.pendingProps,u=r.revealOrder,f=r.tail;r=r.children;var g=en.current,E=(g&2)!==0;if(E?(g=g&1|2,n.flags|=128):g&=1,yt(en,g),Tn(e,n,r,a),r=Me?$r:0,!E&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Jm(e,a,n);else if(e.tag===19)Jm(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&pl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),ff(n,!1,u,a,f,r);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&pl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}ff(n,!0,a,null,f,r);break;case"together":ff(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function ji(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Aa|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(ks(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,a=Vi(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=Vi(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function hf(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&rl(e)))}function FS(e,n,a){switch(n.tag){case 3:Gt(n,n.stateNode.containerInfo),va(n,sn,e.memoizedState.cache),as();break;case 27:case 5:ne(n);break;case 4:Gt(n,n.stateNode.containerInfo);break;case 10:va(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,zu(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(Ma(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Qm(e,n,a):(Ma(n),e=ji(e,n,a),e!==null?e.sibling:null);Ma(n);break;case 19:var u=(e.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(ks(e,n,a,!1),r=(a&n.childLanes)!==0),u){if(r)return $m(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),yt(en,en.current),r)break;return null;case 22:return n.lanes=0,Wm(e,n,a,n.pendingProps);case 24:va(n,sn,e.memoizedState.cache)}return ji(e,n,a)}function tg(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)on=!0;else{if(!hf(e,a)&&(n.flags&128)===0)return on=!1,FS(e,n,a);on=(e.flags&131072)!==0}else on=!1,Me&&(n.flags&1048576)!==0&&Lp(n,$r,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(e=ls(n.elementType),n.type=e,typeof e=="function")gu(e)?(r=hs(e,r),n.tag=1,n=Zm(null,n,e,r,a)):(n.tag=0,n=sf(null,n,e,r,a));else{if(e!=null){var u=e.$$typeof;if(u===U){n.tag=11,n=Vm(null,n,e,r,a);break t}else if(u===P){n.tag=14,n=km(null,n,e,r,a);break t}}throw n=mt(e)||e,Error(s(306,n,""))}}return n;case 0:return sf(e,n,n.type,n.pendingProps,a);case 1:return r=n.type,u=hs(r,n.pendingProps),Zm(e,n,r,u,a);case 3:t:{if(Gt(n,n.stateNode.containerInfo),e===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;u=f.element,Uu(e,n),oo(n,r,null,a);var g=n.memoizedState;if(r=g.cache,va(n,sn,r),r!==f.cache&&bu(n,[sn],a,!0),ro(),r=g.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Km(e,n,r,a);break t}else if(r!==u){u=ri(Error(s(424)),n),to(u),n=Km(e,n,r,a);break t}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Xe=fi(e.firstChild),Mn=n,Me=!0,ga=null,ci=!0,a=Wp(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(as(),r===u){n=ji(e,n,a);break t}Tn(e,n,r,a)}n=n.child}return n;case 26:return bl(e,n),e===null?(a=f_(n.type,null,n.pendingProps,null))?n.memoizedState=a:Me||(a=n.type,e=n.pendingProps,r=Vl(Et.current).createElement(a),r[Ke]=n,r[xn]=e,bn(r,a,e),vt(r),n.stateNode=r):n.memoizedState=f_(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return ne(n),e===null&&Me&&(r=n.stateNode=l_(n.type,n.pendingProps,Et.current),Mn=n,ci=!0,u=Xe,Ua(n.type)?(Wf=u,Xe=fi(r.firstChild)):Xe=u),Tn(e,n,n.pendingProps.children,a),bl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Me&&((u=r=Xe)&&(r=my(r,n.type,n.pendingProps,ci),r!==null?(n.stateNode=r,Mn=n,Xe=fi(r.firstChild),ci=!1,u=!0):u=!1),u||_a(n)),ne(n),u=n.type,f=n.pendingProps,g=e!==null?e.memoizedProps:null,r=f.children,Hf(u,f)?r=null:g!==null&&Hf(u,g)&&(n.flags|=32),n.memoizedState!==null&&(u=Iu(e,n,DS,null,null,a),Co._currentValue=u),bl(e,n),Tn(e,n,r,a),n.child;case 6:return e===null&&Me&&((e=a=Xe)&&(a=gy(a,n.pendingProps,ci),a!==null?(n.stateNode=a,Mn=n,Xe=null,e=!0):e=!1),e||_a(n)),null;case 13:return Qm(e,n,a);case 4:return Gt(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=us(n,null,r,a):Tn(e,n,r,a),n.child;case 11:return Vm(e,n,n.type,n.pendingProps,a);case 7:return Tn(e,n,n.pendingProps,a),n.child;case 8:return Tn(e,n,n.pendingProps.children,a),n.child;case 12:return Tn(e,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,va(n,n.type,r.value),Tn(e,n,r.children,a),n.child;case 9:return u=n.type._context,r=n.pendingProps.children,rs(n),u=En(u),r=r(u),n.flags|=1,Tn(e,n,r,a),n.child;case 14:return km(e,n,n.type,n.pendingProps,a);case 15:return Xm(e,n,n.type,n.pendingProps,a);case 19:return $m(e,n,a);case 31:return IS(e,n,a);case 22:return Wm(e,n,a,n.pendingProps);case 24:return rs(n),r=En(sn),e===null?(u=Cu(),u===null&&(u=Ve,f=Au(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:r,cache:u},Du(n),va(n,sn,u)):((e.lanes&a)!==0&&(Uu(e,n),oo(n,null,null,a),ro()),u=e.memoizedState,f=n.memoizedState,u.parent!==r?(u={parent:r,cache:r},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),va(n,sn,r)):(r=f.cache,va(n,sn,r),r!==u.cache&&bu(n,[sn],a,!0))),Tn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Zi(e){e.flags|=4}function df(e,n,a,r,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(Rg())e.flags|=8192;else throw cs=ul,wu}else e.flags&=-16777217}function eg(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!g_(n))if(Rg())e.flags|=8192;else throw cs=ul,wu}function Rl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?un():536870912,e.lanes|=n,er|=n)}function po(e,n){if(!Me)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function We(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags&65011712,r|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,r|=u.subtreeFlags,r|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=r,e.childLanes=a,n}function HS(e,n,a){var r=n.pendingProps;switch(yu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return We(n),null;case 1:return We(n),null;case 3:return a=n.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Wi(sn),Ft(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Vs(n)?Zi(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Mu())),We(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(Zi(n),f!==null?(We(n),eg(n,f)):(We(n),df(n,u,null,r,a))):f?f!==e.memoizedState?(Zi(n),We(n),eg(n,f)):(We(n),n.flags&=-16777217):(e=e.memoizedProps,e!==r&&Zi(n),We(n),df(n,u,e,r,a)),null;case 27:if(Oe(n),a=Et.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Zi(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return We(n),null}e=Y.current,Vs(n)?Op(n):(e=l_(u,r,a),n.stateNode=e,Zi(n))}return We(n),null;case 5:if(Oe(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==r&&Zi(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return We(n),null}if(f=Y.current,Vs(n))Op(n);else{var g=Vl(Et.current);switch(f){case 1:f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=g.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=g.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=g.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?g.createElement("select",{is:r.is}):g.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?g.createElement(u,{is:r.is}):g.createElement(u)}}f[Ke]=n,f[xn]=r;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)f.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=f;t:switch(bn(f,u,r),u){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Zi(n)}}return We(n),df(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==r&&Zi(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(e=Et.current,Vs(n)){if(e=n.stateNode,a=n.memoizedProps,r=null,u=Mn,u!==null)switch(u.tag){case 27:case 5:r=u.memoizedProps}e[Ke]=n,e=!!(e.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||Qg(e.nodeValue,a)),e||_a(n,!0)}else e=Vl(e).createTextNode(r),e[Ke]=n,n.stateNode=e}return We(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(r=Vs(n),a!==null){if(e===null){if(!r)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[Ke]=n}else as(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),e=!1}else a=Mu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(Jn(n),n):(Jn(n),null);if((n.flags&128)!==0)throw Error(s(558))}return We(n),null;case 13:if(r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=Vs(n),r!==null&&r.dehydrated!==null){if(e===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[Ke]=n}else as(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),u=!1}else u=Mu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(Jn(n),n):(Jn(n),null)}return Jn(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,e=e!==null&&e.memoizedState!==null,a&&(r=n.child,u=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(u=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==u&&(r.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Rl(n,n.updateQueue),We(n),null);case 4:return Ft(),e===null&&Pf(n.stateNode.containerInfo),We(n),null;case 10:return Wi(n.type),We(n),null;case 19:if(nt(en),r=n.memoizedState,r===null)return We(n),null;if(u=(n.flags&128)!==0,f=r.rendering,f===null)if(u)po(r,!1);else{if(Je!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=pl(e),f!==null){for(n.flags|=128,po(r,!1),e=f.updateQueue,n.updateQueue=e,Rl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)wp(a,e),a=a.sibling;return yt(en,en.current&1|2),Me&&ki(n,r.treeForkCount),n.child}e=e.sibling}r.tail!==null&&ft()>Ll&&(n.flags|=128,u=!0,po(r,!1),n.lanes=4194304)}else{if(!u)if(e=pl(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Rl(n,e),po(r,!0),r.tail===null&&r.tailMode==="hidden"&&!f.alternate&&!Me)return We(n),null}else 2*ft()-r.renderingStartTime>Ll&&a!==536870912&&(n.flags|=128,u=!0,po(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(e=r.last,e!==null?e.sibling=f:n.child=f,r.last=f)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ft(),e.sibling=null,a=en.current,yt(en,u?a&1|2:a&1),Me&&ki(n,r.treeForkCount),e):(We(n),null);case 22:case 23:return Jn(n),Pu(),r=n.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(We(n),n.subtreeFlags&6&&(n.flags|=8192)):We(n),a=n.updateQueue,a!==null&&Rl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),e!==null&&nt(os),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Wi(sn),We(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function GS(e,n){switch(yu(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Wi(sn),Ft(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Oe(n),null;case 31:if(n.memoizedState!==null){if(Jn(n),n.alternate===null)throw Error(s(340));as()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Jn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));as()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return nt(en),null;case 4:return Ft(),null;case 10:return Wi(n.type),null;case 22:case 23:return Jn(n),Pu(),e!==null&&nt(os),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return Wi(sn),null;case 25:return null;default:return null}}function ng(e,n){switch(yu(n),n.tag){case 3:Wi(sn),Ft();break;case 26:case 27:case 5:Oe(n);break;case 4:Ft();break;case 31:n.memoizedState!==null&&Jn(n);break;case 13:Jn(n);break;case 19:nt(en);break;case 10:Wi(n.type);break;case 22:case 23:Jn(n),Pu(),e!==null&&nt(os);break;case 24:Wi(sn)}}function mo(e,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var u=r.next;a=u;do{if((a.tag&e)===e){r=void 0;var f=a.create,g=a.inst;r=f(),g.destroy=r}a=a.next}while(a!==u)}}catch(E){Ne(n,n.return,E)}}function Ta(e,n,a){try{var r=n.updateQueue,u=r!==null?r.lastEffect:null;if(u!==null){var f=u.next;r=f;do{if((r.tag&e)===e){var g=r.inst,E=g.destroy;if(E!==void 0){g.destroy=void 0,u=n;var z=a,$=E;try{$()}catch(ut){Ne(u,z,ut)}}}r=r.next}while(r!==f)}}catch(ut){Ne(n,n.return,ut)}}function ig(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{Yp(n,a)}catch(r){Ne(e,e.return,r)}}}function ag(e,n,a){a.props=hs(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(r){Ne(e,n,r)}}function go(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof a=="function"?e.refCleanup=a(r):a.current=r}}catch(u){Ne(e,n,u)}}function Li(e,n){var a=e.ref,r=e.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(u){Ne(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ne(e,n,u)}else a.current=null}function sg(e){var n=e.type,a=e.memoizedProps,r=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(u){Ne(e,e.return,u)}}function pf(e,n,a){try{var r=e.stateNode;cy(r,e.type,a,n),r[xn]=n}catch(u){Ne(e,e.return,u)}}function rg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ua(e.type)||e.tag===4}function mf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||rg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ua(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gf(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Hi));else if(r!==4&&(r===27&&Ua(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(gf(e,n,a),e=e.sibling;e!==null;)gf(e,n,a),e=e.sibling}function Cl(e,n,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(r!==4&&(r===27&&Ua(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Cl(e,n,a),e=e.sibling;e!==null;)Cl(e,n,a),e=e.sibling}function og(e){var n=e.stateNode,a=e.memoizedProps;try{for(var r=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);bn(n,r,a),n[Ke]=e,n[xn]=a}catch(f){Ne(e,e.return,f)}}var Ki=!1,ln=!1,_f=!1,lg=typeof WeakSet=="function"?WeakSet:Set,_n=null;function VS(e,n){if(e=e.containerInfo,If=Zl,e=yp(e),cu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var u=r.anchorOffset,f=r.focusNode;r=r.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var g=0,E=-1,z=-1,$=0,ut=0,pt=e,tt=null;e:for(;;){for(var st;pt!==a||u!==0&&pt.nodeType!==3||(E=g+u),pt!==f||r!==0&&pt.nodeType!==3||(z=g+r),pt.nodeType===3&&(g+=pt.nodeValue.length),(st=pt.firstChild)!==null;)tt=pt,pt=st;for(;;){if(pt===e)break e;if(tt===a&&++$===u&&(E=g),tt===f&&++ut===r&&(z=g),(st=pt.nextSibling)!==null)break;pt=tt,tt=pt.parentNode}pt=st}a=E===-1||z===-1?null:{start:E,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ff={focusedElem:e,selectionRange:a},Zl=!1,_n=n;_n!==null;)if(n=_n,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,_n=e;else for(;_n!==null;){switch(n=_n,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,r=a.stateNode;try{var It=hs(a.type,u);e=r.getSnapshotBeforeUpdate(It,f),r.__reactInternalSnapshotBeforeUpdate=e}catch(Qt){Ne(a,a.return,Qt)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)Vf(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Vf(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,_n=e;break}_n=n.return}}function cg(e,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:Ji(e,a),r&4&&mo(5,a);break;case 1:if(Ji(e,a),r&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(g){Ne(a,a.return,g)}else{var u=hs(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(g){Ne(a,a.return,g)}}r&64&&ig(a),r&512&&go(a,a.return);break;case 3:if(Ji(e,a),r&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Yp(e,n)}catch(g){Ne(a,a.return,g)}}break;case 27:n===null&&r&4&&og(a);case 26:case 5:Ji(e,a),n===null&&r&4&&sg(a),r&512&&go(a,a.return);break;case 12:Ji(e,a);break;case 31:Ji(e,a),r&4&&hg(e,a);break;case 13:Ji(e,a),r&4&&dg(e,a),r&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=QS.bind(null,a),_y(e,a))));break;case 22:if(r=a.memoizedState!==null||Ki,!r){n=n!==null&&n.memoizedState!==null||ln,u=Ki;var f=ln;Ki=r,(ln=n)&&!f?$i(e,a,(a.subtreeFlags&8772)!==0):Ji(e,a),Ki=u,ln=f}break;case 30:break;default:Ji(e,a)}}function ug(e){var n=e.alternate;n!==null&&(e.alternate=null,ug(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&C(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var je=null,In=!1;function Qi(e,n,a){for(a=a.child;a!==null;)fg(e,n,a),a=a.sibling}function fg(e,n,a){if(Xt&&typeof Xt.onCommitFiberUnmount=="function")try{Xt.onCommitFiberUnmount(Yt,a)}catch{}switch(a.tag){case 26:ln||Li(a,n),Qi(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ln||Li(a,n);var r=je,u=In;Ua(a.type)&&(je=a.stateNode,In=!1),Qi(e,n,a),bo(a.stateNode),je=r,In=u;break;case 5:ln||Li(a,n);case 6:if(r=je,u=In,je=null,Qi(e,n,a),je=r,In=u,je!==null)if(In)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(a.stateNode)}catch(f){Ne(a,n,f)}else try{je.removeChild(a.stateNode)}catch(f){Ne(a,n,f)}break;case 18:je!==null&&(In?(e=je,i_(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),cr(e)):i_(je,a.stateNode));break;case 4:r=je,u=In,je=a.stateNode.containerInfo,In=!0,Qi(e,n,a),je=r,In=u;break;case 0:case 11:case 14:case 15:Ta(2,a,n),ln||Ta(4,a,n),Qi(e,n,a);break;case 1:ln||(Li(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&ag(a,n,r)),Qi(e,n,a);break;case 21:Qi(e,n,a);break;case 22:ln=(r=ln)||a.memoizedState!==null,Qi(e,n,a),ln=r;break;default:Qi(e,n,a)}}function hg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{cr(e)}catch(a){Ne(n,n.return,a)}}}function dg(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{cr(e)}catch(a){Ne(n,n.return,a)}}function kS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new lg),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new lg),n;default:throw Error(s(435,e.tag))}}function wl(e,n){var a=kS(e);n.forEach(function(r){if(!a.has(r)){a.add(r);var u=JS.bind(null,e,r);r.then(u,u)}})}function Fn(e,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var u=a[r],f=e,g=n,E=g;t:for(;E!==null;){switch(E.tag){case 27:if(Ua(E.type)){je=E.stateNode,In=!1;break t}break;case 5:je=E.stateNode,In=!1;break t;case 3:case 4:je=E.stateNode.containerInfo,In=!0;break t}E=E.return}if(je===null)throw Error(s(160));fg(f,g,u),je=null,In=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)pg(n,e),n=n.sibling}var Si=null;function pg(e,n){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Fn(n,e),Hn(e),r&4&&(Ta(3,e,e.return),mo(3,e),Ta(5,e,e.return));break;case 1:Fn(n,e),Hn(e),r&512&&(ln||a===null||Li(a,a.return)),r&64&&Ki&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var u=Si;if(Fn(n,e),Hn(e),r&512&&(ln||a===null||Li(a,a.return)),r&4){var f=a!==null?a.memoizedState:null;if(r=e.memoizedState,a===null)if(r===null)if(e.stateNode===null){t:{r=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(r){case"title":f=u.getElementsByTagName("title")[0],(!f||f[Qa]||f[Ke]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(r),u.head.insertBefore(f,u.querySelector("head > title"))),bn(f,r,a),f[Ke]=e,vt(f),r=f;break t;case"link":var g=p_("link","href",u).get(r+(a.href||""));if(g){for(var E=0;E<g.length;E++)if(f=g[E],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){g.splice(E,1);break e}}f=u.createElement(r),bn(f,r,a),u.head.appendChild(f);break;case"meta":if(g=p_("meta","content",u).get(r+(a.content||""))){for(E=0;E<g.length;E++)if(f=g[E],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){g.splice(E,1);break e}}f=u.createElement(r),bn(f,r,a),u.head.appendChild(f);break;default:throw Error(s(468,r))}f[Ke]=e,vt(f),r=f}e.stateNode=r}else m_(u,e.type,e.stateNode);else e.stateNode=d_(u,r,e.memoizedProps);else f!==r?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,r===null?m_(u,e.type,e.stateNode):d_(u,r,e.memoizedProps)):r===null&&e.stateNode!==null&&pf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Fn(n,e),Hn(e),r&512&&(ln||a===null||Li(a,a.return)),a!==null&&r&4&&pf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Fn(n,e),Hn(e),r&512&&(ln||a===null||Li(a,a.return)),e.flags&32){u=e.stateNode;try{Ls(u,"")}catch(It){Ne(e,e.return,It)}}r&4&&e.stateNode!=null&&(u=e.memoizedProps,pf(e,u,a!==null?a.memoizedProps:u)),r&1024&&(_f=!0);break;case 6:if(Fn(n,e),Hn(e),r&4){if(e.stateNode===null)throw Error(s(162));r=e.memoizedProps,a=e.stateNode;try{a.nodeValue=r}catch(It){Ne(e,e.return,It)}}break;case 3:if(Wl=null,u=Si,Si=kl(n.containerInfo),Fn(n,e),Si=u,Hn(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{cr(n.containerInfo)}catch(It){Ne(e,e.return,It)}_f&&(_f=!1,mg(e));break;case 4:r=Si,Si=kl(e.stateNode.containerInfo),Fn(n,e),Hn(e),Si=r;break;case 12:Fn(n,e),Hn(e);break;case 31:Fn(n,e),Hn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,wl(e,r)));break;case 13:Fn(n,e),Hn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Ul=ft()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,wl(e,r)));break;case 22:u=e.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,$=Ki,ut=ln;if(Ki=$||u,ln=ut||z,Fn(n,e),ln=ut,Ki=$,Hn(e),r&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||Ki||ln||ds(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(f=z.stateNode,u)g=f.style,typeof g.setProperty=="function"?g.setProperty("display","none","important"):g.display="none";else{E=z.stateNode;var pt=z.memoizedProps.style,tt=pt!=null&&pt.hasOwnProperty("display")?pt.display:null;E.style.display=tt==null||typeof tt=="boolean"?"":(""+tt).trim()}}catch(It){Ne(z,z.return,It)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(It){Ne(z,z.return,It)}}}else if(n.tag===18){if(a===null){z=n;try{var st=z.stateNode;u?a_(st,!0):a_(z.stateNode,!1)}catch(It){Ne(z,z.return,It)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=e.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,wl(e,a))));break;case 19:Fn(n,e),Hn(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,wl(e,r)));break;case 30:break;case 21:break;default:Fn(n,e),Hn(e)}}function Hn(e){var n=e.flags;if(n&2){try{for(var a,r=e.return;r!==null;){if(rg(r)){a=r;break}r=r.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=mf(e);Cl(e,f,u);break;case 5:var g=a.stateNode;a.flags&32&&(Ls(g,""),a.flags&=-33);var E=mf(e);Cl(e,E,g);break;case 3:case 4:var z=a.stateNode.containerInfo,$=mf(e);gf(e,$,z);break;default:throw Error(s(161))}}catch(ut){Ne(e,e.return,ut)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function mg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;mg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function Ji(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)cg(e,n.alternate,n),n=n.sibling}function ds(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Ta(4,n,n.return),ds(n);break;case 1:Li(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&ag(n,n.return,a),ds(n);break;case 27:bo(n.stateNode);case 26:case 5:Li(n,n.return),ds(n);break;case 22:n.memoizedState===null&&ds(n);break;case 30:ds(n);break;default:ds(n)}e=e.sibling}}function $i(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,u=e,f=n,g=f.flags;switch(f.tag){case 0:case 11:case 15:$i(u,f,a),mo(4,f);break;case 1:if($i(u,f,a),r=f,u=r.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch($){Ne(r,r.return,$)}if(r=f,u=r.updateQueue,u!==null){var E=r.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)qp(z[u],E)}catch($){Ne(r,r.return,$)}}a&&g&64&&ig(f),go(f,f.return);break;case 27:og(f);case 26:case 5:$i(u,f,a),a&&r===null&&g&4&&sg(f),go(f,f.return);break;case 12:$i(u,f,a);break;case 31:$i(u,f,a),a&&g&4&&hg(u,f);break;case 13:$i(u,f,a),a&&g&4&&dg(u,f);break;case 22:f.memoizedState===null&&$i(u,f,a),go(f,f.return);break;case 30:break;default:$i(u,f,a)}n=n.sibling}}function vf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&eo(a))}function Sf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e))}function yi(e,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)gg(e,n,a,r),n=n.sibling}function gg(e,n,a,r){var u=n.flags;switch(n.tag){case 0:case 11:case 15:yi(e,n,a,r),u&2048&&mo(9,n);break;case 1:yi(e,n,a,r);break;case 3:yi(e,n,a,r),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&eo(e)));break;case 12:if(u&2048){yi(e,n,a,r),e=n.stateNode;try{var f=n.memoizedProps,g=f.id,E=f.onPostCommit;typeof E=="function"&&E(g,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(z){Ne(n,n.return,z)}}else yi(e,n,a,r);break;case 31:yi(e,n,a,r);break;case 13:yi(e,n,a,r);break;case 23:break;case 22:f=n.stateNode,g=n.alternate,n.memoizedState!==null?f._visibility&2?yi(e,n,a,r):_o(e,n):f._visibility&2?yi(e,n,a,r):(f._visibility|=2,Js(e,n,a,r,(n.subtreeFlags&10256)!==0||!1)),u&2048&&vf(g,n);break;case 24:yi(e,n,a,r),u&2048&&Sf(n.alternate,n);break;default:yi(e,n,a,r)}}function Js(e,n,a,r,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,g=n,E=a,z=r,$=g.flags;switch(g.tag){case 0:case 11:case 15:Js(f,g,E,z,u),mo(8,g);break;case 23:break;case 22:var ut=g.stateNode;g.memoizedState!==null?ut._visibility&2?Js(f,g,E,z,u):_o(f,g):(ut._visibility|=2,Js(f,g,E,z,u)),u&&$&2048&&vf(g.alternate,g);break;case 24:Js(f,g,E,z,u),u&&$&2048&&Sf(g.alternate,g);break;default:Js(f,g,E,z,u)}n=n.sibling}}function _o(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,r=n,u=r.flags;switch(r.tag){case 22:_o(a,r),u&2048&&vf(r.alternate,r);break;case 24:_o(a,r),u&2048&&Sf(r.alternate,r);break;default:_o(a,r)}n=n.sibling}}var vo=8192;function $s(e,n,a){if(e.subtreeFlags&vo)for(e=e.child;e!==null;)_g(e,n,a),e=e.sibling}function _g(e,n,a){switch(e.tag){case 26:$s(e,n,a),e.flags&vo&&e.memoizedState!==null&&wy(a,Si,e.memoizedState,e.memoizedProps);break;case 5:$s(e,n,a);break;case 3:case 4:var r=Si;Si=kl(e.stateNode.containerInfo),$s(e,n,a),Si=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=vo,vo=16777216,$s(e,n,a),vo=r):$s(e,n,a));break;default:$s(e,n,a)}}function vg(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function So(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];_n=r,yg(r,e)}vg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Sg(e),e=e.sibling}function Sg(e){switch(e.tag){case 0:case 11:case 15:So(e),e.flags&2048&&Ta(9,e,e.return);break;case 3:So(e);break;case 12:So(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Dl(e)):So(e);break;default:So(e)}}function Dl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];_n=r,yg(r,e)}vg(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Ta(8,n,n.return),Dl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Dl(n));break;default:Dl(n)}e=e.sibling}}function yg(e,n){for(;_n!==null;){var a=_n;switch(a.tag){case 0:case 11:case 15:Ta(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:eo(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,_n=r;else t:for(a=e;_n!==null;){r=_n;var u=r.sibling,f=r.return;if(ug(r),r===a){_n=null;break t}if(u!==null){u.return=f,_n=u;break t}_n=f}}}var XS={getCacheForType:function(e){var n=En(sn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return En(sn).controller.signal}},WS=typeof WeakMap=="function"?WeakMap:Map,De=0,Ve=null,pe=null,ye=0,Le=0,$n=null,ba=!1,tr=!1,yf=!1,ta=0,Je=0,Aa=0,ps=0,xf=0,ti=0,er=0,yo=null,Gn=null,Mf=!1,Ul=0,xg=0,Ll=1/0,Nl=null,Ra=null,hn=0,Ca=null,nr=null,ea=0,Ef=0,Tf=null,Mg=null,xo=0,bf=null;function ei(){return(De&2)!==0&&ye!==0?ye&-ye:O.T!==null?Uf():Vr()}function Eg(){if(ti===0)if((ye&536870912)===0||Me){var e=ot;ot<<=1,(ot&3932160)===0&&(ot=262144),ti=e}else ti=536870912;return e=Qn.current,e!==null&&(e.flags|=32),ti}function Vn(e,n,a){(e===Ve&&(Le===2||Le===9)||e.cancelPendingCommit!==null)&&(ir(e,0),wa(e,ye,ti,!1)),yn(e,a),((De&2)===0||e!==Ve)&&(e===Ve&&((De&2)===0&&(ps|=a),Je===4&&wa(e,ye,ti,!1)),Ni(e))}function Tg(e,n,a){if((De&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&e.expiredLanes)===0||$t(e,n),u=r?jS(e,n):Rf(e,n,!0),f=r;do{if(u===0){tr&&!r&&wa(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!qS(a)){u=Rf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var g=0;else g=e.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var E=e;u=yo;var z=E.current.memoizedState.isDehydrated;if(z&&(ir(E,g).flags|=256),g=Rf(E,g,!1),g!==2){if(yf&&!z){E.errorRecoveryDisabledLanes|=f,ps|=f,u=4;break t}f=Gn,Gn=u,f!==null&&(Gn===null?Gn=f:Gn.push.apply(Gn,f))}u=g}if(f=!1,u!==2)continue}}if(u===1){ir(e,0),wa(e,n,0,!0);break}t:{switch(r=e,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:wa(r,n,ti,!ba);break t;case 2:Gn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Ul+300-ft(),10<u)){if(wa(r,n,ti,!ba),Dt(r,0,!0)!==0)break t;ea=n,r.timeoutHandle=e_(bg.bind(null,r,a,Gn,Nl,Mf,n,ti,ps,er,ba,f,"Throttled",-0,0),u);break t}bg(r,a,Gn,Nl,Mf,n,ti,ps,er,ba,f,null,-0,0)}}break}while(!0);Ni(e)}function bg(e,n,a,r,u,f,g,E,z,$,ut,pt,tt,st){if(e.timeoutHandle=-1,pt=n.subtreeFlags,pt&8192||(pt&16785408)===16785408){pt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Hi},_g(n,f,pt);var It=(f&62914560)===f?Ul-ft():(f&4194048)===f?xg-ft():0;if(It=Dy(pt,It),It!==null){ea=f,e.cancelPendingCommit=It(Ng.bind(null,e,n,f,a,r,u,g,E,z,ut,pt,null,tt,st)),wa(e,f,g,!$);return}}Ng(e,n,f,a,r,u,g,E,z)}function qS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var u=a[r],f=u.getSnapshot;u=u.value;try{if(!Zn(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function wa(e,n,a,r){n&=~xf,n&=~ps,e.suspendedLanes|=n,e.pingedLanes&=~n,r&&(e.warmLanes|=n),r=e.expirationTimes;for(var u=n;0<u;){var f=31-Jt(u),g=1<<f;r[f]=-1,u&=~g}a!==0&&Hr(e,a,n)}function Ol(){return(De&6)===0?(Mo(0),!1):!0}function Af(){if(pe!==null){if(Le===0)var e=pe.return;else e=pe,Xi=ss=null,Gu(e),Ys=null,io=0,e=pe;for(;e!==null;)ng(e.alternate,e),e=e.return;pe=null}}function ir(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,hy(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ea=0,Af(),Ve=e,pe=a=Vi(e.current,null),ye=n,Le=0,$n=null,ba=!1,tr=$t(e,n),yf=!1,er=ti=xf=ps=Aa=Je=0,Gn=yo=null,Mf=!1,(n&8)!==0&&(n|=n&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=n;0<r;){var u=31-Jt(r),f=1<<u;n|=e[u],r&=~f}return ta=n,el(),a}function Ag(e,n){re=null,O.H=fo,n===qs||n===cl?(n=Vp(),Le=3):n===wu?(n=Vp(),Le=4):Le=n===af?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,$n=n,pe===null&&(Je=1,El(e,ri(n,e.current)))}function Rg(){var e=Qn.current;return e===null?!0:(ye&4194048)===ye?ui===null:(ye&62914560)===ye||(ye&536870912)!==0?e===ui:!1}function Cg(){var e=O.H;return O.H=fo,e===null?fo:e}function wg(){var e=O.A;return O.A=XS,e}function Pl(){Je=4,ba||(ye&4194048)!==ye&&Qn.current!==null||(tr=!0),(Aa&134217727)===0&&(ps&134217727)===0||Ve===null||wa(Ve,ye,ti,!1)}function Rf(e,n,a){var r=De;De|=2;var u=Cg(),f=wg();(Ve!==e||ye!==n)&&(Nl=null,ir(e,n)),n=!1;var g=Je;t:do try{if(Le!==0&&pe!==null){var E=pe,z=$n;switch(Le){case 8:Af(),g=6;break t;case 3:case 2:case 9:case 6:Qn.current===null&&(n=!0);var $=Le;if(Le=0,$n=null,ar(e,E,z,$),a&&tr){g=0;break t}break;default:$=Le,Le=0,$n=null,ar(e,E,z,$)}}YS(),g=Je;break}catch(ut){Ag(e,ut)}while(!0);return n&&e.shellSuspendCounter++,Xi=ss=null,De=r,O.H=u,O.A=f,pe===null&&(Ve=null,ye=0,el()),g}function YS(){for(;pe!==null;)Dg(pe)}function jS(e,n){var a=De;De|=2;var r=Cg(),u=wg();Ve!==e||ye!==n?(Nl=null,Ll=ft()+500,ir(e,n)):tr=$t(e,n);t:do try{if(Le!==0&&pe!==null){n=pe;var f=$n;e:switch(Le){case 1:Le=0,$n=null,ar(e,n,f,1);break;case 2:case 9:if(Hp(f)){Le=0,$n=null,Ug(n);break}n=function(){Le!==2&&Le!==9||Ve!==e||(Le=7),Ni(e)},f.then(n,n);break t;case 3:Le=7;break t;case 4:Le=5;break t;case 7:Hp(f)?(Le=0,$n=null,Ug(n)):(Le=0,$n=null,ar(e,n,f,7));break;case 5:var g=null;switch(pe.tag){case 26:g=pe.memoizedState;case 5:case 27:var E=pe;if(g?g_(g):E.stateNode.complete){Le=0,$n=null;var z=E.sibling;if(z!==null)pe=z;else{var $=E.return;$!==null?(pe=$,zl($)):pe=null}break e}}Le=0,$n=null,ar(e,n,f,5);break;case 6:Le=0,$n=null,ar(e,n,f,6);break;case 8:Af(),Je=6;break t;default:throw Error(s(462))}}ZS();break}catch(ut){Ag(e,ut)}while(!0);return Xi=ss=null,O.H=r,O.A=u,De=a,pe!==null?0:(Ve=null,ye=0,el(),Je)}function ZS(){for(;pe!==null&&!A();)Dg(pe)}function Dg(e){var n=tg(e.alternate,e,ta);e.memoizedProps=e.pendingProps,n===null?zl(e):pe=n}function Ug(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=jm(a,n,n.pendingProps,n.type,void 0,ye);break;case 11:n=jm(a,n,n.pendingProps,n.type.render,n.ref,ye);break;case 5:Gu(n);default:ng(a,n),n=pe=wp(n,ta),n=tg(a,n,ta)}e.memoizedProps=e.pendingProps,n===null?zl(e):pe=n}function ar(e,n,a,r){Xi=ss=null,Gu(n),Ys=null,io=0;var u=n.return;try{if(BS(e,u,n,a,ye)){Je=1,El(e,ri(a,e.current)),pe=null;return}}catch(f){if(u!==null)throw pe=u,f;Je=1,El(e,ri(a,e.current)),pe=null;return}n.flags&32768?(Me||r===1?e=!0:tr||(ye&536870912)!==0?e=!1:(ba=e=!0,(r===2||r===9||r===3||r===6)&&(r=Qn.current,r!==null&&r.tag===13&&(r.flags|=16384))),Lg(n,e)):zl(n)}function zl(e){var n=e;do{if((n.flags&32768)!==0){Lg(n,ba);return}e=n.return;var a=HS(n.alternate,n,ta);if(a!==null){pe=a;return}if(n=n.sibling,n!==null){pe=n;return}pe=n=e}while(n!==null);Je===0&&(Je=5)}function Lg(e,n){do{var a=GS(e.alternate,e);if(a!==null){a.flags&=32767,pe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){pe=e;return}pe=e=a}while(e!==null);Je=6,pe=null}function Ng(e,n,a,r,u,f,g,E,z){e.cancelPendingCommit=null;do Bl();while(hn!==0);if((De&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=pu,gi(e,a,f,g,E,z),e===Ve&&(pe=Ve=null,ye=0),nr=n,Ca=e,ea=a,Ef=f,Tf=u,Mg=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,$S(Ct,function(){return Ig(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=O.T,O.T=null,u=Q.p,Q.p=2,g=De,De|=4;try{VS(e,n,a)}finally{De=g,Q.p=u,O.T=r}}hn=1,Og(),Pg(),zg()}}function Og(){if(hn===1){hn=0;var e=Ca,n=nr,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=O.T,O.T=null;var r=Q.p;Q.p=2;var u=De;De|=4;try{pg(n,e);var f=Ff,g=yp(e.containerInfo),E=f.focusedElem,z=f.selectionRange;if(g!==E&&E&&E.ownerDocument&&Sp(E.ownerDocument.documentElement,E)){if(z!==null&&cu(E)){var $=z.start,ut=z.end;if(ut===void 0&&(ut=$),"selectionStart"in E)E.selectionStart=$,E.selectionEnd=Math.min(ut,E.value.length);else{var pt=E.ownerDocument||document,tt=pt&&pt.defaultView||window;if(tt.getSelection){var st=tt.getSelection(),It=E.textContent.length,Qt=Math.min(z.start,It),Ie=z.end===void 0?Qt:Math.min(z.end,It);!st.extend&&Qt>Ie&&(g=Ie,Ie=Qt,Qt=g);var W=vp(E,Qt),H=vp(E,Ie);if(W&&H&&(st.rangeCount!==1||st.anchorNode!==W.node||st.anchorOffset!==W.offset||st.focusNode!==H.node||st.focusOffset!==H.offset)){var J=pt.createRange();J.setStart(W.node,W.offset),st.removeAllRanges(),Qt>Ie?(st.addRange(J),st.extend(H.node,H.offset)):(J.setEnd(H.node,H.offset),st.addRange(J))}}}}for(pt=[],st=E;st=st.parentNode;)st.nodeType===1&&pt.push({element:st,left:st.scrollLeft,top:st.scrollTop});for(typeof E.focus=="function"&&E.focus(),E=0;E<pt.length;E++){var ht=pt[E];ht.element.scrollLeft=ht.left,ht.element.scrollTop=ht.top}}Zl=!!If,Ff=If=null}finally{De=u,Q.p=r,O.T=a}}e.current=n,hn=2}}function Pg(){if(hn===2){hn=0;var e=Ca,n=nr,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=O.T,O.T=null;var r=Q.p;Q.p=2;var u=De;De|=4;try{cg(e,n.alternate,n)}finally{De=u,Q.p=r,O.T=a}}hn=3}}function zg(){if(hn===4||hn===3){hn=0,et();var e=Ca,n=nr,a=ea,r=Mg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?hn=5:(hn=0,nr=Ca=null,Bg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ra=null),Ds(a),n=n.stateNode,Xt&&typeof Xt.onCommitFiberRoot=="function")try{Xt.onCommitFiberRoot(Yt,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=O.T,u=Q.p,Q.p=2,O.T=null;try{for(var f=e.onRecoverableError,g=0;g<r.length;g++){var E=r[g];f(E.value,{componentStack:E.stack})}}finally{O.T=n,Q.p=u}}(ea&3)!==0&&Bl(),Ni(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===bf?xo++:(xo=0,bf=e):xo=0,Mo(0)}}function Bg(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,eo(n)))}function Bl(){return Og(),Pg(),zg(),Ig()}function Ig(){if(hn!==5)return!1;var e=Ca,n=Ef;Ef=0;var a=Ds(ea),r=O.T,u=Q.p;try{Q.p=32>a?32:a,O.T=null,a=Tf,Tf=null;var f=Ca,g=ea;if(hn=0,nr=Ca=null,ea=0,(De&6)!==0)throw Error(s(331));var E=De;if(De|=4,Sg(f.current),gg(f,f.current,g,a),De=E,Mo(0,!1),Xt&&typeof Xt.onPostCommitFiberRoot=="function")try{Xt.onPostCommitFiberRoot(Yt,f)}catch{}return!0}finally{Q.p=u,O.T=r,Bg(e,n)}}function Fg(e,n,a){n=ri(a,n),n=nf(e.stateNode,n,2),e=xa(e,n,2),e!==null&&(yn(e,2),Ni(e))}function Ne(e,n,a){if(e.tag===3)Fg(e,e,a);else for(;n!==null;){if(n.tag===3){Fg(n,e,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ra===null||!Ra.has(r))){e=ri(a,e),a=Hm(2),r=xa(n,a,2),r!==null&&(Gm(a,r,n,e),yn(r,2),Ni(r));break}}n=n.return}}function Cf(e,n,a){var r=e.pingCache;if(r===null){r=e.pingCache=new WS;var u=new Set;r.set(n,u)}else u=r.get(n),u===void 0&&(u=new Set,r.set(n,u));u.has(a)||(yf=!0,u.add(a),e=KS.bind(null,e,n,a),n.then(e,e))}function KS(e,n,a){var r=e.pingCache;r!==null&&r.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,Ve===e&&(ye&a)===a&&(Je===4||Je===3&&(ye&62914560)===ye&&300>ft()-Ul?(De&2)===0&&ir(e,0):xf|=a,er===ye&&(er=0)),Ni(e)}function Hg(e,n){n===0&&(n=un()),e=ns(e,n),e!==null&&(yn(e,n),Ni(e))}function QS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),Hg(e,a)}function JS(e,n){var a=0;switch(e.tag){case 31:case 13:var r=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),Hg(e,a)}function $S(e,n){return Wt(e,n)}var Il=null,sr=null,wf=!1,Fl=!1,Df=!1,Da=0;function Ni(e){e!==sr&&e.next===null&&(sr===null?Il=sr=e:sr=sr.next=e),Fl=!0,wf||(wf=!0,ey())}function Mo(e,n){if(!Df&&Fl){Df=!0;do for(var a=!1,r=Il;r!==null;){if(e!==0){var u=r.pendingLanes;if(u===0)var f=0;else{var g=r.suspendedLanes,E=r.pingedLanes;f=(1<<31-Jt(42|e)+1)-1,f&=u&~(g&~E),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,Xg(r,f))}else f=ye,f=Dt(r,r===Ve?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||$t(r,f)||(a=!0,Xg(r,f));r=r.next}while(a);Df=!1}}function ty(){Gg()}function Gg(){Fl=wf=!1;var e=0;Da!==0&&fy()&&(e=Da);for(var n=ft(),a=null,r=Il;r!==null;){var u=r.next,f=Vg(r,n);f===0?(r.next=null,a===null?Il=u:a.next=u,u===null&&(sr=a)):(a=r,(e!==0||(f&3)!==0)&&(Fl=!0)),r=u}hn!==0&&hn!==5||Mo(e),Da!==0&&(Da=0)}function Vg(e,n){for(var a=e.suspendedLanes,r=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var g=31-Jt(f),E=1<<g,z=u[g];z===-1?((E&a)===0||(E&r)!==0)&&(u[g]=Ye(E,n)):z<=n&&(e.expiredLanes|=E),f&=~E}if(n=Ve,a=ye,a=Dt(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,a===0||e===n&&(Le===2||Le===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&D(r),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||$t(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(r!==null&&D(r),Ds(a)){case 2:case 8:a=kt;break;case 32:a=Ct;break;case 268435456:a=ve;break;default:a=Ct}return r=kg.bind(null,e),a=Wt(a,r),e.callbackPriority=n,e.callbackNode=a,n}return r!==null&&r!==null&&D(r),e.callbackPriority=2,e.callbackNode=null,2}function kg(e,n){if(hn!==0&&hn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Bl()&&e.callbackNode!==a)return null;var r=ye;return r=Dt(e,e===Ve?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Tg(e,r,n),Vg(e,ft()),e.callbackNode!=null&&e.callbackNode===a?kg.bind(null,e):null)}function Xg(e,n){if(Bl())return null;Tg(e,n,!0)}function ey(){dy(function(){(De&6)!==0?Wt(dt,ty):Gg()})}function Uf(){if(Da===0){var e=Xs;e===0&&(e=At,At<<=1,(At&261888)===0&&(At=256)),Da=e}return Da}function Wg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Yo(""+e)}function qg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function ny(e,n,a,r,u){if(n==="submit"&&a&&a.stateNode===u){var f=Wg((u[xn]||null).action),g=r.submitter;g&&(n=(n=g[xn]||null)?Wg(n.formAction):g.getAttribute("formAction"),n!==null&&(f=n,g=null));var E=new Qo("action","action",null,r,u);e.push({event:E,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Da!==0){var z=g?qg(u,g):new FormData(u);Ku(a,{pending:!0,data:z,method:u.method,action:f},null,z)}}else typeof f=="function"&&(E.preventDefault(),z=g?qg(u,g):new FormData(u),Ku(a,{pending:!0,data:z,method:u.method,action:f},f,z))},currentTarget:u}]})}}for(var Lf=0;Lf<du.length;Lf++){var Nf=du[Lf],iy=Nf.toLowerCase(),ay=Nf[0].toUpperCase()+Nf.slice(1);vi(iy,"on"+ay)}vi(Ep,"onAnimationEnd"),vi(Tp,"onAnimationIteration"),vi(bp,"onAnimationStart"),vi("dblclick","onDoubleClick"),vi("focusin","onFocus"),vi("focusout","onBlur"),vi(yS,"onTransitionRun"),vi(xS,"onTransitionStart"),vi(MS,"onTransitionCancel"),vi(Ap,"onTransitionEnd"),Kt("onMouseEnter",["mouseout","mouseover"]),Kt("onMouseLeave",["mouseout","mouseover"]),Kt("onPointerEnter",["pointerout","pointerover"]),Kt("onPointerLeave",["pointerout","pointerover"]),Ot("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ot("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ot("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ot("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ot("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ot("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Eo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eo));function Yg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],u=r.event;r=r.listeners;t:{var f=void 0;if(n)for(var g=r.length-1;0<=g;g--){var E=r[g],z=E.instance,$=E.currentTarget;if(E=E.listener,z!==f&&u.isPropagationStopped())break t;f=E,u.currentTarget=$;try{f(u)}catch(ut){tl(ut)}u.currentTarget=null,f=z}else for(g=0;g<r.length;g++){if(E=r[g],z=E.instance,$=E.currentTarget,E=E.listener,z!==f&&u.isPropagationStopped())break t;f=E,u.currentTarget=$;try{f(u)}catch(ut){tl(ut)}u.currentTarget=null,f=z}}}}function me(e,n){var a=n[kr];a===void 0&&(a=n[kr]=new Set);var r=e+"__bubble";a.has(r)||(jg(n,e,2,!1),a.add(r))}function Of(e,n,a){var r=0;n&&(r|=4),jg(a,e,r,n)}var Hl="_reactListening"+Math.random().toString(36).slice(2);function Pf(e){if(!e[Hl]){e[Hl]=!0,Ut.forEach(function(a){a!=="selectionchange"&&(sy.has(a)||Of(a,!1,e),Of(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Hl]||(n[Hl]=!0,Of("selectionchange",!1,n))}}function jg(e,n,a,r){switch(E_(n)){case 2:var u=Ny;break;case 8:u=Oy;break;default:u=Kf}a=u.bind(null,n,a,e),u=void 0,!tu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),r?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function zf(e,n,a,r,u){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var g=r.tag;if(g===3||g===4){var E=r.stateNode.containerInfo;if(E===u)break;if(g===4)for(g=r.return;g!==null;){var z=g.tag;if((z===3||z===4)&&g.stateNode.containerInfo===u)return;g=g.return}for(;E!==null;){if(g=k(E),g===null)return;if(z=g.tag,z===5||z===6||z===26||z===27){r=f=g;continue t}E=E.parentNode}}r=r.return}$d(function(){var $=f,ut=Jc(a),pt=[];t:{var tt=Rp.get(e);if(tt!==void 0){var st=Qo,It=e;switch(e){case"keypress":if(Zo(a)===0)break t;case"keydown":case"keyup":st=Jv;break;case"focusin":It="focus",st=au;break;case"focusout":It="blur",st=au;break;case"beforeblur":case"afterblur":st=au;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":st=np;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":st=Hv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":st=eS;break;case Ep:case Tp:case bp:st=kv;break;case Ap:st=iS;break;case"scroll":case"scrollend":st=Iv;break;case"wheel":st=sS;break;case"copy":case"cut":case"paste":st=Wv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":st=ap;break;case"toggle":case"beforetoggle":st=oS}var Qt=(n&4)!==0,Ie=!Qt&&(e==="scroll"||e==="scrollend"),W=Qt?tt!==null?tt+"Capture":null:tt;Qt=[];for(var H=$,J;H!==null;){var ht=H;if(J=ht.stateNode,ht=ht.tag,ht!==5&&ht!==26&&ht!==27||J===null||W===null||(ht=Xr(H,W),ht!=null&&Qt.push(To(H,ht,J))),Ie)break;H=H.return}0<Qt.length&&(tt=new st(tt,It,null,a,ut),pt.push({event:tt,listeners:Qt}))}}if((n&7)===0){t:{if(tt=e==="mouseover"||e==="pointerover",st=e==="mouseout"||e==="pointerout",tt&&a!==Qc&&(It=a.relatedTarget||a.fromElement)&&(k(It)||It[Ii]))break t;if((st||tt)&&(tt=ut.window===ut?ut:(tt=ut.ownerDocument)?tt.defaultView||tt.parentWindow:window,st?(It=a.relatedTarget||a.toElement,st=$,It=It?k(It):null,It!==null&&(Ie=c(It),Qt=It.tag,It!==Ie||Qt!==5&&Qt!==27&&Qt!==6)&&(It=null)):(st=null,It=$),st!==It)){if(Qt=np,ht="onMouseLeave",W="onMouseEnter",H="mouse",(e==="pointerout"||e==="pointerover")&&(Qt=ap,ht="onPointerLeave",W="onPointerEnter",H="pointer"),Ie=st==null?tt:at(st),J=It==null?tt:at(It),tt=new Qt(ht,H+"leave",st,a,ut),tt.target=Ie,tt.relatedTarget=J,ht=null,k(ut)===$&&(Qt=new Qt(W,H+"enter",It,a,ut),Qt.target=J,Qt.relatedTarget=Ie,ht=Qt),Ie=ht,st&&It)e:{for(Qt=ry,W=st,H=It,J=0,ht=W;ht;ht=Qt(ht))J++;ht=0;for(var Zt=H;Zt;Zt=Qt(Zt))ht++;for(;0<J-ht;)W=Qt(W),J--;for(;0<ht-J;)H=Qt(H),ht--;for(;J--;){if(W===H||H!==null&&W===H.alternate){Qt=W;break e}W=Qt(W),H=Qt(H)}Qt=null}else Qt=null;st!==null&&Zg(pt,tt,st,Qt,!1),It!==null&&Ie!==null&&Zg(pt,Ie,It,Qt,!0)}}t:{if(tt=$?at($):window,st=tt.nodeName&&tt.nodeName.toLowerCase(),st==="select"||st==="input"&&tt.type==="file")var Re=hp;else if(up(tt))if(dp)Re=_S;else{Re=mS;var Vt=pS}else st=tt.nodeName,!st||st.toLowerCase()!=="input"||tt.type!=="checkbox"&&tt.type!=="radio"?$&&Kc($.elementType)&&(Re=hp):Re=gS;if(Re&&(Re=Re(e,$))){fp(pt,Re,a,ut);break t}Vt&&Vt(e,tt,$),e==="focusout"&&$&&tt.type==="number"&&$.memoizedProps.value!=null&&fn(tt,"number",tt.value)}switch(Vt=$?at($):window,e){case"focusin":(up(Vt)||Vt.contentEditable==="true")&&(zs=Vt,uu=$,Jr=null);break;case"focusout":Jr=uu=zs=null;break;case"mousedown":fu=!0;break;case"contextmenu":case"mouseup":case"dragend":fu=!1,xp(pt,a,ut);break;case"selectionchange":if(SS)break;case"keydown":case"keyup":xp(pt,a,ut)}var oe;if(ru)t:{switch(e){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else Ps?lp(e,a)&&(xe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(xe="onCompositionStart");xe&&(sp&&a.locale!=="ko"&&(Ps||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&Ps&&(oe=tp()):(pa=ut,eu="value"in pa?pa.value:pa.textContent,Ps=!0)),Vt=Gl($,xe),0<Vt.length&&(xe=new ip(xe,e,null,a,ut),pt.push({event:xe,listeners:Vt}),oe?xe.data=oe:(oe=cp(a),oe!==null&&(xe.data=oe)))),(oe=cS?uS(e,a):fS(e,a))&&(xe=Gl($,"onBeforeInput"),0<xe.length&&(Vt=new ip("onBeforeInput","beforeinput",null,a,ut),pt.push({event:Vt,listeners:xe}),Vt.data=oe)),ny(pt,e,$,a,ut)}Yg(pt,n)})}function To(e,n,a){return{instance:e,listener:n,currentTarget:a}}function Gl(e,n){for(var a=n+"Capture",r=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Xr(e,a),u!=null&&r.unshift(To(e,u,f)),u=Xr(e,n),u!=null&&r.push(To(e,u,f))),e.tag===3)return r;e=e.return}return[]}function ry(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Zg(e,n,a,r,u){for(var f=n._reactName,g=[];a!==null&&a!==r;){var E=a,z=E.alternate,$=E.stateNode;if(E=E.tag,z!==null&&z===r)break;E!==5&&E!==26&&E!==27||$===null||(z=$,u?($=Xr(a,f),$!=null&&g.unshift(To(a,$,z))):u||($=Xr(a,f),$!=null&&g.push(To(a,$,z)))),a=a.return}g.length!==0&&e.push({event:n,listeners:g})}var oy=/\r\n?/g,ly=/\u0000|\uFFFD/g;function Kg(e){return(typeof e=="string"?e:""+e).replace(oy,`
`).replace(ly,"")}function Qg(e,n){return n=Kg(n),Kg(e)===n}function Be(e,n,a,r,u,f){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||Ls(e,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&Ls(e,""+r);break;case"className":Ge(e,"class",r);break;case"tabIndex":Ge(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Ge(e,a,r);break;case"style":Qd(e,r,f);break;case"data":if(n!=="object"){Ge(e,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=Yo(""+r),e.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Be(e,n,"name",u.name,u,null),Be(e,n,"formEncType",u.formEncType,u,null),Be(e,n,"formMethod",u.formMethod,u,null),Be(e,n,"formTarget",u.formTarget,u,null)):(Be(e,n,"encType",u.encType,u,null),Be(e,n,"method",u.method,u,null),Be(e,n,"target",u.target,u,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=Yo(""+r),e.setAttribute(a,r);break;case"onClick":r!=null&&(e.onclick=Hi);break;case"onScroll":r!=null&&me("scroll",e);break;case"onScrollEnd":r!=null&&me("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}a=Yo(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""+r):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":r===!0?e.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(a,r):e.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(a):e.setAttribute(a,r);break;case"popover":me("beforetoggle",e),me("toggle",e),ke(e,"popover",r);break;case"xlinkActuate":se(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":se(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":se(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":se(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":se(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":se(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":se(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":se(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":se(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":ke(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=zv.get(a)||a,ke(e,a,r))}}function Bf(e,n,a,r,u,f){switch(a){case"style":Qd(e,r,f);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(u.children!=null)throw Error(s(60));e.innerHTML=a}}break;case"children":typeof r=="string"?Ls(e,r):(typeof r=="number"||typeof r=="bigint")&&Ls(e,""+r);break;case"onScroll":r!=null&&me("scroll",e);break;case"onScrollEnd":r!=null&&me("scrollend",e);break;case"onClick":r!=null&&(e.onclick=Hi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Pt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[xn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof r=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,r,u);break t}a in e?e[a]=r:r===!0?e.setAttribute(a,""):ke(e,a,r)}}}function bn(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":me("error",e),me("load",e);var r=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var g=a[f];if(g!=null)switch(f){case"src":r=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Be(e,n,f,g,a,null)}}u&&Be(e,n,"srcSet",a.srcSet,a,null),r&&Be(e,n,"src",a.src,a,null);return;case"input":me("invalid",e);var E=f=g=u=null,z=null,$=null;for(r in a)if(a.hasOwnProperty(r)){var ut=a[r];if(ut!=null)switch(r){case"name":u=ut;break;case"type":g=ut;break;case"checked":z=ut;break;case"defaultChecked":$=ut;break;case"value":f=ut;break;case"defaultValue":E=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:Be(e,n,r,ut,a,null)}}Nn(e,f,E,z,$,g,u,!1);return;case"select":me("invalid",e),r=g=f=null;for(u in a)if(a.hasOwnProperty(u)&&(E=a[u],E!=null))switch(u){case"value":f=E;break;case"defaultValue":g=E;break;case"multiple":r=E;default:Be(e,n,u,E,a,null)}n=f,a=g,e.multiple=!!r,n!=null?tn(e,!!r,n,!1):a!=null&&tn(e,!!r,a,!0);return;case"textarea":me("invalid",e),f=u=r=null;for(g in a)if(a.hasOwnProperty(g)&&(E=a[g],E!=null))switch(g){case"value":r=E;break;case"defaultValue":u=E;break;case"children":f=E;break;case"dangerouslySetInnerHTML":if(E!=null)throw Error(s(91));break;default:Be(e,n,g,E,a,null)}wi(e,r,u,f);return;case"option":for(z in a)if(a.hasOwnProperty(z)&&(r=a[z],r!=null))switch(z){case"selected":e.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Be(e,n,z,r,a,null)}return;case"dialog":me("beforetoggle",e),me("toggle",e),me("cancel",e),me("close",e);break;case"iframe":case"object":me("load",e);break;case"video":case"audio":for(r=0;r<Eo.length;r++)me(Eo[r],e);break;case"image":me("error",e),me("load",e);break;case"details":me("toggle",e);break;case"embed":case"source":case"link":me("error",e),me("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for($ in a)if(a.hasOwnProperty($)&&(r=a[$],r!=null))switch($){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Be(e,n,$,r,a,null)}return;default:if(Kc(n)){for(ut in a)a.hasOwnProperty(ut)&&(r=a[ut],r!==void 0&&Bf(e,n,ut,r,a,void 0));return}}for(E in a)a.hasOwnProperty(E)&&(r=a[E],r!=null&&Be(e,n,E,r,a,null))}function cy(e,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,g=null,E=null,z=null,$=null,ut=null;for(st in a){var pt=a[st];if(a.hasOwnProperty(st)&&pt!=null)switch(st){case"checked":break;case"value":break;case"defaultValue":z=pt;default:r.hasOwnProperty(st)||Be(e,n,st,null,r,pt)}}for(var tt in r){var st=r[tt];if(pt=a[tt],r.hasOwnProperty(tt)&&(st!=null||pt!=null))switch(tt){case"type":f=st;break;case"name":u=st;break;case"checked":$=st;break;case"defaultChecked":ut=st;break;case"value":g=st;break;case"defaultValue":E=st;break;case"children":case"dangerouslySetInnerHTML":if(st!=null)throw Error(s(137,n));break;default:st!==pt&&Be(e,n,tt,st,r,pt)}}Rn(e,g,E,z,$,ut,f,u);return;case"select":st=g=E=tt=null;for(f in a)if(z=a[f],a.hasOwnProperty(f)&&z!=null)switch(f){case"value":break;case"multiple":st=z;default:r.hasOwnProperty(f)||Be(e,n,f,null,r,z)}for(u in r)if(f=r[u],z=a[u],r.hasOwnProperty(u)&&(f!=null||z!=null))switch(u){case"value":tt=f;break;case"defaultValue":E=f;break;case"multiple":g=f;default:f!==z&&Be(e,n,u,f,r,z)}n=E,a=g,r=st,tt!=null?tn(e,!!a,tt,!1):!!r!=!!a&&(n!=null?tn(e,!!a,n,!0):tn(e,!!a,a?[]:"",!1));return;case"textarea":st=tt=null;for(E in a)if(u=a[E],a.hasOwnProperty(E)&&u!=null&&!r.hasOwnProperty(E))switch(E){case"value":break;case"children":break;default:Be(e,n,E,null,r,u)}for(g in r)if(u=r[g],f=a[g],r.hasOwnProperty(g)&&(u!=null||f!=null))switch(g){case"value":tt=u;break;case"defaultValue":st=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Be(e,n,g,u,r,f)}Us(e,tt,st);return;case"option":for(var It in a)if(tt=a[It],a.hasOwnProperty(It)&&tt!=null&&!r.hasOwnProperty(It))switch(It){case"selected":e.selected=!1;break;default:Be(e,n,It,null,r,tt)}for(z in r)if(tt=r[z],st=a[z],r.hasOwnProperty(z)&&tt!==st&&(tt!=null||st!=null))switch(z){case"selected":e.selected=tt&&typeof tt!="function"&&typeof tt!="symbol";break;default:Be(e,n,z,tt,r,st)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Qt in a)tt=a[Qt],a.hasOwnProperty(Qt)&&tt!=null&&!r.hasOwnProperty(Qt)&&Be(e,n,Qt,null,r,tt);for($ in r)if(tt=r[$],st=a[$],r.hasOwnProperty($)&&tt!==st&&(tt!=null||st!=null))switch($){case"children":case"dangerouslySetInnerHTML":if(tt!=null)throw Error(s(137,n));break;default:Be(e,n,$,tt,r,st)}return;default:if(Kc(n)){for(var Ie in a)tt=a[Ie],a.hasOwnProperty(Ie)&&tt!==void 0&&!r.hasOwnProperty(Ie)&&Bf(e,n,Ie,void 0,r,tt);for(ut in r)tt=r[ut],st=a[ut],!r.hasOwnProperty(ut)||tt===st||tt===void 0&&st===void 0||Bf(e,n,ut,tt,r,st);return}}for(var W in a)tt=a[W],a.hasOwnProperty(W)&&tt!=null&&!r.hasOwnProperty(W)&&Be(e,n,W,null,r,tt);for(pt in r)tt=r[pt],st=a[pt],!r.hasOwnProperty(pt)||tt===st||tt==null&&st==null||Be(e,n,pt,tt,r,st)}function Jg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function uy(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var u=a[r],f=u.transferSize,g=u.initiatorType,E=u.duration;if(f&&E&&Jg(g)){for(g=0,E=u.responseEnd,r+=1;r<a.length;r++){var z=a[r],$=z.startTime;if($>E)break;var ut=z.transferSize,pt=z.initiatorType;ut&&Jg(pt)&&(z=z.responseEnd,g+=ut*(z<E?1:(E-$)/(z-$)))}if(--r,n+=8*(f+g)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var If=null,Ff=null;function Vl(e){return e.nodeType===9?e:e.ownerDocument}function $g(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function t_(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Hf(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Gf=null;function fy(){var e=window.event;return e&&e.type==="popstate"?e===Gf?!1:(Gf=e,!0):(Gf=null,!1)}var e_=typeof setTimeout=="function"?setTimeout:void 0,hy=typeof clearTimeout=="function"?clearTimeout:void 0,n_=typeof Promise=="function"?Promise:void 0,dy=typeof queueMicrotask=="function"?queueMicrotask:typeof n_<"u"?function(e){return n_.resolve(null).then(e).catch(py)}:e_;function py(e){setTimeout(function(){throw e})}function Ua(e){return e==="head"}function i_(e,n){var a=n,r=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(r===0){e.removeChild(u),cr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")bo(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,bo(a);for(var f=a.firstChild;f;){var g=f.nextSibling,E=f.nodeName;f[Qa]||E==="SCRIPT"||E==="STYLE"||E==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=g}}else a==="body"&&bo(e.ownerDocument.body);a=u}while(a);cr(n)}function a_(e,n){var a=e;e=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=r}while(a)}function Vf(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Vf(a),C(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function my(e,n,a,r){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[Qa])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=fi(e.nextSibling),e===null)break}return null}function gy(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=fi(e.nextSibling),e===null))return null;return e}function s_(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=fi(e.nextSibling),e===null))return null;return e}function kf(e){return e.data==="$?"||e.data==="$~"}function Xf(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function _y(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function fi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var Wf=null;function r_(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return fi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function o_(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function l_(e,n,a){switch(n=Vl(a),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function bo(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);C(e)}var hi=new Map,c_=new Set;function kl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var na=Q.d;Q.d={f:vy,r:Sy,D:yy,C:xy,L:My,m:Ey,X:by,S:Ty,M:Ay};function vy(){var e=na.f(),n=Ol();return e||n}function Sy(e){var n=it(e);n!==null&&n.tag===5&&n.type==="form"?Am(n):na.r(e)}var rr=typeof document>"u"?null:document;function u_(e,n,a){var r=rr;if(r&&typeof n=="string"&&n){var u=de(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),c_.has(u)||(c_.add(u),e={rel:e,crossOrigin:a,href:n},r.querySelector(u)===null&&(n=r.createElement("link"),bn(n,"link",e),vt(n),r.head.appendChild(n)))}}function yy(e){na.D(e),u_("dns-prefetch",e,null)}function xy(e,n){na.C(e,n),u_("preconnect",e,n)}function My(e,n,a){na.L(e,n,a);var r=rr;if(r&&e&&n){var u='link[rel="preload"][as="'+de(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+de(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+de(a.imageSizes)+'"]')):u+='[href="'+de(e)+'"]';var f=u;switch(n){case"style":f=or(e);break;case"script":f=lr(e)}hi.has(f)||(e=S({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),hi.set(f,e),r.querySelector(u)!==null||n==="style"&&r.querySelector(Ao(f))||n==="script"&&r.querySelector(Ro(f))||(n=r.createElement("link"),bn(n,"link",e),vt(n),r.head.appendChild(n)))}}function Ey(e,n){na.m(e,n);var a=rr;if(a&&e){var r=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+de(r)+'"][href="'+de(e)+'"]',f=u;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=lr(e)}if(!hi.has(f)&&(e=S({rel:"modulepreload",href:e},n),hi.set(f,e),a.querySelector(u)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ro(f)))return}r=a.createElement("link"),bn(r,"link",e),vt(r),a.head.appendChild(r)}}}function Ty(e,n,a){na.S(e,n,a);var r=rr;if(r&&e){var u=X(r).hoistableStyles,f=or(e);n=n||"default";var g=u.get(f);if(!g){var E={loading:0,preload:null};if(g=r.querySelector(Ao(f)))E.loading=5;else{e=S({rel:"stylesheet",href:e,"data-precedence":n},a),(a=hi.get(f))&&qf(e,a);var z=g=r.createElement("link");vt(z),bn(z,"link",e),z._p=new Promise(function($,ut){z.onload=$,z.onerror=ut}),z.addEventListener("load",function(){E.loading|=1}),z.addEventListener("error",function(){E.loading|=2}),E.loading|=4,Xl(g,n,r)}g={type:"stylesheet",instance:g,count:1,state:E},u.set(f,g)}}}function by(e,n){na.X(e,n);var a=rr;if(a&&e){var r=X(a).hoistableScripts,u=lr(e),f=r.get(u);f||(f=a.querySelector(Ro(u)),f||(e=S({src:e,async:!0},n),(n=hi.get(u))&&Yf(e,n),f=a.createElement("script"),vt(f),bn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(u,f))}}function Ay(e,n){na.M(e,n);var a=rr;if(a&&e){var r=X(a).hoistableScripts,u=lr(e),f=r.get(u);f||(f=a.querySelector(Ro(u)),f||(e=S({src:e,async:!0,type:"module"},n),(n=hi.get(u))&&Yf(e,n),f=a.createElement("script"),vt(f),bn(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(u,f))}}function f_(e,n,a,r){var u=(u=Et.current)?kl(u):null;if(!u)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=or(a.href),a=X(u).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=or(a.href);var f=X(u).hoistableStyles,g=f.get(e);if(g||(u=u.ownerDocument||u,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,g),(f=u.querySelector(Ao(e)))&&!f._p&&(g.instance=f,g.state.loading=5),hi.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},hi.set(e,a),f||Ry(u,e,a,g.state))),n&&r===null)throw Error(s(528,""));return g}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=lr(a),a=X(u).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function or(e){return'href="'+de(e)+'"'}function Ao(e){return'link[rel="stylesheet"]['+e+"]"}function h_(e){return S({},e,{"data-precedence":e.precedence,precedence:null})}function Ry(e,n,a,r){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=e.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),bn(n,"link",a),vt(n),e.head.appendChild(n))}function lr(e){return'[src="'+de(e)+'"]'}function Ro(e){return"script[async]"+e}function d_(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=e.querySelector('style[data-href~="'+de(a.href)+'"]');if(r)return n.instance=r,vt(r),r;var u=S({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),vt(r),bn(r,"style",u),Xl(r,a.precedence,e),n.instance=r;case"stylesheet":u=or(a.href);var f=e.querySelector(Ao(u));if(f)return n.state.loading|=4,n.instance=f,vt(f),f;r=h_(a),(u=hi.get(u))&&qf(r,u),f=(e.ownerDocument||e).createElement("link"),vt(f);var g=f;return g._p=new Promise(function(E,z){g.onload=E,g.onerror=z}),bn(f,"link",r),n.state.loading|=4,Xl(f,a.precedence,e),n.instance=f;case"script":return f=lr(a.src),(u=e.querySelector(Ro(f)))?(n.instance=u,vt(u),u):(r=a,(u=hi.get(f))&&(r=S({},a),Yf(r,u)),e=e.ownerDocument||e,u=e.createElement("script"),vt(u),bn(u,"link",r),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Xl(r,a.precedence,e));return n.instance}function Xl(e,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=r.length?r[r.length-1]:null,f=u,g=0;g<r.length;g++){var E=r[g];if(E.dataset.precedence===n)f=E;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function qf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Yf(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Wl=null;function p_(e,n,a){if(Wl===null){var r=new Map,u=Wl=new Map;u.set(a,r)}else u=Wl,r=u.get(a),r||(r=new Map,u.set(a,r));if(r.has(e))return r;for(r.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[Qa]||f[Ke]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var g=f.getAttribute(n)||"";g=e+g;var E=r.get(g);E?E.push(f):r.set(g,[f])}}return r}function m_(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function Cy(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function g_(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function wy(e,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=or(r.href),f=n.querySelector(Ao(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=ql.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,vt(f);return}f=n.ownerDocument||n,r=h_(r),(u=hi.get(u))&&qf(r,u),f=f.createElement("link"),vt(f);var g=f;g._p=new Promise(function(E,z){g.onload=E,g.onerror=z}),bn(f,"link",r),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=ql.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var jf=0;function Dy(e,n){return e.stylesheets&&e.count===0&&jl(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var r=setTimeout(function(){if(e.stylesheets&&jl(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&jf===0&&(jf=62500*uy());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&jl(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>jf?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(u)}}:null}function ql(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)jl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yl=null;function jl(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yl=new Map,n.forEach(Uy,e),Yl=null,ql.call(e))}function Uy(e,n){if(!(n.state.loading&4)){var a=Yl.get(e);if(a)var r=a.get(null);else{a=new Map,Yl.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var g=u[f];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),r=g)}r&&a.set(null,r)}u=n.instance,g=u.getAttribute("data-precedence"),f=a.get(g)||r,f===r&&a.set(null,u),a.set(g,u),this.count++,r=ql.bind(this),u.addEventListener("load",r),u.addEventListener("error",r),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Co={$$typeof:N,Provider:null,Consumer:null,_currentValue:Z,_currentValue2:Z,_threadCount:0};function Ly(e,n,a,r,u,f,g,E,z){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ee(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ee(0),this.hiddenUpdates=Ee(null),this.identifierPrefix=r,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function __(e,n,a,r,u,f,g,E,z,$,ut,pt){return e=new Ly(e,n,a,g,z,$,ut,pt,E),n=1,f===!0&&(n|=24),f=Kn(3,null,null,n),e.current=f,f.stateNode=e,n=Au(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Du(f),e}function v_(e){return e?(e=Fs,e):Fs}function S_(e,n,a,r,u,f){u=v_(u),r.context===null?r.context=u:r.pendingContext=u,r=ya(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=xa(e,r,n),a!==null&&(Vn(a,e,n),so(a,e,n))}function y_(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function Zf(e,n){y_(e,n),(e=e.alternate)&&y_(e,n)}function x_(e){if(e.tag===13||e.tag===31){var n=ns(e,67108864);n!==null&&Vn(n,e,67108864),Zf(e,67108864)}}function M_(e){if(e.tag===13||e.tag===31){var n=ei();n=Za(n);var a=ns(e,n);a!==null&&Vn(a,e,n),Zf(e,n)}}var Zl=!0;function Ny(e,n,a,r){var u=O.T;O.T=null;var f=Q.p;try{Q.p=2,Kf(e,n,a,r)}finally{Q.p=f,O.T=u}}function Oy(e,n,a,r){var u=O.T;O.T=null;var f=Q.p;try{Q.p=8,Kf(e,n,a,r)}finally{Q.p=f,O.T=u}}function Kf(e,n,a,r){if(Zl){var u=Qf(r);if(u===null)zf(e,n,r,Kl,a),T_(e,r);else if(zy(u,e,n,a,r))r.stopPropagation();else if(T_(e,r),n&4&&-1<Py.indexOf(e)){for(;u!==null;){var f=it(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var g=Rt(f.pendingLanes);if(g!==0){var E=f;for(E.pendingLanes|=2,E.entangledLanes|=2;g;){var z=1<<31-Jt(g);E.entanglements[1]|=z,g&=~z}Ni(f),(De&6)===0&&(Ll=ft()+500,Mo(0))}}break;case 31:case 13:E=ns(f,2),E!==null&&Vn(E,f,2),Ol(),Zf(f,2)}if(f=Qf(r),f===null&&zf(e,n,r,Kl,a),f===u)break;u=f}u!==null&&r.stopPropagation()}else zf(e,n,r,null,a)}}function Qf(e){return e=Jc(e),Jf(e)}var Kl=null;function Jf(e){if(Kl=null,e=k(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Kl=e,null}function E_(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Mt()){case dt:return 2;case kt:return 8;case Ct:case zt:return 32;case ve:return 268435456;default:return 32}default:return 32}}var $f=!1,La=null,Na=null,Oa=null,wo=new Map,Do=new Map,Pa=[],Py="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function T_(e,n){switch(e){case"focusin":case"focusout":La=null;break;case"dragenter":case"dragleave":Na=null;break;case"mouseover":case"mouseout":Oa=null;break;case"pointerover":case"pointerout":wo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Do.delete(n.pointerId)}}function Uo(e,n,a,r,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[u]},n!==null&&(n=it(n),n!==null&&x_(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function zy(e,n,a,r,u){switch(n){case"focusin":return La=Uo(La,e,n,a,r,u),!0;case"dragenter":return Na=Uo(Na,e,n,a,r,u),!0;case"mouseover":return Oa=Uo(Oa,e,n,a,r,u),!0;case"pointerover":var f=u.pointerId;return wo.set(f,Uo(wo.get(f)||null,e,n,a,r,u)),!0;case"gotpointercapture":return f=u.pointerId,Do.set(f,Uo(Do.get(f)||null,e,n,a,r,u)),!0}return!1}function b_(e){var n=k(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Ka(e.priority,function(){M_(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,Ka(e.priority,function(){M_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ql(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=Qf(e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);Qc=r,a.target.dispatchEvent(r),Qc=null}else return n=it(a),n!==null&&x_(n),e.blockedOn=a,!1;n.shift()}return!0}function A_(e,n,a){Ql(e)&&a.delete(n)}function By(){$f=!1,La!==null&&Ql(La)&&(La=null),Na!==null&&Ql(Na)&&(Na=null),Oa!==null&&Ql(Oa)&&(Oa=null),wo.forEach(A_),Do.forEach(A_)}function Jl(e,n){e.blockedOn===n&&(e.blockedOn=null,$f||($f=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,By)))}var $l=null;function R_(e){$l!==e&&($l=e,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){$l===e&&($l=null);for(var n=0;n<e.length;n+=3){var a=e[n],r=e[n+1],u=e[n+2];if(typeof r!="function"){if(Jf(r||a)===null)continue;break}var f=it(a);f!==null&&(e.splice(n,3),n-=3,Ku(f,{pending:!0,data:u,method:a.method,action:r},r,u))}}))}function cr(e){function n(z){return Jl(z,e)}La!==null&&Jl(La,e),Na!==null&&Jl(Na,e),Oa!==null&&Jl(Oa,e),wo.forEach(n),Do.forEach(n);for(var a=0;a<Pa.length;a++){var r=Pa[a];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Pa.length&&(a=Pa[0],a.blockedOn===null);)b_(a),a.blockedOn===null&&Pa.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var u=a[r],f=a[r+1],g=u[xn]||null;if(typeof f=="function")g||R_(a);else if(g){var E=null;if(f&&f.hasAttribute("formAction")){if(u=f,g=f[xn]||null)E=g.formAction;else if(Jf(u)!==null)continue}else E=g.action;typeof E=="function"?a[r+1]=E:(a.splice(r,3),r-=3),R_(a)}}}function C_(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(g){return u=g})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function th(e){this._internalRoot=e}tc.prototype.render=th.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ei();S_(a,r,e,n,null,null)},tc.prototype.unmount=th.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;S_(e.current,2,null,e,null,null),Ol(),n[Ii]=null}};function tc(e){this._internalRoot=e}tc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Vr();e={blockedOn:null,target:e,priority:n};for(var a=0;a<Pa.length&&n!==0&&n<Pa[a].priority;a++);Pa.splice(a,0,e),a===0&&b_(e)}};var w_=t.version;if(w_!=="19.2.8")throw Error(s(527,w_,"19.2.8"));Q.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?_(e):null,e=e===null?null:e.stateNode,e};var Iy={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ec.isDisabled&&ec.supportsFiber)try{Yt=ec.inject(Iy),Xt=ec}catch{}}return No.createRoot=function(e,n){if(!l(e))throw Error(s(299));var a=!1,r="",u=zm,f=Bm,g=Im;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=__(e,1,!1,null,null,a,r,null,u,f,g,C_),e[Ii]=n.current,Pf(e),new th(n)},No.hydrateRoot=function(e,n,a){if(!l(e))throw Error(s(299));var r=!1,u="",f=zm,g=Bm,E=Im,z=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(E=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=__(e,1,!0,n,a??null,r,u,z,f,g,E,C_),n.context=v_(null),a=n.current,r=ei(),r=Za(r),u=ya(r),u.callback=null,xa(a,u,r),a=r,n.current.lanes=a,yn(n,a),Ni(n),e[Ii]=n.current,Pf(e),new tc(n)},No.version="19.2.8",No}var F_;function Ky(){if(F_)return ih.exports;F_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(t){console.error(t)}}return o(),ih.exports=Zy(),ih.exports}var Qy=Ky();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bd="171",Rr={ROTATE:0,DOLLY:1,PAN:2},br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jy=0,H_=1,$y=2,K0=1,Q0=2,la=3,qa=0,qn=1,Ti=2,Xa=0,Cr=1,G_=2,V_=3,k_=4,tx=5,Ms=100,ex=101,nx=102,ix=103,ax=104,sx=200,rx=201,ox=202,lx=203,jh=204,Zh=205,cx=206,ux=207,fx=208,hx=209,dx=210,px=211,mx=212,gx=213,_x=214,Kh=0,Qh=1,Jh=2,Ur=3,$h=4,td=5,ed=6,nd=7,J0=0,vx=1,Sx=2,Wa=0,yx=1,xx=2,Mx=3,Ex=4,Tx=5,bx=6,Ax=7,$0=300,Lr=301,Nr=302,id=303,ad=304,kc=306,sd=1e3,Ts=1001,rd=1002,Ri=1003,Rx=1004,nc=1005,zi=1006,oh=1007,bs=1008,ha=1009,tv=1010,ev=1011,Vo=1012,Id=1013,As=1014,ca=1015,ko=1016,Fd=1017,Hd=1018,Or=1020,nv=35902,iv=1021,av=1022,Ai=1023,sv=1024,rv=1025,wr=1026,Pr=1027,ov=1028,Gd=1029,lv=1030,Vd=1031,kd=1033,wc=33776,Dc=33777,Uc=33778,Lc=33779,od=35840,ld=35841,cd=35842,ud=35843,fd=36196,hd=37492,dd=37496,pd=37808,md=37809,gd=37810,_d=37811,vd=37812,Sd=37813,yd=37814,xd=37815,Md=37816,Ed=37817,Td=37818,bd=37819,Ad=37820,Rd=37821,Nc=36492,Cd=36494,wd=36495,cv=36283,Dd=36284,Ud=36285,Ld=36286,Cx=3200,wx=3201,uv=0,Dx=1,ka="",pi="srgb",zr="srgb-linear",zc="linear",Fe="srgb",ur=7680,X_=519,Ux=512,Lx=513,Nx=514,fv=515,Ox=516,Px=517,zx=518,Bx=519,W_=35044,q_="300 es",ua=2e3,Bc=2001;class Cs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[t]===void 0&&(s[t]=[]),s[t].indexOf(i)===-1&&s[t].push(i)}hasEventListener(t,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[t]!==void 0&&s[t].indexOf(i)!==-1}removeEventListener(t,i){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const s=this._listeners[t.type];if(s!==void 0){t.target=this;const l=s.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oc=Math.PI/180,Nd=180/Math.PI;function Xo(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(wn[o&255]+wn[o>>8&255]+wn[o>>16&255]+wn[o>>24&255]+"-"+wn[t&255]+wn[t>>8&255]+"-"+wn[t>>16&15|64]+wn[t>>24&255]+"-"+wn[i&63|128]+wn[i>>8&255]+"-"+wn[i>>16&255]+wn[i>>24&255]+wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]).toLowerCase()}function ge(o,t,i){return Math.max(t,Math.min(i,o))}function Ix(o,t){return(o%t+t)%t}function lh(o,t,i){return(1-i)*o+i*t}function Oo(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function kn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Fx={DEG2RAD:Oc};class ie{constructor(t=0,i=0){ie.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,s=this.y,l=t.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ge(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y;return i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*s-h*l+t.x,this.y=c*l+h*s+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class le{constructor(t,i,s,l,c,h,d,m,p){le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p)}set(t,i,s,l,c,h,d,m,p){const _=this.elements;return _[0]=t,_[1]=l,_[2]=d,_[3]=i,_[4]=c,_[5]=m,_[6]=s,_[7]=h,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(t,i,s){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],_=s[4],S=s[7],y=s[2],M=s[5],R=s[8],w=l[0],x=l[3],v=l[6],I=l[1],N=l[4],U=l[7],q=l[2],G=l[5],P=l[8];return c[0]=h*w+d*I+m*q,c[3]=h*x+d*N+m*G,c[6]=h*v+d*U+m*P,c[1]=p*w+_*I+S*q,c[4]=p*x+_*N+S*G,c[7]=p*v+_*U+S*P,c[2]=y*w+M*I+R*q,c[5]=y*x+M*N+R*G,c[8]=y*v+M*U+R*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],_=t[8];return i*h*_-i*d*p-s*c*_+s*d*m+l*c*p-l*h*m}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],_=t[8],S=_*h-d*p,y=d*m-_*c,M=p*c-h*m,R=i*S+s*y+l*M;if(R===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/R;return t[0]=S*w,t[1]=(l*p-_*s)*w,t[2]=(d*s-l*h)*w,t[3]=y*w,t[4]=(_*i-l*m)*w,t[5]=(l*c-d*i)*w,t[6]=M*w,t[7]=(s*m-p*i)*w,t[8]=(h*i-s*c)*w,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,s,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(ch.makeScale(t,i)),this}rotate(t){return this.premultiply(ch.makeRotation(-t)),this}translate(t,i){return this.premultiply(ch.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<9;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ch=new le;function hv(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function Ic(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Hx(){const o=Ic("canvas");return o.style.display="block",o}const Y_={};function Tr(o){o in Y_||(Y_[o]=!0,console.warn(o))}function Gx(o,t,i){return new Promise(function(s,l){function c(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function Vx(o){const t=o.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function kx(o){const t=o.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const j_=new le().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Z_=new le().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xx(){const o={enabled:!0,workingColorSpace:zr,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Fe&&(l.r=fa(l.r),l.g=fa(l.g),l.b=fa(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Fe&&(l.r=Dr(l.r),l.g=Dr(l.g),l.b=Dr(l.b))),l},fromWorkingColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},toWorkingColorSpace:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ka?zc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[zr]:{primaries:t,whitePoint:s,transfer:zc,toXYZ:j_,fromXYZ:Z_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:pi},outputColorSpaceConfig:{drawingBufferColorSpace:pi}},[pi]:{primaries:t,whitePoint:s,transfer:Fe,toXYZ:j_,fromXYZ:Z_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:pi}}}),o}const we=Xx();function fa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Dr(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let fr;class Wx{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{fr===void 0&&(fr=Ic("canvas")),fr.width=t.width,fr.height=t.height;const s=fr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=fr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=Ic("canvas");i.width=t.width,i.height=t.height;const s=i.getContext("2d");s.drawImage(t,0,0,t.width,t.height);const l=s.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=fa(c[h]/255)*255;return s.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(fa(i[s]/255)*255):i[s]=fa(i[s]);return{data:i,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qx=0;class dv{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=Xo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(uh(l[h].image)):c.push(uh(l[h]))}else c=uh(l);s.url=c}return i||(t.images[this.uuid]=s),s}}function uh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Wx.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yx=0;class Yn extends Cs{constructor(t=Yn.DEFAULT_IMAGE,i=Yn.DEFAULT_MAPPING,s=Ts,l=Ts,c=zi,h=bs,d=Ai,m=ha,p=Yn.DEFAULT_ANISOTROPY,_=ka){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yx++}),this.uuid=Xo(),this.name="",this.source=new dv(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(t.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sd:t.x=t.x-Math.floor(t.x);break;case Ts:t.x=t.x<0?0:1;break;case rd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sd:t.y=t.y-Math.floor(t.y);break;case Ts:t.y=t.y<0?0:1;break;case rd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=$0;Yn.DEFAULT_ANISOTROPY=1;class $e{constructor(t=0,i=0,s=0,l=1){$e.prototype.isVector4=!0,this.x=t,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,s,l){return this.x=t,this.y=i,this.z=s,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,s,l,c;const m=t.elements,p=m[0],_=m[4],S=m[8],y=m[1],M=m[5],R=m[9],w=m[2],x=m[6],v=m[10];if(Math.abs(_-y)<.01&&Math.abs(S-w)<.01&&Math.abs(R-x)<.01){if(Math.abs(_+y)<.1&&Math.abs(S+w)<.1&&Math.abs(R+x)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const N=(p+1)/2,U=(M+1)/2,q=(v+1)/2,G=(_+y)/4,P=(S+w)/4,K=(R+x)/4;return N>U&&N>q?N<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(N),l=G/s,c=P/s):U>q?U<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(U),s=G/l,c=K/l):q<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(q),s=P/c,l=K/c),this.set(s,l,c,i),this}let I=Math.sqrt((x-R)*(x-R)+(S-w)*(S-w)+(y-_)*(y-_));return Math.abs(I)<.001&&(I=1),this.x=(x-R)/I,this.y=(S-w)/I,this.z=(y-_)/I,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this.w=ge(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this.w=ge(this.w,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jx extends Cs{constructor(t=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=1,this.scissor=new $e(0,0,t,i),this.scissorTest=!1,this.viewport=new $e(0,0,t,i);const l={width:t,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new Yn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,i,s=1){if(this.width!==t||this.height!==i||this.depth!==s){this.width=t,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let s=0,l=t.textures.length;s<l;s++)this.textures[s]=t.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},t.texture.image);return this.texture.source=new dv(i),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rs extends jx{constructor(t=1,i=1,s={}){super(t,i,s),this.isWebGLRenderTarget=!0}}class pv extends Yn{constructor(t=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Ri,this.minFilter=Ri,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zx extends Yn{constructor(t=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:s,depth:l},this.magFilter=Ri,this.minFilter=Ri,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class da{constructor(t=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=s,this._w=l}static slerpFlat(t,i,s,l,c,h,d){let m=s[l+0],p=s[l+1],_=s[l+2],S=s[l+3];const y=c[h+0],M=c[h+1],R=c[h+2],w=c[h+3];if(d===0){t[i+0]=m,t[i+1]=p,t[i+2]=_,t[i+3]=S;return}if(d===1){t[i+0]=y,t[i+1]=M,t[i+2]=R,t[i+3]=w;return}if(S!==w||m!==y||p!==M||_!==R){let x=1-d;const v=m*y+p*M+_*R+S*w,I=v>=0?1:-1,N=1-v*v;if(N>Number.EPSILON){const q=Math.sqrt(N),G=Math.atan2(q,v*I);x=Math.sin(x*G)/q,d=Math.sin(d*G)/q}const U=d*I;if(m=m*x+y*U,p=p*x+M*U,_=_*x+R*U,S=S*x+w*U,x===1-d){const q=1/Math.sqrt(m*m+p*p+_*_+S*S);m*=q,p*=q,_*=q,S*=q}}t[i]=m,t[i+1]=p,t[i+2]=_,t[i+3]=S}static multiplyQuaternionsFlat(t,i,s,l,c,h){const d=s[l],m=s[l+1],p=s[l+2],_=s[l+3],S=c[h],y=c[h+1],M=c[h+2],R=c[h+3];return t[i]=d*R+_*S+m*M-p*y,t[i+1]=m*R+_*y+p*S-d*M,t[i+2]=p*R+_*M+d*y-m*S,t[i+3]=_*R-d*S-m*y-p*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,s,l){return this._x=t,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const s=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(s/2),_=d(l/2),S=d(c/2),y=m(s/2),M=m(l/2),R=m(c/2);switch(h){case"XYZ":this._x=y*_*S+p*M*R,this._y=p*M*S-y*_*R,this._z=p*_*R+y*M*S,this._w=p*_*S-y*M*R;break;case"YXZ":this._x=y*_*S+p*M*R,this._y=p*M*S-y*_*R,this._z=p*_*R-y*M*S,this._w=p*_*S+y*M*R;break;case"ZXY":this._x=y*_*S-p*M*R,this._y=p*M*S+y*_*R,this._z=p*_*R+y*M*S,this._w=p*_*S-y*M*R;break;case"ZYX":this._x=y*_*S-p*M*R,this._y=p*M*S+y*_*R,this._z=p*_*R-y*M*S,this._w=p*_*S+y*M*R;break;case"YZX":this._x=y*_*S+p*M*R,this._y=p*M*S+y*_*R,this._z=p*_*R-y*M*S,this._w=p*_*S-y*M*R;break;case"XZY":this._x=y*_*S-p*M*R,this._y=p*M*S-y*_*R,this._z=p*_*R+y*M*S,this._w=p*_*S+y*M*R;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const s=i/2,l=Math.sin(s);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,s=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],_=i[6],S=i[10],y=s+d+S;if(y>0){const M=.5/Math.sqrt(y+1);this._w=.25/M,this._x=(_-m)*M,this._y=(c-p)*M,this._z=(h-l)*M}else if(s>d&&s>S){const M=2*Math.sqrt(1+s-d-S);this._w=(_-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(c+p)/M}else if(d>S){const M=2*Math.sqrt(1+d-s-S);this._w=(c-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+_)/M}else{const M=2*Math.sqrt(1+S-s-d);this._w=(h-l)/M,this._x=(c+p)/M,this._y=(m+_)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let s=t.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ge(this.dot(t),-1,1)))}rotateTowards(t,i){const s=this.angleTo(t);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const s=t._x,l=t._y,c=t._z,h=t._w,d=i._x,m=i._y,p=i._z,_=i._w;return this._x=s*_+h*d+l*p-c*m,this._y=l*_+h*m+c*d-s*p,this._z=c*_+h*p+s*m-l*d,this._w=h*_-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){if(i===0)return this;if(i===1)return this.copy(t);const s=this._x,l=this._y,c=this._z,h=this._w;let d=h*t._w+s*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=h,this._x=s,this._y=l,this._z=c,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*c+i*this._z,this.normalize(),this}const p=Math.sqrt(m),_=Math.atan2(p,d),S=Math.sin((1-i)*_)/p,y=Math.sin(i*_)/p;return this._w=h*S+this._w*y,this._x=s*S+this._x*y,this._y=l*S+this._y*y,this._z=c*S+this._z*y,this._onChangeCallback(),this}slerpQuaternions(t,i,s){return this.copy(t).slerp(i,s)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(t=0,i=0,s=0){j.prototype.isVector3=!0,this.x=t,this.y=i,this.z=s}set(t,i,s){return s===void 0&&(s=this.z),this.x=t,this.y=i,this.z=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(K_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(K_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,s=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,s=this.y,l=this.z,c=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*s),_=2*(d*i-c*l),S=2*(c*s-h*i);return this.x=i+m*p+h*S-d*_,this.y=s+m*_+d*p-c*S,this.z=l+m*S+c*_-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,s=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=ge(this.x,t.x,i.x),this.y=ge(this.y,t.y,i.y),this.z=ge(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=ge(this.x,t,i),this.y=ge(this.y,t,i),this.z=ge(this.z,t,i),this}clampLength(t,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ge(s,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const s=t.x,l=t.y,c=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-s*m,this.z=s*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const s=t.dot(this)/i;return this.copy(t).multiplyScalar(s)}projectOnPlane(t){return fh.copy(this).projectOnVector(t),this.sub(fh)}reflect(t){return this.sub(fh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(t)/i;return Math.acos(ge(s,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,s=this.y-t.y,l=this.z-t.z;return i*i+s*s+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,s){const l=Math.sin(i)*t;return this.x=l*Math.sin(s),this.y=Math.cos(i)*t,this.z=l*Math.cos(s),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(t),this.y=i,this.z=s*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fh=new j,K_=new da;class Ya{constructor(t=new j(1/0,1/0,1/0),i=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i+=3)this.expandByPoint(xi.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,s=t.count;i<s;i++)this.expandByPoint(xi.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,s=t.length;i<s;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const s=xi.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(s),this.max.copy(t).add(s),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const s=t.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,xi):xi.fromBufferAttribute(c,h),xi.applyMatrix4(t.matrixWorld),this.expandByPoint(xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ic.copy(t.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),ic.copy(s.boundingBox)),ic.applyMatrix4(t.matrixWorld),this.union(ic)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xi),xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,s;return t.normal.x>0?(i=t.normal.x*this.min.x,s=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,s=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,s+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,s+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,s+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,s+=t.normal.z*this.min.z),i<=-t.constant&&s>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Po),ac.subVectors(this.max,Po),hr.subVectors(t.a,Po),dr.subVectors(t.b,Po),pr.subVectors(t.c,Po),Ba.subVectors(dr,hr),Ia.subVectors(pr,dr),ms.subVectors(hr,pr);let i=[0,-Ba.z,Ba.y,0,-Ia.z,Ia.y,0,-ms.z,ms.y,Ba.z,0,-Ba.x,Ia.z,0,-Ia.x,ms.z,0,-ms.x,-Ba.y,Ba.x,0,-Ia.y,Ia.x,0,-ms.y,ms.x,0];return!hh(i,hr,dr,pr,ac)||(i=[1,0,0,0,1,0,0,0,1],!hh(i,hr,dr,pr,ac))?!1:(sc.crossVectors(Ba,Ia),i=[sc.x,sc.y,sc.z],hh(i,hr,dr,pr,ac))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ia[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ia[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ia[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ia[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ia[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ia[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ia[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ia[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ia),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ia=[new j,new j,new j,new j,new j,new j,new j,new j],xi=new j,ic=new Ya,hr=new j,dr=new j,pr=new j,Ba=new j,Ia=new j,ms=new j,Po=new j,ac=new j,sc=new j,gs=new j;function hh(o,t,i,s,l){for(let c=0,h=o.length-3;c<=h;c+=3){gs.fromArray(o,c);const d=l.x*Math.abs(gs.x)+l.y*Math.abs(gs.y)+l.z*Math.abs(gs.z),m=t.dot(gs),p=i.dot(gs),_=s.dot(gs);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>d)return!1}return!0}const Kx=new Ya,zo=new j,dh=new j;class Xc{constructor(t=new j,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const s=this.center;i!==void 0?s.copy(i):Kx.setFromPoints(t).getCenter(s);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,s.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const s=this.center.distanceToSquared(t);return i.copy(t),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zo.subVectors(t,this.center);const i=zo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(zo,l/s),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zo.copy(t.center).add(dh)),this.expandByPoint(zo.copy(t.center).sub(dh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const aa=new j,ph=new j,rc=new j,Fa=new j,mh=new j,oc=new j,gh=new j;class Wc{constructor(t=new j,i=new j(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,aa)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=aa.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(aa.copy(this.origin).addScaledVector(this.direction,i),aa.distanceToSquared(t))}distanceSqToSegment(t,i,s,l){ph.copy(t).add(i).multiplyScalar(.5),rc.copy(i).sub(t).normalize(),Fa.copy(this.origin).sub(ph);const c=t.distanceTo(i)*.5,h=-this.direction.dot(rc),d=Fa.dot(this.direction),m=-Fa.dot(rc),p=Fa.lengthSq(),_=Math.abs(1-h*h);let S,y,M,R;if(_>0)if(S=h*m-d,y=h*d-m,R=c*_,S>=0)if(y>=-R)if(y<=R){const w=1/_;S*=w,y*=w,M=S*(S+h*y+2*d)+y*(h*S+y+2*m)+p}else y=c,S=Math.max(0,-(h*y+d)),M=-S*S+y*(y+2*m)+p;else y=-c,S=Math.max(0,-(h*y+d)),M=-S*S+y*(y+2*m)+p;else y<=-R?(S=Math.max(0,-(-h*c+d)),y=S>0?-c:Math.min(Math.max(-c,-m),c),M=-S*S+y*(y+2*m)+p):y<=R?(S=0,y=Math.min(Math.max(-c,-m),c),M=y*(y+2*m)+p):(S=Math.max(0,-(h*c+d)),y=S>0?c:Math.min(Math.max(-c,-m),c),M=-S*S+y*(y+2*m)+p);else y=h>0?-c:c,S=Math.max(0,-(h*y+d)),M=-S*S+y*(y+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,S),l&&l.copy(ph).addScaledVector(rc,y),M}intersectSphere(t,i){aa.subVectors(t.center,this.origin);const s=aa.dot(this.direction),l=aa.dot(aa)-s*s,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(t.normal)+t.constant)/i;return s>=0?s:null}intersectPlane(t,i){const s=this.distanceToPlane(t);return s===null?null:this.at(s,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let s,l,c,h,d,m;const p=1/this.direction.x,_=1/this.direction.y,S=1/this.direction.z,y=this.origin;return p>=0?(s=(t.min.x-y.x)*p,l=(t.max.x-y.x)*p):(s=(t.max.x-y.x)*p,l=(t.min.x-y.x)*p),_>=0?(c=(t.min.y-y.y)*_,h=(t.max.y-y.y)*_):(c=(t.max.y-y.y)*_,h=(t.min.y-y.y)*_),s>h||c>l||((c>s||isNaN(s))&&(s=c),(h<l||isNaN(l))&&(l=h),S>=0?(d=(t.min.z-y.z)*S,m=(t.max.z-y.z)*S):(d=(t.max.z-y.z)*S,m=(t.min.z-y.z)*S),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(t){return this.intersectBox(t,aa)!==null}intersectTriangle(t,i,s,l,c){mh.subVectors(i,t),oc.subVectors(s,t),gh.crossVectors(mh,oc);let h=this.direction.dot(gh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Fa.subVectors(this.origin,t);const m=d*this.direction.dot(oc.crossVectors(Fa,oc));if(m<0)return null;const p=d*this.direction.dot(mh.cross(Fa));if(p<0||m+p>h)return null;const _=-d*Fa.dot(gh);return _<0?null:this.at(_/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(t,i,s,l,c,h,d,m,p,_,S,y,M,R,w,x){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,s,l,c,h,d,m,p,_,S,y,M,R,w,x)}set(t,i,s,l,c,h,d,m,p,_,S,y,M,R,w,x){const v=this.elements;return v[0]=t,v[4]=i,v[8]=s,v[12]=l,v[1]=c,v[5]=h,v[9]=d,v[13]=m,v[2]=p,v[6]=_,v[10]=S,v[14]=y,v[3]=M,v[7]=R,v[11]=w,v[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(t){const i=this.elements,s=t.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(t){const i=this.elements,s=t.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,s){return t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(t,i,s){return this.set(t.x,i.x,s.x,0,t.y,i.y,s.y,0,t.z,i.z,s.z,0,0,0,0,1),this}extractRotation(t){const i=this.elements,s=t.elements,l=1/mr.setFromMatrixColumn(t,0).length(),c=1/mr.setFromMatrixColumn(t,1).length(),h=1/mr.setFromMatrixColumn(t,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,s=t.x,l=t.y,c=t.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),S=Math.sin(c);if(t.order==="XYZ"){const y=h*_,M=h*S,R=d*_,w=d*S;i[0]=m*_,i[4]=-m*S,i[8]=p,i[1]=M+R*p,i[5]=y-w*p,i[9]=-d*m,i[2]=w-y*p,i[6]=R+M*p,i[10]=h*m}else if(t.order==="YXZ"){const y=m*_,M=m*S,R=p*_,w=p*S;i[0]=y+w*d,i[4]=R*d-M,i[8]=h*p,i[1]=h*S,i[5]=h*_,i[9]=-d,i[2]=M*d-R,i[6]=w+y*d,i[10]=h*m}else if(t.order==="ZXY"){const y=m*_,M=m*S,R=p*_,w=p*S;i[0]=y-w*d,i[4]=-h*S,i[8]=R+M*d,i[1]=M+R*d,i[5]=h*_,i[9]=w-y*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const y=h*_,M=h*S,R=d*_,w=d*S;i[0]=m*_,i[4]=R*p-M,i[8]=y*p+w,i[1]=m*S,i[5]=w*p+y,i[9]=M*p-R,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const y=h*m,M=h*p,R=d*m,w=d*p;i[0]=m*_,i[4]=w-y*S,i[8]=R*S+M,i[1]=S,i[5]=h*_,i[9]=-d*_,i[2]=-p*_,i[6]=M*S+R,i[10]=y-w*S}else if(t.order==="XZY"){const y=h*m,M=h*p,R=d*m,w=d*p;i[0]=m*_,i[4]=-S,i[8]=p*_,i[1]=y*S+w,i[5]=h*_,i[9]=M*S-R,i[2]=R*S-M,i[6]=d*_,i[10]=w*S+y}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qx,t,Jx)}lookAt(t,i,s){const l=this.elements;return ni.subVectors(t,i),ni.lengthSq()===0&&(ni.z=1),ni.normalize(),Ha.crossVectors(s,ni),Ha.lengthSq()===0&&(Math.abs(s.z)===1?ni.x+=1e-4:ni.z+=1e-4,ni.normalize(),Ha.crossVectors(s,ni)),Ha.normalize(),lc.crossVectors(ni,Ha),l[0]=Ha.x,l[4]=lc.x,l[8]=ni.x,l[1]=Ha.y,l[5]=lc.y,l[9]=ni.y,l[2]=Ha.z,l[6]=lc.z,l[10]=ni.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const s=t.elements,l=i.elements,c=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],_=s[1],S=s[5],y=s[9],M=s[13],R=s[2],w=s[6],x=s[10],v=s[14],I=s[3],N=s[7],U=s[11],q=s[15],G=l[0],P=l[4],K=l[8],T=l[12],b=l[1],B=l[5],lt=l[9],rt=l[13],mt=l[2],gt=l[6],O=l[10],Q=l[14],Z=l[3],xt=l[7],Tt=l[11],L=l[15];return c[0]=h*G+d*b+m*mt+p*Z,c[4]=h*P+d*B+m*gt+p*xt,c[8]=h*K+d*lt+m*O+p*Tt,c[12]=h*T+d*rt+m*Q+p*L,c[1]=_*G+S*b+y*mt+M*Z,c[5]=_*P+S*B+y*gt+M*xt,c[9]=_*K+S*lt+y*O+M*Tt,c[13]=_*T+S*rt+y*Q+M*L,c[2]=R*G+w*b+x*mt+v*Z,c[6]=R*P+w*B+x*gt+v*xt,c[10]=R*K+w*lt+x*O+v*Tt,c[14]=R*T+w*rt+x*Q+v*L,c[3]=I*G+N*b+U*mt+q*Z,c[7]=I*P+N*B+U*gt+q*xt,c[11]=I*K+N*lt+U*O+q*Tt,c[15]=I*T+N*rt+U*Q+q*L,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],s=t[4],l=t[8],c=t[12],h=t[1],d=t[5],m=t[9],p=t[13],_=t[2],S=t[6],y=t[10],M=t[14],R=t[3],w=t[7],x=t[11],v=t[15];return R*(+c*m*S-l*p*S-c*d*y+s*p*y+l*d*M-s*m*M)+w*(+i*m*M-i*p*y+c*h*y-l*h*M+l*p*_-c*m*_)+x*(+i*p*S-i*d*M-c*h*S+s*h*M+c*d*_-s*p*_)+v*(-l*d*_-i*m*S+i*d*y+l*h*S-s*h*y+s*m*_)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,s){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=s),this}invert(){const t=this.elements,i=t[0],s=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],_=t[8],S=t[9],y=t[10],M=t[11],R=t[12],w=t[13],x=t[14],v=t[15],I=S*x*p-w*y*p+w*m*M-d*x*M-S*m*v+d*y*v,N=R*y*p-_*x*p-R*m*M+h*x*M+_*m*v-h*y*v,U=_*w*p-R*S*p+R*d*M-h*w*M-_*d*v+h*S*v,q=R*S*m-_*w*m-R*d*y+h*w*y+_*d*x-h*S*x,G=i*I+s*N+l*U+c*q;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/G;return t[0]=I*P,t[1]=(w*y*c-S*x*c-w*l*M+s*x*M+S*l*v-s*y*v)*P,t[2]=(d*x*c-w*m*c+w*l*p-s*x*p-d*l*v+s*m*v)*P,t[3]=(S*m*c-d*y*c-S*l*p+s*y*p+d*l*M-s*m*M)*P,t[4]=N*P,t[5]=(_*x*c-R*y*c+R*l*M-i*x*M-_*l*v+i*y*v)*P,t[6]=(R*m*c-h*x*c-R*l*p+i*x*p+h*l*v-i*m*v)*P,t[7]=(h*y*c-_*m*c+_*l*p-i*y*p-h*l*M+i*m*M)*P,t[8]=U*P,t[9]=(R*S*c-_*w*c-R*s*M+i*w*M+_*s*v-i*S*v)*P,t[10]=(h*w*c-R*d*c+R*s*p-i*w*p-h*s*v+i*d*v)*P,t[11]=(_*d*c-h*S*c-_*s*p+i*S*p+h*s*M-i*d*M)*P,t[12]=q*P,t[13]=(_*w*l-R*S*l+R*s*y-i*w*y-_*s*x+i*S*x)*P,t[14]=(R*d*l-h*w*l-R*s*m+i*w*m+h*s*x-i*d*x)*P,t[15]=(h*S*l-_*d*l+_*s*m-i*S*m-h*s*y+i*d*y)*P,this}scale(t){const i=this.elements,s=t.x,l=t.y,c=t.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],s=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(t,i,s){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),s=Math.sin(t);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),s=Math.sin(t);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,h=t.x,d=t.y,m=t.z,p=c*h,_=c*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,_*d+s,_*m-l*h,0,p*m-l*d,_*m+l*h,c*m*m+s,0,0,0,0,1),this}makeScale(t,i,s){return this.set(t,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(t,i,s,l,c,h){return this.set(1,s,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,s){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,_=h+h,S=d+d,y=c*p,M=c*_,R=c*S,w=h*_,x=h*S,v=d*S,I=m*p,N=m*_,U=m*S,q=s.x,G=s.y,P=s.z;return l[0]=(1-(w+v))*q,l[1]=(M+U)*q,l[2]=(R-N)*q,l[3]=0,l[4]=(M-U)*G,l[5]=(1-(y+v))*G,l[6]=(x+I)*G,l[7]=0,l[8]=(R+N)*P,l[9]=(x-I)*P,l[10]=(1-(y+w))*P,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,s){const l=this.elements;let c=mr.set(l[0],l[1],l[2]).length();const h=mr.set(l[4],l[5],l[6]).length(),d=mr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Mi.copy(this);const p=1/c,_=1/h,S=1/d;return Mi.elements[0]*=p,Mi.elements[1]*=p,Mi.elements[2]*=p,Mi.elements[4]*=_,Mi.elements[5]*=_,Mi.elements[6]*=_,Mi.elements[8]*=S,Mi.elements[9]*=S,Mi.elements[10]*=S,i.setFromRotationMatrix(Mi),s.x=c,s.y=h,s.z=d,this}makePerspective(t,i,s,l,c,h,d=ua){const m=this.elements,p=2*c/(i-t),_=2*c/(s-l),S=(i+t)/(i-t),y=(s+l)/(s-l);let M,R;if(d===ua)M=-(h+c)/(h-c),R=-2*h*c/(h-c);else if(d===Bc)M=-h/(h-c),R=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=S,m[12]=0,m[1]=0,m[5]=_,m[9]=y,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=R,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(t,i,s,l,c,h,d=ua){const m=this.elements,p=1/(i-t),_=1/(s-l),S=1/(h-c),y=(i+t)*p,M=(s+l)*_;let R,w;if(d===ua)R=(h+c)*S,w=-2*S;else if(d===Bc)R=c*S,w=-1*S;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-y,m[1]=0,m[5]=2*_,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=w,m[14]=-R,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(t){const i=this.elements,s=t.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(t,i=0){for(let s=0;s<16;s++)this.elements[s]=t[s+i];return this}toArray(t=[],i=0){const s=this.elements;return t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=s[3],t[i+4]=s[4],t[i+5]=s[5],t[i+6]=s[6],t[i+7]=s[7],t[i+8]=s[8],t[i+9]=s[9],t[i+10]=s[10],t[i+11]=s[11],t[i+12]=s[12],t[i+13]=s[13],t[i+14]=s[14],t[i+15]=s[15],t}}const mr=new j,Mi=new Ze,Qx=new j(0,0,0),Jx=new j(1,1,1),Ha=new j,lc=new j,ni=new j,Q_=new Ze,J_=new da;class Bi{constructor(t=0,i=0,s=0,l=Bi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,s,l=this._order){return this._x=t,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,s=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],_=l[9],S=l[2],y=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,M),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(y,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ge(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-S,c),this._z=0);break;case"ZXY":this._x=Math.asin(ge(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-S,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-ge(S,-1,1)),Math.abs(S)<.9999999?(this._x=Math.atan2(y,M),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(ge(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-S,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(y,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-_,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,s){return Q_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Q_,i,s)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return J_.setFromEuler(this),this.setFromQuaternion(J_,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bi.DEFAULT_ORDER="XYZ";class Xd{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $x=0;const $_=new j,gr=new da,sa=new Ze,cc=new j,Bo=new j,tM=new j,eM=new da,t0=new j(1,0,0),e0=new j(0,1,0),n0=new j(0,0,1),i0={type:"added"},nM={type:"removed"},_r={type:"childadded",child:null},_h={type:"childremoved",child:null};class Sn extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$x++}),this.uuid=Xo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const t=new j,i=new Bi,s=new da,l=new j(1,1,1);function c(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ze},normalMatrix:{value:new le}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return gr.setFromAxisAngle(t,i),this.quaternion.multiply(gr),this}rotateOnWorldAxis(t,i){return gr.setFromAxisAngle(t,i),this.quaternion.premultiply(gr),this}rotateX(t){return this.rotateOnAxis(t0,t)}rotateY(t){return this.rotateOnAxis(e0,t)}rotateZ(t){return this.rotateOnAxis(n0,t)}translateOnAxis(t,i){return $_.copy(t).applyQuaternion(this.quaternion),this.position.add($_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(t0,t)}translateY(t){return this.translateOnAxis(e0,t)}translateZ(t){return this.translateOnAxis(n0,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(sa.copy(this.matrixWorld).invert())}lookAt(t,i,s){t.isVector3?cc.copy(t):cc.set(t,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Bo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sa.lookAt(Bo,cc,this.up):sa.lookAt(cc,Bo,this.up),this.quaternion.setFromRotationMatrix(sa),l&&(sa.extractRotation(l.matrixWorld),gr.setFromRotationMatrix(sa),this.quaternion.premultiply(gr.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(i0),_r.child=t,this.dispatchEvent(_r),_r.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(nM),_h.child=t,this.dispatchEvent(_h),_h.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),sa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),sa.multiply(t.parent.matrixWorld)),t.applyMatrix4(sa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(i0),_r.child=t,this.dispatchEvent(_r),_r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,s=[]){this[t]===i&&s.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,s);return s}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,t,tM),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bo,eM,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(t)}updateWorldMatrix(t,i){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",s={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const S=m[p];c(t.shapes,S)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),_=h(t.images),S=h(t.shapes),y=h(t.skeletons),M=h(t.animations),R=h(t.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),S.length>0&&(s.shapes=S),y.length>0&&(s.skeletons=y),M.length>0&&(s.animations=M),R.length>0&&(s.nodes=R)}return s.object=l,s;function h(d){const m=[];for(const p in d){const _=d[p];delete _.metadata,m.push(_)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let s=0;s<t.children.length;s++){const l=t.children[s];this.add(l.clone())}return this}}Sn.DEFAULT_UP=new j(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ei=new j,ra=new j,vh=new j,oa=new j,vr=new j,Sr=new j,a0=new j,Sh=new j,yh=new j,xh=new j,Mh=new $e,Eh=new $e,Th=new $e;class bi{constructor(t=new j,i=new j,s=new j){this.a=t,this.b=i,this.c=s}static getNormal(t,i,s,l){l.subVectors(s,i),Ei.subVectors(t,i),l.cross(Ei);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,s,l,c){Ei.subVectors(l,i),ra.subVectors(s,i),vh.subVectors(t,i);const h=Ei.dot(Ei),d=Ei.dot(ra),m=Ei.dot(vh),p=ra.dot(ra),_=ra.dot(vh),S=h*p-d*d;if(S===0)return c.set(0,0,0),null;const y=1/S,M=(p*m-d*_)*y,R=(h*_-d*m)*y;return c.set(1-M-R,R,M)}static containsPoint(t,i,s,l){return this.getBarycoord(t,i,s,l,oa)===null?!1:oa.x>=0&&oa.y>=0&&oa.x+oa.y<=1}static getInterpolation(t,i,s,l,c,h,d,m){return this.getBarycoord(t,i,s,l,oa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,oa.x),m.addScaledVector(h,oa.y),m.addScaledVector(d,oa.z),m)}static getInterpolatedAttribute(t,i,s,l,c,h){return Mh.setScalar(0),Eh.setScalar(0),Th.setScalar(0),Mh.fromBufferAttribute(t,i),Eh.fromBufferAttribute(t,s),Th.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(Mh,c.x),h.addScaledVector(Eh,c.y),h.addScaledVector(Th,c.z),h}static isFrontFacing(t,i,s,l){return Ei.subVectors(s,i),ra.subVectors(t,i),Ei.cross(ra).dot(l)<0}set(t,i,s){return this.a.copy(t),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(t,i,s,l){return this.a.copy(t[i]),this.b.copy(t[s]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,s,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,s),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ei.subVectors(this.c,this.b),ra.subVectors(this.a,this.b),Ei.cross(ra).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return bi.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,s,l,c){return bi.getInterpolation(t,this.a,this.b,this.c,i,s,l,c)}containsPoint(t){return bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const s=this.a,l=this.b,c=this.c;let h,d;vr.subVectors(l,s),Sr.subVectors(c,s),Sh.subVectors(t,s);const m=vr.dot(Sh),p=Sr.dot(Sh);if(m<=0&&p<=0)return i.copy(s);yh.subVectors(t,l);const _=vr.dot(yh),S=Sr.dot(yh);if(_>=0&&S<=_)return i.copy(l);const y=m*S-_*p;if(y<=0&&m>=0&&_<=0)return h=m/(m-_),i.copy(s).addScaledVector(vr,h);xh.subVectors(t,c);const M=vr.dot(xh),R=Sr.dot(xh);if(R>=0&&M<=R)return i.copy(c);const w=M*p-m*R;if(w<=0&&p>=0&&R<=0)return d=p/(p-R),i.copy(s).addScaledVector(Sr,d);const x=_*R-M*S;if(x<=0&&S-_>=0&&M-R>=0)return a0.subVectors(c,l),d=(S-_)/(S-_+(M-R)),i.copy(l).addScaledVector(a0,d);const v=1/(x+w+y);return h=w*v,d=y*v,i.copy(s).addScaledVector(vr,h).addScaledVector(Sr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const mv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ga={h:0,s:0,l:0},uc={h:0,s:0,l:0};function bh(o,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(t-o)*6*i:i<1/2?t:i<2/3?o+(t-o)*6*(2/3-i):o}class ue{constructor(t,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,s)}set(t,i,s){if(i===void 0&&s===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,s);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=pi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.toWorkingColorSpace(this,i),this}setRGB(t,i,s,l=we.workingColorSpace){return this.r=t,this.g=i,this.b=s,we.toWorkingColorSpace(this,l),this}setHSL(t,i,s,l=we.workingColorSpace){if(t=Ix(t,1),i=ge(i,0,1),s=ge(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,h=2*s-c;this.r=bh(h,c,t+1/3),this.g=bh(h,c,t),this.b=bh(h,c,t-1/3)}return we.toWorkingColorSpace(this,l),this}setStyle(t,i=pi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=pi){const s=mv[t.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fa(t.r),this.g=fa(t.g),this.b=fa(t.b),this}copyLinearToSRGB(t){return this.r=Dr(t.r),this.g=Dr(t.g),this.b=Dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pi){return we.fromWorkingColorSpace(Dn.copy(this),t),Math.round(ge(Dn.r*255,0,255))*65536+Math.round(ge(Dn.g*255,0,255))*256+Math.round(ge(Dn.b*255,0,255))}getHexString(t=pi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=we.workingColorSpace){we.fromWorkingColorSpace(Dn.copy(this),i);const s=Dn.r,l=Dn.g,c=Dn.b,h=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const _=(d+h)/2;if(d===h)m=0,p=0;else{const S=h-d;switch(p=_<=.5?S/(h+d):S/(2-h-d),h){case s:m=(l-c)/S+(l<c?6:0);break;case l:m=(c-s)/S+2;break;case c:m=(s-l)/S+4;break}m/=6}return t.h=m,t.s=p,t.l=_,t}getRGB(t,i=we.workingColorSpace){return we.fromWorkingColorSpace(Dn.copy(this),i),t.r=Dn.r,t.g=Dn.g,t.b=Dn.b,t}getStyle(t=pi){we.fromWorkingColorSpace(Dn.copy(this),t);const i=Dn.r,s=Dn.g,l=Dn.b;return t!==pi?`color(${t} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(t,i,s){return this.getHSL(Ga),this.setHSL(Ga.h+t,Ga.s+i,Ga.l+s)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,s){return this.r=t.r+(i.r-t.r)*s,this.g=t.g+(i.g-t.g)*s,this.b=t.b+(i.b-t.b)*s,this}lerpHSL(t,i){this.getHSL(Ga),t.getHSL(uc);const s=lh(Ga.h,uc.h,i),l=lh(Ga.s,uc.s,i),c=lh(Ga.l,uc.l,i);return this.setHSL(s,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,s=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dn=new ue;ue.NAMES=mv;let iM=0;class ws extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iM++}),this.uuid=Xo(),this.name="",this.type="Material",this.blending=Cr,this.side=qa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jh,this.blendDst=Zh,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=X_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const s=t[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(t).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(t).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(t).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(t).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(t).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Cr&&(s.blending=this.blending),this.side!==qa&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==jh&&(s.blendSrc=this.blendSrc),this.blendDst!==Zh&&(s.blendDst=this.blendDst),this.blendEquation!==Ms&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Ur&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==X_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(s.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(s.textures=c),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fc extends ws{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.combine=J0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const cn=new j,fc=new ie;class zn{constructor(t,i,s=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=s,this.usage=W_,this.updateRanges=[],this.gpuType=ca,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,s){t*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[s+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)fc.fromBufferAttribute(this,i),fc.applyMatrix3(t),this.setXY(i,fc.x,fc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix3(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyMatrix4(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix4(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyNormalMatrix(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyNormalMatrix(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}transformDirection(t){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.transformDirection(t),this.setXYZ(i,cn.x,cn.y,cn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let s=this.array[t*this.itemSize+i];return this.normalized&&(s=Oo(s,this.array)),s}setComponent(t,i,s){return this.normalized&&(s=kn(s,this.array)),this.array[t*this.itemSize+i]=s,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=Oo(i,this.array)),i}setX(t,i){return this.normalized&&(i=kn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=Oo(i,this.array)),i}setY(t,i){return this.normalized&&(i=kn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=Oo(i,this.array)),i}setZ(t,i){return this.normalized&&(i=kn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=Oo(i,this.array)),i}setW(t,i){return this.normalized&&(i=kn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,s){return t*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array)),this.array[t+0]=i,this.array[t+1]=s,this}setXYZ(t,i,s,l){return t*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array),l=kn(l,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this}setXYZW(t,i,s,l,c){return t*=this.itemSize,this.normalized&&(i=kn(i,this.array),s=kn(s,this.array),l=kn(l,this.array),c=kn(c,this.array)),this.array[t+0]=i,this.array[t+1]=s,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==W_&&(t.usage=this.usage),t}}class gv extends zn{constructor(t,i,s){super(new Uint16Array(t),i,s)}}class _v extends zn{constructor(t,i,s){super(new Uint32Array(t),i,s)}}class jn extends zn{constructor(t,i,s){super(new Float32Array(t),i,s)}}let aM=0;const di=new Ze,Ah=new Sn,yr=new j,ii=new Ya,Io=new Ya,vn=new j;class ai extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aM++}),this.uuid=Xo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(hv(t)?_v:gv)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,s=0){this.groups.push({start:t,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new le().getNormalMatrix(t);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return di.makeRotationFromQuaternion(t),this.applyMatrix4(di),this}rotateX(t){return di.makeRotationX(t),this.applyMatrix4(di),this}rotateY(t){return di.makeRotationY(t),this.applyMatrix4(di),this}rotateZ(t){return di.makeRotationZ(t),this.applyMatrix4(di),this}translate(t,i,s){return di.makeTranslation(t,i,s),this.applyMatrix4(di),this}scale(t,i,s){return di.makeScale(t,i,s),this.applyMatrix4(di),this}lookAt(t){return Ah.lookAt(t),Ah.updateMatrix(),this.applyMatrix4(Ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new jn(s,3))}else{const s=Math.min(t.length,i.count);for(let l=0;l<s;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ya);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ii.setFromBufferAttribute(c),this.morphTargetsRelative?(vn.addVectors(this.boundingBox.min,ii.min),this.boundingBox.expandByPoint(vn),vn.addVectors(this.boundingBox.max,ii.max),this.boundingBox.expandByPoint(vn)):(this.boundingBox.expandByPoint(ii.min),this.boundingBox.expandByPoint(ii.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xc);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(t){const s=this.boundingSphere.center;if(ii.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Io.setFromBufferAttribute(d),this.morphTargetsRelative?(vn.addVectors(ii.min,Io.min),ii.expandByPoint(vn),vn.addVectors(ii.max,Io.max),ii.expandByPoint(vn)):(ii.expandByPoint(Io.min),ii.expandByPoint(Io.max))}ii.getCenter(s);let l=0;for(let c=0,h=t.count;c<h;c++)vn.fromBufferAttribute(t,c),l=Math.max(l,s.distanceToSquared(vn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,_=d.count;p<_;p++)vn.fromBufferAttribute(d,p),m&&(yr.fromBufferAttribute(t,p),vn.add(yr)),l=Math.max(l,s.distanceToSquared(vn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zn(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let K=0;K<s.count;K++)d[K]=new j,m[K]=new j;const p=new j,_=new j,S=new j,y=new ie,M=new ie,R=new ie,w=new j,x=new j;function v(K,T,b){p.fromBufferAttribute(s,K),_.fromBufferAttribute(s,T),S.fromBufferAttribute(s,b),y.fromBufferAttribute(c,K),M.fromBufferAttribute(c,T),R.fromBufferAttribute(c,b),_.sub(p),S.sub(p),M.sub(y),R.sub(y);const B=1/(M.x*R.y-R.x*M.y);isFinite(B)&&(w.copy(_).multiplyScalar(R.y).addScaledVector(S,-M.y).multiplyScalar(B),x.copy(S).multiplyScalar(M.x).addScaledVector(_,-R.x).multiplyScalar(B),d[K].add(w),d[T].add(w),d[b].add(w),m[K].add(x),m[T].add(x),m[b].add(x))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let K=0,T=I.length;K<T;++K){const b=I[K],B=b.start,lt=b.count;for(let rt=B,mt=B+lt;rt<mt;rt+=3)v(t.getX(rt+0),t.getX(rt+1),t.getX(rt+2))}const N=new j,U=new j,q=new j,G=new j;function P(K){q.fromBufferAttribute(l,K),G.copy(q);const T=d[K];N.copy(T),N.sub(q.multiplyScalar(q.dot(T))).normalize(),U.crossVectors(G,T);const B=U.dot(m[K])<0?-1:1;h.setXYZW(K,N.x,N.y,N.z,B)}for(let K=0,T=I.length;K<T;++K){const b=I[K],B=b.start,lt=b.count;for(let rt=B,mt=B+lt;rt<mt;rt+=3)P(t.getX(rt+0)),P(t.getX(rt+1)),P(t.getX(rt+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new zn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let y=0,M=s.count;y<M;y++)s.setXYZ(y,0,0,0);const l=new j,c=new j,h=new j,d=new j,m=new j,p=new j,_=new j,S=new j;if(t)for(let y=0,M=t.count;y<M;y+=3){const R=t.getX(y+0),w=t.getX(y+1),x=t.getX(y+2);l.fromBufferAttribute(i,R),c.fromBufferAttribute(i,w),h.fromBufferAttribute(i,x),_.subVectors(h,c),S.subVectors(l,c),_.cross(S),d.fromBufferAttribute(s,R),m.fromBufferAttribute(s,w),p.fromBufferAttribute(s,x),d.add(_),m.add(_),p.add(_),s.setXYZ(R,d.x,d.y,d.z),s.setXYZ(w,m.x,m.y,m.z),s.setXYZ(x,p.x,p.y,p.z)}else for(let y=0,M=i.count;y<M;y+=3)l.fromBufferAttribute(i,y+0),c.fromBufferAttribute(i,y+1),h.fromBufferAttribute(i,y+2),_.subVectors(h,c),S.subVectors(l,c),_.cross(S),s.setXYZ(y+0,_.x,_.y,_.z),s.setXYZ(y+1,_.x,_.y,_.z),s.setXYZ(y+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,s=t.count;i<s;i++)vn.fromBufferAttribute(t,i),vn.normalize(),t.setXYZ(i,vn.x,vn.y,vn.z)}toNonIndexed(){function t(d,m){const p=d.array,_=d.itemSize,S=d.normalized,y=new p.constructor(m.length*_);let M=0,R=0;for(let w=0,x=m.length;w<x;w++){d.isInterleavedBufferAttribute?M=m[w]*d.data.stride+d.offset:M=m[w]*_;for(let v=0;v<_;v++)y[R++]=p[M++]}return new zn(y,_,S)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ai,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,s);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let _=0,S=p.length;_<S;_++){const y=p[_],M=t(y,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let S=0,y=p.length;S<y;S++){const M=p[S];_.push(M.toJSON(t.data))}_.length>0&&(l[m]=_,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const s=t.index;s!==null&&this.setIndex(s.clone(i));const l=t.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(i))}const c=t.morphAttributes;for(const p in c){const _=[],S=c[p];for(let y=0,M=S.length;y<M;y++)_.push(S[y].clone(i));this.morphAttributes[p]=_}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,_=h.length;p<_;p++){const S=h[p];this.addGroup(S.start,S.count,S.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const s0=new Ze,_s=new Wc,hc=new Xc,r0=new j,dc=new j,pc=new j,mc=new j,Rh=new j,gc=new j,o0=new j,_c=new j;class Wn extends Sn{constructor(t=new ai,i=new Fc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){gc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=d[m],S=c[m];_!==0&&(Rh.fromBufferAttribute(S,t),h?gc.addScaledVector(Rh,_):gc.addScaledVector(Rh.sub(i),_))}i.add(gc)}return i}raycast(t,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),hc.copy(s.boundingSphere),hc.applyMatrix4(c),_s.copy(t.ray).recast(t.near),!(hc.containsPoint(_s.origin)===!1&&(_s.intersectSphere(hc,r0)===null||_s.origin.distanceToSquared(r0)>(t.far-t.near)**2))&&(s0.copy(c).invert(),_s.copy(t.ray).applyMatrix4(s0),!(s.boundingBox!==null&&_s.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(t,i,_s)))}_computeIntersections(t,i,s){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,S=c.attributes.normal,y=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(h))for(let R=0,w=y.length;R<w;R++){const x=y[R],v=h[x.materialIndex],I=Math.max(x.start,M.start),N=Math.min(d.count,Math.min(x.start+x.count,M.start+M.count));for(let U=I,q=N;U<q;U+=3){const G=d.getX(U),P=d.getX(U+1),K=d.getX(U+2);l=vc(this,v,t,s,p,_,S,G,P,K),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const R=Math.max(0,M.start),w=Math.min(d.count,M.start+M.count);for(let x=R,v=w;x<v;x+=3){const I=d.getX(x),N=d.getX(x+1),U=d.getX(x+2);l=vc(this,h,t,s,p,_,S,I,N,U),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let R=0,w=y.length;R<w;R++){const x=y[R],v=h[x.materialIndex],I=Math.max(x.start,M.start),N=Math.min(m.count,Math.min(x.start+x.count,M.start+M.count));for(let U=I,q=N;U<q;U+=3){const G=U,P=U+1,K=U+2;l=vc(this,v,t,s,p,_,S,G,P,K),l&&(l.faceIndex=Math.floor(U/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const R=Math.max(0,M.start),w=Math.min(m.count,M.start+M.count);for(let x=R,v=w;x<v;x+=3){const I=x,N=x+1,U=x+2;l=vc(this,h,t,s,p,_,S,I,N,U),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function sM(o,t,i,s,l,c,h,d){let m;if(t.side===qn?m=s.intersectTriangle(h,c,l,!0,d):m=s.intersectTriangle(l,c,h,t.side===qa,d),m===null)return null;_c.copy(d),_c.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(_c);return p<i.near||p>i.far?null:{distance:p,point:_c.clone(),object:o}}function vc(o,t,i,s,l,c,h,d,m,p){o.getVertexPosition(d,dc),o.getVertexPosition(m,pc),o.getVertexPosition(p,mc);const _=sM(o,t,i,s,dc,pc,mc,o0);if(_){const S=new j;bi.getBarycoord(o0,dc,pc,mc,S),l&&(_.uv=bi.getInterpolatedAttribute(l,d,m,p,S,new ie)),c&&(_.uv1=bi.getInterpolatedAttribute(c,d,m,p,S,new ie)),h&&(_.normal=bi.getInterpolatedAttribute(h,d,m,p,S,new j),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const y={a:d,b:m,c:p,normal:new j,materialIndex:0};bi.getNormal(dc,pc,mc,y.normal),_.face=y,_.barycoord=S}return _}class Ir extends ai{constructor(t=1,i=1,s=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],_=[],S=[];let y=0,M=0;R("z","y","x",-1,-1,s,i,t,h,c,0),R("z","y","x",1,-1,s,i,-t,h,c,1),R("x","z","y",1,1,t,s,i,l,h,2),R("x","z","y",1,-1,t,s,-i,l,h,3),R("x","y","z",1,-1,t,i,s,l,c,4),R("x","y","z",-1,-1,t,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new jn(p,3)),this.setAttribute("normal",new jn(_,3)),this.setAttribute("uv",new jn(S,2));function R(w,x,v,I,N,U,q,G,P,K,T){const b=U/P,B=q/K,lt=U/2,rt=q/2,mt=G/2,gt=P+1,O=K+1;let Q=0,Z=0;const xt=new j;for(let Tt=0;Tt<O;Tt++){const L=Tt*B-rt;for(let nt=0;nt<gt;nt++){const yt=nt*b-lt;xt[w]=yt*I,xt[x]=L*N,xt[v]=mt,p.push(xt.x,xt.y,xt.z),xt[w]=0,xt[x]=0,xt[v]=G>0?1:-1,_.push(xt.x,xt.y,xt.z),S.push(nt/P),S.push(1-Tt/K),Q+=1}}for(let Tt=0;Tt<K;Tt++)for(let L=0;L<P;L++){const nt=y+L+gt*Tt,yt=y+L+gt*(Tt+1),Y=y+(L+1)+gt*(Tt+1),ct=y+(L+1)+gt*Tt;m.push(nt,yt,ct),m.push(yt,Y,ct),Z+=6}d.addGroup(M,Z,T),M+=Z,y+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ir(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Br(o){const t={};for(const i in o){t[i]={};for(const s in o[i]){const l=o[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][s]=null):t[i][s]=l.clone():Array.isArray(l)?t[i][s]=l.slice():t[i][s]=l}}return t}function Pn(o){const t={};for(let i=0;i<o.length;i++){const s=Br(o[i]);for(const l in s)t[l]=s[l]}return t}function rM(o){const t=[];for(let i=0;i<o.length;i++)t.push(o[i].clone());return t}function vv(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const oM={clone:Br,merge:Pn};var lM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ja extends ws{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lM,this.fragmentShader=cM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Br(t.uniforms),this.uniformsGroups=rM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class Sv extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=ua}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Va=new j,l0=new ie,c0=new ie;class mi extends Sv{constructor(t=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Nd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Oc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nd*2*Math.atan(Math.tan(Oc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,s){Va.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Va.x,Va.y).multiplyScalar(-t/Va.z),Va.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Va.x,Va.y).multiplyScalar(-t/Va.z)}getViewSize(t,i){return this.getViewBounds(t,l0,c0),i.subVectors(c0,l0)}setViewOffset(t,i,s,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(Oc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const xr=-90,Mr=1;class uM extends Sn{constructor(t,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new mi(xr,Mr,t,i);l.layers=this.layers,this.add(l);const c=new mi(xr,Mr,t,i);c.layers=this.layers,this.add(c);const h=new mi(xr,Mr,t,i);h.layers=this.layers,this.add(h);const d=new mi(xr,Mr,t,i);d.layers=this.layers,this.add(d);const m=new mi(xr,Mr,t,i);m.layers=this.layers,this.add(m);const p=new mi(xr,Mr,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[s,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(t===ua)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Bc)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,_]=this.children,S=t.getRenderTarget(),y=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),R=t.xr.enabled;t.xr.enabled=!1;const w=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,t.setRenderTarget(s,0,l),t.render(i,c),t.setRenderTarget(s,1,l),t.render(i,h),t.setRenderTarget(s,2,l),t.render(i,d),t.setRenderTarget(s,3,l),t.render(i,m),t.setRenderTarget(s,4,l),t.render(i,p),s.texture.generateMipmaps=w,t.setRenderTarget(s,5,l),t.render(i,_),t.setRenderTarget(S,y,M),t.xr.enabled=R,s.texture.needsPMREMUpdate=!0}}class yv extends Yn{constructor(t,i,s,l,c,h,d,m,p,_){t=t!==void 0?t:[],i=i!==void 0?i:Lr,super(t,i,s,l,c,h,d,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fM extends Rs{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const s={width:t,height:t,depth:1},l=[s,s,s,s,s,s];this.texture=new yv(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:zi}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Ir(5,5,5),c=new ja({name:"CubemapFromEquirect",uniforms:Br(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:qn,blending:Xa});c.uniforms.tEquirect.value=i;const h=new Wn(l,c),d=i.minFilter;return i.minFilter===bs&&(i.minFilter=zi),new uM(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i,s,l){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,s,l);t.setRenderTarget(c)}}class Wd{constructor(t,i=1,s=1e3){this.isFog=!0,this.name="",this.color=new ue(t),this.near=i,this.far=s}clone(){return new Wd(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hM extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bi,this.environmentIntensity=1,this.environmentRotation=new Bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Ch=new j,dM=new j,pM=new le;class Oi{constructor(t=new j(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,s,l){return this.normal.set(t,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,s){const l=Ch.subVectors(s,i).cross(dM.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const s=t.delta(Ch),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(s,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),s=this.distanceToPoint(t.end);return i<0&&s>0||s<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const s=i||pM.getNormalMatrix(t),l=this.coplanarPoint(Ch).applyMatrix4(t),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vs=new Xc,Sc=new j;class qd{constructor(t=new Oi,i=new Oi,s=new Oi,l=new Oi,c=new Oi,h=new Oi){this.planes=[t,i,s,l,c,h]}set(t,i,s,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(t.planes[s]);return this}setFromProjectionMatrix(t,i=ua){const s=this.planes,l=t.elements,c=l[0],h=l[1],d=l[2],m=l[3],p=l[4],_=l[5],S=l[6],y=l[7],M=l[8],R=l[9],w=l[10],x=l[11],v=l[12],I=l[13],N=l[14],U=l[15];if(s[0].setComponents(m-c,y-p,x-M,U-v).normalize(),s[1].setComponents(m+c,y+p,x+M,U+v).normalize(),s[2].setComponents(m+h,y+_,x+R,U+I).normalize(),s[3].setComponents(m-h,y-_,x-R,U-I).normalize(),s[4].setComponents(m-d,y-S,x-w,U-N).normalize(),i===ua)s[5].setComponents(m+d,y+S,x+w,U+N).normalize();else if(i===Bc)s[5].setComponents(d,S,w,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){return vs.center.set(0,0,0),vs.radius=.7071067811865476,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){const i=this.planes,s=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Sc.x=l.normal.x>0?t.max.x:t.min.x,Sc.y=l.normal.y>0?t.max.y:t.min.y,Sc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Sc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class qc extends ws{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Hc=new j,Gc=new j,u0=new Ze,Fo=new Wc,yc=new Xc,wh=new j,f0=new j;class xv extends Sn{constructor(t=new ai,i=new qc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)Hc.fromBufferAttribute(i,l-1),Gc.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Hc.distanceTo(Gc);t.setAttribute("lineDistance",new jn(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const s=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),yc.copy(s.boundingSphere),yc.applyMatrix4(l),yc.radius+=c,t.ray.intersectsSphere(yc)===!1)return;u0.copy(l).invert(),Fo.copy(t.ray).applyMatrix4(u0);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,_=s.index,y=s.attributes.position;if(_!==null){const M=Math.max(0,h.start),R=Math.min(_.count,h.start+h.count);for(let w=M,x=R-1;w<x;w+=p){const v=_.getX(w),I=_.getX(w+1),N=xc(this,t,Fo,m,v,I);N&&i.push(N)}if(this.isLineLoop){const w=_.getX(R-1),x=_.getX(M),v=xc(this,t,Fo,m,w,x);v&&i.push(v)}}else{const M=Math.max(0,h.start),R=Math.min(y.count,h.start+h.count);for(let w=M,x=R-1;w<x;w+=p){const v=xc(this,t,Fo,m,w,w+1);v&&i.push(v)}if(this.isLineLoop){const w=xc(this,t,Fo,m,R-1,M);w&&i.push(w)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function xc(o,t,i,s,l,c){const h=o.geometry.attributes.position;if(Hc.fromBufferAttribute(h,l),Gc.fromBufferAttribute(h,c),i.distanceSqToSegment(Hc,Gc,wh,f0)>s)return;wh.applyMatrix4(o.matrixWorld);const m=t.ray.origin.distanceTo(wh);if(!(m<t.near||m>t.far))return{distance:m,point:f0.clone().applyMatrix4(o.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:o}}const h0=new j,d0=new j;class Mv extends xv{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)h0.fromBufferAttribute(i,l),d0.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+h0.distanceTo(d0);t.setAttribute("lineDistance",new jn(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mc extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Ev extends Yn{constructor(t,i,s,l,c,h,d,m,p,_=wr){if(_!==wr&&_!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&_===wr&&(s=As),s===void 0&&_===Pr&&(s=Or),super(null,l,c,h,d,m,_,s,p),this.isDepthTexture=!0,this.image={width:t,height:i},this.magFilter=d!==void 0?d:Ri,this.minFilter=m!==void 0?m:Ri,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Yd extends ai{constructor(t=1,i=32,s=0,l=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:i,thetaStart:s,thetaLength:l},i=Math.max(3,i);const c=[],h=[],d=[],m=[],p=new j,_=new ie;h.push(0,0,0),d.push(0,0,1),m.push(.5,.5);for(let S=0,y=3;S<=i;S++,y+=3){const M=s+S/i*l;p.x=t*Math.cos(M),p.y=t*Math.sin(M),h.push(p.x,p.y,p.z),d.push(0,0,1),_.x=(h[y]/t+1)/2,_.y=(h[y+1]/t+1)/2,m.push(_.x,_.y)}for(let S=1;S<=i;S++)c.push(S,S+1,0);this.setIndex(c),this.setAttribute("position",new jn(h,3)),this.setAttribute("normal",new jn(d,3)),this.setAttribute("uv",new jn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yd(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Wo extends ai{constructor(t=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:s,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,_=m+1,S=t/d,y=i/m,M=[],R=[],w=[],x=[];for(let v=0;v<_;v++){const I=v*y-h;for(let N=0;N<p;N++){const U=N*S-c;R.push(U,-I,0),w.push(0,0,1),x.push(N/d),x.push(1-v/m)}}for(let v=0;v<m;v++)for(let I=0;I<d;I++){const N=I+p*v,U=I+p*(v+1),q=I+1+p*(v+1),G=I+1+p*v;M.push(N,U,G),M.push(U,q,G)}this.setIndex(M),this.setAttribute("position",new jn(R,3)),this.setAttribute("normal",new jn(w,3)),this.setAttribute("uv",new jn(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.width,t.height,t.widthSegments,t.heightSegments)}}class mM extends ws{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ue(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Dh extends ws{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uv,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gM extends ws{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _M extends ws{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Tv extends Sn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(t),this.intensity=i}dispose(){}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,this.groundColor!==void 0&&(i.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(i.object.distance=this.distance),this.angle!==void 0&&(i.object.angle=this.angle),this.decay!==void 0&&(i.object.decay=this.decay),this.penumbra!==void 0&&(i.object.penumbra=this.penumbra),this.shadow!==void 0&&(i.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(i.object.target=this.target.uuid),i}}class vM extends Tv{constructor(t,i,s){super(t,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ue(i)}copy(t,i){return super.copy(t,i),this.groundColor.copy(t.groundColor),this}}const Uh=new Ze,p0=new j,m0=new j;class SM{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qd,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,s=this.matrix;p0.setFromMatrixPosition(t.matrixWorld),i.position.copy(p0),m0.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(m0),i.updateMatrixWorld(),Uh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uh),s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(Uh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class bv extends Sv{constructor(t=-1,i=1,s=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,s,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-t,h=s+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=_*this.view.offsetY,m=d-_*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class yM extends SM{constructor(){super(new bv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xM extends Tv{constructor(t,i){super(t,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.shadow=new yM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class MM extends mi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}const g0=new Ze;class EM{constructor(t,i,s=0,l=1/0){this.ray=new Wc(t,i),this.near=s,this.far=l,this.camera=null,this.layers=new Xd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,i){this.ray.set(t,i)}setFromCamera(t,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(t){return g0.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(g0),this}intersectObject(t,i=!0,s=[]){return Od(t,this,s,i),s.sort(_0),s}intersectObjects(t,i=!0,s=[]){for(let l=0,c=t.length;l<c;l++)Od(t[l],this,s,i);return s.sort(_0),s}}function _0(o,t){return o.distance-t.distance}function Od(o,t,i,s){let l=!0;if(o.layers.test(t.layers)&&o.raycast(t,i)===!1&&(l=!1),l===!0&&s===!0){const c=o.children;for(let h=0,d=c.length;h<d;h++)Od(c[h],t,i,!0)}}class v0{constructor(t=1,i=0,s=0){return this.radius=t,this.phi=i,this.theta=s,this}set(t,i,s){return this.radius=t,this.phi=i,this.theta=s,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,i,s){return this.radius=Math.sqrt(t*t+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,s),this.phi=Math.acos(ge(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class TM extends Mv{constructor(t=10,i=10,s=4473924,l=8947848){s=new ue(s),l=new ue(l);const c=i/2,h=t/i,d=t/2,m=[],p=[];for(let y=0,M=0,R=-d;y<=i;y++,R+=h){m.push(-d,0,R,d,0,R),m.push(R,0,-d,R,0,d);const w=y===c?s:l;w.toArray(p,M),M+=3,w.toArray(p,M),M+=3,w.toArray(p,M),M+=3,w.toArray(p,M),M+=3}const _=new ai;_.setAttribute("position",new jn(m,3)),_.setAttribute("color",new jn(p,3));const S=new qc({vertexColors:!0,toneMapped:!1});super(_,S),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ec=new Ya;class bM extends Mv{constructor(t,i=16776960){const s=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),l=new Float32Array(24),c=new ai;c.setIndex(new zn(s,1)),c.setAttribute("position",new zn(l,3)),super(c,new qc({color:i,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(t){if(t!==void 0&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),this.object!==void 0&&Ec.setFromObject(this.object),Ec.isEmpty())return;const i=Ec.min,s=Ec.max,l=this.geometry.attributes.position,c=l.array;c[0]=s.x,c[1]=s.y,c[2]=s.z,c[3]=i.x,c[4]=s.y,c[5]=s.z,c[6]=i.x,c[7]=i.y,c[8]=s.z,c[9]=s.x,c[10]=i.y,c[11]=s.z,c[12]=s.x,c[13]=s.y,c[14]=i.z,c[15]=i.x,c[16]=s.y,c[17]=i.z,c[18]=i.x,c[19]=i.y,c[20]=i.z,c[21]=s.x,c[22]=i.y,c[23]=i.z,l.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,i){return super.copy(t,i),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class AM extends Cs{constructor(t,i=null){super(),this.object=t,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function S0(o,t,i,s){const l=RM(s);switch(i){case iv:return o*t;case sv:return o*t;case rv:return o*t*2;case ov:return o*t/l.components*l.byteLength;case Gd:return o*t/l.components*l.byteLength;case lv:return o*t*2/l.components*l.byteLength;case Vd:return o*t*2/l.components*l.byteLength;case av:return o*t*3/l.components*l.byteLength;case Ai:return o*t*4/l.components*l.byteLength;case kd:return o*t*4/l.components*l.byteLength;case wc:case Dc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case Uc:case Lc:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case ld:case ud:return Math.max(o,16)*Math.max(t,8)/4;case od:case cd:return Math.max(o,8)*Math.max(t,8)/2;case fd:case hd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case dd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case pd:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case md:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case gd:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case _d:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case vd:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case Sd:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case yd:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case xd:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Md:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Ed:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Td:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case bd:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case Ad:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case Rd:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case Nc:case Cd:case wd:return Math.ceil(o/4)*Math.ceil(t/4)*16;case cv:case Dd:return Math.ceil(o/4)*Math.ceil(t/4)*8;case Ud:case Ld:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function RM(o){switch(o){case ha:case tv:return{byteLength:1,components:1};case Vo:case ev:case ko:return{byteLength:2,components:1};case Fd:case Hd:return{byteLength:2,components:4};case As:case Id:case ca:return{byteLength:4,components:1};case nv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bd);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Av(){let o=null,t=!1,i=null,s=null;function l(c,h){i(c,h),s=o.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(s=o.requestAnimationFrame(l),t=!0)},stop:function(){o.cancelAnimationFrame(s),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){o=c}}}function CM(o){const t=new WeakMap;function i(d,m){const p=d.array,_=d.usage,S=p.byteLength,y=o.createBuffer();o.bindBuffer(m,y),o.bufferData(m,p,_),d.onUploadCallback();let M;if(p instanceof Float32Array)M=o.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=o.SHORT;else if(p instanceof Uint32Array)M=o.UNSIGNED_INT;else if(p instanceof Int32Array)M=o.INT;else if(p instanceof Int8Array)M=o.BYTE;else if(p instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:S}}function s(d,m,p){const _=m.array,S=m.updateRanges;if(o.bindBuffer(p,d),S.length===0)o.bufferSubData(p,0,_);else{S.sort((M,R)=>M.start-R.start);let y=0;for(let M=1;M<S.length;M++){const R=S[y],w=S[M];w.start<=R.start+R.count+1?R.count=Math.max(R.count,w.start+w.count-R.start):(++y,S[y]=w)}S.length=y+1;for(let M=0,R=S.length;M<R;M++){const w=S[M];o.bufferSubData(p,w.start*_.BYTES_PER_ELEMENT,_,w.start,w.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(o.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const _=t.get(d);(!_||_.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var wM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,DM=`#ifdef USE_ALPHAHASH
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
#endif`,UM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,LM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,OM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,PM=`#ifdef USE_AOMAP
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
#endif`,zM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BM=`#ifdef USE_BATCHING
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
#endif`,IM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,FM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,HM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,GM=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,VM=`#ifdef USE_IRIDESCENCE
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
#endif`,kM=`#ifdef USE_BUMPMAP
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
#endif`,XM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,WM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,YM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ZM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,KM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,QM=`#if defined( USE_COLOR_ALPHA )
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
#endif`,JM=`#define PI 3.141592653589793
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
} // validated`,$M=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tE=`vec3 transformedNormal = objectNormal;
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
#endif`,eE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,aE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sE="gl_FragColor = linearToOutputTexel( gl_FragColor );",rE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,oE=`#ifdef USE_ENVMAP
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
#endif`,lE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cE=`#ifdef USE_ENVMAP
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
#endif`,uE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fE=`#ifdef USE_ENVMAP
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
#endif`,hE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gE=`#ifdef USE_GRADIENTMAP
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
}`,_E=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,SE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yE=`uniform bool receiveShadow;
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
#endif`,xE=`#ifdef USE_ENVMAP
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
#endif`,ME=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,EE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,TE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,AE=`PhysicalMaterial material;
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
#endif`,RE=`struct PhysicalMaterial {
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
}`,CE=`
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
#endif`,wE=`#if defined( RE_IndirectDiffuse )
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
#endif`,DE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,UE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,LE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,PE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,BE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,IE=`#if defined( USE_POINTS_UV )
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
#endif`,FE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,HE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,GE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,VE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,XE=`#ifdef USE_MORPHTARGETS
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
#endif`,WE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,YE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,KE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,QE=`#ifdef USE_NORMALMAP
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
#endif`,JE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$E=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,aT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dT=`float getShadowMask() {
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
}`,pT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mT=`#ifdef USE_SKINNING
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
#endif`,gT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_T=`#ifdef USE_SKINNING
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
#endif`,vT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ST=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,MT=`#ifdef USE_TRANSMISSION
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
#endif`,ET=`#ifdef USE_TRANSMISSION
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
#endif`,TT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,AT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const CT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wT=`uniform sampler2D t2D;
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
}`,DT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,LT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OT=`#include <common>
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
}`,PT=`#if DEPTH_PACKING == 3200
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
}`,zT=`#define DISTANCE
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
}`,BT=`#define DISTANCE
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
}`,IT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,FT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HT=`uniform float scale;
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
}`,GT=`uniform vec3 diffuse;
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
}`,VT=`#include <common>
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
}`,kT=`uniform vec3 diffuse;
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
}`,XT=`#define LAMBERT
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
}`,WT=`#define LAMBERT
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
}`,qT=`#define MATCAP
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
}`,YT=`#define MATCAP
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
}`,jT=`#define NORMAL
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
}`,ZT=`#define NORMAL
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
}`,KT=`#define PHONG
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
}`,QT=`#define PHONG
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
}`,JT=`#define STANDARD
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
}`,$T=`#define STANDARD
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
}`,tb=`#define TOON
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
}`,eb=`#define TOON
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
}`,nb=`uniform float size;
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
}`,ib=`uniform vec3 diffuse;
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
}`,ab=`#include <common>
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
}`,sb=`uniform vec3 color;
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
}`,rb=`uniform float rotation;
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
}`,ob=`uniform vec3 diffuse;
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
}`,ce={alphahash_fragment:wM,alphahash_pars_fragment:DM,alphamap_fragment:UM,alphamap_pars_fragment:LM,alphatest_fragment:NM,alphatest_pars_fragment:OM,aomap_fragment:PM,aomap_pars_fragment:zM,batching_pars_vertex:BM,batching_vertex:IM,begin_vertex:FM,beginnormal_vertex:HM,bsdfs:GM,iridescence_fragment:VM,bumpmap_pars_fragment:kM,clipping_planes_fragment:XM,clipping_planes_pars_fragment:WM,clipping_planes_pars_vertex:qM,clipping_planes_vertex:YM,color_fragment:jM,color_pars_fragment:ZM,color_pars_vertex:KM,color_vertex:QM,common:JM,cube_uv_reflection_fragment:$M,defaultnormal_vertex:tE,displacementmap_pars_vertex:eE,displacementmap_vertex:nE,emissivemap_fragment:iE,emissivemap_pars_fragment:aE,colorspace_fragment:sE,colorspace_pars_fragment:rE,envmap_fragment:oE,envmap_common_pars_fragment:lE,envmap_pars_fragment:cE,envmap_pars_vertex:uE,envmap_physical_pars_fragment:xE,envmap_vertex:fE,fog_vertex:hE,fog_pars_vertex:dE,fog_fragment:pE,fog_pars_fragment:mE,gradientmap_pars_fragment:gE,lightmap_pars_fragment:_E,lights_lambert_fragment:vE,lights_lambert_pars_fragment:SE,lights_pars_begin:yE,lights_toon_fragment:ME,lights_toon_pars_fragment:EE,lights_phong_fragment:TE,lights_phong_pars_fragment:bE,lights_physical_fragment:AE,lights_physical_pars_fragment:RE,lights_fragment_begin:CE,lights_fragment_maps:wE,lights_fragment_end:DE,logdepthbuf_fragment:UE,logdepthbuf_pars_fragment:LE,logdepthbuf_pars_vertex:NE,logdepthbuf_vertex:OE,map_fragment:PE,map_pars_fragment:zE,map_particle_fragment:BE,map_particle_pars_fragment:IE,metalnessmap_fragment:FE,metalnessmap_pars_fragment:HE,morphinstance_vertex:GE,morphcolor_vertex:VE,morphnormal_vertex:kE,morphtarget_pars_vertex:XE,morphtarget_vertex:WE,normal_fragment_begin:qE,normal_fragment_maps:YE,normal_pars_fragment:jE,normal_pars_vertex:ZE,normal_vertex:KE,normalmap_pars_fragment:QE,clearcoat_normal_fragment_begin:JE,clearcoat_normal_fragment_maps:$E,clearcoat_pars_fragment:tT,iridescence_pars_fragment:eT,opaque_fragment:nT,packing:iT,premultiplied_alpha_fragment:aT,project_vertex:sT,dithering_fragment:rT,dithering_pars_fragment:oT,roughnessmap_fragment:lT,roughnessmap_pars_fragment:cT,shadowmap_pars_fragment:uT,shadowmap_pars_vertex:fT,shadowmap_vertex:hT,shadowmask_pars_fragment:dT,skinbase_vertex:pT,skinning_pars_vertex:mT,skinning_vertex:gT,skinnormal_vertex:_T,specularmap_fragment:vT,specularmap_pars_fragment:ST,tonemapping_fragment:yT,tonemapping_pars_fragment:xT,transmission_fragment:MT,transmission_pars_fragment:ET,uv_pars_fragment:TT,uv_pars_vertex:bT,uv_vertex:AT,worldpos_vertex:RT,background_vert:CT,background_frag:wT,backgroundCube_vert:DT,backgroundCube_frag:UT,cube_vert:LT,cube_frag:NT,depth_vert:OT,depth_frag:PT,distanceRGBA_vert:zT,distanceRGBA_frag:BT,equirect_vert:IT,equirect_frag:FT,linedashed_vert:HT,linedashed_frag:GT,meshbasic_vert:VT,meshbasic_frag:kT,meshlambert_vert:XT,meshlambert_frag:WT,meshmatcap_vert:qT,meshmatcap_frag:YT,meshnormal_vert:jT,meshnormal_frag:ZT,meshphong_vert:KT,meshphong_frag:QT,meshphysical_vert:JT,meshphysical_frag:$T,meshtoon_vert:tb,meshtoon_frag:eb,points_vert:nb,points_frag:ib,shadow_vert:ab,shadow_frag:sb,sprite_vert:rb,sprite_frag:ob},Lt={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new le}},envmap:{envMap:{value:null},envMapRotation:{value:new le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new le},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0},uvTransform:{value:new le}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new le},alphaMap:{value:null},alphaMapTransform:{value:new le},alphaTest:{value:0}}},Pi={basic:{uniforms:Pn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:Pn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new ue(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:Pn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:Pn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:Pn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new ue(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:Pn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:Pn([Lt.points,Lt.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:Pn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:Pn([Lt.common,Lt.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:Pn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:Pn([Lt.sprite,Lt.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new le}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:Pn([Lt.common,Lt.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:Pn([Lt.lights,Lt.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};Pi.physical={uniforms:Pn([Pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new le},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new le},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new le},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new le},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new le},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new le}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const Tc={r:0,b:0,g:0},Ss=new Bi,lb=new Ze;function cb(o,t,i,s,l,c,h){const d=new ue(0);let m=c===!0?0:1,p,_,S=null,y=0,M=null;function R(N){let U=N.isScene===!0?N.background:null;return U&&U.isTexture&&(U=(N.backgroundBlurriness>0?i:t).get(U)),U}function w(N){let U=!1;const q=R(N);q===null?v(d,m):q&&q.isColor&&(v(q,1),U=!0);const G=o.xr.getEnvironmentBlendMode();G==="additive"?s.buffers.color.setClear(0,0,0,1,h):G==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||U)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function x(N,U){const q=R(U);q&&(q.isCubeTexture||q.mapping===kc)?(_===void 0&&(_=new Wn(new Ir(1,1,1),new ja({name:"BackgroundCubeMaterial",uniforms:Br(Pi.backgroundCube.uniforms),vertexShader:Pi.backgroundCube.vertexShader,fragmentShader:Pi.backgroundCube.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(G,P,K){this.matrixWorld.copyPosition(K.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(_)),Ss.copy(U.backgroundRotation),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,q.isCubeTexture&&q.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),_.material.uniforms.envMap.value=q,_.material.uniforms.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(lb.makeRotationFromEuler(Ss)),_.material.toneMapped=we.getTransfer(q.colorSpace)!==Fe,(S!==q||y!==q.version||M!==o.toneMapping)&&(_.material.needsUpdate=!0,S=q,y=q.version,M=o.toneMapping),_.layers.enableAll(),N.unshift(_,_.geometry,_.material,0,0,null)):q&&q.isTexture&&(p===void 0&&(p=new Wn(new Wo(2,2),new ja({name:"BackgroundMaterial",uniforms:Br(Pi.background.uniforms),vertexShader:Pi.background.vertexShader,fragmentShader:Pi.background.fragmentShader,side:qa,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=q,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.toneMapped=we.getTransfer(q.colorSpace)!==Fe,q.matrixAutoUpdate===!0&&q.updateMatrix(),p.material.uniforms.uvTransform.value.copy(q.matrix),(S!==q||y!==q.version||M!==o.toneMapping)&&(p.material.needsUpdate=!0,S=q,y=q.version,M=o.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function v(N,U){N.getRGB(Tc,vv(o)),s.buffers.color.setClear(Tc.r,Tc.g,Tc.b,U,h)}function I(){_!==void 0&&(_.geometry.dispose(),_.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(N,U=1){d.set(N),m=U,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(N){m=N,v(d,m)},render:w,addToRenderList:x,dispose:I}}function ub(o,t){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=y(null);let c=l,h=!1;function d(b,B,lt,rt,mt){let gt=!1;const O=S(rt,lt,B);c!==O&&(c=O,p(c.object)),gt=M(b,rt,lt,mt),gt&&R(b,rt,lt,mt),mt!==null&&t.update(mt,o.ELEMENT_ARRAY_BUFFER),(gt||h)&&(h=!1,U(b,B,lt,rt),mt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(mt).buffer))}function m(){return o.createVertexArray()}function p(b){return o.bindVertexArray(b)}function _(b){return o.deleteVertexArray(b)}function S(b,B,lt){const rt=lt.wireframe===!0;let mt=s[b.id];mt===void 0&&(mt={},s[b.id]=mt);let gt=mt[B.id];gt===void 0&&(gt={},mt[B.id]=gt);let O=gt[rt];return O===void 0&&(O=y(m()),gt[rt]=O),O}function y(b){const B=[],lt=[],rt=[];for(let mt=0;mt<i;mt++)B[mt]=0,lt[mt]=0,rt[mt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:lt,attributeDivisors:rt,object:b,attributes:{},index:null}}function M(b,B,lt,rt){const mt=c.attributes,gt=B.attributes;let O=0;const Q=lt.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const Tt=mt[Z];let L=gt[Z];if(L===void 0&&(Z==="instanceMatrix"&&b.instanceMatrix&&(L=b.instanceMatrix),Z==="instanceColor"&&b.instanceColor&&(L=b.instanceColor)),Tt===void 0||Tt.attribute!==L||L&&Tt.data!==L.data)return!0;O++}return c.attributesNum!==O||c.index!==rt}function R(b,B,lt,rt){const mt={},gt=B.attributes;let O=0;const Q=lt.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let Tt=gt[Z];Tt===void 0&&(Z==="instanceMatrix"&&b.instanceMatrix&&(Tt=b.instanceMatrix),Z==="instanceColor"&&b.instanceColor&&(Tt=b.instanceColor));const L={};L.attribute=Tt,Tt&&Tt.data&&(L.data=Tt.data),mt[Z]=L,O++}c.attributes=mt,c.attributesNum=O,c.index=rt}function w(){const b=c.newAttributes;for(let B=0,lt=b.length;B<lt;B++)b[B]=0}function x(b){v(b,0)}function v(b,B){const lt=c.newAttributes,rt=c.enabledAttributes,mt=c.attributeDivisors;lt[b]=1,rt[b]===0&&(o.enableVertexAttribArray(b),rt[b]=1),mt[b]!==B&&(o.vertexAttribDivisor(b,B),mt[b]=B)}function I(){const b=c.newAttributes,B=c.enabledAttributes;for(let lt=0,rt=B.length;lt<rt;lt++)B[lt]!==b[lt]&&(o.disableVertexAttribArray(lt),B[lt]=0)}function N(b,B,lt,rt,mt,gt,O){O===!0?o.vertexAttribIPointer(b,B,lt,mt,gt):o.vertexAttribPointer(b,B,lt,rt,mt,gt)}function U(b,B,lt,rt){w();const mt=rt.attributes,gt=lt.getAttributes(),O=B.defaultAttributeValues;for(const Q in gt){const Z=gt[Q];if(Z.location>=0){let xt=mt[Q];if(xt===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(xt=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(xt=b.instanceColor)),xt!==void 0){const Tt=xt.normalized,L=xt.itemSize,nt=t.get(xt);if(nt===void 0)continue;const yt=nt.buffer,Y=nt.type,ct=nt.bytesPerElement,Et=Y===o.INT||Y===o.UNSIGNED_INT||xt.gpuType===Id;if(xt.isInterleavedBufferAttribute){const St=xt.data,Gt=St.stride,Ft=xt.offset;if(St.isInstancedInterleavedBuffer){for(let ne=0;ne<Z.locationSize;ne++)v(Z.location+ne,St.meshPerAttribute);b.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let ne=0;ne<Z.locationSize;ne++)x(Z.location+ne);o.bindBuffer(o.ARRAY_BUFFER,yt);for(let ne=0;ne<Z.locationSize;ne++)N(Z.location+ne,L/Z.locationSize,Y,Tt,Gt*ct,(Ft+L/Z.locationSize*ne)*ct,Et)}else{if(xt.isInstancedBufferAttribute){for(let St=0;St<Z.locationSize;St++)v(Z.location+St,xt.meshPerAttribute);b.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let St=0;St<Z.locationSize;St++)x(Z.location+St);o.bindBuffer(o.ARRAY_BUFFER,yt);for(let St=0;St<Z.locationSize;St++)N(Z.location+St,L/Z.locationSize,Y,Tt,L*ct,L/Z.locationSize*St*ct,Et)}}else if(O!==void 0){const Tt=O[Q];if(Tt!==void 0)switch(Tt.length){case 2:o.vertexAttrib2fv(Z.location,Tt);break;case 3:o.vertexAttrib3fv(Z.location,Tt);break;case 4:o.vertexAttrib4fv(Z.location,Tt);break;default:o.vertexAttrib1fv(Z.location,Tt)}}}}I()}function q(){K();for(const b in s){const B=s[b];for(const lt in B){const rt=B[lt];for(const mt in rt)_(rt[mt].object),delete rt[mt];delete B[lt]}delete s[b]}}function G(b){if(s[b.id]===void 0)return;const B=s[b.id];for(const lt in B){const rt=B[lt];for(const mt in rt)_(rt[mt].object),delete rt[mt];delete B[lt]}delete s[b.id]}function P(b){for(const B in s){const lt=s[B];if(lt[b.id]===void 0)continue;const rt=lt[b.id];for(const mt in rt)_(rt[mt].object),delete rt[mt];delete lt[b.id]}}function K(){T(),h=!0,c!==l&&(c=l,p(c.object))}function T(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:K,resetDefaultState:T,dispose:q,releaseStatesOfGeometry:G,releaseStatesOfProgram:P,initAttributes:w,enableAttribute:x,disableUnusedAttributes:I}}function fb(o,t,i){let s;function l(p){s=p}function c(p,_){o.drawArrays(s,p,_),i.update(_,s,1)}function h(p,_,S){S!==0&&(o.drawArraysInstanced(s,p,_,S),i.update(_,s,S))}function d(p,_,S){if(S===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,_,0,S);let M=0;for(let R=0;R<S;R++)M+=_[R];i.update(M,s,1)}function m(p,_,S,y){if(S===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let R=0;R<p.length;R++)h(p[R],_[R],y[R]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,_,0,y,0,S);let R=0;for(let w=0;w<S;w++)R+=_[w]*y[w];i.update(R,s,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function hb(o,t,i,s){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");l=o.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(P){return!(P!==Ai&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(P){const K=P===ko&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==ha&&s.convert(P)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ca&&!K)}function m(P){if(P==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const _=m(p);_!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const S=i.logarithmicDepthBuffer===!0,y=i.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),R=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=o.getParameter(o.MAX_TEXTURE_SIZE),x=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),v=o.getParameter(o.MAX_VERTEX_ATTRIBS),I=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),N=o.getParameter(o.MAX_VARYING_VECTORS),U=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),q=R>0,G=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:S,reverseDepthBuffer:y,maxTextures:M,maxVertexTextures:R,maxTextureSize:w,maxCubemapSize:x,maxAttributes:v,maxVertexUniforms:I,maxVaryings:N,maxFragmentUniforms:U,vertexTextures:q,maxSamples:G}}function db(o){const t=this;let i=null,s=0,l=!1,c=!1;const h=new Oi,d=new le,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(S,y){const M=S.length!==0||y||s!==0||l;return l=y,s=S.length,M},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(S,y){i=_(S,y,0)},this.setState=function(S,y,M){const R=S.clippingPlanes,w=S.clipIntersection,x=S.clipShadows,v=o.get(S);if(!l||R===null||R.length===0||c&&!x)c?_(null):p();else{const I=c?0:s,N=I*4;let U=v.clippingState||null;m.value=U,U=_(R,y,N,M);for(let q=0;q!==N;++q)U[q]=i[q];v.clippingState=U,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=I}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),t.numPlanes=s,t.numIntersection=0}function _(S,y,M,R){const w=S!==null?S.length:0;let x=null;if(w!==0){if(x=m.value,R!==!0||x===null){const v=M+w*4,I=y.matrixWorldInverse;d.getNormalMatrix(I),(x===null||x.length<v)&&(x=new Float32Array(v));for(let N=0,U=M;N!==w;++N,U+=4)h.copy(S[N]).applyMatrix4(I,d),h.normal.toArray(x,U),x[U+3]=h.constant}m.value=x,m.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,x}}function pb(o){let t=new WeakMap;function i(h,d){return d===id?h.mapping=Lr:d===ad&&(h.mapping=Nr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===id||d===ad)if(t.has(h)){const m=t.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new fM(m.height);return p.fromEquirectangularTexture(o,h),t.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=t.get(d);m!==void 0&&(t.delete(d),m.dispose())}function c(){t=new WeakMap}return{get:s,dispose:c}}const Ar=4,y0=[.125,.215,.35,.446,.526,.582],Es=20,Lh=new bv,x0=new ue;let Nh=null,Oh=0,Ph=0,zh=!1;const xs=(1+Math.sqrt(5))/2,Er=1/xs,M0=[new j(-xs,Er,0),new j(xs,Er,0),new j(-Er,0,xs),new j(Er,0,xs),new j(0,xs,-Er),new j(0,xs,Er),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class E0{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,i=0,s=.1,l=100){Nh=this._renderer.getRenderTarget(),Oh=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=A0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=b0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Nh,Oh,Ph),this._renderer.xr.enabled=zh,t.scissorTest=!1,bc(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Lr||t.mapping===Nr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Nh=this._renderer.getRenderTarget(),Oh=this._renderer.getActiveCubeFace(),Ph=this._renderer.getActiveMipmapLevel(),zh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(t,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:zi,minFilter:zi,generateMipmaps:!1,type:ko,format:Ai,colorSpace:zr,depthBuffer:!1},l=T0(t,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=T0(t,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mb(c)),this._blurMaterial=gb(c,t,i)}return l}_compileMaterial(t){const i=new Wn(this._lodPlanes[0],t);this._renderer.compile(i,Lh)}_sceneToCubeUV(t,i,s,l){const d=new mi(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],_=this._renderer,S=_.autoClear,y=_.toneMapping;_.getClearColor(x0),_.toneMapping=Wa,_.autoClear=!1;const M=new Fc({name:"PMREM.Background",side:qn,depthWrite:!1,depthTest:!1}),R=new Wn(new Ir,M);let w=!1;const x=t.background;x?x.isColor&&(M.color.copy(x),t.background=null,w=!0):(M.color.copy(x0),w=!0);for(let v=0;v<6;v++){const I=v%3;I===0?(d.up.set(0,m[v],0),d.lookAt(p[v],0,0)):I===1?(d.up.set(0,0,m[v]),d.lookAt(0,p[v],0)):(d.up.set(0,m[v],0),d.lookAt(0,0,p[v]));const N=this._cubeSize;bc(l,I*N,v>2?N:0,N,N),_.setRenderTarget(l),w&&_.render(R,d),_.render(t,d)}R.geometry.dispose(),R.material.dispose(),_.toneMapping=y,_.autoClear=S,t.background=x}_textureToCubeUV(t,i){const s=this._renderer,l=t.mapping===Lr||t.mapping===Nr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=A0()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=b0());const c=l?this._cubemapMaterial:this._equirectMaterial,h=new Wn(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;bc(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Lh)}_applyPMREM(t){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const h=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=M0[(l-c-1)%M0.length];this._blur(t,c-1,c,h,d)}i.autoClear=s}_blur(t,i,s,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,s,l,"latitudinal",c),this._halfBlur(h,t,s,s,l,"longitudinal",c)}_halfBlur(t,i,s,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,S=new Wn(this._lodPlanes[l],p),y=p.uniforms,M=this._sizeLods[s]-1,R=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Es-1),w=c/R,x=isFinite(c)?1+Math.floor(_*w):Es;x>Es&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Es}`);const v=[];let I=0;for(let P=0;P<Es;++P){const K=P/w,T=Math.exp(-K*K/2);v.push(T),P===0?I+=T:P<x&&(I+=2*T)}for(let P=0;P<v.length;P++)v[P]=v[P]/I;y.envMap.value=t.texture,y.samples.value=x,y.weights.value=v,y.latitudinal.value=h==="latitudinal",d&&(y.poleAxis.value=d);const{_lodMax:N}=this;y.dTheta.value=R,y.mipInt.value=N-s;const U=this._sizeLods[l],q=3*U*(l>N-Ar?l-N+Ar:0),G=4*(this._cubeSize-U);bc(i,q,G,3*U,2*U),m.setRenderTarget(i),m.render(S,Lh)}}function mb(o){const t=[],i=[],s=[];let l=o;const c=o-Ar+1+y0.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>o-Ar?m=y0[h-o+Ar-1]:h===0&&(m=0),s.push(m);const p=1/(d-2),_=-p,S=1+p,y=[_,_,S,_,S,S,_,_,S,S,_,S],M=6,R=6,w=3,x=2,v=1,I=new Float32Array(w*R*M),N=new Float32Array(x*R*M),U=new Float32Array(v*R*M);for(let G=0;G<M;G++){const P=G%3*2/3-1,K=G>2?0:-1,T=[P,K,0,P+2/3,K,0,P+2/3,K+1,0,P,K,0,P+2/3,K+1,0,P,K+1,0];I.set(T,w*R*G),N.set(y,x*R*G);const b=[G,G,G,G,G,G];U.set(b,v*R*G)}const q=new ai;q.setAttribute("position",new zn(I,w)),q.setAttribute("uv",new zn(N,x)),q.setAttribute("faceIndex",new zn(U,v)),t.push(q),l>Ar&&l--}return{lodPlanes:t,sizeLods:i,sigmas:s}}function T0(o,t,i){const s=new Rs(o,t,i);return s.texture.mapping=kc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function bc(o,t,i,s,l){o.viewport.set(t,i,s,l),o.scissor.set(t,i,s,l)}function gb(o,t,i){const s=new Float32Array(Es),l=new j(0,1,0);return new ja({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:jd(),fragmentShader:`

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
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function b0(){return new ja({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jd(),fragmentShader:`

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
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function A0(){return new ja({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function jd(){return`

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
	`}function _b(o){let t=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===id||m===ad,_=m===Lr||m===Nr;if(p||_){let S=t.get(d);const y=S!==void 0?S.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==y)return i===null&&(i=new E0(o)),S=p?i.fromEquirectangular(d,S):i.fromCubemap(d,S),S.texture.pmremVersion=d.pmremVersion,t.set(d,S),S.texture;if(S!==void 0)return S.texture;{const M=d.image;return p&&M&&M.height>0||_&&M&&l(M)?(i===null&&(i=new E0(o)),S=p?i.fromEquirectangular(d):i.fromCubemap(d),S.texture.pmremVersion=d.pmremVersion,t.set(d,S),d.addEventListener("dispose",c),S.texture):null}}}return d}function l(d){let m=0;const p=6;for(let _=0;_<p;_++)d[_]!==void 0&&m++;return m===p}function c(d){const m=d.target;m.removeEventListener("dispose",c);const p=t.get(m);p!==void 0&&(t.delete(m),p.dispose())}function h(){t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function vb(o){const t={};function i(s){if(t[s]!==void 0)return t[s];let l;switch(s){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(s)}return t[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Tr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function Sb(o,t,i,s){const l={},c=new WeakMap;function h(S){const y=S.target;y.index!==null&&t.remove(y.index);for(const R in y.attributes)t.remove(y.attributes[R]);y.removeEventListener("dispose",h),delete l[y.id];const M=c.get(y);M&&(t.remove(M),c.delete(y)),s.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,i.memory.geometries--}function d(S,y){return l[y.id]===!0||(y.addEventListener("dispose",h),l[y.id]=!0,i.memory.geometries++),y}function m(S){const y=S.attributes;for(const M in y)t.update(y[M],o.ARRAY_BUFFER)}function p(S){const y=[],M=S.index,R=S.attributes.position;let w=0;if(M!==null){const I=M.array;w=M.version;for(let N=0,U=I.length;N<U;N+=3){const q=I[N+0],G=I[N+1],P=I[N+2];y.push(q,G,G,P,P,q)}}else if(R!==void 0){const I=R.array;w=R.version;for(let N=0,U=I.length/3-1;N<U;N+=3){const q=N+0,G=N+1,P=N+2;y.push(q,G,G,P,P,q)}}else return;const x=new(hv(y)?_v:gv)(y,1);x.version=w;const v=c.get(S);v&&t.remove(v),c.set(S,x)}function _(S){const y=c.get(S);if(y){const M=S.index;M!==null&&y.version<M.version&&p(S)}else p(S);return c.get(S)}return{get:d,update:m,getWireframeAttribute:_}}function yb(o,t,i){let s;function l(y){s=y}let c,h;function d(y){c=y.type,h=y.bytesPerElement}function m(y,M){o.drawElements(s,M,c,y*h),i.update(M,s,1)}function p(y,M,R){R!==0&&(o.drawElementsInstanced(s,M,c,y*h,R),i.update(M,s,R))}function _(y,M,R){if(R===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,y,0,R);let x=0;for(let v=0;v<R;v++)x+=M[v];i.update(x,s,1)}function S(y,M,R,w){if(R===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let v=0;v<y.length;v++)p(y[v]/h,M[v],w[v]);else{x.multiDrawElementsInstancedWEBGL(s,M,0,c,y,0,w,0,R);let v=0;for(let I=0;I<R;I++)v+=M[I]*w[I];i.update(v,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=_,this.renderMultiDrawInstances=S}function xb(o){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(c/3);break;case o.LINES:i.lines+=d*(c/2);break;case o.LINE_STRIP:i.lines+=d*(c-1);break;case o.LINE_LOOP:i.lines+=d*c;break;case o.POINTS:i.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Mb(o,t,i){const s=new WeakMap,l=new $e;function c(h,d,m){const p=h.morphTargetInfluences,_=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,S=_!==void 0?_.length:0;let y=s.get(d);if(y===void 0||y.count!==S){let b=function(){K.dispose(),s.delete(d),d.removeEventListener("dispose",b)};var M=b;y!==void 0&&y.texture.dispose();const R=d.morphAttributes.position!==void 0,w=d.morphAttributes.normal!==void 0,x=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],N=d.morphAttributes.color||[];let U=0;R===!0&&(U=1),w===!0&&(U=2),x===!0&&(U=3);let q=d.attributes.position.count*U,G=1;q>t.maxTextureSize&&(G=Math.ceil(q/t.maxTextureSize),q=t.maxTextureSize);const P=new Float32Array(q*G*4*S),K=new pv(P,q,G,S);K.type=ca,K.needsUpdate=!0;const T=U*4;for(let B=0;B<S;B++){const lt=v[B],rt=I[B],mt=N[B],gt=q*G*4*B;for(let O=0;O<lt.count;O++){const Q=O*T;R===!0&&(l.fromBufferAttribute(lt,O),P[gt+Q+0]=l.x,P[gt+Q+1]=l.y,P[gt+Q+2]=l.z,P[gt+Q+3]=0),w===!0&&(l.fromBufferAttribute(rt,O),P[gt+Q+4]=l.x,P[gt+Q+5]=l.y,P[gt+Q+6]=l.z,P[gt+Q+7]=0),x===!0&&(l.fromBufferAttribute(mt,O),P[gt+Q+8]=l.x,P[gt+Q+9]=l.y,P[gt+Q+10]=l.z,P[gt+Q+11]=mt.itemSize===4?l.w:1)}}y={count:S,texture:K,size:new ie(q,G)},s.set(d,y),d.addEventListener("dispose",b)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let R=0;for(let x=0;x<p.length;x++)R+=p[x];const w=d.morphTargetsRelative?1:1-R;m.getUniforms().setValue(o,"morphTargetBaseInfluence",w),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",y.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",y.size)}return{update:c}}function Eb(o,t,i,s){let l=new WeakMap;function c(m){const p=s.render.frame,_=m.geometry,S=t.get(m,_);if(l.get(S)!==p&&(t.update(S),l.set(S,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const y=m.skeleton;l.get(y)!==p&&(y.update(),l.set(y,p))}return S}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:c,dispose:h}}const Rv=new Yn,R0=new Ev(1,1),Cv=new pv,wv=new Zx,Dv=new yv,C0=[],w0=[],D0=new Float32Array(16),U0=new Float32Array(9),L0=new Float32Array(4);function Fr(o,t,i){const s=o[0];if(s<=0||s>0)return o;const l=t*i;let c=C0[l];if(c===void 0&&(c=new Float32Array(l),C0[l]=c),t!==0){s.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,o[h].toArray(c,d)}return c}function pn(o,t){if(o.length!==t.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==t[i])return!1;return!0}function mn(o,t){for(let i=0,s=t.length;i<s;i++)o[i]=t[i]}function Yc(o,t){let i=w0[t];i===void 0&&(i=new Int32Array(t),w0[t]=i);for(let s=0;s!==t;++s)i[s]=o.allocateTextureUnit();return i}function Tb(o,t){const i=this.cache;i[0]!==t&&(o.uniform1f(this.addr,t),i[0]=t)}function bb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2fv(this.addr,t),mn(i,t)}}function Ab(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(pn(i,t))return;o.uniform3fv(this.addr,t),mn(i,t)}}function Rb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4fv(this.addr,t),mn(i,t)}}function Cb(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix2fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;L0.set(s),o.uniformMatrix2fv(this.addr,!1,L0),mn(i,s)}}function wb(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix3fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;U0.set(s),o.uniformMatrix3fv(this.addr,!1,U0),mn(i,s)}}function Db(o,t){const i=this.cache,s=t.elements;if(s===void 0){if(pn(i,t))return;o.uniformMatrix4fv(this.addr,!1,t),mn(i,t)}else{if(pn(i,s))return;D0.set(s),o.uniformMatrix4fv(this.addr,!1,D0),mn(i,s)}}function Ub(o,t){const i=this.cache;i[0]!==t&&(o.uniform1i(this.addr,t),i[0]=t)}function Lb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2iv(this.addr,t),mn(i,t)}}function Nb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(pn(i,t))return;o.uniform3iv(this.addr,t),mn(i,t)}}function Ob(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4iv(this.addr,t),mn(i,t)}}function Pb(o,t){const i=this.cache;i[0]!==t&&(o.uniform1ui(this.addr,t),i[0]=t)}function zb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(pn(i,t))return;o.uniform2uiv(this.addr,t),mn(i,t)}}function Bb(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(pn(i,t))return;o.uniform3uiv(this.addr,t),mn(i,t)}}function Ib(o,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(pn(i,t))return;o.uniform4uiv(this.addr,t),mn(i,t)}}function Fb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let c;this.type===o.SAMPLER_2D_SHADOW?(R0.compareFunction=fv,c=R0):c=Rv,i.setTexture2D(t||c,l)}function Hb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(t||wv,l)}function Gb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(t||Dv,l)}function Vb(o,t,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(t||Cv,l)}function kb(o){switch(o){case 5126:return Tb;case 35664:return bb;case 35665:return Ab;case 35666:return Rb;case 35674:return Cb;case 35675:return wb;case 35676:return Db;case 5124:case 35670:return Ub;case 35667:case 35671:return Lb;case 35668:case 35672:return Nb;case 35669:case 35673:return Ob;case 5125:return Pb;case 36294:return zb;case 36295:return Bb;case 36296:return Ib;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Hb;case 35680:case 36300:case 36308:case 36293:return Gb;case 36289:case 36303:case 36311:case 36292:return Vb}}function Xb(o,t){o.uniform1fv(this.addr,t)}function Wb(o,t){const i=Fr(t,this.size,2);o.uniform2fv(this.addr,i)}function qb(o,t){const i=Fr(t,this.size,3);o.uniform3fv(this.addr,i)}function Yb(o,t){const i=Fr(t,this.size,4);o.uniform4fv(this.addr,i)}function jb(o,t){const i=Fr(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function Zb(o,t){const i=Fr(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function Kb(o,t){const i=Fr(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function Qb(o,t){o.uniform1iv(this.addr,t)}function Jb(o,t){o.uniform2iv(this.addr,t)}function $b(o,t){o.uniform3iv(this.addr,t)}function tA(o,t){o.uniform4iv(this.addr,t)}function eA(o,t){o.uniform1uiv(this.addr,t)}function nA(o,t){o.uniform2uiv(this.addr,t)}function iA(o,t){o.uniform3uiv(this.addr,t)}function aA(o,t){o.uniform4uiv(this.addr,t)}function sA(o,t,i){const s=this.cache,l=t.length,c=Yc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTexture2D(t[h]||Rv,c[h])}function rA(o,t,i){const s=this.cache,l=t.length,c=Yc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||wv,c[h])}function oA(o,t,i){const s=this.cache,l=t.length,c=Yc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||Dv,c[h])}function lA(o,t,i){const s=this.cache,l=t.length,c=Yc(i,l);pn(s,c)||(o.uniform1iv(this.addr,c),mn(s,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||Cv,c[h])}function cA(o){switch(o){case 5126:return Xb;case 35664:return Wb;case 35665:return qb;case 35666:return Yb;case 35674:return jb;case 35675:return Zb;case 35676:return Kb;case 5124:case 35670:return Qb;case 35667:case 35671:return Jb;case 35668:case 35672:return $b;case 35669:case 35673:return tA;case 5125:return eA;case 36294:return nA;case 36295:return iA;case 36296:return aA;case 35678:case 36198:case 36298:case 36306:case 35682:return sA;case 35679:case 36299:case 36307:return rA;case 35680:case 36300:case 36308:case 36293:return oA;case 36289:case 36303:case 36311:case 36292:return lA}}class uA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.setValue=kb(i.type)}}class fA{constructor(t,i,s){this.id=t,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=cA(i.type)}}class hA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,s){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],s)}}}const Bh=/(\w+)(\])?(\[|\.)?/g;function N0(o,t){o.seq.push(t),o.map[t.id]=t}function dA(o,t,i){const s=o.name,l=s.length;for(Bh.lastIndex=0;;){const c=Bh.exec(s),h=Bh.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){N0(i,p===void 0?new uA(d,o,t):new fA(d,o,t));break}else{let S=i.map[d];S===void 0&&(S=new hA(d),N0(i,S)),i=S}}}class Pc{constructor(t,i){this.seq=[],this.map={};const s=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=t.getActiveUniform(i,l),h=t.getUniformLocation(i,c.name);dA(c,h,this)}}setValue(t,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(t,s,l)}setOptional(t,i,s){const l=i[s];l!==void 0&&this.setValue(t,s,l)}static upload(t,i,s,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const s=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&s.push(h)}return s}}function O0(o,t,i){const s=o.createShader(t);return o.shaderSource(s,i),o.compileShader(s),s}const pA=37297;let mA=0;function gA(o,t){const i=o.split(`
`),s=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;s.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const P0=new le;function _A(o){we._getMatrix(P0,we.workingColorSpace,o);const t=`mat3( ${P0.elements.map(i=>i.toFixed(4))} )`;switch(we.getTransfer(o)){case zc:return[t,"LinearTransferOETF"];case Fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function z0(o,t,i){const s=o.getShaderParameter(t,o.COMPILE_STATUS),l=o.getShaderInfoLog(t).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const h=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+gA(o.getShaderSource(t),h)}else return l}function vA(o,t){const i=_A(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function SA(o,t){let i;switch(t){case yx:i="Linear";break;case xx:i="Reinhard";break;case Mx:i="Cineon";break;case Ex:i="ACESFilmic";break;case bx:i="AgX";break;case Ax:i="Neutral";break;case Tx:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Ac=new j;function yA(){we.getLuminanceCoefficients(Ac);const o=Ac.x.toFixed(4),t=Ac.y.toFixed(4),i=Ac.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xA(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Go).join(`
`)}function MA(o){const t=[];for(const i in o){const s=o[i];s!==!1&&t.push("#define "+i+" "+s)}return t.join(`
`)}function EA(o,t){const i={},s=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=o.getActiveAttrib(t,l),h=c.name;let d=1;c.type===o.FLOAT_MAT2&&(d=2),c.type===o.FLOAT_MAT3&&(d=3),c.type===o.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:o.getAttribLocation(t,h),locationSize:d}}return i}function Go(o){return o!==""}function B0(o,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function I0(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const TA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pd(o){return o.replace(TA,AA)}const bA=new Map;function AA(o,t){let i=ce[t];if(i===void 0){const s=bA.get(t);if(s!==void 0)i=ce[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,s);else throw new Error("Can not resolve #include <"+t+">")}return Pd(i)}const RA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function F0(o){return o.replace(RA,CA)}function CA(o,t,i,s){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function H0(o){let t=`precision ${o.precision} float;
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
#define LOW_PRECISION`),t}function wA(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===K0?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===Q0?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===la&&(t="SHADOWMAP_TYPE_VSM"),t}function DA(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Lr:case Nr:t="ENVMAP_TYPE_CUBE";break;case kc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function UA(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Nr:t="ENVMAP_MODE_REFRACTION";break}return t}function LA(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case J0:t="ENVMAP_BLENDING_MULTIPLY";break;case vx:t="ENVMAP_BLENDING_MIX";break;case Sx:t="ENVMAP_BLENDING_ADD";break}return t}function NA(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,s=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function OA(o,t,i,s){const l=o.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=wA(i),p=DA(i),_=UA(i),S=LA(i),y=NA(i),M=xA(i),R=MA(c),w=l.createProgram();let x,v,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(Go).join(`
`),x.length>0&&(x+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(Go).join(`
`),v.length>0&&(v+=`
`)):(x=[H0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Go).join(`
`),v=[H0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+_:"",i.envMap?"#define "+S:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Wa?"#define TONE_MAPPING":"",i.toneMapping!==Wa?ce.tonemapping_pars_fragment:"",i.toneMapping!==Wa?SA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,vA("linearToOutputTexel",i.outputColorSpace),yA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Go).join(`
`)),h=Pd(h),h=B0(h,i),h=I0(h,i),d=Pd(d),d=B0(d,i),d=I0(d,i),h=F0(h),d=F0(d),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,v=["#define varying in",i.glslVersion===q_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===q_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const N=I+x+h,U=I+v+d,q=O0(l,l.VERTEX_SHADER,N),G=O0(l,l.FRAGMENT_SHADER,U);l.attachShader(w,q),l.attachShader(w,G),i.index0AttributeName!==void 0?l.bindAttribLocation(w,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(w,0,"position"),l.linkProgram(w);function P(B){if(o.debug.checkShaderErrors){const lt=l.getProgramInfoLog(w).trim(),rt=l.getShaderInfoLog(q).trim(),mt=l.getShaderInfoLog(G).trim();let gt=!0,O=!0;if(l.getProgramParameter(w,l.LINK_STATUS)===!1)if(gt=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,w,q,G);else{const Q=z0(l,q,"vertex"),Z=z0(l,G,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(w,l.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+lt+`
`+Q+`
`+Z)}else lt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",lt):(rt===""||mt==="")&&(O=!1);O&&(B.diagnostics={runnable:gt,programLog:lt,vertexShader:{log:rt,prefix:x},fragmentShader:{log:mt,prefix:v}})}l.deleteShader(q),l.deleteShader(G),K=new Pc(l,w),T=EA(l,w)}let K;this.getUniforms=function(){return K===void 0&&P(this),K};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let b=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=l.getProgramParameter(w,pA)),b},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(w),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=mA++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=q,this.fragmentShader=G,this}let PA=0;class zA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,s=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let s=i.get(t);return s===void 0&&(s=new Set,i.set(t,s)),s}_getShaderStage(t){const i=this.shaderCache;let s=i.get(t);return s===void 0&&(s=new BA(t),i.set(t,s)),s}}class BA{constructor(t){this.id=PA++,this.code=t,this.usedTimes=0}}function IA(o,t,i,s,l,c,h){const d=new Xd,m=new zA,p=new Set,_=[],S=l.logarithmicDepthBuffer,y=l.vertexTextures;let M=l.precision;const R={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(T){return p.add(T),T===0?"uv":`uv${T}`}function x(T,b,B,lt,rt){const mt=lt.fog,gt=rt.geometry,O=T.isMeshStandardMaterial?lt.environment:null,Q=(T.isMeshStandardMaterial?i:t).get(T.envMap||O),Z=Q&&Q.mapping===kc?Q.image.height:null,xt=R[T.type];T.precision!==null&&(M=l.getMaxPrecision(T.precision),M!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",M,"instead."));const Tt=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,L=Tt!==void 0?Tt.length:0;let nt=0;gt.morphAttributes.position!==void 0&&(nt=1),gt.morphAttributes.normal!==void 0&&(nt=2),gt.morphAttributes.color!==void 0&&(nt=3);let yt,Y,ct,Et;if(xt){const Ee=Pi[xt];yt=Ee.vertexShader,Y=Ee.fragmentShader}else yt=T.vertexShader,Y=T.fragmentShader,m.update(T),ct=m.getVertexShaderID(T),Et=m.getFragmentShaderID(T);const St=o.getRenderTarget(),Gt=o.state.buffers.depth.getReversed(),Ft=rt.isInstancedMesh===!0,ne=rt.isBatchedMesh===!0,Oe=!!T.map,he=!!T.matcap,qe=!!Q,F=!!T.aoMap,An=!!T.lightMap,fe=!!T.bumpMap,_e=!!T.normalMap,qt=!!T.displacementMap,Ue=!!T.emissiveMap,Wt=!!T.metalnessMap,D=!!T.roughnessMap,A=T.anisotropy>0,et=T.clearcoat>0,ft=T.dispersion>0,Mt=T.iridescence>0,dt=T.sheen>0,kt=T.transmission>0,Ct=A&&!!T.anisotropyMap,zt=et&&!!T.clearcoatMap,ve=et&&!!T.clearcoatNormalMap,bt=et&&!!T.clearcoatRoughnessMap,Bt=Mt&&!!T.iridescenceMap,Yt=Mt&&!!T.iridescenceThicknessMap,Xt=dt&&!!T.sheenColorMap,Nt=dt&&!!T.sheenRoughnessMap,Jt=!!T.specularMap,ae=!!T.specularColorMap,Pe=!!T.specularIntensityMap,V=kt&&!!T.transmissionMap,At=kt&&!!T.thicknessMap,ot=!!T.gradientMap,_t=!!T.alphaMap,Rt=T.alphaTest>0,Dt=!!T.alphaHash,$t=!!T.extensions;let Ye=Wa;T.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(Ye=o.toneMapping);const un={shaderID:xt,shaderType:T.type,shaderName:T.name,vertexShader:yt,fragmentShader:Y,defines:T.defines,customVertexShaderID:ct,customFragmentShaderID:Et,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:M,batching:ne,batchingColor:ne&&rt._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&rt.instanceColor!==null,instancingMorph:Ft&&rt.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:St===null?o.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:zr,alphaToCoverage:!!T.alphaToCoverage,map:Oe,matcap:he,envMap:qe,envMapMode:qe&&Q.mapping,envMapCubeUVHeight:Z,aoMap:F,lightMap:An,bumpMap:fe,normalMap:_e,displacementMap:y&&qt,emissiveMap:Ue,normalMapObjectSpace:_e&&T.normalMapType===Dx,normalMapTangentSpace:_e&&T.normalMapType===uv,metalnessMap:Wt,roughnessMap:D,anisotropy:A,anisotropyMap:Ct,clearcoat:et,clearcoatMap:zt,clearcoatNormalMap:ve,clearcoatRoughnessMap:bt,dispersion:ft,iridescence:Mt,iridescenceMap:Bt,iridescenceThicknessMap:Yt,sheen:dt,sheenColorMap:Xt,sheenRoughnessMap:Nt,specularMap:Jt,specularColorMap:ae,specularIntensityMap:Pe,transmission:kt,transmissionMap:V,thicknessMap:At,gradientMap:ot,opaque:T.transparent===!1&&T.blending===Cr&&T.alphaToCoverage===!1,alphaMap:_t,alphaTest:Rt,alphaHash:Dt,combine:T.combine,mapUv:Oe&&w(T.map.channel),aoMapUv:F&&w(T.aoMap.channel),lightMapUv:An&&w(T.lightMap.channel),bumpMapUv:fe&&w(T.bumpMap.channel),normalMapUv:_e&&w(T.normalMap.channel),displacementMapUv:qt&&w(T.displacementMap.channel),emissiveMapUv:Ue&&w(T.emissiveMap.channel),metalnessMapUv:Wt&&w(T.metalnessMap.channel),roughnessMapUv:D&&w(T.roughnessMap.channel),anisotropyMapUv:Ct&&w(T.anisotropyMap.channel),clearcoatMapUv:zt&&w(T.clearcoatMap.channel),clearcoatNormalMapUv:ve&&w(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&w(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&w(T.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&w(T.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&w(T.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&w(T.sheenRoughnessMap.channel),specularMapUv:Jt&&w(T.specularMap.channel),specularColorMapUv:ae&&w(T.specularColorMap.channel),specularIntensityMapUv:Pe&&w(T.specularIntensityMap.channel),transmissionMapUv:V&&w(T.transmissionMap.channel),thicknessMapUv:At&&w(T.thicknessMap.channel),alphaMapUv:_t&&w(T.alphaMap.channel),vertexTangents:!!gt.attributes.tangent&&(_e||A),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,pointsUvs:rt.isPoints===!0&&!!gt.attributes.uv&&(Oe||_t),fog:!!mt,useFog:T.fog===!0,fogExp2:!!mt&&mt.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:S,reverseDepthBuffer:Gt,skinning:rt.isSkinnedMesh===!0,morphTargets:gt.morphAttributes.position!==void 0,morphNormals:gt.morphAttributes.normal!==void 0,morphColors:gt.morphAttributes.color!==void 0,morphTargetsCount:L,morphTextureStride:nt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:T.dithering,shadowMapEnabled:o.shadowMap.enabled&&B.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ye,decodeVideoTexture:Oe&&T.map.isVideoTexture===!0&&we.getTransfer(T.map.colorSpace)===Fe,decodeVideoTextureEmissive:Ue&&T.emissiveMap.isVideoTexture===!0&&we.getTransfer(T.emissiveMap.colorSpace)===Fe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ti,flipSided:T.side===qn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:$t&&T.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&T.extensions.multiDraw===!0||ne)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return un.vertexUv1s=p.has(1),un.vertexUv2s=p.has(2),un.vertexUv3s=p.has(3),p.clear(),un}function v(T){const b=[];if(T.shaderID?b.push(T.shaderID):(b.push(T.customVertexShaderID),b.push(T.customFragmentShaderID)),T.defines!==void 0)for(const B in T.defines)b.push(B),b.push(T.defines[B]);return T.isRawShaderMaterial===!1&&(I(b,T),N(b,T),b.push(o.outputColorSpace)),b.push(T.customProgramCacheKey),b.join()}function I(T,b){T.push(b.precision),T.push(b.outputColorSpace),T.push(b.envMapMode),T.push(b.envMapCubeUVHeight),T.push(b.mapUv),T.push(b.alphaMapUv),T.push(b.lightMapUv),T.push(b.aoMapUv),T.push(b.bumpMapUv),T.push(b.normalMapUv),T.push(b.displacementMapUv),T.push(b.emissiveMapUv),T.push(b.metalnessMapUv),T.push(b.roughnessMapUv),T.push(b.anisotropyMapUv),T.push(b.clearcoatMapUv),T.push(b.clearcoatNormalMapUv),T.push(b.clearcoatRoughnessMapUv),T.push(b.iridescenceMapUv),T.push(b.iridescenceThicknessMapUv),T.push(b.sheenColorMapUv),T.push(b.sheenRoughnessMapUv),T.push(b.specularMapUv),T.push(b.specularColorMapUv),T.push(b.specularIntensityMapUv),T.push(b.transmissionMapUv),T.push(b.thicknessMapUv),T.push(b.combine),T.push(b.fogExp2),T.push(b.sizeAttenuation),T.push(b.morphTargetsCount),T.push(b.morphAttributeCount),T.push(b.numDirLights),T.push(b.numPointLights),T.push(b.numSpotLights),T.push(b.numSpotLightMaps),T.push(b.numHemiLights),T.push(b.numRectAreaLights),T.push(b.numDirLightShadows),T.push(b.numPointLightShadows),T.push(b.numSpotLightShadows),T.push(b.numSpotLightShadowsWithMaps),T.push(b.numLightProbes),T.push(b.shadowMapType),T.push(b.toneMapping),T.push(b.numClippingPlanes),T.push(b.numClipIntersection),T.push(b.depthPacking)}function N(T,b){d.disableAll(),b.supportsVertexTextures&&d.enable(0),b.instancing&&d.enable(1),b.instancingColor&&d.enable(2),b.instancingMorph&&d.enable(3),b.matcap&&d.enable(4),b.envMap&&d.enable(5),b.normalMapObjectSpace&&d.enable(6),b.normalMapTangentSpace&&d.enable(7),b.clearcoat&&d.enable(8),b.iridescence&&d.enable(9),b.alphaTest&&d.enable(10),b.vertexColors&&d.enable(11),b.vertexAlphas&&d.enable(12),b.vertexUv1s&&d.enable(13),b.vertexUv2s&&d.enable(14),b.vertexUv3s&&d.enable(15),b.vertexTangents&&d.enable(16),b.anisotropy&&d.enable(17),b.alphaHash&&d.enable(18),b.batching&&d.enable(19),b.dispersion&&d.enable(20),b.batchingColor&&d.enable(21),T.push(d.mask),d.disableAll(),b.fog&&d.enable(0),b.useFog&&d.enable(1),b.flatShading&&d.enable(2),b.logarithmicDepthBuffer&&d.enable(3),b.reverseDepthBuffer&&d.enable(4),b.skinning&&d.enable(5),b.morphTargets&&d.enable(6),b.morphNormals&&d.enable(7),b.morphColors&&d.enable(8),b.premultipliedAlpha&&d.enable(9),b.shadowMapEnabled&&d.enable(10),b.doubleSided&&d.enable(11),b.flipSided&&d.enable(12),b.useDepthPacking&&d.enable(13),b.dithering&&d.enable(14),b.transmission&&d.enable(15),b.sheen&&d.enable(16),b.opaque&&d.enable(17),b.pointsUvs&&d.enable(18),b.decodeVideoTexture&&d.enable(19),b.decodeVideoTextureEmissive&&d.enable(20),b.alphaToCoverage&&d.enable(21),T.push(d.mask)}function U(T){const b=R[T.type];let B;if(b){const lt=Pi[b];B=oM.clone(lt.uniforms)}else B=T.uniforms;return B}function q(T,b){let B;for(let lt=0,rt=_.length;lt<rt;lt++){const mt=_[lt];if(mt.cacheKey===b){B=mt,++B.usedTimes;break}}return B===void 0&&(B=new OA(o,b,T,c),_.push(B)),B}function G(T){if(--T.usedTimes===0){const b=_.indexOf(T);_[b]=_[_.length-1],_.pop(),T.destroy()}}function P(T){m.remove(T)}function K(){m.dispose()}return{getParameters:x,getProgramCacheKey:v,getUniforms:U,acquireProgram:q,releaseProgram:G,releaseShaderCache:P,programs:_,dispose:K}}function FA(){let o=new WeakMap;function t(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function c(){o=new WeakMap}return{has:t,get:i,remove:s,update:l,dispose:c}}function HA(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function G0(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function V0(){const o=[];let t=0;const i=[],s=[],l=[];function c(){t=0,i.length=0,s.length=0,l.length=0}function h(S,y,M,R,w,x){let v=o[t];return v===void 0?(v={id:S.id,object:S,geometry:y,material:M,groupOrder:R,renderOrder:S.renderOrder,z:w,group:x},o[t]=v):(v.id=S.id,v.object=S,v.geometry=y,v.material=M,v.groupOrder=R,v.renderOrder=S.renderOrder,v.z=w,v.group=x),t++,v}function d(S,y,M,R,w,x){const v=h(S,y,M,R,w,x);M.transmission>0?s.push(v):M.transparent===!0?l.push(v):i.push(v)}function m(S,y,M,R,w,x){const v=h(S,y,M,R,w,x);M.transmission>0?s.unshift(v):M.transparent===!0?l.unshift(v):i.unshift(v)}function p(S,y){i.length>1&&i.sort(S||HA),s.length>1&&s.sort(y||G0),l.length>1&&l.sort(y||G0)}function _(){for(let S=t,y=o.length;S<y;S++){const M=o[S];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:d,unshift:m,finish:_,sort:p}}function GA(){let o=new WeakMap;function t(s,l){const c=o.get(s);let h;return c===void 0?(h=new V0,o.set(s,[h])):l>=c.length?(h=new V0,c.push(h)):h=c[l],h}function i(){o=new WeakMap}return{get:t,dispose:i}}function VA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new j,color:new ue};break;case"SpotLight":i={position:new j,direction:new j,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new j,color:new ue,distance:0,decay:0};break;case"HemisphereLight":i={direction:new j,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":i={color:new ue,position:new j,halfWidth:new j,halfHeight:new j};break}return o[t.id]=i,i}}}function kA(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=i,i}}}let XA=0;function WA(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function qA(o){const t=new VA,i=kA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new j);const l=new j,c=new Ze,h=new Ze;function d(p){let _=0,S=0,y=0;for(let T=0;T<9;T++)s.probe[T].set(0,0,0);let M=0,R=0,w=0,x=0,v=0,I=0,N=0,U=0,q=0,G=0,P=0;p.sort(WA);for(let T=0,b=p.length;T<b;T++){const B=p[T],lt=B.color,rt=B.intensity,mt=B.distance,gt=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)_+=lt.r*rt,S+=lt.g*rt,y+=lt.b*rt;else if(B.isLightProbe){for(let O=0;O<9;O++)s.probe[O].addScaledVector(B.sh.coefficients[O],rt);P++}else if(B.isDirectionalLight){const O=t.get(B);if(O.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const Q=B.shadow,Z=i.get(B);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,s.directionalShadow[M]=Z,s.directionalShadowMap[M]=gt,s.directionalShadowMatrix[M]=B.shadow.matrix,I++}s.directional[M]=O,M++}else if(B.isSpotLight){const O=t.get(B);O.position.setFromMatrixPosition(B.matrixWorld),O.color.copy(lt).multiplyScalar(rt),O.distance=mt,O.coneCos=Math.cos(B.angle),O.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),O.decay=B.decay,s.spot[w]=O;const Q=B.shadow;if(B.map&&(s.spotLightMap[q]=B.map,q++,Q.updateMatrices(B),B.castShadow&&G++),s.spotLightMatrix[w]=Q.matrix,B.castShadow){const Z=i.get(B);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,s.spotShadow[w]=Z,s.spotShadowMap[w]=gt,U++}w++}else if(B.isRectAreaLight){const O=t.get(B);O.color.copy(lt).multiplyScalar(rt),O.halfWidth.set(B.width*.5,0,0),O.halfHeight.set(0,B.height*.5,0),s.rectArea[x]=O,x++}else if(B.isPointLight){const O=t.get(B);if(O.color.copy(B.color).multiplyScalar(B.intensity),O.distance=B.distance,O.decay=B.decay,B.castShadow){const Q=B.shadow,Z=i.get(B);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,Z.shadowCameraNear=Q.camera.near,Z.shadowCameraFar=Q.camera.far,s.pointShadow[R]=Z,s.pointShadowMap[R]=gt,s.pointShadowMatrix[R]=B.shadow.matrix,N++}s.point[R]=O,R++}else if(B.isHemisphereLight){const O=t.get(B);O.skyColor.copy(B.color).multiplyScalar(rt),O.groundColor.copy(B.groundColor).multiplyScalar(rt),s.hemi[v]=O,v++}}x>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_FLOAT_1,s.rectAreaLTC2=Lt.LTC_FLOAT_2):(s.rectAreaLTC1=Lt.LTC_HALF_1,s.rectAreaLTC2=Lt.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=S,s.ambient[2]=y;const K=s.hash;(K.directionalLength!==M||K.pointLength!==R||K.spotLength!==w||K.rectAreaLength!==x||K.hemiLength!==v||K.numDirectionalShadows!==I||K.numPointShadows!==N||K.numSpotShadows!==U||K.numSpotMaps!==q||K.numLightProbes!==P)&&(s.directional.length=M,s.spot.length=w,s.rectArea.length=x,s.point.length=R,s.hemi.length=v,s.directionalShadow.length=I,s.directionalShadowMap.length=I,s.pointShadow.length=N,s.pointShadowMap.length=N,s.spotShadow.length=U,s.spotShadowMap.length=U,s.directionalShadowMatrix.length=I,s.pointShadowMatrix.length=N,s.spotLightMatrix.length=U+q-G,s.spotLightMap.length=q,s.numSpotLightShadowsWithMaps=G,s.numLightProbes=P,K.directionalLength=M,K.pointLength=R,K.spotLength=w,K.rectAreaLength=x,K.hemiLength=v,K.numDirectionalShadows=I,K.numPointShadows=N,K.numSpotShadows=U,K.numSpotMaps=q,K.numLightProbes=P,s.version=XA++)}function m(p,_){let S=0,y=0,M=0,R=0,w=0;const x=_.matrixWorldInverse;for(let v=0,I=p.length;v<I;v++){const N=p[v];if(N.isDirectionalLight){const U=s.directional[S];U.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(x),S++}else if(N.isSpotLight){const U=s.spot[M];U.position.setFromMatrixPosition(N.matrixWorld),U.position.applyMatrix4(x),U.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(x),M++}else if(N.isRectAreaLight){const U=s.rectArea[R];U.position.setFromMatrixPosition(N.matrixWorld),U.position.applyMatrix4(x),h.identity(),c.copy(N.matrixWorld),c.premultiply(x),h.extractRotation(c),U.halfWidth.set(N.width*.5,0,0),U.halfHeight.set(0,N.height*.5,0),U.halfWidth.applyMatrix4(h),U.halfHeight.applyMatrix4(h),R++}else if(N.isPointLight){const U=s.point[y];U.position.setFromMatrixPosition(N.matrixWorld),U.position.applyMatrix4(x),y++}else if(N.isHemisphereLight){const U=s.hemi[w];U.direction.setFromMatrixPosition(N.matrixWorld),U.direction.transformDirection(x),w++}}}return{setup:d,setupView:m,state:s}}function k0(o){const t=new qA(o),i=[],s=[];function l(_){p.camera=_,i.length=0,s.length=0}function c(_){i.push(_)}function h(_){s.push(_)}function d(){t.setup(i)}function m(_){t.setupView(i,_)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function YA(o){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new k0(o),t.set(l,[d])):c>=h.length?(d=new k0(o),h.push(d)):d=h[c],d}function s(){t=new WeakMap}return{get:i,dispose:s}}const jA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZA=`uniform sampler2D shadow_pass;
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
}`;function KA(o,t,i){let s=new qd;const l=new ie,c=new ie,h=new $e,d=new gM({depthPacking:wx}),m=new _M,p={},_=i.maxTextureSize,S={[qa]:qn,[qn]:qa,[Ti]:Ti},y=new ja({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:jA,fragmentShader:ZA}),M=y.clone();M.defines.HORIZONTAL_PASS=1;const R=new ai;R.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Wn(R,y),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=K0;let v=this.type;this.render=function(G,P,K){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||G.length===0)return;const T=o.getRenderTarget(),b=o.getActiveCubeFace(),B=o.getActiveMipmapLevel(),lt=o.state;lt.setBlending(Xa),lt.buffers.color.setClear(1,1,1,1),lt.buffers.depth.setTest(!0),lt.setScissorTest(!1);const rt=v!==la&&this.type===la,mt=v===la&&this.type!==la;for(let gt=0,O=G.length;gt<O;gt++){const Q=G[gt],Z=Q.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;l.copy(Z.mapSize);const xt=Z.getFrameExtents();if(l.multiply(xt),c.copy(Z.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/xt.x),l.x=c.x*xt.x,Z.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/xt.y),l.y=c.y*xt.y,Z.mapSize.y=c.y)),Z.map===null||rt===!0||mt===!0){const L=this.type!==la?{minFilter:Ri,magFilter:Ri}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Rs(l.x,l.y,L),Z.map.texture.name=Q.name+".shadowMap",Z.camera.updateProjectionMatrix()}o.setRenderTarget(Z.map),o.clear();const Tt=Z.getViewportCount();for(let L=0;L<Tt;L++){const nt=Z.getViewport(L);h.set(c.x*nt.x,c.y*nt.y,c.x*nt.z,c.y*nt.w),lt.viewport(h),Z.updateMatrices(Q,L),s=Z.getFrustum(),U(P,K,Z.camera,Q,this.type)}Z.isPointLightShadow!==!0&&this.type===la&&I(Z,K),Z.needsUpdate=!1}v=this.type,x.needsUpdate=!1,o.setRenderTarget(T,b,B)};function I(G,P){const K=t.update(w);y.defines.VSM_SAMPLES!==G.blurSamples&&(y.defines.VSM_SAMPLES=G.blurSamples,M.defines.VSM_SAMPLES=G.blurSamples,y.needsUpdate=!0,M.needsUpdate=!0),G.mapPass===null&&(G.mapPass=new Rs(l.x,l.y)),y.uniforms.shadow_pass.value=G.map.texture,y.uniforms.resolution.value=G.mapSize,y.uniforms.radius.value=G.radius,o.setRenderTarget(G.mapPass),o.clear(),o.renderBufferDirect(P,null,K,y,w,null),M.uniforms.shadow_pass.value=G.mapPass.texture,M.uniforms.resolution.value=G.mapSize,M.uniforms.radius.value=G.radius,o.setRenderTarget(G.map),o.clear(),o.renderBufferDirect(P,null,K,M,w,null)}function N(G,P,K,T){let b=null;const B=K.isPointLight===!0?G.customDistanceMaterial:G.customDepthMaterial;if(B!==void 0)b=B;else if(b=K.isPointLight===!0?m:d,o.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const lt=b.uuid,rt=P.uuid;let mt=p[lt];mt===void 0&&(mt={},p[lt]=mt);let gt=mt[rt];gt===void 0&&(gt=b.clone(),mt[rt]=gt,P.addEventListener("dispose",q)),b=gt}if(b.visible=P.visible,b.wireframe=P.wireframe,T===la?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:S[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,K.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const lt=o.properties.get(b);lt.light=K}return b}function U(G,P,K,T,b){if(G.visible===!1)return;if(G.layers.test(P.layers)&&(G.isMesh||G.isLine||G.isPoints)&&(G.castShadow||G.receiveShadow&&b===la)&&(!G.frustumCulled||s.intersectsObject(G))){G.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,G.matrixWorld);const rt=t.update(G),mt=G.material;if(Array.isArray(mt)){const gt=rt.groups;for(let O=0,Q=gt.length;O<Q;O++){const Z=gt[O],xt=mt[Z.materialIndex];if(xt&&xt.visible){const Tt=N(G,xt,T,b);G.onBeforeShadow(o,G,P,K,rt,Tt,Z),o.renderBufferDirect(K,null,rt,Tt,G,Z),G.onAfterShadow(o,G,P,K,rt,Tt,Z)}}}else if(mt.visible){const gt=N(G,mt,T,b);G.onBeforeShadow(o,G,P,K,rt,gt,null),o.renderBufferDirect(K,null,rt,gt,G,null),G.onAfterShadow(o,G,P,K,rt,gt,null)}}const lt=G.children;for(let rt=0,mt=lt.length;rt<mt;rt++)U(lt[rt],P,K,T,b)}function q(G){G.target.removeEventListener("dispose",q);for(const K in p){const T=p[K],b=G.target.uuid;b in T&&(T[b].dispose(),delete T[b])}}}const QA={[Kh]:Qh,[Jh]:ed,[$h]:nd,[Ur]:td,[Qh]:Kh,[ed]:Jh,[nd]:$h,[td]:Ur};function JA(o,t){function i(){let V=!1;const At=new $e;let ot=null;const _t=new $e(0,0,0,0);return{setMask:function(Rt){ot!==Rt&&!V&&(o.colorMask(Rt,Rt,Rt,Rt),ot=Rt)},setLocked:function(Rt){V=Rt},setClear:function(Rt,Dt,$t,Ye,un){un===!0&&(Rt*=Ye,Dt*=Ye,$t*=Ye),At.set(Rt,Dt,$t,Ye),_t.equals(At)===!1&&(o.clearColor(Rt,Dt,$t,Ye),_t.copy(At))},reset:function(){V=!1,ot=null,_t.set(-1,0,0,0)}}}function s(){let V=!1,At=!1,ot=null,_t=null,Rt=null;return{setReversed:function(Dt){if(At!==Dt){const $t=t.get("EXT_clip_control");At?$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.ZERO_TO_ONE_EXT):$t.clipControlEXT($t.LOWER_LEFT_EXT,$t.NEGATIVE_ONE_TO_ONE_EXT);const Ye=Rt;Rt=null,this.setClear(Ye)}At=Dt},getReversed:function(){return At},setTest:function(Dt){Dt?St(o.DEPTH_TEST):Gt(o.DEPTH_TEST)},setMask:function(Dt){ot!==Dt&&!V&&(o.depthMask(Dt),ot=Dt)},setFunc:function(Dt){if(At&&(Dt=QA[Dt]),_t!==Dt){switch(Dt){case Kh:o.depthFunc(o.NEVER);break;case Qh:o.depthFunc(o.ALWAYS);break;case Jh:o.depthFunc(o.LESS);break;case Ur:o.depthFunc(o.LEQUAL);break;case $h:o.depthFunc(o.EQUAL);break;case td:o.depthFunc(o.GEQUAL);break;case ed:o.depthFunc(o.GREATER);break;case nd:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}_t=Dt}},setLocked:function(Dt){V=Dt},setClear:function(Dt){Rt!==Dt&&(At&&(Dt=1-Dt),o.clearDepth(Dt),Rt=Dt)},reset:function(){V=!1,ot=null,_t=null,Rt=null,At=!1}}}function l(){let V=!1,At=null,ot=null,_t=null,Rt=null,Dt=null,$t=null,Ye=null,un=null;return{setTest:function(Ee){V||(Ee?St(o.STENCIL_TEST):Gt(o.STENCIL_TEST))},setMask:function(Ee){At!==Ee&&!V&&(o.stencilMask(Ee),At=Ee)},setFunc:function(Ee,yn,gi){(ot!==Ee||_t!==yn||Rt!==gi)&&(o.stencilFunc(Ee,yn,gi),ot=Ee,_t=yn,Rt=gi)},setOp:function(Ee,yn,gi){(Dt!==Ee||$t!==yn||Ye!==gi)&&(o.stencilOp(Ee,yn,gi),Dt=Ee,$t=yn,Ye=gi)},setLocked:function(Ee){V=Ee},setClear:function(Ee){un!==Ee&&(o.clearStencil(Ee),un=Ee)},reset:function(){V=!1,At=null,ot=null,_t=null,Rt=null,Dt=null,$t=null,Ye=null,un=null}}}const c=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let _={},S={},y=new WeakMap,M=[],R=null,w=!1,x=null,v=null,I=null,N=null,U=null,q=null,G=null,P=new ue(0,0,0),K=0,T=!1,b=null,B=null,lt=null,rt=null,mt=null;const gt=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Q=0;const Z=o.getParameter(o.VERSION);Z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Z)[1]),O=Q>=1):Z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),O=Q>=2);let xt=null,Tt={};const L=o.getParameter(o.SCISSOR_BOX),nt=o.getParameter(o.VIEWPORT),yt=new $e().fromArray(L),Y=new $e().fromArray(nt);function ct(V,At,ot,_t){const Rt=new Uint8Array(4),Dt=o.createTexture();o.bindTexture(V,Dt),o.texParameteri(V,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(V,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let $t=0;$t<ot;$t++)V===o.TEXTURE_3D||V===o.TEXTURE_2D_ARRAY?o.texImage3D(At,0,o.RGBA,1,1,_t,0,o.RGBA,o.UNSIGNED_BYTE,Rt):o.texImage2D(At+$t,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Rt);return Dt}const Et={};Et[o.TEXTURE_2D]=ct(o.TEXTURE_2D,o.TEXTURE_2D,1),Et[o.TEXTURE_CUBE_MAP]=ct(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[o.TEXTURE_2D_ARRAY]=ct(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Et[o.TEXTURE_3D]=ct(o.TEXTURE_3D,o.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),St(o.DEPTH_TEST),h.setFunc(Ur),fe(!1),_e(H_),St(o.CULL_FACE),F(Xa);function St(V){_[V]!==!0&&(o.enable(V),_[V]=!0)}function Gt(V){_[V]!==!1&&(o.disable(V),_[V]=!1)}function Ft(V,At){return S[V]!==At?(o.bindFramebuffer(V,At),S[V]=At,V===o.DRAW_FRAMEBUFFER&&(S[o.FRAMEBUFFER]=At),V===o.FRAMEBUFFER&&(S[o.DRAW_FRAMEBUFFER]=At),!0):!1}function ne(V,At){let ot=M,_t=!1;if(V){ot=y.get(At),ot===void 0&&(ot=[],y.set(At,ot));const Rt=V.textures;if(ot.length!==Rt.length||ot[0]!==o.COLOR_ATTACHMENT0){for(let Dt=0,$t=Rt.length;Dt<$t;Dt++)ot[Dt]=o.COLOR_ATTACHMENT0+Dt;ot.length=Rt.length,_t=!0}}else ot[0]!==o.BACK&&(ot[0]=o.BACK,_t=!0);_t&&o.drawBuffers(ot)}function Oe(V){return R!==V?(o.useProgram(V),R=V,!0):!1}const he={[Ms]:o.FUNC_ADD,[ex]:o.FUNC_SUBTRACT,[nx]:o.FUNC_REVERSE_SUBTRACT};he[ix]=o.MIN,he[ax]=o.MAX;const qe={[sx]:o.ZERO,[rx]:o.ONE,[ox]:o.SRC_COLOR,[jh]:o.SRC_ALPHA,[dx]:o.SRC_ALPHA_SATURATE,[fx]:o.DST_COLOR,[cx]:o.DST_ALPHA,[lx]:o.ONE_MINUS_SRC_COLOR,[Zh]:o.ONE_MINUS_SRC_ALPHA,[hx]:o.ONE_MINUS_DST_COLOR,[ux]:o.ONE_MINUS_DST_ALPHA,[px]:o.CONSTANT_COLOR,[mx]:o.ONE_MINUS_CONSTANT_COLOR,[gx]:o.CONSTANT_ALPHA,[_x]:o.ONE_MINUS_CONSTANT_ALPHA};function F(V,At,ot,_t,Rt,Dt,$t,Ye,un,Ee){if(V===Xa){w===!0&&(Gt(o.BLEND),w=!1);return}if(w===!1&&(St(o.BLEND),w=!0),V!==tx){if(V!==x||Ee!==T){if((v!==Ms||U!==Ms)&&(o.blendEquation(o.FUNC_ADD),v=Ms,U=Ms),Ee)switch(V){case Cr:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case G_:o.blendFunc(o.ONE,o.ONE);break;case V_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case k_:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Cr:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case G_:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case V_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case k_:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}I=null,N=null,q=null,G=null,P.set(0,0,0),K=0,x=V,T=Ee}return}Rt=Rt||At,Dt=Dt||ot,$t=$t||_t,(At!==v||Rt!==U)&&(o.blendEquationSeparate(he[At],he[Rt]),v=At,U=Rt),(ot!==I||_t!==N||Dt!==q||$t!==G)&&(o.blendFuncSeparate(qe[ot],qe[_t],qe[Dt],qe[$t]),I=ot,N=_t,q=Dt,G=$t),(Ye.equals(P)===!1||un!==K)&&(o.blendColor(Ye.r,Ye.g,Ye.b,un),P.copy(Ye),K=un),x=V,T=!1}function An(V,At){V.side===Ti?Gt(o.CULL_FACE):St(o.CULL_FACE);let ot=V.side===qn;At&&(ot=!ot),fe(ot),V.blending===Cr&&V.transparent===!1?F(Xa):F(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),h.setFunc(V.depthFunc),h.setTest(V.depthTest),h.setMask(V.depthWrite),c.setMask(V.colorWrite);const _t=V.stencilWrite;d.setTest(_t),_t&&(d.setMask(V.stencilWriteMask),d.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),d.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ue(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?St(o.SAMPLE_ALPHA_TO_COVERAGE):Gt(o.SAMPLE_ALPHA_TO_COVERAGE)}function fe(V){b!==V&&(V?o.frontFace(o.CW):o.frontFace(o.CCW),b=V)}function _e(V){V!==Jy?(St(o.CULL_FACE),V!==B&&(V===H_?o.cullFace(o.BACK):V===$y?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Gt(o.CULL_FACE),B=V}function qt(V){V!==lt&&(O&&o.lineWidth(V),lt=V)}function Ue(V,At,ot){V?(St(o.POLYGON_OFFSET_FILL),(rt!==At||mt!==ot)&&(o.polygonOffset(At,ot),rt=At,mt=ot)):Gt(o.POLYGON_OFFSET_FILL)}function Wt(V){V?St(o.SCISSOR_TEST):Gt(o.SCISSOR_TEST)}function D(V){V===void 0&&(V=o.TEXTURE0+gt-1),xt!==V&&(o.activeTexture(V),xt=V)}function A(V,At,ot){ot===void 0&&(xt===null?ot=o.TEXTURE0+gt-1:ot=xt);let _t=Tt[ot];_t===void 0&&(_t={type:void 0,texture:void 0},Tt[ot]=_t),(_t.type!==V||_t.texture!==At)&&(xt!==ot&&(o.activeTexture(ot),xt=ot),o.bindTexture(V,At||Et[V]),_t.type=V,_t.texture=At)}function et(){const V=Tt[xt];V!==void 0&&V.type!==void 0&&(o.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ft(){try{o.compressedTexImage2D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Mt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function dt(){try{o.texSubImage2D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function kt(){try{o.texSubImage3D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ct(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function zt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ve(){try{o.texStorage2D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function bt(){try{o.texStorage3D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Bt(){try{o.texImage2D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Yt(){try{o.texImage3D.apply(o,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Xt(V){yt.equals(V)===!1&&(o.scissor(V.x,V.y,V.z,V.w),yt.copy(V))}function Nt(V){Y.equals(V)===!1&&(o.viewport(V.x,V.y,V.z,V.w),Y.copy(V))}function Jt(V,At){let ot=p.get(At);ot===void 0&&(ot=new WeakMap,p.set(At,ot));let _t=ot.get(V);_t===void 0&&(_t=o.getUniformBlockIndex(At,V.name),ot.set(V,_t))}function ae(V,At){const _t=p.get(At).get(V);m.get(At)!==_t&&(o.uniformBlockBinding(At,_t,V.__bindingPointIndex),m.set(At,_t))}function Pe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),_={},xt=null,Tt={},S={},y=new WeakMap,M=[],R=null,w=!1,x=null,v=null,I=null,N=null,U=null,q=null,G=null,P=new ue(0,0,0),K=0,T=!1,b=null,B=null,lt=null,rt=null,mt=null,yt.set(0,0,o.canvas.width,o.canvas.height),Y.set(0,0,o.canvas.width,o.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:St,disable:Gt,bindFramebuffer:Ft,drawBuffers:ne,useProgram:Oe,setBlending:F,setMaterial:An,setFlipSided:fe,setCullFace:_e,setLineWidth:qt,setPolygonOffset:Ue,setScissorTest:Wt,activeTexture:D,bindTexture:A,unbindTexture:et,compressedTexImage2D:ft,compressedTexImage3D:Mt,texImage2D:Bt,texImage3D:Yt,updateUBOMapping:Jt,uniformBlockBinding:ae,texStorage2D:ve,texStorage3D:bt,texSubImage2D:dt,texSubImage3D:kt,compressedTexSubImage2D:Ct,compressedTexSubImage3D:zt,scissor:Xt,viewport:Nt,reset:Pe}}function $A(o,t,i,s,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ie,_=new WeakMap;let S;const y=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function R(D,A){return M?new OffscreenCanvas(D,A):Ic("canvas")}function w(D,A,et){let ft=1;const Mt=Wt(D);if((Mt.width>et||Mt.height>et)&&(ft=et/Math.max(Mt.width,Mt.height)),ft<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const dt=Math.floor(ft*Mt.width),kt=Math.floor(ft*Mt.height);S===void 0&&(S=R(dt,kt));const Ct=A?R(dt,kt):S;return Ct.width=dt,Ct.height=kt,Ct.getContext("2d").drawImage(D,0,0,dt,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+dt+"x"+kt+")."),Ct}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),D;return D}function x(D){return D.generateMipmaps}function v(D){o.generateMipmap(D)}function I(D){return D.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?o.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function N(D,A,et,ft,Mt=!1){if(D!==null){if(o[D]!==void 0)return o[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let dt=A;if(A===o.RED&&(et===o.FLOAT&&(dt=o.R32F),et===o.HALF_FLOAT&&(dt=o.R16F),et===o.UNSIGNED_BYTE&&(dt=o.R8)),A===o.RED_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.R8UI),et===o.UNSIGNED_SHORT&&(dt=o.R16UI),et===o.UNSIGNED_INT&&(dt=o.R32UI),et===o.BYTE&&(dt=o.R8I),et===o.SHORT&&(dt=o.R16I),et===o.INT&&(dt=o.R32I)),A===o.RG&&(et===o.FLOAT&&(dt=o.RG32F),et===o.HALF_FLOAT&&(dt=o.RG16F),et===o.UNSIGNED_BYTE&&(dt=o.RG8)),A===o.RG_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.RG8UI),et===o.UNSIGNED_SHORT&&(dt=o.RG16UI),et===o.UNSIGNED_INT&&(dt=o.RG32UI),et===o.BYTE&&(dt=o.RG8I),et===o.SHORT&&(dt=o.RG16I),et===o.INT&&(dt=o.RG32I)),A===o.RGB_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.RGB8UI),et===o.UNSIGNED_SHORT&&(dt=o.RGB16UI),et===o.UNSIGNED_INT&&(dt=o.RGB32UI),et===o.BYTE&&(dt=o.RGB8I),et===o.SHORT&&(dt=o.RGB16I),et===o.INT&&(dt=o.RGB32I)),A===o.RGBA_INTEGER&&(et===o.UNSIGNED_BYTE&&(dt=o.RGBA8UI),et===o.UNSIGNED_SHORT&&(dt=o.RGBA16UI),et===o.UNSIGNED_INT&&(dt=o.RGBA32UI),et===o.BYTE&&(dt=o.RGBA8I),et===o.SHORT&&(dt=o.RGBA16I),et===o.INT&&(dt=o.RGBA32I)),A===o.RGB&&et===o.UNSIGNED_INT_5_9_9_9_REV&&(dt=o.RGB9_E5),A===o.RGBA){const kt=Mt?zc:we.getTransfer(ft);et===o.FLOAT&&(dt=o.RGBA32F),et===o.HALF_FLOAT&&(dt=o.RGBA16F),et===o.UNSIGNED_BYTE&&(dt=kt===Fe?o.SRGB8_ALPHA8:o.RGBA8),et===o.UNSIGNED_SHORT_4_4_4_4&&(dt=o.RGBA4),et===o.UNSIGNED_SHORT_5_5_5_1&&(dt=o.RGB5_A1)}return(dt===o.R16F||dt===o.R32F||dt===o.RG16F||dt===o.RG32F||dt===o.RGBA16F||dt===o.RGBA32F)&&t.get("EXT_color_buffer_float"),dt}function U(D,A){let et;return D?A===null||A===As||A===Or?et=o.DEPTH24_STENCIL8:A===ca?et=o.DEPTH32F_STENCIL8:A===Vo&&(et=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===As||A===Or?et=o.DEPTH_COMPONENT24:A===ca?et=o.DEPTH_COMPONENT32F:A===Vo&&(et=o.DEPTH_COMPONENT16),et}function q(D,A){return x(D)===!0||D.isFramebufferTexture&&D.minFilter!==Ri&&D.minFilter!==zi?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function G(D){const A=D.target;A.removeEventListener("dispose",G),K(A),A.isVideoTexture&&_.delete(A)}function P(D){const A=D.target;A.removeEventListener("dispose",P),b(A)}function K(D){const A=s.get(D);if(A.__webglInit===void 0)return;const et=D.source,ft=y.get(et);if(ft){const Mt=ft[A.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&T(D),Object.keys(ft).length===0&&y.delete(et)}s.remove(D)}function T(D){const A=s.get(D);o.deleteTexture(A.__webglTexture);const et=D.source,ft=y.get(et);delete ft[A.__cacheKey],h.memory.textures--}function b(D){const A=s.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),s.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(A.__webglFramebuffer[ft]))for(let Mt=0;Mt<A.__webglFramebuffer[ft].length;Mt++)o.deleteFramebuffer(A.__webglFramebuffer[ft][Mt]);else o.deleteFramebuffer(A.__webglFramebuffer[ft]);A.__webglDepthbuffer&&o.deleteRenderbuffer(A.__webglDepthbuffer[ft])}else{if(Array.isArray(A.__webglFramebuffer))for(let ft=0;ft<A.__webglFramebuffer.length;ft++)o.deleteFramebuffer(A.__webglFramebuffer[ft]);else o.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&o.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&o.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ft=0;ft<A.__webglColorRenderbuffer.length;ft++)A.__webglColorRenderbuffer[ft]&&o.deleteRenderbuffer(A.__webglColorRenderbuffer[ft]);A.__webglDepthRenderbuffer&&o.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const et=D.textures;for(let ft=0,Mt=et.length;ft<Mt;ft++){const dt=s.get(et[ft]);dt.__webglTexture&&(o.deleteTexture(dt.__webglTexture),h.memory.textures--),s.remove(et[ft])}s.remove(D)}let B=0;function lt(){B=0}function rt(){const D=B;return D>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+l.maxTextures),B+=1,D}function mt(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function gt(D,A){const et=s.get(D);if(D.isVideoTexture&&qt(D),D.isRenderTargetTexture===!1&&D.version>0&&et.__version!==D.version){const ft=D.image;if(ft===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(et,D,A);return}}i.bindTexture(o.TEXTURE_2D,et.__webglTexture,o.TEXTURE0+A)}function O(D,A){const et=s.get(D);if(D.version>0&&et.__version!==D.version){Y(et,D,A);return}i.bindTexture(o.TEXTURE_2D_ARRAY,et.__webglTexture,o.TEXTURE0+A)}function Q(D,A){const et=s.get(D);if(D.version>0&&et.__version!==D.version){Y(et,D,A);return}i.bindTexture(o.TEXTURE_3D,et.__webglTexture,o.TEXTURE0+A)}function Z(D,A){const et=s.get(D);if(D.version>0&&et.__version!==D.version){ct(et,D,A);return}i.bindTexture(o.TEXTURE_CUBE_MAP,et.__webglTexture,o.TEXTURE0+A)}const xt={[sd]:o.REPEAT,[Ts]:o.CLAMP_TO_EDGE,[rd]:o.MIRRORED_REPEAT},Tt={[Ri]:o.NEAREST,[Rx]:o.NEAREST_MIPMAP_NEAREST,[nc]:o.NEAREST_MIPMAP_LINEAR,[zi]:o.LINEAR,[oh]:o.LINEAR_MIPMAP_NEAREST,[bs]:o.LINEAR_MIPMAP_LINEAR},L={[Ux]:o.NEVER,[Bx]:o.ALWAYS,[Lx]:o.LESS,[fv]:o.LEQUAL,[Nx]:o.EQUAL,[zx]:o.GEQUAL,[Ox]:o.GREATER,[Px]:o.NOTEQUAL};function nt(D,A){if(A.type===ca&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===zi||A.magFilter===oh||A.magFilter===nc||A.magFilter===bs||A.minFilter===zi||A.minFilter===oh||A.minFilter===nc||A.minFilter===bs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(D,o.TEXTURE_WRAP_S,xt[A.wrapS]),o.texParameteri(D,o.TEXTURE_WRAP_T,xt[A.wrapT]),(D===o.TEXTURE_3D||D===o.TEXTURE_2D_ARRAY)&&o.texParameteri(D,o.TEXTURE_WRAP_R,xt[A.wrapR]),o.texParameteri(D,o.TEXTURE_MAG_FILTER,Tt[A.magFilter]),o.texParameteri(D,o.TEXTURE_MIN_FILTER,Tt[A.minFilter]),A.compareFunction&&(o.texParameteri(D,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(D,o.TEXTURE_COMPARE_FUNC,L[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Ri||A.minFilter!==nc&&A.minFilter!==bs||A.type===ca&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||s.get(A).__currentAnisotropy){const et=t.get("EXT_texture_filter_anisotropic");o.texParameterf(D,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy}}}function yt(D,A){let et=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",G));const ft=A.source;let Mt=y.get(ft);Mt===void 0&&(Mt={},y.set(ft,Mt));const dt=mt(A);if(dt!==D.__cacheKey){Mt[dt]===void 0&&(Mt[dt]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,et=!0),Mt[dt].usedTimes++;const kt=Mt[D.__cacheKey];kt!==void 0&&(Mt[D.__cacheKey].usedTimes--,kt.usedTimes===0&&T(A)),D.__cacheKey=dt,D.__webglTexture=Mt[dt].texture}return et}function Y(D,A,et){let ft=o.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ft=o.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ft=o.TEXTURE_3D);const Mt=yt(D,A),dt=A.source;i.bindTexture(ft,D.__webglTexture,o.TEXTURE0+et);const kt=s.get(dt);if(dt.version!==kt.__version||Mt===!0){i.activeTexture(o.TEXTURE0+et);const Ct=we.getPrimaries(we.workingColorSpace),zt=A.colorSpace===ka?null:we.getPrimaries(A.colorSpace),ve=A.colorSpace===ka||Ct===zt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,A.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,A.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let bt=w(A.image,!1,l.maxTextureSize);bt=Ue(A,bt);const Bt=c.convert(A.format,A.colorSpace),Yt=c.convert(A.type);let Xt=N(A.internalFormat,Bt,Yt,A.colorSpace,A.isVideoTexture);nt(ft,A);let Nt;const Jt=A.mipmaps,ae=A.isVideoTexture!==!0,Pe=kt.__version===void 0||Mt===!0,V=dt.dataReady,At=q(A,bt);if(A.isDepthTexture)Xt=U(A.format===Pr,A.type),Pe&&(ae?i.texStorage2D(o.TEXTURE_2D,1,Xt,bt.width,bt.height):i.texImage2D(o.TEXTURE_2D,0,Xt,bt.width,bt.height,0,Bt,Yt,null));else if(A.isDataTexture)if(Jt.length>0){ae&&Pe&&i.texStorage2D(o.TEXTURE_2D,At,Xt,Jt[0].width,Jt[0].height);for(let ot=0,_t=Jt.length;ot<_t;ot++)Nt=Jt[ot],ae?V&&i.texSubImage2D(o.TEXTURE_2D,ot,0,0,Nt.width,Nt.height,Bt,Yt,Nt.data):i.texImage2D(o.TEXTURE_2D,ot,Xt,Nt.width,Nt.height,0,Bt,Yt,Nt.data);A.generateMipmaps=!1}else ae?(Pe&&i.texStorage2D(o.TEXTURE_2D,At,Xt,bt.width,bt.height),V&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,bt.width,bt.height,Bt,Yt,bt.data)):i.texImage2D(o.TEXTURE_2D,0,Xt,bt.width,bt.height,0,Bt,Yt,bt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ae&&Pe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,Xt,Jt[0].width,Jt[0].height,bt.depth);for(let ot=0,_t=Jt.length;ot<_t;ot++)if(Nt=Jt[ot],A.format!==Ai)if(Bt!==null)if(ae){if(V)if(A.layerUpdates.size>0){const Rt=S0(Nt.width,Nt.height,A.format,A.type);for(const Dt of A.layerUpdates){const $t=Nt.data.subarray(Dt*Rt/Nt.data.BYTES_PER_ELEMENT,(Dt+1)*Rt/Nt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ot,0,0,Dt,Nt.width,Nt.height,1,Bt,$t)}A.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ot,0,0,0,Nt.width,Nt.height,bt.depth,Bt,Nt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ot,Xt,Nt.width,Nt.height,bt.depth,0,Nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?V&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,ot,0,0,0,Nt.width,Nt.height,bt.depth,Bt,Yt,Nt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,ot,Xt,Nt.width,Nt.height,bt.depth,0,Bt,Yt,Nt.data)}else{ae&&Pe&&i.texStorage2D(o.TEXTURE_2D,At,Xt,Jt[0].width,Jt[0].height);for(let ot=0,_t=Jt.length;ot<_t;ot++)Nt=Jt[ot],A.format!==Ai?Bt!==null?ae?V&&i.compressedTexSubImage2D(o.TEXTURE_2D,ot,0,0,Nt.width,Nt.height,Bt,Nt.data):i.compressedTexImage2D(o.TEXTURE_2D,ot,Xt,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?V&&i.texSubImage2D(o.TEXTURE_2D,ot,0,0,Nt.width,Nt.height,Bt,Yt,Nt.data):i.texImage2D(o.TEXTURE_2D,ot,Xt,Nt.width,Nt.height,0,Bt,Yt,Nt.data)}else if(A.isDataArrayTexture)if(ae){if(Pe&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,Xt,bt.width,bt.height,bt.depth),V)if(A.layerUpdates.size>0){const ot=S0(bt.width,bt.height,A.format,A.type);for(const _t of A.layerUpdates){const Rt=bt.data.subarray(_t*ot/bt.data.BYTES_PER_ELEMENT,(_t+1)*ot/bt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,_t,bt.width,bt.height,1,Bt,Yt,Rt)}A.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,bt.width,bt.height,bt.depth,Bt,Yt,bt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Xt,bt.width,bt.height,bt.depth,0,Bt,Yt,bt.data);else if(A.isData3DTexture)ae?(Pe&&i.texStorage3D(o.TEXTURE_3D,At,Xt,bt.width,bt.height,bt.depth),V&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,bt.width,bt.height,bt.depth,Bt,Yt,bt.data)):i.texImage3D(o.TEXTURE_3D,0,Xt,bt.width,bt.height,bt.depth,0,Bt,Yt,bt.data);else if(A.isFramebufferTexture){if(Pe)if(ae)i.texStorage2D(o.TEXTURE_2D,At,Xt,bt.width,bt.height);else{let ot=bt.width,_t=bt.height;for(let Rt=0;Rt<At;Rt++)i.texImage2D(o.TEXTURE_2D,Rt,Xt,ot,_t,0,Bt,Yt,null),ot>>=1,_t>>=1}}else if(Jt.length>0){if(ae&&Pe){const ot=Wt(Jt[0]);i.texStorage2D(o.TEXTURE_2D,At,Xt,ot.width,ot.height)}for(let ot=0,_t=Jt.length;ot<_t;ot++)Nt=Jt[ot],ae?V&&i.texSubImage2D(o.TEXTURE_2D,ot,0,0,Bt,Yt,Nt):i.texImage2D(o.TEXTURE_2D,ot,Xt,Bt,Yt,Nt);A.generateMipmaps=!1}else if(ae){if(Pe){const ot=Wt(bt);i.texStorage2D(o.TEXTURE_2D,At,Xt,ot.width,ot.height)}V&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Bt,Yt,bt)}else i.texImage2D(o.TEXTURE_2D,0,Xt,Bt,Yt,bt);x(A)&&v(ft),kt.__version=dt.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function ct(D,A,et){if(A.image.length!==6)return;const ft=yt(D,A),Mt=A.source;i.bindTexture(o.TEXTURE_CUBE_MAP,D.__webglTexture,o.TEXTURE0+et);const dt=s.get(Mt);if(Mt.version!==dt.__version||ft===!0){i.activeTexture(o.TEXTURE0+et);const kt=we.getPrimaries(we.workingColorSpace),Ct=A.colorSpace===ka?null:we.getPrimaries(A.colorSpace),zt=A.colorSpace===ka||kt===Ct?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,A.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,A.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const ve=A.isCompressedTexture||A.image[0].isCompressedTexture,bt=A.image[0]&&A.image[0].isDataTexture,Bt=[];for(let _t=0;_t<6;_t++)!ve&&!bt?Bt[_t]=w(A.image[_t],!0,l.maxCubemapSize):Bt[_t]=bt?A.image[_t].image:A.image[_t],Bt[_t]=Ue(A,Bt[_t]);const Yt=Bt[0],Xt=c.convert(A.format,A.colorSpace),Nt=c.convert(A.type),Jt=N(A.internalFormat,Xt,Nt,A.colorSpace),ae=A.isVideoTexture!==!0,Pe=dt.__version===void 0||ft===!0,V=Mt.dataReady;let At=q(A,Yt);nt(o.TEXTURE_CUBE_MAP,A);let ot;if(ve){ae&&Pe&&i.texStorage2D(o.TEXTURE_CUBE_MAP,At,Jt,Yt.width,Yt.height);for(let _t=0;_t<6;_t++){ot=Bt[_t].mipmaps;for(let Rt=0;Rt<ot.length;Rt++){const Dt=ot[Rt];A.format!==Ai?Xt!==null?ae?V&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt,0,0,Dt.width,Dt.height,Xt,Dt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt,Jt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ae?V&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt,0,0,Dt.width,Dt.height,Xt,Nt,Dt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt,Jt,Dt.width,Dt.height,0,Xt,Nt,Dt.data)}}}else{if(ot=A.mipmaps,ae&&Pe){ot.length>0&&At++;const _t=Wt(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,At,Jt,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(bt){ae?V&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Bt[_t].width,Bt[_t].height,Xt,Nt,Bt[_t].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Jt,Bt[_t].width,Bt[_t].height,0,Xt,Nt,Bt[_t].data);for(let Rt=0;Rt<ot.length;Rt++){const $t=ot[Rt].image[_t].image;ae?V&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt+1,0,0,$t.width,$t.height,Xt,Nt,$t.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt+1,Jt,$t.width,$t.height,0,Xt,Nt,$t.data)}}else{ae?V&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Xt,Nt,Bt[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Jt,Xt,Nt,Bt[_t]);for(let Rt=0;Rt<ot.length;Rt++){const Dt=ot[Rt];ae?V&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt+1,0,0,Xt,Nt,Dt.image[_t]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Rt+1,Jt,Xt,Nt,Dt.image[_t])}}}x(A)&&v(o.TEXTURE_CUBE_MAP),dt.__version=Mt.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function Et(D,A,et,ft,Mt,dt){const kt=c.convert(et.format,et.colorSpace),Ct=c.convert(et.type),zt=N(et.internalFormat,kt,Ct,et.colorSpace),ve=s.get(A),bt=s.get(et);if(bt.__renderTarget=A,!ve.__hasExternalTextures){const Bt=Math.max(1,A.width>>dt),Yt=Math.max(1,A.height>>dt);Mt===o.TEXTURE_3D||Mt===o.TEXTURE_2D_ARRAY?i.texImage3D(Mt,dt,zt,Bt,Yt,A.depth,0,kt,Ct,null):i.texImage2D(Mt,dt,zt,Bt,Yt,0,kt,Ct,null)}i.bindFramebuffer(o.FRAMEBUFFER,D),_e(A)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ft,Mt,bt.__webglTexture,0,fe(A)):(Mt===o.TEXTURE_2D||Mt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ft,Mt,bt.__webglTexture,dt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function St(D,A,et){if(o.bindRenderbuffer(o.RENDERBUFFER,D),A.depthBuffer){const ft=A.depthTexture,Mt=ft&&ft.isDepthTexture?ft.type:null,dt=U(A.stencilBuffer,Mt),kt=A.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ct=fe(A);_e(A)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ct,dt,A.width,A.height):et?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ct,dt,A.width,A.height):o.renderbufferStorage(o.RENDERBUFFER,dt,A.width,A.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,kt,o.RENDERBUFFER,D)}else{const ft=A.textures;for(let Mt=0;Mt<ft.length;Mt++){const dt=ft[Mt],kt=c.convert(dt.format,dt.colorSpace),Ct=c.convert(dt.type),zt=N(dt.internalFormat,kt,Ct,dt.colorSpace),ve=fe(A);et&&_e(A)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,ve,zt,A.width,A.height):_e(A)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ve,zt,A.width,A.height):o.renderbufferStorage(o.RENDERBUFFER,zt,A.width,A.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Gt(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ft=s.get(A.depthTexture);ft.__renderTarget=A,(!ft.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),gt(A.depthTexture,0);const Mt=ft.__webglTexture,dt=fe(A);if(A.depthTexture.format===wr)_e(A)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Mt,0);else if(A.depthTexture.format===Pr)_e(A)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0,dt):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Mt,0);else throw new Error("Unknown depthTexture format")}function Ft(D){const A=s.get(D),et=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const ft=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ft){const Mt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ft.removeEventListener("dispose",Mt)};ft.addEventListener("dispose",Mt),A.__depthDisposeCallback=Mt}A.__boundDepthTexture=ft}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(et)throw new Error("target.depthTexture not supported in Cube render targets");Gt(A.__webglFramebuffer,D)}else if(et){A.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(i.bindFramebuffer(o.FRAMEBUFFER,A.__webglFramebuffer[ft]),A.__webglDepthbuffer[ft]===void 0)A.__webglDepthbuffer[ft]=o.createRenderbuffer(),St(A.__webglDepthbuffer[ft],D,!1);else{const Mt=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,dt=A.__webglDepthbuffer[ft];o.bindRenderbuffer(o.RENDERBUFFER,dt),o.framebufferRenderbuffer(o.FRAMEBUFFER,Mt,o.RENDERBUFFER,dt)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=o.createRenderbuffer(),St(A.__webglDepthbuffer,D,!1);else{const ft=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Mt=A.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Mt),o.framebufferRenderbuffer(o.FRAMEBUFFER,ft,o.RENDERBUFFER,Mt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function ne(D,A,et){const ft=s.get(D);A!==void 0&&Et(ft.__webglFramebuffer,D,D.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),et!==void 0&&Ft(D)}function Oe(D){const A=D.texture,et=s.get(D),ft=s.get(A);D.addEventListener("dispose",P);const Mt=D.textures,dt=D.isWebGLCubeRenderTarget===!0,kt=Mt.length>1;if(kt||(ft.__webglTexture===void 0&&(ft.__webglTexture=o.createTexture()),ft.__version=A.version,h.memory.textures++),dt){et.__webglFramebuffer=[];for(let Ct=0;Ct<6;Ct++)if(A.mipmaps&&A.mipmaps.length>0){et.__webglFramebuffer[Ct]=[];for(let zt=0;zt<A.mipmaps.length;zt++)et.__webglFramebuffer[Ct][zt]=o.createFramebuffer()}else et.__webglFramebuffer[Ct]=o.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){et.__webglFramebuffer=[];for(let Ct=0;Ct<A.mipmaps.length;Ct++)et.__webglFramebuffer[Ct]=o.createFramebuffer()}else et.__webglFramebuffer=o.createFramebuffer();if(kt)for(let Ct=0,zt=Mt.length;Ct<zt;Ct++){const ve=s.get(Mt[Ct]);ve.__webglTexture===void 0&&(ve.__webglTexture=o.createTexture(),h.memory.textures++)}if(D.samples>0&&_e(D)===!1){et.__webglMultisampledFramebuffer=o.createFramebuffer(),et.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,et.__webglMultisampledFramebuffer);for(let Ct=0;Ct<Mt.length;Ct++){const zt=Mt[Ct];et.__webglColorRenderbuffer[Ct]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,et.__webglColorRenderbuffer[Ct]);const ve=c.convert(zt.format,zt.colorSpace),bt=c.convert(zt.type),Bt=N(zt.internalFormat,ve,bt,zt.colorSpace,D.isXRRenderTarget===!0),Yt=fe(D);o.renderbufferStorageMultisample(o.RENDERBUFFER,Yt,Bt,D.width,D.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.RENDERBUFFER,et.__webglColorRenderbuffer[Ct])}o.bindRenderbuffer(o.RENDERBUFFER,null),D.depthBuffer&&(et.__webglDepthRenderbuffer=o.createRenderbuffer(),St(et.__webglDepthRenderbuffer,D,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(dt){i.bindTexture(o.TEXTURE_CUBE_MAP,ft.__webglTexture),nt(o.TEXTURE_CUBE_MAP,A);for(let Ct=0;Ct<6;Ct++)if(A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(et.__webglFramebuffer[Ct][zt],D,A,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,zt);else Et(et.__webglFramebuffer[Ct],D,A,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ct,0);x(A)&&v(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(kt){for(let Ct=0,zt=Mt.length;Ct<zt;Ct++){const ve=Mt[Ct],bt=s.get(ve);i.bindTexture(o.TEXTURE_2D,bt.__webglTexture),nt(o.TEXTURE_2D,ve),Et(et.__webglFramebuffer,D,ve,o.COLOR_ATTACHMENT0+Ct,o.TEXTURE_2D,0),x(ve)&&v(o.TEXTURE_2D)}i.unbindTexture()}else{let Ct=o.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ct=D.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ct,ft.__webglTexture),nt(Ct,A),A.mipmaps&&A.mipmaps.length>0)for(let zt=0;zt<A.mipmaps.length;zt++)Et(et.__webglFramebuffer[zt],D,A,o.COLOR_ATTACHMENT0,Ct,zt);else Et(et.__webglFramebuffer,D,A,o.COLOR_ATTACHMENT0,Ct,0);x(A)&&v(Ct),i.unbindTexture()}D.depthBuffer&&Ft(D)}function he(D){const A=D.textures;for(let et=0,ft=A.length;et<ft;et++){const Mt=A[et];if(x(Mt)){const dt=I(D),kt=s.get(Mt).__webglTexture;i.bindTexture(dt,kt),v(dt),i.unbindTexture()}}}const qe=[],F=[];function An(D){if(D.samples>0){if(_e(D)===!1){const A=D.textures,et=D.width,ft=D.height;let Mt=o.COLOR_BUFFER_BIT;const dt=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,kt=s.get(D),Ct=A.length>1;if(Ct)for(let zt=0;zt<A.length;zt++)i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let zt=0;zt<A.length;zt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Mt|=o.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Mt|=o.STENCIL_BUFFER_BIT)),Ct){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const ve=s.get(A[zt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ve,0)}o.blitFramebuffer(0,0,et,ft,0,0,et,ft,Mt,o.NEAREST),m===!0&&(qe.length=0,F.length=0,qe.push(o.COLOR_ATTACHMENT0+zt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(qe.push(dt),F.push(dt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,F)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,qe))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ct)for(let zt=0;zt<A.length;zt++){i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.RENDERBUFFER,kt.__webglColorRenderbuffer[zt]);const ve=s.get(A[zt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+zt,o.TEXTURE_2D,ve,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&m){const A=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[A])}}}function fe(D){return Math.min(l.maxSamples,D.samples)}function _e(D){const A=s.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function qt(D){const A=h.render.frame;_.get(D)!==A&&(_.set(D,A),D.update())}function Ue(D,A){const et=D.colorSpace,ft=D.format,Mt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||et!==zr&&et!==ka&&(we.getTransfer(et)===Fe?(ft!==Ai||Mt!==ha)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",et)),A}function Wt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(p.width=D.naturalWidth||D.width,p.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(p.width=D.displayWidth,p.height=D.displayHeight):(p.width=D.width,p.height=D.height),p}this.allocateTextureUnit=rt,this.resetTextureUnits=lt,this.setTexture2D=gt,this.setTexture2DArray=O,this.setTexture3D=Q,this.setTextureCube=Z,this.rebindTextures=ne,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=An,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=_e}function t1(o,t){function i(s,l=ka){let c;const h=we.getTransfer(l);if(s===ha)return o.UNSIGNED_BYTE;if(s===Fd)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Hd)return o.UNSIGNED_SHORT_5_5_5_1;if(s===nv)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===tv)return o.BYTE;if(s===ev)return o.SHORT;if(s===Vo)return o.UNSIGNED_SHORT;if(s===Id)return o.INT;if(s===As)return o.UNSIGNED_INT;if(s===ca)return o.FLOAT;if(s===ko)return o.HALF_FLOAT;if(s===iv)return o.ALPHA;if(s===av)return o.RGB;if(s===Ai)return o.RGBA;if(s===sv)return o.LUMINANCE;if(s===rv)return o.LUMINANCE_ALPHA;if(s===wr)return o.DEPTH_COMPONENT;if(s===Pr)return o.DEPTH_STENCIL;if(s===ov)return o.RED;if(s===Gd)return o.RED_INTEGER;if(s===lv)return o.RG;if(s===Vd)return o.RG_INTEGER;if(s===kd)return o.RGBA_INTEGER;if(s===wc||s===Dc||s===Uc||s===Lc)if(h===Fe)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===wc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Dc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Uc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Lc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===wc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Dc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Uc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Lc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===od||s===ld||s===cd||s===ud)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===od)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ld)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===cd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===ud)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===fd||s===hd||s===dd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(s===fd||s===hd)return h===Fe?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===dd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===pd||s===md||s===gd||s===_d||s===vd||s===Sd||s===yd||s===xd||s===Md||s===Ed||s===Td||s===bd||s===Ad||s===Rd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(s===pd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===md)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===gd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===_d)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===vd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Sd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===yd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===xd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Md)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ed)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Td)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===bd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ad)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Rd)return h===Fe?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Nc||s===Cd||s===wd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(s===Nc)return h===Fe?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Cd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===wd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===cv||s===Dd||s===Ud||s===Ld)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(s===Nc)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Dd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ud)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ld)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Or?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const e1={type:"move"};class Ih{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const s of t.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,s){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const w of t.hand.values()){const x=i.getJointPose(w,s),v=this._getHandJoint(p,w);x!==null&&(v.matrix.fromArray(x.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=x.radius),v.visible=x!==null}const _=p.joints["index-finger-tip"],S=p.joints["thumb-tip"],y=_.position.distanceTo(S.position),M=.02,R=.005;p.inputState.pinching&&y>M+R?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&y<=M-R&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(e1)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const s=new Mc;s.matrixAutoUpdate=!1,s.visible=!1,t.joints[i.jointName]=s,t.add(s)}return t.joints[i.jointName]}}const n1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i1=`
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

}`;class a1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i,s){if(this.texture===null){const l=new Yn,c=t.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,s=new ja({vertexShader:n1,fragmentShader:i1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Wn(new Wo(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class s1 extends Cs{constructor(t,i){super();const s=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,_=null,S=null,y=null,M=null,R=null;const w=new a1,x=i.getContextAttributes();let v=null,I=null;const N=[],U=[],q=new ie;let G=null;const P=new mi;P.viewport=new $e;const K=new mi;K.viewport=new $e;const T=[P,K],b=new MM;let B=null,lt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ct=N[Y];return ct===void 0&&(ct=new Ih,N[Y]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Y){let ct=N[Y];return ct===void 0&&(ct=new Ih,N[Y]=ct),ct.getGripSpace()},this.getHand=function(Y){let ct=N[Y];return ct===void 0&&(ct=new Ih,N[Y]=ct),ct.getHandSpace()};function rt(Y){const ct=U.indexOf(Y.inputSource);if(ct===-1)return;const Et=N[ct];Et!==void 0&&(Et.update(Y.inputSource,Y.frame,p||h),Et.dispatchEvent({type:Y.type,data:Y.inputSource}))}function mt(){l.removeEventListener("select",rt),l.removeEventListener("selectstart",rt),l.removeEventListener("selectend",rt),l.removeEventListener("squeeze",rt),l.removeEventListener("squeezestart",rt),l.removeEventListener("squeezeend",rt),l.removeEventListener("end",mt),l.removeEventListener("inputsourceschange",gt);for(let Y=0;Y<N.length;Y++){const ct=U[Y];ct!==null&&(U[Y]=null,N[Y].disconnect(ct))}B=null,lt=null,w.reset(),t.setRenderTarget(v),M=null,y=null,S=null,l=null,I=null,yt.stop(),s.isPresenting=!1,t.setPixelRatio(G),t.setSize(q.width,q.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){c=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){d=Y,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(Y){p=Y},this.getBaseLayer=function(){return y!==null?y:M},this.getBinding=function(){return S},this.getFrame=function(){return R},this.getSession=function(){return l},this.setSession=async function(Y){if(l=Y,l!==null){if(v=t.getRenderTarget(),l.addEventListener("select",rt),l.addEventListener("selectstart",rt),l.addEventListener("selectend",rt),l.addEventListener("squeeze",rt),l.addEventListener("squeezestart",rt),l.addEventListener("squeezeend",rt),l.addEventListener("end",mt),l.addEventListener("inputsourceschange",gt),x.xrCompatible!==!0&&await i.makeXRCompatible(),G=t.getPixelRatio(),t.getSize(q),l.renderState.layers===void 0){const ct={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,ct),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),I=new Rs(M.framebufferWidth,M.framebufferHeight,{format:Ai,type:ha,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let ct=null,Et=null,St=null;x.depth&&(St=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ct=x.stencil?Pr:wr,Et=x.stencil?Or:As);const Gt={colorFormat:i.RGBA8,depthFormat:St,scaleFactor:c};S=new XRWebGLBinding(l,i),y=S.createProjectionLayer(Gt),l.updateRenderState({layers:[y]}),t.setPixelRatio(1),t.setSize(y.textureWidth,y.textureHeight,!1),I=new Rs(y.textureWidth,y.textureHeight,{format:Ai,type:ha,depthTexture:new Ev(y.textureWidth,y.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),yt.setContext(l),yt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function gt(Y){for(let ct=0;ct<Y.removed.length;ct++){const Et=Y.removed[ct],St=U.indexOf(Et);St>=0&&(U[St]=null,N[St].disconnect(Et))}for(let ct=0;ct<Y.added.length;ct++){const Et=Y.added[ct];let St=U.indexOf(Et);if(St===-1){for(let Ft=0;Ft<N.length;Ft++)if(Ft>=U.length){U.push(Et),St=Ft;break}else if(U[Ft]===null){U[Ft]=Et,St=Ft;break}if(St===-1)break}const Gt=N[St];Gt&&Gt.connect(Et)}}const O=new j,Q=new j;function Z(Y,ct,Et){O.setFromMatrixPosition(ct.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const St=O.distanceTo(Q),Gt=ct.projectionMatrix.elements,Ft=Et.projectionMatrix.elements,ne=Gt[14]/(Gt[10]-1),Oe=Gt[14]/(Gt[10]+1),he=(Gt[9]+1)/Gt[5],qe=(Gt[9]-1)/Gt[5],F=(Gt[8]-1)/Gt[0],An=(Ft[8]+1)/Ft[0],fe=ne*F,_e=ne*An,qt=St/(-F+An),Ue=qt*-F;if(ct.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ue),Y.translateZ(qt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Gt[10]===-1)Y.projectionMatrix.copy(ct.projectionMatrix),Y.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{const Wt=ne+qt,D=Oe+qt,A=fe-Ue,et=_e+(St-Ue),ft=he*Oe/D*Wt,Mt=qe*Oe/D*Wt;Y.projectionMatrix.makePerspective(A,et,ft,Mt,Wt,D),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function xt(Y,ct){ct===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ct.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(l===null)return;let ct=Y.near,Et=Y.far;w.texture!==null&&(w.depthNear>0&&(ct=w.depthNear),w.depthFar>0&&(Et=w.depthFar)),b.near=K.near=P.near=ct,b.far=K.far=P.far=Et,(B!==b.near||lt!==b.far)&&(l.updateRenderState({depthNear:b.near,depthFar:b.far}),B=b.near,lt=b.far),P.layers.mask=Y.layers.mask|2,K.layers.mask=Y.layers.mask|4,b.layers.mask=P.layers.mask|K.layers.mask;const St=Y.parent,Gt=b.cameras;xt(b,St);for(let Ft=0;Ft<Gt.length;Ft++)xt(Gt[Ft],St);Gt.length===2?Z(b,P,K):b.projectionMatrix.copy(P.projectionMatrix),Tt(Y,b,St)};function Tt(Y,ct,Et){Et===null?Y.matrix.copy(ct.matrixWorld):(Y.matrix.copy(Et.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ct.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ct.projectionMatrix),Y.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Nd*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(y===null&&M===null))return m},this.setFoveation=function(Y){m=Y,y!==null&&(y.fixedFoveation=Y),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Y)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(b)};let L=null;function nt(Y,ct){if(_=ct.getViewerPose(p||h),R=ct,_!==null){const Et=_.views;M!==null&&(t.setRenderTargetFramebuffer(I,M.framebuffer),t.setRenderTarget(I));let St=!1;Et.length!==b.cameras.length&&(b.cameras.length=0,St=!0);for(let Ft=0;Ft<Et.length;Ft++){const ne=Et[Ft];let Oe=null;if(M!==null)Oe=M.getViewport(ne);else{const qe=S.getViewSubImage(y,ne);Oe=qe.viewport,Ft===0&&(t.setRenderTargetTextures(I,qe.colorTexture,y.ignoreDepthValues?void 0:qe.depthStencilTexture),t.setRenderTarget(I))}let he=T[Ft];he===void 0&&(he=new mi,he.layers.enable(Ft),he.viewport=new $e,T[Ft]=he),he.matrix.fromArray(ne.transform.matrix),he.matrix.decompose(he.position,he.quaternion,he.scale),he.projectionMatrix.fromArray(ne.projectionMatrix),he.projectionMatrixInverse.copy(he.projectionMatrix).invert(),he.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),Ft===0&&(b.matrix.copy(he.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),St===!0&&b.cameras.push(he)}const Gt=l.enabledFeatures;if(Gt&&Gt.includes("depth-sensing")){const Ft=S.getDepthInformation(Et[0]);Ft&&Ft.isValid&&Ft.texture&&w.init(t,Ft,l.renderState)}}for(let Et=0;Et<N.length;Et++){const St=U[Et],Gt=N[Et];St!==null&&Gt!==void 0&&Gt.update(St,ct,p||h)}L&&L(Y,ct),ct.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ct}),R=null}const yt=new Av;yt.setAnimationLoop(nt),this.setAnimationLoop=function(Y){L=Y},this.dispose=function(){}}}const ys=new Bi,r1=new Ze;function o1(o,t){function i(x,v){x.matrixAutoUpdate===!0&&x.updateMatrix(),v.value.copy(x.matrix)}function s(x,v){v.color.getRGB(x.fogColor.value,vv(o)),v.isFog?(x.fogNear.value=v.near,x.fogFar.value=v.far):v.isFogExp2&&(x.fogDensity.value=v.density)}function l(x,v,I,N,U){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(x,v):v.isMeshToonMaterial?(c(x,v),S(x,v)):v.isMeshPhongMaterial?(c(x,v),_(x,v)):v.isMeshStandardMaterial?(c(x,v),y(x,v),v.isMeshPhysicalMaterial&&M(x,v,U)):v.isMeshMatcapMaterial?(c(x,v),R(x,v)):v.isMeshDepthMaterial?c(x,v):v.isMeshDistanceMaterial?(c(x,v),w(x,v)):v.isMeshNormalMaterial?c(x,v):v.isLineBasicMaterial?(h(x,v),v.isLineDashedMaterial&&d(x,v)):v.isPointsMaterial?m(x,v,I,N):v.isSpriteMaterial?p(x,v):v.isShadowMaterial?(x.color.value.copy(v.color),x.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(x,v){x.opacity.value=v.opacity,v.color&&x.diffuse.value.copy(v.color),v.emissive&&x.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(x.map.value=v.map,i(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,i(v.alphaMap,x.alphaMapTransform)),v.bumpMap&&(x.bumpMap.value=v.bumpMap,i(v.bumpMap,x.bumpMapTransform),x.bumpScale.value=v.bumpScale,v.side===qn&&(x.bumpScale.value*=-1)),v.normalMap&&(x.normalMap.value=v.normalMap,i(v.normalMap,x.normalMapTransform),x.normalScale.value.copy(v.normalScale),v.side===qn&&x.normalScale.value.negate()),v.displacementMap&&(x.displacementMap.value=v.displacementMap,i(v.displacementMap,x.displacementMapTransform),x.displacementScale.value=v.displacementScale,x.displacementBias.value=v.displacementBias),v.emissiveMap&&(x.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,x.emissiveMapTransform)),v.specularMap&&(x.specularMap.value=v.specularMap,i(v.specularMap,x.specularMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest);const I=t.get(v),N=I.envMap,U=I.envMapRotation;N&&(x.envMap.value=N,ys.copy(U),ys.x*=-1,ys.y*=-1,ys.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),x.envMapRotation.value.setFromMatrix4(r1.makeRotationFromEuler(ys)),x.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=v.reflectivity,x.ior.value=v.ior,x.refractionRatio.value=v.refractionRatio),v.lightMap&&(x.lightMap.value=v.lightMap,x.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,x.lightMapTransform)),v.aoMap&&(x.aoMap.value=v.aoMap,x.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,x.aoMapTransform))}function h(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,v.map&&(x.map.value=v.map,i(v.map,x.mapTransform))}function d(x,v){x.dashSize.value=v.dashSize,x.totalSize.value=v.dashSize+v.gapSize,x.scale.value=v.scale}function m(x,v,I,N){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.size.value=v.size*I,x.scale.value=N*.5,v.map&&(x.map.value=v.map,i(v.map,x.uvTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,i(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function p(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.rotation.value=v.rotation,v.map&&(x.map.value=v.map,i(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,i(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function _(x,v){x.specular.value.copy(v.specular),x.shininess.value=Math.max(v.shininess,1e-4)}function S(x,v){v.gradientMap&&(x.gradientMap.value=v.gradientMap)}function y(x,v){x.metalness.value=v.metalness,v.metalnessMap&&(x.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,x.metalnessMapTransform)),x.roughness.value=v.roughness,v.roughnessMap&&(x.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,x.roughnessMapTransform)),v.envMap&&(x.envMapIntensity.value=v.envMapIntensity)}function M(x,v,I){x.ior.value=v.ior,v.sheen>0&&(x.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),x.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(x.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,x.sheenColorMapTransform)),v.sheenRoughnessMap&&(x.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,x.sheenRoughnessMapTransform))),v.clearcoat>0&&(x.clearcoat.value=v.clearcoat,x.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(x.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,x.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(x.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===qn&&x.clearcoatNormalScale.value.negate())),v.dispersion>0&&(x.dispersion.value=v.dispersion),v.iridescence>0&&(x.iridescence.value=v.iridescence,x.iridescenceIOR.value=v.iridescenceIOR,x.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(x.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,x.iridescenceMapTransform)),v.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),v.transmission>0&&(x.transmission.value=v.transmission,x.transmissionSamplerMap.value=I.texture,x.transmissionSamplerSize.value.set(I.width,I.height),v.transmissionMap&&(x.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,x.transmissionMapTransform)),x.thickness.value=v.thickness,v.thicknessMap&&(x.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=v.attenuationDistance,x.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(x.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(x.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=v.specularIntensity,x.specularColor.value.copy(v.specularColor),v.specularColorMap&&(x.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,x.specularColorMapTransform)),v.specularIntensityMap&&(x.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,x.specularIntensityMapTransform))}function R(x,v){v.matcap&&(x.matcap.value=v.matcap)}function w(x,v){const I=t.get(v).light;x.referencePosition.value.setFromMatrixPosition(I.matrixWorld),x.nearDistance.value=I.shadow.camera.near,x.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function l1(o,t,i,s){let l={},c={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(I,N){const U=N.program;s.uniformBlockBinding(I,U)}function p(I,N){let U=l[I.id];U===void 0&&(R(I),U=_(I),l[I.id]=U,I.addEventListener("dispose",x));const q=N.program;s.updateUBOMapping(I,q);const G=t.render.frame;c[I.id]!==G&&(y(I),c[I.id]=G)}function _(I){const N=S();I.__bindingPointIndex=N;const U=o.createBuffer(),q=I.__size,G=I.usage;return o.bindBuffer(o.UNIFORM_BUFFER,U),o.bufferData(o.UNIFORM_BUFFER,q,G),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,N,U),U}function S(){for(let I=0;I<d;I++)if(h.indexOf(I)===-1)return h.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(I){const N=l[I.id],U=I.uniforms,q=I.__cache;o.bindBuffer(o.UNIFORM_BUFFER,N);for(let G=0,P=U.length;G<P;G++){const K=Array.isArray(U[G])?U[G]:[U[G]];for(let T=0,b=K.length;T<b;T++){const B=K[T];if(M(B,G,T,q)===!0){const lt=B.__offset,rt=Array.isArray(B.value)?B.value:[B.value];let mt=0;for(let gt=0;gt<rt.length;gt++){const O=rt[gt],Q=w(O);typeof O=="number"||typeof O=="boolean"?(B.__data[0]=O,o.bufferSubData(o.UNIFORM_BUFFER,lt+mt,B.__data)):O.isMatrix3?(B.__data[0]=O.elements[0],B.__data[1]=O.elements[1],B.__data[2]=O.elements[2],B.__data[3]=0,B.__data[4]=O.elements[3],B.__data[5]=O.elements[4],B.__data[6]=O.elements[5],B.__data[7]=0,B.__data[8]=O.elements[6],B.__data[9]=O.elements[7],B.__data[10]=O.elements[8],B.__data[11]=0):(O.toArray(B.__data,mt),mt+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,lt,B.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(I,N,U,q){const G=I.value,P=N+"_"+U;if(q[P]===void 0)return typeof G=="number"||typeof G=="boolean"?q[P]=G:q[P]=G.clone(),!0;{const K=q[P];if(typeof G=="number"||typeof G=="boolean"){if(K!==G)return q[P]=G,!0}else if(K.equals(G)===!1)return K.copy(G),!0}return!1}function R(I){const N=I.uniforms;let U=0;const q=16;for(let P=0,K=N.length;P<K;P++){const T=Array.isArray(N[P])?N[P]:[N[P]];for(let b=0,B=T.length;b<B;b++){const lt=T[b],rt=Array.isArray(lt.value)?lt.value:[lt.value];for(let mt=0,gt=rt.length;mt<gt;mt++){const O=rt[mt],Q=w(O),Z=U%q,xt=Z%Q.boundary,Tt=Z+xt;U+=xt,Tt!==0&&q-Tt<Q.storage&&(U+=q-Tt),lt.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),lt.__offset=U,U+=Q.storage}}}const G=U%q;return G>0&&(U+=q-G),I.__size=U,I.__cache={},this}function w(I){const N={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(N.boundary=4,N.storage=4):I.isVector2?(N.boundary=8,N.storage=8):I.isVector3||I.isColor?(N.boundary=16,N.storage=12):I.isVector4?(N.boundary=16,N.storage=16):I.isMatrix3?(N.boundary=48,N.storage=48):I.isMatrix4?(N.boundary=64,N.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),N}function x(I){const N=I.target;N.removeEventListener("dispose",x);const U=h.indexOf(N.__bindingPointIndex);h.splice(U,1),o.deleteBuffer(l[N.id]),delete l[N.id],delete c[N.id]}function v(){for(const I in l)o.deleteBuffer(l[I]);h=[],l={},c={}}return{bind:m,update:p,dispose:v}}class c1{constructor(t={}){const{canvas:i=Hx(),context:s=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:S=!1,reverseDepthBuffer:y=!1}=t;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const R=new Uint32Array(4),w=new Int32Array(4);let x=null,v=null;const I=[],N=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pi,this.toneMapping=Wa,this.toneMappingExposure=1;const U=this;let q=!1,G=0,P=0,K=null,T=-1,b=null;const B=new $e,lt=new $e;let rt=null;const mt=new ue(0);let gt=0,O=i.width,Q=i.height,Z=1,xt=null,Tt=null;const L=new $e(0,0,O,Q),nt=new $e(0,0,O,Q);let yt=!1;const Y=new qd;let ct=!1,Et=!1;const St=new Ze,Gt=new Ze,Ft=new j,ne=new $e,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function qe(){return K===null?Z:1}let F=s;function An(C,k){return i.getContext(C,k)}try{const C={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:S};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Bd}`),i.addEventListener("webglcontextlost",_t,!1),i.addEventListener("webglcontextrestored",Rt,!1),i.addEventListener("webglcontextcreationerror",Dt,!1),F===null){const k="webgl2";if(F=An(k,C),F===null)throw An(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let fe,_e,qt,Ue,Wt,D,A,et,ft,Mt,dt,kt,Ct,zt,ve,bt,Bt,Yt,Xt,Nt,Jt,ae,Pe,V;function At(){fe=new vb(F),fe.init(),ae=new t1(F,fe),_e=new hb(F,fe,t,ae),qt=new JA(F,fe),_e.reverseDepthBuffer&&y&&qt.buffers.depth.setReversed(!0),Ue=new xb(F),Wt=new FA,D=new $A(F,fe,qt,Wt,_e,ae,Ue),A=new pb(U),et=new _b(U),ft=new CM(F),Pe=new ub(F,ft),Mt=new Sb(F,ft,Ue,Pe),dt=new Eb(F,Mt,ft,Ue),Xt=new Mb(F,_e,D),bt=new db(Wt),kt=new IA(U,A,et,fe,_e,Pe,bt),Ct=new o1(U,Wt),zt=new GA,ve=new YA(fe),Yt=new cb(U,A,et,qt,dt,M,m),Bt=new KA(U,dt,_e),V=new l1(F,Ue,_e,qt),Nt=new fb(F,fe,Ue),Jt=new yb(F,fe,Ue),Ue.programs=kt.programs,U.capabilities=_e,U.extensions=fe,U.properties=Wt,U.renderLists=zt,U.shadowMap=Bt,U.state=qt,U.info=Ue}At();const ot=new s1(U,F);this.xr=ot,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const C=fe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=fe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(C){C!==void 0&&(Z=C,this.setSize(O,Q,!1))},this.getSize=function(C){return C.set(O,Q)},this.setSize=function(C,k,it=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,Q=k,i.width=Math.floor(C*Z),i.height=Math.floor(k*Z),it===!0&&(i.style.width=C+"px",i.style.height=k+"px"),this.setViewport(0,0,C,k)},this.getDrawingBufferSize=function(C){return C.set(O*Z,Q*Z).floor()},this.setDrawingBufferSize=function(C,k,it){O=C,Q=k,Z=it,i.width=Math.floor(C*it),i.height=Math.floor(k*it),this.setViewport(0,0,C,k)},this.getCurrentViewport=function(C){return C.copy(B)},this.getViewport=function(C){return C.copy(L)},this.setViewport=function(C,k,it,at){C.isVector4?L.set(C.x,C.y,C.z,C.w):L.set(C,k,it,at),qt.viewport(B.copy(L).multiplyScalar(Z).round())},this.getScissor=function(C){return C.copy(nt)},this.setScissor=function(C,k,it,at){C.isVector4?nt.set(C.x,C.y,C.z,C.w):nt.set(C,k,it,at),qt.scissor(lt.copy(nt).multiplyScalar(Z).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(C){qt.setScissorTest(yt=C)},this.setOpaqueSort=function(C){xt=C},this.setTransparentSort=function(C){Tt=C},this.getClearColor=function(C){return C.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(C=!0,k=!0,it=!0){let at=0;if(C){let X=!1;if(K!==null){const vt=K.texture.format;X=vt===kd||vt===Vd||vt===Gd}if(X){const vt=K.texture.type,Ut=vt===ha||vt===As||vt===Vo||vt===Or||vt===Fd||vt===Hd,Pt=Yt.getClearColor(),Ot=Yt.getClearAlpha(),Kt=Pt.r,te=Pt.g,jt=Pt.b;Ut?(R[0]=Kt,R[1]=te,R[2]=jt,R[3]=Ot,F.clearBufferuiv(F.COLOR,0,R)):(w[0]=Kt,w[1]=te,w[2]=jt,w[3]=Ot,F.clearBufferiv(F.COLOR,0,w))}else at|=F.COLOR_BUFFER_BIT}k&&(at|=F.DEPTH_BUFFER_BIT),it&&(at|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_t,!1),i.removeEventListener("webglcontextrestored",Rt,!1),i.removeEventListener("webglcontextcreationerror",Dt,!1),Yt.dispose(),zt.dispose(),ve.dispose(),Wt.dispose(),A.dispose(),et.dispose(),dt.dispose(),Pe.dispose(),V.dispose(),kt.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Hr),ot.removeEventListener("sessionend",Gr),Ci.stop()};function _t(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const C=Ue.autoReset,k=Bt.enabled,it=Bt.autoUpdate,at=Bt.needsUpdate,X=Bt.type;At(),Ue.autoReset=C,Bt.enabled=k,Bt.autoUpdate=it,Bt.needsUpdate=at,Bt.type=X}function Dt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function $t(C){const k=C.target;k.removeEventListener("dispose",$t),Ye(k)}function Ye(C){un(C),Wt.remove(C)}function un(C){const k=Wt.get(C).programs;k!==void 0&&(k.forEach(function(it){kt.releaseProgram(it)}),C.isShaderMaterial&&kt.releaseShaderCache(C))}this.renderBufferDirect=function(C,k,it,at,X,vt){k===null&&(k=Oe);const Ut=X.isMesh&&X.matrixWorld.determinant()<0,Pt=kr(C,k,it,at,X);qt.setMaterial(at,Ut);let Ot=it.index,Kt=1;if(at.wireframe===!0){if(Ot=Mt.getWireframeAttribute(it),Ot===void 0)return;Kt=2}const te=it.drawRange,jt=it.attributes.position;let Se=te.start*Kt,be=(te.start+te.count)*Kt;vt!==null&&(Se=Math.max(Se,vt.start*Kt),be=Math.min(be,(vt.start+vt.count)*Kt)),Ot!==null?(Se=Math.max(Se,0),be=Math.min(be,Ot.count)):jt!=null&&(Se=Math.max(Se,0),be=Math.min(be,jt.count));const ke=be-Se;if(ke<0||ke===1/0)return;Pe.setup(X,at,Pt,it,Ot);let Ge,se=Nt;if(Ot!==null&&(Ge=ft.get(Ot),se=Jt,se.setIndex(Ge)),X.isMesh)at.wireframe===!0?(qt.setLineWidth(at.wireframeLinewidth*qe()),se.setMode(F.LINES)):se.setMode(F.TRIANGLES);else if(X.isLine){let Ht=at.linewidth;Ht===void 0&&(Ht=1),qt.setLineWidth(Ht*qe()),X.isLineSegments?se.setMode(F.LINES):X.isLineLoop?se.setMode(F.LINE_LOOP):se.setMode(F.LINE_STRIP)}else X.isPoints?se.setMode(F.POINTS):X.isSprite&&se.setMode(F.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)se.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(fe.get("WEBGL_multi_draw"))se.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Ht=X._multiDrawStarts,an=X._multiDrawCounts,Ae=X._multiDrawCount,Ln=Ot?ft.get(Ot).bytesPerElement:1,Fi=Wt.get(at).currentProgram.getUniforms();for(let gn=0;gn<Ae;gn++)Fi.setValue(F,"_gl_DrawID",gn),se.render(Ht[gn]/Ln,an[gn])}else if(X.isInstancedMesh)se.renderInstances(Se,ke,X.count);else if(it.isInstancedBufferGeometry){const Ht=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,an=Math.min(it.instanceCount,Ht);se.renderInstances(Se,ke,an)}else se.render(Se,ke)};function Ee(C,k,it){C.transparent===!0&&C.side===Ti&&C.forceSinglePass===!1?(C.side=qn,C.needsUpdate=!0,Ke(C,k,it),C.side=qa,C.needsUpdate=!0,Ke(C,k,it),C.side=Ti):Ke(C,k,it)}this.compile=function(C,k,it=null){it===null&&(it=C),v=ve.get(it),v.init(k),N.push(v),it.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),C!==it&&C.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights();const at=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const vt=X.material;if(vt)if(Array.isArray(vt))for(let Ut=0;Ut<vt.length;Ut++){const Pt=vt[Ut];Ee(Pt,it,X),at.add(Pt)}else Ee(vt,it,X),at.add(vt)}),N.pop(),v=null,at},this.compileAsync=function(C,k,it=null){const at=this.compile(C,k,it);return new Promise(X=>{function vt(){if(at.forEach(function(Ut){Wt.get(Ut).currentProgram.isReady()&&at.delete(Ut)}),at.size===0){X(C);return}setTimeout(vt,10)}fe.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let yn=null;function gi(C){yn&&yn(C)}function Hr(){Ci.stop()}function Gr(){Ci.start()}const Ci=new Av;Ci.setAnimationLoop(gi),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(C){yn=C,ot.setAnimationLoop(C),C===null?Ci.stop():Ci.start()},ot.addEventListener("sessionstart",Hr),ot.addEventListener("sessionend",Gr),this.render=function(C,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(k),k=ot.getCamera()),C.isScene===!0&&C.onBeforeRender(U,C,k,K),v=ve.get(C,N.length),v.init(k),N.push(v),Gt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Y.setFromProjectionMatrix(Gt),Et=this.localClippingEnabled,ct=bt.init(this.clippingPlanes,Et),x=zt.get(C,I.length),x.init(),I.push(x),ot.enabled===!0&&ot.isPresenting===!0){const vt=U.xr.getDepthSensingMesh();vt!==null&&Za(vt,k,-1/0,U.sortObjects)}Za(C,k,0,U.sortObjects),x.finish(),U.sortObjects===!0&&x.sort(xt,Tt),he=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,he&&Yt.addToRenderList(x,C),this.info.render.frame++,ct===!0&&bt.beginShadows();const it=v.state.shadowsArray;Bt.render(it,C,k),ct===!0&&bt.endShadows(),this.info.autoReset===!0&&this.info.reset();const at=x.opaque,X=x.transmissive;if(v.setupLights(),k.isArrayCamera){const vt=k.cameras;if(X.length>0)for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++){const Ot=vt[Ut];Vr(at,X,C,Ot)}he&&Yt.render(C);for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++){const Ot=vt[Ut];Ds(x,C,Ot,Ot.viewport)}}else X.length>0&&Vr(at,X,C,k),he&&Yt.render(C),Ds(x,C,k);K!==null&&(D.updateMultisampleRenderTarget(K),D.updateRenderTargetMipmap(K)),C.isScene===!0&&C.onAfterRender(U,C,k),Pe.resetDefaultState(),T=-1,b=null,N.pop(),N.length>0?(v=N[N.length-1],ct===!0&&bt.setGlobalState(U.clippingPlanes,v.state.camera)):v=null,I.pop(),I.length>0?x=I[I.length-1]:x=null};function Za(C,k,it,at){if(C.visible===!1)return;if(C.layers.test(k.layers)){if(C.isGroup)it=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(k);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){at&&ne.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Gt);const Ut=dt.update(C),Pt=C.material;Pt.visible&&x.push(C,Ut,Pt,it,ne.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){const Ut=dt.update(C),Pt=C.material;if(at&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ne.copy(C.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ne.copy(Ut.boundingSphere.center)),ne.applyMatrix4(C.matrixWorld).applyMatrix4(Gt)),Array.isArray(Pt)){const Ot=Ut.groups;for(let Kt=0,te=Ot.length;Kt<te;Kt++){const jt=Ot[Kt],Se=Pt[jt.materialIndex];Se&&Se.visible&&x.push(C,Ut,Se,it,ne.z,jt)}}else Pt.visible&&x.push(C,Ut,Pt,it,ne.z,null)}}const vt=C.children;for(let Ut=0,Pt=vt.length;Ut<Pt;Ut++)Za(vt[Ut],k,it,at)}function Ds(C,k,it,at){const X=C.opaque,vt=C.transmissive,Ut=C.transparent;v.setupLightsView(it),ct===!0&&bt.setGlobalState(U.clippingPlanes,it),at&&qt.viewport(B.copy(at)),X.length>0&&Ka(X,k,it),vt.length>0&&Ka(vt,k,it),Ut.length>0&&Ka(Ut,k,it),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function Vr(C,k,it,at){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[at.id]===void 0&&(v.state.transmissionRenderTarget[at.id]=new Rs(1,1,{generateMipmaps:!0,type:fe.has("EXT_color_buffer_half_float")||fe.has("EXT_color_buffer_float")?ko:ha,minFilter:bs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace}));const vt=v.state.transmissionRenderTarget[at.id],Ut=at.viewport||B;vt.setSize(Ut.z,Ut.w);const Pt=U.getRenderTarget();U.setRenderTarget(vt),U.getClearColor(mt),gt=U.getClearAlpha(),gt<1&&U.setClearColor(16777215,.5),U.clear(),he&&Yt.render(it);const Ot=U.toneMapping;U.toneMapping=Wa;const Kt=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),v.setupLightsView(at),ct===!0&&bt.setGlobalState(U.clippingPlanes,at),Ka(C,it,at),D.updateMultisampleRenderTarget(vt),D.updateRenderTargetMipmap(vt),fe.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let jt=0,Se=k.length;jt<Se;jt++){const be=k[jt],ke=be.object,Ge=be.geometry,se=be.material,Ht=be.group;if(se.side===Ti&&ke.layers.test(at.layers)){const an=se.side;se.side=qn,se.needsUpdate=!0,_i(ke,it,at,Ge,se,Ht),se.side=an,se.needsUpdate=!0,te=!0}}te===!0&&(D.updateMultisampleRenderTarget(vt),D.updateRenderTargetMipmap(vt))}U.setRenderTarget(Pt),U.setClearColor(mt,gt),Kt!==void 0&&(at.viewport=Kt),U.toneMapping=Ot}function Ka(C,k,it){const at=k.isScene===!0?k.overrideMaterial:null;for(let X=0,vt=C.length;X<vt;X++){const Ut=C[X],Pt=Ut.object,Ot=Ut.geometry,Kt=at===null?Ut.material:at,te=Ut.group;Pt.layers.test(it.layers)&&_i(Pt,k,it,Ot,Kt,te)}}function _i(C,k,it,at,X,vt){C.onBeforeRender(U,k,it,at,X,vt),C.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(U,k,it,at,C,vt),X.transparent===!0&&X.side===Ti&&X.forceSinglePass===!1?(X.side=qn,X.needsUpdate=!0,U.renderBufferDirect(it,k,at,X,C,vt),X.side=qa,X.needsUpdate=!0,U.renderBufferDirect(it,k,at,X,C,vt),X.side=Ti):U.renderBufferDirect(it,k,at,X,C,vt),C.onAfterRender(U,k,it,at,X,vt)}function Ke(C,k,it){k.isScene!==!0&&(k=Oe);const at=Wt.get(C),X=v.state.lights,vt=v.state.shadowsArray,Ut=X.state.version,Pt=kt.getParameters(C,X.state,vt,k,it),Ot=kt.getProgramCacheKey(Pt);let Kt=at.programs;at.environment=C.isMeshStandardMaterial?k.environment:null,at.fog=k.fog,at.envMap=(C.isMeshStandardMaterial?et:A).get(C.envMap||at.environment),at.envMapRotation=at.environment!==null&&C.envMap===null?k.environmentRotation:C.envMapRotation,Kt===void 0&&(C.addEventListener("dispose",$t),Kt=new Map,at.programs=Kt);let te=Kt.get(Ot);if(te!==void 0){if(at.currentProgram===te&&at.lightsStateVersion===Ut)return Ii(C,Pt),te}else Pt.uniforms=kt.getUniforms(C),C.onBeforeCompile(Pt,U),te=kt.acquireProgram(Pt,Ot),Kt.set(Ot,te),at.uniforms=Pt.uniforms;const jt=at.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(jt.clippingPlanes=bt.uniform),Ii(C,Pt),at.needsLights=Zc(C),at.lightsStateVersion=Ut,at.needsLights&&(jt.ambientLightColor.value=X.state.ambient,jt.lightProbe.value=X.state.probe,jt.directionalLights.value=X.state.directional,jt.directionalLightShadows.value=X.state.directionalShadow,jt.spotLights.value=X.state.spot,jt.spotLightShadows.value=X.state.spotShadow,jt.rectAreaLights.value=X.state.rectArea,jt.ltc_1.value=X.state.rectAreaLTC1,jt.ltc_2.value=X.state.rectAreaLTC2,jt.pointLights.value=X.state.point,jt.pointLightShadows.value=X.state.pointShadow,jt.hemisphereLights.value=X.state.hemi,jt.directionalShadowMap.value=X.state.directionalShadowMap,jt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,jt.spotShadowMap.value=X.state.spotShadowMap,jt.spotLightMatrix.value=X.state.spotLightMatrix,jt.spotLightMap.value=X.state.spotLightMap,jt.pointShadowMap.value=X.state.pointShadowMap,jt.pointShadowMatrix.value=X.state.pointShadowMatrix),at.currentProgram=te,at.uniformsList=null,te}function xn(C){if(C.uniformsList===null){const k=C.currentProgram.getUniforms();C.uniformsList=Pc.seqWithValue(k.seq,C.uniforms)}return C.uniformsList}function Ii(C,k){const it=Wt.get(C);it.outputColorSpace=k.outputColorSpace,it.batching=k.batching,it.batchingColor=k.batchingColor,it.instancing=k.instancing,it.instancingColor=k.instancingColor,it.instancingMorph=k.instancingMorph,it.skinning=k.skinning,it.morphTargets=k.morphTargets,it.morphNormals=k.morphNormals,it.morphColors=k.morphColors,it.morphTargetsCount=k.morphTargetsCount,it.numClippingPlanes=k.numClippingPlanes,it.numIntersection=k.numClipIntersection,it.vertexAlphas=k.vertexAlphas,it.vertexTangents=k.vertexTangents,it.toneMapping=k.toneMapping}function kr(C,k,it,at,X){k.isScene!==!0&&(k=Oe),D.resetTextureUnits();const vt=k.fog,Ut=at.isMeshStandardMaterial?k.environment:null,Pt=K===null?U.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:zr,Ot=(at.isMeshStandardMaterial?et:A).get(at.envMap||Ut),Kt=at.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,te=!!it.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),jt=!!it.morphAttributes.position,Se=!!it.morphAttributes.normal,be=!!it.morphAttributes.color;let ke=Wa;at.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ke=U.toneMapping);const Ge=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,se=Ge!==void 0?Ge.length:0,Ht=Wt.get(at),an=v.state.lights;if(ct===!0&&(Et===!0||C!==b)){const fn=C===b&&at.id===T;bt.setState(at,C,fn)}let Ae=!1;at.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==an.state.version||Ht.outputColorSpace!==Pt||X.isBatchedMesh&&Ht.batching===!1||!X.isBatchedMesh&&Ht.batching===!0||X.isBatchedMesh&&Ht.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ht.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ht.instancing===!1||!X.isInstancedMesh&&Ht.instancing===!0||X.isSkinnedMesh&&Ht.skinning===!1||!X.isSkinnedMesh&&Ht.skinning===!0||X.isInstancedMesh&&Ht.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ht.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ht.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ht.instancingMorph===!1&&X.morphTexture!==null||Ht.envMap!==Ot||at.fog===!0&&Ht.fog!==vt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==bt.numPlanes||Ht.numIntersection!==bt.numIntersection)||Ht.vertexAlphas!==Kt||Ht.vertexTangents!==te||Ht.morphTargets!==jt||Ht.morphNormals!==Se||Ht.morphColors!==be||Ht.toneMapping!==ke||Ht.morphTargetsCount!==se)&&(Ae=!0):(Ae=!0,Ht.__version=at.version);let Ln=Ht.currentProgram;Ae===!0&&(Ln=Ke(at,k,X));let Fi=!1,gn=!1,Ja=!1;const de=Ln.getUniforms(),Rn=Ht.uniforms;if(qt.useProgram(Ln.program)&&(Fi=!0,gn=!0,Ja=!0),at.id!==T&&(T=at.id,gn=!0),Fi||b!==C){qt.buffers.depth.getReversed()?(St.copy(C.projectionMatrix),Vx(St),kx(St),de.setValue(F,"projectionMatrix",St)):de.setValue(F,"projectionMatrix",C.projectionMatrix),de.setValue(F,"viewMatrix",C.matrixWorldInverse);const tn=de.map.cameraPosition;tn!==void 0&&tn.setValue(F,Ft.setFromMatrixPosition(C.matrixWorld)),_e.logarithmicDepthBuffer&&de.setValue(F,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&de.setValue(F,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,gn=!0,Ja=!0)}if(X.isSkinnedMesh){de.setOptional(F,X,"bindMatrix"),de.setOptional(F,X,"bindMatrixInverse");const fn=X.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),de.setValue(F,"boneTexture",fn.boneTexture,D))}X.isBatchedMesh&&(de.setOptional(F,X,"batchingTexture"),de.setValue(F,"batchingTexture",X._matricesTexture,D),de.setOptional(F,X,"batchingIdTexture"),de.setValue(F,"batchingIdTexture",X._indirectTexture,D),de.setOptional(F,X,"batchingColorTexture"),X._colorsTexture!==null&&de.setValue(F,"batchingColorTexture",X._colorsTexture,D));const Nn=it.morphAttributes;if((Nn.position!==void 0||Nn.normal!==void 0||Nn.color!==void 0)&&Xt.update(X,it,Ln),(gn||Ht.receiveShadow!==X.receiveShadow)&&(Ht.receiveShadow=X.receiveShadow,de.setValue(F,"receiveShadow",X.receiveShadow)),at.isMeshGouraudMaterial&&at.envMap!==null&&(Rn.envMap.value=Ot,Rn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),at.isMeshStandardMaterial&&at.envMap===null&&k.environment!==null&&(Rn.envMapIntensity.value=k.environmentIntensity),gn&&(de.setValue(F,"toneMappingExposure",U.toneMappingExposure),Ht.needsLights&&jc(Rn,Ja),vt&&at.fog===!0&&Ct.refreshFogUniforms(Rn,vt),Ct.refreshMaterialUniforms(Rn,at,Z,Q,v.state.transmissionRenderTarget[C.id]),Pc.upload(F,xn(Ht),Rn,D)),at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(Pc.upload(F,xn(Ht),Rn,D),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&de.setValue(F,"center",X.center),de.setValue(F,"modelViewMatrix",X.modelViewMatrix),de.setValue(F,"normalMatrix",X.normalMatrix),de.setValue(F,"modelMatrix",X.matrixWorld),at.isShaderMaterial||at.isRawShaderMaterial){const fn=at.uniformsGroups;for(let tn=0,Us=fn.length;tn<Us;tn++){const wi=fn[tn];V.update(wi,Ln),V.bind(wi,Ln)}}return Ln}function jc(C,k){C.ambientLightColor.needsUpdate=k,C.lightProbe.needsUpdate=k,C.directionalLights.needsUpdate=k,C.directionalLightShadows.needsUpdate=k,C.pointLights.needsUpdate=k,C.pointLightShadows.needsUpdate=k,C.spotLights.needsUpdate=k,C.spotLightShadows.needsUpdate=k,C.rectAreaLights.needsUpdate=k,C.hemisphereLights.needsUpdate=k}function Zc(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(C,k,it){Wt.get(C.texture).__webglTexture=k,Wt.get(C.depthTexture).__webglTexture=it;const at=Wt.get(C);at.__hasExternalTextures=!0,at.__autoAllocateDepthBuffer=it===void 0,at.__autoAllocateDepthBuffer||fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),at.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,k){const it=Wt.get(C);it.__webglFramebuffer=k,it.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(C,k=0,it=0){K=C,G=k,P=it;let at=!0,X=null,vt=!1,Ut=!1;if(C){const Ot=Wt.get(C);if(Ot.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(F.FRAMEBUFFER,null),at=!1;else if(Ot.__webglFramebuffer===void 0)D.setupRenderTarget(C);else if(Ot.__hasExternalTextures)D.rebindTextures(C,Wt.get(C.texture).__webglTexture,Wt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const jt=C.depthTexture;if(Ot.__boundDepthTexture!==jt){if(jt!==null&&Wt.has(jt)&&(C.width!==jt.image.width||C.height!==jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(C)}}const Kt=C.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Ut=!0);const te=Wt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(te[k])?X=te[k][it]:X=te[k],vt=!0):C.samples>0&&D.useMultisampledRTT(C)===!1?X=Wt.get(C).__webglMultisampledFramebuffer:Array.isArray(te)?X=te[it]:X=te,B.copy(C.viewport),lt.copy(C.scissor),rt=C.scissorTest}else B.copy(L).multiplyScalar(Z).floor(),lt.copy(nt).multiplyScalar(Z).floor(),rt=yt;if(qt.bindFramebuffer(F.FRAMEBUFFER,X)&&at&&qt.drawBuffers(C,X),qt.viewport(B),qt.scissor(lt),qt.setScissorTest(rt),vt){const Ot=Wt.get(C.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ot.__webglTexture,it)}else if(Ut){const Ot=Wt.get(C.texture),Kt=k||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ot.__webglTexture,it||0,Kt)}T=-1},this.readRenderTargetPixels=function(C,k,it,at,X,vt,Ut){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Wt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){qt.bindFramebuffer(F.FRAMEBUFFER,Pt);try{const Ot=C.texture,Kt=Ot.format,te=Ot.type;if(!_e.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=C.width-at&&it>=0&&it<=C.height-X&&F.readPixels(k,it,at,X,ae.convert(Kt),ae.convert(te),vt)}finally{const Ot=K!==null?Wt.get(K).__webglFramebuffer:null;qt.bindFramebuffer(F.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(C,k,it,at,X,vt,Ut){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Wt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ut!==void 0&&(Pt=Pt[Ut]),Pt){const Ot=C.texture,Kt=Ot.format,te=Ot.type;if(!_e.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=C.width-at&&it>=0&&it<=C.height-X){qt.bindFramebuffer(F.FRAMEBUFFER,Pt);const jt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.bufferData(F.PIXEL_PACK_BUFFER,vt.byteLength,F.STREAM_READ),F.readPixels(k,it,at,X,ae.convert(Kt),ae.convert(te),0);const Se=K!==null?Wt.get(K).__webglFramebuffer:null;qt.bindFramebuffer(F.FRAMEBUFFER,Se);const be=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Gx(F,be,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,jt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,vt),F.deleteBuffer(jt),F.deleteSync(be),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,k=null,it=0){C.isTexture!==!0&&(Tr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,C=arguments[1]);const at=Math.pow(2,-it),X=Math.floor(C.image.width*at),vt=Math.floor(C.image.height*at),Ut=k!==null?k.x:0,Pt=k!==null?k.y:0;D.setTexture2D(C,0),F.copyTexSubImage2D(F.TEXTURE_2D,it,0,0,Ut,Pt,X,vt),qt.unbindTexture()};const qo=F.createFramebuffer(),Qa=F.createFramebuffer();this.copyTextureToTexture=function(C,k,it=null,at=null,X=0,vt=null){C.isTexture!==!0&&(Tr("WebGLRenderer: copyTextureToTexture function signature has changed."),at=arguments[0]||null,C=arguments[1],k=arguments[2],vt=arguments[3]||0,it=null),vt===null&&(X!==0?(Tr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=X,X=0):vt=0);let Ut,Pt,Ot,Kt,te,jt,Se,be,ke;const Ge=C.isCompressedTexture?C.mipmaps[vt]:C.image;if(it!==null)Ut=it.max.x-it.min.x,Pt=it.max.y-it.min.y,Ot=it.isBox3?it.max.z-it.min.z:1,Kt=it.min.x,te=it.min.y,jt=it.isBox3?it.min.z:0;else{const Nn=Math.pow(2,-X);Ut=Math.floor(Ge.width*Nn),Pt=Math.floor(Ge.height*Nn),C.isDataArrayTexture?Ot=Ge.depth:C.isData3DTexture?Ot=Math.floor(Ge.depth*Nn):Ot=1,Kt=0,te=0,jt=0}at!==null?(Se=at.x,be=at.y,ke=at.z):(Se=0,be=0,ke=0);const se=ae.convert(k.format),Ht=ae.convert(k.type);let an;k.isData3DTexture?(D.setTexture3D(k,0),an=F.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(D.setTexture2DArray(k,0),an=F.TEXTURE_2D_ARRAY):(D.setTexture2D(k,0),an=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,k.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,k.unpackAlignment);const Ae=F.getParameter(F.UNPACK_ROW_LENGTH),Ln=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Fi=F.getParameter(F.UNPACK_SKIP_PIXELS),gn=F.getParameter(F.UNPACK_SKIP_ROWS),Ja=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ge.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ge.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Kt),F.pixelStorei(F.UNPACK_SKIP_ROWS,te),F.pixelStorei(F.UNPACK_SKIP_IMAGES,jt);const de=C.isDataArrayTexture||C.isData3DTexture,Rn=k.isDataArrayTexture||k.isData3DTexture;if(C.isDepthTexture){const Nn=Wt.get(C),fn=Wt.get(k),tn=Wt.get(Nn.__renderTarget),Us=Wt.get(fn.__renderTarget);qt.bindFramebuffer(F.READ_FRAMEBUFFER,tn.__webglFramebuffer),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Us.__webglFramebuffer);for(let wi=0;wi<Ot;wi++)de&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wt.get(C).__webglTexture,X,jt+wi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Wt.get(k).__webglTexture,vt,ke+wi)),F.blitFramebuffer(Kt,te,Ut,Pt,Se,be,Ut,Pt,F.DEPTH_BUFFER_BIT,F.NEAREST);qt.bindFramebuffer(F.READ_FRAMEBUFFER,null),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(X!==0||C.isRenderTargetTexture||Wt.has(C)){const Nn=Wt.get(C),fn=Wt.get(k);qt.bindFramebuffer(F.READ_FRAMEBUFFER,qo),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Qa);for(let tn=0;tn<Ot;tn++)de?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Nn.__webglTexture,X,jt+tn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Nn.__webglTexture,X),Rn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,fn.__webglTexture,vt,ke+tn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,fn.__webglTexture,vt),X!==0?F.blitFramebuffer(Kt,te,Ut,Pt,Se,be,Ut,Pt,F.COLOR_BUFFER_BIT,F.NEAREST):Rn?F.copyTexSubImage3D(an,vt,Se,be,ke+tn,Kt,te,Ut,Pt):F.copyTexSubImage2D(an,vt,Se,be,Kt,te,Ut,Pt);qt.bindFramebuffer(F.READ_FRAMEBUFFER,null),qt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Rn?C.isDataTexture||C.isData3DTexture?F.texSubImage3D(an,vt,Se,be,ke,Ut,Pt,Ot,se,Ht,Ge.data):k.isCompressedArrayTexture?F.compressedTexSubImage3D(an,vt,Se,be,ke,Ut,Pt,Ot,se,Ge.data):F.texSubImage3D(an,vt,Se,be,ke,Ut,Pt,Ot,se,Ht,Ge):C.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,vt,Se,be,Ut,Pt,se,Ht,Ge.data):C.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,vt,Se,be,Ge.width,Ge.height,se,Ge.data):F.texSubImage2D(F.TEXTURE_2D,vt,Se,be,Ut,Pt,se,Ht,Ge);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ae),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ln),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Fi),F.pixelStorei(F.UNPACK_SKIP_ROWS,gn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ja),vt===0&&k.generateMipmaps&&F.generateMipmap(an),qt.unbindTexture()},this.copyTextureToTexture3D=function(C,k,it=null,at=null,X=0){return C.isTexture!==!0&&(Tr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),it=arguments[0]||null,at=arguments[1]||null,C=arguments[2],k=arguments[3],X=arguments[4]||0),Tr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,k,it,at,X)},this.initRenderTarget=function(C){Wt.get(C).__webglFramebuffer===void 0&&D.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?D.setTextureCube(C,0):C.isData3DTexture?D.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?D.setTexture2DArray(C,0):D.setTexture2D(C,0),qt.unbindTexture()},this.resetState=function(){G=0,P=0,K=null,qt.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ua}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorspace=we._getDrawingBufferColorSpace(t),i.unpackColorSpace=we._getUnpackColorSpace()}}const X0={type:"change"},Zd={type:"start"},Uv={type:"end"},Rc=new Wc,W0=new Oi,u1=Math.cos(70*Fx.DEG2RAD),dn=new j,Xn=2*Math.PI,He={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fh=1e-6;class f1 extends AM{constructor(t,i=null){super(t,i),this.state=He.NONE,this.enabled=!0,this.target=new j,this.cursor=new j,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rr.ROTATE,MIDDLE:Rr.DOLLY,RIGHT:Rr.PAN},this.touches={ONE:br.ROTATE,TWO:br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new j,this._lastQuaternion=new da,this._lastTargetPosition=new j,this._quat=new da().setFromUnitVectors(t.up,new j(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new v0,this._sphericalDelta=new v0,this._scale=1,this._panOffset=new j,this._rotateStart=new ie,this._rotateEnd=new ie,this._rotateDelta=new ie,this._panStart=new ie,this._panEnd=new ie,this._panDelta=new ie,this._dollyStart=new ie,this._dollyEnd=new ie,this._dollyDelta=new ie,this._dollyDirection=new j,this._mouse=new ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=d1.bind(this),this._onPointerDown=h1.bind(this),this._onPointerUp=p1.bind(this),this._onContextMenu=x1.bind(this),this._onMouseWheel=_1.bind(this),this._onKeyDown=v1.bind(this),this._onTouchStart=S1.bind(this),this._onTouchMove=y1.bind(this),this._onMouseDown=m1.bind(this),this._onMouseMove=g1.bind(this),this._interceptControlDown=M1.bind(this),this._interceptControlUp=E1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(X0),this.update(),this.state=He.NONE}update(t=null){const i=this.object.position;dn.copy(i).sub(this.target),dn.applyQuaternion(this._quat),this._spherical.setFromVector3(dn),this.autoRotate&&this.state===He.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Xn:s>Math.PI&&(s-=Xn),l<-Math.PI?l+=Xn:l>Math.PI&&(l-=Xn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=h!=this._spherical.radius}if(dn.setFromSpherical(this._spherical),dn.applyQuaternion(this._quatInverse),i.copy(this.target).add(dn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=dn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new j(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new j(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=dn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Rc.origin.copy(this.object.position),Rc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Rc.direction))<u1?this.object.lookAt(this.target):(W0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Rc.intersectPlane(W0,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>Fh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fh||this._lastTargetPosition.distanceToSquared(this.target)>Fh?(this.dispatchEvent(X0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Xn/60*this.autoRotateSpeed*t:Xn/60/60*this.autoRotateSpeed}_getZoomScale(t){const i=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,i){dn.setFromMatrixColumn(i,0),dn.multiplyScalar(-t),this._panOffset.add(dn)}_panUp(t,i){this.screenSpacePanning===!0?dn.setFromMatrixColumn(i,1):(dn.setFromMatrixColumn(i,0),dn.crossVectors(this.object.up,dn)),dn.multiplyScalar(t),this._panOffset.add(dn)}_pan(t,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;dn.copy(l).sub(this.target);let c=dn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=t-s.left,c=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Xn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Xn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let i=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Xn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Xn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Xn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Xn*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),l=.5*(t.pageX+s.x),c=.5*(t.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Xn*this._rotateDelta.x/i.clientHeight),this._rotateUp(Xn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),l=.5*(t.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const i=this._getSecondPointerPosition(t),s=t.pageX-i.x,l=t.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(t.pageX+i.x)*.5,d=(t.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(t){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==t.pointerId)return!0;return!1}_trackPointer(t){let i=this._pointerPositions[t.pointerId];i===void 0&&(i=new ie,this._pointerPositions[t.pointerId]=i),i.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const i=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(t){const i=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function h1(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function d1(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function p1(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Uv),this.state=He.NONE;break;case 1:const t=this._pointers[0],i=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:i.x,pageY:i.y});break}}function m1(o){let t;switch(o.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=He.DOLLY;break;case Rr.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=He.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=He.ROTATE}break;case Rr.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=He.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=He.PAN}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(Zd)}function g1(o){switch(this.state){case He.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case He.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case He.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function _1(o){this.enabled===!1||this.enableZoom===!1||this.state!==He.NONE||(o.preventDefault(),this.dispatchEvent(Zd),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Uv))}function v1(o){this.enabled!==!1&&this._handleKeyDown(o)}function S1(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case br.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=He.TOUCH_ROTATE;break;case br.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=He.TOUCH_PAN;break;default:this.state=He.NONE}break;case 2:switch(this.touches.TWO){case br.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=He.TOUCH_DOLLY_PAN;break;case br.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=He.TOUCH_DOLLY_ROTATE;break;default:this.state=He.NONE}break;default:this.state=He.NONE}this.state!==He.NONE&&this.dispatchEvent(Zd)}function y1(o){switch(this._trackPointer(o),this.state){case He.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case He.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case He.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case He.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=He.NONE}}function x1(o){this.enabled!==!1&&o.preventDefault()}function M1(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function E1(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Lv="/vex-build-center/";async function T1(){const o=await fetch(`${Lv}parts/manifest.json`,{cache:"force-cache"});if(!o.ok)throw new Error("Could not load the parts library.");return o.json()}function Hh(o){const t=atob(o),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}const q0=new Map;function Gh(o){const t=q0.get(o.id);if(t)return t;const i=(async()=>{if(o.primitive==="box"){const[c,h,d]=o.sizeMM,m=new Ir(c,h,d);return m.computeBoundingBox(),m}const s=await(await fetch(`${Lv}parts/${o.id}.json`,{cache:"force-cache"})).json(),l=new ai;return l.setAttribute("position",new zn(new Float32Array(Hh(s.position).buffer),3)),s.normal&&l.setAttribute("normal",new zn(new Float32Array(Hh(s.normal).buffer),3)),l.setIndex(new zn(new Uint32Array(Hh(s.index).buffer),1)),s.normal||l.computeVertexNormals(),l.computeBoundingBox(),l})();return q0.set(o.id,i),i}const Vh={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"},b1={beam:"Beams",plate:"Plates",pin:"Pins",standoff:"Standoffs",corner:"Corners",gear:"Gears",wheel:"Wheels",shaft:"Shafts",spacer:"Spacers",motor:"Motors",brain:"Brain & Battery",sensor:"Sensors"},A1=["beam","plate","corner","pin","standoff","gear","wheel","shaft","spacer","motor","sensor","brain"],Nv=12.7,Ho=[[1,0,0],[0,1,0],[0,0,1]],R1=["beam","plate","standoff","corner","gear","wheel"];function C1(o){return R1.includes(o.category)}const kh=o=>Math.max(1,Math.round(o/Nv)),Xh=(o,t)=>(o-(t-1)/2)*Nv;function w1(o){const t=o.sizeMM,i=[0,1,2].sort((m,p)=>t[m]-t[p]),s=i[0],l=i[1],c=i[2],h=[],d=(m,p)=>{const _=[0,0,0];return _[m]=p,_};if(o.category==="beam"){const m=kh(t[c]);for(let p=0;p<m;p++)h.push({p:d(c,Xh(p,m)),axis:Ho[s]})}else if(o.category==="plate"||o.category==="corner"){const m=kh(t[c]),p=kh(t[l]);for(let _=0;_<m;_++)for(let S=0;S<p;S++){const y=[0,0,0];y[c]=Xh(_,m),y[l]=Xh(S,p),h.push({p:y,axis:Ho[s]})}}else if(o.category==="standoff"){const m=t[c]/2;h.push({p:d(c,-m),axis:Ho[c]}),h.push({p:d(c,m),axis:Ho[c]})}else(o.category==="gear"||o.category==="wheel")&&h.push({p:[0,0,0],axis:Ho[s]});return h}const Ov=12.7,Vc=Ov/2,Cc=o=>Math.round(o/Vc)*Vc;let Wh=1;class D1{constructor(t){Te(this,"scene",new hM);Te(this,"camera");Te(this,"renderer");Te(this,"controls");Te(this,"onChange",()=>{});Te(this,"onConnect",()=>{});Te(this,"container");Te(this,"raycaster",new EM);Te(this,"pointer",new ie);Te(this,"parts",new Map);Te(this,"selected",null);Te(this,"helper",null);Te(this,"markers",[]);Te(this,"discGeo",new Yd(4.3,24));Te(this,"markerMat",new Fc({color:1614079,transparent:!0,opacity:.5,depthTest:!1,side:Ti}));Te(this,"markerHotMat",new Fc({color:16756768,transparent:!0,opacity:.9,depthTest:!1,side:Ti}));Te(this,"hovered",null);Te(this,"markersVisible",!0);Te(this,"connectFrom",null);Te(this,"connectLine");Te(this,"movedDuringDrag",!1);Te(this,"ground");Te(this,"dragging",!1);Te(this,"dragPlane",new Oi);Te(this,"dragOffset",new j);Te(this,"hit",new j);Te(this,"raf",0);Te(this,"ro");Te(this,"onPointerDown",t=>{if(t.button!==0)return;if(this.setPointer(t),this.markersVisible){const l=this.raycaster.intersectObjects(this.markers,!1);if(l.length){this.connectFrom=l[0].object,this.movedDuringDrag=!1,this.controls.enabled=!1,this.setHot(this.connectFrom,!0),this.connectLine.visible=!0,this.updateConnectLine(this.worldOf(this.connectFrom)),t.stopPropagation();return}}const i=[...this.parts.values()].map(l=>l.mesh),s=this.raycaster.intersectObjects(i,!1);if(s.length){const l=this.parts.get(s[0].object.userData.uid)||null;this.select(l),this.dragging=!0,this.controls.enabled=!1,this.dragPlane.setFromNormalAndCoplanarPoint(new j(0,1,0),s[0].point),this.dragOffset.copy(s[0].point).sub(l.mesh.position),t.stopPropagation(),this.emit()}else this.selected&&(this.select(null),this.emit())});Te(this,"onPointerMove",t=>{var i,s;if(this.setPointer(t),this.connectFrom){this.movedDuringDrag=!0;const l=this.markerUnderPointer(this.connectFrom);l!==this.hovered&&(this.hovered&&this.hovered!==this.connectFrom&&this.setHot(this.hovered,!1),this.hovered=l,l&&this.setHot(l,!0));const c=this.worldOf(this.connectFrom);this.updateConnectLine(c,l?this.worldOf(l):this.pointerOnPlane(c));return}if(this.dragging&&this.selected){this.raycaster.ray.intersectPlane(this.dragPlane,this.hit)&&(this.selected.mesh.position.x=Cc(this.hit.x-this.dragOffset.x),this.selected.mesh.position.z=Cc(this.hit.z-this.dragOffset.z),this.selected.mesh.updateMatrixWorld(!0),(i=this.helper)==null||i.update());return}if(this.markersVisible){const l=((s=this.raycaster.intersectObjects(this.markers,!1)[0])==null?void 0:s.object)||null;l!==this.hovered&&(this.hovered&&this.setHot(this.hovered,!1),this.hovered=l,l&&this.setHot(l,!0))}});Te(this,"onPointerUp",t=>{if(this.connectFrom){const i=this.connectFrom.userData.holeRef,s=this.hovered&&this.hovered!==this.connectFrom?this.hovered:null,l=s?s.userData.holeRef:null,c=l&&l.partUid!==i.partUid?l:null;this.setHot(this.connectFrom,!1),this.hovered&&this.setHot(this.hovered,!1),this.connectLine.visible=!1,this.controls.enabled=!0;const h=!this.movedDuringDrag;this.connectFrom=null,this.hovered=null,(c||h)&&this.onConnect({from:i,to:c,screen:{x:t.clientX,y:t.clientY}});return}this.dragging&&(this.dragging=!1,this.controls.enabled=!0,this.emit())});Te(this,"animate",()=>{this.raf=requestAnimationFrame(this.animate),this.controls.update(),this.renderer.render(this.scene,this.camera)});this.container=t;const i=t.clientWidth||800,s=t.clientHeight||600;this.scene.background=new ue("#eaeef4"),this.scene.fog=new Wd(15396596,900,2e3),this.camera=new mi(45,i/s,1,6e3),this.camera.position.set(220,190,260),this.renderer=new c1({antialias:!0}),this.renderer.setSize(i,s),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Q0,t.appendChild(this.renderer.domElement),this.controls=new f1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.target.set(0,25,0),this.controls.maxPolarAngle=Math.PI*.495,this.controls.minDistance=60,this.controls.maxDistance=1600,this.scene.add(new vM(16777215,10135478,.85));const l=new xM(16777215,1.15);l.position.set(160,260,180),l.castShadow=!0,l.shadow.mapSize.set(2048,2048);const c=l.shadow.camera;c.near=10,c.far=900,c.left=-350,c.right=350,c.top=350,c.bottom=-350,l.shadow.bias=-5e-4,this.scene.add(l);const h=Ov*48,d=new TM(h,48,11122374,13687010);d.material.transparent=!0,d.material.opacity=.75,this.scene.add(d),this.ground=new Wn(new Wo(h,h),new mM({opacity:.16})),this.ground.rotation.x=-Math.PI/2,this.ground.receiveShadow=!0,this.ground.name="ground",this.scene.add(this.ground),this.connectLine=new xv(new ai().setFromPoints([new j,new j]),new qc({color:16756768,transparent:!0,opacity:.9,depthTest:!1})),this.connectLine.visible=!1,this.connectLine.renderOrder=999,this.scene.add(this.connectLine),this.renderer.domElement.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.ro=new ResizeObserver(()=>this.resize()),this.ro.observe(t),this.animate()}async addPart(t){const i=await Gh(t),s=t.color||Vh[t.category]||"#6b7787",l=new Dh({color:s,metalness:.18,roughness:.55}),c=new Wn(i,l);c.castShadow=!0,c.receiveShadow=!0;const h=`p${Wh++}`;c.userData.uid=h;const d=this.parts.size%4*Vc;c.position.set(Cc(this.controls.target.x)+d,0,Cc(this.controls.target.z)+d),this.restOnGrid(c),this.scene.add(c);const m={uid:h,meta:t,mesh:c};this.parts.set(h,m),this.addMarkers(m),this.select(m),this.emit()}restOnGrid(t){t.updateMatrixWorld(!0);const i=t.geometry.boundingBox.clone().applyMatrix4(t.matrixWorld);t.position.y+=-i.min.y,t.position.y=Math.max(0,t.position.y),t.updateMatrixWorld(!0)}addMarkers(t){if(!C1(t.meta))return;const i=new j(0,0,1);w1(t.meta).forEach((s,l)=>{const c=new Wn(this.discGeo,this.markerMat);c.position.set(s.p[0],s.p[1],s.p[2]),c.quaternion.setFromUnitVectors(i,new j(s.axis[0],s.axis[1],s.axis[2]).normalize()),c.renderOrder=998,c.visible=this.markersVisible,c.userData.holeRef={partUid:t.uid,holeIndex:l},t.mesh.add(c),this.markers.push(c)})}setMarkersVisible(t){this.markersVisible=t;for(const i of this.markers)i.visible=t}select(t){this.selected=t,this.helper&&(this.scene.remove(this.helper),this.helper.geometry.dispose(),this.helper=null),t&&(this.helper=new bM(t.mesh,new ue("#ffb020")),this.helper.material.linewidth=2,this.scene.add(this.helper))}selectByUid(t){this.select(t&&this.parts.get(t)||null),this.emit()}rotateSelected(t){var s;if(!this.selected)return;const i=new da().setFromAxisAngle(new j(t==="x"?1:0,t==="y"?1:0,t==="z"?1:0),Math.PI/2);this.selected.mesh.quaternion.premultiply(i),this.restOnGrid(this.selected.mesh),(s=this.helper)==null||s.update(),this.emit()}nudgeSelectedY(t){var i;this.selected&&(this.selected.mesh.position.y=Math.max(0,this.selected.mesh.position.y+t*Vc),this.selected.mesh.updateMatrixWorld(!0),(i=this.helper)==null||i.update(),this.emit())}deleteSelected(){this.selected&&(this.removePart(this.selected),this.select(null),this.emit())}removePart(t){this.markers=this.markers.filter(i=>i.userData.holeRef.partUid!==t.uid),this.scene.remove(t.mesh),t.mesh.material.dispose(),this.parts.delete(t.uid)}clear(){for(const t of[...this.parts.values()])this.removePart(t);this.select(null),this.emit()}serialize(){return[...this.parts.values()].map(t=>({id:t.meta.id,p:[t.mesh.position.x,t.mesh.position.y,t.mesh.position.z],q:[t.mesh.quaternion.x,t.mesh.quaternion.y,t.mesh.quaternion.z,t.mesh.quaternion.w]}))}async load(t,i){this.clear();for(const s of t){const l=i.get(s.id);if(!l)continue;const c=await Gh(l),h=l.color||Vh[l.category]||"#6b7787",d=new Wn(c,new Dh({color:h,metalness:.18,roughness:.55}));d.castShadow=d.receiveShadow=!0;const m=`p${Wh++}`;d.userData.uid=m,d.position.set(s.p[0],s.p[1],s.p[2]),d.quaternion.set(s.q[0],s.q[1],s.q[2],s.q[3]),d.updateMatrixWorld(!0),this.scene.add(d);const p={uid:m,meta:l,mesh:d};this.parts.set(m,p),this.addMarkers(p)}this.select(null),this.emit()}computeState(){var l,c;const t=new Ya;let i=0;for(const h of this.parts.values())h.mesh.updateMatrixWorld(!0),h.mesh.geometry.boundingBox&&t.union(h.mesh.geometry.boundingBox.clone().applyMatrix4(h.mesh.matrixWorld)),h.meta.isMotor&&i++;const s=this.parts.size?t.getSize(new j):new j;return{count:this.parts.size,selectedUid:((l=this.selected)==null?void 0:l.uid)??null,selectedName:((c=this.selected)==null?void 0:c.meta.name)??null,bboxMM:{w:+s.x.toFixed(1),h:+s.y.toFixed(1),d:+s.z.toFixed(1)},motors:i}}emit(){var t;(t=this.helper)==null||t.update(),this.onChange(this.computeState())}setPointer(t){const i=this.renderer.domElement.getBoundingClientRect();this.pointer.set((t.clientX-i.left)/i.width*2-1,-((t.clientY-i.top)/i.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera)}worldOf(t){return t.getWorldPosition(new j)}axisOf(t){return t.getWorldDirection(new j).normalize()}setHot(t,i){t.material=i?this.markerHotMat:this.markerMat,t.scale.setScalar(i?1.5:1)}markerFor(t){return this.markers.find(i=>{const s=i.userData.holeRef;return s.partUid===t.partUid&&s.holeIndex===t.holeIndex})||null}markerUnderPointer(t){for(const i of this.raycaster.intersectObjects(this.markers,!1))if(i.object!==t)return i.object;return null}pointerOnPlane(t){const i=this.camera.getWorldDirection(new j).negate(),s=new Oi().setFromNormalAndCoplanarPoint(i,t),l=new j;return this.raycaster.ray.intersectPlane(s,l)?l:t.clone()}updateConnectLine(t,i){const s=this.connectLine.geometry.attributes.position,l=i||t;s.setXYZ(0,t.x,t.y,t.z),s.setXYZ(1,l.x,l.y,l.z),s.needsUpdate=!0}extentAlong(t,i){const s=t.mesh.geometry.boundingBox.clone().applyMatrix4(t.mesh.matrixWorld).getSize(new j);return Math.abs(s.x*i.x)+Math.abs(s.y*i.y)+Math.abs(s.z*i.z)}longAxis(t){const i=t.sizeMM,s=i[0]>=i[1]&&i[0]>=i[2]?0:i[1]>=i[2]?1:2;return new j(s===0?1:0,s===1?1:0,s===2?1:0)}async connect(t,i,s){const l=this.markerFor(t);if(!l)return;const c=this.parts.get(t.partUid);if(!c)return;const h=this.worldOf(l),d=this.axisOf(l);if(i){const m=this.markerFor(i),p=this.parts.get(i.partUid);if(m&&p){const _=this.axisOf(m);p.mesh.quaternion.premultiply(new da().setFromUnitVectors(_,d)),p.mesh.updateMatrixWorld(!0);const S=(this.extentAlong(c,d)+this.extentAlong(p,d))/2,y=h.clone().add(d.clone().multiplyScalar(S));p.mesh.position.add(y.sub(this.worldOf(m))),p.mesh.updateMatrixWorld(!0),await this.placeConnector(s,h.clone().add(d.clone().multiplyScalar(S/2)),d),this.select(p),this.emit();return}}await this.placeConnector(s,h,d),this.emit()}async placeConnector(t,i,s){const l=await Gh(t),c=new Wn(l,new Dh({color:Vh[t.category]||"#e0a13a",metalness:.2,roughness:.5}));c.castShadow=c.receiveShadow=!0;const h=`p${Wh++}`;c.userData.uid=h,c.quaternion.setFromUnitVectors(this.longAxis(t),s),c.position.copy(i),c.updateMatrixWorld(!0),this.scene.add(c);const d={uid:h,meta:t,mesh:c};this.parts.set(h,d),this.addMarkers(d)}resize(){const t=this.container.clientWidth,i=this.container.clientHeight;!t||!i||(this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,i))}frameAll(){if(!this.parts.size){this.camera.position.set(220,190,260),this.controls.target.set(0,25,0);return}const t=new Ya;for(const l of this.parts.values())t.expandByObject(l.mesh);const i=t.getCenter(new j),s=t.getSize(new j).length()*.6+60;this.controls.target.copy(i),this.camera.position.set(i.x+s,i.y+s*.8,i.z+s)}dispose(){cancelAnimationFrame(this.raf);const t=this.renderer.domElement;t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),this.ro.disconnect(),this.controls.dispose(),this.renderer.dispose(),t.remove()}}const U1=25.4,Y0="utg_vex_build",qh=o=>+(o/U1).toFixed(1),j0={w:11,h:15,d:11,motors:6};function L1(){const o=Un.useRef(null),t=Un.useRef(null),[i,s]=Un.useState(null),[l,c]=Un.useState({count:0,selectedUid:null,selectedName:null,bboxMM:{w:0,h:0,d:0},motors:0}),[h,d]=Un.useState(()=>{try{return{...j0,...JSON.parse(localStorage.getItem("utg_vex_limits")||"{}")}}catch{return j0}}),[m,p]=Un.useState("Loading parts…"),[_,S]=Un.useState(""),[y,M]=Un.useState(null),R=Un.useMemo(()=>new Map(((i==null?void 0:i.parts)||[]).map(T=>[T.id,T])),[i]);Un.useEffect(()=>{T1().then(s).catch(()=>S("The parts library failed to load."))},[]),Un.useEffect(()=>{if(!i||!o.current)return;const T=new D1(o.current);return T.onChange=c,T.onConnect=M,t.current=T,p("Pick a part on the left to start building."),()=>{T.dispose(),t.current=null}},[i]),Un.useEffect(()=>{localStorage.setItem("utg_vex_limits",JSON.stringify(h))},[h]),Un.useEffect(()=>{const T=b=>{var lt;const B=t.current;B&&((lt=b.target)==null?void 0:lt.tagName)!=="INPUT"&&(b.key==="Delete"||b.key==="Backspace"?(b.preventDefault(),B.deleteSelected()):b.key==="r"||b.key==="R"?B.rotateSelected("y"):b.key==="x"||b.key==="X"?B.rotateSelected("x"):b.key==="z"||b.key==="Z"?B.rotateSelected("z"):b.key==="]"?B.nudgeSelectedY(1):b.key==="["?B.nudgeSelectedY(-1):b.key==="f"||b.key==="F"?B.frameAll():b.key==="Escape"&&B.selectByUid(null))};return window.addEventListener("keydown",T),()=>window.removeEventListener("keydown",T)},[]);function w(T){var b;(b=t.current)==null||b.addPart(T),p(`Added ${T.name}. Drag to move · R to rotate · Del to remove.`)}function x(){var b;const T=((b=t.current)==null?void 0:b.serialize())||[];localStorage.setItem(Y0,JSON.stringify(T)),p(`Saved your build (${T.length} parts) to this device.`)}async function v(){var T,b;try{const B=JSON.parse(localStorage.getItem(Y0)||"[]");if(!B.length){p("No saved build on this device yet.");return}await((T=t.current)==null?void 0:T.load(B,R)),(b=t.current)==null||b.frameAll(),p(`Loaded your saved build (${B.length} parts).`)}catch{p("That saved build could not be opened.")}}function I(){var T;confirm("Clear the whole build?")&&((T=t.current)==null||T.clear(),p("Cleared. Start a new build."))}const N=Un.useMemo(()=>{const T=new Map;for(const b of(i==null?void 0:i.parts)||[]){const B=T.get(b.category)||[];B.push(b),T.set(b.category,B)}return A1.filter(b=>T.has(b)).map(b=>({category:b,parts:T.get(b)}))},[i]),U=Un.useMemo(()=>((i==null?void 0:i.parts)||[]).filter(T=>T.category==="pin"||T.category==="shaft"||T.category==="standoff"),[i]),q={w:qh(l.bboxMM.w),h:qh(l.bboxMM.h),d:qh(l.bboxMM.d)},G={w:q.w>h.w,h:q.h>h.h,d:q.d>h.d,motors:l.motors>h.motors},P=G.w||G.h||G.d||G.motors,K=!!l.selectedUid;return _?wt.jsx("main",{className:"shell",children:wt.jsx("div",{className:"fatal",children:_})}):wt.jsxs("main",{className:"shell",children:[wt.jsxs("header",{className:"topbar",children:[wt.jsxs("a",{className:"brand",href:"../",children:[wt.jsx("img",{src:"https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg",alt:"UTG Academy"}),wt.jsx("span",{children:"VEX Build Center"})]}),wt.jsx("div",{className:`legality ${P?"bad":"good"}`,children:l.count?P?"Over the limits":"Within the limits":"Empty build"})]}),wt.jsxs("div",{className:"workspace",children:[wt.jsxs("aside",{className:"palette",children:[wt.jsx("h2",{children:"Parts"}),!i&&wt.jsx("p",{className:"muted",children:"Loading…"}),N.map(T=>wt.jsxs("section",{className:"pal-group",children:[wt.jsx("h3",{children:b1[T.category]}),wt.jsx("div",{className:"pal-grid",children:T.parts.map(b=>wt.jsxs("button",{className:"pal-item",onClick:()=>w(b),title:b.name,children:[wt.jsx("span",{className:"pal-swatch",style:{background:Z0(b)}}),wt.jsx("span",{className:"pal-name",children:b.name})]},b.id))})]},T.category))]}),wt.jsxs("div",{className:"stage",children:[wt.jsx("div",{className:"canvas-host",ref:o}),wt.jsx("div",{className:"stage-hint",children:"Drag between hole dots to connect · click a hole for a connector · drag a part to move · scroll to zoom"})]}),wt.jsxs("aside",{className:"inspector",children:[wt.jsxs("section",{className:"card",children:[wt.jsx("h3",{children:"Robot size"}),wt.jsxs("div",{className:"dims",children:[wt.jsx(Yh,{label:"Width",mm:l.bboxMM.w,inV:q.w,limit:h.w,over:G.w,onLimit:T=>d({...h,w:T})}),wt.jsx(Yh,{label:"Height",mm:l.bboxMM.h,inV:q.h,limit:h.h,over:G.h,onLimit:T=>d({...h,h:T})}),wt.jsx(Yh,{label:"Depth",mm:l.bboxMM.d,inV:q.d,limit:h.d,over:G.d,onLimit:T=>d({...h,d:T})})]}),wt.jsx("p",{className:"muted small",children:"Limits are in inches — set them to your season's rules."})]}),wt.jsxs("section",{className:"card",children:[wt.jsx("h3",{children:"Motors"}),wt.jsxs("div",{className:`motor-row ${G.motors?"over":""}`,children:[wt.jsx("span",{className:"motor-count",children:l.motors}),wt.jsx("span",{className:"muted",children:"of"}),wt.jsx("input",{type:"number",min:0,value:h.motors,onChange:T=>d({...h,motors:Math.max(0,+T.target.value||0)})}),wt.jsx("span",{className:"muted",children:"max"})]})]}),wt.jsxs("section",{className:"card",children:[wt.jsx("h3",{children:"Selected part"}),K?wt.jsxs(wt.Fragment,{children:[wt.jsx("p",{className:"sel-name",children:l.selectedName}),wt.jsxs("div",{className:"btn-row",children:[wt.jsx("button",{onClick:()=>{var T;return(T=t.current)==null?void 0:T.rotateSelected("x")},children:"Rotate X"}),wt.jsx("button",{onClick:()=>{var T;return(T=t.current)==null?void 0:T.rotateSelected("y")},children:"Rotate Y"}),wt.jsx("button",{onClick:()=>{var T;return(T=t.current)==null?void 0:T.rotateSelected("z")},children:"Rotate Z"})]}),wt.jsxs("div",{className:"btn-row",children:[wt.jsx("button",{onClick:()=>{var T;return(T=t.current)==null?void 0:T.nudgeSelectedY(1)},children:"Raise"}),wt.jsx("button",{onClick:()=>{var T;return(T=t.current)==null?void 0:T.nudgeSelectedY(-1)},children:"Lower"}),wt.jsx("button",{className:"danger",onClick:()=>{var T;return(T=t.current)==null?void 0:T.deleteSelected()},children:"Delete"})]})]}):wt.jsx("p",{className:"muted small",children:"Click a part in the scene to select it."})]}),wt.jsxs("section",{className:"card",children:[wt.jsxs("h3",{children:["Build · ",l.count," parts"]}),wt.jsxs("div",{className:"btn-row",children:[wt.jsx("button",{onClick:x,children:"Save"}),wt.jsx("button",{onClick:v,children:"Load"}),wt.jsx("button",{onClick:()=>{var T;return(T=t.current)==null?void 0:T.frameAll()},children:"Fit view"})]}),wt.jsx("div",{className:"btn-row",children:wt.jsx("button",{className:"danger",onClick:I,children:"Clear all"})})]})]})]}),y&&wt.jsxs(wt.Fragment,{children:[wt.jsx("div",{className:"picker-scrim",onClick:()=>M(null)}),wt.jsxs("div",{className:"picker",style:{left:Math.min(y.screen.x,window.innerWidth-210),top:Math.min(y.screen.y,window.innerHeight-260)},children:[wt.jsx("div",{className:"picker-head",children:y.to?"Connect the two holes with…":"Put in this hole…"}),wt.jsx("div",{className:"picker-grid",children:U.map(T=>wt.jsxs("button",{className:"picker-item",onClick:()=>{var b;(b=t.current)==null||b.connect(y.from,y.to,T),M(null),p(`Placed ${T.name}.`)},children:[wt.jsx("span",{className:"pal-swatch",style:{background:Z0(T)}}),T.name]},T.id))})]})]}),wt.jsx("footer",{className:"statusbar",children:m})]})}function Yh({label:o,mm:t,inV:i,limit:s,over:l,onLimit:c}){return wt.jsxs("div",{className:`dim ${l?"over":""}`,children:[wt.jsx("span",{className:"dim-label",children:o}),wt.jsxs("span",{className:"dim-val",children:[i,wt.jsx("small",{children:"in"})," ",wt.jsxs("span",{className:"muted",children:["/ ",t,"mm"]})]}),wt.jsxs("label",{className:"dim-limit",children:["≤ ",wt.jsx("input",{type:"number",min:0,step:.5,value:s,onChange:h=>c(Math.max(0,+h.target.value||0))})," in"]})]})}function Z0(o){const t={beam:"#2f6fb0",plate:"#3f8fd0",pin:"#e0a13a",standoff:"#8a94a6",corner:"#356fa8",gear:"#c85c3c",wheel:"#2b2f36",shaft:"#9aa3b0",spacer:"#b9c0cb",motor:"#2b7de0",brain:"#3a3f47",sensor:"#7a5cc0"};return o.color||t[o.category]||"#6b7787"}Qy.createRoot(document.getElementById("root")).render(wt.jsx(Un.StrictMode,{children:wt.jsx(L1,{})}));
