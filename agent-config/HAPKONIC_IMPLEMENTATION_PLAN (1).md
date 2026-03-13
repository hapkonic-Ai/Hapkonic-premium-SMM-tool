# HAPKONIC — Complete Implementation Plan

## Platform: Premium Social Media Analytics & Strategy Dashboard

> This document is the master blueprint for building Hapkonic as a fully working web application. Each phase is broken into exact files to create, components to build, and code specifications. Follow phases in order — each builds on the previous.

---

## TECH STACK

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | 5+ |
| UI | React | 18+ |
| Styling | TailwindCSS + CSS Variables | 3.4+ |
| 3D Engine | Three.js + @react-three/fiber + @react-three/drei | r128+ |
| Animation | Framer Motion | 10+ |
| Charts | Recharts + Chart.js | 2.x / 4.x |
| State | Zustand | 4+ |
| Data Fetching | TanStack React Query | 5+ |
| Database | Neon (Serverless Postgres) + Prisma ORM | 5.x |
| Auth | NextAuth.js | 4+ |
| Cache | Upstash Redis (serverless) | — |
| Background Jobs | Inngest (serverless) | — |
| AI/ML | Python microservice (FastAPI) | 3.11+ |
| LLM | Anthropic Claude API | — |
| File Generation | @react-pdf/renderer, pptxgenjs | — |
| Deployment | Vercel (frontend + API) + Neon (DB) + Upstash (cache) | — |
| Icons | Lucide React | — |
| Maps | react-simple-maps + D3 geo | — |
| Tables | @tanstack/react-table | 8+ |

---

## PROJECT STRUCTURE

```
hapkonic/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (providers, fonts, metadata)
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # CSS variables, tailwind, glassmorphic tokens
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── onboarding/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Dashboard shell (sidebar + topbar + content area)
│   │   ├── overview/page.tsx     # Account Overview Dashboard
│   │   ├── content/page.tsx      # Content Performance
│   │   ├── audience/page.tsx     # Audience Analytics
│   │   ├── engagement/page.tsx   # Engagement Analytics
│   │   ├── competitors/page.tsx  # Competitor Analytics
│   │   ├── sentiment/page.tsx    # Sentiment Analysis
│   │   ├── campaigns/
│   │   │   ├── page.tsx          # Campaign list
│   │   │   └── [id]/page.tsx     # Campaign detail
│   │   ├── influencers/page.tsx  # Influencer Analytics
│   │   ├── revenue/page.tsx      # Conversion & Revenue
│   │   ├── scheduler/page.tsx    # Post Scheduling
│   │   ├── inbox/page.tsx        # Unified Inbox
│   │   ├── reports/page.tsx      # Custom Reporting
│   │   ├── alerts/page.tsx       # Alerts & Monitoring
│   │   ├── ai-insights/page.tsx  # AI Insights Panel
│   │   ├── brand-health/page.tsx # Brand Health Score
│   │   └── settings/
│   │       ├── page.tsx          # General settings
│   │       ├── accounts/page.tsx # Connected accounts
│   │       ├── team/page.tsx     # Team management
│   │       └── billing/page.tsx  # Plan & billing
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── inngest/route.ts          # Inngest webhook handler
│       ├── social/
│       │   ├── instagram/route.ts
│       │   ├── facebook/route.ts
│       │   ├── linkedin/route.ts
│       │   ├── youtube/route.ts
│       │   ├── twitter/route.ts
│       │   └── tiktok/route.ts
│       ├── analytics/
│       │   ├── overview/route.ts
│       │   ├── content/route.ts
│       │   ├── audience/route.ts
│       │   ├── engagement/route.ts
│       │   └── competitors/route.ts
│       ├── ai/
│       │   ├── sentiment/route.ts
│       │   ├── insights/route.ts
│       │   ├── captions/route.ts
│       │   └── predict/route.ts
│       ├── campaigns/route.ts
│       ├── influencers/route.ts
│       ├── reports/route.ts
│       ├── alerts/route.ts
│       └── scheduler/route.ts
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Scene3D.tsx           # Three.js 3D scene
│   │   ├── FloatingObjects.tsx   # 3D glass objects
│   │   ├── StatsBar.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   ├── ui/                       # Design system primitives
│   │   ├── GlassCard.tsx
│   │   ├── GlassPanel.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── DateRangePicker.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Tabs.tsx
│   │   ├── Toggle.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   └── Avatar.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── MetricWidget.tsx
│   │   ├── ChartContainer.tsx
│   │   ├── DataTable.tsx
│   │   ├── PlatformIcon.tsx
│   │   ├── NotificationCenter.tsx
│   │   ├── SearchCommand.tsx     # Cmd+K search
│   │   └── WidgetGrid.tsx
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── AreaChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── DonutChart.tsx
│   │   ├── RadarChart.tsx
│   │   ├── HeatmapChart.tsx
│   │   ├── GaugeChart.tsx
│   │   ├── SparklineChart.tsx
│   │   ├── FunnelChart.tsx
│   │   ├── TreemapChart.tsx
│   │   └── GeoMap.tsx
│   └── modules/
│       ├── overview/
│       │   ├── FollowerGrowthChart.tsx
│       │   ├── PlatformComparison.tsx
│       │   ├── KPITargetGauge.tsx
│       │   └── RecentActivityFeed.tsx
│       ├── content/
│       │   ├── PostGrid.tsx
│       │   ├── TopPerformers.tsx
│       │   ├── ContentTypeAnalysis.tsx
│       │   ├── HashtagHeatmap.tsx
│       │   ├── PostTimingHeatmap.tsx
│       │   └── PostDetailDrawer.tsx
│       ├── audience/
│       │   ├── DemographicsChart.tsx
│       │   ├── GeoDistribution.tsx
│       │   ├── ActiveHoursHeatmap.tsx
│       │   ├── InterestClusters.tsx
│       │   └── LoyaltySegments.tsx
│       ├── engagement/
│       │   ├── EngagementBreakdown.tsx
│       │   ├── EngagementByType.tsx
│       │   ├── EngagementTrend.tsx
│       │   └── StoryInteractions.tsx
│       ├── competitors/
│       │   ├── CompetitorTracker.tsx
│       │   ├── GrowthComparison.tsx
│       │   ├── ShareOfVoice.tsx
│       │   └── ContentGapMatrix.tsx
│       ├── sentiment/
│       │   ├── SentimentOverview.tsx
│       │   ├── SentimentTimeline.tsx
│       │   ├── MentionFeed.tsx
│       │   ├── CrisisDetection.tsx
│       │   ├── BrandPerceptionRadar.tsx
│       │   └── WordCloud.tsx
│       ├── campaigns/
│       │   ├── CampaignCreator.tsx
│       │   ├── CampaignDashboard.tsx
│       │   ├── ROICalculator.tsx
│       │   └── CampaignTimeline.tsx
│       ├── influencers/
│       │   ├── InfluencerDatabase.tsx
│       │   ├── AudienceOverlap.tsx
│       │   ├── AuthenticityScore.tsx
│       │   └── InfluencerComparison.tsx
│       ├── revenue/
│       │   ├── ConversionFunnel.tsx
│       │   ├── RevenueDashboard.tsx
│       │   └── CPACalculator.tsx
│       ├── scheduler/
│       │   ├── CalendarView.tsx
│       │   ├── PostComposer.tsx
│       │   ├── AICaptionGenerator.tsx
│       │   └── ApprovalWorkflow.tsx
│       ├── reports/
│       │   ├── ReportBuilder.tsx
│       │   ├── ReportPreview.tsx
│       │   └── ScheduledReports.tsx
│       ├── alerts/
│       │   ├── AlertsList.tsx
│       │   ├── AlertRules.tsx
│       │   └── AlertBanner.tsx
│       ├── ai-insights/
│       │   ├── InsightsPanel.tsx
│       │   ├── ViralityPredictor.tsx
│       │   ├── TrendDetection.tsx
│       │   └── PostingTimeRecommender.tsx
│       └── brand-health/
│           ├── HealthScoreGauge.tsx
│           ├── ComponentBreakdown.tsx
│           └── HealthTrend.tsx
├── lib/
│   ├── db.ts                     # Prisma client instance (Neon serverless driver)
│   ├── auth.ts                   # NextAuth config
│   ├── redis.ts                  # Upstash Redis client (@upstash/redis)
│   ├── inngest.ts                # Inngest client for background jobs
│   ├── api-client.ts             # Typed fetch wrapper
│   ├── utils.ts                  # Shared utilities
│   ├── constants.ts              # App-wide constants
│   ├── platforms/                # Social platform API clients
│   │   ├── instagram.ts
│   │   ├── facebook.ts
│   │   ├── linkedin.ts
│   │   ├── youtube.ts
│   │   ├── twitter.ts
│   │   └── tiktok.ts
│   └── ai/
│       ├── sentiment.ts          # Sentiment analysis client
│       ├── predictions.ts        # ML prediction client
│       └── captions.ts           # LLM caption generation
├── stores/
│   ├── useAuthStore.ts
│   ├── useDashboardStore.ts
│   ├── useFilterStore.ts
│   └── useNotificationStore.ts
├── hooks/
│   ├── useAnalytics.ts           # React Query hooks for analytics data
│   ├── usePlatformData.ts
│   ├── useRealtime.ts            # WebSocket hook
│   ├── useScrollReveal.ts
│   └── useMediaQuery.ts
├── types/
│   ├── analytics.ts
│   ├── platform.ts
│   ├── campaign.ts
│   ├── user.ts
│   └── api.ts
├── prisma/
│   ├── schema.prisma             # Full database schema
│   ├── seed.ts                   # Demo data seeder
│   └── migrations/
├── public/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── ai-service/                   # Python microservice
│   ├── main.py                   # FastAPI app
│   ├── models/
│   │   ├── sentiment.py
│   │   ├── virality.py
│   │   ├── posting_time.py
│   │   └── churn.py
│   ├── routes/
│   │   ├── sentiment.py
│   │   ├── insights.py
│   │   └── captions.py
│   ├── requirements.txt
│   └── Dockerfile
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
├── .env.example
└── docker-compose.yml            # Local dev only (AI service container)
```

