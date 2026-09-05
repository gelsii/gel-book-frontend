import React, { useState } from "react";
import userEmail from "@/contexts/userId";
import DashboardPages from "@/contexts/dashboardPages";
import HomePage from "@/pages/dashboard/HomePage";
import enabledAuthPageContext from "@/contexts/enabledAuthPage";

export default function ContextProvider({ children }) {
  const [userId, setUserId] = useState("");
  const [dashboardPages, setDashboardPages] = useState(<HomePage />);
  const [isEnableAuthPage, setIsEnableAuthPage] = useState(true);

  return (
    <userEmail.Provider value={{ userId, setUserId }}>
      <DashboardPages.Provider value={{ dashboardPages, setDashboardPages }}>
        <enabledAuthPageContext.Provider
          value={{ isEnableAuthPage, setIsEnableAuthPage }}
        >
          {children}
        </enabledAuthPageContext.Provider>
      </DashboardPages.Provider>
    </userEmail.Provider>
  );
}
