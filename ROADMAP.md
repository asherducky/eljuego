# El Juego (formerly Ashen Reach) — Roadmap

Turn-based browser RPG. Wander regions, beat each region's dungeon to open the next. Builds come from your weapons, two star-chart skill trees (Melee and Magic), gear and stats, with crafting, enchanting and a town hub. It's built so multiplayer can come later.

Live build: https://claude.ai/artifact/UeM1fAad3qqueBTwQZZ1Hd
Source: `ashen-reach.html` (single file, no build step). Local preview: `node serve.js`, then open http://localhost:5173

---

## Done

- **Core loop:** 3 regions, wandering fights, 3-stage dungeons with bosses, unlocking the next region
- **Combat:** targeting, 12 skills across Blade / Arcane / Shadow, burn / poison / bleed / stun / shield / dodge, bosses that enrage at half HP
- **Builds:** 5 stats, the weapon picks the scaling stat, a 4-slot skill loadout, respec
- **Loot:** 5 rarities, random affixes, sockets set by rarity
- **Town:** Inn (Well Rested buff, bounties), Forge (crafting), Market (stock that grows with progress, selling), Sanctum (enchanting, unlocked with a key from the first boss)
- **Effects:** damage numbers, slashes and projectiles, screen shake, boss intros, particles that change by area
- **Saves** in the browser

## Playtest round 1 — rework (done)

Feedback from the first playtest, all built in one pass. Saves from before this are not carried over (new save slot).

