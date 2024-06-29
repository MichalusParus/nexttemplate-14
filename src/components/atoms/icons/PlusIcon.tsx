type Props = {
  className?: string
}

export default function PlusIcon({ className = '' }: Props) {
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
          d="M6 12H18M12 6V18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  )
}
