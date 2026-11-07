// Live duels: a matchmaking queue. Everyone searching shares one presence channel; the two who have waited longest are paired,
// and both work out the same duel code from their ids, so no request has to be sent.
const {P}=require('./mech.js');
const FN=
"function dqCode(a,b){let h=0;for(const ch of a+'|'+b)h=(h*31+ch.charCodeAt(0))>>>0;const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let c='';for(let i=0;i<4;i++){c+=A[h%A.length];h=Math.floor(h/A.length);}return c;}\n"+
"function dqLeave(){const Q=NET.dq;if(!Q)return;NET.dq=null;if(Q.t)clearTimeout(Q.t);try{Q.ch.untrack();NET.sb.removeChannel(Q.ch);}catch(e){}}\n"+
"function dqCheck(){const Q=NET.dq;if(!Q||Q.paired||NET.duel)return;const st=Q.ch.presenceState(),seen={};const L=[];for(const k in st)for(const p of st[k])if(p&&p.uid&&!seen[p.uid]&&p.v===DUELV){seen[p.uid]=1;L.push(p);}\n"+
"  L.sort((a,b)=>a.at-b.at||(a.uid<b.uid?-1:1));Q.n=L.length;const i=L.findIndex(p=>p.uid===NET.user.id);const o=i>=0&&i%2===0?L[i+1]:null;if(!o){render(true);return;}\n"+
"  Q.paired=1;const code=dqCode(NET.user.id,o.uid+Date.now());Q.ch.send({type:'broadcast',event:'match',payload:{to:o.uid,code,name:pname().slice(0,16)}});setTimeout(()=>{if(NET.dq===Q)dqLeave();dqGo(code,true,o.name);},500);}\n"+
"async function dqGo(code,host,name){await duelOpen(code,host);const D=NET.duel;if(!D||D.code!==code)return;D.q=1;toast('Match found: '+(name||'a player'));render(true);\n"+
"  setTimeout(()=>{if(NET.duel===D&&!D.started){duelClose();toast('They did not connect. Back in the queue.');dqJoin();}},12000);}\n"+
"async function dqJoin(){const sb=await net();if(!sb||!NET.user||NET.dq||NET.duel)return;if(S.combat){toast('Finish your fight first');return;}if(!NET.pvpMe)pvpMe();\n"+
"  const ch=sb.channel('duelq',{config:{presence:{key:NET.user.id}}});const Q=NET.dq={ch,n:1};\n"+
"  ch.on('presence',{event:'sync'},()=>{if(NET.dq===Q)dqCheck();}).on('broadcast',{event:'match'},({payload:p})=>{if(NET.dq!==Q||Q.paired||!p||p.to!==NET.user.id||!/^[A-Z0-9]{4}$/.test(p.code||''))return;Q.paired=1;dqLeave();dqGo(p.code,false,p.name);}).subscribe(async st=>{if(st==='SUBSCRIBED'&&NET.dq===Q)await ch.track({uid:NET.user.id,name:pname().slice(0,16),lvl:S.lvl,rating:(NET.pvpMe||{}).rating||1000,v:DUELV,at:Date.now()});});render(true);}\n";
function queue(h){
  h=P(h,"function vArena(){",FN+"function vArena(){");
  h=P(h,"  duelcancel:()=>{duelClose();},","  duelcancel:()=>{duelClose();},\n  dq:()=>{dqJoin();return 'async';},\n  dqno:()=>{dqLeave();},");
  h=P(h,"const FREE=['unstick',","const FREE=['dq','dqno','unstick',");
  h=P(h,"  const body=D&&!D.started?`<div class=\"row\"><span class=\"tag gold\" style=\"font-size:1.1rem\">Code: ${D.code}</span>",
"  const Q=NET.dq;if(Q&&!D)return `<div class=\"sub\"><h3>Duel</h3><div class=\"row\"><span class=\"tag gold\">Searching for an opponent…</span><span class=\"dim small\">${Q.n>1?Q.n+' players in the queue':'Nobody else is searching yet'}</span><button class=\"btn sm\" data-a=\"dqno\">Cancel</button></div></div>`;\n"+
"  if(D&&D.q&&!D.started)return `<div class=\"sub\"><h3>Duel</h3><div class=\"row\"><span class=\"tag gold\">Match found. Connecting…</span><button class=\"btn sm\" data-a=\"duelcancel\">Cancel</button></div></div>`;\n"+
"  const body=D&&!D.started?`<div class=\"row\"><span class=\"tag gold\" style=\"font-size:1.1rem\">Code: ${D.code}</span>");
  h=P(h,":`<div class=\"row\"><button class=\"btn primary\" data-a=\"duelnew\" ${S.combat?'disabled':''}>Create a duel</button><span class=\"dim small\">or</span>",
":`<div class=\"row\"><button class=\"btn primary\" data-a=\"dq\" ${S.combat?'disabled':''}>Find a match</button></div><p class=\"dim small\">Or duel a specific friend:</p><div class=\"row\"><button class=\"btn sm\" data-a=\"duelnew\" ${S.combat?'disabled':''}>Create a code</button><span class=\"dim small\">or</span>");
  h=P(h,"<div class=\"row\" style=\"justify-content:space-between\"><h3>Duel a friend</h3>${me?","<div class=\"row\" style=\"justify-content:space-between\"><h3>Duel</h3>${me?");
  h=P(h,"Live, turn by turn: you both play your own character. One of you creates a duel and shares the 4-letter code; the other types it in. You both heal to full first, and nobody loses gold.",
"Live, turn by turn: you both play your own character. Press Find a match and you'll be paired with the next player who searches. You both heal to full first, and nobody loses gold.");
  return h;}
module.exports={queue};
