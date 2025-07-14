interface BitcoinIconProps {
  className?: string
}

export function BitcoinIcon({ className = "w-6 h-6" }: BitcoinIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="url(#bitcoinGradient)" />
      <path
        d="M15.5 10.5c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.4-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.1-1.1-.2v0l-2.3-.6-.4 1.8s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 .1.1.1.1.1h-.1l-1.1 4.4c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.9 1.9 2.2.5c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1 1 .2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.9.5 5.1.3 6-2.1.7-1.9-.03-3-1.4-3.7 1-.2 1.8-1 2-2.5zm-3.6 5c-.5 2.1-4.1.9-5.3.7l.9-3.7c1.2.3 4.9.9 4.4 3zm.5-5c-.5 1.9-3.5.9-4.5.7l.8-3.4c1 .2 4.1.7 3.7 2.7z"
        fill="white"
      />
      <defs>
        <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#ff8c00" />
        </linearGradient>
      </defs>
    </svg>
  )
}
