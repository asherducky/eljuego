// Removes the old Titan Heart effect from items made before the change, gives old uniques their new passives,
// fills in the alloy card text, and sets Opening Act to +50%.
const {P}=require('./mech.js');
const FIX="{const NEWUQ={ashfather:['erupt','ashfall'],cinderrod:['prism','greylight'],grin:['sever','grin'],knuckle:['stoneskin','quake'],lastcurtain:['edict','curtain']};"+
"const fixIt=it=>{if(!it||typeof it!=='object'||!Array.isArray(it.fx))return;if(it.uq&&NEWUQ[it.uq]){const [o,n]=NEWUQ[it.uq];it.fx=it.fx.map(f=>f===o?n:f);return;}"+
"if(it.uq!=='gmaul'&&it.fx.includes('stoneskin')){it.fx=it.fx.filter(f=>f!=='stoneskin');if(it.slot!=='weapon'){const hv=1000*((it.tier||0)+1),ex=(it.affixes||[]).find(a=>a.id==='hp');if(ex)ex.v+=hv;else (it.affixes=it.affixes||[]).push({id:'hp',v:hv});}}};"+
"(s.bag||[]).forEach(fixIt);Object.values(s.gear||{}).forEach(fixIt);}";
function fix2(h){
  h=P(h,"function migrate(s){const d=fresh();","function migrate(s){const d=fresh();"+FIX);
  h=P(h,"const ALLOYOF=","for(const k in ALLOYS)if(!ALLOYS[k].short)ALLOYS[k].short=ALLOYS[k].d;\nconst ALLOYOF=");
  h=P(h,"if(f.includes('opening')&&c&&!c.opened){c.opened=1;dmg*=2;}","if(f.includes('opening')&&c&&!c.opened){c.opened=1;dmg*=1.5;}");
  h=h.split("Your first hit in each fight deals double damage").join("Your first hit in each fight deals +50% damage");
  h=P(h,"<h3>Your gear</h3>${itemPicker('fsel',S.fsel)}","<h3>${f.tab==='ascend'?'Your weapons':'Your gear'}</h3>${itemPicker('fsel',S.fsel,f.tab==='ascend'?(x=>x.slot==='weapon'&&!x.veil):null)}");
  return h;}
module.exports={fix2};