---

## PHASE 1: FOUNDATION & CORE UI

**Duration: Sessions 1–8**
**Goal: Design system, landing page with 3D, auth, dashboard shell — all fully working**

---

### Session 1: Project Setup + Design System Tokens

**Create the Next.js project with all dependencies and establish the complete design system.**

#### Step 1: Initialize project
```bash
npx create-next-app@latest hapkonic --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd hapkonic
```

#### Step 2: Install all Phase 1 dependencies
```bash
npm install three @react-three/fiber @react-three/drei framer-motion recharts zustand @tanstack/react-query lucide-react clsx tailwind-merge class-variance-authority
npm install prisma @prisma/client @prisma/adapter-neon @neondatabase/serverless
npm install @upstash/redis @upstash/ratelimit
npm install next-auth
npm install -D @types/three
npx prisma init
```

> **Neon DB Setup:** Create a project at [neon.tech](https://neon.tech). Copy the connection string from the dashboard. Neon provides serverless Postgres with branching, autoscaling, and a generous free tier. Use the **pooled connection string** for Prisma (append `?pgbouncer=true&connect_timeout=15` to the URL).

#### Step 3: Create `app/globals.css`
Define the complete glassmorphic design token system:

```
/* TOKENS TO DEFINE */
--bg-primary: #06060E          /* Main background */
--bg-secondary: #0A0A1A        /* Section backgrounds */
--bg-card: rgba(255,255,255,0.04)
--glass-bg: rgba(255,255,255,0.06)
--glass-border: rgba(255,255,255,0.10)
--glass-hover: rgba(255,255,255,0.10)
--glass-blur: blur(20px) saturate(1.8)
--accent-cyan: #00F0FF
--accent-purple: #A855F7
--accent-pink: #EC4899
--accent-orange: #F97316
--accent-green: #10B981
--text-primary: #F0F0F5
--text-secondary: rgba(240,240,245,0.60)
--text-muted: rgba(240,240,245,0.35)
--gradient-main: linear-gradient(135deg, #00F0FF, #A855F7, #EC4899)
--radius-sm: 8px
--radius-md: 14px
--radius-lg: 20px
--shadow-glass: 0 8px 32px rgba(0,0,0,0.3)
--font-display: 'Outfit', sans-serif
--font-mono: 'Space Mono', monospace
```

Include: custom scrollbar styles, noise texture overlay, base reset, Tailwind directives, utility classes for glassmorphic effects (`.glass`, `.glass-hover`, `.glass-border`, `.gradient-text`).

#### Step 4: Create `tailwind.config.ts`
Extend Tailwind with all custom tokens, colors, fonts, blur values, animations (fadeUp, float, pulse, shimmer).

#### Step 5: Create `app/layout.tsx`
Root layout with: Google Fonts (Outfit + Space Mono), metadata, theme provider setup, QueryClient provider, Toaster.

#### Step 6: Create `lib/utils.ts`
Utility: `cn()` function using clsx + tailwind-merge. Format number helper. Date format helper. Platform color map.

---

### Session 2: UI Component Library (Part 1)

**Build the core design system components — these are used everywhere.**

#### Components to build:

**`components/ui/GlassCard.tsx`**
- Props: `variant: 'default' | 'elevated' | 'interactive' | 'compact'`, `className`, `children`, `glow?: boolean`
- Features: backdrop-filter blur, gradient top border shimmer (pseudo-element), hover lift + shadow, optional glow accent
- Must use CSS variables for all colors so theming works

**`components/ui/Button.tsx`**
- Use `class-variance-authority` for variants
- Variants: `primary` (gradient fill), `secondary` (glass bg + border), `ghost` (transparent), `danger` (red accent), `icon` (square)
- Sizes: `sm`, `md`, `lg`
- States: loading (spinner), disabled (opacity)
- Gradient hover glow effect on primary

**`components/ui/Input.tsx`**
- Glass-bordered input with floating label animation
- States: default, focused (accent border glow), error (red border + message), disabled
- Icon slot (left), clear button (right)

**`components/ui/Select.tsx`**
- Custom dropdown with glass panel, search/filter, multi-select mode
- Animated open/close with Framer Motion

**`components/ui/Badge.tsx`**
- Variants: `active` (green), `pending` (orange), `planned` (purple), `alert` (pink), `info` (cyan)
- Optional dot indicator, pulsing animation for alerts

**`components/ui/Modal.tsx`**
- Centered overlay with backdrop blur
- Framer Motion: backdrop fade + content scale/slide
- Variants: default (centered), full (fullscreen), side (slide from right)
- Close on escape, close on backdrop click

**`components/ui/Toast.tsx`**
- Zustand-based toast store
- Variants: success, warning, error, info
- Auto-dismiss timer, action button slot, stack behavior
- Slide-in from bottom-right with Framer Motion

**`components/ui/Tooltip.tsx`**
- Hover-triggered glass tooltip
- Auto-position (top/bottom/left/right)

**`components/ui/Skeleton.tsx`**
- Shimmer loading placeholder
- Variants: text, circle, rect, chart, table
- Matches the glass aesthetic (dark shimmer)

**`components/ui/Tabs.tsx`**
- Glass tab bar with animated active indicator (sliding underline)
- Controlled component with onChange

**`components/ui/EmptyState.tsx`**
- Glass card with icon, title, description, CTA button
- Used when no data is connected yet

**`components/ui/Avatar.tsx`**
- Image with fallback initials
- Sizes: sm (32px), md (40px), lg (56px)
- Optional status dot (online/offline)

---

### Session 3: UI Component Library (Part 2) — Charts

**Build reusable chart wrapper components using Recharts.**

**`components/charts/` — All charts share these properties:**
- Wrapped in `ChartContainer.tsx` which provides: glass card background, title, subtitle, filter controls slot, export menu (PNG/CSV), loading skeleton, empty state
- Use CSS variables for colors (not hardcoded)
- Responsive container (ResponsiveContainer from Recharts)
- Smooth animations on mount
- Tooltips with glass styling
- Custom cursor styles matching glassmorphic theme

**Charts to build:**

| Component | Recharts Base | Custom Features |
|-----------|--------------|-----------------|
| `LineChart.tsx` | LineChart | Multi-line, gradient area fill, animated draw, custom dot on hover |
| `AreaChart.tsx` | AreaChart | Stacked areas, gradient fills with transparency, smooth curve |
| `BarChart.tsx` | BarChart | Grouped/stacked, rounded corners, gradient fills, hover highlight |
| `DonutChart.tsx` | PieChart | Center label (total), animated segments, legend with values |
| `RadarChart.tsx` | RadarChart | Filled polygon with transparency, axis labels, comparison overlay |
| `HeatmapChart.tsx` | Custom SVG | 7×24 grid (days×hours), color intensity scale, cell tooltips, click handler |
| `GaugeChart.tsx` | Custom SVG | Semicircular gauge 0–100, animated fill, color zones (red/orange/green), center value |
| `SparklineChart.tsx` | LineChart (mini) | Tiny inline chart (60×20), no axes/labels, trend color (green up, red down) |
| `FunnelChart.tsx` | Custom SVG | Stepped funnel with labels, percentage drop-off per step |
| `TreemapChart.tsx` | Treemap | Proportional rectangles, category colors, hover label |
| `GeoMap.tsx` | react-simple-maps | World/country choropleth, tooltip on hover, zoom controls |

---

### Session 4: Three.js Landing Page — 3D Scene

**Build the complete 3D background scene and landing page hero.**

**`components/landing/Scene3D.tsx`**
- Uses `@react-three/fiber` Canvas with `alpha: true`, antialias
- Camera: PerspectiveCamera FOV 60, position [0, 0, 30]
- Lights: 3 PointLights (cyan, purple, pink) with orbital animation + AmbientLight
- All objects use MeshPhysicalMaterial: transparent, opacity 0.15, clearcoat 1.0, roughness 0.1
- Canvas is `position: fixed`, fills viewport, `pointer-events: none`, z-index 0

**`components/landing/FloatingObjects.tsx`**
3D Objects to create (each with glass + wireframe overlay):

| Object | Geometry | Position | Color | Animation |
|--------|----------|----------|-------|-----------|
| Icosahedron | IcosahedronGeometry(3, 1) | [-12, 8, -5] | cyan | rotX 0.003, rotY 0.005, floatY sin(t×0.8)×1.5 |
| Torus | TorusGeometry(2.5, 0.6, 16, 40) | [14, -5, -8] | purple | rotX 0.004, rotY 0.002, floatY sin(t×0.6)×2 |
| TorusKnot | TorusKnotGeometry(1.8, 0.5, 80, 16) | [-15, -2, -10] | green | rotX 0.003, rotY 0.002, floatY sin(t×0.5)×2.5 |
| Dodecahedron | DodecahedronGeometry(2, 0) | [10, 12, -6] | orange | rotX 0.002, rotY 0.004, floatY sin(t×0.7)×1.8 |
| Octahedron | OctahedronGeometry(2, 0) | [-8, -12, -3] | pink | rotX 0.005, rotY 0.003, floatY sin(t×1.0)×1.2 |
| Tetrahedron | TetrahedronGeometry(2, 0) | [-18, 5, -4] | pink | rotX 0.004, rotY 0.003, floatY sin(t×0.65)×1.7 |
| Cone | ConeGeometry(1.5, 3, 6) | [18, 3, -7] | cyan | rotX 0.002, rotY 0.004, floatY sin(t×0.9)×1.3 |
| Cylinder | CylinderGeometry(0.8, 0.8, 4, 8) | [6, -15, -6] | purple | rotX 0.003, rotY 0.005, floatY sin(t×0.55)×1.4 |
| Ring 1 | TorusGeometry(4, 0.15, 8, 60) | [0, 0, -12] | cyan wireframe | rotY 0.002, slow tilt |
| Ring 2 | TorusGeometry(5, 0.1, 8, 80) | [0, 0, -14] | purple wireframe | rotY -0.001 |
| 8–12 Small Spheres | SphereGeometry(0.3–0.8) | Random scattered | Random accent colors | Slow float, minimal rotation |

- Each glass object has a matching wireframe version at 1.2× scale
- Camera responds to mouse position (lerp toward mouse, factor 0.02)
- Camera Y shifts on scroll (scrollY × -0.005)
- Performance: max 25 meshes, check frame time, reduce on mobile

**`components/landing/Hero.tsx`**
- Badge: "◆ PREMIUM SOCIAL INTELLIGENCE" — glass pill, cyan text, stagger fadeUp 0.2s
- H1: "Analytics That Drive Growth" — gradient text on keywords, 7rem max, stagger 0.4s
- Subtitle: Description text, 1.3rem, secondary color, stagger 0.6s
- 2 CTAs: Primary gradient button + Secondary glass button, stagger 0.8s
- Scroll indicator: text "Scroll" + animated line at bottom, stagger 1.2s
- All animations use Framer Motion `motion.div` with `initial={{ opacity: 0, y: 30 }}` `animate={{ opacity: 1, y: 0 }}`

---

### Session 5: Landing Page — Remaining Sections

**Build all remaining landing page sections with scroll-triggered animations.**

**`components/landing/StatsBar.tsx`**
- 4 stat items in a grid: "15+ Modules", "5 Phases", "50+ Metrics", "14 Integrations"
- Animated counter (useInView trigger, count from 0 to target over 1.5s)
- Each stat: large gradient number + muted label

**`components/landing/FeaturesGrid.tsx`**
- 15 feature cards mapping to the 15 platform modules
- Each card: icon (emoji or Lucide), title, description
- Glass card with hover glow effect
- Scroll reveal with staggered delays (0.1s increment per card)
- Grid: auto-fit, minmax(320px, 1fr)

**`components/landing/DashboardPreview.tsx`**
- Fake "browser window" with traffic light dots
- Tab bar: Overview, Content, Audience, Campaigns, AI Insights
- Inside: mock KPI cards (4 across), mock bar chart, mock donut chart, mock data table
- All using the actual GlassCard, MetricWidget, chart components with hardcoded demo data
- Scroll reveal animation, bar chart animates on visible

**`components/landing/PricingSection.tsx`**
- 3 pricing tiers: Starter ($49), Professional ($149), Enterprise (Custom)
- Glass cards, middle card "Popular" highlighted with gradient border
- Feature list per tier with check/cross icons
- CTA buttons per tier

**`components/landing/TestimonialsCarousel.tsx`**
- Auto-scrolling carousel of testimonial glass cards
- Each: quote text, author name, company, avatar
- Pause on hover, dot indicators, smooth slide transition

**`components/landing/CTASection.tsx`**
- Large gradient orb (CSS radial-gradient, position absolute, blur 80px)
- Headline: "Ready to Transform Your Social Strategy?"
- Subtext + 2 buttons
- Scroll reveal

**`components/landing/Footer.tsx`**
- 4 columns: Product links, Resources, Company, Legal
- Bottom: copyright + social icons
- Glass border-top

**Assemble in `app/page.tsx`:**
- Fixed 3D canvas behind everything
- Noise overlay (fixed, opacity 0.03)
- Content wrapper (relative, z-index 2)
- Nav → Hero → Stats → Features → Dashboard Preview → Pricing → Testimonials → CTA → Footer
- Nav: fixed, glass background, shrinks on scroll

---

### Session 6: Authentication System

**`lib/auth.ts`** — NextAuth configuration:
- Providers: Google OAuth, Credentials (email+password), magic link (email)
- Session strategy: JWT
- Custom sign-in page: `/login`
- Callbacks: session (attach user role, org), jwt (persist data)

**`app/(auth)/login/page.tsx`**
- Centered glass card on 3D background (reuse Scene3D at lower opacity)
- Email + password fields, Google OAuth button, magic link option
- "Don't have an account?" link to signup
- Form validation with error states
- Submit → NextAuth signIn() → redirect to dashboard

**`app/(auth)/signup/page.tsx`**
- Name, email, password, confirm password
- Google OAuth button
- Terms checkbox
- Creates user in DB → auto login → redirect to onboarding

**`app/(auth)/onboarding/page.tsx`**
Multi-step wizard (4 steps with progress bar):

| Step | Screen | Fields |
|------|--------|--------|
| 1 | Company Setup | Company name, industry dropdown, company size, logo upload |
| 2 | Connect Accounts | Grid of platform cards (Instagram, Facebook, LinkedIn, YouTube, X, TikTok). Click → OAuth popup |
| 3 | Invite Team | Email input + role selector (Admin, Editor, Viewer). Add multiple. Skip option. |
| 4 | Complete | Success animation, redirect to dashboard |

---

### Session 7: Dashboard Shell

**`app/(dashboard)/layout.tsx`**
The master layout for all dashboard pages:
- Sidebar (left) + TopBar (top) + Content area (fluid)
- Sidebar and TopBar are shared across all pages
- Content area has padding, max-width, scroll

**`components/dashboard/Sidebar.tsx`**
- Collapsed (64px, icons only) / Expanded (260px, icons + labels)
- Toggle button at bottom
- Sections: Main (Overview, Content, Audience, Engagement), Intelligence (Competitors, Sentiment, AI Insights, Brand Health), Growth (Campaigns, Influencers, Revenue), Tools (Scheduler, Inbox, Reports, Alerts), Settings
- Each item: icon (Lucide) + label + optional badge count
- Active state: accent glow on left border + highlighted background
- Org logo at top, org switcher dropdown
- Mobile: hidden sidebar, hamburger menu triggers slide-over

**`components/dashboard/TopBar.tsx`**
- 64px height, glass background, fixed
- Left: page title breadcrumb
- Center: search bar (Cmd+K) with `SearchCommand.tsx` (command palette modal)
- Right: notification bell (badge count) + profile avatar dropdown
- `NotificationCenter.tsx`: dropdown panel listing recent alerts, mark as read

**`components/dashboard/MetricWidget.tsx`**
- Props: `title`, `value`, `change` (number), `changeLabel`, `icon`, `sparklineData?`, `size: 'sm' | 'md' | 'lg'`
- Glass card background
- Large formatted number (abbreviate: 1.2M, 8.4K)
- Change indicator: green up arrow / red down arrow + percentage
- Optional sparkline at bottom
- Loading skeleton state

**`components/dashboard/WidgetGrid.tsx`**
- CSS Grid wrapper with responsive columns
- Supports span-2, span-3, span-4 classes
- Gap: 1rem
- Reorder via drag-and-drop (use `@dnd-kit/core` or CSS-only initially)

**`components/dashboard/DataTable.tsx`**
- Uses `@tanstack/react-table`
- Glass table styling: glass header row, alternating subtle row backgrounds
- Features: sorting (click header), filtering (column search), pagination
- Status badge renderer, sparkline cell renderer, platform icon cell renderer
- Export to CSV button
- Loading skeleton for rows
- Empty state when no data

---

### Session 8: Demo Data Seeder + Polish

**`prisma/schema.prisma`**
Configure Prisma for Neon serverless Postgres, then define ALL models:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")       // Neon pooled connection string
  directUrl = env("DIRECT_DATABASE_URL") // Neon direct connection (for migrations)
}
```

> **Neon requires two connection strings:**
> - `DATABASE_URL` — pooled connection via PgBouncer (for app queries): `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?pgbouncer=true&connect_timeout=15`
> - `DIRECT_DATABASE_URL` — direct connection (for `prisma migrate`): `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?connect_timeout=15`
> Both are available in the Neon dashboard under "Connection Details."

**`lib/db.ts`** — Prisma client with Neon serverless driver:
```typescript
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Required for local development (Node.js needs a WebSocket polyfill)
neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(pool)

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

