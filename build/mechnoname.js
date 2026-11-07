// No character names: the game shows your account name (or Wanderer when signed out).
const {P}=require('./mech.js');
function noname(h){
  h=P(h,"  <label class=\"dim\" for=\"nm\">Name your wanderer</label><input class=\"inp\" id=\"nm\" maxlength=\"16\" value=\"${esc(S.name)}\" autocomplete=\"off\" spellcheck=\"false\">\n","");
  const n=h.split("${esc(S.name)}").length-1;if(n!==6)throw new Error('name count '+n);
  h=h.split("${esc(S.name)}").join("${esc(pname())}");
  h=P(h,"toast(`${old} has fallen for good`)","toast('Your character has fallen for good')");
  h=P(h,"toast(`Loaded ${S.name}`)","toast('Save loaded')");
  h=P(h,"const row={user_id:NET.user.id,data:S,name:S.name,level:S.lvl,updated_at:at};","const row={user_id:NET.user.id,data:S,name:pname().slice(0,16),level:S.lvl,updated_at:at};");
  h=P(h,"NET.cloud={level:S.lvl,name:S.name,updated_","NET.cloud={level:S.lvl,name:pname().slice(0,16),updated_");
  return h;}
module.exports={noname};
