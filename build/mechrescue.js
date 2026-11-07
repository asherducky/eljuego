// Gets a player out of a stuck fight: a Settings button, automatic recovery if the fight screen crashes, and the First Ash's minions dying with it.
const {P}=require('./mech.js');
function rescue(h){
  h=P(h,"  admin:()=>{admTry();return 'async';},","  unstick:()=>{try{if(C()&&C().over&&C().over.win&&ACT.done)ACT.done();}catch(e){}unstickNow('You left the fight.');},\n  admin:()=>{admTry();return 'async';},");
  h=P(h,"function render(quiet){","function unstickNow(msg){S.combat=null;S.dungeon=null;S.tower=null;PRE=null;busyUntil=0;FXQ.length=0;fxAt=0;S.tab='explore';S.note=msg;try{save();}catch(e){}}\nfunction render(quiet){");
  h=P(h,"const FREE=['autob',","const FREE=['unstick','autob',");
  h=P(h,"<div class=\"sub\"><h3>Admin</h3>${vAdmin()}</div>","${S.combat?'<div class=\"sub\"><h3>Stuck in a fight?</h3><p class=\"small dim\">Leaves this fight. You keep anything you already won.</p><div class=\"row\"><button class=\"btn danger\" data-a=\"unstick\">Leave this fight</button></div></div>':''}<div class=\"sub\"><h3>Admin</h3>${vAdmin()}</div>");
  h=P(h,"if(e.hp<=0&&!duel&&!e._dead){log(`${e.n} falls.`,'kill');onKill(e);}","if(e.hp<=0&&!duel&&!e._dead){log(`${e.n} falls.`,'kill');onKill(e);if(e.id==='firstash')for(const x of c.enemies)if(x!==e&&x.hp>0){x.hp=0;x._dead=true;fx('hp',{t:c.enemies.indexOf(x),hp:0,max:x.max});}}");
  h=P(h,"const v=S.tab==='settings'?vSettings():S.combat?vBattle():(","let bv=null;if(S.tab!=='settings'&&S.combat){try{bv=vBattle();}catch(err){console.error(err);unstickNow('That fight crashed and was closed, so you are not stuck. Tell the dev: '+String(err&&err.message||err).slice(0,120));}}const v=S.tab==='settings'?vSettings():S.combat?bv:(");
  return h;}
module.exports={rescue};
