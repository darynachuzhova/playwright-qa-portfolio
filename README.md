# Playwright QA Portfolio

Practice project for end-to-end UI testing with Playwright and TypeScript against [Sauce Demo](https://www.saucedemo.com/).

## Coverage

- Login with valid credentials, required-field errors, invalid credentials, and logout
- Cart badge, adding and removing products, and cart contents
- Product details and returning to the product list
- Product sorting by price, low to high

Each test starts with its own isolated browser context. Tests that need an authenticated session call `logIn(page)` from `tests/helpers/auth.ts`. The public Sauce Demo account used in the tests is defined in `tests/data/users.ts`.

## Run locally

Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

Run all configured browser projects:

```bash
npx playwright test
```

Run only Chromium, or a single spec:

```bash
npx playwright test --project=chromium
npx playwright test tests/product.spec.ts --project=chromium
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Project layout

```text
tests/
  cart.spec.ts
  login.spec.ts
  product.spec.ts
  sorting.spec.ts
  data/users.ts
  helpers/auth.ts
playwright.config.ts
.github/workflows/playwright.yml
.github/skills/
.github/agents/
```

The specs contain the scenarios and assertions; shared data and login setup are kept in separate files. The skills support feature analysis and locator selection; the `qa-reviewer` agent helps review tests.

## CI

GitHub Actions runs the Chromium project on pushes and pull requests to `main` or `master` and uploads the Playwright HTML report as an artifact. The local Playwright config also includes Firefox and WebKit projects.
