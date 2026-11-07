// Monsters and bosses for the three devil regions, painted into the game's letter grids at build time.
const {paint,c}=require('./ashart.js');
const line=(x0,y0,x1,y1,col,d=[])=>{const n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0)));for(let i=0;i<=n;i++)d.push([x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,col]);return d;};
const xs=(x,y,col,d)=>{d.push([x,y,col],[x-1,y-1,col],[x+1,y-1,col],[x-1,y+1,col],[x+1,y+1,col]);};
// Hollow: shadow, pale faces, crossed eyes, ghost light
const SH={ramp:['k','K','d','g'],n:2.2},FACE={ramp:['a','w','j','W'],n:.4},GL={ramp:['u','U','c','C','W'],n:.4};
// Colossus: red stone and yellow light
const ST={ramp:['h','r','R','e'],n:1.6},DST={ramp:['k','h','r','R'],n:1.4};
// Veiled: porcelain, black hair, red string, plum cloth
const POR={ramp:['a','w','j','W'],n:.3},HAIR={ramp:['k','K','d'],n:2.4},PLUM={ramp:['p','P','m'],n:1.6},WOOD={ramp:['b','B','n'],n:.8},RED={ramp:['h','r','R'],n:.8};
function face(d,cx,cy,w,smile){xs(cx-w,cy,'k',d);xs(cx+w,cy,'k',d);if(smile){for(let x=cx-w-1;x<=cx+w+1;x++){const y=cy+3+Math.round(Math.abs(x-cx)<w?1:0);d.push([x,y,'k']);if((x+cx)%2)d.push([x,y-1,'W']);}}else d.push([cx,cy+3,'k']);}
const MON={
  // Hollow region
  hcrawl:(()=>{const d=[];face(d,18,13,4,true);return paint(36,32,[c([18,13],[18,15],8,7,FACE),...[[4,24],[2,30],[8,31],[28,24],[33,30],[27,31]].map((p,i)=>c([i<3?13:23,17],p,1.6,.6,SH)),c([18,19],[18,22],5,3,SH)],{dots:d});})(),
  hgrin:(()=>{const d=[];xs(13,12,'C',d);xs(23,12,'C',d);for(let x=8;x<=28;x++){const y=19+Math.round(Math.sin((x-8)/20*Math.PI)*4);d.push([x,y,'k'],[x,y-1,x%2?'W':'k'],[x,y+1,x%2?'W':'k']);}return paint(36,36,[c([18,15],[18,16],12,11,SH),...[8,14,20,26].map((x,i)=>c([x,24],[x+(i%2?2:-2),34],2.6,.5,SH))],{dots:d});})(),
  hflame:(()=>{const d=[];xs(15,18,'k',d);xs(21,18,'k',d);d.push([18,22,'k']);return paint(34,38,[c([18,24],[18,28],8,7,GL),c([18,20],[16,8],7,1.2,GL),c([13,22],[9,12],3.6,.6,GL),c([23,22],[26,10],3.4,.6,GL),c([18,10],[19,2],2,.4,GL)],{dots:d});})(),
  // the Hollow, unmasked: a cracked giant face on a body of shadow, arms like smoke
  dhollow:(()=>{const d=[];
      // crossed eyes, thick, with a cold point of light behind each
      for(const [x,y] of [[33,22],[55,22]]){for(let i=-5;i<=5;i++){for(const o of [0,1]){d.push([x+i+o,y+i,'k'],[x-i+o,y+i,'k']);}}d.push([x,y-1,'C'],[x+1,y-1,'C'],[x,y,'W'],[x+1,y,'W']);}
      // a smile that runs from cheek to cheek, two rows of teeth
      for(let x=20;x<=68;x++){const t=(x-20)/48,y=36+Math.round(Math.sin(t*Math.PI)*8),y2=y-4+Math.round(Math.sin(t*Math.PI)*2);for(let yy=y2;yy<=y;yy++)d.push([x,yy,'k']);if(x%3!==0){d.push([x,y2,'W'],[x,y2+1,'j'],[x,y,'W'],[x,y-1,'j']);}}
      line(26,10,34,20,'g',d);line(62,8,56,22,'g',d);line(44,4,46,16,'g',d);line(20,30,24,38,'g',d);line(68,32,64,40,'g',d);
      return paint(88,88,[c([44,72],[44,82],13,24,SH),...[14,24,34,44,54,64,74].map((x,i)=>c([x,74],[x+(i%2?3:-3),87],5,.6,SH)),c([44,26],[44,36],25,21,FACE),c([16,52],[6,68],5,3,SH),c([6,68],[3,84],3,.6,SH),...[[0,80],[3,87],[7,85]].map(p=>c([4,80],p,1,.4,SH)),c([72,52],[82,68],5,3,SH),c([82,68],[85,84],3,.6,SH),...[[88,80],[85,87],[81,85]].map(p=>c([84,80],p,1,.4,SH)),...[-36,-22,-8,8,22,36].map(o=>c([44+o*.6,10],[44+o*.95,Math.abs(o)===8?-3:1],3.2,.5,SH))],{dots:d});})(),
  // Colossus region
  shand:(()=>{const d=[];d.push([17,16,'y'],[18,16,'Y'],[19,16,'y']);return paint(36,30,[c([18,18],[18,22],8,7,ST),...[[5,8],[10,4],[17,2],[24,4],[31,10]].map(p=>c([18,16],p,2.4,1.4,ST)),c([12,25],[6,29],2.6,1.4,ST),c([24,25],[30,29],2.6,1.4,ST)],{dots:d,crack:['Y','y','o'],cracks:[[[12,20],[24,22]]]});})(),
  sgolem:(()=>{const d=[];d.push([16,11,'y'],[17,11,'Y'],[20,11,'y'],[21,11,'Y']);for(let x=15;x<=22;x++)d.push([x,15,x%2?'k':'y']);return paint(38,38,[c([18,22],[18,26],10,9,ST),c([18,11],[18,13],6,5.5,ST),c([7,18],[4,30],4,3.6,DST),c([29,18],[32,30],4,3.6,DST),c([13,31],[12,37],3.4,3,DST),c([23,31],[24,37],3.4,3,DST)],{dots:d,crack:['Y','y','o'],cracks:[[[12,18],[22,28]],[[24,16],[20,24]]]});})(),
  swatch:(()=>{const d=[];for(const x of [14,22]){d.push([x,12,'k'],[x+1,12,'k'],[x,13,'Y'],[x+1,13,'y'],[x,14,'k'],[x+1,14,'k']);}line(13,20,24,20,'k',d);return paint(38,38,[c([19,30],[19,36],7,8,DST),c([19,14],[19,22],9,8,ST),c([10,6],[6,1],2,.4,DST),c([28,6],[32,1],2,.4,DST)],{dots:d,crack:['Y','y','o'],cracks:[[[11,24],[26,26]]]});})(),
  stonearm:(()=>{const d=[];return paint(30,40,[c([15,2],[14,22],5,4.4,ST),c([14,22],[15,32],4.4,5.6,ST),...[[7,38],[11,39],[15,39],[19,39],[23,37]].map(p=>c([15,34],p,1.8,1.2,ST))],{dots:d,crack:['Y','y','o'],cracks:[[[13,6],[16,20]],[[14,24],[15,31]]]});})(),
  // the Colossus, risen: a head and shoulders of red rock, eyes like furnaces, a jaw that hangs open
  dcolossus:(()=>{const d=[];for(const x of [30,52]){for(let j=0;j<6;j++)for(let i=0;i<8;i++)d.push([x+i,28+j,j===0||j===5||i===0||i===7?'k':(i>2&&i<5&&j>1&&j<4?'Y':'y')]);}
      for(let x=30;x<=58;x++){d.push([x,46,'k'],[x,52,'k']);if(x%3===0)d.push([x,47,'W'],[x,48,'j'],[x,51,'j']);}for(let y=47;y<52;y++){d.push([30,y,'k'],[58,y,'k']);for(let x=31;x<58;x++)if(!(x%3===0&&(y<49||y>50)))d.push([x,y,'K']);}
      line(26,18,36,24,'k',d);line(62,18,52,24,'k',d);
      return paint(88,88,[c([44,72],[44,86],30,34,DST),c([16,66],[4,86],12,8,DST),c([72,66],[84,86],12,8,DST),c([44,34],[44,44],22,20,ST),c([44,52],[44,58],14,12,ST),c([24,12],[18,0],3.6,.6,DST),c([64,12],[70,0],3.6,.6,DST),c([34,14],[32,4],2.6,.6,DST),c([54,14],[56,4],2.6,.6,DST)],{dots:d,crack:['Y','y','o'],cracks:[[[22,30],[30,44]],[[66,26],[60,42]],[[44,16],[42,26]],[[20,70],[34,80]],[[68,70],[56,84]],[[44,62],[46,78]]]});})(),
  // Veiled region
  vmario:(()=>{const d=[];d.push([16,7,'k'],[19,7,'k'],[17,10,'R'],[18,10,'R']);for(const [x,y] of [[8,0],[17,0],[28,0]])line(x,y,x===17?17:x<17?9:27,x===17?3:14,'w',d);return paint(36,38,[c([17,7],[17,8],4,4,WOOD),c([17,13],[17,22],4,4,RED),c([13,14],[9,15],1.2,1.2,WOOD),c([9,15],[9,22],1.2,1,WOOD),c([21,14],[26,15],1.2,1.2,WOOD),c([26,15],[27,22],1.2,1,WOOD),c([15,23],[13,33],1.4,1.2,WOOD),c([19,23],[22,33],1.4,1.2,WOOD)],{dots:d});})(),
  vdoll:(()=>{const d=[];d.push([15,9,'k'],[20,9,'k'],[15,10,'R'],[20,10,'R'],[17,13,'R'],[18,13,'R']);line(14,6,17,12,'g',d);return paint(36,38,[c([17,22],[17,32],5,9,PLUM),c([17,9],[17,11],5,5,POR),c([11,8],[8,22],3,1.4,HAIR),c([23,8],[26,22],3,1.4,HAIR),c([17,4],[17,5],6,5,HAIR),c([12,18],[9,24],1.4,1,POR),c([22,18],[25,24],1.4,1,POR)],{dots:d});})(),
  vweaver:(()=>{const d=[];d.push([16,14,'k'],[20,14,'k'],[16,15,'R'],[20,15,'R'],[18,18,'k']);for(let i=0;i<6;i++)line(18,0,6+i*5,8,'w',d);return paint(38,36,[c([18,16],[18,18],6,5.4,POR),c([18,24],[18,25],7,6,HAIR),...[[3,20],[2,32],[8,35],[33,20],[34,32],[28,35]].map((p,i)=>c([i<3?13:23,24],p,1.4,.5,HAIR))],{dots:d});})(),
  vpuppet:(()=>{const d=[];d.push([11,7,'k'],[14,7,'k'],[12,10,'R']);line(12,0,12,4,'w',d);line(4,0,6,12,'w',d);line(20,0,18,12,'w',d);return paint(26,30,[c([12,7],[12,8],3.6,3.6,POR),c([12,13],[12,20],3,4.4,RED),c([9,14],[5,19],1,1,WOOD),c([15,14],[19,19],1,1,WOOD),c([11,21],[9,28],1.1,1,WOOD),c([14,21],[16,28],1.1,1,WOOD)],{dots:d});})(),
  // the Veiled, curtain call: a long porcelain face behind a veil of hair, hands full of strings, her dolls hanging below
  dveiled:(()=>{const d=[];d.push([39,24,'k'],[40,24,'k'],[48,24,'k'],[49,24,'k'],[39,25,'R'],[49,25,'R']);for(let x=38;x<=50;x++){d.push([x,34,'k']);if(x%2)d.push([x,33,'W'],[x,35,'W']);}line(37,14,42,30,'g',d);
      for(const [x0,x1] of [[16,12],[22,20],[66,68],[72,78]])line(x0,48,x1,74,'R',d);for(let y=10;y<70;y+=4){d.push([30,y,'K'],[58,y,'K']);}
      return paint(88,88,[c([44,58],[44,84],16,24,PLUM),c([44,40],[44,48],8,10,PLUM),c([44,26],[44,32],9,8,POR),c([30,16],[18,70],8,4,HAIR),c([58,16],[70,70],8,4,HAIR),c([44,14],[44,18],12,10,HAIR),c([32,44],[18,46],2.4,1.6,POR),c([56,44],[70,46],2.4,1.6,POR),...[[14,48],[16,49],[18,50]].map(p=>c([18,46],p,1,.4,POR)),...[[74,48],[72,49],[70,50]].map(p=>c([70,46],p,1,.4,POR)),c([12,76],[12,78],3,3,POR),c([12,80],[12,86],2.4,3,RED),c([76,76],[76,78],3,3,POR),c([76,80],[76,86],2.4,3,RED),c([40,10],[30,4],2,.6,RED),c([48,10],[58,4],2,.6,RED)],{dots:d});})(),
};
module.exports={MON};