- [x] **Classes:** Warrior → Vanguard (heavy: greatsword, greataxe, warhammer), Blademaster (medium: longsword, katana, scimitar), Shade (light: rapier, dagger). Mage → Pyromancer (fire staff), Cryomancer (frost wand), Stormcaller (storm rod). Picked at the start.
- [x] **Own star chart per subclass:** 18 stars each, you only ever see your own. 5 skills, 2 passives and 1 keystone per subclass, plus shared VIT / SPD / LUK / HP / crit / MP stars.
- [x] **30 skills** across the six subclasses, plus **Analyze** for everyone (free action: reveals weakness and resistance, remembered per monster).
- [x] **Orb of Rebirth** (craftable): switch class or subclass, refunding stats and stars.
- [x] **SPD stat:** quick turns (act twice), ambush chance, flee chance, dodge.
- [x] **Elements:** physical, fire, frost, storm, venom. Every monster has a weakness (×1.5) and a resistance (×0.65). Status effects: flame stacks, poison stacks, bleed, chill → freeze, shock, sunder.
- [x] **Weapon scaling grades:** each weapon type has STR / DEX / INT grades (F to SSS); Attack is calculated from your stats.
- [x] **Number curve:** fights start in single digits and grow into the hundreds; enemy power is per level, and XP drops off sharply against lower-level enemies so you can't easily overlevel. Tuned with a bot so each boss falls around its suggested level (5 / 10 / 15).
- [x] **Forge rework:** pick category → type → base material (sets tier) → up to 2 additions (each sets a guaranteed effect, e.g. Warden's Heart = regen). A 3-strike timing minigame sets the quality (Crude → Masterwork). Also Supplies, Temper (+1 to +5) and Reforge (reroll random bonuses).
- [x] **Sanctum enchants** replace sockets: 12 enchants (Solar, Frostbite, Tempest, Venomous, Keen, Vampiric, Verdant, Bulwark, Thorns, Swift, Warding, Fortune). 1 slot, 2 on Epic and Legendary. 10% chance of a Greater enchant (+50%).
- [x] **Darker Sanctum:** eyes open and close slowly in the dark, follow your cursor, and all stare at the altar during a rite. The unlock is a smooth 3-second sequence (key turns, the seal cracks and shatters, the chains fall, the doors open).
- [x] **Tooltips** on hover: items, enemies (stats, next move, weakness), skills, status icons, stars.
- [x] **Side-by-side compare** in the inventory: equipped vs selected, with ▲ / ▼ / = on every stat and scaling grade.
- [x] **Readability:** digits use a clearer pixel font (no more 5 that looks like 6); grade letters use their own font; the stretched hero in the inventory is fixed.

## Round 6 — Art style
Five styles compared in `art-styles-demo.html`. Tried "D" (smooth glowing effects): playtest verdict was that the glow looked worse, so effects stay pure pixel.
- [x] Glow effects removed again. Kept: dash afterimages (flat tint) and damage numbers that pop in.
- [x] Style "B" step 1: 32px hero (shaded, cape ripples), weapons in hand doubled with Scale2x, effects on a finer 2px grid with white-hot arc heads, frayed tails and checkered fireball halos.
- [x] Style "B" step 2, 32px everything:
  - **Cloak slot:** Cape (dodge, speed), Mantle (defense, HP), Shroud (MP, crit). They drop, forge and enchant like other gear. No cloak, no cape on the hero.
  - **Hero shapes:** armor changes the hero's body (plate pauldrons and knee caps, leather strap, robe with sash and long hem). Headgear shows (cap, crested helm, hood). Cloaks ripple behind.
  - **All sprites at 2x:** monsters, icons, status and intent icons go through Scale2x plus a light pass (bright top-left rims, darker bottom-right). Every monster has a second idle frame (breathing, flapping, rippling, swaying, flickering fire, shimmering crystal).
  - **Scenes at 2x:** town, regions, dungeons and the star chart are drawn, then Scale2x'd onto a canvas twice the size.
- [x] Playtest fixes:
  - **Chunky scenes again:** town, regions, dungeons and the star chart are back to chunky pixels. Only the battle backdrop stays 2x.
  - **Armor by tier:** the hero is drawn in code, and armor, helms, boots and cloaks change shape by type AND tier.
    - Steel: gold trim and emblems, layered pauldrons, a feathered cap, a gold-crested helm.
    - Obsidian: spiked pauldrons, glowing seams, scale leather, a horned helm, a crimson robe with sigil.
    - Hollow: bone plate with ribs, a skull pauldron, blue veins, a bone crown, a white robe with a glowing hem.
  - **Smooth animation:** 12-frame loops instead of 2-frame swaps. Cloaks wave like the demo, and monsters sway, flap, ripple and breathe.
  - **Weapon auras instead of sparkle dots:**
    - Fire: a flame coating with rising embers.
    - Frost: ice crystals and cold mist.
    - Storm: crackling arcs.
    - Venom: a green coating with drips.
    - Legendaries: a helix of light in their colour.
    - Hollow weapons: a pale blue helix.
    - These show on the hero and on bag icons.
- [x] Hand-drawn 32px monsters: all 16 redrawn (goblin, bat, Thornling, Rotting Warden, Glass Scorpion, Sand Wraith, Dune Raider, Queen of Shards, Magma Imp, Ash Drake, Obsidian Golem, Ash Knight, Court Wraith, Gargoyle, Hollow King, Ember Tyrant). Idle loops move bodies as one piece, with no side-to-side shear.

## Round 7 — Playtest fixes (done)
- [x] **Gear art:**
  - Wands no longer get stray tier-2 pixels.
  - Swirls take the weapon's element colour and hug the blade.
  - Frost mist stays close to the weapon.
  - Bag icons for armor, helms, boots and cloaks use the same palettes as the hero, so they match per tier.
  - The helm on the hero is the closed helm from its icon.
- [x] **Plain names:**
  - Gear: Tunic, Chestplate, Plated Boots, Light Boots, Cloak.
  - Melee branches: Heavy Weapons, Swords, Daggers.
- [x] **Bag:** 50 slots, +10 slots for coins (up to 100), and empty slots show as a grid.
- [x] **Reforges:**
  - A named stat set (Sharp, Fierce, Wise, Titanic…) replaces the random "of the Ox" bonuses.
  - Its stats scale with rarity and tier, and it shows in the name ("Fierce Hollow Rapier").
  - The Forge's Reforge tab rolls a new one.
- [x] **Enchants:** rolled at the Sanctum with essence, random from the item's pool.
- [x] **Market:** no random gear. Materials are limited to 3 buys each per restock.
- [x] **Combat balance:**
  - Skill cooldowns carry between dungeon floors.
  - Multi-hit skills trigger enchant and on-hit effects once, not every hit.
  - Some multi-hit and all-enemy numbers are lower.
- [x] **Unique spell effects:**
  - Frost Lance: three icicles form above you and launch one by one.
  - Kindle: a pillar of fire.
  - Blizzard: snowfall.
  - Frost Nova: ice spikes.
  - Shatter: an ice block that bursts.
  - Overload: sparks collapse into the target.
- [x] **Star chart:** radial layout, drag to pan, double-tap to light.

## Round 5 — The Hollow Crown, gems, cooldowns (done)

- [x] **New region: The Hollow Crown** (Lv 16–19), a ruined castle at night. Ash Knights (resist physical, raise wards), Court Wraiths (drain, stun), Gargoyles (turn to stone behind big wards). Dungeon: The Hollow Throne. Boss: **the Hollow King** (Lv 20). At half HP he enrages and calls a knight to his side.
- [x] **One tier per region:** Iron (Mossy Hollow), Steel (Glasswind), Obsidian (Cinderfall), **Hollow** (the Crown). Ashen is gone. Hollow gear is bone-white with cold blue veins.
- [x] New materials: Hollow Iron (the Tier 4 metal), Court Shroud, Gargoyle Stone, King's Soul. 4 new alloys: Wraithsteel, Gravestone, Soulsteel, Kingsbane. 3 new Legendaries: Hollow Edict, Sceptre of Ash, Gargoyle Maul.
- [x] **Level cap 25.**
- [x] **Gems replace accessories:** 3 gem slots on your character (the third opens after clearing Cinderfall). 7 gem types (Ruby, Sapphire, Emerald, Topaz, Amethyst, Onyx, Bloodstone) in 5 grades (Chipped to Perfect). Rare drops from Glasswind on, and bosses drop them more often. Fuse 3 of a kind into the next grade at the Forge's Gems tab. Old accessories were turned into gems.
- [x] **Skill cooldowns** on top of MP: a branch's first skill has none, then 1 / 2 / 3 / 4 turns up the branch; shields and stances 3. Shown as CD in the menu.
- [x] **Animated gear:** Hollow weapons' veins crawl, and Legendaries twinkle in their own color (bag, forge and in your hero's hand).
- [x] **New armor icons** (chestplate, jerkin, robe, knight helm, cap, hood, boots, greaves, slippers). Armor changes color by tier, like weapons.
- [x] **Multi-salvage:** Select in the bag, tap items or use All Common / Common + Uncommon / Older tiers, then Salvage. Locked items are never picked.

