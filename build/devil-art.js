const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
const ss=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const hash=(x,y)=>{const s=Math.sin(x*127.1+y*311.7)*43758.5453;return s-Math.floor(s);};
function noise(x,y){const i=Math.floor(x),j=Math.floor(y),f=x-i,g=y-j,u=f*f*(3-2*f),v=g*g*(3-2*g);
  return lerp(lerp(hash(i,j),hash(i+1,j),u),lerp(hash(i,j+1),hash(i+1,j+1),u),v);}
const fbm=(x,y)=>noise(x,y)*.55+noise(x*2.1+7,y*2.1+3)*.3+noise(x*4.3+1,y*4.3+9)*.15;
const bump=(x,y,cx,cy,sx,sy)=>Math.exp(-(((x-cx)/sx)**2)-(((y-cy)/sy)**2));
// half width of a mirrored shape at row y, from a table of [y,halfWidth]
function prof(t,y){if(y<t[0][0]||y>t[t.length-1][0])return -1;for(let i=1;i<t.length;i++)if(y<=t[i][0]){const a=t[i-1],b=t[i];return lerp(a[1],b[1],(y-a[0])/(b[0]-a[0]||1));}return -1;}
// tapered curve: cubic bezier sampled into circles
function curve(p0,p1,p2,p3,r0,r1,n=48){const s=[];for(let i=0;i<=n;i++){const t=i/n,m=1-t;s.push([m*m*m*p0[0]+3*m*m*t*p1[0]+3*m*t*t*p2[0]+t*t*t*p3[0],m*m*m*p0[1]+3*m*m*t*p1[1]+3*m*t*t*p2[1]+t*t*t*p3[1],lerp(r0,r1,Math.pow(t,1.2)),t]);}return s;}
function inCurve(s,x,y){let best=null;for(const c of s){const d=Math.hypot(x-c[0],y-c[1]),k=d/c[2];if(k<1&&(!best||k<best.k))best={k,t:c[3],u:(x-c[0])/c[2],w:(y-c[1])/c[2]};}return best;}
function inPoly(p,x,y){let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++){if((p[i][1]>y)!==(p[j][1]>y)&&x<(p[j][0]-p[i][0])*(y-p[i][1])/(p[j][1]-p[i][1])+p[i][0])c=!c;}return c;}
const segD=(x,y,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],t=clamp(((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy));return Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t);};
// slanted eye with a flat, angry upper lid. 2 inside, 1 rim, 0 outside
function eyeShape(ax,y,e){const c=Math.cos(e.ang),s=Math.sin(e.ang),dx=ax-e.x,dy=y-e.y,u=dx*c+dy*s,v=-dx*s+dy*c;
  const inside=(uu,vv)=>(uu*uu)/(e.a*e.a)+(vv*vv)/(e.b*e.b)<1&&vv>-e.b*(e.lid??.35);
  if(inside(u,v))return {z:2,u,v};const t=e.rim??1.3;
  for(const [a,b] of [[t,0],[-t,0],[0,t],[0,-t],[t*.7,t*.7],[-t*.7,t*.7],[t*.7,-t*.7],[-t*.7,-t*.7]])if(inside(u+a,v+b))return {z:1,u,v};
  return {z:0,u,v};}

const BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
const R={
  void:['#000000'],
  bone:['#6b6358','#a89c88','#d9cfb8','#f4efe4'],
  rim:['#3a3440','#6e6776','#b4adb8','#e8e2da'],
  blood:['#3d0606','#7c0b0b','#c81414','#ff3030','#ffc0a8'],
  ember:['#5a2a06','#c66f14','#ffb020'],
  shade:['#000000','#07060a','#0e0c13','#17141e','#231f2c','#35303f','#4f4957'],
  stone:['#060507','#100e12','#1d1a1f','#2c282d','#3f393f','#5a5257','#7d7377','#a89da0'],
  pale:['#000000','#0b0a0e','#17151b','#26232b','#3a363f','#55505a','#7a7480','#a39da8'],
  claw:['#120304','#2a0a0b','#48201c','#6b4238','#8f7264','#b8a692','#ded4bf'],
  talon:['#260709','#4a1a18','#6e3e34','#94796a','#bdb09c','#e4dcc8','#f4efe4'],
  hface:['#100e15','#1a1720','#25202c','#322b3a','#42394a'],
  hhorn:['#120b12','#1e111b','#2b1724','#3a1f2e','#4a2739'],
  hbody:['#0b0c12','#12141c','#1a1d28','#232735'],
  flesh:['#120507','#2a0c10','#4a181b','#6f2a2b','#964441','#bb6a60','#dd978a'],
  hair:['#050304','#0f080a','#1d1013','#2e1a1c','#452a2a','#604038'],
  sky:['#1a0202','#2d0404','#440606','#5e0808','#7c0c0c','#971212','#ad1a16'],
  giant:['#000000','#090103','#150306','#23060a','#36090e','#500e12','#731818','#9c3a38'],
  city:['#090102','#160304','#260507','#39090b','#4f0d0e'],
};
function paint(cv,w,h,fn,eyeCv){cv.width=w;cv.height=h;const g=cv.getContext('2d'),lay=[];let eg=null;if(eyeCv){eyeCv.width=w;eyeCv.height=h;eg=eyeCv.getContext('2d');}
  for(let y=0;y<h;y++){const row=[];for(let x=0;x<w;x++)row.push(fn(x+.5,y+.5));lay.push(row);}
  g.fillStyle='#000';g.fillRect(0,0,w,h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const p=lay[y][x];if(!p)continue;const ramp=R[p[0]],d=p[3]??.9;
    const f=clamp(p[1])*(ramp.length-1)+(BAYER[y%4][x%4]/16-.47)*d;g.fillStyle=ramp[Math.round(clamp(f,0,ramp.length-1))];g.fillRect(x,y,1,1);if(eg&&p[4]){eg.fillStyle=g.fillStyle;eg.fillRect(x,y,1,1);}}}

/* A. no teeth, no mask: a rotted, broken thing with an open black mouth */
function hollowShade(){const W=176,H=196,cx=88;
  const head=[[58,7],[63,18],[72,27],[90,31],[106,31],[118,30],[130,28],[142,24],[150,18],[156,10],[160,0]];
  const eye={x:14,y:100,a:8.5,b:5,ang:-.5,lid:.15,rim:1};
  const fade=y=>.28+.72*ss(30,96,y);
  return (x,y)=>{const sway=(fbm(y*.04+4,x*.02)-.5)*5,sx=x-cx+sway,ax=Math.abs(sx),hw=prof(head,y)+(fbm(x*.09,y*.09)-.5)*3;
    if(hw>0&&ax<hw){const eZ=eyeShape(ax,y,eye),d=hw-ax;
      if(eZ.z)return['void',0];
      const t=ax/28,jag=(fbm(x*.35,y*.35)-.5)*1.5,lipT=133-13*t*t+jag,lipB=147-27*t*t+jag;
      if(t<1.03&&y>lipT&&y<lipB)return['void',0];
      let v=.3+.72*ss(4,0,d)*(.4+fbm(x*.22,y*.22)*.9);
      v+=.56*bump(ax,y,15,88,14,3)+.48*bump(ax,y,23,118,5,5)+.46*bump(ax,y,0,108,1.8,9)+.34*bump(ax,y,0,76,22,13);if(ax<5&&y>118&&y<121)v=0;
      v+=(fbm(x*.38,y*.38)-.5)*.3;v*=.58*fade(y)*(ss(166,146,y)*.3+.7);
      const c=fbm(x*.06+21,y*.045+14);if(Math.abs(c-.5)<.012)v=0;
      return['hface',v,0,0];}
    return null;};}
/* The Hollow is only spaced marks on black: Xs where it catches light, dots where it doesn't */
const HW=112,HH=132,HX=32,HY=44,HC=4;
function hollowCells(){const inner=hollowShade(),out=[];
  for(let gy=0;gy*HC<HH;gy++){const ox=gy%2?2:0;for(let gx=0;(gx*HC-ox)<HW;gx++){const p=inner((gx+.5)*HC-ox+HX,(gy+.5)*HC+HY);
    if(p&&p[0]!=='void'){const v=clamp(p[1]*2.1);if(v>.08+hash(gx,gy)*.08)out.push({gx,gy,ox,r:p[0],v,x:v>.34});}}}
  return out;}
