import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Activity, AlertTriangle, BarChart3, Bell, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Compass, LogOut, Map, Menu, Mountain, Radio, Search, Settings, X } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MetricKey, MineZone, RiskLevel, TimeRange, TimeSeriesPoint } from '../types'
import { getTimeSeries } from '../services/monitoringService'

const navigation = [
  { label: 'Dashboard', path: '/', icon: BarChart3 },
  { label: 'Live Monitoring', path: '/monitoring', icon: Radio },
  { label: 'Risk Prediction', path: '/prediction', icon: Activity },
  { label: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { label: 'Prediction History', path: '/history', icon: ClipboardList },
  { label: 'Mine Zones', path: '/zones', icon: Map },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
]

const titles: Record<string, string> = {
  '/': 'Operations overview', '/monitoring': 'Live monitoring', '/prediction': 'Risk assessment', '/alerts': 'Alert center',
  '/history': 'Prediction history', '/zones': 'Mine zones', '/reports': 'Reports', '/settings': 'Settings',
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => setDrawer(false), [location.pathname])
  const mock = import.meta.env.VITE_MOCK !== 'false'
  return <div className="app-frame">
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${drawer ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Mountain size={20} strokeWidth={2.1} /></div>{!collapsed && <div><strong>ROCKGUARD<span> AI</span></strong><small>GEOTECHNICAL INTELLIGENCE</small></div>}<button className="icon-button sidebar-collapse" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}</button></div>
      {!collapsed && <div className="nav-caption">WORKSPACE</div>}
      <nav className="side-nav" aria-label="Primary navigation">{navigation.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} title={collapsed ? label : undefined} end={path === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{path === '/alerts' && !collapsed && <b className="nav-count">2</b>}</NavLink>)}</nav>
      <div className="sidebar-spacer" />
      {!collapsed && <div className="site-mini"><div className="site-mini-icon"><Compass size={17} /></div><div><span>ACTIVE SITE</span><strong>Northstar Pit</strong></div><span className="online-dot" /></div>}
      <div className="side-bottom"><div className="user-avatar">JD</div>{!collapsed && <div className="user-meta"><strong>Jordan Davis</strong><span>Geotechnical lead</span></div>}<button className="icon-button logout-button" aria-label="Log out" title="Log out" onClick={() => { localStorage.removeItem('rockguard-auth'); sessionStorage.removeItem('rockguard-auth'); navigate('/login') }}><LogOut size={16} /></button></div>
    </aside>
    {drawer && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setDrawer(false)} />}
    <main className="main-column">
      <header className="topbar"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setDrawer(true)}><Menu size={20} /></button><div className="top-title"><span>ROCKGUARD / OPERATIONS</span><strong>{titles[location.pathname] ?? (location.pathname.startsWith('/zones/') ? 'Zone detail' : 'Operations')}</strong></div><div className="topbar-right"><button className="site-selector"><span className="site-pulse" /><span>Northstar Pit <small>· Open-pit mine</small></span><ChevronDown size={14} /></button><div className="top-divider" /><div className="connection"><span className="online-dot" /><span>{mock ? 'Demo connected' : 'API mode'}</span></div><button className="icon-button" aria-label="Search workspace" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); setNotificationsOpen(false) }}><Search size={17} /></button><button className={`icon-button notification-trigger ${notificationsOpen ? 'selected' : ''}`} aria-label="Notifications" onClick={() => { setNotificationsOpen(!notificationsOpen); setSearchOpen(false) }}><Bell size={18} /><i /></button>{notificationsOpen && <div className="notification-popover"><strong>Recent notifications</strong><p><span className="level-dot high" /> Zone C displacement review</p><p><span className="level-dot medium" /> Zone A crack width trend</p><NavLink to="/alerts" onClick={() => setNotificationsOpen(false)}>Open alert center <ChevronRight size={13} /></NavLink></div>}{searchOpen && <div className="quick-search-popover"><label><Search size={15} /><input autoFocus aria-label="Search pages" placeholder="Find a workspace page..." value={searchValue} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false) }} /><kbd>ESC</kbd></label><div>{navigation.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())).map((item) => <NavLink key={item.path} to={item.path} onClick={() => { setSearchOpen(false); setSearchValue('') }}><item.icon size={15} />{item.label}<ChevronRight size={13} /></NavLink>)}{navigation.every((item) => !item.label.toLowerCase().includes(searchValue.toLowerCase())) && <p>No matching pages</p>}</div></div>}<div className="top-avatar">JD</div></div></header>
      {mock && <div className="demo-banner"><span className="demo-icon">i</span><span><strong>DEMO DATA</strong> Illustrative values only. No live sensors or AI service connected.</span><button aria-label="Dismiss demo banner" onClick={(event) => event.currentTarget.parentElement?.remove()}><X size={14} /></button></div>}
      <section className="page-content" key={location.pathname}>{children}</section>
      <footer className="app-footer"><span>ROCKGUARD AI <b>·</b> MINE INTELLIGENCE CONSOLE</span><span><span className="online-dot" /> {mock ? 'DEMO ENVIRONMENT' : 'API ENVIRONMENT'} <b>·</b> UI BUILD 1.0.0</span></footer>
    </main>
  </div>
}

