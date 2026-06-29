import React from 'react';

if (typeof document !== 'undefined' && !document.getElementById('__jd-anim')) {
  const s = document.createElement('style');
  s.id = '__jd-anim';
  s.textContent = '@keyframes jdSpin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}

const V = {
  primary:   { bg:'#367C2B', fg:'#fff',     bd:'transparent', hov:'#2A6122', act:'#1E4718' },
  secondary: { bg:'transparent', fg:'#367C2B', bd:'#367C2B', hov:'#EDF7EA', act:'#D1EBCA' },
  ghost:     { bg:'transparent', fg:'#27251F', bd:'transparent', hov:'#F0EFED', act:'#DEDEDC' },
  danger:    { bg:'#B91C1C', fg:'#fff',     bd:'transparent', hov:'#991B1B', act:'#7F1D1D' },
  warning:   { bg:'#FFDE00', fg:'#27251F', bd:'transparent', hov:'#E6C800', act:'#CCB200' },
};
const S = {
  sm: { h:'32px', px:'12px', fs:'13px', ic:14, gap:'6px' },
  md: { h:'40px', px:'16px', fs:'14px', ic:16, gap:'8px' },
  lg: { h:'48px', px:'20px', fs:'16px', ic:18, gap:'8px' },
};

export function Button({
  variant = 'primary', size = 'md', disabled = false, loading = false,
  icon, iconPosition = 'left', fullWidth = false,
  children, onClick, type = 'button', style: sx, ...rest
}) {
  const [hov, setHov] = React.useState(false);
  const [act, setAct] = React.useState(false);
  const v = V[variant] || V.primary;
  const s = S[size] || S.md;
  const off = disabled || loading;
  const bg = off ? '#DEDEDC' : act ? v.act : hov ? v.hov : v.bg;
  const fg = off ? '#9A9897' : v.fg;
  return (
    <button
      type={type} disabled={off} onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => setAct(true)}
      onMouseUp={() => setAct(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.h, padding: `0 ${s.px}`,
        fontSize: s.fs, fontFamily: "'Barlow', sans-serif", fontWeight: 600,
        letterSpacing: '0.01em', lineHeight: 1, color: fg,
        background: bg, border: `1px solid ${off ? '#DEDEDC' : v.bd}`, borderRadius: '6px',
        cursor: off ? 'not-allowed' : 'pointer',
        transition: 'background 150ms, transform 100ms, box-shadow 150ms',
        transform: act && !off ? 'scale(0.98)' : 'scale(1)',
        boxShadow: variant === 'primary' && !off && hov ? '0 2px 8px rgba(54,124,43,0.22)' : 'none',
        width: fullWidth ? '100%' : 'auto', userSelect: 'none', whiteSpace: 'nowrap', ...sx,
      }}
      {...rest}
    >
      {loading && (
        <span style={{ width: s.ic, height: s.ic, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'jdSpin 0.7s linear infinite', display: 'inline-block', flexShrink: 0 }} />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'right' && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>
      )}
    </button>
  );
}