> This setup uses Neon's serverless driver which supports WebSocket connections — critical for Vercel Edge Functions and serverless environments where traditional TCP connections timeout.

Models:

```prisma
model User {
  id, email, name, image, role, orgId
  → Organization, SocialAccount[], Alert[]
}
model Organization {
  id, name, industry, logo, plan, settings (Json)
  → User[], SocialAccount[], Campaign[], Competitor[], Report[]
}
model SocialAccount {
  id, platform (enum), username, accessToken, refreshToken, profileUrl, followerCount, userId, orgId
  → Post[], AudienceSnapshot[], SentimentRecord[]
}
model Post {
  id, platformPostId, content, mediaType (enum), mediaUrl, publishedAt, accountId
  → PostMetric[]
}
model PostMetric {
  id, postId, date, reach, impressions, likes, comments, shares, saves, clicks, videoViews, watchTime
}
model AudienceSnapshot {
  id, accountId, date, totalFollowers, demographics (Json), topCountries (Json), topCities (Json), ageGroups (Json), genderSplit (Json), activeHours (Json)
}
model Campaign {
  id, name, description, startDate, endDate, budget, status (enum), orgId
  → CampaignPost[]
}
model CampaignPost {
  id, campaignId, postId
}
model Competitor {
  id, orgId, platform, username, followerCount, engagementRate
  → CompetitorSnapshot[]
}
model CompetitorSnapshot {
  id, competitorId, date, followers, engagementRate, postCount
}
model SentimentRecord {
  id, accountId, text, source, sentiment (enum: POSITIVE/NEUTRAL/NEGATIVE), score, date
}
model Alert {
  id, userId, type (enum), severity (enum), title, message, read, createdAt
}
model ScheduledPost {
  id, accountId, content, mediaUrl, scheduledAt, status (enum: DRAFT/SCHEDULED/PUBLISHED/FAILED)
}
model Report {
  id, orgId, name, type (enum), config (Json), schedule, lastGenerated
}
model Influencer {
  id, orgId, platform, username, followers, engagementRate, authenticityScore, tags (String[])
}
```

