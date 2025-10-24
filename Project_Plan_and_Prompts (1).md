# Multi-Branch Restaurant System — Project Plan & Codex Prompts (MVP → Scale)
**Date:** 2025-10-23

> Default language of the app: **English**, with **Tiếng Việt** and **日本語** (BCP‑47 tags: `en`, `vi`, `ja`).  
> This document includes: **overall design**, **breakdown by phases**, **VIBE prompts for Codex**, **test prompts**, **checklists (DoD)**, and **go‑live gates**, with **APA in‑text citations** and **references** to accessible sources.

---

## 1) Goals & Scope (Summary)
- Build a **multi-branch (5 branches)** restaurant management SPA on an existing website (subpath/subdomain) using **React + Tailwind**; charts with **Recharts**; i18n with **i18next/react‑i18next** (default **English**, plus **Vietnamese** and **Japanese**). *(React Team; Tailwind; Recharts; i18next).* (React Team, n.d.; Tailwind Labs, n.d.; Recharts, n.d.; i18next, 2025)
- **Multi-tenant** data isolation by `branch_id` (shared DB/shared schema) for current scale; keep an upgrade path to **separate database per tenant** as we grow (Microsoft, 2025a, 2025b).
- **RBAC** with Super Admin / Branch Admin / Staff, with scope checks at every action, guided by **OWASP ASVS** (OWASP Foundation, n.d.).
- CI/CD via **GitHub Actions** with quality gates (unit/integration/E2E per **Test Pyramid**, ≥80% coverage, dependency audit) (GitHub, n.d.).

---

## 2) Architecture & Stack (MVP)
- **Frontend:** React 18 SPA, **Context API + useReducer**, **TailwindCSS**. Build in **production mode** for perf (React Team, n.d.).
- **Charts:** **Recharts** (SVG-based, responsive).
- **i18n:** **i18next + react‑i18next** with HTTP backend & language detector; **BCP‑47** tags; **Intl.DateTimeFormat/NumberFormat/DisplayNames** for locale formatting (i18next, 2025; W3C, 2020; MDN Web Docs, 2025a, 2025b, 2025c).
- **Data model (essentials):**
  - Branch(id, name, slug, timezone, opening_hours)
  - Table(id, branch_id, name, capacity, status)
  - Booking(id, branch_id, table_ids[], customer_id, start_at, end_at, status{pending|confirmed|cancelled|no_show}, party_size, notes)
  - Customer(id, branch_id, name, contact, tier{regular|vip|blacklist}, counters)
  - User(id, branch_id|null, role{super_admin|branch_admin|staff}, email, display_name)
  - Settings(branch_id|null, email_templates, break_times, theme)

**Performance & Security Notes.** Build **production** and optimize renders; use `<Profiler>` to locate hotspots (React Team, n.d.). Enforce RBAC + tenant scope on all flows (OWASP Foundation, n.d.).

---

## 3) Roadmap (Phased Delivery)
**Order:** Phase 0 (foundation) → Phase 1 (MVP core) → Phase 2 (enhancements) → Phase 3 (hardening & go‑live).

### Phase 0 — Foundation
- **P0.1** Bootstrap + Tooling (React, Tailwind, Jest/RTL, Playwright, CI skeleton)
- **P0.2** Router + RBAC Guards + Tenant context
- **P0.3** i18n (en default; vi/ja; Intl helpers; Language Switcher)

### Phase 1 — MVP Core
- **P1.1** Booking (≤30 days, auto‑confirm stub, auto‑cancel no‑show 15’)
- **P1.2** Table Management (visual grid, drag & drop, merge/split)
- **P1.3** Customer CRM (VIP/Blacklist rules)
- **P1.4** Analytics (Recharts dashboards)

### Phase 2 — Enhancements
- **P2.1** Export Excel/PDF (SheetJS/jsPDF)
- **P2.2** QR for Tables/Bookings
- **P2.3** Notifications (Notifications API + optional Push API)

### Phase 3 — Hardening & Go‑Live
- **P3.1** Tenant Hardening (ASVS) + Perf profiling
- **P3.2** Go‑Live Gates (CI)

---

## 4) VIBE Prompts for Codex (Build + Test + DoD)
*(VIBE = Vision → Inputs → Build → Evaluate. Copy/paste into Codex as separate prompts per item.)*

