import React from 'react';

export function Checkbox({ checked = false, onChange, label, hint, disabled = false, indeterminate = false, style: sx, ...rest }) {
  const [hov, setHov] = React.useState(false);
  const active = checked || indeterminate;
  const bg = disabled ? '#F0EFED' : active ? '#367C2B' : hov ? '#EDF7EA' : '#fff';
  const bd = disabled ? '#DEDEDC' : active ? '#367C2B' : hov ? '#367C2B' : '#9A9897';
  return (
    <label
      style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Barlow', sans-serif", ...sx }}
      {...rest}
    >
      <span
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        tabIndex={disabled ? -1 : 0}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => !disabled && onChange && onChange(!checked)}
        onKeyDown={e => e.key === ' ' && !disabled && onChange && onChange(!checked)}
        style={{
          width: 18, height: 18, borderRadius: '4px', flexShrink: 0, marginTop: 1,
          background: bg, border: `2px solid ${bd}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 150ms, border 150ms',
        }}
      >
        {active && !disabled && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            {indeterminate
              ? <path d="M2 5h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              : <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        )}
      </span>
      {label && (
        <span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: disabled ? '#9A9897' : '#27251F', display: 'block', lineHeight: 1.3 }}>{label}</span>
          {hint && <span style={{ fontSize: '12px', color: '#767471', marginTop: 2, display: 'block' }}>{hint}</span>}
        </span>
      )}
    </label>
  );
}
