// Rarity raises an item's base stats, and item cards and crystals show the bonus. One supplement slot, two with a Legendary or Mythic crystal. One enchant slot, two on Mythic.
const {P}=require('./mech.js');
function rar(h,g){
  h=P(h,"const TM="+JSON.stringify(g.TM)+";","// rarity raises an item's base stats\nconst RARW="+JSON.stringify(g.rarW)+",RARA="+JSON.stringify(g.rarA)+";\nconst TM="+JSON.stringify(g.TM)+";");
  h=P(h,"const m=TM[it.tier]*(it.q||1)*","const m=TM[it.tier]*(it.slot==='weapon'?RARW:RARA)[it.rar||0]*(it.q||1)*");
  // rarity colors: gray, green, blue, purple, yellow, pink; grade labels keep their orange
  h=P(h,"--r0:#c9c2d6; --r1:#6fb7e8; --r2:#f2c14e; --r3:#c08cff; --r4:#ff8b45; --r5:#ff4fd8;","--r0:#a8a4b4; --r1:#7bd95a; --r2:#5a9cf0; --r3:#c08cff; --r4:#f2c14e; --r5:#ff4fd8;");
  h=P(h,"const RCOL=['#c9c2d6','#6fb7e8','#f2c14e','#c08cff','#ff8b45','#ff4fd8'];","const RCOL=['#a8a4b4','#7bd95a','#5a9cf0','#c08cff','#f2c14e','#ff4fd8'];");
  h=P(h,".gr.g6,.gr.g7,.gr.g8{color:var(--r4);",".gr.g6,.gr.g7,.gr.g8{color:#ff8b45;");
  h=P(h,".grd.g6,.grd.g7,.grd.g8{color:var(--r4)}",".grd.g6,.grd.g7,.grd.g8{color:#ff8b45}");
  // equipped panel: the hero gets its own wide column, in whole pixels, sized to fit the screen
  h=P(h,".doll{display:grid;grid-template-columns:repeat(3,64px);",".doll{display:grid;grid-template-columns:64px auto 64px;");
  h=P(h,"<div class=\"dollhero\">${heroImg(3).replace('idle','')}</div>","<div class=\"dollhero\">${heroImg(innerWidth<440?4:6).replace('idle','')}</div>");
  h=P(h,"'Makes it '+RAR[CRYS[m].r].n)","'Makes it '+RAR[CRYS[m].r].n+': +'+Math.round((RARA[CRYS[m].r]-1)*100)+'% armor, +'+Math.round((RARW[CRYS[m].r]-1)*100)+'% weapon base'+(m==='crys5'?', second supplement and enchant':m==='crys4'?', second supplement':''))");
  h=P(h,".slice(0,2).filter(m=>!SUP[m].fx||fxn++<1);",".slice(0,supSlots(f));");
  h=P(h,"let fxn=0;const sup=(f.sups","const sup=(f.sups");
  h=P(h,"function forgeSpec(){","const supSlots=f=>f.crystal==='crys4'||f.crystal==='crys5'?2:1;\nfunction forgeSpec(){");
  h=P(h,"const m=S.fg.sups||[];S.fg.sups=m.includes(v)?m.filter(x=>x!==v):m.length<2?[...m,v]:m;}","const n=supSlots(S.fg),m=forgeSpec().sup;S.fg.sups=m.includes(v)?m.filter(x=>x!==v):m.length<n?[...m,v]:[...m.slice(0,n-1),v];}");
  h=P(h,"fgcrys:v=>{S.fg.crystal=S.fg.crystal===v?null:v;}","fgcrys:v=>{S.fg.crystal=S.fg.crystal===v?null:v;S.fg.sups=(S.fg.sups||[]).slice(0,supSlots(S.fg));}");
  // Tower: every clear past floor 50 can drop a Mythic Crystal
  h=P(h,"spirePost();}loot.tower=f;","spirePost();}if(f>50&&chance(f>100?5:2))addMat('crys5',1);loot.tower=f;");
  // forge: supplement counter, and alloy comes last
  h=P(h,"<span class=\"dim small\">up to 2 · stronger at higher tiers · only one with a special effect · dodge caps at 30%</span>","<span class=\"dim small num\">${sp.sup.length}/${supSlots(f)}</span>");
  h=P(h,"${cat==='weapon'?`${step(4,'Alloy')} <span class=\"dim small\">optional · changes how the weapon fights</span><div class=\"picks\">${alloys}</div>`:''}\n      ${step(cat==='weapon'?5:4,'Supplements')}","${step(4,'Supplements')}");
  h=P(h,"<div class=\"picks\">${crys}</div>`:''}`:''}</div>","<div class=\"picks\">${crys}</div>`:''}\n      ${cat==='weapon'?`${step(5,'Alloy')}<div class=\"picks\">${alloys}</div>`:''}`:''}</div>");
  // forging: the zone moves and the marker speeds up each strike, Masterwork needs near-perfect strikes
  h=P(h,"const MG={active:false,pos:0,dir:1,speed:0,strikes:[],spec:null,last:null};","const MG={active:false,pos:0,dir:1,speed:0,c:50,strikes:[],spec:null,last:null};\nconst mgSpot=(p,t)=>{const z=[16,15,14,13,12][t];let c;do{c=z+Math.random()*(100-2*z);}while(Math.abs(c-p)<20);return c;};");
  h=P(h,"Object.assign(MG,{active:true,pos:0,dir:1,speed:.5,strikes:[],spec:sp,last:null});","Object.assign(MG,{active:true,pos:0,dir:1,speed:[.9,.95,1,1.05,1.1][sp.tier],c:mgSpot(0,sp.tier),strikes:[],spec:sp,last:null});");
  h=P(h,"const off=Math.abs(MG.pos-50);","const off=Math.abs(MG.pos-MG.c);");
  h=P(h,"fx('strike',{perfect:off<=zone*.35});","fx('strike',{perfect:off<=zone*.35});MG.speed*=1.2;MG.c=mgSpot(MG.c,MG.spec.tier);");
  h=P(h,"const qi=avg>=.9?4:","const qi=avg>=.95?4:");
  h=P(h,"Bright gold is perfect. Space works too.","Bright gold is perfect. Each strike moves the zone and speeds up the marker. Space works too.");
  h=P(h,"style=\"left:${50-zone}%;width:${zone*2}%\"","style=\"left:${MG.c-zone}%;width:${zone*2}%\"");
  h=P(h,"style=\"left:${50-zone*.35}%;width:${zone*.7}%\"","style=\"left:${MG.c-zone*.35}%;width:${zone*.7}%\"");
  // one enchant slot, two on Mythic; older items still show every enchant they hold
  h=P(h,"const enchSlots=it=>it.slot==='gem'?0:it.rar>=3?2:1;","const enchSlots=it=>it.slot==='gem'?0:it.rar>=5?2:1;");
  h=P(h,"function extrasHTML(it){if(!it)return '';const n=enchSlots(it);","function extrasHTML(it){if(!it)return '';const n=Math.max(enchSlots(it),(it.ench||[]).length);");
  if(g.art)h=require('./mechart.js').art(h);
  if(g.dun)h=require('./mechdun.js').dun(h);
  if(g.boss)h=require('./mechboss.js').boss(h,g);
  return h;}
module.exports={rar};
