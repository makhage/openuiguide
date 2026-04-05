# Platform: Desktop (Electron, Tauri, WPF, Qt)

## Overview

Desktop applications operate in a windowed environment with precise pointer input, full keyboard access, and deep operating system integration. Unlike web or mobile, desktop apps are expected to behave like first-class citizens of the OS — respecting system menus, keyboard conventions, file dialogs, and window management patterns. This spec covers desktop-specific best practices that complement the cross-platform specs.

## Requirements

### REQ-PLAT-DESK-001: Window Management

**Enforcement:** `MUST` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Yes — check for resize handling, minimum size constraints, and state persistence

#### Why This Matters
Users expect desktop windows to behave predictably: resizable, minimizable, maximizable, and restorable to their last position and size. An application that forgets its window state or breaks layout on resize feels unfinished and unreliable.

#### The Rule
- Windows MUST be resizable unless there is a strong design reason (e.g., a fixed-size utility)
- Define minimum window dimensions to prevent layout breakage (typically 800x600 or smaller)
- Persist window position, size, and maximized state across sessions
- Support multi-monitor setups — restore windows to the correct monitor when available
- Handle graceful fallback when the previous monitor is no longer connected

#### Platform Notes
- **Electron:** Use `BrowserWindow` options (`minWidth`, `minHeight`) and `electron-store` or similar for state persistence
- **Tauri:** Use the `tauri-plugin-window-state` plugin for automatic window state persistence
- **WPF/Qt:** Use platform-native APIs to save and restore window geometry

---

### REQ-PLAT-DESK-002: System Menu Integration

**Enforcement:** `SHOULD` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Heuristic — check for native menu bar presence and standard menu items

#### Why This Matters
Desktop users expect a menu bar with standard items (File, Edit, View, Help) that follow OS conventions. Applications without a system menu feel alien, and users lose access to discoverable commands and keyboard shortcuts they rely on by muscle memory.

#### The Principle
- Include a menu bar with standard top-level menus: File, Edit, View, Window, Help
- Populate Edit with standard items: Undo, Redo, Cut, Copy, Paste, Select All
- Include application-specific menus between View and Window
- On macOS, place the app menu (About, Preferences, Quit) in the application menu, not File
- On Windows/Linux, include Exit/Quit under File

#### Platform Notes
- **Electron:** Use `Menu.buildFromTemplate()` with role-based items (`undo`, `copy`, `paste`) for automatic OS-correct behavior
- **Tauri:** Use the `tauri-plugin-menu` API to construct native menus
- **WPF:** Use the native `Menu` control with `InputGestureText` for shortcut hints
- **Qt:** Use `QMenuBar` and `QAction` with `setShortcut()` for native menu integration

---

### REQ-PLAT-DESK-003: Keyboard Shortcuts (Cmd vs. Ctrl)

**Enforcement:** `MUST` | Platform Convention, Accessibility
**Platforms:** Desktop (all frameworks)
**Detectable:** Yes — check for platform-appropriate modifier key usage

#### Why This Matters
Keyboard shortcuts are a primary interaction method on desktop. Using the wrong modifier key (Ctrl on macOS or Cmd on Windows) breaks muscle memory and makes the application feel foreign. Consistent shortcuts also serve as an accessibility feature for users who cannot use a mouse.

#### The Rule
- Use **Cmd** as the primary modifier on macOS; use **Ctrl** on Windows and Linux
- Map standard shortcuts correctly per platform:
  - Save: Cmd/Ctrl+S
  - Undo: Cmd/Ctrl+Z
  - Redo: Cmd/Ctrl+Shift+Z (macOS) or Ctrl+Y (Windows)
  - Preferences/Settings: Cmd+, (macOS) or Ctrl+, (Windows/Linux)
  - Quit: Cmd+Q (macOS) or Alt+F4 (Windows)
- Allow user customization of keyboard shortcuts where feasible
- Display shortcuts in menu items and tooltips

#### Platform Notes
- **Electron:** Use `accelerator` strings with `CmdOrCtrl` for automatic platform mapping
- **Tauri:** Define accelerators per-platform in the menu configuration
- **Native frameworks:** Use each platform's native accelerator/shortcut binding APIs

---

### REQ-PLAT-DESK-004: Drag-and-Drop

**Enforcement:** `SHOULD` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Heuristic — check for drag event handlers and drop zone indicators

#### Why This Matters
Drag-and-drop is a fundamental desktop interaction pattern. Users expect to drag files from the OS file manager into an application, rearrange items within the UI, and drag content between windows. Missing drag-and-drop support forces users into slower workflows.

