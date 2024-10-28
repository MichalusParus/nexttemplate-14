type Props = {
  className?: string
}

export default function DoubleChevronIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M7 13L12 18L17 13M7 6L12 11L17 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}

DoubleChevronIcon.displayName = 'DoubleChevronIcon'
