import React from 'react';

const BV = {
  default: { bg: '#F0EFED', fg: '#595754', bd: '#DEDEDC' },
  success: { bg: '#EDF7EA', fg: '#2A6122', bd: '#A3D698' },
  warning: { bg: '#FFFBEB', fg: '#854D0E', bd: '#FDE68A' },
  error:   { bg: '#FEE2E2', fg: '#991B1B', bd: '#FECACA' },
  info:    { bg: '#EFF6FF', fg: '#1D4ED8', bd: '#BFDBFE' },
  green:   { bg: '#367C2B', fg: '#fff',    bd: 'transparent' },
  yellow:  { bg: '#FFDE00', fg: '#27251F', bd: 'transparent' },
};
const BS = {
  sm: { fs: '11px', px: '7px',  h: '20px' },
  md: { fs: '12px', px: '9px',  h: '24px' },
  lg: { fs: '13px', px: '11px', h: '28px' },
};

export function Badge({ variant = 'default', size = 'md', dot = false, children, style: sx, ...rest }) {
  const v = BV[variant] || BV.default;
  const s = BS[size] || BS.md;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        height: s.h, padding: `0 ${s.px}`,
        fontSize: s.fs, fontFamily: "'Barlow', sans-serif", fontWeight: 600,
        letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1,
        color: v.fg, background: v.bg, border: `1px solid ${v.bd}`,
        borderRadius: '4px', whiteSpace: 'nowrap', ...sx,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />}
      {children}
    </span>
  );
}