#### The Principle
- Support file drag-and-drop from the OS into the application where contextually appropriate (e.g., file upload, import)
- Provide clear visual feedback during drag: highlight drop zones, show insertion indicators, change cursor
- Support internal drag-and-drop for reorderable lists, kanban boards, and similar patterns
- Respect the OS drag threshold (typically 4-5px of movement before initiating a drag)
- Provide keyboard alternatives for all drag-and-drop operations (accessibility)

#### Platform Notes
- **Electron:** Use HTML5 drag-and-drop APIs; access file paths via `event.dataTransfer.files`
- **Tauri:** Use the `tauri-plugin-drag` or HTML5 APIs with Tauri's file path resolution
- **WPF:** Use `DragDrop` events and `DragDropEffects` for native drag-and-drop
- **Qt:** Use `QDrag`, `QMimeData`, and `dragEnterEvent`/`dropEvent` handlers

---

### REQ-PLAT-DESK-005: System Tray Integration

**Enforcement:** `CONSIDER` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Yes — check for tray icon registration and context menu

#### Why This Matters
Applications that run in the background (chat, music, sync, monitoring) benefit from system tray presence. It provides quick access to status and actions without opening the full window, and it signals to users that the application is still running.

#### The Principle
- Use the system tray for applications that have background functionality
- Provide a context menu on the tray icon with essential actions (Show/Hide, Status, Quit)
- Update the tray icon to reflect application state (e.g., notification badge, sync status)
- On macOS, respect the menu bar icon style (template images for automatic dark/light adaptation)
- Do not minimize to tray by default without user consent — provide a preference

---

### REQ-PLAT-DESK-006: Multi-Window Support

**Enforcement:** `SHOULD` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Heuristic — check for multi-window architecture and inter-window communication

#### Why This Matters
Desktop applications often benefit from multiple windows: detached panels, secondary editors, inspector windows, or pop-out views. Users with multiple monitors especially expect the ability to spread their workflow across screens.

#### The Principle
- Support opening content in new windows where the workflow benefits (e.g., documents, settings, detail views)
- Maintain shared state across windows — changes in one window should reflect in others
- Handle window lifecycle correctly: closing a child window should not quit the application; closing the main window should prompt or quit
- On macOS, support the Window menu with a list of open windows
- Remember per-window positions and sizes independently

---

### REQ-PLAT-DESK-007: Native File Dialogs

**Enforcement:** `MUST` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Yes — check for native dialog API usage vs. custom implementations

#### Why This Matters
Native file open/save dialogs are deeply integrated with the OS: they support bookmarks, recent locations, network drives, cloud storage providers, and accessibility features. Custom file pickers lose all of this and confuse users who expect the familiar OS dialog.

#### The Rule
- Use native OS file dialogs for open, save, and folder selection — NEVER build a custom file picker as a replacement
- Set appropriate file type filters (e.g., `Images (*.png, *.jpg)`)
- Set sensible default directories (last used directory, or project directory)
- Use the native "Save As" dialog with overwrite confirmation

#### Platform Notes
- **Electron:** Use `dialog.showOpenDialog()` and `dialog.showSaveDialog()`
- **Tauri:** Use the `tauri-plugin-dialog` API for native file dialogs
- **WPF:** Use `Microsoft.Win32.OpenFileDialog` and `SaveFileDialog`
- **Qt:** Use `QFileDialog::getOpenFileName()` and related static methods

---

### REQ-PLAT-DESK-008: Offline-First Capability

**Enforcement:** `SHOULD` | Desktop Best Practice
**Platforms:** Desktop (all frameworks)
**Detectable:** Heuristic — check for local data storage and network status handling

#### Why This Matters
Unlike web applications, desktop apps are expected to work without an internet connection. Users launch desktop software with the assumption that their data and core functionality are available locally. An app that shows a blank screen or error without connectivity undermines the reason for installing a native application.

#### The Principle
- Core functionality SHOULD work without a network connection
- Store user data locally and sync when connectivity is available
- Clearly indicate online/offline status and what features are affected
- Queue actions taken while offline and sync them when reconnected
- Handle sync conflicts gracefully with clear user-facing resolution options

---

### REQ-PLAT-DESK-009: High-DPI and Display Scaling

**Enforcement:** `MUST` | Platform Convention, Accessibility
**Platforms:** Desktop (all frameworks)
**Detectable:** Yes — check for DPI-aware manifest/configuration and scalable assets

