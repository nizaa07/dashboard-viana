import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import Login from "./pages/auth/Login";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [searchParams] = useSearchParams();
  const sso_code = searchParams.get("sso_code");
  const [isLogin, setIsLogin] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    let requestOptions = {
      method: "POST",
    };
    if (sso_code) {
      fetch(
        `https://issp.sccic-dev.com/v2/auth/sess/${sso_code}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          window.localStorage.setItem("user", result.username);
          window.localStorage.setItem("token", result.access_token);
          window.localStorage.setItem("refresh_token", result.refresh_token);
          setIsLogin(true);
          setLoginUser(window.localStorage.getItem("user"));
        })
        .catch((error) => console.log("error", error));
    }
  }, [sso_code]);

  console.log(sso_code);
  console.log(isLogin);
  console.log(loginUser);
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard isLogin={isLogin} />} />
      <Route
        path="*"
        element={<Navigate to="/dashboard/vehicle_count" replace />}
      />
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
