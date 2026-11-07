// Unbound rarity for the Black Crescent with animated pixel sparks, and a Devils tab in the admin panel.
const {P}=require('./mech.js');
const SPARK=`function bcSparkSheet(w,h){const M=4,peri=[];for(let x=M;x<w-M;x++)peri.push([x,M,0,-1]);for(let y=M+1;y<h-M;y++)peri.push([w-M-1,y,1,0]);for(let x=w-M-2;x>=M;x--)peri.push([x,h-M-1,0,1]);for(let y=h-M-2;y>M;y--)peri.push([M,y,-1,0]);const P=peri.length,F=P>>1,cv=document.createElement('canvas');cv.width=w*F;cv.height=h;const g=cv.getContext('2d');let sd=w*31+h;const rnd=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296;};const comets=[{o:0,c:['#ffc49a','#ff5a3c','#ff5a3c','#c8102e','#c8102e','#c8102e','#7a1414','#7a1414','#5a0a14'],black:0},{o:P>>1,c:['#000','#000','#000','#000','#000','#120406','#120406','#2a070c','#2a070c'],black:1}];const sparks=[];for(const k of comets)for(let s=0;s<F;s+=3)sparks.push({at:s,o:k.o,black:k.black,tx:(rnd()-.5)*.7,life:5+Math.floor(rnd()*5),v:.35+rnd()*.3});for(let f=0;f<F;f++){const ox=f*w,dot=(x,y,c)=>{if(x<0||y<0||x>=w||y>=h)return;g.fillStyle=c;g.fillRect(ox+x,y,1,1);};for(const p of peri)dot(p[0],p[1],'#4a0a12');for(const k of comets){const head=(k.o+f*2)%P;k.c.forEach((col,i)=>{const p=peri[(head-i*2+P*2)%P],q=peri[(head-i*2-1+P*2)%P];dot(p[0],p[1],col);dot(q[0],q[1],col);});}for(const s of sparks){const a=(f-s.at+F)%F;if(a>=s.life)continue;const p=peri[(s.o+s.at*2)%P],X=Math.round(p[0]+p[2]*a*s.v+(p[3]?s.tx*a:0)),Y=Math.round(p[1]+p[3]*a*s.v+(p[2]?s.tx*a:0)),q=a/s.life;dot(X,Y,s.black?'#000':q<.35?'#ff5a3c':q<.7?'#c8102e':'#5a0a14');}}return {u:cv.toDataURL(),F};}
function bcSparkInit(){const r=document.documentElement.style,A=bcSparkSheet(40,40),B=bcSparkSheet(30,41),st=document.createElement('style');r.setProperty('--spkC','url('+A.u+')');r.setProperty('--spkI','url('+B.u+')');st.textContent='.cell.r6::after{background-size:'+A.F*100+'% 100%;animation:bcspk 2.6s steps('+A.F+',jump-none) infinite}.item.r6 .icbox::after{background-size:'+B.F*100+'% 100%;animation:bcspk 2.6s steps('+B.F+',jump-none) infinite}';document.head.appendChild(st);}
`;
const ADMFN=`const admD=()=>S.devils=S.devils||{w:0,seen:{},said:{},bag:[],now:null};
const admBusy=()=>{if(C()&&!C().over){toast('Finish the fight first');return true;}return false;};
function admBreak(){const D=admD();if(!D.pact)return;if(S.gear.weapon&&S.gear.weapon.veil)S.gear.weapon=null;DEVIL.unsign();D.fam=null;D.cut=null;}
function admDevils(b,sel,num){const D=S.devils||{},w=S.gear.weapon,bl=w&&w.veil?w:null,cur=D.pact==='hollow'?'The Hollow':D.pact==='veiled'?'The Veiled (Black Crescent)':D.pact==='colossus'?'The Colossus ('+((CUTS[D.cut]||['?'])[0]).toLowerCase()+')':'none',row=s=>'<div class="optrow">'+s+'</div>',three=(k)=>b(k+':hollow','The Hollow')+b(k+':colossus','The Colossus')+b(k+':veiled','The Veiled');let h=row('<b>Pact</b><span>'+cur+'</span>'+(D.pact?b('dbreak','Break pact'):''))
+row('<b>Meet</b>'+three('devil'))+row('<b>Fight</b>'+three('dfight'))
+row('<b>Sign</b>'+b('dsign:hollow','Hollow Pact')+b('dsign:veiled','Black Crescent')+sel('a_dcut',Object.entries(CUTS).map(([k,x])=>[k,x[0]]),D.cut||'potions')+b('dsign:colossus','Colossus'))
+row('<b>Marks</b>'+DEVILMARKS.map(([k,n])=>b('dmark:'+k,n,D[k]?'tab on':'')).join('')+b('dmarks:1','All')+b('dmarks:0','None'));
if(bl)h+=row('<b>Black Crescent</b><span class="num">Stage '+(bcStage(bl)+1)+'/5</span>'+BC.KILLS.map((_,i)=>b('bcstage:'+i,String(i+1),bcStage(bl)===i?'tab on':'')).join(''))+row('<b>Kills</b>'+num('a_bck',bl.vk||0,90)+b('bckills','Set')+'<b>Metals</b><span class="num">'+(bl.vr||[]).length+'/'+BC.METALS.length+'</span>'+b('bcmetals:all','All')+b('bcmetals:none','None')+(C()&&!C().over&&C().ctx!=='duel'?b('moonfull','Fill Black Moon'):''));
if(D.pact==='colossus')h+=row('<b>Fed</b>'+num('a_dfed',D.fed||0,90)+b('dfed','Set')+'<span class="dim small">+'+fedPct()+'% HP and damage</span>');
return h+row('<b>Wanders since last devil</b>'+num('a_devilw',D.w||0,80)+b('devilw','Set')+'<span class="dim small">next wander '+DEVIL.chanceNow((D.w||0)+1).toFixed(1)+'%</span>')+row(b('dforget','Forget past meetings'));}
`;
const ADMACT=`  dbreak:()=>{if(admBusy())return;admBreak();toast('Pact broken');},
  dsign:v=>{if(admBusy())return;admBreak();if(v==='hollow')DEVIL.sign();else if(v==='veiled')DEVIL.signBlade();else DEVIL.signCut(aval('a_dcut','potions'));toast('Signed');},
  dfight:v=>{if(admBusy())return;const f={hollow:fightHollow,colossus:fightColossus,veiled:fightVeiled}[v];if(f){S.tab='explore';f();}},
  dmark:v=>{const D=admD();D[v]=D[v]?0:1;},
  dmarks:v=>{const D=admD();for(const [k] of DEVILMARKS)D[k]=+v;},
  bcstage:v=>{const it=S.gear.weapon;if(it&&it.veil)it.vk=BC.KILLS[+v]||0;},
  bckills:()=>{const it=S.gear.weapon;if(it&&it.veil)it.vk=Math.max(0,anum('a_bck',0));},
  bcmetals:v=>{const it=S.gear.weapon;if(it&&it.veil)it.vr=v==='all'?[...BC.METALS]:[];},
  moonfull:()=>{const c=C();if(c)c.bm=100;},
  dfed:()=>{admD().fed=Math.max(0,anum('a_dfed',0));},
  dforget:()=>{const D=admD();D.seen={};D.said={};toast('They forgot you');},
`;
function unbound(h){
  // the rarity: same numbers as before, the blade's power does not come from rarity
  h=P(h,"const RARW=[1,1.1,1.15,1.2,1.25,1.3],RARA=[1,1.05,1.1,1.15,1.2,1.3];","const RARW=[1,1.1,1.15,1.2,1.25,1.3,1.3],RARA=[1,1.05,1.1,1.15,1.2,1.3,1.3];");
  h=P(h,"{n:'Mythic'}];","{n:'Mythic'},{n:'Unbound'}];");
  h=P(h,"'#f2c14e','#ff4fd8'];","'#f2c14e','#ff4fd8','#d3142c'];");
  h=P(h,"--r5:#ff4fd8;","--r5:#ff4fd8; --r6:#d3142c;");
  h=P(h,".r5{--rc:var(--r5)}",".r5{--rc:var(--r5)}.r6{--rc:var(--r6)}");
  h=P(h,"const enchSlots=it=>it.slot==='gem'?0:it.rar>=5?2:1;","const enchSlots=it=>it.slot==='gem'?0:it.rar===5?2:1;");
  h=P(h,"<b>Rarities</b>${RAR.map(","<b>Rarities</b>${RAR.slice(0,6).map(");
  h=P(h,"sel('a_rar',RAR.map(","sel('a_rar',RAR.slice(0,6).map(");
  h=P(h,"mkItem('weapon',type,3,4,[],{veil:1","mkItem('weapon',type,3,6,[],{veil:1");
  h=P(h,"function migrate(s){const d=fresh();","function migrate(s){const d=fresh();if(s.gear&&s.gear.weapon&&s.gear.weapon.veil)s.gear.weapon.rar=6;");
  // the sparks
  h=P(h,"function bcMake(){",SPARK+"function bcMake(){");
  h=P(h,"function start(data){","function start(data){try{bcSparkInit();}catch(e){}");
  h=P(h,".doll{display:grid;",".cell.r6{clip-path:none;overflow:visible;box-shadow:inset 0 0 0 3px #2a070c}.cell.r6.sel{box-shadow:inset 0 0 0 3px #2a070c,inset 0 0 0 6px var(--ink)}.cell.r6::after,.item.r6 .icbox::after{content:\"\";position:absolute;pointer-events:none;image-rendering:pixelated;background-repeat:no-repeat;z-index:2}.cell.r6::after{inset:-8px;background-image:var(--spkC)}.item.r6 .icbox{position:relative;width:44px;height:66px;box-sizing:border-box;padding:0;box-shadow:none}.item.r6 .icbox::after{inset:-8px;background-image:var(--spkI)}@keyframes bcspk{to{background-position:100% 0}}\n.doll{display:grid;");
  // the admin panel
  h=P(h,"  pact:()=>{if(S.devils&&S.devils.pact)DEVIL.unsign();else DEVIL.sign();},\n",ADMACT);
  h=P(h,"function vAdmin(){",ADMFN+"function vAdmin(){");
  h=P(h,"${tb('world','World')}","${tb('world','World')}${tb('devils','Devils')}");
  h=P(h,"else{const mobs=Object.entries(MOB)","else if(T==='devils')body=admDevils(b,sel,num);else{const mobs=Object.entries(MOB)");
  h=P(h,"<div class=\"optrow\"><b>Devils</b>${b('devil:hollow','The Hollow')}${b('devil:colossus','The Colossus')}${b('devil:veiled','The Veiled')}${b('pact',S.devils&&S.devils.pact?'Break Hollow Pact':'Sign Hollow Pact')}</div>\n","");
  h=P(h,"<div class=\"optrow\"><b>Wanders since last devil</b>${num('a_devilw',(S.devils&&S.devils.w)||0,80)}${b('devilw','Set')}<span class=\"dim small\">next wander ${DEVIL.chanceNow(((S.devils&&S.devils.w)||0)+1).toFixed(1)}%</span></div>\n","");
  h=require('./mechash.js').ash(h);
  return h;}
module.exports={unbound};
