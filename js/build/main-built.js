define("time",[],function(){function e(){var e;try{e=tizen.time.getCurrentDateTime()}catch(t){console.error("Error: ",t.message)}return e}function t(e){return 10>e&&(e="0"+e),e}var n,o,i,a,r,s,l,c,d,u=0,g=0,f=!1,m=100,h=90,v="white",p=72,y=63,S=180,w=360,I=160,E="120px Arial",k="white";return{create:function(){n=document.getElementById("timeCanvas").getContext("2d"),o=document.getElementById("iconCanvas").getContext("2d")},refresh:function(){i=e(),a=i.getFullYear(),r=t(i.getDate()),s=t(i.getMonth()+1),l=t(i.getHours()),c=t(i.getMinutes()),d=t(i.getSeconds()),f||(u++,g++)},getTotalTime:function(){return u},setTotalTime:function(e){u=e},getSessionTime:function(){return g},resetSessionTime:function(){g=0},pauseUsageTracking:function(){f=!0},startUsageTracking:function(){f=!1},getTimestamp:function(){return a+"-"+s+"-"+r+"T"+l+":"+c+":"+d},getHours:function(){return l},getMinutes:function(){return c},drawDate:function(){o.clearRect(0,0,m,h),o.font="30px Arial",o.fillStyle=v,o.textAlign="center",o.fillText(r,p,y)},draw:function(){n.clearRect(0,0,w,S),n.font=E,n.fillStyle=k,n.textAlign="center",n.fillText(l+":"+c,w/2,I)}}}),define("events",["time"],function(e){var t="https://zeeguu.unibe.ch/upload_smartwatch_events",n=[],o=0;return{add:function(t,i){e.create(),n[o++]={bookmark_id:i,time:e.getTimestamp(),event:t}},save:function(){if(null!==localStorage.getItem("events")){var e=JSON.parse(localStorage.getItem("events"));console.log("currently in local storage: "+JSON.stringify(e)),console.log("saving..."),localStorage.setItem("events",JSON.stringify(e.concat(n)));var t=JSON.parse(localStorage.getItem("events"));console.log("events saved: "+JSON.stringify(t))}else console.log("currently no events in storage"),console.log("saving..."),localStorage.setItem("events",JSON.stringify(n)),console.log("events saved: "+JSON.stringify(n))},load:function(){null!==localStorage.getItem("events")&&(n=JSON.parse(localStorage.getItem("events")),console.log("loaded events: "+JSON.stringify(n)))},send:function(e){var n=new FormData,o=JSON.parse(localStorage.getItem("events"));console.log("trying to send these events:"+JSON.stringify(o)),n.append("events",JSON.stringify(o));var i=new XMLHttpRequest;i.open("POST",t+"?session="+e,!0),i.onload=function(){console.log("events uploaded to db: "+this.responseText),"OK"===this.responseText&&(console.log("removing events localStorage.."),localStorage.removeItem("events"),console.log("events in storage: "+localStorage.getItem("events")))},i.send(n)},print:function(){console.log(JSON.stringify(n))},clear:function(){n=[],o=0}}}),define("userData",["events"],function(e){function t(){for(var e="words: ",t=0;t<i.length;t++)e+=i[t].word+", ";console.log(e)}function n(){return JSON.parse(localStorage.getItem("reverse"))}var o=0,i=[],a=!1,r=5;return{setWordPair:function(e,t,n,o,a){i[e]={word:t,translation:n,id:o,context:a,timesCorrect:0}},getWordPair:function(e){return i[e]},areThereWords:function(){return i.length>0?!0:!1},updateWordPair:function(e){e?(console.log("word is correct"),i[0].timesCorrect++,i.splice(i[0].timesCorrect*r,0,i[0]),console.log("new position for word "+i[0].word+" = "+i[0].timesCorrect*r),i.splice(0,1),t()):(console.log("word is wrong"),i[0].timesCorrect=0,i.splice(r,0,i[0]),console.log("new position for word "+i[0].word+" = "+i[0].timesCorrect),i.splice(0,1),t())},getWord:function(){return n()?i[0].translation:i[0].word},removeWord:function(){return i.length>r?(i.splice(0,1),!0):!1},getTranslation:function(){return n()?i[0].word:i[0].translation},load:function(){console.log("loading userdata.."),0===localStorage.length?console.log("No user data available."):(o=localStorage.getItem("accountCode"),console.log("loaded accountCode: "+o),e.load(),null!==localStorage.getItem("wordPair")&&(i=JSON.parse(localStorage.getItem("wordPair")),console.log("loaded wordpairs: "+JSON.stringify(i))))},saveCode:function(e){o=e,localStorage.setItem("accountCode",o),console.log("accountCode saved: "+localStorage.getItem("accountCode"))},saveWordPair:function(){localStorage.setItem("wordPair",JSON.stringify(i)),console.log("wordPair saved: "+localStorage.getItem("wordPair"))},saveEvents:function(){e.print(),e.save(),e.clear()},sendEvents:function(){try{e.send(o)}catch(t){console.log("Error during sending: "+t)}},addEvent:function(t){e.add(t,i[0].id)},getCode:function(){return o},printWords:function(){console.log(JSON.stringify(i))},getReverseStatus:function(){return JSON.parse(localStorage.getItem("reverse"))},setReverseStatus:function(e){localStorage.setItem("reverse",JSON.stringify(e))},getSessionPopupShown:function(){return a},setSessionPopupShown:function(e){a=e},increaseBackgroundNumber:function(){localStorage.setItem("backgroundNumber",parseInt(localStorage.getItem("backgroundNumber"))+1)},getBackgroundNumber:function(){return parseInt(localStorage.getItem("backgroundNumber"))},setBackgroundNumber:function(e){localStorage.setItem("backgroundNumber",e)},numberOfFlashcards:function(){return r},printEvents:function(){e.print()},clear:function(){localStorage.clear()}}}),define("fireworks",[],function(){function e(e,t){return Math.random()*(t-e)+e}function t(e,t,n,o){var i=e-n,a=t-o;return Math.sqrt(Math.pow(i,2)+Math.pow(a,2))}function n(){s=[],l=[],c=document.getElementById("popupFireworksCanvas"),d=c.getContext("2d"),u=window.innerWidth,g=window.innerHeight,c.width=u,c.height=g,window.addEventListener("resize",function(){c.width=u=window.innerWidth,c.height=g=window.innerHeight}),c.addEventListener("touchmove",function(e){e.preventDefault(),h.x=e.touches.item(0).clientX,h.y=e.touches.item(0).clientY}),c.addEventListener("touchstart",function(e){e.preventDefault(),h.x=e.touches.item(0).clientX,h.y=e.touches.item(0).clientY,h.down=!0}),c.addEventListener("touchend",function(e){e.preventDefault(),h.down=!1})}function o(n,o,i,a){for(this.x=this.sx=n,this.y=this.sy=o,this.tx=i,this.ty=a,this.distanceToTarget=t(n,o,i,a),this.distanceTraveled=0,this.coordinates=[],this.coordinateCount=3;this.coordinateCount--;)this.coordinates.push([this.x,this.y]);this.angle=Math.atan2(a-o,i-n),this.speed=m.rocketSpeed,this.acceleration=m.rocketAcceleration,this.brightness=e(50,80),this.hue=v,this.targetRadius=1,this.targetDirection=!1,S++}function i(t,n){for(this.x=t,this.y=n,this.coordinates=[],this.coordinateCount=5;this.coordinateCount--;)this.coordinates.push([this.x,this.y]);this.angle=e(0,2*Math.PI),this.speed=e(1,10),this.friction=m.particleFriction,this.gravity=m.particleGravity,this.hue=e(v-20,v+20),this.brightness=e(50,80),this.alpha=1,this.decay=e(.01,.03)}function a(t,n){for(var o=Math.round(e(m.particleMinCount,m.particleMaxCount));o--;)l.push(new i(t,n))}function r(){f=window.requestAnimFrame(r),v+=.5,d.globalCompositeOperation="destination-out",d.fillStyle="rgba(0, 0, 0, 0.5)",d.fillRect(0,0,u,g),d.globalCompositeOperation="lighter";for(var t=s.length;t--;)s[t].draw(),s[t].update(t);for(t=l.length;t--;)l[t].draw(),l[t].update(t);y>=m.timerInterval?h.down||(s.push(new o(u/2,g,e(0,u),e(0,g/2))),y=0):y++,p>=m.clickLimiter?h.down&&(s.push(new o(u/2,g,h.x,h.y)),p=0):p++}var s,l,c,d,u,g,f,m={startingHue:120,clickLimiter:5,timerInterval:40,showTargets:!1,rocketSpeed:2,rocketAcceleration:1.03,particleFriction:.95,particleGravity:1,particleMinCount:5,particleMaxCount:15,particleMinRadius:3,particleMaxRadius:5},h={down:!1,x:0,y:0},v=m.startingHue,p=0,y=0,S=0;return window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),o.prototype.update=function(e){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.targetDirection?this.targetRadius>1?this.targetRadius-=.15:this.targetDirection=!1:this.targetRadius<8?this.targetRadius+=.15:this.targetDirection=!0,this.speed*=this.acceleration;var n=Math.cos(this.angle)*this.speed,o=Math.sin(this.angle)*this.speed;this.distanceTraveled=t(this.sx,this.sy,this.x+n,this.y+o),this.distanceTraveled>=this.distanceToTarget?(a(this.tx,this.ty),s.splice(e,1)):(this.x+=n,this.y+=o)},o.prototype.draw=function(){var e=this.coordinates[this.coordinates.length-1];d.beginPath(),d.moveTo(e[0],e[1]),d.lineTo(this.x,this.y),d.strokeStyle="hsl("+this.hue+",100%,"+this.brightness+"%)",d.stroke(),m.showTargets&&(d.beginPath(),d.arc(this.tx,this.ty,this.targetRadius,0,2*Math.PI),d.stroke())},i.prototype.update=function(e){this.coordinates.pop(),this.coordinates.unshift([this.x,this.y]),this.speed*=this.friction,this.x+=Math.cos(this.angle)*this.speed,this.y+=Math.sin(this.angle)*this.speed+this.gravity,this.alpha-=this.decay,this.alpha<=this.decay&&l.splice(e,1)},i.prototype.draw=function(){var t=(this.coordinates[this.coordinates.length-1],Math.round(e(m.particleMinRadius,m.particleMaxRadius))),n=d.createRadialGradient(this.x,this.y,0,this.x,this.y,t);n.addColorStop(0,"white"),n.addColorStop(.1,"white"),n.addColorStop(.1,"hsla("+this.hue+",100%,"+this.brightness+"%,"+this.alpha+")"),n.addColorStop(1,"black"),d.beginPath(),d.fillStyle=n,d.arc(this.x,this.y,t,2*Math.PI,!1),d.fill()},{start:function(){n(),f||r()},stop:function(){f&&(window.cancelAnimationFrame(f),d.clearRect(0,0,c.width,c.height),f=void 0)}}}),define("effects",[],function(){function e(e,t){var n=.9,o=setInterval(function(){.1>=n&&(clearInterval(o),e.style.visibility="hidden"),e.style.opacity=n,e.style.filter="alpha(opacity="+100*n+")",n-=.1*n},t)}var t,n,o=360,i=120,a=20,r=100;return{feedbackByImage:function(s){t=document.getElementById("popupWordCanvas"),t.style.visibility="visible",t.style.opacity=1,n=t.getContext("2d");var l=new Image;l.onload=function(){n.drawImage(l,0,0,o,i)},l.src=s,setTimeout(function(){e(t,a)},r)},unfade:function(e,t){var n=.1;e.style.display="block";var o=setInterval(function(){n>=.9&&clearInterval(o),e.style.opacity=n,e.style.filter="alpha(opacity="+100*n+")",n+=.1*n},t)},fade:function(t,n){e(t,n)}}}),define("popup",["fireworks","effects"],function(e,t){function n(){s.fillStyle=x,s.textAlign="center"}function o(){a.style.visibility="visible",a.style.opacity="1.0",s.clearRect(0,0,l,c),e.start(),s.font=E,s.fillText("Great job!",l/2,S),s.font=k}function i(e){var t=new Image;t.onload=function(){s.drawImage(t,80,10,200,200)},t.src="assets/medal_"+e+".png"}var a,r,s,l=360,c=360,d=110,u=155,g=185,f=215,m=245,h=290,v="30px Arial",p="white",y="15px Arial",S=245,w=272,I=293,E="40px Arial",k="20px Arial",x="white",T=5;return{medalInitialization:function(){a=document.getElementById("popup"),s=document.getElementById("popupCanvas").getContext("2d"),n(),document.getElementById("okayButtonInPopup").addEventListener("click",function(){e.stop(),t.fade(a,T)})},forLogin:function(e,t){document.getElementById("loginPopup").style.visibility="visible",r=document.getElementById("loginPopupCanvas").getContext("2d"),r.clearRect(0,0,l,c),r.font=v,r.fillStyle=p,r.textAlign="center","NO_CONNECTION"===e?(r.fillText("NO CONNECTION",l/2,d),r.fillText("There isn't a connection",l/2,u),r.fillText("with the internet.",l/2,g),r.fillText("Please check your",l/2,f),r.fillText("internet connection.",l/2,m)):"WRONG_SESSION_NUMBER"===e?(r.fillText("WRONG PASSWORD",l/2,d),r.fillText("This password is not",l/2,u),r.fillText("recognized in our database.",l/2,g),r.fillText("Please check your account",l/2,f),r.fillText("at Zeeguu.",l/2,m)):(r.fillText("TOO FEW WORDS",l/2,d),r.fillText("More words needed,",l/2,u),r.fillText("please make sure you have",l/2,g),r.fillText("at least 10 words.",l/2,f)),r.font=y,r.fillStyle=p,r.textAlign="center",r.fillText("please press the screen to try again",l/2,h),t(1),document.getElementById("loginPopupCanvas").addEventListener("click",function(){document.getElementById("loginPopup").style.visibility="hidden"})},forWordsLearned:function(e){o(),i("words_learned"),1===e?(s.fillText("You just learned",l/2,w),s.fillText("your first word!",l/2,I)):(s.fillText("You have already learned",l/2,w),s.fillText(e+" words",l/2,I))},forTotalTime:function(e){o(),i("total_time"),s.fillText("You have already used the app",l/2,w),s.fillText("for "+e,l/2,I)},forSessionTime:function(){o(),i("longest_session"),s.fillText("You are currently in",l/2,w),s.fillText("your longest session",l/2,I)},forLearningStreak:function(e){o(),i("longest_streak"),s.fillText("You have learned for",l/2,w),s.fillText(e+" days in a row",l/2,I)}}}),define("login",["userData","popup"],function(e,t){function n(){document.getElementById("loginPage").style.display="none",document.getElementById("mainPage").style.display="block"}function o(e,t){f=document.getElementById("digitsCanvas").getContext("2d"),f.clearRect(T+k*e,0,k,x),f.font=P,f.fillStyle=N,f.textAlign="center",f.fillText(t,b+k*e,C)}function i(e,t,n){return t?(n++,n>9&&(n=0)):(n--,0>n&&(n=9)),o(e,n),n}function a(){f=document.getElementById("loginHeaderCanvas").getContext("2d"),f.clearRect(0,0,S,w),f.font=B,f.fillStyle=L,f.textAlign="center",f.fillText("Please fill in your 8 digit code",S/2,I)}function r(e){f=document.getElementById("iconPageNrCanvas").getContext("2d"),f.clearRect(0,0,S,E),1===e?(f.beginPath(),f.arc(170,7,7,0,2*Math.PI),f.fillStyle="#FFFFFF",f.fill(),f.beginPath(),f.arc(190,7,7,0,2*Math.PI),f.fillStyle="#C3C3C3",f.fill()):(f.beginPath(),f.arc(170,7,7,0,2*Math.PI),f.fillStyle="#C3C3C3",f.fill(),f.beginPath(),f.arc(190,7,7,0,2*Math.PI),f.fillStyle="#FFFFFF",f.fill())}function s(e){a(),r(e);for(var t=0;O>t;t++)o(t,0)}function l(e){m=0,h=0,v=0,p=0,1===e&&(y=0),s(e)}function c(e){m=i(0,e,m)}function d(e){h=i(1,e,h)}function u(e){v=i(2,e,v)}function g(e){p=i(3,e,p)}var f,m=0,h=0,v=0,p=0,y=0,S=360,w=70,I=62,E=15,k=76,x=105,T=40,b=65,C=80,B="15px Arial",L="white",P="80px Arial",N="black",O=4;return function(o){null!==localStorage.getItem("accountCode")?(e.load(),n(),o(e.getCode())):(f=document.getElementById("digitsCanvas").getContext("2d"),s(1),document.getElementById("first_plus").addEventListener("click",function(){c(!0)}),document.getElementById("first_min").addEventListener("click",function(){c(!1)}),document.getElementById("second_plus").addEventListener("click",function(){d(!0)}),document.getElementById("second_min").addEventListener("click",function(){d(!1)}),document.getElementById("third_plus").addEventListener("click",function(){u(!0)}),document.getElementById("third_min").addEventListener("click",function(){u(!1)}),document.getElementById("fourth_plus").addEventListener("click",function(){g(!0)}),document.getElementById("fourth_min").addEventListener("click",function(){g(!1)}),document.getElementById("setNextButton").addEventListener("click",function(){if(0===y)y=m.toString()+h.toString()+v.toString()+p.toString(),l(2);else{y=y+m.toString()+h.toString()+v.toString()+p.toString();var i=o(y);"SUCCESS"===i?(e.saveCode(y),n()):t.forLogin(i,l)}}))}}),define("session",["userData","login"],function(e,t){function n(e){return Object.keys(e).length}function o(e,t){return a.measureText(String(e)).width<=t?!0:!1}function i(t){console.log("Trying to get words with session: "+t);try{var i=new XMLHttpRequest;i.open("GET",g+f+s+"?session="+t,!1),i.onload=function(){try{var t=JSON.parse(this.responseText),i=0;if(n(t)<e.numberOfFlashcards())r="TOO_FEW_WORDS";else{for(var s=0;s<n(t);s++)a.font=d,o(t[s].from,l)&&o(t[s].to,l)&&(a.font=u,o(t[s].from,c)&&o(t[s].to,c)&&(e.setWordPair(i,t[s].from,t[s].to,t[s].id,t[s].context),i++));console.log("number of words loaded: "+i),e.saveWordPair(),r="SUCCESS"}}catch(g){console.log("wrong session number: "+g),r="WRONG_SESSION_NUMBER"}},i.send()}catch(m){console.log("no internet connection: "+m),r="NO_CONNECTION"}}var a,r,s=50,l=340,c=280,d="45px Arial",u="35px Arial",g="https://zeeguu.unibe.ch/",f="bookmarks_to_study/";return{create:function(t,n){a=t,e.areThereWords()?(r="SUCCESS",console.log("Using words which were already saved.")):i(n)},updateWords:function(){console.log("trying to update words..")},printWords:function(){e.printWords()},getStatus:function(){return r}}}),define("battery",[],function(){function e(e,t,n,o){var i=(o-90)*Math.PI/180;return{x:e+n*Math.cos(i),y:t+n*Math.sin(i)}}function t(t,n,o,i,a){var r=e(t,n,o,a),s=e(t,n,o,i),l=180>=a-i?"0":"1",c=["M",r.x,r.y,"A",o,o,0,l,0,s.x,s.y].join(" ");return c}var n="green",o="red",i=.15;return{draw:function(){var e=navigator.battery||navigator.webkitBattery||navigator.mozBattery;e.onlevelchange=function(){console.log(Math.floor(100*e.level)),document.getElementById("battery").setAttribute("d",t(180,180,180,270,270+180*e.level)),e.level>i?document.getElementById("battery").setAttribute("stroke",n):document.getElementById("battery").setAttribute("stroke",o)}}}}),define("weather",[],function(){function e(e,t){try{var n=new XMLHttpRequest;n.open("GET","http://api.openweathermap.org/data/2.5/weather?lat="+e+"&lon="+t+"&APPID="+r,!1),n.onload=function(){console.log("getting weather data.."),console.log(this.responseText),s=JSON.parse(this.responseText),console.log(JSON.stringify(s)),localStorage.setItem("weather",JSON.stringify(s))},n.send()}catch(o){l=!1,console.log("Error getWeather: "+o)}}function t(){var t=new XMLHttpRequest;try{t.open("GET","http://ip-api.com/json",!1),t.onload=function(){console.log("getting location.."),console.log(this.responseText);var t=JSON.parse(this.responseText);e(t.lat,t.lon),console.log(JSON.stringify(t))},t.send()}catch(n){l=!1,console.log("Error getLocation: "+n)}}function n(e){var t=new Date(1e3*e);return 60*t.getUTCHours()+t.getUTCMinutes()-t.getTimezoneOffset()}function o(){return(s.main.temp-273.15).toFixed(0)}var i,a,r="ab2771b4d49ab0798786dd6f2bee71a0",s=null,l=!1,c=50,d=25,u="17px Arial",g="white";return{create:function(){i=document.getElementById("weatherCanvas").getContext("2d"),a=document.getElementById("temperatureCanvas").getContext("2d")},refresh:function(){l=!0,t(),null===s&&(s=JSON.parse(localStorage.getItem("weather")))},getSunset:function(){return n(s.sys.sunset)},getSunrise:function(){return n(s.sys.sunrise)},draw:function(){if(l){l=!1;var e=new Image;e.onload=function(){i.drawImage(e,0,0)},e.src="http://openweathermap.org/img/w/"+s.weather[0].icon+".png"}a.clearRect(0,0,c,c),a.font=u,a.fillStyle=g,a.textAlign="center",a.fillText(o()+"°C",d,d)}}}),define("clickTracker",[],function(){function e(){o=document.getElementById("clickTracker"),o.style.visibility="visible",n=document.getElementById("clickTrackerCanvas").getContext("2d"),n.clearRect(0,0,s,l),r="hidden"===document.getElementById("revealedPage").style.visibility?!0:!1,document.getElementById("clickTrackerCanvas").addEventListener("click",function(){o.style.visibility="hidden"})}function t(e,t,o,i){i&&(n.beginPath(),n.arc(t,o,c,d,u),n.fillStyle=e,n.fill(),n.stroke())}var n,o,i=[],a=0,r=!1,s=360,l=360,c=6,d=0,u=2*Math.PI;return{addClick:function(e,t,n){i[a++]={posX:e,posY:t,type:n}},showPositions:function(){e();for(var n=0;n<i.length;n++)switch(i[n].type){case"reveal":t("yellow",i[n].posX,i[n].posY,r);break;case"time":t("white",i[n].posX,i[n].posY,!0);break;case"settings":t("blue",i[n].posX,i[n].posY,!0);break;case"wrong":t("red",i[n].posX,i[n].posY,!r);break;case"menu":t("orange",i[n].posX,i[n].posY,!r);break;case"right":t("green",i[n].posX,i[n].posY,!r)}}}}),define("background",["userData"],function(e){var t,n,o=["url('assets/simple_background.png')","url('assets/city_background.png')","url('assets/countryside_background.png')"],i=1440,a="360px 180px";return{create:function(){t=document.getElementById("landscapeCanvas"),null===localStorage.getItem("backgroundNumber")&&e.setBackgroundNumber(0),t.style.background=o[e.getBackgroundNumber()],t.style.backgroundSize=a},change:function(){e.increaseBackgroundNumber(),e.getBackgroundNumber()===o.length&&e.setBackgroundNumber(0),t.style.background=o[e.getBackgroundNumber()],t.style.backgroundSize=a},rotate:function(e,t,o){o>=e&&t>=o?(n=(180/(t-e)).toFixed(2),n=90+(o-e)*n,document.getElementById("rotationCanvas").style.transform="rotate("+n+"deg)"):(n=(180/(e+(i-t))).toFixed(2),n=o>t?270+(o-t)*n:270+(o+(i-t))*n,document.getElementById("rotationCanvas").style.transform="rotate("+n+"deg)")}}}),define("profile",["time","effects","popup","userData"],function(e,t,n,o){function i(){document.getElementById("leftInProfile").addEventListener("click",function(){u()}),document.getElementById("rightInProfile").addEventListener("click",function(){g()}),document.getElementById("backButtonInProfile").addEventListener("click",function(){t.fade(m,T)})}function a(e){return 0===e?e="00":e>0&&10>e&&(e="0"+e),e}function r(e){var t=a(Math.floor(e/3600)),n=a(Math.floor(e%3600/60)),o=a(Math.floor(e%3600%60));return t+":"+n+":"+o}function s(e){for(var t=0;t<w.length;t++)v.beginPath(),v.arc(e+20*t,W,F,0,2*Math.PI),v.fillStyle=D,v.fill()}function l(e){v.beginPath(),v.arc(e,W,F,0,2*Math.PI),v.fillStyle=J,v.fill()}function c(e){v=document.getElementById("profilePageIconCanvas").getContext("2d"),v.clearRect(0,0,80,20),s(_),l(e)}function d(e){h.font=x,h.textAlign="center";var t=new Image;t.onload=function(){switch(h.drawImage(t,C,B,L,P),h.font=x,h.textAlign="center",e){case 0:h.fillText("words learned:",E/2,N),1!==p?h.fillText(p+" words",E/2,O):h.fillText(p+" word",E/2,O),c(_);break;case 1:h.fillText("total time:",E/2,N),h.fillText(r(localStorage.getItem("totalTime")),E/2,O),c(M);break;case 2:h.fillText("longest session:",E/2,N),h.fillText(r(localStorage.getItem("longestSession")),E/2,O),c(A);break;case 3:h.fillText("learning streak:",E/2,N),localStorage.getItem("longestLearningStreak")>1?h.fillText(localStorage.getItem("longestLearningStreak")+" days",E/2,O):h.fillText("none",E/2,O),c(R)}},t.src=w[e]}function u(){I--,0>I&&(I=w.length-1),d(I)}function g(){I++,I>w.length-1&&(I=0),d(I)}function f(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()?!0:!1}var m,h,v,p=0,y=1,S=null,w=["assets/medal_words_learned_for_profile.png","assets/medal_total_time_for_profile.png","assets/medal_longest_session_for_profile.png","assets/medal_longest_streak_for_profile.png"],I=0,E=360,k="40px Arial",x="25px Arial",T=5,b=65,C=90,B=80,L=180,P=196,N=220,O=260,_=10,M=30,A=50,R=70,W=9,F=7,D="#C3C3C3",J="#FFFFFF";return{create:function(){null===localStorage.getItem("totalTime")?localStorage.setItem("totalTime",0):e.setTotalTime(localStorage.getItem("totalTime")),null===localStorage.getItem("longestSession")&&localStorage.setItem("longestSession",0),null!==localStorage.getItem("wordsLearned")&&(p=localStorage.getItem("wordsLearned")),null!==localStorage.getItem("currentLearningStreak")&&(y=localStorage.getItem("currentLearningStreak")),null!==localStorage.getItem("dateLastActive")&&(S=new Date(Date.parse(localStorage.getItem("dateLastActive")))),null===localStorage.getItem("longestLearningStreak")&&localStorage.setItem("longestLearningStreak",1),i(),n.medalInitialization()},refresh:function(){localStorage.setItem("totalTime",e.getTotalTime()),0===e.getTotalTime()||900!==e.getTotalTime()&&1800!==e.getTotalTime()&&e.getTotalTime()%3600!==0||n.forTotalTime(r(e.getTotalTime())),e.getSessionTime()>localStorage.getItem("longestSession")&&(localStorage.setItem("longestSession",e.getSessionTime()),o.getSessionPopupShown()||(n.forSessionTime(),o.setSessionPopupShown(!0)))},save:function(){localStorage.setItem("wordsLearned",p),localStorage.setItem("currentLearningStreak",y),localStorage.setItem("dateLastActive",S),y>localStorage.getItem("longestLearningStreak")&&(localStorage.setItem("longestLearningStreak",y),n.forLearningStreak(y))},getWordsLearned:function(){return p},increaseWordsLearned:function(){p++,0===p||1!==p&&p%10!==0||n.forWordsLearned(p)},userIsActive:function(){if(null===S)S=new Date;else{var e=new Date;f(e,S)||(S.setDate(S.getDate()+1),f(e,S)?y++:y=1),S=e}},show:function(){m=document.getElementById("profilePage"),m.style.visibility="visible",m.style.opacity="1.0",h=document.getElementById("profileCanvas").getContext("2d"),h.clearRect(0,0,E,E);var e=new Image;e.onload=function(){h.drawImage(e,0,0),h.font=k,h.fillStyle="white",h.textAlign="center",h.fillText("profile",E/2,b)},e.src="assets/banner.png",d(0)}}}),define("settings",["effects","userData","profile"],function(e,t,n){function o(){e.fade(i,a)}var i,a=5;return{create:function(e){i=document.getElementById("settingsPage"),document.getElementById("settingsSpace").addEventListener("click",function(){o()}),document.getElementById("reverseButton").addEventListener("click",function(){t.addEvent("reverse"),t.setReverseStatus(!t.getReverseStatus()),e()}),document.getElementById("profileButton").addEventListener("click",function(){n.show()}),document.getElementById("logOutButton").addEventListener("click",function(){t.clear(),document.location.reload(!0)}),document.getElementById("backButtonInSettings").addEventListener("click",function(){o()})},show:function(){i.style.visibility="visible",e.unfade(i,a)}}}),define("menu",["effects","userData","profile","session"],function(e,t,n,o){function i(){e.fade(l,u)}function a(n,i){t.removeWord()?(o.updateWords(),e.feedbackByImage(n),t.saveEvents(),t.saveWordPair(),t.sendEvents(),i()):(c.style.visibility="visible",c.style.opacity=1,d.clearRect(0,0,p,y/2),d.fillText("TOO FEW WORDS",p/2,g),d.fillText("there are too",p/2,f),d.fillText("few words left to",p/2,m),d.fillText("use this option",p/2,h),setTimeout(function(){e.fade(c,u)},v))}function r(){for(var e=[],n=[],o=[],i=t.getWordPair(0).context,a=i.split(" "),r=0;r<a.length;r++)d.measureText(e+" "+a[r]).width<330?e+=" "+a[r]:d.measureText(n+" "+a[r]).width<300?n+=" "+a[r]:o+=" "+a[r];c.style.visibility="visible",c.style.opacity=1,d.clearRect(0,0,p,S),d.fillText(e,p/2,x),d.fillText(n,p/2,T),d.fillText(o,p/2,b)}function s(o){document.getElementById("menuSpace").addEventListener("click",function(){i()}),document.getElementById("wrongTranslationButton").addEventListener("click",function(){t.addEvent("wrongTranslation"),a(I,o)}),document.getElementById("learnedButton").addEventListener("click",function(){n.increaseWordsLearned(),n.userIsActive(),n.save(),t.addEvent("learnedIt"),a(w,o)}),document.getElementById("contextButton").addEventListener("click",function(){console.log("context: "+t.getWordPair(0).context),r()}),document.getElementById("backButtonInMenu").addEventListener("click",function(){i()}),document.getElementById("popupWordCanvas").addEventListener("click",function(){e.fade(c,u)})}var l,c,d,u=5,g=25,f=50,m=70,h=90,v=3e3,p=360,y=360,S=120,w="assets/right_icon_icon.png",I="assets/trash_icon.png",E="20px Arial",k="white",x=35,T=65,b=95;return{create:function(e){l=document.getElementById("menuPage"),c=document.getElementById("popupWordCanvas"),d=c.getContext("2d"),d.font=E,d.fillStyle=k,d.textAlign="center",s(e)},show:function(){l.style.visibility="visible",e.unfade(l,u)}}}),define("gui",["battery","userData","time","weather","fireworks","clickTracker","background","effects","settings","menu","profile"],function(e,t,n,o,i,a,r,s,l,c,d){function u(e,t,n,o){y.font=o+S,y.fillStyle=E,y.textAlign="center",y.fillText(e,t,n)}function g(){document.getElementById("wordCanvas").style.backgroundImage="url('assets/background.png')",y.clearRect(0,0,k,x),u(t.getWord(),k/2,T,w);var e=document.getElementById("revealedPage");e.style.visibility="hidden"}function f(){y.clearRect(0,6,k,x),u(t.getWord(),k/2,T,w),u(t.getTranslation(),k/2,b,I),document.getElementById("wordCanvas").style.backgroundImage="url('assets/revealed_clicked_background.png')";var e=document.getElementById("revealedPage");e.style.visibility="visible"}function m(){null===L?L=setTimeout(function(){L=null,r.change()},300):(clearTimeout(L),L=null,l.show())}function h(){d.userIsActive(),d.save(),t.addEvent("right"),t.saveEvents(),t.sendEvents();var e=C;t.updateWordPair(!0),t.saveWordPair(),s.feedbackByImage(e),g()}function v(){d.userIsActive(),d.save(),t.addEvent("wrong"),t.saveEvents(),t.sendEvents();var e=B;t.updateWordPair(!1),t.saveWordPair(),s.feedbackByImage(e),g()}function p(){document.getElementById("wordCanvas").addEventListener("click",function(e){t.addEvent("reveal"),t.saveEvents(),f(),a.addClick(e.clientX,e.clientY,"reveal")}),document.getElementById("revealButton").addEventListener("click",function(e){t.addEvent("reveal"),t.saveEvents(),f(),a.addClick(e.clientX,e.clientY,"reveal")}),document.getElementById("wrongCanvas").addEventListener("click",function(e){v(),a.addClick(e.clientX,e.clientY,"wrong")}),document.getElementById("wrongButton").addEventListener("click",function(e){v(),a.addClick(e.clientX,e.clientY,"wrong")}),document.getElementById("menuCanvas").addEventListener("click",function(e){c.show(),a.addClick(e.clientX,e.clientY,"menu")}),document.getElementById("menuButton").addEventListener("click",function(e){c.show(),a.addClick(e.clientX,e.clientY,"menu")}),document.getElementById("rightCanvas").addEventListener("click",function(e){h(),a.addClick(e.clientX,e.clientY,"right")}),document.getElementById("rightButton").addEventListener("click",function(e){h(),a.addClick(e.clientX,e.clientY,"right")}),document.getElementById("time").addEventListener("click",function(e){a.addClick(e.clientX,e.clientY,"time"),m()}),document.getElementById("temperatureCanvas").addEventListener("click",function(){a.showPositions()})}var y,S="px Arial",w=45,I=35,E="white",k=360,x=120,T=45,b=95,C="assets/right_icon_icon.png",B="assets/wrong_icon_icon.png",L=null;return{draw:function(){d.refresh(),n.refresh(),n.draw(),n.drawDate(),e.draw(),o.draw();var t=60*n.getHours()+1*n.getMinutes();r.rotate(o.getSunrise(),o.getSunset(),t)},create:function(e){y=e,d.create(),n.create(),l.create(g),c.create(g,f),r.create(),o.create(),o.refresh(),g(),p()}}}),define("deviceListeners",["userData","weather","time"],function(e,t,n){function o(){document.getElementById("menuPage").style.visibility="hidden",document.getElementById("settingsPage").style.visibility="hidden",document.getElementById("profilePage").style.visibility="hidden"}function i(){try{tizen.power.setScreenStateChangeListener(function(i,a){"SCREEN_NORMAL"===a&&"SCREEN_OFF"===i?(console.log("We just woke up"),e.addEvent("screenOn"),n.startUsageTracking(),t.refresh()):(console.log("The display has been switched off"),e.addEvent("screenOff"),o(),n.pauseUsageTracking(),n.resetSessionTime(),e.setSessionPopupShown(!1)),e.saveEvents()})}catch(i){}}function a(){window.addEventListener("tizenhwkey",function(e){if("back"===e.keyName)try{tizen.application.getCurrentApplication().exit(),o()}catch(t){}})}return function(){a(),i()}}),require(["login","session","gui","deviceListeners"],function(e,t,n,o){function i(){n.draw(),setTimeout(i,1e3)}function a(e){t.create(s,e),t.printWords();var a=t.getStatus();return"SUCCESS"!==a?a:(n.create(s),o(),i(),a)}var r=document.getElementById("wordCanvas"),s=r.getContext("2d");new e(a)}),define("main",function(){});