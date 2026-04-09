# Form Experience Polish

Premium form patterns that make filling out forms feel delightful instead of tedious.

---

## 1. Floating Labels

Labels that sit inside the input and float up when focused or filled.

```css
.float-group {
  position: relative;
  margin-bottom: var(--space-5);
}

.float-group input,
.float-group textarea {
  width: 100%;
  padding: var(--space-4) var(--space-4) var(--space-2);
  font-size: var(--text-base);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  color: var(--color-text);
  transition: border-color 0.2s ease;
}

.float-group label {
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-base);
  color: var(--color-text-muted);
  pointer-events: none;
  transition: all 0.2s ease;
}

.float-group input:focus ~ label,
.float-group input:not(:placeholder-shown) ~ label,
.float-group textarea:focus ~ label,
.float-group textarea:not(:placeholder-shown) ~ label {
  top: var(--space-2);
  transform: translateY(0);
  font-size: var(--text-xs);
  color: var(--color-accent);
}

.float-group input:focus,
.float-group textarea:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
```

```html
<div class="float-group">
  <input type="email" id="email" placeholder=" " required>
  <label for="email">Email address</label>
</div>
```

---

## 2. Animated Validation States

Inputs that smoothly transition to success (green) or error (red) states with icons.

```css
.input-validated {
  padding-right: var(--space-8);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-validated.success {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
}

.input-validated.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  animation: shake 0.4s ease;
}

.validation-icon {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%) scale(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success .validation-icon { transform: translateY(-50%) scale(1); color: var(--color-success); }
.error .validation-icon { transform: translateY(-50%) scale(1); color: var(--color-error); }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
```

---

## 3. Multi-Step Form Wizard

Progress bar with numbered steps and smooth transitions between form sections.

```css
.wizard-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-7);
  position: relative;
}

.wizard-steps::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-border);
  z-index: 0;
}

.wizard-step {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--text-sm);
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border);
  color: var(--color-text-muted);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.wizard-step.active {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: white;
}

.wizard-step.completed {
  border-color: var(--color-success);
  background: var(--color-success);
  color: white;
}

.wizard-panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.wizard-panel.active { display: block; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
```

---

## 4. Input Focus Glow

Soft color glow that expands around the input on focus.

```css
.input-glow {
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.input-glow:focus {
  border-color: var(--color-accent);
  box-shadow:
    0 0 0 3px rgba(79, 70, 229, 0.1),
    0 0 20px rgba(79, 70, 229, 0.05);
  outline: none;
}
```

---

## 5. Character Counter

Live character count with color change approaching the limit.

```css
.char-counter {
  font-size: var(--text-xs);
  text-align: right;
  margin-top: var(--space-1);
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.char-counter.warning { color: var(--color-warning); }
.char-counter.danger { color: var(--color-error); font-weight: 600; }
```

---

## 6. Password Strength Meter

Visual bar that fills and changes color based on password strength.

```css
.strength-meter {
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  margin-top: var(--space-2);
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.3s ease, background 0.3s ease;
}

.strength-weak .strength-fill { width: 25%; background: var(--color-error); }
.strength-fair .strength-fill { width: 50%; background: var(--color-warning); }
.strength-good .strength-fill { width: 75%; background: #22c55e; }
.strength-strong .strength-fill { width: 100%; background: var(--color-success); }

.strength-label {
  font-size: var(--text-xs);
  margin-top: var(--space-1);
  font-weight: 500;
}
```

---

## 7. Success Celebration

Confetti or checkmark animation after successful form submission.

```css
.success-check {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-success);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-5);
  animation: scaleSpring 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.success-check svg {
  width: 32px;
  height: 32px;
  color: white;
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: drawCheck 0.4s ease 0.3s forwards;
}

@keyframes scaleSpring {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}

.success-message {
  text-align: center;
  animation: fadeInUp 0.4s ease 0.5s both;
}
```

---

## 8. Smart Select with Search

Searchable dropdown that filters options as you type.

```css
.smart-select {
  position: relative;
}

.smart-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.smart-select-dropdown {
  position: absolute;
  top: calc(100% + var(--space-1));
  left: 0;
  right: 0;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  max-height: 240px;
  overflow-y: auto;
  z-index: 50;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.smart-select.open .smart-select-dropdown {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.smart-select-search {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  width: 100%;
  border: none;
  font-size: var(--text-sm);
}

.smart-select-option {
  padding: var(--space-3) var(--space-4);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: background 0.15s ease;
}

.smart-select-option:hover { background: var(--color-bg-subtle); }
.smart-select-option.selected { color: var(--color-accent); font-weight: 600; }
```

---

## Selection Guide

| Form Type | Recommended Patterns |
|-----------|---------------------|
| Sign Up / Login | Floating labels, validation states, password strength, success celebration |
| Contact Form | Floating labels, character counter, input glow |
| Checkout | Multi-step wizard, validation states, smart select |
| Settings | Input glow, toggle switches, smart select |
| Survey | Multi-step wizard, progress bar, success celebration |

## Accessibility Notes

- Floating labels MUST still be associated via `for`/`id` — the float is visual only
- Error messages must be announced via `aria-live="assertive"` or `role="alert"`
- Multi-step wizard needs `aria-current="step"` on the active step
- All custom selects must support keyboard navigation (arrow keys, Enter, Escape)
- Success animations must respect `prefers-reduced-motion`
