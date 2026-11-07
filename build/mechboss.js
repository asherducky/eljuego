// Infinity Tower floors by area, Guard scaled by defense, an arena per boss, charge and big move animations, a locked Vault card.
const {P}=require('./mech.js');
const LAIRCODE=`/* a lair per boss: [background, moving parts] */
const crystal32=(c,x,base,h,w,a,b)=>{for(let j=0;j<h;j++){const wd=Math.max(1,Math.round(w*(1-j/h)));F(c,x-wd,base-j,wd,1,a);F(c,x,base-j,wd,1,b);}};
const LAIR=[
  // Rootbound Crypt: roots through old brick, tombstones, mushrooms
  [c=>{bricks(c,0,0,256,80,'#26332a','#1a241c');F(c,98,20,60,60,'#0a0812');for(let y=8;y<20;y++){const k=Math.sqrt(1-((20-y)/12)**2);F(c,128-30*k,y,60*k,1,'#0a0812');}
    for(const [x,n] of [[18,46],[52,28],[84,18],[172,22],[206,34],[238,52]]){F(c,x,0,4,n,'#3a2416');F(c,x+1,0,1,n,'#5a3a22');F(c,x-3,n-8,3,2,'#3a2416');F(c,x+4,n-14,3,2,'#3a2416');F(c,x-2,0,8,3,'#2f6b3a');}
    for(const x of [26,206]){F(c,x,62,18,18,'#4a4f4a');F(c,x+2,59,14,3,'#4a4f4a');F(c,x+8,65,2,9,'#2a2e2a');F(c,x+5,68,8,2,'#2a2e2a');F(c,x,76,18,4,'#2f6b3a');}
    F(c,0,80,256,24,'#1c2a1e');c.fillStyle='#142016';for(let y=80;y<104;y+=6)c.fillRect(0,y,256,1);F(c,0,86,76,3,'#3a2416');F(c,180,94,76,3,'#3a2416');
    for(const [x,y] of [[62,78],[176,82],[150,76]]){F(c,x,y-5,2,5,'#c9c2a6');F(c,x-3,y-7,8,3,'#6aa84f');F(c,x-1,y-7,2,1,'#b6e36a');}},
   (c,t)=>{for(let i=0;i<14;i++){const x=(i*37+t/70)%256,y=(i*23+t/45)%80;F(c,x,y,1,1,i%3?'#6aa84f':'#b6e36a');}for(const [x,n] of [[120,14],[136,20]])for(let j=0;j<n;j+=2)F(c,x+Math.round(Math.sin(t/500+j*.2)*2),j,2,2,j%6?'#2f6b3a':'#6aa84f');}],
  // Mirror Tomb: a crystal hall with a mirrored floor and a glass throne
  [c=>{bricks(c,0,0,256,80,'#2e2444','#241a36');const L=[[24,80,62,14,'#e05aa8','#8a2f6a'],[58,80,36,9,'#6fb7e8','#3a5ea8'],[92,80,24,7,'#c4ecff','#6fb7e8'],[164,80,28,8,'#c4ecff','#6fb7e8'],[198,80,44,10,'#e05aa8','#8a2f6a'],[232,80,68,15,'#6fb7e8','#3a5ea8']];for(const k of L)crystal32(c,...k);crystal32(c,128,80,52,18,'#f4efe4','#c9c2d6');F(c,118,62,20,18,'#2e2444');F(c,120,60,16,4,'#e05aa8');
    F(c,0,80,256,24,'#3a2e52');for(const [x,,h,w,a,b] of L){for(let j=0;j<Math.min(22,h/2);j++){const wd=Math.max(1,Math.round(w*.6*(1-j/(h/2))));F(c,x-wd,81+j,wd,1,'#5a3f6a');F(c,x,81+j,wd,1,'#463658');}}F(c,0,80,256,1,'#c4ecff');},
   (c,t)=>{for(let i=0;i<16;i++){const x=(i*59)%256,y=(i*31)%78;if(Math.sin(t/260+i*2)>.55){F(c,x,y,1,1,'#ffffff');F(c,x-1,y,3,1,'#c4ecff');F(c,x,y-1,1,3,'#c4ecff');}}for(let i=0;i<5;i++){const x=40+i*44,y=30+Math.sin(t/600+i)*8;F(c,x,y,2,4,i%2?'#e05aa8':'#c4ecff');F(c,x,y,1,1,'#ffffff');}}],
  // Caldera Throne: black rock, lavafalls, a throne of cooled stone
  [c=>{bricks(c,0,0,256,80,'#2a1a18','#1a0f0e');for(const x of [26,214]){F(c,x-2,0,20,80,'#1a0f0e');F(c,x,0,16,80,'#c43c3c');F(c,x+3,0,10,80,'#e2782a');}
    F(c,104,34,48,46,'#14100f');F(c,108,38,40,42,'#221816');for(const [x,n] of [[104,14],[116,24],[128,30],[140,24],[152,14]]){for(let j=0;j<n;j++)F(c,x-Math.max(0,3-j/4),34-j,Math.max(1,6-j/4),1,'#14100f');}F(c,118,44,20,36,'#14100f');F(c,118,44,20,2,'#e2782a');
    F(c,0,80,256,24,'#1a1214');for(const [x,y,w] of [[0,84,40],[36,86,30],[120,92,36],[190,86,66],[60,98,50]]){F(c,x,y,w,1,'#c43c3c');F(c,x+4,y,Math.max(1,w-10),1,'#e2782a');}F(c,30,80,12,4,'#e2782a');F(c,218,80,12,4,'#e2782a');},
   (c,t)=>{for(const x of [26,214])for(let k=0;k<4;k++){const y=(k*26+t/18)%96-16;F(c,x+3+k*3,y,2,12,k%2?'#f2c14e':'#fff1a8');}for(let i=0;i<16;i++){const x=(i*41+Math.sin(t/300+i)*6+256)%256,y=80-((i*17+t/30)%80);F(c,x,y,1,1,i%3?'#e2782a':'#f2c14e');}for(const x of [14,60,130,202])if(Math.sin(t/200+x)>.2)F(c,x,86+(x%10),3,1,'#f2c14e');}],
  // Hollow Throne: moonlit hall, tattered banners, an empty bone throne
  [c=>{F(c,0,0,256,80,'#14162a');bricks(c,0,0,256,80,'#191b30','#14162a');F(c,108,6,40,44,'#0e0f1c');F(c,112,10,32,40,'#1d2b52');for(let y=4;y<10;y++){const k=Math.sqrt(1-((10-y)/6)**2);F(c,128-16*k,y,32*k,1,'#1d2b52');}F(c,127,6,2,44,'#0e0f1c');F(c,112,26,32,2,'#0e0f1c');F(c,132,14,8,8,'#f4efe4');F(c,134,14,6,6,'#1d2b52');
    for(const x of [24,72,170,218]){F(c,x,0,14,80,'#2a2c44');F(c,x,0,3,80,'#3f4260');F(c,x+11,0,3,80,'#1a1c30');F(c,x-2,0,18,4,'#3f4260');F(c,x-2,76,18,4,'#3f4260');}
    for(const x of [46,194]){F(c,x,4,18,36,'#3a1f4a');F(c,x+2,4,3,36,'#5a2f6a');for(let i=0;i<18;i+=4)F(c,x+i,40,2,3+(i%3)*2,'#3a1f4a');F(c,x+6,14,6,6,'#c9c2d6');}
    F(c,114,40,28,40,'#0e0f1c');F(c,116,36,24,6,'#e8e0cc');for(const x of [114,122,132,140])F(c,x,30,2,8,'#e8e0cc');F(c,120,46,16,34,'#191b30');F(c,120,62,16,4,'#a89c86');
    for(let y=80;y<104;y+=6)for(let x=((y-80)/6%2)*12;x<256;x+=24){F(c,x,y,12,6,'#22243a');}F(c,0,80,256,1,'#3f4260');},
   (c,t)=>{for(const x of [30,78,176,224]){const f=Math.sin(t/90+x)>0;F(c,x,48,2,6,'#e8e0cc');F(c,x,f?44:45,2,f?4:3,'#9cc8ff');F(c,x,47,2,1,'#ffffff');}for(let i=0;i<6;i++){const x=(i*47+t/90)%256,y=30+i*8+Math.sin(t/400+i)*6;F(c,x,y,2,2,'#9cc8ff');F(c,x-2,y+1,2,1,'#3a5ea8');}}],
  // Drowned Lighthouse: a stormy sea at night, a broken lighthouse, a wet deck
  [c=>{const S0=['#0b1422','#0f1a2e','#13263f','#1a3350','#1f3d5c'];S0.forEach((k,i)=>F(c,0,i*13,256,13,k));for(const [x,y,w] of [[10,8,60],[80,4,40],[120,14,70],[20,24,44],[200,6,50]]){F(c,x,y,w,6,'#1d2b42');F(c,x+6,y-3,w-14,3,'#26364f');}
    F(c,186,62,44,10,'#1a1a26');F(c,196,16,26,50,'#c9c2d6');F(c,214,16,8,50,'#8f88a8');for(const y of [24,40,56])F(c,196,y,26,6,'#c43c3c');F(c,194,12,30,4,'#3b3450');F(c,200,2,18,10,'#14162a');F(c,201,3,6,8,'#0b1422');F(c,216,0,3,6,'#3b3450');
    F(c,0,65,256,15,'#123f52');F(c,0,65,256,1,'#3a8a8a');for(const [x,w] of [[10,30],[60,44],[126,28]])F(c,x,72,w,1,'#1f6a80');F(c,0,80,256,24,'#2a2230');for(let y=80;y<104;y+=6){F(c,0,y,256,1,'#1a1622');for(let x=(y/6%2)*20;x<256;x+=40)F(c,x,y,1,6,'#1a1622');}F(c,0,80,256,2,'#4a3f4a');},
   (c,t)=>{const ph=Math.floor(t/4000)%3,lg=t%4000;if(ph===1&&lg<160){F(c,0,0,256,2,'#c4ecff');let x=70,y=0;for(let k=0;k<7;k++){const nx=x+((k*37)%13)-6;F(c,Math.min(x,nx),y,Math.abs(nx-x)+1,1,'#ffffff');F(c,nx,y,1,9,'#fff1a8');x=nx;y+=9;}}
    F(c,204,5,4,5,Math.sin(t/300)>0?'#fff1a8':'#f2c14e');for(let i=0;i<40;i++){const x=(i*29-t/8)%256,y=(i*17+t/5)%80,X=x<0?x+256:x;F(c,X,y,1,3,'#6fb7e8');}for(let x=0;x<256;x+=6){const y=65+Math.round(Math.sin(t/400+x*.08));F(c,x,y,3,1,'#c4ecff');}for(let x=0;x<256;x+=11)if(Math.sin(t/120+x)>.8)F(c,x,82+(x%18),2,1,'#6fb7e8');}]
];
`;
const CODE=`/* Guard: blocks more the higher your defense is against this enemy, the same for all its moves */
const guardCut=(d,e)=>.45+.35*d.def/Math.max(1,d.def+e.atk);
/* while a boss charges, its arena reacts */
function bossChargeFx(f,s){const e=S.combat.enemies[+f.dataset.foe];if(!e||!e.big)return;const c=ctr(s),w=c.r.width,h=c.r.height,b=c.r.bottom,rx=()=>c.x+(Math.random()-.5)*w*1.3;
  if(e.id==='warden'){const x=rx();fxo(300,t=>{const g=Math.min(1,t*2)*22;for(let j=0;j<g;j+=GP)pp(x+Math.sin(j*.3)*2,b-j,j%6<3?'#2f6b3a':'#6aa84f',GU);});burst(rx(),b,{n:2,col:['#6aa84f','#3a2416'],angle:-1.57,spread:.6,spd:2,grav:.1,life:18});}
  if(e.id==='queen'){const a=Math.random()*6.283,R0=w*.9;burst(c.x+Math.cos(a)*R0,c.y+Math.sin(a)*R0,{n:2,col:['#e05aa8','#c4ecff','#ffffff'],angle:a+3.14,spread:.1,spd:5,life:14,size:2});}
  if(e.id==='tyrant'){burst(rx(),b,{n:4,col:['#e2782a','#f2c14e','#c43c3c'],angle:-1.57,spread:.5,spd:5,grav:.22,life:22});if(Math.random()<.3)shake(2);}
  if(e.id==='hking'){ringFx(c.x,c.y,w*.9,w*.3,['#3a5ea8','#9cc8ff'],240);burst(rx(),b,{n:1,col:['#9cc8ff','#3a5ea8'],angle:-1.57,spread:.2,spd:2,grav:-.02,life:30});}
  if(e.id==='unmaker'){const M=mawAt(s),a=Math.random()*6.283;burst(M.x+Math.cos(a)*90,M.y+Math.sin(a)*70,{n:2,col:['#6fb7e8','#c4ecff'],angle:a+3.14,spread:.1,spd:6,life:13});}}
/* the charged move lands with its own big hit, on top of the signature move */
function bigMove(e,A,B,f){
  if(e.id==='warden'){f.animate([{transform:'scale(1)'},{transform:'scale(1.15,.9)'},{transform:'scale(1)'}],{duration:TS(360),easing:'steps(3)'});fxo(620,t=>{const n=Math.min(1,t*2.6),fade=t>.7?1-(t-.7)/.3:1,y=A.r.bottom;for(let k=0;k<8;k++){const x=A.x+(k-3.5)*11,top=(46+(k%3)*20)*n*fade;pline(x,y,x+(k-3.5)*2,y-top,k%2?'#3a2416':'#2f6b3a',GU*3);pline(x,y,x+(k-3.5)*2,y-top,'#6aa84f',GU);}});setTimeout(()=>{ringFx(A.x,y0(A),8,A.r.width*1.6,['#6aa84f','#3a2416'],380,.3);shake(12);},TS(240));}
  if(e.id==='queen'){const ux=A.x-B.x,uy=A.y-B.y,L=Math.hypot(ux,uy)||1;fxo(360,t=>{const k=Math.min(1,t*1.9),hx=B.x+ux*k,hy=B.y+uy*k,tx=hx-ux/L*150,ty=hy-uy/L*150;pline(tx,ty,hx,hy,'#8a2f6a',GU*4);pline(tx,ty,hx,hy,'#e05aa8',GU*2);pline(tx,ty,hx,hy,'#ffffff',GP);});setTimeout(()=>{burst(A.x,A.y,{n:50,col:['#e05aa8','#c4ecff','#ffffff'],spd:8,life:30});ringFx(A.x,A.y,6,A.r.width*1.5,['#e05aa8','#c4ecff'],340);shake(12);},TS(190));}
  if(e.id==='tyrant'){for(let k=0;k<4;k++)setTimeout(()=>{firePillar({...A,x:A.x+(k-1.5)*44});shake(7);},TS(180+k*120));crackFx(A.x-140,A.x+140,A.r.bottom-4,900);}
  if(e.id==='hking'){const x=A.x;fxo(520,t=>{const k=Math.min(1,t*2),Y=A.y-260+230*k,a=t>.8?(1-t)*5:1;if(a<=0)return;px.globalAlpha=a;pline(x,Y-120,x,Y,'#1d2b52',GU*6);pline(x,Y-118,x,Y-2,'#9cc8ff',GU*3);pline(x,Y-116,x,Y-4,'#ffffff',GU);pline(x-24,Y-100,x+24,Y-100,'#f2c14e',GU*2);px.globalAlpha=1;});setTimeout(()=>{ringFx(x,A.y,8,A.r.width*1.7,['#9cc8ff','#3a5ea8'],360);burst(x,A.y,{n:40,col:['#9cc8ff','#ffffff','#3a5ea8'],spd:7,life:30});shake(12);},TS(260));}}
const y0=A=>A.r.bottom;
`;
function boss(h,g){
  // the Vault lives in the Challenges column, locked until its region opens
  h=P(h,"<h3>Challenges</h3>${spire}</div>","<h3>Challenges</h3>${spire}${vVault()}</div>");
  h=P(h,"\n  ${vVault()}\n  </section></div>`;","\n  </section></div>`;");
  h=P(h,"function vVault(){if(S.unlocked<=VAULT.hollow.area)return '';","function vVault(){if(S.unlocked<=VAULT.hollow.area)return '<div class=\"area lockd\">'+sprImg('lock',3)+'<span class=\"al\">'+VAULTN+' · reach '+AREAS[VAULT.hollow.area].name+'</span></div>';");
  h=P(h,"return '<div class=\"sub dungeon\"><div class=\"eyebrow\">Dungeon</div><h2>'+VAULTN+'</h2>","return '<div class=\"sub spire\"><b>'+VAULTN+'</b>");
  // tower: ten floors per area up to 50, then every floor is random
  h=P(h,"const ai=Math.min(ua,Math.floor((f-1)/6)),L=f+1;","const rnd=f>50,ai=Math.min(4,Math.floor((f-1)/10)),A=AREAS[ai],L=rnd?36+(f-51):Math.round(A.lv[0]+(A.lv[1]-A.lv[0])*((f-1)%10)/9);");
  h=P(h,"const pool=AREAS.slice(0,ai+1).flatMap(a=>a.mobs);let list;","const pool=rnd?AREAS.flatMap(a=>a.mobs):A.mobs;let list;");
  h=P(h,"if(f%10===0){const ba=[...S.cleared].sort((a,b)=>b-a).find(a=>a<=ai);list=ba!==undefined?[mkEnemy(AREAS[ba].dungeon.boss,L)]:[mkElite(pick(pool),L)];}","if(f%10===0)list=[rnd?mkEnemy(pick(AREAS).dungeon.boss,L):mkEnemy(A.dungeon.boss,A.boss)];");
  h=P(h,"addMat(f>=30&&f%10===0?'crys5':f>=25?'crys4':f>=15?'crys3':'crys2',1)","addMat(f>=50&&f%10===0?'crys5':f>=45?'crys4':f>=30?'crys3':'crys2',1)");
  h=P(h,"Math.min(4,Math.floor(f/10))));}","Math.min(4,Math.floor(f/15))));}");
  h=P(h,"A champion every 5 floors, a boss every 10.","Ten floors per region, then random after floor 50. A champion every 5, a boss every 10.");
  // Guard scales with defense
  h=P(h,"if(c.ps.guard)dmg*=big?0.15:.5;","if(c.ps.guard)dmg*=1-guardCut(d,e);");
  h=P(h,"Halve damage until your next turn, and take 85% less from a charged boss move. Restores some MP.","Take 45–80% less damage until your next turn, more with higher defense. Restores some MP.");
  // lairs
  h=P(h,"const SCENES={",LAIRCODE+"const SCENES={");
  h=P(h,"  dun:{h:104,bg:","  lair:{h:104,bg:(c,v)=>LAIR[v][0](c),fg:(c,t,v)=>LAIR[v][1](c,t)},\n  dun:{h:104,bg:");
  h=P(h,"const scene=c.ctx==='duel'||c.ctx==='pvp'?'arena':c.ctx==='dungeon'||c.ctx==='tower'?'dun':'wild'+S.area;","const bossE=(c.ctx==='dungeon'||c.ctx==='tower')&&c.enemies.find(e=>e.boss),lairV=bossE?AREAS.findIndex(a=>a.dungeon.boss===bossE.id):-1;\n  const scene=c.ctx==='duel'||c.ctx==='pvp'?'arena':lairV>=0?'lair':c.ctx==='dungeon'||c.ctx==='tower'?'dun':'wild'+S.area,sceneV=lairV>=0?lairV:c.ctx==='tower'&&S.tower?Math.min(4,Math.floor((S.tower.floor-1)/10)):D?D.area:S.area;");
  h=P(h,"data-scene=\"${scene}\" data-v=\"${S.area}\"","data-scene=\"${scene}\" data-v=\"${sceneV}\"");
  // moves
  h=P(h,"const NUMS={};\nconst PLAY={",CODE+"const NUMS={};\nconst PLAY={");
  h=P(h,"bsig:e=>{const hh=heroEl(),f=sprEl(elFor(e.t));if(!hh||!f)return;const A=ctr(hh),B=ctr(f);if(e.ab&&e.ab!=='heavy'){bsig2(e,A,B,f);return;}","bsig:e=>{const hh=heroEl(),f=sprEl(elFor(e.t));if(!hh||!f)return;const A=ctr(hh),B=ctr(f);if(e.ab&&e.ab!=='heavy'){bsig2(e,A,B,f);return;}if(e.big&&e.id!=='unmaker')bigMove(e,A,B,f);");
  h=P(h,"document.querySelectorAll('.foe.charging').forEach(f=>{const s=sprEl(f);if(!s)return;","document.querySelectorAll('.foe.charging').forEach(f=>{const s=sprEl(f);if(!s)return;bossChargeFx(f,s);");
  // shields: casting again refreshes instead of stacking, and mage shields are a share of max HP, not ATK
  h=P(h,"c.ps.shield=(c.ps.shield||0)+v;log(`You gain","c.ps.shield=Math.max(c.ps.shield||0,v);log(`You gain");
  h=P(h,"get d(){return rv('icebarrier',['Shield of 200% ATK','Shield of 250% ATK','Shield of 300% ATK']);},use:(e,d)=>shield(d.atk*rv('icebarrier',[2,2.5,3]))","get d(){return rv('icebarrier',['Shield of 25% max HP','Shield of 30% max HP','Shield of 35% max HP']);},use:(e,d)=>shield(d.maxHp*rv('icebarrier',[.25,.3,.35]))");
  h=P(h,"get d(){return rv('emberward',['Shield of 150% ATK; attackers catch fire','Shield of 200% ATK; attackers catch fire','Shield of 250% ATK; attackers catch fire']);},use:(e,d)=>{shield(d.atk*rv('emberward',[1.5,2,2.5]));","get d(){return rv('emberward',['Shield of 30% max HP; attackers catch fire','Shield of 35% max HP; attackers catch fire','Shield of 40% max HP; attackers catch fire']);},use:(e,d)=>{shield(d.maxHp*rv('emberward',[.3,.35,.4]));");
  h=P(h,"get d(){return rv('staticshield',['Shield of 150% ATK; enemies that hit you get Shocked','Shield of 200% ATK; enemies that hit you get Shocked','Shield of 250% ATK; enemies that hit you get Shocked']);},use:(e,d)=>{shield(d.atk*rv('staticshield',[1.5,2,2.5]));","get d(){return rv('staticshield',['Shield of 20% max HP; enemies that hit you get Shocked','Shield of 25% max HP; enemies that hit you get Shocked','Shield of 30% max HP; enemies that hit you get Shocked']);},use:(e,d)=>{shield(d.maxHp*rv('staticshield',[.2,.25,.3]));");
  h=P(h,"get d(){return rv('winter',['Heal 15% HP, shield of 100% ATK','Heal 20% HP, shield of 125% ATK','Heal 25% HP, shield of 150% ATK']);},use:(e,d)=>{heal(d.maxHp*rv('winter',[.15,.2,.25]));shield(d.atk*rv('winter',[1,1.25,1.5]));}","get d(){return rv('winter',['Heal 15% HP, shield of 10% max HP','Heal 20% HP, shield of 12% max HP','Heal 25% HP, shield of 15% max HP']);},use:(e,d)=>{heal(d.maxHp*rv('winter',[.15,.2,.25]));shield(d.maxHp*rv('winter',[.1,.12,.15]));}");
  // Bloodforged: smaller bonus and smaller cost
  h=P(h,"short:'+15% damage, +8% lifesteal, −20% max HP'","short:'+8% damage, +3% lifesteal, −10% max HP'");
  h=P(h,"bloodblade:'+15% damage and +8% lifesteal, but −20% max HP.'","bloodblade:'+8% damage and +3% lifesteal, but −10% max HP.'");
  h=P(h,"if(fx.includes('bloodblade'))b.ls+=8;","if(fx.includes('bloodblade'))b.ls+=3;");
  h=P(h,"(fx.includes('bloodblade')?.8:1);const bb=fx.includes('bloodblade')?1.15:1;","(fx.includes('bloodblade')?.9:1);const bb=fx.includes('bloodblade')?1.08:1;");
  // the name
  h=h.split('Endless Spire').join('Infinity Tower').split('Spire').join('Tower');
  return h;}
module.exports={boss};
