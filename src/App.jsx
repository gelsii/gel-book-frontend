import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./shared/layouts/RootLayout";
import SignInPage from "./auth/Sign-in-page";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from "./shared/layouts/DashboardLayout";
import SignUpPage from "./auth/SignUpPage";
import NotFound from "./pages/NotFound";
import enabledAuthPageContext from "./contexts/enabledAuthPage";
import AuthLayout from "./shared/layouts/AuthLayout";

function App() {

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={<NotFound message={"Not Found"} status={"404"} />}
      />
    </Routes>
  );
}

export default App;
