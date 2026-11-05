# FSI Digital — Visual Design Standards & Craft Policy
**Document Status:** Approved by Founder & CEO (Phase 1: Adopt as Standard, Not a Project)  
**Effective Date:** November 2026  
**Governing Rule:** Subordinate to Revenue Generation & the $10,000+ MRR Mission

---

## 🎯 Purpose & Executive Context
This standard adopts the core craft heuristics of `unslop` (by Damir Sokolovsky) as an internal design quality checklist for FSI Digital. 

**This is a quality standard, NOT a standalone engineering project.**  
Per CEO Directive: **Revenue first, validation second, design polish third.**

---

## 🔒 Strict Non-Negotiable Guardrails

1. **Never Compromise Conversion Mechanics for Minimalism:**
   - Visual cleanups must **NEVER** remove or hide:
     - Clear funding eligibility explanations and rules.
     - Product recommendation cards ($19, $49, $79).
     - Transparent pricing and fee credit guarantees.
     - Lead capture forms and opt-ins.
     - Trust signals, customer evidence, and contact channels.
2. **Core Engine Freeze Enforced:**
   - Zero changes to `FundingRecommendationResult`, scoring weights, contract models, or rule engines.
3. **SEO Content Lock (60-Day Protection):**
   - Zero changes to body copy, headers, or structure of pages currently indexed and ranking on Google.
   - Any polish is strictly limited to shared layout components (header, footer, table cards).
4. **Zero Dependencies & Zero Vanity Overhead:**
   - No new npm packages.
   - No video generation scripts, Playwright recorders, or ffmpeg tools.

---

## 📐 The 7 Approved Craft Standards

### 1. Spacing System (4px Scale)
* All paddings, margins, gaps, and heights adhere to multiples of 4 (`4, 8, 12, 16, 20, 24, 32px`).
* Eliminates arbitrary Tailwind offsets (e.g. `mt-[13px]`, `py-[11px]`).
* Sibling cards in a grid must have identical padding.

### 2. Restrained Color Palette
* **Chrome is Quiet:** Backgrounds, sidebars, borders, and navigation use neutral graphite/slate ramps (`#0f172a`, `#1e293b`, `#f8fafc`, `#e2e8f0`).
* **Single Intentional Accent:** One primary brand accent (e.g., Emerald `#059669` or Blue `#2563eb`) used strictly for primary CTAs and active states.
* **No AI Tells:** Zero purple-to-cyan hue gradients, zero neon borders, zero gradient text, zero radial color blobs.

### 3. Professional Typography & Tabular Figures
* **Sentence Case:** Navigation, headings, table columns, and status badges use sentence case (e.g., `Application Status`, not `APPLICATION STATUS`).
* **Font Weights:** Limited to `400` (normal), `500` (medium), and `600` (semibold). No bloated 800/900 headings.
* **Tabular Numbers:** All financial figures and grant amounts must use `tabular-nums` so numbers align vertically in tables and scorecards.

### 4. Iconography
* Zero emoji in UI navigation, badges, or buttons (no `🚀`, `✨`, `💰`, `🔥`, `PRO ✨`).
* Standardize on Lucide line icons with a consistent stroke (`1.5` or `2`) and identical bounding boxes (`16px` or `20px`).

### 5. Factual, Direct-Response Copywriting
* Headlines state the exact business outcome for the Canadian founder.
* Zero marketing hype words (`"supercharge"`, `"revolutionize"`, `"seamless AI"`, `"unlock"`).
* Zero exclamation marks in UI (`!!`).
* Clear comparison contexts (e.g., `+12% vs last month`, not `+12%!!`).

### 6. Component Geometry & Details
* Nested corner radii follow the geometric rule: `Inner Radius = Outer Radius - Padding`.
* Hairline borders (1px) at 6–10% opacity instead of heavy colored borders.
* Depth is established via subtle surface steps, not dramatic colored drop shadows.

### 7. Motion Restraint
* Zero decorative loops (`animate-pulse`, `animate-ping`, breathing glows).
* Zero `transition-all` or bouncy springs.
* Micro-interactions are limited to crisp, purpose-driven color or opacity changes on hover/press.

---

## 📋 Phased Rollout Plan (Paced & Scoped)

* **Phase 1 (Complete):** Adopt and document standards without touching production code.
* **Phase 2 (Opportunistic Audit):** Inspect `/calculator`, `/checkout`, and shared components during regular maintenance.
* **Phase 3 (Reference Component):** Polish one single component (e.g., the Calculator Results Scoreboard) as a benchmark before touching anything else.
* **Phase 4 & 5 (QA & Verification):** Test mobile responsiveness and verify that checkout conversion remains stable or improves.
* **Phase 6 (Selective Expansion):** Only expand if the reference benchmark demonstrates superior usability and trust.