## Round 4 — Alloy forging (done)

- [x] **Steel Fragments** drop in Glasswind Dunes (mostly Dune Raiders) and are the Tier 2 metal. **Glass Shard** is now an addition: +Attack and a 20% chance to Bleed.
- [x] **Anvil forging:** no menus. Put a piece of your gear on the anvil (it gets melted down and reforged; worn gear is re-equipped), then click materials from your pouch. The first metal sets the tier (Iron / Steel / Obsidian); a reagent that pairs with it makes an **alloy**; up to 2 more materials are additions. Each ingredient's role and the result update live as you click. Materials you can't afford are dimmed; locked and unique items are hidden.
- [x] **14 alloys**, each with its own name, bonus and blade colors: Mossiron, Duskiron, Emberiron, Runeiron, Glasssteel, Silksteel, Venomsteel, Drakesteel, Runesteel, Cinderglass, Tyrantglass, Prismglass, Heartstone, Voidglass. An alloy adds +1 rarity.
- [x] **Discoveries:** a list of alloys found so far; unfound ones show only their base metal.
- [x] **Admin tools** in Settings (hidden behind Show): gold, materials, levels, star points, unlock everything, god mode, win the current fight, give items of any tier and rarity, all Legendaries, discover all alloys.
- [x] Mossy Hollow drops and its boss are capped at Uncommon (the first-win upgrade is Uncommon too). Accessories only drop from Cinderfall Peaks on, about 1 in 12 drops.
- [x] Renamed the Glassbound tier to **Steel**; the hero holds the same weapon art as the icons.

## Round 3 — No classes, two star trees, rarity, weapon art (done)

New save slot: older characters don't carry over.

