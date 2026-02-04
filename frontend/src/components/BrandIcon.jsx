function BrandIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 24c7-1 13-7 14-14 1 7 7 13 14 14-7 1-13 7-14 14-1-7-7-13-14-14z" />
      <path d="M31 9h7m-3.5-3.5V12.5" />
    </svg>
  )
}

export default BrandIcon
