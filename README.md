# My Very Own

**One AI engine. 20 products. $1B vision.**

Landing at [myveryown.page](https://myveryown.page) — a platform that skins any LLM into deeply personalized AI companions across 20 niches, each with persistent memory that makes every user feel irreplaceable.

---

## The portfolio (20 products, 1 codebase)

| Tier | Product | Market | Price |
|---|---|---|---|
| 1 | 💋 **Scarlet.Love** | 18+ companion | $19.99/mo |
| 1 | 🕯️ **The Hearth** | Emotional support | $9.99/mo |
| 1 | 💜 **Bias Wrecker** | K-Pop stan | $4.99/mo |
| 1 | 💪 **Iron Brother** | Fitness coach | $14.99/mo |
| 1 | 📚 **Study Buddy** | Students | $4.99/mo |
| 2 | ✝️ **Shepherd** | Faith | $7.99/mo |
| 2 | 🌈 **Rainbow Bridge** | Pet loss | $9.99/mo |
| 2 | 💍 **The Promise** | Weddings | $19.99/mo |
| 2 | 🤰 **Little One** | Pregnancy | $9.99/mo |
| 2 | 🎣 **Cast & Catch** | Fishing | $9.99/mo |
| 3 | 🔧 **Gearhead** | Project cars | $9.99/mo |
| 3 | 🥗 **Fuel Daily** | Nutrition | $12.99/mo |
| 3 | 🎮 **Player Two** | Gaming | $6.99/mo |
| 3 | 💰 **The Ledger** | Finance | $9.99/mo |
| 3 | ✒️ **Ink & Quill** | Writing | $14.99/mo |
| 3 | 🔨 **Handy** | DIY | $9.99/mo |
| 3 | 🎸 **Chords & Keys** | Music | $9.99/mo |
| 3 | 🌱 **Green Thumb** | Gardening | $7.99/mo |
| 3 | 🏈 **The 12th Man** | Sports fans | $7.99/mo |
| 2 | 🌹 **Betty & Bernard** | Elder care | $19.99/mo |

---

## Architecture

This is a monorepo-style marketing hub. The actual product runs across **three repos**:

### 🎨 [rogergrubb/myveryown](https://github.com/rogergrubb/myveryown) — this repo
The landing page and marketing assets deployed at `myveryown.page`. Showcases the 20-product slideshow with the Buddy Rail navigation.

### 🧠 [rogergrubb/myveryown-api](https://github.com/rogergrubb/myveryown-api) — backend
Node + TypeScript + Express API handling auth, chat streaming, Stripe billing, and Cortex memory.
- Deployed on Railway at `api.myveryown.page`
- Gemini 2.0 Flash as flagship LLM
- SQLite (dev) / Postgres (prod)
- Magic link email + Google OAuth + Apple OAuth
- Streaming SSE chat at `/api/chat`
- 48hr anonymous free trial → paywall → subscription funnel

### 🖼️ [rogergrubb/myveryown-web](https://github.com/rogergrubb/myveryown-web) — frontend
React + Vite + TypeScript.
- Deployed on Vercel at `myveryown.page`
- 20-persona themed chat interface
- Single-source `personas.tsx` config powers theming across entire app
- Real-time streaming chat, session countdown, dynamic paywall

### 🧬 [rogergrubb/cortex](https://github.com/rogergrubb/cortex) — memory engine
The persistent memory layer that makes My Very Own personas actually remember you forever.

---

## Economics

On **Gemini 2.0 Flash** ($0.15 input / $0.60 output per 1M tokens):

| Tier usage | Typical cost | Price | Margin |
|---|---|---|---|
| Light user (500 msgs/mo, 750K tokens) | $0.15/mo | $4.99 | 3,200% |
| Average user (3K msgs/mo, 4.5M tokens) | $0.88/mo | $9.99 | 1,035% |
| Power user (10K msgs/mo, 15M tokens) | $2.93/mo | $19.99 | 583% |

One LLM call. One memory system. Twenty skins. That's the solopreneur path to $1B.

---

## File guide (this repo)

| File | Purpose |
|---|---|
| `index.html` | Live homepage — 20 GPT screens with Buddy Rail |
| `showcase.html` | Static 20-product catalog grid |
| `slideshow-brand.html` | Brand-pitch slideshow |
| `gpt-screens-v1.html` | Pre-rail GPT home screens |
| `homepage-story.html` | Original storybook scroll |
| `themes/kpop-concert.html` | Working standalone K-Pop chat theme |
| `src/App.jsx` | React 4-screen onboarding (legacy) |

---

Built by [Number One Son Software Development](https://github.com/rogergrubb).
