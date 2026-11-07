// Charged boss patch. Boss spends a turn charging, then fires a flat big hit scaled from its own ATK. No percent damage.
const {P}=require('./mech.js');
const MOBS=[['scorp','Glass Scorpion',30,7.5],['wraith','Sand Wraith',24,9],['raider','Dune Raider',34,7.5],['imp','Magma Imp',39,11.3],['drake','Ash Drake',54,11.3],['golem','Obsidian Golem',72,9.4],['knight','Ash Knight',38,8.1],['cwraith','Court Wraith',26,9.3],['gargoyle','Gargoyle',36,8.1],['stalker','Storm Eel',81,6.5],['sentinel','Drowned Knight',94.5,6.3],['siren','Tide Siren',67.5,7]];
const BOSS={warden:['The Rotting Warden',17,5],queen:['Queen of Shards',40,8],tyrant:['The Ember Tyrant',45,11],hking:['The Hollow King',36,8],unmaker:['The Leviathan',60,5]};
const CUE={warden:'sinks its roots and swells',queen:'draws every shard into a spear',tyrant:'gathers magma in its fists',hking:'raises a hand and the air goes still',unmaker:'opens its maw and a beam begins to build'};
const r1=x=>Math.round(x*10)/10;
function mech2(h,o){
  o=Object.assign({basic:.75,mobHp:.7,stormAtk:1.4,guardBig:.15,boss:{},mech:{}},o);
  MOBS.forEach(([id,n,hp,atk],ix)=>{const st=ix>=9?o.stormAtk:1,A=(o.area||[])[Math.floor(ix/3)]||[1,1];h=P(h,`${id}:{n:'${n}',hp:${hp},atk:${atk},`,`${id}:{n:'${n}',hp:${r1(hp*o.mobHp*A[0])},atk:${r1(atk*st*A[1])},`);});
  for(const id in o.boss){const [n,hp,atk]=BOSS[id];h=P(h,`${id}:{n:'${n}',hp:${hp},atk:${atk},`,`${id}:{n:'${n}',hp:${o.boss[id][0]},atk:${o.boss[id][1]},`);}
  const M=Object.entries(o.mech).map(([k,v])=>`${k}:{every:${v[0]},mult:${v[1]},cue:${JSON.stringify(CUE[k])}}`).join(',');
  h=P(h,"function enemyAct(c,e){",`// bosses spend a turn charging their signature move, then fire it: answer with Guard, a shield or an evade, or stun/freeze to cancel it
const BOSSMECH={${M}};
const BOSSBIG={unmaker:'Abyssal Beam'};
const bossMech=(c,e)=>e.boss&&c.ctx!=='duel'&&c.ctx!=='pvp'&&BOSSMECH[e.id];
const sigName=(e,k)=>k==='heavy'&&e.big&&BOSSBIG[e.id]||BOSSSIG[e.id]&&BOSSSIG[e.id][k];
function bossCC(e){const c=C();if(!e.boss||!bossMech(c,e))return false;if(e.ccImm>0){log(\`\${e.n} shrugs it off.\`,'hurt');return true;}e.ccImm=3;if(e.big){delete e.big;delete e.maw;e.bt=0;e.intent='atk';e.exposed=1;log(\`\${e.n}'s charge is broken! It is exposed.\`,'buff');}return false;}
function enemyAct(c,e){`);
  h=P(h,"const ab0=e.intent||'atk';e.intent=rollIntent(e);const ab=ab0==='atk'?null:ab0;",
  "const BM=bossMech(c,e);let big=false;if(e.exposed)delete e.exposed;if(e.ccImm)e.ccImm--;if(BM&&e.intent==='charge'){e.big=true;if(e.id==='unmaker')e.maw=true;e.intent='heavy';e.bt=0;log(`${e.n} ${BM.cue}! Guard, shield or stun it.`,'boss');fx('bcharge',{t:i,col:chargeCol(e,'heavy')});fx('num',{t:i,txt:'Charging',cls:'crit'});fxAt+=460;return;}if(BM&&e.big){big=true;if(c.ps.guard||c.ps.pguard||c.ps.evade||c.ps.veil||c.ps.shield){e.exposed=1;log(`You weather it. ${e.n} is exposed!`,'buff');fx('num',{t:i,txt:'Exposed',cls:'crit'});}}\n  const ab0=e.intent||'atk';e.intent=rollIntent(e);const ab=ab0==='atk'?null:ab0;\n  if(BM&&!big){e.bt=(e.bt||0)+1;if(e.bt>=BM.every)e.intent='charge';}");
  h=P(h,"const sig=e.boss&&ab&&BOSSSIG[e.id]&&BOSSSIG[e.id][ab];","const sig=e.boss&&ab&&sigName(e,ab);if(big){delete e.big;delete e.maw;}");
  h=P(h,"fx('bsig',{t:i,id:e.id,ab});","fx('bsig',{t:i,id:e.id,ab,big});");
  h=P(h,"if(chance(d.dodge+(c.ps.veil?(trk('veil')>=3?60:40):0))){","if(big?c.ps.veil:chance(d.dodge+(c.ps.veil?(trk('veil')>=3?60:40):0))){");
  h=P(h,"if(pc&&chance(pc)){log(`You parry","if(!big&&pc&&chance(pc)){log(`You parry");
  h=P(h,"let dmg=calc(e.atk*(ab==='heavy'?1.6:1)*chillRed,d.def*(1-(e.pierce||0)))*(1-d.dr/100);dmg=Math.max(1,Math.round(dmg));","let dmg=calc(e.atk*(big?BM.mult:ab==='heavy'?1.6:1)*chillRed,d.def*(1-(e.pierce||0)))*(1-d.dr/100);if(c.ps.guard)dmg*=big?"+o.guardBig+":.5;dmg=Math.max(1,Math.round(dmg));");
  h=P(h,"if(c.ps.shield){const a=Math.min(c.ps.shield,part);","if(c.ps.shield){const a=Math.min(c.ps.shield,big?Math.ceil(part/2):part);");
  h=P(h,"pguard:'st_shield',mark:'st_brk'}[k]","pguard:'st_shield',guard:'st_shield',mark:'st_brk'}[k]");
  h=P(h,"for(const k of ['veil','riposte','emberward','rage','staticward'])","for(const k of ['veil','riposte','emberward','rage','staticward','guard'])");
  h=P(h,"function stun(e){e.st.stun={t:1};","function stun(e){if(bossCC(e))return;e.st.stun={t:1};");
  h=P(h,"function freeze(e){if(trk('coldblood'))","function freeze(e){if(bossCC(e)){delete e.st.chill;return;}if(trk('coldblood'))");
  h=P(h,"bonus*=swordBonus(e,c,o);","bonus*=swordBonus(e,c,o);if(e.exposed)bonus*=1.5;if(e.id==='hking'&&bossMech(c,e)&&c.enemies.some(x=>x.id==='knight'&&x.hp>0))bonus*=.5;");
  h=P(h,"log('The Hollow King calls a knight to his side!','boss');","log('The Hollow King calls a knight to his side! He takes half damage while it stands.','boss');");
  h=P(h,"function estHit(e,ab){const d=derive();const raw=Math.max(.5,e.atk*(ab==='heavy'?1.6:1));return Math.max(1,Math.round(raw*raw/(raw+Math.max(0,d.def))*(1-d.dr/100)));}",
  "function estHit(e,ab){const d=derive();const M=e.big&&BOSSMECH[e.id];const raw=Math.max(.5,e.atk*(M?M.mult:ab==='heavy'?1.6:1));return Math.max(1,Math.round(calc(raw,d.def*(1-(e.pierce||0)))*(1-d.dr/100)));}");
  // intent display
  h=P(h,"const INTS={atk:'',heavy:'Heavy',","const INTS={charge:'Charging',atk:'',heavy:'Heavy',");
  h=P(h,"const INTN={atk:'Attack',","const INTN={charge:'Next turn it starts charging a huge attack',atk:'Attack',");
  h=P(h,"const dmgIntent=k=>!['heal','shield'].includes(k);","const dmgIntent=k=>!['heal','shield','charge'].includes(k);");
  h=P(h,"<span class=\"intent ${e.intent==='heavy'||e.intent==='stun'?'warn':''}\">","<span class=\"intent ${e.intent==='heavy'||e.intent==='stun'||e.intent==='charge'?'warn':''}\">");
  h=P(h,"${e.boss&&BOSSSIG[e.id]&&BOSSSIG[e.id][e.intent]?`<small>${BOSSSIG[e.id][e.intent]}</small>`:","${e.boss&&sigName(e,e.intent)?`<small>${sigName(e,e.intent)}</small>`:");
  h=P(h,"${dmgIntent(e.intent)?`<small class=\"num\">~${estHit(e,e.intent)}</small>`:''}</span>","${e.big?'<small>Guard!</small>':''}${dmgIntent(e.intent)?`<small class=\"num\">~${estHit(e,e.intent)}</small>`:''}</span>");
  // Leviathan: open-mouth frame, charge sparks gather at the mouth, and a beam
  h=P(h,"function x2f(name,i){","// open-mouth Leviathan: the lower jaw swings down from a hinge behind the teeth\nSPR.unmakero=SPR.unmaker;SPR['unmakero@2']=SPR['unmaker@2'].map((_,y,g)=>{let r='';for(let x=0;x<g[y].length;x++){const s=x<46?Math.round(7*(46-x)/46):0;const row=g[y];if(y<39||!s){r+=row[x];continue;}if(y<39+s){r+=(g[38][x]==='.'?'.':x<3?'k':(y===39||y===38+s)?'k':'K');continue;}r+=(g[y-s]||'')[x]||'.';}return r;});ANIM.unmakero='breathe';\nfunction x2f(name,i){");
  h=P(h,"sprImg(e.id,e.id==='unmaker'?ps+Math.ceil(ps/3):ps,up?'idle body':'body')","sprImg(e.maw&&up?'unmakero':e.id,e.id==='unmaker'?ps+Math.ceil(ps/3):ps,up?'idle body':'body')");
  h=P(h,"function sprEl(el){","const mawAt=s=>{const r=s.getBoundingClientRect();return {x:r.left+r.width*.07,y:r.top+r.height*.5,r};};\nfunction sprEl(el){");
  h=P(h,"if(!s)return;const c=ctr(s),col=(f.dataset.chg||'#f4efe4').split(',');","if(!s)return;const c=f.classList.contains('huge')?mawAt(s):ctr(s),col=(f.dataset.chg||'#f4efe4').split(',');");
  h=P(h,"if(e.id==='unmaker'){sfx('frost');const top=A.r.top-50,bot=A.r.bottom;","if(e.id==='unmaker'&&e.big){sfx('frost');flash('#c4ecff',120);const M=mawAt(f);const ly=(x0,y0,x1,y1,c,s)=>pline(x0,y0-s/2,x1,y1-s/2,c,s);\n      fxo(760,t=>{const g=Math.min(1,t*6),x=M.x+(A.x-M.x)*g,y=M.y+(A.y-M.y)*g,w=t<.15||t>.82?1:t>.68?2:3;ly(M.x,M.y,x,y,'#1d4560',GU*2*w+GU*2);ly(M.x,M.y,x,y,'#3a5ea8',GU*2*w);ly(M.x,M.y,x,y,'#6fb7e8',GU*w+GP);ly(M.x,M.y,x,y,'#ffffff',GP*w);});\n      setTimeout(()=>{burst(A.x,A.y,{n:44,col:['#c4ecff','#6fb7e8','#ffffff'],spd:6,grav:.12,life:34});shake(11);},TS(130));return;}\n    if(e.id==='unmaker'){sfx('frost');const top=A.r.top-50,bot=A.r.bottom;");
  // Guard action
  h=P(h,"  attack:()=>{turn(()=>{","  guard:()=>{const c=C();if(!c||c.ctx==='duel'||c.ctx==='pvp')return;turn(()=>{const d=derive();C().ps.guard=1;C().lastAct='Guard';S.mp=Math.min(d.maxMp,S.mp+Math.ceil(d.maxMp*.08));log('You brace yourself.','buff');fx('num',{t:'p',txt:'Guard',cls:'miss'});});},\n  attack:()=>{turn(()=>{");
  h=P(h,"<button class=\"mi\" data-a=\"menu\" data-v=\"items\">Items<small>▸</small></button>\n","<button class=\"mi\" data-a=\"menu\" data-v=\"items\">Items<small>▸</small></button>\n      ${c.ctx==='duel'||c.ctx==='pvp'?'':'<button class=\"mi\" data-a=\"guard\" data-tip=\"txt:Halve damage until your next turn, and take "+Math.round((1-o.guardBig)*100)+"% less from a charged boss move. Restores some MP.\">Guard<small>turn</small></button>'}\n");
  h=P(h,"const m=S.autoMove||'attack',s=SK[m];if(m!=='attack'","if(c.enemies.some(e=>e.big&&e.hp>0)){ACT.guard();render();return;}const m=S.autoMove||'attack',s=SK[m];if(m!=='attack'");
  h=P(h,"perform(basicFx(),e,()=>hit(e,1));","perform(basicFx(),e,()=>hit(e,C().ctx==='duel'||C().ctx==='pvp'?1:"+o.basic+"));");
  if(o.gear){const g=o.gear;
    // supplements are exclusive to weapons or armor
    h=P(h,"// flat stats grow like the tier's base stats; percent stats gain 25% per tier","for(const m of ['shard','venom','ember','crown','flame','kingsoul','starshard','voidsilk'])SUP[m].to='weapon';for(const m in SUP)if(!SUP[m].to)SUP[m].to='armor';\n// flat stats grow like the tier's base stats; percent stats gain 25% per tier");
    h=P(h,"const sup=(f.sups||[]).filter(m=>SUP[m]&&m!==base).slice(0,2)","const sup=(f.sups||[]).filter(m=>SUP[m]&&m!==base&&(!cat||SUP[m].to===(cat==='weapon'?'weapon':'armor'))).slice(0,2)");
    h=P(h,"const sups=Object.keys(SUP).filter(m=>(S.mats[m]||0)>0&&m!==f.metal).map(","const sups=Object.keys(SUP).filter(m=>(S.mats[m]||0)>0&&m!==f.metal&&SUP[m].to===cat).map(");
    h=P(h,"if(SUP[m])role.push(`Supplement · ${supLine(m,tierNow())}`);","if(SUP[m])role.push(`Supplement (${SUP[m].to} only) · ${supLine(m,tierNow())}`);");
    // bigger tier jumps
    h=P(h,"const TM=[1,2.4,5,8,12];","const TM="+JSON.stringify(g.TM)+";");
    // weaker upgrades
    h=P(h,"const supVal=(k,v,t)=>SCALED.includes(k)?Math.round(v*TMA[t||0]):Math.round(v*(1+(t||0)*.25));","const supVal=(k,v,t)=>Math.max(1,SCALED.includes(k)?Math.round(v*TMA[t||0]*"+g.sup+"):Math.round(v*(1+(t||0)*.25)*"+g.sup+"));");
    h=P(h,"GMUL=[1,2,3.5,5.5,8]","GMUL="+JSON.stringify(g.GMUL));
    h=P(h,"const QUAL=[['Crude',.85],['Standard',1],['Fine',1.1],['Superior',1.2],['Masterwork',1.35]];","const QUAL="+JSON.stringify(g.QUAL.map((q,i)=>[['Crude','Standard','Fine','Superior','Masterwork'][i],q]))+";");
    h=P(h,"Quality: 0.85× to 1.35× base stats","Quality: "+g.QUAL[0]+"× to "+g.QUAL[4]+"× base stats");
    h=P(h,"GSTEP=[0,1,2,2,3,4]","GSTEP="+JSON.stringify(g.GSTEP));
    h=P(h,"(1+it.plus*(it.slot==='weapon'?.05:.1))","(1+it.plus*(it.slot==='weapon'?"+g.tw+":"+g.ta+"))");
    h=P(h,"const affVal=(it,a)=>Math.round(a.v*(1+(it.slot==='weapon'?0:it.plus*.1)));","const affVal=(it,a)=>Math.round(a.v*(1+(it.slot==='weapon'?0:it.plus*"+g.ta+")));");
    h=P(h,"(+10% stats)","(+"+Math.round(g.ta*100)+"% stats)");
    h=P(h,"const ENCHBASE={keen:{crit:8,critd:.25},vampiric:{ls:5},verdant:{regen:2},bulwark:{dr:10},fortune:{gold:20,xp:10},swift:{spd:4},thorns:{thorns:25},warding:{resist:30}};","const ENCHBASE={keen:{crit:5,critd:.15},vampiric:{ls:3},verdant:{regen:1},bulwark:{dr:6},fortune:{gold:20,xp:10},swift:{spd:3},thorns:{thorns:15},warding:{resist:20}};");
    for(const [a,b] of [["d:'+8% crit, crits deal +25%'","d:'+5% crit, crits deal +15%'"],["d:'5% lifesteal'","d:'3% lifesteal'"],["d:'Regenerate 2% HP each turn',cost","d:'Regenerate 1% HP each turn',cost"],["d:'Take 10% less damage',cost","d:'Take 6% less damage',cost"],["d:'+4 SPD'","d:'+3 SPD'"],["d:'Reflect 25% of damage taken'","d:'Reflect 15% of damage taken'"],["d:'30% chance to resist status effects'","d:'20% chance to resist status effects'"],
      ["keen:'+12% crit, crits deal +37.5%',vampiric:'7.5% lifesteal',verdant:'Regenerate 3% HP each turn',bulwark:'Take 15% less damage'","keen:'+7.5% crit, crits deal +22.5%',vampiric:'4.5% lifesteal',verdant:'Regenerate 1.5% HP each turn',bulwark:'Take 9% less damage'"],["swift:'+6 SPD',thorns:'Reflect 37.5% of damage taken',warding:'45% chance to resist status effects'","swift:'+4.5 SPD',thorns:'Reflect 22.5% of damage taken',warding:'30% chance to resist status effects'"]])h=P(h,a,b);
  }
  if(o.gear&&o.gear.rarW)h=require('./mechrar.js').rar(h,o.gear);
  h=require('./mechui.js').ui(h);if(o.gear&&o.gear.mage)h=require('./mechmage.js').mage(h);if(o.gear)h=require('./mechexp.js').exp(h,o.gear);if(o.gear&&o.gear.devil)h=require('./mechdevil.js').devil(h);if(o.gear&&o.gear.pact)h=require('./mechpact.js').pact(h);if(o.gear&&o.gear.next){h=require('./mechnext.js').next(h);h=require('./mechmarks.js').marks(h);h=require('./mechveil.js').veil(h);h=require('./mechblade.js').blade(h);h=require('./mechmodels.js').models(h);h=require('./mechpopup.js').popup(h);h=require('./mechcrescent.js').crescent(h);}
  return h;}
module.exports={mech2};
