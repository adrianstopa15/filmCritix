import { Navigate, Route, Routes } from "react-router-dom";
import LoginPanel from "./components/features/LoginPanel";
import MainMenu from "./components/MainMenu";
import RegisterPanel from "./components/features/RegisterPanel";
import { AuthProvider, useAuth } from "./store/AuthContext";
import UserPanel from "./components/features/loggedUser.tsx/UserPanel";
import UserPanelSettings from "./components/features/loggedUser.tsx/UserPanelSettings";
import UserPanelSecurity from "./components/features/loggedUser.tsx/UserPanelSecurity";
import UserPanelStatus from "./components/features/loggedUser.tsx/UserPanelStatus";
import FilmReviewPanel from "./components/features/loggedUser.tsx/loggedAdmin/FilmReviewPanel";
import AdminPanel from "./components/features/loggedUser.tsx/loggedAdmin/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route
          path="/loginPanel"
          element={!isLoggedIn ? <LoginPanel /> : <Navigate to="/" replace />}
        />
        <Route
          path="/registerPanel"
          element={
            !isLoggedIn ? <RegisterPanel /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/userPanel"
          element={
            <ProtectedRoute>
              <UserPanel />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/userPanel/settings" replace />}
          />
          <Route path="settings" element={<UserPanelSettings />} />
          <Route path="security" element={<UserPanelSecurity />} />
          <Route path="status" element={<UserPanelStatus />} />
          <Route
            path="filmReview"
            element={
              <ProtectedRoute requireAdmin>
                <FilmReviewPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="adminPanel"
            element={
              <ProtectedRoute requireAdmin>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
