/* @ds-bundle: {"format":3,"namespace":"JohnDeereDesignSystem_387495","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"StatusIndicator","sourcePath":"components/data/StatusIndicator.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4031a0354f53","components/core/Badge.jsx":"d2f38c444c02","components/core/Button.jsx":"2865bc9cb277","components/core/Card.jsx":"cf391dc33bb4","components/data/DataTable.jsx":"85e21355c30e","components/data/StatusIndicator.jsx":"630b73b0f738","components/forms/Checkbox.jsx":"2d6f07737b53","components/forms/Input.jsx":"aa7733cba185","components/forms/Select.jsx":"63306a6de7c1","components/forms/Toggle.jsx":"dda0d5f09f31","components/navigation/Breadcrumb.jsx":"be29faae4d02","components/navigation/Tabs.jsx":"963e4a71bf70"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JohnDeereDesignSystem_387495 = window.JohnDeereDesignSystem_387495 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 80
};
const COLORS = ['#367C2B', '#2A6122', '#1D4ED8', '#7C3AED', '#B45309', '#0F766E', '#1E4718', '#4E9B3E'];
function initials(name = '') {
  const parts = name.trim().split(/\s+/);
  return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
}
function Avatar({
  name,
  src,
  size = 'md',
  style: sx,
  ...rest
}) {
  const [imgErr, setImgErr] = React.useState(false);
  const px = SZ[size] || SZ.md;
  const ini = initials(name).toUpperCase();
  const colorIdx = (name || '').charCodeAt(0) % COLORS.length;
  const showImg = src && !imgErr;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: px,
      height: px,
      borderRadius: '9999px',
      background: showImg ? 'transparent' : COLORS[colorIdx],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Math.floor(px * 0.38) + 'px',
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 600,
      color: '#fff',
      flexShrink: 0,
      overflow: 'hidden',
      userSelect: 'none',
      ...sx
    }
  }, rest), showImg ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    width: px,
    height: px,
    style: {
      objectFit: 'cover'
    },
    onError: () => setImgErr(true)
  }) : ini || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BV = {
  default: {
    bg: '#F0EFED',
    fg: '#595754',
    bd: '#DEDEDC'
  },
  success: {
    bg: '#EDF7EA',
    fg: '#2A6122',
    bd: '#A3D698'
  },
  warning: {
    bg: '#FFFBEB',
    fg: '#854D0E',
    bd: '#FDE68A'
  },
  error: {
    bg: '#FEE2E2',
    fg: '#991B1B',
    bd: '#FECACA'
  },
  info: {
    bg: '#EFF6FF',
    fg: '#1D4ED8',
    bd: '#BFDBFE'
  },
  green: {
    bg: '#367C2B',
    fg: '#fff',
    bd: 'transparent'
  },
  yellow: {
    bg: '#FFDE00',
    fg: '#27251F',
    bd: 'transparent'
  }
};
const BS = {
  sm: {
    fs: '11px',
    px: '7px',
    h: '20px'
  },
  md: {
    fs: '12px',
    px: '9px',
    h: '24px'
  },
  lg: {
    fs: '13px',
    px: '11px',
    h: '28px'
  }
};
function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  style: sx,
  ...rest
}) {
  const v = BV[variant] || BV.default;
  const s = BS[size] || BS.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      height: s.h,
      padding: `0 ${s.px}`,
      fontSize: s.fs,
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      lineHeight: 1,
      color: v.fg,
      background: v.bg,
      border: `1px solid ${v.bd}`,
      borderRadius: '4px',
      whiteSpace: 'nowrap',
      ...sx
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor',
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
if (typeof document !== 'undefined' && !document.getElementById('__jd-anim')) {
  const s = document.createElement('style');
  s.id = '__jd-anim';
  s.textContent = '@keyframes jdSpin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}
const V = {
  primary: {
    bg: '#367C2B',
    fg: '#fff',
    bd: 'transparent',
    hov: '#2A6122',
    act: '#1E4718'
  },
  secondary: {
    bg: 'transparent',
    fg: '#367C2B',
    bd: '#367C2B',
    hov: '#EDF7EA',
    act: '#D1EBCA'
  },
  ghost: {
    bg: 'transparent',
    fg: '#27251F',
    bd: 'transparent',
    hov: '#F0EFED',
    act: '#DEDEDC'
  },
  danger: {
    bg: '#B91C1C',
    fg: '#fff',
    bd: 'transparent',
    hov: '#991B1B',
    act: '#7F1D1D'
  },
  warning: {
    bg: '#FFDE00',
    fg: '#27251F',
    bd: 'transparent',
    hov: '#E6C800',
    act: '#CCB200'
  }
};
const S = {
  sm: {
    h: '32px',
    px: '12px',
    fs: '13px',
    ic: 14,
    gap: '6px'
  },
  md: {
    h: '40px',
    px: '16px',
    fs: '14px',
    ic: 16,
    gap: '8px'
  },
  lg: {
    h: '48px',
    px: '20px',
    fs: '16px',
    ic: 18,
    gap: '8px'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  style: sx,
  ...rest
}) {
  const [hov, setHov] = React.useState(false);
  const [act, setAct] = React.useState(false);
  const v = V[variant] || V.primary;
  const s = S[size] || S.md;
  const off = disabled || loading;
  const bg = off ? '#DEDEDC' : act ? v.act : hov ? v.hov : v.bg;
  const fg = off ? '#9A9897' : v.fg;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: off,
    onClick: onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setAct(false);
    },
    onMouseDown: () => setAct(true),
    onMouseUp: () => setAct(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: `0 ${s.px}`,
      fontSize: s.fs,
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.01em',
      lineHeight: 1,
      color: fg,
      background: bg,
      border: `1px solid ${off ? '#DEDEDC' : v.bd}`,
      borderRadius: '6px',
      cursor: off ? 'not-allowed' : 'pointer',
      transition: 'background 150ms, transform 100ms, box-shadow 150ms',
      transform: act && !off ? 'scale(0.98)' : 'scale(1)',
      boxShadow: variant === 'primary' && !off && hov ? '0 2px 8px rgba(54,124,43,0.22)' : 'none',
      width: fullWidth ? '100%' : 'auto',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      ...sx
    }
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.ic,
      height: s.ic,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'jdSpin 0.7s linear infinite',
      display: 'inline-block',
      flexShrink: 0
    }
  }), !loading && icon && iconPosition === 'left' && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, icon), children && /*#__PURE__*/React.createElement("span", null, children), !loading && icon && iconPosition === 'right' && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, icon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PAD = {
  none: '0',
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px'
};
function Card({
  variant = 'default',
  padding = 'md',
  header,
  footer,
  children,
  style: sx,
  ...rest
}) {
  const [hov, setHov] = React.useState(false);
  const isFlat = variant === 'flat';
  const isBordered = variant === 'bordered';
  const isRaised = variant === 'raised';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      background: '#fff',
      border: isFlat ? 'none' : isBordered ? '1px solid #C4C3C1' : '1px solid #DEDEDC',
      borderRadius: '8px',
      boxShadow: isFlat ? 'none' : isRaised ? hov ? '0 8px 24px rgba(39,37,31,0.13),0 0 4px rgba(39,37,31,0.05)' : '0 4px 12px rgba(39,37,31,0.10),0 0 2px rgba(39,37,31,0.05)' : hov ? '0 4px 12px rgba(39,37,31,0.10),0 0 2px rgba(39,37,31,0.05)' : '0 1px 4px rgba(39,37,31,0.08)',
      transition: 'box-shadow 180ms',
      overflow: 'hidden',
      ...sx
    }
  }, rest), header && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `12px ${PAD[padding]}`,
      borderBottom: '1px solid #DEDEDC',
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 600,
      fontSize: '14px',
      color: '#27251F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: PAD[padding]
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `12px ${PAD[padding]}`,
      borderTop: '1px solid #DEDEDC',
      background: '#F8F7F5'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  emptyMessage = 'No data available.',
  style: sx
}) {
  const [sortCol, setSortCol] = React.useState(null);
  const [sortDir, setSortDir] = React.useState('asc');
  const [hovRow, setHovRow] = React.useState(null);
  function handleSort(key) {
    if (sortCol === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');else {
      setSortCol(key);
      setSortDir('asc');
    }
  }
  const sorted = [...rows].sort((a, b) => {
    if (!sortCol) return 0;
    const av = a[sortCol],
      bv = b[sortCol];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Barlow', sans-serif",
      overflow: 'auto',
      borderRadius: '8px',
      border: '1px solid #DEDEDC',
      ...sx
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#F8F7F5'
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    onClick: col.sortable !== false ? () => handleSort(col.key) : undefined,
    style: {
      padding: '10px 16px',
      textAlign: col.align || 'left',
      fontWeight: 600,
      fontSize: '11px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#595754',
      borderBottom: '1px solid #DEDEDC',
      whiteSpace: 'nowrap',
      cursor: col.sortable !== false ? 'pointer' : 'default',
      userSelect: 'none'
    }
  }, col.label, sortCol === col.key && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 4,
      opacity: 0.7
    }
  }, sortDir === 'asc' ? '↑' : '↓'))))), /*#__PURE__*/React.createElement("tbody", null, sorted.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: '32px 16px',
      textAlign: 'center',
      color: '#767471',
      fontSize: '14px'
    }
  }, emptyMessage)), sorted.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row.id || i,
    onMouseEnter: () => setHovRow(i),
    onMouseLeave: () => setHovRow(null),
    onClick: onRowClick ? () => onRowClick(row) : undefined,
    style: {
      background: hovRow === i ? '#EDF7EA' : i % 2 === 0 ? '#fff' : '#F8F7F5',
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'background 120ms'
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      padding: '10px 16px',
      borderBottom: '1px solid #DEDEDC',
      color: '#27251F',
      textAlign: col.align || 'left'
    }
  }, col.render ? col.render(row[col.key], row) : row[col.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusIndicator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATUS = {
  active: {
    color: '#367C2B',
    label: 'Active',
    pulse: true
  },
  idle: {
    color: '#767471',
    label: 'Idle',
    pulse: false
  },
  stored: {
    color: '#C4C3C1',
    label: 'Stored',
    pulse: false
  },
  connected: {
    color: '#1D4ED8',
    label: 'Connected',
    pulse: false
  },
  warning: {
    color: '#B45309',
    label: 'Warning',
    pulse: true
  },
  error: {
    color: '#B91C1C',
    label: 'Error',
    pulse: true
  },
  offline: {
    color: '#9A9897',
    label: 'Offline',
    pulse: false
  },
  complete: {
    color: '#367C2B',
    label: 'Complete',
    pulse: false
  },
  planned: {
    color: '#767471',
    label: 'Planned',
    pulse: false
  },
  growing: {
    color: '#4E9B3E',
    label: 'Growing',
    pulse: false
  },
  spraying: {
    color: '#1D4ED8',
    label: 'Spraying',
    pulse: true
  },
  planting: {
    color: '#367C2B',
    label: 'Planting',
    pulse: true
  }
};
if (typeof document !== 'undefined' && !document.getElementById('__jd-pulse')) {
  const s = document.createElement('style');
  s.id = '__jd-pulse';
  s.textContent = '@keyframes jdPulse{0%,100%{opacity:1}50%{opacity:0.35}}';
  document.head.appendChild(s);
}
const DOT_SZ = {
  sm: 6,
  md: 8,
  lg: 10
};
const FONT_SZ = {
  sm: '11px',
  md: '13px',
  lg: '15px'
};
function StatusIndicator({
  status = 'idle',
  label: customLabel,
  size = 'md',
  style: sx,
  ...rest
}) {
  const cfg = STATUS[status] || STATUS.idle;
  const dotSz = DOT_SZ[size] || 8;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: "'Barlow', sans-serif",
      ...sx
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: dotSz,
      height: dotSz,
      borderRadius: '50%',
      background: cfg.color,
      flexShrink: 0,
      animation: cfg.pulse ? 'jdPulse 2s ease-in-out infinite' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: FONT_SZ[size] || '13px',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#27251F'
    }
  }, customLabel || cfg.label));
}
Object.assign(__ds_scope, { StatusIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusIndicator.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  onChange,
  label,
  hint,
  disabled = false,
  indeterminate = false,
  style: sx,
  ...rest
}) {
  const [hov, setHov] = React.useState(false);
  const active = checked || indeterminate;
  const bg = disabled ? '#F0EFED' : active ? '#367C2B' : hov ? '#EDF7EA' : '#fff';
  const bd = disabled ? '#DEDEDC' : active ? '#367C2B' : hov ? '#367C2B' : '#9A9897';
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Barlow', sans-serif",
      ...sx
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": indeterminate ? 'mixed' : checked,
    tabIndex: disabled ? -1 : 0,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    onClick: () => !disabled && onChange && onChange(!checked),
    onKeyDown: e => e.key === ' ' && !disabled && onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      borderRadius: '4px',
      flexShrink: 0,
      marginTop: 1,
      background: bg,
      border: `2px solid ${bd}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 150ms, border 150ms'
    }
  }, active && !disabled && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    fill: "none"
  }, indeterminate ? /*#__PURE__*/React.createElement("path", {
    d: "M2 5h6",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M1.5 5L3.8 7.5L8.5 2.5",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px',
      fontWeight: 500,
      color: disabled ? '#9A9897' : '#27251F',
      display: 'block',
      lineHeight: 1.3
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: '#767471',
      marginTop: 2,
      display: 'block'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  sm: {
    h: '32px',
    fs: '13px',
    px: '10px'
  },
  md: {
    h: '40px',
    fs: '14px',
    px: '12px'
  },
  lg: {
    h: '48px',
    fs: '16px',
    px: '14px'
  }
};
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  size = 'md',
  disabled = false,
  type = 'text',
  id,
  style: sx,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || `inp-${Math.random().toString(36).slice(2, 7)}`;
  const s = SZ[size] || SZ.md;
  const borderColor = error ? '#B91C1C' : focused ? '#367C2B' : '#C4C3C1';
  const shadow = focused ? error ? '0 0 0 3px rgba(185,28,28,0.22)' : '0 0 0 3px rgba(54,124,43,0.28)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontFamily: "'Barlow', sans-serif",
      ...sx
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: '13px',
      fontWeight: 600,
      color: disabled ? '#9A9897' : '#27251F',
      lineHeight: 1.4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: s.h,
      background: disabled ? '#F0EFED' : '#fff',
      border: `1px solid ${borderColor}`,
      borderRadius: '6px',
      boxShadow: shadow,
      transition: 'border 150ms, box-shadow 150ms',
      overflow: 'hidden'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: `0 10px 0 ${s.px}`,
      color: '#767471',
      fontSize: s.fs,
      flexShrink: 0,
      borderRight: '1px solid #DEDEDC',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: `0 ${s.px}`,
      fontSize: s.fs,
      fontFamily: "'Barlow', sans-serif",
      color: '#27251F',
      minWidth: 0
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: `0 ${s.px} 0 10px`,
      color: '#767471',
      fontSize: s.fs,
      flexShrink: 0,
      borderLeft: '1px solid #DEDEDC',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: error ? '#B91C1C' : '#767471',
      lineHeight: 1.4
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  sm: {
    h: '32px',
    fs: '13px',
    px: '10px'
  },
  md: {
    h: '40px',
    fs: '14px',
    px: '12px'
  },
  lg: {
    h: '48px',
    fs: '16px',
    px: '14px'
  }
};
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  size = 'md',
  disabled = false,
  id,
  style: sx,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selId = id || `sel-${Math.random().toString(36).slice(2, 7)}`;
  const s = SZ[size] || SZ.md;
  const borderColor = error ? '#B91C1C' : focused ? '#367C2B' : '#C4C3C1';
  const shadow = focused ? error ? '0 0 0 3px rgba(185,28,28,0.22)' : '0 0 0 3px rgba(54,124,43,0.28)' : 'none';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontFamily: "'Barlow', sans-serif",
      ...sx
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontSize: '13px',
      fontWeight: 600,
      color: disabled ? '#9A9897' : '#27251F',
      lineHeight: 1.4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: s.h
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      height: '100%',
      appearance: 'none',
      WebkitAppearance: 'none',
      padding: `0 36px 0 ${s.px}`,
      fontSize: s.fs,
      fontFamily: "'Barlow', sans-serif",
      color: '#27251F',
      background: disabled ? '#F0EFED' : '#fff',
      border: `1px solid ${borderColor}`,
      borderRadius: '6px',
      boxShadow: shadow,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border 150ms, box-shadow 150ms',
      outline: 'none'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: '#767471'
    },
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: error ? '#B91C1C' : '#767471'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SZ = {
  sm: {
    tw: 32,
    th: 18,
    kn: 12,
    tr: 3
  },
  md: {
    tw: 44,
    th: 24,
    kn: 16,
    tr: 4
  },
  lg: {
    tw: 52,
    th: 28,
    kn: 20,
    tr: 4
  }
};
function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  style: sx,
  ...rest
}) {
  const s = SZ[size] || SZ.md;
  const translate = checked ? s.tw - s.kn - s.tr * 2 + 'px' : '0px';
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Barlow', sans-serif",
      ...sx
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": checked,
    tabIndex: disabled ? -1 : 0,
    onClick: () => !disabled && onChange && onChange(!checked),
    onKeyDown: e => e.key === ' ' && !disabled && onChange && onChange(!checked),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      width: s.tw,
      height: s.th,
      borderRadius: '9999px',
      background: checked ? '#367C2B' : '#C4C3C1',
      padding: s.tr,
      transition: 'background 200ms',
      opacity: disabled ? 0.5 : 1,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.kn,
      height: s.kn,
      borderRadius: '50%',
      background: '#fff',
      transform: `translateX(${translate})`,
      transition: 'transform 200ms',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px',
      fontWeight: 500,
      color: disabled ? '#9A9897' : '#27251F'
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function Breadcrumb({
  items = [],
  style: sx
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: "'Barlow', sans-serif",
      fontSize: '13px',
      ...sx
    }
  }, items.map((item, i) => {
    const isLast = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#9A9897',
        userSelect: 'none',
        margin: '0 2px'
      }
    }, "/"), isLast ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#27251F',
        fontWeight: 500
      }
    }, item.label) : /*#__PURE__*/React.createElement("a", {
      href: item.href || '#',
      onClick: item.onClick,
      style: {
        color: '#367C2B',
        textDecoration: 'none',
        fontWeight: 400
      },
      onMouseEnter: e => e.target.style.textDecoration = 'underline',
      onMouseLeave: e => e.target.style.textDecoration = 'none'
    }, item.label));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = 'line',
  style: sx
}) {
  const isPill = variant === 'pill';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: isPill ? '4px' : '0',
      padding: isPill ? '4px' : '0',
      background: isPill ? '#F0EFED' : 'transparent',
      borderRadius: isPill ? '8px' : '0',
      borderBottom: !isPill ? '2px solid #DEDEDC' : 'none',
      fontFamily: "'Barlow', sans-serif",
      ...sx
    }
  }, tabs.map(tab => {
    const active = tab.id === activeTab;
    if (!isPill) return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: () => onChange && onChange(tab.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 16px',
        height: '40px',
        fontSize: '14px',
        fontWeight: active ? 600 : 500,
        color: active ? '#367C2B' : '#595754',
        background: 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid #367C2B' : '2px solid transparent',
        marginBottom: '-2px',
        cursor: 'pointer',
        transition: 'color 150ms',
        whiteSpace: 'nowrap'
      }
    }, tab.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex'
      }
    }, tab.icon), tab.label, tab.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '11px',
        fontWeight: 600,
        background: active ? '#367C2B' : '#DEDEDC',
        color: active ? '#fff' : '#595754',
        padding: '1px 6px',
        borderRadius: '9999px'
      }
    }, tab.count));
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: () => onChange && onChange(tab.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        fontSize: '14px',
        fontWeight: active ? 600 : 500,
        color: active ? '#27251F' : '#595754',
        background: active ? '#fff' : 'transparent',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow: active ? '0 1px 4px rgba(39,37,31,0.09)' : 'none',
        transition: 'background 150ms, box-shadow 150ms',
        whiteSpace: 'nowrap'
      }
    }, tab.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex'
      }
    }, tab.icon), tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.StatusIndicator = __ds_scope.StatusIndicator;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