function hollow(){const cells=new Map(hollowCells().map(c=>[c.gx+','+c.gy,c]));
  return (x,y)=>{const gy=Math.floor(y/HC),ox=gy%2?2:0,gx=Math.floor((x+ox)/HC),s=cells.get(gx+','+gy);
    if(!s)return null;const lx=Math.floor(x+ox)-gx*HC,ly=Math.floor(y)-gy*HC;
    const on=s.x?lx<3&&ly<3&&(lx===ly||lx+ly===2):lx===1&&ly===1;
    return on?[s.r,s.v,0,0]:null;};}

/* C. so big only the top of him fits on screen, claws raised around his head, a tiny city at his chest */
function colossus(){const W=320,H=180,cx=160,Z=1.75,TOP=3;
  const sag=(a,b,s,n=12)=>{const o=[],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);for(let i=0;i<n;i++){const t=i/n,k=Math.sin(t*Math.PI)*s;o.push([a[0]+dx*t-dy/l*k,a[1]+dy*t+dx/l*k]);}return o;};
  const wrist=[72,14],tips=[[154,44],[150,112],[116,160],[70,152]],pit=[32,108],sh=[24,62];
  const wing=[...sag(sh,wrist,-5),...sag(wrist,tips[0],-9),...sag(tips[0],tips[1],17),...sag(tips[1],tips[2],14),...sag(tips[2],tips[3],12),...sag(tips[3],pit,7),...sag(pit,sh,0,4)];
  const fingers=[curve(wrist,[100,12],[132,22],tips[0],2.6,.5,28),curve(wrist,[108,40],[136,72],tips[1],2.6,.5,28),curve(wrist,[92,60],[108,110],tips[2],2.6,.5,28),curve(wrist,[74,60],[76,106],tips[3],2.6,.5,28),curve(sh,[38,34],[58,22],wrist,6,2.8,22)];
  const head=[[24,4],[28,9],[34,12.5],[44,14.5],[54,13.5],[60,10],[65,5],[68,0]];
  const body=[[44,14],[49,32],[55,46],[64,54],[78,52],[92,44],[108,34],[130,30]];
  const arm=[curve([50,66],[70,70],[88,84],[92,112],16,13,30),curve([92,112],[96,92],[88,72],[75,57],13,9,30)];
  const armSpikes=[curve([95,92],[100,86],[104,82],[109,76],3.4,.3,12),curve([91,78],[96,71],[100,67],[105,60],3,.3,12),curve([85,67],[89,60],[92,56],[97,48],2.6,.3,12)];
  const palm=curve([75,57],[73,54],[71,52],[69,50],10,8.5,10);
  const talons=[curve([62,56],[50,62],[40,58],[29,64],5.4,.5,24),curve([60,48],[48,48],[38,41],[27,44],5.6,.5,24),curve([63,41],[54,31],[45,25],[34,26],5.6,.5,24),curve([70,39],[67,27],[62,18],[52,12],5.4,.5,24),curve([80,48],[88,39],[90,29],[85,20],5,.5,20)];
  const horn=curve([9,34],[18,27],[24,17],[17,3],3.8,.3,24);
  const eye={x:6,y:47,a:4,b:2,ang:-.42,lid:.3,rim:0};
  const figure=(x,y)=>{const wx=(fbm(x*.05+11,y*.05)-.5)*5,wy=(fbm(x*.05+2,y*.05+17)-.5)*5,ax=Math.abs(x-cx+wx),yy=y+wy,rx=Math.abs(x-cx),hy=y+wy*.3;
    const hw=prof(head,hy);
    if(hw>0&&ax<hw){if(eyeShape(rx,hy,eye).z===2)return['bone',.85,0,0,'eye'];
      let v=.09+.42*bump(rx,hy,0,53,2,8)+.5*bump(rx,hy,7,42.5,7,1.8)+.34*bump(rx,hy,8,54,3,3)+.24*bump(rx,hy,0,34,7,5)+.5*ss(2,0,hw-ax)*fbm(x*.5,y*.5);return['giant',v+(fbm(x*.9,y*.9)-.5)*.16,0,.6];}
    let h=inCurve(horn,rx,hy);if(h)return['giant',.3+.45*(h.w<0?1:.2)*(1-h.k*.4),0,.5];
    let lim=null,kind=0;for(const c of talons){const q=inCurve(c,ax,yy);if(q&&(!lim||q.k<lim.k)){lim=q;kind=1;}}
    for(const [c,n] of [[palm,2],[arm[1],3],[arm[0],4]]){const q=inCurve(c,ax,yy);if(q&&(!lim||q.k<lim.k)){lim=q;kind=n;}}
    if(lim){const t=lim.t,k=lim.k,bed=.42+.1*(1-k*k);
      if(kind===1&&t>bed){const band=lim.w+.3,light=ss(.8,0,Math.abs(band));
        return['claw',.12+.55*light+.3*ss(.6,1,t)*(lim.w<0?1:.3)-.24*ss(.6,1,k)+.03*Math.sin(t*70),0,.7];}
      const m=.5+.5*Math.sin(t*20+fbm(x*.2,y*.2)*6),ms=kind===4?1:kind===3?ss(1,.6,t):0;
      let v=.07+.68*ss(.5,1,k)*(.35+fbm(x*.35,y*.35))*(lim.w<0?1:.4)+.2*m*ms*(1-k);
      if(kind===1){v+=.08;if(Math.abs(t-.14)<.012||Math.abs(t-.29)<.012)v*=.5;else if(Math.abs(t-.18)<.02||Math.abs(t-.33)<.02)v+=.1;if(t>bed-.04)v*=.42;}
      return['giant',v,0,.8];}
    for(const c of armSpikes){h=inCurve(c,ax,yy);if(h)return['giant',.28+.5*(h.u>0?1:.25)*(1-h.k*.4),0,.5];}
    const bw=prof(body,yy);if(bw>0&&ax<bw){const d=bw-ax;let v=.06+.55*ss(3.5,0,d)*fbm(x*.3,y*.3);
      v+=.5*bump(ax,yy,17,78,14,9)+.62*bump(ax,yy,40,62,11,8)+.3*bump(ax,yy,9,102,7,5)+.16*bump(ax,yy,24,98,4,14)+.2*bump(ax,yy,34,92,10,5);
      v+=(fbm(x*.4,y*.4)-.5)*.26+.42*ss(90,107,y);if(ax<.8)v*=.25;return['giant',v,0,.8];}
    if(inPoly(wing,ax,yy)){let onF=null;for(const f of fingers){const q=inCurve(f,ax,yy);if(q&&(!onF||q.k<onF.k))onF=q;}
      if(onF)return['giant',onF.u>0?.5:.16,0,.5];
      const fan=Math.atan2(yy-wrist[1],ax-wrist[0]),fold=.5+.5*Math.sin(fan*40+fbm(x*.07,y*.07)*7);
      if(fbm(x*.05+3,y*.09+8)<.7+ss(150,70,ax)*.3)return['giant',.12+.14*fold+(fbm(x*.14,y*.14)-.5)*.24,0,.75];}
    return null;};
  return (x,y)=>{const rx=Math.abs(x-cx);
    const fo=noise(x*.05,5)*8,fc=Math.floor((x+fo)/6);let ft=5+hash(fc,12)*11;if(hash(fc,13)>.82)ft+=7*ss(1.2,.4,Math.abs((x+fo)%6-3));
    if(y>180-ft){if(hash(Math.floor(x/2),Math.floor(y/3)+40)>.72&&x%2<1&&y%3<1)return['ember',hash(x,y),0,0];return['city',.02+hash(fc,15)*.1,0,.6];}
    const p=figure(cx+(x-cx)/Z,TOP+y/Z);if(p)return p;
    const m=Math.hypot(x-172,y-54),cl=fbm(x*.014+3,y*.07+1);
    let v=(m<84?.78:.3)+ss(80,180,y)*.28-ss(70,170,m)*.18+(fbm(x*.02,y*.05)-.5)*.3;if(cl>.57)v-=(cl-.57)*2.6;
    return['sky',v,0,1];};}

