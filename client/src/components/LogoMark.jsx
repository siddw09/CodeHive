import React from 'react';

export default function LogoMark({ className = '' }) {
  return (
    <svg 
      viewBox="0 0 100 110" 
      className={`logo-mark ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hexagon background */}
      <polygon fill="#E8DCC8" points="50,15 80,32 80,70 50,87 20,70 20,32" />
      
      {/* Hexagon border */}
      <polygon fill="none" stroke="#002B5B" strokeWidth="2.5" strokeLinejoin="round" points="50,15 80,32 80,70 50,87 20,70 20,32" />

      {/* Code brackets </> */}
      <text x="50" y="51" fill="#002B5B" fontSize="28" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
        &lt;/&gt;
      </text>

      {/* Connection line from hexagon to red dot */}
      <line x1="75" y1="30" x2="88" y2="20" stroke="#002B5B" strokeWidth="1.2" />

      {/* Red dot/bubble */}
      <circle cx="92" cy="16" r="6" fill="#EA5455" />
    </svg>
  );
}