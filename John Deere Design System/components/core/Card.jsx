import React from 'react';

const PAD = { none: '0', xs: '12px', sm: '16px', md: '24px', lg: '32px' };

export function Card({ variant = 'default', padding = 'md', header, footer, children, style: sx, ...rest }) {
  const [hov, setHov] = React.useState(false);
  const isFlat = variant === 'flat';
  const isBordered = variant === 'bordered';
  const isRaised = variant === 'raised';

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: isFlat ? 'none' : isBordered ? '1px solid #C4C3C1' : '1px solid #DEDEDC',
        borderRadius: '8px',
        boxShadow: isFlat ? 'none' :
          isRaised ? (hov ? '0 8px 24px rgba(39,37,31,0.13),0 0 4px rgba(39,37,31,0.05)' : '0 4px 12px rgba(39,37,31,0.10),0 0 2px rgba(39,37,31,0.05)') :
          (hov ? '0 4px 12px rgba(39,37,31,0.10),0 0 2px rgba(39,37,31,0.05)' : '0 1px 4px rgba(39,37,31,0.08)'),
        transition: 'box-shadow 180ms',
        overflow: 'hidden', ...sx,
      }}
      {...rest}
    >
      {header && (
        <div style={{
          padding: `12px ${PAD[padding]}`,
          borderBottom: '1px solid #DEDEDC',
          fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: '14px', color: '#27251F',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {header}
        </div>
      )}
      <div style={{ padding: PAD[padding] }}>
        {children}
      </div>
      {footer && (
        <div style={{ padding: `12px ${PAD[padding]}`, borderTop: '1px solid #DEDEDC', background: '#F8F7F5' }}>
          {footer}
        </div>
      )}
    </div>
  );
}
