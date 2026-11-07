// Boss challenges skip the waves; the waves move to the Vault, the gem dungeon with one difficulty per late region.
const {P}=require('./mech.js');
const CODE=`/* the Vault: gems come from here and the Spire. Each difficulty opens with its region */
const VAULTN='The Vault',VAULTF=3,VAULT={hollow:{n:'Hollow',area:3,lv:19,g:2},abyss:{n:'Abyss',area:4,lv:34,g:3}};
function vaultLoot(D,loot){const G=VAULT[D.gem],n=2+(chance(30+20*(D.mods||[]).length)?1:0),out=[];for(let i=0;i<n;i++){out.push(mkGem(pick(Object.keys(GEMS)),Math.min(4,G.g+(chance(10)?1:0))));}addToBag(out);loot.items.push(...out);loot.cleared=VAULTN+' · '+G.n;}
function vVault(){if(S.unlocked<=VAULT.hollow.area)return '';const v=VAULT[S.vault]&&S.unlocked>VAULT[S.vault].area?S.vault:S.unlocked>VAULT.abyss.area?'abyss':'hollow',G=VAULT[v];
  const diffs=Object.entries(VAULT).map(([k,X])=>S.unlocked>X.area?'<button class="btn sm '+(k===v?'tab on':'')+'" data-a="vpick" data-v="'+k+'">'+X.n+'</button>':'<button class="btn sm" disabled>???</button>').join('');
  const vm=S.vmods||[];
  return '<div class="sub dungeon"><div class="eyebrow">Dungeon</div><h2>'+VAULTN+'</h2><span class="dim small">'+VAULTF+' floors, then a chest with 2–3 random '+GRADEN[G.g]+' gems (Lv '+G.lv+'+)</span>'
    +'<div class="row"><span class="dim small">Difficulty</span>'+diffs+'</div>'
    +'<div class="row"><span class="dim small">Modifiers</span>'+Object.entries(MODS).map(([k,[n,dd]])=>'<button class="btn sm '+(vm.includes(k)?'danger':'')+'" data-a="vmod" data-v="'+k+'" data-tip="txt:'+dd+'" aria-pressed="'+vm.includes(k)+'">'+n+'</button>').join('')+'<span class="tag">'+(30+20*vm.length)+'% chance of a third gem</span></div>'
    +'<div class="row"><button class="btn primary" data-a="vault" data-v="'+v+'">Enter</button></div></div>';}
`;
function dun(h){
  h=P(h,"function spawnStage(){",CODE+"function spawnStage(){");
  // boss challenge: straight to the boss; Swarm brings adds instead of a third enemy per floor
  h=P(h,"S.dungeon={area:S.area,stage:0,mods:[...S.dmods]};spawnStage();},","S.dungeon={area:S.area,stage:AREAS[S.area].dungeon.floors.length,mods:[...S.dmods]};spawnStage();},\n  vault:v=>{const G=VAULT[v];if(!G||S.unlocked<=G.area)return;const d=derive();S.hp=d.maxHp;S.mp=d.maxMp;S.dungeon={area:G.area,stage:0,mods:[...(S.vmods||[])],gem:v};spawnStage();},\n  vpick:v=>{S.vault=v;},\n  vmod:v=>{const m=S.vmods||[];S.vmods=m.includes(v)?m.filter(x=>x!==v):[...m,v];},");
  h=P(h,"function spawnStage(){const D=S.dungeon;const A=AREAS[D.area];const DG=A.dungeon;let list;","function spawnStage(){const D=S.dungeon;const A=AREAS[D.area];const DG=A.dungeon;let list;const swarm=(D.mods||[]).includes('more');\n  if(D.gem){startCombat(Array.from({length:[2,2,3][D.stage]+(swarm?1:0)},()=>mkEnemy(pick(A.mobs),VAULT[D.gem].lv+D.stage)),'dungeon');return;}");
  h=P(h,"else list=[mkEnemy(DG.boss,A.boss)];","else list=[mkEnemy(DG.boss,A.boss),...(swarm?Array.from({length:2},()=>mkEnemy(pick(A.mobs),A.lv[1])):[])];");
  h=P(h,"more:['Swarm','Three enemies per floor']","more:['Swarm','Two extra enemies join a boss, one extra on each Vault floor']");
  h=P(h,"<div class=\"eyebrow\">Dungeon</div><h2>${D.name}</h2><span class=\"dim small\">Floor 1 → Floor 2 → ${boss.n} (Lv ${a.boss})</span>","<div class=\"eyebrow\">Boss</div><h2>${D.name}</h2><span class=\"dim small\">${boss.n} (Lv ${a.boss})</span>");
  h=P(h,"${cleared?'<span class=\"tag good\">Cleared</span>':''}</div></div>`}\n  </section></div>`;","${cleared?'<span class=\"tag good\">Cleared</span>':''}</div></div>`}\n  ${vVault()}\n  </section></div>`;");
  // Vault runs in battle: floor label, next floor button, the chest at the end
  h=P(h,"c.ctx==='dungeon'&&D?`${AREAS[D.area].dungeon.name}","c.ctx==='dungeon'&&D&&D.gem?VAULTN+' · '+VAULT[D.gem].n+' · Floor '+(D.stage+1):c.ctx==='dungeon'&&D?`${AREAS[D.area].dungeon.name}");
  h=P(h,"data-a=\"descend\">${D.stage+1<AREAS[D.area].dungeon.floors.length?","data-a=\"descend\">${D.gem||D.stage+1<AREAS[D.area].dungeon.floors.length?");
  h=P(h,"if(c.ctx==='dungeon'&&D){const A=AREAS[D.area];if(D.stage>=A.dungeon.floors.length){loot.cleared=A.dungeon.name;","if(c.ctx==='dungeon'&&D&&D.gem){if(D.stage>=VAULTF-1){vaultLoot(D,loot);S.dungeon=null;}}\n  else if(c.ctx==='dungeon'&&D){const A=AREAS[D.area];if(D.stage>=A.dungeon.floors.length){loot.cleared=A.dungeon.name;");
  // each boss modifier: +10% XP, a better boss drop, a chance of a second item
  h=P(h,"const lv0=S.lvl;gainXp(loot.xp);","const bm=c.ctx==='dungeon'&&S.dungeon&&!S.dungeon.gem?dmods().length:0;if(bm)loot.xp=Math.round(loot.xp*(1+.1*bm));const lv0=S.lvl;gainXp(loot.xp);");
  h=P(h,"if(e.boss){loot.items.push(genItem(tier,[1,1,2,2,2][tier],undefined,[1,2,3,3,3][tier]));","if(e.boss){const bn=c.ctx==='dungeon'?dmods().length:0;loot.items.push(genItem(tier,Math.min(4,[1,1,2,2,2][tier]+(bn>=2?1:0)),undefined,Math.min(4,[1,2,3,3,3][tier]+bn)));if(chance(25*bn))loot.items.push(genItem(tier,[1,1,2,2,2][tier],undefined,Math.min(4,[1,2,3,3,3][tier]+bn)));");
  h=P(h,"${S.dmods.length?`<span class=\"tag gold\">+${S.dmods.length*5} essence${S.dmods.length===3&&!S.chal.includes(S.area)?' · ★':''}</span>`:''}","<span class=\"tag ${S.dmods.length?'gold':''}\">${S.dmods.length?`+${S.dmods.length*10}% XP, better drops, +${S.dmods.length*5} essence${S.dmods.length===3&&!S.chal.includes(S.area)?' · ★':''}`:'Each adds +10% XP and better drops'}</span>");
  // gems no longer drop from wild mobs, elites, bosses, quests or contracts; the Spire drops them more often
  h=P(h,"if(chance(e.boss?20:[0,1,2,3,3.5][S.area]))loot.items.push(mkGem(pick(Object.keys(GEMS)),Math.min(4,[0,0,1,2,3][S.area]+(e.boss?1:0)+(chance(8)?1:0))));","");
  h=P(h,"if(chance(30))loot.items.push(mkGem(pick(Object.keys(GEMS)),Math.min(4,tier+(chance(10)?1:0))));","");
  h=P(h,"if(chance(25))loot.items.push(mkGem(pick(Object.keys(GEMS)),Math.min(4,Math.floor(f/10))));","if(chance(50))loot.items.push(mkGem(pick(Object.keys(GEMS)),Math.min(4,Math.floor(f/10))));");
  h=P(h,"if(Q.rw.gem)addToBag([mkGem(pick(Object.keys(GEMS)),Math.min(4,Q.area+1))]);","if(Q.rw.gem)S.mats.essence=(S.mats.essence||0)+20;");
  h=P(h,"${Q.rw.gem?' · gem':''}","");
  h=P(h,"S.ctr.bonus=true;addToBag([mkGem(pick(Object.keys(GEMS)),Math.min(4,S.unlocked-1))]);toast('All contracts done: a bonus gem');","S.ctr.bonus=true;S.mats.essence=(S.mats.essence||0)+20;toast('All contracts done: +20 essence');");
  h=P(h,"Finish all three for a bonus gem.","Finish all three for bonus essence.");
  return h;}
module.exports={dun};
