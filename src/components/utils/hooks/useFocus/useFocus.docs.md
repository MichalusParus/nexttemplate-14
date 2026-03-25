# useFocus

Hierarchical keyboard routing system using roving tabindex. Manages arrow key navigation, focus trapping, dismiss behavior, type-ahead search, and nested component coordination across all interactive components. Uses roving tabindex instead of `aria-activedescendant` because it works reliably across all screen readers and portal-rendered content.

---

## Architecture

```
useFocus (coordinator)
├── useFocusableElements  — Element discovery + zone management
├── useTriggerFocus       — Trigger blur/focus tracking
├── useTypeAheadSearch    — Character buffer + text matching
├── useKeyboardNavigation — Keyboard event routing
├── useDismissModal       — Focus capture/restore for modals
├── useDismissNonModal    — Click-outside + focusout detection
└── useFocusScope         — Global nested scope tree

Component wrappers (via keyHandlers):
├── useAutocompleteFocus  — Combobox + chip navigation
├── useCalendarFocus      — 2D grid with month boundary crossing
├── useMenuFocus          — Hierarchical submenu navigation
└── useDataGridFocus      — Two-mode grid (navigation + interaction)
```

The coordinator composes sub-hooks, computes an "effective active state" from both the component's own `isActive` and the scope hierarchy, then registers keydown listeners on container and portal. Component-specific wrappers extend behavior through `keyHandlers` — custom handlers execute first, return `true` to consume the event or `false` to fall through to defaults.

---

## Core Concepts

### Keyboard Routing

Default keyboard behavior:
- **Arrow Down/Up** — Navigate next/previous (grid-aware when `columns` is set)
- **Arrow Right/Left** — Navigate next/previous (Cmd modifier jumps to end/start)
- **Home/End** — Jump to first/last
- **Tab** — In non-modal: closes dropdown and moves focus to next field. In modal (`dismiss: 'modal'`): cycles focus within the component (Shift+Tab goes backward)
- **Escape** — Always closes and returns focus to trigger
- **Printable characters** — Type-ahead search when `typeAhead` is enabled (500ms buffer, circular search from current position)

Custom handlers (`keyHandlers`) intercept before any default. Return `true` = event consumed, `false` = fall through to default handler. This is how component wrappers like `useMenuFocus` add submenu navigation (ArrowRight opens submenu) without modifying the core.

### Focus Scope Hierarchy

When components nest (Dialog contains a Select, Menu contains a Submenu), only the **topmost** component should process keyboard events. This is managed by a module-level scope tree (not React Context — avoids re-renders).

Components register on mount. Parent-child relationships are detected via DOM containment at registration time, which correctly handles portals. Each scope knows if it's the topmost in its branch (`isTopmostInBranch`). Sibling branches are independent — a Tooltip and a Dialog open simultaneously don't interfere.

**Example flow:**
1. Dialog opens — registers as topmost scope, keyboard active
2. Select inside Dialog opens — registers as child, becomes topmost
3. Dialog's keyboard handler is paused (not topmost anymore)
4. User presses Escape — Select closes, Dialog becomes topmost again
5. User presses Escape again — Dialog closes, restores focus to original trigger

When a parent closes, `deactivateDescendants` recursively closes all children (deepest first), preventing orphaned scopes.

### Zone Separation (Combobox Pattern)

Comboboxes like Select and Autocomplete have two distinct keyboard navigation contexts:

- **Closed zone** — trigger + container elements (chips, clear button). Arrow keys navigate between chips.
- **Open zone** — trigger + portal elements (dropdown options). Arrow keys navigate options.

The trigger element is included in both zones. When `triggerNav` is enabled, the focusable element list switches between these zones based on `isActive`. ArrowDown on a focused trigger with closed dropdown opens it and switches to the open zone.

This solves chip keyboard navigation: when the dropdown is closed, left/right arrows move between chips. When open, up/down arrows move between options. Same hook, different element lists.

