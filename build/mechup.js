// Underworld tab and shared unlock, real devil boss icons, a 10M Colossus, two puppets at most, alloy fluxes, unique weapon passives,
// supplement fixes, an Ascend station for weapons, a 150 cap per stat, devil regions Lv 50-100, and crit damage in the Shadow tree.
const {P}=require('./mech.js');
const FN="let TWR=0;\n"+
"function bossCard(id){const box=(ids,cx)=>'<div style=\"width:150px;height:112px;overflow:hidden;position:relative;background:#000;flex:none\"><div style=\"position:absolute;left:'+Math.round(75-cx*.75)+'px;top:0;width:256px;height:150px;transform:scale(.75);transform-origin:0 0\">'+DEVIL.stageBg({ctx:'devil',enemies:ids.map(x=>({id:x,hp:1,max:1,st:{},n:x})),target:0})+'</div></div>';if(id==='hollowd')return '<div style=\"width:150px;height:112px;background:#000;display:grid;place-items:center;flex:none\">'+DEVIL.bossImg({id:'hollowd'},true,3)+'</div>';if(id==='veild')return box(['veild'],150);if(id==='colface')return box(['colhand','colhand','colface'],168);return sprImg(id,3);}\n"+
// unique weapon passives
"function uqFx(e,c,d,dmg,crit){const f=d.fx||[];if(f.includes('grin')&&e.hp>e.max*.8)dmg*=1.6;if(f.includes('quake'))dmg*=1+Math.max(0,1-S.hp/d.maxHp)*.5;if(f.includes('void')&&e.boss)dmg*=1.15;if(f.includes('opening')&&c&&!c.opened){c.opened=1;dmg*=2;}if(c&&e.ashT&&e.ashT>=(c.tn||0))dmg*=1.25;if(f.includes('ashfall')&&crit&&c)e.ashT=(c.tn||0)+2;if(f.includes('curtain')&&c)dmg*=1+Math.min(.5,(c.curt||0)*.1);\n"+
"  if(f.includes('greylight')&&c&&chance(20))for(const x of c.enemies)if(x!==e&&x.hp>0){const s=Math.max(1,Math.round(dmg*.4));x.hp=Math.max(0,x.hp-s);fx('hp',{t:c.enemies.indexOf(x),hp:x.hp,max:x.max});if(x.hp<=0&&!x._dead){log(x.n+' falls.','kill');onKill(x);}}\n"+
"  return Math.max(1,Math.round(dmg));}\n"+
// the Ascend station
"function ascCost(it){const n=Math.min(5,(it.rar||0)+1),cr=Object.keys(CRYS).find(k=>CRYS[k].r===n);return {cr,q:2,e:20*n,g:Math.round(200*n*TM[it.tier||0])};}\n"+
"function ascPanel(it){if(it.slot!=='weapon'||it.veil)return itemCard(it,'',isWorn(it))+'<span class=\"empty-s\">Only weapons can ascend, and not the Black Crescent.</span>';\n"+
"  const c=ascCost(it),okR=it.rar<5&&c.cr&&(S.mats[c.cr]||0)>=c.q&&(S.mats.essence||0)>=c.e&&S.gold>=c.g;\n"+
"  const sups=Object.keys(SUP).filter(m=>SUP[m].to==='weapon'&&(S.mats[m]||0)>=SUP[m].q),xs=it.xs||0;\n"+
"  const fl=Object.keys(ALLOYOF).filter(m=>(S.mats[m]||0)>=ALLOYS[ALLOYOF[m]].q&&alloyOpen(ALLOYOF[m]));\n"+
"  return itemCard(it,'',isWorn(it))+'<h3>Rarity</h3>'+(it.rar>=5?'<span class=\"tag good\">Mythic</span>':'<div class=\"cost\">'+needTag(c.cr,c.q)+needTag('essence',c.e)+goldTag(c.g)+'</div><button class=\"btn primary\" data-a=\"asc\" '+(okR?'':'disabled')+'>Ascend to '+RAR[it.rar+1].n+'</button>')+\n"+
"  '<h3>Add a supplement <span class=\"dim small\">'+xs+'/2</span></h3>'+(xs>=2?'<span class=\"dim small\">This weapon has taken all it can.</span>':'<div class=\"row\">'+(sups.map(m=>'<button class=\"btn sm\" data-a=\"ascsup\" data-v=\"'+m+'\" data-tip=\"mat:'+m+'\">'+matImg(m,2)+' '+MATS[m]+' ×'+SUP[m].q+'</button>').join('')||'<span class=\"dim small\">No weapon supplements in your bag.</span>')+'</div>')+\n"+
"  '<h3>Re-alloy</h3><div class=\"row\">'+(fl.map(m=>'<button class=\"btn sm\" data-a=\"ascal\" data-v=\"'+m+'\">'+matImg(m,2)+' '+ALLOYS[ALLOYOF[m]].n+'</button>').join('')||'<span class=\"dim small\">No alloy flux in your bag. Craft one under Crafting.</span>')+'</div>';}\n";
const ACTS="  world:v=>{UI.world=v;},\n"+
"  asc:()=>{const it=findItem(S.fsel);if(!it||it.slot!=='weapon'||it.veil||it.rar>=5)return;const c=ascCost(it);if(!c.cr||(S.mats[c.cr]||0)<c.q||(S.mats.essence||0)<c.e||S.gold<c.g)return;S.mats[c.cr]-=c.q;S.mats.essence-=c.e;S.gold-=c.g;it.rar++;fx('strike',{perfect:true});clampVitals();toast(it.name+' is now '+RAR[it.rar].n);},\n"+
"  ascsup:v=>{const it=findItem(S.fsel),X=SUP[v];if(!it||it.slot!=='weapon'||it.veil||!X||X.to!=='weapon'||(it.xs||0)>=2||(S.mats[v]||0)<X.q)return;S.mats[v]-=X.q;it.xs=(it.xs||0)+1;if(X.aff)for(const k in X.aff){const val=supVal(k,X.aff[k],it.tier||0);const ex=it.affixes.find(a=>a.id===k&&!a.al);if(ex)ex.v+=val;else it.affixes.push({id:k,v:val});}if(X.fx&&!(it.fx||[]).includes(X.fx))it.fx=[...(it.fx||[]),X.fx];fx('strike',{perfect:true});clampVitals();toast('The weapon takes the '+MATS[v]);},\n"+
"  ascal:v=>{const it=findItem(S.fsel),k=ALLOYOF[v],A=k&&ALLOYS[k];if(!it||it.slot!=='weapon'||it.veil||!A||(S.mats[v]||0)<A.q)return;S.mats[v]-=A.q;const old=it.al&&ALLOYS[it.al];it.affixes=it.affixes.filter(a=>!a.al);if(old&&old.fx)it.fx=(it.fx||[]).filter(f=>f!==old.fx);it.al=k;if(A.aff)for(const a in A.aff)it.affixes.push({id:a,v:supVal(a,A.aff[a],it.tier||0),al:1});if(A.fx&&!(it.fx||[]).includes(A.fx))it.fx=[...(it.fx||[]),A.fx];if(!it.uq)it.name=itemName(it);fx('strike',{perfect:true});clampVitals();toast('Re-alloyed as '+A.n);},\n";
function up(h){
  h=P(h,"function kingCalls(e,c,i){",FN+"function kingCalls(e,c,i){");
  h=P(h,"  ssave:v=>{",ACTS+"  ssave:v=>{");
  // all three devil regions open together, on their own Underworld tab
  h=P(h,"S.unlocked=Math.min(AREAS.length,Math.max(S.unlocked,D.area+2));loot.unlock=D.area+1<AREAS.length?","S.unlocked=Math.min(AREAS.length,Math.max(S.unlocked,D.area===5?9:D.area+2));loot.unlock=D.area>=6?null:D.area===5?'The Underworld':D.area+1<AREAS.length?");
  h=P(h,"if((s.cleared||[]).includes(4))s.unlocked=Math.max(s.unlocked||1,6);","if((s.cleared||[]).includes(4))s.unlocked=Math.max(s.unlocked||1,6);if((s.cleared||[]).includes(5))s.unlocked=Math.max(s.unlocked||1,9);");
  h=P(h,"const areas=AREAS.map((x,i)=>{if(i>S.unlocked)return '';","const UW=S.unlocked>6,WD=UI.world||(S.area>=6?'under':'over');const areas=(UW?'<div class=\"row\" style=\"gap:6px;margin-bottom:6px\"><button class=\"btn sm '+(WD==='over'?'tab on':'')+'\" data-a=\"world\" data-v=\"over\">Overworld</button><button class=\"btn sm '+(WD==='under'?'tab on':'')+'\" data-a=\"world\" data-v=\"under\">Underworld</button></div>':'')+AREAS.map((x,i)=>{if(UW&&((i>=6)!==(WD==='under')))return '';if(i>S.unlocked)return '';");
  // the boss card shows the devil itself
  h=P(h,"(S.bseen||{})[S.area]?sprImg(({hollowd:'dhollow',colface:'dcolossus',veild:'dveiled'})[D.boss]||D.boss,3):","(S.bseen||{})[S.area]?bossCard(D.boss):");
  // the Colossus: 10 million, his arms 2 million each; the Veiled: two puppets at most
  h=P(h,"startCombat(list,'dungeon');const c=C();c.dv=","if(id==='colface')for(const x of list){x.hp=x.max=x===e?10000000:2000000;}startCombat(list,'dungeon');const c=C();c.dv=");
  h=P(h,"if(c.vt%(R.hp<R.max/2?2:3)!==1||up.length>=3)return;","if(c.vt%(R.hp<R.max/2?2:3)!==1||up.length>=2)return;");
  // alloy fluxes for the Ashen and Devil alloys
  h=P(h,"const ALLOYOF={cinder:'greysteel',soot:'ghoststeel',hollowglass:'hollowsteel',titanstone:'titansteel',veilsilk:'veilsteel',","const ALLOYOF={greyflux:'greysteel',ghostflux:'ghoststeel',voidflux:'hollowsteel',titanflux:'titansteel',veilflux:'veilsteel',");
  for(const [a,b] of [["r:'cinder',q:2,ar:5","r:'greyflux',q:1,ar:5"],["r:'soot',q:2,ar:5","r:'ghostflux',q:1,ar:5"],["r:'hollowglass',q:2,ar:6","r:'voidflux',q:1,ar:6"],["r:'titanstone',q:2,ar:7","r:'titanflux',q:1,ar:6"],["r:'veilsilk',q:2,ar:8","r:'veilflux',q:1,ar:6"]])h=P(h,a,b);
  h=P(h,"  {id:'sf',n:'Soul Flux',","  {id:'gyf',n:'Grey Flux',cost:{essence:12,cinder:3},g:600,out:'greyflux',q:1,d:'Alloy reagent: Greysteel',mat:1},\n  {id:'ghf',n:'Ghost Flux',cost:{essence:12,soot:3},g:600,out:'ghostflux',q:1,d:'Alloy reagent: Ghoststeel',mat:1},\n  {id:'vdf',n:'Void Flux',cost:{essence:15,hollowglass:3},g:1000,out:'voidflux',q:1,d:'Alloy reagent: Hollowsteel',mat:1},\n  {id:'ttf',n:'Titan Flux',cost:{essence:15,titanstone:3},g:1000,out:'titanflux',q:1,d:'Alloy reagent: Titansteel',mat:1},\n  {id:'vlf',n:'Veil Flux',cost:{essence:15,veilsilk:3},g:1000,out:'veilflux',q:1,d:'Alloy reagent: Veilsteel',mat:1},\n  {id:'sf',n:'Soul Flux',");
  h=h.split("['ef','bf','sf'").join("['ef','bf','sf','gyf','ghf','vdf','ttf','vlf'");
  h=P(h,"const MATS={","const MATS={greyflux:'Grey Flux',ghostflux:'Ghost Flux',voidflux:'Void Flux',titanflux:'Titan Flux',veilflux:'Veil Flux',");
  h=P(h,"const MATICON={","const MATICON={greyflux:['m_gem','#ffffff','#a8a6a4','#3b3948'],ghostflux:['m_gem','#ffffff','#d9ccff','#3b3948'],voidflux:['m_gem','#c9c2d6','#2a2433','#0e0b12'],titanflux:['m_gem','#ff5a5a','#c41e2e','#3a2a36'],veilflux:['m_gem','#e8e0cc','#8a1a26','#1e1820'],");
  // supplements: no more copies of other effects, and the Titan Heart is only defense now
  h=P(h,"hollowsoul:{q:1,fx:'soul',d:'Kills restore 10% HP'}","hollowsoul:{q:1,fx:'void',d:'+15% damage to bosses'}");
  h=P(h,"titanheart:{q:1,fx:'stoneskin',d:'Take 15% less damage'}","titanheart:{q:1,d:'+1,000 max HP per tier'}");
  h=P(h,"function supLine(m,t){const X=SUP[m];if(!X)return '';","function supLine(m,t){const X=SUP[m];if(!X)return '';if(m==='titanheart')return '+'+(1000*((t||0)+1)).toLocaleString()+' Max HP';");
  h=P(h,"for(const s of sp.sup){const X=SUP[s];if(X.fx)fxs.push(X.fx);if(X.aff)add(X.aff);}","for(const s of sp.sup){const X=SUP[s];if(X.fx)fxs.push(X.fx);if(X.aff)add(X.aff);if(s==='titanheart'){const hv=1000*((sp.tier||0)+1),ex=affs.find(x=>x.id==='hp');if(ex)ex.v+=hv;else affs.push({id:'hp',v:hv});}}");
  h=P(h,"veilheart:{q:1,fx:'crown',d:'Crits deal +20% damage'}","veilheart:{q:1,fx:'opening',d:'Your first hit in each fight deals double damage'}");
  // unique weapons each get their own passive
  h=P(h,"fx:'erupt',col:'#d9ccff',a:'Last Light',d:'Crits erupt for 50% damage to all other enemies'","fx:'ashfall',col:'#d9ccff',a:'Ashfall',d:'Crits mark the enemy: it takes 25% more damage for 2 turns'");
  h=P(h,"fx:'prism',col:'#d9ccff',a:'Prism',d:'Elemental hits split onto another enemy for 40%'","fx:'greylight',col:'#d9ccff',a:'Grey Light',d:'20% chance per hit to strike every other enemy for 40%'");
  h=P(h,"fx:'sever',col:'#9cc8ff',a:'Sever',d:'Ignore 30% of enemy defense'","fx:'grin',col:'#9cc8ff',a:'First Cut',d:'+60% damage to enemies above 80% HP'");
  h=P(h,"fx:'stoneskin',col:'#f2c14e',a:'Stoneskin',d:'Take 15% less damage'","fx:'quake',col:'#f2c14e',a:'Last Stand',d:'+1% damage for every 2% HP you are missing'");
  h=P(h,"fx:'edict',col:'#c43c3c',a:'Edict',d:'+50% damage to enemies under 30% HP'","fx:'curtain',col:'#c43c3c',a:'Encore',d:'Each kill gives +10% damage for the rest of the fight, up to +50%'");
  h=P(h,"const FXN={","const FXN={ashfall:'Ashfall',greylight:'Grey Light',grin:'First Cut',quake:'Last Stand',curtain:'Encore',void:'Void',opening:'Opening Act',");
  h=P(h,"const FXD={","const FXD={ashfall:'Crits mark the enemy: it takes 25% more damage for 2 turns.',greylight:'20% chance per hit to strike every other enemy for 40%.',grin:'+60% damage to enemies above 80% HP.',quake:'+1% damage for every 2% HP you are missing.',curtain:'Each kill gives +10% damage for the rest of the fight, up to +50%.',void:'+15% damage to bosses.',opening:'Your first hit in each fight deals double damage.',");
  h=P(h,"const UQAURA={","const UQAURA={ashfall:'dust:#e6e1d3',greylight:'gleam:#d9ccff',grin:'haze:#9cc8ff',quake:'dust:#c41e2e',curtain:'haze:#8a1a26',");
  h=P(h,"let dmg=base*elMult(e,el);if(crit)dmg*=d.critd;dmg=Math.max(1,Math.round(dmg));","let dmg=base*elMult(e,el);if(crit)dmg*=d.critd;dmg=Math.max(1,Math.round(dmg));dmg=uqFx(e,c,d,dmg,crit);");
  h=P(h,"log(`${e.n} falls.`,'kill');onKill(e);if(e.id==='firstash'","log(`${e.n} falls.`,'kill');onKill(e);if((d.fx||[]).includes('curtain'))c.curt=(c.curt||0)+1;if(e.id==='firstash'");
  // the Ascend station
  h=P(h,"['temper','Temper'],...(hasForge()","['temper','Temper'],['ascend','Ascend'],...(hasForge()");
  h=P(h,"if(it){if(isT){","if(it){if(f.tab==='ascend')panel=ascPanel(it);else if(isT){");
  // 150 points at most in any one stat
  h=P(h,"stat:v=>{if(S.pts>0){S.stats[v]++;S.pts--;}}","stat:v=>{if(S.pts>0&&(S.stats[v]||0)<150){S.stats[v]++;S.pts--;}}");
  h=P(h,"const q=n==='max'?S.pts:Math.min(S.pts,+n);S.stats[k]+=q;","const q=Math.max(0,Math.min(150-(S.stats[k]||0),n==='max'?S.pts:Math.min(S.pts,+n)));S.stats[k]+=q;");
  // the devil regions run from level 50 to 100, and their monsters grow more slowly past 50
  h=h.split("lv:[50,50],boss:50,").join("lv:[50,100],boss:50,");
  h=h.split("A.lv[1]+D.stage").join("(D.area>=6?Math.min(A.lv[1],Math.max(A.lv[0],S.lvl)):A.lv[1])+D.stage");
  h=P(h,"mkElite(pick(a.mobs),a.lv[1]+1)","mkElite(pick(a.mobs),(S.area>=6?Math.min(a.lv[1],Math.max(a.lv[0],S.lvl)):a.lv[1])+1)");
  h=P(h,"const Le=b.ash?24.5+Math.max(0,L-35)*.3:","const Le=b.ash?24.5+(TWR?Math.max(0,L-35)*.3:Math.min(15,Math.max(0,L-35))*.3+Math.max(0,L-50)*.12):");
  h=P(h,"function spawnTower(){","function spawnTower(){TWR=1;try{spawnTower0();}finally{TWR=0;}}\nfunction spawnTower0(){");
  // the Shadow tree trades crit chance for crit damage
  h=P(h,"cruelty:PS2('Cruelty','target',{crit:2},['+2% crit','+4% crit','+6% crit'])","cruelty:PS2('Cruelty','target',{critd:.06},['+6% crit damage','+12% crit damage','+18% crit damage'])");
  h=P(h,"brimming:PA('Brimming','+5% crit at 75 Malice or more','+10% crit at 75 Malice or more','+15% crit at 75 Malice or more')","brimming:PA('Brimming','+12% crit damage at 75 Malice or more','+24% crit damage at 75 Malice or more','+36% crit damage at 75 Malice or more')");
  h=P(h,"if(trk('brimming')&&S.mp>=75)b.crit=(b.crit||0)+5*trk('brimming');","if(trk('brimming')&&S.mp>=75)b.critd=(b.critd||0)+.12*trk('brimming');");
  return h;}
module.exports={up};
