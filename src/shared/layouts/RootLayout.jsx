import ContextProvider from "@/components/ContextProvider";
import { Outlet} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout() {
  return (
    <section className="w-screen h-screen flex flex-col  justify-start items-center">
      <ContextProvider>
        <Outlet />
        <Toaster />
      </ContextProvider>
    </section>
  );
}