#### Why This Matters
Modern desktops range from 96 DPI standard displays to 220+ DPI Retina/HiDPI screens, and users frequently adjust OS-level display scaling (125%, 150%, 200%). Applications that ignore scaling appear either tiny and unreadable or blurry and pixelated.

#### The Rule
- Declare the application as DPI-aware in the platform manifest
- Use vector graphics (SVG) or provide 1x, 2x, and 3x raster assets for icons and images
- Use logical pixels (points) for all layout — never hard-code physical pixel values
- Test at 100%, 125%, 150%, and 200% scaling factors
- Handle per-monitor DPI on multi-monitor setups (Windows)

#### Platform Notes
- **Electron:** Chromium handles most DPI scaling automatically; provide 2x icons and use CSS `image-set()` or `srcset`
- **Tauri:** Same as Electron — WebView handles scaling; provide high-resolution assets
- **WPF:** Set `dpiAware` and `dpiAwareness` in the application manifest; use device-independent units
- **Qt:** Enable `Qt::AA_EnableHighDpiScaling` and use `QIcon::addFile()` with multiple resolutions

---

### REQ-PLAT-DESK-010: System Theme Integration

**Enforcement:** `SHOULD` | Platform Convention
**Platforms:** Desktop (all frameworks)
**Detectable:** Yes — check for OS theme detection and response to theme changes

#### Why This Matters
Users choose light or dark mode at the OS level and expect applications to follow suit. An app that stays light when the system is in dark mode creates a jarring, inconsistent experience and can cause eye strain in low-light environments.

#### The Principle
- Detect the OS color scheme (light/dark) at launch and apply the matching theme
- Listen for real-time theme changes and update the UI without requiring a restart
- Respect the OS accent color where appropriate (selection highlights, primary buttons)
- Provide an in-app theme override option: System (default), Light, Dark
- On macOS, respect the system accent color and highlight color preferences
- On Windows, integrate with the system color mode and optional accent color

#### Platform Notes
- **Electron:** Use `nativeTheme.shouldUseDarkColors` and listen for `nativeTheme.on('updated', ...)`
- **Tauri:** Use the `tauri-plugin-os` or `window.matchMedia('(prefers-color-scheme: dark)')` in the WebView
- **WPF:** Listen for `SystemParameters.StaticPropertyChanged` or use Windows theme APIs
- **Qt:** Use `QPalette` from `QApplication::palette()` and detect changes via `QEvent::PaletteChange`

---

## Quick Reference

| ID | Name | Level | Detectable |
|----|------|-------|------------|
| REQ-PLAT-DESK-001 | Window Management | MUST | Yes |
| REQ-PLAT-DESK-002 | System Menu Integration | SHOULD | Heuristic |
| REQ-PLAT-DESK-003 | Keyboard Shortcuts (Cmd vs. Ctrl) | MUST | Yes |
| REQ-PLAT-DESK-004 | Drag-and-Drop | SHOULD | Heuristic |
| REQ-PLAT-DESK-005 | System Tray Integration | CONSIDER | Yes |
| REQ-PLAT-DESK-006 | Multi-Window Support | SHOULD | Heuristic |
| REQ-PLAT-DESK-007 | Native File Dialogs | MUST | Yes |
| REQ-PLAT-DESK-008 | Offline-First Capability | SHOULD | Heuristic |
| REQ-PLAT-DESK-009 | High-DPI and Display Scaling | MUST | Yes |
| REQ-PLAT-DESK-010 | System Theme Integration | SHOULD | Yes |

## Creative Freedom

Desktop platforms offer extensive creative latitude beyond these requirements:

- **Custom title bars** — frameless or custom-styled title bars are acceptable as long as window controls (close, minimize, maximize) remain functional and correctly positioned per OS convention (left on macOS, right on Windows/Linux)
- **Panel layouts** — dockable, resizable, and collapsible panel systems are a desktop strength; design these to suit the application's workflow
- **Power-user features** — command palettes, configurable toolbars, and workspace presets are encouraged for productivity applications
- **Custom cursors** — use application-specific cursors for specialized tools (e.g., drawing apps, map editors)

## Further Reading

- [Electron: BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window)
- [Tauri: Window Management](https://tauri.app/develop/window-customization/)
- [Apple: macOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)
- [Microsoft: Windows App Design Guidelines](https://learn.microsoft.com/en-us/windows/apps/design/)
- [Qt: Desktop Integration](https://doc.qt.io/qt-6/desktop-integration.html)
