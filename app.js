(() => {
'use strict';
const $ = id => document.getElementById(id);
const scriptUrl = document.currentScript ? document.currentScript.src : location.href;
const photoUrl = new URL('assets/foto-pareja.jpg', new URL('.', scriptUrl)).href;
const screens = [$('welcome'), $('game'), $('success')];
const puzzle = $('puzzle');
let tiles = [], empty = 15, moves = 0, seconds = 0, timer = null, started = false, installPrompt = null;

function show(screen){screens.forEach(s=>s.classList.add('hidden'));screen.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});}
function timeText(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
function neighbors(i){const a=[];if(i%4)a.push(i-1);if(i%4<3)a.push(i+1);if(i>=4)a.push(i-4);if(i<12)a.push(i+4);return a;}
function swap(a,b){[tiles[a],tiles[b]]=[tiles[b],tiles[a]];empty=tiles.indexOf(15);}
function solved(){return tiles.every((v,i)=>v===i);}
function photoError(message){
 let el=$('photoStatus');
 if(!el){el=document.createElement('p');el.id='photoStatus';el.className='photo-error';const target=$('game')||document.body;target.prepend(el);}
 el.textContent=message;
}
function render(){
 puzzle.innerHTML='';
 tiles.forEach((v,i)=>{
   const b=document.createElement('button');
   b.type='button'; b.className='tile'+(v===15?' empty':''); b.dataset.index=i;
   b.setAttribute('aria-label',v===15?'Espacio vacío':'Pieza '+(v+1));
   if(v!==15){
     b.style.backgroundImage=`url("${photoUrl}")`;
     b.style.backgroundPosition=`${(v%4)*100/3}% ${Math.floor(v/4)*100/3}%`;
   }
   b.addEventListener('click',()=>move(i));
   let sx=0,sy=0,dragging=false;
   b.addEventListener('pointerdown',e=>{
     if(v===15)return;
     sx=e.clientX;sy=e.clientY;dragging=true;b.classList.add('dragging');
     try{b.setPointerCapture(e.pointerId)}catch(_){}
   });
   b.addEventListener('pointerup',e=>{
     if(!dragging)return;dragging=false;b.classList.remove('dragging');
     const dx=e.clientX-sx,dy=e.clientY-sy;
     if(Math.hypot(dx,dy)<14)return;
     // Dragging a tile toward the empty square should move it only if the swipe direction points at that square.
     let target=-1;
     if(Math.abs(dx)>Math.abs(dy))target=i+(dx>0?1:-1);
     else target=i+(dy>0?4:-4);
     if(target===empty && neighbors(i).includes(empty))move(i);
   });
   b.addEventListener('pointercancel',()=>{dragging=false;b.classList.remove('dragging')});
   puzzle.appendChild(b);
 });
}
function move(i){
 if(i===empty||!neighbors(i).includes(empty))return;
 if(!started){started=true;timer=setInterval(()=>{$('time').textContent=timeText(++seconds)},1000);}
 swap(i,empty);$('moves').textContent=String(++moves);render();
 if(solved()){stopTimer();$('finalPhoto').src=photoUrl;show($('success'));if(navigator.vibrate)navigator.vibrate([80,40,120]);}
}
function shuffle(){
 stopTimer();seconds=0;moves=0;started=false;$('time').textContent='00:00';$('moves').textContent='0';
 tiles=Array.from({length:16},(_,i)=>i);empty=15;let prev=-1;
 for(let n=0;n<180;n++){const opts=neighbors(empty).filter(i=>i!==prev);const pick=opts[Math.floor(Math.random()*opts.length)];prev=empty;swap(pick,empty);}
 if(solved())return shuffle();render();
}
$('start').addEventListener('click',()=>{shuffle();show($('game'));});
$('shuffle').addEventListener('click',shuffle);
$('preview').addEventListener('click',()=>{$('previewImg').src=photoUrl;$('previewDialog').showModal();});
$('closePreview').addEventListener('click',()=>$('previewDialog').close());
$('home').addEventListener('click',()=>{stopTimer();show($('welcome'));});
$('replay').addEventListener('click',()=>{shuffle();show($('game'));});
$('how').addEventListener('click',()=>$('helpDialog').showModal());
$('closeHelp').addEventListener('click',()=>$('helpDialog').close());
$('gotIt').addEventListener('click',()=>$('helpDialog').close());
$('download').addEventListener('click',()=>{
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" rx="55" fill="#fff4f6"/><path d="M150 210C125 185 65 145 65 105C65 60 115 50 150 90C185 50 235 60 235 105C235 145 175 185 150 210Z" fill="#e36c91"><animateTransform attributeName="transform" type="scale" values="1;1.07;1" dur="1.3s" repeatCount="indefinite"/></path><text x="150" y="260" font-family="Georgia,serif" font-size="18" text-anchor="middle" fill="#8c3e5b">Te amo 3 millones ♡</text></svg>`;
 const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download='corazoncito-para-isabella.svg';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('install').classList.remove('hidden');});
$('install').addEventListener('click',async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('install').classList.add('hidden');}});
if('serviceWorker' in navigator && location.protocol!=='file:'){
 window.addEventListener('load',()=>navigator.serviceWorker.register(new URL('sw.js',new URL('.',scriptUrl)).href).catch(err=>console.error('No se pudo registrar la PWA:',err)));
}
const img=new Image();
img.onload=()=>{document.documentElement.classList.add('photo-loaded');const status=$('photoStatus');if(status)status.remove();};
img.onerror=()=>{photoError('No se pudo cargar la foto desde: '+photoUrl+' . Revisá que assets/foto-pareja.jpg esté publicado en GitHub.');console.error('Error cargando foto:',photoUrl);};
img.src=photoUrl;
tiles=Array.from({length:16},(_,i)=>i);render();
})();