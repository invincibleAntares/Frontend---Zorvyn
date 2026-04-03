import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";

// remaining pages – filled in steps 4-5
function PlaceholderPage({ name }) {
  return (
    <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
      {name} — coming soon
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<PlaceholderPage name="Transactions" />} />
            <Route path="insights" element={<PlaceholderPage name="Insights" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