### 0.1 — Bootstrap + Tooling QA + CI/CD
**BUILD — VIBE Prompt**
```
Vision: Create a React (Vite) + Tailwind skeleton with testing & CI/CD.
Inputs: React 18, Tailwind, Jest, @testing-library/react, @testing-library/jest-dom, @playwright/test, GitHub Actions.
Build:
  1) Init Vite React app; add Tailwind (postcss/autoprefixer, content scanning).
  2) Add folders: src/app (router, providers), src/store (contexts, reducers), src/modules/*, src/shared/*.
  3) Install and configure Jest + RTL (jest.config + setupTests with jest-dom).
  4) Install Playwright, add basic e2e spec.
  5) package.json scripts: test, test:ci, e2e, e2e:ci, lint, typecheck, build.
  6) .github/workflows/ci.yml: on PR + push main → install, lint+typecheck, unit/integration with coverage (threshold ≥80%), build, e2e (headless), (optionally) deploy.
Evaluate: npm run test passes; npx playwright test passes; CI workflow green and enforces coverage ≥80%.
```

**TEST — VIBE Prompt**
```
Vision: Provide starter tests.
Inputs: App shell, one sample component, one util.
Build: 
  - Unit: util test, sample component renders title.
  - Integration (RTL): render layout + navigate route.
  - E2E (Playwright): open home, assert title/route.
Evaluate: All green locally and in CI; coverage report ≥80% lines/branches.
```

**DoD Checklist**
- [ ] CI runs on PR/main with coverage gate ≥80%.
- [ ] E2E smoke runs headless and passes.
- [ ] Production build emits no warnings. (React Team, n.d.)

---

### 0.2 — Router + RBAC + Tenant Context
**BUILD — VIBE Prompt**
```
Vision: Guard /admin routes by role (super_admin, branch_admin, staff) and tenant scope.
Inputs: auth context, tenant context (branch_id), enums for roles; AuthGuard HOC/route element.
Build:
  - Implement AuthGuard to check role and branch_id.
  - Super Admin can switch branches; Branch Admin/Staff restricted to their branch.
  - Conditional menus/actions by role.
Evaluate: Unauthorized users cannot access admin routes or actions; UX hides forbidden items.
```

**TEST — VIBE Prompt**
```
Vision: Verify guards and scope.
Inputs: mocked auth/tenant contexts.
Build:
  - Unit: tenantReducer set/get branch; guard logic for each role.
  - Integration: staff tries /admin/settings → redirected.
  - E2E: super_admin can enter admin; staff redirected.
Evaluate: All tests pass; no UI path allows privilege escalation.
```

**DoD Checklist**
- [ ] Every admin route has guard checks.
- [ ] Role + branch scope enforced across UI actions. (OWASP Foundation, n.d.)

---

### 0.3 — i18n (en + vi + ja) with Intl helpers
**BUILD — VIBE Prompt**
```
Vision: Add i18n with i18next/react-i18next; default 'en', plus 'vi' and 'ja'; lazy-load namespaces.
Inputs: i18next, react-i18next, i18next-http-backend, i18next-browser-languageDetector, Intl.* (Date/Number/DisplayNames).
Build:
  1) src/i18n.ts with supportedLngs ['en','vi','ja'], fallbackLng 'en', ns ['common','booking','tables','customers','settings','analytics'], backend.loadPath using BASE_URL.
  2) LanguageSwitcher using Intl.DisplayNames; persist choice (localStorage); update <html lang>.
  3) Helpers: formatDate(date, lng), formatMoney(amount, currency, lng). VND/JPY → 0 decimals.
  4) Replace hard-coded strings with t('ns:key'); add JSON for en/vi/ja per namespace.
Evaluate: Switching language updates UI; reload keeps selection; dates/currencies follow locale.
```

**TEST — VIBE Prompt**
```
Vision: Test i18n init, switching, and formatting.
Inputs: i18n config and helpers.
Build:
  - Unit: fallbackLng === 'en'; supportedLngs correct.
  - Unit: formatMoney(..., 'VND','vi') and (..., 'JPY','ja') produce 0 decimals.
  - Integration: switch to 'ja' updates visible labels; reload preserves 'ja' via detector.
  - E2E: booking flow renders localized labels end-to-end.
Evaluate: All pass; no hard-coded UI strings remain.
```

