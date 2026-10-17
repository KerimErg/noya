/**
 * Mascotte originale « Mario le chef » : toque, grosse moustache, foulard rouge, pouce levé.
 * Personnage créé pour Chez Mario — à remplacer par une illustration professionnelle si souhaité.
 */
export function Mascot({ className, title = "Mario, le chef de Chez Mario" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 400 460" className={className} role="img" aria-label={title}>
      <defs>
        <radialGradient id="mSkin" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#FFD3A1" />
          <stop offset="1" stopColor="#E9A56B" />
        </radialGradient>
        <linearGradient id="mJacket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6DED2" />
        </linearGradient>
        <linearGradient id="mRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF4A3D" />
          <stop offset="1" stopColor="#B5140F" />
        </linearGradient>
      </defs>

      {/* Buste / veste de chef */}
      <path d="M70 460c4-86 52-128 130-128s126 42 130 128z" fill="url(#mJacket)" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />
      <path d="M200 340v120" stroke="#1a1a1a" strokeWidth="5" opacity=".25" />
      <g fill="#1a1a1a">
        <circle cx="176" cy="392" r="7" /><circle cx="224" cy="392" r="7" />
        <circle cx="176" cy="428" r="7" /><circle cx="224" cy="428" r="7" />
      </g>
      {/* Foulard */}
      <path d="M140 336c20 22 100 22 120 0l-10 36c-30 14-70 14-100 0z" fill="url(#mRed)" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />
      <path d="M196 366l-18 44 26-14 22 14-14-44z" fill="url(#mRed)" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />

      {/* Oreilles */}
      <ellipse cx="108" cy="232" rx="20" ry="28" fill="url(#mSkin)" stroke="#1a1a1a" strokeWidth="6" />
      <ellipse cx="292" cy="232" rx="20" ry="28" fill="url(#mSkin)" stroke="#1a1a1a" strokeWidth="6" />
      {/* Tête */}
      <path d="M112 210c0-62 40-96 88-96s88 34 88 96c0 78-36 124-88 124s-88-46-88-124z" fill="url(#mSkin)" stroke="#1a1a1a" strokeWidth="6" />
      {/* Cheveux / pattes */}
      <path d="M116 196c-4-30 8-52 20-60 4 22 6 40 2 62zM284 196c4-30-8-52-20-60-4 22-6 40-2 62z" fill="#3b2416" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />

      {/* Toque */}
      <path d="M118 150c-30-6-44-36-30-62 12-24 42-30 62-18 6-32 34-52 62-46 24 4 40 22 42 44 22-14 54-8 66 16 14 28-4 60-34 66z" fill="url(#mJacket)" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />
      <path d="M116 146h170l-6 34H122z" fill="url(#mRed)" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />
      <text x="201" y="173" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#fff" letterSpacing="1">CM</text>

      {/* Sourcils */}
      <path d="M146 204c12-12 30-14 42-6M212 198c12-8 30-6 42 6" stroke="#2a180e" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Yeux */}
      <ellipse cx="166" cy="226" rx="13" ry="17" fill="#fff" stroke="#1a1a1a" strokeWidth="5" />
      <ellipse cx="234" cy="226" rx="13" ry="17" fill="#fff" stroke="#1a1a1a" strokeWidth="5" />
      <circle cx="169" cy="229" r="7" fill="#1a1a1a" />
      <circle cx="231" cy="229" r="7" fill="#1a1a1a" />
      <circle cx="171" cy="226" r="2.4" fill="#fff" />
      <circle cx="233" cy="226" r="2.4" fill="#fff" />
      {/* Joues */}
      <ellipse cx="140" cy="262" rx="14" ry="9" fill="#FF6B5B" opacity=".45" />
      <ellipse cx="260" cy="262" rx="14" ry="9" fill="#FF6B5B" opacity=".45" />

      {/* Sourire */}
      <path d="M170 300c16 16 44 16 60 0" fill="#7a1410" stroke="#1a1a1a" strokeWidth="5" strokeLinejoin="round" />
      {/* Moustache */}
      <path
        d="M200 262c-14-10-40-12-58-2-16 9-22 24-36 26 8 14 30 18 48 10 18-7 32-18 46-18 14 0 28 11 46 18 18 8 40 4 48-10-14-2-20-17-36-26-18-10-44-8-58 2z"
        fill="#2a180e"
        stroke="#1a1a1a"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Nez */}
      <ellipse cx="200" cy="252" rx="22" ry="18" fill="url(#mSkin)" stroke="#1a1a1a" strokeWidth="6" />
      <ellipse cx="193" cy="246" rx="6" ry="4" fill="#fff" opacity=".5" />

      {/* Main pouce levé */}
      <g transform="translate(286 300) rotate(-8)">
        <path d="M-6 92c-10-40 0-64 20-70l10-40c4-14 26-12 26 4l-4 30h30c14 0 20 14 14 24 10 4 10 18 2 24 6 6 4 18-6 22 4 8-2 20-14 20H14c-10 0-16-6-20-14z" fill="url(#mJacket)" stroke="#1a1a1a" strokeWidth="6" strokeLinejoin="round" />
        <path d="M60 46h28M58 70h30M56 92h26" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" opacity=".45" />
      </g>
    </svg>
  );
}

/** Tête seule, pour le logo et le favicon. */
export function MascotHead({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#D81E1A" />
      <path d="M36 52c-8-2-12-10-8-17 3-6 11-8 16-5 2-9 9-14 17-12 6 1 10 6 11 12 6-4 14-2 17 4 4 8-1 16-9 18z" fill="#fff" />
      <rect x="35" y="48" width="50" height="10" rx="2" fill="#A3120F" />
      <path d="M36 62c0-2 0-4 1-5h46c1 1 1 3 1 5 0 24-10 38-24 38S36 86 36 62z" fill="#FFD3A1" />
      <circle cx="51" cy="68" r="3.2" fill="#1a1a1a" />
      <circle cx="69" cy="68" r="3.2" fill="#1a1a1a" />
      <path d="M60 80c-4-3-12-4-17-1-5 3-7 7-11 8 3 4 9 5 14 3 6-2 10-6 14-6s8 4 14 6c5 2 11 1 14-3-4-1-6-5-11-8-5-3-13-2-17 1z" fill="#2a180e" />
      <ellipse cx="60" cy="77" rx="6.5" ry="5.5" fill="#F0B27E" />
    </svg>
  );
}
