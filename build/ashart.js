// Paints the Ashen Reach monsters into the game's letter grids at build time: charcoal bodies, lit from the upper left, with ember cracks.
const RAMP=['K','d','g','G','a'];
function noise(x,y){const v=Math.sin(x*12.9898+y*78.233)*43758.5453;return v-Math.floor(v);}
function sm(x,y){const X=Math.floor(x),Y=Math.floor(y),u=x-X,v=y-Y,a=noise(X,Y),b=noise(X+1,Y),c=noise(X,Y+1),d=noise(X+1,Y+1),U=u*u*(3-2*u),V=v*v*(3-2*v);return a*(1-U)*(1-V)+b*U*(1-V)+c*(1-U)*V+d*U*V;}
function paint(W,H,caps,opts={}){
  const best=Array.from({length:H},()=>Array(W).fill(null));
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){let dmin=1e9,hit=null;
    for(const q of caps){const [ax,ay]=q.a,[bx,by]=q.b,dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy||1,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/l2)),px=ax+dx*t,py=ay+dy*t,r=q.r0+(q.r1-q.r0)*t,d=Math.hypot(x-px,y-py)-r+(sm(x*.32+(q.s||0),y*.32)-.5)*(q.n===undefined?1.6:q.n);
      if(d<dmin){dmin=d;hit={q,nx:(x-px)/Math.max(r,1),ny:(y-py)/Math.max(r,1)};}}
    if(dmin<0)best[y][x]=hit;}
  const g=Array.from({length:H},()=>Array(W).fill('.'));
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const h=best[y][x];if(!h)continue;const ramp=h.q.ramp||RAMP,l=(-h.nx*.65-h.ny*.75)*.55+.42+(h.q.lit||0),i=Math.max(0,Math.min(ramp.length-1,Math.floor(l*ramp.length+((x+y)%2?.18:-.18))));g[y][x]=ramp[i];}
  const set=(x,y,c)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&y>=0&&x<W&&y<H&&g[y][x]!=='.')g[y][x]=c;};
  // ember cracks: hot in the middle, cooling toward both ends
  for(const line of opts.cracks||[]){const n=Math.ceil(Math.hypot(line[1][0]-line[0][0],line[1][1]-line[0][1])*1.5);for(let i=0;i<=n;i++){const q=i/n,x=line[0][0]+(line[1][0]-line[0][0])*q+Math.sin(q*9+line[0][0])*1.2,y=line[0][1]+(line[1][1]-line[0][1])*q+Math.cos(q*7+line[0][1])*1.2,m=1-Math.abs(q-.5)*2;{const C0=opts.crack||['y','o','R'];set(x,y,m>.66?C0[0]:m>.33?C0[1]:C0[2]);}}}
  for(const [x,y,c] of opts.dots||[])set(x,y,c);
  // the outline
  const o=g.map(r=>r.slice());for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(g[y][x]==='.'){const n=[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>(g[y+b]||[])[x+a]&&(g[y+b]||[])[x+a]!=='.');if(n)o[y][x]='k';}
  return o.map(r=>r.join(''));}
