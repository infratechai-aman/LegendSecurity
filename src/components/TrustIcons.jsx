import React from 'react';

// 1. PSARA Licensed: Clean red shield with white inner core (No neon glows)
export function PsaraShieldIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Red Shield */}
      <path
        d="M16 1.5L3 6.5V15.5C3 24.5 9 31.8 16 34.5C23 31.8 29 24.5 29 15.5V6.5L16 1.5Z"
        fill="#dc2626"
      />
      {/* Inner Dark Cavity */}
      <path
        d="M16 5.2L5.8 9.2V15.5C5.8 22.5 10.3 28.5 16 30.8C21.7 28.5 26.2 22.5 26.2 15.5V9.2L16 5.2Z"
        fill="#0f1015"
      />
      {/* White Emblem Core */}
      <path
        d="M16 8L16 28C20 25.8 23.5 21.2 23.5 15.5V10.5L16 8Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
    </svg>
  );
}

// 2. Police Verified: Clean security officer silhouette (No neon glows)
export function PoliceVerifiedIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 34 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 9C10 5.2 13 3.5 17 3.5C21 3.5 24 5.2 24 9H10Z"
        fill="#dc2626"
      />
      <path
        d="M8.5 9.5C8.5 9.5 12.5 11 17 11C21.5 11 25.5 9.5 25.5 9.5L24 11.5H10L8.5 9.5Z"
        fill="#991b1b"
      />
      <circle cx="17" cy="15" r="4.8" fill="#dc2626" />
      <path
        d="M6 31.5C6 24 10.5 21.5 17 21.5C23.5 21.5 28 24 28 31.5H6Z"
        fill="#dc2626"
      />
      <path
        d="M14.5 21.5L17 26.5L19.5 21.5H21L18 28V31.5H16V28L13 21.5H14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 3. 24/7 Supervision: Clean circular clock (No neon glows)
export function Supervision247Icon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="17"
        cy="17"
        r="14"
        stroke="#dc2626"
        strokeWidth="3.5"
        fill="#0f1015"
      />
      <path
        d="M17 8.5V17H11.5"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="17" r="1.8" fill="#dc2626" />
    </svg>
  );
}

// 4. Location Pin: Clean map marker (No neon glows)
export function LocationPinIcon({ className = 'w-6 h-6 sm:w-7 sm:h-7' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 32 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 1.5C8.8 1.5 3 7.3 3 14.5C3 23.3 14.6 34.6 15.1 35.1C15.6 35.6 16.4 35.6 16.9 35.1C17.4 34.6 29 23.3 29 14.5C29 7.3 23.2 1.5 16 1.5Z"
        fill="#dc2626"
      />
      <circle cx="16" cy="14" r="4.8" fill="#0f1015" />
    </svg>
  );
}

// Clean, prestigious Trust Strip without heavy dark bubble container or neon glows
export default function HeroTrustStrip({ className = '' }) {
  const items = [
    {
      icon: <PsaraShieldIcon />,
      line1: 'PSARA',
      line2: 'Govt. Licensed',
    },
    {
      icon: <PoliceVerifiedIcon />,
      line1: 'Police',
      line2: '100% Verified',
    },
    {
      icon: <Supervision247Icon />,
      line1: '24/7 Ops',
      line2: 'Supervision',
    },
    {
      icon: <LocationPinIcon />,
      line1: 'Pune • Mumbai',
      line2: 'All Maharashtra',
    },
  ];

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 gap-y-3 py-2 px-3 sm:px-6 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm ${className}`}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2.5 px-2 sm:px-3">
            {item.icon}
            <div className="flex flex-col text-left leading-tight">
              <span className="font-heading font-bold text-white text-xs sm:text-sm tracking-wide">
                {item.line1}
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {item.line2}
              </span>
            </div>
          </div>
          {/* Subtle thin hairline divider */}
          {idx < items.length - 1 && (
            <div className="hidden sm:block h-6 w-[1px] bg-white/10" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
