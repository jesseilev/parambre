(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{49:function(e,t,n){e.exports=n(90)},90:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),i=n(18),u=n(11),s=n(37),d=n(7),l=n(6),c=function(){var e="undefined"!=window&&(window.AudioContext||window.webkitAudioContext||!1);if(!e)return alert("Sorry, but the Web Audio API is not supported by your browser.Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox."),!1;var t=new e;if("suspended"===t.state&&"ontouchstart"in window){alert("I know the device is iOS and audiocontext is locked");t.resume(),alert("I have attempted to unlock the audiocontext")}return t}(),m=n(5),p=n(29),h=n(98),g=function(e,t){var n=e.offset,a=e.amp,r=e.period,o=e.phase;return n+a*Math.sin(2*Math.PI*t/r+o)},v=function(e,t){return{min:e,max:t}},f=function(e){return e.max-e.min},b=function(e,t,n){var a=(n-e.min)/f(e);return t.min+a*f(t)},y=Object(l.a)(function(e){var t=e.gain,n=e.pulseFrequency,a=e.pulseAmplitiude,r=e.pan,o=e.panPulseFrequency,i=e.panPulseMagnitude,u=Object(p.a)(e,["gain","pulseFrequency","pulseAmplitiude","pan","panPulseFrequency","panPulseMagnitude"]);return{10:Object(l.e)("output",{pan:r}),11:Object(l.c)({key:10,destination:"pan"},{gain:i}),12:Object(l.d)(11,{frequency:o,type:"square"}),0:Object(l.c)(10,{gain:t}),1:Object(l.d)(0,Object(m.a)({},u)),2:Object(l.c)({key:0,destination:"gain"},{gain:a}),3:Object(l.d)(2,{frequency:n,type:"sine"})}}),P=Object(l.a)(function(e){var t=e.rootFrequency,n=e.toneCount,a=e.overtoneAmp,r=e.overtoneModulationFreq,o=e.overtoneModulationAmp,i=Object(p.a)(e,["rootFrequency","toneCount","overtoneAmp","overtoneModulationFreq","overtoneModulationAmp"]);return h.a(1,n+1).filter(function(e){return e*t<22050}).reduce(function(e,u){var s=t*u,d=a(u)/(u*n);return e[u]=y("output",Object(m.a)({frequency:s,gain:d,pulseFrequency:r(u),pulseAmplitiude:o(u)*d,pan:2*a(u+10)-1,panPulseFrequency:r(u+10),panPulseMagnitude:o(u+10)},i)),e},{})}),A=function(e){var t=function(e){var t=e.settings.synth,n=t.attack,a=t.release,r=(t.toneCount,t.rootFrequency),o=(e.audioPlayer.audioGraph||0).currentTime,i=e.audioPlayer.isPlaying?1:0,u=e.audioPlayer.isPlaying?n:a,s=e.audioPlayer.mostRecentPlayPauseChange+u,d=o<s,c=d?"linearRampToValueAtTime":"setValueAtTime";s=d?s:o;var m=e.timbreParams,p=m.overtoneAmplitudesCurve,h=m.modulationMagnitudesCurve,v=m.modulationFrequenciesCurve,f=function(t){return P(0,{rootFrequency:t,toneCount:e.settings.synth.toneCount,overtoneAmp:function(e){return g(p,e)},overtoneModulationAmp:function(e){return g(h,e)},overtoneModulationFreq:function(e){return 1+16*g(v,e)}})};return{0:Object(l.c)("output",{gain:[c,i,s]}),1:f(1*r),3:f(12*r/5),4:f(9*r/5)}}(e);e.audioPlayer.audioGraph.update(t)},x=n(12),O=n(94),j=n(95),S=n(47),w=(n(85),function(e){return{type:"BOX_ADJUSTMENT",params:e}}),M={width:20,height:20,background:"#ddd"},C=Object(x.withSize)({monitorHeight:!0})(function(e){var t=e.xParam,n=e.yParam,a=e.widthParam,o=e.heightParam,i=e.parentSize,u=e.zIndex,s=e.paramSetName,d=e.boxBeingAdjusted,l=e.onDrag,c=e.onResize,m=e.onBoxAdjustmentStart,p=e.onBoxAdjustmentStop,h=b(t.range,v(0,i.width),t.value),g=b(n.range,v(0,i.height),n.value),f=b(a.range,v(0,i.width),a.value),y=b(o.range,v(0,i.height),o.value);return r.a.createElement(S.a,{position:{x:h-.5*f,y:g-.5*y},size:{width:f,height:y},bounds:"parent",maxWidth:.5*i.width,maxHeight:i.height,minWidth:60,minHeight:60,style:{border:"5px solid #ddd",background:"ME"===d?"rgba(0,0,0,0)":e.color,opacity:"SOMEONE_ELSE"===d?0:1,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"10px 10px 20px 2px rgba(0,0,0,0.2)",zIndex:u},onDrag:l(i,t,n),onResize:c(i,a,o),onDragStart:m(s),onDragStop:p(s),onResizeStart:m(s),onResizeStop:p(s),enableResizing:{topLeft:!0,topRight:!0,bottomLeft:!0,bottomRight:!0},resizeHandleStyles:{topLeft:M,topRight:M,bottomLeft:M,bottomRight:M}})}),q=Object(u.b)(function(e,t){var n=e.timbreParams.currentParamSetBeingAdjusted,a=null;return n===t.paramSetName?a="ME":null!==n&&(a="SOMEONE_ELSE"),{boxBeingAdjusted:a}},function(e){return{onDrag:function(t,n,a){return function(r,o){var i=b(v(0,t.width),v(0,f(n.range)),o.deltaX),u=b(v(0,t.height),v(0,f(a.range)),o.deltaY);return e(w([Object(m.a)({},n,{value:n.value+i}),Object(m.a)({},a,{value:a.value+u})]))}},onResize:function(t,n,a){return function(r,o,i,u,s){var d=b(v(0,t.width),n.range,i.clientWidth),l=b(v(0,t.height),a.range,i.clientHeight);return e(w([Object(m.a)({},n,{value:d}),Object(m.a)({},a,{value:l})]))}},onBoxAdjustmentStart:function(t){return function(){return e(function(e){return{type:"BOX_ADJUSTMENT_START",paramSetName:e}}(t))}},onBoxAdjustmentStop:function(t){return function(){return e(function(e){return{type:"BOX_ADJUSTMENT_STOP",paramSetName:e}}(t))}}}})(C),B=n(41),E=n(42),T=n(45),F=n(43),z=n(46),R=function(e){function t(e){var n;return Object(B.a)(this,t),(n=Object(T.a)(this,Object(F.a)(t).call(this,e))).canvas=r.a.createRef(),n}return Object(z.a)(t,e),Object(E.a)(t,[{key:"render",value:function(){return r.a.createElement("canvas",{width:this.props.parentSize.width,height:this.props.parentSize.height,ref:this.canvas})}},{key:"draw",value:function(){var e=this.props,t=e.overtones,n=e.isPlaying,a=e.colors,r=this.canvas.current,o=r.getContext("2d"),i=r.width/(t.length+4),u=.5*r.height,s=.05*r.width;o.clearRect(0,0,r.width,r.height),n&&t.map(function(e,t){var n=e.overtoneAmplitude,r=e.modulationMagnitude,d=e.modulationFrequency,l=(t+2+.5)*i,c=n*u+.5*u;o.lineWidth=4,o.strokeStyle=a.modulationMagnitudes,o.beginPath();var m=r*u;o.moveTo(l,c-.5*m),o.lineTo(l,c+.5*m),o.stroke(),o.lineWidth=4,o.fillStyle=a.overtoneAmplitudes,o.beginPath(),o.arc(l,c,8,2*Math.PI,!1),o.fill(),o.strokeStyle=a.modulationFrequencies,o.lineWidth=4,o.beginPath();var p=Math.max((1-d)*s,0);o.arc(l,c,p,2*Math.PI,!1),o.stroke()})}},{key:"componentDidUpdate",value:function(){this.draw()}}]),t}(a.Component),D=function(e){return h.a(1,e.settings.synth.toneCount+1).map(function(t){return{overtoneAmplitude:g(e.timbreParams.overtoneAmplitudesCurve,t),modulationMagnitude:g(e.timbreParams.modulationMagnitudesCurve,t),modulationFrequency:g(e.timbreParams.modulationFrequenciesCurve,t)}})},_=Object(u.b)(function(e){return{overtones:D(e),isPlaying:e.audioPlayer.isPlaying,colors:e.settings.colors}})(R),k=n(91),N=n(97),I=n(96),U=n(44),H=n(92),G=n(93),J={overtoneAmplitudesCurve:{ranges:{phase:v(0,18),offset:v(0,1),period:v(2,20),amp:v(0,1)}},modulationMagnitudesCurve:{ranges:{phase:v(0,18),offset:v(0,1),period:v(2,20),amp:v(0,1)}},modulationFrequenciesCurve:{ranges:{phase:v(0,18),offset:v(0,1),period:v(2,20),amp:v(0,1)}}},X=function(e){var t=function(e,t){return b(v(0,1),e,t)},n=function(e,n){return t(v(e,n),Math.random())};return{phase:t(e.phase,n(.25,.75)),offset:t(e.offset,n(.4,.6)),period:t(e.period,n(.1,.4)),amp:t(e.amp,n(.3,.8))}},L={overtoneAmplitudesCurve:X(J.overtoneAmplitudesCurve.ranges),modulationMagnitudesCurve:X(J.modulationMagnitudesCurve.ranges),modulationFrequenciesCurve:X(J.modulationFrequenciesCurve.ranges),currentParamSetBeingAdjusted:null},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"BOX_ADJUSTMENT":var n=U.a(function(e){var t=e.value,n=e.lensPath;return k.a(N.a(I.a(n),t))},t.params),a=H.a(G.a,e,n);return Object(d.d)(a,d.a.action({type:"GRAPH_UPDATE"}));case"BOX_ADJUSTMENT_START":return Object(m.a)({},e,{currentParamSetBeingAdjusted:t.paramSetName});case"BOX_ADJUSTMENT_STOP":return Object(m.a)({},e,{currentParamSetBeingAdjusted:null});default:return e}},V=function(e){var t=e.width,n=e.height;return b(t.range,v(0,1),t.value)*b(n.range,v(0,1),n.value)},Y=function(e,t){return O.a(j.a(V,e)).indexOf(t)},K=Object(x.withSize)({monitorHeight:!0})(function(e){var t=e.overtoneAmplitudesBox,n=e.modulationMagnitudesBox,a=e.modulationFrequenciesBox,o=[t,n,a];return r.a.createElement("div",{style:{width:"100%",height:"100%",borderColor:"white",borderStyle:"dashed",borderWidth:(e.isAdjustmentHappening,"0px")}},r.a.createElement(q,{parentSize:e.size,xParam:e.overtoneAmplitudesBox.x,yParam:e.overtoneAmplitudesBox.y,widthParam:e.overtoneAmplitudesBox.width,heightParam:e.overtoneAmplitudesBox.height,zIndex:Y(o,t),color:e.colors.overtoneAmplitudes,paramSetName:"overtoneAmplitudes"}),r.a.createElement(q,{parentSize:e.size,xParam:e.modulationMagnitudesBox.x,yParam:e.modulationMagnitudesBox.y,widthParam:e.modulationMagnitudesBox.width,heightParam:e.modulationMagnitudesBox.height,color:e.colors.modulationMagnitudes,paramSetName:"modulationMagnitudes",zIndex:Y(o,n)}),r.a.createElement(q,{parentSize:e.size,xParam:e.modulationFrequenciesBox.x,yParam:e.modulationFrequenciesBox.y,widthParam:e.modulationFrequenciesBox.width,heightParam:e.modulationFrequenciesBox.height,color:e.colors.modulationFrequencies,paramSetName:"modulationFrequencies",zIndex:Y(o,a)}))}),Q=Object(u.b)(function(e){var t=function(e,t,n){return{x:{value:e.phase,range:t.ranges.phase,lensPath:[n,"phase"]},y:{value:e.offset,range:t.ranges.offset,lensPath:[n,"offset"]},width:{value:e.period,range:t.ranges.period,lensPath:[n,"period"]},height:{value:e.amp,range:t.ranges.amp,lensPath:[n,"amp"]}}};return{overtoneAmplitudesBox:t(e.timbreParams.overtoneAmplitudesCurve,J.overtoneAmplitudesCurve,"overtoneAmplitudesCurve"),modulationMagnitudesBox:t(e.timbreParams.modulationMagnitudesCurve,J.modulationMagnitudesCurve,"modulationMagnitudesCurve"),modulationFrequenciesBox:t(e.timbreParams.modulationFrequenciesCurve,J.modulationFrequenciesCurve,"modulationFrequenciesCurve"),colors:e.settings.colors,isAdjustmentHappening:null!==e.timbreParams.currentParamSetBeingAdjusted}},function(e){return{}})(K),Z=Object(x.withSize)({monitorHeight:!0})(function(e){return r.a.createElement("div",{style:{width:"100%",height:"100vh",background:"#111"}},r.a.createElement(_,{parentSize:e.size}),r.a.createElement("div",{style:{position:"absolute",left:0,top:0,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}},r.a.createElement(Q,null)))}),$=Object(u.b)()(Z),ee=function(){return r.a.createElement("div",null,r.a.createElement($,null))},te=Object(l.b)({audioContext:c,output:c.destination});te.update({0:Object(l.c)("output",{gain:0})});var ne={isPlaying:!1,mostRecentPlayPauseChange:0,audioGraph:te},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=function(t){var n=Object(m.a)({},e,{isPlaying:t,mostRecentPlayPauseChange:e.audioGraph.currentTime});return Object(d.d)(n,d.a.action({type:"GRAPH_UPDATE"}))};switch((arguments.length>1?arguments[1]:void 0).type){case"TOGGLE_PLAYBACK":return t(!e.isPlaying);case"BOX_ADJUSTMENT_START":return t(!0);case"BOX_ADJUSTMENT_STOP":return t(!1);default:return e}},re=new Uint8Array,oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FFT_UPDATE":return t.frequencyData;default:return e}},ie={timbreParams:L,audioPlayer:ne,frequencyData:re,settings:Object(m.a)({},J,{colors:{overtoneAmplitudes:"#f50",modulationMagnitudes:"#309",modulationFrequencies:"#737"},synth:{attack:.5,release:3,toneCount:12,rootFrequency:150}})},ue=Object(i.c)(Object(i.a)(Object(s.ReduxEmitter)()),d.c()),se=Object(i.d)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GRAPH_UPDATE":return Object(d.d)(e,d.a.run(function(){return A(e)}));default:return Object(d.b)({timbreParams:W,audioPlayer:ae,frequencyData:oe})(e,t)}},ie,ue);Object(o.render)(r.a.createElement(u.a,{store:se},r.a.createElement(ee,null)),document.getElementById("root")),se.subscribe(function(){se.getState()})}},[[49,2,1]]]);
//# sourceMappingURL=main.3886f911.chunk.js.map