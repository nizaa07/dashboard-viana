import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import Login from "./pages/auth/Login";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route
        path="*"
        element={<Navigate to="/dashboard/vehicle_count" replace />}
      />
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
