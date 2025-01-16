import { Navigate, Route, Routes } from "react-router-dom";
import LoginPanel from "./components/features/LoginPanel";
import MainMenu from "./components/MainMenu";
import RegisterPanel from "./components/features/RegisterPanel";
import { AuthProvider } from "./store/AuthContext";
import UserPanel from "./components/features/loggedUser.tsx/UserPanel";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/loginPanel" element={<LoginPanel />} />
        <Route path="/registerPanel" element={<RegisterPanel />} />
        <Route path="/userPanel" element={<UserPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
