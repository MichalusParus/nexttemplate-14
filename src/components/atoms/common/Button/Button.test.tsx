import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Button } from '.'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  describe('Semantics', () => {
    it('renders as button', () => {
      render(<Button>button</Button>)
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('forwards className', () => {
      render(<Button className="className">button</Button>)
      const button = screen.getByRole('button')

      expect(button).toHaveClass('className')
    })

    it('type submit', () => {
      render(<Button type="submit" />)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('type', 'submit')
    })

    it('disabled sets aria-disabled', () => {
      render(<Button disabled />)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled overrides type to button', () => {
      render(<Button type="submit" disabled />)
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('type', 'button')
    })

    it('loading shows loader', () => {
      render(<Button isLoading>button</Button>)
      const button = screen.getByRole('button')
      const status = screen.getByRole('status')
      const buttonText = screen.getByText('button')

      expect(status).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(buttonText).toHaveAttribute('aria-hidden', 'true')
      expect(buttonText).toHaveClass('invisible')
    })

    it('icon-only renders icon', () => {
      render(<Button startIcon={<svg role="img" />} aria-label="label" />)
      const button = screen.getByRole('button')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(button).toHaveTextContent('')
      expect(button).toHaveAttribute('aria-label', 'label')
    })

    it('startIcon renders with children', () => {
      render(<Button startIcon={<svg role="img" />}>button</Button>)
      const button = screen.getByRole('button')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(button).toHaveTextContent('button')
    })

    it('endIcon renders with children', () => {
      render(<Button endIcon={<svg role="img" />}>button</Button>)
      const button = screen.getByRole('button')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(button).toHaveTextContent('button')
    })

    it('endIcon-only renders icon', () => {
      render(<Button endIcon={<svg role="img" />} aria-label="label" />)
      const button = screen.getByRole('button')
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(button).toHaveTextContent('')
      expect(button).toHaveAttribute('aria-label', 'label')
    })

    it('loading with icon-only skips overlay', () => {
      render(<Button isLoading startIcon={<svg role="img" />} aria-label="icon" />)
      const loader = screen.queryByRole('status')

      expect(loader).not.toBeInTheDocument()
    })

    it('loading with inline skips overlay', () => {
      render(
        <Button isLoading size="inline">
          button
        </Button>,
      )
      const loader = screen.queryByRole('status')

      expect(loader).not.toBeInTheDocument()
    })

    it('disabled + loading sets both ARIA states', () => {
      render(
        <Button disabled isLoading>
          button
        </Button>,
      )
      const button = screen.getByRole('button')

      expect(button).toHaveAttribute('aria-disabled', 'true')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('icon-only warns without aria-label', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(<Button startIcon={<svg role="img" />} />)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[components] Icon-only buttons should have an aria-label for accessibility.',
      )
      consoleWarnSpy.mockRestore()
    })
  })

  describe('Keyboard', () => {
    it('disabled remains focusable', () => {
      render(<Button disabled />)
      const button = screen.getByRole('button')

      button.focus()
      expect(document.activeElement).toBe(button)
    })

    it('Enter prevented when disabled', () => {
      const onClick = jest.fn()
      render(<Button disabled onClick={onClick} />)
      const button = screen.getByRole('button')

      const event = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')
      button.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(onClick).not.toHaveBeenCalled()
    })

    it('Space prevented when disabled', () => {
      const onClick = jest.fn()
      render(<Button disabled onClick={onClick} />)
      const button = screen.getByRole('button')

      const event = new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')
      button.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
      expect(onClick).not.toHaveBeenCalled()
    })

    it('onKeyDown fires when disabled', () => {
      const onKeyDown = jest.fn()
      render(<Button disabled onKeyDown={onKeyDown} />)

      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter', code: 'Enter' })
      expect(onKeyDown).toHaveBeenCalledTimes(1)
    })
  })

  describe('Interaction', () => {
    it('click fires onClick', () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick} />)

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('loading prevents click', () => {
      const onClick = jest.fn()
      render(
        <Button isLoading onClick={onClick}>
          button
        </Button>,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('disabled prevents click', () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick} disabled />)

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('disabled + loading prevents click', () => {
      const onClick = jest.fn()
      render(
        <Button disabled isLoading onClick={onClick}>
          button
        </Button>,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>button</Button>)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Button>button</Button>)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
