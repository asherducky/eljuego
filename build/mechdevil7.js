// Three devil regions after the Ashen Reach, the final tier T7 (Devil) with devil armor, and Tower bosses that scale only by floor.
const {P}=require('./mech.js');const {MON}=require('./devart7.js');
const half=g=>{const o=[];for(let y=0;y<g.length;y+=2){let r='';for(let x=0;x<g[0].length;x+=2)r+=g[y][x];o.push(r);}return o;};
const ART=Object.entries(MON).map(([k,g])=>'SPR.'+k+'='+JSON.stringify(half(g))+';SPR[\''+k+'@2\']='+JSON.stringify(g)+';').join('\n')+'\n';
const ARMOR=`ARM32.plate.push({m:'#1e1820',d:'#0e0b12',h:'#3a2a36',a:'#8a1a26',g:'#c41e2e'});ARM32.leather.push({m:'#1f1a2b',d:'#0e0b14',h:'#2a2433',a:'#6e6680',g:'#c41e2e'});ARM32.robe.push({m:'#140f16',d:'#09070b',h:'#2a2030',a:'#8a1a26',g:'#6e6680'});TRIM.push('#8a1a26');
// Titan Plate: slabs of red rock, a face carved in the chest with burning eyes, a boulder on the shoulder that watches
ARM32X.plate.push((R,P,o)=>{const m='#1e1820',d='#0e0b12',h='#8a1a26',y='#c41e2e',Y='#ff5a5a',k='#1f1a2b',b='#5a0f1a';
  if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);P(22,19,y);P(23,20,y);P(22,21,y);R(22,23,5,3,d);R(22,23,5,1,h);R(19,11,8,6,m);R(19,11,8,1,h);R(25,12,2,5,d);R(20,13,3,2,k);P(21,13,y);P(22,13,Y);P(18,14,d);P(26,10,h);return;}
  for(let x=9;x<23;x+=3){R(x,27,3,3+(x%2),x>17?d:m);P(x,27,h);P(x+1,29,y);}
  R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,1,9,h);
  R(11,18,3,2,k);P(12,18,y);P(12,19,Y);R(17,18,3,2,k);P(18,18,y);P(18,19,Y);R(12,22,7,2,k);for(let x=12;x<19;x+=2)P(x,22,b);
  P(10,17,y);P(11,21,y);P(20,23,y);P(21,17,y);R(11,14,10,2,d);R(12,14,8,1,h);R(9,25,14,2,k);R(15,25,2,2,y);P(15,25,Y);});
ARM32TOP.plate.push((R,P)=>{R(4,12,7,5,'#1e1820');R(4,12,7,1,'#8a1a26');R(5,14,2,1,'#1f1a2b');P(5,14,'#c41e2e');P(6,14,'#ff5a5a');P(3,13,'#0e0b12');});
// Hollowhide: black wraps with white cross stitches, a smile across the chest, ghost light at the shoulder
ARM32X.leather.push((R,P,o)=>{const m='#1f1a2b',d='#0e0b14',h='#2a2433',w='#6e6680',g='#c41e2e',c='#ff5a5a';
  if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);P(22,18,w);P(24,18,w);P(23,19,w);P(22,20,w);P(24,20,w);R(22,23,5,3,d);R(22,23,5,1,h);P(22,14,g);P(23,13,c);P(21,12,g);P(24,11,c);return;}
  R(10,27,12,2,m);for(let x=9;x<23;x+=3){R(x,29,2,2+(x%2),x>17?d:m);P(x,29,h);}
  R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,1,9,h);
  for(const [x,y] of [[12,18],[18,18]]){P(x,y,w);P(x-1,y-1,w);P(x+1,y-1,w);P(x-1,y+1,w);P(x+1,y+1,w);}
  for(let x=11;x<=20;x++){const y=21+(Math.abs(x-15.5)<4?1:0);P(x,y,d);if(x%2)P(x,y-1,w);}
  for(let y=16;y<25;y+=2){P(9,y,w);P(22,y,'#4a3f4a');}R(10,14,12,2,h);R(11,14,10,1,'#3a2a36');R(9,25,14,2,d);R(15,25,2,2,g);});
ARM32TOP.leather.push((R,P)=>{P(6,13,'#c41e2e');P(5,12,'#ff5a5a');P(7,11,'#c41e2e');R(5,15,5,1,'#2a2433');});
// Veilweave Robe: a long plum robe, a porcelain mask at the heart, red strings from the sleeves, a lace hem and her black hair
ARM32X.robe.push((R,P,o)=>{const m='#140f16',d='#09070b',h='#2a2030',a='#8a1a26',w='#6e6680',j='#5a0f1a',k='#0e0b14';
  if(o){R(20,16,6,7,m);R(20,16,6,1,h);R(24,17,2,6,d);R(19,22,8,2,w);for(let x=19;x<27;x+=2)P(x,23,j);R(22,24,5,2,SKIN.s);R(22,25,5,1,SKIN.S);for(let y=26;y<34;y++)if(y%2)P(23,y,a);for(let y=26;y<31;y++)if(y%2===0)P(25,y,a);return;}
  R(9,26,14,9,m);R(8,30,16,5,m);R(19,26,4,9,d);R(21,30,3,5,d);for(let x=8;x<24;x++){P(x,35,x%2?w:j);if(x%3===0)P(x,36,w);}
  for(let y=26;y<35;y+=2){P(12,y,a);P(17,y+1,a);}R(9,15,14,11,m);R(19,15,4,11,d);R(9,15,1,16,k);R(22,15,1,14,k);
  R(14,17,4,4,w);R(14,17,4,1,'#4a3f4a');P(15,18,'#1f1a2b');P(17,18,'#1f1a2b');P(16,20,a);R(9,24,14,2,a);R(9,25,14,1,'#1e1820');R(11,13,3,3,h);R(18,13,3,3,d);});
ARM32TOP.robe.push((R,P)=>{R(7,12,3,4,'#140f16');P(8,11,'#6e6680');for(let y=15;y<22;y+=2)P(5,y,'#8a1a26');});
BOOT32X.greaves.push((R,P,x,w,p)=>{R(x,30,5,5,p.m);R(x,30,5,1,p.h);P(x+2,32,p.g);P(x+1,33,'#ff5a5a');P(x+3,31,p.g);R(x,36,w,1,p.h);R(x,38,w,1,p.d);P(x+w,37,p.h);});
BOOT32X.shoes.push((R,P,x,w,p)=>{R(x,34,5,1,'#6e6680');P(x+1,36,'#6e6680');P(x+3,36,'#6e6680');P(x+2,37,'#6e6680');R(x,38,w,1,'#0e0b14');P(x+2,35,p.g);});
BOOT32X.treads.push((R,P,x,w,p)=>{R(x,35,w,4,'#09070b');R(x,35,w,1,'#8a1a26');P(x+1,37,'#6e6680');P(x+w-2,37,'#6e6680');P(x+w,36,'#8a1a26');});
HAT32X.helm.push((R,P,p)=>{const hn='#16121c';for(const [x,y] of [[7,5],[6,4],[5,3],[5,2],[4,1],[24,5],[25,4],[26,3],[26,2],[27,1]])P(x,y,hn);P(4,0,'#2a2433');P(27,0,'#2a2433');const y='#c41e2e',Y='#ff5a5a';helmB(R,p,y);R(13,0,7,2,p.h);for(const [x,yy] of [[8,4],[7,3],[6,2],[6,1],[22,4],[23,3],[24,2],[24,1]])P(x,yy,p.m);P(6,0,p.h);P(24,0,p.h);P(15,7,Y);P(20,7,Y);R(11,11,1,3,y);P(12,4,y);P(13,5,y);});
HAT32X.cap.push((R,P,p)=>{for(const [x,y] of [[10,0],[9,1],[9,2],[21,0],[22,1],[22,2]])P(x,y,'#16121c');const w='#6e6680',k='#0e0b14';capB(R,p);R(7,3,2,10,p.m);R(14,5,9,8,w);R(14,5,9,1,'#4a3f4a');for(const [x,y] of [[16,8],[21,8]]){P(x,y,k);P(x-1,y-1,k);P(x+1,y-1,k);P(x-1,y+1,k);P(x+1,y+1,k);}for(let x=15;x<23;x++){P(x,11,k);if(x%2)P(x,10,'#5a0f1a');}P(13,6,'#c41e2e');});
HAT32X.hood.push((R,P,p)=>{for(const [x,y] of [[9,0],[8,1],[22,0],[23,1]])P(x,y,'#16121c');hoodB(R,p,'#8a1a26');for(let y=4;y<9;y++)for(let x=13;x<23;x++)if((x*3+y*5)%7===0)P(x,y,'#2a2030');R(13,4,10,1,'#8a1a26');P(14,9,'#8a1a26');P(21,9,'#8a1a26');R(12,2,11,1,'#8a1a26');P(11,2,'#1e1820');R(6,14,4,8,'#0e0b14');R(5,16,1,6,'#0e0b14');});
`;
const SCENES=`  wild6:{h:104,bg:c=>{const W=256;sky(c,W,0,86,['#05040a','#0a0916','#100e22','#161430','#1d1a3a']);starsBG(c,'h6',30,W,50);
      for(let x=40;x<216;x+=1){const y=26+Math.sin((x-40)/176*Math.PI)*16;if(x%7<5)F(c,x,y,1,3,'#f4efe4');F(c,x,y+3,1,1,'#3b3450');}
      for(const [cx,cy] of [[74,12],[182,12]]){for(let i=-4;i<=4;i++){F(c,cx+i,cy+i,2,1,'#3b3450');F(c,cx-i,cy+i,2,1,'#3b3450');}}
      for(const [x,y,w] of [[16,52,40],[96,44,30],[176,56,46],[220,40,22]]){F(c,x,y,w,6,'#161430');F(c,x+3,y+6,w-6,3,'#0a0916');F(c,x+6,y+9,w-12,2,'#05040a');F(c,x,y,w,1,'#3b3450');}
      F(c,0,86,W,18,'#0a0916');for(let i=0;i<40;i++){const x=(i*61)%W,y=88+(i*7)%14;F(c,x,y,4+(i%5),1,'#1d1a3a');}for(const x of [30,110,200]){F(c,x,82,3,4,'#9cc8ff');F(c,x+1,80,1,2,'#c4ecff');}},
    fg:(c,t)=>{const r=rng('h6m');for(let i=0;i<26;i++){const sp=.01+r()*.02,x=r()*256+Math.sin(t/900+i)*6,y=104-((r()*104+t*sp)%104);if(i%4===0){F(c,x-1,y-1,1,1,'#c4ecff');F(c,x+1,y+1,1,1,'#c4ecff');F(c,x+1,y-1,1,1,'#c4ecff');F(c,x-1,y+1,1,1,'#c4ecff');}else F(c,x,y,1,1,i%2?'#9cc8ff':'#f4efe4');}for(const x of [30,110,200]){const f=Math.sin(t/180+x)>0;F(c,x,f?79:80,3,f?3:2,'#c4ecff');}}},
  wild7:{h:104,bg:c=>{const W=256;sky(c,W,0,86,['#2a0d10','#4a1418','#6e1f1c','#8a2f20','#a8452a']);
      for(const [x,s] of [[40,1.3],[128,1.7],[214,1.1]]){const r=14*s,y=60-r*.4;circ(c,x,y,r,'#4a1020');circ(c,x,y,r-2,'#5a1820');F(c,x-r*.5,y-2,r*.35,2,'#1f1a2b');F(c,x+r*.15,y-2,r*.35,2,'#1f1a2b');F(c,x-r*.4,y-2,2,2,'#f2c14e');F(c,x+r*.25,y-2,2,2,'#f2c14e');F(c,x-r*.4,y+r*.4,r*.8,2,'#1f1a2b');}
      ridge(c,'q7',W,58,72,86,'#4a1020');ridge(c,'q7b',W,70,80,86,'#3a0c14',4);
      for(const x of [20,84,150,236]){for(let y=0;y<60;y+=3)F(c,x,y,2,2,y%6?'#3b3450':'#5d5672');}
      F(c,0,86,W,18,'#3a0c14');for(let i=0;i<60;i++){const x=(i*47)%W,y=87+(i*5)%16;F(c,x,y,3+(i%4),2,i%3?'#5a1820':'#7a1f2b');}},
    fg:(c,t)=>{const r=rng('q7d');for(let i=0;i<34;i++){const sp=.02+r()*.03,x=(r()*300+t*sp*.6)%300-20,y=(r()*104+t*sp*.3)%104;F(c,x,y,1,1,i%3?'#c43c3c99':'#ff9a5c99');}for(let i=0;i<5;i++){const T=(t/700+i*1.7)%6;if(T<1){const x=(i*53+30)%256;F(c,x,T*86,2,2,'#7a1f2b');}}const g=Math.sin(t/600)>0;if(g)for(const [x,s] of [[40,1.3],[128,1.7],[214,1.1]]){const r=14*s,y=60-r*.4;F(c,x-r*.4,y-2,2,2,'#fff1a8');F(c,x+r*.25,y-2,2,2,'#fff1a8');}}},
  wild8:{h:104,bg:c=>{const W=256;F(c,0,0,W,104,'#0b070d');
      for(const sx of [0,1]){for(let i=0;i<9;i++){const x=sx?W-10-i*6:i*6,w=6;F(c,x,0,w,86,i%2?'#7a1f2b':'#5a1420');F(c,x+(sx?4:1),0,1,86,'#a8304a');}}
      F(c,0,0,W,10,'#5a1420');for(let x=0;x<W;x+=12){F(c,x,10,12,3,'#7a1f2b');F(c,x+5,13,2,2,'#f2c14e');}
      for(const [x,w] of [[70,40],[150,44]]){for(let y=13;y<86;y++){const k=(y-13)/73,ww=w*k;if(y%2)F(c,x-ww/2+20,y,ww,1,'#f4efe40d');}}
      for(let i=0;i<14;i++){const x=40+i*13;F(c,x,0,1,20+((i*17)%30),'#c9c2d6');if(i%3===0){F(c,x-2,20+((i*17)%30),5,6,'#3b2a20');F(c,x-1,18+((i*17)%30),3,2,'#e8e0cc');}}
      F(c,0,86,W,18,'#3b2414');for(let y=86;y<104;y+=4)F(c,0,y,W,1,'#2a180e');for(let x=0;x<W;x+=24)F(c,x,86,1,18,'#2a180e');F(c,0,86,W,1,'#8a5a32');},
    fg:(c,t)=>{const r=rng('v8d');for(let i=0;i<30;i++){const x=60+r()*140,y=(r()*86+t*.008*(1+r()))%86+12;F(c,x,y,1,1,'#f4efe466');}for(let i=0;i<14;i++){const x=40+i*13,L=20+((i*17)%30),sw=Math.round(Math.sin(t/700+i)*2);F(c,x+sw,L-6,1,6,'#c9c2d6');}}},
`;
const LAIRS=`  // The Empty Throat: a mouth of white teeth around a black floor
  [c=>{F(c,0,0,256,104,'#05040a');for(let x=0;x<256;x+=10){const h=14+((x*7)%9);F(c,x,0,8,h,'#e8e0cc');F(c,x+1,h-2,6,2,'#c9c2d6');F(c,x,104-26-((x*5)%8),8,26,'#e8e0cc');}F(c,0,80,256,24,'#0a0916');for(let x=40;x<216;x+=22){F(c,x,60,3,20,'#161430');F(c,x+1,58,1,2,'#9cc8ff');}},
   (c,t)=>{const o=Math.round(Math.sin(t/900)*2);for(let x=0;x<256;x+=10){F(c,x,14+((x*7)%9)+o,8,1,'#5d5672');}for(let x=40;x<216;x+=22){if(Math.sin(t/170+x)>0)F(c,x+1,57,1,1,'#c4ecff');}}],
  // The Sleeping Giant: a seated stone giant fills the hall, its eyes just open
  [c=>{const S0=['#1a0608','#2a0a0e','#3a0c14','#4a1018','#5a1420'];S0.forEach((k,i)=>F(c,0,i*16,256,16,k));F(c,58,6,140,74,'#4a1020');F(c,86,0,84,40,'#5a1820');F(c,100,14,18,6,'#1f1a2b');F(c,138,14,18,6,'#1f1a2b');F(c,108,30,40,8,'#1f1a2b');F(c,40,40,40,40,'#4a1020');F(c,176,40,40,40,'#4a1020');F(c,0,80,256,24,'#2a0a0e');for(let x=0;x<256;x+=20)F(c,x,80,1,24,'#1a0608');},
   (c,t)=>{const k=Math.sin(t/700)>0;F(c,104,15,4,3,k?'#fff1a8':'#f2c14e');F(c,148,15,4,3,k?'#fff1a8':'#f2c14e');const r=rng('sg');for(let i=0;i<24;i++){const x=r()*256,y=(r()*104+t*.02)%104;F(c,x,y,1,1,'#c43c3c99');}}],
  // Curtain Call: the grand stage, a single spotlight and an empty chair
  [c=>{F(c,0,0,256,104,'#0b070d');for(let i=0;i<12;i++){F(c,i*7,0,7,86,i%2?'#7a1f2b':'#5a1420');F(c,256-7-i*7,0,7,86,i%2?'#7a1f2b':'#5a1420');}F(c,0,0,256,12,'#5a1420');for(let x=0;x<256;x+=10)F(c,x,12,10,3,'#7a1f2b');for(let y=12;y<86;y++){const k=(y-12)/74,w=20+90*k;if(y%2)F(c,128-w/2,y,w,1,'#f4efe410');}F(c,118,58,20,26,'#2a180e');F(c,120,46,16,14,'#2a180e');F(c,121,47,14,3,'#c43c3c');F(c,0,86,256,18,'#3b2414');F(c,0,86,256,1,'#8a5a32');for(let y=88;y<104;y+=4)F(c,0,y,256,1,'#2a180e');},
   (c,t)=>{for(let i=0;i<10;i++){const x=40+i*20,L=30+((i*13)%20),sw=Math.round(Math.sin(t/650+i)*2);F(c,x+sw,0,1,L,'#c9c2d6');}const r=rng('cc');for(let i=0;i<24;i++){const x=88+r()*80,y=(r()*74+t*.01)%74+12;F(c,x,y,1,1,'#f4efe455');}}],
`;
const DEVFN=`const DEVB=['dhollow','dcolossus','dveiled'];
function dCall(e,c,id,n,frac,line){for(let k=0;k<n;k++){const m=mkEnemy(id,e.L);m.called=true;m.minion=true;m.boss=false;m.hp=m.max=Math.round(e.max*frac);m.atk=Math.round(e.atk*.5*10)/10;m.def=e.def*.6;m.xp=0;m.gold=[0,0];m.drops=[];c.enemies.push(m);fx('frise',{t:c.enemies.length-1});}if(line)log(line,'boss');fx('shake',{p:8});fxAt+=300;}
function devStart(list){const e=list.find(x=>x.id==='dcolossus');if(!e)return;for(let k=0;k<2;k++){const m=mkEnemy('stonearm',e.L);m.minion=true;m.boss=false;m.n='His Arm';m.hp=m.max=Math.round(e.max*.03);m.atk=Math.round(e.atk*.55*10)/10;m.def=e.def*.6;m.xp=0;m.gold=[0,0];m.drops=[];m.pierce=.7;list.unshift(m);}}
function devBoss(e,c,dmg){const up=c.enemies.filter(x=>x.minion&&x.hp>0).length;if(up)dmg=Math.max(1,Math.round(dmg*(e.id==='dveiled'?.35:.5)));const left=e.hp-dmg,ph=e.ph||0;
  if(e.id==='dhollow'){if(ph===0&&left<e.max*.6){dmg=Math.max(1,e.hp-Math.ceil(e.max*.6));e.ph=1;dCall(e,c,'hcrawl',2,.012,'Two faces crawl out of the dark. It takes half damage while they live.');}else if(ph===1&&left<e.max*.25){dmg=Math.max(1,e.hp-Math.ceil(e.max*.25));e.ph=2;e.atk=Math.round(e.atk*1.2*10)/10;dCall(e,c,'hgrin',2,.012,'It stops smiling. Two grins float free. It hits 20% harder.');}}
  if(e.id==='dcolossus'&&ph===0&&left<e.max*.5){dmg=Math.max(1,e.hp-Math.ceil(e.max*.5));e.ph=1;e.atk=Math.round(e.atk*1.15*10)/10;dCall(e,c,'stonearm',2,.03,'His arms grow back. He takes half damage while they stand, and hits 15% harder.');}
  return dmg;}
function devTurn(c){const R=c.enemies.find(x=>x.id==='dveiled'&&x.hp>0);if(!R)return;c.dvt=(c.dvt||0)+1;const up=c.enemies.filter(x=>x.minion&&x.hp>0).length;if(c.dvt%(R.hp<R.max/2?2:3)!==1||up>=3)return;dCall(R,c,'vpuppet',1,.01,'A puppet drops on its strings. She takes 65% less damage while any stand.');}
function towerBoss(e){const R=['warden','queen','tyrant','hking','unmaker'].map(id=>mkEnemy(id,e.L)),avg=k=>R.reduce((a,x)=>a+x[k],0)/R.length;e.hp=e.max=Math.round(avg('hp'));e.atk=Math.round(avg('atk')*10)/10;e.def=Math.round(avg('def')*10)/10;}
`;
const AREA=(name,mobs,dname,boss)=>`  {name:'${name}',lv:[50,50],boss:50,mobs:${JSON.stringify(mobs)},dungeon:{name:'${dname}',floors:[${JSON.stringify(mobs.slice(0,2))},${JSON.stringify(mobs)}],boss:'${boss}'}},\n`;
function devil7(h){
  // T7: the Devil tier
  h=P(h,"const TM=[1,3,8,18,36,64];","const TM=[1,3,8,18,36,64,110];");
  h=P(h,"const TMA=[1,1.8,3,4.5,6.5,9];","const TMA=[1,1.8,3,4.5,6.5,9,12.5];");
  h=P(h,"'Hollow','Abyssal','Ashen'];","'Hollow','Abyssal','Ashen','Devil'];");
  h=P(h,"{m:'ashsteel',q:4,g:1100}];","{m:'ashsteel',q:4,g:1100},{m:'pactsteel',q:4,g:1800}];");
  h=P(h,"hollow:3,astral:4,ashsteel:5};","hollow:3,astral:4,ashsteel:5,pactsteel:6};");
  h=P(h,"TPALB.push({W:'#fffaf0',w:'#a8a6a4',G:'#26242e',y:'#e6e1d3',Y:'#ffffff',Q:'#d9ccff',V:'#8f7bd8',X:'#d9ccff'});","TPALB.push({W:'#fffaf0',w:'#a8a6a4',G:'#26242e',y:'#e6e1d3',Y:'#ffffff',Q:'#d9ccff',V:'#8f7bd8',X:'#d9ccff'});TPALB.push({W:'#c41e2e',w:'#2a1a24',G:'#0e0b12',y:'#5a0f1a',Y:'#c41e2e',Q:'#ff3030',V:'#8a1a26',X:'#c41e2e'});");
  h=P(h,"const TPALS=(p,t)=>t===5?","const TPALS=(p,t)=>t===6?{B:'#1e1820',b:'#0e0b12',Q:'#c41e2e',V:'#8a1a26'}:t===5?");
  h=P(h,"APAL.push({W:'#e6e1d3',w:'#3b3948',G:'#16151c',y:'#d9ccff',Y:'#ffffff'});","APAL.push({W:'#e6e1d3',w:'#3b3948',G:'#16151c',y:'#d9ccff',Y:'#ffffff'});APAL.push({W:'#c41e2e',w:'#1e1820',G:'#0e0b12',y:'#8a1a26',Y:'#ff5a5a'});");
  for(const [a,b] of [['Ashen Plate','Titan Plate'],['Greyhide','Hollowhide'],['Sootweave Robe','Veilweave Robe'],['Ashen Helm','Titan Helm'],['Grey Cap','Hollow Mask'],['Sootweave Hood','Veil Hood'],['Ashen Greaves','Titan Greaves'],['Grey Boots','Hollow Boots'],['Sootweave Slippers','Veil Slippers']])h=P(h,"'"+a+"']","'"+a+"','"+b+"']");
  h=P(h,"speed:[.9,.95,1,1.05,1.1,1.15][sp.tier]","speed:[.9,.95,1,1.05,1.1,1.15,1.2][sp.tier]");
  h=h.split("[16,15,14,13,12,11][MG.spec.tier]").join("[16,15,14,13,12,11,10][MG.spec.tier]");
  h=P(h,"const z=[16,15,14,13,12,11][t];","const z=[16,15,14,13,12,11,10][t];");
  h=P(h,"const tierNow=()=>Math.min(5,S.unlocked-1);","const tierNow=()=>Math.min(6,S.unlocked-1);");
  h=P(h,"const tier=Math.min(5,tw?","const tier=Math.min(6,tw?");
  h=h.split("[1,1,2,2,2,3][tier]").join("[1,1,2,2,2,3,3][tier]").split("[1,2,3,3,3,4][tier]").join("[1,2,3,3,3,4,4][tier]");
  h=P(h,"add(['scrap','steel','obsidian','hollow','astral','ashsteel'][Math.min(5,it.tier||0)],1);","add(['scrap','steel','obsidian','hollow','astral','ashsteel','pactsteel'][Math.min(6,it.tier||0)],1);");
  h=P(h,"['#3b3a44','#2a2933']][v];","['#3b3a44','#2a2933'],['#161430','#0a0916'],['#4a1020','#2a0a0e'],['#3a1420','#1f0a12']][v];");
  h=P(h,"const RCAP=[1,2,2,3,3,4],RFLOOR=[0,0,1,2,2,2];","const RCAP=[1,2,2,3,3,4,4],RFLOOR=[0,0,1,2,2,2,2];");
  h=P(h,"R:['#c43c3c','#f2c14e','#e8dcc4','#fffaf0','#fffaf0','#d9ccff'][t],","R:['#c43c3c','#f2c14e','#e8dcc4','#fffaf0','#fffaf0','#d9ccff','#c43c3c'][t],");
  h=P(h,"METALS:['scrap','steel','obsidian','hollow','astral','ashsteel'],COST:[8,8,8,8,8,8],GOLD:[200,800,2000,4000,8000,16000]","METALS:['scrap','steel','obsidian','hollow','astral','ashsteel','pactsteel'],COST:[8,8,8,8,8,8,8],GOLD:[200,800,2000,4000,8000,16000,30000]");
  h=P(h,"if(tier===2||tier===5){const add=[];","if(tier===2||tier===5||tier===6){const add=[];");
  h=P(h,"return it&&(it.tier||0)>=5?o.map(","return it&&(it.tier||0)>=6?o.map(x=>x.replace('#5ec4b0','#c43c3c').replace('#fff1a8','#f2c14e')):it&&(it.tier||0)>=5?o.map(");
  h=P(h,"c=tr===5?{m:'#26242e',d:'#111018',h:'#6e6c7c'}:","c=tr===6?{m:'#140f16',d:'#09070b',h:'#2a2433'}:tr===5?{m:'#26242e',d:'#111018',h:'#6e6c7c'}:");
  h=P(h,"if(tr===5){if(r%4===1)","if(tr===6){if(r%5===2)R(x0+1,r,Math.max(1,9-x0),1,'#c43c3c');if(r%7===0)P(x0+2,r,'#f4efe4');if(r>end-6&&(r*3+x0)%3!==0)R(x0,r,2+((r*5)%4),1,null);}if(tr===5){if(r%4===1)");
  h=P(h,"if(tr===5){R(8,13,5,2,'#e6e1d3');","if(tr===6){R(8,13,5,2,'#c43c3c');P(10,13,'#f2c14e');P(7,14,'#f4efe4');}if(tr===5){R(8,13,5,2,'#e6e1d3');");
  h=P(h,"function bodyX(at,tr,bt,btr,noHead){",ARMOR+"function bodyX(at,tr,bt,btr,noHead){");
  // materials
  h=P(h,"const MATS={","const MATS={pactsteel:'Devilsteel',hollowglass:'Hollow Glass',titanstone:'Titan Stone',veilsilk:'Veil Silk',hollowsoul:'Hollow Soul',titanheart:'Titan Heart',veilheart:'Veiled Heart',");
  h=P(h,"const MATICON={","const MATICON={pactsteel:['m_chunk','#ff9a5c','#c43c3c','#1f1a2b'],hollowglass:['m_gem','#f4efe4','#9cc8ff','#1f1a2b'],titanstone:['m_chunk','#f2c14e','#7a1f2b','#4a1020'],veilsilk:['m_leaf','#e8e0cc','#c43c3c','#2a1a2e'],hollowsoul:['m_heart','#ffffff','#9cc8ff','#1f1a2b'],titanheart:['m_heart','#fff1a8','#c43c3c','#4a1020'],veilheart:['m_heart','#f4efe4','#c43c3c','#2a1a2e'],");
  h=P(h,"['ashsteel','cinder','soot']];","['ashsteel','cinder','soot'],['pactsteel','hollowglass'],['pactsteel','titanstone'],['pactsteel','veilsilk']];");
  h=P(h,"  cinder:{q:2,aff:{def:5}},","  hollowglass:{q:2,aff:{crit:6}}, titanstone:{q:2,aff:{def:6}}, veilsilk:{q:2,aff:{dodge:6}}, hollowsoul:{q:1,fx:'soul',d:'Kills restore 10% HP'}, titanheart:{q:1,fx:'stoneskin',d:'Take 15% less damage'}, veilheart:{q:1,fx:'crown',d:'Crits deal +20% damage'},\n  cinder:{q:2,aff:{def:5}},");
  h=P(h,"'soot','lastember'])SUP[m].to='weapon';","'soot','lastember','hollowglass','hollowsoul','veilheart'])SUP[m].to='weapon';");
  // monsters, regions and bosses
  h=P(h,"const MOB={\n",`const MOB={
  hcrawl:{ash:1,n:'Crawling Face',hp:190,atk:25,def:6,spd:9,xp:20,gold:[6,10],drops:[['hollowglass',45],['pactsteel',25]],ab:[['bleed',25],['drain',20]],weak:'fire'},
  hgrin:{ash:1,n:'Floating Grin',hp:170,atk:27,def:5,spd:11,xp:20,gold:[6,10],drops:[['hollowglass',40],['pactsteel',25]],ab:[['drain',30],['stun',12]],weak:'storm'},
  hflame:{ash:1,n:'Ghost Flame',hp:160,atk:28,def:4,spd:8,xp:20,gold:[6,10],drops:[['pactsteel',30],['hollowglass',30]],ab:[['burn',30],['drain',15]],weak:'frost'},
  dhollow:{ash:1,n:'The Hollow, Unmasked',hp:1500,atk:12,def:5.5,spd:9,xp:30,gold:[10,15],drops:[['hollowsoul',100],['essence',100]],ab:[['heavy',22],['drain',24],['stun',12]],boss:1},
  shand:{ash:1,n:'Stone Hand',hp:210,atk:27,def:8,spd:7,xp:22,gold:[7,11],drops:[['titanstone',45],['pactsteel',25]],ab:[['heavy',28],['stun',12]],weak:'storm'},
  sgolem:{ash:1,n:'Rubble Golem',hp:250,atk:26,def:10,spd:3,xp:22,gold:[7,11],drops:[['titanstone',40],['pactsteel',30]],ab:[['heavy',30],['shield',18]],weak:'frost'},
  swatch:{ash:1,n:'Stone Watcher',hp:200,atk:29,def:7,spd:6,xp:22,gold:[7,11],drops:[['pactsteel',30],['titanstone',30]],ab:[['stun',16],['drain',18]],weak:'fire'},
  stonearm:{ash:1,n:'His Arm',hp:60,atk:10,def:3,spd:5,xp:0,gold:[0,0],drops:[],ab:[['heavy',35]]},
  dcolossus:{ash:1,n:'The Colossus, Risen',hp:2100,atk:14,def:7,spd:4,xp:32,gold:[11,16],drops:[['titanheart',100],['essence',100]],ab:[['heavy',28],['stun',14]],boss:1},
  vmario:{ash:1,n:'Marionette',hp:230,atk:30,def:8,spd:10,xp:24,gold:[8,12],drops:[['veilsilk',45],['pactsteel',25]],ab:[['bleed',28],['stun',12]],weak:'fire'},
  vdoll:{ash:1,n:'Porcelain Doll',hp:250,atk:29,def:9,spd:8,xp:24,gold:[8,12],drops:[['veilsilk',40],['pactsteel',30]],ab:[['drain',26],['heal',10]],weak:'storm'},
  vweaver:{ash:1,n:'String Weaver',hp:220,atk:32,def:7,spd:12,xp:24,gold:[8,12],drops:[['pactsteel',30],['veilsilk',30]],ab:[['poison',28],['stun',14]],weak:'frost'},
  vpuppet:{ash:1,n:'Puppet',hp:60,atk:10,def:3,spd:9,xp:0,gold:[0,0],drops:[],ab:[['bleed',30]]},
  dveiled:{ash:1,n:'The Veiled, Unstrung',hp:2800,atk:17,def:6,spd:10,xp:34,gold:[12,17],drops:[['veilheart',100],['essence',100]],ab:[['heavy',24],['drain',24],['stun',12]],boss:1},
`);
  h=P(h,"const ELITE={","const ELITE={hcrawl:['The Many-Faced','Facecutter'],hgrin:['Widest Grin','Grinbreaker'],hflame:['Pale Pyre','Snuffer'],shand:['The Fist','Fistbreaker'],sgolem:['Mountainback','Quarrier'],swatch:['The Unblinking','Eyeshut'],vmario:['First Strings','Stringcutter'],vdoll:['Miss Porcelain','Dollbreaker'],vweaver:['The Loom','Loomcutter'],");
  h=P(h,"const ANIM={","const ANIM={hcrawl:'sway',hgrin:'ripple',hflame:'flicker',dhollow:'ripple',shand:'breathe',sgolem:'breathe',swatch:'breathe',stonearm:'breathe',dcolossus:'breathe',vmario:'sway',vdoll:'breathe',vweaver:'sway',vpuppet:'sway',dveiled:'ripple',");
  h=P(h,"const BOSSMECH={","const BOSSMECH={dhollow:{every:3,mult:1.9,cue:\"opens its smile\"},dcolossus:{every:3,mult:2.2,cue:\"raises a fist the size of a hill\"},dveiled:{every:3,mult:2,cue:\"lets her hair come down\"},");
  h=P(h,"const BOSSSIG={","const BOSSSIG={dhollow:{heavy:'Gnash',drain:'Hollowing',stun:'Empty Stare'},dcolossus:{heavy:'Hammerfist',stun:'Quake'},dveiled:{heavy:'Cut the Strings',drain:'Hair Snare',stun:'Hold Still'},");
  h=P(h,"const BOSSBIG={","const BOSSBIG={dhollow:'The Smile',dcolossus:'Mountainfall',dveiled:'Curtain Call',");
  h=P(h,"bsig:e=>{if(e.id==='firstash'){PLAY.fsig(e);return;}","bsig:e=>{if(e.id==='firstash'){PLAY.fsig(e);return;}if(e.id==='dhollow'){PLAY.hsig(e);return;}if(e.id==='dcolossus'){PLAY.bsigc(e);return;}if(e.id==='dveiled'){PLAY.vsig(e);return;}");
  h=P(h,"dungeon:{name:'The Grey Throne',floors:[['ashwalk','emberhound'],['ashwalk','sootpriest','emberhound']],boss:'firstash'}},\n","dungeon:{name:'The Grey Throne',floors:[['ashwalk','emberhound'],['ashwalk','sootpriest','emberhound']],boss:'firstash'}},\n"+AREA('The Hollow Deep',['hcrawl','hgrin','hflame'],'The Empty Throat','hollowd')+AREA('The Titan Quarry',['shand','sgolem','swatch'],'The Sleeping Giant','colface')+AREA('The Last Stage',['vmario','vdoll','vweaver'],'Curtain Call','veild'));
  h=P(h,"const UNIQ={\n","const UNIQ={\n  grin:{n:'The Grin',type:'dagger',tier:6,from:'hollowd',fx:'sever',col:'#9cc8ff',a:'Sever',d:'Ignore 30% of enemy defense',affs:{crit:8,dex:5}},\n  knuckle:{n:'Titan Knuckle',type:'warhammer',tier:6,from:'colface',fx:'stoneskin',col:'#f2c14e',a:'Stoneskin',d:'Take 15% less damage',affs:{str:6,vit:5}},\n  lastcurtain:{n:'Last Curtain',type:'rapier',tier:6,from:'veild',fx:'edict',col:'#c43c3c',a:'Edict',d:'+50% damage to enemies under 30% HP',affs:{crit:7,dex:5}},\n");
  h=P(h,"  ['lastember','The Grey Throne','Beat The First Ash',()=>S.cleared.includes(5),{ess:40}],","  ['lastember','The Grey Throne','Beat The First Ash',()=>S.cleared.includes(5),{ess:40}],\n  ['dhollowk','Unmasked','Beat The Hollow in the Hollow Deep',()=>S.cleared.includes(6),{ess:50}],\n  ['dcolk','Toppled','Beat The Colossus in the Titan Quarry',()=>S.cleared.includes(7),{ess:60}],\n  ['dveilk','Curtain Call','Beat The Veiled on the Last Stage',()=>S.cleared.includes(8),{ess:80}],");
  // art, scenes, lairs, ambience
  h=P(h,"SPR.unmakero=SPR.unmaker;",ART+"SPR.unmakero=SPR.unmaker;");
  h=P(h,"  wild4:{h:104,",SCENES+"  wild4:{h:104,");
  {const i=h.indexOf("const SCENES={"),j=h.lastIndexOf("];",i);if(j<0)throw new Error('lair');const hd=h.slice(0,j).trimEnd();h=hd+(hd.endsWith(',')?'':',')+String.fromCharCode(10)+LAIRS+h.slice(j);}
  h=P(h,"  '3':{n:36,","  '5':{n:60,col:['#e6e1d3','#a8a6a4'],vy:[.15,.45],vx:[-.25,-.05]},'6':{n:40,col:['#9cc8ff','#f4efe4','#c4ecff'],vy:[-.3,-.08],vx:[-.08,.08],tw:1},'7':{n:50,col:['#c43c3c','#ff9a5c','#7a1f2b'],vy:[-.1,.15],vx:[.3,.8]},'8':{n:30,col:['#f4efe4','#c43c3c'],vy:[.05,.2],vx:[-.05,.05],tw:1},\n  '3':{n:36,");
  // the bosses' rules
  h=P(h,"if(e.id==='firstash')dmg=ashBoss(e,c,dmg);","if(e.id==='firstash')dmg=ashBoss(e,c,dmg);if(DEVB.includes(e.id))dmg=devBoss(e,c,dmg);");
  h=P(h,"if(c.enemies.some(x=>x.called&&x.hp>0))dmg=Math.max(1,Math.round(dmg/2));","if(c.enemies.some(x=>(x.called||x.minion)&&x.hp>0))dmg=Math.max(1,Math.round(dmg/2));");
  h=P(h,"m.called=true;m.boss=false;m.hp=m.max=Math.round(e.max*.009);","m.called=true;m.minion=true;m.boss=false;m.hp=m.max=Math.round(e.max*.009);");
  h=P(h,"if(e.id==='firstash')for(const x of c.enemies)if(x!==e&&x.hp>0)","if(e.id==='firstash'||DEVB.includes(e.id))for(const x of c.enemies)if(x!==e&&x.hp>0)");
  h=P(h,"veilTurn(c);for(const k of","veilTurn(c);devTurn(c);for(const k of");
  h=P(h,"const boss=list.find(e=>e.boss);","devStart(list);const boss=list.find(e=>e.boss);");
  h=P(h,"function kingCalls(e,c,i){",DEVFN+"function kingCalls(e,c,i){");
  h=P(h,"e.id==='firstash'?Math.max(3,ps-1):","['firstash','dhollow','dcolossus','dveiled'].includes(e.id)?Math.max(3,ps-1):");
  // the Tower: every boss gets the same numbers for its floor
  h=P(h,"  startCombat(list,'tower');}","  for(const e of list)if(e.boss)towerBoss(e);startCombat(list,'tower');}");
  h=require('./mechdevfight.js').devfight(h);
  h=require('./mechend.js').endgame(h);
  h=require('./mechup.js').up(h);
  h=require('./mechfix2.js').fix2(h);
  h=require('./mechfix3.js').fix3(h);
  h=require('./mechadmin.js').admin(h);
  h=require('./mechnoname.js').noname(h);
  h=require('./mechadmhide.js').admhide(h);
  h=require('./mechqueue.js').queue(h);
  h=require('./mechban.js').ban(h);
  h=require('./mechgive.js').give(h);
  h=require('./mechmax.js').max(h);
  h=require('./mechcap.js').cap(h);
  h=require('./mechjp.js').jp(h);
  h=require('./mechperf.js').perf(h);
  return h;}
module.exports={devil7};