- [x] **No classes.** Pick a starting weapon (Greatsword, Longsword, Dagger, Ember Staff, Rime Wand, Storm Rod) and equip anything after that.
- [x] **Two star charts, Melee and Magic,** on tabs, with one shared pool of star points (1 per level + boss and challenge fragments).
  - Each chart has three branches (Vanguard / Blademaster / Shade, Pyromancer / Cryomancer / Stormcaller) with 5 skills, 2 passives and a keystone each, plus stat stars that bridge the branches. 35 stars per chart.
  - Your starting weapon lights its branch's first skill.
- [x] **Off-style skills work at 0.5×:** a spell cast with a sword, or a sword skill with a staff. Shown in the menu, the loadout and tooltips.
- [x] **Star sky cleaned up:** the colored nebula blobs are gone, so the stars and lines are easy to read.
- [x] **Rarity by region:** Mossy Hollow drops Common–Uncommon, Glasswind Common–Rare, Cinderfall Uncommon–Rare. Bosses drop Rare to Epic. Forging caps at Epic. "Magic" is renamed "Uncommon".
- [x] **Legendary = uniques only.** 9 named weapons with their own effect, from bosses (30% per kill) and very rarely from certain mobs: Rotwood Maul, Heartroot Staff, Batfang, Mirrorfang, Shardcrown Wand, Dune Reaver, Cinderbrand, Heart of the Caldera, Obsidian Edge.
- [x] **Weapon art changes by tier**, in the bag and in your hero's hand. Iron is plain; Steel adds a bright blade and a gem; Obsidian adds dark serrations; Ashen burns with embers. Uniques glow in their own color.
- [x] Rebalanced: magic weapons hit a bit harder to make up for the lost class stats, and the Ember Tyrant is slightly softer. Bots clear all three bosses with every style.

## Round 2 — First 10 minutes, effects, sound (done)

- [x] **Combat effects:** melee heroes dash to the target (heavy leaps and smashes, medium cuts, light blinks and stabs). Each spell has its own visual: ice lance, fireball, lightning from the sky, chain lightning, meteors, flame and frost waves, freeze, shields. Big skills darken the stage first. Enemies lunge at you, and heavy hits wind up.
- [x] **HP bars drop when the hit lands**, not before. The victory screen waits for the animation to finish.
- [x] **Sound effects** made in code (hits, crits, each element, coins, forge, level-up, stars, Sanctum), with a mute toggle and volume.
- [x] **Settings** (gear icon): animation speed (1× / 1.5× / 2× / 3×), sound, save export / import (.json), new character, achievements (moved here from Character).
- [x] **First 10 minutes:** the first fight is a single easy enemy. Your first win always drops a Rare weapon upgrade with an Equip button on the victory screen. Victory, Level-up and Star banners.
- [x] **Battle clarity:** "Your turn" marker, the menu dims while actions play, enemy intents show predicted damage, and locked actions say why on hover (MP, none left, boss).
- [x] **Analyze** now uses your turn and is learned from the first dungeon boss.
- [x] **No spoilers:** only Explore and Wander until your first win. Locked regions are hidden except the next one ("Defeat ___").
- [x] **Town and stars:** no selection boxes. Hovering a building outlines it in light and shows its name; stars get a ring.
- [x] `node build.js` writes `site/index.html` for Netlify.

## Phase 1 — One consistent pixel look

Goal: it looks like one real pixel-art game. Right now rounded web panels and smooth fonts sit next to pixel sprites, and that clashes.

- [x] **One visual language everywhere**
  - [x] Pixel font for all text (Pixelify Sans: headings, buttons, numbers, body)
  - [x] Square, pixel-framed panels, buttons, tabs and bars with notched corners and hard bevels. No rounded corners, soft shadows or gradients.
  - [x] Pixel icons instead of text labels (status effects, currency, materials, the key)
  - [x] One limited master palette (30 colors), plus accent colors per region