/* D. long hair, sick flesh, sunken black eyes with slit pupils */
function veiled(){const W=176,H=196,cx=88;
  const horn=curve([28,58],[44,44],[44,24],[32,4],13,2.5,36);
  const head=[[42,8],[46,20],[54,29],[72,34],[94,33],[110,29],[126,23],[140,16],[148,8],[152,0]];
  const neck=[[140,11],[158,13],[168,26],[180,52],[196,72]];
  const sockets=[{x:16,y:88,a:11.5,b:8.5,ang:-.24,lid:1,rim:1}];
  return (x,y)=>{const ax=Math.abs(x-cx),hw=prof(head,y);
    const strand=noise(x*.42,y*.012),fall=fbm(x*.09,y*.02);
    if(hw>0&&ax<hw&&!(ax>hw-7-fall*7&&strand>.5&&y>58)){const d=hw-ax,eZ=eyeShape(ax,y,sockets[0]);
      if(eZ.z===2){const q=Math.hypot(eZ.u+1,eZ.v-1),r=x<cx?1.6:1;if(q<r)return['ember',1,0,0,'eye'];if(q<r+1)return['ember',0,0,0,'eye'];return['void',0];}
      let v=.56+.26*bump(ax,y,15,74,16,5)+.17*bump(ax,y,0,62,14,10)+.2*bump(ax,y,27,108,6,8)+.26*bump(ax,y,0,105,3,11);
      v-=.5*bump(ax,y,17,88,16,14)+.34*bump(ax,y,7,113,5,3.5)+.4*ss(6,0,d)+.2*bump(ax,y,19,118,7,10);
      v+=(fbm(x*.34,y*.34)-.5)*1.1;
      if(y>124&&y<136){const m=prof([[124,4],[130,17],[136,5]],y);if(m>0&&ax<m){if(Math.abs(y-130)<1.2||Math.floor(ax/3)%2&&Math.abs(y-130)<3.5)return['void',0];return['flesh',.72,0,.5];}}
      return['flesh',v,0,1];}
    const h=inCurve(horn,ax,y);if(h){const band=.5+.5*Math.sin(h.t*70);let v=.28+.45*band*(1-h.k*.5)+(fbm(x*.55,y*.55)-.5)*.75-.28*ss(.7,1,h.k);return['flesh',v,0,1];}
    const nw=prof(neck,y);if(nw>0&&ax<nw&&!(strand>.6&&ax>6)){let v=.3+(fbm(x*.45,y*.3)-.5)*.8-.34*ss(nw*.45,nw,ax)+.26*bump(ax,y,18,172,16,3);
      if(y>176)v+=.17*Math.sin(y*.75)*ss(6,18,ax);v*=ss(196,172,y)*.8+.2;return['flesh',v,0,1];}
    let v=.07+.75*ss(.54,.85,strand)*(.55+fall*.6);if(ax>60)v*=ss(88,64,ax)*.95+.05;return['hair',v,0,.3];};}

