// WHY: This is a copy-paste library — developers modify components freely.
// Tests protect the behavioral contract (ARIA, roles, a11y, ref, className)
// so changes don't silently break what matters. Each test should catch a real
// mistake a developer could make. Test the contract, not implementation details.
//
// Test Creation Guide
//
// 5 Describe Groups:
//   Semantics  — HTML structure, roles, ARIA, className, prop variations, conditional rendering
//   Keyboard   — Focus, Enter/Space, Arrows, Escape, Tab
//   Interaction — Click/change spies, toggle, controlled state
//   Ref        — Always 1 test: expect(ref.current).toBeInstanceOf(HTMLElementType)
//   Accessibility — Always 1 test: jest-axe
//
// Skip Rules (no empty groups):
//   Semantics, Ref, Accessibility — never skip (minimum 3 groups)
//   Keyboard — skip for purely visual components (Divider, Paper, loaders, typography, etc.)
//   Interaction — skip for static display without events
//
// Style Rules:
//   - Write tests from the docs spec first, then check existing coverage (docs-first)
//   - Split compound tests: ARIA → Semantics, clicks → Interaction, focus → Keyboard
//   - DO test className forwarding to correct element. DON'T test internal Tailwind classes
//   - Prefer getByRole over getByTestId. Fallback to testId only when no semantic query works
//   - Drop query suffix from variable names: `dialog` not `dialogRole`
//   - Descriptive spy names: `const onClick = jest.fn()` not `const spy = jest.fn()`
//   - Every test must have a meaningful expect(). "Runs without error" is not valid
//   - Test combined states when multiple blocking states exist (disabled + loading)
//   - Keyboard tests must spy on preventDefault or assert callback was not called
//   - Test all conditional branches for roles/ARIA (all values, not just one)
//   - Test defensive guards with edge-case inputs (.filter, .toUpperCase, .trim)
//   - Assert absence of role on presentational (non-interactive) elements
//
// Keyboard Tiers:
//   T1 Focusable atoms (Button, Link, Chip) — Focus, Enter/Space activates
//   T2 Toggle/disclosure (Disclosure, Accordion) — Enter/Space toggles, Escape closes
//   T3 Selection lists (RadioGroup, Tabs, Select) — Arrows cycle, Enter selects, Escape closes
//   T4 Complex navigation (Menu, DataGrid, Calendar) — Arrow grid, nested contexts
//   T5 Modal/dialog (Dialog, Drawer) — Focus trap, Shift+Tab reverse, Escape closes
//   Note: All keyboard tests use fireEvent.keyDown with both key and code properties
//
// Reference: Button.test.tsx as the completed example

import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { ComponentTemplate } from '.'

expect.extend(toHaveNoViolations)

describe('ComponentTemplate', () => {
  describe('Semantics', () => {
    it('renders with children', () => {
      render(<ComponentTemplate>Children</ComponentTemplate>)
      const component = screen.getByTestId('ComponentTemplate')

      expect(component).toBeInTheDocument()
      expect(component).toHaveTextContent('Children')
    })

    it('forwards className', () => {
      render(<ComponentTemplate className="className" />)
      const component = screen.getByTestId('ComponentTemplate')

      expect(component).toHaveClass('className')
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<ComponentTemplate ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<ComponentTemplate />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
