import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { useAuthStore } from "./services/stores/authStore";
import { useMemo } from "react";
import { Home } from "./pages/Home";

export const AppRouter = () => {
  const { isAuthenticated } = useAuthStore((s) => s.data);

  const routes = useMemo(() => {
    return isAuthenticated ? (
      // Routes to use when user is authenticated
      <>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    ) : (
      // Routes to use when user is not authenticated
      <>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    );
  }, [isAuthenticated]);

  return (
    <>
      <Routes>{routes}</Routes>
    </>
  );
};

export default AppRouter;
