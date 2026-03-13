# Hapkonic Premium SMM Tool — Phase-Based Implementation Plan

## Overview
Hapkonic is a premium Social Media Management and Analytics platform. This plan details the step-by-step construction of the platform, focusing on high-end design, social platform integration, and secure data management.

---

## Phase 1: Project Foundation & Design System
**Goal**: Establish a robust, scalable architecture with a premium glassmorphic UI.

1.  **Project Initialization**
    - [ ] Create Next.js 14+ project (App Router, TS, Tailwind).
    - [ ] Configure `tailwind.config.ts` with brand-specific tokens (Cyan, Purple, Pink, Glass effects).
    - [ ] Setup `globals.css` for global grain overlays and glassmorphic blurs.

2.  **UI Component Library**
    - [ ] `GlassCard`: The building block of the UI with backdrop filters and shimmer borders.
    - [ ] `PremiumButton`: Gradient-filled and glass-bordered buttons.
    - [ ] `MetricWidgets`: Dynamic stat cards for the dashboard.
    - [ ] `ChartSystem`: Recharts wrappers with glass styling.

3.  **Database Setup (Neon DB)**
    - [ ] Initialize Prisma with Neon serverless adapter.
    - [ ] Define models: `User`, `Organization`, `SocialAccount`, `PostMetrics`, `Campaign`.

---

## Phase 2: Landing Page & Brand Experience
**Goal**: Implement the "WOW" factor landing page using Three.js.

1.  **3D Scene Integration**
    - [ ] Implement `Scene3D` using `@react-three/fiber` and `@react-three/drei`.
    - [ ] Port floating glass geometries (Icosahedron, Torus, etc.) from the template.

2.  **Marketing Sections**
    - [ ] Port Hero, Stats, Features, and Pricing sections from `hapkonic-plan.html`.
    - [ ] Add scroll-triggered animations using Framer Motion.

---

## Phase 3: Secure Authentication & OAuth
**Goal**: Implement bulletproof authentication and social account linking.

1.  **NextAuth Setup**
    - [ ] Configure NextAuth.js with JWT session strategy.
    - [ ] Implement Google (Primary), Facebook, and Twitter OAuth providers.

2.  **Platform Integration (OAuth Hooks)**
    - [ ] Create OAuth flows for Instagram (via Facebook Graph API).
    - [ ] Securely store `accessToken` and `refreshToken` in Neon DB using encryption.
    - [ ] Implement token refresh logic.

---

## Phase 4: Dashboard & Analytics Engine
**Goal**: Build the internal workspace where users manage their social presence.

1.  **Dashboard Shell**
    - [ ] Recursive Sidebar and TopBar with glassmorphic design.
    - [ ] Command Palette (Cmd+K) for quick navigation.

2.  **Data Fetching & APIs**
    - [ ] Create API routes to aggregate metrics from multiple platforms.
    - [ ] Implement real-time updates for engagement stats (likes, comments, reach).

---

## Phase 5: Advanced SMM Features
**Goal**: Add the specialized tools that make the platform "Premium".

1.  **Post Scheduler**
    - [ ] Calendar view for planning posts across IG, FB, and Twitter.
    - [ ] Multi-platform composer with preview.

2.  **AI Insights**
    - [ ] Integrate LLM (Claude/GPT) for caption generation and sentiment analysis.
    - [ ] Brand health scoring.

---

## Verification Plan

### Automated Tests
- Linting and Type Checks (`npm run lint`, `tsc`).
- Prisma Schema Validation.

### Manual Milestones
- [ ] Landing page visuals match the HTML template perfectly.
- [ ] Successful OAuth round-trip for FB, IG, and Twitter.
- [ ] Data persistence verified in Neon DB dashboard.
