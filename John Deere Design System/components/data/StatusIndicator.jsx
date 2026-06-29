import React from 'react';

const STATUS = {
  active:    { color: '#367C2B', label: 'Active',     pulse: true  },
  idle:      { color: '#767471', label: 'Idle',       pulse: false },
  stored:    { color: '#C4C3C1', label: 'Stored',     pulse: false },
  connected: { color: '#1D4ED8', label: 'Connected',  pulse: false },
  warning:   { color: '#B45309', label: 'Warning',    pulse: true  },
  error:     { color: '#B91C1C', label: 'Error',      pulse: true  },
  offline:   { color: '#9A9897', label: 'Offline',    pulse: false },
  complete:  { color: '#367C2B', label: 'Complete',   pulse: false },
  planned:   { color: '#767471', label: 'Planned',    pulse: false },
  growing:   { color: '#4E9B3E', label: 'Growing',    pulse: false },
  spraying:  { color: '#1D4ED8', label: 'Spraying',   pulse: true  },
  planting:  { color: '#367C2B', label: 'Planting',   pulse: true  },
};

if (typeof document !== 'undefined' && !document.getElementById('__jd-pulse')) {
  const s = document.createElement('style');
  s.id = '__jd-pulse';
  s.textContent = '@keyframes jdPulse{0%,100%{opacity:1}50%{opacity:0.35}}';
  document.head.appendChild(s);
}

const DOT_SZ = { sm: 6, md: 8, lg: 10 };
const FONT_SZ = { sm: '11px', md: '13px', lg: '15px' };

export function StatusIndicator({ status = 'idle', label: customLabel, size = 'md', style: sx, ...rest }) {
  const cfg = STATUS[status] || STATUS.idle;
  const dotSz = DOT_SZ[size] || 8;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: "'Barlow', sans-serif", ...sx }} {...rest}>
      <span style={{
        width: dotSz, height: dotSz, borderRadius: '50%', background: cfg.color, flexShrink: 0,
        animation: cfg.pulse ? 'jdPulse 2s ease-in-out infinite' : 'none',
      }} />
      <span style={{ fontSize: FONT_SZ[size] || '13px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#27251F' }}>
        {customLabel || cfg.label}
      </span>
    </span>
  );
}
