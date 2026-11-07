// Admin item giver: quality, supplements, enchants (normal or Greater) and an alloy.
const {P}=require('./mech.js');
const APPLY="if(sl!=='gem'){const qi=Math.max(0,Math.min(QUAL.length-1,anum('a_q',1)));it.q=QUAL[qi][1];it.qn=QUAL[qi][0];"+
"for(const id of ['a_sup1','a_sup2']){const s=aval(id,''),X=SUP[s];if(!X)continue;if(X.aff)for(const k in X.aff){const v=supVal(k,X.aff[k],it.tier||0);const ex=it.affixes.find(a=>a.id===k&&!a.al);if(ex)ex.v+=v;else it.affixes.push({id:k,v});}"+
"if(s==='titanheart'){const hv=1000*((it.tier||0)+1),ex=it.affixes.find(a=>a.id==='hp'&&!a.al);if(ex)ex.v+=hv;else it.affixes.push({id:'hp',v:hv});}if(X.fx&&!(it.fx||[]).includes(X.fx))it.fx=[...(it.fx||[]),X.fx];}"+
"const g=aval('a_eg','no')==='yes',en=[];for(const id of ['a_en1','a_en2']){const e=aval(id,'');if(ENCH[e]&&!en.some(x=>x.id===e))en.push({id:e,g});}if(en.length)it.ench=en;"+
"const al=aval('a_al',''),A=ALLOYS[al];if(A&&sl==='weapon'){it.al=al;if(A.aff)for(const k in A.aff)it.affixes.push({id:k,v:supVal(k,A.aff[k],it.tier||0),al:1});if(A.fx&&!(it.fx||[]).includes(A.fx))it.fx=[...(it.fx||[]),A.fx];}}";
function give(h){
  h=P(h,"it.rf=rf==='none'?null:rf==='rand'?rollRf(sl):rf;it.rfv=1;it.name=itemName(it);}","it.rf=rf==='none'?null:rf==='rand'?rollRf(sl):rf;it.rfv=1;"+APPLY+"it.name=itemName(it);}");
  h=P(h,"      <div class=\"optrow\"><b>Temper</b>${sel('a_plus',",
"      <div class=\"optrow\"><b>Quality</b>${sel('a_q',QUAL.map((q,i)=>[String(i),q[0]]),'1')}<b>Alloy</b>${sel('a_al',[['','None'],...Object.entries(ALLOYS).map(([k,A])=>[k,A.n])],'')}<span class=\"dim small\">Alloys only go on weapons.</span></div>\n"+
"      <div class=\"optrow\"><b>Supplements</b>${['a_sup1','a_sup2'].map(id=>sel(id,[['','None'],...Object.keys(SUP).map(k=>[k,(MATS[k]||k)+': '+(SUP[k].d||Object.entries(SUP[k].aff||{}).map(([a,v])=>'+'+a+' '+v).join(', '))])],'')).join('')}</div>\n"+
"      <div class=\"optrow\"><b>Enchants</b>${['a_en1','a_en2'].map(id=>sel(id,[['','None'],...Object.entries(ENCH).map(([k,E])=>[k,E.n+' ('+(E.slots.includes('weapon')?'weapon':'armor')+')'])],'')).join('')}${sel('a_eg',[['no','Normal'],['yes','Greater (+50%)']],'no')}</div>\n"+
"      <div class=\"optrow\"><b>Temper</b>${sel('a_plus',");
  return h;}
module.exports={give};