- [x] **Pixel art pipeline:** sprites stored as palette-indexed pixel grids and drawn crisp; particles snap to a 3px grid
- [x] **Hand-made sprites for everything**
  - [x] Hero battle sprite; the equipped weapon and armor type change how it looks
  - [x] 12 monsters, bosses drawn bigger
  - [x] Item icons for every weapon, armor and trinket type, plus material and consumable icons
  - [x] NPCs: Marta (inn), Old Cinder (smith), Coinsworth (market)
- [x] **Pixel scenes:** town street, inn, forge, market, sanctum, sealed door, a background per region, and a dungeon background
- [x] **Battle UI redo**
  - [x] Side-view stage: hero on the left, enemies on the right, over the region's background
  - [x] JRPG command menu (Attack / Skills / Items / Flee) with submenus
  - [x] HP bars under each sprite, status icons instead of text chips
  - [x] Sprite animations: idle bob, attack lunge, hurt flash, death fade
  - [x] Short message box for what just happened; full log behind a toggle
- [ ] **Readability pass**
  - [x] Fix low-contrast text and controls (dim labels, disabled buttons, locked areas, small chips)
  - [x] Bigger tap targets and text on phones (40px buttons, 17px base text)
  - [ ] Important state (HP, target, your turn, cooldowns, new loot) obvious at a glance. Target cursor and low-HP border are done; "new loot" markers come with the inventory rework.
- [ ] **Polish leftovers:** walk/attack animation frames for the hero, more monster idle frames, NPCs reacting (Marta waving, Coinsworth counting)

## Phase 2 — Pacing and onboarding

Goal: stop showing everything at once. Features open up as you play.

- [x] **Progressive reveal:** start with only Explore. Inventory unlocks on the first kill, Character and Stars on the first level-up, Town after 3 wins (or when region 2 opens), Online with Town. The Sanctum still needs the key.
- [x] Each new feature gets a "New" badge on its tab and a short toast, not a wall of text
- [ ] Screens show the essentials first, with details on hover / tap (item stats, skill numbers, recipe costs). Partly done: text cut way down in the trim pass; real tooltips come with the inventory rework.
- [x] Short first-run flow: name your character, pick a class, then straight into Mossy Hollow

## Phase 3 — Classes and the star chart

Goal: a skill tree that feels unique, replacing the current 3-column list.

- [x] **Two classes**, picked at the start, each with its own starting stats and gear:
  - [x] **Warden:** melee, STR / VIT, bleeds, shields, counters. Starts with a blade and plate.
  - [x] **Hexblade:** spells and shadow, INT / DEX, burns, poisons, dodging. Starts with a staff and robe.
- [x] **Star chart skill tree:** 29 stars in a pixel night sky
  - [x] Each star is a skill, a stat, a passive or a keystone
  - [x] You can only light a star connected to one you own; lit stars are joined by constellation lines
  - [x] Warden starts bottom-left, Hexblade bottom-right, a shared middle leads up to a top keystone, so builds can cross over (another class's origin star can't be lit)
  - [x] Keystones: Juggernaut (+30% HP, stronger shields, −15% dodge), Lingering Venom (poison never wears off, half damage), Glass Cannon (+40% damage, −30% HP)
  - [x] Star points: 1 per level, plus a star fragment from each boss's first kill
  - [x] Tap a star for details; unlight any star that isn't holding others up, for a full refund
- [x] The 12 skills are spread across the two class trees; mastery stars rank them up
- [x] Old saves: you pick a class on next load and get your skill points back as stars
- [ ] Balance pass on star values once difficulty modes land (Phase 5)

## Phase 4 — Inventory and items

- [x] **Inventory rework**
  - [x] Grid of item icons with rarity borders, plus a gear layout around your hero
  - [x] Detail panel with the stat comparison against what you're wearing (green up, red down)
  - [x] Filter by slot; sort by rarity, tier or newest
  - [x] "New" marker on fresh loot (count on the tab), a lock to protect items from salvage and selling, a salvage-junk button (Common and Magic, unlocked)
  - [x] Bag limit of 30; extra loot auto-salvages into essence. (Expanding it waits for the Home stash.)
- [x] Separate materials pouch with icons and counts
- [x] More slots: helm, boots, second trinket, with new item types and icons
- [ ] Gear sets with 2 / 3-piece bonuses

## Phase 5 — Difficulty, challenges, achievements