const c=(a,b,r0,r1,extra)=>({a,b,r0,r1:r1===undefined?r0:r1,...(extra||{})});
const HOT={ramp:['r','R','o','e','y','Y'],n:.6};
const CLOTH={ramp:['k','K','d','g'],n:2.4};
const MON={
  // a burnt body still walking, bent forward with one arm dragging on the ground
  ashwalk:paint(36,36,[c([20,16],[18,26],5.5,4.2),c([15,10],[17,14],4.2,4.4),c([16,14],[9,18],2.2,2),c([9,18],[6,30],2,1.2),c([22,15],[27,21],2.2,1.9),c([27,21],[25,27],1.9,1.3),c([17,26],[13,33],2.6,1.8),c([20,26],[24,33],2.6,1.8)],{cracks:[[[16,17],[21,28]],[[9,19],[6,28]],[[20,16],[25,20]]],dots:[[12,10,'y'],[14,10,'y'],[12,11,'o'],[14,11,'o'],[13,13,'k'],[12,13,'k'],[14,13,'k']]}),
  // a low hound of cinders, burning from the back
  emberhound:paint(38,32,[c([23,17],[12,15],5.2,4.4),c([12,15],[7,11],3.6,3.4),c([7,11],[2,13],2.8,1.5),c([5,8],[6,4],1.5,.7),c([9,8],[11,4],1.5,.7),c([13,19],[10,29],2.2,1.3),c([17,20],[18,29],2,1.2),c([24,20],[22,29],2.4,1.3),c([27,18],[30,29],2,1.2),c([27,15],[35,9],2,.8),c([18,11],[19,5],2.2,.5,HOT),c([23,11],[25,4],2.6,.5,HOT),c([14,12],[14,7],1.8,.5,HOT)],{cracks:[[[11,16],[26,18]],[[29,15],[34,10]]],dots:[[5,11,'y'],[6,11,'Y'],[3,14,'y'],[5,14,'y'],[2,15,'k'],[4,15,'k']]}),
  // a hooded priest floating over a swinging censer
  sootpriest:paint(34,38,[c([17,9],[17,13],5,5.2,CLOTH),c([17,13],[17,28],5.5,9,CLOTH),c([12,17],[6,22],2.4,1.8,CLOTH),c([22,17],[27,21],2.4,1.8,CLOTH),c([12,28],[11,35],3.4,.6,CLOTH),c([17,28],[17,36],3.6,.6,CLOTH),c([23,28],[24,35],3.4,.6,CLOTH),c([6,23],[6,28],.5,.5,{ramp:['g','G','a'],n:0}),c([6,31],[6,31],2.8,2.8,HOT)],{dots:[[15,10,'k'],[16,10,'k'],[17,10,'k'],[18,10,'k'],[19,10,'k'],[15,11,'k'],[19,11,'k'],[15,12,'k'],[16,12,'y'],[17,12,'k'],[18,12,'y'],[19,12,'k'],[15,13,'k'],[16,13,'k'],[17,13,'k'],[18,13,'k'],[19,13,'k'],[16,14,'k'],[17,14,'k'],[18,14,'k']],cracks:[[[15,18],[14,30]],[[20,20],[21,30]]]}),
  // The First Ash: hunched and enormous, the last ember still burning in its chest
  firstash:paint(76,76,[c([38,34],[38,58],15,13,CLOTH),c([24,28],[52,28],9.5,9.5),c([38,16],[38,20],9,8.5),c([24,28],[14,42],5.5,4.4),c([14,42],[12,62],4.4,3.2),c([52,28],[62,42],5.5,4.4),c([62,42],[64,62],4.4,3.2),c([12,62],[6,70],2,.8),c([12,62],[12,72],2.2,.8),c([12,62],[18,70],2,.8),c([64,62],[58,70],2,.8),c([64,62],[64,72],2.2,.8),c([64,62],[70,70],2,.8),c([28,56],[22,74],7,1.2,CLOTH),c([38,58],[38,75],8,1.2,CLOTH),c([48,56],[54,74],7,1.2,CLOTH),c([30,9],[26,1],2.2,.5),c([38,8],[38,0],2.4,.5),c([46,9],[50,1],2.2,.5),c([38,34],[38,36],5,5,HOT)],{cracks:[[[38,24],[38,30]],[[30,36],[24,48]],[[46,36],[52,48]],[[24,29],[15,41]],[[52,29],[61,41]],[[14,44],[12,60]],[[62,44],[64,60]],[[30,20],[46,20]]],dots:(()=>{const d=[];for(const x of [32,33,34,42,43,44]){d.push([x,16,'k'],[x,17,'y'],[x,18,'k']);}d.push([33,17,'Y'],[43,17,'Y'],[38,18,'k'],[38,19,'k']);for(let x=33;x<=43;x+=2)d.push([x,22,'y'],[x,23,'k']);for(const [x,y] of [[38,33],[37,34],[38,34],[39,34],[38,35]])d.push([x,y,'W']);return d;})()}),
};
// the smaller copy the game also keeps of every monster (used for its size)
const half=g=>{const o=[];for(let y=0;y<g.length;y+=2){let r='';for(let x=0;x<g[0].length;x+=2)r+=g[y][x];o.push(r);}return o;};
function art(){const M2=require('./ashart2.js').MON;let s='';for(const k in M2){s+='SPR.'+k+'='+JSON.stringify(half(M2[k]))+';SPR[\''+k+'@2\']='+JSON.stringify(M2[k])+';\n';}return s;}
// Devil icons, 16 by 16, drawn by hand in the same letters. 'e' marks what pulses.
const ICON={
  // a pale ghost flame wearing The Hollow's crossed eyes
  dv_m1:['.......kk.......','......kCk...k...','.....kCCk..kCk..','.....kCiCk.kCk..','....kCiWCkkCCk..','...kCiWWiCCiCk..','...kCiWWWWiiCk..','..kCWkWkWWkWkCk.','..kCWWkWWWWkWCk.','..kCWkWkWWkWkCk.','..kCiWWWWWWWiCk.','...kCiWkWkWiCk..','...kciiWWWiick..','....kcciiicck...','.....kkcccKk....','.......kkk......'],
  // his stone face from the front, red rock and burning eyes
  dv_m2:['....kkkkkkkk....','..kkrRRRRRRrkk..','.krRRRrrrRRRrhk.','.krRrrrrrrrrrhk.','krRrkkkrrkkkrrhk','krRkeekrrkeekrhk','krrrkkkrrkkkrrhk','krrrrrrkkrrrrrhk','.krrrrkkkkrrrhk.','.krrrrrkkrrrrhk.','.krrkkkkkkkkrhk.','.krkYkYkkYkYkhk.','.krkkkkkkkkkkhk.','..krrkYkYkYrhk..','...kkrrrrrhkk...','.....kkkkkk.....'],
  // a lock of her black hair, tied with a red thread
  dv_m3:['......kkkk......','.....kgGGdk.....','....kgGddKKk....','...kgGdKKkkk....','...kdGdKk.......','...kKgGdKk......','....kKdGdKk.....','....kkkkkkk.....','....kReReRk.....','....kkkkkkk.....','...kKdGdKk......','..kKdGdKKk.kk...','..kdGdKKkkkdKk..','..kdGddKKKdGdk..','...kdGGGGGdKk...','....kkkkkkkk....'],
  // torn paper with The Hollow's face where the signature goes
  dv_c1:['..kkkkkkkkkkk...','.kjWWWWWWWWWjk..','.kjWWWWWWWWWjk..','.kjkWkWWkWkWjk..','.kjWkWWWWkWWjk..','.kjkWkWWkWkWjk..','.kjWWWWWWWWWjk..','.kjWWkWkWkWWjk..','.kjWWWkkkWWWjk..','.kjWWWWWWWWWjk..','.kjWkkkkkWWWjk..','.kjWWWWWWWeWjk..','.kjWkkkkWeeejk..','.kjWWWWWWWeWjk..','..kjjkjjkjjjk...','...kk.kk.kkk....'],
  // the puppet cross, strings down to the crescent
  dv_c2:['.......bb.......','..kkkkkbBkkkkk..','.kBBBBBBBBBBBBk.','..kkkkkBBkkkkk..','...w...BB...w...','...w...bb...w...','...w...kk...w...','...w.......w....','....w..kkk.w....','....w.kReek.....','.....kRrkkR.....','....kRrk.kk.....','....kRrk........','....kRRrkk.k....','.....kRRrrRk....','......kkkkk.....'],
  // a stone tablet with a bite gone from the corner
  dv_c3:['.kkkkkkkk.......','kaGGGGGGGk.kk...','kGgggggggkkgk...','kGgggdgggggggk..','kGggdggggggggdk.','kGgggdddgggggdk.','kGkkkggggkkkgdk.','kGkeekggkeekgdk.','kGkkkggggkkkgdk.','kGggggdggggggdk.','kGgggggdgggggdk.','kGggkgkgkgkggdk.','kGggkkkkkkkggdk.','kGggggggggggdk..','kdddddddddddk...','.kkkkkkkkkkk....'],
};
function icons(){let s='';for(const k in ICON){const r=ICON[k].map(x=>x.padEnd(16,'.').slice(0,16));s+='SPR.'+k+'='+JSON.stringify(r)+';\n';}return s;}
module.exports={art,icons,paint,c};
