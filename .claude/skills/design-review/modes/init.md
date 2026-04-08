# Design Review Init Mode

When the user runs `/design-review --init`, create a `.designreviewrc.json` config file that stores project-specific settings. This replaces the discovery interview — once configured, the interview is skipped on subsequent runs.

## Process

1. Run the full discovery interview (Questions 1-4 from Phase 1c)
2. Auto-detect platform, framework, and project name
3. Save all answers to `.designreviewrc.json` in the project root
4. Confirm: "Configuration saved. Future reviews will use these settings. Run `/design-review --init` again to change them."

## Config File Format

```json
{
  "$schema": "https://github.com/makhage/openuiguide/blob/main/schemas/designreviewrc.schema.json",
  "version": "1.0.0",
  "project": {
    "name": "RamSpy Dashboard",
    "platform": "web",
    "framework": "express",
    "type": "saas"
  },
  "audience": "business-professionals",
  "priority": "full-audit",
  "personality": "dark-technical",
  "review": {
    "confidence_threshold": 70,
    "categories": ["accessibility", "foundations", "components", "patterns", "platform"],
    "output": "interactive",
    "auto_save_history": true
  },
  "suppressions": {
    "global": [],
    "files": {}
  },
  "custom_rules": []
}
```

## Field Descriptions

### `project.type`
Maps to discovery interview Question 1:
- `"saas"` — Dashboard, tool, productivity app
- `"marketing"` — Landing page, conversion-focused
- `"ecommerce"` — Product listings, checkout
- `"content"` — Blog, docs, reading-focused
- `"admin"` — Internal tool, power-user

### `audience`
Maps to Question 2:
- `"general-consumers"` — Broad audience, mobile-first
- `"business-professionals"` — Desktop-heavy, efficiency
- `"developers"` — Comfortable with density
- `"enterprise"` — Compliance, accessibility critical

### `priority`
Maps to Question 3:
- `"accessibility"` — WCAG focus only
- `"visual-polish"` — Typography, color, spacing
- `"conversion"` — CTA, user flow
- `"full-audit"` — Everything

### `personality`
Maps to Question 4:
- `"clean-minimal"` — Apple-inspired whitespace
- `"bold-energetic"` — Bright, dynamic
- `"dark-technical"` — Dark theme, data-focused
- `"warm-friendly"` — Rounded, soft
- `"neutral"` — General best practices

### `review.confidence_threshold`
Override the default 70. Range: 0-100.
- `50` = strict (show more findings)
- `70` = default
- `85` = lenient (less noise)

### `review.categories`
Which categories to include. Default: all.
Options: `"accessibility"`, `"foundations"`, `"components"`, `"patterns"`, `"platform"`

### `suppressions.global`
Requirement IDs to suppress project-wide:
```json
"global": ["REQ-DARK-001", "REQ-TYPO-001"]
```

### `suppressions.files`
File-specific suppressions:
```json
"files": {
  "src/legacy/old-page.html": ["REQ-WEB-001", "REQ-A11Y-O-008"]
}
```

### `custom_rules`
Add project-specific rules:
```json
"custom_rules": [
  {
    "id": "CUSTOM-001",
    "name": "Brand color usage",
    "level": "SHOULD",
    "description": "Primary brand color #2563eb must only be used for primary CTAs and the logo",
    "check": "Find #2563eb or var(--brand-primary) used outside of .btn-primary or .logo elements"
  }
]
```

## Behavior When Config Exists

When `.designreviewrc.json` exists in the project root:

1. **Skip the discovery interview** — load settings from config
2. Show: `"Using project config from .designreviewrc.json (RamSpy Dashboard, web, dark-technical)"`
3. Apply all settings: threshold, categories, suppressions, custom rules
4. If the user wants to change settings: `/design-review --init` re-runs the wizard

## Behavior When Config Doesn't Exist

1. Run the full discovery interview (Phase 1c)
2. After the interview, ask: "Want to save these settings for future reviews? (creates .designreviewrc.json)"
3. If yes, save the config
4. If no, proceed with the one-time settings
