interface CoreIconProps {
  className?: string
}

export function CoreIcon({ className = "w-6 h-6" }: CoreIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#coreGradient)" />
      <circle cx="12" cy="12" r="7" fill="url(#coreInnerGradient)" />
      <circle cx="12" cy="12" r="4" fill="url(#coreCenterGradient)" />
      <circle cx="12" cy="12" r="2" fill="#fff" />

      <defs>
        <radialGradient id="coreGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="50%" stopColor="#f7931e" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <radialGradient id="coreInnerGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <radialGradient id="coreCenterGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
    </svg>
  )
}
