# DESIGN.md — Senior Design Skill, System Tokens & Open/Commercial Asset Registry

> A production-grade design skill and comprehensive design system specification for AI agents (Antigravity, Claude, Cursor), product designers, UI/UX designers, and frontend engineers.
>
> **Primary Rule:** Create interfaces that are clear, intentional, accessible, responsive, performant, emotionally coherent, and commercially safe.
>
> **Asset Policy:** Prefer assets with licenses that allow free commercial use such as **CC0 / Public Domain / MIT / ISC / Apache-2.0 / SIL OFL**, or provider-specific licenses that explicitly allow commercial use. Never assume that “free download” means “free for commercial use”.

---

## 0. ROLE & MINDSET

You are a **Senior Product Designer / UI Designer / UX Designer / Interaction Designer / Motion Designer / Design Systems Designer / Design Engineer**.

You think in systems rather than isolated screens.

Your responsibilities include:
- Product and interface strategy;
- Information architecture;
- Hierarchy and visual rhythm;
- Typography and readability;
- OKLCH color systems and theme contrast;
- Layout, spacing, and CSS Grid shells;
- Responsive behavior across breakpoints;
- Component systems (50+ primitives);
- Interaction design and interactive cursors;
- Motion choreography and micro-interactions;
- Accessibility (WCAG 2.1 AA+);
- Content hierarchy and microcopy;
- Iconography and vector assets;
- Empty, loading, and error states;
- Frontend feasibility in Tailwind CSS v4 and React 19;
- Performance-aware design and bundle efficiency;
- Commercial-license safety.

Design is not decoration. Every visual decision must help the user understand, decide, act, recover, or feel confidence.

---

# 1. NON-NEGOTIABLE DESIGN PRINCIPLES

## 1.1 Clarity before novelty
A beautiful interface that is difficult to understand is a failed interface.

Prioritize:
1. Comprehension;
2. Task completion;
3. Hierarchy;
4. Feedback;
5. Accessibility;
6. Aesthetics;
7. Novelty.

Novelty is allowed only when it does not weaken the first five.

## 1.2 One dominant idea per view
Every screen should communicate one dominant purpose.
- **Landing / Hero** → Primary value proposition;
- **Dashboard** → Current operational state and critical metrics;
- **Form / Settings** → Completion of a defined configuration task;
- **Detail View** → Deep understanding and manipulation of one entity;
- **Data Table** → Cross-item comparison, filtering, and bulk action;
- **Onboarding / Wizard** → Clear progression to the next required milestone.

If everything is visually loud, nothing is important.

## 1.3 Reduce cognitive load
- Employ progressive disclosure;
- Group items with shared lifecycle or ownership;
- Use clear semantic labels;
- Rely on familiar mental models and patterns;
- Provide sensible defaults;
- Design meaningful empty and error states;
- Offer inline real-time validation;
- Provide predictable action placement;
- Ensure short decision paths.

Never force users to remember information from another screen.

## 1.4 Design states, not screenshots
Every component must account for its lifecycle states:
- Default;
- Hover (`hover:bg-accent/80`);
- Focus-visible (`focus-visible:ring-2 focus-visible:ring-ring`);
- Active / Pressed (`active:scale-[0.99]`);
- Selected / Checked;
- Disabled (`disabled:cursor-not-allowed disabled:opacity-50`);
- Loading / Skeleton;
- Success;
- Warning;
- Error / Destructive;
- Empty;
- Read-only;
- Destructive confirmation;
- Offline / Retry.

## 1.5 Consistency beats isolated perfection
A slightly less impressive component that adheres to the system is always superior to a beautiful one-off component that introduces alien visual syntax.

---

# 2. DESIGN DECISION ORDER

When solving a design problem, decide strictly in this sequence:

1. **User goal** — What must the user accomplish?
2. **Information** — What data is necessary?
3. **Hierarchy** — What must be seen first, second, third?
4. **Interaction** — What actions are available?
5. **State model** — What can change, succeed, or fail?
6. **Layout** — How should content be structured and grouped?
7. **Typography** — How should hierarchy be encoded in type?
8. **Color** — Where is color semantically useful?
9. **Iconography / imagery** — What improves recognition?
10. **Motion** — What change benefits from temporal explanation?
11. **Polish** — Shadows, elevation, borders, subtle textures.

Never start with gradients, glassmorphism, 3D, or animation before the information and interaction model is proven.

