# Badges

Use these badges in your project's README to show that your UI has been reviewed with OpenUI Guide.

## Available Badges

### Reviewed Badge

[![Reviewed with OpenUI Guide](https://img.shields.io/badge/UI_Review-OpenUI_Guide-6366f1?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJMNiAxMmw2IDEwIDYtMTBMOCAyWiIvPjxwYXRoIGQ9Ik05IDEybDMgNSAzLTUiLz48L3N2Zz4=)](https://github.com/makhage/openuiguide)

```markdown
[![Reviewed with OpenUI Guide](https://img.shields.io/badge/UI_Review-OpenUI_Guide-6366f1?style=flat-square)](https://github.com/makhage/openuiguide)
```

### Accessibility Score Badges

[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA_Compliant-22c55e?style=flat-square)](https://github.com/makhage/openuiguide)

```markdown
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-AA_Compliant-22c55e?style=flat-square)](https://github.com/makhage/openuiguide)
```

[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-In_Progress-f59e0b?style=flat-square)](https://github.com/makhage/openuiguide)

```markdown
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG_2.2-In_Progress-f59e0b?style=flat-square)](https://github.com/makhage/openuiguide)
```

### Version Badge

[![OpenUI Guide v1.0.0](https://img.shields.io/badge/OpenUI_Guide-v1.0.0-6366f1?style=flat-square)](https://github.com/makhage/openuiguide)

```markdown
[![OpenUI Guide v1.0.0](https://img.shields.io/badge/OpenUI_Guide-v1.0.0-6366f1?style=flat-square)](https://github.com/makhage/openuiguide)
```

### CI Status Badge

After setting up the GitHub Actions workflow, add:

```markdown
[![Spec Validation](https://github.com/makhage/openuiguide/actions/workflows/validate-specs.yml/badge.svg)](https://github.com/makhage/openuiguide/actions/workflows/validate-specs.yml)
```

## Style Variants

All badges support shields.io style variants. Replace `flat-square` with:

| Style | Parameter |
|-------|-----------|
| Flat | `style=flat` |
| Flat Square | `style=flat-square` |
| Plastic | `style=plastic` |
| For The Badge | `style=for-the-badge` |
| Social | `style=social` |

## Custom Score Badge

After running a design review, you can create a custom score badge:

```markdown
[![Design Score: 87/100](https://img.shields.io/badge/Design_Score-87%2F100-22c55e?style=flat-square)](https://github.com/makhage/openuiguide)
```

Color guide for scores:
- 90-100: `22c55e` (green)
- 70-89: `f59e0b` (amber)
- 50-69: `f97316` (orange)
- 0-49: `ef4444` (red)

## HTML Version

For use in HTML pages or wikis:

```html
<a href="https://github.com/makhage/openuiguide">
  <img src="https://img.shields.io/badge/UI_Review-OpenUI_Guide-6366f1?style=flat-square" alt="Reviewed with OpenUI Guide" />
</a>
```
