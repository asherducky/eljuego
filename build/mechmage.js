// Mage identities: Pyromancer builds and detonates burn and pays HP for power, Cryomancer controls and shields. Shield and spike visuals, a tree shape per mage.
const {P}=require('./mech.js');
const LAYOUT=`/* each mage's tree has its own shape: a flame, a snowflake, a lightning bolt */
const LAYOUT={fire:{r1:[35,95],r2:[50,90],r3:[65,95],s1:[9,85],s2:[24,79],p1:[41,75],s3:[59,75],s4:[76,79],s5:[91,85],e1:[32,63],e2:[68,63],a1:[12,57],a2:[37,50],a3:[63,50],a4:[88,57],a5:[10,43],c1:[41,38],c2:[59,38],a6:[90,43],m1:[21,28],m2:[35,21],m3:[65,21],m4:[79,28],u:[50,14],k1:[37,6],k2:[63,6]},
  frost:{r1:[20,94],r2:[50,88],r3:[80,94],s1:[8,83],s2:[26,76],p1:[42,74],s3:[58,74],s4:[74,76],s5:[92,83],e1:[30,60],e2:[70,60],a1:[8,52],a2:[24,46],a3:[76,46],a4:[92,52],a5:[16,37],c1:[42,40],c2:[58,40],a6:[84,37],m1:[8,24],m2:[28,18],m3:[72,18],m4:[92,24],u:[50,25],k1:[30,7],k2:[70,7]},
  storm:{r1:[12,94],r2:[36,90],r3:[60,94],s1:[6,81],s2:[22,76],p1:[38,74],s3:[54,76],s4:[72,80],s5:[88,84],e1:[28,62],e2:[62,62],a1:[10,52],a2:[36,50],a3:[60,47],a4:[86,54],a5:[22,40],c1:[46,37],c2:[64,35],a6:[90,42],m1:[12,27],m2:[34,21],m3:[60,25],m4:[84,19],u:[46,13],k1:[24,6],k2:[68,6]}};
`;
const SKILLS=`/* Overheat: pay HP, and the next spell hits harder and burns more */
let heatS=0;const heatMul=()=>rv('overheat',[1.25,1.35,1.5]);
SK.overheat={n:'Overheat',mp:4,bolt:['#fff1a8','#e2782a','#c43c3c'],get d(){return rv('overheat',['Pay 10% HP: your next spell deals +25% and adds 2 more flame stacks','Pay 10% HP: your next spell deals +35% and adds 2 more flame stacks','Pay 10% HP: your next spell deals +50% and adds 2 more flame stacks']);},use:(e,d)=>{const p=Math.round(d.maxHp*.1);S.hp=Math.max(1,S.hp-p);C().ps.overheat=1;log(\`You burn \${p} HP. Your next spell is searing.\`,'buff');}};
CD.overheat=3;SKFAM.overheat='fire';
`;
const FX=`
  gspike:e=>{const f=sprEl(elFor(e.t));if(!f)return;const B=ctr(f),b=B.r.bottom,H=B.r.height*1.3,W=Math.max(40,B.r.width*.42);sfx('frost');crackFx(B.x-80,B.x+80,b-2,560);
    const spike=(x,h,w,g)=>{const top=h*g;for(let j=0;j<top;j+=GP){const wd=Math.max(GP,w*(1-j/h)),y=b-j;pline(x-wd/2,y,x,y,j%(GU*6)<GU?'#ffffff':'#c4ecff',GP);pline(x,y,x+wd/2,y,'#3a5ea8',GP);pp(x-GP,y,'#ffffff');}};
    fxo(640,t=>{const g=t<.3?t/.3:t>.78?(1-t)/.22:1;spike(B.x-W*.8,H*.42,W*.5,g);spike(B.x+W*.8,H*.5,W*.55,g);spike(B.x,H,W,g);});
    setTimeout(()=>{burst(B.x,b-B.r.height*.4,{n:36,col:['#c4ecff','#ffffff','#6fb7e8'],spd:6,up:2,grav:.18,life:30});shake(8);},TS(190));},
  iceshield:e=>{const h=heroEl();if(!h)return;const A=ctr(h),b=A.r.bottom;sfx('frost');const R0=A.r.width*.36;fxo(520,t=>{const g=Math.min(1,t*2.2),fade=t>.8?1-(t-.8)/.2:1;for(let k=0;k<6;k++){const a=k/6*6.283+t*.6,x=A.x+Math.cos(a)*R0,hg=(26+(k%2)*18)*g*fade,base=b-8+Math.sin(a)*12;for(let j=0;j<hg;j+=GP){const wd=Math.max(GP,10*(1-j/hg));pline(x-wd/2,base-j,x,base-j,'#c4ecff',GP);pline(x,base-j,x+wd/2,base-j,'#3a5ea8',GP);}}});setTimeout(()=>ringFx(A.x,A.y,6,A.r.width*.5,['#c4ecff','#ffffff'],300),TS(180));},
  overheat:e=>{const h=heroEl();if(!h)return;const A=ctr(h);sfx('fire');flash('#c43c3c',120);firePillar(A);burst(A.x,A.y,{n:26,col:['#fff1a8','#e2782a','#c43c3c'],spd:5,up:3,grav:.1,life:28});},
  shhit:e=>{const h=heroEl();if(!h)return;const A=ctr(h),c=shieldCols();burst(A.x+A.r.width*.2,A.y,{n:12,col:c,spd:5,life:16});ringFx(A.x,A.y,A.r.width*.3,A.r.width*.5,c,200);},`;
