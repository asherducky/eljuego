// Admin: edit other players' cloud saves (the server only allows it for accounts in the admins table) and max out the bestiary.
const {P}=require('./mech.js');
const FN=
"async function admList(){const sb=await net();if(!sb||!NET.user){UI.admPl={err:'Sign in on the Online tab first.'};render(true);return;}UI.admPl={busy:1};render(true);"+
"const q=sb.from('saves').select('user_id,name,level,updated_at').order('updated_at',{ascending:false}).limit(100);const {data,error}=await q;"+
"if(error){UI.admPl={err:error.message};render(true);return;}const list=data||[];UI.admPl={list,err:list.filter(r=>r.user_id!==NET.user.id).length?'':'You can only see your own save. Run supabase/admin.sql in Supabase to get access to the others.'};render(true);}\n"+
"async function admOpen(uid){if(admBusy()||UI.admAsk)return;const sb=await net();if(!sb||!NET.user)return;UI.admAsk=uid;render(true);const live=await admSend(uid,'up',true);UI.admAsk=null;const {data,error}=await sb.from('saves').select('data,name,updated_at').eq('user_id',uid).maybeSingle();"+
"if(error||!data||!data.data||data.data.v!==3){toast('Could not read that save');return;}if(!UI.admEd){save();UI.admOwn=S;}UI.admEd={uid,name:data.name||'Player',at:data.updated_at,live};S=migrate(data.data);PRE=null;toast(live?'Editing '+UI.admEd.name+' (fresh from their game)':UI.admEd.name+' is offline, so this is their last cloud save');render(true);}\n"+
"async function admWrite(){const E=UI.admEd;if(!E)return;const sb=await net();if(!sb||!NET.user)return;const at=new Date().toISOString();S.admEd=at;S.cloudAt=at;"+
"const {data,error}=await sb.from('saves').update({data:S,name:E.name,level:S.lvl,updated_at:at}).eq('user_id',E.uid).select('user_id');"+
"if(error||!data||!data.length){toast(error?'Save failed: '+error.message:'The server refused. Run supabase/admin.sql first.');return;}E.at=at;admSend(E.uid,'pull',false);toast('Saved to '+E.name);admList();}\n"+
"function admSend(uid,ev,wait){const sb=NET.sb;return new Promise(res=>{let done=false;const ch=sb.channel('adm-'+uid);const end=v=>{if(done)return;done=true;clearTimeout(t);setTimeout(()=>{try{sb.removeChannel(ch);}catch(e){}},500);res(v);};const t=setTimeout(()=>end(false),wait?8000:3000);"+
"ch.on('broadcast',{event:'done'},()=>end(true)).subscribe(st=>{if(st==='SUBSCRIBED'){ch.send({type:'broadcast',event:ev,payload:{}});if(!wait)end(true);}});});}\n"+
"function admListen(){const sb=NET.sb;if(!sb||!NET.user||NET.admCh===NET.user.id)return;if(NET.admC){try{sb.removeChannel(NET.admC);}catch(e){}}NET.admCh=NET.user.id;const ch=NET.admC=sb.channel('adm-'+NET.user.id);"+
"ch.on('broadcast',{event:'up'},async()=>{if(!UI.admEd&&S&&S.named)await cloudUp(true);ch.send({type:'broadcast',event:'done',payload:{}});}).on('broadcast',{event:'pull'},()=>{if(!UI.admEd)admPull();}).subscribe();}\n"+
"function admBack(){if(!UI.admEd)return;S=UI.admOwn;UI.admOwn=null;UI.admEd=null;PRE=null;save();toast('Back to your own save');render(true);}\n"+
"async function admPull(){const sb=await net();if(!sb||!NET.user||UI.admEd)return;const {data}=await sb.from('saves').select('data,updated_at').eq('user_id',NET.user.id).maybeSingle();"+
"if(!data||!data.data||data.data.v!==3)return;const s=data.data;S=migrate(s);S.admEd=s.admEd;S.cloudAt=data.updated_at;PRE=null;try{localStorage.setItem(SAVE,JSON.stringify(S));}catch(e){}toast('An admin changed your save, so it was loaded from the cloud');render(true);}\n"+
"function admBeast(){S.kc=S.kc||{};for(const a of AREAS)for(const id of [...a.mobs,a.dungeon.boss])if(MOB[id]){const m=(MOB[id].boss?BBOSS:BMILE).slice(-1)[0];S.kc[id]=Math.max(S.kc[id]||0,m);}toast('Bestiary maxed');}\n";
function admin(h){
  h=P(h,"const admD=()=>",FN+"const admD=()=>");
  // while an admin edits someone else's save, nothing touches the admin's own save or online rows
  h=P(h,"function save(){try{localStorage.setItem(SAVE,","function save(){if(UI.admEd)return;try{localStorage.setItem(SAVE,");
  h=P(h,"async function cloudUp(force){const sb=await net();if(!sb||!NET.user||!S)return;","async function cloudUp(force){if(UI.admEd){toast('Go back to your own save first');return;}const sb=await net();if(!sb||!NET.user||!S)return;");
  h=P(h,"async function cloudDown(){const sb=await net();if(!sb||!NET.user)return;","async function cloudDown(){if(UI.admEd){toast('Go back to your own save first');return;}const sb=await net();if(!sb||!NET.user)return;");
  h=P(h,"async function spirePost(){const sb=await net();if(!sb||!NET.user||!S||!S.named)return;","async function spirePost(){const sb=await net();if(!sb||!NET.user||!S||!S.named||UI.admEd)return;");
  h=P(h,"async function pvpPost(extra){const sb=await net();if(!sb||!NET.user||!S||!S.named)return;","async function pvpPost(extra){const sb=await net();if(!sb||!NET.user||!S||!S.named||UI.admEd)return;");
  // a player whose save an admin changed gets the changed save on their next check
  const sel="select('level,name,updated_at').eq('user_id',NET.user.id).maybeSingle()";
  if(h.split(sel).length!==3)throw new Error('peek count');
  h=h.split(sel).join("select('level,name,updated_at,adm:data->>admEd').eq('user_id',NET.user.id).maybeSingle()");
  h=P(h,"else NET.cloud=data||null;render(true);}","else{NET.cloud=data||null;if(data&&data.adm&&S&&data.adm!==S.admEd&&!UI.admEd){admPull();return;}}render(true);}");
  h=P(h,"NET.cloud=cur||null;\n  if(!force&&","NET.cloud=cur||null;if(cur&&cur.adm&&cur.adm!==S.admEd){NET.busy=false;NET.msg='';admPull();return;}\n  if(!force&&");
  h=P(h,"async function cloudPeek(){const sb=await net();if(!sb||!NET.user)return;","async function cloudPeek(){const sb=await net();if(!sb||!NET.user)return;admListen();");
  // panel
  h=P(h,"  tab:v=>{UI.admTab=v;},","  tab:v=>{UI.admTab=v;if(v==='players'&&!UI.admPl)admList();},\n  plist:()=>{admList();},\n  pedit:v=>{admOpen(v);},\n  psave:()=>{admWrite();},\n  pback:()=>{admBack();},\n  beast:()=>{admBeast();},");
  h=P(h,"${b('cloud','Clear cloud-load cooldown')}</div>`;}","${b('cloud','Clear cloud-load cooldown')}${b('beast','Max bestiary')}</div>`;}");
  h=P(h,"  else if(T==='devils')body=admDevils(b,sel,num);",
"  else if(T==='players'){const L=UI.admPl||{};body='<div class=\"optrow\">'+b('plist',L.busy?'Loading…':'Refresh list')+'<span class=\"dim small\">Open a save, change it with the other tabs, then save it back. Their game loads it the next time they open it.</span></div>'+(L.err?'<p class=\"small bad\">'+esc(L.err)+'</p>':'')+(L.list||[]).map(r=>'<div class=\"optrow\"><b>'+esc(r.name||'?')+'</b><span class=\"num\">Lv '+(r.level||1)+'</span><span class=\"dim small\">'+esc(new Date(r.updated_at).toLocaleString())+'</span>'+(NET.user&&r.user_id===NET.user.id?'<span class=\"dim small\">(you)</span>':(UI.admAsk===r.user_id?'<span class=\"dim small\">Asking their game to upload…</span>':b('pedit:'+r.user_id,UI.admEd&&UI.admEd.uid===r.user_id?'Reload':'Edit')))+'</div>').join('');}\n  else if(T==='devils')body=admDevils(b,sel,num);");
  h=P(h,"return `<div class=\"row\" style=\"justify-content:space-between\"><div class=\"row\">${tb('player','Player')}${tb('items','Items')}${tb('world','World')}${tb('devils','Devils')}</div>${b('lock','Lock admin')}</div>${body}`;}",
"const ed=UI.admEd?`<div class=\"optrow\" style=\"background:#3a1420;padding:8px\"><b>Editing ${esc(UI.admEd.name)}'s save</b><span class=\"dim small\">${UI.admEd.live?'Fresh from their game.':'They were offline: this is their cloud save from '+esc(new Date(UI.admEd.at).toLocaleString())+'.'} Your own save is put aside. Nothing saves until you press Save.</span>${b('psave','Save to '+esc(UI.admEd.name),'primary')}${b('pback','Back to my save')}</div>`:'';\n  return `${ed}<div class=\"row\" style=\"justify-content:space-between\"><div class=\"row\">${tb('player','Player')}${tb('items','Items')}${tb('world','World')}${tb('devils','Devils')}${tb('players','Players')}</div>${UI.admEd?'':b('lock','Lock admin')}</div>${body}`;}");
  return h;}
module.exports={admin};
