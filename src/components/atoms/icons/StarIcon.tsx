import { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const StarIcon = ({ className, ...rest }: Props) => {
  return (
    <svg
      className={className}
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M12 2.5l2.9 6.25 6.85.73-5.12 4.63 1.45 6.74L12 17.6l-6.08 3.25 1.45-6.74L2.25 9.48l6.85-.73L12 2.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

StarIcon.displayName = 'StarIcon'
