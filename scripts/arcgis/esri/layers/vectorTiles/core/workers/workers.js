// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/workers/workers","require exports dojo/Deferred dojo/promise/all ../promiseUtils ./Connection ./JobProxy".split(" "),function(B,g,r,t,n,u,v){function w(a,b){for(var c=[],f=0;f<e.length;f++)c.push(e[f].openConnection(a,b));return t(c).then(function(a){})}function x(a){h[a]=!0;if(!l&&h.every(function(a){return a})){for(var b in k)(a=m[b])&&k[b].resolve(a);k={};l=!0}}function y(a){var b=z++;a=new u(a,b);var c=new r;m[b]=a;l?c.resolve(a):k[b]=c;return c.promise}Object.defineProperty(g,
"__esModule",{value:!0});var A=Math.max((navigator.hardwareConcurrency||2)-1,2),l=!1,e=[],h=[],p=0,z=0,m={},k={},q=!1;g.open=function(a,b){if(!1===q){for(var c=0;c<A;++c){var f=new v(m,c,x);e.push(f);h.push(!1)}q=!0}return y(a).then(function(a){return w(b,a.id).then(function(){return a}).otherwise(function(a){return n.reject(a)})})};g.terminate=function(){for(var a=0;a<e.length;a++)e[a].terminate();e=[];h=[];l=!1};g.closeConnection=function(a){if(a)if(m[a.id]&&delete m[a.id],l)for(var b=0;b<e.length;b++)e[b].closeConnection(a.id);
else if(b=k[a.id])b.promise.cancel(),delete k[a.id]};g.invoke=function(a,b,c,f,g){var d=null;f&&(d=f.id);if(null===d&&(d=p=(p+1)%e.length,!h[d]&&!e.some(function(a,b,c){d=(d+1)%c.length;return h[d]})))return n.reject(Error("No worker available"));a=e[d].invoke(a,b,c,g);f&&(f.id=d);return a};g.broadcast=function(a,b,c,f){for(var g=[],d=0;d<e.length;d++)h[d]&&g.push(e[d].invoke(a,b,c,f));return g}});