export function PageHeading({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>
}

export function Panel({ children, className = '', title, subtitle, action, id }: { children: React.ReactNode; className?: string; title?: string; subtitle?: string; action?: React.ReactNode; id?: string }) {
  return <section id={id} className={`panel ${className}`}>{(title || action) && <header className="panel-head"><div>{title && <h2>{title}</h2>}{subtitle && <p>{subtitle}</p>}</div>{action}</header>}{children}</section>
}

export function RiskBadge({ level }: { level: RiskLevel }) { return <span className={`risk-badge risk-${level.toLowerCase()}`}><span />{level}</span> }

export function MetricCard({ label, value, unit, change, status, icon: Icon, footnote }: { label: string; value: string | number; unit: string; change?: string; status: RiskLevel; icon: typeof Activity; footnote?: string }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><span className={`metric-icon metric-${status.toLowerCase()}`}><Icon size={16} /></span></div><div className="metric-value">{value}<small>{unit}</small></div><div className="metric-bottom"><RiskBadge level={status} /><span className="metric-footnote">{footnote ?? change}</span></div></article>
}

export function RiskGauge({ score, level, size = 'large' }: { score: number; level: RiskLevel; size?: 'large' | 'small' }) {
  const radius = size === 'large' ? 73 : 48
  const stroke = size === 'large' ? 12 : 8
  const circumference = 2 * Math.PI * radius
  const color = level === 'Critical' ? '#ec6a58' : level === 'High' ? '#eb9b52' : level === 'Medium' ? '#d9bd5a' : '#70c4a0'
  return <div className={`risk-gauge ${size}`} role="img" aria-label={`Illustrative risk score ${score} out of 100, ${level}`}><svg viewBox="0 0 180 180" aria-hidden="true"><circle className="gauge-track" cx="90" cy="90" r={radius} strokeWidth={stroke} /><circle cx="90" cy="90" r={radius} strokeWidth={stroke} stroke={color} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)} /></svg><div className="gauge-content"><strong>{score}<small>/100</small></strong><span>DEMO SCORE</span></div></div>
}

export function SensorCard({ name, value, unit, status, icon: Icon, trend }: { name: string; value: string | number; unit: string; status: RiskLevel; icon: typeof Activity; trend?: string }) {
  return <article className="sensor-card"><div className="sensor-head"><span className="sensor-icon"><Icon size={16} /></span><span className={`sensor-dot dot-${status.toLowerCase()}`} /><span className="sr-only">{status} status</span></div><span className="sensor-name">{name}</span><div className="sensor-reading">{value}<small>{unit}</small></div><div className="sensor-footer"><span className={`sensor-state state-${status.toLowerCase()}`}>{status === 'Low' ? 'NORMAL' : status.toUpperCase()}</span>{trend && <span className="sensor-trend">{trend}</span>}</div></article>
}

const metricLabels: Record<MetricKey, { label: string; unit: string }> = {
  slopeAngle: { label: 'Slope angle', unit: '°' }, rainfall: { label: 'Rainfall', unit: 'mm' }, vibration: { label: 'Vibration', unit: 'mm/s' },
  displacement: { label: 'Displacement', unit: 'mm' }, crackWidth: { label: 'Crack width', unit: 'mm' }, moisture: { label: 'Moisture', unit: '%' }, temperature: { label: 'Temperature', unit: '°C' },
}

