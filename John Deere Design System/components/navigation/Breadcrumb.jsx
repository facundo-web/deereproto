import React from 'react';

export function Breadcrumb({ items = [], style: sx }) {
  return (
    <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Barlow', sans-serif", fontSize: '13px', ...sx }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: '#9A9897', userSelect: 'none', margin: '0 2px' }}>/</span>}
            {isLast
              ? <span style={{ color: '#27251F', fontWeight: 500 }}>{item.label}</span>
              : (
                <a
                  href={item.href || '#'}
                  onClick={item.onClick}
                  style={{ color: '#367C2B', textDecoration: 'none', fontWeight: 400 }}
                  onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
                  onMouseLeave={e => (e.target.style.textDecoration = 'none')}
                >
                  {item.label}
                </a>
              )
            }
          </React.Fragment>
        );
      })}
    </nav>
  );
}
