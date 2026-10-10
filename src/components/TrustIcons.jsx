import React from 'react';

// 1. PSARA Licensed: Red shield with white inner emblem
export function PsaraShieldIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8' }) {
  return (
    <svg
      className={`${className} shrink-0 filter drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]`}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Red Shield */}
      <path
        d="M16 1.5L3 6.5V15.5C3 24.5 9 31.8 16 34.5C23 31.8 29 24.5 29 15.5V6.5L16 1.5Z"
        fill="#E50914"
      />
      {/* Inner Dark Cavity */}
      <path
        d="M16 5.2L5.8 9.2V15.5C5.8 22.5 10.3 28.5 16 30.8C21.7 28.5 26.2 22.5 26.2 15.5V9.2L16 5.2Z"
        fill="#0c0d12"
      />
      {/* White Emblem / Shield Core */}
      <path
        d="M16 8L16 28C20 25.8 23.5 21.2 23.5 15.5V10.5L16 8Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
    </svg>
  );
}

// 2. Police Verified: Red officer silhouette with peaked cap and white collar/tie
export function PoliceVerifiedIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8' }) {
  return (
    <svg
      className={`${className} shrink-0 filter drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]`}
      viewBox="0 0 34 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Peaked Cap */}
      <path
        d="M10 9C10 5.2 13 3.5 17 3.5C21 3.5 24 5.2 24 9H10Z"
        fill="#E50914"
      />
      <path
        d="M8.5 9.5C8.5 9.5 12.5 11 17 11C21.5 11 25.5 9.5 25.5 9.5L24 11.5H10L8.5 9.5Z"
        fill="#9B040C"
      />
      {/* Head */}
      <circle cx="17" cy="15" r="4.8" fill="#E50914" />
      {/* Shoulders / Uniform Body */}
      <path
        d="M6 31.5C6 24 10.5 21.5 17 21.5C23.5 21.5 28 24 28 31.5H6Z"
        fill="#E50914"
      />
      {/* White V-Neck / Tie Accent */}
      <path
        d="M14.5 21.5L17 26.5L19.5 21.5H21L18 28V31.5H16V28L13 21.5H14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 3. 24/7 Supervision: Red circular clock with white hands
export function Supervision247Icon({ className = 'w-7 h-7 sm:w-8 sm:h-8' }) {
  return (
    <svg
      className={`${className} shrink-0 filter drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]`}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red outer ring */}
      <circle
        cx="17"
        cy="17"
        r="14"
        stroke="#E50914"
        strokeWidth="4"
        fill="#0c0d12"
      />
      {/* White clock hands pointing to 9:00 / 12:00 */}
      <path
        d="M17 8.5V17H11.5"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="17" r="1.8" fill="#E50914" />
    </svg>
  );
}

// 4. Pune • Mumbai All MH: Red teardrop location pin with dark center hole
export function LocationPinIcon({ className = 'w-7 h-7 sm:w-8 sm:h-8' }) {
  return (
    <svg
      className={`${className} shrink-0 filter drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]`}
      viewBox="0 0 32 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 1.5C8.8 1.5 3 7.3 3 14.5C3 23.3 14.6 34.6 15.1 35.1C15.6 35.6 16.4 35.6 16.9 35.1C17.4 34.6 29 23.3 29 14.5C29 7.3 23.2 1.5 16 1.5Z"
        fill="#E50914"
      />
      <circle cx="16" cy="14" r="4.8" fill="#0c0d12" />
    </svg>
  );
}

// Full Trust Credibility Strip matching reference image
export default function HeroTrustStrip({ className = '' }) {
  const items = [
    {
      icon: <PsaraShieldIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
      line1: 'PSARA',
      line2: 'Licensed',
    },
    {
      icon: <PoliceVerifiedIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
      line1: 'Police',
      line2: 'Verified',
    },
    {
      icon: <Supervision247Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
      line1: '24/7',
      line2: 'Supervision',
    },
    {
      icon: <LocationPinIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
      line1: 'Pune • Mumbai',
      line2: 'All MH',
    },
  ];

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-y-4 py-2 sm:py-2.5 px-3 sm:px-6 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] ${className}`}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-5 group cursor-default">
            {item.icon}
            <div className="flex flex-col text-left leading-tight">
              <span className="font-heading font-black text-white text-xs sm:text-sm tracking-wide group-hover:text-brand-red transition-colors">
                {item.line1}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium tracking-wide">
                {item.line2}
              </span>
            </div>
          </div>
          {/* Vertical divider line */}
          {idx < items.length - 1 && (
            <div className="hidden sm:block h-7 w-[1px] bg-white/15" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