export function MonitoringChart({ data, compact = false }: { data: TimeSeriesPoint[]; compact?: boolean }) {
  const [metric, setMetric] = useState<MetricKey>('displacement')
  const [range, setRange] = useState<TimeRange>('24H')
  const [chartData, setChartData] = useState(data)
  const [chartError, setChartError] = useState(false)
  useEffect(() => {
    let active = true
    void getTimeSeries(metric, range).then((points) => { if (active) { setChartData(points); setChartError(false) } }).catch(() => { if (active) { setChartData(data); setChartError(true) } })
    return () => { active = false }
  }, [data, metric, range])
  return <div className="chart-wrap"><div className="chart-controls"><label className="select-wrap"><span className="sr-only">Metric</span><select value={metric} onChange={(event) => setMetric(event.target.value as MetricKey)}>{Object.entries(metricLabels).map(([key, option]) => <option key={key} value={key}>{option.label}</option>)}</select><ChevronDown size={13} /></label><div className="range-tabs" aria-label="Time range">{(['1H', '6H', '24H', '7D', '30D'] as TimeRange[]).map((item) => <button key={item} onClick={() => setRange(item)} className={range === item ? 'active' : ''}>{item}</button>)}</div></div>{chartError && <div className="chart-error" role="status">Showing the available series; selected metric could not be refreshed.</div>}<div className={`line-chart ${compact ? 'chart-compact' : ''}`}><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 14, right: 10, left: -20, bottom: 0 }}><CartesianGrid stroke="#e5e9e4" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="label" tick={{ fill: '#8c999a', fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={24} /><YAxis tick={{ fill: '#8c999a', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ border: '1px solid #dce4df', borderRadius: 5, fontSize: 12 }} formatter={(value) => [`${value} ${metricLabels[metric].unit}`, metricLabels[metric].label]} /><Line type="monotone" dataKey="value" name={metricLabels[metric].label} stroke="#229b91" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: '#229b91', stroke: '#fff', strokeWidth: 2 }} /></LineChart></ResponsiveContainer></div></div>
}

export function RiskTrendChart({ data }: { data: TimeSeriesPoint[] }) {
  const lastDay = data.slice(-24)
  return <div className="trend-chart"><div className="risk-zone-labels"><span>CRITICAL</span><span>HIGH</span><span>MODERATE</span><span>LOW</span></div><ResponsiveContainer width="100%" height="100%"><AreaChart data={lastDay} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}><defs><linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#df795e" stopOpacity={0.25} /><stop offset="100%" stopColor="#df795e" stopOpacity={0.015} /></linearGradient></defs><CartesianGrid stroke="#e5e9e4" strokeDasharray="3 5" vertical={false} /><XAxis dataKey="label" tick={{ fill: '#8c999a', fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={30} /><YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fill: '#8c999a', fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ border: '1px solid #dce4df', borderRadius: 5, fontSize: 12 }} formatter={(value) => [`${value} / 100`, 'Demo risk score']} /><Area type="monotone" dataKey="risk" stroke="#cf725d" strokeWidth={2} fill="url(#riskFill)" activeDot={{ r: 4 }} /></AreaChart></ResponsiveContainer></div>
}

export function ZoneMap({ zones, onSelect }: { zones: MineZone[]; onSelect: (id: string) => void }) {
  return <div className="zone-map"><div className="map-label map-north">N <span>↑</span></div><div className="contour contour-one" /><div className="contour contour-two" /><svg className="haul-road" viewBox="0 0 600 250" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 184 C72 132 104 208 186 153 S302 91 374 137 S480 194 620 82" /><path d="M-20 202 C72 150 104 226 186 171 S302 109 374 155 S480 212 620 100" /></svg>{zones.map((zone, index) => <button key={zone.id} className={`map-zone map-point-${index + 1} point-${zone.level.toLowerCase()}`} onClick={() => onSelect(zone.id)}><span className="map-point-ring" /><strong>{zone.name.replace('Zone ', '')}</strong><small>{zone.score}</small></button>)}<div className="map-legend"><span><i className="legend-low" />Low</span><span><i className="legend-medium" />Medium</span><span><i className="legend-high" />High</span></div><div className="map-caption">NORTHSTAR PIT <span>SCHEMATIC VIEW · NOT TO SCALE</span></div></div>
}

export function LoadingSpinner({ label = 'Loading' }: { label?: string }) { return <span className="loading-inline"><i className="spinner" />{label}</span> }

export function EmptyState({ title, body }: { title: string; body: string }) { return <div className="empty-state"><div><CircleHelp size={21} /></div><strong>{title}</strong><p>{body}</p></div> }

export function Modal({ title, children, onClose, footer }: { title: string; children: React.ReactNode; onClose: () => void; footer?: React.ReactNode }) {
  useEffect(() => { const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey) }, [onClose])
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><div><span className="eyebrow">ROCKGUARD RECORD</span><h2 id="modal-title">{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button></header><div className="modal-body">{children}</div>{footer && <footer>{footer}</footer>}</section></div>
}

export function StatusLabel({ children, good = false }: { children: React.ReactNode; good?: boolean }) { return <span className={`status-label ${good ? 'good' : ''}`}><span />{children}</span> }