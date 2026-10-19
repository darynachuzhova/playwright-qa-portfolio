---
name: analyze-feature
description: Analyze a new web application feature before writing Playwright tests. Use when asked to explore a flow, identify risks, propose test coverage, or prepare automation scenarios.
---

# Analyze a feature for Playwright testing

1. Read the existing tests and Playwright configuration to follow this project's conventions.
2. Explore the requested flow in the browser with Playwright MCP when available. Record what you actually observed. Mark anything unverified as an assumption.
3. Identify the main user journey, important states, validation errors, and high-risk edge cases.
4. Propose a small, prioritized test plan. For each scenario, state:
   - starting state and test data;
   - user actions;
   - expected result and useful assertions;
   - why the scenario matters;
   - whether it belongs in UI automation, API automation, or manual exploration.
5. Prefer observable behavior over implementation details. Do not infer success from a click alone.
6. For locator suggestions, prefer accessible roles and names, labels, and stable test attributes. Scope locators to the relevant section and verify that they identify the intended element uniquely. Avoid position-based selectors when the order is not part of the requirement.
7. Keep tests independent. Do not rely on state left by another test. Never place real credentials in test code or output.
8. Before writing code, present the proposed scenarios and any unknown behavior. When asked to implement, write the selected scenarios, run them, inspect failures, and report what was changed and verified. Do not silently change an assertion just to make a failing test pass.

Keep the response concise and distinguish observed behavior from recommendations.