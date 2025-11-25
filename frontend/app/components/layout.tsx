import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className=" w-full">
        <SidebarTrigger />

        <Outlet />
      </section>
    </SidebarProvider>
  );
};

export default Layout;
