interface CoralIconProps {
  className?: string
}

export function CoralIcon({ className = "w-6 h-6" }: CoralIconProps) {
  return (
    <img
      src="/images/coral-icon.png"
      alt="Coral Icon"
      className={className}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
      }}
    />
  )
}
