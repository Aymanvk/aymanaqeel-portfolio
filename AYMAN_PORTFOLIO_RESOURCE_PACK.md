# AYMAN AQEEL — PORTFOLIO RESOURCE PACK
### Complete Build Context for Google Antigravity (Gemini Agent)
> Drop this entire file as context before issuing any prompts.
> Version: 1.0 | Stack: Next.js 14 + Supabase + Resend | Deploy: Vercel

---

## TABLE OF CONTENTS
1. [Project Identity](#1-project-identity)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Design System](#3-design-system)
4. [Project File Structure](#4-project-file-structure)
5. [Supabase Schema](#5-supabase-schema)
6. [Environment Variables](#6-environment-variables)
7. [Dependencies](#7-dependencies)
8. [Section Specifications](#8-section-specifications)
9. [Blog & Admin System](#9-blog--admin-system)
10. [API Routes Specification](#10-api-routes-specification)
11. [Security Rules & Vibe-Code Risks](#11-security-rules--vibe-code-risks)
12. [Developer Rules](#12-developer-rules)
13. [Agent Prompt Templates](#13-agent-prompt-templates)
14. [Build Order](#14-build-order)

---

## 1. PROJECT IDENTITY

### Owner
- **Name**: Ayman Aqeel
- **Role**: Full-Stack Developer
- **Location**: Malappuram, Kerala, India
- **Tagline**: *"Software is going nowhere, ever."*
- **GitHub**: https://github.com/Aymanvk
- **LinkedIn**: https://www.linkedin.com/in/aymanaqeel/

### Personality & Vibe
This is NOT a standard portfolio. The person is **creative, experimental, and non-conventional**.
The website should feel like an **experience**, not a résumé PDF on a screen.
Reference aesthetic: https://jackiezhang.co.za/ — editorial chaos with intention,
organic layouts, massive typography as a visual element, personality everywhere.

### Two Projects to Showcase
1. **AIRES** — AI Resume Analyzer
   - An intermediary platform between recruiters and job seekers
   - Recruiters post job listings; job seekers upload their CV
   - NLP + AI model analyzes the CV, extracts structured data, shows similar job matches
   - GitHub: https://github.com/Aymanvk/aires-ai-resume-analyzer
   - Live URL: [to be added by developer]

2. **BIZCOD** — Bookstore
   - Personal bookstore created during Ayman's learning journey
   - Resold bought books to fund further upskilling
   - Has a personal backstory — make it feel warm and human
   - GitHub: https://github.com/Aymanvk/bizcodbookstore.github.io
   - Live URL: https://aymanvk.github.io/bizcodbookstore.github.io/

### Education
- **College**: Rajagiri College of Social Sciences
- **Ranking**: KIRF #1 in Kerala (highest institutional ranking in the state)
- **Degree**: BCA + MCA Integrated (5-year accelerated dual-degree)
  - This is equivalent to completing a BCA + MCA separately (which takes 6+ years)
  - Highlight this subtly: small badge `✦ Integrated Dual-Degree` with a tooltip
  - College ranking gets a `🏆 #1 in Kerala · KIRF` badge in accent color

---

## 2. TECH STACK & ARCHITECTURE

### Frontend
- **Framework**: Next.js 14 with App Router (TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: GSAP + @gsap/react + ScrollTrigger plugin
- **Smooth Scroll**: Lenis
- **3D / WebGL**: Three.js + @react-three/fiber + @react-three/drei
- **Component Animations**: Framer Motion
- **Scroll Reveal**: AOS (Animate On Scroll)
- **Custom Cursor**: CSS + JS (no library needed)

### Backend
- **Database + Auth + Storage**: Supabase
  - Supabase Auth for admin login (email/password only)
  - Supabase DB for posts, comments, banned IPs
  - Supabase Storage for blog cover images
- **Email**: Resend (contact form sends email to Ayman)
- **Content Moderation**:
  - `bad-words` npm package (instant profanity filter, runs server-side)
  - Google Perspective API (toxicity scoring, free tier)
  - IP hashing + banned_ips table in Supabase

### Deployment
- **Platform**: Vercel
- **Domain**: TBD (add when Ayman purchases one)

### Architecture Pattern
```
Browser
  └── Next.js App Router (SSR + Client Components)
        ├── /            → Home page (all snap-scroll sections)
        ├── /blog        → Blog listing (separate page, normal scroll)
        ├── /blog/[slug] → Individual post + comments
        └── /admin       → Protected dashboard (Supabase Auth)
              ├── /admin/new-post
              └── /admin/moderate

API Routes (Next.js server-side, never exposed to client)
  ├── /api/contact       → Resend email
  ├── /api/comments      → Submit comment + moderation pipeline
  └── /api/admin/ban     → Ban IP address
```

---

## 3. DESIGN SYSTEM

### Color Palette (Dark Editorial — Single Theme, No Toggle)
```css
:root {
  --bg:           #080808;  /* near-black, warm undertone */
  --bg-surface:   #111111;  /* cards, panels, elevated surfaces */
  --bg-border:    #1F1F1F;  /* subtle dividers */
  --text-primary: #E8E2D0;  /* warm off-white — NOT cold white */
  --text-muted:   #6B6B6B;  /* secondary text, timestamps */
  --accent:       #FF4C00;  /* electric burnt orange — primary accent */
  --accent-alt:   #1AFF8C;  /* neon green — used SPARINGLY (code, tech moments) */
  --accent-hover: #FF6B2B;  /* accent on hover */
  --overlay:      rgba(8,8,8,0.85); /* for modals and overlays */
}
```

**IMPORTANT**: The accent orange (`#FF4C00`) is used for:
- Navbar Blog link highlight (pill/badge)
- Hover states on interactive elements
- Section number labels
- KIRF ranking badge
- CTA buttons (primary)
- Cursor dot

The accent green (`#1AFF8C`) is used ONLY for:
- Code-related skill tags
- Terminal-style text moments
- AIRES project section (subtly, for the AI/tech angle)

### Typography
All fonts loaded locally from `/public/fonts/` — do NOT use Google Fonts CDN in production.

```css
--font-display:  'Cabinet Grotesk', sans-serif;   /* Hero, section titles, big numbers */
--font-body:     'General Sans', sans-serif;       /* Body text, paragraphs */
--font-mono:     'Geist Mono', monospace;          /* Code, skill tags, terminal text */
```

Download from:
- Cabinet Grotesk: https://www.fontshare.com/fonts/cabinet-grotesk
- General Sans: https://www.fontshare.com/fonts/general-sans
- Geist Mono: https://vercel.com/font

```css
/* Type Scale */
--text-hero:   clamp(4rem, 12vw, 10rem);    /* AYMAN AQEEL hero display */
--text-display: clamp(2.5rem, 6vw, 5rem);   /* Section titles */
--text-xl:     clamp(1.5rem, 3vw, 2.5rem);  /* Subheadings */
--text-body:   1rem;                          /* 16px body */
--text-small:  0.875rem;                      /* 14px meta */
--text-mono:   0.8125rem;                     /* 13px code/tags */
```

### Spacing & Layout
```css
--section-padding-x: clamp(1.5rem, 6vw, 6rem);
--section-padding-y: clamp(3rem, 8vh, 6rem);
--max-width: 1400px;
--nav-height: 64px;
```

### Motion Principles
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` for entries (fast in, eased out)
- **Duration**: 0.6s for reveals, 0.2s for hovers, 1.2s for hero entrance
- **GSAP Default Ease**: `power3.out`
- **Lenis Config**: `{ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }`
- **Principle**: Animations should feel *inevitable*, not decorative. Every animation has a purpose.
- **Reduced Motion**: ALL animations must respect `prefers-reduced-motion`. Wrap GSAP and Framer Motion in a check.

### Scroll Behavior
- **Type**: Full-screen snap scroll (each section = 100vh, snaps on scroll)
- **Exception**: Blog pages use normal scroll (no snap)
- **Snap CSS**:
```css
.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.snap-section {
  height: 100vh;
  scroll-snap-align: start;
}
```
- GSAP ScrollTrigger is used WITHIN sections for internal parallax (elements moving at different speeds as you scroll within a snapped section's "zone")

### Custom Cursor
Replace the default cursor with:
- A small orange dot (8px, `--accent` color) that follows the mouse
- A larger transparent ring (32px) that follows with slight lag (lerp 0.15)
- On hover over links/buttons: ring expands to 48px, dot disappears
- On hover over images: ring shows "VIEW" text inside

---

## 4. PROJECT FILE STRUCTURE

```
aymanaqeel-portfolio/
│
├── app/
│   ├── layout.tsx                    # Root layout: fonts, metadata, Lenis init, cursor
│   ├── globals.css                   # CSS variables, resets, font-face declarations
│   ├── page.tsx                      # Home: renders all snap-scroll section components
│   │
│   ├── blog/
│   │   ├── page.tsx                  # Blog listing — grid of BlogCard components
│   │   └── [slug]/
│   │       └── page.tsx              # Individual post (SSG) + CommentSection
│   │
│   ├── admin/
│   │   ├── layout.tsx                # Auth guard: redirects to /admin/login if no session
│   │   ├── login/
│   │   │   └── page.tsx              # Supabase email/password login form
│   │   ├── page.tsx                  # Dashboard: list of posts, published/draft status
│   │   ├── new-post/
│   │   │   └── page.tsx              # Create new post (markdown editor)
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Edit existing post
│   │   └── moderate/
│   │       └── page.tsx              # Review pending comments, ban IPs
│   │
│   └── api/
│       ├── contact/
│       │   └── route.ts              # POST: validate input → send via Resend
│       ├── comments/
│       │   └── route.ts              # POST: bad-words → Perspective → Supabase
│       └── admin/
│           └── ban/
│               └── route.ts          # POST: add IP hash to banned_ips table
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx                  # Three.js canvas + GSAP text entrance
│   │   ├── About.tsx                 # Photo placeholder + bio + marquee
│   │   ├── Skills.tsx                # Interactive skill grid
│   │   ├── Projects.tsx              # AIRES + BIZCOD cinematic reveals
│   │   ├── Education.tsx             # Animated timeline
│   │   └── Contact.tsx               # Form + socials + footer
│   │
│   ├── blog/
│   │   ├── BlogCard.tsx              # Post preview card
│   │   ├── PostContent.tsx           # react-markdown renderer with custom styles
│   │   └── CommentSection.tsx        # Comment form + approved comments list
│   │
│   ├── admin/
│   │   ├── PostEditor.tsx            # @uiw/react-md-editor wrapper
│   │   └── ModerationTable.tsx       # Table of pending comments with approve/reject/ban
│   │
│   └── ui/
│       ├── Navbar.tsx                # Fixed nav with Blog pill in accent color
│       ├── SectionWrapper.tsx        # snap-section div with consistent padding
│       ├── ScrollProgress.tsx        # Vertical dot nav (right side): shows active section
│       ├── CursorGlow.tsx            # Custom cursor (client component)
│       ├── Marquee.tsx               # Infinite horizontal scrolling text
│       └── Badge.tsx                 # Reusable badge component (used for rankings, tags)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # createBrowserClient — for client components
│   │   └── server.ts                 # createServerClient — for server components & API routes
│   ├── resend.ts                     # Resend instance + contact email HTML template
│   ├── moderation.ts                 # bad-words filter + Perspective API call + scoring logic
│   └── utils.ts                      # cn(), formatDate(), slugify(), hashIP()
│
├── hooks/
│   ├── useScrollSection.ts           # Tracks which snap section is active (for dot nav)
│   └── useLenis.ts                   # Initializes Lenis, exposes scroll instance
│
├── types/
│   └── index.ts                      # TypeScript interfaces: Post, Comment, Project, Skill, BannedIP
│
├── public/
│   ├── fonts/
│   │   ├── CabinetGrotesk-Variable.woff2
│   │   ├── GeneralSans-Variable.woff2
│   │   └── GeistMono-Variable.woff2
│   └── projects/
│       ├── aires-screenshot.png      # Upload project screenshot here
│       └── bizcod-screenshot.png     # Upload project screenshot here
│
├── .env.local                        # NEVER COMMIT THIS FILE
├── .env.example                      # Committed — template with empty values
├── .gitignore                        # Must include .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. SUPABASE SCHEMA

Run this SQL in the Supabase SQL editor to set up all tables.

```sql
-- ============================================================
-- POSTS TABLE
-- ============================================================
CREATE TABLE posts (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  content       TEXT NOT NULL,          -- markdown string
  excerpt       TEXT NOT NULL,          -- 1-2 sentence summary for card preview
  cover_image_url TEXT,                 -- Supabase Storage URL
  published     BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ============================================================
-- COMMENTS TABLE
-- ============================================================
CREATE TABLE comments (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id       UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_hash       TEXT NOT NULL,          -- SHA-256 of (IP + secret salt), never raw IP
  perspective_score FLOAT,              -- toxicity score from Perspective API (0.0 - 1.0)
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- BANNED IPS TABLE
-- ============================================================
CREATE TABLE banned_ips (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_hash       TEXT NOT NULL UNIQUE,
  reason        TEXT,
  banned_at     TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Posts: public can read published only. Only authenticated admin can write.
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin can do everything"
  ON posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Comments: public can read approved only. API service role handles inserts/updates.
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved comments"
  ON comments FOR SELECT
  TO anon
  USING (status = 'approved');

-- NOTE: Comment inserts are done via SUPABASE_SERVICE_ROLE_KEY in API routes only.
-- Never allow anon role to insert directly — all inserts go through your API.

-- Banned IPs: only service role can read/write (checked in API routes).
ALTER TABLE banned_ips ENABLE ROW LEVEL SECURITY;

-- No public policies on banned_ips — only accessible via service role key server-side.

-- ============================================================
-- INDEXES (performance)
-- ============================================================
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_banned_ips_hash ON banned_ips(ip_hash);
```

---

## 6. ENVIRONMENT VARIABLES

### .env.example (commit this file)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend
RESEND_API_KEY=your_resend_api_key
CONTACT_RECIPIENT_EMAIL=your_email_address_here

# Google Perspective API
PERSPECTIVE_API_KEY=your_perspective_api_key

# Security
IP_HASH_SECRET=a_random_32_character_string_minimum

# Admin
ADMIN_EMAIL=your_admin_email_for_supabase_auth
```

### CRITICAL SECURITY RULES FOR ENV VARS
- Variables prefixed `NEXT_PUBLIC_` are exposed to the browser. NEVER put secrets here.
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER be prefixed with `NEXT_PUBLIC_`
- `RESEND_API_KEY` must NEVER be prefixed with `NEXT_PUBLIC_`
- `PERSPECTIVE_API_KEY` must NEVER be prefixed with `NEXT_PUBLIC_`
- `IP_HASH_SECRET` must NEVER be prefixed with `NEXT_PUBLIC_`
- Add `.env.local` to `.gitignore` BEFORE the first commit

---

## 7. DEPENDENCIES

### package.json — install all at once
```json
{
  "name": "aymanaqeel-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.x",
    "react": "18.3.x",
    "react-dom": "18.3.x",
    "typescript": "5.x",

    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",

    "resend": "^3.x",

    "gsap": "^3.x",
    "@gsap/react": "^2.x",

    "lenis": "^1.x",

    "framer-motion": "^11.x",

    "three": "^0.167.x",
    "@react-three/fiber": "^8.x",
    "@react-three/drei": "^9.x",

    "aos": "^3.x",

    "bad-words": "^3.x",

    "@uiw/react-md-editor": "^4.x",
    "react-markdown": "^9.x",
    "rehype-highlight": "^7.x",
    "remark-gfm": "^4.x",

    "clsx": "^2.x",
    "tailwind-merge": "^2.x",

    "crypto": "builtin"
  },
  "devDependencies": {
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "@types/three": "^0.167.x",
    "@types/aos": "^3.x",
    "@types/bad-words": "^3.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x",
    "eslint": "^8.x",
    "eslint-config-next": "14.x"
  }
}
```

---

## 8. SECTION SPECIFICATIONS

### NAVBAR
```
Layout: fixed top, full width, height 64px, z-index 100
Background: transparent initially → rgba(8,8,8,0.9) + blur(12px) after 80px scroll
Left: "AA" monogram in Cabinet Grotesk (links to #hero)
Right links: About | Skills | Projects | Education | Contact | [BLOG ← orange pill badge]

Blog link styling:
  background: var(--accent)
  color: #000
  padding: 6px 14px
  border-radius: 999px
  font-weight: 600
  font-size: 13px
  text-transform: uppercase
  letter-spacing: 0.08em
  On hover: scale(1.05), background: var(--accent-hover)

Mobile: hamburger menu, fullscreen overlay nav
```

### SECTION 1: HERO
```
Layout: Full viewport (100vh), snap section
Background: Three.js WebGL canvas — interactive particle field
  - ~2000 small particles
  - Color: mix of #FF4C00 (10%) and #E8E2D0 (90%)
  - Particles react to mouse: repel slightly within 120px radius
  - Subtle constant drift animation

Content (centered, slight left offset):
  Line 1: "AYMAN" — Cabinet Grotesk, var(--text-hero), weight 800
  Line 2: "AQEEL" — Cabinet Grotesk, var(--text-hero), weight 800, color: var(--accent)
  Line 3: Cycling text (Framer Motion AnimatePresence):
    - "Full-Stack Developer"
    - "Builder of things"
    - "Creative & Experimental"
    Each line switches every 3 seconds with a vertical slide animation
  Line 4: Tagline — "Software is going nowhere, ever."
    Font: General Sans, 1.1rem, color: var(--text-muted), style: italic

Bottom left: Live clock — "Malappuram, Kerala · 09:41 PM IST"
  Updates every second, Geist Mono font, small, muted

Bottom right: "Scroll to explore ↓"
  Animated: subtle breathing/pulsing opacity 0.5 → 1 → 0.5

GSAP Entrance Sequence (on page load, staggered):
  1. Canvas fades in (0.8s)
  2. "AYMAN" slides up from +40px opacity 0 → 1 (delay: 0.3s)
  3. "AQEEL" slides up (delay: 0.5s)
  4. Cycling text fades in (delay: 0.8s)
  5. Tagline fades in (delay: 1.0s)
  6. Bottom elements fade in (delay: 1.2s)
```

### SECTION 2: ABOUT
```
Layout: Full viewport, snap section, two columns

Left column (40%):
  - Large placeholder image in an irregular frame (not a plain rectangle)
    Use clip-path: polygon(...) for an organic shape
  - Image is slightly rotated (-2deg)
  - Floating decorative elements around image:
    - A small "{  }" code bracket in Geist Mono, accent color, rotated 15deg
    - A small ">" terminal cursor blinking
    - A tiny geometric diamond shape

Right column (60%):
  - Small label: "// ABOUT" in Geist Mono, accent color, text-small
  - Main heading: "I build things" in Cabinet Grotesk, var(--text-display)
    second line: "that don't bore me." — lighter weight
  - Bio paragraph (2-3 sentences, General Sans, body size):
    "Full-Stack Developer based in Kerala, India. I live at the intersection of
    clean code and bold design — building products that feel as good as they work.
    Currently studying BCA+MCA Integrated at Rajagiri College of Social Sciences."
  - Personality chips (flex wrap, small pills):
    ["Night owl", "Builds at 2am", "Coffee-powered", "MERN enthusiast",
     "Overthinks UX", "Ships anyway"]
    Style: border: 1px solid var(--bg-border), padding: 4px 12px,
           border-radius: 999px, font-size: 13px, Geist Mono

Bottom: Infinite horizontal marquee (full width, overflow hidden):
  Text: "FULL-STACK DEV  ·  NEXT.JS  ·  REACT  ·  NODE.JS  ·  SUPABASE  ·
         OPEN TO WORK  ·  MERN STACK  ·  CREATIVE  ·  MALAPPURAM, KERALA  · "
  Speed: 40s loop, pausable on hover
  Font: Cabinet Grotesk, uppercase, weight 600

AOS: Right column content reveals with data-aos="fade-left"
```

### SECTION 3: SKILLS
```
Layout: Full viewport, snap section

Header:
  - Section number "03" in Geist Mono, huge (8rem), color: #1A1A1A (dark ghost)
    Position: absolute, behind heading text
  - Heading: "Skills & Tools" in Cabinet Grotesk, var(--text-display)

Grid: CSS Grid, auto-fill columns, min 180px
Each skill card:
  - Background: var(--bg-surface)
  - Border: 1px solid var(--bg-border)
  - Border-radius: 12px
  - Padding: 20px
  - Contents: [icon or letter avatar] + skill name + category tag
  - On hover:
    - border-color: var(--accent)
    - box-shadow: 0 0 20px rgba(255, 76, 0, 0.15)
    - scale(1.03) transform
    - Show tooltip: context string (e.g., "Used in AIRES · 2 projects")

Categories & Skills (placeholder — Ayman will update):
  FRONTEND: React, Next.js, TypeScript, Tailwind CSS, HTML/CSS, Three.js
  BACKEND: Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, Supabase
  TOOLS: Git, GitHub, VS Code, Vercel, Figma, Postman
  AI/ML: NLP (AIRES project), Python basics, Prompt Engineering

Category labels are decorative text in Geist Mono scattered in background

AOS: Cards stagger in with data-aos="fade-up" data-aos-delay="[50*index]ms"
```

### SECTION 4A: PROJECTS — AIRES
```
Layout: Full viewport, snap section

Background: Near-black with subtle animated neural network line graphic
  Use Three.js or pure CSS/SVG animated lines connecting dots
  Very subtle, 5% opacity — decorative only

Left half:
  - Small label: "01 / PROJECT" Geist Mono, accent green (#1AFF8C)
  - Project name: "AIRES" Cabinet Grotesk, 6rem+, weight 900
  - One-liner: "AI-powered bridge between talent and opportunity."
  - Description: 2-3 sentences about what AIRES does
  - Tech stack tags: [MongoDB] [Express] [React] [Node.js] [NLP] [AI]
    Style: Geist Mono, var(--bg-surface) background, border, small
  - Two buttons:
    [→ Live Demo]  — accent orange fill button, links to live URL
    [GitHub ↗]     — outline button, links to GitHub repo

Right half:
  - Project screenshot (aires-screenshot.png)
  - Float in from right on section enter (GSAP: x: 100 → 0, opacity 0 → 1)
  - Subtle tilt on mousemove (Framer Motion, max ±8deg)
  - Frame: slight border, shadow, rounded corners
  - Decorative: small floating badge "NLP POWERED" in accent green
```

### SECTION 4B: PROJECTS — BIZCOD
```
Layout: Full viewport, snap section (second sub-snap within projects)

Background: Slightly warmer than default — add a very subtle warm overlay

Mood: More personal. This section tells a story.

Right half (reversed layout from AIRES):
  - Small label: "02 / PROJECT" Geist Mono, accent color
  - Project name: "BIZCOD" Cabinet Grotesk, 6rem+, weight 900
  - One-liner: "A bookstore born from the desire to keep learning."
  - Story (2 sentences, italic, slightly smaller): 
    "Built during my early learning journey to resell books and fund
    my next course. Every sale was a step forward."
  - Tech stack tags: [HTML] [CSS] [JavaScript] [GitHub Pages]
  - Two buttons: [→ Live Demo] [GitHub ↗]

Left half:
  - Project screenshot (bizcod-screenshot.png)
  - Float in from left on section enter
  - Same tilt-on-hover behavior

Accent difference: BIZCOD's hover glow is slightly more orange-amber
vs AIRES which uses accent green. This subtle distinction makes each
project feel unique.
```

### SECTION 5: EDUCATION
```
Layout: Full viewport, snap section

Header: "Education" in Cabinet Grotesk, var(--text-display)

Vertical timeline (centered or left-aligned):
  - The line draws itself using GSAP ScrollTrigger (drawSVG or scaleY)
  - Each node pulses when it enters view

Timeline entry for RAJAGIRI:
  ┌─────────────────────────────────────────────────────┐
  │ 🏆 #1 in Kerala · KIRF  ← orange badge             │
  │                                                     │
  │ Rajagiri College of Social Sciences                 │
  │ BCA + MCA Integrated Programme                      │
  │                                                     │
  │ ✦ Integrated Dual-Degree  ← accent badge           │
  │   (hover tooltip: "5-year accelerated programme     │
  │    equivalent to 6+ years of separate degrees")    │
  │                                                     │
  │ 20XX – Present (or graduation year)                │
  └─────────────────────────────────────────────────────┘

Additional entries: Add placeholder nodes for certifications,
courses, or other education. Ayman will populate.

AOS: Each timeline node reveals with data-aos="fade-right"
```

### SECTION 6: CONTACT
```
Layout: Full viewport, snap section, centered

Giant heading: "LET'S TALK." Cabinet Grotesk, var(--text-display)
  AOS: letters animate in one by one (split text with GSAP SplitText or manual spans)

Sub-text: "Have a project? Want to collaborate? Just say hi."
  General Sans, muted color

Contact Form:
  Fields: Name (text), Email (email), Message (textarea)
  All fields styled: borderless, underline-only style,
  background transparent, text var(--text-primary)
  Focus: underline color changes to var(--accent)
  Submit button: "Send Message →" full orange fill

  Client-side validation:
    - All fields required
    - Valid email format check
    - Message minimum 10 characters
    - Button shows loading state during send
    - On success: form hides, show "Message sent. I'll get back to you soon."
    - On error: show "Something went wrong. Try emailing directly."

Social links row (below form):
  [GitHub] [LinkedIn]
  Style: icon + label, hover: color shifts to accent

Footer (bottom of this section):
  "Designed & Built by Ayman Aqeel · 2025"
  Geist Mono, text-small, muted
```

---

## 9. BLOG & ADMIN SYSTEM

### Blog Page (/blog)
```
Layout: Normal scroll (NO snap scroll on this page)
Navbar: same as main site

Header section:
  - Title: "Writing" in Cabinet Grotesk, large
  - Subtext: "Thoughts on code, design, and the building process."

Post grid: CSS Grid, 2-3 columns on desktop, 1 on mobile
Each BlogCard:
  - Cover image (16:9 ratio, Supabase Storage URL)
  - Title (Cabinet Grotesk, medium)
  - Date (Geist Mono, small, muted)
  - Read time estimate (calculate from word count: Math.ceil(wordCount / 200) min)
  - Excerpt (2 lines, clamp with CSS)
  - Category tag (optional)
  - On hover: card lifts slightly, image zooms subtly (scale 1.03)
  - Click: navigate to /blog/[slug]

Empty state: "Nothing here yet. Check back soon." with a small illustration
```

### Individual Post Page (/blog/[slug])
```
Layout: Single column, max-width: 720px, centered
Fetched server-side (SSG with revalidation every 60s)

Structure:
  - Back link: "← All posts"
  - Cover image: full width, rounded, aspect-ratio 16/9
  - Title: Cabinet Grotesk, large
  - Date + read time: Geist Mono, muted
  - Divider
  - Content: react-markdown with remark-gfm + rehype-highlight
    Custom styles for: h1-h6, p, code (inline), pre (block), blockquote,
    ul/ol, a (accent color), strong, em, images
  - Divider
  - Comment section (see below)
```

### Comment Section
```
Form:
  Fields: Message only (textarea, required, min 10 chars, max 1000 chars)
  Note beneath form: "💬 Comments are moderated before appearing."
  Small print: "Your IP address is logged for moderation purposes."
  Submit: "Post Comment →"

After approved comments display:
  - "Anonymous" as name label (since we only collect message)
  - Formatted date
  - No avatars needed, keep minimal

Pending state: After submission, show:
  "Your comment is awaiting moderation. It'll appear once reviewed."

Rejected state (if Perspective score too high):
  "Your comment wasn't accepted. Please keep discussion respectful."

Never expose: whether an IP is banned (show same "rejected" message to banned IPs)
```

### Admin Panel (/admin)
```
Protected by Supabase Auth (email/password)
Redirect unauthenticated users to /admin/login

/admin/login:
  Simple form: email + password
  Uses supabase.auth.signInWithPassword()
  On success: redirect to /admin

/admin (dashboard):
  Table of all posts: title | status (published/draft) | date | actions
  Actions: Edit | Publish/Unpublish | Delete
  Button: "New Post +"

/admin/new-post and /admin/edit/[id]:
  - Title input (text)
  - Slug input (auto-generated from title, editable)
  - Excerpt input (textarea, 150 chars max)
  - Cover image upload (uploads to Supabase Storage, returns public URL)
  - Content: @uiw/react-md-editor (split view: markdown + preview)
  - Published toggle (checkbox)
  - Save Draft button + Publish button

/admin/moderate:
  Table of pending comments:
    post title | message preview | toxicity score | date | actions
  Actions per comment: Approve | Reject | Ban IP
  Ban IP adds ip_hash to banned_ips table
  Filter tabs: Pending | Approved | Rejected
```

---

## 10. API ROUTES SPECIFICATION

### POST /api/contact
```typescript
// Input validation (server-side, always):
const schema = {
  name: string, minLength: 1, maxLength: 100
  email: string, valid email format
  message: string, minLength: 10, maxLength: 2000
}

// Rate limiting:
// Use Vercel's built-in edge config or a simple in-memory map (not production-grade)
// Better: add Upstash Redis rate limiting (free tier available)
// Limit: 3 contact form submissions per IP per hour

// Process:
// 1. Validate all inputs (reject if invalid, return 400)
// 2. Sanitize inputs (strip HTML tags)
// 3. Send email via Resend to CONTACT_RECIPIENT_EMAIL
// 4. Return 200 { success: true }

// Email template (HTML):
// From: "Portfolio Contact <onboarding@resend.dev>" (or your verified domain)
// Subject: "New message from [name] via aymanaqeel.dev"
// Body: name, email, message, timestamp
```

### POST /api/comments
```typescript
// Input validation:
const schema = {
  post_id: string (valid UUID)
  message: string, minLength: 10, maxLength: 1000
}

// Process:
// 1. Validate inputs
// 2. Extract IP from request headers (x-forwarded-for or connection.remoteAddress)
// 3. Hash IP: createHmac('sha256', IP_HASH_SECRET).update(ip).digest('hex')
// 4. Check banned_ips table for this hash (use service role client)
//    → If banned: return 403 { error: "Comment not accepted." } (do NOT say banned)
// 5. Run bad-words filter on message
//    → If fails: return 400 { error: "Please keep your comment respectful." }
// 6. Call Perspective API:
//    POST https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze
//    Request: { comment: { text: message }, requestedAttributes: { TOXICITY: {} } }
//    Get score: response.attributeScores.TOXICITY.summaryScore.value (0.0 - 1.0)
// 7. Determine status:
//    score < 0.60  → status = 'approved'
//    0.60 - 0.85  → status = 'pending' (manual review)
//    score > 0.85  → status = 'rejected', auto-add IP to banned_ips
// 8. Insert into comments table (use service role client, never anon key)
// 9. Return appropriate message to user

// Rate limiting: 5 comments per IP per day
```

### POST /api/admin/ban
```typescript
// Auth check: verify Supabase session server-side
// If no valid session: return 401

// Input: { comment_id: string }
// Process:
// 1. Verify session (admin only)
// 2. Fetch comment by ID to get ip_hash
// 3. Insert ip_hash into banned_ips
// 4. Update comment status to 'rejected'
// 5. Return 200 { success: true }
```

---

## 11. SECURITY RULES & VIBE-CODE RISKS

> ⚠️ This section is MANDATORY reading. Vibe-coded projects have a well-documented
> set of common security failures. Every item below MUST be implemented.

### 🔴 CRITICAL — Will cause data breach if ignored

**1. Never expose secret keys to the browser**
```
WRONG: NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=...
RIGHT: SUPABASE_SERVICE_ROLE_KEY=... (no NEXT_PUBLIC_ prefix)

Rule: NEXT_PUBLIC_ variables are bundled into client JS and visible to anyone
who opens DevTools. Only the anon key and Supabase URL are safe to be public.
```

**2. Never use the Service Role key in client components**
```typescript
// WRONG — in any component file:
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// RIGHT — service role only in:
// - app/api/*/route.ts (server-side API routes)
// - app/admin/*/page.tsx (server components with auth check)
// - lib/supabase/server.ts
```

**3. Always validate AND sanitize all user inputs server-side**
```typescript
// WRONG: Trust client data directly
const { message } = await req.json()
await supabase.from('comments').insert({ message })

// RIGHT: Validate first, sanitize, then insert
import { z } from 'zod' // or manual validation
const schema = z.object({ message: z.string().min(10).max(1000) })
const parsed = schema.parse(body) // throws if invalid
const sanitized = parsed.message.replace(/<[^>]*>/g, '') // strip HTML
```

**4. Never store raw IP addresses — always hash them**
```typescript
// lib/utils.ts
import { createHmac } from 'crypto'
export function hashIP(ip: string): string {
  return createHmac('sha256', process.env.IP_HASH_SECRET!)
    .update(ip)
    .digest('hex')
}
// Store only the hash. The original IP is never written to disk.
```

**5. Row Level Security on ALL Supabase tables**
```
Every table must have RLS enabled.
The schema SQL above includes correct RLS policies.
Never disable RLS. Ever.
Test: log out of Supabase, try to read/write from anon client — verify only 
allowed operations work.
```

### 🟠 HIGH — Will cause abuse or data leakage if ignored

**6. Rate limiting on all API routes**
```typescript
// Minimum implementation using a Map (works for single-instance deploys):
// For production on Vercel (multiple instances), use Upstash Redis instead.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true // allowed
  }
  if (entry.count >= limit) return false // blocked
  entry.count++
  return true // allowed
}

// In API route:
const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
if (!rateLimit(ip, 5, 60 * 60 * 1000)) {
  return Response.json({ error: 'Too many requests.' }, { status: 429 })
}
```

**7. CSRF protection for forms**
```
Next.js 14 App Router API routes are NOT vulnerable to CSRF by default when
using JSON bodies (because browsers can't send cross-origin JSON with custom
Content-Type without a preflight). However, add this check as defence-in-depth:

In each API route:
const contentType = req.headers.get('content-type')
if (!contentType?.includes('application/json')) {
  return Response.json({ error: 'Invalid request' }, { status: 400 })
}
```

**8. Protect admin routes with server-side auth check**
```typescript
// app/admin/layout.tsx — THIS IS CRITICAL
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }) {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/admin/login') // Server-side redirect, not client-side
  }
  
  return <>{children}</>
}
// NEVER rely on client-side auth checks for protecting admin pages.
```

**9. Sanitize markdown output to prevent XSS in blog**
```typescript
// When rendering user-generated markdown, always use rehype-sanitize:
import rehypeSanitize from 'rehype-sanitize'

<ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeHighlight]}>
  {post.content}
</ReactMarkdown>

// This prevents a malicious post from injecting <script> tags.
// Even though only the admin writes posts, defence-in-depth applies.
```

### 🟡 MEDIUM — Best practices

**10. Security headers in next.config.ts**
```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // unsafe-eval needed for Three.js
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.supabase.co",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co https://commentanalyzer.googleapis.com",
    ].join('; ')
  }
]

const nextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  }
}
```

**11. Never log sensitive data**
```typescript
// WRONG:
console.log('User submitted:', { message, ip, email })

// RIGHT:
console.log('Comment received for post:', post_id)
// Never log: IPs (even hashed), email addresses, message content, API keys
```

**12. Validate Supabase Storage file uploads (admin only)**
```typescript
// When admin uploads cover images:
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

if (!ALLOWED_TYPES.includes(file.type)) throw new Error('Invalid file type')
if (file.size > MAX_SIZE) throw new Error('File too large')

// Also configure Supabase Storage bucket policies to only allow image types.
```

**13. Error messages must never leak implementation details**
```typescript
// WRONG (leaks stack trace / table names):
return Response.json({ error: error.message }, { status: 500 })

// RIGHT:
console.error('Comment insert failed:', error) // log internally
return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
```

**14. .gitignore must be created BEFORE first commit**
```
# .gitignore — minimum required entries:
.env.local
.env*.local
node_modules/
.next/
out/
.vercel/
*.log
```

**15. Dependency audit**
```bash
# Run after installing all packages:
npm audit
# Fix any high/critical vulnerabilities before deploying.
# Add to your pre-deploy checklist.
```

---

## 12. DEVELOPER RULES

> Rules for Ayman to follow during the build process.

### Git Rules
```
1. ALWAYS create a .gitignore BEFORE running git init or git add
2. NEVER run `git add .` without first checking `git status`
3. Check for .env.local in the staged files before every commit
4. Commit message format: "feat: add hero section" / "fix: rate limit bug" / "style: navbar"
5. Never commit directly to main — use feature branches when possible
```

### Code Rules
```
1. TypeScript is mandatory. No `any` types unless absolutely unavoidable.
2. Every component file should have an interface/type for its props.
3. Client components must be explicitly marked 'use client' at the top.
4. Server components (default in App Router) must NEVER import client-only libraries.
5. All API routes handle errors with try/catch — no unhandled promise rejections.
6. Every user-facing input must be validated both client-side (UX) AND server-side (security).
7. Responsive design: mobile breakpoint at 768px, tablet at 1024px.
8. All images must have alt text.
9. Use Next.js <Image> component for all images (automatic optimization).
10. GSAP should only be initialized on the client (use useEffect or useGSAP).
```

### Performance Rules
```
1. Three.js canvas must be lazy-loaded (dynamic import, no SSR).
2. AOS should only initialize on the client side.
3. Run Lighthouse after the build — target: Performance >85, Accessibility >90.
4. Compress all project screenshots to WebP format before adding to /public.
5. Fonts are loaded locally (woff2) — never from an external CDN in production.
```

### Testing Checklist (before deploying)
```
□ All environment variables set in Vercel dashboard
□ Supabase RLS policies tested with anon client
□ Contact form sends real email to your inbox
□ Comment moderation pipeline tested (try a vulgar comment)
□ Admin login works, unauthenticated access to /admin redirects to /admin/login
□ Blog post creates, publishes, and renders markdown correctly
□ Mobile layout checked on real device or DevTools
□ npm audit shows no high/critical vulnerabilities
□ .env.local NOT committed to git (check with: git log --all -- .env.local)
```

---

## 13. AGENT PROMPT TEMPLATES

> Use these prompts when instructing the Gemini agent in Antigravity.
> Always paste the relevant section of this resource pack as additional context.

### Prompt 0 — Initial Setup
```
You are building a personal portfolio website for Ayman Aqeel, a Full-Stack Developer 
from Malappuram, Kerala. Read the entire AYMAN_PORTFOLIO_RESOURCE_PACK.md file I've 
added to this project for full context on the design system, tech stack, security 
requirements, and section specifications.

Before writing any code:
1. Confirm you've read the resource pack
2. Set up the project structure exactly as defined in Section 4
3. Create the .gitignore file FIRST before any other file
4. Initialize the Next.js 14 project with TypeScript and Tailwind
5. Install all dependencies listed in Section 7
6. Set up the globals.css with all CSS variables from Section 3
7. Set up the tailwind.config.ts with the custom colors and fonts from Section 3

Do NOT start building components until setup is complete.
Do NOT add any packages not listed in the resource pack without asking first.
```

### Prompt 1 — Navbar
```
Build the Navbar component as specified in Section 8 of the resource pack.

Requirements:
- Fixed position, z-index 100
- Transparent background that transitions to blur/dark on scroll (use useEffect + scroll listener)
- "AA" monogram on the left linking to #hero
- Nav links: About, Skills, Projects, Education, Contact
- Blog link styled as an orange pill badge (exact colors from CSS variables in resource pack)
- Hamburger menu for mobile with fullscreen overlay

Use 'use client' directive.
Use Framer Motion for the background transition animation.
Follow the exact color values from the design system — no improvisation on colors.
```

### Prompt 2 — Hero Section
```
Build the Hero section component as specified in Section 8 of the resource pack.

Requirements:
- Full viewport height (100vh), snap-scroll section
- Three.js particle field background using @react-three/fiber
  - ~2000 particles, colors: mix of #FF4C00 and #E8E2D0
  - Mouse repulsion effect within 120px radius
  - Dynamically import with { ssr: false } to prevent SSR errors
- "AYMAN AQEEL" in Cabinet Grotesk variable font, massive size (var(--text-hero))
  "AQEEL" line in accent orange (#FF4C00)
- Cycling text using Framer Motion AnimatePresence (3 phrases, 3s interval)
- Tagline: "Software is going nowhere, ever." in italic, muted
- Live clock showing Malappuram, Kerala time (IST = UTC+5:30), updates every second
- GSAP entrance animation sequence as specified (staggered reveals)
- "Scroll to explore ↓" with breathing animation

Security: The Three.js canvas must not block accessibility — add aria-hidden="true" to the canvas wrapper.
Performance: Dynamically import the Three.js canvas. The text content should be visible even if JS fails.
```

### Prompt 3 — Supabase Setup
```
Set up the Supabase integration as specified in Section 5 of the resource pack.

Tasks:
1. Create lib/supabase/client.ts using createBrowserClient from @supabase/ssr
2. Create lib/supabase/server.ts using createServerClient from @supabase/ssr (for server components and API routes)
3. Create the types/index.ts file with TypeScript interfaces for Post, Comment, BannedIP

Security requirements (from Section 11 of resource pack):
- The service role key is ONLY used in server.ts and API routes — never in client.ts
- The browser client uses ONLY NEXT_PUBLIC_SUPABASE_ANON_KEY
- RLS is enforced on all tables (the SQL schema in Section 5 handles this)

Provide the SQL schema from Section 5 ready to run in Supabase SQL editor.
```

### Prompt 4 — Comments API Route
```
Build the POST /api/comments route as specified in Section 10 of the resource pack.

This route must implement the full moderation pipeline:
1. Input validation (post_id UUID + message 10-1000 chars)
2. IP extraction and hashing using the hashIP utility from lib/utils.ts
3. Check banned_ips table using service role Supabase client
4. bad-words filter check
5. Perspective API toxicity scoring
6. Status determination: approved (<0.6) / pending (0.6-0.85) / rejected + auto-ban (>0.85)
7. Insert into comments table using service role client
8. Rate limiting: 5 comments per IP per day

Security requirements from resource pack Section 11:
- Use service role key (server-side only)
- Hash IPs before storage
- Never expose whether an IP is banned in the response
- Return generic error messages — never leak internal details
- Add Content-Type check for CSRF protection
```

### Prompt 5 — Admin Panel
```
Build the admin panel as specified in Section 9 of the resource pack.

Pages to build:
1. /admin/login — Supabase email/password login
2. /admin/layout.tsx — Server-side auth guard (redirect if no session)
3. /admin/page.tsx — Posts dashboard
4. /admin/new-post — Post creation with markdown editor
5. /admin/edit/[id] — Post editing
6. /admin/moderate — Comment moderation table

CRITICAL security requirement (Section 11, Rule 8):
The auth check in layout.tsx MUST be server-side.
Use createServerClient to get the session. 
Use redirect() from 'next/navigation' (server-side redirect).
NEVER use a client-side auth check as the only protection for admin routes.
```

### Prompt 6 — Blog System
```
Build the blog pages as specified in Section 9 of the resource pack.

Pages:
1. /blog/page.tsx — Grid of BlogCard components, fetched from Supabase (published=true only)
2. /blog/[slug]/page.tsx — Individual post (SSG with 60s revalidation) + CommentSection

Components:
1. BlogCard.tsx — Cover image, title, date, read time, excerpt
2. PostContent.tsx — react-markdown with rehype-sanitize + rehype-highlight
3. CommentSection.tsx — Comment form + approved comments list

Security: 
- Use rehype-sanitize on markdown rendering (Section 11, Rule 9)
- Comment form submits to /api/comments, handles all response states
- Show IP notice: "Your IP address is logged for moderation purposes."
```

---

## 14. BUILD ORDER

Follow this exact order to avoid dependency/import errors:

```
PHASE 1: FOUNDATION
  □ Step 1:  .gitignore (FIRST, before anything else)
  □ Step 2:  Next.js init + TypeScript + Tailwind
  □ Step 3:  Install all dependencies (npm install)
  □ Step 4:  Download and add fonts to /public/fonts/
  □ Step 5:  globals.css — CSS variables, font-face, resets
  □ Step 6:  tailwind.config.ts — custom colors, fonts
  □ Step 7:  types/index.ts — all TypeScript interfaces
  □ Step 8:  lib/utils.ts — cn(), formatDate(), slugify(), hashIP()
  □ Step 9:  lib/supabase/client.ts + server.ts
  □ Step 10: .env.local + .env.example
  □ Step 11: Run Supabase SQL schema

PHASE 2: CORE UI
  □ Step 12: components/ui/Navbar.tsx
  □ Step 13: components/ui/SectionWrapper.tsx
  □ Step 14: components/ui/ScrollProgress.tsx
  □ Step 15: components/ui/CursorGlow.tsx
  □ Step 16: components/ui/Marquee.tsx
  □ Step 17: components/ui/Badge.tsx
  □ Step 18: hooks/useLenis.ts + hooks/useScrollSection.ts
  □ Step 19: app/layout.tsx (root layout with Lenis + cursor)

PHASE 3: MAIN PAGE SECTIONS
  □ Step 20: Hero section (Three.js + GSAP)
  □ Step 21: About section
  □ Step 22: Skills section
  □ Step 23: Projects section (AIRES + BIZCOD)
  □ Step 24: Education section
  □ Step 25: Contact section
  □ Step 26: app/page.tsx (assembles all sections)

PHASE 4: API ROUTES
  □ Step 27: lib/resend.ts
  □ Step 28: lib/moderation.ts
  □ Step 29: app/api/contact/route.ts
  □ Step 30: app/api/comments/route.ts
  □ Step 31: app/api/admin/ban/route.ts

PHASE 5: BLOG SYSTEM
  □ Step 32: components/blog/BlogCard.tsx
  □ Step 33: components/blog/PostContent.tsx
  □ Step 34: components/blog/CommentSection.tsx
  □ Step 35: app/blog/page.tsx
  □ Step 36: app/blog/[slug]/page.tsx

PHASE 6: ADMIN PANEL
  □ Step 37: components/admin/PostEditor.tsx
  □ Step 38: components/admin/ModerationTable.tsx
  □ Step 39: app/admin/layout.tsx (auth guard)
  □ Step 40: app/admin/login/page.tsx
  □ Step 41: app/admin/page.tsx
  □ Step 42: app/admin/new-post/page.tsx
  □ Step 43: app/admin/edit/[id]/page.tsx
  □ Step 44: app/admin/moderate/page.tsx

PHASE 7: FINAL
  □ Step 45: next.config.ts (security headers)
  □ Step 46: npm audit — fix any high/critical issues
  □ Step 47: Lighthouse audit — fix issues
  □ Step 48: Set all env vars in Vercel dashboard
  □ Step 49: Deploy to Vercel
  □ Step 50: Run full testing checklist (Section 12)
```

---

## QUICK REFERENCE

| Item | Value |
|------|-------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password, admin only) |
| Email | Resend |
| Deployment | Vercel |
| Background | #080808 |
| Accent | #FF4C00 |
| Accent Alt | #1AFF8C |
| Text | #E8E2D0 |
| Display Font | Cabinet Grotesk |
| Body Font | General Sans |
| Mono Font | Geist Mono |
| Admin URL | /admin (protected) |
| Blog URL | /blog (public, normal scroll) |
| Main URL | / (snap scroll, all sections) |

---

*Resource Pack prepared for Ayman Aqeel's Portfolio Project*
*Do not share this file publicly — it contains architectural details*
