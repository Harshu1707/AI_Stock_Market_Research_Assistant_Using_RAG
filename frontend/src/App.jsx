import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatAssistant from './pages/ChatAssistant';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import StockAnalytics from './pages/StockAnalytics';
import NewsSentiment from './pages/NewsSentiment';

export default function App() {
  return <div>
    <Sidebar />
    <main className="min-h-screen p-4 lg:ml-72 lg:p-8">
      <Routes>
        <Route path="/" element={<ChatAssistant />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<StockAnalytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/news" element={<NewsSentiment />} />
      </Routes>
    </main>
  </div>;
}