---

# 3. INFORMATION ARCHITECTURE

## 3.1 Grouping rules
Group items only when they share:
- Purpose;
- Lifecycle;
- Ownership;
- Frequency of use;
- Semantic category;
- Action type.

Never group items merely because there is empty space on screen.

## 3.2 Navigation taxonomy
- **Top navigation** → Small number of major global destinations (`AppHeaderLayout.tsx`).
- **Sidebar** → Complex applications with persistent modules and dual-mode icon rails (`Sidebar.tsx`).
- **Tabs** → Sibling views of the same object or configuration space (`Tabs.tsx`, `SettingsLayout.tsx`).
- **Breadcrumbs** → Hierarchical location and deep navigation history (`Breadcrumb.tsx`).
- **Command palette** → Expert acceleration (`Command.tsx`), not primary discoverability.
- **Bottom navigation / Sheets** → Mobile actions and drawer interactions (`Drawer.tsx`, `Sheet.tsx`).

---

# 4. LAYOUT SYSTEM & APPLICATION SHELL

## 4.1 Spacing system
Strict 4px/8px rhythm:
```txt
2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
```
Do not invent arbitrary spacing values unless the composition genuinely requires optical balance.

## 4.2 Container strategy
- **Readable text / Article**: `640–760px` (`max-w-prose` or `max-w-2xl`)
- **Forms / Settings**: `640–880px` (`max-w-3xl`)
- **Application content / Dashboard**: `960–1280px` (`max-w-7xl`)
- **Wide data tables**: Fluid with controlled gutters (`w-full`)

## 4.3 Responsive Dual-Mode Shell (`MainLayout.tsx` & `Sidebar.tsx`)

The application implements a responsive, transition-aware CSS grid shell:

```tsx
<div
  className={cn(
    "grid min-h-0 transition-[grid-template-columns] duration-300 ease-out",
    sidebarOpen
      ? "grid-cols-[16rem_1fr]"
      : "grid-cols-[0rem_1fr] md:grid-cols-[4.5rem_1fr]",
  )}
>
```

- **Expanded Mode (`sidebarOpen: true`)**: Width `16rem` (`w-64`), categorized navigation sections (e.g. *Platform*, *Settings*), clear Lucide icons, full text labels, user avatar footer with name/email, direct logout button, and collapse button (`PanelLeftClose`).
- **Collapsed Icon-Rail Mode (`sidebarOpen: false`)**: Desktop mini icon-rail `4.5rem` (`md:grid-cols-[4.5rem_1fr]`). Icons remain centered and visible with accessibility tooltips (`title` and `aria-label`). Sidebar never vanishes abruptly on desktop.
- **Mobile Screens (`< md`)**: Collapsed state collapses cleanly to `0rem` off-canvas.

```text
┌────────────────────────────────────────────────────────────────────────┐
│  Sticky Header (h-16, backdrop-blur, border-b)                         │
│  [Logo] [SidebarToggle]           [Language] [ThemeTabs] [UserAvatar]   │
├───────────────────┬────────────────────────────────────────────────────┤
│  Sidebar          │  Main Content Area (`min-w-0 p-4 md:p-8`)          │
│  Mode 1: Expanded │                                                    │
│  (w-64 / 16rem)   │  PageContainer max-w-7xl                           │
│  - Logo + Text    │  ┌───────────────────────────────────────────────┐ │
│  - Categories     │  │ PageHeader (Title, Subtitle, Actions)         │ │
│  - Full NavLinks  │  ├───────────────────────────────────────────────┤ │
│  - User Card      │  │ Dynamic Grid / DataTable / Forms              │ │
│                   │  └───────────────────────────────────────────────┘ │
│  Mode 2: Rail     │                                                    │
│  (w-18 / 4.5rem)  │                                                    │
│  - Centered Icons │                                                    │
│  - Tooltips       │                                                    │
└───────────────────┴────────────────────────────────────────────────────┘
```

---

# 5. RESPONSIVE DESIGN

Responsive design means preserving **task priority**, not merely shrinking desktop UI.

## 5.1 Mobile transformation rules
- Stack secondary columns into single-column layouts;
- Move secondary actions into overflow menus or action sheets;
- Keep the primary CTA persistently visible;
- Reduce decorative imagery before sacrificing legibility;
- Convert dense tables into horizontal scroll areas or summary cards only if comparison clarity is maintained;
- Maintain touch-target comfort (minimum 44×44 CSS px);
- Never hide critical status information behind obscure menus.

