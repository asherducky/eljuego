# Supabase setup for El Juego

1. Create a project at https://supabase.com (the free tier is fine).
2. **SQL Editor → New query**: paste `schema.sql`, then Run (cloud saves). Do the same with `spire.sql` (Spire leaderboard), then `social.sql` (gold leaderboard + global chat), then `pvp.sql` (PvP arena).
3. **Authentication → URL Configuration**:
   - Site URL: `https://rpgjuego.netlify.app` (main site; `rpgjuego.pages.dev` is a mirror)
   - Redirect URLs: add `https://rpgjuego.netlify.app/**`, `https://rpgjuego.pages.dev/**` and `http://localhost:5173/**`
4. **Project Settings → API**: copy the **Project URL** and the **anon / publishable** key into `SUPA` near the top of the online section in `ashen-reach.html`:
   ```js
   const SUPA={url:'https://YOUR-PROJECT.supabase.co',key:'YOUR-ANON-KEY'};
   ```
   The anon key is meant to be public. **Never** put the `service_role` key in the game or in this repo.
5. Run `node build.js`, commit and push. Cloudflare Pages redeploys on its own.
6. **Username + password accounts:** the game turns a username into `name@rpgjuego.pages.dev` behind the scenes, and no mail is ever sent there. So in **Authentication → Sign In / Providers → Email**, turn **off "Confirm email"**. Otherwise new accounts wait for a confirmation email that can never arrive.
