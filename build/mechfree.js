// After the First Ash: all three devils wait in the Ashen Reach, and all three contracts can be held at once with no cost.
const {P}=require('./mech.js');
const FNS=`function freeAll(){if(!END())return;const D=S.devils=S.devils||{w:0,seen:{},said:{},bag:[],now:null};if(D.pact){D.free=D.free||{};D.free[D.pact]=1;if(D.pact==='hollow')D.shadow=1;D.pact=null;D.cut=null;}if(FRC('veiled')){const b=bcFind();if(b)b.lock=true;}if(S.gear)clampVitals();}
function vDevilsWait(){const row=[['hollow','The Hollow'],['colossus','The Colossus'],['veiled','The Veiled']].map(([k,n])=>FRC(k)?'<span class="tag good">'+n+': signed</span>':'<button class="btn sm arcane" data-a="dmeet" data-v="'+k+'">Hear '+n+'</button>').join('');return '<div class="sub"><h3>They are waiting for you</h3><p class="small dim">The First Ash is gone and they have nothing left to fear. Sign with any of them, or all of them. This time they ask for nothing.</p><div class="row">'+row+'</div></div>';}
function dvFreeCell(){const n=[['hollow','dv_c1','The Hollow: +10% dodge, immune to status effects, and the Shadow tree whenever you want it'],['colossus','dv_c3','The Colossus: +20% damage, 3% HP a turn, cooldowns 1 turn shorter, and he still eats at the forge'],['veiled','dv_c2','The Veiled: the Black Crescent and Black Moon, with no price and no lock on your weapon slot']].filter(x=>FRC(x[0])),fr=[];for(const x of n){const a=x2(x[1]),u=canvasURL(pkey(a,{e:'#ffe0a0'}),sprCanvas(a,{e:'#ffe0a0'}));for(let i=0;i<8;i++)fr.push(u);}return '<div class="cell contract signed" data-tip="txt:'+n.map(x=>x[2]).join('. ')+'. They ask for nothing now."><img class="spr" data-fr="'+frameKey('free~'+n.map(x=>x[0]).join(),fr)+'" src="'+fr[0]+'" width="48" height="48" alt=""></div>';}
`;
const LINES=`if(pick==='listen'&&END()&&!FRC(name)){signed=true;line={hollow:'You already paid. Take it.',colossus:'You put out the thing I feared. Keep everything you have.',veiled:'No strings this time. Well. Almost none.'}[name];if(name==='hollow')sign();else if(name==='veiled')signBlade();else signVeil(null);freeAll();}\n  `;
function free(h){
  h=P(h,"const PACT=()=>!!(S&&S.devils&&S.devils.pact==='hollow'),","const END=()=>!!(S&&S.cleared&&S.cleared.includes(5)),FRC=k=>!!(S&&S.devils&&S.devils.free&&S.devils.free[k]),HOL=()=>PACT()||FRC('hollow'),hasForge=()=>!!(S&&S.devils&&(S.devils.pact==='veiled'||S.devils.pact==='colossus'||FRC('veiled')||FRC('colossus')));const bcFind=()=>S.gear.weapon&&S.gear.weapon.veil?S.gear.weapon:S.bag.find(x=>x.veil)||null;\nconst PACT=()=>!!(S&&S.devils&&(S.devils.pact==='hollow'||S.devils.free&&S.devils.free.hollow&&S.devils.shadow)),");
  // Hollow: dodge and immunity always, no HP loss, and the tree is a choice
  h=P(h,"*(PACT()?.8:1);const bb=","*(PACT()&&!FRC('hollow')?.8:1);const bb=");
  h=P(h,"dodge:Math.min(PACT()?40:30,Math.max(0,Math.round(t.spd*.35+b.dodge)+(PACT()?10:0)))","dodge:Math.min(HOL()?40:30,Math.max(0,Math.round(t.spd*.35+b.dodge)+(HOL()?10:0)))");
  h=P(h,"const resist=()=>{if(PACT()){","const resist=()=>{if(HOL()){");
  h=P(h,"<span class=\"tag gold num\">★ ${S.sp} to spend</span></div>${PACT()?'':","<span class=\"tag gold num\">★ ${S.sp} to spend</span></div>${FRC('hollow')?`<div class=\"row\"><button class=\"btn sm arcane\" data-a=\"shswap\">${PACT()?'Use your own tree':'Use the Shadow tree'}</button></div>`:''}${PACT()?'':");
  h=P(h,"  ssave:v=>{","  shswap:()=>{const D=S.devils;if(!FRC('hollow')||(C()&&!C().over))return;const o=D.old||{tree:{},stars:[...ORIGINS],equip:[]};D.old={tree:S.tree,stars:S.stars,equip:S.equip};S.tree=o.tree;S.stars=o.stars;S.equip=o.equip;D.shadow=D.shadow?0:1;S.sp=spLeft();recomputeSkills();S.mp=PACT()?0:derive().maxMp;clampVitals();toast(PACT()?'The Shadow tree':'Your own tree');},\n  dmeet:v=>{freeAll();if(END()&&!FRC(v))DEVIL.meet(v);},\n  ssave:v=>{");
  // Colossus: every reward he pays, nothing eaten
  h=P(h,"if(S.devils&&S.devils.pact==='colossus'){const fp=fedPct();","if(FRC('colossus')){b.regen=(b.regen||0)+3;b.pdmg=(b.pdmg||0)+20;b.sdmg=(b.sdmg||0)+20;}if(S.devils&&(S.devils.pact==='colossus'||FRC('colossus'))){const fp=fedPct();");
  h=P(h,"-(CUT()==='skills'?1:0)","-(CUT()==='skills'||FRC('colossus')?1:0)");
  h=P(h,"cfeed:()=>{if(!S.devils||S.devils.pact!=='colossus')return;","cfeed:()=>{if(!S.devils||(S.devils.pact!=='colossus'&&!FRC('colossus')))return;");
  // Veiled: the blade with no price and no lock
  h=P(h,"if(S.gear.weapon&&S.gear.weapon.veil&&c.ctx!=='devil'){loot.gold","if(S.gear.weapon&&S.gear.weapon.veil&&c.ctx!=='devil'&&!FRC('veiled')){loot.gold");
  h=P(h,"unequip:v=>{if(S.gear[v]&&S.gear[v].veil){","unequip:v=>{if(S.gear[v]&&S.gear[v].veil&&!FRC('veiled')){");
  h=P(h,"const it=S.gear.weapon;const i=BC.METALS.indexOf(v);if(!it||!it.veil||","const it=bcFind();const i=BC.METALS.indexOf(v);if(!it||");
  h=P(h,"const it=S.gear.weapon&&S.gear.weapon.veil?S.gear.weapon:null;if(!it)return '<p class=\"empty-s\">The blade is gone.</p>';","const it=bcFind();if(!it)return '<p class=\"empty-s\">The blade is gone.</p>';");
  // the forge shows whichever contracts you hold
  h=P(h,"function vDevilForge(){const D=S.devils||{};if(D.pact==='veiled'){","function vDevilForge(mode){const D=S.devils||{},Fr=D.free||{};if(!mode&&D.free)return (Fr.veiled?vDevilForge('v'):'')+(Fr.colossus?vDevilForge('c'):'');if(mode==='v'||!mode&&D.pact==='veiled'){");
  h=P(h,"  if(D.pact==='colossus'){const items=S.bag.filter(","  if(mode==='c'||!mode&&D.pact==='colossus'){const items=S.bag.filter(");
  h=P(h,"if(f.tab==='devil'&&!(S.devils&&(S.devils.pact==='veiled'||S.devils.pact==='colossus')))f.tab='craft';","if(f.tab==='devil'&&!hasForge())f.tab='craft';");
  h=P(h,"...(S.devils&&(S.devils.pact==='veiled'||S.devils.pact==='colossus')?[['devil','Contract']]:[])","...(hasForge()?[['devil','Contract']]:[])");
  // meeting them
  h=P(h,"function vMarks(){",FNS+"function vMarks(){");
  h=P(h,"  if(pick==='listen'&&name==='colossus'&&!D.pact){","  "+LINES+"if(pick==='listen'&&name==='colossus'&&!D.pact&&!END()){");
  h=P(h,"if(pick==='listen'&&name==='veiled'&&!D.pact){","if(pick==='listen'&&name==='veiled'&&!D.pact&&!END()){");
  h=P(h,"if(pick==='listen'&&name==='hollow'&&!D.pact){","if(pick==='listen'&&name==='hollow'&&!D.pact&&!END()){");
  h=P(h,"if(AB.on||UIv.busy||!S.cleared.includes(3)||S.devils&&S.devils.pact)return false;","if(AB.on||UIv.busy||!S.cleared.includes(3)||END()||S.devils&&S.devils.pact)return false;");
  h=P(h,"const wonD=c.ctx==='devil'&&c.over.win&&!(S.devils&&S.devils.pact)?","const wonD=c.ctx==='devil'&&c.over.win&&!END()&&!(S.devils&&S.devils.pact)?");
  h=P(h,"Auto battle unlocks after you beat ${MOB[D.boss].n}</span>`}</div>","Auto battle unlocks after you beat ${MOB[D.boss].n}</span>`}</div>${S.area===5&&END()?vDevilsWait():''}");
  h=P(h,"<div class=\"doll\">${doll}${(()=>{if(S.devils&&S.devils.pact==='veiled')","<div class=\"doll\">${doll}${(()=>{if(S.devils&&S.devils.free&&Object.keys(S.devils.free).length)return dvFreeCell();if(S.devils&&S.devils.pact==='veiled')");
  // whatever you held when the First Ash died stops costing you
  h=P(h,"function migrate(s){const d=fresh();","function migrate(s){const d=fresh();if((s.cleared||[]).includes(5)&&s.devils&&s.devils.pact){const D=s.devils;D.free=D.free||{};D.free[D.pact]=1;if(D.pact==='hollow')D.shadow=1;D.pact=null;D.cut=null;}");
  h=P(h,"function ashEnding(){const D=S.devils||{},who=","function ashEnding(){setTimeout(()=>{freeAll();render(true);},0);const D=S.devils||{},who=");
  h=P(h,"<p class=\"gold\">You reached the end of the Ashen Reach.</p>","<p class=\"gold\">You reached the end of the Ashen Reach. They want to talk again. This time they ask for nothing.</p>");
  h=P(h,"function ashDevil(e,c){const D=S.devils||{},d=derive();","function ashDevil(e,c){const D0=S.devils||{},D={pact:D0.pact||(FRC('hollow')?'hollow':FRC('veiled')?'veiled':FRC('colossus')?'colossus':null)},d=derive();");
  // admin
  h=P(h,"dsign:v=>{if(admBusy())return;admBreak();if(v==='hollow')","dsign:v=>{if(admBusy()||FRC(v))return;if(!END())admBreak();if(v==='hollow')");
  h=P(h,"else DEVIL.signCut(aval('a_dcut','potions'));toast('Signed');","else DEVIL.signCut(END()?null:aval('a_dcut','potions'));freeAll();toast('Signed');");
  h=P(h,"function admBreak(){const D=admD();if(!D.pact)return;","function admBreak(){const D=admD();if(D.free){if(D.free.hollow&&D.shadow&&D.old){S.tree=D.old.tree;S.stars=D.old.stars;S.equip=D.old.equip;}if(D.free.hollow)D.old=null;if(D.free.veiled){if(S.gear.weapon&&S.gear.weapon.veil)S.gear.weapon=null;S.bag=S.bag.filter(x=>!x.veil);}D.free=null;D.shadow=0;D.fam=null;S.sp=spLeft();recomputeSkills();clampVitals();}if(!D.pact)return;");
  h=P(h,":'none',row=s=>",":(Object.keys(D.free||{}).join(', ')||'none'),row=s=>");
  h=P(h,"(D.pact?b('dbreak','Break pact'):'')","(D.pact||D.free?b('dbreak','Break pact'):'')");
  h=P(h,"const D=S.devils||{},w=S.gear.weapon,bl=w&&w.veil?w:null,","const D=S.devils||{},w=S.gear.weapon,bl=bcFind(),");
  h=P(h,"if(D.pact==='colossus')h+=row('<b>Fed</b>","if(D.pact==='colossus'||FRC('colossus'))h+=row('<b>Fed</b>");
  for(const k of ["bcstage:v=>{const it=S.gear.weapon;if(it&&it.veil)","bckills:()=>{const it=S.gear.weapon;if(it&&it.veil)","bcmetals:v=>{const it=S.gear.weapon;if(it&&it.veil)"])h=P(h,k,k.replace("const it=S.gear.weapon;if(it&&it.veil)","const it=bcFind();if(it)"));
  return h;}
module.exports={free};
