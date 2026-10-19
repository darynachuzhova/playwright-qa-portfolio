---
name: map-playwright-locators
description: Inspect a live page, Playwright snapshot, or supplied DOM snippet to propose reliable Playwright TypeScript locators and optionally create a small Page Object. Use when asked to find elements, repair a strict mode or timeout locator failure, or map a new page for tests.
---

# Map Playwright locators

1. Read the relevant test, config, and existing Page Objects before suggesting changes. Check the installed Playwright version before using newer APIs.
2. Use a live browser or Playwright MCP to inspect the requested state when available. If only a DOM snippet or screenshot is supplied, analyze only what it shows; label unverified selectors and behavior as candidates.
3. Identify the target and its nearest meaningful container. Prefer role and accessible name, label, or stable test attribute. Scope repeated controls to a product card, cart item, dialog, or other relevant container. Avoid positional selectors unless order is the requirement.
4. For each proposed locator, state what it targets, why it is stable, and whether uniqueness was verified in the relevant state. Inspect the actual match count when browser access is available. Never claim a snippet proves uniqueness across the whole page.
5. If a locator fails, read the exact Playwright error, call log, URL, and snapshot or trace before changing it. Explain whether it matched zero or multiple elements, was hidden, or failed an actionability check. Do not use force, arbitrary waits, or JavaScript clicks to hide a real issue.
6. Generate a Page Object only when requested or when several tests genuinely reuse the page behavior. Keep it small: take Page in the constructor, define meaningful locators and actions, and leave scenario assertions in tests unless they describe an invariant of an action.
7. Present a concise mapping (element, locator, evidence) and code. Run the affected test when code is changed, report the result, and distinguish verified behavior from assumptions.

Use the current project's conventions and do not invent DOM attributes, API responses, or page states.