### Modal vs Non-Modal Dismiss

**Modal** (`dismiss: 'modal'`):
- Captures `document.activeElement` when opening
- Restores focus to that element when closing (via `requestAnimationFrame`)
- Tab/Shift+Tab cycle within the component (focus trapped)
- Auto-focuses first focusable element on open
- Automatically enables focus scope as `'modal'` type
- No outside-click detection (Overlay handles visual backdrop)

**Non-modal** (`dismiss: 'non-modal'`):
- Closes on mousedown/touchstart outside container + portal
- Closes on focusout when focus leaves all tracked elements
- Supports `submenuRefs` to prevent closing when interacting with nested submenus
- Tab leaves the component (not trapped)

These are mutually exclusive. A component is either modal (trapped, with focus restore) or non-modal (escapable, with outside detection). Drawer supports both via its `modal` prop.

### Element Discovery & Preservation

The focusable element list is built by scanning container and portal with CSS selectors (`FOCUS_SELECTORS`). The list re-scans when:
- Active state changes (component opens/closes, scope hierarchy updates)
- `value` prop changes (selection changed, list filtered)
- Portal element reference changes (portal mounted/unmounted)

When the list updates while an element is focused:
- **Same element still in list** — focus stays, index updated to new position
- **Element removed** — focus shifts to nearest previous element
- **All elements removed** — focus returns to trigger
- **Focus is elsewhere** (e.g., on a header button) — no focus stealing, index resets

---

## Common Patterns

### Always-Active List (Tabs, Pagination, ToggleGroup)

Simplest usage — always active, no portal, no dismiss, no scope:
```tsx
useFocus(true, componentRef, {
  triggerRef: { current: null },
  selectors: ['.Tab'],
})
```

### Combobox (Select, Autocomplete)

Zone separation + scope + type-ahead + auto-focus selected item:
```tsx
useFocus(isOpen, componentRef, {
  selectors: FOCUS_SELECTORS.select,
  triggerNav: true,
  scope: true,
  scopeType: 'dropdown',
  typeAhead: true,
  onOpen: ({ focusableElements, focusElement }) => {
    const selected = focusableElements.findIndex(el => el.classList.contains('selected'))
    focusElement(selected !== -1 ? selected : 0)
  },
})
```

### Modal (Dialog, Drawer, ImageViewer)

Just `dismiss: 'modal'` — everything else auto-configures:
```tsx
useFocus(isOpen, containerRef, {
  portalEl: dialogEl,
  dismiss: 'modal',
  onToggle: setIsOpen,
})
```

### Hierarchical Menu

Custom key handlers for submenu open/close, with scope coordination:
```tsx
useFocus(isOpen, menuButtonRef, {
  selectors: FOCUS_SELECTORS.menu,
  scope: true,
  typeAhead: true,
  keyHandlers: {
    ArrowRight: (e) => { /* open submenu, activate child focus */ return true },
    ArrowLeft: (e) => { /* close submenu, restore parent focus */ return true },
  },
})
```

---

## Design Decisions

**Roving tabindex over `aria-activedescendant`** — `aria-activedescendant` has VoiceOver inconsistencies, NVDA bugs, and requires the referenced element to be a DOM descendant — which breaks with portals. Roving tabindex works reliably everywhere.

**Module-level focus scope** — Avoids Context re-renders entirely. DOM containment detection at registration time correctly handles portals (which break Context nesting). Branch-aware queries enable correct behavior when multiple independent popover branches coexist.

**Zone-based combobox** — `triggerNav` separates OPEN and CLOSED navigation zones. Solves chip keyboard navigation without a separate hook or complex state machine.

**Refs for rapid key repeat** — `focusIndexRef` and `focusableElRef` use `useRef` instead of `useState` to avoid stale closures when holding down arrow keys.

**`requestAnimationFrame` for DOM-dependent focus** — Used in modal dismiss (focus restoration after portal unmount) and `onOpen` (element availability after portal render) to ensure the DOM has settled.