- [x] ~~Difficulty modes~~ removed in round 2 (one tuned difficulty is easier to balance); Hardcore stays:
  - [x] Story (enemies ×0.8 HP / ×0.75 damage), Normal (×1.15 / ×1.12), Hard (×1.45 / ×1.3, +25% XP and gold, more and better drops)
  - [x] Hardcore toggle: death deletes the character
- [x] **Enemy telegraphs:** every enemy shows its next move above its head (attack, heavy, ward, heal, poison, bleed, burn, stun, drain); heavy and stun flash red
- [ ] **Balance pass:** Normal is now tougher than before, but the test bot still never loses. Needs a human playtest to tune HP, damage and the potion economy.
- [x] **Challenges:** dungeon modifiers you toggle before a run
  - [x] No potions, Enraged (+20% enemy damage, boss starts enraged), Swarm (3 enemies per floor)
  - [x] Rewards: +5 essence per modifier; clearing with all 3 gives a star fragment the first time per dungeon
  - [ ] Weekly challenge boss and leaderboard (needs online play, Phase 8)
  - [ ] Cosmetic titles as rewards
- [x] **Achievements:** 16 in the Character tab, with trophy icons, unlock toasts and gold / essence rewards
  - [x] Progress: clear each dungeon, reach Lv 10 / 15, light 15 stars, finish 5 bounties
  - [x] Skill: beat a boss without potions, win at 5% HP or less, 6 crits in one fight, clear a dungeon with all modifiers
  - [x] Collection: find a Legendary, empower to +5
  - [x] Secret: two hidden ones

## Phase 6 — Depth and town

- [ ] **Home:** buy the plot, then upgrades
  - [ ] Stash (extra storage, which trading will need later)
  - [ ] Trophy wall: each boss trophy gives a small permanent bonus
  - [ ] Garden: grows materials while you fight
  - [ ] Training dummy: test damage safely
- [ ] Elite / rare spawns with guaranteed better loot
- [ ] NPC upgrades (better Forge recipes, a bigger Market stock) as you progress

## Phase 7 — Content

- [x] Region 4: The Hollow Crown (round 5)
- [x] Infinite Tower (the Endless Spire): floor-by-floor climb, a modifier per floor, a champion every 5, a boss every 10, a star every new 10th floor
- [ ] More dungeon floor variety (events, treasure rooms, traps)
- [ ] Rotating daily bounty
- [ ] Sound effects and music, with a mute toggle

## Phase 8 — Online foundation

- [ ] Split game logic (combat, loot, crafting) out of the UI into its own module
- [ ] Server that runs the same logic, so the server is the authority and clients can't cheat stats or items
- [ ] Accounts and cloud saves

## Phase 9 — Multiplayer

- [ ] **Trading post** in the Market (player listings, direct trades)
- [ ] **Clans:** shared bank, clan perks, clan hall on a town plot
- [ ] **PvP arena:** async duels against other players' saved builds
- [ ] **Boss raids:** party bosses with shared HP and turn order
- [ ] Leaderboards for challenges and the weekly boss

## Round 8 — More ways to play (done)
- [x] **The Endless Spire:**
  - Opens after the Rootbound Crypt.
  - Each floor has a random modifier: Enraged, Swarm, Fortified, Frenzy, Gilded or Blessed.
  - An elite champion every 5 floors and a region boss every 10.
  - Cooldowns carry between floors. Losing costs no gold.
  - Every new 10th floor gives a star.
- [x] **Elites:**
  - 12 named champions, one per monster type.
  - 5% chance while wandering, or Track one for coins.
  - 2.6× HP, max-rarity loot, a gem chance and bonus essence.
  - The first kill gives a title, shown in the header.
- [x] **Quests:** four townsfolk with 3-step chains (hunt, hand over materials, clear / elite / Spire floor). They pay gold, essence, stars and gems.
- [x] **Daily contracts:** three a day at the Inn, replacing the bounty board. Finishing all three gives a bonus gem.
- [x] **Forging:** the strike marker no longer speeds up after each strike.

