// The Black Crescent as a Relic (metal sets its tier, F to SSS in every stat through tempering), a real slash, a border that rotates, new devil icons, and the Ashen Reach.
const {P}=require('./mech.js');const {art,icons}=require('./ashart.js');
const SLASH=`  bcslash:e=>{const f=sprEl(elFor(e.t)),h=heroEl(),st=document.querySelector('.stage');if(!f||!h||!st)return;const it=S.gear.weapon,sg=it&&it.veil?bcStage(it):0,A=ctr(h),B=ctr(f),SR=st.getBoundingClientRect(),W=B.r.width,H=B.r.height,R=Math.max(W,H)*.72+14+sg*4,TH=GP*(3+Math.min(3,sg)),strikes=[{s:.1,a:-.9,c:1},{s:.3,a:.9,c:-1},{s:.5,a:.08,c:1}].slice(0,sg>=3?3:sg>=1?2:1);
    const lean=Math.round((B.x-A.x)*.3);h.style.transition='transform .09s steps(3)';h.style.transform='translateX('+lean+'px)';setTimeout(()=>{h.style.transform='';setTimeout(()=>{h.style.transition='';},140);},TS(120+strikes.length*170));
    for(const k of strikes){const dx=Math.cos(k.a),dy=Math.sin(k.a),nx=-dy,ny=dx;k.pt=q=>{const u=2*q-1,b=(1-u*u)*R*.34*k.c;return [B.x+dx*u*R+nx*b,B.y+dy*u*R+ny*b];};k.sh=Array.from({length:12+sg*3},()=>({q:.15+Math.random()*.7,v:30+Math.random()*90,o:(Math.random()-.5)*1.5,d:Math.random()*.2,c:['#000000','#000000','#7a1414','#c42828','#ff5a3c','#ffc49a'][Math.floor(Math.random()*6)]}));k.dx=dx;k.dy=dy;k.nx=nx;k.ny=ny;}
    strikes.forEach((k,i)=>setTimeout(()=>{sfx(i?'sbite':'sstare');shake(4+sg+i);flinch(f,180);dsplat(B.x,B.y,{n:8+sg*3,r:W});},TS(k.s*1000)));
    fxo(1000,t=>{stageClip(SR);const veil=t<.08?t/.08:t>.8?(1-t)/.2:1;ditherStage(SR,Math.round(6*veil));
      for(const k of strikes){const u=(t-k.s)/.34;if(u<0||u>1.5)continue;const head=Math.min(1,u/.2),tail=u<.34?0:Math.min(1,(u-.34)/.66),cool=u>.5;const steps=Math.ceil(R/GP*2.4);
        for(let i=0;i<=steps;i++){const q=i/steps;if(q>head||q<tail)continue;const [x,y]=k.pt(q),w=TH*Math.pow(Math.sin(Math.PI*q),.7)*(1-tail*.6);for(let o=-w-GP*1.5;o<=w+GP*1.5;o+=GP){const a=Math.abs(o),X=x+k.nx*o,Y=y+k.ny*o;pp(X,Y,a>w?'#000000':a>w*.72?'#7a1414':a>w*.42||cool?'#c42828':a>w*.2?'#ff5a3c':u<.26?'#ffffff':'#ffc49a',GP);}}
        if(u<.16){const [x,y]=k.pt(Math.min(1,head));for(let i=0;i<8;i++){const a=i*.785,L=GP*(6+(i%2)*5);pline(x+Math.cos(a)*GP*3,y+Math.sin(a)*GP*3,x+Math.cos(a)*L,y+Math.sin(a)*L,i%2?'#000000':'#ff5a3c',GP);}}
        for(const s of k.sh){const a=u-.12-s.d;if(a<0||a>1)continue;const [x,y]=k.pt(s.q),tv=s.v*a,X=x+k.dx*tv+k.nx*tv*s.o,Y=y+k.dy*tv+k.ny*tv*s.o+a*a*46;if(a<.7||(t*40|0)%2)pp(X,Y,s.c,GP*(a<.3?2:1));}
        if(sg&&u>.1&&u<.8&&(t*16|0)%3){const [x,y]=k.pt(.5);pp(x+k.nx*GP*(4+sg)-GP*2,y+k.ny*GP*(4+sg),'#ff5a3c',GP);pp(x+k.nx*GP*(4+sg)+GP*2,y+k.ny*GP*(4+sg),'#ff5a3c',GP);}}
      px.restore();});},
`;
const SCENE=`  wild5:{h:104,bg:c=>{const W=256;sky(c,W,0,84,['#120a0e','#1e0f12','#2e1414','#46201a','#5c2c1e']);const r=rng('ash');
      circ(c,190,26,17,'#1a0d10');circ(c,190,26,15,'#2c1412');for(const [a,b,d,e] of [[178,18,12,1],[186,30,16,1],[192,14,1,14],[198,24,1,12],[182,36,10,1]])F(c,a,b,d,e,'#c43c3c');for(const [a,b,d] of [[188,30,6],[193,20,1]])F(c,a,b,d,1,'#f2c14e');
      ridge(c,'am',W,44,62,84,'#241218');ridge(c,'ah',W,58,72,84,'#190d12',4);
      for(const [x,h] of [[22,46],[64,30],[108,38],[148,26],[226,44]]){const y=86-h;F(c,x,y,4,h,'#0e0810');for(let k=0;k<3;k++){const by=y+4+k*(h/4|0),dir=k%2?1:-1,len=8+((x+k*7)%6);for(let i=0;i<len;i++)F(c,x+1+dir*i,by-(i>>1),2,1,'#0e0810');}F(c,x+1,y+h-8,1,6,'#c43c3c');}
      F(c,0,84,W,20,'#2a2428');for(let i=0;i<70;i++)F(c,r()*W|0,85+r()*18|0,2+r()*6|0,1,i%3?'#3b3238':'#1f1a20');
      for(const [x,w] of [[10,44],[72,30],[122,52],[196,48]]){let X=x;for(let i=0;i<w;i+=4){const y=90+(Math.sin((x+i)*.35)*3|0);F(c,X+i,y,5,1,'#7a1f2b');F(c,X+i+1,y,3,1,'#c43c3c');}}},
    fg:(c,t)=>{const r=rng('flake');for(let i=0;i<34;i++){const sp=.012+r()*.02,x=(r()*300-t*sp*.8+Math.sin(t/900+i)*5)%300,y=(r()*120+t*sp)%110,X=x<0?x+300:x;F(c,X-20,y-4,1+(i%3===0),1,i%2?'#8f88a8aa':'#5d5672aa');}
      const e=rng('emb');for(let i=0;i<16;i++){const sp=.02+e()*.03,x=e()*256,y=104-((e()*104+t*sp)%104);F(c,x+Math.sin(t/300+i)*3,y,1,1,i%3?'#e2782a':'#f2c14e');}
      for(const [x,w,s] of [[12,40,0],[74,26,2],[124,48,4],[198,44,1]])if(Math.sin(t/500+s)>.3){for(let i=0;i<w;i+=8)F(c,x+i,90+(Math.sin((x+i)*.35)*3|0),2,1,'#f2c14e');}}},
`;
const LAIR5=`  // The Last Ember: a burnt hall with no roof and one coal still alive under it
  [c=>{const S0=['#0c0609','#140a0d','#1e0e10','#2a1212','#361612','#40180f'];S0.forEach((k,i)=>F(c,0,i*14,256,14,k));for(const x of [14,52,186,224]){F(c,x,4,20,76,'#120b10');F(c,x+2,4,3,76,'#2a2026');F(c,x+14,4,6,76,'#0a0609');for(let y=12;y<76;y+=18){F(c,x+6,y,8,1,'#c43c3c');F(c,x+8,y,4,1,'#e2782a');}F(c,x-4,0,28,6,'#1a1218');}
      F(c,88,34,80,46,'#0d080b');for(let i=0;i<9;i++)F(c,88+i*10,30-(i%3)*5,6,8,'#0d080b');F(c,104,52,48,28,'#1a0d0e');F(c,114,60,28,20,'#3a1410');F(c,122,66,12,14,'#7a1f2b');
      F(c,0,80,256,24,'#231d22');for(let y=80;y<104;y+=6){F(c,0,y,256,1,'#171216');for(let x=(y/6%2)*20;x<256;x+=40)F(c,x,y,1,6,'#171216');}for(const [x,w] of [[18,50],[92,70],[182,56]]){for(let i=0;i<w;i+=4){const y=88+(Math.sin((x+i)*.4)*4|0);F(c,x+i,y,5,1,'#7a1f2b');F(c,x+i+1,y,2,1,'#c43c3c');}}},
   (c,t)=>{const p=Math.sin(t/420);F(c,122,68-(p>0?1:0),12,12,p>.2?'#c43c3c':'#7a1f2b');F(c,125,71,6,9,p>0?'#f2c14e':'#e2782a');F(c,127,73,2,5,'#fff1a8');const r=rng('lastember');for(let i=0;i<30;i++){const sp=.018+r()*.03,x=r()*256,y=104-((r()*104+t*sp)%104);F(c,x+Math.sin(t/340+i)*4,y,1,1,i%4===0?'#fff1a8':i%2?'#e2782a':'#c43c3c');}for(let i=0;i<14;i++){const sp=.01+r()*.01,x=r()*256,y=(r()*104+t*sp)%104;F(c,x,y,1,1,'#8f88a899');}}],
`;
const AFN=`/* the Ashen Reach: ash cuts your healing the longer a fight runs, and the last boss uses every devil's trick */
function ashCall(e,c,id,n,line){e.ph=(e.ph||0)+1;for(let k=0;k<n;k++){const m=mkEnemy(id,e.L);m.called=true;m.boss=false;m.hp=m.max=Math.round(e.max*.09);m.atk=Math.round(e.atk*.55*10)/10;m.def=e.def*.5;m.xp=0;m.gold=[0,0];m.drops=[];c.enemies.push(m);}log(line,'boss');fx('enrage',{t:c.enemies.indexOf(e)});fx('shake',{p:9});fxAt+=300;}
function ashDevil(e,c){const D=S.devils||{},d=derive();if(D.pact==='hollow'){const x=Math.round(e.max*.12);e.hp=Math.max(1,e.hp-x);log('The Hollow opens behind it and bites. It has waited a long time for this.','boss');fx('num',{t:c.enemies.indexOf(e),txt:String(x),cls:'crit'});}else if(D.pact==='colossus'){const x=Math.round(e.max*.1),y=Math.round(d.maxHp*.15);e.hp=Math.max(1,e.hp-x);S.hp=Math.max(1,S.hp-y);log('A stone arm comes down on you both. He never cared which of you it hit.','boss');fx('num',{t:c.enemies.indexOf(e),txt:String(x),cls:'crit'});fx('num',{t:'p',txt:String(y),cls:'crit'});fx('hp',{t:'p',hp:S.hp,max:d.maxHp});}else if(D.pact==='veiled'){const y=Math.round(d.maxHp*.1);S.hp=Math.max(1,S.hp-y);c.bm=100;log('Her hair closes around it, and around you. The blade is ready. Use it.','boss');fx('num',{t:'p',txt:String(y),cls:'crit'});fx('hp',{t:'p',hp:S.hp,max:d.maxHp});}else log('Nothing comes to help you. You never signed anything.','boss');fx('shake',{p:10});}
function ashBoss(e,c,dmg){if(c.enemies.some(x=>x.called&&x.hp>0))dmg=Math.max(1,Math.round(dmg/2));const left=e.hp-dmg,ph=e.ph||0;if(ph===0&&left<e.max*.7){dmg=Math.max(1,e.hp-Math.ceil(e.max*.7));ashCall(e,c,'ashwalk',2,'It pulls two shadows out of the ash. It takes half damage while they stand.');}else if(ph===1&&left<e.max*.42){dmg=Math.max(1,e.hp-Math.ceil(e.max*.42));ashDevil(e,c);ashCall(e,c,'emberhound',2,'Strings of smoke drop from nowhere and something burning climbs down them.');}else if(ph===2&&left<e.max*.18){e.ph=3;e.atk=Math.round(e.atk*1.2*10)/10;log('The First Ash stands all the way up. There is no sky left behind it.','boss');fx('shake',{p:12});}return dmg;}
function ashEnding(){const D=S.devils||{},who=D.pact==='hollow'?'The Hollow is smiling. It always was.':D.pact==='colossus'?'The Colossus is still hungry. He will be for a long time.':D.pact==='veiled'?'The Veiled takes her strings back, all but one.':'No devil holds your name. They are all a little afraid of that.',o=document.createElement('div');o.id='ashend';o.innerHTML='<div class="ae"><p>The last ember goes out.</p><p>It was the thing they were all running from. Every deal they offered you was for this.</p><p>'+who+'</p><p class="gold">You reached the end of the Ashen Reach.</p><button class="btn primary">Keep walking</button></div>';o.querySelector('button').onclick=()=>o.remove();document.body.appendChild(o);}
`;
function ash(h){
  // the blade as a Relic: tier from the last metal, grades F to SSS across every stat
  h=P(h,"const bcTM=it=>bcLevelTM()*.85*(1+.05*bcStage(it))*(1+.06*(it.vr||[]).length);","const bcTM=it=>TM[it.tier||0]*(1+.05*bcStage(it))*(1+(it.plus||0)*.03);");
  h=P(h,"mkItem('weapon',type,3,6,[],{veil:1","mkItem('weapon',type,0,6,[],{veil:1");
  h=P(h,"if(s.gear&&s.gear.weapon&&s.gear.weapon.veil)s.gear.weapon.rar=6;","if(s.gear&&s.gear.weapon&&s.gear.weapon.veil){const w=s.gear.weapon,v=w.vr||[];w.rar=6;w.tier=v.length?Math.max(0,BC.METALS.indexOf(v[v.length-1])):0;w.plus=w.plus||0;}if((s.cleared||[]).includes(4))s.unlocked=Math.max(s.unlocked||1,6);");
  h=P(h,"const wepGrade=it=>Math.min(8,gradeStart(it)+GSTEP[Math.min(5,it.plus||0)]);","const BCG=[0,2,3,5,6,8];const wepGrade=it=>it.veil?BCG[Math.min(5,it.plus||0)]:Math.min(8,gradeStart(it)+GSTEP[Math.min(5,it.plus||0)]);");
  h=P(h,"const sv=t[wepStat(w.type)];atk=Math.round(","const sv=w.veil?(t.str||0)+(t.dex||0)+(t.int||0):t[wepStat(w.type)];atk=Math.round(");
  h=P(h,"const g=k===ws?gg:0;","const g=k===ws||it.veil?gg:0;");
  h=P(h,"const skMult=id=>SKFAM[id]&&","const skMult=id=>S&&S.gear&&S.gear.weapon&&S.gear.weapon.veil?1:SKFAM[id]&&");
  h=P(h,"<div class=\"rar\">${it.slot==='gem'?","<div class=\"rar\">${it.veil?'Unbound · Relic · Hybrid':it.slot==='gem'?");
  h=P(h,"${W?` · ${TREES[treeOf(W.sub)].n}`:''}","${W&&!it.veil?` · ${TREES[treeOf(W.sub)].n}`:''}");
  h=P(h,"if(!it||it.plus>=5||it.veil)return;const c=empCost(it);","if(!it||it.plus>=5)return;const c=empCost(it);");
  h=P(h,"${it.slot==='weapon'?`Temper to +${it.plus+1}: ${STATL[wepStat(it.type)]}","${it.veil?`Temper to +${it.plus+1}: all stats ${GR[wepGrade(it)]} → ${GR[BCG[it.plus+1]]}`:it.slot==='weapon'?`Temper to +${it.plus+1}: ${STATL[wepStat(it.type)]}");
  // feeding: a new metal replaces the blade's strength; nothing weaker can be fed
  h=P(h,"METALS:['scrap','steel','obsidian','hollow','astral'],COST:[8,8,8,8,8],GOLD:[200,800,2000,4000,8000]","METALS:['scrap','steel','obsidian','hollow','astral','ashsteel'],COST:[8,8,8,8,8,8],GOLD:[200,800,2000,4000,8000,16000]");
  h=P(h,"(it.vr||[]).includes(v)||(S.mats[v]||0)<BC.COST[i]","(it.vr||[]).length&&i<=(it.tier||0)||(S.mats[v]||0)<BC.COST[i]");
  h=P(h,"it.vr=[...(it.vr||[]),v];fx('strike',{perfect:true});","it.vr=[...(it.vr||[]),v];it.tier=i;fx('strike',{perfect:true});");
  h=P(h,"const done=(it.vr||[]).includes(m),ok=!done&&","const done=(it.vr||[]).length>0&&i<=(it.tier||0),ok=!done&&");
  h=P(h,"(done?'Worked into the blade':'+6% blade power')","(done?'Too weak for the blade now':'The blade takes its strength')");
  h=P(h,"It grows with your level. Kills open her eyes","It takes the strength of the last metal you feed it. Kills open her eyes");
  h=P(h,"It grows with your level and your kills, takes the metal of every land you have walked, and gives you Black Moon.","It grows with your kills, takes the strength of the last metal you feed it, and gives you Black Moon.");
  h=P(h,"if(it&&it.veil)it.vr=v==='all'?[...BC.METALS]:[];","if(it&&it.veil){it.vr=v==='all'?[...BC.METALS]:[];it.tier=v==='all'?BC.METALS.length-1:0;}");
  // every player stat starts at 0
  h=P(h,"const BASESTATS={str:4,dex:4,int:4,vit:4,spd:3,luk:3};","const BASESTATS={str:0,dex:0,int:0,vit:0,spd:0,luk:0};");
  h=P(h,"stats:{str:3,dex:3,int:3,vit:3,spd:3,luk:3},hp:1","stats:{str:0,dex:0,int:0,vit:0,spd:0,luk:0},hp:1");
  // the Contract tab only exists while you hold a contract that uses it
  h=P(h,"const tabs=[['craft','Craft'],","if(f.tab==='devil'&&!(S.devils&&(S.devils.pact==='veiled'||S.devils.pact==='colossus')))f.tab='craft';const tabs=[['craft','Craft'],");
  // the new slash
  {const a=h.indexOf("  bcslash:e=>{"),b=h.indexOf("  bcmoon:e=>{");if(a<0||b<a)throw new Error('slash');h=h.slice(0,a)+SLASH+h.slice(b);}
  h=P(h,"return {fxn:'bcslash',dur:320};","return {fxn:'bcslash',dur:340};");
  // devil icons
  h=P(h,"SPR.unmakero=SPR.unmaker;",icons()+art()+"SPR.unmakero=SPR.unmaker;");
  h=P(h,"function vMarks(){","function dvIcon(n,s){const a=x2(n),A=canvasURL(pkey(a,{e:'#c43c3c'}),sprCanvas(a,{e:'#c43c3c'})),B=canvasURL(pkey(a,{e:'#ffe0a0'}),sprCanvas(a,{e:'#ffe0a0'}));return '<img class=\"spr\" data-fr=\"'+frameKey(n+'~pulse',[A,A,A,B,B,A])+'\" src=\"'+A+'\" width=\"'+16*s+'\" height=\"'+16*s+'\" alt=\"\">';}\nfunction vMarks(){");
  h=P(h,"(k==='beatv'?DEVIL.veilImg('vb',1):k==='beatc'?DEVIL.colImg('cm',40):DEVIL.markImg(k))","dvIcon(k==='beatv'?'dv_m3':k==='beatc'?'dv_m2':'dv_m1',2)");
  h=P(h,"An Orb of Rebirth destroys it.\">'+DEVIL.veilImg('vc',1)+'</div>'","An Orb of Rebirth destroys it.\">'+dvIcon('dv_c2',3)+'</div>'");
  h=P(h,"An Orb of Rebirth destroys it.\">'+DEVIL.colImg('cc',54)+'</div>'","An Orb of Rebirth destroys it.\">'+dvIcon('dv_c3',3)+'</div>'");
  h=P(h,"An Orb of Rebirth destroys it.\">'+DEVIL.contractImg()+'</div>'","An Orb of Rebirth destroys it.\">'+dvIcon('dv_c1',3)+'</div>'");
  // Tier 6: Ashen
  h=P(h,"const TM=[1,3,8,18,36];","const TM=[1,3,8,18,36,64];");
  h=P(h,"const TMA=[1,1.8,3,4.5,6.5];","const TMA=[1,1.8,3,4.5,6.5,9];");
  h=P(h,"'Hollow','Abyssal'];","'Hollow','Abyssal','Ashen'];");
  h=P(h,"{m:'astral',q:4,g:600}];","{m:'astral',q:4,g:600},{m:'ashsteel',q:4,g:1100}];");
  h=P(h,"hollow:3,astral:4};","hollow:3,astral:4,ashsteel:5};");
  h=P(h,"TPALB.push(TPALB_A);","TPALB.push(TPALB_A);TPALB.push({W:'#fffaf0',w:'#a8a6a4',G:'#26242e',y:'#e6e1d3',Y:'#ffffff',Q:'#d9ccff',V:'#8f7bd8',X:'#d9ccff'});");
  h=P(h,"const TPALS=(p,t)=>t===4?","const TPALS=(p,t)=>t===5?{B:'#26242e',b:'#111018',Q:'#d9ccff',V:'#8f7bd8'}:t===4?");
  for(const [a,b] of [['Abyssal Plate','Ashen Plate'],['Sharkskin','Greyhide'],['Tidecaller Robe','Sootweave Robe'],['Abyssal Helm','Ashen Helm'],['Shark Cap','Grey Cap'],['Tidecaller Hood','Sootweave Hood'],['Abyssal Greaves','Ashen Greaves'],['Shark Boots','Grey Boots'],['Tidecaller Slippers','Sootweave Slippers']])h=P(h,"'"+a+"']","'"+a+"','"+b+"']");
  h=P(h,"speed:[.9,.95,1,1.05,1.1][sp.tier]","speed:[.9,.95,1,1.05,1.1,1.15][sp.tier]");
  h=h.split("[16,15,14,13,12][MG.spec.tier]").join("[16,15,14,13,12,11][MG.spec.tier]");
  h=P(h,"const tierNow=()=>Math.min(4,S.unlocked-1);","const tierNow=()=>Math.min(5,S.unlocked-1);");
  h=P(h,"const tier=Math.min(4,tw?","const tier=Math.min(5,tw?");
  h=h.split("[1,1,2,2,2][tier]").join("[1,1,2,2,2,3][tier]").split("[1,2,3,3,3][tier]").join("[1,2,3,3,3,4][tier]");
  h=P(h,"add(['scrap','steel','obsidian','hollow','astral'][Math.min(4,it.tier||0)],1);","add(['scrap','steel','obsidian','hollow','astral','ashsteel'][Math.min(5,it.tier||0)],1);");
  h=P(h,"['#1a2a36','#101c26']][v];","['#1a2a36','#101c26'],['#2a1c1e','#1a1014']][v];");
  h=P(h,"<span class=\"dim small\">Rarity</span>${RAR.map(","<span class=\"dim small\">Rarity</span>${RAR.slice(0,6).map(");
  // materials
  h=P(h,"const MATS={","const MATS={ashsteel:'Ashsteel',cinder:'Grey Husk',soot:'Soot Silk',lastember:'Heart of Ash',");
  h=P(h,"const MATICON={","const MATICON={ashsteel:['m_chunk','#e6e1d3','#6e6c7c','#26242e'],cinder:['m_chunk','#a8a6a4','#54535c','#26242e'],soot:['m_leaf','#8f88a8','#3b3948','#16151c'],lastember:['m_heart','#ffffff','#d9ccff','#8f7bd8'],");
  h=P(h,"['astral','voidsilk','starshard']];","['astral','voidsilk','starshard'],['ashsteel','cinder','soot']];");
  h=P(h,"  kingsoul:{q:1,fx:'soul',d:'Kills restore 10% HP'},","  cinder:{q:2,aff:{def:5}}, soot:{q:2,aff:{crit:5}}, lastember:{q:1,fx:'soul',d:'Kills restore 10% HP'},\n  kingsoul:{q:1,fx:'soul',d:'Kills restore 10% HP'},");
  h=P(h,"'starshard','voidsilk'])SUP[m].to='weapon';","'starshard','voidsilk','soot','lastember'])SUP[m].to='weapon';");
  // monsters
  h=P(h,"const MOB={\n","const MOB={\n  ashwalk:{ash:1,n:'Ashwalker',hp:135,atk:17.5,def:5,spd:4,xp:18,gold:[5,9],drops:[['cinder',50],['ashsteel',25]],ab:[['heavy',24],['bleed',22]],weak:'storm'},\n  emberhound:{ash:1,n:'Pale Hound',hp:92,atk:20,def:3,spd:11,xp:18,gold:[5,9],drops:[['cinder',35],['soot',20]],ab:[['bleed',26],['poison',22]],weak:'frost',res:'venom'},\n  sootpriest:{ash:1,n:'Grey Priest',hp:110,atk:18.5,def:3.5,spd:7,xp:19,gold:[5,10],drops:[['soot',50],['ashsteel',25]],ab:[['drain',26],['heal',12],['stun',10]],weak:'fire',res:'frost'},\n  firstash:{ash:1,n:'The First Ash',hp:300,atk:8.6,def:4.6,spd:7,xp:26,gold:[9,14],drops:[['lastember',100],['essence',100]],ab:[['heavy',22],['burn',24],['stun',10]],boss:1},\n");
  h=P(h,"const ELITE={","const ELITE={ashwalk:['The Unburied','Burier'],emberhound:['Whitejaw','Whitejaw\\'s Bane'],sootpriest:['Mother Grey','Grey\\'s Bane'],");
  h=P(h,"const ANIM={","const ANIM={ashwalk:'breathe',emberhound:'flicker',sootpriest:'ripple',firstash:'breathe',");
  h=P(h,"const BOSSMECH={","const BOSSMECH={firstash:{every:3,mult:1.7,cue:\"breathes in and every ember in the world leans toward it\"},");
  h=P(h,"${e.id==='unmaker'?'huge':''}","${e.id==='unmaker'||e.id==='firstash'?'huge':''}");
  h=P(h,"mobs:['stalker','sentinel','siren'],dungeon:{name:'The Drowned Lighthouse',floors:[['stalker','sentinel'],['stalker','sentinel','siren']],boss:'unmaker'}},\n","mobs:['stalker','sentinel','siren'],dungeon:{name:'The Drowned Lighthouse',floors:[['stalker','sentinel'],['stalker','sentinel','siren']],boss:'unmaker'}},\n  {name:'The Ashen Reach',lv:[35,49],boss:50,weak:'storm',res:'venom',mobs:['ashwalk','emberhound','sootpriest'],dungeon:{name:'The Grey Throne',floors:[['ashwalk','emberhound'],['ashwalk','sootpriest','emberhound']],boss:'firstash'}},\n");
  h=P(h,"const UNIQ={\n","const UNIQ={\n  ashfather:{n:'Ashfather',type:'greatsword',tier:5,from:'firstash',fx:'erupt',col:'#d9ccff',a:'Last Light',d:'Crits erupt for 50% damage to all other enemies',affs:{crit:7,str:4}},\n  cinderrod:{n:'Rod of Grey Light',type:'stormrod',tier:5,from:'firstash',fx:'prism',col:'#d9ccff',a:'Prism',d:'Elemental hits split onto another enemy for 40%',affs:{mp:14,crit:5}},\n");
  h=P(h,"function mkEnemy(id,L){const b=MOB[id];const Le=L>35?","function mkEnemy(id,L){const b=MOB[id];const Le=b.ash?24.5+Math.max(0,L-35)*.3:L>35?");
  // scenes
  h=P(h,"  wild4:{h:104,",SCENE+"  wild4:{h:104,");
  {const a="for(let x=0";const i=h.indexOf("const SCENES={"),j=h.lastIndexOf("];",i);if(j<0)throw new Error('lair');const hd=h.slice(0,j).trimEnd();h=hd+(hd.endsWith(',')?'':',')+String.fromCharCode(10)+LAIR5+h.slice(j);}
  // the region's rule and the last boss
  h=P(h,"function heal(v){const d=derive();v=Math.round(v);","function heal(v){const d=derive(),ca=C();v=Math.round(v*(ca&&ca.ash?1-ca.ash/100:1));");
  h=P(h,"if(S.gear.weapon&&S.gear.weapon.veil)c.bm=Math.min(100,(c.bm||0)+17);","if(S.area===5&&(c.ctx==='wild'||c.ctx==='dungeon')&&!(S.dungeon&&S.dungeon.gem)){if(!c.ash)log('Ash settles on you. Healing gets weaker every turn.','boss');c.ash=Math.min(60,(c.ash||0)+5);}if(S.gear.weapon&&S.gear.weapon.veil)c.bm=Math.min(100,(c.bm||0)+17);");
  h=P(h,"if(c.over&&c.over.win&&c.over.loot.cleared)where=c.over.loot.cleared;","if(c.over&&c.over.win&&c.over.loot.cleared)where=c.over.loot.cleared;else if(c.ash&&!c.over)where+=' · Ash: healing −'+c.ash+'%';");
  h=P(h,"if(e.id==='hollowd'){if(!e.summoned&&e.hp-dmg<e.max*.6)","if(e.id==='firstash')dmg=ashBoss(e,c,dmg);if(e.id==='hollowd'){if(!e.summoned&&e.hp-dmg<e.max*.6)");
  h=P(h,"function kingCalls(e,c,i){",AFN+"function kingCalls(e,c,i){");
  h=P(h,"if(D.stage>=A.dungeon.floors.length){loot.cleared=A.dungeon.name;","if(D.stage>=A.dungeon.floors.length){loot.cleared=A.dungeon.name;if(D.area===5&&!S.flags.ashend){S.flags.ashend=1;setTimeout(ashEnding,2200);}");
  h=P(h,"  ['crown','Crownbreaker','Clear the Hollow Throne',()=>S.cleared.includes(3),{ess:15}],","  ['crown','Crownbreaker','Clear the Hollow Throne',()=>S.cleared.includes(3),{ess:15}],\n  ['lastember','The Grey Throne','Beat The First Ash',()=>S.cleared.includes(5),{ess:40}],");
  h=P(h,".doll{display:grid;","#ashend{position:fixed;inset:0;background:#000;z-index:9500;display:grid;place-items:center;padding:16px;text-align:center}#ashend .ae{max-width:520px;display:flex;flex-direction:column;gap:14px;align-items:center;color:#f4efe4}#ashend p{margin:0;animation:aefade 1.2s steps(6) both}#ashend p:nth-child(2){animation-delay:1.2s}#ashend p:nth-child(3){animation-delay:2.4s}#ashend p:nth-child(4){animation-delay:3.6s}#ashend button{animation:aefade 1s steps(5) 4.6s both}@keyframes aefade{from{opacity:0}to{opacity:1}}\n.doll{display:grid;");
  h=require('./mechfree.js').free(h);
  h=require('./mechrescue.js').rescue(h);
  if(!process.env.NOFINAL)h=require('./mechfinal.js').final(h);
  if(!process.env.NOFINAL&&!process.env.NOD7)h=require('./mechdevil7.js').devil7(h);
  return h;}
module.exports={ash};
