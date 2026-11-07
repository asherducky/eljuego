// Endgame pass: hidden bosses, harder devil fights, flawed contracts on a loss and clean ones on a win, multi contracts after all three marks,
// more player HP with harder-hitting enemies (not in the Tower), armor HP, level cap 100, T6 and T7 alloys, and Malice only across waves.
const {P}=require('./mech.js');
const FN="const MULTI=()=>!!(S.devils&&S.devils.beat&&S.devils.beatc&&S.devils.beatv);\n"+
"function heldOther(n){const D=S.devils||{};return !!((D.pact&&D.pact!==n)||Object.keys(D.free||{}).some(k=>k!==n));}\n"+
"function bladeGone(){if(S.gear.weapon&&S.gear.weapon.veil)S.gear.weapon=null;S.bag=S.bag.filter(x=>!x.veil);}\n"+
"function dropContract(n){const D=S.devils||{};if(D.free&&D.free[n]){if(n==='hollow'){if(D.shadow&&D.old){S.tree=D.old.tree;S.stars=D.old.stars;S.equip=D.old.equip;}D.old=null;D.shadow=0;}if(n==='veiled')bladeGone();delete D.free[n];}if(D.pact===n){if(n==='veiled'){bladeGone();D.pact=null;}else if(n==='hollow')DEVIL.unsign();else D.pact=null;D.cut=null;D.fam=null;}S.sp=spLeft();recomputeSkills();clampVitals();}\n"+
"function prepSign(n){if(!MULTI())for(const k of ['hollow','colossus','veiled'])if(k!==n)dropContract(k);dropContract(n);}\n"+
"function makeFree(n){const D=S.devils;D.free=D.free||{};D.free[n]=1;if(n==='hollow')D.shadow=1;if(D.pact===n){D.pact=null;D.cut=null;}freeAll();}\n";
function endgame(h){
  // contracts: the old freeAll no longer turns flawed contracts into clean ones
  h=P(h,"function freeAll(){if(!END())return;const D=S.devils=S.devils||{w:0,seen:{},said:{},bag:[],now:null};if(D.pact){D.free=D.free||{};D.free[D.pact]=1;if(D.pact==='hollow')D.shadow=1;D.pact=null;D.cut=null;}","function freeAll(){const D=S.devils=S.devils||{w:0,seen:{},said:{},bag:[],now:null};");
  h=P(h,"if((s.cleared||[]).includes(5)&&s.devils&&s.devils.pact){const D=s.devils;D.free=D.free||{};D.free[D.pact]=1;if(D.pact==='hollow')D.shadow=1;D.pact=null;D.cut=null;}","if(s.cleared&&!s.bseen){s.bseen={};for(const a of s.cleared)s.bseen[a]=1;}");
  h=P(h,"function kingCalls(e,c,i){",FN+"function kingCalls(e,c,i){");
  h=P(h,"async function offer(name='hollow'){","async function offer(name='hollow',flawed){");
  h=P(h,"let signed;if(END()){","let signed;if(END()&&!flawed){");
  h=P(h,"if(signed){if(name==='hollow')sign();else if(name==='veiled')signBlade();else signVeil(null);freeAll();}","if(signed){prepSign(name);if(name==='hollow')sign();else if(name==='veiled')signBlade();else signVeil(null);makeFree(name);}");
  h=P(h,"signed=await bladeTerms();if(signed)signBlade();await say(","signed=await bladeTerms();if(signed){prepSign('veiled');signBlade();}await say(");
  h=P(h,"const cut=await cutTerms();signed=!!cut;if(signed)signVeil(cut);await say(","const cut=await cutTerms();signed=!!cut;if(signed){prepSign('colossus');signVeil(cut);}await say(");
  h=P(h,"signed=await terms();if(signed)sign();await say(","signed=await terms();if(signed){prepSign('hollow');sign();}await say(");
  h=P(h,"+'<br>It costs nothing.';","+'<br>It costs nothing.'+(!MULTI()&&heldOther(name)?'<br>Until you beat all three devils you can hold one contract. This replaces yours.':'');");
  h=P(h,"if(wonD)DEVIL.offer(wonD);","if(wonD)DEVIL.offer(wonD);else if(c.dv&&c.over&&!c.over.win&&!FRC(c.dv)&&!(S.devils&&S.devils.pact===c.dv))DEVIL.offer(c.dv,true);");
  // the devil bosses are the hardest fights in the game
  h=P(h,"startCombat(list,'dungeon');const c=C();c.dv=","const KH=id==='veild'?1.8:3,KA=id==='veild'?1.1:1.25;for(const x of list){x.hp=x.max=Math.round(x.max*KH);x.atk=Math.round(x.atk*KA*10)/10;}e.shHp=Math.round((e.shHp||0)*KH);e.shAtk=Math.round((e.shAtk||0)*KA*10)/10;startCombat(list,'dungeon');const c=C();c.dv=");
  h=P(h,"dungeon:{name:'The Empty Throat',","dungeon:{name:'The Grinning Dark',");
  // bosses stay hidden until you first face them
  h=P(h,"if(D.stage<DG.floors.length)list=Array.from(","if(D.stage>=DG.floors.length){S.bseen=S.bseen||{};S.bseen[D.area]=1;}if(D.stage<DG.floors.length)list=Array.from(");
  h=P(h,"<div class=\"row\" style=\"gap:14px\">${sprImg(({hollowd:'dhollow',colface:'dcolossus',veild:'dveiled'})[D.boss]||D.boss,3)}","<div class=\"row\" style=\"gap:14px\">${(S.bseen||{})[S.area]?sprImg(({hollowd:'dhollow',colface:'dcolossus',veild:'dveiled'})[D.boss]||D.boss,3):'<span style=\"width:96px;height:96px;display:grid;place-items:center;font-size:2.4rem;color:#5d5672;background:#0e0b16;box-shadow:inset 0 0 0 3px #2a2340\">?</span>'}");
  h=P(h,"<span class=\"dim small\">${boss.n} (Lv ${a.boss})</span>","<span class=\"dim small\">${(S.bseen||{})[S.area]?boss.n:'???'} (Lv ${a.boss})</span>");
  h=P(h,"Defeat ${MOB[AREAS[i-1].dungeon.boss].n}","Clear ${AREAS[i-1].dungeon.name}");
  // more HP for the player, harder hits from the world outside the Tower
  h=P(h,"maxHp:Math.round((20+S.lvl*8+b.hp)*hpM*(1+Math.min(.6,Math.max(0,S.lvl-8)*.025)))","maxHp:Math.round((20+S.lvl*8+b.hp)*hpM*(1+Math.min(.6,Math.max(0,S.lvl-8)*.025))*(1+Math.max(0,S.lvl-1)*.06))");
  h=P(h,"function startCombat(list,ctx){","function startCombat(list,ctx){if(!['tower','duel','pvp','devil'].includes(ctx))for(const e of list){if(e.pvp||['hollowd','colface','colhand','veild','vmini','shade'].includes(e.id))continue;const g=.06*Math.max(0,(e.L||1)-1);e.atk=Math.round(e.atk*(1+g*(e.boss?.92:.88))*10)/10;}");
  h=P(h,"const AT={robe:{n:'Robe',def:1,mp:6},leather:{n:'Tunic',def:2,dodge:3},plate:{n:'Chestplate',def:3.5,spd:-2}};","const AT={robe:{n:'Robe',def:1,mp:6,hp:2},leather:{n:'Tunic',def:2,dodge:3,hp:2.5},plate:{n:'Chestplate',def:3.5,spd:-2,hp:3.5}};");
  h=P(h,"const HT={cap:{n:'Cap',def:.5,hp:5},helm:{n:'Helm',def:1.5},hood:{n:'Hood',def:.5,crit:3}};","const HT={cap:{n:'Cap',def:.5,hp:5},helm:{n:'Helm',def:1.5,hp:1.5},hood:{n:'Hood',def:.5,crit:3,hp:1.5}};");
  h=P(h,"const BT={shoes:{n:'Shoes',spd:2},greaves:{n:'Plated Boots',def:1.5},treads:{n:'Light Boots',def:.5,dodge:3}};","const BT={shoes:{n:'Shoes',spd:2,hp:1},greaves:{n:'Plated Boots',def:1.5,hp:2},treads:{n:'Light Boots',def:.5,dodge:3,hp:1}};");
  h=P(h,"const CT={cape:{n:'Cape',dodge:2,spd:1},mantle:{n:'Cloak',def:1,hp:6},shroud:{n:'Shroud',mp:5,crit:2}};","const CT={cape:{n:'Cape',dodge:2,spd:1,hp:1.5},mantle:{n:'Cloak',def:1,hp:6},shroud:{n:'Shroud',mp:5,crit:2,hp:1.5}};");
  // level cap 100, and every level past 40 costs more
  h=P(h,"const xpNeed=l=>Math.round(TUNE.xpNeedA*Math.pow(l,TUNE.xpNeedB));","const xpNeed=l=>Math.round(TUNE.xpNeedA*Math.pow(l,TUNE.xpNeedB)*(1+Math.max(0,l-40)*.04));");
  h=P(h,"const MAXLV=50;","const MAXLV=100;");
  // alloys for the Ashen and Devil tiers
  h=P(h,"const ALLOYS={\n","const ALLOYS={\n  greysteel:{n:'Greysteel',base:'ashsteel',r:'cinder',q:2,ar:5,aff:{def:4,hp:10},d:'+Defense, +Max HP',pal:{W:'#ffffff',w:'#a8a6a4',G:'#3b3948'}},\n  ghoststeel:{n:'Ghoststeel',base:'ashsteel',r:'soot',q:2,ar:5,aff:{crit:6,spd:2},d:'+6% crit, +2 SPD',pal:{W:'#ffffff',w:'#d9ccff',G:'#3b3948'}},\n  hollowsteel:{n:'Hollowsteel',base:'pactsteel',r:'hollowglass',q:2,ar:6,aff:{crit:8,dodge:3},d:'+8% crit, +3% dodge',pal:{W:'#c9c2d6',w:'#2a2433',G:'#0e0b12'}},\n  titansteel:{n:'Titansteel',base:'pactsteel',r:'titanstone',q:2,ar:7,aff:{def:6,hp:14},d:'+Defense, +Max HP',pal:{W:'#c41e2e',w:'#3a2a36',G:'#0e0b12'}},\n  veilsteel:{n:'Veilsteel',base:'pactsteel',r:'veilsilk',q:2,ar:8,aff:{dodge:5,crit:4},d:'+5% dodge, +4% crit',pal:{W:'#8a1a26',w:'#1e1820',G:'#0e0b12'}},\n");
  h=P(h,"const ALLOYOF={bloodflux:'bloodforged',","const ALLOYOF={cinder:'greysteel',soot:'ghoststeel',hollowglass:'hollowsteel',titanstone:'titansteel',veilsilk:'veilsteel',bloodflux:'bloodforged',");
  // Malice carries only through a dungeon run or a Tower climb
  h=P(h,"if(PACT())S.mp=Math.max(S.mp||0,trk('grudge')?15:0);","{const g=trk('grudge')?15:0,wave=(ctx==='dungeon'&&S.dungeon&&S.dungeon.w)||(ctx==='tower'&&S.tower&&S.tower.w);if(PACT())S.mp=wave?Math.max(S.mp||0,g):g;if(ctx==='dungeon'&&S.dungeon)S.dungeon.w=1;if(ctx==='tower'&&S.tower)S.tower.w=1;}");
  return h;}
module.exports={endgame};
