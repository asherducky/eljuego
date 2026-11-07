// The admin panel only shows for accounts in the admins table on the server.
const {P}=require('./mech.js');
function admhide(h){
  h=P(h,"const admD=()=>","const ISADM=()=>!!(NET.user&&NET.admId===NET.user.id);\nfunction admCheck(){const sb=NET.sb;if(!sb||!NET.user)return Promise.resolve();const id=NET.user.id;if(NET.admChk===id)return NET.admP;NET.admChk=id;return NET.admP=(async()=>{const {data}=await sb.from('admins').select('user_id').eq('user_id',id).maybeSingle();if(data&&data.user_id===id){NET.admId=id;render(true);}})();}\nconst admD=()=>");
  h=P(h,"async function cloudPeek(){const sb=await net();if(!sb||!NET.user)return;admListen();","async function cloudPeek(){const sb=await net();if(!sb||!NET.user)return;admListen();admCheck();");
  h=P(h,"<div class=\"sub\"><h3>Admin</h3>${vAdmin()}</div>","${ISADM()?'<div class=\"sub\"><h3>Admin</h3>'+vAdmin()+'</div>':''}");
  h=P(h,"if(!UI.admOk||!ADM[k])return;ADM[k](a);","if(!UI.admOk||!ISADM()||!ADM[k])return;ADM[k](a);");
  // admins never post to the leaderboards
  h=P(h,"async function spirePost(){const sb=await net();if(!sb||!NET.user||!S||!S.named||UI.admEd)return;","async function spirePost(){const sb=await net();if(!sb||!NET.user||!S||!S.named||UI.admEd)return;await admCheck();if(ISADM())return;");
  h=P(h,"async function pvpPost(extra){const sb=await net();if(!sb||!NET.user||!S||!S.named||UI.admEd)return;","async function pvpPost(extra){const sb=await net();if(!sb||!NET.user||!S||!S.named||UI.admEd)return;await admCheck();if(ISADM())return;");
  return h;}
module.exports={admhide};
