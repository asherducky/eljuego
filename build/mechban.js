// Bans: admins ban from the Players tab or the leaderboard; the server (bans.sql) refuses a banned account's online writes.
const {P}=require('./mech.js');
const FN=
"function banCheck(){const sb=NET.sb;if(!sb||!NET.user)return;const id=NET.user.id;if(NET.banChk===id)return;NET.banChk=id;sb.from('bans').select('user_id').eq('user_id',id).maybeSingle().then(({data})=>{NET.banned=!!(data&&data.user_id===id&&NET.user&&NET.user.id===id);if(NET.banned){dqLeave();duelClose();}render(true);});}\n"+
"const BANNED=()=>!!(NET.user&&NET.banned&&NET.banChk===NET.user.id);\n"+
"async function banLoad(){const sb=NET.sb;if(!sb||!ISADM())return;const {data,error}=await sb.from('bans').select('user_id,name');UI.admBans=error?null:Object.fromEntries((data||[]).map(r=>[r.user_id,r.name||'?']));render(true);}\n"+
"async function banSet(uid,on){const sb=NET.sb;if(!sb||!ISADM()||!uid||uid===NET.user.id)return;const nm=((UI.admPl&&UI.admPl.list||[]).find(r=>r.user_id===uid)||(NET.lb||[]).find(r=>r.user_id===uid)||{}).name||'';\n"+
"  const {error}=on?await sb.from('bans').insert({user_id:uid,name:nm.slice(0,16)}):await sb.from('bans').delete().eq('user_id',uid);\n"+
"  if(error){toast(/relation|PGRST205|schema cache/.test(error.message||'')?'Run supabase/bans.sql first':on?'Could not ban: '+error.message:'Could not unban: '+error.message);return;}toast(on?'Banned '+(nm||'that player'):'Unbanned '+(nm||'that player'));NET.lbT=0;await banLoad();}\n"+
"const banBtn=uid=>!ISADM()||!UI.admOk||!uid||(NET.user&&uid===NET.user.id)?'':(UI.admBans||{})[uid]!==undefined?'<button class=\"btn sm\" data-a=\"adm\" data-v=\"unban:'+uid+'\">Unban</button>':'<button class=\"btn sm danger\" data-a=\"adm\" data-v=\"ban:'+uid+'\">Ban</button>';\n";
function ban(h){
  h=P(h,"function vArena(){",FN+"function vArena(){");
  h=P(h,"async function cloudPeek(){const sb=await net();if(!sb||!NET.user)return;admListen();admCheck();","async function cloudPeek(){const sb=await net();if(!sb||!NET.user)return;admListen();banCheck();admCheck().then(()=>{if(ISADM()&&!UI.admBans)banLoad();});");
  // banned players get a notice and no online play
  h=P(h,"return `<section class=\"px panel\"><h2>Online</h2>${vChat()}${vArena()}${vBoard()}","if(BANNED())return '<section class=\"px panel\"><h2>Online</h2><div class=\"sub\"><h3>Banned</h3><p>This account is banned from online play. You can still play on this device, but nothing is uploaded and you cannot chat, duel or appear on the leaderboards.</p></div></section>';\n  return `<section class=\"px panel\"><h2>Online</h2>${vChat()}${vArena()}${vBoard()}");
  h=P(h,"async function dqJoin(){const sb=await net();if(!sb||!NET.user||NET.dq||NET.duel)return;","async function dqJoin(){if(BANNED())return;const sb=await net();if(!sb||!NET.user||NET.dq||NET.duel)return;");
  h=P(h,"async function duelOpen(code,host){const sb=await net();","async function duelOpen(code,host){if(BANNED())return;const sb=await net();");
  h=P(h,"async function cloudUp(force){","async function cloudUp(force){if(BANNED()){toast('This account is banned from online play');return;}");
  // admin buttons
  h=P(h,"  beast:()=>{admBeast();},","  beast:()=>{admBeast();},\n  ban:v=>{banSet(v,true);},\n  unban:v=>{banSet(v,false);},");
  h=P(h,"const q=sb.from('saves').select('user_id,name,level,updated_at')","banLoad();const q=sb.from('saves').select('user_id,name,level,updated_at')");
  h=P(h,"(NET.user&&r.user_id===NET.user.id?'<span class=\"dim small\">(you)</span>':","((UI.admBans||{})[r.user_id]!==undefined?'<span class=\"tag bad\">Banned</span>':'')+banBtn(r.user_id)+(NET.user&&r.user_id===NET.user.id?'<span class=\"dim small\">(you)</span>':");
  h=P(h,"<td class=\"num\"><b>${NET.lbMode==='pvp'?'Rating '+r.rating:g?(r.gold||0).toLocaleString():'Floor '+r.best}</b></td></tr>`","<td class=\"num\"><b>${NET.lbMode==='pvp'?'Rating '+r.rating:g?(r.gold||0).toLocaleString():'Floor '+r.best}</b></td>${ISADM()?'<td>'+banBtn(r.user_id)+'</td>':''}</tr>`");
  return h;}
module.exports={ban};
