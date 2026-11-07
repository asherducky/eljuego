# How to update El Juego

The game is one big HTML file. It isn't edited directly. It's built from a base file plus a stack of small patch files, so every change is easy to find, undo, or re-apply.

## What's in here

| File | What it is |
|---|---|
| `ashen-reach-F.html` | The base game, from before the patches. Don't edit it. |
| `mech*.js` | The patches. Each one finds exact snippets of the game and replaces them. |
| `mech2.js` | Runs the patches in order. The newest patches are chained at the bottom of `mechdevil7.js`. |
| `mech.js` | Holds `P(html, find, replace)`, the helper every patch uses. It stops the build if `find` doesn't appear exactly once, so a patch can never silently miss. |
| `live.json` | Balance settings the build reads (boss numbers, gear scaling, which feature sets are on). |
| `devil-art.js`, `devil-models.html`, `devil-pose.html`, `ashart*.js`, `devart7.js`, `*.txt` | Art and code that patches pull in. |
| `make.js` | The build script. |

## Build

Run these from the game folder (the one above `build/`):

```bash
node build/make.js
```

This writes `ashen-reach-pact-test.html`, the **test game**. It uses its own save slot, so testing never touches your real save. Open it at `http://localhost:5173/ashen-reach-pact-test.html` with `node serve.js` running.

```bash
node build/make.js --live
```

This also writes `ashen-reach.html` and `site/index.html`, which is what the website serves.

## Publish

```bash
git add ashen-reach.html site/index.html build
git commit -m "What changed"
git push
```

Pushing to `main` deploys **rpgjuego.pages.dev** automatically within a minute or two. Netlify (rpgjuego.netlify.app) is meant to deploy the same way, but it was stuck on the Oct 30 build as of Nov 2026.

## Making a change

1. Create a new patch file, for example `build/mechnewthing.js`:

   ```js
   // One line saying what this patch does.
   const {P}=require('./mech.js');
   function newthing(h){
     h=P(h,"exact text currently in the game","what it should become");
     return h;}
   module.exports={newthing};
   ```

2. Add it to the end of the chain at the bottom of `mechdevil7.js`, just above `return h;}`:

   ```js
   h=require('./mechnewthing.js').newthing(h);
   ```

3. Run `node build/make.js` and test it in the test game.
4. When it works, run `node build/make.js --live`, then commit and push.

**Tips**
- To find the text to replace, search the built `ashen-reach.html`, not the base file. Earlier patches have already changed the base.
- If the build says `no unique match`, your search text either isn't there (often a quote or backslash difference) or appears more than once. Add more surrounding text until it's unique.
- Patches are JavaScript strings holding JavaScript, so watch your escaping. `\n` inside a patch string becomes a real newline in the game.

## Online (Supabase)

The game talks to Supabase with the **publishable** key only, which is safe to have in the page. Never put the `service_role` key in the code.

The SQL files in `supabase/` have all been run once: `schema.sql`, `spire.sql`, `social.sql`, `pvp.sql`, `admin.sql`, `hide-admins.sql`, `bans.sql`. To change who is an admin, edit the `admins` table in the Supabase dashboard.

The admin panel in the game only shows for accounts in that table, and the server enforces admin powers like editing other saves and banning. The passcode is stored only as a hash.
