// Lighter animation: bag icons are still pictures (worn gear still animates), and frames pause while the tab is hidden.
const {P}=require('./mech.js');
function perf(h){
  h=P(h,"if(!RM)setInterval(()=>{FRI++;for(const im of document.querySelectorAll('img[data-fr]')){const f=FRAMES[im.dataset.fr];if(f)im.src=f[FRI%f.length];}},90);",
"if(!RM)setInterval(()=>{if(document.hidden)return;FRI++;for(const im of document.querySelectorAll('img[data-fr]')){const f=FRAMES[im.dataset.fr];if(!f||f.length<2)continue;const u=f[FRI%f.length];if(im._u!==u){im._u=u;im.src=u;}}},90);");
  h=P(h,"aria-label=\"${esc(it.name)}\">${itemImg(it,3)}${it.isNew","aria-label=\"${esc(it.name)}\">${area?itemImg(it,3):itemImg(it,3).replace(' data-fr=',' data-still=')}${it.isNew");
  return h;}
module.exports={perf};