**DoD Checklist**
- [ ] 100% keys exist in en/vi/ja (no silent fallbacks).
- [ ] Locale persists and <html lang> reflects selection. (W3C, 2020; i18next, 2025; MDN Web Docs, 2025a–c)

---

### 1.1 — Booking (≤30 days, auto-confirm stub, auto-cancel 15’)
**BUILD — VIBE Prompt**
```
Vision: End-to-end booking with rules: date ≤30 days; auto-confirm (stub); auto-cancel 15' no-show.
Inputs: Booking/Customer/Table entities; Notifications API for toast/notify.
Build:
  - Components: BookingForm, BookingList; reducer for CRUD + status transitions.
  - Function canBook(date) enforcing 30-day limit.
  - Lightweight scheduler (poll/fake timers) to flip to 'no_show'/'cancelled' after 15'.
Evaluate: Create/update/cancel works; auto-cancel works; notifications show as expected.
```

**TEST — VIBE Prompt**
```
Vision: Validate booking rules & timers.
Inputs: reducer and canBook().
Build:
  - Unit: canBook rejects >30 days; reducer transitions correct.
  - Integration: submit valid form → 'confirmed'; advance time 15' → 'auto-cancelled'.
  - E2E: create booking → reload persists; fake timers advance to cancel.
Evaluate: All pass in CI.
```

**DoD Checklist**
- [ ] No booking allowed beyond 30 days.
- [ ] Auto-cancel triggers at 15 minutes.
- [ ] RBAC + branch scope respected.

---

### 1.2 — Table Management (visual grid, drag & drop, merge/split)
**BUILD — VIBE Prompt**
```
Vision: Visual board with drag & drop; statuses (Available/Reserved/Occupied/Cleaning); merge/split tables.
Inputs: table state machine; DnD lib or HTML5 DnD; memoization to avoid whole-board re-renders.
Build: TableBoard, TableCard, mergeTables(tableIds), splitTable; status updates reflected in UI.
Evaluate: Smooth drag; consistent states; merge/split safe.
```

**TEST — VIBE Prompt**
```
Vision: Ensure correctness of DnD and merge logic.
Inputs: state machine + board.
Build:
  - Unit: state transitions valid; merge preserves data.
  - Integration: mock DnD → position updates; UI consistent.
  - E2E: merge two tables → large-party booking → cancel → split back.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] No cross-branch merges.
- [ ] Split restores original seating/state.
- [ ] Production build perf baseline established. (React Team, n.d.)

---

### 1.3 — Customer CRM (VIP/Blacklist)
**BUILD — VIBE Prompt**
```
Vision: Customer profiles with auto VIP (completed >=5) and Blacklist (no_show >=2 or cancel >=3). Prevent new bookings for blacklisted customers.
Inputs: counters derived from booking changes.
Build: CustomerList, CustomerDetail; computeTier(counters) and canPlaceBooking(customer).
Evaluate: Tiers and blacklist update in real time and persist.
```

**TEST — VIBE Prompt**
```
Vision: Verify rules & UI enforcement.
Inputs: counters logic.
Build:
  - Unit: VIP and blacklist rules.
  - Integration: booking status changes → counters/tier update.
  - E2E: create 5 completed → VIP; 2 no-shows → blacklist; UI blocks bookings.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] Blacklisted customers cannot create bookings.
- [ ] No cross-branch customer data leakage (UI). (OWASP Foundation, n.d.)

---

### 1.4 — Analytics (Recharts)
**BUILD — VIBE Prompt**
```
Vision: Dashboards for occupancy and bookings by time/branch with Recharts.
Inputs: dataset transformers and filters.
Build: OccupancyChart, BranchCompareChart with responsive container.
Evaluate: Charts render and update with filters.
```

