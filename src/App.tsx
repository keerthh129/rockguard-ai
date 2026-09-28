import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './components'
import { AlertsPage, DashboardPage, HistoryPage, LoginPage, MonitoringPage, PredictionPage, ReportsPage, SettingsPage, ZoneDetailPage, ZonesPage } from './pages/Pages'

function Protected({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return localStorage.getItem('rockguard-auth') || sessionStorage.getItem('rockguard-auth') ? <AppShell>{children}</AppShell> : <Navigate to="/login" replace state={{ from: location }} />
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Protected><DashboardPage /></Protected>} />
    <Route path="/monitoring" element={<Protected><MonitoringPage /></Protected>} />
    <Route path="/prediction" element={<Protected><PredictionPage /></Protected>} />
    <Route path="/alerts" element={<Protected><AlertsPage /></Protected>} />
    <Route path="/history" element={<Protected><HistoryPage /></Protected>} />
    <Route path="/zones" element={<Protected><ZonesPage /></Protected>} />
    <Route path="/zones/:id" element={<Protected><ZoneDetailPage /></Protected>} />
    <Route path="/reports" element={<Protected><ReportsPage /></Protected>} />
    <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}