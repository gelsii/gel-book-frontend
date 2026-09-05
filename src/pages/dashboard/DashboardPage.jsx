import React, { useContext } from "react";
import DashboardPages from "@/contexts/dashboardPages";

export default function DashboardPage() {
  const { dashboardPages } = useContext(DashboardPages)

  return (
    <section className="w-full h-full px-5 flex flex-col justify-start items-center" >
      {dashboardPages}
    </section>
  );
}