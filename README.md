# Playwright QA Portfolio

Practice project for UI and API testing with Playwright and TypeScript. The UI tests target [SauceDemo](https://www.saucedemo.com/), while the API tests target [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## UI coverage (SauceDemo)

- Login with valid credentials, required-field errors, invalid credentials, and logout
- Cart badge, adding and removing products, and cart contents
- Product details and returning to the product list
- Product sorting by price, low to high
- End-to-end checkout: add a product, enter customer details, review the order, and confirm completion

Each UI test starts with its own isolated browser context. Tests that need an authenticated session call `logIn(page)` from `tests/helpers/auth.ts`. The public SauceDemo account used in the tests is defined in `tests/data/users.ts`.

## API coverage (JSONPlaceholder)

`tests/api/posts.spec.ts` contains three API tests:

- `GET /posts/1` returns HTTP 200 and a post with the expected IDs and a non-empty title
- `GET /posts/9999` returns HTTP 404 and an empty JSON object
- `POST /posts` returns HTTP 201 and the submitted post data

JSONPlaceholder simulates the POST response; it does not persist newly created posts.

## Run locally

Install dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

Check TypeScript types:

```bash
npm run typecheck
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
  api/posts.spec.ts
  cart.spec.ts
  checkout.spec.ts
  login.spec.ts
  product.spec.ts
  sorting.spec.ts
  data/checkout.ts
  data/users.ts
  helpers/auth.ts
  pages/inventory.page.ts
playwright.config.ts
.github/workflows/playwright.yml
.github/skills/
.github/agents/
```

The specs contain the scenarios and assertions. `InventoryPage` contains reusable inventory actions, while checkout customer data and login setup are kept in separate files. The skills support feature analysis, locator selection, and README maintenance; the `qa-reviewer` agent helps review tests.

## CI

GitHub Actions runs `npm run typecheck` and then the Chromium project on pushes and pull requests to `main` or `master`. It uploads the Playwright HTML report as an artifact. The local Playwright config also includes Firefox and WebKit projects.
