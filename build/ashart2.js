// The Ashen Reach in cold grey: bone, charcoal and a pale ghost light. Painted into the game's letter grids at build time.
const {paint,c}=require('./ashart.js');
const BONE={ramp:['a','w','j','W'],n:.5},DARK={ramp:['k','K','d','g','G'],n:1},CLOTH={ramp:['k','K','d','g'],n:2.6},GHOST={ramp:['P','v','C','W'],n:.3},ASH={ramp:['K','d','g','G','a'],n:1.4},HAFT={ramp:['K','g','G'],n:0};
const CR=['W','v','P'];
const line=(x0,y0,x1,y1,col,d=[])=>{const n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0)));for(let i=0;i<=n;i++)d.push([x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,col]);return d;};
function firstAsh(ph){
  const mir=(p)=>[88-p[0],p[1]],both=(A,B,r0,r1,o)=>[c(A,B,r0,r1,o),c(mir(A),mir(B),r0,r1,o)];
  const caps=[
    // a narrow body and a robe of separate torn strips
    c([44,38],[44,60],11.5,6.5,ASH),c([31,36],[57,36],6.5,6.5,DARK),c([44,58],[44,68],8,13,CLOTH),
    ...[-22,-16,-10,-5,0,5,10,16,22].map((o,i)=>c([44+o*.6,66],[44+o*1.5,87-(i%3)*3],4.6,.6,CLOTH)),
    // the skull and jaw
    c([44,16],[44,21],8,6.4,BONE),c([44,27],[44,29],4.6,3.6,BONE),
    // long arms, the near one reaching the floor
    c([24,38],[15,54],3.6,2.8,ASH),c([15,54],[12,71],2.8,2.2,ASH),...[[3,84],[7,87],[12,87],[17,86],[21,82]].map(p=>c([12,72],p,1.7,.4,BONE)),
    c([64,38],[72,52],3.6,2.8,ASH),c([72,52],[77,64],2.8,2.2,ASH),c([77,65],[77,68],3,2.6,DARK),
    // the scythe
    c([80,10],[75,87],1,1,HAFT),c([81,12],[73,5],3.2,2.6,BONE),c([73,5],[62,3],2.6,1.8,BONE),c([62,3],[54,6],1.8,.4,BONE),
    // the pauldrons, spined
    ...both([24,32],[24,33],8,7.5,{ramp:['K','d','g','G','a','w'],n:1}),...both([21,27],[12,12],3.4,.5,{ramp:['g','a','w','W'],n:.4}),...both([17,31],[5,24],3,.4,{ramp:['g','a','w','W'],n:.4}),
    // the horns
    c([38,12],[30,6],2.5,1.6,DARK),c([30,6],[27,0],1.6,.4,DARK),c([33,8],[23,7],1.2,.3,DARK),c([50,12],[56,8],2.5,1.4,DARK),c([56,8],[58,3],1.4,.4,DARK),
  ];
  // the halo behind it
  for(let i=0;i<20;i++){if(ph?i%3===0:i%7===6)continue;const a=i/20*6.283,b=(i+.75)/20*6.283,R=ph?23:21;caps.push(c([44+Math.cos(a)*R,18+Math.sin(a)*R],[44+Math.cos(b)*R,18+Math.sin(b)*R],1.3,1.3,GHOST));}
  const d=[];
  // the open chest
  for(let y=34;y<=56;y++){const w=Math.round(9-(y-34)*.2);for(let x=44-w;x<=44+w;x++)d.push([x,y,'k']);}
  for(let i=0;i<7;i++){const y=35+i*2.8,w=9.5-i*.7,col=i%2?'w':'j';line(44,y,44-w,y+2.2,col,d);line(44,y,44+w,y+2.2,col,d);d.push([44-w,y+3,'a'],[44+w,y+3,'a']);}
  line(44,33,44,55,'W',d);
  // the heart
  const hr=ph?5:3;for(let y=-hr;y<=hr;y++)for(let x=-hr;x<=hr;x++){const m=Math.abs(x)+Math.abs(y);if(m<=hr)d.push([44+x,44+y,m<=1?'W':m<=hr-1?'C':'v']);}
  if(ph){for(const [x,y] of [[24,32],[64,32],[34,60],[54,60],[15,54],[73,52],[30,72],[58,76],[44,10]])line(44,44,x,y,'v',d);}
  // the face: deep sockets, pale eyes, a mouth full of teeth
  for(const [y,x0,x1] of [[14,37,39],[15,37,40],[16,38,41],[17,39,42],[18,40,42],[19,41,42]])for(let x=x0;x<=x1;x++){d.push([x,y,'k']);d.push([88-x,y,'k']);}
  d.push([40,16,'W'],[41,17,'W'],[40,17,ph?'W':'C'],[48,16,'W'],[47,17,'W'],[48,17,ph?'W':'C']);
  for(let y=20;y<=22;y++)d.push([44,y,'k']);d.push([43,22,'k'],[45,22,'k']);
  for(let x=39;x<=49;x++){d.push([x,25,x%2?'k':'W'],[x,26,'k'],[x,27,x%2?'k':'j']);}
  line(36,10,40,14,'a',d);line(52,10,49,14,'a',d);if(ph){line(46,9,43,20,'k',d);line(36,20,40,24,'k',d);}
  // bracers and the collar
  for(const [x,y] of [[14,60],[75,58]])for(let i=-3;i<=3;i++)d.push([x+i,y,'j'],[x+i,y+2,'a']);
  for(let x=31;x<=57;x+=4)d.push([x,31,'j'],[x,32,'a']);
  // the blade's edge
  line(80,9,73,3,'W',d);line(73,3,62,1,'W',d);line(62,1,56,5,'W',d);line(79,13,72,8,'a',d);line(72,8,62,6,'a',d);
  return paint(88,88,caps,{dots:d});
}
const MON={
  firstash:firstAsh(0),firstash2:firstAsh(1),
  // a body turned to pale stone, still walking
  ashwalk:paint(36,36,[c([20,16],[18,26],5.5,4.2,ASH),c([15,10],[17,14],4.2,4.4,BONE),c([16,14],[9,18],2.2,2,ASH),c([9,18],[6,30],2,1.2,ASH),c([22,15],[27,21],2.2,1.9,ASH),c([27,21],[25,27],1.9,1.3,ASH),c([17,26],[13,33],2.6,1.8,ASH),c([20,26],[24,33],2.6,1.8,ASH)],{crack:CR,cracks:[[[16,17],[21,28]],[[9,19],[6,28]],[[20,16],[25,20]]],dots:[[12,10,'k'],[14,10,'k'],[12,11,'W'],[14,11,'W'],[13,13,'k'],[12,13,'k'],[14,13,'k']]}),
  // a long thin hound with a spine of bone blades
  emberhound:paint(38,32,[c([23,17],[12,15],5.2,4.4,ASH),c([12,15],[7,11],3.6,3.4,ASH),c([7,11],[2,13],2.8,1.5,BONE),c([5,8],[6,4],1.5,.7,BONE),c([9,8],[11,4],1.5,.7,BONE),c([13,19],[10,29],2.2,1.3,ASH),c([17,20],[18,29],2,1.2,ASH),c([24,20],[22,29],2.4,1.3,ASH),c([27,18],[30,29],2,1.2,ASH),c([27,15],[35,9],2,.8,ASH),c([18,11],[19,4],2.2,.5,BONE),c([23,11],[25,3],2.6,.5,BONE),c([14,12],[14,6],1.8,.5,BONE),c([28,12],[31,6],1.8,.4,BONE)],{crack:CR,cracks:[[[11,16],[26,18]]],dots:[[5,11,'W'],[6,11,'C'],[3,14,'W'],[5,14,'W'],[2,15,'k'],[4,15,'k']]}),
  // a tall hooded priest and a censer of pale smoke
  sootpriest:paint(34,38,[c([17,9],[17,13],5,5.2,CLOTH),c([17,13],[17,28],5.5,9,CLOTH),c([12,17],[6,22],2.4,1.8,CLOTH),c([22,17],[27,21],2.4,1.8,CLOTH),c([12,28],[11,35],3.4,.6,CLOTH),c([17,28],[17,36],3.6,.6,CLOTH),c([23,28],[24,35],3.4,.6,CLOTH),c([6,23],[6,28],.5,.5,HAFT),c([6,31],[6,31],2.8,2.8,GHOST)],{crack:CR,dots:[...line(15,10,19,10,'k'),...line(15,11,15,13,'k'),...line(19,11,19,13,'k'),...line(15,14,19,14,'k'),[17,12,'k'],[16,12,'W'],[18,12,'W'],[16,11,'k'],[18,11,'k'],[17,11,'k'],[16,13,'k'],[17,13,'k'],[18,13,'k'],...line(12,20,22,20,'a'),...line(11,26,23,26,'a'),[17,23,'v'],[17,24,'C'],[16,24,'v'],[18,24,'v'],[17,25,'v']]}),
  // his first minions: bone men dragging their chains
  ashthrall:paint(36,38,[c([18,15],[18,25],4.2,3.4,DARK),c([18,8],[18,10],4.4,3.8,BONE),c([14,14],[8,21],1.6,1.4,BONE),c([8,21],[7,29],1.4,1,BONE),c([22,14],[28,21],1.6,1.4,BONE),c([28,21],[29,29],1.4,1,BONE),c([16,25],[13,36],1.8,1.2,BONE),c([20,25],[23,36],1.8,1.2,BONE),...[[3,33],[6,35],[9,33]].map(p=>c([7,29],p,.8,.3,BONE)),...[[27,33],[30,35],[33,33]].map(p=>c([29,29],p,.8,.3,BONE)),c([14,6],[11,1],1.2,.3,DARK),c([22,6],[25,1],1.2,.3,DARK)],{dots:[...[0,1,2,3].flatMap(i=>[...line(14+i*.3,15+i*2.5,22-i*.3,15+i*2.5,'w')]),...line(18,14,18,24,'W'),[16,8,'k'],[16,9,'k'],[20,8,'k'],[20,9,'k'],[16,9,'W'],[20,9,'W'],[18,11,'k'],...[15,17,19,21].flatMap(x=>[[x,12,'k']])]}),
  // his second minions: empty shrouds carrying a piece of his light
  paleshroud:paint(36,38,[c([18,9],[18,13],5.4,5.6,{ramp:['g','G','a','w'],n:1.4}),c([18,13],[18,26],5.6,10,{ramp:['g','G','a','w'],n:2}),...[8,13,18,23,28].map((x,i)=>c([x,26],[x+(i%2?1:-1),37-(i%2)*3],3,.5,{ramp:['g','G','a'],n:2.2})),c([13,17],[4,14],2,1.2,{ramp:['g','G','a'],n:1.2}),c([23,17],[32,14],2,1.2,{ramp:['g','G','a'],n:1.2})],{dots:[...line(14,10,22,10,'k'),...line(13,11,13,15,'k'),...line(23,11,23,15,'k'),...line(14,16,22,16,'k'),...[11,12,13,14,15].flatMap(y=>line(14,y,22,y,'k')),[16,13,'W'],[20,13,'W'],[16,14,'v'],[20,14,'v'],[18,22,'W'],[17,22,'C'],[19,22,'C'],[18,21,'C'],[18,23,'C'],[16,22,'v'],[20,22,'v'],[18,20,'v'],[18,24,'v']]}),
};
module.exports={MON};
