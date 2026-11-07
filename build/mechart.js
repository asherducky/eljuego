// Unique chest art: each plate and robe tier is drawn on its own, themed on the region it comes from.
const {P}=require('./mech.js');
const CODE=String.raw`/* unique chest pieces: f(R,P,over) draws the body when over is false, and the front arm after the head when true */
ARM32.plate=[{m:'#8a5f3c',d:'#54371f',h:'#b58a5a',a:'#a6a0b4'},{m:'#8f94a8',d:'#565a70',h:'#c8ccd8',a:'#3a5ea8'},{m:'#2a2433',d:'#14101c',h:'#5d5672',a:'#e2782a',g:'#f2c14e'},{m:'#e8e0cc',d:'#a89c86',h:'#fffaf0',a:'#6e6680',g:'#9cc8ff'},{m:'#2a6e6e',d:'#1d2b52',h:'#5ec4b0',a:'#e8796a',g:'#c4ecff'}];
ARM32.leather=[{m:'#8a5a32',d:'#4a2f1a',h:'#b98a52',a:'#3a2416'},{m:'#a8703f',d:'#6e4528',h:'#d8a86a',a:'#c43c3c'},{m:'#3a2e2a',d:'#1f1714',h:'#5a4a42',a:'#e2782a',g:'#f2c14e'},{m:'#d8ccb4',d:'#8f88a8',h:'#fff8ec',a:'#2a2433',g:'#9cc8ff'},{m:'#3a6a7a',d:'#1d3a4a',h:'#6fa8b8',a:'#e8f0f4',g:'#c4ecff'}];
ARM32.robe=[{m:'#6b7a4a',d:'#3f4a2c',h:'#97a86a',a:'#8a5a32'},{m:'#d8b878',d:'#9a7a48',h:'#f0dca8',a:'#c43c3c'},{m:'#2e2630',d:'#171219',h:'#4a3f4a',a:'#e2782a',g:'#f2c14e'},{m:'#f4efe4',d:'#b8b0c8',h:'#ffffff',a:'#2a2433',g:'#9cc8ff'},{m:'#1f6a80',d:'#123f52',h:'#3fa8a8',a:'#5ec4b0',g:'#c4ecff'}];
/* themed headgear and boots: each type has its own look per tier, matching the chest pieces */
const helmB=(R,p,slit)=>{R(10,2,11,1,p.m);R(9,3,13,11,p.m);R(8,5,15,8,p.m);R(10,3,3,7,p.h);R(9,5,1,6,p.h);R(19,4,3,9,p.d);R(8,13,15,2,p.d);R(10,2,6,1,p.h);R(14,7,9,1,slit);R(18,8,1,4,slit);};
const capB=(R,p)=>{R(9,0,13,4,p.m);R(8,2,4,6,p.m);R(10,0,9,1,p.h);R(11,1,4,1,p.h);R(13,4,12,2,p.d);R(13,4,12,1,p.m);};
const hoodB=(R,p,t)=>{for(let y=0;y<16;y++){const x0=y<3?10-y:7,x1=y<3?18+y:(y<12?23:21-(y-12));R(x0,y,x1-x0+1,1,p.m);}R(13,4,10,10,null);R(12,4,1,10,t);R(13,3,10,1,t);R(7,6,3,8,p.d);R(8,1,2,4,p.h);for(let y=14;y<20;y++)R(6,y,y>17?4:5,1,p.m);R(6,14,1,6,p.d);};
const HAT32X={helm:[
  // Scrap Bucket: a rusty bucket with a tin patch, rivets and a handle
  (R,P,p)=>{const i='#7a7488',k='#a6a0b4',b='#d8c8a0',s='#54371f';R(9,1,13,13,p.m);R(8,3,1,9,p.d);R(9,1,13,1,p.h);R(19,2,3,12,p.d);R(9,4,13,1,s);R(9,13,14,2,i);R(9,13,14,1,k);R(15,7,8,1,'#1f1a2b');P(16,10,'#1f1a2b');P(19,10,'#1f1a2b');R(10,8,3,3,i);P(10,8,k);P(10,5,b);P(14,5,b);P(10,12,b);P(12,2,p.d);R(7,6,1,3,s);},
  // Iron Helm: clean visor, blue crest and neck guard
  (R,P,p)=>{helmB(R,p,'#1f1a2b');R(8,13,15,2,'#3a5ea8');R(12,0,8,2,'#3a5ea8');R(13,0,4,1,'#6fb7e8');P(11,5,p.h);P(11,11,p.h);},
  // Obsidian Helm: black horns and spikes, a molten visor
  (R,P,p)=>{helmB(R,p,'#f2c14e');R(18,8,1,4,'#e2782a');P(11,8,'#e2782a');P(12,9,'#e2782a');P(11,10,'#f2c14e');for(const x of [10,13,16,19])R(x,0,1,2,p.h);R(5,6,3,1,p.h);P(4,5,p.h);P(3,4,p.h);R(23,6,2,1,p.h);P(25,5,p.h);P(26,4,p.h);},
  // Skull Helm: an open-jawed skull with cold blue eyes
  (R,P,p)=>{const c='#2a2433',g='#9cc8ff';R(10,2,11,1,p.m);R(9,3,13,8,p.m);R(8,5,15,6,p.m);R(10,3,3,5,p.h);R(19,4,3,7,p.d);R(14,6,3,3,c);R(19,6,3,3,c);P(15,7,g);P(20,7,g);R(17,9,2,2,c);R(11,11,11,3,p.m);R(19,11,3,3,p.d);for(let x=12;x<22;x+=2)R(x,12,1,2,c);P(12,4,p.d);P(13,5,p.d);},
  // Abyssal Helm: a finned crest, gills, a pearl and a coral branch
  (R,P,p)=>{const c='#e8796a',e='#ffb3a8';helmB(R,p,p.g);R(13,0,7,2,p.h);for(const x of [14,16,18])R(x,0,1,2,p.d);for(const x of [10,12])R(x,8,1,3,p.d);P(11,12,'#f4efe4');R(6,4,2,1,c);P(5,3,c);P(7,3,e);P(5,2,e);}
],cap:[
  // Patched Cap: stitched scraps
  (R,P,p)=>{capB(R,p);R(9,3,13,1,'#3a2416');R(13,1,3,2,p.h);P(13,1,'#e8dcc4');P(15,2,'#e8dcc4');R(17,0,3,2,p.d);P(18,1,'#e8dcc4');},
  // Nomad Turban: wrapped cloth, a red jewel, a trailing tail
  (R,P,p)=>{const c='#e8dcc4',d='#b8a88a';R(8,0,15,6,c);R(10,0,10,1,'#fff8ec');R(8,2,15,1,d);R(8,4,15,1,d);R(16,2,2,2,'#c43c3c');P(16,2,'#ff6b5e');R(6,4,3,8,c);R(6,4,1,8,d);},
  // Ash Cap: a scorched wide brim with live embers
  (R,P,p)=>{const m='#2e2630',d='#171219';capB(R,{m,d,h:'#4a3f4a'});R(8,3,18,2,d);R(9,3,13,1,'#e2782a');P(12,1,'#e2782a');P(18,2,'#f2c14e');P(25,3,'#e2782a');},
  // Grave Cap: pale leather, a black band, a small skull
  (R,P,p)=>{const c='#2a2433';capB(R,p);R(9,3,13,1,c);R(15,0,4,3,'#fffaf0');P(15,1,c);P(17,1,c);P(16,2,c);R(20,1,2,1,'#fffaf0');},
  // Shark Cap: a fin on top and a row of teeth along the brim
  (R,P,p)=>{capB(R,p);R(9,3,13,1,p.d);R(11,0,4,1,p.g);R(12,1,3,1,p.h);for(let x=13;x<25;x+=2)P(x,6,'#f4efe4');P(21,2,'#1f1a2b');}
],hood:[
  // Ragweave Hood: mossy sackcloth, a patch, torn edges
  (R,P,p)=>{hoodB(R,p,p.h);R(9,1,3,1,'#2f6b3a');P(11,0,'#b6e36a');P(15,0,'#b6e36a');P(8,2,'#6aa84f');R(8,8,2,3,'#8a5a32');P(8,8,'#c9b98a');R(7,19,1,1,null);R(9,18,1,2,null);},
  // Sandwrap Hood: desert cloth with a mouth wrap and a red band
  (R,P,p)=>{hoodB(R,p,p.a);R(13,10,10,4,p.m);R(13,10,10,1,p.h);R(13,12,10,1,p.d);R(12,4,1,6,p.a);},
  // Cinder Hood: a burnt point, ember trim, drifting sparks
  (R,P,p)=>{hoodB(R,p,p.a);R(6,0,2,1,p.d);P(10,0,p.a);P(9,1,p.a);P(4,2,p.a);P(3,0,p.g);for(const x of [6,8])P(x,19,p.a);P(8,5,p.g);},
  // Funeral Hood: a white shroud, black brow band, grave beads
  (R,P,p)=>{hoodB(R,p,p.a);for(const x of [14,17,20])P(x,3,'#a89c86');R(6,19,4,1,p.a);P(8,15,'#a89c86');P(8,17,'#a89c86');},
  // Tidecaller Hood: a fin crest, pearls, a foam trim
  (R,P,p)=>{hoodB(R,p,p.g);for(const x of [10,12,14])P(x,0,p.g);R(6,19,4,1,'#c4ecff');P(9,16,'#f4efe4');P(10,18,'#f4efe4');P(5,8,p.a);P(4,7,p.g);P(5,6,p.a);}
]};
const BOOT32X={greaves:[
  (R,P,x,w,p)=>{R(x+1,31,3,2,'#7a7488');R(x+1,31,3,1,'#a6a0b4');P(x+1,32,'#d8c8a0');R(x,34,5,1,'#3a2416');R(x+w-3,36,3,2,'#7a7488');R(x+w-3,36,3,1,'#a6a0b4');P(x+1,37,'#d8c8a0');},
  (R,P,x,w,p)=>{R(x+1,30,3,2,p.h);R(x,34,5,1,'#3a5ea8');R(x,36,w,1,p.d);},
  (R,P,x,w,p)=>{P(x-1,31,p.h);P(x-2,30,p.h);P(x+2,31,p.a);P(x+3,32,p.g);P(x+2,33,p.a);R(x,38,w,1,p.a);P(x+w,37,p.h);},
  (R,P,x,w,p)=>{const c='#2a2433';R(x,31,5,3,c);R(x+1,30,1,5,p.m);R(x+3,30,1,5,p.m);R(x,32,5,1,p.h);R(x,35,w,1,p.h);for(let i=x;i<x+w;i+=2)P(i,38,c);P(x+w,38,p.m);},
  (R,P,x,w,p)=>{P(x+1,31,p.h);P(x+3,32,p.h);P(x+1,33,p.h);P(x-1,35,p.h);P(x-2,34,p.h);P(x-3,33,p.g);R(x+1,36,w-2,1,p.h);P(x+2,37,'#f4efe4');}
],shoes:[
  (R,P,x,w,p)=>{R(x+1,36,2,2,p.h);P(x+1,36,'#e8dcc4');P(x+2,37,'#e8dcc4');R(x+3,35,2,1,p.d);R(x,34,5,1,'#e8dcc4');},
  (R,P,x,w,p)=>{R(x,33,5,1,'#e8dcc4');R(x,34,5,1,'#b8a88a');R(x,36,w,1,p.d);P(x+w,37,p.m);P(x+w,38,p.d);},
  (R,P,x,w,p)=>{R(x,35,w,4,'#2e2630');R(x,35,w,1,'#4a3f4a');P(x+1,36,'#e2782a');P(x+4,37,'#f2c14e');R(x,38,w,1,'#e2782a');},
  (R,P,x,w,p)=>{R(x,34,5,1,p.m);R(x+2,36,2,2,'#fffaf0');P(x+2,36,'#2a2433');R(x,38,w,1,p.d);},
  (R,P,x,w,p)=>{R(x,36,w,1,p.h);P(x-1,35,p.h);P(x-2,34,p.g);P(x-1,36,p.m);R(x,38,w,1,'#f4efe4');P(x+w-1,37,'#f4efe4');}
],treads:[
  (R,P,x,w,p)=>{R(x,33,5,2,p.d);R(x,35,w,1,p.d);R(x,37,w,1,p.d);P(x+1,34,'#b6e36a');P(x+3,33,'#6aa84f');},
  (R,P,x,w,p)=>{R(x,36,w,2,SKIN.s);R(x,35,w,1,'#8a5a32');R(x,38,w,1,'#54371f');R(x+2,36,1,2,'#8a5a32');R(x,34,5,1,'#8a5a32');},
  (R,P,x,w,p)=>{R(x,38,w,1,p.a);P(x+1,37,p.g);P(x+w-2,36,p.a);P(x+w,36,p.m);P(x+w,35,p.h);},
  (R,P,x,w,p)=>{R(x,36,w,1,p.a);P(x+1,37,'#a89c86');P(x+3,37,'#a89c86');R(x,38,w,1,p.d);},
  (R,P,x,w,p)=>{R(x,36,w,1,p.a);P(x+w,37,p.a);P(x+w,36,p.g);P(x+w-1,35,p.g);R(x,38,w,1,'#c4ecff');P(x+1,37,'#f4efe4');}
]};
function bootX(R,P,bt,tr){const f=BOOT32X[bt]&&BOOT32X[bt][tr];if(!f)return;const p=armP(bt==='greaves'?'plate':bt==='shoes'?'leather':'robe',tr);f(R,P,9,6,p);f(R,P,17,7,p);}
const scarf32=R=>{R(10,14,12,2,'#c43c3c');R(10,15,12,1,'#7a1f2b');R(11,14,6,1,'#ff6b5e');};
const ARM32X={plate:[
  // Scrap Plate: rusty sheets, a grey tin patch, bolts, a dented pan on the shoulder
  (R,P,o)=>{const m='#8a5f3c',d='#54371f',h='#b58a5a',i='#7a7488',j='#4f4a5c',k='#a6a0b4',b='#d8c8a0',s='#3a2416';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(21,19,5,1,s);R(21,21,5,1,s);R(22,23,5,3,SKIN.s);R(22,25,5,1,SKIN.S);R(20,14,7,3,i);R(20,14,7,1,k);R(20,16,7,1,j);P(22,15,b);P(25,15,b);P(27,13,j);return;}
    R(10,27,3,3,i);R(10,27,3,1,k);R(14,27,2,4,m);R(18,27,4,3,m);R(18,27,4,1,h);P(19,28,b);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,6,5,i);R(10,16,6,1,k);R(15,16,1,5,j);R(10,20,6,1,j);P(11,17,b);P(14,19,b);R(13,21,7,3,h);R(13,23,7,1,m);P(14,22,b);P(18,22,b);R(17,16,3,3,d);P(18,17,b);
    R(9,25,14,2,s);R(15,25,2,2,k);
    },
  // Iron Plate: clean soldier's armor, blue tabard, round pauldrons
  (R,P,o)=>{const m='#8f94a8',d='#565a70',h='#c8ccd8',t='#3a5ea8',u='#1d2b52',v='#6fb7e8',s='#3a2416',y='#c8ccd8';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(22,23,5,3,m);R(22,23,5,1,h);R(22,25,5,1,d);R(20,13,7,4,m);R(21,13,5,1,h);R(20,16,7,1,d);R(25,14,2,2,d);return;}
    R(9,27,4,3,m);R(9,27,4,1,h);R(19,27,4,3,d);R(19,27,4,1,m);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);R(13,15,6,17,t);R(18,15,1,17,u);R(13,15,1,17,v);R(15,18,2,4,y);R(14,19,4,1,y);R(13,31,6,1,u);
    R(9,25,14,2,s);R(15,25,2,2,y);
    },
  // Obsidian Plate: black jagged slabs, spikes, lava in the cracks
  (R,P,o)=>{const m='#2a2433',d='#14101c',h='#5d5672',l='#e2782a',g='#f2c14e';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);P(23,18,l);P(22,19,l);P(23,20,g);R(22,23,5,3,m);R(22,23,5,1,h);R(22,25,5,1,d);P(27,22,h);P(28,21,h);P(27,25,h);R(20,14,7,3,m);R(20,14,7,1,h);R(24,12,1,2,h);R(26,11,1,3,h);R(27,13,2,1,h);P(29,12,h);P(22,15,l);return;}
    for(const [x,n] of [[9,5],[12,6],[15,4],[18,6],[21,4]]){for(let j=0;j<n;j++)R(x,27+j,Math.max(1,3-j),1,m);P(x,27,h);}
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,7,h);
    for(const [x,y,c] of [[15,15,l],[14,16,l],[14,17,g],[15,18,l],[16,19,g],[16,20,l],[15,21,l],[14,22,g],[14,23,l],[17,20,l],[18,21,l],[12,18,l],[11,19,l]])P(x,y,c);
    R(9,25,14,2,d);R(15,25,2,2,g);
    },
  // Bone Plate: an open ribcage, skull on the shoulder, hanging femurs
  (R,P,o)=>{const m='#e8e0cc',d='#a89c86',h='#fffaf0',c='#2a2433',g='#9cc8ff';
    if(o){R(22,16,3,7,m);R(22,16,3,1,h);R(24,17,1,6,d);R(22,19,3,1,c);R(21,16,1,3,d);R(22,23,5,3,m);R(22,23,5,1,h);R(22,25,5,1,d);P(23,24,g);R(20,14,6,2,d);R(20,14,6,1,m);return;}
    R(11,27,2,6,m);R(11,27,1,6,h);R(10,32,4,1,m);R(16,27,2,7,m);R(16,27,1,7,h);R(15,33,4,1,m);R(20,27,2,5,d);R(19,31,4,1,d);
    R(9,15,14,11,c);R(15,15,2,10,m);R(15,15,1,10,h);
    for(const y of [16,18,20,22]){R(10,y,5,1,m);R(17,y,5,1,d);P(10,y,h);P(9,y+1,d);P(22,y+1,d);}
    R(16,17,1,1,g);P(13,19,g);P(19,21,g);
    R(9,25,14,2,d);R(9,25,14,1,m);R(14,25,4,2,h);P(15,26,c);P(16,26,c);
    },
  // Abyssal Plate: scales, a coral branch on the shoulder, a pearl at the heart, fins
  (R,P,o)=>{const m='#2a6e6e',d='#1d2b52',h='#5ec4b0',c='#e8796a',e='#ffb3a8',w='#f4efe4',g='#c4ecff';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);P(22,18,h);P(23,20,h);P(22,21,h);R(22,23,5,3,m);R(22,23,5,1,h);R(22,25,5,1,d);R(26,17,1,5,h);R(27,18,1,3,h);P(28,19,g);R(20,14,7,3,m);R(20,14,7,1,h);P(23,15,w);return;}
    for(let x=9;x<23;x+=3){R(x,27,3,2,x>17?d:m);P(x+1,29,x>17?d:m);P(x,27,h);}
    R(9,15,14,11,m);R(19,15,4,11,d);
    for(let y=16;y<25;y+=2)for(let x=10+((y>>1)%2);x<22;x+=3){P(x,y,h);P(x+1,y+1,d);}
    R(14,18,4,4,d);R(15,19,2,2,w);P(15,19,'#ffffff');P(14,18,g);P(17,21,g);
    R(9,25,14,2,d);R(9,25,14,1,h);R(15,25,2,2,w);
    }
],leather:[
  // Patched Hide: stitched hides, a fur collar on the shoulders, a rope belt
  (R,P,o)=>{const m='#8a5a32',d='#4a2f1a',h='#b98a52',f='#e8dcc4',e='#b8a88a',s='#c9b98a',n='#3a2416';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(21,20,3,2,h);P(21,20,s);P(23,21,s);R(20,15,7,2,f);R(20,16,7,1,e);P(26,17,e);R(22,23,5,3,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(10,27,4,3,m);R(10,29,4,1,d);R(15,27,3,2,d);R(18,27,4,3,d);P(11,30,m);P(20,30,d);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);R(13,17,5,4,h);P(13,17,s);P(17,17,s);P(13,20,s);P(17,20,s);R(18,22,4,3,n);P(18,22,s);P(21,24,s);
    R(9,25,14,2,n);R(15,25,2,2,s);R(12,27,1,3,n);},
  // Nomad Leathers: crossed bandoliers, a red sash, wrapped forearms, a side pouch
  (R,P,o)=>{const m='#a8703f',d='#6e4528',h='#d8a86a',a='#c43c3c',b='#7a1f2b',w='#e8dcc4',n='#3a2416';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(21,19,5,1,w);R(21,21,5,1,w);R(24,19,2,1,'#b8a88a');R(24,21,2,1,'#b8a88a');R(22,23,5,3,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(10,27,12,2,d);R(11,27,3,5,a);R(13,27,1,5,b);P(11,32,b);R(18,27,4,3,d);R(18,27,4,1,m);P(19,28,w);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);for(let i=0;i<10;i++){R(21-i,15+i,2,1,n);R(10+i,15+i,1,1,n);}P(15,20,w);P(16,20,w);
    R(9,25,14,2,a);R(9,26,14,1,b);R(15,25,2,2,w);},
  // Ashhide: scorched leather, ember cracks, a burnt jagged hem
  (R,P,o)=>{const m='#3a2e2a',d='#1f1714',h='#5a4a42',a='#e2782a',g='#f2c14e';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);P(22,18,a);P(23,19,g);P(22,21,a);for(const x of [21,23,25])P(x,23,d);R(22,23,5,3,SKIN.s);R(22,25,5,1,SKIN.S);P(27,16,a);return;}
    for(let x=10;x<22;x++){const n=1+((x*5)%3);R(x,27,1,n,x>17?d:m);P(x,27+n,a);}
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);for(const [x,y,c] of [[14,16,a],[15,17,g],[14,18,a],[16,19,a],[17,20,g],[16,21,a],[12,20,a],[13,21,a],[18,17,a],[19,18,g]])P(x,y,c);
    R(9,25,14,2,d);R(9,25,14,1,a);R(15,25,2,2,g);},
  // Gravehide: pale leather, a row of bone clasps, stitched ribs, a skull on the belt
  (R,P,o)=>{const m='#d8ccb4',d='#8f88a8',h='#fff8ec',c='#2a2433',g='#9cc8ff',b='#fffaf0';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(21,18,5,1,c);R(21,20,5,1,c);R(21,17,1,5,b);R(22,23,5,3,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(10,27,12,2,d);R(10,29,3,2,m);R(19,29,3,1,d);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);for(const y of [17,19,21,23])R(11,y,10,1,c);R(15,16,2,9,m);for(const y of [16,18,20,22])R(15,y,2,1,b);P(15,17,g);
    R(9,25,14,2,c);R(14,24,4,3,b);P(14,25,c);P(17,25,c);P(15,26,c);P(16,26,c);},
  // Sharkskin: sleek grey-blue with a pale belly, gills and a tooth necklace
  (R,P,o)=>{const m='#3a6a7a',d='#1d3a4a',h='#6fa8b8',w='#e8f0f4',g='#c4ecff';
    if(o){R(21,16,5,7,m);R(21,16,5,1,h);R(24,17,2,6,d);R(26,18,1,4,h);R(27,19,1,2,g);R(21,21,5,1,w);R(22,23,5,3,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(10,27,12,2,d);R(10,27,12,1,m);R(13,27,6,3,w);R(13,29,6,1,h);
    R(9,15,14,11,m);R(19,15,4,11,d);R(13,17,6,9,w);R(18,17,1,9,h);R(10,16,2,8,h);for(const y of [19,21,23])R(20,y,2,1,'#0f2a36');for(let x=11;x<21;x+=2){P(x,16,w);P(x+1,17,'#f4efe4');}
    R(9,25,14,2,d);R(15,25,2,2,g);}
],robe:[
  // Ragweave Robe: mossy sackcloth, patches, a rope belt, a torn hem
  (R,P,o)=>{const m='#6b7a4a',d='#3f4a2c',h='#97a86a',b='#8a5a32',n='#54371f',l='#b6e36a',s='#c9b98a';
    if(o){R(20,16,6,7,m);R(20,16,6,1,h);R(24,17,2,6,d);R(21,19,3,3,b);P(21,19,s);P(23,21,s);for(const x of [20,22,25])P(x,23,m);R(22,24,5,2,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(9,26,14,9,m);R(8,30,16,5,m);R(19,26,4,9,d);R(21,30,3,5,d);R(9,26,1,4,h);
    for(const [x,n2] of [[8,1],[9,3],[10,0],[11,2],[12,3],[13,1],[14,0],[15,2],[16,3],[17,1],[18,2],[19,0],[20,3],[21,1],[22,2],[23,0]])if(n2)R(x,35,1,n2,x>18?d:m);
    R(11,29,4,4,b);P(11,29,s);P(14,29,s);P(11,32,s);P(14,32,s);R(17,27,3,3,d);P(18,28,h);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);R(14,18,5,4,b);P(14,18,s);P(18,18,s);P(14,21,s);P(18,21,s);
    R(9,24,14,2,n);R(9,24,14,1,b);R(12,26,1,4,n);P(12,30,b);
    },
  // Sandwrap Robe: layered desert cloth, a neck scarf, a long red sash
  (R,P,o)=>{const m='#d8b878',d='#9a7a48',h='#f0dca8',a='#c43c3c',b='#7a1f2b';
    if(o){R(20,16,6,7,m);R(20,16,6,1,h);R(24,17,2,6,d);for(const [x,y] of [[20,18],[21,19],[22,20],[23,21]])R(x,y,3,1,d);R(19,22,8,2,a);R(19,23,8,1,b);R(22,24,5,2,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(9,26,14,10,m);R(8,30,16,6,m);R(19,26,4,10,d);R(21,30,3,6,d);R(8,31,16,1,d);R(8,30,16,1,h);R(8,35,16,1,h);
    for(let i=0;i<4;i++)R(10+i*3,27,2,1,d);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);for(let i=0;i<9;i++){R(20-i,15+i,2,1,d);R(13-Math.floor(i/2),16+i,1,1,h);}
    R(9,24,14,2,a);R(9,25,14,1,b);R(11,26,3,10,a);R(13,26,1,10,b);R(11,36,3,1,b);P(11,37,a);P(13,37,a);
    },
  // Cinder Robe: charred cloth, a burnt hem with live embers, a high scorched collar
  (R,P,o)=>{const m='#2e2630',d='#171219',h='#4a3f4a',a='#e2782a',g='#f2c14e';
    if(o){R(20,16,6,7,m);R(20,16,6,1,h);R(24,17,2,6,d);P(22,18,a);P(23,20,g);for(const x of [19,21,23,25]){R(x,23,1,2,d);P(x,25,a);}R(22,24,5,2,SKIN.s);R(22,25,5,1,SKIN.S);P(27,16,a);return;}
    R(9,26,14,9,m);R(8,30,16,5,m);R(19,26,4,9,d);R(21,30,3,5,d);R(9,26,1,4,h);
    for(let x=8;x<24;x++){const n=1+((x*7)%4);R(x,35,1,n,x>18?d:m);P(x,35+n,a);if(x%3===0)P(x,34+n,g);}
    for(const [x,y,c] of [[12,28,a],[13,29,g],[12,30,a],[11,31,a],[17,29,a],[18,30,a],[16,32,g]])P(x,y,c);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);R(15,16,2,8,d);
    for(const [x,y,c] of [[15,17,a],[16,18,g],[15,19,a],[16,20,a],[15,21,g],[16,22,a]])P(x,y,c);
    R(9,24,14,2,d);R(9,24,14,1,a);R(15,24,2,2,g);
    },
  // Funeral Robe: a floor-length white shroud, black sash, skull charm, grave beads
  (R,P,o)=>{const m='#f4efe4',d='#b8b0c8',h='#ffffff',a='#2a2433',g='#9cc8ff',b='#a89c86';
    if(o){R(20,16,6,8,m);R(20,16,6,1,h);R(24,17,2,7,d);R(19,23,8,2,a);R(22,25,5,1,SKIN.s);for(let y=17;y<23;y+=2)P(21,y,b);return;}
    R(9,26,14,8,m);R(8,29,16,5,m);R(7,33,18,5,m);R(19,26,4,12,d);R(21,29,4,9,d);R(7,37,18,1,d);R(9,26,1,6,h);R(15,27,1,10,d);
    R(11,26,2,12,a);R(11,37,2,1,g);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);
    for(const [x,y] of [[10,15],[11,16],[12,17],[13,18],[14,19],[16,19],[17,18],[18,17],[19,16],[20,15]])P(x,y,b);
    R(14,20,4,3,m);R(14,20,4,1,h);P(14,21,a);P(17,21,a);P(15,22,a);P(16,22,a);
    R(9,24,14,2,a);
    },
  // Tidecaller Robe: flowing teal, foam on a wave hem, a trailing train, shell fins, pearls
  (R,P,o)=>{const m='#1f6a80',d='#123f52',h='#3fa8a8',a='#5ec4b0',g='#c4ecff',w='#f4efe4';
    if(o){R(20,16,6,7,m);R(20,16,6,1,h);R(24,17,2,6,d);R(19,22,8,2,a);R(19,23,8,1,h);R(26,17,1,5,a);R(27,18,1,3,g);P(28,19,g);R(22,24,5,2,SKIN.s);R(22,25,5,1,SKIN.S);return;}
    R(9,26,14,9,m);R(8,30,16,5,m);R(19,26,4,9,d);R(21,30,3,5,d);R(4,33,5,3,m);R(2,35,3,1,h);R(4,33,5,1,h);
    for(let x=2;x<24;x++){const y=35+((x>>1)%2);P(x,y,a);P(x,y+1,((x>>1)%2)?w:g);if(x>7)R(x,35,1,y-35,x>18?d:m);}
    for(const [x,y] of [[10,28],[12,30],[17,28],[19,31],[14,32]])P(x,y,h);for(const x of [11,15,19])P(x,33,w);
    R(9,15,14,11,m);R(19,15,4,11,d);R(10,16,2,8,h);R(14,15,4,2,a);for(const [x,y] of [[15,18],[16,20],[15,22]])P(x,y,w);
    R(9,24,14,2,a);R(9,25,14,1,h);R(15,24,2,2,w);
    }
]};
// themed details that sit on the far shoulder, at the same height as the near one
const ARM32TOP={leather:[null,null,null,null,(R,P)=>{R(6,11,1,5,'#6fa8b8');R(7,12,1,4,'#6fa8b8');R(8,13,1,3,'#3a6a7a');P(5,12,'#c4ecff');}],plate:[(R,P)=>{P(5,13,'#4f4a5c');R(8,12,1,2,'#a6a0b4');},null,null,(R,P)=>{R(4,14,7,4,'#e8e0cc');R(4,14,7,1,'#fffaf0');R(4,17,7,1,'#a89c86');R(5,15,2,2,'#2a2433');R(8,15,2,2,'#2a2433');P(5,15,'#9cc8ff');P(8,15,'#9cc8ff');for(let x=5;x<10;x+=2)P(x,17,'#2a2433');},(R,P)=>{R(6,7,2,7,'#e8796a');R(6,7,1,7,'#ffb3a8');R(3,9,3,1,'#e8796a');R(3,7,1,2,'#e8796a');R(8,10,3,1,'#e8796a');R(10,8,1,2,'#ffb3a8');P(6,6,'#ffb3a8');P(3,6,'#ffb3a8');P(10,7,'#ffb3a8');}],
  robe:[(R,P)=>{R(5,15,6,1,'#2f6b3a');for(const x of [5,7,10])P(x,14,'#b6e36a');P(8,14,'#6aa84f');},(R,P)=>{R(3,16,2,8,'#c43c3c');R(3,16,1,8,'#7a1f2b');},(R,P)=>{R(7,10,3,6,'#2e2630');R(7,10,1,6,'#4a3f4a');R(5,12,2,4,'#171219');P(6,11,'#4a3f4a');R(8,8,1,2,'#171219');P(4,9,'#e2782a');P(9,6,'#e2782a');P(3,5,'#f2c14e');},null,(R,P)=>{for(const [x,n] of [[5,5],[8,7]]){R(x,16-n,2,n,'#5ec4b0');R(x,16-n,1,n,'#c4ecff');}}]};
// the far arm is the near arm mirrored, with a dark line so it stays apart from the chest
function mirrorArm(g,f){const a=hgrid(),[R,P]=hpen(a);f(R,P);for(let y=0;y<HH;y++){let e=-1;for(let x=0;x<HW;x++)if(a[y][x]&&x<=30){g[y][30-x]=a[y][x];e=Math.max(e,30-x);}if(y>=17&&e>=0&&g[y][e+1])g[y][e+1]='#2a2638';}}
const headOr=(R,P,no)=>{if(no)R(13,14,5,2,SKIN.S);else head32(R,P);};
function bodyX(at,tr,bt,btr,noHead){const g=hgrid(),[R,P]=hpen(g),p=armP(at,tr),plate=at==='plate',f=ARM32X[at][tr];
  const bm=bt==='greaves'?armP('plate',btr):bt==='shoes'?armP('leather',btr):bt==='treads'?armP('robe',btr):{m:'#4a3324',d:'#2a1c12',h:'#6e4528'};
  const pm=bt==='greaves'?armP('plate',btr):bt==='shoes'?armP('leather',btr):bt==='treads'?armP('robe',btr):plate?p:at==='leather'?{m:'#5a3a22',d:'#3a2416',h:'#7a5232'}:{m:'#4a4560',d:'#2e2a40',h:'#6e6680'};
  if(at!=='robe'){R(10,27,12,2,pm.m);R(10,29,5,6,pm.m);R(17,29,5,6,pm.m);R(13,29,2,6,pm.d);R(20,29,2,6,pm.d);R(10,29,1,6,pm.h);R(17,29,1,6,pm.h);R(15,27,2,2,pm.d);
    if(bt&&bt!=='shoes'){R(10,33,5,2,bm.m);R(17,33,5,2,bm.m);R(10,33,5,1,bm.h);R(17,33,5,1,bm.h);}
    if(bt==='greaves'){R(10,30,5,5,bm.m);R(17,30,5,5,bm.m);R(10,30,5,1,bm.h);R(17,30,5,1,bm.h);R(13,31,2,4,bm.d);R(20,31,2,4,bm.d);}
    else if(plate){R(10,31,5,2,p.m);R(17,31,5,2,p.m);R(10,31,5,1,p.h);R(17,31,5,1,p.h);}}
  R(9,35,6,4,bm.m);R(9,35,6,1,bm.h);R(17,35,7,4,bm.m);R(17,35,7,1,bm.h);R(22,37,2,2,bm.m);R(9,38,6,1,bm.d);R(17,38,7,1,bm.d);
  if(bt==='treads'){R(9,36,6,1,bm.d);R(17,36,7,1,bm.d);}
  if(bt)bootX(R,P,bt,btr);
  f(R,P,false);
  mirrorArm(g,(r,q)=>f(r,q,true));const top=ARM32TOP[at][tr];if(top)top(R,P);f(R,P,true);headOr(R,P,noHead);if(at==='robe'&&tr===1)scarf32(R);return g;}
// gear icons: the piece as it looks on the hero, without skin, centered at the same size as other icons
function iconGrid(sl,ty,tr){const cut=(g,a,b)=>{for(let y=0;y<HH;y++)if(y<a||y>=b)g[y].fill(null);return g;};
  const fill=(g,c)=>{for(const row of g){const a=row.findIndex(Boolean),b=row.length-1-[...row].reverse().findIndex(Boolean);if(a>=0)for(let x=a;x<=b;x++)if(!row[x])row[x]=c;}return g;};
  if(sl==='helm')return ty==='hood'?fill(hat32(ty,tr),armP('robe',tr).d):hat32(ty,tr);
  // boots: the two feet side by side, shown larger
  if(sl==='boots'){const g=cut(body32('none',0,ty,tr),ty==='greaves'?29:33,HH);for(const row of g){for(let x=15;x>=1;x--)row[x]=row[x-1];}return g;}
  const f=ARM32X[ty]&&ARM32X[ty][tr];if(!f)return cut(body32(ty,tr,null,0),14,27);
  const g=hgrid(),[R,P]=hpen(g);f(R,P,false);mirrorArm(g,(r,q)=>f(r,q,true));const top=ARM32TOP[ty][tr];if(top)top(R,P);f(R,P,true);if(ty==='robe'&&tr===1)scarf32(R);return g;}
function gearIcon(sl,ty,tr,s){const key='aic'+sl+ty+tr;let c=SC[key];if(!c){const g=iconGrid(sl,ty,tr);let t=HH,b=0,l=HW,r=0;
    for(let y=0;y<HH;y++)for(let x=0;x<HW;x++){if(g[y][x]===SKIN.s||g[y][x]===SKIN.S)g[y][x]=null;if(g[y][x]){t=Math.min(t,y);b=Math.max(b,y);l=Math.min(l,x);r=Math.max(r,x);}}
    c=document.createElement('canvas');c.width=32;c.height=32;const x=c.getContext&&c.getContext('2d');const k=sl==='boots'?2:1,o=gcanvas(g);if(x){x.imageSmoothingEnabled=false;x.drawImage(o,Math.round((32-(r-l+1)*k)/2)-(l+1)*k,Math.round((32-(b-t+1)*k)/2)-(t+1)*k,o.width*k,o.height*k);}SC[key]=c;}
  return '<img class="spr" src="'+canvasURL(key,c)+'" width="'+16*s+'" height="'+16*s+'" alt="">';}
const ARMN={plate:['Scrap Plate','Iron Plate','Obsidian Plate','Bone Plate','Abyssal Plate'],leather:['Patched Hide','Nomad Leathers','Ashhide','Gravehide','Sharkskin'],robe:['Ragweave Robe','Sandwrap Robe','Cinder Robe','Funeral Robe','Tidecaller Robe'],
  helm:['Scrap Bucket','Iron Helm','Obsidian Helm','Skull Helm','Abyssal Helm'],cap:['Patched Cap','Nomad Turban','Ash Cap','Grave Cap','Shark Cap'],hood:['Ragweave Hood','Sandwrap Hood','Cinder Hood','Funeral Hood','Tidecaller Hood'],
  greaves:['Scrap Greaves','Iron Greaves','Obsidian Greaves','Bone Greaves','Abyssal Greaves'],shoes:['Patched Boots','Nomad Boots','Ash Boots','Grave Boots','Shark Boots'],treads:['Ragweave Wraps','Sandwrap Sandals','Cinder Slippers','Funeral Slippers','Tidecaller Slippers']};
`;
function art(h){
  h=P(h,"x.drawImage(hcv('bd'+P.at+P.atr+P.bt+P.btr,()=>body32(P.at,P.atr,P.bt,P.btr)),6,6);","x.drawImage(hcv('bd'+P.at+P.atr+P.bt+P.btr+(P.hm==='helm'?'nh':''),()=>body32(P.at,P.atr,P.bt,P.btr,P.hm==='helm')),6,6);");
  h=P(h,"  if(bt==='treads'){R(9,36,6,1,bm.d);R(17,36,7,1,bm.d);}\n","  if(bt==='treads'){R(9,36,6,1,bm.d);R(17,36,7,1,bm.d);}\n  if(bt)bootX(R,P,bt,btr);\n");
  h=P(h,"  if(btr===4&&bt){for(const x0 of [9,17]){P(x0-1,35,bm.h);P(x0-2,34,bm.h);P(x0-3,33,bm.g||'#c4ecff');}}\n","");
  h=P(h,"function hat32(type,tr){const g=hgrid(),[R,P]=hpen(g);\n","function hat32(type,tr){const g=hgrid(),[R,P]=hpen(g);\n  if(HAT32X[type]&&HAT32X[type][tr]){HAT32X[type][tr](R,P,armP(type==='helm'?'plate':type==='cap'?'leather':'robe',tr));return g;}\n");
  h=P(h,"function body32(at,tr,bt,btr){const g=hgrid(),",CODE+"function body32(at,tr,bt,btr,noHead){if(ARM32X[at]&&ARM32X[at][tr])return bodyX(at,tr,bt,btr,noHead);const g=hgrid(),");
  // icons drawn from the new art
  h=P(h,"const itemImg=(it,s=3)=>{if(it.slot==='gem'){","const itemImg=(it,s=3)=>{if(['armor','helm','boots'].includes(it.slot)&&TYPES[it.slot][it.type])return gearIcon(it.slot,it.type,it.tier||0,s);if(it.slot==='gem'){");
  h=P(h,":sprImg(base,2,'',gearPal({type:k,tier})||(m?m[1]:undefined));",":sl==='cloak'?sprImg(base,2,'',gearPal({type:k,tier})||(m?m[1]:undefined)):gearIcon(sl,k,tier,2);");
  // tunics and bare bodies: mirrored arm, no separate far shoulder, face in front
  h=P(h,"  else if(lea){R(6,14,7,5,p.m);R(6,14,7,1,p.h);R(6,18,7,1,p.d);R(7,15,1,3,p.h);if(tr===1){P(8,16,p.a);P(11,16,p.a);}if(tr===2){R(7,12,1,2,p.a);R(10,11,1,3,p.a);}if(tr===3){R(6,16,7,1,p.d);P(9,15,p.g);}}\n  else{R(7,15,5,6,p.m);R(7,15,5,1,robe&&tr>=1?p.a:p.h);R(7,20,5,1,p.d);if(robe&&tr===2){R(5,13,8,3,p.d);for(const x of [5,8,11])R(x,11,1,2,p.a);}if(robe&&tr===3){P(5,13,p.g);P(4,11,p.g);}}\n","");
  h=P(h,"P(15,20,pearl);R(6,13,7,1,p.g);for(const x of [7,10])R(x,10,1,3,p.h);}","P(15,20,pearl);}");
  h=P(h,"  head32(R,P);\n  if(lea&&tr===1){R(10,14,12,2,p.f);R(11,14,10,1,'#ffffff');}\n  // front arm and fist\n","  const arm=(R,P)=>{\n");
  h=P(h,"if(tr===2){P(26,21,p.a);P(27,21,p.a);}}}\n  return g;}","if(tr===2){P(26,21,p.a);P(27,21,p.a);}}}};\n  mirrorArm(g,arm);arm(R,P);headOr(R,P,noHead);if(lea&&tr===1){R(10,14,12,2,p.f);R(11,14,10,1,'#ffffff');}\n  return g;}");
  // names: Scrap and Iron tiers, each chest piece has its own name, old saves pick them up
  h=P(h,"const TIERN=['Iron','Steel','Obsidian','Hollow','Abyssal'];","const TIERN=['Scrap','Iron','Obsidian','Hollow','Abyssal'];");
  h=P(h,"steel:'Steel Fragment'","steel:'Iron Fragment'");
  h=P(h,"0:{n:'Iron set'","0:{n:'Scrap set'");
  h=P(h,"1:{n:'Steel set'","1:{n:'Iron set'");
  h=P(h,"if(it.uq&&UNIQ[it.uq])return rf+UNIQ[it.uq].n;","if(it.uq&&UNIQ[it.uq])return rf+UNIQ[it.uq].n;if(ARMN[it.type])return ARMN[it.type][it.tier||0];");
  h=P(h,"prev.name=`${sp.al?ALLOYS[sp.al].n:TIERN[prev.tier]} ${TYPES[prev.slot][prev.type].n}`;","prev.name=itemName(prev);");
  // forge: armor sets in columns, each going helm, chest, boots, cloak
  h=P(h,"[['armor',AT],['helm',HT],['boots',BT],['cloak',CT]].map(([sl,T])=>Object.entries(T).map(([k,X])=>tpB(sl,k,X.n)).join('')).join('')","[['helm','armor','greaves','mantle'],['cap','leather','shoes','cape'],['hood','robe','treads','shroud']].map(([a,b,c,d])=>[['helm',a],['armor',b==='armor'?'plate':b],['boots',c],['cloak',d]].map(([sl,k])=>tpB(sl,k,ARMN[k]?ARMN[k][tier]:TYPES[sl][k].n)).join('')).join('')");
  h=P(h,"${step(3,'What to make')}<div class=\"picks\">${types}</div>","${step(3,'What to make')}<div class=\"picks ${cat==='armor'?'sets':''}\">${types}</div>");
  h=P(h,".picks{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px}",".picks{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px}.picks.sets{grid-auto-flow:column;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(4,auto)}@media(max-width:560px){.picks.sets .pick{flex-direction:column;gap:3px;padding:6px 2px;text-align:center}.picks.sets .pick span{font-size:.72rem;align-items:center}}");
  h=P(h,"migrateRf(s);fixGems(s);","migrateRf(s);fixGems(s);renameGear(s);");
  h=P(h,"function fixGems(s){","function renameGear(s){for(const it of [...Object.values(s.gear||{}).filter(Boolean),...(s.bag||[])])if(it.slot!=='gem'&&!it.uq&&TYPES[it.slot]&&TYPES[it.slot][it.type])it.name=itemName(it);}\nfunction fixGems(s){");
  return h;}
module.exports={art};
