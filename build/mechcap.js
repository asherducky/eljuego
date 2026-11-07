// Admin switch: no 150 cap on stats.
const {P}=require('./mech.js');
function cap(h){
  h=P(h,"stat:v=>{if(S.pts>0&&(S.stats[v]||0)<150){","stat:v=>{if(S.pts>0&&(S.stats[v]||0)<STATCAP()){");
  h=P(h,"Math.min(150-(S.stats[k]||0),","Math.min(STATCAP()-(S.stats[k]||0),");
  h=P(h,"const admD=()=>","const STATCAP=()=>S&&S.flags&&S.flags.nocap?1e9:150;\nconst admD=()=>");
  h=P(h,"  beast:()=>{admBeast();},","  beast:()=>{admBeast();},\n  nocap:()=>{S.flags.nocap=!S.flags.nocap;},");
  h=P(h,"${b('god',`God mode: ${S.flags.god?'On':'Off'}`,S.flags.god?'tab on':'')}","${b('god',`God mode: ${S.flags.god?'On':'Off'}`,S.flags.god?'tab on':'')}${b('nocap',`No stat cap: ${S.flags.nocap?'On':'Off'}`,S.flags.nocap?'tab on':'')}");
  return h;}
module.exports={cap};
