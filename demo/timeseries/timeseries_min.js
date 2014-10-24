function drawViz(){totalCount=lBarCount+hBarCount+h2BarCount;cp=bw;cw=bw*totalCount+cp*4;svgw=cw+labelw;xScale=d3.scale.linear().domain([0,1]).rangeRound([0,bw]);yScale=d3.scale.linear().rangeRound([0,ch-cp]);ytScale=d3.scale.linear().rangeRound([0,th-tcp]);d3.select("#viz").selectAll(".feed").remove();var e=d3.select("#viz").selectAll(".feed").data(_DATA,function(e){return e.dspId}).enter().append("div").attr("class","feed").append("svg").attr("width",svgw).attr("height",function(e){return e.statuses.length*ch+th+cp+tcp}).call(drawIntervalGrid).call(drawFeedLabels);e.append("g").attr("class","totals").attr("transform",function(e,t){return"translate("+cp+","+tcp+")"}).each(drawTotals).call(drawTotalsLabels);var t=e.selectAll(".status").data(function(e){return e.statuses});t.enter().append("g").attr("class","status").attr("transform",function(e,t){return"translate("+cp+","+(t*ch+th+tcp)+")"}).each(drawStatus).call(drawStatusLabels);e.append("g").attr("class","mouseeventbars").attr("transform",function(e,t){return"translate("+cp+","+tcp+")"}).each(drawMouseEventBars);update=true}function drawStatusLabels(){var e=this,t=cw+50,n=ch/2+2,r=function(e,t){return e.values[e.values.length-1].count},i=function(e,t){return e.values[e.values.length-1].stale},s=function(e,t){return cColorScale(e.values[e.values.length-1].count)},o=function(e,t){return sColorScale(e.values[e.values.length-1].count)};e.append("text").attr("class","status-label").attr("text-anchor","start").attr("x",t).attr("y",n).attr("dx",".5em").attr("dy","-.2em").attr("fill",s).text(function(e,t){return e.name});e.append("text").attr("class","count-label").attr("text-anchor","end").attr("x",t).attr("y",n).attr("fill",s).text(r);e.append("text").attr("class","stale-label").attr("text-anchor","end").attr("x",t).attr("y",n).attr("dy","1em").attr("fill",o).text(i);e.append("text").attr("class","stale-threshold-label").attr("text-anchor","start").attr("x",t).attr("y",n).attr("dx",".5em").attr("dy","1.45em").attr("fill",o).text("32m +")}function drawTotalsLabels(){var e=this,t=cw+50,n=th/2+6,r=function(e,t){return tColorScale(e.totals[e.totals.length-1].count)};e.append("text").attr("class","totals-label").attr("text-anchor","start").attr("x",t).attr("y",n).attr("dx",".5em").attr("dy",".5em").attr("fill",r).text("Total");e.append("text").attr("class","totals-count-label").attr("text-anchor","end").attr("x",t).attr("y",n).attr("dy",".4em").attr("fill",r).text(function(e,t){return e.totals[e.totals.length-1].count})}function drawFeedLabels(){var e=this;e.append("text").attr("class","feed-name-label").attr("text-anchor","start").attr("x",cw+10).attr("y",15).text(function(e){return e.feedNm});e.append("text").attr("class","feed-timestamp-label").attr("text-anchor","start").attr("x",cw+10).attr("y",15).attr("dy","1.3em").text(dateFmt(new Date))}function drawIntervalGrid(e){var t=this,n=function(e){return e.statuses.length*ch+th+tcp+cp},r=cp-bw/2-vLineComp,i=bw*h2BarCount+bw/2-vLineComp+cp,s=bw*(h2BarCount+hBarCount)+bw/2-vLineComp+cp,o=cw-cp/2-vLineComp,u=i/2,a=s-(s-i)/2,f=o-(o-s)/2;t.append("line").attr("stroke-dasharray","1,1").attr("x1",r).attr("y1",0).attr("x2",r).attr("y2",n);t.append("line").attr("stroke-dasharray","1,1").attr("x1",i).attr("y1",0).attr("x2",i).attr("y2",n);t.append("line").attr("stroke-dasharray","1,1").attr("x1",s).attr("y1",0).attr("x2",s).attr("y2",n);t.append("line").attr("stroke-dasharray","1,1").attr("x1",o).attr("y1",0).attr("x2",o).attr("y2",n);t.append("line").attr("x1",cp).attr("y1",tcp/2).attr("x2",i-cp/2).attr("y2",tcp/2);t.append("line").attr("x1",i+cp/2).attr("y1",tcp/2).attr("x2",s-cp/2).attr("y2",tcp/2);t.append("line").attr("x1",s+cp/2).attr("y1",tcp/2).attr("x2",o-cp/2).attr("y2",tcp/2);t.append("rect").attr("class","label-bg").attr("x",u-40).attr("y",0).attr("width",80).attr("height",tcp);t.append("rect").attr("class","label-bg").attr("x",a-40).attr("y",0).attr("width",80).attr("height",tcp);t.append("rect").attr("class","label-bg").attr("x",f-40).attr("y",0).attr("width",80).attr("height",tcp);t.append("text").attr("class","int-label").attr("text-anchor","middle").attr("x",u).attr("y",tcp/2).attr("dy",".35em").text("Prior "+h2BarCount+"h (2h)");t.append("text").attr("class","int-label").attr("text-anchor","middle").attr("x",a).attr("y",tcp/2).attr("dy",".35em").text("Past "+hBarCount+"(1h)");t.append("text").attr("class","int-label").attr("text-anchor","middle").attr("x",f).attr("y",tcp/2).attr("dy",".3em").text("Past "+lBarCount+"m (1m)")}function drawTotals(e){var t=d3.select(this);ytScale.domain([d3.min(e.totals,function(e){return e.count}),d3.max(e.totals,function(e){return e.count})]);t.selectAll(".block").data(e.totals,function(e){return e.time}).enter().append("rect").attr("class","block").style("fill",function(e){return tColorScale(e.count)}).attr("y",function(e){return th-ytScale(e.count)}).attr("width",bw-bp).attr("height",tbh).call(xpos)}function drawStatus(e){var t=d3.select(this);yScale.domain([0,d3.max(e.values,function(e){return e.count})]);cColorScale.domain([50,75]);sColorScale.domain([50,75]);t.selectAll(".c-bar").data(e.values,function(e){return e.time}).enter().append("rect").attr("class","c-bar").style("fill",function(e){return cColorScale(e.count)}).attr("y",function(e){return ch-yScale(e.count)-.5}).attr("width",bw-bp).attr("height",function(e){return yScale(e.count)}).call(xpos);t.selectAll(".s-bar").data(e.values,function(e){return e.time}).enter().append("rect").attr("class","s-bar").style("fill",function(e){return sColorScale(e.count)}).attr("y",function(e){return ch-yScale(e.stale)-.5}).attr("width",bw-bp).attr("height",function(e){return yScale(e.stale)}).call(xpos)}function drawMouseEventBars(e){var t=d3.select(this),n=th+e.statuses.length*ch;t.selectAll(".bar").data(e.totals).enter().append("rect").attr("class","bar").attr("width",bw-bp).attr("height",n).on("mouseover",onMouseOver).on("mouseout",onMouseOut).call(xpos)}function onMouseOver(e,t){var n=d3.select(this.parentNode.parentNode),r=n.selectAll(".status"),i=n.select(".totals"),s=function(e){return cColorScale(e.values[t].count)},o=function(e){return sColorScale(e.values[t].count)},u=function(e){return tColorScale(e.totals[t].count)};update=false;d3.select(this).classed("highlight",true);r.select(".count-label").attr("fill",s).text(function(e){return e.values[t].count});r.select(".stale-label").attr("fill",o).text(function(e){return e.values[t].stale});r.select(".status-label").attr("fill",s);r.select(".stale-threshold-label").attr("fill",o);i.select(".totals-label").attr("fill",u);i.select(".totals-count-label").attr("fill",u).text(function(e){return e.totals[t].count});n.select(".feed-timestamp-label").text(function(e){return e.totals[t].date})}function onMouseOut(e){d3.select(this).classed("highlight",false);update=true}function updateViz(){var e=d3.selectAll(".feed").data(_DATA,function(e){return e.dspId});e.call(updateFeedLabels);e.select(".totals").each(updateTotals).call(updateTotalslabels);e.selectAll(".status").data(function(e){return e.statuses}).each(updateStatus).call(updateStatusLabels)}function updateFeedLabels(){var e=this;e.select(".feed-timestamp-label").text(this.datum().timestamp)}function updateTotals(e){var t=d3.select(this);ytScale.domain([d3.min(e.totals,function(e){return e.count}),d3.max(e.totals,function(e){return e.count})]);t.selectAll(".block").data(e.totals).style("fill",function(e){return tColorScale(e.count)}).attr("y",function(e){return th-ytScale(e.count)})}function updateTotalslabels(){var e=this,t=function(e,t){return tColorScale(e.totals[e.totals.length-1].count)};e.select(".totals-label").attr("fill",t);e.select(".totals-count-label").attr("fill",t).text(function(e,t){return e.totals[e.totals.length-1].count})}function updateStatus(e){var t=d3.select(this);yScale.domain([0,d3.max(e.values,function(e){return e.count})]);cColorScale.domain([50,75]);sColorScale.domain([50,75]);t.selectAll(".c-bar").data(e.values).style("fill",function(e){return cColorScale(e.count)}).attr("y",function(e){return ch-yScale(e.count)-.5}).attr("height",function(e){return yScale(e.count)});t.selectAll(".s-bar").data(e.values).style("fill",function(e){return sColorScale(e.count)}).attr("y",function(e){return ch-yScale(e.stale)-.5}).attr("height",function(e){return yScale(e.stale)})}function updateStatusLabels(){var e=this,t=function(e,t){return e.values[e.values.length-1].count},n=function(e,t){return e.values[e.values.length-1].stale},r=function(e,t){return cColorScale(e.values[e.values.length-1].count)},i=function(e,t){return sColorScale(e.values[e.values.length-1].count)};e.select(".status-label").attr("fill",r);e.select(".stale-threshold-label").attr("fill",i);e.select(".count-label").attr("fill",r).text(t);e.select(".stale-label").attr("fill",i).text(n)}function xpos(e){this.attr("x",function(e,t){var n=0;if(t>h2BarCount-1){n=bw}if(t>h2BarCount+hBarCount-2){n=bw*2}return xScale(t)-.5+n})}function makeData(e){_DATA=[];config.forEach(function(t,n,r){var i={dspId:t.dspId,feedNm:t.feedNm,timestamp:dateFmt(new Date),totals:d3.range(e).map(nextTotal),statuses:[]};t.statuses.forEach(function(t){var n={key:t.statusId,name:t.statusNm,values:d3.range(e).map(nextValue)};i.statuses.push(n)});_DATA.push(i)})}function nextTotal(){return{time:t++,date:dateFmt(new Date),count:ts=~~Math.max(10,Math.min(90,ts+5*(Math.random()-.5)))}}function nextValue(){return{time:t++,count:cs=~~Math.max(10,Math.min(90,cs+6*(Math.random()-.45))),stale:ss=~~Math.max(0,Math.min(20,ss+4*(Math.random()-.45)))}}function startUpdate(){updateTimer=setInterval(function(){if(update){_DATA.forEach(function(e,t,n){var r=nextTotal();e.timestamp=dateFmt(new Date);e.totals.shift();e.totals.push(r);e.statuses.forEach(function(e){var t=nextValue();e.values.shift();e.values.push(t)})});updateViz()}},refreshTime)}$.browser.chrome=/chrom(e|ium)/.test(navigator.userAgent.toLowerCase());var refreshTime=2500,update=false,updateTimer,t=1297110663,ts=70,cs=70,ss=1,_DATA=[],lBarCount=60,hBarCount=24,h2BarCount=24,totalCount=lBarCount+hBarCount+h2BarCount,tcp=12,th=50,ch=50,bp=$.browser.chrome?1:2,vLineComp=$.browser.chrome?1:2,tbh=3,labelw=200,bw=6,cp,cw,svgw,xScale,yScale,ytScale,tColorScale=d3.scale.threshold().domain([50,75]).range(["#7ED321","#F5C323","#DA581C"]),cColorScale=d3.scale.threshold().range(["#7ED321","#F5C323","#DA581C"]),sColorScale=d3.scale.threshold().range(["#528314","#B4811B","#A7411E"]),dateFmt=d3.time.format("%d-%b-%Y %X"),config=[{feedNm:"Quorra",dspId:1,statuses:[{statusId:1,statusNm:"New"},{statusId:2,statusNm:"Converting"},{statusId:3,statusNm:"Packaging"},{statusId:4,statusNm:"Packaged"},{statusId:5,statusNm:"Enqueued"}]},{feedNm:"Dillinger",dspId:2,statuses:[{statusId:1,statusNm:"New"},{statusId:2,statusNm:"Converting"},{statusId:3,statusNm:"Packaging"},{statusId:4,statusNm:"Packaged"},{statusId:5,statusNm:"Enqueued"},{statusId:7,statusNm:"Delivered"},{statusId:8,statusNm:"Hold"},{statusId:9,statusNm:"Blocked"}]},{feedNm:"Zuse",dspId:3,statuses:[{statusId:3,statusNm:"Packaging"},{statusId:4,statusNm:"Packaged"},{statusId:5,statusNm:"Enqueued"},{statusId:6,statusNm:"Delivering"},{statusId:7,statusNm:"Delivered"},{statusId:8,statusNm:"Hold"},{statusId:9,statusNm:"Blocked"}]},{feedNm:"Shaddix",dspId:4,statuses:[{statusId:1,statusNm:"New"},{statusId:2,statusNm:"Converting"},{statusId:3,statusNm:"Packaging"},{statusId:4,statusNm:"Packaged"},{statusId:5,statusNm:"Enqueued"},{statusId:6,statusNm:"Delivering"},{statusId:7,statusNm:"Delivered"}]}];$(function(){$("#update-speed-slider").slider({min:100,max:5e3,step:100,value:refreshTime,change:function(e,t){if(update){refreshTime=t.value;$("#slider-value").html(refreshTime);clearInterval(updateTimer);startUpdate()}}});$("#bar-width-spinner").spinner({min:2,max:16,step:2,numberFormat:"C",stop:function(e,t){var n=parseInt(this.value);if(n){bw=n;clearInterval(updateTimer);drawViz();startUpdate()}}});$(".count-spinner").spinner({step:2,min:20,max:150});$("#refresh-button").button().click(function(e){lBarCount=parseInt($("#1m-count-spinner").val());hBarCount=parseInt($("#1h-count-spinner").val());h2BarCount=parseInt($("#2h-count-spinner").val());totalCount=lBarCount+hBarCount+h2BarCount;makeData(totalCount);clearInterval(updateTimer);drawViz();startUpdate()})});makeData(totalCount);drawViz();startUpdate()