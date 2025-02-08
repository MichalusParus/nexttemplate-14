import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const MinusIcon = ({ className, ...rest }: Props) => {
  return (
    <svg
      className={className}
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g>
        <path
          d="M6 12L18 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}

MinusIcon.displayName = 'MinusIcon'