## 5.2 Breakpoints (Tailwind CSS v4 standard)
```txt
sm   640px
md   768px
lg   1024px
xl   1280px
2xl  1536px
```

---

# 6. TYPOGRAPHY SYSTEM

The typography system relies on a high-legibility system sans stack with optional monospace accents:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Type Scale Reference:

| Role | Class | Size | Line Height | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Title (H1)** | `text-2xl font-bold tracking-tight` | `1.5rem (24px)` | `2rem (32px)` | `700` | `-0.025em` |
| **Section Header (H2)**| `text-lg font-semibold tracking-normal` | `1.125rem (18px)` | `1.75rem (28px)` | `600` | `0em` |
| **Card Header (H3)** | `text-base font-semibold` | `1rem (16px)` | `1.5rem (24px)` | `600` | `0em` |
| **Body (Default)** | `text-sm font-normal` | `0.875rem (14px)` | `1.25rem (20px)` | `400` | `0em` |
| **Body (Medium)** | `text-sm font-medium` | `0.875rem (14px)` | `1.25rem (20px)` | `500` | `0em` |
| **Caption / Subtitle** | `text-xs text-muted-foreground` | `0.75rem (12px)` | `1rem (16px)` | `400` | `0em` |
| **Kbd / Micro Badge** | `text-[10px] font-semibold uppercase` | `0.625rem (10px)` | `0.75rem (12px)` | `600` | `+0.05em` |

---

# 7. OKLCH COLOR SYSTEM & THEME TOKENS

All color tokens in this codebase are declared in `src/shared/styles/globals.css` using the modern **OKLCH** color space. OKLCH guarantees perceptual uniformity, wide color gamut reproduction, and predictable contrast.

### 7.1 Semantic Design Tokens Table

| Token Name | Tailwind Utility | Light Mode Value | Dark Mode Value | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `bg-background` | `oklch(0.99 0.004 106.47)` | `oklch(0.14 0.018 264.36)` | Base canvas background |
| **Foreground** | `text-foreground` | `oklch(0.17 0.024 264.36)` | `oklch(0.98 0.006 264.53)` | Primary body copy & text |
| **Card** | `bg-card` | `oklch(1 0 0)` | `oklch(0.18 0.021 264.36)` | Surfaces for cards, panels, tables |
| **Card FG** | `text-card-foreground` | `oklch(0.17 0.024 264.36)` | `oklch(0.98 0.006 264.53)` | Text on card surfaces |
| **Popover** | `bg-popover` | `oklch(1 0 0)` | `oklch(0.18 0.021 264.36)` | Dropdowns, menus, tooltips, dialogs |
| **Primary** | `bg-primary` | `oklch(0.55 0.22 262.88)` | `oklch(0.72 0.17 262.88)` | Primary brand action (Royal Indigo) |
| **Primary FG** | `text-primary-foreground` | `oklch(0.98 0.01 260)` | `oklch(0.14 0.018 264.36)` | High-contrast text on primary |
| **Secondary** | `bg-secondary` | `oklch(0.96 0.006 264.53)` | `oklch(0.25 0.025 264.36)` | Secondary button & subtle badge fills |
| **Muted** | `bg-muted` | `oklch(0.96 0.006 264.53)` | `oklch(0.25 0.025 264.36)` | Subtle element backgrounds |
| **Muted FG** | `text-muted-foreground` | `oklch(0.55 0.028 264.36)` | `oklch(0.72 0.025 264.36)` | Secondary captions, placeholders |
| **Accent** | `bg-accent` | `oklch(0.95 0.025 265.76)` | `oklch(0.28 0.035 264.36)` | Hover highlights, active tab fills |
| **Destructive**| `bg-destructive` | `oklch(0.58 0.238 28.48)` | `oklch(0.7 0.19 22.23)` | Dangerous actions, errors, delete |
| **Border** | `border-border` | `oklch(0.91 0.011 264.5)` | `oklch(1 0 0 / 10%)` | Subtle borders and dividers |
| **Input** | `border-input` | `oklch(0.91 0.011 264.5)` | `oklch(1 0 0 / 15%)` | Form field stroke |
| **Ring** | `ring-ring` | `oklch(0.62 0.19 262.88)` | `oklch(0.68 0.15 262.88)` | Focus ring outline |

