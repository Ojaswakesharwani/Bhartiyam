import React from 'react';

interface CrestProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'icon' | 'monochrome';
}

export const SchoolCrest: React.FC<CrestProps> = ({
  className = "w-12 h-12",
  size = 48,
  variant = 'full'
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Antique Gold Gradient */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4E7CA" />
          <stop offset="45%" stopColor="#C99D42" />
          <stop offset="70%" stopColor="#A67C2E" />
          <stop offset="100%" stopColor="#785315" />
        </linearGradient>

        {/* Oxford Navy Inner Gradient */}
        <radialGradient id="navyRad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A2E56" />
          <stop offset="85%" stopColor="#0F1D3A" />
          <stop offset="100%" stopColor="#081020" />
        </radialGradient>
      </defs>

      {/* Outer Fine Millgrain Ring */}
      <circle cx="60" cy="60" r="57" stroke="url(#goldGrad)" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.8" />
      
      {/* Heavy Architectural Border */}
      <circle cx="60" cy="60" r="53" fill="url(#navyRad)" stroke="url(#goldGrad)" strokeWidth="2.5" />
      
      {/* Inner Thin Rule */}
      <circle cx="60" cy="60" r="48" stroke="#E6D5B8" strokeWidth="0.8" opacity="0.6" />

      {/* Starburst rays */}
      <g stroke="url(#goldGrad)" strokeWidth="0.75" opacity="0.35">
        <line x1="60" y1="12" x2="60" y2="20" />
        <line x1="60" y1="100" x2="60" y2="108" />
        <line x1="12" y1="60" x2="20" y2="60" />
        <line x1="100" y1="60" x2="108" y2="60" />
        <line x1="26" y1="26" x2="32" y2="32" />
        <line x1="88" y1="88" x2="94" y2="94" />
        <line x1="94" y1="26" x2="88" y2="32" />
        <line x1="26" y1="94" x2="32" y2="88" />
      </g>

      {/* Open Book of Wisdom */}
      <path
        d="M36 72 C46 68, 54 69, 60 74 C66 69, 74 68, 84 72 L84 48 C74 44, 66 45, 60 50 C54 45, 46 44, 36 48 Z"
        fill="#F9F6F0"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
      />
      <line x1="60" y1="50" x2="60" y2="74" stroke="#0F1D3A" strokeWidth="1.2" />

      {/* Book Text Hairlines */}
      <line x1="42" y1="55" x2="54" y2="54" stroke="#A67C2E" strokeWidth="0.8" opacity="0.7" />
      <line x1="42" y1="60" x2="54" y2="59" stroke="#A67C2E" strokeWidth="0.8" opacity="0.7" />
      <line x1="42" y1="65" x2="52" y2="64" stroke="#A67C2E" strokeWidth="0.8" opacity="0.7" />
      <line x1="66" y1="54" x2="78" y2="55" stroke="#A67C2E" strokeWidth="0.8" opacity="0.7" />
      <line x1="66" y1="59" x2="78" y2="60" stroke="#A67C2E" strokeWidth="0.8" opacity="0.7" />
      <line x1="66" y1="64" x2="76" y2="65" stroke="#A67C2E" strokeWidth="0.8" opacity="0.7" />

      {/* Sacred Jyoti / Lotus Flame Above Book */}
      <path
        d="M60 25 C63 32, 69 36, 60 46 C51 36, 57 32, 60 25 Z"
        fill="url(#goldGrad)"
      />
      <circle cx="60" cy="38" r="2.5" fill="#B84A14" />

      {/* Laurel Garland / Ears of Grain */}
      <path
        d="M30 65 C26 52, 30 38, 38 29"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M90 65 C94 52, 90 38, 82 29"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Lower Ribbon Banner with 'ESTD 2005' */}
      <path
        d="M32 87 L60 83 L88 87 L84 94 L60 90 L36 94 Z"
        fill="url(#goldGrad)"
      />
      <text
        x="60"
        y="90.5"
        textAnchor="middle"
        fill="#0F1D3A"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="sans-serif"
        letterSpacing="0.8"
      >
        ESTD. 2005
      </text>

      {/* Tiny Stars on Crest */}
      <polygon points="60,19 61,21 63,21 61.5,22.5 62,25 60,23.5 58,25 58.5,22.5 57,21 59,21" fill="#F4E7CA" />
    </svg>
  );
};
