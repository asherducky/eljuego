// The final pass on the Ashen Reach: no ending or lore, the First Ash at ten times the HP with its own art, attacks and minions, weaker lifesteal and regen, a cold grey region and new Ashen armor.
const {P}=require('./mech.js');
const LS=.35;
const ARMOR=`ARM32.plate.push({m:'#26242e',d:'#111018',h:'#5d5a6c',a:'#e6e1d3',g:'#d9ccff'});ARM32.leather.push({m:'#4a4852',d:'#25232c',h:'#86838f',a:'#e6e1d3',g:'#d9ccff'});ARM32.robe.push({m:'#b8b4ae',d:'#6e6b70',h:'#e9e6e0',a:'#16151c',g:'#d9ccff'});TRIM.push('#d9ccff');
// Ashen Plate: black plate, an open ribcage of bone over a pale heart, a spined pauldron and a torn tabard
ARM32X.plate.push((R,P,o)=>{const m='#26242e',d='#111018',h='#5d5a6c',b='#e6e1d3',e='#a89f92',w='#fffaf0',g='#d9ccff';
  if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);for(let y=17;y<22;y+=2){R(22,y,2,1,b);P(24,y,e);}R(22,23,5,3,m);R(22,23,5,1,b);R(22,25,5,1,d);P(27,24,b);P(28,23,w);R(19,13,8,4,b);R(19,13,8,1,w);R(19,16,8,1,e);R(21,14,3,1,d);P(22,14,g);P(21,12,b);P(21,11,w);P(24,12,b);P(24,11,b);P(24,10,w);P(27,13,b);P(28,12,w);return;}
  for(let x=9;x<23;x+=2){const L=2+((x*7)%4);R(x,27,2,L,x>17?d:m);P(x,27,h);if(L>3)P(x,27+L,b);}R(14,27,4,8,d);R(15,27,2,9,'#3b3848');P(15,30,g);P(16,32,g);
  R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,1,9,h);
  for(const y of [17,19,21,23]){R(10,y,5,1,b);R(17,y,5,1,e);P(10,y+1,e);P(21,y+1,d);}
  R(15,16,2,9,b);R(15,19,2,3,g);P(15,20,w);P(16,20,w);R(11,14,10,2,b);R(12,14,8,1,w);
  R(9,25,14,2,d);R(9,25,14,1,h);R(15,25,2,2,b);P(15,25,w);for(const x of [11,13,19,21])P(x,26,e);});
ARM32TOP.plate.push((R,P)=>{const b='#e6e1d3',w='#fffaf0',d='#a89f92';R(4,14,7,3,b);R(4,14,7,1,w);R(4,16,7,1,d);P(6,13,b);P(6,12,w);P(8,13,b);P(8,12,b);P(8,11,w);P(3,14,b);P(2,13,w);});
// Greyhide: layered grey leather, crossed bone straps, a long torn scarf and a pale clasp
ARM32X.leather.push((R,P,o)=>{const m='#4a4852',d='#25232c',h='#86838f',b='#e6e1d3',e='#a89f92',g='#d9ccff',s='#16151c';
  if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(21,18,5,1,s);R(21,21,5,1,s);P(23,18,b);P(23,21,b);R(22,23,5,3,d);R(22,23,5,1,e);R(22,25,5,1,s);R(20,14,6,2,h);R(20,14,6,1,b);P(26,15,e);return;}
  R(10,27,12,2,m);for(let x=9;x<23;x+=3){R(x,29,2,2+(x%2),x>17?d:m);P(x,29,h);}
  R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,1,9,h);
  for(let i=0;i<10;i++){P(10+i,16+i,b);P(11+i,16+i,e);P(21-i,16+i,b);P(20-i,16+i,e);}R(15,20,2,2,g);P(15,20,'#fffaf0');
  R(10,14,12,2,h);R(11,14,10,1,b);R(4,14,6,2,h);R(3,16,3,5,h);R(3,16,1,5,d);P(2,21,h);P(4,21,h);P(3,22,d);
  R(9,25,14,2,s);R(9,25,14,1,d);R(14,25,4,2,e);P(15,25,b);});
ARM32TOP.leather.push((R,P)=>{R(5,15,5,1,'#86838f');P(5,14,'#e6e1d3');P(8,14,'#e6e1d3');});
// Sootweave Robe: ash-white cloth falling to black at the hem, a black sash, pale marks, a high split collar
ARM32X.robe.push((R,P,o)=>{const m='#b8b4ae',d='#6e6b70',h='#e9e6e0',a='#16151c',q='#2e2c36',g='#d9ccff',v='#8f7bd8';
  if(o){R(20,16,6,7,m);R(20,16,6,1,h);R(24,17,2,6,d);R(19,22,8,2,q);R(19,22,8,1,a);P(21,23,g);P(24,23,g);R(22,24,5,2,SKIN.s);R(22,25,5,1,SKIN.S);R(19,14,7,2,h);P(26,13,h);P(26,14,d);return;}
  R(9,26,14,9,m);R(8,30,16,5,m);R(19,26,4,9,d);R(21,30,3,5,d);
  for(let x=8;x<24;x++){const t=33+((x*5)%3);R(x,t,1,36-t,q);P(x,36,x%3?a:null);}
  R(4,32,5,4,q);R(3,35,3,1,a);for(const [x,y] of [[11,28],[13,31],[18,27],[20,31],[16,30]])P(x,y,v);
  R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);R(15,15,2,11,a);for(const y of [17,20,23]){P(15,y,g);P(16,y,g);}
  R(11,13,3,3,h);R(18,13,3,3,d);P(11,12,h);P(20,12,d);R(9,24,14,2,a);R(9,24,14,1,q);R(14,24,4,2,g);R(15,24,2,2,'#fffaf0');R(12,26,1,5,a);P(12,31,g);});
ARM32TOP.robe.push((R,P)=>{R(7,12,3,4,'#e9e6e0');R(7,12,1,4,'#6e6b70');P(8,11,'#e9e6e0');P(4,15,'#d9ccff');});
BOOT32X.greaves.push((R,P,x,w,p)=>{const b='#e6e1d3',e='#a89f92';R(x,30,5,5,p.m);R(x,30,5,1,b);for(const y of [32,34])R(x,y,5,1,e);P(x-1,31,b);P(x-2,30,'#fffaf0');R(x,36,w,1,b);R(x,38,w,1,p.d);P(x+w,38,b);P(x+w+1,37,'#fffaf0');P(x+2,33,p.g);});
BOOT32X.shoes.push((R,P,x,w,p)=>{R(x,33,5,1,p.a);R(x,34,5,1,p.h);R(x,36,w,1,p.a);P(x+1,37,p.d);P(x+3,37,p.d);R(x,38,w,1,p.d);P(x+w,37,p.a);P(x+2,35,p.g);});
BOOT32X.treads.push((R,P,x,w,p)=>{R(x,35,w,4,'#2e2c36');R(x,35,w,1,'#16151c');for(let i=x;i<x+w;i+=2)P(i,38,'#16151c');P(x+1,36,p.g);P(x+w-2,37,p.g);P(x+w,37,p.h);});
HAT32X.helm.push((R,P,p)=>{const b='#e6e1d3',w='#fffaf0',e='#a89f92',g='#d9ccff';helmB(R,p,g);R(12,1,9,1,e);R(14,3,7,3,b);R(14,3,7,1,w);R(14,6,7,1,e);R(13,8,8,1,p.d);for(let x=14;x<21;x+=2)R(x,9,1,4,b);R(9,5,4,1,b);for(const [x,h] of [[10,3],[13,5],[16,6],[19,5],[22,3]]){R(x,2-h+2,1,h,b);P(x,2-h+1,w);}P(7,4,b);P(6,3,b);P(5,2,w);P(7,8,e);P(6,7,b);P(5,6,w);});
HAT32X.cap.push((R,P,p)=>{const b='#e6e1d3',e='#a89f92',g='#d9ccff',s='#16151c';capB(R,p);R(9,3,13,1,s);R(13,4,12,2,s);R(14,6,9,6,b);R(14,6,9,1,'#fffaf0');R(15,8,3,2,s);R(20,8,2,2,s);P(16,8,g);P(21,8,g);R(17,11,3,1,e);for(const x of [11,15,19])P(x,1,b);R(7,3,2,10,p.m);R(6,8,2,7,p.d);P(5,14,p.m);});
HAT32X.hood.push((R,P,p)=>{const g='#d9ccff',a='#16151c';hoodB(R,p,a);R(13,4,10,10,a);R(15,8,2,2,g);R(20,8,2,2,g);P(15,8,'#fffaf0');P(20,8,'#fffaf0');R(12,2,11,1,g);for(const [x,y] of [[13,1],[16,0],[19,1],[22,1]])P(x,y,'#fffaf0');R(6,19,4,1,a);P(8,15,g);P(8,17,g);P(9,19,g);for(const y of [6,9,12])P(8,y,a);});
`;
const FX=`  fintro:()=>{const st=document.querySelector('.stage');if(!st)return;const SR=st.getBoundingClientRect(),cx=SR.left+SR.width*.62,cy=SR.top+SR.height*.42;fxo(1400,t=>{stageClip(SR);const k=t<.2?t/.2:t>.75?(1-t)/.25:1;ditherStage(SR,Math.round(13*k));const R=SR.height*(.2+t*.5);for(let i=0;i<60;i++){if(i%5===2)continue;const a=i/60*6.283+t*.6;pp(cx+Math.cos(a)*R,cy+Math.sin(a)*R,i%3?'#d9ccff':'#ffffff',GP*(t<.6?2:1));}for(let i=0;i<70;i++){const x=SR.left+(i*83)%SR.width,y=SR.top+((i*47+t*SR.height*2.6)%SR.height);pp(x,y,i%3?'#8f8c98':'#e6e1d3',GP);}px.restore();});shake(10);},
  frise:e=>{const f=sprEl(elFor(e.t));if(!f)return;const B=ctr(f),st=document.querySelector('.stage');if(!st)return;const SR=st.getBoundingClientRect();fxo(760,t=>{stageClip(SR);const up=Math.min(1,t/.3),out=t>.55?(t-.55)/.45:0;for(let i=0;i<36;i++){const q=i/36,x=B.x+(q-.5)*B.r.width*1.1*(1+out),H=B.r.height*1.25*up*(.55+.45*Math.sin(i*2.7)**2);for(let y=0;y<H;y+=GP*2){if(Math.random()<out)continue;pp(x,B.r.bottom-y,y>H-GP*3?'#ffffff':i%3?'#8f8c98':'#3b3948',GP);}}for(let i=0;i<20;i++){const a=i*.31,r=out*B.r.width*1.2;pp(B.x+Math.cos(a)*r,B.r.bottom-Math.abs(Math.sin(a))*r*.8,i%2?'#e6e1d3':'#d9ccff',GP);}px.restore();});},
  fsig:e=>{const hh=heroEl(),f=sprEl(elFor(e.t)),st=document.querySelector('.stage');if(!hh||!f||!st)return;const A=ctr(hh),B=ctr(f),SR=st.getBoundingClientRect(),BN='#e6e1d3',WH='#ffffff',GH='#d9ccff',G1='#8f8c98',G2='#3b3948';
    if(e.big){sfx('ssmile');const W=Math.max(A.r.width*1.5,SR.width*.2);fxo(1250,t=>{stageClip(SR);ditherStage(SR,Math.round(14*(t<.15?t/.15:t>.82?(1-t)/.18:1)));
        // the heart lights, the halo opens, then the whole sky falls on you
        if(t<.34){const R=B.r.width*.2+t*B.r.width*1.4;for(let i=0;i<46;i++){const a=i/46*6.283+t*3;pp(B.x+Math.cos(a)*R,B.y-B.r.height*.1+Math.sin(a)*R,i%2?GH:WH,GP*2);}for(let i=0;i<16;i++){const a=i*.39-t*8,r=(1-t/.34)*B.r.width*1.3;pp(B.x+Math.cos(a)*r,B.y+Math.sin(a)*r,WH,GP);}}
        if(t>=.3&&t<.62){const u=(t-.3)/.32,bot=SR.top+(A.r.bottom-SR.top)*Math.min(1,u*1.5),hw=W*.5*(.5+.5*Math.min(1,u*1.5));for(let x=-hw;x<=hw;x+=GP){const q=Math.abs(x)/hw,edge=(Math.sin(x*.7)*6+Math.sin(x*.19)*8)*(1+q);px.fillStyle=q>.86?G2:q>.62?G1:q>.3?BN:WH;px.fillRect(Math.round((A.x+x)/GP)*GP,SR.top,GP,bot-SR.top+edge);}}
        if(t>=.46){const u=(t-.46)/.54,R=u*SR.width*.75;for(let i=0;i<72;i++){const a=i/72*3.1416,X=A.x+Math.cos(a)*R,Y=A.r.bottom-Math.sin(a)*R*.42-(i%7)*u*14;if(u<.8||i%2)pp(X,Y,i%4?G1:WH,GP*(u<.4?2:1));}for(let i=0;i<90;i++){const a=(i*2.399)%6.283,v=(.25+((i*37)%50)/60)*SR.width*.55,X=A.x+Math.cos(a)*v*u,Y=A.r.bottom-Math.abs(Math.sin(a))*v*u*.8+u*u*50;if(u<.75||i%2)pp(X,Y,i%5===0?WH:i%2?BN:G2,GP);}}
        px.restore();});setTimeout(()=>{sfx('ssnap');shake(22);flash&&flash('#e6e1d3',120);flinch(hh,300);},TS(480));return;}
    if(e.ab==='stun'){sfx('ssnap');const n=7;const hand=(x,base,h,k,lean)=>{const tx=x+lean*h,ty=base-h;pline(x,base,tx,ty,G2,GP*3);pline(x,base,tx,ty,BN,GP);for(let f=0;f<5;f++){const a=-1.57+(f-2)*.42*(1-k*.55)+lean,L=h*.34;const mx=tx+Math.cos(a)*L*.55,my=ty+Math.sin(a)*L*.55,ex=tx+Math.cos(a+(2-f)*k*.5)*L,ey=ty+Math.sin(a+(2-f)*k*.5)*L;pline(tx,ty,mx,my,BN,GP);pline(mx,my,ex,ey,f%2?G1:WH,GP);}};fxo(900,t=>{stageClip(SR);const up=Math.min(1,t/.28),k=t>.42?Math.min(1,(t-.42)/.12):0,dn=t>.78?(t-.78)/.22:0;for(let i=0;i<n;i++){const q=i/(n-1)*2-1,x=A.x+q*A.r.width*.95,h=A.r.height*(1.05-.25*Math.abs(q))*up*(1-dn);hand(x,A.r.bottom+GP*2,h,k,-q*.28);}for(let i=0;i<30;i++){const q=(i*.37)%2-1;pp(A.x+q*A.r.width*1.3,A.r.bottom-((i*13)%18)*up,i%2?G1:BN,GP);}px.restore();});setTimeout(()=>{sfx('sbite');shake(9);flinch(hh,220);},TS(420));return;}
    if(e.ab==='drain'){sfx('shollow');fxo(900,t=>{stageClip(SR);ditherStage(SR,Math.round(5*(t<.2?t/.2:t>.8?(1-t)/.2:1)));for(let i=0;i<9;i++)tendril(A.x+Math.sin(i*2.1)*A.r.width*.3,A.y+Math.cos(i*1.7)*A.r.height*.3,B.x,B.y,Math.min(1,t*2.2),GP,i*1.3+t*5,16);for(let i=0;i<54;i++){const q=(t*1.7-i*.018);if(q<0||q>1)continue;const u=q*q,x=A.x+(B.x-A.x)*u+Math.sin(i*2.3)*22*(1-u),y=A.y+(B.y-A.y)*u+Math.cos(i*1.9)*26*(1-u);pp(x,y,i%3?GH:WH,GP);}const R=4+Math.sin(t*20)*2+t*10;for(let i=0;i<20;i++){const a=i*.314;pp(B.x+Math.cos(a)*R*GP,B.y+Math.sin(a)*R*GP,WH,GP);}px.restore();});return;}
    // the reaping arm: one enormous sweep of the blade
    sfx('sstare');const Pv=[B.x,B.y-B.r.height*.15],R0=Math.hypot(B.x-A.x,Pv[1]-A.y)+A.r.width*.5;fxo(820,t=>{stageClip(SR);ditherStage(SR,Math.round(5*(t<.15?t/.15:t>.75?(1-t)/.25:1)));const u=Math.min(1,t/.44),th=3.1416+1.15-1.95*u*u*(3-2*u);const pt=(f,r)=>[Pv[0]+Math.cos(f)*r,Pv[1]+Math.sin(f)*r*.82];if(t<.6){const tip=pt(th,R0);pline(Pv[0],Pv[1],tip[0],tip[1],'#000000',GP*3);pline(Pv[0],Pv[1],tip[0],tip[1],G2,GP);}const fade=t>.44?1-(t-.44)/.56:1;const AN=Math.ceil(R0*1.05/(GP*1.4));if(fade>0)for(let s=0;s<=AN;s++){const q=s/AN;if(q>fade)continue;const f=th+q*1.05,rr=R0*(1-q*.1),w=GP*(9*(1-q)*Math.pow(Math.sin(Math.PI*(q*.92+.08)),.5));for(let o=-w;o<=w;o+=GP){const [x,y]=pt(f,rr+o),e=Math.abs(o)/Math.max(w,1);pp(x,y,q>.62?(s%2?G2:'#000000'):q>.3?(e>.6?G2:G1):e>.72?'#000000':e>.4?BN:WH,GP);}}if(t>.34&&t<.62){const n=(t-.34)/.28;for(let i=0;i<42;i++){const a=i*.15,r=n*A.r.width*2.2;if(i%2||n<.6)pp(A.x+Math.cos(a)*r,A.y+Math.sin(a)*r*.8,i%3?G1:WH,GP*2);}for(let i=0;i<26;i++){const a=(i*2.399)%6.283,r=n*A.r.width*(1+(i%5)*.5);pp(A.x+Math.cos(a)*r,A.y+Math.sin(a)*r+n*n*30,i%3?'#000000':BN,GP);}}px.restore();});setTimeout(()=>{sfx('ssnap');shake(13);flinch(hh,240);dsplat(A.x,A.y,{n:14,r:A.r.width});},TS(310));},
`;
const SCENE=`  wild5:{h:104,bg:c=>{const W=256;sky(c,W,0,86,['#22212a','#33323c','#494852','#62616a','#7c7a80','#94928f']);const r=rng('ash');
      // the white ring of a dead sun
      circ(c,192,26,19,'#e6e1d3');circ(c,192,26,17,'#d9ccff');circ(c,192,26,15,'#16151c');for(let i=0;i<10;i++)F(c,192+Math.cos(i*.63)*22,26+Math.sin(i*.63)*22,2,2,i%2?'#e6e1d3':'#d9ccff');
      for(const [x,y,w] of [[8,10,50],[60,22,70],[112,8,40],[0,32,60],[200,44,56],[90,38,80]]){F(c,x,y,w,3,'#3b3948aa');F(c,x+6,y+3,w-14,2,'#22212a88');}
      // the kneeling giants far away, then two ridges of ash
      for(const [x,s] of [[34,1],[132,1.3],[232,.8]]){const h=30*s,y=70-h;F(c,x-8*s,y+h*.45,16*s,h*.55,'#4a4952');F(c,x-5*s,y+h*.15,10*s,h*.35,'#4a4952');F(c,x-14*s,y+h*.4,6*s,h*.55,'#4a4952');F(c,x+8*s,y+h*.4,6*s,h*.55,'#4a4952');F(c,x-3*s,y,6*s,h*.18,'#4a4952');F(c,x-3*s,y+h*.25,2,3,'#d9ccff');}
      ridge(c,'am',W,50,66,86,'#5c5b64');ridge(c,'ah',W,64,76,86,'#74737a',4);
      // the dead forest in bone
      for(const [x,h] of [[18,50],[62,34],[104,44],[150,28],[222,48]]){const y=88-h;F(c,x,y,4,h,'#2a2933');F(c,x,y,1,h,'#e6e1d3');for(let k=0;k<3;k++){const by=y+4+k*(h/4|0),dir=k%2?1:-1,len=9+((x+k*7)%6);for(let i=0;i<len;i++){F(c,x+1+dir*i,by-(i>>1),2,1,'#2a2933');if(i%3===0)F(c,x+1+dir*i,by-(i>>1)-1,1,1,'#e6e1d3');}}}
      F(c,0,86,W,18,'#a8a6a4');for(let i=0;i<80;i++)F(c,r()*W|0,87+r()*16|0,3+r()*10|0,1,i%3?'#8f8d90':'#c9c6c0');F(c,0,86,W,1,'#d6d3cc');for(const [x,w] of [[30,40],[120,60],[200,36]]){F(c,x,92,w,3,'#c9c6c0');F(c,x+4,91,w-8,1,'#e6e1d3');}},
    fg:(c,t)=>{const r=rng('flake');for(let i=0;i<70;i++){const sp=.012+r()*.026,x=(r()*300-t*sp*.7+Math.sin(t/800+i)*6)%300,y=(r()*120+t*sp)%110,X=x<0?x+300:x;F(c,X-20,y-4,1+(i%4===0),1+(i%6===0),i%3?'#e6e1d3cc':'#a8a6a4bb');}
      const pulse=.5+.5*Math.sin(t/900);if(pulse>.7)for(let i=0;i<10;i++)F(c,192+Math.cos(i*.63+t/1500)*24,26+Math.sin(i*.63+t/1500)*24,1,1,'#ffffff');}},
`;
const LAIR5=`  // The Grey Throne: an open hall of pale columns, a ring in the sky, ash falling through the light
  [c=>{const S0=['#16151c','#1f1e27','#2a2933','#373640','#45444e','#54535c'];S0.forEach((k,i)=>F(c,0,i*14,256,14,k));
      circ(c,128,34,31,'#e6e1d3');circ(c,128,34,29,'#d9ccff');circ(c,128,34,27,'#16151c');for(let i=0;i<24;i++){const a=i*.262;F(c,128+Math.cos(a)*36,34+Math.sin(a)*36,i%3?1:2,i%3?3:4,'#a8a6a4');}
      for(const x of [8,50,186,228]){F(c,x,0,20,80,'#34333d');F(c,x+1,0,4,80,'#a8a6a4');F(c,x+2,0,1,80,'#e6e1d3');F(c,x+14,0,6,80,'#1f1e27');for(let y=8;y<78;y+=16){F(c,x,y,20,1,'#1f1e27');F(c,x+1,y+1,4,1,'#e6e1d3');}F(c,x-4,0,28,5,'#22212a');F(c,x-4,74,28,6,'#22212a');F(c,x-4,74,28,1,'#a8a6a4');}
      for(const x of [72,174]){for(let y=30;y<80;y+=7){F(c,x,y,2,4,'#54535c');F(c,x+1,y+4,1,3,'#2a2933');}}
      F(c,94,50,68,30,'#0e0d13');for(let i=0;i<9;i++){const h=8+((i*5)%9);F(c,94+i*8,50-h,5,h,'#0e0d13');F(c,94+i*8,50-h,1,h,'#a8a6a4');}F(c,110,60,36,20,'#22212a');F(c,110,60,36,1,'#e6e1d3');
      F(c,0,80,256,24,'#6e6d74');for(let y=80;y<104;y+=6){F(c,0,y,256,1,'#54535c');for(let x=(y/6%2)*20;x<256;x+=40)F(c,x,y,1,6,'#54535c');}F(c,0,80,256,1,'#c9c6c0');for(const [x,w] of [[20,44],[100,70],[190,50]]){F(c,x,84,w,2,'#a8a6a4');F(c,x+3,83,w-6,1,'#e6e1d3');}},
   (c,t)=>{const p=.5+.5*Math.sin(t/600);for(let i=0;i<16;i++){const a=i*.393+t/2200,R=31+p*2;F(c,128+Math.cos(a)*R,34+Math.sin(a)*R,1,1,i%2?'#ffffff':'#d9ccff');}for(let x=96;x<160;x+=3){const h=(Math.sin(x*.7+t/500)+1)*12;for(let y=0;y<46;y+=5)if(((x+y)>>1)%3===0)F(c,x,34+y+h*.1,1,2,'#e6e1d322');}const r=rng('lastember');for(let i=0;i<80;i++){const sp=.014+r()*.03,x=(r()*280-t*sp*.5+Math.sin(t/700+i)*5)%280,y=(r()*120+t*sp)%110,X=x<0?x+280:x;F(c,X-12,y-3,1+(i%5===0),1,i%3?'#e6e1d3cc':'#a8a6a4bb');}}],
`;
function final(h){
  // no ending, no lore
  {const a=h.indexOf("function ashEnding(){"),b=h.indexOf("function kingCalls(e,c,i){");if(a<0||b<a)throw new Error('ending');h=h.slice(0,a)+h.slice(b);}
  h=P(h,"if(D.area===5&&!S.flags.ashend){S.flags.ashend=1;setTimeout(ashEnding,2200);}","if(D.area===5)setTimeout(()=>{freeAll();render(true);},0);");
  {const a=h.indexOf("#ashend{"),b=h.indexOf(".doll{display:grid;",a);if(a<0||b<a)throw new Error('css');h=h.slice(0,a)+h.slice(b);}
  h=P(h,"<h3>They are waiting for you</h3><p class=\"small dim\">The First Ash is gone and they have nothing left to fear. Sign with any of them, or all of them. This time they ask for nothing.</p>","<h3>Free contracts</h3><p class=\"small dim\">Sign any or all of them. They cost nothing now.</p>");
  h=P(h,". They ask for nothing now.\"><img",".\"><img");
  h=P(h,"if(!c.ash)log('Ash settles on you. Healing gets weaker every turn.','boss');","if(!c.ash)log('Ash: healing gets weaker every turn.','boss');");
  h=P(h,"log('The Hollow opens behind it and bites. It has waited a long time for this.','boss');","log('The Hollow bites it for 12% of its HP.','boss');");
  h=P(h,"log('A stone arm comes down on you both. He never cared which of you it hit.','boss');","log('The Colossus hits you both.','boss');");
  h=P(h,"log('Her hair closes around it, and around you. The blade is ready. Use it.','boss');","log('The Veiled fills your Black Moon, for a price.','boss');");
  h=P(h,"else log('Nothing comes to help you. You never signed anything.','boss');","");
  h=P(h,"log('The First Ash stands all the way up. There is no sky left behind it.','boss');","log('The First Ash breaks open. It hits 20% harder.','boss');e.spr='firstash2';fx('fintro',{});");
  // the boss: ten times the HP, the same damage, its own minions
  h=P(h,"n:'The First Ash',hp:300,","n:'The First Ash',hp:3000,");
  h=P(h,"ab:[['heavy',22],['burn',24],['stun',10]],boss:1},","ab:[['heavy',24],['drain',22],['stun',12]],boss:1},\n  ashthrall:{ash:1,n:'Ash Thrall',hp:60,atk:10,def:3,spd:6,xp:0,gold:[0,0],drops:[],ab:[['bleed',30],['heavy',22]]},\n  paleshroud:{ash:1,n:'Pale Shroud',hp:60,atk:10,def:2,spd:9,xp:0,gold:[0,0],drops:[],ab:[['drain',35],['stun',12]]},");
  h=P(h,"m.hp=m.max=Math.round(e.max*.09);","m.hp=m.max=Math.round(e.max*.009);");
  h=P(h,"c.enemies.push(m);}log(line,'boss');","c.enemies.push(m);fx('frise',{t:c.enemies.length-1});}log(line,'boss');");
  h=P(h,"ashCall(e,c,'ashwalk',2,'It pulls two shadows out of the ash. It takes half damage while they stand.');","ashCall(e,c,'ashthrall',2,'Two Ash Thralls rise. It takes half damage while they stand.');");
  h=P(h,"ashCall(e,c,'emberhound',2,'Strings of smoke drop from nowhere and something burning climbs down them.');","ashCall(e,c,'paleshroud',2,'Two Pale Shrouds rise. It takes half damage while they stand.');");
  h=P(h,"const BOSSMECH={firstash:{every:3,mult:1.7,cue:\"breathes in and every ember in the world leans toward it\"},","const BOSSMECH={firstash:{every:3,mult:1.7,cue:\"raises its blade and the sky starts to fall\"},");
  h=P(h,"const BOSSSIG={","const BOSSSIG={firstash:{heavy:'Reaping Arm',drain:'Hollowing',stun:'Grasping Dead'},");
  h=P(h,"const BOSSBIG={","const BOSSBIG={firstash:'Greyfall',");
  h=P(h,"bsig:e=>{if(e.id==='colface'","bsig:e=>{if(e.id==='firstash'){PLAY.fsig(e);return;}if(e.id==='colface'");
  h=P(h,"  bsigc:e=>{",FX+"  bsigc:e=>{");
  h=P(h,"  boss:e=>{sfx('boss');","  boss:e=>{if(e.n==='The First Ash')PLAY.fintro();sfx('boss');");
  h=P(h,"const ANIM={","const ANIM={firstash2:'breathe',ashthrall:'breathe',paleshroud:'ripple',");
  // lifesteal and regen, everywhere
  h=P(h,"ls:Math.min(25,b.ls),","ls:Math.min(9,Math.round(b.ls*"+LS+"*10)/10),");
  h=P(h,"regen:b.regen,dr:Math.min(50,b.dr)","regen:Math.round(b.regen*"+LS+"*100)/100,dr:Math.min(50,b.dr)");
  const hs="Math.round(heartPct(t||0)*"+LS+"*100)/100",hi="Math.round(heartPct(it.tier||0)*"+LS+"*100)/100";
  h=P(h,"if(X.fx==='heart')return `Regenerate ${heartPct(t||0)}% HP each turn`;","if(X.fx==='heart')return `Regenerate ${"+hs+"}% HP each turn`;");
  h=P(h,"f==='heart'?`Regenerate ${heartPct(it.tier||0)}% HP each turn`","f==='heart'?`Regenerate ${"+hi+"}% HP each turn`");
  h=P(h,"fx:'heart',d:'Regenerate 1% HP each turn, +0.5% per tier'","fx:'heart',d:'Regenerate 0.35% HP each turn, +0.18% per tier'");
  h=P(h,"fx:'heart',d:'Regenerate 3% HP each turn'","fx:'heart',d:'Regenerate 1% HP each turn'");
  h=P(h,"verdant:{n:'Verdant',slots:['armor','helm','boots','cloak'],d:'Regenerate 1% HP each turn'","verdant:{n:'Verdant',slots:['armor','helm','boots','cloak'],d:'Regenerate 0.35% HP each turn'");
  h=P(h,"verdant:'Regenerate 1.5% HP each turn'","verdant:'Regenerate 0.5% HP each turn'");
  h=P(h,"vampiric:{n:'Vampiric',slots:['weapon'],d:'3% lifesteal'","vampiric:{n:'Vampiric',slots:['weapon'],d:'1% lifesteal'");
  h=P(h,"vampiric:'4.5% lifesteal'","vampiric:'1.6% lifesteal'");
  h=P(h,"short:'+8% damage, +3% lifesteal, −10% max HP'","short:'+8% damage, +1% lifesteal, −10% max HP'");
  h=P(h,"bloodblade:'+8% damage and +3% lifesteal, but −10% max HP.'","bloodblade:'+8% damage and +1% lifesteal, but −10% max HP.'");
  h=P(h,"You regenerate 3% HP every turn.","You regenerate 1% HP every turn.");
  h=P(h,"3% HP a turn, cooldowns","1% HP a turn, cooldowns");
  h=P(h,"rows.push({k,l:LAB[k],v:st[k],pct:PCT.includes(k),rfv:rf[k]});","rows.push({k,l:LAB[k],v:k==='ls'?Math.round(st[k]*"+LS+"*10)/10:st[k],pct:PCT.includes(k),rfv:k==='ls'&&rf[k]?Math.round(rf[k]*"+LS+"*10)/10:rf[k]});");
  // the armor
  h=P(h,"function bodyX(at,tr,bt,btr,noHead){",ARMOR+"function bodyX(at,tr,bt,btr,noHead){");
  h=P(h,"c=tr===4?{m:'#1d4a5a',d:'#0f2a36',h:'#3a8a8a'}:CLOAK32[type]","c=tr===5?{m:'#26242e',d:'#111018',h:'#6e6c7c'}:tr===4?{m:'#1d4a5a',d:'#0f2a36',h:'#3a8a8a'}:CLOAK32[type]");
  h=P(h,"if(tr===4){if(r%3===0)R(x0+1,r,Math.max(1,10-x0),1,'#2a6e6e');if(r>end-4&&(r+x0)%2===0)P(x0,r,null);}}","if(tr===5){if(r%4===1)P(x0+2,r,'#e6e1d3');if(r%5===0)P(x0+1,r,'#d9ccff');if(r>end-7&&(r*3+x0)%3!==0)R(x0,r,2+((r*5)%4),1,null);}if(tr===4){if(r%3===0)R(x0+1,r,Math.max(1,10-x0),1,'#2a6e6e');if(r>end-4&&(r+x0)%2===0)P(x0,r,null);}}");
  h=P(h,"if(tr===4){P(11,14,'#f4efe4');P(10,15,'#c4ecff');}","if(tr===5){R(8,13,5,2,'#e6e1d3');P(11,13,'#fffaf0');P(9,12,'#e6e1d3');P(7,14,'#d9ccff');}if(tr===4){P(11,14,'#f4efe4');P(10,15,'#c4ecff');}");
  // scenes
  {const a=h.indexOf("  wild5:{h:104,"),b=h.indexOf("  wild4:{h:104,");if(a<0||b<a)throw new Error('wild5');h=h.slice(0,a)+SCENE+h.slice(b);}
  {const a=h.indexOf("  // The Last Ember: a burnt hall"),b=h.lastIndexOf("];",h.indexOf("const SCENES={"));if(a<0||b<a)throw new Error('lair');h=h.slice(0,a)+LAIR5+h.slice(b);}
  h=P(h,"['#2a1c1e','#1a1014']][v];","['#3b3a44','#2a2933']][v];");
  // T6 weapons and cloaks: bone and ghost light, no teal left over from the tier before
  h=P(h,"function wepAura(it){","function wepAura(it){const o=wepAura0(it);return it&&(it.tier||0)>=5?o.map(x=>x.replace('#5ec4b0','#d9ccff').replace('#fff1a8','#ffffff')):o;}\nfunction wepAura0(it){");
  h=P(h,"APAL.push({W:'#c4ecff',w:'#2a6e6e',G:'#1d2b52',y:'#5ec4b0',Y:'#c4ecff'});","APAL.push({W:'#c4ecff',w:'#2a6e6e',G:'#1d2b52',y:'#5ec4b0',Y:'#c4ecff'});APAL.push({W:'#e6e1d3',w:'#3b3948',G:'#16151c',y:'#d9ccff',Y:'#ffffff'});");
  h=P(h,"if(tier===2){const add=[];","if(tier===2||tier===5){const add=[];");
  // tier 6 entries the forge and the drop tables were missing, and a repair for items that already dropped with no rarity
  h=P(h,"const mgSpot=(p,t)=>{const z=[16,15,14,13,12][t];","const mgSpot=(p,t)=>{const z=[16,15,14,13,12,11][t];");
  h=P(h,"const RCAP=[1,2,2,3,3],RFLOOR=[0,0,1,2,2];","const RCAP=[1,2,2,3,3,4],RFLOOR=[0,0,1,2,2,2];");
  h=P(h,"R:['#c43c3c','#f2c14e','#e8dcc4','#fffaf0'][t],","R:['#c43c3c','#f2c14e','#e8dcc4','#fffaf0','#fffaf0','#d9ccff'][t],");
  h=P(h,"function migrate(s){const d=fresh();","function migrate(s){const d=fresh();{const fix=it=>{if(it&&typeof it==='object'&&!(typeof it.rar==='number'&&isFinite(it.rar)))it.rar=3;};(s.bag||[]).forEach(fix);Object.values(s.gear||{}).forEach(fix);if(s.combat&&s.combat.over&&s.combat.over.loot)(s.combat.over.loot.items||[]).forEach(fix);}");
  // a bad rarity can never crash a screen again
  if(h.split("RAR[it.rar].n").length!==4)throw new Error('rar sites');h=h.split("RAR[it.rar].n").join("(RAR[it.rar]||RAR[0]).n");
  // the blow that ends a fight still counts as a turn for cooldowns carried to the next floor
  h=P(h,"if(tw){const T=S.tower,f=T.floor;T.cd={...(c.cd||{})};","if(tw){const T=S.tower,f=T.floor;T.cd=cdTick({...(c.cd||{})});");
  h=P(h,"if(c.ctx==='dungeon'&&D)D.cd={...(c.cd||{})};","if(c.ctx==='dungeon'&&D)D.cd=cdTick({...(c.cd||{})});");
  h=P(h,"function win(){","const cdTick=o=>{for(const k in o)if(o[k]>0)o[k]--;return o;};\nfunction win(){");
  // Malice and Black Moon carry from one fight to the next; resting and new runs no longer fill Malice
  h=P(h,"if(PACT())S.mp=trk('grudge')?15:0;","if(PACT())S.mp=Math.max(S.mp||0,trk('grudge')?15:0);");
  h=h.split("S.mp=d.maxMp;").join("S.mp=PACT()?Math.min(100,S.mp||0):d.maxMp;");
  h=P(h,"S.combat={enemies:list,log:[],target:0,ps:{},ctx,over:null,menu:'main',hits:0,","S.combat={enemies:list,log:[],target:0,ps:{},ctx,over:null,menu:'main',hits:0,bm:S.gear.weapon&&S.gear.weapon.veil&&ctx!=='duel'&&ctx!=='pvp'?S.bm||0:0,");
  h=P(h,"c.bm=Math.min(100,(c.bm||0)+17);","c.bm=Math.min(100,(c.bm||0)+17);S.bm=c.bm;");
  h=P(h,"const c=C(),e=tgt(),m=moonMult(w);c.bm=0;","const c=C(),e=tgt(),m=moonMult(w);c.bm=0;S.bm=0;");
  h=P(h,"S.hp=Math.max(1,S.hp-y);c.bm=100;","S.hp=Math.max(1,S.hp-y);c.bm=100;S.bm=100;");
  h=P(h,"moonfull:()=>{const c=C();if(c)c.bm=100;}","moonfull:()=>{const c=C();if(c)c.bm=100;S.bm=100;}");
  // the foes use their phase art
  h=P(h,"sprImg(e.maw&&up?'unmakero':e.id,e.id==='unmaker'?ps+Math.ceil(ps/3)","sprImg(e.maw&&up?'unmakero':e.spr||e.id,e.id==='firstash'?Math.max(3,ps-1):e.id==='unmaker'?ps+Math.ceil(ps/3)");
  h=P(h,"${e.id==='unmaker'||e.id==='firstash'?'huge':''}","${e.id==='unmaker'?'huge':''}");
  return h;}
module.exports={final};
