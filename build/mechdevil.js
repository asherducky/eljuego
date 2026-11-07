// Devil encounters: art from the project's devil-art.js, logic from devilcode.txt, admin triggers, new admin passcode.
const fs=require('fs'),path=require('path'),{P}=require('./mech.js');
const ART_FILE=require('path').join(__dirname,'devil-art.js');
const CSS="#devilv{position:fixed;inset:0;background:#000;display:none;flex-direction:column;align-items:center;padding:16px;gap:12px;z-index:9000}#devilv.open{display:flex}#dv-stage{position:relative;flex:1 1 0;min-height:0;width:100%}#dv-stage canvas{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);image-rendering:pixelated;image-rendering:crisp-edges}#dv-speech{flex:none;width:100%;max-width:640px;height:9.5em;cursor:pointer;visibility:hidden;display:flex;flex-direction:column;gap:8px;color:var(--ink)}#dv-speech.show{visibility:visible}#dv-line{margin:0;font-size:clamp(1.05rem,3vw,1.35rem);min-height:2.8em}#dv-more{color:var(--mute);font-size:.85rem;visibility:hidden;align-self:flex-end}#dv-more.show{visibility:visible}#dv-choices{display:none;gap:10px;flex-wrap:wrap}#dv-choices.show{display:flex}#dv-choices button{font:inherit;color:var(--ink);background:#000;border:3px solid #5a2020;padding:10px 18px;cursor:pointer;flex:1;min-width:90px}#dv-choices button:hover{background:#2a0c0c}#dv-choices button:focus-visible{outline:3px solid var(--gold);outline-offset:2px}\n";
function devil(h){
  const art=fs.readFileSync(ART_FILE,'utf8').split('const DEVILS=')[0];
  const code=fs.readFileSync(path.join(__dirname,'devilcode.txt'),'utf8').split('/*ART*/').join(art);
  h=P(h,"img.spr,canvas.scene{",CSS+"img.spr,canvas.scene{");
  h=P(h,"function start(data){",code+"function start(data){");
  h=P(h,"buildChart();render();if(SUPA.url&&SUPA.key)net();","buildChart();render();DEVIL.resume();if(SUPA.url&&SUPA.key)net();");
  // manual wandering only: auto battle never rolls, and the first fight always comes first
  h=P(h,"wander:()=>{const a=AREAS[S.area];if(!S.wins){startCombat([mkEnemy(a.mobs[0],a.lv[0])],'first');return;}","wander:()=>{const a=AREAS[S.area];if(!S.wins){startCombat([mkEnemy(a.mobs[0],a.lv[0])],'first');return;}\n    if(DEVIL.roll())return;");
  // admin: World tab row and passcode
  h=P(h,"const ADMHASH='4425eaef2237f7c88c321256ca551dcf66bc4678bd7c2147a7fbe37d344d9658';","const ADMHASH='6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090';");
  h=P(h,"const ADM={","const ADM={\n  devil:v=>{DEVIL.meet(v);},\n  devilw:()=>{const el=document.getElementById('a_devilw');const n=Math.max(0,Math.floor(+(el&&el.value)||0));S.devils=S.devils||{w:0,seen:{},said:{},bag:[],now:null};S.devils.w=n;toast('Wanders set to '+n);},");
  h=P(h,"<div class=\"optrow\"><b>Best Tower floor</b>","<div class=\"optrow\"><b>Devils</b>${b('devil:hollow','The Hollow')}${b('devil:colossus','The Colossus')}${b('devil:veiled','The Veiled')}</div>\n      <div class=\"optrow\"><b>Wanders since last devil</b>${num('a_devilw',(S.devils&&S.devils.w)||0,80)}${b('devilw','Set')}<span class=\"dim small\">next wander ${DEVIL.chanceNow(((S.devils&&S.devils.w)||0)+1).toFixed(1)}%</span></div>\n      <div class=\"optrow\"><b>Best Tower floor</b>");
  return h;}
module.exports={devil};
