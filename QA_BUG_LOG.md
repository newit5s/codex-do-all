# QA Bug Log — Phase 0 & Phase 1 Regression

## Test Execution Summary
- `npm run test -- --watch=false`
- `npm run lint`
- `npm run typecheck`
- `npm run e2e`

## Issues Found

### BUG-001: Locale-aware number formatting expectation mismatch
- **Phase**: 0.3 (i18n foundation)
- **Severity**: Medium — automated test suite fails and blocks CI.
- **Status**: Open
- **Description**: The Jest suite fails because the Vietnamese locale number expectation uses a comma thousands separator (`'1,024'`), but `Intl.NumberFormat` with `vi` correctly outputs `'1.024'`. The incorrect assertion breaks the test run.
- **Steps to Reproduce**:
  1. Run `npm run test -- --watch=false`.
  2. Observe failure in `__tests__/intl.test.ts` for "formats numbers".
- **Evidence**: Test failure log shows `Expected: "1,024"` vs `Received: "1.024"`. 【4d5b96†L1-L42】【F:__tests__/intl.test.ts†L1-L18】
- **Suggested Fix**: Update the test (and any dependent UI copy) to expect the locale-correct separator (`'1.024'`) or adjust the formatting helper if the product requirement is actually comma-based.

### BUG-002: Playwright E2E spec executed by Jest unit runner
- **Phase**: 0.1 (tooling foundation)
- **Severity**: High — Jest run fails before completing due to environment mismatch.
- **Status**: Open
- **Description**: `jest` picks up `e2e/app.spec.ts` and attempts to execute it in the jsdom environment. The Playwright bundle expects `TransformStream`, which is undefined under Jest, causing the run to abort.
- **Steps to Reproduce**:
  1. Run `npm run test -- --watch=false`.
  2. After the initial unit test failure, observe Jest throwing `ReferenceError: TransformStream is not defined` sourced from `e2e/app.spec.ts`.
- **Evidence**: Stack trace demonstrates Jest loading Playwright spec. 【810e87†L1-L14】
- **Suggested Fix**: Configure Jest to ignore the `e2e/` directory (e.g., via `testPathIgnorePatterns`) or rename Playwright files to `.e2e.ts` and update `testMatch` accordingly.

### BUG-003: ESLint command fails under v9 migration
- **Phase**: 0.1 (tooling foundation)
- **Severity**: High — lint gate cannot run locally or in CI.
- **Status**: Open
- **Description**: `npm run lint` aborts because ESLint 9 requires the new `eslint.config.*` naming, but the project still uses `.eslintrc.cjs`.
- **Steps to Reproduce**:
  1. Run `npm run lint`.
  2. Observe ESLint stopping with "couldn't find an eslint.config" message.
- **Evidence**: CLI output showing configuration discovery failure. 【501405†L1-L19】
- **Suggested Fix**: Migrate configuration to `eslint.config.cjs` (or `.js`) per ESLint 9 migration guide or pass `--config .eslintrc.cjs` in the npm script.

### BUG-004: TypeScript type check blocked by dependency/type mismatches
- **Phase**: 1.4 (Analytics module) & 1.1 (Bookings module)
- **Severity**: High — type-checking gate fails with 18 errors, blocking builds.
- **Status**: Open
- **Description**: `npm run typecheck` reports missing exported members in `react-i18next` typings (likely version skew with `i18next@23`), missing `@types/lodash`, and multiple component usages passing `string | undefined` to helpers expecting `string` plus an incorrect translation count parameter type.
- **Steps to Reproduce**:
  1. Run `npm run typecheck`.
  2. Review the reported errors across `node_modules` and `src/modules/{analytics,bookings}` files.
- **Evidence**: TypeScript diagnostics listing the errors. 【2267ed†L1-L72】
- **Suggested Fix**: Align `react-i18next` with compatible `i18next` typings or enable the `tsconfig` path for new selectors, install `@types/lodash`, and update component props/helpers to accept undefined locales or guard before calling. Correct the translation interpolation type by passing `count` as a number.

### BUG-005: Playwright tests fail due to missing browser binaries
- **Phase**: 0.1 (tooling foundation)
- **Severity**: Medium — E2E suite cannot run out of the box.
- **Status**: Open
- **Description**: `npm run e2e` aborts because Playwright browsers are not installed in the environment. The command instructs to run `npx playwright install` first.
- **Steps to Reproduce**:
  1. Run `npm run e2e` without installing browsers beforehand.
  2. Observe launch failure complaining about the missing headless shell.
- **Evidence**: Playwright output requesting `npx playwright install`. 【93dc13†L1-L10】【52eb79†L1-L9】
- **Suggested Fix**: Document the required install step, or add a postinstall script/CI cache that runs `npx playwright install --with-deps`.

## Overall Assessment
Phase 0 tooling gates (linting, unit tests, E2E, coverage boundaries) currently fail, and Phase 1 feature modules block TypeScript builds. Addressing the above issues is necessary before proceeding to later phases.
