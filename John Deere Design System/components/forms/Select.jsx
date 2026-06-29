import React from 'react';

const SZ = {
  sm: { h: '32px', fs: '13px', px: '10px' },
  md: { h: '40px', fs: '14px', px: '12px' },
  lg: { h: '48px', fs: '16px', px: '14px' },
};

export function Select({
  label, hint, error, options = [], placeholder,
  size = 'md', disabled = false,
  id, style: sx, ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selId = id || `sel-${Math.random().toString(36).slice(2, 7)}`;
  const s = SZ[size] || SZ.md;
  const borderColor = error ? '#B91C1C' : focused ? '#367C2B' : '#C4C3C1';
  const shadow = focused ? (error ? '0 0 0 3px rgba(185,28,28,0.22)' : '0 0 0 3px rgba(54,124,43,0.28)') : 'none';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: "'Barlow', sans-serif", ...sx }}>
      {label && (
        <label htmlFor={selId} style={{ fontSize: '13px', fontWeight: 600, color: disabled ? '#9A9897' : '#27251F', lineHeight: 1.4 }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', height: s.h }}>
        <select
          id={selId} disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', height: '100%', appearance: 'none', WebkitAppearance: 'none',
            padding: `0 36px 0 ${s.px}`, fontSize: s.fs, fontFamily: "'Barlow', sans-serif",
            color: '#27251F', background: disabled ? '#F0EFED' : '#fff',
            border: `1px solid ${borderColor}`, borderRadius: '6px',
            boxShadow: shadow, cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border 150ms, box-shadow 150ms', outline: 'none',
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o =>
            typeof o === 'string'
              ? <option key={o} value={o}>{o}</option>
              : <option key={o.value} value={o.value}>{o.label}</option>
          )}
        </select>
        <svg style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#767471' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {(hint || error) && (
        <span style={{ fontSize: '12px', color: error ? '#B91C1C' : '#767471' }}>{error || hint}</span>
      )}
    </div>
  );
}