**TEST — VIBE Prompt**
```
Vision: Validate transformers and chart updates.
Inputs: sample datasets.
Build:
  - Unit: transformers produce correct series.
  - Integration: filter changes → dataset & chart update.
  - E2E: smoke: charts visible; bar/label counts expected.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] No crash when dataset is empty.
- [ ] Charts remain responsive. (Recharts, n.d.)

---

### 2.1 — Export Excel/PDF (SheetJS/jsPDF)
**BUILD — VIBE Prompt**
```
Vision: Export filtered bookings/customers to .xlsx (SheetJS) and .pdf (jsPDF).
Inputs: exporter utilities and filters.
Build: exportToXlsx(data, filename), exportToPdf(data, filename); buttons on Booking/Customers respecting current filters.
Evaluate: Files download and open; columns match filters.
```

**TEST — VIBE Prompt**
```
Vision: Validate exported content.
Inputs: sample data.
Build:
  - Unit: mapping to rows/columns correct.
  - Integration: filters affect exports; count rows.
  - E2E: click Export → verify filename and mimetype.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] No PII beyond branch scope.
- [ ] Filenames contain date + branch. (SheetJS; jsPDF)

---

### 2.2 — QR for Tables/Bookings
**BUILD — VIBE Prompt**
```
Vision: Render QR (SVG) for each table/booking that resolves to its detail URL.
Inputs: qrcode.react (or similar); include branch_id and booking_id.
Build: QrCodeCard value={url}; show/print as needed.
Evaluate: Scanning navigates to the correct page.
```

**TEST — VIBE Prompt**
```
Vision: Ensure QR correctness.
Inputs: QR component and URL builder.
Build:
  - Unit: renders SVG when value provided.
  - Integration: QR updates when entity changes.
  - E2E: open QR page; decode value; URL matches expected route.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] No QR for blacklisted bookings.
- [ ] (Phase 3 option) Signed URLs for tamper resistance.

---

### 2.3 — Notifications (Push optional)
**BUILD — VIBE Prompt**
```
Vision: Use Notifications API and (optionally) Push API with a service worker to alert near no-show.
Inputs: subscription storage per user/branch; graceful fallback when permission denied.
Build: sw.js registration; demo push endpoint; toast fallback.
Evaluate: Notifications show; closed tab still receives push (when enabled).
```

**TEST — VIBE Prompt**
```
Vision: Validate subscription lifecycle and permissions.
Inputs: client and mock server.
Build:
  - Unit: save/remove subscription; throttle sends.
  - Integration: permission denied → fallback; no crashes.
  - E2E: simulate push → notification displayed.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] No leakage of push endpoints/keys.
- [ ] Push only within branch scope. (W3C/MDN)

---

### 3.1 — Tenant Hardening (ASVS) + Perf
**BUILD — VIBE Prompt**
```
Vision: Enforce role+branch checks on EVERY action; add minimal audit log; profile hot screens with <Profiler>.
Inputs: ASVS (V2 AuthN, V4 Access Control, V9 Data Protection).
Build: UI middleware; audit entries on view/edit/delete; profiling instrumentation.
Evaluate: Pass ASVS checklist; perf baseline improved.
```

**TEST — VIBE Prompt**
```
Vision: Security and performance checks.
Inputs: routing and guards.
Build:
  - E2E: user of branch A cannot access branch B via guessed URLs.
  - Perf: capture baseline with Profiler; assert no extreme regressions.
Evaluate: All pass.
```

**DoD Checklist**
- [ ] 100% critical flows have role+branch verification.
- [ ] No privilege escalation paths; profiler stable. (OWASP Foundation, n.d.; React Team, n.d.)

---

### 3.2 — Go‑Live Gates (CI)
**BUILD — VIBE Prompt**
```
Vision: Enforce CI quality gates to block releases when failing.
Inputs: GitHub Actions.
Build: quality-gates job — unit/integration/E2E; coverage >=80%; npm audit (no critical); production build; (optional) smoke deploy.
Evaluate: PRs/releases blocked on failures.
```

**DoD Checklist**
- [ ] E2E smoke for login/booking/export.
- [ ] i18n: en/vi/ja switch + reload persists.
- [ ] Runbook + rollback steps documented.

---

## 5) Git Workflow & Environments
- **GitHub Flow**: feature branch → PR → review → merge → deploy (GitHub, n.d.).
- Environments: dev (PR deploy), staging (pseudo‑localization optional), production (go‑live gate).

---

## 6) Smoothness Assessment
The plan is **highly feasible** and should be smooth given: proven SPA stack; clear multi‑tenant pattern for 5 branches; i18n via established libs; and rigorous **CI gates** (OWASP ASVS + Test Pyramid). Key risks (tenant leakage, render hotspots, localization gaps) are mitigated by guards, profiling, and l10n‑lint/pseudo‑loc (OWASP Foundation, n.d.; React Team, n.d.; i18next, 2025).

