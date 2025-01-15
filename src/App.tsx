import { Navigate, Route, Routes } from "react-router-dom";
import LoginPanel from "./components/features/LoginPanel";
import MainMenu from "./components/features/MainMenu";
import RegisterPanel from "./components/features/RegisterPanel";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/loginPanel" element={<LoginPanel />} />
        <Route path="/registerPanel" element={<RegisterPanel />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
