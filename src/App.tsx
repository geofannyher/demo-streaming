import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/mainLayout";
import LoginAdmin from "./pages/admin/auth/login";
import DashboardAdmin from "./pages/admin/dashboard";
import DashboardUser from "./pages/user/dashboardUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardUser />} />
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route path="admin" element={<DashboardAdmin />} />
        </Route>
        Í
      </Routes>
    </BrowserRouter>
  );
}

export default App;