---

## 7) References (APA 7th)
- GitHub. (n.d.). *GitHub flow*. https://docs.github.com/en/get-started/using-github/github-flow  
- GitHub. (n.d.). *GitHub Actions documentation*. https://docs.github.com/actions  
- i18next. (2025). *i18next documentation*. https://www.i18next.com/  
- MDN Web Docs. (2025a). *Intl.DateTimeFormat*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat  
- MDN Web Docs. (2025b). *Intl.NumberFormat*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat  
- MDN Web Docs. (2025c). *Intl.DisplayNames*. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames  
- Microsoft. (2025a). *Multitenant SaaS database tenancy patterns*. https://learn.microsoft.com/en-us/azure/azure-sql/database/saas-tenancy-app-design-patterns  
- Microsoft. (2025b). *Architectural approaches for storage and data in multitenant solutions*. https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/approaches/storage-data  
- OWASP Foundation. (n.d.). *Application Security Verification Standard (ASVS)*. https://owasp.org/www-project-application-security-verification-standard/  
- React Team. (n.d.). *Optimizing performance*. https://legacy.reactjs.org/docs/optimizing-performance.html  
- React Team. (n.d.). *<Profiler>*. https://react.dev/reference/react/Profiler  
- Recharts. (n.d.). *Recharts documentation*. https://recharts.org/  
- Tailwind Labs. (n.d.). *Tailwind CSS documentation*. https://tailwindcss.com/docs  
- Testing Library. (2024). *React Testing Library: Intro*. https://testing-library.com/docs/react-testing-library/intro/  
- Jest. (2025). *Getting started*. https://jestjs.io/docs/getting-started  
- W3C. (2020). *Language tags and locale identifiers for the Web (BCP‑47)*. https://www.w3.org/TR/ltli/  
- SheetJS. (2025). *SheetJS CE Docs*. https://docs.sheetjs.com/  
- jsPDF. (n.d.). *jsPDF – Documentation*. https://artskydj.github.io/jsPDF/docs/index.html  
- MDN Web Docs. (n.d.). *Using the Notifications API*. https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API  
- W3C. (n.d.). *Push API*. https://www.w3.org/TR/push-api/  
- Unicode CLDR. (n.d.). *Language plural rules*. https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html  
- Adyen. (n.d.). *Currency codes and minor units*. https://docs.adyen.com/development-resources/currency-codes  
- Google Fonts. (n.d.). *Noto Sans*. https://fonts.google.com/noto/specimen/Noto+Sans  
- Google Fonts. (n.d.). *Noto Sans JP*. https://fonts.google.com/noto/specimen/Noto+Sans+JP

## Δ Gaps & Remediation Plan (Bổ sung)

This section consolidates identified **gaps/risks** and the **minimum deltas** required to be production‑ready. Each item includes Risks → Remediation → Definition of Done (DoD) and references.

### 1) Backend Authorization & Tenancy Enforcement
- **Risks:** Current RBAC is mostly on the client; data partitioning by `branch_id` is not enforced at the server. Risk of privilege escalation and cross‑tenant reads.
- **Remediation:**
  - Stand up a backend (e.g., Node/NestJS/Express) backed by PostgreSQL with **Row Level Security (RLS)**.
  - Apply **server‑side policy** on every query (check `tenant_id/branch_id`), and implement **audit logs**.
  - Define a **migration path** from shared‑schema to db‑per‑tenant when thresholds are met (size, performance, compliance).
- **DoD:**
  - All protected routes verify role + ownership on the server.
  - RLS policies defined and tested; unit/integration tests proving denial on cross‑tenant access.
  - CRUD telemetry produces audit entries with actor, resource, tenant, timestamp.
- **Refs:** (OWASP Foundation, n.d.; Microsoft, 2025).

### 2) Background Jobs (Auto‑Cancel No‑Show; Reminders; Housekeeping)
- **Risks:** Relying on browser timers is unreliable (tab sleep, device offline). Time drift leads to missed cancellations or duplicate actions.
- **Remediation:**
  - Use **serverless cron** (Vercel Cron / Cloudflare Workers Cron).
  - Make jobs **idempotent**; store last run markers; use UTC with IANA zone mapping.