**Database migrations with Neon:**
```bash
# Generate migration files
npx prisma migrate dev --name init

# Apply to production (Neon uses DIRECT_DATABASE_URL for migrations)
npx prisma migrate deploy

# Seed the database
npx prisma db seed
```

> **Neon branching tip:** Create a `dev` branch in Neon for development and a `main` branch for production. Each branch is an isolated copy of your database. Use `dev` during development and merge schema changes to `main` on deploy.

**`prisma/seed.ts`**
Generate realistic demo data:
- 1 organization with 6 social accounts (one per platform)
- 200+ posts spread across accounts with varied media types
- 60 days of daily PostMetric records per post (randomized realistic numbers)
- 60 AudienceSnapshot records (growing follower trend)
- 3 campaigns with associated posts
- 5 competitors with snapshots
- 500+ sentiment records (70% positive, 20% neutral, 10% negative)
- 20 alerts of various types
- 10 scheduled posts
- 5 influencer profiles

This demo data powers the entire dashboard so every page has data to display.

---

## PHASE 2: ANALYTICS ENGINE & CORE DASHBOARDS

**Duration: Sessions 9–16**
**Goal: All 4 core analytics dashboards fully working with real-looking data**

---

### Session 9: Data Layer + API Routes

**Create all API routes that serve analytics data from the database.**

