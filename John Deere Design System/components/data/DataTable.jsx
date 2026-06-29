import React from 'react';

export function DataTable({ columns = [], rows = [], onRowClick, emptyMessage = 'No data available.', style: sx }) {
  const [sortCol, setSortCol] = React.useState(null);
  const [sortDir, setSortDir] = React.useState('asc');
  const [hovRow, setHovRow] = React.useState(null);

  function handleSort(key) {
    if (sortCol === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(key); setSortDir('asc'); }
  }

  const sorted = [...rows].sort((a, b) => {
    if (!sortCol) return 0;
    const av = a[sortCol], bv = b[sortCol];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", overflow: 'auto', borderRadius: '8px', border: '1px solid #DEDEDC', ...sx }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#F8F7F5' }}>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                style={{
                  padding: '10px 16px', textAlign: col.align || 'left',
                  fontWeight: 600, fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: '#595754', borderBottom: '1px solid #DEDEDC', whiteSpace: 'nowrap',
                  cursor: col.sortable !== false ? 'pointer' : 'default', userSelect: 'none',
                }}
              >
                {col.label}
                {sortCol === col.key && (
                  <span style={{ marginLeft: 4, opacity: 0.7 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ padding: '32px 16px', textAlign: 'center', color: '#767471', fontSize: '14px' }}>
                {emptyMessage}
              </td>
            </tr>
          )}
          {sorted.map((row, i) => (
            <tr
              key={row.id || i}
              onMouseEnter={() => setHovRow(i)}
              onMouseLeave={() => setHovRow(null)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{
                background: hovRow === i ? '#EDF7EA' : i % 2 === 0 ? '#fff' : '#F8F7F5',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 120ms',
              }}
            >
              {columns.map(col => (
                <td key={col.key} style={{ padding: '10px 16px', borderBottom: '1px solid #DEDEDC', color: '#27251F', textAlign: col.align || 'left' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