- **DoD:**
  - Timed flows run even if no client is online.
  - Retry/backoff and dead‑letter behavior are documented and tested.
- **Refs:** (Vercel, n.d.; Cloudflare, 2025).

### 3) Notifications & Permissioning
- **Risks:** Premature permission prompts reduce opt‑in; lack of Service Worker push means no offline notifications.
- **Remediation:**
  - Implement **Notifications API** with just‑in‑time prompts and **Push API** via Service Worker.
  - Provide graceful fallbacks (toasts/email/SMS) when permission denied.
- **DoD:**
  - End‑to‑end push demo works when app is closed; permission rates tracked.
- **Refs:** (MDN Web Docs, 2025; W3C, 2025).

### 4) Data Protection & Payments (GDPR/PCI Scope‑Down)
- **Risks:** PII collection implies GDPR duties if any EU data subjects; card handling may trigger full PCI DSS scope.
- **Remediation:**
  - Publish a **data policy** (purpose, retention, DSRs), sign **DPAs** with vendors.
  - Never store PAN; use **tokenization** through a PSP; restrict logs/analytics to non‑sensitive fields.
- **DoD:**
  - DSR workflows (access, erasure) tested.
  - PCI scope documented as **SAQ A** (no direct card data on systems).
- **Refs:** (European Union, 2016; PCI Security Standards Council, n.d.).

### 5) Real‑Time Concurrency & Double‑Booking
- **Risks:** Multiple clerks editing slots can race and create over‑bookings.
- **Remediation:**
  - Adopt optimistic concurrency (version columns) or server‑side locking on booking windows.
  - Realtime updates (WebSocket/SSE) to refresh slot state on all open clients.
- **DoD:**
  - Concurrency tests simulate conflicting edits; invariant “no overlapping seats” holds.
  - UI reflects updates within ≤2s across clients.

### 6) Observability, Runbooks & Quality Gates
- **Risks:** Without telemetry, issues in production are hard to triage; rollbacks are ad‑hoc.
- **Remediation:**
  - Structured logs with tenant correlation; metrics (no‑show rate, booking SLA), tracing on reservation flow.
  - Add **runbooks** (rollback, hotfix, incident response) and quality gates in CI.
- **DoD:**
  - Dashboards + alerts exist for core KPIs; SLOs defined and monitored.

### 7) AI‑Assisted Coding Guardrails
- **Risks:** Over‑reliance on AI can introduce insecure/untested code; secret leakage risks.
- **Remediation:**
  - Enforce **CODEOWNERS**, mandatory reviews, unit + E2E tests (Playwright) on CI.
  - Restrict AI context to sanitized repos; enable secret scanning. Track productivity & defect trends.
- **DoD:**
  - PRs generated with AI must pass all checks; security scanning passes; coverage ≥ target.
- **Refs:** (Peng et al., 2023; OpenAI, 2025).

---

### References (APA 7)
- Cloudflare. (2025). *Cron Triggers — Workers.* https://developers.cloudflare.com/workers/configuration/cron-triggers/
- European Union. (2016). *General Data Protection Regulation (EU) 2016/679.* https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- MDN Web Docs. (2025). *Notification (Notifications API).* https://developer.mozilla.org/en-US/docs/Web/API/Notification
- Microsoft. (2025). *Multitenant SaaS database tenancy patterns (Azure SQL Database).* https://learn.microsoft.com/en-us/azure/azure-sql/database/saas-tenancy-app-design-patterns
- OpenAI. (2025). *Codex is now generally available.* https://openai.com/index/codex-now-generally-available/
- OWASP Foundation. (n.d.). *Application Security Verification Standard (ASVS).* https://owasp.org/www-project-application-security-verification-standard/
- PCI Security Standards Council. (n.d.). *PCI Data Security Standard (PCI DSS).* https://www.pcisecuritystandards.org/standards/pci-dss/
- Peng, S., Kalliamvakou, E., Cihon, P., & Demirer, M. (2023). *The impact of AI on developer productivity: Evidence from GitHub Copilot.* arXiv. https://arxiv.org/abs/2302.06590
- Vercel. (n.d.). *Cron Jobs.* https://vercel.com/docs/cron-jobs
- W3C. (2025). *Push API (Recommendation).* https://www.w3.org/TR/push-api/