**`app/api/analytics/overview/route.ts`**
- GET: Returns aggregated metrics across all accounts for given date range
- Query params: `startDate`, `endDate`, `platform` (optional filter)
- Response: `{ totalFollowers, followerGrowth, totalReach, engagementRate, totalImpressions, platformBreakdown[], dailyMetrics[], recentPosts[] }`

**`app/api/analytics/content/route.ts`**
- GET: Returns posts with metrics, sortable/filterable
- Query params: `sort`, `order`, `platform`, `mediaType`, `startDate`, `endDate`, `limit`, `offset`
- Response: `{ posts[], topPerformers[], worstPerformers[], contentTypeStats[], hashtagStats[] }`

**`app/api/analytics/audience/route.ts`**
- GET: Returns latest audience data
- Response: `{ demographics, geoDistribution, languages, devices, activeHours, growthTimeline[], interestClusters[], loyaltySegments }`

**`app/api/analytics/engagement/route.ts`**
- GET: Returns engagement breakdowns
- Response: `{ commentRate, shareRate, saveRate, conversationRate, byContentType[], bySegment[], trend[], storyInteractions }`

**`hooks/useAnalytics.ts`**
- React Query hooks for each endpoint: `useOverview()`, `useContentPerformance()`, `useAudience()`, `useEngagement()`
- Include date range from global filter store
- Caching: 5 min stale time
- Error/loading states

**`stores/useFilterStore.ts`**
- Global Zustand store for dashboard-wide filters
- State: `dateRange`, `selectedPlatforms`, `comparisonMode`
- Persists to URL params

---

### Session 10: Account Overview Dashboard

**`app/(dashboard)/overview/page.tsx`**

Full page layout:

**Row 1: 4 KPI MetricWidgets** (full width grid, 4 columns)
- Total Followers (with sparkline of last 30 days)
- Engagement Rate (with +/- change)
- Total Reach (with sparkline)
- Total Impressions (with sparkline)

**Row 2: Engagement Timeline** (span 3 columns) + **Platform Comparison** (span 1)
- `FollowerGrowthChart.tsx`: Multi-line area chart, one line per platform, stacked option toggle. Date range selector. Zoom/pan.
- `PlatformComparison.tsx`: Horizontal grouped bar chart showing reach, engagement, followers per platform side-by-side

**Row 3: KPI vs Targets** (span 2) + **Recent Activity** (span 2)
- `KPITargetGauge.tsx`: 4 gauge charts in a row (followers target, engagement target, reach target, conversions target). Each shows actual vs goal.
- `RecentActivityFeed.tsx`: Scrollable list of latest posts with thumbnail, platform icon, top 3 metrics inline, relative timestamp. Click → navigate to content detail.

**Row 4: Full-width growth chart**
- Line chart showing total follower count over selected date range
- Annotations on significant growth/drop events

---

### Session 11: Content Performance Dashboard

**`app/(dashboard)/content/page.tsx`**

**Top: Tab navigation** — All Posts | Top Performers | Content Types | Hashtags | Timing

**Tab: All Posts**
- `PostGrid.tsx`: Card grid with post thumbnail, platform icon, mediaType badge, reach, engagement rate, date. Sortable header bar. Filter sidebar (platform, type, date range).
- Click a card → opens `PostDetailDrawer.tsx`: side panel with full post preview, all metrics listed, engagement timeline chart, AI insights (placeholder for Phase 3).

**Tab: Top Performers**
- `TopPerformers.tsx`: Ranked table of top 20 posts. Columns: rank, thumbnail, platform, type, reach, engagement, CTR. Gold/silver/bronze badges on top 3.

**Tab: Content Types**
- `ContentTypeAnalysis.tsx`: Grouped bar chart comparing Reels vs Images vs Carousels vs Shorts vs Stories. Metrics: avg reach, avg engagement rate, total posts. Summary stats above chart.

