import React from 'react';

export type KazakhOrnamentVariant = 'corner' | 'divider' | 'border-band' | 'seal';

export interface KazakhOrnamentProps {
  variant?: KazakhOrnamentVariant;
  className?: string;
  color?: string;
  size?: number | string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
  alt?: string;
}

/**
 * Authentic Kazakh Ornamental Vector Component
 * Variants:
 * - corner: Traditional "Qoshqar muiiz" (ram's horn) corner flourish for cards and frames.
 * - divider: Horizontal hairline ornamental rule with central ram's horn spiral.
 * - border-band: Geometric frieze ribbon pattern for section borders.
 * - seal: Circular archival medallion with central sun/ram-horn rosette.
 */
export const KazakhOrnament: React.FC<KazakhOrnamentProps> = ({
  variant = 'divider',
  className = '',
  color = '#B18A52', // Muted Gold default
  size,
  style,
  'aria-hidden': ariaHidden = true,
  alt,
}) => {
  if (variant === 'corner') {
    const dimension = size || 32;
    return (
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none pointer-events-none ${className}`}
        style={{ color, ...style }}
        aria-hidden={ariaHidden}
        aria-label={alt}
      >
        {/* Authentic Qoshqar Muiiz corner flourish */}
        <path
          d="M6 42V18C6 11.3726 11.3726 6 18 6H42"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 38V20C10 14.4772 14.4772 10 20 10H38"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        {/* Curled spiral horn */}
        <path
          d="M18 16C16 16 14 17.5 14 20C14 23 18 24 20 22C21.5 20.5 21 18 18 18"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" />
        <circle cx="6" cy="6" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (variant === 'divider') {
    return (
      <div
        className={`flex items-center justify-center gap-3 w-full my-4 select-none ${className}`}
        style={style}
        aria-hidden={ariaHidden}
      >
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-soft-line to-muted-gold/40" />
        <svg
          width={size || 72}
          height={20}
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
          style={{ color }}
        >
          {/* Central symmetrical Qoshqar Muiiz emblem */}
          <path
            d="M60 21V3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Left horn */}
          <path
            d="M60 9C55 4 48 4 44 8C39 13 43 19 48 18C52 17 53 13 50 11C47 9 44 11 44 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Right horn */}
          <path
            d="M60 9C65 4 72 4 76 8C81 13 77 19 72 18C68 17 67 13 70 11C73 9 76 11 76 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Flanking diamond accents */}
          <path d="M28 12L32 9L36 12L32 15Z" fill="currentColor" />
          <path d="M84 12L88 9L92 12L88 15Z" fill="currentColor" />
          <circle cx="60" cy="12" r="2" fill="currentColor" />
        </svg>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-soft-line to-muted-gold/40" />
      </div>
    );
  }

  if (variant === 'border-band') {
    return (
      <svg
        width="100%"
        height={size || 16}
        viewBox="0 0 400 16"
        preserveAspectRatio="repeat-x"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full block select-none ${className}`}
        style={{ color, ...style }}
        aria-hidden={ariaHidden}
      >
        <pattern id="kz-frieze" width="40" height="16" patternUnits="userSpaceOnUse">
          {/* Repeating geometric Kazakh border pattern */}
          <path
            d="M0 8L10 0L20 8L30 0L40 8L30 16L20 8L10 16L0 8Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            strokeOpacity="0.4"
          />
          <circle cx="20" cy="8" r="1.5" fill="currentColor" />
        </pattern>
        <rect width="100%" height="16" fill="url(#kz-frieze)" />
      </svg>
    );
  }

  if (variant === 'seal') {
    const dimension = size || 64;
    return (
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block select-none ${className}`}
        style={{ color, ...style }}
        aria-hidden={ariaHidden}
        aria-label={alt}
      >
        {/* Archival Medallion Seal */}
        <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
        {/* 4-point solar ram-horn rosette */}
        <path
          d="M40 18 C35 25 35 35 40 40 C45 35 45 25 40 18 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M40 62 C35 55 35 45 40 40 C45 45 45 55 40 62 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M18 40 C25 35 35 35 40 40 C35 45 25 45 18 40 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M62 40 C55 35 45 35 40 40 C45 45 55 45 62 40 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        {/* Center solar core */}
        <circle cx="40" cy="40" r="4" fill="currentColor" />
        <circle cx="40" cy="40" r="7" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }

  return null;
};