## Round 9 — Playtest rework (done)
- [x] **Stats:**
  - Each point is about 1%: STR physical damage, DEX crit damage and chance, INT spell damage and MP, VIT HP and defense, SPD speed, LUK gold and better drops.
  - Gear and stars no longer give stat points. Stat stars give % bonuses, and stat-named gear bonuses turn into % bonuses.
- [x] **Weapon scaling:**
  - One stat per weapon, and the grade climbs with tempering: D→S, C→SS (Obsidian/Hollow), B→SSS (Legendary), A start for Mythic.
  - Each grade adds attack per stat point. Tempering a weapon only raises its grade.
- [x] **Forge rework:**
  - Pick weapons or armor, then what to make, then a catalyst metal (sets the tier), an optional alloy reagent, up to 2 supplements and an optional rarity crystal.
  - Crystals: shards from bosses, elites and salvaging Epic+; crystals from bosses and Spire milestones; crystals combine in Supplies.
  - New Mythic rarity.
- [x] **Loot and rewards:**
  - Rarer drops, and Legendaries much rarer.
  - Spire: loot tier by floor, half XP, 60% gold, fewer drops.
  - Salvaging also gives metal and shards. Contracts pay ~3× plus materials and shards.
- [x] **Inventory:**
  - Select by rarity or tier, lock/unlock the selection, right-click to lock.
  - Drag to arrange (Custom sort). The salvage junk button is gone.
- [x] **Visuals:**
  - Trousers match the armor, with boot shafts.
  - Hollow weapons get a quiet gold halo, and Hollow staves add motes.
  - Each Legendary gets its own effect (haze, gleam, dust, flames, drips).
- [x] **Removed:** elite tracking and titles.
- [x] **Cloud:** loading a cloud save is limited to once every 10 minutes.

## Round 10 — The Shattered Sky (done)
- [x] **Region 5, The Shattered Sky:** levels 22–32. Monsters: Rift Stalker, Astral Sentinel and Void Siren. Dungeon: the Rift Cradle, with The Unmaker (Lv 35) at the end.
- [x] **Astral tier (tier 5):** new metal, new materials (Void Silk, Star Shard, Rift Core), 3 new alloys and 2 new Uniques (Starbreaker, Riftsong Wand), plus the Star Seer quest.
- [x] **Level cap 50.** Past level 20, enemies grow at a third of the old rate per level.
- [x] **Bosses:**
  - The Queen of Shards and the Hollow King are redrawn at twice the size.
  - Every boss has 2–3 named moves with their own visuals, and the intent label shows the move.
- [x] **Combat clarity:**
  - Damage shows as one number with its multiplier, e.g. "29 (×1.5)".
  - Numbers on the same target spread apart.
  - Statuses are bordered chips that show ×stacks and turns.
- [x] **Stat text:** "+79% spell damage, +79% MP"; "Your weapon scales with this" is on its own line.

## Round 11 — Forge rework (done)
- [x] **Core metal first:** the core metal picks the tier and what you can make. Iron: Longsword, Greatsword, Dagger and the three staves. Steel adds Scimitar, Greataxe and Rapier. Obsidian adds Katana and Warhammer.
- [x] **Weapon traits:**

  | Weapon | Trait |
  |---|---|
  | Greatsword | Cleave |
  | Greataxe | Rend (bleed) |
  | Warhammer | Crush (stun) |
  | Longsword | Parry |
  | Katana | Iaido (crit damage) |
  | Scimitar | Flurry (second strike) |
  | Rapier | Riposte |
  | Dagger | Envenom |

  Some also change SPD.
- [x] **Two alloys, each with its own flux** (crafted under Supplies):
  - Emberforged: fire damage plus flame stacks, and it still uses physical damage bonuses.
  - Bloodforged: +30% damage and +15% lifesteal, but −25% HP.
- [x] **Supplements:** each one does one stated thing, and stat supplements scale with the core tier.
- [x] **Reforges removed:** old saves get essence and gold back once, with a message.
- [x] **Staves:** each tier has its own look, from a twig with a spark up to a crowned orb.
- [x] **Short tooltips:** materials and items show a compact summary on hover. The anvil lists what each part adds.
- [x] **Fixes:** the forging minigame had no zone size for Astral.