**Tab: Hashtags**
- `HashtagHeatmap.tsx`: Bubble chart — X: frequency of use, Y: avg engagement when used, bubble size: total reach. Color: platform. Hover: shows hashtag name + stats. Top 10 list sidebar.

**Tab: Timing**
- `PostTimingHeatmap.tsx`: 7×24 grid heatmap (Mon–Sun × 00:00–23:00). Color intensity = average engagement of posts published at that slot. Click cell → list of posts at that time.

---

### Session 12: Audience Analytics Dashboard

**`app/(dashboard)/audience/page.tsx`**

**Layout: 2-column responsive grid**

**Left column:**
- `DemographicsChart.tsx`: Donut chart for gender split (with center label) + horizontal bar chart for age groups. Animated segments on mount.
- `GeoDistribution.tsx`: World choropleth map. Color intensity = follower concentration. Hover country → tooltip with count. Below map: table of top 20 cities.

**Right column:**
- `ActiveHoursHeatmap.tsx`: 7×24 heatmap showing when audience is most active. Color scale from dark (inactive) to cyan (peak). Click cells for exact numbers.
- Language distribution: horizontal bar chart, top 10 languages
- Device usage: small donut chart (Mobile/Desktop/Tablet)

**Full width below:**
- `InterestClusters.tsx`: Bubble chart of AI-identified interest categories. Size = % of audience. Color = platform dominance. Click bubble → audience segment detail.
- `LoyaltySegments.tsx`: Segmentation table with 4 rows (Loyal, Active, Casual, Dormant). Columns: count, % of total, avg engagement, trend sparkline. Color-coded rows.

---

### Session 13: Engagement Analytics Dashboard

**`app/(dashboard)/engagement/page.tsx`**

**Row 1: 4 MetricWidgets**
- Comment Rate, Share Rate, Save Rate, Conversation Rate — each with sparkline + change %

**Row 2: Engagement by Content Type (span 2) + Engagement by Segment (span 2)**
- `EngagementByType.tsx`: Grouped bar chart — one group per content type, bars for comments/shares/saves
- Radar chart showing engagement profile per audience segment (loyal vs active vs casual)

**Row 3: Engagement Trend (full width)**
- `EngagementTrend.tsx`: Line chart with 3 lines (30-day, 60-day, 90-day moving average). Area fill below current line. Shaded region showing ±1 std dev.

**Row 4: Story Interactions (span 2) + Engagement Heatmap (span 2)**
- `StoryInteractions.tsx`: Stats grid showing: poll responses, quiz completions, reactions by type, swipe-ups. Each with icon + count + trend.
- Engagement heatmap by day of week (similar to contribution graph)

---

### Sessions 14–16: Testing, Polish, Responsive

- Test all 4 dashboards with demo seed data
- Ensure every chart renders correctly, handles empty data, shows loading skeletons
- Responsive testing: all dashboards work on mobile (single column stack)
- Dashboard page transitions with Framer Motion (fade + subtle slide)
- Loading states, error boundaries, empty states for every module
- Filter bar functionality (date range changes → all charts update)
- URL sync for filters (shareable dashboard links)

---

## PHASE 3: INTELLIGENCE & COMPETITIVE LAYER

**Duration: Sessions 17–24**
**Goal: AI insights, sentiment analysis, competitor tracking, alerts — all working**

---

### Session 17: AI Service Setup

**`ai-service/main.py`** — FastAPI application:
- `/sentiment` — analyze text, return sentiment score + label
- `/insights/posting-time` — given account metrics, return recommended times
- `/insights/virality` — given post draft features, return probability score
- `/insights/trends` — given recent data, return detected trends
- `/captions` — given parameters, generate caption variants using Claude API

For initial build: use Claude API for sentiment analysis and caption generation. Use statistical methods (not full ML) for posting time and virality — analyze historical data patterns. Can add TensorFlow models later.

**`lib/ai/sentiment.ts`** — Client wrapper to call AI service
**`lib/ai/predictions.ts`** — Client wrapper for insights endpoints
**`lib/ai/captions.ts`** — Client wrapper for caption generation

---

### Session 18: Sentiment Analysis Dashboard

**`app/(dashboard)/sentiment/page.tsx`**

- `SentimentOverview.tsx`: Large animated donut (positive/neutral/negative) with period selector
- `SentimentTimeline.tsx`: Stacked area chart showing sentiment ratio over time, annotated spikes
- `MentionFeed.tsx`: Scrollable list of mentions — sentiment badge (green/orange/red), platform icon, text snippet, date, source. Click to expand full context.
- `CrisisDetection.tsx`: Red-bordered alert card. Activates when negative exceeds threshold. Shows trigger mentions, timestamp, severity. Normally shows "No crisis detected" in green.
- `BrandPerceptionRadar.tsx`: Radar chart with 5 axes (Trust, Quality, Innovation, Value, Service). Scored from sentiment data clustering.
- `WordCloud.tsx`: Interactive word cloud of mention terms. Color = sentiment. Size = frequency. Click word → filter mention feed.

---

### Session 19: Competitor Analytics Dashboard

**`app/(dashboard)/competitors/page.tsx`**

