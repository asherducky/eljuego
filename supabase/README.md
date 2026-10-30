# Supabase setup for El Juego

1. Create a project at https://supabase.com (the free tier is fine).
2. **SQL Editor → New query**: paste `schema.sql`, then Run (cloud saves). Do the same with `spire.sql` (Spire leaderboard).
3. **Authentication → URL Configuration**:
   - Site URL: `https://rpgjuego.pages.dev`
   - Redirect URLs: add `https://rpgjuego.pages.dev/**` and `http://localhost:5173/**`
4. **Project Settings → API**: copy the **Project URL** and the **anon / publishable** key into `SUPA` near the top of the online section in `ashen-reach.html`:
   ```js
   const SUPA={url:'https://YOUR-PROJECT.supabase.co',key:'YOUR-ANON-KEY'};
   ```
   The anon key is meant to be public. **Never** put the `service_role` key in the game or in this repo.
5. Run `node build.js`, commit and push. Cloudflare Pages redeploys on its own.
