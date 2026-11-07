// Admin "Max out": every skill tree maxed, a full Devil-tier Masterwork +5 Mythic armor set, and every weapon maxed.
const {P}=require('./mech.js');
const FN=
"function admSup(it,s){const X=SUP[s];if(!X)return;if(X.aff)for(const k in X.aff){const v=supVal(k,X.aff[k],it.tier||0);const ex=it.affixes.find(a=>a.id===k&&!a.al);if(ex)ex.v+=v;else it.affixes.push({id:k,v});}"+
"if(s==='titanheart'){const hv=1000*((it.tier||0)+1),ex=it.affixes.find(a=>a.id==='hp'&&!a.al);if(ex)ex.v+=hv;else it.affixes.push({id:'hp',v:hv});}if(X.fx&&!(it.fx||[]).includes(X.fx))it.fx=[...(it.fx||[]),X.fx];}\n"+
"function admMaxIt(it,ench,sups){const T=TIERN.length-1;it.tier=T;it.rar=5;it.plus=5;it.q=QUAL[QUAL.length-1][1];it.qn=QUAL[QUAL.length-1][0];it.ench=ench.map(id=>({id,g:true}));for(const s of sups||[])admSup(it,s);it.name=it.uq?UNIQ[it.uq].n:itemName(it);return it;}\n"+
"function admMaxOut(){if(admBusy())return;const T=TIERN.length-1;\n"+
"  const fams=Object.keys(CTREE).filter(f=>f!=='shadow'||(S.devils&&S.devils.shadow));S.tree=S.tree||{};for(const f of fams){const N=CTREE[f].nodes,xs={};for(const id in N){const X=N[id];if(X.x){if(xs[X.x]&&xs[X.x]!==id){delete S.tree[id];continue;}xs[X.x]=xs[X.x]||id;}S.tree[id]=X.max||1;}}\n"+
"  S.admSp=0;const need=-spLeft();if(need>0)S.admSp=need;S.sp=spLeft();recomputeSkills();\n"+
"  const def=Object.keys(SUP).filter(k=>SUP[k].aff&&SUP[k].aff.def).sort((a,b)=>SUP[b].aff.def-SUP[a].aff.def)[0];\n"+
"  const set={armor:'plate',helm:'helm',boots:'greaves',cloak:'mantle'},old=[];for(const sl in set){const it=admMaxIt(mkItem(sl,set[sl],T,5,[]),['bulwark','thorns'],['titanheart',def]);if(S.gear[sl])old.push(S.gear[sl]);S.gear[sl]=it;}\n"+
"  const weps=Object.keys(WT).filter(t=>!WT[t].veil).map(t=>{const it=genItem(T,5,'weapon',5);it.type=t;it.rf=rollRf('weapon');it.rfv=1;return admMaxIt(it,['keen','vampiric']);});\n"+
"  for(const id in UNIQ){const U=UNIQ[id],it=mkUnique(id);const f=TMA[T]/TMA[U.tier||0];for(const a of it.affixes)a.v=Math.round(a.v*f);weps.push(admMaxIt(it,['keen','vampiric']));}\n"+
"  const items=[...old,...weps],room=S.bag.length+items.length;if(room>bagMax())S.bagx=Math.ceil((room-50)/10);const A=S.autoSalv;const was=A&&A.on;if(A)A.on=false;addToBag(items);if(A)A.on=was;\n"+
"  clampVitals();const d=derive();S.hp=d.maxHp;toast('Maxed out: '+fams.length+' skill trees, Devil armor set, '+weps.length+' weapons');}\n";
function max(h){
  h=P(h,"const admD=()=>",FN+"const admD=()=>");
  h=P(h,"const starTotal=()=>S.lvl+S.frags.length+S.chal.length+(S.qst||0);","const starTotal=()=>S.lvl+S.frags.length+S.chal.length+(S.qst||0)+(S.admSp||0);");
  h=P(h,"  beast:()=>{admBeast();},","  beast:()=>{admBeast();},\n  maxout:()=>{admMaxOut();},");
  h=P(h,"${b('heal','Full heal + potions + orb')}","${b('maxout','Max out','primary')}${b('heal','Full heal + potions + orb')}");
  return h;}
module.exports={max};
