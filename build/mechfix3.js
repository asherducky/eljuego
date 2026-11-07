// Two unique alloys instead of five plain ones, alloy tooltips in Ascend, a double-click guard, devil names on their regions,
// and her puppets as the Last Stage's wild enemies.
const {P}=require('./mech.js');
const BS=String.fromCharCode(92);
const cut=(h,a,b,rep)=>{const i=h.indexOf(a),j=h.indexOf(b,i);if(i<0||j<0)throw new Error('cut '+a.slice(0,30));return h.slice(0,i)+rep+h.slice(j);};
function fix3(h){
  // alloys: Ashforged and Devilforged, each with its own effect
  h=cut(h,"  greysteel:{n:'Greysteel'","  mossiron:{","  ashforged:{n:'Ashforged',r:'ashflux',q:1,ar:5,fx:'ashforge',short:'Each hit on the same enemy adds +8% to the next, up to +40%',pal:{W:'#ffffff',w:'#a8a6a4',G:'#3b3948'}},\n  devilforged:{n:'Devilforged',r:'devilflux',q:1,ar:6,fx:'devilforge',short:'+10% damage per devil mark you hold; crits deal +25% more',pal:{W:'#c41e2e',w:'#1e1820',G:'#0e0b12'}},\n");
  h=cut(h,"  {id:'gyf',","  {id:'sf',n:'Soul Flux',","  {id:'ashf',n:'Ash Flux',cost:{essence:14,cinder:3,soot:3},g:800,out:'ashflux',q:1,d:'Alloy reagent: Ashforged',mat:1},\n  {id:'devf',n:'Devil Flux',cost:{essence:24,hollowglass:2,titanstone:2,veilsilk:2},g:2000,out:'devilflux',q:1,d:'Alloy reagent: Devilforged',mat:1},\n");
  h=h.split("'gyf','ghf','vdf','ttf','vlf'").join("'ashf','devf'");
  h=P(h,"greyflux:'Grey Flux',ghostflux:'Ghost Flux',voidflux:'Void Flux',titanflux:'Titan Flux',veilflux:'Veil Flux',","ashflux:'Ash Flux',devilflux:'Devil Flux',");
  h=cut(h,"greyflux:['m_gem'","pactsteel:['m_chunk'","ashflux:['m_gem','#ffffff','#a8a6a4','#3b3948'],devilflux:['m_gem','#ff5a5a','#c41e2e','#0e0b12'],");
  h=P(h,"greyflux:'greysteel',ghostflux:'ghoststeel',voidflux:'hollowsteel',titanflux:'titansteel',veilflux:'veilsteel',","ashflux:'ashforged',devilflux:'devilforged',");
  h=P(h,"const FXN={","const FXN={ashforge:'Ashforged',devilforge:'Devilforged',");
  h=P(h,"const FXD={","const FXD={ashforge:'Each hit on the same enemy adds +8% damage to your next hit on it, up to +40%.',devilforge:'+10% damage for each devil mark you hold, and crits deal +25% more.',");
  h=P(h,"function uqFx(e,c,d,dmg,crit){const f=d.fx||[];","function uqFx(e,c,d,dmg,crit){const f=d.fx||[];if(f.includes('ashforge')){dmg*=1+(e.ashS||0)*.08;e.ashS=Math.min(5,(e.ashS||0)+1);}if(f.includes('devilforge')){const D=S.devils||{};dmg*=1+.1*((D.beat?1:0)+(D.beatc?1:0)+(D.beatv?1:0));if(crit)dmg*=1.25;}");
  // saves holding the old alloys or fluxes get the new ones
  h=P(h,"function migrate(s){const d=fresh();","function migrate(s){const d=fresh();{const AM={greysteel:'ashforged',ghoststeel:'ashforged',hollowsteel:'devilforged',titansteel:'devilforged',veilsteel:'devilforged'},FM={greyflux:'ashflux',ghostflux:'ashflux',voidflux:'devilflux',titanflux:'devilflux',veilflux:'devilflux'};if(s.mats)for(const k in FM)if(s.mats[k]){s.mats[FM[k]]=(s.mats[FM[k]]||0)+s.mats[k];delete s.mats[k];}const fa=it=>{if(it&&AM[it.al]){it.al=AM[it.al];const f=it.al==='ashforged'?'ashforge':'devilforge';it.fx=[...(it.fx||[]).filter(x=>x!==f),f];}};(s.bag||[]).forEach(fa);Object.values(s.gear||{}).forEach(fa);}");
  // Ascend: alloy tooltips, and no double clicks
  h=P(h,"'<button class=\"btn sm\" data-a=\"ascal\" data-v=\"'+m+'\">'","'<button class=\"btn sm\" data-a=\"ascal\" data-v=\"'+m+'\" data-tip=\"txt:'+ALLOYS[ALLOYOF[m]].n+': '+(ALLOYS[ALLOYOF[m]].short||'')+'\">'");
  h=P(h,"ascsup:v=>{const it=findItem(S.fsel),X=SUP[v];","ascsup:v=>{if(Date.now()<(UI.ascT||0))return;UI.ascT=Date.now()+500;const it=findItem(S.fsel),X=SUP[v];");
  h=P(h,"ascal:v=>{const it=findItem(S.fsel),k=ALLOYOF[v]","ascal:v=>{if(Date.now()<(UI.ascT||0))return;UI.ascT=Date.now()+500;const it=findItem(S.fsel),k=ALLOYOF[v]");
  h=P(h,"asc:()=>{const it=findItem(S.fsel);","asc:()=>{if(Date.now()<(UI.ascT||0))return;UI.ascT=Date.now()+500;const it=findItem(S.fsel);");
  // the devils' regions are named for the devils
  h=P(h,"dungeon:{name:'The Grinning Dark',","dungeon:{name:'The Hollow',");
  h=P(h,"dungeon:{name:'The Sleeping Giant',","dungeon:{name:'The Colossus',");
  h=P(h,"dungeon:{name:'Curtain Call',","dungeon:{name:'The Veiled',");
  h=P(h,"<h2>${D.name}</h2>","<h2>${S.area>=6&&!(S.bseen||{})[S.area]?'???':D.name}</h2>");
  h=P(h,"<span class=\"dim small\">${(S.bseen||{})[S.area]?boss.n:'???'} (Lv ${a.boss})</span>","<span class=\"dim small\">${S.area>=6?'Devil':(S.bseen||{})[S.area]?boss.n:'???'} (Lv ${a.boss})</span>");
  // the Last Stage: her puppets wander it
  h=P(h,"mobs:[\"vmario\",\"vdoll\",\"vweaver\"],dungeon:{name:'The Veiled',floors:[[\"vmario\",\"vdoll\"],[\"vmario\",\"vdoll\",\"vweaver\"]]","mobs:[\"vtoy0\",\"vtoy1\",\"vtoy2\"],dungeon:{name:'The Veiled',floors:[[\"vtoy0\",\"vtoy1\"],[\"vtoy0\",\"vtoy1\",\"vtoy2\"]]");
  h=P(h,"const MOB={\n","const MOB={\n  vtoy0:{ash:1,toy:0,n:'Painted Doll',hp:230,atk:30,def:8,spd:10,xp:24,gold:[8,12],drops:[['veilsilk',45],['pactsteel',25]],ab:[['bleed',28],['stun',12]],weak:'fire'},\n  vtoy1:{ash:1,toy:1,n:'Sack Doll',hp:250,atk:29,def:9,spd:8,xp:24,gold:[8,12],drops:[['veilsilk',40],['pactsteel',30]],ab:[['drain',26],['heal',10]],weak:'storm'},\n  vtoy2:{ash:1,toy:2,n:'Jester',hp:220,atk:32,def:7,spd:12,xp:24,gold:[8,12],drops:[['pactsteel',30],['veilsilk',30]],ab:[['poison',28],['stun',14]],weak:'frost'},\n");
  h=P(h,"e.intent=rollIntent(e);return e;}","if(b.toy!==undefined)e.toy=b.toy;e.intent=rollIntent(e);return e;}");
  h=P(h,"${e.id==='vmini'?DEVIL.toyImg(e.kind||0,up):","${e.id==='vmini'||e.toy!==undefined?DEVIL.toyImg(e.id==='vmini'?(e.kind||0):e.toy,up):");
  h=P(h,"const ELITE={","const ELITE={vtoy0:['The Prima Donna','Paintstripper'],vtoy1:['Stuffed King','Seamripper'],vtoy2:['The Last Laugh','Jokebreaker'],");
  h=P(h,"SPR.unmakero=SPR.unmaker;","for(const [a,b] of [['vtoy0','vdoll'],['vtoy1','vpuppet'],['vtoy2','vmario']]){SPR[a]=SPR[b];SPR[a+'@2']=SPR[b+'@2'];}\nSPR.unmakero=SPR.unmaker;");
  return h;}
module.exports={fix3};