const AURA=`/* a shield you can see: a pixel ring around the hero, in your class's colors */
const shieldCols=()=>({frost:['#9cc8ff','#ffffff'],fire:['#e2782a','#fff1a8'],storm:['#f2c14e','#fff1a8'],heavy:['#c9c2d6','#f4efe4']})[wepFam()]||['#c9c2d6','#ffffff'];
function shieldAura(c,hold){const cols=shieldCols(),rx=c.r.width*.36,ry=c.r.height*.5,frost=wepFam()==='frost';hold(()=>{const now=performance.now(),n=44;for(let k=0;k<n;k++){if((k+Math.floor(now/90))%4===3)continue;const a=k/n*6.283;pp(c.x+Math.cos(a)*rx,c.y+Math.sin(a)*ry,k%2?cols[0]:cols[1],GU);}
    if(frost)for(let k=0;k<6;k++){const a=k/6*6.283+now/1400,x=c.x+Math.cos(a)*rx,y=c.y+Math.sin(a)*ry;pline(x,y-GU*3,x,y+GU*3,'#ffffff',GP);pline(x-GU*2,y,x+GU*2,y,'#c4ecff',GP);}});}
`;
function mage(h){
  // tree shapes
  h=P(h,"function mkTree(sg,paths,b2,b3,slots){const M=CTREE.medium,id={},nodes={},pos={};for(const s in slots){const [i,X]=slots[s];id[LS[s]]=i;nodes[i]=X;pos[i]=M.pos[LS[s]];}",LAYOUT+"function mkTree(sg,paths,b2,b3,slots,lay){const M=CTREE.medium,id={},nodes={},pos={};for(const s in slots){const [i,X]=slots[s];id[LS[s]]=i;nodes[i]=X;pos[i]=lay&&lay[s]||M.pos[LS[s]];}");
  h=P(h,"k2:['phoenix',KY('cp','Phoenix','Once per fight, a lethal hit leaves you at 30% HP')]});","k2:['phoenix',KY('cp','Phoenix','Once per fight, a lethal hit leaves you at 30% HP')]},LAYOUT.fire);");
  h=P(h,"k2:['glasscannon',KY('cp','Shrapnel','Shatter also hits every other enemy for half')]});","k2:['glasscannon',KY('cp','Shrapnel','Shatter also hits every other enemy for half')]},LAYOUT.frost);");
  h=P(h,"k2:['superconductor',KY('cp','Superconductor','Shock also spreads to a second enemy')]});","k2:['superconductor',KY('cp','Superconductor','Shock also spreads to a second enemy')]},LAYOUT.storm);");
  // Pyromancer: build, detonate, pay HP for power
  h=P(h,"r3:['emberward',SKN()],p1:['kindling'","r3:['overheat',SKN()],p1:['kindling'");
  h=P(h,"get d(){return rv('firebolt',['140% fire + 1 flame stack','165% fire + 1 flame stack','190% fire + 1 flame stack']);},use:e=>{hit(e,rv('firebolt',[1.4,1.65,1.9]),{el:'fire'});if(e.hp>0)burn(e,1);}","get d(){return rv('firebolt',['110% fire + 2 flame stacks','125% fire + 2 flame stacks','140% fire + 2 flame stacks']);},use:e=>{hit(e,rv('firebolt',[1.1,1.25,1.4]),{el:'fire'});if(e.hp>0)burn(e,2);}");
  h=P(h,"get d(){return rv('flamewave',['70% fire to all + 1 flame stack each','85% fire to all + 1 flame stack each','100% fire to all + 1 flame stack each']);},use:()=>alive().forEach(x=>{hit(x,rv('flamewave',[.7,.85,1]),{el:'fire'});if(x.hp>0)burn(x,1);})","get d(){return rv('flamewave',['40% fire to all + 2 flame stacks each','50% fire to all + 2 flame stacks each','60% fire to all + 2 flame stacks each']);},use:()=>alive().forEach(x=>{hit(x,rv('flamewave',[.4,.5,.6]),{el:'fire'});if(x.hp>0)burn(x,2);})");
  h=P(h,"SK.frostlance={...SK.frostlance,",SKILLS+"SK.frostlance={...SK.frostlance,");
  // big single hits come down, so Pyromancer still has to build up
  h=P(h,"['180% fire + 3 flame stacks','210% fire + 3 flame stacks','240% fire + 3 flame stacks']);},use:e=>{hit(e,rv('immolate',[1.8,2.1,2.4])","['130% fire + 3 flame stacks','150% fire + 3 flame stacks','170% fire + 3 flame stacks']);},use:e=>{hit(e,rv('immolate',[1.3,1.5,1.7])");
  h=P(h,"['Detonate flame stacks: 80% + 50% per stack','Detonate flame stacks: 80% + 60% per stack','Detonate flame stacks: 80% + 70% per stack']","['Detonate flame stacks: 80% + 30% per stack','Detonate flame stacks: 80% + 35% per stack','Detonate flame stacks: 80% + 40% per stack']");
  h=P(h,"hit(e,(.8+rv('kindle',[.5,.6,.7])*s)","hit(e,(.8+rv('kindle',[.3,.35,.4])*s)");
  h=P(h,"function burn(e,s){const d=derive();","function burn(e,s){s+=heatS;heatS=0;const d=derive();");
  h=P(h,"p:Math.max(1,Math.round(d.atk*.15*(1+.1*trk('heat')","p:Math.max(1,Math.round(d.atk*.25*(1+.1*trk('heat')");
  h=P(h,"skM=skMult(v);log(","const oh=v!=='overheat'&&C().ps.overheat;skM=skMult(v)*(oh?heatMul():1);heatS=oh?2:0;if(oh)delete C().ps.overheat;log(");
  h=P(h,"perform(SKFX[v]||{},e,()=>s.use(e,d));skM=1;","perform(SKFX[v]||{},e,()=>s.use(e,d));skM=1;heatS=0;");
  h=P(h,"a3:['wardfire',PA('Wardfire','Shields 10% stronger','Shields 20% stronger','Shields 30% stronger')]","a3:['wardfire',PA('Cinder Feast','Killing a burning enemy heals 5% max HP','Killing a burning enemy heals 10% max HP','Killing a burning enemy heals 15% max HP')]");
  h=P(h,"(1+.1*(trk('wardfire')+trk('iceskin')))","(1+.1*trk('iceskin'))");
  h=P(h,"let hp=0,mp=0;if(trk('secondwind'))hp+=.05;","let hp=0,mp=0;if(trk('wardfire')&&e.st.burn)hp+=.05*trk('wardfire');if(trk('secondwind'))hp+=.05;");
  h=P(h,"staticward:'Static',","staticward:'Static',overheat:'Overheat',");
  h=P(h,"emberward:'st_burn',ward:'st_shield'","emberward:'st_burn',overheat:'st_burn',ward:'st_shield'");
  h=P(h,"const STDESC={mark:","const STDESC={overheat:'Overheat: your next spell hits harder and burns more',mark:");
  // old Ember Ward ranks become Overheat ranks
  h=P(h,"if((s.treeV||0)<2){s.treeV=2;","if(s.tree&&s.tree.emberward){s.tree.overheat=s.tree.emberward;delete s.tree.emberward;}if(s.skills&&s.skills.emberward){s.skills.overheat=s.skills.emberward;delete s.skills.emberward;}if(s.equip)s.equip=s.equip.map(k=>k==='emberward'?'overheat':k);if((s.treeV||0)<2){s.treeV=2;");
  // Cryomancer: control and shields
  h=P(h,"get d(){return rv('frostlance',['130% frost + 1 Chill','155% frost + 1 Chill','180% frost + 1 Chill']);},use:e=>{hit(e,rv('frostlance',[1.3,1.55,1.8]),{el:'frost'});if(e.hp>0)chill(e,1);}","get d(){return rv('frostlance',['110% frost + 2 Chill','130% frost + 2 Chill','150% frost + 2 Chill']);},use:e=>{hit(e,rv('frostlance',[1.1,1.3,1.5]),{el:'frost'});if(e.hp>0)chill(e,2);}");
  h=P(h,"get d(){return rv('blizzard',['70% frost to all + 1 Chill each','85% frost to all + 1 Chill each','100% frost to all + 1 Chill each']);},use:()=>alive().forEach(x=>{hit(x,rv('blizzard',[.7,.85,1]),{el:'frost'});if(x.hp>0)chill(x,1);","get d(){return rv('blizzard',['45% frost to all + 2 Chill each','55% frost to all + 2 Chill each','65% frost to all + 2 Chill each']);},use:()=>alive().forEach(x=>{hit(x,rv('blizzard',[.45,.55,.65]),{el:'frost'});if(x.hp>0)chill(x,2);");
  h=h.split('Each Chill stack lowers enemy damage 10%').join('Each Chill stack lowers enemy damage 15%');
  h=P(h,"hasP('bite')?1-.1*e.st.chill.s:1;","hasP('bite')?1-.15*e.st.chill.s:1;");
  h=P(h,"['Shield of 25% max HP','Shield of 30% max HP','Shield of 35% max HP']);},use:(e,d)=>shield(d.maxHp*rv('icebarrier',[.25,.3,.35]))","['Shield of 30% max HP','Shield of 35% max HP','Shield of 40% max HP']);},use:(e,d)=>shield(d.maxHp*rv('icebarrier',[.3,.35,.4]))");
  // Rogue: slower Bleed stacking, so a pop takes a few turns of work
  h=h.split("if(e.st.bleed&&(e.hp>0||C().ctx==='duel'))bleed(e,0);}").join("if(k%2===1&&e.st.bleed&&(e.hp>0||C().ctx==='duel'))bleed(e,0);}");
  h=P(h,"On a bleeding enemy: 4 cuts of 30%, each adds a stack, and the Bleed lasts 1 turn longer","On a bleeding enemy: 4 cuts of 30%, every other cut adds a stack, and the Bleed lasts 1 turn longer");
  h=P(h,"4 cuts of 30%, each adding a Bleed stack,","4 cuts of 30%, every other cut adding a Bleed stack,");
  h=P(h,"s:(cur?cur.s||0:0)+(ctPts('light')>=15?2:1)}","s:(cur?cur.s||0:0)+(ctPts('light')>=15&&chance(50)?2:1)}");
  h=P(h,"Serrated Wounds: every bleed adds 2 stacks instead of 1.","Serrated Wounds: every bleed has a 50% chance to add a second stack.");
  // Hollow King: a big hit can't skip his knight; he stops at half HP and calls it right away
  h=P(h,"if(e.id==='hking'&&!e.summoned&&e.hp<e.max/2){e.summoned=true;for(let k=0;k<1;k++){const n=mkEnemy('knight',Math.max(1,e.L-5));n.called=true;c.enemies.push(n);}log('The Hollow King calls a knight to his side! He takes half damage while it stands.','boss');fx('enrage',{t:i});fxAt+=300;}","if(e.id==='hking'&&!e.summoned&&e.hp<e.max/2)kingCalls(e,c,i);");
  h=P(h,"let dmg=base*elMult(e,el);if(crit)dmg*=d.critd;dmg=Math.max(1,Math.round(dmg));","let dmg=base*elMult(e,el);if(crit)dmg*=d.critd;dmg=Math.max(1,Math.round(dmg));if(e.id==='hking'&&!e.summoned&&bossMech(c,e)&&e.hp-dmg<e.max/2){dmg=Math.max(1,e.hp-Math.ceil(e.max/2));kingCalls(e,c,c.enemies.indexOf(e));}");
  h=P(h,"function hit(e,mult,o={}){","function kingCalls(e,c,i){e.summoned=true;const n=mkEnemy('knight',Math.max(1,e.L-5));n.called=true;n.hp=n.max=Math.round(n.max*2);c.enemies.push(n);log('The Hollow King calls a knight to his side! He takes half damage while it stands.','boss');fx('enrage',{t:i});fxAt+=300;} function hit(e,mult,o={}){");
  // the King himself isn't weak to fire, though his court is
  h=P(h,"if(MOB[id]){MOB[id].weak=A.weak;MOB[id].res=A.res;}","if(MOB[id]){MOB[id].weak=A.weak;MOB[id].res=A.res;}MOB.hking.weak=null;");
  // the Hollow King's knight also halves burn, poison and bleed
  h=P(h,"dmg=Math.max(1,Math.round(dmg*elMult(target,elm)));}","dmg=Math.max(1,Math.round(dmg*elMult(target,elm)*(target.id==='hking'&&C().enemies.some(x=>x.id==='knight'&&x.hp>0)?.5:1)));}");
  // visuals
  h=P(h,"const SKFX={","const SKFX={\n  overheat:{fxn:'overheat',dur:300},icebarrier:{fxn:'iceshield',dur:300},");
  h=P(h,"glacial:{ic:1}","glacial:{fxn:'gspike',dur:330}");
  h=P(h,"if(cfg.ic){fx('icicles',{t:ti});fxAt+=820;}","if(cfg.fxn){fx(cfg.fxn,{t:ti});fxAt+=cfg.dur;}\n  else if(cfg.ic){fx('icicles',{t:ti});fxAt+=820;}");
  h=P(h,"const PLAY={","const PLAY={"+FX);
  h=P(h,"function stVisual(el,st){",AURA+"function stVisual(el,st){");
  h=P(h,"const hold=d=>FXO.push({t0:performance.now(),dur:210,draw:d});","const hold=d=>FXO.push({t0:performance.now(),dur:210,draw:d});if(st.shield)shieldAura(c,hold);");
  h=P(h,"c.ps.shield-=a;part-=a;absorbed+=a;","c.ps.shield-=a;part-=a;absorbed+=a;fx('shhit',{});");
  return h;}
module.exports={mage};
