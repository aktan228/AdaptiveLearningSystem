import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ModulesPage from "./pages/ModulesPage";
import LessonPage from "./pages/LessonPage";
import TaskPage from "./pages/TaskPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<><Navbar /><main style={{paddingTop:"80px"}}><Outlet /></main></>}>
              <Route path="/"           element={<Navigate to="/modules" />} />
              <Route path="/modules"    element={<ModulesPage />} />
              <Route path="/lesson/:id" element={<LessonPage />} />
              <Route path="/task/:id"   element={<TaskPage />} />
              <Route path="/dashboard"  element={<DashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