### 7.2 Navigation Shell Tokens (Sidebar)

| Token Name | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| `--sidebar` | `oklch(0.98 0.006 264.5)` | `oklch(0.18 0.021 264.36)` | Dedicated sidebar background |
| `--sidebar-foreground` | `oklch(0.22 0.034 264.67)` | `oklch(0.98 0.006 264.53)` | Navigation item text and icons |
| `--sidebar-accent` | `oklch(0.94 0.018 265.76)` | `oklch(0.25 0.025 264.36)` | Hover and active item pill |
| `--sidebar-border` | `oklch(0.9 0.011 264.5)` | `oklch(1 0 0 / 10%)` | Sidebar right border divider |

### 7.3 Data Visualization Tokens (Charts)

- `--chart-1`: `oklch(0.64 0.22 41.12)` (Warm Amber/Coral)
- `--chart-2`: `oklch(0.6 0.12 184.7)` (Cyan/Teal)
- `--chart-3`: `oklch(0.4 0.07 227.39)` (Deep Slate Blue)
- `--chart-4`: `oklch(0.83 0.18 84.43)` (Sun Gold)
- `--chart-5`: `oklch(0.77 0.19 70.08)` (Tangerine)

---

# 8. COMPONENT DESIGN & PRE-BUILT CATALOG

The codebase includes 50+ atomic, accessible UI components in `src/shared/components/ui/`. Always reuse before authoring new primitives:

- **Actions & Triggers**: `Button`, `Toggle`, `ToggleGroup`, `DropdownMenu`, `ContextMenu`, `Menubar`.
- **Form Controls**: `Input`, `PasswordInput`, `SearchInput`, `InputOTP`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `DatePicker`, `Calendar`, `FileUpload`, `Form`, `FormField`, `InputError`, `Label`.
- **Data Display**: `DataTable`, `Table`, `Card`, `Badge`, `Avatar`, `Skeleton`, `Progress`, `PlaceholderPattern`.
- **Navigation**: `Breadcrumb`, `NavigationMenu`, `Pagination`, `Tabs`, `AppearanceTabs`, `LanguageSelector`, `TextLink`.
- **Overlays & Feedback**: `Dialog`, `AlertDialog`, `ConfirmDialog`, `Drawer`, `Sheet`, `Popover`, `HoverCard`, `Tooltip`, `Command`, `Alert`, `Toast`, `Toaster`.
- **Containers**: `Collapsible`, `Accordion`, `Carousel`, `ScrollArea`, `Separator`.

## 8.1 Buttons
- Hierarchy: Primary > Secondary > Outline / Ghost > Destructive > Link.
- Avoid multiple primary buttons competing in the same view.
- Action-oriented copy: "Save changes", "Create project", "Export CSV" (avoid ambiguous "Submit" or "OK").

## 8.2 Forms
- Always include visible labels; placeholders are hints, never label replacements.
- Inline validation rendered next to the offending input using `<InputError />`.
- Preserve user input on server or validation failure.
- Group related fields with clear subheadings.

## 8.3 Data Tables (`DataTable.tsx`)
- Structured headers with sort direction indicators (`ArrowUp`, `ArrowDown`, `ChevronsUpDown`).
- Type-safe sorting without `unknown` types.
- Row-click cursor affordance (`onRowClick && "cursor-pointer hover:bg-muted/50"`).
- Explicit loading skeleton states (`<Skeleton />`).
- Informative empty and error states.

---

# 9. ICONOGRAPHY STANDARDS

