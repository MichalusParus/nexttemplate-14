import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { render, screen } from '../../../../../../.jest/customRender'
import { FormServerError } from '.'

expect.extend(toHaveNoViolations)

const Wrapper = ({
  serverError,
  className,
  innerRef,
}: {
  serverError?: string
  className?: string
  innerRef?: React.Ref<HTMLDivElement>
}) => {
  const form = useForm()

  useEffect(() => {
    if (serverError) {
      form.setError('root.serverError', { message: serverError })
    }
  }, [serverError, form])

  return (
    <FormProvider {...form}>
      <FormServerError className={className} ref={innerRef} />
    </FormProvider>
  )
}

describe('FormServerError', () => {
  describe('Semantics', () => {
    it('renders nothing when no server error', () => {
      render(<Wrapper />)
      expect(screen.queryByTestId('FormServerError')).not.toBeInTheDocument()
    })

    it('renders alert when server error is set', async () => {
      render(<Wrapper serverError="Something went wrong" />)
      const component = await screen.findByTestId('FormServerError')
      expect(component).toBeInTheDocument()
      expect(component).toHaveTextContent('Something went wrong')
    })

    it('renders with error role', async () => {
      render(<Wrapper serverError="Error" />)
      const alert = await screen.findByRole('alert')
      expect(alert).toBeInTheDocument()
    })

    it('forwards className', async () => {
      render(<Wrapper serverError="Error" className="custom-class" />)
      const component = await screen.findByTestId('FormServerError')
      expect(component).toHaveClass('custom-class')
    })
  })

  describe('Ref', () => {
    it('forwards ref', async () => {
      const ref = createRef<HTMLDivElement>()
      render(<Wrapper serverError="Error" innerRef={ref} />)
      await screen.findByTestId('FormServerError')
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations when no error', async () => {
      const { container } = render(<Wrapper />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('no axe violations when error is displayed', async () => {
      const { container } = render(<Wrapper serverError="Something went wrong" />)
      await screen.findByTestId('FormServerError')
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
