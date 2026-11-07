// JP: an admin-only legendary. No monster drops it; every hit deals 67 billion damage.
const {P}=require('./mech.js');
function jp(h){
  h=P(h,"const UNIQ={\n","const UNIQ={\n  jp:{n:'JP',type:'greatsword',tier:6,fx:'jp',col:'#f2c14e',a:'Sixty-Seven',d:'Every hit deals 67 billion damage',affs:{str:10}},\n");
  h=P(h,"function uqFx(e,c,d,dmg,crit){const f=d.fx||[];","function uqFx(e,c,d,dmg,crit){const f=d.fx||[];if(f.includes('jp'))return 67e9;");
  h=P(h,"  maxout:()=>{admMaxOut();},","  maxout:()=>{admMaxOut();},\n  jp:()=>{const it=admMaxIt(mkUnique('jp'),['keen','vampiric']);addToBag([it]);toast('Added JP');},");
  h=P(h,"${b('uniq','All Legendaries')}","${b('uniq','All Legendaries')}${b('jp','Give JP','primary')}");
  // after every boss gate and ward, so nothing blocks it
  h=P(h,"  e.hp=Math.max(0,e.hp-dmg);logHit({d:dmg,c:crit?1:0,el});","  if((d.fx||[]).includes('jp'))dmg=67e9;e.hp=Math.max(0,e.hp-dmg);logHit({d:dmg,c:crit?1:0,el});");
  return h;}
module.exports={jp};
