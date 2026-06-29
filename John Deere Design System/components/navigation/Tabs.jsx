import React from 'react';

export function Tabs({ tabs = [], activeTab, onChange, variant = 'line', style: sx }) {
  const isPill = variant === 'pill';
  return (
    <div style={{
      display: 'flex', gap: isPill ? '4px' : '0',
      padding: isPill ? '4px' : '0',
      background: isPill ? '#F0EFED' : 'transparent',
      borderRadius: isPill ? '8px' : '0',
      borderBottom: !isPill ? '2px solid #DEDEDC' : 'none',
      fontFamily: "'Barlow', sans-serif", ...sx,
    }}>
      {tabs.map(tab => {
        const active = tab.id === activeTab;
        if (!isPill) return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '0 16px', height: '40px', fontSize: '14px',
              fontWeight: active ? 600 : 500,
              color: active ? '#367C2B' : '#595754',
              background: 'transparent', border: 'none',
              borderBottom: active ? '2px solid #367C2B' : '2px solid transparent',
              marginBottom: '-2px', cursor: 'pointer',
              transition: 'color 150ms', whiteSpace: 'nowrap',
            }}
          >
            {tab.icon && <span style={{ display: 'flex' }}>{tab.icon}</span>}
            {tab.label}
            {tab.count != null && (
              <span style={{ fontSize: '11px', fontWeight: 600, background: active ? '#367C2B' : '#DEDEDC', color: active ? '#fff' : '#595754', padding: '1px 6px', borderRadius: '9999px' }}>
                {tab.count}
              </span>
            )}
          </button>
        );
        return (
          <button
            key={tab.id}
            onClick={() => onChange && onChange(tab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', fontSize: '14px',
              fontWeight: active ? 600 : 500,
              color: active ? '#27251F' : '#595754',
              background: active ? '#fff' : 'transparent',
              border: 'none', borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: active ? '0 1px 4px rgba(39,37,31,0.09)' : 'none',
              transition: 'background 150ms, box-shadow 150ms', whiteSpace: 'nowrap',
            }}
          >
            {tab.icon && <span style={{ display: 'flex' }}>{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
