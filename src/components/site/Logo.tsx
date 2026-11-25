import { Link } from "@tanstack/react-router";
export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Bharat Furniture home">
      <svg viewBox="0 0 40 40" className="h-9 w-9 text-primary" aria-hidden>
        <rect x="1" y="1" width="38" height="38" rx="8" fill="currentColor" />
        <path d="M10 28h20M12 28V16l8-5 8 5v12M16 28v-7h8v7" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeLinejoin="round" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-xl font-semibold text-primary">Bharat</span>
        <span className="block text-[0.62rem] font-bold tracking-[0.32em] text-muted-foreground">FURNITURE</span>
      </span>
    </Link>
  );
}
