import type { Meta, StoryObj } from '@storybook/nextjs'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '../Form'
import { FormServerError } from '.'

const meta: Meta<typeof FormServerError> = {
  title: 'Molecules/Form/forms/FormServerError',
  component: FormServerError,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof FormServerError>

const FormServerErrorPreview = (args: React.ComponentProps<typeof FormServerError>) => {
  const form = useForm()

  useEffect(() => {
    form.setError('root.serverError', { message: 'Something went wrong. Please try again.' })
  }, [form])

  return (
    <div className="w-80">
      <Form name="serverErrorStory" form={form} onSubmit={() => {}}>
        <FormServerError {...args} />
      </Form>
    </div>
  )
}

export const Default: Story = {
  args: {
    className: '',
    variant: 'outlined',
    status: 'error',
    size: 'sm',
    title: '',
    startIcon: undefined,
    endIcon: undefined,
  },
  render: (args) => <FormServerErrorPreview {...args} />,
}
