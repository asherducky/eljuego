// Builds El Juego from source.
//   node build/make.js          -> ashen-reach-pact-test.html only (the test game, its own save slot)
//   node build/make.js --live   -> also ashen-reach.html and site/index.html (what the website serves)
// The base game is ashen-reach-F.html. Every change on top of it is a patch file (mech*.js), applied in order by mech2.js.
const fs = require('fs'), path = require('path');
process.chdir(__dirname);
const ROOT = path.join(__dirname, '..');
const { mech2 } = require('./mech2.js');
const opts = JSON.parse(fs.readFileSync('live.json', 'utf8'))[0].opts;
const g = mech2(fs.readFileSync('ashen-reach-F.html', 'utf8'), opts);
new Function(g.split('<script>').pop().split('</script>')[0]); // throws if the patched game has a syntax error
const key = g.match(/const SAVE='([^']+)'/)[1];
const test = g.replace("const SAVE='" + key + "'", "const SAVE='" + key + "-pact-test'");
fs.writeFileSync(path.join(ROOT, 'ashen-reach-pact-test.html'), test);
console.log('test game written:', test.length, 'bytes');
if (process.argv.includes('--live')) {
  fs.writeFileSync(path.join(ROOT, 'ashen-reach.html'), g);
  console.log('live game written:', g.length, 'bytes, save key', key);
  require(path.join(ROOT, 'build.js'));
}
