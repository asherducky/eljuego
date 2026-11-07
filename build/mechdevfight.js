// The devil regions end in the devils' own fights; winning gives the mark and offers that contract, free. No contracts before then.
const {P}=require('./mech.js');
const DD="const DEVD=['hollowd','colface','veild'];\n"+
"function devDungeon(id){const d=derive();let list,e;if(id==='colface'){e=mkEnemy('colface',S.lvl);hollowScale(e,d);const mk=()=>{const f=mkEnemy('colhand',S.lvl);f.n='His Arm';f.hp=f.max=Math.round(e.max*.28);f.atk=e.shAtk*1.6;f.def=e.def*.5;f.spd=e.spd;f.pierce=.7;return f;};e.hp=e.max=Math.round(e.max*.6);list=[mk(),mk(),e];}else{e=mkEnemy(id,S.lvl);hollowScale(e,d);if(id==='veild')e.hp=e.max=Math.round(e.max*.8);list=[e];}startCombat(list,'dungeon');const c=C();c.dv=id==='hollowd'?'hollow':id==='colface'?'colossus':'veiled';c.target=0;}\n";
const FT="function freeTerms(name){return new Promise(res=>{const l=document.getElementById('dv-line'),c=document.getElementById('dv-choices'),m=document.getElementById('dv-more');m.classList.remove('show');l.innerHTML={hollow:'<b>The Hollow:</b> +10% dodge, immune to status effects, and the Shadow tree whenever you want it.',colossus:'<b>The Colossus:</b> +20% damage, 1% HP a turn, cooldowns 1 turn shorter, and he eats gear at the forge for more.',veiled:'<b>The Veiled:</b> the Black Crescent and Black Moon, with no price and your weapon slot left free.'}[name]+'<br>It costs nothing.';const old=c.innerHTML;c.innerHTML='<button data-s=\"1\">Sign</button><button data-s=\"0\">Walk away</button>';c.classList.add('show');c.querySelector('button').focus();c.onclick=e=>{const v=e.target.dataset.s;if(v===undefined)return;c.onclick=null;c.classList.remove('show');c.innerHTML=old;res(v==='1');};});}\n";
function devfight(h){
  h=P(h,"function towerBoss(e){",DD+"function towerBoss(e){");
  h=P(h,"else list=[mkEnemy(DG.boss,A.boss),","else if(DEVD.includes(DG.boss)){devDungeon(DG.boss);return;}else list=[mkEnemy(DG.boss,A.boss),");
  h=P(h,"<div class=\"stage ${c.ctx==='devil'?'void':''}\"","<div class=\"stage ${c.ctx==='devil'||c.dv?'void':''}\"");
  h=P(h,"aspect-ratio:${narrow||c.ctx==='devil'?'256/150'","aspect-ratio:${narrow||c.ctx==='devil'||c.dv?'256/150'");
  h=P(h,"${c.ctx==='devil'?DEVIL.stageBg(c):''}","${c.ctx==='devil'||c.dv?DEVIL.stageBg(c):''}");
  for(const id of ['hollowd','colface','veild'])h=P(h,"if(c.ctx==='devil'&&c.enemies.some(e=>e.id==='"+id+"'))","if((c.ctx==='devil'||c.dv)&&c.enemies.some(e=>e.id==='"+id+"'))");
  h=P(h,"hollowd:{n:'The Hollow',hp:80,atk:13,def:4,spd:6,xp:16,gold:[9,12],drops:[","hollowd:{n:'The Hollow',hp:80,atk:13,def:4,spd:6,xp:16,gold:[9,12],drops:[['hollowsoul',100],['pactsteel',100],");
  h=P(h,"colface:{n:'The Colossus',hp:80,atk:13,def:4,spd:6,xp:16,gold:[9,12],drops:[","colface:{n:'The Colossus',hp:80,atk:13,def:4,spd:6,xp:16,gold:[9,12],drops:[['titanheart',100],['pactsteel',100],");
  h=P(h,"veild:{n:'The Veiled',hp:80,atk:13,def:4,spd:6,xp:16,gold:[9,12],drops:[","veild:{n:'The Veiled',hp:80,atk:13,def:4,spd:6,xp:16,gold:[9,12],drops:[['veilheart',100],['pactsteel',100],");
  h=P(h,"<div class=\"row\" style=\"gap:14px\">${sprImg(D.boss,3)}","<div class=\"row\" style=\"gap:14px\">${sprImg(({hollowd:'dhollow',colface:'dcolossus',veild:'dveiled'})[D.boss]||D.boss,3)}");
  // the mark comes from the win, then the contract is offered, free
  h=P(h,"const wonD=c.ctx==='devil'&&c.over.win&&!END()&&!(S.devils&&S.devils.pact)?","const wonD=c.dv&&c.over.win?(FRC(c.dv)?null:c.dv):c.ctx==='devil'&&c.over.win&&!END()&&!(S.devils&&S.devils.pact)?");
  h=P(h,"function signBlade(){const D=state();D.pact='veiled';",FT+"function signBlade(){const D=state();D.pact='veiled';");
  h=P(h,"let signed;if(name==='veiled'){await say('Oh. You found me.');","let signed;if(END()){await say({hollow:'You beat me. Take it anyway.',colossus:'YOU MOVED ME. KEEP WHAT YOU HAVE.',veiled:'You cut every string. Here. No price.'}[name]);signed=await freeTerms(name);if(signed){if(name==='hollow')sign();else if(name==='veiled')signBlade();else signVeil(null);freeAll();}await say(signed?'Done.':'It will be here.');}else if(name==='veiled'){await say('Oh. You found me.');");
  // no contracts before the devil regions
  h=P(h,"function roll(){if(AB.on||","function roll(){return false;if(AB.on||");
  h=P(h,"${S.area===5&&END()?vDevilsWait():''}","");
  h=P(h,"mkEnemy(pick(AREAS).dungeon.boss,L)","mkEnemy(pick(AREAS.filter(a=>!DEVD.includes(a.dungeon.boss))).dungeon.boss,L)");
  return h;}
module.exports={devfight};
