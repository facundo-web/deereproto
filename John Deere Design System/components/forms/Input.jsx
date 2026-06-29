import React from 'react';

const SZ = {
  sm: { h: '32px', fs: '13px', px: '10px' },
  md: { h: '40px', fs: '14px', px: '12px' },
  lg: { h: '48px', fs: '16px', px: '14px' },
};

export function Input({
  label, hint, error, prefix, suffix,
  size = 'md', disabled = false, type = 'text',
  id, style: sx, ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || `inp-${Math.random().toString(36).slice(2, 7)}`;
  const s = SZ[size] || SZ.md;
  const borderColor = error ? '#B91C1C' : focused ? '#367C2B' : '#C4C3C1';
  const shadow = focused ? (error ? '0 0 0 3px rgba(185,28,28,0.22)' : '0 0 0 3px rgba(54,124,43,0.28)') : 'none';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: "'Barlow', sans-serif", ...sx }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: '13px', fontWeight: 600, color: disabled ? '#9A9897' : '#27251F', lineHeight: 1.4 }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', alignItems: 'center', height: s.h, background: disabled ? '#F0EFED' : '#fff', border: `1px solid ${borderColor}`, borderRadius: '6px', boxShadow: shadow, transition: 'border 150ms, box-shadow 150ms', overflow: 'hidden' }}>
        {prefix && (
          <span style={{ padding: `0 10px 0 ${s.px}`, color: '#767471', fontSize: s.fs, flexShrink: 0, borderRight: '1px solid #DEDEDC', height: '100%', display: 'flex', alignItems: 'center' }}>
            {prefix}
          </span>
        )}
        <input
          id={inputId} type={type} disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent', padding: `0 ${s.px}`, fontSize: s.fs, fontFamily: "'Barlow', sans-serif", color: '#27251F', minWidth: 0 }}
          {...rest}
        />
        {suffix && (
          <span style={{ padding: `0 ${s.px} 0 10px`, color: '#767471', fontSize: s.fs, flexShrink: 0, borderLeft: '1px solid #DEDEDC', height: '100%', display: 'flex', alignItems: 'center' }}>
            {suffix}
          </span>
        )}
      </div>
      {(hint || error) && (
        <span style={{ fontSize: '12px', color: error ? '#B91C1C' : '#767471', lineHeight: 1.4 }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
