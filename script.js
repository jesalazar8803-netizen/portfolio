(() => {
"use strict";
const root=document.querySelector(".carousel"), stage=root?.querySelector(".stage");
let cards=[...(stage?.querySelectorAll(".card")||[])], current=0, startX=0;
const prev=root?.querySelector("[data-prev]"), next=root?.querySelector("[data-next]");
const dots=document.querySelector("[data-dots]"), counter=document.querySelector("[data-counter]");
function offsetPx(){return innerWidth<=600?150:innerWidth<=900?205:265}
function buildDots(){dots.innerHTML="";cards.forEach((_,i)=>{const d=document.createElement("button");d.className="dot";d.type="button";d.ariaLabel=`Mostrar proyecto ${i+1}`;d.onclick=()=>go(i);dots.append(d)})}
function render(){const total=cards.length;if(!total)return;cards.forEach((c,i)=>{let o=i-current;if(o>total/2)o-=total;if(o<-total/2)o+=total;const a=Math.abs(o);c.classList.toggle("active",o===0);if(a>2){c.style.transform="translate3d(0,0,-900px) scale(.65)";c.style.opacity=0;c.style.pointerEvents="none";return}const x=o*offsetPx(),z=o===0?0:-Math.min(a*105,210),s=o===0?1:a===1?.86:.72,op=o===0?1:a===1?.72:.32;c.style.transform=`translate3d(${x}px,0,${z}px) scale(${s}) rotateY(${-18*o}deg)`;c.style.opacity=op;c.style.zIndex=100-a;c.style.pointerEvents="auto"});counter.textContent=`${current+1} / ${total}`;[...dots.children].forEach((d,i)=>d.classList.toggle("active",i===current))}
function go(i){current=(i+cards.length)%cards.length;render()} function move(n){go(current+n)}
if(root){buildDots();render();prev.onclick=()=>move(-1);next.onclick=()=>move(1);root.onkeydown=e=>{if(e.key==="ArrowLeft"){e.preventDefault();move(-1)}if(e.key==="ArrowRight"){e.preventDefault();move(1)}if(e.key==="Home"){e.preventDefault();go(0)}if(e.key==="End"){e.preventDefault();go(cards.length-1)}};root.ontouchstart=e=>startX=e.changedTouches[0].screenX;root.ontouchend=e=>{const d=e.changedTouches[0].screenX-startX;if(Math.abs(d)>=45)move(d<0?1:-1)};addEventListener("resize",render)}
document.querySelectorAll(".filter").forEach(f=>f.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));f.classList.add("active");const tag=f.dataset.filter;cards.forEach(c=>c.hidden=tag!=="all"&&!c.dataset.tags.split(" ").includes(tag));cards=cards.filter(c=>!c.hidden);current=0;buildDots();render()});
})();