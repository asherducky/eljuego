// Status visuals and indicators, and hides the enemy's normal next move. Only charge warnings stay on screen.
const {P}=require('./mech.js');
function ui(h){
  // next move: only a boss's charge is shown; Analyze still reports it
  h=P(h,"const showInt=e.hp>0&&!c.over;","const showInt=e.hp>0&&!c.over&&(e.big||e.intent==='charge');");
  h=P(h,"const chargeOf=(e,c)=>e.boss&&e.hp>0&&","const chargeOf=(e,c)=>e.big&&e.boss&&e.hp>0&&");
  h=P(h,"<div class=\"small\">Next: ${INTN[e.intent]||'—'}</div>","");
  // status chips: icon, name, stacks and turns left
  h=P(h,"return `<span class=\"st\" data-tip=\"st:${k}\" style=\"border-color:${col}\">${sprImg(ic,2)}${s?`<b style=\"color:${col}\">×${s}</b>`:''}${t!==''?`<span class=\"num\">${t===99?'∞':t}</span>`:''}</span>`;}).join('');}",
  "const fr=k==='stun'&&v.frz;return `<span class=\"st\" data-tip=\"st:${fr?'chill':k}\" style=\"border-color:${fr?STCOL.chill:col}\">${sprImg(fr?'st_chill':ic,3)}<small style=\"color:${fr?STCOL.chill:col}\">${fr?'Frozen':STN[k]||k}</small>${s?`<b style=\"color:${col}\">×${s}</b>`:''}${t!==''&&k!=='shield'&&k!=='ward'?`<span class=\"num\">${t===99?'∞':t+'t'}</span>`:''}${k==='shield'||k==='ward'?`<span class=\"num\">${v}</span>`:''}</span>`;}).join('');}\nconst STN={burn:'Burn',poison:'Poison',bleed:'Bleed',stun:'Stun',shield:'Shield',veil:'Veil',chill:'Chill',shock:'Shock',brk:'Sundered',riposte:'Riposte',evade:'Evade',emberward:'Ember',ward:'Ward',haste:'Haste',rage:'Rage',staticward:'Static',pguard:'Parry',guard:'Guard',mark:'Marked'};");
  h=P(h,"<div class=\"sts\">${e.enraged?sprImg('st_rage',2):''}${stIcons(e.st)}</div>","<div class=\"sts\">${e.enraged?`<span class=\"st\" style=\"border-color:#c43c3c\">${sprImg('st_rage',3)}<small style=\"color:#ff9a8f\">Enraged</small></span>`:''}${e.exposed?`<span class=\"st\" style=\"border-color:#f2c14e\">${sprImg('st_brk',3)}<small style=\"color:#f2c14e\">Exposed</small></span>`:''}${e.ccImm>0?`<span class=\"st\" style=\"border-color:#8f88a8\">${sprImg('st_stun',3)}<small>Immune</small><span class=\"num\">${e.ccImm}t</span></span>`:''}${stIcons(e.st)}</div>");
  h=P(h,".sts{display:flex;gap:3px;min-height:16px;",".st small{font-size:.72rem}@media(max-width:800px){.st small{display:none}}.foe.frz img.body{filter:sepia(1) hue-rotate(170deg) saturate(2.4) brightness(1.1)}.sts{display:flex;gap:3px;min-height:16px;");
  // frozen: blue sprite that stops moving
  h=P(h,"${e.id==='unmaker'?'huge':''} ${chargeOf(e,c)?'charging':''}\"","${e.id==='unmaker'?'huge':''} ${chargeOf(e,c)?'charging':''} ${up&&e.st.stun&&e.st.stun.frz?'frz':''}\"");
  h=P(h,"sprImg(e.maw&&up?'unmakero':e.id,e.id==='unmaker'?ps+Math.ceil(ps/3):ps,up?'idle body':'body')","(s=>e.st.stun&&e.st.stun.frz?s.replace(' data-fr=',' data-still='):s)(sprImg(e.maw&&up?'unmakero':e.id,e.id==='unmaker'?ps+Math.ceil(ps/3):ps,up?'idle body':'body'))");
  // pixel effects on whoever has the status
  h=P(h,"const BOSSSIG={warden:",`function stVisual(el,st){const s=sprEl(el);if(!s)return;const c=ctr(s),w=c.r.width,hh=c.r.height,rx=()=>c.x+(Math.random()-.5)*w*.7,ry=f=>c.r.top+hh*f;const hold=d=>FXO.push({t0:performance.now(),dur:210,draw:d});
  if(st.burn){const n=Math.min(5,2+Math.floor((st.burn.s||1)/2));burst(rx(),ry(.4+Math.random()*.5),{n,col:['#e2782a','#f2c14e','#c43c3c','#fff1a8'],angle:-1.57,spread:.5,spd:2,grav:-.03,life:24,size:1.5});const tall=Math.min(.6,.25+(st.burn.s||1)*.05);hold(()=>{const now=performance.now();for(let k=0;k<6;k++){const x=c.r.left+w*(.12+k*.15),t=hh*tall*(.55+.45*Math.abs(Math.sin(now/110+k*1.9))),b=c.r.bottom;for(let j=0;j<t;j+=GU){const wd=Math.max(GP,Math.round((1-j/t)*GU*3));const f=j/t;pp(x-wd/2+Math.sin(now/90+j*.1+k)*GP,b-j,f<.35?'#fff1a8':f<.7?'#f2c14e':'#e2782a',wd);}}});}
  if(st.poison&&Math.random()<.7)burst(rx(),ry(.5+Math.random()*.4),{n:1,col:['#6aa84f','#b6e36a','#2f6b3a'],angle:-1.57,spread:.4,spd:.7,grav:-.01,life:30});
  if(st.bleed)burst(rx(),ry(.25+Math.random()*.4),{n:1,col:['#c43c3c','#7a1f2b','#ff6b5e'],angle:1.57,spread:.3,spd:.3,grav:.16,life:22});
  if(st.chill)burst(rx(),ry(Math.random()*.3),{n:Math.min(3,st.chill.s||1),col:['#c4ecff','#ffffff','#6fb7e8'],angle:1.57,spread:.8,spd:.6,grav:.01,life:30});
  if(st.shock&&Math.random()<.6){let x=rx(),y=ry(Math.random()*.4);const pts=[];for(let k=0;k<4;k++){pts.push([x,y]);x+=(Math.random()-.5)*20;y+=hh*.1;}FXO.push({t0:performance.now(),dur:120,draw:()=>{for(let k=0;k<3;k++)pline(pts[k][0],pts[k][1],pts[k+1][0],pts[k+1][1],k%2?'#f2e14e':'#ffffff',GU);}});}
  if(st.stun&&!st.stun.frz)hold(t=>{const a=performance.now()/260;for(let k=0;k<3;k++){const b=a+k*2.09,x=c.x+Math.cos(b)*w*.22,y=c.r.top-4+Math.sin(b)*5;pp(x,y,'#f2c14e',GU);pp(x+GU,y,'#fff1a8',GP);pp(x-GP,y,'#fff1a8',GP);pp(x,y-GP,'#fff1a8',GP);pp(x,y+GU,'#fff1a8',GP);}});
  if(st.stun&&st.stun.frz)hold(()=>{for(let k=0;k<7;k++){const x=c.r.left+w*(.08+k*.14),t=hh*[.3,.48,.24,.56,.34,.46,.26][k],b=c.r.bottom;for(let j=0;j<t;j+=GU){const wd=Math.max(GP,Math.round((1-j/t)*GU*3));const col=j<GU*2?'#3a5ea8':k%2?'#6fb7e8':'#9cc8ff';pp(x-wd/2,b-j,col,wd);if(j%(GU*4)===0)pp(x,b-j,'#ffffff',GP);}}});}
setInterval(()=>{if(!S||!S.combat||S.combat.over||document.hidden||RM)return;const c=S.combat;document.querySelectorAll('.foe:not(.dead)').forEach(f=>{const e=c.enemies[+f.dataset.foe];if(e&&e.st&&e.hp>0)stVisual(f,e.st);});const he=document.getElementById('hero');if(he&&c.ps)stVisual(he,c.ps);},170);
const BOSSSIG={warden:`);
  return h;}
module.exports={ui};
