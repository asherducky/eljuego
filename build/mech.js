// Tactical boss patch. mech(html, opts) returns patched html; used by cmp2.js and to produce the final build.
const P=(h,a,b)=>{if(h.split(a).length!==2)throw new Error('no unique match: '+a.slice(0,80));return h.split(a).join(b);};
const MOBS=[['scorp','Glass Scorpion',30,7.5],['wraith','Sand Wraith',24,9],['raider','Dune Raider',34,7.5],['imp','Magma Imp',39,11.3],['drake','Ash Drake',54,11.3],['golem','Obsidian Golem',72,9.4],['knight','Ash Knight',38,8.1],['cwraith','Court Wraith',26,9.3],['gargoyle','Gargoyle',36,8.1],['stalker','Storm Eel',81,6.5],['sentinel','Drowned Knight',94.5,6.3],['siren','Tide Siren',67.5,7]];
const BOSS={warden:['The Rotting Warden',17,5],queen:['Queen of Shards',40,8],tyrant:['The Ember Tyrant',45,11],hking:['The Hollow King',36,8],unmaker:['The Leviathan',60,5]};
function mech(h,o){
  o=Object.assign({basic:.7,mobHp:1,mobAtk:1,mech:{warden:[4,.4],queen:[3,.55],tyrant:[3,.65],hking:[4,.7],unmaker:[3,.75]},boss:{},burstCap:false,floor:0,floorH:0,guardBig:.15},o);
  for(const [id,n,hp,atk] of MOBS)if(o.mobHp!==1||o.mobAtk!==1)h=P(h,`${id}:{n:'${n}',hp:${hp},atk:${atk},`,`${id}:{n:'${n}',hp:${Math.round(hp*o.mobHp*10)/10},atk:${Math.round(atk*o.mobAtk*10)/10},`);
  if(o.stormAtk){for(const [id,n,hp,atk] of MOBS.slice(-3)){const nh=Math.round(hp*o.mobHp*10)/10,na=Math.round(atk*o.mobAtk*10)/10;h=P(h,id+":{n:'"+n+"',hp:"+nh+",atk:"+na+",",id+":{n:'"+n+"',hp:"+nh+",atk:"+Math.round(na*o.stormAtk*10)/10+",");}}
  if(o.mageShield){const sc=(arr)=>arr.map(x=>Math.round(x*o.mageShield*20)/20);const rs=(name,vals,txt)=>{const nv=sc(vals);h=P(h,"shield(d.atk*rv('"+name+"',["+vals.join(',')+"]))","shield(d.atk*rv('"+name+"',["+nv.join(',')+"]))");vals.forEach((v,i)=>{const from="'Shield of "+Math.round(v*100)+"% ATK"+txt+"'";const to="'Shield of "+Math.round(nv[i]*100)+"% ATK"+txt+"'";h=h.split(from).join(to);});};rs('emberward',[1.5,2,2.5],'; attackers catch fire');rs('icebarrier',[2,2.5,3],'');rs('staticshield',[1.5,2,2.5],'; enemies that hit you get Shocked');}
  for(const id in o.boss){const [n,hp,atk]=BOSS[id];h=P(h,`${id}:{n:'${n}',hp:${hp},atk:${atk},`,`${id}:{n:'${n}',hp:${o.boss[id][0]},atk:${o.boss[id][1]},`);}
  if(!o.mechOff){
  const M=Object.entries(o.mech).map(([k,v])=>`${k}:{every:${v[0]},pct:${v[1]}}`).join(',');
  h=P(h,"function enemyAct(c,e){",`// boss signature moves are telegraphed on a fixed beat: answer them with Guard, a shield, or an evade, or stun/freeze the boss to cancel
const BOSSMECH={${M}};
const bossMech=(c,e)=>e.boss&&c.ctx!=='duel'&&c.ctx!=='pvp'&&BOSSMECH[e.id];
function bossCC(e){const c=C();if(!e.boss||!bossMech(c,e))return false;if(e.ccImm>0){log(\`\${e.n} shrugs it off.\`,'hurt');return true;}e.ccImm=3;if(e.big){delete e.big;e.intent='atk';e.exposed=1;log(\`\${e.n}'s move is broken! It is exposed.\`,'buff');}return false;}
function enemyAct(c,e){`);
  h=P(h,"const ab0=e.intent||'atk';e.intent=rollIntent(e);const ab=ab0==='atk'?null:ab0;",
  "const BM=bossMech(c,e);let big=false;if(e.exposed)delete e.exposed;if(e.ccImm)e.ccImm--;if(BM&&e.big){big=true;delete e.big;if(c.ps.guard||c.ps.pguard||c.ps.evade||c.ps.veil||c.ps.shield){e.exposed=1;log(`You weather it. ${e.n} is exposed!`,'buff');fx('num',{t:i,txt:'Exposed',cls:'crit'});}}\n  const ab0=e.intent||'atk';e.intent=rollIntent(e);const ab=ab0==='atk'?null:ab0;\n  if(BM){e.bt=(e.bt||0)+1;if(e.bt%BM.every===0){e.intent='heavy';e.big=true;const sn=BOSSSIG[e.id]&&BOSSSIG[e.id].heavy||'a great blow';log(`${e.n} gathers for ${sn}! Guard, shield or stun it.`,'boss');}}");
  h=P(h,"if(chance(d.dodge+(c.ps.veil?(trk('veil')>=3?60:40):0))){","if(big?c.ps.veil:chance(d.dodge+(c.ps.veil?(trk('veil')>=3?60:40):0))){");
  h=P(h,"if(pc&&chance(pc)){log(`You parry","if(!big&&pc&&chance(pc)){log(`You parry");
  h=P(h,"d.def*(1-(e.pierce||0)))*(1-d.dr/100);dmg=Math.max(1,Math.round(dmg));","d.def*(1-(e.pierce||0)))*(1-d.dr/100);if(big)dmg=Math.max(dmg,d.maxHp*BM.pct*(1-d.dr/100));else if(BM)dmg=Math.max(dmg,d.maxHp*(ab==='heavy'?"+o.floorH+":"+o.floor+")*(1-d.dr/100));if(c.ps.guard)dmg*=big?"+o.guardBig+":.5;dmg=Math.max(1,Math.round(dmg));");
  h=P(h,"if(c.ps.shield){const a=Math.min(c.ps.shield,part);","if(c.ps.shield){const a=Math.min(c.ps.shield,big?Math.ceil(part/2):part);");
  h=P(h,"pguard:'st_shield',mark:'st_brk'}[k]","pguard:'st_shield',guard:'st_shield',mark:'st_brk'}[k]");
  h=P(h,"for(const k of ['veil','riposte','emberward','rage','staticward'])","for(const k of ['veil','riposte','emberward','rage','staticward','guard'])");
  h=P(h,"function stun(e){e.st.stun={t:1};","function stun(e){if(bossCC(e))return;e.st.stun={t:1};");
  h=P(h,"function freeze(e){if(trk('coldblood'))","function freeze(e){if(bossCC(e)){delete e.st.chill;return;}if(trk('coldblood'))");
  h=P(h,"bonus*=swordBonus(e,c,o);","bonus*=swordBonus(e,c,o);if(e.exposed)bonus*=1.5;if(e.id==='hking'&&bossMech(c,e)&&c.enemies.some(x=>x.id==='knight'&&x.hp>0))bonus*=.5;");
  h=P(h,"log('The Hollow King calls a knight to his side!','boss');","log('The Hollow King calls a knight to his side! He takes half damage while it stands.','boss');");
  h=P(h,"function estHit(e,ab){const d=derive();const raw=Math.max(.5,e.atk*(ab==='heavy'?1.6:1));return Math.max(1,Math.round(raw*raw/(raw+Math.max(0,d.def))*(1-d.dr/100)));}",
  "function estHit(e,ab){const d=derive();const raw=Math.max(.5,e.atk*(ab==='heavy'?1.6:1));let v=raw*raw/(raw+Math.max(0,d.def))*(1-d.dr/100);const M=e.big&&BOSSMECH[e.id];if(M)v=Math.max(v,d.maxHp*M.pct*(1-d.dr/100));return Math.max(1,Math.round(v));}");
  h=P(h,"${dmgIntent(e.intent)?`<small class=\"num\">~${estHit(e,e.intent)}</small>`:''}</span>","${e.big?'<small>Guard!</small>':''}${dmgIntent(e.intent)?`<small class=\"num\">~${estHit(e,e.intent)}</small>`:''}</span>");
  h=P(h,"  attack:()=>{turn(()=>{","  guard:()=>{const c=C();if(!c||c.ctx==='duel'||c.ctx==='pvp')return;turn(()=>{const d=derive();C().ps.guard=1;C().lastAct='Guard';S.mp=Math.min(d.maxMp,S.mp+Math.ceil(d.maxMp*.08));log('You brace yourself.','buff');fx('num',{t:'p',txt:'Guard',cls:'miss'});});},\n  attack:()=>{turn(()=>{");
  h=P(h,"<button class=\"mi\" data-a=\"menu\" data-v=\"items\">Items<small>▸</small></button>\n","<button class=\"mi\" data-a=\"menu\" data-v=\"items\">Items<small>▸</small></button>\n      ${c.ctx==='duel'||c.ctx==='pvp'?'':'<button class=\"mi\" data-a=\"guard\" data-tip=\"txt:Halve damage until your next turn, and take "+Math.round((1-o.guardBig)*100)+"% less from a telegraphed boss move. Restores some MP.\">Guard<small>turn</small></button>'}\n");
  h=P(h,"const m=S.autoMove||'attack',s=SK[m];if(m!=='attack'","if(c.enemies.some(e=>e.big&&e.hp>0)){ACT.guard();render();return;}const m=S.autoMove||'attack',s=SK[m];if(m!=='attack'");
  }
  h=P(h,"perform(basicFx(),e,()=>hit(e,1));","perform(basicFx(),e,()=>hit(e,C().ctx==='duel'||C().ctx==='pvp'?1:"+o.basic+"));");
  if(o.burstCap)h=P(h,"function hemoBurst(e,frac){const c=C(),i=c.enemies.indexOf(e);","function hemoBurst(e,frac){const c=C(),i=c.enemies.indexOf(e);if(e.boss&&!e.pvp){if(e._burstTn===c.tn)return;e._burstTn=c.tn;}");
  return h;}
module.exports={mech,P};