const DEVILS=[
  ['The Hollow','A floating face made only of spaced Xs and dots. The empty eyes and huge smile are gaps in the marks.',HW,HH,hollow],
  ['The Colossus','So big only his upper body fits on screen, with clawed arms raised around his head and a tiny city at his chest.',320,180,colossus],
  ['The Veiled','Sick flesh, long hair, sunken black sockets with tiny, uneven points of light that stare at you.',176,196,veiled],
];
/* eyes in the blackout */
function eyeSet(kind){const W=200,H=70,cx=100,e={x:36,y:38,a:26,b:13,ang:-.36,lid:.2,rim:kind===2?1.4:1.2};
  return (x,y)=>{const ax=Math.abs(x-cx),z=eyeShape(ax,y,e);
    if(kind===3){const br=eyeShape(ax,y,{...e,y:e.y,a:e.a*.82,b:e.b*.72,rim:1});
      if(z.z===1)return['rim',.42,0,.3];if(br.z===1)return['rim',.72,0,.3];if(br.z===2)return Math.hypot(br.u,br.v)<1.7?['rim',1,0,0]:['void',0];return null;}
    if(z.z===1)return kind===2?['blood',.68,0,.4]:['rim',kind===4?.32:.8,0,.4];
    if(z.z===2){if(kind===2&&Math.hypot(z.u,z.v)<2)return['blood',1,0,0];if(kind===4&&Math.abs(z.u)<1.3&&Math.abs(z.v)<8)return['ember',.8,0,0];return['void',0];}
    return null;};}
const EYES=[
  ['Empty','Pale outline, nothing inside.',1],
  ['Burning rim','Red outline, one pinprick of light.',2],
  ['Double lid','Two outlines and a tiny white dot, like it sees you.',3],
  ['Faint slit','Barely visible outline with a thin gold slit.',4],
];
