import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m,i as r}from"./assets/vendor-77e16229.js";const e={inputValue:document.querySelector("#datetime-picker"),buttonStart:document.querySelector('[type="button"]'),userSelectedDate:null,timer:null,convertMs(t){const a=l=>String(l).padStart(2,"0"),d=a(Math.floor(t/864e5)),i=a(Math.floor(t%864e5/36e5)),u=a(Math.floor(t%864e5%36e5/6e4)),c=a(Math.floor(t%864e5%36e5%6e4/1e3));return{days:d,hours:i,minutes:u,seconds:c}}},f={addDays:document.querySelector("[data-days]"),addHours:document.querySelector("[data-hours]"),addMinutes:document.querySelector("[data-minutes]"),addSeconds:document.querySelector("[data-seconds]"),updateMarkup({days:t,hours:o,minutes:n,seconds:s}){this.addDays.textContent=t,this.addHours.textContent=o,this.addMinutes.textContent=n,this.addSeconds.textContent=s}};function h(){S();const t=setInterval(()=>{const o=e.userSelectedDate-new Date;if(o<=0){clearInterval(t),r.show({title:"info",message:"Time is up!",color:"#4CAF50",position:"topRight",messageColor:"#fff",titleColor:"#fff"}),b();return}const n=e.convertMs(o);f.updateMarkup(n)},1e3)}function p(t){t[0]>new Date?(e.userSelectedDate=t[0],e.buttonStart.classList.remove("hiddenBtn"),e.buttonStart.addEventListener("click",h,{once:!0})):(e.buttonStart.classList.add("hiddenBtn"),r.show({title:"error",message:"Please choose a date in the future",color:"#ef4040",position:"topRight",messageColor:"#fff",titleColor:"#fff",imageWidth:"24"}))}function S(){e.inputValue.disabled=!0,e.buttonStart.disabled=!0}function b(){e.inputValue.disabled=!1,e.buttonStart.disabled=!1}m("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:p});e.buttonStart.classList.add("hiddenBtn");
//# sourceMappingURL=commonHelpers.js.map
