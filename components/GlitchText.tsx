type GlitchTextProps = {
  children: string;
  className?: string;
};

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute left-0 top-0 -z-0 animate-glitchShift text-cyan opacity-70"
        style={{ clipPath: "inset(0 0 58% 0)" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-0 -z-0 animate-glitchShift text-magenta opacity-70"
        style={{ clipPath: "inset(58% 0 0 0)", animationDelay: "120ms" }}
      >
        {children}
      </span>
    </span>
  );
}
