// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProviders/supportClasses/GEUtil","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/when dojox/uuid/generateRandomUuid esri/kernel esri/request esri/urlUtils esri/dijit/geoenrichment/utils/requests/UniversalClient".split(" "),function(c,g,n,k,p,q,h,r,l){function f(a,b){var c=r.urlToObject(a);if(b&&(b=g.mixin(c.query||{},b),!b.token)){var d=q.id.credentials[0];b.token=d&&d.token}return{url:c.path,taskParams:b}}function d(a,b){e||(e=new m(a));return!b||
e.initialized?e:e.initialize()}var m=c(null,{_geoenrichmentUrl:null,_geInfo:null,_capabilities:null,_supportedOperations:null,_tasksHash:{},constructor:function(a){this._geoenrichmentUrl=a},_initDfd:null,initialized:!1,initialize:function(){var a=this;if(this._initDfd)return this._initDfd.promise;this._initDfd=new n;h({url:f(this._geoenrichmentUrl).url+"/Geoenrichment",content:{f:"json"},handleAs:"json"}).then(function(b){a._geInfo=b;a._capabilities={};a._supportedOperations={};b.capabilities&&b.capabilities.forEach(function(b){a._capabilities[b.toLowerCase()]=
!0});b.supportedOperations&&b.supportedOperations.forEach(function(b){a._supportedOperations[b.toLowerCase()]=!0});a.initialized=!0;a._initDfd.resolve()});return this._initDfd.promise},hasCapability:function(a){return this._capabilities[a.toLowerCase()]},supportsOperation:function(a){return this._supportedOperations[a.toLowerCase()]},enrich:function(a){a=f(this._geoenrichmentUrl,a);a.taskParams.AddDerivativeVariables="all";return h({url:a.url+"/Geoenrichment/Enrich",content:a.taskParams,handleAs:"json"}).then(function(a){return a.results[0].value.FeatureSet||
[]})},_contriesCache:null,getCountry:function(a){this._contriesCache=this._contriesCache||{};if(!this._contriesCache[a]){var b=f(this._geoenrichmentUrl,{f:"json"});this._contriesCache[a]=h({url:b.url+"/Geoenrichment/Countries/"+a,content:b.taskParams,handleAs:"json"}).then(function(a){return a.countries[0]})}return this._contriesCache[a]},formatReport:function(a){a=f(this._geoenrichmentUrl,a);return(new l({allowSSL:!0})).send(a.url+"/Geoenrichment/FormatReport",{handleAs:"bin",content:a.taskParams}).then(function(a){return a&&
a.data&&"text/plain"===a.data.type?null:a})},createReport:function(a){var b=f(this._geoenrichmentUrl,a),c=p();this._tasksHash[c]={taskName:"createReport",taskParams:g.clone(a)};return(new l({allowSSL:!0})).send(b.url+"/Geoenrichment/createReport",{handleAs:"text",content:b.taskParams}).then(function(a){return{taskID:c,result:a}})},consumeCredits:function(a){if(a=this._tasksHash[a])return a=g.clone(a),delete a.taskParams.forStorage,this[a.taskName](a.taskParams)}});c={};c.GEClient=m;var e;c.enrich=
function(a,b){return d(a).enrich(b)};c.formatReport=function(a,b){return d(a).formatReport(b)};c.createReport=function(a,b){return d(a).createReport(b)};c.consumeCredits=function(a,b){return d(a).consumeCredits(b)};c.hasCapability=function(a,b){return k(d(a,!0),function(){return e.hasCapability(b)})};c.supportsOperation=function(a,b){return k(d(a,!0),function(){return e.supportsOperation(b)})};c.getCountry=function(a,b){return d(a).getCountry(b)};return c});