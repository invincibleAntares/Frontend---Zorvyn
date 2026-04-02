import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";

// pages – will be filled in step 3-5; stubbed for now
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
            <Route index element={<PlaceholderPage name="Dashboard" />} />
            <Route path="transactions" element={<PlaceholderPage name="Transactions" />} />
            <Route path="insights" element={<PlaceholderPage name="Insights" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