## Round 12 — The Stormsea (done)
- [x] **Region 5 is now the Stormsea:** a storm-ocean shore with a lighthouse, rolling waves, rain and lightning.
  - Monsters: Storm Eel, Drowned Knight and Tide Siren.
  - Boss: the Leviathan, at the end of the Drowned Lighthouse.
- [x] **Leviathan moves:**
  - Tidal Crush: a wave crashes over you.
  - Undertow: a whirlpool drain.
  - Thunderhead: 5 lightning strikes that stun.
- [x] **Renames:** tier 5 is now Abyssal, and its materials are Abyssal Ore, Siren Scale, Storm Pearl and Leviathan Heart. The uniques are Tidebreaker and Stormcaller Rod. The Lighthouse Keeper replaces the Star Seer quest-giver.
- [x] **Mythic Crystals:** every 10th new best Spire floor from 30 on gives one (30, 40, 50…).

## Round 13 — Gems, HP and alloys (done)
- [x] **Gems:**
  - Ruby is now % damage (physical and spell), and Emerald is % max HP.
  - You can wear only one gem of each type, and you choose Slot 1, 2 or 3.
  - Perfect gems are Legendary.
- [x] **Inventory:**
  - Drag items from the bag onto the equipped slots.
  - Bulk salvage leaves gems out unless "Gems: On" is set.
- [x] **Duels:** Riposte and Thorns hit back.
- [x] **Auto-continue:** Spire and dungeon floors continue on their own, with a toggle in Settings.
- [x] **HP:**
  - Player HP grows +2.5% per level past 8, up to +60%.
  - Stormsea monsters have 3× HP.
  - Staves get +1 base attack, and the Storm Rod gets +2.
- [x] **Alloys:** one per region.
  - Bloodforged (region 2), now nerfed to +15% damage, +8% lifesteal and −20% HP.
  - Emberforged (region 3).
  - Soulforged (region 4): ignores 35% of defense, and kills heal 8% HP.
  - Stormforged (region 5): storm damage that arcs to another enemy. It uses a Leviathan Heart as its reagent.
- [x] **Supplements:** Crowned is down to +20% crit damage, and you can use only one boss-material effect per item.

## Round 14 — Arena, QoL and harder late game (done)
- [x] **Duels:** fought in a colosseum. Results show your rating change, and duels give no gold or loot.
- [x] **Settings:** split into QoL (speed, auto-continue, auto-salvage) and Options (account, sound, save, admin, achievements). Auto-continue is now near-instant.
- [x] **Auto-salvage:** picks by rarity, with optional gems and "keep upgrades". Uniques and locked items are never salvaged.
- [x] **Spire:** you can start at half your best floor. XP is 0.3× and item drops are rarer.
- [x] **Rarer drops overall:** items, gems, high-grade gems, boss rarities, crystals and uniques.
- [x] **Area levels connect:** 1–4, 5–9, 10–14, 15–19, 20–34.
- [x] **Regional elements:** each region has one weakness and one resistance.

  | Region | Weak to | Resists |
  |---|---|---|
  | Mossy Hollow | fire | venom |
  | Glasswind Dunes | frost | storm |
  | Cinderfall Peaks | frost | fire |
  | The Hollow Crown | fire | frost |
  | The Stormsea | storm | venom |
- [x] **Late-game damage:** Hollow Crown monsters, Stormsea monsters and their bosses deal 2× damage. Those bosses ignore 70% of your defense. This doesn't apply in the Spire.
- [x] **New art:**
  - The Ember Tyrant is an armored horned demon with a flaming greatsword and fire sword swings.
  - The Leviathan is a giant head and neck reaching in from off-screen.
  - Abyssal armor has shell pauldrons, scales, fins and pearls.
- [x] **Boss effects:**
  - Every boss gathers particles while a signature move is coming, then rears back before it lands.
  - The enraged red outline is gone; "Enraged" shows next to the name instead.
- [x] **Attack effects:** each weapon has its own basic attack (cleave, chop, twin cut, thrust, iaido…). Tidebreaker rides a wave; Cinderbrand and Emberforged blades cut with fire; Obsidian Edge does a void cut.
