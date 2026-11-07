// Test-only switches for class and gear experiments.
const {P}=require('./mech.js');
function exp(h,g){
  if(g.swordAtk)h=P(h,"sword:{n:'Longsword',sub:'medium',atk:5,","sword:{n:'Longsword',sub:'medium',atk:"+g.swordAtk+",");
  if(g.noBurst)h=P(h,"function hemoBurst(e,frac){","function hemoBurst(e,frac){if(e.boss)return;");
  if(g.ug){
    h=P(h,"const dmg=Math.max(1,Math.round(e.max*(e.boss||e.pvp?.10:.25)*frac","const dmg=Math.max(1,Math.round(e.max/(e.ug?"+g.ug[0]+":1)*(e.boss||e.pvp?.10:.25)*frac");
    h=P(h,"else list=[mkEnemy(DG.boss,A.boss),...(swarm?","else list=[ugBoss(mkEnemy(DG.boss,A.boss),D.area),...(swarm?");
    h=P(h,"function spawnStage(){","function ugBoss(e,a){const w=S.gear.weapon,c=S.gear.armor;if((w?w.tier||0:0)<a||(c?c.tier||0:0)<a){e.ug=1;e.hp=e.max=Math.round(e.max*"+g.ug[0]+");e.atk=Math.round(e.atk*"+g.ug[1]+"*10)/10;}return e;}\nfunction spawnStage(){");
  }
  return h;}
module.exports={exp};
