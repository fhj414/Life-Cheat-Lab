import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type NeonButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  href?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
};

const variantClasses = {
  primary:
    "border-gold/70 bg-gradient-to-r from-gold via-cyan to-magenta text-void shadow-gold hover:shadow-neon",
  ghost:
    "border-white/20 bg-white/7 text-white hover:border-cyan/70 hover:bg-cyan/10 hover:text-cyan",
  danger:
    "border-magenta/60 bg-magenta/10 text-magenta hover:bg-magenta/20 hover:shadow-neon"
};

export function NeonButton({ href, children, variant = "primary", className = "", ...props }: NeonButtonProps) {
  const classes = `group relative inline-flex items-center justify-center overflow-hidden rounded-md border px-5 py-3 font-mono text-sm font-black uppercase tracking-[0.16em] transition duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-white/28 transition duration-500 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props} onClick={props.onClick as MouseEventHandler<HTMLButtonElement>}>
      {content}
    </button>
  );
}
