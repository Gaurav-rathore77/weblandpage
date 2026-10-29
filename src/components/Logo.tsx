type LogoProps = {
  variant?: 'dark' | 'light';
  className?: string;
  markClassName?: string;
};

const palette = {
  dark: {
    tile: '#FFFFFF',
    blockSmall: '#3F3F46',
    blockThin: '#52525B',
    blockLarge: '#A1A1AA',
    word: 'text-white',
  },
  light: {
    tile: '#0F172A',
    blockSmall: '#CBD5E1',
    blockThin: '#94A3B8',
    blockLarge: '#475569',
    word: 'text-slate-900',
  },
} as const;

export function Logo({ variant = 'dark', className = '', markClassName = 'h-9' }: LogoProps) {
  const c = palette[variant];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 44"
        aria-hidden="true"
        focusable="false"
        className={`w-auto ${markClassName}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="21" height="21" rx="5.5" fill={c.tile} />
        <rect x="27" width="21" height="10" rx="5" fill={c.blockSmall} />
        <rect x="4" y="24" width="9" height="20" rx="4.5" fill={c.blockThin} />
        <rect x="27" y="24" width="21" height="20" rx="5.5" fill={c.blockLarge} />
      </svg>
      <span className={`font-display text-[1.55rem] font-extrabold leading-none tracking-tight ${c.word}`}>
        Weblign
      </span>
    </span>
  );
}
