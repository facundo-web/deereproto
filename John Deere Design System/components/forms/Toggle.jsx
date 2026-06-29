import React from 'react';

const SZ = {
  sm: { tw: 32, th: 18, kn: 12, tr: 3 },
  md: { tw: 44, th: 24, kn: 16, tr: 4 },
  lg: { tw: 52, th: 28, kn: 20, tr: 4 },
};

export function Toggle({ checked = false, onChange, label, disabled = false, size = 'md', style: sx, ...rest }) {
  const s = SZ[size] || SZ.md;
  const translate = checked ? (s.tw - s.kn - s.tr * 2) + 'px' : '0px';
  return (
    <label
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Barlow', sans-serif", ...sx }}
      {...rest}
    >
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onChange && onChange(!checked)}
        onKeyDown={e => e.key === ' ' && !disabled && onChange && onChange(!checked)}
        style={{
          display: 'inline-flex', alignItems: 'center',
          width: s.tw, height: s.th, borderRadius: '9999px',
          background: checked ? '#367C2B' : '#C4C3C1',
          padding: s.tr, transition: 'background 200ms',
          opacity: disabled ? 0.5 : 1, flexShrink: 0,
        }}
      >
        <span style={{
          width: s.kn, height: s.kn, borderRadius: '50%', background: '#fff',
          transform: `translateX(${translate})`, transition: 'transform 200ms',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </span>
      {label && (
        <span style={{ fontSize: '14px', fontWeight: 500, color: disabled ? '#9A9897' : '#27251F' }}>
          {label}
        </span>
      )}
    </label>
  );
}
