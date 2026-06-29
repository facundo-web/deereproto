import React from 'react';

const SZ = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64, '2xl': 80 };
const COLORS = ['#367C2B', '#2A6122', '#1D4ED8', '#7C3AED', '#B45309', '#0F766E', '#1E4718', '#4E9B3E'];

function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
}

export function Avatar({ name, src, size = 'md', style: sx, ...rest }) {
  const [imgErr, setImgErr] = React.useState(false);
  const px = SZ[size] || SZ.md;
  const ini = initials(name).toUpperCase();
  const colorIdx = (name || '').charCodeAt(0) % COLORS.length;
  const showImg = src && !imgErr;
  return (
    <div
      style={{
        width: px, height: px, borderRadius: '9999px',
        background: showImg ? 'transparent' : COLORS[colorIdx],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.floor(px * 0.38) + 'px',
        fontFamily: "'Barlow', sans-serif", fontWeight: 600,
        color: '#fff', flexShrink: 0, overflow: 'hidden', userSelect: 'none', ...sx,
      }}
      {...rest}
    >
      {showImg
        ? <img src={src} alt={name} width={px} height={px} style={{ objectFit: 'cover' }} onError={() => setImgErr(true)} />
        : ini || '?'}
    </div>
  );
}