- Setup panel: add competitors by platform + username. Stored in DB. Editable list.
- `GrowthComparison.tsx`: Multi-line chart — your brand + each competitor's follower count over time. Legend with toggle visibility per line.
- `ShareOfVoice.tsx`: Pie chart showing brand mention volume proportions. Trend line chart below showing SOV change over time.
- Top Competitor Posts: card grid showing competitor's best-performing public content with estimated metrics.
- `ContentGapMatrix.tsx`: Table/matrix showing content topics. Rows = topics. Columns = your brand + competitors. Cells show post count or checkmark. Highlights gaps (topics competitors cover that you don't).

---

### Session 20: AI Insights Panel

**`app/(dashboard)/ai-insights/page.tsx`**

- `PostingTimeRecommender.tsx`: shows recommended posting times per platform as a visual schedule. "Best time to post on Instagram: Tuesday 10am, Thursday 7pm" with confidence bars.
- `ViralityPredictor.tsx`: input area where user can paste draft post content → calls AI → shows probability score (0–100) with gauge visualization + explanation.
- `TrendDetection.tsx`: list of detected trending topics relevant to brand. Each: topic name, growth rate, relevance score, suggested action. Updated daily.
- `InsightsPanel.tsx`: AI-generated summary cards — "Your Reels outperform Carousels by 3.2x", "Audience engagement peaks on Tuesdays", "Consider posting more video content". Each is a glass card with icon + insight text + supporting data.

---

### Session 21: Alerts & Monitoring

**`app/(dashboard)/alerts/page.tsx`**

- `AlertsList.tsx`: Full list of all alerts, filterable by type and severity. Each alert: type icon, severity badge, title, message, timestamp, read/unread indicator. Click to expand details.
- `AlertRules.tsx`: Configuration panel where user defines alert thresholds. Table of rules: type, condition, threshold, notification method (in-app, email, push). Add/edit/delete rules.
- `AlertBanner.tsx`: Component rendered at top of dashboard when critical alert is active. Dismissible. Links to full alert detail.

**Real-time (WebSocket or polling):**
- For initial build: polling every 60 seconds via React Query refetch
- Later: upgrade to WebSocket for true real-time

---

### Sessions 22–24: Integration, Testing, Refinement

- Connect all AI service endpoints to dashboard components
- Test sentiment analysis with demo mention data
- Test competitor tracking with seeded competitor data
- Verify alert rules trigger correctly
- Polish all Phase 3 pages (loading states, animations, responsive)
- Ensure global date range filter works across all pages

---

## PHASE 4: CAMPAIGNS & REVENUE

**Duration: Sessions 25–32**
**Goal: Campaign management, influencer tracking, conversion analytics, brand health score**

---

### Session 25–26: Campaign Module

**`app/(dashboard)/campaigns/page.tsx`** — Campaign list
- Grid/list view of all campaigns with status badge, date range, budget, key metrics
- "Create Campaign" button → opens `CampaignCreator.tsx` modal wizard

**`CampaignCreator.tsx`** — Multi-step modal:
1. Basic info (name, description, dates, budget)
2. Select platforms and link posts
3. Set KPI targets (reach, engagement, conversions)
4. Assign team members
5. Review & create

**`app/(dashboard)/campaigns/[id]/page.tsx`** — Campaign detail
- `CampaignDashboard.tsx`: KPI row (reach, engagement, hashtag impressions, influencer contribution, spend vs budget)
- Timeline chart of campaign metrics over duration
- Linked posts grid with individual metrics
- `ROICalculator.tsx`: revenue attributed / total spend. Multiple attribution models toggle.

**`CampaignTimeline.tsx`**: Gantt-style chart showing all campaigns on a timeline. Color-coded by status.

---

### Session 27–28: Influencer Module

**`app/(dashboard)/influencers/page.tsx`**

- `InfluencerDatabase.tsx`: Searchable table of tracked influencers. Columns: avatar, name, platform, followers, engagement rate, authenticity score, tags. Add new influencer form.
- `AudienceOverlap.tsx`: Venn diagram visualization comparing brand audience vs selected influencer audience.
- `AuthenticityScore.tsx`: Detailed breakdown per influencer — follower quality, engagement pattern analysis, bot detection results. Score 0–100 gauge.
- `InfluencerComparison.tsx`: Side-by-side cards for 2–4 influencers with parallel metric rows for easy comparison.

---

### Session 29–30: Revenue & Conversions

**`app/(dashboard)/revenue/page.tsx`**

- `ConversionFunnel.tsx`: Visual funnel — impressions → clicks → landing page → leads → conversions. Shows drop-off % at each step.
- `RevenueDashboard.tsx`: Revenue timeline chart (from social traffic), top revenue-driving posts table, revenue by platform breakdown.
- `CPACalculator.tsx`: Input total spend → shows cost per acquisition, cost per lead, cost per click. Compare across platforms.
- Link click tracking table: all tracked links with click counts, platform, associated post.

---

### Session 31–32: Brand Health Score

**`app/(dashboard)/brand-health/page.tsx`**

- `HealthScoreGauge.tsx`: Large animated radial gauge (0–100). Color zones: red (<30), orange (30–60), green (>60). Center shows score + trend arrow.
- `ComponentBreakdown.tsx`: 5 smaller gauges showing component scores: Engagement (25%), Sentiment (20%), Growth (20%), Share of Voice (15%), Content Performance (20%). Each with mini trend sparkline.
- `HealthTrend.tsx`: Line chart showing brand health score over time (daily). Annotations on score change events.
- Comparison table: current score vs last week, last month, last quarter.

---

## PHASE 5: AUTOMATION & ENTERPRISE

**Duration: Sessions 33–40**
**Goal: Scheduling, inbox, reporting, settings — complete platform**

---

### Session 33–34: Post Scheduler

**`app/(dashboard)/scheduler/page.tsx`**

- `CalendarView.tsx`: Month/week/day calendar views. Posts shown as colored blocks. Drag to reschedule. Click to edit. Uses a calendar library or custom CSS grid.
- `PostComposer.tsx`: Rich modal — text editor with character counter per platform, image/video upload zone, platform toggle (which platforms to post to), hashtag suggestions, preview per platform, schedule date/time picker.
- `AICaptionGenerator.tsx`: Button in composer that calls AI → returns 3 caption variants. User picks one or edits. Shows generating animation while loading.
- `ApprovalWorkflow.tsx`: Draft → Review → Approved → Scheduled status pipeline. Inline comments on posts. Role-based (only Admins can approve).
- Queue view: list of all scheduled posts in chronological order with status indicators.

---

### Session 35–36: Unified Inbox

**`app/(dashboard)/inbox/page.tsx`**

- Left panel: list of all incoming messages/comments/mentions across platforms. Filters: platform, type (comment/DM/mention), read/unread, assigned.
- Right panel: conversation thread view. Shows context (original post or DM thread). Reply box at bottom that posts response via API.
- Assignment: assign conversation to team member via dropdown.
- Tags: label conversations (urgent, feedback, complaint, opportunity).
- Auto-reply rules: simple rule builder — if keyword X appears in comment, auto-reply with template Y.

---

### Session 37–38: Custom Reporting

**`app/(dashboard)/reports/page.tsx`**

- `ReportBuilder.tsx`: Drag-and-drop interface. Left sidebar with available widgets (metric cards, charts, tables, text blocks, images). Canvas area where widgets are placed. Configure each widget (data source, date range, title). Save report template.
- `ReportPreview.tsx`: Renders report as it would appear in PDF. Print-friendly layout.
- Export buttons: PDF (using @react-pdf/renderer or html2canvas + jsPDF), CSV (for raw data), PowerPoint (using pptxgenjs).
- `ScheduledReports.tsx`: Table of saved report schedules. Each: report name, frequency (daily/weekly/monthly), recipients (email list), last generated date, next scheduled date. Toggle active/inactive.
- Client dashboard links: generate read-only URL with token-based access (no login required).

---

### Session 39–40: Settings & Enterprise Features

**`app/(dashboard)/settings/page.tsx`**
- General: org name, logo upload, timezone, default date range, theme toggle
- `settings/accounts/page.tsx`: connected social accounts list. Connect/disconnect buttons. Last sync time. Token refresh status.
- `settings/team/page.tsx`: team member list. Invite by email. Role management (Admin, Editor, Analyst, Viewer). Remove member.
- `settings/billing/page.tsx`: current plan display, upgrade/downgrade buttons, payment method, invoice history.

**Enterprise features (for later iterations but scaffold now):**
- White-label: custom logo, custom colors (CSS variable overrides), custom domain (CNAME instructions).
- RBAC: granular permissions matrix (per module read/write/admin).
- API key management: generate/revoke API keys, usage stats.
- Audit log: table of all user actions with timestamp, user, action, resource.

---

## POST-LAUNCH: DEPLOYMENT & OPERATIONS

### Deployment Architecture (Fully Serverless)

Hapkonic runs on a fully serverless stack — no containers to manage, no servers to scale.

| Service | Provider | Purpose |
|---------|----------|---------|
| Frontend + API Routes | **Vercel** | Next.js hosting, edge functions, serverless API |
| Database | **Neon** | Serverless Postgres with autoscaling, branching, and connection pooling |
| Cache | **Upstash Redis** | Serverless Redis for caching, rate limiting, sessions |
| Background Jobs | **Inngest** | Serverless event-driven functions (scheduled data pulls, report generation) |
| AI Service | **Vercel Functions** or **Modal** | Python inference (sentiment, predictions) |
| File Storage | **Vercel Blob** or **Cloudflare R2** | Image uploads, generated reports |
| Email | **Resend** | Transactional emails, report delivery |

### Neon Database Configuration

**Create Neon project:**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project (select nearest region to your users)
3. Create two branches: `main` (production) and `dev` (development)
4. Copy both connection strings from dashboard

**Neon settings to configure:**
- **Autoscaling:** Enable autoscaling from 0.25 to 4 compute units (scales to zero when idle — saves cost)
- **Connection pooling:** Enabled by default via PgBouncer (use the pooled connection string for app queries)
- **Branching:** Use `dev` branch during development. Create feature branches for testing migrations. Merge to `main` on deploy.
- **IP Allow List:** Restrict to Vercel's IP ranges for production

**`docker-compose.yml`** (local development only)
```yaml
services:
  ai:
    build: ./ai-service
    ports: ["8000:8000"]
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
```
> In local dev, Next.js connects directly to your Neon `dev` branch — no local Postgres needed. Only the AI Python service runs in Docker locally. Upstash Redis is used directly (no local Redis needed — free tier is sufficient for dev).

**`.env.example`**
```
# Neon Database (get both from neon.tech dashboard → Connection Details)
DATABASE_URL=postgresql://user:pass@ep-xxx-yyy.us-east-2.aws.neon.tech/neondb?pgbouncer=true&connect_timeout=15
DIRECT_DATABASE_URL=postgresql://user:pass@ep-xxx-yyy.us-east-2.aws.neon.tech/neondb?connect_timeout=15

# Upstash Redis (get from upstash.com dashboard)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# Auth
NEXTAUTH_SECRET=... (generate with: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Social Platform APIs
INSTAGRAM_APP_ID=...
INSTAGRAM_APP_SECRET=...
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
YOUTUBE_API_KEY=...
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TIKTOK_CLIENT_KEY=...
TIKTOK_CLIENT_SECRET=...

# AI
ANTHROPIC_API_KEY=...
AI_SERVICE_URL=http://localhost:8000

# Inngest (background jobs)
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Set environment variables
vercel env add DATABASE_URL
vercel env add DIRECT_DATABASE_URL
# ... (add all env vars)

# Deploy
vercel --prod
```

**`vercel.json`** (optional overrides):
```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

**Vercel + Neon integration:**
- Install the Neon integration from Vercel Marketplace → auto-provisions `DATABASE_URL` and `DIRECT_DATABASE_URL` as env vars
- Preview deployments automatically get a Neon branch (isolated database per PR)

### Background Jobs with Inngest

Replace BullMQ (requires a server) with Inngest (serverless):

**`lib/inngest.ts`**
```typescript
import { Inngest } from 'inngest'
export const inngest = new Inngest({ id: 'hapkonic' })
```

**`app/api/inngest/route.ts`** — Inngest webhook handler

**Scheduled functions:**
| Function | Schedule | Purpose |
|----------|----------|---------|
| `sync-instagram` | Every 15 min | Pull latest Instagram metrics |
| `sync-facebook` | Every 15 min | Pull latest Facebook metrics |
| `sync-linkedin` | Every 1 hour | Pull latest LinkedIn metrics |
| `sync-youtube` | Every 1 hour | Pull latest YouTube metrics |
| `sync-twitter` | Every 15 min | Pull latest X metrics |
| `sync-tiktok` | Every 1 hour | Pull latest TikTok metrics |
| `compute-daily-rollups` | Daily 2am | Aggregate daily metrics into rollup tables |
| `run-sentiment-analysis` | Every 30 min | Process new mentions through sentiment model |
| `check-alert-rules` | Every 5 min | Evaluate alert conditions, send notifications |
| `generate-scheduled-reports` | Daily 6am | Generate and email scheduled reports |
| `refresh-competitor-data` | Every 6 hours | Pull competitor public metrics |

**`next.config.js`**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.fbcdn.net' },
      { protocol: 'https', hostname: '*.cdninstagram.com' },
      { protocol: 'https', hostname: '*.googleusercontent.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ['localhost:3000'] },
  },
}
module.exports = nextConfig
```

### Performance Targets

| Metric | Target |
|--------|--------|
| Landing page LCP | < 2.5s |
| Dashboard page load | < 1.5s |
| Chart render time | < 500ms |
| API response time (cached) | < 50ms (Upstash edge cache) |
| API response time (DB query) | < 200ms (Neon pooled) |
| Neon cold start | < 500ms (first query after idle) |
| 3D scene FPS | > 30fps on mid-range devices |
| Lighthouse score | > 90 (performance) |
| Bundle size | < 300KB initial JS |

### Testing Strategy

| Type | Tool | Coverage Target |
|------|------|----------------|
| Unit | Vitest | All utility functions, store logic |
| Component | React Testing Library | All UI components |
| Integration | Playwright | Auth flow, dashboard navigation, filter interactions |
| Visual | Chromatic / Percy | All component states |
| API | Vitest + Supertest | All API routes |
| E2E | Playwright | Full user journey: signup → connect → view dashboard → export report |
| DB | Neon branching | Each test run uses isolated Neon branch, wiped after |

---

## IMPLEMENTATION NOTES

### For each session, Claude should:

1. **Create all files** listed for that session as complete, working code
2. **Use the demo seed data** — never leave a dashboard page empty
3. **Follow the glassmorphic design system** — every component uses CSS variables, glass effects, smooth animations
4. **Make everything responsive** — test mobile layout for every page
5. **Include loading/error/empty states** — every data-fetching component handles all 3 states
6. **Use TypeScript strictly** — no `any` types, proper interfaces for all data
7. **Keep components modular** — each file should be independently importable and testable
8. **Test after each session** — run dev server and verify everything renders

### Design Principles

- **Glass everywhere**: every card, panel, sidebar, modal, dropdown uses backdrop-filter blur + translucent backgrounds
- **Gradient accents**: primary actions and highlights use the cyan→purple→pink gradient
- **Depth through layers**: content has clear z-index hierarchy (3D scene → noise → content → modals)
- **Animate with purpose**: page transitions, chart entrances, hover states, loading transitions — all using Framer Motion
- **Data density done right**: dashboards show a lot of data but never feel cluttered — proper spacing, visual hierarchy, progressive disclosure

---

*End of implementation plan. Begin with Phase 1, Session 1.*
