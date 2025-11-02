import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/atoms/common/Button'
import { Title } from '@/components/atoms/typography/Title'
import { useFilterData } from '@/utils/hooks/useFilterData'

import {
  ComboboxFields,
  comboboxFormDefaultValues,
  comboboxSchema,
  getOptions,
  InputFields,
  inputFormDefaultValues,
  inputSchema,
  RadioFields,
  radioFormDefaultValues,
  radioSchema,
} from '../../../../../../.storybook/helpers'
import { Form } from '../Form'
import { StepForm } from '.'
import { StepFormProps } from './StepForm'

const meta: Meta<typeof StepForm> = {
  title: 'Molecules/Form/forms/StepForm',
  component: StepForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof StepForm>

const StepFormWithHooks = (args: StepFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(args.currentStep || 0)
  const optionsRef = useRef(getOptions('formStory', 20))
  const { filteredData: autocompleteOptions, setFilter: setAutocompleteFilter } = useFilterData(
    optionsRef.current,
  )
  const { filteredData: multiAutocompleteOptions, setFilter: setMultiAutocompleteFilter } =
    useFilterData(optionsRef.current)

  const handleMockUpload = async (file: File): Promise<File> => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('upload', file)
        resolve(file)
      }, 2000)
    })
  }

  const inputForm = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: inputFormDefaultValues,
  })

  const radioForm = useForm<z.infer<typeof radioSchema>>({
    resolver: zodResolver(radioSchema),
    defaultValues: radioFormDefaultValues,
  })

  const comboboxForm = useForm<z.infer<typeof comboboxSchema>>({
    resolver: zodResolver(comboboxSchema),
    defaultValues: comboboxFormDefaultValues,
  })

  const steps = [
    {
      value: 0,
      label: 'Input fields',
      component: (
        <>
          <Title className="py-6" variant="h2">
            Input fields
          </Title>
          <Form<z.infer<typeof inputSchema>>
            name="inputForm"
            form={inputForm}
            onSubmit={() => setCurrentStep(prev => prev + 1)}
            color={args.color}
            size={args.size}
          >
            <InputFields handleMockUpload={handleMockUpload} />
            <div className="flex w-full justify-between">
              <Button type="button" className="invisible" variant="text" color={args.color}>
                Back
              </Button>
              <Button type="submit" form="inputForm" color={args.color}>
                Continue
              </Button>
            </div>
          </Form>
        </>
      ),
    },
    {
      value: 1,
      label: 'Radio fields',
      component: (
        <>
          <Title className="py-6" variant="h2">
            Radio fields
          </Title>
          <Form<z.infer<typeof radioSchema>>
            name="radioForm"
            form={radioForm}
            onSubmit={() => setCurrentStep(prev => prev + 1)}
            color={args.color}
            size={args.size}
          >
            <RadioFields />
            <div className="flex w-full justify-between">
              <Button
                type="button"
                variant="text"
                color={args.color}
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </Button>
              <Button type="submit" form="radioForm" color={args.color}>
                Continue
              </Button>
            </div>
          </Form>
        </>
      ),
    },
    {
      value: 2,
      label: 'Combobox fields',
      component: (
        <>
          <Title className="py-6" variant="h2">
            Combobox fields
          </Title>
          <Form<z.infer<typeof comboboxSchema>>
            name="comboboxForm"
            form={comboboxForm}
            onSubmit={() => setCurrentStep(prev => prev + 1)}
            color={args.color}
            size={args.size}
          >
            <ComboboxFields
              autocompleteOptions={autocompleteOptions}
              multiAutocompleteOptions={multiAutocompleteOptions}
              setAutocompleteFilter={setAutocompleteFilter}
              setMultiAutocompleteFilter={setMultiAutocompleteFilter}
            />
            <div className="flex w-full justify-between">
              <Button
                type="button"
                variant="text"
                color={args.color}
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </Button>
              <Button type="submit" form="comboboxForm" color={args.color}>
                Continue
              </Button>
            </div>
          </Form>
        </>
      ),
    },
    {
      value: 3,
      label: 'Finish',
      component: (
        <Title className="py-6" variant="h2">
          Success
        </Title>
      ),
    },
  ]

  return (
    <StepForm {...args} steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
  )
}

export const Default: Story = {
  args: {
    className: 'w-[30rem] mx-auto',
    name: 'step',
    steps: [],
    currentStep: 0,
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    fullWidth: true,
    selectProps: {},
    tabButtonProps: {},
    onStepChange: v => console.log('set step', v),
  },
  render: args => <StepFormWithHooks {...args} />,
}