- **Primary Library**: **Lucide React** (Official: [https://lucide.dev/](https://lucide.dev/) • Directory: [https://lucide.dev/icons](https://lucide.dev/icons) • npm: [lucide-react](https://www.npmjs.com/package/lucide-react)) under the **ISC license**.
- **Package in Project**: `lucide-react` (pre-installed, tree-shakable, zero external runtime dependencies).
- **Direct Icon Lookup**: AI agents and developers can lookup or download icons directly from [https://lucide.dev/icons](https://lucide.dev/icons).
- **Consistent Stroke**: Match icon stroke width (`stroke-[1.75]` or `stroke-2`) with surrounding typography weight.
- **Size Consistency**:
  - Micro / Inline: `size-3.5` (14px)
  - Small / Button: `size-4` (16px)
  - Default / Nav: `size-4.5` to `size-5` (18-20px)
  - Feature / Hero: `size-8` to `size-10` (32-40px)
- **A11y**: Always provide `aria-hidden="true"` on decorative icons and provide `aria-label` or `title` on icon-only interactive buttons.

---

# 10. INTERACTION DESIGN & CURSOR POINTER STANDARDS

### Tailwind CSS v4 Cursor Preflight Rule
Tailwind CSS v4 preflight removes default `cursor: pointer` from `<button>` and interactive elements. 

To ensure consistent user affordance across the entire product:
1. **Global Base Layer (`globals.css`)**:
   Standard pointer styling is restored on `button:not(:disabled)`, `[role="button"]`, `[role="tab"]`, `[role="menuitem"]`, `select`, `summary`, `a[href]`, and `label[for]`.
2. **Explicit Component Classes**:
   Every clickable primitive (`Button`, `DropdownMenuTrigger`, `TabsTrigger`, `AccordionTrigger`, `Pagination`, clickable `Card`, `Toggle`) must explicitly declare `cursor-pointer` (with `disabled:cursor-not-allowed` and `disabled:pointer-events-none`).

---

# 11. BORDER RADII & SPATIAL SCALE

Declared relative to `--radius: 0.625rem` (10px):
- `rounded-sm`: `calc(var(--radius) - 4px)` = `6px` (Badges, small chips, sub-menu items)
- `rounded-md`: `calc(var(--radius) - 2px)` = `8px` (Inputs, buttons, dropdown items)
- `rounded-lg`: `var(--radius)` = `10px` (Cards, dialogs, navigation links)
- `rounded-xl`: `calc(var(--radius) + 4px)` = `14px` (Floating modal sheets, popovers)
- `rounded-full`: `9999px` (Avatars, status badges, circular pills)

---

# 12. ELEVATION, SHADOWS & GLASSMORPHISM

- **Level 0 (Flat)**: `border border-border bg-card` (Subtle tables, flat panels).
- **Level 1 (Card Lift)**: `shadow-2xs` / `shadow-xs` (Buttons, segmented controls).
- **Level 2 (Surface Lift)**: `shadow-sm border border-border` (Dashboard widgets, cards).
- **Level 3 (Dropdown & Flyout)**: `shadow-lg border border-border/80 bg-popover` (Menus, datepickers).
- **Level 4 (Modal & Dialog)**: `shadow-xl border border-border backdrop:bg-black/50 backdrop:backdrop-blur-sm`.
- **Glassmorphism**: `backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/70` (Sticky header, persistent floating bars).

---

# 13. MOTION & ANIMATION STANDARDS

Motion must explain change, never decorate for novelty.

## 13.1 Duration Guidelines
- Micro feedback: `80–160ms`
- Buttons / toggles: `120–200ms`
- Menus / popovers: `140–220ms`
- Cards / panels: `180–280ms`
- Dialogs / drawers: `220–360ms`
- Layout grid transitions: `300ms ease-out`

## 13.2 Reduced Motion Accessibility
Respect `prefers-reduced-motion` at all times:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
In Tailwind utilities: Pair animated hover effects with `motion-reduce:hover:translate-y-0 motion-reduce:transition-none`.

---

# 14. COMMERCIAL-ASSET LICENSE POLICY

Mandatory policy for all asset sourcing in enterprise environments:

## 14.1 Preferred License Classes
- **CC0 / Public Domain**
- **MIT / ISC**
- **Apache-2.0**
- **SIL Open Font License (OFL)** for web typography
- Provider-specific licenses that explicitly permit free commercial use without attribution.

## 14.2 Conditional Licenses
- **CC BY**: Commercial use permitted, but strict attribution is legally required.
- **CC BY-SA**: Requires share-alike licensing of derived works.

## 14.3 Prohibited for Commercial Production
- **CC BY-NC / CC BY-NC-SA / CC BY-NC-ND**
- "Personal use only" / "Non-commercial only"
- "Editorial use only" for branding or marketing UI
- Assets with ambiguous, unverified, or missing licenses.

---

# 15. TRUSTED ASSET REGISTRY

| Category | Source & Direct URL | License | Commercial Use | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Fonts** | [Google Fonts](https://fonts.google.com/) | SIL OFL / Apache 2.0 | Yes | Inter, Plus Jakarta Sans, JetBrains Mono |
| **Fonts** | [Fontsource](https://fontsource.org/) | Mirrors Open-Source | Yes | Self-hosted npm packages |
| **Icons** | [Lucide React](https://lucide.dev/) ([Icons Directory](https://lucide.dev/icons)) | ISC | Yes | Default project icon library (`npm i lucide-react`) |
| **Icons** | [Heroicons](https://heroicons.com/) | MIT | Yes | Clean Tailwind-compatible SVG |
| **Icons** | [Tabler Icons](https://tabler.io/icons) | MIT | Yes | Extensive icon family (5,000+ icons) |
| **Icons (Brands)** | [Simple Icons](https://simpleicons.org/) | CC0 | Yes (Mind Trademarks) | High-accuracy brand and tech logos |
| **Illustrations** | [unDraw](https://undraw.co/illustrations) | Custom Provider License | Yes | Free commercial SVG; no attribution required |
| **Illustrations** | [ManyPixels Gallery](https://www.manypixels.co/gallery) | Custom Provider License | Yes | Free commercial gallery; no asset repackaging |
| **Vector / Clip** | [Public Domain Vectors](https://publicdomainvectors.org/) | Public Domain (CC0) | Yes | Free vector graphics and illustrations |
| **Patterns** | [Pattern Monster](https://pattern.monster/) | MIT | Yes | Customizable SVG background patterns |
| **Photos** | [Unsplash](https://unsplash.com/) | Unsplash License | Yes | Free commercial use; mind model releases |
| **Photos** | [Pexels](https://www.pexels.com/) | Pexels License | Yes | Free commercial use; attribution appreciated |
| **Photos / Media** | [Pixabay](https://pixabay.com/) | Pixabay Content License | Yes | Commercial use subject to license terms |
| **Discovery** | [Openverse](https://openverse.org/) | Mixed CC / Public Domain | Conditional | Verify license per asset |
| **Motion** | [Motion](https://motion.dev/) | MIT | Yes | Modern React/JS animation standard |

---

# 16. INSTALLED SKILL KNOWLEDGE: `modern-web-guidance`

The repository is equipped with the specialized **Modern Web Guidance** agent skill located under:
`.agents/skills/modern-web-guidance/`

### 16.1 Domain Knowledge Base
- **`css/`**: Anchor positioning, container queries, `:has()`, `:user-valid`, subgrid, scroll-driven animations.
- **`html/`**: Native `<dialog>`, HTML Popover API, input types, inert attribute.
- **`js/`**: Document View Transitions API, `fetchpriority`, modern event handlers.
- **`performance/`**: Core Web Vitals (LCP, INP, CLS), `content-visibility`, native image lazy loading.
- **`ui-layout/`**: Responsive grid, sidebar shells, mobile bottom sheets, accessible tabs.
- **`accessibility/`**: Keyboard focus rings, aria live regions, contrast standards.

### 16.2 CLI Search & Retrieval
```bash
# Search guides by topic or keyword
npx modern-web-guidance search "<topic or keyword>"

# Retrieve a guide's complete implementation specifications
npx modern-web-guidance retrieve "<guide-id>"
```

---

# 17. DESIGN QA CHECKLIST

Before shipping any UI screen or feature:

- [ ] **Hierarchy**: Primary CTA identified in under 3 seconds; section boundaries distinct.
- [ ] **Typography**: Readable body contrast; consistent heading ranks; comfortable line lengths (45–80 chars).
- [ ] **Spacing**: 4px/8px rhythm strictly observed; consistent card and layout padding.
- [ ] **Color**: Semantic OKLCH tokens used exclusively; no hardcoded hex/RGB values.
- [ ] **Interactive States**: Hover, focus-visible, active, disabled, loading, empty, and error states designed.
- [ ] **Cursor Behavior**: `cursor-pointer` applied on all interactive triggers; `disabled:cursor-not-allowed` on disabled.
- [ ] **Accessibility**: Full keyboard navigability; visible focus rings; semantic HTML; screen-reader labels.
- [ ] **Responsive**: Verified across 375px (mobile), 768px (tablet), and 1280px+ (desktop); sidebar dual-mode functional.
- [ ] **Motion**: Duration between 120ms–300ms; `prefers-reduced-motion` respected.
- [ ] **Licensing**: All external assets sourced from trusted open/commercial registries with verified licensing.
